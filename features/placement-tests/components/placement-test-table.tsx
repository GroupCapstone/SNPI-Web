'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  Edit2,
  FileCheck,
  GraduationCap,
  Plus,
  Search,
  Trash2,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
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
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';

import {
  useDeletePlacementTestMutation,
  usePlacementTestsQuery,
} from '../hooks/use-placement-tests';
import type { PlacementTest, PlacementTestStatus } from '../types';
import { PlacementTestDialog } from './placement-test-dialog';
import { useTranslation } from '@/lib/i18n';

export const PlacementTestTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<PlacementTestStatus | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [selectedProgramFilter, setSelectedProgramFilter] = React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedPlacementTest, setSelectedPlacementTest] = React.useState<PlacementTest | null>(
    null,
  );

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchFilter) return selectedBranchFilter;
    if (currentBranchId !== 'all') return currentBranchId;
    return '';
  }, [selectedBranchFilter, currentBranchId]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: branchData } = useBranchesQuery({ limit: 50 });
  const allBranches = React.useMemo(() => branchData?.data ?? [], [branchData?.data]);

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const { data: programData } = useProgramsQuery({ limit: 50 });
  const programs = React.useMemo(() => programData?.data ?? [], [programData?.data]);

  const {
    data: placementTestsData,
    isLoading,
    isError,
    error,
  } = usePlacementTestsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
    programId: selectedProgramFilter || undefined,
    status: (statusFilter as PlacementTestStatus) || undefined,
  });

  const deleteMutation = useDeletePlacementTestMutation();

  const placementTests = placementTestsData?.data ?? [];
  const pagination = placementTestsData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleCreate = () => {
    setSelectedPlacementTest(null);
    setDialogOpen(true);
  };

  const handleEdit = (test: PlacementTest) => {
    setSelectedPlacementTest(test);
    setDialogOpen(true);
  };

  const handleDelete = async (test: PlacementTest) => {
    if (
      window.confirm(
        `Are you sure you want to delete placement test record "${test.testNumber}" for "${test.studentName}"?`,
      )
    ) {
      await deleteMutation.mutateAsync(test._id);
    }
  };

  const canCreate =
    hasPermission('placement_test.create.all_branches') ||
    hasPermission('placement_test.create.own_branch');
  const canEdit =
    hasPermission('placement_test.edit.all_branches') ||
    hasPermission('placement_test.edit.own_branch');
  const canDelete =
    hasPermission('placement_test.delete.all_branches') ||
    hasPermission('placement_test.delete.own_branch');

  const getStatusBadgeTone = (
    status: PlacementTestStatus,
  ): 'success' | 'neutral' | 'warning' | 'danger' => {
    switch (status) {
      case 'passed':
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'failed':
      default:
        return 'danger';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={
                isKhmer
                  ? 'ស្វែងរកតាមលេខតេស្ត ឈ្មោះ ឬអ្នកវាយតម្លៃ...'
                  : 'Search by test #, name, examiner...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          {(!user || user.branchAccess === 'all' || branches.length > 1) && (
            <Select
              value={selectedBranchFilter}
              onChange={(e) => {
                setSelectedBranchFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
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
            value={selectedProgramFilter}
            onChange={(e) => {
              setSelectedProgramFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់កម្មវិធីសិក្សា' : 'All Programs'}</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {isKhmer ? p.nameKh || p.nameEn : p.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as PlacementTestStatus | '');
              setPage(1);
            }}
            className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="completed">{isKhmer ? 'បានបញ្ចប់' : 'Completed'}</option>
            <option value="passed">{isKhmer ? 'ជាប់' : 'Passed'}</option>
            <option value="failed">{isKhmer ? 'ធ្លាក់' : 'Failed'}</option>
            <option value="scheduled">{isKhmer ? 'បានកំណត់ពេល' : 'Scheduled'}</option>
          </Select>

          {(Boolean(search) ||
            Boolean(selectedBranchFilter) ||
            Boolean(selectedProgramFilter) ||
            Boolean(statusFilter)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedBranchFilter('');
                setSelectedProgramFilter('');
                setStatusFilter('');
                setPage(1);
              }}
              className="h-9 gap-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t.common.clearFilters}
            </Button>
          )}
        </div>

        {canCreate && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            {isKhmer ? 'កត់ត្រាតេស្តវាស់កម្រិត' : 'Record Placement Test'}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="space-y-3 p-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="size-8 text-red-500" />
            <p className="mt-2 text-sm font-semibold text-slate-900">
              Failed to load placement tests
            </p>
            <p className="text-xs text-slate-500">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        ) : placementTests.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <FileCheck className="size-10 text-[#00509d]" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No placement tests recorded
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {debouncedSearch || statusFilter || effectiveBranchFilter || selectedProgramFilter
                ? 'Try adjusting your search criteria or filter options.'
                : 'Evaluate applicant abilities and assign recommended grade levels.'}
            </p>
            {canCreate && !debouncedSearch && (
              <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" />
                Record Placement Test
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/75">
              <TableRow>
                <TableHead className="text-xs">Test #</TableHead>
                <TableHead className="text-xs">Student / Applicant</TableHead>
                <TableHead className="text-xs">Campus Branch</TableHead>
                <TableHead className="text-xs">Program</TableHead>
                <TableHead className="text-xs">Score Evaluation</TableHead>
                <TableHead className="text-xs">Recommended Level</TableHead>
                <TableHead className="text-xs">Examiner & Date</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                {(canEdit || canDelete) && (
                  <TableHead className="text-right text-xs">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {placementTests.map((test) => (
                <TableRow key={test._id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium whitespace-nowrap text-slate-800">
                    {test.testNumber}
                  </TableCell>

                  <TableCell>
                    <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                      {test.studentName}
                    </div>
                    {test.registrationId?.registrationNumber && (
                      <div className="text-xs whitespace-nowrap text-slate-500">
                        Linked: {test.registrationId.registrationNumber}
                      </div>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-700">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{test.branchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-medium whitespace-nowrap text-slate-800">
                    {test.programId?.nameEn || '—'}
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    <div className="text-xs">
                      <span className="font-mono font-bold text-[#00509d]">{test.score}</span>
                      <span className="text-slate-400"> / {test.maxScore}</span>
                      <span className="ml-1 text-xs text-slate-500">
                        ({Math.round((test.score / test.maxScore) * 100)}%)
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <GraduationCap className="size-3.5 text-[#00509d]" />
                      <span>
                        {test.recommendedLevelId?.name || test.recommendedLevelId?.code || '—'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs text-slate-800">
                      {test.examinerName || '—'}
                      <div className="text-xs text-slate-500">
                        {test.testDate ? new Date(test.testDate).toLocaleDateString() : '—'}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={getStatusBadgeTone(test.status)}
                      className="text-xs font-medium capitalize"
                    >
                      {test.status}
                    </Badge>
                  </TableCell>

                  {(canEdit || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-600 hover:text-[#00509d]"
                            onClick={() => handleEdit(test)}
                            title="Edit Placement Test"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-400 hover:text-red-600"
                            onClick={() => handleDelete(test)}
                            title="Delete Placement Test"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} tests)
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <PlacementTestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        placementTest={selectedPlacementTest}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
