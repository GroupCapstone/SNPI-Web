import { z } from 'zod';

export const userFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  employeeId: z.string().optional().or(z.literal('')),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      'Username can only contain alphanumeric characters, dots, underscores, and hyphens',
    ),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().optional().or(z.literal('')),
  roles: z.array(z.string()).min(1, 'At least one role must be selected'),
  branchAccessType: z.enum(['all', 'custom']),
  branchAccess: z.array(z.string()).optional(),
  departmentAccessType: z.enum(['all', 'custom']),
  departmentAccess: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'locked']),
});

export type UserFormData = z.infer<typeof userFormSchema>;
