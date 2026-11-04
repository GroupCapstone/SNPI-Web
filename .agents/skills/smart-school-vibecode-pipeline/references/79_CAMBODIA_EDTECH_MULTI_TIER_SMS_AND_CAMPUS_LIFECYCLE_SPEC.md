# Cambodia EdTech Multi-Tier SMS & Campus Lifecycle Architecture Specification

- **Module Reference**: `Module 79`
- **Specification ID**: `SPEC-79`
- **Architectural Status**: `RATIFIED / TIER-1 BLUEPRINT`
- **Dedicated Primary Skill**: `smart-school-cambodia-campus-lifecycle` (`[P-19]`)
- **Visual Identity Standard**: Liquid Glass UI, White Canvas Foundation, 360-Degree Specular Top Rim (`border-t border-white/95`), Hard Offset Shadows.
- **Typographic Triad**: Ubuntu (English), Google Sans Khmer (Khmer UI with `\u200B` zero-word-breakage), Moul (Formal diplomas & Ministry certificates).
- **Iconography Standard**: Google Material Symbols Outlined (`wght 500` only, ZERO EMOJI).

---

## 1. Executive Architectural Synthesis: Steal Like an Artist

When architectural engineering "steals like an artist," it does not duplicate raw surface marketing copy. Instead, it decodes the operational reality, structural requirements, user pain points, and lifecycle dependencies inherent in the domain, synthesizing them into a coherent, high-velocity, fault-tolerant enterprise system.

This specification elevates the 45 operational feature cards and 20 core subsystems of the Cambodian Educational ERP ecosystem into an integrated, multi-tier campus lifecycle platform:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│            CAMBODIA MULTI-TIER SMS & CAMPUS LIFECYCLE PLATFORM (SPEC 79)               │
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
│ 7. FOUR CAMBODIAN INSTITUTIONAL TIERS (MULTI-TENANT ADAPTATION)                         │
│ School (K-12 MoEYS) • College (TVET) • Institute (Specialized) • University (Higher)  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 45-Card Operational Tab Matrix

The core administrative portal is organized into 5 primary operational tabs, each containing a precise 3x3 layout of 9 dedicated operational cards (45 cards in total):

### 2.1 Tab 1: Academics Management (9 Cards)
1. **Streams & Departments (`/academics/departments`)**: Manages faculty streams (Science, Social Sciences, Technical) and administrative departments. Displays teacher assignments, department heads, and curriculum versions.
2. **Course & Batch (`/academics/courses-batches`)**: Configures multi-year programmes, academic terms, and student cohort batches with capacity constraints and intake cutoffs.
3. **Lesson Planning (`/academics/lesson-plans`)**: Daily instructional plans prepared by educators, detailing textbook chapters, learning objectives, required laboratory apparatus, and teaching aids.
4. **Circulars (`/academics/circulars`)**: Official institutional announcements dispatched by principals or deans with target audience filtering (students, guardians, staff) and delivery receipts.
5. **Certificates (`/academics/certificates`)**: Dynamic credential generator producing competition awards, course completions, and conduct citations with tamper-proof QR verification.
6. **Assignments & Notes (`/academics/assignments-notes`)**: Course lecture notes, reference PDFs, and homework assignments with deadline counters and mobile push notification cues.
7. **Time Table (`/academics/timetable`)**: Interactive classroom scheduling grid displaying room allocations, teacher periods, and weekly class rosters.
8. **Question Paper Generator (`/academics/question-paper-generator`)**: Rapid algorithmic assessment compiler pulling from tagged item banks matching specific subject blueprints.
9. **Classwork & Homework (`/academics/homework`)**: Daily classroom activities and take-home exercises submitted by students and graded online with teacher feedback.

