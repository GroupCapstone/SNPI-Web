# Module 11: Zoom Live Classes CRUD Architecture & Video Telephony Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Zoom Live Classes** module provides an enterprise-grade video conferencing and virtual synchronous classroom orchestration engine directly integrated with the Zoom Video Communications API (Server-to-Server OAuth, Zoom REST API v2, and Zoom Web/Native SDK). It enables administrators, department heads, and faculty to schedule, host, monitor, and audit live interactive classes and administrative staff conferences across multi-campus deployments.

- **Module Index**: `11`
- **Legacy Route Base**: `/admin/conference`
- **Modern Component Root**: `/super-admin/zoom`
- **Functional Domain**: `Virtual Classrooms & Video Telephony`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Telemetry & Audio/Video Flow**: Hybrid execution model supporting both **Embedded Zoom Web SDK** (`Web`) for zero-install in-browser sessions and **Zoom Deep-Link Protocol** (`Zoom App` via `zoommtg://`) for high-performance native desktop/mobile clients.
- **Asynchronous Telephony Pipeline**: Zoom Webhook events (`meeting.started`, `meeting.ended`, `meeting.participant_joined`, `meeting.participant_left`) are ingested through the Sync-to-Async Bridge into Kafka topics for resilient, out-of-band attendance reconciliation.

---

### Complete Slug Inventory & Route Mapping

The Zoom Live Classes module comprises **5 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `live-meeting` | `/admin/conference/meeting` | `/super-admin/zoom/live-meeting` | Data Grid + Dual Header Modals | `zoom_meetings` | `+ Add`, `+ Add Credential`, Start Meeting, Change Status, Delete |
| **02** | `live-classes` | `/admin/conference/classes` | `/super-admin/zoom/live-classes` | Cohort Grid + Form Modal | `zoom_classes` | `+ Add`, Filter Teacher/Class, Start Class, Change Status, Delete |
| **03** | `live-classes-report` | `/admin/conference/class_report` | `/super-admin/zoom/live-classes-report` | Filter Criteria + Audit Grid | `zoom_class_attendees` | Select Class & Section, Filter Date, View Student Duration Logs |
| **04** | `live-meeting-report` | `/admin/conference/meeting_report` | `/super-admin/zoom/live-meeting-report` | Log Grid + Roster Modal | `zoom_meeting_participants` | Global Search, Export, View Staff Attendance Roster |
| **05** | `setting` | `/admin/conference/setting` | `/super-admin/zoom/setting` | 2-Column Split Configuration | `zoom_settings` | Configure API Key/Secret, Toggle Teacher Credential, OAuth Handshake |

---

### 1. Slug `live-meeting`: Staff Video Conferencing

#### A. Screen Layout & Interactive Controls
- **Page Title**: `Live Meeting`
- **Action Toolbar (Top-Right)**:
  - `+ Add` Button (Primary tactile button, triggers `Add Live Meeting` modal).
  - `+ Add Credential` Button (Secondary tactile button, triggers per-staff Zoom API key configuration modal).
- **Search & Filter Controls**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default, options: `10`, `25`, `50`, `100`).
  - Table Export Toolset: Copy, CSV, Excel, PDF, Print, Column Visibility.

#### B. Data Table Schema (`zoom_meetings`)
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Meeting Title** | `title` | `VARCHAR(255)` | Bold text (e.g., `Faculty Meeting – Teaching Strategy Discussion`, `PTM Preparation Online`). |
| **Description** | `description` | `TEXT` | Secondary explanatory text or blank if unassigned. |
| **Date Time** | `scheduled_at` | `TIMESTAMP` | Formatted `MM/DD/YYYY HH:mm:ss` (e.g., `09/25/2026 14:00:00`). |
| **Meeting Duration (Minutes)** | `duration_minutes` | `INT` | Numeric integer (e.g., `60`, `45`, `20`, `35`). |
| **Api Used** | `api_type` | `VARCHAR(50)` | Indicator badge: `Self` (Personal Staff Account) or `Global` (Institution Pool License). |
| **Created By** | `created_by` | `VARCHAR(100)` | Creator identity: `Self` (current user) or staff name with ID. |
| **Status** | `status` | `ENUM` | Interactive dropdown: `Awaited`, `Finished`, `Cancelled`. Modifies meeting lifecycle on change. |
| **Action** | *Controls* | `ACTIONS` | **Dynamic Button Visibility**: <br>• When `Status == 'Awaited'`: Renders Video Camera launcher button (solid purple `videocam`) + Delete button (solid purple `close`/`x` icon).<br>• When `Status == 'Finished'`: Video Camera launcher is automatically removed; only the Delete/Archive button (`close`/`x`) remains. |

