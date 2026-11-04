# Master Navigation Slugs, Apps Suite & Predictive Risk Matrix Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative route slug taxonomy, integrated institutional applications suite, legal guardian entity decoupling, and predictive student risk intelligence derived from the PreSkool Modern ERP architecture (`media_1789208594785.png` and `media_1789208661840.png`).

In accordance with the principle of lean architectural synthesis:
1. **What to Merge**: Standard directories and portal views are consolidated into clean slug hierarchies (`/dashboard/*`, `/people/*`) without duplicating baseline CRUD logic.
2. **What to Skip**: Redundant visual skinning, non-essential cosmetic wrappers, and duplicate table patterns are bypassed to keep the codebase focused on core capabilities.
3. **What to Add**: High-value operational capabilities including the integrated WebRTC calling suite, webmail client, task/todo manager, scratchpad notes, cloud file manager, legal guardian vs parent decoupling, 2D attendance-score performance risk matrix, and class-wise capacity telemetry.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             MASTER NAVIGATION SLUG & INSTITUTIONAL ROUTING TAXONOMY                    │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Slug Group        │ Sub-Route / Slug Path         │ Core Operational Domain            │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ MAIN              │ /dashboard/admin              │ Executive Admin KPI & Telemetry    │
│                   │ /dashboard/teacher            │ Faculty Timetable & Grade Queues   │
│                   │ /dashboard/student            │ Student Learning & Attendance Hub  │
│                   │ /dashboard/parent             │ Multi-Child Guardian Overview      │
│                   │ /apps/chat                    │ Direct & Channel Instant Chat      │
│                   │ /apps/call                    │ WebRTC Voice & Video Conferencing  │
│                   │ /apps/calendar                │ Unified Academic & Event Calendar  │
│                   │ /apps/email                   │ In-App Institutional Webmail       │
│                   │ /apps/todo                    │ Task Assignment & Checklist Hub    │
│                   │ /apps/notes                   │ Faculty Memos & Quick Scratchpad   │
│                   │ /apps/file-manager            │ Multi-Tenant Cloud Document Vault  │
│                   │ /layouts                      │ Boxed/Fluid Dynamic Layout Engine  │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ PEOPLE & ADMISSION│ /people/students              │ Enrolled Student Roster & SIS      │
│                   │ /people/teachers              │ Faculty Registry & Workload Matrix │
│                   │ /people/parents               │ Primary Billing & Biological Parents│
│                   │ /people/guardians             │ Legal Custody & Emergency Contacts │
│                   │ /people/staff                 │ Non-Teaching Staff Administration  │
│                   │ /people/users                 │ System User Credentials & 2FA Auth │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ INTELLIGENCE      │ /intelligence/risk-matrix     │ 2D Attendance vs Score Risk Matrix │
│                   │ /intelligence/capacity        │ Class-Wise Cohort Capacity Heatmap │
│                   │ /intelligence/spotlight       │ Star Teacher & Top Student Honors  │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Architectural Rationalization: Merge, Skip & Add Analysis

### 1.1 What to Merge
- **Multi-Role Dashboards**: Consolidate disparate portal URLs into a structured `/dashboard/{role}` namespace (`/dashboard/admin`, `/dashboard/teacher`, `/dashboard/student`, `/dashboard/parent`).
- **People Management**: Consolidate student, teacher, parent, staff, and user tables under the unified `/people/{entity}` route tree with standard pagination, sorting, and export capabilities.
- **Calendar & Events**: Merge the disparate academic term calendars, examination schedules, and institutional holiday planners into `/apps/calendar`.

### 1.2 What to Skip
- **Superficial Theme Variants**: Skip decorative color skins; adhere strictly to the platform's Liquid Glass Design DNA.
- **Duplicate Form Scaffolding**: Skip redundant creation forms where standard modal components already exist.
- **Trivial CRUD Routes**: Skip isolated single-action routes; encapsulate inline actions within parent resource grids.

