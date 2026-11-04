export interface PopulatedSchool {
  _id: string;
  code: string;
  nameEn: string;
  nameKh?: string;
}

export interface PopulatedEmployee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  khmerName?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  schoolId: PopulatedSchool | string;
  employeeId?: PopulatedEmployee | string;
  roles: string[];
  permissions: string[];
  branchAccess: 'all' | string[];
  departmentAccess: 'all' | string[];
  assignedClasses: string[];
  assignedSubjects: string[];
  defaultBranch: string | null;
  isSuperAdmin: boolean;
  status: string;
  lastLoginAt?: string;
  mustChangePassword: boolean;
}

export interface LoginResponseData {
  user: AuthUser;
  accessToken: string;
}

export interface AuthApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
