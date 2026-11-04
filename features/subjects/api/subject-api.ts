import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { SubjectFormData } from '../schemas';
import type { Subject, SubjectFilters } from '../types';

export const getSubjects = async (filters: SubjectFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<Subject>>(`/subjects${buildQueryString(filters)}`);
};

export const createSubject = async (data: SubjectFormData) => {
  return apiClient.post<ApiSuccessResponse<Subject>>('/subjects', data);
};

export const updateSubject = async (id: string, data: Partial<SubjectFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Subject>>(`/subjects/${id}`, data);
};

export const deleteSubject = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/subjects/${id}`);
};
