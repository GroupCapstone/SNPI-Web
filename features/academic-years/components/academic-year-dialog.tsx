'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CalendarRange } from '@/components/icons';
import { useForm } from 'react-hook-form';

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
  useCreateAcademicYearMutation,
  useUpdateAcademicYearMutation,
} from '../hooks/use-academic-years';
import type { AcademicYearFormData } from '../schemas';
import { academicYearFormSchema } from '../schemas';
import type { AcademicYear } from '../types';

interface AcademicYearDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  academicYear?: AcademicYear | null;
}

export const AcademicYearDialog: React.FC<AcademicYearDialogProps> = ({
  open,
  onOpenChange,
  academicYear,
}) => {
  const isEdit = Boolean(academicYear);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const createMutation = useCreateAcademicYearMutation();
  const updateMutation = useUpdateAcademicYearMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AcademicYearFormData>({
    resolver: zodResolver(academicYearFormSchema),
    defaultValues: {
      code: '',
      name: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      status: 'active',
    },
  });

  const isCurrentValue = watch('isCurrent');
  const statusValue = watch('status');

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (academicYear) {
      const formatDate = (d: string) => {
        try {
          return new Date(d).toISOString().split('T')[0];
        } catch {
          return d;
        }
      };

      reset({
        code: academicYear.code,
        name: academicYear.name,
        startDate: formatDate(academicYear.startDate),
        endDate: formatDate(academicYear.endDate),
        isCurrent: academicYear.isCurrent,
        status: academicYear.status,
      });
    } else {
      const today = new Date();
      const currentYear = today.getFullYear();
      const nextYear = currentYear + 1;
      reset({
        code: `${currentYear}-${nextYear}`,
        name: `Academic Year ${currentYear}-${nextYear}`,
        startDate: `${currentYear}-09-01`,
        endDate: `${nextYear}-08-31`,
        isCurrent: false,
        status: 'active',
      });
    }
  }, [open, academicYear, reset]);

  const onSubmit = async (data: AcademicYearFormData) => {
    try {
      setSubmitError(null);
      const payload = {
        code: data.code.trim().toUpperCase(),
        name: data.name.trim(),
        startDate: data.startDate,
        endDate: data.endDate,
        isCurrent: data.isCurrent,
        status: data.status,
      };

      if (isEdit && academicYear) {
        await updateMutation.mutateAsync({ id: academicYear._id, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save academic year';
      setSubmitError(msg);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarRange className="size-5 text-[#00509d]" />
            {isEdit ? 'Edit Academic Year' : 'Create Academic Year'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify calendar dates, code, and active period status.'
              : 'Define a new school academic year calendar for class schedules and student admissions.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Academic Year Code <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('code')}
                placeholder="e.g. 2026-2027"
                error={Boolean(errors.code)}
              />
              {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Academic Year Name <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('name')}
                placeholder="e.g. Academic Year 2026-2027"
                error={Boolean(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Start Date <span className="text-rose-500">*</span>
              </label>
              <Input type="date" {...register('startDate')} error={Boolean(errors.startDate)} />
              {errors.startDate && (
                <p className="mt-1 text-xs text-rose-600">{errors.startDate.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                End Date <span className="text-rose-500">*</span>
              </label>
              <Input type="date" {...register('endDate')} error={Boolean(errors.endDate)} />
              {errors.endDate && (
                <p className="mt-1 text-xs text-rose-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Status <span className="text-rose-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={statusValue || 'active'}
                onChange={(e) =>
                  setValue('status', e.target.value as 'active' | 'inactive' | 'closed')
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed</option>
              </Select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-800">
                <input
                  type="checkbox"
                  {...register('isCurrent')}
                  checked={Boolean(isCurrentValue)}
                  className="size-4 rounded border-slate-300 text-[#00509d]"
                />
                <span>Set as Current Active Year</span>
              </label>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? 'Saving...' : isEdit ? 'Update Academic Year' : 'Create Academic Year'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
