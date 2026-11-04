import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type { SystemSetting, SystemSettingInput } from '../types';

export const getSystemSettings = async (category?: string, branchId?: string) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (branchId) params.append('branchId', branchId);
  params.append('limit', '100');
  return apiClient.get<ApiPaginatedResponse<SystemSetting>>(
    `/system-settings?${params.toString()}`,
  );
};

export const createSystemSetting = async (data: SystemSettingInput) =>
  apiClient.post<ApiSuccessResponse<SystemSetting>>('/system-settings', data);

export const updateSystemSetting = async (
  id: string,
  data: Partial<Omit<SystemSettingInput, 'key' | 'schoolId' | 'branchId'>>,
) => apiClient.patch<ApiSuccessResponse<SystemSetting>>(`/system-settings/${id}`, data);

export const deleteSystemSetting = async (id: string) =>
  apiClient.delete<ApiSuccessResponse<null>>(`/system-settings/${id}`);
