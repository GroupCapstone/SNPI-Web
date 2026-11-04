# ADR-0006: Public REST API, Cryptographic Ledger Verification & Pretty-Printed JSON Viewer

## Status

Accepted

## Context

SNP-SMS issues official academic certificates and transcripts that require public verification by external universities, employers, and government agencies. To prevent fraudulent alterations, certificate authenticity must be cryptographically verified against immutable ledger records. Furthermore, public consumers, developers, and mobile applications require a transparent, high-visibility REST API with GitHub-style pretty-printed JSON display, rate limiting, and strict credential isolation.

## Decision

1. **Four-Tier Access & Credential Isolation**:
   - **Public (Unauthenticated)**: Accesses `GET /api/v1/reports/certificates/verify/:code`. Receives SHA-256 content hashes, Merkle root proof, and verification status. Sensitive Fabric transaction credentials and signing identities are strictly omitted.
   - **Authenticated Student / Parent**: Accesses own certificates and academic honors.
   - **Authorized Staff / Registrar**: Authorized by branch RBAC permissions to issue and audit certificates.
   - **Internal Service / Fabric Operator**: Authenticated via `X-Service-Token` or `SUPER_ADMIN`. Receives Fabric transaction credentials, MSP identifiers, and ledger signing endpoints.
2. **Cryptographic Ledger Integrity**:
   - The stored certificate payload is dynamically hashed via SHA-256 (`crypto.createHash('sha256')`).
   - The computed hash is compared against the immutable database `contentHash` recorded at generation time.
   - If hashes match, status `COMMITTED_TAMPER_PROOF` is returned; if altered, `TAMPER_DETECTED` is flagged with `valid: false`.
3. **GitHub-Inspired REST API & Response Viewer**:
   - Supports `?pretty=true` and standard rate limit headers (`X-Verification-Engine: SNP-Fabric-SHA256`).
   - Frontend provides a dual-mode viewer at `/verify/certificates/[code]`: Visual Certificate Card and an interactive, syntax-highlighted GitHub-style JSON Response Viewer with copy, download, and latency metrics.
4. **Rate Limiting**:
   - Public verification endpoint is protected by `publicVerificationRateLimiter` (60 requests per 15-minute window with draft-8 headers).

## Consequences

- **Positive**:
  - Tamper-proof certificate integrity with public cryptographic verification.
  - Zero risk of leaking private blockchain / Fabric credentials to public consumers.
  - Exceptional developer experience with GitHub-style pretty-printed JSON responses.
- **Negative**:
  - Adds minor payload overhead for the `ledger` verification metadata.
