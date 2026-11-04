import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  checkScheduleConflicts,
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  getSchedulesByClass,
  updateSchedule,
} from '../api/timetable-api';
import type {
  CreateScheduleDto,
  ScheduleConflictCheckParams,
  TimetableFilters,
  UpdateScheduleDto,
} from '../types';

export const useSchedulesQuery = (filters: TimetableFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['class-schedules', filters],
    queryFn: () => getSchedules(filters),
    enabled,
  });
};

export const useScheduleQuery = (id?: string) => {
  return useQuery({
    queryKey: ['class-schedules', id],
    queryFn: () => getScheduleById(id!),
    enabled: Boolean(id),
  });
};

export const useClassSchedulesQuery = (classId?: string) => {
  return useQuery({
    queryKey: ['class-schedules', 'class', classId],
    queryFn: () => getSchedulesByClass(classId!),
    enabled: Boolean(classId),
  });
};

export const useCheckConflictsQuery = (params: ScheduleConflictCheckParams, enabled = true) => {
  return useQuery({
    queryKey: ['class-schedules', 'conflicts', params],
    queryFn: () => checkScheduleConflicts(params),
    enabled:
      enabled && Boolean((params.branchId || params.classId) && params.startTime && params.endTime),
  });
};

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateScheduleDto) => createSchedule(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['class-schedules'] });
    },
  });
};

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateScheduleDto }) => updateSchedule(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['class-schedules'] });
    },
  });
};

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['class-schedules'] });
    },
  });
};
