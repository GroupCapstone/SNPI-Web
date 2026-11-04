'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  GraduationCap,
  Layers,
  Phone,
  RefreshCw,
  Search,
  Users,
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
import { cn } from '@/lib/utils';
import { useHrPulseQuery } from '../hooks/use-dashboard';
import type { DepartmentHeadcountItem, ExpiringContractItem, TeacherWorkloadItem } from '../types';

interface HrDashboardTabProps {
  branchId?: string;
}

export const HrDashboardTab: React.FC<HrDashboardTabProps> = ({ branchId }) => {
  const { isKhmer } = useTranslation();
  const [contractSearch, setContractSearch] = React.useState('');
  const [workloadSearch, setWorkloadSearch] = React.useState('');

  const { data, isLoading, isError, refetch, isFetching } = useHrPulseQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
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
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
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
                ? 'មិនអាចទាញយកទិន្នន័យធនធានមនុស្សបានទេ'
                : 'Failed to load human resources and workforce pulse data.'}
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

  const {
    totalEmployees,
    activeTeachers,
    byDepartment,
    byBranch,
    expiringContracts,
    teacherWorkloads,
  } = pulse;

  const filteredContracts = expiringContracts.filter(
    (item) =>
      item.name.toLowerCase().includes(contractSearch.toLowerCase()) ||
      item.employeeCode.toLowerCase().includes(contractSearch.toLowerCase()) ||
      (item.departmentName &&
        item.departmentName.toLowerCase().includes(contractSearch.toLowerCase())),
  );

  const filteredWorkloads = teacherWorkloads.filter(
    (item) =>
      item.name.toLowerCase().includes(workloadSearch.toLowerCase()) ||
      item.employeeCode.toLowerCase().includes(workloadSearch.toLowerCase()),
  );

  const maxDeptCount = Math.max(1, ...byDepartment.map((d) => d.count));

  return (
    <div className="space-y-6">
      {/* Tab Control Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {isKhmer ? 'ធនធានមនុស្ស និងបុគ្គលិក' : 'HR & Workforce Intelligence'}
          </h2>
          <p className="text-xs text-slate-500">
            {isKhmer
              ? 'ការតាមដានកិច្ចសន្យាជិតផុតកំណត់ បែងចែកបុគ្គលិកតាមផ្នែក និងបន្ទុកបង្រៀនរបស់គ្រូ'
              : 'Monitor expiring staff contracts within 60 days, departmental distribution, and faculty workloads.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/employees"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Users className="size-3.5 text-[#00509d]" />
            {isKhmer ? 'បញ្ជីបុគ្គលិក' : 'Staff Directory'}
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-8"
          >
            <RefreshCw className={cn('mr-1.5 size-3.5', isFetching && 'animate-spin')} />
            {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Employees */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'បុគ្គលិកសរុប' : 'Total Employees'}
              </span>
              <Users className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {totalEmployees}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'បុគ្គលិកគ្រប់ផ្នែក' : 'Active workforce'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active Teachers */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'លោកគ្រូ-អ្នកគ្រូ' : 'Teaching Faculty'}
              </span>
              <GraduationCap className="size-5 shrink-0 text-indigo-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {activeTeachers}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'បុគ្គលិកផ្នែកបង្រៀន' : 'Academic instructors'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Expiring Contracts Radar (<60 Days) */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'កិច្ចសន្យាជិតផុតកំណត់' : 'Expiring Contracts'}
              </span>
              <CalendarClock
                className={cn(
                  'size-5 shrink-0',
                  expiringContracts.length > 0 ? 'text-amber-600' : 'text-emerald-600',
                )}
              />
            </div>
            <div className="mt-2">
              <div
                className={cn(
                  'text-2xl font-bold tracking-tight',
                  expiringContracts.length > 0 ? 'text-amber-700' : 'text-slate-950',
                )}
              >
                {expiringContracts.length}
              </div>
              <p className="text-xs text-slate-500">
                {expiringContracts.length > 0
                  ? isKhmer
                    ? 'ក្នុងរយៈពេល ៦០ ថ្ងៃខាងមុខ'
                    : 'Within next 60 days'
                  : isKhmer
                    ? 'គ្មានកិច្ចសន្យាផុតកំណត់ជិតៗ'
                    : 'All contracts in order'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Staffed Departments */}
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'ផ្នែកមានបុគ្គលិក' : 'Active Departments'}
              </span>
              <Layers className="size-5 shrink-0 text-slate-600" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold tracking-tight text-slate-950">
                {byDepartment.length}
              </div>
              <p className="text-xs text-slate-500">
                {isKhmer ? 'ផ្នែកប្រតិបត្តិការ' : 'Staffed divisions'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Expiring Contracts Radar & Department Headcount */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Expiring Contracts Radar Table */}
        <Card className="border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-amber-500" />
                  <CardTitle className="text-base font-semibold text-slate-950">
                    {isKhmer
                      ? 'រ៉ាដាកិច្ចសន្យាជិតផុតកំណត់ (៦០ ថ្ងៃ)'
                      : 'Expiring Contracts Radar (60 Days)'}
                  </CardTitle>
                </div>
                <CardDescription className="text-xs">
                  {isKhmer
                    ? 'បញ្ជីបុគ្គលិកដែលកិច្ចសន្យាការងារជិតផុតកំណត់ ត្រៀមបន្តកិច្ចសន្យា ឬវាយតម្លៃ'
                    : 'Staff contracts requiring review, renewal, or extension before expiration.'}
                </CardDescription>
              </div>

              <Badge
                tone="neutral"
                className={cn(
                  'self-start font-bold sm:self-auto',
                  expiringContracts.length > 0
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800',
                )}
              >
                {expiringContracts.length} {isKhmer ? 'កិច្ចសន្យា' : 'Contracts'}
              </Badge>
            </div>

            {expiringContracts.length > 0 && (
              <div className="relative mt-2">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    isKhmer
                      ? 'ស្វែងរកតាមឈ្មោះបុគ្គលិក អត្តលេខ ឬផ្នែក...'
                      : 'Search by employee name, code, or department...'
                  }
                  value={contractSearch}
                  onChange={(e) => setContractSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
                />
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {expiringContracts.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="size-10 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {isKhmer ? 'មិនមានកិច្ចសន្យាជិតផុតកំណត់ទេ' : 'No Contracts Expiring Soon'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isKhmer
                    ? 'កិច្ចសន្យាបុគ្គលិកទាំងអស់មានសុពលភាពលើសពី ៦០ ថ្ងៃ។'
                    : 'All staff contracts are currently valid with more than 60 days remaining.'}
                </p>
              </div>
            ) : filteredContracts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                {isKhmer
                  ? 'រកមិនឃើញទិន្នន័យស្របនឹងការស្វែងរកទេ'
                  : 'No contracts match your search query.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/70 text-slate-600 hover:bg-slate-50/70">
                      <TableHead className="w-44 text-xs font-semibold">
                        {isKhmer ? 'បុគ្គលិក' : 'Employee'}
                      </TableHead>
                      <TableHead className="text-xs font-semibold">
                        {isKhmer ? 'ផ្នែក / តួនាទី' : 'Department / Role'}
                      </TableHead>
                      <TableHead className="text-center text-xs font-semibold">
                        {isKhmer ? 'នៅសល់' : 'Remaining'}
                      </TableHead>
                      <TableHead className="text-xs font-semibold">
                        {isKhmer ? 'ផុតកំណត់' : 'End Date'}
                      </TableHead>
                      <TableHead className="text-right text-xs font-semibold">
                        {isKhmer ? 'សកម្មភាព' : 'Action'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContracts.map((item: ExpiringContractItem) => {
                      const isUrgent = item.daysRemaining <= 15;
                      const isModerate = item.daysRemaining <= 30;

                      return (
                        <TableRow key={item.employeeId} className="hover:bg-slate-50/60">
                          <TableCell>
                            <div>
                              <p className="font-semibold text-slate-900">{item.name}</p>
                              <p className="font-mono text-xs text-slate-500">
                                {item.employeeCode}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-xs font-medium text-slate-800">
                                {item.departmentName || (isKhmer ? 'មិនមានផ្នែក' : 'Unassigned')}
                              </p>
                              {item.positionName && (
                                <p className="text-xs text-slate-500">{item.positionName}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              tone="neutral"
                              className={cn(
                                'text-xs font-bold',
                                isUrgent && 'bg-rose-100 text-rose-800',
                                isModerate && !isUrgent && 'bg-amber-100 text-amber-800',
                                !isModerate && !isUrgent && 'bg-slate-100 text-slate-700',
                              )}
                            >
                              {item.daysRemaining} {isKhmer ? 'ថ្ងៃ' : 'Days'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-slate-600">
                              {new Date(item.contractEndDate).toLocaleDateString(
                                isKhmer ? 'km-KH' : 'en-US',
                                { year: 'numeric', month: 'short', day: 'numeric' },
                              )}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.phone && (
                                <a
                                  href={`tel:${item.phone}`}
                                  className="inline-flex size-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                  title={isKhmer ? 'ហៅទូរស័ព្ទ' : 'Call Staff'}
                                >
                                  <Phone className="size-3.5 text-[#00509d]" />
                                </a>
                              )}
                              <Link
                                href={`/employees/${item.employeeId}`}
                                className="inline-flex h-8 items-center rounded-lg border border-[#00509d] bg-[#00509d] px-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#023e8a]"
                              >
                                {isKhmer ? 'ពិនិត្យ' : 'Profile'}
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Headcount by Department */}
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-950">
                  {isKhmer ? 'បែងចែកតាមផ្នែក' : 'Headcount by Department'}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isKhmer
                    ? 'ចំនួនបុគ្គលិកតាមផ្នែកនីមួយៗ'
                    : 'Staff distribution across departments'}
                </CardDescription>
              </div>
              <Link
                href="/organization/departments"
                className="text-xs font-semibold text-[#00509d] hover:underline"
              >
                {isKhmer ? 'គ្រប់គ្រង' : 'Manage'}
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {byDepartment.length === 0 ? (
              <p className="text-center text-xs text-slate-500">
                {isKhmer ? 'មិនមានទិន្នន័យផ្នែកទេ' : 'No department data available.'}
              </p>
            ) : (
              byDepartment.map((d: DepartmentHeadcountItem) => {
                const percentage = Math.round((d.count / (totalEmployees || 1)) * 100);
                const barWidth = Math.round((d.count / maxDeptCount) * 100);

                return (
                  <div key={d.departmentId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">
                        {isKhmer && d.departmentNameKh ? d.departmentNameKh : d.departmentNameEn}
                      </span>
                      <span className="font-bold text-slate-900">
                        {d.count}{' '}
                        <span className="font-normal text-slate-400">({percentage}%)</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-[#00509d] transition-all duration-300"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}

            {/* Branch Headcount Summary if multi-campus */}
            {byBranch.length > 1 && (
              <div className="border-t border-slate-100 pt-3">
                <span className="text-xs font-semibold tracking-normal text-slate-400 uppercase">
                  {isKhmer ? 'តាមសាខា' : 'By Campus Branch'}
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {byBranch.map((b) => (
                    <div
                      key={b.branchId}
                      className="rounded-lg border border-slate-100 bg-slate-50/60 p-2 text-center"
                    >
                      <p className="font-mono text-xs text-slate-500">{b.branchCode}</p>
                      <p className="text-sm font-bold text-slate-900">{b.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Faculty Workload Distribution */}
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-slate-950">
                {isKhmer
                  ? 'បន្ទុកបង្រៀនរបស់គ្រូ (Faculty Workload Distribution)'
                  : 'Faculty Workload Distribution'}
              </CardTitle>
              <CardDescription className="text-xs">
                {isKhmer
                  ? 'ចំនួនថ្នាក់ និងចំនួនសិស្សសរុបដែលគ្រូនីមួយៗទទួលខុសត្រូវ ជៀសវាងបន្ទុកលើសកម្រិត'
                  : 'Class and student allocations per instructor to prevent faculty overload.'}
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/teacher-assignments"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00509d] hover:underline"
              >
                {isKhmer ? 'បើកតារាងបន្ទុកបង្រៀនពេញលេញ' : 'Open Faculty Matrix'}
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {teacherWorkloads.length > 0 && (
            <div className="relative mt-2">
              <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={
                  isKhmer
                    ? 'ស្វែងរកគ្រូបង្រៀនតាមឈ្មោះ ឬអត្តលេខ...'
                    : 'Search faculty by name or employee code...'
                }
                value={workloadSearch}
                onChange={(e) => setWorkloadSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
              />
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          {teacherWorkloads.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              {isKhmer
                ? 'មិនទាន់មានទិន្នន័យចាត់តាំងបន្ទុកបង្រៀនគ្រូនៅឡើយទេ'
                : 'No teacher assignments recorded yet.'}
            </div>
          ) : filteredWorkloads.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              {isKhmer
                ? 'រកមិនឃើញទិន្នន័យស្របនឹងការស្វែងរកទេ'
                : 'No teachers match your search query.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 text-slate-600 hover:bg-slate-50/70">
                    <TableHead className="w-56 text-xs font-semibold">
                      {isKhmer ? 'លោកគ្រូ-អ្នកគ្រូ' : 'Instructor'}
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold">
                      {isKhmer ? 'ថ្នាក់ទទួលបន្ទុក' : 'Assigned Classes'}
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold">
                      {isKhmer ? 'សិស្សសរុប' : 'Total Students'}
                    </TableHead>
                    <TableHead className="text-center text-xs font-semibold">
                      {isKhmer ? 'ស្ថានភាពបន្ទុក' : 'Workload Status'}
                    </TableHead>
                    <TableHead className="text-right text-xs font-semibold">
                      {isKhmer ? 'សកម្មភាព' : 'Action'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWorkloads.map((tw: TeacherWorkloadItem) => {
                    const isHigh = tw.assignedClassCount >= 5 || tw.totalStudents >= 150;
                    const isOptimal = tw.assignedClassCount >= 2 && tw.assignedClassCount < 5;

                    return (
                      <TableRow key={tw.employeeId} className="hover:bg-slate-50/60">
                        <TableCell>
                          <div>
                            <p className="font-semibold text-slate-900">{tw.name}</p>
                            <p className="font-mono text-xs text-slate-500">{tw.employeeCode}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-bold text-slate-900">
                            {tw.assignedClassCount}
                          </span>
                          <span className="text-xs text-slate-400">
                            {' '}
                            {isKhmer ? 'ថ្នាក់' : 'classes'}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-bold text-slate-900">
                            {tw.totalStudents}
                          </span>
                          <span className="text-xs text-slate-400">
                            {' '}
                            {isKhmer ? 'នាក់' : 'students'}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            tone="neutral"
                            className={cn(
                              'text-xs font-semibold',
                              isHigh && 'bg-amber-100 text-amber-800',
                              isOptimal && 'bg-emerald-100 text-emerald-800',
                              !isHigh && !isOptimal && 'bg-slate-100 text-slate-700',
                            )}
                          >
                            {isHigh
                              ? isKhmer
                                ? 'បន្ទុកខ្ពស់'
                                : 'Heavy Workload'
                              : isOptimal
                                ? isKhmer
                                  ? 'សមស្រប'
                                  : 'Optimal'
                                : isKhmer
                                  ? 'ស្រាល'
                                  : 'Light'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/teacher-assignments?search=${encodeURIComponent(tw.name)}`}
                            className="inline-flex h-8 items-center rounded-lg border border-[#00509d] bg-white px-2.5 text-xs font-semibold text-[#00509d] transition-colors hover:bg-blue-50"
                          >
                            {isKhmer ? 'មើលបន្ទុក' : 'View Schedule'}
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
