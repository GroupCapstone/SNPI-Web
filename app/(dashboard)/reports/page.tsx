import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { ReportCenter } from '@/features/reports/components/report-center';

export const metadata = {
  title: 'Report Center · SNP-SMS',
  description: 'Official student, academic, attendance, and finance reports',
};

export default function ReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'report.student.view.own_branch',
        'report.student.view.all_branches',
        'report.academic.view.own_branch',
        'report.academic.view.all_branches',
        'report.finance.view.own_branch',
        'report.finance.view.all_branches',
      ]}
    >
      <ReportCenter />
    </PermissionGuard>
  );
}
