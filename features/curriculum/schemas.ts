import { z } from 'zod';

export const curriculumSubjectSchema = z.object({
  subjectId: z.string().min(1, 'Subject is required'),
  weeklyHours: z.number().min(0.5, 'Weekly hours must be at least 0.5').max(50),
  totalHours: z.number().min(1, 'Total hours must be at least 1').max(1000),
  sequence: z.number().int().min(1, 'Sequence must be at least 1'),
  passingScore: z.number().min(0).max(100).optional(),
  isRequired: z.boolean(),
});

export const curriculumFormSchema = z.object({
  programId: z.string().min(1, 'Program is required'),
  levelId: z.string().min(1, 'Level is required'),
  academicYearId: z.string().min(1, 'Academic Year is required'),
  code: z
    .string()
    .min(1, 'Code cannot be empty')
    .max(30, 'Code cannot exceed 30 characters')
    .trim()
    .toUpperCase(),
  name: z.string().min(1, 'Curriculum name is required').trim(),
  description: z.string().optional(),
  subjects: z
    .array(curriculumSubjectSchema)
    .min(1, 'At least one subject is required in curriculum'),
  status: z.enum(['active', 'inactive', 'archived']),
});

export type CurriculumFormValues = z.infer<typeof curriculumFormSchema>;
