# Super Admin Left Sidebar Navigation Architecture & Ordering Specification
## Smart School Enterprise Platform (Primary Navigation Component)

---

### Overview & Visual Layout Standards

This specification records the **exact vertical ordering, icon token mappings, header metadata, and behavior rules** for the primary **Left Sidebar** of the Super Admin Control Center.

- **Component Name**: `SuperAdminSidebar`
- **Surface Design**: Liquid Glass Brutalist surface with tactile interactive active pill.
- **Top Header Height**: 64px fixed header.
- **Width States**:
  - Expanded: `260px`
  - Collapsed / Mini: `72px` (Icon-only mode with floating liquid glass tooltips)
  - Mobile Drawer: `100vw` overlay with slide-in animation.
- **Typography**: Ubuntu (`font-ubuntu` / `var(--font-ubuntu)`), Medium 500, size `14px`.
- **Icon Standard**: Google Material Symbols exclusively (`weight={400}`). **ZERO EMOJI POLICY**.

---

### 1. Sidebar Top Header Structure

The top of the left sidebar contains two critical persistent elements:

```
┌──────────────────────────────────────────────┐
│ Current Session: 2026-27                     │
├──────────────────────────────────────────────┤
│ Quick Links                             [⊞]  │
└──────────────────────────────────────────────┘
```

1. **Current Session Indicator**:
   - Label: `Current Session: 2026-27`
   - Data Source: Bound to institutional configuration (`academic.currentSession`).
   - Behavior: Read-only display in sidebar; editable only via `System Setting -> Session Setting`.
2. **Quick Links Launcher Bar**:
   - Label: `Quick Links`
   - Icon: Google Material Symbol `grid_view` / `apps` (3x3 grid icon).
   - Behavior: 1-click trigger that launches the full-screen / drawer **Mega-Menu Grid (34 Modules across 9 Domains)** as defined in `references/02_SUPER_ADMIN_SIDEBAR_NAVIGATION_TAXONOMY.md`.

---

### 2. The Authoritative 32-Item Vertical Sidebar Hierarchy

The left sidebar items are ordered in the following strict vertical sequence:

| # | Item Name | Google Material Symbol | Route Prefix | Sub-Items Count | Primary Domain |
|---|:---|:---|:---|:---:|:---|
| **01** | **Front Office** | `desk` / `support_agent` | `/super-admin/front-office` | 7 | Facility & Desk |
| **02** | **Student Information** | `person_search` / `group` | `/super-admin/student-info` | 9 | Student Lifecycle |
| **03** | **Fees Collection** | `payments` / `request_quote` | `/super-admin/fees` | 11 | Finance & Billing |
| **04** | **Online Course** | `ondemand_video` / `play_lesson`| `/super-admin/online-course` | 7 | Virtual Learning |
| **05** | **Behaviour Records** | `balance` / `gavel` | `/super-admin/behaviour` | 4 | Student Discipline |
| **06** | **Multi Branch** | `hub` / `domain` | `/super-admin/multi-branch` | 3 | Campus Governance |
| **07** | **Gmeet Live Classes** | `video_camera_front` | `/super-admin/gmeet` | 5 | Video Conferencing |
| **08** | **Zoom Live Classes** | `videocam` | `/super-admin/zoom` | 5 | Video Conferencing |
| **09** | **Income** | `attach_money` / `trending_up` | `/super-admin/income` | 3 | Accounts & POS |
| **10** | **Expenses** | `credit_card` / `trending_down`| `/super-admin/expenses` | 3 | Accounts & POS |
| **11** | **QR Code Attendance** | `qr_code_scanner` | `/super-admin/qr-attendance`| 2 | IoT Gate Ingress |
| **12** | **CBSE Examination** | `description` / `assignment` | `/super-admin/cbse-exam` | 8 | Board Academics |
| **13** | **Examinations** | `menu_book` / `quiz` | `/super-admin/examinations` | 9 | Term Assessments |
| **14** | **Attendance** | `event_available` / `calendar_today` | `/super-admin/attendance` | 3 | Daily Attendance |
| **15** | **Online Examinations** | `wifi` / `laptop_chromebook` | `/super-admin/online-exam` | 2 | CBT Assessments |
| **16** | **Academics** | `school` | `/super-admin/academics` | 8 | Core Curriculum |
| **17** | **Annual Calendar** | `calendar_month` | `/super-admin/calendar` | 2 | Master Schedule |
| **18** | **Lesson Plan** | `auto_stories` / `fact_check` | `/super-admin/lesson-plan` | 5 | Teaching Units |
| **19** | **Human Resource** | `badge` / `supervisor_account` | `/super-admin/human-resource` | 9 | Staff & Payroll |
| **20** | **Communicate** | `campaign` / `bullhorn` | `/super-admin/communicate` | 8 | Dispatch Broadcasts |
| **21** | **Download Center** | `cloud_download` / `download` | `/super-admin/download-center`| 4 | Digital Assets |
| **22** | **Homework** | `science` / `assignment_turned_in` | `/super-admin/homework` | 2 | Daily Assignments |
| **23** | **Library** | `local_library` / `auto_stories` | `/super-admin/library` | 4 | Media Circulation |
| **24** | **Inventory** | `inventory_2` / `package_2` | `/super-admin/inventory` | 6 | Warehouse Logistics|
| **25** | **Student CV** | `contact_page` / `badge` | `/super-admin/student-cv` | 2 | Graduate Portfolios|
| **26** | **Transport** | `directions_bus` | `/super-admin/transport` | 7 | Fleet Logistics |
| **27** | **Hostel** | `apartment` / `hotel` | `/super-admin/hostel` | 3 | Boarding Facilities|
| **28** | **Certificate** | `workspace_premium` / `verified` | `/super-admin/certificate` | 7 | Diplomas & Badges |
| **29** | **Front CMS** | `language` / `public` | `/super-admin/front-cms` | 7 | Public Web Portal |
| **30** | **Alumni** | `diversity_3` / `groups` | `/super-admin/alumni` | 2 | Graduate Network |
| **31** | **Reports** | `analytics` / `query_stats` | `/super-admin/reports` | 15 | Audit & Business BI|
| **32** | **System Setting** | `settings` / `tune` | `/super-admin/system-setting` | 23 | Master Platform Conf|

---

### 3. Interactive Accordion & Selection Physics

1. **State Persistence**:
   - Expanded parent state is persisted in `localStorage` (`sidebar_expanded_groups`) so the navigation state survives page refreshes.
2. **Active Item Highlight**:
   - The currently selected leaf node or active parent receives a tactile liquid glass pill style:
     - Background: `rgba(0, 0, 0, 0.06)` (Light Mode) or `rgba(255, 255, 255, 0.12)` (Dark Mode).
     - Accent Border: `2px solid #8E24AA` (Royal Amethyst Super Admin Token).
     - Font Weight: `600` Bold Ubuntu.
3. **Chevron Rotation**:
   - Right chevron icon (`chevron_right`) smoothly rotates 90 degrees down (`expand_more`) upon accordion expansion.
4. **Scroll Architecture**:
   - Sidebar content has an independent slim custom scrollbar (`overflow-y: auto`, `scrollbar-width: thin`).
   - Sticky top header (`Current Session` & `Quick Links`) remains fixed while the 32 items scroll underneath.
