---
Last updated: 2026-11-03
Domain: security
Version: 1.0
Reviewed by: Architecture & Security Review Board
---

# Enterprise Application Security & SDLC Assessment Checklist

This assessment checklist evaluates and enhances the Application Security posture across the entire Software Development Lifecycle (SDLC). It guarantees robust security controls, regulatory compliance, proactive threat mitigation, security awareness culture, and GitHub Enterprise governance.

---

## Master Checklist Structure

```
+---------------------------------------------------------------------------------------------------+
|                        APPLICATION SECURITY ASSESSMENT DOMAINS                                    |
+---------------------------------------------------------------------------------------------------+
| 01. Security             : Dependency scanning, code scanning, secrets, policies, RBAC           |
| 02. Compliance           : Regulations, audit logs, data protection, incident response, training |
| 03. Proactivity          : Threat modeling, pentesting, patch management, vulnerability triage     |
| 04. Awareness            : Education, phishing drills, security champions, incident reporting     |
| 05. GitHub Enterprise    : SSO, GHES backups, network isolation, SCIM provisioning, API tokens   |
| 06. Scalability          : Repository structure, modularity, tech stack, resource headroom        |
| 07. Resiliency           : Fault tolerance, disaster recovery drills, data replication            |
| 08. Modularity           : Service boundaries, typed contracts, microservices considerations     |
| 09. Interoperability     : Secure integrations, firewalls, maintenance windows, capacity planning|
| 10. Simplicity           : Code simplicity, minimalist design, living documentation               |
| 11. Observability        : Structured logging, tamper-proof audit trails, centralized sinks       |
+---------------------------------------------------------------------------------------------------+
```

---

## 1. Security

| Check ID | Criterion                    | Priority | Verification Target            | Acceptance Standard                                                                                                                       |
| :------- | :--------------------------- | :------- | :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `SEC-01` | **Dependency Scanning**      | `[P0]`   | CI pipeline / Dependabot       | Automated vulnerability scanning active on every commit/PR; tools updated regularly; high/critical CVEs remediated immediately.           |
| `SEC-02` | **Code Scanning (SAST)**     | `[P0]`   | CodeQL / ESLint security       | Static application security testing integrated into CI/CD pipeline; blocking security rules on pull requests; rules kept up-to-date.      |
| `SEC-03` | **Secrets Management**       | `[P0]`   | `.env.example`, Secret scanner | Zero hardcoded plaintext secrets, API keys, or credentials in git; centralized secret injection; automated token rotation policy.         |
| `SEC-04` | **Security Policies**        | `[P1]`   | `SECURITY.md`, `AGENTS.md`     | Formal security policy documented and accessible to all contributors; regularly reviewed against emerging threat vectors.                 |
| `SEC-05` | **Secure Coding Guidelines** | `[P0]`   | Zod schemas, Mongoose          | Secure coding guidelines strictly enforced (Zod input validation, parameterized queries, constant-time comparisons, XSS sanitization).    |
| `SEC-06` | **Access Controls & RBAC**   | `[P0]`   | `@snp/shared` permissions      | Strict role-based access control (RBAC) enforced server-side; least privilege applied across business systems; regular access log audits. |

---

## 2. Compliance

| Check ID | Criterion                        | Priority | Verification Target       | Acceptance Standard                                                                                                                        |
| :------- | :------------------------------- | :------- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `COM-01` | **Regulatory Compliance**        | `[P0]`   | Compliance documentation  | Relevant regulations listed and documented (e.g. GDPR, FERPA, HIPAA); compliance audits conducted regularly; compliance evidence tracked.  |
| `COM-02` | **Audit Logging**                | `[P0]`   | `audit-log` domain module | Comprehensive audit logging for all state-mutating actions; tamper-proof log storage with strict RBAC; anomaly reviews conducted.          |
| `COM-03` | **Data Protection & Encryption** | `[P0]`   | TLS 1.3, Argon2id, KMS    | Strong encryption algorithms in transit (TLS 1.3) and at rest (AES-256); secure key management; periodic encryption effectiveness testing. |
| `COM-04` | **Incident Response Plan**       | `[P0]`   | DRP & Incident runbooks   | Documented incident response plan detailing escalation, containment, and recovery; regular simulated incident drills executed.             |
| `COM-05` | **Compliance Training**          | `[P1]`   | Training logs & LMS       | Mandatory compliance training provided to all team members; includes new standards; completion tracked and audited.                        |

---

## 3. Proactivity

