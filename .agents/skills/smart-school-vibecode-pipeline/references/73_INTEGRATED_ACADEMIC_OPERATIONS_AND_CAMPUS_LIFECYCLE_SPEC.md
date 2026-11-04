---
name: smart-school-academic-operations-hub
description: Authoritative Specification for the Smart School Integrated Academic Operations, Enrollment & Campus Lifecycle Architecture across 13 core operational domains - Online Enrollment & Fee Payment, Course/Class/Section, Lesson/Syllabus Planning, Timetable Planning, Attendance & Student Tracking, Daily Homework & Classwork, Assignments & Notes, Dynamic Certificates, Administrative Circulars, Online/Offline Exam, Question Paper Generator, Department & Stream, and Student/Staff/Visitor ID Cards. Includes future implementation roadmaps, phased rollout matrices, and architectural decision records.
---

# Integrated Academic Operations & Campus Lifecycle Specification
## 13-Domain Core Educational Hub & Implementation Framework (ABLOB Architecture)

### Executive Architecture Overview

The **Integrated Academic Operations & Campus Lifecycle Hub** unites pedagogical administration, instructional delivery, statutory assessment, financial ingress, and campus physical security into a coherent, high-velocity operational system.

Designed for high-throughput, multi-tenant deployment, this architecture bridges real-time web/mobile client interactions with Spring Boot 3 virtual threads, Kafka event topologies, and PostgreSQL Row-Level Security (RLS) data isolation.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               INTEGRATED ACADEMIC OPERATIONS & CAMPUS LIFECYCLE TOPOLOGY               │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ 1. ADMISSION & STRUCTURE  │ 2. INSTRUCTION & PROGRESS │ 3. ASSESSMENT & CREDENTIALS    │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ - Online Enrollment & Pay │ - Lesson & Syllabus Plans │ - Online & Offline CBT Exams   │
│ - Course, Class & Section │ - Clash-Free Timetables   │ - Question Paper Generator     │
│ - Department & Streams    │ - Homework & Classwork    │ - Dynamic Certificates & Mark  │
│ - Student/Staff ID Cards  │ - Assignments & Notes     │ - Administrative Circulars     │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ 4. DAILY PRESENCE & TELEMETRY                                                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ - Sub-45s Classroom Attendance Roll-Call & In-App Absence Alerts                       │
│ - Biometric Turnstiles & Real-Time GPS Student Transit Telemetry (1km Geofenced Alerts)│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ BACKEND PLATFORM: Java 21 Virtual Threads, Neon PostgreSQL RLS, Kafka Canonical Events │
│ CLIENT PLATFORMS: Liquid Glass Web Portals (Admin/Teacher/Student) & Native Mobile Apps │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 13 Core Operational Domains

### Domain 01: Online Enrollment & Fee Payment
- **Architectural Scope**: Complete paperless student intake, application screening, dynamic fee calculation, online checkout, and bank remittance reconciliation.
- **Key Capabilities**:
  - Multi-step digital application wizard: Student biographical data, previous academic records, guardian contact verification, transport/hostel requirements, and medical alerts.
  - Document vault ingestion: Automated client-side compression and encrypted S3 storage for birth certificates, transfer certificates, and passport photos.
  - Dynamic fee schedule calculation: Automatically applies base tuition, laboratory levies, transport distance tariffs, and eligible scholarship concessions.
  - Payment options: Real-time digital payment gateways (Stripe, Razorpay, ABA PayWay, Wing Bank) with immediate digital receipt generation.
  - Triplicate e-challan generation with machine-readable barcodes for cash deposits at partner commercial bank branches.
  - Cashier wire verification desk: Bursars review uploaded bank deposit slips side-by-side with invoice line items and approve with 1-click.

### Domain 02: Course, Class & Section Management
- **Architectural Scope**: Hierarchical multi-tier academic structure and cohort roster management.
- **Key Capabilities**:
  - Course catalog governance: Define courses, credit weighting, prerequisites, and syllabi across academic terms.
  - Class and section partitioning: Establish grade levels (Grade 1 to 12) with multi-section capacities (Section A, B, C, D) and classroom room allocations.
  - Academic stream tracks: Partition senior secondary cohorts into specialized streams (Science, Commerce, Arts/Humanities, Vocational).
  - Multi-class enrollment engine: Support for students concurrently attending specialized language tracks or auxiliary diploma programs.
  - Automated session-to-session bulk promotion matrix with Pass/Fail validation and historical archival.

