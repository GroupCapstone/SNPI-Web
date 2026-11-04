import type { Metadata } from 'next';
import { TermResultTable } from '@/features/term-results/components/term-result-table';

export const metadata: Metadata = {
  title: 'Student Promotion & Repeat Records | SNPI Management System',
  description:
    'Track academic promotion, level progression, and repeat status across all student cohorts.',
};

export default function PromotionsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Promotion / Repeat Records
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Historical record and status tracking of student level promotions, course completions, and
          repetition assignments.
        </p>
      </div>

      <TermResultTable mode="promotions" />
    </div>
  );
}