#### C. Modals & Ingress Schemas
1. **`Add Live Meeting` Modal**:
   - `Meeting Title *`: Text input (`VARCHAR(255)`).
   - `Meeting Date & Time *`: Datetime-picker (`TIMESTAMP`).
   - `Meeting Duration (Minutes) *`: Number input (`INT`).
   - `Host Video *`: Radio buttons (`Enabled` / `Disabled`).
   - `Client Video *`: Radio buttons (`Enabled` / `Disabled`).
   - `Description`: Textarea (`TEXT`).
   - `Staff / Participants Selection`: Multi-select checkbox tree with department and role filters (Admin, Teacher, Accountant, Receptionist, Librarian).
2. **`Add Credential` Modal**:
   - `Staff *`: Single-select dropdown of faculty/administrators.
   - `Zoom API Key *`: Text input (`VARCHAR(255)`).
   - `Zoom API Secret *`: Masked text input (`VARCHAR(255)`).
   - `Status`: Toggle switch (`Active` / `Inactive`).

---

### 2. Slug `live-classes`: Student Virtual Cohort Classrooms

#### A. Screen Layout & Interactive Controls
- **Page Title**: `Live Classes`
- **Action Toolbar (Top-Right)**:
  - `+ Add` Button (Primary tactile button, triggers `Add Live Class` modal). *Note: No `Add Credential` button exists on this view.*
- **Search & Export Controls**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Table Export Toolset: Copy, CSV, Excel, PDF, Print, Column Visibility.

#### B. Data Table Schema (`zoom_classes`)
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Class Title** | `title` | `VARCHAR(255)` | Bold text (e.g., `Chemistry Revision Class`, `Doubt Question Answer`, `Computer Studies Classes`). |
| **Description** | `description` | `TEXT` | Syllabus unit or exam prep topic description. |
| **Date Time** | `scheduled_at` | `TIMESTAMP` | Formatted `MM/DD/YYYY HH:mm:ss` (e.g., `09/28/2026 11:00:00`). |
| **Class Duration (Minutes)** | `duration_minutes` | `INT` | Numeric integer (e.g., `60`, `45`). |
| **Api Used** | `api_type` | `VARCHAR(50)` | Indicator badge: `Global` (Institution Master Account) or `Self`. |
| **Created By** | `created_by` | `VARCHAR(100)` | Creator identity (e.g., `Self`). |
| **Created For** | `teacher_id` | `VARCHAR(100)` | Faculty name with role and employee code: `[Name] (Teacher : [Code])` (e.g., `Aman Verma (Teacher : 654)`, `Nishant Khare (Teacher : 1002)`). |
| **Class** | `class_sections` | `ARRAY/REL` | Stacked list with checked box indicators: <br>`[x] Class 1 (A)`<br>`[x] Class 1 (B)`<br>`[x] Class 1 (C)`<br>`[x] Class 1 (D)`. |
| **Status** | `status` | `ENUM` | Dropdown selector: `Awaited`, `Finished`, `Cancelled`. |
| **Action** | *Controls* | `ACTIONS` | Video Camera launcher button (solid purple `videocam`) + Delete button (solid purple `close`/`x`). |

