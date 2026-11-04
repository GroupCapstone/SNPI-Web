import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreateRegistrationPayload,
  Registration,
  RegistrationQueryFilters,
  UpdateRegistrationPayload,
} from '../types';

export const getRegistrationsApi = async (
  filters?: RegistrationQueryFilters,
): Promise<ApiPaginatedResponse<Registration>> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.schoolId) params.append('schoolId', filters.schoolId);
  if (filters?.branchId && filters.branchId !== 'all') params.append('branchId', filters.branchId);
  if (filters?.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters?.programId) params.append('programId', filters.programId);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);
  if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<Registration>>(
    `/registrations${query ? `?${query}` : ''}`,
  );
};

export const getRegistrationByIdApi = async (
  id: string,
): Promise<ApiSuccessResponse<Registration>> => {
  return apiClient.get<ApiSuccessResponse<Registration>>(`/registrations/${id}`);
};

export const createRegistrationApi = async (
  payload: CreateRegistrationPayload,
): Promise<ApiSuccessResponse<Registration>> => {
  return apiClient.post<ApiSuccessResponse<Registration>>('/registrations', payload);
};

export const updateRegistrationApi = async (
  id: string,
  payload: UpdateRegistrationPayload,
): Promise<ApiSuccessResponse<Registration>> => {
  return apiClient.patch<ApiSuccessResponse<Registration>>(`/registrations/${id}`, payload);
};

export const deleteRegistrationApi = async (id: string): Promise<ApiSuccessResponse<null>> => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/registrations/${id}`);
};
