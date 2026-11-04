import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { UserHeader } from '@/features/users/components/user-header';
import { UserTable } from '@/features/users/components/user-table';

export const metadata = {
  title: 'User Management · SNP-SMS',
  description: 'Manage user credentials, system access roles, and branch permissions',
};

export default function UsersPage() {
  return (
    <PermissionGuard requiredAnyPermission={['user.view.own_branch', 'user.view.all_branches']}>
      <div className="space-y-6">
        <UserHeader />
        <UserTable />
      </div>
    </PermissionGuard>
  );
}
