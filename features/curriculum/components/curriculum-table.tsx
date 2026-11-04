'use client';

import * as React from 'react';
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Edit2,
  Eye,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useAuth } from '@/features/auth/context/auth-context';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';

import { useCurriculaQuery, useDeleteCurriculumMutation } from '../hooks/use-curriculum';
import type { Curriculum } from '../types';
import { CurriculumDetailModal } from './curriculum-detail-modal';
import { CurriculumDialog } from './curriculum-dialog';
import { useTranslation } from '@/lib/i18n';

export const CurriculumTable = () => {
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [programId, setProgramId] = React.useState('');
  const [academicYearId, setAcademicYearId] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [page, setPage] = React.useState(1);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [detailModalOpen, setDetailModalOpen] = React.useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = React.useState<Curriculum | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const { data: academicYears = [] } = useAcademicYearsQuery();

  const programs = programsData?.data ?? [];

  const { data, isLoading, isError, refetch } = useCurriculaQuery({
    search: search || undefined,
    programId: programId || undefined,
    academicYearId: academicYearId || undefined,
    status: status || undefined,
    page,
    limit: 10,
  });

  const deleteMutation = useDeleteCurriculumMutation();

  const handleEdit = (curriculum: Curriculum) => {
    setActionError(null);
    setSelectedCurriculum(curriculum);
    setDialogOpen(true);
  };

  const handleView = (curriculum: Curriculum) => {
    setActionError(null);
    setSelectedCurriculum(curriculum);
    setDetailModalOpen(true);
  };

  const handleCreate = () => {
    setActionError(null);
    setSelectedCurriculum(null);
    setDialogOpen(true);
  };

  const handleDelete = async (curriculum: Curriculum) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to delete curriculum "${curriculum.name}" (${curriculum.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(curriculum._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete curriculum';
      setActionError(msg);
    }
  };

  const curricula = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
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
      {/* Top Action & Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={isKhmer ? 'ស្វែងរកតាមកូដ ឬចំណងជើង...' : 'Search by code or title...'}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-9 bg-white pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          <Select
            value={programId}
            onChange={(e) => {
              setProgramId(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] bg-white text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់កម្មវិធីសិក្សា' : 'All Programs'}</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {isKhmer ? p.nameKh || p.nameEn : p.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={academicYearId}
            onChange={(e) => {
              setAcademicYearId(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[170px] bg-white text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ឆ្នាំសិក្សា' : 'All Academic Years'}</option>
            {academicYears.map((y) => (
              <option key={y._id} value={y._id}>
                {y.name}
              </option>
            ))}
          </Select>

          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-9 min-w-[150px] bg-white text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="active">{isKhmer ? 'សកម្ម' : 'Active'}</option>
            <option value="inactive">{isKhmer ? 'អសកម្ម' : 'Inactive'}</option>
            <option value="archived">{isKhmer ? 'បណ្ណសារ' : 'Archived'}</option>
          </Select>

          {(search || programId || academicYearId || status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setProgramId('');
                setAcademicYearId('');
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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="border-slate-200"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          {hasPermission('curriculum.create.own_branch') && (
            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              New Curriculum
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="w-36">Code</TableHead>
                <TableHead>Curriculum Name</TableHead>
                <TableHead>Program & Level</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead className="text-center">Subjects</TableHead>
                <TableHead className="text-center">Weekly Hrs</TableHead>
                <TableHead className="w-28">Status</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#023e8a]" />
                      <span>Loading curricula records...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-rose-500">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-6 w-6" />
                      <span>Failed to fetch curriculum data. Please retry.</span>
                      <Button variant="outline" size="sm" onClick={() => void refetch()}>
                        Retry
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : curricula.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <BookMarked className="h-8 w-8 text-slate-300" />
                      <p className="font-medium text-slate-700">No curricula found</p>
                      <p className="text-xs text-slate-400">
                        {search || programId || academicYearId || status
                          ? 'Try adjusting your filters.'
                          : 'Get started by creating a new curriculum.'}
                      </p>
                      {!search &&
                        !programId &&
                        !academicYearId &&
                        !status &&
                        hasPermission('curriculum.create.own_branch') && (
                          <Button
                            onClick={handleCreate}
                            size="sm"
                            className="mt-2 bg-[#023e8a] text-white hover:bg-[#00509d]"
                          >
                            <Plus className="mr-1.5 h-4 w-4" />
                            New Curriculum
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                curricula.map((curr) => {
                  const programCode =
                    typeof curr.programId === 'object' && curr.programId !== null
                      ? curr.programId.code
                      : '—';
                  const levelName =
                    typeof curr.levelId === 'object' && curr.levelId !== null
                      ? curr.levelId.name
                      : '';
                  const yearName =
                    typeof curr.academicYearId === 'object' && curr.academicYearId !== null
                      ? curr.academicYearId.name
                      : '—';

                  return (
                    <TableRow key={curr._id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                        {curr.code}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900">{curr.name}</div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        <div className="flex min-w-0 flex-col">
                          <span className="font-semibold text-slate-900">{programCode}</span>
                          {levelName && <span className="text-xs text-slate-500">{levelName}</span>}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">{yearName}</TableCell>
                      <TableCell className="text-center text-xs font-medium text-slate-700">
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
                          <BookOpen className="h-3 w-3 text-slate-500" />
                          <span>{curr.subjects?.length ?? 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-xs font-semibold text-slate-700">
                        {(curr.subjects ?? []).reduce((sum, s) => sum + (s.weeklyHours || 0), 0)}h
                      </TableCell>
                      <TableCell>
                        <Badge
                          tone={
                            curr.status === 'active'
                              ? 'success'
                              : curr.status === 'inactive'
                                ? 'warning'
                                : 'neutral'
                          }
                          className="text-xs font-medium capitalize"
                        >
                          {curr.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(curr)}
                            className="h-8 w-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-[#023e8a]"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {hasPermission('curriculum.edit.own_branch') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(curr)}
                              className="h-8 w-8 p-0 text-slate-600 hover:bg-amber-50 hover:text-amber-600"
                              title="Edit Curriculum"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          )}
                          {hasPermission('curriculum.delete.own_branch') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(curr)}
                              className="h-8 w-8 p-0 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                              title="Delete Curriculum"
                            >
                              <Trash2 className="h-4 w-4" />
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

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-4 py-3">
              <span className="text-xs text-slate-500">
                Showing page <span className="font-semibold">{page}</span> of{' '}
                <span className="font-semibold">{pagination.totalPages}</span> ({pagination.total}{' '}
                total)
              </span>
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="h-8 text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page >= pagination.totalPages}
                  className="h-8 text-xs"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <CurriculumDetailModal
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        curriculum={selectedCurriculum}
      />

      {/* Edit / Create Form Dialog */}
      <CurriculumDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        curriculum={selectedCurriculum}
      />
    </div>
  );
};
