'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from '@/components/icons';

import { Card, CardContent } from '@/components/ui/card';

import { useAuth } from '../context/auth-context';

interface PermissionGuardProps {
  children?: React.ReactNode;
  requiredPermission?: string;
  requiredAnyPermission?: string[];
  fallback?: React.ReactNode;
}

export const PermissionGuard = ({
  children,
  requiredPermission,
  requiredAnyPermission,
  fallback,
}: PermissionGuardProps) => {
  const { hasPermission, hasAnyPermission, isLoading, user } = useAuth();

  if (isLoading || !user) {
    return null;
  }

  let isAuthorized = true;

  if (requiredPermission && !hasPermission(requiredPermission)) {
    isAuthorized = false;
  }

  if (requiredAnyPermission && !hasAnyPermission(requiredAnyPermission)) {
    isAuthorized = false;
  }

  if (!isAuthorized) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Card className="max-w-md border border-slate-200 bg-white text-center">
          <CardContent className="space-y-4 p-6">
            <ShieldAlert className="mx-auto size-12 text-amber-600" />

            <div className="space-y-1">
              <h2 className="text-base font-semibold text-slate-900">Permission Restricted</h2>
              <p className="text-xs text-slate-500">
                Your role does not have permission to view or manage this section.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#023e8a] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#00509d]"
            >
              <ArrowLeft className="size-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
