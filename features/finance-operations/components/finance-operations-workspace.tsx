'use client';

import * as React from 'react';
import { BadgeDollarSign, Calculator, CheckCircle2, Plus } from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { formatCurrency, formatDataLabel } from '@/lib/formatters';

import {
  useApproveCashierShiftMutation,
  useCashierShiftsQuery,
  useCloseCashierShiftMutation,
  useCreateDiscountPolicyMutation,
  useDiscountPoliciesQuery,
  useOpenCashierShiftMutation,
} from '../hooks/use-finance-operations';
import { discountPolicySchema } from '../schemas';

const totalsFromPrompts = (label: string) => ({
  USD: Number(prompt(`${label} USD:`, '0') ?? 0),
  KHR: Number(prompt(`${label} KHR:`, '0') ?? 0),
});

export const FinanceOperationsWorkspace = () => {
  const { hasPermission, currentBranchId, setCurrentBranchId } = useAuth();
  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const canManageDiscounts =
    hasPermission('finance.discount.apply.own_branch') ||
    hasPermission('finance.discount.apply.all_branches');
  const canCollect =
    hasPermission('payment.create.own_branch') ||
    hasPermission('payment.create.all_branches') ||
    hasPermission('finance.payment.create.own_branch') ||
    hasPermission('finance.payment.create.all_branches');
  const canApprove =
    hasPermission('approval.approve.own_branch') || hasPermission('approval.approve.all_branches');
  const _canManageAllBranches =
    hasPermission('finance.discount.apply.all_branches') ||
    hasPermission('finance.payment.create.all_branches');
  const canSelectAllBranches = hasPermission('branch.view.all_branches');
  const [branchId, setBranchId] = React.useState(currentBranchId);
  const [policy, setPolicy] = React.useState({
    branchId: '',
    code: '',
    name: '',
    type: 'sibling',
    calculationType: 'percentage',
    value: 5,
    effectiveFrom: new Date().toISOString().slice(0, 10),
  });
  const { data: branchesData } = useBranchesQuery({}, canViewBranches);
  const branches = branchesData?.data ?? [];
  const writableBranchId = React.useMemo(() => {
    if (branchId && branchId !== 'all') return branchId;
    if (currentBranchId && currentBranchId !== 'all') return currentBranchId;
    return branches[0]?._id ?? '';
  }, [branchId, branches, currentBranchId]);
  React.useEffect(() => {
    if (currentBranchId !== 'all' && branchId !== currentBranchId) setBranchId(currentBranchId);
  }, [branchId, currentBranchId]);
  const { data: policiesData } = useDiscountPoliciesQuery(branchId || undefined);
  const { data: shiftsData } = useCashierShiftsQuery(branchId || undefined);
  const createPolicy = useCreateDiscountPolicyMutation();
  const openShift = useOpenCashierShiftMutation();
  const closeShift = useCloseCashierShiftMutation();
  const approveShift = useApproveCashierShiftMutation();
  const canManage = canManageDiscounts;

  const submitPolicy = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = discountPolicySchema.safeParse({ ...policy, value: Number(policy.value) });
    if (!parsed.success) return toast.error(parsed.error.issues[0]?.message ?? 'Invalid policy');
    try {
      if (!writableBranchId) return toast.error('Select a concrete branch before saving a policy');
      await createPolicy.mutateAsync({ ...parsed.data, branchId: writableBranchId });
      toast.success('Discount policy created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create policy');
    }
  };
  const handleOpen = async () => {
    if (!writableBranchId) return toast.error('Select a concrete branch before opening a shift');
    try {
      await openShift.mutateAsync({
        branchId: writableBranchId,
        openingCash: totalsFromPrompts('Opening cash'),
      });
      toast.success('Cashier shift opened');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to open shift');
    }
  };
  const handleClose = async (id: string) => {
    try {
      await closeShift.mutateAsync({
        id,
        declaredCash: totalsFromPrompts('Declared cash'),
        declaredDigital: totalsFromPrompts('Declared digital'),
      });
      toast.success('Shift submitted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to close shift');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl leading-8 font-bold tracking-tight text-slate-950">
          Finance Operations & Reconciliation
        </h1>
        <p className="text-sm leading-5 text-slate-600">
          Control tuition discount policies and reconcile cashier collections by currency and
          payment channel.
        </p>
      </div>
      <div className="flex gap-3">
        <Select
          value={branchId}
          onChange={(event) => {
            setBranchId(event.target.value);
            if (event.target.value) setCurrentBranchId(event.target.value);
            setPolicy((value) => ({ ...value, branchId: event.target.value }));
          }}
          className="max-w-xs"
        >
          {canSelectAllBranches && <option value="all">All Branches</option>}
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.branchNameEn}
            </option>
          ))}
        </Select>
        {canCollect && (
          <Button onClick={() => void handleOpen()} disabled={!writableBranchId}>
            <Calculator className="mr-1 size-4" />
            Open Cashier Shift
          </Button>
        )}
      </div>
      {canManage && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg leading-7">
              Create Discount or Scholarship Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitPolicy} className="grid gap-3 md:grid-cols-6">
              <Input
                placeholder="Code"
                value={policy.code}
                onChange={(e) => setPolicy((v) => ({ ...v, code: e.target.value }))}
              />
              <Input
                className="md:col-span-2"
                placeholder="Policy name"
                value={policy.name}
                onChange={(e) => setPolicy((v) => ({ ...v, name: e.target.value }))}
              />
              <Select
                value={policy.type}
                onChange={(e) => setPolicy((v) => ({ ...v, type: e.target.value }))}
              >
                <option value="sibling">Sibling</option>
                <option value="merit">Merit</option>
                <option value="early_payment">Early Payment</option>
                <option value="scholarship">Scholarship</option>
              </Select>
              <Select
                value={policy.calculationType}
                onChange={(e) => setPolicy((v) => ({ ...v, calculationType: e.target.value }))}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </Select>
              <Input
                type="number"
                min="0.01"
                step="0.01"
                value={policy.value}
                onChange={(e) => setPolicy((v) => ({ ...v, value: Number(e.target.value) }))}
              />
              <Button type="submit" className="md:col-start-6">
                <Plus className="mr-1 size-4" />
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-7">Active Discount Policies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code / Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Effective</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(policiesData?.data ?? []).map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.code}</p>
                  </TableCell>
                  <TableCell className="text-sm capitalize">{formatDataLabel(item.type)}</TableCell>
                  <TableCell className="text-sm font-semibold">
                    {item.value}
                    {item.calculationType === 'percentage' ? '%' : ''}
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(item.effectiveFrom).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge tone="success">{formatDataLabel(item.status)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg leading-7">Cashier Shift Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shift</TableHead>
                  <TableHead>Opened</TableHead>
                  <TableHead>Expected Cash</TableHead>
                  <TableHead>Cash Variance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(shiftsData?.data ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-500">
                      No cashier shifts recorded for this branch.
                    </TableCell>
                  </TableRow>
                )}
                {(shiftsData?.data ?? []).map((shift) => (
                  <TableRow key={shift._id}>
                    <TableCell className="font-mono text-xs">{shift.shiftNumber}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(shift.openedAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatCurrency(shift.expectedCash.USD, 'USD')} ·{' '}
                      {formatCurrency(shift.expectedCash.KHR, 'KHR')}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatCurrency(shift.cashVariance.USD, 'USD')} ·{' '}
                      {formatCurrency(shift.cashVariance.KHR, 'KHR')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        tone={
                          shift.status === 'approved'
                            ? 'success'
                            : shift.status === 'submitted'
                              ? 'warning'
                              : 'neutral'
                        }
                      >
                        {formatDataLabel(shift.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {shift.status === 'open' ? (
                        <Button size="sm" onClick={() => void handleClose(shift._id)}>
                          Close & Reconcile
                        </Button>
                      ) : shift.status === 'submitted' && canApprove ? (
                        <Button size="sm" onClick={() => void approveShift.mutateAsync(shift._id)}>
                          <CheckCircle2 className="mr-1 size-4" />
                          Approve
                        </Button>
                      ) : (
                        <BadgeDollarSign className="ml-auto size-4 text-slate-400" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
