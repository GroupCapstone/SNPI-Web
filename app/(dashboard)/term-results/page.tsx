'use client';

import { TermResultTable } from '@/features/term-results/components/term-result-table';
import { useTranslation } from '@/lib/i18n';

export default function TermResultsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t.termResults.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.termResults.subtitle}</p>
      </div>

      <TermResultTable mode="results" />
    </div>
  );
}
