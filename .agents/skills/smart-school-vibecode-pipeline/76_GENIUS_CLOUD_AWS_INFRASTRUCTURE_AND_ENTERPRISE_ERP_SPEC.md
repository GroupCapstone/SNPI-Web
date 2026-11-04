---
name: smart-school-cloud-infrastructure-and-enterprise-erp
description: Authoritative Specification for the Genius Cloud AWS 8-Tier Infrastructure Topology, 14 Core ERP Modules, Expanded 42+ Dynamic Role Matrix, Group Admin & Institute Federation, and Granular Genius Cloud Submodules (Data Management, Timetable Proxy, Canteen POS, Contract Generation, Multi-Directional Attendance Punctuality Analytics, Transport Bank Reconciliation).
---

# Genius Cloud AWS Infrastructure & Enterprise ERP Specification
## 8-Tier Cloud Infrastructure, 14 Core Modules, 42+ Dynamic Roles & Genius Cloud Submodules (ABLOB Architecture)

### Executive Architecture Overview

The **Smart School Enterprise Platform (Genius Cloud on AWS)** delivers a mission-critical, enterprise-grade educational ERP running on an automated, highly available Amazon Web Services (AWS) centralized topology.

This specification establishes the authoritative engineering definitions for:
1. **8 AWS Infrastructure Components & Availability Guarantees**: Application Server, API Server, PostgreSQL RDS with RLS, S3 File Storage, Automated Backup Server, Application Load Balancers, SSL/TLS 1.3 Security, and CloudFront CDN.
2. **14 Core ERP Modules**: Full coverage from Admissions to Canteen POS and Campus Clinic Health Management.
3. **Expanded 42+ Dynamic User Roles Matrix**: Comprehensive role hierarchy supporting Multi-Academy Trusts, Universities, Colleges, and K-12 networks with "LOGIN WITH GROUP ADMIN AND INSTITUTE" federation.
4. **Genius Cloud Granular Submodules**: Exact screen and function architectures including General Register (GR) reports, Timetable Proxy substitutions, Canteen POS weekly meal menus, Contract Generation, 8-directional attendance punctuality telemetry (Late-In, Late-Out, Early-In, Early-Out, Gender-wise), and Transportation Fee Bank Reconciliation.

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
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. AWS 8-Tier Infrastructure Topology & Operational Guarantees

### 1.1 The 8 Infrastructure Components
1. **Application Server (`AppServerCluster`)**:
   - Hosts the core user interface, Next.js 15 React SSR frontends, dynamic component hydration, and localized client sessions.
   - Deployed on AWS ECS Fargate containers across multiple Availability Zones (AZs) with auto-scaling based on CPU/memory utilization.
2. **API Server (`ApiServerCluster`)**:
   - Handles all RESTful API endpoints, external integrations, GraphQL queries, and asynchronous Kafka event ingestion.
   - Powered by Spring Boot 3 with Java 21 Virtual Threads (Project Loom) for high-concurrency, low-latency microservice requests.
3. **PostgreSQL Database Server (`RdsPostgresMultiAZ`)**:
   - Stores and manages transactional application state with native Row-Level Security (RLS) enforcing branch-level tenant isolation.
   - Deployed on AWS Aurora / RDS PostgreSQL Multi-AZ with synchronous replication to an automatic standby replica in a secondary AZ.
4. **File Storage Server (`S3FileStorageVault`)**:
   - Stores and manages student admissions documents, teacher uploads, homework camera captures, digital library assets, and certificates.
   - Built on AWS S3 with server-side encryption (SSE-S3 / SSE-KMS), signed temporary URLs, and S3 Lifecycle rules archiving to S3 Glacier.
5. **Backup Server (`AwsBackupService`)**:
   - Performs automated, scheduled daily and point-in-time recovery (PITR) snapshots of database clusters, persistent storage, and configuration state.
   - Cross-region replication ensures enterprise business continuity even in total regional disaster events.
6. **Load Balancer (`ApplicationLoadBalancer`)**:
   - AWS Application Load Balancers (ALB) distribute incoming HTTPS traffic across healthy container targets using round-robin and least-outstanding-requests algorithms.
   - Automated health checks (`/actuator/health` and `/api/health`) drain and terminate unhealthy instances within 15 seconds.
