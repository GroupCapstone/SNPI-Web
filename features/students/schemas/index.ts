import { z } from 'zod';

export const guardianFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Guardian full name must be at least 2 characters'),
  khmerName: z.string().trim().optional(),
  relationship: z.enum(['father', 'mother', 'guardian', 'other']),
  phone: z.string().trim().min(6, 'Valid contact phone number is required'),
  email: z.string().trim().email('Invalid email address').optional().or(z.literal('')),
  occupation: z.string().trim().optional(),
  address: z.string().trim().optional(),
  isPrimary: z.boolean(),
  isEmergencyContact: z.boolean(),
});

export const birthplaceFormSchema = z.object({
  province: z.string().trim().optional(),
  district: z.string().trim().optional(),
  commune: z.string().trim().optional(),
  village: z.string().trim().optional(),
});

export const currentAddressFormSchema = z.object({
  province: z.string().trim().optional(),
  district: z.string().trim().optional(),
  commune: z.string().trim().optional(),
  village: z.string().trim().optional(),
  street: z.string().trim().optional(),
  houseNumber: z.string().trim().optional(),
  sameAsBirthplace: z.boolean().default(false),
});

export const studentFormSchema = z.object({
  studentId: z.string().trim().optional(),
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Campus Branch is required'),
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  khmerName: z.string().trim().min(1, 'Khmer name is required').max(150),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string().trim().optional(),
  birthplace: birthplaceFormSchema.optional(),
  nationality: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().trim().optional(),
  currentAddress: currentAddressFormSchema.optional(),
  photo: z.string().trim().optional(),
  nationalId: z.string().trim().optional(),
  admissionDate: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended', 'graduated', 'withdrawn', 'transferred']),
  guardians: z.array(guardianFormSchema),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
export type GuardianFormData = z.infer<typeof guardianFormSchema>;
