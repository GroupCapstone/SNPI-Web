'use client';

import * as React from 'react';
import {
  useAcademicYearsQuery,
  type AcademicYear,
} from '@/features/academic-years/hooks/use-academic-years';
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import type { AcademicPeriod } from '@/features/academic-periods/types';
import { useAuth } from '@/features/auth/context/auth-context';

interface AcademicContextState {
  selectedAcademicYearId: string | null;
  selectedAcademicPeriodId: string | null;
  selectedAcademicYear: AcademicYear | null;
  selectedAcademicPeriod: AcademicPeriod | null;
  setSelectedAcademicYearId: (yearId: string | null) => void;
  setSelectedAcademicPeriodId: (periodId: string | null) => void;
  isHistoricalView: boolean;
  isContextReadOnly: boolean;
  resetToActive: () => void;
  academicYears: AcademicYear[];
  academicPeriods: AcademicPeriod[];
  isLoading: boolean;
}

const AcademicContext = React.createContext<AcademicContextState | undefined>(undefined);

const STORAGE_KEY = 'snp_sms_academic_context';

export const AcademicContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { hasPermission } = useAuth();
  const canReadYears =
    hasPermission('academic_year.view.own_branch') ||
    hasPermission('academic_year.view.all_branches');
  const canReadPeriods =
    hasPermission('academic_period.view.own_branch') ||
    hasPermission('academic_period.view.all_branches');
  const { data: yearsData, isLoading: isYearsLoading } = useAcademicYearsQuery(
    undefined,
    canReadYears,
  );
  const academicYears = React.useMemo(
    () => (Array.isArray(yearsData) ? yearsData : []),
    [yearsData],
  );

  const [selectedYearId, setSelectedYearId] = React.useState<string | null>(null);
  const [selectedPeriodId, setSelectedPeriodId] = React.useState<string | null>(null);

  // Active academic year is one with status === 'active'
  const activeYear = React.useMemo(
    () => academicYears.find((y) => y.status === 'active') ?? academicYears[0] ?? null,
    [academicYears],
  );

  const { data: periodsData, isLoading: isPeriodsLoading } = useAcademicPeriodsQuery(
    selectedYearId ? { academicYearId: selectedYearId } : {},
    canReadPeriods,
  );
  const academicPeriods = React.useMemo(
    () => (Array.isArray(periodsData) ? periodsData : []),
    [periodsData],
  );

  // Active period for the selected year
  const activePeriod = React.useMemo(
    () => academicPeriods.find((p) => p.status === 'active') ?? academicPeriods[0] ?? null,
    [academicPeriods],
  );

  // Initialize from storage or default to active year/period
  React.useEffect(() => {
    if (typeof window === 'undefined' || academicYears.length === 0) return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.yearId && academicYears.some((y) => y._id === parsed.yearId)) {
          setSelectedYearId(parsed.yearId);
          if (parsed.periodId) setSelectedPeriodId(parsed.periodId);
          return;
        }
      }
    } catch {
      // Ignore JSON parse errors
    }

    if (activeYear && !selectedYearId) {
      setSelectedYearId(activeYear._id);
    }
  }, [academicYears, activeYear, selectedYearId]);

  // Auto-select active period when year changes if not set
  React.useEffect(() => {
    if (
      academicPeriods.length > 0 &&
      (!selectedPeriodId || !academicPeriods.some((p) => p._id === selectedPeriodId))
    ) {
      setSelectedPeriodId(activePeriod?._id ?? academicPeriods[0]?._id ?? null);
    }
  }, [academicPeriods, activePeriod, selectedPeriodId]);

  // Save changes to localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined' && selectedYearId) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ yearId: selectedYearId, periodId: selectedPeriodId }),
        );
      } catch {
        // Ignore quota errors
      }
    }
  }, [selectedYearId, selectedPeriodId]);

  const selectedAcademicYear = React.useMemo(
    () => academicYears.find((y) => y._id === selectedYearId) ?? null,
    [academicYears, selectedYearId],
  );

  const selectedAcademicPeriod = React.useMemo(
    () => academicPeriods.find((p) => p._id === selectedPeriodId) ?? null,
    [academicPeriods, selectedPeriodId],
  );

  // A view is historical if the selected year or period is not the active one
  const isHistoricalView = React.useMemo(() => {
    if (!activeYear || !selectedAcademicYear) return false;
    if (selectedAcademicYear._id !== activeYear._id) return true;
    if (activePeriod && selectedAcademicPeriod && selectedAcademicPeriod._id !== activePeriod._id) {
      return true;
    }
    return false;
  }, [activeYear, selectedAcademicYear, activePeriod, selectedAcademicPeriod]);

  // Context is read-only if period is closed/finalized or year is closed/archived
  const isContextReadOnly = React.useMemo(() => {
    const yearStatus = selectedAcademicYear?.status;
    const periodStatus = selectedAcademicPeriod?.status;
    return (
      yearStatus === 'closed' ||
      (yearStatus as string) === 'archived' ||
      periodStatus === 'completed' ||
      (periodStatus as string) === 'closed' ||
      (periodStatus as string) === 'finalized'
    );
  }, [selectedAcademicYear, selectedAcademicPeriod]);

  const resetToActive = React.useCallback(() => {
    if (activeYear) {
      setSelectedYearId(activeYear._id);
      setSelectedPeriodId(activePeriod?._id ?? null);
    }
  }, [activeYear, activePeriod]);

  const value = React.useMemo<AcademicContextState>(
    () => ({
      selectedAcademicYearId: selectedYearId,
      selectedAcademicPeriodId: selectedPeriodId,
      selectedAcademicYear,
      selectedAcademicPeriod,
      setSelectedAcademicYearId: (id) => {
        setSelectedYearId(id);
        setSelectedPeriodId(null);
      },
      setSelectedAcademicPeriodId: setSelectedPeriodId,
      isHistoricalView,
      isContextReadOnly,
      resetToActive,
      academicYears,
      academicPeriods,
      isLoading: isYearsLoading || isPeriodsLoading,
    }),
    [
      selectedYearId,
      selectedPeriodId,
      selectedAcademicYear,
      selectedAcademicPeriod,
      isHistoricalView,
      isContextReadOnly,
      resetToActive,
      academicYears,
      academicPeriods,
      isYearsLoading,
      isPeriodsLoading,
    ],
  );

  return <AcademicContext.Provider value={value}>{children}</AcademicContext.Provider>;
};

export const useAcademicContext = (): AcademicContextState => {
  const context = React.useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademicContext must be used within an AcademicContextProvider');
  }
  return context;
};