7. **SSL Security Layer (`SslTlsSecurityEngine`)**:
   - Enforces TLS 1.3 protocol encryption on all ingress and egress channels.
   - Automated SSL/TLS certificates provisioned via AWS Certificate Manager (ACM) with HTTP Strict Transport Security (HSTS) headers.
8. **CDN Services (`CloudFrontCdnEdge`)**:
   - AWS CloudFront Content Delivery Network with 450+ global Points of Presence (PoPs) caching static assets, student photos, and media libraries close to users worldwide.
   - Integrated with AWS WAF (Web Application Firewall) to mitigate layer-7 DDoS attacks, SQL injection, and cross-site scripting attempts.

### 1.2 Enterprise Cloud Guarantees
- **Centralized Hosting**: All components run within a dedicated, VPC-isolated AWS environment with private subnets for compute and database layers.
- **Automated Backup**: Automated continuous WAL archiving and snapshot scheduling yielding an RPO (Recovery Point Objective) of less than 5 minutes.
- **Disaster Recovery Support**: Multi-AZ failover and cross-region cold standby infrastructure providing an RTO (Recovery Time Objective) of under 15 minutes.
- **High Availability**: Redundant nodes deployed across a minimum of 3 availability zones with 99.95% SLA uptime commitment.
- **Scalable Infrastructure**: Horizontal Pod Autoscaling (HPA) and ECS task auto-scaling dynamically provisioning capacity during peak traffic bursts (e.g., morning roll-call, exam results release).
- **Secure SSL Communication**: Strict end-to-end encryption in transit (TLS 1.3) and encryption at rest (AES-256) across all compute, cache, and database layers.
- **24/7 Cloud Monitoring**: Continuous monitoring via AWS CloudWatch, Datadog APM, and Prometheus/Grafana with automated pager alerts for latency, error rates, and resource saturation.

---

## 2. The 14 Core ERP Modules & Capabilities

### Module 01: Online Admission & Enrollment Module
- **Core Features**:
  - Multi-step online admission form with configurable intake fields and dynamic branch routing.
  - Real-time application tracking portal for prospective parents and students.
  - Encrypted document upload vault for birth certificates, transfer certificates, and immunization records.
  - Automated merit calculation engine and cutoff-based admission approval workflows.
  - Entrance examination scheduling, computer-based testing, and computerized marks ranking integration.
  - 1-click student registration, General Register (GR) assignment, and batch onboarding.
  - Real-time admissions funnel BI analytics and intake yield reports.
- **Enterprise Benefits**:
  - 100% paperless admissions process.
  - Faster application processing turnaround (sub-24 hours).
  - Real-time tracking and automated status SMS/email updates to parents.
  - Centralized multi-campus intake management.

### Module 02: Student Management Module
- **Core Features**:
  - Comprehensive Student 360 profile management (demographics, guardians, health alerts, behavioral notes).
  - Longitudinal academic history tracking across all enrolled terms and grade levels.
  - Real-time attendance percentage tracking and absence pattern detection.
  - Continuous academic performance monitoring with longitudinal grade trajectory curves.
  - Automated student promotion workflows with custom cutoff criteria and holdover management.
  - Cohort and batch management with section re-allocation.
  - Dual-layout PVC student ID card generation with machine-readable QR codes.
  - Inter-school and intra-group student transfer certificate (TC) management.
  - Merit and need-based scholarship allocation, concession tracking, and sponsor billing.
  - Automated generation of dynamic diplomas, merit awards, and character certificates.
- **Reporting Engine**:
  - Student Progress Reports, Student Overall Year-Wise Reports, Formal Academic Transcripts, Attendance Analytics, and Demographic Bell Curves.

### Module 03: Academic Management Module
- **Core Features**:
  - Multi-tier course, programme, department, and stream structuring.
  - Subject catalog management with theory/practical credit weightages and prerequisites.
  - Semester, term, and academic session calendar lifecycle configuration.
  - Collision-free timetable generator with room allocation and faculty workload limits.
  - Lesson planning modules with topic breakdowns, learning objectives, and pacing meters.
  - Syllabus completion tracking with visual teacher progress bars.
  - Institutional academic calendar publishing with holiday, exam, and event markers.
  - Dynamic faculty workload allocation, subject mapping, and classroom assignment.
  - Academic credit accumulation and graduation requirement monitoring.

