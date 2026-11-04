'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, UserCheck } from '@/components/icons';
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
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useSubjectsQuery } from '@/features/subjects/hooks/use-subjects';

import {
  useCreateTeacherAssignmentMutation,
  useUpdateTeacherAssignmentMutation,
} from '../hooks/use-teacher-assignments';
import type { TeacherAssignmentFormData } from '../schemas';
import { teacherAssignmentFormSchema } from '../schemas';
import type { TeacherAssignment } from '../types';

interface TeacherAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment?: TeacherAssignment | null;
  defaultBranchId?: string;
}

export const TeacherAssignmentDialog = ({
  open,
  onOpenChange,
  assignment,
  defaultBranchId,
}: TeacherAssignmentDialogProps) => {
  const isEdit = Boolean(assignment);
  const createMutation = useCreateTeacherAssignmentMutation();
  const updateMutation = useUpdateTeacherAssignmentMutation();
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
  } = useForm<TeacherAssignmentFormData>({
    resolver: zodResolver(teacherAssignmentFormSchema),
    defaultValues: {
      schoolId: '',
      branchId: defaultBranchId || '',
      academicYearId: '',
      employeeId: '',
      classId: '',
      subjectId: '',
      roleInClass: 'subject_teacher',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      remarks: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedSchoolId = watchedValues.schoolId;
  const selectedBranchId = watchedValues.branchId;

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

  const { data: employeesData } = useEmployeesQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const employees = React.useMemo(() => employeesData?.data ?? [], [employeesData?.data]);

  const { data: classesData } = useClassesQuery({
    branchId: selectedBranchId || undefined,
    limit: 50,
  });
  const classes = React.useMemo(() => classesData?.data ?? [], [classesData?.data]);

  const { data: subjectsData } = useSubjectsQuery({ limit: 50 });
  const subjects = React.useMemo(() => subjectsData?.data ?? [], [subjectsData?.data]);

  React.useEffect(() => {
    if (open) {
      setSubmitError(null);
      if (assignment) {
        reset({
          schoolId:
            typeof assignment.schoolId === 'object' ? assignment.schoolId._id : assignment.schoolId,
          branchId:
            typeof assignment.branchId === 'object' ? assignment.branchId._id : assignment.branchId,
          academicYearId:
            typeof assignment.academicYearId === 'object'
              ? assignment.academicYearId._id
              : assignment.academicYearId,
          employeeId:
            typeof assignment.employeeId === 'object'
              ? assignment.employeeId._id
              : assignment.employeeId,
          classId:
            typeof assignment.classId === 'object' ? assignment.classId._id : assignment.classId,
          subjectId:
            typeof assignment.subjectId === 'object'
              ? assignment.subjectId?._id
              : assignment.subjectId || '',
          roleInClass: assignment.roleInClass,
          status: assignment.status,
          startDate: assignment.startDate
            ? new Date(assignment.startDate).toISOString().split('T')[0]
            : '',
          endDate: assignment.endDate
            ? new Date(assignment.endDate).toISOString().split('T')[0]
            : '',
          remarks: assignment.remarks || '',
        });
      } else {
        const defaultSchool = schools.length > 0 ? schools[0]._id : '';
        const currentYear =
          academicYears.find((y: AcademicYearItem) => y.isCurrent) || academicYears[0];

        reset({
          schoolId: defaultSchool,
          branchId: defaultBranchId || '',
          academicYearId: currentYear ? currentYear._id : '',
          employeeId: '',
          classId: '',
          subjectId: '',
          roleInClass: 'subject_teacher',
          status: 'active',
          startDate: new Date().toISOString().split('T')[0],
          endDate: '',
          remarks: '',
        });
      }
    }
  }, [open, assignment, defaultBranchId, schools, academicYears, reset]);

  const onSubmit = async (data: TeacherAssignmentFormData) => {
    try {
      setSubmitError(null);
      if (isEdit && assignment) {
        await updateMutation.mutateAsync({
          id: assignment._id,
          payload: data,
        });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while saving teacher assignment';
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
            <span>{isEdit ? 'Edit Teacher Assignment' : 'New Teacher Assignment'}</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? 'Modify class teaching role or assignment period.'
              : 'Assign a qualified instructor to a class roster and subject.'}
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Section 1: Campus Context */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                School <span className="text-red-500">*</span>
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

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('academicYearId')}
                value={watchedValues.academicYearId || ''}
                onChange={(e) => setValue('academicYearId', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select Year</option>
                {academicYears.map((ay: AcademicYearItem) => (
                  <option key={ay._id} value={ay._id}>
                    {ay.name} {ay.isCurrent ? '(Current)' : ''}
                  </option>
                ))}
              </Select>
              {errors.academicYearId && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.academicYearId.message}
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Teacher & Class */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Teacher / Instructor <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('employeeId')}
                value={watchedValues.employeeId || ''}
                onChange={(e) => setValue('employeeId', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select Teacher</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstName} {emp.lastName} ({emp.khmerName}) — {emp.employeeId}
                  </option>
                ))}
              </Select>
              {errors.employeeId && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Assigned Class <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('classId')}
                value={watchedValues.classId || ''}
                onChange={(e) => setValue('classId', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.className} ({c.classCode})
                  </option>
                ))}
              </Select>
              {errors.classId && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.classId.message}</p>
              )}
            </div>
          </div>

          {/* Section 3: Subject & Teaching Role */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Subject (Optional for Primary Homeroom)
              </label>
              <Select
                {...register('subjectId')}
                value={watchedValues.subjectId || ''}
                onChange={(e) => setValue('subjectId', e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">All Subjects / Homeroom Lead</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name} ({sub.code})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Teaching Role <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('roleInClass')}
                value={watchedValues.roleInClass || 'subject_teacher'}
                onChange={(e) =>
                  setValue(
                    'roleInClass',
                    e.target.value as 'primary_teacher' | 'assistant_teacher' | 'subject_teacher',
                  )
                }
                disabled={isSubmitting}
              >
                <option value="subject_teacher">Subject Teacher</option>
                <option value="primary_teacher">Primary Homeroom Teacher</option>
                <option value="assistant_teacher">Assistant Teacher</option>
              </Select>
            </div>
          </div>

          {/* Section 4: Schedule & Status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <Input type="date" disabled={isSubmitting} {...register('startDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">End Date</label>
              <Input type="date" disabled={isSubmitting} {...register('endDate')} />
              {errors.endDate && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.endDate.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Assignment Status <span className="text-red-500">*</span>
              </label>
              <Select
                {...register('status')}
                value={watchedValues.status || 'active'}
                onChange={(e) => setValue('status', e.target.value as 'active' | 'inactive')}
                disabled={isSubmitting}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Remarks / Notes</label>
            <Textarea
              placeholder="e.g. Lead instructor for morning sessions"
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
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Assignment' : 'Create Assignment'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
