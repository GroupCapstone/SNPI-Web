import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCertificatePreview,
  getCertificates,
  issueCertificate,
  verifyCertificate,
} from '../api/certificate-api';
import type { CertificateFilters } from '../types';

export const useCertificatesQuery = (filters: CertificateFilters = {}, enabled = true) => {
  return useQuery({
    queryKey: ['certificates', filters],
    queryFn: () => getCertificates(filters),
    enabled,
  });
};

export const useCertificatePreviewQuery = (termResultId?: string) => {
  return useQuery({
    queryKey: ['certificates', 'preview', termResultId],
    queryFn: () => getCertificatePreview(termResultId!),
    enabled: Boolean(termResultId),
  });
};

export const useIssueCertificateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (termResultId: string) => issueCertificate(termResultId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['certificates'] });
      void queryClient.invalidateQueries({ queryKey: ['official-documents'] });
    },
  });
};

export const useVerifyCertificateQuery = (code?: string) => {
  return useQuery({
    queryKey: ['certificates', 'verify', code],
    queryFn: () => verifyCertificate(code!),
    enabled: Boolean(code),
  });
};
