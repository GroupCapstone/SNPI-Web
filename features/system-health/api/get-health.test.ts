import { afterEach, describe, expect, it, vi } from 'vitest';

import { getHealth } from './get-health';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getHealth', () => {
  it('loads and validates the backend health response', async () => {
    const payload = {
      success: true,
      message: 'Service is healthy',
      data: {
        service: 'SNP-SMS API',
        status: 'healthy',
        version: '0.1.0',
        timestamp: '2026-08-29T00:00:00.000Z',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(getHealth()).resolves.toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/health',
      expect.objectContaining({ credentials: 'include' }),
    );
  });
});
