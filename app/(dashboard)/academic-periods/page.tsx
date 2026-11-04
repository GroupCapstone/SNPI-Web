'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  Layers,
  Plus,
  RefreshCw,
  Repeat,
  RotateCcw,
  Search,
  Sparkles,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useAuth } from '@/features/auth/context/auth-context';
import { AcademicPeriodDialog } from '@/features/academic-periods/components/academic-period-dialog';
import { AcademicPeriodTable } from '@/features/academic-periods/components/academic-period-table';
import { GenerateMonthlyPeriodsDialog } from '@/features/academic-periods/components/generate-monthly-periods-dialog';
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import type { AcademicPeriod } from '@/features/academic-periods/types';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function AcademicPeriodsPage() {
  const { t, isKhmer } = useTranslation();
  const { hasPermission } = useAuth();

  // Filters State
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedAcademicYearFilter, setSelectedAcademicYearFilter] = React.useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = React.useState<string>('');

  // Dialogs State
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [generateMonthlyOpen, setGenerateMonthlyOpen] = React.useState(false);
  const [editingPeriod, setEditingPeriod] = React.useState<AcademicPeriod | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Load Academic Years
  const { data: academicYears = [], isLoading: _isLoadingYears } = useAcademicYearsQuery();

  // Auto-select current active year on first load if none selected
  React.useEffect(() => {
    if (!selectedAcademicYearFilter && academicYears.length > 0) {
      const currentYear = academicYears.find((y) => y.isCurrent);
      if (currentYear) {
        setSelectedAcademicYearFilter(currentYear._id);
      }
    }
  }, [academicYears, selectedAcademicYearFilter]);

  // Load Periods for the selected year
  const {
    data: periodsRes,
    isLoading: _isLoadingPeriods,
    refetch: refetchPeriods,
  } = useAcademicPeriodsQuery({
    academicYearId: selectedAcademicYearFilter || undefined,
    limit: 100,
  });

  const periods = React.useMemo(() => periodsRes?.data ?? [], [periodsRes?.data]);

  // Load Classes count in this academic year
  const { data: classesRes } = useClassesQuery({
    academicYearId: selectedAcademicYearFilter || undefined,
    limit: 1,
  });
  const totalClassesCount = classesRes?.pagination?.total ?? 0;

  // Active Period and Progress Calculations
  const [now] = React.useState(() => Date.now());
  const activePeriod = React.useMemo(
    () => periods.find((p) => p.status === 'active') ?? periods[0] ?? null,
    [periods],
  );

  const termMetrics = React.useMemo(() => {
    if (!activePeriod || !activePeriod.startDate || !activePeriod.endDate) {
      return { totalDays: 0, daysElapsed: 0, daysRemaining: 0, percent: 0 };
    }
    const start = new Date(activePeriod.startDate).getTime();
    const end = new Date(activePeriod.endDate).getTime();
    const totalDays = Math.max(1, Math.round((end - start) / 86400000));
    const daysElapsed = Math.max(0, Math.min(totalDays, Math.round((now - start) / 86400000)));
    const daysRemaining = Math.max(0, Math.round((end - now) / 86400000));
    const percent = Math.min(100, Math.max(0, Math.round((daysElapsed / totalDays) * 100)));

    return { totalDays, daysElapsed, daysRemaining, percent };
  }, [activePeriod, now]);

  // Period Type Counts
  const countsByType = React.useMemo(() => {
    return {
      all: periods.length,
      TERM: periods.filter((p) => p.type === 'TERM').length,
      SHORT_COURSE: periods.filter((p) => p.type === 'SHORT_COURSE').length,
      MONTHLY: periods.filter((p) => p.type === 'MONTHLY').length,
      CUSTOM: periods.filter((p) => p.type === 'CUSTOM').length,
    };
  }, [periods]);

  const handleCreate = () => {
    setEditingPeriod(null);
    setDialogOpen(true);
  };

  const handleEdit = (period: AcademicPeriod) => {
    setEditingPeriod(period);
    setDialogOpen(true);
  };

  const handleResetFilters = () => {
    const currentYear = academicYears.find((y) => y.isCurrent);
    setSelectedAcademicYearFilter(currentYear ? currentYear._id : '');
    setSelectedTypeFilter('');
    setSearch('');
    setDebouncedSearch('');
  };

  const canCreate =
    hasPermission('academic_period.create.all_branches') ||
    hasPermission('academic_period.create.own_branch');
  const _canEdit =
    hasPermission('academic_period.edit.all_branches') ||
    hasPermission('academic_period.edit.own_branch');

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'academic_period.view.own_branch',
        'academic_period.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.academicPeriods.title}
              </h1>
              <Badge tone="neutral" className="border-blue-200 bg-blue-50 text-[#00509d]">
                {isKhmer ? 'ប្រតិទិន និងវគ្គសិក្សា' : 'Calendar & Term Hub'}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">{t.academicPeriods.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => void refetchPeriods()}
              className="h-9 border-slate-200 text-xs shadow-none"
            >
              <RefreshCw className="mr-1.5 size-3.5" />
              {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
            </Button>

            <Link href="/academic-periods/rollover">
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-[#023e8a] text-xs font-semibold text-[#023e8a] hover:bg-[#023e8a]/10"
              >
                <Sparkles className="mr-1.5 size-3.5 text-[#ffc300]" />
                {t.academicPeriods.rolloverEngine}
              </Button>
            </Link>

            <Link href="/term-completion">
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-emerald-600 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                <CheckCircle2 className="mr-1.5 size-3.5 text-emerald-600" />
                {t.academicPeriods.termCompletion}
              </Button>
            </Link>

            {canCreate && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGenerateMonthlyOpen(true)}
                  className="h-9 border-[#00509d] text-xs font-semibold text-[#00509d] hover:bg-[#00509d]/10"
                >
                  <CalendarDays className="mr-1.5 size-3.5 text-[#00509d]" />
                  {t.academicPeriods.generateMonthly}
                </Button>

                <Button
                  size="sm"
                  onClick={handleCreate}
                  className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
                >
                  <Plus className="mr-1.5 size-3.5" />
                  {t.academicPeriods.addPeriod}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Top Executive KPI Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Active Term Card */}
          <Card className="border border-slate-200 bg-white">
            <CardContent className="flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {t.academicPeriods.kpiActiveTerm}
                </span>
                <Calendar className="size-5 shrink-0 text-[#00509d]" />
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#0056FF]" />
                  <span className="truncate text-sm font-bold text-slate-900">
                    {activePeriod ? activePeriod.name : isKhmer ? 'គ្មានវគ្គសកម្ម' : 'None Active'}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-xs text-slate-400">
                  {activePeriod ? activePeriod.code : '—'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Term Progress Card */}
          <Card className="border border-slate-200 bg-white">
            <CardContent className="flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {t.academicPeriods.kpiTermProgress}
                </span>
                <Clock className="size-5 shrink-0 text-emerald-600" />
              </div>
              <div className="mt-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">{termMetrics.percent}%</span>
                  <span className="text-xs font-medium text-emerald-700">
                    {termMetrics.daysRemaining} {t.academicPeriods.daysLeft}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${termMetrics.percent}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Periods Breakdown */}
          <Card className="border border-slate-200 bg-white">
            <CardContent className="flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {t.academicPeriods.kpiTotalPeriods}
                </span>
                <Layers className="size-5 shrink-0 text-amber-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900">{periods.length}</div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {countsByType.TERM} {isKhmer ? 'ឆមាស' : 'Terms'} · {countsByType.MONTHLY}{' '}
                  {isKhmer ? 'ខែ' : 'Mo'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Active Classes in Period */}
          <Card className="border border-slate-200 bg-white">
            <CardContent className="flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  {t.academicPeriods.kpiClassUtilization}
                </span>
                <Users className="size-5 shrink-0 text-indigo-600" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900">{totalClassesCount}</div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {isKhmer ? 'ថ្នាក់ដំណើរការក្នុងឆ្នាំនេះ' : 'Classes active in context'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rollover Readiness Card */}
          <Card className="col-span-2 border-blue-200 bg-blue-50/40 sm:col-span-1">
            <CardContent className="flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#00509d] uppercase">
                  {t.academicPeriods.kpiRolloverStatus}
                </span>
                <Repeat className="size-5 shrink-0 text-[#00509d]" />
              </div>
              <div className="mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#023e8a]">
                    {termMetrics.daysRemaining <= 30
                      ? isKhmer
                        ? 'ត្រៀមប្តូរវគ្គ'
                        : 'Rollover Ready'
                      : isKhmer
                        ? 'កំពុងដំណើរការ'
                        : 'In Progress'}
                  </span>
                </div>
                <Link
                  href="/academic-periods/rollover"
                  className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-[#00509d] hover:underline"
                >
                  <span>{isKhmer ? 'បើកម៉ាស៊ីនឡើងថ្នាក់' : 'Open Rollover Engine'}</span>
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Term Progress Timeline Banner */}
        {activePeriod && activePeriod.startDate && activePeriod.endDate && (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-[#023e8a] p-4 text-white shadow-xs">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#ffd60a] px-2 py-0.5 text-xs font-bold text-slate-950">
                    {isKhmer ? 'វគ្គសិក្សាបច្ចុប្បន្ន' : 'Current Active Term'}
                  </span>
                  <span className="text-sm font-bold text-white md:text-base">
                    {activePeriod.name} ({activePeriod.code})
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  {t.academicPeriods.termTimeline}:{' '}
                  {new Date(activePeriod.startDate).toLocaleDateString()} —{' '}
                  {new Date(activePeriod.endDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-300">
                    {termMetrics.daysElapsed} {t.academicPeriods.daysElapsed} ·{' '}
                    {termMetrics.daysRemaining} {t.academicPeriods.daysLeft}
                  </div>
                  <div className="text-lg font-bold text-[#ffd60a]">{termMetrics.percent}%</div>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="relative mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-[#ffd60a] transition-all duration-500"
                  style={{ width: `${termMetrics.percent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs & Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          {/* Quick Period Type Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedTypeFilter('')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                selectedTypeFilter === ''
                  ? 'bg-[#023e8a] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              )}
            >
              <span>{t.academicPeriods.allTypes}</span>
              <span
                className={cn(
                  'py-0.2 rounded-full px-1.5 text-xs',
                  selectedTypeFilter === ''
                    ? 'bg-[#00509d] text-white'
                    : 'bg-slate-200 text-slate-700',
                )}
              >
                {countsByType.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTypeFilter('TERM')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                selectedTypeFilter === 'TERM'
                  ? 'bg-[#023e8a] text-white'
                  : 'bg-blue-50 text-[#00509d] hover:bg-blue-100',
              )}
            >
              <span>{t.academicPeriods.typeTerm}</span>
              <span
                className={cn(
                  'py-0.2 rounded-full px-1.5 text-xs',
                  selectedTypeFilter === 'TERM'
                    ? 'bg-[#00509d] text-white'
                    : 'bg-blue-200 text-blue-900',
                )}
              >
                {countsByType.TERM}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTypeFilter('SHORT_COURSE')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                selectedTypeFilter === 'SHORT_COURSE'
                  ? 'bg-[#00509d] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              )}
            >
              <span>{t.academicPeriods.typeShortCourse}</span>
              <span
                className={cn(
                  'py-0.2 rounded-full px-1.5 text-xs',
                  selectedTypeFilter === 'SHORT_COURSE'
                    ? 'bg-[#023e8a] text-white'
                    : 'bg-slate-200 text-slate-700',
                )}
              >
                {countsByType.SHORT_COURSE}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTypeFilter('MONTHLY')}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                selectedTypeFilter === 'MONTHLY'
                  ? 'bg-amber-500 font-bold text-slate-950'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100',
              )}
            >
              <span>{t.academicPeriods.typeMonthly}</span>
              <span
                className={cn(
                  'py-0.2 rounded-full px-1.5 text-xs',
                  selectedTypeFilter === 'MONTHLY'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-200 text-amber-900',
                )}
              >
                {countsByType.MONTHLY}
              </span>
            </button>

            {countsByType.CUSTOM > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTypeFilter('CUSTOM')}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                  selectedTypeFilter === 'CUSTOM'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                )}
              >
                <span>{t.academicPeriods.typeCustom}</span>
                <span
                  className={cn(
                    'py-0.2 rounded-full px-1.5 text-xs',
                    selectedTypeFilter === 'CUSTOM'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-700',
                  )}
                >
                  {countsByType.CUSTOM}
                </span>
              </button>
            )}
          </div>

          {/* Academic Year Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isKhmer ? 'ស្វែងរកតាមកូដ ឬឈ្មោះ...' : 'Search code or name...'}
                className="h-9 bg-white pl-9 text-xs"
              />
            </div>

            <Select
              value={selectedAcademicYearFilter}
              onChange={(e) => setSelectedAcademicYearFilter(e.target.value)}
              className="h-9 w-44 bg-white text-xs"
            >
              <option value="">{t.studentStatusHistory.allAcademicYears}</option>
              {academicYears.map((ay) => (
                <option key={ay._id} value={ay._id}>
                  {ay.name} {ay.isCurrent ? (isKhmer ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
                </option>
              ))}
            </Select>

            {(selectedAcademicYearFilter || selectedTypeFilter || search) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-9 gap-1.5 px-2.5 text-xs text-slate-600 hover:text-slate-900"
                title="Reset filters"
              >
                <RotateCcw className="size-3.5" />
                <span>{isKhmer ? 'សម្អាត' : 'Reset'}</span>
              </Button>
            )}
          </div>
        </div>

        {/* Periods Table */}
        <AcademicPeriodTable
          academicYearId={selectedAcademicYearFilter}
          typeFilter={selectedTypeFilter}
          searchQuery={debouncedSearch}
          hideTopControls={true}
          onEditPeriod={handleEdit}
        />

        {/* Dialog Modals */}
        <AcademicPeriodDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          period={editingPeriod}
        />

        <GenerateMonthlyPeriodsDialog
          open={generateMonthlyOpen}
          onOpenChange={setGenerateMonthlyOpen}
          defaultAcademicYearId={selectedAcademicYearFilter}
          onSuccess={() => void refetchPeriods()}
        />
      </div>
    </PermissionGuard>
  );
}
