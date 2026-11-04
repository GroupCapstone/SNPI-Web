'use client';

import { BookOpen } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { SubjectTable } from '@/features/subjects/components/subject-table';
import { useTranslation } from '@/lib/i18n';

export default function SubjectsPage() {
  const { t, isKhmer } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'subject.view.assigned_subject',
        'subject.view.own_branch',
        'subject.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.subjects.title}
              </h1>
              <Badge tone="neutral">V1.0A Academic Core</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.subjects.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <BookOpen className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'កាតាឡុកមុខវិជ្ជា' : 'Course Catalog'}</span>
          </div>
        </div>

        <SubjectTable />
      </div>
    </PermissionGuard>
  );
}
