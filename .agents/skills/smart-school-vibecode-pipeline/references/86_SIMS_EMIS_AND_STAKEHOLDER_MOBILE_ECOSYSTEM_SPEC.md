# SIMS / EMIS Architecture, QR Identity Verification & Stakeholder Mobile Ecosystem Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative architectural blueprint for the **Student Information Management System (SIMS)**, **Education Management Information System (EMIS)**, **Cryptographic QR Identity Verification Gateway**, **Ambient Wireless/BLE Presence Ingress**, and the **Multi-Stakeholder Mobile Ecosystem (Student, Parent, Teacher, Security Guard)**. This architecture is derived from Genius Education Management SIMS & EMIS principles and multi-persona mobile applications (`media_1789208985999.png`, `media_1789208994154.png`, and `media_1789209017298.png`).

In strict accordance with the user's architectural synthesis directive:
1. **What to Merge**:
   - Student and Parent mobile touchpoints merge into the unified client architecture (`/mobile/student-parent`), integrating with existing fee clearinghouses (`references/77`), timetable collision engines (`references/83`), and GPS bus telematics (`references/69`).
   - Teacher and Faculty mobile workflows merge into the educator client architecture (`/mobile/teacher`), binding directly to digital gradebooks (`references/72`), lesson planning meters (`references/73`), and assignment dispatchers.
2. **What to Skip**:
   - Superficial marketing claims, visual frame renderings, and generic multi-platform slogans are discarded. Focus is exclusively maintained on concrete data schemas, API contracts, hardware protocols, state machines, and operational security.
3. **What to Add (Novel Capabilities)**:
   - **Dynamic QR Profile Scan & Verification Gateway (`/security/qr-scanner`)**: High-speed cryptographic QR code validation on physical/digital ID cards with dynamic TOTP/HMAC rotation, offline cache validation, and authorized guardian pickup verification.
   - **Contactless Wireless Presence & BLE / Wi-Fi Telemetry Ingress (`/attendance/wireless`)**: Passive ambient roll-call capture using classroom Bluetooth Low Energy (BLE) beacons and enterprise Wi-Fi AP association telemetry with RSSI signal proximity thresholds.
   - **Macro-Level EMIS Statutory Census & Ministry Reporting Engine (`/reports/emis`)**: UNESCO / MoEYS standard educational management reporting computing Gross/Net Enrollment Ratios (GER/NER), Student-to-Teacher Ratios (STR), and infrastructure capacity metrics.
   - **Classroom Collaboration & Group Project Workspaces (`/academics/group-projects`)**: Student team workspaces with shared milestone boards, file deliverable vaults, task allocation, and rubric-based peer assessment.
   - **Centralized Digital Learning Resource Repository (`/academics/learning-resources`)**: Syllabus-tagged media bank hosting lecture video streams, interactive reading packets, audio guides, and DRM view-only stream enforcement.
   - **Authorized Dismissal & Safe Student Pickup Verification Engine (`/security/student-pickup`)**: End-of-day dismissal checkpoint validating parent/guardian QR pass against authorized pickup biometric photo records with gatekeeper instant approval.
   - **Longitudinal Student Lifecycle Dossier & Academic History Archive**: Complete tracking from online admission through stream changes, disciplinary notes, term transcripts, to graduation and alumni tracking.
   - **Automated Dropout Early-Warning & Intervention Tracking Matrix**: Predictive analytics engine correlating chronic absenteeism, sudden grade drops, and fee defaults to generate at-risk alerts for guidance counselors and dean interventions.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   SIMS, EMIS & STAKEHOLDER MOBILE ARCHITECTURE                         │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Subsystem Group   │ Route Slug / Component        │ Operational Capability             │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ CAMPUS SECURITY   │ /security/qr-scanner          │ Dynamic QR Identity Verification   │
