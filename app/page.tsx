'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2 } from '@/components/icons';

import { useAuth } from '@/features/auth/context/auth-context';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#EFF5FF]/40 p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative flex size-20 items-center justify-center rounded-2xl border border-[#CAD3F5] bg-white p-2">
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
          <h2 className="text-base font-bold tracking-tight text-[#0A1A4A]">SNP-SMS</h2>
          <p className="text-xs text-slate-500">Checking system session...</p>
        </div>
        <Loader2 className="size-5 animate-spin text-[#0056FF]" />
      </div>
    </div>
  );
}
