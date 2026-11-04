---
name: veb-super-admin-erp-engine
description: >-
  Authoritative VEB Super Admin 35-Module ERP Architecture, subfolder panel navigation, full interactive CRUD operations, Material 3 Expressive UI standards, and brand guidelines. Trigger on: veb erp, 35 menus, sidebar submenus, subfolder panels, erp crud engine, school erp dashboard, academix to veb migration, m3 expressive ui.
---

# VEB Super Admin 35-Module ERP & UI Engine Standards

Authoritative architecture, layout protocols, navigation hierarchies, and CRUD engine standards for the **VEB School Super Admin ERP Console**.

---

## 1. Brand Identity & Global Assets

* **Brand Name**: **VEB Console** / **VEB Super Admin** (formerly AcademIX).
* **Official Logo Asset**: `https://github.com/shiliaiwei.png`
  * Navigation Rail Header: `<img class="brand-logo-img" src="https://github.com/shiliaiwei.png" alt="VEB Logo" ... />` (`28x28px`, `border-radius: 8px`).
  * Navigation Rail User Profile Footer: `<img src="https://github.com/shiliaiwei.png" alt="VEB Admin" ... />` (`border-radius: 50%`).
  * Login View Badge: `<img src="https://github.com/shiliaiwei.png" ... />` (`56x56px` circular badge).
  * Web Favicon: `<link rel="icon" type="image/png" href="https://github.com/shiliaiwei.png" />`.
* **Super Admin Credentials**: `admin@veb.school` / `password123`.
* **Database Name**: `VebSuperAdminDB` (IndexedDB schema with automated migration sanitizers).

---

## 2. 35 Sidebar Menus & 165+ Submenus Navigation Hierarchy

The left sidebar (`src/components/navigation-rail.ts`) provides full operational access to the 35 school management modules:

| # | Module Name | Key | Submenu Count | Primary Operational Focus |
|---|---|---|---|---|
| 1 | **Academics** | `academics` | 8 | Class Timetable, Teachers Timetable, Class Teacher, Promotion, Subjects, Sections |
| 2 | **Alumni** | `alumni` | 2 | Alumni Directory, Reunion & Homecoming Events |
| 3 | **Annual Calendar** | `annual-calendar` | 2 | Campus Calendar Milestones, Statutory Holiday Types |
| 4 | **Attendance** | `attendance` | 3 | Daily Student Attendance, Leave Approval, Date Rosters |
| 5 | **Behaviour Records** | `behaviour` | 4 | Incident Logging, Student Merits/Demerits, Conduct Reports |
| 6 | **CBSE Examination** | `cbse` | 8 | CBSE Board Exams, Schedules, CCE Observations, Admit Cards, Marksheets |
| 7 | **Certificate** | `certificate` | 7 | Transfer Certificates (TC), Student Certificates, NFC Smart ID Cards, Staff IDs |
| 8 | **Communicate** | `communicate` | 8 | Notice Board Circulars, Outbound Broadcast Emails, Khmer SMS, Credentials |
| 9 | **Download Center** | `download-center` | 4 | Upload/Share Content, Content Share Lists, Video Tutorials, Asset Types |
| 10 | **Examinations** | `examinations` | 9 | Exam Groups, Schedules, Exam Results, Design/Print Admit Cards & Marksheets |
| 11 | **Expenses** | `expenses` | 3 | Add Expense, Search Expense Vouchers, Expense Ledger Heads |
| 12 | **Fees Collection** | `fees` | 11 | Collect Fees, Offline Bank Slips, Search Due, Fees Master, Fees Groups, Reminders |
| 13 | **Front CMS** | `front-cms` | 7 | Public Events, Photo Galleries, News Articles, Media Manager, Pages, Menus |
| 14 | **Front Office** | `front-office` | 7 | Admission Enquiries, Visitor Book Passes, Call Logs, Postal Mail, Complaints |
| 15 | **Gmeet Live Classes** | `gmeet` | 5 | Google Meet Classes, Administrative Meetings, Attendance Telemetry Reports |
| 16 | **Homework** | `homework` | 2 | Add Homework Assignments, Daily Micro-Tasks & Submissions |
| 17 | **Hostel** | `hostel` | 3 | Residential Hostel Rooms, Room Categories, Hostel Buildings |
| 18 | **Human Resource** | `hr` | 10 | Staff Directory, Staff Attendance, Payroll Slips, Leave Approvals, Ratings |
| 19 | **Income** | `income` | 3 | Add Revenue, Search Income Ledgers, Primary Revenue Heads |
| 20 | **Inventory** | `inventory` | 6 | Issue Items, Stock Inflow, Item Master, Item Categories, Stores, Suppliers |
| 21 | **Lesson Plan** | `lesson-plan` | 5 | Clone Old Lessons, Manage Lesson Plans, Syllabus Progress, Lessons, Topics |
| 22 | **Library** | `library` | 4 | Book Catalog, Circulation Issue/Return, Student Members, Faculty Borrowers |
| 23 | **Multi Branch** | `multi-branch` | 3 | Phnom Penh Central, Siem Reap STEM, Battambang Primary Overview & Sync |
| 24 | **Online Course** | `online-course` | 7 | E-Learning Courses, Question Banks, Offline Course Payments, Certificates |
| 25 | **Online Examinations** | `online-examinations` | 2 | Computer-Based Testing (CBT) Quizzes, Question Pools |
| 26 | **QR Code Attendance** | `qr-attendance` | 2 | NFC/QR Biometric Turnstile Telemetry, Device Configurations |
| 27 | **Quick Fees** | `quick-fees` | 2 | Point-of-Sale Express Cashiering, Counter Arrears Lookup |
| 28 | **Reports** | `reports` | 15 | SIS, Finance, Attendance, Exam, Lesson Plan, HR, Homework, Library, Audit Trail |
| 29 | **Student CV** | `student-cv` | 2 | Interactive Academic CV Builder, Verified PDF Downloads |
| 30 | **Student Information** | `students` | 9 | Student Profiles, Direct Admissions, Online Leads, Categories, Houses |
| 31 | **System Setting** | `settings-module` | 25 | General Parameters, Sessions, WhatsApp, SMS, Bakong Payment, Roles, Backups |
| 32 | **Thermal Print** | `thermal-print` | 2 | 80mm ESC/POS Thermal Receipt Printing, POS Device Configurations |
| 33 | **Transport** | `transport` | 7 | Transit Fleet Zones, Pickup Points, Route Sequences, School Buses, Driver Roster |
| 34 | **Whatsapp Messaging** | `whatsapp` | 3 | WhatsApp Broadcast Push, Meta Cloud Webhook Logs, HSM Templates |
| 35 | **Zoom Live Classes** | `zoom` | 5 | Zoom Virtual Lectures, Executive Board Meetings, Attendance Logs, OAuth |

