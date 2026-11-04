'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from '@/components/icons';
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  ClipboardList,
  FileClock,
  GraduationCap,
  Layers,
  ShieldCheck,
  UserCheck,
  Users,
} from '@/components/icons';

import { useAcademicContext } from '@/components/providers/academic-context-provider';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';
import { AcademicDashboardTab } from '@/features/dashboard/components/academic-dashboard-tab';
import { ActionItemsQueue } from '@/features/dashboard/components/action-items-queue';
import { FinanceDashboardTab } from '@/features/dashboard/components/finance-dashboard-tab';
import { HrDashboardTab } from '@/features/dashboard/components/hr-dashboard-tab';
import { ManagementPulse } from '@/features/dashboard/components/management-pulse';
import { StudentAffairsDashboardTab } from '@/features/dashboard/components/student-affairs-dashboard-tab';
import {
  DASHBOARD_REFRESH_INTERVAL_MS,
  useDashboardActionItemsQuery,
  useFinancePulseQuery,
  useHrPulseQuery,
  useStudentAffairsPulseQuery,
} from '@/features/dashboard/hooks/use-dashboard';
import { usePositionsQuery } from '@/features/positions/hooks/use-positions';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useStudentsQuery } from '@/features/students/hooks/use-students';
import type { Branch } from '@/features/branches/types';
import { useTranslation } from '@/lib/i18n';
import { useQueryClient } from '@tanstack/react-query';

export type DashboardPerspective =
  'general' | 'executive' | 'academic' | 'student_affairs' | 'finance' | 'hr';

interface DashboardPageProps {
  initialPerspective?: DashboardPerspective;
}

interface OverviewMetricCardProps {
  label: string;
  value: React.ReactNode;
  detail: string;
  icon: LucideIcon;
  iconClassName?: string;
  href?: string;
}

const OverviewMetricCard = ({
  label,
  value,
  detail,
  icon: Icon,
  iconClassName,
  href,
}: OverviewMetricCardProps) => {
  const card = (
    <Card className="h-full border border-slate-200 bg-white transition-colors hover:border-slate-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs leading-4 font-semibold text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{value}</p>
          </div>
          <Icon className={cn('size-6 shrink-0', iconClassName)} />
        </div>
        <p className="mt-1 text-xs leading-4 text-slate-500">{detail}</p>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link
      className="block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-[#00509d]"
      href={href}
    >
      {card}
    </Link>
  ) : (
    card
  );
};

const formatCurrencySummary = (
  amounts: Array<{ currency: 'USD' | 'KHR'; amount: number }> | undefined,
): string => {
  if (!amounts?.length) return '—';
  return amounts
    .map(({ amount, currency }) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: currency === 'KHR' ? 0 : 2,
      }).format(amount),
    )
    .join(' · ');
};

interface OverviewChartPoint {
  key: string;
  label: string;
  value: number;
  displayValue?: string;
}

