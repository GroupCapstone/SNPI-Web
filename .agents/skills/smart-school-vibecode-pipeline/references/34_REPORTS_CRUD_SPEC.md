# Module 34: Reports CRUD Architecture & Enterprise Analytics Specification

## 1. Domain Overview & Taxonomy

The **Reports** domain provides institutional business intelligence, operational audits, compliance reporting, statutory filings, financial reconciliation, and cross-functional analytics across all 15 operational school facets. It consolidates academic, financial, logistic, personnel, and system security telemetry into filterable ledgers, summary scorecards, exportable spreadsheets, and print-ready PDF executive briefs.

```
/super-admin/reports or /admin/report
├── /student-information    (13 Reports: Student Report, History, Class Subject, Profile, Online Admission, etc.)
├── /finance                (15 Reports: Fees Statement, Daily Collection, Balance Fees, Income/Expense, Payroll, etc.)
├── /attendance             (7 Reports: Attendance Report, Day Wise, Biometric Log, Staff Attendance, etc.)
├── /examinations           (Exam Result, Rank, Subject Marksheet, Pass/Fail, Admit Card Issuance)
├── /online-examinations    (4 Reports: Result Report, Exams Report, Student Exams Attempt, Exams Rank)
├── /lesson-plan            (Syllabus Status, Lesson Plan Coverage, Topic Progress Matrix)
├── /human-resource         (Staff Directory, Payroll Summary, Staff Attendance, Leave Audit)
├── /homework               (Homework Evaluation Status, Daily Assignment Completion)
├── /library                (Book Inventory, Issue/Return Log, Overdue Books, Member Circulation)
├── /inventory              (Stock Movement, Purchase Ledger, Equipment Issuance, Store Balances)
├── /transport              (Route Allocation, Pickup Points, Fleet Capacity, Transit Fare Arrears)
├── /hostel                 (Room Allotment, Bed Vacancy Matrix, Hostel Fee Statement)
├── /alumni                 (Graduation Cohorts, Alumni Directory, Event Registration)
├── /user-log               (User Authentication History, Session Duration, IP & User-Agent Telemetry)
└── /audit-trail-report     (Enterprise Entity Mutation Ledger, Before/After Diffs, Action Attribution)
```

---

## 2. Exhaustive Sub-Section & Slug Specifications

### 2.1. Slug: `student-information` (`/admin/report/studentinformation`)

- **Screen Layout Structure**:
  - Top Card: `Student Information Report` Hub rendering a responsive 3-column navigation directory of 13 dedicated operational reports with document glyphs.
- **Exhaustive Report Matrix (13 Ground Truth Reports)**:
  1. `Student Report`: Comprehensive demographic cohort query by Class, Section, Category, Gender, and Religion.
  2. `Class & Section Report`: Tabular breakdown of student roll count per Class and Section with capacity limits.
  3. `Guardian Report`: Parent/guardian contact details, profession, telephone, email, and permanent residential address.
  4. `Student History`: Admission date history, historical academic session promotions, and grade progressions.
  5. `Student Login Credential`: Roster of generated student usernames and temporary/active login access credentials.
  6. `Parent Login Credential`: Roster of guardian portal access credentials and associated linked wards.
  7. `Class Subject Report`: Subject enrollment count across academic divisions and elective selections.
  8. `Admission Report`: Periodic intake statistics filtering enrollments by month, date range, and source.
  9. `Sibling Report`: Identification of enrolled siblings grouped by shared guardian ID or residential address.
  10. `Student Profile`: In-depth student dossiers including medical records, immunization history, and biometric status.
  11. `Student Gender Ratio Report`: Demographic gender parity analytics per grade and overall school level.
  12. `Student Teacher Ratio Report`: Faculty allocation index calculating student-to-teacher density per department.
  13. `Online Admission Report`: Ingress audit of student applications received through the public Front CMS portal.

---

