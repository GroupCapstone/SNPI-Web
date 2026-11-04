import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  AcademicPeriod,
  CreateAcademicPeriodInput,
  GenerateMonthlyPeriodsInput,
  GenerateMonthlyPeriodsResult,
  UpdateAcademicPeriodInput,
} from '../types';

export interface AcademicPeriodFilters {
  academicYearId?: string;
  type?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const getAcademicPeriods = async (filters: AcademicPeriodFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.type) params.append('type', filters.type);
  if (filters.status) params.append('status', filters.status);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/academic-periods${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<AcademicPeriod>>(url);
};

export const createAcademicPeriod = async (data: CreateAcademicPeriodInput) => {
  return apiClient.post<ApiSuccessResponse<AcademicPeriod>>('/academic-periods', data);
};

export const updateAcademicPeriod = async (id: string, data: UpdateAcademicPeriodInput) => {
  return apiClient.patch<ApiSuccessResponse<AcademicPeriod>>(`/academic-periods/${id}`, data);
};

export const deleteAcademicPeriod = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/academic-periods/${id}`);
};

export const generateMonthlyPeriods = async (data: GenerateMonthlyPeriodsInput) => {
  return apiClient.post<ApiSuccessResponse<GenerateMonthlyPeriodsResult>>(
    '/academic-periods/generate-monthly',
    data,
  );
};
