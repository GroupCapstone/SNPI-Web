import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type { CertificateFilters, CertificateItem, CertificatePayload } from '../types';

export const getCertificates = async (filters: CertificateFilters = {}) => {
  const params = new URLSearchParams({ type: 'certificate' });
  if (filters.branchId) params.set('branchId', filters.branchId);
  if (filters.studentId) params.set('studentId', filters.studentId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));

  return apiClient.get<ApiPaginatedResponse<CertificateItem>>(
    `/reports/documents?${params.toString()}`,
  );
};

export const getCertificatePreview = async (termResultId: string) => {
  return apiClient.get<ApiSuccessResponse<{ payload: CertificatePayload }>>(
    `/reports/certificates/${termResultId}`,
  );
};

export const issueCertificate = async (termResultId: string) => {
  return apiClient.post<ApiSuccessResponse<CertificateItem>>(
    `/reports/certificates/${termResultId}/generate`,
  );
};

export const verifyCertificate = async (code: string) => {
  return apiClient.get<ApiSuccessResponse<Record<string, unknown>>>(
    `/reports/certificates/verify/${encodeURIComponent(code)}`,
  );
};
