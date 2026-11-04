import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createCurriculum,
  deleteCurriculum,
  getCurricula,
  getCurriculumById,
  updateCurriculum,
} from '../api/curriculum-api';
import type { CurriculumFormValues } from '../schemas';
import type { CurriculumFilters } from '../types';

export const useCurriculaQuery = (filters: CurriculumFilters = {}) => {
  return useQuery({
    queryKey: ['curriculum', filters],
    queryFn: () => getCurricula(filters),
  });
};

export const useCurriculumDetailQuery = (id: string | null) => {
  return useQuery({
    queryKey: ['curriculum', id],
    queryFn: () => (id ? getCurriculumById(id) : null),
    enabled: Boolean(id),
  });
};

export const useCreateCurriculumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CurriculumFormValues) => createCurriculum(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    },
  });
};

export const useUpdateCurriculumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CurriculumFormValues> }) =>
      updateCurriculum(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    },
  });
};

export const useDeleteCurriculumMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCurriculum(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['curriculum'] });
    },
  });
};
