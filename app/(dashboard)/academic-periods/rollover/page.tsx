import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CalendarRange, CheckCircle2, Repeat } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { RolloverPlanList } from '@/features/rollover/components/rollover-plan-list';
import { RolloverWizard } from '@/features/rollover/components/rollover-wizard';

export const metadata: Metadata = {
  title: 'Academic Rollover Center | SNPI Management System',
  description:
    'End-of-term and end-of-year rollover engine: pre-close validation, class carrying, student progression, and draft timetable rollover.',
};

export default function AcademicRolloverPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/academic-periods"
              className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-[#023e8a]"
            >
              <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Academic Periods
            </Link>
          </div>
          <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <Repeat className="h-6 w-6 text-[#023e8a]" /> Academic Period & Year Rollover Engine
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Execute end-of-period closing, advance student enrollments, carry class instances, and
            set up target period operations safely without overwriting historical data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/term-completion">
            <Button variant="outline" size="sm">
              <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-600" /> Term Completion
            </Button>
          </Link>
          <Link href="/academic-years">
            <Button variant="outline" size="sm">
              <CalendarRange className="mr-1.5 h-4 w-4 text-[#023e8a]" /> Academic Years
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Guided Wizard */}
      <RolloverWizard />

      {/* Historical Rollover Audit Trail */}
      <div className="pt-6">
        <RolloverPlanList />
      </div>
    </div>
  );
}
