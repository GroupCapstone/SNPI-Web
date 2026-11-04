import type { Metadata } from 'next';

import { AssessmentTable } from '@/features/assessments/components/assessment-table';
import { PermissionGuard } from '@/features/auth/components/permission-guard';

export const metadata: Metadata = {
  title: 'Assessments & Examinations | SNP-SMS',
  description: 'Academic tests, quizzes, midterms, and finals configuration.',
};

export default function AssessmentsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'assessment.view.assigned_subject',
        'assessment.view.own_branch',
        'assessment.view.all_branches',
      ]}
    >
      <div className="container mx-auto p-6">
        <AssessmentTable />
      </div>
    </PermissionGuard>
  );
}
