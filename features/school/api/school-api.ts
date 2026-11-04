import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { SchoolFormData } from '../schemas';
import type { School, SchoolFilters } from '../types';

export const getSchools = async (filters: SchoolFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/schools${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<School>>(url);
};

export const getSchoolById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<School>>(`/schools/${id}`);
};

export const createSchool = async (data: SchoolFormData) => {
  return apiClient.post<ApiSuccessResponse<School>>('/schools', data);
};

export const updateSchool = async (id: string, data: Partial<SchoolFormData>) => {
  return apiClient.patch<ApiSuccessResponse<School>>(`/schools/${id}`, data);
};

export const deleteSchool = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/schools/${id}`);
};
