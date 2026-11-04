import type { PermissionCode, PermissionScope } from './types';
export interface PermissionDefinition {
    code: PermissionCode;
    module: string;
    action: string;
    scope: PermissionScope;
    nameEn: string;
    nameKh?: string;
    description: string;
}
export declare const SYSTEM_PERMISSIONS: PermissionDefinition[];
export declare const ALL_PERMISSION_CODES: PermissionCode[];
export interface CoreRoleDefinition {
    code: string;
    nameEn: string;
    nameKh: string;
    description: string;
    permissions: string[];
    isSystem: boolean;
}
export declare const DEFAULT_CORE_ROLES: CoreRoleDefinition[];
export declare const IMPLIED_SCOPES: Record<string, ReadonlySet<string>>;
/**
 * Checks whether user permissions and roles satisfy the required permission
 * with action inheritance (manage/edit -> view) and scope hierarchy.
 */
export declare function checkUserPermission(userPermissions: string[] | ReadonlySet<string>, requiredPermission: string, _userRoles?: string[]): boolean;