### 2.2 Tab 2: Student Management (9 Cards)
10. **Online Admission / Guest Student (`/students/admissions-guest`)**: Streamlined intake portal allowing prospective applicants or walk-in guest students to apply online with instant tracking codes.
11. **Time Table Management (`/students/schedules`)**: Individual student schedule viewer showing daily period timings, subject teachers, and upcoming schedule adjustments.
12. **Task Management (`/students/tasks`)**: Student task manager enabling teachers to assign individual or group projects with priority tags, deadlines, and submission milestones.
13. **Event Management (`/students/events`)**: Campus event calendar coordinating cultural festivals, sports days, science fairs, drawing contests, and academic symposiums.
14. **Canteen Management (`/students/canteen`)**: Nutritional cafeteria dashboard managing weekly menu rotations, ingredient stocks, student dietary profiles, and cashless meal transactions.
15. **Student Tracking (`/students/tracking-id`)**: Perimeter gate and classroom presence scanning using barcode/RFID/biometric student ID badges with automated parent SMS alerts.
16. **Scholarship (`/students/scholarships`)**: Comprehensive scholarship registry tracking merit awards, donor grants, tuition waivers, living stipends, and refund management.
17. **Student Performance (`/students/performance-reports`)**: Longitudinal analytical reporting aggregating marks, attendance percentages, behavioral observations, and class percentiles.
18. **Email & Notification & Chat (`/students/communications`)**: Tri-channel omnichannel communications hub facilitating encrypted teacher-parent chats, automated SMS, and bulk emails.

### 2.3 Tab 3: Transportation/Library/Hostel (9 Cards)
19. **Vehicle & Driver Details (`/logistics/vehicles-drivers`)**: Vehicle registry displaying registration numbers, fleet capacities, insurance expiry, vehicle inspection certificates, and driver contact dossiers.
20. **Vehicle Tracking (`/logistics/rfid-tracking`)**: Real-time GPS bus tracking portal integrated with student RFID tap sensors, displaying live coordinates, transit speeds, and route progress.
21. **Route Details (`/logistics/routes-notifications`)**: Area-wise route mapping with designated pickup/drop-off stops and automated parent SMS notifications upon route detours or transit delays.
22. **Destination & Fees (`/logistics/destinations-tariffs`)**: Staged distance-based transit tariff matrix assigning fee schedules to distinct municipal drop-off zones.
23. **Transportation Allocation (`/logistics/allocations`)**: Student and faculty transit seat allocation manager with contract validity dates and seat availability counters.
24. **Book Category (`/logistics/library-categories`)**: Library classification catalog organizing volumes by Dewey Decimal / Universal Decimal classifications, genres, and languages.
25. **Book Issue & Return (`/logistics/library-circulation`)**: Circulation counter tracking book checkouts, due dates, renewal extensions, and automated overdue fine calculations.
26. **Hostel Details (`/logistics/hostel-occupancy`)**: Residential hall registry monitoring building blocks, room types (single, double, dorm), student occupants, fee plans, and amenities.
27. **Hostel Canteen (`/logistics/hostel-dining-coupons`)**: Residential dining manager supervising caterer contracts, meal service timings, dietary preferences, and pre-paid meal coupon reconciliations.

### 2.4 Tab 4: Exam Management (9 Cards)
28. **Manual Examination (`/exams/manual-scheduling`)**: Traditional paper examination planner scheduling hall seatings, physical question paper distribution, and invigilation rosters.
29. **Question Bank (`/exams/question-bank-vault`)**: Secure item repository supporting multiple question types (MCQ, Short Answer, Essay, Coding, Lab) with difficulty ratings and solution rubrics.
30. **Online Examination (`/exams/cbt-engine`)**: Computer-based test (CBT) engine supporting subjective and objective testing with 15-second client-side autosave and instant scoring.
31. **Exam Timetable (`/exams/master-timetables`)**: Multi-session exam timetable generator scheduling midterm, final, and mock examination dates with automatic hall clash prevention.
32. **Set Grading/Ranking Levels (`/exams/grading-rules`)**: Dynamic grading engine defining GPA cutoffs, percentage brackets, letter grades (A-F), and institutional honors classifications.
33. **Exam Result (`/exams/results-publishing`)**: Secure publishing desk with role-based disclosure controls, parent notification dispatches, and consolidated student transcript printing.
34. **Supervisor & Examiner Management (`/exams/examiner-rosters`)**: Invigilator and external examiner roster assigning qualified faculty to examination halls based on discipline specialties.
35. **Exam Report (`/exams/analytics-longitudinal`)**: Deep examination analytics delivering subject-wise pass rates, question discrimination indices, and year-over-year performance curves.
36. **Class Designation (`/exams/class-rankings`)**: Automated ranking algorithm calculating class percentiles, grade rankings, top-decile honors, and graduation valedictorian designations.

