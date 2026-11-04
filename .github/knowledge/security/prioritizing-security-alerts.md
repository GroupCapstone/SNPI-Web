---
Last updated: 2026-11-03
Domain: security
Version: 1.0
Reviewed by: Architecture & Security Review Board
---

# Prioritizing Security Alert Remediation Standard

This enterprise knowledge base document establishes the organizational standard for cutting through alert noise and prioritizing security remediation across CodeQL, Secret Scanning, and Dependabot alerts.

---

## 1. The 3-Step Remediation Strategy

### Step 1: Decode Native GitHub Alert Metadata

- **CodeQL**: Severity, CWE ID (enabling correlation with architectural controls like WAF or ORMs), and Copilot Autofix availability for rapid remediation.
- **Secret Scanning**: Validity status (`active` vs `inactive`), provider pattern verification (AWS, GitHub, Google, Slack, OpenAI).
- **Dependabot**: Severity rating, EPSS (Exploit Prediction Scoring System) indicating real-world in-the-wild exploitation probability, relationship (`direct` vs `transitive`), execution scope (`runtime` vs `development`), and patch availability.

### Step 2: Overlay Repository Custom Properties

Organizational risk is calculated by combining vulnerability metadata with repository properties:

- `internet_facing`: High priority for publicly accessible endpoints; lower immediate priority for internal microservices.
- `compliance`: Mandatory accelerated remediation for repositories governing FERPA, GDPR, or financial data.
- `business_criticality`: Mission-Critical and High tiers receive dedicated triage slots in sprints.
- `user_tier`: Impact radius scaled by active client/student populations.

### Step 3: Execute Focused Security Campaigns

- Security campaigns define targeted alert cohorts (e.g., Critical CodeQL with Autofix in internet-facing repos).
- Binding Service Level Objectives (SLOs):
  - **P0 Critical**: 7 days
  - **P1 High**: 14 days
  - **P2 Standard**: 30 days
  - **P3 Low**: 90 days
- Automated burndown tracking and alerts to assigned squad leads.

---

## 2. Automated Scoring Invariant

Every alert is prioritized using the formula:
$$\text{Score} = \text{BaseSeverity} \times M_{\text{EPSS}} \times M_{\text{Exposure}} \times M_{\text{Scope}} \times M_{\text{Validity}}$$

Alerts with scores $\ge 150$ trigger automated P0 emergency incident workflows.
