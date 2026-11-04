'use client';

import * as React from 'react';
import { AlertCircle, GraduationCap, Search, X } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
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
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { formatDateTime } from '@/lib/formatters';

import { useMonthlyReportOverviewQuery } from '../hooks/use-reports';
import { ReportNavHeader } from './report-nav-header';

const academicMonthList = [
  { number: 1, kh: 'មករា', en: 'January' },
  { number: 2, kh: 'កុម្ភៈ', en: 'February' },
  { number: 3, kh: 'មីនា', en: 'March' },
  { number: 4, kh: 'មេសា', en: 'April' },
  { number: 5, kh: 'ឧសភា', en: 'May' },
  { number: 6, kh: 'មិថុនា', en: 'June' },
  { number: 7, kh: 'កក្កដា', en: 'July' },
  { number: 8, kh: 'សីហា', en: 'August' },
  { number: 9, kh: 'កញ្ញា', en: 'September' },
  { number: 10, kh: 'តុលា', en: 'October' },
  { number: 11, kh: 'វិច្ឆិកា', en: 'November' },
  { number: 12, kh: 'ធ្នូ', en: 'December' },
];

export const AcademicReportsView = () => {
  const { isKhmer, getLocalizedValue } = useTranslation();

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
  const [branchId, setBranchId] = React.useState('');
  const [classId, setClassId] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);

  const copy = isKhmer
    ? {
        title: 'របាយការណ៍លទ្ធផលសិក្សា',
        subtitle: 'ចំណាត់ថ្នាក់សិស្ស ពិន្ទុមធ្យមប្រចាំខែ និងការបង្កើតសៀវភៅតាមដានការសិក្សាផ្លូវការ',
        allBranches: 'គ្រប់សាខា',
        allClasses: 'គ្រប់ថ្នាក់',
        allMonths: 'គ្រប់ខែ (១២ ខែ)',
        selectMonth: 'ជ្រើសរើសខែ',
        searchPlaceholder: 'ស្វែងរកសិស្សតាមឈ្មោះ ឬកូដ…',
        averageScore: 'ពិន្ទុមធ្យមសរុប',
        testedStudents: 'សិស្សបានប្រឡង',
        topRank: 'ពិន្ទុខ្ពស់បំផុត',
        passingRate: 'អត្រាជាប់មធ្យមភាគ',
        printReport: 'បោះពុម្ពតារាងលទ្ធផល',
        rank: 'ចំណាត់ថ្នាក់',
        studentIdCol: 'កូដសិស្ស',
        studentNameCol: 'ឈ្មោះសិស្ស',
        scoreCol: 'ពិន្ទុមធ្យម (%)',
        assessmentsCol: 'ចំនួនប្រឡង',
        standingCol: 'កម្រិតលទ្ធផល',
        excellent: 'ឆ្នើម',
        good: 'ល្អ',
        pass: 'មធ្យម',
        needsSupport: 'គួរពង្រឹង',
        noData: 'មិនមានទិន្នន័យលទ្ធផលសិក្សាទេ',
        loading: 'កំពុងទាញយកទិន្នន័យសិក្សា…',
        docGenerators: 'ម៉ាស៊ីនបង្កើតឯកសារសិក្សាផ្លូវការ',
        reportCard: 'សៀវភៅតាមដានការសិក្សា (Report Card)',
        transcript: 'ព្រឹត្តិបត្រពិន្ទុ (Official Transcript)',
        preview: 'មើលជាមុន',
        generatePdf: 'បង្កើត PDF ផ្លូវការ',
        officialTitle: 'តារាងចំណាត់ថ្នាក់ និងលទ្ធផលសិក្សាផ្លូវការ',
        dateGenerated: 'កាលបរិច្ឆេទបង្កើត',
        preparedBy: 'អ្នករៀបចំរបាយការណ៍',
        academicDirectorSignature: 'ប្រធានផ្នែកសិក្សាធិការ / នាយកសាលា',
      }
    : {
        title: 'Academic Performance Reports',
        subtitle:
          'Class rankings, monthly test scores, grade distributions, and official transcripts',
        allBranches: 'All Branches',
        allClasses: 'All Classes',
        allMonths: 'All Months (12 Months)',
        selectMonth: 'Select Month',
        searchPlaceholder: 'Search student by name or code…',
        averageScore: 'Overall Class Average',
        testedStudents: 'Tested Students',
        topRank: 'Highest Tested Score',
        passingRate: 'Passing Rate',
        printReport: 'Print Academic Roster',
        rank: 'Rank',
        studentIdCol: 'Student ID',
        studentNameCol: 'Student Name',
        scoreCol: 'Average Score (%)',
        assessmentsCol: 'Assessments',
        standingCol: 'Academic Standing',
        excellent: 'Excellent',
        good: 'Good',
        pass: 'Pass',
        needsSupport: 'Needs Support',
        noData: 'No academic records found for this scope.',
        loading: 'Loading academic reports…',
        docGenerators: 'Official Document Generators',
        reportCard: 'Report Card',
        transcript: 'Academic Transcript',
        preview: 'Preview',
        generatePdf: 'Generate PDF',
        officialTitle: 'Official Academic Rankings & Performance Report',
        dateGenerated: 'Date Generated',
        preparedBy: 'Prepared by',
        academicDirectorSignature: 'Academic Director / Principal',
      };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear + 1 - i);

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 100 });
  const { data: classesData } = useClassesQuery({
    branchId: branchId || undefined,
    status: 'active',
    limit: 100,
  });

  const {
    data: reportData,
    isLoading,
    isError,
  } = useMonthlyReportOverviewQuery({
    year,
    month: selectedMonth ?? undefined,
    search: search.trim() || undefined,
    branchId: branchId || undefined,
    classId: classId || undefined,
    page,
    limit: 100,
  });

  const overview = reportData?.data;
  const rankings = React.useMemo(() => overview?.rankings ?? [], [overview?.rankings]);

  // Filter rankings client-side for immediate search responsiveness
  const filteredRankings = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rankings;
    return rankings.filter(
      (r) =>
        r.studentCode.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.khmerName.toLowerCase().includes(q),
    );
  }, [rankings, search]);

  // Sort rows based on selected month or annual average
  const sortedRankings = React.useMemo(() => {
    return [...filteredRankings].sort((a, b) => {
      if (selectedMonth !== null) {
        const scoreA = a.cells[selectedMonth - 1]?.average ?? -1;
        const scoreB = b.cells[selectedMonth - 1]?.average ?? -1;
        return scoreB - scoreA;
      }
      const avgA =
        a.cells.filter((c) => c.average !== null).reduce((s, c) => s + (c.average ?? 0), 0) /
        Math.max(1, a.cells.filter((c) => c.average !== null).length);
      const avgB =
        b.cells.filter((c) => c.average !== null).reduce((s, c) => s + (c.average ?? 0), 0) /
        Math.max(1, b.cells.filter((c) => c.average !== null).length);
      return avgB - avgA;
    });
  }, [filteredRankings, selectedMonth]);

  // Precompute clean rank and scores with tie handling
  const rankedStudents = React.useMemo(() => {
    const result = [];
    let currentRank = 0;
    let previousScore: number | null = null;

    for (let index = 0; index < sortedRankings.length; index++) {
      const row = sortedRankings[index]!;
      const displayScore =
        selectedMonth !== null
          ? row.cells[selectedMonth - 1]?.average
          : (() => {
              const valid = row.cells.filter((c) => c.average !== null);
              return valid.length
                ? Math.round(
                    (valid.reduce((s, c) => s + (c.average ?? 0), 0) / valid.length) * 100,
                  ) / 100
                : null;
            })();

      let rank: number | null = null;
      if (displayScore !== null) {
        if (selectedMonth !== null) {
          rank = row.cells[selectedMonth - 1]?.rank ?? index + 1;
        } else {
          if (displayScore === previousScore) {
            rank = currentRank;
          } else {
            currentRank = index + 1;
            rank = currentRank;
            previousScore = displayScore;
          }
        }
      }

      const assessmentCount =
        selectedMonth !== null
          ? (row.cells[selectedMonth - 1]?.assessments ?? 0)
          : row.cells.reduce((s, c) => s + c.assessments, 0);

      result.push({
        ...row,
        displayScore,
        rank,
        assessmentCount,
      });
    }

    return result;
  }, [sortedRankings, selectedMonth]);

  // Academic KPIs
  const kpis = React.useMemo(() => {
    const studentAverages: number[] = [];
    for (const r of filteredRankings) {
      if (selectedMonth !== null) {
        const val = r.cells[selectedMonth - 1]?.average;
        if (val !== null && val !== undefined) studentAverages.push(val);
      } else {
        const valid = r.cells.filter((c) => c.average !== null);
        if (valid.length > 0) {
          const studentAvg = valid.reduce((s, c) => s + (c.average ?? 0), 0) / valid.length;
          studentAverages.push(studentAvg);
        }
      }
    }
    const tested = studentAverages.length;
    const avg = tested
      ? Math.round((studentAverages.reduce((a, b) => a + b, 0) / tested) * 100) / 100
      : 0;
    const max = tested ? Math.round(Math.max(...studentAverages) * 100) / 100 : 0;
    const passCount = studentAverages.filter((s) => s >= 50).length;
    const passRate = tested ? Math.round((passCount / tested) * 100) : 0;
    return { tested, avg, max, passRate };
  }, [filteredRankings, selectedMonth]);

  const activeBranchName = React.useMemo(() => {
    if (!branchId) return copy.allBranches;
    const found = branchesData?.data?.find((b) => b._id === branchId);
    return found ? getLocalizedValue(found.branchNameKh, found.branchNameEn) : branchId;
  }, [branchId, branchesData?.data, copy.allBranches, getLocalizedValue]);

  const activeClassName = React.useMemo(() => {
    if (!classId) return copy.allClasses;
    const found = classesData?.data?.find((c) => c._id === classId);
    return found ? found.className : classId;
  }, [classId, classesData?.data, copy.allClasses]);

  return (
    <div className="space-y-6">
      <ReportNavHeader activeSection="academic" />

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
              <strong>{copy.allBranches}:</strong> {activeBranchName}
            </span>
            <span>
              <strong>{copy.allClasses}:</strong> {activeClassName}
            </span>
            <span>
              <strong>{copy.selectMonth}:</strong>{' '}
              {selectedMonth ? `${academicMonthList[selectedMonth - 1]?.kh} ${year}` : `${year}`}
            </span>
            <span>
              <strong>{copy.testedStudents}:</strong> {kpis.tested}
            </span>
            <span>
              <strong>{copy.averageScore}:</strong> {kpis.avg}%
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
              <GraduationCap className="size-6 shrink-0 text-[#00509d]" />
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
              value={String(year)}
              onChange={(e) => {
                setYear(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Filter by year"
              className="rounded-xl bg-white text-xs"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>

            <Select
              value={selectedMonth !== null ? String(selectedMonth) : ''}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedMonth(val ? Number(val) : null);
                setPage(1);
              }}
              aria-label="Filter by month"
              className="rounded-xl bg-white text-xs"
            >
              <option value="">{copy.allMonths}</option>
              {academicMonthList.map((m) => (
                <option key={m.number} value={m.number}>
                  {m.number} - {isKhmer ? m.kh : m.en}
                </option>
              ))}
            </Select>

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
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6">
          {/* KPI Cards */}
          <div className="mb-6 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4 print:hidden">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.averageScore}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-violet-700">{kpis.avg}%</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Standardized Average</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.topRank}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-amber-600">{kpis.max}%</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Cohort High Score</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.passingRate}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-700">
                {kpis.passRate}%
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Score ≥ 50% Benchmark</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {copy.testedStudents}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#00509d]">{kpis.tested}</p>
              <p className="mt-1 text-xs font-medium text-slate-500">Evaluated Assessments</p>
            </div>
          </div>

          {isLoading && <p className="py-12 text-center text-sm text-slate-500">{copy.loading}</p>}

          {isError && (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-rose-700">
              <AlertCircle className="size-4" /> Error loading academic report.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-16 text-center">{copy.rank}</TableHead>
                    <TableHead>{copy.studentIdCol}</TableHead>
                    <TableHead className="min-w-44">{copy.studentNameCol}</TableHead>
                    <TableHead className="text-center">{copy.scoreCol}</TableHead>
                    <TableHead className="text-center">{copy.assessmentsCol}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankedStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="py-12 text-center text-slate-500">
                        {copy.noData}
                      </TableCell>
                    </TableRow>
                  ) : (
                    rankedStudents.map((row) => {
                      const standingTone: 'success' | 'warning' | 'danger' | 'neutral' =
                        row.displayScore !== null && row.displayScore >= 85
                          ? 'success'
                          : row.displayScore !== null && row.displayScore >= 70
                            ? 'success'
                            : row.displayScore !== null && row.displayScore >= 50
                              ? 'warning'
                              : 'danger';

                      const rankClass =
                        row.rank === 1
                          ? 'bg-amber-100 text-amber-800 font-bold'
                          : row.rank === 2
                            ? 'bg-slate-100 text-slate-800 font-bold'
                            : row.rank === 3
                              ? 'bg-amber-50 text-amber-900 font-bold'
                              : 'text-slate-600';

                      return (
                        <TableRow key={row.studentId}>
                          <TableCell className="text-center">
                            {row.rank !== null ? (
                              <span
                                className={cn(
                                  'inline-flex size-7 items-center justify-center rounded-full text-xs',
                                  rankClass,
                                )}
                              >
                                #{row.rank}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">—</span>
                            )}
                          </TableCell>
                          <TableCell className="font-mono text-xs font-semibold text-slate-800">
                            {row.studentCode}
                          </TableCell>
                          <TableCell>
                            <p className="font-semibold text-slate-900">
                              {row.khmerName || row.name}
                            </p>
                            {row.khmerName && row.name && row.khmerName !== row.name && (
                              <p className="text-xs text-slate-500">{row.name}</p>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {row.displayScore !== null ? (
                              <Badge tone={standingTone} className="font-bold">
                                {row.displayScore}%
                              </Badge>
                            ) : (
                              '—'
                            )}
                          </TableCell>
                          <TableCell className="text-center text-xs text-slate-500">
                            {row.assessmentCount}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
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
                <p className="font-semibold text-slate-900">{copy.academicDirectorSignature}</p>
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
