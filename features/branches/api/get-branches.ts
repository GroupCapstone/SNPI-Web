import { apiClient } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';

export interface BranchItem {
  _id: string;
  branchCode: string;
  branchNameEn: string;
  branchNameKh: string;
  address?: string;
  phone?: string;
  status: string;
}

export const getBranches = async (): Promise<BranchItem[]> => {
  const response = await apiClient.get<ApiSuccessResponse<BranchItem[]>>('/branches');
  return response.data;
};
