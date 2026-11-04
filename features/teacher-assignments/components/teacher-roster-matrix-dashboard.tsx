'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  GraduationCap,
  History,
  Printer,
  RefreshCw,
  Search,
  UserCheck,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { EntityHistoryDialog } from '@/features/audit-logs/components/entity-history-dialog';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

import { useTeacherRosterQuery } from '../hooks/use-teacher-roster';
import type { TeacherRosterFacultyItem, TeacherRosterFilters } from '../types';
import { PrintRosterDialog } from './print-roster-dialog';

export const TeacherRosterMatrixDashboard: React.FC = () => {
  const { isKhmer } = useTranslation();
  const { user, currentBranchId } = useAuth();

  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>('');
  const [userSelectedTeacherId, setUserSelectedTeacherId] = React.useState<string | null>(null);
  const [userSelectedClassId, setUserSelectedClassId] = React.useState<string | null>(null);

  // Dialog states
  const [printDialogOpen, setPrintDialogOpen] = React.useState(false);
  const [studentHistoryTarget, setStudentHistoryTarget] = React.useState<{
    id: string;
    title: string;
  } | null>(null);

  const effectiveBranchId = React.useMemo(() => {
    if (selectedBranchId) return selectedBranchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return undefined;
  }, [selectedBranchId, currentBranchId]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: branchesData } = useBranchesQuery({ limit: 50 });
  const allBranches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const queryFilters: TeacherRosterFilters = React.useMemo(() => {
    return {
      branchId: effectiveBranchId,
      search: debouncedSearch || undefined,
    };
  }, [effectiveBranchId, debouncedSearch]);

  const { data, isLoading, isError, refetch } = useTeacherRosterQuery(queryFilters);

  const summary = data?.data?.summary ?? {
    totalTeachers: 0,
    assignedClassesCount: 0,
    unassignedClassesCount: 0,
    totalStudents: 0,
  };

  const facultyList = React.useMemo(() => data?.data?.faculty ?? [], [data?.data?.faculty]);
  const unassignedClasses = React.useMemo(
    () => data?.data?.unassignedClasses ?? [],
    [data?.data?.unassignedClasses],
  );

  const selectedFaculty = React.useMemo(() => {
    if (facultyList.length === 0) return null;
    if (userSelectedTeacherId) {
      const match = facultyList.find((f) => f.teacher._id === userSelectedTeacherId);
      if (match) return match;
    }
    if (user?.employeeId) {
      const match = facultyList.find((f) => f.teacher.employeeId === user.employeeId);
      if (match) return match;
    }
    return facultyList[0] || null;
  }, [facultyList, userSelectedTeacherId, user]);

  const selectedClass = React.useMemo(() => {
    if (!selectedFaculty || selectedFaculty.classes.length === 0) return null;
    if (userSelectedClassId) {
      const match = selectedFaculty.classes.find((c) => c.classId === userSelectedClassId);
      if (match) return match;
    }
    return selectedFaculty.classes[0] || null;
  }, [selectedFaculty, userSelectedClassId]);

  const handleSelectFaculty = (faculty: TeacherRosterFacultyItem) => {
    setUserSelectedTeacherId(faculty.teacher._id);
    setUserSelectedClassId(null);
  };

  const getRoleBadgeTone = (role: string): 'success' | 'warning' | 'neutral' => {
    switch (role) {
      case 'class_teacher':
        return 'success';
      case 'primary_teacher':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const getTuitionBadgeTone = (status?: string): 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'partially_paid':
        return 'warning';
      default:
        return 'danger';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top KPI Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Faculty */}
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'គ្រូបង្រៀនសរុប' : 'Total Active Faculty'}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {isLoading ? <Skeleton className="h-7 w-12" /> : summary.totalTeachers}
                </h3>
              </div>
              <UserCheck className="size-6 shrink-0 text-[#023e8a]" />
            </div>
          </CardContent>
        </Card>

        {/* Assigned Classes */}
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'ថ្នាក់រៀនបានចាត់តាំង' : 'Assigned Classes'}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {isLoading ? <Skeleton className="h-7 w-12" /> : summary.assignedClassesCount}
                </h3>
              </div>
              <CheckCircle2 className="size-6 shrink-0 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        {/* Unassigned Classes Alert */}
        <Card
          className={cn(
            'border-slate-200 bg-white shadow-none',
            summary.unassignedClassesCount > 0 && 'border-amber-300 bg-amber-50/20',
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'ថ្នាក់ទំនេរខ្វះគ្រូ' : 'Unassigned Classes'}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {isLoading ? <Skeleton className="h-7 w-12" /> : summary.unassignedClassesCount}
                </h3>
              </div>
              <AlertTriangle
                className={cn(
                  'size-6 shrink-0',
                  summary.unassignedClassesCount > 0 ? 'text-amber-600' : 'text-slate-400',
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Total Students Under Instruction */}
        <Card className="border-slate-200 bg-white shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'សិស្សកំពុងរៀនសរុប' : 'Students Under Instruction'}
                </p>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {isLoading ? <Skeleton className="h-7 w-12" /> : summary.totalStudents}
                </h3>
              </div>
              <GraduationCap className="size-6 shrink-0 text-[#00509d]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Filters & Actions Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={
                isKhmer
                  ? 'ស្វែងរកតាមឈ្មោះគ្រូ អត្តលេខ ថ្នាក់រៀន ឬមុខវិជ្ជា...'
                  : 'Search teacher, employee ID, class code, or subject...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>

          {branches.length > 1 && (
            <Select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="h-9 w-44 text-xs"
            >
              <option value="">{isKhmer ? 'គ្រប់សាខាទាំងអស់' : 'All Branches'}</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                </option>
              ))}
            </Select>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
          className="h-9 gap-1.5 text-xs text-slate-600 hover:text-slate-900"
        >
          <RefreshCw className={cn('size-3.5', isLoading && 'animate-spin')} />
          <span>{isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}</span>
        </Button>
      </div>

      {/* 3. Unassigned Classes Alert Banner (if any) */}
      {unassignedClasses.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <div className="flex items-center gap-2 text-amber-900">
            <AlertTriangle className="size-4 shrink-0 text-amber-700" />
            <span className="text-xs font-semibold">
              {isKhmer
                ? `មានថ្នាក់រៀនចំនួន ${unassignedClasses.length} ដែលមិនទាន់មានគ្រូបង្រៀនទទួលបន្ទុក៖`
                : `${unassignedClasses.length} active classes currently have no teacher assigned:`}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {unassignedClasses.map((cls) => (
              <span
                key={cls._id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-white px-2.5 py-1 text-xs text-slate-800 shadow-2xs"
              >
                <span className="font-semibold text-slate-900">{cls.className}</span>
                <span className="font-mono text-xs text-slate-500">({cls.classCode})</span>
                {cls.shift && (
                  <span className="text-xs text-slate-400 capitalize">· {cls.shift}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. Master-Detail Split Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="space-y-4 lg:col-span-8">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-8 text-center">
          <p className="text-sm font-semibold text-rose-800">
            {isKhmer
              ? 'មានបញ្ហាក្នុងការទាញយកទិន្នន័យបន្ទុកគ្រូ និងថ្នាក់រៀន'
              : 'Failed to load teacher roster matrix.'}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="mt-3 text-xs">
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </div>
      ) : facultyList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Users className="size-10 text-slate-300" />
          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            {isKhmer ? 'មិនមានទិន្នន័យគ្រូបង្រៀន' : 'No Faculty Records Found'}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {isKhmer
              ? 'មិនមានគ្រូបង្រៀនដែលត្រូវបានចាត់តាំងតាមលក្ខខណ្ឌស្វែងរកនេះទេ។'
              : 'No teachers matched your current filter criteria or branch selection.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Panel: Faculty Selector */}
          <div className="max-h-[750px] space-y-2.5 overflow-y-auto pr-1 lg:col-span-4">
            <div className="flex items-center justify-between px-1 pb-1">
              <span className="text-xs font-semibold tracking-normal text-slate-700 uppercase">
                {isKhmer ? 'បញ្ជីគ្រូបង្រៀន' : 'Faculty List'} ({facultyList.length})
              </span>
            </div>

            {facultyList.map((faculty) => {
              const isSelected = faculty.teacher._id === selectedFaculty?.teacher._id;
              const t = faculty.teacher;
              const displayName =
                isKhmer && t.khmerName
                  ? `${t.khmerName} (${t.firstName} ${t.lastName})`
                  : `${t.firstName} ${t.lastName}${t.khmerName ? ` (${t.khmerName})` : ''}`;

              return (
                <div
                  key={faculty.teacher._id}
                  onClick={() => handleSelectFaculty(faculty)}
                  className={cn(
                    'group cursor-pointer rounded-xl border p-3 transition-all',
                    isSelected
                      ? 'border-[#00509d] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white transition-colors',
                        isSelected ? 'bg-[#00509d]' : 'bg-slate-700 group-hover:bg-slate-800',
                      )}
                    >
                      {t.firstName.charAt(0)}
                      {t.lastName.charAt(0)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="truncate text-xs font-bold text-slate-900">{displayName}</h4>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="font-mono">{t.employeeId}</span>
                        {t.department && (
                          <>
                            <span>·</span>
                            <span className="truncate">{t.department.departmentNameEn}</span>
                          </>
                        )}
                      </div>

                      {/* Class & Student Badges */}
                      <div className="mt-2.5 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                          <BookOpen className="size-3 text-[#00509d]" />
                          {faculty.totalAssignedClasses} {isKhmer ? 'ថ្នាក់' : 'Classes'}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                          <Users className="size-3 text-[#023e8a]" />
                          {faculty.totalStudents} {isKhmer ? 'សិស្ស' : 'Students'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Class & Student Detail Hub */}
          <div className="space-y-4 lg:col-span-8">
            {selectedFaculty ? (
              <>
                {/* Faculty Banner */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-none">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-[#023e8a] text-base font-bold text-white">
                        {selectedFaculty.teacher.firstName.charAt(0)}
                        {selectedFaculty.teacher.lastName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {selectedFaculty.teacher.firstName} {selectedFaculty.teacher.lastName}
                          {selectedFaculty.teacher.khmerName && (
                            <span className="ml-1.5 font-normal text-slate-500">
                              ({selectedFaculty.teacher.khmerName})
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-500">
                          <span className="font-mono">{selectedFaculty.teacher.employeeId}</span>
                          {selectedFaculty.teacher.department && (
                            <>
                              <span className="mx-1.5">·</span>
                              <span>{selectedFaculty.teacher.department.departmentNameEn}</span>
                            </>
                          )}
                          {selectedFaculty.teacher.branch && (
                            <>
                              <span className="mx-1.5">·</span>
                              <span>{selectedFaculty.teacher.branch.branchNameEn}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPrintDialogOpen(true)}
                        disabled={!selectedClass}
                        className="h-8 gap-1.5 text-xs text-slate-700 hover:text-slate-900"
                      >
                        <Printer className="size-3.5" />
                        <span>{isKhmer ? 'បោះពុម្ពបញ្ជីឈ្មោះ' : 'Print Roster'}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Class Tabs */}
                  {selectedFaculty.classes.length > 0 && (
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <span className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
                        {isKhmer ? 'ជ្រើសរើសថ្នាក់រៀន' : 'Assigned Classes'} (
                        {selectedFaculty.classes.length}):
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedFaculty.classes.map((cls) => {
                          const isClassActive = cls.classId === selectedClass?.classId;

                          return (
                            <button
                              key={cls.assignmentId}
                              type="button"
                              onClick={() => setUserSelectedClassId(cls.classId)}
                              className={cn(
                                'flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs transition-all',
                                isClassActive
                                  ? 'border-[#00509d] bg-[#00509d] font-semibold text-white shadow-xs'
                                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100',
                              )}
                            >
                              <span>{cls.className}</span>
                              <span
                                className={cn(
                                  'rounded px-2 py-0.5 text-xs font-medium',
                                  isClassActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-white text-slate-500',
                                )}
                              >
                                {cls.totalStudents} {isKhmer ? 'នាក់' : 'students'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Class Details & Actions */}
                {selectedClass ? (
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none">
                    {/* Class Details Bar */}
                    <div className="border-b border-slate-200 bg-slate-50/70 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              {selectedClass.className}
                            </h4>
                            <span className="font-mono text-xs text-slate-500">
                              ({selectedClass.classCode})
                            </span>
                            <Badge
                              tone={getRoleBadgeTone(selectedClass.roleInClass)}
                              className="text-xs font-medium capitalize"
                            >
                              {selectedClass.roleInClass.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                            {selectedClass.program && <span>{selectedClass.program.nameEn}</span>}
                            {selectedClass.level && (
                              <>
                                <span>·</span>
                                <span>{selectedClass.level.name}</span>
                              </>
                            )}
                            {selectedClass.shift && (
                              <>
                                <span>·</span>
                                <span className="capitalize">{selectedClass.shift}</span>
                              </>
                            )}
                            {selectedClass.classroom && (
                              <>
                                <span>·</span>
                                <span>Room: {selectedClass.classroom.name}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quick Action Shortcuts */}
                        <div className="flex items-center gap-1.5">
                          <Link href={`/attendance?classId=${selectedClass.classId}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 border-emerald-200 text-xs text-emerald-700 hover:bg-emerald-50"
                            >
                              <CalendarCheck className="size-3.5" />
                              <span>{isKhmer ? 'ស្រង់វត្តមាន' : 'Roll Call'}</span>
                            </Button>
                          </Link>

                          <Link href={`/scores?classId=${selectedClass.classId}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 border-blue-200 text-xs text-[#00509d] hover:bg-blue-50"
                            >
                              <FileSpreadsheet className="size-3.5" />
                              <span>{isKhmer ? 'បញ្ចូលពិន្ទុ' : 'Enter Scores'}</span>
                            </Button>
                          </Link>

                          <Link href={`/classes/${selectedClass.classId}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900"
                              title={isKhmer ? 'ព័ត៌មានថ្នាក់រៀនលម្អិត' : 'Class Hub'}
                            >
                              <ExternalLink className="size-3.5" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Student Roster Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-normal text-slate-600 uppercase">
                          <tr>
                            <th className="w-10 px-4 py-2.5 text-center">#</th>
                            <th className="px-4 py-2.5">{isKhmer ? 'អត្តលេខ' : 'Student ID'}</th>
                            <th className="px-4 py-2.5">
                              {isKhmer ? 'ឈ្មោះសិស្ស' : 'Student Name'}
                            </th>
                            <th className="px-4 py-2.5 text-center">
                              {isKhmer ? 'ភេទ' : 'Gender'}
                            </th>
                            <th className="px-4 py-2.5">
                              {isKhmer ? 'អាណាព្យាបាល' : 'Guardian Contact'}
                            </th>
                            <th className="px-4 py-2.5 text-center">
                              {isKhmer ? 'កម្រៃសិក្សា' : 'Tuition'}
                            </th>
                            <th className="px-4 py-2.5 text-center">
                              {isKhmer ? 'វត្តមាន' : 'Attendance'}
                            </th>
                            <th className="px-4 py-2.5 text-right">
                              {isKhmer ? 'សកម្មភាព' : 'Actions'}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedClass.students.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-slate-500">
                                {isKhmer
                                  ? 'មិនទាន់មានសិស្សចុះឈ្មោះក្នុងថ្នាក់នេះនៅឡើយទេ'
                                  : 'No students currently enrolled in this class.'}
                              </td>
                            </tr>
                          ) : (
                            selectedClass.students.map((student, idx) => {
                              const sName =
                                isKhmer && student.khmerName
                                  ? `${student.khmerName} (${student.firstName} ${student.lastName})`
                                  : `${student.firstName} ${student.lastName}${student.khmerName ? ` (${student.khmerName})` : ''}`;

                              return (
                                <tr
                                  key={student.enrollmentId}
                                  className="transition-colors hover:bg-slate-50/60"
                                >
                                  <td className="px-4 py-2.5 text-center font-mono text-xs text-slate-400">
                                    {idx + 1}
                                  </td>
                                  <td className="px-4 py-2.5 font-mono font-medium whitespace-nowrap text-slate-800">
                                    {student.studentCode}
                                  </td>
                                  <td className="px-4 py-2.5 font-semibold text-slate-900">
                                    <Link
                                      href={`/students/${student.studentId}`}
                                      className="hover:text-[#00509d] hover:underline"
                                    >
                                      {sName}
                                    </Link>
                                  </td>
                                  <td className="px-4 py-2.5 text-center text-slate-600 capitalize">
                                    {student.gender === 'male'
                                      ? isKhmer
                                        ? 'ប្រុស'
                                        : 'M'
                                      : isKhmer
                                        ? 'ស្រី'
                                        : 'F'}
                                  </td>
                                  <td className="px-4 py-2.5 text-slate-600">
                                    {student.guardianPhone ? (
                                      <div className="flex flex-col">
                                        <span className="font-medium text-slate-800">
                                          {student.guardianName || '—'}
                                        </span>
                                        <span className="font-mono text-xs text-slate-500">
                                          {student.guardianPhone}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-center">
                                    <Badge
                                      tone={getTuitionBadgeTone(student.tuitionStatus)}
                                      className="text-xs font-medium capitalize"
                                    >
                                      {student.tuitionStatus?.replace('_', ' ') || 'pending'}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-2.5 text-center">
                                    {student.attendanceRate !== undefined ? (
                                      <span
                                        className={cn(
                                          'inline-block rounded px-2 py-0.5 font-mono text-xs font-semibold',
                                          student.attendanceRate >= 80
                                            ? 'bg-emerald-50 text-emerald-800'
                                            : student.attendanceRate >= 60
                                              ? 'bg-amber-50 text-amber-800'
                                              : 'bg-rose-50 text-rose-800',
                                        )}
                                      >
                                        {student.attendanceRate}%
                                      </span>
                                    ) : (
                                      <span className="text-slate-400">—</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          setStudentHistoryTarget({
                                            id: student.studentId,
                                            title: sName,
                                          })
                                        }
                                        className="h-7 w-7 p-0 text-slate-500 hover:text-[#00509d]"
                                        title={
                                          isKhmer ? 'មើលប្រវត្តិសិស្ស' : 'View Student History'
                                        }
                                      >
                                        <History className="size-3.5" />
                                      </Button>
                                      <Link href={`/students/${student.studentId}`}>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-7 w-7 p-0 text-slate-500 hover:text-[#00509d]"
                                          title={
                                            isKhmer ? 'មើលប្រវត្តិរូបសិស្ស' : 'View Student Profile'
                                          }
                                        >
                                          <Eye className="size-3.5" />
                                        </Button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
                    {isKhmer
                      ? 'គ្រូនេះមិនទាន់មានថ្នាក់ដែលបានចាត់តាំងនៅឡើយទេ'
                      : 'This instructor currently has no assigned classes.'}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Print Roster Dialog */}
      <PrintRosterDialog
        open={printDialogOpen}
        onOpenChange={setPrintDialogOpen}
        facultyItem={selectedFaculty}
        classItem={selectedClass}
      />

      {/* Student Audit History Dialog */}
      <EntityHistoryDialog
        open={Boolean(studentHistoryTarget)}
        onOpenChange={(open) => !open && setStudentHistoryTarget(null)}
        entityType="Student"
        entityId={studentHistoryTarget?.id}
        entityTitle={studentHistoryTarget?.title}
      />
    </div>
  );
};
