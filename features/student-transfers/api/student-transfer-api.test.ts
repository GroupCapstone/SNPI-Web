import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib/api-client';

import {
  createStudentTransferApi,
  getStudentTransfersApi,
  processStudentTransferApi,
} from './student-transfer-api';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('Student Transfer API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /student-transfers with query filters', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({
      success: true,
      message: 'OK',
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
    });

    await getStudentTransfersApi({ page: 1, limit: 10, fromBranchId: 'b-1' });

    expect(apiClient.get).toHaveBeenCalledWith(
      '/student-transfers?page=1&limit=10&fromBranchId=b-1',
    );
  });

  it('calls POST /student-transfers to initiate transfer', async () => {
    const payload = {
      studentId: 'stu-1',
      fromSchoolId: 's-1',
      toSchoolId: 's-1',
      fromBranchId: 'b-1',
      toBranchId: 'b-2',
      reason: 'Family relocated',
    };

    vi.mocked(apiClient.post).mockResolvedValue({
      success: true,
      message: 'Created',
      data: {
        _id: 'trf-1',
        ...payload,
        transferNumber: 'TRF-000001',
        status: 'pending',
        transferDate: '2026-08-30',
        isDeleted: false,
        studentId: {
          _id: 'stu-1',
          studentId: 'STU-001',
          firstName: 'Bopha',
          lastName: 'Kouy',
          khmerName: 'គុយ បុប្ផា',
          phone: '012345678',
        },
        fromSchoolId: { _id: 's-1', nameEn: 'SNP', code: 'SNP' },
        toSchoolId: { _id: 's-1', nameEn: 'SNP', code: 'SNP' },
        fromBranchId: { _id: 'b-1', branchNameEn: 'Main', branchCode: 'MB-01' },
        toBranchId: { _id: 'b-2', branchNameEn: 'Toul Kork', branchCode: 'TK-01' },
        createdAt: '2026-08-30',
        updatedAt: '2026-08-30',
      },
    });

    const result = await createStudentTransferApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/student-transfers', payload);
    expect(result.data.transferNumber).toBe('TRF-000001');
  });

  it('calls PATCH /student-transfers/:id/process', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({
      success: true,
      message: 'Updated',
      data: { _id: 'trf-1', status: 'approved' },
    });

    await processStudentTransferApi('trf-1', { status: 'approved', remarks: 'Approved' });

    expect(apiClient.patch).toHaveBeenCalledWith('/student-transfers/trf-1/process', {
      status: 'approved',
      remarks: 'Approved',
    });
  });
});
