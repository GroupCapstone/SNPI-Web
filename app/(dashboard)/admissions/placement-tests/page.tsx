'use client';

import * as React from 'react';
import { FileCheck } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { PlacementTestTable } from '@/features/placement-tests/components/placement-test-table';
import { useTranslation } from '@/lib/i18n';

export default function PlacementTestsPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={['placement_test.view.all_branches', 'placement_test.view.own_branch']}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.admissions.placementTestsTitle}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'ដំណើរការចុះឈ្មោះ' : 'Admissions Pipeline'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.admissions.placementTestsSubtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FileCheck className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការវាយតម្លៃកម្រិតសមត្ថភាព' : 'Academic Level Recommendation'}</span>
          </div>
        </div>

        <PlacementTestTable />
      </div>
    </PermissionGuard>
  );
}