### 2.5 Tab 5: Payroll & Finance Management (9 Cards)
37. **Salary Setting (`/payroll/salary-structures`)**: Employee compensation master configuring base pay, allowances, and statutory benefits indexed to academic rank and seniority.
38. **Pay Head (`/payroll/pay-heads-allowances`)**: Earnings and allowance configuration engine managing housing allowances (HRA), conveyance, medical coverage, and academic bonuses.
39. **Pay Type (`/payroll/pay-types-deductions`)**: Deduction registry configuring payroll withholdings including National Social Security Fund (NSSF), income taxes, and staff loan repayments.
40. **Generate Pay Slip (`/payroll/payslip-pdf-batch`)**: Automated payroll run compiler generating cryptographically signed, bilingual PDF payslips delivered via staff portals and email.
41. **Account Management (`/finance/general-ledger`)**: Multi-branch general ledger displaying real-time financial health, balance sheets, automated invoicing, and reconciliation logs.
42. **Fees Management (`/finance/fee-collections-cashier`)**: Cashier desk supporting multiple payment modes: Cash, Cheque, Visa/Mastercard, Bakong KHQR, ABA PayWay, and Wing Bank.
43. **Reports (`/finance/statutory-reports`)**: Comprehensive financial books including Day Book, Journal Book, Cash Book, Bank Book, Trial Balance, P&L, and Balance Sheet.
44. **HR Management (`/hr/recruitment-evaluations`)**: Staff lifecycle desk overseeing job openings, applicant screening, onboarding checklists, performance appraisals, and leave approvals.
45. **Masters (`/finance/accounting-masters`)**: Master configuration registry governing Chart of Accounts, Bank Masters, Cash Drawers, Tax Slabs, and Expense Categories.

---

## 3. Deep Dive into the 20 Core Subsystems

### 3.1 Student Online Admission & Guest Student Portal
- **Architecture**: A multi-step responsive intake wizard supporting unauthenticated guest applicants.
- **Workflow**:
  1. Applicant submits personal details, previous school transcripts, national ID/birth certificate.
  2. System issues a unique **Guest Tracking PIN** (`APP-2026-XXXXX`).
  3. Admissions desk performs automated OCR credential extraction and manual review.
  4. Decision notification dispatched via SMS/Email with Bakong KHQR registration fee link.

### 3.2 Student Fees Management & Online Fee Payment App
- **Architecture**: Multi-tender billing engine with dual-currency calculations (`KHR` and `USD`).
- **Features**:
  - Automated generation of triplicate e-challans and electronic receipts.
  - Sibling discounts, staff concessions, and scholarship offsets applied before final invoice total.
  - Real-time parent mobile checkout via National Bank of Cambodia Bakong KHQR or card gateways.

### 3.3 Student Scholarship Programme System
- **Architecture**: Dedicated scholarship governance desk tracking external donor funds and internal academic waivers.
- **Grant Types**:
  - *Tuition Coverage*: 25%, 50%, 75%, or 100% tuition waiver.
  - *Textbook & Living Stipend*: Monthly disbursements tracked through student debit accounts.
  - *Travel Grants*: Subsidized bus transit or rural relocation funds.
- **Refund & Clawback Protocol**: If a student fails minimum GPA criteria or withdraws before term completion, the system automatically computes program refunds or clawback recovery balances.

### 3.4 Student Academic Management System
- **Higher Education Specialization**: Designed for Cambodian universities and specialized institutes.
- **Capabilities**:
  - Departmental research project registries with grant allocation tracking.
  - Academic publication logs indexed to faculty authors and institutional affiliations.
  - Inter-institutional collaboration agreements and credit exchange agreements.

### 3.5 Student Attendance Management System
- **Anti-Proxy Biometric Integration**: Interfaces with ZKTeco TCP/IP facial/fingerprint turnstiles.
- **Analytics Engine**: Real-time pattern discovery identifying recurrent Friday/Monday absenteeism, chronic tardiness, and correlated grade declines.

### 3.6 Student Time Table Management System
- **Algorithmic Constraint Engine**: Solves complex multi-campus, multi-faculty university scheduling problems considering teacher availability, room capacity, and laboratory equipment limits.

