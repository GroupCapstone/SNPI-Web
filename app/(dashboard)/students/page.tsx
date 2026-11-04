'use client';

import * as React from 'react';
import { GraduationCap } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentTable } from '@/features/students/components/student-table';
import { useTranslation } from '@/lib/i18n';

export default function StudentsPage() {
  const { t } = useTranslation();

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'student.view.assigned_class',
        'student.view.own_branch',
        'student.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.students.title}
              </h1>
              <Badge tone="neutral">V1.0 Core School</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.students.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <GraduationCap className="size-4 text-[#00509d]" />
            <span>{t.students.systemSubtitle}</span>
          </div>
        </div>

        {/* Student Table */}
        <StudentTable />
      </div>
    </PermissionGuard>
  );
}
