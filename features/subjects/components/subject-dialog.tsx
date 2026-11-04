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

import { useCreateSubjectMutation, useUpdateSubjectMutation } from '../hooks/use-subjects';
import type { SubjectFormData } from '../schemas';
import { subjectFormSchema } from '../schemas';
import type { Subject } from '../types';

interface SubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject?: Subject | null;
}

export const SubjectDialog = ({ open, onOpenChange, subject }: SubjectDialogProps) => {
  const isEdit = Boolean(subject);
  const createMutation = useCreateSubjectMutation();
  const updateMutation = useUpdateSubjectMutation();

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectFormSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (subject) {
      reset({
        code: subject.code,
        name: subject.name,
        description: subject.description ?? '',
        status: subject.status,
      });
    } else {
      reset({
        code: '',
        name: '',
        description: '',
        status: 'active',
      });
    }
  }, [open, subject, reset]);

  const onSubmit = async (data: SubjectFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && subject) {
        await updateMutation.mutateAsync({ id: subject._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save subject';
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
          <DialogTitle>{isEdit ? 'Edit Subject' : 'Create Subject'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the subject information and curriculum code.'
              : 'Add an academic subject to the curriculum directory.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Code *
              </label>
              <Input
                {...register('code')}
                placeholder="e.g. ENG-READ"
                error={Boolean(errors.code)}
                disabled={isEdit}
              />
              {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
                Subject Name *
              </label>
              <Input
                {...register('name')}
                placeholder="e.g. Reading & Vocabulary"
                error={Boolean(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
              Status
            </label>
            <Select
              {...register('status')}
              value={watchedValues.status || 'active'}
              onChange={(e) =>
                setValue('status', e.target.value as 'active' | 'inactive' | 'archived')
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </Select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold tracking-normal text-slate-700 uppercase">
              Description
            </label>
            <Textarea
              {...register('description')}
              placeholder="Outline topics covered, key objectives, and materials..."
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
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Subject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
