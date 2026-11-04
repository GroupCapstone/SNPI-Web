import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  AcademicRuleFilters,
  AcademicRuleItem,
  CreateAcademicRuleDto,
  UpdateAcademicRuleDto,
} from '../types';

export const getAcademicRules = async (filters: AcademicRuleFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.ruleType) params.append('ruleType', filters.ruleType);
  if (filters.status) params.append('status', filters.status);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.academicPeriodId) params.append('academicPeriodId', filters.academicPeriodId);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.levelId) params.append('levelId', filters.levelId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<AcademicRuleItem>>(
    `/academic-rules${query ? `?${query}` : ''}`,
  );
};

export const getAcademicRuleById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<AcademicRuleItem>>(`/academic-rules/${id}`);
};

export const createAcademicRule = async (data: CreateAcademicRuleDto) => {
  return apiClient.post<ApiSuccessResponse<AcademicRuleItem>>('/academic-rules', data);
};

export const createAcademicRuleVersion = async (
  id: string,
  data: { effectiveFrom?: string; effectiveTo?: string; config?: Record<string, unknown> },
) => {
  return apiClient.post<ApiSuccessResponse<AcademicRuleItem>>(
    `/academic-rules/${id}/version`,
    data,
  );
};

export const updateAcademicRule = async (id: string, data: UpdateAcademicRuleDto) => {
  return apiClient.patch<ApiSuccessResponse<AcademicRuleItem>>(`/academic-rules/${id}`, data);
};
