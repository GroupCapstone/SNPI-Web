export type AttendanceStatus =
  'present' | 'absent' | 'late' | 'excused' | 'permission' | 'half_day' | 'sick';

export interface AttendanceRecordItem {
  studentId: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    gender: string;
  };
  status: AttendanceStatus;
  remarks?: string;
}

export interface Attendance {
  _id: string;
  schoolId: {
    _id: string;
    nameEn: string;
    code: string;
  };
  branchId: {
    _id: string;
    branchNameEn: string;
    branchCode: string;
  };
  academicYearId: {
    _id: string;
    name: string;
    code: string;
    isCurrent: boolean;
  };
  classId: {
    _id: string;
    className: string;
    classCode: string;
    shift: string;
  };
  date: string;
  takenBy: {
    _id: string;
    username: string;
    email: string;
  };
  records: AttendanceRecordItem[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RosterStudentItem {
  studentId: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: string;
  status: AttendanceStatus;
  remarks: string;
}

export interface ClassRosterAttendanceResponse {
  existingRecord: Attendance | null;
  roster: RosterStudentItem[];
}

export interface MarkAttendancePayload {
  schoolId: string;
  branchId: string;
  academicYearId: string;
  academicPeriodId?: string;
  classId: string;
  date: string;
  records: Array<{
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }>;
}

export interface AttendanceQueryFilters {
  page?: number;
  limit?: number;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  classId?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  studentId?: string;
  status?: AttendanceStatus;
}
