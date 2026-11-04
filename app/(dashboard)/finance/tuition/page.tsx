import type { Metadata } from 'next';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { TuitionTable } from '@/features/tuition/components/tuition-table';

export const metadata: Metadata = {
  title: 'Tuition Fee Structures | SNP-SMS',
  description: 'Manage curriculum tuition fees, rates, and billing cycles.',
};

export default function TuitionPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={['tuition.view.own_branch', 'tuition.view.all_branches']}
    >
      <div className="container mx-auto p-6">
        <TuitionTable />
      </div>
    </PermissionGuard>
  );
}
