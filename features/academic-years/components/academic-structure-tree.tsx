'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Layers,
  MapPin,
  Search,
  TrendingUp,
  UserCheck,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useAcademicPeriodsQuery } from '@/features/academic-periods/hooks/use-academic-periods';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import type { ClassItem } from '@/features/classes/types';
import { useLevelsQuery } from '@/features/levels/hooks/use-levels';
import type { Level } from '@/features/levels/types';
import { useProgramsQuery } from '@/features/programs/hooks/use-programs';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface AcademicStructureTreeProps {
  initialAcademicYearId?: string;
}

export const AcademicStructureTree: React.FC<AcademicStructureTreeProps> = ({
  initialAcademicYearId,
}) => {
  const { t, isKhmer } = useTranslation();
  const [selectedYearId, setSelectedYearId] = React.useState<string>(initialAcademicYearId || '');
  const [search, setSearch] = React.useState('');
  const [expandedPrograms, setExpandedPrograms] = React.useState<Record<string, boolean>>({});
  const [expandedLevels, setExpandedLevels] = React.useState<Record<string, boolean>>({});

  // Fetch Academic Years
  const { data: years = [], isLoading: isLoadingYears } = useAcademicYearsQuery();

  // Initialize selected year to current active year if not set
  React.useEffect(() => {
    if (!selectedYearId && years.length > 0) {
      const currentYear = years.find((y) => y.isCurrent) || years[0];
      if (currentYear) {
        setSelectedYearId(currentYear._id);
      }
    }
  }, [years, selectedYearId]);

  // Fetch Academic Periods for selected year
  const { data: periodsRes } = useAcademicPeriodsQuery({
    academicYearId: selectedYearId || undefined,
    limit: 50,
  });
  const periods = React.useMemo(() => periodsRes?.data ?? [], [periodsRes?.data]);

  // Fetch Programs
  const { data: programsRes, isLoading: isLoadingPrograms } = useProgramsQuery({ limit: 100 });
  const programs = React.useMemo(() => programsRes?.data ?? [], [programsRes?.data]);

  // Fetch Levels
  const { data: levelsRes, isLoading: isLoadingLevels } = useLevelsQuery({ limit: 200 });
  const levels = React.useMemo(() => levelsRes?.data ?? [], [levelsRes?.data]);

  // Fetch Classes for selected academic year
  const { data: classesRes, isLoading: isLoadingClasses } = useClassesQuery({
    academicYearId: selectedYearId || undefined,
    limit: 300,
  });
  const classes = React.useMemo(() => classesRes?.data ?? [], [classesRes?.data]);

  const isLoading = isLoadingYears || isLoadingPrograms || isLoadingLevels || isLoadingClasses;

  // Group classes by program and level
  const classMap = React.useMemo(() => {
    const map = new Map<string, ClassItem[]>();
    for (const c of classes) {
      const levelId =
        typeof c.levelId === 'object' && c.levelId !== null ? c.levelId._id : String(c.levelId);
      if (!map.has(levelId)) {
        map.set(levelId, []);
      }
      map.get(levelId)!.push(c);
    }
    return map;
  }, [classes]);

  // Group levels by program
  const levelMap = React.useMemo(() => {
    const map = new Map<string, Level[]>();
    for (const lvl of levels) {
      const pId =
        typeof lvl.programId === 'object' && lvl.programId !== null
          ? lvl.programId._id
          : String(lvl.programId);
      if (!map.has(pId)) {
        map.set(pId, []);
      }
      map.get(pId)!.push(lvl);
    }
    return map;
  }, [levels]);

  // Calculate totals
  const summaryMetrics = React.useMemo(() => {
    let totalEnrolled = 0;
    let totalCapacity = 0;

    for (const c of classes) {
      totalEnrolled += c.currentEnrollmentCount || 0;
      totalCapacity += c.capacity || 0;
    }

    const occupancyRate = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;

    return {
      totalPrograms: programs.length,
      totalLevels: levels.length,
      totalClasses: classes.length,
      totalEnrolled,
      totalCapacity,
      occupancyRate,
    };
  }, [programs, levels, classes]);

  // Toggle Program expansion
  const toggleProgram = (programId: string) => {
    setExpandedPrograms((prev) => ({
      ...prev,
      [programId]: !prev[programId],
    }));
  };

  // Toggle Level expansion
  const toggleLevel = (levelId: string) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  // Expand All / Collapse All
  const handleExpandAll = () => {
    const progExp: Record<string, boolean> = {};
    const lvlExp: Record<string, boolean> = {};
    for (const p of programs) progExp[p._id] = true;
    for (const l of levels) lvlExp[l._id] = true;
    setExpandedPrograms(progExp);
    setExpandedLevels(lvlExp);
  };

  const handleCollapseAll = () => {
    setExpandedPrograms({});
    setExpandedLevels({});
  };

  // Filtered Programs based on search query
  const filteredPrograms = React.useMemo(() => {
    if (!search.trim()) return programs;
    const q = search.toLowerCase();

    return programs.filter((prog) => {
      const matchesProg =
        prog.nameEn.toLowerCase().includes(q) ||
        (prog.nameKh && prog.nameKh.toLowerCase().includes(q)) ||
        prog.code.toLowerCase().includes(q);

      if (matchesProg) return true;

      // Check if child levels or classes match
      const childLevels = levelMap.get(prog._id) || [];
      return childLevels.some((lvl) => {
        const matchesLvl = lvl.name.toLowerCase().includes(q) || lvl.code.toLowerCase().includes(q);
        if (matchesLvl) return true;

        const childClasses = classMap.get(lvl._id) || [];
        return childClasses.some(
          (c) => c.className.toLowerCase().includes(q) || c.classCode.toLowerCase().includes(q),
        );
      });
    });
  }, [programs, search, levelMap, classMap]);

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Academic Year Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold whitespace-nowrap text-slate-600">
              {t.academicYears.title}:
            </span>
            <Select
              value={selectedYearId}
              onChange={(e) => setSelectedYearId(e.target.value)}
              className="h-9 w-48 text-xs font-medium"
            >
              {years.map((y) => (
                <option key={y._id} value={y._id}>
                  {y.name} {y.isCurrent ? (isKhmer ? '(បច្ចុប្បន្ន)' : '(Current)') : ''}
                </option>
              ))}
            </Select>
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-3 size-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isKhmer
                  ? 'ស្វែងរកកម្មវិធី, កម្រិត, ឬថ្នាក់...'
                  : 'Search program, level, or class...'
              }
              className="h-9 pl-9 text-xs"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExpandAll} className="h-9 text-xs">
            {t.academicYears.expandAll}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCollapseAll} className="h-9 text-xs">
            {t.academicYears.collapseAll}
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'កម្មវិធីសិក្សា' : 'Programs'}
              </span>
              <GraduationCap className="size-5 shrink-0 text-[#00509d]" />
            </div>
            <div className="mt-1.5 text-xl font-bold text-slate-900">
              {summaryMetrics.totalPrograms}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {isKhmer ? 'កម្រិតថ្នាក់' : 'Levels'}
              </span>
              <Layers className="size-5 shrink-0 text-indigo-600" />
            </div>
            <div className="mt-1.5 text-xl font-bold text-slate-900">
              {summaryMetrics.totalLevels}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t.academicYears.totalClasses}
              </span>
              <BookOpen className="size-5 shrink-0 text-emerald-600" />
            </div>
            <div className="mt-1.5 text-xl font-bold text-slate-900">
              {summaryMetrics.totalClasses}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t.academicYears.totalStudents}
              </span>
              <Users className="size-5 shrink-0 text-amber-600" />
            </div>
            <div className="mt-1.5 text-xl font-bold text-slate-900">
              {summaryMetrics.totalEnrolled}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 border border-slate-200 bg-white sm:col-span-1">
          <CardContent className="p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {t.academicYears.capacityOccupancy}
              </span>
              <TrendingUp className="size-5 shrink-0 text-slate-600" />
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-xl font-bold text-slate-900">
                {summaryMetrics.occupancyRate}%
              </span>
              <span className="text-xs text-slate-400">
                {summaryMetrics.totalEnrolled}/{summaryMetrics.totalCapacity}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Child Academic Periods Strip */}
      {periods.length > 0 && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00509d]">
            <CalendarDays className="size-4" />
            <span>
              {isKhmer
                ? 'វគ្គ / ឆមាសសិក្សាក្នុងឆ្នាំនេះ:'
                : 'Operating Terms & Periods in this Year:'}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {periods.map((period) => (
              <div
                key={period._id}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium',
                  period.status === 'active'
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700',
                )}
              >
                {period.status === 'active' && (
                  <span className="size-1.5 rounded-full bg-[#0056FF]" />
                )}
                <span>{period.name}</span>
                <span className="font-mono text-slate-400">({period.code})</span>
                {period.startDate && period.endDate && (
                  <span className="text-slate-500">
                    · {new Date(period.startDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Hierarchical Tree View */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <GraduationCap className="size-10 text-[#00509d]" />
          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            {isKhmer ? 'មិនមានកម្មវិធីសិក្សាត្រូវនឹងការស្វែងរកទេ' : 'No academic programs found'}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {isKhmer
              ? 'សូមព្យាយាមស្វែងរកពាក្យគន្លឹះផ្សេង ឬផ្លាស់ប្តូរឆ្នាំសិក្សា'
              : 'Try adjusting your search criteria or selecting a different academic year.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrograms.map((program) => {
            const childLevels = levelMap.get(program._id) || [];
            const isProgExpanded = Boolean(expandedPrograms[program._id]);

            // Calculate program level stats
            let progTotalClasses = 0;
            let progTotalEnrolled = 0;
            let progTotalCapacity = 0;

            for (const lvl of childLevels) {
              const lvlClasses = classMap.get(lvl._id) || [];
              progTotalClasses += lvlClasses.length;
              for (const c of lvlClasses) {
                progTotalEnrolled += c.currentEnrollmentCount || 0;
                progTotalCapacity += c.capacity || 0;
              }
            }

            const progOccupancy =
              progTotalCapacity > 0 ? Math.round((progTotalEnrolled / progTotalCapacity) * 100) : 0;

            return (
              <div
                key={program._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition-colors"
              >
                {/* Program Header Node */}
                <div
                  onClick={() => toggleProgram(program._id)}
                  className="flex cursor-pointer flex-col gap-3 p-4 transition-colors hover:bg-slate-50/60 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="grid size-7 place-items-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                    >
                      {isProgExpanded ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronRight className="size-4" />
                      )}
                    </button>

                    <GraduationCap className="size-6 shrink-0 text-[#00509d]" />

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {isKhmer && program.nameKh ? program.nameKh : program.nameEn}
                        </h3>
                        <span className="font-mono text-xs text-slate-500">({program.code})</span>
                        <Badge tone="neutral" className="text-xs capitalize">
                          {program.status}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {childLevels.length} {isKhmer ? 'កម្រិតថ្នាក់' : 'Levels'} ·{' '}
                        {progTotalClasses} {isKhmer ? 'ថ្នាក់រៀន' : 'Classes'}
                      </p>
                    </div>
                  </div>

                  {/* Program Metrics Summary */}
                  <div className="flex items-center gap-4 pl-10 sm:pl-0">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-900">
                        {progTotalEnrolled} / {progTotalCapacity} {isKhmer ? 'សិស្ស' : 'Students'}
                      </div>
                      <div className="text-xs text-slate-400">
                        {progOccupancy}% {isKhmer ? 'អត្រាចំណុះ' : 'Occupancy'}
                      </div>
                    </div>

                    <div className="hidden w-20 md:block">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#00509d]"
                          style={{ width: `${Math.min(100, progOccupancy)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-Levels Branch (Visible when program is expanded) */}
                {isProgExpanded && (
                  <div className="space-y-3 border-t border-slate-100 bg-slate-50/40 p-4">
                    {childLevels.length === 0 ? (
                      <div className="py-4 text-center text-xs text-slate-400">
                        {isKhmer
                          ? 'មិនទាន់មានកម្រិតថ្នាក់ក្នុងកម្មវិធីនេះនៅឡើយទេ'
                          : 'No levels defined under this program.'}
                      </div>
                    ) : (
                      childLevels.map((level) => {
                        const levelClasses = classMap.get(level._id) || [];
                        const isLvlExpanded = Boolean(expandedLevels[level._id]);

                        let lvlEnrolled = 0;
                        let lvlCapacity = 0;
                        for (const c of levelClasses) {
                          lvlEnrolled += c.currentEnrollmentCount || 0;
                          lvlCapacity += c.capacity || 0;
                        }
                        const lvlOccupancy =
                          lvlCapacity > 0 ? Math.round((lvlEnrolled / lvlCapacity) * 100) : 0;

                        return (
                          <div
                            key={level._id}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs"
                          >
                            {/* Level Header Node */}
                            <div
                              onClick={() => toggleLevel(level._id)}
                              className="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-slate-50"
                            >
                              <div className="flex items-center gap-2.5">
                                <button
                                  type="button"
                                  className="grid size-6 place-items-center rounded-md text-slate-400 hover:text-slate-700"
                                >
                                  {isLvlExpanded ? (
                                    <ChevronDown className="size-3.5" />
                                  ) : (
                                    <ChevronRight className="size-3.5" />
                                  )}
                                </button>

                                <Layers className="size-4 shrink-0 text-indigo-600" />

                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-slate-900">
                                      {level.name}
                                    </span>
                                    <span className="font-mono text-xs text-slate-400">
                                      ({level.code})
                                    </span>
                                    <span className="py-0.2 rounded bg-slate-100 px-1.5 text-xs text-slate-600">
                                      {isKhmer
                                        ? `លំដាប់ ${level.sequence}`
                                        : `Seq ${level.sequence}`}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="text-xs font-medium text-slate-600">
                                  {levelClasses.length} {isKhmer ? 'ថ្នាក់' : 'Classes'} ·{' '}
                                  {lvlEnrolled}/{lvlCapacity} {isKhmer ? 'សិស្ស' : 'Students'} (
                                  {lvlOccupancy}%)
                                </span>
                              </div>
                            </div>

                            {/* Classes Sub-Branch (Visible when level is expanded) */}
                            {isLvlExpanded && (
                              <div className="border-t border-slate-100 bg-slate-50/50 p-3">
                                {levelClasses.length === 0 ? (
                                  <div className="py-3 text-center text-xs text-slate-400">
                                    {isKhmer
                                      ? 'មិនទាន់មានថ្នាក់រៀនបើកក្នុងឆ្នាំសិក្សានេះនៅឡើយទេ'
                                      : 'No classes scheduled for this level in the selected academic year.'}
                                  </div>
                                ) : (
                                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                                    {levelClasses.map((cls) => {
                                      const roomName =
                                        typeof cls.classroomId === 'object' &&
                                        cls.classroomId !== null
                                          ? cls.classroomId.name
                                          : '—';
                                      const teacherName =
                                        typeof cls.classTeacherId === 'object' &&
                                        cls.classTeacherId !== null
                                          ? `${cls.classTeacherId.firstName} ${cls.classTeacherId.lastName}`
                                          : '';
                                      const enrolled = cls.currentEnrollmentCount || 0;
                                      const cap = cls.capacity || 1;
                                      const pct = Math.round((enrolled / cap) * 100);

                                      return (
                                        <div
                                          key={cls._id}
                                          className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs transition-colors hover:border-[#00509d]/40"
                                        >
                                          <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                              <span className="text-xs font-bold text-slate-900">
                                                {cls.className}
                                              </span>
                                              <span className="font-mono text-xs text-slate-400">
                                                ({cls.classCode})
                                              </span>
                                            </div>
                                            {cls.shift && (
                                              <Badge tone="neutral" className="text-xs capitalize">
                                                {cls.shift}
                                              </Badge>
                                            )}
                                          </div>

                                          <div className="mt-2 space-y-1 text-xs text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                              <MapPin className="size-3 text-slate-400" />
                                              <span>
                                                {isKhmer ? 'បន្ទប់:' : 'Room:'} {roomName}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                              <UserCheck className="size-3 text-[#00509d]" />
                                              <span>
                                                {teacherName || (
                                                  <span className="text-amber-600">
                                                    {isKhmer
                                                      ? 'មិនទាន់ចាត់តាំងគ្រូ'
                                                      : 'No teacher assigned'}
                                                  </span>
                                                )}
                                              </span>
                                            </div>
                                          </div>

                                          {/* Capacity Meter */}
                                          <div className="mt-2.5 border-t border-slate-100 pt-2">
                                            <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                                              <span>
                                                {isKhmer ? 'ចំណុះ:' : 'Occupancy:'}{' '}
                                                <strong>{enrolled}</strong> / {cap}
                                              </span>
                                              <span
                                                className={cn(
                                                  'font-semibold',
                                                  pct >= 100
                                                    ? 'text-rose-600'
                                                    : pct >= 85
                                                      ? 'text-amber-600'
                                                      : 'text-emerald-600',
                                                )}
                                              >
                                                {pct}%
                                              </span>
                                            </div>
                                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                              <div
                                                className={cn(
                                                  'h-full rounded-full transition-all duration-300',
                                                  pct >= 100
                                                    ? 'bg-rose-600'
                                                    : pct >= 85
                                                      ? 'bg-amber-500'
                                                      : 'bg-emerald-500',
                                                )}
                                                style={{ width: `${Math.min(100, pct)}%` }}
                                              />
                                            </div>
                                          </div>

                                          {/* Action Link */}
                                          <div className="mt-2.5 text-right">
                                            <Link
                                              href={`/classes?search=${encodeURIComponent(cls.classCode)}`}
                                              className="inline-flex items-center gap-1 text-xs font-medium text-[#00509d] hover:underline"
                                            >
                                              <span>
                                                {isKhmer ? 'មើលបញ្ជីសិស្ស' : 'View Roster'}
                                              </span>
                                              <ArrowRight className="size-3" />
                                            </Link>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
