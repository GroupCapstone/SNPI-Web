export type BillingCycle = 'monthly' | 'term' | 'semester' | 'annual';

export interface TuitionFee {
  _id: string;
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
  programId:
    | {
        _id: string;
        nameEn: string;
        nameKh: string;
        code: string;
      }
    | string;
  levelId:
    | {
        _id: string;
        name: string;
        code: string;
      }
    | string;
  feeName: string;
  feeCode: string;
  amount: number;
  currency: 'USD' | 'KHR';
  billingCycle: BillingCycle;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface TuitionFeeFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  programId?: string;
  levelId?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}