const OverviewHorizontalBarChart = ({
  points,
  ariaLabel,
  emptyLabel,
}: {
  points: OverviewChartPoint[];
  ariaLabel: string;
  emptyLabel: string;
}) => {
  if (points.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">{emptyLabel}</p>;
  }

  const maximum = Math.max(1, ...points.map((point) => point.value));

  return (
    <div className="space-y-3" role="img" aria-label={ariaLabel}>
      {points.map((point) => (
        <div key={point.key}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs leading-4">
            <span className="truncate font-medium text-slate-600">{point.label}</span>
            <span className="shrink-0 font-semibold text-slate-900">
              {point.displayValue ?? point.value}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#00509d] transition-[width] duration-500"
              style={{ width: `${Math.max(3, (point.value / maximum) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const OverviewMonthlyBarChart = ({
  points,
  ariaLabel,
  emptyLabel,
}: {
  points: OverviewChartPoint[];
  ariaLabel: string;
  emptyLabel: string;
}) => {
  if (points.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">{emptyLabel}</p>;
  }

  return (
    <div
      className="grid h-52 grid-cols-12 items-end gap-1.5 pt-6"
      role="img"
      aria-label={ariaLabel}
    >
      {points.map((point) => (
        <div
          key={point.key}
          className="flex h-full min-w-0 flex-col items-center justify-end gap-2"
        >
          <span className="text-xs font-semibold text-slate-600">
            {point.displayValue ?? point.value}
          </span>
          <div className="flex h-32 w-full items-end overflow-hidden rounded-t bg-slate-100">
            <div
              className="w-full rounded-t bg-emerald-600 transition-[height] duration-500"
              style={{ height: `${Math.max(3, Math.min(100, point.value))}%` }}
            />
          </div>
          <span className="truncate text-xs text-slate-500">{point.label}</span>
        </div>
      ))}
    </div>
  );
};

const DASHBOARD_QUERY_ROOTS = new Set([
  'dashboard-action-items',
  'dashboard-finance-pulse',
  'dashboard-student-affairs-pulse',
  'dashboard-hr-pulse',
  'dashboard-academic-honor-roll',
  'monthly-report-overview',
  'branches',
  'students',
  'employees',
  'departments',
  'positions',
  'programs',
  'classes',
]);

const DASHBOARD_COUNTER_QUERY_ROOTS = new Set([
  'branches',
  'students',
  'employees',
  'departments',
  'positions',
  'programs',
  'classes',
]);

export function DashboardPage({ initialPerspective }: DashboardPageProps) {
  const { t, language, getLocalizedValue, isKhmer } = useTranslation();
  const {
    user,
    isLoading: isAuthLoading,
    hasPermission,
    hasAnyPermission,
    currentBranchId,
  } = useAuth();
  const { selectedAcademicYearId } = useAcademicContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const refreshDashboardQueries = React.useCallback(
    () =>
      queryClient.refetchQueries({
        type: 'active',
        predicate: (query) => DASHBOARD_QUERY_ROOTS.has(String(query.queryKey[0])),
      }),
    [queryClient],
  );

  React.useEffect(() => {
    const refreshTimer = window.setInterval(() => {
      void queryClient.refetchQueries({
        type: 'active',
        predicate: (query) => DASHBOARD_COUNTER_QUERY_ROOTS.has(String(query.queryKey[0])),
      });
    }, DASHBOARD_REFRESH_INTERVAL_MS);

    return () => window.clearInterval(refreshTimer);
  }, [queryClient]);

  React.useEffect(() => {
    const refreshOnFocus = () => {
      if (document.visibilityState !== 'visible') return;
      void refreshDashboardQueries();
    };

    window.addEventListener('focus', refreshOnFocus);
    document.addEventListener('visibilitychange', refreshOnFocus);
    return () => {
      window.removeEventListener('focus', refreshOnFocus);
      document.removeEventListener('visibilitychange', refreshOnFocus);
    };
  }, [refreshDashboardQueries]);

  const userRoles = React.useMemo(() => user?.roles ?? [], [user?.roles]);
  const isSuperAdmin = hasPermission('*');
  const isBranchManager = userRoles.includes('branch_manager');

  // Perspective tabs are permission-driven. Roles remain display metadata only.
  const canAccessExecutiveTab =
    isSuperAdmin || hasAnyPermission(['report.view.own_branch', 'report.view.all_branches']);

  const canAccessAcademicTab =
    isSuperAdmin ||
    hasAnyPermission([
      'class.view.assigned_class',
      'class.view.own_branch',
      'class.view.all_branches',
      'attendance.view.own_branch',
      'attendance.view.assigned_class',
      'score.view.own_branch',
      'score.view.assigned_subject',
      'teacher_assignment.view.own_branch',
      'teacher_assignment.view.all_branches',
    ]);

  const canAccessStaffWorkspace = hasAnyPermission([
    'employee.view.own_record',
    'employee.view.own_department',
    'report.academic.view.own_branch',
    'report.academic.view.all_branches',
  ]);
  const canAccessStaffTeacherTab = canAccessAcademicTab || canAccessStaffWorkspace;

  const canAccessStudentAffairsTab =
    isSuperAdmin ||
    hasAnyPermission([
      'student.view.assigned_class',
      'student.view.own_branch',
      'student.view.all_branches',
      'registration.view.own_branch',
      'registration.view.all_branches',
      'enrollment.view.own_branch',
      'enrollment.view.all_branches',
      'student_case.view.own_branch',
      'student_case.view.all_branches',
    ]);

  // Confidential Finance tab requires a finance permission at the user's scope.
  const canAccessFinanceTab =
    isSuperAdmin ||
    hasAnyPermission([
      'payment.view.own_branch',
      'payment.view.all_branches',
      'tuition.view.own_branch',
      'tuition.view.all_branches',
      'report.finance.view.own_branch',
      'finance.payment.create.own_branch',
      'finance.payment.create.all_branches',
    ]);

  // Confidential HR tab requires an employee view permission at the user's scope.
  const canAccessHrTab =
    isSuperAdmin || hasAnyPermission(['employee.view.own_branch', 'employee.view.all_branches']);

  const canAccessInitialPerspective =
    !initialPerspective ||
    (initialPerspective === 'executive' && canAccessExecutiveTab) ||
    (initialPerspective === 'academic' && canAccessStaffTeacherTab) ||
    (initialPerspective === 'student_affairs' && canAccessStudentAffairsTab) ||
    (initialPerspective === 'finance' && canAccessFinanceTab) ||
    (initialPerspective === 'hr' && canAccessHrTab);

  React.useEffect(() => {
    if (!isAuthLoading && !canAccessInitialPerspective) {
      router.replace('/dashboard');
    }
  }, [canAccessInitialPerspective, isAuthLoading, router]);

  const activeTab = React.useMemo<DashboardPerspective>(() => {
    if (initialPerspective === 'executive' && canAccessExecutiveTab) return 'executive';
    if (initialPerspective === 'academic' && canAccessStaffTeacherTab) return 'academic';
    if (initialPerspective === 'student_affairs' && canAccessStudentAffairsTab) {
      return 'student_affairs';
    }
    if (initialPerspective === 'finance' && canAccessFinanceTab) return 'finance';
    if (initialPerspective === 'hr' && canAccessHrTab) return 'hr';
    return 'general';
  }, [
    canAccessExecutiveTab,
    canAccessStaffTeacherTab,
    canAccessStudentAffairsTab,
    canAccessFinanceTab,
    canAccessHrTab,
    initialPerspective,
  ]);

  const canViewBranches = hasAnyPermission(['branch.view.own_branch', 'branch.view.all_branches']);
  const canViewStudents = hasAnyPermission([
    'student.view.assigned_class',
    'student.view.own_branch',
    'student.view.all_branches',
  ]);
  const canViewEmployees = hasAnyPermission([
    'employee.view.own_department',
    'employee.view.own_branch',
    'employee.view.all_branches',
  ]);
  const canViewDepartments = hasAnyPermission([
    'department.view.own_department',
    'department.view.own_branch',
    'department.view.all_branches',
  ]);
  const canViewPositions = hasAnyPermission([
    'position.view.own_branch',
    'position.view.all_branches',
  ]);
  const canViewPrograms = hasAnyPermission([
    'program.view.own_branch',
    'program.view.all_branches',
  ]);
  const canViewClasses = hasAnyPermission([
    'class.view.assigned_class',
    'class.view.own_branch',
    'class.view.all_branches',
  ]);
  const isOverview = activeTab === 'general';
  const showsOrganizationMetrics = isOverview || activeTab === 'executive';

  // Dynamic real data queries for executive overview
  const branchQuery = useBranchesQuery({}, canViewBranches);
  const studentQuery = useStudentsQuery(
    currentBranchId !== 'all' ? { branchId: currentBranchId } : {},
    isOverview && canViewStudents,
  );
  const employeeQuery = useEmployeesQuery(
    currentBranchId !== 'all' ? { branchId: currentBranchId } : {},
    isOverview && canViewEmployees,
  );
  const departmentQuery = useDepartmentsQuery(
    currentBranchId !== 'all' ? { branchId: currentBranchId } : {},
    showsOrganizationMetrics && canViewDepartments,
  );
  const positionQuery = usePositionsQuery(
    currentBranchId !== 'all' ? { branchId: currentBranchId } : {},
    showsOrganizationMetrics && canViewPositions,
  );
  const programQuery = useProgramsQuery({}, showsOrganizationMetrics && canViewPrograms);
  const classQuery = useClassesQuery(
    currentBranchId !== 'all' ? { branchId: currentBranchId } : {},
    isOverview && canViewClasses,
  );

  const overviewFilters = React.useMemo(
    () => ({
      branchId: currentBranchId !== 'all' ? currentBranchId : undefined,
      academicYearId: selectedAcademicYearId ?? undefined,
    }),
    [currentBranchId, selectedAcademicYearId],
  );
  const canViewActionItems =
    canAccessExecutiveTab ||
    canAccessAcademicTab ||
    canAccessStudentAffairsTab ||
    canAccessFinanceTab;
  const overviewActionItemsQuery = useDashboardActionItemsQuery(
    overviewFilters,
    isOverview && canViewActionItems,
  );
  const overviewStudentQuery = useStudentAffairsPulseQuery(
    overviewFilters,
    isOverview && canAccessStudentAffairsTab,
  );
  const overviewHrQuery = useHrPulseQuery(
    { branchId: overviewFilters.branchId },
    isOverview && canAccessHrTab,
  );
  const overviewFinancePeriod = React.useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }, []);
  const overviewFinanceQuery = useFinancePulseQuery(
    { ...overviewFilters, ...overviewFinancePeriod },
    isOverview && canAccessFinanceTab,
  );

  // Counts
  const totalBranches =
    branchQuery.data?.pagination?.total ??
    (Array.isArray(branchQuery.data?.data) ? branchQuery.data.data.length : 0);
  const totalStudents =
    studentQuery.data?.pagination?.total ??
    (Array.isArray(studentQuery.data?.data) ? studentQuery.data.data.length : 0);
  const totalEmployees =
    employeeQuery.data?.pagination?.total ??
    (Array.isArray(employeeQuery.data?.data) ? employeeQuery.data.data.length : 0);
  const totalDepartments =
    departmentQuery.data?.pagination?.total ??
    (Array.isArray(departmentQuery.data?.data) ? departmentQuery.data.data.length : 0);
  const totalPositions =
    positionQuery.data?.pagination?.total ??
    (Array.isArray(positionQuery.data?.data) ? positionQuery.data.data.length : 0);
  const totalPrograms =
    programQuery.data?.pagination?.total ??
    (Array.isArray(programQuery.data?.data) ? programQuery.data.data.length : 0);
  const totalClasses =
    classQuery.data?.pagination?.total ??
    (Array.isArray(classQuery.data?.data) ? classQuery.data.data.length : 0);

  // Branch filtering & computation for executive context control
  const allBranches: Branch[] = React.useMemo(() => {
    return Array.isArray(branchQuery.data?.data) ? branchQuery.data.data : [];
  }, [branchQuery.data]);

  const branches: Branch[] = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') {
      return allBranches;
    }
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const activeBranch = React.useMemo(() => {
    return branches.find((b) => b._id === currentBranchId);
  }, [branches, currentBranchId]);

  // Dynamic Timezone-aware date for Asia/Phnom_Penh
  const formattedDate = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat(language === 'kh' ? 'km-KH' : 'en-US', {
        timeZone: 'Asia/Phnom_Penh',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return new Date().toLocaleDateString(language === 'kh' ? 'km-KH' : 'en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }, [language]);

  // Dynamic Greeting based on time of day
  const greeting = React.useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t.dashboard.greetingMorning;
    if (hour < 18) return t.dashboard.greetingAfternoon;
    return t.dashboard.greetingEvening;
  }, [t.dashboard]);

  const displayName = React.useMemo(() => {
    if (!user) return t.dashboard.greetingGeneric;
    if (typeof user.employeeId === 'object' && user.employeeId !== null) {
      if (language === 'kh' && user.employeeId.khmerName) {
        return user.employeeId.khmerName;
      }
      return `${user.employeeId.firstName} ${user.employeeId.lastName}`;
    }
    return user.username;
  }, [user, language, t.dashboard.greetingGeneric]);

  const employeeRecordId =
    typeof user?.employeeId === 'object' ? user.employeeId._id : user?.employeeId;

  const formattedRole = React.useMemo(() => {
    if (!user) return 'User';
    return user.roles
      .map((r) =>
        r
          .split('_')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
      )
      .join(', ');
  }, [user]);

  const overviewText = isSuperAdmin
    ? t.dashboard.overviewSuperAdmin
    : isBranchManager
      ? t.dashboard.overviewBranchManager
      : t.dashboard.overviewGeneric;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tone="neutral" className="bg-[#023e8a]/10 font-semibold text-[#023e8a]">
                {formattedRole}
              </Badge>
              <Badge tone="neutral" className="text-slate-600">
                {user?.branchAccess === 'all'
                  ? t.dashboard.allCampuses
                  : currentBranchId !== 'all'
                    ? t.dashboard.activeBranch
                    : t.dashboard.singleCampus}
              </Badge>
            </div>

            <p className="mb-1 text-xs font-medium text-slate-500">{formattedDate}</p>
            <h1 className="max-w-2xl text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              {greeting}, {displayName}.
            </h1>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 md:text-sm">
              {overviewText}
            </p>
          </div>

          {/* Executive Branch Scope Deck */}
          <div className="rounded-2xl bg-[#023e8a] p-5 text-white">
            <div className="flex items-center justify-between text-white/80">
              <span className="text-xs font-semibold uppercase">{t.dashboard.activeContext}</span>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-semibold text-white/90">
                  {currentBranchId === 'all' ? 'ALL' : (activeBranch?.branchCode ?? 'CAMPUS')}
                </span>
              </div>
            </div>

            <p className="mt-2 text-base font-bold text-white">
              {currentBranchId === 'all'
                ? t.topbar.allBranches
                : activeBranch
                  ? getLocalizedValue(activeBranch.branchNameKh, activeBranch.branchNameEn)
                  : t.dashboard.branchIsolated}
            </p>
            <p className="mt-0.5 text-xs text-white/75">
              {currentBranchId === 'all'
                ? isKhmer
                  ? 'ទិដ្ឋភាពរួមគ្រប់សាខាទូទាំងសាលា'
                  : 'Consolidated cross-campus global scope'
                : isKhmer
                  ? 'កំពុងគ្រប់គ្រងទិន្នន័យជាក់លាក់នៃសាខានេះ'
                  : 'Active isolated campus operations'}
            </p>
          </div>
        </div>
      </section>

      {/* Perspective Content Rendering */}
      {activeTab === 'academic' && canAccessAcademicTab && (
        <AcademicDashboardTab
          branchId={currentBranchId}
          academicYearId={selectedAcademicYearId ?? undefined}
        />
      )}

      {activeTab === 'academic' && canAccessStaffWorkspace && !canAccessAcademicTab && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Briefcase className="size-6 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-base">
                  {isKhmer ? 'កន្លែងធ្វើការរបស់បុគ្គលិក' : 'Staff Workspace'}
                </CardTitle>
                <CardDescription className="mt-1 text-xs leading-5">
                  {isKhmer
                    ? 'ចូលប្រើព័ត៌មានបុគ្គលិក ជំនាញ និងធនធានដែលបានអនុញ្ញាតតាមតួនាទីរបស់អ្នក។'
                    : 'Access your staff record, skills, and resources allowed for your role.'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {hasPermission('employee.view.own_record') && employeeRecordId && (
              <Link
                className={buttonVariants({ size: 'sm', variant: 'outline' })}
                href={`/employees/${employeeRecordId}`}
              >
                {isKhmer ? 'ព័ត៌មានបុគ្គលិក' : 'Staff Record'}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Link>
            )}
            {hasAnyPermission(['skill.view.own_branch', 'employee_skill.view.own_record']) && (
              <Link className={buttonVariants({ size: 'sm', variant: 'outline' })} href="/skills">
                {isKhmer ? 'ជំនាញ និងសមត្ថភាព' : 'Skills & Competencies'}
                <ArrowRight className="ml-1.5 size-3.5" />
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'general' && (
        <div className="space-y-6">
          <section aria-labelledby="overview-core-heading" className="space-y-3">
            <div>
              <h2 id="overview-core-heading" className="text-lg font-semibold text-slate-950">
                {isKhmer ? 'ទិន្នន័យសំខាន់ៗ' : 'Key Overview'}
              </h2>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">
                {isKhmer
                  ? 'ទិន្នន័យបច្ចុប្បន្នតាមសាខា ឆ្នាំសិក្សា និងសិទ្ធិរបស់អ្នក។'
                  : 'Current records for the selected branch, academic year, and your access level.'}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {canViewStudents && (
                <OverviewMetricCard
                  label={t.dashboard.enrolledStudents}
                  value={
                    studentQuery.isLoading ? '...' : studentQuery.isError ? '—' : totalStudents
                  }
                  detail={t.dashboard.studentRecords}
                  icon={GraduationCap}
                  iconClassName="text-indigo-600"
                  href="/students"
                />
              )}
              {canViewEmployees && (
                <OverviewMetricCard
                  label={t.dashboard.staffFaculty}
                  value={
                    employeeQuery.isLoading ? '...' : employeeQuery.isError ? '—' : totalEmployees
                  }
                  detail={t.dashboard.registeredEmployees}
                  icon={Users}
                  iconClassName="text-[#00509d]"
                  href="/employees"
                />
              )}
              {canViewBranches && (
                <OverviewMetricCard
                  label={t.dashboard.campusBranches}
                  value={branchQuery.isLoading ? '...' : branchQuery.isError ? '—' : totalBranches}
                  detail={t.dashboard.operationalCampuses}
                  icon={Building2}
                  iconClassName="text-amber-600"
                  href="/organization/branches"
                />
              )}
              {canViewDepartments && (
                <OverviewMetricCard
                  label={t.dashboard.departmentsCount}
                  value={
                    departmentQuery.isLoading
                      ? '...'
                      : departmentQuery.isError
                        ? '—'
                        : totalDepartments
                  }
                  detail={t.dashboard.branchDepartments}
                  icon={Layers}
                  iconClassName="text-violet-600"
                  href="/organization/departments"
                />
              )}
              {canViewClasses && (
                <OverviewMetricCard
                  label={t.dashboard.academicClasses}
                  value={classQuery.isLoading ? '...' : classQuery.isError ? '—' : totalClasses}
                  detail={t.dashboard.activeClassRosters}
                  icon={BookOpen}
                  iconClassName="text-emerald-600"
                  href="/classes"
                />
              )}
              {canViewPrograms && (
                <OverviewMetricCard
                  label={t.dashboard.curriculumPrograms}
                  value={
                    programQuery.isLoading ? '...' : programQuery.isError ? '—' : totalPrograms
                  }
                  detail={t.dashboard.curriculumProgramsSub}
                  icon={BookOpen}
                  iconClassName="text-cyan-600"
                  href="/programs"
                />
              )}
              {canViewPositions && (
                <OverviewMetricCard
                  label={isKhmer ? 'មុខតំណែង' : 'Positions'}
                  value={
                    positionQuery.isLoading ? '...' : positionQuery.isError ? '—' : totalPositions
                  }
                  detail={isKhmer ? 'មុខតំណែងក្នុងរចនាសម្ព័ន្ធ' : 'Organization positions'}
                  icon={Briefcase}
                  iconClassName="text-slate-600"
                  href="/organization/positions"
                />
              )}
            </div>
          </section>

          {(canViewActionItems ||
            canAccessStudentAffairsTab ||
            canAccessFinanceTab ||
            canAccessHrTab) && (
            <section aria-labelledby="overview-pulse-heading" className="space-y-3">
              <div>
                <h2 id="overview-pulse-heading" className="text-lg font-semibold text-slate-950">
                  {isKhmer ? 'ស្ថានភាពប្រតិបត្តិការ' : 'Operational Highlights'}
                </h2>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {isKhmer
                    ? 'ចំណុចសំខាន់ៗដែលត្រូវតាមដានតាមផ្នែកការងារ។'
                    : 'Important items requiring attention across authorized work areas.'}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {canViewActionItems && (
                  <OverviewMetricCard
                    label={isKhmer ? 'កិច្ចការរង់ចាំ' : 'Pending Actions'}
                    value={
                      overviewActionItemsQuery.isLoading
                        ? '...'
                        : (overviewActionItemsQuery.data?.data.summary.totalActionItems ?? '—')
                    }
                    detail={isKhmer ? 'កិច្ចការត្រូវដោះស្រាយ' : 'Items requiring follow-up'}
                    icon={ClipboardList}
                    iconClassName="text-amber-600"
                    href={canAccessExecutiveTab ? '/dashboard/executive' : undefined}
                  />
                )}
                {canAccessStudentAffairsTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'ចុះឈ្មោះថ្មីខែនេះ' : 'New Enrollments'}
                    value={
                      overviewStudentQuery.isLoading
                        ? '...'
                        : (overviewStudentQuery.data?.data.movement.newEnrollmentsThisMonth ?? '—')
                    }
                    detail={isKhmer ? 'សិស្សចូលរៀនក្នុងខែនេះ' : 'Students enrolled this month'}
                    icon={UserCheck}
                    iconClassName="text-emerald-600"
                    href="/dashboard/students"
                  />
                )}
                {canAccessStudentAffairsTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'សិស្សត្រូវតាមដាន' : 'Attendance Risk'}
                    value={
                      overviewStudentQuery.isLoading
                        ? '...'
                        : (overviewStudentQuery.data?.data.atRiskAbsences.length ?? '—')
                    }
                    detail={isKhmer ? 'អវត្តមានជាប់ៗគ្នា' : 'Consecutive absence alerts'}
                    icon={AlertTriangle}
                    iconClassName="text-rose-600"
                    href="/dashboard/students"
                  />
                )}
                {canAccessFinanceTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'ប្រមូលបានខែនេះ' : 'Collected This Month'}
                    value={
                      overviewFinanceQuery.isLoading
                        ? '...'
                        : formatCurrencySummary(
                            overviewFinanceQuery.data?.data.summary?.selectedPeriod
                              .collectedByCurrency,
                          )
                    }
                    detail={isKhmer ? 'ចំណូលថ្លៃសិក្សាប្រចាំខែ' : 'Monthly tuition collections'}
                    icon={Banknote}
                    iconClassName="text-emerald-600"
                    href="/dashboard/finance"
                  />
                )}
                {canAccessFinanceTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'គណនីហួសកំណត់' : 'Overdue Accounts'}
                    value={
                      overviewFinanceQuery.isLoading
                        ? '...'
                        : (overviewFinanceQuery.data?.data.summary?.overdue.accountCount ?? '—')
                    }
                    detail={isKhmer ? 'គណនីត្រូវតាមដាន' : 'Accounts requiring collection follow-up'}
                    icon={AlertTriangle}
                    iconClassName="text-rose-600"
                    href="/dashboard/finance"
                  />
                )}
                {canAccessHrTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'គ្រូកំពុងបង្រៀន' : 'Teaching Faculty'}
                    value={
                      overviewHrQuery.isLoading
                        ? '...'
                        : (overviewHrQuery.data?.data.activeTeachers ?? '—')
                    }
                    detail={isKhmer ? 'គ្រូបង្រៀនសកម្ម' : 'Active academic instructors'}
                    icon={GraduationCap}
                    iconClassName="text-indigo-600"
                    href="/dashboard/hr"
                  />
                )}
                {canAccessHrTab && (
                  <OverviewMetricCard
                    label={isKhmer ? 'កិច្ចសន្យាជិតផុតកំណត់' : 'Expiring Contracts'}
                    value={
                      overviewHrQuery.isLoading
                        ? '...'
                        : (overviewHrQuery.data?.data.expiringContracts.length ?? '—')
                    }
                    detail={isKhmer ? 'ក្នុងរយៈពេល ៦០ ថ្ងៃ' : 'Due within 60 days'}
                    icon={CalendarClock}
                    iconClassName="text-amber-600"
                    href="/dashboard/hr"
                  />
                )}
              </div>
            </section>
          )}

          {(canAccessFinanceTab || canAccessStudentAffairsTab || canAccessHrTab) && (
            <section aria-labelledby="overview-chart-heading" className="space-y-3">
              <div>
                <h2 id="overview-chart-heading" className="text-lg font-semibold text-slate-950">
                  {isKhmer ? 'ក្រាហ្វ និងនិន្នាការ' : 'Charts & Trends'}
                </h2>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {isKhmer
                    ? 'មើលការប្រែប្រួល និងការបែងចែកទិន្នន័យសំខាន់ៗយ៉ាងឆាប់រហ័ស។'
                    : 'Review important changes and distributions at a glance.'}
                </p>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {canAccessFinanceTab && (
                  <Card className="border border-slate-200 bg-white xl:col-span-2">
                    <CardHeader className="border-b border-slate-100 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">
                            {isKhmer ? 'អត្រាប្រមូលថ្លៃសិក្សា ១២ ខែ' : '12-Month Collection Rate'}
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs leading-5">
                            {isKhmer
                              ? 'ភាគរយនៃការប្រមូលប្រាក់ប្រចាំខែធៀបនឹងគោលដៅ។'
                              : 'Monthly tuition collected compared with the scheduled target.'}
                          </CardDescription>
                        </div>
                        <Link
                          href="/dashboard/finance"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
                        >
                          {isKhmer ? 'មើលលម្អិត' : 'View details'}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <OverviewMonthlyBarChart
                        points={(overviewFinanceQuery.data?.data.monthlyCollection ?? []).map(
                          (month) => {
                            const primaryCurrency =
                              month.currencyBreakdown?.find((item) => item.currency === 'USD') ??
                              month.currencyBreakdown?.[0];
                            const rate = primaryCurrency?.collectionRate ?? month.collectionRate;
                            return {
                              key: `collection-month-${month.month}`,
                              label: isKhmer ? month.monthNameKh : month.monthNameEn.slice(0, 3),
                              value: rate,
                              displayValue: `${Math.round(rate)}%`,
                            };
                          },
                        )}
                        ariaLabel={
                          isKhmer
                            ? 'ក្រាហ្វអត្រាប្រមូលថ្លៃសិក្សា ១២ ខែ'
                            : 'Twelve month tuition collection rate chart'
                        }
                        emptyLabel={
                          overviewFinanceQuery.isLoading
                            ? isKhmer
                              ? 'កំពុងទាញយកទិន្នន័យ...'
                              : 'Loading collection data...'
                            : isKhmer
                              ? 'មិនមានទិន្នន័យប្រមូលប្រាក់'
                              : 'No collection data available'
                        }
                      />
                    </CardContent>
                  </Card>
                )}

                {canAccessStudentAffairsTab && (
                  <Card className="border border-slate-200 bg-white">
                    <CardHeader className="border-b border-slate-100 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">
                            {isKhmer ? 'លំហូរចុះឈ្មោះសិស្ស' : 'Admissions Funnel'}
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs leading-5">
                            {isKhmer
                              ? 'ពីការចុះឈ្មោះដំបូងរហូតដល់ចូលរៀនផ្លូវការ។'
                              : 'From initial registration through official enrollment.'}
                          </CardDescription>
                        </div>
                        <Link
                          href="/dashboard/students"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
                        >
                          {isKhmer ? 'មើលលម្អិត' : 'View details'}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <OverviewHorizontalBarChart
                        points={(overviewStudentQuery.data?.data.funnel ?? []).map((stage) => ({
                          key: `admission-stage-${stage.stage}`,
                          label: isKhmer ? stage.labelKh : stage.labelEn,
                          value: stage.count,
                          displayValue: `${stage.count} (${stage.percentage}%)`,
                        }))}
                        ariaLabel={
                          isKhmer ? 'ក្រាហ្វលំហូរចុះឈ្មោះសិស្ស' : 'Student admissions funnel chart'
                        }
                        emptyLabel={
                          overviewStudentQuery.isLoading
                            ? isKhmer
                              ? 'កំពុងទាញយកទិន្នន័យ...'
                              : 'Loading admissions data...'
                            : isKhmer
                              ? 'មិនមានទិន្នន័យចុះឈ្មោះ'
                              : 'No admissions data available'
                        }
                      />
                    </CardContent>
                  </Card>
                )}

                {canAccessHrTab && (
                  <Card className="border border-slate-200 bg-white">
                    <CardHeader className="border-b border-slate-100 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">
                            {isKhmer ? 'បុគ្គលិកតាមផ្នែក' : 'Workforce by Department'}
                          </CardTitle>
                          <CardDescription className="mt-1 text-xs leading-5">
                            {isKhmer
                              ? 'ការបែងចែកបុគ្គលិកតាមផ្នែកការងារ។'
                              : 'Current employee distribution across departments.'}
                          </CardDescription>
                        </div>
                        <Link
                          href="/dashboard/hr"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
                        >
                          {isKhmer ? 'មើលលម្អិត' : 'View details'}
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <OverviewHorizontalBarChart
                        points={(overviewHrQuery.data?.data.byDepartment ?? [])
                          .slice(0, 6)
                          .map((department) => ({
                            key: `department-${department.departmentId}`,
                            label:
                              isKhmer && department.departmentNameKh
                                ? department.departmentNameKh
                                : department.departmentNameEn,
                            value: department.count,
                          }))}
                        ariaLabel={
                          isKhmer ? 'ក្រាហ្វបុគ្គលិកតាមផ្នែក' : 'Workforce by department chart'
                        }
                        emptyLabel={
                          overviewHrQuery.isLoading
                            ? isKhmer
                              ? 'កំពុងទាញយកទិន្នន័យ...'
                              : 'Loading workforce data...'
                            : isKhmer
                              ? 'មិនមានទិន្នន័យបុគ្គលិក'
                              : 'No workforce data available'
                        }
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          )}
        </div>
      )}

      {activeTab === 'student_affairs' && (
        <StudentAffairsDashboardTab
          branchId={currentBranchId}
          academicYearId={selectedAcademicYearId ?? undefined}
        />
      )}

      {activeTab === 'finance' && (
        <FinanceDashboardTab
          branchId={currentBranchId}
          academicYearId={selectedAcademicYearId ?? undefined}
        />
      )}

      {activeTab === 'hr' && <HrDashboardTab branchId={currentBranchId} />}

      {activeTab === 'executive' && canAccessExecutiveTab && (
        <>
          <ManagementPulse />

          <ActionItemsQueue />

          {/* Role-Aware Action & Module Hub */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Management Shortcuts */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-950">
                  {t.dashboard.quickActions}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t.dashboard.quickActionsDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {canViewStudents && (
                  <Link
                    href="/students"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.studentDirectory}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {canViewEmployees && (
                  <Link
                    href="/employees"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.employeeDirectory}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {hasPermission('enrollment.view.own_branch') && (
                  <Link
                    href="/enrollments"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserCheck className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.classEnrollments}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {hasPermission('branch.view.all_branches') && (
                  <Link
                    href="/organization/branches"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.manageBranches}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {canViewClasses && (
                  <Link
                    href="/classes"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.classRosters}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {hasPermission('user.view.all_branches') && (
                  <Link
                    href="/users"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.userAccessRoles}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {hasPermission('audit.view.own_branch') && (
                  <Link
                    href="/audit-logs"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileClock className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.systemAuditTrail}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}

                {hasPermission('department.view.own_branch') && (
                  <Link
                    href="/organization/departments"
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="size-4 text-[#00509d]" />
                      <span className="text-xs font-semibold text-slate-800">
                        {t.dashboard.departmentsStaffing}
                      </span>
                    </div>
                    <ArrowRight className="size-3.5 text-slate-400" />
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* School Organization Summary */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-slate-950">
                  {t.dashboard.curriculumStructure}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t.dashboard.curriculumStructureDesc}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {canViewPrograms && (
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center gap-3">
                      <BookOpen className="size-5 shrink-0 text-[#00509d]" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {t.dashboard.curriculumPrograms}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t.dashboard.curriculumProgramsSub}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{totalPrograms}</span>
                  </div>
                )}

                {canViewDepartments && (
                  <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="size-5 shrink-0 text-amber-600" />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {t.dashboard.departmentsPositions}
                        </p>
                        <p className="text-xs text-slate-500">
                          {t.dashboard.departmentsPositionsSub}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {totalDepartments} {language === 'kh' ? 'ផ្នែក' : 'Depts'} / {totalPositions}{' '}
                      {language === 'kh' ? 'តួនាទី' : 'Roles'}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
                  <span>
                    {language === 'kh'
                      ? 'សាលាអន្តរជាតិ អេស អ៊ិន ភី · កម្ពុជា'
                      : 'SNPI International School · Cambodia'}
                  </span>
                  {hasPermission('school.view.all_branches') && (
                    <Link
                      href="/organization/school"
                      className="font-semibold text-[#00509d] hover:underline"
                    >
                      {t.dashboard.viewSchoolProfile}
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
