import { z } from 'zod';

export const skillFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, 'Skill code must be at least 2 characters')
    .max(50, 'Skill code cannot exceed 50 characters'),
  name: z
    .string()
    .trim()
    .min(2, 'Skill name must be at least 2 characters')
    .max(150, 'Skill name cannot exceed 150 characters'),
  category: z.enum([
    'pedagogy',
    'technical',
    'leadership',
    'administration',
    'communication',
    'language',
    'domain',
    'general',
  ]),
  description: z
    .string()
    .trim()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  isActive: z.boolean(),
  schoolId: z.string().optional(),
});

export type SkillFormData = z.infer<typeof skillFormSchema>;

export const roleSkillRequirementFormSchema = z.object({
  roleId: z.string().min(1, 'Role is required'),
  skillId: z.string().min(1, 'Skill is required'),
  requiredLevel: z.number().min(1).max(5),
  isRequired: z.boolean(),
  notes: z.string().trim().max(500).optional().or(z.literal('')),
});

export type RoleSkillRequirementFormData = z.infer<typeof roleSkillRequirementFormSchema>;

export const employeeSkillFormSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  skillId: z.string().min(1, 'Skill is required'),
  proficiencyLevel: z.number().min(1, 'Select a level').max(5),
  yearsExperience: z.number().min(0, 'Cannot be negative').max(60),
  evidenceDocument: z.string().trim().max(200).optional().or(z.literal('')),
  evidenceUrl: z.string().trim().url('Invalid URL').optional().or(z.literal('')),
  expiryDate: z.string().optional().or(z.literal('')),
  notes: z.string().trim().max(500).optional().or(z.literal('')),
});

export type EmployeeSkillFormData = z.infer<typeof employeeSkillFormSchema>;

export const verifyEmployeeSkillSchema = z.object({
  status: z.enum(['verified', 'rejected', 'pending']),
  notes: z.string().trim().max(500).optional().or(z.literal('')),
});

export type VerifyEmployeeSkillFormData = z.infer<typeof verifyEmployeeSkillSchema>;
