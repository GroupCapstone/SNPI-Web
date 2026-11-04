import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createRegistrationApi,
  deleteRegistrationApi,
  getRegistrationByIdApi,
  getRegistrationsApi,
  updateRegistrationApi,
} from '../api/registration-api';
import type {
  CreateRegistrationPayload,
  RegistrationQueryFilters,
  UpdateRegistrationPayload,
} from '../types';

export const REGISTRATION_QUERY_KEY = 'registrations';

export const useRegistrationsQuery = (filters?: RegistrationQueryFilters) => {
  return useQuery({
    queryKey: [REGISTRATION_QUERY_KEY, filters],
    queryFn: () => getRegistrationsApi(filters),
  });
};

export const useRegistrationQuery = (id?: string) => {
  return useQuery({
    queryKey: [REGISTRATION_QUERY_KEY, id],
    queryFn: () => getRegistrationByIdApi(id!),
    enabled: Boolean(id),
  });
};

export const useCreateRegistrationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRegistrationPayload) => createRegistrationApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REGISTRATION_QUERY_KEY] });
    },
  });
};

export const useUpdateRegistrationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateRegistrationPayload }) =>
      updateRegistrationApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [REGISTRATION_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [REGISTRATION_QUERY_KEY, variables.id] });
    },
  });
};

export const useDeleteRegistrationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRegistrationApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REGISTRATION_QUERY_KEY] });
    },
  });
};
