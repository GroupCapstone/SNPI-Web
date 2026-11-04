import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { FinanceReportsView } from '@/features/reports/components/finance-reports-view';

export const metadata = {
  title: 'Financial Reports · SNP-SMS',
  description:
    'Official tuition collection, cashier ledger, receipts, invoices, and overdue tracking',
};

export default function FinanceReportsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report.view.own_branch',
        'report.view.all_branches',
        'report.finance.view.own_branch',
        'report.finance.view.all_branches',
      ]}
    >
      <FinanceReportsView />
    </PermissionGuard>
  );
}
