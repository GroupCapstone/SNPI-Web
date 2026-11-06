'use client';

import { StatusPage404 } from '@/features/document/components/ui-library';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <StatusPage404
          statusCode={403}
          homeHref="/dashboard"
          homeLabel="Return to Dashboard"
          showControls={false}
        />
      </div>
    </div>
  );
}
