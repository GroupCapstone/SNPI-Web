import { getApiBaseUrl } from '@/lib/env';
import { apiClient, getAccessToken, performTokenRefresh } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';

import type {
  MonthlyReportFilters,
  MonthlyReportOverview,
  OfficialDocument,
  ReportDocumentFilters,
  ReportPreview,
} from '../types';

export const getReportCatalog = async () =>
  apiClient.get<ApiSuccessResponse<Record<string, unknown>>>('/reports/catalog');

export const getOfficialDocuments = async (filters: ReportDocumentFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.type) params.set('type', filters.type);
  if (filters.branchId) params.set('branchId', filters.branchId);
  if (filters.studentId) params.set('studentId', filters.studentId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  const query = params.toString();
  return apiClient.get<ApiPaginatedResponse<OfficialDocument>>(
    `/reports/documents${query ? `?${query}` : ''}`,
  );
};

export const getMonthlyReportOverview = async (filters: MonthlyReportFilters) => {
  const params = new URLSearchParams({ year: String(filters.year) });
  if (filters.month) params.set('month', String(filters.month));
  if (filters.search) params.set('search', filters.search);
  if (filters.paymentCurrency) params.set('paymentCurrency', filters.paymentCurrency);
  if (filters.branchId) params.set('branchId', filters.branchId);
  if (filters.academicYearId) params.set('academicYearId', filters.academicYearId);
  if (filters.classId) params.set('classId', filters.classId);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  return apiClient.get<ApiSuccessResponse<MonthlyReportOverview>>(
    `/reports/monthly-overview?${params.toString()}`,
  );
};

export const getReportCardPreview = async (termResultId: string) =>
  apiClient.get<ApiSuccessResponse<ReportPreview>>(`/reports/report-cards/${termResultId}`);

export const generateReportCard = async (termResultId: string) =>
  apiClient.post<ApiSuccessResponse<OfficialDocument>>(
    `/reports/report-cards/${termResultId}/generate`,
  );

export const getCertificatePreview = async (termResultId: string) =>
  apiClient.get<ApiSuccessResponse<ReportPreview>>(`/reports/certificates/${termResultId}`);

export const generateCertificate = async (termResultId: string) =>
  apiClient.post<ApiSuccessResponse<OfficialDocument>>(
    `/reports/certificates/${termResultId}/generate`,
  );

export interface CertificateVerification {
  valid: boolean;
  documentNumber: string;
  generatedAt: string;
  contentHash?: string;
  ledger?: {
    network: string;
    channel: string;
    chaincode: string;
    status: string;
    contentHash: string;
    computedHash: string;
    hashAlgorithm: string;
    verifiedAt: string;
    ledgerRecord: {
      blockHeight: number;
      transactionId: string;
      merkleRoot: string;
    };
  };
  fabricCredentials?: {
    mspId: string;
    signingIdentity: string;
    peerNode: string;
    ordererEndpoint: string;
    caCertFingerprint: string;
  };
  student: Record<string, unknown>;
  academic: Record<string, unknown>;
  completionDate?: string;
  summary: Record<string, unknown>;
  issuer: Record<string, unknown>;
}

export const verifyCertificate = async (code: string) =>
  apiClient.get<ApiSuccessResponse<CertificateVerification>>(
    `/reports/certificates/verify/${encodeURIComponent(code)}`,
  );

export const getTranscriptPreview = async (studentId: string) =>
  apiClient.get<ApiSuccessResponse<ReportPreview>>(`/reports/transcripts/${studentId}`);

export const generateTranscript = async (studentId: string) =>
  apiClient.post<ApiSuccessResponse<OfficialDocument>>(
    `/reports/transcripts/${studentId}/generate`,
  );

export const getReceiptPreview = async (paymentId: string) =>
  apiClient.get<ApiSuccessResponse<ReportPreview>>(`/reports/receipts/${paymentId}`);

export const getInvoicePreview = async (paymentId: string) =>
  apiClient.get<ApiSuccessResponse<ReportPreview>>(`/reports/invoices/${paymentId}`);

const requestPdf = async (path: string, retry = false): Promise<Blob> => {
  const token = getAccessToken();
  const clientApiKey =
    process.env.NEXT_PUBLIC_CLIENT_API_KEY || process.env.BACKEND_CLIENT_API_KEY || '';
  const headers: Record<string, string> = {
    Accept: 'application/pdf',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (clientApiKey) headers['X-Client-Api-Key'] = clientApiKey;

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: 'include',
    headers,
  });
  if (response.status === 401 && !retry) {
    const refreshed = await performTokenRefresh();
    if (refreshed?.data) return requestPdf(path, true);
  }
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(payload.message ?? 'Unable to generate PDF');
  }
  return response.blob();
};

export const openOfficialPdf = async (path: string): Promise<void> => {
  const target = window.open('about:blank', '_blank');
  try {
    const blob = await requestPdf(path);
    const url = URL.createObjectURL(blob);
    if (target) target.location.href = url;
    else {
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.click();
    }
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    target?.close();
    throw error;
  }
};
