'use client';

import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Loader2,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from '@/components/icons';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  useApproveTargetPeriodReadinessMutation,
  useOpenTargetPeriodMutation,
  useTargetPeriodReadinessQuery,
} from '../hooks/use-rollover';
import type { RolloverExecutionResult, RolloverPlan } from '../types';

interface RolloverSummaryReportProps {
  plan: RolloverPlan;
  result?: RolloverExecutionResult;
  onReset?: () => void;
}

export const RolloverSummaryReport: React.FC<RolloverSummaryReportProps> = ({
  plan,
  result = plan.executionResult,
  onReset,
}) => {
  const targetPeriodId =
    typeof plan.targetPeriodId === 'object' ? plan.targetPeriodId._id : plan.targetPeriodId;

  const { data: readinessData, isLoading: loadingReadiness } =
    useTargetPeriodReadinessQuery(targetPeriodId);
  const approveReadinessMutation = useApproveTargetPeriodReadinessMutation();
  const openPeriodMutation = useOpenTargetPeriodMutation();

  const readiness = readinessData?.data;

  const handleApproveReadiness = async () => {
    try {
      await approveReadinessMutation.mutateAsync(targetPeriodId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Readiness approval failed';
      alert(`Approval error: ${msg}`);
    }
  };

  const handleOpenPeriod = async () => {
    if (
      !confirm(
        'Are you sure you want to open the target period? Students and teachers will be able to begin active academic operations.',
      )
    ) {
      return;
    }
    try {
      await openPeriodMutation.mutateAsync(targetPeriodId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Open period failed';
      alert(`Open period error: ${msg}`);
    }
  };

  if (!result) return null;

  return (
    <div className="space-y-6">
      {/* Success Celebration Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="size-8 shrink-0 text-emerald-600" />
          <div>
            <h3 className="text-xl font-bold text-emerald-900">
              Academic Rollover Successfully Completed!
            </h3>
            <p className="text-sm text-emerald-700">
              Plan <span className="font-semibold">{plan.planCode}</span> has been atomically
              executed. Target period is populated with planned classes and enrollments.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Classes Created</CardTitle>
            <BookOpen className="h-4 w-4 text-[#023e8a]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#023e8a]">{result.classesCreated}</div>
            <p className="text-xs text-slate-500">New period instances</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">
              Enrollments Created
            </CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700">{result.enrollmentsCreated}</div>
            <p className="text-xs text-slate-500">Linked to historical lineage</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Students Promoted</CardTitle>
            <GraduationCap className="h-4 w-4 text-[#00509d]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00509d]">{result.studentsPromoted}</div>
            <p className="text-xs text-slate-500">Advanced to higher level</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-slate-500">Draft Schedules</CardTitle>
            <Calendar className="h-4 w-4 text-[#ffc300]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{result.schedulesCreated}</div>
            <p className="text-xs text-slate-500">Verified collision-free</p>
          </CardContent>
        </Card>
      </div>

      {/* Target Period Readiness & Activation Dashboard (Point 5 Pipeline) */}
      <Card className="border-[#023e8a]/20 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base font-bold text-[#023e8a]">
                <Sparkles className="h-5 w-5 text-[#ffc300]" /> Target Period Readiness & Activation
                Gate
              </CardTitle>
              <p className="mt-1 text-xs text-slate-600">
                Target Period Lifecycle: Rollover Completed &rarr; Readiness Check &rarr; Resolve
                Issues &rarr; Approve &rarr; Open Period.
              </p>
            </div>
            {readiness && (
              <Badge
                className={
                  readiness.status === 'open'
                    ? 'bg-emerald-600 text-white'
                    : readiness.isApproved
                      ? 'bg-[#023e8a] text-white'
                      : 'bg-amber-500 text-white'
                }
              >
                {readiness.status === 'open'
                  ? 'PERIOD OPEN'
                  : readiness.isApproved
                    ? 'READINESS APPROVED'
                    : 'PLANNED (NOT OPEN)'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {loadingReadiness ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-[#023e8a]" />
              <span className="ml-2 text-xs text-slate-500">Running readiness verification...</span>
            </div>
          ) : readiness?.checks ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* Check 1: Classes */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.classes.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">1. Classes Created</span>
                    {readiness.checks.classes.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-rose-600" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {readiness.checks.classes.message} ({readiness.checks.classes.classesCount})
                  </p>
                </div>

                {/* Check 2: Students */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.students.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      2. Students Enrolled
                    </span>
                    {readiness.checks.students.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {readiness.checks.students.message} ({readiness.checks.students.enrolledCount})
                  </p>
                </div>

                {/* Check 3: Capacity */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.capacity.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      3. Class Capacities
                    </span>
                    {readiness.checks.capacity.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{readiness.checks.capacity.message}</p>
                </div>

                {/* Check 4: Teachers */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.teacherAssignments.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">4. Teacher Assigns</span>
                    {readiness.checks.teacherAssignments.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {readiness.checks.teacherAssignments.message}
                  </p>
                </div>

                {/* Check 5: Timetable */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.timetableConflicts.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      5. Timetable Clashes
                    </span>
                    {readiness.checks.timetableConflicts.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-rose-600" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {readiness.checks.timetableConflicts.message}
                  </p>
                </div>

                {/* Check 6: Academic Rules */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.academicRules.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">6. Academic Rules</span>
                    <Scale className="h-4 w-4 text-[#023e8a]" />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {readiness.checks.academicRules.message}
                  </p>
                </div>

                {/* Check 7: Fees */}
                <div
                  className={`rounded-xl border p-3 ${readiness.checks.feeSetup.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">7. Fee Setup</span>
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="mt-1 text-xs text-slate-600">{readiness.checks.feeSetup.message}</p>
                </div>
              </div>

              {/* Action Buttons for Readiness Pipeline */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                <div className="text-xs text-slate-600">
                  {readiness.status === 'open' ? (
                    <span className="font-semibold text-emerald-700">
                      Target period is open and operational.
                    </span>
                  ) : readiness.isApproved ? (
                    <span className="font-semibold text-[#023e8a]">
                      Readiness approved. Period is ready to be opened.
                    </span>
                  ) : (
                    <span>Verify checks above before authorizing target period opening.</span>
                  )}
                </div>

                <div className="flex gap-2">
                  {readiness.status !== 'open' && !readiness.isApproved && (
                    <Button
                      onClick={handleApproveReadiness}
                      disabled={!readiness.isReadyToOpen || approveReadinessMutation.isPending}
                      variant="outline"
                      className="gap-2 border-[#023e8a] text-[#023e8a] hover:bg-[#023e8a]/10"
                    >
                      {approveReadinessMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      Approve Target Readiness
                    </Button>
                  )}

                  {readiness.status !== 'open' && (
                    <Button
                      onClick={handleOpenPeriod}
                      disabled={
                        !readiness.isApproved ||
                        !readiness.isReadyToOpen ||
                        openPeriodMutation.isPending
                      }
                      className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      {openPeriodMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                      Open Target Period
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">Readiness check data unavailable.</p>
          )}
        </CardContent>
      </Card>

      {/* Outcome Breakdown Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-slate-800">
            Student Outcomes & Progression Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Promoted</span>
              <p className="text-lg font-bold text-[#023e8a]">{result.studentsPromoted}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Repeated</span>
              <p className="text-lg font-bold text-amber-700">{result.studentsRepeated}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Continued (Same Level)</span>
              <p className="text-lg font-bold text-slate-700">{result.studentsContinued}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Graduated (Completed)</span>
              <p className="text-lg font-bold text-emerald-700">{result.studentsGraduated}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Withdrawn</span>
              <p className="text-lg font-bold text-rose-700">{result.studentsWithdrawn}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <span className="text-xs text-slate-500">Transferred (Branch/Program)</span>
              <p className="text-lg font-bold text-purple-700">{result.studentsTransferred}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        {onReset ? (
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Start New Rollover
          </Button>
        ) : (
          <div />
        )}
        <div className="flex gap-3">
          <Link href="/classes">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4 text-[#023e8a]" /> View Target Classes
            </Button>
          </Link>
          <Link href="/academic-periods">
            <Button className="bg-[#023e8a] text-white hover:bg-[#00509d]">
              Go to Academic Periods <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
