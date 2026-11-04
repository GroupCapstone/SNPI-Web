import type { Metadata } from 'next';

import { AcademicRuleSplitView } from '@/features/academic-rules/components/academic-rule-split-view';
import { PermissionGuard } from '@/features/auth/components/permission-guard';

export const metadata: Metadata = {
  title: 'Academic Rules & Grade Schemes | SNPI Management System',
  description: 'Manage versioned grade schemes, assessment policies, and progression rules.',
};

export default function AcademicRulesPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['academic_rule.view.own_branch', 'academic_rule.view.all_branches']}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Academic Policy & Grade Schemes
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Configure versioned grading bands, GPA weight multipliers, and minimum attendance
            thresholds across programs.
          </p>
        </div>

        <AcademicRuleSplitView />
      </div>
    </PermissionGuard>
  );
}
