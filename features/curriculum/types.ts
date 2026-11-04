import type { AcademicYearItem } from '@/features/academic-years/api/get-academic-years';
import type { Level } from '@/features/levels/types';
import type { Program } from '@/features/programs/types';
import type { Subject } from '@/features/subjects/types';

export interface CurriculumSubject {
  subjectId: Subject | string;
  weeklyHours: number;
  totalHours: number;
  sequence: number;
  passingScore?: number;
  isRequired: boolean;
}

export interface Curriculum {
  _id: string;
  schoolId?: string;
  programId: Program | { _id: string; code: string; nameEn: string; nameKh?: string };
  levelId: Level | { _id: string; code: string; name: string; sequence?: number };
  academicYearId:
    AcademicYearItem | { _id: string; name: string; code: string; isCurrent?: boolean };
  code: string;
  name: string;
  description?: string;
  subjects: CurriculumSubject[];
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCurriculumSubjectInput {
  subjectId: string;
  weeklyHours: number;
  totalHours: number;
  sequence: number;
  passingScore?: number;
  isRequired?: boolean;
}

export interface CreateCurriculumInput {
  schoolId?: string;
  programId: string;
  levelId: string;
  academicYearId: string;
  code: string;
  name: string;
  description?: string;
  subjects: CreateCurriculumSubjectInput[];
  status?: 'active' | 'inactive' | 'archived';
}

export interface UpdateCurriculumInput {
  programId?: string;
  levelId?: string;
  academicYearId?: string;
  code?: string;
  name?: string;
  description?: string;
  subjects?: CreateCurriculumSubjectInput[];
  status?: 'active' | 'inactive' | 'archived';
}

export interface CurriculumFilters {
  search?: string;
  programId?: string;
  levelId?: string;
  academicYearId?: string;
  status?: string;
  page?: number;
  limit?: number;
}
