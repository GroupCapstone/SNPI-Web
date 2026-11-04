'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  ClipboardList,
  Edit2,
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

import { useDeleteRegistrationMutation, useRegistrationsQuery } from '../hooks/use-registrations';
import type { Registration, RegistrationStatus } from '../types';
import { RegistrationDialog } from './registration-dialog';

export const RegistrationTable = () => {
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<RegistrationStatus | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [selectedProgramFilter, setSelectedProgramFilter] = React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedRegistration, setSelectedRegistration] = React.useState<Registration | null>(null);

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
    data: registrationsData,
    isLoading,
    isError,
    error,
  } = useRegistrationsQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
    programId: selectedProgramFilter || undefined,
    status: (statusFilter as RegistrationStatus) || undefined,
  });

  const deleteMutation = useDeleteRegistrationMutation();

  const registrations = registrationsData?.data ?? [];
  const pagination = registrationsData?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleCreate = () => {
    setSelectedRegistration(null);
    setDialogOpen(true);
  };

  const handleEdit = (registration: Registration) => {
    setSelectedRegistration(registration);
    setDialogOpen(true);
  };

  const handleDelete = async (registration: Registration) => {
    if (
      window.confirm(
        `Are you sure you want to delete registration "${registration.registrationNumber}" for "${registration.firstName} ${registration.lastName}"?`,
      )
    ) {
      await deleteMutation.mutateAsync(registration._id);
    }
  };

  const canCreate =
    hasPermission('registration.create.all_branches') ||
    hasPermission('registration.create.own_branch');
  const canEdit =
    hasPermission('registration.edit.all_branches') ||
    hasPermission('registration.edit.own_branch');
  const canDelete =
    hasPermission('registration.delete.all_branches') ||
    hasPermission('registration.delete.own_branch');

  const getStatusBadgeTone = (
    status: RegistrationStatus,
  ): 'success' | 'neutral' | 'warning' | 'danger' => {
    switch (status) {
      case 'enrolled':
        return 'success';
      case 'placement_completed':
      case 'enrollment_pending':
        return 'warning';
      case 'placement_pending':
      case 'registered':
        return 'neutral';
      case 'cancelled':
      default:
        return 'danger';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder="Search by name, reg #, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>

          {(!user || user.branchAccess === 'all' || branches.length > 1) && (
            <Select
              value={selectedBranchFilter}
              onChange={(e) => {
                setSelectedBranchFilter(e.target.value);
                setPage(1);
              }}
              className="h-9 w-40 text-xs"
            >
              <option value="">All Branches</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
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
            className="h-9 w-40 text-xs"
          >
            <option value="">All Programs</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as RegistrationStatus | '');
              setPage(1);
            }}
            className="h-9 w-36 text-xs"
          >
            <option value="">All Statuses</option>
            <option value="registered">Registered</option>
            <option value="placement_pending">Placement Pending</option>
            <option value="placement_completed">Placement Completed</option>
            <option value="enrollment_pending">Enrollment Pending</option>
            <option value="enrolled">Enrolled</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        {canCreate && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            New Registration
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
              Failed to load registrations
            </p>
            <p className="text-xs text-slate-500">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <ClipboardList className="size-10 text-[#00509d]" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">No registrations found</h3>
            <p className="mt-1 text-xs text-slate-500">
              {debouncedSearch || statusFilter || effectiveBranchFilter || selectedProgramFilter
                ? 'Try adjusting your search criteria or filter options.'
                : 'Start by registering a new prospective student application.'}
            </p>
            {canCreate && !debouncedSearch && (
              <Button
                onClick={handleCreate}
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" />
                New Registration
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/75">
              <TableRow>
                <TableHead className="text-xs">Reg. Number</TableHead>
                <TableHead className="text-xs">Applicant Name</TableHead>
                <TableHead className="text-xs">Campus Branch</TableHead>
                <TableHead className="text-xs">Program</TableHead>
                <TableHead className="text-xs">Guardian & Contact</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                {(canEdit || canDelete) && (
                  <TableHead className="text-right text-xs">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg._id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium whitespace-nowrap text-slate-800">
                    {reg.registrationNumber}
                  </TableCell>

                  <TableCell>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">
                        {reg.firstName} {reg.lastName}
                      </div>
                      <div className="text-xs whitespace-nowrap text-slate-500">
                        {reg.khmerName} · {reg.gender}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{reg.branchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-medium text-slate-800">
                    {reg.programId?.nameEn || '—'}
                  </TableCell>

                  <TableCell>
                    <div className="text-xs">
                      <span className="font-medium text-slate-800">{reg.guardianName}</span>
                      <span className="block text-xs whitespace-nowrap text-slate-500">
                        {reg.guardianRelationship} · {reg.guardianPhone}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={getStatusBadgeTone(reg.status)}
                      className="text-xs font-medium capitalize"
                    >
                      {reg.status?.replace('_', ' ')}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-slate-500">
                    {reg.registrationDate
                      ? new Date(reg.registrationDate).toLocaleDateString()
                      : '—'}
                  </TableCell>

                  {(canEdit || canDelete) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-600 hover:text-[#00509d]"
                            onClick={() => handleEdit(reg)}
                            title="Edit Registration"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-7 p-0 text-slate-400 hover:text-red-600"
                            onClick={() => handleDelete(reg)}
                            title="Delete Registration"
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
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} registrations)
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

      <RegistrationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        registration={selectedRegistration}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
