import { z } from 'zod';

const websiteSchema = z
  .string()
  .trim()
  .refine(
    (val) =>
      !val ||
      /^https?:\/\/.+/i.test(val) ||
      /^[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+/i.test(val),
    'Invalid website URL format',
  )
  .optional()
  .or(z.literal(''));

const emailSchema = z.string().trim().email('Invalid email address').optional().or(z.literal(''));

export const schoolFormSchema = z.object({
  code: z
    .string()
    .min(1, 'School code is required')
    .max(20, 'School code cannot exceed 20 characters')
    .trim()
    .toUpperCase(),
  nameEn: z.string().min(1, 'English name is required').trim(),
  nameKh: z.string().min(1, 'Khmer name is required').trim(),
  logo: z.string().optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
  email: emailSchema,
  address: z.string().trim().optional().or(z.literal('')),
  website: websiteSchema,
  status: z.enum(['active', 'inactive']),
});

export type SchoolFormData = z.infer<typeof schoolFormSchema>;
