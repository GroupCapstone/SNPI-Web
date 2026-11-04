# Master Campus Lifecycle Flow & State Machine Orchestration Specification

- **Module Reference**: `Module 80`
- **Specification ID**: `SPEC-80`
- **Architectural Status**: `RATIFIED / TIER-1 OPERATIONAL ORCHESTRATOR`
- **Related Specs**: Spec 74 (Flow Alignment), Spec 76 (Genius Cloud AWS), Spec 77 (Granular Submodules), Spec 78 (Cambodia Localized SMS), Spec 79 (Campus Lifecycle)
- **Visual Identity Standard**: Liquid Glass UI, White Canvas Foundation, 360-Degree Specular Top Rim (`border-t border-white/95`), Hard Offset Shadows.
- **Typographic Triad**: Ubuntu (English), Google Sans Khmer (Khmer UI with `\u200B` zero-word-breakage), Moul (Formal diplomas & Ministry certificates).
- **Iconography Standard**: Google Material Symbols Outlined (`wght 500` only, ZERO EMOJI).

---

## 1. Executive Summary: The Unified 12-Stage Operational Journey

This specification codifies the definitive **Master Operational Lifecycle Flow** and **Finite State Machine (FSM) Orchestration Architecture** for the Smart School Enterprise Platform.

It integrates all **375 features** across **27 architectural domains**, unifying the 45 operational screen cards, the 20 specialized campus subsystems, the 4 Cambodian educational tiers (School, College, Institute, University), and the dual-currency (`KHR`/`USD`) settlement engine into a contiguous, event-driven operational lifecycle.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               THE UNIFIED 12-STAGE MASTER CAMPUS LIFECYCLE FLOW                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [STAGE 01: FOUNDATION & SETUP]      Branches -> Settings -> Sessions -> RBAC 42+       │
│          ▼                                                                             │
│ [STAGE 02: ADMISSIONS & GUEST PIN]  Guest Portal -> S3 Docs -> OCR Review -> Merit OK  │
│          ▼                                                                             │
│ [STAGE 03: FINANCIAL CLEARINGHOUSE] Dual Billing (KHR/USD) -> Bakong KHQR -> Ledger GL │
│          ▼                                                                             │
│ [STAGE 04: ACADEMIC & TIMETABLES]   Streams -> CATS/MoEYS -> Constraint Solver -> Prox │
│          ▼                                                                             │
│ [STAGE 05: PRESENCE & INGRESS]      Turnstiles -> Biometric TCP/IP -> GPS Fleet Track  │
│          ▼                                                                             │
│ [STAGE 06: INSTRUCTION & HOMEWORK]  Lesson Plans -> Whiteboard Cam -> Virtual Class    │
│          ▼                                                                             │
│ [STAGE 07: ASSESSMENTS & EXAMS]     Bloom's Item Bank -> Paper Gen -> CBT -> Marksheet │
│          ▼                                                                             │
│ [STAGE 08: LOGISTICS & RESIDENCE]   Library UDC -> Transit Tariffs -> Hostel & Dining  │
│          ▼                                                                             │
│ [STAGE 09: HEALTH & CANTEEN POS]    Clinic Infirmary -> Rx Logs -> Touchscreen POS RFID│
│          ▼                                                                             │
│ [STAGE 10: COLLABORATION & PTM]     Omnichannel Chat -> Circulars -> PTM Scheduler     │
│          ▼                                                                             │
│ [STAGE 11: HR, PAYROLL & NSSF]      Recruitment ATS -> Salary Slabs -> NSSF -> Payslip │
│          ▼                                                                             │
│ [STAGE 12: GOVERNANCE & MOBILE]     Trustee BI -> CIS Audit -> TC Clearance -> Apps   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Exhaustive Step-by-Step 12-Stage Lifecycle Sequences

### Stage 01: Institutional Foundation, Federation & Tenant Provisioning
- **Operational Triggers**: Multi-campus onboarding, annual session roll-forward, or brand configuration.
- **Lifecycle Sequence**:
  1. *Multi-Branch Tenant Provisioning*: Super Admin seeds campus branches (`br_phnompenh_central`, `br_siemreap_north`), initializing PostgreSQL Row-Level Security isolation.
  2. *Single-File Branding*: System reads brand tokens from `src/config/brand.ts` (default brand: IDEAI SCHOOL with blank logo placeholder).
  3. *Academic Session Master*: Provisions academic cycle (`2026-27`) with semester cutoff dates and holiday calendars.
  4. *Dynamic RBAC Ingress*: Configures the 42+ dynamic roles with "LOGIN WITH GROUP ADMIN AND INSTITUTE" context switching.
  5. *Accounting Masters & Spot Rates*: Seeds Chart of Accounts, Bank Masters, Cash Drawers, and initializes daily National Bank of Cambodia (NBC) reference exchange rates (`1 USD = 4,050 KHR`).

