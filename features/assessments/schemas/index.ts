import { z } from 'zod';

export const assessmentFormSchema = z
  .object({
    schoolId: z.string().min(1, 'School is required'),
    branchId: z.string().min(1, 'Branch is required'),
    academicYearId: z.string().min(1, 'Academic year is required'),
    classId: z.string().min(1, 'Class is required'),
    subjectId: z.string().min(1, 'Subject is required'),
    name: z.string().min(1, 'Assessment name is required').trim(),
    code: z.string().min(1, 'Assessment code is required').trim().toUpperCase(),
    type: z.enum(['quiz', 'assignment', 'monthly_test', 'midterm', 'final']),
    maxScore: z.number().min(1, 'Max score must be at least 1'),
    passingScore: z.number().min(0, 'Passing score must be at least 0'),
    weightPercentage: z
      .number()
      .min(0, 'Weight percentage cannot be negative')
      .max(100, 'Weight percentage cannot exceed 100'),
    assessmentDate: z.string().min(1, 'Assessment date is required'),
    startTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional()
      .or(z.literal('')),
    endTime: z
      .string()
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
      .optional()
      .or(z.literal('')),
    classroomId: z.string().optional().or(z.literal('')),
    proctorIds: z.array(z.string()).optional(),
    seatCapacity: z.number().int().positive().optional(),
    description: z.string().trim().optional().or(z.literal('')),
    status: z.enum(['draft', 'published', 'closed']),
  })
  .superRefine((value, context) => {
    if (Boolean(value.startTime) !== Boolean(value.endTime)) {
      context.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'Start and end time must be provided together',
      });
    }
    if (value.startTime && value.endTime && value.startTime >= value.endTime) {
      context.addIssue({ code: 'custom', path: ['endTime'], message: 'End time must be later' });
    }
  });

export type AssessmentFormData = z.infer<typeof assessmentFormSchema>;
