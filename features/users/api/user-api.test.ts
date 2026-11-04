import { afterEach, describe, expect, it, vi } from 'vitest';

import { createUser, getUsers, resetUserPassword } from './user-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('user-api', () => {
  it('getUsers builds query and returns paginated response', async () => {
    const payload = {
      success: true,
      message: 'Users retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439006',
          username: 'dara.sok',
          email: 'dara.sok@snp.edu.kh',
          roles: ['staff'],
          branchAccess: 'all',
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

    const result = await getUsers({ search: 'dara', role: 'staff', page: 1, limit: 10 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/users?search=dara&role=staff&page=1&limit=10',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createUser posts payload and returns created user', async () => {
    const payload = {
      success: true,
      message: 'User account created successfully',
      data: {
        _id: '507f1f77bcf86cd799439006',
        schoolId: '507f1f77bcf86cd799439001',
        username: 'dara.sok',
        email: 'dara.sok@snp.edu.kh',
        roles: ['staff'],
        branchAccess: 'all' as const,
        status: 'active' as const,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createUser({
      schoolId: '507f1f77bcf86cd799439001',
      username: 'dara.sok',
      email: 'dara.sok@snp.edu.kh',
      password: 'Password@123',
      roles: ['staff'],
      branchAccess: 'all',
      status: 'active',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/users',
      expect.objectContaining({
        method: 'POST',
      }),
    );
  });

  it('resetUserPassword posts to reset-password endpoint', async () => {
    const payload = {
      success: true,
      message: 'Password reset successfully',
      data: {
        message: 'Password reset successfully',
        temporaryPassword: 'TempPassword@123',
        mustChangePassword: true,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await resetUserPassword('507f1f77bcf86cd799439006', {
      temporaryPassword: 'TempPassword@123',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/users/507f1f77bcf86cd799439006/reset-password',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ temporaryPassword: 'TempPassword@123' }),
      }),
    );
  });
});
