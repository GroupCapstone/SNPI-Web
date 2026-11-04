import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiClient } from '@/lib/api-client';
import { getPaymentPlans, payInstallment } from './payment-plan-api';

vi.mock('@/lib/api-client', () => ({ apiClient: { get: vi.fn(), post: vi.fn() } }));
describe('payment plan API', () => {
  afterEach(() => vi.clearAllMocks());
  it('sends server-side search and pagination', async () => {
    await getPaymentPlans({ search: 'Sok Dara', page: 2, limit: 20 });
    expect(apiClient.get).toHaveBeenCalledWith('/payment-plans?search=Sok+Dara&page=2&limit=20');
  });
  it('records an installment with method and date; the server determines the amount', async () => {
    const input = { paymentMethod: 'cash' as const, paymentDate: '2026-09-12' };
    await payInstallment('plan', 2, input);
    expect(apiClient.post).toHaveBeenCalledWith('/payment-plans/plan/installments/2/pay', input);
  });
});
