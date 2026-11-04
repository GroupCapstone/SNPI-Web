import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createClass,
  deleteClass,
  getClassById,
  getClasses,
  getClassSummary,
  updateClass,
} from '../api/class-api';
import type { ClassFormData } from '../schemas';
import type { ClassFilters } from '../types';

export const useClassesQuery = (filters: ClassFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['classes', filters],
    queryFn: () => getClasses(filters),
    enabled,
  });
};

export const useClassSummaryQuery = (filters: Partial<ClassFilters> = {}, enabled = true) => {
  return useQuery({
    queryKey: ['classes-summary', filters],
    queryFn: () => getClassSummary(filters),
    enabled,
  });
};

export const useClassQuery = (id?: string) => {
  return useQuery({
    queryKey: ['classes', id],
    queryFn: () => getClassById(id!),
    enabled: Boolean(id),
  });
};

export const useCreateClassMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ClassFormData) => createClass(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      void queryClient.invalidateQueries({ queryKey: ['classes-summary'] });
    },
  });
};

export const useUpdateClassMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClassFormData> }) =>
      updateClass(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      void queryClient.invalidateQueries({ queryKey: ['classes-summary'] });
    },
  });
};

export const useDeleteClassMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteClass(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      void queryClient.invalidateQueries({ queryKey: ['classes-summary'] });
    },
  });
};
