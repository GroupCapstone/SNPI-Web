import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreateStudentTransferPayload,
  ProcessTransferPayload,
  StudentTransfer,
  StudentTransferQueryFilters,
} from '../types';

export const getStudentTransfersApi = async (
  filters?: StudentTransferQueryFilters,
): Promise<ApiPaginatedResponse<StudentTransfer>> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.studentId) params.append('studentId', filters.studentId);
  if (filters?.fromBranchId && filters.fromBranchId !== 'all') {
    params.append('fromBranchId', filters.fromBranchId);
  }
  if (filters?.toBranchId && filters.toBranchId !== 'all') {
    params.append('toBranchId', filters.toBranchId);
  }
  if (filters?.status) params.append('status', filters.status);
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);
  if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<StudentTransfer>>(
    `/student-transfers${query ? `?${query}` : ''}`,
  );
};

export const getStudentTransferByIdApi = async (
  id: string,
): Promise<ApiSuccessResponse<StudentTransfer>> => {
  return apiClient.get<ApiSuccessResponse<StudentTransfer>>(`/student-transfers/${id}`);
};

export const createStudentTransferApi = async (
  payload: CreateStudentTransferPayload,
): Promise<ApiSuccessResponse<StudentTransfer>> => {
  return apiClient.post<ApiSuccessResponse<StudentTransfer>>('/student-transfers', payload);
};

export const processStudentTransferApi = async (
  id: string,
  payload: ProcessTransferPayload,
): Promise<ApiSuccessResponse<StudentTransfer>> => {
  return apiClient.patch<ApiSuccessResponse<StudentTransfer>>(
    `/student-transfers/${id}/process`,
    payload,
  );
};
