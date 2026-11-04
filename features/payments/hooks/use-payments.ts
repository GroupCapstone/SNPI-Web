import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPayment,
  deletePayment,
  getDebtAging,
  getMonthlyFinancialSummary,
  getPaymentById,
  getPayments,
  generateMonthlyInvoices,
  updatePayment,
} from '../api/payment-api';
import type { PaymentFormData } from '../schemas';
import type { PaymentFilters } from '../types';

export const paymentKeys = {
  all: ['payments'] as const,
  lists: () => [...paymentKeys.all, 'list'] as const,
  list: (filters: PaymentFilters) => [...paymentKeys.lists(), filters] as const,
  details: () => [...paymentKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentKeys.details(), id] as const,
  monthlySummary: (year: number, month: number, branchId?: string) =>
    [...paymentKeys.all, 'monthly-summary', year, month, branchId] as const,
  debtAging: (branchId?: string, asOfDate?: string) =>
    [...paymentKeys.all, 'debt-aging', branchId, asOfDate] as const,
};

export const usePaymentsQuery = (filters: PaymentFilters = {}) => {
  return useQuery({
    queryKey: paymentKeys.list(filters),
    queryFn: () => getPayments(filters),
  });
};

export const useMonthlyFinancialSummaryQuery = (year: number, month: number, branchId?: string) => {
  return useQuery({
    queryKey: paymentKeys.monthlySummary(year, month, branchId),
    queryFn: () => getMonthlyFinancialSummary(year, month, branchId),
  });
};

export const useDebtAgingQuery = (branchId?: string, asOfDate?: string) => {
  return useQuery({
    queryKey: paymentKeys.debtAging(branchId, asOfDate),
    queryFn: () => getDebtAging(branchId, asOfDate),
  });
};

export const usePaymentQuery = (id: string) => {
  return useQuery({
    queryKey: paymentKeys.detail(id),
    queryFn: () => getPaymentById(id),
    enabled: Boolean(id),
  });
};

export const useCreatePaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PaymentFormData) => createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard-finance-pulse'] });
    },
  });
};

export const useGenerateMonthlyInvoicesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateMonthlyInvoices,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
};

export const useUpdatePaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PaymentFormData> }) =>
      updatePayment(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: paymentKeys.detail(id) });
    },
  });
};

export const useDeletePaymentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; reason: string }) => deletePayment(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({ queryKey: ['payment-plans'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-finance-pulse'] });
    },
  });
};
