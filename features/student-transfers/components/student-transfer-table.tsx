'use client';

import * as React from 'react';
import {
  AlertCircle,
  ArrowRight,
  ArrowRightLeft,
  Building2,
  CalendarRange,
  CheckCircle2,
  Plus,
  Search,
  XCircle,
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

import {
  useProcessStudentTransferMutation,
  useStudentTransfersQuery,
} from '../hooks/use-student-transfers';
import type { StudentTransfer, StudentTransferStatus } from '../types';
import { StudentTransferDialog } from './student-transfer-dialog';

export const StudentTransferTable = () => {
  const { user, hasPermission, currentBranchId } = useAuth();
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<StudentTransferStatus | ''>('');
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');

  const [dialogOpen, setDialogOpen] = React.useState(false);

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

  const {
    data: transfersData,
    isLoading,
    isError,
    error,
  } = useStudentTransfersQuery({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    fromBranchId: effectiveBranchFilter || undefined,
    status: (statusFilter as StudentTransferStatus) || undefined,
  });

  const processMutation = useProcessStudentTransferMutation();

  const transfers = transfersData?.data ?? [];
  const pagination = transfersData?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

  const handleApprove = async (transfer: StudentTransfer) => {
    if (
      window.confirm(
        `Approve transfer for "${transfer.studentId?.firstName} ${transfer.studentId?.lastName}" to "${transfer.toBranchId?.branchNameEn}"?`,
      )
    ) {
      await processMutation.mutateAsync({
        id: transfer._id,
        payload: { status: 'approved' },
      });
    }
  };

  const handleReject = async (transfer: StudentTransfer) => {
    const reason = window.prompt('Enter reason for rejection (optional):') || 'Rejected';
    await processMutation.mutateAsync({
      id: transfer._id,
      payload: { status: 'rejected', remarks: reason },
    });
  };

  const canCreate =
    hasPermission('student_transfer.create.all_branches') ||
    hasPermission('student_transfer.create.own_branch');
  const canProcess =
    hasPermission('student_transfer.edit.all_branches') ||
    hasPermission('student_transfer.edit.own_branch');

  const getStatusBadgeTone = (
    status: StudentTransferStatus,
  ): 'success' | 'neutral' | 'warning' | 'danger' => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
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
              placeholder="Search transfer #, reason..."
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
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as StudentTransferStatus | '');
              setPage(1);
            }}
            className="h-9 w-36 text-xs"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        {canCreate && (
          <Button
            onClick={() => setDialogOpen(true)}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            New Transfer Request
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
              Failed to load transfer requests
            </p>
            <p className="text-xs text-slate-500">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        ) : transfers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <ArrowRightLeft className="size-10 text-[#00509d]" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              No transfer requests found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {debouncedSearch || selectedBranchFilter || statusFilter
                ? 'Try adjusting your search criteria or filter options.'
                : 'Submit inter-branch student transfer requests for review and approval.'}
            </p>
            {canCreate && !debouncedSearch && (
              <Button
                onClick={() => setDialogOpen(true)}
                variant="outline"
                size="sm"
                className="mt-4 text-xs font-semibold"
              >
                <Plus className="mr-1.5 size-3.5" />
                New Transfer Request
              </Button>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/75">
              <TableRow>
                <TableHead className="text-xs">Transfer #</TableHead>
                <TableHead className="text-xs">Student</TableHead>
                <TableHead className="text-xs">From Campus</TableHead>
                <TableHead className="text-xs">To Campus</TableHead>
                <TableHead className="text-xs">Date & Reason</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                {canProcess && <TableHead className="text-right text-xs">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((trf) => (
                <TableRow key={trf._id} className="hover:bg-slate-50/50">
                  <TableCell className="font-medium whitespace-nowrap text-slate-800">
                    {trf.transferNumber}
                  </TableCell>

                  <TableCell>
                    <div className="text-sm font-semibold whitespace-nowrap text-slate-900">
                      {trf.studentId?.firstName} {trf.studentId?.lastName}
                    </div>
                    <div className="text-xs whitespace-nowrap text-slate-500">
                      {trf.studentId?.khmerName ? `${trf.studentId?.khmerName} · ` : ''}
                      {trf.studentId?.studentId}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <Building2 className="size-3.5 text-slate-400" />
                      <span>{trf.fromBranchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00509d]">
                      <ArrowRight className="size-3.5 text-slate-400" />
                      <span>{trf.toBranchId?.branchNameEn || '—'}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="text-xs text-slate-800">{trf.reason}</div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <CalendarRange className="size-3 text-slate-400" />
                      <span>
                        {trf.transferDate ? new Date(trf.transferDate).toLocaleDateString() : '—'}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      tone={getStatusBadgeTone(trf.status)}
                      className="text-xs font-medium capitalize"
                    >
                      {trf.status}
                    </Badge>
                  </TableCell>

                  {canProcess && (
                    <TableCell className="text-right">
                      {trf.status === 'pending' && (
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                            onClick={() => handleApprove(trf)}
                            disabled={processMutation.isPending}
                          >
                            <CheckCircle2 className="mr-1 size-3.5 text-emerald-600" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-xs text-red-700 hover:bg-red-50 hover:text-red-800"
                            onClick={() => handleReject(trf)}
                            disabled={processMutation.isPending}
                          >
                            <XCircle className="mr-1 size-3.5 text-red-600" />
                            Reject
                          </Button>
                        </div>
                      )}
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
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} transfers)
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

      <StudentTransferDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultBranchId={effectiveBranchFilter}
      />
    </div>
  );
};
