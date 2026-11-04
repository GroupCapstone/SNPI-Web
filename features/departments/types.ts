export interface Department {
  _id: string;
  schoolId: { _id: string; code: string; nameEn: string; nameKh: string } | string;
  branchId:
    { _id: string; branchCode: string; branchNameEn: string; branchNameKh: string } | string;
  code: string;
  nameKh: string;
  nameEn: string;
  description?: string;
  managerId?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}
