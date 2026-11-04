import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createRole,
  deleteRole,
  getGroupedPermissions,
  getRoleById,
  getRoles,
  updateRole,
} from './role-api';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('role-api', () => {
  it('getRoles builds query parameters and returns paginated roles', async () => {
    const payload = {
      success: true,
      message: 'Roles retrieved successfully',
      data: [
        {
          _id: '507f1f77bcf86cd799439011',
          code: 'branch_manager',
          nameEn: 'Branch Manager',
          permissions: ['branch.view.own_branch'],
          isSystem: true,
          status: 'active',
        },
      ],
      pagination: {
        page: 1,
        limit: 50,
        total: 1,
        totalPages: 1,
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getRoles({ search: 'manager', status: 'active', page: 1, limit: 50 });
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/roles?search=manager&status=active&page=1&limit=50',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('getRoleById fetches a specific role by ID', async () => {
    const payload = {
      success: true,
      message: 'Role retrieved successfully',
      data: {
        _id: '507f1f77bcf86cd799439011',
        code: 'branch_manager',
        nameEn: 'Branch Manager',
        permissions: ['branch.view.own_branch'],
        isSystem: true,
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getRoleById('507f1f77bcf86cd799439011');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/roles/507f1f77bcf86cd799439011',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('createRole posts role payload and returns created role', async () => {
    const payload = {
      success: true,
      message: 'Role created successfully',
      data: {
        _id: '507f1f77bcf86cd799439099',
        code: 'custom_coordinator',
        nameEn: 'Custom Coordinator',
        permissions: ['class.view.own_branch'],
        isSystem: false,
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createRole({
      code: 'custom_coordinator',
      nameEn: 'Custom Coordinator',
      permissions: ['class.view.own_branch'],
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/roles',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('updateRole patches role properties', async () => {
    const payload = {
      success: true,
      message: 'Role updated successfully',
      data: {
        _id: '507f1f77bcf86cd799439099',
        code: 'custom_coordinator',
        nameEn: 'Senior Coordinator',
        permissions: ['class.view.own_branch'],
        isSystem: false,
        status: 'active',
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await updateRole('507f1f77bcf86cd799439099', {
      nameEn: 'Senior Coordinator',
    });

    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/roles/507f1f77bcf86cd799439099',
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('deleteRole calls delete on role endpoint', async () => {
    const payload = {
      success: true,
      message: 'Role deleted successfully',
      data: null,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await deleteRole('507f1f77bcf86cd799439099');
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/roles/507f1f77bcf86cd799439099',
      expect.objectContaining({ method: 'DELETE' }),
    );
  });

  it('getGroupedPermissions fetches grouped permissions catalog', async () => {
    const payload = {
      success: true,
      data: [
        {
          module: 'branch',
          moduleName: 'Branch',
          permissions: [
            {
              code: 'branch.view.own_branch',
              module: 'branch',
              action: 'view',
              scope: 'own_branch',
              nameEn: 'View Branch',
              description: 'View assigned branch',
            },
          ],
        },
      ],
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(payload),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getGroupedPermissions();
    expect(result).toEqual(payload);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/permissions/grouped',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