│ & ACCESS CONTROL  │ /security/student-pickup      │ Authorized Guardian Pickup Matching│
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ PRESENCE INGRESS  │ /attendance/wireless          │ BLE Beacon & Wi-Fi Telemetry Sync  │
│                   │ /attendance/bluetooth-rssi    │ Room-Proximity Ambient Roll-Call   │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ SIMS & EMIS CORE  │ /reports/emis                 │ MoEYS/UNESCO Macro Census Engine   │
│                   │ /students/longitudinal-record │ Lifecycle Dossier (Inquiry->Alum)  │
│                   │ /students/dropout-prevention  │ Early Warning Predictive Matrix    │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ ACADEMICS & LMS   │ /academics/group-projects     │ Team Workspaces & Peer Rubrics     │
│                   │ /academics/learning-resources │ Centralized DRM Educational Media  │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ STAKEHOLDER APPS  │ /mobile/student-parent        │ Unified 12-Module Family Client    │
│                   │ /mobile/teacher               │ Offline 10-Module Faculty Suite    │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Dynamic QR Profile Scan & Verification Gateway (`/security/qr-scanner`)

### 1.1 Domain Concept & Operational Security
Physical student and staff ID badges printed with static barcodes or QR codes are vulnerable to photocopies, smartphone screenshots, and unauthorized loaning.

The **Dynamic QR Identity Verification Gateway** implements cryptographically signed, time-rotating QR codes rendered within the Student/Staff Mobile App, paired with high-speed optical scanning for security guards, bus conductors, and campus librarians.

### 1.2 Cryptographic Rotation & Offline Fallback
1. **Dynamic Rotation (TOTP / HMAC-SHA256)**:
   - When displayed on a mobile screen, the QR code rotates every 30 seconds.
   - Payload: `Base64URL(JWT)` signed with institutional tenant secret:
     ```json
     {
       "iss": "smart-school-security",
       "sub": "std_98240214-411a-4932-8411-d11e84770001",
       "tid": "ten_kh_phnompenh_01",
       "role": "STUDENT",
       "exp": 1773305430,
       "nonce": "a8f9c2d1",
       "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
     }
     ```
2. **Static Physical Cards with Tamper-Proof Signature**:
   - For physical PVC cards, the QR code contains an immutable payload: `INST:TID:STUDENT_ID:SIGNATURE`.
   - The scanner checks the student's active status against a local encrypted SQLite cache stored on the guard terminal, refreshed every 15 minutes.
3. **Guard Scan Terminal Workflow**:
   - Target scan latency: `< 250 milliseconds`.
   - Verification display surfaces: Full-color student photo, legal name (Khmer & English), grade/section, active enrollment status, medical allergy banner (if present), and emergency contact phone number.

### 1.3 Data Model
```sql
CREATE TABLE security_id_qr_credentials (
    credential_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    user_id UUID NOT NULL,
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('STUDENT', 'TEACHER', 'STAFF', 'VISITOR')),
    public_qr_code VARCHAR(120) NOT NULL UNIQUE,
    hmac_secret_hash VARCHAR(256) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    revocation_reason VARCHAR(255),
    last_scanned_at TIMESTAMPTZ,
    last_scanned_checkpoint VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE gate_scan_audit_logs (
    scan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    checkpoint_name VARCHAR(80) NOT NULL, -- MAIN_GATE, BUS_TRANSIT, LIBRARY, CANTEEN
    guard_user_id UUID NOT NULL,
    scanned_user_id UUID NOT NULL,
    scan_result VARCHAR(30) NOT NULL CHECK (scan_result IN ('APPROVED', 'EXPIRED_TOKEN', 'INACTIVE_USER', 'UNAUTHORIZED_CHECKPOINT', 'SUSPECT_DUPLICATE')),
    scanned_at TIMESTAMPTZ DEFAULT clock_timestamp(),
    latency_ms INTEGER NOT NULL,
    device_ip INET
);
CREATE INDEX idx_gate_scan_user ON gate_scan_audit_logs(tenant_id, scanned_user_id, scanned_at DESC);
```

---

## 2. Authorized Dismissal & Safe Student Pickup Verification (`/security/student-pickup`)

### 2.1 Domain Concept & Problem Statement
In kindergarten, primary, and middle school facilities, student dismissal poses severe liability risks. Ensuring students are released only to verified parents or designated guardians requires instantaneous biometric/photo cross-referencing.

### 2.2 Operational Flow
1. **Guardian Arrival & Scan**:
   - The picking parent/guardian opens their Mobile App and presents their **Pickup Pass**.
   - The gate officer scans the QR pass at the dismissal turnstile.
