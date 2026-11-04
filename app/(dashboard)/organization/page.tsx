'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  ChevronRight,
  ContactRound,
  Network,
  PanelsTopLeft,
  School as SchoolIcon,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useDepartmentsQuery } from '@/features/departments/hooks/use-departments';
import { usePositionsQuery } from '@/features/positions/hooks/use-positions';
import { useSchoolsQuery } from '@/features/school/hooks/use-school';

export default function OrganizationOverviewPage() {
  const { data: schoolsData, isLoading: schoolsLoading } = useSchoolsQuery({ limit: 10 });
  const { data: branchesData, isLoading: branchesLoading } = useBranchesQuery({ limit: 100 });
  const { data: departmentsData, isLoading: deptsLoading } = useDepartmentsQuery({ limit: 100 });
  const { data: positionsData, isLoading: posLoading } = usePositionsQuery({ limit: 200 });

  const schools = schoolsData?.data ?? [];
  const primarySchool = schools[0];
  const branches = branchesData?.data ?? [];
  const departments = departmentsData?.data ?? [];
  const positions = positionsData?.data ?? [];

  const isLoading = schoolsLoading || branchesLoading || deptsLoading || posLoading;

  return (
    <PermissionGuard
      requiredAnyPermission={[
        'school.view.all_branches',
        'branch.view.all_branches',
        'department.view.own_branch',
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                Organization Hierarchy
              </h1>
              <Badge tone="neutral">V0.1 Core Foundation</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Overview of SNP-SMS multi-branch organizational framework from top-level School down
              to Job Positions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Network className="size-4 text-[#00509d]" />
            <span>School → Branch → Department → Position</span>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link href="/organization/school" className="group">
            <Card className="transition-all hover:border-[#00509d]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-[#00509d]">
                    <SchoolIcon className="size-5" />
                  </div>
                  <ChevronRight className="size-4 text-slate-400 group-hover:text-[#00509d]" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase">School Root</p>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-7 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{schools.length}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/organization/branches" className="group">
            <Card className="transition-all hover:border-[#00509d]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-[#00509d]">
                    <Building2 className="size-5" />
                  </div>
                  <ChevronRight className="size-4 text-slate-400 group-hover:text-[#00509d]" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Branches</p>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-7 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{branches.length}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/organization/departments" className="group">
            <Card className="transition-all hover:border-[#00509d]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-[#00509d]">
                    <PanelsTopLeft className="size-5" />
                  </div>
                  <ChevronRight className="size-4 text-slate-400 group-hover:text-[#00509d]" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Departments</p>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-7 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{departments.length}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/organization/positions" className="group">
            <Card className="transition-all hover:border-[#00509d]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-blue-50 p-2.5 text-[#00509d]">
                    <ContactRound className="size-5" />
                  </div>
                  <ChevronRight className="size-4 text-slate-400 group-hover:text-[#00509d]" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Positions</p>
                  {isLoading ? (
                    <Skeleton className="mt-1 h-7 w-12" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{positions.length}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Interactive Organizational Tree */}
        <Card>
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-base text-slate-900">
              Interactive Organization Tree
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : !primarySchool ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No school organization configured. Run database seed or create a school profile.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Root Level: School */}
                <div className="flex items-center gap-3 rounded-lg border border-[#023e8a]/20 bg-blue-50/50 p-3.5">
                  <SchoolIcon className="size-6 shrink-0 text-[#023e8a]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">{primarySchool.nameEn}</span>
                      <span className="font-mono text-xs text-slate-500">
                        ({primarySchool.code})
                      </span>
                      <Badge tone="success">Root Organization</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{primarySchool.nameKh}</p>
                  </div>
                  <Link href="/organization/school">
                    <Button variant="outline" size="sm">
                      Manage <ArrowRight className="size-3.5" />
                    </Button>
                  </Link>
                </div>

                {/* Branch Level */}
                <div className="ml-6 space-y-4 border-l-2 border-slate-200 pl-4">
                  {branches.length === 0 ? (
                    <p className="text-xs text-slate-400">No branches added yet.</p>
                  ) : (
                    branches.map((branch) => {
                      const branchDepts = departments.filter((d) => {
                        const bId =
                          typeof d.branchId === 'object' && d.branchId !== null
                            ? d.branchId._id
                            : String(d.branchId);
                        return bId === branch._id;
                      });

                      return (
                        <div key={branch._id} className="space-y-3">
                          <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-3">
                            <Building2 className="size-4 text-[#00509d]" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900">
                                  {branch.branchNameEn}
                                </span>
                                <span className="font-mono text-xs text-slate-400">
                                  [{branch.branchCode}]
                                </span>
                              </div>
                              <span className="text-xs text-slate-500">{branch.branchNameKh}</span>
                            </div>
                            <Badge tone={branch.status === 'active' ? 'success' : 'neutral'}>
                              {branch.status}
                            </Badge>
                          </div>

                          {/* Department Level */}
                          <div className="ml-6 space-y-2 border-l-2 border-slate-200 pl-4">
                            {branchDepts.length === 0 ? (
                              <p className="text-xs text-slate-400">
                                No departments in this branch.
                              </p>
                            ) : (
                              branchDepts.map((dept) => {
                                const deptPositions = positions.filter((p) => {
                                  const dId =
                                    typeof p.departmentId === 'object' && p.departmentId !== null
                                      ? p.departmentId._id
                                      : String(p.departmentId);
                                  return dId === dept._id;
                                });

                                return (
                                  <div key={dept._id} className="space-y-2">
                                    <div className="flex items-center gap-2 rounded border border-slate-100 bg-slate-50 p-2.5">
                                      <PanelsTopLeft className="size-3.5 text-slate-500" />
                                      <span className="text-xs font-medium text-slate-800">
                                        {dept.code} — {dept.nameEn}
                                      </span>
                                      <span className="text-xs text-slate-400">
                                        ({dept.nameKh})
                                      </span>
                                    </div>

                                    {/* Position Level */}
                                    {deptPositions.length > 0 && (
                                      <div className="ml-6 flex flex-wrap gap-1.5 border-l-2 border-slate-100 pl-3">
                                        {deptPositions.map((pos) => (
                                          <span
                                            key={pos._id}
                                            className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-medium text-slate-700"
                                          >
                                            <ContactRound className="size-3 text-slate-400" />
                                            {pos.nameEn}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
