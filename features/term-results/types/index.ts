export type TermResultStatus = 'PASSED' | 'FAILED';
export type PromotionStatus = 'PROMOTED' | 'REPEAT' | 'CONTINUE' | 'COMPLETED';
export type TermResultWorkflowStatus =
  'CALCULATED' | 'SUBMITTED' | 'REVIEWED' | 'APPROVED' | 'FINALIZED' | 'CORRECTED';

export interface TermResult {
  _id: string;
  schoolId?: string;
  branchId:
    | string
    | {
        _id: string;
        branchNameEn: string;
        branchCode: string;
      };
  academicYearId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
      };
  academicPeriodId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
        type: string;
      };
  programId:
    | string
    | {
        _id: string;
        nameEn: string;
        code: string;
      };
  levelId:
    | string
    | {
        _id: string;
        name: string;
        code: string;
        sequence: number;
      };
  classId:
    | string
    | {
        _id: string;
        className: string;
        classCode: string;
      };
  studentId: {
    _id: string;
    studentId: string;
    khmerName: string;
    englishName?: string;
    gender: string;
    photo?: string;
  };
  enrollmentId: {
    _id: string;
    enrollmentCode: string;
    status: string;
  };
  totalScore: number;
  averageScore: number;
  gpa: number;
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  attendanceRate: number;
  workflowStatus: TermResultWorkflowStatus;
  submittedAt?: string;
  reviewedAt?: string;
  approvedAt?: string;
  finalizedAt?: string;
  lockedAt?: string;
  resultStatus: TermResultStatus;
  promotionStatus: PromotionStatus;
  nextLevelId?: {
    _id: string;
    name: string;
    code: string;
    sequence: number;
  };
  nextPeriodId?: {
    _id: string;
    name: string;
    code: string;
  };
  nextEnrollmentId?: {
    _id: string;
    enrollmentCode: string;
    status: string;
  };
  isCompleted: boolean;
  completionDate?: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransitionTermResultInput {
  status: 'SUBMITTED' | 'REVIEWED' | 'APPROVED';
  reason?: string;
}

export interface CompleteTermInput {
  nextPeriodId?: string;
  nextClassId?: string;
  remarks?: string;
}
