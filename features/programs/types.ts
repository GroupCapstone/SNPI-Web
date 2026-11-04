export interface Program {
  _id: string;
  code: string;
  nameKh: string;
  nameEn: string;
  shortName?: string;
  branchAvailability?: 'all' | string[];
  displayOrder?: number;
  description?: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ProgramFilters {
  search?: string;
  branchId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
