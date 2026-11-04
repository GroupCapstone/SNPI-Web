import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { StaffReportsView } from '@/features/reports/components/staff-reports-view';

export const metadata = {
  title: 'Staff Reports · SNP-SMS',
  description: 'Faculty directory, departmental allocations, staff positions, and teaching loads',
};

export default function StaffReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'employee.view.own_branch',
        'employee.view.all_branches',
      ]}
    >
      <StaffReportsView />
    </PermissionGuard>
  );
}
