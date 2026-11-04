'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, GraduationCap } from '@/components/icons';
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
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useSubjectsQuery } from '@/features/subjects/hooks/use-subjects';
import { getClassrooms, type ClassroomItem } from '@/features/classrooms/api/get-classrooms';
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';

import { useCreateAssessmentMutation, useUpdateAssessmentMutation } from '../hooks/use-assessments';
import type { AssessmentFormData } from '../schemas';
import { assessmentFormSchema } from '../schemas';
import type { Assessment } from '../types';

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessment?: Assessment | null;
}

export const AssessmentDialog = ({ open, onOpenChange, assessment }: AssessmentDialogProps) => {
  const isEdit = Boolean(assessment);
  const createMutation = useCreateAssessmentMutation();
  const updateMutation = useUpdateAssessmentMutation();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [classrooms, setClassrooms] = React.useState<ClassroomItem[]>([]);

  const { data: schoolsData } = useSchoolsQuery();
  const schools = React.useMemo(() => schoolsData?.data ?? [], [schoolsData]);

  const {
    control,
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: '',
      academicYearId: '',
      classId: '',
      subjectId: '',
      name: '',
      code: '',
      type: 'monthly_test',
      maxScore: 100,
      passingScore: 50,
      weightPercentage: 100,
      assessmentDate: new Date().toISOString().split('T')[0],
      description: '',
      startTime: '',
      endTime: '',
      classroomId: '',
      proctorIds: [],
      seatCapacity: undefined,
      status: 'draft',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const isFormalExam = watchedValues.type === 'midterm' || watchedValues.type === 'final';

  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears = React.useMemo<AcademicYearItem[]>(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: classesData } = useClassesQuery({
    branchId: selectedBranchId || undefined,
  });
  const classes = React.useMemo(() => classesData?.data ?? [], [classesData]);

  const { data: subjectsData } = useSubjectsQuery();
  const subjects = React.useMemo(() => subjectsData?.data ?? [], [subjectsData]);
  const { data: employeesData } = useEmployeesQuery(
    { branchId: selectedBranchId || undefined, status: 'active', limit: 100 },
    Boolean(selectedBranchId),
  );
  const employees = employeesData?.data ?? [];

  React.useEffect(() => {
    if (!selectedBranchId) {
      setClassrooms([]);
      return;
    }
    void getClassrooms(selectedBranchId)
      .then(setClassrooms)
      .catch(() => setClassrooms([]));
  }, [selectedBranchId]);

  React.useEffect(() => {
    if (!open) return;

    if (assessment) {
      reset({
        schoolId: assessment.schoolId,
        branchId:
          typeof assessment.branchId === 'object' ? assessment.branchId._id : assessment.branchId,
        academicYearId:
          typeof assessment.academicYearId === 'object'
            ? assessment.academicYearId._id
            : assessment.academicYearId,
        classId:
          typeof assessment.classId === 'object' ? assessment.classId._id : assessment.classId,
        subjectId:
          typeof assessment.subjectId === 'object'
            ? assessment.subjectId._id
            : assessment.subjectId,
        name: assessment.name,
        code: assessment.code,
        type: assessment.type,
        maxScore: assessment.maxScore,
        passingScore: assessment.passingScore,
        weightPercentage: assessment.weightPercentage,
        assessmentDate: assessment.assessmentDate
          ? new Date(assessment.assessmentDate).toISOString().split('T')[0]
          : '',
        startTime: assessment.startTime ?? '',
        endTime: assessment.endTime ?? '',
        classroomId:
          typeof assessment.classroomId === 'object'
            ? assessment.classroomId._id
            : (assessment.classroomId ?? ''),
        proctorIds: (assessment.proctorIds ?? []).map((proctor) =>
          typeof proctor === 'object' ? proctor._id : proctor,
        ),
        seatCapacity: assessment.seatCapacity,
        description: assessment.description ?? '',
        status: assessment.status,
      });
    } else {
      reset({
        schoolId: schools[0]?._id ?? '',
        branchId: '',
        academicYearId: academicYears[0]?._id ?? '',
        classId: '',
        subjectId: '',
        name: '',
        code: '',
        type: 'monthly_test',
        maxScore: 100,
        passingScore: 50,
        weightPercentage: 100,
        assessmentDate: new Date().toISOString().split('T')[0],
        description: '',
        startTime: '',
        endTime: '',
        classroomId: '',
        proctorIds: [],
        seatCapacity: undefined,
        status: 'draft',
      });
    }
  }, [open, assessment, reset, schools, academicYears]);

  React.useEffect(() => {
    if (!isEdit && selectedSchoolId && branches.length > 0 && !selectedBranchId) {
      setValue('branchId', branches[0]._id);
    }
  }, [isEdit, selectedSchoolId, branches, selectedBranchId, setValue]);

  const onSubmit = async (data: AssessmentFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && assessment) {
        await updateMutation.mutateAsync({ id: assessment._id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save assessment';
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
            {isEdit ? 'Edit Assessment / Exam' : 'Create New Assessment / Exam'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modify the test weights, passing threshold, and evaluation schedule.'
              : 'Setup a new quiz, monthly exam, midterm, or final test.'}
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
              <GraduationCap className="size-3.5" />
              <span>Campus & Academic Target</span>
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
                    setValue('classId', '');
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
                  onChange={(e) => {
                    setValue('branchId', e.target.value);
                    setValue('classId', '');
                  }}
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
                  Target Class <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('classId')}
                  value={watchedValues.classId || ''}
                  onChange={(e) => setValue('classId', e.target.value)}
                  error={Boolean(errors.classId)}
                >
                  <option value="">Select Class</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.className} ({c.classCode})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <Select
                  {...register('subjectId')}
                  value={watchedValues.subjectId || ''}
                  onChange={(e) => setValue('subjectId', e.target.value)}
                  error={Boolean(errors.subjectId)}
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Assessment Title <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('name')}
                placeholder="e.g. Midterm Comprehensive Exam"
                error={Boolean(errors.name)}
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Code <span className="text-rose-500">*</span>
              </label>
              <Input
                {...register('code')}
                placeholder="e.g. MID-T1-2026"
                error={Boolean(errors.code)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Type</label>
              <Select
                {...register('type')}
                value={watchedValues.type || 'monthly_test'}
                onChange={(e) =>
                  setValue(
                    'type',
                    e.target.value as 'quiz' | 'assignment' | 'monthly_test' | 'midterm' | 'final',
                  )
                }
              >
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="monthly_test">Monthly Test</option>
                <option value="midterm">Midterm Exam</option>
                <option value="final">Final Exam</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Max Score</label>
              <Input type="number" {...register('maxScore', { valueAsNumber: true })} min={1} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Passing Score</label>
              <Input type="number" {...register('passingScore', { valueAsNumber: true })} min={0} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Weight (%)</label>
              <Input
                type="number"
                {...register('weightPercentage', { valueAsNumber: true })}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Exam Date <span className="text-rose-500">*</span>
              </label>
              <Input type="date" {...register('assessmentDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Status</label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'published'}
                onChange={(e) =>
                  setValue('status', e.target.value as 'draft' | 'published' | 'closed')
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published (Active)</option>
                <option value="closed">Closed / Finalized</option>
              </Select>
            </div>
          </div>

          {isFormalExam && (
            <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3.5">
              <p className="mb-3 text-sm font-semibold text-blue-950">
                Exam Room, Time and Proctor Assignment
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Start Time
                  </label>
                  <Input type="time" {...register('startTime')} error={Boolean(errors.startTime)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    End Time
                  </label>
                  <Input type="time" {...register('endTime')} error={Boolean(errors.endTime)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Exam Room
                  </label>
                  <Select
                    {...register('classroomId')}
                    value={watchedValues.classroomId || ''}
                    onChange={(event) => setValue('classroomId', event.target.value)}
                  >
                    <option value="">Select Room</option>
                    {classrooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.code} - {room.name} ({room.capacity} seats)
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Seat Allocation
                  </label>
                  <Input
                    type="number"
                    min={1}
                    {...register('seatCapacity', {
                      setValueAs: (value) => (value === '' ? undefined : Number(value)),
                    })}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Proctors (hold Command/Ctrl to select multiple)
                </label>
                <select
                  multiple
                  value={watchedValues.proctorIds ?? []}
                  onChange={(event) =>
                    setValue(
                      'proctorIds',
                      Array.from(event.currentTarget.selectedOptions, (option) => option.value),
                    )
                  }
                  className="min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-5 text-slate-900"
                >
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.employeeId} - {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs leading-4 text-slate-500">
                  The server blocks room and proctor overlaps for the same date and time.
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Exam Instructions & Scope
            </label>
            <Textarea
              {...register('description')}
              placeholder="Covered chapters, materials allowed, scoring guidelines..."
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
              {isLoading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Assessment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