### Instant Menu Search Filter
The sidebar includes an instant search bar (`#nav-menu-search-input`) allowing administrators to filter across all 35 modules and 165+ submenus in real time with zero latency.

---

## 3. Subfolder Navigation & Panel Architecture

When any menu is selected, the application renders a dedicated operational panel (`src/views/crud-view.ts`):

1. **Subfolder Navigation Strip**:
   * Renders horizontal 9999px pill buttons representing each subfolder/submenu of that module.
   * Active pill is highlighted in `var(--md-sys-color-primary)`.
   * Switching subfolder tabs dynamically loads that subfolder's data list, columns, and records in place without a full-page reload.
2. **KPI Summary Cards**:
   * 4 responsive summary metrics: Total Registered, Active / Cleared, Pending / In-Review, and Compliance / Attainment.
3. **Filter & Control Strip**:
   * Real-time text search filter across all record fields.
   * Category filter dropdown.
   * Dataset counter (`Showing X of Y entries`).
4. **Action Ribbon**:
   * Primary CTA: `+ Add [ItemType]` triggering a Material 3 dialog modal.
   * Secondary Action: `Export` downloading the current subfolder dataset as JSON.

---

## 4. Interactive CRUD Engine Standards

Each submenu data list implements full interactive CRUD operations:

* **Create**: Modal dialog with form fields, automatic unique ID generation (e.g. `TT-101`, `STU-1001`), and timestamping.
* **Read**: Responsive data table with high contrast typography, category chips, status badges, and action buttons.
* **Update**: Modal pre-populated with existing record data for immediate inline edits.
* **Delete**: Safe deletion confirmation dialog with record title and ID verification.
* **View Details**: Dialog displaying all schema fields, metadata, and custom operational properties.

---

## 5. Material 3 Expressive UI & Layout Invariants

* **Container Shapes**:
  * Action buttons: `border-radius: 9999px` (Pill buttons).
  * Cards: `border-radius: 20px` (20dp).
  * Dialogs: `border-radius: 28px` (28dp).
