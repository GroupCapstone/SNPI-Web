import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  createPlacementTestApi,
  deletePlacementTestApi,
  getPlacementTestsApi,
} from './placement-test-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Placement Test API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /placement-tests with filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getPlacementTestsApi({ page: 1, limit: 10, search: 'Bopha', branchId: 'b-1' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/placement-tests?page=1&limit=10&search=Bopha&branchId=b-1',
    );
  });

  it('calls POST /placement-tests to record test', async () => {
    const payload = {
      studentName: 'Bopha Kouy',
      schoolId: 's-1',
      branchId: 'b-1',
      programId: 'p-1',
      recommendedLevelId: 'lvl-1',
      score: 85,
      maxScore: 100,
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Recorded',
      data: {
        _id: 'test-1',
        ...payload,
        testNumber: 'TEST-000001',
        status: 'completed',
        testDate: '2026-08-30',
        isDeleted: false,
        schoolId: { _id: 's-1', nameEn: 'SNP', code: 'SNP' },
        branchId: { _id: 'b-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        programId: { _id: 'p-1', nameEn: 'GEP', code: 'GEP' },
        recommendedLevelId: { _id: 'lvl-1', name: 'Level 1', code: 'L1', sequence: 1 },
        createdAt: '2026-08-30',
        updatedAt: '2026-08-30',
      },
    });

    const result = await createPlacementTestApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/placement-tests', payload);
    expect(result.data.testNumber).toBe('TEST-000001');
  });

  it('calls DELETE /placement-tests/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Deleted',
      data: null,
    });

    await deletePlacementTestApi('test-123');

    expect(apiClient.delete).toHaveBeenCalledWith('/placement-tests/test-123');
  });
});
