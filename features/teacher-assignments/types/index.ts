export type TeacherRoleInClass = 'primary_teacher' | 'assistant_teacher' | 'subject_teacher';
export type TeacherAssignmentStatus = 'active' | 'inactive';

export interface TeacherAssignment {
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
  employeeId: {
    _id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    phone: string;
    email: string;
  };
  classId: {
    _id: string;
    className: string;
    classCode: string;
    shift: string;
  };
  subjectId?: {
    _id: string;
    name?: string;
    nameEn?: string;
    nameKh?: string;
    code: string;
  };
  roleInClass: TeacherRoleInClass;
  status: TeacherAssignmentStatus;
  startDate: string;
  endDate?: string;
  remarks?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherAssignmentPayload {
  schoolId: string;
  branchId: string;
  academicYearId: string;
  employeeId: string;
  classId: string;
  subjectId?: string;
  roleInClass: TeacherRoleInClass;
  status?: TeacherAssignmentStatus;
  startDate?: string;
  endDate?: string;
  remarks?: string;
}

export type UpdateTeacherAssignmentPayload = Partial<CreateTeacherAssignmentPayload>;

export interface TeacherAssignmentQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  employeeId?: string;
  classId?: string;
  subjectId?: string;
  roleInClass?: TeacherRoleInClass | string;
  status?: TeacherAssignmentStatus | string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TeacherRosterFilters {
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  employeeId?: string;
  search?: string;
}

export interface TeacherRosterStudentItem {
  enrollmentId: string;
  studentId: string;
  studentCode: string;
  firstName: string;
  lastName: string;
  khmerName?: string;
  gender: string;
  dateOfBirth?: string;
  photo?: string;
  guardianName?: string;
  guardianPhone?: string;
  tuitionStatus?: string;
  status: string;
  attendanceRate?: number;
}

export interface TeacherRosterClassItem {
  assignmentId: string;
  classId: string;
  classCode: string;
  className: string;
  roleInClass: TeacherRoleInClass;
  program?: { _id: string; code: string; nameEn: string; nameKh?: string };
  level?: { _id: string; code: string; name: string };
  subject?: { _id: string; code: string; nameEn: string; nameKh?: string };
  classroom?: { _id: string; code: string; name: string; building?: string };
  shift?: string;
  daysPattern?: string;
  startTime?: string;
  endTime?: string;
  capacity: number;
  totalStudents: number;
  students: TeacherRosterStudentItem[];
}

export interface TeacherRosterFacultyItem {
  teacher: {
    _id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    khmerName?: string;
    gender?: string;
    phone?: string;
    email?: string;
    photo?: string;
    department?: { _id: string; departmentNameEn: string; departmentNameKh?: string };
    position?: { _id: string; positionNameEn: string; positionNameKh?: string };
    branch?: { _id: string; branchCode: string; branchNameEn: string; branchNameKh?: string };
  };
  totalAssignedClasses: number;
  totalStudents: number;
  classes: TeacherRosterClassItem[];
}

export interface TeacherRosterUnassignedClassItem {
  _id: string;
  classCode: string;
  className: string;
  program?: { code: string; nameEn: string };
  level?: { code: string; name: string };
  branch?: { branchCode: string; branchNameEn: string };
  capacity: number;
  currentEnrollmentCount: number;
  shift?: string;
}

export interface TeacherRosterMatrixResponse {
  summary: {
    totalTeachers: number;
    assignedClassesCount: number;
    unassignedClassesCount: number;
    totalStudents: number;
  };
  faculty: TeacherRosterFacultyItem[];
  unassignedClasses: TeacherRosterUnassignedClassItem[];
}