2. **Instant Visual & Entity Verification**:
   - The guard terminal renders:
     - Guardian Name, Legal Relationship (Father, Mother, Authorized Nanny, School Bus Driver).
     - Live Photo of Guardian alongside Live Photos of all linked children enrolled.
     - Authorized Pickup Expiry Date and any active Custody Restriction Orders (e.g. Legal Restraining Order flag).
3. **Classroom Notification & Dispatch**:
   - Upon guard confirmation, an internal WebSocket alert dispatches to the homeroom teacher's display: `"Student [John Doe] verified at Gate 1 for pickup by [Mother: Jane Doe]"`.
   - The student is released from the classroom to the designated departure zone.
4. **Audit Trail & Parent Push**:
   - A real-time FCM/APNs push notification is immediately transmitted to all registered parent phones: `"Student [John Doe] checked out of campus at 15:30:12 via Main Gate"`.

### 2.3 Data Model
```sql
CREATE TABLE student_authorized_pickups (
    pickup_auth_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    guardian_id UUID NOT NULL,
    relationship_type VARCHAR(40) NOT NULL, -- FATHER, MOTHER, GRANDPARENT, DRIVER, GUARDIAN
    authorization_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (authorization_status IN ('ACTIVE', 'SUSPENDED', 'REVOKED')),
    legal_custody_notes TEXT,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE student_dismissal_events (
    dismissal_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    guardian_id UUID NOT NULL,
    gate_officer_id UUID NOT NULL,
    gate_name VARCHAR(60) NOT NULL,
    verification_method VARCHAR(30) NOT NULL CHECK (verification_method IN ('QR_PASS', 'GOVERNMENT_ID', 'BIOMETRIC_FACE', 'MANUAL_OVERRIDE')),
    parent_alert_sent BOOLEAN NOT NULL DEFAULT FALSE,
    dismissal_timestamp TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 3. Contactless Wireless Presence & BLE / Wi-Fi Telemetry Ingress (`/attendance/wireless`)

### 3.1 Domain Concept & Ambient Roll-Call
Manual roll-calls consume 5 to 10 minutes of valuable instructional time per period. Biometric fingerprint scanners create bottleneck queues at classroom entrances.

The **Wireless Attendance Ingress Engine** leverages ambient campus infrastructure:
1. **Classroom BLE Beacons**: Fixed hardware beacons (iBeacon / Eddystone protocol) broadcasting unique UUIDs with calibrated transmission power inside each classroom.
2. **Enterprise Wi-Fi AP Telemetry**: Campus 802.1X enterprise Wi-Fi controllers (Cisco / Aruba / UniFi) transmitting RADIUS accounting syslog streams to the platform.

### 3.2 Detection & Anti-Spoofing Rules
- **RSSI Proximity Calculation**: The student/teacher mobile app measures received signal strength (RSSI). Only signals above `-72 dBm` are categorized as inside the classroom boundary.
- **Dwell Time Threshold**: A student must maintain continuous beacon proximity for a minimum of 10 minutes within the scheduled period window to be flagged as `PRESENT`.
- **AP BSSID Validation**: Wi-Fi association logs must match the specific Access Point mounted inside or adjacent to the scheduled classroom.
- **Proxy Detection**:
  - Two distinct student credentials associating from the same client MAC or Bluetooth device hardware ID triggers an automatic `SUSPECTED_PROXY` warning.
  - GPS latitude/longitude must match campus geofencing within 150 meters.

### 3.3 Telemetry Ingress Contract & Schema
```sql
CREATE TABLE wireless_attendance_telemetry (
    telemetry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    timetable_period_id UUID NOT NULL,
    classroom_id UUID NOT NULL,
    beacon_uuid UUID,
    measured_rssi INTEGER NOT NULL,
    wifi_bssid MACADDR,
    dwell_duration_seconds INTEGER NOT NULL DEFAULT 0,
    proximity_status VARCHAR(30) NOT NULL CHECK (proximity_status IN ('IN_ROOM', 'ADJACENT_HALLWAY', 'OUT_OF_BOUNDS', 'SPOOF_DETECTED')),
    recorded_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE wireless_attendance_summaries (
    summary_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    timetable_period_id UUID NOT NULL,
    attendance_date DATE NOT NULL,
    final_status VARCHAR(20) NOT NULL CHECK (final_status IN ('PRESENT', 'LATE', 'ABSENT', 'EXCUSED', 'UNVERIFIED')),
    confidence_score NUMERIC(5,2) NOT NULL, -- 0.00% to 100.00%
    verified_by_teacher BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 4. Macro-Level EMIS Statutory Census & Ministry Reporting Engine (`/reports/emis`)

### 4.1 Domain Concept & Regulatory Alignment
Educational Management Information Systems (EMIS) are mandated by national ministries (such as Cambodia's MoEYS) and international bodies (UNESCO Institute for Statistics). EMIS aggregates school-level operational microdata into macroscopic statistical reports for policy planning, budget allocation, and equity auditing.

### 4.2 Core Statutory Indicators Computed
1. **Gross Enrollment Ratio (GER) & Net Enrollment Ratio (NER)**:
   - Evaluated per grade cluster (Early Childhood, Primary Grades 1-6, Lower Secondary Grades 7-9, Upper Secondary Grades 10-12, Higher Education).
2. **Student-to-Teacher Ratio (STR)**:
   - Dynamic calculation across full-time equivalent (FTE) teaching faculty versus enrolled headcounts per stream (Science, Social Studies, TVET).
3. **Student-to-Classroom Ratio (SCR) & Infrastructure Utilization**:
   - Physical seating capacity, laboratory workbench availability, sanitation unit ratios (girls/boys toilets compliant with national WASH standards).
4. **Longitudinal Cohort Survival & Transition Rates**:
   - Tracking transition rates from Grade 9 (Lower Secondary) to Grade 10 (Upper Secondary) or TVET Vocational Colleges.
5. **Standardized MoEYS EMIS XML / CSV Export**:
   - Pre-formatted data pipeline generating statutory MoEYS annual census payloads ready for direct upload to ministerial portals.

### 4.3 Data Model & Aggregation Schema
```sql
CREATE TABLE emis_statutory_census_reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    census_term VARCHAR(20) NOT NULL CHECK (census_term IN ('START_OF_YEAR', 'MID_YEAR', 'END_OF_YEAR')),
    total_enrolled_male INTEGER NOT NULL,
    total_enrolled_female INTEGER NOT NULL,
    total_teaching_staff_male INTEGER NOT NULL,
    total_teaching_staff_female INTEGER NOT NULL,
    gross_enrollment_ratio NUMERIC(5,2),
    net_enrollment_ratio NUMERIC(5,2),
    student_teacher_ratio NUMERIC(5,2) NOT NULL,
    wash_sanitation_ratio NUMERIC(5,2),
    export_payload JSONB NOT NULL,
    is_submitted_to_ministry BOOLEAN NOT NULL DEFAULT FALSE,
    submitted_at TIMESTAMPTZ,
    submission_ack_code VARCHAR(100),
    generated_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 5. Longitudinal Student Lifecycle Dossier & Academic History Archive

### 5.1 Domain Concept & Longitudinal Tracking
A comprehensive Student Information Management System (SIMS) preserves the unbroken academic, behavioral, and health trajectory of a student across their entire tenure at the institution.

### 5.2 The 7 Lifecycle Stages
```
[STAGE 1: PROSPECT / INQUIRY] ──▶ Lead capture, campus tour, entrance exam score.
             │
[STAGE 2: ADMISSION & INTAKE] ──▶ S3 document vault, birth cert, prior school records.
             │
[STAGE 3: ACTIVE ENROLLMENT]  ──▶ Grade progression, subject streams, daily attendance.
             │
[STAGE 4: CLINICAL & SUPPORT] ──▶ Health allergies, immunization, counseling case files.
             │
[STAGE 5: CO-CURRICULAR]      ──▶ Clubs, athletic competitions, leadership positions.
             │
[STAGE 6: GRADUATION & TC]    ──▶ Clearance sign-offs, final transcripts, diploma generation.
             │
[STAGE 7: ALUMNI FEDERATION]  ──▶ Higher ed destination, employment data, alumni network.
```

### 5.3 Automated Dropout Early-Warning Matrix (`/students/dropout-prevention`)
The SIMS engine continuously runs predictive heuristics every weekend to flag students at risk of disengagement or dropping out:
- **Attendance Erosion**: Attendance drops below 80% over any rolling 30-day window.
- **Academic Deceleration**: Cumulative GPA declines by more than 15% between two consecutive terms.
- **Financial Friction**: Tuition invoices remain outstanding past 45 days without an approved installment plan.
- **Disciplinary Accumulation**: 2 or more formal behavioral infractions logged within a single semester.

Students crossing 2 or more thresholds are automatically enrolled in the **Active Academic Intervention Plan (`/people/students/intervention`)**, assigning a designated guidance counselor and scheduling a mandatory parent conference.

---

## 6. Classroom Collaboration & Group Project Workspaces (`/academics/group-projects`)

### 6.1 Domain Concept & Collaborative Pedagogy
Modern pedagogy emphasizes team-based learning, inquiry projects, and cross-functional group tasks. Traditional school management systems treat assignments as strictly individual submissions.

### 6.2 Workspace Capabilities
- **Team Formation & Role Assignment**: Educators define project scopes, team sizes (e.g. 3 to 5 students), and allocate roles (Team Lead, Researcher, Technical Editor, Presenter).
- **Interactive Milestone Roadmap**: Sub-tasks broken into sequential milestones with individual due dates and completion checkboxes.
- **Deliverable File Vault**: Shared cloud storage for group slides, spreadsheets, source code, and recorded video rehearsals with version history.
- **Dual-Layer Assessment Grading**:
  - **Group Deliverable Grade (60% weight)**: Shared collective score based on project rubric.
  - **Individual Contribution Grade (40% weight)**: Evaluated through peer review ratings, milestone commit history, and teacher observation.

### 6.3 Data Model
```sql
CREATE TABLE academic_group_projects (
    project_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    course_subject_id UUID NOT NULL,
    project_title VARCHAR(200) NOT NULL,
    description TEXT,
    max_team_size INTEGER NOT NULL DEFAULT 4,
    milestone_count INTEGER NOT NULL DEFAULT 3,
    start_date DATE NOT NULL,
    final_due_date DATE NOT NULL,
    rubric_id UUID,
    created_by_teacher_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE group_project_teams (
    team_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    project_id UUID NOT NULL REFERENCES academic_group_projects(project_id),
    team_name VARCHAR(100) NOT NULL,
    team_leader_student_id UUID NOT NULL,
    repository_url VARCHAR(255),
    submission_status VARCHAR(30) NOT NULL DEFAULT 'IN_PROGRESS' CHECK (submission_status IN ('IN_PROGRESS', 'SUBMITTED_FOR_REVIEW', 'GRADED', 'REVISION_REQUESTED')),
    collective_score NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE group_project_members (
    membership_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    team_id UUID NOT NULL REFERENCES group_project_teams(team_id),
    student_id UUID NOT NULL,
    assigned_role VARCHAR(60) NOT NULL, -- RESEARCHER, LEAD, DESIGNER, PRESENTER
    peer_review_avg_score NUMERIC(4,2),
    individual_score NUMERIC(5,2),
    teacher_notes TEXT
);
```

---

## 7. Centralized Digital Learning Resource Repository (`/academics/learning-resources`)

### 7.1 Domain Concept & Curriculum Asset Vault
To ensure equitable learning opportunities, institutional lecture materials, study packets, video explanations, and audio guides must be preserved in a searchable, DRM-controlled repository tagged directly to curriculum syllabi.

### 7.2 Functional Capabilities
- **Hierarchical Taxonomy Tagging**: Tagged by Grade -> Subject -> Chapter -> Lesson Objective.
- **Multi-Format Ingress**:
  - Video Lessons (HLS adaptive bitrate streaming with watermark overlay).
  - Digital Textbooks & Reading Packets (PDFs rendered via in-browser viewer with print/copy prevention flags).
  - Audio Pronunciation Guides & Audiobooks (integrated HTML5 waveform player).
- **Engagement Telemetry Tracking**:
  - Video playhead tracking (records completion % to verify if students watched assigned flipped-classroom videos before class).
  - Document read time tracking (minimum dwell time monitoring).

---

## 8. Stakeholder Persona Mobile Routing & Unified Deep Link Matrix

### 8.1 Student / Parent Mobile Persona Architecture (12 Core Modules)
Derived from `media_1789208985999.png`:

| Subsystem Module | Mobile Route & Deep Link | Key Functional Capabilities |
|:---|:---|:---|
| **1. Academic Management** | `smartschool://academics/overview` | Homework, classwork, weekly syllabus progress, and daily lesson plans. |
| **2. Attendance & Leave** | `smartschool://attendance/calendar` | Monthly presence calendar, absence counters, and direct leave request filing. |
| **3. Student Timetable** | `smartschool://timetable/daily` | Day-by-day class routine, room numbers, and subject teacher badges. |
| **4. Exam & Results** | `smartschool://exams/marksheets` | Exam timetables, digital admit cards, and term marksheet downloads. |
| **5. Fees & Invoicing** | `smartschool://fees/checkout` | Outstanding invoice list, installment plans, and Bakong KHQR checkout. |
| **6. Omnichannel Messaging** | `smartschool://messaging/inbox` | Broadcast circulars, teacher notes, and school announcement feed. |
| **7. Digital Library** | `smartschool://library/circulation` | Borrowed books catalog, return due date countdowns, and renewal requests. |
| **8. Real-Time Bus Tracking** | `smartschool://transport/live-bus` | Live GPS transit map, ETA counters, and stop arrival push alerts. |
| **9. Safe Student Pickup** | `smartschool://security/pickup-pass` | Dynamic 30-second rotating QR pass and authorized guardian list. |
| **10. Virtual Classroom** | `smartschool://academics/virtual-class` | 1-tap join for scheduled WebRTC/Zoom live remote lectures. |
| **11. Parent-Teacher Meeting** | `smartschool://ptm/appointments` | In-person and virtual video conference slot reservations. |
| **12. Multi-Child Switcher** | `smartschool://family/switch-student` | Instant toggle between enrolled siblings without re-authenticating. |

### 8.2 Teacher / Faculty Mobile Persona Architecture (10 Core Modules)
Derived from `media_1789208994154.png`:

| Subsystem Module | Mobile Route & Deep Link | Key Functional Capabilities |
|:---|:---|:---|
| **1. Student Management** | `smartschool://faculty/students` | Section student directory, emergency guardian phone links, and medical flags. |
| **2. Digital Gradebook** | `smartschool://faculty/gradebook` | Formative/summative mark entry with offline caching and draft saving. |
| **3. Virtual Classroom Host** | `smartschool://faculty/virtual-host` | Launch live online classrooms, share whiteboards, and record sessions. |
| **4. Assignment Dispatcher** | `smartschool://faculty/assignments` | Post homework tasks, attach reference PDFs/photos, and set deadlines. |
| **5. Event & Calendar Desk** | `smartschool://faculty/events` | School calendar, sports days, academic deadlines, and staff meetings. |
| **6. Learning Resources** | `smartschool://faculty/resources` | Upload lecture notes, curate YouTube links, and publish reading materials. |
| **7. Classroom Collaboration**| `smartschool://faculty/group-projects` | Create student project teams, inspect progress milestones, and evaluate rubrics. |
| **8. Teacher Timetable** | `smartschool://faculty/schedule` | Weekly teaching periods, free period slots, and proxy substitution alerts. |
| **9. Student Roll-Call** | `smartschool://faculty/attendance` | Sub-45 second quick-tap attendance roll with wireless BLE presence overlay. |
| **10. PTM Scheduling Desk** | `smartschool://faculty/ptm-schedule` | Open parent meeting time slots, log discussion notes, and set action items. |

---

## 9. Zero-Emoji Compliance & Design System Tokens

In compliance with platform design directives:
- **Zero Emoji**: No Unicode emojis or colored pictogram glyphs are permitted in code, mobile screens, or documentation.
- **Google Material Symbols Outlined (`wght 500`)**:
  - QR Scanner: `qr_code_scanner`
  - Wireless Telemetry: `wifi_tethering`
  - EMIS Census: `hub`
  - Longitudinal Timeline: `timeline`
  - Group Projects: `groups`
  - Learning Media: `video_library`
  - Mobile Gradebook: `edit_note`
  - Mobile Client: `smartphone`
  - Student Pickup: `how_to_reg`
  - Dropout Prevention: `warning_amber`
- **Typographic Engine**:
  - English: Ubuntu (`font-ubuntu`)
  - Khmer UI: Google Sans Khmer (`font-khmer`) with zero-width space (`\u200B`)
  - Diplomas & Certificates: Moul (`font-moul`)
  - Machine Payloads & Codes: JetBrains Mono (`font-mono`)
