import { describe, expect, it } from 'vitest';
import { getVisibleNavigation, navigationGroups } from '@/constants/navigation';

describe('Collapsible Sidebar Navigation Structure', () => {
  it('defines semantic IDs and icons for all labeled navigation groups', () => {
    for (const group of navigationGroups) {
      if (group.label) {
        expect(group.id).toBeDefined();
        expect(typeof group.id).toBe('string');
        expect(group.id!.length).toBeGreaterThan(0);
        expect(group.icon).toBeDefined();
        expect(group.items.length).toBeGreaterThan(0);
      }
    }
  });

  it('contains Student Management group with Students, Guardians & Parents, and Status History', () => {
    const studentGroup = navigationGroups.find((g) => g.id === 'student-management');
    expect(studentGroup).toBeDefined();
    expect(studentGroup?.label).toBe('Student Management');
    expect(studentGroup?.labelKh).toBe('ការគ្រប់គ្រងសិស្ស');

    const labels = studentGroup?.items.map((item) => item.label);
    expect(labels).toContain('Students');
    expect(labels).toContain('Guardians & Parents');
    expect(labels).toContain('Student Status History');

    const hrefs = studentGroup?.items.map((item) => item.href);
    expect(hrefs).toContain('/students');
    expect(hrefs).toContain('/guardians');
    expect(hrefs).toContain('/student-status-history');
  });

  it('preserves group id and icon when filtered through getVisibleNavigation', () => {
    const permissions = new Set([
      'student.view.own_branch',
      'branch.view.own_branch',
      'academic_rule.view.own_branch',
    ]);
    const visible = getVisibleNavigation(permissions, ['director']);

    const visibleStudentGroup = visible.find((g) => g.id === 'student-management');
    expect(visibleStudentGroup).toBeDefined();
    expect(visibleStudentGroup?.icon).toBeDefined();
    expect(visibleStudentGroup?.items.some((i) => i.href === '/students')).toBe(true);
  });

  it('renders Dashboard as a labeled group with role-specific destinations', () => {
    const dashboardGroup = navigationGroups.find((g) => g.id === 'dashboard');
    expect(dashboardGroup).toBeDefined();
    expect(dashboardGroup?.label).toBe('Dashboards');
    expect(dashboardGroup?.icon).toBeDefined();
    expect(dashboardGroup?.items[0].href).toBe('/dashboard');
    expect(dashboardGroup?.items.map((item) => item.href)).toEqual([
      '/dashboard',
      '/dashboard/executive',
      '/dashboard/staff-teacher',
      '/dashboard/students',
      '/dashboard/finance',
      '/dashboard/hr',
    ]);
  });

  it('filters dashboard destinations by canonical role and permission', () => {
    const teacherLinks = getVisibleNavigation(
      new Set(['class.view.assigned_class', 'attendance.view.assigned_class']),
      ['teacher'],
    )
      .flatMap((group) => group.items)
      .map((item) => item.href);
    expect(teacherLinks).toContain('/dashboard');
    expect(teacherLinks).toContain('/dashboard/staff-teacher');
    expect(teacherLinks).not.toContain('/dashboard/finance');
    expect(teacherLinks).not.toContain('/dashboard/hr');

    const staffLinks = getVisibleNavigation(new Set(['employee.view.own_record']), ['staff'])
      .flatMap((group) => group.items)
      .map((item) => item.href);
    expect(staffLinks).toContain('/dashboard/staff-teacher');
    expect(staffLinks).not.toContain('/dashboard/students');

    const financeLinks = getVisibleNavigation(new Set(['payment.view.own_branch']), [
      'finance_officer',
    ])
      .flatMap((group) => group.items)
      .map((item) => item.href);
    expect(financeLinks).toContain('/dashboard/finance');
    expect(financeLinks).not.toContain('/dashboard/staff-teacher');

    const administratorLinks = getVisibleNavigation(
      new Set(['payment.view.own_branch', 'student.view.own_branch']),
      ['administrator'],
    )
      .flatMap((group) => group.items)
      .map((item) => item.href);
    expect(administratorLinks).toContain('/dashboard/students');
    expect(administratorLinks).toContain('/dashboard/finance');
  });
});
