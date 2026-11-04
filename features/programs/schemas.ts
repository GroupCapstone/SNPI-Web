import { z } from 'zod';

export const programFormSchema = z.object({
  code: z
    .string()
    .min(1, 'Program code is required')
    .max(20, 'Program code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  nameKh: z.string().min(1, 'Khmer name is required').trim(),
  nameEn: z.string().min(1, 'English name is required').trim(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'archived']),
});

export type ProgramFormData = z.infer<typeof programFormSchema>;
