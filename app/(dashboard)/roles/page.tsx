'use client';

import { Shield } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { RoleTable } from '@/features/roles/components/role-table';
import { useTranslation } from '@/lib/i18n';

export default function RolesPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard requiredPermission="role.view.all_branches">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.roles.title}
              </h1>
              <Badge tone="neutral">{t.roles.securityBadge}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.roles.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការគ្រប់គ្រងសិទ្ធិតាមតួនាទី' : 'Role-Based Access Control'}</span>
          </div>
        </div>

        <RoleTable />
      </div>
    </PermissionGuard>
  );
}
