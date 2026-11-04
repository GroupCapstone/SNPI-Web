import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { PositionHeader } from '@/features/positions/components/position-header';
import { PositionTable } from '@/features/positions/components/position-table';

export const metadata = {
  title: 'Staff Positions · Organization · SNP-SMS',
  description: 'Manage job titles, staffing roles, and positions within departments',
};

export default function PositionsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['position.view.own_branch', 'position.view.all_branches']}
    >
      <div className="space-y-6">
        <PositionHeader />
        <PositionTable />
      </div>
    </PermissionGuard>
  );
}
