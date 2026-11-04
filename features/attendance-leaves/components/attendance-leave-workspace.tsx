'use client';

import * as React from 'react';
import { FileCheck2, Plus } from '@/components/icons';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';

import {
  useAttendanceLeavesQuery,
  useCreateAttendanceLeaveMutation,
  useReviewAttendanceLeaveMutation,
} from '../hooks/use-attendance-leaves';
import { attendanceLeaveFormSchema } from '../schemas';
import type { AttendanceLeaveStatus, AttendanceLeaveType } from '../types';

export const AttendanceLeaveWorkspace = () => {
  const { hasPermission } = useAuth();
  const [branchId, setBranchId] = React.useState('');
  const [status, setStatus] = React.useState<AttendanceLeaveStatus | ''>('');
  const [form, setForm] = React.useState({
    enrollmentId: '',
    leaveType: 'medical' as AttendanceLeaveType,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    reason: '',
    documentUrl: '',
    documentName: '',
  });
  const { data: branchesData } = useBranchesQuery();
  const { data: enrollmentsData } = useEnrollmentsQuery({
    branchId: branchId || undefined,
    limit: 100,
  });
  const enrollments = (enrollmentsData?.data ?? []).filter((item) =>
    ['enrolled', 'active'].includes(item.status),
  );
  const { data, isLoading } = useAttendanceLeavesQuery({
    branchId: branchId || undefined,
    status: status || undefined,
    limit: 50,
  });
  const createMutation = useCreateAttendanceLeaveMutation();
  const reviewMutation = useReviewAttendanceLeaveMutation();
  const canCreate =
    hasPermission('attendance.create.assigned_class') ||
    hasPermission('attendance.create.own_branch') ||
    hasPermission('attendance.create.all_branches');
  const canReview =
    hasPermission('attendance.edit.own_branch') || hasPermission('attendance.edit.all_branches');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = attendanceLeaveFormSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid leave request');
      return;
    }
    const enrollment = enrollments.find((item) => item._id === parsed.data.enrollmentId);
    if (!enrollment) {
      toast.error('Select an active enrollment');
      return;
    }
    try {
      await createMutation.mutateAsync({
        ...parsed.data,
        branchId: enrollment.branchId._id,
        studentId: enrollment.studentId._id,
        classId: enrollment.classId._id,
      });
      setForm((previous) => ({
        ...previous,
        enrollmentId: '',
        reason: '',
        documentUrl: '',
        documentName: '',
      }));
      toast.success('Leave request recorded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to create leave request');
    }
  };

  const review = async (id: string, nextStatus: 'approved' | 'rejected') => {
    const notes = prompt(`Review notes for ${nextStatus}:`) ?? undefined;
    try {
      await reviewMutation.mutateAsync({ id, status: nextStatus, reviewNotes: notes });
      toast.success(`Leave request ${nextStatus}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to review leave request');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl leading-8 font-bold tracking-tight text-slate-950">
          Attendance Leave & Medical Excuses
        </h1>
        <p className="text-sm leading-5 text-slate-600">
          Record supporting documents and distinguish approved leave from unexcused absence.
        </p>
      </div>

      {canCreate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg leading-7">New Leave Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-3 lg:grid-cols-4">
              <Select
                value={branchId}
                onChange={(event) => {
                  setBranchId(event.target.value);
                  setForm((value) => ({ ...value, enrollmentId: '' }));
                }}
              >
                <option value="">Select Branch</option>
                {(branchesData?.data ?? []).map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.branchNameEn}
                  </option>
                ))}
              </Select>
              <Select
                value={form.enrollmentId}
                onChange={(event) =>
                  setForm((value) => ({ ...value, enrollmentId: event.target.value }))
                }
              >
                <option value="">Select Active Student Enrollment</option>
                {enrollments.map((enrollment) => (
                  <option key={enrollment._id} value={enrollment._id}>
                    {enrollment.studentId.studentId} - {enrollment.studentId.khmerName} (
                    {enrollment.classId.className})
                  </option>
                ))}
              </Select>
              <Select
                value={form.leaveType}
                onChange={(event) =>
                  setForm((value) => ({
                    ...value,
                    leaveType: event.target.value as AttendanceLeaveType,
                  }))
                }
              >
                <option value="medical">Medical</option>
                <option value="family">Family</option>
                <option value="personal">Personal</option>
                <option value="school_activity">School Activity</option>
                <option value="other">Other</option>
              </Select>
              <Input
                placeholder="Document name"
                value={form.documentName}
                onChange={(event) =>
                  setForm((value) => ({ ...value, documentName: event.target.value }))
                }
              />
              <Input
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm((value) => ({ ...value, startDate: event.target.value }))
                }
              />
              <Input
                type="date"
                value={form.endDate}
                onChange={(event) =>
                  setForm((value) => ({ ...value, endDate: event.target.value }))
                }
              />
              <Input
                className="lg:col-span-2"
                placeholder="Supporting document URL"
                value={form.documentUrl}
                onChange={(event) =>
                  setForm((value) => ({ ...value, documentUrl: event.target.value }))
                }
              />
              <Textarea
                className="lg:col-span-3"
                placeholder="Reason and medical details"
                value={form.reason}
                onChange={(event) => setForm((value) => ({ ...value, reason: event.target.value }))}
              />
              <Button type="submit" disabled={createMutation.isPending}>
                <Plus className="mr-1 size-4" />
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-lg leading-7">Leave Register</CardTitle>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value as AttendanceLeaveStatus | '')}
            className="w-44"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Type / Evidence</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center">
                      Loading leave records...
                    </TableCell>
                  </TableRow>
                ) : (data?.data ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-slate-500">
                      No leave requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  (data?.data ?? []).map((item) => {
                    const student = typeof item.studentId === 'object' ? item.studentId : undefined;
                    const classItem = typeof item.classId === 'object' ? item.classId : undefined;
                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <p className="text-sm leading-5 font-semibold">
                            {student?.khmerName ?? '-'}
                          </p>
                          <p className="text-xs leading-4 text-slate-500">{student?.studentId}</p>
                        </TableCell>
                        <TableCell className="text-sm">{classItem?.className ?? '-'}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {new Date(item.startDate).toLocaleDateString()} -{' '}
                          {new Date(item.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <p className="text-sm capitalize">{item.leaveType.replace('_', ' ')}</p>
                          {item.documentUrl && (
                            <a
                              href={item.documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-700"
                            >
                              <FileCheck2 className="size-3.5" />
                              {item.documentName || 'Evidence'}
                            </a>
                          )}
                        </TableCell>
                        <TableCell className="max-w-64 text-sm leading-5">{item.reason}</TableCell>
                        <TableCell>
                          <Badge
                            tone={
                              item.status === 'approved'
                                ? 'success'
                                : item.status === 'rejected'
                                  ? 'danger'
                                  : item.status === 'pending'
                                    ? 'warning'
                                    : 'neutral'
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {canReview && item.status === 'pending' ? (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" onClick={() => void review(item._id, 'approved')}>
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => void review(item._id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">Reviewed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
