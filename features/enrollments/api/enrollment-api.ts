import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreateEnrollmentPayload,
  Enrollment,
  EnrollmentQueryFilters,
  UpdateEnrollmentPayload,
} from '../types';

export const getEnrollmentsApi = async (
  filters?: EnrollmentQueryFilters,
): Promise<ApiPaginatedResponse<Enrollment>> => {
  return apiClient.get<ApiPaginatedResponse<Enrollment>>(
    `/enrollments${buildQueryString(filters)}`,
  );
};

export const getEnrollmentByIdApi = async (id: string): Promise<ApiSuccessResponse<Enrollment>> => {
  return apiClient.get<ApiSuccessResponse<Enrollment>>(`/enrollments/${id}`);
};

export const createEnrollmentApi = async (
  payload: CreateEnrollmentPayload,
): Promise<ApiSuccessResponse<Enrollment>> => {
  return apiClient.post<ApiSuccessResponse<Enrollment>>('/enrollments', payload);
};

export const updateEnrollmentApi = async (
  id: string,
  payload: UpdateEnrollmentPayload,
): Promise<ApiSuccessResponse<Enrollment>> => {
  return apiClient.patch<ApiSuccessResponse<Enrollment>>(`/enrollments/${id}`, payload);
};

export const deleteEnrollmentApi = async (id: string): Promise<ApiSuccessResponse<null>> => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/enrollments/${id}`);
};
