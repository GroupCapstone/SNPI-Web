---
name: smart-school-multi-institutional-classification
description: Authoritative Specification for the Smart School Enterprise Multi-Institutional Classification Architecture across 6 primary institutional archetypes and 33 subtypes (Schools, Colleges, Govt Schools/Ministries, Universities, Specialized Institutes, Distance Education) deployed on AWS Multi-Tenant Cloud. Enforces dynamic tenant customization, regulatory compliance, zero emoji, and PostgreSQL Row-Level Security isolation.
---

# Multi-Institutional Classification & Enterprise Tenancy Specification
## GeniusEdu AWS Cloud Architecture & Institutional Taxonomy (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Enterprise Platform** is architected to operate as a high-density, multi-tenant cloud enterprise hosted on **Amazon Web Services (AWS)**. It serves an expansive spectrum of educational institutions worldwide, ranging from single-campus Montessori schools to nationwide university systems and governmental education ministries.

To accommodate divergent regulatory regimes, academic scoring conventions, student lifecycle workflows, and fee billing structures without code fragmentation, the platform implements a **Polymorphic Institutional Tenant Model**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│              AWS MULTI-TENANT CLOUD ARCHITECTURE & TARGET AUDIENCE MATRIX             │
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

## 1. The 6 Institutional Archetypes & 33 Subtypes Taxonomy

### Archetype 01: Schools (K-12 & Specialized Early Childhood)
Schools feature tight guardian-student linkages, daily classroom roll-call attendance, formative homework evaluations, and mandatory parent communication channels.
1. **Private Special Education School**:
   - Capabilities: Individualized Education Programs (IEP) tracking, adaptive grading scales, therapy/counseling session scheduling, and specialized medical contact profiles.
2. **Virtual or Online School**:
   - Capabilities: 100% digital onboarding, asynchronous CBT assessments, integrated Zoom/Gmeet virtual classrooms, LMS digital content DRM tracking, and automated completion certificates.
3. **Boarding School (Residential)**:
   - Capabilities: Comprehensive residential hostel dormitory allocation, dietary food menu schedules, weekend outpass gate pass workflows, health clinic infirmary logs, and 24/7 guardian telemetry.
4. **Montessori & Early Childhood School**:
   - Capabilities: Milestone-based developmental progress logs, photo activity feeds, infant nutrition and sleep trackers, authorized guardian pickup verification with photo badges.
5. **Traditional Private School**:
   - Capabilities: Standard national/state curriculum tracks (CBSE, ICSE, Cambridge IGCSE, Baccalauréat), term fees, periodic exams, paper marksheets, and house points.
6. **Professional & Preparatory Schools**:
   - Capabilities: Accelerated curriculum tracks, high-velocity testing banks, entrance exam prep modules, and college counseling dossiers.

### Archetype 02: Colleges (Undergraduate & Technical Institutions)
Colleges require semester-based academic credits, departmental faculty autonomy, student elective course registrations, and vocational lab equipment management.
1. **Public / Private Degree Colleges**:
   - Capabilities: Semester credit systems, elective subject choices, departmental head oversight, graduation degree audit, and campus placement drives.
2. **Community Colleges**:
   - Capabilities: Flexible credit transfer pathways, non-traditional adult student scheduling, certificate program modules, and sliding-scale community fee tariffs.
3. **Vocational Colleges**:
   - Capabilities: Competency-based practical skill assessments, apprentice workshop hour logging, tool/equipment checkouts, and industrial internship verifications.
4. **Technical Schools & Poly-technics**:
   - Capabilities: Engineering laboratory inventory, machinery maintenance schedules, CAD/software license allocations, and project portfolio repositories.
5. **Women's Colleges**:
   - Capabilities: Dedicated residential safety protocols, women empowerment scholarship tracking, specialized co-curricular clubs, and secure transit corridors.
6. **Tribal & Regional Inclusion Colleges**:
   - Capabilities: Government welfare subsidy integration, native language interface options, hostel accommodation grants, and affirmative action quota verification.

### Archetype 03: Government Schools & Ministerial Departments
Government educational bodies require macro-level aggregation across thousands of regional schools, state welfare subsidy management, and civil service personnel rosters.
1. **Department of Higher Education (State / National)**:
   - Capabilities: Cross-university accreditation compliance, state-level budgetary allocations, research grant disbursement tracking, and executive macro BI telemetry.
2. **Department of Primary Education**:
   - Capabilities: Mid-day meal program inventory, free uniform and textbook distribution logs, teacher transfer/posting matrices, and district-wide enrollment census.
3. **Department of Social Welfare**:
   - Capabilities: Low-income student stipends, minority student scholarship processing, hostel welfare facility audits, and direct-benefit transfer (DBT) payment reconciliations.
4. **Department of Technical Education**:
   - Capabilities: Poly-technic curriculum standardization, state industrial apprentice alignments, and centralized polytechnic admissions counseling.
5. **Medical Education Department**:
   - Capabilities: Hospital clinical rotation scheduling, medical resident duty hour logging, licensing exam verification, and specialized medical laboratory equipment ledgers.

### Archetype 04: Universities (Higher Research & Multi-College Systems)
Universities represent high-complexity federations comprising constituent colleges, autonomous academic faculties, doctoral programs, and extensive research grant administration.
1. **Central Universities**:
   - Capabilities: Multi-state student intake, national entrance exam score ingestion, centralized hostel reservation systems, and federal compliance reporting.
2. **State Universities**:
   - Capabilities: Affiliated college examination clearinghouse, mass degree certificate issuance with cryptographic anti-counterfeit QR codes, and state quota management.
