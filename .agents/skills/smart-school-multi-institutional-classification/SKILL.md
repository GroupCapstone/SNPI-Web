---
name: smart-school-multi-institutional-classification
description: Authoritative Specification for the Smart School Enterprise Multi-Institutional Classification Architecture across 6 primary institutional archetypes and 33 subtypes (Schools, Colleges, Govt Schools/Ministries, Universities, Specialized Institutes, Distance Education) deployed on AWS Multi-Tenant Cloud. Enforces dynamic tenant customization, regulatory compliance, zero emoji, and PostgreSQL Row-Level Security isolation. Trigger whenever configuring multi-tenant schemas, onboarding institutional subtypes, or adapting platform workflows to diverse educational frameworks.
---

# Multi-Institutional Classification & Enterprise Tenancy
## 6 Institutional Archetypes, 33 Subtypes & AWS Cloud Architecture (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-multi-institutional-classification** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** of the Smart School Enterprise Platform.

This skill governs multi-tenant adaptation across all 33 educational institution types, ensuring that institutional business logic (IEPs for Special Ed, hostel dining for Boarding Schools, credit transfers for Colleges, hospital rotations for Medical Universities, massive scale for Distance Learning) functions seamlessly within a single unified code base and database cluster.

---

## 1. The 6 Archetypes & 33 Subtypes Classification Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│              6 INSTITUTIONAL ARCHETYPES & 33 SUBTYPES ON AWS CLOUD                     │
├───────────────────┬───────────────────┬───────────────────┬────────────────────────────┤
│ 1. SCHOOLS (6)    │ 2. COLLEGES (6)   │ 3. GOVT BODIES (5)│ 4. UNIVERSITIES (8)        │
├───────────────────┼───────────────────┼───────────────────┼────────────────────────────┤
│ - Special Ed      │ - Public/Private  │ - Higher Education│ - Central Universities     │
│ - Virtual/Online  │ - Community Coll. │ - Primary Ed Dept │ - State Universities       │
│ - Boarding School │ - Vocational Coll.│ - Social Welfare  │ - Deemed Universities      │
│ - Montessori      │ - Technical School│ - Technical Ed Dpt│ - Private Universities     │
│ - Traditional Priv│ - Women's Colleges│ - Medical Ed Dept │ - Medical Universities     │
│ - Professional Sch│ - Tribal Colleges │                   │ - Law / Agri / Research    │
├───────────────────┴───────────────────┴───────────────────┴────────────────────────────┤
│ 5. SPECIALIZED INSTITUTES (5)         │ 6. DISTANCE EDUCATION (3)                      │
├───────────────────────────────────────┼────────────────────────────────────────────────┤
│ - Specialized Institutes / Academies  │ - Central Distance Universities                │
│ - Private Technical Institutes        │ - State Distance Education Directorates        │
│ - Technical Schools                   │ - Deemed Open Learning Universities            │
│ - Coaching Classes / Test Prep        │                                                │
│ - Tuition & Tutoring Centres          │                                                │
├───────────────────────────────────────┴────────────────────────────────────────────────┤
│ CLOUD INFRASTRUCTURE: AWS VPC, ECS/EKS Fargate, Neon/RDS PostgreSQL RLS, S3, CloudFront│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Tenancy Directives for Agents

1. **Directive T-01 (Mandatory RLS Partitioning)**: All operational database tables MUST enforce PostgreSQL Row-Level Security: `branch_id = current_setting('app.current_branch_id')`. Multi-campus Super Admins use `SET LOCAL app.bypass_rls = 'true'`.
2. **Directive T-02 (Polymorphic Profile Configuration)**: Hardcoded assumptions regarding term structure or grading are strictly forbidden. The system MUST resolve parameters dynamically from `TenantProfileConfig`.
3. **Directive T-03 (AWS Multi-AZ Availability)**: All persistence and microservices infrastructure MUST be deployed across at least 3 AWS Availability Zones (`ap-southeast-1a`, `1b`, `1c`) with auto-scaling groups.
4. **Directive T-04 (Multi-Currency & Tax Localization)**: Every financial transaction record MUST record both the local currency (`KHR`, `INR`, `THB`) and base reporting currency (`USD`) alongside tax exemption status.
5. **Directive T-05 (Zero Cross-Tenant Leakage)**: Inter-service communication via Kafka or REST MUST validate that the requesting user's tenant ID matches the payload tenant ID.
6. **Directive T-06 (Strict Zero Emoji Directive)**: Zero emojis across all tenant onboarding wizards, schemas, and reports.

---

## 3. Reference Blueprints
For detailed subtype capabilities and tenant configuration JSON schemas, agents MUST consult:
- **Spec 70**: [`references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md)
- **Spec 09**: [`references/09_MULTI_BRANCH_CRUD_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/09_MULTI_BRANCH_CRUD_SPEC.md)
- **Spec 57**: [`references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md)
