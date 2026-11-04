import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  checkScheduleConflicts,
  createSchedule,
  deleteSchedule,
  getScheduleById,
  getSchedules,
  getSchedulesByClass,
  updateSchedule,
} from './timetable-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  getAccessToken: vi.fn(),
  performTokenRefresh: vi.fn(),
}));

describe('Timetable API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /class-schedules without params when none provided', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Schedules loaded',
      data: [],
      pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
    });

    await getSchedules();
    expect(apiClient.get).toHaveBeenCalledWith('/class-schedules');
  });

  it('calls GET /class-schedules with filtered query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Schedules loaded',
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await getSchedules({
      branchId: 'br-101',
      dayOfWeek: 1,
      sessionType: 'morning',
      page: 1,
      limit: 20,
    });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/class-schedules?branchId=br-101&dayOfWeek=1&sessionType=morning&page=1&limit=20',
    );
  });

  it('calls GET /class-schedules/:id to fetch a single schedule', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Schedule retrieved',
      data: { _id: 'sched-1' },
    });

    await getScheduleById('sched-1');
    expect(apiClient.get).toHaveBeenCalledWith('/class-schedules/sched-1');
  });

  it('calls GET /class-schedules/class/:classId to fetch class schedules', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Class schedules retrieved',
      data: [],
    });

    await getSchedulesByClass('cls-101');
    expect(apiClient.get).toHaveBeenCalledWith('/class-schedules/class/cls-101');
  });

  it('calls GET /class-schedules/check-conflicts with required parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Conflict check completed',
      data: { hasConflict: false, conflicts: [] },
    });

    await checkScheduleConflicts({
      branchId: 'br-101',
      dayOfWeek: 2,
      startTime: '08:00',
      endTime: '10:00',
      teacherId: 'tch-1',
      classroomId: 'rm-1',
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/class-schedules/check-conflicts?branchId=br-101&dayOfWeek=2&startTime=08%3A00&endTime=10%3A00&teacherId=tch-1&classroomId=rm-1',
    );
  });

  it('calls POST /class-schedules with body', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Schedule created',
      data: { _id: 'sched-new' },
    });

    const payload = {
      classId: 'cls-101',
      dayOfWeek: 1,
      sessionType: 'morning' as const,
      startTime: '08:00',
      endTime: '10:00',
    };

    await createSchedule(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/class-schedules', payload);
  });

  it('calls PUT /class-schedules/:id with updated body', async () => {
    vi.mocked(apiClient.put).mockResolvedValue({
      success: true,
      message: 'Schedule updated',
      data: { _id: 'sched-1' },
    });

    await updateSchedule('sched-1', { startTime: '09:00' });
    expect(apiClient.put).toHaveBeenCalledWith('/class-schedules/sched-1', { startTime: '09:00' });
  });

  it('calls DELETE /class-schedules/:id', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Schedule deleted',
      data: null,
    });

    await deleteSchedule('sched-1');
    expect(apiClient.delete).toHaveBeenCalledWith('/class-schedules/sched-1');
  });
});
