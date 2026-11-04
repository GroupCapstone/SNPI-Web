import { describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import { createAssessment, getAssessments } from './assessment-api';

describe('Assessment API client', () => {
  it('calls getAssessments with query params', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: [],
      meta: { page: 1, limit: 20, total: 0, totalPages: 0 },
    } as never);

    await getAssessments({ search: 'Midterm', type: 'midterm' });
    expect(mockGet).toHaveBeenCalledWith('/assessments?search=Midterm&type=midterm');
  });

  it('calls createAssessment with payload', async () => {
    const mockPost = vi.spyOn(apiClient, 'post').mockResolvedValue({
      success: true,
      data: { _id: '123', name: 'Quiz 1' },
    } as never);

    const payload = {
      schoolId: '1',
      branchId: '2',
      academicYearId: '3',
      classId: '4',
      subjectId: '5',
      name: 'Quiz 1',
      code: 'Q1',
      type: 'quiz' as const,
      maxScore: 100,
      passingScore: 50,
      weightPercentage: 20,
      assessmentDate: '2026-09-01',
      status: 'published' as const,
    };
    await createAssessment(payload);
    expect(mockPost).toHaveBeenCalledWith('/assessments', payload);
  });
});
