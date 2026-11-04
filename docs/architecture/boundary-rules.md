# Monorepo Architectural Boundary Rules

This document specifies the mandatory architectural boundaries, dependency directions, and isolation rules for the SNP-SMS Full-Stack Monorepo.

---

## 1. Monorepo Dependency Direction

```text
apps/frontend ────┐
                  ├──> packages/shared (@snp/shared) <─── apps/backend
packages/tsconfig ┘
packages/eslint-config
```

### Mandatory Rules

1. **Frontend Isolation**: `apps/frontend` must **NEVER** import from `apps/backend`. All shared types, DTO contracts, and permission constants must be imported from `@snp/shared`.
2. **Backend Isolation**: `apps/backend` must **NEVER** import from `apps/frontend`.
3. **Packages Independence**:
   - `packages/shared` has zero internal runtime dependencies on `apps/backend` or `apps/frontend`.
   - `packages/tsconfig` and `packages/eslint-config` provide shared tooling configurations only.

---

## 2. Backend 7-Layer Hierarchy & Encapsulation

Every domain module under `apps/backend/src/modules/<domain>/` strictly adheres to the vertical slice 7-layer pattern:

```text
HTTP Request
     │
     ▼
[ route.ts ]           Express path, parameter extraction, middleware attachment
     │
     ▼
[ controller.ts ]      Request parsing, validation triggering, status formatting
     │
     ▼
[ service.ts ]         Pure business logic, multi-document transactions, audit logging
     │
     ▼
[ repository.ts ]      Database read/write isolation, projection, query optimization
     │
     ▼
[ model.ts ]           Mongoose schemas, compound multi-tenant indexes
```

### Cross-Domain Communication Rules

- **No Direct Cross-Domain Model Imports**: Domain Module A must **NEVER** import the Mongoose model (`model.ts`) or repository (`repository.ts`) of Domain Module B.
- **Service-Only Interaction**: If Module A needs data or actions from Module B, it must call Module B's public service method (`service.ts`).

---

## 3. Multi-Tenancy & Data Scoping Rules

1. **Mandatory Tenant Scoping**:
   - Every read and write query in repositories must strictly enforce `schoolId`.
   - Branch-scoped resources must also enforce `branchId`.
2. **Zero Client Trust**:
   - Never trust `schoolId` or `branchId` passed in the request body from client users.
   - Always extract tenant context from the verified JWT payload (`req.user.schoolId`, `req.user.branchId`).
3. **Soft-Delete Enforcement**:
   - Queries must filter out deleted records with `{ isDeleted: false }` unless specifically auditing historical records.

---

## 4. Single Source of Truth for Auth & RBAC

1. All permission codes (`SYSTEM_PERMISSIONS`) must originate from `@snp/shared`.
2. All role definitions (`DEFAULT_CORE_ROLES`) must originate from `@snp/shared`.
3. No local copies, re-exports with alterations, or string literals for permissions are permitted.
