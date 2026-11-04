import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createParentContactLogApi,
  getNotificationStatsApi,
  getNotificationsApi,
  getParentContactLogsApi,
  sendNotificationApi,
  testTelegramApi,
  triggerAbsenceAlertApi,
  triggerTuitionReminderApi,
} from '../api/notification-api';
import type {
  CreateParentContactLogDTO,
  NotificationFilters,
  ParentContactLogFilters,
  SendNotificationDTO,
  TriggerAbsenceAlertDTO,
  TriggerTuitionReminderDTO,
} from '../types';

export const useNotificationsQuery = (filters: NotificationFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['notifications', filters],
    queryFn: () => getNotificationsApi(filters),
    enabled,
    refetchInterval: 30000,
  });

export const useNotificationStatsQuery = (branchId?: string, enabled = true) =>
  useQuery({
    queryKey: ['notification-stats', branchId],
    queryFn: () => getNotificationStatsApi(branchId),
    enabled,
  });

export const useSendNotificationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: SendNotificationDTO) => sendNotificationApi(dto),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notification-stats'] });
    },
  });
};

export const useTriggerAbsenceAlertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: TriggerAbsenceAlertDTO) => triggerAbsenceAlertApi(dto),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notification-stats'] });
      queryClient.invalidateQueries({ queryKey: ['parent-contact-logs'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-student-affairs-pulse'] });
    },
  });
};

export const useTriggerTuitionReminderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: TriggerTuitionReminderDTO) => triggerTuitionReminderApi(dto),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['notifications'] });
      void queryClient.invalidateQueries({ queryKey: ['parent-contact-logs'] });
    },
  });
};

export const useTestTelegramMutation = () =>
  useMutation({
    mutationFn: (payload: { chatId?: string; message?: string }) => testTelegramApi(payload),
  });

export const useParentContactLogsQuery = (filters: ParentContactLogFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['parent-contact-logs', filters],
    queryFn: () => getParentContactLogsApi(filters),
    enabled,
  });

export const useCreateParentContactLogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateParentContactLogDTO) => createParentContactLogApi(dto),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['parent-contact-logs'] });
    },
  });
};
