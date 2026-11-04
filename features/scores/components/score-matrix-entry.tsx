'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, ChevronLeft, Save } from '@/components/icons';

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
import { useAssessmentsQuery } from '@/features/assessments/hooks/use-assessments';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { useAuth } from '@/features/auth/context/auth-context';

import { useBatchRecordScoresMutation, useScoresQuery } from '../hooks/use-scores';
import type { LetterGrade } from '../types';

interface StudentScoreRow {
  studentId: string;
  studentCode: string;
  nameEn: string;
  nameKh: string;
  gender: string;
  scoreObtained: number;
  isAbsent: boolean;
  remarks: string;
  percentage: number;
  letterGrade: LetterGrade;
}

const getGradeInfo = (
  score: number,
  maxScore: number,
): { percentage: number; letterGrade: LetterGrade } => {
  if (maxScore <= 0) return { percentage: 0, letterGrade: 'F' };
  const percentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100 * 100) / 100));
  if (percentage >= 90) return { percentage, letterGrade: 'A' };
  if (percentage >= 80) return { percentage, letterGrade: 'B' };
  if (percentage >= 70) return { percentage, letterGrade: 'C' };
  if (percentage >= 60) return { percentage, letterGrade: 'D' };
  if (percentage >= 50) return { percentage, letterGrade: 'E' };
  return { percentage, letterGrade: 'F' };
};

