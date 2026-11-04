import { z } from 'zod';

export const healthResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    service: z.literal('SNP-SMS API'),
    status: z.literal('healthy'),
    version: z.string(),
    timestamp: z.iso.datetime(),
  }),
});
