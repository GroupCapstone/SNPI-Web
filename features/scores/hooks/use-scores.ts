import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { batchRecordScores, getScores } from '../api/score-api';
import type { BatchScorePayload, ScoreFilters } from '../types';

export const scoreKeys = {
  all: ['scores'] as const,
  lists: () => [...scoreKeys.all, 'list'] as const,
  list: (filters: ScoreFilters) => [...scoreKeys.lists(), filters] as const,
};

export const useScoresQuery = (filters: ScoreFilters = {}) => {
  return useQuery({
    queryKey: scoreKeys.list(filters),
    queryFn: () => getScores(filters),
  });
};

export const useBatchRecordScoresMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BatchScorePayload) => batchRecordScores(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scoreKeys.lists() });
    },
  });
};
