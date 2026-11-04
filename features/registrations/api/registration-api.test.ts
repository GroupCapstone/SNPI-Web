import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  createRegistrationApi,
  deleteRegistrationApi,
  getRegistrationsApi,
} from './registration-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Registration API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /registrations with query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getRegistrationsApi({ page: 1, limit: 10, search: 'REG-000001', branchId: 'b-1' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/registrations?page=1&limit=10&search=REG-000001&branchId=b-1',
    );
  });

  it('calls POST /registrations to create registration', async () => {
    const payload = {
      schoolId: 's-1',
      branchId: 'b-1',
      academicYearId: 'ay-1',
      programId: 'p-1',
      firstName: 'Bopha',
      lastName: 'Kouy',
      khmerName: 'គុយ បុប្ផា',
      gender: 'female' as const,
      dateOfBirth: '2016-04-15',
      phone: '012334455',
      guardianName: 'Kouy Vanna',
      guardianRelationship: 'father',
      guardianPhone: '012334455',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Created',
      data: {
        _id: 'reg-1',
        ...payload,
        registrationNumber: 'REG-000001',
        status: 'registered',
        registrationDate: '2026-08-30',
        isDeleted: false,
        schoolId: { _id: 's-1', nameEn: 'SNP', code: 'SNP' },
        branchId: { _id: 'b-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        academicYearId: { _id: 'ay-1', name: '2026-2027', code: 'AY-2026', isCurrent: true },
        programId: { _id: 'p-1', nameEn: 'GEP', code: 'GEP' },
        createdAt: '2026-08-30',
        updatedAt: '2026-08-30',
      },
    });

    const result = await createRegistrationApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/registrations', payload);
    expect(result.data.registrationNumber).toBe('REG-000001');
  });

  it('calls DELETE /registrations/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Deleted',
      data: null,
    });

    await deleteRegistrationApi('reg-123');

    expect(apiClient.delete).toHaveBeenCalledWith('/registrations/reg-123');
  });
});
