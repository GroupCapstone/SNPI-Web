'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Banknote,
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  Phone,
  MessageSquare,
  Receipt,
  RefreshCw,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslation } from '@/lib/i18n';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import { useFinancePulseQuery } from '../hooks/use-dashboard';
import type { OverdueStudentDebtItem } from '../types';
import { useTriggerTuitionReminderMutation } from '@/features/notifications/hooks/use-notifications';
import { toast } from 'sonner';

interface FinanceDashboardTabProps {
  branchId?: string;
  academicYearId?: string;
}

export const FinanceDashboardTab: React.FC<FinanceDashboardTabProps> = ({
  branchId,
  academicYearId,
}) => {
  const { isKhmer } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<number>(currentYear);
  const [selectedMonth, setSelectedMonth] = React.useState<number>(new Date().getMonth() + 1);
  const tuitionReminder = useTriggerTuitionReminderMutation();

  const { data, isLoading, isError, refetch, isFetching } = useFinancePulseQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    academicYearId,
    year: selectedYear,
    month: selectedMonth,
  });

  const pulse = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (isError || !pulse) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-6 text-sm text-rose-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-rose-600" />
            <span>
              {isKhmer
                ? 'មិនអាចទាញយកទិន្នន័យហិរញ្ញវត្ថុបានទេ'
                : 'Failed to load financial pulse data.'}
            </span>
          </div>
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-1 size-3.5" />
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </div>
      </div>
    );
  }

  const { today, overdueAging, overdueStudents, monthlyCollection, summary } = pulse;

  const formatCurrencyLines = (
    values: Array<{ currency: 'USD' | 'KHR'; amount: number }> | undefined,
    fallbackAmount = 0,
  ) => {
    if (!values || values.length === 0) {
      return fallbackAmount > 0 ? formatCurrency(fallbackAmount, 'USD') : 'No recorded amount';
    }
    return values.map((value) => formatCurrency(value.amount, value.currency)).join(' · ');
  };

  const selectedPeriod = summary?.selectedPeriod;
  const overdueSummary = summary?.overdue;
  const selectedCollected = selectedPeriod?.collectedByCurrency ?? [];
  const selectedScheduled = selectedPeriod?.scheduledByCurrency ?? [];
  const selectedOutstanding = selectedPeriod?.outstandingByCurrency ?? [];
  const selectedMonthData = monthlyCollection.find((item) => item.month === selectedMonth);
  const selectedMonthLabel = `${
    isKhmer ? selectedMonthData?.monthNameKh : selectedMonthData?.monthNameEn
  } ${selectedYear}`;

  const getMethodBadge = (m: string) => {
    switch (m.toLowerCase()) {
      case 'aba':
        return { label: 'ABA Pay', bg: 'bg-[#00509d]/10 text-[#00509d] border-[#00509d]/20' };
      case 'wing':
        return { label: 'Wing Bank', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'bank_transfer':
        return { label: 'Bank Transfer', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'credit_card':
        return { label: 'Card', bg: 'bg-violet-50 text-violet-700 border-violet-200' };
      case 'cash':
      default:
        return { label: 'Cash', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
  };

  return (
    <div className="space-y-6">
      {/* 0. Selected-period management summary */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-950">
                {isKhmer ? 'សង្ខេបហិរញ្ញវត្ថុប្រចាំខែ' : 'Financial Management Summary'}
              </h2>
              {isFetching && <RefreshCw className="size-3.5 animate-spin text-[#00509d]" />}
            </div>
            <p className="text-xs text-slate-500">
              {isKhmer
                ? `លទ្ធផលសម្រាប់ ${selectedMonthLabel} តាមសាខា និងឆ្នាំសិក្សាដែលបានជ្រើសរើស`
                : `Decision-ready view for ${selectedMonthLabel}, filtered by the selected branch and academic year`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor="finance-period-month">
              {isKhmer ? 'ខែ' : 'Month'}
            </label>
            <select
              id="finance-period-month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(Number(event.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-800"
            >
              {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                <option key={month} value={month}>
                  {new Intl.DateTimeFormat(isKhmer ? 'km-KH' : 'en-US', { month: 'short' }).format(
                    new Date(2020, month - 1, 1),
                  )}
                </option>
              ))}
            </select>
            <select
              aria-label={isKhmer ? 'ឆ្នាំ' : 'Year'}
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs font-medium text-slate-800"
            >
              {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: isKhmer ? 'បានប្រមូលក្នុងខែនេះ' : 'Collected this month',
              value: formatCurrencyLines(selectedCollected),
              detail: `${selectedPeriod?.transactionCount ?? 0} ${isKhmer ? 'ប្រតិបត្តិការ' : 'transactions'}`,
              icon: Banknote,
              iconClass: 'text-emerald-600',
              valueClass: 'text-emerald-700',
            },
            {
              label: isKhmer ? 'ត្រូវប្រមូលតាមវិក្កយបត្រ' : 'Scheduled to collect',
              value: formatCurrencyLines(selectedScheduled),
              detail: isKhmer
                ? 'ចំនួនទឹកប្រាក់តាមកាលកំណត់'
                : 'Based on scheduled invoice due dates',
              icon: CalendarDays,
              iconClass: 'text-[#00509d]',
              valueClass: 'text-[#023e8a]',
            },
            {
              label: isKhmer ? 'នៅសល់ត្រូវប្រមូល' : 'Outstanding this month',
              value: formatCurrencyLines(selectedOutstanding),
              detail: isKhmer
                ? 'ត្រូវតាមដាន និងទាក់ទងអាណាព្យាបាល'
                : 'Requires collection follow-up',
              icon: Clock,
              iconClass: 'text-amber-600',
              valueClass: 'text-amber-700',
            },
            {
              label: isKhmer ? 'បំណុលហួសកាលកំណត់' : 'Overdue balance',
              value: formatCurrencyLines(overdueSummary?.balanceByCurrency),
              detail: `${overdueSummary?.accountCount ?? overdueStudents.length} ${isKhmer ? 'គណនី' : 'accounts'} ${isKhmer ? 'ត្រូវដោះស្រាយ' : 'need attention'}`,
              icon: DollarSign,
              iconClass: 'text-rose-600',
              valueClass: 'text-rose-700',
            },
          ].map((metric) => (
            <Card key={metric.label} className="border border-slate-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs leading-4 font-semibold text-slate-500">{metric.label}</p>
                    <p
                      className={`mt-2 truncate text-xl font-bold tracking-tight ${metric.valueClass}`}
                    >
                      {metric.value}
                    </p>
                  </div>
                  <metric.icon className={`size-6 shrink-0 ${metric.iconClass}`} />
                </div>
                <p className="mt-2 text-xs leading-4 text-slate-500">{metric.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 1. Daily Reconciliation Banner */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-950">
              {isKhmer
                ? 'ការផ្ទៀងផ្ទាត់សាច់ប្រាក់ប្រចាំថ្ងៃ (Daily Cash Reconciliation)'
                : 'Daily Cash Reconciliation'}
            </h2>
            <p className="text-xs text-slate-500">
              {isKhmer
                ? 'ប្រាក់ចំណូលសរុបថ្ងៃនេះតាមវិធីបង់ប្រាក់នីមួយៗ'
                : 'Today revenue breakdown across payment channels'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">
              {isKhmer ? 'សរុបថ្ងៃនេះ' : 'Today Total'}:
            </span>
            <Badge tone="success" className="px-2.5 py-1 text-sm font-bold text-emerald-800">
              {formatCurrencyLines(today.totalsByCurrency, today.totalAmount)}
            </Badge>
          </div>
        </div>

        {today.splits.length === 0 ? (
          <Card className="border border-dashed border-slate-300 bg-slate-50/60">
            <CardContent className="py-8 text-center">
              <p className="text-sm font-semibold text-slate-700">
                {isKhmer ? 'មិនទាន់មានការទូទាត់នៅថ្ងៃនេះ' : 'No payments recorded today'}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {isKhmer
                  ? 'ទិន្នន័យនឹងបង្ហាញនៅទីនេះនៅពេលមានការទូទាត់ជាក់ស្តែង។'
                  : 'Payment channels appear here when actual transactions are recorded.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {today.splits.map((s) => {
              const badge = getMethodBadge(s.method);
              return (
                <Card
                  key={`${s.method}-${s.currency}`}
                  className="border border-slate-200 bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">{badge.label}</span>
                      <CreditCard className="size-4 text-slate-400" />
                    </div>
                    <div className="mt-2">
                      <div className="text-xl font-bold tracking-tight text-slate-950">
                        {formatCurrency(s.totalAmount, s.currency)}
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {s.transactionCount} {isKhmer ? 'ប្រតិបត្តិការ' : 'transactions'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* 2. Overdue Debt Aging Summary */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-950">
              {isKhmer
                ? 'បំណុលថ្លៃសិក្សាហួសកាលកំណត់ (Overdue Tuition Aging)'
                : 'Overdue Tuition Aging'}
            </h2>
            <p className="text-xs text-slate-500">
              {isKhmer
                ? 'ចំណាត់ថ្នាក់បំណុលតាមចំនួនថ្ងៃហួសកាលកំណត់'
                : 'Outstanding student tuition segmented by overdue duration'}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {overdueAging.map((b, idx) => (
            <Card
              key={b.range}
              className={cn(
                'border bg-white',
                idx === 2 ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200',
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge
                    tone={idx === 2 ? 'danger' : idx === 1 ? 'warning' : 'neutral'}
                    className="font-medium"
                  >
                    {isKhmer
                      ? b.range === '1-15'
                        ? 'ហួសកំណត់ ១–១៥ ថ្ងៃ'
                        : b.range === '16-30'
                          ? 'ហួសកំណត់ ១៦–៣០ ថ្ងៃ'
                          : 'ហួសកំណត់ ៣១+ ថ្ងៃ'
                      : b.label}
                  </Badge>
                  <AlertTriangle
                    className={cn(
                      'size-4',
                      idx === 2 ? 'text-rose-500' : idx === 1 ? 'text-amber-500' : 'text-slate-400',
                    )}
                  />
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight text-slate-950">
                    {formatCurrencyLines(b.amountsByCurrency, b.totalAmount)}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {b.count} {isKhmer ? 'គណនីហួសកំណត់' : 'overdue accounts'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Overdue Students Detail Table */}
      {overdueStudents.length > 0 && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-950">
                  {isKhmer
                    ? 'បញ្ជីសិស្សជំពាក់ថ្លៃសិក្សាត្រូវទាក់ទងរំលឹក (Overdue Student Collection Roster)'
                    : 'Overdue Student Collection Roster'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isKhmer
                    ? 'សិស្សដែលហួសកាលកំណត់បង់ប្រាក់ ចាំបាច់ត្រូវទូរស័ព្ទរំលឹកអាណាព្យាបាល'
                    : 'Students with unpaid invoices requiring immediate guardian outreach'}
                </CardDescription>
              </div>
              <Link
                href="/finance/payments"
                className="flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
              >
                <span>{isKhmer ? 'មើលការទូទាត់ទាំងអស់' : 'All Payments'}</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/75">
                  <TableHead className="text-xs">{isKhmer ? 'សិស្ស' : 'Student'}</TableHead>
                  <TableHead className="text-xs">
                    {isKhmer ? 'សាខា/ថ្នាក់' : 'Branch / Class'}
                  </TableHead>
                  <TableHead className="text-right text-xs">
                    {isKhmer ? 'ចំនួនជំពាក់' : 'Balance Due'}
                  </TableHead>
                  <TableHead className="text-xs">{isKhmer ? 'ថ្ងៃកំណត់' : 'Due Date'}</TableHead>
                  <TableHead className="text-xs">{isKhmer ? 'ហួសកំណត់' : 'Days Overdue'}</TableHead>
                  <TableHead className="text-xs">
                    {isKhmer ? 'អាណាព្យាបាល' : 'Primary Guardian'}
                  </TableHead>
                  <TableHead className="text-right text-xs">
                    {isKhmer ? 'សកម្មភាព' : 'Action'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueStudents.map((s: OverdueStudentDebtItem) => (
                  <TableRow key={s.paymentId} className="hover:bg-slate-50/50">
                    <TableCell>
                      <div>
                        <p className="font-semibold text-slate-900">{s.studentName}</p>
                        <p className="font-mono text-xs text-slate-500">{s.studentCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-medium text-slate-800">{s.className}</p>
                        <p className="text-xs text-slate-500">{s.branchName || 'Main'}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-rose-600">
                      {formatCurrency(s.balanceRemaining, s.currency === 'KHR' ? 'KHR' : 'USD')}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{s.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        tone={
                          s.daysOverdue > 30 ? 'danger' : s.daysOverdue > 15 ? 'warning' : 'neutral'
                        }
                      >
                        {s.daysOverdue} {isKhmer ? 'ថ្ងៃ' : 'days'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        <p className="font-medium text-slate-800">{s.guardianName || '-'}</p>
                        {s.guardianPhone && (
                          <a
                            href={`tel:${s.guardianPhone}`}
                            className="inline-flex items-center gap-1 text-xs text-[#00509d] hover:underline"
                          >
                            <Phone className="size-3" />
                            <span>{s.guardianPhone}</span>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={tuitionReminder.isPending}
                          onClick={() =>
                            void tuitionReminder
                              .mutateAsync({ paymentId: s.paymentId, channel: 'telegram' })
                              .then(() => toast.success('Payment reminder sent'))
                              .catch((error: unknown) =>
                                toast.error(
                                  error instanceof Error ? error.message : 'Reminder failed',
                                ),
                              )
                          }
                          className="h-8 text-xs"
                        >
                          <MessageSquare className="mr-1 size-3.5" />
                          {isKhmer ? 'ផ្ញើរំលឹក' : 'Remind'}
                        </Button>
                        <Link
                          href="/finance/payments"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
                        >
                          <Receipt className="size-3 text-[#00509d]" />
                          <span>{isKhmer ? 'វិក្កយបត្រ' : 'Invoice'}</span>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 4. 12-Month Tuition Collection Matrix */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-950">
              {isKhmer
                ? 'វដ្តប្រមូលថ្លៃសិក្សា ១២ ខែ (12-Month Tuition Collection Progress)'
                : '12-Month Tuition Collection Progress'}
            </h2>
            <p className="text-xs text-slate-500">
              {isKhmer
                ? `អត្រាប្រមូលប្រាក់ និងបំណុលនៅសល់ប្រចាំខែនីមួយៗ ឆ្នាំ ${selectedYear}`
                : `Target collection vs collected performance for Year ${selectedYear}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-12">
          {monthlyCollection.map((m) => {
            const primaryCurrency =
              m.currencyBreakdown?.find((item) => item.currency === 'USD') ??
              m.currencyBreakdown?.[0];
            const collectionRate = primaryCurrency?.collectionRate ?? m.collectionRate;
            const isCurrentMonth = m.month === selectedMonth;
            return (
              <div
                key={m.month}
                className={cn(
                  'rounded-xl border p-2.5 text-center transition-all',
                  isCurrentMonth
                    ? 'border-[#00509d] bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 bg-white hover:border-slate-300',
                )}
              >
                <p className="text-xs font-bold text-slate-700">
                  {isKhmer ? m.monthNameKh : m.monthNameEn.slice(0, 3)}
                </p>
                <p className="mt-1 font-mono text-xs font-bold text-slate-900">
                  {m.currencyBreakdown && m.currencyBreakdown.length > 0
                    ? m.currencyBreakdown
                        .map((item) => formatCurrency(item.collectedAmount, item.currency))
                        .join(' · ')
                    : formatCurrency(m.collectedAmount, 'USD')}
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn(
                      'h-full rounded-full',
                      collectionRate >= 80
                        ? 'bg-emerald-500'
                        : collectionRate >= 50
                          ? 'bg-amber-500'
                          : 'bg-slate-400',
                    )}
                    style={{ width: `${Math.min(100, Math.max(5, collectionRate))}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">{collectionRate}%</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
