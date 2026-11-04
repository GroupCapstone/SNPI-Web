import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  analyzeEmployeeSkillGap,
  createSkill,
  getRoleRequirementsByRole,
  getSkills,
  verifyEmployeeSkill,
} from './skill-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('skill-api client tests', () => {
  it('getSkills builds query params and calls /skills', async () => {
    const payload = {
      success: true,
      message: 'Skills retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439030',
          code: 'SKILL-PED-001',
          name: 'Teaching Methodology',
          category: 'pedagogy',
          isActive: true,
        },
      ],
      pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getSkills({
      search: 'pedagogy',
      category: 'pedagogy',
      page: 1,
      limit: 20,
    });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/skills?search=pedagogy&category=pedagogy&page=1&limit=20',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createSkill sends POST request to /skills', async () => {
    const payload = {
      success: true,
      message: 'Skill created successfully',
      data: {
        _id: '507f1f77bcf86cd799439030',
        code: 'SKILL-PED-001',
        name: 'Teaching Methodology',
        category: 'pedagogy',
        isActive: true,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createSkill({
      code: 'SKILL-PED-001',
      name: 'Teaching Methodology',
      category: 'pedagogy',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/skills',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          code: 'SKILL-PED-001',
          name: 'Teaching Methodology',
          category: 'pedagogy',
        }),
      }),
    );
  });

  it('getRoleRequirementsByRole fetches requirements for a role', async () => {
    const payload = {
      success: true,
      data: [
        {
          _id: 'req-1',
          roleId: 'role-123',
          skillId: { _id: 'skill-1', code: 'SKILL-PED-001', name: 'Teaching Methodology' },
          requiredLevel: 4,
          isRequired: true,
        },
      ],
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getRoleRequirementsByRole('role-123');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/skills/role-requirements/role-123',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('analyzeEmployeeSkillGap fetches gap analysis for an employee vs role', async () => {
    const payload = {
      success: true,
      data: {
        employeeId: 'emp-1',
        employeeName: 'Dara Sok',
        targetRole: { roleId: 'role-1', roleCode: 'teacher', roleName: 'Teacher' },
        matchPercentage: 85,
        totalRequiredSkills: 5,
        totalAcquiredSkills: 4,
        totalGaps: 1,
        skills: [],
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await analyzeEmployeeSkillGap('emp-1', 'role-1');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/skills/gap-analysis/employee/emp-1?roleId=role-1',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('verifyEmployeeSkill sends verification update to /skills/employee-skills/:id/verify', async () => {
    const payload = {
      success: true,
      message: 'Employee skill status updated to verified',
      data: { _id: 'es-1', status: 'verified' },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await verifyEmployeeSkill('es-1', {
      status: 'verified',
      notes: 'Certificate checked',
    });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/skills/employee-skills/es-1/verify',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ status: 'verified', notes: 'Certificate checked' }),
      }),
    );
  });
});
