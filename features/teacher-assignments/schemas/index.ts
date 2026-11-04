import { z } from 'zod';

export const teacherAssignmentFormSchema = z
  .object({
    schoolId: z.string().min(1, 'School is required'),
    branchId: z.string().min(1, 'Campus Branch is required'),
    academicYearId: z.string().min(1, 'Academic Year is required'),
    employeeId: z.string().min(1, 'Teacher is required'),
    classId: z.string().min(1, 'Class is required'),
    subjectId: z.string().optional(),
    roleInClass: z.enum(['primary_teacher', 'assistant_teacher', 'subject_teacher']),
    status: z.enum(['active', 'inactive']),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    remarks: z.string().trim().max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: 'End date must be after or equal to start date',
      path: ['endDate'],
    },
  );

export type TeacherAssignmentFormData = z.infer<typeof teacherAssignmentFormSchema>;
