import type { Metadata } from 'next';
import { TermResultTable } from '@/features/term-results/components/term-result-table';

export const metadata: Metadata = {
  title: 'Term Completion Workflow | SNPI Management System',
  description:
    'Complete academic terms, close student enrollments, and automatically re-enroll promoted students into the next period.',
};

export default function TermCompletionPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Term Completion Workflow
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Finalize current period enrollments and transition students to their next level offering /
          next academic period.
        </p>
      </div>

      <TermResultTable mode="completion" />
    </div>
  );
}
