'use client';

import * as React from 'react';
import { FileClock } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { AuditLogTable } from '@/features/audit-logs/components/audit-log-table';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useTranslation } from '@/lib/i18n';

export default function AuditLogsPage() {
  const { t } = useTranslation();

  return (
    <PermissionGuard requiredAnyPermission={['audit.view.own_branch', 'audit.view.all_branches']}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.auditLogs.title}
              </h1>
              <Badge tone="neutral">V0.1 Core Foundation</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.auditLogs.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FileClock className="size-4 text-[#00509d]" />
            <span>{t.auditLogs.immutableLedger}</span>
          </div>
        </div>

        <React.Suspense
          fallback={
            <div className="p-8 text-center text-xs text-slate-500">Loading audit ledger...</div>
          }
        >
          <AuditLogTable />
        </React.Suspense>
      </div>
    </PermissionGuard>
  );
}
