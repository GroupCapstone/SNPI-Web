# Module 22: Human Resource CRUD Architecture & Staff Management Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Human Resource** module governs institutional workforce administration, staff lifecycle management (recruitment, onboarding, role designation, payroll, attendance, leave governance, performance rating, and deactivation). It serves as the authoritative identity and access registry for all institutional roles: Super Admin, Admin (Dean), Teacher, Accountant, Librarian, and Receptionist.

- **Module Index**: `22`
- **Legacy Route Base**: `/admin/staff`, `/admin/staffattendance`, `/admin/payroll`, `/admin/leaverequest`, `/admin/department`, `/admin/designation`
- **Modern Component Root**: `/super-admin/human-resource`
- **Functional Domain**: `Workforce Administration, Staff Attendance, Payroll & Leave Governance`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Payroll Batch**: Monthly payroll calculations across hundreds of employees run via the Sync-to-Async Bridge (`POST /api/v1/payroll/generate-batch` returns `HTTP 202 Accepted` and buffers calculations to Kafka topic `school.finance.payroll-generated`).
- **Granular Leave Engine**: Supports fractional leave calculations (full-day vs. half-day `Second Half` = 0.50 days) with multi-level approval states (`Approved`, `Pending`, `Disapproved`).

---

### Complete Slug Inventory & Route Mapping

The Human Resource module comprises **10 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `staff-directory` | `/admin/staff` | `/super-admin/human-resource/staff-directory` | Dual Filter + Card/List Switcher | `staff` | `+ Add Staff`, Role vs Keyword Search, Card View / List View, Profile Drilldown |
| **02** | `staff-attendance` | `/admin/staffattendance` | `/super-admin/human-resource/staff-attendance` | Filter + Daily Roll Register | `staff_attendances` | Select Role & Date, Bulk Present/Absent/Late/Half Day, Save Batch |
| **03** | `payroll` | `/admin/payroll` | `/super-admin/human-resource/payroll` | Role & Period Filter + Payroll Matrix | `staff_payrolls` | Filter Month/Year, Calculate Gross/Net Salary, Generate Payroll, Print Payslip |
| **04** | `approve-leave-request`| `/admin/leaverequest/leaverequest` | `/super-admin/human-resource/approve-leave-request` | Action Toolbar + Approval Ledger | `staff_leave_requests`| `Add Leave Request`, Approve/Disapprove badges, View Audit Details, Delete |
| **05** | `apply-leave` | `/admin/staff/apply_leave` | `/super-admin/human-resource/apply-leave` | Action Modal + Personal Leave Ledger| `staff_leave_requests`| Apply for Leave, Attach Doctor Note, View Personal Leave Status |
| **06** | `leave-type` | `/admin/leaverequest/leavetype` | `/super-admin/human-resource/leave-type` | Split 2-Column (Pattern B) | `staff_leave_types` | Add Leave Type, Edit, Delete |
| **07** | `teachers-rating` | `/admin/staff/rating` | `/super-admin/human-resource/teachers-rating` | Filter Criteria + Rating Ledger | `staff_ratings` | Filter Staff/Rating, View 1-5 Star Breakdown, Approve/Reject Reviews |
| **08** | `department` | `/admin/department` | `/super-admin/human-resource/department` | Split 2-Column (Pattern B) | `staff_departments` | Add Department Name, Edit, Delete |
| **09** | `designation` | `/admin/designation` | `/super-admin/human-resource/designation` | Split 2-Column (Pattern B) | `staff_designations` | Add Designation Name, Edit, Delete |
| **10** | `disabled-staff` | `/admin/staff/disablestafflist`| `/super-admin/human-resource/disabled-staff` | Search Filter + Deactivated Archive | `staff` | Filter Role/Keyword, Audit Deactivation Reasons, Reactivate Account |

---

### 1. Slug `staff-directory`: Workforce Identity & Profile Directory

#### A. Screen Architecture & Visual Layout
Dual-Query Criteria Card + View Switcher Toolbar + 4-Column Card Grid:
- **Card 1 (`Select Criteria`)**:
  - Top Action Trigger: `+ Add Staff` (Solid purple tactile button on top right).
  - Left Filter Query:
    - `Role *`: Single-select dropdown (`Super Admin`, `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist`).
    - `Search` Button: Solid blue tactile trigger.
  - Right Keyword Query:
    - `Search By Keyword`: Text input with placeholder `Search By Staff ID, Name, Role etc...`.
    - `Search` Button: Solid blue tactile trigger.
