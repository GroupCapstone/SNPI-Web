import { afterEach, describe, expect, it, vi } from 'vitest';

import { createBranch, getBranches } from './branch-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('branch-api', () => {
  it('getBranches builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Branches retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439011',
          schoolId: '507f1f77bcf86cd799439001',
          branchCode: 'MB-01',
          branchNameEn: 'Main Branch',
          branchNameKh: 'សាខាធំ',
          status: 'active',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getBranches({ search: 'Main', status: 'active', page: 1, limit: 10 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/branches?search=Main&status=active&page=1&limit=10',
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    );
  });

  it('createBranch sends POST request with JSON payload', async () => {
    const payload = {
      success: true,
      message: 'Branch created successfully',
      data: {
        _id: '507f1f77bcf86cd799439011',
        branchCode: 'TK-02',
        branchNameEn: 'Toul Kork',
        branchNameKh: 'ទួលគោក',
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createBranch({
      schoolId: '507f1f77bcf86cd799439001',
      branchCode: 'TK-02',
      branchNameEn: 'Toul Kork',
      branchNameKh: 'ទួលគោក',
      status: 'active',
    });

    expect(result).toEqual(payload);
  });
});
