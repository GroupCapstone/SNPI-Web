import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { LevelFormData } from '../schemas';
import type { Level, LevelFilters } from '../types';

export const getLevels = async (filters: LevelFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/levels${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Level>>(url);
};

export const createLevel = async (data: LevelFormData) => {
  return apiClient.post<ApiSuccessResponse<Level>>('/levels', data);
};

export const updateLevel = async (id: string, data: Partial<LevelFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Level>>(`/levels/${id}`, data);
};

export const deleteLevel = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/levels/${id}`);
};
