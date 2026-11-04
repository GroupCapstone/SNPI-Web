import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreatePaymentPlanInput,
  PaymentPlan,
  PaymentPlanFilters,
  InstallmentPaymentInput,
} from '../types';

export const getPaymentPlans = (filters: PaymentPlanFilters = {}) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== '') params.set(key, String(value));
  }
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiClient.get<ApiPaginatedResponse<PaymentPlan>>(`/payment-plans${suffix}`);
};

export const createPaymentPlan = (input: CreatePaymentPlanInput) =>
  apiClient.post<ApiSuccessResponse<PaymentPlan>>('/payment-plans', input);

export const cancelPaymentPlan = (id: string, reason: string) =>
  apiClient.post<ApiSuccessResponse<PaymentPlan>>(`/payment-plans/${id}/cancel`, { reason });

export const payInstallment = (id: string, sequence: number, input: InstallmentPaymentInput) =>
  apiClient.post<
    ApiSuccessResponse<{ plan: PaymentPlan; payment: { _id: string; receiptNumber: string } }>
  >(`/payment-plans/${id}/installments/${sequence}/pay`, input);
