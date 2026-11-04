import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type { AttendanceLeave, AttendanceLeaveFilters, CreateAttendanceLeaveInput } from '../types';

export const getAttendanceLeaves = async (filters: AttendanceLeaveFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.set(key, String(value));
  });
  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<AttendanceLeave>>(
    `/attendance-leaves${query ? `?${query}` : ''}`,
  );
};

export const createAttendanceLeave = async (input: CreateAttendanceLeaveInput) =>
  apiClient.post<ApiSuccessResponse<AttendanceLeave>>('/attendance-leaves', input);

export const reviewAttendanceLeave = async (
  id: string,
  status: 'approved' | 'rejected' | 'cancelled',
  reviewNotes?: string,
) =>
  apiClient.patch<ApiSuccessResponse<AttendanceLeave>>(`/attendance-leaves/${id}/review`, {
    status,
    reviewNotes,
  });
