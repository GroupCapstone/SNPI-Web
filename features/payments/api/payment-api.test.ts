import { describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import { createPayment, getPayments } from './payment-api';

describe('Payment API client', () => {
  it('calls getPayments with query params', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
    } as never);

    await getPayments({ search: 'PAY-000001' });
    expect(mockGet).toHaveBeenCalledWith('/payments?search=PAY-000001');
  });

  it('calls createPayment with payload', async () => {
    const mockPost = vi.spyOn(apiClient, 'post').mockResolvedValue({
      success: true,
      data: { _id: '123', receiptNumber: 'PAY-000001' },
    } as never);

    const payload = {
      schoolId: '1',
      branchId: '2',
      academicYearId: '3',
      studentId: '4',
      tuitionFeeId: '5',
      amountDue: 250,
      discountAmount: 0,
      amountPaid: 250,
      currency: 'USD' as const,
      paymentMethod: 'cash' as const,
    };
    await createPayment(payload);
    expect(mockPost).toHaveBeenCalledWith('/payments', payload);
  });
});
