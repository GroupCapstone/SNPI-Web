# GitHub Repository Threat Model Guide

This guide establishes the mandatory repository-level security policies and source code integrity invariants for SNP-SMS contributors and automated coding agents.

---

## 1. The 8 Core Threat Mitigations

1. **T-01 Secret Scanning**: Never commit real credentials. Enforce Secret Scanning Push Protection.
2. **T-02 Private Access**: Keep repository private; federate identities via Enterprise Managed Users.
3. **T-03 Danger Zone Policy**: Only Organization Admins may delete or transfer repositories.
4. **T-04 History Immutability**: Force pushes and branch deletions are strictly blocked via rulesets.
5. **T-05 Pull Request Mandatory**: All commits to `main` must pass through PRs and verified status checks.
6. **T-06 Independent Review**: Self-merging and self-approvals are blocked. Requires minimum 1 peer review.
7. **T-07 Identity Integrity**: Enforce two-factor authentication (2FA) and cryptographic commit signatures.
8. **T-08 Workflow Hardening**: Pin all GitHub Actions to full 40-character commit SHAs.

---

## 2. Verification Command

```bash
npm run verify:threat-model
```
