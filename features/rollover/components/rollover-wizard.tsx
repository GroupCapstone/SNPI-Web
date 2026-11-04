'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Loader2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import {
  useApproveRolloverPlanMutation,
  useCreateRolloverPlanMutation,
  useExecuteRolloverPlanMutation,
  useUpdateRolloverPlanMutation,
  useValidateRolloverPlanMutation,
} from '../hooks/use-rollover';
import type { RolloverClassAction, RolloverPlan, RolloverStudentDecision } from '../types';
import { RolloverConflictsCard } from './rollover-conflicts-card';
import { RolloverSummaryReport } from './rollover-summary-report';

const STEPS = [
  { id: 1, label: 'Context' },
  { id: 2, label: 'Pre-Close' },
  { id: 3, label: 'Classes' },
  { id: 4, label: 'Students' },
  { id: 5, label: 'Drafts' },
  { id: 6, label: 'Execute' },
];

export const RolloverWizard: React.FC = () => {
  const { hasPermission } = useAuth();
  const canCreate =
    hasPermission('rollover.create.own_branch') || hasPermission('rollover.create.all_branches');
  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const canViewYears =
    hasPermission('academic_year.view.own_branch') ||
    hasPermission('academic_year.view.all_branches');
  const canViewPeriods =
    hasPermission('academic_period.view.own_branch') ||
    hasPermission('academic_period.view.all_branches');

  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<RolloverPlan | null>(null);

  // Step 1 Form state
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [selectedSourceYearId, setSelectedSourceYearId] = useState<string>('');
  const [selectedSourcePeriodId, setSelectedSourcePeriodId] = useState<string>('');
  const [selectedTargetYearId, setSelectedTargetYearId] = useState<string>('');
  const [selectedTargetPeriodId, setSelectedTargetPeriodId] = useState<string>('');

  const [carryClasses, setCarryClasses] = useState(true);
  const [carryTeacherSuggestions, setCarryTeacherSuggestions] = useState(true);
  const [carryScheduleSuggestions, setCarryScheduleSuggestions] = useState(true);

  // Queries
  const { data: branchesData, isLoading: loadingBranches } = useBranchesQuery(
    { limit: 100 },
    canCreate && canViewBranches,
  );
  const { data: academicYears, isLoading: loadingYears } = useAcademicYearsQuery(
    undefined,
    canCreate && canViewYears,
  );
  const { data: sourcePeriodsData } = useAcademicPeriodsQuery(
    selectedSourceYearId ? { academicYearId: selectedSourceYearId, limit: 50 } : { limit: 50 },
    canCreate && canViewPeriods,
  );
  const { data: targetPeriodsData } = useAcademicPeriodsQuery(
    selectedTargetYearId ? { academicYearId: selectedTargetYearId, limit: 50 } : { limit: 50 },
    canCreate && canViewPeriods,
  );

  // Mutations
  const createPlanMutation = useCreateRolloverPlanMutation();
  const updatePlanMutation = useUpdateRolloverPlanMutation();
  const validatePlanMutation = useValidateRolloverPlanMutation();
  const approvePlanMutation = useApproveRolloverPlanMutation();
  const executePlanMutation = useExecuteRolloverPlanMutation();

  const branches = branchesData?.data ?? [];
  const years = academicYears ?? [];
  const sourcePeriods = sourcePeriodsData?.data ?? [];
  const targetPeriods = targetPeriodsData?.data ?? [];

  // Handlers
  const handleGenerateDraft = async () => {
    if (
      !selectedBranchId ||
      !selectedSourceYearId ||
      !selectedSourcePeriodId ||
      !selectedTargetYearId ||
      !selectedTargetPeriodId
    ) {
      alert('Please select all required context fields.');
      return;
    }

    try {
      const res = await createPlanMutation.mutateAsync({
        branchId: selectedBranchId,
        sourceAcademicYearId: selectedSourceYearId,
        sourcePeriodId: selectedSourcePeriodId,
        targetAcademicYearId: selectedTargetYearId,
        targetPeriodId: selectedTargetPeriodId,
        options: {
          carryClasses,
          carryTeacherSuggestions,
          carryScheduleSuggestions,
          autoSectionDistribution: false,
        },
      });

      setPlan(res.data);
      setCurrentStep(2);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create rollover plan';
      alert(`Error: ${msg}`);
    }
  };

  const handleRunValidation = async () => {
    if (!plan) return;
    try {
      const res = await validatePlanMutation.mutateAsync(plan._id);
      setPlan({ ...plan, validationSummary: res.data });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Validation failed';
      alert(`Validation error: ${msg}`);
    }
  };

  const handleUpdateClassMapping = (
    index: number,
    field: 'targetClassName' | 'targetClassCode' | 'targetCapacity' | 'action',
    value: string | number,
  ) => {
    if (!plan) return;
    const updatedMappings = [...plan.classMappings];
    updatedMappings[index] = {
      ...updatedMappings[index],
      [field]: value,
    };
    setPlan({ ...plan, classMappings: updatedMappings });
  };

  const handleUpdateStudentDecision = (
    index: number,
    field: 'finalDecision' | 'reason',
    value: string,
  ) => {
    if (!plan) return;
    const updated = [...plan.studentDecisions];
    if (field === 'finalDecision') {
      updated[index] = {
        ...updated[index],
        finalDecision: value as RolloverStudentDecision,
        decision: value as RolloverStudentDecision,
      };
    } else {
      updated[index] = {
        ...updated[index],
        reason: value,
      };
    }
    setPlan({ ...plan, studentDecisions: updated });
  };

  const handleSaveDraftChanges = async () => {
    if (!plan) return;
    try {
      const res = await updatePlanMutation.mutateAsync({
        id: plan._id,
        data: {
          classMappings: plan.classMappings.map((m) => ({
            sourceClassId:
              typeof m.sourceClassId === 'object' ? m.sourceClassId._id : m.sourceClassId,
            targetClassName: m.targetClassName,
            targetClassCode: m.targetClassCode,
            targetProgramId: m.targetProgramId,
            targetLevelId: m.targetLevelId,
            targetSection: m.targetSection,
            targetCapacity: m.targetCapacity,
            action: m.action,
          })),
          studentDecisions: plan.studentDecisions.map((s) => ({
            studentId: typeof s.studentId === 'object' ? s.studentId._id : s.studentId,
            sourceEnrollmentId: s.sourceEnrollmentId,
            systemRecommendedDecision: s.systemRecommendedDecision,
            finalDecision: s.finalDecision || s.decision,
            decision: s.finalDecision || s.decision,
            targetClassId:
              typeof s.targetClassId === 'object' ? s.targetClassId._id : s.targetClassId,
            reason: s.reason,
          })),
        },
      });
      setPlan(res.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save modifications';
      alert(`Error: ${msg}`);
    }
  };

  const handleApprovePlan = async () => {
    if (!plan) return;
    try {
      const res = await approvePlanMutation.mutateAsync(plan._id);
      setPlan(res.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Approval failed';
      alert(`Approval error: ${msg}`);
    }
  };

  const handleExecutePlan = async () => {
    if (!plan) return;
    if (
      !confirm(
        `Are you sure you want to execute rollover plan ${plan.planCode}? This will atomically create target classes and enrollments, and seal the source period.`,
      )
    ) {
      return;
    }

    try {
      const res = await executePlanMutation.mutateAsync({
        id: plan._id,
        data: { closeSourcePeriod: true },
      });
      setPlan({ ...res.data, executionResult: res.executionResult });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Execution failed';
      alert(`Execution error: ${msg}`);
    }
  };

  if (!canCreate) {
    return (
      <Card className="border-slate-200 bg-white">
        <CardContent className="p-6 text-sm text-slate-600">
          You have view-only access to rollover plans. A rollover plan must be created by an
          authorized academic administrator.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wizard Progress Steps */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted =
            currentStep > step.id || (plan?.status === 'completed' && step.id === 6);

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isActive
                        ? 'bg-[#023e8a] text-white'
                        : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:inline ${
                    isActive ? 'font-bold text-[#023e8a]' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-all ${
                    currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* STEP 1: CONTEXT SELECTION */}
      {currentStep === 1 && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#023e8a]">
              <Sparkles className="h-5 w-5 text-[#ffc300]" />
              Step 1: Select Academic Rollover Context
            </CardTitle>
            <CardDescription>
              Select the source academic period to finalize and the target academic period to
              populate. Historical context will be sealed and read-only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Campus Branch */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-semibold tracking-normal text-slate-600 uppercase">
                  Campus Branch *
                </label>
                <Select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  disabled={loadingBranches}
                  className="w-full"
                >
                  <option value="">Select Campus Branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn} ({b.branchCode})
                    </option>
                  ))}
                </Select>
              </div>

              {/* Source Context */}
              <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <h4 className="flex items-center gap-2 font-semibold text-slate-800">
                  <Lock className="h-4 w-4 text-[#023e8a]" /> Source Context (To Finalize & Seal)
                </h4>

                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Source Academic Year *</label>
                  <Select
                    value={selectedSourceYearId}
                    onChange={(e) => setSelectedSourceYearId(e.target.value)}
                    disabled={loadingYears}
                    className="w-full"
                  >
                    <option value="">Select Source Year</option>
                    {years.map((y) => (
                      <option key={y._id} value={y._id}>
                        {y.name} ({y.code})
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Source Academic Period *</label>
                  <Select
                    value={selectedSourcePeriodId}
                    onChange={(e) => setSelectedSourcePeriodId(e.target.value)}
                    disabled={!selectedSourceYearId}
                    className="w-full"
                  >
                    <option value="">Select Source Period</option>
                    {sourcePeriods.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.code}) - {p.status}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Target Context */}
              <div className="space-y-4 rounded-xl border border-[#023e8a]/20 bg-[#023e8a]/5 p-4">
                <h4 className="flex items-center gap-2 font-semibold text-[#023e8a]">
                  <Sparkles className="h-4 w-4 text-[#ffc300]" /> Target Context (To Populate)
                </h4>

                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Target Academic Year *</label>
                  <Select
                    value={selectedTargetYearId}
                    onChange={(e) => setSelectedTargetYearId(e.target.value)}
                    disabled={loadingYears}
                    className="w-full"
                  >
                    <option value="">Select Target Year</option>
                    {years.map((y) => (
                      <option key={y._id} value={y._id}>
                        {y.name} ({y.code})
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-600">Target Academic Period *</label>
                  <Select
                    value={selectedTargetPeriodId}
                    onChange={(e) => setSelectedTargetPeriodId(e.target.value)}
                    disabled={!selectedTargetYearId}
                    className="w-full"
                  >
                    <option value="">Select Target Period</option>
                    {targetPeriods.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.code}) - {p.status}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Carry Options */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-800">
                Carry-Forward Options & Suggestions
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={carryClasses}
                    onChange={(e) => setCarryClasses(e.target.checked)}
                    className="rounded text-[#023e8a]"
                  />
                  <span>Create Target Class Offerings</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={carryTeacherSuggestions}
                    onChange={(e) => setCarryTeacherSuggestions(e.target.checked)}
                    className="rounded text-[#023e8a]"
                  />
                  <span>Carry Teacher Assignments (Draft)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={carryScheduleSuggestions}
                    onChange={(e) => setCarryScheduleSuggestions(e.target.checked)}
                    className="rounded text-[#023e8a]"
                  />
                  <span>Carry Class Schedules (Draft)</span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleGenerateDraft}
                disabled={createPlanMutation.isPending}
                className="gap-2 bg-[#023e8a] px-6 text-white hover:bg-[#00509d]"
              >
                {createPlanMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 text-[#ffc300]" />
                )}
                Analyze Context & Generate Plan Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: PRE-CLOSE & VALIDATION */}
      {currentStep === 2 && plan && (
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-lg font-bold text-[#023e8a]">
                Step 2: Pre-Close Validation & Safety Checklist
              </CardTitle>
              <CardDescription>
                Plan Code: <span className="font-semibold">{plan.planCode}</span>. Review all
                blocking issues vs warnings.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRunValidation}
              disabled={validatePlanMutation.isPending}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 text-[#023e8a] ${
                  validatePlanMutation.isPending ? 'animate-spin' : ''
                }`}
              />
              Re-validate Checks
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <RolloverConflictsCard summary={plan.validationSummary} />

            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500">Proposed Classes</span>
                <p className="text-lg font-bold text-[#023e8a]">{plan.classMappings.length}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500">Students Analyzed</span>
                <p className="text-lg font-bold text-[#00509d]">{plan.studentDecisions.length}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500">Current Status</span>
                <p className="text-lg font-bold text-slate-800 uppercase">{plan.status}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <span className="text-slate-500">Execution Blockers</span>
                <p
                  className={`text-lg font-bold ${
                    (plan.validationSummary?.blockingIssues.length ?? 0) > 0
                      ? 'text-rose-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {plan.validationSummary?.blockingIssues.length ?? 0}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Context
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="gap-2 bg-[#023e8a] text-white hover:bg-[#00509d]"
              >
                Review Target Classes <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: TARGET CLASS MAPPINGS */}
      {currentStep === 3 && plan && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#023e8a]">
              Step 3: Review Target Class Instances
            </CardTitle>
            <CardDescription>
              Adjust class names, codes, capacity, and section distribution for the target period.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Target Class Name</TableHead>
                    <TableHead>Class Code</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plan.classMappings.map((mapping, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Input
                          value={mapping.targetClassName}
                          onChange={(e) =>
                            handleUpdateClassMapping(idx, 'targetClassName', e.target.value)
                          }
                          className="h-8 text-xs font-semibold"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={mapping.targetClassCode}
                          onChange={(e) =>
                            handleUpdateClassMapping(
                              idx,
                              'targetClassCode',
                              e.target.value.toUpperCase(),
                            )
                          }
                          className="h-8 font-mono text-xs"
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-[#023e8a]">
                        {mapping.targetSection}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={mapping.targetCapacity}
                          onChange={(e) =>
                            handleUpdateClassMapping(
                              idx,
                              'targetCapacity',
                              parseInt(e.target.value, 10) || 30,
                            )
                          }
                          className="h-8 w-20 text-xs"
                          min={1}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={mapping.action}
                          onChange={(e) =>
                            handleUpdateClassMapping(
                              idx,
                              'action',
                              e.target.value as RolloverClassAction,
                            )
                          }
                          className="h-8 text-xs"
                        >
                          <option value="CREATE_NEW">Create New</option>
                          <option value="MAP_EXISTING">Map Existing</option>
                          <option value="SKIP">Skip</option>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Validation
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSaveDraftChanges}
                  disabled={updatePlanMutation.isPending}
                >
                  Save Modifications
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  className="gap-2 bg-[#023e8a] text-white hover:bg-[#00509d]"
                >
                  Configure Students <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 4: STUDENT DECISIONS */}
      {currentStep === 4 && plan && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#023e8a]">
              Step 4: Student Progression Roster & Decisions
            </CardTitle>
            <CardDescription>
              Review automated decisions based on approved Term Results. You can adjust outcomes as
              needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-h-96 overflow-y-auto rounded-xl border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>System Recommendation</TableHead>
                    <TableHead>Final Decision (Override)</TableHead>
                    <TableHead>Rationale / Note</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plan.studentDecisions.map((decision, idx) => {
                    const studentObj =
                      typeof decision.studentId === 'object' ? decision.studentId : null;
                    const studentLabel = studentObj
                      ? `${studentObj.firstName} ${studentObj.lastName} (${studentObj.studentId})`
                      : String(decision.studentId);
                    const systemRec =
                      decision.systemRecommendedDecision || decision.decision || 'CONTINUE';
                    const finalDec = decision.finalDecision || decision.decision || systemRec;
                    const isOverridden = finalDec !== systemRec;

                    return (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-semibold text-slate-800">
                          {studentLabel}
                        </TableCell>
                        <TableCell>
                          <Badge
                            tone="neutral"
                            className="border-slate-300 text-xs font-semibold text-slate-700"
                          >
                            {systemRec}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={finalDec}
                              onChange={(e) =>
                                handleUpdateStudentDecision(idx, 'finalDecision', e.target.value)
                              }
                              className={`h-8 text-xs font-medium ${
                                isOverridden ? 'border-amber-500 bg-amber-50/50' : ''
                              }`}
                            >
                              <option value="PROMOTE">PROMOTE (Advance Level)</option>
                              <option value="CONTINUE">CONTINUE (Same Level)</option>
                              <option value="REPEAT">REPEAT (Repeat Attempt)</option>
                              <option value="HOLD">HOLD (Retain on Hold)</option>
                              <option value="GRADUATE">GRADUATE (Completed)</option>
                              <option value="WITHDRAW">WITHDRAW (Left School)</option>
                              <option value="TRANSFER">TRANSFER (New Branch/Class)</option>
                            </Select>
                            {isOverridden && (
                              <Badge className="bg-[#ffc300] text-xs font-semibold text-slate-900">
                                Overridden
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={decision.reason || ''}
                            onChange={(e) =>
                              handleUpdateStudentDecision(idx, 'reason', e.target.value)
                            }
                            placeholder="Reason for decision override"
                            className="h-8 text-xs"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(3)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Classes
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSaveDraftChanges}
                  disabled={updatePlanMutation.isPending}
                >
                  Save Decisions
                </Button>
                <Button
                  onClick={() => setCurrentStep(5)}
                  className="gap-2 bg-[#023e8a] text-white hover:bg-[#00509d]"
                >
                  Review Staff & Schedules <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 5: TEACHER & SCHEDULE PREVIEW */}
      {currentStep === 5 && plan && (
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-[#023e8a]">
              Step 5: Staff & Timetable Draft Templates
            </CardTitle>
            <CardDescription>
              Teacher assignments and class schedules carried forward as draft suggestions into the
              target period.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Users className="h-4 w-4 text-[#023e8a]" /> Teacher Assignment Suggestions
                </div>
                <p className="text-xs text-slate-600">
                  {plan.options.carryTeacherSuggestions
                    ? 'Active teacher assignments will be linked to the new target classes as initial drafts.'
                    : 'Teacher assignments carry-forward is disabled.'}
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <Calendar className="h-4 w-4 text-[#00509d]" /> Timetable Draft Templates
                </div>
                <p className="text-xs text-slate-600">
                  {plan.options.carryScheduleSuggestions
                    ? 'Active class schedule templates will be copied and conflict-checked prior to activation.'
                    : 'Schedule carry-forward is disabled.'}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep(4)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Students
              </Button>
              <Button
                onClick={() => setCurrentStep(6)}
                className="gap-2 bg-[#023e8a] text-white hover:bg-[#00509d]"
              >
                Proceed to Final Execution <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 6: PREVIEW, APPROVAL & ATOMIC EXECUTION */}
      {currentStep === 6 && plan && (
        <div className="space-y-6">
          {plan.status === 'completed' ? (
            <RolloverSummaryReport
              plan={plan}
              onReset={() => {
                setPlan(null);
                setCurrentStep(1);
              }}
            />
          ) : (
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#023e8a]">
                  Step 6: Authorization & Atomic Rollover Execution
                </CardTitle>
                <CardDescription>
                  Pre-flight confirmation for plan{' '}
                  <span className="font-semibold">{plan.planCode}</span>.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status & Approvals */}
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <span className="text-xs text-slate-500">Approval Workflow Status</span>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge
                        className={
                          plan.status === 'approved'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }
                      >
                        {plan.status.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-600">
                        {plan.status === 'approved'
                          ? 'Authorized by Academic Director / Manager'
                          : 'Pending authorization before execution'}
                      </span>
                    </div>
                  </div>

                  {plan.status !== 'approved' && (
                    <Button
                      onClick={handleApprovePlan}
                      disabled={approvePlanMutation.isPending}
                      variant="outline"
                      className="gap-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                    >
                      <ShieldCheck className="h-4 w-4" /> Authorize Plan
                    </Button>
                  )}
                </div>

                {/* Final Execution Button */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6 text-center">
                  <h4 className="text-base font-bold text-slate-900">Ready for Live Execution</h4>
                  <p className="mx-auto mt-1 max-w-md text-xs text-slate-600">
                    This operation is executed atomically inside a MongoDB transaction. If any
                    failure occurs, all modifications are automatically rolled back.
                  </p>

                  <Button
                    size="lg"
                    onClick={handleExecutePlan}
                    disabled={plan.status !== 'approved' || executePlanMutation.isPending}
                    className="mt-6 bg-[#023e8a] px-8 py-6 text-base font-bold text-white hover:bg-[#00509d]"
                  >
                    {executePlanMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Executing Transaction...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5 text-[#ffc300]" /> Atomically Execute
                        Rollover
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex justify-start pt-4">
                  <Button variant="outline" onClick={() => setCurrentStep(5)} className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Timetable
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