### Stage 02: Admissions Intake, Guest Tracking & Document Verification
- **Operational Triggers**: New student intake window opens; walk-in or web applicant applies.
- **Lifecycle Sequence**:
  1. *Unauthenticated Guest Ingress*: Prospective applicant opens `/students/admissions-guest` without pre-existing credentials.
  2. *Automatic Tracking PIN Generation*: System issues unique alphanumeric tracking code (`APP-2026-89421`).
  3. *Encrypted S3 Document Vault*: Upload of birth certificate, previous school transcripts, vaccination cards, and national ID.
  4. *Asynchronous OCR Extraction*: Spring Boot microservice parses uploaded report cards and verifies prerequisite grades.
  5. *Admissions Screening & Decision Queue*: Dean audits candidate score; system assigns eligible sibling or merit fee concessions.
  6. *Approval Notification & Student Dossier*: Student ID generated (`KWD-2026-XXXXX`), student 360 dossier provisioned, and acceptance SMS/email dispatched with Bakong KHQR checkout link.

### Stage 03: Financial Clearinghouse, Dual-Currency Billing & Settlement
- **Operational Triggers**: Term fee generation, dormitory invoice generation, or cafeteria wallet top-up.
- **Lifecycle Sequence**:
  1. *Automated Invoice Dispatch*: Tuition, lab, and transit dues generated with dual balances (`KHR` and `USD`).
  2. *Scholarship & Concession Offsets*: Deducts institutional waivers or tagged donor fund credits.
  3. *Dynamic Bakong KHQR Generation*: EMVCo-compliant QR rendered on student invoices and mobile app.
  4. *Instant Clearing Webhook*: Parent scans via any Cambodian bank app (ABA, Canadia, Wing); NBC Bakong webhook delivers payment event in sub-2 seconds.
  5. *Triplicate E-Challan Fallback*: Offline branch counter receipts generated with machine-readable Code-128 barcodes.
  6. *Statutory General Ledger Entry*: Double-entry books update automatically (`Debit: Bank Account`, `Credit: Tuition Revenue`), ensuring mathematical equality (`debit == credit`).

### Stage 04: Academic Governance, Curriculums & Clash-Free Scheduling
- **Operational Triggers**: Curriculum syllabus setup, faculty hiring, and period scheduling prior to term launch.
- **Lifecycle Sequence**:
  1. *Department & Stream Assignment*: Curriculum bound to faculties (Sciences, Engineering, Vocational Arts).
  2. *Tier-Specific Course Configuration*:
     - *School*: MoEYS Grades 1-12 standardized subject syllabus.
     - *College*: TVET modular competency units and workshop shift logs.
     - *Institute*: Specialized certificate sequences and evening cohort shifts.
     - *University*: CATS credit transfers, lecture tracks, and prerequisite graphs.
  3. *Algorithmic Constraint Solver*: Generates conflict-free Monday-Saturday timetable grids ensuring zero teacher, room, or section collisions.
  4. *Absentee Faculty Proxy Engine*: If an instructor is marked absent, 1-click proxy allocation assigns available teachers matching subject qualifications with push notifications.

### Stage 05: Perimeter Ingress, Anti-Proxy Attendance & Transit Telemetry
- **Operational Triggers**: Morning student transit, campus perimeter arrival, and classroom roll-call.
- **Lifecycle Sequence**:
  1. *RFID Bus Boarding*: Student taps bus sensor; UHF antenna logs timestamp and GPS coordinate.
  2. *Real-Time Telematics Stream*: Bus GPS coordinates stream every 5 seconds over MQTT/WebSockets to parent mobile maps.
  3. *1km Geofence Alert*: Automated push notifications alert guardians when the bus approaches their stop.
  4. *Turnstile Anti-Passback Gate*: Facial recognition/RFID turnstile verifies student ID, rejecting proxy scans within 5 minutes.
  5. *Gate Pass Enforcement*: Late arrivals receive timestamped digital slips; unauthorized early exits blocked without signed guardian QR passes.
  6. *Sub-45s Classroom Roll-Call*: Class teachers take roll in under 45 seconds using responsive mobile switchers defaulting to "All Present".
  7. *Unexcused Absence Broadcast*: System dispatches automated SMS alerts to parents at 08:30 for unexcused absentees.

