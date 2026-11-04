import { apiClient } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import type {
  AcademicHonorRollFilters,
  AcademicHonorRollResponse,
  DashboardActionItemsFilters,
  DashboardActionItemsResponse,
  FinancePulseResponse,
  HrPulseResponse,
  StudentAffairsPulseResponse,
} from '../types';

export const getDashboardActionItems = async (filters: DashboardActionItemsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.academicYearId) params.set('academicYearId', filters.academicYearId);
  if (filters.year) params.set('year', String(filters.year));
  if (filters.month) params.set('month', String(filters.month));
  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<DashboardActionItemsResponse>>(
    `/dashboard/action-items${query ? `?${query}` : ''}`,
  );
};

export const getFinancePulseApi = async (filters: DashboardActionItemsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.academicYearId) params.set('academicYearId', filters.academicYearId);
  if (filters.year) params.set('year', String(filters.year));
  if (filters.month) params.set('month', String(filters.month));
  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<FinancePulseResponse>>(
    `/dashboard/finance-pulse${query ? `?${query}` : ''}`,
  );
};

export const getStudentAffairsPulseApi = async (filters: DashboardActionItemsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.academicYearId) params.set('academicYearId', filters.academicYearId);
  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<StudentAffairsPulseResponse>>(
    `/dashboard/student-affairs-pulse${query ? `?${query}` : ''}`,
  );
};

export const getHrPulseApi = async (filters: DashboardActionItemsFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<HrPulseResponse>>(
    `/dashboard/hr-pulse${query ? `?${query}` : ''}`,
  );
};

export const getAcademicHonorRollApi = async (filters: AcademicHonorRollFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.academicYearId) params.set('academicYearId', filters.academicYearId);
  if (filters.academicPeriodId) params.set('academicPeriodId', filters.academicPeriodId);
  if (filters.classId) params.set('classId', filters.classId);
  if (filters.limit) params.set('limit', String(filters.limit));
  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<AcademicHonorRollResponse>>(
    `/dashboard/academic-honor-roll${query ? `?${query}` : ''}`,
  );
};
