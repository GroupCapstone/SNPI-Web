import { useQuery } from '@tanstack/react-query';

import { getAuditLogs } from '../api/audit-log-api';
import type { AuditLogFilters } from '../types';

export const useAuditLogsQuery = (filters: AuditLogFilters = {}) => {
  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () => getAuditLogs(filters),
  });
};
