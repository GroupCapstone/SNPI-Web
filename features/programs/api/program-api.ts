import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { ProgramFormData } from '../schemas';
import type { Program, ProgramFilters } from '../types';

export const getPrograms = async (filters: ProgramFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<Program>>(`/programs${buildQueryString(filters)}`);
};

export const createProgram = async (data: ProgramFormData) => {
  return apiClient.post<ApiSuccessResponse<Program>>('/programs', data);
};

export const updateProgram = async (id: string, data: Partial<ProgramFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Program>>(`/programs/${id}`, data);
};

export const deleteProgram = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/programs/${id}`);
};
