import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { AdminUserDetail } from '@/features/users/components/admin-user-detail';

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'User Profile & Security · SNP-SMS',
  description: 'View user credentials, system access roles, and Two-Factor Authentication state',
};

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'user.view.own_branch',
        'user.view.all_branches',
        'user.edit.own_branch',
        'user.edit.all_branches',
      ]}
    >
      <AdminUserDetail id={id} />
    </PermissionGuard>
  );
}
