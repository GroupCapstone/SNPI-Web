import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createSubject, deleteSubject, getSubjects, updateSubject } from '../api/subject-api';
import type { SubjectFormData } from '../schemas';
import type { SubjectFilters } from '../types';

export const useSubjectsQuery = (filters: SubjectFilters = {}) => {
  return useQuery({
    queryKey: ['subjects', filters],
    queryFn: () => getSubjects(filters),
  });
};

export const useCreateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubjectFormData) => createSubject(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useUpdateSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SubjectFormData> }) =>
      updateSubject(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};

export const useDeleteSubjectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubject(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
  });
};
