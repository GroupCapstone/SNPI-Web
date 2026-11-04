'use client';

import * as React from 'react';
import { AlertCircle, Edit2, Plus, RefreshCw, Search, Trash2, X } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { useTranslation } from '@/lib/i18n';

import { useDeleteDepartmentMutation, useDepartmentsQuery } from '../hooks/use-departments';
import type { Department } from '../types';
import { DepartmentDialog } from './department-dialog';

export const DepartmentTable = () => {
  const { t, isKhmer, getLocalizedValue } = useTranslation();
  const { user, hasPermission, currentBranchId } = useAuth();
  const [search, setSearch] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingDepartment, setEditingDepartment] = React.useState<Department | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const allBranches = branchesData?.data ?? [];

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchId) return selectedBranchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return undefined;
  }, [selectedBranchId, currentBranchId]);

  const { data, isLoading, isError, refetch } = useDepartmentsQuery({
    search: search || undefined,
    branchId: effectiveBranchFilter,
    status: (status as 'active' | 'inactive') || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteDepartmentMutation();

  const handleEdit = (department: Department) => {
    setActionError(null);
    setEditingDepartment(department);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingDepartment(null);
    setDialogOpen(true);
  };

  const handleDelete = async (department: Department) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to deactivate department "${department.nameEn}" (${department.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(department._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete department';
      setActionError(msg);
    }
  };

  const departments = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="flex items-start justify-between gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <div className="space-y-0.5">
              <span className="font-semibold text-amber-950">{t.dialogs.actionBlocked}</span>
              <p className="text-amber-800">{actionError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="rounded p-1 text-amber-600 hover:bg-amber-100 hover:text-amber-900"
            title="Dismiss"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t.department.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>

          <div className="w-56">
            {branches.length > 1 ? (
              <Select
                value={selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-40 text-xs"
              >
                {user?.branchAccess === 'all' && (
                  <option value="">{t.department.allBranches}</option>
                )}
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchCode} · {b.branchNameEn}
                  </option>
                ))}
              </Select>
            ) : branches[0] ? (
              <div className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700">
                <span className="font-semibold text-[#00509d]">{branches[0].branchCode}</span>
                <span>·</span>
                <span className="max-w-[120px] truncate">{branches[0].branchNameEn}</span>
              </div>
            ) : null}
          </div>

          <div className="w-36">
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">{t.common.allStatuses}</option>
              <option value="active">{t.common.active}</option>
              <option value="inactive">{t.common.inactive}</option>
            </Select>
          </div>
        </div>

        {hasPermission('department.create.own_branch') && (
          <Button onClick={handleCreate} className="bg-[#023e8a] text-white hover:bg-[#00509d]">
            <Plus className="size-4" />
            {t.department.addDepartment}
          </Button>
        )}
      </div>

      {/* Main Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-rose-600">Failed to load departments.</p>
              <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                <RefreshCw className="size-3.5" /> Retry
              </Button>
            </div>
          ) : departments.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base font-semibold text-slate-800">
                {t.department.noDepartmentsFound}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {search || selectedBranchId || status
                  ? t.department.noDepartmentsDesc
                  : 'Start adding functional departments to branch campuses.'}
              </p>
              {!search &&
                !selectedBranchId &&
                !status &&
                hasPermission('department.create.own_branch') && (
                  <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                    <Plus className="size-4" /> {t.department.addDepartment}
                  </Button>
                )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 whitespace-nowrap">
                    {t.department.departmentCode}
                  </TableHead>
                  <TableHead className="min-w-[240px] whitespace-nowrap">
                    {t.department.departmentName}
                  </TableHead>
                  <TableHead className="min-w-[220px] whitespace-nowrap">
                    {t.department.branch}
                  </TableHead>
                  <TableHead className="hidden min-w-[200px] whitespace-nowrap md:table-cell">
                    {t.department.description}
                  </TableHead>
                  <TableHead className="w-28 whitespace-nowrap">{t.department.status}</TableHead>
                  <TableHead className="w-24 text-right whitespace-nowrap">
                    {t.common.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => {
                  const branchName =
                    typeof dept.branchId === 'object' && dept.branchId !== null
                      ? `${dept.branchId.branchCode} · ${getLocalizedValue(dept.branchId.branchNameKh, dept.branchId.branchNameEn)}`
                      : '—';

                  const primaryName = isKhmer ? dept.nameKh || dept.nameEn : dept.nameEn;
                  const secondaryName = isKhmer ? dept.nameEn : dept.nameKh;

                  return (
                    <TableRow key={dept._id}>
                      <TableCell className="font-semibold whitespace-nowrap text-slate-800">
                        {dept.code}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex flex-col whitespace-nowrap">
                          <span className="font-semibold text-slate-900">{primaryName}</span>
                          {secondaryName && secondaryName !== primaryName && (
                            <span className="text-xs text-slate-500">{secondaryName}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap text-slate-700">
                        <span className="inline-flex shrink-0 items-center rounded-full bg-blue-50 px-2.5 py-1 font-medium whitespace-nowrap text-[#00509d]">
                          {branchName}
                        </span>
                      </TableCell>
                      <TableCell
                        className="hidden max-w-xs truncate text-xs whitespace-nowrap text-slate-500 md:table-cell"
                        title={dept.description}
                      >
                        {dept.description || '—'}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge tone={dept.status === 'active' ? 'success' : 'neutral'}>
                          {dept.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex shrink-0 items-center justify-end gap-1">
                          {hasPermission('department.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(dept)}
                              aria-label="Edit department"
                              className="size-8 text-slate-600 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {hasPermission('department.delete.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => void handleDelete(dept)}
                              aria-label="Deactivate department"
                              className="size-8 text-slate-400 hover:text-rose-600"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              <p>
                {t.common.showing} {t.common.page}{' '}
                <span className="font-medium text-slate-900">{pagination.page}</span> {t.common.of}{' '}
                <span className="font-medium text-slate-900">{pagination.totalPages}</span> (
                {pagination.total} {t.common.records})
              </p>
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  {t.common.previous}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                >
                  {t.common.next}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        department={editingDepartment}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
