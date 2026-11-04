import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createIntake,
  deleteIntake,
  getIntakes,
  updateIntake,
  type IntakeFilters,
} from '../api/intake-api';
import type { CreateIntakeInput, UpdateIntakeInput } from '../types';

export const useIntakesQuery = (filters: IntakeFilters = {}) => {
  return useQuery({
    queryKey: ['intakes', filters],
    queryFn: () => getIntakes(filters),
  });
};

export const useCreateIntakeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateIntakeInput) => createIntake(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['intakes'] });
    },
  });
};

export const useUpdateIntakeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIntakeInput }) => updateIntake(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['intakes'] });
    },
  });
};

export const useDeleteIntakeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteIntake(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['intakes'] });
    },
  });
};
