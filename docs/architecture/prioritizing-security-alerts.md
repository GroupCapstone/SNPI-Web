# Architectural Specification: Prioritizing Security Alert Remediation

> **Standard Code**: `ARCH-ALERTPRIO-01`  
> **Authors**: Greg Mohler & Tom Horton  
> **Target System**: SNP-SMS Full-Stack Monorepo  
> **Primary Safe Folder**: `.agents/skills/prioritizing-security-alerts/`  
> **Verification CLI**: `npm run verify:alert-prio`

---

## 1. Architectural Motivation

Unprioritized security notifications create "alert fatigue," resulting in missed critical vulnerabilities. This specification establishes a deterministic 3-step prioritization engine that blends native GitHub alert metadata with repository organizational properties to drive targeted security campaigns.

```
[Native GitHub Alert Metadata] ──┐
                                 ├──> [Composite Scoring Engine] ──> [Security Campaigns & SLOs]
[Custom Properties Context]    ──┘
```

---

## 2. Configuration & Invariant Directory Layout

```
infrastructure/security/alert-prioritization/
├── custom-properties.yaml         # Repository organizational context metadata
├── security-campaigns.yaml        # Active and template campaign cohorts
└── alert-triage-policy.json       # Mathematical risk scoring and SLA thresholds
```

---

## 3. Operational CLI

```bash
npm run verify:alert-prio
```

Evaluates the prioritization engine, custom property bindings, campaign configurations, and automated scoring rules.
