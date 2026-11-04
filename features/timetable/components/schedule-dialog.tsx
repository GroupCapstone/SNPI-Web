'use client';

import * as React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from '@/components/icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { getClassrooms, type ClassroomItem } from '@/features/classrooms/api/get-classrooms';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useEmployeesQuery } from '@/features/employees/hooks/use-employees';
import { useSubjectsQuery } from '@/features/subjects/hooks/use-subjects';
import { checkScheduleConflicts } from '../api/timetable-api';
import { useCreateScheduleMutation } from '../hooks/use-timetable';
import type { ScheduleConflict, SessionType } from '../types';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultBranchId?: string;
  defaultDay?: number;
}

const DAYS = [
  { value: 1, label: 'Monday (ចន្ទ)' },
  { value: 2, label: 'Tuesday (អង្គារ)' },
  { value: 3, label: 'Wednesday (ពុធ)' },
  { value: 4, label: 'Thursday (ព្រហស្បតិ៍)' },
  { value: 5, label: 'Friday (សុក្រ)' },
  { value: 6, label: 'Saturday (សៅរ៍)' },
  { value: 7, label: 'Sunday (អាទិត្យ)' },
];

const SESSION_TYPES: { value: SessionType; label: string }[] = [
  { value: 'morning', label: 'Morning (ព្រឹក)' },
  { value: 'afternoon', label: 'Afternoon (រសៀល)' },
  { value: 'evening', label: 'Evening (យប់)' },
  { value: 'hourly', label: 'Hourly (ម៉ោង)' },
  { value: 'custom', label: 'Custom (ផ្ទាល់ខ្លួន)' },
];

