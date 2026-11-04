---
name: smart-school-cambodia-campus-lifecycle
description: Authoritative Architecture and Operational Blueprint for the Cambodia EdTech Multi-Tier SMS & Campus Lifecycle Platform across 45 Operational Cards, 20 Core Domain Subsystems, 4 Cambodian Institutional Tiers (School, College, Institute, University), and Art-Level Engineering Synthesis. Covers Guest Student Admissions, Merit/Need-Based Scholarship Program with Donor Relations, Biometric Anti-Proxy Attendance, University Multi-Campus Timetables, Supervisor & Examiner Assignments, Dual-Currency Payroll & Financial Forecasting, Campus Health Clinic & Medication Logs, Touchscreen Canteen POS & Meal Plans, Parent-Teacher Meeting (In-Person & Virtual) Lifecycle, and Employee Recruitment ATS.
---

# Cambodia EdTech Multi-Tier SMS & Campus Lifecycle Standard
## 45 Operational Cards, 20 Subsystems & 4-Tier Institutional Adaptation (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-cambodia-campus-lifecycle** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** (`[P-19]`) of the Smart School Enterprise Platform.

This skill governs the end-to-end lifecycle operations across Cambodian educational institutions, unifying the 45 operational screen cards across 5 tabs (Academics, Student, Logistics, Exams, Payroll & Finance), the 20 specialized campus subsystems, the 4 Cambodian educational tiers (K-12 School, TVET College, Specialized Institute, University), and deep financial/typographic localization.

---

## 1. The 45-Card Operational Tab Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│            CAMBODIA MULTI-TIER SMS & CAMPUS LIFECYCLE PLATFORM (45 CARDS)              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ACADEMIC MANAGEMENT      │ 2. STUDENT MANAGEMENT    │ 3. TRANSPORT/LIBRARY/HOSTEL   │
│ • Streams & Departments     │ • Online & Guest Intake  │ • Vehicle & Driver Rosters    │
│ • Courses & Batches         │ • Timetable Tracking     │ • RFID & GPS Bus Telemetry    │
│ • Daily Lesson Plans        │ • Task Allocation        │ • Dynamic Route Alerts        │
│ • Official Circulars        │ • Event Planning Desk    │ • Destination & Fee Tariffs   │
│ • Completion Certificates   │ • Canteen Cashless POS   │ • Vehicle Fleet Allocation    │
│ • Assignments & Class Notes │ • ID Card Student Track  │ • Multi-Tier Book Categories  │
│ • Interactive Timetables    │ • Scholarship & Refunds  │ • Book Issue & Return Counter │
│ • Question Paper Generator  │ • Class Performance BI   │ • Hostel Room Occupancy       │
│ • Classwork & Homework      │ • Tri-Channel Comms Hub  │ • Hostel Dining & Coupons     │
├─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 4. EXAM MANAGEMENT          │ 5. PAYROLL & FINANCE     │ 6. CITY DISTRIBUTOR SUPPORT   │
│ • Manual Exam Design        │ • Salary Configuration   │ • Phnom Penh National Hub     │
│ • Question Bank Vault       │ • Pay Head Definitions   │ • Siem Reap Regional Desk     │
│ • Online CBT Engine         │ • Pay Type & Deductions  │ • Battambang Training Center  │
│ • Master Exam Timetables    │ • Dynamic PDF Payslips   │ • Sihanoukville Coastal Depot │
│ • Grading & Ranking Scales  │ • General Ledger Desk    │ • Kampong Cham Mekong Center  │
│ • Instant Result Publishing │ • Multi-Tender Fee Desk  │ • On-Site Hardware Deployment │
│ • Supervisor & Examiner Rota│ • Statutory Accounting   │ • In-Person Khmer Training    │
│ • Longitudinal Reports      │ • HRM Recruitment ATS   │ • Tier-1 Dedicated Hotlines   │
│ • Class Designation Ranks   │ • Master Chart Registers │ • 99.9% Regional SLA Standard │
├─────────────────────────────┴──────────────────────────┴───────────────────────────────┤
│ 7. FOUR CAMBODIAN INSTITUTIONAL TIERS                                                  │
│ School (K-12 MoEYS) • College (TVET) • Institute (Specialized) • University (Higher)  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Directives for Agents

1. **Directive CL-01 (45-Card Operational Completeness)**:
   - When developing administrative dashboards, agents MUST ensure all 45 operational cards across the 5 functional tabs are implemented with proper route bindings, permissions, and status counters.
2. **Directive CL-02 (Guest Student Intake Flow)**:
   - Online admissions MUST support unauthenticated guest applicants by issuing a unique tracking PIN (`APP-YYYY-XXXXX`), allowing applicants to upload certificates and track decision states without requiring pre-provisioned user credentials.
3. **Directive CL-03 (Scholarship Governance & Donor Tracking)**:
   - Scholarships MUST maintain a clean distinction between institutional tuition waivers and third-party donor funds. Sibling concessions, merit awards, and clawback refunds upon academic withdrawal MUST be automatically computed.
4. **Directive CL-04 (Anti-Proxy Biometric Attendance)**:
   - Biometric turnstiles and facial recognition devices MUST communicate via asynchronous TCP/IP push to prevent proxy attendance, broadcasting real-time ingress events to parents via WebSockets/FCM.
