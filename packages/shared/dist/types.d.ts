export type PermissionScope = 'own_record' | 'assigned_class' | 'assigned_subject' | 'own_department' | 'selected_departments' | 'own_branch' | 'selected_branches' | 'all_branches';
export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'submit' | 'review' | 'finalize' | 'export' | 'print' | 'void' | 'manage' | 'verify';
export type PermissionCode = string;
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}
export interface ApiPaginatedResponse<T> {
    success: true;
    message: string;
    data: T[];
    pagination: PaginationMeta;
}
export interface ApiErrorResponse {
    success: false;
    message: string;
    code: string;
    errors?: Array<{
        field?: string;
        message: string;
    }>;
}
export type SuccessResponse<T> = ApiSuccessResponse<T>;
export type PaginatedResponse<T> = ApiPaginatedResponse<T>;
