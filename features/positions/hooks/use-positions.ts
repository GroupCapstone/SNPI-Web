import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPosition,
  deletePosition,
  getPositionById,
  getPositions,
  updatePosition,
} from '../api/position-api';
import type { PositionFormData } from '../schemas';
import type { PositionFilters } from '../types';

export const usePositionsQuery = (filters: PositionFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['positions', filters],
    queryFn: () => getPositions(filters),
    enabled,
  });
};

export const usePositionQuery = (id: string) => {
  return useQuery({
    queryKey: ['position', id],
    queryFn: () => getPositionById(id),
    enabled: Boolean(id),
  });
};

export const useCreatePositionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PositionFormData) => createPosition(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
};

export const useUpdatePositionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PositionFormData> }) =>
      updatePosition(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['positions'] });
      void queryClient.invalidateQueries({ queryKey: ['position'] });
    },
  });
};

export const useDeletePositionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePosition(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['positions'] });
    },
  });
};
