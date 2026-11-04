'use client';

import * as React from 'react';
import { CalendarCheck, CalendarRange, Layers, Plus, RefreshCw, Search } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useAuth } from '@/features/auth/context/auth-context';
import { AcademicStructureTree } from '@/features/academic-years/components/academic-structure-tree';
import { AcademicYearDialog } from '@/features/academic-years/components/academic-year-dialog';
import { AcademicYearTable } from '@/features/academic-years/components/academic-year-table';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import type { AcademicYear } from '@/features/academic-years/types';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function AcademicYearsPage() {
  const { t, isKhmer } = useTranslation();
  const { hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'years' | 'structure'>('years');
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState<AcademicYear | null>(null);

  const {
    data: years = [],
    isLoading,
    isError,
    refetch,
  } = useAcademicYearsQuery({
    search: search || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined,
  });

  const handleCreate = () => {
    setSelectedYear(null);
    setDialogOpen(true);
  };

  const handleEdit = (year: AcademicYear) => {
    setSelectedYear(year);
    setDialogOpen(true);
  };

  const currentActiveYear = years.find((y) => y.isCurrent);
  const totalActive = years.filter((y) => y.status === 'active').length;
  const canCreate = hasPermission('academic_year.create.all_branches');
  const canEdit = hasPermission('academic_year.edit.all_branches');
  const canDelete = hasPermission('academic_year.delete.all_branches');

  return (
    <PermissionGuard requiredPermission="academic_year.view.all_branches">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {t.academicYears.title}
              </h1>
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#00509d]">
                {isKhmer ? 'ប្រតិទិន និងរចនាសម្ព័ន្ធ' : 'Calendar & Structure'}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">{t.academicYears.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => void refetch()}
              variant="outline"
              size="sm"
              className="h-9 border-slate-200 text-xs"
            >
              <RefreshCw className="mr-1.5 size-3.5" /> {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
            </Button>
            {canCreate && (
              <Button
                onClick={handleCreate}
                className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
              >
                <Plus className="mr-1.5 size-4" /> {t.academicYears.addAcademicYear}
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('years')}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors',
              activeTab === 'years'
                ? 'bg-[#023e8a] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            )}
          >
            <CalendarRange className="size-4" />
            <span>{t.academicYears.tabYears}</span>
            <span
              className={cn(
                'py-0.2 rounded-full px-1.5 text-xs',
                activeTab === 'years' ? 'bg-[#00509d] text-white' : 'bg-slate-200 text-slate-700',
              )}
            >
              {years.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('structure')}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors',
              activeTab === 'structure'
                ? 'bg-[#023e8a] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            )}
          >
            <Layers className="size-4" />
            <span>{t.academicYears.tabStructure}</span>
          </button>
        </div>

        {/* Tab 1: Years Calendar Management */}
        {activeTab === 'years' && (
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="border-slate-200 bg-white">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-medium tracking-normal text-slate-500 uppercase">
                      {isKhmer ? 'ឆ្នាំសិក្សាសរុប' : 'Total Academic Years'}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{years.length}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-2.5 text-[#00509d]">
                    <CalendarRange className="size-5" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-medium tracking-normal text-slate-500 uppercase">
                      {isKhmer ? 'ឆ្នាំកំពុងដំណើរការ' : 'Active Years'}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-emerald-600">{totalActive}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                    <CalendarCheck className="size-5" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-medium tracking-normal text-amber-700 uppercase">
                      {t.academicYears.isCurrent}
                    </p>
                    <p className="mt-1 max-w-[200px] truncate text-lg font-bold text-amber-900">
                      {currentActiveYear
                        ? currentActiveYear.name
                        : isKhmer
                          ? 'មិនទាន់កំណត់'
                          : 'None Assigned'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700">
                    <CalendarCheck className="size-5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  placeholder={isKhmer ? 'ស្វែងរកតាមកូដ ឬឈ្មោះ...' : 'Search by code or name...'}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white pl-9 text-xs"
                />
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-36 bg-white text-xs"
                >
                  <option value="all">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
                  <option value="active">{t.common.active}</option>
                  <option value="inactive">{t.common.inactive}</option>
                  <option value="closed">{isKhmer ? 'បានបិទ' : 'Closed'}</option>
                </Select>
              </div>
            </div>

            {/* Main Content Table */}
            {isLoading ? (
              <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : isError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-sm font-medium text-rose-600">Failed to load academic years.</p>
                <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                  <RefreshCw className="mr-1 size-3.5" /> Retry
                </Button>
              </div>
            ) : (
              <AcademicYearTable
                data={years}
                onEdit={handleEdit}
                canEdit={canEdit}
                canDelete={canDelete}
              />
            )}
          </div>
        )}

        {/* Tab 2: Academic Structure & Hierarchy Explorer */}
        {activeTab === 'structure' && (
          <AcademicStructureTree initialAcademicYearId={currentActiveYear?._id} />
        )}

        {/* Create / Edit Dialog Modal */}
        {(canCreate || canEdit) && (
          <AcademicYearDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            academicYear={selectedYear}
          />
        )}
      </div>
    </PermissionGuard>
  );
}
