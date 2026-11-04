import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
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
