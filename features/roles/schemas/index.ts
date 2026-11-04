import { z } from 'zod';

export const roleFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, 'Role code must be at least 2 characters')
    .max(50, 'Role code cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Role code can only contain alphanumeric characters, underscores, and hyphens',
    ),
  nameEn: z
    .string()
    .trim()
    .min(2, 'English role name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  nameKh: z.string().trim().max(100).optional().or(z.literal('')),
  description: z.string().trim().max(500).optional().or(z.literal('')),
  permissions: z.array(z.string()),
  status: z.enum(['active', 'inactive']),
});

export type RoleFormData = z.infer<typeof roleFormSchema>;
