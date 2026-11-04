import { z } from 'zod';

export const levelFormSchema = z.object({
  programId: z.string().min(1, 'Program is required'),
  code: z
    .string()
    .min(1, 'Level code is required')
    .max(20, 'Level code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  name: z.string().min(1, 'Level name is required').trim(),
  description: z.string().optional(),
  sequence: z.number().int().min(1, 'Sequence must be at least 1'),
  status: z.enum(['active', 'inactive', 'archived']),
});

export type LevelFormData = z.infer<typeof levelFormSchema>;
