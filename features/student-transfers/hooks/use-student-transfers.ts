import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createStudentTransferApi,
  getStudentTransferByIdApi,
  getStudentTransfersApi,
  processStudentTransferApi,
} from '../api/student-transfer-api';
import type {
  CreateStudentTransferPayload,
  ProcessTransferPayload,
  StudentTransferQueryFilters,
} from '../types';

export const STUDENT_TRANSFER_QUERY_KEY = 'student-transfers';

export const useStudentTransfersQuery = (filters?: StudentTransferQueryFilters) => {
  return useQuery({
    queryKey: [STUDENT_TRANSFER_QUERY_KEY, filters],
    queryFn: () => getStudentTransfersApi(filters),
  });
};

export const useStudentTransferQuery = (id?: string) => {
  return useQuery({
    queryKey: [STUDENT_TRANSFER_QUERY_KEY, id],
    queryFn: () => getStudentTransferByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreateStudentTransferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStudentTransferPayload) => createStudentTransferApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_TRANSFER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};

export const useProcessStudentTransferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ProcessTransferPayload }) =>
      processStudentTransferApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_TRANSFER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENT_TRANSFER_QUERY_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};
