'use client';

import * as React from 'react';
import Link from 'next/link';
import { Edit2, Plus, Receipt, Search, Trash2 } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
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

import { useDeleteTuitionFeeMutation, useTuitionFeesQuery } from '../hooks/use-tuition';
import type { TuitionFee, TuitionFeeFilters } from '../types';
import { TuitionDialog } from './tuition-dialog';
import { useTranslation } from '@/lib/i18n';
import { formatCurrency, formatDataLabel } from '@/lib/formatters';

export const TuitionTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { hasPermission } = useAuth();
  const canViewPayments =
    hasPermission('payment.view.own_branch') ||
    hasPermission('payment.view.all_branches') ||
    hasPermission('finance.payment.create.own_branch') ||
    hasPermission('finance.payment.create.all_branches');
  const canManageFees =
    hasPermission('tuition.create.own_branch') ||
    hasPermission('tuition.create.all_branches') ||
    hasPermission('finance.fee_structure.manage.own_branch') ||
    hasPermission('finance.fee_structure.manage.all_branches');
  const canEditFees =
    hasPermission('tuition.edit.own_branch') ||
    hasPermission('tuition.edit.all_branches') ||
    hasPermission('finance.fee_structure.manage.own_branch') ||
    hasPermission('finance.fee_structure.manage.all_branches');
  const canDeleteFees =
    hasPermission('tuition.delete.own_branch') ||
    hasPermission('tuition.delete.all_branches') ||
    hasPermission('finance.fee_structure.manage.own_branch') ||
    hasPermission('finance.fee_structure.manage.all_branches');
  const [filters, setFilters] = React.useState<TuitionFeeFilters>({
    page: 1,
    limit: 20,
  });
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedFee, setSelectedFee] = React.useState<TuitionFee | null>(null);

  const { data: branchesData } = useBranchesQuery();
  const branches = branchesData?.data ?? [];

  const { data: programsData } = useProgramsQuery();
  const programs = programsData?.data ?? [];

  const { data, isLoading } = useTuitionFeesQuery(filters);
  const deleteMutation = useDeleteTuitionFeeMutation();

  const fees = data?.data ?? [];
  const pagination = data?.pagination;

  const handleEdit = (item: TuitionFee) => {
    setSelectedFee(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedFee(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete tuition structure "${name}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tuition Fee Structures
          </h1>
          <p className="text-sm text-slate-500">
            Configure institutional tuition rates, billing cycles, and fee schedules by academic
            program.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {canViewPayments && (
            <Link href="/finance/payments">
              <Button
                variant="outline"
                className="border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              >
                <Receipt className="mr-1.5 size-4" />
                Receipts & Billing Ledger
              </Button>
            </Link>
          )}

          {canManageFees && (
            <Button onClick={handleCreate} className="bg-[#023e8a] hover:bg-[#00509d]">
              <Plus className="mr-1.5 size-4" />
              New Tuition Fee
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="border-slate-200">
        <CardContent className="p-3.5">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 size-4 text-slate-400" />
              <Input
                placeholder={
                  isKhmer ? 'ស្វែងរកតាមឈ្មោះ ឬកូដតម្លៃសិក្សា...' : 'Search by fee name or code...'
                }
                value={filters.search ?? ''}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                }
                className="h-9 pl-8 text-xs font-medium sm:text-sm"
              />
            </div>

            <Select
              value={filters.branchId ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, branchId: e.target.value || undefined, page: 1 }))
              }
              className="h-9 text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់សាខា' : 'All Branches'}</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                </option>
              ))}
            </Select>

            <Select
              value={filters.programId ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  programId: e.target.value || undefined,
                  page: 1,
                }))
              }
              className="h-9 text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់កម្មវិធីសិក្សា' : 'All Programs'}</option>
              {programs.map((p) => (
                <option key={p._id} value={p._id}>
                  {isKhmer ? p.nameKh || p.nameEn : p.nameEn}
                </option>
              ))}
            </Select>

            <Select
              value={filters.status ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: (e.target.value as 'active' | 'inactive') || undefined,
                  page: 1,
                }))
              }
              className="h-9 text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
              <option value="active">{isKhmer ? 'សកម្ម' : 'Active'}</option>
              <option value="inactive">{isKhmer ? 'អសកម្ម' : 'Inactive'}</option>
            </Select>
          </div>

          {(Boolean(filters.search) ||
            Boolean(filters.branchId) ||
            Boolean(filters.programId) ||
            Boolean(filters.status)) && (
            <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
              <span>{isKhmer ? 'តម្រងសកម្មត្រូវបានអនុវត្ត' : 'Active filters applied'}</span>
              <button
                type="button"
                onClick={() => {
                  setFilters({ page: 1, limit: 20 });
                }}
                className="flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                <Trash2 className="size-3.5" />
                {t.common.clearFilters}
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Table */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-100 px-6 py-4">
          <CardTitle className="text-base font-semibold text-slate-800">
            Fee Schedules & Program Rates
          </CardTitle>
          <CardDescription>
            Total of {pagination?.total ?? fees.length} fee structures configured
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/75">
                  <TableHead className="font-semibold text-slate-700">Code / Name</TableHead>
                  <TableHead className="font-semibold text-slate-700">Program / Level</TableHead>
                  <TableHead className="font-semibold text-slate-700">Campus Branch</TableHead>
                  <TableHead className="font-semibold text-slate-700">Billing Cycle</TableHead>
                  <TableHead className="font-semibold text-slate-700">Amount</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-sm text-slate-500">
                      Loading tuition fee structures...
                    </TableCell>
                  </TableRow>
                ) : fees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-sm text-slate-500">
                      No tuition fees found.
                    </TableCell>
                  </TableRow>
                ) : (
                  fees.map((fee) => {
                    const prog =
                      typeof fee.programId === 'object'
                        ? fee.programId.nameEn
                        : 'Program unavailable';
                    const lvl =
                      typeof fee.levelId === 'object' ? fee.levelId.name : 'Level unavailable';
                    const branch =
                      typeof fee.branchId === 'object'
                        ? fee.branchId.branchNameEn
                        : 'Branch unavailable';

                    return (
                      <TableRow key={fee._id} className="hover:bg-slate-50/60">
                        <TableCell className="whitespace-nowrap">
                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{fee.feeName}</span>
                            <span className="font-mono text-xs text-slate-400">{fee.feeCode}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="text-xs">
                            <span className="font-medium text-slate-800">{prog}</span>
                            <p className="text-slate-500">{lvl}</p>
                          </div>
                        </TableCell>

                        <TableCell>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                            {branch}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Badge>{formatDataLabel(fee.billingCycle)}</Badge>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm font-bold text-emerald-700">
                            {formatCurrency(fee.amount, fee.currency)}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Badge tone={fee.status === 'active' ? 'success' : 'neutral'}>
                            {formatDataLabel(fee.status)}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {canEditFees && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(fee)}
                                className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
                              >
                                <Edit2 className="size-3.5" />
                              </Button>
                            )}

                            {canDeleteFees && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(fee._id, fee.feeName)}
                                className="h-8 w-8 p-0 text-rose-600 hover:bg-rose-50"
                              >
                                <Trash2 className="size-3.5" />
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
        </CardContent>
      </Card>

      <TuitionDialog open={dialogOpen} onOpenChange={setDialogOpen} tuitionFee={selectedFee} />
    </div>
  );
};
