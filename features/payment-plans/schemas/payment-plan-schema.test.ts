import { describe, expect, it } from 'vitest';
import { installmentPaymentSchema, paymentPlanSchema } from './payment-plan-schema';

const id = '507f1f77bcf86cd799439011';
const input = {
  schoolId: id,
  branchId: id,
  academicYearId: id,
  enrollmentId: id,
  studentId: id,
  tuitionFeeId: id,
  totalAmount: 100,
  currency: 'USD',
  installments: [
    { dueDate: '2026-09-10', amount: 50 },
    { dueDate: '2026-10-10', amount: 50 },
  ],
};
describe('payment plan form validation', () => {
  it('accepts a balanced schedule', () => {
    expect(paymentPlanSchema.safeParse(input).success).toBe(true);
  });
  it('rejects invalid dates, reversed schedules, and unbalanced amounts', () => {
    expect(
      paymentPlanSchema.safeParse({
        ...input,
        installments: [
          { dueDate: '2026-10-10', amount: 50 },
          { dueDate: '2026-09-10', amount: 50 },
        ],
      }).success,
    ).toBe(false);
    expect(paymentPlanSchema.safeParse({ ...input, totalAmount: 90 }).success).toBe(false);
    expect(
      installmentPaymentSchema.safeParse({ paymentMethod: 'cash', paymentDate: 'invalid' }).success,
    ).toBe(false);
  });
});