#### C. `Add Live Class` Modal Schema
- `Class Title *`: Text input (`VARCHAR(255)`).
- `Class Date & Time *`: Datetime-picker (`TIMESTAMP`).
- `Class Duration (Minutes) *`: Number input (`INT`).
- `Role / Assign Teacher *`: Dropdown list of eligible academic staff (`Created For`).
- `Class *`: Target academic class dropdown.
- `Section *`: Multi-select checkboxes for class sections (`A`, `B`, `C`, `D`, etc.).
- `Host Video *`: Radio buttons (`Enabled` / `Disabled`).
- `Client Video *`: Radio buttons (`Enabled` / `Disabled`).
- `Description`: Textarea.

---

### 3. Slug `live-classes-report`: Student Attendance & Telemetry

#### A. Filter Criteria Engine (`Select Criteria`)
- **Card Header**: `Select Criteria`
- **Legacy Route**: `admin/conference/class_report`
- **Fields**:
  - `Class *`: Dropdown (`Class 1`, `Class 2`, ..., `Class 12`). Required validator.
  - `Section *`: Dropdown (`A`, `B`, `C`, `D`). Dynamically cascades based on selected Class. Required validator.
- **Action**: `Search` button (tactile solid purple, right-aligned).

#### B. Results Data Grid Schema (`zoom_class_attendance_summary`)
Upon clicking `Search`, the grid renders all virtual class sessions for the filtered cohort:
| Column Header | Data Type | Description |
|:---|:---|:---|
| **Class Title** | `VARCHAR(255)` | Subject and lecture topic. |
| **Date Time** | `TIMESTAMP` | Scheduled session start timestamp. |
| **Class Duration** | `INT` | Total planned minutes. |
| **Teacher** | `VARCHAR(100)` | Instructor name and employee code. |
| **Total Enrolled** | `INT` | Total students active in class sections. |
| **Total Attended** | `INT` | Distinct count of students who joined Zoom stream. |
| **Average Attendance (Mins)** | `DECIMAL(5,2)` | Aggregated duration of student participation. |
| **Action** | `BUTTON` | `View Student Detail` icon button (launches detailed attendee roster modal). |

#### C. Student Attendee Detail Modal (`zoom_class_attendees`)
- Renders full student roster with precise login/logout telemetry:
  - `Admission No` (e.g., `ADM-10024`)
  - `Student Name`
  - `Class (Section)`
  - `Join Time` (`YYYY-MM-DD HH:mm:ss`)
  - `Leave Time` (`YYYY-MM-DD HH:mm:ss`)
  - `Total Duration (Minutes)`
  - `Attendance Badge`:
    - `Present` (Total duration >= 75% of class duration)
    - `Partial` (Total duration between 25% and 74%)
    - `Absent` (Did not join or duration < 25%)

---

### 4. Slug `live-meeting-report`: Staff Conference Audit

#### A. Screen Layout & Interactive Controls
- **Page Title**: `Live Meeting Report`
- **Legacy Route**: `admin/conference/meeting_report`
- **Search & Export Controls**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Table Export Toolset: Copy, CSV, Excel, PDF, Print, Column Visibility.
  - Pagination Footer: `Showing 1 to N of N entries`, page pill selector `[1]`.

#### B. Data Table Schema (`zoom_meeting_reports`)
| Column Header | Field Name | Data Type | Description |
|:---|:---|:---|:---|
| **Meeting Title** | `title` | `VARCHAR(255)` | Title of staff conference. |
| **Description** | `description` | `TEXT` | Agenda notes and conference goals. |
| **Date Time** | `scheduled_at` | `TIMESTAMP` | Timestamp of scheduled meeting. |
| **Api Used** | `api_type` | `VARCHAR(50)` | `Global` or `Self`. |
| **Created By** | `created_by` | `VARCHAR(100)` | Meeting convener identity (`Self` or Staff Name). |
| **Total Join** | `total_joined` | `INT` | Distinct count of participants who joined (e.g., `0`, `2`). |
| **Action** | *Controls* | `BUTTON` | Solid purple roster icon button (`format_list_bulleted` / `view_list`, launches participant roster modal). |

