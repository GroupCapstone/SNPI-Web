import { apiClient } from '@/lib/api-client';
import type { ApiPaginatedResponse, ApiSuccessResponse } from '@/types/api';
import type {
  ConsolidatedSkillGapReportFilters,
  ConsolidatedSkillGapSummary,
  EmployeeSkill,
  EmployeeSkillFilters,
  EmployeeSkillGapAnalysis,
  RoleSkillRequirement,
  RoleSkillRequirementFilters,
  Skill,
  SkillFilters,
} from '../types';

export interface SkillPayload {
  code: string;
  name: string;
  category: string;
  description?: string;
  isActive?: boolean;
  schoolId?: string;
}

export interface RoleSkillRequirementPayload {
  roleId: string;
  skillId: string;
  requiredLevel: number;
  isRequired?: boolean;
  notes?: string;
}

export interface EmployeeSkillPayload {
  employeeId: string;
  skillId: string;
  proficiencyLevel: number;
  yearsExperience?: number;
  evidenceDocument?: string;
  evidenceUrl?: string;
  expiryDate?: string | null;
  notes?: string;
}

// --- SKILL CATALOG ---
export const getSkills = async (filters: SkillFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.category) params.append('category', filters.category);
  if (filters.isActive !== undefined) params.append('isActive', String(filters.isActive));
  if (filters.schoolId) params.append('schoolId', filters.schoolId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));
  if (filters.sortBy) params.append('sortBy', filters.sortBy);
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

  const queryString = params.toString();
  const url = `/skills${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<Skill>>(url);
};

export const getSkillById = async (id: string) => {
  return apiClient.get<ApiSuccessResponse<Skill>>(`/skills/${id}`);
};

export const createSkill = async (data: SkillPayload) => {
  return apiClient.post<ApiSuccessResponse<Skill>>('/skills', data);
};

export const updateSkill = async (id: string, data: Partial<SkillPayload>) => {
  return apiClient.patch<ApiSuccessResponse<Skill>>(`/skills/${id}`, data);
};

export const deleteSkill = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/skills/${id}`);
};

// --- ROLE SKILL REQUIREMENTS ---
export const getRoleRequirementsByRole = async (roleId: string) => {
  return apiClient.get<ApiSuccessResponse<RoleSkillRequirement[]>>(
    `/skills/role-requirements/${roleId}`,
  );
};

export const getRoleRequirements = async (filters: RoleSkillRequirementFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.roleId) params.append('roleId', filters.roleId);
  if (filters.skillId) params.append('skillId', filters.skillId);
  if (filters.isRequired !== undefined) params.append('isRequired', String(filters.isRequired));
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/skills/role-requirements${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<RoleSkillRequirement>>(url);
};

export const addRoleRequirement = async (data: RoleSkillRequirementPayload) => {
  return apiClient.post<ApiSuccessResponse<RoleSkillRequirement>>(
    '/skills/role-requirements',
    data,
  );
};

export const batchConfigureRoleRequirements = async (
  roleId: string,
  requirements: Array<{
    skillId: string;
    requiredLevel: number;
    isRequired?: boolean;
    notes?: string;
  }>,
) => {
  return apiClient.post<ApiSuccessResponse<RoleSkillRequirement[]>>(
    `/skills/role-requirements/${roleId}/batch`,
    { requirements },
  );
};

export const deleteRoleRequirement = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/skills/role-requirements/${id}`);
};

// --- EMPLOYEE SKILLS ---
export const getEmployeeSkills = async (filters: EmployeeSkillFilters = {}) => {
  const params = new URLSearchParams();
  if (filters.employeeId) params.append('employeeId', filters.employeeId);
  if (filters.skillId) params.append('skillId', filters.skillId);
  if (filters.status) params.append('status', filters.status);
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.departmentId) params.append('departmentId', filters.departmentId);
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/skills/employee-skills${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiPaginatedResponse<EmployeeSkill>>(url);
};

export const getEmployeeSkillsByEmployee = async (employeeId: string) => {
  return apiClient.get<ApiSuccessResponse<EmployeeSkill[]>>(
    `/skills/employee-skills/employee/${employeeId}`,
  );
};

export const addEmployeeSkill = async (data: EmployeeSkillPayload) => {
  return apiClient.post<ApiSuccessResponse<EmployeeSkill>>('/skills/employee-skills', data);
};

export const updateEmployeeSkill = async (id: string, data: Partial<EmployeeSkillPayload>) => {
  return apiClient.patch<ApiSuccessResponse<EmployeeSkill>>(`/skills/employee-skills/${id}`, data);
};

export const verifyEmployeeSkill = async (
  id: string,
  data: { status: 'verified' | 'rejected' | 'pending'; notes?: string },
) => {
  return apiClient.patch<ApiSuccessResponse<EmployeeSkill>>(
    `/skills/employee-skills/${id}/verify`,
    data,
  );
};

export const deleteEmployeeSkill = async (id: string) => {
  return apiClient.delete<ApiSuccessResponse<null>>(`/skills/employee-skills/${id}`);
};

// --- SKILL GAP ANALYTICS ---
export const analyzeEmployeeSkillGap = async (employeeId: string, roleId: string) => {
  return apiClient.get<ApiSuccessResponse<EmployeeSkillGapAnalysis>>(
    `/skills/gap-analysis/employee/${employeeId}?roleId=${roleId}`,
  );
};

export const getConsolidatedSkillGapReport = async (
  filters: ConsolidatedSkillGapReportFilters = {},
) => {
  const params = new URLSearchParams();
  if (filters.branchId) params.append('branchId', filters.branchId);
  if (filters.departmentId) params.append('departmentId', filters.departmentId);
  if (filters.roleId) params.append('roleId', filters.roleId);
  if (filters.employeeId) params.append('employeeId', filters.employeeId);
  if (filters.category) params.append('category', filters.category);
  if (filters.hasGapOnly !== undefined) params.append('hasGapOnly', String(filters.hasGapOnly));
  if (filters.page) params.append('page', String(filters.page));
  if (filters.limit) params.append('limit', String(filters.limit));

  const queryString = params.toString();
  const url = `/skills/gap-analysis${queryString ? `?${queryString}` : ''}`;
  return apiClient.get<ApiSuccessResponse<ConsolidatedSkillGapSummary>>(url);
};