### 1.3 What to Add (Novel High-Value Capabilities)
- **WebRTC Call Suite (`/apps/call`)**: Real-time peer-to-peer and SFU video conferencing for virtual parent-teacher conferences, student office hours, and remote faculty meetings.
- **Institutional Webmail (`/apps/email`)**: Embedded webmail client connected to school domain accounts (IMAP/SMTP/OAuth).
- **Task Management Engine (`/apps/todo`)**: Personal and delegated task checklist with deadlines, priority tags, and automated notifications.
- **Rich-Text Notes Scratchpad (`/apps/notes`)**: Quick memos, lesson drafting, and meeting minutes with auto-save.
- **Cloud File Manager (`/apps/file-manager`)**: Hierarchical folder system, role-based access control, file previews, and quota management.
- **Legal Guardian Entity Decoupling (`/people/guardians`)**: Explicit entity separating legal guardians, foster sponsors, emergency contacts, and authorized pickup delegates from primary fee-paying parents.
- **Student Performance Risk Matrix**: 2D scatter matrix mapping Attendance % vs Academic Average Score with automated triage into Star Zone, Low Risk, Medium Risk, and High Risk cohorts, coupled with Active Intervention Plans.
- **Class-Wise Capacity Distribution**: Structural enrollment telemetry across Pre-Primary, Primary, Middle, Secondary, and Senior levels with section density analytics.
- **Global Spotlight Command (`⌘ K`)**: Keyboard-driven instant search and quick-action launcher across all modules.

---

## 2. Integrated Application Suite (`/apps/*`)

### 2.1 WebRTC Voice & Video Calling (`/apps/call`)
- **Concept**: Embedded real-time communications enabling authenticated stakeholders to initiate encrypted voice and video sessions without third-party redirects.
- **Functional Capabilities**:
  - 1-on-1 calls (Teacher to Parent, Teacher to Student, Admin to Staff).
  - Multi-party scheduled virtual classrooms and PTM conferences.
  - Screen sharing, in-call chat, participant hand-raising, and session recording to S3 vault.
  - Integration with `/apps/calendar` for instant meeting room creation.
- **Data Entity**:
  ```sql
  CREATE TABLE institutional_calls (
      call_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID NOT NULL,
      channel_name VARCHAR(120) NOT NULL,
      call_type VARCHAR(20) NOT NULL CHECK (call_type IN ('AUDIO', 'VIDEO', 'CONFERENCE')),
      host_user_id UUID NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'INITIATED',
      scheduled_start TIMESTAMPTZ,
      actual_start TIMESTAMPTZ,
      actual_end TIMESTAMPTZ,
      recording_url TEXT,
      created_at TIMESTAMPTZ DEFAULT clock_timestamp()
  );
  ```
- **Supporting Skill**: `smart-school-system`, `smart-school-backend-services`.

### 2.2 Institutional Webmail Client (`/apps/email`)
- **Concept**: Native webmail client allowing faculty and staff to communicate via school domain email accounts (`@school.edu.kh` or `@school.org`) directly within the ERP.
- **Functional Capabilities**:
  - Unified inbox, sent, drafts, trash, and custom folders.
  - WYSIWYG composer with file attachment support linked to `/apps/file-manager`.
  - Recipient auto-complete pulling from student, parent, and staff rosters.
  - Template dispatch for standardized administrative and academic notices.
- **Supporting Skill**: `smart-school-system`, `smart-school-attendance-communication`.

