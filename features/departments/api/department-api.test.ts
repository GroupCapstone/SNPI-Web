import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDepartment, getDepartments } from './department-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('department-api', () => {
  it('getDepartments builds branchId query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Departments retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439003',
          schoolId: '507f1f77bcf86cd799439001',
          branchId: '507f1f77bcf86cd799439002',
          code: 'ACA',
          nameEn: 'Academic Department',
          nameKh: 'ដេប៉ាតឺម៉ង់សិក្សាធិការ',
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

    const result = await getDepartments({
      branchId: '507f1f77bcf86cd799439002',
      page: 1,
      limit: 10,
    });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/departments?branchId=507f1f77bcf86cd799439002&page=1&limit=10',
      expect.objectContaining({
        method: 'GET',
        credentials: 'include',
      }),
    );
  });

  it('createDepartment sends POST request with JSON payload', async () => {
    const payload = {
      success: true,
      message: 'Department created successfully',
      data: {
        _id: '507f1f77bcf86cd799439003',
        code: 'FIN',
        nameEn: 'Finance Department',
        nameKh: 'ដេប៉ាតឺម៉ង់ហិរញ្ញវត្ថុ',
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createDepartment({
      schoolId: '507f1f77bcf86cd799439001',
      branchId: '507f1f77bcf86cd799439002',
      code: 'FIN',
      nameEn: 'Finance Department',
      nameKh: 'ដេប៉ាតឺម៉ង់ហិរញ្ញវត្ថុ',
      status: 'active',
    });

    expect(result).toEqual(payload);
  });
});
