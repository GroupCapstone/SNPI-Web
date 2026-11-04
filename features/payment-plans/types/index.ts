export interface PaymentPlanInstallment {
  sequence: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  paymentId?: string;
}

export interface PaymentPlan {
  _id: string;
  branchId: string | { _id: string; branchNameEn: string; branchCode: string };
  studentId:
    | string
    | {
        _id: string;
        studentId: string;
        firstName: string;
        lastName: string;
        khmerName?: string;
      };
  tuitionFeeId:
    | string
    | { _id: string; feeName: string; feeCode: string; amount: number; currency: 'USD' | 'KHR' };
  totalAmount: number;
  currency: 'USD' | 'KHR';
  installments: PaymentPlanInstallment[];
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface PaymentPlanFilters {
  search?: string;
  branchId?: string;
  status?: PaymentPlan['status'];
  page?: number;
  limit?: number;
}

export interface CreatePaymentPlanInput {
  schoolId: string;
  branchId: string;
  academicYearId: string;
  academicPeriodId?: string;
  enrollmentId: string;
  studentId: string;
  tuitionFeeId: string;
  totalAmount: number;
  currency: 'USD' | 'KHR';
  installments: Array<{ dueDate: string; amount: number }>;
  notes?: string;
}

export interface InstallmentPaymentInput {
  paymentMethod: 'cash' | 'aba_pay' | 'bank_transfer' | 'credit_card' | 'wing';
  paymentDate: string;
  transactionReference?: string;
}
