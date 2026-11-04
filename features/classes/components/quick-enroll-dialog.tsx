'use client';

import * as React from 'react';
import { AlertCircle, CheckCircle2, Plus, UserPlus } from '@/components/icons';

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
import { useCreateEnrollmentMutation } from '@/features/enrollments/hooks/use-enrollments';
import { useStudentsQuery } from '@/features/students/hooks/use-students';
import { useTranslation } from '@/lib/i18n';
import type { ClassItem } from '../types';

interface QuickEnrollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classItem: ClassItem;
  enrolledStudentIds?: string[];
  onEnrolled?: () => void;
}

export const QuickEnrollDialog = ({
  open,
  onOpenChange,
  classItem,
  enrolledStudentIds = [],
  onEnrolled,
}: QuickEnrollDialogProps) => {
  const { t } = useTranslation();
  const qe = t.classes.quickEnroll;

  const [selectedStudentId, setSelectedStudentId] = React.useState('');
  const [enrollmentDate, setEnrollmentDate] = React.useState(
    new Date().toISOString().substring(0, 10),
  );
  const [tuitionStatus, setTuitionStatus] = React.useState<
    'pending' | 'partially_paid' | 'paid' | 'waived'
  >('pending');
  const [remarks, setRemarks] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const branchId =
    typeof classItem.branchId === 'object' && classItem.branchId !== null
      ? classItem.branchId._id
      : String(classItem.branchId);

  const academicYearId =
    typeof classItem.academicYearId === 'object' && classItem.academicYearId !== null
      ? classItem.academicYearId._id
      : String(classItem.academicYearId);

  const programId =
    typeof classItem.programId === 'object' && classItem.programId !== null
      ? classItem.programId._id
      : String(classItem.programId);

  const levelId =
    typeof classItem.levelId === 'object' && classItem.levelId !== null
      ? classItem.levelId._id
      : String(classItem.levelId);

  const { data: studentsData, isLoading: isLoadingStudents } = useStudentsQuery(
    {
      branchId,
      status: 'active',
      limit: 100,
    },
    open,
  );

  const students = studentsData?.data ?? [];

  // Filter out students already enrolled in this class
  const availableStudents = React.useMemo(() => {
    return students.filter((s) => !enrolledStudentIds.includes(s._id));
  }, [students, enrolledStudentIds]);

  const createEnrollmentMutation = useCreateEnrollmentMutation();

  const handleClose = () => {
    setSelectedStudentId('');
    setError(null);
    setSuccessMsg(null);
    setRemarks('');
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setError(qe.selectStudentPrompt);
      return;
    }

    try {
      setError(null);
      await createEnrollmentMutation.mutateAsync({
        studentId: selectedStudentId,
        schoolId: (classItem as unknown as { schoolId?: string }).schoolId || '',
        branchId,
        academicYearId,
        programId,
        levelId,
        classId: classItem._id,
        enrollmentDate,
        status: 'active',
        tuitionStatus,
        remarks: remarks.trim() || undefined,
      });

      setSuccessMsg(qe.successMsg);
      if (onEnrolled) onEnrolled();
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to enroll student';
      setError(msg);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="size-5.5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">{qe.title}</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {qe.subtitle}{' '}
                <span className="font-semibold text-[#00509d]">{classItem.className}</span> (
                {classItem.classCode})
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              {qe.selectStudent} <span className="text-rose-500">*</span>
            </label>
            <Select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              disabled={isLoadingStudents}
              className="text-xs"
            >
              <option value="">
                {isLoadingStudents
                  ? qe.loadingStudents
                  : availableStudents.length === 0
                    ? qe.noAvailableStudents
                    : qe.selectStudentPrompt}
              </option>
              {availableStudents.map((s) => (
                <option key={s._id} value={s._id}>
                  [{s.studentId}] {s.firstName} {s.lastName} {s.khmerName ? `(${s.khmerName})` : ''}{' '}
                  · {s.gender}
                </option>
              ))}
            </Select>
            <p className="mt-1 text-xs text-slate-500">{qe.studentHelp}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                {qe.enrollmentDate} <span className="text-rose-500">*</span>
              </label>
              <Input
                type="date"
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
                className="h-9 text-xs"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                {qe.tuitionStatus} <span className="text-rose-500">*</span>
              </label>
              <Select
                value={tuitionStatus}
                onChange={(e) => setTuitionStatus(e.target.value as typeof tuitionStatus)}
                className="h-9 text-xs"
              >
                <option value="pending">{qe.pending}</option>
                <option value="partially_paid">{qe.partiallyPaid}</option>
                <option value="paid">{qe.paid}</option>
                <option value="waived">{qe.waived}</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">{qe.remarks}</label>
            <Input
              placeholder={qe.remarksPlaceholder}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={createEnrollmentMutation.isPending}
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-[#023e8a] hover:bg-[#00509d]"
              disabled={createEnrollmentMutation.isPending || !selectedStudentId}
            >
              <Plus className="mr-1.5 size-4" />
              {createEnrollmentMutation.isPending ? qe.enrolling : qe.confirmEnrollment}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
