import { z } from 'zod';

const id = z.string().regex(/^[a-f\d]{24}$/i, 'Select a valid record');
export const paymentPlanSchema = z
  .object({
    schoolId: id,
    branchId: id,
    academicYearId: id,
    academicPeriodId: id.optional(),
    enrollmentId: id,
    studentId: id,
    tuitionFeeId: id,
    totalAmount: z.number().positive(),
    currency: z.enum(['USD', 'KHR']),
    installments: z
      .array(z.object({ dueDate: z.string().date(), amount: z.number().positive() }))
      .min(2)
      .max(24),
    notes: z.string().trim().max(1000).optional(),
  })
  .superRefine((plan, context) => {
    if (
      Math.abs(plan.installments.reduce((sum, item) => sum + item.amount, 0) - plan.totalAmount) >
      0.005
    ) {
      context.addIssue({
        code: 'custom',
        path: ['installments'],
        message: 'Installments must add up to the tuition amount',
      });
    }
    if (
      plan.installments.some(
        (item, index) => index > 0 && item.dueDate < plan.installments[index - 1].dueDate,
      )
    ) {
      context.addIssue({
        code: 'custom',
        path: ['installments'],
        message: 'Installment due dates must be in order',
      });
    }
  });

export const installmentPaymentSchema = z.object({
  paymentMethod: z.enum(['cash', 'aba_pay', 'bank_transfer', 'credit_card', 'wing']),
  paymentDate: z.string().date('Select a payment date'),
  transactionReference: z.string().trim().max(200).optional(),
});
