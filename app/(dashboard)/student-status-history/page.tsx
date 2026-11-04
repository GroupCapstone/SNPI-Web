'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  CalendarRange,
  Clock,
  GraduationCap,
  History,
  RotateCcw,
  Search,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/context/auth-context';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EntityHistoryDialog } from '@/features/audit-logs/components/entity-history-dialog';
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import type { EnrollmentQueryFilters } from '@/features/enrollments/types';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type StatusGroupType = 'all' | 'continuing' | 'completed' | 'dropped' | 'transferred';

const MONTH_OPTIONS = [
  { value: '1', kh: 'មករា (ខែ ១)', en: 'January (01)' },
  { value: '2', kh: 'កុម្ភៈ (ខែ ២)', en: 'February (02)' },
  { value: '3', kh: 'មីនា (ខែ ៣)', en: 'March (03)' },
  { value: '4', kh: 'មេសា (ខែ ៤)', en: 'April (04)' },
  { value: '5', kh: 'ឧសភា (ខែ ៥)', en: 'May (05)' },
  { value: '6', kh: 'មិថុនា (ខែ ៦)', en: 'June (06)' },
  { value: '7', kh: 'កក្កដា (ខែ ៧)', en: 'July (07)' },
  { value: '8', kh: 'សីហា (ខែ ៨)', en: 'August (08)' },
  { value: '9', kh: 'កញ្ញា (ខែ ៩)', en: 'September (09)' },
  { value: '10', kh: 'តុលា (ខែ ១០)', en: 'October (10)' },
  { value: '11', kh: 'វិច្ឆិកា (ខែ ១១)', en: 'November (11)' },
  { value: '12', kh: 'ធ្នូ (ខែ ១២)', en: 'December (12)' },
];

