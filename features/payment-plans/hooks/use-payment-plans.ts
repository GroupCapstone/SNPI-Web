import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  cancelPaymentPlan,
  createPaymentPlan,
  getPaymentPlans,
  payInstallment,
} from '../api/payment-plan-api';
import type { CreatePaymentPlanInput, PaymentPlanFilters, InstallmentPaymentInput } from '../types';

export const usePaymentPlansQuery = (filters: PaymentPlanFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['payment-plans', filters],
    queryFn: () => getPaymentPlans(filters),
    enabled,
  });

export const useCreatePaymentPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePaymentPlanInput) => createPaymentPlan(input),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['payment-plans'] }),
  });
};

export const useCancelPaymentPlanMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; reason: string }) =>
      cancelPaymentPlan(input.id, input.reason),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['payment-plans'] }),
  });
};

export const usePayInstallmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      sequence,
      input,
    }: {
      id: string;
      sequence: number;
      input: InstallmentPaymentInput;
    }) => payInstallment(id, sequence, input),
    onSuccess: async () => {
      await Promise.all(
        [
          'payment-plans',
          'payments',
          'dashboard-finance-pulse',
          'monthly-finance-summary',
          'debt-aging',
        ].map((key) => queryClient.invalidateQueries({ queryKey: [key] })),
      );
    },
  });
};
