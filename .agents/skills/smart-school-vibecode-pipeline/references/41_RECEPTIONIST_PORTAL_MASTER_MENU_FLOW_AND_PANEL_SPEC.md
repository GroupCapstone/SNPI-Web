# Receptionist Portal Master Menu Flow & Panel Specification
## Smart School Enterprise Platform (Autonomous Vibecoding Pipeline Reference)

---

### Executive Overview & Role Authority

This specification establishes the authoritative single-source-of-truth master menu taxonomy, interaction flow, and operational boundaries for the **Receptionist Portal** (`RECEPTIONIST`) in the **Smart School Enterprise Platform**.

The **Receptionist** serves as the primary gateway, front desk ambassador, and public communication hub of the institution:
- **Security & RLS Scope**: Scoped to the campus front desk (`app.current_branch_id = ?`) with read/write access to front office records (`enquiries`, `visitors_book`, `phone_call_logs`, `postal_records`, `complaints`, `broadcast_dispatches`). Strictly barred from modifying tuition fee structures, disbursing payroll, editing student grades, manipulating system databases, or changing school legal configurations.
- **Primary Role Token**: `RECEPTIONIST`
- **Logged-In Persona**: `Maria Ford (Staff ID: 9005, Ground Floor, Front Desk)`
- **Brand Theme Accent**: Front Office Teal / Cyan (`#0D9488` / `#06B6D4`)
- **Total Master Navigation Accordions Visible**: **11 Modules** (out of 34 platform modules)
- **Total Operational Submenus**: **30 Submenus**
- **Completely Omitted Modules (23 Restricted Modules)**: Fees Collection, Quick Fees, Income, Expenses, Examinations, Online Examinations, Attendance, Lesson Plan, Library, Inventory, Transport, Hostel, Front CMS, Alumni, Reports, Multi Branch, Annual Calendar, Student CV, Thermal Print, Whatsapp Messaging, Behaviour Records, Core System Settings, etc.

---

