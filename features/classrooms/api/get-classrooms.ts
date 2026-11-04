import { apiClient } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';

export interface ClassroomItem {
  _id: string;
  branchId: string | { _id: string; branchCode: string; branchNameEn: string };
  code: string;
  name: string;
  building?: string;
  floor?: string;
  capacity: number;
  status: string;
}

export const getClassrooms = async (branchId?: string): Promise<ClassroomItem[]> => {
  const query = branchId ? `?branchId=${encodeURIComponent(branchId)}` : '';
  const response = await apiClient.get<ApiSuccessResponse<ClassroomItem[]>>(`/classrooms${query}`);
  return response.data;
};
