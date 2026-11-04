import { useQuery } from '@tanstack/react-query';

import {
  getAcademicHonorRollApi,
  getDashboardActionItems,
  getFinancePulseApi,
  getHrPulseApi,
  getStudentAffairsPulseApi,
} from '../api/dashboard-api';
import type { AcademicHonorRollFilters, DashboardActionItemsFilters } from '../types';

export const DASHBOARD_REFRESH_INTERVAL_MS = 30_000;

const liveDashboardQueryOptions = {
  refetchInterval: DASHBOARD_REFRESH_INTERVAL_MS,
  refetchIntervalInBackground: false,
  refetchOnWindowFocus: 'always' as const,
  refetchOnReconnect: true,
  staleTime: 15_000,
  retry: 2,
};

export const useDashboardActionItemsQuery = (
  filters: DashboardActionItemsFilters = {},
  enabled = true,
) =>
  useQuery({
    queryKey: ['dashboard-action-items', filters],
    queryFn: () => getDashboardActionItems(filters),
    enabled,
    ...liveDashboardQueryOptions,
  });

export const useFinancePulseQuery = (filters: DashboardActionItemsFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['dashboard-finance-pulse', filters],
    queryFn: () => getFinancePulseApi(filters),
    enabled,
    ...liveDashboardQueryOptions,
  });

export const useStudentAffairsPulseQuery = (
  filters: DashboardActionItemsFilters = {},
  enabled = true,
) =>
  useQuery({
    queryKey: ['dashboard-student-affairs-pulse', filters],
    queryFn: () => getStudentAffairsPulseApi(filters),
    enabled,
    ...liveDashboardQueryOptions,
  });

export const useHrPulseQuery = (filters: DashboardActionItemsFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['dashboard-hr-pulse', filters],
    queryFn: () => getHrPulseApi(filters),
    enabled,
    ...liveDashboardQueryOptions,
  });

export const useAcademicHonorRollQuery = (filters: AcademicHonorRollFilters = {}, enabled = true) =>
  useQuery({
    queryKey: ['dashboard-academic-honor-roll', filters],
    queryFn: () => getAcademicHonorRollApi(filters),
    enabled,
    ...liveDashboardQueryOptions,
  });
