'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { EmployeeForm } from '@/features/employees/components/employee-form';
import { useEmployeeQuery } from '@/features/employees/hooks/use-employees';

export default function EditEmployeePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const { data, isLoading, isError, refetch } = useEmployeeQuery(id || '');

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="size-5 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
          <span>Loading employee record...</span>
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
        <p className="text-sm font-semibold text-rose-900">Failed to load employee for editing</p>
        <p className="mt-1 text-xs text-rose-700">
          The requested staff record could not be found or you lack permission.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => router.push('/employees')}>
            Back to Directory
          </Button>
          <Button size="sm" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PermissionGuard
      requiredAnyPermission={['employee.edit.own_branch', 'employee.edit.all_branches']}
    >
      <EmployeeForm isEdit={true} initialData={data.data} />
    </PermissionGuard>
  );
}
