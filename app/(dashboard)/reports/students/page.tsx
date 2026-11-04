import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StudentReportsView } from '@/features/reports/components/student-reports-view';

export const metadata = {
  title: 'Student Reports · SNP-SMS',
  description: 'Official student demographics, enrollment rosters, gender ratios, and transcripts',
};

export default function StudentReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'report.student.view.own_branch',
        'report.student.view.all_branches',
      ]}
    >
      <StudentReportsView />
    </PermissionGuard>
  );
}
