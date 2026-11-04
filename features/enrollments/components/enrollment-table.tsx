'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  CalendarRange,
  Edit2,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  UserCheck,
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
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import type { AcademicYearItem } from '@/features/academic-years/hooks/use-academic-years';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';

import { useDeleteEnrollmentMutation, useEnrollmentsQuery } from '../hooks/use-enrollments';
import type { Enrollment, EnrollmentStatus } from '../types';
import { EnrollmentDialog } from './enrollment-dialog';
import { useTranslation } from '@/lib/i18n';

export const EnrollmentTable = () => {
  const { language } = useTranslation();
  const isKhmer = language === 'kh';
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<EnrollmentStatus | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [selectedAcademicYearFilter, setSelectedAcademicYearFilter] = React.useState<string>('');
  const [selectedAcademicPeriodFilter, setSelectedAcademicPeriodFilter] =
    React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = React.useState<Enrollment | null>(null);

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchFilter) return selectedBranchFilter;
    if (currentBranchId !== 'all') return currentBranchId;
    return '';
  }, [selectedBranchFilter, currentBranchId]);

  // Debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset period when year changes
  React.useEffect(() => {
    setSelectedAcademicPeriodFilter('');
  }, [selectedAcademicYearFilter]);

  const { data: branchData } = useBranchesQuery({ limit: 50 });
  const allBranches = React.useMemo(() => branchData?.data ?? [], [branchData?.data]);

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears: AcademicYearItem[] = React.useMemo(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: periodsData } = useAcademicPeriodsQuery(
    { academicYearId: selectedAcademicYearFilter || undefined, limit: 50 },
    Boolean(selectedAcademicYearFilter),
  );
  const academicPeriods = React.useMemo(() => periodsData?.data ?? [], [periodsData?.data]);

  const {
    data: enrollmentsData,
    isLoading,
    isError,
    error,
  } = useEnrollmentsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
    academicYearId: selectedAcademicYearFilter || undefined,
    academicPeriodId: selectedAcademicPeriodFilter || undefined,
    status: (statusFilter as EnrollmentStatus) || undefined,
  });

  const deleteMutation = useDeleteEnrollmentMutation();

  const enrollments = enrollmentsData?.data ?? [];
  const pagination = enrollmentsData?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

  const handleCreate = () => {
    setSelectedEnrollment(null);
    setDialogOpen(true);
  };

  const handleEdit = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment);
    setDialogOpen(true);
  };

  const handleDelete = async (enrollment: Enrollment) => {
    if (
      window.confirm(
        `Are you sure you want to cancel enrollment "${enrollment.enrollmentCode}" for student "${enrollment.studentId.firstName} ${enrollment.studentId.lastName}"?`,
      )
    ) {
      await deleteMutation.mutateAsync(enrollment._id);
    }
  };

  const canCreate =
    hasPermission('enrollment.create.all_branches') ||
    hasPermission('enrollment.create.own_branch');
  const canEdit =
    hasPermission('enrollment.edit.all_branches') || hasPermission('enrollment.edit.own_branch');
  const canDelete =
    hasPermission('enrollment.delete.all_branches') ||
    hasPermission('enrollment.delete.own_branch');

  const getStatusBadgeTone = (
    status: EnrollmentStatus,
  ): 'success' | 'neutral' | 'warning' | 'danger' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'enrolled':
        return 'warning';
      case 'completed':
        return 'neutral';
      case 'suspended':
      case 'dropped':
        return 'danger';
      case 'transferred':
      default:
        return 'neutral';
    }
  };

  const getTuitionBadgeTone = (
    tuitionStatus: string,
  ): 'success' | 'neutral' | 'warning' | 'danger' => {
    switch (tuitionStatus) {
      case 'paid':
        return 'success';
      case 'partially_paid':
      case 'waived':
        return 'warning';
      case 'pending':
      default:
        return 'danger';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={
                isKhmer
                  ? 'ស្វែងរកតាមឈ្មោះ, អត្តលេខ, ឬលេខកូដ...'
                  : 'Search by student name, ID, or code...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          {/* Campus Branch Filter */}
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

          {/* Academic Year Filter */}
          <Select
            value={selectedAcademicYearFilter}
            onChange={(e) => {
              setSelectedAcademicYearFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ឆ្នាំសិក្សា' : 'All Academic Years'}</option>
            {academicYears.map((ay: AcademicYearItem) => (
              <option key={ay._id} value={ay._id}>
                {ay.name} {ay.isCurrent ? (isKhmer ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
              </option>
            ))}
          </Select>

          {/* Academic Period / Term Filter */}
          {Boolean(selectedAcademicYearFilter) && (
            <Select
              value={selectedAcademicPeriodFilter}
              onChange={(e) => {
                setSelectedAcademicPeriodFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 min-w-[160px] text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់វគ្គ/ត្រីមាស' : 'All Terms / Periods'}</option>
              {academicPeriods.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.code})
                </option>
              ))}
            </Select>
          )}

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as EnrollmentStatus | '');
              setPage(1);
            }}
            className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="active">{isKhmer ? 'សកម្ម / កំពុងរៀន' : 'Active / Continuing'}</option>
            <option value="enrolled">{isKhmer ? 'បានចុះឈ្មោះ' : 'Enrolled'}</option>
            <option value="completed">{isKhmer ? 'បានបញ្ចប់ / រៀនចប់' : 'Completed'}</option>
            <option value="suspended">{isKhmer ? 'បានផ្អាក / ព្យួរ' : 'Suspended'}</option>
            <option value="dropped">{isKhmer ? 'បានបោះបង់ / ឈប់' : 'Dropped / Withdrawn'}</option>
            <option value="transferred">{isKhmer ? 'បានផ្ទេរ' : 'Transferred'}</option>
          </Select>

          {(Boolean(search) ||
            Boolean(selectedBranchFilter) ||
            Boolean(selectedAcademicYearFilter) ||
            Boolean(selectedAcademicPeriodFilter) ||
            Boolean(statusFilter)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedBranchFilter('');
                setSelectedAcademicYearFilter('');
                setSelectedAcademicPeriodFilter('');
                setStatusFilter('');
                setPage(1);
              }}
              className="h-9 px-2 text-xs text-slate-500 hover:text-slate-900"
            >
              {isKhmer ? 'សម្អាត Filter' : 'Clear Filters'}
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
            Enroll Student
          </Button>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {isLoading ? (
          <div className="space-y-3 p-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="size-8 text-red-500" />
            <p className="mt-2 text-sm font-semibold text-slate-900">Failed to load enrollments</p>
            <p className="text-xs text-slate-500">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <UserCheck className="size-10 text-[#00509d]" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No enrollment records found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {debouncedSearch ||
              statusFilter ||
              effectiveBranchFilter ||
              selectedAcademicYearFilter
                ? 'Try adjusting your search criteria or filter selections.'
                : 'Get started by enrolling admitted students into academic classes.'}
            </p>
            {canCreate && !debouncedSearch && (
              <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" />
                Enroll Student
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/75">
              <TableRow>
                <TableHead className="text-xs">Enrollment Code</TableHead>
                <TableHead className="text-xs">Enrolled Student</TableHead>
                <TableHead className="text-xs">Campus Branch</TableHead>
                <TableHead className="text-xs">Academic Year</TableHead>
                <TableHead className="text-xs">Program & Level</TableHead>
                <TableHead className="text-xs">Class Placement</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Tuition</TableHead>
                {(canEdit || canDelete) && (
                  <TableHead className="text-right text-xs">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollments.map((enrollment) => (
                <TableRow key={enrollment._id} className="hover:bg-slate-50/50">
                  <TableCell className="font-mono text-xs font-bold text-[#00509d]">
                    {enrollment.enrollmentCode}
                  </TableCell>

                  <TableCell>
                    <div className="flex min-w-0 flex-col">
                      <div className="text-sm font-semibold text-slate-900">
                        {enrollment.studentId?.firstName} {enrollment.studentId?.lastName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {enrollment.studentId?.khmerName
                          ? `${enrollment.studentId.khmerName} · ${enrollment.studentId.studentId}`
                          : enrollment.studentId?.studentId || '—'}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{enrollment.branchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CalendarRange className="size-3.5 text-slate-400" />
                      <span>{enrollment.academicYearId?.name || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex min-w-0 flex-col text-xs">
                      <span className="font-semibold text-slate-900">
                        {enrollment.programId?.programCode || '—'}
                      </span>
                      <span className="text-xs text-slate-500">
                        {enrollment.levelId?.levelNameEn || '—'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <GraduationCap className="size-3.5 text-[#00509d]" />
                      <span>{enrollment.classId?.className || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={getStatusBadgeTone(enrollment.status)}
                      className="text-xs font-medium capitalize"
                    >
                      {enrollment.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={getTuitionBadgeTone(enrollment.tuitionStatus)}
                      className="text-xs font-medium capitalize"
                    >
                      {enrollment.tuitionStatus?.replace('_', ' ')}
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
                            onClick={() => handleEdit(enrollment)}
                            title="Edit Enrollment"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-400 hover:text-red-600"
                            onClick={() => handleDelete(enrollment)}
                            title="Cancel Enrollment"
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

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            <span>
              Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} total
              enrollments)
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

      {/* Dialog Modal */}
      <EnrollmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        enrollment={selectedEnrollment}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
