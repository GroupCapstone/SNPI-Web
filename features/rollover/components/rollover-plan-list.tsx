'use client';

import React from 'react';
import { Clock, Eye, Layers } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRolloverPlansQuery } from '../hooks/use-rollover';
import type { RolloverPlan, RolloverPlanStatus } from '../types';

interface RolloverPlanListProps {
  onSelectPlan?: (plan: RolloverPlan) => void;
}

const getStatusBadge = (status: RolloverPlanStatus) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-emerald-600 text-white">COMPLETED</Badge>;
    case 'approved':
      return <Badge className="bg-[#023e8a] text-white">APPROVED</Badge>;
    case 'validated':
      return <Badge className="bg-[#00509d] text-white">VALIDATED</Badge>;
    case 'executing':
      return <Badge className="animate-pulse bg-purple-600 text-white">EXECUTING</Badge>;
    case 'failed':
      return <Badge className="bg-rose-600 text-white">FAILED</Badge>;
    case 'cancelled':
      return <Badge className="bg-slate-400 text-white">CANCELLED</Badge>;
    default:
      return (
        <Badge tone="neutral" className="border-slate-300 text-slate-700">
          DRAFT
        </Badge>
      );
  }
};

export const RolloverPlanList: React.FC<RolloverPlanListProps> = ({ onSelectPlan }) => {
  const { data, isLoading, error } = useRolloverPlansQuery({ limit: 20 });
  const plans = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-200 bg-rose-50/50 p-6 text-center text-rose-800">
        <p>Failed to load rollover plans history.</p>
      </Card>
    );
  }

  if (plans.length === 0) {
    return (
      <Card className="border-slate-200 bg-slate-50/50 p-12 text-center text-slate-500">
        <Layers className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-4 text-base font-semibold text-slate-700">
          No Rollover Plans Created Yet
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Create your first academic period rollover plan using the wizard above.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-bold text-slate-800">
          <Clock className="h-4 w-4 text-[#023e8a]" /> Rollover History & Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Code</TableHead>
                <TableHead>Campus Branch</TableHead>
                <TableHead>Source Context</TableHead>
                <TableHead>Target Context</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Results</TableHead>
                <TableHead>Created</TableHead>
                {onSelectPlan && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((p) => {
                const branchName =
                  typeof p.branchId === 'object' ? p.branchId.branchNameEn : 'Branch';
                const sourcePeriodName =
                  typeof p.sourcePeriodId === 'object' ? p.sourcePeriodId.name : 'Source Period';
                const targetPeriodName =
                  typeof p.targetPeriodId === 'object' ? p.targetPeriodId.name : 'Target Period';

                return (
                  <TableRow key={p._id}>
                    <TableCell className="font-mono text-xs font-bold text-[#023e8a]">
                      {p.planCode}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-slate-800">
                      {branchName}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{sourcePeriodName}</TableCell>
                    <TableCell className="text-xs font-semibold text-[#00509d]">
                      {targetPeriodName}
                    </TableCell>
                    <TableCell>{getStatusBadge(p.status)}</TableCell>
                    <TableCell className="text-xs text-slate-600">
                      {p.executionResult ? (
                        <span className="font-semibold text-emerald-700">
                          {p.executionResult.classesCreated} classes,{' '}
                          {p.executionResult.enrollmentsCreated} students
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                    {onSelectPlan && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSelectPlan(p)}
                          className="h-8 gap-1 text-xs text-[#023e8a]"
                        >
                          <Eye className="h-3.5 w-3.5" /> View
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
