import { apiClient } from '@/lib/api-client';
import { buildQueryString } from '@/lib/query-params';
import type { ApiPaginatedResponse } from '@/types/api';
import type { AuditLog, AuditLogFilters } from '../types';

export const getAuditLogs = async (filters: AuditLogFilters = {}) => {
  return apiClient.get<ApiPaginatedResponse<AuditLog>>(`/audit-logs${buildQueryString(filters)}`);
};

export const getEntityAuditHistory = async (entityType: string, entityId: string, limit = 50) => {
  return getAuditLogs({
    entityType,
    entityId,
    limit,
    page: 1,
  });
};