- **Card 2 View Switcher**:
  - Tab 1: `Card View` (Active tab, displays visual profile cards).
  - Tab 2: `List View` (Displays standard data table).

#### B. Staff Profile Card Schema (`Card View`)
Rendered in a responsive 4-column grid:
- **Left Column**: High-resolution circular/square avatar photograph.
- **Center-Right Details**:
  - `Staff Name` (e.g., `Joe Black`, `Shivam Verma`, `Brandon Heart`, `William Abbot`, `Jason Sharlton`, `James Deckar`, `Maria Ford`, `Nishant Khare`, `Aman Verma`).
  - `Staff ID` (e.g., `9000`, `9002`, `9006`, `9003`, `90006`, `9004`, `9005`, `1002`, `654`).
  - `Mobile Phone` (e.g., `8545645645`).
  - `Location / Building` (e.g., `Ground Floor, Admin`, `1st Floor, Academic`, `2nd Floor, Library`, `Ground Floor, Finance`).
  - `Institutional Badges`: Dual tactile pill badges:
    - Role Badge (e.g., `[Super Admin]`, `[Teacher]`, `[Librarian]`, `[Admin]`, `[Accountant]`, `[Receptionist]`).
    - Designation Badge (e.g., `[Technical Head]`, `[Faculty]`, `[Principal]`).
- **Interactive Controls**:
  - Hover action strip displaying View Profile Card (`menu` icon) and Edit Profile (`edit` pencil).

---

### 2. Slug `staff-attendance`: Daily Workforce Roll-Call Register

#### A. Screen Architecture & Visual Layout
- **Card Title**: `Select Criteria`
- **Form Controls (Single Responsive Row)**:
  1. `Role`: Optional single-select dropdown (e.g., filter all staff or specific role: `Teacher`, `Accountant`).
  2. `Attendance Date`: Datepicker pre-filled with current system date (`09/12/2026`).
  3. `Search` Button: Solid blue tactile trigger with magnifying glass.
- **Staff Attendance Roster Grid (Post-Search)**:
  - Columns: `#`, `Staff ID`, `Name`, `Role`, `Department`, `Designation`, `Attendance` (Radio options: `Present`, `Late`, `Absent`, `Half Day`, `Holiday`), `Remarks`.
  - Batch Action Toolbar: `Set All Present`, `Save Attendance` (Atomic submission `POST /api/v1/staff-attendance/batch`).

---

### 3. Slug `payroll`: Compensation & Salary Disbursement Desk

#### A. Screen Architecture & Visual Layout
- **Card Title**: `Select Criteria`
- **Form Controls (Single Responsive Row)**:
  1. `Role`: Single-select dropdown (e.g., `All`, `Teacher`, `Admin`).
  2. `Month`: Dropdown pre-filled with operational month (e.g., `August`).
  3. `Year`: Dropdown pre-filled with operational year (e.g., `2026`).
  4. `Search` Button: Solid blue tactile trigger.
- **Payroll Register Ledger (Post-Search)**:
  - Columns: `Staff ID`, `Name`, `Role`, `Department`, `Designation`, `Mobile Number`, `Status` (`Generated`, `Paid`, `Not Generated`), `Action`:
    - `Generate Payroll`: Opens salary breakdown calculator (Basic + Earnings [DA, HRA, Allowance] - Deductions [PF, Tax]).
    - `Proceed to Pay`: Cash/Bank transfer voucher creator.
    - `View Payslip`: High-resolution thermal/vector PDF salary slip viewer.

---

