# ADR-0001: Modular Monolith Architecture & 7-Layer Pattern

## Status

Accepted

## Context

School Management Systems require high cohesion across domains (students, admissions, fee payments, scheduling, grading, and attendance) with strict multi-tenancy. A distributed microservices topology would introduce unnecessary network latency, distributed transaction complexity (Sagas), and deployment overhead at this phase. Conversely, an unstructured monolith leads to tight coupling, unmaintainable Spaghetti code, and blurred domain boundaries.

## Decision

Adopt a **Modular Monolith** architecture implemented as an npm workspace monorepo.
The backend API (`apps/backend`) encapsulates 47 domain modules in `src/modules/<domain>/`.

Every domain module strictly enforces the **7-Layer Architecture Pattern**:

1. `route`: HTTP route definition, parameter extraction, and authorization middleware attachment.
2. `controller`: Request decoding, input validation mapping, and HTTP response formatting.
3. `service`: Pure business logic, transactional orchestrations, and domain rules.
4. `repository`: Database access layer isolating Mongoose queries from business logic.
5. `model`: Mongoose schema, indexing, multi-tenant compound keys, and model definition.
6. `validation`: Zod input validation schemas for request bodies, queries, and params.
7. `types`: Domain-specific TypeScript interfaces and DTO definitions.

## Consequences

- **Positive**:
  - Clear separation of concerns within each of the 47 domain modules.
  - Testability: services and repositories can be unit-tested in isolation with mocks.
  - Future extractability: Any domain module can be extracted into an independent microservice with minimal refactoring.
- **Negative**:
  - Boilerplate overhead for simple CRUD endpoints across the 7 layers.
