'use client';

import * as React from 'react';
import { Award, Key, Lock, Shield, ShieldCheck } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RoleSkillRequirementsTab } from '@/features/skills/components/role-skill-requirements-tab';

import { useGroupedPermissionsQuery } from '../hooks/use-roles';
import type { Role } from '../types';

interface RoleDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
}

export const RoleDetailsDialog = ({ open, onOpenChange, role }: RoleDetailsDialogProps) => {
  const [activeTab, setActiveTab] = React.useState<'permissions' | 'skills'>('permissions');
  const { data: groupedData, isLoading } = useGroupedPermissionsQuery();
  const groupedPermissions = groupedData?.data ?? [];

  const rolePermissionSet = React.useMemo(() => {
    if (!role) return new Set<string>();
    return new Set(role.permissions);
  }, [role]);

  if (!role) return null;

  const isSuperAdmin = role.code === 'super_admin';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <Shield className="size-5.5 shrink-0 text-[#00509d]" />
                <div>
                  <DialogTitle className="text-lg font-bold text-slate-900">
                    {role.nameEn}
                  </DialogTitle>
                  {role.nameKh && <p className="text-xs text-slate-500">{role.nameKh}</p>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge tone={role.isSystem ? 'neutral' : 'warning'}>
                {role.isSystem ? 'System Core' : 'Custom Role'}
              </Badge>
              <Badge tone={role.status === 'active' ? 'success' : 'neutral'}>
                {role.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>

          <DialogDescription className="mt-2 text-xs text-slate-500">
            {role.description || 'No description provided.'}
          </DialogDescription>

          <div className="mt-4 flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('permissions')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'permissions'
                  ? 'border-[#00509d] text-[#00509d]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="size-4" />
              <span>RBAC Permissions</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'skills'
                  ? 'border-[#00509d] text-[#00509d]'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="size-4" />
              <span>Required Competencies & Skills</span>
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {activeTab === 'skills' ? (
            <RoleSkillRequirementsTab roleId={role._id} />
          ) : (
            <>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Key className="size-4 text-[#00509d]" />
                  <span className="font-medium">System Code:</span>
                  <span className="font-medium text-slate-900">{role.code}</span>
                </div>

                <div className="font-semibold text-[#00509d]">
                  {isSuperAdmin
                    ? 'All System Permissions (Wildcard Super Admin)'
                    : `${role.permissions.length} Assigned Permissions`}
                </div>
              </div>

              {isSuperAdmin ? (
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-950">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="size-5 shrink-0 text-[#00509d]" />
                    <div>
                      <h4 className="font-bold text-[#00509d]">Unrestricted Root Authority</h4>
                      <p className="mt-1 text-slate-600">
                        The Super Administrator role inherently inherits full system permissions
                        across all present and future modules without restriction.
                      </p>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  Loading permissions catalog...
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold tracking-normal text-slate-500 uppercase">
                    Module Breakdown & Granted Capabilities
                  </h3>

                  <div className="space-y-3">
                    {groupedPermissions.map((group) => {
                      const activeInGroup = group.permissions.filter((p) =>
                        rolePermissionSet.has(p.code),
                      );
                      if (activeInGroup.length === 0) return null;

                      return (
                        <div
                          key={group.module}
                          className="rounded-xl border border-slate-200 bg-white p-3.5"
                        >
                          <div className="mb-2.5 flex items-center justify-between border-b border-slate-100 pb-2">
                            <div className="flex items-center gap-2">
                              <Lock className="size-3.5 text-[#00509d]" />
                              <h4 className="text-xs font-bold text-slate-900">
                                {group.moduleName}
                              </h4>
                            </div>
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#00509d]">
                              {activeInGroup.length} / {group.permissions.length} granted
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {activeInGroup.map((perm) => (
                              <div
                                key={perm.code}
                                className="rounded-lg border border-slate-100 bg-slate-50/70 p-2 text-xs"
                              >
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-semibold text-slate-900">
                                    {perm.nameEn}
                                  </span>
                                  <span className="font-mono text-xs text-slate-400">
                                    {perm.scope === 'all_branches' ? 'Global' : 'Own Branch'}
                                  </span>
                                </div>
                                <code className="mt-0.5 block font-mono text-xs text-[#00509d]">
                                  {perm.code}
                                </code>
                                {perm.description && (
                                  <p className="mt-1 text-xs text-slate-500">{perm.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    {role.permissions.length === 0 && (
                      <div className="rounded-lg border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
                        No permissions assigned to this role.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter className="border-t border-slate-100 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