### 2.2. Slug: `finance` (`/admin/report/finance`)

- **Screen Layout Structure**:
  - Top Card: `Finance` Hub rendering a responsive 3-column directory of 15 statutory financial reconciliation ledgers.
- **Exhaustive Report Matrix (15 Ground Truth Reports)**:
  1. `Balance Fees Statement`: Consolidated student fee ledger showing total assigned fees, paid amount, and outstanding balances.
  2. `Daily Collection Report`: Real-time daily cash, bank transfer, and gateway collection journal grouped by cashier/teller.
  3. `Fees Statement`: Granular chronological payment history per student detailing transaction references and discounts.
  4. `Balance Fees Report`: Cohort filter card querying students with unpaid arrears by Class, Section, and Fee Group.
  5. `Fees Collection Report`: Date-bounded fee collection aggregated by Fee Type, Session, and Payment Mode.
  6. `Online Fees Collection Report`: Digital payment gateway audit trail (Stripe, Razorpay, PayPal) with transaction IDs.
  7. `Balance Fees Report With Remark`: Delinquency register tracking administrative follow-up notes and payment promises.
  8. `Income Report`: Operational revenue inflows grouped by Chart of Accounts heads and date intervals.
  9. `Expense Report`: Institutional disbursements, vendor payments, and recurring operational costs.
  10. `Payroll Report`: Monthly staff salary disbursements, allowances, tax deductions, and net pay register.
  11. `Income Group Report`: Aggregated revenue summary categorized by institutional income account groups.
  12. `Expense Group Report`: Aggregated expenditure summary categorized by departmental expense account groups.
  13. `Online Admission Fees Collection Report`: Revenue receipts originating specifically from online admission application forms.
  14. `Due Fees Report`: Aging analysis of outstanding student receivables categorized by overdue intervals (30, 60, 90+ days).
  15. `Income Expense Balance Report`: Master Profit & Loss statement calculating Net Surplus or Deficit over custom fiscal periods.

---

### 2.3. Slug: `attendance` (`/admin/report/attendance`)

- **Screen Layout Structure**:
  - Top Card: `Attendance Report` Hub rendering a responsive 3-column directory of 7 attendance audit registers.
- **Exhaustive Report Matrix (7 Ground Truth Reports)**:
  1. `Attendance Report`: Monthly student attendance matrix rendering P/A/L/H marks for every calendar date.
  2. `Student Attendance Type Report`: Cohort presence totals categorized by attendance type (Present, Late, Half Day, Absent).
  3. `Daily Attendance Report`: High-level daily institutional presence snapshot per class and section.
  4. `Student Day Wise Attendance Report`: Granular single-day absence breakdown with guardian notification delivery status.
  5. `Staff Day Wise Attendance Report`: Daily workforce roster verifying staff on duty, on leave, or unexcused absent.
  6. `Staff Attendance Report`: Monthly staff presence percentage register for payroll attendance verification.
  7. `Biometric Attendance Log`: Hardware device raw punch journal syncing turnstile RFID/biometric device time logs.

---

### 2.4. Slug: `online-examinations` (`/admin/report/onlineexam`)

- **Screen Layout Structure**:
  - **Top Horizontal Sub-Navigation Tab Strip**:
    - `Result Report` (Active state with light gray fill and outline)
    - `Exams Report`
    - `Student Exams Attempt Report`
    - `Exams Rank Report`
  - **Middle Section**: `Select Criteria` Filter Card
    - `Exam *`: Single-select dropdown of scheduled online tests. Mandatory.
    - `Class *`: Single-select dropdown of candidate classes. Mandatory.
    - `Section *`: Single-select dropdown of sections. Mandatory.
    - `Search` Button: Solid purple tactile button (`#8E24AA`) with search icon.
  - **Bottom Section**: Data Table Card (`Result Report`)
    - Columns: `Admission No`, `Student Name`, `Class`, `Total Attempt`, `Remaining Attempt`, `Exam Submitted`, `Action`.
    - Empty State Handling: Centered illustrated folder glyph with floating document cards, alert text `No data available in table`, and action link `<- Add new record or search with different criteria.`.
    - Table Footer: `Showing 0 to 0 of 0 entries`.

