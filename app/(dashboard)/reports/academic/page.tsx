import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { AcademicReportsView } from '@/features/reports/components/academic-reports-view';

export const metadata = {
  title: 'Academic Reports · SNP-SMS',
  description:
    'Monthly student rankings, academic score averages, pass rates, and report card generators',
};

export default function AcademicReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'report.academic.view.own_branch',
        'report.academic.view.all_branches',
      ]}
    >
      <AcademicReportsView />
    </PermissionGuard>
  );
}
