'use client';

import * as React from 'react';
import { AlertCircle, Search, UserCheck, X } from '@/components/icons';

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
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';
import type { EmployeeStatus } from '@/features/employees/types';
import { usePositionsQuery } from '@/features/positions/hooks/use-positions';
import { useTranslation } from '@/lib/i18n';
import { formatDate, formatDateTime } from '@/lib/formatters';

import { ReportNavHeader } from './report-nav-header';

const employeeStatusTones: Record<EmployeeStatus, 'neutral' | 'success' | 'warning' | 'danger'> = {
  active: 'success',
  inactive: 'neutral',
  on_leave: 'warning',
  suspended: 'danger',
  resigned: 'neutral',
  terminated: 'danger',
};

export const StaffReportsView = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();

  const [branchId, setBranchId] = React.useState('');
  const [departmentId, setDepartmentId] = React.useState('');
  const [positionId, setPositionId] = React.useState('');
  const [status, setStatus] = React.useState<EmployeeStatus | ''>('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  const copy = isKhmer
    ? {
        title: 'របាយការណ៍បុគ្គលិក',
        subtitle: 'ស្ថិតិគ្រូបង្រៀន បុគ្គលិករដ្ឋបាល បែងចែកតាមសាខា ដេប៉ាតឺម៉ង់ និងមុខតំណែង',
        allBranches: 'គ្រប់សាខា',
        allDepartments: 'គ្រប់ដេប៉ាតឺម៉ង់',
        allPositions: 'គ្រប់មុខតំណែង',
        allStatuses: 'គ្រប់ស្ថានភាព',
        searchPlaceholder: 'ស្វែងរកតាមឈ្មោះ កូដបុគ្គលិក ឬមុខតំណែង…',
        totalStaff: 'បុគ្គលិកសរុប',
        activeStaff: 'បុគ្គលិកកំពុងបំពេញការងារ',
        teachingFaculty: 'គ្រូបង្រៀន',
        adminStaff: 'រដ្ឋបាល & ការិយាល័យ',
        printReport: 'បោះពុម្ពបញ្ជីបុគ្គលិក',
        empCode: 'កូដបុគ្គលិក',
        empName: 'ឈ្មោះបុគ្គលិក',
        gender: 'ភេទ',
        branch: 'សាខា',
        department: 'ដេប៉ាតឺម៉ង់',
        position: 'មុខតំណែង',
        statusCol: 'ស្ថានភាព',
        joinDate: 'កាលបរិច្ឆេទចូលធ្វើការ',
        noData: 'រកមិនឃើញទិន្នន័យបុគ្គលិកទេ',
        loading: 'កំពុងទាញយកទិន្នន័យបុគ្គលិក…',
        page: 'ទំព័រ',
        previous: 'ថយក្រោយ',
        next: 'បន្ទាប់',
        officialTitle: 'បញ្ជីឈ្មោះ និងស្ថិតិបុគ្គលិកផ្លូវការ',
        dateGenerated: 'កាលបរិច្ឆេទបង្កើត',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        directorSignature: 'នាយកប្រតិបត្តិ / គណៈគ្រប់គ្រង',
      }
    : {
        title: 'Staff & Faculty Reports',
        subtitle:
          'Faculty directories, administrative staffing, department structures, and assignments',
        allBranches: 'All Branches',
        allDepartments: 'All Departments',
        allPositions: 'All Positions',
        allStatuses: 'All Statuses',
        searchPlaceholder: 'Search by staff name, ID, or title…',
        totalStaff: 'Total Staff',
        activeStaff: 'Active Personnel',
        teachingFaculty: 'Teaching Faculty',
        adminStaff: 'Administrative Staff',
        printReport: 'Print Staff Directory',
        empCode: 'Employee ID',
        empName: 'Staff Name',
        gender: 'Gender',
        branch: 'Branch',
        department: 'Department',
        position: 'Position',
        statusCol: 'Status',
        joinDate: 'Joining Date',
        noData: 'No employee records found.',
        loading: 'Loading staff report…',
        page: 'Page',
        previous: 'Previous',
        next: 'Next',
        officialTitle: 'Official Staff Roster & Department Summary Report',
        dateGenerated: 'Date Generated',
        preparedBy: 'Prepared by',
        directorSignature: 'Executive Director / Management',
      };

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });
  const { data: departmentsData } = useDepartmentsQuery({
    branchId: branchId || undefined,
    status: 'active',
  });
  const { data: positionsData } = usePositionsQuery({
    departmentId: departmentId || undefined,
    status: 'active',
  });

  const {
    data: employeesResponse,
    isLoading,
    isError,
  } = useEmployeesQuery({
    branchId: branchId || undefined,
    departmentId: departmentId || undefined,
    positionId: positionId || undefined,
    status: status || undefined,
    search: search.trim() || undefined,
    page,
    limit: 50,
  });

  const rawEmployees = employeesResponse?.data;
  const employees = rawEmployees ?? [];
  const pagination = employeesResponse?.pagination;

  // Department & Teaching Faculty metrics calculated with mathematical integrity
  const stats = React.useMemo(() => {
    const list = rawEmployees ?? [];
    const loadedCount = list.length;
    const total = pagination?.total ?? loadedCount;
    const active = list.filter((e) => e.status === 'active').length;
    const teaching = list.filter((e) => {
      const pos = typeof e.positionId === 'object' ? e.positionId?.nameEn : '';
      const dept = typeof e.departmentId === 'object' ? e.departmentId?.nameEn : '';
      return (
        /teacher|faculty|instructor|academic/i.test(pos || '') ||
        /academic|faculty|teaching/i.test(dept || '')
      );
    }).length;
    const admin = Math.max(0, loadedCount - teaching);
    const activePct = loadedCount > 0 ? Math.round((active / loadedCount) * 100) : 0;
    const teachingPct = loadedCount > 0 ? Math.round((teaching / loadedCount) * 100) : 0;
    const adminPct = loadedCount > 0 ? Math.round((admin / loadedCount) * 100) : 0;

    return { total, active, teaching, admin, activePct, teachingPct, adminPct, loadedCount };
  }, [rawEmployees, pagination?.total]);

  const activeBranchName = React.useMemo(() => {
    if (!branchId) return copy.allBranches;
    const found = branchesData?.data?.find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : branchId;
  }, [branchId, branchesData?.data, copy.allBranches, getLocalizedValue]);

  return (
    <div className="space-y-6">
      <ReportNavHeader activeSection="staff" />

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
              <strong>{copy.totalStaff}:</strong> {stats.total}
            </span>
            <span>
              <strong>{copy.teachingFaculty}:</strong> {stats.teaching}
            </span>
            <span>
              <strong>{copy.dateGenerated ?? 'Date'}:</strong> {formatDateTime(new Date())}
            </span>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 p-5 sm:p-6 print:hidden">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <UserCheck className="size-6 shrink-0 text-[#00509d]" />
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
                setDepartmentId('');
                setPositionId('');
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
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                setPositionId('');
                setPage(1);
              }}
              aria-label="Filter by department"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allDepartments}</option>
              {(departmentsData?.data ?? []).map((d) => (
                <option key={d._id} value={d._id}>
                  {getLocalizedValue(d.nameKh, d.nameEn)}
                </option>
              ))}
            </Select>

            <Select
              value={positionId}
              onChange={(e) => {
                setPositionId(e.target.value);
                setPage(1);
              }}
              aria-label="Filter by position"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allPositions}</option>
              {(positionsData?.data ?? []).map((p) => (
                <option key={p._id} value={p._id}>
                  {getLocalizedValue(p.nameKh, p.nameEn)}
                </option>
              ))}
            </Select>

            <Select
              value={status}
              onChange={(e) => {
                setStatus((e.target.value as EmployeeStatus) || '');
                setPage(1);
              }}
              aria-label="Filter by status"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allStatuses}</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
              <option value="resigned">Resigned</option>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {/* KPI Pulse Cards */}
          <div className="mb-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.totalStaff}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#00509d]">{stats.total}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">{stats.loadedCount} loaded</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.activeStaff}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-700">
                {stats.active}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Active: {stats.activePct}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.teachingFaculty}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-blue-700">
                {stats.teaching}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Faculty ratio: {stats.teachingPct}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.adminStaff}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-amber-700">{stats.admin}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Admin ratio: {stats.adminPct}%
              </p>
            </div>
          </div>

          {isLoading && <p className="py-12 text-center text-sm text-slate-500">{copy.loading}</p>}

          {isError && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-rose-700">
              <AlertCircle className="size-4" /> Error loading staff report.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>{copy.empCode}</TableHead>
                    <TableHead>{copy.empName}</TableHead>
                    <TableHead>{copy.gender}</TableHead>
                    <TableHead>{copy.branch}</TableHead>
                    <TableHead>{copy.department}</TableHead>
                    <TableHead>{copy.position}</TableHead>
                    <TableHead>{copy.joinDate}</TableHead>
                    <TableHead className="text-center">{copy.statusCol}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-12 text-center text-slate-500">
                        {copy.noData}
                      </TableCell>
                    </TableRow>
                  ) : (
                    employees.map((emp, index) => {
                      const deptName =
                        typeof emp.departmentId === 'object'
                          ? getLocalizedValue(emp.departmentId.nameKh, emp.departmentId.nameEn)
                          : emp.departmentId;
                      const posName =
                        typeof emp.positionId === 'object'
                          ? getLocalizedValue(emp.positionId.nameKh, emp.positionId.nameEn)
                          : emp.positionId;
                      const branchName =
                        typeof emp.branchId === 'object'
                          ? getLocalizedValue(emp.branchId.branchNameKh, emp.branchId.branchNameEn)
                          : emp.branchId;

                      return (
                        <TableRow key={emp._id}>
                          <TableCell className="text-center text-xs text-slate-500">
                            {(page - 1) * 50 + index + 1}
                          </TableCell>
                          <TableCell className="font-mono text-xs font-semibold text-slate-800">
                            {emp.employeeId}
                          </TableCell>
                          <TableCell>
                            <p className="font-semibold text-slate-900">
                              {emp.khmerName || `${emp.firstName} ${emp.lastName}`}
                            </p>
                            {emp.khmerName &&
                              `${emp.firstName} ${emp.lastName}`.trim() &&
                              emp.khmerName !== `${emp.firstName} ${emp.lastName}`.trim() && (
                                <p className="text-xs text-slate-500">
                                  {emp.firstName} {emp.lastName}
                                </p>
                              )}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600 capitalize">
                            {emp.gender}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {branchName || '—'}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {deptName || '—'}
                          </TableCell>
                          <TableCell className="text-xs font-medium text-slate-800">
                            {posName || '—'}
                          </TableCell>
                          <TableCell className="text-xs text-slate-600">
                            {formatDate(emp.joiningDate)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge tone={employeeStatusTones[emp.status]}>{emp.status}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })
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
                <p className="font-semibold text-slate-900">{copy.directorSignature}</p>
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
