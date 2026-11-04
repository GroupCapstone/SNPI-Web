import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createSystemSetting,
  deleteSystemSetting,
  getSystemSettings,
  updateSystemSetting,
} from '../api/system-setting-api';

export const useSystemSettingsQuery = (category?: string, branchId?: string) =>
  useQuery({
    queryKey: ['system-settings', category, branchId],
    queryFn: () => getSystemSettings(category, branchId),
  });

export const useCreateSystemSettingMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createSystemSetting,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['system-settings'] }),
  });
};

export const useUpdateSystemSettingMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: string | number | boolean }) =>
      updateSystemSetting(id, { value }),
    onSuccess: () => void client.invalidateQueries({ queryKey: ['system-settings'] }),
  });
};

export const useDeleteSystemSettingMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: deleteSystemSetting,
    onSuccess: () => void client.invalidateQueries({ queryKey: ['system-settings'] }),
  });
};
