---
name: smart-school-enterprise-ecosystem-and-accreditation
description: Authoritative Specification for the Smart School Enterprise Ecosystem, Multi-Curriculum SIS, CIS Accreditation, Wellbeing & Pastoral Care, Embeddable Website Enrollment Widget, and Global Partner/Developer Infrastructure. Enforces the 4 School Types, 5 Institutional Departments, 6 Core Value Pillars, 10 Modular Products, and Global Knowledgebase & Identity Portals.
---

# Enterprise School Types, CIS Accreditation & Global Ecosystem Specification
## Multi-Curriculum SIS, Wellbeing, Embeddable Admissions & Partner Ecosystem (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Enterprise Platform** operates as a sovereign, centralized operating system designed to run entire schools and multi-campus networks worldwide.

This specification codifies the platform's multi-curriculum capabilities, compliance standards (Council of International Schools - CIS accreditation, child safeguarding, GDPR/COPPA/FERPA), embeddable web components, pastoral student wellbeing monitoring, and global developer/partner integration topologies.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   ENTERPRISE SCHOOL ECOSYSTEM & GLOBAL TAXONOMY                        │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ 1. BY SCHOOL TYPE         │ 2. BY DEPARTMENT          │ 3. CORE VALUE PILLARS          │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ - Groups / Enterprise     │ - Administration (503)    │ - Central System for Whole Sch │
│ - Independent Private K-12│ - Academics               │ - Multi-Curriculum SIS K-12    │
│ - International K-12      │ - Human Resources (HR)    │ - 3rd-Party Open Integrations  │
│ - Virtual / Online K-12   │ - Finance                 │ - Embeddable Website Enrolment │
│                           │ - Teaching                │ - Fully Managed Support Centre │
│                           │                           │ - CIS Accredited SMS Standards │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ 4. 10 MODULAR PRODUCT DOMAINS (MIS / SIS CORE)                                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ • MIS / SIS Core          • Compliance & CIS Audits   • Wellbeing & Pastoral Care      │
│ • Automated Admissions    • Finance & Accounting      • Payments & Remittance          │
│ • Data & Analytics BI     • HR & Payroll Engine       • Integrations & Open APIs (REST)│
│ • Omnichannel Messaging   • Identity & SSO Portal     • University Guidance Portal     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. GLOBAL SUPPORT & DEVELOPER RESOURCES                                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Case Studies • Blog • Guides & Webinars • Product Videos • Developers Hub • Partners   │
│ 15+ Interactive Help Guides • Knowledgebase • Identity SSO • Training Webinars         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 4 Enterprise School Types

### School Type 01: Groups / Enterprise Networks
- **Architectural Scope**: Multi-academy trusts, municipal school districts, and global multi-campus educational conglomerates.
- **Key Capabilities**:
  - Centralized multi-branch federation with instant campus context switching (`X-Branch-ID`).
  - Consolidated multi-campus balance sheets, group-wide fee collection clearinghouses, and standardized procurement.
  - Cross-campus faculty mobility and centralized human resource payroll processing.
  - District-wide longitudinal student tracking and comparative academic bell curves.

### School Type 02: Independent / Private K-12 Schools
- **Architectural Scope**: Autonomous private schools requiring bespoke branding, alumni foundations, and flexible fee schedules.
- **Key Capabilities**:
  - Independent fee billing models (term payments, flexible installment plans, auxiliary activity surcharges).
  - Alumni association portal, donor contribution ledgers, and endowment fund tracking.
  - White-label portal appearance customization (`src/config/brand.ts`) with custom domain DNS routing.

### School Type 03: International Multi-Curriculum K-12 Schools
- **Architectural Scope**: Accredited international institutions serving multi-lingual, globally mobile student cohorts.
- **Key Capabilities**:
  - **Simultaneous Multi-Curriculum Framework Support**:
    - **International Baccalaureate (IB)**: Primary Years Programme (PYP), Middle Years Programme (MYP), and Diploma Programme (DP) criteria, learner profile attributes, and Theory of Knowledge (TOK) / Extended Essay portfolios.
    - **Cambridge Assessment International Education (CAIE)**: Cambridge Primary, Checkpoint, IGCSE, and AS/A-Levels with standardized component marks and grade boundaries.
    - **American Curriculum**: Common Core State Standards (CCSS), Advanced Placement (AP) courses, and 4.0 weighted/unweighted GPA calculations.
    - **National / Host Country Curricula**: Host country language requirements and statutory examinations.
  - Multi-lingual UI localization (English, Khmer, Spanish, French, Mandarin) with dynamic script font rendering.
  - Dual-currency and foreign currency tuition billing with automated spot exchange rate calculations.

