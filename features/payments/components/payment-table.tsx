'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Edit2,
  FileText,
  Plus,
  Printer,
  Search,
  Trash2,
} from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { openOfficialPdf } from '@/features/reports/api/report-api';
import { formatCurrency, formatDataLabel } from '@/lib/formatters';

import {
  useDeletePaymentMutation,
  useGenerateMonthlyInvoicesMutation,
  useMonthlyFinancialSummaryQuery,
  usePaymentsQuery,
} from '../hooks/use-payments';
import type { Payment, PaymentFilters, PaymentMethod, PaymentStatus, PaymentType } from '../types';
import { PaymentDialog } from './payment-dialog';

const paymentMonthList = [
  { value: 1, label: '1 - Jan (មករា)' },
  { value: 2, label: '2 - Feb (កុម្ភៈ)' },
  { value: 3, label: '3 - Mar (មីនា)' },
  { value: 4, label: '4 - Apr (មេសា)' },
  { value: 5, label: '5 - May (ឧសភា)' },
  { value: 6, label: '6 - Jun (មិថុនា)' },
  { value: 7, label: '7 - Jul (កក្កដា)' },
  { value: 8, label: '8 - Aug (សីហា)' },
  { value: 9, label: '9 - Sep (កញ្ញា)' },
  { value: 10, label: '10 - Oct (តុលា)' },
  { value: 11, label: '11 - Nov (វិច្ឆិកា)' },
  { value: 12, label: '12 - Dec (ធ្នូ)' },
];

