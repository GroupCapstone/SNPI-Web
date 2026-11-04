---
Last updated: 2026-11-03
Domain: architecture
Version: 1.0
Reviewed by: Architecture Review Board
---

# Database Architecture & Mongoose Standards

## 1. Multi-Tenant Indexing Strategy

- **Compound Tenant Indexes**: Every collection must define compound indexes beginning with tenant fields:
  ```typescript
  schema.index({ schoolId: 1, branchId: 1, createdAt: -1 });
  schema.index({ schoolId: 1, code: 1 }, { unique: true });
  ```
- **Index Naming**: All custom indexes must use explicit semantic names to assist query plan analysis.

## 2. Soft-Delete Policy

- **Non-Destructive Deletes**: Business entities must implement soft-deletes via `isDeleted: boolean` and `deletedAt: Date | null` flags.
- **Default Filter Hook**: Mongoose pre-find hooks automatically filter out `{ isDeleted: true }` unless `{ includeDeleted: true }` is specified.
- **Hard-Delete Restrictions**: Hard deletion (`deleteOne`, `deleteMany`) is strictly restricted to temporary test fixtures and ephemeral sessions.

## 3. Schema Discipline

- **Timestamps**: All schemas MUST enable `{ timestamps: true }` to maintain `createdAt` and `updatedAt`.
- **Enum Validation**: Enums must match shared contracts in `@snp/shared` to prevent database/client drift.
- **Strict Mode**: Schemas enforce `{ strict: true }` to reject undeclared fields on insert or update.