### Module 04: Examination Management Module
- **Core Features**:
  - Dual-mode assessment engine: Online Computer-Based Testing (CBT) and Offline Paper Exams.
  - Algorithmic Question Paper Generator pulling from tagged Bloom's taxonomy repositories.
  - Centralized question bank management with difficulty ratings, topic tags, and media attachments.
  - Conflict-free exam scheduling and hall ticket / admit card generation with roll numbers.
  - Exam group structuring (Formative, Summative, Midterm, Finals) with custom weightage models.
  - Grading system governance (Percentage, Letter Scales A*-G, 4.0 GPA, IB 1-7 Criterion).
  - Bulk computerized mark entry with double-blind verification and moderation workflows.
- **Examination Reports**:
  - Exam Result Reports, Class-Wise Grade Reports, Batch Mark Sheet PDF Generation, Academic Transcripts, and Longitudinal Subject Performance Analytics.

### Module 05: Attendance Management Module
- **Core Features**:
  - Dual student and faculty daily roll-call interfaces.
  - Biometric device integration (ZKTeco, Suprema) via TCP/IP and HTTP push listeners.
  - UHF RFID gate turnstile and school bus proximity card integration.
  - Mobile app geotagged and geofenced attendance capture for remote faculty.
  - QR-code dynamic daily attendance scanning.
  - Shift management for multi-shift institutions (Morning, Afternoon, Evening sessions).
  - Leave entitlement management, balance accrual, and multi-tier approval chains.
- **Attendance Analytics & Granular Reports**:
  - Student and Employee Daily/Monthly Reports, Department-Wise Attendance, Gender-Wise Attendance Parity, Absenteeism Reports, and 8-Directional Punctuality Logs (Late-In, Late-Out, Early-In, Early-Out).

### Module 06: Human Resource Management (HRM)
- **Core Features**:
  - Complete employee dossier management (credentials, qualifications, statutory IDs, contracts).
  - Automated monthly payroll engine computing earnings, allowances, deductions, and net pay.
  - Computerized salary slip PDF generation with 1-click email/portal distribution.
  - Faculty appraisal cycles with 360-degree peer, student, and administrator evaluation rubrics.
  - Applicant Tracking System (ATS) for open faculty positions, interviews, and offer letters.
  - Encrypted staff documents vault (contracts, diplomas, background check clearances).
- **HR Reporting**:
  - Salary Register Reports, Leave Balance Statements, Biometric Attendance Logs, Employee Analytics, and Staff Turnover Metrics.

### Module 07: Finance & Fees Management Module
- **Core Features**:
  - Multi-tier fee structure builder (Tuition, Transport, Hostel, Canteen, Examination, Lab).
  - Integrated online payment gateway checkout (Stripe, PayPal, Razorpay, ABA PayWay, Wing).
  - POS cashier counter fee collection desk with partial payments and multi-tender splits.
  - Fee concession and scholarship disbursement ledger with donor sponsorship tracking.
  - Double-entry accounting kernel with Chart of Accounts, General Ledger, Cash Book, and Bank Book.
  - Institutional budget management with departmental expenditure caps and variance alerts.
  - Cash and bank account reconciliation with automated statement upload matching.
  - Multi-currency billing with spot exchange rate conversion.
  - Automated machine-readable triplicate e-challans for bank counter payments.
- **Financial Reporting**:
  - Income Statements (P&L), Balance Sheets, Trial Balance, Fee Collection Summaries, Defaulters Aging Reports, and Executive MIS Analytics.

### Module 08: Library Management Module
- **Core Features**:
  - MARC-21 compliant book catalog management with Dewey Decimal / Library of Congress classification.
  - Automated book issue, return, and renewal desk with barcode / RFID scanner support.
  - Digital library repository hosting e-books, research PDFs, and video lectures.
  - Automated overdue fine calculation with grace period rules and fee ledger integration.
  - Student and faculty library membership card generation with barcode embedding.
  - OPAC (Online Public Access Catalog) for self-service book search and reservation.

