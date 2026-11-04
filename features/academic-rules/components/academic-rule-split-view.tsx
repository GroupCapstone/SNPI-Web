'use client';

import * as React from 'react';
import { Award, CheckCircle2, Plus, RotateCcw, Save, Search, Sliders, X } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { useAuth } from '@/features/auth/context/auth-context';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import {
  useAcademicRulesQuery,
  useCreateAcademicRuleMutation,
  useUpdateAcademicRuleMutation,
} from '../hooks/use-academic-rules';
import type { AcademicRuleItem, AcademicRuleType, GradeBand } from '../types';

const DEFAULT_GRADE_BANDS: GradeBand[] = [
  { grade: 'A', minimum: 90, gpa: 4.0, labelKh: 'ល្អប្រសើរ (Excellent)' },
  { grade: 'B', minimum: 80, gpa: 3.0, labelKh: 'ល្អណាស់ (Very Good)' },
  { grade: 'C', minimum: 70, gpa: 2.5, labelKh: 'ល្អ (Good)' },
  { grade: 'D', minimum: 60, gpa: 2.0, labelKh: 'មធ្យម (Fair)' },
  { grade: 'E', minimum: 50, gpa: 1.0, labelKh: 'ខ្សោយ (Pass)' },
  { grade: 'F', minimum: 0, gpa: 0.0, labelKh: 'ធ្លាក់ (Fail)' },
];

