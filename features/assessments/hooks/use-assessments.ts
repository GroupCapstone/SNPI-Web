import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAssessment,
  deleteAssessment,
  getAssessmentById,
  getAssessments,
  updateAssessment,
} from '../api/assessment-api';
import type { AssessmentFormData } from '../schemas';
import type { AssessmentFilters } from '../types';

export const assessmentKeys = {
  all: ['assessments'] as const,
  lists: () => [...assessmentKeys.all, 'list'] as const,
  list: (filters: AssessmentFilters) => [...assessmentKeys.lists(), filters] as const,
  details: () => [...assessmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...assessmentKeys.details(), id] as const,
};

export const useAssessmentsQuery = (filters: AssessmentFilters = {}) => {
  return useQuery({
    queryKey: assessmentKeys.list(filters),
    queryFn: () => getAssessments(filters),
  });
};

export const useAssessmentQuery = (id: string) => {
  return useQuery({
    queryKey: assessmentKeys.detail(id),
    queryFn: () => getAssessmentById(id),
    enabled: Boolean(id),
  });
};

export const useCreateAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssessmentFormData) => createAssessment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
    },
  });
};

export const useUpdateAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AssessmentFormData> }) =>
      updateAssessment(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: assessmentKeys.detail(id) });
    },
  });
};

export const useDeleteAssessmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAssessment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assessmentKeys.lists() });
    },
  });
};
