import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ApiClientError,
  apiClient,
  getAccessToken,
  performTokenRefresh,
  setAccessToken,
  setSessionRefreshHandler,
  setUnauthorizedHandler,
} from './api-client';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const refreshedSession = {
  accessToken: 'refreshed-token',
  user: { id: 'user-a', permissions: ['student.view.own_branch'], branchAccess: ['branch-a'] },
};
const deferredResponse = () => {
  let resolve!: (value: Response) => void;
  const promise = new Promise<Response>((done) => {
    resolve = done;
  });
  return { promise, resolve };
};

describe('protected API session lifecycle', () => {
  const fetchMock = vi.fn();
  const refreshed = vi.fn();
  const unauthorized = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', fetchMock);
    setAccessToken('original-token');
    setSessionRefreshHandler(refreshed);
    setUnauthorizedHandler(unauthorized);
  });
  afterEach(() => {
    setAccessToken(null);
    setSessionRefreshHandler(null);
    setUnauthorizedHandler(null);
    vi.unstubAllGlobals();
  });

  it('retries an expired token with refreshed permissions and scope', async () => {
    fetchMock
      .mockResolvedValueOnce(json({ message: 'Expired' }, 401))
      .mockResolvedValueOnce(json({ success: true, data: refreshedSession }))
      .mockResolvedValueOnce(json({ success: true, data: ['authorized record'] }));
    expect(await apiClient.get('/students')).toEqual({
      success: true,
      data: ['authorized record'],
    });
    expect(refreshed).toHaveBeenCalledWith(refreshedSession);
    expect(fetchMock.mock.calls[2][1].headers.Authorization).toBe('Bearer refreshed-token');
    expect(unauthorized).not.toHaveBeenCalled();
  });

  it('shares a single token refresh between concurrent requests', async () => {
    const pending = deferredResponse();
    fetchMock.mockReturnValueOnce(pending.promise);
    const first = performTokenRefresh();
    const second = performTokenRefresh();
    pending.resolve(json({ success: true, data: refreshedSession }));
    expect(await first).toEqual(await second);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(refreshed).toHaveBeenCalledTimes(1);
  });

  it('clears authentication when a refreshed token is still rejected', async () => {
    fetchMock
      .mockResolvedValueOnce(json({}, 401))
      .mockResolvedValueOnce(json({ success: true, data: refreshedSession }))
      .mockResolvedValueOnce(json({ message: 'Account suspended' }, 401));
    await expect(apiClient.get('/users')).rejects.toMatchObject({ status: 401 });
    expect(unauthorized).toHaveBeenCalledTimes(1);
    expect(getAccessToken()).toBeNull();
  });

  it('does not resurrect a session after logout while refresh is pending', async () => {
    const pending = deferredResponse();
    fetchMock.mockReturnValueOnce(pending.promise);
    const refreshing = performTokenRefresh();
    setAccessToken(null);
    pending.resolve(json({ success: true, data: refreshedSession }));
    expect(await refreshing).toBeNull();
    expect(getAccessToken()).toBeNull();
    expect(refreshed).not.toHaveBeenCalled();
  });

  it.each([200, 401])(
    'does not overwrite a new login when an older refresh returns %s',
    async (status) => {
      const pending = deferredResponse();
      fetchMock.mockReturnValueOnce(pending.promise);
      const refreshing = performTokenRefresh();
      setAccessToken('new-user-token');
      pending.resolve(json({ success: true, data: refreshedSession }, status));
      expect(await refreshing).toBeNull();
      expect(getAccessToken()).toBe('new-user-token');
      expect(refreshed).not.toHaveBeenCalled();
    },
  );

  it('discards records fetched for a previous account', async () => {
    const pending = deferredResponse();
    fetchMock.mockReturnValueOnce(pending.promise);
    const reading = apiClient.get('/students');
    setAccessToken('another-user-token');
    pending.resolve(json({ data: ['previous-user-record'] }));
    await expect(reading).rejects.toMatchObject({ code: 'SESSION_CHANGED' });
    expect(getAccessToken()).toBe('another-user-token');
    expect(unauthorized).not.toHaveBeenCalled();
  });

  it('rejects unsuccessful refresh payloads even if an access token is present', async () => {
    fetchMock.mockResolvedValueOnce(json({ success: false, data: refreshedSession }));
    expect(await performTokenRefresh()).toBeNull();
    expect(getAccessToken()).toBeNull();
    expect(refreshed).not.toHaveBeenCalled();
  });
});

