import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAcademicRule,
  createAcademicRuleVersion,
  getAcademicRuleById,
  getAcademicRules,
  updateAcademicRule,
} from '../api/academic-rule-api';
import type { AcademicRuleFilters, CreateAcademicRuleDto, UpdateAcademicRuleDto } from '../types';

export const useAcademicRulesQuery = (filters: AcademicRuleFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['academic-rules', filters],
    queryFn: () => getAcademicRules(filters),
    enabled,
  });
};

export const useAcademicRuleQuery = (id?: string) => {
  return useQuery({
    queryKey: ['academic-rules', id],
    queryFn: () => getAcademicRuleById(id!),
    enabled: Boolean(id),
  });
};

export const useCreateAcademicRuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAcademicRuleDto) => createAcademicRule(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-rules'] });
    },
  });
};

export const useCreateAcademicRuleVersionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { effectiveFrom?: string; effectiveTo?: string; config?: Record<string, unknown> };
    }) => createAcademicRuleVersion(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-rules'] });
    },
  });
};

export const useUpdateAcademicRuleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAcademicRuleDto }) =>
      updateAcademicRule(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['academic-rules'] });
    },
  });
};
