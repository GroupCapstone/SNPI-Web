'use client';

import * as React from 'react';
import { Edit2, Plus, RefreshCw, Trash2, Search } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Intake } from '../types';
import { useIntakesQuery, useDeleteIntakeMutation } from '../hooks/use-intakes';
import { IntakeDialog } from './intake-dialog';
import { useTranslation } from '@/lib/i18n';

export const IntakeTable: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingIntake, setEditingIntake] = React.useState<Intake | null>(null);

  const { data, isLoading, refetch } = useIntakesQuery({
    search: search || undefined,
    status: statusFilter || undefined,
    limit: 50,
  });

  const deleteMutation = useDeleteIntakeMutation();
  const intakes = data?.data || [];

  const handleEdit = (item: Intake) => {
    setEditingIntake(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingIntake(null);
    setDialogOpen(true);
  };

  const handleDelete = async (item: Intake) => {
    if (
      !window.confirm(`Are you sure you want to delete offering "${item.name}" (${item.code})?`)
    ) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(item._id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete offering';
      alert(message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header controls - single row, no shadow */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.intakes.searchPlaceholder}
              className="border-slate-300 pl-9 shadow-none focus:border-[#023e8a]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by Status"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-none focus:border-[#023e8a] focus:outline-none"
          >
            <option value="">{t.common.allStatuses}</option>
            <option value="open">{t.intakes.openStatus}</option>
            <option value="planned">{t.intakes.planned}</option>
            <option value="closed">{t.intakes.closedStatus}</option>
            <option value="archived">{t.intakes.archivedStatus}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            className="border-slate-300 shadow-none"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            {t.common.refresh}
          </Button>
          <Button
            size="sm"
            onClick={handleCreate}
            className="bg-[#023e8a] text-white shadow-none hover:bg-[#00509d]"
          >
            <Plus className="mr-1 h-4 w-4" />
            {t.intakes.addIntake}
          </Button>
        </div>
      </div>

      {/* Table Container - no shadow */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-b border-slate-200">
              <TableHead className="font-semibold text-slate-700">{t.intakes.intakeCode}</TableHead>
              <TableHead className="font-semibold text-slate-700">{t.intakes.intakeName}</TableHead>
              <TableHead className="font-semibold text-slate-700">{t.intakes.periodTerm}</TableHead>
              <TableHead className="font-semibold text-slate-700">
                {t.intakes.programLevel}
              </TableHead>
              <TableHead className="font-semibold text-slate-700">{t.nav.branches}</TableHead>
              <TableHead className="font-semibold text-slate-700">{t.intakes.dateRange}</TableHead>
              <TableHead className="font-semibold text-slate-700">{t.intakes.capacity}</TableHead>
              <TableHead className="font-semibold text-slate-700">{t.common.status}</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">
                {t.common.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-slate-500">
                  {t.intakes.loadingOfferings}
                </TableCell>
              </TableRow>
            ) : intakes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-slate-500">
                  {t.intakes.noIntakesFound}
                </TableCell>
              </TableRow>
            ) : (
              intakes.map((item) => {
                const progName =
                  typeof item.programId === 'object' && item.programId !== null
                    ? item.programId.nameEn
                    : String(item.programId);

                const levelName =
                  typeof item.levelId === 'object' && item.levelId !== null
                    ? item.levelId.name
                    : String(item.levelId);

                const branchName =
                  typeof item.branchId === 'object' && item.branchId !== null
                    ? (item.branchId as { branchNameEn?: string }).branchNameEn || 'Main Campus'
                    : String(item.branchId);

                const startDateStr = item.startDate
                  ? new Date(item.startDate).toLocaleDateString()
                  : '-';
                const endDateStr = item.endDate ? new Date(item.endDate).toLocaleDateString() : '-';

                return (
                  <TableRow key={item._id} className="border-b border-slate-100 hover:bg-slate-50">
                    <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                      {item.code}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-slate-900">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <div className="flex min-w-0 flex-col">
                        <span className="font-semibold text-slate-800">
                          {typeof item.academicPeriodId === 'object' &&
                          item.academicPeriodId !== null
                            ? item.academicPeriodId.name
                            : String(item.academicPeriodId)}
                        </span>
                        {typeof item.academicPeriodId === 'object' &&
                          item.academicPeriodId?.code && (
                            <span className="font-mono text-xs text-slate-500">
                              {item.academicPeriodId.code}
                            </span>
                          )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <div className="flex min-w-0 flex-col">
                        <span className="font-semibold text-slate-800">{progName}</span>
                        <span className="text-xs text-slate-500">{levelName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{branchName}</TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <div className="flex min-w-0 flex-col">
                        <span>{startDateStr}</span>
                        <span className="text-xs text-slate-400">to {endDateStr}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{item.capacity || '–'}</TableCell>
                    <TableCell>
                      <Badge tone={item.status === 'open' ? 'success' : 'neutral'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0 text-slate-600 hover:text-[#023e8a]"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void handleDelete(item)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <IntakeDialog open={dialogOpen} onOpenChange={setDialogOpen} intake={editingIntake} />
    </div>
  );
};
