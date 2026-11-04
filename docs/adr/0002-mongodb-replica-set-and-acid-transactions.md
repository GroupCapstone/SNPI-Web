# ADR-0002: MongoDB Replica Set (`rs0`) & Multi-Document ACID Transactions

## Status

Accepted

## Context

Financial and academic operations (such as fee payments, student enrollments, course seat decrements, and report card finalizations) require strict ACID guarantees across multiple collections. Standalone MongoDB instances do not support multi-document transactions or change streams.

## Decision

Enforce a single-node or multi-node **MongoDB Replica Set** (`rs0`) in all development, staging, testing, and production environments.

Key architectural rules:

1. Multi-document operations (e.g. creating invoice + ledger transaction + receipt) must execute inside `session.withTransaction()`.
2. Connection URI must specify replica set membership (`replicaSet=rs0`).
3. Health check endpoints (`/api/v1/health`) must actively verify replica set ping and primary readiness.
4. Test suites run against in-memory MongoDB replica sets (`MongoMemoryReplicaSet`) to validate transaction behavior under automated CI.

## Consequences

- **Positive**:
  - Full ACID transaction safety across complex educational and financial flows.
  - Zero financial discrepancies or orphan database records during system crashes.
  - Enables MongoDB Change Streams for real-time audit logging and event dispatch.
- **Negative**:
  - Requires replica set initialization on fresh developer environments (`docker-compose.yml` provides automated `rs.initiate()`).
