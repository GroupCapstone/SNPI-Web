'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Medal,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
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
import { useAcademicHonorRollQuery } from '../hooks/use-dashboard';

interface AcademicHonorRollLeaderboardProps {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
}

export const AcademicHonorRollLeaderboard: React.FC<AcademicHonorRollLeaderboardProps> = ({
  branchId,
  academicYearId,
  academicPeriodId,
}) => {
  const { isKhmer } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'students' | 'classes'>('students');

  const { data, isLoading, isError, refetch, isFetching } = useAcademicHonorRollQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    academicYearId,
    academicPeriodId,
    limit: 25,
  });

  const response = data?.data;
  const summary = response?.summary;
  const topPerformers = response?.topPerformers ?? [];
  const classPerformances = response?.classPerformances ?? [];
  const gradeDistribution = response?.gradeDistribution ?? [];

  // Extract unique classes for filter dropdown
  const classNames = React.useMemo(() => {
    const set = new Set<string>();
    topPerformers.forEach((p) => {
      if (p.className) set.add(p.className);
    });
    classPerformances.forEach((c) => {
      if (c.className) set.add(c.className);
    });
    return Array.from(set);
  }, [topPerformers, classPerformances]);

  // Filter students based on search term and class
  const filteredStudents = React.useMemo(() => {
    return topPerformers.filter((item) => {
      const matchesSearch =
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.className.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || item.className === selectedClass;
      return matchesSearch && matchesClass;
    });
  }, [topPerformers, searchTerm, selectedClass]);

  // Filter classes based on search
  const filteredClasses = React.useMemo(() => {
    return classPerformances.filter((item) =>
      item.className.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [classPerformances, searchTerm]);

  if (isLoading) {
    return (
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="pb-3">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !summary) {
    return (
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-slate-500">
            {isKhmer
              ? 'មិនអាចទាញយកទិន្នន័យចំណាត់ថ្នាក់សិក្សាបានទេ'
              : 'Unable to load academic leaderboard metrics.'}
          </p>
          <Button size="sm" variant="outline" onClick={() => refetch()} className="mt-3">
            <RefreshCw className="mr-1.5 size-3.5" />
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400 bg-[#ffd60a]/25 px-2 py-0.5 text-xs font-bold text-amber-950">
          <Medal className="size-3 text-amber-700" />
          <span>#1</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-200/70 px-2 py-0.5 text-xs font-bold text-slate-800">
          <Medal className="size-3 text-slate-600" />
          <span>#2</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100/70 px-2 py-0.5 text-xs font-bold text-amber-900">
          <Medal className="size-3 text-amber-800" />
          <span>#3</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
        #{rank}
      </span>
    );
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A':
        return (
          <Badge
            tone="success"
            className="border-emerald-200 bg-emerald-50 font-bold text-emerald-700"
          >
            A
          </Badge>
        );
      case 'B':
        return (
          <Badge tone="neutral" className="border-blue-200 bg-blue-50 font-bold text-[#00509d]">
            B
          </Badge>
        );
      case 'C':
        return (
          <Badge tone="neutral" className="border-amber-200 bg-amber-50 font-bold text-amber-700">
            C
          </Badge>
        );
      case 'D':
        return (
          <Badge
            tone="warning"
            className="border-orange-200 bg-orange-50 font-bold text-orange-700"
          >
            D
          </Badge>
        );
      default:
        return (
          <Badge tone="danger" className="border-rose-200 bg-rose-50 font-bold text-rose-700">
            {grade}
          </Badge>
        );
    }
  };

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Award className="size-5 shrink-0 text-[#023e8a]" />
              <CardTitle className="text-base font-bold text-slate-950">
                {isKhmer
                  ? 'តារាងកិត្តិយស និងចំណាត់ថ្នាក់សិក្សា'
                  : 'Academic Honor Roll & Top Performers'}
              </CardTitle>
            </div>
            <CardDescription className="mt-1 text-xs text-slate-500">
              {isKhmer
                ? 'តាមដានសិស្សពូកែទូទាំងថ្នាក់ មធ្យមភាគពិន្ទុ និងការចែកចាយកម្រិតនិទ្ទេស'
                : 'Recognize top-ranking scholars, compare class academic performance, and monitor grade distributions.'}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('students')}
                className={cn(
                  'rounded-md px-2.5 py-1 font-semibold transition-all',
                  viewMode === 'students'
                    ? 'bg-[#023e8a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900',
                )}
              >
                {isKhmer ? 'សិស្សឆ្នើម' : 'Top Students'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('classes')}
                className={cn(
                  'rounded-md px-2.5 py-1 font-semibold transition-all',
                  viewMode === 'classes'
                    ? 'bg-[#023e8a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900',
                )}
              >
                {isKhmer ? 'តាមថ្នាក់' : 'By Class'}
              </button>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
              className="h-8 text-xs"
            >
              <RefreshCw className={cn('size-3.5', isFetching && 'animate-spin')} />
            </Button>
          </div>
        </div>

        {/* Primary Academic Pulse KPI Row */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">
                {isKhmer ? 'សិស្សបានវាយតម្លៃ' : 'Evaluated Students'}
              </span>
              <Users className="size-3.5 text-[#00509d]" />
            </div>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {summary.totalEvaluatedStudents}
            </p>
            <p className="text-xs text-slate-500">
              {isKhmer ? 'សរុបក្នុងកាលវិភាគ' : 'Enrolled & assessed'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">
                {isKhmer ? 'មធ្យមភាគរួម' : 'Overall Average'}
              </span>
              <TrendingUp className="size-3.5 text-emerald-600" />
            </div>
            <p className="mt-1 text-xl font-bold text-emerald-700">{summary.overallAverage}%</p>
            <p className="text-xs text-slate-500">
              {isKhmer ? 'ពិន្ទុមធ្យមគ្រប់មុខវិជ្ជា' : 'Across all subjects'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">
                {isKhmer ? 'តារាងកិត្តិយស' : 'Honor Roll'}
              </span>
              <Sparkles className="size-3.5 text-amber-600" />
            </div>
            <p className="mt-1 text-xl font-bold text-[#023e8a]">{summary.honorRollCount}</p>
            <p className="text-xs text-slate-500">
              {isKhmer ? 'និទ្ទេស A ឬ GPA ≥ 3.5' : 'Grade A / GPA ≥ 3.5'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-medium">
                {isKhmer ? 'អត្រាជាប់រួម' : 'Passing Rate'}
              </span>
              <CheckCircle2 className="size-3.5 text-emerald-600" />
            </div>
            <p className="mt-1 text-xl font-bold text-slate-900">{summary.overallPassingRate}%</p>
            <p className="text-xs text-slate-500">
              {isKhmer ? 'សិស្សប្រឡងជាប់' : 'Passed criteria'}
            </p>
          </div>
        </div>

        {/* Grade Distribution Bar */}
        {gradeDistribution.length > 0 && (
          <div className="mt-3 space-y-1.5 rounded-xl border border-slate-100 bg-slate-50/40 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">
                {isKhmer ? 'ការបែងចែកកម្រិតនិទ្ទេស (A - F)' : 'Grade Tier Distribution (A - F)'}
              </span>
              <span className="font-mono text-xs text-slate-500">
                {summary.totalEvaluatedStudents} {isKhmer ? 'នាក់' : 'records'}
              </span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-200">
              {gradeDistribution.map((item) => {
                const colorMap: Record<string, string> = {
                  A: 'bg-emerald-500',
                  B: 'bg-blue-500',
                  C: 'bg-amber-400',
                  D: 'bg-orange-400',
                  E: 'bg-rose-400',
                  F: 'bg-slate-400',
                };
                if (item.percentage === 0) return null;
                return (
                  <div
                    key={item.grade}
                    className={cn('h-full transition-all', colorMap[item.grade] ?? 'bg-slate-300')}
                    style={{ width: `${item.percentage}%` }}
                    title={`Grade ${item.grade}: ${item.count} (${item.percentage}%)`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-slate-600">
              {gradeDistribution.map((item) => (
                <div key={item.grade} className="flex items-center gap-1 font-medium">
                  <span className="font-bold text-slate-900">{item.grade}:</span>
                  <span>{item.count}</span>
                  <span className="text-slate-400">({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        {/* Search and Class Filter Controls */}
        <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={isKhmer ? 'ស្វែងរកតាមឈ្មោះ ឬអត្តលេខ...' : 'Search student or class...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-8 text-xs placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
            />
          </div>

          {viewMode === 'students' && classNames.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500">{isKhmer ? 'ថ្នាក់:' : 'Class:'}</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="all">{isKhmer ? 'គ្រប់ថ្នាក់ទាំងអស់' : 'All Classes'}</option>
                {classNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* View 1: Top Students Table */}
        {viewMode === 'students' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-14 text-center text-xs font-semibold">
                    {isKhmer ? 'ចំណាត់ថ្នាក់' : 'Rank'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    {isKhmer ? 'អត្តលេខ' : 'Code'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    {isKhmer ? 'ឈ្មោះសិស្ស' : 'Student Name'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    {isKhmer ? 'ថ្នាក់' : 'Class'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'មធ្យមភាគ' : 'Average'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'GPA' : 'GPA'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'និទ្ទេស' : 'Grade'}
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold">
                    {isKhmer ? 'វត្តមាន' : 'Attendance'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-xs text-slate-500">
                      {isKhmer
                        ? 'មិនមានទិន្នន័យសិស្សពូកែត្រូវតាមការស្វែងរកទេ'
                        : 'No honor roll students match your criteria.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-slate-50/60">
                      <TableCell className="text-center">{getRankBadge(student.rank)}</TableCell>
                      <TableCell className="font-mono text-xs text-slate-600">
                        {student.studentCode}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs font-medium text-slate-900">
                          {student.studentName}
                        </div>
                        {student.branchName && (
                          <div className="text-xs text-slate-400">{student.branchName}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-slate-700">
                        <span className="font-medium">{student.className}</span>
                        {student.programName && (
                          <span className="block text-xs text-slate-400">
                            {student.programName}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-xs font-bold text-slate-900">
                        {student.averageScore}%
                      </TableCell>
                      <TableCell className="text-center text-xs font-bold text-[#023e8a]">
                        {student.gpa.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getGradeBadge(student.letterGrade)}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-slate-600">
                        {student.attendanceRate}%
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* View 2: Class Performance Breakdown */}
        {viewMode === 'classes' && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-xs font-semibold">
                    {isKhmer ? 'ថ្នាក់រៀន' : 'Class Name'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'ចំនួនសិស្ស' : 'Students'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'ពិន្ទុមធ្យម' : 'Class Average'}
                  </TableHead>
                  <TableHead className="text-center text-xs font-semibold">
                    {isKhmer ? 'ពិន្ទុខ្ពស់បំផុត' : 'Highest Score'}
                  </TableHead>
                  <TableHead className="w-48 text-right text-xs font-semibold">
                    {isKhmer ? 'អត្រាជាប់ (%)' : 'Passing Rate (%)'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-xs text-slate-500">
                      {isKhmer
                        ? 'មិនមានទិន្នន័យថ្នាក់រៀនត្រូវតាមការស្វែងរកទេ'
                        : 'No class performance records found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClasses.map((item) => (
                    <TableRow key={item.classId} className="hover:bg-slate-50/60">
                      <TableCell>
                        <span className="text-xs font-semibold text-slate-900">
                          {item.className}
                        </span>
                        {item.programName && (
                          <span className="block text-xs text-slate-500">{item.programName}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center text-xs font-medium text-slate-700">
                        {item.studentCount}
                      </TableCell>
                      <TableCell className="text-center text-xs font-bold text-[#023e8a]">
                        {item.classAverage}%
                      </TableCell>
                      <TableCell className="text-center text-xs font-bold text-emerald-700">
                        {item.highestScore}%
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={cn(
                                'h-full rounded-full',
                                item.passingRate >= 80
                                  ? 'bg-emerald-500'
                                  : item.passingRate >= 50
                                    ? 'bg-amber-400'
                                    : 'bg-rose-500',
                              )}
                              style={{ width: `${item.passingRate}%` }}
                            />
                          </div>
                          <span className="w-9 text-right text-xs font-bold text-slate-900">
                            {item.passingRate}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs text-slate-500">
          <span>
            {isKhmer
              ? 'ទិន្នន័យត្រូវបានគណនាពីលទ្ធផលឆមាស និងការប្រឡងផ្លូវការ'
              : 'Rankings computed from official term results and continuous assessments.'}
          </span>
          <Link
            href="/term-results"
            className="inline-flex items-center gap-1 font-semibold text-[#00509d] hover:underline"
          >
            <span>{isKhmer ? 'មើលលទ្ធផលពេញលេញ' : 'View Full Term Results'}</span>
            <ChevronRight className="size-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
