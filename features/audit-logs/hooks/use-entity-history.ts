import { useQuery } from '@tanstack/react-query';

import { getEntityAuditHistory } from '../api/audit-log-api';
import type { AuditLog } from '../types';

interface UseEntityHistoryOptions {
  entityType: string;
  entityId?: string;
  limit?: number;
  enabled?: boolean;
}

export const useEntityHistoryQuery = ({
  entityType,
  entityId,
  limit = 50,
  enabled = true,
}: UseEntityHistoryOptions) => {
  return useQuery({
    queryKey: ['entity-history', entityType, entityId, limit],
    queryFn: async () => {
      if (!entityId) {
        return { data: [] as AuditLog[], pagination: { total: 0, page: 1, limit, totalPages: 0 } };
      }
      return getEntityAuditHistory(entityType, entityId, limit);
    },
    enabled: Boolean(enabled && entityType && entityId),
  });
};
