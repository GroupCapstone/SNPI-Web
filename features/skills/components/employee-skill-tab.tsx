'use client';

import * as React from 'react';
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  Edit2,
  ExternalLink,
  FileCheck,
  Plus,
  Sparkles,
  Trash2,
  XCircle,
} from '@/components/icons';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { useRolesQuery } from '@/features/roles/hooks/use-roles';

import {
  useDeleteEmployeeSkillMutation,
  useEmployeeSkillGapQuery,
  useEmployeeSkillsQuery,
  useVerifyEmployeeSkillMutation,
} from '../hooks/use-skills';
import type { EmployeeSkill } from '../types';
import { EmployeeSkillDialog } from './employee-skill-dialog';

interface EmployeeSkillTabProps {
  employeeId: string;
}

export const EmployeeSkillTab = ({ employeeId }: EmployeeSkillTabProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState<EmployeeSkill | null>(null);
  const [selectedRoleId, setSelectedRoleId] = React.useState<string>('');

  const { data: empSkillsData, isLoading: skillsLoading } = useEmployeeSkillsQuery(employeeId);
  const { data: rolesData } = useRolesQuery();
  const deleteMutation = useDeleteEmployeeSkillMutation();
  const verifyMutation = useVerifyEmployeeSkillMutation();

  const employeeSkills = empSkillsData?.data ?? [];
  const roles = rolesData?.data ?? [];

  const defaultRoleId = React.useMemo(() => {
    if (roles.length === 0) return '';
    const teacher = roles.find((r) => r.code === 'teacher');
    return teacher ? teacher._id : roles[0]._id;
  }, [roles]);

  const activeRoleId = selectedRoleId || defaultRoleId;

  const { data: gapData, isLoading: gapLoading } = useEmployeeSkillGapQuery(
    employeeId,
    activeRoleId,
  );

  const gapAnalysis = gapData?.data;

  const handleCreate = () => {
    setSelectedSkill(null);
    setDialogOpen(true);
  };

  const handleEdit = (es: EmployeeSkill) => {
    setSelectedSkill(es);
    setDialogOpen(true);
  };

  const handleDelete = async (es: EmployeeSkill) => {
    const skillName =
      typeof es.skillId === 'object' && es.skillId !== null ? es.skillId.name : 'Skill';
    if (window.confirm(`Are you sure you want to remove competency "${skillName}" from profile?`)) {
      await deleteMutation.mutateAsync(es._id);
    }
  };

  const handleVerify = async (es: EmployeeSkill, status: 'verified' | 'rejected') => {
    await verifyMutation.mutateAsync({
      id: es._id,
      data: { status },
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 className="size-3" />
            Verified
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
            <XCircle className="size-3" />
            Rejected
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
            <AlertCircle className="size-3" />
            Expired
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
            <Clock className="size-3" />
            Pending Verification
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. ROLE COMPETENCY GAP & MATCH CARD */}
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">
                  Role Competency Gap & Benchmark Comparison
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Compare employee demonstrated proficiency against institutional role expectations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Target Role:</span>
              <Select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
                className="h-8 w-48 text-xs"
              >
                {roles.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.nameEn} ({r.code})
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {gapLoading ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Evaluating competency match score...
            </div>
          ) : !gapAnalysis || gapAnalysis.skills.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              No required competencies configured for this role.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Match Score & Summary */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase">
                    Competency Match
                  </div>
                  <div className="mt-1 text-2xl font-bold text-[#00509d]">
                    {gapAnalysis.matchPercentage}%
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    {gapAnalysis.matchPercentage >= 80
                      ? 'High Readiness'
                      : gapAnalysis.matchPercentage >= 60
                        ? 'Moderate Readiness'
                        : 'Training Required'}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase">
                    Required Skills
                  </div>
                  <div className="mt-1 text-2xl font-bold text-slate-800">
                    {gapAnalysis.totalRequiredSkills}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">Benchmark targets</div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 text-center">
                  <div className="text-xs font-semibold text-emerald-800 uppercase">
                    Skills Acquired
                  </div>
                  <div className="mt-1 text-2xl font-bold text-emerald-600">
                    {gapAnalysis.totalAcquiredSkills}
                  </div>
                  <div className="mt-0.5 text-xs text-emerald-700">Demonstrated competencies</div>
                </div>

                <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-3.5 text-center">
                  <div className="text-xs font-semibold text-rose-800 uppercase">
                    Identified Gaps
                  </div>
                  <div className="mt-1 text-2xl font-bold text-rose-600">
                    {gapAnalysis.totalGaps}
                  </div>
                  <div className="mt-0.5 text-xs text-rose-700">Below required proficiency</div>
                </div>
              </div>

              {/* Competency Gap Breakdown */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold text-slate-600">
                    <tr>
                      <th className="px-3 py-2.5">Competency</th>
                      <th className="px-3 py-2.5">Category</th>
                      <th className="px-3 py-2.5 text-center">Target Level</th>
                      <th className="px-3 py-2.5 text-center">Current Level</th>
                      <th className="px-3 py-2.5 text-center">Evaluation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {gapAnalysis.skills.map((item) => (
                      <tr key={item.skillId} className="hover:bg-slate-50/50">
                        <td className="px-3 py-2.5">
                          <div className="flex min-w-0 flex-col">
                            <span className="font-semibold text-slate-900">{item.skillName}</span>
                            <span className="font-mono text-xs text-slate-500">
                              {item.skillCode}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600 uppercase">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center font-bold text-slate-700">
                          Level {item.requiredLevel}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {item.employeeLevel > 0 ? (
                            <span
                              className={`font-bold ${
                                item.employeeLevel >= item.requiredLevel
                                  ? 'text-emerald-600'
                                  : 'text-amber-600'
                              }`}
                            >
                              Level {item.employeeLevel}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Not Assessed</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {item.status === 'met' || item.status === 'exceeded' ? (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                              <CheckCircle2 className="size-3" />
                              {item.status === 'exceeded' ? 'Exceeds (+1)' : 'Target Met'}
                            </span>
                          ) : item.status === 'gap' ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              <AlertCircle className="size-3" />
                              Gap (-{item.gapSize})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
                              <XCircle className="size-3" />
                              Missing (-{item.gapSize})
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. EMPLOYEE'S RECORDED SKILLS & CERTIFICATIONS */}
      <Card className="border border-slate-200 bg-white">
        <CardHeader className="border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="size-5 shrink-0 text-[#00509d]" />
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">
                  Recorded Skills & Certifications ({employeeSkills.length})
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Documented capabilities, years of experience, and verified certificates.
                </p>
              </div>
            </div>

            <Button
              onClick={handleCreate}
              size="sm"
              className="bg-[#023e8a] text-xs hover:bg-[#00509d]"
            >
              <Plus className="mr-1 size-3.5" />
              Add Competency
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {skillsLoading ? (
            <div className="py-8 text-center text-xs text-slate-500">
              Loading employee competencies...
            </div>
          ) : employeeSkills.length === 0 ? (
            <div className="py-10 text-center">
              <Award className="mx-auto size-8 text-slate-300" />
              <p className="mt-2 text-sm font-semibold text-slate-700">No skills recorded yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Log demonstrated skills and upload evidence certificates.
              </p>
              <Button
                onClick={handleCreate}
                size="sm"
                className="mt-3 bg-[#023e8a] text-xs hover:bg-[#00509d]"
              >
                <Plus className="mr-1 size-3.5" />
                Add First Skill
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {employeeSkills.map((es) => {
                const skillObj = es.skillId;
                const skillName =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.name : 'Skill';
                const skillCode =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.code : '';
                const category =
                  typeof skillObj === 'object' && skillObj !== null ? skillObj.category : 'general';

                return (
                  <div
                    key={es._id}
                    className="rounded-xl border border-slate-200 bg-slate-50/40 p-3.5 text-xs transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900">{skillName}</div>
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="font-medium text-slate-700">{skillCode}</span>
                          <span className="py-0.2 rounded bg-slate-200/80 px-1.5 text-xs font-semibold text-slate-700 uppercase">
                            {category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(es)}
                          className="size-7 p-0 text-slate-500 hover:text-slate-900"
                          title="Edit Competency"
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(es)}
                          className="size-7 p-0 text-slate-400 hover:text-rose-600"
                          title="Remove Competency"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#00509d] px-2 py-0.5 font-bold text-white">
                          Level {es.proficiencyLevel} / 5
                        </span>
                        {es.yearsExperience !== undefined && es.yearsExperience > 0 && (
                          <span className="text-xs text-slate-500">
                            {es.yearsExperience} yrs exp
                          </span>
                        )}
                      </div>

                      <div>{getStatusBadge(es.status)}</div>
                    </div>

                    {es.evidenceDocument && (
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-1 truncate">
                          <FileCheck className="size-3 text-[#00509d]" />
                          <span className="truncate">{es.evidenceDocument}</span>
                        </div>
                        {es.evidenceUrl && (
                          <a
                            href={es.evidenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-0.5 text-[#00509d] hover:underline"
                          >
                            <span>Link</span>
                            <ExternalLink className="size-2.5" />
                          </a>
                        )}
                      </div>
                    )}

                    {es.status === 'pending' && (
                      <div className="mt-2 flex items-center justify-end gap-1.5 border-t border-slate-200/60 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleVerify(es, 'rejected')}
                          className="h-7 px-2.5 text-xs text-rose-600 hover:bg-rose-50"
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleVerify(es, 'verified')}
                          className="h-7 bg-emerald-600 px-2.5 text-xs text-white hover:bg-emerald-700"
                        >
                          Verify Competency
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <EmployeeSkillDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employeeId={employeeId}
        employeeSkill={selectedSkill}
      />
    </div>
  );
};