### Domain 03: Lesson Planning & Syllabus Progress
- **Architectural Scope**: Structured pedagogical instructional design and curriculum completion tracking.
- **Key Capabilities**:
  - Multi-tier curriculum trees: Subjects -> Units -> Chapters -> Lessons -> Topics.
  - Daily lesson plan builder: Learning objectives, instructional aids, pedagogical methods, board work notes, and formative assessment questions.
  - Syllabus pacing meters: Real-time visual progress bars indicating percentage completion against scheduled academic term milestones.
  - Cross-session lesson cloning: One-click replication of lesson plans and topic taxonomies into upcoming academic sessions.

### Domain 04: Timetable Planning & Schedule Optimization
- **Architectural Scope**: Algorithmic period allocation and clash-free classroom scheduling.
- **Key Capabilities**:
  - Multi-dimensional collision detection: Validates that zero teachers, zero classrooms, and zero student cohorts are double-booked during any period.
  - Weekly master schedule grid: Monday through Saturday scheduling supporting regular periods, laboratory blocks, assemblies, and lunch intervals.
  - Faculty workload balancing: Visual telemetry displaying weekly teaching hours per instructor with overload alert warnings.
  - Dynamic substitute teacher allocation: Automated recommendations for available faculty members when a scheduled teacher takes emergency leave.

### Domain 05: Attendance & Real-Time Student Tracking
- **Architectural Scope**: Comprehensive campus presence governance and transit safety telemetry.
- **Key Capabilities**:
  - Sub-45 second classroom roll-call: Single-swipe bulk attendance register on web and mobile with instant "Mark All Present" defaulting.
  - Multi-modal turnstile ingress: Optical QR badge scanning, UHF RFID card turnstiles, and biometric facial recognition turnstiles.
  - Anti-passback enforcement: In-memory Redis sliding-window cache preventing credential reuse within 5 minutes.
  - Live GPS bus transit tracking: Real-time vehicle coordinates broadcast via MQTT v5.0 and WebSockets, updating student transit maps.
  - 1km Geofenced arrival alerts: Automated high-priority push notifications and SMS alerts dispatched when the school bus is within 5 minutes of the student's pickup point.

### Domain 06: Daily Homework & Classwork Desk
- **Architectural Scope**: Assignment distribution, digital student submission, and structured evaluation.
- **Key Capabilities**:
  - Mobile whiteboard scanner: Teachers capture classroom board work or handouts via camera with automatic perspective correction and edge cropping.
  - Multi-section distribution: Single-action dispatch of homework assignments across multiple parallel class sections.
  - Due-date enforcement: Timed submission lock with optional late submission penalty rules.
  - Evaluation desk: Split-screen interface for teachers to inspect student image/PDF submissions, input rubric scores, and attach audio/text feedback notes.

### Domain 07: Assignments & Notes Digital Vault
- **Architectural Scope**: Centralized digital repository of curriculum study assets and lecture notes.
- **Key Capabilities**:
  - Categorized asset taxonomy: Filterable by Subject, Academic Term, Chapter, and Material Type (PDF Notes, Practice Worksheets, Audio Pronunciations, Video Tutorials).
  - Student self-service downloads: Single-click access with offline caching capabilities on native mobile clients.
  - Faculty permission controls: Secure access levels allowing department heads to review and approve study assets prior to student publication.

### Domain 08: Dynamic Certificates & Marksheets
- **Architectural Scope**: Visual credential designer and automated statutory academic document generation.
- **Key Capabilities**:
  - Dynamic token interpolation engine: Support for 20+ variable tokens (`[name]`, `[admission_no]`, `[roll_no]`, `[class]`, `[section]`, `[session]`, `[gender]`, `[dob]`, `[father_name]`).
  - School Leaving Transfer Certificate (TC): Statutory clearance workflow verifying zero library book dues, zero outstanding fees, and conduct clearance prior to certificate locking.
  - Visual marksheet layout designer: Customizable header letterheads, dual signature blocks (Teacher, Principal), institutional digital crest, and anti-counterfeit verification QR codes.
  - High-velocity batch PDF rendering: Asynchronous compilation of thousands of terminal report cards via Kafka workers.

### Domain 09: Administrative Circulars & Emergency Notices
- **Architectural Scope**: Omnichannel institutional broadcasting and compliance acknowledgments.
- **Key Capabilities**:
  - Role-targeted noticeboard bulletins: Broadcast specifically to Teachers, Students, Parents, or All Personnel.
  - Mandatory read-receipt signatures: Formal administrative circulars requiring digital acknowledgment from faculty or parents before proceeding to portal dashboards.
  - Multi-channel emergency broadcast: 1-Click dispatch simultaneously pushing high-priority alerts via Firebase Cloud Messaging (FCM), APNs, DLT-compliant SMS, and email.

