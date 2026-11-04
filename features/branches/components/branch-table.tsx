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
import { useTranslation } from '@/lib/i18n';

import { useBranchesQuery, useDeleteBranchMutation } from '../hooks/use-branches';
import type { Branch } from '../types';
import { BranchDialog } from './branch-dialog';

export const BranchTable = () => {
  const { t, isKhmer } = useTranslation();
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingBranch, setEditingBranch] = React.useState<Branch | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useBranchesQuery({
    search: search || undefined,
    status: (status as 'active' | 'inactive' | 'closed') || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteBranchMutation();

  const handleEdit = (branch: Branch) => {
    setActionError(null);
    setEditingBranch(branch);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingBranch(null);
    setDialogOpen(true);
  };

  const handleDelete = async (branch: Branch) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to close/deactivate branch "${branch.branchNameEn}" (${branch.branchCode})?`,
        )
      ) {
        await deleteMutation.mutateAsync(branch._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete branch';
      setActionError(msg);
    }
  };

  const branches = data?.data ?? [];
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
      {/* Filter Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t.branch.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9"
            />
          </div>

          <div className="w-40">
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
              <option value="closed">Closed</option>
            </Select>
          </div>
        </div>

        {hasPermission('branch.create.all_branches') && (
          <Button onClick={handleCreate} className="bg-[#023e8a] text-white hover:bg-[#00509d]">
            <Plus className="size-4" />
            {t.branch.addBranch}
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
              <p className="text-sm font-medium text-rose-600">Failed to load school branches.</p>
              <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                <RefreshCw className="size-3.5" /> Retry
              </Button>
            </div>
          ) : branches.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base font-semibold text-slate-800">{t.branch.noBranchesFound}</p>
              <p className="mt-1 text-sm text-slate-500">
                {search || status
                  ? t.branch.noBranchesDesc
                  : 'Start adding campus branches to the school organization.'}
              </p>
              {!search && !status && hasPermission('branch.create.all_branches') && (
                <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                  <Plus className="size-4" /> {t.branch.addBranch}
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24 whitespace-nowrap">{t.branch.branchCode}</TableHead>
                  <TableHead className="min-w-[240px] whitespace-nowrap">
                    {t.branch.title}
                  </TableHead>
                  <TableHead className="hidden min-w-[200px] whitespace-nowrap md:table-cell">
                    {t.employee.contact}
                  </TableHead>
                  <TableHead className="hidden min-w-[220px] whitespace-nowrap lg:table-cell">
                    {t.branch.address}
                  </TableHead>
                  <TableHead className="w-28 whitespace-nowrap">{t.branch.status}</TableHead>
                  <TableHead className="w-24 text-right whitespace-nowrap">
                    {t.common.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((b) => {
                  const primaryName = isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn;
                  const secondaryName = isKhmer ? b.branchNameEn : b.branchNameKh;

                  return (
                    <TableRow key={b._id}>
                      <TableCell className="font-semibold whitespace-nowrap text-slate-800">
                        {b.branchCode}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex flex-col whitespace-nowrap">
                          <span className="font-semibold text-slate-900">{primaryName}</span>
                          {secondaryName && secondaryName !== primaryName && (
                            <span className="text-xs text-slate-500">{secondaryName}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-xs whitespace-nowrap text-slate-600 md:table-cell">
                        <span>{b.phone || '—'}</span>
                        {b.email && <span className="ml-1.5 text-slate-400">({b.email})</span>}
                      </TableCell>
                      <TableCell
                        className="hidden max-w-xs truncate text-xs whitespace-nowrap text-slate-500 lg:table-cell"
                        title={b.address}
                      >
                        {b.address || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          tone={
                            b.status === 'active'
                              ? 'success'
                              : b.status === 'inactive'
                                ? 'warning'
                                : 'danger'
                          }
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {hasPermission('branch.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(b)}
                              aria-label="Edit branch"
                              className="size-8 text-slate-600 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {hasPermission('branch.delete.all_branches') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => void handleDelete(b)}
                              aria-label="Close branch"
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

      <BranchDialog open={dialogOpen} onOpenChange={setDialogOpen} branch={editingBranch} />
    </div>
  );
};
