'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  Building2,
  PanelsTopLeft,
  Shield,
  User as UserIcon,
} from '@/components/icons';
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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useAuth } from '@/features/auth/context/auth-context';
import { useTranslation } from '@/lib/i18n';

import { useCreateUserMutation, useUpdateUserMutation } from '../hooks/use-users';
import type { UserFormData } from '../schemas';
import { userFormSchema } from '../schemas';
import type { User } from '../types';

const ROLE_ALIASES: Record<string, string> = {
  branch_admin: 'branch_manager',
  accountant: 'finance_officer',
  academic_director: 'director',
};

const normalizeRole = (role: string): string => {
  const trimmed = role.trim().toLowerCase();
  return ROLE_ALIASES[trimmed] ?? trimmed;
};

const AVAILABLE_ROLES = [
  { id: 'super_admin', label: 'Super Admin' },
  { id: 'director', label: 'School Director' },
  { id: 'branch_manager', label: 'Branch Manager' },
  { id: 'administrator', label: 'Administrator / Registrar' },
  { id: 'academic_officer', label: 'Academic Officer' },
  { id: 'teacher', label: 'Teacher / Instructor' },
  { id: 'finance_officer', label: 'Finance Officer' },
  { id: 'student_affairs_officer', label: 'Student Affairs Officer' },
  { id: 'hr_officer', label: 'HR Officer' },
  { id: 'librarian', label: 'Librarian' },
  { id: 'inventory_officer', label: 'Inventory & Asset Officer' },
  { id: 'staff', label: 'General Staff' },
  { id: 'department_head', label: 'Department Head' },
];

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

