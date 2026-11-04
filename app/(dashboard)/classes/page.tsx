import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { ClassHeader } from '@/features/classes/components/class-header';
import { ClassTable } from '@/features/classes/components/class-table';

export const metadata = {
  title: 'Classes & Study Groups · SNP-SMS',
  description: 'Manage study classes, rosters, and room schedules across branches',
};

export default function ClassesPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'class.view.assigned_class',
        'class.view.own_branch',
        'class.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <ClassHeader />
        <ClassTable />
      </div>
    </PermissionGuard>
  );
}
