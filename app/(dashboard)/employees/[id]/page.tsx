import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EmployeeProfile } from '@/features/employees/components/employee-profile';

interface EmployeeProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Employee Profile · SNP-SMS',
  description: 'View complete employee details, employment history, and personal records',
};

export default async function EmployeePage({ params }: EmployeeProfilePageProps) {
  const { id } = await params;
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'employee.view.own_record',
        'employee.view.own_department',
        'employee.view.own_branch',
        'employee.view.all_branches',
      ]}
    >
      <EmployeeProfile id={id} />
    </PermissionGuard>
  );
}
