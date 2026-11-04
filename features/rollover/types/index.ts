export type RolloverPlanStatus =
  'draft' | 'validated' | 'approved' | 'executing' | 'completed' | 'failed' | 'cancelled';

export type RolloverStudentDecision =
  'PROMOTE' | 'CONTINUE' | 'REPEAT' | 'TRANSFER' | 'GRADUATE' | 'WITHDRAW' | 'HOLD' | 'NO_ACTION';

export type RolloverClassAction = 'CREATE_NEW' | 'MAP_EXISTING' | 'SKIP';

export interface RolloverClassMapping {
  sourceClassId: string | { _id: string; classCode: string; className: string; capacity?: number };
  targetClassId?: string | { _id: string; classCode: string; className: string; capacity?: number };
  targetClassName: string;
  targetClassCode: string;
  targetProgramId: string;
  targetLevelId: string;
  targetSection: string;
  targetCapacity: number;
  action: RolloverClassAction;
}

export interface RolloverStudentDecisionItem {
  studentId:
    | string
    | {
        _id: string;
        studentId: string;
        firstName: string;
        lastName: string;
        khmerName?: string;
        gender?: string;
      };
  sourceEnrollmentId: string;
  systemRecommendedDecision?: RolloverStudentDecision;
  finalDecision?: RolloverStudentDecision;
  decision?: RolloverStudentDecision;
  targetClassId?: string | { _id: string; classCode: string; className: string };
  targetLevelId?: string;
  targetProgramId?: string;
  targetBranchId?: string;
  targetEnrollmentId?: string;
  reason?: string;
  changedBy?: string;
  approvedBy?: string;
  changedAt?: string;
  isProcessed: boolean;
}

export interface RolloverValidationSummary {
  canExecute: boolean;
  checkedAt: string;
  blockingIssues: Array<{
    type: string;
    message: string;
    entityId?: string;
    count?: number;
  }>;
  warnings: Array<{
    type: string;
    message: string;
    count?: number;
  }>;
  capacityWarnings: Array<{
    classId?: string;
    className: string;
    capacity: number;
    enrolledCount: number;
    message: string;
  }>;
  scheduleConflicts: Array<{
    type: 'TEACHER_CONFLICT' | 'ROOM_CONFLICT';
    teacherId?: string;
    classroomId?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    message: string;
  }>;
}

export interface RolloverExecutionResult {
  classesCreated: number;
  enrollmentsCreated: number;
  studentsPromoted: number;
  studentsRepeated: number;
  studentsContinued: number;
  studentsGraduated: number;
  studentsWithdrawn: number;
  studentsTransferred: number;
  teacherAssignmentsCreated: number;
  schedulesCreated: number;
  errors: Array<{ item: string; error: string }>;
  startedAt?: string;
  completedAt?: string;
}

export interface RolloverPlan {
  _id: string;
  planCode: string;
  schoolId: string | { _id: string; nameEn: string; nameKh?: string; code: string };
  branchId:
    string | { _id: string; branchNameEn: string; branchNameKh?: string; branchCode: string };
  programId?: string | { _id: string; nameEn: string; nameKh?: string; code: string };
  sourceAcademicYearId: string | { _id: string; name: string; code: string };
  sourcePeriodId:
    string | { _id: string; name: string; code: string; sequence?: number; status?: string };
  targetAcademicYearId: string | { _id: string; name: string; code: string };
  targetPeriodId:
    string | { _id: string; name: string; code: string; sequence?: number; status?: string };
  status: RolloverPlanStatus;
  options: {
    carryClasses: boolean;
    carryTeacherSuggestions: boolean;
    carryScheduleSuggestions: boolean;
    autoSectionDistribution: boolean;
  };
  classMappings: RolloverClassMapping[];
  studentDecisions: RolloverStudentDecisionItem[];
  validationSummary?: RolloverValidationSummary;
  executionResult?: RolloverExecutionResult;
  createdBy: string;
  reviewedBy?: string;
  approvedBy?: string;
  approvedAt?: string;
  executedBy?: string;
  executedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRolloverPlanInput {
  schoolId?: string;
  branchId: string;
  programId?: string;
  sourceAcademicYearId: string;
  sourcePeriodId: string;
  targetAcademicYearId: string;
  targetPeriodId: string;
  options?: {
    carryClasses?: boolean;
    carryTeacherSuggestions?: boolean;
    carryScheduleSuggestions?: boolean;
    autoSectionDistribution?: boolean;
  };
}

export interface UpdateRolloverPlanInput {
  options?: {
    carryClasses?: boolean;
    carryTeacherSuggestions?: boolean;
    carryScheduleSuggestions?: boolean;
    autoSectionDistribution?: boolean;
  };
  classMappings?: Array<{
    sourceClassId: string;
    targetClassId?: string;
    targetClassName: string;
    targetClassCode: string;
    targetProgramId: string;
    targetLevelId: string;
    targetSection: string;
    targetCapacity?: number;
    action?: RolloverClassAction;
  }>;
  studentDecisions?: Array<{
    studentId: string;
    sourceEnrollmentId?: string;
    systemRecommendedDecision?: RolloverStudentDecision;
    finalDecision?: RolloverStudentDecision;
    decision?: RolloverStudentDecision;
    targetClassId?: string;
    targetLevelId?: string;
    targetProgramId?: string;
    targetBranchId?: string;
    reason?: string;
  }>;
}

export interface ExecuteRolloverInput {
  idempotencyKey?: string;
  closeSourcePeriod?: boolean;
}

export interface RolloverPlanFilters {
  branchId?: string;
  programId?: string;
  sourcePeriodId?: string;
  targetPeriodId?: string;
  status?: RolloverPlanStatus;
  page?: number;
  limit?: number;
}

export interface TargetPeriodReadiness {
  targetPeriodId: string;
  targetPeriodName?: string;
  status?: string;
  isReadyToOpen: boolean;
  isApproved?: boolean;
  approvedBy?: string;
  approvedAt?: string;
  checkedAt: string;
  checks?: {
    classes: { passed: boolean; classesCount: number; message: string };
    students: { passed: boolean; enrolledCount: number; message: string };
    capacity: { passed: boolean; overCapacityCount: number; message: string };
    teacherAssignments: { passed: boolean; unassignedClassesCount: number; message: string };
    timetableConflicts: { passed: boolean; conflictsCount: number; message: string };
    academicRules: { passed: boolean; activeRulesCount: number; message: string };
    feeSetup: { passed: boolean; configuredFeesCount: number; message: string };
  };
  metrics: {
    classesCount: number;
    enrolledStudentsCount: number;
    assignedTeachersCount: number;
    schedulesCount: number;
    scheduleConflictsCount: number;
    unresolvedRulesCount: number;
    activeFeesCount?: number;
  };
  blockingIssues: string[];
  warnings: string[];
}
