import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { GroupedPermissionItem, PermissionItem, Role, RoleFilters } from '../types';

export interface RolePayload {
  code: string;
  nameEn: string;
  nameKh?: string;
  description?: string;
  permissions: string[];
  status?: 'active' | 'inactive';
}

export const getRoles = async (filters: RoleFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  if (filters.isSystem !== undefined) params.append('isSystem', String(filters.isSystem));
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/roles${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Role>>(url);
};

export const getRoleById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Role>>(`/roles/${id}`);
};

export const createRole = async (data: RolePayload) => {
  return apiClient.post<ApiSuccessResponse<Role>>('/roles', data);
};

export const updateRole = async (id: string, data: Partial<RolePayload>) => {
  return apiClient.patch<ApiSuccessResponse<Role>>(`/roles/${id}`, data);
};

export const deleteRole = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/roles/${id}`);
};

export const getAllPermissions = async () => {
  return apiClient.get<ApiSuccessResponse<PermissionItem[]>>('/permissions');
};

export const getGroupedPermissions = async () => {
  return apiClient.get<ApiSuccessResponse<GroupedPermissionItem[]>>('/permissions/grouped');
};
