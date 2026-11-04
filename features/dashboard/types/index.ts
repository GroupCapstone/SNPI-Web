export interface ActionItemBase {
  id: string;
  title: string;
  subtitle?: string;
  severity: 'high' | 'medium' | 'low';
  branchId?: string;
  branchName?: string;
  actionUrl: string;
  createdAt?: string;
}

export interface UnmarkedAttendanceItem extends ActionItemBase {
  classId: string;
  className: string;
  sessionType?: string;
  teacherName?: string;
  scheduleTime?: string;
}

export interface UnsubmittedScoreItem extends ActionItemBase {
  assessmentId: string;
  assessmentCode: string;
  assessmentName: string;
  classId: string;
  className: string;
  subjectName?: string;
  assessmentDate: string;
}

export interface OverdueDebtItem extends ActionItemBase {
  paymentId: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  amountDue: number;
  balanceRemaining: number;
  currency: 'USD' | 'KHR';
  dueDate: string;
}

export interface PendingApprovalItem extends ActionItemBase {
  correctionId: string;
  correctionNumber: string;
  entityType: string;
  studentName?: string;
  reason: string;
  requestedBy?: string;
}

export interface NearCapacityClassItem extends ActionItemBase {
  classId: string;
  className: string;
  capacity: number;
  currentEnrollmentCount: number;
  occupancyRate: number;
}

export interface DashboardActionItemsResponse {
  summary: {
    totalActionItems: number;
    unmarkedAttendanceCount: number;
    unsubmittedScoresCount: number;
    overdueDebtsCount: number;
    pendingApprovalsCount: number;
    nearCapacityClassesCount: number;
  };
  queues: {
    unmarkedAttendance: UnmarkedAttendanceItem[];
    unsubmittedScores: UnsubmittedScoreItem[];
    overdueDebts: OverdueDebtItem[];
    pendingApprovals: PendingApprovalItem[];
    nearCapacityClasses: NearCapacityClassItem[];
  };
}

export interface DashboardActionItemsFilters {
  branchId?: string;
  academicYearId?: string;
  year?: number;
  month?: number;
}

export interface PaymentMethodSplitItem {
  method: string;
  totalAmount: number;
  transactionCount: number;
  currency: 'USD' | 'KHR';
}

export interface CurrencyAmountSummary {
  currency: 'USD' | 'KHR';
  amount: number;
  transactionCount?: number;
}

export interface TodayPaymentReconciliation {
  totalAmount: number;
  transactionCount: number;
  splits: PaymentMethodSplitItem[];
  totalsByCurrency?: CurrencyAmountSummary[];
}

export interface OverdueAgingBucket {
  label: string;
  range: string;
  count: number;
  totalAmount: number;
  amountsByCurrency?: CurrencyAmountSummary[];
}

export interface OverdueStudentDebtItem {
  paymentId: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  className: string;
  branchName?: string;
  amountDue: number;
  balanceRemaining: number;
  currency: string;
  dueDate: string;
  daysOverdue: number;
  guardianName?: string;
  guardianPhone?: string;
}

export interface MonthlyCollectionProgressItem {
  month: number;
  monthNameEn: string;
  monthNameKh: string;
  targetAmount: number;
  collectedAmount: number;
  pendingAmount: number;
  collectionRate: number;
  currencyBreakdown?: Array<{
    currency: 'USD' | 'KHR';
    targetAmount: number;
    collectedAmount: number;
    pendingAmount: number;
    collectionRate: number;
  }>;
}

export interface FinancePulseSummary {
  selectedPeriod: {
    year: number;
    month: number;
    collectedByCurrency: CurrencyAmountSummary[];
    scheduledByCurrency: CurrencyAmountSummary[];
    outstandingByCurrency: CurrencyAmountSummary[];
    transactionCount: number;
  };
  yearToDate: {
    collectedByCurrency: CurrencyAmountSummary[];
    transactionCount: number;
  };
  overdue: {
    accountCount: number;
    balanceByCurrency: CurrencyAmountSummary[];
  };
}

export interface FinancePulseResponse {
  today: TodayPaymentReconciliation;
  overdueAging: OverdueAgingBucket[];
  overdueStudents: OverdueStudentDebtItem[];
  monthlyCollection: MonthlyCollectionProgressItem[];
  summary?: FinancePulseSummary;
}

export interface AdmissionsFunnelStage {
  stage: 'registered' | 'tested' | 'enrolled';
  labelEn: string;
  labelKh: string;
  count: number;
  percentage: number;
}

export interface StudentMovementStats {
  active: number;
  suspended: number;
  transferred: number;
  withdrawn: number;
  newEnrollmentsThisMonth: number;
}

export interface AtRiskAbsenceStudentItem {
  studentId: string;
  studentCode: string;
  studentName: string;
  classId: string;
  className: string;
  branchName?: string;
  consecutiveAbsentCount: number;
  lastAbsentDate: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface UpcomingBirthdayItem {
  id: string;
  name: string;
  type: 'student' | 'employee';
  dateOfBirth: string;
  daysUntil: number;
  photo?: string;
  classNameOrDept?: string;
}

export interface StudentAffairsPulseResponse {
  funnel: AdmissionsFunnelStage[];
  movement: StudentMovementStats;
  atRiskAbsences: AtRiskAbsenceStudentItem[];
  upcomingBirthdays: UpcomingBirthdayItem[];
}

export interface DepartmentHeadcountItem {
  departmentId: string;
  departmentNameEn: string;
  departmentNameKh?: string;
  count: number;
}

export interface BranchHeadcountItem {
  branchId: string;
  branchCode: string;
  branchNameEn: string;
  count: number;
}

export interface ExpiringContractItem {
  employeeId: string;
  employeeCode: string;
  name: string;
  departmentName?: string;
  positionName?: string;
  branchName?: string;
  contractEndDate: string;
  daysRemaining: number;
  phone?: string;
}

export interface TeacherWorkloadItem {
  employeeId: string;
  employeeCode: string;
  name: string;
  assignedClassCount: number;
  totalStudents: number;
  branchName?: string;
}

export interface HrPulseResponse {
  totalEmployees: number;
  activeTeachers: number;
  byDepartment: DepartmentHeadcountItem[];
  byBranch: BranchHeadcountItem[];
  expiringContracts: ExpiringContractItem[];
  teacherWorkloads: TeacherWorkloadItem[];
}

export interface HonorRollStudentItem {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  className: string;
  programName?: string;
  branchName?: string;
  averageScore: number;
  totalScore: number;
  gpa: number;
  letterGrade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  rank: number;
  attendanceRate: number;
}

export interface ClassPerformanceItem {
  classId: string;
  className: string;
  programName?: string;
  studentCount: number;
  classAverage: number;
  highestScore: number;
  passingRate: number;
}

export interface GradeDistributionBucket {
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  count: number;
  percentage: number;
}

export interface AcademicHonorRollSummary {
  totalEvaluatedStudents: number;
  overallAverage: number;
  overallPassingRate: number;
  honorRollCount: number;
}

export interface AcademicHonorRollResponse {
  summary: AcademicHonorRollSummary;
  topPerformers: HonorRollStudentItem[];
  classPerformances: ClassPerformanceItem[];
  gradeDistribution: GradeDistributionBucket[];
}

export interface AcademicHonorRollFilters {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  classId?: string;
  limit?: number;
}
