'use client';

import * as React from 'react';
import { IntakeTable } from '@/features/intakes/components/intake-table';
import { useTranslation } from '@/lib/i18n';

export default function IntakesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t.intakes.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.intakes.subtitle}</p>
      </div>

      <IntakeTable />
    </div>
  );
}
