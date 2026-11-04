export interface AcademicYear {
  _id: string;
  schoolId?: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'active' | 'inactive' | 'closed';
  createdAt?: string;
  updatedAt?: string;
}

export interface AcademicYearFilters {
  search?: string;
  status?: string;
  schoolId?: string;
  isCurrent?: boolean;
}

export interface AcademicYearPayload {
  schoolId?: string;
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  status: 'active' | 'inactive' | 'closed';
}
