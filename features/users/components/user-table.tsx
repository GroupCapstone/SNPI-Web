'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Edit2,
  FileClock,
  KeyRound,
  Plus,
  PowerOff,
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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useTranslation } from '@/lib/i18n';

import {
  useDeleteUserMutation,
  useUpdateUserStatusMutation,
  useUsersQuery,
} from '../hooks/use-users';
import type { User, UserFilters, UserStatus } from '../types';
import { ResetPasswordDialog } from './reset-password-dialog';
import { UserDialog } from './user-dialog';

export const UserTable = () => {
  const router = useRouter();
  const { t, language } = useTranslation();
  const isKhmer = language === 'kh';
  const { hasPermission, currentBranchId } = useAuth();
  const canViewUsers =
    hasPermission('user.view.own_branch') || hasPermission('user.view.all_branches');

  const [filters, setFilters] = React.useState<UserFilters>({
    search: '',
    schoolId: '',
    role: '',
    status: undefined,
    page: 1,
    limit: 10,
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = React.useState(false);
  const [targetResetUser, setTargetResetUser] = React.useState<User | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const effectiveBranchId = React.useMemo(() => {
    if (filters.branchId) return filters.branchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return undefined;
  }, [filters.branchId, currentBranchId]);

  const queryFilters = React.useMemo(
    () => ({
      ...filters,
      branchId: effectiveBranchId,
    }),
    [filters, effectiveBranchId],
  );

  const { data, isLoading, isError, refetch } = useUsersQuery(queryFilters, canViewUsers);

  const deleteMutation = useDeleteUserMutation();
  const statusMutation = useUpdateUserStatusMutation();

  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, branchId: e.target.value || undefined, page: 1 }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, role: e.target.value, page: 1 }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      status: (e.target.value as UserStatus) || undefined,
      page: 1,
    }));
  };

  const handleCreate = () => {
    setActionError(null);
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setActionError(null);
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setActionError(null);
    setTargetResetUser(user);
    setResetDialogOpen(true);
  };

  const handleToggleStatus = async (user: User) => {
    try {
      setActionError(null);
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      const prompt =
        user.status === 'active'
          ? `Deactivate account for "${user.username}" (${user.email})?`
          : `Activate/Unlock account for "${user.username}" (${user.email})?`;
      if (window.confirm(prompt)) {
        await statusMutation.mutateAsync({ id: user._id, status: newStatus });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update user status';
      setActionError(msg);
    }
  };

  const handleViewAudit = (user: User) => {
    router.push(`/audit-logs?userId=${user._id}&search=${encodeURIComponent(user.username)}`);
  };

  const handleDelete = async (user: User) => {
    try {
      setActionError(null);
      if (
        window.confirm(
          `Are you sure you want to deactivate user account "${user.username}" (${user.email})?`,
        )
      ) {
        await deleteMutation.mutateAsync(user._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete user';
      setActionError(msg);
    }
  };

  const getStatusTone = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'locked':
        return 'danger';
      case 'inactive':
      default:
        return 'neutral';
    }
  };

  if (!canViewUsers) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <AlertCircle className="size-10 text-rose-600" />
        <h3 className="mt-4 text-base font-semibold text-slate-900">Access Restricted</h3>
        <p className="mt-1 max-w-sm text-xs text-slate-500">
          You do not have permission to view or manage user accounts. Contact your system
          administrator if you require access.
        </p>
      </div>
    );
  }

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
      {/* Search & Filter Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={t.users.searchPlaceholder}
              value={filters.search}
              onChange={handleSearchChange}
              className="h-9 pl-9 text-xs font-medium sm:text-sm"
            />
          </div>

          {branches.length > 0 && (
            <Select
              value={filters.branchId ?? ''}
              onChange={handleBranchChange}
              className="h-9 min-w-[170px] text-xs font-medium sm:text-sm"
            >
              <option value="">{isKhmer ? 'គ្រប់សាខា' : 'All Branches'}</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn} ({b.branchCode})
                </option>
              ))}
            </Select>
          )}

          <Select
            value={filters.role ?? ''}
            onChange={handleRoleChange}
            className="h-9 min-w-[190px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់តួនាទី' : t.users.allRoles}</option>
            <option value="super_admin">
              {isKhmer ? 'អ្នកគ្រប់គ្រងជាន់ខ្ពស់ (Super Admin)' : 'Super Admin'}
            </option>
            <option value="director">{isKhmer ? 'នាយកសាលា (Director)' : 'School Director'}</option>
            <option value="branch_manager">
              {isKhmer ? 'អ្នកគ្រប់គ្រងសាខា (Branch Manager)' : 'Branch Manager'}
            </option>
            <option value="administrator">
              {isKhmer ? 'រដ្ឋបាល / ចុះឈ្មោះ (Admin/Registrar)' : 'Administrator / Registrar'}
            </option>
            <option value="academic_officer">
              {isKhmer ? 'មន្ត្រីសិក្សាធិការ (Academic Officer)' : 'Academic Officer'}
            </option>
            <option value="teacher">
              {isKhmer ? 'គ្រូបង្រៀន (Teacher)' : 'Teacher / Instructor'}
            </option>
            <option value="finance_officer">
              {isKhmer ? 'មន្ត្រីហិរញ្ញវត្ថុ (Finance Officer)' : 'Finance Officer'}
            </option>
            <option value="student_affairs_officer">
              {isKhmer ? 'កិច្ចការសិស្ស (Student Affairs)' : 'Student Affairs Officer'}
            </option>
            <option value="hr_officer">
              {isKhmer ? 'ធនធានមនុស្ស (HR Officer)' : 'HR Officer'}
            </option>
            <option value="librarian">{isKhmer ? 'បណ្ណារក្ស (Librarian)' : 'Librarian'}</option>
            <option value="inventory_officer">
              {isKhmer ? 'គ្រប់គ្រងទ្រព្យសម្បត្តិ (Inventory)' : 'Inventory & Asset Officer'}
            </option>
            <option value="staff">
              {isKhmer ? 'បុគ្គលិកទូទៅ (General Staff)' : 'General Staff'}
            </option>
            <option value="department_head">
              {isKhmer ? 'ប្រធានដេប៉ាតឺម៉ង់ (Department Head)' : 'Department Head'}
            </option>
          </Select>

          <Select
            value={filters.status ?? ''}
            onChange={handleStatusChange}
            className="h-9 min-w-[140px] text-xs font-medium sm:text-sm"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : t.common.allStatuses}</option>
            <option value="active">{isKhmer ? 'សកម្ម' : t.common.active}</option>
            <option value="inactive">{isKhmer ? 'អសកម្ម' : t.common.inactive}</option>
            <option value="locked">{isKhmer ? 'បានចាក់សោ' : 'Locked'}</option>
          </Select>

          {(Boolean(filters.search) ||
            Boolean(filters.branchId) ||
            Boolean(filters.role) ||
            Boolean(filters.status)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  search: '',
                  branchId: undefined,
                  role: '',
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

        {(hasPermission('user.create.own_branch') || hasPermission('user.create.all_branches')) && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            {t.users.addUser}
          </Button>
        )}
      </div>

      {/* Main Users Table */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold whitespace-nowrap text-slate-600 uppercase">
                <tr>
                  <th className="min-w-[220px] px-4 py-3 whitespace-nowrap">
                    {t.users.userIdentity}
                  </th>
                  <th className="min-w-[180px] px-4 py-3 whitespace-nowrap">{t.users.roles}</th>
                  <th className="min-w-[140px] px-4 py-3 whitespace-nowrap">
                    {t.users.branchAccess}
                  </th>
                  <th className="min-w-[200px] px-4 py-3 whitespace-nowrap">
                    {t.users.linkedEmployee}
                  </th>
                  <th className="w-28 px-4 py-3 whitespace-nowrap">{t.users.status}</th>
                  <th className="w-24 px-4 py-3 text-right whitespace-nowrap">
                    {t.common.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                        <span>{t.common.loading}</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-rose-500">
                      <p>Failed to load users.</p>
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
                    <td colSpan={6} className="p-12 text-center">
                      <Users className="mx-auto size-8 text-slate-300" />
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        {t.users.noUsersFound}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{t.users.noUsersDesc}</p>
                      <Button
                        size="sm"
                        onClick={handleCreate}
                        className="mt-4 bg-[#023e8a] hover:bg-[#00509d]"
                      >
                        <Plus className="mr-1 size-3.5" />
                        {t.users.addUser}
                      </Button>
                    </td>
                  </tr>
                ) : (
                  data.data.map((user) => (
                    <tr key={user._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-[#00509d]">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{user.username}</span>
                            <span className="text-xs text-slate-500">{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          {user.roles.map((role) => (
                            <span
                              key={role}
                              className="shrink-0 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 uppercase"
                            >
                              {role.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {user.branchAccess === 'all' ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-[#00509d]">
                            <Building2 className="size-3" />
                            All Branches
                          </span>
                        ) : (
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-slate-700">
                            {Array.isArray(user.branchAccess) ? user.branchAccess.length : 0}{' '}
                            Branches
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                        {typeof user.employeeId === 'object' && user.employeeId !== null ? (
                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-medium text-slate-900">
                              {user.employeeId.firstName} {user.employeeId.lastName}
                            </span>
                            <span className="font-mono text-xs text-slate-400">
                              {user.employeeId.employeeId}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge tone={getStatusTone(user.status)}>{user.status}</Badge>
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex shrink-0 items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewAudit(user)}
                            title={`View audit history for ${user.username}`}
                            className="h-7 w-7 p-0 text-[#00509d] hover:bg-blue-50 hover:text-[#023e8a]"
                          >
                            <FileClock className="size-3.5" />
                          </Button>
                          {(hasPermission('user.edit.own_branch') ||
                            hasPermission('user.edit.all_branches')) &&
                            !user.roles.includes('super_admin') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleStatus(user)}
                                title={
                                  user.status === 'active'
                                    ? `Deactivate ${user.username}`
                                    : `Activate ${user.username}`
                                }
                                className={`h-7 w-7 p-0 ${
                                  user.status === 'active'
                                    ? 'text-slate-400 hover:bg-amber-50 hover:text-amber-700'
                                    : 'text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                              >
                                {user.status === 'active' ? (
                                  <PowerOff className="size-3.5" />
                                ) : (
                                  <CheckCircle2 className="size-3.5" />
                                )}
                              </Button>
                            )}
                          {(hasPermission('user.reset_password.own_branch') ||
                            hasPermission('user.reset_password.all_branches') ||
                            hasPermission('user.edit.all_branches') ||
                            hasPermission('user.edit.own_branch')) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleResetPassword(user)}
                              title={`Reset password for ${user.username}`}
                              className="h-7 w-7 p-0 text-amber-600 hover:bg-amber-50 hover:text-amber-800"
                            >
                              <KeyRound className="size-3.5" />
                            </Button>
                          )}
                          {(hasPermission('user.edit.own_branch') ||
                            hasPermission('user.edit.all_branches')) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              title={`Edit user ${user.username}`}
                              className="h-7 w-7 p-0 text-slate-500 hover:text-slate-900"
                            >
                              <Edit2 className="size-3.5" />
                            </Button>
                          )}
                          {(hasPermission('user.delete.own_branch') ||
                            hasPermission('user.delete.all_branches')) &&
                            (user.roles.includes('super_admin') ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled
                                title="Primary Super Administrator account cannot be deleted"
                                className="h-7 w-7 cursor-not-allowed p-0 text-slate-300"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(user)}
                                className="h-7 w-7 p-0 text-rose-500 hover:bg-rose-50 hover:text-rose-700"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            ))}
                        </div>
                      </td>
                    </tr>
                  ))
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
                {data.pagination.total} users
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

      {/* User Dialog */}
      <UserDialog open={dialogOpen} onOpenChange={setDialogOpen} user={selectedUser} />

      {/* Reset Password Dialog */}
      <ResetPasswordDialog
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
        user={targetResetUser}
      />
    </div>
  );
};
