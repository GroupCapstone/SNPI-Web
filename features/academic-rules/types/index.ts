export type AcademicRuleType =
  'grade_scheme' | 'assessment_scheme' | 'attendance_threshold' | 'promotion_rule';

export type AcademicRuleStatus = 'draft' | 'active' | 'archived';

export interface GradeBand {
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  minimum: number;
  gpa: number;
  labelKh?: string;
}

export interface GradeSchemeConfig {
  bands: GradeBand[];
}

export interface AssessmentSchemeConfig {
  requirePublishedAssessments: boolean;
}

export interface AttendanceThresholdConfig {
  minimumAttendanceRate: number;
}

export interface PromotionRuleConfig {
  passingAverage: number;
  minimumAttendanceRate: number;
}

export interface AcademicRuleItem {
  _id: string;
  ruleType: AcademicRuleType;
  code: string;
  name: string;
  version: number;
  effectiveFrom: string;
  effectiveTo?: string;
  schoolId: string | { _id: string; nameEn: string; nameKh?: string };
  branchId?:
    string | { _id: string; branchNameEn: string; branchNameKh?: string; branchCode: string };
  academicYearId?: string | { _id: string; name: string };
  academicPeriodId?: string | { _id: string; name: string };
  programId?: string | { _id: string; nameEn: string; nameKh?: string; code: string };
  levelId?: string | { _id: string; name: string };
  config: Record<string, unknown>;
  status: AcademicRuleStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicRuleFilters {
  ruleType?: AcademicRuleType;
  status?: AcademicRuleStatus;
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  programId?: string;
  levelId?: string;
  page?: number;
  limit?: number;
}

export interface CreateAcademicRuleDto {
  ruleType: AcademicRuleType;
  code: string;
  name: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  schoolId: string;
  branchId?: string;
  academicYearId?: string;
  academicPeriodId?: string;
  programId?: string;
  levelId?: string;
  config: Record<string, unknown>;
  status?: AcademicRuleStatus;
}

export interface UpdateAcademicRuleDto {
  name?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
  config?: Record<string, unknown>;
  status?: AcademicRuleStatus;
}