### School Type 04: Virtual / Online K-12 Schools
- **Architectural Scope**: 100% remote asynchronous and synchronous digital educational institutions.
- **Key Capabilities**:
  - Fully digital paperless onboarding with automated identity document verification.
  - Deep LMS integration with DRM video streaming, SCORM course packages, and interactive digital assessments.
  - Asynchronous CBT testing with automated biometric webcam proctoring and anti-cheat screen lockouts.
  - Global timezone timetable scheduling supporting asynchronous lesson plan completion tracking.

---

## 2. The 5 Core Departmental Hubs

1. **Administration Hub (Dept 503)**:
   - Central control plane managing institutional identity, statutory reporting, campus security turnstiles, visitor gate passes, and board compliance documentation.
2. **Academics Hub**:
   - Master curriculum planning, course syllabus breakdown, classroom capacity management, and clash-free timetable optimization.
3. **Human Resources (HR) Hub**:
   - Faculty recruitment (ATS), staff credential verification, biometric attendance tracking, leave entitlement balances, and automated monthly payroll.
4. **Finance Hub**:
   - Multi-tier fee structuring, automated student invoicing, online gateway checkout, bank wire slip reconciliation, and statutory general ledger (P&L, Balance Sheet, Trial Balance).
5. **Teaching Hub**:
   - Daily instructional delivery, sub-45s classroom roll-call, mobile whiteboard homework capture, student performance analytics, and structured parent communication.

---

## 3. The 6 Sovereign Value Pillars

### Pillar 01: A Central System to Run Your Whole School
- Eliminates siloed software by providing a unified single-sign-on ERP kernel managing students, teachers, finances, curriculum, and physical campus assets in one place.

### Pillar 02: Multi-Curriculum Student Information System (SIS) for K-12
- Flexible academic engine accommodating IB, Cambridge, American, and national evaluation rubrics within the same student cohort and transcript generator.

### Pillar 03: Multiple Third-Party Integrations & Open APIs
- Enterprise interoperability connecting to leading educational tools:
  - LMS: Canvas, Moodle, Google Classroom, Blackboard.
  - Video Conferencing: Google Meet, Zoom, Microsoft Teams.
  - Identity Providers: Google Workspace, Microsoft Entra ID (Azure AD), Okta via SAML 2.0 / OIDC.
  - Payment Gateways: Stripe, PayPal, Razorpay, ABA PayWay, Wing Bank.
  - Hardware: ZKTeco biometric scanners, UHF RFID bus antennas, Hikvision access control turnstiles.

### Pillar 04: Automated Online Enrolment System Embeddable on School Websites
- Self-contained, lightweight embeddable widget / web component (`<school-enrolment-widget>`) that mounts directly onto any WordPress, Webflow, Squarespace, or custom institutional website.

#### Embeddable Web Component Implementation:
```html
<!-- Embed on School Website -->
<script src="https://cdn.schoolsystem.edu/v1/enrolment-widget.js" async></script>
<school-enrolment-widget
  school-id="sch_siemreap_01"
  academic-session="2026-27"
  theme="liquid-glass"
  locale="en"
  api-endpoint="https://api.schoolsystem.edu/api/v1/admissions/public/apply">
</school-enrolment-widget>
```

### Pillar 05: Fully Managed Service with Established Local Support Centres
- Enterprise SLA offering 99.95% uptime guarantees, automated daily multi-AZ database backups, regional disaster recovery, and dedicated localized support desks providing on-site assistance and telephone support.

### Pillar 06: CIS Accredited School Management System
- Fully compliant with the standards set by the **Council of International Schools (CIS)**:
  - **Child Safeguarding & Child Protection**: Strict role-based isolation of sensitive pastoral records, background-check logs for all adults on campus, and emergency safeguarding referral flags.
  - **Data Privacy & Governance**: Strict compliance with GDPR, COPPA, and FERPA standards, complete encryption at rest (AES-256) and in transit (TLS 1.3), and automated data subject access request (DSAR) export tools.
  - **Continuous Accreditation Audit Trails**: Immutable tamper-evident logging of every grade modification, attendance override, and financial invoice mutation.

---

## 4. The 10 Modular Products & Services (MIS / SIS Core)

