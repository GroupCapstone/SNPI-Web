# Module 17: Attendance CRUD Architecture & Student Daily Presence Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Attendance** module governs daily student roll-call presence, absence tracking, multi-status marking (Present, Late, Absent, Half Day, Holiday), medical/personal leave approvals, and longitudinal cohort presence analytics. It provides teachers, deans, and front office administrators with high-velocity bulk attendance registers, leave authorization workflows with staff audit signatures, and calendar-aligned date-based presence reports.

- **Module Index**: `17`
- **Legacy Route Base**: `/admin/stuattendence`
- **Modern Component Root**: `/super-admin/attendance`
- **Functional Domain**: `Daily Student Presence & Leave Management`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Batch Persistence**: Attendance registers for full classes (30-50 students) are saved as an atomic batch transaction (`POST /api/v1/attendance/student-batch`).
- **Asynchronous Telephony & Notification**: Unmarked or absent statuses trigger automated SMS/Push notifications to parents via Kafka (`school.attendance.student-absent-notified`).

---

### Complete Slug Inventory & Route Mapping

The Attendance module comprises **3 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `student-attendance` | `/admin/stuattendence` | `/super-admin/attendance` | 3-Tier Filter + Bulk Roll Register | `student_attendances` | Select Class/Section/Date, Mass Mark Present, Save Batch |
| **02** | `approve-leave` | `/admin/approve_leave` | `/super-admin/attendance/approve-leave` | Filter + Approval Ledger | `student_leave_requests`| `+ Add`, Approve Leave, Disapprove, Audit Approver |
| **03** | `attendance-by-date` | `/admin/stuattendence/attendencereport` | `/super-admin/attendance/by-date` | Date Filter + Presence Matrix | `student_attendances` | Filter Date, View Class Summary Counts & Percentages |

---

### 1. Slug `student-attendance`: Daily Cohort Roll-Call Register

#### A. Screen Architecture & Visual Layout
Top Filter Card + Bottom Dynamic Roster Grid:
- **Top Card (`Select Criteria`)**:
  - `Class *`: Required single-select dropdown (`Class 1`, `Class 2`, ..., `Class 12`).
  - `Section *`: Required dropdown (`A`, `B`, `C`, `D`), dynamically populated based on Class.
  - `Attendance Date *`: Required datepicker, automatically pre-filled with the active system date (`09/12/2026`).
  - `Search` Button: Right-aligned tactile purple trigger.

#### B. Results Data Grid Schema (`student_attendances` Bulk Intake)
Upon clicking `Search`, renders the full student class roster:
- **Global Actions Toolbar**:
  - `Set All Present` Button (Fast-fill radio options across all students).
  - `Mark As Holiday` Button (Marks entire cohort as holiday).
  - `Save Attendance` Button (Primary tactile purple button).
- **Roster Columns**:
| Column Header | Field Name | Data Type | Interactive Element |
|:---|:---|:---|:---|
| **#** | `row_index` | `INT` | Row number. |
| **Admission No** | `admission_no` | `VARCHAR(50)` | Student identifier link. |
| **Roll Number** | `roll_no` | `VARCHAR(50)` | Class roll sequence. |
| **Name** | `student_name` | `VARCHAR(255)` | Student full name. |
| **Attendance** | `attendance_type` | `RADIO_GROUP` | 5 Radio choices:<br>• `Present` (Green)<br>• `Late` (Orange)<br>• `Absent` (Red)<br>• `Half Day` (Blue)<br>• `Holiday` (Purple) |
| **Remarks** | `remark` | `TEXT` | Single-line text input for teacher comments (e.g., *Late by 15 mins due to rain*). |

---

### 2. Slug `approve-leave`: Student Leave Authorization Hub

#### A. Screen Architecture & Visual Layout
Top Criteria Filter + Bottom Approval Ledger:
- **Top Card (`Select Criteria`)**:
  - `Class *`: Required dropdown.
  - `Section *`: Required dropdown.
  - `Search` Button: Solid purple tactile button.
- **Bottom Card (`Approve Leave List`)**:
  - `+ Add` Button: Top-right tactile purple button (opens `Add Leave` modal).
  - Search input box, page size selector (`50`), 6 export action icons.

