import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { getVisibleNavigation } from '@/constants/navigation';
import { checkUserPermission } from '@/lib/permissions';
import { DEFAULT_CORE_ROLES } from '@/test-fixtures/permission-catalog.json';

import { getRequiredPermissionsForPath } from './route-permissions';

describe('frontend route and sidebar RBAC', () => {
  it('accepts either own-branch or all-branch permissions for scoped routes', () => {
    expect(getRequiredPermissionsForPath('/programs')).toEqual([
      'program.view.own_branch',
      'program.view.all_branches',
      'program.manage.own_branch',
      'program.manage.all_branches',
    ]);
    expect(getRequiredPermissionsForPath('/organization/branches')).toEqual([
      'branch.view.own_branch',
      'branch.view.all_branches',
      'branch.manage.own_branch',
      'branch.manage.all_branches',
    ]);
    expect(getRequiredPermissionsForPath('/classrooms')).toEqual([
      'classroom.view.own_branch',
      'classroom.view.all_branches',
      'classroom.manage.own_branch',
      'classroom.manage.all_branches',
    ]);
    expect(getRequiredPermissionsForPath('/classes')).toEqual([
      'class.view.assigned_class',
      'class.view.assigned_subject',
      'class.view.own_department',
      'class.view.own_branch',
      'class.view.all_branches',
      'class.manage.own_branch',
      'class.manage.all_branches',
    ]);
    expect(getRequiredPermissionsForPath('/employees/abc/edit')).toEqual([
      'employee.edit.own_branch',
      'employee.edit.all_branches',
    ]);
    expect(getRequiredPermissionsForPath('/employees/abc')).toContain('employee.view.own_record');
    expect(getRequiredPermissionsForPath('/employees')).not.toContain('employee.view.own_record');
  });

  it('fails closed for an unmapped dashboard route', () => {
    expect(getRequiredPermissionsForPath('/unknown-module')).toEqual(['__route_not_authorized__']);
  });

  it('maps each dashboard perspective to its data permission boundary', () => {
    expect(getRequiredPermissionsForPath('/dashboard')).toBeNull();
    expect(getRequiredPermissionsForPath('/dashboard/executive')).toContain(
      'report.view.own_branch',
    );
    expect(getRequiredPermissionsForPath('/dashboard/staff-teacher')).toContain(
      'class.view.assigned_class',
    );
    expect(getRequiredPermissionsForPath('/dashboard/students')).toContain(
      'student.view.own_branch',
    );
    expect(getRequiredPermissionsForPath('/dashboard/finance')).toContain(
      'payment.view.own_branch',
    );
    expect(getRequiredPermissionsForPath('/dashboard/hr')).toContain('employee.view.own_branch');
  });

  it('shows own-branch navigation to all-branch viewers', () => {
    const groups = getVisibleNavigation(
      new Set(['program.view.all_branches', 'branch.view.all_branches']),
    );
    const links = groups.flatMap((group) => group.items.map((item) => item.href));

    expect(links).toContain('/programs');
    expect(links).toContain('/organization/branches');
  });

  it('shows branch navigation to an own-branch manager', () => {
    const groups = getVisibleNavigation(new Set(['branch.view.own_branch']));
    const links = groups.flatMap((group) => group.items.map((item) => item.href));

    expect(links).toContain('/organization/branches');
    expect(links).not.toContain('/organization/school');
  });

  it('shows only assignment-scoped academic navigation to a teacher', () => {
    const groups = getVisibleNavigation(
      new Set([
        'class.view.assigned_class',
        'student.view.assigned_class',
        'attendance.view.assigned_class',
        'subject.view.assigned_subject',
        'score.view.assigned_subject',
      ]),
    );
    const links = groups.flatMap((group) => group.items.map((item) => item.href));

    expect(links).toEqual(
      expect.arrayContaining(['/classes', '/students', '/attendance', '/subjects', '/scores']),
    );
    expect(links).not.toContain('/finance/payments');
    expect(links).not.toContain('/employees');
    expect(links).not.toContain('/roles');
  });

  it('correctly maps skills catalog and gap analysis routes', () => {
    expect(getRequiredPermissionsForPath('/skills')).toContain('skill.view.own_branch');
    expect(getRequiredPermissionsForPath('/skills/gap-analysis')).toEqual([
      'skill_gap.view.own_record',
      'skill_gap.view.own_branch',
      'skill_gap.view.all_branches',
    ]);
  });

  it('correctly maps announcement and notification routes and navigation', () => {
    expect(getRequiredPermissionsForPath('/announcements')).toContain(
      'announcement.view.own_branch',
    );
    expect(getRequiredPermissionsForPath('/notifications')).toContain(
      'notification.view.own_branch',
    );

    const groups = getVisibleNavigation(
      new Set(['announcement.view.own_branch', 'notification.view.own_branch']),
    );
    const links = groups.flatMap((group) => group.items.map((item) => item.href));

    expect(links).toContain('/announcements');
    expect(links).toContain('/notifications');
  });

  it('blocks teacher permissions from administrative routes while allowing teaching routes', () => {
    const teacherPermissions = new Set(
      DEFAULT_CORE_ROLES.find((role) => role.code === 'teacher')!.permissions,
    );

    const canAccessRoute = (pathname: string): boolean => {
      const required = getRequiredPermissionsForPath(pathname);
      if (!required) return true;
      return required.some((perm) => checkUserPermission(teacherPermissions, perm));
    };

    // Teaching & classroom features permitted
    expect(canAccessRoute('/classes')).toBe(true);
    expect(canAccessRoute('/students')).toBe(true);
    expect(canAccessRoute('/attendance')).toBe(true);
    expect(canAccessRoute('/attendance/leaves')).toBe(true);
    expect(canAccessRoute('/subjects')).toBe(true);
    expect(canAccessRoute('/assessments')).toBe(true);
    expect(canAccessRoute('/scores')).toBe(true);
    expect(canAccessRoute('/term-results')).toBe(true);
    expect(canAccessRoute('/timetable')).toBe(true);

    // Administrative features strictly blocked
    expect(canAccessRoute('/organization/school')).toBe(false);
    expect(canAccessRoute('/organization/branches')).toBe(false);
    expect(canAccessRoute('/organization/departments')).toBe(false);
    expect(canAccessRoute('/organization/positions')).toBe(false);
    expect(canAccessRoute('/classrooms')).toBe(false);
    expect(canAccessRoute('/programs')).toBe(false);
    expect(canAccessRoute('/levels')).toBe(false);
    expect(canAccessRoute('/curriculum')).toBe(false);
    expect(canAccessRoute('/academic-years')).toBe(false);
    expect(canAccessRoute('/academic-periods')).toBe(false);
    expect(canAccessRoute('/academic-periods/rollover')).toBe(false);
    expect(canAccessRoute('/intakes')).toBe(false);
    expect(canAccessRoute('/enrollments')).toBe(false);
    expect(canAccessRoute('/guardians')).toBe(false);
    expect(canAccessRoute('/student-status-history')).toBe(false);
    expect(canAccessRoute('/teacher-assignments')).toBe(false);
    expect(canAccessRoute('/student-transfers')).toBe(false);
    expect(canAccessRoute('/finance/tuition')).toBe(false);
    expect(canAccessRoute('/finance/payments')).toBe(false);
    expect(canAccessRoute('/finance/operations')).toBe(false);
    expect(canAccessRoute('/users')).toBe(false);
    expect(canAccessRoute('/roles')).toBe(false);
    expect(canAccessRoute('/settings')).toBe(false);
    expect(canAccessRoute('/dashboard/executive')).toBe(false);
  });

  it('does not expose the executive dashboard from directory-only permissions', () => {
    const canAccess = (permissions: string[], pathname: string) =>
      getRequiredPermissionsForPath(pathname)?.some((required) =>
        checkUserPermission(permissions, required),
      ) ?? true;
    expect(
      canAccess(['school.view.all_branches', 'branch.view.own_branch'], '/dashboard/executive'),
    ).toBe(false);
    expect(canAccess(['employee.view.own_record'], '/dashboard/executive')).toBe(false);
    expect(canAccess(['report.view.own_branch'], '/dashboard/executive')).toBe(true);
  });
});

