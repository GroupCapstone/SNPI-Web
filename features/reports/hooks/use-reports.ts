import { useQuery } from '@tanstack/react-query';

import {
  getMonthlyReportOverview,
  getOfficialDocuments,
  getReportCatalog,
} from '../api/report-api';
import type { MonthlyReportFilters, ReportDocumentFilters } from '../types';

export const useReportCatalogQuery = () =>
  useQuery({ queryKey: ['report-catalog'], queryFn: getReportCatalog });

export const useOfficialDocumentsQuery = (filters: ReportDocumentFilters = {}) =>
  useQuery({
    queryKey: ['official-documents', filters],
    queryFn: () => getOfficialDocuments(filters),
  });

export const useMonthlyReportOverviewQuery = (filters: MonthlyReportFilters, enabled = true) =>
  useQuery({
    queryKey: ['monthly-report-overview', filters],
    queryFn: () => getMonthlyReportOverview(filters),
    enabled,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: true,
    staleTime: 15_000,
    retry: 2,
  });
