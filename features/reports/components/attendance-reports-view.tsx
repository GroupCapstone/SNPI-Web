'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, BookOpenCheck, Search, X } from '@/components/icons';

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

import { useMonthlyReportOverviewQuery } from '../hooks/use-reports';
import { ReportNavHeader } from './report-nav-header';

const attendanceMonthList = [
  { number: 1, kh: 'មករា', en: 'January' },
  { number: 2, kh: 'កុម្ភៈ', en: 'February' },
  { number: 3, kh: 'មីនា', en: 'March' },
  { number: 4, kh: 'មេសា', en: 'April' },
  { number: 5, kh: 'ឧសភា', en: 'May' },
  { number: 6, kh: 'មិថុនា', en: 'June' },
  { number: 7, kh: 'កក្កដា', en: 'July' },
  { number: 8, kh: 'សីហា', en: 'August' },
  { number: 9, kh: 'កញ្ញា', en: 'September' },
  { number: 10, kh: 'តុលា', en: 'October' },
  { number: 11, kh: 'វិច្ឆិកា', en: 'November' },
  { number: 12, kh: 'ធ្នូ', en: 'December' },
];

export const AttendanceReportsView = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  const [branchId, setBranchId] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  const copy = isKhmer
    ? {
        title: 'របាយការណ៍វត្តមាន',
        subtitle: 'ស្ថិតិវត្តមាន អត្រាវត្តមានសិស្ស អវត្តមាន យឺត និងបញ្ជីសិស្សអវត្តមានច្រើន',
        allBranches: 'គ្រប់សាខា',
        allClasses: 'គ្រប់ថ្នាក់',
        allMonths: 'គ្រប់ខែ (១២ ខែ)',
        selectMonth: 'ជ្រើសរើសខែ',
        searchPlaceholder: 'ស្វែងរកសិស្សតាមឈ្មោះ ឬកូដ…',
        attendanceRate: 'អត្រាវត្តមានសរុប',
        present: 'វត្តមាន',
        absent: 'អវត្តមាន',
        late: 'យឺត',
        excused: 'មានច្បាប់',
        totalSessions: 'ចំនួនម៉ោង/មេរៀន',
        printReport: 'បោះពុម្ពរបាយការណ៍វត្តមាន',
        studentCode: 'កូដសិស្ស',
        studentName: 'ឈ្មោះសិស្ស',
        status: 'ស្ថានភាព',
        regular: 'ល្អប្រសើរ (≥90%)',
        warning: 'មធ្យម (75-89%)',
        critical: 'គួរកែលម្អ (<75%)',
        lowAttendanceAlert: 'បញ្ជីសិស្សមានអត្រាវត្តមានទាប (< 80%)',
        noData: 'មិនមានទិន្នន័យវត្តមានទេ',
        loading: 'កំពុងទាញយកទិន្នន័យវត្តមាន…',
        officialTitle: 'របាយការណ៍សង្ខេបវត្តមានសិស្សផ្លូវការ',
        dateGenerated: 'កាលបរិច្ឆេទបង្កើត',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        teacherSignature: 'គ្រូបន្ទុកថ្នាក់',
        directorSignature: 'នាយកសាលា / គណៈគ្រប់គ្រង',
      }
    : {
        title: 'Attendance Reports',
        subtitle: 'Attendance rates, session records, absentee rates, and chronic absence tracking',
        allBranches: 'All Branches',
        allClasses: 'All Classes',
        allMonths: 'All Months (12 Months)',
        selectMonth: 'Select Month',
        searchPlaceholder: 'Search student by name or code…',
        attendanceRate: 'Overall Attendance Rate',
        present: 'Present',
        absent: 'Absent',
        late: 'Late',
        excused: 'Excused',
        totalSessions: 'Total Sessions',
        printReport: 'Print Attendance Report',
        studentCode: 'Student ID',
        studentName: 'Student Name',
        status: 'Status',
        regular: 'Regular (≥90%)',
        warning: 'Moderate (75-89%)',
        critical: 'Needs Attention (<75%)',
        lowAttendanceAlert: 'Low Attendance Attention List (< 80%)',
        noData: 'No attendance records found for this scope.',
        loading: 'Loading attendance reports…',
        officialTitle: 'Official Student Attendance & Absences Report',
        dateGenerated: 'Date Generated',
        preparedBy: 'Prepared by',
        teacherSignature: 'Class Teacher',
        directorSignature: 'Principal / Management',
      };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i);

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });
  const { data: classesData } = useClassesQuery({
    branchId: branchId || undefined,
    status: 'active',
    limit: 100,
  });

  const {
    data: reportData,
    isLoading,
    isError,
  } = useMonthlyReportOverviewQuery({
    year,
    month: selectedMonth ?? undefined,
    search: search.trim() || undefined,
    branchId: branchId || undefined,
    classId: classId || undefined,
    page,
    limit: 100,
  });

  const overview = reportData?.data;
  const students = React.useMemo(
    () => overview?.attendance.students ?? [],
    [overview?.attendance.students],
  );

  // Filter students client-side for immediate search responsiveness
  const filteredStudents = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.studentCode.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.khmerName.toLowerCase().includes(q),
    );
  }, [students, search]);

  // Aggregate metrics
  const stats = React.useMemo(() => {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let totalExcused = 0;
    let totalSessions = 0;

    for (const row of filteredStudents) {
      if (selectedMonth !== null) {
        const c = row.cells[selectedMonth - 1];
        if (c) {
          totalPresent += c.present;
          totalAbsent += c.absent;
          totalLate += c.late;
          totalExcused += c.excused;
          totalSessions += c.total;
        }
      } else {
        for (const c of row.cells) {
          totalPresent += c.present;
          totalAbsent += c.absent;
          totalLate += c.late;
          totalExcused += c.excused;
          totalSessions += c.total;
        }
      }
    }
    const rate =
      totalSessions > 0 ? Math.round(((totalPresent + totalLate) / totalSessions) * 1000) / 10 : 0;
    return { rate, totalPresent, totalAbsent, totalLate, totalExcused, totalSessions };
  }, [filteredStudents, selectedMonth]);

  // Students with attendance < 80%
  const lowAttendanceList = React.useMemo(() => {
    return filteredStudents.filter((row) => {
      if (selectedMonth !== null) {
        const c = row.cells[selectedMonth - 1];
        return c && c.total > 0 && c.rate < 80;
      }
      const totalS = row.cells.reduce((s, c) => s + c.total, 0);
      const totalP = row.cells.reduce((s, c) => s + c.present + c.late, 0);
      const overallRate = totalS > 0 ? Math.round((totalP / totalS) * 100) : 100;
      return totalS > 0 && overallRate < 80;
    });
  }, [filteredStudents, selectedMonth]);

  const activeBranchName = React.useMemo(() => {
    if (!branchId) return copy.allBranches;
    const found = branchesData?.data?.find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : branchId;
  }, [branchId, branchesData?.data, copy.allBranches, getLocalizedValue]);

  const activeClassName = React.useMemo(() => {
    if (!classId) return copy.allClasses;
    const found = classesData?.data?.find((c) => c._id === classId);
    return found ? found.className : classId;
  }, [classId, classesData?.data, copy.allClasses]);

  return (
    <div className="space-y-6">
      <ReportNavHeader activeSection="attendance" />

      {/* Official Print Letterhead */}
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
              {selectedMonth ? `${attendanceMonthList[selectedMonth - 1]?.kh} ${year}` : `${year}`}
            </span>
            <span>
              <strong>{copy.attendanceRate}:</strong> {stats.rate}%
            </span>
            <span>
              <strong>{copy.dateGenerated}:</strong> {formatDateTime(new Date())}
            </span>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5 sm:p-6 print:hidden">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <BookOpenCheck className="size-6 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-xl font-bold text-slate-950">{copy.title}</CardTitle>
                <p className="mt-0.5 text-xs text-slate-500">{copy.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Quick Month Selector Bar - Smooth, No Scrollbar */}
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
            {attendanceMonthList.map((m) => {
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
                  {m.number}. {isKhmer ? m.kh : m.en.slice(0, 3)}
                </Button>
              );
            })}
          </div>

          {/* Filter Bar */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                placeholder={copy.searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl bg-white pr-8 pl-9 text-xs"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <Select
              value={String(year)}
              onChange={(e) => {
                setYear(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Filter by year"
              className="rounded-xl bg-white text-xs"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>

            <Select
              value={branchId}
              onChange={(e) => {
                setBranchId(e.target.value);
                setClassId('');
                setPage(1);
              }}
              aria-label="Filter by branch"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allBranches}</option>
              {(branchesData?.data ?? []).map((b) => (
                <option key={b._id} value={b._id}>
                  {getLocalizedValue(b.branchNameKh, b.branchNameEn)}
                </option>
              ))}
            </Select>

            <Select
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by class"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allClasses}</option>
              {(classesData?.data ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.className}
                </option>
              ))}
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {/* KPI Cards */}
          <div className="mb-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.attendanceRate}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-700">
                {stats.rate}%
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {stats.totalSessions} total periods
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.present}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-blue-700">
                {stats.totalPresent}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Verified attendance</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.absent}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-rose-700">
                {stats.totalAbsent}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Unexcused sessions</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.late} / {copy.excused}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-amber-700">
                {stats.totalLate + stats.totalExcused}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Late: {stats.totalLate} · Excused: {stats.totalExcused}
              </p>
            </div>
          </div>

          {isLoading && <p className="py-12 text-center text-sm text-slate-500">{copy.loading}</p>}

          {isError && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-rose-700">
              <AlertCircle className="size-4" /> Error loading attendance report.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="space-y-6">
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>{copy.studentCode}</TableHead>
                      <TableHead className="min-w-44">{copy.studentName}</TableHead>
                      <TableHead className="text-center">{copy.totalSessions}</TableHead>
                      <TableHead className="text-center text-emerald-700">{copy.present}</TableHead>
                      <TableHead className="text-center text-rose-700">{copy.absent}</TableHead>
                      <TableHead className="text-center text-amber-700">{copy.late}</TableHead>
                      <TableHead className="text-center text-blue-700">{copy.excused}</TableHead>
                      <TableHead className="text-center font-bold">{copy.attendanceRate}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="py-12 text-center text-slate-500">
                          {copy.noData}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((row, index) => {
                        const cell =
                          selectedMonth !== null
                            ? (row.cells[selectedMonth - 1] ?? {
                                present: 0,
                                absent: 0,
                                late: 0,
                                excused: 0,
                                total: 0,
                                rate: 0,
                              })
                            : {
                                present: row.cells.reduce((s, c) => s + c.present, 0),
                                absent: row.cells.reduce((s, c) => s + c.absent, 0),
                                late: row.cells.reduce((s, c) => s + c.late, 0),
                                excused: row.cells.reduce((s, c) => s + c.excused, 0),
                                total: row.cells.reduce((s, c) => s + c.total, 0),
                                rate: (() => {
                                  const tot = row.cells.reduce((s, c) => s + c.total, 0);
                                  const p = row.cells.reduce((s, c) => s + c.present + c.late, 0);
                                  return tot > 0 ? Math.round((p / tot) * 100) : 0;
                                })(),
                              };

                        const statusTone: 'success' | 'warning' | 'danger' =
                          cell.rate >= 90 ? 'success' : cell.rate >= 75 ? 'warning' : 'danger';

                        return (
                          <TableRow key={row.studentId}>
                            <TableCell className="text-center text-xs text-slate-500">
                              {index + 1}
                            </TableCell>
                            <TableCell className="font-mono text-xs font-semibold text-slate-800">
                              {row.studentCode}
                            </TableCell>
                            <TableCell>
                              <p className="font-semibold text-slate-900">
                                {row.khmerName || row.name}
                              </p>
                              {row.khmerName && row.name && row.khmerName !== row.name && (
                                <p className="text-xs text-slate-500">{row.name}</p>
                              )}
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
                              <Badge tone={statusTone} className="font-bold">
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

              {/* Low Attendance Alert Box */}
              {lowAttendanceList.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 print:hidden">
                  <div className="flex items-center gap-2 text-amber-900">
                    <AlertTriangle className="size-4 shrink-0 text-amber-700" />
                    <span className="text-xs font-bold">{copy.lowAttendanceAlert}</span>
                    <Badge tone="warning">{lowAttendanceList.length}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lowAttendanceList.map((stu) => (
                      <span
                        key={stu.studentId}
                        className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-white px-2.5 py-1 text-xs text-slate-800 shadow-2xs"
                      >
                        <strong>{stu.studentCode}</strong>
                        <span>{stu.khmerName || stu.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Print Signatures Block */}
          <div className="mt-12 hidden pt-8 print:block">
            <div className="grid grid-cols-2 gap-12 text-center text-xs">
              <div>
                <p className="font-semibold text-slate-900">{copy.preparedBy}</p>
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
        </CardContent>
      </Card>
    </div>
  );
};
