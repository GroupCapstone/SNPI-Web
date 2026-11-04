'use client';

import * as React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Edit2,
  Eye,
  Key,
  Plus,
  Search,
  Shield,
  ShieldCheck,
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
import { useTranslation } from '@/lib/i18n';

import { useDeleteRoleMutation, useRolesQuery } from '../hooks/use-roles';
import type { Role, RoleFilters, RoleStatus } from '../types';
import { RoleDetailsDialog } from './role-details-dialog';
import { RoleDialog } from './role-dialog';

export const RoleTable = () => {
  const { t, isKhmer } = useTranslation();
  const { hasPermission } = useAuth();
  const [filters, setFilters] = React.useState<RoleFilters>({
    search: '',
    status: undefined,
    isSystem: undefined,
    page: 1,
    limit: 50,
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
  const [actionError, setActionError] = React.useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useRolesQuery(filters);
  const deleteMutation = useDeleteRoleMutation();

  const roles = data?.data ?? [];

  // Metrics
  const totalRoles = roles.length;
  const systemRoles = roles.filter((r) => r.isSystem).length;
  const customRoles = roles.filter((r) => !r.isSystem).length;
  const activeRoles = roles.filter((r) => r.status === 'active').length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as RoleStatus | '';
    setFilters((prev) => ({
      ...prev,
      status: val ? val : undefined,
      page: 1,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilters((prev) => ({
      ...prev,
      isSystem: val === 'true' ? true : val === 'false' ? false : undefined,
      page: 1,
    }));
  };

  const handleCreate = () => {
    setActionError(null);
    setSelectedRole(null);
    setDialogOpen(true);
  };

  const handleEdit = (role: Role) => {
    setActionError(null);
    setSelectedRole(role);
    setDialogOpen(true);
  };

  const handleViewDetails = (role: Role) => {
    setSelectedRole(role);
    setDetailsOpen(true);
  };

  const handleDelete = async (role: Role) => {
    try {
      setActionError(null);
      if (role.isSystem) {
        setActionError(`System-defined role "${role.nameEn}" is protected and cannot be deleted.`);
        return;
      }

      if (
        window.confirm(
          `Are you sure you want to permanently delete custom security role "${role.nameEn}" (${role.code})?`,
        )
      ) {
        await deleteMutation.mutateAsync(role._id);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete role';
      setActionError(msg);
    }
  };

  return (
    <div className="space-y-4">
      {actionError && (
        <div className="flex items-start justify-between gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-900">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
            <div className="space-y-0.5">
              <span className="font-semibold text-rose-950">Action Blocked</span>
              <p className="text-rose-800">{actionError}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="text-rose-500 hover:text-rose-800"
            aria-label="Dismiss error"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {isKhmer ? 'តួនាទីសរុប' : 'Total Roles'}
              </span>
              <Shield className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{totalRoles}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.roles.systemCore}
              </span>
              <ShieldCheck className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{systemRoles}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.roles.customRole}
              </span>
              <Users className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{customRoles}</div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                {t.common.active}
              </span>
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{activeRoles}</div>
          </CardContent>
        </Card>
      </div>

      {/* SEARCH, FILTER & ACTION BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              placeholder={t.roles.searchPlaceholder}
              value={filters.search ?? ''}
              onChange={handleSearchChange}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <Select
            value={filters.isSystem === undefined ? '' : String(filters.isSystem)}
            onChange={handleTypeChange}
            className="h-9 w-36 text-xs"
          >
            <option value="">{isKhmer ? 'គ្រប់ប្រភេទ' : 'All Types'}</option>
            <option value="true">{t.roles.systemCore}</option>
            <option value="false">{t.roles.customRole}</option>
          </Select>

          <Select
            value={filters.status ?? ''}
            onChange={handleStatusChange}
            className="h-9 w-32 text-xs"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព' : 'All Statuses'}</option>
            <option value="active">{t.common.active}</option>
            <option value="inactive">{t.common.inactive}</option>
          </Select>
        </div>

        {hasPermission('role.create.all_branches') && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
          >
            <Plus className="mr-1.5 size-4" />
            {t.roles.provisionCustomRole}
          </Button>
        )}
      </div>

      {/* ROLES TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold whitespace-nowrap text-slate-600 uppercase">
              <tr>
                <th className="min-w-[240px] px-4 py-3 whitespace-nowrap">{t.roles.roleName}</th>
                <th className="min-w-[140px] px-4 py-3 whitespace-nowrap">{t.roles.roleCode}</th>
                <th className="w-28 px-4 py-3 whitespace-nowrap">{t.roles.roleType}</th>
                <th className="min-w-[180px] px-4 py-3 whitespace-nowrap">
                  {t.roles.grantedPermissions}
                </th>
                <th className="w-24 px-4 py-3 whitespace-nowrap">{t.common.status}</th>
                <th className="w-24 px-4 py-3 text-right whitespace-nowrap">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <div className="flex items-center justify-center gap-2">
                      <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                      <span>Loading security roles...</span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-rose-500">
                    <p>Failed to load security roles.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetch()}
                      className="mt-2 text-xs"
                    >
                      Retry
                    </Button>
                  </td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <Shield className="mx-auto size-8 text-slate-300" />
                    <p className="mt-2 text-sm font-medium text-slate-700">No roles found</p>
                    <p className="mt-1 text-xs text-slate-400">
                      Create tailored RBAC roles to grant customized module access.
                    </p>
                    <Button
                      size="sm"
                      onClick={handleCreate}
                      className="mt-4 bg-[#023e8a] text-xs hover:bg-[#00509d]"
                    >
                      <Plus className="mr-1 size-3.5" />
                      Provision Custom Role
                    </Button>
                  </td>
                </tr>
              ) : (
                roles.map((role) => {
                  const isSuperAdmin = role.code === 'super_admin';
                  const primaryName = isKhmer && role.nameKh ? role.nameKh : role.nameEn;
                  const secondaryName = isKhmer && role.nameKh ? role.nameEn : role.nameKh;

                  return (
                    <tr key={role._id} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <Shield className="size-4 shrink-0 text-[#00509d]" />
                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{primaryName}</span>
                            {secondaryName && secondaryName !== primaryName && (
                              <span className="text-xs text-slate-500">{secondaryName}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono font-medium text-slate-700">{role.code}</span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge tone={role.isSystem ? 'neutral' : 'warning'}>
                          {role.isSystem ? 'System Core' : 'Custom'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        {isSuperAdmin ? (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-[#00509d]">
                            <ShieldCheck className="size-3" />
                            All System (Wildcard)
                          </span>
                        ) : (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-slate-700">
                            <Key className="size-3 text-slate-400" />
                            {role.permissions.length} Permissions
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge tone={role.status === 'active' ? 'success' : 'neutral'}>
                          {role.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>

                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex shrink-0 items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(role)}
                            className="size-8 p-0 text-slate-600 hover:bg-blue-50 hover:text-[#00509d]"
                            title="View Granted Permissions"
                          >
                            <Eye className="size-4" />
                          </Button>

                          {hasPermission('role.edit.all_branches') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(role)}
                              className="size-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              title="Edit Role"
                            >
                              <Edit2 className="size-4" />
                            </Button>
                          )}

                          {!role.isSystem && hasPermission('role.delete.all_branches') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(role)}
                              className="size-8 p-0 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                              title="Delete Custom Role"
                            >
                              <Trash2 className="size-4" />
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
      </div>

      <RoleDialog open={dialogOpen} onOpenChange={setDialogOpen} role={selectedRole} />
      <RoleDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} role={selectedRole} />
    </div>
  );
};
