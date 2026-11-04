import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  getCertificatePreview,
  getCertificates,
  issueCertificate,
  verifyCertificate,
} from './certificate-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('Certificates API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /reports/documents?type=certificate with default query', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Certificates retrieved',
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await getCertificates();
    expect(apiClient.get).toHaveBeenCalledWith('/reports/documents?type=certificate');
  });

  it('calls GET /reports/documents with filter parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Certificates retrieved',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });

    await getCertificates({ branchId: 'br-1', studentId: 'stu-1' });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/reports/documents?type=certificate&branchId=br-1&studentId=stu-1',
    );
  });

  it('calls GET /reports/certificates/:id to get preview', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Preview loaded',
      data: { payload: {} as never },
    });

    await getCertificatePreview('tr-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/certificates/tr-123');
  });

  it('calls POST /reports/certificates/:id/generate to issue official certificate', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Certificate generated',
      data: { _id: 'doc-1', documentNumber: 'CRT-00000001' },
    });

    await issueCertificate('tr-123');
    expect(apiClient.post).toHaveBeenCalledWith('/reports/certificates/tr-123/generate');
  });

  it('calls the public certificate verification endpoint with an encoded code', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Certificate verified',
      data: { valid: true, documentNumber: 'CRT-00000001' },
    });

    await verifyCertificate('CRT-00000001');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/certificates/verify/CRT-00000001');
  });
});
