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
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useTranslation } from '@/lib/i18n';

import { useDeletePositionMutation, usePositionsQuery } from '../hooks/use-positions';
import type { Position } from '../types';
import { PositionDialog } from './position-dialog';

export const PositionTable = () => {
  const { t, isKhmer, getLocalizedValue } = useTranslation();
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPosition, setEditingPosition] = React.useState<Position | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const branches = branchesData?.data ?? [];

  const { data: departmentsData } = useDepartmentsQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const departments = departmentsData?.data ?? [];

  const { data, isLoading, isError, refetch } = usePositionsQuery({
    search: search || undefined,
    branchId: selectedBranchId || undefined,
    departmentId: selectedDepartmentId || undefined,
    status: (status as 'active' | 'inactive') || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeletePositionMutation();

  const handleEdit = (position: Position) => {
    setActionError(null);
    setEditingPosition(position);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingPosition(null);
    setDialogOpen(true);
  };

  const handleDelete = async (position: Position) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to deactivate position "${position.nameEn}" (${position.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(position._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete position';
      setActionError(msg);
    }
  };

  const positions = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="flex items-start justify-between gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            <div className="space-y-0.5">
              <span className="font-semibold text-amber-950">Action Blocked</span>
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t.position.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <Select
            value={selectedBranchId}
            onChange={(e) => {
              setSelectedBranchId(e.target.value);
              setSelectedDepartmentId('');
              setPage(1);
            }}
            className="h-9 w-44 text-xs"
          >
            <option value="">{t.position.allBranches}</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.branchCode} · {b.branchNameEn}
              </option>
            ))}
          </Select>

          <Select
            value={selectedDepartmentId}
            onChange={(e) => {
              setSelectedDepartmentId(e.target.value);
              setPage(1);
            }}
            className="h-9 w-44 text-xs"
          >
            <option value="">{t.position.allDepartments}</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.code} — {d.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-9 w-36 text-xs"
          >
            <option value="">{t.common.allStatuses}</option>
            <option value="active">{t.common.active}</option>
            <option value="inactive">{t.common.inactive}</option>
          </Select>
        </div>

        {hasPermission('position.create.own_branch') && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            {t.position.addPosition}
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
              <p className="text-sm font-medium text-rose-600">Failed to load staff positions.</p>
              <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                <RefreshCw className="size-3.5" /> Retry
              </Button>
            </div>
          ) : positions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base font-semibold text-slate-800">
                {t.position.noPositionsFound}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {search || selectedBranchId || selectedDepartmentId || status
                  ? t.position.noPositionsDesc
                  : 'Start adding job titles and positions to departments.'}
              </p>
              {!search &&
                !selectedBranchId &&
                !selectedDepartmentId &&
                hasPermission('position.create.own_branch') && (
                  <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                    <Plus className="size-4" /> {t.position.addPosition}
                  </Button>
                )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 whitespace-nowrap">
                    {t.position.positionCode}
                  </TableHead>
                  <TableHead className="min-w-[240px] whitespace-nowrap">
                    {t.position.positionTitle}
                  </TableHead>
                  <TableHead className="min-w-[200px] whitespace-nowrap">
                    {t.position.department}
                  </TableHead>
                  <TableHead className="hidden min-w-[140px] whitespace-nowrap md:table-cell">
                    {t.department.branch}
                  </TableHead>
                  <TableHead className="w-28 whitespace-nowrap">{t.position.status}</TableHead>
                  <TableHead className="w-24 text-right whitespace-nowrap">
                    {t.common.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((pos) => {
                  const branchName =
                    typeof pos.branchId === 'object' && pos.branchId !== null
                      ? `${pos.branchId.branchCode} · ${getLocalizedValue(pos.branchId.branchNameKh, pos.branchId.branchNameEn)}`
                      : '—';

                  const deptName =
                    typeof pos.departmentId === 'object' && pos.departmentId !== null
                      ? `${pos.departmentId.code} · ${getLocalizedValue(pos.departmentId.nameKh, pos.departmentId.nameEn)}`
                      : '—';

                  const primaryName = isKhmer ? pos.nameKh || pos.nameEn : pos.nameEn;
                  const secondaryName = isKhmer ? pos.nameEn : pos.nameKh;

                  return (
                    <TableRow key={pos._id}>
                      <TableCell className="font-semibold whitespace-nowrap text-slate-800">
                        {pos.code}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex flex-col whitespace-nowrap">
                          <span className="font-semibold text-slate-900">{primaryName}</span>
                          {secondaryName && secondaryName !== primaryName && (
                            <span className="text-xs text-slate-500">{secondaryName}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium whitespace-nowrap text-slate-700">
                        <span className="inline-flex shrink-0 items-center rounded-full bg-blue-50 px-2.5 py-1 font-medium whitespace-nowrap text-[#00509d]">
                          {deptName}
                        </span>
                      </TableCell>
                      <TableCell className="hidden text-xs font-medium whitespace-nowrap text-slate-600 md:table-cell">
                        {branchName}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge tone={pos.status === 'active' ? 'success' : 'neutral'}>
                          {pos.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <div className="flex shrink-0 items-center justify-end gap-1">
                          {hasPermission('position.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(pos)}
                              aria-label="Edit position"
                              className="size-8 text-slate-600 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {hasPermission('position.delete.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => void handleDelete(pos)}
                              aria-label="Deactivate position"
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

      <PositionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        position={editingPosition}
        defaultBranchId={selectedBranchId}
        defaultDepartmentId={selectedDepartmentId}
      />
    </div>
  );
};
