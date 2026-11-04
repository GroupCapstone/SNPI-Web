'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Plus, Trash2 } from '@/components/icons';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

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
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useSubjectsQuery } from '@/features/subjects/hooks/use-subjects';

import { useCreateCurriculumMutation, useUpdateCurriculumMutation } from '../hooks/use-curriculum';
import type { CurriculumFormValues } from '../schemas';
import { curriculumFormSchema } from '../schemas';
import type { Curriculum } from '../types';

interface CurriculumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curriculum?: Curriculum | null;
}

export const CurriculumDialog = ({ open, onOpenChange, curriculum }: CurriculumDialogProps) => {
  const isEdit = Boolean(curriculum);
  const createMutation = useCreateCurriculumMutation();
  const updateMutation = useUpdateCurriculumMutation();

  const { data: programsData } = useProgramsQuery({ limit: 100 });
  const { data: levelsData } = useLevelsQuery({ limit: 100 });
  const { data: academicYears = [] } = useAcademicYearsQuery();
  const { data: subjectsData } = useSubjectsQuery({ limit: 100 });

  const programs = programsData?.data ?? [];
  const allLevels = levelsData?.data ?? [];
  const subjects = subjectsData?.data ?? [];

  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumFormSchema),
    defaultValues: {
      programId: '',
      levelId: '',
      academicYearId: '',
      code: '',
      name: '',
      description: '',
      status: 'active',
      subjects: [
        {
          subjectId: '',
          weeklyHours: 3,
          totalHours: 45,
          sequence: 1,
          passingScore: 50,
          isRequired: true,
        },
      ],
    },
  });
  const watchedValues = useWatch({ control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subjects',
  });

  const selectedProgramId = watchedValues.programId;

  // Filter levels cascading by selected program
  const filteredLevels = React.useMemo(() => {
    if (!selectedProgramId) return [];
    return allLevels.filter((lvl) => {
      const pId = typeof lvl.programId === 'object' ? lvl.programId._id : lvl.programId;
      return String(pId) === String(selectedProgramId);
    });
  }, [allLevels, selectedProgramId]);

  React.useEffect(() => {
    if (!open) return;
    setSubmitError(null);

    if (curriculum) {
      const pId =
        typeof curriculum.programId === 'object' ? curriculum.programId._id : curriculum.programId;
      const lId =
        typeof curriculum.levelId === 'object' ? curriculum.levelId._id : curriculum.levelId;
      const ayId =
        typeof curriculum.academicYearId === 'object'
          ? curriculum.academicYearId._id
          : curriculum.academicYearId;

      reset({
        programId: pId,
        levelId: lId,
        academicYearId: ayId,
        code: curriculum.code,
        name: curriculum.name,
        description: curriculum.description ?? '',
        status: curriculum.status,
        subjects: (curriculum.subjects ?? []).map((s, idx) => ({
          subjectId: typeof s.subjectId === 'object' ? s.subjectId._id : s.subjectId,
          weeklyHours: s.weeklyHours ?? 3,
          totalHours: s.totalHours ?? 45,
          sequence: s.sequence ?? idx + 1,
          passingScore: s.passingScore ?? 50,
          isRequired: s.isRequired ?? true,
        })),
      });
    } else {
      const currentYear = academicYears.find((y) => y.isCurrent);
      reset({
        programId: programs[0]?._id ?? '',
        levelId: '',
        academicYearId: currentYear?._id ?? academicYears[0]?._id ?? '',
        code: '',
        name: '',
        description: '',
        status: 'active',
        subjects: [
          {
            subjectId: subjects[0]?._id ?? '',
            weeklyHours: 3,
            totalHours: 45,
            sequence: 1,
            passingScore: 50,
            isRequired: true,
          },
        ],
      });
    }
  }, [open, curriculum, reset, academicYears, programs, subjects]);

  const onSubmit = async (data: CurriculumFormValues) => {
    try {
      setSubmitError(null);
      if (isEdit && curriculum) {
        await updateMutation.mutateAsync({ id: curriculum._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save curriculum blueprint';
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
      <DialogContent
        className="max-h-[90vh] max-w-4xl overflow-y-auto"
        onClose={() => onOpenChange(false)}
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Curriculum' : 'Create New Curriculum'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify the syllabus structure and subject allocation for this level.'
              : 'Construct a program-level curriculum blueprint and allocate standard subject hours.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-6">
          {/* Section 1: Academic Scope & Hierarchy */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h4 className="text-xs font-bold tracking-normal text-slate-600 uppercase">
              1. Academic Scope & Binding
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Program *</label>
                <Select
                  {...register('programId')}
                  value={watchedValues.programId || ''}
                  onChange={(e) => {
                    setValue('programId', e.target.value);
                    setValue('levelId', '');
                  }}
                  disabled={isEdit}
                  error={Boolean(errors.programId)}
                >
                  <option value="">Select Program</option>
                  {programs.map((prog) => (
                    <option key={prog._id} value={prog._id}>
                      {prog.nameEn} ({prog.code})
                    </option>
                  ))}
                </Select>
                {errors.programId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.programId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Level *</label>
                <Select
                  {...register('levelId')}
                  value={watchedValues.levelId || ''}
                  onChange={(e) => setValue('levelId', e.target.value)}
                  disabled={isEdit || !selectedProgramId}
                  error={Boolean(errors.levelId)}
                >
                  <option value="">Select Level</option>
                  {filteredLevels.map((lvl) => (
                    <option key={lvl._id} value={lvl._id}>
                      {lvl.name} ({lvl.code})
                    </option>
                  ))}
                </Select>
                {errors.levelId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.levelId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Academic Year *
                </label>
                <Select
                  {...register('academicYearId')}
                  value={watchedValues.academicYearId || ''}
                  onChange={(e) => setValue('academicYearId', e.target.value)}
                  disabled={isEdit}
                  error={Boolean(errors.academicYearId)}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((year) => (
                    <option key={year._id} value={year._id}>
                      {year.name} ({year.code}){year.isCurrent ? ' • Current' : ''}
                    </option>
                  ))}
                </Select>
                {errors.academicYearId && (
                  <p className="mt-1 text-xs text-rose-600">{errors.academicYearId.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Curriculum Code *
                </label>
                <Input
                  {...register('code')}
                  placeholder="e.g. CURR-ENG-ELEM-2026"
                  error={Boolean(errors.code)}
                  disabled={isEdit}
                />
                {errors.code && <p className="mt-1 text-xs text-rose-600">{errors.code.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Curriculum Title *
                </label>
                <Input
                  {...register('name')}
                  placeholder="e.g. English Elementary Standard Syllabus"
                  error={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Description
                </label>
                <Textarea
                  {...register('description')}
                  placeholder="Overview of curriculum objectives and teaching methodology..."
                  rows={2}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Status</label>
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
            </div>
          </div>

          {/* Section 2: Subject Breakdown & Syllabus Allocation */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold tracking-normal text-slate-700 uppercase">
                  2. Subject Breakdown & Credit Hours ({fields.length} Subjects)
                </h4>
                <p className="text-xs text-slate-500">
                  Allocate subjects from the catalog, weekly instructional hours, and total contact
                  hours.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    subjectId: subjects[0]?._id ?? '',
                    weeklyHours: 3,
                    totalHours: 45,
                    sequence: fields.length + 1,
                    passingScore: 50,
                    isRequired: true,
                  })
                }
                className="border-[#023e8a]/20 text-[#023e8a] hover:bg-[#023e8a]/5"
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Add Subject
              </Button>
            </div>

            {errors.subjects?.message && (
              <p className="text-xs font-semibold text-rose-600">{errors.subjects.message}</p>
            )}

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/40 p-3 sm:flex-row sm:items-center"
                >
                  <div className="w-12 text-center">
                    <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
                  </div>

                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Subject *
                    </label>
                    <Select
                      {...register(`subjects.${index}.subjectId` as const)}
                      error={Boolean(errors.subjects?.[index]?.subjectId)}
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name} ({sub.code})
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="w-24">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Hrs / Wk
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      {...register(`subjects.${index}.weeklyHours` as const, {
                        valueAsNumber: true,
                      })}
                      error={Boolean(errors.subjects?.[index]?.weeklyHours)}
                    />
                  </div>

                  <div className="w-24">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Total Hrs
                    </label>
                    <Input
                      type="number"
                      {...register(`subjects.${index}.totalHours` as const, {
                        valueAsNumber: true,
                      })}
                      error={Boolean(errors.subjects?.[index]?.totalHours)}
                    />
                  </div>

                  <div className="w-24">
                    <label className="mb-1 block text-xs font-semibold text-slate-700">
                      Pass Score
                    </label>
                    <Input
                      type="number"
                      {...register(`subjects.${index}.passingScore` as const, {
                        valueAsNumber: true,
                      })}
                      error={Boolean(errors.subjects?.[index]?.passingScore)}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 sm:pt-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length <= 1}
                      className="text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
            >
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Curriculum'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
