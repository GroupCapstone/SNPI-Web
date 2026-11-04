import { z } from 'zod';

export const studentTransferFormSchema = z
  .object({
    transferNumber: z.string().trim().optional(),
    studentId: z.string().min(1, 'Student is required'),
    fromSchoolId: z.string().min(1, 'Source school is required'),
    toSchoolId: z.string().min(1, 'Destination school is required'),
    fromBranchId: z.string().min(1, 'Source branch is required'),
    toBranchId: z.string().min(1, 'Destination branch is required'),
    fromClassId: z.string().optional(),
    toClassId: z.string().optional(),
    transferDate: z.string().min(1, 'Transfer date is required'),
    reason: z.string().trim().min(3, 'Transfer reason is required').max(500),
    remarks: z.string().trim().max(500).optional(),
  })
  .refine((data) => data.fromBranchId !== data.toBranchId, {
    message: 'Destination branch must be different from source branch',
    path: ['toBranchId'],
  });

export type StudentTransferFormData = z.infer<typeof studentTransferFormSchema>;
