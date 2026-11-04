export interface School {
  _id: string;
  code: string;
  nameEn: string;
  nameKh: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface SchoolFilters {
  search?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}
