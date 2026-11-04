---
name: smart-school-system
description: Authoritative architecture, Liquid Glass UI/UX design system (liquid-glass-design-system, srievi-liquid-glass-standards, shiliaiwei-liquid-glass-standards), role access matrix, Google Material Symbols standards, and step-by-step implementation standards for the Smart School Enterprise Multi-Role Management Platform (ABLOB). Default brand is IDEAI SCHOOL with centralized single-file rebranding in src/config/brand.ts and blank logo placeholder. Covers Super Admin, Admin, Teacher, Student, Parent, Accountant, Receptionist, Librarian portals, Public Front Site, Android Mobile App ecosystem, and Help & Documentation. Trigger whenever building, designing, architecting, or extending modules for this school management system.
---

# Smart School Enterprise System (ABLOB Platform) — IDEAI SCHOOL

The **Smart School Enterprise Platform** is a multi-tenant, role-governed education management and school administration ecosystem built on the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, and `shiliaiwei-liquid-glass-standards`). The default institutional branding is configured as **IDEAI SCHOOL**, with a centralized single-source brand architecture (`src/config/brand.ts`) designed for effortless 1-click rebranding across all web portals, mobile apps, and generated reports.


---

## 1. Centralized Institutional Brand Architecture

All branding, institutional name, contact details, academic session parameters, and logo placeholders are governed strictly from:
`src/config/brand.ts`

```typescript
export const BRAND: BrandConfig = {
  schoolName: "IDEAI SCHOOL",
  shortName: "IDEAI",
  schoolCode: "IDEAI-2026-HQ",
  tagline: "Intelligent Digital Education & Academic Infrastructure",
  logo: {
    url: null, // Blank placeholder for custom logo upload
    altText: "IDEAI SCHOOL Official Emblem",
    width: 140,
    height: 40,
  },
  contact: {
    email: "admin@ideaischool.edu",
    phone: "+855 23 888 999",
    address: "No. 128 Innovation Blvd, Tech Park",
    website: "https://ideaischool.edu",
  },
  academic: {
    currentSession: "2026-27",
    sessionStartMonth: "April",
    dateFormat: "DD/MM/YYYY",
    timezone: "Asia/Phnom_Penh (GMT+07:00)",
    currency: "USD",
    currencySymbol: "$",
  },
  theme: {
    superAdminColor: "#8E24AA",
    adminColor: "#0288D1",
    teacherColor: "#2563EB",
    studentColor: "#8BC34A",
    parentColor: "#E91E63",
    accountantColor: "#FF9800",
    receptionistColor: "#00BCD4",
    librarianColor: "#4CAF50",
  },
};
```

---

## 2. Icon, Typography & Local Asset Directives (MANDATORY)

1. **Mandatory Three-Font Architecture**:
   - **English System Font**: Strictly **Ubuntu** (`font-ubuntu` / `var(--font-ubuntu)`). Default font for all English UI, navigation, inputs, data grids, metrics, and labels.
   - **Khmer Primary Font**: Strictly **Google Sans** (`font-khmer` / `var(--font-google-sans)`) with line-height `1.45`-`1.50` for all Khmer UI copy and communication.
   - **Khmer Ceremonial Display Font**: Strictly **Moul** (`font-moul` / `var(--font-moul)`). Reserved exclusively for formal diplomas, certificates, and state headers. Rarely used.
2. **Local Internal Asset Storage Standard**:
   - Core fonts, brand assets, and icons MUST be self-hosted internally for zero CLS, offline resilience, and fast TTFB:
     - Local Fonts: `frontend/src/fonts/{ubuntu,google-sans,moul}/` (compiled via `next/font/local`) and `frontend/public/fonts/`.
     - Brand Logo: `frontend/public/images/logo.jpg` (Apple Mac minimalist geometric crest).
     - App Icon: `frontend/public/icons/app-icon.jpg` (macOS squircle liquid glass design).
     - User Uploads: `backend/storage/app/public/`.
