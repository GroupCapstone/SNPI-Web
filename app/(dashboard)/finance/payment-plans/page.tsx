import type { Metadata } from 'next';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { PaymentPlanTable } from '@/features/payment-plans/components/payment-plan-table';

export const metadata: Metadata = { title: 'Installment Payment Plans | SNP-SMS' };

export default function PaymentPlansPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'payment.view.own_branch',
        'payment.view.all_branches',
        'finance.payment.create.own_branch',
        'finance.payment.create.all_branches',
      ]}
    >
      <div className="container mx-auto p-6">
        <PaymentPlanTable />
      </div>
    </PermissionGuard>
  );
}
