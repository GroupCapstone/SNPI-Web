'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, DollarSign } from '@/components/icons';
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
import type { AcademicYearItem } from '@/features/academic-years/hooks/use-academic-years';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';

import { useCreateTuitionFeeMutation, useUpdateTuitionFeeMutation } from '../hooks/use-tuition';
import type { TuitionFeeFormData } from '../schemas';
import { tuitionFeeFormSchema } from '../schemas';
import type { TuitionFee } from '../types';

interface TuitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tuitionFee?: TuitionFee | null;
}

export const TuitionDialog = ({ open, onOpenChange, tuitionFee }: TuitionDialogProps) => {
  const isEdit = Boolean(tuitionFee);
  const createMutation = useCreateTuitionFeeMutation();
  const updateMutation = useUpdateTuitionFeeMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: schoolsData } = useSchoolsQuery();
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData]);

  const {
    control,
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TuitionFeeFormData>({
    resolver: zodResolver(tuitionFeeFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: '',
      academicYearId: '',
      programId: '',
      levelId: '',
      feeName: '',
      feeCode: '',
      amount: 0,
      currency: 'USD',
      billingCycle: 'term',
      description: '',
      status: 'active',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedProgramId = watchedValues.programId;

  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears = React.useMemo<AcademicYearItem[]>(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: programsData } = useProgramsQuery();
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData]);

  const { data: levelsData } = useLevelsQuery({
    programId: selectedProgramId || undefined,
  });
  const levels = React.useMemo(() => levelsData?.data ?? [], [levelsData]);

  React.useEffect(() => {
    if (!open) return;

    if (tuitionFee) {
      reset({
        schoolId: tuitionFee.schoolId,
        branchId:
          typeof tuitionFee.branchId === 'object' ? tuitionFee.branchId._id : tuitionFee.branchId,
        academicYearId:
          typeof tuitionFee.academicYearId === 'object'
            ? tuitionFee.academicYearId._id
            : tuitionFee.academicYearId,
        programId:
          typeof tuitionFee.programId === 'object'
            ? tuitionFee.programId._id
            : tuitionFee.programId,
        levelId:
          typeof tuitionFee.levelId === 'object' ? tuitionFee.levelId._id : tuitionFee.levelId,
        feeName: tuitionFee.feeName,
        feeCode: tuitionFee.feeCode,
        amount: tuitionFee.amount,
        currency: tuitionFee.currency,
        billingCycle: tuitionFee.billingCycle,
        description: tuitionFee.description ?? '',
        status: tuitionFee.status,
      });
    } else {
      reset({
        schoolId: schools[0]?._id ?? '',
        branchId: '',
        academicYearId: academicYears[0]?._id ?? '',
        programId: '',
        levelId: '',
        feeName: '',
        feeCode: '',
        amount: 0,
        currency: 'USD',
        billingCycle: 'term',
        description: '',
        status: 'active',
      });
    }
  }, [open, tuitionFee, reset, schools, academicYears]);

  React.useEffect(() => {
    if (!isEdit && selectedSchoolId && branches.length > 0 && !selectedBranchId) {
      setValue('branchId', branches[0]._id);
    }
  }, [isEdit, selectedSchoolId, branches, selectedBranchId, setValue]);

  const onSubmit = async (data: TuitionFeeFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && tuitionFee) {
        await updateMutation.mutateAsync({ id: tuitionFee._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save tuition structure';
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
      <DialogContent className="max-w-3xl" onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit Tuition Fee Structure' : 'Create Tuition Fee Structure'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify the tuition price, currency, and billing schedule.'
              : 'Setup a standard tuition charge rate for a curriculum level.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3.5">
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold text-[#00509d] uppercase">
              <DollarSign className="size-3.5" />
              <span>Campus & Academic Program Level</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  School <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('schoolId')}
                  value={watchedValues.schoolId || ''}
                  onChange={(e) => {
                    setValue('schoolId', e.target.value);
                    setValue('branchId', '');
                  }}
                  error={Boolean(errors.schoolId)}
                >
                  <option value="">Select School</option>
                  {schools.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.nameEn}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Branch <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('branchId')}
                  value={watchedValues.branchId || ''}
                  onChange={(e) => setValue('branchId', e.target.value)}
                  error={Boolean(errors.branchId)}
                >
                  <option value="">Select Branch</option>
                  {branches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Academic Year <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('academicYearId')}
                  value={watchedValues.academicYearId || ''}
                  onChange={(e) => setValue('academicYearId', e.target.value)}
                  error={Boolean(errors.academicYearId)}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((ay) => (
                    <option key={ay._id} value={ay._id}>
                      {ay.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Program <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('programId')}
                  value={watchedValues.programId || ''}
                  onChange={(e) => {
                    setValue('programId', e.target.value);
                    setValue('levelId', '');
                  }}
                  error={Boolean(errors.programId)}
                >
                  <option value="">Select Program</option>
                  {programs.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.nameEn} ({p.code})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Academic Level <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('levelId')}
                  value={watchedValues.levelId || ''}
                  onChange={(e) => setValue('levelId', e.target.value)}
                  error={Boolean(errors.levelId)}
                >
                  <option value="">Select Level</option>
                  {levels.map((l) => (
                    <option key={l._id} value={l._id}>
                      {l.name} ({l.code})
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Tuition Fee Title <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('feeName')}
                placeholder="e.g. Term 1 Standard Tuition"
                error={Boolean(errors.feeName)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Fee Code <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('feeCode')}
                placeholder="e.g. TF-GEP-BEG-T1"
                error={Boolean(errors.feeCode)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Amount <span className="text-rose-500">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                {...register('amount', { valueAsNumber: true })}
                min={0}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Currency</label>
              <Select
                {...register('currency')}
                value={watchedValues.currency || 'USD'}
                onChange={(e) => setValue('currency', e.target.value as 'USD' | 'KHR')}
              >
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Billing Cycle</label>
              <Select
                {...register('billingCycle')}
                value={watchedValues.billingCycle || 'term'}
                onChange={(e) =>
                  setValue(
                    'billingCycle',
                    e.target.value as 'monthly' | 'term' | 'semester' | 'annual',
                  )
                }
              >
                <option value="monthly">Monthly</option>
                <option value="term">Term</option>
                <option value="semester">Semester</option>
                <option value="annual">Annual</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Status</label>
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
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Description & Fee Inclusions
            </label>
            <Textarea
              {...register('description')}
              placeholder="Books included, uniform fees, laboratory levy..."
              rows={2}
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#023e8a] hover:bg-[#00509d]">
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Tuition Fee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