---

---

### 2.5. Slug: `lesson-plan` (`/admin/report/lessonplan`)

- **Screen Layout Structure**:
  - **Top Horizontal Sub-Navigation Tab Strip**:
    - `Syllabus Status Report` (Active state with light gray fill and outline)
    - `Subject Lesson Plan Report`
  - **Middle Section**: `Select Criteria` Filter Card
    - `Class *`: Single-select dropdown of academic classes. Mandatory.
    - `Section *`: Single-select dropdown of sections. Mandatory.
    - `Subject Group *`: Single-select dropdown of subject tracks. Mandatory.
    - `Search` Button: Solid purple tactile button (`#8E24AA`) with search icon.
  - **Bottom Section**: Data Table Card detailing subject syllabus coverage, total topics, completed topics, and completion percentage meters.

---

### 2.6. Slug: `human-resource` (`/admin/report/staff`)

- **Screen Layout Structure**:
  - Top Card: `Human Resource Report` Hub rendering a responsive 3-column directory of 4 workforce and payroll audit reports with glyphs.
- **Exhaustive Report Matrix (4 Ground Truth Reports)**:
  - **Column 1**:
    1. `Staff Report`: Comprehensive staff roster filtering by Role, Designation, Department, Gender, and Status.
    2. `My Leave Request Report`: Personal employee leave history and approval tracking.
  - **Column 2**:
    3. `Payroll Report`: Monthly staff salary audit, allowances, deductions, net pay, and payment vouchers.
  - **Column 3**:
    4. `Leave Request Report`: Institutional staff leave log with status flags (`Approved`, `Pending`, `Disapproved`).

---

### 2.7. Slug: `homework` (`/admin/report/homework` or `/homework/homeworkordailyassignmentreport`)

- **Screen Layout Structure**:
  - Top Card: `Homework Report` Hub rendering a responsive 3-column directory of 4 assignment audit reports.
- **Exhaustive Report Matrix (4 Ground Truth Reports)**:
  - **Column 1**:
    1. `Homework Report`: Date-bounded assignment log by Class, Section, and Subject.
    2. `Homework Marks Report`: Evaluated marks distribution across submitted academic tasks.
  - **Column 2**:
    3. `Homework Evaluation Report`: Cohort submission vs. non-submission compliance audit.
  - **Column 3**:
    4. `Daily Assignment Report`: Granular daily assignment completions with teacher feedback.

---

### 2.8. Slug: `library` (`/admin/report/library`)

- **Screen Layout Structure**:
  - Top Card: `Library Report` Hub rendering a responsive 3-column directory of 4 physical inventory and circulation audit reports.
- **Exhaustive Report Matrix (4 Ground Truth Reports)**:
  - **Column 1**:
    1. `Book Issue Report`: Active circulating loans with member IDs, issue dates, and return deadlines.
    2. `Book Issue Return Report`: Historical archive of issued and successfully returned book transactions.
  - **Column 2**:
    3. `Book Due Report`: Overdue loans register calculating accrued daily late fines.
  - **Column 3**:
    4. `Book Inventory Report`: Physical stock count, rack locations, ISBN indexing, and valuation.

---

---

### 2.9. Slug: `inventory` (`/admin/report/inventory`)

- **Screen Layout Structure**:
  - Top Card: `Inventory Report` Hub rendering a responsive 3-column directory of 3 procurement and depot audit reports.
