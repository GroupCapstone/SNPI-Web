import { z } from 'zod';

const phoneRegex = /^(\+855|0)[0-9]{8,9}$/;

export const registrationFormSchema = z.object({
  registrationNumber: z.string().trim().optional(),
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Campus Branch is required'),
  academicYearId: z.string().min(1, 'Academic Year is required'),
  programId: z.string().min(1, 'Program is required'),
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  khmerName: z.string().trim().min(1, 'Khmer name is required').max(100),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phone: z.string().trim().regex(phoneRegex, 'Invalid Cambodian phone number (e.g. 012345678)'),
  email: z.string().trim().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().trim().max(300).optional(),
  guardianName: z.string().trim().min(1, 'Guardian name is required').max(100),
  guardianRelationship: z.string().trim().min(1, 'Relationship is required'),
  guardianPhone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Invalid guardian phone number (e.g. 012345678)'),
  status: z.enum([
    'draft',
    'registered',
    'placement_pending',
    'placement_completed',
    'enrollment_pending',
    'enrolled',
    'cancelled',
  ]),
  registrationDate: z.string().min(1, 'Registration date is required'),
  remarks: z.string().trim().max(500).optional(),
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
