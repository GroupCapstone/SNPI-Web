import { apiClient } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';
import type { AcademicYear, AcademicYearFilters, AcademicYearPayload } from '../types';

export const getAcademicYears = async (
  filters?: AcademicYearFilters | unknown,
): Promise<AcademicYear[]> => {
  const cleanFilters: AcademicYearFilters =
    filters && typeof filters === 'object' && !('queryKey' in (filters as Record<string, unknown>))
      ? (filters as AcademicYearFilters)
      : {};

  const params = new URLSearchParams();
  if (cleanFilters.search) params.append('search', cleanFilters.search);
  if (cleanFilters.status && cleanFilters.status !== 'all')
    params.append('status', cleanFilters.status);
  if (cleanFilters.schoolId && cleanFilters.schoolId !== 'all')
    params.append('schoolId', cleanFilters.schoolId);
  if (cleanFilters.isCurrent !== undefined)
    params.append('isCurrent', String(cleanFilters.isCurrent));

  const query = params.toString();
  const url = `/academic-years${query ? `?${query}` : ''}`;
  const response = await apiClient.get<ApiSuccessResponse<AcademicYear[]>>(url);
  return response.data;
};

export const getAcademicYearById = async (id: string): Promise<AcademicYear> => {
  const response = await apiClient.get<ApiSuccessResponse<AcademicYear>>(`/academic-years/${id}`);
  return response.data;
};

export const createAcademicYear = async (payload: AcademicYearPayload): Promise<AcademicYear> => {
  const response = await apiClient.post<ApiSuccessResponse<AcademicYear>>(
    '/academic-years',
    payload,
  );
  return response.data;
};

export const updateAcademicYear = async (
  id: string,
  payload: Partial<AcademicYearPayload>,
): Promise<AcademicYear> => {
  const response = await apiClient.patch<ApiSuccessResponse<AcademicYear>>(
    `/academic-years/${id}`,
    payload,
  );
  return response.data;
};

export const deleteAcademicYear = async (id: string): Promise<null> => {
  const response = await apiClient.delete<ApiSuccessResponse<null>>(`/academic-years/${id}`);
  return response.data;
};
