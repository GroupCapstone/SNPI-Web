'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  CalendarDays,
  Edit2,
  Plus,
  RefreshCw,
  Trash2,
  Search,
  Sparkles,
} from '@/components/icons';
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
import { cn } from '@/lib/utils';
import type { AcademicPeriod } from '../types';
import {
  useAcademicPeriodsQuery,
  useDeleteAcademicPeriodMutation,
} from '../hooks/use-academic-periods';
import { AcademicPeriodDialog } from './academic-period-dialog';
import { GenerateMonthlyPeriodsDialog } from './generate-monthly-periods-dialog';
import { useTranslation } from '@/lib/i18n';

export interface AcademicPeriodTableProps {
  academicYearId?: string;
  typeFilter?: string;
  searchQuery?: string;
  hideTopControls?: boolean;
  onEditPeriod?: (period: AcademicPeriod) => void;
}

export const AcademicPeriodTable: React.FC<AcademicPeriodTableProps> = ({
  academicYearId,
  typeFilter: controlledTypeFilter,
  searchQuery: controlledSearchQuery,
  hideTopControls = false,
  onEditPeriod,
}) => {
  const { t, isKhmer } = useTranslation();
  const [localSearch, setLocalSearch] = React.useState('');
  const [localTypeFilter, setLocalTypeFilter] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [generateMonthlyOpen, setGenerateMonthlyOpen] = React.useState(false);
  const [editingPeriod, setEditingPeriod] = React.useState<AcademicPeriod | null>(null);
  const [now] = React.useState(() => Date.now());

  const effectiveSearch = controlledSearchQuery !== undefined ? controlledSearchQuery : localSearch;
  const effectiveTypeFilter =
    controlledTypeFilter !== undefined ? controlledTypeFilter : localTypeFilter;

  const { data, isLoading, refetch } = useAcademicPeriodsQuery({
    academicYearId: academicYearId || undefined,
    search: effectiveSearch || undefined,
    type: effectiveTypeFilter || undefined,
    limit: 100,
  });

  const deleteMutation = useDeleteAcademicPeriodMutation();
  const periods = data?.data || [];

  const handleEdit = (p: AcademicPeriod) => {
    if (onEditPeriod) {
      onEditPeriod(p);
    } else {
      setEditingPeriod(p);
      setDialogOpen(true);
    }
  };

  const handleCreate = () => {
    setEditingPeriod(null);
    setDialogOpen(true);
  };

  const handleDelete = async (p: AcademicPeriod) => {
    if (!window.confirm(`Are you sure you want to delete period "${p.name}" (${p.code})?`)) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(p._id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete academic period';
      alert(message);
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'TERM':
        return (
          <Badge className="border-0 bg-[#023e8a] text-white">
            {isKhmer ? '៤ខែ / ឆមាស' : '4-Month / Term'}
          </Badge>
        );
      case 'SHORT_COURSE':
        return (
          <Badge className="border-0 bg-[#00509d] text-white">
            {isKhmer ? 'វគ្គខ្លី' : 'Short Course'}
          </Badge>
        );
      case 'MONTHLY':
        return (
          <Badge className="border-0 bg-[#ffc300] font-medium text-slate-950">
            {isKhmer ? 'ប្រចាំខែ' : 'Monthly'}
          </Badge>
        );
      default:
        return <Badge tone="neutral">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header controls - rendered only in standalone mode */}
      {!hideTopControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder={isKhmer ? 'ស្វែងរកតាមកូដ ឬឈ្មោះ...' : 'Search code or name...'}
                className="border-slate-300 pl-9 text-xs shadow-none focus:border-[#023e8a]"
              />
            </div>

            <select
              value={localTypeFilter}
              onChange={(e) => setLocalTypeFilter(e.target.value)}
              aria-label="Filter by Period Type"
              className="h-9 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-none focus:border-[#023e8a] focus:outline-none"
            >
              <option value="">{isKhmer ? 'គ្រប់ប្រភេទ' : 'All Types'}</option>
              <option value="TERM">{isKhmer ? 'ឆមាស ៤ខែ' : 'Term'}</option>
              <option value="SHORT_COURSE">{isKhmer ? 'វគ្គខ្លី' : 'Short Course'}</option>
              <option value="MONTHLY">{isKhmer ? 'ប្រចាំខែ' : 'Monthly'}</option>
              <option value="CUSTOM">{isKhmer ? 'ផ្ទាល់ខ្លួន' : 'Custom'}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refetch()}
              className="h-9 border-slate-300 text-xs shadow-none"
            >
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
            </Button>
            <Link href="/academic-periods/rollover">
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-[#023e8a] text-xs text-[#023e8a] hover:bg-[#023e8a]/10"
              >
                <Sparkles className="mr-1.5 h-3.5 w-3.5 text-[#ffc300]" />
                {t.academicPeriods.rolloverEngine}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGenerateMonthlyOpen(true)}
              className="h-9 border-[#00509d] text-xs text-[#00509d] shadow-none hover:bg-[#00509d]/10"
            >
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              {isKhmer ? 'បង្កើត ១២ ខែ' : 'Generate 12 Months'}
            </Button>
            <Button
              size="sm"
              onClick={handleCreate}
              className="h-9 bg-[#023e8a] text-xs text-white shadow-none hover:bg-[#00509d]"
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              {t.academicPeriods.addPeriod}
            </Button>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="border-b border-slate-200">
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.academicPeriods.periodCode}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.academicPeriods.periodName}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.academicPeriods.periodType}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.classes.academicYear}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.academicPeriods.dateRange}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {isKhmer ? 'ដំណើរការ' : 'Calendar Progress'}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.academicPeriods.sequence}
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-700">
                {t.common.status}
              </TableHead>
              <TableHead className="text-right text-xs font-semibold text-slate-700">
                {t.common.actions}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-xs text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <RefreshCw className="size-5 animate-spin text-[#00509d]" />
                    <span>
                      {isKhmer ? 'កំពុងទាញយកទិន្នន័យវគ្គសិក្សា...' : 'Loading academic periods...'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : periods.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-12 text-center text-xs text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Calendar className="size-8 text-slate-300" />
                    <span className="font-semibold text-slate-800">
                      {t.academicPeriods.noPeriodsFound}
                    </span>
                    <span className="text-slate-400">
                      {isKhmer
                        ? 'មិនមានវគ្គសិក្សាស្របតាមតម្រងនេះឡើយ'
                        : 'No periods matching the selected criteria.'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              periods.map((p) => {
                const yearName =
                  typeof p.academicYearId === 'object' && p.academicYearId !== null
                    ? `${p.academicYearId.name} (${p.academicYearId.code})`
                    : String(p.academicYearId);
                const startDateStr = p.startDate ? new Date(p.startDate).toLocaleDateString() : '-';
                const endDateStr = p.endDate ? new Date(p.endDate).toLocaleDateString() : '-';

                // Calculate progress
                let progressPercent = 0;
                let daysLeft = 0;
                const isCurrentPeriod = p.status === 'active';
                if (p.startDate && p.endDate) {
                  const s = new Date(p.startDate).getTime();
                  const e = new Date(p.endDate).getTime();
                  const n = now;
                  const total = Math.max(1, (e - s) / 86400000);
                  const elapsed = Math.max(0, Math.min(total, (n - s) / 86400000));
                  daysLeft = Math.max(0, Math.round((e - n) / 86400000));
                  progressPercent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
                }

                return (
                  <TableRow key={p._id} className="border-b border-slate-100 hover:bg-slate-50/70">
                    <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                      {p.code}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-slate-900">{p.name}</TableCell>
                    <TableCell>{getTypeBadge(p.type)}</TableCell>
                    <TableCell className="text-xs text-slate-600">{yearName}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap text-slate-600">
                      {startDateStr} – {endDateStr}
                    </TableCell>
                    <TableCell className="min-w-[140px]">
                      {p.startDate && p.endDate ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{progressPercent}%</span>
                            <span className="text-slate-400">
                              {daysLeft > 0
                                ? `${daysLeft} ${t.academicPeriods.daysLeft}`
                                : isKhmer
                                  ? 'បានបញ្ចប់'
                                  : 'Ended'}
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all duration-300',
                                isCurrentPeriod
                                  ? 'bg-[#00509d]'
                                  : progressPercent >= 100
                                    ? 'bg-slate-300'
                                    : 'bg-emerald-500',
                              )}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-slate-600">
                      {p.sequence}
                    </TableCell>
                    <TableCell>
                      <Badge
                        tone={p.status === 'active' ? 'success' : 'neutral'}
                        className="text-xs capitalize"
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(p)}
                          className="h-7 w-7 p-0 text-slate-600 hover:text-[#023e8a]"
                          title="Edit"
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => void handleDelete(p)}
                          className="h-7 w-7 p-0 text-rose-600 hover:text-rose-700"
                          title="Delete"
                        >
                          <Trash2 className="size-3.5" />
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

      {!hideTopControls && (
        <>
          <AcademicPeriodDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            period={editingPeriod}
          />
          <GenerateMonthlyPeriodsDialog
            open={generateMonthlyOpen}
            onOpenChange={setGenerateMonthlyOpen}
            onSuccess={() => void refetch()}
          />
        </>
      )}
    </div>
  );
};
