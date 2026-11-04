export type NotificationChannel = 'telegram' | 'sms' | 'in_app';

export type NotificationType =
  | 'absence_alert'
  | 'unmarked_attendance_digest'
  | 'payment_receipt'
  | 'tuition_reminder'
  | 'announcement'
  | 'custom';

export type NotificationRecipientType = 'guardian' | 'student' | 'teacher' | 'staff' | 'broadcast';

export type NotificationStatus = 'pending' | 'sent' | 'failed';

export interface NotificationItem {
  _id: string;
  schoolId: string;
  branchId?: { _id: string; branchNameEn: string; branchNameKh?: string } | string;
  channel: NotificationChannel;
  type: NotificationType;
  recipientType: NotificationRecipientType;
  recipientId?: string;
  recipientName?: string;
  recipientPhone?: string;
  recipientChatId?: string;
  title: string;
  body: string;
  status: NotificationStatus;
  sentAt?: string;
  errorDetails?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationFilters {
  page?: number;
  limit?: number;
  branchId?: string;
  channel?: NotificationChannel;
  type?: NotificationType;
  status?: NotificationStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface NotificationStatsResponse {
  totalSent: number;
  sentToday: number;
  failedCount: number;
  byChannel: {
    telegram: number;
    sms: number;
    in_app: number;
  };
}

export interface SendNotificationDTO {
  branchId?: string;
  channel: NotificationChannel;
  type?: NotificationType;
  recipientType?: NotificationRecipientType;
  recipientId?: string;
  recipientName?: string;
  recipientPhone?: string;
  recipientChatId?: string;
  title: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface TriggerAbsenceAlertDTO {
  studentId: string;
  guardianPhone?: string;
  consecutiveDays: number;
  channel?: NotificationChannel;
  notes?: string;
}

export interface TriggerTuitionReminderDTO {
  paymentId: string;
  channel?: NotificationChannel;
  notes?: string;
}

export type ContactType = 'phone_call' | 'telegram' | 'sms' | 'in_person';
export type ContactPurpose = 'absence' | 'tuition' | 'behavior' | 'academic' | 'general';
export type ContactOutcome =
  'reached' | 'no_answer' | 'left_message' | 'callback_requested' | 'resolved';

export interface ParentContactLogItem {
  _id: string;
  schoolId: string;
  branchId: string;
  studentId: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName?: string;
  };
  guardianName: string;
  guardianPhone?: string;
  contactType: ContactType;
  purpose: ContactPurpose;
  outcome: ContactOutcome;
  notes: string;
  contactDate: string;
  staffName?: string;
  createdAt: string;
}

export interface CreateParentContactLogDTO {
  studentId: string;
  guardianName: string;
  guardianPhone?: string;
  contactType: ContactType;
  purpose: ContactPurpose;
  outcome: ContactOutcome;
  notes: string;
  contactDate?: string;
}

export interface ParentContactLogFilters {
  page?: number;
  limit?: number;
  studentId?: string;
  branchId?: string;
  contactType?: ContactType;
  purpose?: ContactPurpose;
  search?: string;
}
