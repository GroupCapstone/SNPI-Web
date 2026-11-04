import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  AdminResetPasswordDto,
  AdminResetPasswordResponse,
  User,
  UserFilters,
} from '../types';

export interface UserPayload {
  schoolId: string;
  employeeId?: string;
  username: string;
  email: string;
  password?: string;
  roles: string[];
  branchAccess: 'all' | string[];
  status: 'active' | 'inactive' | 'locked';
}

export const getUsers = async (filters: UserFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<User>>(`/users${buildQueryString(filters)}`);
};

export const getUserById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<User>>(`/users/${id}`);
};

export const createUser = async (data: UserPayload) => {
  return apiClient.post<ApiSuccessResponse<User>>('/users', data);
};

export const updateUser = async (id: string, data: Partial<UserPayload>) => {
  return apiClient.patch<ApiSuccessResponse<User>>(`/users/${id}`, data);
};

export const deleteUser = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/users/${id}`);
};

export const resetUserPassword = async (id: string, data?: AdminResetPasswordDto) => {
  return apiClient.post<ApiSuccessResponse<AdminResetPasswordResponse>>(
    `/users/${id}/reset-password`,
    data ?? {},
  );
};

export const updateUserStatus = async (
  id: string,
  status: 'active' | 'inactive' | 'locked' | 'suspended',
) => {
  return apiClient.patch<ApiSuccessResponse<User>>(`/users/${id}/status`, { status });
};
