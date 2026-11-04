---
name: smart-school-vibecode-pipeline
description: Authoritative Vibe Coding agent pipeline and execution rules for the Smart School Enterprise System. Enforces the 10 Immutable Directives, Synchronous-to-Asynchronous Bridge, Spring Boot 3 Virtual Threads, Neon PostgreSQL Row-Level Security, Kafka Canonical Event Envelope, and Institutional RBAC for Super Admin, Admin (Dean), Accountant, Receptionist, Teacher, and Librarian. Trigger whenever developing, generating, vibecoding, refactoring, or verifying backend microservices, REST APIs, or Kafka pipelines.
---

# Smart School Enterprise Vibe Coding Agent Pipeline & Rules

This document governs autonomous AI agents and pair-programmers during rapid, high-quality development ("vibecoding") of the **Smart School Enterprise Platform (SMS / LMS / SIS)**.

---

## 1. The 5-Stage Agentic Vibe Coding Pipeline

Whenever receiving a coding instruction or feature request, the agent MUST advance sequentially through these 5 pipeline stages:

```
[ STAGE 1: BOUNDARY & ROLE AUDIT ]
  │ Verify which of the 6 roles (Super Admin, Admin, Accountant, Receptionist,
  │ Teacher, Librarian) owns this feature. Identify the microservice bounded context.
  ▼
[ STAGE 2: SYNC-ASYNC DETERMINATION ]
  │ Is this a high-velocity command (IoT gate scan, fee checkout, grade publishing)?
  │ If YES -> Apply the Sync-to-Async Bridge (Return HTTP 202 Accepted + Kafka send).
  │ If NO  -> Apply direct transactional CRUD with RLS.
  ▼
[ STAGE 3: MULTI-BRANCH CONTEXT ENFORCEMENT ]
  │ Verify that 'TenantBranchContext' is inspected and propagated.
  │ Ensure PostgreSQL RLS session variable 'app.current_branch_id' is set.
  ▼
[ STAGE 4: CANONICAL EVENT & ERROR HANDLING ]
  │ If producing to Kafka, wrap payload in 'EventEnvelope<T>' with partition key.
  │ Configure consumer retry backoff and Dead Letter Queue (.dlq) target.
  ▼
[ STAGE 5: POSTMAN & CODE HARNESS VERIFICATION ]
  │ Provide the exact Postman cURL command with 'X-Branch-ID' and Bearer token
  │ to verify the feature executes cleanly.
```

---

## 2. The 10 Immutable Directives for Agents