export const PaymentTable = () => {
  const { hasPermission, user, currentBranchId } = useAuth();
  const { data: academicYears = [] } = useAcademicYearsQuery();
  const [filters, setFilters] = React.useState<PaymentFilters>({
    page: 1,
    limit: 20,
  });
  const [filterYear, setFilterYear] = React.useState<number | ''>('');
  const [filterMonth, setFilterMonth] = React.useState<number | ''>('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState<Payment | null>(null);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const paymentYears = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => currentYear + 1 - i),
    [currentYear],
  );

  const activeYear = typeof filterYear === 'number' ? filterYear : currentYear;
  const activeMonth = typeof filterMonth === 'number' ? filterMonth : currentMonth;
  const isMonthSelected = typeof filterYear === 'number' && typeof filterMonth === 'number';

  const { data: monthlySummaryData } = useMonthlyFinancialSummaryQuery(
    activeYear,
    activeMonth,
    filters.branchId,
  );
  const monthlySummary = monthlySummaryData?.data;

  const handleDateFilterChange = (newYear: number | '', newMonth: number | '') => {
    setFilterYear(newYear);
    setFilterMonth(newMonth);

    setFilters((prev) => ({
      ...prev,
      billingYear: newYear ? Number(newYear) : undefined,
      billingMonth: newMonth ? Number(newMonth) : undefined,
      startDate: undefined,
      endDate: undefined,
      page: 1,
    }));
  };

  const navigateMonth = (direction: -1 | 1) => {
    let y = typeof filterYear === 'number' ? filterYear : currentYear;
    let m = typeof filterMonth === 'number' ? filterMonth : currentMonth;

    m += direction;
    if (m < 1) {
      m = 12;
      y -= 1;
    } else if (m > 12) {
      m = 1;
      y += 1;
    }
    handleDateFilterChange(y, m);
  };

  const { data: branchesData } = useBranchesQuery();
  const branches = branchesData?.data ?? [];

  const { data, isLoading } = usePaymentsQuery(filters);
  const deleteMutation = useDeletePaymentMutation();
  const generateInvoicesMutation = useGenerateMonthlyInvoicesMutation();
  const invoiceAcademicYearId =
    filters.academicYearId ||
    academicYears.find((year) => year.isCurrent)?._id ||
    academicYears[0]?._id;

  const payments = data?.data ?? [];
  const pagination = data?.pagination;
  const canPrintReceipt =
    hasPermission('receipt.print.own_branch') ||
    hasPermission('receipt.print.all_branches') ||
    hasPermission('finance.receipt.print.own_branch') ||
    hasPermission('finance.receipt.print.all_branches');
  const canPrintInvoice =
    hasPermission('invoice.print.own_branch') ||
    hasPermission('invoice.print.all_branches') ||
    hasPermission('finance.receipt.print.own_branch') ||
    hasPermission('finance.receipt.print.all_branches');
  const canVoid =
    hasPermission('payment.void.own_branch') ||
    hasPermission('payment.void.all_branches') ||
    hasPermission('finance.void.request.own_branch') ||
    hasPermission('finance.void.request.all_branches');
  const canCollect =
    hasPermission('payment.create.own_branch') ||
    hasPermission('payment.create.all_branches') ||
    hasPermission('finance.payment.create.own_branch') ||
    hasPermission('finance.payment.create.all_branches');

  const handleEdit = (item: Payment) => {
    setSelectedPayment(item);
    setDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPayment(null);
    setDialogOpen(true);
  };

  const handleGenerateInvoices = async () => {
    const branchId = filters.branchId || (currentBranchId !== 'all' ? currentBranchId : '');
    const schoolId = user
      ? typeof user.schoolId === 'string'
        ? user.schoolId
        : user.schoolId._id
      : undefined;
    if (!branchId || !schoolId || !invoiceAcademicYearId) {
      toast.error('Select one concrete branch before generating monthly invoices');
      return;
    }
    const year = Number(window.prompt('Invoice year:', String(currentYear)));
    const month = Number(window.prompt('Invoice month (1-12):', String(currentMonth)));
    if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) return;
    try {
      const result = await generateInvoicesMutation.mutateAsync({
        schoolId,
        branchId,
        academicYearId: invoiceAcademicYearId,
        year,
        month,
      });
      toast.success(
        `${result.data.created} invoice(s) generated; ${result.data.skipped} already existed`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to generate invoices');
    }
  };

  const handleDelete = async (id: string, receiptNumber: string) => {
    const reason = prompt(`Reason for voiding confirmed receipt "${receiptNumber}":`);
    if (reason?.trim()) {
      await deleteMutation.mutateAsync({ id, reason: reason.trim() });
    }
  };

  const openPdf = async (path: string) => {
    try {
      await openOfficialPdf(path);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to generate document');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tuition Payments & Receipts Ledger
          </h1>
          <p className="text-sm text-slate-500">
            Real-time cashier receipt records, ABA PAY tracking, and outstanding balance ledger.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {(hasPermission('tuition.view.own_branch') ||
            hasPermission('tuition.view.all_branches') ||
            hasPermission('finance.fee_structure.manage.own_branch') ||
            hasPermission('finance.fee_structure.manage.all_branches')) && (
            <Link href="/finance/tuition">
              <Button variant="outline" className="border-blue-300 text-[#00509d] hover:bg-blue-50">
                <DollarSign className="mr-1.5 size-4" />
                Fee Structures
              </Button>
            </Link>
          )}

          {canCollect && (
            <Button onClick={handleCreate} className="bg-[#023e8a] hover:bg-[#00509d]">
              <Plus className="mr-1.5 size-4" />
              Record Payment
            </Button>
          )}
          {canCollect && (
            <Button
              variant="outline"
              onClick={() => void handleGenerateInvoices()}
              disabled={generateInvoicesMutation.isPending}
            >
              {generateInvoicesMutation.isPending ? 'Generating…' : 'Generate Monthly Invoices'}
            </Button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 size-4 text-slate-400" />
              <Input
                placeholder="Search receipt / ref..."
                value={filters.search ?? ''}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }))
                }
                className="pl-8"
              />
            </div>

            <Select
              value={filterYear ? String(filterYear) : ''}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : '';
                handleDateFilterChange(val, filterMonth);
              }}
              aria-label="Filter by year"
            >
              <option value="">All Years</option>
              {paymentYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>

            <Select
              value={filterMonth ? String(filterMonth) : ''}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : '';
                handleDateFilterChange(filterYear || currentYear, val);
              }}
              aria-label="Filter by month"
            >
              <option value="">All Months</option>
              {paymentMonthList.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </Select>

            <Select
              value={filters.branchId ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, branchId: e.target.value || undefined, page: 1 }))
              }
            >
              <option value="">All Branches</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
                </option>
              ))}
            </Select>

            <Select
              value={filters.status ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: (e.target.value as PaymentStatus) || undefined,
                  page: 1,
                }))
              }
            >
              <option value="">All Statuses</option>
              <option value="paid">Paid (Cleared)</option>
              <option value="partial">Partial Payment</option>
              <option value="pending">Pending Payment</option>
              <option value="voided">Voided</option>
            </Select>

            <Select
              value={filters.paymentType ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paymentType: (e.target.value as PaymentType) || undefined,
                  page: 1,
                }))
              }
            >
              <option value="">All Categories</option>
              <option value="tuition_monthly">Monthly Tuition</option>
              <option value="tuition_term">Term Tuition</option>
              <option value="registration_fee">Registration Fee</option>
              <option value="uniform">Uniform</option>
              <option value="books">Books</option>
              <option value="other">Other Fees</option>
            </Select>

            <Select
              value={filters.paymentMethod ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paymentMethod: (e.target.value as PaymentMethod) || undefined,
                  page: 1,
                }))
              }
            >
              <option value="">All Payment Methods</option>
              <option value="cash">Cash</option>
              <option value="aba_pay">ABA PAY</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="credit_card">Credit Card</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Month Navigator & Financial Metrics Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-linear-to-r from-blue-50/70 via-white to-slate-50/70 p-3.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(-1)}
            className="h-8 w-8 border-blue-200 p-0 text-[#00509d] hover:bg-blue-100/60"
            title="Previous Month"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="flex items-center gap-2 rounded-lg border border-blue-200/80 bg-white px-3 py-1.5 shadow-2xs">
            <Calendar className="size-4 text-[#00509d]" />
            <span className="text-sm font-bold text-slate-800">
              {paymentMonthList.find((m) => m.value === activeMonth)?.label ??
                `Month ${activeMonth}`}{' '}
              {activeYear}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth(1)}
            className="h-8 w-8 border-blue-200 p-0 text-[#00509d] hover:bg-blue-100/60"
            title="Next Month"
          >
            <ChevronRight className="size-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDateFilterChange(currentYear, currentMonth)}
            className="h-8 border-blue-200 px-2.5 text-xs font-semibold text-[#00509d] hover:bg-blue-50"
          >
            This Month
          </Button>

          {isMonthSelected && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDateFilterChange('', '')}
              className="h-8 px-2.5 text-xs text-slate-500 hover:text-slate-900"
            >
              All Time
            </Button>
          )}
        </div>

        {isMonthSelected && monthlySummary && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-900">
              <span className="text-emerald-700">USD Revenue:</span>
              <span className="font-bold">
                {formatCurrency(monthlySummary.totalRevenueUsd, 'USD')}
              </span>
            </div>
            {monthlySummary.totalRevenueKhr > 0 && (
              <div className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 font-medium text-blue-900">
                <span className="text-blue-700">KHR:</span>
                <span className="font-bold">
                  {formatCurrency(monthlySummary.totalRevenueKhr, 'KHR')}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/70 px-2.5 py-1 font-medium text-slate-700">
              <span>Transactions:</span>
              <span className="font-bold text-slate-900">{monthlySummary.totalTransactions}</span>
              <span className="text-[11px] text-slate-400">
                ({monthlySummary.paidTransactions} Paid, {monthlySummary.partialTransactions}{' '}
                Partial)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      <Card className="border-slate-200">
        <CardHeader className="border-b border-slate-100 px-6 py-4">
          <CardTitle className="text-base font-semibold text-slate-800">
            Payment Transactions & Receipts
          </CardTitle>
          <CardDescription>
            Total of {pagination?.total ?? payments.length} payment receipts recorded
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/75">
                  <TableHead className="font-semibold text-slate-700">Receipt No.</TableHead>
                  <TableHead className="font-semibold text-slate-700">Student</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fee Item</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fee Month</TableHead>
                  <TableHead className="font-semibold text-slate-700">Category</TableHead>
                  <TableHead className="font-semibold text-slate-700">Method</TableHead>
                  <TableHead className="font-semibold text-slate-700">Amount Paid</TableHead>
                  <TableHead className="font-semibold text-slate-700">Balance</TableHead>
                  <TableHead className="font-semibold text-slate-700">Date</TableHead>
                  <TableHead className="font-semibold text-slate-700">Status</TableHead>
                  <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={11} className="py-8 text-center text-sm text-slate-500">
                      Loading payment transactions...
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="py-8 text-center text-sm text-slate-500">
                      No payment records found.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((p) => {
                    const student =
                      typeof p.studentId === 'object' && p.studentId
                        ? (p.studentId as unknown as {
                            studentId?: string;
                            firstName?: string;
                            lastName?: string;
                            khmerName?: string;
                          })
                        : null;

                    const studentName = student
                      ? [student.firstName, student.lastName].filter(Boolean).join(' ') ||
                        student.khmerName ||
                        'Student name unavailable'
                      : 'Student name unavailable';

                    const fee =
                      typeof p.tuitionFeeId === 'object'
                        ? p.tuitionFeeId.feeName || p.tuitionFeeId.feeCode
                        : 'Fee label unavailable';

                    const coverageLabel =
                      p.coveragePeriodLabel ||
                      (p.billingMonth
                        ? `${
                            paymentMonthList
                              .find((m) => m.value === p.billingMonth)
                              ?.label.split(' - ')[1]
                              ?.split(' ')[0] ?? p.billingMonth
                          } ${p.billingYear ?? ''}`
                        : '-');

                    return (
                      <TableRow key={p._id} className="hover:bg-slate-50/60">
                        <TableCell>
                          <span className="font-mono text-xs font-bold text-[#023e8a]">
                            {p.receiptNumber}
                          </span>
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          <div className="flex flex-col whitespace-nowrap">
                            <span className="font-semibold text-slate-900">{studentName}</span>
                            <span className="font-mono text-xs text-slate-400">
                              {student?.studentId ?? '—'}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-xs text-slate-800">{fee}</TableCell>

                        <TableCell>
                          <span className="inline-flex items-center rounded-md border border-blue-200/60 bg-blue-50 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-[#00509d]">
                            {coverageLabel}
                          </span>
                        </TableCell>

                        <TableCell>
                          <Badge
                            tone="neutral"
                            className="text-[11px] whitespace-nowrap capitalize"
                          >
                            {formatDataLabel(p.paymentType ?? 'tuition_monthly')}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge>{formatDataLabel(p.paymentMethod)}</Badge>
                        </TableCell>

                        <TableCell>
                          <span className="text-sm font-bold text-emerald-700">
                            {formatCurrency(p.amountPaid, p.currency)}
                          </span>
                        </TableCell>

                        <TableCell>
                          <span
                            className={`text-xs font-semibold ${p.balanceRemaining > 0 ? 'text-rose-600' : 'text-slate-500'}`}
                          >
                            {formatCurrency(p.balanceRemaining, p.currency)}
                          </span>
                        </TableCell>

                        <TableCell className="text-xs whitespace-nowrap text-slate-600">
                          {p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : '-'}
                        </TableCell>

                        <TableCell>
                          <Badge
                            tone={
                              p.status === 'paid'
                                ? 'success'
                                : p.status === 'partial'
                                  ? 'warning'
                                  : p.status === 'pending'
                                    ? 'neutral'
                                    : 'danger'
                            }
                          >
                            {formatDataLabel(p.status)}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {canPrintReceipt && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => void openPdf(`/reports/receipts/${p._id}/pdf`)}
                                className="h-8 w-8 p-0 text-[#00509d]"
                                title="Print receipt"
                              >
                                <Printer className="size-3.5" />
                              </Button>
                            )}
                            {canPrintInvoice && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => void openPdf(`/reports/invoices/${p._id}/pdf`)}
                                className="h-8 w-8 p-0 text-[#00509d]"
                                title="Print invoice"
                              >
                                <FileText className="size-3.5" />
                              </Button>
                            )}
                            {hasPermission('payment.edit.own_branch') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(p)}
                                className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900"
                              >
                                <Edit2 className="size-3.5" />
                              </Button>
                            )}

                            {canVoid && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(p._id, p.receiptNumber)}
                                className="h-8 w-8 p-0 text-rose-600 hover:bg-rose-50"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PaymentDialog open={dialogOpen} onOpenChange={setDialogOpen} payment={selectedPayment} />
    </div>
  );
};
