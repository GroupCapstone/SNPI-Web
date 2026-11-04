import { describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';
import {
  getAcademicHonorRollApi,
  getDashboardActionItems,
  getFinancePulseApi,
  getHrPulseApi,
  getStudentAffairsPulseApi,
} from './dashboard-api';

describe('Dashboard API client', () => {
  it('calls getDashboardActionItems with branch and academic year filters', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: { summary: {}, queues: {} },
    } as never);

    await getDashboardActionItems({
      branchId: 'branch-123',
      academicYearId: 'ay-456',
      year: 2026,
      month: 9,
    });

    expect(mockGet).toHaveBeenCalledWith(
      '/dashboard/action-items?branchId=branch-123&academicYearId=ay-456&year=2026&month=9',
    );
  });

  it('calls getFinancePulseApi with year, month, and branch params', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: { today: {}, overdueAging: [], overdueStudents: [], monthlyCollection: [] },
    } as never);

    await getFinancePulseApi({
      branchId: 'branch-123',
      academicYearId: 'ay-456',
      year: 2026,
      month: 8,
    });

    expect(mockGet).toHaveBeenCalledWith(
      '/dashboard/finance-pulse?branchId=branch-123&academicYearId=ay-456&year=2026&month=8',
    );
  });

  it('calls getStudentAffairsPulseApi with branchId', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: { funnel: [], movement: {}, atRiskAbsences: [], upcomingBirthdays: [] },
    } as never);

    await getStudentAffairsPulseApi({ branchId: 'branch-123' });

    expect(mockGet).toHaveBeenCalledWith('/dashboard/student-affairs-pulse?branchId=branch-123');
  });

  it('calls getHrPulseApi with branchId', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: {
        totalEmployees: 0,
        activeTeachers: 0,
        byDepartment: [],
        byBranch: [],
        expiringContracts: [],
        teacherWorkloads: [],
      },
    } as never);

    await getHrPulseApi({ branchId: 'branch-123' });

    expect(mockGet).toHaveBeenCalledWith('/dashboard/hr-pulse?branchId=branch-123');
  });

  it('calls getAcademicHonorRollApi with branchId, academicYearId, and limit', async () => {
    const mockGet = vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: {
        summary: {
          totalEvaluatedStudents: 0,
          overallAverage: 0,
          overallPassingRate: 0,
          honorRollCount: 0,
        },
        topPerformers: [],
        classPerformances: [],
        gradeDistribution: [],
      },
    } as never);

    await getAcademicHonorRollApi({
      branchId: 'branch-123',
      academicYearId: 'ay-456',
      limit: 10,
    });

    expect(mockGet).toHaveBeenCalledWith(
      '/dashboard/academic-honor-roll?branchId=branch-123&academicYearId=ay-456&limit=10',
    );
  });
});
