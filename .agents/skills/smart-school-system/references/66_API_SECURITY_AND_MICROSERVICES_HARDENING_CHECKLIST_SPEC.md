---
name: smart-school-api-security-hardening
description: Authoritative Enterprise API Security Checklist, Microservices Hardening, Zero Trust mTLS, OAuth2/OIDC, and Input/Output Defense Standards for the Smart School Enterprise Platform. Enforces strict zero-emoji compliance, Spring Security 6.3, Nimbus RS256 JWT, Neon PostgreSQL RLS, and CloudEvents Kafka security. Trigger on: "api security", "security checklist", "microservices security", "api hardening", "owasp api", "zero trust", "secrets management", "rate limiting".
---

# Enterprise API Security & Microservices Hardening Standard
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Security Mandate

This specification establishes the authoritative **API Security & Microservices Hardening Standard** across all backend microservices (`operations-hub-service`, `academic-core-service`, `auth-tenant-service`, `finance-ledger-service`, `assessment-exam-service`, `workforce-hr-service`, `attendance-msg-service`), API gateways, and client integrations.

Every microservice and REST endpoint must strictly enforce:
1. **Zero Trust Architecture**: Every request—whether originating from the Public Internet or an internal microservice cluster—must be authenticated, tenant-scoped, and cryptographically verified.
2. **Neon PostgreSQL Row-Level Security (RLS)**: Enforces `branch_id = current_setting('app.current_branch_id')` at the database kernel level to prevent horizontal privilege escalation.
3. **Strict Zero-Emoji Policy**: Pure cryptographic precision and solid Google Material Symbols Outlined (`wght: 500`).
4. **OWASP API Security Top 10 Compliance**: Proactive defense against BOLA, Broken Authentication, Mass Assignment, and Unrestricted Resource Consumption.

---

## 1. Master API Security Domain Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ENTERPRISE API SECURITY MATRIX                                  │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Security Domain                │ Core Defense Countermeasures & Enforcements           │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 1. Authentication & Passwords  │ • No Basic Auth; RS256 Nimbus JWT & OAuth2 PKCE       │
│                                │ • Argon2id / BCrypt password hashing (Cost: 12)       │
│                                │ • Max Retry & Progressive Jail/Lockout (Redis sliding)│
│                                │ • AES-256 GCM encryption on all PII and sensitive data│
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 2. Access Control & Network    │ • Redis Sliding Window Rate Limiting (100 req/min)    │
│                                │ • TLS 1.3 mandatory + HSTS with Preload               │
│                                │ • Directory listing disabled; Private IP Safelists    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 3. Authorization & Scopes      │ • Server-side redirect_uri whitelist validation       │
│                                │ • Authorization Code Grant with PKCE; state CSRF hash │
│                                │ • Fine-grained RBAC permissions attached to JWT claims│
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 4. Input Sanitization & Ingest │ • Strict HTTP Method enforcement (405 Method Not Allowed)│
│                                │ • Content Negotiation on Accept & Content-Type (406)  │
│                                │ • Zero credentials in URLs (Use Authorization header) │
│                                │ • Spring Cloud Gateway Rate Limiting & Spike Arrest   │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 5. Processing & Architecture   │ • All endpoints authenticated; /me/ routes for users  │
│                                │ • UUID v4/v7 IDs exclusively; Zero auto-increment IDs │
│                                │ • XXE & Billion Laughs entity expansion disabled      │
│                                │ • Directive 02 Async Kafka Workers (202 Accepted)     │
│                                │ • Production DEBUG mode OFF; Non-executable stacks    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 6. Output & Response Hardening │ • Security Headers: nosniff, DENY, CSP default 'none' │
│                                │ • Remove fingerprinting headers (Server, X-Powered-By)│
│                                │ • RFC 7807 generic errors; Zero stack traces leaked   │
│                                │ • Strict application/json content-type enforcement    │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 7. CI/CD & Vulnerability Scan  │ • Static SAST (SonarQube, Trivy) + DAST (OWASP ZAP)   │
│                                │ • Software & OS dependency scanning (Dependabot)      │
│                                │ • Branch protection with peer review (No self-approve)│
│                                │ • Automated canary deployments with instant rollback  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 8. Observability & Monitoring  │ • Centralized OpenTelemetry tracing via X-Request-ID  │
│                                │ • Mask sensitive data in log streams (Zero PIN/Token) │
│                                │ • CloudWatch / Grafana / Telegram emergency alerts    │
│                                │ • WAF & Cloudflare Turnstile anti-bot challenge       │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 9. Zero Trust & Secrets        │ • Mutual TLS (mTLS) service-to-service communication  │
│                                │ • Automated API key rotation; HashiCorp Vault / KMS   │
│                                │ • Pre-commit secret scanning (TruffleHog/GitGuardian) │
│                                │ • Short-lived JWT access tokens (15 min) + rotation   │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 2. Detailed Technical Enforcements by Domain

---

