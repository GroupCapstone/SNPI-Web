import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { BranchFormData } from '../schemas';
import type { Branch, BranchFilters } from '../types';

export const getBranches = async (filters: BranchFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.status) params.append('status', filters.status);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/branches${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Branch>>(url);
};

export const getBranchById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Branch>>(`/branches/${id}`);
};

export const createBranch = async (data: BranchFormData) => {
  return apiClient.post<ApiSuccessResponse<Branch>>('/branches', data);
};

export const updateBranch = async (id: string, data: Partial<BranchFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Branch>>(`/branches/${id}`, data);
};

export const deleteBranch = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/branches/${id}`);
};
