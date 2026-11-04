import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import { createStudentApi, deleteStudentApi, getStudentsApi } from './student-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Student API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /students with query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getStudentsApi({ page: 1, limit: 10, search: 'Dara', branchId: 'b-123' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/students?page=1&limit=10&search=Dara&branchId=b-123',
    );
  });

  it('calls POST /students to create a student', async () => {
    const payload = {
      schoolId: 'sch-1',
      branchId: 'br-1',
      firstName: 'Vannak',
      lastName: 'Chan',
      khmerName: 'ចាន់ វណ្ណៈ',
      gender: 'male' as const,
      dateOfBirth: '2015-05-12',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Created',
      data: {
        _id: 'stu-1',
        ...payload,
        studentId: 'STU-000001',
        schoolId: { _id: 'sch-1', nameEn: 'SNP', code: 'SNP' },
        branchId: { _id: 'br-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        nationality: 'Cambodian',
        admissionDate: '2026-08-30',
        status: 'active',
        guardians: [],
        isDeleted: false,
        createdAt: '2026-08-30',
        updatedAt: '2026-08-30',
      },
    });

    const result = await createStudentApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/students', payload);
    expect(result.data.studentId).toBe('STU-000001');
  });

  it('calls DELETE /students/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Deleted',
      data: null,
    });

    await deleteStudentApi('stu-123');

    expect(apiClient.delete).toHaveBeenCalledWith('/students/stu-123');
  });
});
