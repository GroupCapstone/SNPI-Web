import { z } from 'zod';

export const paymentFormSchema = z.object({
  schoolId: z.string().min(1, 'School is required'),
  branchId: z.string().min(1, 'Branch is required'),
  academicYearId: z.string().min(1, 'Academic year is required'),
  studentId: z.string().min(1, 'Student is required'),
  tuitionFeeId: z.string().min(1, 'Tuition fee is required'),
  amountDue: z.number().min(0, 'Amount due cannot be negative'),
  discountAmount: z.number().min(0, 'Discount cannot be negative'),
  discountPolicyId: z.string().optional().or(z.literal('')),
  discountReason: z.string().trim().optional().or(z.literal('')),
  amountPaid: z.number().min(0, 'Amount paid cannot be negative'),
  currency: z.enum(['USD', 'KHR']),
  paymentMethod: z.enum(['cash', 'aba_pay', 'bank_transfer', 'credit_card', 'wing']),
  paymentType: z
    .enum(['tuition_monthly', 'tuition_term', 'registration_fee', 'uniform', 'books', 'other'])
    .optional(),
  billingYear: z.number().int().min(2020).max(2050).optional(),
  billingMonth: z.number().int().min(1).max(12).optional(),
  coveragePeriodLabel: z.string().trim().optional().or(z.literal('')),
  paymentDate: z.string().optional(),
  dueDate: z.string().optional(),
  transactionReference: z.string().trim().optional().or(z.literal('')),
  remarks: z.string().trim().optional().or(z.literal('')),
});

export type PaymentFormData = z.infer<typeof paymentFormSchema>;