describe('canonical role navigation regressions', () => {
  const canAccess = (permissions: string[], pathname: string) =>
    getRequiredPermissionsForPath(pathname)?.some((required) =>
      checkUserPermission(permissions, required),
    ) ?? true;

  it('allows department heads to view their departments and staff without edit access', () => {
    const permissions = DEFAULT_CORE_ROLES.find(
      (role) => role.code === 'department_head',
    )!.permissions;
    expect(canAccess(permissions, '/employees')).toBe(true);
    expect(canAccess(permissions, '/employees/example')).toBe(true);
    expect(canAccess(permissions, '/organization/departments')).toBe(true);
    expect(canAccess(permissions, '/employees/new')).toBe(false);
    expect(canAccess(permissions, '/employees/example/edit')).toBe(false);
  });

  it.each(['own_branch', 'all_branches'])('allows rollover viewers with %s scope', (scope) => {
    const permissions = [`rollover.view.${scope}`];
    expect(canAccess(permissions, '/academic-periods/rollover')).toBe(true);
    expect(canAccess(permissions, '/academic-periods/rollover/')).toBe(true);
    expect(canAccess(permissions, '/academic-periods')).toBe(false);
    expect(canAccess([], '/academic-periods/rollover')).toBe(false);
  });

  it('does not infer department access for unrelated administrative navigation', () => {
    const links = getVisibleNavigation(new Set(['program.view.own_department'])).flatMap((group) =>
      group.items.map((item) => item.href),
    );
    expect(links).not.toContain('/programs');
  });

  it.each(DEFAULT_CORE_ROLES)('keeps every visible link accessible for $code', (role) => {
    const links = getVisibleNavigation(new Set(role.permissions)).flatMap((group) =>
      group.items.map((item) => item.href),
    );
    for (const link of links) {
      expect(canAccess(role.permissions, link), `${role.code}: ${link}`).toBe(true);
    }
  });

  it('maps every actual dashboard page, including dynamic detail and edit paths', () => {
    const root = path.resolve('app/(dashboard)');
    const pages = fs
      .readdirSync(root, { recursive: true })
      .filter((file) => String(file).endsWith('page.tsx'));
    expect(pages.length).toBeGreaterThan(60);
    for (const page of pages) {
      const route =
        '/' +
        String(page)
          .replace(/\/page\.tsx$/, '')
          .replace(/\[[^/]+\]/g, 'example');
      expect(getRequiredPermissionsForPath(route) ?? [], route).not.toContain(
        '__route_not_authorized__',
      );
    }
  });

  it.each([
    ['super_admin', true, true, true, true],
    ['director', true, true, true, true],
    ['branch_manager', true, true, true, false],
    ['administrator', true, false, true, false],
    ['academic_officer', true, false, false, false],
    ['teacher', true, false, false, false],
    ['finance_officer', true, true, false, false],
    ['student_affairs_officer', true, false, false, false],
    ['hr_officer', false, false, false, false],
    ['librarian', true, false, false, false],
    ['inventory_officer', false, false, false, false],
    ['staff', false, false, false, false],
    ['department_head', false, false, false, false],
  ] as const)(
    'enforces the student, payment, user and role page boundary for %s',
    (code, students, payments, users, roles) => {
      const permissions = DEFAULT_CORE_ROLES.find((role) => role.code === code)!.permissions;
      expect(canAccess(permissions, '/students')).toBe(students);
      expect(canAccess(permissions, '/finance/payments')).toBe(payments);
      expect(canAccess(permissions, '/users')).toBe(users);
      expect(canAccess(permissions, '/roles')).toBe(roles);
      if (code !== 'super_admin') {
        expect(canAccess(permissions, '/unknown-module')).toBe(false);
      }
    },
  );
});
