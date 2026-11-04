---
Last updated: 2026-11-03
Domain: security
Version: 1.0
Reviewed by: Security Review Board
---

# Secure Coding Standards

## 1. Multi-Tenant Scoping & Isolation

- **Tenant Scope Enforcement**: Every database query, repository call, and service operation MUST explicitly filter by `schoolId` and, where applicable, `branchId`.
- **Zero Client Trust**: Never trust client-supplied `schoolId` or `branchId` in request bodies or query parameters. Always resolve tenant identity server-side from the verified JWT payload (`req.user.schoolId`, `req.user.branchId`).
- **Cross-Tenant Prevention**: Operations attempting to access entities outside the authenticated user's tenant scope must fail immediately with HTTP 403 Forbidden.

## 2. Input Validation & Sanitization

- **Strict Zod Schemas**: Every route MUST validate incoming `params`, `query`, and `body` using Zod schemas before hitting business logic.
- **Strict Typing**: Disallow `any` types. All payloads must be strictly typed via shared contracts in `@snp/shared`.
- **String Sanitization**: Trim all incoming strings and sanitize against XSS and control character injection.

## 3. Cryptographic Key & Secret Hygiene

- **Zero Plaintext Secrets**: Passwords, tokens, database credentials, and API keys must NEVER be logged, committed to git, or exposed in error messages.
- **Environment Isolation**: Secrets must be injected strictly via environment variables validated at startup.
- **Key Rotation**: Rotate JWT secrets and cryptographic keys according to the enterprise 90-day lifecycle.

## 4. Rate Limiting & Abuse Prevention

- **API Endpoint Protection**: Enforce global and per-route rate limits via Express rate-limiting middleware.
- **Auth Endpoint Throttling**: Login and credential-sensitive endpoints must enforce strict IP- and user-based backoff to prevent brute-force attacks.
