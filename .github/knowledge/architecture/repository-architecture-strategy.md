# Repository Architecture Strategy Guide

This guide establishes the mandatory repository architecture boundaries, workspace coupling invariants, and alternate deployment continuity standards for SNP-SMS contributors and automated coding agents.

---

## 1. Monorepo Boundary Invariants

1. **Zero Sibling App Coupling**: `apps/frontend` must NEVER import directly from `apps/backend` or vice versa.
2. **Canonical Contract Point**: All shared types, DTOs, schemas, and permissions MUST be imported from `@snp/shared`.
3. **Pure Shared Package**: `packages/shared` must remain 100% framework-agnostic with zero runtime dependencies on Express, Next.js, React, or Mongoose.
4. **Circular Dependency Ban**: Cyclic dependencies between workspaces or domain modules are strictly prohibited.
5. **Private Root**: Root `package.json` must always specify `"private": true`.

---

## 2. Verification Command

```bash
npm run verify:repo-strategy
```
