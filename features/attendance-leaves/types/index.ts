export type AttendanceLeaveType = 'medical' | 'family' | 'personal' | 'school_activity' | 'other';
export type AttendanceLeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface AttendanceLeave {
  _id: string;
  branchId:
    string | { _id: string; branchCode: string; branchNameEn: string; branchNameKh?: string };
  studentId:
    | string
    | { _id: string; studentId: string; firstName: string; lastName: string; khmerName: string };
  enrollmentId: string;
  classId: string | { _id: string; classCode: string; className: string };
  leaveType: AttendanceLeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  documentUrl?: string;
  documentName?: string;
  status: AttendanceLeaveStatus;
  reviewNotes?: string;
  createdAt: string;
}

export interface AttendanceLeaveFilters {
  branchId?: string;
  studentId?: string;
  classId?: string;
  status?: AttendanceLeaveStatus;
  leaveType?: AttendanceLeaveType;
  page?: number;
  limit?: number;
}

export interface CreateAttendanceLeaveInput {
  branchId: string;
  studentId: string;
  enrollmentId: string;
  classId: string;
  leaveType: AttendanceLeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  documentUrl?: string;
  documentName?: string;
}
