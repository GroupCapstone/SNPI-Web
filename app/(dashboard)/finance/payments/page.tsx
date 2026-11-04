import type { Metadata } from 'next';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { PaymentTable } from '@/features/payments/components/payment-table';

export const metadata: Metadata = {
  title: 'Payments & Receipts Ledger | SNP-SMS',
  description: 'Manage tuition payments, receipts, and outstanding student balances.',
};

export default function PaymentsPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['payment.view.own_branch', 'payment.view.all_branches']}
    >
      <div className="container mx-auto p-6">
        <PaymentTable />
      </div>
    </PermissionGuard>
  );
}
