import { z } from 'zod';

export const enrollmentFormSchema = z.object({
  enrollmentCode: z.string().trim().optional(),
  studentId: z.string().min(1, 'Student selection is required'),
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Campus Branch is required'),
  academicYearId: z.string().min(1, 'Academic Year is required'),
  programId: z.string().min(1, 'Academic Program is required'),
  levelId: z.string().min(1, 'Academic Level is required'),
  classId: z.string().min(1, 'Target Class is required'),
  enrollmentDate: z.string().min(1, 'Enrollment date is required'),
  status: z.enum(['enrolled', 'active', 'completed', 'suspended', 'dropped', 'transferred']),
  tuitionStatus: z.enum(['pending', 'partially_paid', 'paid', 'waived']),
  remarks: z.string().trim().max(500).optional(),
});

export type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>;
