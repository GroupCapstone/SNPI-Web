# Mobile App Class Notes Whiteboard Sync, Location Entry & Student Tracking Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative architectural blueprint for the **Classroom Whiteboard & Class Notes Image Sync Engine**, **Campus Zoned Location Entry & Telemetry**, **Interactive Touch/Stylus Homework Annotation & Voice Feedback**, **Dynamic Toggled Timetable & Contingency Switcher**, **Holistic Student Development Trajectory Tracker**, and **Role-Restricted Multi-Channel Chat Boxes**, derived from Genius Education Management Mobile App and Student Tracking Software architecture.

In strict adherence to the user's architectural synthesis directive:
1. **What to Merge**:
   - Standard attendance rosters, fee billing, library checkout, vehicle GPS tracking, and push notifications integrate into existing modules (`references/69`, `references/73`, `references/77`, `references/83`, `references/86`) without duplicating foundational logic.
2. **What to Skip**:
   - Promotional jargon ("wings of technology", device skins, shopping analogies) is omitted to focus entirely on production database schemas, computer vision image pipelines, REST contracts, and mobile interaction states.
3. **What to Add (Novel Capabilities)**:
   - **Whiteboard & Class Notes Image Sync (`/academics/class-notes-sync`)**: Mobile camera capture of classroom blackboards/whiteboards with automatic quad-corner keystone correction, contrast binarization, and lesson-topic indexing.
   - **Campus Location Entry & Role-Differentiated Zoned Telemetry (`/facilities/location-entries`)**: Granular location logging across campus physical zones (Labs, Library, Hostels, Canteen, Sports Field, Staff Lounge) with zone capacity counters and unauthorized entry alerts.
   - **Interactive Homework Annotation & Audio Feedback (`/academics/homework-evaluations`)**: Teacher stylus/touch visual markup on student submission images/PDFs with 60-second voice memo feedback and rubric scoring.
   - **Dynamic Toggled Timetable & Contingency Switcher (`/academics/toggled-timetable`)**: Runtime schedule mode switcher (Regular, Surprise Test, Rainy-Day, Compressed Period, Virtual Contingency) with automated teacher substitute dispatch.
   - **Holistic Student Development Trajectory Tracker (`/students/tracking-trajectory`)**: 360-degree longitudinal development combining cognitive mastery, conduct logs, co-curricular achievements, and counselor observations into semester growth radars.
   - **Multi-Channel In-App Chat Boxes with Office Hours Guardrails (`/apps/chat-boxes`)**: Role-restricted messaging channels with automated teacher quiet hours, broadcast announcements, and student study circle moderation.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│            MOBILE CLASSROOM SYNC, LOCATION ENTRY & STUDENT TRACKING                    │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Subsystem Group   │ Route Slug / Component        │ Operational Capability             │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ CLASSROOM SYNC    │ /academics/class-notes-sync   │ Whiteboard Camera Sync & OCR       │
│ HOMEWORK MARKUP   │ /academics/homework-evaluation│ Stylus Touch Markup & Audio Memo   │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ CAMPUS TELEMETRY  │ /facilities/location-entries  │ Zoned Location Checkpoints         │
│                   │ /facilities/zone-occupancy    │ Real-Time Headcount & Curfew Alerts│
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ DYNAMIC SCHEDULE  │ /academics/toggled-timetable  │ Runtime Schedule Mode Switcher     │
│                   │ /academics/proxy-dispatch     │ Emergency Teacher Substitution     │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ STUDENT SUCCESS   │ /students/tracking-trajectory │ 360° Cognitive & Conduct Radars    │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ SECURE CHAT       │ /apps/chat-boxes              │ Role Channels with Quiet Hours     │
│ PROFILE SWITCHER  │ /profile/customizer           │ Multi-Sibling Delegated Accounts   │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Classroom Whiteboard & Class Notes Image Sync Engine (`/academics/class-notes-sync`)

### 1.1 Domain Concept & Operational Problem
During physical classroom lectures, teachers write crucial equations, diagrams, and summary points on whiteboards or blackboards. Students often spend lecture time rushing to copy notes rather than engaging, or take blurry smartphone snapshots from angled seats.

