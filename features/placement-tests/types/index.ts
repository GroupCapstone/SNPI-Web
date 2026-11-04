export type PlacementTestStatus = 'scheduled' | 'completed' | 'passed' | 'failed';

export interface PlacementTest {
  _id: string;
  testNumber: string;
  registrationId?: {
    _id: string;
    registrationNumber: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    phone: string;
    status: string;
  };
  studentId?: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    phone: string;
  };
  studentName: string;
  schoolId: {
    _id: string;
    nameEn: string;
    code: string;
  };
  branchId: {
    _id: string;
    branchNameEn: string;
    branchCode: string;
  };
  programId: {
    _id: string;
    nameEn: string;
    code: string;
  };
  recommendedLevelId: {
    _id: string;
    name: string;
    code: string;
    sequence: number;
  };
  testDate: string;
  score: number;
  maxScore: number;
  examinerName?: string;
  status: PlacementTestStatus;
  comments?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlacementTestPayload {
  testNumber?: string;
  registrationId?: string;
  studentId?: string;
  studentName: string;
  schoolId: string;
  branchId: string;
  programId: string;
  recommendedLevelId: string;
  testDate?: string;
  score: number;
  maxScore?: number;
  examinerName?: string;
  status?: PlacementTestStatus;
  comments?: string;
}

export type UpdatePlacementTestPayload = Partial<CreatePlacementTestPayload>;

export interface PlacementTestQueryFilters {
  page?: number;
  limit?: number;
  search?: string;
  registrationId?: string;
  studentId?: string;
  schoolId?: string;
  branchId?: string;
  programId?: string;
  recommendedLevelId?: string;
  status?: PlacementTestStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
