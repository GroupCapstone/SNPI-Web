import { createElement, type ComponentProps } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DEFAULT_CORE_ROLES } from '@/test-fixtures/permission-catalog.json';
import { checkUserPermission } from '@/lib/permissions';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useClassRosterAttendanceQuery, useMarkAttendanceMutation } from '../hooks/use-attendance';
import { AttendanceSheet } from './attendance-sheet';

vi.mock('@/features/auth/context/auth-context', () => ({ useAuth: vi.fn() }));
vi.mock('@/features/branches/hooks/use-branches', () => ({ useBranchesQuery: vi.fn() }));
vi.mock('@/features/academic-years/hooks/use-academic-years', () => ({
  useAcademicYearsQuery: vi.fn(),
}));
vi.mock('@/features/classes/hooks/use-classes', () => ({ useClassesQuery: vi.fn() }));
vi.mock('../hooks/use-attendance', () => ({
  useClassRosterAttendanceQuery: vi.fn(),
  useMarkAttendanceMutation: vi.fn(),
}));

const captured = vi.hoisted(() => ({ buttons: [] as ComponentProps<'button'>[] }));
vi.mock('@/components/ui/button', () => ({
  Button: (props: ComponentProps<'button'>) => {
    captured.buttons.push(props);
    return createElement('button', props);
  },
}));

const schoolId = '507f1f77bcf86cd799439001';
const branchId = '507f1f77bcf86cd799439002';
const academicYearId = '507f1f77bcf86cd799439003';
const classId = '507f1f77bcf86cd799439004';
const studentId = '507f1f77bcf86cd799439005';
const teacherPermissions = DEFAULT_CORE_ROLES.find((role) => role.code === 'teacher')!.permissions;

describe('teacher attendance without administrative lookups', () => {
  const mutateAsync = vi.fn();
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    captured.buttons = [];
    mutateAsync.mockResolvedValue({});
    vi.mocked(useAuth).mockReturnValue({
      user: { schoolId: { _id: schoolId }, branchAccess: [branchId] },
      currentBranchId: branchId,
      hasPermission: (permission: string) => checkUserPermission(teacherPermissions, permission),
    } as never);
    vi.mocked(useBranchesQuery).mockReturnValue({ data: undefined } as never);
    vi.mocked(useAcademicYearsQuery).mockReturnValue({ data: undefined } as never);
    vi.mocked(useClassRosterAttendanceQuery).mockReturnValue({
      data: {
        data: {
          roster: [
            {
              studentId,
              studentCode: 'STU-1',
              firstName: 'Test',
              lastName: 'Student',
              status: 'present',
            },
          ],
        },
      },
      isLoading: false,
      isError: false,
    } as never);
    vi.mocked(useMarkAttendanceMutation).mockReturnValue({
      mutateAsync,
      isPending: false,
    } as never);
  });
  afterEach(() => vi.useRealTimers());

  it.each([true, false])(
    'saves using class context with populated references: %s',
    async (populated) => {
      vi.mocked(useClassesQuery).mockReturnValue({
        data: {
          data: [
            {
              _id: classId,
              className: 'Assigned Class',
              classCode: 'CLS-1',
              branchId: populated ? { _id: branchId, branchNameEn: 'Main Branch' } : branchId,
              academicYearId: populated
                ? { _id: academicYearId, name: '2026-2027' }
                : academicYearId,
            },
          ],
        },
      } as never);
      const markup = renderToStaticMarkup(createElement(AttendanceSheet));
      expect(markup).toContain('Assigned Class');
      expect(useBranchesQuery).toHaveBeenCalledWith(expect.any(Object), false);
      expect(useAcademicYearsQuery).toHaveBeenCalledWith(undefined, false);
      expect(useClassRosterAttendanceQuery).toHaveBeenCalledWith(classId, expect.any(String));
      const save = captured.buttons.find((button) => button.onClick?.name === 'handleSave');
      expect(save).toBeDefined();
      expect(save?.disabled).toBe(false);
      await save!.onClick!(undefined as never);
      expect(mutateAsync).toHaveBeenCalledWith({
        schoolId,
        branchId,
        academicYearId,
        classId,
        date: expect.any(String),
        records: [{ studentId, status: 'present', remarks: undefined }],
      });
    },
  );

  it('blocks save when a class is missing its academic year', async () => {
    vi.mocked(useClassesQuery).mockReturnValue({
      data: {
        data: [
          {
            _id: classId,
            className: 'Assigned Class',
            classCode: 'CLS-1',
            branchId,
            academicYearId: null,
          },
        ],
      },
    } as never);
    renderToStaticMarkup(createElement(AttendanceSheet));
    const save = captured.buttons.find((button) => button.onClick?.name === 'handleSave');
    expect(save?.disabled).toBe(true);
    await save!.onClick!(undefined as never);
    expect(mutateAsync).not.toHaveBeenCalled();
  });
});
