import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { ClassFormData } from '../schemas';
import type { ClassAvailabilitySummary, ClassFilters, ClassItem } from '../types';

export const getClasses = async (filters: ClassFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<ClassItem>>(`/classes${buildQueryString(filters)}`);
};

export const getClassSummary = async (filters: Partial<ClassFilters> = {}) => {
  return apiClient.get<ApiSuccessResponse<ClassAvailabilitySummary>>(
    `/classes/summary${buildQueryString(filters)}`,
  );
};

export const getClassById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<ClassItem>>(`/classes/${id}`);
};

export const createClass = async (data: ClassFormData) => {
  return apiClient.post<ApiSuccessResponse<ClassItem>>('/classes', data);
};

export const updateClass = async (id: string, data: Partial<ClassFormData>) => {
  return apiClient.patch<ApiSuccessResponse<ClassItem>>(`/classes/${id}`, data);
};

export const deleteClass = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/classes/${id}`);
};
