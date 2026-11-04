'use client';

import * as React from 'react';
import { AlertCircle, FileText, Search, Users, X } from '@/components/icons';
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
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { useStudentsQuery } from '@/features/students/hooks/use-students';
import type { StudentGender, StudentStatus } from '@/features/students/types';
import { useTranslation } from '@/lib/i18n';
import { formatDate, formatDateTime } from '@/lib/formatters';

import { openOfficialPdf } from '../api/report-api';
import { ReportNavHeader } from './report-nav-header';

const statusTones: Record<StudentStatus, 'neutral' | 'success' | 'warning' | 'danger'> = {
  active: 'success',
  inactive: 'neutral',
  suspended: 'warning',
  withdrawn: 'danger',
  graduated: 'neutral',
  transferred: 'neutral',
};

export const StudentReportsView = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();

  const [branchId, setBranchId] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [status, setStatus] = React.useState<StudentStatus | ''>('');
  const [gender, setGender] = React.useState<StudentGender | ''>('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [busyStudentId, setBusyStudentId] = React.useState<string | null>(null);

  const copy = isKhmer
    ? {
        title: 'របាយការណ៍សិស្ស',
        subtitle: 'ស្ថិតិសិស្ស បញ្ជីឈ្មោះ ភេទ កាលបរិច្ឆេទចុះឈ្មោះ និងកំណត់ត្រាសិក្សាផ្លូវការ',
        allBranches: 'គ្រប់សាខា',
        allClasses: 'គ្រប់ថ្នាក់',
        allStatuses: 'គ្រប់ស្ថានភាព',
        allGenders: 'គ្រប់ភេទ',
        male: 'ប្រុស',
        female: 'ស្រី',
        searchPlaceholder: 'ស្វែងរកសិស្សតាមឈ្មោះ កូដ ឬទូរស័ព្ទ…',
        totalStudents: 'សិស្សសរុបក្នុងប្រព័ន្ធ',
        activeStudents: 'សិស្សកំពុងរៀន (Active)',
        maleStudents: 'សិស្សប្រុស (Male)',
        femaleStudents: 'សិស្សស្រី (Female)',
        printReport: 'បោះពុម្ពបញ្ជីសិស្ស',
        studentCode: 'កូដសិស្ស',
        studentName: 'ឈ្មោះសិស្ស',
        genderCol: 'ភេទ',
        dob: 'ថ្ងៃខែឆ្នាំកំណើត',
        dateGenerated: 'កាលបរិច្ឆេទបង្កើត',
        branch: 'សាខា',
        classCol: 'ថ្នាក់',
        phone: 'ទូរស័ព្ទ',
        statusCol: 'ស្ថានភាព',
        actions: 'សកម្មភាព',
        transcript: 'ព្រឹត្តិបត្រពិន្ទុ',
        noData: 'រកមិនឃើញទិន្នន័យសិស្សទេ',
        loading: 'កំពុងទាញយកទិន្នន័យ…',
        page: 'ទំព័រ',
        previous: 'ថយក្រោយ',
        next: 'បន្ទាប់',
        officialTitle: 'បញ្ជីឈ្មោះ និងស្ថិតិសិស្សផ្លូវការ',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        principalSignature: 'នាយកសាលា / គណៈគ្រប់គ្រង',
      }
    : {
        title: 'Student Reports',
        subtitle:
          'Student demographics, active enrollment roster, gender distributions, and transcripts',
        allBranches: 'All Branches',
        allClasses: 'All Classes',
        allStatuses: 'All Statuses',
        allGenders: 'All Genders',
        male: 'Male',
        female: 'Female',
        searchPlaceholder: 'Search by student name, ID, or phone…',
        totalStudents: 'Total System Students',
        activeStudents: 'Active Enrollments',
        maleStudents: 'Male Students',
        femaleStudents: 'Female Students',
        printReport: 'Print Student Roster',
        studentCode: 'Student ID',
        studentName: 'Student Name',
        genderCol: 'Gender',
        dob: 'Date of Birth',
        dateGenerated: 'Date Generated',
        branch: 'Branch',
        classCol: 'Class',
        phone: 'Phone',
        statusCol: 'Status',
        actions: 'Actions',
        transcript: 'Transcript',
        noData: 'No student records found.',
        loading: 'Loading student report…',
        page: 'Page',
        previous: 'Previous',
        next: 'Next',
        officialTitle: 'Official Student Roster & Demographics Report',
        preparedBy: 'Prepared by',
        principalSignature: 'Principal / Management',
      };

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });
  const { data: classesData } = useClassesQuery({
    branchId: branchId || undefined,
    status: 'active',
    limit: 100,
  });

  const {
    data: studentsResponse,
    isLoading,
    isError,
  } = useStudentsQuery({
    branchId: branchId || undefined,
    status: status || undefined,
    gender: gender || undefined,
    search: search.trim() || undefined,
    page,
    limit: 50,
  });

  const { data: classEnrollments } = useEnrollmentsQuery(
    { classId: classId || undefined, limit: 100 },
    Boolean(classId),
  );

  const rawStudents = studentsResponse?.data;
  const pagination = studentsResponse?.pagination;
  const enrollmentsList = classEnrollments?.data;

  // Filter by class client-side if selected
  const filteredStudents = React.useMemo(() => {
    const list = rawStudents ?? [];
    if (!classId || !enrollmentsList) return list;
    const enrolledIds = new Set(
      enrollmentsList.map((item) =>
        typeof item.studentId === 'object' && item.studentId !== null
          ? item.studentId._id
          : String(item.studentId),
      ),
    );
    return list.filter((s) => enrolledIds.has(s._id));
  }, [classId, enrollmentsList, rawStudents]);

  // Demographic metrics calculated with mathematical integrity
  const stats = React.useMemo(() => {
    const loadedCount = filteredStudents.length;
    const total = pagination?.total ?? loadedCount;
    const active = filteredStudents.filter((s) => s.status === 'active').length;
    const male = filteredStudents.filter((s) => s.gender === 'male').length;
    const female = filteredStudents.filter((s) => s.gender === 'female').length;

    const activePct = loadedCount > 0 ? Math.round((active / loadedCount) * 100) : 0;
    const malePct = loadedCount > 0 ? Math.round((male / loadedCount) * 100) : 0;
    const femalePct = loadedCount > 0 ? Math.round((female / loadedCount) * 100) : 0;

    return { total, active, male, female, activePct, malePct, femalePct, loadedCount };
  }, [filteredStudents, pagination?.total]);

  const activeBranchName = React.useMemo(() => {
    if (!branchId) return copy.allBranches;
    const found = branchesData?.data?.find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : branchId;
  }, [branchId, branchesData?.data, copy.allBranches, getLocalizedValue]);

  const handleOpenTranscript = async (id: string) => {
    try {
      setBusyStudentId(id);
      await openOfficialPdf(`/reports/transcripts/${id}/pdf`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Unable to load transcript PDF');
    } finally {
      setBusyStudentId(null);
    }
  };

  return (
    <div className="space-y-6">
      <ReportNavHeader activeSection="students" />

      {/* Official Print Letterhead */}
      <div className="hidden p-6 print:block">
        <div className="border-b-2 border-[#00509d] pb-4 text-center">
          <h2 className="text-xl font-bold text-[#023e8a]">
            សាលាអន្តរជាតិ អេស អ៊ិន ភី អាយ · SNPI INTERNATIONAL SCHOOL
          </h2>
          <h3 className="mt-1 text-base font-semibold tracking-wide text-slate-800 uppercase">
            {copy.officialTitle}
          </h3>
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-slate-600">
            <span>
              <strong>{copy.branch}:</strong> {activeBranchName}
            </span>
            <span>
              <strong>{copy.totalStudents}:</strong> {stats.total}
            </span>
            <span>
              <strong>{copy.dateGenerated}:</strong> {formatDateTime(new Date())}
            </span>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5 sm:p-6 print:hidden">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <Users className="size-6 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-xl font-bold text-slate-950">{copy.title}</CardTitle>
                <p className="mt-0.5 text-xs text-slate-500">{copy.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <div className="relative">
              <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                placeholder={copy.searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="rounded-xl bg-white pr-8 pl-9 text-xs"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <Select
              value={branchId}
              onChange={(e) => {
                setBranchId(e.target.value);
                setClassId('');
                setPage(1);
              }}
              aria-label="Filter by branch"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allBranches}</option>
              {(branchesData?.data ?? []).map((b) => (
                <option key={b._id} value={b._id}>
                  {getLocalizedValue(b.branchNameKh, b.branchNameEn)}
                </option>
              ))}
            </Select>

            <Select
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by class"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allClasses}</option>
              {(classesData?.data ?? []).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.className}
                </option>
              ))}
            </Select>

            <Select
              value={status}
              onChange={(e) => {
                setStatus((e.target.value as StudentStatus) || '');
                setPage(1);
              }}
              aria-label="Filter by status"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allStatuses}</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="graduated">Graduated</option>
            </Select>

            <Select
              value={gender}
              onChange={(e) => {
                setGender((e.target.value as StudentGender) || '');
                setPage(1);
              }}
              aria-label="Filter by gender"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allGenders}</option>
              <option value="male">{copy.male}</option>
              <option value="female">{copy.female}</option>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {/* KPI Pulse Cards */}
          <div className="mb-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.totalStudents}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#00509d]">{stats.total}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {stats.loadedCount} students loaded
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.activeStudents}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-700">
                {stats.active}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Active cohort: {stats.activePct}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.maleStudents}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-blue-700">{stats.male}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Ratio: {stats.malePct}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.femaleStudents}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-violet-700">
                {stats.female}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Ratio: {stats.femalePct}%</p>
            </div>
          </div>

          {isLoading && <p className="py-12 text-center text-sm text-slate-500">{copy.loading}</p>}

          {isError && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-rose-700">
              <AlertCircle className="size-4" /> Error loading student report.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>{copy.studentCode}</TableHead>
                    <TableHead>{copy.studentName}</TableHead>
                    <TableHead>{copy.genderCol}</TableHead>
                    <TableHead>{copy.dob}</TableHead>
                    <TableHead>{copy.branch}</TableHead>
                    <TableHead>{copy.phone}</TableHead>
                    <TableHead className="text-center">{copy.statusCol}</TableHead>
                    <TableHead className="text-center print:hidden">{copy.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-12 text-center text-slate-500">
                        {copy.noData}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((stu, index) => (
                      <TableRow key={stu._id}>
                        <TableCell className="text-center text-xs text-slate-500">
                          {(page - 1) * 50 + index + 1}
                        </TableCell>
                        <TableCell className="font-mono text-xs font-semibold text-slate-800">
                          {stu.studentId}
                        </TableCell>
                        <TableCell>
                          <p className="font-semibold text-slate-900">
                            {stu.khmerName || `${stu.firstName} ${stu.lastName}`}
                          </p>
                          {stu.khmerName &&
                            `${stu.firstName} ${stu.lastName}`.trim() &&
                            stu.khmerName !== `${stu.firstName} ${stu.lastName}`.trim() && (
                              <p className="text-xs text-slate-500">
                                {stu.firstName} {stu.lastName}
                              </p>
                            )}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600 capitalize">
                          {stu.gender === 'male' ? copy.male : copy.female}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {formatDate(stu.dateOfBirth)}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">
                          {typeof stu.branchId === 'object'
                            ? getLocalizedValue(
                                stu.branchId.branchNameKh,
                                stu.branchId.branchNameEn,
                              )
                            : stu.branchId}
                        </TableCell>
                        <TableCell className="text-xs text-slate-600">{stu.phone || '—'}</TableCell>
                        <TableCell className="text-center">
                          <Badge tone={statusTones[stu.status]}>{stu.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center print:hidden">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={busyStudentId === stu._id}
                            onClick={() => void handleOpenTranscript(stu._id)}
                            className="h-8 gap-1.5 text-xs text-[#00509d] hover:bg-blue-50"
                          >
                            <FileText className="size-3.5" />
                            {copy.transcript}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 print:hidden">
              <p className="text-xs text-slate-600">
                {copy.page} {pagination.page} / {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  {copy.previous}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  {copy.next}
                </Button>
              </div>
            </div>
          )}

          {/* Print Signatures Block */}
          <div className="mt-12 hidden pt-8 print:block">
            <div className="grid grid-cols-2 gap-12 text-center text-xs">
              <div>
                <p className="font-semibold text-slate-900">{copy.preparedBy}</p>
                <div className="mt-16 border-t border-slate-400 pt-1 text-slate-600">
                  (...........................................)
                </div>
              </div>
              <div>
                <p className="font-semibold text-slate-900">{copy.principalSignature}</p>
                <div className="mt-16 border-t border-slate-400 pt-1 text-slate-600">
                  (...........................................)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
