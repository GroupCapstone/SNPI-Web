import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAcademicYear,
  deleteAcademicYear,
  getAcademicYears,
  updateAcademicYear,
} from '../api/academic-year-api';
import type { AcademicYear, AcademicYearFilters, AcademicYearPayload } from '../types';

export type { AcademicYear, AcademicYear as AcademicYearItem };

export const useAcademicYearsQuery = (filters?: AcademicYearFilters, enabled = true) => {
  return useQuery<AcademicYear[]>({
    queryKey: ['academic-years', filters],
    enabled,
    queryFn: async () => {
      return getAcademicYears(filters);
    },
  });
};

export const useCreateAcademicYearMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AcademicYearPayload) => createAcademicYear(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academic-years'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-page'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-list'] });
    },
  });
};

export const useUpdateAcademicYearMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<AcademicYearPayload> }) =>
      updateAcademicYear(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academic-years'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-page'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-list'] });
    },
  });
};

export const useDeleteAcademicYearMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAcademicYear(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['academic-years'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-page'] });
      queryClient.invalidateQueries({ queryKey: ['academic-years-list'] });
    },
  });
};
