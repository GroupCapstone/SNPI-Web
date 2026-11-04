# Module 20: Annual Calendar CRUD Architecture & Institutional Events Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Annual Calendar** module coordinates institutional scheduling, term dates, national holidays, vacations, academic events, sports meets, and parent-teacher conferences across campuses. It serves as the single source of operational truth for attendance calculation (excluding official holidays from absence tallies), public website calendars, teacher instructional pacing, and multi-branch schedule synchronization.

- **Module Index**: `20`
- **Legacy Route Base**: `/admin/holiday`
- **Modern Component Root**: `/super-admin/annual-calendar`
- **Functional Domain**: `Institutional Scheduling, Holidays & Public Event Calendar`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Attendance Engine Integration**: Dates classified under `Holiday` or `Vacation` automatically suppress student/staff daily absence flags and turnstile delinquency alerts.
- **Public CMS Synchronization**: Events flagged with `Front Site = Yes` automatically publish to the public website front calendar endpoint (`/api/v1/public/calendar`) via Kafka event stream (`school.operations.calendar-event-created`).

---

### Complete Slug Inventory & Route Mapping

The Annual Calendar module comprises **2 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `annual-calendar` | `/admin/holiday/index` | `/super-admin/annual-calendar` | Filter Criteria + Comprehensive Calendar Ledger | `annual_calendar_events` | `+ Add` Event modal, Filter by Type, View Date/Type/Description/Front Site, Edit, Delete |
| **02** | `holiday-type` | `/admin/holiday/type` | `/super-admin/annual-calendar/holiday-type` | Split 2-Column (Pattern B) | `holiday_types` | Add Custom Type, Protect System Records, Edit, Delete |

---

### 1. Slug `annual-calendar`: Institutional Master Event Schedule

#### A. Screen Architecture & Visual Layout
Top Filter Criteria Card + Bottom Master Calendar Data Grid:
- **Card 1 (`Annual Calendar`)**:
  - Top Action Trigger: `+ Add` (Solid tactile purple button on top right, launches `Add Event` modal).
  - Criteria Form:
    - `Type *`: Single-select dropdown selector (populated with holiday/event types, e.g., `Activity`, `EVENTS`, `School Events`, `Holiday`, `Vacation`).
    - `Search` Button: Solid blue/purple tactile button with magnifying glass icon.
- **Card 2 (`Calendar List`)**:
  - Search input box with instant text debounce.
  - Page size dropdown selector (`50` rows per page).
  - Export suite toolbar: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`.

#### B. Master Data Table Schema (`annual_calendar_events`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Exact Screen Records Sample |
|:---|:---|:---|:---|:---|
| **Date** | `date_range` | `VARCHAR(50)` | Formatted interval `MM/DD/YYYY To MM/DD/YYYY`. | `09/25/2026 To 09/30/2026`<br>`09/19/2026 To 09/24/2026`<br>`08/15/2026 To 08/15/2026`<br>`05/01/2026 To 05/31/2026` |
| **Type** | `holiday_type` | `VARCHAR(50)` | Categorical label. | `Activity`, `EVENTS`, `School Events`, `Holiday`, `Vacation`. |
| **Description** | `description` | `TEXT` | Event title or operational description. | `Monthly Assembly`, `Science Exhibition 2026`, `Independence Day Celebration`, `Summer Vacation`, `Parent-Teacher Meeting (PTM)`. |
| **Created By** | `created_by_staff` | `VARCHAR(100)` | Author name and staff code. | `Joe Black (9000)`. |
| **Front Site** | `show_on_front_site`| `BADGE` / `TEXT` | `Yes` or `No` indicator. | `Yes` (Public), `No` (Internal only, e.g., CBSE Periodic Test - II). |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`delete` trash can). |

#### C. `+ Add Event` Modal Schema

| Field Label | Field Name | Input Type | Validation & Options |
|:---|:---|:---|:---|
| **Type \*** | `holiday_type_id` | `SELECT` | Required dropdown populated from `holiday_types`. |
| **Title / Description \***| `description` | `TEXT_INPUT` | Required summary statement (e.g., `Annual Sports Day 2026`). |
| **Date From \*** | `from_date` | `DATEPICKER` | Required start date. |
| **Date To \*** | `to_date` | `DATEPICKER` | Required end date (must be >= `from_date`). |
| **Front Site** | `show_on_front_site` | `RADIO_GROUP` | Inline radio choices: `(o) Yes` vs. `( ) No`. Determines public website visibility. |
| **Notes** | `note` | `TEXTAREA` | Optional operational details, staff instructions, dress code. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

---

### 2. Slug `holiday-type`: Event & Holiday Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Holiday Type`.
- **Right Column (~67% width)**: Data Grid Card titled `Holiday Type`.