export default function StudentStatusHistoryPage() {
  const { t, isKhmer } = useTranslation();
  const { user, currentBranchId } = useAuth();

  // Filters State
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [selectedStatusGroup, setSelectedStatusGroup] = React.useState<StatusGroupType>('all');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [selectedAcademicYearFilter, setSelectedAcademicYearFilter] = React.useState<string>('');
  const [selectedAcademicPeriodFilter, setSelectedAcademicPeriodFilter] =
    React.useState<string>('');
  const [selectedYearFilter, setSelectedYearFilter] = React.useState<string>('');
  const [selectedMonthFilter, setSelectedMonthFilter] = React.useState<string>('');

  const [historyTarget, setHistoryTarget] = React.useState<{
    entityType: string;
    id: string;
    title: string;
  } | null>(null);

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchFilter) return selectedBranchFilter;
    if (currentBranchId !== 'all') return currentBranchId;
    return '';
  }, [selectedBranchFilter, currentBranchId]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Options Queries
  const { data: branchData } = useBranchesQuery({ limit: 50 });
  const allBranches = React.useMemo(() => branchData?.data ?? [], [branchData?.data]);
  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const { data: academicYears = [] } = useAcademicYearsQuery();
  const { data: academicPeriodsRes } = useAcademicPeriodsQuery({
    academicYearId: selectedAcademicYearFilter || undefined,
    limit: 100,
  });
  const academicPeriods = React.useMemo(
    () => academicPeriodsRes?.data ?? [],
    [academicPeriodsRes?.data],
  );

  // Dynamic Year List
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);
  const yearOptions = React.useMemo(
    () => [currentYear - 2, currentYear - 1, currentYear, currentYear + 1],
    [currentYear],
  );

  // Common Query Filter for KPI counts
  const baseFilters: EnrollmentQueryFilters = React.useMemo(
    () => ({
      branchId: effectiveBranchFilter || undefined,
      academicYearId: selectedAcademicYearFilter || undefined,
      academicPeriodId: selectedAcademicPeriodFilter || undefined,
      year: selectedYearFilter ? Number(selectedYearFilter) : undefined,
      month: selectedMonthFilter ? Number(selectedMonthFilter) : undefined,
      search: debouncedSearch || undefined,
    }),
    [
      effectiveBranchFilter,
      selectedAcademicYearFilter,
      selectedAcademicPeriodFilter,
      selectedYearFilter,
      selectedMonthFilter,
      debouncedSearch,
    ],
  );

  // KPI Metrics Queries (lightweight with limit: 1)
  const { data: totalData } = useEnrollmentsQuery({ ...baseFilters, limit: 1 });
  const { data: continuingData } = useEnrollmentsQuery({
    ...baseFilters,
    statusGroup: 'continuing',
    limit: 1,
  });
  const { data: completedData } = useEnrollmentsQuery({
    ...baseFilters,
    statusGroup: 'completed',
    limit: 1,
  });
  const { data: droppedData } = useEnrollmentsQuery({
    ...baseFilters,
    statusGroup: 'dropped',
    limit: 1,
  });
  const { data: transferredData } = useEnrollmentsQuery({
    ...baseFilters,
    statusGroup: 'transferred',
    limit: 1,
  });

  const totalCount = totalData?.pagination?.total ?? 0;
  const continuingCount = continuingData?.pagination?.total ?? 0;
  const completedCount = completedData?.pagination?.total ?? 0;
  const droppedCount = droppedData?.pagination?.total ?? 0;
  const transferredCount = transferredData?.pagination?.total ?? 0;

  const retentionRate = totalCount > 0 ? Math.round((continuingCount / totalCount) * 100) : 0;

  // Main Table Query
  const {
    data: enrollmentsData,
    isLoading,
    isError,
    error,
  } = useEnrollmentsQuery({
    page,
    limit: 20,
    ...baseFilters,
    statusGroup: selectedStatusGroup !== 'all' ? selectedStatusGroup : undefined,
  });

  const pagination = enrollmentsData?.pagination;
  const enrollments = React.useMemo(() => enrollmentsData?.data ?? [], [enrollmentsData?.data]);

  const historyEvents = React.useMemo(() => {
    return enrollments.map((enr) => ({
      id: enr._id,
      studentDocId: enr.studentId?._id || '',
      studentId: enr.studentId?.studentId || '—',
      studentName:
        `${enr.studentId?.firstName || ''} ${enr.studentId?.lastName || ''}`.trim() || '—',
      khmerName: enr.studentId?.khmerName || '',
      branchName: isKhmer
        ? enr.branchId?.branchNameKh || enr.branchId?.branchNameEn || '—'
        : enr.branchId?.branchNameEn || '—',
      academicYear: enr.academicYearId?.name || '—',
      academicPeriod: enr.academicPeriodId?.name || '',
      program: isKhmer
        ? enr.programId?.programNameKh || enr.programId?.programNameEn || '—'
        : enr.programId?.programNameEn || '—',
      level: isKhmer
        ? enr.levelId?.levelNameKh || enr.levelId?.levelNameEn || '—'
        : enr.levelId?.levelNameEn || '—',
      className: enr.classId?.className || '—',
      status: enr.status,
      tuitionStatus: enr.tuitionStatus,
      recordedAt: enr.createdAt || enr.enrollmentDate,
      remarks:
        enr.remarks ||
        (isKhmer ? 'ការផ្លាស់ប្តូរស្ថានភាពចុះឈ្មោះតាមថ្នាក់' : 'Enrollment progression transition'),
    }));
  }, [enrollments, isKhmer]);

  const handleResetFilters = () => {
    setSelectedBranchFilter('');
    setSelectedAcademicYearFilter('');
    setSelectedAcademicPeriodFilter('');
    setSelectedYearFilter('');
    setSelectedMonthFilter('');
    setSelectedStatusGroup('all');
    setSearch('');
    setDebouncedSearch('');
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    selectedBranchFilter ||
    selectedAcademicYearFilter ||
    selectedAcademicPeriodFilter ||
    selectedYearFilter ||
    selectedMonthFilter ||
    search ||
    selectedStatusGroup !== 'all',
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return {
          tone: 'success' as const,
          label: isKhmer ? 'សកម្ម / កំពុងរៀន' : 'Active / Continuing',
        };
      case 'enrolled':
        return {
          tone: 'warning' as const,
          label: isKhmer ? 'បានចុះឈ្មោះ' : 'Enrolled',
        };
      case 'completed':
        return {
          tone: 'neutral' as const,
          label: isKhmer ? 'រៀនចប់ / បញ្ចប់វគ្គ' : 'Completed',
        };
      case 'promoted':
        return {
          tone: 'success' as const,
          label: isKhmer ? 'ឡើងថ្នាក់' : 'Promoted',
        };
      case 'suspended':
        return {
          tone: 'danger' as const,
          label: isKhmer ? 'ព្យួរការសិក្សា' : 'Suspended',
        };
      case 'dropped':
      case 'withdrawn':
      case 'cancelled':
        return {
          tone: 'danger' as const,
          label: isKhmer ? 'បោះបង់ / ឈប់រៀន' : 'Dropped / Stopped',
        };
      case 'transferred':
        return {
          tone: 'neutral' as const,
          label: isKhmer ? 'ផ្ទេរការសិក្សា' : 'Transferred',
        };
      default:
        return {
          tone: 'neutral' as const,
          label: status,
        };
    }
  };

  return (
    <PermissionGuard
      requiredAnyPermission={['student.view.own_branch', 'student.view.all_branches']}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.studentStatusHistory.title}
              </h1>
              <Badge tone="neutral">
                {isKhmer ? 'ការវិវត្តស្ថានភាពសិស្ស' : 'Student Retention & Progression'}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              {t.studentStatusHistory.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <History className="size-4 text-[#00509d]" />
            <span>
              {isKhmer
                ? 'ទិន្នន័យការវិវត្តតាម Term/វគ្គ & ខែ-ឆ្នាំ'
                : 'Cohort Progression Tracking'}
            </span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Total Enrolled */}
          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('all');
              setPage(1);
            }}
            className={cn(
              'flex flex-col justify-between rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm',
              selectedStatusGroup === 'all'
                ? 'border-[#00509d] ring-1 ring-[#00509d]'
                : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {t.studentStatusHistory.kpiTotal}
              </span>
              <Users className="size-5 shrink-0 text-slate-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
              <p className="mt-0.5 text-xs text-slate-500">
                {isKhmer ? 'សិស្សក្នុងតម្រងបច្ចុប្បន្ន' : 'In current filter'}
              </p>
            </div>
          </button>

          {/* Continuing */}
          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('continuing');
              setPage(1);
            }}
            className={cn(
              'flex flex-col justify-between rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm',
              selectedStatusGroup === 'continuing'
                ? 'border-emerald-600 ring-1 ring-emerald-600'
                : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {t.studentStatusHistory.kpiContinuing}
              </span>
              <UserCheck className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-emerald-700">{continuingCount}</div>
              <p className="mt-0.5 text-xs text-slate-500">
                {isKhmer ? 'សកម្ម / កំពុងរៀនបន្ត' : 'Active / Continuing'}
              </p>
            </div>
          </button>

          {/* Completed */}
          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('completed');
              setPage(1);
            }}
            className={cn(
              'flex flex-col justify-between rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm',
              selectedStatusGroup === 'completed'
                ? 'border-blue-600 ring-1 ring-blue-600'
                : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {t.studentStatusHistory.kpiCompleted}
              </span>
              <GraduationCap className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-[#00509d]">{completedCount}</div>
              <p className="mt-0.5 text-xs text-slate-500">
                {isKhmer ? 'បញ្ចប់វគ្គ / ឡើងថ្នាក់' : 'Graduated / Finished'}
              </p>
            </div>
          </button>

          {/* Dropped / Stopped */}
          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('dropped');
              setPage(1);
            }}
            className={cn(
              'flex flex-col justify-between rounded-xl border bg-white p-4 text-left transition-all hover:shadow-sm',
              selectedStatusGroup === 'dropped'
                ? 'border-rose-600 ring-1 ring-rose-600'
                : 'border-slate-200 hover:border-slate-300',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {t.studentStatusHistory.kpiDropped}
              </span>
              <UserX className="size-5 shrink-0 text-rose-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-rose-700">{droppedCount}</div>
              <p className="mt-0.5 text-xs text-slate-500">
                {isKhmer ? 'ឈប់ / ផ្អាក / ព្យួររៀន' : 'Stopped / Suspended'}
              </p>
            </div>
          </button>

          {/* Retention Rate */}
          <div className="col-span-2 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">
                {t.studentStatusHistory.retentionRate}
              </span>
              <TrendingUp className="size-5 shrink-0 text-amber-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-amber-700">{retentionRate}%</div>
              <p className="mt-0.5 text-xs text-slate-500">
                {isKhmer
                  ? `${continuingCount} នៃ ${totalCount} សិស្ស`
                  : `${continuingCount} of ${totalCount} students`}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('all');
              setPage(1);
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selectedStatusGroup === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            )}
          >
            <span>{t.studentStatusHistory.all}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                selectedStatusGroup === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-200 text-slate-700',
              )}
            >
              {totalCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('continuing');
              setPage(1);
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selectedStatusGroup === 'continuing'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
            )}
          >
            <span>{t.studentStatusHistory.continuing}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                selectedStatusGroup === 'continuing'
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-200 text-emerald-800',
              )}
            >
              {continuingCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('completed');
              setPage(1);
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selectedStatusGroup === 'completed'
                ? 'bg-[#00509d] text-white'
                : 'bg-blue-50 text-[#00509d] hover:bg-blue-100',
            )}
          >
            <span>{t.studentStatusHistory.completed}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                selectedStatusGroup === 'completed'
                  ? 'bg-[#023e8a] text-white'
                  : 'bg-blue-200 text-blue-800',
              )}
            >
              {completedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('dropped');
              setPage(1);
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selectedStatusGroup === 'dropped'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100',
            )}
          >
            <span>{t.studentStatusHistory.dropped}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                selectedStatusGroup === 'dropped'
                  ? 'bg-rose-800 text-white'
                  : 'bg-rose-200 text-rose-800',
              )}
            >
              {droppedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedStatusGroup('transferred');
              setPage(1);
            }}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selectedStatusGroup === 'transferred'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            )}
          >
            <span>{t.studentStatusHistory.transferred}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                selectedStatusGroup === 'transferred'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-200 text-slate-700',
              )}
            >
              {transferredCount}
            </span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col gap-2.5 rounded-xl border border-slate-200 bg-slate-50/50 p-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={
                isKhmer
                  ? 'ស្វែងរកឈ្មោះសិស្ស, អត្តលេខ, ថ្នាក់...'
                  : 'Search student name, ID, class...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 bg-white pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Branch Filter */}
            {(!user || user.branchAccess === 'all' || branches.length > 1) && (
              <Select
                value={selectedBranchFilter}
                onChange={(e) => {
                  setSelectedBranchFilter(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-36 bg-white text-xs"
              >
                <option value="">{t.department.allBranches}</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                  </option>
                ))}
              </Select>
            )}

            {/* Academic Year Filter */}
            <Select
              value={selectedAcademicYearFilter}
              onChange={(e) => {
                setSelectedAcademicYearFilter(e.target.value);
                setSelectedAcademicPeriodFilter('');
                setPage(1);
              }}
              className="h-9 w-36 bg-white text-xs"
            >
              <option value="">{t.studentStatusHistory.allAcademicYears}</option>
              {academicYears.map((ay) => (
                <option key={ay._id} value={ay._id}>
                  {ay.name} {ay.isCurrent ? (isKhmer ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
                </option>
              ))}
            </Select>

            {/* Academic Period / Term Filter */}
            <Select
              value={selectedAcademicPeriodFilter}
              onChange={(e) => {
                setSelectedAcademicPeriodFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 w-40 bg-white text-xs"
            >
              <option value="">{t.studentStatusHistory.allTerms}</option>
              {academicPeriods.map((ap) => (
                <option key={ap._id} value={ap._id}>
                  {ap.name}
                </option>
              ))}
            </Select>

            {/* Year Filter */}
            <Select
              value={selectedYearFilter}
              onChange={(e) => {
                setSelectedYearFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 w-28 bg-white text-xs"
            >
              <option value="">{t.studentStatusHistory.allYears}</option>
              {yearOptions.map((yr) => (
                <option key={yr} value={String(yr)}>
                  {isKhmer ? `ឆ្នាំ ${yr}` : yr}
                </option>
              ))}
            </Select>

            {/* Month Filter */}
            <Select
              value={selectedMonthFilter}
              onChange={(e) => {
                setSelectedMonthFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 w-32 bg-white text-xs"
            >
              <option value="">{t.studentStatusHistory.allMonths}</option>
              {MONTH_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {isKhmer ? m.kh : m.en}
                </option>
              ))}
            </Select>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-9 gap-1.5 px-2.5 text-xs text-slate-600 hover:text-slate-900"
                title={t.studentStatusHistory.resetFilters}
              >
                <RotateCcw className="size-3.5" />
                <span>{t.studentStatusHistory.resetFilters}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          {isLoading ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="size-8 text-rose-500" />
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {isKhmer ? 'មិនអាចទាញយកប្រវត្តិស្ថានភាពបានទេ' : 'Failed to load status history'}
              </p>
              <p className="text-xs text-slate-500">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          ) : historyEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <History className="size-10 text-[#00509d]" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {t.studentStatusHistory.noHistoryFound}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{t.studentStatusHistory.noHistoryDesc}</p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="mt-4 h-8 gap-1.5 text-xs"
                >
                  <RotateCcw className="size-3.5" />
                  <span>{t.studentStatusHistory.resetFilters}</span>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {t.studentStatusHistory.student}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {t.students.campusBranch}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {isKhmer ? 'ឆ្នាំសិក្សា & វគ្គ' : 'Academic Year & Term'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {isKhmer ? 'កម្មវិធី និងថ្នាក់' : 'Program & Class'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {isKhmer ? 'ស្ថានភាពវិវត្ត' : 'Progression Status'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {t.studentStatusHistory.changeDate}
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    {t.studentStatusHistory.reason}
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-600">
                    {isKhmer ? 'សកម្មភាព' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyEvents.map((item) => {
                  const statusInfo = getStatusBadge(item.status);
                  return (
                    <TableRow key={item.id} className="hover:bg-slate-50/50">
                      {/* Student Identity (2-tier stacked) */}
                      <TableCell>
                        <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                          {item.studentName}
                        </div>
                        <div className="text-xs whitespace-nowrap text-slate-500">
                          {item.khmerName ? `${item.khmerName} · ` : ''}
                          <span className="font-mono">{item.studentId}</span>
                        </div>
                      </TableCell>

                      {/* Campus / Branch */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-700">
                          <Building2 className="size-3.5 text-slate-400" />
                          <span>{item.branchName}</span>
                        </div>
                      </TableCell>

                      {/* Academic Year & Period / Term */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-medium whitespace-nowrap text-slate-800">
                          <CalendarRange className="size-3.5 text-slate-400" />
                          <span>{item.academicYear}</span>
                        </div>
                        {item.academicPeriod && (
                          <div className="mt-0.5 inline-block rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-[#00509d]">
                            {item.academicPeriod}
                          </div>
                        )}
                      </TableCell>

                      {/* Program & Class */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap text-slate-800">
                          <GraduationCap className="size-3.5 text-[#00509d]" />
                          <span>{item.className}</span>
                        </div>
                        <div className="text-xs whitespace-nowrap text-slate-500">
                          {item.program} · {item.level}
                        </div>
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>
                        <Badge tone={statusInfo.tone} className="text-xs font-medium">
                          {statusInfo.label}
                        </Badge>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-xs whitespace-nowrap text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" />
                          <span>{new Date(item.recordedAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>

                      {/* Remarks */}
                      <TableCell className="max-w-xs truncate text-xs text-slate-600">
                        {item.remarks}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {item.studentDocId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setHistoryTarget({
                                  entityType: 'Student',
                                  id: item.studentDocId,
                                  title: `${item.studentName} (${item.studentId})`,
                                })
                              }
                              className="h-7 w-7 p-0 text-slate-600 hover:text-[#00509d]"
                              title={
                                isKhmer ? 'មើលប្រវត្តិសវនកម្មសិស្ស' : 'View Student Audit History'
                              }
                            >
                              <History className="size-3.5" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setHistoryTarget({
                                entityType: 'Enrollment',
                                id: item.id,
                                title: `${item.className} - ${item.academicYear}`,
                              })
                            }
                            className="h-7 w-7 p-0 text-slate-600 hover:text-slate-900"
                            title={
                              isKhmer ? 'មើលប្រវត្តិការចុះឈ្មោះ' : 'View Enrollment Audit History'
                            }
                          >
                            <Clock className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-100 p-4 text-xs text-slate-500 sm:flex-row">
              <div>
                {isKhmer ? (
                  <span>
                    បង្ហាញ {(pagination.page - 1) * pagination.limit + 1} ដល់{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} នៃ{' '}
                    {pagination.total} កំណត់ត្រា
                  </span>
                ) : (
                  <span>
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} records
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 text-xs"
                >
                  {t.common.previous}
                </Button>
                <span className="px-2 font-medium">
                  {isKhmer
                    ? `ទំព័រ ${pagination.page} នៃ ${pagination.totalPages}`
                    : `Page ${pagination.page} of ${pagination.totalPages}`}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-8 text-xs"
                >
                  {t.common.next}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Entity Audit History Dialog */}
        <EntityHistoryDialog
          open={Boolean(historyTarget)}
          onOpenChange={(open) => !open && setHistoryTarget(null)}
          entityType={historyTarget?.entityType || 'Student'}
          entityId={historyTarget?.id}
          entityTitle={historyTarget?.title}
        />
      </div>
    </PermissionGuard>
  );
}
