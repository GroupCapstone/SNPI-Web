export type StudentGender = 'male' | 'female' | 'other';
export type StudentStatus =
  'active' | 'inactive' | 'suspended' | 'graduated' | 'withdrawn' | 'transferred';
export type GuardianRelationship = 'father' | 'mother' | 'guardian' | 'other';

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
  street?: string;
  houseNumber?: string;
  sameAsBirthplace?: boolean;
}

export interface Guardian {
  fullName: string;
  khmerName?: string;
  relationship: GuardianRelationship;
  phone: string;
  alternatePhone?: string;
  email?: string;
  occupation?: string;
  address?: string;
  isPrimary: boolean;
  isEmergencyContact: boolean;
}

export interface Student {
  _id: string;
  studentId: string;
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
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: StudentGender;
  dateOfBirth: string;
  placeOfBirth?: string;
  birthplace?: Birthplace;
  nationality?: string;
  phone?: string;
  email?: string;
  address?: string;
  currentAddress?: CurrentAddress;
  photo?: string;
  nationalId?: string;
  admissionDate: string;
  status: StudentStatus;
  guardians: Guardian[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentPayload {
  studentId?: string;
  schoolId: string;
  branchId: string;
  firstName: string;
  lastName: string;
  khmerName: string;
  gender: StudentGender;
  dateOfBirth: string;
  placeOfBirth?: string;
  birthplace?: Birthplace;
  nationality?: string;
  phone?: string;
  email?: string;
  address?: string;
  currentAddress?: CurrentAddress;
  photo?: string;
  nationalId?: string;
  admissionDate?: string;
  status?: StudentStatus;
  guardians?: Guardian[];
}

export type UpdateStudentPayload = Partial<CreateStudentPayload>;

export interface StudentQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: string;
  schoolId?: string;
  status?: StudentStatus;
  gender?: StudentGender;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DuplicateCheckCriteria {
  khmerName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  phone?: string;
  guardianPhone?: string;
  excludeId?: string;
}

export interface DuplicateMatchItem {
  studentId: string;
  khmerName: string;
  fullNameEn: string;
  gender: string;
  dateOfBirth: string;
  phone?: string;
  branchName?: string;
  matchReasons: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface DuplicateCheckResponse {
  hasDuplicate: boolean;
  matches: DuplicateMatchItem[];
}

export interface RawImportStudentRow {
  rowNumber?: number;
  khmerName: string;
  firstName?: string;
  lastName?: string;
  englishName?: string;
  gender?: string;
  dateOfBirth?: string | number | Date;
  phone?: string;
  email?: string;
  birthplaceProvince?: string;
  birthplaceDistrict?: string;
  birthplaceCommune?: string;
  birthplaceVillage?: string;
  currentProvince?: string;
  currentDistrict?: string;
  currentCommune?: string;
  currentVillage?: string;
  address?: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianPhone?: string;
  guardianOccupation?: string;
  admissionDate?: string | number | Date;
  notes?: string;
}

export interface NormalizedImportStudent {
  rowNumber: number;
  khmerName: string;
  firstName: string;
  lastName: string;
  gender: StudentGender;
  dateOfBirth: string;
  phone?: string;
  email?: string;
  birthplace: Birthplace;
  currentAddress: CurrentAddress;
  guardians: Guardian[];
  admissionDate: string;
  status: StudentStatus;
  validationStatus: 'valid' | 'warning' | 'error' | 'duplicate';
  issues: Array<{ field: string; message: string; severity: 'error' | 'warning' | 'info' }>;
  duplicateMatch?: DuplicateMatchItem;
}

export interface ImportPreviewResponse {
  totalRows: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  duplicateCount: number;
  rows: NormalizedImportStudent[];
}

export interface ConfirmImportPayload {
  schoolId: string;
  branchId: string;
  rows: Array<Omit<CreateStudentPayload, 'schoolId' | 'branchId'>>;
  skipDuplicates?: boolean;
}

export interface ConfirmImportResponse {
  totalProcessed: number;
  importedCount: number;
  skippedCount: number;
  errors: Array<{ rowNumber?: number; studentName?: string; reason: string }>;
  createdStudents: Array<{
    id: string;
    studentId: string;
    khmerName: string;
  }>;
}
