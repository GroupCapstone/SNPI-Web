'use client';

import { CircleCheck, RefreshCw, Server, TriangleAlert } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { useHealthQuery } from '../hooks/use-health-query';

export const SystemHealthCard = () => {
  const healthQuery = useHealthQuery();

  if (healthQuery.isPending) {
    return (
      <Card aria-live="polite">
        <CardHeader>
          <CardTitle>System connection</CardTitle>
          <CardDescription>Checking the SNP-SMS API...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-4 w-48" />
        </CardContent>
      </Card>
    );
  }

  if (healthQuery.isError) {
    return (
      <Card aria-live="polite" className="border-rose-200">
        <CardHeader className="flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TriangleAlert className="size-4 text-rose-600" />
              API unavailable
            </CardTitle>
            <CardDescription className="mt-1">
              Start the backend and MongoDB, then try again.
            </CardDescription>
          </div>
          <Badge tone="danger">Offline</Badge>
        </CardHeader>
        <CardContent>
          <Button onClick={() => void healthQuery.refetch()} size="sm" variant="outline">
            <RefreshCw />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card aria-live="polite">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Server className="size-4 text-slate-500" />
            System connection
          </CardTitle>
          <CardDescription className="mt-1">
            Frontend and API are communicating securely.
          </CardDescription>
        </div>
        <Badge tone="success">
          <CircleCheck className="mr-1 size-3.5" />
          Healthy
        </Badge>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm">
          <div>
            <dt className="text-slate-500">Service</dt>
            <dd className="mt-1 font-medium text-slate-900">{healthQuery.data.data.service}</dd>
          </div>
          <div>
            <dt className="text-slate-500">API version</dt>
            <dd className="mt-1 font-medium text-slate-900">V{healthQuery.data.data.version}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};
