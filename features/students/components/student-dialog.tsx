'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { StudentForm } from './student-form';
import type { Student } from '../types';

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  defaultBranchId?: string;
  onSuccess?: (student: Student) => void;
}

export const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSuccess,
}) => {
  const isEdit = Boolean(student);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader className="border-b pb-3">
          <DialogTitle className="text-lg font-bold">
            {isEdit ? 'Edit Student Master Profile' : 'Admit New Student'}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? 'Update student demographic information, birthplace, address, and emergency guardians.'
              : 'Register student personal identity, birthplace, current address, and multiple guardians.'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <StudentForm
            initialData={student}
            onSuccess={(s) => {
              if (onSuccess) onSuccess(s);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
