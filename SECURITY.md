# SNP-SMS Security Policy & DevSecOps Standard

## 1. Security Architecture & Hierarchy

SNP-SMS adheres to modern Application Security (AppSec) and DevSecOps engineering standards. The security inspection taxonomy is structured as follows:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   DevSecOps (Lifecycle & Culture)                     │
│    Integrating automated security controls into Git & CI/CD pipelines  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Application Security (AppSec)                        │
│   Broader security discipline covering code, dependencies, & secrets   │
└───────────┬───────────────────────┼───────────────────────┬────────────┘
            │                       │                       │
            ▼                       ▼                       ▼
┌───────────────────────┐ ┌───────────────────┐ ┌────────────────────────┐
│         SAST          │ │ Secret Detection  │ │  Dependency Scanning   │
│ Static Code Analysis  │ │ Token & Key Leaks │ │     CVE / SCA Audit    │
└───────────┬───────────┘ └───────────────────┘ └────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     Engines & Analyzers                                │
│   Semgrep (GitLab SAST) · CodeQL (AST Data-Flow) · Gemnasium · ESLint  │
└────────────────────────────────────────────────────────────────────────┘
```

- **CodeQL & Semgrep**: Specialized static analysis engines that query ASTs and track tainted data-flow from source to sink.
- **SAST (Static Application Security Testing)**: The category of automated tests that inspect source code for flaws without executing it.
- **Application Security (AppSec)**: The overarching discipline encompassing SAST, Secret Detection, Software Composition Analysis (SCA), and defensive design.
- **DevSecOps**: Shifting security left by embedding automated scanning, quality gates, and audit ledgers directly into development workflows and CI/CD pipelines.

---

## 2. GitLab Application Security & DevSecOps Scanners

SNP-SMS integrates GitLab's native Security and DevSecOps templates within `.gitlab-ci.yml`:

| Scanner / Template                                                     | Stage            | Purpose                                                                             | Engine / Tool               |
| ---------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------- | --------------------------- |
| **SAST** (`Security/SAST.gitlab-ci.yml`)                               | `test`           | Static analysis for injection, XSS, insecure deserialization, and path traversal    | Semgrep / NodeJsScan        |
| **Secret Detection** (`Security/Secret-Detection.gitlab-ci.yml`)       | `test`           | Scans git commits and source tree for leaked tokens, private keys, and API secrets  | Gitleaks / Secret Detection |
| **Dependency Scanning** (`Security/Dependency-Scanning.gitlab-ci.yml`) | `test`           | Scans `package.json` and lockfiles for known CVEs and vulnerable dependencies       | Gemnasium Analyzer          |
| **Code Quality** (`Code-Quality.gitlab-ci.yml`)                        | `test`           | Measures code complexity, maintainability, and structural code smells               | Code Climate                |
| **Dependency Audit Gate** (`npm audit`)                                | `quality-check`  | Generates machine-readable `npm-audit-report.json` for rapid pipeline feedback      | npm audit engine            |
| **Multi-Phase Custom Audit**                                           | `security-audit` | 6-phase proprietary institutional audit verifying RBAC, schemas, and attack classes | Custom Security Runner      |

---

## 3. Core Security Controls Matrix

### 3.1 Authentication & Token Lifecycle

- **Access Tokens**: Short-lived JWTs (15-minute expiration) returned by the existing login/refresh API contract, held in application memory, and sent via `Authorization: Bearer` headers. They are not written to browser storage or included in the React auth context.
- **Refresh Tokens**: Long-lived JWTs (7-day expiration) stored in `HttpOnly`, `SameSite=Strict` cookies with `Secure` enabled in production. Browser requests use the same-origin `/api/v1` proxy; HTTPS protects both the browser-to-frontend and frontend-to-API connections.
- **Password Hashing**: Passwords hashed with `bcryptjs` using $\ge 12$ salt rounds.

### 3.2 Role-Based Access Control (RBAC) & Multi-Branch Scoping

- **Granular Permissions**: Follows `module.action.scope` format (e.g., `attendance.read.own_branch`, `finance.create.all_branches`).
- **Deny-by-Default**: Access is blocked unless an explicit grant exists.
- **Tenant & Branch Isolation**: Every database query filters by authorized `branchId` using `getAuthorizedBranchFilter()`. Client-provided branch IDs are strictly validated on the server.

### 3.3 Input Validation & Defensive Coding

- **Zod Schemas**: Every route handler validates incoming request parameters, query strings, and payloads before invoking service layers.
- **Mongoose Sanitization**: Parameterized queries prevent NoSQL operator injection (`$gt`, `$ne`, `$where`).

### 3.4 Immutable Audit Logging

- High-risk operations (`CREATE`, `UPDATE`, `DELETE`, fee adjustments, grade modifications, voids) record immutable audit entries with user ID, branch ID, IP address, timestamp, and diff snapshots.

---

## 4. 6-Phase Institutional Security Audit Framework

SNP-SMS includes an automated audit runner located in `.agents/skills/security-audit/`:

1. **Phase 1: Reconnaissance & Topology Mapping**: Discovers network endpoints, microservices, and port bindings.
2. **Phase 2: Threat Modeling**: Analyzes trust boundaries, privilege boundaries, and data flow.
3. **Phase 3: Vulnerability Hunting**: Static inspection across OWASP Top 10, CWE top 25, and logic flaws.
4. **Phase 4: Dynamic & Safe Verification**: Validates rate limits, session expiration, and state machines.
5. **Phase 5: Machine-Readable Reporting**: Compiles schema-conforming `findings.json` and `coverage-ledger.json`.
6. **Phase 6: Independent Machine Validation**: Asserts report integrity and zero unverified findings.

---

## 5. Vulnerability Reporting & Responsible Disclosure

If you discover a security vulnerability within SNP-SMS:

1. **Do NOT open a public issue** on GitLab or GitHub.
2. Submit a confidential report directly to the security team or repository administrator.
3. Include detailed steps to reproduce, proof-of-concept payloads, and affected versions.
4. We aim to acknowledge reports within 24 hours and provide coordinated remediation timelines.
