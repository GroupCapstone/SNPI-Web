'use client';

import * as React from 'react';
import {
  Award,
  CheckCircle2,
  RefreshCw,
  Calculator,
  Send,
  SearchCheck,
  ShieldCheck,
} from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TermResult } from '../types';
import {
  useCalculateClassTermResultsMutation,
  useTermResultsQuery,
  useTransitionTermResultMutation,
} from '../hooks/use-term-results';
import { CompleteTermDialog } from './complete-term-dialog';
import { getClasses } from '@/features/classes/api/class-api';
import type { ClassItem } from '@/features/classes/types';
import { useAuth } from '@/features/auth/context/auth-context';
import { openOfficialPdf } from '@/features/reports/api/report-api';

interface TermResultTableProps {
  mode?: 'results' | 'completion' | 'promotions';
}

export const TermResultTable: React.FC<TermResultTableProps> = ({ mode = 'results' }) => {
  const { hasPermission } = useAuth();
  const [currentMode, setCurrentMode] = React.useState<'results' | 'completion' | 'promotions'>(
    mode,
  );
  const [classes, setClasses] = React.useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [workflowFilter, setWorkflowFilter] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedResult, setSelectedResult] = React.useState<TermResult | null>(null);

  React.useEffect(() => {
    getClasses({ limit: 100 })
      .then((res) => {
        setClasses(res.data || []);
      })
      .catch((err: unknown) => {
        console.error('Failed to load classes', err);
      });
  }, []);

  const isCompleted =
    currentMode === 'completion' ? false : currentMode === 'promotions' ? undefined : undefined;

  const { data, isLoading, refetch } = useTermResultsQuery({
    classId: selectedClassId || undefined,
    resultStatus: statusFilter || undefined,
    workflowStatus: workflowFilter || undefined,
    isCompleted,
    limit: 50,
  });

  const calculateMutation = useCalculateClassTermResultsMutation();
  const transitionMutation = useTransitionTermResultMutation();
  const results = data?.data || [];
  const canCalculate =
    hasPermission('term_result.create.own_branch') ||
    hasPermission('term_result.create.all_branches');
  const canSubmit =
    hasPermission('term_result.submit.own_branch') ||
    hasPermission('term_result.submit.all_branches');
  const canReview =
    hasPermission('term_result.review.own_branch') ||
    hasPermission('term_result.review.all_branches');
  const canApprove =
    hasPermission('term_result.approve.own_branch') ||
    hasPermission('term_result.approve.all_branches');
  const canFinalize =
    hasPermission('term_result.finalize.own_branch') ||
    hasPermission('term_result.finalize.all_branches');
  const canGenerateCertificate =
    hasPermission('report_card.generate.own_branch') ||
    hasPermission('report_card.generate.all_branches');

  const transitionConfig = (status: TermResult['workflowStatus']) => {
    if (status === 'CALCULATED' || status === 'CORRECTED') {
      return canSubmit ? { next: 'SUBMITTED' as const, label: 'Submit', icon: Send } : null;
    }
    if (status === 'SUBMITTED') {
      return canReview ? { next: 'REVIEWED' as const, label: 'Review', icon: SearchCheck } : null;
    }
    if (status === 'REVIEWED') {
      return canApprove
        ? { next: 'APPROVED' as const, label: 'Approve & Lock', icon: ShieldCheck }
        : null;
    }
    return null;
  };

  const handleTransition = async (result: TermResult) => {
    const transition = transitionConfig(result.workflowStatus);
    if (!transition) return;
    const confirmed = confirm(
      `${transition.label} this result? This action is audited and approval locks it for finalization.`,
    );
    if (!confirmed) return;
    try {
      await transitionMutation.mutateAsync({
        id: result._id,
        data: {
          status: transition.next,
          reason: `${transition.label} from term results workspace`,
        },
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unable to update result workflow');
    }
  };

  const handleCalculateClass = async () => {
    if (!selectedClassId) {
      alert('Please select a class first to calculate term results.');
      return;
    }
    try {
      const res = await calculateMutation.mutateAsync(selectedClassId);
      alert(
        `Successfully calculated term scores and grades for ${res.data?.calculatedCount || 0} students.`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to calculate class results';
      alert(message);
    }
  };

  const handleOpenComplete = (result: TermResult) => {
    setSelectedResult(result);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setCurrentMode('results')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
            currentMode === 'results'
              ? 'bg-[#023e8a] text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Term Results (លទ្ធផលរួម)
        </button>
        <button
          type="button"
          onClick={() => setCurrentMode('completion')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
            currentMode === 'completion'
              ? 'bg-[#023e8a] text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Course Completion Workflow (សិស្សរៀនចប់វគ្គ)
        </button>
        <button
          type="button"
          onClick={() => setCurrentMode('promotions')}
          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
            currentMode === 'promotions'
              ? 'bg-[#023e8a] text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Promotions & Repeat Tracking (ឡើងថ្នាក់ / ត្រួតថ្នាក់)
        </button>
      </div>

      {/* Result State Machine Pipeline Bar */}
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#023e8a]" />
          <span className="text-xs font-bold text-slate-800">
            Official Result State Machine Pipeline:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="rounded bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
            1. CALCULATED
          </span>
          <span className="text-slate-400">→</span>
          <span className="rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-800">
            2. SUBMITTED
          </span>
          <span className="text-slate-400">→</span>
          <span className="rounded bg-sky-100 px-2 py-0.5 font-semibold text-sky-800">
            3. REVIEWED
          </span>
          <span className="text-slate-400">→</span>
          <span className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-900">
            4. APPROVED
          </span>
          <span className="text-slate-400">→</span>
          <span className="rounded bg-emerald-100 px-2 py-0.5 font-semibold text-emerald-800">
            5. FINALIZED
          </span>
        </div>
      </div>

      {/* Header controls - single row, no shadow */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-1 items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            aria-label="Filter by Class"
            className="h-10 min-w-[200px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-none focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className} ({c.classCode})
              </option>
            ))}
          </select>

          <select
            value={workflowFilter}
            onChange={(e) => setWorkflowFilter(e.target.value)}
            aria-label="Filter by Workflow Status"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-none focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">All Workflow Stages</option>
            <option value="CALCULATED">Calculated</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="APPROVED">Approved</option>
            <option value="FINALIZED">Finalized</option>
            <option value="CORRECTED">Corrected</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Result"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-none focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PASSED">Passed</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {selectedClassId && canCalculate && (
            <Button
              size="sm"
              disabled={calculateMutation.isPending}
              onClick={() => void handleCalculateClass()}
              className="bg-[#023e8a] text-white shadow-none hover:bg-[#00509d]"
            >
              <Calculator className="mr-1 h-4 w-4" />
              {calculateMutation.isPending ? 'Calculating...' : 'Recalculate Class Results'}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            className="border-slate-300 shadow-none"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Table Container - no shadow */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-b border-slate-200">
              <TableHead className="font-semibold text-slate-700">Student</TableHead>
              <TableHead className="font-semibold text-slate-700">Class & Period</TableHead>
              <TableHead className="font-semibold text-slate-700">Avg Score</TableHead>
              <TableHead className="font-semibold text-slate-700">Grade / GPA</TableHead>
              <TableHead className="font-semibold text-slate-700">Attendance</TableHead>
              <TableHead className="font-semibold text-slate-700">Result</TableHead>
              <TableHead className="font-semibold text-slate-700">Progression</TableHead>
              <TableHead className="font-semibold text-slate-700">Workflow</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="py-8 text-center text-slate-500">
                  Loading term results...
                </TableCell>
              </TableRow>
            ) : results.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-8 text-center text-slate-500">
                  No term results found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              results.map((item) => {
                const studentName =
                  item.studentId?.khmerName ||
                  item.studentId?.englishName ||
                  item.studentId?.studentId;

                const className =
                  typeof item.classId === 'object' && item.classId !== null
                    ? `${item.classId.className}`
                    : String(item.classId);

                const periodName =
                  typeof item.academicPeriodId === 'object' && item.academicPeriodId !== null
                    ? `${item.academicPeriodId.name}`
                    : String(item.academicPeriodId);

                return (
                  <TableRow key={item._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <TableCell>
                      <div>
                        <span className="font-semibold text-slate-900">{studentName}</span>
                        <span className="block text-xs text-slate-500">
                          {item.studentId?.studentId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="text-sm font-medium text-slate-800">{className}</span>
                        <span className="block text-xs text-slate-500">{periodName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-[#023e8a]">{item.averageScore}%</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                        {item.letterGrade}{' '}
                        <span className="text-xs text-slate-500">(GPA {item.gpa})</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">{item.attendanceRate}%</TableCell>
                    <TableCell>
                      <Badge tone={item.resultStatus === 'PASSED' ? 'success' : 'danger'}>
                        {item.resultStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800">
                        {item.promotionStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        tone={
                          ['APPROVED', 'FINALIZED'].includes(item.workflowStatus)
                            ? 'success'
                            : item.workflowStatus === 'SUBMITTED' ||
                                item.workflowStatus === 'REVIEWED'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {item.workflowStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Pending Term End
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {(!item.isCompleted &&
                        (Boolean(transitionConfig(item.workflowStatus)) ||
                          (item.workflowStatus === 'APPROVED' && canFinalize))) ||
                      (item.workflowStatus === 'FINALIZED' &&
                        item.resultStatus === 'PASSED' &&
                        item.gpa >= 2 &&
                        item.attendanceRate >= 80 &&
                        canGenerateCertificate) ? (
                        <div className="flex justify-end gap-2">
                          {!item.isCompleted && transitionConfig(item.workflowStatus) && (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={transitionMutation.isPending}
                              onClick={() => void handleTransition(item)}
                              className="h-8 px-2 text-xs"
                            >
                              {React.createElement(transitionConfig(item.workflowStatus)!.icon, {
                                className: 'mr-1 size-3.5',
                              })}
                              {transitionConfig(item.workflowStatus)!.label}
                            </Button>
                          )}
                          {!item.isCompleted &&
                            item.workflowStatus === 'APPROVED' &&
                            canFinalize && (
                              <Button
                                size="sm"
                                onClick={() => handleOpenComplete(item)}
                                className="h-8 bg-emerald-700 px-2 text-xs text-white shadow-none hover:bg-emerald-800"
                              >
                                Complete Term
                              </Button>
                            )}
                          {item.workflowStatus === 'FINALIZED' &&
                            item.resultStatus === 'PASSED' &&
                            item.gpa >= 2 &&
                            item.attendanceRate >= 80 &&
                            canGenerateCertificate && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  void openOfficialPdf(
                                    `/reports/certificates/${item._id}/pdf`,
                                  ).catch((error: unknown) =>
                                    alert(
                                      error instanceof Error
                                        ? error.message
                                        : 'Unable to generate certificate',
                                    ),
                                  )
                                }
                                className="h-8 border-amber-300 px-2 text-xs text-amber-800"
                              >
                                <Award className="mr-1 size-3.5" /> Certificate
                              </Button>
                            )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {canFinalize && (
        <CompleteTermDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          result={selectedResult}
        />
      )}
    </div>
  );
};