export const ScheduleDialog = ({
  open,
  onOpenChange,
  defaultBranchId,
  defaultDay = 1,
}: ScheduleDialogProps) => {
  const [classId, setClassId] = React.useState('');
  const [dayOfWeek, setDayOfWeek] = React.useState(defaultDay);
  const [sessionType, setSessionType] = React.useState<SessionType>('morning');
  const [startTime, setStartTime] = React.useState('08:00');
  const [endTime, setEndTime] = React.useState('10:00');
  const [subjectId, setSubjectId] = React.useState('');
  const [teacherId, setTeacherId] = React.useState('');
  const [classroomId, setClassroomId] = React.useState('');

  const [classrooms, setClassrooms] = React.useState<ClassroomItem[]>([]);
  const [isCheckingConflicts, setIsCheckingConflicts] = React.useState(false);
  const [conflicts, setConflicts] = React.useState<ScheduleConflict[]>([]);
  const [conflictChecked, setConflictChecked] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const validationRequestRef = React.useRef(0);

  const createMutation = useCreateScheduleMutation();

  const { data: classesData } = useClassesQuery(
    { branchId: defaultBranchId, status: 'active', limit: 100 },
    open,
  );
  const classes = React.useMemo(() => classesData?.data ?? [], [classesData?.data]);

  const { data: employeesData } = useEmployeesQuery({ status: 'active', limit: 100 }, open);
  const employees = React.useMemo(() => employeesData?.data ?? [], [employeesData?.data]);

  const { data: subjectsData } = useSubjectsQuery({ limit: 100 });
  const subjects = React.useMemo(() => subjectsData?.data ?? [], [subjectsData?.data]);

  const selectedClass = React.useMemo(
    () => classes.find((c) => c._id === classId),
    [classes, classId],
  );

  // Load classrooms when branch or selected class changes
  React.useEffect(() => {
    const branchToUse =
      (typeof selectedClass?.branchId === 'object'
        ? selectedClass.branchId._id
        : selectedClass?.branchId) || defaultBranchId;

    if (branchToUse) {
      void getClassrooms(branchToUse).then((data) => {
        setClassrooms(data);
      });
    } else {
      void getClassrooms().then((data) => {
        setClassrooms(data);
      });
    }
  }, [selectedClass, defaultBranchId]);

  // When selected class changes, prefill room and teacher
  React.useEffect(() => {
    if (selectedClass) {
      if (selectedClass.classroomId) {
        const rId =
          typeof selectedClass.classroomId === 'object'
            ? selectedClass.classroomId._id
            : selectedClass.classroomId;
        setClassroomId(rId || '');
      }
      if (selectedClass.classTeacherId) {
        const tId =
          typeof selectedClass.classTeacherId === 'object'
            ? selectedClass.classTeacherId._id
            : selectedClass.classTeacherId;
        setTeacherId(tId || '');
      }
      setConflictChecked(false);
    }
  }, [selectedClass]);

  const handleValidateClashes = React.useCallback(async () => {
    if (!classId) {
      setErrorMsg('Please select a class first.');
      return null;
    }
    if (!startTime || !endTime) {
      setErrorMsg('Please enter both start and end time.');
      return null;
    }
    if (startTime >= endTime) {
      setErrorMsg('Start time must be strictly before end time.');
      return null;
    }

    const requestId = ++validationRequestRef.current;
    setErrorMsg(null);
    setIsCheckingConflicts(true);
    try {
      const branchIdToUse =
        (typeof selectedClass?.branchId === 'object'
          ? selectedClass.branchId._id
          : selectedClass?.branchId) || defaultBranchId;

      const res = await checkScheduleConflicts({
        classId,
        branchId: branchIdToUse,
        dayOfWeek,
        startTime,
        endTime,
        teacherId: teacherId || undefined,
        classroomId: classroomId || undefined,
      });

      const detectedConflicts = res.data?.conflicts || [];
      if (requestId === validationRequestRef.current) {
        setConflicts(detectedConflicts);
        setConflictChecked(true);
      }
      return detectedConflicts;
    } catch (err: unknown) {
      if (requestId === validationRequestRef.current) {
        const message = err instanceof Error ? err.message : 'Failed to validate schedule clashes';
        setErrorMsg(message);
        setConflictChecked(false);
      }
      return null;
    } finally {
      if (requestId === validationRequestRef.current) setIsCheckingConflicts(false);
    }
  }, [
    classId,
    classroomId,
    defaultBranchId,
    dayOfWeek,
    endTime,
    selectedClass,
    startTime,
    teacherId,
  ]);

  // Auto-check conflicts with debounce whenever scheduling fields change
  React.useEffect(() => {
    if (!open || !classId || !startTime || !endTime || startTime >= endTime) {
      setConflicts([]);
      setConflictChecked(false);
      return;
    }

    const timer = setTimeout(() => {
      void handleValidateClashes();
    }, 450);

    return () => {
      clearTimeout(timer);
      validationRequestRef.current += 1;
      setIsCheckingConflicts(false);
    };
  }, [open, classId, dayOfWeek, startTime, endTime, teacherId, classroomId, handleValidateClashes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId) {
      setErrorMsg('Please select a class.');
      return;
    }
    if (!startTime || !endTime) {
      setErrorMsg('Please enter both start and end time.');
      return;
    }
    if (startTime >= endTime) {
      setErrorMsg('Start time must be strictly before end time.');
      return;
    }

    if (!conflictChecked) {
      const detectedConflicts = await handleValidateClashes();
      if (!detectedConflicts || detectedConflicts.length > 0) return;
    } else if (conflicts.length > 0) {
      return;
    }

    const branchIdToUse =
      (typeof selectedClass?.branchId === 'object'
        ? selectedClass.branchId._id
        : selectedClass?.branchId) || defaultBranchId;

    setErrorMsg(null);
    try {
      await createMutation.mutateAsync({
        classId,
        branchId: branchIdToUse,
        academicYearId:
          typeof selectedClass?.academicYearId === 'object'
            ? selectedClass.academicYearId._id
            : selectedClass?.academicYearId,
        academicPeriodId:
          typeof selectedClass?.academicPeriodId === 'object' &&
          selectedClass?.academicPeriodId !== null
            ? (selectedClass.academicPeriodId as { _id: string })._id
            : (selectedClass?.academicPeriodId as string | undefined),
        dayOfWeek,
        sessionType,
        startTime,
        endTime,
        subjectId: subjectId || undefined,
        teacherId: teacherId || undefined,
        classroomId: classroomId || undefined,
        status: 'active',
      });
      onOpenChange(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create schedule';
      setErrorMsg(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Clock className="size-5 text-[#023e8a]" />
            Add Class Schedule Slot
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Schedule a weekly recurring session block with automated teacher and room conflict
            detection.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              <AlertCircle className="size-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Class <span className="text-rose-500">*</span>
            </label>
            <Select
              value={classId}
              onChange={(e) => {
                setClassId(e.target.value);
                setConflictChecked(false);
              }}
              required
            >
              <option value="">Select target class...</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.classCode} - {cls.className}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Day of Week</label>
              <Select
                value={dayOfWeek}
                onChange={(e) => {
                  setDayOfWeek(Number(e.target.value));
                  setConflictChecked(false);
                }}
              >
                {DAYS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Session Type</label>
              <Select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value as SessionType)}
              >
                {SESSION_TYPES.map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                Start Time (HH:mm) <span className="text-rose-500">*</span>
              </label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setConflictChecked(false);
                }}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">
                End Time (HH:mm) <span className="text-rose-500">*</span>
              </label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setConflictChecked(false);
                }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Classroom</label>
              <Select
                value={classroomId}
                onChange={(e) => {
                  setClassroomId(e.target.value);
                  setConflictChecked(false);
                }}
              >
                <option value="">No Room Assigned</option>
                {classrooms.map((rm) => (
                  <option key={rm._id} value={rm._id}>
                    {rm.code} - {rm.name} (Cap: {rm.capacity})
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Teacher</label>
              <Select
                value={teacherId}
                onChange={(e) => {
                  setTeacherId(e.target.value);
                  setConflictChecked(false);
                }}
              >
                <option value="">No Teacher Assigned</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId} - {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Subject (Optional)</label>
            <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">Default Class Curriculum</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Conflict Checking Panel */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Clash Detection Status</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleValidateClashes}
                disabled={isCheckingConflicts || !classId}
                className="h-7 text-xs"
              >
                {isCheckingConflicts ? 'Checking...' : 'Check Clashes'}
              </Button>
            </div>

            {conflictChecked && conflicts.length === 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Zero schedule clashes detected for this time block.</span>
              </div>
            )}

            {conflicts.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {conflicts.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900"
                  >
                    <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                    <div>
                      <span className="text-xs font-semibold text-amber-800 uppercase">
                        {c.type.replace('_', ' ')}:
                      </span>{' '}
                      <span>{c.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createMutation.isPending ||
                isCheckingConflicts ||
                !conflictChecked ||
                conflicts.length > 0
              }
              className="bg-[#023e8a] text-white hover:bg-[#00509d]"
            >
              {createMutation.isPending
                ? 'Saving...'
                : isCheckingConflicts || !conflictChecked
                  ? 'Checking Conflicts...'
                  : conflicts.length > 0
                    ? 'Resolve Conflicts to Save'
                    : 'Save Schedule Slot'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