### Stage 06: Instructional Delivery, Homework & Virtual Learning
- **Operational Triggers**: Daily classroom instruction, homework assignment, and remote learning cohorts.
- **Lifecycle Sequence**:
  1. *Lesson Planning & Syllabus Meters*: Instructors document learning goals, ticking topics as `Completed` to update real-time visual syllabus progress meters.
  2. *Whiteboard Camera Capture*: Teachers snap board exercises using mobile cameras; perspective correction crops and enhances image contrast.
  3. *Multi-Section Broadcast*: Homework dispatched across parallel class sections with attachment limits and submission countdown timers.
  4. *Assignments & Notes Dropbox*: Students access reference handouts and submit PDF responses with offline local caching.
  5. *Integrated Virtual Classrooms*: WebRTC video sessions launch with digital whiteboards, screen sharing, and automated attendance logging based on connection duration.

### Stage 07: High-Stakes Assessments, Question Compilation & Examinations
- **Operational Triggers**: Unit tests, midterms, semester finals, and national BacII preparatory exams.
- **Lifecycle Sequence**:
  1. *Bloom's Taxonomy Question Repository*: Item bank indexed by cognitive levels (Remembering, Understanding, Applying, Analyzing, Evaluating/Creating).
  2. *Algorithmic Paper Compiler*: Generates balanced examination papers in under 3 minutes with confidential answer keys and scoring rubrics.
  3. *Hall Seating & Admit Cards*: Generates examination hall seating rosters and prints student Admit Cards with photo identification.
  4. *Supervisor & External Examiner Roster*: Allocates invigilators and external examiners according to academic specialties.
  5. *15s Autosave CBT Engine*: Students complete digital tests with local SQLite backup and anti-cheat screen lockouts.
  6. *Multi-Board Evaluation & Moderation*: Computes CBSE/CCE, ICSE 80/20 weightages, and university GPA percentiles.
  7. *Marksheet & Certificate Release*: Bulk generation of cryptographically signed marksheets and formal diplomas in traditional Moul calligraphy.

### Stage 08: Campus Logistics, Library Cataloging & Residential Life
- **Operational Triggers**: Library checkouts, fleet maintenance, and residential dormitory management.
- **Lifecycle Sequence**:
  1. *Universal Decimal Classification Catalog*: Library books cataloged by Dewey/UDC classifications with barcode labels.
  2. *Circulation Counter*: Barcode issue/return counter tracks checkouts and calculates overdue fines in dual currency (`KHR` and `USD`).
  3. *Fleet Vehicle Maintenance*: Fleet logs track insurance renewals, vehicle fitness certificates, driver licenses, and fuel expenses.
  4. *Hostel Room Allocation*: Floor/room assignment, student room change requests, and night curfew roll-call reconciliation.
  5. *Hostel Dining & Food Inventory*: Caterer contracts, weekly dietary menus, allergen tracking, and meal coupon validation.

### Stage 09: Campus Health Clinic, Cashless Canteen POS & Meal Plans
- **Operational Triggers**: Student illness, medical triage, and cafeteria lunch rush.
- **Lifecycle Sequence**:
  1. *Infirmary Clinic Intake*: Attending campus nurse/doctor logs student visit, recording vital signs, symptoms, and diagnosis.
  2. *Medication & Allergy Alerts*: System checks student medical record for chronic allergies before administering pharmaceuticals.
  3. *Emergency Parent Ingress*: Severe health incidents trigger high-priority push notifications and automated phone alerts.
  4. *Touchscreen Canteen POS*: Cashier selects student meal; student taps RFID badge; sub-second transaction debits cashless wallet.
  5. *Weekly Meal Subscriptions*: Parents configure prepaid meal plans and daily spending caps via mobile app.

### Stage 10: Parent-Teacher Collaboration, Omnichannel Comms & PTM
- **Operational Triggers**: Parent-teacher conferences, institutional circulars, and grievance tickets.
- **Lifecycle Sequence**:
  1. *PTM Appointment Reservation*: Automated slot scheduler prevents teacher double-booking, allocating 15-minute conference windows.
  2. *Physical & Virtual Conference Rooms*: Parents select in-person classroom desk or 1-click WebRTC virtual meeting link.
  3. *Omnichannel Circular Broadcast*: Formal announcements broadcast simultaneously across Push, SMS, and Email with digital read receipts.
  4. *Encrypted Teacher-Parent Messaging*: Direct in-app communication channels for academic updates and behavioral feedback.

### Stage 11: Human Resources, Faculty Appraisals & Statutory Payroll
- **Operational Triggers**: Staff recruitment, annual salary reviews, and monthly payroll execution.
- **Lifecycle Sequence**:
  1. *Recruitment ATS*: Job openings posted, resumes parsed, applicant interview stages tracked, and offer letters generated.
  2. *Credential Vault & 360 Appraisals*: Verification of teacher teaching licenses, peer evaluations, and student survey metrics.
  3. *Payroll Structure Configuration*: Base salary, housing allowances (HRA), conveyance, and academic bonuses indexed to seniority.
  4. *Cambodian Statutory Withholdings*: Automated computation of Cambodian National Social Security Fund (NSSF) and progressive salary tax.
  5. *Festival & Performance Bonus Desk*: Allocation of Khmer New Year and Pchum Ben festival bonuses.
  6. *Signed PDF Payslip Dispatch*: Batch generation of cryptographically signed bilingual payslips delivered via staff portals.

