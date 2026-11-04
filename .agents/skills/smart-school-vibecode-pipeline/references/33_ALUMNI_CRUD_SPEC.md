# Module 33: Alumni CRUD Architecture & Graduate Relations Specification

## 1. Domain Overview & Taxonomy

The **Alumni** domain manages institutional graduate records, post-graduation career tracking, alumni directory lookups, reunion scheduling, and institutional events targeted at former student cohorts. It bridges historical academic sessions with lifelong institutional engagement, enabling alumni coordinators to maintain contact networks and plan commemorative programs.

```
/super-admin/alumni or /admin/alumni
├── /manage-alumni   (Manage Alumni - Cohort filtering, admission number query, graduate registry)
└── /events          (Events - Interactive monthly calendar, reunion event manager, session targeting)
```

---

## 2. Exhaustive Slug Specifications

### 2.1. Slug: `manage-alumni` (`/super-admin/alumni/manage-alumni` or `/admin/alumni`)

- **Screen Layout Structure**:
  - **Top Section**: "Select Criteria" Dual Search Engine Card.
  - **Bottom Section (Post-Query)**: Alumni Graduate Directory Data Table Card.
- **Form Controls & Constraints (Select Criteria)**:
  - **Dual Query Partition**:
    - **Criteria Search (Cohort Query)**:
      - `Pass Out Session *`: Single-select dropdown referencing academic sessions (e.g. `2024-25`, `2023-24`, `2022-23`). Mandatory.
      - `Class *`: Single-select dropdown of graduation classes (e.g. `Class 10`, `Class 12`). Mandatory.
      - `Section`: Single-select dropdown of sections (e.g. `A`, `B`, `All`). Optional.
      - `Search` Button: Solid purple button (`#6366f1` / `#7c3aed`), executes cohort query.
    - **Direct Search (Identifier Query)**:
      - `Search By Admission Number`: Text input field with placeholder `Search By Admission Number`.
      - `Search` Button: Solid purple button, executes exact admission record lookup.
- **Table Controls & Data Display (Alumni Directory)**:
  - Toolbar with Search, Page size (50), Export tools (Copy, Excel, CSV, PDF, Print, Column Visibility).
  - **Columns**:
    1. `Admission No` (String, sortable, e.g. `18001`)
    2. `Student Name` (String with avatar preview)
    3. `Class` (String, e.g. `Class 10 (A)`)
    4. `Gender` (String: `Male`, `Female`)
    5. `Current Phone` (Phone number string)
    6. `Current Email` (Email string)
    7. `Occupation` (Professional designation/company)
    8. `Current Address` (City / State text)
    9. `Action` (Control strip: View Profile modal, Edit Contact, Delete)

---

### 2.2. Slug: `events` (`/super-admin/alumni/events` or `/admin/alumni/events`)

- **Screen Layout Structure**:
  - **Split Interactive Dual-View Layout**:
    - **Left Section (50% width)**: Interactive Monthly Calendar Grid Card.
    - **Right Section (50% width)**: "Event List" Data Table Card with top-right `Add Event` action.
- **Left Calendar Grid Controls**:
  - Month Header: Current month label (e.g. `September 2026`), navigation arrows (`< >`).
  - Days of Week Header: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`.
  - Date blocks rendering day numbers (1 to 31) with visual event dot badges highlighting dates containing scheduled alumni reunions or meetings.
- **Right Table Controls & Data Display (Event List)**:
  - Header with `Add Event` purple button (`#6366f1` / `#7c3aed`).
  - Toolbar with quick search, page length (`50`), export icons (Copy, Excel, CSV, PDF, Print, Columns).
  - **Columns**:
    1. `Event Title` (String, sortable, e.g. `Christmas Celebration`)
    2. `Class Section` (Cohort string, e.g. `All`, `Class 10 - A`)
    3. `Pass Out Session` (Session string, e.g. `2024-25`, `All`)
    4. `From` (Start date, format `MM/DD/YYYY`, e.g. `12/22/2025`)
    5. `To` (End date, format `MM/DD/YYYY`, e.g. `12/26/2025`)
    6. `Action` (Control strip: View Event Details modal [three horizontal lines], Edit [pencil], Delete [cross])
  - **Ground Truth Seeded Records**:
    - `Christmas Celebration` | `All` | *(blank/All)* | `12/22/2025` | `12/26/2025` | View, Edit, Delete
    - `New Academic admission start (2025-26)` | `All` | *(blank/All)* | `04/01/2025` | `04/15/2025` | View, Edit, Delete
    - `Government scholarship exam, 2024` | `All` | *(blank/All)* | `10/14/2024` | `10/20/2024` | View, Edit, Delete
  - **Pagination & Counter**: `Showing 1 to 3 of 3 entries`, page button `< 1 >`.
- **Creation Modal Controls (`Add Event`)**:
  - `Event Title *`: Text input. Mandatory.
  - `Event For`: Radio option (`All Alumni` vs `Specific Cohort`).
  - `Pass Out Session`: Dropdown selector (when specific cohort is chosen).
  - `Class` & `Section`: Dropdown selectors.
  - `From Date *` & `To Date *`: Date pickers. Mandatory.
  - `Note / Description`: Textarea for event itinerary, venue, registration fees, or dress code.
  - `Save` Button: Persists alumni event and synchronizes calendar grid.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Alumni Profiles Master Table
CREATE TABLE alumni_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    pass_out_session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE RESTRICT,
    graduation_class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICT,
    current_phone VARCHAR(50),
    current_email VARCHAR(150),
    occupation VARCHAR(150),
    current_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_alumni_student UNIQUE (student_id)
);

-- Alumni Events Master Table
CREATE TABLE alumni_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    event_for VARCHAR(50) NOT NULL DEFAULT 'ALL' CHECK (event_for IN ('ALL', 'SPECIFIC_COHORT')),
    pass_out_session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    section_id UUID REFERENCES sections(id) ON DELETE SET NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning searches
CREATE INDEX idx_alumni_session ON alumni_students(pass_out_session_id);
CREATE INDEX idx_alumni_events_date ON alumni_events(from_date, to_date);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/alumni` | Search alumni directory | `?passOutSessionId=uuid&classId=uuid` | `200 OK` (Array of Alumni) |
| `GET` | `/api/v1/alumni/by-admission`| Search by admission number | `?admissionNo=str` | `200 OK` (Alumni Record) |
| `PUT` | `/api/v1/alumni/{id}` | Update alumni contact/job | `{ currentPhone, currentEmail, occupation... }` | `200 OK` |
| `GET` | `/api/v1/alumni/events` | List alumni events | `?branchId=uuid&month=2026-09` | `200 OK` (Events List) |
| `POST` | `/api/v1/alumni/events` | Create alumni event | `{ title, eventFor, fromDate, toDate, note }` | `201 Created` |
| `DELETE`| `/api/v1/alumni/events/{id}`| Cancel/delete alumni event| *(none)* | `204 No Content` |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever alumni events are published or graduate profiles updated, events are emitted to `school.alumni.events`:

```json
{
  "eventId": "b304a918-2940-4217-a128-cf9021dae841",
  "eventType": "school.alumni.event-scheduled",
  "aggregateId": "event-uuid-3391-ab10",
  "timestamp": "2026-09-12T03:36:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN"
  },
  "payload": {
    "eventId": "event-uuid-3391-ab10",
    "title": "Christmas Celebration",
    "fromDate": "2025-12-22",
    "toDate": "2025-12-26",
    "eventFor": "ALL"
  }
}
```
