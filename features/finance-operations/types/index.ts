export interface DiscountPolicy {
  _id: string;
  branchId: string | { _id: string; branchCode: string; branchNameEn: string };
  code: string;
  name: string;
  type: 'sibling' | 'merit' | 'early_payment' | 'scholarship';
  calculationType: 'percentage' | 'fixed';
  value: number;
  maximumAmount?: number;
  status: 'active' | 'inactive';
  effectiveFrom: string;
  effectiveTo?: string;
}

export interface CurrencyTotals {
  USD: number;
  KHR: number;
}

export interface CashierShift {
  _id: string;
  shiftNumber: string;
  branchId: string | { _id: string; branchCode: string; branchNameEn: string };
  cashierId: string;
  openedAt: string;
  closedAt?: string;
  openingCash: CurrencyTotals;
  expectedCash: CurrencyTotals;
  expectedDigital: CurrencyTotals;
  declaredCash: CurrencyTotals;
  declaredDigital: CurrencyTotals;
  cashVariance: CurrencyTotals;
  digitalVariance: CurrencyTotals;
  status: 'open' | 'submitted' | 'approved';
}
