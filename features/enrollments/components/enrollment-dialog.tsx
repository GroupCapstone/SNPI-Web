'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Building2, GraduationCap, UserCheck, Users } from '@/components/icons';
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
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useStudentsQuery } from '@/features/students/hooks/use-students';

import { useCreateEnrollmentMutation, useUpdateEnrollmentMutation } from '../hooks/use-enrollments';
import type { EnrollmentFormData } from '../schemas';
import { enrollmentFormSchema } from '../schemas';
import type { Enrollment } from '../types';

interface EnrollmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enrollment?: Enrollment | null;
  defaultBranchId?: string;
  defaultClassId?: string;
}

export const EnrollmentDialog = ({
  open,
  onOpenChange,
  enrollment,
  defaultBranchId,
  defaultClassId,
}: EnrollmentDialogProps) => {
  const isEdit = Boolean(enrollment);
  const createMutation = useCreateEnrollmentMutation();
  const updateMutation = useUpdateEnrollmentMutation();
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
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      enrollmentCode: '',
      studentId: '',
      schoolId: '',
      branchId: defaultBranchId || '',
      academicYearId: '',
      programId: '',
      levelId: '',
      classId: defaultClassId || '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active',
      tuitionStatus: 'pending',
      remarks: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;
  const selectedProgramId = watchedValues.programId;
  const selectedLevelId = watchedValues.levelId;

  // Cascading queries
  const { data: branchesData } = useBranchesQuery({
    schoolId: selectedSchoolId || undefined,
    limit: 50,
  });
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: academicYearsData } = useAcademicYearsQuery();
  const academicYears: AcademicYearItem[] = React.useMemo(
    () => (Array.isArray(academicYearsData) ? academicYearsData : []),
    [academicYearsData],
  );

  const { data: programsData } = useProgramsQuery({
    limit: 50,
  });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);

  const { data: levelsData } = useLevelsQuery({
    programId: selectedProgramId || undefined,
    limit: 50,
  });
  const levels = React.useMemo(() => levelsData?.data ?? [], [levelsData?.data]);

  const { data: classesData } = useClassesQuery({
    branchId: selectedBranchId || undefined,
    programId: selectedProgramId || undefined,
    levelId: selectedLevelId || undefined,
    limit: 50,
  });
  const classes = React.useMemo(() => classesData?.data ?? [], [classesData?.data]);

  // Students for selection
  const { data: studentsData } = useStudentsQuery({
    branchId: selectedBranchId || undefined,
    status: 'active',
    limit: 100,
  });
  const students = React.useMemo(() => studentsData?.data ?? [], [studentsData?.data]);

  // Set default school & active academic year on open
  React.useEffect(() => {
    if (open) {
      setSubmitError(null);
      if (enrollment) {
        reset({
          enrollmentCode: enrollment.enrollmentCode,
          studentId:
            typeof enrollment.studentId === 'object'
              ? enrollment.studentId._id
              : enrollment.studentId,
          schoolId:
            typeof enrollment.schoolId === 'object' ? enrollment.schoolId._id : enrollment.schoolId,
          branchId:
            typeof enrollment.branchId === 'object' ? enrollment.branchId._id : enrollment.branchId,
          academicYearId:
            typeof enrollment.academicYearId === 'object'
              ? enrollment.academicYearId._id
              : enrollment.academicYearId,
          programId:
            typeof enrollment.programId === 'object'
              ? enrollment.programId._id
              : enrollment.programId,
          levelId:
            typeof enrollment.levelId === 'object' ? enrollment.levelId._id : enrollment.levelId,
          classId:
            typeof enrollment.classId === 'object' ? enrollment.classId._id : enrollment.classId,
          enrollmentDate: enrollment.enrollmentDate
            ? new Date(enrollment.enrollmentDate).toISOString().split('T')[0]
            : '',
          status: enrollment.status,
          tuitionStatus: enrollment.tuitionStatus,
          remarks: enrollment.remarks || '',
        });
      } else {
        const defaultSchool = schools.length > 0 ? schools[0]._id : '';
        const currentYear =
          academicYears.find((y: AcademicYearItem) => y.isCurrent) || academicYears[0];

        reset({
          enrollmentCode: '',
          studentId: '',
          schoolId: defaultSchool,
          branchId: defaultBranchId || '',
          academicYearId: currentYear ? currentYear._id : '',
          programId: '',
          levelId: '',
          classId: defaultClassId || '',
          enrollmentDate: new Date().toISOString().split('T')[0],
          status: 'active',
          tuitionStatus: 'pending',
          remarks: '',
        });
      }
    }
  }, [open, enrollment, defaultBranchId, defaultClassId, schools, academicYears, reset]);

  const onSubmit = async (data: EnrollmentFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && enrollment) {
        await updateMutation.mutateAsync({
          id: enrollment._id,
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while saving the enrollment record';
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
            <UserCheck className="size-5 text-[#00509d]" />
            <span>{isEdit ? 'Edit Student Enrollment' : 'Enroll Student into Class'}</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? 'Update student class enrollment, academic year binding, or tuition status.'
              : 'Bind an admitted student to an Academic Year, Program, Level, and specific Class roster.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Campus & Academic Year Context */}
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Building2 className="size-4 text-[#00509d]" />
              <span>Campus & Academic Year</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  School Institution <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedSchoolId || ''}
                  onChange={(e) => {
                    setValue('schoolId', e.target.value);
                    setValue('branchId', '');
                    setValue('academicYearId', '');
                    setValue('programId', '');
                    setValue('levelId', '');
                    setValue('classId', '');
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
                  <p className="mt-1 text-xs text-red-600">{errors.schoolId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Campus Branch <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedBranchId || ''}
                  onChange={(e) => {
                    setValue('branchId', e.target.value);
                    setValue('classId', '');
                  }}
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
                  <p className="mt-1 text-xs text-red-600">{errors.branchId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('academicYearId')}
                  value={watchedValues.academicYearId || ''}
                  onChange={(e) => setValue('academicYearId', e.target.value)}
                  disabled={isSubmitting || !selectedSchoolId}
                >
                  <option value="">Select Academic Year</option>
                  {academicYears.map((ay: AcademicYearItem) => (
                    <option key={ay._id} value={ay._id}>
                      {ay.name} {ay.isCurrent ? '(Current)' : ''}
                    </option>
                  ))}
                </Select>
                {errors.academicYearId && (
                  <p className="mt-1 text-xs text-red-600">{errors.academicYearId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Student Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Users className="size-4 text-[#00509d]" />
              <span>Target Student</span>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Select Admitted Student <span className="text-red-500">*</span>
              </label>
              {isEdit && enrollment ? (
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs">
                  <span className="font-mono font-bold text-[#00509d]">
                    {enrollment.studentId.studentId}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {enrollment.studentId.firstName} {enrollment.studentId.lastName}
                  </span>
                  <span className="text-slate-500">({enrollment.studentId.khmerName})</span>
                </div>
              ) : (
                <Select
                  {...register('studentId')}
                  value={watchedValues.studentId || ''}
                  onChange={(e) => setValue('studentId', e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Choose student from directory...</option>
                  {students.map((stu) => (
                    <option key={stu._id} value={stu._id}>
                      {stu.studentId} — {stu.firstName} {stu.lastName} ({stu.khmerName})
                    </option>
                  ))}
                </Select>
              )}
              {errors.studentId && (
                <p className="mt-1 text-xs text-red-600">{errors.studentId.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Academic Program, Level & Class Placement */}
          <div className="space-y-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <GraduationCap className="size-4 text-[#00509d]" />
              <span>Academic Curriculum & Class Placement</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Program <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedProgramId || ''}
                  onChange={(e) => {
                    setValue('programId', e.target.value);
                    setValue('levelId', '');
                    setValue('classId', '');
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
                  <p className="mt-1 text-xs text-red-600">{errors.programId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Level <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedLevelId || ''}
                  onChange={(e) => {
                    setValue('levelId', e.target.value);
                    setValue('classId', '');
                  }}
                  disabled={isSubmitting || !selectedProgramId}
                >
                  <option value="">Select Level</option>
                  {levels.map((lvl) => (
                    <option key={lvl._id} value={lvl._id}>
                      {lvl.name} ({lvl.code})
                    </option>
                  ))}
                </Select>
                {errors.levelId && (
                  <p className="mt-1 text-xs text-red-600">{errors.levelId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Target Class Roster <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('classId')}
                  value={watchedValues.classId || ''}
                  onChange={(e) => setValue('classId', e.target.value)}
                  disabled={isSubmitting || !selectedLevelId}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls._id} value={cls._id}>
                      {cls.className} {cls.capacity ? `[Max: ${cls.capacity}]` : ''}
                    </option>
                  ))}
                </Select>
                {errors.classId && (
                  <p className="mt-1 text-xs text-red-600">{errors.classId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Enrollment Date, Status, & Tuition */}
          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Enrollment Date <span className="text-red-500">*</span>
              </label>
              <Input type="date" disabled={isSubmitting} {...register('enrollmentDate')} />
              {errors.enrollmentDate && (
                <p className="mt-1 text-xs text-red-600">{errors.enrollmentDate.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Enrollment Status <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'active'}
                onChange={(e) =>
                  setValue(
                    'status',
                    e.target.value as
                      'active' | 'enrolled' | 'completed' | 'suspended' | 'dropped' | 'transferred',
                  )
                }
                disabled={isSubmitting}
              >
                <option value="active">Active</option>
                <option value="enrolled">Enrolled</option>
                <option value="completed">Completed</option>
                <option value="suspended">Suspended</option>
                <option value="dropped">Dropped</option>
                <option value="transferred">Transferred</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Tuition Payment Status
              </label>
              <Select
                {...register('tuitionStatus')}
                value={watchedValues.tuitionStatus || 'pending'}
                onChange={(e) =>
                  setValue(
                    'tuitionStatus',
                    e.target.value as 'pending' | 'partially_paid' | 'paid' | 'waived',
                  )
                }
                disabled={isSubmitting}
              >
                <option value="pending">Pending</option>
                <option value="partially_paid">Partially Paid</option>
                <option value="paid">Fully Paid</option>
                <option value="waived">Waived / Scholarship</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Enrollment Remarks / Notes
            </label>
            <Textarea
              placeholder="e.g. Transferred from Main Campus, approved scholarship, placement test score 88%"
              rows={2}
              disabled={isSubmitting}
              {...register('remarks')}
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
              {isSubmitting
                ? 'Saving Enrollment...'
                : isEdit
                  ? 'Update Enrollment'
                  : 'Enroll Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
