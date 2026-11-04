# ADR-0007: Enterprise REST API & Security Standards (RFC 7807, Idempotency, HMAC Signatures & OpenAPI 3.1)

## Status

Accepted

## Context

As the SNP-SMS platform scales across 47 domain modules and 193 API endpoints, robust enterprise API governance and zero-trust security standards are essential. Financial transactions, grade recording, and enrollment mutations require strict idempotency to prevent duplicate submissions from network retries. External webhook integrations require cryptographic authenticity verification. API consumers benefit from RFC-standardized error problem details and machine-readable OpenAPI contracts without breaking existing legacy clients.

## Decision

1. **RFC 7807 / RFC 9457 Problem Details Error Formatting**:
   - Enhanced `apps/backend/src/middleware/error-handler.ts` to support RFC 7807 problem details when requested via `Accept: application/problem+json` or `?format=rfc7807`.
   - Provides standardized fields: `type`, `title`, `status`, `detail`, `instance`, `code`, and `invalidParams`.
   - Preserves standard JSON error envelope `{ success: false, message, code, errors }` by default to ensure 100% backwards compatibility with existing clients and test assertions.
   - Emits programmatic response header `X-Error-Code: <code>`.

2. **Idempotency Key Middleware (`apps/backend/src/middleware/idempotency.ts`)**:
   - Protects mutating operations (`POST`, `PUT`, `PATCH`, `DELETE`) with an optional `Idempotency-Key` header (16–128 character alphanumeric / UUIDv4).
   - Tenancy-scoped in-memory cache (`${schoolId}:${method}:${path}:${key}`) with 5-minute TTL and automatic periodic pruning.
   - Concurrent requests with identical keys in `PENDING` state return `409 Conflict`.
   - Completed requests in `RESOLVED` state replay the exact cached response with `Idempotent-Replay: true`.

3. **Cryptographic HMAC-SHA256 Payload Signing (`apps/backend/src/middleware/signature.ts`)**:
   - Utilities `computeHmacSha256()` and `verifyHmacSha256()` for external webhooks and ledger event streams.
   - Enforces constant-time buffer comparison (`crypto.timingSafeEqual`) to eliminate timing side-channel attacks.
   - Middleware `createSignatureVerificationMiddleware()` enforces `X-Signature-SHA256` authenticity before processing requests.

4. **HTTP ETag & Conditional GET Validation (`apps/backend/src/middleware/etag.ts`)**:
   - Emits weak SHA-256 ETags (`W/"<hash>"`) on `GET` and `HEAD` responses.
   - Evaluates `If-None-Match` request headers and immediately emits `304 Not Modified` when contents have not changed, reducing client latency and bandwidth.

5. **OpenAPI 3.1 Specification & Explorer (`apps/backend/src/docs/openapi.json`)**:
   - Machine-readable contract published at `GET /api/v1/docs/openapi.json`.
   - Lightweight, self-contained HTML API documentation explorer hosted at `GET /api/v1/docs` (completely offline-resilient with zero external CDN dependencies).

## Consequences

- **Positive**:
  - Eliminates duplicate payment, tuition, and enrollment submissions caused by network retries.
  - Standardizes error diagnostics across enterprise third-party integrations with RFC 7807.
  - Protects inbound webhook endpoints against forged payloads and replay attacks using HMAC signatures.
  - Zero breaking changes to existing 193 REST API endpoints or frontend clients.
- **Negative**:
  - Memory consumption for active idempotency entries during high concurrency (mitigated by 5-minute TTL and periodic garbage collection).