### 3.7 Student Exam Management System
- **Integrity Features**: Biometric attendance verification at exam hall entrances, randomized seat allocation, and remote AI browser lockdown proctoring for CBT tests.

### 3.8 Question Paper Generator System
- **Bloom's Taxonomy Blueprint**: Generates balanced question papers matching prescribed ratios:
  - *Remembering*: 20%
  - *Understanding*: 30%
  - *Applying*: 25%
  - *Analyzing*: 15%
  - *Evaluating / Creating*: 10%

### 3.9 Payroll Management System
- **Cambodian Statutory Compliance**: Automatic computation of Cambodian NSSF healthcare/pension contributions and progressive Salary Tax with standard non-taxable allowances.

### 3.10 Finance Management System
- **Multi-Branch Double Entry**: Automatic ledger balancing enforcing `SUM(debits) == SUM(credits)` with automated currency conversion based on daily National Bank of Cambodia official exchange rates.

### 3.11 Student Transport Management System
- **Fleet Logistics**: Real-time vehicle seat occupancy telemetry, road tax tracking, scheduled maintenance reminders, and automated driver license renewal alerts.

### 3.12 Student & Vehicle Tracking System
- **Emergency Protocol**: Instant geolocation broadcasts if a transport vehicle deviates from designated corridors or exceeds municipal speed limits by more than 15 km/h.

### 3.13 Student Hostel Management System
- **Residential Operations**: Floor and room allocation, electronic key card integration, night curfew roll-call reconciliation, and visitor duration monitoring.

### 3.14 Security Gate and Front Desk System
- **Turnstile Integration**: Barcode/RFID access control for students, biometric scans for staff, and photo visitor badges with temporary QR exit passes.

### 3.15 Dashboard Management System
- **Role-Centric Telemetry**: Custom cockpit views for Super Admin, Campus Dean, Finance Director, Academic Coordinator, Teacher, Parent, and Student.

### 3.16 Virtual Classroom Software System
- **Capabilities**: Integrated WebRTC video lectures, digital whiteboards, screen sharing, live quiz popups, and automated student attendance logging based on connection duration.

### 3.17 Health Management System
- **Infirmary Operations**: On-campus clinic visit logs, medical incident reports, immunization records, chronic illness tracking, allergy alerts, and prescription logs.

### 3.18 Canteen Management System
- **Touchscreen POS**: Cashless student wallet debit via RFID ID card, meal plan subscriptions, nutritional value breakdowns, and daily cafeteria gross revenue reconciliation.

### 3.19 Parent Teacher Meeting (PTM) Management System
- **Conferencing Desk**: Automated appointment slot booking preventing teacher overlaps, supporting both physical classroom desks and 1-click virtual video meeting rooms.

### 3.20 Employee / Staff Management System
- **HR Lifecycle**: Applicant tracking system (ATS), credential verification, contract renewals, 360-degree peer and student feedback evaluations, and career progression milestones.

---

## 4. Four Cambodian Educational Tiers Specialized Adaptation

| Subsystem Domain | K-12 School (MoEYS) | TVET College | Specialized Institute | University (Higher Ed) |
|:---|:---|:---|:---|:---|
| **Admissions** | Grade placement & birth certificate | Skill assessment & diploma records | Professional portfolio intake | Faculty department & entrance exam |
| **Curriculum** | MoEYS National Standards | Modular vocational competency | Fast-track executive certificates | CATS Credit hours & prerequisites |
| **Attendance** | Twice-daily classroom roll-call | Workshop safety shift check-in | Cohort session attendance | Lecture hall swipe & lab logs |
| **Exams** | Semester exams & BacII prep | Practical skill task certification | Competency assessment tests | Midterms, finals & thesis defense |
| **Scholarships** | Need-based & sibling discounts | Technical ministry scholarships | Corporate employer sponsorships | Academic honors & research grants |
| **Timetables** | Fixed class period grid | Workshop/classroom rotation | Evening & weekend executive blocks | Complex multi-campus student schedules |

---

## 5. Cambodian Financial & Typographic Localization Engine

