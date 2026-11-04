'use client';

import * as React from 'react';
import { CalendarCheck, Printer } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { getClassRosterAttendanceApi } from '../api/attendance-api';
import { useAttendanceListQuery, useMarkAttendanceMutation } from '../hooks/use-attendance';
import type { AttendanceStatus } from '../types';

const MONTHS = [
  { value: 1, nameEn: 'January', nameKh: 'មករា' },
  { value: 2, nameEn: 'February', nameKh: 'កុម្ភៈ' },
  { value: 3, nameEn: 'March', nameKh: 'មីនា' },
  { value: 4, nameEn: 'April', nameKh: 'មេសា' },
  { value: 5, nameEn: 'May', nameKh: 'ឧសភា' },
  { value: 6, nameEn: 'June', nameKh: 'មិថុនា' },
  { value: 7, nameEn: 'July', nameKh: 'កក្កដា' },
  { value: 8, nameEn: 'August', nameKh: 'សីហា' },
  { value: 9, nameEn: 'September', nameKh: 'កញ្ញា' },
  { value: 10, nameEn: 'October', nameKh: 'តុលា' },
  { value: 11, nameEn: 'November', nameKh: 'វិច្ឆិកា' },
  { value: 12, nameEn: 'December', nameKh: 'ធ្នូ' },
];

const STATUS_CYCLE: AttendanceStatus[] = [
  'present',
  'late',
  'excused',
  'sick',
  'half_day',
  'absent',
];

const idOf = (value: string | { _id: string } | undefined): string =>
  typeof value === 'object' && value ? value._id : (value ?? '');

