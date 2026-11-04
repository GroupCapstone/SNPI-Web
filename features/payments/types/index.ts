export type PaymentMethod = 'cash' | 'aba_pay' | 'bank_transfer' | 'credit_card' | 'wing';
export type PaymentStatus = 'paid' | 'partial' | 'pending' | 'voided';
export type PaymentType =
  'tuition_monthly' | 'tuition_term' | 'registration_fee' | 'uniform' | 'books' | 'other';

export interface Payment {
  _id: string;
  receiptNumber: string;
  schoolId: string;
  branchId:
    | {
        _id: string;
        branchNameEn: string;
        branchNameKh: string;
        branchCode: string;
      }
    | string;
  academicYearId:
    | {
        _id: string;
        name: string;
      }
    | string;
  studentId:
    | {
        _id: string;
        studentId: string;
        firstName: string;
        lastName: string;
        khmerName: string;
        phone?: string;
        email?: string;
        gender?: string;
      }
    | string;
  tuitionFeeId:
    | {
        _id: string;
        feeName: string;
        feeCode: string;
        amount: number;
        currency: string;
        billingCycle: string;
      }
    | string;
  amountDue: number;
  discountAmount: number;
  discountPolicyId?: string;
  discountReason?: string;
  amountPaid: number;
  balanceRemaining: number;
  currency: 'USD' | 'KHR';
  paymentMethod: PaymentMethod;
  paymentType?: PaymentType;
  billingYear?: number;
  billingMonth?: number;
  coveragePeriodLabel?: string;
  paymentDate: string;
  dueDate?: string;
  transactionReference?: string;
  status: PaymentStatus;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  studentId?: string;
  tuitionFeeId?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentType?: PaymentType;
  billingYear?: number;
  billingMonth?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface MethodRevenueBreakdown {
  method: PaymentMethod;
  totalUsd: number;
  totalKhr: number;
  count: number;
}

export interface TypeRevenueBreakdown {
  type: PaymentType;
  totalUsd: number;
  totalKhr: number;
  count: number;
}

export interface MonthlyFinanceSummaryResponse {
  year: number;
  month: number;
  monthLabelEn: string;
  monthLabelKh: string;
  branchId?: string;
  totalRevenueUsd: number;
  totalRevenueKhr: number;
  totalTransactions: number;
  paidTransactions: number;
  partialTransactions: number;
  byMethod: MethodRevenueBreakdown[];
  byType: TypeRevenueBreakdown[];
}

export interface DebtAgingBucket {
  studentId: string;
  studentCode: string;
  studentNameEn: string;
  studentNameKh?: string;
  branchCode: string;
  classCode?: string;
  feeName: string;
  currency: 'USD' | 'KHR';
  unpaidBalance: number;
  dueDate?: string;
  overdueDays: number;
  agingCategory: 'current_due' | 'overdue_30' | 'overdue_60' | 'overdue_90_plus';
  parentPhone?: string;
}

export interface DebtAgingResponse {
  asOfDate: string;
  branchId?: string;
  summary: {
    totalUnpaidUsd: number;
    totalUnpaidKhr: number;
    currentDueUsd: number;
    currentDueKhr: number;
    overdue30Usd: number;
    overdue30Khr: number;
    overdue60Usd: number;
    overdue60Khr: number;
    overdue90PlusUsd: number;
    overdue90PlusKhr: number;
    totalStudentsInDebt: number;
  };
  items: DebtAgingBucket[];
}