The **Class Notes Image Sync Engine** equips teachers to capture physical board work at the end of each period using the Teacher Mobile App. The system applies automated computer vision image enhancement and synchronizes the optimized notes directly into the student and parent mobile stream tagged to the specific timetable period.

### 1.2 Image Processing Pipeline
```
[ CAMERA INGRESS ] ──▶ Mobile Camera Capture at end of period
        │
[ PERSPECTIVE TRANSFORMATION ] ──▶ Quad-point contour detection & 2D planar un-skewing
        │
[ CONTRAST ENHANCEMENT ] ──▶ Adaptive thresholding & specular glare reduction
        │
[ OCR TEXT INDEXING ] ──▶ Tesseract / Vision OCR extracts keywords for full-text search
        │
[ S3 ATTACHMENT ] ──▶ Compressed WebP stored in institutional S3 bucket
        │
[ TIMETABLE ATTACHMENT ] ──▶ Auto-linked to Timetable Period ID & Lesson Plan Objective
        │
[ REAL-TIME NOTIFICATION ] ──▶ Push alert to students: "Period 3 Math Class Notes Available"
```

### 1.3 Data Model
```sql
CREATE TABLE academic_class_notes (
    note_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    branch_id UUID NOT NULL,
    course_subject_id UUID NOT NULL,
    timetable_period_id UUID NOT NULL,
    teacher_id UUID NOT NULL,
    lesson_topic VARCHAR(200) NOT NULL,
    original_image_url VARCHAR(255) NOT NULL,
    enhanced_image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    ocr_extracted_text TEXT,
    view_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE INDEX idx_class_notes_period ON academic_class_notes(tenant_id, timetable_period_id, created_at DESC);
```

---

## 2. Campus Location Entry & Role-Differentiated Zoned Telemetry (`/facilities/location-entries`)

### 2.1 Domain Concept & Problem Statement
Campus safety, emergency evacuations, and residential boarding oversight require knowing the physical distribution of people across facilities. Static gate turnstiles only record arrival and departure at the perimeter, leaving internal zones unmonitored.

### 2.2 Zoned Infrastructure Architecture
The platform establishes **Location Checkpoints** across 9 primary institutional campus zones:
1. `MAIN_PERIMETER_GATE`: Exterior entrance and visitor holding area.
2. `SCIENCE_LABS`: Biology, Chemistry, and Physics laboratories with hazardous materials.
3. `COMPUTER_CENTERS`: IT infrastructure and digital testing labs.
4. `CENTRAL_LIBRARY`: Silent reading rooms and open stack circulation floors.
5. `RESIDENTIAL_HOSTELS`: Gender-segregated student dormitories and faculty quarters.
6. `DINING_CANTEEN`: Food service halls and kitchen storage.
7. `SPORTS_GROUND`: Outdoor athletics fields, swimming pool, and gymnasium.
8. `STAFF_LOUNGE`: Dedicated faculty preparation rooms and departmental offices.
9. `ADMINISTRATIVE_SECRETARIAT`: Finance vault, principal's office, and record archives.

### 2.3 Role-Differentiated Verification Rules
- **Students**: Tap RFID badge or scan dynamic QR at zone turnstile. If a student attempts entry into a prohibited zone (e.g. Science Lab outside class hours, or opposite-gender hostel wing), the checkpoint rejects entry with audio warning and logs a `UNAUTHORIZED_ZONE_ATTEMPT`.
- **Teachers**: Tap-to-enter unlocks staff preparation rooms and classroom master locks.
- **Facility Staff & Technicians**: Time-stamped check-in for cleaning and maintenance work orders.
- **Night Hostel Curfew Enforcement**: Automatically compiles real-time roll-call of students present in dormitories at curfew (e.g. 21:00), flagging missing individuals to warden mobile consoles.

