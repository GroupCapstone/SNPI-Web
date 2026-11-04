import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveRolloverPlan,
  approveTargetPeriodReadiness,
  createRolloverPlan,
  executeRolloverPlan,
  getRolloverPlanById,
  getRolloverPlans,
  getTargetPeriodReadiness,
  openTargetPeriod,
  updateRolloverPlan,
  validateRolloverPlan,
} from '../api/rollover-api';
import type {
  CreateRolloverPlanInput,
  ExecuteRolloverInput,
  RolloverPlanFilters,
  UpdateRolloverPlanInput,
} from '../types';

export const useRolloverPlansQuery = (
  filters: RolloverPlanFilters = {},
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['rollover-plans', filters],
    queryFn: () => getRolloverPlans(filters),
    enabled: options?.enabled ?? true,
  });
};

export const useRolloverPlanQuery = (id: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['rollover-plan', id],
    queryFn: () => getRolloverPlanById(id),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
};

export const useCreateRolloverPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRolloverPlanInput) => createRolloverPlan(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-plans'] });
    },
  });
};

export const useUpdateRolloverPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRolloverPlanInput }) =>
      updateRolloverPlan(id, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-plans'] });
      void queryClient.invalidateQueries({ queryKey: ['rollover-plan', variables.id] });
    },
  });
};

export const useValidateRolloverPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => validateRolloverPlan(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-plans'] });
      void queryClient.invalidateQueries({ queryKey: ['rollover-plan', id] });
    },
  });
};

export const useApproveRolloverPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => approveRolloverPlan(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-plans'] });
      void queryClient.invalidateQueries({ queryKey: ['rollover-plan', id] });
    },
  });
};

export const useExecuteRolloverPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: ExecuteRolloverInput }) =>
      executeRolloverPlan(id, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-plans'] });
      void queryClient.invalidateQueries({ queryKey: ['rollover-plan', variables.id] });
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
      void queryClient.invalidateQueries({ queryKey: ['classes'] });
      void queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};

export const useTargetPeriodReadinessQuery = (
  targetPeriodId: string,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['rollover-readiness', targetPeriodId],
    queryFn: () => getTargetPeriodReadiness(targetPeriodId),
    enabled: Boolean(targetPeriodId) && (options?.enabled ?? true),
  });
};

export const useApproveTargetPeriodReadinessMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetPeriodId: string) => approveTargetPeriodReadiness(targetPeriodId),
    onSuccess: (_, targetPeriodId) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-readiness', targetPeriodId] });
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};

export const useOpenTargetPeriodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetPeriodId: string) => openTargetPeriod(targetPeriodId),
    onSuccess: (_, targetPeriodId) => {
      void queryClient.invalidateQueries({ queryKey: ['rollover-readiness', targetPeriodId] });
      void queryClient.invalidateQueries({ queryKey: ['academic-periods'] });
    },
  });
};
