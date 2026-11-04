export type RoleStatus = 'active' | 'inactive';

export interface Role {
  _id: string;
  code: string;
  nameEn: string;
  nameKh?: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
  status: RoleStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoleFilters {
  search?: string;
  status?: RoleStatus;
  isSystem?: boolean;
  page?: number;
  limit?: number;
}

export interface PermissionItem {
  code: string;
  module: string;
  action: string;
  scope: 'own_branch' | 'all_branches';
  nameEn: string;
  nameKh?: string;
  description: string;
}

export interface GroupedPermissionItem {
  module: string;
  moduleName: string;
  permissions: PermissionItem[];
}
