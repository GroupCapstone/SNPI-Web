import { z } from 'zod';

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
  additionalAddress: z.string().trim().optional(),
});

export const familyMemberFormSchema = z.object({
  name: z.string().trim().optional(),
  age: z
    .number()
    .int()
    .min(0)
    .max(150)
    .optional()
    .or(z.nan().transform(() => undefined)),
  nationality: z.string().trim().optional(),
  ethnicity: z.string().trim().optional(),
  livingStatus: z.enum(['living', 'deceased']).optional(),
  occupation: z.string().trim().optional(),
});

export const employeeDocumentFormSchema = z.object({
  documentType: z.string().trim().min(1, 'Document type is required'),
  fileName: z.string().trim().optional(),
  fileUrl: z.string().trim().optional(),
  description: z.string().trim().optional(),
  status: z.enum(['active', 'archived']).optional(),
});

export const employeeFormSchema = z.object({
  schoolId: z.string().min(1, 'School organization is required'),
  branchId: z.string().min(1, 'Campus branch is required'),
  departmentId: z.string().min(1, 'Department is required'),
  positionId: z.string().min(1, 'Position is required'),
  employeeId: z.string().trim().optional(),
  legacyEmployeeNumber: z.string().trim().optional(),

  // Personal
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  khmerName: z.string().trim().min(1, 'Khmer name is required').max(150),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().trim().optional(),
  ethnicity: z.string().trim().optional(),
  nationalIdNumber: z.string().trim().optional(),
  photo: z.string().trim().optional(),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  numberOfChildren: z
    .number()
    .int()
    .min(0)
    .optional()
    .or(z.nan().transform(() => 0)),

  // Addresses
  birthplace: birthplaceFormSchema.optional(),
  currentAddress: currentAddressFormSchema.optional(),
  address: z.string().trim().optional(),

  // Contact
  primaryPhone: z.string().trim().optional(),
  secondaryPhone: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  email: z.string().trim().email('Invalid email address').optional().or(z.literal('')),

  // Education & Skills
  educationLevel: z.enum(['high_school', 'associate', 'bachelor', 'master', 'doctorate', 'other']),
  major: z.string().trim().optional(),
  foreignLanguages: z.array(z.string()).optional(),
  otherSkills: z.array(z.string()).optional(),
  workExperienceSummary: z.string().trim().optional(),

  // Family
  father: familyMemberFormSchema.optional(),
  mother: familyMemberFormSchema.optional(),

  // Documents
  documents: z.array(employeeDocumentFormSchema).optional(),

  // Employment Parameters
  employmentType: z.enum([
    'full_time',
    'part_time',
    'contract',
    'intern',
    'temporary',
    'probation',
  ]),
  joiningDate: z.string().min(1, 'Joining date is required'),
  status: z.enum(['active', 'inactive', 'on_leave', 'suspended', 'resigned', 'terminated']),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
export type BirthplaceFormData = z.infer<typeof birthplaceFormSchema>;
export type CurrentAddressFormData = z.infer<typeof currentAddressFormSchema>;
export type FamilyMemberFormData = z.infer<typeof familyMemberFormSchema>;
export type EmployeeDocumentFormData = z.infer<typeof employeeDocumentFormSchema>;
