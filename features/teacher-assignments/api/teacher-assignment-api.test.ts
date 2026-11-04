import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  createTeacherAssignmentApi,
  deleteTeacherAssignmentApi,
  getTeacherAssignmentsApi,
  getTeacherRosterMatrixApi,
} from './teacher-assignment-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Teacher Assignment API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /teacher-assignments/roster-matrix with query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: {
        summary: {
          totalTeachers: 1,
          assignedClassesCount: 2,
          unassignedClassesCount: 0,
          totalStudents: 35,
        },
        faculty: [],
        unassignedClasses: [],
      },
    });

    await getTeacherRosterMatrixApi({
      branchId: 'b-1',
      academicYearId: 'ay-1',
      employeeId: 'emp-1',
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/teacher-assignments/roster-matrix?branchId=b-1&academicYearId=ay-1&employeeId=emp-1',
    );
  });

  it('calls GET /teacher-assignments with filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getTeacherAssignmentsApi({ page: 1, limit: 10, classId: 'c-1' });

    expect(apiClient.get).toHaveBeenCalledWith('/teacher-assignments?page=1&limit=10&classId=c-1');
  });

  it('calls POST /teacher-assignments to create record', async () => {
    const payload = {
      schoolId: 's-1',
      branchId: 'b-1',
      academicYearId: 'ay-1',
      employeeId: 'emp-1',
      classId: 'c-1',
      roleInClass: 'subject_teacher' as const,
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Created',
      data: {
        _id: 'ta-1',
        ...payload,
        status: 'active',
        startDate: '2026-08-30',
        isDeleted: false,
        schoolId: { _id: 's-1', nameEn: 'SNP', code: 'SNP' },
        branchId: { _id: 'b-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        academicYearId: { _id: 'ay-1', name: '2026-2027', code: 'AY-2026', isCurrent: true },
        employeeId: {
          _id: 'emp-1',
          employeeId: 'EMP-001',
          firstName: 'Dara',
          lastName: 'Sok',
          khmerName: 'សុខ តារា',
          phone: '012345678',
          email: 'dara@snp.edu',
        },
        classId: { _id: 'c-1', className: 'GEP-1A', classCode: 'GEP-1A', shift: 'morning' },
        createdAt: '2026-08-30',
        updatedAt: '2026-08-30',
      },
    });

    const result = await createTeacherAssignmentApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/teacher-assignments', payload);
    expect(result.data._id).toBe('ta-1');
  });

  it('calls DELETE /teacher-assignments/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Deleted',
      data: null,
    });

    await deleteTeacherAssignmentApi('ta-123');

    expect(apiClient.delete).toHaveBeenCalledWith('/teacher-assignments/ta-123');
  });
});
