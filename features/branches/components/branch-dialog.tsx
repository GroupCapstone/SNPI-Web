'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Building2 } from '@/components/icons';
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
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useTranslation } from '@/lib/i18n';

import { useCreateBranchMutation, useUpdateBranchMutation } from '../hooks/use-branches';
import type { BranchFormData } from '../schemas';
import { branchFormSchema } from '../schemas';
import type { Branch } from '../types';

interface BranchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branch?: Branch | null;
  defaultSchoolId?: string;
}

export const BranchDialog = ({
  open,
  onOpenChange,
  branch,
  defaultSchoolId,
}: BranchDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(branch);
  const createMutation = useCreateBranchMutation();
  const updateMutation = useUpdateBranchMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData]);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      schoolId: defaultSchoolId ?? '',
      branchCode: '',
      branchNameEn: '',
      branchNameKh: '',
      address: '',
      phone: '',
      email: '',
      openingDate: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  React.useEffect(() => {
    if (!open) return;

    if (branch) {
      const schId =
        typeof branch.schoolId === 'object' && branch.schoolId !== null
          ? branch.schoolId._id
          : String(branch.schoolId);

      reset({
        schoolId: schId,
        branchCode: branch.branchCode,
        branchNameEn: branch.branchNameEn,
        branchNameKh: branch.branchNameKh,
        address: branch.address ?? '',
        phone: branch.phone ?? '',
        email: branch.email ?? '',
        openingDate: branch.openingDate ? branch.openingDate.substring(0, 10) : '',
        status: branch.status,
      });
    } else {
      const firstSchoolId = schools[0]?._id || '';
      reset({
        schoolId: defaultSchoolId || firstSchoolId,
        branchCode: '',
        branchNameEn: '',
        branchNameKh: '',
        address: '',
        phone: '',
        email: '',
        openingDate: '',
        status: 'active',
      });
    }
  }, [open, branch, defaultSchoolId, schools, reset]);

  const onSubmit = async (data: BranchFormData) => {
    try {
      setSubmitError(null);
      const payload = {
        schoolId: data.schoolId,
        branchCode: data.branchCode.trim().toUpperCase(),
        branchNameEn: data.branchNameEn.trim(),
        branchNameKh: data.branchNameKh.trim(),
        address: data.address?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
        email: data.email?.trim() || undefined,
        openingDate: data.openingDate || undefined,
        status: data.status,
      };

      if (isEdit && branch) {
        await updateMutation.mutateAsync({ id: branch._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save school branch';
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
          <DialogTitle>{isEdit ? t.branch.dialogTitleEdit : t.branch.dialogTitleAdd}</DialogTitle>
          <DialogDescription>{t.branch.dialogSubtitle}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Organization & Identification */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <Building2 className="size-3.5 text-[#00509d]" />
              <span>{t.branch.campusIdentity}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.branch.school} <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId')}
                  value={watchedValues.schoolId || ''}
                  onChange={(e) => setValue('schoolId', e.target.value)}
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
                  {t.branch.branchCode} <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register('branchCode')}
                  placeholder="e.g. MB-01"
                  error={Boolean(errors.branchCode)}
                />
                {errors.branchCode && (
                  <p className="mt-1 text-xs text-rose-600">{errors.branchCode.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Branch Names */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.branchNameEn} <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('branchNameEn')}
                placeholder="e.g. Main Branch (Phnom Penh)"
                error={Boolean(errors.branchNameEn)}
              />
              {errors.branchNameEn && (
                <p className="mt-1 text-xs text-rose-600">{errors.branchNameEn.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.branchNameKh} <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('branchNameKh')}
                placeholder="e.g. សាខាធំ (ភ្នំពេញ)"
                error={Boolean(errors.branchNameKh)}
              />
              {errors.branchNameKh && (
                <p className="mt-1 text-xs text-rose-600">{errors.branchNameKh.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Contact & Status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.phone}
              </label>
              <Input {...register('phone')} placeholder="+855 23 888 101" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.email}
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder="branch@snp.edu.kh"
                error={Boolean(errors.email)}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.status} <span className="text-rose-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'active'}
                onChange={(e) =>
                  setValue('status', e.target.value as 'active' | 'inactive' | 'closed')
                }
              >
                <option value="active">{t.common.active}</option>
                <option value="inactive">{t.common.inactive}</option>
                <option value="closed">Closed</option>
              </Select>
            </div>
          </div>

          {/* Section 4: Location & Opening */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.openingDate}
              </label>
              <Input type="date" {...register('openingDate')} />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.branch.address}
              </label>
              <Input
                {...register('address')}
                placeholder="Street address, Khan / District, City..."
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
              {isLoading ? t.dialogs.saving : isEdit ? t.dialogs.saveChanges : t.branch.addBranch}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