5. **Directive CL-05 (Multi-Tier Cambodian Institutional Adaptation)**:
   - Features MUST adapt polymorphic behavior based on `institution_tier`:
     - `SCHOOL`: K-12 MoEYS curriculum, twice-daily roll-call, BacII exam preparation.
     - `COLLEGE`: TVET vocational competency units, workshop safety logs, apprenticeship tracking.
     - `INSTITUTE`: Modular certificate courses, evening/weekend cohorts, corporate sponsor billing.
     - `UNIVERSITY`: Multi-faculty governance, CATS credit transfers, thesis defense, semester GPA/CGPA.
6. **Directive CL-06 (Dual-Currency KHR/USD & Bakong KHQR)**:
   - All tuition invoices, payment receipts, fee summaries, and financial reports MUST compute and display dual-currency balances in Cambodian Riel (`៛` KHR) and US Dollar (`$`). Real-time National Bank of Cambodia (NBC) exchange rates and Bakong KHQR EMVCo format MUST be enforced.
7. **Directive CL-07 (Three-Font Typography System)**:
   - English prose in Ubuntu (`font-ubuntu`).
   - Khmer user interfaces in Google Sans Khmer (`font-khmer`) with zero-width spaces (`\u200B`) between word tokens.
   - Formal diplomas and ministerial certificates in Moul (`font-moul`).
8. **Directive CL-08 (Zero-Emoji Policy)**:
   - Strictly zero emoji characters in source code, schemas, UI components, and documentation. All icons MUST strictly use Google Material Symbols Outlined (`wght 500`).
9. **Directive CL-09 (High-Throughput Ingress & Asynchronous Bridge)**:
   - High-volume events (RFID cafeteria taps, gate scans, admissions submissions) MUST return `HTTP 202 Accepted` immediately and publish to Kafka topics wrapped in `EventEnvelope<T>`.
10. **Directive CL-10 (PostgreSQL Row-Level Security)**:
    - All operational tables (`scholarship_programs`, `canteen_accounts`, `health_clinic_visits`, `ptm_sessions`) MUST have PostgreSQL kernel Row-Level Security enabled with `branch_id` isolation.

---

## 3. Core Operational Subsystems Reference

- **Student Online Admission**: Route `/students/admissions-guest`, Layout Archetype B, Entity `student_applications`.
- **Student Fees Management**: Route `/finance/fee-collections-cashier`, Layout Archetype B & C, Entity `fee_invoices`.
- **Student Scholarship Programme**: Route `/students/scholarships`, Layout Archetype B, Entity `scholarship_programs`.
- **Academic Management**: Route `/academics/departments`, Layout Archetype A, Entity `academic_departments`.
- **Student Attendance Management**: Route `/attendance/roll-call`, Layout Archetype B, Entity `attendance_records`.
- **Student Time Table Management**: Route `/academics/timetable`, Layout Archetype D, Entity `timetable_slots`.
- **Student Exam Management**: Route `/exams/cbt-engine`, Layout Archetype C, Entity `exam_schedules`.
- **Question Paper Generator**: Route `/academics/question-paper-generator`, Layout Archetype B, Entity `question_banks`.
- **Payroll Management**: Route `/payroll/salary-structures`, Layout Archetype C, Entity `payroll_registers`.
- **Finance Management**: Route `/finance/general-ledger`, Layout Archetype C, Entity `general_ledger_entries`.
- **Student Transport Management**: Route `/logistics/vehicles-drivers`, Layout Archetype A & E, Entity `transport_routes`.
- **Student & Vehicle Tracking**: Route `/logistics/rfid-tracking`, Layout Archetype E, Entity `vehicle_telemetry`.
- **Student Hostel Management**: Route `/logistics/hostel-occupancy`, Layout Archetype D, Entity `hostel_rooms`.
- **Security Gate & Front Desk**: Route `/front-desk/gate-passes`, Layout Archetype B & F, Entity `visitor_passes`.
- **Dashboard Management**: Route `/dashboard`, Layout Archetype A, Entity `role_dashboards`.
- **Virtual Classroom**: Route `/academics/virtual-classrooms`, Layout Archetype G, Entity `virtual_classroom_sessions`.
- **Health Management**: Route `/campus/health-clinic`, Layout Archetype B, Entity `health_clinic_visits`.
- **Canteen Management**: Route `/canteen/touchscreen-pos`, Layout Archetype B, Entity `canteen_accounts`.
- **Parent Teacher Meeting**: Route `/campus/ptm-scheduler`, Layout Archetype B & D, Entity `ptm_sessions`.
- **Employee Management**: Route `/hr/recruitment-evaluations`, Layout Archetype B, Entity `employee_dossiers`.

---

## 4. Authoritative Specifications

- Master Specification: [`references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md`](../../references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md)
- Extraction Ledger: [`references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md`](../../references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md) (Section 43)
- Master Feature Catalog: [`references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md`](../../references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md)
- Primary Skills Directory: [`references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md`](../../references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md)
- Operational Audit Compendium: [`references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md`](../../references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md) (Suite 17)