### Domain 10: Online & Offline Examination Management
- **Architectural Scope**: Comprehensive standardized evaluation covering traditional paper exams and digital CBT.
- **Key Capabilities**:
  - Manual examination scheduling: Timetable planning, seating chart allocation, room supervision rosters, and hall ticket (admit card) printing.
  - Computer-Based Testing (CBT) engine: Timed assessments with randomized question ordering, question shuffling, and countdown timers.
  - Anti-cheat safeguards: Fullscreen browser lock, tab switch detection, and client-side autosave every 15 seconds to local SQLite storage.
  - Instant formative scoring: Automated grading for objective question formats with immediate performance feedback and answer explanations.

### Domain 11: Algorithmic Question Paper Generator
- **Architectural Scope**: Master item repository and automated test paper authoring.
- **Key Capabilities**:
  - Master question bank: Indexed by Subject, Chapter, Topic, Bloom's Taxonomy Level (Remember, Understand, Apply, Analyze, Evaluate), and Question Type (MCQ, True/False, Fill in the Blanks, Short Answer, Long Problem).
  - Algorithmic test paper compiler: Generates balanced test papers matching user-defined constraints: e.g., 25% Easy, 50% Medium, 25% Hard; 30 marks Objective, 70 marks Subjective.
  - Dual output generation: Simultaneous compilation of the Student Examination Paper and the confidential Teacher Answer Key & Scoring Rubric.
  - Supervisor & Examiner tracking: Proctor duty quota allocation and paper grading progress monitoring.

### Domain 12: Academic Department & Stream Taxonomy
- **Architectural Scope**: Organizational faculty governance and curricular specialization.
- **Key Capabilities**:
  - Departmental hierarchy: Governance structure defining Department Heads (HODs), subject coordinators, and teaching faculty rosters.
  - Stream-level governance: Academic stream specialization (Science, Commerce, Arts) with customized subject bundles, minimum entry requirements, and laboratory allocations.
  - Stream-wise fee tracking: Financial telemetry disaggregating fee collection percentages and delinquent arrears by academic stream.

### Domain 13: Student, Staff & Visitor ID Cards
- **Architectural Scope**: Identity badge issuance, perimeter access control, and physical credential design.
- **Key Capabilities**:
  - Multi-persona badge templates: Student ID Cards, Faculty & Staff Credentials, and Temporary Visitor Turnstile Passes.
  - Dynamic barcode & QR generation: Encodes unique member IDs, emergency contact numbers, and turnstile access tokens.
  - Dual orientation layout engine: Support for both Horizontal (Landscape) and Vertical (Portrait) PVC card printing standards (CR80: 85.60 x 53.98 mm).
  - Automated photo cropping: Facial recognition auto-centering for student and staff portrait photos.

---

## 2. Future Implementation & Discussion Framework

