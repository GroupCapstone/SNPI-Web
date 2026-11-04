'use client';

import * as React from 'react';
import Link from 'next/link';
import { BarChart3 } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { SkillTable } from '@/features/skills/components/skill-table';
import { useTranslation } from '@/lib/i18n';

export default function SkillsCatalogPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard requiredPermission="skill.view.own_branch">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.skills.title}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'ក្របខ័ណ្ឌសមត្ថភាព' : 'Competency Framework'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.skills.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/skills/gap-analysis">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-xs text-slate-700 hover:bg-slate-50"
              >
                <BarChart3 className="mr-1.5 size-3.5 text-[#00509d]" />
                {t.skills.skillGapAnalysis}
              </Button>
            </Link>
          </div>
        </div>

        <SkillTable />
      </div>
    </PermissionGuard>
  );
}
