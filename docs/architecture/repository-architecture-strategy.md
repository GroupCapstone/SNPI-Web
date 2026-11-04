# Repository Architecture Strategy Architecture

> Authoritative architectural specification for repository strategy (Monorepo vs. Polyrepo), workspace boundaries, circular dependency prevention, and alternate deployment continuity for SNP-SMS based on the GitHub Well-Architected Framework.

---

## 1. Executive Summary

SNP-SMS is architected as an **Enterprise TypeScript Monorepo** powered by `npm workspaces` and a 7-layer modular monolith backend. This decision is grounded in the GitHub Well-Architected Framework:

```
+-----------------------------------------------------------------------------------------+
| SNP-SMS Enterprise Monorepo Topology                                                    |
|                                                                                         |
|  [apps/frontend] (Next.js 15)  <----+                +----> [apps/backend] (Express 5)  |
|                                     |                |                                  |
|                                     +--- [packages/shared] ---+                          |
|                                          (@snp/shared)                                  |
|                                     +------------------------+                          |
|                                     |                                                   |
|                [packages/tsconfig] -+-------- [packages/eslint-config]                  |
+-----------------------------------------------------------------------------------------+
```

### Strategic Decision Criteria

- **Unified Contracts**: API contracts, Zod schemas, DTOs, and RBAC permissions reside in `@snp/shared`, consumed natively by both frontend and backend without network serialization overhead.
- **Atomic Migrations**: Full-stack feature releases (such as new domain models and UI screens) are committed atomically, preventing interface mismatch regressions.
- **Strict Boundaries**: Sibling applications (`apps/frontend` and `apps/backend`) never import each other directly; coupling is restricted to `@snp/shared`.
- **Zero Framework Leaks**: `@snp/shared` remains pure TypeScript, strictly free from runtime framework dependencies (Express, Next.js, Mongoose, React).

---

## 2. The 10 Design Strategies Implementation

1. **Project Structure**: Partitioned across `apps/*`, `packages/*`, and `infrastructure/*`.
2. **Dependency Management**: Root-hoisted devDependencies with deterministic `package-lock.json`.
3. **Version Control**: Protected `main` branch with mandatory pull requests and status checks.
4. **CI/CD Optimization**: Monorepo-aware test scripts and pre-deployment quality gates.
5. **Code Quality**: Shared `@snp/tsconfig` and `@snp/eslint-config` enforcing 100% strict typing.
6. **Documentation**: Centralized `/document` developer portal actively synced with `CHANGELOG.md`.
7. **Access Control**: `.github/CODEOWNERS` mandating domain-specific code reviews.
8. **Release Strategy**: Unified semantic versioning (`v0.2.x`) across monorepo packages.
9. **Scalability Guard**: Automated circular dependency detection across workspace packages.
10. **Automation**: Standardized `npm run verify:*` test scripts for all architecture gates.

---

## 3. Alternate Deployment Continuity & Resilient Invocation

For scenarios where primary CI/CD orchestration is disrupted:

- **Immutable Release Artifacts**: Deploy existing pre-built, cryptographically signed release digests.
- **Reconciliation Logging**: Audit release digest, target environment, operator identity, and health checks before replay.

---

## 4. Automated Verification Engine

```bash
npm run verify:repo-strategy
```
