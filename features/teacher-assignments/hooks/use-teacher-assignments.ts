import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTeacherAssignmentApi,
  deleteTeacherAssignmentApi,
  getTeacherAssignmentByIdApi,
  getTeacherAssignmentsApi,
  updateTeacherAssignmentApi,
} from '../api/teacher-assignment-api';
import type {
  CreateTeacherAssignmentPayload,
  TeacherAssignmentQueryFilters,
  UpdateTeacherAssignmentPayload,
} from '../types';

export const TEACHER_ASSIGNMENT_QUERY_KEY = 'teacher-assignments';

export const useTeacherAssignmentsQuery = (filters?: TeacherAssignmentQueryFilters) => {
  return useQuery({
    queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY, filters],
    queryFn: () => getTeacherAssignmentsApi(filters),
  });
};

export const useTeacherAssignmentQuery = (id?: string) => {
  return useQuery({
    queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY, id],
    queryFn: () => getTeacherAssignmentByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreateTeacherAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTeacherAssignmentPayload) => createTeacherAssignmentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY] });
    },
  });
};

export const useUpdateTeacherAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTeacherAssignmentPayload }) =>
      updateTeacherAssignmentApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeleteTeacherAssignmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTeacherAssignmentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TEACHER_ASSIGNMENT_QUERY_KEY] });
    },
  });
};