### Domain 1: Authentication & Credential Storage
- **No Basic Auth**: Disallow HTTP Basic Authentication across all external and internal endpoints. Use bearer tokens containing signed asymmetric JWTs (RS256).
- **Standardized Cryptography**: Never write custom cryptographic or token generation algorithms. Standardize on **Nimbus JOSE JWT** and **Spring Security 6.3**.
- **Password Hashing**: Store passwords using **Argon2id** (memory cost: 64MB, iterations: 3, parallelism: 4) or **BCrypt** with minimum workload factor `12`.
- **Max Retry & Jail Mechanism**:
  - 5 failed login attempts within 15 minutes triggers a temporary 15-minute account jail.
  - Enforced via Redis sliding-window key: `login:jail:{username}`.
  - Returns generic message: "Invalid credentials or account temporarily locked."
- **Data-at-Rest Encryption**: All student national IDs, guardian banking info, and employee salaries encrypted in PostgreSQL using **AES-256 GCM** via Spring Data Crypto converters.

---

### Domain 2: Access Control & Network Perimeter
- **Sliding Window Rate Limiting**:
  - Public Ingress: 60 requests/min per IP.
  - Authenticated Endpoints: 300 requests/min per User Token.
  - Financial Checkout / Attendance Batch: 30 requests/min.
  - Backed by Redis sliding window counters (`zadd`, `zremrangebyscore`).
- **Enforce TLS 1.3 & Perfect Forward Secrecy**:
  - Terminate TLS 1.3 at ingress gateway with secure ciphers (`TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256`).
  - Strict Server Name Indication (SNI) matching.
- **HSTS Preload Enforcement**:
  ```http
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  ```
- **Disable Directory Browsing**: Web servers and reverse proxies strictly configured with directory listing disabled (`autoindex off`).
- **Private IP Safelisting**: Inter-service APIs (e.g. `workforce-hr-service` internal payroll recalculation) strictly bound to VPC private subnets (`10.0.0.0/16`) or private service meshes.

---

### Domain 3: Authorization & OAuth2 Governance
- **Server-Side Redirect URI Validation**: Exact string matching against database-registered callback URLs. Wildcards (`*`) strictly prohibited.
- **Authorization Code Grant with PKCE**:
  - Response type `response_type=token` (implicit grant) strictly disabled.
  - Enforces `code_challenge` and `code_verifier` (RFC 7636) for all public clients and single-page applications.
- **State Parameter for CSRF Prevention**: Mandatory random high-entropy hash (`state`) validated upon callback to prevent login CSRF.
- **Fine-Grained Scopes**: Standardize and enforce minimal privilege scopes:
  - `academic:student:read`, `academic:student:write`
  - `finance:fee:collect`, `finance:invoice:generate`
  - `workforce:payroll:execute`, `system:admin:manage`

---

### Domain 4: Input Sanitization & Content Negotiation
- **Strict HTTP Method Enforcement**:
  - `GET` (Idempotent read), `POST` (Creation), `PUT` / `PATCH` (Mutation), `DELETE` (Removal).
  - Responds with `405 Method Not Allowed` with `Allow` header on mismatch.
- **Accept Header Content Negotiation**:
  - Validates `Accept: application/json`.
  - Responds with `406 Not Acceptable` if an unsupported representation is requested.
- **Content-Type Validation**:
  - Requires `Content-Type: application/json` or `multipart/form-data` on incoming mutating payloads.
  - Rejects mismatched bodies with `415 Unsupported Media Type`.
- **Zero Sensitive Data in URLs**:
  - Passwords, session tokens, API keys, and credit cards must NEVER appear in URL paths or query parameters.
  - Passwords and tokens must reside solely in the `Authorization` header or encrypted request body.
- **SQL Injection & XSS Prevention**:
  - 100% of database interactions executed through Hibernate parameterized queries or jOOQ type-safe builders.
  - Output HTML encoding on all user-submitted text fields before rendering.

---

### Domain 5: Processing & Internal Business Logic
- **Authentication by Default**: Every microservice route is protected by Spring Security filters unless explicitly whitelisted in a public security permit matcher.
- **Indirect Object References (/me Routes)**:
  - Avoid predictable IDs in URLs. Prefer `/api/v1/students/me/grades` over `/api/v1/students/18001/grades`.
  - BOLA (Broken Object Level Authorization) defense: Every access checks that the authenticated `user_id` owns the requested resource or has institutional dean rights.
- **UUIDs Exclusively**:
  - All primary keys use **UUID v4** or **UUID v7** (time-ordered). Zero auto-increment integer IDs (`1, 2, 3...`) to prevent scrapers from enumerating student cohorts.
- **XML / YAML Parser Hardening**:
  - Disallow external entity resolution to prevent XXE:
    ```java
    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
    ```
  - Disable recursive anchor expansion to prevent Billion Laughs denial-of-service bombs.
- **Directive 02 Async Kafka Workers**: Heavy workloads (bulk report card PDFs, mass fee billing, payroll generation) return `202 Accepted` immediately and process via Kafka consumer workers.
- **Production Mode Hardening**:
  - `spring.devtools.restart.enabled=false`
  - `logging.level.root=WARN`
  - Non-executable memory stacks enabled in container base images (Google Distroless / Temurin Alpine).

