import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { ClassDetail } from '@/features/classes/components/class-detail';

interface ClassDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Class Management Hub · SNP-SMS',
  description:
    'Manage class roster, student enrollments, attendance, tuition status, and term progression',
};

export default async function ClassPage({ params }: ClassDetailPageProps) {
  const { id } = await params;

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'class.view.assigned_class',
        'class.view.own_branch',
        'class.view.all_branches',
      ]}
    >
      <ClassDetail classId={id} />
    </PermissionGuard>
  );
}
