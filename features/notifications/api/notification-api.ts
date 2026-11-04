import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  CreateParentContactLogDTO,
  NotificationFilters,
  NotificationItem,
  NotificationStatsResponse,
  ParentContactLogFilters,
  ParentContactLogItem,
  SendNotificationDTO,
  TriggerAbsenceAlertDTO,
  TriggerTuitionReminderDTO,
} from '../types';

export const getNotificationsApi = async (filters: NotificationFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.channel) params.set('channel', filters.channel);
  if (filters.type) params.set('type', filters.type);
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<NotificationItem>>(
    `/notifications${query ? `?${query}` : ''}`,
  );
};

export const getNotificationStatsApi = async (branchId?: string) => {
  const params = new URLSearchParams();
  if (branchId && branchId !== 'all') params.set('branchId', branchId);
  const query = params.toString();

  return apiClient.get<ApiSuccessResponse<NotificationStatsResponse>>(
    `/notifications/stats${query ? `?${query}` : ''}`,
  );
};

export const sendNotificationApi = async (dto: SendNotificationDTO) => {
  const result = await apiClient.post<ApiSuccessResponse<NotificationItem>>(
    '/notifications/send',
    dto,
  );
  assertNotificationSent(result.data);
  return result;
};

const assertNotificationSent = (notification: NotificationItem) => {
  if (notification.status !== 'sent') {
    throw new Error(
      notification.errorDetails || 'Notification could not be sent. Check the notification log.',
    );
  }
};

export const triggerAbsenceAlertApi = async (dto: TriggerAbsenceAlertDTO) => {
  const result = await apiClient.post<
    ApiSuccessResponse<{ notification: NotificationItem; contactLog: unknown }>
  >('/notifications/absence-alert', dto);
  assertNotificationSent(result.data.notification);
  return result;
};

export const triggerTuitionReminderApi = async (dto: TriggerTuitionReminderDTO) => {
  const result = await apiClient.post<
    ApiSuccessResponse<{ notification: NotificationItem; contactLog: unknown }>
  >('/notifications/tuition-reminder', dto);
  assertNotificationSent(result.data.notification);
  return result;
};

export const testTelegramApi = async (payload: { chatId?: string; message?: string } = {}) => {
  return apiClient.post<
    ApiSuccessResponse<{ success: boolean; messageId?: string; error?: string }>
  >('/notifications/test-telegram', payload);
};

export const getParentContactLogsApi = async (filters: ParentContactLogFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.studentId) params.set('studentId', filters.studentId);
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.contactType) params.set('contactType', filters.contactType);
  if (filters.purpose) params.set('purpose', filters.purpose);
  if (filters.search) params.set('search', filters.search);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<ParentContactLogItem>>(
    `/notifications/parent-contact-logs${query ? `?${query}` : ''}`,
  );
};

export const createParentContactLogApi = async (dto: CreateParentContactLogDTO) => {
  return apiClient.post<ApiSuccessResponse<ParentContactLogItem>>(
    '/notifications/parent-contact-logs',
    dto,
  );
};
