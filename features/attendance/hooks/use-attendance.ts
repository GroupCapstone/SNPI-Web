import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getAttendanceListApi,
  getClassRosterAttendanceApi,
  markAttendanceApi,
} from '../api/attendance-api';
import type { AttendanceQueryFilters, MarkAttendancePayload } from '../types';

export const ATTENDANCE_QUERY_KEY = 'attendance';

export const useAttendanceListQuery = (filters?: AttendanceQueryFilters, enabled = true) => {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, filters],
    queryFn: () => getAttendanceListApi(filters),
    enabled,
  });
};

export const useClassRosterAttendanceQuery = (classId?: string, date?: string) => {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, 'roster', classId, date],
    queryFn: () => getClassRosterAttendanceApi(classId!, date!),
    enabled: Boolean(classId && date),
  });
};

export const useMarkAttendanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MarkAttendancePayload) => markAttendanceApi(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [ATTENDANCE_QUERY_KEY, 'roster', variables.classId, variables.date],
      });
    },
  });
};
