'use client';

import { BookMarked } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { CurriculumTable } from '@/features/curriculum/components/curriculum-table';
import { useTranslation } from '@/lib/i18n';

export default function CurriculumPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={['curriculum.view.own_branch', 'curriculum.view.all_branches']}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.curriculum.title}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'រៀបចំការសិក្សា' : 'Academic Setup'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.curriculum.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookMarked className="size-4 text-[#023e8a]" />
            <span>
              {isKhmer ? 'កម្មវិធី -> កម្រិត -> មុខវិជ្ជា' : 'Program -> Level -> Subjects'}
            </span>
          </div>
        </div>

        <CurriculumTable />
      </div>
    </PermissionGuard>
  );
}