### 2.4 Data Model
```sql
CREATE TABLE campus_facility_zones (
    zone_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    branch_id UUID NOT NULL,
    zone_code VARCHAR(40) NOT NULL UNIQUE, -- LAB_CHEM, LIB_FLOOR_2, HOSTEL_BOYS_A
    zone_name VARCHAR(100) NOT NULL,
    building_name VARCHAR(80) NOT NULL,
    floor_number INTEGER NOT NULL,
    max_occupancy_capacity INTEGER NOT NULL,
    current_occupancy INTEGER NOT NULL DEFAULT 0,
    is_restricted_access BOOLEAN NOT NULL DEFAULT FALSE,
    curfew_time TIME,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE campus_location_entry_logs (
    entry_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    zone_id UUID NOT NULL REFERENCES campus_facility_zones(zone_id),
    user_id UUID NOT NULL,
    user_role VARCHAR(30) NOT NULL CHECK (user_role IN ('STUDENT', 'TEACHER', 'STAFF', 'VISITOR')),
    entry_type VARCHAR(10) NOT NULL CHECK (entry_type IN ('CHECK_IN', 'CHECK_OUT')),
    checkpoint_device_id VARCHAR(80) NOT NULL,
    auth_method VARCHAR(30) NOT NULL CHECK (auth_method IN ('RFID_TAP', 'QR_SCAN', 'BLE_BEACON', 'MANUAL')),
    is_access_granted BOOLEAN NOT NULL DEFAULT TRUE,
    access_denial_reason VARCHAR(100),
    logged_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
CREATE INDEX idx_location_user_zone ON campus_location_entry_logs(tenant_id, user_id, logged_at DESC);
```

---

## 3. Interactive Touch/Stylus Homework Annotation & Voice Feedback (`/academics/homework-evaluations`)

### 3.1 Domain Concept & Evaluator Experience
Grading digital homework submissions on smartphones or tablets often frustrates educators when limited to plain text comments or raw number entries.

The **Interactive Homework Evaluation Engine** provides a native drawing canvas inside the Teacher Mobile App:
- **Direct Visual Markup**: Educators use a finger or Apple Pencil / stylus to draw checkmarks, underline errors, and write margin corrections directly over student-submitted images or PDFs.
- **Layered Vector Annotations**: Markup stored as lightweight SVG/JSON vector layers overlaying the original submission, allowing students to toggle teacher notes on or off.
- **Voice Memo Audio Feedback**: Teachers can record up to 60 seconds of voice feedback (`audio/mp4` / `AAC`) explaining tricky concepts or offering encouragement.
- **Rubric-Based Evaluation**: Submissions scored across structured rubric criteria (e.g. Conceptual Understanding, Calculation Accuracy, Presentation).

