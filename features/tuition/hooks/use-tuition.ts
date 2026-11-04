import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createTuitionFee,
  deleteTuitionFee,
  getTuitionFeeById,
  getTuitionFees,
  updateTuitionFee,
} from '../api/tuition-api';
import type { TuitionFeeFormData } from '../schemas';
import type { TuitionFeeFilters } from '../types';

export const tuitionKeys = {
  all: ['tuition-fees'] as const,
  lists: () => [...tuitionKeys.all, 'list'] as const,
  list: (filters: TuitionFeeFilters) => [...tuitionKeys.lists(), filters] as const,
  details: () => [...tuitionKeys.all, 'detail'] as const,
  detail: (id: string) => [...tuitionKeys.details(), id] as const,
};

export const useTuitionFeesQuery = (filters: TuitionFeeFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: tuitionKeys.list(filters),
    queryFn: () => getTuitionFees(filters),
    enabled,
  });
};

export const useTuitionFeeQuery = (id: string) => {
  return useQuery({
    queryKey: tuitionKeys.detail(id),
    queryFn: () => getTuitionFeeById(id),
    enabled: Boolean(id),
  });
};

export const useCreateTuitionFeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TuitionFeeFormData) => createTuitionFee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tuitionKeys.lists() });
    },
  });
};

export const useUpdateTuitionFeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TuitionFeeFormData> }) =>
      updateTuitionFee(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tuitionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tuitionKeys.detail(id) });
    },
  });
};

export const useDeleteTuitionFeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTuitionFee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tuitionKeys.lists() });
    },
  });
};
