# Architecture Decision Records (ADRs)

This directory documents key architectural decisions for the SNP-SMS monorepo following Michael Nygard's Architecture Decision Record (ADR) standard.

## Index of Decisions

| ADR                                                                 | Title                                                                            | Status   | Date       |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------- | :------- | :--------- |
| [ADR-0001](0001-modular-monolith-architecture.md)                   | Modular Monolith Architecture & 7-Layer Pattern                                  | Accepted | 2026-10-29 |
| [ADR-0002](0002-mongodb-replica-set-and-acid-transactions.md)       | MongoDB Replica Set (`rs0`) & Multi-Document ACID Transactions                   | Accepted | 2026-10-29 |
| [ADR-0003](0003-serverless-frontend-container-backend-hybrid.md)    | Serverless Frontend & Long-Running Container Backend Proxy                       | Accepted | 2026-10-29 |
| [ADR-0004](0004-shared-rbac-permissions-and-contracts.md)           | Single Source of Truth for Auth, RBAC & Contracts (`@snp/shared`)                | Accepted | 2026-10-29 |
| [ADR-0005](0005-portable-ownership-and-future-transfer-protocol.md) | Portable Institutional Ownership & Transfer Protocol                             | Accepted | 2026-10-29 |
| [ADR-0006](0006-public-rest-api-certificate-ledger-verification.md) | Public REST API, Cryptographic Ledger Verification & Pretty-Printed JSON Viewer  | Accepted | 2026-10-29 |
| [ADR-0007](0007-enterprise-rest-api-and-security-standards.md)      | Enterprise REST API & Security Standards (RFC 7807, Idempotency, HMAC & OpenAPI) | Accepted | 2026-10-29 |
