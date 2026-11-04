import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { PaymentFormData } from '../schemas';
import type {
  DebtAgingResponse,
  MonthlyFinanceSummaryResponse,
  Payment,
  PaymentFilters,
} from '../types';

export interface MonthlyInvoiceGenerationResult {
  year: number;
  month: number;
  created: number;
  skipped: number;
  invoices: string[];
}

export const getPayments = async (filters: PaymentFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.academicYearId) params.append('academicYearId', filters.academicYearId);
  if (filters.studentId) params.append('studentId', filters.studentId);
  if (filters.tuitionFeeId) params.append('tuitionFeeId', filters.tuitionFeeId);
  if (filters.status) params.append('status', filters.status);
  if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
  if (filters.paymentType) params.append('paymentType', filters.paymentType);
  if (filters.billingYear) params.append('billingYear', String(filters.billingYear));
  if (filters.billingMonth) params.append('billingMonth', String(filters.billingMonth));
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/payments${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Payment>>(url);
};

export const getPaymentById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Payment>>(`/payments/${id}`);
};

export const getMonthlyFinancialSummary = async (
  year: number,
  month: number,
  branchId?: string,
) => {
  const params = new URLSearchParams();
  params.append('year', String(year));
  params.append('month', String(month));
  if (branchId && branchId !== 'all') params.append('branchId', branchId);

  return apiClient.get<ApiSuccessResponse<MonthlyFinanceSummaryResponse>>(
    `/payments/monthly-summary?${params.toString()}`,
  );
};

export const getDebtAging = async (branchId?: string, asOfDate?: string) => {
  const params = new URLSearchParams();
  if (branchId && branchId !== 'all') params.append('branchId', branchId);
  if (asOfDate) params.append('asOfDate', asOfDate);

  const queryString = params.toString();
  return apiClient.get<ApiSuccessResponse<DebtAgingResponse>>(
    `/payments/debt-aging${queryString ? `?${queryString}` : ''}`,
  );
};

export const createPayment = async (data: PaymentFormData) => {
  return apiClient.post<ApiSuccessResponse<Payment>>('/payments', data);
};

export const generateMonthlyInvoices = async (input: {
  schoolId: string;
  branchId: string;
  academicYearId: string;
  year: number;
  month: number;
  dueDay?: number;
}) =>
  apiClient.post<ApiSuccessResponse<MonthlyInvoiceGenerationResult>>(
    '/payments/monthly-invoices/generate',
    input,
  );

export const updatePayment = async (id: string, data: Partial<PaymentFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Payment>>(`/payments/${id}`, data);
};

export const deletePayment = async ({ id, reason }: { id: string; reason: string }) => {
  return apiClient.post<ApiSuccessResponse<Payment>>(`/payments/${id}/void`, { reason });
};
