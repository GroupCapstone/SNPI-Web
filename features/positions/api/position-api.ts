import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { PositionFormData } from '../schemas';
import type { Position, PositionFilters } from '../types';

export const getPositions = async (filters: PositionFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.departmentId) params.append('departmentId', filters.departmentId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/positions${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Position>>(url);
};

export const getPositionById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Position>>(`/positions/${id}`);
};

export const createPosition = async (data: PositionFormData) => {
  return apiClient.post<ApiSuccessResponse<Position>>('/positions', data);
};

export const updatePosition = async (id: string, data: Partial<PositionFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Position>>(`/positions/${id}`, data);
};

export const deletePosition = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/positions/${id}`);
};
