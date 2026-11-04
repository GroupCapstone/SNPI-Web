# Securing GitHub Actions Workflows Guide

This guide establishes the mandatory workflow security rules for all CI/CD workflows in the SNP-SMS repository.

---

## 1. Key Invariants

1. **Immutable Action Pinning**: Pin all `uses:` actions to full 40-character commit SHAs. Include semantic version in an inline comment.
2. **Least Privilege**: Set top-level `permissions: {}` and declare required scopes per job.
3. **No Script Injection**: Never evaluate `${{ ... }}` directly in shell `run:` commands. Pass context via `env:`.
4. **Pwn Request Defense**: Never checkout untrusted fork code in `pull_request_target`.
5. **No Public Self-Hosted Runners**: Self-hosted runners are restricted to private repositories.

---

## 2. Verification Command

```bash
npm run verify:workflows
```
