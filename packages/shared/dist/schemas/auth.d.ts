import { z } from 'zod';
export declare const loginPayloadSchema: z.ZodObject<{
    identifier: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
