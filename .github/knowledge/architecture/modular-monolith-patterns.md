---
Last updated: 2026-11-03
Domain: architecture
Version: 1.0
Reviewed by: Architecture Review Board
---

# Modular Monolith Patterns & 7-Layer Architecture

## 1. Domain Module Isolation

- **Directory Structure**: Every domain module in `apps/backend/src/modules/<domain>/` strictly isolates its responsibilities across 7 layers:
  ```text
  routes.ts -> controller.ts -> service.ts -> repository.ts -> model.ts -> validation.ts -> types.ts
  ```
- **Boundary Invariant**: A domain service may call another domain's service, but MUST NEVER directly query another domain's repository or model.

## 2. Layer Responsibilities

- **Routes Layer**: Declare HTTP routes, attach authentication middleware, permission gates, and rate limiters.
- **Controller Layer**: HTTP transport handling. Parse params, invoke services, return standardized envelopes. Zero business logic.
- **Service Layer**: Pure business logic and domain validation. Orchestrates multi-document ACID transactions via Mongoose sessions.
- **Repository Layer**: Data access layer. Executes Mongoose operations strictly filtered by tenant scope (`schoolId`, `branchId`).
- **Model Layer**: Mongoose schema declarations with compound indexes, soft-delete hooks, and audit fields.
- **Validation Layer**: Zod validation schemas for request parameters, query strings, and payloads.
- **Types Layer**: TypeScript type definitions, domain interfaces, and DTO contracts.

## 3. ACID Transactions with Mongoose

- **Session Lifecycle**: Multi-document mutations across entities must use MongoDB replica set sessions:
  ```typescript
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // operations with { session }
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
  ```
- **Replica Set Mandate**: Transactions require a MongoDB replica set (`rs0`) in both local development and production.
