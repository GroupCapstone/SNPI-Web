import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createRolloverPlan,
  executeRolloverPlan,
  getRolloverPlans,
  validateRolloverPlan,
} from './rollover-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('rollover-api', () => {
  it('getRolloverPlans builds query without "all" branch and returns data', async () => {
    const payload = {
      success: true,
      data: [{ _id: 'plan-1', planCode: 'ROL-0001' }],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getRolloverPlans({ branchId: 'all', status: 'draft', page: 1 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/rollovers?status=draft&page=1',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createRolloverPlan sends POST request with body', async () => {
    const payload = { success: true, data: { _id: 'plan-1', planCode: 'ROL-0001' } };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const input = {
      branchId: 'branch-1',
      sourceAcademicYearId: 'year-1',
      sourcePeriodId: 'period-1',
      targetAcademicYearId: 'year-2',
      targetPeriodId: 'period-2',
    };

    const result = await createRolloverPlan(input);
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/rollovers',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(input),
      }),
    );
  });

  it('validateRolloverPlan calls /:id/validate endpoint', async () => {
    const payload = { success: true, data: { canExecute: true, blockingIssues: [] } };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await validateRolloverPlan('plan-1');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/rollovers/plan-1/validate',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('executeRolloverPlan sends execute command', async () => {
    const payload = {
      success: true,
      data: { _id: 'plan-1', status: 'completed' },
      executionResult: { classesCreated: 1 },
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await executeRolloverPlan('plan-1', { closeSourcePeriod: true });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/rollovers/plan-1/execute',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
