'use client';

import * as React from 'react';
import { Users } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/i18n';

export const EmployeeHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            {t.employee.title}
          </h1>
          <Badge tone="neutral">V0.1 Core Foundation</Badge>
        </div>
        <p className="mt-1 text-sm text-slate-500">{t.employee.subtitle}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Users className="size-4 text-[#00509d]" />
        <span>{t.employee.staffMasterRecords}</span>
      </div>
    </div>
  );
};
