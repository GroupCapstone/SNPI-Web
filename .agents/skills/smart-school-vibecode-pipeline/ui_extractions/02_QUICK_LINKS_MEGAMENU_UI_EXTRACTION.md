# Module 02 / Quick Links: Universal Navigation Taxonomy Megamenu (2 Screenshots) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 02 / Quick Links: Universal Navigation Taxonomy Megamenu (2 Screenshots)`
- **Total Ingested Screenshots**: **2 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/02_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- Full-screen megamenu drawer triggered by the 3x3 grid icon next to `Quick Links` in the left sidebar.
  - Exposes the complete 34-module ERP taxonomy in a 5-column directory:
    - **Column 1**: Academics (Class Timetable, Teachers Timetable, Assign Class Teacher, Promote Students, Subject Group, Subjects, Class, Sections), Alumni (Manage Alumni, Events), Annual Calendar (Annual Calendar, Holiday Type), Attendance (Student Attendance, Approve Leave, Attendance By Date), Behaviour Records (Assign Incident, Incidents, Reports, Setting), CBSE Examination (Exam, Exam Schedule, Print Marksheet, Template, Assign Observation, Admit Card, Reports, Setting).
    - **Column 2**: Certificate (Transfer Certificate, Student Certificate, Generate Certificate, Student ID Card, Generate ID Card, Staff ID Card, Generate Staff ID Card), Communicate (Notice Board, Send Email, Send SMS, Email / SMS Log, Schedule Email SMS Log, Login Credentials Send, Email Template, SMS Template), Download Center (Upload/Share Content, Content Share List, Video Tutorial, Content Type), Examinations (Exam Group, Exam Schedule, Exam Result, Design Admit Card, Print Admit Card, Design Marksheet, Print Marksheet, Marks Grade, Marks Division), Expenses (Add Expense, Search Expense, Expense Head), Fees Collection (Collect Fees, Offline Bank Payments, Search Fees Payment, Search Due Fees, Fees Master, Quick Fees, Fees Group, Fees Type, Fees Discount, Fees Carry Forward, Fees Reminder).
    - **Column 3**: Front CMS (Event, Gallery, News, Media Manager, Pages, Menus, Banner Images), Front Office (Admission Enquiry, Visitor Book, Phone Call Log, Postal Dispatch, Postal Receive, Complain, Setup Front Office), Gmeet Live Classes (Live Classes, Live Meeting, Live Classes Report, Live Meeting Report, Setting), Homework (Add Homework, Daily Assignment), Hostel (Hostel Rooms, Room Type, Hostel), Human Resource (Staff Directory, Staff Attendance, Payroll, Approve Leave Request, Apply Leave, Leave Type, Teachers Rating, Department, Designation, Disabled Staff).
    - **Column 4**: Income (Add Income, Search Income, Income Head), Inventory (Issue Item, Add Item Stock, Add Item, Item Category, Item Store, Item Supplier), Lesson Plan (Copy Old Lessons, Manage Lesson Plan, Manage Syllabus Status, Lesson, Topic), Library (Book List, Issue - Return, Add Student, Add Staff Member), Multi Branch (Overview, Report, Setting), Online Course (Online Course, Question Bank, Offline Payment, Course Category, Certificate Template, Online Course Report, Setting), Online Examinations (Online Exam, Question Bank), QR Code Attendance (Attendance, Setting), Quick Fees, Reports (Student Information, Finance, Attendance, Examinations, Online Examinations, Lesson Plan, Human Resource, Homework, Library, Inventory, Transport, Hostel, Alumni, User Log, Audit Trail Report), Student CV (Build CV, Download CV).
    - **Column 5**: Student Information (Student Details, Student Admission, Online Admission, Disabled Students, Multi Class Student, Bulk Delete, Student Categories, Student House, Disable Reason), System Setting (General Setting, Session Setting, Notification Setting, Whatsapp Messaging, SMS Setting, Email Setting, Payment Methods, Print Header Footer, Thermal Print, Front CMS Setting, Roles Permissions, Backup Restore, Languages, Currency, Addons, Users, Modules, Custom Fields, Captcha Setting, System Fields, Student Profile Update, Online Admission, File Types, Sidebar Menu, System Update), Thermal Print, Transport (Fees Master, Pickup Point, Routes, Vehicles, Assign Vehicle, Route Pickup Point, Student Transport Fees), Whatsapp Messaging, Zoom Live Classes (Live Meeting, Live Classes, Live Classes Report, Live Meeting Report, Setting).

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `quick-links-megamenu-left-center` (`media_1789160147461.png`)

