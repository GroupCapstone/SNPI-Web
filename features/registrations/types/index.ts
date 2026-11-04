export type RegistrationStatus =
  | 'draft'
  | 'registered'
  | 'placement_pending'
  | 'placement_completed'
  | 'enrollment_pending'
  | 'enrolled'
  | 'cancelled';

export interface Registration {
  _id: string;
  registrationNumber: string;
  schoolId: {
    _id: string;
    nameEn: string;
    nameKh?: string;
    code: string;
  };
  branchId: {
    _id: string;
    branchNameEn: string;
    branchNameKh?: string;
    branchCode: string;
  };
  academicYearId: {
    _id: string;
    name: string;
    code: string;
    isCurrent: boolean;
  };
  programId: {
    _id: string;
    nameEn: string;
    nameKh?: string;
    code: string;
  };
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phone: string;
  email?: string;
  address?: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  status: RegistrationStatus;
  registrationDate: string;
  remarks?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistrationPayload {
  registrationNumber?: string;
  schoolId: string;
  branchId: string;
  academicYearId: string;
  programId: string;
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  phone: string;
  email?: string;
  address?: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  status?: RegistrationStatus;
  registrationDate?: string;
  remarks?: string;
}

export type UpdateRegistrationPayload = Partial<CreateRegistrationPayload>;

export interface RegistrationQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  schoolId?: string;
  branchId?: string;
  academicYearId?: string;
  programId?: string;
  status?: RegistrationStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
