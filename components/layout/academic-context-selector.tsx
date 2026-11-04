'use client';

import * as React from 'react';
import { Calendar, ChevronDown, History, Lock, RotateCcw } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAcademicContext } from '@/components/providers/academic-context-provider';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const AcademicContextSelector: React.FC = () => {
  const {
    academicYears,
    academicPeriods,
    selectedAcademicYear,
    selectedAcademicPeriod,
    setSelectedAcademicYearId,
    setSelectedAcademicPeriodId,
    isHistoricalView,
    isContextReadOnly,
    resetToActive,
    isLoading,
  } = useAcademicContext();

  const { t, isKhmer } = useTranslation();

  const [isYearOpen, setIsYearOpen] = React.useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = React.useState(false);
  const yearDropdownRef = React.useRef<HTMLDivElement>(null);
  const periodDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
      if (periodDropdownRef.current && !periodDropdownRef.current.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading || academicYears.length === 0) {
    return (
      <div className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-400">
        <Calendar className="size-3.5 animate-pulse" />
        <span>{isKhmer ? 'កំពុងផ្ទុកទិន្នន័យ...' : 'Loading Academic Context...'}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Historical Read-Only Indicator Badge */}
      {isHistoricalView && (
        <div className="hidden items-center gap-1.5 sm:flex">
          <Badge tone="warning" className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium">
            {isContextReadOnly ? <Lock className="size-3" /> : <History className="size-3" />}
            <span>
              {isKhmer
                ? `ទិន្នន័យប្រវត្តិ ${isContextReadOnly ? '(មើលប៉ុណ្ណោះ)' : ''}`
                : `Historical ${isContextReadOnly ? '(Read-Only)' : 'View'}`}
            </span>
          </Badge>
          <Button
            size="sm"
            variant="ghost"
            onClick={resetToActive}
            title={
              isKhmer ? 'ប្តូរទៅកាន់វគ្គកំពុងដំណើរការ' : 'Reset to current active academic period'
            }
            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="mr-1 size-3" />
            {t.topbar.activePeriod}
          </Button>
        </div>
      )}

      {/* Academic Year Dropdown */}
      <div className="relative shrink-0" ref={yearDropdownRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsYearOpen(!isYearOpen);
            setIsPeriodOpen(false);
          }}
          className={cn(
            'h-9 shrink-0 gap-1.5 border-slate-200 text-xs font-medium whitespace-nowrap',
            isHistoricalView
              ? 'border-amber-300 bg-amber-50/50 text-slate-900 hover:bg-amber-50'
              : 'text-slate-700 hover:bg-slate-50',
          )}
        >
          <Calendar className="size-3.5 shrink-0 text-slate-500" />
          <span className="whitespace-nowrap">{selectedAcademicYear?.name ?? 'Academic Year'}</span>
          <ChevronDown className="size-3 shrink-0 text-slate-400" />
        </Button>

        {isYearOpen && (
          <div className="absolute top-full right-0 z-50 mt-1 w-56 rounded-lg border border-slate-200 bg-white p-1.5">
            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase">
              Select Academic Year
            </div>
            <div className="my-1 h-px bg-slate-100" />
            <div className="max-h-60 overflow-y-auto">
              {academicYears.map((year) => (
                <button
                  key={year._id}
                  type="button"
                  onClick={() => {
                    setSelectedAcademicYearId(year._id);
                    setIsYearOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors',
                    selectedAcademicYear?._id === year._id
                      ? 'bg-slate-100 font-medium text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50',
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{year.name}</span>
                    <span className="text-xs text-slate-400">{year.code}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {year.status === 'active' && (
                      <Badge tone="success" className="px-1.5 py-0 text-xs">
                        Active
                      </Badge>
                    )}
                    {year.status === 'closed' && (
                      <Badge tone="neutral" className="px-1.5 py-0 text-xs">
                        Closed
                      </Badge>
                    )}
                    {(year.status as string) === 'archived' && (
                      <Badge tone="neutral" className="px-1.5 py-0 text-xs">
                        Archived
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Academic Period Dropdown */}
      {academicPeriods.length > 0 && (
        <div className="relative shrink-0" ref={periodDropdownRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsPeriodOpen(!isPeriodOpen);
              setIsYearOpen(false);
            }}
            className={cn(
              'h-9 shrink-0 gap-1.5 border-slate-200 text-xs font-medium whitespace-nowrap',
              isHistoricalView
                ? 'border-amber-300 bg-amber-50/50 text-slate-900 hover:bg-amber-50'
                : 'text-slate-700 hover:bg-slate-50',
            )}
          >
            <span className="whitespace-nowrap">{selectedAcademicPeriod?.name ?? 'Period'}</span>
            <ChevronDown className="size-3 shrink-0 text-slate-400" />
          </Button>

          {isPeriodOpen && (
            <div className="absolute top-full right-0 z-50 mt-1 w-52 rounded-lg border border-slate-200 bg-white p-1.5">
              <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase">
                Select Term / Period
              </div>
              <div className="my-1 h-px bg-slate-100" />
              <div className="max-h-60 overflow-y-auto">
                {academicPeriods.map((period) => (
                  <button
                    key={period._id}
                    type="button"
                    onClick={() => {
                      setSelectedAcademicPeriodId(period._id);
                      setIsPeriodOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-colors',
                      selectedAcademicPeriod?._id === period._id
                        ? 'bg-slate-100 font-medium text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50',
                    )}
                  >
                    <span className="font-medium text-slate-900">{period.name}</span>
                    <div className="flex items-center gap-1">
                      {period.status === 'active' && (
                        <Badge tone="success" className="px-1.5 py-0 text-xs">
                          Active
                        </Badge>
                      )}
                      {(period.status === 'completed' ||
                        (period.status as string) === 'closed') && (
                        <Badge tone="neutral" className="px-1.5 py-0 text-xs">
                          Closed
                        </Badge>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