export const ScoreMatrixEntry = ({ initialAssessmentId }: { initialAssessmentId?: string }) => {
  const { hasPermission } = useAuth();
  const canRecordScores =
    hasPermission('score.create.assigned_subject') ||
    hasPermission('score.edit.assigned_subject') ||
    hasPermission('score.create.own_branch') ||
    hasPermission('score.edit.own_branch') ||
    hasPermission('score.create.all_branches') ||
    hasPermission('score.edit.all_branches');
  const [selectedAssessmentId, setSelectedAssessmentId] = React.useState<string>(
    initialAssessmentId ?? '',
  );
  const [editedScores, setEditedScores] = React.useState<
    Record<string, { scoreObtained: number; isAbsent: boolean; remarks: string }>
  >({});
  const [saveSuccess, setSaveSuccess] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const { data: assessmentsData } = useAssessmentsQuery({ limit: 100 });
  const assessments = assessmentsData?.data ?? [];

  const currentAssessment = assessments.find((a) => a._id === selectedAssessmentId);
  const targetClassId =
    currentAssessment && typeof currentAssessment.classId === 'object'
      ? currentAssessment.classId._id
      : typeof currentAssessment?.classId === 'string'
        ? currentAssessment.classId
        : undefined;

  const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useEnrollmentsQuery({
    classId: targetClassId,
    status: 'enrolled',
    limit: 100,
  });
  const enrollments = enrollmentsData?.data ?? [];

  const { data: existingScoresData, isLoading: isLoadingScores } = useScoresQuery({
    assessmentId: selectedAssessmentId || undefined,
  });
  const existingScores = existingScoresData?.data ?? [];

  const batchMutation = useBatchRecordScoresMutation();

  const handleAssessmentChange = (id: string) => {
    setSelectedAssessmentId(id);
    setEditedScores({});
    setSaveSuccess(false);
    setSaveError(null);
  };

  const rows = React.useMemo<StudentScoreRow[]>(() => {
    if (!currentAssessment || enrollments.length === 0) return [];
    const maxScore = currentAssessment.maxScore || 100;
    const scoreMap = new Map(
      existingScores.map((s) => [
        s.studentId && typeof s.studentId === 'object' ? s.studentId._id : (s.studentId as string),
        s,
      ]),
    );

    return enrollments.map((enr) => {
      const student =
        typeof enr.studentId === 'object' && enr.studentId
          ? (enr.studentId as {
              _id: string;
              studentId: string;
              firstName: string;
              lastName: string;
              khmerName?: string;
              gender?: string;
            })
          : null;

      const studentId = student ? student._id : (enr.studentId as unknown as string);
      const studentCode = student?.studentId ?? 'STU-000';
      const nameEn = student ? `${student.firstName} ${student.lastName}` : 'Student';
      const nameKh = student?.khmerName ?? '';
      const gender = student?.gender ?? '-';

      const edited = editedScores[studentId];
      const existing = scoreMap.get(studentId);

      const scoreObtained =
        edited !== undefined ? edited.scoreObtained : existing ? existing.scoreObtained : 0;
      const isAbsent =
        edited !== undefined ? edited.isAbsent : existing ? existing.isAbsent : false;
      const remarks =
        edited !== undefined ? edited.remarks : existing ? (existing.remarks ?? '') : '';

      const { percentage, letterGrade } = getGradeInfo(scoreObtained, maxScore);

      return {
        studentId,
        studentCode,
        nameEn,
        nameKh,
        gender,
        scoreObtained,
        isAbsent,
        remarks,
        percentage,
        letterGrade,
      };
    });
  }, [currentAssessment, enrollments, existingScores, editedScores]);

  const handleScoreChange = (studentId: string, currentRemarks: string, val: number) => {
    setSaveSuccess(false);
    setSaveError(null);
    const maxScore = currentAssessment?.maxScore || 100;
    const clampedScore = Math.max(0, Math.min(maxScore, val));

    setEditedScores((prev) => ({
      ...prev,
      [studentId]: {
        scoreObtained: clampedScore,
        isAbsent: false,
        remarks: prev[studentId]?.remarks ?? currentRemarks,
      },
    }));
  };

  const handleAbsentToggle = (
    studentId: string,
    currentScore: number,
    currentRemarks: string,
    isAbsent: boolean,
  ) => {
    setSaveSuccess(false);
    setSaveError(null);

    setEditedScores((prev) => ({
      ...prev,
      [studentId]: {
        scoreObtained: isAbsent ? 0 : (prev[studentId]?.scoreObtained ?? currentScore),
        isAbsent,
        remarks: prev[studentId]?.remarks ?? currentRemarks,
      },
    }));
  };

  const handleRemarksChange = (
    studentId: string,
    currentScore: number,
    currentAbsent: boolean,
    remarks: string,
  ) => {
    setSaveSuccess(false);
    setEditedScores((prev) => ({
      ...prev,
      [studentId]: {
        scoreObtained: prev[studentId]?.scoreObtained ?? currentScore,
        isAbsent: prev[studentId]?.isAbsent ?? currentAbsent,
        remarks,
      },
    }));
  };

  const handleSave = async () => {
    if (!selectedAssessmentId) return;
    try {
      setSaveError(null);
      await batchMutation.mutateAsync({
        assessmentId: selectedAssessmentId,
        scores: rows.map((r) => ({
          studentId: r.studentId,
          scoreObtained: r.scoreObtained,
          isAbsent: r.isAbsent,
          remarks: r.remarks,
        })),
      });
      setSaveSuccess(true);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save scores');
    }
  };

  const averageScore =
    rows.length > 0
      ? (rows.reduce((acc, curr) => acc + curr.scoreObtained, 0) / rows.length).toFixed(1)
      : '0.0';

  const passingCount = rows.filter(
    (r) => r.scoreObtained >= (currentAssessment?.passingScore ?? 50),
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Link
              href="/assessments"
              className="flex items-center text-xs font-medium text-slate-500 hover:text-slate-800"
            >
              <ChevronLeft className="size-3.5" /> Back to Assessments
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Student Score Matrix & Grade Entry
          </h1>
          <p className="text-sm text-slate-500">
            Record subject test scores and compute letter grades with real-time class averages.
          </p>
        </div>

        {canRecordScores && (
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              disabled={!selectedAssessmentId || rows.length === 0 || batchMutation.isPending}
              className="bg-[#023e8a] hover:bg-[#00509d]"
            >
              <Save className="mr-1.5 size-4" />
              {batchMutation.isPending ? 'Saving Scores...' : 'Save All Scores'}
            </Button>
          </div>
        )}
      </div>

      {/* Assessment Selector Bar */}
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Select Assessment / Examination
              </label>
              <Select
                value={selectedAssessmentId}
                onChange={(e) => handleAssessmentChange(e.target.value)}
              >
                <option value="">-- Choose an Assessment --</option>
                {assessments.map((a) => {
                  const cls = typeof a.classId === 'object' ? a.classId.className : a.classId;
                  const subject =
                    typeof a.subjectId === 'object' ? a.subjectId.nameEn : a.subjectId;
                  return (
                    <option key={a._id} value={a._id}>
                      [{a.code}] {a.name} — Class: {cls} ({subject})
                    </option>
                  );
                })}
              </Select>
            </div>

            {currentAssessment && (
              <div className="flex items-center justify-around rounded-lg border border-slate-200 bg-slate-50/75 p-2.5">
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-500">Max Score</p>
                  <p className="text-base font-bold text-slate-800">{currentAssessment.maxScore}</p>
                </div>
                <div className="h-7 w-px bg-slate-200" />
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-500">Class Average</p>
                  <p className="text-base font-bold text-[#00509d]">{averageScore} pts</p>
                </div>
                <div className="h-7 w-px bg-slate-200" />
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-500">Passing Rate</p>
                  <p className="text-base font-bold text-emerald-700">
                    {rows.length > 0 ? Math.round((passingCount / rows.length) * 100) : 0}%
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-medium text-emerald-800">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
          <span>All student scores and letter grades have been saved successfully.</span>
        </div>
      )}

      {saveError && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-800">
          <AlertCircle className="size-4 shrink-0 text-rose-600" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Matrix Table */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-100 px-6 py-4">
          <CardTitle className="text-base font-semibold text-slate-800">
            Enrolled Student Scoresheet
          </CardTitle>
          <CardDescription>{rows.length} students enrolled in this class roster</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {!selectedAssessmentId ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Please choose an assessment from the dropdown above to open the grading scoresheet.
            </div>
          ) : isLoadingEnrollments || isLoadingScores ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Loading class roster and scores...
            </div>
          ) : rows.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No active students enrolled in this class.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/75">
                    <TableHead className="w-12 text-center font-semibold text-slate-700">
                      #
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">
                      Student ID / Name
                    </TableHead>
                    <TableHead className="w-24 text-center font-semibold text-slate-700">
                      Gender
                    </TableHead>
                    <TableHead className="w-32 font-semibold text-slate-700">
                      Score ({currentAssessment?.maxScore} max)
                    </TableHead>
                    <TableHead className="w-24 text-center font-semibold text-slate-700">
                      Absent?
                    </TableHead>
                    <TableHead className="w-24 text-center font-semibold text-slate-700">
                      Percentage
                    </TableHead>
                    <TableHead className="w-24 text-center font-semibold text-slate-700">
                      Grade
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">Teacher Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.studentId}
                      className={
                        row.isAbsent ? 'bg-slate-50/50 opacity-70' : 'hover:bg-slate-50/60'
                      }
                    >
                      <TableCell className="text-center text-xs font-medium text-slate-500">
                        {index + 1}
                      </TableCell>

                      <TableCell>
                        <div>
                          <span className="font-mono text-xs font-semibold text-[#023e8a]">
                            {row.studentCode}
                          </span>
                          <p className="text-sm font-semibold text-slate-900">{row.nameEn}</p>
                          {row.nameKh && <p className="text-xs text-slate-500">{row.nameKh}</p>}
                        </div>
                      </TableCell>

                      <TableCell className="text-center text-xs text-slate-700 capitalize">
                        {row.gender}
                      </TableCell>

                      <TableCell>
                        <Input
                          type="number"
                          value={row.scoreObtained}
                          onChange={(e) =>
                            handleScoreChange(row.studentId, row.remarks, Number(e.target.value))
                          }
                          disabled={row.isAbsent || !canRecordScores}
                          min={0}
                          max={currentAssessment?.maxScore ?? 100}
                          className="h-9 w-24 text-center font-semibold"
                        />
                      </TableCell>

                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          checked={row.isAbsent}
                          disabled={!canRecordScores}
                          onChange={(e) =>
                            handleAbsentToggle(
                              row.studentId,
                              row.scoreObtained,
                              row.remarks,
                              e.target.checked,
                            )
                          }
                          className="size-4 rounded border-slate-300 text-rose-600"
                        />
                      </TableCell>

                      <TableCell className="text-center text-xs font-semibold text-slate-800">
                        {row.isAbsent ? '0%' : `${row.percentage}%`}
                      </TableCell>

                      <TableCell className="text-center">
                        <Badge
                          tone={
                            row.letterGrade === 'A' || row.letterGrade === 'B'
                              ? 'success'
                              : row.letterGrade === 'C' || row.letterGrade === 'D'
                                ? 'warning'
                                : 'danger'
                          }
                          className="font-bold"
                        >
                          {row.letterGrade}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Input
                          placeholder="Optional feedback..."
                          value={row.remarks}
                          disabled={!canRecordScores}
                          onChange={(e) =>
                            handleRemarksChange(
                              row.studentId,
                              row.scoreObtained,
                              row.isAbsent,
                              e.target.value,
                            )
                          }
                          className="h-9 text-xs"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
