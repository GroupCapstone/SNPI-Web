import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAnnouncementApi,
  deleteAnnouncementApi,
  getAnnouncementByIdApi,
  getAnnouncementsApi,
  updateAnnouncementApi,
} from '../api/announcement-api';
import type { AnnouncementFilters, CreateAnnouncementDTO, UpdateAnnouncementDTO } from '../types';

export const useAnnouncementsQuery = (filters: AnnouncementFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['announcements', filters],
    queryFn: () => getAnnouncementsApi(filters),
    enabled,
  });

export const useAnnouncementByIdQuery = (id: string, enabled = true) =>
  useQuery({
    queryKey: ['announcement', id],
    queryFn: () => getAnnouncementByIdApi(id),
    enabled: enabled && Boolean(id),
  });

export const useCreateAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateAnnouncementDTO) => createAnnouncementApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};

export const useUpdateAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateAnnouncementDTO }) =>
      updateAnnouncementApi(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};

export const useDeleteAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAnnouncementApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
    },
  });
};
