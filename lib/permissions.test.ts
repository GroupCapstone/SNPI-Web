import { describe, expect, it } from 'vitest';

import { checkUserPermission } from './permissions';
import { ALL_PERMISSION_CODES, DEFAULT_CORE_ROLES } from '@/test-fixtures/permission-catalog.json';

describe('frontend checkUserPermission', () => {
  it.each(DEFAULT_CORE_ROLES)('recognizes each canonical permission granted to $code', (role) => {
    for (const permission of role.permissions) {
      expect(checkUserPermission(role.permissions, permission), `${role.code}: ${permission}`).toBe(
        true,
      );
    }
  });
  it('contains a unique canonical permission catalog', () => {
    expect(new Set(ALL_PERMISSION_CODES).size).toBe(ALL_PERMISSION_CODES.length);
  });
  it('does not grant authority from the super_admin role name alone', () => {
    expect(checkUserPermission([], 'some.arbitrary.permission', ['super_admin'])).toBe(false);
  });

  it('allows wildcard * permission for any check', () => {
    expect(checkUserPermission(['*'], 'employee.delete.all_branches')).toBe(true);
  });

  it('matches exact permissions', () => {
    expect(checkUserPermission(['student.view.own_branch'], 'student.view.own_branch')).toBe(true);
    expect(checkUserPermission(['student.view.own_branch'], 'student.edit.own_branch')).toBe(false);
  });

  it('inherits scope: all_branches satisfies own_branch', () => {
    expect(checkUserPermission(['employee.view.all_branches'], 'employee.view.own_branch')).toBe(
      true,
    );
  });

  it('does not allow narrower scope to satisfy broader scope', () => {
    expect(checkUserPermission(['employee.view.own_branch'], 'employee.view.all_branches')).toBe(
      false,
    );
  });

  it('does not merge incomparable teacher resource scopes', () => {
    expect(checkUserPermission(['score.view.assigned_class'], 'score.view.assigned_subject')).toBe(
      false,
    );
    expect(checkUserPermission(['score.view.assigned_subject'], 'score.view.assigned_class')).toBe(
      false,
    );
  });

  it('inherits action: manage satisfies view, create, edit, delete', () => {
    expect(checkUserPermission(['employee.manage.own_branch'], 'employee.view.own_branch')).toBe(
      true,
    );
    expect(checkUserPermission(['employee.manage.own_branch'], 'employee.create.own_branch')).toBe(
      true,
    );
    expect(checkUserPermission(['employee.manage.own_branch'], 'employee.edit.own_branch')).toBe(
      true,
    );
    expect(checkUserPermission(['employee.manage.own_branch'], 'employee.delete.own_branch')).toBe(
      true,
    );
  });

  it('inherits action: edit satisfies view', () => {
    expect(checkUserPermission(['employee.edit.own_branch'], 'employee.view.own_branch')).toBe(
      true,
    );
  });

  it('supports ReadonlySet input', () => {
    const set = new Set(['branch.view.all_branches']);
    expect(checkUserPermission(set, 'branch.view.own_branch')).toBe(true);
  });
  it('inherits the final scope of nested finance actions', () => {
    expect(
      checkUserPermission(
        ['finance.payment.create.all_branches'],
        'finance.payment.create.own_branch',
      ),
    ).toBe(true);
    expect(
      checkUserPermission(
        ['finance.payment.create.own_branch'],
        'finance.payment.create.all_branches',
      ),
    ).toBe(false);
    expect(
      checkUserPermission(['finance.void.request.all_branches'], 'finance.void.approve.own_branch'),
    ).toBe(false);
    expect(
      checkUserPermission(
        ['finance.discount.apply.all_branches'],
        'finance.payment.create.own_branch',
      ),
    ).toBe(false);
  });
});