### 4. Slug `approve-leave-request`: Staff Leave Authorization Hub

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Approve Leave Request`
- **Top Action Trigger**: `Add Leave Request` (Solid purple tactile button on top right).
- **Controls**: Search input box, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).

#### B. Master Data Table Schema (`staff_leave_requests`)

| Column Header | Field Name | Data Type | Rendering & Color Badges | Exact Screen Records Sample |
|:---|:---|:---|:---|:---|
| **Staff** | `staff_name_id` | `VARCHAR(150)` | Full name with staff ID in parentheses. | `Jason Sharlton (90006)`<br>`James Deckar (9004)`<br>`Shivam Verma (9002)`<br>`William Abbot (9003)` |
| **Leave Type** | `leave_type_name`| `VARCHAR(100)` | Categorical leave label. | `Maternity Leave`, `Casual Leave`, `Medical Leave`, `Sick Leave`. |
| **Half Day** | `half_day_period`| `VARCHAR(50)` | Empty for full-day; labeled for partial leaves. | Empty (Full Day) or `Second Half`. |
| **Leave Date** | `leave_date_range`| `VARCHAR(50)` | Formatted interval `MM/DD/YYYY - MM/DD/YYYY`.| `09/22/2026 - 09/26/2026`<br>`07/10/2026 - 07/10/2026` |
| **Days** | `total_days` | `DECIMAL(4,2)` | Number of absence days. | `5.00`, `2.00`, `3.00`, `4.00`, `0.50`, `1.00`. |
| **Apply Date** | `apply_date` | `DATE` | Formatted `MM/DD/YYYY`. | `09/10/2026`, `09/03/2026`, `08/08/2026`, `07/04/2026`. |
| **Status** | `status` | `BADGE` | Tactile color-coded pill badge: | • `Approved` (Solid green badge)<br>• `Pending` (Solid orange badge)<br>• `Disapproved` (Solid red badge) |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: View Audit Details (`view_headline` / menu icon) and Delete (`close`/`x`). |

---

### 5. Slug `apply-leave`: Staff Personal Leave Application
### 5. Slug `apply-leave`: Staff Personal Leave Portal

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Leaves`
- **Top Action Trigger**: `Apply Leave` (Solid purple tactile button on top right, launches leave application modal).
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Table Schema (`staff_leave_requests` Personal Ledger)**:
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Staff** | `staff_name` | `VARCHAR(150)` | Current staff profile name. |
| **Leave Type** | `leave_type` | `VARCHAR(100)` | Categorical leave label. |
| **Half Day** | `half_day` | `VARCHAR(50)` | Empty for full-day; labeled `Second Half` or `First Half`. |
| **Leave Date** | `leave_dates` | `VARCHAR(50)` | Formatted interval `MM/DD/YYYY - MM/DD/YYYY`. |
| **Days** | `total_days` | `DECIMAL(4,2)` | Number of days requested. |
| **Apply Date** | `apply_date` | `DATE` | Submission date. |
| **Status** | `status` | `BADGE` | Status pill: `Approved` (green), `Pending` (orange), `Disapproved` (red). |
| **Action** | *Controls* | `ACTIONS` | View Details and Cancel/Delete icon buttons. |
- **Empty State Behavior**: Illustrated folder graphics with red notice `No data available in table` and recovery link `⬅ Add new record or search with different criteria.`
- **Pagination**: `Showing 0 to 0 of 0 entries`.

---

### 6. Slug `leave-type`: Master Leave Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Leave Type`.
- **Right Column (~67% width)**: Data Grid Card titled `Leave Type List`.

#### B. Left Form Schema (`Add Leave Type`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Name \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(100)` with active purple focus outline. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Leave Type List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records (5 Entries) |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(100)` | Sortable leave title. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Exact Seeded Ground-Truth Records**:
  1. `Medical Leave`
  2. `Casual Leave`
  3. `Maternity Leave`
  4. `Sick Leave`
  5. `mendatory leave`
- **Pagination**: `Showing 1 to 5 of 5 entries`, `< 1 >`.

---

