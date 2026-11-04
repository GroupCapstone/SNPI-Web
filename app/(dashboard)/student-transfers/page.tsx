'use client';

import * as React from 'react';
import { ArrowRightLeft } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentTransferTable } from '@/features/student-transfers/components/student-transfer-table';
import { useTranslation } from '@/lib/i18n';

export default function StudentTransfersPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'student_transfer.view.all_branches',
        'student_transfer.view.own_branch',
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.studentTransfers.title}
              </h1>
              <Badge tone="neutral">
                {isKhmer ? 'ប្រតិបត្តិការសិក្សា' : 'Academic Operations'}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.studentTransfers.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ArrowRightLeft className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការផ្ទេរសិក្សារវាងសាខា' : 'Inter-Branch Mobility'}</span>
          </div>
        </div>

        <StudentTransferTable />
      </div>
    </PermissionGuard>
  );
}
