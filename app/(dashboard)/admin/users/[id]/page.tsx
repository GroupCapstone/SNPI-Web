import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { AdminUserDetail } from '@/features/users/components/admin-user-detail';

interface AdminUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'User Security Management · SNP-SMS',
  description: 'Audit user credentials, permissions, and emergency 2FA break-glass reset',
};

export default async function AdminUserPage({ params }: AdminUserPageProps) {
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