### Stage 12: Executive Telemetry, CIS Accreditation & Alumni Governance
- **Operational Triggers**: Board of trustees meetings, regulatory inspections, and student graduation.
- **Lifecycle Sequence**:
  1. *Executive Dashboard Gauges*: Real-time fee recovery percentages, morning presence rates, and academic pacing indices.
  2. *CIS Accreditation Safeguarding*: Child protection logs, health & safety compliance meters, and governance records.
  3. *Statutory TC Clearance*: Verification of zero library dues, zero outstanding fees, and conduct clearance prior to Transfer Certificate issuance.
  4. *Alumni Career Tracking*: Longitudinal registry tracking university matriculation, corporate employment, and annual reunions.
  5. *AWS Cloud Governance*: Continuous monitoring of ECS Fargate task auto-scaling, Multi-AZ RDS Aurora PostgreSQL health, and CloudFront caching.

---

## 3. Finite State Machines (FSM) & Lifecycle State Models

### 3.1 Student Admissions & Academic Dossier FSM
```
[GUEST_APPLIED] ──(Docs Uploaded)──> [UNDER_REVIEW]
                                           │
                       ┌───────────────────┴───────────────────┐
                       ▼                                       ▼
               [MERIT_REJECTED]                        [MERIT_APPROVED]
                                                               │
                                                       (Fee Paid via KHQR)
                                                               │
                                                               ▼
                                                       [ENROLLED_ACTIVE]
                                                               │
                       ┌───────────────────────────────────────┴───────────────────────┐
                       ▼                                                               ▼
               [ACADEMIC_PROBATION]                                            [GRADUATED_ALUMNI]
                       │
               (Dues Cleared)
                       ▼
               [TRANSFERRED_OUT (TC)]
```

### 3.2 Dual-Currency Fee Billing & Settlement FSM
```
[DRAFT_INVOICE] ──(Auto Generated)──> [ISSUED_UNPAID]
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             (Partial Cash / Wire)                       (Bakong KHQR Webhook)
                       ▼                                           ▼
             [PARTIALLY_SETTLED]                          [FULLY_SETTLED]
                       │                                           │
                 (Balance Paid)                             (Student Drop)
                       ▼                                           ▼
             [FULLY_SETTLED]                               [REFUND_CLAWBACK]
                       │
             (Forensic Auditing)
                       ▼
             [VOIDED_AUDIT_LOGGED]
```

### 3.3 Examination Assessment & Transcript FSM
```
[EXAM_SCHEDULED] ──(Invigilators Assigned)──> [HALL_TICKETS_RELEASED]
                                                       │
                                              (Biometric Hall Ingress)
                                                       │
                                                       ▼
                                              [EXAM_IN_PROGRESS]
                                                       │
                                              (CBT / Script Collection)
                                                       │
                                                       ▼
                                              [SUBMISSIONS_LOCKED]
                                                       │
                                              (Teacher Marks Entry)
                                                       │
                                                       ▼
                                              [EVALUATION_MODERATED]
                                                       │
                                              (Dean Cryptographic Sign)
                                                       │
                                                       ▼
                                              [RESULTS_PUBLISHED]
```

---

## 4. Cross-Cutting Architectural Enforcements

1. **Strict Zero Emoji Enforcement**: Certified 100% compliant across all 12 stages, 375 features, schemas, and documentation.
2. **Three-Font System**:
   - Ubuntu (`font-ubuntu`): English prose, headers, numbers, and technical documentation.
   - Google Sans Khmer (`font-khmer`): Khmer user interfaces, labels, and forms with zero-width spaces (`\u200B`) between word tokens.
   - Moul (`font-moul`): Formal diplomas, Ministry certificates, and ceremonial headings.
3. **Liquid Glass UI Foundation**:
   - Canvas: Frosted white (`bg-white/80 backdrop-blur-xl border border-white/60`).
   - Top Specular Rim: 360-degree highlight (`border-t border-white/95`).
   - Hard Offset Elevation: Tactile offset shadows (`shadow-[0_8px_0_0_rgba(15,23,42,0.06)]`).
4. **PostgreSQL Multi-Tenant Row-Level Security (RLS)**:
   - Kernel-level tenant isolation enforced via `branch_id = current_setting('app.current_branch_id')` across all 7 microservices.
5. **Synchronous-to-Asynchronous Event Bridge**:
   - High-throughput ingress points return `HTTP 202 Accepted` immediately and publish to Kafka wrapped in `EventEnvelope<T>`.
