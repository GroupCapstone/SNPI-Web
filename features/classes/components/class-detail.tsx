'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit2,
  Eye,
  GraduationCap,
  MapPin,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Sparkles,
  User,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useAssessmentsQuery } from '@/features/assessments/hooks/use-assessments';
import {
  useAttendanceListQuery,
  useClassRosterAttendanceQuery,
  useMarkAttendanceMutation,
} from '@/features/attendance/hooks/use-attendance';
import type { AttendanceStatus } from '@/features/attendance/types';
import { useAuth } from '@/features/auth/context/auth-context';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { useTeacherAssignmentsQuery } from '@/features/teacher-assignments/hooks/use-teacher-assignments';
import {
  calculateClassTermResults,
  getTermResults,
} from '@/features/term-results/api/term-result-api';
import { useTranslation } from '@/lib/i18n';

import { useClassQuery } from '../hooks/use-classes';
import { ClassDialog } from './class-dialog';
import { QuickEnrollDialog } from './quick-enroll-dialog';

interface ClassDetailProps {
  classId: string;
}

type TabType = 'roster' | 'attendance' | 'tuition' | 'assessments' | 'completion' | 'timetable';

export const ClassDetail = ({ classId }: ClassDetailProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState<TabType>('roster');
  const [rosterSearch, setRosterSearch] = React.useState('');
  const [quickEnrollOpen, setQuickEnrollOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  // Class Core Data
  const {
    data: classResponse,
    isLoading: isLoadingClass,
    isError: isErrorClass,
    refetch: refetchClass,
  } = useClassQuery(classId);
  const cls = classResponse?.data;

  // Enrolled Students Query
  const {
    data: enrollmentsData,
    isLoading: isLoadingEnrollments,
    refetch: refetchEnrollments,
  } = useEnrollmentsQuery({ classId, limit: 100 });
  const enrollments = enrollmentsData?.data ?? [];

  // Attendance State
  const [attendanceDate, setAttendanceDate] = React.useState(
    new Date().toISOString().substring(0, 10),
  );
  const [sessionType, setSessionType] = React.useState<
    'morning' | 'afternoon' | 'evening' | 'hourly'
  >('morning');
  const [attendanceStatuses, setAttendanceStatuses] = React.useState<
    Record<string, { status: AttendanceStatus; remarks?: string }>
  >({});
  const [attendanceFeedback, setAttendanceFeedback] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Query roster for specific attendance date
  const {
    data: rosterAttendanceData,
    isLoading: _isLoadingRosterAttendance,
    refetch: refetchRosterAttendance,
  } = useClassRosterAttendanceQuery(classId, attendanceDate);

  // Sync attendance roster statuses when data loads or changes
  React.useEffect(() => {
    if (rosterAttendanceData?.data?.roster) {
      const initialMap: Record<string, { status: AttendanceStatus; remarks?: string }> = {};
      rosterAttendanceData.data.roster.forEach((s) => {
        initialMap[s.studentId] = {
          status: s.status || 'present',
          remarks: s.remarks || '',
        };
      });
      setAttendanceStatuses(initialMap);
    }
  }, [rosterAttendanceData]);

  const markAttendanceMutation = useMarkAttendanceMutation();

  // Attendance History Query
  const { data: attendanceHistoryData } = useAttendanceListQuery({
    classId,
    limit: 10,
  });
  const attendanceHistory = attendanceHistoryData?.data ?? [];

  // Assessments Query
  const { data: assessmentsData, isLoading: isLoadingAssessments } = useAssessmentsQuery({
    classId,
    limit: 20,
  });
  const assessments = assessmentsData?.data ?? [];

  // Teacher Assignments Query
  const { data: teacherAssignmentsData } = useTeacherAssignmentsQuery({
    classId,
    limit: 20,
  });
  const teacherAssignments = teacherAssignmentsData?.data ?? [];

  // Term Results Query (Course Completion)
  const {
    data: termResultsData,
    isLoading: isLoadingTermResults,
    refetch: refetchTermResults,
  } = useQuery({
    queryKey: ['term-results', classId],
    queryFn: () => getTermResults({ classId, limit: 100 }),
    enabled: activeTab === 'completion',
  });
  const termResults = termResultsData?.data ?? [];

  const [calculatingResults, setCalculatingResults] = React.useState(false);
  const [calcFeedback, setCalcFeedback] = React.useState<string | null>(null);

  const handleCalculateResults = async () => {
    try {
      setCalculatingResults(true);
      setCalcFeedback(null);
      const res = await calculateClassTermResults(classId);
      setCalcFeedback(
        `Successfully calculated results for ${res.data?.calculatedCount ?? 0} students!`,
      );
      void refetchTermResults();
    } catch (err: unknown) {
      setCalcFeedback(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setCalculatingResults(false);
    }
  };

  // Helper values
  const branchName =
    typeof cls?.branchId === 'object' && cls?.branchId !== null ? cls.branchId.branchNameEn : '—';
  const branchId =
    typeof cls?.branchId === 'object' && cls?.branchId !== null
      ? cls.branchId._id
      : String(cls?.branchId || '');

  const schoolId = (cls as unknown as { schoolId?: { _id?: string } | string })?.schoolId;
  const rawSchoolId =
    typeof schoolId === 'object' && schoolId !== null ? schoolId._id || '' : String(schoolId || '');

  const academicYearId =
    typeof cls?.academicYearId === 'object' && cls?.academicYearId !== null
      ? cls.academicYearId._id
      : String(cls?.academicYearId || '');

  const academicYearName =
    typeof cls?.academicYearId === 'object' && cls?.academicYearId !== null
      ? cls.academicYearId.name
      : '—';

  const programName =
    typeof cls?.programId === 'object' && cls?.programId !== null
      ? `${cls.programId.nameEn} (${cls.programId.code})`
      : '—';

  const levelName =
    typeof cls?.levelId === 'object' && cls?.levelId !== null ? cls.levelId.name : '—';

  const classroomName =
    typeof cls?.classroomId === 'object' && cls?.classroomId !== null
      ? `${cls.classroomId.code} · ${cls.classroomId.name}`
      : 'Unassigned';

  const classTeacherName =
    cls?.classTeacherId && typeof cls.classTeacherId === 'object'
      ? `${cls.classTeacherId.firstName} ${cls.classTeacherId.lastName} ${cls.classTeacherId.khmerName ? `(${cls.classTeacherId.khmerName})` : ''}`
      : 'Not assigned';

  const enrolledStudentIds = React.useMemo(() => {
    return enrollments
      .map((enr) => {
        if (typeof enr.studentId === 'object' && enr.studentId !== null) {
          return enr.studentId._id;
        }
        return String(enr.studentId);
      })
      .filter(Boolean);
  }, [enrollments]);

  // Filtered Roster
  const filteredEnrollments = React.useMemo(() => {
    if (!rosterSearch.trim()) return enrollments;
    const q = rosterSearch.toLowerCase().trim();
    return enrollments.filter((enr) => {
      const stu =
        typeof enr.studentId === 'object' && enr.studentId !== null ? enr.studentId : null;
      if (!stu) return false;
      return (
        stu.studentId?.toLowerCase().includes(q) ||
        stu.firstName?.toLowerCase().includes(q) ||
        stu.lastName?.toLowerCase().includes(q) ||
        stu.khmerName?.toLowerCase().includes(q) ||
        stu.phone?.toLowerCase().includes(q)
      );
    });
  }, [enrollments, rosterSearch]);

  // Tuition breakdown
  const tuitionSummary = React.useMemo(() => {
    let paid = 0;
    let partial = 0;
    let pending = 0;
    let waived = 0;
    enrollments.forEach((e) => {
      if (e.tuitionStatus === 'paid') paid++;
      else if (e.tuitionStatus === 'partially_paid') partial++;
      else if (e.tuitionStatus === 'waived') waived++;
      else pending++;
    });
    return { paid, partial, pending, waived, total: enrollments.length };
  }, [enrollments]);

  // Handle Mark All in attendance
  const handleMarkAll = (status: AttendanceStatus) => {
    setAttendanceStatuses((prev) => {
      const next = { ...prev };
      enrollments.forEach((enr) => {
        const sid = typeof enr.studentId === 'object' ? enr.studentId?._id : String(enr.studentId);
        if (sid) {
          next[sid] = {
            status,
            remarks: next[sid]?.remarks || '',
          };
        }
      });
      return next;
    });
  };

  // Submit attendance roll-call
  const handleSaveAttendance = async () => {
    if (!cls) return;
    try {
      setAttendanceFeedback(null);
      const records = enrollments
        .map((enr) => {
          const sid =
            typeof enr.studentId === 'object' && enr.studentId !== null
              ? enr.studentId._id
              : String(enr.studentId);
          if (!sid) return null;
          return {
            studentId: sid,
            status: attendanceStatuses[sid]?.status || 'present',
            remarks: attendanceStatuses[sid]?.remarks?.trim() || undefined,
          };
        })
        .filter(Boolean) as Array<{
        studentId: string;
        status: AttendanceStatus;
        remarks?: string;
      }>;

      if (records.length === 0) {
        setAttendanceFeedback({
          type: 'error',
          message: 'No enrolled students found in this class to record attendance.',
        });
        return;
      }

      await markAttendanceMutation.mutateAsync({
        schoolId: rawSchoolId,
        branchId,
        academicYearId,
        classId: cls._id,
        date: attendanceDate,
        records,
      });

      setAttendanceFeedback({
        type: 'success',
        message: `Attendance record saved successfully for ${records.length} students on ${attendanceDate}!`,
      });
      void refetchRosterAttendance();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save attendance';
      setAttendanceFeedback({ type: 'error', message: msg });
    }
  };

  if (isLoadingClass) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="size-5 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
          <span>Loading class details...</span>
        </div>
      </div>
    );
  }

  if (isErrorClass || !cls) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="text-sm font-semibold text-rose-900">Failed to load class details</p>
        <p className="mt-1 text-xs text-rose-700">
          The requested class record could not be found or you lack permission.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/classes')}>
            <ArrowLeft className="mr-1.5 size-4" /> Back to Classes
          </Button>
          <Button
            size="sm"
            onClick={() => void refetchClass()}
            className="bg-[#023e8a] hover:bg-[#00509d]"
          >
            <RefreshCw className="mr-1.5 size-4" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Navigation (Matching Employee Master) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/classes')}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950">Class Master</h1>
              <Badge tone="neutral">{cls.classCode}</Badge>
              <Badge
                tone={
                  cls.status === 'active'
                    ? 'success'
                    : cls.status === 'planned'
                      ? 'neutral'
                      : cls.status === 'completed'
                        ? 'warning'
                        : 'danger'
                }
              >
                {cls.status}
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">Academic Class · {branchName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="text-xs text-slate-600"
          >
            <Printer className="mr-1.5 size-3.5" />
            Print Roster
          </Button>
          {hasPermission('class.create.own_branch') && (
            <Button
              size="sm"
              onClick={() => setQuickEnrollOpen(true)}
              className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
            >
              <UserPlus className="mr-1.5 size-3.5" />
              Enroll Student
            </Button>
          )}
          {hasPermission('class.edit.own_branch') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditDialogOpen(true)}
              className="text-xs"
            >
              <Edit2 className="mr-1.5 size-3.5" />
              Edit Class
            </Button>
          )}
        </div>
      </div>

      {/* Hero Profile Card (Matching Employee Master Hero Card) */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className="size-16 shrink-0 text-[#00509d]" />

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{cls.className}</h2>
                  <span className="font-mono text-base font-normal text-slate-500">
                    ({cls.classCode})
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5 text-[#00509d]" />
                    <span className="font-semibold text-slate-800">{programName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="size-3.5 text-slate-400" />
                    <span>{levelName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-slate-400" />
                    <span>{branchName}</span>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                    {academicYearName}
                  </span>
                  <span className="rounded-md bg-amber-50 px-2 py-0.5 font-medium text-amber-800 capitalize">
                    {cls.shift === 'morning'
                      ? 'Morning Shift'
                      : cls.shift === 'afternoon'
                        ? 'Afternoon Shift'
                        : cls.shift === 'evening'
                          ? 'Evening Shift'
                          : cls.shift === 'weekend'
                            ? 'Weekend Shift'
                            : `${cls.shift || 'morning'} Shift`}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800">
                    {cls.daysPattern === 'MON_FRI'
                      ? 'Mon - Fri'
                      : cls.daysPattern === 'MON_WED_FRI'
                        ? 'Mon, Wed, Fri'
                        : cls.daysPattern === 'TUE_THU_SAT'
                          ? 'Tue, Thu, Sat'
                          : cls.daysPattern === 'SAT_SUN'
                            ? 'Sat - Sun'
                            : 'Custom Days'}
                  </span>
                  {cls.startTime && cls.endTime && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 font-mono text-xs font-semibold text-[#00509d]">
                      <Clock className="size-3" />
                      <span>
                        {cls.startTime} - {cls.endTime}
                      </span>
                    </span>
                  )}
                  <span className="text-slate-400">·</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {t.classes.classDetail.capacityEnrolled}: {enrollments.length} / {cls.capacity}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">
                    {t.classes.classDetail.facility}: {classroomName}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Box (Matching Employee Master Contact Box) */}
            <div className="flex min-w-[240px] flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50/75 p-4 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <User className="size-3.5 text-[#00509d]" />
                <span className="font-semibold text-slate-800">
                  {t.classes.classDetail.teacher}: {classTeacherName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="size-3.5 text-[#00509d]" />
                <span className="font-medium text-slate-800">
                  {t.classes.classDetail.schedule}: {cls.startTime || '08:00'} -{' '}
                  {cls.endTime || '11:15'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="size-3.5 text-[#00509d]" />
                <span>
                  {t.classes.classDetail.startDate}:{' '}
                  {cls.startDate ? new Date(cls.startDate).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <BookOpen className="size-3.5 text-[#00509d]" />
                <span>
                  {t.classes.classDetail.assessments}: {assessments.length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation (Identical Styling to Employee Master Tabs) */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-2">
        {(
          [
            {
              key: 'roster',
              label: t.classes.classDetail.roster,
              icon: Users,
              count: enrollments.length,
            },
            { key: 'attendance', label: t.classes.classDetail.attendance, icon: UserCheck },
            { key: 'tuition', label: t.classes.classDetail.tuition, icon: DollarSign },
            { key: 'assessments', label: t.classes.classDetail.assessments, icon: BookOpen },
            { key: 'completion', label: t.classes.classDetail.completion, icon: GraduationCap },
            { key: 'timetable', label: t.classes.classDetail.timetable, icon: Calendar },
          ] as {
            key: TabType;
            label: string;
            icon: React.ComponentType<{ className?: string }>;
            count?: number;
          }[]
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#023e8a] font-semibold text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLASS ROSTER (បញ្ជីសិស្សក្នុងថ្នាក់) */}
      {activeTab === 'roster' && (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search student by name, ID, or phone..."
                value={rosterSearch}
                onChange={(e) => setRosterSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => void refetchEnrollments()}
                className="h-9 text-xs"
              >
                <RefreshCw className="mr-1.5 size-3.5" /> Refresh
              </Button>

              {hasPermission('class.create.own_branch') && (
                <Button
                  size="sm"
                  onClick={() => setQuickEnrollOpen(true)}
                  className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
                >
                  <UserPlus className="mr-1.5 size-4" />
                  Add Student to Class
                </Button>
              )}
            </div>
          </div>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Enrolled Students List
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingEnrollments ? (
                <div className="space-y-3 p-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : filteredEnrollments.length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="mx-auto size-12 text-slate-300" />
                  <h3 className="mt-3 text-sm font-semibold text-slate-800">
                    No students currently enrolled
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {rosterSearch
                      ? 'No students match your search filter.'
                      : 'Enroll active students into this class to begin tracking attendance and grades.'}
                  </p>
                  {hasPermission('class.create.own_branch') && (
                    <Button
                      size="sm"
                      onClick={() => setQuickEnrollOpen(true)}
                      className="mt-4 bg-[#023e8a] text-xs hover:bg-[#00509d]"
                    >
                      <Plus className="mr-1.5 size-3.5" />
                      Enroll First Student
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Enrollment Code</TableHead>
                      <TableHead>Tuition</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-20 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnrollments.map((enr, idx) => {
                      const stu =
                        typeof enr.studentId === 'object' && enr.studentId !== null
                          ? enr.studentId
                          : null;

                      if (!stu) return null;

                      return (
                        <TableRow key={enr._id} className="hover:bg-slate-50/50">
                          <TableCell className="text-center font-mono text-xs text-slate-400">
                            {idx + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {stu.photo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={stu.photo}
                                  alt={stu.firstName}
                                  className="size-8 rounded-full border border-slate-200 object-cover"
                                />
                              ) : (
                                <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#00509d]">
                                  {stu.firstName?.charAt(0) || 'S'}
                                </div>
                              )}
                              <div>
                                <Link
                                  href={`/students/${stu._id}`}
                                  className="font-semibold text-slate-900 hover:text-[#00509d] hover:underline"
                                >
                                  {stu.firstName} {stu.lastName}
                                </Link>
                                <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-500">
                                  {stu.khmerName && <span>{stu.khmerName}</span>}
                                  {stu.khmerName && stu.studentId && (
                                    <span className="text-slate-300">·</span>
                                  )}
                                  {stu.studentId && (
                                    <span className="font-mono text-slate-400">
                                      {stu.studentId}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-slate-700 capitalize">
                            {stu.gender}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {stu.phone || '—'}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-slate-700">
                            {enr.enrollmentCode}
                          </TableCell>
                          <TableCell>
                            <Badge
                              tone={
                                enr.tuitionStatus === 'paid'
                                  ? 'success'
                                  : enr.tuitionStatus === 'partially_paid'
                                    ? 'warning'
                                    : enr.tuitionStatus === 'waived'
                                      ? 'neutral'
                                      : 'danger'
                              }
                            >
                              {enr.tuitionStatus.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              tone={
                                enr.status === 'active' || enr.status === 'enrolled'
                                  ? 'success'
                                  : enr.status === 'completed'
                                    ? 'neutral'
                                    : 'danger'
                              }
                            >
                              {enr.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/students/${stu._id}`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 text-slate-500 hover:text-[#00509d]"
                                title="View Student Profile"
                              >
                                <Eye className="size-3.5" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 2: DAILY ATTENDANCE (វត្តមានប្រចាំថ្ងៃ) */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">
                    Class Attendance Roll-Call
                  </CardTitle>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Record daily attendance for students enrolled in {cls.className}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('present')}
                    className="h-8 text-xs text-emerald-700 hover:bg-emerald-50"
                  >
                    <CheckCircle2 className="mr-1 size-3.5 text-emerald-600" />
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('absent')}
                    className="h-8 text-xs text-rose-700 hover:bg-rose-50"
                  >
                    <XCircle className="mr-1 size-3.5 text-rose-600" />
                    Mark All Absent
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Attendance Date
                  </label>
                  <Input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                    className="h-9 w-44 text-xs"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Session Type
                  </label>
                  <Select
                    value={sessionType}
                    onChange={(e) => setSessionType(e.target.value as typeof sessionType)}
                    className="h-9 w-36 text-xs"
                  >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                    <option value="hourly">Hourly</option>
                  </Select>
                </div>
              </div>

              {attendanceFeedback && (
                <div
                  className={`flex items-center gap-2 rounded-xl p-3 text-xs ${
                    attendanceFeedback.type === 'success'
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                      : 'border border-rose-200 bg-rose-50 text-rose-800'
                  }`}
                >
                  {attendanceFeedback.type === 'success' ? (
                    <CheckCircle2 className="size-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="size-4 text-rose-600" />
                  )}
                  <span>{attendanceFeedback.message}</span>
                </div>
              )}

              {/* Attendance Table */}
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll-Call Status</TableHead>
                      <TableHead>Remarks / Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="p-8 text-center text-xs text-slate-500">
                          No enrolled students found in this class. Enroll students first to take
                          attendance.
                        </TableCell>
                      </TableRow>
                    ) : (
                      enrollments.map((enr, idx) => {
                        const stu =
                          typeof enr.studentId === 'object' && enr.studentId !== null
                            ? enr.studentId
                            : null;
                        if (!stu) return null;

                        const currentRecord = attendanceStatuses[stu._id] || { status: 'present' };

                        return (
                          <TableRow key={enr._id}>
                            <TableCell className="text-center font-mono text-xs text-slate-400">
                              {idx + 1}
                            </TableCell>
                            <TableCell>
                              <div className="text-xs font-semibold text-slate-900">
                                {stu.firstName} {stu.lastName}
                              </div>
                              <div className="font-mono text-xs text-slate-500">
                                {stu.studentId}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {(
                                  [
                                    { value: 'present', label: 'Present (វត្តមាន)' },
                                    { value: 'late', label: 'Late (យឺត)' },
                                    { value: 'excused', label: 'Excused (ច្បាប់)' },
                                    { value: 'permission', label: 'Permission (សុំច្បាប់)' },
                                    { value: 'absent', label: 'Absent (អវត្តមាន)' },
                                  ] as const
                                ).map((st) => {
                                  const isSelected = currentRecord.status === st.value;
                                  return (
                                    <button
                                      key={st.value}
                                      type="button"
                                      onClick={() => {
                                        setAttendanceStatuses((prev) => ({
                                          ...prev,
                                          [stu._id]: {
                                            status: st.value,
                                            remarks: prev[stu._id]?.remarks || '',
                                          },
                                        }));
                                      }}
                                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                                        isSelected
                                          ? st.value === 'present'
                                            ? 'bg-emerald-600 font-semibold text-white'
                                            : st.value === 'late'
                                              ? 'bg-amber-500 font-semibold text-white'
                                              : st.value === 'excused'
                                                ? 'bg-blue-600 font-semibold text-white'
                                                : st.value === 'permission'
                                                  ? 'bg-purple-600 font-semibold text-white'
                                                  : 'bg-rose-600 font-semibold text-white'
                                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                      }`}
                                    >
                                      {st.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Optional note..."
                                value={currentRecord.remarks || ''}
                                onChange={(e) => {
                                  const text = e.target.value;
                                  setAttendanceStatuses((prev) => ({
                                    ...prev,
                                    [stu._id]: {
                                      status: prev[stu._id]?.status || 'present',
                                      remarks: text,
                                    },
                                  }));
                                }}
                                className="h-8 text-xs"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveAttendance}
                  disabled={markAttendanceMutation.isPending || enrollments.length === 0}
                  className="bg-[#023e8a] hover:bg-[#00509d]"
                >
                  <UserCheck className="mr-1.5 size-4" />
                  {markAttendanceMutation.isPending ? 'Saving Record...' : 'Save Daily Attendance'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Attendance Sessions */}
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Recent Attendance Sessions for this Class
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {attendanceHistory.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No previous attendance records found for this class.
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Students</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Recorded At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceHistory.map((att) => {
                      const presentCount = att.records.filter((r) => r.status === 'present').length;
                      const absentCount = att.records.filter((r) => r.status === 'absent').length;
                      return (
                        <TableRow key={att._id}>
                          <TableCell className="text-xs font-semibold text-slate-900">
                            {new Date(att.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {att.records.length} students
                          </TableCell>
                          <TableCell className="text-xs font-semibold text-emerald-600">
                            {presentCount}
                          </TableCell>
                          <TableCell className="text-xs font-semibold text-rose-600">
                            {absentCount}
                          </TableCell>
                          <TableCell className="text-xs text-slate-400">
                            {new Date(att.createdAt).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 3: TUITION & FEES (ថ្លៃសិក្សា & ការបង់ប្រាក់) */}
      {activeTab === 'tuition' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
              <span className="text-xs font-semibold text-emerald-900">Fully Paid</span>
              <div className="mt-1 text-2xl font-bold text-emerald-700">{tuitionSummary.paid}</div>
              <p className="mt-0.5 text-xs text-emerald-600">All fees cleared</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <span className="text-xs font-semibold text-amber-900">Partially Paid</span>
              <div className="mt-1 text-2xl font-bold text-amber-700">{tuitionSummary.partial}</div>
              <p className="mt-0.5 text-xs text-amber-600">Pending balance</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <span className="text-xs font-semibold text-rose-900">Pending / Unpaid</span>
              <div className="mt-1 text-2xl font-bold text-rose-700">{tuitionSummary.pending}</div>
              <p className="mt-0.5 text-xs text-rose-600">No payment recorded yet</p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
              <span className="text-xs font-semibold text-blue-900">Scholarship / Waived</span>
              <div className="mt-1 text-2xl font-bold text-[#00509d]">{tuitionSummary.waived}</div>
              <p className="mt-0.5 text-xs text-blue-600">Special grant</p>
            </div>
          </div>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-900">
                    Student Tuition Status Roster
                  </CardTitle>
                  <p className="text-xs text-slate-500">
                    Track payment status and invoice clearance for each student in this class
                  </p>
                </div>
                <Link href="/finance/payments">
                  <Button size="sm" variant="outline" className="text-xs">
                    <DollarSign className="mr-1.5 size-3.5" /> Finance Cashier
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/75">
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Enrollment Code</TableHead>
                    <TableHead>Tuition Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((enr) => {
                    const stu =
                      typeof enr.studentId === 'object' && enr.studentId !== null
                        ? enr.studentId
                        : null;
                    if (!stu) return null;

                    return (
                      <TableRow key={enr._id}>
                        <TableCell>
                          <div className="text-xs font-semibold text-slate-900">
                            {stu.firstName} {stu.lastName}
                          </div>
                          <div className="font-mono text-xs text-slate-500">{stu.studentId}</div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-slate-700">
                          {enr.enrollmentCode}
                        </TableCell>
                        <TableCell>
                          <Badge
                            tone={
                              enr.tuitionStatus === 'paid'
                                ? 'success'
                                : enr.tuitionStatus === 'partially_paid'
                                  ? 'warning'
                                  : enr.tuitionStatus === 'waived'
                                    ? 'neutral'
                                    : 'danger'
                            }
                          >
                            {enr.tuitionStatus.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href="/finance/payments">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-[#00509d]"
                            >
                              Receipts
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 4: ASSESSMENTS & GRADES (ពិន្ទុ & ការវាយតម្លៃ) */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Class Assessments Catalog</h3>
              <p className="text-xs text-slate-500">
                Tests, quizzes, and examinations scheduled for this class
              </p>
            </div>
            <Link href={`/scores?classId=${classId}`}>
              <Button size="sm" className="bg-[#023e8a] text-xs hover:bg-[#00509d]">
                <BookOpen className="mr-1.5 size-4" /> Enter / View Scores
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {isLoadingAssessments ? (
              <Skeleton className="h-28 w-full" />
            ) : assessments.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-xs text-slate-500">
                No assessments configured for this class yet.
              </div>
            ) : (
              assessments.map((ass) => (
                <Card key={ass._id} className="border border-slate-200 bg-white">
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{ass.name}</h4>
                      <Badge tone="neutral">{ass.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-medium">{ass.code}</span>
                      <span>·</span>
                      <span>Max Score: {ass.maxScore}</span>
                      <span>·</span>
                      <span>Weight: {ass.weightPercentage}%</span>
                    </div>
                    {ass.assessmentDate && (
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="size-3" />
                        <span>Date: {new Date(ass.assessmentDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 5: COURSE COMPLETION & PROGRESSION (សិស្សរៀនចប់វគ្គ) */}
      {activeTab === 'completion' && (
        <div className="space-y-4">
          <Card className="border border-blue-100 bg-blue-50/50">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#023e8a]">
                    <Sparkles className="size-4 text-[#ffc300]" />
                    Course Completion & Promotion Pipeline (សិស្សរៀនចប់វគ្គ)
                  </div>
                  <p className="text-xs text-slate-600">
                    Automate final GPA calculation, evaluate passing criteria, and approve
                    next-level promotion.
                  </p>
                </div>

                <Button
                  size="sm"
                  onClick={handleCalculateResults}
                  disabled={calculatingResults || enrollments.length === 0}
                  className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
                >
                  <RefreshCw
                    className={`mr-1.5 size-3.5 ${calculatingResults ? 'animate-spin' : ''}`}
                  />
                  {calculatingResults ? 'Calculating...' : 'Calculate Term Results'}
                </Button>
              </div>

              {calcFeedback && (
                <div className="mt-3 rounded-lg border border-blue-200 bg-white p-2.5 text-xs text-blue-900">
                  {calcFeedback}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border border-slate-200 bg-white">
            <CardHeader className="border-b border-slate-100 pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Term Final Results Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoadingTermResults ? (
                <div className="space-y-3 p-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : termResults.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-500">
                  No term results recorded yet. Click &quot;Calculate Term Results&quot; above to
                  process grades.
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50/75">
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Letter Grade</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Result Status</TableHead>
                      <TableHead>Promotion Decision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {termResults.map((tr) => {
                      const stu =
                        typeof tr.studentId === 'object' && tr.studentId !== null
                          ? tr.studentId
                          : null;

                      return (
                        <TableRow key={tr._id}>
                          <TableCell>
                            <div className="text-xs font-semibold text-slate-900">
                              {stu ? stu.englishName || stu.khmerName : '—'}
                            </div>
                            <div className="font-mono text-xs text-slate-500">{stu?.studentId}</div>
                          </TableCell>
                          <TableCell className="text-xs font-bold text-slate-800">
                            {tr.averageScore}%
                          </TableCell>
                          <TableCell>
                            <Badge tone="neutral">{tr.letterGrade || '—'}</Badge>
                          </TableCell>
                          <TableCell className="font-mono text-xs font-semibold text-slate-700">
                            {tr.gpa !== undefined ? tr.gpa.toFixed(2) : '—'}
                          </TableCell>
                          <TableCell>
                            <Badge
                              tone={
                                tr.resultStatus === 'PASSED'
                                  ? 'success'
                                  : tr.resultStatus === 'FAILED'
                                    ? 'danger'
                                    : 'warning'
                              }
                            >
                              {tr.resultStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              tone={
                                tr.promotionStatus === 'PROMOTED'
                                  ? 'success'
                                  : tr.promotionStatus === 'REPEAT'
                                    ? 'warning'
                                    : 'neutral'
                              }
                            >
                              {tr.promotionStatus || 'PENDING'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* TAB 6: TIMETABLE & TEACHERS (កាលវិភាគ & គ្រូ) */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Assigned Teachers */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Assigned Instructional Staff
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {teacherAssignments.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No individual subject teachers assigned. Primary Class Teacher is designated in
                    class settings.
                  </p>
                ) : (
                  teacherAssignments.map((ta) => {
                    const emp =
                      typeof ta.employeeId === 'object' && ta.employeeId !== null
                        ? ta.employeeId
                        : null;
                    const sub =
                      typeof ta.subjectId === 'object' && ta.subjectId !== null
                        ? ta.subjectId
                        : null;

                    return (
                      <div
                        key={ta._id}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3"
                      >
                        <div>
                          <span className="text-xs font-semibold text-slate-900">
                            {emp ? `${emp.firstName} ${emp.lastName}` : 'Teacher'}
                          </span>
                          <div className="text-xs text-slate-500">
                            Subject:{' '}
                            <span className="font-medium text-slate-700">{sub?.nameEn || '—'}</span>
                          </div>
                        </div>
                        <Badge tone="neutral">{ta.roleInClass.replace('_', ' ')}</Badge>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            {/* Room & Shift Details */}
            <Card className="border border-slate-200 bg-white">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Classroom Facility & Routine Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-xs text-slate-600">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Class Shift:</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {cls.shift === 'morning'
                      ? 'Morning Shift'
                      : cls.shift === 'afternoon'
                        ? 'Afternoon Shift'
                        : cls.shift === 'evening'
                          ? 'Evening Shift'
                          : cls.shift === 'weekend'
                            ? 'Weekend Shift'
                            : `${cls.shift || 'morning'} Shift`}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Daily Timing:</span>
                  <span className="font-mono font-semibold text-[#00509d]">
                    {cls.startTime || '08:00'} — {cls.endTime || '11:15'}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Weekly Study Days:</span>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { num: 1, label: 'Mon', kh: 'ច័ន្ទ' },
                      { num: 2, label: 'Tue', kh: 'អង្គារ' },
                      { num: 3, label: 'Wed', kh: 'ពុធ' },
                      { num: 4, label: 'Thu', kh: 'ព្រហ' },
                      { num: 5, label: 'Fri', kh: 'សុក្រ' },
                      { num: 6, label: 'Sat', kh: 'សៅរ៍' },
                      { num: 7, label: 'Sun', kh: 'អាទិត្យ' },
                    ].map((d) => {
                      const isStudyDay = (cls.selectedDays || [1, 2, 3, 4, 5]).includes(d.num);
                      return (
                        <span
                          key={d.num}
                          className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                            isStudyDay
                              ? 'bg-[#023e8a] font-semibold text-white'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {d.label} ({d.kh})
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Classroom Facility:</span>
                  <span className="font-semibold text-slate-900">{classroomName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Max Physical Capacity:</span>
                  <span className="font-semibold text-slate-900">{cls.capacity} seats</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Start Date:</span>
                  <span className="font-medium text-slate-800">
                    {cls.startDate ? new Date(cls.startDate).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">End Date:</span>
                  <span className="font-medium text-slate-800">
                    {cls.endDate ? new Date(cls.endDate).toLocaleDateString() : '—'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Quick Enroll Modal */}
      {cls && (
        <QuickEnrollDialog
          open={quickEnrollOpen}
          onOpenChange={setQuickEnrollOpen}
          classItem={cls}
          enrolledStudentIds={enrolledStudentIds}
          onEnrolled={() => void refetchEnrollments()}
        />
      )}

      {/* Edit Class Dialog */}
      {cls && (
        <ClassDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} classItem={cls} />
      )}
    </div>
  );
};
