import { afterEach, describe, expect, it, vi } from 'vitest';

import { createCurriculum, getCurricula } from './curriculum-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('curriculum-api', () => {
  it('getCurricula builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Curricula retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439044',
          code: 'CURR-ENG-ELEM-2026',
          name: 'English Elementary Curriculum',
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

    const result = await getCurricula({
      search: 'ENG',
      programId: '507f1f77bcf86cd799439011',
      status: 'active',
      page: 1,
      limit: 10,
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/curriculum?search=ENG&programId=507f1f77bcf86cd799439011&status=active&page=1&limit=10',
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    );
  });

  it('createCurriculum sends POST request with JSON body', async () => {
    const payload = {
      success: true,
      message: 'Curriculum created successfully',
      data: {
        _id: '507f1f77bcf86cd799439044',
        code: 'CURR-ENG-ELEM-2026',
        name: 'English Elementary Standard Curriculum',
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createCurriculum({
      programId: '507f1f77bcf86cd799439011',
      levelId: '507f1f77bcf86cd799439012',
      academicYearId: '507f1f77bcf86cd799439002',
      code: 'CURR-ENG-ELEM-2026',
      name: 'English Elementary Standard Curriculum',
      subjects: [
        {
          subjectId: '507f1f77bcf86cd799439033',
          weeklyHours: 3,
          totalHours: 45,
          sequence: 1,
          passingScore: 50,
          isRequired: true,
        },
      ],
      status: 'active',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/curriculum',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });
});