#### B. Data Table Schema (`student_leave_requests`)
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Student Name** | `student_id` | `VARCHAR(255)` | Full name with roll/admission code (e.g., `Edward Thomas (1800011)`, `Ashwani Kumar (120020)`, `Ayan Desai (120036)`). |
| **Class** | `class_name` | `VARCHAR(50)` | Cohort grade (e.g., `Class 1`, `Class 2`, `Class 3`). |
| **Section** | `section_name`| `VARCHAR(10)` | Cohort division (e.g., `A`). |
| **Apply Date** | `apply_date` | `DATE` | Formatted `MM/DD/YYYY` (e.g., `09/01/2026`, `09/03/2026`). |
| **From Date** | `from_date` | `DATE` | Leave commencement date (e.g., `09/23/2026`). |
| **To Date** | `to_date` | `DATE` | Leave conclusion date (e.g., `09/26/2026`). |
| **Status** | `status` | `VARCHAR(50)` | Status badge:<br>• `Pending` (Neutral badge)<br>• `Approved (MM/DD/YYYY)` (Green badge with approval date, e.g., `Approved (09/03/2026)`)<br>• `Disapproved` (Red badge) |
| **Approve Disapprove By** | `reviewed_by_staff` | `VARCHAR(100)` | Reviewer name and staff code (e.g., `Joe Black (9000)`). |
| **Action** | *Controls* | `ACTIONS` | Edit (`edit` pencil) and Delete (`delete` trash can) icon buttons. |

#### C. `Add Leave` Modal Schema
- `Apply Date *`: Datepicker (default today).
- `Class *`: Dropdown.
- `Section *`: Dropdown.
- `Student *`: Single-select student search dropdown.
- `From Date *`: Datepicker.
- `To Date *`: Datepicker.
- `Reason`: Textarea.
- `Attach Document`: File dropzone for medical certificates / parent notes.

---

### 3. Slug `attendance-by-date`: Date-Centric Attendance Analytics

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Select Criteria`
- **Fields Schema**:
  - `Class *`: Required dropdown selector.
  - `Section *`: Required dropdown selector.
  - `Attendance Date`: Single datepicker pre-filled with current date (`09/12/2026`) (optional override, defaults to current date if left unselected).
  - `Search` Button: Right-aligned solid blue tactile trigger with magnifying glass.
- **Results Matrix (Post-Search)**:
  - Aggregate Summary Strip: Total Students, Present Count (%), Absent Count (%), Late Count (%), Half Day Count (%).
  - Chronological Student Status Ledger with timestamps and recording staff signature.

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- Daily Student Attendance Ledger
CREATE TABLE student_attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    academic_class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    attendance_type VARCHAR(20) NOT NULL CHECK (attendance_type IN ('Present', 'Late', 'Absent', 'Half Day', 'Holiday')),
    remark TEXT,
    recorded_by_staff_id UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_attendance_date UNIQUE (student_id, attendance_date)
);

CREATE INDEX idx_student_attendance_lookup ON student_attendances(branch_id, academic_class_id, section_id, attendance_date);

ALTER TABLE student_attendances ENABLE ROW LEVEL SECURITY;
CREATE POLICY student_attendances_branch_isolation ON student_attendances
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Student Leave Requests Table
CREATE TABLE student_leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    apply_date DATE NOT NULL DEFAULT CURRENT_DATE,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT,
    document_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Disapproved')),
    reviewed_by_staff_id UUID REFERENCES staff(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE student_leave_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY student_leave_requests_branch_isolation ON student_leave_requests
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Attendance Roster Endpoints
- `GET /api/v1/attendance/roster?classId={c}&sectionId={s}&date={d}`
  - Response: `200 OK` (Student list with existing marked attendance status).
- `POST /api/v1/attendance/student-batch`
  - Payload:
    ```json
    {
      "classId": "c101",
      "sectionId": "s001",
      "attendanceDate": "2026-09-12",
      "attendances": [
        {"studentId": "std_01", "type": "Present", "remark": ""},
        {"studentId": "std_02", "type": "Late", "remark": "10 mins late"},
        {"studentId": "std_03", "type": "Absent", "remark": "Sick"}
      ]
    }
    ```
  - Response: `200 OK`.

#### 2. Leave Management Endpoints
- `GET /api/v1/attendance/leave-requests?classId={c}&sectionId={s}`
  - Response: `200 OK` (Paged leave requests with status badges).
- `PATCH /api/v1/attendance/leave-requests/{id}/review`
  - Payload: `{"status": "Approved"}`
  - Response: `200 OK`.

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_att_11029411",
  "eventType": "school.attendance.student-absent-notified",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T08:15:00Z",
  "payload": {
    "studentId": "std_1800011",
    "studentName": "Edward Thomas",
    "class": "Class 1",
    "section": "A",
    "date": "2026-09-12",
    "status": "Absent",
    "parentPhone": "+85512345678"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 3 Attendance slugs documented with UI fidelity and data schemas.
- [x] Bulk attendance register with 5-option radio choices (Present, Late, Absent, Half Day, Holiday) modeled.
- [x] Student leave request workflow with staff review signatures and document attachments specified.
- [x] Date-centric attendance analytics with aggregate presence ratios detailed.
- [x] PostgreSQL RLS schema with `(student_id, attendance_date)` uniqueness constraint.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
