export type AuditAction =
  | 'LOGIN'
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'LOGOUT'
  | 'PASSWORD_CHANGED'
  | 'PASSWORD_RESET'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'ACTIVATE'
  | 'DEACTIVATE'
  | 'USER_ACTIVATED'
  | 'USER_DEACTIVATED'
  | 'ROLE_ASSIGN'
  | 'ROLE_ASSIGNED'
  | 'ROLE_REMOVED'
  | 'BRANCH_ACCESS_CHANGED'
  | 'DEPARTMENT_ACCESS_CHANGED'
  | 'PERMISSION_CHANGE'
  | 'WORKFLOW_TRANSITION'
  | 'FINALIZE'
  | 'UNLOCK'
  | 'RELOCK'
  | 'ARCHIVE';

export interface AuditLogUser {
  _id: string;
  username: string;
  email: string;
  employeeId?: string;
}

export interface AuditLogBranch {
  _id: string;
  branchCode: string;
  branchNameEn: string;
  branchNameKh?: string;
}

export interface AuditLog {
  _id: string;
  userId?: string;
  schoolId?: string;
  branchId?: string;
  module: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  changedFields?: string[];
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  user?: AuditLogUser;
  branch?: AuditLogBranch;
}

export interface AuditLogFilters {
  search?: string;
  module?: string;
  action?: AuditAction;
  entityType?: string;
  entityId?: string;
  userId?: string;
  schoolId?: string;
  branchId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
