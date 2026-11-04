export type AssessmentType = 'quiz' | 'assignment' | 'monthly_test' | 'midterm' | 'final';
export type AssessmentStatus = 'draft' | 'published' | 'closed';

export interface Assessment {
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
  classId:
    | {
        _id: string;
        className: string;
        classCode: string;
      }
    | string;
  subjectId:
    | {
        _id: string;
        nameEn: string;
        nameKh: string;
        code: string;
      }
    | string;
  name: string;
  code: string;
  type: AssessmentType;
  maxScore: number;
  passingScore: number;
  weightPercentage: number;
  assessmentDate: string;
  startTime?: string;
  endTime?: string;
  classroomId?:
    | {
        _id: string;
        code: string;
        name: string;
        capacity: number;
        building?: string;
        floor?: string;
      }
    | string;
  proctorIds?: Array<
    | { _id: string; employeeId: string; firstName: string; lastName: string; khmerName: string }
    | string
  >;
  seatCapacity?: number;
  description?: string;
  status: AssessmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  classId?: string;
  subjectId?: string;
  type?: AssessmentType;
  status?: AssessmentStatus;
  page?: number;
  limit?: number;
}
