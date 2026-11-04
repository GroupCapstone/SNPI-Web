'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  AlertCircle,
  Edit2,
  Eye,
  History,
  LayoutGrid,
  List,
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
import { getAcademicYears } from '@/features/academic-years/api/get-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { EntityHistoryDialog } from '@/features/audit-logs/components/entity-history-dialog';
import { getBranches } from '@/features/branches/api/get-branches';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';

import {
  useClassesQuery,
  useClassSummaryQuery,
  useDeleteClassMutation,
} from '../hooks/use-classes';
import type { ClassItem } from '../types';
import { ClassAvailabilityKpis } from './class-availability-kpis';
import { ClassCardGrid, getClassAvailabilityMeta } from './class-card-grid';
import { ClassDialog } from './class-dialog';
import { useTranslation } from '@/lib/i18n';

export const ClassTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { user, hasPermission, currentBranchId } = useAuth();
  const [search, setSearch] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState('');
  const [selectedYearId, setSelectedYearId] = React.useState('');
  const [selectedProgramId, setSelectedProgramId] = React.useState('');
  const [selectedShift, setSelectedShift] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [availability, setAvailability] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'table' | 'grid'>('table');
  const [page, setPage] = React.useState(1);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingClass, setEditingClass] = React.useState<ClassItem | null>(null);
  const [historyTarget, setHistoryTarget] = React.useState<{ id: string; title: string } | null>(
    null,
  );
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data: allBranches = [] } = useQuery({
    queryKey: ['branches-list'],
    queryFn: getBranches,
  });

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

  const { data: academicYears = [] } = useQuery({
    queryKey: ['academic-years-list'],
    queryFn: getAcademicYears,
  });

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const programs = programsData?.data ?? [];

  const { data: summaryData, isLoading: isSummaryLoading } = useClassSummaryQuery({
    branchId: effectiveBranchFilter,
    academicYearId: selectedYearId || undefined,
    programId: selectedProgramId || undefined,
    shift: selectedShift || undefined,
    status: status || undefined,
  });
  const summary = summaryData?.data;

  const { data, isLoading, isError, refetch } = useClassesQuery({
    search: search || undefined,
    branchId: effectiveBranchFilter,
    academicYearId: selectedYearId || undefined,
    programId: selectedProgramId || undefined,
    shift: selectedShift || undefined,
    status: status || undefined,
    availability: availability || undefined,
    page,
    limit: viewMode === 'grid' ? 12 : 10,
  });

  const deleteMutation = useDeleteClassMutation();

  const handleEdit = (classItem: ClassItem) => {
    setActionError(null);
    setEditingClass(classItem);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setEditingClass(null);
    setDialogOpen(true);
  };

  const handleDelete = async (classItem: ClassItem) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to cancel/archive class "${classItem.className}" (${classItem.classCode})?`,
        )
      ) {
        await deleteMutation.mutateAsync(classItem._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete class';
      setActionError(msg);
    }
  };

  const classes = data?.data ?? [];
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

      {/* Class Availability & Capacity Pulse Cards */}
      <ClassAvailabilityKpis
        summary={summary}
        isLoading={isSummaryLoading}
        activeAvailability={availability}
        onSelectAvailability={(av) => {
          setAvailability(av);
          setPage(1);
        }}
      />

      {/* Action & Filter Toolbar */}
      <div className="space-y-3">
        {/* Top Control Bar: Search on left, View switcher and Create button on right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={`${t.common.search} (${t.classes.classCode}, ${t.classes.className})...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setViewMode('table');
                  setPage(1);
                }}
                className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-[#00509d] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={t.classes.viewModes.table}
              >
                <List className="size-3.5" />
                <span className="hidden sm:inline">{t.classes.viewModes.table}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('grid');
                  setPage(1);
                }}
                className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#00509d] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={t.classes.viewModes.grid}
              >
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">{t.classes.viewModes.grid}</span>
              </button>
            </div>

            {hasPermission('class.create.own_branch') && (
              <Button
                onClick={handleCreate}
                size="sm"
                className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
              >
                <Plus className="mr-1.5 size-4" />
                {t.classes.addClass}
              </Button>
            )}
          </div>
        </div>

        {/* Filter Strip: Balanced grid for all 6 filters avoiding orphan dropdown wrapping */}
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-2.5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {/* 1. Branch Filter */}
            {branches.length > 1 ? (
              <Select
                value={selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  setPage(1);
                }}
                className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
              >
                {user?.branchAccess === 'all' && (
                  <option value="">{isKhmer ? 'គ្រប់សាខា' : t.common.allBranches}</option>
                )}
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchCode} · {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                  </option>
                ))}
              </Select>
            ) : branches[0] ? (
              <div className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 sm:text-sm">
                <span className="font-semibold text-[#00509d]">{branches[0].branchCode}</span>
                <span>·</span>
                <span className="truncate">
                  {isKhmer
                    ? branches[0].branchNameKh || branches[0].branchNameEn
                    : branches[0].branchNameEn}
                </span>
              </div>
            ) : null}

            {/* 2. Academic Year Filter */}
            <Select
              value={selectedYearId}
              onChange={(e) => {
                setSelectedYearId(e.target.value);
                setPage(1);
              }}
              className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់ឆ្នាំសិក្សា' : 'All Academic Years'}</option>
              {academicYears.map((ay) => (
                <option key={ay._id} value={ay._id}>
                  {ay.name} {ay.isCurrent ? (isKhmer ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
                </option>
              ))}
            </Select>

            {/* 3. Program Filter */}
            <Select
              value={selectedProgramId}
              onChange={(e) => {
                setSelectedProgramId(e.target.value);
                setPage(1);
              }}
              className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់កម្មវិធីសិក្សា' : 'All Programs'}</option>
              {programs.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.code} — {isKhmer ? p.nameKh || p.nameEn : p.nameEn}
                </option>
              ))}
            </Select>

            {/* 4. Shift Filter */}
            <Select
              value={selectedShift}
              onChange={(e) => {
                setSelectedShift(e.target.value);
                setPage(1);
              }}
              className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់វេនសិក្សា' : 'All Shifts'}</option>
              <option value="morning">{t.classes.shifts.morning}</option>
              <option value="afternoon">{t.classes.shifts.afternoon}</option>
              <option value="evening">{t.classes.shifts.evening}</option>
              <option value="weekend">{t.classes.shifts.weekend}</option>
              <option value="hourly">{t.classes.shifts.hourly}</option>
              <option value="custom">{t.classes.shifts.custom}</option>
            </Select>

            {/* 5. Availability Filter */}
            <Select
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setPage(1);
              }}
              className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
            >
              <option value="">
                {isKhmer ? 'គ្រប់ភាពទំនេរ' : t.classes.availabilityFilters.all}
              </option>
              <option value="available">{t.classes.availabilityFilters.available}</option>
              <option value="near_capacity">{t.classes.availabilityFilters.nearCapacity}</option>
              <option value="full">{t.classes.availabilityFilters.full}</option>
              <option value="closed">{t.classes.availabilityFilters.closed}</option>
            </Select>

            {/* 6. Status Filter */}
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="h-9 w-full bg-white text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
              <option value="planned">{t.classes.statuses.planned}</option>
              <option value="active">{t.classes.statuses.active}</option>
              <option value="completed">{t.classes.statuses.completed}</option>
              <option value="cancelled">{t.classes.statuses.cancelled}</option>
            </Select>
          </div>

          {/* Active Filter Clear Indicator */}
          {(Boolean(search) ||
            Boolean(selectedBranchId) ||
            Boolean(selectedYearId) ||
            Boolean(selectedProgramId) ||
            Boolean(selectedShift) ||
            Boolean(availability) ||
            Boolean(status)) && (
            <div className="mt-2.5 flex items-center justify-between border-t border-slate-200/60 pt-2 text-xs text-slate-500">
              <span className="font-medium">
                {isKhmer ? 'តម្រងសកម្មត្រូវបានអនុវត្ត' : 'Active filters applied'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedBranchId('');
                  setSelectedYearId('');
                  setSelectedProgramId('');
                  setSelectedShift('');
                  setAvailability('');
                  setStatus('');
                  setPage(1);
                }}
                className="flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                <X className="size-3.5" />
                {t.common.clearFilters}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {availability && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {language === 'kh' ? 'តម្រងសកម្ម:' : 'Active Filter:'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#00509d]">
            <span>
              {availability === 'available'
                ? t.classes.availabilityFilters.available
                : availability === 'near_capacity'
                  ? t.classes.availabilityFilters.nearCapacity
                  : availability === 'full'
                    ? t.classes.availabilityFilters.full
                    : t.classes.availabilityFilters.closed}
            </span>
            <button
              type="button"
              onClick={() => {
                setAvailability('');
                setPage(1);
              }}
              className="rounded text-blue-500 hover:text-blue-800"
              title="Clear availability filter"
            >
              <X className="size-3" />
            </button>
          </span>
          <button
            type="button"
            onClick={() => {
              setAvailability('');
              setPage(1);
            }}
            className="text-xs font-medium text-slate-500 underline hover:text-slate-800"
          >
            {language === 'kh' ? 'សម្អាតតម្រង' : 'Clear filter'}
          </button>
        </div>
      )}

      {/* Content Area: Table View or Grid View */}
      {isLoading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="space-y-3 border-slate-200 p-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="space-y-3 p-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        )
      ) : isError ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-sm font-medium text-rose-600">Failed to load classes.</p>
            <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
              <RefreshCw className="size-3.5" /> Retry
            </Button>
          </CardContent>
        </Card>
      ) : classes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-base font-semibold text-slate-800">No classes found</p>
            <p className="mt-1 text-sm text-slate-500">
              {search ||
              selectedBranchId ||
              selectedYearId ||
              selectedProgramId ||
              status ||
              availability
                ? 'No study classes match your selected search criteria.'
                : 'Start configuring academic offerings by creating classes.'}
            </p>
            {!search &&
              !selectedBranchId &&
              !selectedYearId &&
              !selectedProgramId &&
              !status &&
              !availability &&
              hasPermission('class.create.own_branch') && (
                <Button onClick={handleCreate} size="sm" className="mt-4 bg-[#00509d] text-white">
                  <Plus className="size-4" /> Create Class
                </Button>
              )}
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="space-y-4">
          <ClassCardGrid
            classes={classes}
            hasPermission={hasPermission}
            onEdit={handleEdit}
            onDelete={(c) => void handleDelete(c)}
            onViewHistory={(c) =>
              setHistoryTarget({
                id: c._id,
                title: `${c.className} (${c.classCode})`,
              })
            }
            onCreate={handleCreate}
          />

          {/* Grid Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <Card>
              <CardContent className="flex items-center justify-between p-3 text-xs text-slate-500">
                <p>
                  {t.common.showing} {t.common.page}{' '}
                  <span className="font-medium text-slate-900">{pagination.page}</span>{' '}
                  {t.common.of}{' '}
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
                    onClick={() => setPage((p) => p + 1)}
                  >
                    {t.common.next}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">{t.classes.className}</TableHead>
                  <TableHead className="whitespace-nowrap">
                    {t.classes.program} & {t.classes.level}
                  </TableHead>
                  <TableHead className="hidden whitespace-nowrap md:table-cell">
                    {t.branch.title} & {t.classes.academicYear}
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    {t.classes.capacity} & {t.classes.availability}
                  </TableHead>
                  <TableHead className="w-32 whitespace-nowrap">{t.classes.status}</TableHead>
                  <TableHead className="w-24 text-right whitespace-nowrap">
                    {t.common.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => {
                  const programName =
                    typeof cls.programId === 'object' && cls.programId !== null
                      ? (language === 'kh'
                          ? cls.programId.nameKh || cls.programId.nameEn
                          : cls.programId.nameEn) || cls.programId.code
                      : '—';
                  const levelName =
                    typeof cls.levelId === 'object' && cls.levelId !== null ? cls.levelId.name : '';
                  const branchCode =
                    typeof cls.branchId === 'object' && cls.branchId !== null
                      ? cls.branchId.branchCode
                      : '';
                  const branchName =
                    typeof cls.branchId === 'object' && cls.branchId !== null
                      ? language === 'kh'
                        ? cls.branchId.branchNameKh || cls.branchId.branchNameEn
                        : cls.branchId.branchNameEn
                      : '—';
                  const yearName =
                    typeof cls.academicYearId === 'object' && cls.academicYearId !== null
                      ? cls.academicYearId.name
                      : '—';
                  const classroomName =
                    typeof cls.classroomId === 'object' && cls.classroomId !== null
                      ? cls.classroomId.name || cls.classroomId.code
                      : undefined;

                  const shiftLabel =
                    t.classes.shifts[cls.shift as keyof typeof t.classes.shifts] ||
                    cls.shift ||
                    'morning';

                  const daysLabel =
                    cls.daysPattern === 'MON_FRI'
                      ? t.classes.daysPatterns.monFri
                      : cls.daysPattern === 'MON_WED_FRI'
                        ? t.classes.daysPatterns.monWedFri
                        : cls.daysPattern === 'TUE_THU_SAT'
                          ? t.classes.daysPatterns.tueThuSat
                          : cls.daysPattern === 'SAT_SUN'
                            ? t.classes.daysPatterns.satSun
                            : t.classes.daysPatterns.custom;

                  const statusLabel =
                    t.classes.statuses[cls.status as keyof typeof t.classes.statuses] || cls.status;

                  return (
                    <TableRow key={cls._id}>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex min-w-0 flex-col">
                          <Link
                            href={`/classes/${cls._id}`}
                            className="font-semibold whitespace-nowrap text-slate-900 hover:text-[#00509d] hover:underline"
                          >
                            {cls.className}
                          </Link>
                          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-500">
                            <Link
                              href={`/classes/${cls._id}`}
                              className="font-mono text-xs font-semibold text-[#00509d] hover:underline"
                            >
                              {cls.classCode}
                            </Link>
                            {classroomName && (
                              <>
                                <span className="text-slate-300">·</span>
                                <span>{classroomName}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap text-slate-700">
                        <div className="flex min-w-0 flex-col">
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{programName}</span>
                            {levelName && <span className="text-slate-500">· {levelName}</span>}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-500">
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-700 capitalize">
                              {shiftLabel}
                            </span>
                            <span>{daysLabel}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-xs whitespace-nowrap text-slate-600 md:table-cell">
                        <div className="flex min-w-0 flex-col">
                          <span className="font-semibold whitespace-nowrap text-slate-800">
                            {branchCode && branchName !== branchCode
                              ? `${branchCode} · ${branchName}`
                              : branchName}
                          </span>
                          <span className="text-xs whitespace-nowrap text-slate-500">
                            {yearName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap text-slate-700">
                        {(() => {
                          const meta = getClassAvailabilityMeta(cls);
                          const seatsText =
                            meta.statusKey === 'full'
                              ? t.classes.kpis.noSeatsLeft
                              : meta.statusKey === 'closed'
                                ? '—'
                                : t.classes.kpis.seatsLeft.replace(
                                    '{count}',
                                    String(meta.remaining),
                                  );

                          return (
                            <div className="flex min-w-[130px] flex-col gap-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-900">
                                  {meta.enrolled} / {meta.capacity}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">
                                  {meta.occupancyPercent}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full transition-all duration-300 ${meta.barColor}`}
                                  style={{ width: `${meta.occupancyPercent}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-medium text-slate-500">
                                {seatsText}
                              </span>
                            </div>
                          );
                        })()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {(() => {
                          const meta = getClassAvailabilityMeta(cls);
                          return (
                            <div className="flex flex-col items-start gap-1">
                              <Badge
                                tone={
                                  cls.status === 'active'
                                    ? 'success'
                                    : cls.status === 'planned'
                                      ? 'neutral'
                                      : cls.status === 'completed'
                                        ? 'warning'
                                        : 'danger'
                                }
                              >
                                {statusLabel}
                              </Badge>
                              <Badge tone={meta.badgeTone} className="text-[10px] font-medium">
                                {t.classes.availabilityStatus[meta.statusKey]}
                              </Badge>
                            </div>
                          );
                        })()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              setHistoryTarget({
                                id: cls._id,
                                title: `${cls.className} (${cls.classCode})`,
                              })
                            }
                            aria-label="View class history"
                            className="size-8 text-slate-600 hover:text-[#00509d]"
                            title={language === 'kh' ? 'មើលប្រវត្តិ' : 'View History'}
                          >
                            <History className="size-3.5" />
                          </Button>
                          <Link href={`/classes/${cls._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="View class hub"
                              className="size-8 text-slate-600 hover:text-[#00509d]"
                              title="View Class Details & Roster"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                          </Link>
                          {hasPermission('class.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(cls)}
                              aria-label="Edit class"
                              className="size-8 text-slate-600 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {hasPermission('class.delete.own_branch') && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => void handleDelete(cls)}
                              aria-label="Archive class"
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

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                <p>
                  {t.common.showing} {t.common.page}{' '}
                  <span className="font-medium text-slate-900">{pagination.page}</span>{' '}
                  {t.common.of}{' '}
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
                    onClick={() => setPage((p) => p + 1)}
                  >
                    {t.common.next}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <ClassDialog open={dialogOpen} onOpenChange={setDialogOpen} classItem={editingClass} />

      {/* Entity Audit History Dialog */}
      <EntityHistoryDialog
        open={Boolean(historyTarget)}
        onOpenChange={(open) => !open && setHistoryTarget(null)}
        entityType="Class"
        entityId={historyTarget?.id}
        entityTitle={historyTarget?.title}
      />
    </div>
  );
};
