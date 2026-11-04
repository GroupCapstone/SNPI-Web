import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createEnrollmentApi,
  deleteEnrollmentApi,
  getEnrollmentByIdApi,
  getEnrollmentsApi,
  updateEnrollmentApi,
} from '../api/enrollment-api';
import type {
  CreateEnrollmentPayload,
  EnrollmentQueryFilters,
  UpdateEnrollmentPayload,
} from '../types';

export const ENROLLMENT_QUERY_KEY = 'enrollments';

export const useEnrollmentsQuery = (filters?: EnrollmentQueryFilters, enabled = true) => {
  return useQuery({
    queryKey: [ENROLLMENT_QUERY_KEY, filters],
    queryFn: () => getEnrollmentsApi(filters),
    enabled,
  });
};

export const useEnrollmentQuery = (id?: string) => {
  return useQuery({
    queryKey: [ENROLLMENT_QUERY_KEY, id],
    queryFn: () => getEnrollmentByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreateEnrollmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateEnrollmentPayload) => createEnrollmentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENROLLMENT_QUERY_KEY] });
    },
  });
};

export const useUpdateEnrollmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateEnrollmentPayload }) =>
      updateEnrollmentApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ENROLLMENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ENROLLMENT_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeleteEnrollmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnrollmentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENROLLMENT_QUERY_KEY] });
    },
  });
};
