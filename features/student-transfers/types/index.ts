export type StudentTransferStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface StudentTransfer {
  _id: string;
  transferNumber: string;
  studentId: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    phone: string;
  };
  fromSchoolId: {
    _id: string;
    nameEn: string;
    code: string;
  };
  toSchoolId: {
    _id: string;
    nameEn: string;
    code: string;
  };
  fromBranchId: {
    _id: string;
    branchNameEn: string;
    branchCode: string;
  };
  toBranchId: {
    _id: string;
    branchNameEn: string;
    branchCode: string;
  };
  fromClassId?: {
    _id: string;
    className: string;
    classCode: string;
  };
  toClassId?: {
    _id: string;
    className: string;
    classCode: string;
  };
  transferDate: string;
  reason: string;
  status: StudentTransferStatus;
  approvalDate?: string;
  approvedBy?: {
    _id: string;
    username: string;
    email: string;
  };
  remarks?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentTransferPayload {
  transferNumber?: string;
  studentId: string;
  fromSchoolId: string;
  toSchoolId: string;
  fromBranchId: string;
  toBranchId: string;
  fromClassId?: string;
  toClassId?: string;
  transferDate?: string;
  reason: string;
  remarks?: string;
}

export interface ProcessTransferPayload {
  status: 'approved' | 'rejected' | 'completed' | 'cancelled';
  toClassId?: string;
  remarks?: string;
}

export interface StudentTransferQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
  fromBranchId?: string;
  toBranchId?: string;
  status?: StudentTransferStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
