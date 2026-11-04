'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Building2, Info } from '@/components/icons';
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
import { Textarea } from '@/components/ui/textarea';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useTranslation } from '@/lib/i18n';

import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../hooks/use-departments';
import type { DepartmentFormData } from '../schemas';
import { departmentFormSchema } from '../schemas';
import type { Department } from '../types';

interface DepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department?: Department | null;
  defaultBranchId?: string;
}

export const DepartmentDialog = ({
  open,
  onOpenChange,
  department,
  defaultBranchId,
}: DepartmentDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(department);
  const createMutation = useCreateDepartmentMutation();
  const updateMutation = useUpdateDepartmentMutation();

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: defaultBranchId ?? '',
      code: '',
      nameEn: '',
      nameKh: '',
      description: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;

  // Cascading query: branches filtered by selected school
  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 100,
  });
  const filteredBranches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (department) {
      const schId =
        typeof department.schoolId === 'object' && department.schoolId !== null
          ? department.schoolId._id
          : String(department.schoolId);

      const brId =
        typeof department.branchId === 'object' && department.branchId !== null
          ? department.branchId._id
          : String(department.branchId);

      reset({
        schoolId: schId,
        branchId: brId,
        code: department.code,
        nameEn: department.nameEn,
        nameKh: department.nameKh,
        description: department.description ?? '',
        status: department.status,
      });
    } else {
      const initialSchool = schools[0]?._id || '';
      reset({
        schoolId: initialSchool,
        branchId: defaultBranchId ?? '',
        code: '',
        nameEn: '',
        nameKh: '',
        description: '',
        status: 'active',
      });
    }
  }, [open, department, defaultBranchId, schools, reset]);

  // When school changes in create mode, reset branch
  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSchoolId = e.target.value;
    setValue('schoolId', newSchoolId);
    setValue('branchId', '');
  };

  const onSubmit = async (data: DepartmentFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && department) {
        await updateMutation.mutateAsync({ id: department._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save department';
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
          <DialogTitle>
            {isEdit ? t.department.dialogTitleEdit : t.department.dialogTitleAdd}
          </DialogTitle>
          <DialogDescription>{t.department.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Organizational Hierarchy */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>{t.department.campusHierarchy}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.branch.school} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId')}
                  value={watchedValues.schoolId || ''}
                  onChange={handleSchoolChange}
                  error={Boolean(errors.schoolId)}
                >
                  <option value="">{t.branch.selectSchool}</option>
                  {schools.map((sch) => (
                    <option key={sch._id} value={sch._id}>
                      {sch.code} — {sch.nameEn}
                    </option>
                  ))}
                </Select>
                {errors.schoolId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.schoolId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.branch} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('branchId')}
                  value={watchedValues.branchId || ''}
                  onChange={(e) => setValue('branchId', e.target.value)}
                  disabled={!selectedSchoolId || filteredBranches.length === 0}
                  error={Boolean(errors.branchId)}
                >
                  <option value="">
                    {!selectedSchoolId
                      ? t.branch.selectSchool
                      : filteredBranches.length === 0
                        ? t.branch.noBranchesFound
                        : t.department.selectBranch}
                  </option>
                  {filteredBranches.map((br) => (
                    <option key={br._id} value={br._id}>
                      {br.branchCode} · {br.branchNameEn}
                    </option>
                  ))}
                </Select>
                {errors.branchId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.branchId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Department Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Info className="size-3.5 text-[#00509d]" />
              <span>{t.department.departmentIdentity}</span>
            </div>

            {/* Row: English Name & Khmer Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.nameEn} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('nameEn')}
                  placeholder="e.g. Academic Department"
                  error={Boolean(errors.nameEn)}
                />
                {errors.nameEn && (
                  <p className="mt-1 text-xs text-rose-600">{errors.nameEn.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.nameKh} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('nameKh')}
                  placeholder="e.g. ដេប៉ាតឺម៉ង់សិក្សាធិការ"
                  error={Boolean(errors.nameKh)}
                />
                {errors.nameKh && (
                  <p className="mt-1 text-xs text-rose-600">{errors.nameKh.message}</p>
                )}
              </div>
            </div>

            {/* Row: Code & Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.code} <span className="text-rose-500">*</span>
                </label>
                <Input {...register('code')} placeholder="e.g. ACA" error={Boolean(errors.code)} />
                {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.department.status} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('status')}
                  value={watchedValues.status || 'active'}
                  onChange={(e) => setValue('status', e.target.value as 'active' | 'inactive')}
                >
                  <option value="active">{t.common.active}</option>
                  <option value="inactive">{t.common.inactive}</option>
                </Select>
              </div>
            </div>

            {/* Row: Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.department.description}
              </label>
              <Textarea
                {...register('description')}
                placeholder="Outline department scope, responsibilities, and team mandate..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t.dialogs.cancel}
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading
                ? t.dialogs.saving
                : isEdit
                  ? t.dialogs.saveChanges
                  : t.department.addDepartment}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
