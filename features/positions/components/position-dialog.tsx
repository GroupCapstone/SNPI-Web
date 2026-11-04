'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Briefcase, Building2 } from '@/components/icons';
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
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useTranslation } from '@/lib/i18n';

import { useCreatePositionMutation, useUpdatePositionMutation } from '../hooks/use-positions';
import type { PositionFormData } from '../schemas';
import { positionFormSchema } from '../schemas';
import type { Position } from '../types';

interface PositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: Position | null;
  defaultBranchId?: string;
  defaultDepartmentId?: string;
}

export const PositionDialog = ({
  open,
  onOpenChange,
  position,
  defaultBranchId,
  defaultDepartmentId,
}: PositionDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(position);
  const createMutation = useCreatePositionMutation();
  const updateMutation = useUpdatePositionMutation();

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
  } = useForm<PositionFormData>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: defaultBranchId ?? '',
      departmentId: defaultDepartmentId ?? '',
      code: '',
      nameEn: '',
      nameKh: '',
      description: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;

  // Cascading query: branches filtered by selected school
  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 100,
  });
  const filteredBranches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  // Cascading query: departments filtered by selected branch
  const { data: departmentsData } = useDepartmentsQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const filteredDepartments = React.useMemo(() => departmentsData?.data ?? [], [departmentsData]);

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (position) {
      const schId =
        typeof position.schoolId === 'object' && position.schoolId !== null
          ? position.schoolId._id
          : String(position.schoolId);

      const brId =
        typeof position.branchId === 'object' && position.branchId !== null
          ? position.branchId._id
          : String(position.branchId);

      const depId =
        typeof position.departmentId === 'object' && position.departmentId !== null
          ? position.departmentId._id
          : String(position.departmentId);

      reset({
        schoolId: schId,
        branchId: brId,
        departmentId: depId,
        code: position.code,
        nameEn: position.nameEn,
        nameKh: position.nameKh,
        description: position.description ?? '',
        status: position.status,
      });
    } else {
      const initialSchool = schools[0]?._id || '';
      reset({
        schoolId: initialSchool,
        branchId: defaultBranchId ?? '',
        departmentId: defaultDepartmentId ?? '',
        code: '',
        nameEn: '',
        nameKh: '',
        description: '',
        status: 'active',
      });
    }
  }, [open, position, defaultBranchId, defaultDepartmentId, schools, reset]);

  // When school changes: reset branch and department
  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSchoolId = e.target.value;
    setValue('schoolId', newSchoolId);
    setValue('branchId', '');
    setValue('departmentId', '');
  };

  // When branch changes: reset department
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBranchId = e.target.value;
    setValue('branchId', newBranchId);
    setValue('departmentId', '');
  };

  const onSubmit = async (data: PositionFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && position) {
        await updateMutation.mutateAsync({ id: position._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save job position';
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
            {isEdit ? t.position.dialogTitleEdit : t.position.dialogTitleAdd}
          </DialogTitle>
          <DialogDescription>{t.position.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Hierarchy Scope */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>{t.position.organizationalPlacement}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                  onChange={handleBranchChange}
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

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.position.department} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('departmentId')}
                  value={watchedValues.departmentId || ''}
                  onChange={(e) => setValue('departmentId', e.target.value)}
                  disabled={!selectedBranchId || filteredDepartments.length === 0}
                  error={Boolean(errors.departmentId)}
                >
                  <option value="">
                    {!selectedBranchId
                      ? t.department.selectBranch
                      : filteredDepartments.length === 0
                        ? t.department.noDepartmentsFound
                        : t.position.selectDepartment}
                  </option>
                  {filteredDepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.code} — {dept.nameEn}
                    </option>
                  ))}
                </Select>
                {errors.departmentId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.departmentId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Position Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Briefcase className="size-3.5 text-[#00509d]" />
              <span>{t.position.positionDesignation}</span>
            </div>

            {/* Row: English Title & Khmer Title */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.position.titleEn} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('nameEn')}
                  placeholder="e.g. English Language Teacher"
                  error={Boolean(errors.nameEn)}
                />
                {errors.nameEn && (
                  <p className="mt-1 text-xs text-rose-600">{errors.nameEn.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.position.titleKh} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('nameKh')}
                  placeholder="e.g. គ្រូបង្រៀនភាសាអង់គ្លេស"
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
                  {t.position.code} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('code')}
                  placeholder="e.g. TCH-ENG"
                  error={Boolean(errors.code)}
                />
                {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.position.status} <span className="text-rose-500">*</span>
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
                {t.position.description}
              </label>
              <Textarea
                {...register('description')}
                placeholder="Outline role responsibilities, job requirements, and reporting lines..."
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
                  : t.position.addPosition}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
