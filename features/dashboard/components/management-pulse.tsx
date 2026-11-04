'use client';

import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Banknote,
  BookOpenCheck,
  CalendarDays,
  ReceiptText,
  UserMinus,
  UserPlus,
} from '@/components/icons';

import { useAcademicContext } from '@/components/providers/academic-context-provider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/features/auth/context/auth-context';
import { useMonthlyReportOverviewQuery } from '@/features/reports/hooks/use-reports';
import { useTranslation } from '@/lib/i18n';

const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const reportPermissions = [
  'report.view.own_branch',
  'report.view.all_branches',
  'report.student.view.own_branch',
  'report.student.view.all_branches',
  'report.academic.view.own_branch',
  'report.academic.view.all_branches',
  'report.finance.view.own_branch',
  'report.finance.view.all_branches',
];

const currency = (value: number, code: 'USD' | 'KHR', locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: code === 'KHR' ? 0 : 2,
  }).format(value);

const HealthBar = ({ value, color }: { value: number; color: string }) => (
  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
    <div
      className={`h-full rounded-full ${color}`}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export const ManagementPulse = () => {
  const { t, language } = useTranslation();
  const { currentBranchId, hasAnyPermission } = useAuth();
  const { selectedAcademicYear, selectedAcademicYearId } = useAcademicContext();
  const canViewReports = hasAnyPermission(reportPermissions);
  const year = selectedAcademicYear?.startDate
    ? new Date(selectedAcademicYear.startDate).getFullYear()
    : new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const locale = language === 'kh' ? 'km-KH' : 'en-US';
  const query = useMonthlyReportOverviewQuery(
    {
      year,
      academicYearId: selectedAcademicYearId ?? undefined,
      branchId: currentBranchId !== 'all' ? currentBranchId : undefined,
      page: 1,
      limit: 1,
    },
    canViewReports,
  );

  if (!canViewReports) return null;
  if (query.isLoading) {
    return (
      <section aria-label={t.dashboard.managementPulse} className="space-y-3">
        <Skeleton className="h-7 w-64" />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </section>
    );
  }

  if (query.isError) {
    return (
      <section aria-label={t.dashboard.managementPulse} className="space-y-3">
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-sm text-rose-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{t.common.error}</p>
              <p className="mt-0.5 text-xs text-rose-600">
                Failed to load management pulse metrics.
              </p>
            </div>
            <button
              onClick={() => query.refetch()}
              className="rounded-md border border-rose-300 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-50"
            >
              {t.common.retry}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const overview = query.data?.data;
  if (!overview) {
    return (
      <section aria-label={t.dashboard.managementPulse} className="space-y-3">
        <Card className="border-slate-200">
          <CardContent className="p-6 text-center text-sm text-slate-500">
            {t.common.noDataFound}
          </CardContent>
        </Card>
      </section>
    );
  }
  const ytd = overview.trends.slice(0, currentMonthIndex + 1);
  const current = overview.trends[currentMonthIndex] ?? overview.trends[0];
  const revenueUsd = ytd.reduce((sum, item) => sum + item.revenueUsd, 0);
  const revenueKhr = ytd.reduce((sum, item) => sum + item.revenueKhr, 0);
  const admissions = ytd.reduce((sum, item) => sum + item.admissions, 0);
  const enrollments = ytd.reduce((sum, item) => sum + item.enrollments, 0);
  const transfers = ytd.reduce((sum, item) => sum + item.transfers, 0);
  const dropouts = ytd.reduce((sum, item) => sum + item.dropouts, 0);
  const currentMonthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date());
  const hasActivity = overview.trends.some(
    (item) =>
      item.revenueUsd > 0 ||
      item.revenueKhr > 0 ||
      item.admissions > 0 ||
      item.enrollments > 0 ||
      item.attendanceRate > 0 ||
      item.transfers > 0 ||
      item.dropouts > 0,
  );

  const metrics = [
    {
      label: t.dashboard.attendanceHealth,
      value: `${overview.summary.averageAttendanceRate}%`,
      detail: t.dashboard.yearToDate,
      icon: Activity,
      iconClass: 'text-emerald-600',
      valueClass: 'text-emerald-700',
      progress: overview.summary.averageAttendanceRate,
      progressClass: 'bg-emerald-600',
    },
    {
      label: t.dashboard.academicPerformance,
      value: `${overview.summary.averageAssessmentScore}%`,
      detail: t.dashboard.yearToDate,
      icon: BookOpenCheck,
      iconClass: 'text-violet-600',
      valueClass: 'text-violet-700',
      progress: overview.summary.averageAssessmentScore,
      progressClass: 'bg-violet-600',
    },
    {
      label: t.dashboard.revenueCollected,
      value: currency(revenueUsd, 'USD', locale),
      detail: `${currency(revenueKhr, 'KHR', locale)} · ${t.dashboard.yearToDate}`,
      icon: Banknote,
      iconClass: 'text-[#00509d]',
      valueClass: 'text-[#023e8a]',
    },
    {
      label: t.dashboard.overdueAccounts,
      value: String(overview.summary.overdueAccounts),
      detail: `${overview.summary.students} ${t.dashboard.enrolledStudents}`,
      icon: ReceiptText,
      iconClass: 'text-rose-600',
      valueClass: 'text-rose-700',
    },
  ];

  return (
    <section aria-labelledby="management-pulse-heading" className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 id="management-pulse-heading" className="text-lg font-semibold text-slate-950">
              {t.dashboard.managementPulse}
            </h2>
            <Badge tone="neutral">{year}</Badge>
          </div>
          <p className="mt-1 max-w-3xl text-sm leading-5 text-slate-500">
            {t.dashboard.managementPulseDesc}
          </p>
        </div>
        <Link
          href="/reports"
          className="inline-flex h-9 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-[#00509d] transition-colors hover:border-[#00509d]/40 hover:bg-blue-50"
        >
          {t.dashboard.openReports}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs leading-4 font-semibold text-slate-500">{metric.label}</p>
                  <p className={`mt-2 text-2xl font-bold ${metric.valueClass}`}>{metric.value}</p>
                </div>
                <metric.icon className={`size-6 shrink-0 ${metric.iconClass}`} />
              </div>
              {metric.progress !== undefined && (
                <HealthBar value={metric.progress} color={metric.progressClass} />
              )}
              <p className="mt-2 text-xs leading-4 text-slate-500">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">{t.dashboard.attendanceTrend}</CardTitle>
                <CardDescription className="mt-1 text-xs">{t.dashboard.yearToDate}</CardDescription>
              </div>
              <Badge tone={overview.summary.averageAttendanceRate >= 80 ? 'success' : 'warning'}>
                {overview.summary.averageAttendanceRate}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div
              className="grid h-44 grid-cols-12 items-end gap-1.5"
              role="img"
              aria-label={t.dashboard.attendanceTrend}
            >
              {overview.trends.map((item, index) => (
                <div
                  key={item.month}
                  className="flex h-full flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-slate-600">
                    {item.attendanceRate > 0 ? `${item.attendanceRate}%` : '—'}
                  </span>
                  <div className="flex h-28 w-full items-end rounded-t bg-slate-100">
                    <div
                      className={`w-full rounded-t ${index === currentMonthIndex ? 'bg-[#00509d]' : 'bg-[#00509d]/55'}`}
                      style={{ height: `${item.attendanceRate > 0 ? item.attendanceRate : 2}%` }}
                      title={`${months[index]}: ${item.attendanceRate}%`}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{months[index]}</span>
                </div>
              ))}
            </div>
            {!hasActivity && (
              <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
                {t.dashboard.noMonthlyData}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="border-b border-slate-100 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base">{t.dashboard.monthlySnapshot}</CardTitle>
                <CardDescription className="mt-1 text-xs">{currentMonthName}</CardDescription>
              </div>
              <CalendarDays className="size-5 text-[#00509d]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1 p-3">
            {[
              {
                label: t.dashboard.usdRevenue,
                value: currency(current?.revenueUsd ?? 0, 'USD', locale),
                icon: Banknote,
                color: 'text-[#00509d]',
              },
              {
                label: t.dashboard.khrRevenue,
                value: currency(current?.revenueKhr ?? 0, 'KHR', locale),
                icon: Banknote,
                color: 'text-[#00509d]',
              },
              {
                label: t.dashboard.newAdmissions,
                value: current?.admissions ?? 0,
                icon: UserPlus,
                color: 'text-emerald-700',
              },
              {
                label: t.dashboard.newEnrollments,
                value: current?.enrollments ?? 0,
                icon: BookOpenCheck,
                color: 'text-violet-700',
              },
              {
                label: t.dashboard.transfers,
                value: current?.transfers ?? 0,
                icon: ArrowRight,
                color: 'text-amber-700',
              },
              {
                label: t.dashboard.dropouts,
                value: current?.dropouts ?? 0,
                icon: UserMinus,
                color: 'text-rose-700',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-lg px-2 py-2.5 hover:bg-slate-50"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <item.icon className={`size-4 shrink-0 ${item.color}`} />
                  <span className="truncate text-sm text-slate-600">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <div className="rounded-lg bg-emerald-50 px-3 py-2">
                <p className="text-xs text-emerald-700">{t.dashboard.newAdmissions}</p>
                <p className="mt-1 text-sm font-bold text-emerald-800">{admissions}</p>
              </div>
              <div className="rounded-lg bg-violet-50 px-3 py-2">
                <p className="text-xs text-violet-700">{t.dashboard.newEnrollments}</p>
                <p className="mt-1 text-sm font-bold text-violet-800">{enrollments}</p>
              </div>
              <div className="rounded-lg bg-amber-50 px-3 py-2">
                <p className="text-xs text-amber-700">{t.dashboard.transfers}</p>
                <p className="mt-1 text-sm font-bold text-amber-800">{transfers}</p>
              </div>
              <div className="rounded-lg bg-rose-50 px-3 py-2">
                <p className="text-xs text-rose-700">{t.dashboard.dropouts}</p>
                <p className="mt-1 text-sm font-bold text-rose-800">{dropouts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
