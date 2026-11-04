import { z } from 'zod';

export const departmentFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Branch is required'),
  code: z
    .string()
    .min(1, 'Department code is required')
    .max(20, 'Department code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  nameEn: z.string().min(1, 'English name is required').trim(),
  nameKh: z.string().min(1, 'Khmer name is required').trim(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']),
});

export type DepartmentFormData = z.infer<typeof departmentFormSchema>;
