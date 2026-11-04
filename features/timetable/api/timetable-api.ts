import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  ClassScheduleItem,
  CreateScheduleDto,
  ScheduleConflictCheckParams,
  ScheduleConflictCheckResult,
  TimetableFilters,
  UpdateScheduleDto,
} from '../types';

export const getSchedules = async (filters: TimetableFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.academicPeriodId) params.append('academicPeriodId', filters.academicPeriodId);
  if (filters.dayOfWeek !== undefined && filters.dayOfWeek !== null) {
    params.append('dayOfWeek', String(filters.dayOfWeek));
  }
  if (filters.sessionType) params.append('sessionType', filters.sessionType);
  if (filters.classId) params.append('classId', filters.classId);
  if (filters.teacherId) params.append('teacherId', filters.teacherId);
  if (filters.classroomId) params.append('classroomId', filters.classroomId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/class-schedules${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<ClassScheduleItem>>(url);
};

export const getScheduleById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<ClassScheduleItem>>(`/class-schedules/${id}`);
};

export const getSchedulesByClass = async (classId: string) => {
  return apiClient.get<ApiSuccessResponse<ClassScheduleItem[]>>(
    `/class-schedules/class/${classId}`,
  );
};

export const checkScheduleConflicts = async (checkParams: ScheduleConflictCheckParams) => {
  const params = new URLSearchParams();
  if (checkParams.branchId) params.append('branchId', checkParams.branchId);
  if (checkParams.academicYearId) params.append('academicYearId', checkParams.academicYearId);
  if (checkParams.academicPeriodId) params.append('academicPeriodId', checkParams.academicPeriodId);
  params.append('dayOfWeek', String(checkParams.dayOfWeek));
  params.append('startTime', checkParams.startTime);
  params.append('endTime', checkParams.endTime);
  if (checkParams.effectiveFrom) params.append('effectiveFrom', checkParams.effectiveFrom);
  if (checkParams.effectiveTo) params.append('effectiveTo', checkParams.effectiveTo);
  if (checkParams.teacherId) params.append('teacherId', checkParams.teacherId);
  if (checkParams.classroomId) params.append('classroomId', checkParams.classroomId);
  if (checkParams.classId) params.append('classId', checkParams.classId);
  if (checkParams.excludeScheduleId)
    params.append('excludeScheduleId', checkParams.excludeScheduleId);

  const queryString = params.toString();
  const url = `/class-schedules/check-conflicts${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiSuccessResponse<ScheduleConflictCheckResult>>(url);
};

export const createSchedule = async (data: CreateScheduleDto) => {
  return apiClient.post<ApiSuccessResponse<ClassScheduleItem>>('/class-schedules', data);
};

export const updateSchedule = async (id: string, data: UpdateScheduleDto) => {
  return apiClient.put<ApiSuccessResponse<ClassScheduleItem>>(`/class-schedules/${id}`, data);
};

export const deleteSchedule = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/class-schedules/${id}`);
};
