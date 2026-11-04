import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  calculateClassTermResults,
  completeTermResult,
  getTermResults,
  transitionTermResult,
  type TermResultFilters,
} from '../api/term-result-api';
import type { CompleteTermInput, TransitionTermResultInput } from '../types';

export const useTermResultsQuery = (filters: TermResultFilters = {}) => {
  return useQuery({
    queryKey: ['term-results', filters],
    queryFn: () => getTermResults(filters),
  });
};

export const useCalculateClassTermResultsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (classId: string) => calculateClassTermResults(classId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['term-results'] });
    },
  });
};

export const useCompleteTermMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompleteTermInput }) =>
      completeTermResult(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['term-results'] });
      void queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};

export const useTransitionTermResultMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TransitionTermResultInput }) =>
      transitionTermResult(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['term-results'] });
    },
  });
};
