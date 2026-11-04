'use client';

import * as React from 'react';
import { UserCheck } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EnrollmentTable } from '@/features/enrollments/components/enrollment-table';
import { useTranslation } from '@/lib/i18n';

export default function EnrollmentsPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'enrollment.view.assigned_class',
        'enrollment.view.own_branch',
        'enrollment.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.enrollments.title}
              </h1>
              <Badge tone="neutral">V1.0 Core School</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.enrollments.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <UserCheck className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'បញ្ជីឈ្មោះចុះឈ្មោះចូលរៀន' : 'Academic Enrollment Registry'}</span>
          </div>
        </div>

        {/* Enrollment Table */}
        <EnrollmentTable />
      </div>
    </PermissionGuard>
  );
}
