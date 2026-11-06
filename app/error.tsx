'use client';

import * as React from 'react';
import { StatusPage404 } from '@/features/document/components/ui-library';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log exception to console in client runtime
    console.error('[SNPI-Web Client Error Boundary Caught]:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF5FF]/40 p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <StatusPage404
          statusCode={500}
          title="Cluster Exception Fault"
          description={
            error?.message ||
            'The client application encountered an unhandled exception or transaction timeout. You may retry the operation or return to the dashboard.'
          }
          homeHref="/dashboard"
          homeLabel="Return to Dashboard"
          onReset={reset}
          resetLabel="Retry Operation"
          showControls={false}
        />
      </div>
    </main>
  );
}
