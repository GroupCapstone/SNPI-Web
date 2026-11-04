'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { useRolesQuery } from '@/features/roles/hooks/use-roles';

import { useConsolidatedSkillGapReportQuery } from '../hooks/use-skills';
import type { ConsolidatedSkillGapReportFilters, SkillCategory } from '../types';

const CATEGORIES: Array<{ id: SkillCategory | ''; label: string }> = [
  { id: '', label: 'All Categories' },
  { id: 'pedagogy', label: 'Pedagogy' },
  { id: 'technical', label: 'Technical' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'administration', label: 'Administration' },
  { id: 'communication', label: 'Communication' },
  { id: 'domain', label: 'Domain & Specialized' },
];

export const SkillGapDashboard = () => {
  const [filters, setFilters] = React.useState<ConsolidatedSkillGapReportFilters>({
    branchId: undefined,
    departmentId: undefined,
    roleId: undefined,
    category: undefined,
    hasGapOnly: undefined,
  });

  const { data: branchData } = useBranchesQuery();
  const { data: deptData } = useDepartmentsQuery();
  const { data: roleData } = useRolesQuery();

  const branches = branchData?.data ?? [];
  const departments = deptData?.data ?? [];
  const roles = roleData?.data ?? [];

  const {
    data: reportData,
    isLoading,
    isError,
    refetch,
  } = useConsolidatedSkillGapReportQuery(filters);

  const report = reportData?.data;
  const employees = report?.employees ?? [];
  const topGaps = report?.topGapSkills ?? [];

  const handleBranchChange = (branchId: string) => {
    setFilters((prev) => ({ ...prev, branchId: branchId || undefined }));
  };

  const handleDeptChange = (departmentId: string) => {
    setFilters((prev) => ({ ...prev, departmentId: departmentId || undefined }));
  };

  const handleRoleChange = (roleId: string) => {
    setFilters((prev) => ({ ...prev, roleId: roleId || undefined }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category: (category as SkillCategory) || undefined }));
  };

  return (
    <div className="space-y-6">
      {/* 1. FILTER CONTROLS */}
      <Card className="border border-slate-200 bg-white">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Filter className="size-3.5 text-[#00509d]" />
              <span>Scope Filters:</span>
            </div>

            <Select
              value={filters.branchId ?? ''}
              onChange={(e) => handleBranchChange(e.target.value)}
              className="h-8 w-44 text-xs"
            >
              <option value="">All Campus Branches</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.branchNameEn}
                </option>
              ))}
            </Select>

            <Select
              value={filters.departmentId ?? ''}
              onChange={(e) => handleDeptChange(e.target.value)}
              className="h-8 w-44 text-xs"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.nameEn}
                </option>
              ))}
            </Select>

            <Select
              value={filters.roleId ?? ''}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="h-8 w-44 text-xs"
            >
              <option value="">All Target Roles</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.nameEn} ({r.code})
                </option>
              ))}
            </Select>

            <Select
              value={filters.category ?? ''}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-8 w-40 text-xs"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>

            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={Boolean(filters.hasGapOnly)}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    hasGapOnly: e.target.checked ? true : undefined,
                  }))
                }
                className="size-3.5 rounded border-slate-300 text-[#00509d]"
              />
              <span>Employees with Gaps Only</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* 2. EXECUTIVE METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-normal text-slate-500 uppercase">
                Employees Evaluated
              </span>
              <Users className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {report?.totalEmployeesEvaluated ?? 0}
            </div>
            <p className="mt-1 text-xs text-slate-400">Active personnel across selected campuses</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-normal text-slate-500 uppercase">
                Average Match Readiness
              </span>
              <TrendingUp className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#00509d]">
                {report?.averageMatchPercentage ?? 0}%
              </span>
              <span className="text-xs text-slate-500">
                {(report?.averageMatchPercentage ?? 0) >= 75
                  ? 'Strong Institutional Readiness'
                  : 'Targeted Training Recommended'}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[#00509d]"
                style={{ width: `${report?.averageMatchPercentage ?? 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-normal text-slate-500 uppercase">
                Top Training Priority
              </span>
              <AlertTriangle className="size-5 shrink-0 text-amber-600" />
            </div>
            <div className="mt-2 truncate font-bold text-slate-900">
              {topGaps[0]?.skillName || 'No critical gaps'}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {topGaps[0]
                ? `${topGaps[0].gapCount} employee(s) need development`
                : 'All benchmarks achieved'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. TOP INSTITUTIONAL GAP COMPETENCIES */}
      {topGaps.length > 0 && (
        <Card className="border border-slate-200 bg-white">
          <CardHeader className="border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4.5 shrink-0 text-amber-600" />
              <div>
                <CardTitle className="text-xs font-bold text-slate-900">
                  Priority Competencies Requiring Institutional Professional Development
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Highest frequency skill gaps identified across academic and administrative roles.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {topGaps.slice(0, 3).map((tg, idx) => (
                <div
                  key={tg.skillId}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">#{idx + 1} Priority</span>
                    <Badge tone="danger">{tg.gapCount} Gaps</Badge>
                  </div>
                  <div className="mt-1 font-bold text-slate-900">{tg.skillName}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Target: L{tg.averageRequiredLevel}</span>
                    <span>Current Avg: L{tg.averageCurrentLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. CONSOLIDATED EMPLOYEE READINESS & GAP MATRIX */}
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="size-4.5 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-xs font-bold text-slate-900">
                  Employee Readiness Matrix & Competency Gaps
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Individual match percentage, benchmark score, and identified development areas.
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-600">
                <tr>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Campus Branch & Dept</th>
                  <th className="px-4 py-3">Evaluated Role</th>
                  <th className="px-4 py-3 text-center">Readiness Match</th>
                  <th className="px-4 py-3 text-center">Required / Acquired</th>
                  <th className="px-4 py-3">Identified Competency Gaps</th>
                  <th className="px-4 py-3 text-right">Profile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <div className="size-4 animate-spin rounded-full border-2 border-[#00509d] border-t-transparent" />
                        <span>Generating consolidated competency report...</span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-rose-500">
                      <p>Failed to generate gap analysis report.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        className="mt-2 text-xs"
                      >
                        Retry
                      </Button>
                    </td>
                  </tr>
                ) : employees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-slate-400">
                      No employee evaluations found matching current filter scope.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => {
                    const gaps = emp.skills.filter(
                      (s) => s.status === 'gap' || s.status === 'missing',
                    );

                    return (
                      <tr key={emp.employeeId} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3">
                          <div className="flex min-w-0 flex-col">
                            <span className="font-semibold text-slate-900">{emp.employeeName}</span>
                            <span className="font-mono text-xs text-slate-500">
                              {emp.employeeCode}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex min-w-0 flex-col">
                            <span className="font-medium text-slate-800">
                              {emp.branchName || '—'}
                            </span>
                            <span className="text-xs text-slate-500">
                              {emp.departmentName || 'General'}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <Badge tone="neutral">{emp.targetRole.roleName}</Badge>
                        </td>

                        <td className="px-4 py-3 text-center">
                          <div className="inline-flex items-center gap-1.5 font-bold">
                            <span
                              className={
                                emp.matchPercentage >= 80
                                  ? 'text-emerald-600'
                                  : emp.matchPercentage >= 60
                                    ? 'text-[#00509d]'
                                    : 'text-rose-600'
                              }
                            >
                              {emp.matchPercentage}%
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-center">
                          <span className="font-medium text-slate-700">
                            {emp.totalAcquiredSkills} / {emp.totalRequiredSkills}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {gaps.length === 0 ? (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="size-3.5 text-emerald-600" />
                              All targets satisfied
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {gaps.slice(0, 3).map((g) => (
                                <span
                                  key={g.skillId}
                                  className="rounded bg-rose-50 px-1.5 py-0.5 text-xs font-medium text-rose-700"
                                >
                                  {g.skillName} (L{g.employeeLevel} &lt; L{g.requiredLevel})
                                </span>
                              ))}
                              {gaps.length > 3 && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600">
                                  +{gaps.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <Link href={`/employees/${emp.employeeId}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="size-7 p-0 text-slate-500 hover:text-[#00509d]"
                              title="View Employee Profile"
                            >
                              <ChevronRight className="size-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
