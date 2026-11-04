import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  Attendance,
  AttendanceQueryFilters,
  ClassRosterAttendanceResponse,
  MarkAttendancePayload,
} from '../types';

export const getAttendanceListApi = async (
  filters?: AttendanceQueryFilters,
): Promise<ApiPaginatedResponse<Attendance>> => {
  return apiClient.get<ApiPaginatedResponse<Attendance>>(`/attendance${buildQueryString(filters)}`);
};

export const getClassRosterAttendanceApi = async (
  classId: string,
  date: string,
): Promise<ApiSuccessResponse<ClassRosterAttendanceResponse>> => {
  return apiClient.get<ApiSuccessResponse<ClassRosterAttendanceResponse>>(
    `/attendance/roster/${classId}?date=${date}`,
  );
};

export const markAttendanceApi = async (
  payload: MarkAttendancePayload,
): Promise<ApiSuccessResponse<Attendance>> => {
  return apiClient.post<ApiSuccessResponse<Attendance>>('/attendance', payload);
};