### 5.1 Dual-Currency Financial Engine
- **Primary Currencies**: Khmer Riel (`KHR` / `៛`) and United States Dollar (`USD` / `$`).
- **Exchange Rate Handling**: Daily automated synchronization with the National Bank of Cambodia (NBC) reference rate.
- **Invoicing Rules**: Invoices display totals in both currencies; payments may be tendered in either currency or split across currencies with automated exact change calculation.

### 5.2 National Bank of Cambodia Bakong KHQR
- **Integration**: Native EMVCo-compliant dynamic QR generation.
- **Settlement**: Instant interbank settlement via Bakong open API with zero intermediary fees.
- **Webhook Ingress**: High-throughput asynchronous payment notification directly into PostgreSQL outbox.

### 5.3 Typographic Triad Enforcement
- **English Prose & Headings**: `font-family: 'Ubuntu', sans-serif;`
- **Khmer UI Elements**: `font-family: 'Google Sans Khmer', sans-serif;` with zero-width spaces (`\u200B`) between word tokens to guarantee zero awkward word-breaking across lines.
- **Formal Diplomas & Ministerial Headings**: `font-family: 'Moul', serif;` for ceremonial Khmer typography.

---

## 6. PostgreSQL Database Schema (DDL) with Row-Level Security

```sql
-- Schema Extension for Module 79: Multi-Tier Campus Lifecycle

-- 1. Scholarship Programmes and Allocations
CREATE TABLE IF NOT EXISTS scholarship_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    institution_tier VARCHAR(32) NOT NULL CHECK (institution_tier IN ('SCHOOL', 'COLLEGE', 'INSTITUTE', 'UNIVERSITY')),
    title VARCHAR(255) NOT NULL,
    donor_name VARCHAR(255),
    grant_type VARCHAR(64) NOT NULL CHECK (grant_type IN ('TUITION_WAIVER', 'STIPEND', 'TEXTBOOK', 'TRAVEL')),
    coverage_percentage NUMERIC(5,2) DEFAULT 0.00,
    total_fund_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    disbursed_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    min_gpa_requirement NUMERIC(3,2) DEFAULT 2.50,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Student Scholarship Grants & Clawbacks
CREATE TABLE IF NOT EXISTS student_scholarships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    scholarship_id UUID NOT NULL REFERENCES scholarship_programs(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL,
    academic_year VARCHAR(32) NOT NULL,
    awarded_amount_usd NUMERIC(10,2) NOT NULL,
    clawback_amount_usd NUMERIC(10,2) DEFAULT 0.00,
    status VARCHAR(32) NOT NULL CHECK (status IN ('ACTIVE', 'PROBATION', 'SUSPENDED', 'REFUNDED')),
    remarks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Canteen Meal Plans and RFID Wallet Balances
CREATE TABLE IF NOT EXISTS canteen_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    user_id UUID NOT NULL UNIQUE,
    rfid_card_uid VARCHAR(64) UNIQUE,
    wallet_balance_khr NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    wallet_balance_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    dietary_notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Health Clinic Medical Encounters
CREATE TABLE IF NOT EXISTS health_clinic_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    student_id UUID NOT NULL,
    attending_staff_id UUID NOT NULL,
    symptoms TEXT NOT NULL,
    diagnosis TEXT,
    administered_medication VARCHAR(255),
    dosage VARCHAR(64),
    infirmary_stay_minutes INT DEFAULT 0,
    parent_notified BOOLEAN NOT NULL DEFAULT false,
    visit_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Virtual Classroom Sessions
CREATE TABLE IF NOT EXISTS virtual_classroom_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    course_batch_id UUID NOT NULL,
    teacher_id UUID NOT NULL,
    topic VARCHAR(255) NOT NULL,
    meeting_url TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    participant_count INT DEFAULT 0,
    recording_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true
);

-- 6. Parent-Teacher Meeting (PTM) Schedules
CREATE TABLE IF NOT EXISTS ptm_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    academic_term VARCHAR(64) NOT NULL,
    teacher_id UUID NOT NULL,
    student_id UUID NOT NULL,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    meeting_type VARCHAR(32) NOT NULL CHECK (meeting_type IN ('IN_PERSON', 'VIRTUAL_CONFERENCE')),
    room_number VARCHAR(32),
    virtual_link TEXT,
    attendance_status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (attendance_status IN ('PENDING', 'ATTENDED', 'CANCELLED', 'NO_SHOW')),
    teacher_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row-Level Security Policies
ALTER TABLE scholarship_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE canteen_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_clinic_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE virtual_classroom_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ptm_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY branch_isolation_scholarships ON scholarship_programs
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);

CREATE POLICY branch_isolation_canteen ON canteen_accounts
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);

CREATE POLICY branch_isolation_clinic ON health_clinic_visits
    FOR ALL USING (branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID);
```

