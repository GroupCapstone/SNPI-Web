import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createLevel, deleteLevel, getLevels, updateLevel } from '../api/level-api';
import type { LevelFormData } from '../schemas';
import type { LevelFilters } from '../types';

export const useLevelsQuery = (filters: LevelFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['levels', filters],
    queryFn: () => getLevels(filters),
    enabled,
  });
};

export const useCreateLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LevelFormData) => createLevel(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });
};

export const useUpdateLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LevelFormData> }) =>
      updateLevel(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });
};

export const useDeleteLevelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLevel(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['levels'] });
    },
  });
};
