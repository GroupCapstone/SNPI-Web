import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EmployeeForm } from '@/features/employees/components/employee-form';

export const metadata = {
  title: 'Register Employee Master · SNP-SMS',
  description: 'Create a new employee master record with complete HR information',
};

export default function NewEmployeePage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['employee.create.own_branch', 'employee.create.all_branches']}
    >
      <EmployeeForm isEdit={false} />
    </PermissionGuard>
  );
}
