import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type { CashierShift, CurrencyTotals, DiscountPolicy } from '../types';

const query = (branchId?: string) => (branchId ? `?branchId=${encodeURIComponent(branchId)}` : '');
export const getDiscountPolicies = (branchId?: string) =>
  apiClient.get<ApiPaginatedResponse<DiscountPolicy>>(
    `/finance-operations/discount-policies${query(branchId)}`,
  );
export const createDiscountPolicy = (data: Record<string, unknown>) =>
  apiClient.post<ApiSuccessResponse<DiscountPolicy>>('/finance-operations/discount-policies', data);
export const getCashierShifts = (branchId?: string) =>
  apiClient.get<ApiPaginatedResponse<CashierShift>>(
    `/finance-operations/cashier-shifts${query(branchId)}`,
  );
export const openCashierShift = (branchId: string, openingCash: CurrencyTotals) =>
  apiClient.post<ApiSuccessResponse<CashierShift>>('/finance-operations/cashier-shifts/open', {
    branchId,
    openingCash,
  });
export const closeCashierShift = (
  id: string,
  declaredCash: CurrencyTotals,
  declaredDigital: CurrencyTotals,
) =>
  apiClient.post<ApiSuccessResponse<CashierShift>>(
    `/finance-operations/cashier-shifts/${id}/close`,
    { declaredCash, declaredDigital },
  );
export const approveCashierShift = (id: string) =>
  apiClient.post<ApiSuccessResponse<CashierShift>>(
    `/finance-operations/cashier-shifts/${id}/approve`,
  );
