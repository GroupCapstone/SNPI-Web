export type EmployeeGender = 'male' | 'female' | 'other';
export type EmploymentType =
  'full_time' | 'part_time' | 'contract' | 'intern' | 'temporary' | 'probation';
export type EmployeeStatus =
  'active' | 'inactive' | 'on_leave' | 'suspended' | 'resigned' | 'terminated';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EducationLevel =
  'high_school' | 'associate' | 'bachelor' | 'master' | 'doctorate' | 'other';

export interface PopulatedEntity {
  _id: string;
  code?: string;
  branchCode?: string;
  nameEn?: string;
  nameKh?: string;
  branchNameEn?: string;
  branchNameKh?: string;
}

export interface Birthplace {
  province?: string;
  district?: string;
  commune?: string;
  village?: string;
}

export interface CurrentAddress {
  province?: string;
  district?: string;
  commune?: string;
  village?: string;
  additionalAddress?: string;
}

export interface FamilyMember {
  name?: string;
  age?: number;
  nationality?: string;
  ethnicity?: string;
  livingStatus?: 'living' | 'deceased';
  occupation?: string;
}

export interface EmployeeDocument {
  _id?: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt?: string;
  uploadedBy?: string;
  description?: string;
  status: 'active' | 'archived';
}

export interface Employee {
  _id: string;
  employeeId: string;
  legacyEmployeeNumber?: string;
  schoolId: string | PopulatedEntity;
  branchId: string | PopulatedEntity;
  departmentId: string | PopulatedEntity;
  positionId: string | PopulatedEntity;

  // Personal
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: EmployeeGender;
  dateOfBirth: string;
  nationality?: string;
  ethnicity?: string;
  nationalIdNumber?: string;
  photo?: string;
  maritalStatus?: MaritalStatus;
  numberOfChildren?: number;

  // Addresses
  birthplace?: Birthplace;
  currentAddress?: CurrentAddress;
  address?: string;

  // Contact
  phone?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  email?: string;

  // Education & Skills
  educationLevel?: EducationLevel;
  major?: string;
  foreignLanguages?: string[];
  otherSkills?: string[];
  workExperienceSummary?: string;

  // Family
  father?: FamilyMember;
  mother?: FamilyMember;

  // Documents
  documents?: EmployeeDocument[];

  // Employment
  employmentType: EmploymentType;
  joiningDate: string;
  status: EmployeeStatus;

  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilters {
  search?: string;
  schoolId?: string;
  branchId?: string;
  departmentId?: string;
  positionId?: string;
  status?: EmployeeStatus;
  employmentType?: EmploymentType;
  educationLevel?: EducationLevel;
  gender?: EmployeeGender;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
