'use client';

import * as React from 'react';
import {
  AlertCircle,
  Activity,
  CalendarRange,
  ChartNoAxesCombined,
  ClipboardCheck,
  ReceiptText,
  Search,
  Trophy,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { formatDateTime } from '@/lib/formatters';
import { toast } from 'sonner';

import { openOfficialPdf } from '../api/report-api';
import { useMonthlyReportOverviewQuery } from '../hooks/use-reports';
import type {
  MonthlyAttendanceCell,
  MonthlyPaymentCell,
  MonthlyRankingCell,
  MonthlyStudentRow,
} from '../types';

const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthsList = [
  { number: 1, code: 'Jan', kh: 'មករា', en: 'January' },
  { number: 2, code: 'Feb', kh: 'កុម្ភៈ', en: 'February' },
  { number: 3, code: 'Mar', kh: 'មីនា', en: 'March' },
  { number: 4, code: 'Apr', kh: 'មេសា', en: 'April' },
  { number: 5, code: 'May', kh: 'ឧសភា', en: 'May' },
  { number: 6, code: 'Jun', kh: 'មិថុនា', en: 'June' },
  { number: 7, code: 'Jul', kh: 'កក្កដា', en: 'July' },
  { number: 8, code: 'Aug', kh: 'សីហា', en: 'August' },
  { number: 9, code: 'Sep', kh: 'កញ្ញា', en: 'September' },
  { number: 10, code: 'Oct', kh: 'តុលា', en: 'October' },
  { number: 11, code: 'Nov', kh: 'វិច្ឆិកា', en: 'November' },
  { number: 12, code: 'Dec', kh: 'ធ្នូ', en: 'December' },
];

type View = 'dashboard' | 'attendance' | 'ranking' | 'growth' | 'payments';

const GrowthRadar = ({
  scores,
  attendance,
}: {
  scores: Array<number | null>;
  attendance: number[];
}) => {
  const center = 150;
  const radius = 112;
  const point = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2;
    const distance = (Math.max(0, Math.min(100, value)) / 100) * radius;
    return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
  };
  const scorePoints = scores.map((value, index) => point(value ?? 0, index)).join(' ');
  const attendancePoints = attendance.map((value, index) => point(value, index)).join(' ');
  return (
    <div className="mx-auto max-w-xl">
      <svg viewBox="0 0 300 300" role="img" aria-label="Twelve-month student growth radar">
        {[25, 50, 75, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(radius * level) / 100}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        ))}
        {monthLabels.map((month, index) => {
          const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const labelX = center + Math.cos(angle) * (radius + 18);
          const labelY = center + Math.sin(angle) * (radius + 18);
          return (
            <g key={month}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#e2e8f0" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-500 text-xs"
              >
                {month}
              </text>
            </g>
          );
        })}
        <polygon points={attendancePoints} fill="#10b98133" stroke="#059669" strokeWidth="2" />
        <polygon points={scorePoints} fill="#7c3aed33" stroke="#7c3aed" strokeWidth="2" />
      </svg>
      <div className="flex justify-center gap-5 text-xs leading-4 text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-violet-600" />
          Score
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-600" />
          Attendance / Engagement
        </span>
      </div>
    </div>
  );
};

const paymentTone: Record<
  MonthlyPaymentCell['status'],
  'neutral' | 'success' | 'warning' | 'danger'
> = {
  paid: 'success',
  partial: 'warning',
  unpaid: 'danger',
  upcoming: 'neutral',
  not_configured: 'neutral',
};

