'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from '@/components/icons';

import { Card, CardContent } from '@/components/ui/card';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="max-w-md border border-slate-200 bg-white text-center">
        <CardContent className="space-y-4 p-8">
          <ShieldAlert className="mx-auto size-12 text-amber-600" />

          <div className="space-y-1.5">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              403 · Access Restricted
            </h1>
            <p className="text-xs leading-relaxed text-slate-500">
              You do not have the required RBAC permissions or branch authorization to view this
              workspace module.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-[#023e8a] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#00509d]"
            >
              <ArrowLeft className="size-4" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