### Module 09: Hostel Management Module
- **Core Features**:
  - Multi-building hostel master setup (Blocks, Floors, Room Types, Amenities).
  - Automated bed and room allocation with gender-segregated floor policies.
  - Daily hostel night roll-call and biometric curfew verification.
  - Hostel room fee, utility surcharge, and maintenance billing.
  - Visitor and guardian gate pass logs with photo capture and check-out tracking.
  - Comprehensive hostel occupancy, maintenance request, and dietary reporting.

### Module 10: School Bus Transportation Management Module
- **Core Features**:
  - Fleet vehicle management (Buses, Vans, Capacity, Maintenance, Fuel Logs, Insurance).
  - Driver and chaperone dossier management with license validity monitoring.
  - Route planning with geocoded pickup and drop stop locations.
  - Real-time GPS vehicle tracking with speed telemetry, route deviation alerts, and delay tracking.
  - Student vehicle allocation and proximity card bus boarding logs.
  - Parent mobile app live bus map stream with 1km geofenced proximity alerts.
  - Transportation fee billing with automated bank reconciliation.

### Module 11: Messaging & Notification Module
- **Core Features**:
  - Omnichannel notification engine: Push Notifications, DLT SMS, Transactional Email, and Internal Chat.
  - Institutional circular broadcast desk with role targeting (Students, Parents, Teachers, Staff).
  - Real-time trigger alerts: Attendance Absence Alerts, Daily Homework Alerts, Exam Timetable Alerts, Fee Due Reminders, and Urgent Emergency Bulletins.
  - Customizable message templates with variable interpolation (`[student_name]`, `[due_amount]`, `[event_date]`).

### Module 12: Inventory & Asset Management Module
- **Core Features**:
  - Capital asset tracking with QR/barcode asset tags, depreciation schedules, and room assignment.
  - Consumable inventory store management (Stationery, Lab reagents, Sports equipment).
  - Purchase requisition, purchase order (PO) generation, and multi-tier procurement approvals.
  - Vendor directory with quote comparisons, delivery tracking, and invoice matching.
  - Real-time stock balance reports, reorder level alerts, and write-off logs.

### Module 13: Event & Activity Management Module
- **Core Features**:
  - Institutional master event scheduling with audience targeting and facility booking.
  - Extracurricular activity and club membership management with attendance rosters.
  - Official school notices, bulletins, and policy circulars with mandatory read-receipts.
  - Interactive academic calendar sync (Google Calendar, iCal export).

### Module 14: Canteen Point-of-Sale (POS) & Campus Health Management
- **Canteen POS Submodule**:
  - Touchscreen POS terminal interface supporting barcode scanners and student RFID badges.
  - Weekly meal planning with breakfast, lunch, and snack menus.
  - Product category catalog, tax group configurations, and item pricing.
  - Cashier shift management, daily cash drawer reconciliation, and sales reporting.
  - Cashless student digital wallet with daily spending caps and dietary allergen warnings.
- **Campus Health & Clinic Submodule**:
  - Campus doctor and nurse consultation logs with symptom tracking and diagnosis records.
  - Student health history dossiers: blood group, allergies, chronic conditions, immunization records.
  - Emergency infirmary admission tracking, prescription issuance, and parent notification alerts.

---

## 3. Expanded 42+ Dynamic Role Matrix & Login Federation

