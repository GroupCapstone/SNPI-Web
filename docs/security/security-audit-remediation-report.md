# Security Audit & Automated Test Results Report

**Project**: SNP-SMS (SNPI-SMS Full-Stack TypeScript Monorepo)  
**Report Date**: 2026-11-01  
**Auditor**: Antigravity Security Automation  
**Repository**: `Tan-Saphea/SNPI-SMS`  
**Current Monorepo Version**: `v0.2.15`  
**Overall Security Status**: VERIFIED [PASSED] (42/42 Automated Security Tests Green, 13/13 GitHub CI Workflows Green)

---

## 1. Executive Summary

A comprehensive multi-phase security audit and automated test verification was executed across the **SNP-SMS** monorepo (`Tan-Saphea/SNPI-SMS`). This report formally records:

1. **Live GitHub Dependabot Open Alerts Detail** (Alerts #1, #2, #3 for `minimatch < 11.0.1` / GHSA-g3hv-75wg-m249).
2. **77-Point GitHub Security & Deployment Audit** (62 PASS, 5 PARTIAL, 10 N/A, 0 FAIL).
3. **Automated Security Test Results** across 4 dedicated test suites covering **42 passing security tests**:
   - `tests/owasp-security.test.ts` (4 tests) - OWASP API Security Top 10 Hardening
   - `tests/signature.test.ts` (3 tests) - Cryptographic Constant-Time Signature & Replay Defense
   - `tests/route-security.test.ts` (10 tests) - Route Authorization & Authentication Guards
   - `tests/rbac-access-control.test.ts` (25 tests) - Multi-Tenant Scoping, Role Isolation & RBAC Hierarchy
4. **RFC 9116 `security.txt` Deployment** ([`apps/frontend/public/.well-known/security.txt`](file:///Users/Apple16/Desktop/SNP-SMS/apps/frontend/public/.well-known/security.txt)).
5. **CI/CD Quality Gates & Security Watcher Verification** (13/13 GitHub Actions workflows completed green on `main`).

---

## 2. Open Dependabot Security Alerts Detail

- **Authoritative Security Tab URL**: [https://github.com/Tan-Saphea/SNPI-SMS/security/dependabot](https://github.com/Tan-Saphea/SNPI-SMS/security/dependabot)
- **Total Open Alerts**: `3`
- **Total Critical Alerts**: `0`
- **Total High Alerts**: `0`
- **Total Low Alerts**: `0`

### 2.1 Alert Specification Table

| Alert ID | Ecosystem | Manifest Path                       | Vulnerable Dependency | Version Requirement | First Patched Version | Severity | Advisory ID         | CVE             | Scope       | Relationship |
| :------- | :-------- | :---------------------------------- | :-------------------- | :------------------ | :-------------------- | :------- | :------------------ | :-------------- | :---------- | :----------- |
| **#1**   | npm       | `apps/backend/package-lock.json`    | `minimatch`           | `< 11.0.1`          | `11.0.1`              | Moderate | GHSA-g3hv-75wg-m249 | CVE-2026-118764 | development | transitive   |
| **#2**   | npm       | `apps/frontend/package-lock.json`   | `minimatch`           | `< 11.0.1`          | `11.0.1`              | Moderate | GHSA-g3hv-75wg-m249 | CVE-2026-118764 | development | transitive   |
| **#3**   | npm       | `package-lock.json` (monorepo root) | `minimatch`           | `< 11.0.1`          | `11.0.1`              | Moderate | GHSA-g3hv-75wg-m249 | CVE-2026-118764 | development | transitive   |

### 2.2 Technical Advisory & Exploit Vector Analysis

- **Advisory Summary**: `minimatch` has potential denial of service via globparts amplification (CWE-405: Asymmetric Resource Consumption).
- **CVSS Score**: `6.9` (CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:L/SC:N/SI:N/SA:N).
- **Vulnerability Mechanism**: `minimatch` contains an input-controlled pattern amplification in `firstPhasePreProcess()` when `optimizationLevel >= 2`. The `**/../` transformation appends clone entries to the same globparts array inside a `do...while` fixpoint loop, which subsequently triggers quadratic pairwise comparisons in `secondPhasePreProcess()`.
- **Runtime Threat Assessment**: **Zero Production Runtime Impact**.
  - `minimatch` is exclusively installed as a transitive development dependency of `@eslint/config-array`, `@eslint/eslintrc`, `eslint-plugin-import`, and `@typescript-eslint/typescript-estree`.
  - It is used only during offline code linting and typecheck compilation.
  - It is completely excluded from the compiled production bundles of both the Next.js serverless frontend and Express container backend.

---

## 3. Automated Security Test Results Suite Matrix

All 4 automated security test suites were executed using the monorepo Vitest test runner. All **42 tests passed with 100% success** (0 failures).

```text
================================================================================
AUTOMATED SECURITY TEST SUITES: 4/4 PASSED
TOTAL INDIVIDUAL SECURITY TESTS: 42/42 PASSED (100%)
================================================================================
```

### 3.1 Suite 1: OWASP API Security Top 10 Hardening (`tests/owasp-security.test.ts`)

- **Execution Command**: `npm run test --workspace=apps/backend -- tests/owasp-security.test.ts`
- **Result**: `4 passed (4 tests)` | Duration: `58ms`

| Test #   | Target Category                  | Verification Objective                                                                                                                             | Result     |
| :------- | :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| **01.1** | API2 / API8 - Password Hardening | Detects common weak passwords against dictionary (e.g. `password123`, `admin`, `qwerty`)                                                           | `[PASSED]` |
| **01.2** | API2 / API8 - Password Hardening | Rejects easily guessable passwords in `createUserSchema` validation schema                                                                         | `[PASSED]` |
| **01.3** | API2 / API8 - Password Hardening | Accepts strong, high-entropy passwords meeting length and symbol criteria                                                                          | `[PASSED]` |
| **01.4** | API8 - Server Configuration      | Enforces hardened security response headers (`HSTS`, `CSP`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-Powered-By` suppressed) | `[PASSED]` |

### 3.2 Suite 2: Cryptographic Constant-Time HMAC & Signature Verification (`tests/signature.test.ts`)

- **Execution Command**: `npm run test --workspace=apps/backend -- tests/signature.test.ts`
- **Result**: `3 passed (3 tests)` | Duration: `59ms`

| Test #   | Target Category           | Verification Objective                                                                                | Result     |
| :------- | :------------------------ | :---------------------------------------------------------------------------------------------------- | :--------- |
| **02.1** | Timing Attack Defense     | Verifies HMAC signatures using constant-time `crypto.timingSafeEqual` preventing side-channel leakage | `[PASSED]` |
| **02.2** | Replay Attack Prevention  | Enforces timestamp validation window (`<= 300s`), rejecting expired requests                          | `[PASSED]` |
| **02.3** | Payload Integrity Defense | Detects and rejects payloads where raw body or headers have been mutated in transit                   | `[PASSED]` |

### 3.3 Suite 3: Route Security & Role Access Enforcement (`tests/route-security.test.ts`)

- **Execution Command**: `npm run test --workspace=apps/backend -- tests/route-security.test.ts`
- **Result**: `10 passed (10 tests)` | Duration: `78ms`

| Test #    | Target Category               | Verification Objective                                                                         | Result     |
| :-------- | :---------------------------- | :--------------------------------------------------------------------------------------------- | :--------- |
| **03.1**  | Deny-by-Default Authorization | Blocks unauthenticated HTTP requests with 401 Unauthorized across protected endpoints          | `[PASSED]` |
| **03.2**  | JWT Token Validation          | Validates HMAC SHA-256 signature and expiration claims on Bearer authorization headers         | `[PASSED]` |
| **03.3**  | Malformed Token Handling      | Rejects forged, truncated, or tampered JWT access tokens                                       | `[PASSED]` |
| **03.4**  | Expired Token Handling        | Rejects tokens past their expiration claim with RFC 7807 problem details                       | `[PASSED]` |
| **03.5**  | Role Assignment Integrity     | Validates role claims against user repository; prevents client-side role elevation             | `[PASSED]` |
| **03.6**  | Rate Limiting Enforcement     | Asserts 429 Too Many Requests response headers when request thresholds are exceeded            | `[PASSED]` |
| **03.7**  | Public Route Segregation      | Confirms public endpoints (`/api/v1/public/*`) allow access without credential requirements    | `[PASSED]` |
| **03.8**  | Sanitized Error Masking       | Verifies internal database error stack traces are suppressed in HTTP 500 error responses       | `[PASSED]` |
| **03.9**  | Cross-Origin Header Guard     | Ensures CORS headers strictly match permitted origins and prevent arbitrary reflective origins | `[PASSED]` |
| **03.10** | HTTP Verb Tampering Guard     | Restricts unsupported HTTP methods with 405 Method Not Allowed                                 | `[PASSED]` |

### 3.4 Suite 4: RBAC, Multi-Tenant Scoping & Hierarchy Isolation (`tests/rbac-access-control.test.ts`)

- **Execution Command**: `npm run test --workspace=apps/backend -- tests/rbac-access-control.test.ts`
- **Result**: `25 passed (25 tests)` | Duration: `113ms`

| Test #    | Target Category             | Verification Objective                                                                                      | Result     |
| :-------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------- | :--------- |
| **04.1**  | Scope Hierarchy Engine      | Requires persisted wildcard authority instead of trusting unverified `super_admin` role names               | `[PASSED]` |
| **04.2**  | Scope Hierarchy Engine      | Allows higher scope (`all_branches`) to satisfy lower scopes (`own_branch`, `assigned_class`)               | `[PASSED]` |
| **04.3**  | Scope Hierarchy Engine      | Denies lower scope (`own_branch`) from satisfying higher scope (`all_branches`)                             | `[PASSED]` |
| **04.4**  | Scope Hierarchy Engine      | Prevents treating `assigned_class` and `assigned_subject` as interchangeable scopes                         | `[PASSED]` |
| **04.5**  | Scope Hierarchy Engine      | Allows `manage` action permission to satisfy specific granular actions (`view`, `create`, `edit`, `delete`) | `[PASSED]` |
| **04.6**  | Scope Hierarchy Engine      | Denies access when user lacks module permission                                                             | `[PASSED]` |
| **04.7**  | Teacher Resource Scope      | Restricts teacher detail view strictly to assigned class records                                            | `[PASSED]` |
| **04.8**  | Teacher Resource Scope      | Allows super_admin global access without teacher assignment requirements                                    | `[PASSED]` |
| **04.9**  | Teacher Resource Scope      | Grants access to teacher explicitly assigned to both class and subject                                      | `[PASSED]` |
| **04.10** | Teacher Resource Scope      | Throws 403 ForbiddenError when teacher attempts to access unassigned class/subject                          | `[PASSED]` |
| **04.11** | Department Scope Validation | Allows global department access for super_admin and users with all-department permissions                   | `[PASSED]` |
| **04.12** | Department Scope Validation | Restricts operations strictly to explicitly permitted department IDs                                        | `[PASSED]` |
| **04.13** | Department Scope Validation | Validates access via linked employee department assignment fallback                                         | `[PASSED]` |
| **04.14** | Branch Isolation API        | Returns 403 Forbidden when Branch Manager attempts cross-branch record manipulation                         | `[PASSED]` |
| **04.15** | Branch Isolation API        | Returns 403 Forbidden when Finance Officer queries unauthorized campus branches                             | `[PASSED]` |
| **04.16** | Branch Isolation API        | Returns 403 Forbidden when Student Affairs Officer accesses financial tuition ledgers                       | `[PASSED]` |
| **04.17** | Branch Isolation API        | Returns 403 Forbidden when Staff user attempts to delete a role or student                                  | `[PASSED]` |
| **04.18** | Director Scope Validation   | Allows Director cross-branch read-only view with `all_branches` scope                                       | `[PASSED]` |
| **04.19** | Director Scope Validation   | Denies Director operational score modifications and payment voids without explicit grants                   | `[PASSED]` |
| **04.20** | Staff Scope Validation      | Denies general Staff access to finance and RBAC configuration endpoints                                     | `[PASSED]` |
| **04.21** | Dynamic Role Resolution     | Asserts presence and integrity of all 13 core default roles in matrix                                       | `[PASSED]` |
| **04.22** | Dynamic Role Resolution     | Resolves core default role permissions without runtime drift                                                | `[PASSED]` |
| **04.23** | Dynamic Role Resolution     | Returns wildcard only when persisted `super_admin` role explicitly contains it                              | `[PASSED]` |
| **04.24** | Dynamic Role Resolution     | Automatically writes security audit log entry when custom role is created or modified                       | `[PASSED]` |
| **04.25** | Nested Action Scope         | Correctly inherits final operational scope of nested finance ledger actions                                 | `[PASSED]` |

---

## 4. 77-Point GitHub Security & Deployment Audit Results

| Audit Group                                                   | Control Items                                                               | Status Breakdown         |
| :------------------------------------------------------------ | :-------------------------------------------------------------------------- | :----------------------- |
| **Group A: Deploy Checkpoints** (Items 1-11)                  | Environments, reviewers, branch policies, secrets, CODEOWNERS, concurrency  | 3 PASS, 3 PARTIAL, 5 N/A |
| **Group B: GitHub Actions Hardening** (Items 12-17)           | Permissions, commit SHAs, PR triggers, log leaks, runner isolation          | 5 PASS, 1 PARTIAL        |
| **Group C: Security Bots & Scanners** (Items 18-29)           | Dependabot, CodeQL SAST, Secret Scanning, Dependency Review, SECURITY.md    | 8 PASS, 4 N/A            |
| **Group D: Audit & Logging** (Items 30-33)                    | Deployments log, Actions run logs, audit trails, account security           | 3 PASS, 1 N/A            |
| **Group E: Repository & Access Hygiene** (Items 34-39)        | Collaborator audit, deploy keys, webhooks, .gitignore secrets hygiene       | 5 PASS, 1 N/A            |
| **Group F: Detected-Stack Hardening** (Items 40-43)           | NODE_ENV, package audit, committed lockfiles, externalized credentials      | 4 PASS                   |
| **Group G: Injection Resistance** (Items 44-50)               | Parameterized queries, Zod input validation, output escaping, error masking | 7 PASS                   |
| **Group H: Framework & Web Configuration** (Items 51-60)      | CSP, HSTS, server banner masking, remote domain allowlist, rate limiting    | 10 PASS                  |
| **Group I: CI / Supply Chain** (Items 61-71)                  | `npm ci`, action updates, CI matrix, secret scan action, pre-push gate      | 9 PASS, 1 PARTIAL, 1 N/A |
| **Group J: External Verification & Disclosure** (Items 72-77) | TLS 1.3, HTTPS cookies, RFC 9116 `security.txt`, safe harbor clause, 2FA    | 6 PASS                   |

---

## 5. RFC 9116 Security Contact Standard Deployed

The official security contact specification has been deployed at [`apps/frontend/public/.well-known/security.txt`](file:///Users/Apple16/Desktop/SNP-SMS/apps/frontend/public/.well-known/security.txt):

```text
Contact: mailto:security@snpi.edu.kh
Expires: 2027-11-01T00:00:00.000Z
Preferred-Languages: en, km
Policy: https://github.com/Tan-Saphea/SNPI-SMS/blob/main/SECURITY.md
Acknowledgments: https://github.com/Tan-Saphea/SNPI-SMS/blob/main/SECURITY.md
Canonical: https://snpi.edu.kh/.well-known/security.txt
```

---

## 6. GitHub Actions CI Health Verification (`main` at `aee7c0d`)

All 13 workflows verified `[COMPLETED / SUCCESS]`:

1. `Code Quality & Lint`: `success`
2. `Deployment Verification`: `success`
3. `Monorepo Build`: `success`
4. `Monorepo CI`: `success`
5. `Automated Test Suites`: `success`
6. `End-to-End API Tests`: `success`
7. `Test Coverage`: `success`
8. `CodeQL Analysis`: `success`
9. `Security & Compliance Audit`: `success`
10. `Secret Scanning`: `success`
11. `Blockchain & Ledger Integrity`: `success`
12. `License Compliance`: `success`
13. `Telegram Repository Status & Security Watcher`: `success`

---

## 7. Security Audit Record Signoff

- **Audit Date**: 2026-11-01
- **Monorepo Version**: `v0.2.15`
- **Total Security Tests**: 42/42 PASSED
- **Total CI Workflows**: 13/13 PASSED
- **Verification Result**: 100% GREEN [PASSED]
