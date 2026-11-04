'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Building2,
  Edit2,
  Eye,
  FileSpreadsheet,
  History,
  Plus,
  Search,
  Trash2,
  Users,
  X,
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
import { EntityHistoryDialog } from '@/features/audit-logs/components/entity-history-dialog';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useTranslation } from '@/lib/i18n';

import { useDeleteStudentMutation, useStudentsQuery } from '../hooks/use-students';
import type { Student, StudentGender, StudentStatus } from '../types';
import { StudentImportDialog } from './student-import-dialog';

export const StudentTable = () => {
  const router = useRouter();
  const { t, isKhmer } = useTranslation();
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<StudentStatus | ''>('');
  const [genderFilter, setGenderFilter] = React.useState<StudentGender | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');

  const [historyTarget, setHistoryTarget] = React.useState<{ id: string; title: string } | null>(
    null,
  );
  const [importDialogOpen, setImportDialogOpen] = React.useState(false);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchFilter) return selectedBranchFilter;
    if (currentBranchId !== 'all') return currentBranchId;
    return '';
  }, [selectedBranchFilter, currentBranchId]);

  // Debounce search input
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

  const {
    data: studentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useStudentsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
    status: (statusFilter as StudentStatus) || undefined,
    gender: (genderFilter as StudentGender) || undefined,
  });

  const deleteMutation = useDeleteStudentMutation();

  const students = studentsData?.data ?? [];
  const pagination = studentsData?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

  const handleCreate = () => {
    router.push('/students/new');
  };

  const handleEdit = (student: Student) => {
    router.push(`/students/${student._id}/edit`);
  };

  const handleDelete = async (student: Student) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to delete student record "${student.firstName} ${student.lastName}" (${student.studentId})?`,
        )
      ) {
        await deleteMutation.mutateAsync(student._id);
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
            'Failed to delete student record';
      setActionError(errorMsg);
    }
  };

  const getStatusBadgeTone = (
    status: StudentStatus,
  ): 'neutral' | 'success' | 'warning' | 'danger' => {
    switch (status) {
      case 'active':
        return 'success';
      case 'graduated':
      case 'transferred':
        return 'neutral';
      case 'suspended':
        return 'warning';
      case 'withdrawn':
      case 'inactive':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-foreground flex items-center gap-2 text-xl font-bold tracking-tight">
            <Users className="text-primary h-5 w-5" />
            {t.students.title}
          </h2>
          <p className="text-muted-foreground text-xs">{t.students.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {hasPermission('student.create.own_branch') && (
            <>
              <Button
                onClick={() => setImportDialogOpen(true)}
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 text-xs"
              >
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                {t.students.importStudents}
              </Button>
              <Button onClick={handleCreate} size="sm" className="h-9 gap-1.5 text-xs">
                <Plus className="h-4 w-4" />
                {t.students.registerStudent}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Action Error Alert */}
      {actionError && (
        <div className="bg-destructive/10 border-destructive/20 text-destructive flex items-center justify-between rounded-md border p-3 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{actionError}</span>
          </div>
          <button
            onClick={() => setActionError(null)}
            className="text-destructive hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Search */}
        <div className="relative max-w-sm min-w-[220px] flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder={t.students.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 text-xs font-medium sm:text-sm"
          />
        </div>

        {/* Branch Filter */}
        <Select
          value={selectedBranchFilter}
          onChange={(e) => {
            setSelectedBranchFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
        >
          <option value="">{isKhmer ? 'គ្រប់សាខា' : t.department.allBranches}</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn} ({b.branchCode})
            </option>
          ))}
        </Select>

        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as StudentStatus | '');
            setPage(1);
          }}
          className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
        >
          <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
          <option value="active">{t.students.statuses.active}</option>
          <option value="inactive">{t.students.statuses.inactive}</option>
          <option value="suspended">{t.students.statuses.suspended}</option>
          <option value="graduated">{t.students.statuses.graduated}</option>
          <option value="withdrawn">{t.students.statuses.withdrawn}</option>
          <option value="transferred">{t.students.statuses.transferred}</option>
        </Select>

        {/* Gender Filter */}
        <Select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value as StudentGender | '');
            setPage(1);
          }}
          className="h-9 min-w-[130px] text-xs font-medium sm:text-sm"
        >
          <option value="">{isKhmer ? 'គ្រប់ភេទ' : 'All Genders'}</option>
          <option value="male">{t.students.genders.male}</option>
          <option value="female">{t.students.genders.female}</option>
          <option value="other">{t.students.genders.other}</option>
        </Select>

        {/* Clear Filters Button */}
        {(Boolean(search) ||
          Boolean(selectedBranchFilter) ||
          Boolean(statusFilter) ||
          Boolean(genderFilter)) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch('');
              setSelectedBranchFilter('');
              setStatusFilter('');
              setGenderFilter('');
              setPage(1);
            }}
            className="h-9 gap-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <X className="h-3.5 w-3.5" />
            {t.common.clearFilters}
          </Button>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-card overflow-hidden rounded-lg border">
        <Table className="min-w-[1000px]">
          <TableHeader className="bg-muted/50 text-xs">
            <TableRow>
              <TableHead className="whitespace-nowrap">{t.students.studentId}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.khmerName}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.englishName}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.gender}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.dob}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.campusBranch}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.primaryGuardian}</TableHead>
              <TableHead className="whitespace-nowrap">{t.students.status}</TableHead>
              <TableHead className="text-right whitespace-nowrap">{t.common.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Skeleton className="ml-auto h-8 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={9} className="text-destructive h-32 text-center">
                  {error instanceof Error
                    ? error.message
                    : (error as { response?: { data?: { message?: string } } })?.response?.data
                        ?.message || 'Failed to load students'}
                </TableCell>
              </TableRow>
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-muted-foreground h-32 text-center">
                  {t.students.noStudentsDesc}
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => {
                const primaryGuardian =
                  student.guardians?.find((g) => g.isPrimary) || student.guardians?.[0];

                const localizedGender =
                  student.gender === 'male'
                    ? t.students.genders.male
                    : student.gender === 'female'
                      ? t.students.genders.female
                      : t.students.genders.other;

                const localizedStatus =
                  t.students.statuses[student.status as keyof typeof t.students.statuses] ||
                  student.status;

                const branchName = isKhmer
                  ? student.branchId?.branchNameKh || student.branchId?.branchNameEn || '—'
                  : student.branchId?.branchNameEn || '—';

                return (
                  <TableRow key={student._id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-foreground font-medium whitespace-nowrap">
                      <Link
                        href={`/students/${student._id}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        {student.studentId}
                      </Link>
                    </TableCell>
                    <TableCell className="text-foreground font-medium whitespace-nowrap">
                      <Link href={`/students/${student._id}`} className="hover:underline">
                        {student.khmerName}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap text-slate-800">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap capitalize">
                      {localizedGender}
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {student.dateOfBirth
                        ? new Date(student.dateOfBirth).toISOString().slice(0, 10)
                        : '—'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Building2 className="text-muted-foreground h-3 w-3" />
                        <span className="max-w-[150px] truncate">{branchName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {primaryGuardian ? (
                        <div className="flex min-w-0 flex-col">
                          <span className="font-medium text-slate-800">
                            {primaryGuardian.fullName}
                          </span>
                          <span className="text-xs text-slate-500">{primaryGuardian.phone}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        tone={getStatusBadgeTone(student.status)}
                        className="text-xs capitalize"
                      >
                        {localizedStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setHistoryTarget({
                              id: student._id,
                              title: `${student.khmerName || student.firstName} (${student.studentId})`,
                            })
                          }
                          className="h-7 w-7 p-0 text-slate-600 hover:text-[#00509d]"
                          title={isKhmer ? 'មើលប្រវត្តិ' : 'View History'}
                        >
                          <History className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/students/${student._id}`)}
                          className="h-7 w-7 p-0"
                          title={t.common.view}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        {hasPermission('student.edit.own_branch') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(student)}
                            className="h-7 w-7 p-0"
                            title={t.common.edit}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {hasPermission('student.delete.own_branch') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student)}
                            className="text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
                            title={t.common.delete}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {!isLoading && !isError && pagination.totalPages > 1 && (
        <div className="text-muted-foreground flex items-center justify-between pt-2 text-xs">
          <div>
            {isKhmer ? (
              <span>
                បង្ហាញ {(pagination.page - 1) * pagination.limit + 1} ដល់{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} នៃ{' '}
                {pagination.total} សិស្ស
              </span>
            ) : (
              <span>
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} students
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-8 text-xs"
            >
              {t.common.previous}
            </Button>
            <span className="px-2 font-medium">
              {isKhmer
                ? `ទំព័រ ${pagination.page} នៃ ${pagination.totalPages}`
                : `Page ${pagination.page} of ${pagination.totalPages}`}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 text-xs"
            >
              {t.common.next}
            </Button>
          </div>
        </div>
      )}

      {/* Excel Import Dialog */}
      <StudentImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImportComplete={() => {
          refetch();
        }}
      />

      {/* Entity Audit History Dialog */}
      <EntityHistoryDialog
        open={Boolean(historyTarget)}
        onOpenChange={(open) => !open && setHistoryTarget(null)}
        entityType="Student"
        entityId={historyTarget?.id}
        entityTitle={historyTarget?.title}
      />
    </div>
  );
};
