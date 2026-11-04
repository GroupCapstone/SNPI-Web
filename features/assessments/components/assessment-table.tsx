'use client';

import * as React from 'react';
import Link from 'next/link';
import { Calendar, Edit2, FileSpreadsheet, Plus, Search, Trash2 } from '@/components/icons';

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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useAuth } from '@/features/auth/context/auth-context';

import { useAssessmentsQuery, useDeleteAssessmentMutation } from '../hooks/use-assessments';
import type { Assessment, AssessmentFilters, AssessmentStatus, AssessmentType } from '../types';
import { AssessmentDialog } from './assessment-dialog';
import { ExamScheduleView } from './exam-schedule-view';
import { useTranslation } from '@/lib/i18n';

export const AssessmentTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { currentBranchId, hasPermission } = useAuth();
  const [filters, setFilters] = React.useState<AssessmentFilters>({
    page: 1,
    limit: 20,
    branchId: currentBranchId !== 'all' ? currentBranchId : undefined,
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedAssessment, setSelectedAssessment] = React.useState<Assessment | null>(null);

  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const { data: branchesData } = useBranchesQuery({}, canViewBranches);
  const branches = branchesData?.data ?? [];

  const { data, isLoading } = useAssessmentsQuery(filters);
  const deleteMutation = useDeleteAssessmentMutation();

  const assessments = data?.data ?? [];
  const pagination = data?.pagination;
  const canCreate =
    hasPermission('assessment.create.own_branch') ||
    hasPermission('assessment.create.all_branches');
  const canEdit =
    hasPermission('assessment.edit.own_branch') || hasPermission('assessment.edit.all_branches');
  const canDelete =
    hasPermission('assessment.delete.own_branch') ||
    hasPermission('assessment.delete.all_branches');
  const canViewScores =
    hasPermission('score.view.assigned_subject') ||
    hasPermission('score.view.own_branch') ||
    hasPermission('score.view.all_branches');

  const handleEdit = (item: Assessment) => {
    setSelectedAssessment(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedAssessment(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete assessment "${name}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const [viewMode, setViewMode] = React.useState<'table' | 'schedule'>('table');

  return (
    <div className="space-y-6">
      {/* Header with Stats & View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Assessments & Examinations
          </h1>
          <p className="text-xs text-slate-500">
            Define syllabus tests, quizzes, midterms, finals, and classroom hall allocations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#023e8a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Registry
            </button>
            <button
              type="button"
              onClick={() => setViewMode('schedule')}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'schedule'
                  ? 'bg-[#023e8a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="size-3.5" />
              Exam Schedules
            </button>
          </div>

          {canViewScores && (
            <Link href="/scores">
              <Button
                variant="outline"
                className="border-amber-300 text-xs text-amber-800 hover:bg-amber-50"
              >
                <FileSpreadsheet className="mr-1.5 size-4" />
                Score Matrix
              </Button>
            </Link>
          )}

          {canCreate && (
            <Button onClick={handleCreate} className="bg-[#023e8a] text-xs hover:bg-[#00509d]">
              <Plus className="mr-1.5 size-4" />
              New Assessment
            </Button>
          )}
        </div>
      </div>

      {viewMode === 'schedule' ? (
        <ExamScheduleView />
      ) : (
        <>
          <Card className="border-slate-200">
            <CardContent className="p-3.5">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                  <Search className="absolute top-2.5 left-2.5 size-4 text-slate-400" />
                  <Input
                    placeholder={
                      isKhmer ? 'ស្វែងរកតាមចំណងជើង ឬកូដ...' : 'Search by title or code...'
                    }
                    value={filters.search ?? ''}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                    }
                    className="h-9 pl-8 text-xs font-medium sm:text-sm"
                  />
                </div>

                {canViewBranches && (
                  <Select
                    value={filters.branchId ?? ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        branchId: e.target.value || undefined,
                        page: 1,
                      }))
                    }
                    className="h-9 text-xs font-medium sm:text-sm"
                  >
                    <option value="">{isKhmer ? 'គ្រប់សាខា' : 'All Branches'}</option>
                    {branches.map((b) => (
                      <option key={b._id} value={b._id}>
                        {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                      </option>
                    ))}
                  </Select>
                )}

                <Select
                  value={filters.type ?? ''}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      type: (e.target.value as AssessmentType) || undefined,
                      page: 1,
                    }))
                  }
                  className="h-9 text-xs font-medium sm:text-sm"
                >
                  <option value="">{isKhmer ? 'គ្រប់ប្រភេទការវាយតម្លៃ' : 'All Types'}</option>
                  <option value="quiz">{isKhmer ? 'កម្រងសំណួរ (Quiz)' : 'Quiz'}</option>
                  <option value="assignment">
                    {isKhmer ? 'កិច្ចការផ្ទះ (Assignment)' : 'Assignment'}
                  </option>
                  <option value="monthly_test">
                    {isKhmer ? 'ប្រឡងប្រចាំខែ (Monthly Test)' : 'Monthly Test'}
                  </option>
                  <option value="midterm">
                    {isKhmer ? 'ប្រឡងឆមាស (Midterm Exam)' : 'Midterm Exam'}
                  </option>
                  <option value="final">
                    {isKhmer ? 'ប្រឡងបញ្ចប់ (Final Exam)' : 'Final Exam'}
                  </option>
                </Select>

                <Select
                  value={filters.status ?? ''}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: (e.target.value as AssessmentStatus) || undefined,
                      page: 1,
                    }))
                  }
                  className="h-9 text-xs font-medium sm:text-sm"
                >
                  <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
                  <option value="draft">{isKhmer ? 'ព្រាងទុក' : 'Draft'}</option>
                  <option value="published">{isKhmer ? 'បានផ្សព្វផ្សាយ' : 'Published'}</option>
                  <option value="closed">{isKhmer ? 'បានបិទ' : 'Closed'}</option>
                </Select>
              </div>

              {(Boolean(filters.search) ||
                Boolean(filters.branchId) ||
                Boolean(filters.type) ||
                Boolean(filters.status)) && (
                <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
                  <span>{isKhmer ? 'តម្រងសកម្មត្រូវបានអនុវត្ត' : 'Active filters applied'}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({ page: 1, limit: 20 });
                    }}
                    className="flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                  >
                    <Trash2 className="size-3.5" />
                    {t.common.clearFilters}
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Main Table */}
          <Card className="border-slate-200">
            <CardHeader className="border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-base font-semibold text-slate-800">
                Assessment Schedules & Configurations
              </CardTitle>
              <CardDescription>
                Total of {pagination?.total ?? assessments.length} configured tests
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/75">
                      <TableHead className="font-semibold text-slate-700">Code / Title</TableHead>
                      <TableHead className="font-semibold text-slate-700">Target Class</TableHead>
                      <TableHead className="font-semibold text-slate-700">Subject</TableHead>
                      <TableHead className="font-semibold text-slate-700">Type</TableHead>
                      <TableHead className="font-semibold text-slate-700">Max / Pass</TableHead>
                      <TableHead className="font-semibold text-slate-700">Weight</TableHead>
                      <TableHead className="font-semibold text-slate-700">Exam Date</TableHead>
                      <TableHead className="font-semibold text-slate-700">
                        Room / Proctors
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700">Status</TableHead>
                      {(canViewScores || canEdit || canDelete) && (
                        <TableHead className="text-right font-semibold text-slate-700">
                          Actions
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={10} className="py-8 text-center text-sm text-slate-500">
                          Loading assessments...
                        </TableCell>
                      </TableRow>
                    ) : assessments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="py-8 text-center text-sm text-slate-500">
                          No assessments found matching the criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      assessments.map((item) => {
                        const cls =
                          typeof item.classId === 'object' ? item.classId.className : item.classId;
                        const subject =
                          typeof item.subjectId === 'object'
                            ? item.subjectId.nameEn
                            : item.subjectId;

                        return (
                          <TableRow key={item._id} className="hover:bg-slate-50/60">
                            <TableCell>
                              <div>
                                <span className="font-mono text-xs font-semibold text-[#023e8a]">
                                  {item.code}
                                </span>
                                <p className="text-sm font-medium text-slate-900">{item.name}</p>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                                {cls}
                              </span>
                            </TableCell>

                            <TableCell>
                              <span className="text-xs font-medium text-slate-800">{subject}</span>
                            </TableCell>

                            <TableCell>
                              <Badge className="capitalize">{item.type.replace('_', ' ')}</Badge>
                            </TableCell>

                            <TableCell className="text-xs font-medium text-slate-700">
                              {item.maxScore} pts / pass: {item.passingScore}
                            </TableCell>

                            <TableCell>
                              <span className="font-semibold text-emerald-700">
                                {item.weightPercentage}%
                              </span>
                            </TableCell>

                            <TableCell className="text-xs text-slate-600">
                              {item.assessmentDate
                                ? new Date(item.assessmentDate).toLocaleDateString()
                                : '-'}
                            </TableCell>

                            <TableCell>
                              <div className="min-w-36 text-xs leading-4 text-slate-600">
                                <p className="font-semibold text-slate-800">
                                  {typeof item.classroomId === 'object'
                                    ? `${item.classroomId.code} - ${item.classroomId.name}`
                                    : 'No room assigned'}
                                </p>
                                <p>
                                  {item.startTime && item.endTime
                                    ? `${item.startTime}-${item.endTime}`
                                    : 'Time not assigned'}
                                </p>
                                <p>{item.proctorIds?.length ?? 0} proctor(s)</p>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Badge
                                tone={
                                  item.status === 'published'
                                    ? 'success'
                                    : item.status === 'draft'
                                      ? 'warning'
                                      : 'neutral'
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>

                            {(canViewScores || canEdit || canDelete) && (
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {canViewScores && (
                                    <Link href={`/scores?assessmentId=${item._id}`}>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 text-xs text-[#00509d] hover:bg-blue-50"
                                      >
                                        <FileSpreadsheet className="mr-1 size-3.5" />
                                        Scores
                                      </Button>
                                    </Link>
                                  )}

                                  {canEdit && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEdit(item)}
                                      className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
                                    >
                                      <Edit2 className="size-3.5" />
                                    </Button>
                                  )}

                                  {canDelete && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDelete(item._id, item.name)}
                                      className="h-8 w-8 p-0 text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 className="size-3.5" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {(canCreate || canEdit) && (
        <AssessmentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          assessment={selectedAssessment}
        />
      )}
    </div>
  );
};
