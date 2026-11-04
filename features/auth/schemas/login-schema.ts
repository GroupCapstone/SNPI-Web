import { loginPayloadSchema, type LoginPayload } from '@snp/shared';

export const loginFormSchema = loginPayloadSchema;
export type LoginFormData = LoginPayload;
