import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { AttendanceReportsView } from '@/features/reports/components/attendance-reports-view';

export const metadata = {
  title: 'Attendance Reports · SNP-SMS',
  description:
    'Monthly student attendance rates, session records, absentee rates, and chronic absence tracking',
};

export default function AttendanceReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'report.academic.view.own_branch',
        'report.academic.view.all_branches',
        'attendance.view.own_branch',
        'attendance.view.all_branches',
      ]}
    >
      <AttendanceReportsView />
    </PermissionGuard>
  );
}
