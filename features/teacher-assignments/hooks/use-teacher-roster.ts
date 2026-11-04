import { useQuery } from '@tanstack/react-query';

import { getTeacherRosterMatrixApi } from '../api/teacher-assignment-api';
import type { TeacherRosterFilters } from '../types';

export const TEACHER_ROSTER_QUERY_KEY = 'teacher-roster-matrix';

export const useTeacherRosterQuery = (filters?: TeacherRosterFilters, enabled = true) => {
  return useQuery({
    queryKey: [TEACHER_ROSTER_QUERY_KEY, filters],
    queryFn: () => getTeacherRosterMatrixApi(filters),
    enabled,
  });
};