### 1. Receptionist Permitted vs. Restricted Modules Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             RECEPTIONIST PORTAL TAXONOMY AT A GLANCE                            │
├────────────────────────────────────────────────┬────────────────────────────────────────────────┤
│ 11 PERMITTED OPERATIONAL MODULES (30 SUBMENUS) │ 23 STRICTLY RESTRICTED MODULES (OMITTED)       │
├────────────────────────────────────────────────┼────────────────────────────────────────────────┤
│ 01. Front Office (7 submenus - Core Hub)       │ 01. Fees Collection (Fee Allocation & Cashier) │
│ 02. Student Information (1 submenu - Lookup)   │ 02. Quick Fees (Counter POS Barcode Desk)      │
│ 03. Online Course (2 submenus - Category/Report│ 03. Income (Institutional Revenue Ledgers)     │
│ 04. Gmeet Live Classes (3 submenus - Meetings) │ 04. Expenses (Institutional Expenditure Logs)  │
│ 05. Zoom Live Classes (4 submenus - Meetings)  │ 05. Examinations (Exam Groups & Marks Entry)   │
│ 06. CBSE Examination (1 submenu - Exam Schedule│ 06. Online Examinations (Question Bank & Tests)│
│ 07. Academics (6 submenus - Timetable & Class) │ 07. Attendance (Student/Staff Daily Rolls)     │
│ 08. Human Resource (1 submenu - Staff Directory│ 08. Lesson Plan (Syllabus & Lesson Delivery)   │
│ 09. Communicate (4 submenus - Notice/Email/SMS)│ 09. Library (Book Catalog & Lending Registry)  │
│ 10. Certificate (2 submenus - Staff ID Only)   │ 10. Inventory (Stock Items & Store Management) │
│ 11. System Setting (1 submenu - Profile/Pref)  │ 11. Transport (Routes, Vehicles, Bus Tracking) │
│                                                │ 12. Hostel (Hostel Buildings & Room Allocation)│
│                                                │ 13. Front CMS (Public Website CMS & Pages)     │
│                                                │ 14. Alumni (Events & Reunion Management)       │
│                                                │ 15. Reports (Academic, Financial, BI Audits)   │
│                                                │ 16. Multi Branch (Tenant Switcher & Overview)  │
│                                                │ 17. Annual Calendar (Master Event Calendar)    │
│                                                │ 18. Student CV (Career Profile Builder)        │
│                                                │ 19. Thermal Print (POS Hardware Configuration) │
│                                                │ 20. Whatsapp Messaging (Gateway API Config)    │
│                                                │ 21. Behaviour Records (Incidents & Demerits)   │
│                                                │ 22. System Setting Core (General/Backup/Roles) │
│                                                │ 23. Admin Approval & Payroll Approvals         │
└────────────────────────────────────────────────┴────────────────────────────────────────────────┘
```

---

### 2. Receptionist Left Navigation Rail & Sequence (11 Accordions)

The receptionist sidebar displays `Current Session: 2026-27`, `Quick Links [grid_view]`, followed by 11 vertical accordions:

1. **Front Office** (`storefront` / `meeting_room`) - Primary Desk
2. **Student Information** (`school`) - Read-Only Student Dossier Lookup
3. **Online Course** (`video_library`)
4. **Gmeet Live Classes** (`videocam`)
5. **Zoom Live Classes** (`video_camera_front`)
6. **CBSE Examination** (`fact_check`)
7. **Academics** (`menu_book`)
8. **Human Resource** (`badge`) - Staff Directory Only
9. **Communicate** (`campaign`) - Broadcast Desk
10. **Certificate** (`workspace_premium`) - Staff ID Badges
11. **System Setting** (`settings`) - Profile & Basic Preferences

---

### 3. Exhaustive Step-by-Step Flow List for Receptionist Modules

#### Module 01: Front Office (Core Front Desk Hub - 7 Submenus)

##### 1.1 Admission Enquiry (`admin/enquiry`)
- **Purpose**: Prospect intake, lead qualification, tracking admissions pipeline, recording follow-ups, and conversion metrics.
- **Top Metrics Strip**:
  - `Converted Leads: 1/8`
  - `Enquiry Overview: 6 ACTIVE (75%) | 1 WON (12.5%) | 1 PASSIVE (12.5%) | 0 LOST | 0 DEAD`
- **Filter / Search Form (`Select Criteria`)**:
  - `Class` (Dropdown: All Classes, Class 1, Class 2, etc.)
  - `Source` (Dropdown: All Sources, Online Front Site, Front Office, Advertisement, Campaign, Reference)
  - `Enquiry From Date` (Date picker: DD/MM/YYYY)
  - `Enquiry To Date` (Date picker: DD/MM/YYYY)
  - `Status` (Dropdown: All, Active, Won, Passive, Lost, Dead)
  - Purple/Teal `Search` Button.
- **Action Header**:
  - `+ Add` Button: Triggers modal `Add Admission Enquiry`:
    - Fields: `Name *`, `Phone *`, `Email`, `Address`, `Description`, `Note`, `Date *`, `Next Follow Up Date *`, `Assigned Staff`, `Reference`, `Source *`, `Class *`, `Number of Child`.
  - Data Export Tools: `Copy`, `CSV`, `Excel`, `PDF`, `Print`.
- **Data Table Columns**:
  - `Name` | `Phone` | `Source` | `Enquiry Date` | `Last Follow Up Date` | `Next Follow Up Date` | `Status` | `Action`
- **Action Triggers per Row**:
  - `View / Follow Up` (Phone icon): Opens Follow-Up history modal to log notes, call status, and set next follow-up date.
  - `Edit` (Pencil icon): Edit lead dossier.
  - `Delete` (`x` icon): Delete inquiry (soft delete).

##### 1.2 Visitor Book (`admin/visitors`)
- **Purpose**: Log all campus visitors, verify identity, issue visitor passes, track in/out timestamps.
- **Split 2-Column Layout**:
  - **Left Column (`Add Visitor`)**:
    - `Purpose *` (Dropdown from Setup Front Office)
    - `Name *` (Text input)
    - `Phone` (Telephone input)
    - `ID Card Number` (Text input: National ID, Passport, Driver's License)
    - `Number Of Person` (Number input, default: 1)
    - `Date *` (Date picker)
    - `In Time *` (Time picker: HH:MM AM/PM)
    - `Out Time` (Time picker: HH:MM AM/PM)
    - `Note` (Textarea)
    - `Attach Document` (File upload dropzone)
    - Teal/Purple `Save` Button.
  - **Right Column (`Visitor List`)**:
    - Filter search bar, export tools.
    - Columns: `Purpose` | `Name` | `Phone` | `Date` | `In Time` | `Out Time` | `Action` (View, Print Pass, Edit, Delete).

##### 1.3 Phone Call Log (`admin/generalcall`)
- **Purpose**: Record incoming and outgoing phone calls, parent inquiries, follow-up deadlines, and call notes.
- **Split 2-Column Layout**:
  - **Left Column (`Add Phone Call Log`)**:
    - `Name *` (Text input)
    - `Phone *` (Telephone input)
    - `Date` (Date picker)
    - `Next Follow Up Date` (Date picker)
    - `Call Duration` (Text input, e.g. 5 mins)
    - `Note` (Textarea)
    - `Call Type` (Radio buttons: `Incoming` vs `Outgoing`)
    - Teal/Purple `Save` Button.
  - **Right Column (`Phone Call Log List`)**:
    - Columns: `Name` | `Phone` | `Date` | `Next Follow Up Date` | `Call Type` | `Action` (Edit, Delete).

##### 1.4 Postal Dispatch (`admin/dispatch`)
- **Purpose**: Record all outgoing institutional mail, official letters, transcript shipments, and courier packages.
- **Split 2-Column Layout**:
  - **Left Column (`Add Dispatch`)**:
    - `To Title *` (Text input)
    - `Reference No` (Text input)
    - `Address` (Textarea)
    - `Note` (Textarea)
    - `From Title` (Text input: Mount Carmel School / Dept)
    - `Date` (Date picker)
    - `Attach Document` (File upload)
    - Teal/Purple `Save` Button.
  - **Right Column (`Postal Dispatch List`)**:
    - Columns: `To Title` | `Reference No` | `From Title` | `Date` | `Action` (Download attachment, Edit, Delete).

##### 1.5 Postal Receive (`admin/receive`)
- **Purpose**: Record all incoming mail, legal notices, supplier packages, and official communications.
- **Split 2-Column Layout**:
  - **Left Column (`Add Receive`)**:
    - `From Title *` (Text input)
    - `Reference No` (Text input)
    - `Address` (Textarea)
    - `Note` (Textarea)
    - `To Title` (Text input: Recipient staff/department)
    - `Date` (Date picker)
    - `Attach Document` (File upload)
    - Teal/Purple `Save` Button.
  - **Right Column (`Postal Receive List`)**:
    - Columns: `From Title` | `Reference No` | `To Title` | `Date` | `Action` (Download attachment, Edit, Delete).

##### 1.6 Complain (`admin/complaint`)
- **Purpose**: Intake and log parent, student, and visitor grievances; assign to administrative personnel; track resolution lifecycle.
- **Split 2-Column Layout**:
  - **Left Column (`Add Complain`)**:
    - `Complaint Type *` (Dropdown: Academic, Transport, Cleanliness, Disciplinary, Financial)
    - `Source *` (Dropdown: In Person, Phone, Email, Online Form)
    - `Complain By *` (Text input: Parent name, student name)
    - `Phone` (Telephone input)
    - `Date *` (Date picker)
    - `Description` (Textarea)
    - `Action Taken` (Textarea)
    - `Assigned Staff` (Dropdown of faculty/staff)
    - `Note` (Textarea)
    - `Attach Document` (File upload)
    - Teal/Purple `Save` Button.
  - **Right Column (`Complain List`)**:
    - Columns: `Complain #` | `Complaint Type` | `Complain By` | `Date` | `Assigned Staff` | `Status` | `Action` (View, Edit, Delete).

##### 1.7 Setup Front Office (`admin/visitorspurpose`)
- **Purpose**: Master taxonomy setup for front desk lookup tables.
- **Tabbed Interface**:
  - `Purpose` (Add/List visitor visit purposes: Admission, Meeting Principal, Fees Payment, Campus Tour).
  - `Complain Type` (Add/List complaint categories: Academic, Facilities, Bus, Food).
  - `Source` (Add/List lead acquisition channels: Social Media, Banner, Newspaper, Word of Mouth, Front Site).
  - `Reference` (Add/List institutional references: Trustee, Alumni, Existing Student, Staff).

---

#### Module 02: Student Information (Lookup Only - 1 Submenu)

##### 2.1 Student Details (`admin/student/search`)
- **Purpose**: Read-only directory search to answer guardian inquiries, verify student enrollment, confirm roll number, and retrieve guardian contact numbers.
- **Filter Form (`Select Criteria`)**:
  - `Class` (Dropdown: Class 1 to Class 12)
  - `Section` (Dropdown: Section A, B, C, D)
  - `Search By Keyword` (Text input: Student Name, Roll Number, Enroll Number, National ID, Local ID)
  - `Search` Button.
- **View Switcher**: `List View` vs `Details View`.
- **Data Table Columns**:
  - `Admission No` | `Student Name` | `Class` | `Father Name` | `Date of Birth` | `Gender` | `Category` | `Mobile Number` | `Action` (View Profile modal only).
- **Access Restrictions**: Receptionist cannot edit profiles, disable students, or generate login credentials.

---

#### Module 03: Online Course (2 Submenus)

##### 3.1 Course Category (`admin/course/category`)
- **Purpose**: Manage course taxonomy and view category roster.
- **Split 2-Column Layout**:
  - Left: `Add Category` (`Category Name *`, `Save`).
  - Right: `Category List` (Search, Table: `Category Name` | `Action`).

##### 3.2 Online Course Report (`admin/course/report`)
- **Purpose**: View course enrollment and sales overview.
- **Columns**: `Course Title` | `Category` | `Class` | `Section` | `Teacher/Author` | `Price` | `Total Sales` | `Course Status` | `Action`.

---

#### Module 04 & 05: Live Classes (Gmeet & Zoom - 7 Submenus)

##### 4.1 Gmeet Live Classes (`admin/gmeet/meeting`)
- `Live Classes`: Daily live class broadcast links.
- `Live Meeting`: Staff and parent-teacher virtual conference coordination.
- `Setting`: Google Meet integration settings.

##### 5.1 Zoom Live Classes (`admin/zoom/meeting`)
- `Live Meeting`: Zoom meetings schedule and joining URLs.
- `Live Classes`: Zoom classroom sessions.
- `Live Classes Report`: Attendance and participation audit logs.
- `Setting`: Zoom API credentials.

---

#### Module 06: CBSE Examination (1 Submenu)

##### 6.1 Exam List (`admin/cbseexam/exam`)
- **Purpose**: Consult examination timetable and schedules to answer inquiries from students and parents at the reception desk.
- **Data Table**: `Exam Title` | `Class` | `Section` | `Start Date` | `End Date` | `Published` | `Action` (View Exam Schedule).

---

#### Module 07: Academics (6 Submenus)

##### 7.1 Class Timetable (`admin/timetable/classreport`)
- **Purpose**: Look up current class periods, room numbers, and active teachers to locate students or faculty during school hours.
- **Criteria**: `Class` dropdown, `Section` dropdown, `Search` button.

##### 7.2 Assign Class Teacher (`admin/teacher/assign_class_teacher`)
- **Purpose**: Look up who the assigned class teacher is for any grade and section.

##### 7.3 Subject Group (`admin/subjectgroup`)
- **Purpose**: View subjects assigned to curriculum groups.

##### 7.4 Subjects (`admin/subject`)
- **Purpose**: Catalog of academic subjects (Theory vs Practical).

##### 7.5 Class (`admin/classes`)
- **Purpose**: Institutional grade hierarchy.

##### 7.6 Sections (`admin/sections`)
- **Purpose**: Section division letters (A, B, C, etc.).

---

#### Module 08: Human Resource (1 Submenu)

##### 8.1 Staff Directory (`admin/staff`)
- **Purpose**: Comprehensive campus employee lookup to route incoming calls, transfer visitor inquiries, and check staff presence.
- **Criteria**: `Role` dropdown (All, Admin, Teacher, Accountant, Receptionist, Librarian), `Search By Keyword`.
- **Card / Grid View**:
  - Employee photo, Full Name, Staff ID, Role, Department, Designation, Mobile Phone, Email.
  - Live faculty roster: `Shivam Verma (9002)`, `Brandon Heart (9005)`, `William Abbot (9003)`, `Jason Shariton (90006)`.

---

#### Module 09: Communicate (Broadcast Hub - 4 Submenus)

##### 9.1 Notice Board (`admin/notification`)
- **Purpose**: View administrative alerts and post front desk announcements.
- **Action Buttons**: `+ Post New Message`, `Delete Notice Board`.

##### 9.2 Send Email (`admin/mailsms/compose`)
- **Purpose**: Dispatch front desk email notifications, admission invitations, and circulars.
- **Form Tabs**: `Group`, `Individual`, `Class`, `Today's Birthday`.
- **Recipient Toggles**: `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist`, `Student`, `Guardians`.
- **Buttons**: `Send Now`, `Schedule`.

##### 9.3 Send SMS (`admin/mailsms/sms`)
- **Purpose**: Send instant SMS alerts to parents regarding admissions, emergency weather closings, or transportation notices.

##### 9.4 Email / SMS Log (`admin/mailsms/log`)
- **Purpose**: Audit trail of all sent notifications, delivery timestamps, and gateway statuses.

---

#### Module 10: Certificate (Staff Badges - 2 Submenus)

##### 10.1 Staff ID Card (`admin/staffidcard`)
- **Purpose**: ID card template designer for staff badges.

##### 10.2 Generate Staff ID Card (`admin/generate_staffidcard`)
- **Purpose**: Batch generate and print visitor/staff ID badges.
- **Criteria**: `Role` dropdown, `Staff ID Card Template` dropdown.

---

#### Module 11: System Setting (1 Submenu)

##### 11.1 General Setting / Profile (`admin/users/profile`)
- **Purpose**: Personal profile settings, password update, notification preferences, session language.

---

### 4. 5-Role Architectural Comparison Matrix

```
┌───────────────────────────┬─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Architectural Dimension   │ Super Admin │ Admin       │ Teacher     │ Accountant  │ Receptionist│
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Persona Sample            │ Joe Black   │ Joe Black   │ Jason       │ James       │ Maria       │
│                           │ (Root ID: 1)│ (Campus ID) │ (Staff:9000)│ (Staff:9004)│ (Staff:9005)│
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Total Visible Modules     │ 34 Modules  │ 34 Modules  │ 19 Modules  │ 16 Modules  │ 11 Modules  │
│ Total Operational Submenus│ 182 Submenus│ 182 Submenus│ 78 Submenus │ 66 Submenus │ 30 Submenus │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Primary Domain Focus      │ Global Root │ Campus Lead │ Classroom   │ Cashier &   │ Front Desk  │
│                           │ Governance  │ Governance  │ Instruction │ Procurement │ & Inquiries │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Brand Accent Color        │ Deep Indigo │ Deep Slate  │ Emerald     │ Amber Gold  │ Teal / Cyan │
│                           │ (#4338CA)   │ (#1E293B)   │ (#059669)   │ (#D97706)   │ (#0D9488)   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Front Office Access       │ Full Admin  │ Full Admin  │ Restricted  │ Restricted  │ Primary Hub │
│ (Enquiry, Visitor, Call)  │ (All)       │ (All)       │ (None)      │ (None)      │ (7 Submenus)│
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Fees Collection & Ledger  │ Full Read/  │ Full Read/  │ Restricted  │ Primary Hub │ Restricted  │
│ (Collections, Balances)   │ Write       │ Write       │ (None)      │ (9 Submenus)│ (None)      │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Student Academic Dossier  │ Full Manage │ Full Manage │ Gradebook & │ Balance Due │ Directory   │
│ & Records Control         │ & Promotion │ & Promotion │ Attendance  │ Inquiry     │ Lookup Only │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ Payroll & Human Resources │ Full Master │ Full Master │ Personal    │ Full Payroll│ Staff Phone │
│ Access                    │ (HR + Pay)  │ (HR + Pay)  │ Payslip Only│ Processing  │ Directory   │
├───────────────────────────┼─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ System Infrastructure     │ Root Config,│ Campus Lead │ Restricted  │ Print Header│ Personal    │
│ & Database Backups        │ Backups, Pay│ Settings    │ (None)      │ Footer Only │ Profile Only│
└───────────────────────────┴─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

---

### 5. Architectural Verification & Compliance Checklist

- [x] **Zero Emoji Compliance**: 100% devoid of unicode emoji characters.
- [x] **Flow List Structure**: All navigation paths and operational screens are modeled as sequential flow lists.
- [x] **Concrete Evidence Ingress**: Built directly on raw OCR data extracted from 14 Receptionist screenshots (`media_1789167453374.png` through `media_1789167638294.png`).
- [x] **Cross-Portal Synchrony**: Seamlessly matches Super Admin, Admin, Teacher, and Accountant portal specifications.
