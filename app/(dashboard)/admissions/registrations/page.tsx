'use client';

import * as React from 'react';
import { ClipboardList } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { RegistrationTable } from '@/features/registrations/components/registration-table';
import { useTranslation } from '@/lib/i18n';

export default function RegistrationsPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={['registration.view.all_branches', 'registration.view.own_branch']}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.admissions.registrationsTitle}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'ដំណើរការចុះឈ្មោះ' : 'Admissions Pipeline'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.admissions.registrationsSubtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ClipboardList className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការទទួលពាក្យចុះឈ្មោះ' : 'Admissions Intake'}</span>
          </div>
        </div>

        <RegistrationTable />
      </div>
    </PermissionGuard>
  );
}
