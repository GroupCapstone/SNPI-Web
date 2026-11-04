import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { EmployeeFormData } from '../schemas';
import type { Employee, EmployeeFilters } from '../types';

export const getEmployees = async (filters: EmployeeFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.departmentId) params.append('departmentId', filters.departmentId);
  if (filters.positionId) params.append('positionId', filters.positionId);
  if (filters.status) params.append('status', filters.status);
  if (filters.employmentType) params.append('employmentType', filters.employmentType);
  if (filters.educationLevel) params.append('educationLevel', filters.educationLevel);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

  const queryString = params.toString();
  const url = `/employees${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Employee>>(url);
};

export const getEmployeeById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Employee>>(`/employees/${id}`);
};

export const createEmployee = async (data: EmployeeFormData) => {
  return apiClient.post<ApiSuccessResponse<Employee>>('/employees', data);
};

export const updateEmployee = async (id: string, data: Partial<EmployeeFormData>) => {
  return apiClient.patch<ApiSuccessResponse<Employee>>(`/employees/${id}`, data);
};

export const deleteEmployee = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/employees/${id}`);
};
