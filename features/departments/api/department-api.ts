import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { DepartmentFormData } from '../schemas';
import type { Department, DepartmentFilters } from '../types';

export const getDepartments = async (filters: DepartmentFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<Department>>(
    `/departments${buildQueryString(filters)}`,
  );
};

export const getDepartmentById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Department>>(`/departments/${id}`);
};

export const createDepartment = async (data: DepartmentFormData) => {
  return apiClient.post<ApiSuccessResponse<Department>>('/departments', data);
};

export const updateDepartment = async (id: string, data: Partial<DepartmentFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Department>>(`/departments/${id}`, data);
};

export const deleteDepartment = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/departments/${id}`);
};
