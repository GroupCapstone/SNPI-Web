import { z } from 'zod';

export const attendanceLeaveFormSchema = z
  .object({
    enrollmentId: z.string().min(1, 'Enrollment is required'),
    leaveType: z.enum(['medical', 'family', 'personal', 'school_activity', 'other']),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    reason: z.string().trim().min(3, 'Reason must contain at least 3 characters').max(1000),
    documentUrl: z.string().url('Document link must be a valid URL').optional().or(z.literal('')),
    documentName: z.string().trim().max(255).optional(),
  })
  .refine((value) => value.startDate <= value.endDate, {
    path: ['endDate'],
    message: 'End date cannot be before start date',
  });

export type AttendanceLeaveFormInput = z.infer<typeof attendanceLeaveFormSchema>;
