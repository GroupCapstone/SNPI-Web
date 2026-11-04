---
Last updated: 2026-11-04
Domain: architecture
Version: 1.0
Reviewed by: Architecture Review Board
Status: Authoritative Enterprise Standard
Related Skill: .agents/skills/api-stylebook-design-topics/SKILL.md
---

# API Stylebook: REST API Design Topics & Enterprise Guidelines

This enterprise knowledge base document establishes the authoritative REST API design taxonomy and cross-guideline standards for the SNP-SMS platform, synthesizing guidelines from 16 industry leaders through Arnaud Lauret's **API Stylebook** framework.

## 1. Scope & Foundation

- **Taxonomy Breadth**: 17 Design Categories, 100 Normalized Topics, and 1,051 Curated References across 16 enterprise guidelines (Google Cloud, Microsoft, Zalando, PayPal, Cisco, Heroku, Atlassian, Red Hat, White House, Adidas, Haufe, etc.).
- **Monorepo Implementation**: Maps directly to `apps/backend/src/modules/` (Express 5, TypeScript 7-layer modular monolith) and `@snp/shared` (canonical DTOs and Zod validation schemas).
- **Authoritative Skill**: [`.agents/skills/api-stylebook-design-topics/SKILL.md`](file:///Users/Apple16/Desktop/SNP-SMS/.agents/skills/api-stylebook-design-topics/SKILL.md).
- **Full Catalog**: [`.agents/skills/api-stylebook-design-topics/references/api-stylebook-design-topics.md`](file:///Users/Apple16/Desktop/SNP-SMS/.agents/skills/api-stylebook-design-topics/references/api-stylebook-design-topics.md).
- **Cross-Guideline Matrix**: [`.agents/skills/api-stylebook-design-topics/references/guidelines-matrix.md`](file:///Users/Apple16/Desktop/SNP-SMS/.agents/skills/api-stylebook-design-topics/references/guidelines-matrix.md).

## 2. Core REST API Design Invariants

### 2.1. URI Grammar & Resource Hierarchy

- Base URL format: `/api/v1/<resource-collection>`.
- Collections use plural nouns in lowercase `kebab-case` (`/api/v1/fee-invoices`, `/api/v1/student-attendances`).
- Sub-resource nesting capped at maximum 2 levels (`/schools/:schoolId/branches/:branchId`).
- Custom non-CRUD operations modeled as sub-resource action verbs (`POST /api/v1/fee-invoices/:id/cancel`).

### 2.2. HTTP Method Semantics

- `GET`: Safe, idempotent read operations (`200 OK`).
- `POST`: Non-idempotent resource creation (`201 Created` with `Location` header) or action execution.
- `PUT`: Idempotent full resource replacement (`200 OK` or `204 No Content`).
- `PATCH`: Partial resource updates adhering to RFC 7396 Merge Patch (`200 OK`).
- `DELETE`: Idempotent resource removal (`200 OK` or `204 No Content`).

### 2.3. Standardized Status Codes & RFC 7807 Error Envelopes

- Never mask errors behind `200 OK`.
- Standard success: `200 OK`, `201 Created`, `202 Accepted` (async), `204 No Content`.
- Standard client errors: `400 Bad Request`, `401 Unauthorized`, `403 Forbidden` (RBAC/tenant scope), `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity` (validation failure), `429 Too Many Requests`.
- Standard server errors: `500 Internal Server Error`, `501 Not Implemented`, `503 Service Unavailable`.
- Error bodies must adhere to `application/problem+json` format with `type`, `title`, `status`, `detail`, `code`, and `invalidParams`.

### 2.4. Data Representation & Formatting

- JSON keys strictly in `camelCase`.
- Temporal values in UTC ISO 8601 strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- Currency and financial amounts must use integer subunits (cents) or fixed precision strings, never floating-point numbers.
- Collections enforce cursor-based pagination (`limit`, `after`) or page-based pagination (`page`, `limit`).

### 2.5. Multi-Tenant Scoping Invariant

- Every backend read and write operation must strictly enforce tenant boundaries (`schoolId`, `branchId`) from authenticated session credentials.
- Client-supplied tenant IDs must never be trusted without server-side permission validation.
- Sensitive comparisons, tokens, and hashes must use constant-time `crypto.timingSafeEqual`.
