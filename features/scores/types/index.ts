export type LetterGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface ScoreItem {
  _id: string;
  schoolId: string;
  branchId: string;
  academicYearId: string;
  classId: string;
  subjectId: string;
  assessmentId: {
    _id: string;
    name: string;
    code: string;
    maxScore: number;
    passingScore: number;
  };
  studentId: {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    khmerName: string;
    gender: string;
  };
  scoreObtained: number;
  percentage: number;
  letterGrade: LetterGrade;
  isAbsent: boolean;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScoreFilters {
  assessmentId?: string;
  classId?: string;
  subjectId?: string;
  studentId?: string;
  academicYearId?: string;
  branchId?: string;
  page?: number;
  limit?: number;
}

export interface BatchScorePayload {
  assessmentId: string;
  scores: Array<{
    studentId: string;
    scoreObtained: number;
    isAbsent?: boolean;
    remarks?: string;
  }>;
}