### 2.3 Task & To-Do Checklist Engine (`/apps/todo`)
- **Concept**: Personal and assigned task manager for tracking administrative duties, lesson preparations, grading deadlines, and campus maintenance tasks.
- **Functional Capabilities**:
  - Task priority triage (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
  - Task delegation: Administrators can assign tasks to teachers or staff with target completion dates.
  - Checklist item breakdown within each task with real-time percentage progress.
  - Automated reminder notifications via push and email 24 hours prior to deadline.
- **Data Entity**:
  ```sql
  CREATE TABLE todo_tasks (
      task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID NOT NULL,
      creator_user_id UUID NOT NULL,
      assignee_user_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
      status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
      due_date DATE,
      completed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT clock_timestamp()
  );
  ```
- **Supporting Skill**: `smart-school-utilities-transport`, `smart-school-system`.

### 2.4 Faculty & Administrative Notes Scratchpad (`/apps/notes`)
- **Concept**: Instant cloud scratchpad for drafting informal notes, meeting minutes, student observation logs, and personal reminders.
- **Functional Capabilities**:
  - Rich text formatting (bold, italics, lists, code blocks, checklists).
  - Color-coded note categorization and sticky pin to top.
  - Tagging engine by student ID, class, or department.
  - Auto-save with debounced cloud synchronization.
- **Supporting Skill**: `smart-school-webapp-patterns`, `smart-school-system`.

### 2.5 Multi-Tenant Cloud File Manager (`/apps/file-manager`)
- **Concept**: Centralized document repository allowing departments to organize, store, and share curriculum guides, administrative circulars, and media assets.
- **Functional Capabilities**:
  - Hierarchical folder structure with departmental permission inheritance.
  - Storage quota management per user role and department.
  - Inline document preview for PDF, DOCX, XLSX, PNG, and MP4.
  - Secure temporary share links with password protection and expiry dates.
- **Data Entity**:
  ```sql
  CREATE TABLE cloud_files (
      file_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID NOT NULL,
      folder_id UUID REFERENCES cloud_files(file_id),
      is_folder BOOLEAN NOT NULL DEFAULT FALSE,
      file_name VARCHAR(255) NOT NULL,
      file_size_bytes BIGINT,
      mime_type VARCHAR(100),
      s3_key TEXT,
      owner_user_id UUID NOT NULL,
      access_level VARCHAR(20) NOT NULL DEFAULT 'DEPARTMENT',
      created_at TIMESTAMPTZ DEFAULT clock_timestamp()
  );
  ```
- **Supporting Skill**: `smart-school-backend-services`, `smart-school-facilities-operations`.

---

## 3. Legal Guardian Entity Decoupling (`/people/guardians`)

### 3.1 Domain Rationale: Decoupling Parents and Guardians
In modern educational administration, the legal guardian is frequently distinct from biological or billing parents:
- **Divorced / Separated Families**: Biological parent may pay fees, while legal guardian holds legal custody and emergency decision rights.
- **Boarding / International Students**: Students have local host family guardians or embassy sponsors authorized for campus pickup and medical consents.
- **Foster & Extended Family Care**: Grandparents, aunts, or foster carers acting as day-to-day legal guardians.

### 3.2 Functional Capabilities
- **Relationship Classification**: Legal Guardian, Foster Parent, Host Family, Grandparent, Sibling Guardian, Embassy Sponsor.
- **Pickup Authorization**: Digital gate pass badge with authorized pickup photo, biometric fingerprint hash, and dynamic 15-minute OTP release code.
- **Legal Custody Records**: Storage of verified court custody orders, restraining orders, and emergency medical proxy directives.
- **Notification Routing Matrix**: Separate toggles for billing alerts, attendance notifications, disciplinary notices, and report cards.

### 3.3 Data Model
```sql
CREATE TABLE student_guardians (
    guardian_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    full_name_latin VARCHAR(100) NOT NULL,
    full_name_khmer VARCHAR(100),
    relationship_type VARCHAR(40) NOT NULL,
    is_legal_custodian BOOLEAN NOT NULL DEFAULT FALSE,
    is_emergency_contact BOOLEAN NOT NULL DEFAULT TRUE,
    is_authorized_pickup BOOLEAN NOT NULL DEFAULT FALSE,
    national_id_passport VARCHAR(50),
    phone_primary VARCHAR(30) NOT NULL,
    phone_emergency VARCHAR(30),
    email VARCHAR(100),
    residential_address TEXT,
    photo_s3_key TEXT,
    custody_document_s3_key TEXT,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```
- **Supporting Skill**: `smart-school-student-lifecycle-features`, `smart-school-visitor-gate-passes`, `smart-school-cambodia-campus-lifecycle`.

---

## 4. Predictive Student Performance Risk Matrix & Decision Intelligence

### 4.1 2D Performance vs Attendance Risk Heatmap
The Performance Risk Matrix provides academic leaders with instant visual triage of the entire student body by cross-referencing:
- **X-Axis**: Longitudinal Attendance Rate (0% to 100%).
- **Y-Axis**: Cumulative Academic Average Score / GPA (0 to 100).

```
   100 ┌──────────────────────┬──────────────────────┐
       │     LOW RISK         │      STAR ZONE       │
       │ Moderate Attendance  │ High Attendance >85% │
       │ High Academic Score  │ High Academic Score  │
       │                      │                      │
Avg    ├──────────────────────┼──────────────────────┤
Score  │     HIGH RISK        │     MEDIUM RISK      │
       │ Low Attendance <70%  │ High Attendance >85% │
       │ Low Academic Score   │ Low Academic Score   │
       │ CRITICAL INTERVENTION│ REMEDIAL TUTORING    │
     0 └──────────────────────┴──────────────────────┘
       0                      70                    100
                         Attendance %
```

### 4.2 Four-Tier Risk Classification & Action Triggers
1. **Star Zone (High Attendance, High Score)**:
   - Criteria: Attendance >= 85%, Avg Score >= 80%.
   - Action: Eligible for Academic Honor Roll, Merit Scholarships, and Olympiad nominations.
2. **Low Risk (Healthy Cohort)**:
   - Criteria: Attendance >= 75%, Avg Score >= 60%.
   - Action: Standard academic progression; quarterly monitoring.
3. **Medium Risk (At-Risk Academic Cohort)**:
   - Criteria: Attendance >= 75%, but Avg Score < 60% (or Attendance 70-75% with moderate score).
   - Action: Automated assignment to teacher remedial classes; parent notification.
4. **High Risk (Critical Intervention Cohort)**:
   - Criteria: Attendance < 70% AND/OR Avg Score < 50%.
   - Action: Immediate Dean/Counselor alert; compulsory parent-teacher meeting (PTM); individualized Active Intervention Plan initiated.

### 4.3 Active Intervention Plan Workflow
- **Creation**: Triggered automatically when a student drops into the High Risk zone or initiated manually by the Class Teacher.
- **Remediation Goals**: Target attendance %, weekly after-school tutoring hours, and subject-specific milestone tests.
- **Progress Tracking**: Bi-weekly progress evaluation with counselor remarks and parent sign-off.
- **Data Entity**:
  ```sql
  CREATE TABLE student_intervention_plans (
      plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tenant_id UUID NOT NULL,
      student_id UUID NOT NULL,
      assigned_counselor_id UUID NOT NULL,
      risk_tier VARCHAR(20) NOT NULL CHECK (risk_tier IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
      trigger_reason TEXT NOT NULL,
      attendance_target NUMERIC(5,2) NOT NULL,
      academic_target NUMERIC(5,2) NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
      start_date DATE NOT NULL,
      review_date DATE NOT NULL,
      outcome_notes TEXT,
      created_at TIMESTAMPTZ DEFAULT clock_timestamp()
  );
  ```
- **Supporting Skill**: `smart-school-academic-operations-hub`, `smart-school-examination-assessment`.

---

## 5. Capacity Distribution Telemetry & Academic Honors Spotlight

### 5.1 Class-Wise Capacity Distribution
- **Level Breakdown**: Pre-Primary (KG), Primary (I-V), Middle (VI-VIII), Secondary (IX-X), Senior (XI-XII).
- **Structural Metrics**:
  - Total Enrolled Students with Year-over-Year (YoY) growth percentage.
  - Active Section count and average class density (target ratio: 25-32 students per section).
  - Capacity utilization gauge warning when cohort exceeds facility limits.
- **Supporting Skill**: `smart-school-academic-operations-hub`, `smart-school-system`.

### 5.2 Faculty & Student Excellence Spotlight
- **Best Teacher Spotlight Card**:
  - Visual faculty recognition based on student evaluation rating (e.g. 4.9/5.0), class pass rate percentage (e.g. 98%), and total students taught.
  - Departmental badge and annual award designations (e.g. "Teacher of the Year 2024").
- **Top Student Spotlight Card**:
  - Academic excellence recognition featuring top GPA (e.g. 3.98), class rank (#1), attendance streak (99%), and competition honors (e.g. "National Olympiad Gold").
- **Supporting Skill**: `smart-school-webapp-patterns`, `smart-school-system`.

---

## 6. Executive Speed Bar & Global Command Ingress (`⌘ K`)

### 6.1 Keyboard-Driven Spotlight Search (`⌘ K`)
- Instant modal overlay launched via keyboard shortcut (`⌘ K` or `Ctrl K`).
- Global indexing across:
  - Students (by name, roll number, admission PIN, or RFID badge ID).
  - Staff & Faculty (by name, staff ID, department).
  - Fee Invoices & Receipts (by invoice number, e-challan barcode).
  - Academic Programs, Courses, and Timetables.

### 6.2 Speed Action Triggers
- **`+ New Admission`**: Direct jump to online/offline multi-step student intake modal.
- **`Collect Fees`**: Instant jump to cashier POS fee settlement window.
- **`Report`**: Rapid access to the financial and academic BI reporting catalog.
- **`+ Quick Add`**: Dropdown for instant creation of Student, Teacher, Parent, Task, Event, or Invoice.
- **Supporting Skill**: `smart-school-powerful-tools`, `smart-school-webapp-patterns`.
