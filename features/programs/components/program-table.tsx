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

import { useDeleteProgramMutation, useProgramsQuery } from '../hooks/use-programs';
import type { Program } from '../types';
import { ProgramDialog } from './program-dialog';

export const ProgramTable = () => {
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingProgram, setEditingProgram] = React.useState<Program | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useProgramsQuery({
    search: search || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteProgramMutation();

  const handleEdit = (program: Program) => {
    setActionError(null);
    setEditingProgram(program);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingProgram(null);
    setDialogOpen(true);
  };

  const handleDelete = async (program: Program) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to archive program "${program.nameEn}" (${program.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(program._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete program';
      setActionError(msg);
    }
  };

  const programs = data?.data ?? [];
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
      {/* Action Header & Search Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative max-w-sm min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search code or program name..."
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
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </Select>
          </div>
        </div>

        {hasPermission('program.create.own_branch') && (
          <Button onClick={handleCreate} className="bg-[#023e8a] text-white hover:bg-[#00509d]">
            <Plus className="size-4" />
            Add Program
          </Button>
        )}
      </div>

      {/* Main Table View */}
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
              <p className="text-sm font-medium text-rose-600">
                Failed to load educational programs.
              </p>
              <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                <RefreshCw className="size-3.5" /> Retry
              </Button>
            </div>
          ) : programs.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-base font-semibold text-slate-800">No programs found</p>
              <p className="mt-1 text-sm text-slate-500">
                {search || status
                  ? 'No educational programs match your active filters.'
                  : 'Get started by creating the first educational program.'}
              </p>
              {!search && !status && hasPermission('program.create.own_branch') && (
                <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                  <Plus className="size-4" /> Create Program
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Code</TableHead>
                  <TableHead className="whitespace-nowrap">Program Name</TableHead>
                  <TableHead className="whitespace-nowrap">Khmer Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="w-28">Status</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program._id}>
                    <TableCell className="font-medium whitespace-nowrap text-slate-800">
                      {program.code}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{program.nameEn}</TableCell>
                    <TableCell className="font-khmer text-slate-600">{program.nameKh}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-xs text-slate-500 md:table-cell">
                      {program.description || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge
                        tone={
                          program.status === 'active'
                            ? 'success'
                            : program.status === 'inactive'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {program.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {hasPermission('program.edit.own_branch') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(program)}
                            aria-label="Edit program"
                            className="size-8 text-slate-600 hover:text-slate-900"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        )}
                        {hasPermission('program.delete.own_branch') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => void handleDelete(program)}
                            aria-label="Archive program"
                            className="size-8 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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

      <ProgramDialog open={dialogOpen} onOpenChange={setDialogOpen} program={editingProgram} />
    </div>
  );
};
