'use client';

import * as React from 'react';
import {
  AlertCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  FileDown,
  FileText,
  Phone,
  Receipt,
  ReceiptText,
  Search,
  Wallet,
  X,
} from '@/components/icons';
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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDebtAgingQuery, usePaymentsQuery } from '@/features/payments/hooks/use-payments';
import type { DebtAgingBucket, PaymentStatus } from '@/features/payments/types';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { formatDate, formatDateTime } from '@/lib/formatters';

import { getInvoicePreview, getReceiptPreview, openOfficialPdf } from '../api/report-api';
import { useMonthlyReportOverviewQuery } from '../hooks/use-reports';
import type { MonthlyPaymentCell, ReportPreview } from '../types';
import { ReportNavHeader } from './report-nav-header';

const financeMonthList = [
  { number: 1, kh: 'មករា', en: 'January' },
  { number: 2, kh: 'កុម្ភៈ', en: 'February' },
  { number: 3, kh: 'មីនា', en: 'March' },
  { number: 4, kh: 'មេសា', en: 'April' },
  { number: 5, kh: 'ឧសភា', en: 'May' },
  { number: 6, kh: 'មិថុនា', en: 'June' },
  { number: 7, kh: 'កក្កដា', en: 'July' },
  { number: 8, kh: 'សីហា', en: 'August' },
  { number: 9, kh: 'កញ្ញា', en: 'September' },
  { number: 10, kh: 'តុលា', en: 'October' },
  { number: 11, kh: 'វិច្ឆិកា', en: 'November' },
  { number: 12, kh: 'ធ្នូ', en: 'December' },
];

const paymentStatusTones: Record<PaymentStatus, 'success' | 'warning' | 'neutral' | 'danger'> = {
  paid: 'success',
  partial: 'warning',
  pending: 'warning',
  voided: 'danger',
};

const cellStatusTones: Record<
  MonthlyPaymentCell['status'],
  'success' | 'warning' | 'neutral' | 'danger'
> = {
  paid: 'success',
  partial: 'warning',
  unpaid: 'danger',
  upcoming: 'neutral',
  not_configured: 'neutral',
};

const record = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};

