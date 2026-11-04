'use client';

import * as React from 'react';
import {
  AlertCircle,
  ArrowUpDown,
  Edit2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from '@/components/icons';

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
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';

import { useDeleteLevelMutation, useLevelsQuery } from '../hooks/use-levels';
import type { Level } from '../types';
import { LevelDialog } from './level-dialog';
import { useTranslation } from '@/lib/i18n';

export const LevelTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [selectedProgramId, setSelectedProgramId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingLevel, setEditingLevel] = React.useState<Level | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const programs = programsData?.data ?? [];

  const { data, isLoading, isError, refetch } = useLevelsQuery({
    search: search || undefined,
    programId: selectedProgramId || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteLevelMutation();

  const handleEdit = (level: Level) => {
    setActionError(null);
    setEditingLevel(level);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingLevel(null);
    setDialogOpen(true);
  };

  const handleDelete = async (level: Level) => {
    try {
      setActionError(null);
      if (
        window.confirm(`Are you sure you want to archive level "${level.name}" (${level.code})?`)
      ) {
        await deleteMutation.mutateAsync(level._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete level';
      setActionError(msg);
    }
  };

  const levels = data?.data ?? [];
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={
                isKhmer ? 'ស្វែងរកតាមឈ្មោះ ឬកូដកម្រិត...' : 'Search level name or code...'
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          <Select
            value={selectedProgramId}
            onChange={(e) => {
              setSelectedProgramId(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់កម្មវិធីសិក្សា' : 'All Programs'}</option>
            {programs.map((prog) => (
              <option key={prog._id} value={prog._id}>
                {prog.code} — {isKhmer ? prog.nameKh || prog.nameEn : prog.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="active">{isKhmer ? 'សកម្ម' : 'Active'}</option>
            <option value="inactive">{isKhmer ? 'អសកម្ម' : 'Inactive'}</option>
            <option value="archived">{isKhmer ? 'បណ្ណសារ' : 'Archived'}</option>
          </Select>

          {(Boolean(search) || Boolean(selectedProgramId) || Boolean(status)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedProgramId('');
                setStatus('');
                setPage(1);
              }}
              className="h-9 gap-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {t.common.clearFilters}
            </Button>
          )}
        </div>

        {hasPermission('level.create.own_branch') && (
          <Button
            onClick={handleCreate}
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="size-4" />
            {isKhmer ? 'បន្ថែមផ្នែក/កម្រិត' : 'Add Level'}
          </Button>
        )}
      </div>

      {/* Levels Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-rose-600">Failed to load academic levels.</p>
              <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                <RefreshCw className="size-3.5" /> Retry
              </Button>
            </div>
          ) : levels.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base font-semibold text-slate-800">No academic levels found</p>
              <p className="mt-1 text-sm text-slate-500">
                {search || selectedProgramId || status
                  ? 'No levels match your current filter selection.'
                  : 'Start building program curricula by adding levels.'}
              </p>
              {!search &&
                !selectedProgramId &&
                !status &&
                hasPermission('level.create.own_branch') && (
                  <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                    <Plus className="size-4" /> Create Level
                  </Button>
                )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      Seq <ArrowUpDown className="size-3" />
                    </span>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Code</TableHead>
                  <TableHead className="whitespace-nowrap">Level Name</TableHead>
                  <TableHead className="whitespace-nowrap">Program</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levels.map((level) => {
                  const programName =
                    typeof level.programId === 'object' && level.programId !== null
                      ? `${level.programId.code} · ${level.programId.nameEn}`
                      : '—';

                  return (
                    <TableRow key={level._id}>
                      <TableCell className="text-center text-xs font-medium whitespace-nowrap text-slate-600">
                        {level.sequence}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap text-slate-800">
                        {level.code}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{level.name}</TableCell>
                      <TableCell className="text-xs text-slate-600">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-[#00509d]">
                          {programName}
                        </span>
                      </TableCell>
                      <TableCell className="hidden max-w-xs truncate text-xs text-slate-500 md:table-cell">
                        {level.description || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          tone={
                            level.status === 'active'
                              ? 'success'
                              : level.status === 'inactive'
                                ? 'warning'
                                : 'neutral'
                          }
                        >
                          {level.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {hasPermission('level.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(level)}
                              aria-label="Edit level"
                              className="size-8 text-slate-600 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {hasPermission('level.delete.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => void handleDelete(level)}
                              aria-label="Archive level"
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
                Showing Page <span className="font-medium text-slate-900">{pagination.page}</span>{' '}
                of <span className="font-medium text-slate-900">{pagination.totalPages}</span> (
                {pagination.total} total)
              </p>
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <LevelDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        level={editingLevel}
        defaultProgramId={selectedProgramId}
      />
    </div>
  );
};