### 7. Slug `teachers-rating`: Instructional Feedback & Review Moderation

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Teachers Rating List`
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering & Interactive Action Logic |
|:---|:---|:---|:---|
| **Staff ID** | `staff_id` | `VARCHAR(50)` | e.g., `9002`, `90006`. |
| **Name** | `staff_name` | `VARCHAR(150)` | Blue sortable text link (e.g., `Shivam Verma ( 9002 )`, `Jason Sharlton ( 90006 )`). |
| **Rating** | `rating` | `COMPOSITE` | Star rating indicators followed by numeric integer (e.g., `5 Stars (5)`, `3 Stars (3)`, `4 Stars (4)`, `2 Stars (2)`). |
| **Comment** | `comment` | `TEXT` | Qualitative review text (e.g., `Motivates students to progress`, `good`, `Excellent`, `no comment`, `nice`, `good teaching and learning`, `GOOD`, `Solidifies a positive relationship or connection with your students`). |
| **Status** | `status` | `BADGE` | Color-coded status badge:<br>• `Pending` (Solid orange badge)<br>• `Approved` (Solid green badge) |
| **Student Name**| `student_name`| `VARCHAR(150)` | Reviewer name and student roll/admission code (e.g., `Saurabh Shah ( 908875 )`, `Glen Stark ( 18005 )`, `Robin Peterson ( 18002 )`, `Arun Thomas ( 110025 )`). |
| **Action** | *Controls* | `ACTIONS` | Dynamic button state rendering:<br>• If `Status == 'Pending'`: Renders solid teal **`Approve`** button AND purple Delete (`close`/`x`) button.<br>• If `Status == 'Approved'`: Renders purple Delete (`close`/`x`) button only. |
- **Pagination**: `Showing 1 to 14 of 14 entries`, `< 1 >`.

---

### 8. Slug `department`: Institutional Functional Divisions

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Department`.
- **Right Column (~67% width)**: Data Grid Card titled `Department Lists`.

#### B. Left Form Schema (`Add Department`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Name \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(100)` with active purple focus outline. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Department Lists`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records (10 Entries) |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(100)` | `Academic`, `Library`, `Sports`, `Science`, `Commerce`, `Arts`, `Exam`, `Admin`, `Finance`, `Maths`. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 10 of 10 entries`, `< 1 >`.

---

### 9. Slug `designation`: Workforce Role Hierarchy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Designation`.
- **Right Column (~67% width)**: Data Grid Card titled `Designation List`.

