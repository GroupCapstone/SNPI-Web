import { ApiClientError, apiClient, performTokenRefresh } from '@/lib/api-client';

import type { ChangePasswordFormData } from '../schemas/change-password-schema';
import type { LoginFormData } from '../schemas/login-schema';
import type {
  AuthApiResponse,
  AuthUser,
  Disable2FaPayload,
  LoginResponseData,
  Setup2FaResponse,
  Verify2FaPayload,
} from '../types';

export const loginApi = async (
  data: LoginFormData,
): Promise<AuthApiResponse<LoginResponseData>> => {
  return apiClient.post<AuthApiResponse<LoginResponseData>>('/auth/login', data);
};

export const verify2FaApi = async (
  payload: Verify2FaPayload,
): Promise<AuthApiResponse<LoginResponseData>> => {
  return apiClient.post<AuthApiResponse<LoginResponseData>>('/auth/2fa/verify', payload);
};

export const requestTelegramOtpApi = async (
  mfaToken: string,
): Promise<AuthApiResponse<{ message: string }>> => {
  return apiClient.post<AuthApiResponse<{ message: string }>>('/auth/2fa/telegram/request-otp', {
    mfaToken,
  });
};

export const setup2FaApi = async (): Promise<Setup2FaResponse> => {
  return apiClient.post<Setup2FaResponse>('/auth/2fa/setup', {});
};

export const enable2FaApi = async (code: string): Promise<AuthApiResponse<{ message: string }>> => {
  return apiClient.post<AuthApiResponse<{ message: string }>>('/auth/2fa/enable', { code });
};

export const disable2FaApi = async (
  payload: Disable2FaPayload,
): Promise<AuthApiResponse<{ message: string }>> => {
  return apiClient.post<AuthApiResponse<{ message: string }>>('/auth/2fa/disable', payload);
};

export const linkTelegram2FaApi = async (
  telegramChatId: string,
): Promise<AuthApiResponse<{ message: string }>> => {
  return apiClient.post<AuthApiResponse<{ message: string }>>('/auth/2fa/telegram/link', {
    telegramChatId,
  });
};

export const adminReset2FaApi = async (
  userId: string,
): Promise<AuthApiResponse<{ message: string }>> => {
  return apiClient.post<AuthApiResponse<{ message: string }>>(`/auth/2fa/reset-user/${userId}`, {});
};

export const refreshApi = async (): Promise<AuthApiResponse<LoginResponseData>> => {
  const result = await performTokenRefresh<LoginResponseData>();
  if (!result || !result.success || !result.data) {
    throw new ApiClientError(result?.message ?? 'Session expired or not logged in', 401);
  }
  return result as AuthApiResponse<LoginResponseData>;
};

export const logoutApi = async (): Promise<AuthApiResponse<null>> => {
  return apiClient.post<AuthApiResponse<null>>('/auth/logout', {});
};

export const getMeApi = async (): Promise<AuthApiResponse<AuthUser>> => {
  return apiClient.get<AuthApiResponse<AuthUser>>('/auth/me');
};

export const changePasswordApi = async (
  data: ChangePasswordFormData,
): Promise<AuthApiResponse<null>> => {
  return apiClient.patch<AuthApiResponse<null>>('/auth/change-password', data);
};
