import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  AnnouncementFilters,
  AnnouncementItem,
  CreateAnnouncementDTO,
  UpdateAnnouncementDTO,
} from '../types';

export const getAnnouncementsApi = async (filters: AnnouncementFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.branchId && filters.branchId !== 'all') params.set('branchId', filters.branchId);
  if (filters.category) params.set('category', filters.category);
  if (filters.audience) params.set('audience', filters.audience);
  if (typeof filters.isPublished === 'boolean')
    params.set('isPublished', String(filters.isPublished));
  if (filters.search) params.set('search', filters.search);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<AnnouncementItem>>(
    `/announcements${query ? `?${query}` : ''}`,
  );
};

export const getAnnouncementByIdApi = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<AnnouncementItem>>(`/announcements/${id}`);
};

export const createAnnouncementApi = async (dto: CreateAnnouncementDTO) => {
  return apiClient.post<ApiSuccessResponse<AnnouncementItem>>('/announcements', dto);
};

export const updateAnnouncementApi = async (id: string, dto: UpdateAnnouncementDTO) => {
  return apiClient.patch<ApiSuccessResponse<AnnouncementItem>>(`/announcements/${id}`, dto);
};

export const deleteAnnouncementApi = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<{ message: string }>>(`/announcements/${id}`);
};