#### B. Left Form Schema (`Add Designation`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Name \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(100)` with active purple focus outline. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Designation List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records (9 Entries) |
|:---|:---|:---|:---|
| **Designation** | `name` | `VARCHAR(100)` | `Faculty`, `Accountant`, `Admin`, `Receptionist`, `Principal`, `Director`, `Librarian`, `Technical Head`, `Vice Principal`. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 9 of 9 entries`, `< 1 >`.

---

### 10. Slug `disabled-staff`: Archived Deactivated Personnel

#### A. Screen Architecture & Visual Layout
Dual-Query Criteria Card + View Switcher Toolbar + 4-Column Card Grid:
- **Card 1 (`Select Criteria`)**:
  - Left Filter Query:
    - `Role *`: Required single-select dropdown (e.g., `Super Admin`, `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist`).
    - `Search` Button: Solid blue tactile trigger.
  - Right Keyword Query:
    - `Search By Keyword`: Text input with placeholder `Search By Staff ID, Name, Role etc...`.
    - `Search` Button: Solid blue tactile trigger.
- **Card 2 View Switcher**:
  - Tab 1: `Card View` (Active tab, displays visual archived profile cards).
  - Tab 2: `List View` (Displays standard data table).

#### B. Disabled Staff Profile Card Schema (`Card View`)
Rendered in a responsive 4-column grid:
- **Left Column**: High-resolution avatar photo or neutral geometric group placeholder (`NO IMAGE AVAILABLE`).
- **Center-Right Details**:
  - `Staff Name` (e.g., `Albert Thomas`, `Jonathan Wood`).
  - `Staff ID` (e.g., `54545454`, `6352`).
  - `Mobile Phone` (e.g., `9522369675`).
  - `Location / Building` (e.g., `Mumbai, Maths`, `Academic`).
  - `Institutional Badges`: Dual tactile pill badges:
    - Role Badge: `[Teacher]`.
    - Designation Badge: `[Faculty]`.
- **Interactive Controls & Account Reactivation**:
  - Profile details drawer, audit trail of deactivation reason, and `Reactivate Account` confirmation workflow.



---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Departments & Designations
CREATE TABLE staff_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_department UNIQUE (branch_id, name)
);

CREATE TABLE staff_designations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_designation UNIQUE (branch_id, name)
);

-- 2. Staff Leave Types
CREATE TABLE staff_leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_leave_type UNIQUE (branch_id, name)
);

-- 3. Staff Leave Requests
CREATE TYPE leave_status_enum AS ENUM ('PENDING', 'APPROVED', 'DISAPPROVED');

CREATE TABLE staff_leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    leave_type_id UUID NOT NULL REFERENCES staff_leave_types(id) ON DELETE RESTRICTED,
    apply_date DATE NOT NULL DEFAULT CURRENT_DATE,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    is_half_day BOOLEAN NOT NULL DEFAULT FALSE,
    half_day_period VARCHAR(50), -- 'Second Half' or 'First Half'
    total_days NUMERIC(4,2) NOT NULL DEFAULT 1.00,
    status leave_status_enum NOT NULL DEFAULT 'PENDING',
    reason TEXT,
    attachment_url VARCHAR(500),
    reviewed_by_staff_id UUID REFERENCES staff(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_staff_leave_range CHECK (to_date >= from_date)
);

-- 4. Staff Daily Attendance
CREATE TABLE staff_attendances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    attendance_type VARCHAR(20) NOT NULL CHECK (attendance_type IN ('Present', 'Late', 'Absent', 'Half Day', 'Holiday')),
    remark TEXT,
    recorded_by_staff_id UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_staff_attendance_date UNIQUE (staff_id, attendance_date)
);

-- 5. Staff Monthly Payroll
CREATE TYPE payroll_status_enum AS ENUM ('NOT_GENERATED', 'GENERATED', 'PAID');

CREATE TABLE staff_payrolls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    basic_salary NUMERIC(10,2) NOT NULL,
    earnings NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    deductions NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gross_salary NUMERIC(10,2) NOT NULL,
    tax NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    net_salary NUMERIC(10,2) NOT NULL,
    payment_mode VARCHAR(50), -- Cash, Bank Transfer, Cheque
    payment_date DATE,
    status payroll_status_enum NOT NULL DEFAULT 'NOT_GENERATED',
    payslip_pdf_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_staff_payroll_period UNIQUE (staff_id, month, year)
);

-- Apply Row-Level Security
ALTER TABLE staff_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_payrolls ENABLE ROW LEVEL SECURITY;

CREATE POLICY rls_staff_dept ON staff_departments FOR ALL USING (
    current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
CREATE POLICY rls_staff_desig ON staff_designations FOR ALL USING (
    current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
CREATE POLICY rls_staff_leave_req ON staff_leave_requests FOR ALL USING (
    current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
CREATE POLICY rls_staff_att ON staff_attendances FOR ALL USING (
    current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
CREATE POLICY rls_staff_pay ON staff_payrolls FOR ALL USING (
    current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Filter Staff Directory
- **Endpoint**: `GET /api/v1/staff`
- **Query Parameters**: `role` (String, optional), `search` (String, optional), `status` (`ACTIVE` | `DISABLED`)
- **Response**: Array of staff profiles with name, role, department, designation, phone, and building location.

#### 2. Bulk Staff Attendance
- **Endpoint**: `POST /api/v1/staff-attendance/batch`
- **Payload**:
```json
{
  "attendanceDate": "2026-09-12",
  "records": [
    { "staffId": "9a8b7c6d-5e4f-3a2b-1c0d-e4f5a6b7c8d9", "attendanceType": "Present", "remark": "" },
    { "staffId": "1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e", "attendanceType": "Late", "remark": "10 mins late" }
  ]
}
```

#### 3. Update Leave Request Status
- **Endpoint**: `PUT /api/v1/staff/leave-requests/{id}/status`
- **Payload**:
```json
{
  "status": "APPROVED",
  "reviewerRemarks": "Approved by Dean of Faculty."
}
```

#### 4. Batch Generate Payroll (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/payroll/generate-batch`
- **Payload**:
```json
{
  "role": "TEACHER",
  "month": "August",
  "year": 2026
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.finance.payroll-generated`
- **Partition Key**: `{branchId}#{year}-{month}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "e9f8a7b6-5432-10fe-dcba-9876543210fe",
    "eventType": "school.finance.payroll-generated",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T11:45:00.000Z",
    "correlationId": "c1b2a3d4-5678-90ef-1234-567890abcdef",
    "version": "1.0.0"
  },
  "payload": {
    "month": "August",
    "year": 2026,
    "role": "TEACHER",
    "totalProcessed": 45,
    "totalGrossDisbursement": 185000.00,
    "totalNetDisbursement": 162500.00
  }
}
```
