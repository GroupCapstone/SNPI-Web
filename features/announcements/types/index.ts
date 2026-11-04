export type AnnouncementCategory =
  'general' | 'academic' | 'finance' | 'attendance' | 'event' | 'urgent';

export type AnnouncementAudience = 'all' | 'students' | 'parents' | 'staff' | 'teachers';

export interface AnnouncementItem {
  _id: string;
  schoolId: string;
  branchId?: { _id: string; branchNameEn: string; branchNameKh?: string } | string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  audience: AnnouncementAudience;
  isPublished: boolean;
  isPinned: boolean;
  publishedAt?: string;
  expiresAt?: string;
  createdBy?: { firstName?: string; lastName?: string; username?: string } | string;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementFilters {
  page?: number;
  limit?: number;
  branchId?: string;
  category?: AnnouncementCategory;
  audience?: AnnouncementAudience;
  isPublished?: boolean;
  search?: string;
}

export interface CreateAnnouncementDTO {
  branchId?: string;
  title: string;
  content: string;
  category?: AnnouncementCategory;
  audience?: AnnouncementAudience;
  isPublished?: boolean;
  isPinned?: boolean;
  publishedAt?: string;
  expiresAt?: string;
  broadcastToTelegram?: boolean;
}

export interface UpdateAnnouncementDTO {
  title?: string;
  content?: string;
  category?: AnnouncementCategory;
  audience?: AnnouncementAudience;
  isPublished?: boolean;
  isPinned?: boolean;
  publishedAt?: string;
  expiresAt?: string;
}
