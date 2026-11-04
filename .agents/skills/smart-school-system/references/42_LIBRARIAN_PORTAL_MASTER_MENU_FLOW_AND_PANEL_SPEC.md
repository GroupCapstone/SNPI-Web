# Librarian Portal Master Menu Flow & Panel Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Role Authority

This specification establishes the authoritative single-source-of-truth master menu taxonomy, interaction flow, and operational boundaries for the **Librarian Portal** (`LIBRARIAN`) in the **Smart School Enterprise Platform**.

The **Librarian** serves as the chief curator of institutional intellectual capital, media assets, and circulating literature:
- **Security & RLS Scope**: Scoped to the campus library repository (`app.current_branch_id = ?`) with read/write access to library collections (`books`, `book_issues`, `book_returns`, `library_members`, `behaviour_incidents`). Strictly barred from altering tuition fees, modifying academic gradebooks, editing student profiles, disbursing payroll, or reconfiguring campus infrastructure.
- **Primary Role Token**: `LIBRARIAN`
- **Logged-In Persona**: `Brandon Heart (Staff ID: 9005, 2nd Floor, Library)`
- **Brand Theme Accent**: Library Violet / Royal Indigo (`#6366F1` / `#4338CA`)
- **Total Master Navigation Accordions Visible**: **10 Modules** (out of 34 platform modules)
- **Total Operational Submenus**: **27 Submenus**
- **Live Dashboard Widgets & Metrics**:
  - **Staff Present Today**: `0/9`
  - **Student Present Today**: `37/89` (Total Students: `89`)
  - **Library Overview Widget**:
    - `10 DUE FOR RETURN` (Green indicator)
    - `3 RETURNED` (Green indicator)
    - `ISSUED OUT OF`: `0%`
    - `0 AVAILABLE OUT OF`: `0%`
  - **Student Today Attendance Widget**:
    - `21 PRESENT` (23.60%)
    - `5 LATE` (5.62%)
    - `6 ABSENT` (6.74%)
    - `11 HALF DAY` (12.36%)
- **Completely Omitted Modules (24 Restricted Modules)**: Front Office, Student Information, Fees Collection, Quick Fees, Income, Expenses, Examinations, Online Examinations, Academics, Attendance, Lesson Plan, Inventory, Transport, Hostel, Front CMS, Alumni, Multi Branch, Annual Calendar, Student CV, Thermal Print, Whatsapp Messaging, Certificate, Core System Settings, etc.

---