#### B. Left Form Schema (`Add Holiday Type`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Name \*** | `name` | `TEXT_INPUT` | Required unique name with active purple focus outline. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Holiday Type List`)
- **Controls**: Search input box, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Immutability & Action Logic |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(100)` | Sortable category title. |
| **Action** | *Controls* | `ACTIONS` | Conditional rendering based on `is_system` flag:<br>• System Types (`is_system = true`): Action buttons completely hidden/suppressed to prevent breaking attendance calculation.<br>• Custom Types (`is_system = false`): Edit (`edit` pencil) and Delete (`close`/`x`) purple icon buttons. |

- **Exact Seeded Ground-Truth Records**:
  1. `Holiday` (System Type: Protected, zero action buttons).
  2. `Vacation` (System Type: Protected, zero action buttons).
  3. `Activity` (System Type: Protected, zero action buttons).
  4. `EVENTS` (Custom Type: Actions active).
  5. `School Events` (Custom Type: Actions active).
- **Pagination**: `Showing 1 to 5 of 5 entries`, `< 1 >`.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Holiday & Event Taxonomy
CREATE TABLE holiday_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_holiday_type UNIQUE (branch_id, name)
);

ALTER TABLE holiday_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_holiday_types ON holiday_types
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 2. Master Calendar Events
CREATE TABLE annual_calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    holiday_type_id UUID NOT NULL REFERENCES holiday_types(id) ON DELETE RESTRICTED,
    description TEXT NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    show_on_front_site BOOLEAN NOT NULL DEFAULT TRUE,
    note TEXT,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_calendar_date_range CHECK (to_date >= from_date)
);

CREATE INDEX idx_calendar_branch_dates ON annual_calendar_events(branch_id, from_date, to_date);
CREATE INDEX idx_calendar_public_events ON annual_calendar_events(branch_id, show_on_front_site, from_date);

ALTER TABLE annual_calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_annual_calendar_events ON annual_calendar_events
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );
```

---

### REST API Endpoints & Request Contracts

#### 1. Filter Calendar Events
- **Endpoint**: `GET /api/v1/annual-calendar`
- **Query Parameters**: `holidayTypeId` (UUID, optional), `fromDate` (Date, optional), `toDate` (Date, optional), `search` (String, optional)
- **Response**: Paginated `CalendarEventResponseDto` list.

#### 2. Create Calendar Event
- **Endpoint**: `POST /api/v1/annual-calendar`
- **Payload**:
```json
{
  "holidayTypeId": "3b2a1c0d-1234-5678-90ab-cdef12345678",
  "description": "Science Exhibition 2026",
  "fromDate": "2026-09-19",
  "toDate": "2026-09-24",
  "showOnFrontSite": true,
  "note": "Exhibition open to parents from 10:00 AM to 02:00 PM."
}
```

#### 3. Public Front Site Calendar Feed
- **Endpoint**: `GET /api/v1/public/calendar`
- **Headers**: `X-Branch-ID: <uuid>` (No Auth required)
- **Response**: Array of published events where `showOnFrontSite = true` sorted by `fromDate ASC`.

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.operations.calendar-event-created`
- **Partition Key**: `{branchId}#{eventId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    "eventType": "school.operations.calendar-event-created",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T11:15:00.000Z",
    "correlationId": "a1b2c3d4-5678-90ef-1234-567890abcdef",
    "version": "1.0.0"
  },
  "payload": {
    "calendarEventId": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    "holidayType": "EVENTS",
    "description": "Science Exhibition 2026",
    "fromDate": "2026-09-19",
    "toDate": "2026-09-24",
    "showOnFrontSite": true,
    "createdBy": "Joe Black (9000)"
  }
}
```
