import { z } from 'zod';

export const tuitionFeeFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Branch is required'),
  academicYearId: z.string().min(1, 'Academic year is required'),
  programId: z.string().min(1, 'Program is required'),
  levelId: z.string().min(1, 'Level is required'),
  feeName: z.string().min(1, 'Fee name is required').trim(),
  feeCode: z.string().min(1, 'Fee code is required').trim().toUpperCase(),
  amount: z.number().min(0, 'Amount cannot be negative'),
  currency: z.enum(['USD', 'KHR']),
  billingCycle: z.enum(['monthly', 'term', 'semester', 'annual']),
  description: z.string().trim().optional().or(z.literal('')),
  status: z.enum(['active', 'inactive']),
});

export type TuitionFeeFormData = z.infer<typeof tuitionFeeFormSchema>;
