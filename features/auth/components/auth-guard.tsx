'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from '@/components/icons';

import { useAuth } from '../context/auth-context';
import { ForceChangePasswordModal } from './force-change-password-modal';

interface AuthGuardProps {
  children?: React.ReactNode;
  requiredPermission?: string;
  requiredAnyPermission?: string[];
}

export const AuthGuard = ({
  children,
  requiredPermission,
  requiredAnyPermission,
}: AuthGuardProps) => {
  const { user, isAuthenticated, isLoading, hasPermission, hasAnyPermission } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthorized =
    (!requiredPermission || hasPermission(requiredPermission)) &&
    (!requiredAnyPermission || hasAnyPermission(requiredAnyPermission));

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectUrl = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : '/login';
      router.replace(redirectUrl);
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  React.useEffect(() => {
    if (!isLoading && isAuthenticated && !user?.mustChangePassword && !isAuthorized) {
      router.replace('/unauthorized');
    }
  }, [isLoading, isAuthenticated, user?.mustChangePassword, isAuthorized, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative flex size-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2">
            <Image
              src="/images/logo.png"
              alt="SNPI International School Logo"
              width={64}
              height={64}
              className="size-full object-contain"
              priority
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold tracking-tight text-[#023e8a]">SNP-SMS</h2>
            <p className="text-xs text-slate-500">Securing workspace session...</p>
          </div>
          <Loader2 className="size-5 animate-spin text-[#00509d]" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.mustChangePassword) {
    return <ForceChangePasswordModal />;
  }

  if (!isAuthorized) return null;

  return <>{children}</>;
};