The system supports a hierarchical, dynamic Role-Based Access Control (RBAC) engine partitioned into 5 institutional tiers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   GENIUS CLOUD 42+ DYNAMIC ROLE HIERARCHY                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 1: HIGH EXECUTIVE & MULTI-CAMPUS FEDERATION                                       │
│ Group Admin • Country Admin • State Admin • Trustee Admin • University President       │
│ Vice Chancellor • Board of Trust • Vice President • University Registrar • Uni Admin   │
│ Reseller • Sub Reseller                                                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 2: ACADEMIC LEADERSHIP & INSTRUCTION                                              │
│ Principal • Programme Director • Head of Department (HOD) • Academic Officer           │
│ Coordinator • Counselor • Training Placement Officer • Faculty • Lecturer • Teacher   │
│ Trainer                                                                                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 3: FINANCIAL, ADMINISTRATIVE & AUDIT OPERATIONS                                   │
│ Finance Manager • Accounts Officer • Auditor • Payroll Staff • HR Manager              │
│ Exam Controller • Admission Manager • Admission Officer • IT Manager • IT Officer     │
│ Committee Admin • Committee Member • Back Office                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 4: CAMPUS OPERATIONS, HEALTH & AUXILIARY SERVICES                                 │
│ Front Desk Operator • Secretary / Front Desk • Librarian • Hostel Warden               │
│ Hostel Manager • Doctor (Campus Clinic) • Transport Manager • Driver                  │
│ Security Officer • Security Gate Operator • Inventory Manager • Canteen Manager        │
│ Canteen Cashier • Support                                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 5: STAKEHOLDERS, APPLICANTS & GUEST PERSONAS                                      │
│ Student • Guest Student • Parent / Guardian • Guest Employee • Applicant               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Dynamic Role Federation: "LOGIN WITH GROUP ADMIN AND INSTITUTE"
- **Multi-Level Ingress**: Users can authenticate via a centralized Group Admin SSO portal and dynamically switch context between affiliated schools, colleges, institutes, or universities.
- **Tenant Context Injection**: Ingress headers inject `X-Group-ID`, `X-Institute-ID`, and `X-Role-Code`, activating PostgreSQL Row-Level Security policies to isolate data boundaries while permitting authorized multi-campus governance.

---

## 4. Genius Cloud Granular Submodules & Screen Extractions

### 4.1 Institution & Data Management
- **Institution Settings**: General campus metadata, logo upload, timezone, currency, and white-label branding tokens.
- **Institution Details**: Statutory registration numbers, affiliation codes, tax IDs, and physical address coordinates.
- **Institution Admin & Guest User Governance**: Superuser credentials, guest user temporary sandbox access.
- **Permission Settings**: Granular Role-Wise Permission matrix and Employee-Wise custom permission overrides.
- **Academic Year & Financial Year Details**: Dual-calendar tracking separating academic terms from accounting fiscal years.
- **Institution Shift Management**: Custom start/end timings for Morning, General, and Afternoon shifts with automated grace-period thresholds.
- **Department & Designation Registry**: Hierarchical faculty departments and administrative job designations.
- **Class, Section & Semester Structure**: Dynamic mapping of grades, sections, semesters, and Class Teacher assignments.
- **Subject Allocation**: Assigning subjects to class sections and allocating specific teachers to subject-section pairs.
- **Year-End Data Transfer Engine**:
  - `Transfer Data to Next Year`: Clones course structures, fee heads, and configuration into the upcoming academic session.
  - `Transfer Student Data to Next Year`: Promotes eligible students into the next grade level with batch section assignments.

### 4.2 Timetable & Faculty Proxy Management
- **Time Table Setting**: Working days, periods per day, duration, recess breaks, and maximum consecutive teacher periods.
- **Generate Time Table**: Algorithmic clash-free timetable generator optimizing teacher schedules and room occupancy.
- **TimeTable View**: Interactive grid view filterable by Class, Teacher, and Room.
- **Add Proxy / Proxy List**: 1-click substitute teacher allocation engine detecting free faculty during teacher absence and dispatching mobile push notifications.

### 4.3 Academic Content & Communication Delivery
- **Assignments & Notes / Study Material**: Categorized document uploads with student class/section visibility and download counters.
- **Homework & Classwork**: Whiteboard camera captures, evaluation status (Submitted, Evaluated, Late), and student feedback notes.
- **Course Material & Lesson Topics**: Syllabus topic tracking with video URLs, slides, and learning outcome checklists.
- **Gallery & Published News**: High-resolution campus photo albums and public school news articles.
- **Inbox & Sent Notifications**: Internal administrative messaging center with delivery telemetry.
- **Birthday & Event Notification Templates**: Automated personalized greeting messages dispatched on student and faculty birthdays.

