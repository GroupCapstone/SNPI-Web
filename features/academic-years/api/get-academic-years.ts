import { getAcademicYears as fetchAcademicYears } from './academic-year-api';
import type { AcademicYear, AcademicYearFilters } from '../types';

export type AcademicYearItem = AcademicYear;

export const getAcademicYears = async (
  filters?: AcademicYearFilters | unknown,
): Promise<AcademicYearItem[]> => {
  return fetchAcademicYears(filters);
};