3. **Primary Icon System: Google Material Symbols & Material Web**:
   - Primary resource: **[Google Fonts Icons](https://fonts.google.com/icons)** and **[Material Symbols (msicons.com)](https://msicons.com/)**.
   - Component package: `@material/web` (Google Material Web Components).
   - Component wrapper: `<MaterialIcon name="..." fill={bool} weight={400} />`.
   - **NO FontAwesome, NO Lucide overrides where Material Symbols are designated**.
4. **STRICT ZERO EMOJI POLICY**:
   - **NEVER** use emojis in UI components, headings, buttons, badges, tables, alerts, or source code.
   - Use clean, professional typography and solid Google Material Symbols only.

---

## 3. Super Admin & Admin Navigation Taxonomy (34 Complete Modules Flow List)

The **Super Admin** (`SUPER_ADMIN`) and **Campus Admin** (`ADMIN`) panels encompass the comprehensive 34-module institutional management tree. While Super Admin holds cross-campus bypass (`app.bypass_rls = true`), Admin commands campus-scoped operations (`app.current_branch_id = ?`):

1. **Front Office** (`support_agent`): Admission Enquiry, Visitor Book, Phone Call Log, Postal Dispatch, Postal Receive, Complain, Setup Front Office
2. **Student Information** (`school`): Student Details, Student Admission, Online Admission, Disabled Students, Multi Class Student, Bulk Delete, Student Categories, Student House, Disable Reason
3. **Fees Collection** (`attach_money`): Collect Fees, Offline Bank Payments, Search Fees Payment, Search Due Fees, Fees Master, Quick Fees, Fees Group, Fees Type, Fees Discount, Fees Carry Forward, Fees Reminder
4. **Online Course** (`video_library`): Online Course, Question Bank, Offline Payment, Online Course Report, Setting
5. **Behaviour Records** (`psychology`): Assign Incident, Incidents, Reports, Setting
6. **Multi Branch** (`hub`): Overview, Report, Setting
7. **Gmeet Live Classes** (`videocam`): Live Classes, Live Meeting, Live Classes Report, Live Meeting Report, Setting
8. **Zoom Live Classes** (`video_camera_front`): Live Meeting, Live Classes, Live Classes Report, Live Meeting Report, Setting
9. **Income** (`payments`): Add Income, Search Income, Income Head
10. **Expenses** (`receipt_long`): Add Expense, Search Expense, Expense Head
11. **Attendance** (`co_present`): Student Attendance, Approve Leave, Attendance By Date
12. **CBSE Examination** (`fact_check`): Exam, Exam Schedule, Print Marksheet, Template, Assign Observation, Reports, Setting
13. **Examinations** (`assignment_turned_in`): Exam Group, Exam Schedule, Exam Result, Design Admit Card, Print Admit Card, Design Marksheet, Print Marksheet, Marks Grade, Marks Division
14. **Online Examinations** (`laptop_chromebook`): Online Exam, Question Bank
15. **Academics** (`menu_book`): Class Timetable, Teachers Timetable, Assign Class Teacher, Promote Students, Subject Group, Subjects, Class, Sections
16. **Human Resource** (`badge`): Staff Directory, Staff Attendance, Payroll, Approve Leave Request, Apply Leave, Leave Type, Teachers Rating, Department, Designation, Disabled Staff
17. **Communicate** (`campaign`): Notice Board, Send Email, Send SMS, Email / SMS Log, Schedule Email SMS Log, Login Credentials Send, Email Template, SMS Template
18. **Download Center** (`download`): Upload/Share Content, Content Share List, Video Tutorial, Content Type
19. **Homework** (`assignment`): Add Homework, Daily Assignment
20. **Library** (`auto_stories`): Book List, Issue - Return, Add Student, Add Staff Member
21. **Inventory** (`inventory_2`): Issue Item, Add Item Stock, Add Item, Item Category, Item Store, Item Supplier
22. **Transport** (`directions_bus`): Fees Master, Pickup Point, Routes, Vehicles, Assign Vehicle, Route Pickup Point, Student Transport Fees
23. **Hostel** (`hotel`): Hostel Rooms, Room Type, Hostel
24. **Certificate** (`workspace_premium`): Transfer Certificate, Student Certificate, Generate Certificate, Student ID Card, Generate ID Card, Staff ID Card, Generate Staff ID Card
25. **Front CMS** (`web`): Event, Gallery, News, Media Manager, Pages, Menus, Banner Images
26. **Alumni** (`groups`): Manage Alumni, Events
27. **Reports** (`analytics`): Student Information, Finance, Attendance, Examinations, Online Examinations, Lesson Plan, Human Resource, Homework, Library, Inventory, Transport, Hostel, Alumni, User Log, Audit Trail Report
28. **System Setting** (`settings`): General Setting, Session Setting, Notification Setting, Whatsapp Messaging, SMS Setting, Email Setting, Payment Methods, Print Header Footer, Thermal Print, Front CMS Setting, Backup Restore, Currency, Users, Custom Fields, System Fields, Student Profile Update, Online Admission, Sidebar Menu
29. **Annual Calendar** (`calendar_month`): Annual Calendar, Holiday Type
30. **Lesson Plan** (`auto_stories`): Copy Old Lessons, Manage Lesson Plan, Manage Syllabus Status, Lesson, Topic
31. **Student CV** (`badge`): Build CV, Download CV
32. **Quick Fees** (`bolt`): Direct fast-action counter billing desk
33. **Thermal Print** (`print`): Direct POS thermal receipt formatting and docket engine
34. **Whatsapp Messaging** (`chat`): WhatsApp message templates and dispatch logs

---

## 4. Visual Analytics & KPI Telemetry (Live System Values)

1. **Horizontal Progress Meters**:
   - Fees Awaiting Payment (2/7 - Blue `#3b82f6`)
   - Staff Approved Leave (1/3 - Cyan `#06b6d4`)
   - Student Approved Leave (3/10 - Navy `#1e40af`)
   - Converted Leads (1/8 - Red `#ef4444`)
   - Staff Present Today (0/9 - Neutral/Emerald `#10b981`)
   - Student Present Today (37/89 - Amber `#f59e0b`)
2. **Visual Analytics Gauges & Charts**:
   - **Fees Collection & Expenses (Current Month)**: Daily dual-bar chart (Collection in green `#84cc16`, Expenses in red `#ef4444`).
   - **Income (Current Month)**: Half-donut chart (Donation, Rent, Miscellaneous).
   - **Fees Collection & Expenses (Academic Session 2026-27)**: 12-month spline line curve (April to March).
   - **Expense (Current Month)**: Half-donut chart (Stationery Purchase, Telephone Bill, Miscellaneous, Flower).

---

## 5. Standardized 3-Zone Screen Flow Paradigm

Every operational screen across Admin and Super Admin adheres to the standardized 3-zone flow:
1. **Zone 1: Select Criteria Card**:
   - Dropdown selectors (e.g., `Class *`, `Section`) with mandatory validation asterisks.
   - Primary `Search` action button (Blue/Indigo `#4f46e5`).
   - Alternative `Search By Keyword` text input with secondary `Search` button (Purple `#6366f1`).
2. **Zone 2: View Switcher / Action Toolbar**:
   - `List View` tab (tabular data layout) vs `Details View` tab (profile card layout).
3. **Zone 3: Data Table / Empty-State Recovery**:
   - Tabular grid with standardized columns (`Admission No`, `Student Name`, `Roll No.`, `Class`, `Father Name`, `Date Of Birth`, `Gender`, `Category`, `Mobile Number`, `Action`).
   - Empty State Component: Centered folder illustration with documents + *"No data available in table"* + guided recovery link *"Add new record or search with different criteria."*
   - Bottom status line: *"Showing 0 to 0 of 0 entries"* with disabled/active pagination.

---

## 6. Teacher Portal Navigation Taxonomy & Isolation Boundaries (19 Permitted Modules)

The **Teacher Portal** (`TEACHER`) is an instructional persona scoped strictly to assigned subjects, classes, sections, and personal records (`app.current_staff_id = ?`, `app.current_branch_id = ?`). Brand color token is **Academic Cobalt Blue** (`#2563EB`).

### Permitted 19 Modules (78 Submenus):
1. **Academics** (`menu_book`): Class Timetable, Teachers Timetable, Assign Class Teacher, Subject Group, Subjects, Class, Sections (7 submenus; *Promote Students omitted*).
2. **Attendance** (`co_present`): Student Attendance, Approve Leave, Attendance By Date (3 submenus).
3. **Behaviour Records** (`psychology`): Assign Incident, Incidents, Reports, Setting (4 submenus).
4. **CBSE Examination** (`fact_check`): Exam, Exam Schedule, Print Marksheet, Template, Assign Observation, Reports, Setting (7 submenus).
5. **Certificate** (`workspace_premium`): Staff ID Card, Generate Staff ID Card (2 submenus; *student credentials omitted*).
6. **Communicate** (`campaign`): Notice Board, Send Email, Send SMS, Email / SMS Log (4 submenus).
7. **Download Center** (`download`): Upload/Share Content, Content Share List, Video Tutorial, Content Type (4 submenus).
8. **Examinations** (`assignment_turned_in`): Exam Group, Exam Result, Design Admit Card, Print Admit Card, Design Marksheet, Print Marksheet, Marks Grade (7 submenus).
9. **Gmeet Live Classes** (`videocam`): Live Classes, Live Meeting, Live Classes Report, Live Meeting Report, Setting (5 submenus).
10. **Homework** (`assignment`): Add Homework, Daily Assignment (2 submenus).
11. **Human Resource** (`badge`): Staff Directory, Apply Leave (2 submenus; *payroll, staff attendance, leave approval omitted*).
12. **Lesson Plan** (`auto_stories`): Manage Lesson Plan, Manage Syllabus Status, Lesson, Topic (4 submenus; *Copy Old Lessons omitted*).
13. **Multi Branch** (`hub`): Overview (1 submenu; *read-only*).
14. **Online Course** (`video_library`): Online Course, Course Category, Online Course Report (3 submenus; *LMS course creator*).
15. **Online Examinations** (`laptop_chromebook`): Online Exam, Question Bank (2 submenus; *CBT authoring*).
16. **Reports** (`analytics`): Student Information, Attendance, Examinations, Online Examinations, Lesson Plan, Homework, Transport, Hostel, Alumni (9 instructional reports).
17. **Student Information** (`school`): Student Details, Student Admission, Disabled Students, Multi Class Student, Bulk Delete, Student Categories, Student House, Disable Reason (8 submenus).
18. **System Setting** (`settings`): Personal profile preferences (1 submenu).
19. **Zoom Live Classes** (`video_camera_front`): Live Meeting, Live Classes, Live Classes Report, Live Meeting Report, Setting (5 submenus).

### Restricted 15 Modules (Strictly Omitted):
- **Front Office**, **Fees Collection**, **Quick Fees**, **Income**, **Expenses**, **Library**, **Inventory**, **Transport**, **Hostel**, **Front CMS**, **Alumni**, **Annual Calendar**, **Student CV**, **Thermal Print**, **Whatsapp Messaging**.


