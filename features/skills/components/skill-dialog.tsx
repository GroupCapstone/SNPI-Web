'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Award } from '@/components/icons';
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

import { useCreateSkillMutation, useUpdateSkillMutation } from '../hooks/use-skills';
import type { SkillFormData } from '../schemas';
import { skillFormSchema } from '../schemas';
import type { Skill, SkillCategory } from '../types';
import { useTranslation } from '@/lib/i18n';

interface SkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill?: Skill | null;
}

export const SkillDialog = ({ open, onOpenChange, skill }: SkillDialogProps) => {
  const { t } = useTranslation();
  const isEdit = Boolean(skill);
  const createMutation = useCreateSkillMutation();
  const updateMutation = useUpdateSkillMutation();

  const categoryOptions: Array<{ value: SkillCategory; label: string }> = [
    { value: 'pedagogy', label: t.skills.pedagogy },
    { value: 'technical', label: t.skills.technical },
    { value: 'leadership', label: t.skills.leadership },
    { value: 'administration', label: t.skills.administration },
    { value: 'communication', label: t.skills.communication },
    { value: 'language', label: t.skills.language },
    { value: 'domain', label: t.skills.domain },
    { value: 'general', label: t.skills.general },
  ];

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors, isSubmitting },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      code: '',
      name: '',
      category: 'general',
      description: '',
      isActive: true,
    },
  });
  const watchedValues = useWatch({ control });

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (skill) {
      reset({
        code: skill.code,
        name: skill.name,
        category: skill.category,
        description: skill.description ?? '',
        isActive: skill.isActive,
      });
    } else {
      reset({
        code: '',
        name: '',
        category: 'pedagogy',
        description: '',
        isActive: true,
      });
    }
  }, [open, skill, reset]);

  const onSubmit = async (data: SkillFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && skill) {
        await updateMutation.mutateAsync({
          id: skill._id,
          data: {
            name: data.name,
            category: data.category,
            description: data.description || undefined,
            isActive: data.isActive,
          },
        });
      } else {
        await createMutation.mutateAsync({
          code: data.code.trim().toUpperCase(),
          name: data.name,
          category: data.category,
          description: data.description || undefined,
          isActive: data.isActive,
        });
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save skill definition';
      setSubmitError(msg);
    }
  };

  const isLoading = isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Award className="size-5.5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                {isEdit ? t.skills.editSkillTitle : t.skills.addSkillTitle}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {isEdit ? t.skills.editSkillDesc : t.skills.addSkillDesc}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {submitError && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {submitError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                {t.skills.code} <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('code')}
                placeholder="e.g. SKILL-PED-001"
                disabled={isEdit || isLoading}
                className="h-9 text-xs uppercase"
              />
              {errors.code && <p className="text-xs text-rose-600">{errors.code.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                {t.skills.category} <span className="text-rose-500">*</span>
              </label>
              <Select
                {...register('category')}
                value={watchedValues.category}
                onChange={(e) => setValue('category', e.target.value as SkillCategory)}
                disabled={isLoading}
                className="h-9 text-xs"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <p className="text-xs text-rose-600">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              {t.skills.skillName} <span className="text-rose-500">*</span>
            </label>
            <Input
              {...register('name')}
              placeholder="e.g. Teaching Methodology & Lesson Delivery"
              disabled={isLoading}
              className="h-9 text-xs"
            />
            {errors.name && <p className="text-xs text-rose-600">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">{t.skills.description}</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Brief explanation of skill scope, expectations, and evaluation context..."
              disabled={isLoading}
              className="w-full rounded-md border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
            />
            {errors.description && (
              <p className="text-xs text-rose-600">{errors.description.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isActiveSkill"
              {...register('isActive')}
              className="size-4 rounded border-slate-300 text-[#00509d]"
            />
            <label htmlFor="isActiveSkill" className="text-xs font-medium text-slate-700">
              {t.skills.activeCatalogCheckbox}
            </label>
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="text-xs"
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isLoading}
              className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
            >
              {isLoading ? t.common.submitting : isEdit ? t.common.save : t.common.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
