import { apiClient } from '@/lib/api-client';
import type { ApiSuccessResponse } from '@/types/api';

import { healthResponseSchema } from '../schemas';
import type { HealthData } from '../types';

export const getHealth = async (): Promise<ApiSuccessResponse<HealthData>> => {
  const response = await apiClient<unknown>('/health');
  return healthResponseSchema.parse(response);
};
