'use client';

import * as React from 'react';
import {
  AlertCircle,
  Building2,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useAuth } from '@/features/auth/context/auth-context';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useStudentsQuery } from '@/features/students/hooks/use-students';
import type { Student } from '@/features/students/types';
import { useTranslation } from '@/lib/i18n';

interface FlattenedGuardian {
  id: string;
  guardianName: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  occupation?: string;
  address?: string;
  isPrimary: boolean;
  isEmergencyContact: boolean;
  studentId: string;
  studentName: string;
  studentKhmerName: string;
  branchName: string;
}

export default function GuardiansPage() {
  const { t, isKhmer } = useTranslation();
  const { user, currentBranchId } = useAuth();
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [selectedBranchFilter, setSelectedBranchFilter] = React.useState<string>('');
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'primary' | 'emergency'>('all');

  const effectiveBranchFilter = React.useMemo(() => {
    if (selectedBranchFilter) return selectedBranchFilter;
    if (currentBranchId !== 'all') return currentBranchId;
    return '';
  }, [selectedBranchFilter, currentBranchId]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: branchData } = useBranchesQuery({ limit: 50 });
  const allBranches = React.useMemo(() => branchData?.data ?? [], [branchData?.data]);

  const branches = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') return allBranches;
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const {
    data: studentsData,
    isLoading,
    isError,
    error,
  } = useStudentsQuery({
    page,
    limit: 20,
    search: debouncedSearch || undefined,
    branchId: effectiveBranchFilter || undefined,
  });

  const pagination = studentsData?.pagination;
  const students = React.useMemo(() => studentsData?.data ?? [], [studentsData?.data]);

  const guardians = React.useMemo(() => {
    const list: FlattenedGuardian[] = [];
    students.forEach((student: Student) => {
      if (student.guardians && student.guardians.length > 0) {
        student.guardians.forEach((g, idx) => {
          list.push({
            id: `${student._id}_${idx}`,
            guardianName: g.fullName,
            relationship: g.relationship,
            phone: g.phone,
            alternatePhone: g.alternatePhone,
            email: g.email,
            occupation: g.occupation,
            address: g.address,
            isPrimary: g.isPrimary,
            isEmergencyContact: g.isEmergencyContact,
            studentId: student.studentId,
            studentName: `${student.firstName} ${student.lastName}`,
            studentKhmerName: student.khmerName,
            branchName: isKhmer
              ? typeof student.branchId === 'object'
                ? student.branchId.branchNameKh || student.branchId.branchNameEn
                : '—'
              : typeof student.branchId === 'object'
                ? student.branchId.branchNameEn
                : '—',
          });
        });
      }
    });
    return list;
  }, [students, isKhmer]);

  const filteredGuardians = React.useMemo(() => {
    return guardians.filter((g) => {
      if (typeFilter === 'primary' && !g.isPrimary) return false;
      if (typeFilter === 'emergency' && !g.isEmergencyContact) return false;

      if (debouncedSearch) {
        const q = debouncedSearch.toLowerCase();
        return (
          g.guardianName.toLowerCase().includes(q) ||
          g.studentName.toLowerCase().includes(q) ||
          g.studentId.toLowerCase().includes(q) ||
          g.phone.includes(q)
        );
      }
      return true;
    });
  }, [guardians, typeFilter, debouncedSearch]);

  return (
    <PermissionGuard
      requiredAnyPermission={['student.view.own_branch', 'student.view.all_branches']}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {t.guardians.title}
              </h1>
              <Badge tone="neutral">{isKhmer ? 'គ្រប់គ្រងសិស្ស' : 'Student Management'}</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">{t.guardians.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="size-4 text-[#00509d]" />
            <span>{isKhmer ? 'បញ្ជីអាណាព្យាបាល និងឪពុកម្តាយ' : 'Parent & Guardian Registry'}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <div className="relative max-w-xs min-w-[200px] flex-1">
              <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                placeholder={t.guardians.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>

            {(!user || user.branchAccess === 'all' || branches.length > 1) && (
              <Select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="h-9 w-40 text-xs"
              >
                <option value="">{t.department.allBranches}</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {isKhmer ? b.branchNameKh || b.branchNameEn : b.branchNameEn}
                  </option>
                ))}
              </Select>
            )}

            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as 'all' | 'primary' | 'emergency')}
              className="h-9 w-40 text-xs"
            >
              <option value="all">
                {isKhmer ? 'គ្រប់ប្រភេទអាណាព្យាបាល' : 'All Guardian Types'}
              </option>
              <option value="primary">
                {isKhmer ? 'អាណាព្យាបាលចម្បង' : 'Primary Guardians Only'}
              </option>
              <option value="emergency">
                {isKhmer ? 'ទំនាក់ទំនងបន្ទាន់' : 'Emergency Contacts Only'}
              </option>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {isLoading ? (
            <div className="space-y-3 p-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <AlertCircle className="size-8 text-red-500" />
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {isKhmer
                  ? 'មិនអាចទាញយកទិន្នន័យអាណាព្យាបាលបានទេ'
                  : 'Failed to load guardian directory'}
              </p>
              <p className="text-xs text-slate-500">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          ) : filteredGuardians.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Users className="size-10 text-[#00509d]" />
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {t.guardians.noGuardiansFound}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {debouncedSearch || selectedBranchFilter || typeFilter !== 'all'
                  ? isKhmer
                    ? 'សូមសាកល្បងកែប្រែលក្ខខណ្ឌស្វែងរក ឬតម្រងឡើងវិញ។'
                    : 'Try adjusting your search criteria or filter options.'
                  : t.guardians.noGuardiansDesc}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/75">
                <TableRow>
                  <TableHead className="text-xs">{t.guardians.guardianName}</TableHead>
                  <TableHead className="text-xs">{t.guardians.relationship}</TableHead>
                  <TableHead className="text-xs">{t.guardians.phone}</TableHead>
                  <TableHead className="text-xs">
                    {t.guardians.email} / {t.guardians.occupation}
                  </TableHead>
                  <TableHead className="text-xs">{isKhmer ? 'មុខងារ' : 'Designation'}</TableHead>
                  <TableHead className="text-xs">{t.studentStatusHistory.student}</TableHead>
                  <TableHead className="text-xs">{t.students.campusBranch}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuardians.map((g) => (
                  <TableRow key={g.id} className="hover:bg-slate-50/50">
                    <TableCell className="text-xs font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <User className="size-3.5 text-slate-400" />
                        <span>{g.guardianName}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-slate-700 capitalize">
                      {g.relationship}
                    </TableCell>

                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1 font-mono text-slate-800">
                        <Phone className="size-3 text-slate-400" />
                        <span>{g.phone}</span>
                      </div>
                      {g.alternatePhone && (
                        <div className="text-xs text-slate-500">Alt: {g.alternatePhone}</div>
                      )}
                    </TableCell>

                    <TableCell className="text-xs text-slate-600">
                      {g.email && <div>{g.email}</div>}
                      {g.occupation && <div className="text-xs text-slate-500">{g.occupation}</div>}
                      {!g.email && !g.occupation && <span className="text-slate-400">—</span>}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {g.isPrimary && (
                          <Badge tone="success" className="gap-1 text-xs">
                            <ShieldCheck className="size-3" />
                            {isKhmer ? 'ចម្បង' : 'Primary'}
                          </Badge>
                        )}
                        {g.isEmergencyContact && (
                          <Badge tone="warning" className="gap-1 text-xs">
                            <ShieldAlert className="size-3" />
                            {isKhmer ? 'បន្ទាន់' : 'Emergency'}
                          </Badge>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-xs font-semibold text-slate-900">{g.studentName}</div>
                      <div className="text-xs text-slate-500">
                        {g.studentId} · {g.studentKhmerName}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Building2 className="size-3.5 text-slate-400" />
                        <span>{g.branchName}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-2 border-t border-slate-100 p-4 text-xs text-slate-500 sm:flex-row">
              <div>
                {isKhmer ? (
                  <span>
                    បង្ហាញ {(pagination.page - 1) * pagination.limit + 1} ដល់{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} នៃ{' '}
                    {pagination.total} សិស្ស
                  </span>
                ) : (
                  <span>
                    Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} students
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-8 text-xs"
                >
                  {t.common.previous}
                </Button>
                <span className="px-2 font-medium">
                  {isKhmer
                    ? `ទំព័រ ${pagination.page} នៃ ${pagination.totalPages}`
                    : `Page ${pagination.page} of ${pagination.totalPages}`}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="h-8 text-xs"
                >
                  {t.common.next}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PermissionGuard>
  );
}
