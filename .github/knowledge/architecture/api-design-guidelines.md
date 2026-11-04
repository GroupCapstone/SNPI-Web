---
Last updated: 2026-11-03
Domain: architecture
Version: 1.0
Reviewed by: Architecture Review Board
---

# Enterprise REST API Design Guidelines

## 1. REST Endpoint Conventions

- **Base Route Pattern**: All API endpoints follow `/api/v1/<domain-resource>`.
- **Plural Nouns**: Resource collections use plural kebab-case nouns (e.g., `/students`, `/academic-years`, `/audit-logs`).
- **HTTP Verbs**:
  - `GET`: Read resource or collection (idempotent, safe).
  - `POST`: Create resource or initiate action.
  - `PUT`: Full resource replacement.
  - `PATCH`: Partial resource update.
  - `DELETE`: Soft-delete or archive resource.

## 2. Standardized Response Envelopes

Every API response strictly follows the enterprise envelope:

```typescript
// Success Response
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error Response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

## 3. Pagination Standards

- **Query Parameters**: Standardized `page` (default 1) and `limit` (default 20, max 100).
- **Pagination Metadata Envelope**:
  ```typescript
  interface PaginatedResult<T> {
    items: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }
  ```

## 4. Contract Stability

- **Preserve API Paths**: Never alter existing route paths or payload shapes without semver major version bumps.
- **Contract Verification**: All 193 API endpoints across 47 domains are verified via `npm run test:api`.
