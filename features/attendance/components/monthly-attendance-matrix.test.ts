import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import { useAcademicYearsQuery } from '@/features/academic-years/hooks/use-academic-years';
import { useClassesQuery } from '@/features/classes/hooks/use-classes';
import { useEnrollmentsQuery } from '@/features/enrollments/hooks/use-enrollments';
import { useAttendanceListQuery } from '../hooks/use-attendance';
import { MonthlyAttendanceMatrix } from './monthly-attendance-matrix';

vi.mock('@/features/auth/context/auth-context', () => ({ useAuth: vi.fn() }));
vi.mock('@/features/branches/hooks/use-branches', () => ({ useBranchesQuery: vi.fn() }));
vi.mock('@/features/academic-years/hooks/use-academic-years', () => ({
  useAcademicYearsQuery: vi.fn(),
}));
vi.mock('@/features/classes/hooks/use-classes', () => ({ useClassesQuery: vi.fn() }));
vi.mock('@/features/enrollments/hooks/use-enrollments', () => ({ useEnrollmentsQuery: vi.fn() }));
vi.mock('../hooks/use-attendance', () => ({
  useAttendanceListQuery: vi.fn(),
  useMarkAttendanceMutation: vi.fn(() => ({ mutateAsync: vi.fn() })),
}));

describe('MonthlyAttendanceMatrix', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: { schoolId: 'sch-1', branchAccess: 'all' },
      currentBranchId: 'br-1',
      hasPermission: () => true,
    } as never);

    vi.mocked(useBranchesQuery).mockReturnValue({
      data: { data: [{ _id: 'br-1', branchNameEn: 'Main Campus' }] },
    } as never);

    vi.mocked(useAcademicYearsQuery).mockReturnValue({
      data: [{ _id: 'ay-1', name: '2025-2026' }],
    } as never);

    vi.mocked(useClassesQuery).mockReturnValue({
      data: { data: [{ _id: 'cls-1', className: 'Grade 10A', classCode: 'G10A' }] },
    } as never);

    vi.mocked(useEnrollmentsQuery).mockReturnValue({
      data: {
        data: [
          {
            _id: 'enr-1',
            studentId: {
              _id: 'stu-1',
              studentId: 'STU-001',
              firstName: 'Piseth',
              lastName: 'Mao',
              khmerName: 'ម៉ៅ ពិសិដ្ឋ',
            },
          },
        ],
      },
      isLoading: false,
    } as never);

    vi.mocked(useAttendanceListQuery).mockReturnValue({
      data: {
        data: [
          {
            _id: 'att-1',
            date: '2026-10-01',
            records: [{ studentId: 'stu-1', status: 'present' }],
          },
        ],
      },
      isLoading: false,
    } as never);
  });

  it('renders monthly attendance matrix with student identity and status legend', () => {
    const html = renderToStaticMarkup(createElement(MonthlyAttendanceMatrix));
    expect(html).toContain('Monthly Class Attendance Matrix');
    expect(html).toContain('STATUS LEGEND:');
    expect(html).toContain('ម៉ៅ ពិសិដ្ឋ');
    expect(html).toContain('STU-001');
    expect(html).toContain('Print A4 Matrix');
  });
});
