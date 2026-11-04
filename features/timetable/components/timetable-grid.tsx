'use client';

import * as React from 'react';
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Clock,
  DoorOpen,
  Eye,
  Plus,
  Printer,
  Search,
  Trash2,
  User,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useAuth } from '@/features/auth/context/auth-context';
import { useDeleteScheduleMutation, useSchedulesQuery } from '../hooks/use-timetable';
import type { ClassScheduleItem, SessionType, TimetableFilters } from '../types';
import { ScheduleDialog } from './schedule-dialog';

const DAYS = [
  { id: 1, nameEn: 'Monday', nameKh: 'ចន្ទ', short: 'Mon' },
  { id: 2, nameEn: 'Tuesday', nameKh: 'អង្គារ', short: 'Tue' },
  { id: 3, nameEn: 'Wednesday', nameKh: 'ពុធ', short: 'Wed' },
  { id: 4, nameEn: 'Thursday', nameKh: 'ព្រហស្បតិ៍', short: 'Thu' },
  { id: 5, nameEn: 'Friday', nameKh: 'សុក្រ', short: 'Fri' },
  { id: 6, nameEn: 'Saturday', nameKh: 'សៅរ៍', short: 'Sat' },
  { id: 7, nameEn: 'Sunday', nameKh: 'អាទិត្យ', short: 'Sun' },
];

