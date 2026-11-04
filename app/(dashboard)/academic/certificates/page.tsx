import type { Metadata } from 'next';

import { CertificateRegistry } from '@/features/certificates/components/certificate-registry';
import { PermissionGuard } from '@/features/auth/components/permission-guard';

export const metadata: Metadata = {
  title: 'Certificates & Graduations | SNPI Management System',
  description: 'View, issue, and verify official completion and merit certificates.',
};

export default function CertificatesPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'report_card.view.own_branch',
        'report_card.view.all_branches',
        'report_card.generate.own_branch',
        'report_card.generate.all_branches',
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Certificate & Honors Management
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Official completion diplomas, merit honors credentials, and cryptographic QR
            verification.
          </p>
        </div>

        <CertificateRegistry />
      </div>
    </PermissionGuard>
  );
}
