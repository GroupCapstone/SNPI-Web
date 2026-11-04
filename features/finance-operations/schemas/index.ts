import { z } from 'zod';

export const discountPolicySchema = z.object({
  branchId: z.string().min(1),
  code: z.string().trim().min(2).max(30),
  name: z.string().trim().min(2).max(150),
  type: z.enum(['sibling', 'merit', 'early_payment', 'scholarship']),
  calculationType: z.enum(['percentage', 'fixed']),
  value: z.number().positive(),
  maximumAmount: z.number().positive().optional(),
  minimumGpa: z.number().min(0).max(4).optional(),
  minimumSiblingCount: z.number().int().min(2).optional(),
  paymentDaysBeforeDue: z.number().int().min(0).optional(),
  effectiveFrom: z.string().min(1),
  effectiveTo: z.string().optional(),
});
