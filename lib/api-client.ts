import { getApiBaseUrl } from './env';

export interface ApiClientErrorOptions {
  status: number;
  code?: string;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  requestId?: string;
  timestamp?: string;
  errors?: Array<{ field?: string; message: string }>;
  headers?: Headers;
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly type?: string;
  public readonly title?: string;
  public readonly detail?: string;
  public readonly instance?: string;
  public readonly requestId?: string;
  public readonly timestamp?: string;
  public readonly errors?: Array<{ field?: string; message: string }>;
  public readonly responseHeaders?: Record<string, string>;

  public constructor(
    message: string,
    status: number,
    codeOrOptions?: string | ApiClientErrorOptions,
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;

    if (typeof codeOrOptions === 'string') {
      this.code = codeOrOptions;
    } else if (codeOrOptions) {
      this.code = codeOrOptions.code;
      this.type = codeOrOptions.type;
      this.title = codeOrOptions.title;
      this.detail = codeOrOptions.detail;
      this.instance = codeOrOptions.instance;
      this.requestId = codeOrOptions.requestId;
      this.timestamp = codeOrOptions.timestamp;
      this.errors = codeOrOptions.errors;
      if (codeOrOptions.headers) {
        const headerObj: Record<string, string> = {};
        if (typeof codeOrOptions.headers.forEach === 'function') {
          codeOrOptions.headers.forEach((val, key) => {
            headerObj[key.toLowerCase()] = val;
          });
        } else if (
          typeof (codeOrOptions.headers as unknown as { entries?: () => Iterable<[string, string]> })
            .entries === 'function'
        ) {
          for (const [k, v] of (
            codeOrOptions.headers as unknown as { entries: () => Iterable<[string, string]> }
          ).entries()) {
            headerObj[String(k).toLowerCase()] = String(v);
          }
        } else if (typeof codeOrOptions.headers === 'object') {
          for (const [k, v] of Object.entries(codeOrOptions.headers)) {
            headerObj[k.toLowerCase()] = String(v);
          }
        }
        this.responseHeaders = headerObj;
      }
    }
  }

  /** Retrieve a response header by name (case-insensitive) */
  public getHeader(name: string): string | undefined {
    return this.responseHeaders?.[name.toLowerCase()];
  }

  /** Retrieve numeric Retry-After value in seconds if present (HTTP 429) */
  public get retryAfter(): number | undefined {
    const header = this.getHeader('retry-after');
    if (!header) return undefined;
    const parsed = parseInt(header, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  /** Retrieve WWW-Authenticate header if present (HTTP 401) */
  public get wwwAuthenticate(): string | undefined {
    return this.getHeader('www-authenticate');
  }
}

export interface RawApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
  location: string | null;
  etag: string | null;
  requestId: string | null;
}

interface ApiErrorPayload {
  message?: string;
  code?: string;
  type?: string;
  title?: string;
  detail?: string;
  instance?: string;
  requestId?: string;
  timestamp?: string;
  errors?: Array<{ field?: string; message: string }>;
}

export interface RefreshResponsePayload<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

let inMemoryAccessToken: string | null = null;
let sessionVersion = 0;

// Perf: cache the resolved API base URL — avoids repeated URL construction on every request.
let _cachedApiBaseUrl: string | null = null;
const resolvedApiBaseUrl = (): string => {
  if (_cachedApiBaseUrl === null) _cachedApiBaseUrl = getApiBaseUrl();
  return _cachedApiBaseUrl;
};

// Perf: cache the active branch ID in memory so we avoid a synchronous localStorage read on
// every single request. The cache is invalidated whenever the caller writes a new value.
let _cachedBranchId: string | null | undefined = undefined; // undefined = not yet read

/** Call this whenever the active branch changes so the cache stays current. */
export const setActiveBranchId = (branchId: string | null): void => {
  _cachedBranchId = branchId === 'all' ? null : branchId;
  if (typeof window !== 'undefined') {
    try {
      if (branchId && branchId !== 'all') {
        localStorage.setItem('snp_active_branch_id', branchId);
      } else {
        localStorage.removeItem('snp_active_branch_id');
      }
    } catch {
      // Ignore localStorage errors
    }
  }
};

const getActiveBranchId = (): string | null => {
  if (_cachedBranchId !== undefined) return _cachedBranchId;
  if (typeof window === 'undefined') {
    _cachedBranchId = null;
    return null;
  }
  try {
    const stored = localStorage.getItem('snp_active_branch_id');
    _cachedBranchId = stored && stored !== 'all' ? stored : null;
  } catch {
    _cachedBranchId = null;
  }
  return _cachedBranchId;
};

const getHeaderFromResponse = (res: Response, name: string): string | null => {
  if (res.headers && typeof res.headers.get === 'function') {
    return res.headers.get(name);
  }
  return null;
};

let refreshPromise: Promise<RefreshResponsePayload<{
  accessToken: string;
  user: unknown;
}> | null> | null = null;
let unauthorizedHandler: (() => void) | null = null;
let sessionRefreshHandler: ((session: { accessToken: string; user: unknown }) => void) | null =
  null;

export const setAccessToken = (token: string | null): void => {
  sessionVersion += 1;
  inMemoryAccessToken = token;
};

export const getAccessToken = (): string | null => inMemoryAccessToken;

export const setUnauthorizedHandler = (handler: (() => void) | null): void => {
  unauthorizedHandler = handler;
};

export const setSessionRefreshHandler = (handler: typeof sessionRefreshHandler): void => {
  sessionRefreshHandler = handler;
};

export const performTokenRefresh = async <
  T = { accessToken: string; user: unknown },
>(): Promise<RefreshResponsePayload<T> | null> => {
  if (refreshPromise) {
    return refreshPromise as Promise<RefreshResponsePayload<T> | null>;
  }

  const refreshingSessionVersion = sessionVersion;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json, application/problem+json',
          'Content-Type': 'application/json',
        },
      });

      if (refreshingSessionVersion !== sessionVersion) return null;
      if (!response.ok) {
        inMemoryAccessToken = null;
        return null;
      }

      const payload = (await response.json()) as RefreshResponsePayload<{
        accessToken: string;
        user: unknown;
      }>;

      if (refreshingSessionVersion !== sessionVersion) return null;
      if (!payload.success || !payload.data?.accessToken || !payload.data.user) {
        inMemoryAccessToken = null;
        return null;
      }
      inMemoryAccessToken = payload.data.accessToken;
      sessionRefreshHandler?.(payload.data);
      return payload;
    } catch {
      if (refreshingSessionVersion === sessionVersion) inMemoryAccessToken = null;
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise as Promise<RefreshResponsePayload<T> | null>;
};