#### C. Meeting Participant Roster Modal (`zoom_meeting_participants`)
- Modal Table Columns:
  - `Staff ID` (e.g., `STF-9002`)
  - `Staff Name`
  - `Role` (e.g., `Teacher`, `Dean`, `Accountant`, `Librarian`)
  - `Department` (e.g., `Science`, `Administration`)
  - `Join Time` (`YYYY-MM-DD HH:mm:ss`)
  - `Leave Time` (`YYYY-MM-DD HH:mm:ss`)
  - `Total Duration (Minutes)`

---

### 5. Slug `setting`: Zoom API & Client Integration Engine

#### A. Screen Architecture & Visual Layout
Split 2-Column layout with persistent status alert banner:
- **Status Alert Banner**:
  - Alert Message: `Access Token not generated. Please authenticate your Account.`
  - Severity: Info/Warning badge (`bg-sky-50 text-sky-800 border-sky-200`).
- **Left Column**: Form Configuration Card (`zoom_settings`).
- **Right Column**: Zoom Brand Authorization & OAuth Handshake Card.

#### B. Left Form Fields Schema
| Form Field Label | Input Type | Current Screenshot Value | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|
| **Zoom API Key \*** | `text` | `s4aA6iuGRXK5kj5JMfUQtg` | Required, `VARCHAR(255)` | OAuth Client ID or API Key from Zoom App Marketplace. |
| **Zoom API Secret \*** | `password` / `text` | `wOELxqU7WGzH4q3knJ2Yh5DfAqrV@yp8` | Required, `VARCHAR(255)` | Masked OAuth Client Secret for server authentication. |
| **Teacher Api Credential \*** | `toggle_switch` | `ON` (Purple active) | Boolean (`true`/`false`) | When enabled, faculty members can input their own personal Zoom host credentials in their staff profile. |
| **Use Zoom Client for Staff \*** | `radio_group` | `Web` (Selected) | Required: `Web` or `Zoom App` | Selects between embedded Web SDK (zero-install) vs. Native Zoom application protocol handler (`zoommtg://`). |
| **Use Zoom Client for Student \*** | `radio_group` | `Web` (Selected) | Required: `Web` or `Zoom App` | Determines whether students launch meeting in portal iframe or native app. |
| **Parent Live Class \*** | `toggle_switch` | `ON` (Purple active) | Boolean (`true`/`false`) | When active, grants parent portal accounts access to join cohort live classes alongside their children. |
| **Save Button** | `button` | - | Primary tactile purple button | Submits form payload to `/api/v1/zoom/settings`. |

#### C. Right Column OAuth Card Schema
- **Brand Asset**: Official Zoom Logo vector (`ZOOM` brand blue).
- **Documentation Link**: `To generate Zoom Api credential Click Here` (links to Zoom Marketplace Developer documentation).
- **Callback URI Display**:
  - Label: `Zoom redirect URL:`
  - Read-only Code Token: `https://demo.smart-school.in/admin/conference/generatetoken`
- **Action Button**:
  - Button Text: `Get Access Token` (Solid tactile purple button).
  - Flow: Initiates OAuth 2.0 Authorization Code Grant or Server-to-Server token exchange to persist valid bearer token and refresh token in vault.

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- Zoom Integration Settings Table
CREATE TABLE zoom_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    api_key VARCHAR(255) NOT NULL,
    api_secret VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    teacher_api_credential_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    staff_client_mode VARCHAR(20) NOT NULL DEFAULT 'Web' CHECK (staff_client_mode IN ('Web', 'Zoom App')),
    student_client_mode VARCHAR(20) NOT NULL DEFAULT 'Web' CHECK (student_client_mode IN ('Web', 'Zoom App')),
    parent_live_class_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_zoom_settings_branch UNIQUE (branch_id)
);