### 4.1 MIS / SIS Core
- Single source of truth for student 360 dossiers, family/sibling relationships, medical alerts, emergency contacts, and historical academic transcripts.

### 4.2 Admissions & Automated Enrolment
- Digital applicant intake pipeline with automated document verification, applicant entrance exam scheduling, interview scoring, and automated acceptance letter generation.

### 4.3 Data & Analytics (BI)
- Executive visual dashboards tracking enrollment funnel drop-offs, student retention curves, demographic breakdowns, and academic subject performance benchmarks.

### 4.4 Omnichannel Communication
- Unified communications engine dispatching push notifications, DLT-compliant SMS, transactional emails, and emergency alerts from a single broadcast desk.

### 4.5 Compliance & Child Safeguarding
- Encrypted pastoral safeguarding module with role-restricted access, audit logging, and automated reporting for child protection officers.

### 4.6 Finance & Accounting
- Institutional fee engine with split billing, scholarship allocations, e-challans, and double-entry accounting ledgers.

### 4.7 HR & Automated Payroll
- Biometric time tracking, faculty appraisal cycles, leave approvals, salary slip generation, and tax withholdings.

### 4.8 Payments & Bank Remittance
- Multi-gateway checkout, automated payment reconciliation, and bank wire deposit slip verification.

### 4.9 Wellbeing & Pastoral Care
- Student emotional check-ins, counselor consultation logs, infirmary visit records, and behavioral commendation tracking.

### 4.10 Integrations & Open APIs
- Secure OpenAPI 3.0 REST endpoints, webhook subscriptions, and real-time Kafka event streams.

---

## 5. Global Support, Resources & Developer Ecosystem

### 5.1 Helpful Resources
- **Case Studies**: In-depth implementation reviews showcasing quantifiable operational ROI (e.g., 50% admin overhead reduction, 70% paper cost savings).
- **Blog**: Educational leadership insights, curriculum innovation updates, and campus safety best practices.
- **Guides & Webinars**: Comprehensive pedagogical guides and monthly expert webinars for school administrators.
- **Product Videos**: Interactive video walkthroughs illustrating module features and screen interactions.

### 5.2 Developer & Partner Hub
- **Developers Portal**: Interactive Swagger/OpenAPI documentation, API keys generation, webhook testing consoles, and SDK libraries (TypeScript, Python, Java).
- **Partners & Integrators**: Directory of certified technology partners, edtech tool integrations, and hardware deployment specialists.

### 5.3 Existing Customer Success
- **Dedicated Support Help Desk**: 24/7 ticketing portal with tiered escalation paths and live chat support.
- **15+ Interactive Help Guides**: Step-by-step documentation covering every administrative and instructional workflow.
- **Training Webinars**: Regular live professional development sessions for newly onboarded faculty and administrative staff.

### 5.4 Specialized Portals
- **Identity Portal**: Centralized Single Sign-On (SSO) gateway supporting SAML 2.0, OpenID Connect (OIDC), and OAuth2 authentication across all school services.
- **University Guidance Portal**: College admissions counseling desk managing high school transcripts, predicted IB/A-Level grades, letters of recommendation, and university application tracking (Common App, UCAS).
- **Students & Parents Portal**: Multi-ward self-service dashboard for academic tracking, fee settlement, and teacher dialogue.
- **Teachers & Faculty Portal**: Comprehensive classroom workspace for instruction, attendance, and grading.

---

## 6. Implementation Checklist & Conformance Sign-Off

- [x] **4 School Types Configured**: Groups, Independent, International (IB/CAIE/AP), Virtual.
- [x] **5 Departmental Roles Partitioned**: Admin, Academics, HR, Finance, Teaching.
- [x] **Multi-Curriculum Grading Engine Active**: IB criteria, Cambridge scales, 4.0 GPA.
- [x] **Embeddable Enrolment Widget SDK Active**: Lightweight JS component for school websites.
- [x] **CIS Accreditation & Safeguarding Certified**: Encrypted pastoral logs & immutable audit trails.
- [x] **Wellbeing & Pastoral Module Online**: Daily check-ins, infirmary logs, counselor notes.
- [x] **Developer OpenAPI & Webhook Engine Online**: Documented endpoints with Bearer auth.
- [x] **Identity SSO Active**: SAML 2.0 / OIDC integrations with Google Workspace & Microsoft Entra.
- [x] **Zero Emoji Enforcement**: 100% compliant across all schemas, docs, and UI components.
