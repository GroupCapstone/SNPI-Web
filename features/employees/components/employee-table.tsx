'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Edit2,
  Eye,
  History,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';
import { EntityHistoryDialog } from '@/features/audit-logs/components/entity-history-dialog';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useTranslation } from '@/lib/i18n';

import { useDeleteEmployeeMutation, useEmployeesQuery } from '../hooks/use-employees';
import type { Employee, EmployeeFilters, EmployeeStatus } from '../types';

export const EmployeeTable = () => {
  const { t, isKhmer, getLocalizedValue } = useTranslation();
  const router = useRouter();
  const { user, hasPermission, currentBranchId } = useAuth();
  const [filters, setFilters] = React.useState<EmployeeFilters>({
    search: '',
    branchId: '',
    departmentId: '',
    status: undefined,
    employmentType: undefined,
    page: 1,
    limit: 10,
  });

  const [historyTarget, setHistoryTarget] = React.useState<{ id: string; title: string } | null>(
    null,
  );
  const [actionError, setActionError] = React.useState<string | null>(null);

  const effectiveBranchId = React.useMemo(() => {
    if (filters.branchId) return filters.branchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return undefined;
  }, [filters.branchId, currentBranchId]);

  const { data, isLoading, isError, refetch } = useEmployeesQuery({
    ...filters,
    branchId: effectiveBranchId,
  });
  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const allBranches = branchesData?.data ?? [];

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const { data: departmentsData } = useDepartmentsQuery({
    branchId: effectiveBranchId,
    limit: 100,
  });

  const deleteMutation = useDeleteEmployeeMutation();

  const departments = departmentsData?.data ?? [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      branchId: e.target.value,
      departmentId: '',
      page: 1,
    }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, departmentId: e.target.value, page: 1 }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      status: (e.target.value as EmployeeStatus) || undefined,
      page: 1,
    }));
  };

  const handleDelete = async (employee: Employee) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to deactivate employee ${employee.employeeId} (${employee.firstName} ${employee.lastName})?`,
        )
      ) {
        await deleteMutation.mutateAsync(employee._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete employee';
      setActionError(msg);
    }
  };

  const getStatusTone = (status: EmployeeStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'on_leave':
        return 'warning';
      case 'suspended':
      case 'terminated':
        return 'danger';
      case 'resigned':
      case 'inactive':
      default:
        return 'neutral';
    }
  };

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

      {/* Action and Filter Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={t.employee.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          {branches.length > 1 ? (
            <Select
              value={filters.branchId || ''}
              onChange={handleBranchChange}
              className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
            >
              {user?.branchAccess === 'all' && (
                <option value="">{isKhmer ? 'គ្រប់សាខា' : t.department.allBranches}</option>
              )}
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchCode} · {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                </option>
              ))}
            </Select>
          ) : branches[0] ? (
            <div className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-700 sm:text-sm">
              <span className="font-semibold text-[#00509d]">{branches[0].branchCode}</span>
              <span>·</span>
              <span className="max-w-[140px] truncate">
                {isKhmer
                  ? branches[0].branchNameKh || branches[0].branchNameEn
                  : branches[0].branchNameEn}
              </span>
            </div>
          ) : null}

          <Select
            value={filters.departmentId}
            onChange={handleDepartmentChange}
            disabled={!filters.branchId && departments.length === 0}
            className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
          >
            <option value="">
              {isKhmer ? 'គ្រប់ផ្នែក / ដេប៉ាតឺម៉ង់' : t.position.allDepartments}
            </option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.code} · {isKhmer ? d.nameKh || d.nameEn : d.nameEn}
              </option>
            ))}
          </Select>

          <Select
            value={filters.status ?? ''}
            onChange={handleStatusChange}
            className="h-9 min-w-[150px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : t.common.allStatuses}</option>
            <option value="active">{isKhmer ? 'សកម្ម' : t.common.active}</option>
            <option value="inactive">{isKhmer ? 'អសកម្ម' : t.common.inactive}</option>
            <option value="on_leave">{isKhmer ? 'កំពុងឈប់សម្រាក' : 'On Leave'}</option>
            <option value="suspended">{isKhmer ? 'ផ្អាកការងារ' : 'Suspended'}</option>
            <option value="resigned">{isKhmer ? 'លាលែង' : 'Resigned'}</option>
            <option value="terminated">{isKhmer ? 'បញ្ឈប់' : 'Terminated'}</option>
          </Select>

          {(Boolean(filters.search) ||
            Boolean(filters.branchId) ||
            Boolean(filters.departmentId) ||
            Boolean(filters.status)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  search: '',
                  branchId: undefined,
                  departmentId: '',
                  status: undefined,
                  page: 1,
                }));
              }}
              className="h-9 gap-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <X className="h-3.5 w-3.5" />
              {t.common.clearFilters}
            </Button>
          )}
        </div>

        {hasPermission('employee.create.own_branch') && (
          <Link href="/employees/new">
            <Button
              size="sm"
              className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
            >
              <Plus className="mr-1.5 size-4" />
              {t.employee.addEmployee}
            </Button>
          </Link>
        )}
      </div>

      {/* Main Table Card */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold whitespace-nowrap text-slate-600 uppercase">
                <tr>
                  <th className="min-w-[240px] px-4 py-3 whitespace-nowrap">
                    {t.employee.employee}
                  </th>
                  <th className="min-w-[200px] px-4 py-3 whitespace-nowrap">
                    {t.employee.branchDept}
                  </th>
                  <th className="min-w-[160px] px-4 py-3 whitespace-nowrap">
                    {t.employee.position}
                  </th>
                  <th className="w-32 px-4 py-3 whitespace-nowrap">{t.employee.employmentType}</th>
                  <th className="min-w-[200px] px-4 py-3 whitespace-nowrap">
                    {t.employee.contact}
                  </th>
                  <th className="w-28 px-4 py-3 whitespace-nowrap">{t.employee.status}</th>
                  <th className="w-24 px-4 py-3 text-right whitespace-nowrap">
                    {t.common.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                        <span>{t.common.loading}</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-rose-500">
                      <p>Failed to load employees.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        className="mt-2"
                      >
                        {t.common.retry}
                      </Button>
                    </td>
                  </tr>
                ) : !data?.data || data.data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center">
                      <Users className="mx-auto size-8 text-slate-300" />
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {t.employee.noEmployeesFound}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{t.employee.noEmployeesDesc}</p>
                      <Link href="/employees/new">
                        <Button size="sm" className="mt-4 bg-[#023e8a] hover:bg-[#00509d]">
                          <Plus className="mr-1 size-3.5" />
                          {t.employee.addEmployee}
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  data.data.map((emp) => {
                    const branchName =
                      typeof emp.branchId === 'object' && emp.branchId !== null
                        ? emp.branchId.branchCode
                        : '—';
                    const deptName =
                      typeof emp.departmentId === 'object' && emp.departmentId !== null
                        ? getLocalizedValue(emp.departmentId.nameKh, emp.departmentId.nameEn)
                        : '—';
                    const posName =
                      typeof emp.positionId === 'object' && emp.positionId !== null
                        ? getLocalizedValue(emp.positionId.nameKh, emp.positionId.nameEn)
                        : '—';

                    const primaryPhone = emp.primaryPhone || emp.phone;

                    const primaryName =
                      isKhmer && emp.khmerName ? emp.khmerName : `${emp.firstName} ${emp.lastName}`;
                    const secondaryName =
                      isKhmer && emp.khmerName ? `${emp.firstName} ${emp.lastName}` : emp.khmerName;

                    return (
                      <tr key={emp._id} className="transition-colors hover:bg-slate-50/50">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center gap-2.5">
                            {emp.photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={emp.photo}
                                alt={emp.firstName}
                                className="size-8 shrink-0 rounded-full border border-slate-200 object-cover"
                              />
                            ) : (
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-[#00509d]">
                                {emp.firstName.charAt(0)}
                                {emp.lastName.charAt(0)}
                              </div>
                            )}
                            <div className="flex min-w-0 flex-col">
                              <Link
                                href={`/employees/${emp._id}`}
                                className="font-semibold whitespace-nowrap text-slate-900 hover:text-[#00509d] hover:underline"
                              >
                                {primaryName}
                              </Link>
                              <div className="flex items-center gap-1.5 text-xs whitespace-nowrap text-slate-500">
                                {secondaryName && secondaryName !== primaryName && (
                                  <span>{secondaryName}</span>
                                )}
                                {secondaryName && secondaryName !== primaryName && (
                                  <span className="text-slate-300">·</span>
                                )}
                                <span className="font-mono text-slate-400">{emp.employeeId}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-semibold text-slate-800">{branchName}</span>
                          <span className="mx-1.5 text-slate-300">·</span>
                          <span className="text-xs text-slate-600">{deptName}</span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="font-medium text-slate-800">{posName}</span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-slate-600 capitalize">
                          {emp.employmentType.replace('_', ' ')}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                          <div className="flex items-center gap-2 text-xs">
                            {primaryPhone ? (
                              <span className="font-medium text-slate-700">{primaryPhone}</span>
                            ) : (
                              <span>—</span>
                            )}
                            {emp.email && <span className="text-slate-400">({emp.email})</span>}
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge tone={getStatusTone(emp.status)}>{emp.status}</Badge>
                        </td>

                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex shrink-0 items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setHistoryTarget({
                                  id: emp._id,
                                  title: `${primaryName} (${emp.employeeId})`,
                                })
                              }
                              className="h-7 w-7 p-0 text-slate-500 hover:text-[#00509d]"
                              title={isKhmer ? 'មើលប្រវត្តិ' : 'View History'}
                            >
                              <History className="size-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/employees/${emp._id}`)}
                              className="h-7 w-7 p-0 text-slate-500 hover:text-[#00509d]"
                              title="View Profile"
                            >
                              <Eye className="size-3.5" />
                            </Button>
                            {hasPermission('employee.edit.own_branch') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push(`/employees/${emp._id}/edit`)}
                                className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900"
                                title="Edit Employee"
                              >
                                <Edit2 className="size-3.5" />
                              </Button>
                            )}
                            {hasPermission('employee.delete.own_branch') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(emp)}
                                className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-50 hover:text-rose-700"
                                title="Deactivate"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              <span>
                Showing {(data.pagination.page - 1) * data.pagination.limit + 1} to{' '}
                {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
                {data.pagination.total} staff members
              </span>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page <= 1}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: Math.max(1, (prev.page ?? 1) - 1),
                    }))
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page >= data.pagination.totalPages}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      page: (prev.page ?? 1) + 1,
                    }))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Entity Audit History Dialog */}
      <EntityHistoryDialog
        open={Boolean(historyTarget)}
        onOpenChange={(open) => !open && setHistoryTarget(null)}
        entityType="Employee"
        entityId={historyTarget?.id}
        entityTitle={historyTarget?.title}
      />
    </div>
  );
};