- **Exhaustive Report Matrix (3 Ground Truth Reports)**:
  - **Column 1**:
    1. `Stock Report`: Real-time warehouse balance evaluation, available units, and minimum stock threshold alerts.
  - **Column 2**:
    2. `Add Item Report`: Historical inventory acquisition journal tracking purchase date, vendor, unit cost, and invoice voucher.
  - **Column 3**:
    3. `Issue Item Report`: Departmental equipment issuance ledger tracking recipient, return deadline, and restocking status.

---

### 2.10. Slug: `transport` (`/admin/report/transport`)

- **Screen Layout Structure**:
  - **Top Section**: `Select Criteria` 5-Tier Transit Filter Card.
  - **Bottom Section**: `Student Transport Report` Comprehensive Fleet Allocation Table.
- **Criteria Filter Card Controls**:
  - `Class`: Single-select dropdown of academic classes.
  - `Section`: Single-select dropdown of class sections.
  - `Route List`: Single-select dropdown referencing active transport corridors (e.g. `Brooklyn East`, `High Court`).
  - `Pickup Point`: Single-select dropdown referencing route pickup landmarks.
  - `Vehicle`: Single-select dropdown referencing fleet vehicles (e.g. `VH4584`, `VH5645`, `VH1001`).
  - `Search` Button: Solid purple tactile button (`#8E24AA`) with magnifying glass glyph.
- **Data Table Schema & Controls (`Student Transport Report`)**:
  - Quick Search input, page size selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Columns**:
    1. `Class` (String, sortable)
    2. `Admission No` (String, sortable)
    3. `Student Name` (String, sortable)
    4. `Mobile Number` (Phone string)
    5. `Father Name` (String)
    6. `Route Title` (Corridor name)
    7. `Vehicle Number` (Fleet registration code)
    8. `Pickup Point` (Assigned stop landmark)
    9. `Driver Name` (Assigned chauffeur)
    10. `Driver Contact` (Emergency phone)
    11. `Fare ($)` (Periodic transport charge, decimal currency)
  - **Empty State Handling**: Centered folder illustration with floating document sheets, alert label `No data available in table`, and action link `<- Add new record or search with different criteria.`.
  - Footer: `Showing 0 to 0 of 0 entries`.

---

### 2.11. Slug: `hostel` (`/admin/hostelroom/studenthosteldetails#`)

- **Screen Layout Structure**:
  - **Top Section**: `Select Criteria` Boarding Filter Card.
  - **Bottom Section**: `Student Hostel Report` Dormitory Occupancy Table.
- **Criteria Filter Card Controls**:
  - `Class *`: Single-select dropdown. Mandatory.
  - `Section *`: Single-select dropdown. Mandatory.
  - `Hostel Name`: Single-select dropdown referencing registered dormitory buildings (e.g. `Boys Hostel 101`, `Girls Hostel 103`).
  - `Search` Button: Solid purple tactile button (`#8E24AA`).
- **Data Table Schema & Controls (`Student Hostel Report`)**:
  - Search, page size (`50`), export suite.
  - **Columns**:
    1. `Class (Section)` (Cohort string, e.g. `Class 1 (A)`)
    2. `Admission No` (Student identifier)
    3. `Student Name` (Student full name)
    4. `Mobile Number` (Student contact phone)
    5. `Guardian Phone` (Parent emergency telephone)
    6. `Hostel Name` (Dormitory building name)
    7. `Room Number / Name` (Assigned room, e.g. `B1`, `G1`)
    8. `Room Type` (Dormitory configuration, e.g. `One Bed`, `Two Bed AC`)
    9. `Cost Per Bed ($)` (Periodic residential boarding fee)
  - **Empty State Handling**: Centered folder illustration with alert text `No data available in table`.
  - Footer: `Showing 0 to 0 of 0 entries`.

---

### 2.12. Slug: `alumni` (`/admin/report/alumni`)

- **Screen Layout Structure**:
  - **Top Section**: `Select Criteria` Filter Card.
  - **Bottom Section**: Alumni Graduate Report Ledger.
