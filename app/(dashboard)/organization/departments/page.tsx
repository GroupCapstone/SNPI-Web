import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { DepartmentHeader } from '@/features/departments/components/department-header';
import { DepartmentTable } from '@/features/departments/components/department-table';

export const metadata = {
  title: 'Departments · Organization · SNP-SMS',
  description: 'Manage functional departments across school branches',
};

export default function DepartmentsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'department.view.own_department',
        'department.view.own_branch',
        'department.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <DepartmentHeader />
        <DepartmentTable />
      </div>
    </PermissionGuard>
  );
}
