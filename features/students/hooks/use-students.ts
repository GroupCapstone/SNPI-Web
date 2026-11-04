import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  checkDuplicatesApi,
  confirmImportApi,
  createStudentApi,
  deleteStudentApi,
  getStudentByIdApi,
  getStudentsApi,
  previewImportApi,
  updateStudentApi,
} from '../api/student-api';
import type {
  ConfirmImportPayload,
  CreateStudentPayload,
  DuplicateCheckCriteria,
  RawImportStudentRow,
  StudentQueryFilters,
  UpdateStudentPayload,
} from '../types';

export const STUDENT_QUERY_KEY = 'students';

export const useStudentsQuery = (filters?: StudentQueryFilters, enabled = true) => {
  return useQuery({
    queryKey: [STUDENT_QUERY_KEY, filters],
    queryFn: () => getStudentsApi(filters),
    enabled,
  });
};

export const useStudentQuery = (id?: string) => {
  return useQuery({
    queryKey: [STUDENT_QUERY_KEY, id],
    queryFn: () => getStudentByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateStudentPayload) => createStudentApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_QUERY_KEY] });
    },
  });
};

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStudentPayload }) =>
      updateStudentApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [STUDENT_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_QUERY_KEY] });
    },
  });
};

export const useCheckDuplicatesMutation = () => {
  return useMutation({
    mutationFn: (criteria: DuplicateCheckCriteria) => checkDuplicatesApi(criteria),
  });
};

export const usePreviewImportMutation = () => {
  return useMutation({
    mutationFn: (payload: { schoolId: string; branchId: string; rows: RawImportStudentRow[] }) =>
      previewImportApi(payload),
  });
};

export const useConfirmImportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ConfirmImportPayload) => confirmImportApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENT_QUERY_KEY] });
    },
  });
};