---

## 7. Spring Boot 3 REST API Contracts & Kafka Topologies

### 7.1 Synchronous-to-Asynchronous Bridge Endpoints
- `POST /api/v1/admissions/guest-apply`: Accepts unauthenticated application payload, returns `HTTP 202 Accepted` with `trackingPin`. Emits `campus.admissions.submitted`.
- `POST /api/v1/scholarships/apply`: Accepts student scholarship dossier, returns `HTTP 202 Accepted`. Emits `campus.scholarship.applied`.
- `POST /api/v1/canteen/rfid-charge`: High-frequency tap charging, returns `HTTP 200 OK` or `HTTP 202 Accepted`. Emits `campus.canteen.transaction`.
- `POST /api/v1/health/clinic-visit`: Logs infirmary encounter, returns `HTTP 201 Created`. If emergency, emits high-priority `campus.health.emergency`.
- `POST /api/v1/ptm/book-slot`: Reserves teacher meeting slot with conflict check, returns `HTTP 200 OK`.

### 7.2 Kafka Canonical Event Topics
```
Topic: campus.admissions.submitted
Partition Key: {branchId}#{trackingPin}
Envelope: EventEnvelope<GuestAdmissionPayload>

Topic: campus.scholarship.awarded
Partition Key: {branchId}#{studentId}
Envelope: EventEnvelope<ScholarshipAwardPayload>

Topic: campus.health.emergency
Partition Key: {branchId}#{studentId}
Envelope: EventEnvelope<HealthAlertPayload>

Topic: campus.canteen.transaction
Partition Key: {branchId}#{rfidCardUid}
Envelope: EventEnvelope<CanteenChargePayload>

Topic: campus.ptm.scheduled
Partition Key: {branchId}#{teacherId}
Envelope: EventEnvelope<PtmBookingPayload>
```

---

## 8. Strategic Answers to Core Architectural Ingress Queries

1. **What are the key features of the Student Management System?**
   - The platform integrates 6 sovereign operational axes: Online Admissions & Guest Intake, Real-Time Biometric Attendance, Constraint-Satisfaction Timetable Management, Multi-Board CBT & Manual Exam Management, Dual-Currency (`KHR`/`USD`) Fee Management, and Longitudinal Multi-Tier Analytics Reporting.
2. **Is the Student Management System customizable?**
   - Yes. Through polymorphic institutional tiers (`SCHOOL`, `COLLEGE`, `INSTITUTE`, `UNIVERSITY`), institutions toggle grade schemas, credit systems, faculty hierarchies, statutory deductions, and report cards dynamically.
3. **Can the Student Management System integrate with other software applications?**
   - Yes. Built on open REST APIs, Kafka event streams, and OpenAPI 3.0 contracts. Supports turnkey integration with National Bank of Cambodia Bakong KHQR, ABA PayWay, Wing Bank, ZKTeco biometric turnstiles, and Jitsi/Zoom video conferencing.
4. **Is training available for the Student Management System?**
   - Yes. Backed by dedicated regional distributor training centers across 5 economic corridors: Phnom Penh, Siem Reap, Battambang, Sihanoukville, and Kampong Cham, delivering on-site hardware rollout and in-person Khmer staff training.
5. **Can the Student Management System be accessed from mobile devices?**
   - Yes. Fully responsive Liquid Glass mobile web application alongside native cross-platform mobile apps for Students/Parents, Teachers, and Executive Trustees with biometric login and offline data caching.
6. **Can the Student Management System be customized to support different languages?**
   - Yes. Dual-language Khmer and English architecture out of the box. Enforces Google Sans Khmer with `\u200B` zero word-breakage, Moul for formal diplomas, and full multilingual dictionary localization.
