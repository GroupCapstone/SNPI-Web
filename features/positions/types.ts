export interface Position {
  _id: string;
  schoolId: { _id: string; code: string; nameEn: string; nameKh: string } | string;
  branchId:
    { _id: string; branchCode: string; branchNameEn: string; branchNameKh: string } | string;
  departmentId: { _id: string; code: string; nameEn: string; nameKh: string } | string;
  code: string;
  nameKh: string;
  nameEn: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PositionFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  departmentId?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}
