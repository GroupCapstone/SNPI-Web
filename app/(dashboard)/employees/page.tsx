import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EmployeeHeader } from '@/features/employees/components/employee-header';
import { EmployeeTable } from '@/features/employees/components/employee-table';

export const metadata = {
  title: 'Employees Master · SNP-SMS',
  description: 'Manage staff records, teachers, and personnel across all campus branches',
};

export default function EmployeesPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'employee.view.own_department',
        'employee.view.own_branch',
        'employee.view.all_branches',
      ]}
    >
      <div className="space-y-6">
        <EmployeeHeader />
        <EmployeeTable />
      </div>
    </PermissionGuard>
  );
}
