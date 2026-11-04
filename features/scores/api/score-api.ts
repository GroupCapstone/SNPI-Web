import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { BatchScorePayload, ScoreFilters, ScoreItem } from '../types';

export const getScores = async (filters: ScoreFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.assessmentId) params.append('assessmentId', filters.assessmentId);
  if (filters.classId) params.append('classId', filters.classId);
  if (filters.subjectId) params.append('subjectId', filters.subjectId);
  if (filters.studentId) params.append('studentId', filters.studentId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/scores${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<ScoreItem>>(url);
};

export const batchRecordScores = async (data: BatchScorePayload) => {
  return apiClient.post<ApiSuccessResponse<ScoreItem[]>>('/scores/batch', data);
};
