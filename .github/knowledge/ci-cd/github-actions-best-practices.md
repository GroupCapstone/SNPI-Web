---
Last updated: 2026-11-03
Domain: ci-cd
Version: 1.0
Reviewed by: DevOps & Platform Engineering Board
---

# GitHub Actions Best Practices

## 1. Action Pinning & Supply Chain Security

- **Full Commit SHA Pinning**: Pin all third-party GitHub Actions to immutable full commit SHAs (40 characters) rather than mutable tags or branch names:
  ```yaml
  uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
  ```
- **Dependabot Integration**: Configure Dependabot to automatically monitor action SHAs and propose pull request updates with release notes.

## 2. Least-Privilege Permissions

- **Default Read-Only**: Workflows enforce top-level read-only permissions by default:
  ```yaml
  permissions:
    contents: read
  ```
- **Job-Specific Elevation**: Elevate permissions strictly at the specific job level where write access (e.g., `packages: write`, `id-token: write`) is required.

## 3. Pre-Push Quality Gates

- **10-Step Automated Pipeline**: Every deployment and release checkpoint executes `npm run push:checkpoint`:
  1. Prettier formatting verification (`npm run format:check`).
  2. ESLint quality gate across all workspaces (`npm run lint`).
  3. TypeScript static analysis (`npm run typecheck`).
  4. Monorepo smoke tests (`npm run smoke`).
  5. Deployment gate verification (`npm run deploy:verify`).
  6. Dual-developer git reconciliation (`npm run git:sync`).
  7. Real-time changelog synchronization (`npm run changelog:sync`).
  8. Git commit and annotated release checkpoint tag.
  9. Push to GitHub with 500MB buffer configuration.
  10. Live GitHub Actions monitoring until 100% green (`npm run push:verify`).
