'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  FileDown,
  FileText,
  GraduationCap,
  ReceiptText,
  Search,
  UserCheck,
  Users,
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
import { useTranslation } from '@/lib/i18n';

import {
  generateReportCard,
  generateTranscript,
  getInvoicePreview,
  getReceiptPreview,
  getReportCardPreview,
  getTranscriptPreview,
  openOfficialPdf,
} from '../api/report-api';
import { useOfficialDocumentsQuery } from '../hooks/use-reports';
import type { OfficialDocumentType, ReportPreview } from '../types';
import { MonthlyManagementOverview } from './monthly-management-overview';
import { ReportNavHeader } from './report-nav-header';

const record = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};

const PreviewPanel = ({ preview }: { preview: ReportPreview }) => {
  const payload = preview.payload;
  const school = record(payload.school);
  const student = record(payload.student);
  const summary = record(payload.summary);
  const finance = record(payload.finance);
  const results = Array.isArray(payload.results) ? payload.results : [];
  const subjects = Array.isArray(payload.subjects) ? payload.subjects : [];

  return (
    <Card className="border-[#00509d]/30 bg-white print:border-0">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg text-[#023e8a]">
              {String(school.nameEn ?? 'SNPI School')}
            </CardTitle>
            <p className="mt-1 text-sm text-slate-600">
              {String(student.studentId ?? '')} ·{' '}
              {String(student.name ?? student.khmerName ?? 'Official Document')}
            </p>
          </div>
          <Badge tone={preview.snapshotSource === 'legacy_derived' ? 'warning' : 'success'}>
            {preview.snapshotSource.replaceAll('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        {Object.keys(summary).length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {Object.entries(summary).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-500 uppercase">{key}</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{String(value ?? '-')}</p>
              </div>
            ))}
          </div>
        )}
        {subjects.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Result</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((item, index) => {
                  const subject = record(item);
                  return (
                    <TableRow key={`${String(subject.code)}-${index}`}>
                      <TableCell>{String(subject.name ?? subject.code ?? '-')}</TableCell>
                      <TableCell>{String(subject.average ?? '-')}</TableCell>
                      <TableCell>{String(subject.grade ?? '-')}</TableCell>
                      <TableCell>{subject.passed ? 'PASS' : 'FAIL'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
        {results.length > 0 && (
          <div className="space-y-2">
            {results.map((item, index) => {
              const result = record(item);
              return (
                <div
                  key={index}
                  className="grid gap-2 rounded-lg border border-slate-200 p-3 md:grid-cols-5"
                >
                  <span>{String(result.academicYear ?? '-')}</span>
                  <span>{String(result.period ?? '-')}</span>
                  <span>{String(result.level ?? '-')}</span>
                  <span>{String(result.average ?? '-')}</span>
                  <span className="font-semibold">{String(result.promotion ?? '-')}</span>
                </div>
              );
            })}
          </div>
        )}
        {Object.keys(finance).length > 0 && (
          <div className="grid gap-3 md:grid-cols-4">
            {Object.entries(finance)
              .filter(([, value]) => !Array.isArray(value) && typeof value !== 'object')
              .map(([key, value]) => (
                <div key={key} className="border-b border-slate-100 pb-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase">{key}</p>
                  <p className="mt-1 text-sm text-slate-900">{String(value ?? '-')}</p>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const ReportCenter = () => {
  const { t, isKhmer } = useTranslation();
  const [branchId, setBranchId] = React.useState('');
  const [type, setType] = React.useState<OfficialDocumentType | ''>('');
  const [termResultId, setTermResultId] = React.useState('');
  const [studentId, setStudentId] = React.useState('');
  const [paymentId, setPaymentId] = React.useState('');
  const [preview, setPreview] = React.useState<ReportPreview | null>(null);
  const [busyAction, setBusyAction] = React.useState('');
  const { data: branchesData } = useBranchesQuery();
  const { data: documentsData, isLoading } = useOfficialDocumentsQuery({
    branchId: branchId || undefined,
    type: type || undefined,
    limit: 20,
  });
  const documents = documentsData?.data ?? [];

  const categoryCards = [
    {
      label: isKhmer ? 'របាយការណ៍សិស្ស' : 'Student Reports',
      href: '/reports/students',
      icon: Users,
      badge: isKhmer ? 'ស្ថិតិ & បញ្ជី' : 'Demographics',
      detail: isKhmer
        ? 'ស្ថិតិសិស្ស បញ្ជីឈ្មោះ ភេទ កាលបរិច្ឆេទចុះឈ្មោះ និងកំណត់ត្រាសិក្សា'
        : 'Student demographics, active enrollments, gender ratios, and transcripts',
    },
    {
      label: isKhmer ? 'របាយការណ៍បុគ្គលិក' : 'Staff Reports',
      href: '/reports/staff',
      icon: UserCheck,
      badge: isKhmer ? 'បញ្ជី & តួនាទី' : 'Faculty',
      detail: isKhmer
        ? 'បញ្ជីគ្រូបង្រៀន និងបុគ្គលិក ចែកតាមដេប៉ាតឺម៉ង់ និងបន្ទុកបង្រៀន'
        : 'Faculty directory, department allocation, positions, and teaching assignments',
    },
    {
      label: isKhmer ? 'របាយការណ៍លទ្ធផលសិក្សា' : 'Academic Reports',
      href: '/reports/academic',
      icon: GraduationCap,
      badge: isKhmer ? 'ចំណាត់ថ្នាក់ & ពិន្ទុ' : 'Rankings',
      detail: isKhmer
        ? 'ចំណាត់ថ្នាក់សិស្សប្រចាំខែ ពិន្ទុមធ្យមភាគ អត្រាជាប់ និងចេញព្រឹត្តិបត្រពិន្ទុ'
        : 'Class rankings, monthly scores, pass rates, and report cards',
    },
    {
      label: isKhmer ? 'របាយការណ៍វត្តមាន' : 'Attendance Reports',
      href: '/reports/attendance',
      icon: BookOpenCheck,
      badge: isKhmer ? 'អត្រាវត្តមាន' : 'Attendance',
      detail: isKhmer
        ? 'អត្រាវត្តមានសិស្ស វត្តមាន អវត្តមាន យឺត និងបញ្ជីសិស្សអវត្តមានច្រើន'
        : 'Attendance rates, session tallies, absentee alerts, and class rates',
    },
    {
      label: isKhmer ? 'របាយការណ៍ហិរញ្ញវត្ថុ' : 'Financial Reports',
      href: '/reports/finance',
      icon: ReceiptText,
      badge: isKhmer ? 'ថ្លៃសិក្សា & ចំណូល' : 'Tuition & Revenue',
      detail: isKhmer
        ? 'របាយការណ៍ចំណូលថ្លៃសិក្សា កំណត់ត្រាបេឡាធិការ វិក្កយបត្រ និងបំណុលសិស្ស'
        : 'Tuition collection, cashier ledger, receipts, invoices, and overdue accounts',
    },
  ];

  const run = async (key: string, action: () => Promise<ReportPreview>) => {
    try {
      setBusyAction(key);
      setPreview(await action());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to load report');
    } finally {
      setBusyAction('');
    }
  };

  const pdf = async (key: string, path: string) => {
    try {
      setBusyAction(key);
      await openOfficialPdf(path);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to generate PDF');
    } finally {
      setBusyAction('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Shared Navigation Header */}
      <ReportNavHeader activeSection="hub" />

      {/* Screen Title */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {t.reports.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{t.reports.subtitle}</p>
        </div>
      </div>

      {/* Domain Navigation Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categoryCards.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00509d]/40 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <item.icon className="size-6 text-[#00509d]" />
                <Badge tone="neutral" className="px-2 py-0.5 text-xs font-semibold">
                  {item.badge}
                </Badge>
              </div>
              <p className="mt-3.5 text-base font-bold text-slate-900 transition-colors group-hover:text-[#00509d]">
                {item.label}
              </p>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-500">
                {item.detail}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-[#00509d]">
              <span>{isKhmer ? 'បើករបាយការណ៍' : 'View Report'}</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {/* Cross-Domain 12-Month Management Matrix */}
      <MonthlyManagementOverview />

      {/* Document Quick Generators */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-slate-100 p-5">
          <CardTitle className="text-base font-bold text-slate-900">
            {t.reports.documentGenerators}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4.5">
            <div>
              <p className="text-sm font-bold text-slate-900">{t.reports.reportCard}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Generate or preview official term report card
              </p>
              <Input
                placeholder="Term Result ObjectId"
                value={termResultId}
                onChange={(event) => setTermResultId(event.target.value.trim())}
                className="mt-3 bg-white"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={!termResultId || Boolean(busyAction)}
                onClick={() =>
                  void run(
                    'report-card',
                    async () => (await getReportCardPreview(termResultId)).data,
                  )
                }
                className="flex-1 rounded-xl text-xs font-semibold"
              >
                <Search className="mr-1.5 size-3.5" /> {t.reports.preview}
              </Button>
              <Button
                size="sm"
                disabled={!termResultId || Boolean(busyAction)}
                onClick={async () => {
                  await generateReportCard(termResultId);
                  await pdf('report-card-pdf', `/reports/report-cards/${termResultId}/pdf`);
                }}
                className="flex-1 rounded-xl bg-[#00509d] text-xs font-semibold text-white hover:bg-[#023e8a]"
              >
                <FileDown className="mr-1.5 size-3.5" /> {t.reports.pdf}
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4.5">
            <div>
              <p className="text-sm font-bold text-slate-900">{t.reports.transcript}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Generate official cumulative academic transcript
              </p>
              <Input
                placeholder="Student ObjectId"
                value={studentId}
                onChange={(event) => setStudentId(event.target.value.trim())}
                className="mt-3 bg-white"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={!studentId || Boolean(busyAction)}
                onClick={() =>
                  void run('transcript', async () => (await getTranscriptPreview(studentId)).data)
                }
                className="flex-1 rounded-xl text-xs font-semibold"
              >
                <Search className="mr-1.5 size-3.5" /> {t.reports.preview}
              </Button>
              <Button
                size="sm"
                disabled={!studentId || Boolean(busyAction)}
                onClick={async () => {
                  await generateTranscript(studentId);
                  await pdf('transcript-pdf', `/reports/transcripts/${studentId}/pdf`);
                }}
                className="flex-1 rounded-xl bg-[#00509d] text-xs font-semibold text-white hover:bg-[#023e8a]"
              >
                <FileDown className="mr-1.5 size-3.5" /> {t.reports.pdf}
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-3 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4.5 md:col-span-2 xl:col-span-1">
            <div>
              <p className="text-sm font-bold text-slate-900">{t.reports.receiptInvoice}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                Lookup payment ID for receipt or invoice
              </p>
              <Input
                placeholder="Payment ObjectId"
                value={paymentId}
                onChange={(event) => setPaymentId(event.target.value.trim())}
                className="mt-3 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                disabled={!paymentId || Boolean(busyAction)}
                onClick={() =>
                  void run('receipt', async () => (await getReceiptPreview(paymentId)).data)
                }
                className="rounded-xl text-xs font-semibold"
              >
                {t.reports.receipt}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!paymentId || Boolean(busyAction)}
                onClick={() =>
                  void run('invoice', async () => (await getInvoicePreview(paymentId)).data)
                }
                className="rounded-xl text-xs font-semibold"
              >
                {t.reports.invoice}
              </Button>
              <Button
                size="sm"
                disabled={!paymentId || Boolean(busyAction)}
                onClick={() => void pdf('receipt-pdf', `/reports/receipts/${paymentId}/pdf`)}
                className="rounded-xl bg-[#00509d] text-xs font-semibold text-white hover:bg-[#023e8a]"
              >
                <FileDown className="mr-1.5 size-3.5" /> {t.reports.receiptPdf}
              </Button>
              <Button
                size="sm"
                disabled={!paymentId || Boolean(busyAction)}
                onClick={() => void pdf('invoice-pdf', `/reports/invoices/${paymentId}/pdf`)}
                className="rounded-xl bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
              >
                <FileDown className="mr-1.5 size-3.5" /> {t.reports.invoicePdf}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {preview && <PreviewPanel preview={preview} />}

      {/* Document History Archive */}
      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                {t.reports.documentHistory}
              </CardTitle>
              <p className="mt-0.5 text-xs text-slate-500">
                Official archived certificates, transcripts, and receipts
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={branchId}
                onChange={(event) => setBranchId(event.target.value)}
                className="min-w-[180px] rounded-xl text-xs"
              >
                <option value="">{t.reports.allBranches}</option>
                {(branchesData?.data ?? []).map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.branchNameEn}
                  </option>
                ))}
              </Select>
              <Select
                value={type}
                onChange={(event) => setType(event.target.value as OfficialDocumentType | '')}
                className="min-w-[180px] rounded-xl text-xs"
              >
                <option value="">{t.reports.allDocumentTypes}</option>
                <option value="report_card">{t.reports.reportCards}</option>
                <option value="transcript">{t.reports.transcripts}</option>
                <option value="certificate">Certificates</option>
                <option value="payment_receipt">{t.reports.receipts}</option>
                <option value="invoice">{t.reports.invoices}</option>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.reports.documentNumber}</TableHead>
                <TableHead>{t.common.details}</TableHead>
                <TableHead>{t.reports.generatedAt}</TableHead>
                <TableHead>{t.common.status}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center">
                    {t.common.loading}
                  </TableCell>
                </TableRow>
              ) : documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-slate-500">
                    {t.reports.noDocumentsFound}
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((document) => (
                  <TableRow key={document._id}>
                    <TableCell className="font-mono text-xs font-semibold text-[#023e8a]">
                      {document.documentNumber}
                    </TableCell>
                    <TableCell>
                      <FileText className="mr-1 inline size-4" />
                      {document.type.replaceAll('_', ' ')}
                    </TableCell>
                    <TableCell>{new Date(document.generatedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge tone={document.status === 'active' ? 'success' : 'danger'}>
                        {document.status === 'active' ? t.common.active : t.common.inactive}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
