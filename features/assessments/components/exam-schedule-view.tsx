'use client';

import * as React from 'react';
import {
  AlertTriangle,
  Calendar,
  Clock,
  DoorOpen,
  GraduationCap,
  Printer,
  Search,
  UserCheck,
} from '@/components/icons';

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
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useAuth } from '@/features/auth/context/auth-context';
import { useAssessmentsQuery } from '../hooks/use-assessments';
import type { Assessment } from '../types';

export const ExamScheduleView: React.FC = () => {
  const { currentBranchId, hasPermission } = useAuth();
  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>(
    currentBranchId !== 'all' ? currentBranchId : '',
  );
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 50 }, canViewBranches);
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const { data: assessmentsData, isLoading } = useAssessmentsQuery({
    branchId: selectedBranchId || undefined,
    type: selectedType !== 'all' ? (selectedType as Assessment['type']) : undefined,
    limit: 100,
  });

  const allExams = React.useMemo(() => {
    const list = assessmentsData?.data ?? [];
    // Filter to formal exams (midterm, final, or monthly_test)
    return list.filter(
      (a) => a.type === 'midterm' || a.type === 'final' || a.type === 'monthly_test',
    );
  }, [assessmentsData?.data]);

  const filteredExams = React.useMemo(() => {
    return allExams.filter((item) => {
      const cls = typeof item.classId === 'object' ? item.classId : null;
      const sub = typeof item.subjectId === 'object' ? item.subjectId : null;
      const room = typeof item.classroomId === 'object' ? item.classroomId : null;
      const term = searchTerm.toLowerCase();

      return (
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.code.toLowerCase().includes(term) ||
        (cls &&
          (cls.className.toLowerCase().includes(term) ||
            cls.classCode.toLowerCase().includes(term))) ||
        (sub &&
          (sub.nameEn.toLowerCase().includes(term) || sub.code.toLowerCase().includes(term))) ||
        (room && room.name.toLowerCase().includes(term))
      );
    });
  }, [allExams, searchTerm]);

  // Conflict detection: Detect if two exams on the same date and overlapping time share classroom or proctors
  const detectedConflicts = React.useMemo(() => {
    const conflicts: Record<string, string[]> = {};

    for (let i = 0; i < filteredExams.length; i++) {
      const a = filteredExams[i];
      if (!a.assessmentDate || !a.startTime || !a.endTime) continue;

      for (let j = i + 1; j < filteredExams.length; j++) {
        const b = filteredExams[j];
        if (!b.assessmentDate || !b.startTime || !b.endTime) continue;

        // Same Date check
        const dateA = a.assessmentDate.split('T')[0];
        const dateB = b.assessmentDate.split('T')[0];
        if (dateA !== dateB) continue;

        // Time overlap check: startA < endB && endA > startB
        const overlaps = a.startTime < b.endTime && a.endTime > b.startTime;
        if (!overlaps) continue;

        // Room clash check
        const roomA = typeof a.classroomId === 'object' ? a.classroomId?._id : a.classroomId;
        const roomB = typeof b.classroomId === 'object' ? b.classroomId?._id : b.classroomId;
        if (roomA && roomB && roomA === roomB) {
          const msg = `Room Clash: ${typeof a.classroomId === 'object' ? a.classroomId?.name : 'Room'} double-booked at ${a.startTime}-${a.endTime}`;
          conflicts[a._id] = [...(conflicts[a._id] || []), msg];
          conflicts[b._id] = [...(conflicts[b._id] || []), msg];
        }

        // Proctor clash check
        const proctorsA = (a.proctorIds || []).map((p) => (typeof p === 'object' ? p._id : p));
        const proctorsB = (b.proctorIds || []).map((p) => (typeof p === 'object' ? p._id : p));
        const sharedProctor = proctorsA.some((p) => proctorsB.includes(p));
        if (sharedProctor) {
          const msg = `Proctor Clash: Invigilator assigned to multiple exams simultaneously`;
          conflicts[a._id] = [...(conflicts[a._id] || []), msg];
          conflicts[b._id] = [...(conflicts[b._id] || []), msg];
        }
      }
    }
    return conflicts;
  }, [filteredExams]);

  const handlePrint = () => {
    window.print();
  };

  const academicYears = React.useMemo(() => {
    const names = filteredExams
      .map((exam) =>
        typeof exam.academicYearId === 'object' ? exam.academicYearId.name : undefined,
      )
      .filter((name): name is string => Boolean(name));
    return Array.from(new Set(names)).join(', ') || 'Current Academic Year';
  }, [filteredExams]);

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <Card className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm print:border-none print:shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="size-5 text-[#023e8a]" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Examination & Assessment Schedule
              </h3>
              <p className="text-xs text-slate-500">
                Classroom allocations, proctor assignments, and exam hall door notices
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search exam, class, subject..."
                className="h-8 w-52 pl-8 text-xs"
              />
            </div>

            {canViewBranches && (
              <Select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="h-8 w-40 text-xs"
              >
                <option value="">All Campuses</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchNameEn}
                  </option>
                ))}
              </Select>
            )}

            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-8 w-36 text-xs"
            >
              <option value="all">All Exams</option>
              <option value="midterm">Midterm Exam</option>
              <option value="final">Final Exam</option>
              <option value="monthly_test">Monthly Test</option>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-8 text-xs text-slate-700"
            >
              <Printer className="mr-1.5 size-3.5" />
              Print Hall Schedule
            </Button>
          </div>
        </div>
      </Card>

      {/* Printable Exam Notice Banner (Visible in Print) */}
      <div className="hidden text-center print:block print:pb-4">
        <h1 className="text-xl font-bold tracking-wide text-slate-900 uppercase">
          Official Examination Hall Schedule
        </h1>
        <p className="text-xs text-slate-600">
          {academicYears} | Term Assessments & Proctor Registry
        </p>
      </div>

      {/* Exam Table Grid */}
      <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="text-xs font-semibold text-slate-600">DATE & TIME</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">EXAM & CODE</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">
                  CLASS & SUBJECT
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">HALL / ROOM</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">
                  PROCTOR / INVIGILATORS
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-600">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-xs text-slate-400">
                    Loading examination schedules...
                  </TableCell>
                </TableRow>
              ) : filteredExams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-xs text-slate-400">
                    No formal examination sessions found matching the active filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExams.map((exam) => {
                  const cls = typeof exam.classId === 'object' ? exam.classId : null;
                  const sub = typeof exam.subjectId === 'object' ? exam.subjectId : null;
                  const room = typeof exam.classroomId === 'object' ? exam.classroomId : null;
                  const dateStr = exam.assessmentDate ? exam.assessmentDate.split('T')[0] : 'TBD';
                  const examConflicts = detectedConflicts[exam._id] || [];

                  return (
                    <TableRow
                      key={exam._id}
                      className={examConflicts.length > 0 ? 'bg-rose-50/50' : 'hover:bg-slate-50'}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                            <Calendar className="size-3.5 text-[#00509d]" />
                            <span>{dateStr}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                            <Clock className="size-3 text-slate-400" />
                            <span>
                              {exam.startTime && exam.endTime
                                ? `${exam.startTime} - ${exam.endTime}`
                                : 'No Shift Set'}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="block text-xs font-bold text-slate-900">
                            {exam.name}
                          </span>
                          <span className="block font-mono text-xs text-slate-500">
                            {exam.code}
                          </span>
                          {examConflicts.length > 0 && (
                            <div className="mt-1 flex items-center gap-1 rounded bg-rose-100 px-1.5 py-0.5 text-xs font-semibold text-rose-800">
                              <AlertTriangle className="size-3 shrink-0 text-rose-600" />
                              <span>{examConflicts[0]}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-0.5">
                          <span className="block text-xs font-semibold text-slate-900">
                            {cls?.className || 'Assigned Class'} ({cls?.classCode || ''})
                          </span>
                          <span className="block text-xs text-slate-500">
                            {sub?.nameEn || sub?.nameKh || 'Standard Curriculum'}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        {room ? (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800">
                            <DoorOpen className="size-3.5 shrink-0 text-emerald-600" />
                            <span>
                              {room.name} ({room.code})
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No Room Allocated</span>
                        )}
                      </TableCell>

                      <TableCell>
                        {exam.proctorIds && exam.proctorIds.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {exam.proctorIds.map((p, idx) => {
                              const name =
                                typeof p === 'object' ? `${p.firstName} ${p.lastName}` : 'Proctor';
                              return (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                                >
                                  <UserCheck className="size-3 text-[#023e8a]" />
                                  {name}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No Proctor Assigned</span>
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge
                          tone={
                            exam.status === 'published'
                              ? 'success'
                              : exam.status === 'closed'
                                ? 'neutral'
                                : 'warning'
                          }
                          className="text-xs capitalize"
                        >
                          {exam.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
