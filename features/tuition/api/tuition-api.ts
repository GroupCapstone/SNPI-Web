import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { TuitionFeeFormData } from '../schemas';
import type { TuitionFee, TuitionFeeFilters } from '../types';

export const getTuitionFees = async (filters: TuitionFeeFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.levelId) params.append('levelId', filters.levelId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/tuition-fees${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<TuitionFee>>(url);
};

export const getTuitionFeeById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<TuitionFee>>(`/tuition-fees/${id}`);
};

export const createTuitionFee = async (data: TuitionFeeFormData) => {
  return apiClient.post<ApiSuccessResponse<TuitionFee>>('/tuition-fees', data);
};

export const updateTuitionFee = async (id: string, data: Partial<TuitionFeeFormData>) => {
  return apiClient.patch<ApiSuccessResponse<TuitionFee>>(`/tuition-fees/${id}`, data);
};

export const deleteTuitionFee = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/tuition-fees/${id}`);
};
