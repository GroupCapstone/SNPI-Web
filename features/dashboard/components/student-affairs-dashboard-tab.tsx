'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  Cake,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Phone,
  PhoneCall,
  RefreshCw,
  Search,
  Send,
  UserMinus,
  UserPlus,
  Users,
  UserX,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ParentContactLogDialog } from '@/features/notifications/components/parent-contact-log-dialog';
import { useTriggerAbsenceAlertMutation } from '@/features/notifications/hooks/use-notifications';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useStudentAffairsPulseQuery } from '../hooks/use-dashboard';
import type { AtRiskAbsenceStudentItem, UpcomingBirthdayItem } from '../types';

interface StudentAffairsDashboardTabProps {
  branchId?: string;
  academicYearId?: string;
}

export const StudentAffairsDashboardTab: React.FC<StudentAffairsDashboardTabProps> = ({
  branchId,
  academicYearId,
}) => {
  const { isKhmer } = useTranslation();
  const [absenceSearch, setAbsenceSearch] = React.useState('');
  const [outreachStudent, setOutreachStudent] = React.useState<AtRiskAbsenceStudentItem | null>(
    null,
  );
  const [sendingStudentId, setSendingStudentId] = React.useState<string | null>(null);
  const [sentStatusMap, setSentStatusMap] = React.useState<Record<string, string>>({});

  const triggerAbsenceMutation = useTriggerAbsenceAlertMutation();

  const handleQuickSendAlert = async (item: AtRiskAbsenceStudentItem) => {
    try {
      setSendingStudentId(item.studentId);
      await triggerAbsenceMutation.mutateAsync({
        studentId: item.studentId,
        guardianPhone: item.guardianPhone,
        consecutiveDays: item.consecutiveAbsentCount,
        channel: 'telegram',
        notes: `Automated alert triggered from Student Affairs Dashboard for ${item.consecutiveAbsentCount} consecutive unexcused absences.`,
      });
      setSentStatusMap((prev) => ({
        ...prev,
        [item.studentId]: isKhmer ? 'បានផ្ញើសារ' : 'Alert Sent',
      }));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to send absence alert');
    } finally {
      setSendingStudentId(null);
    }
  };

  const { data, isLoading, isError, refetch, isFetching } = useStudentAffairsPulseQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    academicYearId,
  });

  const pulse = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !pulse) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 text-sm text-rose-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-rose-600" />
            <span>
              {isKhmer
                ? 'មិនអាចទាញយកទិន្នន័យកិច្ចការសិស្ស និងការចុះឈ្មោះបានទេ'
                : 'Failed to load student affairs and admissions pulse data.'}
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

  const { funnel, movement, atRiskAbsences, upcomingBirthdays } = pulse;

  const filteredAbsences = atRiskAbsences.filter(
    (item) =>
      item.studentName.toLowerCase().includes(absenceSearch.toLowerCase()) ||
      item.studentCode.toLowerCase().includes(absenceSearch.toLowerCase()) ||
      item.className.toLowerCase().includes(absenceSearch.toLowerCase()) ||
      (item.guardianName && item.guardianName.toLowerCase().includes(absenceSearch.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      {/* Tab Control Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {isKhmer ? 'កិច្ចការសិស្ស និងការចុះឈ្មោះ' : 'Student Affairs & Admissions Hub'}
          </h2>
          <p className="text-xs text-slate-500">
            {isKhmer
              ? 'តាមដានលំហូរចុះឈ្មោះ ការអវត្តមានជាប់ៗគ្នា ៣ ថ្ងៃ និងបម្រែបម្រួលស្ថានភាពសិស្ស'
              : 'Monitor enrollment funnel, 3-day chronic absenteeism alerts, and student lifecycle dynamics.'}
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
          className="self-start sm:self-auto"
        >
          <RefreshCw className={cn('mr-1.5 size-3.5', isFetching && 'animate-spin')} />
          {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
        </Button>
      </div>

      {/* Student Movement & Lifecycle KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* Active Students */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'សិស្សកំពុងរៀន' : 'Active Students'}
              </span>
              <Users className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {movement.active}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'សិស្សមានវត្តមានក្នុងថ្នាក់' : 'Currently enrolled'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* New Enrollments This Month */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ចុះឈ្មោះថ្មីខែនេះ' : 'New This Month'}
              </span>
              <UserPlus className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-[#00509d]">
                +{movement.newEnrollmentsThisMonth}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ចូលរៀនក្នុងខែនេះ' : 'Joined this month'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Suspended */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ព្យួរការសិក្សា' : 'Suspended'}
              </span>
              <UserMinus className="size-5 shrink-0 text-amber-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-amber-700">
                {movement.suspended}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ផ្អាកបណ្តោះអាសន្ន' : 'Temporarily on leave'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Transferred */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ផ្ទេរការសិក្សា' : 'Transferred'}
              </span>
              <GraduationCap className="size-5 shrink-0 text-indigo-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {movement.transferred}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ផ្ទេរចេញ/ប្តូរសាខា' : 'Internal or external'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawn / Dropped */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ឈប់រៀន' : 'Withdrawn'}
              </span>
              <UserX className="size-5 shrink-0 text-rose-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-rose-700">
                {movement.withdrawn}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'បញ្ចប់ការសិក្សា/ចាកចេញ' : 'Discontinued enrollment'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admissions Funnel Overview */}
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-slate-950">
                {isKhmer
                  ? 'លំហូរនៃការចុះឈ្មោះសិស្សថ្មី (Admissions Funnel)'
                  : 'Admissions Pipeline & Conversion'}
              </CardTitle>
              <CardDescription className="text-xs">
                {isKhmer
                  ? 'ការតាមដានដំណាក់កាលពីការដាក់ពាក្យ -> ប្រឡងវាស់សមត្ថភាព -> ចុះឈ្មោះចូលរៀនផ្លូវការ'
                  : 'Stage-by-stage progression from inquiry/applied to placement test and active enrollment.'}
              </CardDescription>
            </div>
            <Link
              href="/students"
              className="hidden items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline sm:flex"
            >
              {isKhmer ? 'មើលបញ្ជីសិស្សទាំងអស់' : 'View Student Directory'}
              <ArrowRight className="size-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {funnel.map((stage, idx) => {
              const isLast = idx === funnel.length - 1;
              const isFirst = idx === 0;

              return (
                <div
                  key={stage.stage}
                  className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:border-[#00509d]/30 hover:bg-blue-50/20"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-normal text-slate-500 uppercase">
                        {isKhmer ? stage.labelKh : stage.labelEn}
                      </span>
                      <Badge
                        tone="neutral"
                        className={cn(
                          'text-xs font-semibold',
                          isFirst && 'bg-blue-100 text-[#00509d]',
                          stage.stage === 'tested' && 'bg-amber-100 text-amber-800',
                          isLast && 'bg-emerald-100 text-emerald-800',
                        )}
                      >
                        {stage.percentage}%
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                        {stage.count}
                      </span>
                      <span className="text-xs text-slate-500">
                        {isKhmer ? 'នាក់' : 'candidates'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          isFirst && 'bg-[#00509d]',
                          stage.stage === 'tested' && 'bg-amber-500',
                          isLast && 'bg-emerald-600',
                        )}
                        style={{ width: `${Math.min(100, Math.max(5, stage.percentage))}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      {stage.stage === 'registered' &&
                        (isKhmer ? 'ការចុះឈ្មោះដំបូង' : 'Inquiries & Registered')}
                      {stage.stage === 'tested' &&
                        (isKhmer ? 'បានធ្វើតេស្តរួច' : 'Evaluated / Tested')}
                      {stage.stage === 'enrolled' &&
                        (isKhmer ? 'បានចុះឈ្មោះផ្លូវការ' : 'Officially Enrolled')}
                    </span>
                    {!isLast && <ChevronRight className="size-4 text-slate-400" />}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Grid: At-Risk Absence Outreach & Upcoming Birthdays */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* At-Risk 3-Day Consecutive Unexcused Absences */}
        <Card className="border border-rose-200/80 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-rose-100 bg-rose-50/40 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-rose-600" />
                  <CardTitle className="text-base font-semibold text-rose-950">
                    {isKhmer
                      ? 'ការអវត្តមានជាប់ៗគ្នា ៣ ថ្ងៃ (ត្រូវទាក់ទងជាបន្ទាន់)'
                      : 'At-Risk Chronic Absences (3+ Consecutive Days)'}
                  </CardTitle>
                </div>
                <CardDescription className="mt-0.5 text-xs text-rose-800">
                  {isKhmer
                    ? 'បញ្ជីសិស្សដែលអវត្តមានឥតច្បាប់ ៣ ថ្ងៃជាប់គ្នា ត្រូវការការទាក់ទងទៅកាន់អាណាព្យាបាលជាបន្ទាន់'
                    : 'Students with 3 or more consecutive unexcused absences requiring guardian outreach.'}
                </CardDescription>
              </div>

              <Badge
                tone="neutral"
                className="self-start border-rose-200 bg-rose-100 font-bold text-rose-800 sm:self-auto"
              >
                {atRiskAbsences.length} {isKhmer ? 'ករណីប្រឈម' : 'At-Risk Cases'}
              </Badge>
            </div>

            {/* Filter Search */}
            {atRiskAbsences.length > 0 && (
              <div className="relative mt-2">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    isKhmer
                      ? 'ស្វែងរកតាមឈ្មោះសិស្ស អត្តលេខ ថ្នាក់ ឬអាណាព្យាបាល...'
                      : 'Search by student name, code, class, or guardian...'
                  }
                  value={absenceSearch}
                  onChange={(e) => setAbsenceSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {atRiskAbsences.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="size-10 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {isKhmer
                    ? 'គ្មានសិស្សអវត្តមាន ៣ ថ្ងៃជាប់គ្នាទេ'
                    : 'No At-Risk Consecutive Absences'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer
                    ? 'អត្រាវត្តមានសិស្សស្ថិតក្នុងកម្រិតល្អ និងមិនមានករណីប្រឈមការបោះបង់ការសិក្សាឡើយ។'
                    : 'Attendance is steady. No students currently meet the 3-day unexcused absence alert threshold.'}
                </p>
              </div>
            ) : filteredAbsences.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                {isKhmer
                  ? 'រកមិនឃើញទិន្នន័យស្របនឹងការស្វែងរកទេ'
                  : 'No records matched your search query.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/70 text-slate-600 hover:bg-slate-50/70">
                      <TableHead className="w-48 text-xs font-semibold">
                        {isKhmer ? 'សិស្ស' : 'Student'}
                      </TableHead>
                      <TableHead className="text-xs font-semibold">
                        {isKhmer ? 'ថ្នាក់ / សាខា' : 'Class / Branch'}
                      </TableHead>
                      <TableHead className="text-center text-xs font-semibold">
                        {isKhmer ? 'អវត្តមានជាប់ៗគ្នា' : 'Consecutive'}
                      </TableHead>
                      <TableHead className="text-xs font-semibold">
                        {isKhmer ? 'អាណាព្យាបាល / ទំនាក់ទំនង' : 'Guardian / Contact'}
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold">
                        {isKhmer ? 'សកម្មភាព' : 'Action'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAbsences.map((item: AtRiskAbsenceStudentItem) => (
                      <TableRow key={item.studentId} className="hover:bg-rose-50/20">
                        <TableCell>
                          <div>
                            <p className="font-semibold text-slate-900">{item.studentName}</p>
                            <p className="font-mono text-xs text-slate-500">{item.studentCode}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-xs font-medium text-slate-800">{item.className}</p>
                            {item.branchName && (
                              <p className="text-xs text-slate-500">{item.branchName}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            tone="neutral"
                            className={cn(
                              'font-bold',
                              item.consecutiveAbsentCount >= 5
                                ? 'bg-rose-600 text-white'
                                : 'bg-rose-100 text-rose-800',
                            )}
                          >
                            {item.consecutiveAbsentCount} {isKhmer ? 'ថ្ងៃ' : 'Days'}
                          </Badge>
                          <p className="mt-0.5 text-xs text-slate-400">
                            {isKhmer ? 'ចុងក្រោយ:' : 'Last:'}{' '}
                            {new Date(item.lastAbsentDate).toLocaleDateString(
                              isKhmer ? 'km-KH' : 'en-US',
                              { month: 'short', day: 'numeric' },
                            )}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-xs font-medium text-slate-900">
                              {item.guardianName || (isKhmer ? 'មិនមានឈ្មោះ' : 'Unknown')}
                            </p>
                            {item.guardianPhone ? (
                              <a
                                href={`tel:${item.guardianPhone}`}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
                              >
                                <Phone className="size-3" />
                                {item.guardianPhone}
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400">
                                {isKhmer ? 'គ្មានលេខទូរស័ព្ទ' : 'No phone'}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {sentStatusMap[item.studentId] ? (
                              <Badge
                                tone="neutral"
                                className="h-8 border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700"
                              >
                                <CheckCircle2 className="mr-1 size-3.5" />
                                {sentStatusMap[item.studentId]}
                              </Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={sendingStudentId === item.studentId}
                                onClick={() => handleQuickSendAlert(item)}
                                className="h-8 border-blue-200 bg-blue-50/50 px-2.5 text-xs font-medium text-[#0088cc] hover:bg-blue-100 hover:text-[#00509d]"
                                title={
                                  isKhmer
                                    ? 'ផ្ញើសារ Telegram ជូនដំណឹងអវត្តមាន'
                                    : 'Send Telegram Absence Alert'
                                }
                              >
                                <Send className="mr-1 size-3.5" />
                                {sendingStudentId === item.studentId
                                  ? isKhmer
                                    ? 'កំពុងផ្ញើ...'
                                    : 'Sending...'
                                  : isKhmer
                                    ? 'ផ្ញើសារ'
                                    : 'Alert'}
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setOutreachStudent(item)}
                              className="h-8 border-slate-200 px-2.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                              title={
                                isKhmer ? 'កត់ត្រាការទាក់ទងអាណាព្យាបាល' : 'Log Parent Outreach'
                              }
                            >
                              <PhoneCall className="mr-1 size-3.5 text-[#023e8a]" />
                              {isKhmer ? 'កត់ត្រា' : 'Log'}
                            </Button>

                            {item.guardianPhone && (
                              <a
                                href={`tel:${item.guardianPhone}`}
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                title={isKhmer ? 'ហៅទូរស័ព្ទ' : 'Call Guardian'}
                              >
                                <Phone className="size-3.5 text-emerald-600" />
                              </a>
                            )}
                            <Link
                              href={`/students/${item.studentId}`}
                              className="inline-flex h-8 items-center rounded-lg border border-[#00509d] bg-[#00509d] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#023e8a]"
                            >
                              {isKhmer ? 'ពិនិត្យ' : 'Profile'}
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Birthdays (Next 7 Days) */}
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cake className="size-5 shrink-0 text-amber-600" />
                <div>
                  <CardTitle className="text-sm font-semibold text-slate-950">
                    {isKhmer ? 'ខួបកំណើតក្នុងសប្តាហ៍នេះ' : 'Upcoming Birthdays'}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {isKhmer
                      ? '៧ ថ្ងៃបន្ទាប់ (សិស្ស និងបុគ្គលិក)'
                      : 'Next 7 days (Students & Faculty)'}
                  </CardDescription>
                </div>
              </div>
              <Badge tone="neutral" className="bg-amber-100 font-bold text-amber-800">
                {upcomingBirthdays.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            {upcomingBirthdays.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-xs text-slate-500">
                  {isKhmer
                    ? 'មិនមានខួបកំណើតក្នុងរយៈពេល ៧ ថ្ងៃខាងមុខទេ'
                    : 'No birthdays in the next 7 days.'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {upcomingBirthdays.map((b: UpcomingBirthdayItem) => {
                  const isToday = b.daysUntil === 0;
                  const isTomorrow = b.daysUntil === 1;

                  return (
                    <div
                      key={b.id}
                      className={cn(
                        'flex items-center justify-between rounded-xl border p-2.5 transition-colors',
                        isToday
                          ? 'border-amber-300 bg-amber-50/70 font-semibold text-amber-950'
                          : 'border-slate-100 bg-slate-50/60 text-slate-800 hover:bg-slate-100/60',
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            'grid size-8 place-items-center rounded-full text-xs font-bold uppercase',
                            b.type === 'student'
                              ? 'bg-blue-100 text-[#00509d]'
                              : 'bg-emerald-100 text-emerald-800',
                          )}
                        >
                          {b.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs leading-tight font-semibold text-slate-900">
                            {b.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {b.classNameOrDept || (b.type === 'student' ? 'Student' : 'Staff')}
                          </p>
                        </div>
                      </div>

                      <Badge
                        tone="neutral"
                        className={cn(
                          'text-xs font-semibold',
                          isToday && 'bg-amber-500 text-white',
                          isTomorrow && 'bg-amber-200 text-amber-900',
                          !isToday && !isTomorrow && 'bg-slate-200 text-slate-700',
                        )}
                      >
                        {isToday
                          ? isKhmer
                            ? 'ថ្ងៃនេះ'
                            : 'Today'
                          : isTomorrow
                            ? isKhmer
                              ? 'ថ្ងៃស្អែក'
                              : 'Tomorrow'
                            : `${b.daysUntil} ${isKhmer ? 'ថ្ងៃទៀត' : 'days'}`}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {outreachStudent && (
        <ParentContactLogDialog
          open={Boolean(outreachStudent)}
          onOpenChange={(open) => {
            if (!open) setOutreachStudent(null);
          }}
          studentId={outreachStudent.studentId}
          studentName={outreachStudent.studentName}
          defaultGuardianName={outreachStudent.guardianName || ''}
          defaultGuardianPhone={outreachStudent.guardianPhone || ''}
          defaultPurpose="absence"
          defaultNotes={
            isKhmer
              ? `ទំនាក់ទំនងតាមដានករណីអវត្តមាន ${outreachStudent.consecutiveAbsentCount} ថ្ងៃជាប់គ្នា`
              : `Outreach follow-up for ${outreachStudent.consecutiveAbsentCount} consecutive unexcused absences`
          }
        />
      )}
    </div>
  );
};
