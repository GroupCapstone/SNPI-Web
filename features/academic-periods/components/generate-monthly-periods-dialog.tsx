'use client';

import * as React from 'react';
import { CalendarDays, CheckCircle2, Loader2, Sparkles } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useTranslation } from '@/lib/i18n';
import {
  getAcademicYears,
  type AcademicYearItem,
} from '@/features/academic-years/api/get-academic-years';
import { useGenerateMonthlyPeriodsMutation } from '../hooks/use-academic-periods';

interface GenerateMonthlyPeriodsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultAcademicYearId?: string;
  onSuccess?: () => void;
}

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_NAMES_KH = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ',
];

export const GenerateMonthlyPeriodsDialog: React.FC<GenerateMonthlyPeriodsDialogProps> = ({
  open,
  onOpenChange,
  defaultAcademicYearId,
  onSuccess,
}) => {
  const { isKhmer } = useTranslation();
  const [academicYears, setAcademicYears] = React.useState<AcademicYearItem[]>([]);
  const [academicYearId, setAcademicYearId] = React.useState(defaultAcademicYearId || '');
  const [calendarYear, setCalendarYear] = React.useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = React.useState(1);
  const [monthCount, setMonthCount] = React.useState(12);
  const [error, setError] = React.useState<string | null>(null);
  const [resultSummary, setResultSummary] = React.useState<{
    createdCount: number;
    skippedCount: number;
  } | null>(null);

  const generateMutation = useGenerateMonthlyPeriodsMutation();

  React.useEffect(() => {
    if (open) {
      setError(null);
      setResultSummary(null);
      getAcademicYears()
        .then((years) => {
          setAcademicYears(years);
          if (!academicYearId && years.length > 0) {
            const current = years.find((y) => y.isCurrent) || years[0];
            setAcademicYearId(current._id);
            if (current.startDate) {
              const y = new Date(current.startDate).getFullYear();
              if (!isNaN(y)) setCalendarYear(y);
            }
          }
        })
        .catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : 'Failed to load academic years';
          setError(msg);
        });
    }
  }, [open, academicYearId]);

  const handleYearChange = (id: string) => {
    setAcademicYearId(id);
    const selected = academicYears.find((y) => y._id === id);
    if (selected?.startDate) {
      const y = new Date(selected.startDate).getFullYear();
      if (!isNaN(y)) setCalendarYear(y);
    }
  };

  const handleGenerate = async () => {
    if (!academicYearId) {
      setError(isKhmer ? 'សូមជ្រើសរើសឆ្នាំសិក្សា' : 'Please select an academic year');
      return;
    }
    setError(null);
    try {
      const res = await generateMutation.mutateAsync({
        academicYearId,
        calendarYear,
        startMonth,
        monthCount,
      });
      setResultSummary({
        createdCount: res.data.createdCount,
        skippedCount: res.data.skippedCount,
      });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to generate monthly periods';
      setError(msg);
    }
  };

  const previewItems = React.useMemo(() => {
    const items: Array<{ code: string; name: string }> = [];
    for (let i = 0; i < monthCount; i++) {
      const currentMonthIndex = (startMonth - 1 + i) % 12;
      const yearOffset = Math.floor((startMonth - 1 + i) / 12);
      const year = calendarYear + yearOffset;
      const monthNumber = currentMonthIndex + 1;
      const code = `${year}-M${String(monthNumber).padStart(2, '0')}`;
      const name = `${MONTH_NAMES_KH[currentMonthIndex]} (${MONTH_NAMES_EN[currentMonthIndex]} ${year})`;
      items.push({ code, name });
    }
    return items;
  }, [calendarYear, startMonth, monthCount]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5.5 shrink-0 text-[#023e8a]" />
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                {isKhmer
                  ? 'បង្កើតវគ្គសិក្សាប្រចាំខែ (១២ ខែ)'
                  : 'Generate 12 Monthly Academic Periods'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {isKhmer
                  ? 'បង្កើតវគ្គសិក្សាពីខែមករា ដល់ ធ្នូ ដោយស្វ័យប្រវត្តិតាមប្រតិទិនសិក្សា'
                  : 'Automatically generate 12 monthly periods (Jan - Dec) with localized titles and dates'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {error && (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            {error}
          </div>
        )}

        {resultSummary ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>
                {isKhmer
                  ? 'បង្កើតវគ្គសិក្សាប្រចាំខែបានជោគជ័យ!'
                  : 'Monthly Periods Generated Successfully!'}
              </span>
            </div>
            <p className="mt-2 text-xs text-emerald-700">
              {isKhmer
                ? `បានបង្កើតថ្មី: ${resultSummary.createdCount} ខែ | រំលង (មានរួចហើយ): ${resultSummary.skippedCount} ខែ`
                : `Created: ${resultSummary.createdCount} period(s) | Skipped (already existed): ${resultSummary.skippedCount} period(s)`}
            </p>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
              >
                {isKhmer ? 'បិទ' : 'Done'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold text-slate-700">
                  {isKhmer ? 'ឆ្នាំសិក្សា' : 'Academic Year'} *
                </Label>
                <Select
                  value={academicYearId}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="mt-1 h-9 text-xs"
                >
                  <option value="">
                    {isKhmer ? '-- ជ្រើសរើសឆ្នាំសិក្សា --' : '-- Select Academic Year --'}
                  </option>
                  {academicYears.map((ay) => (
                    <option key={ay._id} value={ay._id}>
                      {ay.name} ({ay.code})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">
                  {isKhmer ? 'ឆ្នាំប្រតិទិន' : 'Calendar Year'} *
                </Label>
                <Input
                  type="number"
                  min={2020}
                  max={2050}
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(Number(e.target.value))}
                  className="mt-1 h-9 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">
                  {isKhmer ? 'ខែចាប់ផ្តើម' : 'Start Month'}
                </Label>
                <Select
                  value={String(startMonth)}
                  onChange={(e) => setStartMonth(Number(e.target.value))}
                  className="mt-1 h-9 text-xs"
                >
                  {MONTH_NAMES_EN.map((name, idx) => (
                    <option key={name} value={String(idx + 1)}>
                      {idx + 1} - {MONTH_NAMES_KH[idx]} ({name})
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold text-slate-700">
                  {isKhmer ? 'ចំនួនខែសរុប' : 'Total Months'}
                </Label>
                <Select
                  value={String(monthCount)}
                  onChange={(e) => setMonthCount(Number(e.target.value))}
                  className="mt-1 h-9 text-xs"
                >
                  {[3, 6, 10, 12].map((cnt) => (
                    <option key={cnt} value={String(cnt)}>
                      {cnt} {isKhmer ? 'ខែ' : 'Months'}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4 text-[#023e8a]" />
                <span>{isKhmer ? 'ទិដ្ឋភាពគំរូនៃកាលវិភាគ (Preview)' : 'Schedule Preview'}</span>
                <span className="text-xs text-slate-400">({previewItems.length} items)</span>
              </div>
              <div className="mt-2 max-h-36 overflow-y-auto rounded border border-slate-200 bg-white p-2">
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  {previewItems.map((item) => (
                    <div key={item.code} className="flex items-center justify-between py-0.5">
                      <span className="font-mono font-medium text-slate-800">{item.code}</span>
                      <span className="truncate text-slate-500">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(false)}
                disabled={generateMutation.isPending}
              >
                {isKhmer ? 'បោះបង់' : 'Cancel'}
              </Button>
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={generateMutation.isPending || !academicYearId}
                className="bg-[#023e8a] text-white hover:bg-[#00509d]"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    {isKhmer ? 'កំពុងបង្កើត...' : 'Generating...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    {isKhmer ? 'បង្កើតឥឡូវនេះ' : 'Generate Now'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
