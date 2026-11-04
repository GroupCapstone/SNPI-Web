'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from '@/components/icons';
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
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';

import { useCreateLevelMutation, useUpdateLevelMutation } from '../hooks/use-levels';
import type { LevelFormData } from '../schemas';
import { levelFormSchema } from '../schemas';
import type { Level } from '../types';

interface LevelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level?: Level | null;
  defaultProgramId?: string;
}

export const LevelDialog = ({ open, onOpenChange, level, defaultProgramId }: LevelDialogProps) => {
  const isEdit = Boolean(level);
  const createMutation = useCreateLevelMutation();
  const updateMutation = useUpdateLevelMutation();

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LevelFormData>({
    resolver: zodResolver(levelFormSchema),
    defaultValues: {
      programId: defaultProgramId ?? '',
      code: '',
      name: '',
      description: '',
      sequence: 1,
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (level) {
      const progId =
        typeof level.programId === 'object' && level.programId !== null
          ? level.programId._id
          : String(level.programId);

      reset({
        programId: progId,
        code: level.code,
        name: level.name,
        description: level.description ?? '',
        sequence: level.sequence,
        status: level.status,
      });
    } else {
      const firstProgramId = programsData?.data?.[0]?._id ?? '';
      reset({
        programId: defaultProgramId || firstProgramId,
        code: '',
        name: '',
        description: '',
        sequence: 1,
        status: 'active',
      });
    }
  }, [open, level, defaultProgramId, programsData?.data, reset]);

  const onSubmit = async (data: LevelFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && level) {
        await updateMutation.mutateAsync({ id: level._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save program level';
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
      <DialogContent className="max-w-2xl lg:max-w-3xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Program Level' : 'Create Program Level'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the academic sequence, description, and level parameters.'
              : 'Add a progression level to an existing educational program.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
              Parent Program *
            </label>
            <Select
              {...register('programId')}
              value={watchedValues.programId || ''}
              onChange={(e) => setValue('programId', e.target.value)}
              error={Boolean(errors.programId)}
            >
              <option value="">Select an Academic Program</option>
              {programs.map((prog) => (
                <option key={prog._id} value={prog._id}>
                  {prog.code} — {prog.nameEn}
                </option>
              ))}
            </Select>
            {errors.programId && (
              <p className="mt-1 text-xs text-rose-600">{errors.programId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Level Code *
              </label>
              <Input
                {...register('code')}
                placeholder="e.g. GEP-BEG"
                error={Boolean(errors.code)}
              />
              {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Sequence Order *
              </label>
              <Input
                type="number"
                {...register('sequence', { valueAsNumber: true })}
                placeholder="1"
                error={Boolean(errors.sequence)}
              />
              {errors.sequence && (
                <p className="mt-1 text-xs text-rose-600">{errors.sequence.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Level Name *
              </label>
              <Input
                {...register('name')}
                placeholder="e.g. Beginner / Year 1"
                error={Boolean(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Status
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'active'}
                onChange={(e) => setValue('status', e.target.value as 'active' | 'inactive')}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
              Description
            </label>
            <Textarea
              {...register('description')}
              placeholder="Outline level competencies and target outcomes..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Level'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
