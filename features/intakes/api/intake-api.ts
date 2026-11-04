import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { CreateIntakeInput, Intake, UpdateIntakeInput } from '../types';

export interface IntakeFilters {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  programId?: string;
  levelId?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const getIntakes = async (filters: IntakeFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.academicPeriodId) params.append('academicPeriodId', filters.academicPeriodId);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.levelId) params.append('levelId', filters.levelId);
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/intakes${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Intake>>(url);
};

export const createIntake = async (data: CreateIntakeInput) => {
  return apiClient.post<ApiSuccessResponse<Intake>>('/intakes', data);
};

export const updateIntake = async (id: string, data: UpdateIntakeInput) => {
  return apiClient.patch<ApiSuccessResponse<Intake>>(`/intakes/${id}`, data);
};

export const deleteIntake = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/intakes/${id}`);
};
