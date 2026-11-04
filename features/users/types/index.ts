export type UserStatus = 'active' | 'inactive' | 'locked';

export interface UserPopulatedSchool {
  _id: string;
  code: string;
  nameEn: string;
  nameKh?: string;
}

export interface UserPopulatedEmployee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  khmerName?: string;
}

export interface User {
  _id: string;
  schoolId: string | UserPopulatedSchool;
  employeeId?: string | UserPopulatedEmployee;
  username: string;
  email: string;
  roles: string[];
  branchAccess: 'all' | string[];
  departmentAccess?: 'all' | string[];
  status: UserStatus;
  lastLoginAt?: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  role?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export interface AdminResetPasswordDto {
  temporaryPassword?: string;
}

export interface AdminResetPasswordResponse {
  message: string;
  temporaryPassword: string;
  mustChangePassword: boolean;
}
