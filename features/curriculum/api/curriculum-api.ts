import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { CurriculumFormValues } from '../schemas';
import type { Curriculum, CurriculumFilters } from '../types';

export const getCurricula = async (filters: CurriculumFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.levelId) params.append('levelId', filters.levelId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/curriculum${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Curriculum>>(url);
};

export const getCurriculumById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Curriculum>>(`/curriculum/${id}`);
};

export const createCurriculum = async (data: CurriculumFormValues) => {
  return apiClient.post<ApiSuccessResponse<Curriculum>>('/curriculum', data);
};

export const updateCurriculum = async (id: string, data: Partial<CurriculumFormValues>) => {
  return apiClient.patch<ApiSuccessResponse<Curriculum>>(`/curriculum/${id}`, data);
};

export const deleteCurriculum = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/curriculum/${id}`);
};
