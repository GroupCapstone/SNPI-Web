import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from '../api/department-api';
import type { DepartmentFormData } from '../schemas';
import type { DepartmentFilters } from '../types';

export const useDepartmentsQuery = (filters: DepartmentFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['departments', filters],
    queryFn: () => getDepartments(filters),
    enabled,
  });
};

export const useDepartmentQuery = (id: string) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartmentById(id),
    enabled: Boolean(id),
  });
};

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DepartmentFormData) => createDepartment(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DepartmentFormData> }) =>
      updateDepartment(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departments'] });
      void queryClient.invalidateQueries({ queryKey: ['department'] });
    },
  });
};

export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};
