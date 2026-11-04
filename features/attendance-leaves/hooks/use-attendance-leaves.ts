import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAttendanceLeave,
  getAttendanceLeaves,
  reviewAttendanceLeave,
} from '../api/attendance-leave-api';
import type { AttendanceLeaveFilters, CreateAttendanceLeaveInput } from '../types';

export const useAttendanceLeavesQuery = (filters: AttendanceLeaveFilters = {}) =>
  useQuery({
    queryKey: ['attendance-leaves', filters],
    queryFn: () => getAttendanceLeaves(filters),
  });

export const useCreateAttendanceLeaveMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateAttendanceLeaveInput) => createAttendanceLeave(input),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['attendance-leaves'] }),
  });
};

export const useReviewAttendanceLeaveMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      id: string;
      status: 'approved' | 'rejected' | 'cancelled';
      reviewNotes?: string;
    }) => reviewAttendanceLeave(input.id, input.status, input.reviewNotes),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['attendance-leaves'] }),
  });
};
