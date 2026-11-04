## Summary of Changes

<!-- Provide an ultra-short, direct summary of changes in bulleted form. Zero emojis. -->

-

## Type of Change

- [ ] `feat`: New capability or domain endpoint
- [ ] `fix`: Bug fix or stability improvement
- [ ] `docs`: Documentation, architecture guide, or changelog update
- [ ] `refactor`: Internal refactoring with zero contract changes
- [ ] `test`: Unit, integration, or smoke test additions
- [ ] `chore`: Maintenance, dependencies, or CI/CD workflow updates

## Affected Workspaces

- [ ] `apps/backend` (Express 5 / Modular Monolith)
- [ ] `apps/frontend` (Next.js App Router / React 19)
- [ ] `packages/shared` (@snp/shared contracts and RBAC)
- [ ] `packages/tsconfig`
- [ ] `packages/eslint-config`
- [ ] `.github` (CI/CD and governance)

## Quality Gate Verification Checklist

All PRs must satisfy the standard verification pipeline:

- [ ] `npm run format:check` [PASSED]
- [ ] `npm run typecheck` [PASSED]
- [ ] `npm run smoke` [PASSED]
- [ ] `npm run test:api` [PASSED]
- [ ] `npm run test` [PASSED]
- [ ] `npm run build` [PASSED]
- [ ] `npm run changelog:sync` [PASSED]

## Security & Compliance Checklist

- [ ] Server-side tenant scoping (`schoolId`, `branchId`) strictly enforced
- [ ] Zero client-supplied permission overrides
- [ ] Zero hardcoded credentials or API tokens
- [ ] Multi-document ACID transactions executed within session contexts
- [ ] Zero dark mode CSS rules introduced (Strict Light Mode Only)
- [ ] Zero emojis included in code, comments, or documentation
