'use client';

import * as React from 'react';
import {
  AlertCircle,
  CalendarCheck,
  Check,
  CheckCircle2,
  GraduationCap,
  Save,
  Users,
} from '@/components/icons';

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
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';

import { useClassRosterAttendanceQuery, useMarkAttendanceMutation } from '../hooks/use-attendance';
import type { AttendanceStatus, RosterStudentItem } from '../types';
import { getAttendanceClassContext, getReferenceId } from '../utils/class-context';

export const AttendanceSheet = () => {
  const { user, hasPermission, currentBranchId } = useAuth();

  const todayStr = React.useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedDate, setSelectedDate] = React.useState(todayStr);
  const [selectedBranchId, setSelectedBranchId] = React.useState(
    currentBranchId !== 'all' ? currentBranchId : '',
  );
  const [selectedAcademicYearId, setSelectedAcademicYearId] = React.useState('');
  const [selectedClassId, setSelectedClassId] = React.useState('');

  const [overrides, setOverrides] = React.useState<
    Record<string, { status: AttendanceStatus; remarks?: string }>
  >({});
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const canReadBranches = hasPermission('branch.view.own_branch');
  const canReadAcademicYears =
    hasPermission('academic_year.view.own_branch') ||
    hasPermission('academic_year.view.all_branches');
  const schoolId = getReferenceId(user?.schoolId);
  const { data: branchData } = useBranchesQuery(
    { schoolId: schoolId || undefined, limit: 50 },
    canReadBranches,
  );
  const { data: academicYearsData } = useAcademicYearsQuery(undefined, canReadAcademicYears);

  // Teachers obtain filter labels from their authorized classes, without setup API access.
  const effectiveBranchId = selectedBranchId;
  const effectiveAcademicYearId = selectedAcademicYearId;
  const { data: classData } = useClassesQuery({
    branchId: canReadBranches ? effectiveBranchId || undefined : undefined,
    academicYearId: canReadAcademicYears ? effectiveAcademicYearId || undefined : undefined,
    limit: 100,
  });
  const availableClasses = React.useMemo(() => classData?.data ?? [], [classData?.data]);
  const branches = React.useMemo(() => {
    const options = canReadBranches
      ? (branchData?.data ?? [])
      : availableClasses.map((item) => ({
          _id: getReferenceId(item.branchId),
          branchNameEn:
            typeof item.branchId === 'object' && item.branchId
              ? item.branchId.branchNameEn
              : getReferenceId(item.branchId),
        }));
    return [...new Map(options.map((branch) => [branch._id, branch])).values()].filter(
      (branch) => user?.branchAccess === 'all' || user?.branchAccess.includes(branch._id),
    );
  }, [availableClasses, branchData, canReadBranches, user]);
  const academicYears = React.useMemo(() => {
    const options = canReadAcademicYears
      ? (academicYearsData ?? [])
      : availableClasses.map((item) => ({
          _id: getReferenceId(item.academicYearId),
          name:
            typeof item.academicYearId === 'object' && item.academicYearId
              ? item.academicYearId.name
              : getReferenceId(item.academicYearId),
        }));
    return [...new Map(options.map((year) => [year._id, year])).values()];
  }, [availableClasses, academicYearsData, canReadAcademicYears]);
  const classes = React.useMemo(
    () =>
      availableClasses.filter(
        (item) =>
          (!effectiveBranchId || getReferenceId(item.branchId) === effectiveBranchId) &&
          (!effectiveAcademicYearId ||
            getReferenceId(item.academicYearId) === effectiveAcademicYearId),
      ),
    [availableClasses, effectiveBranchId, effectiveAcademicYearId],
  );
  const selectedClassObj = classes.find((item) => item._id === selectedClassId) ?? classes[0];
  const effectiveClassId = selectedClassObj?._id ?? '';
  const attendanceContext = getAttendanceClassContext(user?.schoolId, selectedClassObj);

  const {
    data: rosterData,
    isLoading: isLoadingRoster,
    isError: isRosterError,
    error: rosterError,
  } = useClassRosterAttendanceQuery(effectiveClassId || undefined, selectedDate);

  const baseRoster: RosterStudentItem[] = React.useMemo(
    () => rosterData?.data?.roster ?? [],
    [rosterData?.data?.roster],
  );

  const displayRoster = React.useMemo(() => {
    return baseRoster.map((item) => {
      const override = overrides[item.studentId];
      return {
        ...item,
        status: override ? override.status : item.status,
        remarks: override?.remarks !== undefined ? override.remarks : item.remarks,
      };
    });
  }, [baseRoster, overrides]);

  const markMutation = useMarkAttendanceMutation();

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setOverrides((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
    setSaveSuccess(false);
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setOverrides((prev) => ({
      ...prev,
      [studentId]: {
        status: prev[studentId]?.status ?? 'present',
        remarks,
      },
    }));
    setSaveSuccess(false);
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const newOverrides: Record<string, { status: AttendanceStatus; remarks?: string }> = {};
    displayRoster.forEach((item) => {
      newOverrides[item.studentId] = {
        status,
        remarks: overrides[item.studentId]?.remarks ?? item.remarks,
      };
    });
    setOverrides(newOverrides);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!attendanceContext || !selectedDate || displayRoster.length === 0) return;
    try {
      setSaveError(null);
      await markMutation.mutateAsync({
        ...attendanceContext,
        date: selectedDate,
        records: displayRoster.map((r) => ({
          studentId: r.studentId,
          status: r.status,
          remarks: r.remarks,
        })),
      });
      setOverrides({});
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save attendance';
      setSaveError(msg);
    }
  };

  const counts = React.useMemo(() => {
    const present = displayRoster.filter((r) => r.status === 'present').length;
    const absent = displayRoster.filter((r) => r.status === 'absent').length;
    const late = displayRoster.filter((r) => r.status === 'late').length;
    const excused = displayRoster.filter(
      (r) => r.status === 'excused' || r.status === 'permission',
    ).length;
    return {
      total: displayRoster.length,
      present,
      absent,
      late,
      excused,
      rate: displayRoster.length > 0 ? Math.round((present / displayRoster.length) * 100) : 0,
    };
  }, [displayRoster]);

  const canMark =
    hasPermission('attendance.create.assigned_class') ||
    hasPermission('attendance.edit.assigned_class') ||
    hasPermission('attendance.create.all_branches') ||
    hasPermission('attendance.create.own_branch') ||
    hasPermission('attendance.edit.all_branches') ||
    hasPermission('attendance.edit.own_branch');

  return (
    <div className="space-y-5">
      {/* Filters & Class Selection Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 uppercase">
              Campus Branch
            </label>
            <Select
              value={effectiveBranchId}
              onChange={(e) => {
                setSelectedBranchId(e.target.value);
                setSelectedClassId('');
                setOverrides({});
              }}
              className="h-9 text-xs"
            >
              <option value="">All Accessible Branches</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 uppercase">
              Academic Year
            </label>
            <Select
              value={effectiveAcademicYearId}
              onChange={(e) => {
                setSelectedAcademicYearId(e.target.value);
                setSelectedClassId('');
                setOverrides({});
              }}
              className="h-9 text-xs"
            >
              <option value="">All Academic Years</option>
              {academicYears.map((ay) => (
                <option key={ay._id} value={ay._id}>
                  {ay.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 uppercase">
              Class Roster
            </label>
            <Select
              value={effectiveClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setOverrides({});
              }}
              className="h-9 text-xs"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.className} ({c.classCode})
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 uppercase">
              Roll-Call Date
            </label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setOverrides({});
              }}
              className="h-9 text-xs"
            />
          </div>
        </div>

        {canMark && displayRoster.length > 0 && (
          <div className="flex items-center gap-2 pt-2 sm:pt-4">
            <Button
              onClick={handleSave}
              disabled={
                markMutation.isPending || !attendanceContext || isLoadingRoster || isRosterError
              }
              className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
            >
              <Save className="mr-1.5 size-4" />
              {markMutation.isPending ? 'Saving...' : 'Save Roll-Call'}
            </Button>
          </div>
        )}
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>Attendance roll-call saved successfully for {selectedDate}.</span>
        </div>
      )}

      {saveError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
          <AlertCircle className="size-4 shrink-0 text-red-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Roster & Stats */}
      {effectiveClassId ? (
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-white p-3.5">
              <div className="text-xs font-medium text-slate-500">Enrolled Students</div>
              <div className="mt-1 flex items-baseline gap-1.5 text-xl font-bold text-slate-900">
                <span>{counts.total}</span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5">
              <div className="text-xs font-medium text-emerald-700">Present</div>
              <div className="mt-1 flex items-baseline gap-1.5 text-xl font-bold text-emerald-800">
                <span>{counts.present}</span>
                <span className="text-xs font-medium text-emerald-600">({counts.rate}%)</span>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50/50 p-3.5">
              <div className="text-xs font-medium text-red-700">Absent</div>
              <div className="mt-1 text-xl font-bold text-red-800">{counts.absent}</div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5">
              <div className="text-xs font-medium text-amber-700">Late / Tardy</div>
              <div className="mt-1 text-xl font-bold text-amber-800">{counts.late}</div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5">
              <div className="text-xs font-medium text-blue-700">Excused / Leave</div>
              <div className="mt-1 text-xl font-bold text-blue-800">{counts.excused}</div>
            </div>
          </div>

          {/* Quick Batch Actions */}
          {canMark && displayRoster.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Users className="size-4 text-[#00509d]" />
                <span>
                  {selectedClassObj?.className} · {selectedDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkAll('present')}
                  className="h-7 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Check className="mr-1 size-3" />
                  All Present
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMarkAll('absent')}
                  className="h-7 text-xs text-red-700 hover:bg-red-50 hover:text-red-800"
                >
                  All Absent
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {isLoadingRoster ? (
              <div className="space-y-3 p-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : isRosterError ? (
              <div className="p-8 text-center">
                <AlertCircle className="mx-auto size-8 text-red-500" />
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  Failed to load class roster
                </p>
                <p className="text-xs text-slate-500">
                  {rosterError instanceof Error ? rosterError.message : 'An error occurred'}
                </p>
              </div>
            ) : displayRoster.length === 0 ? (
              <div className="p-12 text-center">
                <GraduationCap className="mx-auto size-10 text-[#00509d]" />
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  No active students enrolled
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  This class does not currently have active student enrollments.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead className="w-12 text-xs">#</TableHead>
                    <TableHead className="text-xs">Student ID</TableHead>
                    <TableHead className="text-xs">Student Name</TableHead>
                    <TableHead className="text-xs">Gender</TableHead>
                    <TableHead className="text-xs">Attendance Status</TableHead>
                    <TableHead className="text-xs">Remarks / Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayRoster.map((student, idx) => (
                    <TableRow key={student.studentId} className="hover:bg-slate-50/50">
                      <TableCell className="text-xs text-slate-400">{idx + 1}</TableCell>
                      <TableCell className="font-mono text-xs font-semibold text-[#00509d]">
                        {student.studentCode}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                          {student.firstName} {student.lastName}
                        </div>
                        {student.khmerName && (
                          <div className="text-xs whitespace-nowrap text-slate-500">
                            {student.khmerName}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 capitalize">
                        {student.gender}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {(
                            [
                              {
                                key: 'present',
                                label: 'P',
                                name: 'Present',
                                activeBg: 'bg-emerald-600 text-white',
                              },
                              {
                                key: 'absent',
                                label: 'A',
                                name: 'Absent',
                                activeBg: 'bg-red-600 text-white',
                              },
                              {
                                key: 'late',
                                label: 'L',
                                name: 'Late',
                                activeBg: 'bg-amber-500 text-white',
                              },
                              {
                                key: 'excused',
                                label: 'E',
                                name: 'Excused',
                                activeBg: 'bg-blue-600 text-white',
                              },
                              {
                                key: 'permission',
                                label: 'PM',
                                name: 'Permission',
                                activeBg: 'bg-purple-600 text-white',
                              },
                            ] as const
                          ).map((statusBtn) => {
                            const isSelected = student.status === statusBtn.key;
                            return (
                              <button
                                key={statusBtn.key}
                                type="button"
                                onClick={() => handleStatusChange(student.studentId, statusBtn.key)}
                                className={`h-7 min-w-[32px] rounded-lg px-2 text-xs font-bold transition-all ${
                                  isSelected
                                    ? `${statusBtn.activeBg} scale-105`
                                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                                title={statusBtn.name}
                              >
                                {statusBtn.label}
                              </button>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="e.g. Doctor appointment, arrived 15 mins late"
                          value={student.remarks || ''}
                          onChange={(e) => handleRemarksChange(student.studentId, e.target.value)}
                          className="h-8 max-w-xs text-xs"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <CalendarCheck className="size-8 text-slate-300" />
          <h3 className="mt-2 text-sm font-semibold text-slate-900">Select a Class</h3>
          <p className="mt-1 text-xs text-slate-500">
            Please choose a campus branch and class from the dropdown above to load the student
            roll-call.
          </p>
        </div>
      )}
    </div>
  );
};