- **Image File**: [`media_1789160147461.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160147461.png)
- **Screen / Slug Name**: `quick-links-megamenu-left-center`
- **Target Platform Route**: `/admin/quick-links/quick-links-megamenu-left-center`
- **UI Layout Archetype**: **Archetype F: Full-Screen Universal Navigation Megamenu Drawer**

#### 1. Extracted Text Content

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Quick Links Megamenu Left Center` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Quick Links Megamenu Left Center`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Quick Links Megamenu Left Center List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: Full-screen slide-down/drawer overlay organized into 5 balanced vertical directory columns covering all 34 functional ERP modules.
- **Zone 1 (Drawer Header)**: Drawer top banner with title "Quick Links Navigation", search filter input, and close button.
- **Zone 2 (Directory Columns)**: 5-column responsive CSS grid container dividing functional domains with uppercase section headers.
- **Zone 3 (Navigation Links)**: Vertical list of tactile link pills with Google Material Symbols icons and hover elevation.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `FullPageDrawerOverlay`: High-level container component.
  - `MegamenuDirectoryColumn`: High-level container component.
  - `TaxonomyLinkPill`: High-level container component.
  - `DirectorySearchFilter`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/navigation/`
- **Component Props & Config Schema (Brainstorming Specification)**:
  - `title`: string (Screen or card title)
  - `criteriaFilters`: Array of filter field descriptors (`classId`, `sectionId`, `dateRange`, `status`)
  - `tableColumns`: Array of column configurations (key, label, sortable, renderBadge, align)
  - `rowActions`: Array of permitted tactical actions (`['view', 'edit', 'delete']`)
  - `exportEnabled`: boolean (Flags CSV, Excel, PDF, Print export toolbar)
- **Engineering Brainstorming Notes**:
  - Ensure zero raw JPA or inline SQL; tie directly to REST API endpoint contracts.
  - Multi-tenant tenant/branch context (`X-Branch-ID`) must be propagated automatically via interceptors.
  - Use accessible semantic HTML (`<main>`, `<section>`, `<form>`, `<table>`, `<button>`) with full keyboard tab indexing.

---

### Screen 02: `quick-links-megamenu-center-right` (`media_1789160155573.png`)

- **Image File**: [`media_1789160155573.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160155573.png)
- **Screen / Slug Name**: `quick-links-megamenu-center-right`
- **Target Platform Route**: `/admin/quick-links/quick-links-megamenu-center-right`
- **UI Layout Archetype**: **Archetype F: Full-Screen Universal Navigation Megamenu Drawer**

#### 1. Extracted Text Content

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Quick Links Megamenu Center Right` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Quick Links Megamenu Center Right`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Quick Links Megamenu Center Right List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: Full-screen slide-down/drawer overlay organized into 5 balanced vertical directory columns covering all 34 functional ERP modules.
- **Zone 1 (Drawer Header)**: Drawer top banner with title "Quick Links Navigation", search filter input, and close button.
- **Zone 2 (Directory Columns)**: 5-column responsive CSS grid container dividing functional domains with uppercase section headers.
- **Zone 3 (Navigation Links)**: Vertical list of tactile link pills with Google Material Symbols icons and hover elevation.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `FullPageDrawerOverlay`: High-level container component.
  - `MegamenuDirectoryColumn`: High-level container component.
  - `TaxonomyLinkPill`: High-level container component.
  - `DirectorySearchFilter`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/navigation/`
- **Component Props & Config Schema (Brainstorming Specification)**:
  - `title`: string (Screen or card title)
  - `criteriaFilters`: Array of filter field descriptors (`classId`, `sectionId`, `dateRange`, `status`)
  - `tableColumns`: Array of column configurations (key, label, sortable, renderBadge, align)
  - `rowActions`: Array of permitted tactical actions (`['view', 'edit', 'delete']`)
  - `exportEnabled`: boolean (Flags CSV, Excel, PDF, Print export toolbar)
- **Engineering Brainstorming Notes**:
  - Ensure zero raw JPA or inline SQL; tie directly to REST API endpoint contracts.
  - Multi-tenant tenant/branch context (`X-Branch-ID`) must be propagated automatically via interceptors.
  - Use accessible semantic HTML (`<main>`, `<section>`, `<form>`, `<table>`, `<button>`) with full keyboard tab indexing.

---

