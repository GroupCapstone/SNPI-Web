import { z } from 'zod';

export const branchFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  branchCode: z
    .string()
    .min(1, 'Branch code is required')
    .max(20, 'Branch code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  branchNameEn: z.string().min(1, 'English name is required').trim(),
  branchNameKh: z.string().min(1, 'Khmer name is required').trim(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  openingDate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'closed']),
});

export type BranchFormData = z.infer<typeof branchFormSchema>;