- **Criteria Filter Card Controls**:
  - `Pass Out Session *`: Single-select dropdown of graduation academic sessions. Mandatory.
  - `Class *`: Single-select dropdown of final graduation classes. Mandatory.
  - `Section`: Single-select dropdown. Optional.
  - `Search` Button: Solid purple tactile button (`#8E24AA`).
- **Data Table Schema**:
  - Renders comprehensive graduate employment, higher education placement, contact details, and reunion participation history.

---

### 2.13. Slug: `user-log` (`/admin/userlog`)

- **Screen Layout Structure**:
  - **Header Bar**: Title `User Log`, right-aligned tab pill switcher (`All Users` [default active with purple indicator], `Staff`, `Students`, `Parent`, `Guest`), and solid purple purge action button `Clear Userlog Record`.
  - **Data Table Schema & Controls**:
    - Quick Search input (`Search`), page size selector (`50`), and export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
    - **Columns**:
      1. `Users`: User email or system handle (e.g. `superadmin@gmail.com`, `william@gmail.com`, `jason@gmail.com`, `std1`).
      2. `Role`: System role badge (e.g. `Super Admin`, `Admin`, `Teacher`, `Student`, `Parent`, `Guest`).
      3. `Class`: Student cohort assignment if applicable (e.g. `Class 1(A)`, `NULL` for staff/admin users).
      4. `IP Address`: Client network IPv4 address (e.g. `114.130.157.198`, `200.229.1.144`, `143.105.152.243`, `205.147.22.21`, `107.127.53.36`, `154.160.3.246`, `36.37.152.109`, `192.168.0.153`, `10.110.1.5`).
      5. `Login Date Time`: Formatted login timestamp string (format `MM/DD/YYYY HH:MM:SS`, e.g. `09/12/2026 01:58:39`).
      6. `User Agent`: Client device, browser, and operating system descriptor (e.g. `Chrome 152.0.0.0, Android`, `Safari 605.1.15, Mac OS X`, `Chrome 152.0.0.0, Windows 10`, `Chrome 153.0.0.0, Windows 10`, `Safari 604.1, iOS`, `Chrome 151.0.0.0, Windows 10`, `Chrome 150.0.0.0, Windows 10`).
  - **Purge Confirmation Modal**:
    - Triggered by `Clear Userlog Record`. Requires administrative confirmation before truncating user session audit logs.

---

### 2.14. Slug: `audit-trail-report` (`/admin/audit`)

- **Screen Layout Structure**:
  - **Header Bar**: Title `Audit Trail Report List`, right-aligned solid purple purge action button `Clear Audit Trail Record`.
  - **Data Table Schema & Controls**:
    - Quick Search input (`Search`), page size selector (`50`), and export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`).
    - **Columns**:
      1. `Message`: Descriptive audit log entry explaining the database mutation or administrative event (e.g. `Student Admission record inserted for John Doe`, `Fee Discount applied to Invoice #INV-1092`).
      2. `Users`: Username or email of the authenticated initiator (e.g. `superadmin@gmail.com`).
      3. `IP Address`: Originating IPv4/IPv6 client address.
      4. `Action`: Standardized audit verb (`Insert`, `Update`, `Delete`, `Login`, `Export`).
      5. `Platform`: Operational access environment (`Web`, `Mobile App`, `REST API`, `System Worker`).
      6. `Agent`: HTTP client user agent string.
      7. `Date Time`: ISO formatted timestamp of transaction occurrence.
  - **Empty State Handling**:
    - Centered document and folder vector illustration with label `No data available in table` and action helper `+ Add new record or search with different criteria.`
    - Footer counter: `Showing 0 to 0 of 0 entries`.

---

### 2.15. Slug: `examinations` (`/admin/report/examinations`)

