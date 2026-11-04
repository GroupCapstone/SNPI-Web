'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, FileCheck, GraduationCap } from '@/components/icons';
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
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useRegistrationsQuery } from '@/features/registrations/hooks/use-registrations';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';

import {
  useCreatePlacementTestMutation,
  useUpdatePlacementTestMutation,
} from '../hooks/use-placement-tests';
import type { PlacementTestFormData } from '../schemas';
import { placementTestFormSchema } from '../schemas';
import type { PlacementTest } from '../types';

interface PlacementTestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placementTest?: PlacementTest | null;
  defaultBranchId?: string;
}

export const PlacementTestDialog = ({
  open,
  onOpenChange,
  placementTest,
  defaultBranchId,
}: PlacementTestDialogProps) => {
  const isEdit = Boolean(placementTest);
  const createMutation = useCreatePlacementTestMutation();
  const updateMutation = useUpdatePlacementTestMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const { data: schoolsData } = useSchoolsQuery({ limit: 50 });
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData?.data]);

  const {
    control,
    register,
    handleSubmit,

    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlacementTestFormData>({
    resolver: zodResolver(placementTestFormSchema),
    defaultValues: {
      testNumber: '',
      registrationId: '',
      studentId: '',
      studentName: '',
      schoolId: '',
      branchId: defaultBranchId || '',
      programId: '',
      recommendedLevelId: '',
      testDate: new Date().toISOString().split('T')[0],
      score: 0,
      maxScore: 100,
      examinerName: '',
      status: 'completed',
      comments: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedProgramId = watchedValues.programId;

  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 50,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: programsData } = useProgramsQuery({ limit: 50 });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);

  const { data: levelsData } = useLevelsQuery({
    programId: selectedProgramId || undefined,
    limit: 50,
  });
  const levels = React.useMemo(() => levelsData?.data ?? [], [levelsData?.data]);

  // Registrations awaiting placement in this branch
  const { data: pendingRegistrationsData } = useRegistrationsQuery({
    branchId: selectedBranchId || undefined,
    status: 'placement_pending',
    limit: 50,
  });
  const pendingRegistrations = React.useMemo(
    () => pendingRegistrationsData?.data ?? [],
    [pendingRegistrationsData?.data],
  );

  React.useEffect(() => {
    if (open) {
      setSubmitError(null);
      if (placementTest) {
        reset({
          testNumber: placementTest.testNumber,
          registrationId:
            typeof placementTest.registrationId === 'object'
              ? placementTest.registrationId._id
              : placementTest.registrationId || '',
          studentId:
            typeof placementTest.studentId === 'object'
              ? placementTest.studentId._id
              : placementTest.studentId || '',
          studentName: placementTest.studentName,
          schoolId:
            typeof placementTest.schoolId === 'object'
              ? placementTest.schoolId._id
              : placementTest.schoolId,
          branchId:
            typeof placementTest.branchId === 'object'
              ? placementTest.branchId._id
              : placementTest.branchId,
          programId:
            typeof placementTest.programId === 'object'
              ? placementTest.programId._id
              : placementTest.programId,
          recommendedLevelId:
            typeof placementTest.recommendedLevelId === 'object'
              ? placementTest.recommendedLevelId._id
              : placementTest.recommendedLevelId,
          testDate: placementTest.testDate
            ? new Date(placementTest.testDate).toISOString().split('T')[0]
            : '',
          score: placementTest.score,
          maxScore: placementTest.maxScore,
          examinerName: placementTest.examinerName || '',
          status: placementTest.status,
          comments: placementTest.comments || '',
        });
      } else {
        const defaultSchool = schools.length > 0 ? schools[0]._id : '';

        reset({
          testNumber: '',
          registrationId: '',
          studentId: '',
          studentName: '',
          schoolId: defaultSchool,
          branchId: defaultBranchId || '',
          programId: '',
          recommendedLevelId: '',
          testDate: new Date().toISOString().split('T')[0],
          score: 0,
          maxScore: 100,
          examinerName: '',
          status: 'completed',
          comments: '',
        });
      }
    }
  }, [open, placementTest, defaultBranchId, schools, reset]);

  const handleSelectRegistration = (regId: string) => {
    setValue('registrationId', regId);
    const found = pendingRegistrations.find((r) => r._id === regId);
    if (found) {
      setValue('studentName', `${found.firstName} ${found.lastName} (${found.khmerName})`);
      if (typeof found.programId === 'object' && found.programId !== null) {
        setValue('programId', found.programId._id);
      }
    }
  };

  const onSubmit = async (data: PlacementTestFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && placementTest) {
        await updateMutation.mutateAsync({
          id: placementTest._id,
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while saving the placement test';
      setSubmitError(errorMsg);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <FileCheck className="size-5 text-[#00509d]" />
            <span>
              {isEdit ? 'Edit Placement Test Result' : 'Record Placement Test Evaluation'}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? 'Update score evaluation or level placement recommendation.'
              : 'Assess prospective applicant academic ability and recommend level placement.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {!isEdit && pendingRegistrations.length > 0 && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">
              <label className="mb-1 block text-xs font-semibold text-[#00509d]">
                Link to Pending Admission Application (Optional)
              </label>
              <Select
                onChange={(e) => handleSelectRegistration(e.target.value)}
                disabled={isSubmitting}
                className="text-xs"
              >
                <option value="">-- Select from Registered Inquiries --</option>
                {pendingRegistrations.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.registrationNumber} — {r.firstName} {r.lastName} ({r.khmerName})
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                School Institution <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedSchoolId || ''}
                onChange={(e) => {
                  setValue('schoolId', e.target.value);
                  setValue('branchId', '');
                }}
                disabled={isSubmitting || schools.length <= 1}
              >
                <option value="">Select School</option>
                {schools.map((sch) => (
                  <option key={sch._id} value={sch._id}>
                    {sch.nameEn}
                  </option>
                ))}
              </Select>
              {errors.schoolId && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.schoolId.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Campus Branch <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('branchId')}
                value={watchedValues.branchId || ''}
                onChange={(e) => setValue('branchId', e.target.value)}
                disabled={isSubmitting || !selectedSchoolId}
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchNameEn} ({b.branchCode})
                  </option>
                ))}
              </Select>
              {errors.branchId && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.branchId.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Applicant / Student Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Bopha Kouy (គុយ បុប្ផា)"
                disabled={isSubmitting}
                {...register('studentName')}
              />
              {errors.studentName && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.studentName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Academic Program <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('programId')}
                value={watchedValues.programId || ''}
                onChange={(e) => {
                  setValue('programId', e.target.value);
                  setValue('recommendedLevelId', '');
                }}
                disabled={isSubmitting}
              >
                <option value="">Select Program</option>
                {programs.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nameEn} ({p.code})
                  </option>
                ))}
              </Select>
              {errors.programId && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.programId.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <GraduationCap className="size-4 text-[#00509d]" />
              <span>Assessment Scores & Level Recommendation</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Achieved Score <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.5"
                  disabled={isSubmitting}
                  {...register('score', { valueAsNumber: true })}
                />
                {errors.score && (
                  <p className="mt-1 text-xs font-medium text-rose-600">{errors.score.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Maximum Score <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  disabled={isSubmitting}
                  {...register('maxScore', { valueAsNumber: true })}
                />
                {errors.maxScore && (
                  <p className="mt-1 text-xs font-medium text-rose-600">
                    {errors.maxScore.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Recommended Level <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('recommendedLevelId')}
                  value={watchedValues.recommendedLevelId || ''}
                  onChange={(e) => setValue('recommendedLevelId', e.target.value)}
                  disabled={isSubmitting || !selectedProgramId}
                >
                  <option value="">Select Level</option>
                  {levels.map((lvl) => (
                    <option key={lvl._id} value={lvl._id}>
                      {lvl.name} ({lvl.code})
                    </option>
                  ))}
                </Select>
                {errors.recommendedLevelId && (
                  <p className="mt-1 text-xs font-medium text-rose-600">
                    {errors.recommendedLevelId.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Examiner Name</label>
              <Input
                placeholder="e.g. Teacher Dara"
                disabled={isSubmitting}
                {...register('examinerName')}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Evaluation Date <span className="text-red-500">*</span>
              </label>
              <Input type="date" disabled={isSubmitting} {...register('testDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Result Status <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'completed'}
                onChange={(e) =>
                  setValue(
                    'status',
                    e.target.value as 'scheduled' | 'completed' | 'passed' | 'failed',
                  )
                }
                disabled={isSubmitting}
              >
                <option value="completed">Completed</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="scheduled">Scheduled</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Examiner Comments & Feedback
            </label>
            <Textarea
              placeholder="e.g. Strong speaking and listening skills, recommended for GEP Level 2"
              rows={2}
              disabled={isSubmitting}
              {...register('comments')}
            />
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Placement Test' : 'Record Evaluation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
