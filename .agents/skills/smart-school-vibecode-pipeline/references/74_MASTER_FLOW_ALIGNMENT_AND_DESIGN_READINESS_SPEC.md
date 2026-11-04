---
name: smart-school-flow-alignment-design-readiness
description: Authoritative Specification for the Smart School Enterprise Master Flow Alignment, Operational Sequence & Design-Readiness Standard. Maps the complete 10-step institutional lifecycle flow across all 35 modules and 375 features. Establishes the authoritative Design-Readiness Audit Matrix connecting Layout Archetypes (A through G), 26 Master UI Components, Liquid Glass tokens, REST API contracts, and PostgreSQL Row-Level Security entities.
---

# Master Flow Alignment & Design-Readiness Specification
## 10-Step Operational Lifecycle Flow & Design-Readiness Audit (ABLOB Architecture)

### Executive Architecture Overview

This specification establishes the definitive **Master Operational Flow Alignment** and **Design-Readiness Standard** for the **Smart School Enterprise Platform**.

It aligns all 35 modules and 375 features into a single, contiguous **10-Step Institutional Operational Lifecycle Flow**, guaranteeing that every workflow progresses logically from institutional setup to graduation and executive oversight.

Furthermore, it delivers an exhaustive **Design-Readiness Audit Matrix** confirming that every single screen is 100% prepared for design, scaffolding, and production implementation using standardized **Layout Archetypes (A through G)**, the **26 Master UI Components**, the **Liquid Glass Design DNA**, and **PostgreSQL Row-Level Security (RLS)**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               10-STEP MASTER OPERATIONAL LIFECYCLE FLOW ALIGNMENT                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [STEP 01: FOUNDATION & SETUP]      Branches -> Settings -> Sessions -> RBAC -> Stream  │
│          ▼                                                                             │
│ [STEP 02: ADMISSIONS & INTAKE]     Online Application -> S3 Vault -> Concessions -> ID │
│          ▼                                                                             │
│ [STEP 03: FINANCIAL CLEARINGHOUSE] Fees Master -> Gateways -> E-Challan -> Wire Slip   │
│          ▼                                                                             │
│ [STEP 04: ACADEMIC & TIMETABLE]    LMS Courses -> Subject Groups -> Clash-Free Matrix  │
│          ▼                                                                             │
│ [STEP 05: PRESENCE & TELEMETRY]    Sub-45s Roll-Call -> Turnstiles -> GPS Bus Stream   │
│          ▼                                                                             │
│ [STEP 06: INSTRUCTION & HOMEWORK]  Lesson Plans -> Syllabus Meters -> Whiteboard Cam   │
│          ▼                                                                             │
│ [STEP 07: ASSESSMENTS & EXAMS]     Question Bank -> Paper Gen -> 15s CBT -> Marksheets │
│          ▼                                                                             │
│ [STEP 08: LOGISTICS & RESIDENCE]   Library -> Transit Fleet -> Hostel Dining -> Canteen│
│          ▼                                                                             │
│ [STEP 09: CREDENTIALS & ALUMNI]    Circulars -> TC Clearance -> Merit Diplomas -> Alum │
│          ▼                                                                             │
│ [STEP 10: MOBILE APPS & EXECUTIVE] Student/Parent App -> Teacher App -> Trustee Gauges │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 10-Step Master Operational Flow Alignment

