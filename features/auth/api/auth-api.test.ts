import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient, performTokenRefresh } from '@/lib/api-client';

import { changePasswordApi, getMeApi, loginApi, logoutApi, refreshApi } from './auth-api';

vi.mock('@/lib/api-client', () => ({
  ApiClientError: class ApiClientError extends Error {
    public status: number;
    public constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
  },
  apiClient: {
    post: vi.fn(),
    get: vi.fn(),
    patch: vi.fn(),
  },
  performTokenRefresh: vi.fn(),
}));

describe('Auth API client tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls login endpoint with credentials', async () => {
    const mockResponse = {
      success: true,
      data: {
        user: { id: '1', username: 'admin', email: 'admin@snp.edu.kh' },
        accessToken: 'access-token-123',
      },
    };

    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await loginApi({ identifier: 'admin', password: 'Password@123' });

    expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
      identifier: 'admin',
      password: 'Password@123',
    });
    expect(result).toEqual(mockResponse);
  });

  it('calls refresh endpoint via performTokenRefresh', async () => {
    const mockResponse = {
      success: true,
      data: {
        user: { id: '1', username: 'admin', email: 'admin@snp.edu.kh' },
        accessToken: 'new-token-456',
      },
    };

    vi.mocked(performTokenRefresh).mockResolvedValue(mockResponse as never);

    const result = await refreshApi();

    expect(performTokenRefresh).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponse);
  });

  it('calls logout endpoint', async () => {
    const mockResponse = { success: true, message: 'Logged out successfully' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await logoutApi();

    expect(apiClient.post).toHaveBeenCalledWith('/auth/logout', {});
    expect(result).toEqual(mockResponse);
  });

  it('calls getMe endpoint', async () => {
    const mockResponse = {
      success: true,
      data: { id: '1', username: 'admin', email: 'admin@snp.edu.kh' },
    };

    vi.mocked(apiClient.get).mockResolvedValue(mockResponse);

    const result = await getMeApi();

    expect(apiClient.get).toHaveBeenCalledWith('/auth/me');
    expect(result).toEqual(mockResponse);
  });

  it('calls changePassword endpoint', async () => {
    const mockResponse = { success: true, message: 'Password changed successfully' };
    vi.mocked(apiClient.patch).mockResolvedValue(mockResponse);

    const result = await changePasswordApi({
      currentPassword: 'OldPassword@123',
      newPassword: 'NewPassword@123',
      confirmPassword: 'NewPassword@123',
    });

    expect(apiClient.patch).toHaveBeenCalledWith('/auth/change-password', {
      currentPassword: 'OldPassword@123',
      newPassword: 'NewPassword@123',
      confirmPassword: 'NewPassword@123',
    });
    expect(result).toEqual(mockResponse);
  });
});