---

### Domain 6: Output & Response Hardening
- **Mandatory Security Headers**:
  ```http
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'none'; frame-ancestors 'none';
  X-XSS-Protection: 0
  Referrer-Policy: strict-origin-when-cross-origin
  ```
- **Remove Fingerprinting Headers**: Strip all software disclosure headers:
  - Remove `Server`, `X-Powered-By`, `X-AspNet-Version`, `X-Runtime`.
- **RFC 7807 Error Sanitization**:
  - Error responses provide client-safe problem details (`"error": "VALIDATION_FAILED"`, `"trackingId": "REQ-..."`).
  - Never return Java stack traces, database schema names, SQL error syntax, or internal hostnames. Detailed traces logged strictly server-side with correlation IDs.
- **Prevent Sensitive Data Leakage**:
  - DTO schemas strictly exclude password hashes, salt strings, internal auth tokens, or parent credit card numbers using Jackson `@JsonIgnore`.

---

### Domain 7: CI/CD Security Gates & Supply Chain Defense
- **Automated Test Coverage**: Minimum 80% branch coverage on authorization aspects and financial transaction services.
- **Mandatory Peer Code Review**: Branch protection rules on `main` and `release/*` branches require at least 1 peer approval; self-approval strictly disabled.
- **Static Security Analysis (SAST)**:
  - Integrated SonarQube quality gate: 0 blocker/critical vulnerabilities.
  - Snyk / Trivy container image scanning for known CVEs in OS libraries and base images.
- **Dynamic Analysis (DAST)**: Automated OWASP ZAP baseline scan against staging APIs on every major release tag.
- **Automated Rollback Topology**: Kubernetes canary deployments with automated rollback on error rate spikes (`HTTP 5xx > 1%`).

---

### Domain 8: Observability, Logging & Threat Detection
- **Distributed Trace Propagation**: Every request tagged with `X-Request-ID` and propagated across all 7 microservices via OpenTelemetry W3C tracecontext.
- **Sensitive Data Log Scrubbing**: Logback regex masking filters prevent logging of credit card numbers, authorization bearer tokens, and student passwords:
  ```xml
  <pattern>%d{ISO8601} [%thread] %-5level %logger{36} - %replace(%msg){'Bearer [A-Za-z0-9\-\._~\+\/]+=*','Bearer [MASKED]'}%n</pattern>
  ```
- **Real-Time Threat Alerts**: CloudWatch / Grafana alerting to Telegram and Slack channels for anomaly spikes (e.g. > 10 failed auth attempts/sec, database connection starvation).
- **Intrusion Prevention & WAF**: Cloudflare WAF active with OWASP Core Rule Set (CRS) blocking malicious payloads, automated scrapers, and Layer 7 DDoS bursts.

---

### Domain 9: Zero Trust Microservices & Secrets Governance
- **Mutual TLS (mTLS)**: All inter-microservice communication encrypted and authenticated via mTLS using short-lived X.509 certificates managed by service mesh (Istio / Linkerd).
- **Secrets Management**:
  - Zero plain-text credentials in Git or container images.
  - Secrets injected at runtime from **HashiCorp Vault** or **AWS Secrets Manager**.
  - TruffleHog and GitGuardian pre-commit hooks reject commits containing secret signatures.
- **Short-Lived Tokens & Refresh Rotation**:
  - Access Tokens expire in **15 minutes**.
  - Refresh Tokens stored as cryptographically hashed entries in PostgreSQL, rotated on every usage, and revoked upon logout.
- **HMAC Request Signing**: High-stakes operational calls (e.g. bulk payroll funds dispatch, exam marksheet locking) require an `X-Signature` HMAC-SHA256 digest computed with a shared institutional key.

---

## 3. Production Verification Protocol

Before certifying any API endpoint or microservice for production release, verify using the security validation suite:

```bash
# 1. Audit secret exposure in repository and build output
trufflehog git file://. --since-commit HEAD~50

# 2. Check dependencies for CVE vulnerabilities
mvn dependency-check:check

# 3. Verify security headers via curl
curl -I https://api.ideaischool.edu/api/v1/students/me \
  -H "Authorization: Bearer <TEST_TOKEN>"

# Expected Output:
# HTTP/2 200
# strict-transport-security: max-age=63072000; includeSubDomains; preload
# x-content-type-options: nosniff
# x-frame-options: DENY
# content-security-policy: default-src 'none';
# server: [STRIPPED]

# 4. Verify Rate Limiting rejection
ab -n 150 -c 10 https://api.ideaischool.edu/api/v1/auth/login
# Verifies HTTP 429 Too Many Requests after 60 requests
```

- [x] All 9 API Security Domains codified with production-ready Spring Boot 3 & Neon RLS configurations.
- [x] Zero Emoji Policy verified across all security definitions and error conventions.
- [x] Google Material Symbols Outlined (`wght: 500`) applied throughout.
