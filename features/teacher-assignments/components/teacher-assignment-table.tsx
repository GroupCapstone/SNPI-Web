'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  CalendarRange,
  Edit2,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
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
import { useClassesQuery } from '@/features/classes/hooks/use-classes';

import {
  useDeleteTeacherAssignmentMutation,
  useTeacherAssignmentsQuery,
} from '../hooks/use-teacher-assignments';
import type { TeacherAssignment, TeacherAssignmentStatus } from '../types';
import { TeacherAssignmentDialog } from './teacher-assignment-dialog';
import { useTranslation } from '@/lib/i18n';

export const TeacherAssignmentTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<TeacherAssignmentStatus | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState<TeacherAssignment | null>(
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

  const { data: classData } = useClassesQuery({
    branchId: effectiveBranchFilter || undefined,
    limit: 50,
  });
  const classes = React.useMemo(() => classData?.data ?? [], [classData?.data]);

  const {
    data: assignmentsData,
    isLoading,
    isError,
    error,
  } = useTeacherAssignmentsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
    classId: selectedClassFilter || undefined,
    status: (statusFilter as TeacherAssignmentStatus) || undefined,
  });

  const deleteMutation = useDeleteTeacherAssignmentMutation();

  const assignments = assignmentsData?.data ?? [];
  const pagination = assignmentsData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleCreate = () => {
    setSelectedAssignment(null);
    setDialogOpen(true);
  };

  const handleEdit = (assignment: TeacherAssignment) => {
    setSelectedAssignment(assignment);
    setDialogOpen(true);
  };

  const handleDelete = async (assignment: TeacherAssignment) => {
    const teacherName = `${assignment.employeeId?.firstName || ''} ${assignment.employeeId?.lastName || ''}`;
    if (
      window.confirm(
        `Are you sure you want to remove assignment for "${teacherName}" in class "${assignment.classId?.className}"?`,
      )
    ) {
      await deleteMutation.mutateAsync(assignment._id);
    }
  };

  const canCreate =
    hasPermission('teacher_assignment.create.all_branches') ||
    hasPermission('teacher_assignment.create.own_branch');
  const canEdit =
    hasPermission('teacher_assignment.edit.all_branches') ||
    hasPermission('teacher_assignment.edit.own_branch');
  const canDelete =
    hasPermission('teacher_assignment.delete.all_branches') ||
    hasPermission('teacher_assignment.delete.own_branch');

  const formatRole = (role: string) => {
    switch (role) {
      case 'primary_teacher':
        return 'Homeroom Lead';
      case 'assistant_teacher':
        return 'Assistant Teacher';
      case 'subject_teacher':
      default:
        return 'Subject Teacher';
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
              placeholder={isKhmer ? 'ស្វែងរកគ្រូ ឬមុខវិជ្ជា...' : 'Search teacher, subject...'}
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
                setSelectedClassFilter('');
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
            value={selectedClassFilter}
            onChange={(e) => {
              setSelectedClassFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ថ្នាក់រៀន' : 'All Classes'}</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.className}
              </option>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as TeacherAssignmentStatus | '');
              setPage(1);
            }}
            className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="active">{isKhmer ? 'សកម្ម' : 'Active'}</option>
            <option value="inactive">{isKhmer ? 'អសកម្ម' : 'Inactive'}</option>
          </Select>

          {(Boolean(search) ||
            Boolean(selectedBranchFilter) ||
            Boolean(selectedClassFilter) ||
            Boolean(statusFilter)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedBranchFilter('');
                setSelectedClassFilter('');
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
            {isKhmer ? 'ចាត់តាំងគ្រូបង្រៀន' : 'Assign Teacher'}
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
              Failed to load teacher assignments
            </p>
            <p className="text-xs text-slate-500">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        ) : assignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <UserCheck className="size-10 text-[#00509d]" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No teacher assignments found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {debouncedSearch || selectedBranchFilter || selectedClassFilter || statusFilter
                ? 'Try adjusting your search criteria or filter options.'
                : 'Assign instructors and lead teachers to class rosters.'}
            </p>
            {canCreate && !debouncedSearch && (
              <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" />
                Assign Teacher
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/75">
              <TableRow>
                <TableHead className="text-xs">Teacher / Instructor</TableHead>
                <TableHead className="text-xs">Campus Branch</TableHead>
                <TableHead className="text-xs">Class & Term</TableHead>
                <TableHead className="text-xs">Subject / Role</TableHead>
                <TableHead className="text-xs">Period</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                {(canEdit || canDelete) && (
                  <TableHead className="text-right text-xs">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((asg) => (
                <TableRow key={asg._id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                      {asg.employeeId?.firstName} {asg.employeeId?.lastName}
                    </div>
                    <div className="text-xs whitespace-nowrap text-slate-500">
                      {asg.employeeId?.khmerName ? `${asg.employeeId?.khmerName} · ` : ''}
                      {asg.employeeId?.employeeId}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{asg.branchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <Users className="size-3.5 text-[#00509d]" />
                      <span>{asg.classId?.className || '—'}</span>
                    </div>
                    <div className="text-xs text-slate-500">{asg.academicYearId?.name || '—'}</div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs font-medium text-slate-800">
                      {asg.subjectId?.name || asg.subjectId?.nameEn || 'Homeroom Lead'}
                    </div>
                    <Badge tone="neutral" className="mt-0.5 text-xs">
                      {formatRole(asg.roleInClass)}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <CalendarRange className="size-3 text-slate-400" />
                      <span>
                        {asg.startDate ? new Date(asg.startDate).toLocaleDateString() : '—'}
                        {asg.endDate ? ` to ${new Date(asg.endDate).toLocaleDateString()}` : ''}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={asg.status === 'active' ? 'success' : 'neutral'}
                      className="text-xs font-medium capitalize"
                    >
                      {asg.status}
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
                            onClick={() => handleEdit(asg)}
                            title="Edit Assignment"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-400 hover:text-red-600"
                            onClick={() => handleDelete(asg)}
                            title="Delete Assignment"
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
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} assignments)
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

      <TeacherAssignmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        assignment={selectedAssignment}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
