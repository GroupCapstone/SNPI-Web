# Admin Portal Master Menu Flow & Panel Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Architectural Purpose

This specification establishes the authoritative single-source-of-truth master menu flow and step-by-step screen interaction taxonomy for the **Admin Portal** (`ADMIN` / Campus Dean / Branch Principal) in the **Smart School Enterprise Platform**.

While the **Super Admin** (`SUPER_ADMIN`) operates with universal multi-tenant bypass (`app.bypass_rls = true`), the **Admin** operates as the supreme institutional officer for their designated campus/branch (`app.current_branch_id = ?`). The Admin panel mirrors the complete 34-module suite of operational, academic, financial, logistic, and student-lifecycle capabilities shown in the authoritative master system blueprint.

- **Primary Role Token**: `ADMIN` (Campus Dean / Branch Administrator)
- **Security & RLS Scope**: Scoped strictly to `TenantBranchContext.getBranchId()`.
- **Total Master Navigation Accordion Modules**: 34 Modules
- **Total Operational Submenus / Slugs**: 180+ Screens
- **Standard Layout Architecture**:
  1. Sticky Top Navigation & Session Bar (`Current Session: 2026-27` + `Quick Links [grid_view]`)
  2. Left Accordion Sidebar Rail (260px expanded / 72px mini-rail)
  3. Tier-1 Dynamic KPI Progress Strip (6 metric progress meters)
  4. Tier-2 Analytical Charts & Gauges (4 analytical data representations)
  5. Standardized 3-Zone Content Flow (Select Criteria -> View Switcher -> Data Grid / Empty State Recovery)
- **Icon Standard**: Google Material Symbols exclusively (`fill={0|1}`, `weight={400}`). **STRICT ZERO EMOJI & ZERO UNICODE SYMBOL POLICY**.
- **Typography Standard**: Ubuntu (`font-ubuntu`) for English, Google Sans (`font-khmer`) for Khmer.

---

### 1. Admin Master Dashboard Flow & Visual Telemetry (From Live System Ingress)

The initial entry view upon Admin login (`/admin/dashboard`) renders an immediate high-velocity command center:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [Current Session: 2026-27]                                                 [Quick Links (grid_view)] [User] │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 1: REAL-TIME OPERATIONAL KPI METERS (6 Progress Cards)                                                │
│ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌────────────────┐ │
│ │Fees Awaiting Pay  │ │Staff Appr Leave   │ │Student Appr Leave │ │Converted Leads    │ │Staff Present   │ │
│ │2/7        [Blue]  │ │1/3        [Cyan]  │ │3/10       [Navy]  │ │1/8         [Red]  │ │0/9    [Emerald] │ │
│ └───────────────────┘ └───────────────────┘ └───────────────────┘ └───────────────────┘ └────────────────┘ │
│ ┌───────────────────┐                                                                                       │
│ │Student Present    │                                                                                       │
│ │37/89     [Amber]  │                                                                                       │
│ └───────────────────┘                                                                                       │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ TIER 2: 4-TILE VISUAL ANALYTICS & REVENUE GAUGES                                                           │
│ ┌──────────────────────────────────────────────┐  ┌───────────────────────────────────────────────────────┐ │
│ │ Fees Collection & Expenses For Current Month │  │ Income - Current Month (Donut Breakdown)              │ │
│ │ Daily Dual-Bar Chart (Collection vs Expense) │  │ Donation (Green) | Rent (Amber) | Misc (Teal)         │ │
│ └──────────────────────────────────────────────┘  └───────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────┐  ┌───────────────────────────────────────────────────────┐ │
│ │ Fees Collection & Expenses For Academic Sess │  │ Expense - Current Month (Donut Breakdown)             │ │
│ │ Annual 12-Month Spline Trend (Apr to Mar)    │  │ Stationery | Telephone | Misc | Flower                │ │
│ └──────────────────────────────────────────────┘  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Step-by-Step Dashboard Telemetry Flow:
1. **Step 01 (Session & Branch Validation)**:
   - System checks `TenantBranchContext.getBranchId()`.
   - Top-left displays active academic session `Current Session: 2026-27`.
   - Top-right displays `Quick Links` button with 9-dot grid icon (`grid_view`) triggering the fast-action modal.
2. **Step 02 (KPI Progress Meters Ingress)**:
   - **Fees Awaiting Payment**: `2/7` (Blue `#3b82f6` progress bar). Direct link to `/admin/fees/search-due`.
   - **Staff Approved Leave**: `1/3` (Cyan `#06b6d4` progress bar). Direct link to `/admin/human-resource/approve-leave-request`.
   - **Student Approved Leave**: `3/10` (Navy `#1e40af` progress bar). Direct link to `/admin/attendance/approve-leave`.
   - **Converted Leads**: `1/8` (Red `#ef4444` progress bar). Direct link to `/admin/front-office/admission-enquiry`.
   - **Staff Present Today**: `0/9` (Neutral Gray / Green `#10b981` bar). Direct link to `/admin/human-resource/staff-attendance`.
   - **Student Present Today**: `37/89` (Amber `#f59e0b` bar). Direct link to `/admin/attendance/student-attendance`.
3. **Step 03 (Financial Analytics Telemetry Ingress)**:
   - **Daily Inflow/Outflow Bar Chart**: Real-time comparison for days 01-31 of the current month. Green bars represent fee collections; red bars represent recorded expense disbursements.
   - **Monthly Income Donut**: Visual revenue stream distribution by active Income Heads (`Donation`, `Rent`, `Miscellaneous`).
   - **Annual Session Spline**: 12-month revenue curve tracking collection health against expenditure thresholds across April through March.
   - **Monthly Expense Donut**: Procurement and overhead distribution (`Stationery Purchase`, `Telephone Bill`, `Miscellaneous`, `Facility Maintenance`).

---

### 2. Standardized 3-Zone Screen Flow Paradigm (From Live System UI)

