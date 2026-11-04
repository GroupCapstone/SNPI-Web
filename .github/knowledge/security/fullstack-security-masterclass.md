# Full-Stack Security Masterclass Reference Guide

> **Authoritative Specification**: [`.agents/skills/fullstack-security-masterclass/SKILL.md`](../../../.agents/skills/fullstack-security-masterclass/SKILL.md)
> **Aliases**: `apply skill fullstack-sec`, `apply skill api-security`
> **Pillars Covered**: OWASP API Security Top 10 (2023), RFC 8725 JWT Best Current Practices, OWASP ASVS 4.0 Level 2/3 Verification, NIST SP 800-63B Digital Identity, MongoDB Enterprise Hardening.

---

## 1. Executive Summary

This standard unifies five foundational security benchmarks into an actionable 15-point verification quality gate covering both the **Express 5 Modular Monolith API** (`apps/backend` / `snp-sms-api`) and **Next.js 16 Web Application** (`apps/frontend` / `snp-sms-web`).

---

## 2. Document Index & Knowledge References

| Module | Core Subject                | Target Defense                                                   | Authoritative File                                                                                                            |
| :----- | :-------------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **01** | **OWASP API Top 10 (2023)** | BOLA, Broken Auth, BOPLA, SSRF, BFLA                             | [01-owasp-api-security-top-10.md](../../../.agents/skills/fullstack-security-masterclass/01-owasp-api-security-top-10.md)     |
| **02** | **RFC 8725 JWT BCP**        | Algorithm confusion, 'none' attack, timing attacks, RTR          | [02-rfc-8725-jwt-best-practices.md](../../../.agents/skills/fullstack-security-masterclass/02-rfc-8725-jwt-best-practices.md) |
| **03** | **OWASP ASVS 4.0**          | Educational data classification, Level 2/3 verification          | [03-owasp-asvs-4-school-data.md](../../../.agents/skills/fullstack-security-masterclass/03-owasp-asvs-4-school-data.md)       |
| **04** | **NIST SP 800-63B**         | Password entropy ($\ge 12$ chars), credential stuffing, timeouts | [04-nist-sp-800-63b-identity.md](../../../.agents/skills/fullstack-security-masterclass/04-nist-sp-800-63b-identity.md)       |
| **05** | **MongoDB Hardening**       | Replica set keyfile, TLS 1.3, least-privilege, strictQuery       | [05-mongodb-security-hardening.md](../../../.agents/skills/fullstack-security-masterclass/05-mongodb-security-hardening.md)   |
| **06** | **Frontend Hardening**      | Next.js CSP, HSTS, clickjacking prevention, sanitized state      | [06-frontend-security-hardening.md](../../../.agents/skills/fullstack-security-masterclass/06-frontend-security-hardening.md) |

---

## 3. Mandatory 15-Point Full-Stack Security Quality Gate

Every route, DTO schema, database query, and UI component must comply with the 15-point security gate detailed in [`SKILL.md`](../../../.agents/skills/fullstack-security-masterclass/SKILL.md).
