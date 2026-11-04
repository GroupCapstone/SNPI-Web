import { z } from 'zod';

export const placementTestFormSchema = z
  .object({
    testNumber: z.string().trim().optional(),
    registrationId: z.string().optional(),
    studentId: z.string().optional(),
    studentName: z.string().trim().min(1, 'Student name is required').max(150),
    schoolId: z.string().min(1, 'School is required'),
    branchId: z.string().min(1, 'Campus Branch is required'),
    programId: z.string().min(1, 'Program is required'),
    recommendedLevelId: z.string().min(1, 'Recommended Level is required'),
    testDate: z.string().min(1, 'Test date is required'),
    score: z.number().min(0, 'Score cannot be negative'),
    maxScore: z.number().min(1, 'Max score must be at least 1'),
    examinerName: z.string().trim().max(100).optional(),
    status: z.enum(['scheduled', 'completed', 'passed', 'failed']),
    comments: z.string().trim().max(500).optional(),
  })
  .refine((data) => data.score <= data.maxScore, {
    message: 'Score cannot exceed maximum score',
    path: ['score'],
  });

export type PlacementTestFormData = z.infer<typeof placementTestFormSchema>;
