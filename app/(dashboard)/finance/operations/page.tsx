import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { FinanceOperationsWorkspace } from '@/features/finance-operations/components/finance-operations-workspace';

export default function FinanceOperationsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'payment.view.own_branch',
        'payment.view.all_branches',
        'finance.discount.apply.own_branch',
        'finance.discount.apply.all_branches',
        'finance.payment.create.own_branch',
        'finance.payment.create.all_branches',
      ]}
    >
      <div className="p-6">
        <FinanceOperationsWorkspace />
      </div>
    </PermissionGuard>
  );
}
