import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from './employee-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('employee-api', () => {
  it('getEmployees builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Employees retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439005',
          employeeId: 'EMP-000001',
          firstName: 'Dara',
          lastName: 'Sok',
          khmerName: 'សុខ តារា',
          gender: 'male',
          dateOfBirth: '1990-05-15',
          employmentType: 'full_time',
          joiningDate: '2024-01-01',
          status: 'active',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getEmployees({ search: 'Dara', status: 'active', page: 1, limit: 10 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/employees?search=Dara&status=active&page=1&limit=10',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('getEmployeeById fetches single employee by ID', async () => {
    const payload = {
      success: true,
      message: 'Employee retrieved successfully',
      data: {
        _id: '507f1f77bcf86cd799439005',
        employeeId: 'EMP-000001',
        firstName: 'Dara',
        lastName: 'Sok',
        khmerName: 'សុខ តារា',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getEmployeeById('507f1f77bcf86cd799439005');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/employees/507f1f77bcf86cd799439005',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createEmployee posts payload and returns created record', async () => {
    const payload = {
      success: true,
      message: 'Employee created successfully',
      data: {
        _id: '507f1f77bcf86cd799439005',
        employeeId: 'EMP-000001',
        schoolId: '507f1f77bcf86cd799439001',
        branchId: '507f1f77bcf86cd799439002',
        departmentId: '507f1f77bcf86cd799439003',
        positionId: '507f1f77bcf86cd799439004',
        firstName: 'Dara',
        lastName: 'Sok',
        khmerName: 'សុខ តារា',
        gender: 'male' as const,
        dateOfBirth: '1990-05-15',
        employmentType: 'full_time' as const,
        joiningDate: '2024-01-01',
        status: 'active' as const,
        maritalStatus: 'single' as const,
        educationLevel: 'bachelor' as const,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createEmployee({
      schoolId: '507f1f77bcf86cd799439001',
      branchId: '507f1f77bcf86cd799439002',
      departmentId: '507f1f77bcf86cd799439003',
      positionId: '507f1f77bcf86cd799439004',
      firstName: 'Dara',
      lastName: 'Sok',
      khmerName: 'សុខ តារា',
      gender: 'male',
      dateOfBirth: '1990-05-15',
      maritalStatus: 'single',
      educationLevel: 'bachelor',
      employmentType: 'full_time',
      joiningDate: '2024-01-01',
      status: 'active',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/employees',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('updateEmployee sends PATCH request with updated fields', async () => {
    const payload = {
      success: true,
      message: 'Employee updated successfully',
      data: {
        _id: '507f1f77bcf86cd799439005',
        primaryPhone: '+85599887766',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await updateEmployee('507f1f77bcf86cd799439005', {
      primaryPhone: '+85599887766',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/employees/507f1f77bcf86cd799439005',
      expect.objectContaining({
        method: 'PATCH',
      }),
    );
  });

  it('deleteEmployee sends DELETE request', async () => {
    const payload = {
      success: true,
      message: 'Employee deleted successfully',
      data: null,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await deleteEmployee('507f1f77bcf86cd799439005');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/employees/507f1f77bcf86cd799439005',
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
  });
});
