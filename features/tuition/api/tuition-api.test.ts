import { describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import { createTuitionFee, getTuitionFees } from './tuition-api';

describe('Tuition API client', () => {
  it('calls getTuitionFees with query params', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
    } as never);

    await getTuitionFees({ search: 'GEP' });
    expect(mockGet).toHaveBeenCalledWith('/tuition-fees?search=GEP');
  });

  it('calls createTuitionFee with payload', async () => {
    const mockPost = vi.spyOn(apiClient, 'post').mockResolvedValue({
      success: true,
      data: { _id: '123', feeName: 'Term 1' },
    } as never);

    const payload = {
      schoolId: '1',
      branchId: '2',
      academicYearId: '3',
      programId: '4',
      levelId: '5',
      feeName: 'Term 1',
      feeCode: 'TF-1',
      amount: 250,
      currency: 'USD' as const,
      billingCycle: 'term' as const,
      status: 'active' as const,
    };
    await createTuitionFee(payload);
    expect(mockPost).toHaveBeenCalledWith('/tuition-fees', payload);
  });
});
