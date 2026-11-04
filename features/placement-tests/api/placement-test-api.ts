import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  CreatePlacementTestPayload,
  PlacementTest,
  PlacementTestQueryFilters,
  UpdatePlacementTestPayload,
} from '../types';

export const getPlacementTestsApi = async (
  filters?: PlacementTestQueryFilters,
): Promise<ApiPaginatedResponse<PlacementTest>> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.search) params.append('search', filters.search);
  if (filters?.registrationId) params.append('registrationId', filters.registrationId);
  if (filters?.studentId) params.append('studentId', filters.studentId);
  if (filters?.schoolId) params.append('schoolId', filters.schoolId);
  if (filters?.branchId && filters.branchId !== 'all') params.append('branchId', filters.branchId);
  if (filters?.programId) params.append('programId', filters.programId);
  if (filters?.recommendedLevelId) params.append('recommendedLevelId', filters.recommendedLevelId);
  if (filters?.status) params.append('status', filters.status);
  if (filters?.sortBy) params.append('sortBy', filters.sortBy);
  if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<PlacementTest>>(
    `/placement-tests${query ? `?${query}` : ''}`,
  );
};

export const getPlacementTestByIdApi = async (
  id: string,
): Promise<ApiSuccessResponse<PlacementTest>> => {
  return apiClient.get<ApiSuccessResponse<PlacementTest>>(`/placement-tests/${id}`);
};

export const createPlacementTestApi = async (
  payload: CreatePlacementTestPayload,
): Promise<ApiSuccessResponse<PlacementTest>> => {
  return apiClient.post<ApiSuccessResponse<PlacementTest>>('/placement-tests', payload);
};

export const updatePlacementTestApi = async (
  id: string,
  payload: UpdatePlacementTestPayload,
): Promise<ApiSuccessResponse<PlacementTest>> => {
  return apiClient.patch<ApiSuccessResponse<PlacementTest>>(`/placement-tests/${id}`, payload);
};

export const deletePlacementTestApi = async (id: string): Promise<ApiSuccessResponse<null>> => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/placement-tests/${id}`);
};
