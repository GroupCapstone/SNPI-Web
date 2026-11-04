import { afterEach, describe, expect, it, vi } from 'vitest';

import { getAuditLogs } from './audit-log-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('audit-log-api', () => {
  it('getAuditLogs builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Audit logs retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439090',
          module: 'employee',
          action: 'CREATE',
          entityType: 'Employee',
          entityId: '507f1f77bcf86cd799439005',
          timestamp: '2026-08-29T18:00:00.000Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getAuditLogs({ module: 'employee', page: 1, limit: 10 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/audit-logs?module=employee&page=1&limit=10',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
