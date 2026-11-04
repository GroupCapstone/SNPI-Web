import { z } from 'zod';

export const academicYearFormSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(2, 'Code must be at least 2 characters')
      .max(30, 'Code cannot exceed 30 characters'),
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot exceed 100 characters'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    isCurrent: z.boolean(),
    status: z.enum(['active', 'inactive', 'closed']),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: 'Start date must be before end date',
    path: ['endDate'],
  });

export type AcademicYearFormData = z.infer<typeof academicYearFormSchema>;
