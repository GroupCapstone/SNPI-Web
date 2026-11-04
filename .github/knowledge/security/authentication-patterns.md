---
Last updated: 2026-11-03
Domain: security
Version: 1.0
Reviewed by: Security Review Board
---

# Authentication & Authorization Patterns

## 1. Password Hashing with Argon2id

- **Algorithm Standard**: All user passwords must be hashed using `argon2id` (memory cost: 65,536 KiB, time cost: 3 iterations, parallelism: 4 threads).
- **Salt Generation**: Cryptographically secure 16-byte random salts per password hash.
- **Timing Attack Resistance**: Password verification must use constant-time comparisons.

## 2. Dual-Token Architecture

- **Access Token (Short-Lived)**:
  - Format: Signed JWT containing user ID, role, tenant scope (`schoolId`, `branchId`), and token version.
  - Lifetime: 15 minutes.
  - Delivery: Transmitted via `Authorization: Bearer <token>` header.
- **Refresh Token (Long-Lived)**:
  - Format: Cryptographically secure random UUID or signed token stored hashed in MongoDB.
  - Lifetime: 7 days.
  - Delivery: Transmitted strictly via `httpOnly`, `secure`, `sameSite=strict` cookies.
  - Token Rotation: Single-use refresh token rotation; reusing an expired/revoked refresh token revokes all user sessions immediately.

## 3. RBAC & Implied Scope Hierarchy

- **Single Source of Truth**: All permission codes (`SYSTEM_PERMISSIONS`) and default roles (`DEFAULT_CORE_ROLES`) MUST be imported from `@snp/shared`.
- **Permission Checking**:
  - Middleware: `authorize(permissionCode)`.
  - Implied Scopes: Wildcard permissions (e.g., `academic:*`) automatically resolve implied sub-permissions (`academic:read`, `academic:write`).
- **Dynamic Policy Enforcement**: Permissions must be evaluated against active roles stored in the database on sensitive actions.
