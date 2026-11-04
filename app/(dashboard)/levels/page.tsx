'use client';

import { Layers } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { LevelTable } from '@/features/levels/components/level-table';
import { useTranslation } from '@/lib/i18n';

export default function LevelsPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard requiredAnyPermission={['level.view.own_branch', 'level.view.all_branches']}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.levels.title}
              </h1>
              <Badge tone="neutral">V1.0A Academic Core</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.levels.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Layers className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'ការវិវត្តកម្រិតសិក្សា' : 'Curriculum Progression'}</span>
          </div>
        </div>

        <LevelTable />
      </div>
    </PermissionGuard>
  );
}
