'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  Clock,
  GraduationCap,
  RefreshCw,
  Search,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { AcademicHonorRollLeaderboard } from './academic-honor-roll-leaderboard';
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import { useDashboardActionItemsQuery } from '../hooks/use-dashboard';
import type { NearCapacityClassItem, UnmarkedAttendanceItem, UnsubmittedScoreItem } from '../types';

interface AcademicDashboardTabProps {
  branchId?: string;
  academicYearId?: string;
}

export const AcademicDashboardTab: React.FC<AcademicDashboardTabProps> = ({
  branchId,
  academicYearId,
}) => {
  const { isKhmer } = useTranslation();
  const [attendanceSearch, setAttendanceSearch] = React.useState('');
  const [scoresSearch, setScoresSearch] = React.useState('');

  const { data: periodsRes } = useAcademicPeriodsQuery({
    academicYearId: academicYearId && academicYearId !== 'all' ? academicYearId : undefined,
    limit: 20,
  });
  const periods = periodsRes?.data ?? [];
  const [now] = React.useState(() => Date.now());
  const activePeriod = periods.find((p) => p.status === 'active') || periods[0] || null;

  const termMetrics = React.useMemo(() => {
    if (!activePeriod || !activePeriod.startDate || !activePeriod.endDate) {
      return null;
    }
    const start = new Date(activePeriod.startDate).getTime();
    const end = new Date(activePeriod.endDate).getTime();
    const totalDays = Math.max(1, Math.round((end - start) / 86400000));
    const daysElapsed = Math.max(0, Math.min(totalDays, Math.round((now - start) / 86400000)));
    const daysRemaining = Math.max(0, Math.round((end - now) / 86400000));
    const percent = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));
    return { totalDays, daysElapsed, daysRemaining, percent };
  }, [activePeriod, now]);

  const { data, isLoading, isError, refetch, isFetching } = useDashboardActionItemsQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    academicYearId,
  });

  const response = data?.data;
  const summary = response?.summary;
  const queues = response?.queues;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !summary || !queues) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 text-sm text-rose-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-rose-600" />
            <span>
              {isKhmer
                ? 'មិនអាចទាញយកទិន្នន័យសិក្សាធិការ និងវត្តមានបានទេ'
                : 'Failed to load academic and faculty operational data.'}
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-1 size-3.5" />
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </div>
      </div>
    );
  }

  const { unmarkedAttendance, unsubmittedScores, nearCapacityClasses } = queues;

  const filteredAttendance = unmarkedAttendance.filter(
    (item) =>
      item.className.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      (item.teacherName && item.teacherName.toLowerCase().includes(attendanceSearch.toLowerCase())),
  );

  const filteredScores = unsubmittedScores.filter(
    (item) =>
      item.assessmentName.toLowerCase().includes(scoresSearch.toLowerCase()) ||
      item.className.toLowerCase().includes(scoresSearch.toLowerCase()) ||
      (item.subjectName && item.subjectName.toLowerCase().includes(scoresSearch.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      {/* Tab Control Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {isKhmer ? 'សិក្សាធិការ និងការបង្រៀន' : 'Academic & Faculty Hub'}
          </h2>
          <p className="text-xs text-slate-500">
            {isKhmer
              ? 'តាមដានការស្រង់វត្តមានប្រចាំថ្ងៃ ការបញ្ចូលពិន្ទុប្រឡង និងបន្ទុកបង្រៀនរបស់គ្រូ'
              : 'Monitor daily attendance submissions, gradebook scoring progress, and faculty class allocations.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/teacher-assignments"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#023e8a] bg-[#023e8a] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#00509d]"
          >
            <GraduationCap className="size-3.5" />
            {isKhmer ? 'តារាងបន្ទុកបង្រៀនគ្រូ' : 'Faculty Matrix'}
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-8"
          >
            <RefreshCw className={cn('mr-1.5 size-3.5', isFetching && 'animate-spin')} />
            {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Active Academic Term Progress Milestone Banner */}
      {activePeriod && termMetrics && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-[#023e8a] p-4 text-white shadow-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#ffd60a] px-2 py-0.5 text-xs font-bold text-slate-950">
                  {isKhmer ? 'វគ្គសិក្សាបច្ចុប្បន្ន' : 'Current Active Term'}
                </span>
                <span className="text-sm font-bold text-white">
                  {activePeriod.name} ({activePeriod.code})
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                {new Date(activePeriod.startDate!).toLocaleDateString()} —{' '}
                {new Date(activePeriod.endDate!).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-300">
                  {termMetrics.daysElapsed} {isKhmer ? 'ថ្ងៃកន្លងផុត' : 'days elapsed'} ·{' '}
                  <span className="font-semibold text-emerald-300">
                    {termMetrics.daysRemaining} {isKhmer ? 'ថ្ងៃនៅសល់' : 'days left'}
                  </span>
                </div>
                <div className="text-lg font-bold text-[#ffd60a]">{termMetrics.percent}%</div>
              </div>
              <Link
                href="/academic-periods"
                className="hidden h-8 items-center gap-1 rounded-lg bg-white/10 px-3 text-xs font-medium text-white transition-colors hover:bg-white/20 md:inline-flex"
              >
                <span>{isKhmer ? 'មើលប្រតិទិន' : 'View Calendar'}</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#ffd60a] transition-all duration-500"
              style={{ width: `${termMetrics.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Unmarked Attendance Classes */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ថ្នាក់មិនទាន់ស្រង់វត្តមានថ្ងៃនេះ' : 'Missing Attendance Today'}
              </span>
              <CalendarCheck
                className={cn(
                  'size-5 shrink-0',
                  unmarkedAttendance.length > 0 ? 'text-rose-600' : 'text-emerald-600',
                )}
              />
            </div>
            <div className="mt-2">
              <div
                className={cn(
                  'text-2xl font-bold tracking-tight',
                  unmarkedAttendance.length > 0 ? 'text-rose-700' : 'text-slate-950',
                )}
              >
                {unmarkedAttendance.length}
              </div>
              <p className="text-xs text-slate-500">
                {unmarkedAttendance.length > 0
                  ? isKhmer
                    ? 'ថ្នាក់ដែលត្រូវស្រង់ជាបន្ទាន់'
                    : 'Classes awaiting roll call'
                  : isKhmer
                    ? 'បានស្រង់គ្រប់ថ្នាក់'
                    : 'All classes completed'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Scores */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ការវាយតម្លៃមិនទាន់បញ្ចូលពិន្ទុ' : 'Pending Gradebook Scores'}
              </span>
              <BookOpenCheck
                className={cn(
                  'size-5 shrink-0',
                  unsubmittedScores.length > 0 ? 'text-amber-600' : 'text-emerald-600',
                )}
              />
            </div>
            <div className="mt-2">
              <div
                className={cn(
                  'text-2xl font-bold tracking-tight',
                  unsubmittedScores.length > 0 ? 'text-amber-700' : 'text-slate-950',
                )}
              >
                {unsubmittedScores.length}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ការវាយតម្លៃត្រូវការបញ្ចូលពិន្ទុ' : 'Assessments awaiting scores'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Near Capacity Classes */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ថ្នាក់ជិតពេញចំណុះ (>=90%)' : 'Near-Capacity Classes (>=90%)'}
              </span>
              <Users className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {nearCapacityClasses.length}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ថ្នាក់ជិតពេញអតិបរមា' : 'Classes needing section split'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Term Calendar Countdown */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ប្រតិទិនវគ្គសិក្សា' : 'Term Milestone'}
              </span>
              <Clock className="size-5 shrink-0 text-indigo-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-indigo-700">
                {termMetrics ? `${termMetrics.daysRemaining}d` : '—'}
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                {activePeriod ? activePeriod.name : isKhmer ? 'គ្មានវគ្គសកម្ម' : 'No active term'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Honor Roll & Top Performers Leaderboard */}
      <AcademicHonorRollLeaderboard branchId={branchId} academicYearId={academicYearId} />

      {/* Main Grid: Unmarked Attendance & Pending Scores */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Missing Attendance Today */}
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <CalendarCheck className="size-5 shrink-0 text-rose-600" />
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-950">
                    {isKhmer ? 'វត្តមានមិនទាន់ស្រង់ថ្ងៃនេះ' : 'Missing Attendance Today'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {isKhmer
                      ? 'ថ្នាក់ដែលគ្រូមិនទាន់បានស្រង់វត្តមានប្រចាំថ្ងៃ'
                      : 'Classes with active sessions that have not recorded student attendance.'}
                  </CardDescription>
                </div>
              </div>

              <Badge
                tone="neutral"
                className={cn(
                  'self-start font-bold sm:self-auto',
                  unmarkedAttendance.length > 0
                    ? 'border-rose-200 bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800',
                )}
              >
                {unmarkedAttendance.length} {isKhmer ? 'ថ្នាក់' : 'Classes'}
              </Badge>
            </div>

            {unmarkedAttendance.length > 0 && (
              <div className="relative mt-2">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    isKhmer
                      ? 'ស្វែងរកតាមឈ្មោះថ្នាក់ ឬឈ្មោះគ្រូបង្រៀន...'
                      : 'Search by class name or teacher...'
                  }
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {unmarkedAttendance.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="size-10 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {isKhmer
                    ? 'ការស្រង់វត្តមានថ្ងៃនេះបានបញ្ចប់សព្វគ្រប់'
                    : 'All Class Attendance Recorded'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer
                    ? 'គ្រប់ថ្នាក់ទាំងអស់បានកត់ត្រាវត្តមានសិស្សរួចរាល់សម្រាប់ថ្ងៃនេះ។'
                    : 'Every scheduled session today has submitted its attendance records.'}
                </p>
              </div>
            ) : filteredAttendance.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                {isKhmer
                  ? 'រកមិនឃើញថ្នាក់ស្របនឹងការស្វែងរកទេ'
                  : 'No classes match your search query.'}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredAttendance.map((item: UnmarkedAttendanceItem) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-3.5 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.className}</span>
                        {item.sessionType && (
                          <Badge
                            tone="neutral"
                            className="bg-slate-100 text-xs font-medium text-slate-600"
                          >
                            {item.sessionType}
                          </Badge>
                        )}
                        {item.branchName && (
                          <span className="text-xs text-slate-400">· {item.branchName}</span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {item.teacherName ? (
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Users className="size-3 text-[#00509d]" />
                            {isKhmer ? 'គ្រូ:' : 'Teacher:'} {item.teacherName}
                          </span>
                        ) : (
                          <span className="text-amber-700">
                            {isKhmer ? 'មិនទាន់ចាត់តាំងគ្រូ' : 'No assigned teacher'}
                          </span>
                        )}
                        {item.scheduleTime && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="size-3" />
                            {item.scheduleTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <Link
                        href={`/attendance?classId=${item.classId}`}
                        className="inline-flex h-7 items-center gap-1 rounded-lg border border-[#00509d] bg-[#00509d] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#023e8a]"
                      >
                        <CheckCircle2 className="size-3" />
                        {isKhmer ? 'ស្រង់វត្តមាន' : 'Record'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Scores / Gradebook */}
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <BookOpenCheck className="size-5 shrink-0 text-amber-600" />
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-950">
                    {isKhmer ? 'ពិន្ទុមិនទាន់បញ្ចូល' : 'Pending Gradebook Scores'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {isKhmer
                      ? 'ការប្រឡង/កិច្ចការដែលបានបញ្ចប់តែកំពុងរង់ចាំការបញ្ចូលពិន្ទុ'
                      : 'Assessments whose completion date has passed but scores have not been entered.'}
                  </CardDescription>
                </div>
              </div>

              <Badge
                tone="neutral"
                className={cn(
                  'self-start font-bold sm:self-auto',
                  unsubmittedScores.length > 0
                    ? 'border-amber-200 bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800',
                )}
              >
                {unsubmittedScores.length} {isKhmer ? 'ការវាយតម្លៃ' : 'Assessments'}
              </Badge>
            </div>

            {unsubmittedScores.length > 0 && (
              <div className="relative mt-2">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    isKhmer
                      ? 'ស្វែងរកតាមការប្រឡង ថ្នាក់ ឬមុខវិជ្ជា...'
                      : 'Search by assessment, class, or subject...'
                  }
                  value={scoresSearch}
                  onChange={(e) => setScoresSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {unsubmittedScores.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="size-10 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {isKhmer ? 'ពិន្ទុទាំងអស់ត្រូវបានបញ្ចូលរួចរាល់' : 'Gradebook Is Fully Up to Date'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer
                    ? 'មិនមានការវាយតម្លៃដែលហួសពេលកំណត់បញ្ចូលពិន្ទុឡើយ។'
                    : 'No past-due assessments awaiting score entry.'}
                </p>
              </div>
            ) : filteredScores.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                {isKhmer
                  ? 'រកមិនឃើញការវាយតម្លៃស្របនឹងការស្វែងរកទេ'
                  : 'No assessments match your search query.'}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredScores.map((item: UnsubmittedScoreItem) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 p-3.5 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {item.assessmentName}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          ({item.assessmentCode})
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="font-medium text-slate-700">{item.className}</span>
                        {item.subjectName && (
                          <Badge
                            tone="neutral"
                            className="bg-slate-100 text-xs font-medium text-slate-600"
                          >
                            {item.subjectName}
                          </Badge>
                        )}
                        <span className="text-xs text-slate-400">
                          {isKhmer ? 'កាលបរិច្ឆេទ:' : 'Due:'}{' '}
                          {new Date(item.assessmentDate).toLocaleDateString(
                            isKhmer ? 'km-KH' : 'en-US',
                            { month: 'short', day: 'numeric' },
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <Link
                        href={`/scores?assessmentId=${item.assessmentId}&classId=${item.classId}`}
                        className="inline-flex h-7 items-center gap-1 rounded-lg border border-amber-600 bg-amber-600 px-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
                      >
                        <BookOpen className="size-3" />
                        {isKhmer ? 'បញ្ចូលពិន្ទុ' : 'Enter Scores'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Near Capacity Classes Watchlist */}
      {nearCapacityClasses.length > 0 && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-950">
                  {isKhmer
                    ? 'ថ្នាក់ជិតពេញចំណុះ (Near-Capacity Watchlist)'
                    : 'Near-Capacity Classes Watchlist'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isKhmer
                    ? 'ថ្នាក់ដែលមានចំនួនសិស្សចាប់ពី ៩០% នៃចំណុះអតិបរមាឡើងទៅ ត្រៀមបើកបន្ទប់ថ្មី'
                    : 'Classes with 90%+ occupancy that may need section splits or enrollment caps.'}
                </CardDescription>
              </div>
              <Badge tone="neutral" className="bg-blue-100 text-[#00509d]">
                {nearCapacityClasses.length} {isKhmer ? 'ថ្នាក់' : 'Classes'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearCapacityClasses.map((c: NearCapacityClassItem) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 transition-colors hover:border-[#00509d]/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{c.className}</span>
                    <Badge
                      tone="neutral"
                      className={cn(
                        'text-xs font-bold',
                        c.occupancyRate >= 100
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800',
                      )}
                    >
                      {Math.round(c.occupancyRate)}%
                    </Badge>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {isKhmer ? 'សិស្សកំពុងរៀន:' : 'Enrolled:'}{' '}
                      <strong className="text-slate-900">{c.currentEnrollmentCount}</strong> /{' '}
                      {c.capacity}
                    </span>
                    <span className="text-xs text-slate-400">
                      {c.capacity - c.currentEnrollmentCount > 0
                        ? `${c.capacity - c.currentEnrollmentCount} ${isKhmer ? 'កន្លែងទៀត' : 'left'}`
                        : isKhmer
                          ? 'ពេញចំណុះ'
                          : 'Full'}
                    </span>
                  </div>

                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-300',
                        c.occupancyRate >= 100 ? 'bg-rose-600' : 'bg-amber-500',
                      )}
                      style={{ width: `${Math.min(100, c.occupancyRate)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