1. **Directive 01 (Zero Raw JPA in Controllers)**: Controllers must remain ultralight. They only validate DTOs (`@Valid`), read context headers (`X-Branch-ID`), and delegate to application services.
2. **Directive 02 (Mandatory HTTP 202 on High-Throughput Ingress)**: Never perform third-party HTTP calls (SMS telcos, cloud storage, payment aggregators) inside a user-facing synchronous request. Return `HTTP 202 Accepted` with a `trackingId` and buffer to Kafka.
3. **Directive 03 (Canonical Event Envelope Only)**: Never publish naked or untyped JSON to Kafka. Every topic message MUST strictly follow `EventEnvelope<T>` containing metadata (`eventId`, `eventType`, `tenantId`, `branchId`, `correlationId`, `timestamp`).
4. **Directive 04 (Deterministic Partition Keys)**: Never publish to Kafka with a null partition key. Use `{branchId}#{studentId}` for attendance and grades, or `{tenantId}#{studentId}` for billing.
5. **Directive 05 (Database Row-Level Security)**: Operational tables (`students`, `attendance_records`, `transactional_outbox`) MUST have PostgreSQL Row-Level Security enabled. Application services must execute `SET LOCAL app.current_branch_id = ?` per transaction.
6. **Directive 06 (No Dual-Write Race Conditions)**: Use the Transactional Outbox pattern or write with `acks=all` and `enable.idempotence=true`.
7. **Directive 07 (Clean ThreadLocal Hygiene)**: Every `ThreadLocal` context access (`TenantBranchContext`) MUST be cleared in a `finally` block to prevent cross-request tenant leakage in virtual thread pools.
8. **Directive 08 (Strict Enum Typings)**: Roles, statuses, and methods MUST use Java enums (`SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `RECEPTIONIST`, `TEACHER`, `LIBRARIAN`). Zero magic strings.
9. **Directive 09 (Consumer Resilience & DLQ)**: Every `@KafkaListener` must have error handlers with 3 retries (fixed/exponential backoff). Poison-pill messages MUST divert to `.dlq` topics without blocking the partition.
10. **Directive 10 (Virtual Threads Enabled)**: Maintain `spring.threads.virtual.enabled=true` in `application.yml` for non-blocking I/O.

---

## 3. Institutional Role Authority Matrix

| Role | Permitted Actions | Prohibited Actions |
| :--- | :--- | :--- |
| **`SUPER_ADMIN`** | Provision branches, global audits, cross-campus billing. | None (Global bypass). |
| **`ADMIN`** (Dean) | Campus operations, staff supervision, campus attendance, emergency broadcast. | Modifying global school network settings. |
| **`ACCOUNTANT`** | Tuition structures, student invoices, receipts, bank payment reconciliation. | Altering student grades or attendance records. |
| **`RECEPTIONIST`** | Visitor passes, admission inquiries, postal dispatch, call logs. | Accessing fee ledgers or grading engines. |
| **`TEACHER`** | Classroom attendance, assignment grades, exam mark entries, rosters. | Financial collections or library loans. |
| **`LIBRARIAN`** | Catalog books, index ISBNs, record book issues/returns, overdue fines. | Editing grades or student enrollment status. |

---

## 4. Code Snippet Templates for Vibecoding

### Template A: Controller Ingress (HTTP 202 Accepted)
```java
@PostMapping("/scans")
public ResponseEntity<ApiResponse<Map<String, Object>>> submitScan(
        @RequestHeader(value = "X-Correlation-ID", required = false) String correlationId,
        @Valid @RequestBody AttendanceScanRequest request) {

    String trackingId = (correlationId != null) ? correlationId : UUID.randomUUID().toString();
    String branchId = TenantBranchContext.getBranchId();

    commandService.processAsync(request, trackingId, branchId);

    return ResponseEntity.status(HttpStatus.ACCEPTED).body(
        ApiResponse.success(Map.of("trackingId", trackingId, "status", "ACCEPTED"))
    );
}
```

### Template B: Canonical Kafka Producer
```java
EventEnvelope<T> envelope = EventEnvelope.<T>builder()
    .metadata(EventEnvelope.Metadata.builder()
        .eventId(UUID.randomUUID())
        .eventType("domain.event.name")
        .tenantId(tenantId)
        .branchId(branchId)
        .timestamp(Instant.now())
        .correlationId(correlationId)
        .version("1.0.0")
        .build())
    .payload(payloadDto)
    .build();

kafkaTemplate.send(topic, partitionKey, envelope);
```

---

## 5. Verification Checklist for Agents

Before completing any task, the agent MUST confirm:
- [ ] Maven builds without errors: `mvn clean compile`
- [ ] Kafka event has a valid partition key
- [ ] Role-based authorization annotation (`@PreAuthorize`) is present
- [ ] `X-Branch-ID` header is supported
- [ ] No plaintext secrets or passwords hardcoded

---

## 6. Recorded Module Blueprints (Architecture Catalog)

When generating code or scaffolding features for specific platform portals, agents MUST adhere to the recorded module blueprints in `references/`:

- **Module 01: Super Admin Command Center & Global Dashboard** ([`references/01_SUPER_ADMIN_DASHBOARD_SPEC.md`](./references/01_SUPER_ADMIN_DASHBOARD_SPEC.md))
  - Universal multi-tenant scope, bypasses RLS (`app.bypass_rls = true`).
  - 6 Sovereign Modules: Global KPI Strip, Multi-Campus Matrix & Switcher, Real-Time Gate & Attendance Telemetry, Cross-Campus Financial Hub, Personnel & Academic Governance, Infrastructure Telemetry & Emergency Lockdown.
  - Accent Token: `#8E24AA` (Royal Amethyst Purple), Google Material Symbols exclusively, ZERO emoji policy.

- **Module 02: Super Admin Sidebar & Quick Links Navigation Architecture** ([`references/02_SUPER_ADMIN_SIDEBAR_NAVIGATION_TAXONOMY.md`](./references/02_SUPER_ADMIN_SIDEBAR_NAVIGATION_TAXONOMY.md))
  - Comprehensive 34-module institutional sidebar taxonomy and quick links breakdown.
  - Organized across 9 Enterprise Functional Domains: Academic Engine, Student Lifecycle, Daily Operations/Attendance, Finance & POS, Human Resources, Logistics/Campus Services, Communications, Virtual Classrooms, and Multi-Branch Governance/Reports.
  - Strict UI standards: Ubuntu (EN) / Google Sans (KM), Google Material Symbols, ZERO emoji.

- **Module 03: Super Admin Left Sidebar Navigation Architecture & Ordering** ([`references/03_SUPER_ADMIN_LEFT_SIDEBAR_SPEC.md`](./references/03_SUPER_ADMIN_LEFT_SIDEBAR_SPEC.md))
  - Authoritative 32-item vertical accordion sequence (Front Office down to System Setting).
  - Sticky top header: `Current Session: 2026-27` and `Quick Links [grid_view]` trigger.
  - Google Material Symbols token mapping, 260px expanded / 72px mini rail, active tactile pill styling.

- **Module 04: Front Office CRUD Architecture & Slugs Specification** ([`references/04_FRONT_OFFICE_CRUD_SPEC.md`](./references/04_FRONT_OFFICE_CRUD_SPEC.md))
  - Detailed CRUD blueprints for all 7 Front Office slugs: `admission-enquiry`, `visitor-book`, `phone-call-log`, `postal-dispatch`, `postal-receive`, `complain`, and `setup-front-office`.
  - Exact modal form schemas (e.g. 12-field Admission Enquiry grid, 11-field Visitor Pass with file dropzone), criteria filters, pagination, export toolbars, PostgreSQL RLS schema, and REST API contracts.

- **Module 05: Student Information CRUD Architecture & Slugs Specification** ([`references/05_STUDENT_INFORMATION_CRUD_SPEC.md`](./references/05_STUDENT_INFORMATION_CRUD_SPEC.md))
  - Complete SIS functional blueprints for all 9 Student Information slugs: `student-details`, `student-admission`, `online-admission`, `disabled-students`, `multi-class-student`, `bulk-delete`, `student-categories`, `student-house`, and `disable-reason`.
  - Dual-query criteria search (Class+Section vs. Keyword), List/Details view switcher, 6-section comprehensive admission form (personal, academic, transport, hostel, sibling linking, fee schedules), online intake pipeline with dual status badges (`Form Status`, `Payment Status`), and disabled student archive.

- **Module 06: Fees Collection CRUD Architecture & Financial Engine Specification** ([`references/06_FEES_COLLECTION_CRUD_SPEC.md`](./references/06_FEES_COLLECTION_CRUD_SPEC.md))
  - Authoritative financial blueprints for all 11 Fees Collection slugs: `collect-fees`, `offline-bank-payments`, `search-payment`, `search-due`, `fees-master`, `quick-fees`, `fees-group`, `fees-type`, `fees-discount`, `fees-carry-forward`, and `fees-reminder`.
  - Student fee counter POS checkout, wire deposit slip verification with `Pending`/`Approved` badges, single-token `Payment ID *` receipt verifier, delinquency aging matrix, and Split 2-Column Fees Master builder with 4-way fine calculation engine (`None`, `Percentage`, `Fix Amount`, `Cumulative Per-Day`) and hierarchical grouped fee grid.

- **Module 07: Online Course (LMS) CRUD Architecture & E-Learning Specification** ([`references/07_ONLINE_COURSE_CRUD_SPEC.md`](./references/07_ONLINE_COURSE_CRUD_SPEC.md))
  - Authoritative LMS blueprints for all 7 Online Course slugs: `online-course`, `question-bank`, `offline-payment`, `course-category`, `certificate-template`, `online-course-report`, and `setting`.
  - High-visual 4-column card grid with media metrics & dual `Manage`/`Preview` actions, multi-type question bank with batch import/delete tools, student offline course cashier desk, split 2-column categories, automated certificate designer, and DRM video streaming configurations.

- **Module 08: Behaviour Records CRUD Architecture & Discipline Engine Specification** ([`references/08_BEHAVIOUR_RECORDS_CRUD_SPEC.md`](./references/08_BEHAVIOUR_RECORDS_CRUD_SPEC.md))
  - Complete conduct blueprints for all 4 Behaviour Records slugs: `assign-incident`, `incidents`, `reports`, and `setting`.
  - Class-section live student behaviour point balance ledger, master infractions & commendation taxonomy with positive/negative points, 6-report conduct hub (student rankings, inter-house cup standings, incident frequency), and student/parent rebuttal commentary settings.

- **Module 09: Multi Branch Architecture & Cross-Campus Governance Specification** ([`references/09_MULTI_BRANCH_CRUD_SPEC.md`](./references/09_MULTI_BRANCH_CRUD_SPEC.md))
  - Complete multi-tenant federation blueprints for all 3 Multi Branch slugs: `overview`, `report`, and `setting`.
  - Interactive multi-campus health matrix with 1-click "Enter Branch Context" drilldown (`X-Branch-ID`), 5 cross-branch comparative reports (Balance Sheet, Attendance Headcount, GPA Bell Curves, PTR Ratios, Asset Distribution), automated branch provisioning wizard triggering PostgreSQL RLS partition creation, and `school.platform.branch-provisioned` Kafka event envelope.

- **Module 10: Gmeet Live Classes CRUD Architecture & Virtual Classroom Specification** ([`references/10_GMEET_LIVE_CLASSES_CRUD_SPEC.md`](./references/10_GMEET_LIVE_CLASSES_CRUD_SPEC.md))
  - Complete Google Meet integration blueprints for all 5 Gmeet Live Classes slugs: `live-classes`, `live-meeting`, `live-classes-report`, `live-meeting-report`, and `setting`.
  - Cohort-scheduled live classroom management with 1-click "Start Meet" launcher and status badges (`Awaited`, `Finished`, `Cancelled`), internal staff video conference scheduler with participant roster modal, granular participant attendance audit logs with auto-calculated duration minutes, and Google OAuth2 API client credential configuration.

- **Module 11: Zoom Live Classes CRUD Architecture & Video Telephony Specification** ([`references/11_ZOOM_LIVE_CLASSES_CRUD_SPEC.md`](./references/11_ZOOM_LIVE_CLASSES_CRUD_SPEC.md))
  - Complete Zoom Video Communications integration blueprints for all 5 Zoom Live Classes slugs: `live-meeting`, `live-classes`, `live-classes-report`, `live-meeting-report`, and `setting`.
  - Dual execution architecture supporting embedded zero-install Zoom Web SDK (`Web`) and native app deep-link protocol (`Zoom App` via `zoommtg://`), teacher personal API credential mapping (`zoom_teacher_credentials`), cohort virtual classroom scheduler with multi-section targeting, automated student and staff attendance duration calculation via Zoom Webhooks, and OAuth2 Server-to-Server credential authorization engine.

- **Module 12: Income CRUD Architecture & Financial Accounting Specification** ([`references/12_INCOME_CRUD_SPEC.md`](./references/12_INCOME_CRUD_SPEC.md))
  - Complete institutional revenue accounting blueprints for all 3 Income slugs: `add-income`, `search-income`, and `income-head`.
  - Split 2-column intake form (Income Head, Name, Invoice Number, Date, Amount, File Dropzone, Description) paired with a real-time revenue ledger, dual-query search engine (Period selector vs. Keyword query) with empty-state recovery, Chart of Accounts classification with seeded system categories (`Donation`, `Rent`, `Miscellaneous`, `Book Sale`, `Uniform Sale`), and `school.finance.income-recorded` Kafka audit pipeline.

- **Module 13: Expenses CRUD Architecture & Expenditure Management Specification** ([`references/13_EXPENSES_CRUD_SPEC.md`](./references/13_EXPENSES_CRUD_SPEC.md))
  - Complete operational expenditure and procurement blueprints for all 3 Expenses slugs: `add-expense`, `search-expense`, and `expense-head`.
  - Split 2-column disbursement intake form with date pre-population and voucher dropzone paired with an outflow ledger, dual-query period vs. keyword search engine with dynamic expense summary aggregation, Chart of Accounts classification with seeded system categories (`Stationery Purchase`, `Electricity Bill`, `Telephone Bill`, `Miscellaneous`, `Flower`), and `school.finance.expense-recorded` Kafka audit pipeline.

- **Module 14: QR Code Attendance CRUD Architecture & IoT Gate Ingress Specification** ([`references/14_QR_CODE_ATTENDANCE_CRUD_SPEC.md`](./references/14_QR_CODE_ATTENDANCE_CRUD_SPEC.md))
  - Complete IoT turnstile and badge verification blueprints for both QR Code Attendance slugs: `attendance` and `setting`.
  - Dual-mode hardware ingress supporting Camera-based optical WebRTC decoding (`environment` vs. `user` sensor) and Sensor-based USB HID/Bluetooth keyboard wedge barcode guns, real-time student profile display card with audio frequency feedback (880 Hz chime / 220 Hz buzz), 5-minute in-memory anti-passback de-duplication, sub-second edge acknowledgment (HTTP 202 Accepted), and `school.attendance.qr-scanned` Kafka telemetry envelope.

- **Module 15: CBSE Examination CRUD Architecture & Board Assessment Specification** ([`references/15_CBSE_EXAMINATION_CRUD_SPEC.md`](./references/15_CBSE_EXAMINATION_CRUD_SPEC.md))
  - Complete Central Board standardized assessment blueprints for all 8 CBSE Examination slugs: `exam`, `exam-schedule`, `print-marksheet`, `template`, `assign-observation`, `admit-card`, `reports`, and `setting`.
  - Full assessment lifecycle management with 7-action control strip (Classes, Roll Numbers, Timetable, Notifications, Edit, Marks Entry, Delete), stacked exam schedule cards with room allocations, batch marksheet printing criteria filter, visual marksheet layout builder with preview modes, co-scholastic observations and parameter setup, hall ticket (admit card) designer, Subject and Template Marks analytics, and vertical tabbed configuration engine (`Exam Category`, `Exam Grade`, `Assessment`, `Term`).

- **Module 16: Examinations CRUD Architecture & Universal Assessment Specification** ([`references/16_EXAMINATIONS_CRUD_SPEC.md`](./references/16_EXAMINATIONS_CRUD_SPEC.md))
  - Complete universal institutional examination blueprints for all 9 Examinations slugs: `exam-group`, `exam-schedule`, `exam-result`, `design-admit-card`, `print-admit-card`, `design-marksheet`, `print-marksheet`, `marks-grade`, and `marks-division`.
  - Multi-engine grading architecture supporting 5 evaluation schemes (Pass/Fail, School-Based Letter Grades, College CGPA, GPA 4.0/5.0, and Average Passing), multi-room timetable scheduler with min/max marks thresholds, 5-tier cascading search filters (`Exam Group`, `Exam`, `Session`, `Class`, `Section`), visual Admit Card and Marksheet designers with asset dropzones and active radio selection, and `school.assessment.exam-published` Kafka event pipeline.

- **Module 17: Attendance CRUD Architecture & Student Daily Presence Specification** ([`references/17_ATTENDANCE_CRUD_SPEC.md`](./references/17_ATTENDANCE_CRUD_SPEC.md))
  - Complete daily presence and leave tracking blueprints for all 3 Attendance slugs: `student-attendance`, `approve-leave`, and `attendance-by-date`.
  - High-velocity bulk roll-call register with 5-choice status marking (Present, Late, Absent, Half Day, Holiday) and fast-fill tools (`Set All Present`, `Mark As Holiday`), medical/personal leave approval ledger with staff audit verification, date-centric attendance matrix with presence percentage calculations, and `school.attendance.student-absent-notified` Kafka notification envelope.

- **Module 18: Online Examinations CRUD Architecture & CBT Assessment Specification** ([`references/18_ONLINE_EXAMINATIONS_CRUD_SPEC.md`](./references/18_ONLINE_EXAMINATIONS_CRUD_SPEC.md))
  - Complete Computer-Based Testing (CBT) and assessment blueprints for both Online Examinations slugs: `online-exam` and `question-bank`.
  - Dual-tab upcoming vs closed exam list, comprehensive 7-button action strip (View, Assign Students, Add Questions, Edit, Evaluate Submissions, Exam Report, Delete), 6-tier question repository search matrix, multi-format question engine (Single Choice, Multiple Choice, True/False, Descriptive) with inline option keys, and high-velocity CBT ingress via `school.assessment.cbt-exam-submitted` Kafka event pipeline.

- **Module 19: Academics CRUD Architecture & Timetable Specification** ([`references/19_ACADEMICS_CRUD_SPEC.md`](./references/19_ACADEMICS_CRUD_SPEC.md))
  - Complete institutional academic hierarchy blueprints for all 8 Academics slugs: `class-timetable`, `teachers-timetable`, `assign-class-teacher`, `promote-students`, `subject-group`, `subjects`, `class`, and `sections`.
  - Weekly Monday-Saturday period schedule grids with zero-collision validation, instructor teaching load analytics, multi-staff class teacher allocations, session-to-session bulk student promotion register with Pass/Fail and status handling (`school.academic.students-promoted`), and curriculum subject tracks with multi-section bindings.

- **Module 20: Annual Calendar CRUD Architecture & Institutional Events Specification** ([`references/20_ANNUAL_CALENDAR_CRUD_SPEC.md`](./references/20_ANNUAL_CALENDAR_CRUD_SPEC.md))
  - Complete institutional calendar and event blueprints for both Annual Calendar slugs: `annual-calendar` and `holiday-type`.
  - Master event ledger with date intervals, categorical event taxonomy, staff authorship tracking, public website calendar synchronization (`show_on_front_site`), and protected system-seeded holiday types with action suppression.

- **Module 21: Lesson Plan CRUD Architecture & Curriculum Progress Specification** ([`references/21_LESSON_PLAN_CRUD_SPEC.md`](./references/21_LESSON_PLAN_CRUD_SPEC.md))
  - Complete curriculum planning and syllabus tracking blueprints for all 5 Lesson Plan slugs: `copy-old-lessons`, `manage-lesson-plan`, `manage-syllabus-status`, `lesson`, and `topic`.
  - Cross-session deep cloning engine (`school.curriculum.lessons-cloned`), weekly teacher lesson delivery matrix, granular topic completion trees with progress meters, and dynamic `+ Add More` multi-row array intake forms for rapid lesson and topic authoring.

- **Module 22: Human Resource CRUD Architecture & Staff Management Specification** ([`references/22_HUMAN_RESOURCE_CRUD_SPEC.md`](./references/22_HUMAN_RESOURCE_CRUD_SPEC.md))
  - Complete workforce identity, compensation, and attendance blueprints for all 10 Human Resource slugs: `staff-directory`, `staff-attendance`, `payroll`, `approve-leave-request`, `apply-leave`, `leave-type`, `teachers-rating`, `department`, `designation`, and `disabled-staff`.
  - Visual 4-column profile cards with institutional role & designation badges, daily staff roll-call registers, monthly compensation and payslip generators (`school.finance.payroll-generated`), fractional/half-day leave calculation engines (`Approved`, `Pending`, `Disapproved`), and organizational department/designation taxonomies.

- **Module 23: Communicate CRUD Architecture & Omnichannel Dispatch Specification** ([`references/23_COMMUNICATE_CRUD_SPEC.md`](./references/23_COMMUNICATE_CRUD_SPEC.md))
  - Complete omnichannel messaging and broadcast notification blueprints for all 8 Communicate slugs: `notice-board`, `send-email`, `send-sms`, `email-sms-log`, `schedule-email-sms-log`, `login-credentials-send`, `email-template`, and `sms-template`.
  - Notice board bulletins with role audience targeting, 4-mode campaign composer (`Group`, `Individual`, `Class`, `Today's Birthday`), DLT-compliant SMS gateway with real-time char counter, transmission audit trails, automated student/parent credential delivery desk, and high-velocity dispatch via `school.communicate.email-dispatched` and `school.communicate.sms-dispatched` Kafka pipelines.

- **Module 24: Download Center CRUD Architecture & Digital Asset Management Specification** ([`references/24_DOWNLOAD_CENTER_CRUD_SPEC.md`](./references/24_DOWNLOAD_CENTER_CRUD_SPEC.md))
  - Complete institutional digital asset repository blueprints for all 4 Download Center slugs: `upload-share-content`, `content-share-list`, `video-tutorial`, and `content-type`.
  - Dual-view asset browser (3-column card grid vs. data table) with real-time storage quota widget (`Total Documents: 40`, `Size: 2.93 MB`), time-bounded transmission audit ledger (`Valid Upto`), 6-column multimedia video tutorial gallery with responsive 16:9 thumbnails and multi-tier filters, and Split 2-Column Content Type master taxonomy.

- **Module 25: Homework CRUD Architecture & Academic Task Evaluation Specification** ([`references/25_HOMEWORK_CRUD_SPEC.md`](./references/25_HOMEWORK_CRUD_SPEC.md))
  - Complete assignment lifecycle and grading blueprints for both Homework slugs: `add-homework` and `daily-assignment`.
  - Dual-tab assignment lifecycle management (`Upcoming Homework` vs. `Closed Homework`) with cohort-level evaluation modal, strict 5-tier mandatory criteria filter card (`Class *`, `Section *`, `Subject Group *`, `Subject *`, `Date *`), individual student digital submission inspection desk, and high-velocity grading batch ingress via `school.academic.homework-evaluated` Kafka pipeline.

- **Module 26: Library CRUD Architecture & Circulation Management Specification** ([`references/26_LIBRARY_CRUD_SPEC.md`](./references/26_LIBRARY_CRUD_SPEC.md))
  - Complete physical book inventory and circulation blueprints for all 4 Library slugs: `book-list`, `issue-return`, `add-student`, and `add-staff-member`.
  - Comprehensive physical catalog ledger with real-time stock counters (`Qty` vs. `Available`) and unit pricing, member circulation desk with loan duration and fine enforcement, class student membership card provisioning, and faculty membership register with dual-state visual highlighting (soft pastel green rows for active members vs. white rows for unenrolled staff with 1-click `+ Enroll` action).

- **Module 27: Inventory CRUD Architecture & Warehouse Logistics Specification** ([`references/27_INVENTORY_CRUD_SPEC.md`](./references/27_INVENTORY_CRUD_SPEC.md))
  - Complete asset acquisition, depot warehousing, vendor directory, and equipment loan blueprints for all 6 Inventory slugs: `issue-item`, `item-stock`, `item`, `item-category`, `item-store`, and `item-supplier`.
  - Equipment issuance desk with interactive red tactile button `Click To Return` triggering real-time stock replenishment and transitioning to green `Returned`, Split 2-Column stock intake form with purchase pricing and invoice dropzone, master catalog with live `Available Quantity` counters across 12 default asset lines, and category/store/supplier master taxonomies.

- **Module 28: Student CV CRUD Architecture & Portfolio Generation Specification** ([`references/28_STUDENT_CV_CRUD_SPEC.md`](./references/28_STUDENT_CV_CRUD_SPEC.md))
  - Complete academic portfolio and curriculum vitae generation blueprints for both Student CV slugs: `student-cv` and `student-cv-setting`.
  - Top-tier criteria filter card with dedicated purple `Setting` action button, student roster portfolio generation desk (Generate, View, Print CV), configurable institutional section toggle matrix (Personal Profile, Academic Progress, Attendance %, Disciplinary Points, Co-Curricular, Skills, Digital Crest/Seal, Dean Signature), and high-velocity batch compilation via `school.academic.student-cv-generated` Kafka pipeline.

- **Module 29: Transport CRUD Architecture & Fleet Logistics Specification** ([`references/29_TRANSPORT_CRUD_SPEC.md`](./references/29_TRANSPORT_CRUD_SPEC.md))
  - Complete transit network, vehicle fleet, and recurring student transit billing blueprints for all 7 Transport slugs: `fees-master`, `pickup-point`, `routes`, `vehicles`, `assign-vehicle`, `route-pickup-point`, and `student-transport-fees`.
  - 12-month transit fee schedule with mass copy trigger (`[ ] Copy First Fees Detail For All Months`) and 3-way fine calculation (`None`, `Percentage`, `Fix Amount`), high-precision GPS geofencing (14 decimal places) with coordinate map viewers, commercial driver registry and fleet capacity allocation, route-to-pickup sequence ordering with transit distances and morning/evening pickup times, and student transport fee collection with fine rules and receipt generation via `school.transport.fare-collected` Kafka audit pipeline.

- **Module 30: Hostel CRUD Architecture & Boarding Facilities Specification** ([`references/30_HOSTEL_CRUD_SPEC.md`](./references/30_HOSTEL_CRUD_SPEC.md))
  - Complete dormitory boarding and residential quarter blueprints for all 3 Hostel slugs: `hostel-rooms`, `room-type`, and `hostel`.
  - Split 2-column room inventory manager with bed count and periodic tariffs (`Cost Per Bed`), room classification taxonomy (`One Bed`, `Two Bed AC`, `Two Bed`, `One Bed AC`, `combine bed`), building facility registration with gender residency partitioning (`Boys`, `Girls`, `Combine`), campus address mapping, intake capacity constraints, and `school.hostel.room-provisioned` Kafka telemetry envelope.

- **Module 31: Certificate CRUD Architecture & Credential Design Specification** ([`references/31_CERTIFICATE_CRUD_SPEC.md`](./references/31_CERTIFICATE_CRUD_SPEC.md))
  - Complete institutional credentialing, formal academic certifications, and identity badge blueprints for all 7 Certificate slugs: `transfer-certificate`, `student-certificate`, `generate-certificate`, `student-id-card`, `generate-id-card`, `staff-id-card`, and `generate-staff-id-card`.
  - Formal statutory School Leaving Transfer Certificate clearance engine, visual certificate designer with 20+ dynamic token interpolations (`[name]`, `[dob]`, `[admission_no]`), dimensional bounding constraints (header/footer/body height & width in mm/pt), background watermark uploader, student/staff ID badge designers with field visibility switches, dual layout modes (Horizontal vs. Vertical), barcode/QR code integration, and high-velocity batch PDF rendering via `school.certificate.issued` Kafka audit pipeline.

- **Module 32: Front CMS CRUD Architecture & Public Portal Management Specification** ([`references/32_FRONT_CMS_CRUD_SPEC.md`](./references/32_FRONT_CMS_CRUD_SPEC.md))
  - Complete public portal, institutional marketing, and website content blueprints for all 7 Front CMS slugs: `event`, `gallery`, `news`, `media-manager`, `pages`, `menus`, and `banner-images`.
  - Public events manager with date ranges and venues, photo album gallery registry, editorial news releases, centralized media hub with dual-ingress uploader (local file dropzone or YouTube embed link) and 6-column fluid responsive grid, custom CMS page builder with immutable system-protected core page safeguards (suppressing delete on `Home`, `Complain`, `404`, `Contact us`), dual-menu navigation builder (`Main Menu` vs `Bottom Menu`) with multi-tier nested drag-and-drop sortable hierarchy trees (e.g. `ACADEMICS` with 13 sub-items), and homepage carousel banner manager via `school.frontcms.page-updated` Kafka pipeline.

- **Module 33: Alumni CRUD Architecture & Graduate Relations Specification** ([`references/33_ALUMNI_CRUD_SPEC.md`](./references/33_ALUMNI_CRUD_SPEC.md))
  - Complete graduate records, alumni directory, and reunion scheduling blueprints for both Alumni slugs: `manage-alumni` and `events`.
  - Dual-engine alumni search matrix (Pass Out Session / Class / Section cohort selector vs. direct Admission Number lookup), graduate professional directory tracking, and split-screen reunion event planner featuring an interactive monthly calendar grid paired with an event ledger and cohort-targeted reunion scheduler via `school.alumni.event-scheduled` Kafka telemetry pipeline.

- **Module 34: Reports CRUD Architecture & Enterprise Analytics Specification** ([`references/34_REPORTS_CRUD_SPEC.md`](./references/34_REPORTS_CRUD_SPEC.md))
  - Comprehensive business intelligence, statutory compliance, audit, and analytical blueprints covering all 15 institutional reporting areas: `student-information` (13 reports), `finance` (15 reports), `attendance` (7 reports), `examinations`, `online-examinations` (Result, Exams, Student Attempt, Rank reports), `lesson-plan`, `human-resource`, `homework`, `library`, `inventory`, `transport`, `hostel`, `alumni`, `user-log`, and `audit-trail-report`.
  - Top-tier 3-column categorical report directories, online examination result analytics with attempt tracking and criteria filtering, security authentication log audits (IP, user-agent, session timestamps), and enterprise entity mutation tracking via `school.reports.generated` Kafka pipeline.

- **Module 35: System Setting CRUD Architecture & Platform Governance Specification** ([`references/35_SYSTEM_SETTING_CRUD_SPEC.md`](./references/35_SYSTEM_SETTING_CRUD_SPEC.md))
  - Authoritative platform control plane, institutional configuration, and security governance blueprints covering all 25 System Setting slugs: `general-setting` (with inner 14-tab sub-menu: Logo, Login Page Background, Backend Theme, Mobile App, Student/Guardian Panel, Fees, ID Auto Generation, Attendance Type, Google Drive, Whatsapp, Chat, Maintenance, Miscellaneous), `session-setting` (14 academic sessions matrix), `notification-setting`, `whatsapp-messaging` (Meta Official vs Twilio), `sms-setting` (12 international gateways), `email-setting`, `payment-methods`, `print-header-footer`, `thermal-print`, `front-cms-setting`, `roles-permissions`, `backup-restore`, `languages`, `currency`, `addons`, `users` (staff/student/parent user account governance), `modules`, `custom-fields`, `captcha-setting`, `system-fields`, `student-profile-update`, `online-admission`, `file-types`, `sidebar-menu`, and `system-update`.
  - Comprehensive school identity, session lifecycle management, multi-channel notification dispatchers (Email, SMS, WhatsApp, Push), payment gateway credential store (Stripe, PayPal, ABA PayWay, Wing Bank), letterhead designer, POS thermal printer configuration, granular RBAC permission matrix (34 modules x View/Add/Edit/Delete actions), disaster recovery database backup/restore engine, dynamic user-defined custom fields constructor, and OTA platform updates via `school.system-settings.updated` Kafka telemetry pipeline.

- **Module 36: Super Admin Login Sequence, First-View Landing & Sticky Agent Workflow** ([`references/36_SUPER_ADMIN_LOGIN_AND_STICKY_WORKFLOW_SPEC.md`](./references/36_SUPER_ADMIN_LOGIN_AND_STICKY_WORKFLOW_SPEC.md))
  - Authoritative entry sequence, multi-tenant JWT claims, and initial redirect to `/admin/dashboard`.
  - First-view landing architecture: Top sticky bar, Left sticky sidebar rail (260px expanded / 72px mini-rail with 32 accordion menus), Tier 1 Daily KPI Strip (6 cards), Tier 2 Analytical Charts & Gauges (4 tiles), Tier 3 Operational Multi-Bar Overviews (4 cards), and Tier 4 Headcount & Balance Counters (10 cards).
  - The 7 Core Sovereign Capabilities: Multi-Branch Federation, Global RLS Bypass (`app.bypass_rls = true`), Academic Session Master (`2026-27`), Central Financial Clearinghouse, Platform Governance, Institutional RBAC, and Security Telemetry Control.
  - The 5-Stage Sticky Skill Agent Workflow for developing and verifying Super Admin features.

- **Module 37: Super Admin Master Menu & Navigation Taxonomy Specification** ([`references/37_SUPER_ADMIN_MASTER_MENU_TAXONOMY_SPEC.md`](./references/37_SUPER_ADMIN_MASTER_MENU_TAXONOMY_SPEC.md))
  - Complete master navigation directory detailing all 32 left sidebar accordion menus, 180+ direct child slugs, 5 top header controls, 5-column Quick Links megamenu, and 14 General Setting sub-tabs.
  - Authoritative foundation for transitioning to subordinate institutional roles (Campus Dean/Admin, Teacher, Accountant, Receptionist, Librarian, Student, Parent).

- **Module 38: Admin Portal Master Menu Flow & Panel Specification** ([`references/38_ADMIN_PORTAL_MASTER_MENU_FLOW_AND_PANEL_SPEC.md`](./references/38_ADMIN_PORTAL_MASTER_MENU_FLOW_AND_PANEL_SPEC.md))
  - Complete operational navigation flow list for Campus Dean & Branch Admin (`ADMIN`) across all 34 modules and 180+ submenus.
  - Step-by-step screen interaction flow list: Zone 1 Criteria Filters, Zone 2 View Switchers (List vs. Details), Zone 3 Data Tables with empty state recovery.
  - Live Admin Dashboard visual telemetry: 6 horizontal KPI progress meters (Fees Awaiting Payment, Staff Approved Leave, Student Approved Leave, Converted Leads, Staff Present Today, Student Present Today) and 4 financial analytics charts (Daily Collection/Expense dual-bar, Monthly Income donut, Annual Session Spline, Monthly Expense donut).
  - PostgreSQL Row-Level Security campus partitioning (`TenantBranchContext.getBranchId()`) and distinction matrix vs. Super Admin.

- **Module 39: Teacher Portal Master Menu Flow & Panel Specification** ([`references/39_TEACHER_PORTAL_MASTER_MENU_FLOW_AND_PANEL_SPEC.md`](./references/39_TEACHER_PORTAL_MASTER_MENU_FLOW_AND_PANEL_SPEC.md))
  - Complete instructional navigation flow list for Faculty & Classroom Teachers (`TEACHER`) across 19 permitted modules and 78 submenus.
  - Comprehensive architectural isolation matrix: 15 modules strictly restricted (Zero access to Fees, Income, Expenses, Front Office, HR Payroll, Inventory, Transport, Hostel, CMS, Alumni, Student CV).
  - Teacher Persona LMS & Course Creator suite (4-column course card grid, lecture videos, curriculum builder, student attempt reports).
  - Class-scoped attendance roll call, homework authoring & grading desk, CBT exam question authoring, student behavior point ledgers.
  - Academic Cobalt Blue brand styling (`#2563EB`) and dual-partitioning RLS (`app.current_branch_id = ?` AND `app.current_staff_id = ?`).

- **Module 69: Mobile Apps Ecosystem Architecture Specification** ([`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md`](./references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md))
  - Native cross-platform mobile client architecture across 3 primary roles: Student/Parent App (9 features), Teacher App (9 features), and Trustee/Principal Executive App (6 features).
  - Offline-first cache engine (SQLite/Room/SwiftData), FCM/APNs push notification delivery, camera document scanner with edge detection, real-time MQTT/WebSocket transit bus telemetry, and biometric authentication.

- **Module 70: Target Organisations & Multi-Institutional Classification Specification** ([`references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md`](./references/70_TARGET_ORGANISATIONS_AND_MULTI_INSTITUTION_CLASSIFICATION_SPEC.md))
  - Polymorphic institutional tenant model supporting 6 organizational archetypes and 33 subtypes (Schools, Colleges, Govt Bodies, Universities, Specialized Institutes, Distance Education).
  - Enterprise AWS Cloud deployment (Multi-AZ RDS Aurora PostgreSQL, VPC Peering, ECS/EKS Fargate, CloudFront edge delivery, and S3 lifecycle archiving).

- **Module 71: Financial Accounting Analytics & Advanced Reporting Specification** ([`references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md`](./references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md))
  - Real-time visual telemetry gauges (Fees Head-Wise stacked bars, collection timeline histograms, subject/exam comparative bars, fee recovery donuts, daily presence/leave, and gender-disaggregated attendance gauges).
  - Triplicate e-challan generation with machine-readable barcodes, bank remittance slip verification queue, double-entry general ledger (P&L, Balance Sheet, Trial Balance), and advanced campus logistics (PTM, student pickup, security gate turnstiles).

- **Module 72: Enterprise Stakeholder Benefits, Examination Engine & HRM Blueprint** ([`references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md`](./references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md))
  - 24 Enterprise Value Metrics across Management (50% admin & 70% paper cost reduction), Teachers (algorithmic test generator, auto-marksheet), and Students/Parents (real-time telemetry, e-challans).
  - Examination Management Suite (8 modules: manual exams, grading/ranking rules, CBT practice, question banks, proctors, paper generators, longitudinal reports).
  - Human Resource Management Suite (8 modules: recruitment ATS, performance evaluations, biometric time & attendance, leave history, L&D modules, talent succession planning, and HR predictive analytics).

- **Module 73: Integrated Academic Operations & Campus Lifecycle Specification** ([`references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md`](./references/73_INTEGRATED_ACADEMIC_OPERATIONS_AND_CAMPUS_LIFECYCLE_SPEC.md))
  - Master 13-domain core educational operations hub: Online Enrollment & Fee Payment, Course/Class/Section, Lesson/Syllabus Plans, Clash-Free Timetables, Attendance & GPS Tracking, Daily Homework & Notes, Certificates & Marksheets, Circulars, CBT Exams, Question Paper Generator, Departments & Streams, Student/Staff ID Badges.
  - Phased implementation roadmap (Phase 1 Foundations, Phase 2 Advanced Instruction, Phase 3 Enterprise Automation) and Architectural Decision Records (ADRs) for future engineering discussions.

- **Module 74: Master Flow Alignment & Design-Readiness Specification** ([`references/74_MASTER_FLOW_ALIGNMENT_AND_DESIGN_READINESS_SPEC.md`](./references/74_MASTER_FLOW_ALIGNMENT_AND_DESIGN_READINESS_SPEC.md))
  - The definitive 10-step institutional lifecycle flow alignment connecting all 47 modules and 495 features into a contiguous operational journey.
  - Comprehensive Design-Readiness Audit Matrix confirming 100% readiness across 7 Layout Archetypes (A through G), the 26 Master UI Components, Liquid Glass Design DNA tokens, REST API contracts, and PostgreSQL Row-Level Security entities.

- **Module 75: Enterprise School Types, CIS Accreditation & Global Ecosystem Specification** ([`references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md`](./references/75_ENTERPRISE_SCHOOL_TYPES_CIS_ACCREDITATION_AND_ECOSYSTEM_SPEC.md))
  - Authoritative architecture for 4 School Types (Groups/Enterprise, Independent Private K-12, International Multi-Curriculum, Virtual/Online K-12) and 5 Institutional Department Hubs (Administration Dept 503, Academics, HR, Finance, Teaching).
  - Codifies the 6 Core Value Pillars, 10 Modular Products (MIS/SIS Core, Automated Admissions, Data & Analytics BI, Omnichannel Messaging, Compliance & Child Safeguarding, Finance & Accounting, HR & Payroll, Payments & Remittance, Wellbeing & Pastoral Care, Integrations & Open APIs).
  - Embeddable web component `<school-enrolment-widget>` for school websites, CIS accreditation safeguarding, Identity SSO portal, and global Developer/Partner ecosystem.

- **Module 76: Genius Cloud AWS Infrastructure & Enterprise ERP Specification** ([`references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md`](./references/76_GENIUS_CLOUD_AWS_INFRASTRUCTURE_AND_ENTERPRISE_ERP_SPEC.md))
  - Authoritative 8-Tier AWS Infrastructure Topology (ECS Fargate App/API, Multi-AZ RDS PostgreSQL RLS, S3 File Vault, Automated Backup with RPO < 5m & RTO < 15m, Application Load Balancers, TLS 1.3 ACM, and CloudFront CDN with WAF Layer-7 protection).
  - Codifies the 14 Core ERP Modules, the expanded 42+ dynamic role matrix with "LOGIN WITH GROUP ADMIN AND INSTITUTE" federation, and granular Genius Cloud submodules (GR reports, absent teacher proxy scheduling, touchscreen Canteen POS with weekly meals, Contract Management, 8-directional attendance punctuality telemetry, and transit fee bank reconciliation).

- **Module 77: Genius Cloud Granular Submodules Specification** ([`references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md`](./references/77_GENIUS_CLOUD_FINANCE_EXAMS_PAYROLL_AND_CAMPUS_OPERATIONS_SPEC.md))
  - Authoritative granular architecture covering Advanced Double-Entry Financial Books (Day Book, Cash/Bank Books, GL, Trial Balance, P&L, Balance Sheet, Fixed Assets, Bank Reconciliation).
  - Multi-Board Examination Engine (CBSE/CCE Scholastic & Co-Scholastic settings, ICSE Group I-III weightages, Internal Assessment IA groups, and Bloom's taxonomy algorithmic question paper generator).
  - Payroll & Faculty Incentive Suite (salary components, professional tax slabs, annual increments, festival/performance bonuses, and category-wise salary registers).
  - Granular Fee Masters (advance fee heads, wing fee books, concession profiles, late fee policies, refunds, and deleted receipt forensic auditing).
  - Campus Perimeter Safety & Store Procurement (student late arrival/early departure gate passes, visitor photo logs, store categories, departmental requisitions, supplier PO dispatch, and IT help desk).

- **Module 78: Cambodia EdTech Ecosystem & Localized SMS Specification** ([`references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md`](./references/78_CAMBODIA_EDTECH_ECOSYSTEM_AND_LOCALIZED_SMS_SPEC.md))
  - Comprehensive What/Why/Where/How architectural framework across 5 core operational domains: Academic Management, Student Management, Logistics (Transportation/Library/Hostel), Exam Management, and Payroll & Finance.
  - Full operational modeling for 4 Cambodian educational tiers: School (K-12 MoEYS curriculum), College (TVET & undergraduate diplomas), Institute (specialized technical & vocational), and University (higher education degree audits & CATS credit transfers).
  - City Distributor Support Network: SLA-backed on-site implementation, localized hardware dispatch, and in-person staff training hubs across 5 major economic corridors (Phnom Penh, Siem Reap, Battambang, Sihanoukville, Kampong Cham).
  - Dual-currency financial engine supporting KHR Riel (`៛`) and USD (`$`), National Bank of Cambodia Bakong KHQR EMVCo QR settlement, ABA PayWay, Wing Bank, and the Three-Font typographic standard (Ubuntu, Google Sans Khmer with `\u200B` zero word-breakage, and Moul formal diplomas).

- **Module 79: Cambodia EdTech Multi-Tier SMS & Campus Lifecycle Specification** ([`references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md`](./references/79_CAMBODIA_EDTECH_MULTI_TIER_SMS_AND_CAMPUS_LIFECYCLE_SPEC.md))
  - Comprehensive operational blueprint organizing 45 operational feature cards across 5 tabs (Academics, Student, Logistics, Exams, Payroll & Finance).
  - 20 core subsystems: Guest Student Admissions with tracking PIN, Merit/Need-Based Scholarship Program with Donor Management & Refunds, Biometric Anti-Proxy Attendance, University Multi-Campus Timetables, Supervisor & Examiner Assignments, Dual-Currency Payroll & Financial Forecasting, Campus Health Clinic & Medication Logs, Touchscreen Canteen POS & Meal Plans, Parent-Teacher Meeting (In-Person & Virtual) Lifecycle, and Employee Recruitment ATS.
  - Deep multi-tier institutional adaptation across School, College, Institute, and University with PostgreSQL kernel Row-Level Security isolation.

- **Module 80: Master Campus Lifecycle Flow & State Machine Orchestration Specification** ([`references/80_MASTER_CAMPUS_LIFECYCLE_FLOW_AND_STATE_MACHINE_ORCHESTRATION_SPEC.md`](./references/80_MASTER_CAMPUS_LIFECYCLE_FLOW_AND_STATE_MACHINE_ORCHESTRATION_SPEC.md))
  - The authoritative 12-Stage Operational Journey mapping all 495 features and 37 domains into an event-driven lifecycle flow.
  - Codifies 6 primary Finite State Machines (Student Lifecycle, Dual-Currency Invoicing, Examination Assessment, Transport Trip Telematics, Clinic Medical Encounters, and PTM Conferences).
  - Cross-cutting enforcement of the Three-Font triad (Ubuntu, Google Sans Khmer `\u200B`, Moul), PostgreSQL kernel RLS, and the Synchronous-to-Asynchronous Kafka bridge.



- **Module 81: Commercial Subscription Tiers, Feature Gating & Expanded Enterprise Modules Specification** ([`references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md`](./references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md))
  - Authoritative 9-tier commercial SaaS subscription matrix ($100/mo to $50,000 Lifetime) with setup fees, student capacity limits (250 to Unlimited), multi-branch limits (1 to Unlimited), white-labeling, custom domain, and hourly customizations ($12/hr).
  - Spring Boot 3 `TenantEntitlementInterceptor` returning HTTP 402 Payment Required for tier-locked endpoints, and student quota hard stop returning HTTP 403 Forbidden (`STUDENT_QUOTA_EXCEEDED`).
  - Four expanded enterprise domains: CRM Management System (lead funnel & counselor routing), Stationery & Study Material Distribution (book packs, uniform sizing, clearance handshake), Newsletter & Campus Publications Desk (Khmer/English multi-column layout & multi-channel dispatch), and Database Management Services & Multi-Tenant Data Vault (WAL archiving, 35-day PITR, and bulk ZIP export).

- **Module 82: Master Navigation Slugs, Apps Suite & Predictive Risk Matrix Specification** ([`references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md`](./references/82_NAVIGATION_SLUGS_APPS_SUITE_AND_PREDICTIVE_RISK_MATRIX_SPEC.md))
  - Authoritative route slug taxonomy consolidating `/dashboard/{role}` (Admin, Teacher, Student, Parent), the integrated institutional application suite (`/apps/chat`, `/apps/call`, `/apps/calendar`, `/apps/email`, `/apps/todo`, `/apps/notes`, `/apps/file-manager`), and `/people/{entity}`.
  - Legal guardian decoupling (`/people/guardians`) separating authorized pickup delegates, emergency sponsors, and custody orders from primary billing parents.
  - Predictive student performance risk matrix (2D scatter mapping attendance % vs avg academic score) with automated early warning triggers for High Risk cohorts and Active Intervention Plans.
  - Class-wise cohort capacity distribution telemetry, Star Teacher / Top Student recognition spotlights, and keyboard-driven global spotlight command ingress (`Cmd + K`).

- **Module 83: List/Grid Views, Role-Based Detail Dossiers & Multi-Faceted Filter Specification** ([`references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md`](./references/83_LIST_GRID_VIEWS_ROLE_DOSSIERS_AND_MULTI_FACETED_FILTER_SPEC.md))
  - Universal List/Grid dual-view engine with density controls (Compact, Comfortable, Relaxed) and floating mass action bar across all master directories.
  - Polymorphic 360-degree role-based detail dossiers for Students (8 tabs), Teachers (6 tabs), Parents/Guardians (4 tabs), and Non-Teaching Staff (5 tabs).
  - Multi-parametric composable filter engine with taxonomy dropdowns, date presets, status pills, URL query sync, and user-saved filter presets.
  - Collision-free class routine and bell schedule matrix linked to syllabus pacing meters, and event-driven alert dispatcher for fee due dates, exams, and library fines.

- **Module 84: Authentication, Lock Screen, Maintenance & System Utilities Specification** ([`references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md`](./references/84_AUTHENTICATION_LOCK_SCREEN_MAINTENANCE_AND_SYSTEM_UTILITIES_SPEC.md))
  - Authentication and identity lifecycle covering multi-tenant login (`/auth/signin`), prospective student/parent self-registration (`/auth/signup`), cryptographic token dispatch (`/auth/forgot-password`), and password complexity with 5-password history exclusion (`/auth/reset-password`).
  - Idle session preservation and lock screen engine (`/auth/lock-screen`) securing in-progress form drafts after 15 min with quick PIN/biometric unlock.
  - Scheduled maintenance interceptor (`/maintenance`) returning HTTP 503 with live ETA countdown and automated health check polling auto-reload.
  - Pre-launch feature teasers (`/coming-soon`), intelligent 404 fuzzy route prediction (`/errors/404`), and RFC 7807 incident-tracked error diagnostic handling (`/errors/500`).

- **Module 85: Student Pocket Money, Facility Ticketing & RTL Dual-Theme Architecture Specification** ([`references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md`](./references/85_STUDENT_POCKET_MONEY_FACILITY_TICKETING_AND_RTL_THEME_SPEC.md))
  - Student campus and residential pocket money digital wallet (`/hostel/pocket-money`) with dual currency (USD/KHR), parent allowance deposits via Bakong KHQR, daily spend limits, and tap-to-pay RFID counter POS.
  - Campus facility maintenance trouble-ticketing (`/facilities/maintenance-tickets`) with building/room location pinning, photo evidence, technician routing, and resolution proof sign-off.
  - Native bidirectional RTL layout mirroring engine (`dir="rtl"`) for Arabic/Hebrew/Persian scripts with numerical/code LTR preservation.
  - Dual-theme Liquid Glass engine supporting Dark and Light modes with 360-degree specular rims, zero emoji enforcement, and cross-platform universal mobile deep-linking (`smartschool://`).

- **Module 86: SIMS / EMIS Architecture, QR Identity Verification & Stakeholder Mobile Ecosystem Specification** ([`references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md`](./references/86_SIMS_EMIS_AND_STAKEHOLDER_MOBILE_ECOSYSTEM_SPEC.md))
  - Dynamic QR profile scan and identity verification gateway (`/security/qr-scanner`) with cryptographic TOTP/HMAC rotation every 30 seconds, sub-250ms optical scan latency, and authorized dismissal guardian pickup matching (`/security/student-pickup`).
  - Contactless wireless presence and BLE beacon / Wi-Fi AP association telemetry ingress (`/attendance/wireless`) with RSSI proximity threshold calculation and proxy spoofing detection.
  - Macro-level EMIS statutory census reporting engine (`/reports/emis`) computing GER, NER, STR, SCR, and MoEYS/UNESCO standardized export payloads.
  - Longitudinal student lifecycle dossier and automated dropout early warning matrix (`/students/dropout-prevention`) triggering Active Intervention Plans.
  - Classroom collaboration workspaces (`/academics/group-projects`) with milestone trackers and peer rubrics, and centralized DRM digital learning media repository (`/academics/learning-resources`).
  - Unified stakeholder mobile deep-linking matrix (`smartschool://`) routing 12 student/parent modules and 10 teacher faculty modules with offline SQLite synchronization.

- **Module 87: Mobile App Class Notes Whiteboard Sync, Location Entry & Student Tracking Specification** ([`references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md`](./references/87_MOBILE_APP_CLASS_NOTES_SYNC_LOCATION_ENTRY_AND_STUDENT_TRACKING_SPEC.md))
  - Classroom whiteboard camera sync and perspective OCR ingress (`/academics/class-notes-sync`) with quad-point planar un-skewing, specular glare reduction, and lesson-topic indexing.
  - Campus location entry and role-differentiated zoned telemetry (`/facilities/location-entries`) across 9 institutional zones with occupancy counts and residential curfew roll-call (`/facilities/zone-occupancy`).
  - Interactive touch/stylus homework evaluation canvas (`/academics/homework-evaluations`) with layered vector markups, 60-second teacher voice feedback memos, and rubric grading.
  - Dynamic toggled timetable engine (`/academics/toggled-timetable`) supporting 6 runtime schedule modes and automated teacher substitution dispatch (`/academics/proxy-dispatch`).
  - Holistic 360-degree student development trajectory tracker (`/students/tracking-trajectory`) correlating cognitive, conduct, and co-curricular milestones.
  - Multi-channel in-app chat boxes (`/apps/chat-boxes`) with automated teacher office hours / quiet hours guardrails, and multi-child delegated account customizer (`/profile/customizer`).

- **Module 88: Google Material Design 3 Web & Design Token Architecture Specification** ([`references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md`](./references/88_GOOGLE_MATERIAL_DESIGN_3_WEB_AND_TOKEN_SYSTEM_SPEC.md))
  - Three-tier token architecture separating reference literals (`--md-ref-*`), semantic system roles (`--md-sys-*`), and element component properties (`--md-<comp>-*`) with fallback cascading.
  - Perceptual HCT (Hue, Chroma, Tone) color science providing algorithmic 5-palette derivation with mathematical WCAG 2.1 contrast guarantees (delta Tone >= 50 for 4.5:1).
  - Six-level tonal surface elevation (Levels 0-5), 15-scale typographic hierarchy, 7-scale corner shapes with bi-directional logical properties, 16-duration motion system, and 4-tier state layer physics (Hover 8%, Focus 12%, Pressed 12%, Dragged 16%).
  - Comprehensive Material Web (`@material/web`) Lit web components catalog, `<md-focus-ring>`, `<md-ripple>`, Google Material Symbols variable font standard, and Tailwind CSS token bindings.

- **Module 89: Material Components Web Catalog & Developer Guide Specification** ([`references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md`](./references/89_MATERIAL_COMPONENTS_WEB_CATALOG_AND_DEVELOPER_GUIDE_SPEC.md))
  - Authoritative web components catalog architecture with interactive configurator playgrounds, 12-column responsive showcase grids, and real-time DOM/code snippet generation.
  - Zero-build browser prototyping via W3C native `<script type="importmap">` resolving `@material/web/` from CDNs (esm.run) with adoptedStyleSheets typescale injection.
  - Enterprise production bundler tooling (Rollup, Vite, Webpack) with bare-specifier resolution, tree-shaking, and sub-50kB optimized bundle packaging.
  - Standardized component slot anatomy (`icon`, `leading-icon`, `trailing-icon`, `headline`, `supporting-text`, `actions`), form-associated custom element lifecycle via `ElementInternals`, and migration bridge from legacy MDC Web BEM classes to modern Material Web M3 Lit components.

- **Module 90: Google Material Design 3 (M3) Component Architecture & Taxonomy Specification** ([`references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md`](./references/90_MATERIAL_DESIGN_3_COMPONENTS_SPECIFICATION_AND_TAXONOMY.md))
  - Authoritative architecture for over 30 Material Design 3 UI primitives across Actions, Communication, Containment, Navigation, Selection, and Text Inputs.
  - Segmented buttons (single/multi-select), scroll-collapsing Extended FABs, adaptive small dot & numeric counter badges (1 to 999+), and rich multi-line contextual tooltips with action links.
  - Modal bottom sheets with drag-handle gestures reflowing into co-planar side sheets on desktop, and horizontal multi-browse carousels with snap momentum physics.
  - Docked pill search bars expanding into full-screen search view overlays, responsive Navigation Bar to Navigation Rail adaptation, collapsing Large/Medium top app bars, and dual-mode calendar date pickers with analog clock dial time pickers.

---

## 7. Automated Image-to-Text OCR & Screenshot Extraction Pipeline



The platform enforces an automated **Image-to-Text OCR and Screen Extraction Pipeline** to ingest user-uploaded UI screenshots with zero informational loss:

```
[ UPLOAD INGRESS: .user_uploaded/*.png ]
  │
  ▼
[ STAGE 1: PERMANENT STORAGE ]
  │ Copy image to permanent repository:
  │ /Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/
  ▼
[ STAGE 2: OPTICAL / VISION TEXT EXTRACTION ]
  │ Run native Tesseract OCR Engine (/usr/local/bin/tesseract) & Python parser:
  │ python3 scripts/extract_image_to_text.py <path_to_image>
  ▼
[ STAGE 3: UI ZONE CODIFICATION ]
  │ Parse Active Route, Submenu Accordion, Header Context ('Current Session: 2026-27'),
  │ Zone 1 Criteria Filters, Zone 2 View Switchers, Zone 3 Data Tables, and Action Buttons.
  ▼
[ STAGE 4: SPECIFICATION & LEDGER HYDRATION ]
  │ 1. Codify screen specifications into 'references/' architecture documents.
  │ 2. Append screenshot mapping and exact extracted text to 'references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md'.
  ▼
[ STAGE 5: GLOBAL SKILL SYNCHRONIZATION ]
  │ Mirror images, scripts, and specifications 1:1 to global agent skills:
  │ ~/.gemini/config/skills/smart-school-vibecode-pipeline/
```

### Execution Commands:
- **Batch Image-to-Text Extraction**:
  ```bash
  python3 /Users/Apple16/Desktop/skill-ibecode-pipeline/scripts/extract_image_to_text.py /Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/
  ```
- **Single Screenshot Direct OCR**:
  ```bash
  /usr/local/bin/tesseract <path_to_screenshot.png> stdout --oem 1 -l eng
  ```


---

## 8. Reusable UI Component Extractions & Layout Catalog

For front-end UI assembly, component reuse, and layout positioning, agents MUST consult the dedicated UI extractions repository:
- **Master UI Component Catalog & Panel Summary**:
  [`ui_extractions/00_MASTER_UI_COMPONENT_CATALOG_AND_PANEL_SUMMARY.md`](./ui_extractions/00_MASTER_UI_COMPONENT_CATALOG_AND_PANEL_SUMMARY.md)
- **Screen-by-Screen UI Extractions (273 Screenshots)**:
  Available in [`ui_extractions/`](./ui_extractions/) covering all 35 modules with layout positioning zones, component hierarchies, and props schemas.
