import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { BranchHeader } from '@/features/branches/components/branch-header';
import { BranchTable } from '@/features/branches/components/branch-table';

export const metadata = {
  title: 'School Branches · Organization · SNP-SMS',
  description: 'Manage campus locations and branch branches across SNPI International School',
};

export default function BranchesPage() {
  return (
    <PermissionGuard requiredAnyPermission={['branch.view.own_branch', 'branch.view.all_branches']}>
      <div className="space-y-6">
        <BranchHeader />
        <BranchTable />
      </div>
    </PermissionGuard>
  );
}