export const AcademicRuleSplitView: React.FC = () => {
  const { user, currentBranchId, branchAccess, hasAnyPermission, hasPermission } = useAuth();
  const canManage = hasAnyPermission([
    'academic_rule.manage.own_branch',
    'academic_rule.manage.all_branches',
  ]);
  const canManageAllBranches = hasPermission('academic_rule.manage.all_branches');
  const [selectedRule, setSelectedRule] = React.useState<AcademicRuleItem | null>(null);
  const [ruleType, setRuleType] = React.useState<AcademicRuleType>('grade_scheme');
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [programId, setProgramId] = React.useState('');
  const [levelId, setLevelId] = React.useState('');
  const [status, setStatus] = React.useState<'draft' | 'active' | 'archived'>('active');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<string>('all');

  // Config States
  const [bands, setBands] = React.useState<GradeBand[]>(DEFAULT_GRADE_BANDS);
  const [minAttendance, setMinAttendance] = React.useState<number>(80);
  const [passingAverage, setPassingAverage] = React.useState<number>(50);

  const [formError, setFormError] = React.useState<string | null>(null);
  const [formSuccess, setFormSuccess] = React.useState(false);

  const { data: programsData } = useProgramsQuery({ status: 'active', limit: 50 });
  const programs = React.useMemo(() => programsData?.data ?? [], [programsData?.data]);
  const { data: levelsData } = useLevelsQuery(
    { programId: programId || undefined, status: 'active', limit: 100 },
    Boolean(programId),
  );
  const levels = React.useMemo(() => levelsData?.data ?? [], [levelsData?.data]);

  const {
    data: rulesData,
    isLoading,
    refetch,
  } = useAcademicRulesQuery({
    ruleType: filterType !== 'all' ? (filterType as AcademicRuleType) : undefined,
    limit: 100,
  });
  const rules = React.useMemo(() => rulesData?.data ?? [], [rulesData?.data]);

  const createMutation = useCreateAcademicRuleMutation();
  const updateMutation = useUpdateAcademicRuleMutation();

  const handleReset = () => {
    setSelectedRule(null);
    setCode('');
    setName('');
    setProgramId('');
    setLevelId('');
    setStatus('active');
    setBands(DEFAULT_GRADE_BANDS);
    setMinAttendance(80);
    setPassingAverage(50);
    setFormError(null);
    setFormSuccess(false);
  };

  const handleSelectRule = (rule: AcademicRuleItem) => {
    setSelectedRule(rule);
    setRuleType(rule.ruleType);
    setCode(rule.code);
    setName(rule.name);
    setProgramId(
      typeof rule.programId === 'object' && rule.programId
        ? rule.programId._id
        : (rule.programId ?? ''),
    );
    setLevelId(
      typeof rule.levelId === 'object' && rule.levelId ? rule.levelId._id : (rule.levelId ?? ''),
    );
    setStatus(rule.status);
    setFormError(null);
    setFormSuccess(false);

    if (rule.ruleType === 'grade_scheme' && rule.config?.bands) {
      setBands(rule.config.bands as GradeBand[]);
    } else if (rule.ruleType === 'attendance_threshold') {
      setMinAttendance(Number(rule.config?.minimumAttendanceRate ?? 80));
    } else if (rule.ruleType === 'promotion_rule') {
      setPassingAverage(Number(rule.config?.passingAverage ?? 50));
      setMinAttendance(Number(rule.config?.minimumAttendanceRate ?? 80));
    }
  };

  const handleBandChange = (index: number, field: keyof GradeBand, value: string | number) => {
    setBands((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddBand = () => {
    setBands((prev) => [...prev, { grade: 'C', minimum: 65, gpa: 2.0, labelKh: 'កម្រិតមធ្យម' }]);
  };

  const handleRemoveBand = (index: number) => {
    if (bands.length <= 2) {
      setFormError('A grade scheme must maintain at least 2 grade bands.');
      return;
    }
    setBands((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!code.trim() || !name.trim()) {
      setFormError('Code and Name are required.');
      return;
    }

    let configPayload: Record<string, unknown> = {};
    if (ruleType === 'grade_scheme') {
      const mins = bands.map((b) => Number(b.minimum));
      if (!mins.includes(0)) {
        setFormError('Grade scheme bands must include a 0 threshold (minimum floor).');
        return;
      }
      if (new Set(mins).size !== mins.length) {
        setFormError('All grade band threshold minimums must be unique numbers.');
        return;
      }
      configPayload = {
        bands: bands.map((b) => ({
          grade: b.grade,
          minimum: Number(b.minimum),
          gpa: Number(b.gpa),
          labelKh: b.labelKh?.trim() || undefined,
        })),
      };
    } else if (ruleType === 'attendance_threshold') {
      configPayload = { minimumAttendanceRate: Number(minAttendance) };
    } else if (ruleType === 'promotion_rule') {
      configPayload = {
        passingAverage: Number(passingAverage),
        minimumAttendanceRate: Number(minAttendance),
      };
    } else {
      configPayload = { requirePublishedAssessments: true };
    }

    try {
      if (selectedRule) {
        await updateMutation.mutateAsync({
          id: selectedRule._id,
          data: {
            name,
            config: configPayload,
            status,
          },
        });
      } else {
        await createMutation.mutateAsync({
          ruleType,
          code: code.trim().toUpperCase(),
          name: name.trim(),
          schoolId:
            typeof user?.schoolId === 'object'
              ? (user.schoolId as { _id: string })._id
              : String(user?.schoolId || ''),
          programId: programId || undefined,
          levelId: levelId || undefined,
          branchId:
            canManageAllBranches && currentBranchId === 'all'
              ? undefined
              : currentBranchId !== 'all'
                ? currentBranchId
                : Array.isArray(branchAccess)
                  ? branchAccess[0]
                  : undefined,
          config: configPayload,
          status,
        });
      }
      setFormSuccess(true);
      void refetch();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save academic rule';
      setFormError(msg);
    }
  };

  const filteredRules = React.useMemo(() => {
    return rules.filter((r) => {
      const matchSearch =
        r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [rules, searchTerm]);

  const groupedRules = React.useMemo(() => {
    const groups = new Map<string, AcademicRuleItem[]>();
    for (const rule of filteredRules) {
      const level =
        typeof rule.levelId === 'object' && rule.levelId
          ? rule.levelId.name
          : rule.levelId
            ? 'Assigned Level'
            : 'All School Levels';
      groups.set(level, [...(groups.get(level) ?? []), rule]);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredRules]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Detail editor */}
      <div className="lg:order-2 lg:col-span-7">
        <Card className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="size-4 text-[#00509d]" />
              <h3 className="text-sm font-bold text-slate-900">
                {selectedRule ? `Edit Rule: ${selectedRule.code}` : 'Create Academic Rule'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={selectedRule ? 'warning' : 'neutral'} className="text-xs">
                {selectedRule ? `Version ${selectedRule.version}` : 'New Rule'}
              </Badge>
              {selectedRule && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="h-7 text-xs text-slate-600"
                >
                  <RotateCcw className="mr-1 size-3" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {formError && (
              <div className="rounded border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700">
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="flex items-center gap-1.5 rounded border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Academic rule successfully saved!</span>
              </div>
            )}

            {/* Rule Type Selector */}
            {!selectedRule && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Rule Type</label>
                <Select
                  value={ruleType}
                  onChange={(e) => setRuleType(e.target.value as AcademicRuleType)}
                >
                  <option value="grade_scheme">Grade Scheme (A, B, C, D, E, F)</option>
                  <option value="assessment_scheme">Assessment Weight Scheme</option>
                  <option value="attendance_threshold">Attendance Minimum Threshold</option>
                  <option value="promotion_rule">Annual Promotion / Progression Rule</option>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Rule Code</label>
                <Input
                  disabled={Boolean(selectedRule)}
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. GRD-K12-STD"
                  className="h-9 text-xs uppercase"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Status</label>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'active' | 'archived')}
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Scheme / Rule Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. K-12 National Grade Scheme"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Program Context (Optional)
              </label>
              <Select
                disabled={Boolean(selectedRule)}
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
              >
                <option value="">Global Across All Programs</option>
                {programs.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.nameEn || p.nameKh || p.code}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">School Level</label>
              <Select
                disabled={Boolean(selectedRule) || !programId}
                value={levelId}
                onChange={(event) => setLevelId(event.target.value)}
              >
                <option value="">All Levels in Program</option>
                {levels.map((level) => (
                  <option key={level._id} value={level._id}>
                    {level.name} ({level.code})
                  </option>
                ))}
              </Select>
            </div>

            {/* Dynamic Rule Config Area */}
            {ruleType === 'grade_scheme' && (
              <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Grade Bands Configuration
                  </span>
                  {canManage && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddBand}
                      className="h-6 text-xs"
                    >
                      <Plus className="mr-1 size-3" />
                      Add Band
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {bands.map((b, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[5rem_6.5rem_6rem_1fr_auto] items-center gap-2"
                    >
                      <Select
                        value={b.grade}
                        onChange={(e) => handleBandChange(idx, 'grade', e.target.value)}
                        className="h-8 w-20 text-xs"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                      </Select>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">Min %:</span>
                        <Input
                          type="number"
                          value={b.minimum}
                          onChange={(e) => handleBandChange(idx, 'minimum', Number(e.target.value))}
                          className="h-8 w-16 text-xs"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500">GPA:</span>
                        <Input
                          type="number"
                          step="0.1"
                          value={b.gpa}
                          onChange={(e) => handleBandChange(idx, 'gpa', Number(e.target.value))}
                          className="h-8 w-16 text-xs"
                        />
                      </div>
                      <Input
                        value={b.labelKh ?? ''}
                        onChange={(event) => handleBandChange(idx, 'labelKh', event.target.value)}
                        placeholder="ការពិពណ៌នាខ្មែរ"
                        className="h-8 text-xs leading-5"
                      />
                      {canManage && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveBand(idx)}
                          className="h-8 text-xs text-rose-600 hover:bg-rose-50"
                        >
                          <X className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ruleType === 'attendance_threshold' && (
              <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <label className="text-xs font-bold text-slate-800">
                  Minimum Attendance Rate Requirement (%)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={minAttendance}
                  onChange={(e) => setMinAttendance(Number(e.target.value))}
                  className="h-9 text-xs"
                />
                <p className="text-xs text-slate-500">
                  Students below this percentage will be flagged on transcripts and exam
                  eligibility.
                </p>
              </div>
            )}

            {ruleType === 'promotion_rule' && (
              <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Passing Academic Average (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={passingAverage}
                    onChange={(e) => setPassingAverage(Number(e.target.value))}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-800">
                    Minimum Attendance Rate (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={minAttendance}
                    onChange={(e) => setMinAttendance(Number(e.target.value))}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            )}

            {canManage && (
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="h-9 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
                >
                  <Save className="mr-1.5 size-4" />
                  {selectedRule ? 'Update Rule Policy' : 'Save & Publish Rule'}
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>

      {/* Policy directory */}
      <div className="space-y-4 lg:order-1 lg:col-span-5">
        <Card className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Award className="size-5 text-[#023e8a]" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Academic Policy Schemes</h3>
                <p className="text-xs text-slate-500">Active rules and versioned grading schemes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search rules..."
                  className="h-8 w-44 pl-8 text-xs"
                />
              </div>
              <Select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-8 w-36 text-xs"
              >
                <option value="all">All Types</option>
                <option value="grade_scheme">Grade Schemes</option>
                <option value="attendance_threshold">Attendance</option>
                <option value="promotion_rule">Promotions</option>
              </Select>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="text-xs font-semibold text-slate-600">
                    CODE & NAME
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">TYPE</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">VERSION</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-600">STATUS</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-600">
                    ACTION
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-xs text-slate-400">
                      Loading academic rules...
                    </TableCell>
                  </TableRow>
                ) : filteredRules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-xs text-slate-400">
                      No academic policy rules recorded. Use the form on the left to create one.
                    </TableCell>
                  </TableRow>
                ) : (
                  groupedRules.flatMap(([levelName, levelRules]) => [
                    <TableRow key={`level-${levelName}`} className="bg-slate-100/80">
                      <TableCell colSpan={5} className="py-2 text-xs font-bold text-slate-700">
                        {levelName}
                      </TableCell>
                    </TableRow>,
                    ...levelRules.map((r) => (
                      <TableRow
                        key={r._id}
                        onClick={() => handleSelectRule(r)}
                        className={`cursor-pointer transition-colors ${
                          selectedRule?._id === r._id ? 'bg-blue-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <TableCell>
                          <div className="space-y-0.5">
                            <span className="block text-xs font-semibold text-slate-900">
                              {r.name}
                            </span>
                            <span className="block font-mono text-xs text-slate-500">{r.code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge tone="neutral" className="text-xs capitalize">
                            {r.ruleType.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-medium text-slate-800">
                            v{r.version}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            tone={
                              r.status === 'active'
                                ? 'success'
                                : r.status === 'draft'
                                  ? 'warning'
                                  : 'neutral'
                            }
                            className="text-xs capitalize"
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRule(r);
                            }}
                            className="h-7 text-xs text-[#00509d] hover:bg-blue-50"
                          >
                            {canManage ? 'Configure' : 'View'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )),
                  ])
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};