export const MonthlyAttendanceMatrix: React.FC = () => {
  const { user, currentBranchId, hasPermission } = useAuth();
  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const canViewAcademicYears =
    hasPermission('academic_year.view.own_branch') ||
    hasPermission('academic_year.view.all_branches');
  const canEditAttendance =
    hasPermission('attendance.create.assigned_class') ||
    hasPermission('attendance.create.own_branch') ||
    hasPermission('attendance.create.all_branches');
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const [selectedBranchId, setSelectedBranchId] = React.useState<string>(
    currentBranchId !== 'all' ? currentBranchId : '',
  );
  const [selectedAcademicYearId, setSelectedAcademicYearId] = React.useState<string>('');
  const [selectedClassId, setSelectedClassId] = React.useState<string>('');
  const [selectedMonth, setSelectedMonth] = React.useState<number>(currentMonth);
  const [selectedYear, setSelectedYear] = React.useState<number>(currentYear);
  const [savingCell, setSavingCell] = React.useState<string | null>(null);
  const [matrixError, setMatrixError] = React.useState<string | null>(null);

  // Load Reference Data
  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 50 }, canViewBranches);
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: yearsData } = useAcademicYearsQuery(undefined, canViewAcademicYears);
  const academicYears = React.useMemo(() => {
    return Array.isArray(yearsData) ? yearsData : [];
  }, [yearsData]);

  const { data: classesData } = useClassesQuery({
    branchId: selectedBranchId || undefined,
    academicYearId: selectedAcademicYearId || undefined,
    limit: 100,
  });
  const classes = React.useMemo(() => classesData?.data ?? [], [classesData?.data]);

  React.useEffect(() => {
    if (!selectedAcademicYearId && academicYears.length > 0) {
      const preferred = academicYears.find((year) => year.isCurrent) ?? academicYears[0];
      setSelectedAcademicYearId(preferred?._id ?? '');
    }
  }, [academicYears, selectedAcademicYearId]);

  // Set default class if available
  React.useEffect(() => {
    if (classes.length > 0 && !classes.some((item) => item._id === selectedClassId)) {
      setSelectedClassId(classes[0]._id);
    } else if (classes.length === 0 && selectedClassId) {
      setSelectedClassId('');
    }
  }, [classes, selectedClassId]);

  // Days in selected month
  const daysInMonth = React.useMemo(() => {
    return new Date(selectedYear, selectedMonth, 0).getDate();
  }, [selectedYear, selectedMonth]);

  const dayColumns = React.useMemo(() => {
    const list: Array<{ day: number; dayOfWeek: number; dayNameKh: string; isWeekend: boolean }> =
      [];
    const khDays = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហ', 'សុក្រ', 'សៅរ៍'];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(selectedYear, selectedMonth - 1, d);
      const dow = dateObj.getDay(); // 0 is Sunday, 6 is Saturday
      list.push({
        day: d,
        dayOfWeek: dow,
        dayNameKh: khDays[dow],
        isWeekend: dow === 0 || dow === 6,
      });
    }
    return list;
  }, [selectedYear, selectedMonth, daysInMonth]);

  // Calculate Start & End Date strings for month query
  const startDateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`;
  const endDateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

  // Query Enrolled Students in this class
  const { data: enrollmentsData, isLoading: isLoadingStudents } = useEnrollmentsQuery(
    {
      classId: selectedClassId || undefined,
      statusGroup: 'continuing',
      limit: 100,
    },
    Boolean(selectedClassId),
  );
  const enrollments = React.useMemo(() => enrollmentsData?.data ?? [], [enrollmentsData?.data]);

  // Query Attendance records in date range
  const { data: attendanceData, isLoading: isLoadingAttendance } = useAttendanceListQuery(
    {
      classId: selectedClassId || undefined,
      startDate: startDateStr,
      endDate: endDateStr,
      limit: 100,
    },
    Boolean(selectedClassId),
  );
  const attendanceList = React.useMemo(() => attendanceData?.data ?? [], [attendanceData?.data]);

  // Matrix Lookup Map: matrixMap[studentId][day] = status
  const matrixMap = React.useMemo(() => {
    const map: Record<string, Record<number, { status: AttendanceStatus; remarks?: string }>> = {};

    for (const att of attendanceList) {
      if (!att.date) continue;
      const dateParts = att.date.split('T')[0].split('-');
      const dayNum = parseInt(dateParts[2], 10);

      for (const rec of att.records || []) {
        const sId = typeof rec.studentId === 'object' ? rec.studentId?._id : rec.studentId;
        if (!sId) continue;
        if (!map[sId]) map[sId] = {};
        map[sId][dayNum] = { status: rec.status, remarks: rec.remarks };
      }
    }
    return map;
  }, [attendanceList]);

  // Aggregate Stats per Student
  const studentStats = React.useMemo(() => {
    const stats: Record<
      string,
      {
        present: number;
        late: number;
        excused: number;
        sick: number;
        halfDay: number;
        absent: number;
        rate: number | null;
      }
    > = {};

    for (const enroll of enrollments) {
      const sId = typeof enroll.studentId === 'object' ? enroll.studentId?._id : enroll.studentId;
      if (!sId) continue;

      const studentDays = matrixMap[sId] || {};
      let present = 0;
      let late = 0;
      let excused = 0;
      let absent = 0;
      let sick = 0;
      let halfDay = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const cell = studentDays[d];
        if (!cell) continue;
        if (cell.status === 'present') present++;
        else if (cell.status === 'late') late++;
        else if (cell.status === 'excused' || cell.status === 'permission') excused++;
        else if (cell.status === 'sick') sick++;
        else if (cell.status === 'half_day') halfDay++;
        else if (cell.status === 'absent') absent++;
      }

      const totalRecorded = present + late + excused + sick + halfDay + absent;
      const rate =
        totalRecorded > 0
          ? Math.round(
              ((present + late * 0.8 + excused + sick + halfDay * 0.5) / totalRecorded) * 100,
            )
          : null;
      stats[sId] = { present, late, excused, sick, halfDay, absent, rate };
    }
    return stats;
  }, [enrollments, matrixMap, daysInMonth]);

  const handlePrint = () => {
    window.print();
  };

  const markMutation = useMarkAttendanceMutation();

  const handleCellClick = async (
    studentId: string,
    day: number,
    currentStatus?: AttendanceStatus,
  ) => {
    if (!canEditAttendance || !selectedClassObj || !user) return;

    const date = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const cellKey = `${studentId}-${date}`;
    const currentIndex = currentStatus ? STATUS_CYCLE.indexOf(currentStatus) : -1;
    const nextStatus = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length] ?? 'present';
    const branchId = idOf(selectedClassObj.branchId);
    const academicYearId = idOf(selectedClassObj.academicYearId);
    const academicPeriodId = idOf(selectedClassObj.academicPeriodId);
    const schoolId = idOf(user.schoolId);

    if (!branchId || !academicYearId || !schoolId) {
      setMatrixError('The selected class is missing its school, branch, or academic-year context.');
      return;
    }

    setSavingCell(cellKey);
    setMatrixError(null);
    try {
      const rosterResponse = await getClassRosterAttendanceApi(selectedClassId, date);
      await markMutation.mutateAsync({
        schoolId,
        branchId,
        academicYearId,
        academicPeriodId: academicPeriodId || undefined,
        classId: selectedClassId,
        date,
        records: rosterResponse.data.roster.map((record) => ({
          studentId: record.studentId,
          status: record.studentId === studentId ? nextStatus : record.status,
          remarks: record.remarks || undefined,
        })),
      });
    } catch (error: unknown) {
      setMatrixError(error instanceof Error ? error.message : 'Unable to update attendance.');
    } finally {
      setSavingCell(null);
    }
  };

  const renderStatusToken = (status?: AttendanceStatus) => {
    if (!status) {
      return <span className="text-slate-300">-</span>;
    }
    switch (status) {
      case 'present':
        return (
          <span className="inline-block rounded bg-emerald-100 px-1 py-0.5 text-xs font-bold text-emerald-800">
            P
          </span>
        );
      case 'late':
        return (
          <span className="inline-block rounded bg-amber-100 px-1 py-0.5 text-xs font-bold text-amber-800">
            L
          </span>
        );
      case 'excused':
      case 'permission':
        return (
          <span className="inline-block rounded bg-blue-100 px-1 py-0.5 text-xs font-bold text-blue-800">
            E
          </span>
        );
      case 'absent':
        return (
          <span className="inline-block rounded bg-rose-100 px-1 py-0.5 text-xs font-bold text-rose-800">
            A
          </span>
        );
      case 'sick':
        return (
          <span className="inline-block rounded bg-violet-100 px-1 py-0.5 text-xs font-bold text-violet-800">
            S
          </span>
        );
      case 'half_day':
        return (
          <span className="inline-block rounded bg-cyan-100 px-1 py-0.5 text-xs font-bold text-cyan-800">
            H
          </span>
        );
      default:
        return <span className="text-slate-300">-</span>;
    }
  };

  const selectedClassObj = classes.find((c) => c._id === selectedClassId);

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <Card className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm print:hidden">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <CalendarCheck className="size-5 text-[#023e8a]" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monthly Class Attendance Matrix
              </h2>
              <p className="text-xs text-slate-500">
                31-day roll-call overview with sticky student freeze columns and attendance rates
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {canViewBranches && (
              <Select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="h-8 w-40 text-xs"
              >
                <option value="">All Campuses</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchNameEn}
                  </option>
                ))}
              </Select>
            )}

            {canViewAcademicYears && (
              <Select
                value={selectedAcademicYearId}
                onChange={(event) => setSelectedAcademicYearId(event.target.value)}
                className="h-8 w-36 text-xs"
              >
                <option value="">All Academic Years</option>
                {academicYears.map((year) => (
                  <option key={year._id} value={year._id}>
                    {year.name}
                  </option>
                ))}
              </Select>
            )}

            <Select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="h-8 w-44 text-xs font-semibold"
            >
              <option value="">Select Class...</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.className} ({c.classCode})
                </option>
              ))}
            </Select>

            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="h-8 w-32 text-xs"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.nameEn} ({m.nameKh})
                </option>
              ))}
            </Select>

            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="h-8 w-24 font-mono text-xs"
            >
              <option value={currentYear - 1}>{currentYear - 1}</option>
              <option value={currentYear}>{currentYear}</option>
              <option value={currentYear + 1}>{currentYear + 1}</option>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 text-xs text-slate-700"
            >
              <Printer className="mr-1.5 size-3.5" />
              Print A4 Matrix
            </Button>
          </div>
        </div>
      </Card>

      {matrixError && (
        <div className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 print:hidden">
          {matrixError}
        </div>
      )}

      {/* Printable Sheet Header */}
      <div className="hidden text-center print:block print:pb-3">
        <h1 className="text-xl font-bold tracking-wider text-slate-900 uppercase">
          Monthly Attendance Registry
        </h1>
        <p className="text-xs text-slate-600">
          Class: {selectedClassObj?.className || 'N/A'} ({selectedClassObj?.classCode || ''}) |
          Month: {MONTHS.find((m) => m.value === selectedMonth)?.nameEn} {selectedYear}
        </p>
      </div>

      {/* Matrix Table with Sticky Columns */}
      <Card className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                {/* Sticky Left Col 1: Index */}
                <th className="sticky left-0 z-20 w-10 border-r border-slate-200 bg-slate-100 p-2 text-center text-xs font-bold">
                  #
                </th>

                {/* Sticky Left Col 2: Student Identity */}
                <th className="sticky left-10 z-20 min-w-[180px] border-r border-slate-200 bg-slate-100 p-2 text-xs font-bold">
                  STUDENT NAME & ID
                </th>

                {/* Sticky Left Col 3: Rate KPI */}
                <th className="sticky left-[220px] z-20 w-16 border-r border-slate-200 bg-slate-100 p-2 text-center text-xs font-bold">
                  ATT %
                </th>

                {/* 1..31 Days Scrollable Header */}
                {dayColumns.map((col) => (
                  <th
                    key={col.day}
                    className={`min-w-[28px] border-r border-slate-200 p-1 text-center text-xs font-semibold ${
                      col.isWeekend
                        ? 'bg-slate-200/70 text-slate-400'
                        : 'bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div>{col.day}</div>
                    <div className="text-xs leading-4 font-normal">{col.dayNameKh}</div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoadingStudents || isLoadingAttendance ? (
                <tr>
                  <td colSpan={daysInMonth + 3} className="h-32 text-center text-xs text-slate-400">
                    Loading student attendance matrix...
                  </td>
                </tr>
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan={daysInMonth + 3} className="h-32 text-center text-xs text-slate-400">
                    No active students enrolled in this class. Select another class above.
                  </td>
                </tr>
              ) : (
                enrollments.map((enroll, idx) => {
                  const student = typeof enroll.studentId === 'object' ? enroll.studentId : null;
                  const sId = student?._id || String(enroll.studentId);
                  const stats = studentStats[sId] || {
                    rate: null,
                    present: 0,
                    late: 0,
                    excused: 0,
                    sick: 0,
                    halfDay: 0,
                    absent: 0,
                  };
                  const studentDays = matrixMap[sId] || {};

                  return (
                    <tr key={enroll._id} className="transition-colors hover:bg-blue-50/30">
                      {/* Sticky Index */}
                      <td className="sticky left-0 z-10 border-r border-slate-200 bg-white p-2 text-center font-mono text-xs text-slate-500">
                        {String(idx + 1).padStart(2, '0')}
                      </td>

                      {/* Sticky Student Identity */}
                      <td className="sticky left-10 z-10 border-r border-slate-200 bg-white p-2">
                        <div className="space-y-0.5">
                          <span className="block text-xs font-bold whitespace-nowrap text-slate-900">
                            {`${student?.firstName || ''} ${student?.lastName || ''}`.trim() ||
                              'Student'}
                          </span>
                          {student?.khmerName && (
                            <span className="block text-xs leading-5 whitespace-nowrap text-slate-600">
                              {student.khmerName}
                            </span>
                          )}
                          <span className="block font-mono text-xs whitespace-nowrap text-slate-500">
                            {student?.studentId || 'N/A'}
                          </span>
                        </div>
                      </td>

                      {/* Sticky Rate KPI */}
                      <td className="sticky left-[220px] z-10 border-r border-slate-200 bg-white p-1 text-center font-mono text-xs font-bold">
                        <span
                          className={`inline-block rounded px-1.5 py-0.5 ${
                            stats.rate === null
                              ? 'bg-slate-100 text-slate-500'
                              : stats.rate >= 90
                                ? 'bg-emerald-50 text-emerald-700'
                                : stats.rate >= 75
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {stats.rate === null ? '—' : `${stats.rate}%`}
                        </span>
                      </td>

                      {/* 1..31 Days Data Cells */}
                      {dayColumns.map((col) => {
                        const cell = studentDays[col.day];

                        return (
                          <td
                            key={col.day}
                            className={`border-r border-slate-100 p-1 text-center font-mono text-xs transition-colors ${
                              col.isWeekend ? 'bg-slate-50 text-slate-400' : ''
                            }`}
                          >
                            <button
                              type="button"
                              disabled={!canEditAttendance || savingCell !== null}
                              onClick={() => handleCellClick(sId, col.day, cell?.status)}
                              aria-label={`Set attendance for ${student?.firstName || 'student'} on day ${col.day}`}
                              title={
                                canEditAttendance ? 'Click to cycle attendance status' : undefined
                              }
                              className="min-h-6 min-w-6 rounded disabled:cursor-default"
                            >
                              {savingCell ===
                              `${sId}-${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(col.day).padStart(2, '0')}`
                                ? '...'
                                : renderStatusToken(cell?.status)}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700">STATUS LEGEND:</span>
            <div className="flex items-center gap-1">
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-800">
                P
              </span>
              <span>Present (វត្តមាន)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-amber-100 px-1.5 py-0.5 font-bold text-amber-800">L</span>
              <span>Late (មកយឺត)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-blue-100 px-1.5 py-0.5 font-bold text-blue-800">E</span>
              <span>Excused / Permission (ច្បាប់)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-rose-100 px-1.5 py-0.5 font-bold text-rose-800">A</span>
              <span>Absent (អវត្តមានឥតច្បាប់)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-violet-100 px-1.5 py-0.5 font-bold text-violet-800">
                S
              </span>
              <span>Sick (ឈឺ)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="rounded bg-cyan-100 px-1.5 py-0.5 font-bold text-cyan-800">H</span>
              <span>Half Day (កន្លះថ្ងៃ)</span>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            Total Enrolled: <span className="font-bold text-slate-800">{enrollments.length}</span>{' '}
            Students
          </div>
        </div>
      </Card>
    </div>
  );
};
