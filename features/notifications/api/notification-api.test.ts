import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  createParentContactLogApi,
  getNotificationStatsApi,
  getNotificationsApi,
  getParentContactLogsApi,
  sendNotificationApi,
  testTelegramApi,
  triggerAbsenceAlertApi,
} from './notification-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('Notification API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /notifications with query filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getNotificationsApi({
      page: 1,
      limit: 10,
      branchId: 'b-1',
      channel: 'telegram',
      status: 'sent',
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/notifications?page=1&limit=10&branchId=b-1&channel=telegram&status=sent',
    );
  });

  it('calls GET /notifications/stats with branch filter', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: {
        totalSent: 15,
        sentToday: 5,
        failedCount: 0,
        byChannel: { telegram: 10, sms: 5, in_app: 0 },
      },
    });

    await getNotificationStatsApi('b-1');

    expect(apiClient.get).toHaveBeenCalledWith('/notifications/stats?branchId=b-1');
  });

  it('calls POST /notifications/send with payload', async () => {
    const payload = {
      channel: 'telegram' as const,
      recipientType: 'guardian' as const,
      recipientPhone: '012345678',
      title: 'School Notice',
      body: 'Campus will be closed tomorrow.',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Notification sent',
      data: { _id: 'n-1', ...payload, status: 'sent' },
    });

    await sendNotificationApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/notifications/send', payload);
  });

  it('calls POST /notifications/absence-alert with consecutive days', async () => {
    const payload = {
      studentId: 'stu-1',
      guardianPhone: '012345678',
      consecutiveDays: 3,
      channel: 'telegram' as const,
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Absence alert triggered',
      data: { notification: { _id: 'n-2', status: 'sent' }, contactLog: { _id: 'c-1' } },
    });

    await triggerAbsenceAlertApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/notifications/absence-alert', payload);
  });

  it('calls POST /notifications/test-telegram with optional message', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Telegram test succeeded',
      data: { success: true, messageId: '12345' },
    });

    await testTelegramApi({ message: 'Hello Bot' });

    expect(apiClient.post).toHaveBeenCalledWith('/notifications/test-telegram', {
      message: 'Hello Bot',
    });
  });

  it('calls GET /notifications/parent-contact-logs with filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getParentContactLogsApi({
      page: 1,
      limit: 10,
      studentId: 'stu-1',
      contactType: 'phone_call',
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/notifications/parent-contact-logs?page=1&limit=10&studentId=stu-1&contactType=phone_call',
    );
  });

  it('calls POST /notifications/parent-contact-logs with log DTO', async () => {
    const payload = {
      studentId: 'stu-1',
      guardianName: 'Sokha Mom',
      guardianPhone: '012345678',
      contactType: 'phone_call' as const,
      purpose: 'absence' as const,
      outcome: 'reached' as const,
      notes: 'Parent confirmed student has a fever.',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Contact log created',
      data: { _id: 'log-1', ...payload },
    });

    await createParentContactLogApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/notifications/parent-contact-logs', payload);
  });
  it('surfaces failed dispatch even when the log was saved successfully', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      data: { status: 'failed', errorDetails: 'SMS provider is not configured' },
    });
    await expect(
      sendNotificationApi({ channel: 'sms', title: 'Test', body: 'Test' }),
    ).rejects.toThrow('SMS provider is not configured');
  });
});
