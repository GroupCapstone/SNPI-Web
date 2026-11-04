# Accountant Portal Master Menu Flow & Panel Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Role Authority

This specification establishes the authoritative single-source-of-truth master menu taxonomy, interaction flow, and operational boundaries for the **Accountant Portal** (`ACCOUNTANT`) in the **Smart School Enterprise Platform**.

The **Accountant** is the chief campus fiscal controller, cashier, and procurement auditor:
- **Security & RLS Scope**: Scoped to the branch campus (`app.current_branch_id = ?`) with read/write access to financial ledgers (`fee_collections`, `incomes`, `expenses`, `payroll_runs`, `inventory_purchases`). Strictly barred from instructional grading, syllabus authoring, student promotion, or platform infrastructure.
- **Primary Role Token**: `ACCOUNTANT`
- **Logged-In Persona**: `James Deckar (Staff ID: 9004, Ground Floor, Finance)`
- **Brand Theme Accent**: Financial Amber / Emerald Gold (`#D97706` / `#059669`)
- **Total Master Navigation Accordions Visible**: **16 Modules** (out of 34 platform modules)
- **Total Operational Submenus**: **66 Submenus**
- **Completely Omitted Modules (18 Restricted Modules)**: Front Office, Student Information, Quick Fees, Examinations, Online Examinations, Academics, Lesson Plan, Library, Front CMS, Alumni (as main module), Multi Branch, Annual Calendar, Student CV, Thermal Print, Whatsapp Messaging, etc.

---

