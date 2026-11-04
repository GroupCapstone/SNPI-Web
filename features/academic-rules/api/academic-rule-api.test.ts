import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  createAcademicRule,
  createAcademicRuleVersion,
  getAcademicRuleById,
  getAcademicRules,
  updateAcademicRule,
} from './academic-rule-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AcademicRule API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /academic-rules without filters when none provided', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Academic rules loaded',
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await getAcademicRules();
    expect(apiClient.get).toHaveBeenCalledWith('/academic-rules');
  });

  it('calls GET /academic-rules with query parameters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Academic rules loaded',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });

    await getAcademicRules({
      ruleType: 'grade_scheme',
      status: 'active',
      page: 1,
      limit: 10,
    });
    expect(apiClient.get).toHaveBeenCalledWith(
      '/academic-rules?ruleType=grade_scheme&status=active&page=1&limit=10',
    );
  });

  it('calls GET /academic-rules/:id to fetch a single rule', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'Academic rule found',
      data: { _id: 'rule-1', code: 'GRD-1' },
    });

    await getAcademicRuleById('rule-1');
    expect(apiClient.get).toHaveBeenCalledWith('/academic-rules/rule-1');
  });

  it('calls POST /academic-rules to create a new rule', async () => {
    const payload = {
      ruleType: 'grade_scheme' as const,
      code: 'GRD-TEST',
      name: 'Test Grade Scheme',
      schoolId: '507f1f77bcf86cd799439011',
      config: {
        bands: [
          { grade: 'A', minimum: 90, gpa: 4 },
          { grade: 'F', minimum: 0, gpa: 0 },
        ],
      },
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Created',
      data: { _id: 'new-1', ...payload },
    });

    await createAcademicRule(payload);
    expect(apiClient.post).toHaveBeenCalledWith('/academic-rules', payload);
  });

  it('calls POST /academic-rules/:id/version to publish a new version', async () => {
    const versionPayload = {
      effectiveFrom: '2026-09-01',
      config: { minimumAttendanceRate: 85 },
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Version created',
      data: { _id: 'rule-1', version: 2 },
    });

    await createAcademicRuleVersion('rule-1', versionPayload);
    expect(apiClient.post).toHaveBeenCalledWith('/academic-rules/rule-1/version', versionPayload);
  });

  it('calls PATCH /academic-rules/:id to update a rule', async () => {
    const updatePayload = { name: 'Updated Name', status: 'archived' as const };

    vi.mocked(apiClient.patch).mockResolvedValue({
      success: true,
      message: 'Updated',
      data: { _id: 'rule-1', ...updatePayload },
    });

    await updateAcademicRule('rule-1', updatePayload);
    expect(apiClient.patch).toHaveBeenCalledWith('/academic-rules/rule-1', updatePayload);
  });
});
