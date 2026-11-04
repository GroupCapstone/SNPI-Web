# Enforcing GitHub Advanced Security at Scale Architecture

> Authoritative architectural specification for rolling out and enforcing GitHub Advanced Security (GHAS) across large-scale repository fleets for SNP-SMS based on the GitHub Well-Architected Framework.

---

## 1. Executive Summary

This architecture establishes a multi-tiered governance model to enforce GHAS scanning, bypass prevention, and compliance at scale:

```
+-----------------------------------------------------------------------------------------+
| GHAS Fleet Enforcement Invariants                                                       |
+--------------------------+--------------------------------------------------------------+
| Custom Properties        | `business_criticality`, `compliance_scope`, `public_exposure`|
| Security Configurations  | Org-level enablement for secret scanning, push protection,   |
|                          | Dependabot alerts, and CodeQL default setup                 |
| Push Ruleset             | Blocks `.github/secret_scanning.yml` to prevent bypasses    |
| Dependency Review Gate   | Centralized workflow fails on `moderate+` and license denies |
| CodeQL SAST              | Deep static code analysis for TypeScript/JavaScript          |
| RBAC & Exceptions        | Dedicated Security Manager role; SIEM audit log streaming    |
+--------------------------+--------------------------------------------------------------+
```

---

## 2. Policy Manifests & Rulesets

- **GHAS Policy Configuration**: `infrastructure/security/ghas-at-scale/ghas-enforcement-policy.yaml`
- **Security Configuration Schema**: `infrastructure/security/ghas-at-scale/security-configuration.json`
- **Push Ruleset**: `infrastructure/security/ghas-at-scale/push-ruleset-prevent-bypass.json`
- **Dependency Review Workflow**: `.github/workflows/dependency-review.yml`

---

## 3. Verification

```bash
# Execute automated GHAS at scale audit
npm run verify:ghas
```