describe('RFC 7807 Problem Details and REST API standardization', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', fetchMock);
    setAccessToken('test-token');
  });

  afterEach(() => {
    setAccessToken(null);
    vi.unstubAllGlobals();
  });

  it('parses RFC 7807 application/problem+json error responses into ApiClientError', async () => {
    const problemPayload = {
      type: 'https://api.kesararamwithdigital.tech/errors/VALIDATION_ERROR',
      title: 'Validation Error',
      status: 400,
      detail: 'Invalid payload submitted',
      instance: '/api/v1/students',
      code: 'VALIDATION_ERROR',
      timestamp: '2026-11-05T03:00:00.000Z',
      requestId: 'req-uuid-1234',
      errors: [{ field: 'email', message: 'Invalid email address' }],
    };

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(problemPayload), {
        status: 400,
        headers: {
          'Content-Type': 'application/problem+json',
          'X-Request-ID': 'req-uuid-1234',
          'X-Error-Code': 'VALIDATION_ERROR',
        },
      }),
    );

    let caughtError: unknown;
    try {
      await apiClient.post('/students', { email: 'bad' });
    } catch (err) {
      caughtError = err;
    }

    expect(caughtError).toBeInstanceOf(ApiClientError);
    const apiErr = caughtError as ApiClientError;
    expect(apiErr.status).toBe(400);
    expect(apiErr.code).toBe('VALIDATION_ERROR');
    expect(apiErr.type).toBe('https://api.kesararamwithdigital.tech/errors/VALIDATION_ERROR');
    expect(apiErr.title).toBe('Validation Error');
    expect(apiErr.detail).toBe('Invalid payload submitted');
    expect(apiErr.instance).toBe('/api/v1/students');
    expect(apiErr.requestId).toBe('req-uuid-1234');
    expect(apiErr.timestamp).toBe('2026-11-05T03:00:00.000Z');
    expect(apiErr.errors).toEqual([{ field: 'email', message: 'Invalid email address' }]);
    expect(apiErr.getHeader('x-request-id')).toBe('req-uuid-1234');
    expect(apiErr.message).toContain('email - Invalid email address');
  });

  it('handles HTTP 201 Created with Location header and exposes raw headers via apiClient.raw', async () => {
    const createdPayload = {
      success: true,
      data: { id: 'stu-999', name: 'New Student' },
      message: 'Student created',
      meta: { page: 1, limit: 20, total: 1, totalPages: 1 },
    };

    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify(createdPayload), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          Location: '/api/v1/students/stu-999',
          ETag: 'W/"etag-xyz"',
          'X-Request-ID': 'req-create-123',
        },
      }),
    );

    const raw = await apiClient.raw<typeof createdPayload>('/students', { method: 'POST' });
    expect(raw.status).toBe(201);
    expect(raw.location).toBe('/api/v1/students/stu-999');
    expect(raw.etag).toBe('W/"etag-xyz"');
    expect(raw.requestId).toBe('req-create-123');
    expect(raw.data.data.id).toBe('stu-999');
    expect((raw.data as unknown as { pagination: unknown }).pagination).toEqual(
      createdPayload.meta,
    );
  });

  it('handles HTTP 204 No Content gracefully without JSON parsing syntax errors', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(null, {
        status: 204,
        statusText: 'No Content',
      }),
    );

    const result = await apiClient.delete<{ success: boolean; data: null }>('/students/stu-123');
    expect(result).toEqual({
      success: true,
      message: 'Operation completed successfully',
      data: null,
    });
  });

  it('handles HTTP 202 Accepted for batch/async operations', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, message: 'Processing batch' }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const result = await apiClient.post<{ success: boolean; message: string }>(
      '/students/batch',
      {},
    );
    expect(result.success).toBe(true);
    expect(result.message).toBe('Processing batch');
  });

  it('captures Rate Limited 429 status and Retry-After response header', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          type: 'https://api.kesararamwithdigital.tech/errors/RATE_LIMIT_EXCEEDED',
          title: 'Rate Limit Exceeded',
          status: 429,
          detail: 'Too many requests, please retry after 60 seconds',
          code: 'RATE_LIMIT_EXCEEDED',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/problem+json',
            'Retry-After': '60',
          },
        },
      ),
    );

    let caught: unknown;
    try {
      await apiClient.get('/students');
    } catch (e) {
      caught = e;
    }

    expect(caught).toBeInstanceOf(ApiClientError);
    const err = caught as ApiClientError;
    expect(err.status).toBe(429);
    expect(err.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(err.getHeader('retry-after')).toBe('60');
    expect(err.retryAfter).toBe(60);
  });

  it('captures 401 Unauthorized status and WWW-Authenticate response header', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          type: 'https://api.kesararamwithdigital.tech/errors/UNAUTHORIZED',
          title: 'Unauthorized',
          status: 401,
          detail: 'Session expired or token invalid',
          code: 'UNAUTHORIZED',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/problem+json',
            'WWW-Authenticate': 'Bearer error="invalid_token", error_description="Token expired"',
          },
        },
      ),
    );

    let caught: unknown;
    try {
      await apiClient.get('/secure-profile');
    } catch (e) {
      caught = e;
    }

    expect(caught).toBeInstanceOf(ApiClientError);
    const err = caught as ApiClientError;
    expect(err.status).toBe(401);
    expect(err.code).toBe('UNAUTHORIZED');
    expect(err.wwwAuthenticate).toContain('Bearer error="invalid_token"');
  });

  it('bidirectionally populates meta from pagination, and pagination from meta', async () => {
    // 1. Backend returns legacy pagination -> apiClient populates meta
    fetchMock.mockResolvedValueOnce(
      json({
        success: true,
        data: ['a', 'b'],
        pagination: { page: 1, limit: 20, total: 2, totalPages: 1 },
      }),
    );
    const res1 = await apiClient.get<{ meta: unknown; pagination: unknown }>('/test1');
    expect(res1.meta).toEqual(res1.pagination);

    // 2. Backend returns new meta (with hasMore and nextCursor) -> apiClient populates pagination
    fetchMock.mockResolvedValueOnce(
      json({
        success: true,
        data: ['c', 'd'],
        meta: { page: 2, limit: 20, total: 40, totalPages: 2, hasMore: false, nextCursor: null },
      }),
    );
    const res2 = await apiClient.get<{ meta: unknown; pagination: unknown }>('/test2');
    expect(res2.pagination).toEqual(res2.meta);
  });
});
