'use client';

import * as React from 'react';
import { CalendarClock, Search, XCircle } from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { useTuitionFeesQuery } from '@/features/tuition/hooks/use-tuition';
import { formatCurrency, formatDataLabel } from '@/lib/formatters';

import {
  useCancelPaymentPlanMutation,
  useCreatePaymentPlanMutation,
  usePaymentPlansQuery,
} from '../hooks/use-payment-plans';
import type { PaymentPlan } from '../types';
import { paymentPlanSchema } from '../schemas/payment-plan-schema';
import { InstallmentPaymentDialog } from './installment-payment-dialog';

const idOf = (value: string | { _id: string }) => (typeof value === 'string' ? value : value._id);

export const PaymentPlanTable = () => {
  const { currentBranchId } = useAuth();
  return <PaymentPlanWorkspace key={currentBranchId} />;
};

const PaymentPlanWorkspace = () => {
  const { hasPermission, currentBranchId, user } = useAuth();
  const [branchId, setBranchId] = React.useState(currentBranchId === 'all' ? '' : currentBranchId);
  const [status, setStatus] = React.useState<PaymentPlan['status'] | ''>('active');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [payingPlan, setPayingPlan] = React.useState<PaymentPlan | null>(null);
  const canView =
    hasPermission('payment.view.own_branch') ||
    hasPermission('payment.view.all_branches') ||
    hasPermission('finance.payment.create.own_branch') ||
    hasPermission('finance.payment.create.all_branches');
  const canCancel =
    hasPermission('payment.void.own_branch') ||
    hasPermission('payment.void.all_branches') ||
    hasPermission('finance.void.request.own_branch') ||
    hasPermission('finance.void.request.all_branches');
  const canManagePlans =
    hasPermission('payment.create.own_branch') ||
    hasPermission('payment.create.all_branches') ||
    hasPermission('finance.payment.create.own_branch') ||
    hasPermission('finance.payment.create.all_branches');
  const { data: branchesData } = useBranchesQuery({}, canView);
  const branchOptions = branchesData?.data ?? [];
  const { data: enrollmentsData } = useEnrollmentsQuery(
    { branchId: branchId || undefined, statusGroup: 'continuing', limit: 100 },
    canManagePlans && Boolean(branchId && branchId !== 'all'),
  );
  const { data: tuitionData } = useTuitionFeesQuery(
    { branchId: branchId || undefined, status: 'active', limit: 100 },
    canManagePlans && Boolean(branchId && branchId !== 'all'),
  );
  const [enrollmentId, setEnrollmentId] = React.useState('');
  const [tuitionFeeId, setTuitionFeeId] = React.useState('');
  const [firstDueDate, setFirstDueDate] = React.useState('');
  const [secondDueDate, setSecondDueDate] = React.useState('');
  const createMutation = useCreatePaymentPlanMutation();
  const { data, isLoading, isError } = usePaymentPlansQuery(
    {
      branchId: branchId || undefined,
      status: status || undefined,
      search: search || undefined,
      page,
      limit: 20,
    },
    canView,
  );
  const cancelMutation = useCancelPaymentPlanMutation();
  const plans = data?.data ?? [];
  const selectedEnrollment = (enrollmentsData?.data ?? []).find(
    (item) => item._id === enrollmentId,
  );
  const matchingFees = (tuitionData?.data ?? []).filter(
    (fee) =>
      selectedEnrollment &&
      idOf(fee.academicYearId) === selectedEnrollment.academicYearId._id &&
      idOf(fee.programId) === selectedEnrollment.programId._id &&
      idOf(fee.levelId) === selectedEnrollment.levelId._id,
  );
  const selectedFee = matchingFees.find((item) => item._id === tuitionFeeId);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const schoolId = user
      ? typeof user.schoolId === 'string'
        ? user.schoolId
        : user.schoolId._id
      : '';
    if (!schoolId || !selectedEnrollment || !selectedFee || !firstDueDate || !secondDueDate) {
      toast.error('Select an enrollment, fee, and both installment due dates');
      return;
    }
    const total = selectedFee.amount;
    const precision = selectedFee.currency === 'KHR' ? 1 : 100;
    const firstAmount = Math.round((total / 2) * precision) / precision;
    try {
      const input = paymentPlanSchema.parse({
        schoolId,
        branchId,
        academicYearId: selectedEnrollment.academicYearId._id,
        academicPeriodId: selectedEnrollment.academicPeriodId?._id,
        enrollmentId: selectedEnrollment._id,
        studentId: selectedEnrollment.studentId._id,
        tuitionFeeId: selectedFee._id,
        totalAmount: total,
        currency: selectedFee.currency,
        installments: [
          { dueDate: firstDueDate, amount: firstAmount },
          { dueDate: secondDueDate, amount: Math.round((total - firstAmount) * 100) / 100 },
        ],
      });
      await createMutation.mutateAsync(input);
      setEnrollmentId('');
      setTuitionFeeId('');
      setFirstDueDate('');
      setSecondDueDate('');
      toast.success('Installment payment plan created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create payment plan');
    }
  };

  const handleCancel = async (plan: PaymentPlan) => {
    const reason = window.prompt('Reason for cancelling this payment plan:');
    if (!reason?.trim()) return;
    try {
      await cancelMutation.mutateAsync({ id: plan._id, reason: reason.trim() });
      toast.success('Payment plan cancelled');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to cancel payment plan');
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl leading-8 font-bold tracking-tight text-slate-950">
          Installment Payment Plans
        </h1>
        <p className="text-sm leading-5 text-slate-600">
          Track approved tuition installment schedules and due dates by branch.
        </p>
      </div>
      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 size-4 text-slate-400" />
            <Input
              className="pl-8"
              placeholder="Search student code or name"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
          <Select
            aria-label="Branch"
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);
              setEnrollmentId('');
              setTuitionFeeId('');
              setPage(1);
            }}
          >
            {currentBranchId === 'all' && <option value="">All Branches</option>}
            {branchOptions.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branchNameEn}
              </option>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as PaymentPlan['status'] | '');
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </CardContent>
      </Card>
      {canManagePlans && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Create Two-Part Installment Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-5">
              <Select
                value={enrollmentId}
                aria-label="Enrollment"
                onChange={(event) => {
                  setEnrollmentId(event.target.value);
                  setTuitionFeeId('');
                }}
                disabled={!branchId || branchId === 'all'}
              >
                <option value="">Select enrollment</option>
                {(enrollmentsData?.data ?? []).map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.enrollmentCode} · {item.studentId.firstName} {item.studentId.lastName}
                  </option>
                ))}
              </Select>
              <Select
                value={tuitionFeeId}
                aria-label="Tuition fee"
                onChange={(event) => setTuitionFeeId(event.target.value)}
                disabled={!branchId || branchId === 'all'}
              >
                <option value="">Select tuition fee</option>
                {matchingFees.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.feeCode} · {item.feeName} ({formatCurrency(item.amount, item.currency)})
                  </option>
                ))}
              </Select>
              <Input
                type="date"
                aria-label="First installment due date"
                value={firstDueDate}
                onChange={(event) => setFirstDueDate(event.target.value)}
              />
              <Input
                type="date"
                aria-label="Second installment due date"
                min={firstDueDate || undefined}
                value={secondDueDate}
                onChange={(event) => setSecondDueDate(event.target.value)}
              />
              <Button
                type="submit"
                disabled={createMutation.isPending || !branchId || branchId === 'all'}
              >
                {createMutation.isPending ? 'Saving…' : 'Create Plan'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Plan Register</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isError ? (
            <p className="p-6 text-sm text-rose-700">Unable to load payment plans.</p>
          ) : isLoading ? (
            <p className="p-6 text-sm text-slate-500">Loading payment plans…</p>
          ) : plans.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">No payment plans found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-slate-50 text-left text-xs text-slate-500 uppercase">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Installments</th>
                    <th className="px-4 py-3">Next Due</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => {
                    const student = typeof plan.studentId === 'string' ? null : plan.studentId;
                    const next = plan.installments.find((item) => item.status !== 'paid');
                    return (
                      <tr key={plan._id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <div className="font-medium">
                            {student
                              ? `${student.firstName} ${student.lastName}`.trim() ||
                                student.khmerName ||
                                'Student name unavailable'
                              : 'Student name unavailable'}
                          </div>
                          <div className="text-xs text-slate-500">{student?.studentId}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          {formatCurrency(plan.totalAmount, plan.currency)}
                        </td>
                        <td className="px-4 py-3">
                          {plan.installments.filter((item) => item.status === 'paid').length} /{' '}
                          {plan.installments.length} paid
                        </td>
                        <td className="px-4 py-3">
                          {next ? (
                            <span className="inline-flex items-center gap-1">
                              <CalendarClock className="size-3.5" />
                              {new Date(next.dueDate).toLocaleDateString()}
                            </span>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            tone={
                              plan.status === 'active'
                                ? 'success'
                                : plan.status === 'cancelled'
                                  ? 'danger'
                                  : 'neutral'
                            }
                          >
                            {formatDataLabel(plan.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {canManagePlans && plan.status === 'active' && (
                            <Button size="sm" className="mr-2" onClick={() => setPayingPlan(plan)}>
                              Record payment
                            </Button>
                          )}
                          {canCancel && plan.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={cancelMutation.isPending}
                              onClick={() => void handleCancel(plan)}
                            >
                              <XCircle className="mr-1 size-3.5" />
                              Cancel
                            </Button>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      {payingPlan && (
        <InstallmentPaymentDialog plan={payingPlan} onClose={() => setPayingPlan(null)} />
      )}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm leading-5">
          <span>
            Page {page} of {data.pagination.totalPages} · {data.pagination.total} plans
          </span>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
