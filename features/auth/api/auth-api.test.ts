import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient, performTokenRefresh } from '@/lib/api-client';

import {
  adminReset2FaApi,
  changePasswordApi,
  disable2FaApi,
  enable2FaApi,
  getMeApi,
  linkTelegram2FaApi,
  loginApi,
  logoutApi,
  refreshApi,
  requestTelegramOtpApi,
  setup2FaApi,
  verify2FaApi,
} from './auth-api';

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

  it('calls 2FA verify endpoint with code and mfaToken', async () => {
    const mockResponse = {
      success: true,
      data: {
        user: { id: '1', username: 'admin', email: 'admin@snp.edu.kh' },
        accessToken: 'verified-2fa-token',
      },
    };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await verify2FaApi({ mfaToken: 'mfa-tok-123', code: '123456' });

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/verify', {
      mfaToken: 'mfa-tok-123',
      code: '123456',
    });
    expect(result).toEqual(mockResponse);
  });

  it('calls 2FA telegram request OTP endpoint', async () => {
    const mockResponse = { success: true, message: 'OTP sent to Telegram' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await requestTelegramOtpApi('mfa-tok-123');

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/telegram/request-otp', {
      mfaToken: 'mfa-tok-123',
    });
    expect(result).toEqual(mockResponse);
  });

  it('calls 2FA setup endpoint', async () => {
    const mockResponse = {
      success: true,
      message: 'Setup initiated',
      data: {
        secret: 'JBSWY3DPEHPK3PXP',
        otpauthUri: 'otpauth://totp/SNP:admin?secret=JBSWY3DPEHPK3PXP',
        qrCodeDataUrl: 'data:image/png;base64,...',
        backupCodes: ['8F2K-92JA', 'X93K-11LA'],
      },
    };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await setup2FaApi();

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/setup', {});
    expect(result).toEqual(mockResponse);
  });

  it('calls 2FA enable endpoint with verification code', async () => {
    const mockResponse = { success: true, message: '2FA enabled' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await enable2FaApi('654321');

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/enable', { code: '654321' });
    expect(result).toEqual(mockResponse);
  });

  it('calls 2FA disable endpoint with password and code', async () => {
    const mockResponse = { success: true, message: '2FA disabled' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await disable2FaApi({ password: 'Password@123', code: '123456' });

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/disable', {
      password: 'Password@123',
      code: '123456',
    });
    expect(result).toEqual(mockResponse);
  });

  it('calls 2FA link Telegram endpoint with chatId', async () => {
    const mockResponse = { success: true, message: 'Telegram linked' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await linkTelegram2FaApi('987654321');

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/telegram/link', {
      telegramChatId: '987654321',
    });
    expect(result).toEqual(mockResponse);
  });

  it('calls admin break-glass reset 2FA endpoint for user id', async () => {
    const mockResponse = { success: true, message: '2FA reset for user' };
    vi.mocked(apiClient.post).mockResolvedValue(mockResponse);

    const result = await adminReset2FaApi('user-999');

    expect(apiClient.post).toHaveBeenCalledWith('/auth/2fa/reset-user/user-999', {});
    expect(result).toEqual(mockResponse);
  });
});
