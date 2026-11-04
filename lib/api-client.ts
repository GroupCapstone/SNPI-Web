import { getApiBaseUrl } from './env';

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code?: string;

  public constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
  }
}

interface ApiErrorPayload {
  message?: string;
  code?: string;
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
          Accept: 'application/json',
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

const baseRequest = async <T>(path: string, init?: RequestInit, isRetry = false): Promise<T> => {
  const requestSessionVersion = sessionVersion;
  const method = (init?.method ?? 'GET').toUpperCase();
  // Perf: skip Content-Type on GET/HEAD/DELETE — they carry no body. Avoids unnecessary header
  // negotiation overhead on the read-heavy hot path.
  const isBodyless = method === 'GET' || method === 'HEAD' || method === 'DELETE';
  // Perf: allocate directly with fixed shape to avoid spread-operator hidden-class deopts in V8.
  const headers: Record<string, string> = isBodyless
    ? { Accept: 'application/json' }
    : { Accept: 'application/json', 'Content-Type': 'application/json' };

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
      return baseRequest<T>(path, init, true);
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
    const errorPayload = (await response.json().catch(() => ({}))) as ApiErrorPayload;
    const detailMsg = errorPayload.errors?.[0]?.message;
    const fieldName = errorPayload.errors?.[0]?.field;
    const resolvedMsg =
      detailMsg && fieldName
        ? `${errorPayload.message ?? 'Validation failed'}: ${fieldName} - ${detailMsg}`
        : (errorPayload.message ?? 'Unable to complete the request');

    throw new ApiClientError(resolvedMsg, response.status, errorPayload.code);
  }

  const payload = (await response.json()) as T;
  if (requestSessionVersion !== sessionVersion) {
    throw new ApiClientError(
      'The active session changed during the request',
      401,
      'SESSION_CHANGED',
    );
  }
  return payload;
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
  setAccessToken,
  getAccessToken,
  setUnauthorizedHandler,
  setActiveBranchId,
});
