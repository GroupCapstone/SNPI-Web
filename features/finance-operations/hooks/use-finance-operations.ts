import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  approveCashierShift,
  closeCashierShift,
  createDiscountPolicy,
  getCashierShifts,
  getDiscountPolicies,
  openCashierShift,
} from '../api/finance-operation-api';
import type { CurrencyTotals } from '../types';

export const useDiscountPoliciesQuery = (branchId?: string) =>
  useQuery({
    queryKey: ['discount-policies', branchId],
    queryFn: () => getDiscountPolicies(branchId),
  });
export const useCashierShiftsQuery = (branchId?: string) =>
  useQuery({ queryKey: ['cashier-shifts', branchId], queryFn: () => getCashierShifts(branchId) });
export const useCreateDiscountPolicyMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createDiscountPolicy,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['discount-policies'] }),
  });
};
export const useOpenCashierShiftMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: { branchId: string; openingCash: CurrencyTotals }) =>
      openCashierShift(input.branchId, input.openingCash),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['cashier-shifts'] }),
  });
};
export const useCloseCashierShiftMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      id: string;
      declaredCash: CurrencyTotals;
      declaredDigital: CurrencyTotals;
    }) => closeCashierShift(input.id, input.declaredCash, input.declaredDigital),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['cashier-shifts'] }),
  });
};
export const useApproveCashierShiftMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: approveCashierShift,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['cashier-shifts'] }),
  });
};