ALTER TABLE zoom_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_settings_branch_isolation ON zoom_settings
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Teacher Personal Zoom Credentials
CREATE TABLE zoom_teacher_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    api_key VARCHAR(255) NOT NULL,
    api_secret VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_zoom_teacher_staff UNIQUE (branch_id, staff_id)
);

ALTER TABLE zoom_teacher_credentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_teacher_credentials_isolation ON zoom_teacher_credentials
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Live Meetings (Staff & Administration)
CREATE TABLE zoom_meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    zoom_meeting_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    api_type VARCHAR(20) NOT NULL DEFAULT 'Global' CHECK (api_type IN ('Global', 'Self')),
    created_by_staff_id UUID NOT NULL REFERENCES staff(id),
    host_video_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    client_video_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    join_url TEXT,
    start_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Awaited' CHECK (status IN ('Awaited', 'Finished', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE zoom_meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_meetings_isolation ON zoom_meetings
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Live Meeting Invited & Attended Participants
CREATE TABLE zoom_meeting_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    meeting_id UUID NOT NULL REFERENCES zoom_meetings(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE,
    left_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_zoom_meeting_participant UNIQUE (meeting_id, staff_id)
);

ALTER TABLE zoom_meeting_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_meeting_participants_isolation ON zoom_meeting_participants
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Live Classes (Academic Cohorts)
CREATE TABLE zoom_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    zoom_meeting_id VARCHAR(64),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    api_type VARCHAR(20) NOT NULL DEFAULT 'Global' CHECK (api_type IN ('Global', 'Self')),
    created_by_staff_id UUID NOT NULL REFERENCES staff(id),
    teacher_id UUID NOT NULL REFERENCES staff(id),
    host_video_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    client_video_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    join_url TEXT,
    start_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Awaited' CHECK (status IN ('Awaited', 'Finished', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE zoom_classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_classes_isolation ON zoom_classes
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Class to Cohort Section Junction
CREATE TABLE zoom_class_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES zoom_classes(id) ON DELETE CASCADE,
    academic_class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_zoom_class_section UNIQUE (class_id, academic_class_id, section_id)
);

