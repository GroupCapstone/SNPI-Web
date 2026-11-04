import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  getAttendanceListApi,
  getClassRosterAttendanceApi,
  markAttendanceApi,
} from './attendance-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('Attendance API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /attendance with query params', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getAttendanceListApi({ page: 1, limit: 10, classId: 'c-1', date: '2026-08-30' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/attendance?page=1&limit=10&classId=c-1&date=2026-08-30',
    );
  });

  it('calls GET /attendance/roster/:classId', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: { existingRecord: null, roster: [] },
    });

    await getClassRosterAttendanceApi('c-1', '2026-08-30');

    expect(apiClient.get).toHaveBeenCalledWith('/attendance/roster/c-1?date=2026-08-30');
  });

  it('calls POST /attendance to mark roll-call', async () => {
    const payload = {
      schoolId: 's-1',
      branchId: 'b-1',
      academicYearId: 'ay-1',
      classId: 'c-1',
      date: '2026-08-30',
      records: [{ studentId: 'stu-1', status: 'present' as const }],
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Saved',
      data: { _id: 'att-1', ...payload },
    });

    await markAttendanceApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/attendance', payload);
  });
});