### 1. Librarian Permitted vs. Restricted Modules Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              LIBRARIAN PORTAL TAXONOMY AT A GLANCE                              │
├────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ 10 PERMITTED OPERATIONAL MODULES (25 SUBMENUS) │ 24 STRICTLY RESTRICTED MODULES (OMITTED)       │
├────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ 01. Library (4 submenus - Core Hub Desk)       │ 01. Front Office (Inquiries, Visitors, Calls)  │
│ 02. Reports (1 submenu - Library BI Analytics) │ 02. Student Information (Full Profile & Intake)│
│ 03. Behaviour Records (4 submenus - Incidents) │ 03. Fees Collection (Fee Ledgers & Cashier)    │
│ 04. Online Course (2 submenus - Category/Report│ 04. Quick Fees (Counter POS Barcode Desk)      │
│ 05. Gmeet Live Classes (3 submenus - Meetings) │ 05. Income (Institutional Revenue Ledgers)     │
│ 06. Zoom Live Classes (4 submenus - Meetings)  │ 06. Expenses (Institutional Expenditure Logs)  │
│ 07. CBSE Examination (1 submenu - Exam Sched)  │ 07. Examinations (Exam Groups & Marks Entry)   │
│ 08. Human Resource (1 submenu - Staff Directory│ 08. Online Examinations (CBT Assessment Desk)  │
│ 09. Communicate (4 submenus - Notice/Email/SMS)│ 09. Academics (Curriculum, Timetable & Class)  │
│ 10. System Setting (1 submenu - Profile/Pref)  │ 10. Attendance (Daily Rolls & Bio Logs)        │
│                                                │ 11. Lesson Plan (Syllabi & Topic Delivery)     │
│                                                │ 12. Inventory (Stock Items & Procurement)      │
│                                                │ 13. Transport (Routes, Vehicles, Bus Tracking) │
│                                                │ 14. Hostel (Buildings & Room Rent Tracking)    │
│                                                │ 15. Front CMS (Public Website CMS & Pages)     │
│                                                │ 16. Alumni (Events & Reunion Management)       │
│                                                │ 17. Multi Branch (Tenant Switcher & Overview)  │
│                                                │ 18. Annual Calendar (Master Event Calendar)    │
│                                                │ 19. Student CV (Career Profile Builder)        │
│                                                │ 20. Thermal Print (POS Hardware Configuration) │
│                                                │ 21. Whatsapp Messaging (Gateway API Config)    │
│                                                │ 22. Certificate (Student/Staff Badges)         │
│                                                │ 23. Core System Setting (General/Backup/Roles) │
│                                                │ 24. Admin Approval & Financial Audits          │
└────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

---

### 2. Librarian Left Navigation Rail & Sequence (10 Accordions)

The librarian sidebar displays `Current Session: 2026-27`, `Quick Links [grid_view]`, followed by 10 vertical accordions:

1. **Online Course** (`video_library`)
2. **Behaviour Records** (`psychology`)
3. **Gmeet Live Classes** (`videocam`)
4. **Zoom Live Classes** (`video_camera_front`)
5. **CBSE Examination** (`fact_check`)
6. **Human Resource** (`badge`) - Staff Directory Only
7. **Communicate** (`campaign`) - Notice Board & Broadcasts
8. **Library** (`local_library` / `menu_book`) - Core Operational Hub
9. **Reports** (`analytics`) - Library Circulation BI Reports
10. **System Setting** (`settings`) - Profile & Basic Preferences

---

### 3. Exhaustive Step-by-Step Flow List for Librarian Modules

#### Module 01: Library (Core Operations Hub - 4 Submenus)

##### 1.1 Book List & Accession Register (`admin/book`)
- **Purpose**: Master bibliographic repository, cataloging acquisitions, ISBN tracking, shelf rack assignment, and stock level monitoring.
- **Action Header**:
  - `+ Add Book` button: Opens modal to add new accessions:
    - Fields: `Book Title *`, `Book Number *`, `ISBN Number`, `Publisher`, `Author`, `Subject`, `Rack Number`, `Qty *`, `Book Price`, `Post Date`, `Description`.
  - Search input with live filter.
  - Data export tools: `Copy`, `CSV`, `Excel`, `PDF`, `Print`.
- **Data Table Columns (13 Attributes)**:
  - `Book Title` | `Description` | `Book Number` | `ISBN Number` | `Publisher` | `Author` | `Subject` | `Rack Number` | `Qty` | `Available` | `Book Price` | `Post Date` | `Action`.
- **Action Triggers per Row**:
  - `Edit` (Purple pencil icon): Update book title, rack, quantity, price.
  - `Delete` (Purple trash icon): Remove book record.
- **Live Institutional Catalog Accessions Indexed**:
  - *Maths Activity Book Class 1*: Book #`765`, ISBN `87786`, Publisher: Yogesh, Author: Hunny, Subject: Maths, Rack: `23`, Qty: `0`, Available: `0`, Price: `$299.00`, Post Date: `04/08/2026`.
  - *English Grammar for Beginners*: Book #`4376`, ISBN `563`, Publisher: s. r. k, Author: jhon, Rack: `2`, Qty: `100`, Available: `100`, Price: `$100.00`, Post Date: `04/03/2026`.
  - *Respiration In Organisms*: Book #`123`, ISBN `BRT0-890907`, Publisher: S.K Publisher, Author: John Wilson, Qty: `50`, Available: `50`, Price: `$100.00`, Post Date: `04/01/2026`.
  - *Maths Activity Book Class 1*: Book #`65563`, ISBN `B002`, Publisher: NCERT, Author: S. Verma, Subject: Mathematics, Rack: `234`, Qty: `50`, Available: `49`, Price: `$100.00`, Post Date: `03/14/2026`.
  - *English Grammar for Beginners*: Book #`B001`, ISBN `978-93`, Publisher: Oxford Publications, Author: R.K. Sharma, Subject: English, Rack: `565`, Qty: `40`, Available: `40`, Price: `$100.00`, Post Date: `03/20/2026`.
  - *The Valley of Flowers*: Book #`575`, ISBN `FSDS9087`, Publisher: D.S Publisher, Author: Laura, Rack: `786`, Qty: `35`, Available: `35`, Price: `$50.00`, Post Date: `03/25/2026`.
  - *Electricity & Circuits*: Book #`544`, ISBN `FG-08908`, Publisher: S.K. Publisher, Qty: `50`, Available: `50`, Price: `$50.00`, Post Date: `03/03/2026`.
  - *Mathematics*: Book #`9864`, ISBN `BXC-9-90789`, Publisher: D.K. Publisher, Subject: Mathematics, Rack: `6534`, Qty: `80`, Available: `77`, Price: `$300.00`, Post Date: `02/21/2026`.
  - *Environmental Studies (EVS)*: Book #`65545`, ISBN `FSD87865`, Publisher: D.S Publisher, Subject: Environmental, Rack: `756`, Qty: `90`, Available: `88`, Price: `$300.00`, Post Date: `02/11/2026`.
  - *English Reader*: Book #`4344`, ISBN `FG-08908`, Publisher: S.K Publisher, Subject: English, Rack: `4545`, Qty: `50`, Available: `48`, Price: `$250.00`, Post Date: `02/02/2026`.
  - *Social & Political Life*: Book #`67897`, ISBN `VBGD0-9-90-76`, Publisher: Sk. Publisher, Author: Harish Vardhan, Subject: Social Science, Rack: `57574`, Qty: `100`, Available: `91`, Price: `$120.00`, Post Date: `01/20/2026`.
  - *Wonderful Adventures of Nils*: Book #`789567`, ISBN `DER900806`, Publisher: S.K. Publisher, Author: Martin Wilson, Subject: English, Rack: `567574`, Qty: `90`, Available: `79`, Price: `$100.00`, Post Date: `01/15/2026`.
  - *Basic Geometrical Ideas*: Book #`34222`, ISBN `FWSE56564`, Publisher: S.K. Publisher, Author: David Wilson, Subject: Mathematics, Rack: `34522`, Qty: `100`, Available: `90`, Price: `$80.00`, Post Date: `01/02/2026`.

##### 1.2 Issue - Return Counter (`admin/member/issue`)
- **Purpose**: Circulation desk workflow for barcode/member lookup, volume loan dispatch, return check-in, overdue calculation, and lost book replacement processing.
- **Circulation Search Desk**:
  - Search by `Member ID`, `Admission Number`, `Staff ID`, or barcode scan.
  - Member Card Banner: Displays borrower name, role (Student/Staff), active loans count, max loan quota, and outstanding fines.
- **Active Loans Table**:
  - `Book Title` | `Book Number` | `Issue Date` | `Due Date` | `Return Date` | `Fine ($)` | `Status` | `Action` (Return button, Renew button).
- **Issue Modal (`Issue Book`)**:
  - `Select Book` (Dropdown with real-time copy availability counter).
  - `Return Date *` (Date picker, default: loan policy duration e.g. 14 days).
  - `Issue Book` button.

##### 1.3 Add Student Member (`admin/member/student`)
- **Purpose**: Enroll students into library lending system, issue library cards, and configure borrowing quotas.
- **Filter Criteria (`Select Criteria`)**:
  - `Class` dropdown, `Section` dropdown, `Search` button.
- **Student Membership Table**:
  - `Member ID` | `Library Card No.` | `Admission No` | `Student Name` | `Class` | `Father Name` | `Date of Birth` | `Gender` | `Mobile Number` | `Action` (Add Member button / Surrender Card button).

##### 1.4 Add Staff Member (`admin/member/staff`)
- **Purpose**: Authorize faculty and administrative personnel for library borrowing privileges.
- **Staff Membership Table**:
  - `Member ID` | `Library Card No.` | `Staff ID` | `Staff Name` | `Email` | `Date of Birth` | `Role` | `Designation` | `Department` | `Mobile Number` | `Action` (Add Member / Surrender Card).

---

#### Module 02: Reports (Library BI Analytics - 1 Submenu)

##### 2.1 Library Reports Catalog (`admin/reports/library`)
- **Layout Architecture**: 4-Card BI Analytics Suite:
  1. **Book Issue Report** (`admin/reports/bookissuereport`):
     - Comprehensive log of all volumes currently on loan or historically issued.
     - Criteria: `Search Type` (Today, This Week, This Month, Date Range).
     - Columns: `Book Title` | `Book No` | `Issue Date` | `Due Return Date` | `Member ID` | `Library Card No` | `Admission/Staff No` | `Issue To` | `Member Type`.
  2. **Book Due Report** (`admin/reports/bookduereport`):
     - Defaulters ledger tracking overdue volumes past their return deadline.
     - Columns: `Book Title` | `Book No` | `Issue Date` | `Due Return Date` | `Member ID` | `Borrower Name` | `Member Type` | `Contact Phone` | `Overdue Days` | `Fine Amount ($)`.
  3. **Book Inventory Report** (`admin/reports/bookinventory`):
     - Master physical stock audit detailing total accessions, shelf copies, damaged volumes, and lost units.
     - Columns: `Book Title` | `Book No` | `ISBN` | `Publisher` | `Author` | `Rack No` | `Total Qty` | `Issued Qty` | `Available Qty` | `Book Price ($)`.
  4. **Book Issue Return Report** (`admin/reports/bookissuereturnreport`):
     - Complete dual transaction circulation ledger documenting checkout timestamps, check-in timestamps, issuing clerk, condition at return, and overdue fees reconciled.

---

#### Module 03: Behaviour Records (4 Submenus)

##### 3.1 Assign Incident (`admin/behaviour/assignincident`)
- **Purpose**: Record behavioral observations occurring inside library reading rooms, study halls, and computer labs (e.g. noise violations, improper book handling, exemplary research dedication).
- **Filter Criteria (`Select Criteria`)**: `Class` dropdown, `Section` dropdown, Purple `Search` button.
- **Assign Incident List Table**: `Student Name` | `Admission No` | `Class` | `Gender` | `Phone` | `Incident` | `Point` | `Action`.

##### 3.2 Incidents Catalog (`admin/behaviour/incidents`)
- **Purpose**: Master catalog of recognized campus behavioral incidents and associated points (+ positive vs - negative).

##### 3.3 Behaviour Reports (`admin/behaviour/report`)
- **Purpose**: Statistical reports on student behavioral points across terms.

##### 3.4 Behaviour Setting (`admin/behaviour/setting`)
- **Purpose**: Threshold configurations for disciplinary notifications.

---

#### Module 04: Online Course (2 Submenus)

##### 4.1 Course Category (`admin/course/category`)
- **Purpose**: Taxonomy of digital resources and reference course categories.
- **2-Column Split**: `Add Category` form + `Category List` table (Personal Development, Health & Fitness, Network & Security, Lifestyle, UPGRADE SKILL, Business Marketing).

##### 4.2 Online Course Report (`admin/course/report`)
- **Purpose**: Overview of online educational course adoptions and digital readership.

---

#### Module 05 & 06: Live Classes (Gmeet & Zoom - 7 Submenus)

##### 5.1 Gmeet Live Classes (`admin/gmeet/classes` & `admin/gmeet/meeting`)
- `Live Classes`: Schedule and join links for faculty-led virtual classes.
- `Live Meeting`: Staff meetings and library committee conferences.
- `Setting`: Google Meet credentials.

##### 6.1 Zoom Live Classes (`admin/zoom/meeting`)
- `Live Meeting`: Zoom conferences schedule, host credentials, and launch triggers.
- `Live Classes`: Virtual lecture sessions.
- `Live Classes Report`: Attendance logs.
- `Setting`: Zoom integration tokens.

---

#### Module 07: CBSE Examination (1 Submenu)

##### 7.1 CBSE Examination Suite (`admin/cbseexam/exam`)
- **Submenus**: `Exam`, `Template`, `Setting`.
- **Purpose**: View upcoming examination timetables and assessment templates so the library can establish extended study hall hours, curate reserve textbook collections, and prepare reading facilities.
- **Data Table**: `Exam Title` | `Class` | `Section` | `Start Date` | `End Date` | `Published` | `Action`.

---

#### Module 08: Human Resource (1 Submenu)

##### 8.1 Staff Directory (`admin/staff`)
- **Purpose**: Campus faculty and staff directory to verify employee identities when issuing staff library cards.
- **Criteria**: `Role` dropdown, `Search By Keyword` input, `Card View` vs `List View`.
- **Live Faculty Roster**: Shivam Verma (9002), Brandon Heart (9005 - Librarian), William Abbot (9003), Jason Shariton (90006), James Deckar (9004), Maria Ford (9005).

---

#### Module 09: Communicate (Broadcast Hub - 4 Submenus)

##### 9.1 Notice Board (`admin/notification`)
- **Purpose**: Monitor school announcements and broadcast library alerts (e.g. library inventory closures, overdue book recall drives, new book arrivals).
- **Feed**: Staff Meeting, Fee Submission Reminder, March Monthly Examination, School Holiday Notice, Parent Teacher Meeting.

##### 9.2 Send Email (`admin/mailsms/compose`)
- **Purpose**: Dispatch overdue notices, book arrival advisories, and library circulars to students, faculty, or guardians.

##### 9.3 Send SMS (`admin/mailsms/sms`)
- **Purpose**: Automated SMS reminders for due dates.

##### 9.4 Email / SMS Log (`admin/mailsms/log`)
- **Purpose**: Delivery status log of sent library notifications.

---

#### Module 10: System Setting (1 Submenu)

##### 10.1 General Setting / Profile (`admin/users/profile`)
- **Purpose**: Librarian user account profile, password updates, language preferences.

---

### 4. 6-Role Architectural Comparison Matrix

```
┌───────────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Architectural Dimension   │ Super Admin │ Admin       │ Teacher     │ Accountant  │ Receptionist│ Librarian   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Persona Sample            │ Joe Black   │ Joe Black   │ Jason       │ James       │ Maria       │ Brandon     │
│                           │ (Root ID: 1)│ (Campus ID) │ (Staff:9000)│ (Staff:9004)│ (Staff:9005)│ (Staff:9005)│
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Total Visible Modules     │ 34 Modules  │ 34 Modules  │ 19 Modules  │ 16 Modules  │ 11 Modules  │ 10 Modules  │
│ Total Operational Submenus│ 182 Submenus│ 182 Submenus│ 78 Submenus │ 66 Submenus │ 30 Submenus │ 25 Submenus │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Primary Domain Focus      │ Global Root │ Campus Lead │ Classroom   │ Cashier &   │ Front Desk  │ Books, Media│
│                           │ Governance  │ Governance  │ Instruction │ Procurement │ & Inquiries │ & Lending   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Brand Accent Color        │ Deep Indigo │ Deep Slate  │ Emerald     │ Amber Gold  │ Teal / Cyan │ Violet/Blue │
│                           │ (#4338CA)   │ (#1E293B)   │ (#059669)   │ (#D97706)   │ (#0D9488)   │ (#6366F1)   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Library Catalog & Lending │ Full Admin  │ Full Admin  │ Book Search │ Restricted  │ Restricted  │ Primary Hub │
│ (Books, Issues, Returns)  │ (All)       │ (All)       │ (Read Only) │ (None)      │ (None)      │ (4 Submenus)│
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Front Office Operations   │ Full Admin  │ Full Admin  │ Restricted  │ Restricted  │ Primary Hub │ Restricted  │
│ (Enquiry, Visitor, Call)  │ (All)       │ (All)       │ (None)      │ (None)      │ (7 Submenus)│ (None)      │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Fees & Financial Ledgers  │ Full Read/  │ Full Read/  │ Restricted  │ Primary Hub │ Restricted  │ Restricted  │
│ (Collections, Balances)   │ Write       │ Write       │ (None)      │ (9 Submenus)│ (None)      │ (None)      │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Student Academic Dossier  │ Full Manage │ Full Manage │ Gradebook & │ Balance Due │ Directory   │ Library Card│
│ & Records Control         │ & Promotion │ & Promotion │ Attendance  │ Inquiry     │ Lookup Only │ Membership  │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Payroll & Human Resources │ Full Master │ Full Master │ Personal    │ Full Payroll│ Staff Phone │ Staff Phone │
│ Access                    │ (HR + Pay)  │ (HR + Pay)  │ Payslip Only│ Processing  │ Directory   │ Directory   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ System Infrastructure     │ Root Config,│ Campus Lead │ Restricted  │ Print Header│ Personal    │ Personal    │
│ & Database Backups        │ Backups, Pay│ Settings    │ (None)      │ Footer Only │ Profile Only│ Profile Only│
└───────────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

### 5. Architectural Verification & Compliance Checklist

- [x] **Zero Emoji Compliance**: 100% devoid of unicode emoji characters.
- [x] **Flow List Structure**: All navigation paths and operational screens are modeled as sequential flow lists.
- [x] **Concrete Evidence Ingress**: Built directly on raw OCR data extracted from 12 Librarian screenshots (`media_1789167723520.png` through `media_1789167832510.png`).
- [x] **Cross-Portal Synchrony**: Seamlessly matches Super Admin, Admin, Teacher, Accountant, and Receptionist portal specifications.