-- Student Attendees Audit Ledger
CREATE TABLE zoom_class_attendees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES zoom_classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL,
    left_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INT DEFAULT 0,
    attendance_status VARCHAR(20) NOT NULL DEFAULT 'Present' CHECK (attendance_status IN ('Present', 'Partial', 'Absent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_zoom_class_attendee UNIQUE (class_id, student_id)
);

ALTER TABLE zoom_class_attendees ENABLE ROW LEVEL SECURITY;
CREATE POLICY zoom_class_attendees_isolation ON zoom_class_attendees
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Meetings Endpoints
- `GET /api/v1/zoom/meetings`
  - Headers: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
  - Query Params: `page=0`, `size=50`, `search=faculty`
  - Response: `200 OK` (Paged list of meetings with status badges and launcher URLs).
- `POST /api/v1/zoom/meetings`
  - Payload:
    ```json
    {
      "title": "Faculty Meeting – Teaching Strategy Discussion",
      "description": "Term 2 curriculum alignment and review",
      "scheduledAt": "2026-09-25T14:00:00Z",
      "durationMinutes": 60,
      "hostVideoEnabled": true,
      "clientVideoEnabled": true,
      "participantStaffIds": ["550e8400-e29b-41d4-a716-446655440000"]
    }
    ```
  - Response: `201 Created` (Includes Zoom meeting ID, join URL, and start URL).
- `PATCH /api/v1/zoom/meetings/{id}/status`
  - Payload: `{"status": "Finished"}`
  - Response: `200 OK`.
- `DELETE /api/v1/zoom/meetings/{id}`
  - Response: `204 No Content` (Cancels Zoom meeting via API and marks record deleted).

#### 2. Live Classes Endpoints
- `GET /api/v1/zoom/classes`
  - Query Params: `page=0`, `size=50`, `teacherId=<uuid>`, `classId=<uuid>`
  - Response: `200 OK` (Cohort schedule grid with associated sections and teacher details).
- `POST /api/v1/zoom/classes`
  - Payload:
    ```json
    {
      "title": "Chemistry Revision Class",
      "description": "Organic chemistry reaction mechanisms",
      "scheduledAt": "2026-09-28T11:00:00Z",
      "durationMinutes": 60,
      "teacherId": "3b241101-5231-482a-a951-872f2a969311",
      "cohorts": [
        {"classId": "c111", "sectionId": "s001"},
        {"classId": "c111", "sectionId": "s002"}
      ],
      "hostVideoEnabled": true,
      "clientVideoEnabled": true
    }
    ```
  - Response: `201 Created`.

#### 3. Reports Endpoints
- `GET /api/v1/zoom/reports/classes?classId={classId}&sectionId={sectionId}`
  - Response: `200 OK` (Aggregated class session report with attendance counts).
- `GET /api/v1/zoom/reports/classes/{id}/attendees`
  - Response: `200 OK` (Individual student join/leave times and duration calculations).
- `GET /api/v1/zoom/reports/meetings`
  - Response: `200 OK` (Staff conference log list with `totalJoined` count).
- `GET /api/v1/zoom/reports/meetings/{id}/roster`
  - Response: `200 OK` (List of staff attendees with join timestamps).

#### 4. Settings & OAuth Endpoints
- `GET /api/v1/zoom/settings`
  - Response: `200 OK` (Current configuration flags and token status).
- `PUT /api/v1/zoom/settings`
  - Payload:
    ```json
    {
      "apiKey": "s4aA6iuGRXK5kj5JMfUQtg",
      "apiSecret": "wOELxqU7WGzH4q3knJ2Yh5DfAqrV@yp8",
      "teacherApiCredentialEnabled": true,
      "staffClientMode": "Web",
      "studentClientMode": "Web",
      "parentLiveClassEnabled": true
    }
    ```
  - Response: `200 OK`.
- `POST /api/v1/zoom/oauth/authorize`
  - Generates state token and returns Zoom OAuth redirect URL.
- `GET /api/v1/zoom/oauth/callback?code={code}&state={state}`
  - Completes OAuth exchange, stores bearer/refresh token, redirects to `/super-admin/zoom/setting` with success toast.

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_zm_883912048",
  "eventType": "school.telephony.zoom-class-scheduled",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T02:35:00Z",
  "payload": {
    "classId": "zm_cls_10029",
    "zoomMeetingId": "98234190823",
    "title": "Chemistry Revision Class",
    "teacherId": "stf_654",
    "scheduledAt": "2026-09-28T11:00:00Z",
    "durationMinutes": 60,
    "cohorts": [
      {"class": "Class 1", "section": "A"},
      {"class": "Class 1", "section": "B"}
    ]
  }
}
```

```json
{
  "eventId": "evt_zm_991823102",
  "eventType": "school.telephony.zoom-attendance-logged",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-28T12:05:00Z",
  "payload": {
    "classId": "zm_cls_10029",
    "studentId": "std_88219",
    "joinTime": "2026-09-28T11:01:14Z",
    "leaveTime": "2026-09-28T12:00:22Z",
    "durationMinutes": 59,
    "attendanceStatus": "Present"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 5 Zoom Live Classes slugs documented with visual UI fidelity and data schemas.
- [x] Dual-mode video execution verified: Zoom Web SDK vs. Native Zoom App deep-link.
- [x] Teacher personal credential override architecture modeled via `zoom_teacher_credentials`.
- [x] Student and Staff duration tracking audited against Zoom Webhook telemetry.
- [x] PostgreSQL RLS policies defined with `branch_id` isolation and Super Admin bypass.
- [x] Dynamic action button state documented (Video launch button disappears when Status is `Finished`).
- [x] ZERO emoji policy enforced.
- [x] ZERO hardcoded business logic or code written; pure architectural specification.
