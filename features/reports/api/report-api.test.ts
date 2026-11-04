import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  generateCertificate,
  generateReportCard,
  generateTranscript,
  getCertificatePreview,
  getMonthlyReportOverview,
  getInvoicePreview,
  getOfficialDocuments,
  getReceiptPreview,
  getReportCardPreview,
  getReportCatalog,
  getTranscriptPreview,
  verifyCertificate,
} from './report-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
  },
  getAccessToken: vi.fn(),
  performTokenRefresh: vi.fn(),
}));

describe('Report API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /reports/catalog', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Catalog loaded',
      data: { categories: [] },
    });

    await getReportCatalog();
    expect(apiClient.get).toHaveBeenCalledWith('/reports/catalog');
  });

  it('calls GET /reports/documents with filter query params', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Documents loaded',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getOfficialDocuments({ type: 'report_card', branchId: 'br-1', page: 1, limit: 10 });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/reports/documents?type=report_card&branchId=br-1&page=1&limit=10',
    );
  });

  it('calls the monthly overview with calendar and scope filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Monthly overview loaded',
      data: { year: 2026, trends: [] },
    });

    await getMonthlyReportOverview({
      year: 2026,
      month: 3,
      search: 'Dara',
      branchId: 'branch-1',
      classId: 'class-1',
      limit: 100,
    });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/reports/monthly-overview?year=2026&month=3&search=Dara&branchId=branch-1&classId=class-1&limit=100',
    );
  });

  it('calls GET and POST for report card endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Preview loaded',
      data: { snapshotSource: 'live_calculation', payload: {} },
    });
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Generated',
      data: { documentNumber: 'DOC-001' },
    });

    await getReportCardPreview('tr-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/report-cards/tr-123');

    await generateReportCard('tr-123');
    expect(apiClient.post).toHaveBeenCalledWith('/reports/report-cards/tr-123/generate');
  });

  it('calls certificate preview, generation, and public verification endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Certificate loaded',
      data: { valid: true, documentNumber: 'CRT-12345678' },
    });
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Certificate generated',
      data: { documentNumber: 'CRT-12345678' },
    });

    await getCertificatePreview('tr-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/certificates/tr-123');

    await generateCertificate('tr-123');
    expect(apiClient.post).toHaveBeenCalledWith('/reports/certificates/tr-123/generate');

    await verifyCertificate('CRT-12345678');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/certificates/verify/CRT-12345678');
  });

  it('calls GET and POST for transcript endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Preview loaded',
      data: { snapshotSource: 'live_calculation', payload: {} },
    });
    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Generated',
      data: { documentNumber: 'DOC-002' },
    });

    await getTranscriptPreview('stu-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/transcripts/stu-123');

    await generateTranscript('stu-123');
    expect(apiClient.post).toHaveBeenCalledWith('/reports/transcripts/stu-123/generate');
  });

  it('calls GET for receipt and invoice preview endpoints', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Preview loaded',
      data: { snapshotSource: 'live_calculation', payload: {} },
    });

    await getReceiptPreview('pay-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/receipts/pay-123');

    await getInvoicePreview('pay-123');
    expect(apiClient.get).toHaveBeenCalledWith('/reports/invoices/pay-123');
  });
});
