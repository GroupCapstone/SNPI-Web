export interface ClassItem {
  _id: string;
  branchId:
    { _id: string; branchCode: string; branchNameEn: string; branchNameKh: string } | string;
  academicYearId: { _id: string; name: string; code: string; isCurrent: boolean } | string;
  academicPeriodId?: { _id: string; name: string; code: string } | string;
  programId:
    { _id: string; code: string; nameEn: string; nameKh: string; shortName?: string } | string;
  levelId: { _id: string; code: string; name: string; sequence: number } | string;
  curriculumId?: { _id: string; code: string; name: string; status: string } | string;
  classroomId?:
    | {
        _id: string;
        code: string;
        name: string;
        building?: string;
        floor?: string;
        capacity: number;
      }
    | string;
  classTeacherId?:
    | {
        _id: string;
        employeeId: string;
        firstName: string;
        lastName: string;
        khmerName?: string;
      }
    | string;
  classCode: string;
  className: string;
  capacity: number;
  currentEnrollmentCount?: number;
  shift?: 'morning' | 'afternoon' | 'evening' | 'weekend' | 'hourly' | 'custom' | string;
  daysPattern?: 'MON_FRI' | 'MON_WED_FRI' | 'TUE_THU_SAT' | 'SAT_SUN' | 'CUSTOM' | string;
  selectedDays?: number[];
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ClassFilters {
  search?: string;
  branchId?: string;
  academicYearId?: string;
  programId?: string;
  levelId?: string;
  curriculumId?: string;
  shift?: string;
  daysPattern?: string;
  status?: string;
  availability?: string;
  page?: number;
  limit?: number;
}

export interface ClassAvailabilitySummary {
  totalClasses: number;
  availableClasses: number;
  nearCapacityClasses: number;
  fullClasses: number;
  completedOrCancelledClasses: number;
  totalCapacity: number;
  totalEnrolled: number;
  occupancyRate: number;
}
