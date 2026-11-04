export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export type SkillCategory =
  | 'pedagogy'
  | 'technical'
  | 'leadership'
  | 'administration'
  | 'communication'
  | 'language'
  | 'domain'
  | 'general';

export type EmployeeSkillStatus = 'pending' | 'verified' | 'expired' | 'rejected';

export interface Skill {
  _id: string;
  code: string;
  name: string;
  category: SkillCategory;
  description?: string;
  isActive: boolean;
  schoolId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RoleSkillRequirement {
  _id: string;
  roleId: string | { _id: string; code: string; nameEn: string; nameKh?: string };
  skillId: Skill;
  requiredLevel: ProficiencyLevel;
  isRequired: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeSkill {
  _id: string;
  employeeId:
    | string
    | {
        _id: string;
        employeeId: string;
        firstName: string;
        lastName: string;
        email?: string;
        branchId?: { _id: string; branchCode: string; branchNameEn: string };
        departmentId?: { _id: string; code: string; nameEn: string };
        positionId?: { _id: string; code: string; titleEn: string };
      };
  skillId: Skill;
  proficiencyLevel: ProficiencyLevel;
  yearsExperience?: number;
  evidenceDocument?: string;
  evidenceUrl?: string;
  verifiedBy?: { _id: string; username: string; email: string };
  verifiedAt?: string | null;
  expiryDate?: string | null;
  status: EmployeeSkillStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillFilters {
  search?: string;
  category?: SkillCategory;
  isActive?: boolean;
  schoolId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface RoleSkillRequirementFilters {
  roleId?: string;
  skillId?: string;
  isRequired?: boolean;
  page?: number;
  limit?: number;
}

export interface EmployeeSkillFilters {
  employeeId?: string;
  skillId?: string;
  status?: EmployeeSkillStatus;
  branchId?: string;
  departmentId?: string;
  page?: number;
  limit?: number;
}

export interface SkillGapItem {
  skillId: string;
  skillCode: string;
  skillName: string;
  category: SkillCategory;
  requiredLevel: ProficiencyLevel;
  isRequired: boolean;
  employeeLevel: number;
  yearsExperience?: number;
  status: 'met' | 'exceeded' | 'gap' | 'missing';
  gapSize: number;
  isVerified: boolean;
  evidenceUrl?: string;
  expiryDate?: string | null;
}

export interface EmployeeSkillGapAnalysis {
  employeeId: string;
  employeeCode?: string;
  employeeName: string;
  branchId?: string;
  branchName?: string;
  departmentId?: string;
  departmentName?: string;
  targetRole: {
    roleId: string;
    roleCode: string;
    roleName: string;
  };
  totalRequiredSkills: number;
  totalAcquiredSkills: number;
  totalGaps: number;
  matchPercentage: number;
  competencyScore: number;
  skills: SkillGapItem[];
}

export interface ConsolidatedSkillGapReportFilters {
  branchId?: string;
  departmentId?: string;
  roleId?: string;
  employeeId?: string;
  hasGapOnly?: boolean;
  category?: SkillCategory;
  page?: number;
  limit?: number;
}

export interface ConsolidatedSkillGapSummary {
  totalEmployeesEvaluated: number;
  averageMatchPercentage: number;
  topGapSkills: Array<{
    skillId: string;
    skillCode: string;
    skillName: string;
    category: SkillCategory;
    gapCount: number;
    averageRequiredLevel: number;
    averageCurrentLevel: number;
  }>;
  employees: EmployeeSkillGapAnalysis[];
}
