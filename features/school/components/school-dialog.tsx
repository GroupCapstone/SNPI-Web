'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, School as SchoolIcon } from '@/components/icons';
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

import { useCreateSchoolMutation, useUpdateSchoolMutation } from '../hooks/use-school';
import type { SchoolFormData } from '../schemas';
import { schoolFormSchema } from '../schemas';
import type { School } from '../types';
import { useTranslation } from '@/lib/i18n';

interface SchoolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  school?: School | null;
}

export const SchoolDialog = ({ open, onOpenChange, school }: SchoolDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(school);
  const createMutation = useCreateSchoolMutation();
  const updateMutation = useUpdateSchoolMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      code: '',
      nameEn: '',
      nameKh: '',
      logo: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  React.useEffect(() => {
    if (!open) return;

    if (school) {
      reset({
        code: school.code,
        nameEn: school.nameEn,
        nameKh: school.nameKh,
        logo: school.logo ?? '',
        phone: school.phone ?? '',
        email: school.email ?? '',
        address: school.address ?? '',
        website: school.website ?? '',
        status: school.status,
      });
    } else {
      reset({
        code: '',
        nameEn: '',
        nameKh: '',
        logo: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        status: 'active',
      });
    }
  }, [open, school, reset]);

  const onSubmit = async (data: SchoolFormData) => {
    try {
      setSubmitError(null);
      const payload = {
        code: data.code.trim().toUpperCase(),
        nameEn: data.nameEn.trim(),
        nameKh: data.nameKh.trim(),
        logo: data.logo?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
        email: data.email?.trim() || undefined,
        address: data.address?.trim() || undefined,
        website: data.website?.trim() || undefined,
        status: data.status,
      };

      if (isEdit && school) {
        await updateMutation.mutateAsync({ id: school._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save school profile';
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
          <DialogTitle>{isEdit ? t.school.editSchoolOrg : t.school.createSchoolOrg}</DialogTitle>
          <DialogDescription>{isEdit ? t.school.editDesc : t.school.createDesc}</DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Identity & Status */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-normal text-slate-700 uppercase">
              <SchoolIcon className="size-3.5 text-[#00509d]" />
              <span>{t.school.institutionalIdentity}</span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.school.schoolCode} <span className="text-rose-500">*</span>
                </label>
                <Input {...register('code')} placeholder="e.g. SNP" error={Boolean(errors.code)} />
                {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700">
                  {t.school.operationalStatus} <span className="text-rose-500">*</span>
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
          </div>

          {/* Section 2: School Names */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.school.schoolNameEn} <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('nameEn')}
                placeholder="e.g. SNPI International School"
                error={Boolean(errors.nameEn)}
              />
              {errors.nameEn && (
                <p className="mt-1 text-xs text-rose-600">{errors.nameEn.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.school.schoolNameKh} <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('nameKh')}
                placeholder="e.g. សាលាអន្តរជាតិ អេសអិនភី"
                error={Boolean(errors.nameKh)}
              />
              {errors.nameKh && (
                <p className="mt-1 text-xs text-rose-600">{errors.nameKh.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Contact Channels */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.school.phone}
              </label>
              <Input {...register('phone')} placeholder="+855 23 888 999" />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.school.email}
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder="info@snp.edu.kh"
                error={Boolean(errors.email)}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.school.website}
              </label>
              <Input
                {...register('website')}
                placeholder="https://snp.edu.kh"
                error={Boolean(errors.website)}
              />
              {errors.website && (
                <p className="mt-1 text-xs text-rose-600">{errors.website.message}</p>
              )}
            </div>
          </div>

          {/* Section 4: Address */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              {t.school.headquarters}
            </label>
            <Textarea
              {...register('address')}
              placeholder="Central campus address, building number, street, city..."
              rows={2}
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t.common.cancel}
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? t.common.submitting : isEdit ? t.common.save : t.common.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
