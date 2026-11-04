import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from '../api/employee-api';
import type { EmployeeFormData } from '../schemas';
import type { EmployeeFilters } from '../types';

export const useEmployeesQuery = (filters: EmployeeFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => getEmployees(filters),
    enabled,
  });
};

export const useEmployeeQuery = (id: string) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
    enabled: Boolean(id),
  });
};

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeFormData) => createEmployee(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};

export const useUpdateEmployeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmployeeFormData> }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
      void queryClient.invalidateQueries({ queryKey: ['employee'] });
    },
  });
};

export const useDeleteEmployeeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
};
