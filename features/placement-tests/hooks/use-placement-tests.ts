import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPlacementTestApi,
  deletePlacementTestApi,
  getPlacementTestByIdApi,
  getPlacementTestsApi,
  updatePlacementTestApi,
} from '../api/placement-test-api';
import type {
  CreatePlacementTestPayload,
  PlacementTestQueryFilters,
  UpdatePlacementTestPayload,
} from '../types';

export const PLACEMENT_TEST_QUERY_KEY = 'placement-tests';

export const usePlacementTestsQuery = (filters?: PlacementTestQueryFilters) => {
  return useQuery({
    queryKey: [PLACEMENT_TEST_QUERY_KEY, filters],
    queryFn: () => getPlacementTestsApi(filters),
  });
};

export const usePlacementTestQuery = (id?: string) => {
  return useQuery({
    queryKey: [PLACEMENT_TEST_QUERY_KEY, id],
    queryFn: () => getPlacementTestByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreatePlacementTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePlacementTestPayload) => createPlacementTestApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACEMENT_TEST_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
    },
  });
};

export const useUpdatePlacementTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePlacementTestPayload }) =>
      updatePlacementTestApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PLACEMENT_TEST_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PLACEMENT_TEST_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeletePlacementTestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePlacementTestApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PLACEMENT_TEST_QUERY_KEY] });
    },
  });
};
