import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  createAnnouncementApi,
  deleteAnnouncementApi,
  getAnnouncementByIdApi,
  getAnnouncementsApi,
  updateAnnouncementApi,
} from './announcement-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Announcement API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /announcements with query filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getAnnouncementsApi({
      page: 1,
      limit: 10,
      branchId: 'b-1',
      category: 'event',
      audience: 'parents',
    });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/announcements?page=1&limit=10&branchId=b-1&category=event&audience=parents',
    );
  });

  it('calls GET /announcements/:id for single announcement', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: { _id: 'a-1', title: 'Open Day', content: 'Details' },
    });

    await getAnnouncementByIdApi('a-1');

    expect(apiClient.get).toHaveBeenCalledWith('/announcements/a-1');
  });

  it('calls POST /announcements to create an announcement', async () => {
    const payload = {
      title: 'Midterm Break',
      content: 'Campus closed from Oct 10 to Oct 15.',
      category: 'event' as const,
      audience: 'all' as const,
      isPinned: true,
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Announcement created',
      data: { _id: 'a-2', ...payload },
    });

    await createAnnouncementApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/announcements', payload);
  });

  it('calls PATCH /announcements/:id to update an announcement', async () => {
    const updatePayload = {
      title: 'Updated Midterm Break',
      isPinned: false,
    };

    vi.mocked(apiClient.patch).mockResolvedValue({
      success: true,
      message: 'Announcement updated',
      data: { _id: 'a-2', title: 'Updated Midterm Break' },
    });

    await updateAnnouncementApi('a-2', updatePayload);

    expect(apiClient.patch).toHaveBeenCalledWith('/announcements/a-2', updatePayload);
  });

  it('calls DELETE /announcements/:id to remove an announcement', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({
      success: true,
      message: 'Announcement deleted successfully',
      data: { message: 'Deleted' },
    });

    await deleteAnnouncementApi('a-2');

    expect(apiClient.delete).toHaveBeenCalledWith('/announcements/a-2');
  });
});