| Check ID | Criterion                       | Priority | Verification Target        | Acceptance Standard                                                                                                                        |
| :------- | :------------------------------ | :------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `PRO-01` | **Threat Modeling**             | `[P1]`   | Architecture ADRs          | Regular threat modeling conducted across cross-functional engineering teams; models updated when architecture or threat landscape evolves. |
| `PRO-02` | **Penetration Testing**         | `[P0]`   | Pentest reports & tickets  | Regular internal and external penetration testing executed; findings prioritized by risk and remediated promptly.                          |
| `PRO-03` | **Security Updates & Patching** | `[P1]`   | Dependency lockfile        | Automated patch management for dependencies and base images; inventory of runtime dependencies maintained and patched within 14 days.      |
| `PRO-04` | **Vulnerability Management**    | `[P0]`   | Vulnerability backlog      | Continuous vulnerability scanning across applications and infrastructure; risk-based prioritization (CVSS) and SLA enforcement.            |
| `PRO-05` | **Security Monitoring**         | `[P0]`   | Real-time monitoring & APM | Continuous monitoring tools active to detect and respond to threats in real-time; actionable alerting on suspicious anomalies.             |

---

## 4. Awareness

| Check ID | Criterion                        | Priority | Verification Target         | Acceptance Standard                                                                                                         |
| :------- | :------------------------------- | :------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `AWA-01` | **Ongoing Security Training**    | `[P1]`   | Training tracking records   | Continuous role-based security training on latest attack vectors and defense techniques; completion metrics tracked.        |
| `AWA-02` | **Phishing Simulations**         | `[P2]`   | Simulation results          | Regular phishing exercises conducted; results analyzed to tailor targeted follow-up educational sessions.                   |
| `AWA-03` | **Security Champions Program**   | `[P1]`   | Champion directory          | Designated security champions embedded inside engineering squads; equipped with advanced security resources and recognized. |
| `AWA-04` | **Clear Communication Channels** | `[P1]`   | Incident reporting channels | Anonymous and accessible channels established for reporting security concerns and vulnerabilities; swift feedback loop.     |
| `AWA-05` | **Security-First Culture**       | `[P1]`   | Retrospectives & onboarding | Security discussed openly in retrospectives; security requirements integrated into PR templates and definition of done.     |

---

## 5. GitHub Enterprise Deployments

| Check ID | Criterion                               | Priority | Verification Target      | Acceptance Standard                                                                                                            |
| :------- | :-------------------------------------- | :------- | :----------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `GHE-01` | **Enterprise Configuration Governance** | `[P0]`   | Org settings & owners    | Designated configuration owners established; regular configuration reviews; documented change management approvals.            |
| `GHE-02` | **Single Sign-On (SSO) Integration**    | `[P0]`   | SAML / IdP config        | Mandatory SAML SSO integration; secure session timeouts; user training on enterprise SSO.                                      |
| `GHE-03` | **GHES Backup and Disaster Recovery**   | `[P0]`   | `ghe-backup` utility     | Regular backup and restore drills into staging environments using GitHub Enterprise Backup Utilities; encrypted storage.       |
| `GHE-04` | **Network & Perimeter Security**        | `[P0]`   | VPC, Firewalls, VPN      | GitHub Enterprise instances protected by private VPCs, VPNs, and strict firewalls; continuous network traffic threat analysis. |
| `GHE-05` | **Automated User Provisioning (SCIM)**  | `[P0]`   | SCIM / Directory sync    | Automated user provisioning and de-provisioning via SCIM; quarterly permission audits; mandatory 2FA.                          |
| `GHE-06` | **Custom Security Policies**            | `[P1]`   | Rulesets & org policies  | Custom repository rulesets enforcing branch protection, commit signing, and PR reviews tailored to enterprise risk.            |
| `GHE-07` | **API Security & Token Governance**     | `[P0]`   | GitHub App token configs | Fine-grained GitHub App tokens with least-privilege scopes; API usage telemetry monitored for abnormal request bursts.         |
| `GHE-08` | **Monitoring and Real-Time Alerts**     | `[P0]`   | Audit log streaming      | Real-time audit log streaming to SIEM; actionable alerts for privilege escalations or suspicious exports.                      |
| `GHE-09` | **Data Residency & Localization**       | `[P1]`   | Tenant location settings | Repository data, LFS objects, and Actions artifacts stored in compliance with regional data residency laws.                    |
| `GHE-10` | **Third-Party Integration Vetting**     | `[P1]`   | Installed GitHub Apps    | Granular permission auditing of third-party apps; zero untrusted webhooks or excessive scopes.                                 |

---

## 6. Scalability

