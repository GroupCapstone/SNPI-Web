import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  ConfirmImportPayload,
  ConfirmImportResponse,
  CreateStudentPayload,
  DuplicateCheckCriteria,
  DuplicateCheckResponse,
  ImportPreviewResponse,
  RawImportStudentRow,
  Student,
  StudentQueryFilters,
  UpdateStudentPayload,
} from '../types';

export const getStudentsApi = async (
  filters?: StudentQueryFilters,
): Promise<ApiPaginatedResponse<Student>> => {
  return apiClient.get<ApiPaginatedResponse<Student>>(`/students${buildQueryString(filters)}`);
};

export const getStudentByIdApi = async (id: string): Promise<ApiSuccessResponse<Student>> => {
  return apiClient.get<ApiSuccessResponse<Student>>(`/students/${id}`);
};

export const createStudentApi = async (
  payload: CreateStudentPayload,
): Promise<ApiSuccessResponse<Student>> => {
  return apiClient.post<ApiSuccessResponse<Student>>('/students', payload);
};

export const updateStudentApi = async (
  id: string,
  payload: UpdateStudentPayload,
): Promise<ApiSuccessResponse<Student>> => {
  return apiClient.patch<ApiSuccessResponse<Student>>(`/students/${id}`, payload);
};

export const deleteStudentApi = async (id: string): Promise<ApiSuccessResponse<null>> => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/students/${id}`);
};

export const checkDuplicatesApi = async (
  criteria: DuplicateCheckCriteria,
): Promise<ApiSuccessResponse<DuplicateCheckResponse>> => {
  return apiClient.post<ApiSuccessResponse<DuplicateCheckResponse>>(
    '/students/check-duplicates',
    criteria,
  );
};

export const previewImportApi = async (payload: {
  schoolId: string;
  branchId: string;
  rows: RawImportStudentRow[];
}): Promise<ApiSuccessResponse<ImportPreviewResponse>> => {
  return apiClient.post<ApiSuccessResponse<ImportPreviewResponse>>(
    '/students/import/preview',
    payload,
  );
};

export const confirmImportApi = async (
  payload: ConfirmImportPayload,
): Promise<ApiSuccessResponse<ConfirmImportResponse>> => {
  return apiClient.post<ApiSuccessResponse<ConfirmImportResponse>>(
    '/students/import/confirm',
    payload,
  );
};
