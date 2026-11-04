"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPayloadSchema = void 0;
const zod_1 = require("zod");
exports.loginPayloadSchema = zod_1.z.object({
    identifier: zod_1.z.string().trim().min(1, 'Username or email is required'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