| Check ID | Criterion                               | Priority | Verification Target      | Acceptance Standard                                                                                                    |
| :------- | :-------------------------------------- | :------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `SCA-01` | **Repository Structure & Clarity**      | `[P1]`   | Workspaces / Tree        | Clean monorepo or modular repo structure; standardized naming conventions; descriptive metadata.                       |
| `SCA-02` | **Custom Properties Ruleset Targeting** | `[P2]`   | GitHub Custom Properties | Custom properties utilized to categorize repositories and dynamically apply security rulesets.                         |
| `SCA-03` | **Code Modularity & Loose Coupling**    | `[P1]`   | Module boundaries        | Code modules loosely coupled with documented public interfaces; circular imports eliminated.                           |
| `SCA-04` | **Tech Stack Standardization**          | `[P1]`   | Runtime manifests        | Tech stack standardized across services to reduce complexity and maintain strong LTS ecosystem support.                |
| `SCA-05` | **Resource Headroom & Elastic Scaling** | `[P1]`   | Compute / Ingress limits | Ephemeral resources recreated on-demand; compute maintains `>= 30%` burst headroom; load balancers distribute ingress. |

---

## 7. Resiliency

| Check ID | Criterion                          | Priority | Verification Target   | Acceptance Standard                                                                                             |
| :------- | :--------------------------------- | :------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `RES-01` | **Fault Tolerance & DR Drills**    | `[P0]`   | DR drill reports      | Disaster recovery procedures regularly tested and documented; issues identified during drills resolved rapidly. |
| `RES-02` | **Data Replication & Consistency** | `[P0]`   | DB replication stream | Cross-region data replication active, monitored for lag (`< 60s`), and verified for data consistency.           |

---

## 8. Modularity

| Check ID | Criterion                                 | Priority | Verification Target | Acceptance Standard                                                                                                  |
| :------- | :---------------------------------------- | :------- | :------------------ | :------------------------------------------------------------------------------------------------------------------- |
| `MOD-01` | **Service Separation & Clear Interfaces** | `[P1]`   | Package boundaries  | Application services modular, independently developed, deployed, and scaled with clear typed contracts.              |
| `MOD-02` | **Context-Appropriate Microservices**     | `[P1]`   | Architecture ADRs   | Microservices used only where domain autonomy warrants it; modular monolith preferred to eliminate network overhead. |

---

## 9. Interoperability

| Check ID | Criterion                               | Priority | Verification Target       | Acceptance Standard                                                                                          |
| :------- | :-------------------------------------- | :------- | :------------------------ | :----------------------------------------------------------------------------------------------------------- |
| `INT-01` | **Secure Custom Integrations**          | `[P1]`   | API / Webhook endpoints   | Custom integrations vetted for vulnerabilities, documented, and authenticated with cryptographic signatures. |
| `INT-02` | **Network Configuration & Firewalls**   | `[P0]`   | Security groups / Subnets | Firewalls and security groups properly configured; egress/ingress traffic monitored and filtered.            |
| `INT-03` | **Scheduled Maintenance Windows**       | `[P1]`   | Maintenance calendar      | Regular update and patch procedures documented, tested in staging, and communicated to stakeholders.         |
| `INT-04` | **Hardware Scalability & Capacity**     | `[P1]`   | Capacity planning logs    | Hardware and infrastructure capacity planned for future growth; automated alerts before resource exhaustion. |
| `INT-05` | **Robust On-Premises Backup Solutions** | `[P0]`   | Backup runbooks & cron    | On-premises backup solutions tested, encrypted, securely stored, and verified for rapid restoration.         |

---

## 10. Simplicity

| Check ID | Criterion                           | Priority | Verification Target         | Acceptance Standard                                                                                        |
| :------- | :---------------------------------- | :------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `SIM-01` | **Code Simplicity & Standards**     | `[P1]`   | Codebase & Linters          | Clean, maintainable code adhering to standard design patterns; strict code reviews maintain code quality.  |
| `SIM-02` | **Straightforward System Design**   | `[P1]`   | Architecture diagrams       | Systems designed as simply as possible while satisfying functional requirements; cognitive load minimized. |
| `SIM-03` | **Clear, Up-to-Date Documentation** | `[P1]`   | `docs/`, `/document` portal | Comprehensive documentation with real-world use cases, examples, and automated real-time changelog sync.   |

---

## 11. Observability

| Check ID | Criterion                            | Priority | Verification Target    | Acceptance Standard                                                                                          |
| :------- | :----------------------------------- | :------- | :--------------------- | :----------------------------------------------------------------------------------------------------------- |
| `OBS-01` | **Comprehensive Structured Logging** | `[P0]`   | Structured logger      | Contextual JSON logging (correlation ID, tenant ID, timestamp); sensitive data redacted; retention enforced. |
| `OBS-02` | **Secure Log Aggregation & RBAC**    | `[P0]`   | Log sink configuration | Centralized log aggregation with strict RBAC; logs protected from unauthorized tampering or deletion.        |
