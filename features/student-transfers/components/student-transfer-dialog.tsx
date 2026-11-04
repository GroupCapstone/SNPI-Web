'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRightLeft, Building2 } from '@/components/icons';
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
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';
import { useStudentsQuery } from '@/features/students/hooks/use-students';

import { useCreateStudentTransferMutation } from '../hooks/use-student-transfers';
import type { StudentTransferFormData } from '../schemas';
import { studentTransferFormSchema } from '../schemas';

interface StudentTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultBranchId?: string;
}

export const StudentTransferDialog = ({
  open,
  onOpenChange,
  defaultBranchId,
}: StudentTransferDialogProps) => {
  const createMutation = useCreateStudentTransferMutation();
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
  } = useForm<StudentTransferFormData>({
    resolver: zodResolver(studentTransferFormSchema),
    defaultValues: {
      transferNumber: '',
      studentId: '',
      fromSchoolId: '',
      toSchoolId: '',
      fromBranchId: defaultBranchId || '',
      toBranchId: '',
      fromClassId: '',
      toClassId: '',
      transferDate: new Date().toISOString().split('T')[0],
      reason: '',
      remarks: '',
    },
  });
  const watchedValues = useWatch({ control });

  const selectedFromSchoolId = watchedValues.fromSchoolId;
  const selectedFromBranchId = watchedValues.fromBranchId;
  const selectedToSchoolId = watchedValues.toSchoolId;
  const selectedToBranchId = watchedValues.toBranchId;

  const { data: fromBranchesData } = useBranchesQuery({
    schoolId: selectedFromSchoolId || undefined,
    limit: 50,
  });
  const fromBranches = React.useMemo(() => fromBranchesData?.data ?? [], [fromBranchesData?.data]);

  const { data: toBranchesData } = useBranchesQuery({
    schoolId: selectedToSchoolId || undefined,
    limit: 50,
  });
  const toBranches = React.useMemo(() => toBranchesData?.data ?? [], [toBranchesData?.data]);

  const { data: studentsData } = useStudentsQuery({
    branchId: selectedFromBranchId || undefined,
    limit: 100,
  });
  const students = React.useMemo(() => studentsData?.data ?? [], [studentsData?.data]);

  const { data: toClassesData } = useClassesQuery({
    branchId: selectedToBranchId || undefined,
    limit: 50,
  });
  const toClasses = React.useMemo(() => toClassesData?.data ?? [], [toClassesData?.data]);

  React.useEffect(() => {
    if (open) {
      setSubmitError(null);
      const defaultSchool = schools.length > 0 ? schools[0]._id : '';
      reset({
        transferNumber: '',
        studentId: '',
        fromSchoolId: defaultSchool,
        toSchoolId: defaultSchool,
        fromBranchId: defaultBranchId || '',
        toBranchId: '',
        fromClassId: '',
        toClassId: '',
        transferDate: new Date().toISOString().split('T')[0],
        reason: '',
        remarks: '',
      });
    }
  }, [open, defaultBranchId, schools, reset]);

  const onSubmit = async (data: StudentTransferFormData) => {
    try {
      setSubmitError(null);
      await createMutation.mutateAsync(data);
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while creating transfer request';
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
            <ArrowRightLeft className="size-5 text-[#00509d]" />
            <span>Initiate Inter-Branch Student Transfer</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Submit an official transfer request to relocate a student to a different campus branch.
          </DialogDescription>
        </DialogHeader>

        {submitError && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-5">
          {/* Source Information */}
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Building2 className="size-4 text-[#00509d]" />
              <span>Source Branch & Student</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  From School <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedFromSchoolId || ''}
                  onChange={(e) => {
                    setValue('fromSchoolId', e.target.value);
                    setValue('fromBranchId', '');
                    setValue('studentId', '');
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
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  From Branch <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedFromBranchId || ''}
                  onChange={(e) => {
                    setValue('fromBranchId', e.target.value);
                    setValue('studentId', '');
                  }}
                  disabled={isSubmitting}
                >
                  <option value="">Select Branch</option>
                  {fromBranches.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.branchNameEn} ({b.branchCode})
                    </option>
                  ))}
                </Select>
                {errors.fromBranchId && (
                  <p className="mt-1 text-xs text-red-600">{errors.fromBranchId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Student <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('studentId')}
                  value={watchedValues.studentId || ''}
                  onChange={(e) => setValue('studentId', e.target.value)}
                  disabled={isSubmitting || !selectedFromBranchId}
                >
                  <option value="">Select Student</option>
                  {students.map((stu) => (
                    <option key={stu._id} value={stu._id}>
                      {stu.firstName} {stu.lastName} ({stu.studentId})
                    </option>
                  ))}
                </Select>
                {errors.studentId && (
                  <p className="mt-1 text-xs text-red-600">{errors.studentId.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Destination Information */}
          <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/30 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00509d]">
              <ArrowRightLeft className="size-4" />
              <span>Destination Campus & Target Class</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  To School <span className="text-red-500">*</span>
                </label>
                <Select
                  value={selectedToSchoolId || ''}
                  onChange={(e) => {
                    setValue('toSchoolId', e.target.value);
                    setValue('toBranchId', '');
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
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  To Branch <span className="text-red-500">*</span>
                </label>
                <Select
                  {...register('toBranchId')}
                  value={watchedValues.toBranchId || ''}
                  onChange={(e) => setValue('toBranchId', e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Select Target Branch</option>
                  {toBranches
                    .filter((b) => b._id !== selectedFromBranchId)
                    .map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.branchNameEn} ({b.branchCode})
                      </option>
                    ))}
                </Select>
                {errors.toBranchId && (
                  <p className="mt-1 text-xs text-red-600">{errors.toBranchId.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">
                  Target Class (Optional)
                </label>
                <Select
                  {...register('toClassId')}
                  value={watchedValues.toClassId || ''}
                  onChange={(e) => setValue('toClassId', e.target.value)}
                  disabled={isSubmitting || !selectedToBranchId}
                >
                  <option value="">Assign Later Upon Review</option>
                  {toClasses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.className} ({c.classCode})
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Section 3: Reason & Date */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Effective Transfer Date <span className="text-red-500">*</span>
              </label>
              <Input type="date" disabled={isSubmitting} {...register('transferDate')} />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">
                Transfer Reason <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Relocated to Toul Kork branch area"
                disabled={isSubmitting}
                {...register('reason')}
              />
              {errors.reason && (
                <p className="mt-1 text-xs text-red-600">{errors.reason.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Remarks / Notes</label>
            <Textarea
              placeholder="e.g. Parent requested transfer before term start"
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
              {isSubmitting ? 'Submitting...' : 'Submit Transfer Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
