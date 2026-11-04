export type AcademicPeriodType = 'TERM' | 'SHORT_COURSE' | 'MONTHLY' | 'CUSTOM';
export type AcademicPeriodStatus = 'planned' | 'active' | 'completed' | 'inactive';

export interface AcademicPeriod {
  _id: string;
  code: string;
  name: string;
  type: AcademicPeriodType;
  academicYearId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
      };
  startDate: string;
  endDate: string;
  sequence: number;
  status: AcademicPeriodStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAcademicPeriodInput {
  code: string;
  name: string;
  type: AcademicPeriodType;
  academicYearId: string;
  startDate: string;
  endDate: string;
  sequence: number;
  status?: AcademicPeriodStatus;
}

export type UpdateAcademicPeriodInput = Partial<CreateAcademicPeriodInput>;

export interface GenerateMonthlyPeriodsInput {
  academicYearId: string;
  calendarYear?: number;
  startMonth?: number;
  monthCount?: number;
  schoolId?: string;
  programId?: string;
}

export interface GenerateMonthlyPeriodsResult {
  createdCount: number;
  skippedCount: number;
  periods: AcademicPeriod[];
}
