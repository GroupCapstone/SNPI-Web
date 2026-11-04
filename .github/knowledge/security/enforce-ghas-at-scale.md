# Enforce GitHub Advanced Security at Scale Guide

This guide establishes the mandatory GHAS enforcement patterns across repositories in the enterprise.

---

## 1. Key Invariants

1. **Secret Scanning Push Protection**: Enabled globally; delegated bypass restricted to Security Managers.
2. **Bypass Prevention**: Do not commit `.github/secret_scanning.yml`. Push ruleset enforces this restriction.
3. **Dependency Review Gate**: Pull requests fail if adding `moderate` or higher CVEs or prohibited licenses.
4. **CodeQL SAST**: Automated static analysis on PRs and default branch merges.
5. **Auditable Exceptions**: All exceptions and bypasses stream to enterprise SIEM (Microsoft Sentinel).

---

## 2. Verification Command

```bash
npm run verify:ghas
```
