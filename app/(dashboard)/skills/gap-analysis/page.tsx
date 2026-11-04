'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { SkillGapDashboard } from '@/features/skills/components/skill-gap-dashboard';

export default function SkillGapAnalysisPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'skill_gap.view.own_record',
        'skill_gap.view.own_branch',
        'skill_gap.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Institutional Competency Gap & Readiness Analysis
              </h1>
              <Badge tone="neutral">Workforce Analytics</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Consolidated role benchmark evaluations, employee readiness percentages, and
              prioritized skill gaps across academic and administrative departments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/skills">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-xs text-slate-700 hover:bg-slate-50"
              >
                <ChevronLeft className="mr-1 size-3.5" />
                Back to Skills Catalog
              </Button>
            </Link>
          </div>
        </div>

        <SkillGapDashboard />
      </div>
    </PermissionGuard>
  );
}
