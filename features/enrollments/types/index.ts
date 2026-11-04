export type EnrollmentStatus =
  'enrolled' | 'active' | 'completed' | 'suspended' | 'dropped' | 'transferred';

export type TuitionPaymentStatus = 'pending' | 'partially_paid' | 'paid' | 'waived';

export interface Enrollment {
  _id: string;
  enrollmentCode: string;
  studentId: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    gender: string;
    photo?: string;
    phone?: string;
    email?: string;
  };
  schoolId: {
    _id: string;
    nameEn: string;
    nameKh?: string;
    code: string;
  };
  branchId: {
    _id: string;
    branchNameEn: string;
    branchNameKh?: string;
    branchCode: string;
  };
  academicYearId: {
    _id: string;
    name: string;
    code: string;
    isCurrent: boolean;
  };
  academicPeriodId?: {
    _id: string;
    name: string;
    code: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  };
  programId: {
    _id: string;
    programNameEn: string;
    programNameKh?: string;
    programCode: string;
  };
  levelId: {
    _id: string;
    levelNameEn: string;
    levelNameKh?: string;
    levelCode: string;
  };
  classId: {
    _id: string;
    className: string;
    room?: string;
    capacity?: number;
    shift?: string;
  };
  enrollmentDate: string;
  status: EnrollmentStatus;
  tuitionStatus: TuitionPaymentStatus;
  remarks?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEnrollmentPayload {
  enrollmentCode?: string;
  studentId: string;
  schoolId: string;
  branchId: string;
  academicYearId: string;
  programId: string;
  levelId: string;
  classId: string;
  enrollmentDate?: string;
  status?: EnrollmentStatus;
  tuitionStatus?: TuitionPaymentStatus;
  remarks?: string;
}

export type UpdateEnrollmentPayload = Partial<CreateEnrollmentPayload>;

export interface EnrollmentQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  programId?: string;
  levelId?: string;
  classId?: string;
  status?: EnrollmentStatus;
  statusGroup?: 'continuing' | 'completed' | 'dropped' | 'transferred' | 'all';
  tuitionStatus?: TuitionPaymentStatus;
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
