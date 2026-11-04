import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { CompleteTermInput, TermResult, TransitionTermResultInput } from '../types';

export interface TermResultFilters {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  programId?: string;
  levelId?: string;
  classId?: string;
  studentId?: string;
  resultStatus?: string;
  promotionStatus?: string;
  workflowStatus?: string;
  isCompleted?: boolean;
  page?: number;
  limit?: number;
}

export const getTermResults = async (filters: TermResultFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.academicPeriodId) params.append('academicPeriodId', filters.academicPeriodId);
  if (filters.programId) params.append('programId', filters.programId);
  if (filters.levelId) params.append('levelId', filters.levelId);
  if (filters.classId) params.append('classId', filters.classId);
  if (filters.studentId) params.append('studentId', filters.studentId);
  if (filters.resultStatus) params.append('resultStatus', filters.resultStatus);
  if (filters.promotionStatus) params.append('promotionStatus', filters.promotionStatus);
  if (filters.workflowStatus) params.append('workflowStatus', filters.workflowStatus);
  if (filters.isCompleted !== undefined) params.append('isCompleted', String(filters.isCompleted));
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/term-results${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<TermResult>>(url);
};

export const calculateClassTermResults = async (classId: string) => {
  return apiClient.post<ApiSuccessResponse<{ calculatedCount: number }>>(
    '/term-results/calculate-class',
    {
      classId,
    },
  );
};

export const completeTermResult = async (id: string, data: CompleteTermInput) => {
  return apiClient.post<ApiSuccessResponse<TermResult>>(`/term-results/${id}/complete`, data);
};

export const transitionTermResult = async (id: string, data: TransitionTermResultInput) => {
  return apiClient.post<ApiSuccessResponse<TermResult>>(
    `/term-results/${id}/workflow-transition`,
    data,
  );
};
