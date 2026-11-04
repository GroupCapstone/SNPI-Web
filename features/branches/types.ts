export interface Branch {
  _id: string;
  schoolId: { _id: string; code: string; nameEn: string; nameKh: string } | string;
  branchCode: string;
  branchNameKh: string;
  branchNameEn: string;
  address?: string;
  phone?: string;
  email?: string;
  managerId?: string;
  openingDate?: string;
  status: 'active' | 'inactive' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface BranchFilters {
  search?: string;
  schoolId?: string;
  status?: 'active' | 'inactive' | 'closed';
  page?: number;
  limit?: number;
}
