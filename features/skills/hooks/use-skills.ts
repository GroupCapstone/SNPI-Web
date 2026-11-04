import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type {
  EmployeeSkillPayload,
  RoleSkillRequirementPayload,
  SkillPayload,
} from '../api/skill-api';
import {
  addEmployeeSkill,
  addRoleRequirement,
  analyzeEmployeeSkillGap,
  batchConfigureRoleRequirements,
  createSkill,
  deleteEmployeeSkill,
  deleteRoleRequirement,
  deleteSkill,
  getConsolidatedSkillGapReport,
  getEmployeeSkills,
  getEmployeeSkillsByEmployee,
  getRoleRequirements,
  getRoleRequirementsByRole,
  getSkillById,
  getSkills,
  updateEmployeeSkill,
  updateSkill,
  verifyEmployeeSkill,
} from '../api/skill-api';
import type {
  ConsolidatedSkillGapReportFilters,
  EmployeeSkillFilters,
  RoleSkillRequirementFilters,
  SkillFilters,
} from '../types';

export const SKILL_QUERY_KEYS = {
  all: ['skills'] as const,
  lists: () => [...SKILL_QUERY_KEYS.all, 'list'] as const,
  list: (filters: SkillFilters) => [...SKILL_QUERY_KEYS.lists(), filters] as const,
  details: () => [...SKILL_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...SKILL_QUERY_KEYS.details(), id] as const,
  roleRequirements: () => [...SKILL_QUERY_KEYS.all, 'role-requirements'] as const,
  roleRequirementList: (filters: RoleSkillRequirementFilters) =>
    [...SKILL_QUERY_KEYS.roleRequirements(), 'list', filters] as const,
  roleRequirementByRole: (roleId: string) =>
    [...SKILL_QUERY_KEYS.roleRequirements(), 'by-role', roleId] as const,
  employeeSkills: () => [...SKILL_QUERY_KEYS.all, 'employee-skills'] as const,
  employeeSkillList: (filters: EmployeeSkillFilters) =>
    [...SKILL_QUERY_KEYS.employeeSkills(), 'list', filters] as const,
  employeeSkillsByEmp: (employeeId: string) =>
    [...SKILL_QUERY_KEYS.employeeSkills(), 'by-emp', employeeId] as const,
  gapAnalysis: () => [...SKILL_QUERY_KEYS.all, 'gap-analysis'] as const,
  employeeGap: (employeeId: string, roleId: string) =>
    [...SKILL_QUERY_KEYS.gapAnalysis(), 'employee', employeeId, roleId] as const,
  consolidatedGap: (filters: ConsolidatedSkillGapReportFilters) =>
    [...SKILL_QUERY_KEYS.gapAnalysis(), 'consolidated', filters] as const,
};

// --- SKILL CATALOG HOOKS ---
export const useSkillsQuery = (filters: SkillFilters = {}) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.list(filters),
    queryFn: () => getSkills(filters),
  });
};

export const useSkillQuery = (id: string) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.detail(id),
    queryFn: () => getSkillById(id),
    enabled: Boolean(id),
  });
};

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SkillPayload) => createSkill(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.lists() });
    },
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SkillPayload> }) =>
      updateSkill(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.detail(variables.id) });
    },
  });
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.lists() });
    },
  });
};

// --- ROLE SKILL REQUIREMENTS HOOKS ---
export const useRoleRequirementsQuery = (roleId: string) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.roleRequirementByRole(roleId),
    queryFn: () => getRoleRequirementsByRole(roleId),
    enabled: Boolean(roleId),
  });
};

export const useRoleRequirementsListQuery = (filters: RoleSkillRequirementFilters = {}) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.roleRequirementList(filters),
    queryFn: () => getRoleRequirements(filters),
  });
};

export const useAddRoleRequirementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleSkillRequirementPayload) => addRoleRequirement(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.roleRequirements() });
      queryClient.invalidateQueries({
        queryKey: SKILL_QUERY_KEYS.roleRequirementByRole(variables.roleId),
      });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

export const useBatchConfigureRoleRequirementsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roleId,
      requirements,
    }: {
      roleId: string;
      requirements: Array<{
        skillId: string;
        requiredLevel: number;
        isRequired?: boolean;
        notes?: string;
      }>;
    }) => batchConfigureRoleRequirements(roleId, requirements),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.roleRequirements() });
      queryClient.invalidateQueries({
        queryKey: SKILL_QUERY_KEYS.roleRequirementByRole(variables.roleId),
      });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

export const useDeleteRoleRequirementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRoleRequirement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.roleRequirements() });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

// --- EMPLOYEE SKILLS HOOKS ---
export const useEmployeeSkillsQuery = (employeeId: string) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.employeeSkillsByEmp(employeeId),
    queryFn: () => getEmployeeSkillsByEmployee(employeeId),
    enabled: Boolean(employeeId),
  });
};

export const useAllEmployeeSkillsQuery = (filters: EmployeeSkillFilters = {}) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.employeeSkillList(filters),
    queryFn: () => getEmployeeSkills(filters),
  });
};

export const useAddEmployeeSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmployeeSkillPayload) => addEmployeeSkill(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.employeeSkills() });
      queryClient.invalidateQueries({
        queryKey: SKILL_QUERY_KEYS.employeeSkillsByEmp(variables.employeeId),
      });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

export const useUpdateEmployeeSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmployeeSkillPayload> }) =>
      updateEmployeeSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.employeeSkills() });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

export const useVerifyEmployeeSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { status: 'verified' | 'rejected' | 'pending'; notes?: string };
    }) => verifyEmployeeSkill(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.employeeSkills() });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

export const useDeleteEmployeeSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEmployeeSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.employeeSkills() });
      queryClient.invalidateQueries({ queryKey: SKILL_QUERY_KEYS.gapAnalysis() });
    },
  });
};

// --- SKILL GAP ANALYTICS HOOKS ---
export const useEmployeeSkillGapQuery = (employeeId: string, roleId: string) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.employeeGap(employeeId, roleId),
    queryFn: () => analyzeEmployeeSkillGap(employeeId, roleId),
    enabled: Boolean(employeeId) && Boolean(roleId),
  });
};

export const useConsolidatedSkillGapReportQuery = (
  filters: ConsolidatedSkillGapReportFilters = {},
) => {
  return useQuery({
    queryKey: SKILL_QUERY_KEYS.consolidatedGap(filters),
    queryFn: () => getConsolidatedSkillGapReport(filters),
  });
};
