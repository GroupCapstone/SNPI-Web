import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RolePayload } from '../api/role-api';
import {
  createRole,
  deleteRole,
  getAllPermissions,
  getGroupedPermissions,
  getRoleById,
  getRoles,
  updateRole,
} from '../api/role-api';
import type { RoleFilters } from '../types';

export const useRolesQuery = (filters: RoleFilters = {}) => {
  return useQuery({
    queryKey: ['roles', filters],
    queryFn: () => getRoles(filters),
  });
};

export const useRoleQuery = (id: string) => {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => getRoleById(id),
    enabled: Boolean(id),
  });
};

export const useAllPermissionsQuery = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: getAllPermissions,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGroupedPermissionsQuery = () => {
  return useQuery({
    queryKey: ['permissions', 'grouped'],
    queryFn: getGroupedPermissions,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RolePayload) => createRole(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RolePayload> }) => updateRole(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['roles'] });
      void queryClient.invalidateQueries({ queryKey: ['role'] });
    },
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