Every query and listing module across the Admin portal strictly adheres to the standardized 3-zone layout demonstrated in the live interface:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ ZONE 1: SELECT CRITERIA (Card Container)                                                                    │
│ ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────┐ ┌──────────────────┐ │
│ │ Class *                   │ │ Section                   │ │ [ Search (search) ]   │ │ Search By Keyword│ │
│ │ [ Select Class       ▼ ]  │ │ [ Select Section     ▼ ]  │ │ (Primary Indigo/Blue) │ │ [ Search Name..] │ │
│ └───────────────────────────┘ └───────────────────────────┘ └───────────────────────┘ └──────────────────┘ │
│                                                                                       ┌──────────────────┐ │
│                                                                                       │ [ Search (search)│ │
│                                                                                       │ (Purple/Indigo)  │ │
│                                                                                       └──────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 2: VIEW SWITCHER / ACTION TOOLBAR                                                                     │
│ [ [view_list] List View (Active Pill) ]     [ [grid_view] Details View ]                                    │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 3: DATA TABLE / EMPTY-STATE RECOVERY                                                                   │
│ ┌──────────────┬──────────────┬──────────┬────────┬─────────────┬───────────┬────────┬──────────┬─────────┐ │
│ │ Admission No │ Student Name │ Roll No. │ Class  │ Father Name │ DOB       │ Gender │ Category │ Action  │ │
│ ├──────────────┴──────────────┴──────────┴────────┴─────────────┴───────────┴────────┴──────────┴─────────┤ │
│ │ [ Empty State Illustration: Folder with Document Stack ]                                                 │ │
│ │ No data available in table                                                                               │ │
│ │ "Add new record or search with different criteria."                                                      │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│ Showing 0 to 0 of 0 entries                                                      [Previous] [Next] (Disabled)│
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Step-by-Step Screen Execution Flow:
- **Step A (Criteria Ingress)**: Admin selects required filter parameters (`Class *`, `Section`) OR inputs an elastic search term (`Search By Keyword`).
- **Step B (Trigger Search)**: Clicks primary `Search` button. Client performs instant query against `/api/v1/students?branchId={current_branch_id}&classId={id}&sectionId={id}`.
- **Step C (View Switching)**: Toggle between tabular dense layout (`List View`) and card profile layout (`Details View`).
- **Step D (Empty State / Data Hydration)**:
  - When zero results match: Displays empty state icon with guided recovery prompt: *"Add new record or search with different criteria."*
  - When records exist: Hydrates sortable, paginated data grid with row action buttons (`View`, `Edit`, `Delete`, `Print`).

---

### 3. Complete Step-by-Step Module Flow List (All 34 Modules & 180+ Submenus)

Below is the authoritative step-by-step navigation flow list for every module and submenu item available to the Admin:

---

#### Flow 01: Front Office (`support_agent`) — `/admin/front-office`
- **Submenu 01: Admission Enquiry** (`/admin/front-office/admission-enquiry`)
  - *Flow Step 1*: Set top criteria filters (`Enquiry Date Range`, `Source`, `Status: Active/Passive/All`).
  - *Flow Step 2*: Click `+ Add` button to open modal drawer with 12 fields (Name, Phone, Email, Address, Description, Note, Date, Next Follow Up Date, Assigned Staff, Reference, Source, Class, Number of Children).
  - *Flow Step 3*: View table (Name, Phone, Source, Enquiry Date, Last Follow Up, Next Follow Up, Status badge, Action).
  - *Flow Step 4*: Row action click `Follow Up` to log phone call notes or convert enquiry into admission.
- **Submenu 02: Visitor Book** (`/admin/front-office/visitor-book`)
  - *Flow Step 1*: Left column displays Visitor Pass intake form (`Purpose *`, `Meeting With *`, `Visitor Name *`, `Phone`, `ID Card`, `Number Of Person`, `Date`, `In Time`, `Out Time`, `Note`, `Attach Document`).
  - *Flow Step 2*: Right column renders live visitor ledger table with real-time checkout timestamping.
- **Submenu 03: Phone Call Log** (`/admin/front-office/phone-call-log`)
  - *Flow Step 1*: Log inbound/outbound staff call records (`Call Type`, `Name`, `Phone *`, `Date`, `Duration`, `Next Follow Up Date`).
  - *Flow Step 2*: Search historical telecommunication audit trails.
- **Submenu 04: Postal Dispatch** (`/admin/front-office/postal-dispatch`)
  - *Flow Step 1*: Record outgoing courier/post (`To Title *`, `Reference No`, `Address`, `From Title`, `Date`, `Attach Document`).
  - *Flow Step 2*: Dispatch tracking register with consignment slip download.
- **Submenu 05: Postal Receive** (`/admin/front-office/postal-receive`)
  - *Flow Step 1*: Record incoming deliveries (`From Title *`, `Reference No`, `To Title`, `Date`, `Attach Document`).
  - *Flow Step 2*: Delivery acknowledgment ledger for internal department routing.
- **Submenu 06: Complain** (`/admin/front-office/complain`)
  - *Flow Step 1*: Register parent or student grievances (`Complain By *`, `Source *`, `Complain Type *`, `Assigned Staff`, `Action Taken`).
  - *Flow Step 2*: Track resolution lifecycle with status flags (`Pending`, `In Progress`, `Resolved`).
- **Submenu 07: Setup Front Office** (`/admin/front-office/setup-front-office`)
  - *Flow Step 1*: Configure master taxonomies across 4 tabs: `Purpose`, `Complain Type`, `Source`, `Reference`.

---

#### Flow 02: Student Information (`school`) — `/admin/student-info`
- **Submenu 01: Student Details** (`/admin/student-info/student-details`)
  - *Flow Step 1*: Ingress via `Select Criteria` (Dropdowns: `Class *`, `Section` -> `Search`, or freeform `Search By Keyword`).
  - *Flow Step 2*: Switch views via `List View` / `Details View` tabs.
  - *Flow Step 3*: Inspect roster: Admission No, Student Name, Roll No., Class, Father Name, DOB, Gender, Category, Mobile Number.
  - *Flow Step 4*: Access student profile dossier: Academic record, Fee history, Attendance heatmap, Disciplinary records.
- **Submenu 02: Student Admission** (`/admin/student-info/student-admission`)
  - *Flow Step 1*: Complete 6-section intake wizard:
    - Section 1: Academic & Personal Info (Admission No, Roll No, Class, Section, First Name, Last Name, Gender, DOB, Category, Religion, Caste, Mobile, Email, Photo).
    - Section 2: Parent / Guardian Info (Father Name, Mother Name, Guardian Name, Relation, Occupation, Contact, Address).
    - Section 3: Sibling Linking (Search existing students by Class & Section -> 1-click sibling link).
    - Section 4: Student Address (Current Address, Permanent Address).
    - Section 5: Transport & Hostel Details (Route, Vehicle Pickup Point, Hostel, Room No).
    - Section 6: Miscellaneous & Uploads (National ID, Local ID, Previous School Details, Upload Documents).
  - *Flow Step 2*: Click `Save` -> Generates Student ID, triggers admission event, provisions student/parent portal accounts.
- **Submenu 03: Online Admission** (`/admin/student-info/online-admission`)
  - *Flow Step 1*: Review public front-site admission applications.
  - *Flow Step 2*: Filter by `Form Status` (`Submitted`, `In Review`, `Approved`, `Rejected`) and `Payment Status` (`Paid`, `Unpaid`).
  - *Flow Step 3*: 1-click enroll approved applicants directly into institutional student database.
- **Submenu 04: Disabled Students** (`/admin/student-info/disabled-students`)
  - *Flow Step 1*: Filter archived student accounts by Class and Section.
  - *Flow Step 2*: Review suspension / exit audit details with recorded `Disable Reason`.
  - *Flow Step 3*: Action 1-click `Reactivate Student` to restore enrollment.
- **Submenu 05: Multi Class Student** (`/admin/student-info/multi-class-student`)
  - *Flow Step 1*: Search student across grade cohorts.
  - *Flow Step 2*: Assign supplementary class/section enrollments for cross-curricular programs.
- **Submenu 06: Bulk Delete** (`/admin/student-info/bulk-delete`)
  - *Flow Step 1*: Filter students by Class and Section.
  - *Flow Step 2*: Select students via batch checkboxes.
  - *Flow Step 3*: Confirm administrative purge with safety prompt.
- **Submenu 07: Student Categories** (`/admin/student-info/student-categories`)
  - *Flow Step 1*: Left column: Add Category form (`Category Name *`).
  - *Flow Step 2*: Right column: Category directory (`General`, `OBC`, `Special Needs`, `Scholarship`).
- **Submenu 08: Student House** (`/admin/student-info/student-house`)
  - *Flow Step 1*: Manage school houses (`Red House`, `Blue House`, `Green House`, `Yellow House`).
  - *Flow Step 2*: Assign house masters, colors, and slogans for intra-school competitions.
- **Submenu 09: Disable Reason** (`/admin/student-info/disable-reason`)
  - *Flow Step 1*: Maintain master exit reasons (`Graduated`, `Transferred`, `Expelled`, `Financial Default`).

---

#### Flow 03: Fees Collection (`attach_money`) — `/admin/fees`
- **Submenu 01: Collect Fees** (`/admin/fees/collect-fees`)
  - *Flow Step 1*: Filter by Class and Section, or search student by name/admission number.
  - *Flow Step 2*: Open student fee ledger showing allocated fee groups, due dates, amounts, discounts, and fines.
  - *Flow Step 3*: Select fee item -> Click `+ Collect` -> Modal opens -> Select Payment Mode (`Cash`, `Cheque`, `DD`, `Bank Transfer`, `Card`) -> Submit -> Generate print receipt.
- **Submenu 02: Offline Bank Payments** (`/admin/fees/offline-bank-payments`)
  - *Flow Step 1*: Review uploaded bank deposit slips and wire receipts submitted by parents.
  - *Flow Step 2*: Verify payment slip attachment against institutional bank transaction statements.
  - *Flow Step 3*: Click `Approve` (hydrates fee ledger) or `Reject` (notifies parent).
- **Submenu 03: Search Fees Payment** (`/admin/fees/search-payment`)
  - *Flow Step 1*: Ingress via single-token search (`Payment ID *`).
  - *Flow Step 2*: Fetch verified receipt dossier with timestamp, cashier name, mode, and line items.
- **Submenu 04: Search Due Fees** (`/admin/fees/search-due`)
  - *Flow Step 1*: Select `Fees Group`, `Class`, and `Section`.
  - *Flow Step 2*: Generate aging delinquency report showing outstanding balances and accrued fines.
- **Submenu 05: Fees Master** (`/admin/fees/fees-master`)
  - *Flow Step 1*: Left column: Assign Fees Group to Fees Type with `Due Date`, `Amount`, and `Fine Type` (`None`, `Percentage`, `Fix Amount`, `Cumulative Per-Day`).
  - *Flow Step 2*: Right column: Hierarchical grouped fee structure tree.
- **Submenu 06: Quick Fees** (`/admin/fees/quick-fees`)
  - *Flow Step 1*: High-velocity counter billing interface for barcode-scanned invoice payments.
- **Submenu 07: Fees Group** (`/admin/fees/fees-group`)
  - *Flow Step 1*: Create master billing packages (`Tuition Fees 2026-27`, `Transport Fees`, `Annual Facilities`).
- **Submenu 08: Fees Type** (`/admin/fees/fees-type`)
  - *Flow Step 1*: Configure line-item codes (`Admission Fee`, `Monthly Tuition`, `Library Deposit`, `Lab Fee`).
- **Submenu 09: Fees Discount** (`/admin/fees/fees-discount`)
  - *Flow Step 1*: Create financial assistance vouchers (`Sibling Discount - 15%`, `Staff Child - 50%`, `Merit Waiver`).
- **Submenu 10: Fees Carry Forward** (`/admin/fees/fees-carry-forward`)
  - *Flow Step 1*: Migrate previous session unpaid fee arrears into the active session ledger.
- **Submenu 11: Fees Reminder** (`/admin/fees/fees-reminder`)
  - *Flow Step 1*: Set automated SMS/Email delinquency alerts with scheduled offsets (e.g. 5 days before due date, on due date, 3 days overdue).

---

#### Flow 04: Online Course / LMS (`video_library`) — `/admin/online-course`
- **Submenu 01: Online Course** (`/admin/online-course/course-list`)
  - *Flow Step 1*: 4-column card grid showing published digital courses with media thumbnails, prices, and enrollments.
  - *Flow Step 2*: Course builder wizard: Title, Description, Subject, Class, Free/Paid, Price, Preview Video, Curriculum Lessons & Sections.
- **Submenu 02: Question Bank** (`/admin/online-course/question-bank`)
  - *Flow Step 1*: Multi-type question authoring desk (Single Choice, Multiple Choice, True/False, Descriptive).
  - *Flow Step 2*: Batch import questions via CSV or manual authoring.
- **Submenu 03: Offline Payment** (`/admin/online-course/offline-payment`)
  - *Flow Step 1*: Verify cashier and bank receipts for digital course purchases.
- **Submenu 04: Online Course Report** (`/admin/online-course/course-report`)
  - *Flow Step 1*: Student progress tracking, video watch percentages, and quiz performance matrices.
- **Submenu 05: Setting** (`/admin/online-course/setting`)
  - *Flow Step 1*: Cloud video hosting credentials (AWS S3, YouTube API, Vimeo) and guest preview policies.

---

#### Flow 05: Behaviour Records (`psychology`) — `/admin/behaviour`
- **Submenu 01: Assign Incident** (`/admin/behaviour/assign-incident`)
  - *Flow Step 1*: Select Class and Section -> Select student(s) -> Assign incident with positive merit or negative demerit points.
- **Submenu 02: Incidents** (`/admin/behaviour/incidents`)
  - *Flow Step 1*: Left column: Add Incident form (`Title *`, `Point *` [+ / -], `Description`).
  - *Flow Step 2*: Right column: Incident taxonomy directory with active demerit weights.
- **Submenu 03: Reports** (`/admin/behaviour/reports`)
  - *Flow Step 1*: 6-report behavioral hub (Student Leaderboard, House Standings, Class Demerit Distribution).
- **Submenu 04: Setting** (`/admin/behaviour/setting`)
  - *Flow Step 1*: Configure parent notification triggers and student rebuttal commentary permissions.

---

#### Flow 06: Multi Branch (`hub`) — `/admin/multi-branch`
- **Submenu 01: Overview** (`/admin/multi-branch/overview`)
  - *Flow Step 1*: View campus network health indicators and comparative branch metrics.
- **Submenu 02: Report** (`/admin/multi-branch/report`)
  - *Flow Step 1*: Multi-campus comparative analytics (Headcount, Financial Balance, PTR, Exam Scores).
- **Submenu 03: Setting** (`/admin/multi-branch/setting`)
  - *Flow Step 1*: View branch federation parameters and campus configuration.

---

#### Flow 07: Gmeet Live Classes (`videocam`) — `/admin/gmeet`
- **Submenu 01: Live Classes** (`/admin/gmeet/live-classes`)
  - *Flow Step 1*: Schedule Google Meet live lectures by Class, Section, and Subject.
  - *Flow Step 2*: Launch classes via `Start Meet` button; monitor status badges (`Awaited`, `Finished`, `Cancelled`).
- **Submenu 02: Live Meeting** (`/admin/gmeet/live-meeting`)
  - *Flow Step 1*: Schedule internal faculty and staff administrative conferences.
- **Submenu 03: Live Classes Report** (`/admin/gmeet/classes-report`)
  - *Flow Step 1*: Student participation and attendance audit logs with auto-calculated duration minutes.
- **Submenu 04: Live Meeting Report** (`/admin/gmeet/meeting-report`)
  - *Flow Step 1*: Faculty meeting attendance and duration logs.
- **Submenu 05: Setting** (`/admin/gmeet/setting`)
  - *Flow Step 1*: Google OAuth2 API client ID, client secret, and calendar sync configuration.

---

#### Flow 08: Zoom Live Classes (`video_camera_front`) — `/admin/zoom`
- **Submenu 01: Live Meeting** (`/admin/zoom/live-meeting`)
  - *Flow Step 1*: Schedule faculty video conferences supporting embedded Zoom Web SDK or native app launch.
- **Submenu 02: Live Classes** (`/admin/zoom/live-classes`)
  - *Flow Step 1*: Cohort virtual classroom scheduler with multi-section targeting.
- **Submenu 03: Live Classes Report** (`/admin/zoom/classes-report`)
  - *Flow Step 1*: Student Zoom attendance duration logs synchronized via Zoom Webhooks.
- **Submenu 04: Live Meeting Report** (`/admin/zoom/meeting-report`)
  - *Flow Step 1*: Faculty Zoom meeting participation logs.
- **Submenu 05: Setting** (`/admin/zoom/setting`)
  - *Flow Step 1*: Zoom OAuth2 Server-to-Server Account ID, Client ID, Client Secret, and Teacher API credentials.

---

#### Flow 09: Income (`payments`) — `/admin/income`
- **Submenu 01: Add Income** (`/admin/income/add-income`)
  - *Flow Step 1*: Left column: Add Income form (`Income Head *`, `Name *`, `Invoice Number`, `Date *`, `Amount *`, `File Dropzone`, `Description`).
  - *Flow Step 2*: Right column: Real-time revenue ledger with receipt download.
- **Submenu 02: Search Income** (`/admin/income/search-income`)
  - *Flow Step 1*: Search by date range or keyword query with total revenue aggregation summary.
- **Submenu 03: Income Head** (`/admin/income/income-head`)
  - *Flow Step 1*: Maintain Chart of Accounts categories (`Donation`, `Rent`, `Miscellaneous`, `Uniform Sale`).

---

#### Flow 10: Expenses (`receipt_long`) — `/admin/expenses`
- **Submenu 01: Add Expense** (`/admin/expenses/add-expense`)
  - *Flow Step 1*: Left column: Add Expense form (`Expense Head *`, `Name *`, `Invoice Number`, `Date *`, `Amount *`, `Attach Document`, `Description`).
  - *Flow Step 2*: Right column: Expenditure outflow ledger.
- **Submenu 02: Search Expense** (`/admin/expenses/search-expense`)
  - *Flow Step 1*: Filter expenditures by date period or keyword query with dynamic total calculation.
- **Submenu 03: Expense Head** (`/admin/expenses/expense-head`)
  - *Flow Step 1*: Maintain Chart of Accounts categories (`Stationery Purchase`, `Electricity Bill`, `Telephone Bill`).

---

#### Flow 11: Attendance (`co_present`) — `/admin/attendance`
- **Submenu 01: Student Attendance** (`/admin/attendance/student-attendance`)
  - *Flow Step 1*: Select `Class *`, `Section *`, and `Attendance Date *` -> Click `Search`.
  - *Flow Step 2*: Bulk roll-call register appears with radio options: `Present`, `Late`, `Absent`, `Half Day`, `Holiday`.
  - *Flow Step 3*: Quick-action buttons: `Mark As Holiday`, `Set All Present`.
  - *Flow Step 4*: Click `Save Attendance` -> Dispatches absent alerts to parent mobile phones.
- **Submenu 02: Approve Leave** (`/admin/attendance/approve-leave`)
  - *Flow Step 1*: Review student leave requests submitted via parent portal.
  - *Flow Step 2*: Approve or disapprove with recorded administrative remarks.
- **Submenu 03: Attendance By Date** (`/admin/attendance/attendance-by-date`)
  - *Flow Step 1*: Comprehensive date-centric presence heatmap and absence analytics.

---

#### Flow 12: CBSE Examination (`fact_check`) — `/admin/cbse-exam`
- **Submenu 01: Exam** (`/admin/cbse-exam/exam-list`)
  - *Flow Step 1*: Central Board assessment management with 7-action control strip (Classes, Roll Numbers, Timetable, Notifications, Edit, Marks Entry, Delete).
- **Submenu 02: Exam Schedule** (`/admin/cbse-exam/schedule`)
  - *Flow Step 1*: Room allocations, exam dates, durations, and credit weightings.
- **Submenu 03: Print Marksheet** (`/admin/cbse-exam/print-marksheet`)
  - *Flow Step 1*: Batch marksheet generation with official CBSE grading schemas.
- **Submenu 04: Template** (`/admin/cbse-exam/template`)
  - *Flow Step 1*: Visual layout designer for academic transcripts and grade cards.
- **Submenu 05: Assign Observation** (`/admin/cbse-exam/assign-observation`)
  - *Flow Step 1*: Co-scholastic observations and skill assessment ratings.
- **Submenu 06: Reports** (`/admin/cbse-exam/reports`)
  - *Flow Step 1*: Subject-wise and template-wise performance analytics.
- **Submenu 07: Setting** (`/admin/cbse-exam/setting`)
  - *Flow Step 1*: Vertical tabbed configuration: Exam Categories, Grade Scales, Assessment Rules, Terms.

---

#### Flow 13: Examinations (`assignment_turned_in`) — `/admin/examinations`
- **Submenu 01: Exam Group** (`/admin/examinations/exam-group`)
  - *Flow Step 1*: Configure assessment engines (General Assessment, Letter Grades, CGPA, GPA 4.0/5.0).
- **Submenu 02: Exam Schedule** (`/admin/examinations/exam-schedule`)
  - *Flow Step 1*: Schedule dates, start/end times, room allocations, and min/max pass marks.
- **Submenu 03: Exam Result** (`/admin/examinations/exam-result`)
  - *Flow Step 1*: Enter marks, verify grade curves, calculate GPAs, and publish student scores.
- **Submenu 04: Design Admit Card** (`/admin/examinations/design-admit-card`)
  - *Flow Step 1*: Hall ticket layout designer with school emblem, student photo, and instruction clauses.
- **Submenu 05: Print Admit Card** (`/admin/examinations/print-admit-card`)
  - *Flow Step 1*: Batch print exam admit cards filtered by Exam Group, Exam, Class, and Section.
- **Submenu 06: Design Marksheet** (`/admin/examinations/design-marksheet`)
  - *Flow Step 1*: Academic marksheet designer with custom headers, footers, grading legends, and seals.
- **Submenu 07: Print Marksheet** (`/admin/examinations/print-marksheet`)
  - *Flow Step 1*: Batch PDF marksheet generator.
- **Submenu 08: Marks Grade** (`/admin/examinations/marks-grade`)
  - *Flow Step 1*: Configure grading intervals (`A+` 90-100%, `A` 80-89%, `B` 70-79%, `F` < 50%).
- **Submenu 09: Marks Division** (`/admin/examinations/marks-division`)
  - *Flow Step 1*: Configure academic divisions (`First Division`, `Second Division`, `Third Division`).

---

#### Flow 14: Online Examinations (`laptop_chromebook`) — `/admin/online-exam`
- **Submenu 01: Online Exam** (`/admin/online-exam/exam-list`)
  - *Flow Step 1*: Dual tabs (`Upcoming Exams` vs `Closed Exams`).
  - *Flow Step 2*: Action strip: View, Assign Students, Add Questions, Edit, Evaluate, Report, Delete.
- **Submenu 02: Question Bank** (`/admin/online-exam/question-bank`)
  - *Flow Step 1*: Author CBT questions with multiple choices, rich text, and correct answer flags.

---

#### Flow 15: Academics (`menu_book`) — `/admin/academics`
- **Submenu 01: Class Timetable** (`/admin/academics/class-timetable`)
  - *Flow Step 1*: Filter by Class and Section -> Configure Monday-to-Saturday weekly timetable periods.
- **Submenu 02: Teachers Timetable** (`/admin/academics/teachers-timetable`)
  - *Flow Step 1*: View faculty weekly schedules and teaching load distribution.
- **Submenu 03: Assign Class Teacher** (`/admin/academics/assign-class-teacher`)
  - *Flow Step 1*: Bind faculty members as class advisors and grade homeroom teachers.
- **Submenu 04: Promote Students** (`/admin/academics/promote-students`)
  - *Flow Step 1*: End-of-year promotion engine migrating passing students to the next grade level.
- **Submenu 05: Subject Group** (`/admin/academics/subject-group`)
  - *Flow Step 1*: Bundle curriculum tracks (e.g. `Science Track`, `Commerce Track`, `Arts Track`).
- **Submenu 06: Subjects** (`/admin/academics/subjects`)
  - *Flow Step 1*: Maintain individual subjects with Theory/Practical classification and codes.
- **Submenu 07: Class** (`/admin/academics/class`)
  - *Flow Step 1*: Manage school grades/standards (`Grade 1` through `Grade 12`).
- **Submenu 08: Sections** (`/admin/academics/sections`)
  - *Flow Step 1*: Configure section divisions (`Section A`, `Section B`, `Section C`).

---

#### Flow 16: Human Resource (`badge`) — `/admin/human-resource`
- **Submenu 01: Staff Directory** (`/admin/human-resource/staff-directory`)
  - *Flow Step 1*: Filter staff by Role (`Teacher`, `Accountant`, `Librarian`, `Receptionist`).
  - *Flow Step 2*: 4-column profile cards or data table with detailed staff dossiers.
  - *Flow Step 3*: `+ Add Staff` multi-tab wizard (Basic, Payroll, Bank, Social, Documents).
- **Submenu 02: Staff Attendance** (`/admin/human-resource/staff-attendance`)
  - *Flow Step 1*: Filter by Role and Date -> Mark daily presence (`Present`, `Late`, `Absent`, `Half Day`).
- **Submenu 03: Payroll** (`/admin/human-resource/payroll`)
  - *Flow Step 1*: Generate monthly staff payroll, calculate earnings, deductions, tax, and issue payslips.
- **Submenu 04: Approve Leave Request** (`/admin/human-resource/approve-leave-request`)
  - *Flow Step 1*: Faculty and employee leave approvals with remaining balance checks.
- **Submenu 05: Apply Leave** (`/admin/human-resource/apply-leave`)
  - *Flow Step 1*: Submit administrative leave applications.
- **Submenu 06: Leave Type** (`/admin/human-resource/leave-type`)
  - *Flow Step 1*: Configure master leave categories (`Casual Leave`, `Medical Leave`, `Maternity Leave`).
- **Submenu 07: Teachers Rating** (`/admin/human-resource/teachers-rating`)
  - *Flow Step 1*: Student and parent instructional ratings and feedback reviews.
- **Submenu 08: Department** (`/admin/human-resource/department`)
  - *Flow Step 1*: Institutional departments (`Academic`, `Science`, `Administration`, `Sports`).
- **Submenu 09: Designation** (`/admin/human-resource/designation`)
  - *Flow Step 1*: Staff titles (`Principal`, `Senior Teacher`, `Lab Assistant`, `Bus Driver`).
- **Submenu 10: Disabled Staff** (`/admin/human-resource/disabled-staff`)
  - *Flow Step 1*: Deactivated staff member archive records.

---

#### Flow 17: Communicate (`campaign`) — `/admin/communicate`
- **Submenu 01: Notice Board** (`/admin/communicate/notice-board`)
  - *Flow Step 1*: Compose bulletins with targeted audience roles (`Student`, `Parent`, `Teacher`, `Staff`).
- **Submenu 02: Send Email** (`/admin/communicate/send-email`)
  - *Flow Step 1*: 4-mode email composer: `Group`, `Individual`, `Class`, `Today's Birthday`.
- **Submenu 03: Send SMS** (`/admin/communicate/send-sms`)
  - *Flow Step 1*: DLT-compliant SMS broadcast composer with dynamic character counters.
- **Submenu 04: Email / SMS Log** (`/admin/communicate/email-sms-log`)
  - *Flow Step 1*: Dispatch transmission ledger tracking delivery statuses and failure reasons.
- **Submenu 05: Schedule Email SMS Log** (`/admin/communicate/schedule-log`)
  - *Flow Step 1*: Manage automated queued communications.
- **Submenu 06: Login Credentials Send** (`/admin/communicate/login-credentials-send`)
  - *Flow Step 1*: Batch dispatch portal usernames and password reset links to parents/students.
- **Submenu 07: Email Template** (`/admin/communicate/email-template`)
  - *Flow Step 1*: Design reusable HTML email message templates.
- **Submenu 08: SMS Template** (`/admin/communicate/sms-template`)
  - *Flow Step 1*: Author standardized SMS templates with dynamic tags (`[name]`, `[due_amount]`).

---

#### Flow 18: Download Center (`download`) — `/admin/download-center`
- **Submenu 01: Upload/Share Content** (`/admin/download-center/upload-content`)
  - *Flow Step 1*: Upload learning materials, syllabi, and administrative forms with storage quota telemetry.
- **Submenu 02: Content Share List** (`/admin/download-center/share-list`)
  - *Flow Step 1*: Audit shared digital documents and expiration dates (`Valid Upto`).
- **Submenu 03: Video Tutorial** (`/admin/download-center/video-tutorial`)
  - *Flow Step 1*: 6-column educational video tutorial repository with YouTube embed players.
- **Submenu 04: Content Type** (`/admin/download-center/content-type`)
  - *Flow Step 1*: Maintain document categories (`Assignments`, `Study Materials`, `Syllabus`).

---

#### Flow 19: Homework (`assignment`) — `/admin/homework`
- **Submenu 01: Add Homework** (`/admin/homework/add-homework`)
  - *Flow Step 1*: Criteria filter (`Class *`, `Section *`, `Subject Group *`, `Subject *`, `Homework Date *`).
  - *Flow Step 2*: Create assignment modal: Submission Date, Document Attachment, Description.
  - *Flow Step 3*: Dual tabs (`Upcoming Homework` vs `Closed Homework`).
  - *Flow Step 4*: Cohort evaluation modal: Mark student submissions, grade quality, enter feedback.
- **Submenu 02: Daily Assignment** (`/admin/homework/daily-assignment`)
  - *Flow Step 1*: Daily micro-task monitoring and student submission tracker.

---

#### Flow 20: Library (`auto_stories`) — `/admin/library`
- **Submenu 01: Book List** (`/admin/library/book-list`)
  - *Flow Step 1*: Catalog books with ISBN, Title, Author, Publisher, Rack Number, Qty, and Unit Price.
- **Submenu 02: Issue - Return** (`/admin/library/issue-return`)
  - *Flow Step 1*: Member circulation desk: Search member by barcode/ID -> Issue book with return date -> Check in returns -> Calculate overdue fines.
- **Submenu 03: Add Student** (`/admin/library/add-student`)
  - *Flow Step 1*: Provision library membership cards for students.
- **Submenu 04: Add Staff Member** (`/admin/library/add-staff-member`)
  - *Flow Step 1*: Enroll faculty members into the library loan system.

---

#### Flow 21: Inventory (`inventory_2`) — `/admin/inventory`
- **Submenu 01: Issue Item** (`/admin/inventory/issue-item`)
  - *Flow Step 1*: Loan equipment to staff or departments -> Click `Click To Return` button to replenish stock.
- **Submenu 02: Add Item Stock** (`/admin/inventory/item-stock`)
  - *Flow Step 1*: Log asset purchases, unit prices, supplier vouchers, and quantity increases.
- **Submenu 03: Add Item** (`/admin/inventory/item`)
  - *Flow Step 1*: Master asset catalog with real-time `Available Quantity` counters.
- **Submenu 04: Item Category** (`/admin/inventory/item-category`)
  - *Flow Step 1*: Equipment categories (`Electronics`, `Furniture`, `Stationery`, `Lab Ware`).
- **Submenu 05: Item Store** (`/admin/inventory/item-store`)
  - *Flow Step 1*: Campus storage depots and warehouse locations.
- **Submenu 06: Item Supplier** (`/admin/inventory/item-supplier`)
  - *Flow Step 1*: Commercial vendor directory with contact details and tax IDs.

---

#### Flow 22: Transport (`directions_bus`) — `/admin/transport`
- **Submenu 01: Fees Master** (`/admin/transport/fees-master`)
  - *Flow Step 1*: 12-month transit fee schedule with mass copy feature (`[x] Copy First Detail For All Months`).
- **Submenu 02: Pickup Point** (`/admin/transport/pickup-point`)
  - *Flow Step 1*: Geofenced transit stops with high-precision GPS coordinates.
- **Submenu 03: Routes** (`/admin/transport/routes`)
  - *Flow Step 1*: Campus bus route directory.
- **Submenu 04: Vehicles** (`/admin/transport/vehicles`)
  - *Flow Step 1*: Bus fleet register (Plate Number, Vehicle Model, Driver Name, License, Capacity).
- **Submenu 05: Assign Vehicle** (`/admin/transport/assign-vehicle`)
  - *Flow Step 1*: Allocate vehicles and drivers to designated transport routes.
- **Submenu 06: Route Pickup Point** (`/admin/transport/route-pickup-point`)
  - *Flow Step 1*: Sequence pickup stops with transit times and distances.
- **Submenu 07: Student Transport Fees** (`/admin/transport/student-transport-fees`)
  - *Flow Step 1*: Collect monthly transit fares and verify passenger rosters.

---

#### Flow 23: Hostel (`hotel`) — `/admin/hostel`
- **Submenu 01: Hostel Rooms** (`/admin/hostel/hostel-rooms`)
  - *Flow Step 1*: Dormitory room inventory with bed counts and tariffs (`Cost Per Bed`).
- **Submenu 02: Room Type** (`/admin/hostel/room-type`)
  - *Flow Step 1*: Room classifications (`One Bed AC`, `Two Bed AC`, `Two Bed`, `Combine Bed`).
- **Submenu 03: Hostel** (`/admin/hostel/hostel-list`)
  - *Flow Step 1*: Boarding facility directory partitioned by residency (`Boys`, `Girls`, `Combine`).

---

#### Flow 24: Certificate (`workspace_premium`) — `/admin/certificate`
- **Submenu 01: Transfer Certificate** (`/admin/certificate/transfer-certificate`)
  - *Flow Step 1*: Statutory School Leaving Certificate clearance and issuance engine.
- **Submenu 02: Student Certificate** (`/admin/certificate/student-certificate`)
  - *Flow Step 1*: Visual certificate designer with 20+ dynamic tokens (`[name]`, `[dob]`, `[class]`).
- **Submenu 03: Generate Certificate** (`/admin/certificate/generate-certificate`)
  - *Flow Step 1*: Batch PDF certificate generation by Class and Section.
- **Submenu 04: Student ID Card** (`/admin/certificate/student-id-card`)
  - *Flow Step 1*: Student identity badge designer with barcode/QR code and layout choices (Horizontal/Vertical).
- **Submenu 05: Generate ID Card** (`/admin/certificate/generate-id-card`)
  - *Flow Step 1*: Batch print student ID cards.
- **Submenu 06: Staff ID Card** (`/admin/certificate/staff-id-card`)
  - *Flow Step 1*: Faculty and employee identity badge layout builder.
- **Submenu 07: Generate Staff ID Card** (`/admin/certificate/generate-staff-id-card`)
  - *Flow Step 1*: Batch print staff ID credentials.

---

#### Flow 25: Front CMS (`web`) — `/admin/front-cms`
- **Submenu 01: Event** (`/admin/front-cms/event`)
  - *Flow Step 1*: Publish public events and announcements to the public institutional portal.
- **Submenu 02: Gallery** (`/admin/front-cms/gallery`)
  - *Flow Step 1*: Photo and video event albums.
- **Submenu 03: News** (`/admin/front-cms/news`)
  - *Flow Step 1*: Editorial press releases and campus newsletters.
- **Submenu 04: Media Manager** (`/admin/front-cms/media-manager`)
  - *Flow Step 1*: Centralized media library with dual-ingress uploader (local files or YouTube links).
- **Submenu 05: Pages** (`/admin/front-cms/pages`)
  - *Flow Step 1*: CMS page builder with immutable safeguards for system pages (`Home`, `Contact`, `Complain`).
- **Submenu 06: Menus** (`/admin/front-cms/menus`)
  - *Flow Step 1*: Drag-and-drop navigation tree builder for `Main Menu` and `Bottom Menu`.
- **Submenu 07: Banner Images** (`/admin/front-cms/banner-images`)
  - *Flow Step 1*: Homepage carousel banners and marketing slides.

---

#### Flow 26: Alumni (`groups`) — `/admin/alumni`
- **Submenu 01: Manage Alumni** (`/admin/alumni/manage-alumni`)
  - *Flow Step 1*: Filter graduates by Pass Out Session and Class -> Track higher education and employment.
- **Submenu 02: Events** (`/admin/alumni/events`)
  - *Flow Step 1*: Interactive alumni reunion scheduler and attendance coordinator.

---

#### Flow 27: Reports (`analytics`) — `/admin/reports`
- **Submenu 01: Student Information** (`/admin/reports/student-information`) — 13 reports (Admission Report, Student History, Class-Subject Report, House Report, Profile Changes).
- **Submenu 02: Finance** (`/admin/reports/finance`) — 15 reports (Fees Statement, Balance Report, Collection Report, Income/Expense Ledger, Online Fees Report).
- **Submenu 03: Attendance** (`/admin/reports/attendance`) — 7 reports (Attendance Report, Student Day Attendance, Daily Attendance Summary, Staff Attendance).
- **Submenu 04: Examinations** (`/admin/reports/examinations`) — Rank Report, Subject Marks Report, Exam Group Report.
- **Submenu 05: Online Examinations** (`/admin/reports/online-examinations`) — Result Report, Attempt Report, Question Performance.
- **Submenu 06: Lesson Plan** (`/admin/reports/lesson-plan`) — Syllabus Status Report, Topic Completion Matrix.
- **Submenu 07: Human Resource** (`/admin/reports/human-resource`) — Staff Report, Payroll Report, Leave Report.
- **Submenu 08: Homework** (`/admin/reports/homework`) — Homework Evaluation Report.
- **Submenu 09: Library** (`/admin/reports/library`) — Book Issue Report, Due Book Report, Book Inventory.
- **Submenu 10: Inventory** (`/admin/reports/inventory`) — Stock Report, Item Issue Report.
- **Submenu 11: Transport** (`/admin/reports/transport`) — Route Vehicle Report, Transport Fees Report.
- **Submenu 12: Hostel** (`/admin/reports/hostel`) — Hostel Bed Allocation Report.
- **Submenu 13: Alumni** (`/admin/reports/alumni`) — Alumni Roster Report.
- **Submenu 14: User Log** (`/admin/reports/user-log`) — Security login sessions and IP addresses.
- **Submenu 15: Audit Trail Report** (`/admin/reports/audit-trail`) — Entity mutation history and staff action logs.

---

#### Flow 28: System Setting (`settings`) — `/admin/system-setting`
- **Submenu 01: General Setting** (`/admin/system-setting/general-setting`)
  - *Flow Step 1*: 14 Inner Sub-tabs:
    1. `School Details`: Name, Code, Email, Phone, Address.
    2. `Logo & Crest`: Header logo, Admin logo, Mobile app logo.
    3. `Login Page Background`: Custom background wallpaper uploader.
    4. `Backend Theme`: Theme accents, navigation style.
    5. `Mobile App`: Flutter/Android API keys and mobile access flags.
    6. `Student/Guardian Panel`: Parent portal permissions and visibility toggles.
    7. `Fees`: Auto-fee invoice generation rules and receipt numbering.
    8. `ID Auto Generation`: Automated Admission No, Staff ID, and Roll No formatting.
    9. `Attendance Type`: Daily vs Period-wise attendance mode.
    10. `Google Drive`: Cloud backup drive authorization.
    11. `Whatsapp`: Meta Cloud API credentials.
    12. `Chat`: Internal campus instant messaging settings.
    13. `Maintenance`: Maintenance mode toggle with whitelist IPs.
    14. `Miscellaneous`: Timezone, date format, and currency configurations.
- **Submenu 02: Session Setting** (`/admin/system-setting/session-setting`)
  - *Flow Step 1*: Master academic sessions ledger with active session toggle.
- **Submenu 03: Notification Setting** (`/admin/system-setting/notification-setting`)
  - *Flow Step 1*: Multi-channel notification dispatcher (Email, SMS, WhatsApp, Push).
- **Submenu 04: Whatsapp Messaging** (`/admin/system-setting/whatsapp-messaging`)
  - *Flow Step 1*: Meta Official API / Twilio WhatsApp template registration.
- **Submenu 05: SMS Setting** (`/admin/system-setting/sms-setting`)
  - *Flow Step 1*: Gateway integrations (Twilio, Clickatell, MSG91, Textlocal).
- **Submenu 06: Email Setting** (`/admin/system-setting/email-setting`)
  - *Flow Step 1*: SMTP / AWS SES / SendGrid mail server parameters.
- **Submenu 07: Payment Methods** (`/admin/system-setting/payment-methods`)
  - *Flow Step 1*: Gateway credentials (Stripe, PayPal, ABA PayWay, Wing Bank).
- **Submenu 08: Print Header Footer** (`/admin/system-setting/print-header-footer`)
  - *Flow Step 1*: Institutional letterhead and receipt header/footer designer.
- **Submenu 09: Thermal Print** (`/admin/system-setting/thermal-print`)
  - *Flow Step 1*: POS 58mm / 80mm ESC/POS thermal receipt formatting.
- **Submenu 10: Front CMS Setting** (`/admin/system-setting/front-cms-setting`)
  - *Flow Step 1*: Public portal theme and feature flags.
- **Submenu 11: Backup Restore** (`/admin/system-setting/backup-restore`)
  - *Flow Step 1*: Manual and automated PostgreSQL database dump archives.
- **Submenu 12: Currency** (`/admin/system-setting/currency`)
  - *Flow Step 1*: Currency symbols and decimal formatting (`$`, `USD`, `KHR`).
- **Submenu 13: Users** (`/admin/system-setting/users`)
  - *Flow Step 1*: User account governance (Staff, Students, Parents).
- **Submenu 14: Custom Fields** (`/admin/system-setting/custom-fields`)
  - *Flow Step 1*: Add dynamic fields to Student, Staff, and Admission forms.
- **Submenu 15: System Fields** (`/admin/system-setting/system-fields`)
  - *Flow Step 1*: Enable/disable optional default system fields.
- **Submenu 16: Student Profile Update** (`/admin/system-setting/student-profile-update`)
  - *Flow Step 1*: Review student profile edit requests submitted via student portal.
- **Submenu 17: Sidebar Menu** (`/admin/system-setting/sidebar-menu`)
  - *Flow Step 1*: Reorder and toggle left sidebar menu visibility.

---

#### Flow 29: Annual Calendar (`calendar_month`) — `/admin/annual-calendar`
- **Submenu 01: Annual Calendar** (`/admin/annual-calendar/calendar`)
  - *Flow Step 1*: Interactive monthly calendar grid displaying exams, holidays, and campus events.
- **Submenu 02: Holiday Type** (`/admin/annual-calendar/holiday-type`)
  - *Flow Step 1*: Maintain institutional holiday taxonomy (`National Holiday`, `School Break`, `Festive`).

---

#### Flow 30: Lesson Plan (`auto_stories`) — `/admin/lesson-plan`
- **Submenu 01: Copy Old Lessons** (`/admin/lesson-plan/copy-old-lessons`)
  - *Flow Step 1*: Cross-session syllabus cloning from past academic years.
- **Submenu 02: Manage Lesson Plan** (`/admin/lesson-plan/manage-lesson-plan`)
  - *Flow Step 1*: Weekly faculty curriculum delivery schedule.
- **Submenu 03: Manage Syllabus Status** (`/admin/lesson-plan/syllabus-status`)
  - *Flow Step 1*: Granular topic completion progress meters per subject.
- **Submenu 04: Lesson** (`/admin/lesson-plan/lesson`)
  - *Flow Step 1*: Add curriculum lesson units with `+ Add More` dynamic rows.
- **Submenu 05: Topic** (`/admin/lesson-plan/topic`)
  - *Flow Step 1*: Add sub-topics mapped to individual lessons.

---

#### Flow 31: Student CV (`badge`) — `/admin/student-cv`
- **Submenu 01: Build CV** (`/admin/student-cv/build-cv`)
  - *Flow Step 1*: Filter by Class and Section -> Select student -> Configure resume sections (Academic Honors, Attendance, Sports, Skills, Dean Signature) -> Click `Generate CV`.
- **Submenu 02: Download CV** (`/admin/student-cv/download-cv`)
  - *Flow Step 1*: Batch download student curriculum vitae PDFs for college placement.

---

#### Flow 32: Quick Fees (`bolt` / `receipt`) — `/admin/quick-fees`
- *Flow Step 1*: Dedicated single-click direct counter billing ingress.
- *Flow Step 2*: Input student Admission No -> Instantly loads active invoices -> Enter payment amount -> Submit & Print.

---

#### Flow 33: Thermal Print (`print`) — `/admin/thermal-print`
- *Flow Step 1*: Configure thermal docket layout, font scale, barcode integration, and paper cut feeds.
- *Flow Step 2*: Direct thermal print testing for POS transaction counters.

---

#### Flow 34: Whatsapp Messaging (`chat`) — `/admin/whatsapp-messaging`
- *Flow Step 1*: View active WhatsApp communication channels.
- *Flow Step 2*: Dispatch automated fee reminders and attendance notifications directly to parent WhatsApp numbers.

---

### 4. Admin vs. Super Admin Architectural Distinction Matrix

| Dimension | Super Admin (`SUPER_ADMIN`) | Admin / Campus Dean (`ADMIN`) |
| :--- | :--- | :--- |
| **RLS Scope** | Universal Bypass (`app.bypass_rls = true`) | Branch-Scoped (`app.current_branch_id = ?`) |
| **Multi-Branch Context** | Provisions branches, manages cross-campus federation | Operates exclusively within assigned branch |
| **Theme Accent Color** | Royal Amethyst Purple (`#8E24AA`) | Vivid Cerulean Blue (`#0288D1` / `#2563EB`) |
| **System Updates & Backups**| Triggers platform-wide database dumps & OTA updates | Requests branch backup, views campus audit logs |
| **Role Management** | Creates global roles & permissions | Assigns existing roles to campus staff |
| **Financial Authority** | Cross-campus balance sheet & revenue clearing | Campus fee collection, expenses, and payroll |
| **Academic Oversight** | Defines system-wide curriculum frameworks | Manages daily classes, timetables, exams, and attendance |

---

### 5. Summary Verification & Implementation Directives

1. **Adherence to Flow List Standard**: Every newly built admin view MUST provide the 3-zone layout (Select Criteria -> View Switcher -> Data Grid / Empty State).
2. **Strict Zero Emoji Rule**: Zero emoji or Unicode icon glyphs in any navigation item, button, badge, or message. Use Google Material Symbols only.
3. **Typography Standard**: English UI uses Ubuntu; Khmer UI uses Google Sans.
4. **Offline Resilience**: Internal asset references only. No CDN dependencies for core icons or fonts.