3. **Deemed Universities**:
   - Capabilities: Autonomous curriculum revision, independent fee structure determination, executive governance boards, and specialized postgraduate degrees.
4. **Private Universities**:
   - Capabilities: Modern dynamic multi-gateway fee collections, CRM student recruitment pipelines, international student visa documentation, and high-impact digital marketing tracking.
5. **Medical Universities**:
   - Capabilities: Pre-clinical and clinical cohort partitioning, anatomical dissection lab registries, patient ward shift rosters, and USMLE/PLAB preparation tracks.
6. **Law Universities**:
   - Capabilities: Moot court competition records, legal clinic case hour credits, bar council compliance syllabi, and specialized law library journal subscriptions.
7. **Agricultural Universities**:
   - Capabilities: Agronomy research station field logging, crop trial yield databases, livestock management modules, and rural extension training event trackers.
8. **Research Universities**:
   - Capabilities: Grant funding budget versus actuals, peer-reviewed publication repositories, laboratory consumable requisition workflows, and patent filing tracking.

### Archetype 05: Specialized Institutes & Coaching Academies
Institutes operate high-velocity student enrollment cycles, test-series subscription fee models, competitive exam rank predictors, and modular hourly billing.
1. **Specialized Institutes & Academies**:
   - Capabilities: Music, dance, fine arts, or language academies with individualized master-apprentice mentor matching and recital scheduling.
2. **Private Technical Training Institutions**:
   - Capabilities: Coding bootcamps, IT certification tracks, cloud lab access provisioning, and job placement candidate marketing dossiers.
3. **Technical Institutes**:
   - Capabilities: Specialized industrial safety certifications, trade apprentice tracking, and fast-track vocational testing.
4. **Coaching Classes (Competitive Exam Prep - JEE/NEET/SAT/IELTS)**:
   - Capabilities: High-frequency CBT mock exams, all-India / state percentile rank generation, negative marking engines, and parent test report SMS bursts.
5. **Tuition & Tutoring Centres**:
   - Capabilities: Micro-batch scheduling (5-15 students), hourly attendance registers, modular fee punch-cards, and flexible teacher compensation splits.

### Archetype 06: Distance Education & Open Learning Directorates
Distance learning institutions specialize in asynchronous self-paced study, postal/digital study material distribution, regional exam center networks, and assignment evaluation desks.
1. **Central Distance Universities**:
   - Capabilities: Massive scale (100,000+ enrolled students), decentralized study center networks, postal dispatch tracking for physical study books, and regional examination center allocations.
2. **State Distance Education Directorates**:
   - Capabilities: Subsidized regional adult education, local language course modules, radio/TV educational broadcast timetables, and weekend contact class registrations.
3. **Deemed Open Learning Universities**:
   - Capabilities: 100% digital self-service student onboarding, scannable assignment evaluation portals, e-library repository integrations, and on-demand examinations.

---

## 2. Dynamic Tenant Configuration Engine

To allow a single code base to adapt cleanly to all 33 institutional subtypes, the system provisions an immutable `TenantProfileConfig` record upon tenant onboarding:

```json
{
  "tenantId": "tnt_cambodia_001",
  "branchId": "br_siemreap_main",
  "organizationCategory": "SCHOOLS",
  "organizationSubtype": "BOARDING_SCHOOL",
  "academicConfiguration": {
    "termStructure": "SEMESTER",
    "gradingSystem": "GPA_4_0",
    "curriculumStandard": "CAMBRIDGE_IGCSE",
    "hasHouseSystem": true,
    "hasHostelModule": true,
    "hasTransportFleet": true,
    "hasCanteenBilling": true,
    "hasBiometricTurnstiles": true
  },
  "complianceConfiguration": {
    "countryCode": "KHM",
    "primaryCurrency": "USD",
    "secondaryCurrency": "KHR",
    "taxEngine": "VAT_EXEMPT_EDUCATION",
    "studentIdFormat": "KWD-SR-{YEAR}-{AUTO_5}"
  },
  "cloudTier": {
    "provider": "AWS",
    "region": "ap-southeast-1",
    "databaseRlsSchema": "tenant_cambodia_001",
    "dedicatedS3Bucket": "kwd-assets-cambodia-001"
  }
}
```

---

## 3. AWS Enterprise Multi-Tenant Cloud Architecture

1. **Edge & Content Delivery**:
   - **Amazon CloudFront**: Global CDN terminating TLS 1.3, caching static Vite/React bundles, font assets, and video streams at sub-20ms edge latencies.
   - **AWS WAF**: Web Application Firewall mitigating DDoS attacks, SQLi, and OWASP Top 10 vulnerabilities with automated rate limiting on login routes.
2. **Compute & Ingress**:
   - **AWS Application Load Balancer (ALB)**: SSL offloading, sticky sessions for WebSocket endpoints, and path-based routing (`/api/*` to backend microservices, `/*` to static S3 hosting).
   - **Amazon EKS / ECS Fargate**: Serverless container orchestration scaling Spring Boot 3 virtual thread microservices based on CPU and request latency metrics.
3. **Persistence & Security**:
   - **Amazon Aurora Serverless PostgreSQL**: Multi-AZ cluster with row-level security (RLS) partition keys enforcing complete cryptographic isolation between school tenants.
   - **Amazon ElastiCache Redis**: Distributed session management, sliding-window rate limit counters, and real-time transit bus coordinate caches.
   - **Amazon S3 & Glacier**: Tiered object storage for student homework sheets, marksheet PDFs, and campus video recordings with automated lifecycle archiving to Glacier after 365 days.
