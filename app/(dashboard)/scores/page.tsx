import * as React from 'react';
import type { Metadata } from 'next';

import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { ScoreMatrixEntry } from '@/features/scores/components/score-matrix-entry';

export const metadata: Metadata = {
  title: 'Score Entry & Grading | SNP-SMS',
  description: 'Interactive class score matrix and automated grade calculation.',
};

export default function ScoresPage() {
  return (
    <PermissionGuard
      requiredAnyPermission={[
        'score.view.assigned_subject',
        'score.view.own_branch',
        'score.view.all_branches',
      ]}
    >
      <div className="container mx-auto p-6">
        <React.Suspense
          fallback={
            <div className="p-8 text-center text-sm text-slate-500">Loading scoring matrix...</div>
          }
        >
          <ScoreMatrixEntry />
        </React.Suspense>
      </div>
    </PermissionGuard>
  );
}
