'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPinHouse, RefreshCw } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getBranches } from '@/features/branches/api/get-branches';
import { getClassrooms } from '@/features/classrooms/api/get-classrooms';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useAuth } from '@/features/auth/context/auth-context';

export default function ClassroomsPage() {
  const { user, currentBranchId } = useAuth();
  const [selectedBranchId, setSelectedBranchId] = React.useState('');

  const { data: allBranches = [] } = useQuery({
    queryKey: ['branches-list'],
    queryFn: getBranches,
  });

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const effectiveBranchId = React.useMemo(() => {
    if (selectedBranchId) return selectedBranchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return undefined;
  }, [selectedBranchId, currentBranchId]);

  const {
    data: classrooms = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['classrooms-page', effectiveBranchId],
    queryFn: () => getClassrooms(effectiveBranchId),
  });

  return (
    <PermissionGuard
      requiredAnyPermission={['classroom.view.own_branch', 'classroom.view.all_branches']}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Classrooms & Facilities
              </h1>
              <Badge tone="neutral">Academic Setup</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Physical room inventory, seating capacities, and branch facilities.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPinHouse className="size-4 text-[#00509d]" />
            <span>Branch Room Capacity</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {branches.length > 1 ? (
            <div className="w-56">
              <Select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
              >
                {user?.branchAccess === 'all' && <option value="">All Branches</option>}
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchCode} · {b.branchNameEn}
                  </option>
                ))}
              </Select>
            </div>
          ) : branches[0] ? (
            <div className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700">
              <span className="font-semibold text-[#00509d]">{branches[0].branchCode}</span>
              <span>·</span>
              <span>{branches[0].branchNameEn}</span>
            </div>
          ) : null}
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3 p-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : isError ? (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-rose-600">Failed to load classrooms.</p>
                <Button onClick={() => void refetch()} variant="outline" size="sm" className="mt-3">
                  <RefreshCw className="size-3.5" /> Retry
                </Button>
              </div>
            ) : classrooms.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-base font-semibold text-slate-800">No classrooms found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Run the database seed script to populate default branch classrooms.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Room Code</TableHead>
                    <TableHead className="whitespace-nowrap">Classroom Name</TableHead>
                    <TableHead className="whitespace-nowrap">Branch</TableHead>
                    <TableHead className="whitespace-nowrap">Building & Floor</TableHead>
                    <TableHead className="w-24 text-center whitespace-nowrap">Capacity</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classrooms.map((room) => {
                    const branchCode =
                      typeof room.branchId === 'object' && room.branchId !== null
                        ? room.branchId.branchCode
                        : '—';

                    return (
                      <TableRow key={room._id}>
                        <TableCell className="font-medium whitespace-nowrap text-slate-800">
                          {room.code}
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">{room.name}</TableCell>
                        <TableCell className="text-xs font-medium text-slate-600">
                          {branchCode}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {room.building || 'Main'} · {room.floor || '1st Floor'}
                        </TableCell>
                        <TableCell className="text-center text-xs font-medium text-slate-800">
                          {room.capacity}
                        </TableCell>
                        <TableCell>
                          <Badge tone={room.status === 'active' ? 'success' : 'neutral'}>
                            {room.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
