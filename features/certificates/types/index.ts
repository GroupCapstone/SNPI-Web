export interface CertificateStudentInfo {
  id: string;
  studentId: string;
  name: string;
  khmerName?: string;
}

export interface CertificateAcademicInfo {
  program: string;
  programKh?: string;
  level: string;
  academicYear: string;
  period: string;
  className: string;
  classCode: string;
}

export interface CertificatePayload {
  student: CertificateStudentInfo;
  academic: CertificateAcademicInfo;
  completionDate?: string;
  summary: {
    total: number;
    average: number;
    gpa: number;
    grade: string;
    result: string;
    promotion: string;
  };
  verification: {
    code: string;
    path: string;
  };
  school?: {
    nameEn: string;
    nameKh?: string;
    address?: unknown;
    phone?: string;
  };
}

export interface CertificateItem {
  _id: string;
  type: 'certificate';
  documentNumber: string;
  schoolId: string;
  branchId: string;
  studentId: string;
  sourceId: string;
  payload: CertificatePayload;
  status: 'active' | 'voided';
  generatedAt: string;
  createdAt: string;
}

export interface CertificateFilters {
  branchId?: string;
  studentId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
