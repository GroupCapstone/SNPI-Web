import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createProgram, deleteProgram, getPrograms, updateProgram } from '../api/program-api';
import type { ProgramFormData } from '../schemas';
import type { ProgramFilters } from '../types';

export const useProgramsQuery = (filters: ProgramFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['programs', filters],
    queryFn: () => getPrograms(filters),
    enabled,
  });
};

export const useCreateProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProgramFormData) => createProgram(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
};

export const useUpdateProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProgramFormData> }) =>
      updateProgram(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
};

export const useDeleteProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
  });
};