To facilitate future architectural reviews, technical roadmap discussions, and engineering planning sessions, this framework organizes the 13 domains into a structured **Phased Rollout Matrix** with clear **Architectural Decision Records (ADRs)**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        PHASED IMPLEMENTATION ROADMAP MATRIX                            │
├───────────────────────┬───────────────────────────────┬────────────────────────────────┤
│ PHASE 1: FOUNDATIONS  │ PHASE 2: ADVANCED INSTRUCTION │ PHASE 3: ENTERPRISE AUTOMATION │
│ (Target: Weeks 1 - 4) │ (Target: Weeks 5 - 8)         │ (Target: Weeks 9 - 12)         │
├───────────────────────┼───────────────────────────────┼────────────────────────────────┤
│ - Course, Class, Sec  │ - Lesson & Syllabus Trees     │ - Algorithmic Paper Generator  │
│ - Department & Streams│ - Daily Homework & Classwork  │ - Online CBT Exam Engine       │
│ - Sub-45s Attendance  │ - Assignments & Notes Vault   │ - GPS Bus Live Transit Stream  │
│ - Student/Staff ID Card- Clash-Free Timetables        │ - E-Challans & Bank Slip POS   │
│ - Noticeboard Circular│ - Dynamic Marksheets & TCs    │ - Biometric Gate Turnstiles    │
└───────────────────────┴───────────────────────────────┴────────────────────────────────┘
```

### Architectural Decision Records (ADR) Summary for Future Discussions

1. **ADR-01: Synchronous vs. Asynchronous Separation (Directive 02)**
   - *Decision*: Online enrollment intake, mass report card PDF rendering, and bulk question paper generation MUST execute asynchronously via Kafka workers. The frontend receives `HTTP 202 Accepted` with a `trackingId`.
2. **ADR-02: Multi-Tenant Data Isolation (Directive 05)**
   - *Decision*: Every database table across all 13 domains MUST include `branch_id` and have PostgreSQL Row-Level Security (RLS) enabled. Queries must execute within `TenantBranchContext`.
3. **ADR-03: Offline-First Mobile Strategy (Directive M-01)**
   - *Decision*: Native mobile apps MUST maintain local SQLite/Room/SwiftData caches for timetables, homework briefs, and attendance records, synchronizing via background workers.
4. **ADR-04: Strict Zero Emoji Compliance**
   - *Decision*: All UI elements, system notifications, database seed records, and PDF templates across all 13 domains MUST strictly utilize Google Material Symbols Outlined exclusively. Zero emoji characters allowed.

---

## 3. Data Models & Database Schemas (Neon PostgreSQL RLS)

```sql
-- 1. Academic Classes & Sections
CREATE TABLE academic_classes (
    id VARCHAR(64) PRIMARY KEY,
    branch_id VARCHAR(64) NOT NULL,
    class_name VARCHAR(100) NOT NULL,
    stream VARCHAR(50) DEFAULT 'GENERAL',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE academic_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY class_branch_isolation ON academic_classes
    FOR ALL USING (branch_id = current_setting('app.current_branch_id'));

-- 2. Lesson Plans & Topics
CREATE TABLE lesson_topics (
    id VARCHAR(64) PRIMARY KEY,
    branch_id VARCHAR(64) NOT NULL,
    subject_id VARCHAR(64) NOT NULL,
    lesson_title VARCHAR(255) NOT NULL,
    topic_title VARCHAR(255) NOT NULL,
    learning_objectives TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE lesson_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY topic_branch_isolation ON lesson_topics
    FOR ALL USING (branch_id = current_setting('app.current_branch_id'));

-- 3. Question Bank Master Repository
CREATE TABLE question_bank (
    id VARCHAR(64) PRIMARY KEY,
    branch_id VARCHAR(64) NOT NULL,
    subject_id VARCHAR(64) NOT NULL,
    chapter_name VARCHAR(255) NOT NULL,
    blooms_level VARCHAR(50) NOT NULL, -- REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE
    difficulty_tier VARCHAR(20) NOT NULL, -- EASY, MEDIUM, HARD
    question_type VARCHAR(30) NOT NULL, -- MCQ, TRUE_FALSE, SHORT_ANSWER, LONG_DESCRIPTIVE
    question_text TEXT NOT NULL,
    answer_key TEXT NOT NULL,
    marks_weighting NUMERIC(5,2) DEFAULT 1.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE question_bank ENABLE ROW LEVEL SECURITY;
CREATE POLICY qbank_branch_isolation ON question_bank
    FOR ALL USING (branch_id = current_setting('app.current_branch_id'));
```

---

## 4. REST API Contract Endpoints

| Domain | HTTP Method & Route | Payload / Query Parameters | Response | Description |
|:---|:---|:---|:---:|:---|
| **Enrollment** | `POST /api/v1/admissions/apply` | `StudentAdmissionRequestDTO` | `202 Accepted` | Async intake submission with tracking ID. |
| **Fees** | `POST /api/v1/finance/challans/generate`| `ChallanGenerationRequestDTO` | `200 OK` | Triplicate PDF e-challan with barcode. |
| **Lesson** | `POST /api/v1/academic/lessons/topics` | `TopicCreationDTO` | `201 Created` | Add topic to lesson curriculum tree. |
| **Timetable** | `POST /api/v1/academic/timetables/validate`| `TimetableDraftDTO` | `200 OK` | Real-time clash/collision audit. |
| **Attendance**| `POST /api/v1/attendance/roll-call` | `RollCallSubmissionDTO` | `200 OK` | Sub-45s batch classroom presence marking. |
| **Homework** | `POST /api/v1/academic/homework/publish` | `HomeworkPublishDTO` | `201 Created` | Multi-section assignment broadcast. |
| **Exam** | `POST /api/v1/assessment/papers/generate`| `PaperGeneratorConstraintsDTO` | `202 Accepted` | Algorithmic test paper compilation. |
| **ID Cards** | `POST /api/v1/credentials/id-cards/render`| `IdCardBatchRenderDTO` | `202 Accepted` | Batch PDF ID card generator. |