const silentRefreshToken = async (): Promise<string | null> => {
  const result = await performTokenRefresh();
  return (result?.data as { accessToken?: string } | undefined)?.accessToken ?? null;
};

interface ExecuteRequestResult<T> {
  payload: T;
  response: Response;
}

const executeRequest = async <T>(
  path: string,
  init?: RequestInit,
  isRetry = false,
): Promise<ExecuteRequestResult<T>> => {
  const requestSessionVersion = sessionVersion;
  const method = (init?.method ?? 'GET').toUpperCase();
  // Perf: skip Content-Type on GET/HEAD/DELETE — they carry no body. Avoids unnecessary header
  // negotiation overhead on the read-heavy hot path.
  const isBodyless = method === 'GET' || method === 'HEAD' || method === 'DELETE';
  // Perf: allocate directly with fixed shape to avoid spread-operator hidden-class deopts in V8.
  const headers: Record<string, string> = isBodyless
    ? { Accept: 'application/json, application/problem+json' }
    : {
        Accept: 'application/json, application/problem+json',
        'Content-Type': 'application/json',
      };

  if (init?.headers) {
    Object.assign(headers, init.headers);
  }

  if (inMemoryAccessToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${inMemoryAccessToken}`;
  }

  // Perf: use the in-memory cached branch ID instead of calling localStorage on every request.
  if (!headers['X-Branch-Id']) {
    const branchId = getActiveBranchId();
    if (branchId) headers['X-Branch-Id'] = branchId;
  }

  const response = await fetch(`${resolvedApiBaseUrl()}${path}`, {
    ...init,
    credentials: 'include',
    headers,
  });

  if (requestSessionVersion !== sessionVersion) {
    throw new ApiClientError(
      'The active session changed during the request',
      401,
      'SESSION_CHANGED',
    );
  }

  if (
    response.status === 401 &&
    !isRetry &&
    !path.startsWith('/auth/login') &&
    !path.startsWith('/auth/refresh')
  ) {
    const newToken = await silentRefreshToken();
    if (requestSessionVersion !== sessionVersion) {
      throw new ApiClientError(
        'The active session changed during the request',
        401,
        'SESSION_CHANGED',
      );
    }
    if (newToken) {
      return executeRequest<T>(path, init, true);
    }
    if (unauthorizedHandler) {
      unauthorizedHandler();
    }
  }

  if (response.status === 401 && isRetry) {
    inMemoryAccessToken = null;
    unauthorizedHandler?.();
  }

  if (!response.ok) {
    const errorPayload = (typeof response.json === 'function'
      ? await response.json().catch(() => ({}))
      : {}) as ApiErrorPayload;

    const requestId =
      errorPayload.requestId ||
      getHeaderFromResponse(response, 'x-request-id') ||
      undefined;

    const errorCode =
      errorPayload.code ||
      getHeaderFromResponse(response, 'x-error-code') ||
      undefined;

    const title = errorPayload.title;
    const detail = errorPayload.detail || errorPayload.message;
    const errorsList = Array.isArray(errorPayload.errors) ? errorPayload.errors : undefined;

    const firstFieldErr = errorsList?.[0];
    let resolvedMsg = detail || title || response.statusText || 'Unable to complete the request';
    if (firstFieldErr?.message && firstFieldErr?.field) {
      resolvedMsg = `${resolvedMsg}: ${firstFieldErr.field} - ${firstFieldErr.message}`;
    } else if (firstFieldErr?.message) {
      resolvedMsg = `${resolvedMsg}: ${firstFieldErr.message}`;
    }

    throw new ApiClientError(resolvedMsg, response.status, {
      status: response.status,
      code: errorCode,
      type: errorPayload.type,
      title,
      detail,
      instance: errorPayload.instance,
      requestId,
      timestamp: errorPayload.timestamp,
      errors: errorsList,
      headers: response.headers,
    });
  }

  // Handle 204 No Content or empty responses safely (no body to parse)
  if (
    response.status === 204 ||
    (response.status === 200 && getHeaderFromResponse(response, 'content-length') === '0')
  ) {
    const emptyPayload = {
      success: true,
      message: 'Operation completed successfully',
      data: null,
    } as unknown as T;
    return { payload: emptyPayload, response };
  }

  let payload: T;
  if (typeof response.json === 'function') {
    try {
      payload = (await response.json()) as T;
    } catch {
      payload = {
        success: true,
        message:
          response.status === 201
            ? 'Resource created successfully'
            : response.status === 202
              ? 'Request accepted'
              : 'Operation completed successfully',
        data: null,
      } as unknown as T;
    }
  } else if (typeof response.text === 'function') {
    const text = await response.text();
    payload = text
      ? (JSON.parse(text) as T)
      : ({
          success: true,
          message:
            response.status === 201
              ? 'Resource created successfully'
              : response.status === 202
                ? 'Request accepted'
                : 'Operation completed successfully',
          data: null,
        } as unknown as T);
  } else {
    payload = {
      success: true,
      message: 'Operation completed successfully',
      data: null,
    } as unknown as T;
  }

  if (requestSessionVersion !== sessionVersion) {
    throw new ApiClientError(
      'The active session changed during the request',
      401,
      'SESSION_CHANGED',
    );
  }

  // Bidirectional envelope normalization: guarantee both `meta` and `pagination` are populated
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    if (record.meta && !record.pagination) {
      record.pagination = record.meta;
    } else if (record.pagination && !record.meta) {
      record.meta = record.pagination;
    }
  }

  return { payload, response };
};

const baseRequest = async <T>(path: string, init?: RequestInit, isRetry = false): Promise<T> => {
  const { payload } = await executeRequest<T>(path, init, isRetry);
  return payload;
};

const rawRequest = async <T>(path: string, init?: RequestInit): Promise<RawApiResponse<T>> => {
  const { payload, response } = await executeRequest<T>(path, init, false);
  return {
    data: payload,
    status: response.status,
    headers: response.headers,
    location: getHeaderFromResponse(response, 'location'),
    etag: getHeaderFromResponse(response, 'etag'),
    requestId: getHeaderFromResponse(response, 'x-request-id'),
  };
};

export const apiClient = Object.assign(baseRequest, {
  get: <T>(path: string, init?: RequestInit) => baseRequest<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    baseRequest<T>(path, {
      ...init,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(path: string, body?: unknown, init?: RequestInit) =>
    baseRequest<T>(path, {
      ...init,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    baseRequest<T>(path, {
      ...init,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(path: string, init?: RequestInit) =>
    baseRequest<T>(path, { ...init, method: 'DELETE' }),
  raw: rawRequest,
  setAccessToken,
  getAccessToken,
  setUnauthorizedHandler,
  setActiveBranchId,
});
