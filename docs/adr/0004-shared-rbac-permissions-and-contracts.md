# ADR-0004: Single Source of Truth for Auth, RBAC & Contracts (`@snp/shared`)

## Status

Accepted

## Context

Role-Based Access Control (RBAC), permission strings, and API Data Transfer Objects (DTOs) tend to drift between backend enforcement and frontend route guards when maintained in duplicate files.

## Decision

Designate `packages/shared` (`@snp/shared`) as the **sole canonical authority** for:

1. `SYSTEM_PERMISSIONS`: 356 granular permission strings (`SYSTEM_PERMISSIONS.<DOMAIN>_<ACTION>`).
2. `DEFAULT_CORE_ROLES`: 13 immutable core role definitions (`SUPER_ADMIN`, `SCHOOL_ADMIN`, `FINANCE_OFFICER`, `HEAD_TEACHER`, `TEACHER`, etc.).
3. `IMPLIED_SCOPES`: Implied permissions hierarchy for automatic role inheritance.
4. Validation schemas and DTO contracts used across both frontend forms and backend controllers.

Rule: Neither `apps/backend` nor `apps/frontend` may define independent permission constants or role sets. All references must import directly from `@snp/shared`.

## Consequences

- **Positive**:
  - Zero permission drift between backend authorization middleware and frontend navigation/button rendering.
  - Type-safe permission checking in both React components and Express routes.
- **Negative**:
  - Updating a permission code requires re-building or referencing `@snp/shared`.
