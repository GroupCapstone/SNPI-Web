import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createSchool,
  deleteSchool,
  getSchoolById,
  getSchools,
  updateSchool,
} from '../api/school-api';
import type { SchoolFormData } from '../schemas';
import type { SchoolFilters } from '../types';

export const useSchoolsQuery = (filters: SchoolFilters = {}) => {
  return useQuery({
    queryKey: ['schools', filters],
    queryFn: () => getSchools(filters),
  });
};

export const useSchoolQuery = (id: string) => {
  return useQuery({
    queryKey: ['school', id],
    queryFn: () => getSchoolById(id),
    enabled: Boolean(id),
  });
};

export const useCreateSchoolMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SchoolFormData) => createSchool(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
};

export const useUpdateSchoolMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SchoolFormData> }) =>
      updateSchool(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['schools'] });
      void queryClient.invalidateQueries({ queryKey: ['school'] });
    },
  });
};

export const useDeleteSchoolMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchool(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['schools'] });
    },
  });
};
