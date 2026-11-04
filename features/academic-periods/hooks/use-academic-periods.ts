import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAcademicPeriod,
  deleteAcademicPeriod,
  generateMonthlyPeriods,
  getAcademicPeriods,
  updateAcademicPeriod,
  type AcademicPeriodFilters,
} from '../api/academic-period-api';
import type {
  CreateAcademicPeriodInput,
  GenerateMonthlyPeriodsInput,
  UpdateAcademicPeriodInput,
} from '../types';

export const useAcademicPeriodsQuery = (filters: AcademicPeriodFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['academic-periods', filters],
    enabled,
    queryFn: () => getAcademicPeriods(filters),
  });
};

export const useCreateAcademicPeriodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAcademicPeriodInput) => createAcademicPeriod(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};

export const useUpdateAcademicPeriodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAcademicPeriodInput }) =>
      updateAcademicPeriod(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};

export const useDeleteAcademicPeriodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAcademicPeriod(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};

export const useGenerateMonthlyPeriodsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GenerateMonthlyPeriodsInput) => generateMonthlyPeriods(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};