### 4.4 Student Lifecycle & General Register (GR) Hub
- **Add Student & Student List**: Dynamic multi-tab enrollment wizard with duplicate detection.
- **Disable Student List**: Archived inactive or withdrawn student records with audit reasons.
- **Guest Student Form & List**: Short-term audit students, exchange scholars, or summer camp attendees.
- **Student Multiple Update**: Batch editing of student records (e.g., mass section reassignments, transport route updates).
- **Student Remarks Ledger**: Permanent disciplinary, behavioral, and academic remarks tied to the student profile.
- **Alumni Management**: Graduation promotion engine, alumni directory, and transcript re-issuance desk.
- **Student Certificates Desk**: Certificate templates (Transfer, Character, Study, Sports) with token interpolation (`[student_name]`, `[gr_no]`).
- **Student Reports Vault**:
  - Admission Reports, Student GR (General Register) Reports, Overall Year-Wise Performance Reports, Student Credential Detail Reports, and SMS-Email Communication Logs.

### 4.5 Canteen Point-of-Sale (POS) & Meal Planning
- **POS Master & Sell/Order Terminal**: Rapid-entry touch interface for meals, drinks, and snacks.
- **Weekly Meal Planner**: Day-by-day nutritional meal schedule published to parent apps.
- **Shop Registers & Categories**: Product categorization (Snacks, Beverages, Hot Meals) with tax-group assignments.
- **Cashier / Manager Shift Balancing**: Shift-end register tally, cash count, and daily total sales summaries.

### 4.6 Contract Management
- **Contract Types**: Vendor contracts, faculty service agreements, transport fleet leases, maintenance SLAs.
- **View & Generate Contracts**: Template-driven dynamic contract generator with digital signature blocks and expiration alerts.

### 4.7 Multi-Dimensional Attendance & Punctuality Intelligence
The platform moves beyond basic present/absent tracking by codifying **8 distinct punctuality dimensions**:
1. `Present`: On campus and on time.
2. `Absent`: Unexcused absence triggering immediate automated parent SMS/push alerts.
3. `Late-In`: Arrived after the shift grace-period threshold with logged minute offset.
4. `Late-Out`: Departed campus past normal operating hours.
5. `Early-In`: Arrived prior to official campus opening for morning activities.
6. `Early-Out`: Departed campus prior to shift conclusion with approved gate pass validation.
7. `Half-Day / Approved Leave`: Pre-authorized medical or personal leaves.
8. `Gender-Wise Parity Tracking`: Demographic presence ratios ensuring institutional equity compliance.

### 4.8 Transportation Logistics & Bank Reconciliation
- **Transportation Settings**: Vehicle fleet master, driver assignments, route stops, and GPS geofences.
- **Transport Allocation**: Binding students and staff to specific pickup stops and bus numbers.
- **Vehicle Live Tracking**: Sub-5 second GPS updates over WebSockets with route deviation alerts.
- **Transportation Fee Collection & Bank Reconciliation**: Auto-invoicing transit fees and matching settlement deposits against commercial bank feeds.

### 4.9 Employee Lifecycle & Organization Charts
- **Add Employee & Directory**: Full workforce directory with departmental sorting.
- **Payroll Hierarchy Allocation**: Reporting chains, approver matrices, and salary scale banding.
- **Pre-Enrollment & Guest Staff**: Candidate intake pipelines and visiting guest lecturers.
- **Ex-Employee Registry**: Past staff archive with separation details and experience certificate generation.
- **Employee Organization Chart**: Visual interactive tree rendering institutional reporting relationships from Principal down to Department Staff.

---

## 5. Implementation Quality Gates & Compliance Checklist

- [x] **AWS 8-Tier Architecture Codified**: App, API, RDS, S3, Backup, ALB, SSL, CDN.
- [x] **14 Core ERP Modules Specified**: 100% operational coverage documented.
- [x] **42+ Role Hierarchy Mapped**: Tier 1 to Tier 5 roles with Group Admin federation.
- [x] **Genius Cloud Granular Screens Cataloged**: GR reports, Timetable proxy, Canteen POS, Contracts, Punctuality telemetry.
- [x] **Multi-Directional Punctuality Analytics Defined**: Late-In, Late-Out, Early-In, Early-Out, Gender-wise.
- [x] **Strict Zero Emoji Enforcement**: 100% compliant across all specifications and schemas.
- [x] **Google Material Symbols Standard**: Outlined weight 500 utilized across all UI representations.
- [x] **Multi-Tenant Row-Level Security**: PostgreSQL RLS isolation enforced on all entity relations.
