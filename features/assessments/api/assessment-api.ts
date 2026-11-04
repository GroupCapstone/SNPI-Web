import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { AssessmentFormData } from '../schemas';
import type { Assessment, AssessmentFilters } from '../types';

export const getAssessments = async (filters: AssessmentFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<Assessment>>(
    `/assessments${buildQueryString(filters)}`,
  );
};

export const getAssessmentById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Assessment>>(`/assessments/${id}`);
};

export const createAssessment = async (data: AssessmentFormData) => {
  return apiClient.post<ApiSuccessResponse<Assessment>>('/assessments', data);
};

export const updateAssessment = async (id: string, data: Partial<AssessmentFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Assessment>>(`/assessments/${id}`, data);
};

export const deleteAssessment = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/assessments/${id}`);
};