### 1. Accountant Permitted vs. Restricted Modules Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              ACCOUNTANT PORTAL TAXONOMY AT A GLANCE                             │
├────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ 16 PERMITTED OPERATIONAL MODULES (66 SUBMENUS) │ 18 STRICTLY RESTRICTED MODULES (OMITTED)       │
├────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ 01. Fees Collection (9 submenus)               │ 01. Student Information (Full Dossier & Intake)│
│ 02. Income (3 submenus)                        │ 02. Academics (Timetable & Promotion)          │
│ 03. Expenses (3 submenus)                      │ 03. Examinations (Mark Sheets & Hall Tickets)  │
│ 04. Human Resource (10 submenus - Full Payroll)│ 04. Online Examinations (CBT Assessment Desk)  │
│ 05. Inventory (6 submenus - Stock Procurement) │ 05. Lesson Plan (Curriculum & Syllabi Delivery)│
│ 06. Online Course (3 submenus - Offline Billing│ 06. Library (Book Inventory & Loans)           │
│ 07. Transport (3 submenus - Fee Verification)  │ 07. Front Office (Visitor Passes & Inquiries)  │
│ 08. Hostel (3 submenus - Room Rent Tracking)   │ 08. Front CMS (Public Website & Banners)       │
│ 09. Reports (7 submenus - Financial BI Focus)  │ 09. Quick Fees (Counter POS Barcode Desk)      │
│ 10. Behaviour Records (4 submenus)             │ 10. Multi Branch (Global Tenant Overview)      │
│ 11. CBSE Examination (2 submenus - Fee Sched)  │ 11. Alumni (Reunions & Events Main Module)     │
│ 12. Certificate (2 submenus - Staff ID Only)   │ 12. Annual Calendar (Master Event Management)  │
│ 13. Communicate (4 submenus - Notice/Email/SMS)│ 13. Student CV (Career Placement Authoring)    │
│ 14. Gmeet Live Classes (3 submenus - Staff Mtg)│ 14. Thermal Print (POS Hardware Setup)         │
│ 15. Zoom Live Classes (3 submenus - Staff Mtg) │ 15. Whatsapp Messaging (API Gateway Settings)  │
│ 16. System Setting (1 submenu - Print Header)  │ 16. Core System Setting (17 Platform Settings) │
└────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

---

### 2. Accountant Left Navigation Rail & Sequence (16 Accordions)

The accountant sidebar displays `Current Session: 2026-27`, `Quick Links [grid_view]`, followed by 16 vertical accordions:

1. **Fees Collection** (`payments`)
2. **Online Course** (`video_library`)
3. **Behaviour Records** (`psychology`)
4. **Gmeet Live Classes** (`videocam`)
5. **Zoom Live Classes** (`video_camera_front`)
6. **Income** (`attach_money`)
7. **Expenses** (`receipt_long`)
8. **CBSE Examination** (`fact_check`)
9. **Human Resource** (`badge`)
10. **Communicate** (`campaign`)
11. **Inventory** (`inventory_2`)
12. **Transport** (`directions_bus`)
13. **Hostel** (`hotel`)
14. **Certificate** (`workspace_premium`)
15. **Reports** (`analytics`)
16. **System Setting** (`settings`)

---

### 3. Master Financial Dashboard & Visual Analytics (Active Route: `/accountant/dashboard`)

```
┌────────────────────────────────────────────────────────────────┬────────────────────────────────────────────────┐
│ Fees Collection & Expenses For September 2026                  │ Income - September 2026                        │
│ [Daily Dual-Bar Histogram: Days 01–30]                         │ [Semi-Donut Gauge Chart]                       │
│  - Day 01: Fees ~$6,200 (Green) vs Expenses ~$1,000 (Red)      │  - Donation: ~35% (Green)                      │
│  - Days 07, 11, 17, 25, 30: Mid-Month Disbursements            │  - Rent: ~45% (Yellow)                         │
│                                                                │  - Miscellaneous1: ~20% (Teal)                 │
├────────────────────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ Fees Collection & Expenses For Session 2026-27                 │ Expense - September 2026                       │
│ [Annual Trend 12-Month Area Chart: April–March]                │ [Semi-Donut Gauge Chart]                       │
│  - Collection Curve (Green): Climbs from $6,800 to $17,000 peak│  - Stationary Purchase: ~35% (Purple)          │
│  - Expense Corridor (Red): Steady $2,000–$2,500 monthly spend  │  - Telephone Bill: ~15% (Blue)                 │
│                                                                │  - Miscellaneous: ~25% (Orange)                │
│                                                                │  - Flower: ~25% (Brown/Olive)                  │
├────────────────────────────────────────────────────────────────┴────────────────────────────────────────────────┤
│ Fees Overview Widget                                                                                            │
│  - 3 UNPAID (42.86%) [====================                    ]                                                 │
│  - PARTIALLY PAID                                                                                               │
│  - PAID                                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4. Step-by-Step Accountant Module Flow List (16 Permitted Modules)

---

#### Flow 01: Fees Collection (`payments`) — 9 Submenus (Primary Financial Core)
- **Submenu 01: Collect Fees** (`/accountant/fees/collect-fees`):
  - *Step 1*: Filter by `Class *`, `Section`, or `Search By Keyword` (Student Name, Roll Number, Enrollment No).
  - *Step 2*: Open student fee ledger; view pending tuition, transportation, and hostel fee installments.
  - *Step 3*: Select payment mode (`Cash`, `Cheque`, `DD`, `Bank Transfer`, `UPI`, `Card`).
  - *Step 4*: Apply active discount codes; calculate fine or waivers -> Click `Collect Fees` -> Generate printable 3-copy fiscal receipt.
- **Submenu 02: Search Fees Payment** (`/accountant/fees/search-payment`): Search fee payment transactions by receipt number, student ID, or payment date.
- **Submenu 03: Search Due Fees** (`/accountant/fees/search-due-fees`): Audit delinquent fee accounts across classes; export defaulter rosters.
- **Submenu 04: Fees Master** (`/accountant/fees/fees-master`): Configure fee structures, assigning Fee Groups to Fee Types with exact due dates and amounts.
- **Submenu 05: Fees Group** (`/accountant/fees/fees-group`): Define tuition bundles (e.g. *Class 1 Regular*, *Boarding Premium*, *Science Lab Fee*).
- **Submenu 06: Fees Type** (`/accountant/fees/fees-type`): Maintain fee catalog heads (`Admission Fee`, `Monthly Tuition`, `Exam Fee`, `Sports Fee`).
- **Submenu 07: Fees Discount** (`/accountant/fees/fees-discount`): Create merit-based or sibling discount rules with discount codes and fixed/percentage values.
- **Submenu 08: Fees Carry Forward** (`/accountant/fees/fees-carry-forward`): Roll over uncollected previous session fee balances into the active academic session.
- **Submenu 09: Fees Reminder** (`/accountant/fees/fees-reminder`): Configure automated SMS/email fee collection reminder schedules for upcoming or overdue dues.

---

#### Flow 02: Income (`attach_money`) — 3 Submenus
- **Submenu 01: Add Income** (`/accountant/income/add-income`):
  - *Step 1*: Left Column `Add Income`: Enter Income Head, Name, Invoice Number, Date, Amount, Attach Voucher/Bill, Description -> Click `Save`.
  - *Step 2*: Right Column `Income List`: Audit, search, and download revenue receipts.
- **Submenu 02: Search Income** (`/accountant/income/search-income`): Filter revenue by date ranges, income heads, and search keywords.
- **Submenu 03: Income Head** (`/accountant/income/income-head`): Maintain income categorization taxonomy (`Donation`, `Rent`, `Book Sale`, `Uniform Sale`, `Miscellaneous`).

---

#### Flow 03: Expenses (`receipt_long`) — 3 Submenus
- **Submenu 01: Add Expense** (`/accountant/expenses/add-expense`):
  - *Step 1*: Left Column `Add Expense`: Enter Expense Head, Name, Invoice Number, Date, Amount, Attach Bill, Description -> Click `Save`.
  - *Step 2*: Right Column `Expense List`: Review campus expenditure disbursements.
- **Submenu 02: Search Expense** (`/accountant/expenses/search-expense`): Audit expenditures by date range, payment voucher, and vendor payee.
- **Submenu 03: Expense Head** (`/accountant/expenses/expense-head`): Maintain operational cost heads (`Stationary Purchase`, `Telephone Bill`, `Electricity`, `Maintenance`, `Flower`).

---

#### Flow 04: Human Resource (`badge`) — 10 Submenus (Payroll & Staff Audit)
*Accountants require full HR payroll processing access to generate salary slips and disburse compensation.*
- **Submenu 01: Staff Directory** (`/accountant/human-resource/staff-directory`): Search campus employees across roles (`Teacher`, `Admin`, `Accountant`, `Librarian`, `Receptionist`).
- **Submenu 02: Staff Attendance** (`/accountant/human-resource/staff-attendance`): Audit employee attendance records for payroll deduction calculations.
- **Submenu 03: Payroll** (`/accountant/human-resource/payroll`):
  - *Step 1*: Select Role and Month/Year -> View employee compensation roster.
  - *Step 2*: Click `Generate Payroll` -> Compute Basic Salary, Earnings (Allowances), Deductions (TDS, Leave penalties) -> Calculate Net Pay.
  - *Step 3*: Click `Proceed to Payment` -> Select payment method (`Cash`, `Transfer`, `Cheque`) -> Print formal institutional Payslip.
- **Submenu 04: Approve Leave Request** (`/accountant/human-resource/approve-leave-request`): Verify paid vs. unpaid staff leave requests for payroll adjustments.
- **Submenu 05: Apply Leave** (`/accountant/human-resource/apply-leave`): Submit accountant personal leave requests.
- **Submenu 06: Leave Type** (`/accountant/human-resource/leave-type`): Audit leave categories (`Medical Leave`, `Casual Leave`, `Maternity Leave`).
- **Submenu 07: Teachers Rating** (`/accountant/human-resource/teachers-rating`): Review student teacher ratings.
- **Submenu 08: Department** (`/accountant/human-resource/department`): Campus organizational units (`Academic`, `Finance`, `Admin`, `Library`).
- **Submenu 09: Designation** (`/accountant/human-resource/designation`): Job title classifications (`Senior Accountant`, `Faculty`, `Dean`).
- **Submenu 10: Disabled Staff** (`/accountant/human-resource/disabled-staff`): View archived or resigned employee accounts for final settlement.

---

#### Flow 05: Inventory (`inventory_2`) — 6 Submenus (Procurement & Depot Accounting)
- **Submenu 01: Issue Item** (`/accountant/inventory/issue-item`): Log asset disbursements to faculty or staff members.
- **Submenu 02: Add Item Stock** (`/accountant/inventory/add-item-stock`): Record newly purchased goods with purchase price, supplier, store, and quantity.
- **Submenu 03: Add Item** (`/accountant/inventory/add-item`): Register item definitions with unit of measurement and description.
- **Submenu 04: Item Category** (`/accountant/inventory/item-category`): Organize inventory tracks (`Office Supplies`, `Science Equipment`, `Sports Kit`).
- **Submenu 05: Item Store** (`/accountant/inventory/item-store`): Track warehouse storage locations.
- **Submenu 06: Item Supplier** (`/accountant/inventory/item-supplier`): Manage approved procurement vendors and vendor ledger contacts.

---

#### Flow 06: Online Course (`video_library`) — 3 Submenus (Offline Course Payment Desk)
- **Submenu 01: Offline Payment** (`/accountant/online-course/offline-payment`): Verify and approve offline cash/bank course purchases submitted by students.
- **Submenu 02: Course Category** (`/accountant/online-course/course-category`): View LMS course taxonomy tracks.
- **Submenu 03: Online Course Report** (`/accountant/online-course/course-report`): Audit course revenue and student enrollment volume.

---

#### Flow 07: Transport (`directions_bus`) — 3 Submenus (Transit Fee Reconciliation)
- **Submenu 01: Routes** (`/accountant/transport/routes`): View bus transit routes and assigned fare tariffs.
- **Submenu 02: Vehicles** (`/accountant/transport/vehicles`): Inspect fleet vehicle registrations and fuel maintenance costs.
- **Submenu 03: Assign Vehicle** (`/accountant/transport/assign-vehicle`): Audit student bus allocations against transit fee collections.

---

#### Flow 08: Hostel (`hotel`) — 3 Submenus (Boarding Fee Reconciliation)
- **Submenu 01: Hostel Rooms** (`/accountant/hostel/hostel-rooms`): View room inventory, bed count, and cost per bed.
- **Submenu 02: Room Type** (`/accountant/hostel/room-type`): Review room tier pricing (`AC Deluxe`, `Single Non-AC`, `Dormitory`).
- **Submenu 03: Hostel** (`/accountant/hostel/hostel`): Inspect residential dormitory buildings.

---

#### Flow 09: Reports (`analytics`) — 7 Submenus (Financial BI Focus)
- **Submenu 01: Finance** (`/accountant/reports/finance`): Master fiscal reporting suite:
  - *Fees Statement Report*
  - *Balance Fees Report*
  - *Collection Report*
  - *Income & Expense Report*
  - *Payroll Statement*
- **Submenu 02: Attendance** (`/accountant/reports/attendance`): Student and staff attendance reports for fee/payroll cross-checking.
- **Submenu 03: Human Resource** (`/accountant/reports/human-resource`): Staff payroll histories, leave summaries, and allowances.
- **Submenu 04: Inventory** (`/accountant/reports/inventory`): Item stock valuation and purchase expense logs.
- **Submenu 05: Transport** (`/accountant/reports/transport`): Bus fare revenue audit reports.
- **Submenu 06: Hostel** (`/accountant/reports/hostel`): Dormitory room fee collection summaries.
- **Submenu 07: Alumni** (`/accountant/reports/alumni`): Past graduate contribution reports.

---

#### Flow 10: Behaviour Records (`psychology`) — 4 Submenus
- **Submenu 01: Assign Incident** (`/accountant/behaviour/assign-incident`): Query student by Class/Section -> View disciplinary points.
- **Submenu 02: Incidents** (`/accountant/behaviour/incidents`): Master infraction descriptions.
- **Submenu 03: Reports** (`/accountant/behaviour/reports`): Disciplinary point rankings.
- **Submenu 04: Setting** (`/accountant/behaviour/setting`): Conduct evaluation rules.

---

#### Flow 11: CBSE Examination (`fact_check`) — 2 Submenus (Fee Verification)
*Note: Marksheets, templates, and observation authoring are omitted for Accountant.*
- **Submenu 01: Exam** (`/accountant/cbse-exam/exam`): View scheduled CBSE exam schedules to verify exam fee clearances.
- **Submenu 02: Exam Schedule** (`/accountant/cbse-exam/schedule`): Inspect exam timetable calendars.

---

#### Flow 12: Certificate (`workspace_premium`) — 2 Submenus (Self Staff Credential)
- **Submenu 01: Staff ID Card** (`/accountant/certificate/staff-id-card`): View accountant institutional badge.
- **Submenu 02: Generate Staff ID Card** (`/accountant/certificate/generate-staff-id-card`): Print faculty/staff identity badge.

---

#### Flow 13: Communicate (`campaign`) — 4 Submenus
- **Submenu 01: Notice Board** (`/accountant/communicate/notice-board`): Read campus notices and fee submission circulars.
- **Submenu 02: Send Email** (`/accountant/communicate/send-email`): Dispatch billing statements and receipts to parent emails.
- **Submenu 03: Send SMS** (`/accountant/communicate/send-sms`): Broadcast urgent SMS fee reminders to parents.
- **Submenu 04: Email / SMS Log** (`/accountant/communicate/email-sms-log`): Inspect dispatch delivery telemetry.

---

#### Flow 14: Gmeet Live Classes (`videocam`) — 3 Submenus (Staff Meeting Desk)
*Note: Accountant has zero teaching live classes; only staff administrative meetings appear.*
- **Submenu 01: Live Meeting** (`/accountant/gmeet/live-meeting`): Join administrative and finance staff Google Meet conferences.
- **Submenu 02: Live Meeting Report** (`/accountant/gmeet/meeting-report`): Review staff meeting duration logs.
- **Submenu 03: Setting** (`/accountant/gmeet/setting`): Google Meet credentials.

---

#### Flow 15: Zoom Live Classes (`video_camera_front`) — 3 Submenus (Staff Meeting Desk)
- **Submenu 01: Live Meeting** (`/accountant/zoom/live-meeting`): Join Zoom staff conferences.
- **Submenu 02: Live Classes Report** (`/accountant/zoom/classes-report`): Audit conference logs.
- **Submenu 03: Live Meeting Report** (`/accountant/zoom/meeting-report`): Meeting duration logs.

---

#### Flow 16: System Setting (`settings`) — 1 Submenu (Receipt Customization)
- **Submenu 01: Print Header Footer** (`/accountant/system-setting/print-header-footer`): Configure school receipt header logo, legal tax registration number, and footer notes for printable fee receipts and vouchers.

---

### 5. Quad-Role Architectural Comparison Matrix

| Architectural Dimension | Super Admin (`SUPER_ADMIN`) | Campus Admin (`ADMIN`) | Teacher (`TEACHER`) | Accountant (`ACCOUNTANT`) |
| :--- | :--- | :--- | :--- | :--- |
| **Visible Modules** | **34 Modules** | **34 Modules** | **19 Modules** | **16 Modules** |
| **Operational Submenus** | **182 Submenus** | **182 Submenus** | **78 Submenus** | **66 Submenus** |
| **RLS Scope** | Universal Bypass | Campus Partition | Assigned Class/Staff | Campus Fiscal Partition |
| **Theme Accent Token** | Royal Purple (`#8E24AA`) | Cerulean Blue (`#0288D1`) | Academic Cobalt (`#2563EB`) | Financial Amber (`#D97706`) |
| **Fees & Cashiering** | Global Gateways | Campus Fee Invoicing | **Zero Access** | **Full Cashier & Discount Desk** |
| **Income & Expenses** | Consolidated P&L | Campus Expense Desk | **Zero Access** | **Primary Voucher & Head Desk** |
| **Payroll Processing** | Master Compensation | Staff Attendance Audit | **Personal Pay Slip Only** | **Generate Payroll & Payslips** |
| **Inventory & Goods** | Master Asset Transfers| Campus Depot Audit | **Zero Access** | **Add Stock & Vendor Audit** |
| **Curriculum & Grading** | Framework Definition | Publish Transcripts | **Mark Entry & CBT Creator** | **Fee Clearance Audit Only** |
| **Curriculum Delivery** | Platform Standards | Timetable Master | **Daily Lesson Delivery** | **Zero Access** |

---

### 6. Detailed UI Wireframe & Data Ledger Specifications (From 14 Verified Accountant Screens)

#### 6.1 Accountant Dashboard (`media_1789167082974.png`)
- **Route**: `/accountant/dashboard`
- **Charts & Telemetry**:
  - *Daily Bar Chart*: Fees Collection (Green) vs. Expenses (Red) across Days 01–30. Day 01 Collection peak at ~$6,200.
  - *Income Semi-Donut*: Donation (35%), Rent (45%), Miscellaneous1 (20%).
  - *Session Area Curve*: 12-Month April–March curve showing August Collection surge ($17,000) and $2,000–$2,500 stable expense corridor.
  - *Expense Semi-Donut*: Stationary Purchase (35%), Telephone Bill (15%), Miscellaneous (25%), Flower (25%).
  - *Fees Overview Progress*: 3 UNPAID (42.86%), PARTIALLY PAID, PAID.

#### 6.2 Quick Links Mega Menu Sitemap (`media_1789167100267.png`)
- **Route**: `Quick Links [grid_view]` Modal
- **Full Taxonomy**: 16 Modules and 66 Submenus verified.

#### 6.3 Collect Fees Desk (`media_1789167113048.png`)
- **Route**: `/accountant/fees/collect-fees`
- **Form Criteria**: `Class *` dropdown, `Section` dropdown, `Search By Keyword` text input, Dual Purple `Search` triggers.
- **Roster Table**: `Class` | `Section` | `Admission No` | `Student Name` | `Father Name` | `Date Of Birth` | `Mobile No.` | `Action`.

#### 6.4 Behaviour Records — Assign Incident (`media_1789167131392.png`)
- **Route**: `/accountant/behaviour/assign-incident`
- **Form Criteria**: `Class` dropdown, `Section` dropdown + Purple `Search`.
- **Incident Table**: `Student Name` | `Admission No` | `Class` | `Gender` | `Phone` | `Total Points` | `Action`.

#### 6.5 Gmeet Live Meeting Desk (`media_1789167141685.png`)
- **Route**: `/accountant/gmeet/live-meeting`
- **Header**: `Live Meeting` + Purple `+ Add` button.
- **Roster Table**: Meeting Title, Description, Date Time, Duration, Created By, Status (`Awaited`, `Finished`), Action (Green `Join [logout]`, Purple `Participants [group]`).

#### 6.6 Zoom Live Meeting Desk (`media_1789167154904.png`)
- **Route**: `/accountant/zoom/live-meeting`
- **Header**: `Live Meeting` + Purple `+ Add` & `+ Add Credential` triggers.
- **Roster Table**: Meeting Title, Description, Date Time, Duration, Api Used (`Self`, `Global`), Status (`Awaited`), Action (Purple Camera button).

#### 6.7 Income — Add Income Desk (`media_1789167163757.png`)
- **Route**: `/accountant/income/add-income`
- **Split 2-Column Layout**:
  - *Left Card*: `Income Head *`, `Name *`, `Invoice Number`, `Date *`, `Amount ($) *`, `Attach Document`, `Description`, Purple `Save`.
  - *Right Card*: Search bar, Page size `50`, Export icons, Table: `Name` | `Description` | `Invoice Number` | `Date` | `Income Head` | `Amount ($)` | `Action` (Edit, Delete).
  - *Live Ledger*: Monthly Bus Rent ($400), NCRT Books Publisher ($400), Rent - July ($2,000), Fees Donation ($1,000), Student Uniform ($350).

#### 6.8 Expenses — Add Expense Desk (`media_1789167172256.png`)
- **Route**: `/accountant/expenses/add-expense`
- **Split 2-Column Layout**:
  - *Left Card*: `Expense Head *`, `Name *`, `Invoice Number`, `Date *` (default `09/12/2026`), `Amount ($) *`, `Attach Document`, `Description`, Purple `Save`.
  - *Right Card*: Search bar, Page size `50`, Export icons, Table: `Name` | `Description` | `Invoice Number` | `Date` | `Expense Head` | `Amount ($)` | `Action` (Edit, Delete).
  - *Live Ledger*: Online Course Classes ($350 & $200), Airtel Broad Band ($300), Miscellaneous Electricity ($500), CBSE BOOKS ($400), Flower/Decor ($1,000).

#### 6.9 CBSE Examination — Exam List (`media_1789167184079.png`)
- **Route**: `/accountant/cbse-exam/exam`
- **Header**: `Exam List` + Purple `+ Add` button.
- **Table**: `Exam Name` | `Class (Sections)` | `Term` | `Subjects Included` | `Exam Published` | `Published Result` | `Category Name` | `Description` | `Created At` | `Action` (7-button action strip).

#### 6.10 Human Resource — Staff Directory & Onboarding (`media_1789167195638.png`)
- **Route**: `/accountant/human-resource/staff-directory`
- **Header**: `Select Criteria` + Purple `+ Add Staff` button (Accountant onboarding privilege).
- **Roster**: Card View (4 columns) & List View featuring `James Deckar (9004)` (Self, Accountant), `Shivam Verma (9002)`, `Brandon Heart (9005)`, `William Abbot (9003)`, `Jason Shariton (90006)`, `Maria Ford (9005)`, `Nishant Khare (1002)`, `Aman Verma (654)`.

#### 6.11 Communicate — Notice Board Desk (`media_1789167206054.png`)
- **Route**: `/accountant/communicate/notice-board`
- **Header**: `Notice Board` + `+ Post New Message` & `Delete Notice Board`.
- **Feed**: Announcements stream with self-authoring edit/delete triggers (`Staff Meeting`, `Fees Reminder`, `Notice for new Book collection`, `School Vacation Notice`).

#### 6.12 Inventory — Issue Item Desk (`media_1789167215496.png`)
- **Route**: `/accountant/inventory/issue-item`
- **Header**: `Issue Item List` + Purple `+ Issue Item` button.
- **Table**: `Item` | `Note` | `Item Category` | `Issue - Return` | `Issue To` | `Issued By` | `Quantity` | `Status` (Red `Click To Return`, Green `Returned`) | `Action` (Purple `x`).
- *Live Disbursements*: Class Board, Uniform, Table chair, Cricket Bat, Projectors, Notebooks assigned to faculty (`James Deckar (9004)`, `Shivam Verma (9002)`, `Jason Shariton (90006)`, `William Abbot (9003)`).

#### 6.13 Transport — Routes Setup (`media_1789167225099.png`)
- **Route**: `/accountant/transport/routes`
- **Split 2-Column Layout**:
  - *Left Card*: `Route Title *`, Purple `Save`.
  - *Right Card*: `Route Title` | `Action` (11 active transit routes: Brooklyn Central, East, West, South, North, Railway Station, High Court, Vijay Nagar, Civil Line, Dindayal Chowk, Ranitaal).

#### 6.14 Hostel — Hostel Rooms Setup (`media_1789167236715.png`)
- **Route**: `/accountant/hostel/hostel-rooms`
- **Split 2-Column Layout**:
  - *Left Card*: `Room Number / Name *`, `Hostel *`, `Room Type *`, `Number Of Bed *`, `Cost Per Bed *`, `Description`, Purple `Save`.
  - *Right Card*: `Room Number / Name` | `Hostel` | `Room Type` | `Number Of Bed` | `Cost Per Bed` | `Action` (8 active room tariffs: B1 $300, B2 $1,000, B3 $500, B4 $1,200, G1 $340, G2 $300, G3 $500, G4 $300).

#### 6.15 Certificate — Staff ID Card Designer (`media_1789167256898.png`)
- **Route**: `/accountant/certificate/staff-id-card`
- **Split 2-Column Layout**:
  - *Left Card (`Add Staff ID Card`)*: Asset dropzones (`Background Image`, `Logo`, `Signature`) + Input fields (`School Name *`, `Address / Phone / Email *`, `ID Card Title *`, `Header Color`) + Toggle switches (`Staff Name`, `Staff ID`, `Designation`, `Department`, `Father Name`, `Mother Name`, `Date Of Joining`) + Purple `Save` button.
  - *Right Card (`Staff ID Card List`)*: Search, 50 rows, Export icons. Table: `ID Card Title` | `Background Image` | `Design Type` (`Horizontal`, `Vertical`) | `Action` (View details, Edit pencil, Delete `x`). Sample entries: *Sample Staff ID Card* (Horizontal), *Sample Staff ID Card Vertical* (Vertical).

#### 6.16 Reports — Finance BI Reporting Suite (`media_1789167266843.png`)
- **Route**: `/accountant/reports/finance`
- **Header**: `Finance`
- **3-Column x 3-Row Matrix (9 Financial BI Reports)**:
  - *Column 1*: `Fees Statement`, `Online Fees Collection Report`, `Payroll Report`.
  - *Column 2*: `Balance Fees Report`, `Income Report`, `Income Group Report`.
  - *Column 3*: `Fees Collection Report`, `Expense Report`, `Expense Group Report`.

#### 6.17 System Setting — Print Header Footer Designer (`media_1789167278568.png`)
- **Route**: `/accountant/system-setting/print-header-footer` (`/admin/print_headerfooter#`)
- **Document Selection Tabs**: `Fees Receipt` (Active) | `Payslip` | `Online Admission Receipt` | `Online Exam` | `Email` | `General Purpose`.
- **Canvas Components**:
  - *Header Banner Preview* (`2230px X 300px`): School brand identity (`Smart School`), "Your School Name Here", Contact details (Address: 25 Kings Street, CA | Phone: 89562423934 | Email: yourschool@gmail.com | Web: www.yoursite.in) with distinct black ribbon title: `Fees Receipt`.
  - *Footer Content WYSIWYG Editor*: Full rich-text toolbar (Normal text, Bold, Italic, Underline, Small, Quote, Lists, Align, Image). Pre-configured standard legal notice: *"This receipt is computer generated hence no signature is required."* + Purple `Save` button.