export const UserDialog = ({ open, onOpenChange, user }: UserDialogProps) => {
  const { t } = useTranslation();
  const { user: actor, hasPermission } = useAuth();
  const isEdit = Boolean(user);
  const canResetPassword = hasPermission('user.reset_password.own_branch');
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();

  const isSuperAdminActor =
    actor?.isSuperAdmin === true || (actor?.permissions ?? []).includes('*');
  const canAssignCampusLeadership =
    isSuperAdminActor ||
    hasPermission('user.create.all_branches') ||
    hasPermission('user.edit.all_branches');

  const availableRoles = React.useMemo(() => {
    return AVAILABLE_ROLES.filter((role) => {
      if (role.id === 'super_admin' || role.id === 'director') {
        return isSuperAdminActor;
      }
      if (role.id === 'branch_manager' || role.id === 'administrator') {
        return canAssignCampusLeadership;
      }
      return true;
    });
  }, [isSuperAdminActor, canAssignCampusLeadership]);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const { data: branchesData } = useBranchesQuery({ limit: 100 });
  const { data: departmentsData } = useDepartmentsQuery({ limit: 100 });

  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData?.data]);
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);
  const departments = React.useMemo(() => departmentsData?.data ?? [], [departmentsData?.data]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      schoolId: '',
      employeeId: '',
      username: '',
      email: '',
      password: '',
      roles: ['staff'],
      branchAccessType: 'custom',
      branchAccess: actor?.branchAccess === 'all' ? [] : (actor?.branchAccess ?? []),
      departmentAccessType: 'custom',
      departmentAccess: actor?.departmentAccess === 'all' ? [] : (actor?.departmentAccess ?? []),
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const { data: employeesData, isLoading: isLoadingEmployees } = useEmployeesQuery(
    {
      status: 'active',
      limit: 200,
      schoolId: watchedValues?.schoolId || undefined,
    },
    open,
  );

  const selectedSchoolId = watchedValues.schoolId;

  const employees = React.useMemo(() => {
    const rawList = employeesData?.data ?? [];
    if (!selectedSchoolId) return rawList;
    return rawList.filter((emp) => {
      const schId =
        typeof emp.schoolId === 'object' && emp.schoolId !== null
          ? emp.schoolId._id
          : String(emp.schoolId);
      return schId === selectedSchoolId;
    });
  }, [employeesData?.data, selectedSchoolId]);

  const selectedRoles = watchedValues.roles ?? [];
  const branchAccessType = watchedValues.branchAccessType;
  const selectedBranches = watchedValues.branchAccess ?? [];
  const departmentAccessType = watchedValues.departmentAccessType;
  const selectedDepartments = watchedValues.departmentAccess ?? [];

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (user) {
      const schId =
        typeof user.schoolId === 'object' && user.schoolId !== null
          ? user.schoolId._id
          : String(user.schoolId);

      const empId =
        user.employeeId && typeof user.employeeId === 'object'
          ? user.employeeId._id
          : user.employeeId
            ? String(user.employeeId)
            : '';

      const isAllBranches = user.branchAccess === 'all';
      const isAllDepartments = !user.departmentAccess || user.departmentAccess === 'all';
      const parsedRoles = Array.from(
        new Set(
          (user.roles ?? ['staff'])
            .map(normalizeRole)
            .filter((r) => AVAILABLE_ROLES.some((ar) => ar.id === r)),
        ),
      );

      reset({
        schoolId: schId,
        employeeId: empId,
        username: user.username,
        email: user.email,
        password: '',
        roles: parsedRoles.length > 0 ? parsedRoles : ['staff'],
        branchAccessType: isAllBranches ? 'all' : 'custom',
        branchAccess: Array.isArray(user.branchAccess) ? user.branchAccess : [],
        departmentAccessType: isAllDepartments ? 'all' : 'custom',
        departmentAccess: Array.isArray(user.departmentAccess) ? user.departmentAccess : [],
        status: user.status,
      });
    } else {
      reset({
        schoolId: schools[0]?._id || '',
        employeeId: '',
        username: '',
        email: '',
        password: '',
        roles: ['staff'],
        branchAccessType: actor?.isSuperAdmin ? 'all' : 'custom',
        branchAccess:
          actor?.branchAccess === 'all'
            ? actor.defaultBranch
              ? [actor.defaultBranch]
              : []
            : (actor?.branchAccess ?? []),
        departmentAccessType:
          actor?.isSuperAdmin || actor?.departmentAccess === 'all' ? 'all' : 'custom',
        departmentAccess: actor?.departmentAccess === 'all' ? [] : (actor?.departmentAccess ?? []),
        status: 'active',
      });
    }
  }, [open, user, schools, reset, actor]);

  const handleRoleToggle = (roleId: string) => {
    const current = new Set(selectedRoles);
    if (current.has(roleId)) {
      if (current.size > 1) {
        current.delete(roleId);
      }
    } else {
      current.add(roleId);
    }
    setValue('roles', Array.from(current));
  };

  const handleBranchToggle = (branchId: string) => {
    const current = new Set(selectedBranches);
    if (current.has(branchId)) {
      current.delete(branchId);
    } else {
      current.add(branchId);
    }
    setValue('branchAccess', Array.from(current));
  };

  const handleDepartmentToggle = (deptId: string) => {
    const current = new Set(selectedDepartments);
    if (current.has(deptId)) {
      current.delete(deptId);
    } else {
      current.add(deptId);
    }
    setValue('departmentAccess', Array.from(current));
  };

  const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const empId = e.target.value;
    setValue('employeeId', empId, { shouldValidate: true, shouldDirty: true });

    if (empId) {
      const found = employees.find((emp) => emp._id === empId);
      if (found) {
        if (!isEdit && !watchedValues.email && found.email) {
          setValue('email', found.email, { shouldValidate: true, shouldDirty: true });
        }
        if (!isEdit && !watchedValues.username) {
          const generatedUser =
            `${found.firstName.toLowerCase()}.${found.lastName.toLowerCase()}`.replace(
              /[^a-z0-9._-]/g,
              '',
            );
          setValue('username', generatedUser, { shouldValidate: true, shouldDirty: true });
        }
      }
    }
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('schoolId', e.target.value, { shouldValidate: true, shouldDirty: true });
    setValue('employeeId', '', { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      setSubmitError(null);

      // Validate password complexity if provided
      if (data.password && data.password.trim()) {
        const p = data.password.trim();
        if (p.length < 8) {
          setSubmitError('Password must be at least 8 characters long.');
          return;
        }
        if (!/[A-Z]/.test(p)) {
          setSubmitError('Password must contain at least one uppercase letter (A-Z).');
          return;
        }
        if (!/[a-z]/.test(p)) {
          setSubmitError('Password must contain at least one lowercase letter (a-z).');
          return;
        }
        if (!/[0-9]/.test(p)) {
          setSubmitError('Password must contain at least one number (0-9).');
          return;
        }
        if (!/[^a-zA-Z0-9]/.test(p)) {
          setSubmitError('Password must contain at least one special character (e.g. @, #, $, !).');
          return;
        }
      }

      const isSuperAdmin = data.roles.includes('super_admin');
      const finalBranchAccess: 'all' | string[] =
        isSuperAdmin || data.branchAccessType === 'all' ? 'all' : (data.branchAccess ?? []);
      const finalDepartmentAccess: 'all' | string[] =
        data.departmentAccessType === 'all' ? 'all' : (data.departmentAccess ?? []);

      if (finalBranchAccess !== 'all' && (!finalBranchAccess || finalBranchAccess.length === 0)) {
        setSubmitError('At least one branch must be assigned for custom branch access.');
        return;
      }

      const payload = {
        schoolId: data.schoolId,
        employeeId: data.employeeId || undefined,
        username: data.username.trim().toLowerCase(),
        email: data.email.trim().toLowerCase(),
        password:
          (!isEdit || canResetPassword) && data.password && data.password.trim()
            ? data.password.trim()
            : undefined,
        roles: data.roles,
        branchAccess: finalBranchAccess,
        departmentAccess: finalDepartmentAccess,
        status: data.status,
      };

      if (isEdit && user) {
        await updateMutation.mutateAsync({ id: user._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save user account';
      setSubmitError(msg);
    }
  };

  const onValidationError = (formErrors: typeof errors) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0] as keyof typeof formErrors;
      const firstError = formErrors[firstKey];
      const msg =
        typeof firstError?.message === 'string'
          ? firstError.message
          : `Please fill in all required fields (${errorKeys.join(', ')})`;
      setSubmitError(`Validation Error: ${msg}`);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl lg:max-w-4xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? t.users.dialogTitleEdit : t.users.dialogTitleAdd}</DialogTitle>
          <DialogDescription>{t.users.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          {/* Section 1: User Identity & Employee Link */}
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <UserIcon className="size-3.5 text-[#00509d]" />
              <span>Identity & Linkage</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  {t.branch.school} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId', { onChange: handleSchoolChange })}
                  value={watchedValues.schoolId || ''}
                  error={Boolean(errors.schoolId)}
                >
                  <option value="">{t.branch.selectSchool}</option>
                  {schools.map((sch) => (
                    <option key={sch._id} value={sch._id}>
                      {sch.code} · {sch.nameEn}
                    </option>
                  ))}
                </Select>
                {errors.schoolId && (
                  <p className="mt-1 text-xs font-medium text-rose-600">
                    {errors.schoolId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Link Employee Record (Optional)
                </label>
                <Select
                  {...register('employeeId', { onChange: handleEmployeeSelect })}
                  value={watchedValues.employeeId || ''}
                  disabled={!watchedValues.schoolId || isLoadingEmployees}
                >
                  <option value="">
                    {!watchedValues.schoolId
                      ? t.branch.selectSchool
                      : isLoadingEmployees
                        ? t.common.loading
                        : employees.length === 0
                          ? t.employee.noEmployeesFound
                          : 'No linked employee'}
                  </option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      [{emp.employeeId}] {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  {t.users.username} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('username')}
                  placeholder="e.g. dara.sok"
                  error={Boolean(errors.username)}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-rose-600">{errors.username.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  {t.users.email} <span className="text-rose-500">*</span>
                </label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="e.g. dara.sok@snp.edu.kh"
                  error={Boolean(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Password{' '}
                  {isEdit ? (
                    '(Leave blank to keep unchanged)'
                  ) : (
                    <span className="text-rose-500">*</span>
                  )}
                </label>
                <Input
                  type="password"
                  {...register('password')}
                  disabled={isEdit && !canResetPassword}
                  placeholder={
                    isEdit
                      ? '•••••••• (Leave blank to keep current)'
                      : 'Min 8 chars, 1 uppercase, 1 number, 1 symbol'
                  }
                  error={Boolean(errors.password)}
                />
                <p className="mt-1 text-xs text-slate-500">
                  {isEdit
                    ? canResetPassword
                      ? 'A new temporary password signs the user out and requires a password change at next login.'
                      : 'Your role does not have permission to reset passwords.'
                    : 'Requires 8+ characters, with uppercase, lowercase, number, and symbol (e.g. Admin@123456).'}
                </p>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  {t.users.status} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('status')}
                  value={watchedValues.status || 'active'}
                  disabled={user?.roles.includes('super_admin')}
                  onChange={(e) =>
                    setValue('status', e.target.value as 'active' | 'inactive' | 'locked')
                  }
                >
                  <option value="active">{t.common.active}</option>
                  {!user?.roles.includes('super_admin') && (
                    <>
                      <option value="inactive">{t.common.inactive}</option>
                      <option value="locked">Locked</option>
                    </>
                  )}
                </Select>
                {user?.roles.includes('super_admin') && (
                  <p className="mt-1 text-xs text-slate-500">
                    Primary Super Administrator must remain active.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Roles & Permissions */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Shield className="size-3.5 text-[#00509d]" />
              <span>Assigned System Roles</span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {availableRoles.map((role) => {
                const isSelected = selectedRoles.includes(role.id);
                const isSuperAdminRole = role.id === 'super_admin';
                const isLockedSuperAdmin = user?.roles.includes('super_admin') && isSuperAdminRole;
                const isForbiddenSuperAdmin = isSuperAdminRole && actor?.isSuperAdmin !== true;

                return (
                  <button
                    key={role.id}
                    type="button"
                    disabled={isLockedSuperAdmin || isForbiddenSuperAdmin}
                    onClick={() => {
                      if (isLockedSuperAdmin || isForbiddenSuperAdmin) return;
                      handleRoleToggle(role.id);
                    }}
                    title={
                      isLockedSuperAdmin
                        ? 'Super Admin role cannot be removed from the primary administrator'
                        : isForbiddenSuperAdmin
                          ? 'Wildcard authority is required to assign Super Administrator'
                          : undefined
                    }
                    className={`flex items-center justify-between rounded-md border p-2.5 text-left text-xs font-medium transition-colors ${
                      isForbiddenSuperAdmin
                        ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 opacity-60'
                        : isSelected
                          ? 'border-[#00509d] bg-blue-50/70 text-[#00509d]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{role.label}</span>
                      {isForbiddenSuperAdmin && (
                        <span className="text-xs text-slate-400">Restricted</span>
                      )}
                    </div>
                    <span
                      className={`size-3 rounded-full border ${
                        isSelected ? 'border-[#00509d] bg-[#00509d]' : 'border-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            {errors.roles && <p className="text-xs text-rose-600">{errors.roles.message}</p>}
          </div>

          {/* Section 3: Branch Access Scope */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>Branch Access Boundary</span>
            </div>

            {selectedRoles.includes('super_admin') ? (
              <div className="rounded-md border border-blue-200 bg-blue-50/70 p-3 text-xs text-[#00509d]">
                <div className="font-semibold">All Branches (Global Access)</div>
                <p className="mt-0.5 text-xs text-blue-700">
                  Super Administrator accounts are globally isolated and automatically have full
                  access to all school campuses.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {actor?.branchAccess === 'all' && (
                    <button
                      type="button"
                      onClick={() => setValue('branchAccessType', 'all')}
                      className={`rounded-md border p-2.5 text-left text-xs font-medium transition-colors ${
                        branchAccessType === 'all'
                          ? 'border-[#00509d] bg-blue-50/70 text-[#00509d]'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold">All Branches (Global)</div>
                      <div className="text-xs text-slate-500">
                        Access data across all school campuses
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setValue('branchAccessType', 'custom')}
                    className={`rounded-md border p-2.5 text-left text-xs font-medium transition-colors ${
                      branchAccessType === 'custom'
                        ? 'border-[#00509d] bg-blue-50/70 text-[#00509d]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold">Selected Branches</div>
                    <div className="text-xs text-slate-500">
                      Strictly isolate to specific campus branches
                    </div>
                  </button>
                </div>

                {branchAccessType === 'custom' && (
                  <div className="rounded-md border border-slate-200 bg-slate-50/50 p-3">
                    <p className="mb-2 text-xs font-medium text-slate-700">
                      Select Permitted Branches:
                    </p>
                    {branches.length === 0 ? (
                      <p className="text-xs text-amber-700">
                        No branches exist yet. Please select &quot;All Branches&quot; or create a
                        branch in Organization &rarr; Branches first.
                      </p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {branches.map((b) => {
                          const isChecked = selectedBranches.includes(b._id);
                          return (
                            <button
                              key={b._id}
                              type="button"
                              onClick={() => handleBranchToggle(b._id)}
                              className={`flex items-center justify-between rounded border p-2 text-left text-xs transition-colors ${
                                isChecked
                                  ? 'border-[#00509d] bg-white font-medium text-[#00509d]'
                                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <span>
                                {b.branchCode} · {b.branchNameEn}
                              </span>
                              <span
                                className={`size-2.5 rounded-full ${
                                  isChecked ? 'bg-[#00509d]' : 'border border-slate-300'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Section 4: Department Access Scope */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <PanelsTopLeft className="size-3.5 text-[#00509d]" />
              <span>Department Access Boundary</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {actor?.departmentAccess === 'all' && (
                <button
                  type="button"
                  onClick={() => setValue('departmentAccessType', 'all')}
                  className={`rounded-md border p-2.5 text-left text-xs font-medium transition-colors ${
                    departmentAccessType === 'all'
                      ? 'border-[#00509d] bg-blue-50/70 text-[#00509d]'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-semibold">All Departments (Global)</div>
                  <div className="text-xs text-slate-500">
                    Unrestricted access across all campus departments
                  </div>
                </button>
              )}

              <button
                type="button"
                onClick={() => setValue('departmentAccessType', 'custom')}
                className={`rounded-md border p-2.5 text-left text-xs font-medium transition-colors ${
                  departmentAccessType === 'custom'
                    ? 'border-[#00509d] bg-blue-50/70 text-[#00509d]'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold">Selected Departments</div>
                <div className="text-xs text-slate-500">
                  Strictly isolate to specific academic or administrative departments
                </div>
              </button>
            </div>

            {departmentAccessType === 'custom' && (
              <div className="rounded-md border border-slate-200 bg-slate-50/50 p-3">
                <p className="mb-2 text-xs font-medium text-slate-700">
                  Select Permitted Departments:
                </p>
                <div className="grid max-h-40 grid-cols-2 gap-2 overflow-y-auto">
                  {departments.map((d) => {
                    const isChecked = selectedDepartments.includes(d._id);
                    return (
                      <button
                        key={d._id}
                        type="button"
                        onClick={() => handleDepartmentToggle(d._id)}
                        className={`flex items-center justify-between rounded border p-2 text-left text-xs transition-colors ${
                          isChecked
                            ? 'border-[#00509d] bg-white font-medium text-[#00509d]'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">
                          {d.code} · {d.nameEn}
                        </span>
                        <span
                          className={`size-2.5 shrink-0 rounded-full ${
                            isChecked ? 'bg-[#00509d]' : 'border border-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t.dialogs.cancel}
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? t.dialogs.saving : isEdit ? t.dialogs.saveChanges : t.users.addUser}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
