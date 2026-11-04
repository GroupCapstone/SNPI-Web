import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createBranch,
  deleteBranch,
  getBranchById,
  getBranches,
  updateBranch,
} from '../api/branch-api';
import type { BranchFormData } from '../schemas';
import type { BranchFilters } from '../types';

export const useBranchesQuery = (filters: BranchFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['branches', filters],
    queryFn: () => getBranches(filters),
    enabled,
  });
};

export const useBranchQuery = (id: string) => {
  return useQuery({
    queryKey: ['branch', id],
    queryFn: () => getBranchById(id),
    enabled: Boolean(id),
  });
};

export const useCreateBranchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BranchFormData) => createBranch(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};

export const useUpdateBranchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BranchFormData> }) =>
      updateBranch(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
      void queryClient.invalidateQueries({ queryKey: ['branch'] });
    },
  });
};

export const useDeleteBranchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBranch(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['branches'] });
    },
  });
};
