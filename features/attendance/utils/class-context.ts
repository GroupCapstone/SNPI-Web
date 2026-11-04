import type { AuthUser } from '@/features/auth/types';
import type { ClassItem } from '@/features/classes/types';

import type { MarkAttendancePayload } from '../types';

export const getReferenceId = (value: string | { _id: string } | null | undefined): string =>
  typeof value === 'string' ? value : (value?._id ?? '');

export const getAttendanceClassContext = (
  school: AuthUser['schoolId'] | undefined,
  selectedClass: ClassItem | undefined,
): Pick<MarkAttendancePayload, 'schoolId' | 'branchId' | 'academicYearId' | 'classId'> | null => {
  const schoolId = getReferenceId(school);
  const branchId = getReferenceId(selectedClass?.branchId);
  const academicYearId = getReferenceId(selectedClass?.academicYearId);
  if (!schoolId || !branchId || !academicYearId || !selectedClass?._id) return null;
  return { schoolId, branchId, academicYearId, classId: selectedClass._id };
};
