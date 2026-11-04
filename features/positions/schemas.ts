import { z } from 'zod';

export const positionFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Branch is required'),
  departmentId: z.string().min(1, 'Department is required'),
  code: z
    .string()
    .min(1, 'Position code is required')
    .max(20, 'Position code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  nameEn: z.string().min(1, 'English name is required').trim(),
  nameKh: z.string().min(1, 'Khmer name is required').trim(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export type PositionFormData = z.infer<typeof positionFormSchema>;