### Step 01: Institutional Foundation & Tenant Setup
- **Operational Trigger**: Multi-campus onboarding or commencement of a new academic session.
- **Sequential Workflow**:
  1. *Multi-Branch Federation*: Super Admin provisions campus branches (`br_siemreap_main`, `br_phnompenh_west`) triggering PostgreSQL RLS schema partitioning.
  2. *System Setting Configuration*: Establish institutional identity (blank logo placeholder, school name in `src/config/brand.ts`), timezones, and active currency (`USD`, `KHR`).
  3. *Academic Session Master*: Provision current academic year (`2026-27`) with term calendar intervals.
  4. *Roles & Permissions (RBAC)*: Seed the 8 sovereign institutional personas (`SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `RECEPTIONIST`, `TEACHER`, `LIBRARIAN`, `STUDENT`, `PARENT`).
  5. *Department & Stream Master*: Define academic faculties (Sciences, Humanities, Commerce, Technical) and secondary school streams.
  6. *Class & Section Structuring*: Establish grade levels (Grade 1 to 12) with section capacities (Section A, B, C) and room allocations.

### Step 02: Admissions, Document Verification & Student Intake
- **Operational Trigger**: Intake window opens for prospective student enrollment.
- **Sequential Workflow**:
  1. *Online Admission Portal*: Applicant or guardian completes multi-step intake wizard uploading birth certificate, previous report cards, and medical alerts.
  2. *Encrypted S3 Document Vault*: Assets buffered to secure object storage via presigned URLs with virus/malware scanning.
  3. *Admissions Screening Desk*: Campus Dean/Admin audits dossier, verifies entrance prerequisites, and marks application as `Approved`.
  4. *Scholarship & Concession Allocation*: Merit or sibling fee concessions linked to applicant profile with trustee sign-off.
  5. *Student Dossier Provisioning*: System assigns unique Admission Number (`KWD-SR-2026-XXXXX`) and creates 360-degree SIS profile.
  6. *ID Card Generation*: Automated compilation of Student PVC ID Badges and Guardian Pickup Passes with dynamic QR/barcodes.

### Step 03: Financial Master, Fee Billing & Clearinghouse
- **Operational Trigger**: Invoicing of term tuition, transit fees, and dormitory boarding dues.
- **Sequential Workflow**:
  1. *Fees Master Hierarchy*: Configure fee groups (`Term 1 Tuition`, `Laboratory`, `Transport`), fee types, and 4-way fine calculation engine (`None`, `Percentage`, `Fix Amount`, `Cumulative Per-Day`).
  2. *Automated Invoicing*: System generates student invoices incorporating eligible scholarship concessions and sibling discounts.
  3. *Online Payment Checkout*: Parents settle balances online via integrated gateways (Stripe, Razorpay, ABA PayWay, Wing Bank) receiving instant digital receipts.
  4. *Triplicate E-Challan Generation*: Offline parents download machine-readable barcode challans for counter deposit at partner commercial banks.
  5. *Bank Wire Remittance Desk*: Cashier reviews uploaded deposit counter slips side-by-side with invoice line items and approves with 1-click.
  6. *Statutory General Ledger*: Double-entry accounting ledger records revenue inflows, expense vouchers, and generates real-time P&L, Balance Sheet, and Trial Balance.

### Step 04: Academic Logistics, Curriculum & Clash-Free Timetable
- **Operational Trigger**: Academic curriculum planning and period scheduling prior to term commencement.
- **Sequential Workflow**:
  1. *Course Catalog (LMS)*: Author online courses, curriculum tracks, credit weightings, and digital video assets.
  2. *Subject Groups Binding*: Map required curriculum subjects and elective courses to specific class sections.
  3. *Classroom Room Allocation*: Map physical classrooms, science laboratories, computer rooms, and sports fields with capacity caps.
  4. *Clash-Free Timetable Planning*: Algorithmic collision detection engine schedules Monday-Saturday period grids ensuring zero teacher, room, or section double-booking.
  5. *Teacher Workload Balancing*: Verify weekly instructional hours per faculty member, preventing educator burnout.

### Step 05: Daily Presence & Real-Time Student Transit Telemetry
- **Operational Trigger**: Daily morning arrival, transit boarding, and classroom roll-call.
- **Sequential Workflow**:
  1. *Student Bus Boarding*: Student scans RFID card upon entering bus; UHF antenna logs boarding event.
  2. *Real-Time GPS Transit Stream*: Vehicle coordinates broadcast every 5 seconds via MQTT v5.0 and WebSockets.
  3. *1km Geofenced Parent Alerts*: System dispatches push notifications to parents when the school bus is within 5 minutes of their pickup point.
  4. *Campus Perimeter Turnstiles*: Optical QR / RFID gate scans verify authorized student and staff entry, enforcing 5-minute anti-passback rules.
  5. *Sub-45s Classroom Roll-Call*: Class teachers complete morning roll-call in under 45 seconds using mobile or web swipe interfaces defaulting to "All Present".
  6. *Automated Absence Notifications*: System triggers automated push notifications and DLT-compliant SMS alerts at 08:30 for unexcused absences.

### Step 06: Instructional Delivery & Daily Learning Workflow
- **Operational Trigger**: Daily classroom instruction, lecture planning, and homework assignment.
- **Sequential Workflow**:
  1. *Daily Lesson Planning*: Educators document learning objectives, pedagogical methodology, teaching aids, and board work notes.
  2. *Syllabus Progress Tracking*: Teachers toggle topic milestones as `Completed`, updating real-time visual syllabus pacing meters.
  3. *Daily Homework & Whiteboard Capture*: Teachers photograph board exercises or worksheets using mobile cameras with automatic perspective correction.
  4. *Multi-Section Distribution*: Single-action broadcast dispatches homework assignments across multiple parallel class sections.
  5. *Assignments & Notes Vault*: Students access lecture handouts, audio pronunciation files, and practice worksheets with offline mobile caching.
  6. *Virtual Classroom Relays*: Integrated Google Meet and Zoom engines launch cohort video lectures with automated participant duration logging.

### Step 07: High-Stakes Assessments & Examination Engine
- **Operational Trigger**: Periodic unit testing, midterm assessments, and annual board examinations.
- **Sequential Workflow**:
  1. *Master Question Bank Repository*: Index questions by Subject, Chapter, Bloom's Taxonomy Level (Remember, Understand, Apply, Analyze, Evaluate), and Question Type.
  2. *Algorithmic Question Paper Generator*: Compile balanced test papers adhering to blueprint constraints alongside confidential answer keys and scoring rubrics.
  3. *Exam Timetable & Seating Allocation*: Publish examination timetable, assign hall invigilators, and print student Admit Cards with photo identification.
  4. *Online CBT Examination*: Students complete digital tests featuring 15-second autosave to local SQLite and anti-cheat screen lockouts.
  5. *Evaluation & Score Moderation*: Teachers inspect subjective submissions, enter marks, apply moderation curves, and calculate CGPA/GPA.
  6. *Marksheet & Result Release*: Asynchronous bulk PDF compilation of terminal marksheets with digital crests and cryptographic verification QR codes.

### Step 08: Auxiliary Campus Logistics & Resident Life
- **Operational Trigger**: Ongoing campus operations, student residential life, and auxiliary facilities.
- **Sequential Workflow**:
  1. *Library Circulation Desk*: Catalog physical volumes, issue books via barcode scanners, enforce loan periods, and assess overdue fines.
  2. *Transport Fleet Logistics*: Vehicle maintenance scheduling, fuel logs, commercial driver assignments, and route optimization.
  3. *Hostel Dormitory Management*: Room bed allocation, weekly rotational dietary food menus, allergen warnings, and parent outpass authorization.
  4. *Institutional Canteen RFID*: Cashless student wallet with parental daily spending limits and dietary restriction warnings.
  5. *Student Behaviour & Discipline*: Classroom incident logging, positive commendation points, inter-house cup standings, and parent conduct reviews.

### Step 09: Communications, Statutory Credentials & Alumni Relations
- **Operational Trigger**: Campus broadcasts, student graduation, transfer clearance, and graduate relations.
- **Sequential Workflow**:
  1. *Noticeboard Bulletins & Circulars*: Publish role-targeted bulletins and formal circulars requiring digital read-receipt signatures.
  2. *Omnichannel Emergency Broadcast*: 1-Click dispatch simultaneously pushing high-priority alerts across Push, SMS, and Email.
  3. *Transfer Certificate (TC) Clearance*: Statutory clearance workflow verifying zero library book dues, zero outstanding fees, and conduct clearance prior to certificate issuance.
  4. *Dynamic Certificate Generation*: Visual designer compiles character certificates, sports trophies, and formal diplomas with dynamic token interpolation.
  5. *Alumni Network & Reunions*: Graduate directory tracking career paths, higher education enrollments, and annual reunion event scheduling.

### Step 10: Multi-Persona Mobile Applications & Executive Telemetry
- **Operational Trigger**: Continuous executive governance, faculty mobility, and parent transparency.
- **Sequential Workflow**:
  1. *Student / Parent Mobile App*: Real-time homework feeds, online fee checkout, bus GPS tracking, attendance calendar, and result marksheets.
  2. *Teacher Mobile App*: Sub-45s roll-calls, exam grading desk, whiteboard photo uploads, timetable alerts, and parent messaging.
  3. *Trustee / Principal Executive App*: Stream-wise fee collection telemetry, faculty/student morning attendance rates, teacher pacing index, and sovereign emergency broadcast.
  4. *AWS Cloud Infrastructure*: Multi-AZ Aurora PostgreSQL RLS isolation, ECS/EKS Fargate auto-scaling, and CloudFront sub-20ms edge caching.

---

## 2. Comprehensive Design-Readiness Audit Matrix

Every single step in the master flow is audited below for design-readiness across the platform's architectural standards:

| Flow Step | Module / Screen Name | Layout Archetype | UI Components (from 26 Master Suite) | Design DNA Tokens | Persistence & Security | REST & Kafka Contracts | Design Readiness Status |
|:---|:---|:---:|:---|:---|:---|:---|:---:|
| **Step 01** | Multi-Branch Federation | `Archetype G` (Dashboard) | TanStack Table, Specular Card, Badge, Drawer | `bg-white/80`, `#4338CA`, Specular Rim | Multi-AZ Postgres RLS (`branch_id`) | `POST /api/v1/branches`, `branch-provisioned` | **DESIGN-READY (100%)** |
| **Step 01** | System Setting (14 Tabs) | `Archetype D` (Multi-Tab) | Tabs, Stepper, Switch, Select, Button | `bg-slate-100/80`, Active Indicator | `system_settings` table, RLS bypass | `PUT /api/v1/system-settings`, Kafka sync | **DESIGN-READY (100%)** |
| **Step 01** | Roles & Permissions | `Archetype B` (Top Filter Table)| Table, Checkbox Grid, Modal, Badge | `#7C3AED`, Hard Bottom Shadow | `roles`, `permissions` junction | `GET/POST /api/v1/roles`, RLS enforced | **DESIGN-READY (100%)** |
| **Step 01** | Classes, Sections & Streams| `Archetype A` (Split 2-Col) | TextInput, SelectDropdown, Table, Drawer | Left 30% Form, Right 70% Table | `academic_classes`, `sections` RLS | `POST /api/v1/academic/classes` (Sync) | **DESIGN-READY (100%)** |
| **Step 02** | Online Admission Intake | `Archetype B` (Criteria Form) | Stepper, DatePicker, FileUpload Dropzone | 6-Section Stepper, Specular Glass | `online_admissions`, S3 Vault | `POST /api/v1/admissions/apply` (HTTP 202) | **DESIGN-READY (100%)** |
| **Step 02** | Student Details Dossier | `Archetype B` (Criteria Table)| TanStack Table, Avatar Squircle, Badge | Tab Switcher (List vs Details) | `students` table with RLS | `GET /api/v1/students` (Indexed) | **DESIGN-READY (100%)** |
| **Step 02** | Student/Staff ID Badges | `Archetype E` (Visual Canvas) | Property Inspector, Millimeter Canvas | CR80 PVC Standard (85.6x53.98mm) | `id_card_templates`, RLS enforced | `POST /api/v1/credentials/id-cards/render` | **DESIGN-READY (100%)** |
| **Step 03** | Fees Master & Fee Groups | `Archetype A` (Split 2-Col) | Select, NumberInput, TanStack Table | 4-Way Fine Selector, Blue `#2563EB` | `fee_masters`, `fee_groups` RLS | `POST /api/v1/finance/fees-master` | **DESIGN-READY (100%)** |
| **Step 03** | Online Checkout & E-Challan| `Archetype B` (Criteria Table)| Modal, Barcode Canvas, Iframe Drawer | Triplicate Layout, Machine Barcode | `fee_payments`, `fee_challans` | `POST /api/v1/finance/challans/generate` | **DESIGN-READY (100%)** |
| **Step 03** | Bank Wire Remittance Desk | `Archetype B` (Criteria Table)| Side-by-Side Zoom Card, Badge, Button | Soft Green `#059669` / Pink `#E11D48` | `bank_deposit_slips`, RLS cashier | `PUT /api/v1/finance/slips/{id}/verify` | **DESIGN-READY (100%)** |
| **Step 03** | General Ledger & P&L | `Archetype B` (Criteria Table)| TanStack Table, Summary Cards, Badge | Double-Entry Balancing, Amber `#D97706`| `general_ledger`, `journal_vouchers` | `GET /api/v1/finance/reports/pnl` | **DESIGN-READY (100%)** |
| **Step 04** | Online Course LMS Catalog | `Archetype C` (Media Grid) | 4-Col Card Grid, Progress Bar, Avatar | Responsive 16:9 Thumbnail, Play Badge | `courses`, `lessons` S3 DRM streams | `GET /api/v1/courses/catalog` | **DESIGN-READY (100%)** |
| **Step 04** | Clash-Free Timetable Grid | `Archetype B` (Criteria Table)| Period Grid Matrix, Badge, Select | Monday-Saturday Grid, Collision Box | `timetables`, `classroom_rooms` | `POST /api/v1/academic/timetables/validate`| **DESIGN-READY (100%)** |
| **Step 05** | Sub-45s Classroom Attendance| `Archetype B` (Criteria Table)| Single-Tap Switcher, TanStack Table | Green (P), Red (A), Orange (L) | `attendance_records` RLS | `POST /api/v1/attendance/roll-call` | **DESIGN-READY (100%)** |
| **Step 05** | Live GPS Transit Bus Telemetry| `Archetype G` (Dashboard) | Mapbox/Leaflet View, Speedometer Card | Live Speed, ETA Countdown, 1km Geofence | Redis Coordinate Cache, MQTT v5.0 | `school/{branch}/fleet/{bus}/telemetry` | **DESIGN-READY (100%)** |
| **Step 05** | Security RFID Turnstiles | `Archetype B` (Criteria Table)| Turnstile Status Dot, Audio Chime | 880Hz Pass / 220Hz Buzz Sound Relay | `turnstile_logs`, Anti-Passback Cache | `POST /api/v1/turnstiles/scan` (HTTP 202) | **DESIGN-READY (100%)** |
| **Step 06** | Lesson Plans & Syllabus Pacing| `Archetype B` (Criteria Table)| Multi-Tier Tree, Pacing Meter, Button | Progress Meter Bar, `+ Add More` Row | `lesson_topics`, `syllabus_status` | `POST /api/v1/academic/lessons/topics` | **DESIGN-READY (100%)** |
| **Step 06** | Homework & Whiteboard Scanner| `Archetype B` (Criteria Table)| Camera Dropzone, Rubric Table, Modal | Split-Screen Submission Desk | `homework_submissions`, S3 Vault | `POST /api/v1/academic/homework/publish` | **DESIGN-READY (100%)** |
| **Step 06** | Assignments & Notes Vault | `Archetype C` (Media Grid) | Download Card, Search Input, Badge | Offline Cache Pill, Download Counter | `study_materials`, `content_shares` | `GET /api/v1/academic/notes` | **DESIGN-READY (100%)** |
| **Step 07** | Master Question Bank | `Archetype B` (Criteria Table)| Bloom's Tag, Search Dropdown, Table | 5 Bloom Levels, Difficulty Badges | `question_bank` with RLS | `GET/POST /api/v1/assessment/questions` | **DESIGN-READY (100%)** |
| **Step 07** | Algorithmic Paper Generator | `Archetype D` (Multi-Tab) | Constraints Slider, NumberInput, Modal | Blueprint Constraint Slider (25/50/25) | `exam_papers`, `answer_keys` | `POST /api/v1/assessment/papers/generate` | **DESIGN-READY (100%)** |
| **Step 07** | Online CBT Examination | `Archetype D` (Multi-Tab) | Timer Countdown, Question Nav, Radio | Anti-Cheat Screen Lock, 15s Autosave | `cbt_sessions`, SQLite local storage | `POST /api/v1/cbt/submit` (HTTP 202) | **DESIGN-READY (100%)** |
| **Step 07** | Terminal Marksheet Builder | `Archetype E` (Visual Canvas) | Layout Inspector, Canvas, TanStack Table | Dynamic Token Drop, QR Verification | `marksheet_templates`, Kafka PDF | `POST /api/v1/assessment/marksheets/bulk` | **DESIGN-READY (100%)** |
| **Step 08** | Library Circulation Desk | `Archetype B` (Criteria Table)| Barcode Input, TanStack Table, Modal | Active Member Green / Unenrolled White | `library_books`, `book_issues` | `POST /api/v1/library/circulation/issue` | **DESIGN-READY (100%)** |
| **Step 08** | Transport Fleet Management | `Archetype B` (Criteria Table)| TanStack Table, Route Modal, Badge | GPS Coords (14 decimal places) | `transport_routes`, `vehicles` | `POST /api/v1/transport/assign-vehicle` | **DESIGN-READY (100%)** |
| **Step 08** | Hostel & Dining Food Menus | `Archetype A` (Split 2-Col) | Week Day Accordion, Allergen Badge | Dietary Card, Room Inventory Counter | `hostel_rooms`, `dining_menus` | `POST /api/v1/hostel/rooms` | **DESIGN-READY (100%)** |
| **Step 08** | Canteen Cashless RFID Wallet | `Archetype B` (Criteria Table)| POS Checkout, Daily Limit Slider | RFID Card Tap, Allergen Alert Card | `canteen_wallets`, `canteen_logs` | `POST /api/v1/canteen/charge` | **DESIGN-READY (100%)** |
| **Step 09** | Noticeboard & Emergency Blast| `Archetype B` (Criteria Table)| Rich Editor, Audience Selector, Modal | 1-Click Multi-Channel Blast (SMS/Push) | `noticeboard_bulletins`, Kafka Dispatch| `POST /api/v1/communicate/broadcast` | **DESIGN-READY (100%)** |
| **Step 09** | Transfer Certificate (TC) | `Archetype E` (Visual Canvas) | Statutory Clearance Checkbox, Canvas | Dues Verification Pill (Fee/Book/Conduct)| `transfer_certificates`, RLS lock | `POST /api/v1/credentials/tc/issue` | **DESIGN-READY (100%)** |
| **Step 09** | Alumni Directory & Reunions | `Archetype B` (Criteria Table)| Cohort Selector, Event Calendar Grid | Pass-Out Year Filter, Reunion Scheduler | `alumni_records`, `alumni_events` | `GET/POST /api/v1/alumni` | **DESIGN-READY (100%)** |
| **Step 10** | Student / Parent Mobile App | Native Mobile Viewport | Liquid Glass Touch Cards, Tab Navigator | 48x48px Touch Targets, Haptic Feedback | SQLite/Room/SwiftData Offline Cache | Mobile Gateway API (:8080) | **DESIGN-READY (100%)** |
| **Step 10** | Teacher Mobile App | Native Mobile Viewport | Camera Whiteboard Scanner, Swipe List | Sub-45s Roll-Call, Offline Sync Queue | SQLite/Room/SwiftData Offline Cache | Mobile Gateway API (:8080) | **DESIGN-READY (100%)** |
| **Step 10** | Trustee / Principal Mobile App| Native Mobile Viewport | Executive Donut Gauges, KPI Progress | Real-Time Recovery %, Pacing Index | Multi-Tenant Executive Ingress | Mobile Gateway API (:8080) | **DESIGN-READY (100%)** |

---

## 3. Implementation Handoff Checklist for Autonomous Agents

When initiating the design or coding of any screen or feature, agents MUST verify:
1. [x] **Layout Archetype Match**: Confirm whether the target screen is Archetype A, B, C, D, E, F, or G.
2. [x] **Component Reuse**: Reuse pre-built UI components (`TanStackTable`, `RadixDrawer`, `SelectDropdown`, `DatePickerInput`) rather than reinventing primitives.
3. [x] **Liquid Glass Tokens**: Enforce `bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_0_0_rgba(15,23,42,0.06)]` with top specular highlight `border-t border-white/95`.
4. [x] **Zero Emoji Enforcement**: Strictly replace any emoji characters with Google Material Symbols Outlined (`wght 500`).
5. [x] **PostgreSQL RLS Safety**: Ensure `branch_id = current_setting('app.current_branch_id')` is applied on all queries and mutations.
6. [x] **Async Ingress Compliance**: Wrap high-velocity operations (admissions, test generation, bulk PDF marksheets) in Kafka `EventEnvelope<T>`, returning `HTTP 202 Accepted`.