- **Categorical Examination Analytics Directory**:
  - 3-Column directory rendering formal term assessment and board grading reports:
    1. `Exam Result Report`: Class/Section marksheet rollup with percentage, grades, and pass/fail status.
    2. `Class Rank Report`: Merit list ranking students by aggregate marks.
    3. `Subject Marksheet Ledger`: Cross-tabulated subject score ledger per student.
    4. `Passing / Failing Grade Distribution`: Statistical bar analysis of bell-curve grade distribution.
    5. `Admit Card Delivery Audit`: Verification of examination hall ticket downloads and issuance.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Security User Login Audit Log Table (media_1789158991102.png)
CREATE TABLE system_user_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    class_section VARCHAR(50),
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    login_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP WITH TIME ZONE
);

-- Universal Entity Mutation Audit Trail Table (media_1789159000666.png)
CREATE TABLE system_audit_trails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    username VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('Insert', 'Update', 'Delete', 'Login', 'Export')),
    platform VARCHAR(50) NOT NULL DEFAULT 'Web',
    agent TEXT NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fast analytical indexing
CREATE INDEX idx_user_logs_user_time ON system_user_logs(user_id, login_time);
CREATE INDEX idx_user_logs_role ON system_user_logs(role);
CREATE INDEX idx_audit_table_record ON system_audit_trails(table_name, record_id);
CREATE INDEX idx_audit_created_at ON system_audit_trails(created_at);
CREATE INDEX idx_audit_action ON system_audit_trails(action);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/reports/student-information/{reportSlug}` | Generate student report | `?classId=uuid&sectionId=uuid` | `200 OK` (Tabular Data) |
| `GET` | `/api/v1/reports/finance/{reportSlug}` | Generate financial report | `?startDate=date&endDate=date` | `200 OK` (Ledger Summary) |
| `GET` | `/api/v1/reports/attendance/{reportSlug}` | Generate attendance audit | `?date=date&classId=uuid` | `200 OK` (Attendance Grid) |
| `GET` | `/api/v1/reports/online-exam/results` | Online exam result report | `?examId=uuid&classId=uuid&sectionId=uuid`| `200 OK` (Roster Results) |
| `GET` | `/api/v1/reports/transport` | Student transport fleet allocation report | `?classId=uuid&sectionId=uuid&routeId=uuid&pickupPointId=uuid&vehicleId=uuid` | `200 OK` (Transport List) |
| `GET` | `/api/v1/reports/hostel` | Student hostel dormitory occupancy report | `?classId=uuid&sectionId=uuid&hostelId=uuid` | `200 OK` (Hostel List) |
| `GET` | `/api/v1/reports/alumni` | Alumni passout graduate report | `?session=str&classId=uuid&sectionId=uuid` | `200 OK` (Alumni List) |
| `GET` | `/api/v1/reports/user-logs` | Query user login logs by category tab | `?tab=All Users|Staff|Students|Parent|Guest&page=1&limit=50` | `200 OK` (Security Audit) |
| `DELETE` | `/api/v1/reports/user-logs/clear` | Purge all user login records | *None* (Admin Privileged) | `200 OK` (`{"purged": true}`) |
| `GET` | `/api/v1/reports/audit-trail` | Entity change and system action history | `?page=1&limit=50&search=str` | `200 OK` (Audit List) |
| `DELETE` | `/api/v1/reports/audit-trail/clear` | Purge all audit trail records | *None* (Admin Privileged) | `200 OK` (`{"purged": true}`) |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever reports are compiled, downloaded, or statutory audits triggered, audit events are published to `school.reports.events`:

```json
{
  "eventId": "c841a029-4410-4882-99ad-12bc4491a012",
  "eventType": "school.reports.generated",
  "aggregateId": "rep-uuid-1902-aa31",
  "timestamp": "2026-09-12T03:36:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN"
  },
  "payload": {
    "reportCategory": "FINANCE",
    "reportSlug": "balance-fees-statement",
    "filtersApplied": {
      "session": "2026-27",
      "classId": "cls-all"
    },
    "exportFormat": "EXCEL"
  }
}
```
