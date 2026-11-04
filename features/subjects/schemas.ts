import { z } from 'zod';

export const subjectFormSchema = z.object({
  code: z
    .string()
    .min(1, 'Subject code is required')
    .max(20, 'Subject code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  name: z.string().min(1, 'Subject name is required').trim(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive', 'archived']),
});

export type SubjectFormData = z.infer<typeof subjectFormSchema>;