### 3.2 Data Model
```sql
CREATE TABLE homework_submission_evaluations (
    evaluation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    homework_id UUID NOT NULL,
    submission_id UUID NOT NULL,
    evaluator_teacher_id UUID NOT NULL,
    score_awarded NUMERIC(5,2) NOT NULL,
    max_score NUMERIC(5,2) NOT NULL,
    rubric_scores_json JSONB,
    written_feedback TEXT,
    voice_feedback_url VARCHAR(255),
    voice_feedback_duration_sec INTEGER,
    vector_annotation_json JSONB,
    evaluated_image_url VARCHAR(255),
    is_returned_to_student BOOLEAN NOT NULL DEFAULT TRUE,
    evaluated_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 4. Dynamic Toggled Timetable & Emergency Contingency Switcher (`/academics/toggled-timetable`)

### 4.1 Domain Concept & Schedule Volatility
School operations frequently deviate from the standard weekly timetable due to surprise tests, weather emergencies (heavy monsoon rains in Cambodia), special school assemblies, or sudden teacher sick leaves.

The **Toggled Timetable Engine** enables administrators and teachers to switch the active campus schedule mode instantly with a single toggle:

### 4.2 Schedule Modes
1. `REGULAR_STANDARD`: The default 6 to 8 period daily academic schedule.
2. `SURPRISE_TEST_MODE`: Replaces selected instructional periods with supervised pop quizzes, dispatching notifications to students and proctors.
3. `COMPRESSED_PERIOD_MODE`: Automatically scales period durations (e.g. from 50 mins down to 35 mins) to accommodate afternoon sports day or parent events.
4. `EXAM_BLOCK_MODE`: Replaces normal periods with 2-hour or 3-hour examination blocks and dedicated seating allocations.
5. `RAINY_DAY_CONTINGENCY`: Postpones outdoor sports and shifts practicals to indoor lecture rooms with revised transit departure times.
6. `VIRTUAL_REMOTE_MODE`: Switches all physical classroom assignments to scheduled WebRTC/Zoom live video links.

### 4.3 Automated Teacher Substitution (Proxy Dispatch)
When a teacher submits sick leave via mobile, the engine:
1. Identifies all affected periods for that day.
2. Cross-references all eligible subject teachers with a `FREE_PERIOD` during those exact time slots.
3. Recommends the optimal substitute based on subject relevance and workload balance.
4. With 1 tap, assigns the proxy teacher and sends an alert: `"You have been assigned Period 2 Proxy for Class 9-A (Room 204)"`.

### 4.4 Data Model
```sql
CREATE TABLE schedule_mode_toggles (
    toggle_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    branch_id UUID NOT NULL,
    academic_date DATE NOT NULL,
    active_mode VARCHAR(40) NOT NULL DEFAULT 'REGULAR_STANDARD' CHECK (active_mode IN ('REGULAR_STANDARD', 'SURPRISE_TEST_MODE', 'COMPRESSED_PERIOD_MODE', 'EXAM_BLOCK_MODE', 'RAINY_DAY_CONTINGENCY', 'VIRTUAL_REMOTE_MODE')),
    reason_notes TEXT,
    toggled_by_user_id UUID NOT NULL,
    toggled_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE timetable_substitute_assignments (
    substitution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    branch_id UUID NOT NULL,
    academic_date DATE NOT NULL,
    timetable_period_id UUID NOT NULL,
    absent_teacher_id UUID NOT NULL,
    assigned_proxy_teacher_id UUID NOT NULL,
    proxy_status VARCHAR(20) NOT NULL DEFAULT 'ASSIGNED' CHECK (proxy_status IN ('ASSIGNED', 'ACKNOWLEDGED', 'COMPLETED', 'DECLINED')),
    assigned_by_user_id UUID NOT NULL,
    assigned_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 5. Holistic Student Development Trajectory & Milestone Tracker (`/students/tracking-trajectory`)

### 5.1 Domain Concept & 360-Degree Child Growth
Academic grades alone do not define student development. The **Student Tracking Trajectory Engine** captures longitudinal growth across three interwoven pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   360° STUDENT DEVELOPMENT RADAR                       │
├───────────────────────┬───────────────────────┬────────────────────────┤
│ 1. COGNITIVE MASTERY  │ 2. BEHAVIOR & CONDUCT │ 3. SOCIAL & CO-CURRIC  │
├───────────────────────┼───────────────────────┼────────────────────────┤
│ • Subject GPA & Trends│ • Punctuality Index   │ • Athletics & Sports   │
│ • Chapter Topic Skills│ • Merit Badges Earned │ • Debate & Arts Clubs  │
│ • Homework Promptness │ • Disciplinary Records│ • Leadership Roles     │
│ • Exam Bloom Level    │ • Uniform Compliance  │ • Community Service Hrs│
└───────────────────────┴───────────────────────┴────────────────────────┘
```

### 5.2 Multi-Stakeholder Progress Synchronization
- **Homeroom Teachers**: Log weekly behavioral observations and conduct ratings (`A`, `B`, `C`, `D`).
- **Subject Teachers**: Flag cognitive milestones (e.g. "Mastered Quadratic Equations").
- **Guidance Counselors**: Maintain confidential counseling notes and emotional wellness checks.
- **Parents**: Review consolidated semester development radar charts in their mobile app without technical jargon.

### 5.3 Data Model
```sql
CREATE TABLE student_development_milestones (
    milestone_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    student_id UUID NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester_code VARCHAR(20) NOT NULL,
    dimension VARCHAR(30) NOT NULL CHECK (dimension IN ('COGNITIVE', 'BEHAVIORAL', 'CO_CURRICULAR', 'EMOTIONAL_WELLBEING')),
    milestone_title VARCHAR(150) NOT NULL,
    rating_score NUMERIC(4,2) NOT NULL, -- Normalized 0.00 to 10.00 scale
    evaluator_user_id UUID NOT NULL,
    evaluator_role VARCHAR(30) NOT NULL,
    narrative_notes TEXT,
    logged_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 6. Multi-Channel In-App Chat Boxes with Office Hours Guardrails (`/apps/chat-boxes`)

### 6.1 Domain Concept & Guarded Communication
Unregulated teacher-parent messaging on commercial apps (WhatsApp, Telegram) results in educators receiving midnight queries, blurriness of professional boundaries, and zero institutional audit history.

The **In-App Chat Boxes Subsystem** provides secure, auditable, and bounded communication:

### 6.2 Communication Channels & Guardrails
1. **Parent-Teacher Direct DM**:
   - **Office Hours Enforcement**: Teachers configure active messaging windows (e.g. 08:00 to 16:30 Mon-Fri).
   - Messages sent outside office hours trigger a polite automated reply: *"Teacher [Name] is currently off-duty. Your message will be reviewed during school hours at 08:00 AM"*.
2. **Class Broadcast Channel**:
   - One-way messaging: Only homeroom teacher and school admins can post announcements, homework alerts, or event reminders. Parents and students have read-only access with reaction taps.
3. **Faculty Department Rooms**:
   - Encrypted internal channels for subject department teachers (e.g. Math Dept, Science Dept) to share curriculum ideas and lesson plans.
4. **Student Group Study Circles**:
   - Time-bounded, teacher-supervised study groups for collaborative projects.
   - Integrated content moderation: Automated text filters block profanity and abusive keywords, immediately flagging violations to school administrators.

### 6.3 Data Model
```sql
CREATE TABLE app_chat_channels (
    channel_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    branch_id UUID NOT NULL,
    channel_type VARCHAR(30) NOT NULL CHECK (channel_type IN ('PARENT_TEACHER_DM', 'CLASS_BROADCAST', 'FACULTY_DEPT', 'STUDENT_STUDY_GROUP')),
    channel_name VARCHAR(120) NOT NULL,
    course_subject_id UUID,
    grade_section_id UUID,
    is_broadcast_only BOOLEAN NOT NULL DEFAULT FALSE,
    office_hours_start TIME DEFAULT '08:00:00',
    office_hours_end TIME DEFAULT '16:30:00',
    created_by_user_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

CREATE TABLE app_chat_messages (
    message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    channel_id UUID NOT NULL REFERENCES app_chat_channels(channel_id),
    sender_user_id UUID NOT NULL,
    sender_role VARCHAR(30) NOT NULL,
    message_text TEXT NOT NULL,
    attachment_url VARCHAR(255),
    is_moderated_flag BOOLEAN NOT NULL DEFAULT FALSE,
    is_delivered BOOLEAN NOT NULL DEFAULT TRUE,
    sent_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
CREATE INDEX idx_chat_messages_channel ON app_chat_messages(tenant_id, channel_id, sent_at DESC);
```

---

## 7. Zero-Emoji Compliance & Design Tokens

In strict compliance with platform design directives:
- **Zero Emoji**: No emojis, smiley faces, or unicode glyphs are permitted anywhere in code, mobile screens, or documentation.
- **Google Material Symbols Outlined (`wght 500`)**:
  - Class Notes Sync: `document_scanner`
  - Location Checkpoints: `pin_drop`
  - Zone Occupancy: `meeting_room`
  - Touch Homework Markup: `draw`
  - Voice Feedback: `mic`
  - Toggled Timetable: `swap_calls`
  - Proxy Dispatch: `supervised_user_circle`
  - Student Trajectory: `insights`
  - Secure Chat Boxes: `forum`
  - Profile Customizer: `manage_accounts`
- **Typographic Triad**:
  - English: Ubuntu (`font-ubuntu`)
  - Khmer UI: Google Sans Khmer (`font-khmer`) with zero-width spaces (`\u200B`)
  - Diplomas & Certificates: Moul (`font-moul`)
  - Numeric & System Codes: JetBrains Mono (`font-mono`)
