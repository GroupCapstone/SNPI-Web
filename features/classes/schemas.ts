import { z } from 'zod';

export const classFormSchema = z
  .object({
    branchId: z.string().min(1, 'Branch is required'),
    academicYearId: z.string().min(1, 'Academic Year is required'),
    programId: z.string().min(1, 'Program is required'),
    levelId: z.string().min(1, 'Level is required'),
    curriculumId: z.string().optional(),
    classroomId: z.string().optional(),
    classCode: z
      .string()
      .min(1, 'Class code is required')
      .max(30, 'Class code cannot exceed 30 characters')
      .trim()
      .toUpperCase(),
    className: z.string().min(1, 'Class name is required').trim(),
    capacity: z.number().int().min(1, 'Capacity must be at least 1'),
    shift: z.enum(['morning', 'afternoon', 'evening', 'weekend', 'hourly', 'custom']),
    daysPattern: z.enum(['MON_FRI', 'MON_WED_FRI', 'TUE_THU_SAT', 'SAT_SUN', 'CUSTOM']),
    selectedDays: z.array(z.number().min(1).max(7)).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['planned', 'active', 'completed', 'cancelled']),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: 'Start date cannot be later than end date',
      path: ['endDate'],
    },
  );

export type ClassFormData = z.infer<typeof classFormSchema>;
