import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import { createEnrollmentApi, deleteEnrollmentApi, getEnrollmentsApi } from './enrollment-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Enrollment API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /enrollments with query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getEnrollmentsApi({ page: 1, limit: 10, search: 'ENR-000001', branchId: 'b-123' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/enrollments?page=1&limit=10&search=ENR-000001&branchId=b-123',
    );
  });

  it('calls POST /enrollments to enroll student', async () => {
    const payload = {
      studentId: 'stu-1',
      schoolId: 'sch-1',
      branchId: 'br-1',
      academicYearId: 'ay-1',
      programId: 'prog-1',
      levelId: 'lvl-1',
      classId: 'cls-1',
      enrollmentDate: '2026-09-01',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Enrolled',
      data: {
        _id: 'enr-1',
        ...payload,
        enrollmentCode: 'ENR-000001',
        status: 'active',
        tuitionStatus: 'pending',
        isDeleted: false,
        studentId: {
          _id: 'stu-1',
          studentId: 'STU-000001',
          firstName: 'Vannak',
          lastName: 'Chan',
          khmerName: 'ចាន់ វណ្ណៈ',
          gender: 'male',
        },
        schoolId: { _id: 'sch-1', nameEn: 'SNP', code: 'SNP' },
        branchId: { _id: 'br-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        academicYearId: { _id: 'ay-1', name: '2026-2027', code: 'AY-2026', isCurrent: true },
        programId: { _id: 'prog-1', programNameEn: 'GEP', programCode: 'GEP' },
        levelId: { _id: 'lvl-1', levelNameEn: 'Level 1', levelCode: 'L1' },
        classId: { _id: 'cls-1', className: 'GEP-01A' },
        createdAt: '2026-09-01',
        updatedAt: '2026-09-01',
      },
    });

    const result = await createEnrollmentApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/enrollments', payload);
    expect(result.data.enrollmentCode).toBe('ENR-000001');
  });

  it('calls DELETE /enrollments/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Cancelled',
      data: null,
    });

    await deleteEnrollmentApi('enr-123');

    expect(apiClient.delete).toHaveBeenCalledWith('/enrollments/enr-123');
  });
});