const MetricBars = ({
  values,
  color,
  label,
  formatter = (value) => String(value),
}: {
  values: number[];
  color: string;
  label: string;
  formatter?: (value: number) => string;
}) => {
  const maximum = Math.max(1, ...values);
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-xs text-slate-500">
          {formatter(values.reduce((sum, value) => sum + value, 0))}
        </p>
      </div>
      <div className="grid h-32 grid-cols-12 items-end gap-1" role="img" aria-label={label}>
        {values.map((value, index) => (
          <div
            key={monthLabels[index]}
            className="flex h-full flex-col items-center justify-end gap-1"
          >
            <span className="text-xs text-slate-500">{value > 0 ? formatter(value) : ''}</span>
            <div
              className={cn('w-full min-w-2 rounded-t-sm', color)}
              style={{ height: `${value > 0 ? Math.max(5, (value / maximum) * 84) : 2}%` }}
              title={`${monthLabels[index]}: ${formatter(value)}`}
            />
            <span className="text-xs text-slate-500">{monthLabels[index]?.slice(0, 1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MonthlyManagementOverview = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();
  const copy = isKhmer
    ? {
        title: 'ការគ្រប់គ្រងប្រចាំខែ',
        subtitle: 'តាមដានវត្តមាន លទ្ធផលសិក្សា ការបង់ថ្លៃ និងនិន្នាការសាលា ១២ ខែ',
        dashboard: 'ទិដ្ឋភាពទូទៅ',
        attendance: 'វត្តមាន',
        ranking: 'ចំណាត់ថ្នាក់',
        payments: 'ការបង់ថ្លៃ',
        growth: 'វឌ្ឍនភាពសិស្ស',
        students: 'សិស្ស',
        attendanceRate: 'អត្រាវត្តមាន',
        averageScore: 'ពិន្ទុមធ្យម',
        overdue: 'គណនីហួសកំណត់',
        revenue: 'ចំណូលប្រចាំខែ (USD)',
        admissions: 'សិស្សចូលថ្មី',
        movement: 'ផ្ទេរ និងបោះបង់',
        student: 'សិស្ស',
        present: 'វត្តមាន',
        absent: 'អវត្តមាន',
        late: 'យឺត',
        excused: 'មានច្បាប់',
        scoreRank: 'ពិន្ទុ / ចំណាត់ថ្នាក់',
        noData: 'មិនមានទិន្នន័យសម្រាប់លក្ខខណ្ឌនេះទេ',
        allBranches: 'គ្រប់សាខា',
        allClasses: 'គ្រប់ថ្នាក់',
        allMonths: 'គ្រប់ខែ (១២ ខែ)',
        selectMonth: 'ជ្រើសរើសខែ',
        loading: 'កំពុងរៀបចំរបាយការណ៍ប្រចាំខែ…',
        loadError: 'មិនអាចទាញយករបាយការណ៍ប្រចាំខែបានទេ',
        paid: 'បានបង់',
        partial: 'បង់ខ្លះ',
        unpaid: 'មិនទាន់បង់',
        upcoming: 'មិនទាន់ដល់កំណត់',
        not_configured: 'មិនទាន់កំណត់ថ្លៃ',
        previous: 'ថយក្រោយ',
        next: 'បន្ទាប់',
        page: 'ទំព័រ',
        searchPlaceholder: 'ស្វែងរកសិស្សតាមឈ្មោះ ឬកូដ…',
        printReport: 'បោះពុម្ពរបាយការណ៍',
        rank: 'ចំណាត់ថ្នាក់',
        score: 'ពិន្ទុមធ្យម',
        assessments: 'ចំនួនប្រឡង',
        totalSessions: 'ចំនួនម៉ោង/មេរៀន',
        expected: 'ត្រូវបង់',
        paidAmount: 'បានបង់',
        balance: 'នៅខ្វះ',
        status: 'ស្ថានភាព',
        receipt: 'បង្កាន់ដៃ',
        officialTitle: 'របាយការណ៍គ្រប់គ្រង និងវឌ្ឍនភាពសិស្សប្រចាំខែ',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        teacherSignature: 'គ្រូបន្ទុកថ្នាក់',
        directorSignature: 'នាយកសាខា / គណៈគ្រប់គ្រង',
        dateGenerated: 'កាលបរិច្ឆេទបង្កើត',
        monthlyFocus: 'របាយការណ៍លម្អិតប្រចាំខែ',
        standing: 'លទ្ធផល',
        standingExcellent: 'ឆ្នើម',
        standingGood: 'ល្អ',
        standingPass: 'មធ្យម',
        standingNeedsSupport: 'គួរពង្រឹង',
      }
    : {
        title: 'Monthly management control',
        subtitle: 'Monitor 12 months of attendance, results, tuition, and school trends',
        dashboard: 'Executive overview',
        attendance: 'Attendance',
        ranking: 'Class ranking',
        payments: 'Tuition matrix',
        growth: 'Student growth',
        students: 'Students',
        attendanceRate: 'Attendance rate',
        averageScore: 'Average score',
        overdue: 'Overdue accounts',
        revenue: 'Monthly revenue (USD)',
        admissions: 'New admissions',
        movement: 'Transfers and dropouts',
        student: 'Student',
        present: 'Present',
        absent: 'Absent',
        late: 'Late',
        excused: 'Excused',
        scoreRank: 'Score / rank',
        noData: 'No data is available for this scope.',
        allBranches: 'All accessible branches',
        allClasses: 'All classes',
        allMonths: 'All Months (12 Months)',
        selectMonth: 'Select Month',
        loading: 'Preparing monthly report…',
        loadError: 'Unable to load the monthly report.',
        paid: 'Paid',
        partial: 'Partial',
        unpaid: 'Unpaid',
        upcoming: 'Upcoming',
        not_configured: 'Fee not set',
        previous: 'Previous',
        next: 'Next',
        page: 'Page',
        searchPlaceholder: 'Search student by name or code…',
        printReport: 'Print Report',
        rank: 'Rank',
        score: 'Average Score',
        assessments: 'Assessments',
        totalSessions: 'Total Sessions',
        expected: 'Expected',
        paidAmount: 'Paid',
        balance: 'Balance',
        status: 'Status',
        receipt: 'Receipt',
        officialTitle: 'Monthly Student Progress & Management Report',
        preparedBy: 'Prepared by',
        teacherSignature: 'Class Teacher',
        directorSignature: 'Branch Director / Management',
        dateGenerated: 'Date Generated',
        monthlyFocus: 'Monthly Detailed Breakdown',
        standing: 'Standing',
        standingExcellent: 'Excellent',
        standingGood: 'Good',
        standingPass: 'Pass',
        standingNeedsSupport: 'Needs Support',
      };

  const [view, setView] = React.useState<View>('dashboard');
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  const [searchStudent, setSearchStudent] = React.useState('');
  const [branchId, setBranchId] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [paymentCurrency, setPaymentCurrency] = React.useState<'USD' | 'KHR'>('USD');
  const [growthStudentId, setGrowthStudentId] = React.useState('');
  const [page, setPage] = React.useState(1);

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });
  const { data: classesData } = useClassesQuery({
    branchId: branchId || undefined,
    status: 'active',
    limit: 100,
  });

  const { data, isLoading, isError } = useMonthlyReportOverviewQuery({
    year,
    month: selectedMonth ?? undefined,
    search: searchStudent.trim() || undefined,
    branchId: branchId || undefined,
    classId: classId || undefined,
    paymentCurrency,
    page,
    limit: 100,
  });

  const overview = data?.data;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, index) => currentYear + 1 - index);

  const tabs: Array<{ id: View; label: string; icon: typeof ChartNoAxesCombined }> = [
    { id: 'dashboard', label: copy.dashboard, icon: ChartNoAxesCombined },
    { id: 'attendance', label: copy.attendance, icon: ClipboardCheck },
    { id: 'ranking', label: copy.ranking, icon: Trophy },
    { id: 'growth', label: copy.growth, icon: Activity },
    { id: 'payments', label: copy.payments, icon: ReceiptText },
  ];

  const activeMonthInfo = selectedMonth ? monthsList[selectedMonth - 1] : null;

  const activeBranchName = React.useMemo(() => {
    if (!branchId) return isKhmer ? 'គ្រប់សាខា' : 'All Branches';
    const found = branchesData?.data?.find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : branchId;
  }, [branchId, branchesData?.data, isKhmer, getLocalizedValue]);

  const activeClassName = React.useMemo(() => {
    if (!classId) return isKhmer ? 'គ្រប់ថ្នាក់' : 'All Classes';
    const found = classesData?.data?.find((c) => c._id === classId);
    return found ? found.className : classId;
  }, [classId, classesData?.data, isKhmer]);

  const filterRows = React.useCallback(
    <TCell,>(rows: MonthlyStudentRow<TCell>[]) => {
      const q = searchStudent.trim().toLowerCase();
      if (!q) return rows;
      return rows.filter(
        (r) =>
          r.studentCode.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.khmerName.toLowerCase().includes(q),
      );
    },
    [searchStudent],
  );

  const filteredAttendanceStudents = React.useMemo(
    () => filterRows(overview?.attendance.students ?? []),
    [filterRows, overview?.attendance.students],
  );

  const filteredRankings = React.useMemo(
    () => filterRows(overview?.rankings ?? []),
    [filterRows, overview?.rankings],
  );

  const filteredPayments = React.useMemo(
    () => filterRows(overview?.payments ?? []),
    [filterRows, overview?.payments],
  );

  return (
    <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5 sm:p-6 print:hidden">
        {/* Top Title & Top-Right Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CalendarRange className="size-6 shrink-0 text-[#00509d]" />
            <div>
              <CardTitle className="text-xl font-bold text-slate-950">{copy.title}</CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">{copy.subtitle}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
            <Select
              value={paymentCurrency}
              onChange={(event) => setPaymentCurrency(event.target.value as 'USD' | 'KHR')}
              aria-label="Payment currency"
              className="w-24 rounded-xl text-xs font-semibold"
            >
              <option value="USD">USD ($)</option>
              <option value="KHR">KHR (៛)</option>
            </Select>
          </div>
        </div>

        {/* Dedicated Filter Grid - 3-column clean layout */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              {isKhmer ? 'ឆ្នាំសិក្សា' : 'Academic Year'}
            </label>
            <Select
              value={String(year)}
              onChange={(event) => {
                setYear(Number(event.target.value));
                setPage(1);
              }}
              aria-label="Year"
              className="w-full rounded-xl text-xs font-medium"
            >
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              {isKhmer ? 'សាខា' : 'Branch Scope'}
            </label>
            <Select
              value={branchId}
              onChange={(event) => {
                setBranchId(event.target.value);
                setClassId('');
                setPage(1);
              }}
              aria-label="Branch"
              className="w-full rounded-xl text-xs font-medium"
            >
              <option value="">{copy.allBranches}</option>
              {(branchesData?.data ?? []).map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {getLocalizedValue(branch.branchNameKh, branch.branchNameEn)}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
              {isKhmer ? 'ថ្នាក់រៀន' : 'Class Scope'}
            </label>
            <Select
              value={classId}
              onChange={(event) => {
                setClassId(event.target.value);
                setPage(1);
              }}
              aria-label="Class"
              className="w-full rounded-xl text-xs font-medium"
            >
              <option value="">{copy.allClasses}</option>
              {(classesData?.data ?? []).map((item) => (
                <option key={item._id} value={item._id}>
                  {item.className}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Quick Month Filter Bar - Smooth, No Scrollbar */}
        <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto scroll-smooth py-1">
          <Button
            type="button"
            size="sm"
            variant={selectedMonth === null ? 'default' : 'outline'}
            className={cn(
              'shrink-0 rounded-xl px-3.5 text-xs font-semibold transition-all',
              selectedMonth === null
                ? 'bg-[#023e8a] text-white shadow-xs hover:bg-[#00509d]'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100',
            )}
            onClick={() => {
              setSelectedMonth(null);
              setPage(1);
            }}
          >
            {copy.allMonths}
          </Button>
          {monthsList.map((m) => {
            const isActive = selectedMonth === m.number;
            return (
              <Button
                key={m.number}
                type="button"
                size="sm"
                variant={isActive ? 'default' : 'outline'}
                className={cn(
                  'shrink-0 rounded-xl px-3 text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-[#00509d] text-white shadow-xs hover:bg-[#023e8a]'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100',
                )}
                onClick={() => {
                  setSelectedMonth(m.number);
                  setPage(1);
                }}
              >
                {m.number}. {isKhmer ? m.kh : m.code}
              </Button>
            );
          })}
        </div>

        {/* Search and Tabs Row */}
        <div className="mt-4 flex flex-col gap-3 border-t border-slate-200/80 pt-3.5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="no-scrollbar flex items-center gap-1.5 overflow-x-auto scroll-smooth pb-0.5"
            role="tablist"
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                type="button"
                size="sm"
                variant={view === tab.id ? 'default' : 'outline'}
                className={cn(
                  'shrink-0 rounded-xl px-3.5 text-xs font-semibold transition-all',
                  view === tab.id
                    ? 'bg-[#00509d] text-white shadow-xs hover:bg-[#023e8a]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )}
                role="tab"
                aria-selected={view === tab.id}
                onClick={() => setView(tab.id)}
              >
                <tab.icon className="mr-1.5 size-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </Button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchStudent}
              onChange={(e) => {
                setSearchStudent(e.target.value);
                setPage(1);
              }}
              className="rounded-xl bg-white pr-8 pl-9 text-xs sm:text-sm"
            />
            {searchStudent && (
              <button
                type="button"
                onClick={() => setSearchStudent('')}
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>

      {/* Official Print Letterhead (visible only when printing) */}
      <div className="hidden p-6 print:block">
        <div className="border-b-2 border-[#00509d] pb-4 text-center">
          <h2 className="text-xl font-bold text-[#023e8a]">
            សាលាអន្តរជាតិ អេស អ៊ិន ភី អាយ · SNPI INTERNATIONAL SCHOOL
          </h2>
          <h3 className="mt-1 text-base font-semibold tracking-wide text-slate-800 uppercase">
            {copy.officialTitle}
          </h3>
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-slate-600">
            <span>
              <strong>{copy.allBranches}:</strong> {activeBranchName}
            </span>
            <span>
              <strong>{copy.allClasses}:</strong> {activeClassName}
            </span>
            <span>
              <strong>{copy.selectMonth}:</strong>{' '}
              {activeMonthInfo
                ? `${activeMonthInfo.number}. ${isKhmer ? activeMonthInfo.kh : activeMonthInfo.en} ${year}`
                : `${copy.allMonths} (${year})`}
            </span>
            <span>
              <strong>{copy.dateGenerated}:</strong> {formatDateTime(new Date())}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-5 sm:p-6">
        {isLoading && <p className="py-12 text-center text-sm text-slate-500">{copy.loading}</p>}
        {isError && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-rose-700">
            <AlertCircle className="size-4" /> {copy.loadError}
          </div>
        )}

        {overview && (
          <div className="space-y-6">
            {/* KPI Cards Header */}
            {selectedMonth !== null && overview.selectedMonthSummary ? (
              <div className="rounded-2xl border border-[#00509d]/20 bg-gradient-to-r from-blue-50/70 via-slate-50/50 to-white p-5 shadow-xs">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#00509d] px-2.5 py-1 text-xs font-semibold text-white">
                      {isKhmer
                        ? `${overview.selectedMonthSummary.monthNameKh} ${year}`
                        : `${overview.selectedMonthSummary.monthName} ${year}`}
                    </Badge>
                    <span className="text-xs font-medium text-slate-500">{copy.monthlyFocus}</span>
                  </div>
                  <span className="text-xs text-slate-600">
                    {copy.students}:{' '}
                    <strong className="text-sm font-bold text-slate-900">
                      {overview.selectedMonthSummary.totalStudents}
                    </strong>
                  </span>
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {copy.attendanceRate}
                    </p>
                    <p className="mt-1.5 text-3xl font-bold tracking-tight text-emerald-700">
                      {overview.selectedMonthSummary.attendanceRate}%
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      P: {overview.selectedMonthSummary.presentCount} · A:{' '}
                      {overview.selectedMonthSummary.absentCount} · L:{' '}
                      {overview.selectedMonthSummary.lateCount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {copy.averageScore}
                    </p>
                    <p className="mt-1.5 text-3xl font-bold tracking-tight text-violet-700">
                      {overview.selectedMonthSummary.averageScore > 0
                        ? `${overview.selectedMonthSummary.averageScore}%`
                        : '—'}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{copy.ranking}</p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {paymentCurrency === 'KHR' ? 'ចំណូលប្រចាំខែ (KHR)' : 'Monthly Revenue (USD)'}
                    </p>
                    <p className="mt-1.5 text-3xl font-bold tracking-tight text-[#00509d]">
                      {paymentCurrency === 'KHR'
                        ? `${overview.selectedMonthSummary.totalRevenueKhr.toLocaleString()} ៛`
                        : `$${overview.selectedMonthSummary.totalRevenueUsd.toLocaleString()}`}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {copy.paid}: {overview.selectedMonthSummary.paidCount} · {copy.partial}:{' '}
                      {overview.selectedMonthSummary.partialCount}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {copy.overdue}
                    </p>
                    <p className="mt-1.5 text-3xl font-bold tracking-tight text-rose-700">
                      {overview.selectedMonthSummary.overdueCount}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {copy.unpaid}: {overview.selectedMonthSummary.unpaidCount}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Full Year Overview Cards */
              <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  [copy.students, overview.summary.students, 'text-[#00509d]'],
                  [
                    copy.attendanceRate,
                    `${overview.summary.averageAttendanceRate}%`,
                    'text-emerald-700',
                  ],
                  [
                    copy.averageScore,
                    `${overview.summary.averageAssessmentScore}%`,
                    'text-violet-700',
                  ],
                  [copy.overdue, overview.summary.overdueAccounts, 'text-rose-700'],
                ].map(([label, value, color]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs"
                  >
                    <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      {label}
                    </p>
                    <p className={cn('mt-2 text-3xl font-bold tracking-tight', color)}>{value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* View: Dashboard */}
            {view === 'dashboard' && (
              <div className="space-y-5">
                <div className="grid gap-4 xl:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <MetricBars
                      values={overview.trends.map((item) => item.revenueUsd)}
                      color="bg-[#00509d]"
                      label={copy.revenue}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <MetricBars
                      values={overview.trends.map((item) => item.admissions)}
                      color="bg-emerald-600"
                      label={copy.admissions}
                    />
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4">
                    <MetricBars
                      values={overview.trends.map((item) => item.transfers + item.dropouts)}
                      color="bg-amber-500"
                      label={copy.movement}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <h3 className="text-base leading-6 font-semibold text-slate-900">
                      Cross-Branch Benchmarking
                    </h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Branch</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Pass Rate</TableHead>
                        <TableHead>Average Score</TableHead>
                        <TableHead>Attendance Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(overview.branchBenchmarks ?? []).map((branch) => (
                        <TableRow key={branch.branchId}>
                          <TableCell>
                            <p className="text-sm leading-5 font-semibold">{branch.branchName}</p>
                            <p className="text-xs leading-4 text-slate-500">{branch.branchCode}</p>
                          </TableCell>
                          <TableCell className="text-sm">{branch.students}</TableCell>
                          <TableCell className="text-sm font-semibold text-emerald-700">
                            {branch.passRate}%
                          </TableCell>
                          <TableCell className="text-sm font-semibold text-violet-700">
                            {branch.averageScore}%
                          </TableCell>
                          <TableCell className="text-sm font-semibold text-blue-700">
                            {branch.attendanceRate}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* View: Attendance */}
            {view === 'attendance' &&
              (selectedMonth !== null ? (
                <SingleMonthAttendanceTable
                  rows={filteredAttendanceStudents}
                  month={selectedMonth}
                  copy={copy}
                />
              ) : (
                <MonthlyTable
                  emptyText={copy.noData}
                  studentLabel={copy.student}
                  rows={filteredAttendanceStudents}
                  renderCell={(cell) => (
                    <div className="min-w-20 space-y-1 text-center">
                      <p className="font-semibold text-slate-900">{cell.rate}%</p>
                      <p
                        className="text-xs text-slate-500"
                        title={`${copy.present}: ${cell.present}; ${copy.absent}: ${cell.absent}; ${copy.late}: ${cell.late}; ${copy.excused}: ${cell.excused}`}
                      >
                        P {cell.present} · A {cell.absent} · L {cell.late}
                      </p>
                    </div>
                  )}
                />
              ))}

            {/* View: Ranking */}
            {view === 'ranking' &&
              (selectedMonth !== null ? (
                <SingleMonthRankingTable
                  rows={filteredRankings}
                  month={selectedMonth}
                  copy={copy}
                />
              ) : (
                <MonthlyTable
                  emptyText={copy.noData}
                  studentLabel={copy.student}
                  rows={filteredRankings}
                  renderCell={(cell) => (
                    <div className="min-w-16 text-center">
                      <p className="font-semibold text-slate-900">
                        {cell.average === null ? '—' : `${cell.average}%`}
                      </p>
                      <p className="text-xs text-slate-500">
                        {cell.rank === null ? '' : `#${cell.rank}`}
                      </p>
                    </div>
                  )}
                />
              ))}

            {view === 'growth' && (
              <div className="rounded-lg border border-slate-200 p-5">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg leading-7 font-semibold text-slate-950">
                      Student Individual Growth Radar
                    </h3>
                    <p className="text-xs leading-4 text-slate-500">
                      Monthly academic score and attendance engagement across the selected year.
                    </p>
                  </div>
                  <Select
                    value={growthStudentId}
                    onChange={(event) => setGrowthStudentId(event.target.value)}
                    className="w-full sm:w-72"
                  >
                    <option value="">Select Student</option>
                    {overview.rankings.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.studentCode} - {student.khmerName || student.name}
                      </option>
                    ))}
                  </Select>
                </div>
                {(() => {
                  const selectedId = growthStudentId || overview.rankings[0]?.studentId;
                  const ranking = overview.rankings.find(
                    (student) => student.studentId === selectedId,
                  );
                  const attendance = overview.attendance.students.find(
                    (student) => student.studentId === selectedId,
                  );
                  if (!ranking)
                    return (
                      <p className="py-12 text-center text-sm text-slate-500">{copy.noData}</p>
                    );
                  return (
                    <GrowthRadar
                      scores={ranking.cells.map((cell) => cell.average)}
                      attendance={(attendance?.cells ?? []).map((cell) => cell.rate)}
                    />
                  );
                })()}
              </div>
            )}

            {/* View: Payments */}
            {view === 'payments' &&
              (selectedMonth !== null ? (
                <SingleMonthPaymentsTable
                  rows={filteredPayments}
                  month={selectedMonth}
                  copy={copy}
                />
              ) : (
                <MonthlyTable
                  emptyText={copy.noData}
                  studentLabel={copy.student}
                  rows={filteredPayments}
                  renderCell={(cell) => (
                    <div className="min-w-24 text-center">
                      <Badge tone={paymentTone[cell.status]}>{copy[cell.status]}</Badge>
                      {cell.paid > 0 && (
                        <p className="mt-1 text-xs text-slate-500">
                          {cell.currency === 'KHR'
                            ? `${cell.paid.toLocaleString()} ៛`
                            : `$${cell.paid.toLocaleString()}`}
                        </p>
                      )}
                      {cell.receipts[0] && (
                        <button
                          type="button"
                          className="mt-1 text-xs font-semibold text-[#00509d] underline-offset-2 hover:underline"
                          onClick={() =>
                            void openOfficialPdf(
                              `/reports/receipts/${cell.receipts[0]!.id}/pdf`,
                            ).catch((error: unknown) =>
                              toast.error(
                                error instanceof Error ? error.message : 'Unable to open receipt',
                              ),
                            )
                          }
                          title={cell.receipts.map((receipt) => receipt.number).join(', ')}
                        >
                          {cell.receipts[0].number}
                          {cell.receipts.length > 1 ? ` +${cell.receipts.length - 1}` : ''}
                        </button>
                      )}
                    </div>
                  )}
                />
              ))}

            {/* Pagination Controls */}
            {overview.pagination.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 print:hidden">
                <p className="text-sm text-slate-600">
                  {copy.page} {overview.pagination.page} / {overview.pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  >
                    {copy.previous}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={page >= overview.pagination.totalPages}
                    onClick={() => setPage((value) => value + 1)}
                  >
                    {copy.next}
                  </Button>
                </div>
              </div>
            )}

            {/* Official Report Signatures Block for Printing */}
            <div className="mt-12 hidden pt-8 print:block">
              <div className="grid grid-cols-3 gap-8 text-center text-xs">
                <div>
                  <p className="font-semibold text-slate-900">{copy.preparedBy}</p>
                  <div className="mt-16 border-t border-slate-400 pt-1 text-slate-600">
                    (...........................................)
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{copy.teacherSignature}</p>
                  <div className="mt-16 border-t border-slate-400 pt-1 text-slate-600">
                    (...........................................)
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{copy.directorSignature}</p>
                  <div className="mt-16 border-t border-slate-400 pt-1 text-slate-600">
                    (...........................................)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* Single-Month Attendance Table */
const SingleMonthAttendanceTable = ({
  rows,
  month,
  copy,
}: {
  rows: MonthlyStudentRow<MonthlyAttendanceCell>[];
  month: number;
  copy: Record<string, string>;
}) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200">
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          <TableHead className="w-12 text-center">#</TableHead>
          <TableHead className="min-w-44">{copy.student}</TableHead>
          <TableHead className="text-center">{copy.totalSessions}</TableHead>
          <TableHead className="text-center text-emerald-700">{copy.present}</TableHead>
          <TableHead className="text-center text-rose-700">{copy.absent}</TableHead>
          <TableHead className="text-center text-amber-700">{copy.late}</TableHead>
          <TableHead className="text-center text-blue-700">{copy.excused}</TableHead>
          <TableHead className="text-center font-bold">{copy.attendanceRate}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-12 text-center text-slate-500">
              {copy.noData}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, idx) => {
            const cell = row.cells[month - 1] ?? {
              present: 0,
              absent: 0,
              late: 0,
              excused: 0,
              total: 0,
              rate: 0,
            };
            const rateTone = cell.rate >= 90 ? 'success' : cell.rate >= 75 ? 'warning' : 'danger';
            return (
              <TableRow key={row.studentId}>
                <TableCell className="text-center text-xs text-slate-500">{idx + 1}</TableCell>
                <TableCell>
                  <p className="font-semibold text-slate-900">{row.khmerName || row.name}</p>
                  <p className="text-xs text-slate-500">
                    {row.studentCode}
                    {row.khmerName && row.name && row.khmerName !== row.name
                      ? ` · ${row.name}`
                      : ''}
                  </p>
                </TableCell>
                <TableCell className="text-center font-medium">{cell.total}</TableCell>
                <TableCell className="text-center font-semibold text-emerald-700">
                  {cell.present}
                </TableCell>
                <TableCell className="text-center font-semibold text-rose-700">
                  {cell.absent}
                </TableCell>
                <TableCell className="text-center font-semibold text-amber-700">
                  {cell.late}
                </TableCell>
                <TableCell className="text-center font-semibold text-blue-700">
                  {cell.excused}
                </TableCell>
                <TableCell className="text-center">
                  <Badge tone={rateTone} className="font-bold">
                    {cell.rate}%
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </div>
);

/* Single-Month Ranking Table */
const SingleMonthRankingTable = ({
  rows,
  month,
  copy,
}: {
  rows: MonthlyStudentRow<MonthlyRankingCell>[];
  month: number;
  copy: Record<string, string>;
}) => {
  const sortedRows = React.useMemo(() => {
    return [...rows].sort((a, b) => {
      const rankA = a.cells[month - 1]?.rank ?? 9999;
      const rankB = b.cells[month - 1]?.rank ?? 9999;
      return rankA - rankB;
    });
  }, [rows, month]);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-16 text-center">{copy.rank}</TableHead>
            <TableHead className="min-w-44">{copy.student}</TableHead>
            <TableHead className="text-center">{copy.score}</TableHead>
            <TableHead className="text-center">{copy.assessments}</TableHead>
            <TableHead className="text-center">{copy.standing}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                {copy.noData}
              </TableCell>
            </TableRow>
          ) : (
            sortedRows.map((row) => {
              const cell = row.cells[month - 1] ?? {
                average: null,
                rank: null,
                assessments: 0,
              };
              const avg = cell.average;
              const standingTone: 'success' | 'warning' | 'danger' | 'neutral' =
                avg !== null && avg >= 85
                  ? 'success'
                  : avg !== null && avg >= 70
                    ? 'success'
                    : avg !== null && avg >= 50
                      ? 'warning'
                      : 'danger';
              const rankClass =
                cell.rank === 1
                  ? 'bg-amber-100 text-amber-800 font-bold'
                  : cell.rank === 2
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : cell.rank === 3
                      ? 'bg-amber-50 text-amber-900 font-bold'
                      : 'text-slate-600';

              return (
                <TableRow key={row.studentId}>
                  <TableCell className="text-center">
                    {cell.rank !== null ? (
                      <span
                        className={cn(
                          'inline-flex size-7 items-center justify-center rounded-full text-xs',
                          rankClass,
                        )}
                      >
                        #{cell.rank}
                      </span>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-slate-900">{row.khmerName || row.name}</p>
                    <p className="text-xs text-slate-500">
                      {row.studentCode}
                      {row.khmerName && row.name && row.khmerName !== row.name
                        ? ` · ${row.name}`
                        : ''}
                    </p>
                  </TableCell>
                  <TableCell className="text-center font-bold text-slate-900">
                    {avg !== null ? `${avg}%` : '—'}
                  </TableCell>
                  <TableCell className="text-center text-xs text-slate-500">
                    {cell.assessments}
                  </TableCell>
                  <TableCell className="text-center">
                    {avg !== null ? (
                      <Badge tone={standingTone}>
                        {avg >= 85
                          ? copy.standingExcellent
                          : avg >= 70
                            ? copy.standingGood
                            : avg >= 50
                              ? copy.standingPass
                              : copy.standingNeedsSupport}
                      </Badge>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

/* Single-Month Payments Table */
const SingleMonthPaymentsTable = ({
  rows,
  month,
  copy,
}: {
  rows: MonthlyStudentRow<MonthlyPaymentCell>[];
  month: number;
  copy: Record<string, string>;
}) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200">
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50">
          <TableHead className="w-12 text-center">#</TableHead>
          <TableHead className="min-w-44">{copy.student}</TableHead>
          <TableHead className="text-right">{copy.expected}</TableHead>
          <TableHead className="text-right">{copy.paidAmount}</TableHead>
          <TableHead className="text-right">{copy.balance}</TableHead>
          <TableHead className="text-center">{copy.status}</TableHead>
          <TableHead className="text-center">{copy.receipt}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="py-12 text-center text-slate-500">
              {copy.noData}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, idx) => {
            const cell = row.cells[month - 1] ?? {
              status: 'not_configured',
              expected: 0,
              paid: 0,
              balance: 0,
              currency: 'USD',
              receipts: [],
            };
            const fmt = (val: number) =>
              cell.currency === 'KHR' ? `${val.toLocaleString()} ៛` : `$${val.toLocaleString()}`;

            return (
              <TableRow key={row.studentId}>
                <TableCell className="text-center text-xs text-slate-500">{idx + 1}</TableCell>
                <TableCell>
                  <p className="font-semibold text-slate-900">{row.khmerName || row.name}</p>
                  <p className="text-xs text-slate-500">
                    {row.studentCode}
                    {row.khmerName && row.name && row.khmerName !== row.name
                      ? ` · ${row.name}`
                      : ''}
                  </p>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-700">
                  {fmt(cell.expected)}
                </TableCell>
                <TableCell className="text-right font-semibold text-emerald-700">
                  {fmt(cell.paid)}
                </TableCell>
                <TableCell
                  className={cn(
                    'text-right font-semibold',
                    cell.balance > 0 ? 'text-rose-700' : 'text-slate-500',
                  )}
                >
                  {fmt(cell.balance)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge tone={paymentTone[cell.status]}>{copy[cell.status]}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  {cell.receipts[0] ? (
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#00509d] underline-offset-2 hover:underline"
                      onClick={() =>
                        void openOfficialPdf(`/reports/receipts/${cell.receipts[0]!.id}/pdf`).catch(
                          (error: unknown) =>
                            toast.error(
                              error instanceof Error ? error.message : 'Unable to open receipt',
                            ),
                        )
                      }
                      title={cell.receipts.map((r) => r.number).join(', ')}
                    >
                      {cell.receipts[0].number}
                      {cell.receipts.length > 1 ? ` +${cell.receipts.length - 1}` : ''}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </div>
);

/* Full 12-Month Matrix Cross-Table */
const MonthlyTable = <TCell extends { month: number }>({
  rows,
  renderCell,
  emptyText,
  studentLabel,
}: {
  rows: Array<{
    studentId: string;
    studentCode: string;
    name: string;
    khmerName: string;
    cells: TCell[];
  }>;
  renderCell: (cell: TCell) => React.ReactNode;
  emptyText: string;
  studentLabel: string;
}) => (
  <div className="overflow-x-auto rounded-lg border border-slate-200">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="sticky left-0 z-10 min-w-56 bg-slate-50">{studentLabel}</TableHead>
          {monthLabels.map((month) => (
            <TableHead key={month} className="text-center">
              {month}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={13} className="py-12 text-center text-slate-500">
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={row.studentId}>
              <TableCell className="sticky left-0 z-10 bg-white">
                <p className="font-semibold text-slate-900">{row.khmerName || row.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {row.studentCode}
                  {row.khmerName && row.name && row.khmerName !== row.name ? ` · ${row.name}` : ''}
                </p>
              </TableCell>
              {row.cells.map((cell) => (
                <TableCell key={cell.month}>{renderCell(cell)}</TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