export const TimetableGrid = () => {
  const { currentBranchId, hasPermission } = useAuth();
  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const canCreateSchedule =
    hasPermission('class.create.own_branch') || hasPermission('class.create.all_branches');
  const canDeleteSchedule =
    hasPermission('class.delete.own_branch') || hasPermission('class.delete.all_branches');
  const [selectedBranchId, setSelectedBranchId] = React.useState<string>(
    currentBranchId !== 'all' ? currentBranchId : '',
  );
  const [selectedDay, setSelectedDay] = React.useState<number | undefined>(undefined);
  const [selectedSessionType, setSelectedSessionType] = React.useState<SessionType | ''>('');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [viewMode, setViewMode] = React.useState<'matrix' | 'table'>('matrix');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { data: branchesData } = useBranchesQuery({ status: 'active', limit: 50 }, canViewBranches);
  const branches = React.useMemo(() => branchesData?.data ?? [], [branchesData?.data]);

  const filters: TimetableFilters = React.useMemo(
    () => ({
      branchId: selectedBranchId || undefined,
      dayOfWeek: selectedDay,
      sessionType: selectedSessionType || undefined,
      limit: 100,
    }),
    [selectedBranchId, selectedDay, selectedSessionType],
  );

  const { data: schedulesResponse, isLoading, isError } = useSchedulesQuery(filters);
  const deleteMutation = useDeleteScheduleMutation();

  const allSchedules = React.useMemo(
    () => schedulesResponse?.data ?? [],
    [schedulesResponse?.data],
  );

  // Client-side text filter for search query across class name, code, teacher, room, subject
  const filteredSchedules = React.useMemo(() => {
    if (!searchTerm.trim()) return allSchedules;
    const term = searchTerm.toLowerCase();
    return allSchedules.filter((item) => {
      const cls = typeof item.classId === 'object' ? item.classId : null;
      const tchr = typeof item.teacherId === 'object' ? item.teacherId : null;
      const rm = typeof item.classroomId === 'object' ? item.classroomId : null;
      const sub = typeof item.subjectId === 'object' ? item.subjectId : null;

      return (
        cls?.classCode?.toLowerCase().includes(term) ||
        cls?.className?.toLowerCase().includes(term) ||
        rm?.code?.toLowerCase().includes(term) ||
        rm?.name?.toLowerCase().includes(term) ||
        sub?.name?.toLowerCase().includes(term) ||
        sub?.code?.toLowerCase().includes(term) ||
        tchr?.firstName?.toLowerCase().includes(term) ||
        tchr?.lastName?.toLowerCase().includes(term)
      );
    });
  }, [allSchedules, searchTerm]);

  // Metric aggregates
  const morningCount = React.useMemo(
    () => filteredSchedules.filter((s) => s.sessionType === 'morning').length,
    [filteredSchedules],
  );
  const afternoonCount = React.useMemo(
    () => filteredSchedules.filter((s) => s.sessionType === 'afternoon').length,
    [filteredSchedules],
  );
  const eveningCount = React.useMemo(
    () => filteredSchedules.filter((s) => s.sessionType === 'evening').length,
    [filteredSchedules],
  );
  const weekendCount = React.useMemo(
    () => filteredSchedules.filter((s) => s.dayOfWeek === 6 || s.dayOfWeek === 7).length,
    [filteredSchedules],
  );

  // Group schedules by day of week (1 to 7)
  const schedulesByDay = React.useMemo(() => {
    const grouped: Record<number, ClassScheduleItem[]> = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    };
    for (const item of filteredSchedules) {
      if (grouped[item.dayOfWeek]) {
        grouped[item.dayOfWeek].push(item);
      }
    }
    // Sort each day chronologically by start time
    for (const day of Object.keys(grouped)) {
      grouped[Number(day)].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return grouped;
  }, [filteredSchedules]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this schedule slot?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const renderSessionBadge = (type: SessionType) => {
    switch (type) {
      case 'morning':
        return (
          <span className="rounded bg-sky-100 px-1.5 py-0.5 text-xs font-medium text-sky-800">
            Morning
          </span>
        );
      case 'afternoon':
        return (
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
            Afternoon
          </span>
        );
      case 'evening':
        return (
          <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-800">
            Evening
          </span>
        );
      case 'hourly':
        return (
          <span className="rounded bg-teal-100 px-1.5 py-0.5 text-xs font-medium text-teal-800">
            Hourly
          </span>
        );
      default:
        return (
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
            Custom
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Class Timetable & Master Schedule
          </h2>
          <p className="text-xs text-slate-500">
            Weekly timetable distribution, shift hours, and room occupancy schedules across
            campuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'matrix'
                  ? 'bg-[#023e8a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="size-3.5" />
              Weekly Matrix
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#023e8a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="size-3.5" />
              List View
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs"
          >
            <Printer className="size-3.5" />
            Print Timetable
          </Button>

          {canCreateSchedule && (
            <Button
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-1.5 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
            >
              <Plus className="size-3.5" />
              Add Slot
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 print:grid-cols-5">
        <Card className="border-slate-200 bg-white p-3">
          <span className="text-xs font-medium text-slate-500">Total Slots</span>
          <p className="text-xl font-bold text-[#023e8a]">{filteredSchedules.length}</p>
        </Card>
        <Card className="border-slate-200 bg-white p-3">
          <span className="text-xs font-medium text-slate-500">Morning Slots</span>
          <p className="text-xl font-bold text-sky-700">{morningCount}</p>
        </Card>
        <Card className="border-slate-200 bg-white p-3">
          <span className="text-xs font-medium text-slate-500">Afternoon Slots</span>
          <p className="text-xl font-bold text-amber-600">{afternoonCount}</p>
        </Card>
        <Card className="border-slate-200 bg-white p-3">
          <span className="text-xs font-medium text-slate-500">Evening Slots</span>
          <p className="text-xl font-bold text-indigo-600">{eveningCount}</p>
        </Card>
        <Card className="border-slate-200 bg-white p-3">
          <span className="text-xs font-medium text-slate-500">Weekend Slots</span>
          <p className="text-xl font-bold text-emerald-600">{weekendCount}</p>
        </Card>
      </div>

      {/* Filter Row */}
      <Card className="border-slate-200 bg-white p-3 print:hidden">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {canViewBranches && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Branch Filter</label>
              <Select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="h-8 text-xs"
              >
                <option value="">All Campuses / Branches</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.branchNameEn} ({b.branchCode})
                  </option>
                ))}
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Day of Week</label>
            <Select
              value={selectedDay ?? ''}
              onChange={(e) => setSelectedDay(e.target.value ? Number(e.target.value) : undefined)}
              className="h-8 text-xs"
            >
              <option value="">All Days (Mon - Sun)</option>
              {DAYS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameEn} ({d.nameKh})
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Session Shift</label>
            <Select
              value={selectedSessionType}
              onChange={(e) => setSelectedSessionType(e.target.value as SessionType | '')}
              className="h-8 text-xs"
            >
              <option value="">All Shifts</option>
              <option value="morning">Morning (ព្រឹក)</option>
              <option value="afternoon">Afternoon (រសៀល)</option>
              <option value="evening">Evening (យប់)</option>
              <option value="hourly">Hourly (ម៉ោង)</option>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600">Search Filter</label>
            <div className="relative">
              <Search className="absolute top-2 left-2.5 size-3.5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search class, room, teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 pl-8 text-xs"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main View Area */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Clock className="size-4 animate-spin text-[#023e8a]" />
            Loading class schedules...
          </div>
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center text-xs text-rose-800">
          Failed to load timetable schedules. Please refresh or verify permissions.
        </div>
      ) : filteredSchedules.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center">
          <Calendar className="mx-auto size-10 text-slate-400" />
          <h3 className="mt-3 text-sm font-semibold text-slate-800">No Scheduled Sessions</h3>
          <p className="mt-1 text-xs text-slate-500">
            No class schedules match your selected campus, day, or shift filters.
          </p>
          {canCreateSchedule && (
            <Button
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 bg-[#023e8a] text-xs text-white hover:bg-[#00509d]"
            >
              Create New Schedule
            </Button>
          )}
        </div>
      ) : viewMode === 'matrix' ? (
        /* Weekly Matrix Grid View */
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-7 print:grid-cols-7">
          {DAYS.map((d) => {
            if (selectedDay !== undefined && selectedDay !== d.id) return null;
            const items = schedulesByDay[d.id] || [];

            return (
              <div
                key={d.id}
                className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 shadow-sm"
              >
                {/* Column Header */}
                <div className="rounded-t-lg border-b border-slate-200 bg-white p-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800">{d.nameEn}</span>
                      <span className="ml-1 text-xs font-normal text-slate-500">({d.nameKh})</span>
                    </div>
                    <Badge tone="neutral" className="px-1.5 py-0 text-xs">
                      {items.length}
                    </Badge>
                  </div>
                </div>

                {/* Column Content */}
                <div className="min-h-[360px] flex-1 space-y-2 p-2">
                  {items.length === 0 ? (
                    <div className="flex h-32 items-center justify-center text-center text-xs text-slate-400 italic">
                      No sessions
                    </div>
                  ) : (
                    items.map((slot) => {
                      const cls = typeof slot.classId === 'object' ? slot.classId : null;
                      const sub = typeof slot.subjectId === 'object' ? slot.subjectId : null;
                      const rm = typeof slot.classroomId === 'object' ? slot.classroomId : null;
                      const tchr = typeof slot.teacherId === 'object' ? slot.teacherId : null;

                      // Check if this slot overlaps with another slot in the same day sharing teacher or room
                      const tchrId =
                        typeof slot.teacherId === 'object' ? slot.teacherId?._id : slot.teacherId;
                      const rmId =
                        typeof slot.classroomId === 'object'
                          ? slot.classroomId?._id
                          : slot.classroomId;
                      const clsId =
                        typeof slot.classId === 'object' ? slot.classId?._id : slot.classId;

                      const hasOverlapConflict = items.some((other) => {
                        if (other._id === slot._id) return false;
                        const isTimeOverlap =
                          slot.startTime < other.endTime && slot.endTime > other.startTime;
                        if (!isTimeOverlap) return false;
                        const otherTchr =
                          typeof other.teacherId === 'object'
                            ? other.teacherId?._id
                            : other.teacherId;
                        const otherRm =
                          typeof other.classroomId === 'object'
                            ? other.classroomId?._id
                            : other.classroomId;
                        const otherCls =
                          typeof other.classId === 'object' ? other.classId?._id : other.classId;
                        return (
                          (tchrId && otherTchr && tchrId === otherTchr) ||
                          (rmId && otherRm && rmId === otherRm) ||
                          (clsId && otherCls && clsId === otherCls)
                        );
                      });

                      return (
                        <div
                          key={slot._id}
                          className={`group relative rounded-md border p-2.5 shadow-xs transition hover:shadow-sm ${
                            hasOverlapConflict
                              ? 'border-rose-400 bg-rose-50/50'
                              : 'border-slate-200 bg-white hover:border-[#023e8a]'
                          }`}
                        >
                          {/* Time & Session Header */}
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                              <Clock className="size-3 text-[#023e8a]" />
                              <span>
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            {renderSessionBadge(slot.sessionType)}
                          </div>

                          {/* Conflict Warning Chip */}
                          {hasOverlapConflict && (
                            <div className="mt-1 flex items-center gap-1 rounded border border-rose-200 bg-rose-100/70 px-1.5 py-0.5 text-xs font-semibold text-rose-800">
                              <AlertTriangle className="size-3 shrink-0 text-rose-600" />
                              <span className="truncate">Resource Conflict</span>
                            </div>
                          )}

                          {/* Class Title */}
                          <div className="mt-1.5">
                            <span className="block text-xs leading-4 font-bold text-slate-800">
                              {cls?.classCode || 'Class'}
                            </span>
                            <span className="block truncate text-xs leading-snug text-slate-500">
                              {cls?.className || ''}
                            </span>
                          </div>

                          {/* Subject Badge */}
                          {sub && (
                            <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-600">
                              <BookOpen className="size-3 shrink-0 text-slate-400" />
                              <span className="truncate">{sub.name}</span>
                            </div>
                          )}

                          {/* Room & Teacher Metadata */}
                          <div className="mt-2 space-y-1 border-t border-slate-100 pt-1.5 text-xs text-slate-600">
                            {rm && (
                              <div className="flex items-center gap-1 font-medium text-slate-700">
                                <DoorOpen className="size-3 shrink-0 text-emerald-600" />
                                <span className="truncate">
                                  {rm.code} - {rm.name}
                                </span>
                              </div>
                            )}
                            {tchr && (
                              <div className="flex items-center gap-1">
                                <User className="size-3 shrink-0 text-sky-600" />
                                <span className="truncate">
                                  {tchr.firstName} {tchr.lastName}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          {canDeleteSchedule && (
                            <div className="mt-2 flex justify-end print:hidden">
                              <button
                                type="button"
                                onClick={() => handleDelete(slot._id)}
                                disabled={deleteMutation.isPending}
                                className="rounded p-0.5 text-slate-400 transition hover:text-rose-600"
                                title="Delete schedule slot"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Flat Table View */
        <Card className="overflow-hidden border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <tr>
                  <th className="px-3 py-2.5">Day</th>
                  <th className="px-3 py-2.5">Time</th>
                  <th className="px-3 py-2.5">Shift</th>
                  <th className="px-3 py-2.5">Class Code & Name</th>
                  <th className="px-3 py-2.5">Subject</th>
                  <th className="px-3 py-2.5">Classroom</th>
                  <th className="px-3 py-2.5">Assigned Teacher</th>
                  {canDeleteSchedule && (
                    <th className="px-3 py-2.5 text-right print:hidden">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredSchedules.map((slot) => {
                  const dayObj = DAYS.find((d) => d.id === slot.dayOfWeek);
                  const cls = typeof slot.classId === 'object' ? slot.classId : null;
                  const sub = typeof slot.subjectId === 'object' ? slot.subjectId : null;
                  const rm = typeof slot.classroomId === 'object' ? slot.classroomId : null;
                  const tchr = typeof slot.teacherId === 'object' ? slot.teacherId : null;

                  return (
                    <tr key={slot._id} className="hover:bg-slate-50/80">
                      <td className="px-3 py-2.5 font-semibold text-slate-900">
                        {dayObj?.nameEn} ({dayObj?.nameKh})
                      </td>
                      <td className="px-3 py-2.5 font-medium">
                        {slot.startTime} - {slot.endTime}
                      </td>
                      <td className="px-3 py-2.5">{renderSessionBadge(slot.sessionType)}</td>
                      <td className="px-3 py-2.5">
                        <span className="font-bold text-slate-900">{cls?.classCode}</span>
                        <span className="block text-xs text-slate-500">{cls?.className}</span>
                      </td>
                      <td className="px-3 py-2.5 text-slate-600">{sub?.name || '-'}</td>
                      <td className="px-3 py-2.5">
                        {rm ? (
                          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-800">
                            <DoorOpen className="size-3 text-emerald-600" />
                            {rm.code}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        {tchr ? `${tchr.firstName} ${tchr.lastName}` : '-'}
                      </td>
                      {canDeleteSchedule && (
                        <td className="px-3 py-2.5 text-right print:hidden">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(slot._id)}
                            disabled={deleteMutation.isPending}
                            className="h-7 px-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Schedule Dialog Modal */}
      {canCreateSchedule && (
        <ScheduleDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          defaultBranchId={selectedBranchId || undefined}
          defaultDay={selectedDay || 1}
        />
      )}
    </div>
  );
};
