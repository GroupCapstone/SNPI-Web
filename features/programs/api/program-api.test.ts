import { afterEach, describe, expect, it, vi } from 'vitest';

import { createProgram, getPrograms } from './program-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('program-api', () => {
  it('getPrograms builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Programs retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439011',
          code: 'GEP',
          nameEn: 'General English Program',
          nameKh: 'កម្មវិធីភាសាអង់គ្លេសទូទៅ',
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

    const result = await getPrograms({ search: 'GEP', status: 'active', page: 1, limit: 10 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/programs?search=GEP&status=active&page=1&limit=10',
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    );
  });

  it('createProgram sends POST request with JSON body', async () => {
    const payload = {
      success: true,
      message: 'Program created successfully',
      data: {
        _id: '507f1f77bcf86cd799439011',
        code: 'CEP',
        nameEn: 'Children English Program',
        nameKh: 'កម្មវិធីភាសាអង់គ្លេសកុមារ',
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createProgram({
      code: 'CEP',
      nameEn: 'Children English Program',
      nameKh: 'កម្មវិធីភាសាអង់គ្លេសកុមារ',
      status: 'active',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/programs',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          code: 'CEP',
          nameEn: 'Children English Program',
          nameKh: 'កម្មវិធីភាសាអង់គ្លេសកុមារ',
          status: 'active',
        }),
      }),
    );
  });
});
