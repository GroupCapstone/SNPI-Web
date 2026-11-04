'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Lock, Shield, ShieldAlert } from '@/components/icons';
import { useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

import {
  useCreateRoleMutation,
  useGroupedPermissionsQuery,
  useUpdateRoleMutation,
} from '../hooks/use-roles';
import type { RoleFormData } from '../schemas';
import { roleFormSchema } from '../schemas';
import type { Role } from '../types';

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role | null;
}

export const RoleDialog = ({ open, onOpenChange, role }: RoleDialogProps) => {
  const isEdit = Boolean(role);
  const isSystemRole = Boolean(role?.isSystem);

  const createMutation = useCreateRoleMutation();
  const updateMutation = useUpdateRoleMutation();

  const { data: groupedData, isLoading: isPermissionsLoading } = useGroupedPermissionsQuery();
  const groupedPermissions = groupedData?.data ?? [];

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      code: '',
      nameEn: '',
      nameKh: '',
      description: '',
      permissions: [],
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedPermissions = watchedValues.permissions ?? [];

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (role) {
      reset({
        code: role.code,
        nameEn: role.nameEn,
        nameKh: role.nameKh ?? '',
        description: role.description ?? '',
        permissions: role.permissions ?? [],
        status: role.status,
      });
    } else {
      reset({
        code: '',
        nameEn: '',
        nameKh: '',
        description: '',
        permissions: [],
        status: 'active',
      });
    }
  }, [open, role, reset]);

  const handleTogglePermission = (code: string) => {
    const current = new Set(selectedPermissions);
    if (current.has(code)) {
      current.delete(code);
    } else {
      current.add(code);
    }
    setValue('permissions', Array.from(current), { shouldValidate: true });
  };

  const handleToggleModule = (modulePermissions: string[]) => {
    const current = new Set(selectedPermissions);
    const allModuleSelected = modulePermissions.every((p) => current.has(p));

    if (allModuleSelected) {
      modulePermissions.forEach((p) => current.delete(p));
    } else {
      modulePermissions.forEach((p) => current.add(p));
    }
    setValue('permissions', Array.from(current), { shouldValidate: true });
  };

  const handleSelectAll = () => {
    const allCodes = groupedPermissions.flatMap((g) => g.permissions.map((p) => p.code));
    setValue('permissions', allCodes, { shouldValidate: true });
  };

  const handleClearAll = () => {
    setValue('permissions', [], { shouldValidate: true });
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && role) {
        await updateMutation.mutateAsync({
          id: role._id,
          data: {
            nameEn: data.nameEn,
            nameKh: data.nameKh || undefined,
            description: data.description || undefined,
            permissions: data.permissions,
            status: data.status,
          },
        });
      } else {
        await createMutation.mutateAsync({
          code: data.code.trim().toLowerCase(),
          nameEn: data.nameEn,
          nameKh: data.nameKh || undefined,
          description: data.description || undefined,
          permissions: data.permissions,
          status: data.status,
        });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save security role';
      setSubmitError(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Shield className="size-5.5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                {isEdit ? `Edit Role: ${role?.nameEn}` : 'Define Custom Security Role'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {isEdit
                  ? 'Modify role metadata and granular module permission assignments.'
                  : 'Establish a new RBAC security role with tailored permission boundaries.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {submitError && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
              <span>{submitError}</span>
            </div>
          )}

          {isSystemRole && (
            <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <div>
                <span className="font-semibold text-amber-950">System Core Role</span>
                <p className="mt-0.5 text-amber-800">
                  This is a pre-defined system role. Its unique identifier is immutable and it
                  cannot be deactivated or deleted.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Role Code <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('code')}
                disabled={isEdit}
                placeholder="e.g. academic_coordinator"
                className={`h-9 font-mono text-xs ${errors.code ? 'border-rose-400' : ''}`}
              />
              {errors.code && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.code.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Role Name (English) <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('nameEn')}
                placeholder="e.g. Academic Coordinator"
                className={`h-9 text-xs ${errors.nameEn ? 'border-rose-400' : ''}`}
              />
              {errors.nameEn && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.nameEn.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Role Name (Khmer)
              </label>
              <Input
                {...register('nameKh')}
                placeholder="e.g. អ្នកសម្របសម្រួលសិក្សាធិការ"
                className="h-9 text-xs"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
              <Select {...register('status')} disabled={isSystemRole} className="h-9 text-xs">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">Description</label>
            <Input
              {...register('description')}
              placeholder="Explain the scope and responsibilities of this security role..."
              className="h-9 text-xs"
            />
          </div>

          {/* PERMISSIONS MATRIX */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <label className="text-xs font-bold text-slate-900">
                  Granular Permission Matrix
                </label>
                <p className="text-xs text-slate-500">
                  Selected {selectedPermissions.length} permission(s)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="h-7 text-xs"
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-7 text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>

            {isPermissionsLoading ? (
              <div className="py-8 text-center text-xs text-slate-500">
                Loading permissions catalog...
              </div>
            ) : (
              <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {groupedPermissions.map((group) => {
                  const groupCodes = group.permissions.map((p) => p.code);
                  const selectedInGroupCount = groupCodes.filter((c) =>
                    selectedPermissions.includes(c),
                  ).length;
                  const allSelectedInGroup =
                    groupCodes.length > 0 && selectedInGroupCount === groupCodes.length;

                  return (
                    <div
                      key={group.module}
                      className="rounded-xl border border-slate-200 bg-slate-50/40 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between border-b border-slate-200/60 pb-1.5">
                        <div className="flex items-center gap-2">
                          <Lock className="size-3.5 text-[#00509d]" />
                          <span className="text-xs font-bold text-slate-900">
                            {group.moduleName}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({selectedInGroupCount}/{group.permissions.length})
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleModule(groupCodes)}
                          className="text-xs font-semibold text-[#00509d] hover:underline"
                        >
                          {allSelectedInGroup ? 'Deselect Module' : 'Select All in Module'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {group.permissions.map((perm) => {
                          const isChecked = selectedPermissions.includes(perm.code);
                          return (
                            <label
                              key={perm.code}
                              className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2 text-xs transition-colors ${
                                isChecked
                                  ? 'border-blue-200 bg-blue-50/50 text-blue-950'
                                  : 'border-slate-100 bg-white text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleTogglePermission(perm.code)}
                                className="mt-0.5 size-3.5 rounded border-slate-300 text-[#00509d]"
                              />
                              <div className="flex-1 overflow-hidden">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="truncate font-semibold">{perm.nameEn}</span>
                                  <span className="font-mono text-xs text-slate-400">
                                    {perm.scope === 'all_branches' ? 'Global' : 'Branch'}
                                  </span>
                                </div>
                                <code className="block truncate font-mono text-xs text-[#00509d]">
                                  {perm.code}
                                </code>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
