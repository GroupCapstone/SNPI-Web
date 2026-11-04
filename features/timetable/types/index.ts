export type SessionType = 'morning' | 'afternoon' | 'evening' | 'hourly' | 'custom';
export type ScheduleStatus = 'active' | 'cancelled';

export interface PopulatedClass {
  _id: string;
  classCode: string;
  className: string;
  capacity?: number;
  section?: string;
  programId?: string;
  levelId?: string;
  studyModeId?: string;
}

export interface PopulatedSubject {
  _id: string;
  code: string;
  name: string;
}

export interface PopulatedTeacher {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  khmerName?: string;
}

export interface PopulatedClassroom {
  _id: string;
  code: string;
  name: string;
  building?: string;
  floor?: string;
  capacity?: number;
}

export interface ClassScheduleItem {
  _id: string;
  classId: PopulatedClass | string;
  schoolId?: string;
  branchId:
    string | { _id: string; branchCode: string; branchNameEn: string; branchNameKh?: string };
  academicYearId: string | { _id: string; code: string; name: string };
  academicPeriodId?: string | { _id: string; code: string; name: string };
  dayOfWeek: number; // 1 = Monday, ..., 7 = Sunday
  sessionType: SessionType;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  subjectId?: PopulatedSubject | string;
  teacherId?: PopulatedTeacher | string;
  teacherAssignmentId?: string;
  classroomId?: PopulatedClassroom | string;
  effectiveFrom?: string;
  effectiveTo?: string;
  status: ScheduleStatus;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimetableFilters {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  dayOfWeek?: number;
  sessionType?: SessionType | '';
  classId?: string;
  teacherId?: string;
  classroomId?: string;
  status?: ScheduleStatus | '';
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateScheduleDto {
  classId: string;
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  dayOfWeek: number;
  sessionType?: SessionType;
  startTime: string;
  endTime: string;
  subjectId?: string;
  teacherId?: string;
  teacherAssignmentId?: string;
  classroomId?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  status?: ScheduleStatus;
}

export type UpdateScheduleDto = Partial<CreateScheduleDto>;

export interface ScheduleConflict {
  type: 'TEACHER_CONFLICT' | 'CLASSROOM_CONFLICT' | 'CLASS_CONFLICT';
  message: string;
  conflictingScheduleId: string;
  details?: Record<string, unknown>;
}

export interface ScheduleConflictCheckParams {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  teacherId?: string;
  classroomId?: string;
  classId?: string;
  excludeScheduleId?: string;
}

export interface ScheduleConflictCheckResult {
  hasConflict: boolean;
  conflicts: ScheduleConflict[];
}
