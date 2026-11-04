'use client';

import * as React from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Printer,
  QrCode,
  Search,
  ShieldCheck,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useAuth } from '@/features/auth/context/auth-context';
import { openOfficialPdf } from '@/features/reports/api/report-api';
import { useCertificatesQuery } from '../hooks/use-certificates';
import { verifyCertificate } from '../api/certificate-api';
import type { CertificateItem } from '../types';

export const CertificateRegistry: React.FC = () => {
  const { currentBranchId, hasAnyPermission } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedBranchId, setSelectedBranchId] = React.useState(
    currentBranchId !== 'all' ? currentBranchId : '',
  );
  const [verifyCode, setVerifyCode] = React.useState('');
  const [isVerifyOpen, setIsVerifyOpen] = React.useState(false);
  const [verifyResult, setVerifyResult] = React.useState<Record<string, unknown> | null>(null);
  const [verifyError, setVerifyError] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const canViewBranches = hasAnyPermission(['branch.view.own_branch', 'branch.view.all_branches']);
  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 50 }, canViewBranches);
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: certData, isLoading } = useCertificatesQuery({
    branchId: selectedBranchId || undefined,
    limit: 100,
  });
  const certificates = React.useMemo(() => certData?.data ?? [], [certData?.data]);

  const filteredCertificates = React.useMemo(() => {
    return certificates.filter((c) => {
      const term = searchTerm.toLowerCase();
      const student = c.payload?.student;
      return (
        !term ||
        c.documentNumber.toLowerCase().includes(term) ||
        (student &&
          (student.name.toLowerCase().includes(term) ||
            (student.khmerName && student.khmerName.toLowerCase().includes(term)) ||
            student.studentId.toLowerCase().includes(term)))
      );
    });
  }, [certificates, searchTerm]);

  const handlePrintCertificate = async (cert: CertificateItem) => {
    try {
      await openOfficialPdf(`/reports/certificates/${cert.sourceId}/pdf`);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to download certificate PDF');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCode.trim()) return;
    setIsVerifying(true);
    setVerifyResult(null);
    setVerifyError(null);
    try {
      const res = await verifyCertificate(verifyCode.trim());
      setVerifyResult(res.data);
    } catch (err: unknown) {
      setVerifyError(err instanceof Error ? err.message : 'Invalid certificate code');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <Card className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="size-6 text-[#023e8a]" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Official Certificate & Graduation Registry
              </h2>
              <p className="text-xs text-slate-500">
                Verified completion and merit credentials with automated security QR codes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsVerifyOpen(true);
                setVerifyResult(null);
                setVerifyError(null);
                setVerifyCode('');
              }}
              className="h-8 text-xs text-slate-700"
            >
              <QrCode className="mr-1.5 size-3.5 text-[#00509d]" />
              Verify Certificate Code
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by certificate serial, student name or ID..."
              className="h-8 pl-8 text-xs"
            />
          </div>

          {canViewBranches && (
            <Select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="h-8 w-44 text-xs"
            >
              <option value="">All Campuses</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
                </option>
              ))}
            </Select>
          )}
        </div>
      </Card>

      {/* Certificates Data Table */}
      <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-semibold text-slate-600">
                  SERIAL NUMBER
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">STUDENT</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">
                  PROGRAM & CLASS
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">
                  ACADEMIC PERFORMANCE
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">ISSUED DATE</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">STATUS</TableHead>
                <TableHead className="text-right text-xs font-semibold text-slate-600">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-xs text-slate-400">
                    Loading certificate registry...
                  </TableCell>
                </TableRow>
              ) : filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-xs text-slate-400">
                    No issued certificates found. Certificates are generated upon term result
                    approval and finalization.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((cert) => {
                  const student = cert.payload?.student;
                  const academic = cert.payload?.academic;
                  const summary = cert.payload?.summary;

                  return (
                    <TableRow key={cert._id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#023e8a]">
                          <ShieldCheck className="size-3.5 text-[#00509d]" />
                          <span>{cert.documentNumber}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="block text-xs font-bold text-slate-900">
                            {student?.name || 'Student'}
                          </span>
                          {student?.khmerName && (
                            <span className="block text-xs leading-5 text-slate-600">
                              {student.khmerName}
                            </span>
                          )}
                          <span className="block font-mono text-xs text-slate-500">
                            {student?.studentId}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="block text-xs font-semibold text-slate-800">
                            {academic?.program || 'Academic Program'}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {academic?.className} ({academic?.period})
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-800">
                            GPA {summary?.gpa?.toFixed(2)} ({summary?.grade})
                          </span>
                          <Badge tone="success" className="text-xs">
                            {summary?.result || 'PASSED'}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Calendar className="size-3 text-slate-400" />
                          <span>{cert.generatedAt ? cert.generatedAt.split('T')[0] : 'N/A'}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          tone={cert.status === 'active' ? 'success' : 'danger'}
                          className="text-xs"
                        >
                          {cert.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handlePrintCertificate(cert)}
                          className="h-7 bg-[#00509d] text-xs text-white hover:bg-[#023e8a]"
                        >
                          <Printer className="mr-1 size-3" />
                          Print PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-slate-900">
              <QrCode className="size-5 text-[#00509d]" />
              Verify Certificate Authenticity
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Enter official document serial number (e.g. CRT-00000001) to verify security
              signature.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleVerify} className="space-y-4 pt-2">
            <div className="flex gap-2">
              <Input
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                placeholder="Enter Document Serial..."
                className="h-9 font-mono text-xs uppercase"
              />
              <Button
                type="submit"
                disabled={isVerifying || !verifyCode.trim()}
                className="h-9 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
              >
                {isVerifying ? 'Checking...' : 'Verify'}
              </Button>
            </div>

            {verifyError && (
              <div className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                {verifyError}
              </div>
            )}

            {verifyResult && (
              <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Valid & Authenticated Official Certificate</span>
                </div>
                <div className="space-y-1 pt-1 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold">Serial:</span>{' '}
                    <span className="font-mono">{String(verifyResult.documentNumber || '')}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Student:</span>{' '}
                    <span>
                      {(verifyResult.student as Record<string, string>)?.name ||
                        (verifyResult.student as Record<string, string>)?.khmerName}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Program:</span>{' '}
                    <span>{(verifyResult.academic as Record<string, string>)?.program}</span>
                  </div>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