* **Viewport Containment**:
  * Main stage: `max-width: calc(100% - 250px)`.
  * Horizontal overflow: All tables use isolated horizontal scroll containers (`.table-container`) to prevent viewport blowout.
* **Icon Styling**:
  * Strictly NO solid square background highlights behind Font Awesome icons.
* **Typography**:
  * Font family: `Roboto, sans-serif`.
  * Single-line headers and badges: `white-space: nowrap !important; word-break: keep-all;`.
* **Zero Emojis**:
  * Under no circumstances should emojis be included in source code, data stores, or UI screens. Use Font Awesome icons (`<i class="fa-solid ..."></i>`).
* **Pill Button Padding & Icon Collision Prevention**:
  * 9999px pills curve sharply at both edges. Default 16px leading space causes slotted icons to touch or clip the curved left border, and text to touch the right border.
  * Standard Token Specification:
    ```css
    --md-filled-button-leading-space: 24px;
    --md-filled-button-trailing-space: 24px;
    --md-filled-button-with-leading-icon-leading-space: 20px;
    --md-filled-button-with-leading-icon-trailing-space: 24px;
    --md-filled-button-icon-size: 14px;

    --md-outlined-button-leading-space: 24px;
    --md-outlined-button-trailing-space: 24px;
    --md-outlined-button-with-leading-icon-leading-space: 20px;
    --md-outlined-button-with-leading-icon-trailing-space: 24px;
    --md-outlined-button-icon-size: 14px;
    ```
  * Slotted icon size: `font-size: 13px !important; margin-right: 4px;`.

---

## 6. Material 3 Modal Dialog Viewport Centering & Scrim Protocol

To prevent `<md-dialog>` components from snapping to the top-left `(0, 0)` corner or losing their backdrop scrim:

1. **Global Reset Protection**:
   * Global `* { margin: 0; }` resets must never override custom web component centering.
   * Explicitly restore auto margin:
     ```css
     md-dialog,
     dialog {
       margin: auto !important;
     }
     ```
2. **Fixed Viewport Positioning & Elevation**:
   ```css
   md-dialog {
     --md-dialog-container-shape: 28px;
     --md-sys-shape-corner-extra-large: 28px;
     margin: auto !important;
     position: fixed !important;
     inset: 0 !important;
     border-radius: 28px;
     box-sizing: border-box;
     max-width: min(720px, calc(100vw - 48px));
     max-height: min(860px, calc(100vh - 48px));
     z-index: 10000 !important;
     pointer-events: auto;
   }
   ```
3. **Modal Dialog Host Layer**:
   * Wrap all dialog hosts with fixed viewport positioning and conditional backdrop scrim:
     ```css
     #crud-dialog-host,
     #modal-host,
     #tenant-modal-host,
     #audit-modal-host,
     #module-inspect-host,
     .dialog-host {
       position: fixed;
       inset: 0;
       z-index: 9999;
       pointer-events: none;
       display: flex;
       align-items: center;
       justify-content: center;
       transition: background-color var(--motion-transition-standard);
     }

     #crud-dialog-host:has(md-dialog),
     #modal-host:has(md-dialog),
     #tenant-modal-host:has(md-dialog),
     #audit-modal-host:has(md-dialog),
     #module-inspect-host:has(md-dialog),
     .dialog-host:has(md-dialog) {
       background-color: rgba(15, 23, 42, 0.42);
       backdrop-filter: blur(3px);
       -webkit-backdrop-filter: blur(3px);
       pointer-events: auto;
     }
     ```
4. **Lifecycle & Cleanup**:
   * Attach `dialog.addEventListener('closed', () => { host.innerHTML = ''; })` on all dynamically spawned dialogs to ensure immediate backdrop removal upon dismiss.

---

## 7. Session Sanitization & Rebranding Invariants

1. **Brand Enforcing at Session Load**:
   * In `AuthService.init()` and `AuthService.getSession()`, always sanitize session fields before handing them to UI components:
     ```ts
     stored.user.name = (stored.user.name || 'VEB Super Admin').replace(/academix|vibex/gi, 'VEB');
     stored.user.email = (stored.user.email || 'admin@veb.school').replace(/academix|vibex/gi, 'veb');
     stored.user.organizationName = (stored.user.organizationName || 'VEB Global Administration Hub').replace(/academix|vibex/gi, 'VEB');
     ```
2. **Reentrancy Guard on View Rendering**:
   * Prevent duplicate dashboard layouts during login and auth state transitions with an `isRenderingDashboard` reentrancy lock.
