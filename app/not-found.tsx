import { StatusPage404 } from '@/features/document/components/ui-library';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EFF5FF]/40 p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <StatusPage404
          statusCode={404}
          homeHref="/dashboard"
          homeLabel="Return to Dashboard"
          showControls={false}
        />
      </div>
    </main>
  );
}
