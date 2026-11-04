---
name: smart-school-cloud-infrastructure-and-enterprise-erp
description: Authoritative Specification and Operational Architecture for Genius Cloud AWS 8-Tier Infrastructure, 14 Core ERP Modules, Expanded 42+ Dynamic Role Matrix, Group Admin & Institute Federation, and Granular Genius Cloud Submodules (Data Management, Timetable Proxy, Canteen POS, Contract Generation, Multi-Directional Attendance Punctuality Analytics, Transport Bank Reconciliation). Trigger whenever configuring AWS infrastructure, deploying ERP microservices, setting up dynamic roles, managing proxy timetables, implementing canteen POS, or analyzing punctuality telemetry.
---

# Genius Cloud AWS Infrastructure & Enterprise ERP
## 8-Tier Cloud Topology, 14 Core Modules, 42+ Dynamic Roles & Genius Cloud Submodules (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-cloud-infrastructure-and-enterprise-erp** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** of the Smart School Enterprise Platform.

This skill governs the platform's AWS 8-tier centralized infrastructure topology, disaster recovery protocols, high availability guarantees, the 14 core ERP modules, the expanded 42+ role hierarchy with Group Admin federation, and granular Genius Cloud submodules.

---

## 1. Master Cloud Topology & Operational Ecosystem

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               GENIUS CLOUD ON AWS: 8-TIER DISTRIBUTED TOPOLOGY                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [1. CDN SERVICES]       AWS CloudFront Global Edge Locations & DDoS Shield             │
│          ▼                                                                             │
│ [2. SSL SECURITY LAYER] TLS 1.3 Termination, ACM Automated Certificates, HSTS Strict   │
│          ▼                                                                             │
│ [3. LOAD BALANCER]      AWS Application Load Balancer (ALB) Multi-AZ Traffic Ingress   │
│          ▼                                                                             │
│ ┌───────────────────────────┬────────────────────────────────────────────────────────┐ │
│ │ [4. APPLICATION SERVER]   │ [5. API SERVER]                                        │ │
│ │ Next.js 15 SSR & Static   │ Spring Boot 3 Virtual Threads REST & Kafka Ingress     │ │
│ └─────────────┬─────────────┴───────────────────────────┬────────────────────────────┘ │
│               ▼                                         ▼                              │
│ ┌───────────────────────────┬───────────────────────────┬────────────────────────────┐ │
│ │ [6. POSTGRESQL DB SERVER] │ [7. FILE STORAGE SERVER]  │ [8. BACKUP SERVER]         │ │
│ │ RDS Multi-AZ RLS Engine   │ AWS S3 Encrypted Buckets  │ AWS Backup Snapshots & DR  │ │
│ └───────────────────────────┴───────────────────────────┴────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 14 CORE ERP MODULES                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • 01. Online Admission & Enrollment   • 06. Human Resource Management (HRM)            │
│ • 02. Student Management Module       • 07. Finance & Fees Management                  │
│ • 03. Academic Management Module      • 08. Library Management Module                  │
│ • 04. Examination Management Module   • 09. Hostel Management Module                   │
│ • 05. Attendance Management Module    • 10. School Bus Transportation Management       │
│ • 11. Messaging & Notification        • 12. Inventory & Asset Management               │
│ • 13. Event & Activity Management     • 14. Canteen POS & Campus Health Management     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Directives for Agents

1. **Directive C-01 (AWS Centralized Hosting & High Availability)**:
   - All compute, API, and database services MUST deploy across a minimum of 3 AWS Availability Zones (AZs) with automated failover and 99.95% uptime SLA guarantees.
2. **Directive C-02 (TLS 1.3 & Edge CDN Security)**:
   - External traffic MUST pass through CloudFront CDN with AWS WAF protection and terminate at Application Load Balancers enforcing TLS 1.3 and HSTS.
3. **Directive C-03 (PostgreSQL Multi-Tenant RLS & Private Subnets)**:
   - Database servers MUST reside in private VPC subnets with zero public internet exposure. Multi-tenancy MUST enforce PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`).
4. **Directive C-04 (14 Core ERP Modular Partitioning)**:
   - Architecture MUST preserve clean separation between the 14 core modules while enabling unified student 360 dossiers and consolidated general ledger bookkeeping.
5. **Directive C-05 (42+ Dynamic Role Matrix & Group Federation)**:
   - Role-Based Access Control (RBAC) MUST support all 42+ identified institutional roles across High Executive, Academic Leadership, Operations, Auxiliary, and Guest tiers. Multi-campus logins MUST use "LOGIN WITH GROUP ADMIN AND INSTITUTE" context switching via `X-Group-ID` and `X-Institute-ID` headers.
6. **Directive C-06 (Multi-Dimensional Punctuality Telemetry)**:
   - Attendance tracking MUST capture and report 8 punctuality metrics: Present, Absent, Late-In (logged minute offset), Late-Out, Early-In, Early-Out, Approved Leave, and Gender-Wise Attendance Parity.
7. **Directive C-07 (Automated Backup & Disaster Recovery RPO/RTO)**:
   - Continuous WAL archiving and automated daily snapshots MUST guarantee an RPO < 5 minutes and an RTO < 15 minutes with cross-region cold standby support.
8. **Directive C-08 (Strict Zero Emoji Enforcement)**:
   - Zero emojis across all infrastructure scripts, CloudWatch metrics, ERP database tables, UI components, and logs. Use Google Material Symbols Outlined exclusively.

---

## 3. Reference Blueprints
For exhaustive technical schemas, REST contracts, and architectural workflows, agents MUST consult:
- **Spec 76**: [`references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md)
- **Master Feature Catalog**: [`references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md) (Section 24: Features 291 to 310)
- **Primary Skills Directory**: [`references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md) ([P-16])
- **Audit Compendium**: [`references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md) (Suite 14 Quality Gates)
