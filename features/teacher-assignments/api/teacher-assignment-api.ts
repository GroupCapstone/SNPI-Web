import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreateTeacherAssignmentPayload,
  TeacherAssignment,
  TeacherAssignmentQueryFilters,
  TeacherRosterFilters,
  TeacherRosterMatrixResponse,
  UpdateTeacherAssignmentPayload,
} from '../types';

export const getTeacherRosterMatrixApi = async (
  filters?: TeacherRosterFilters,
): Promise<ApiSuccessResponse<TeacherRosterMatrixResponse>> => {
  const params = new URLSearchParams();
  if (filters?.branchId && filters.branchId !== 'all') params.append('branchId', filters.branchId);
  if (filters?.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters?.academicPeriodId) params.append('academicPeriodId', filters.academicPeriodId);
  if (filters?.employeeId) params.append('employeeId', filters.employeeId);
  if (filters?.search) params.append('search', filters.search);

  const query = params.toString();
  return apiClient.get<ApiSuccessResponse<TeacherRosterMatrixResponse>>(
    `/teacher-assignments/roster-matrix${query ? `?${query}` : ''}`,
  );
};

export const getTeacherAssignmentsApi = async (
  filters?: TeacherAssignmentQueryFilters,
): Promise<ApiPaginatedResponse<TeacherAssignment>> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.schoolId) params.append('schoolId', filters.schoolId);
  if (filters?.branchId && filters.branchId !== 'all') params.append('branchId', filters.branchId);
  if (filters?.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters?.employeeId) params.append('employeeId', filters.employeeId);
  if (filters?.classId) params.append('classId', filters.classId);
  if (filters?.subjectId) params.append('subjectId', filters.subjectId);
  if (filters?.roleInClass) params.append('roleInClass', filters.roleInClass);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);
  if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<TeacherAssignment>>(
    `/teacher-assignments${query ? `?${query}` : ''}`,
  );
};

export const getTeacherAssignmentByIdApi = async (
  id: string,
): Promise<ApiSuccessResponse<TeacherAssignment>> => {
  return apiClient.get<ApiSuccessResponse<TeacherAssignment>>(`/teacher-assignments/${id}`);
};

export const createTeacherAssignmentApi = async (
  payload: CreateTeacherAssignmentPayload,
): Promise<ApiSuccessResponse<TeacherAssignment>> => {
  return apiClient.post<ApiSuccessResponse<TeacherAssignment>>('/teacher-assignments', payload);
};

export const updateTeacherAssignmentApi = async (
  id: string,
  payload: UpdateTeacherAssignmentPayload,
): Promise<ApiSuccessResponse<TeacherAssignment>> => {
  return apiClient.patch<ApiSuccessResponse<TeacherAssignment>>(
    `/teacher-assignments/${id}`,
    payload,
  );
};

export const deleteTeacherAssignmentApi = async (id: string): Promise<ApiSuccessResponse<null>> => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/teacher-assignments/${id}`);
};
