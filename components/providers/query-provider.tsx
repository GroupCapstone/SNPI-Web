'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { AuthProvider } from '@/features/auth/context/auth-context';
import { I18nProvider } from '@/lib/i18n';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            // Perf: 30 s staleTime prevents back-nav refetches; 5-min gcTime keeps cached
            // payloads warm long enough that most tab-switch / route-change reads are
            // served synchronously from the in-memory store without a network round-trip.
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            // Perf: treat cached data as fresh while re-validating in the background, so
            // the UI renders immediately on every navigation.
            refetchOnMount: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>{children}</AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
};
