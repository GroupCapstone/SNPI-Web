import { ApiClientError, apiClient, performTokenRefresh } from '@/lib/api-client';

import type { ChangePasswordFormData } from '../schemas/change-password-schema';
import type { LoginFormData } from '../schemas/login-schema';
import type { AuthApiResponse, AuthUser, LoginResponseData } from '../types';

export const loginApi = async (
  data: LoginFormData,
): Promise<AuthApiResponse<LoginResponseData>> => {
  return apiClient.post<AuthApiResponse<LoginResponseData>>('/auth/login', data);
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
