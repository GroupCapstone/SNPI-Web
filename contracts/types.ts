export type PermissionScope =
  | 'own_record'
  | 'assigned_class'
  | 'assigned_subject'
  | 'own_department'
  | 'selected_departments'
  | 'own_branch'
  | 'selected_branches'
  | 'all_branches';

export type PermissionAction =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'submit'
  | 'review'
  | 'finalize'
  | 'export'
  | 'print'
  | 'void'
  | 'manage'
  | 'verify';

export type PermissionCode = string;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore?: boolean;
  nextCursor?: string | null;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: PaginationMeta;
  pagination?: PaginationMeta;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T[];
  message?: string;
  meta?: PaginationMeta;
  pagination: PaginationMeta;
}

export interface ProblemDetailsError {
  field?: string;
  message: string;
}

/**
 * RFC 7807 Problem Details object structure (application/problem+json)
 */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  code?: string;
  timestamp?: string;
  requestId?: string;
  errors?: ProblemDetailsError[];
  [key: string]: unknown;
}

export interface ApiErrorResponse {
  success?: false;
  message?: string;
  code?: string;
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  timestamp?: string;
  requestId?: string;
  errors?: ProblemDetailsError[];
}

export type SuccessResponse<T> = ApiSuccessResponse<T>;
export type PaginatedResponse<T> = ApiPaginatedResponse<T>;