export const FinanceReportsView = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();

  const [activeTab, setActiveTab] = React.useState<'ledger' | 'matrix' | 'aging' | 'tools'>(
    'ledger',
  );
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(
    new Date().getMonth() + 1,
  );
  const [branchId, setBranchId] = React.useState('');
  const [currency, setCurrency] = React.useState<'USD' | 'KHR' | ''>('');
  const [statusFilter, setStatusFilter] = React.useState<PaymentStatus | ''>('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  // Tools & Preview state
  const [manualPaymentId, setManualPaymentId] = React.useState('');
  const [preview, setPreview] = React.useState<ReportPreview | null>(null);
  const [busyAction, setBusyAction] = React.useState('');

  const copy = isKhmer
    ? {
        title: 'របាយការណ៍ហិរញ្ញវត្ថុ',
        subtitle:
          'របាយការណ៍ចំណូលថ្លៃសិក្សា កំណត់ត្រាបេឡាធិការ វិក្កយបត្រ បង្កាន់ដៃ និងតាមដានបំណុលសិស្ស',
        allBranches: 'គ្រប់សាខា',
        allMonths: 'គ្រប់ខែ (១២ ខែ)',
        allCurrencies: 'គ្រប់រូបិយប័ណ្ណ',
        allStatuses: 'គ្រប់ស្ថានភាពបង់ប្រាក់',
        searchPlaceholder: 'ស្វែងរកតាមលេខបង្កាន់ដៃ ឈ្មោះសិស្ស ឬលេខសម្គាល់…',
        totalRevenueUsd: 'ចំណូលសរុប (ដុល្លារ)',
        totalRevenueKhr: 'ចំណូលសរុប (រៀល)',
        paidCount: 'ប្រតិបត្តិការបានបង់រួច',
        partialCount: 'បង់ប្រាក់មួយផ្នែក',
        unpaidCount: 'មិនទាន់បង់ប្រាក់',
        overdueCount: 'គណនីហួសកាលកំណត់',
        tabLedger: 'កំណត់ត្រាចំណូលបេឡាធិការ (Ledger)',
        tabMatrix: 'តារាងតាមដានថ្លៃសិក្សាប្រចាំខែ (Tuition Matrix)',
        tabAging: 'របាយការណ៍បំណុលសិស្សតាមអាយុកាល (Debt Aging)',
        tabTools: 'កម្មវិធីចេញបង្កាន់ដៃ និងវិក្កយបត្រ (Doc Tools)',
        receiptNumber: 'លេខបង្កាន់ដៃ',
        student: 'សិស្ស',
        feeItem: 'ប្រភេទកម្រៃ / ថ្លៃសិក្សា',
        coverageMonth: 'ខែបង់ថ្លៃសិក្សា',
        category: 'ចំណាត់ថ្នាក់',
        amountDue: 'ទឹកប្រាក់ត្រូវបង់',
        amountPaid: 'បានបង់',
        balance: 'នៅខ្វះ',
        paymentMethod: 'វិធីសាស្ត្របង់',
        date: 'កាលបរិច្ឆេទ',
        status: 'ស្ថានភាព',
        actions: 'សកម្មភាព',
        previewReceipt: 'បង្កាន់ដៃ',
        previewInvoice: 'វិក្កយបត្រ',
        pdfReceipt: 'ទាញយក PDF បង្កាន់ដៃ',
        pdfInvoice: 'ទាញយក PDF វិក្កយបត្រ',
        printReport: 'បោះពុម្ពរបាយការណ៍ហិរញ្ញវត្ថុ',
        noData: 'មិនមានទិន្នន័យហិរញ្ញវត្ថុទេ',
        loading: 'កំពុងទាញយកទិន្នន័យហិរញ្ញវត្ថុ…',
        page: 'ទំព័រ',
        previous: 'ថយក្រោយ',
        next: 'បន្ទាប់',
        officialTitle: 'របាយការណ៍ហិរញ្ញវត្ថុ និងចំណូលថ្លៃសិក្សាផ្លូវការ',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        cashierSignature: 'បេឡាធិការ / គណនេយ្យករ',
        directorSignature: 'នាយកសាលា / គណៈគ្រប់គ្រង',
        agingCurrent: 'មិនទាន់ហួសកំណត់',
        aging30: 'ហួសកំណត់ ១-៣០ ថ្ងៃ',
        aging60: 'ហួសកំណត់ ៣១-៦០ ថ្ងៃ',
        aging90: 'ហួសកំណត់ ៦០+ ថ្ងៃ',
        parentPhone: 'លេខទូរស័ព្ទអាណាព្យាបាល',
        overdueDays: 'ចំនួនថ្ងៃហួសកំណត់',
        unpaidBalance: 'សមតុល្យនៅជំពាក់',
        exportCsv: 'ទាញយកឯកសារ CSV',
      }
    : {
        title: 'Financial Reports',
        subtitle:
          'Tuition revenue, cashier collection ledger, receipts, invoices, and overdue tuition tracking',
        allBranches: 'All Branches',
        allMonths: 'All Months (12 Months)',
        allCurrencies: 'All Currencies',
        allStatuses: 'All Payment Statuses',
        searchPlaceholder: 'Search by receipt number, student name, or ID…',
        totalRevenueUsd: 'Total Revenue (USD)',
        totalRevenueKhr: 'Total Revenue (KHR)',
        paidCount: 'Paid Transactions',
        partialCount: 'Partial Payments',
        unpaidCount: 'Unpaid / Pending',
        overdueCount: 'Overdue Accounts',
        tabLedger: 'Cashier Collection Ledger',
        tabMatrix: 'Monthly Tuition Matrix',
        tabAging: 'Student Debt Aging & Overdue',
        tabTools: 'Receipt & Invoice Document Tools',
        receiptNumber: 'Receipt #',
        student: 'Student',
        feeItem: 'Fee Type / Description',
        coverageMonth: 'Fee Month',
        category: 'Category',
        amountDue: 'Amount Due',
        amountPaid: 'Amount Paid',
        balance: 'Balance Remaining',
        paymentMethod: 'Method',
        date: 'Payment Date',
        status: 'Status',
        actions: 'Actions',
        previewReceipt: 'Receipt',
        previewInvoice: 'Invoice',
        pdfReceipt: 'Receipt PDF',
        pdfInvoice: 'Invoice PDF',
        printReport: 'Print Financial Report',
        noData: 'No financial records found for this scope.',
        loading: 'Loading financial reports…',
        page: 'Page',
        previous: 'Previous',
        next: 'Next',
        officialTitle: 'Official Financial & Tuition Revenue Report',
        preparedBy: 'Prepared by',
        cashierSignature: 'Cashier / Accountant',
        directorSignature: 'Principal / School Director',
        agingCurrent: 'Current Due',
        aging30: '1-30 Days Overdue',
        aging60: '31-60 Days Overdue',
        aging90: '60+ Days Overdue',
        parentPhone: 'Guardian Phone',
        overdueDays: 'Days Overdue',
        unpaidBalance: 'Unpaid Balance',
        exportCsv: 'Export Aging CSV',
      };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i);

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });

  // Payments ledger query with explicit monthly filters
  const { data: paymentsData, isLoading: isPaymentsLoading } = usePaymentsQuery({
    branchId: branchId || undefined,
    status: statusFilter || undefined,
    billingYear: year,
    billingMonth: selectedMonth ?? undefined,
    search: search.trim() || undefined,
    page,
    limit: 15,
  });

  // Monthly Overview for tuition matrix & KPIs
  const { data: monthlyData, isLoading: isMonthlyLoading } = useMonthlyReportOverviewQuery({
    year,
    month: selectedMonth ?? undefined,
    branchId: branchId || undefined,
    paymentCurrency: currency || undefined,
    search: search.trim() || undefined,
    page,
    limit: 25,
  });

  // Debt Aging query
  const { data: debtAgingData, isLoading: isDebtAgingLoading } = useDebtAgingQuery(
    branchId || undefined,
  );
  const debtAging = debtAgingData?.data;

  const navigateMonth = (direction: -1 | 1) => {
    let y = year;
    let m = selectedMonth ?? new Date().getMonth() + 1;
    m += direction;
    if (m < 1) {
      m = 12;
      y -= 1;
    } else if (m > 12) {
      m = 1;
      y += 1;
    }
    setYear(y);
    setSelectedMonth(m);
    setPage(1);
  };

  const exportDebtAgingCsv = () => {
    if (!debtAging?.items?.length) {
      toast.error('No debt records to export');
      return;
    }

    const headers = [
      'Student ID',
      'Student Name (EN)',
      'Student Name (KH)',
      'Branch',
      'Class',
      'Fee Item',
      'Currency',
      'Unpaid Balance',
      'Due Date',
      'Overdue Days',
      'Aging Category',
      'Guardian Phone',
    ];

    const rows = debtAging.items.map((item) => [
      `"${item.studentCode}"`,
      `"${item.studentNameEn}"`,
      `"${item.studentNameKh ?? ''}"`,
      `"${item.branchCode}"`,
      `"${item.classCode ?? ''}"`,
      `"${item.feeName}"`,
      item.currency,
      item.unpaidBalance,
      item.dueDate ?? '',
      item.overdueDays,
      item.agingCategory,
      `"${item.parentPhone ?? ''}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `student-debt-aging-${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Debt aging report downloaded');
  };

  const payments = paymentsData?.data ?? [];
  const pagination = paymentsData?.pagination;
  const overview = monthlyData?.data;
  const monthSummary = overview?.selectedMonthSummary;

  const annualPaidCount = React.useMemo(() => {
    return (
      overview?.payments?.reduce(
        (sum, row) => sum + row.cells.filter((c) => c.status === 'paid').length,
        0,
      ) ?? 0
    );
  }, [overview?.payments]);

  const annualPartialCount = React.useMemo(() => {
    return (
      overview?.payments?.reduce(
        (sum, row) => sum + row.cells.filter((c) => c.status === 'partial').length,
        0,
      ) ?? 0
    );
  }, [overview?.payments]);

  const totalPaidCount = monthSummary ? monthSummary.paidCount : annualPaidCount;
  const totalPartialCount = monthSummary ? monthSummary.partialCount : annualPartialCount;
  const totalOverdueCount = monthSummary
    ? monthSummary.overdueCount
    : (overview?.summary?.overdueAccounts ?? 0);

  const runPreview = async (key: string, action: () => Promise<ReportPreview>) => {
    try {
      setBusyAction(key);
      const res = await action();
      setPreview(res);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to load preview');
    } finally {
      setBusyAction('');
    }
  };

  const downloadPdf = async (key: string, path: string) => {
    try {
      setBusyAction(key);
      await openOfficialPdf(path);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to generate PDF');
    } finally {
      setBusyAction('');
    }
  };

  const handleReset = () => {
    setYear(currentYear);
    setSelectedMonth(new Date().getMonth() + 1);
    setBranchId('');
    setCurrency('');
    setStatusFilter('');
    setSearch('');
    setPage(1);
  };

  const selectedBranchName = React.useMemo(() => {
    if (!branchId) return copy.allBranches;
    const found = (branchesData?.data ?? []).find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : copy.allBranches;
  }, [branchId, branchesData, getLocalizedValue, copy.allBranches]);

  return (
    <div className="space-y-6">
      {/* Top Shared Navigation */}
      <ReportNavHeader activeSection="finance" />

      {/* Screen Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            {copy.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{copy.subtitle}</p>
        </div>
      </div>

      {/* Print-Only Letterhead */}
      <div className="hidden border-b-2 border-[#023e8a] pb-4 print:block">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#023e8a]">{copy.officialTitle}</h2>
            <p className="mt-1 text-xs text-slate-600">
              {copy.allBranches}: <span className="font-semibold">{selectedBranchName}</span> |{' '}
              {copy.date}:{' '}
              <span className="font-semibold">
                {selectedMonth ? `${financeMonthList[selectedMonth - 1]?.en} ${year}` : year}
              </span>
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>SNP Management System</p>
            <p>{formatDateTime(new Date())}</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs print:hidden">
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {isKhmer ? 'ឆ្នាំសិក្សា' : 'Year'}
              </label>
              <Select
                value={String(year)}
                onChange={(e) => {
                  setYear(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-xl bg-white text-xs"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {copy.allBranches}
              </label>
              <Select
                value={branchId}
                onChange={(e) => {
                  setBranchId(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl bg-white text-xs"
              >
                <option value="">{copy.allBranches}</option>
                {(branchesData?.data ?? []).map((b) => (
                  <option key={b._id} value={b._id}>
                    {getLocalizedValue(b.branchNameKh, b.branchNameEn)}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {isKhmer ? 'រូបិយប័ណ្ណ' : 'Currency'}
              </label>
              <Select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as 'USD' | 'KHR' | '');
                  setPage(1);
                }}
                className="rounded-xl bg-white text-xs"
              >
                <option value="">{copy.allCurrencies}</option>
                <option value="USD">USD ($)</option>
                <option value="KHR">KHR (៛)</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {isKhmer ? 'ស្ថានភាព' : 'Payment Status'}
              </label>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as PaymentStatus | '');
                  setPage(1);
                }}
                className="rounded-xl bg-white text-xs"
              >
                <option value="">{copy.allStatuses}</option>
                <option value="paid">{isKhmer ? 'បង់រួច (Paid)' : 'Paid'}</option>
                <option value="partial">{isKhmer ? 'បង់មួយផ្នែក (Partial)' : 'Partial'}</option>
                <option value="pending">{isKhmer ? 'មិនទាន់បង់ (Pending)' : 'Pending'}</option>
                <option value="voided">{isKhmer ? 'បានលុបចោល (Voided)' : 'Voided'}</option>
              </Select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                {isKhmer ? 'ស្វែងរក' : 'Search'}
              </label>
              <div className="relative">
                <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <Input
                  className="rounded-xl bg-white pl-9 text-xs"
                  placeholder={copy.searchPlaceholder}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Month Selector Pills - Smooth, No Scrollbar */}
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto scroll-smooth border-t border-slate-100 pt-3.5">
            <span className="mr-1 shrink-0 text-xs font-semibold text-slate-500">
              {isKhmer ? 'ជ្រើសរើសខែ:' : 'Month:'}
            </span>
            <div className="mr-1 flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(-1)}
                className="size-8 rounded-xl border-slate-200 p-0 text-[#00509d] hover:bg-blue-50"
                title="Previous Month"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => navigateMonth(1)}
                className="size-8 rounded-xl border-slate-200 p-0 text-[#00509d] hover:bg-blue-50"
                title="Next Month"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant={selectedMonth === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMonth(null)}
              className={cn(
                'shrink-0 rounded-xl px-3 text-xs font-semibold transition-all',
                selectedMonth === null
                  ? 'bg-[#023e8a] text-white shadow-xs hover:bg-[#00509d]'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100',
              )}
            >
              {copy.allMonths}
            </Button>
            {financeMonthList.map((m) => {
              const isSelected = selectedMonth === m.number;
              return (
                <Button
                  key={m.number}
                  type="button"
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMonth(m.number)}
                  className={cn(
                    'shrink-0 rounded-xl px-3 text-xs font-semibold transition-all',
                    isSelected
                      ? 'bg-[#00509d] text-white shadow-xs hover:bg-[#023e8a]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-100',
                  )}
                >
                  {isKhmer ? m.kh : m.en}
                </Button>
              );
            })}

            {(branchId ||
              search ||
              currency ||
              statusFilter ||
              selectedMonth !== new Date().getMonth() + 1) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="ml-auto h-8 shrink-0 rounded-xl text-xs text-slate-500 hover:text-slate-900"
              >
                <X className="mr-1 size-3.5" />
                {isKhmer ? 'សម្អាតចម្រោះ' : 'Reset'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              {copy.totalRevenueUsd}
            </span>
            <DollarSign className="size-6 shrink-0 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            $
            {(
              monthSummary?.totalRevenueUsd ??
              overview?.trends?.reduce((acc, t) => acc + t.revenueUsd, 0) ??
              0
            ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {isKhmer ? 'រូបិយប័ណ្ណទូទាត់គោល (USD)' : 'Primary Billing Currency (USD)'}
          </p>
        </Card>

        <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              {copy.totalRevenueKhr}
            </span>
            <Wallet className="size-6 shrink-0 text-[#00509d]" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            ៛
            {(
              monthSummary?.totalRevenueKhr ??
              overview?.trends?.reduce((acc, t) => acc + t.revenueKhr, 0) ??
              0
            ).toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {isKhmer ? 'រូបិយប័ណ្ណក្នុងស្រុក (KHR)' : 'Local Currency Equivalent (KHR)'}
          </p>
        </Card>

        <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              {copy.paidCount}
            </span>
            <CreditCard className="size-6 shrink-0 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-600 sm:text-3xl">
            {totalPaidCount}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {totalPartialCount > 0
              ? `${totalPartialCount} ${copy.partialCount}`
              : isKhmer
                ? 'ប្រតិបត្តិការបង់រួច'
                : 'Completed collections'}
          </p>
        </Card>

        <Card className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              {copy.overdueCount}
            </span>
            <AlertCircle className="size-6 shrink-0 text-rose-600" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-rose-600 sm:text-3xl">
            {totalOverdueCount}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {monthSummary?.unpaidCount ?? 0} {copy.unpaidCount}
          </p>
        </Card>
      </div>

      {/* Tabs Header - Smooth Scroll */}
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto scroll-smooth border-b border-slate-200/80 pb-0.5 print:hidden">
        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={cn(
            'flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all',
            activeTab === 'ledger'
              ? 'border-[#00509d] text-[#00509d]'
              : 'border-transparent text-slate-500 hover:text-slate-900',
          )}
        >
          <Receipt className="size-4" />
          <span>{copy.tabLedger}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={cn(
            'flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all',
            activeTab === 'matrix'
              ? 'border-[#00509d] text-[#00509d]'
              : 'border-transparent text-slate-500 hover:text-slate-900',
          )}
        >
          <Calendar className="size-4" />
          <span>{copy.tabMatrix}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('aging')}
          className={cn(
            'flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all',
            activeTab === 'aging'
              ? 'border-[#00509d] text-[#00509d]'
              : 'border-transparent text-slate-500 hover:text-slate-900',
          )}
        >
          <AlertCircle className="size-4" />
          <span>{copy.tabAging}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tools')}
          className={cn(
            'flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-bold transition-all',
            activeTab === 'tools'
              ? 'border-[#00509d] text-[#00509d]'
              : 'border-transparent text-slate-500 hover:text-slate-900',
          )}
        >
          <FileText className="size-4" />
          <span>{copy.tabTools}</span>
        </button>
      </div>

      {/* Tab 1: Cashier Collection Ledger */}
      {activeTab === 'ledger' && (
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-4">
            <CardTitle className="text-base font-bold text-slate-900">{copy.tabLedger}</CardTitle>
            {pagination && (
              <span className="text-xs text-slate-500">
                {copy.page} {pagination.page} / {pagination.totalPages} ({pagination.total}{' '}
                {isKhmer ? 'កំណត់ត្រា' : 'records'})
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70">
                    <TableHead className="font-semibold">{copy.receiptNumber}</TableHead>
                    <TableHead className="font-semibold">{copy.student}</TableHead>
                    <TableHead className="font-semibold">{copy.feeItem}</TableHead>
                    <TableHead className="font-semibold">{copy.coverageMonth}</TableHead>
                    <TableHead className="font-semibold">{copy.category}</TableHead>
                    <TableHead className="font-semibold">{copy.amountPaid}</TableHead>
                    <TableHead className="font-semibold">{copy.balance}</TableHead>
                    <TableHead className="font-semibold">{copy.paymentMethod}</TableHead>
                    <TableHead className="font-semibold">{copy.date}</TableHead>
                    <TableHead className="font-semibold">{copy.status}</TableHead>
                    <TableHead className="text-right font-semibold print:hidden">
                      {copy.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isPaymentsLoading ? (
                    <TableRow>
                      <TableCell colSpan={11} className="py-8 text-center text-xs text-slate-500">
                        {copy.loading}
                      </TableCell>
                    </TableRow>
                  ) : payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="py-8 text-center text-xs text-slate-500">
                        {copy.noData}
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((payment) => {
                      const studentObj = record(payment.studentId);
                      const fullNameEn =
                        `${String(studentObj.firstName ?? '')} ${String(studentObj.lastName ?? '')}`.trim();
                      const studentKhmerName = String(studentObj.khmerName ?? '').trim();
                      const primaryName = isKhmer
                        ? studentKhmerName || fullNameEn
                        : fullNameEn || studentKhmerName;
                      const secondaryName = isKhmer
                        ? studentKhmerName && fullNameEn && studentKhmerName !== fullNameEn
                          ? fullNameEn
                          : ''
                        : fullNameEn && studentKhmerName && fullNameEn !== studentKhmerName
                          ? studentKhmerName
                          : '';
                      const studentCode = String(studentObj.studentId ?? '-');
                      const feeObj = record(payment.tuitionFeeId);
                      const feeName = String(feeObj.feeName ?? 'Tuition');
                      const currSymbol = payment.currency === 'KHR' ? '៛' : '$';

                      const coverageLabel =
                        payment.coveragePeriodLabel ||
                        (payment.billingMonth
                          ? `${financeMonthList[(payment.billingMonth || 1) - 1]?.en} ${payment.billingYear ?? ''}`
                          : '-');

                      return (
                        <TableRow key={payment._id} className="hover:bg-slate-50/50">
                          <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                            {payment.receiptNumber}
                          </TableCell>
                          <TableCell>
                            <p className="font-semibold text-slate-900">{primaryName || '-'}</p>
                            <p className="text-xs text-slate-500">
                              <span className="font-mono">{studentCode}</span>
                              {secondaryName ? ` · ${secondaryName}` : ''}
                            </p>
                          </TableCell>
                          <TableCell className="text-xs text-slate-700">{feeName}</TableCell>
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
                              {(payment.paymentType ?? 'tuition_monthly').replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold text-emerald-700">
                            {currSymbol}
                            {payment.amountPaid.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {payment.balanceRemaining > 0 ? (
                              <span className="font-semibold text-amber-600">
                                {currSymbol}
                                {payment.balanceRemaining.toLocaleString()}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 capitalize">
                            {payment.paymentMethod?.replaceAll('_', ' ')}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap text-slate-600">
                            <span
                              title={
                                payment.createdAt
                                  ? new Date(payment.createdAt).toLocaleString()
                                  : undefined
                              }
                            >
                              {formatDate(payment.paymentDate)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge tone={paymentStatusTones[payment.status] || 'neutral'}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right print:hidden">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                disabled={Boolean(busyAction)}
                                onClick={() =>
                                  void runPreview(
                                    `receipt-${payment._id}`,
                                    async () => (await getReceiptPreview(payment._id)).data,
                                  )
                                }
                              >
                                {copy.previewReceipt}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 text-xs"
                                disabled={Boolean(busyAction)}
                                onClick={() =>
                                  void runPreview(
                                    `invoice-${payment._id}`,
                                    async () => (await getInvoicePreview(payment._id)).data,
                                  )
                                }
                              >
                                {copy.previewInvoice}
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-[#00509d] hover:bg-[#00509d]/10"
                                disabled={Boolean(busyAction)}
                                title={copy.pdfReceipt}
                                onClick={() =>
                                  void downloadPdf(
                                    `receipt-pdf-${payment._id}`,
                                    `/reports/receipts/${payment._id}/pdf`,
                                  )
                                }
                              >
                                <FileDown className="size-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 p-4 print:hidden">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="text-xs"
                >
                  {copy.previous}
                </Button>
                <span className="text-xs text-slate-500">
                  {copy.page} {pagination.page} / {pagination.totalPages}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="text-xs"
                >
                  {copy.next}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Monthly Tuition Matrix */}
      {activeTab === 'matrix' && (
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">{copy.tabMatrix}</CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                {isKhmer
                  ? 'ការបង់ថ្លៃសិក្សាតាមខែនីមួយៗ នៃសិស្សម្នាក់ៗ និងបង្កាន់ដៃយោង'
                  : 'Student monthly tuition fee payment status, balance, and quick receipts'}
              </p>
            </div>
            {overview?.pagination && (
              <span className="text-xs text-slate-500">
                {copy.page} {overview.pagination.page} / {overview.pagination.totalPages}
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70">
                    <TableHead className="font-semibold">
                      {isKhmer ? 'កូដសិស្ស' : 'Student ID'}
                    </TableHead>
                    <TableHead className="font-semibold">
                      {isKhmer ? 'ឈ្មោះសិស្ស' : 'Student Name'}
                    </TableHead>
                    {financeMonthList.map((m) => (
                      <TableHead key={m.number} className="text-center text-xs font-semibold">
                        {isKhmer ? m.kh : m.en.slice(0, 3)}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isMonthlyLoading ? (
                    <TableRow>
                      <TableCell colSpan={14} className="py-8 text-center text-xs text-slate-500">
                        {copy.loading}
                      </TableCell>
                    </TableRow>
                  ) : !overview?.payments || overview.payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} className="py-8 text-center text-xs text-slate-500">
                        {copy.noData}
                      </TableCell>
                    </TableRow>
                  ) : (
                    overview.payments.map((row) => (
                      <TableRow key={row.studentId} className="hover:bg-slate-50/50">
                        <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                          {row.studentCode}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-slate-900">
                            {isKhmer ? row.khmerName || row.name : row.name}
                          </span>
                        </TableCell>
                        {financeMonthList.map((m) => {
                          const cell = row.cells.find((c) => c.month === m.number);
                          if (!cell) {
                            return (
                              <TableCell
                                key={m.number}
                                className="text-center text-xs text-slate-300"
                              >
                                -
                              </TableCell>
                            );
                          }
                          const tone = cellStatusTones[cell.status] || 'neutral';
                          return (
                            <TableCell key={m.number} className="p-2 text-center">
                              <Badge tone={tone} className="px-1.5 py-0.5 text-[10px] font-bold">
                                {cell.status === 'paid'
                                  ? 'PAID'
                                  : cell.status === 'partial'
                                    ? 'PART'
                                    : cell.status === 'unpaid'
                                      ? 'DUE'
                                      : '-'}
                              </Badge>
                              {cell.receipts?.length > 0 && (
                                <div className="mt-1 flex justify-center gap-1">
                                  {cell.receipts.slice(0, 1).map((r) => (
                                    <button
                                      key={r.id}
                                      type="button"
                                      className="font-mono text-[9px] text-[#00509d] underline hover:text-[#023e8a]"
                                      onClick={() =>
                                        void runPreview(
                                          `receipt-${r.id}`,
                                          async () => (await getReceiptPreview(r.id)).data,
                                        )
                                      }
                                      title={r.number}
                                    >
                                      {r.number}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab: Student Debt Aging & Overdue */}
      {activeTab === 'aging' && (
        <div className="space-y-4">
          {/* Aging Summary Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200 bg-white">
              <CardContent className="p-4">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {isKhmer ? 'បំណុលមិនទាន់ទូទាត់សរុប (USD)' : 'Total Outstanding (USD)'}
                </span>
                <p className="mt-2 text-xl font-bold text-rose-700">
                  $
                  {(debtAging?.summary?.totalUnpaidUsd ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {debtAging?.summary?.totalStudentsInDebt ?? 0}{' '}
                  {isKhmer ? 'សិស្សជំពាក់' : 'students in debt'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardContent className="p-4">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {isKhmer ? 'បំណុលមិនទាន់ទូទាត់សរុប (KHR)' : 'Total Outstanding (KHR)'}
                </span>
                <p className="mt-2 text-xl font-bold text-rose-700">
                  {(debtAging?.summary?.totalUnpaidKhr ?? 0).toLocaleString()} ៛
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer ? 'រូបិយប័ណ្ណរៀល' : 'Khmer Riel Accounts'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardContent className="p-4">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {copy.aging30}
                </span>
                <p className="mt-2 text-xl font-bold text-amber-600">
                  $
                  {(debtAging?.summary?.overdue30Usd ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer ? 'ដំណាក់កាលទី១' : 'First Notice Tier'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardContent className="p-4">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {copy.aging90}
                </span>
                <p className="mt-2 text-xl font-bold text-red-600">
                  $
                  {(debtAging?.summary?.overdue90PlusUsd ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer ? 'គណនីប្រកាសអាសន្ន' : 'Critical Collection Tier'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Aging Table Card */}
          <Card className="border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-4">
              <div>
                <CardTitle className="text-base font-bold text-slate-900">
                  {copy.tabAging}
                </CardTitle>
                <p className="mt-0.5 text-xs text-slate-500">
                  {isKhmer
                    ? 'បញ្ជីឈ្មោះសិស្សដែលមានសមតុល្យថ្លៃសិក្សាមិនទាន់ទូទាត់ គិតត្រឹមថ្ងៃនេះ'
                    : 'List of students with outstanding fee balances categorized by aging interval'}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={exportDebtAgingCsv}
                disabled={!debtAging?.items?.length}
                className="h-8 gap-1.5 border-blue-200 text-xs text-[#00509d] hover:bg-blue-50"
              >
                <Download className="size-3.5" />
                {copy.exportCsv}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/70">
                      <TableHead className="font-semibold">{copy.student}</TableHead>
                      <TableHead className="font-semibold">{isKhmer ? 'សាខា' : 'Branch'}</TableHead>
                      <TableHead className="font-semibold">
                        {isKhmer ? 'ថ្នាក់' : 'Class'}
                      </TableHead>
                      <TableHead className="font-semibold">{copy.feeItem}</TableHead>
                      <TableHead className="font-semibold">
                        {isKhmer ? 'ថ្ងៃផុតកំណត់' : 'Due Date'}
                      </TableHead>
                      <TableHead className="font-semibold">{copy.overdueDays}</TableHead>
                      <TableHead className="font-semibold">{copy.unpaidBalance}</TableHead>
                      <TableHead className="font-semibold">{copy.status}</TableHead>
                      <TableHead className="font-semibold">{copy.parentPhone}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isDebtAgingLoading ? (
                      <TableRow>
                        <TableCell colSpan={9} className="py-8 text-center text-xs text-slate-500">
                          {copy.loading}
                        </TableCell>
                      </TableRow>
                    ) : (debtAging?.items ?? []).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="py-8 text-center text-xs text-slate-500">
                          {isKhmer
                            ? 'មិនមានសិស្សជំពាក់បំណុលក្នុងវិសាលភាពនេះទេ'
                            : 'No outstanding debt records found.'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      (debtAging?.items ?? []).map((item: DebtAgingBucket) => {
                        const currSymbol = item.currency === 'KHR' ? '៛' : '$';
                        const tone =
                          item.agingCategory === 'current_due'
                            ? 'neutral'
                            : item.agingCategory === 'overdue_30'
                              ? 'warning'
                              : 'danger';

                        const categoryLabel =
                          item.agingCategory === 'current_due'
                            ? copy.agingCurrent
                            : item.agingCategory === 'overdue_30'
                              ? copy.aging30
                              : item.agingCategory === 'overdue_60'
                                ? copy.aging60
                                : copy.aging90;

                        return (
                          <TableRow
                            key={`${item.studentId}-${item.feeName}`}
                            className="hover:bg-slate-50/50"
                          >
                            <TableCell>
                              <p className="font-semibold text-slate-900">
                                {item.studentNameKh || item.studentNameEn}
                              </p>
                              <p className="text-xs text-slate-500">
                                <span className="font-mono">{item.studentCode}</span>
                                {item.studentNameKh &&
                                item.studentNameEn &&
                                item.studentNameKh !== item.studentNameEn
                                  ? ` · ${item.studentNameEn}`
                                  : ''}
                              </p>
                            </TableCell>
                            <TableCell className="text-xs font-semibold text-slate-700">
                              {item.branchCode}
                            </TableCell>
                            <TableCell className="text-xs text-slate-700">
                              {item.classCode ?? '-'}
                            </TableCell>
                            <TableCell className="text-xs text-slate-700">{item.feeName}</TableCell>
                            <TableCell className="text-xs whitespace-nowrap text-slate-600">
                              {formatDate(item.dueDate)}
                            </TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  'rounded px-2 py-0.5 font-mono text-xs font-semibold',
                                  item.overdueDays > 60
                                    ? 'bg-red-100 text-red-800'
                                    : item.overdueDays > 30
                                      ? 'bg-amber-100 text-amber-800'
                                      : item.overdueDays > 0
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'text-slate-600',
                                )}
                              >
                                {item.overdueDays} {isKhmer ? 'ថ្ងៃ' : 'days'}
                              </span>
                            </TableCell>
                            <TableCell className="font-bold text-rose-700">
                              {currSymbol}
                              {item.unpaidBalance.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge tone={tone}>{categoryLabel}</Badge>
                            </TableCell>
                            <TableCell className="text-xs text-slate-600">
                              {item.parentPhone ? (
                                <a
                                  href={`tel:${item.parentPhone}`}
                                  className="inline-flex items-center gap-1 text-[#00509d] hover:underline"
                                >
                                  <Phone className="size-3" />
                                  {item.parentPhone}
                                </a>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
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
        </div>
      )}

      {/* Tab 3: Document Generator Tools */}
      {activeTab === 'tools' && (
        <Card className="border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 p-4">
            <CardTitle className="text-base font-bold text-slate-900">{copy.tabTools}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="max-w-xl space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                {isKhmer ? 'បញ្ចូល Payment ObjectId' : 'Enter Payment ObjectId'}
              </label>
              <Input
                placeholder="e.g. 64b8a2c1f9e8a7d6c5b4a321"
                value={manualPaymentId}
                onChange={(e) => setManualPaymentId(e.target.value.trim())}
                className="font-mono text-xs"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!manualPaymentId || Boolean(busyAction)}
                  onClick={() =>
                    void runPreview(
                      'manual-receipt',
                      async () => (await getReceiptPreview(manualPaymentId)).data,
                    )
                  }
                >
                  <Search className="mr-1.5 size-4" /> {copy.previewReceipt}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!manualPaymentId || Boolean(busyAction)}
                  onClick={() =>
                    void runPreview(
                      'manual-invoice',
                      async () => (await getInvoicePreview(manualPaymentId)).data,
                    )
                  }
                >
                  <Search className="mr-1.5 size-4" /> {copy.previewInvoice}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#00509d] text-white hover:bg-[#023e8a]"
                  disabled={!manualPaymentId || Boolean(busyAction)}
                  onClick={() =>
                    void downloadPdf(
                      'manual-receipt-pdf',
                      `/reports/receipts/${manualPaymentId}/pdf`,
                    )
                  }
                >
                  <FileDown className="mr-1.5 size-4" /> {copy.pdfReceipt}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#023e8a] text-white hover:bg-[#00509d]"
                  disabled={!manualPaymentId || Boolean(busyAction)}
                  onClick={() =>
                    void downloadPdf(
                      'manual-invoice-pdf',
                      `/reports/invoices/${manualPaymentId}/pdf`,
                    )
                  }
                >
                  <FileDown className="mr-1.5 size-4" /> {copy.pdfInvoice}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal / Drawer */}
      {preview && (
        <Card className="border-[#00509d]/40 bg-slate-50/50 p-4 shadow-sm print:hidden">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <ReceiptText className="size-5 text-[#00509d]" />
              <h3 className="font-bold text-slate-900">
                {isKhmer ? 'ការមើលជាមុននៃឯកសារផ្លូវការ' : 'Official Document Preview'}
              </h3>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setPreview(null)}
              className="size-8 p-0"
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {Object.keys(record(preview.payload.finance)).length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(record(preview.payload.finance))
                  .filter(([, val]) => typeof val !== 'object')
                  .map(([k, v]) => (
                    <div key={k} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{k}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-900">
                        {String(v ?? '-')}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-800">
                {JSON.stringify(preview.payload, null, 2)}
              </pre>
            )}
          </div>
        </Card>
      )}

      {/* Print Signature Block */}
      <div className="hidden pt-12 print:block">
        <div className="grid grid-cols-3 gap-8 text-center text-xs">
          <div>
            <p className="font-semibold text-slate-700">{copy.preparedBy}</p>
            <div className="mt-16 border-t border-slate-400 pt-1 text-slate-500">
              {isKhmer ? 'ហត្ថលេខា និងកាលបរិច្ឆេទ' : 'Signature & Date'}
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-700">{copy.cashierSignature}</p>
            <div className="mt-16 border-t border-slate-400 pt-1 text-slate-500">
              {isKhmer ? 'ហត្ថលេខា និងកាលបរិច្ឆេទ' : 'Signature & Date'}
            </div>
          </div>
          <div>
            <p className="font-semibold text-slate-700">{copy.directorSignature}</p>
            <div className="mt-16 border-t border-slate-400 pt-1 text-slate-500">
              {isKhmer ? 'ហត្ថលេខា និងត្រាសាលា' : 'Signature & School Seal'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
