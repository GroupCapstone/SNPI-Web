# Master UI Component Design System & Panel Summary Catalog
## Smart School Enterprise Platform (Autonomous Vibecoding Support Skill)

---

### 1. Executive Architecture Summary

This document establishes the authoritative UI Component Design System, Layout Positioning Rules, and Master Panel Summary for the **Smart School Enterprise Platform**.

It synthesizes ground-truth visual data extracted from all **273 production screenshots** across all **35 functional modules**. Autonomous AI agents and developers MUST consult this catalog when designing, scaffolding, or refactoring user interfaces to ensure 100% architectural consistency, component reusability, and visual fidelity.

- **Permanent Raw Screenshot Repository**:
  [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/) (273 Files)
- **Master Screen Extraction Ledger**:
  [`references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md)
- **Per-Module UI Extraction Blueprints**:
  [`ui_extractions/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/ui_extractions/) (34 Module Specs)

---

### 2. The 7 Core Architectural Layout Archetypes

Every screen across the platform belongs strictly to one of the following 7 standardized Layout Archetypes:

#### Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)
- **Visual Ratio**: Left Form Pane (30% to 35% width) paired with Right Data Table Pane (65% to 70% width).
- **Core Workflow**: Enables rapid, in-place entity creation and modification without opening modal overlays or navigating away from the ledger.
- **Used In**:
  - `Front Office`: Phone Call Log, Postal Dispatch, Postal Receive, Complain
  - `Income`: Add Income, Income Head
  - `Expenses`: Add Expense, Expense Head
  - `Fees Collection`: Fees Master, Fees Group, Fees Type, Fees Discount
  - `Academics`: Class, Sections, Subjects, Subject Group
  - `Inventory`: Item Stock, Item Category, Item Store, Item Supplier
  - `Hostel`: Hostel Rooms, Room Type, Hostel
  - `Human Resource`: Leave Type, Department, Designation

#### Archetype B: Top Filter Criteria Card + Full-Width Enterprise Data Table
- **Visual Ratio**: Top Criteria Filter Card (100% width) paired with Full-Width Data Table (100% width) below.
- **Core Workflow**: Multi-tier search, query filtering, bulk marking, and reporting.
- **Used In**:
  - `Student Information`: Student Details, Disabled Students, Multi Class Student
  - `Fees Collection`: Collect Fees, Offline Bank Payments, Search Due Fees
  - `Examinations`: Exam Schedule, Exam Result, Exam Marks Entry
  - `Attendance`: Student Attendance, Approve Leave, Attendance By Date
  - `Human Resource`: Staff Directory, Staff Attendance, Payroll
  - `Transport`: Student Transport Fees
  - `Reports`: All 15 reporting domains

#### Archetype C: Responsive Multi-Column Media Card Grid
- **Visual Ratio**: 1-to-4 Column Responsive CSS Grid (1 col on mobile, 2 col on tablet, 4 col on desktop).
- **Core Workflow**: Browsing media-rich entities, online courses, staff profile cards, and video libraries.
- **Used In**:
  - `Online Course`: Course catalog with media thumbnails, progress meters, and student enrollment counts
  - `Download Center`: Video Tutorial gallery with 16:9 thumbnails and play duration
  - `Human Resource`: Staff Directory card view with profile photos, role badges, and emergency contact
  - `Front CMS`: Media Manager photo and video gallery

#### Archetype D: Multi-Tab Horizontal Master Configuration Layout
- **Visual Ratio**: Horizontal Tab Navigation Strip or Left Category Sub-Menu (20% width) paired with Content Panel (80% width).
- **Core Workflow**: Deep configuration of system parameters, notification gateways, and sub-masters.
- **Used In**:
  - `Front Office`: Setup Front Office (Purpose, Complaint Type, Source, Reference)
  - `System Setting`: General Setting (14 sub-tabs), Notification Setting, SMS Setting, Payment Methods, Roles & Permissions, Languages, Currency, Modules, Custom Fields, System Fields
  - `Examinations`: Marks Grade, Marks Division
  - `CBSE Examination`: Setting (Assessment, Term, Category, Grade)

#### Archetype E: Visual Canvas Designer & Layout Builder
- **Visual Ratio**: Left Property Inspector (30% width) paired with Live Millimeter Preview Canvas (70% width).
- **Core Workflow**: Drag-and-drop visual composition of printable credentials, hall tickets, and marksheets.
- **Used In**:
  - `Examinations`: Design Admit Card, Design Marksheet
  - `Certificate`: Student Certificate, Student ID Card, Staff ID Card
  - `Online Course`: Certificate Template Designer

#### Archetype F: Full-Screen Universal Navigation Megamenu Drawer
- **Visual Ratio**: 5-Column Full-Screen Overlay Grid dividing 34 ERP modules into 9 functional domains.
- **Core Workflow**: Instant global platform navigation accessible from anywhere via the 3x3 grid header icon.
- **Used In**:
  - `Super Admin Navigation`: Quick Links Universal Megamenu Drawer

#### Archetype G: Multi-Metric Command Center Dashboard
- **Visual Ratio**: Full-Width Multi-Tier Executive Grid: Top KPI Strip (6 cards), Analytics Charts (4 charts), Operational Progress Overviews (4 cards), and Headcount Counters (10 cards).
- **Core Workflow**: Executive real-time telemetry, institutional health monitoring, and emergency status broadcast.
- **Used In**:
  - `Super Admin Portal`: Command Center Dashboard

---

### 3. Reusable UI Component Taxonomy & Placement Directory

All reusable components are organized within `src/components/ui/` by functional layer:

```
src/components/ui/
├── atomic/                         # Base primitive inputs and controls
│   ├── StandardTextInput.tsx       # Text, email, number inputs with label and required asterisk
│   ├── SelectDropdown.tsx          # Single and multi-select search dropdowns
│   ├── DatePickerInput.tsx         # Standardized date and date-range pickers
│   ├── TimePickerInput.tsx         # Time selection input (12h/24h)
│   ├── TactileButton.tsx           # Standardized buttons with semantic colors and tactile press
│   ├── StatusBadge.tsx             # Standardized status pills (Unpaid, Paid, Pending, Active)
│   ├── ToggleSwitch.tsx            # Binary boolean feature toggle
│   └── DocumentDropzone.tsx        # File attachment uploader with whitelist and size enforcement
│
├── composite/                      # Reusable multi-element containers
│   ├── CriteriaFilterCard.tsx      # Top criteria card with cascading filters and Search button
│   ├── EnterpriseDataTable.tsx     # Full-featured data grid with search, export, pagination
│   ├── ExportUtilityToolbar.tsx    # Standardized Copy, Excel, CSV, PDF, Print toolbar
│   ├── SplitTwoColumnLayout.tsx    # Two-pane container (Form on Left / Table on Right)
│   ├── EntityModalForm.tsx         # Modal dialog container for creating/editing records
│   ├── MultiTabNavStrip.tsx        # Horizontal pill and underline tab bar
│   ├── LiveTelemetryCard.tsx       # KPI stat cards with count, bar, and subtext
│   └── DynamicAddRowTable.tsx      # Multi-row dynamic array input with + Add More button
│
├── specialized/                    # Domain-specific complex components
│   ├── VisualCanvasDesigner.tsx    # Drag-and-drop canvas for certificates and marksheets
│   ├── DragDropSortableTree.tsx    # Sortable nested hierarchy tree for menus and categories
│   ├── QrCameraScanner.tsx         # Optical WebRTC scanner for turnstiles and badge attendance
│   └── MegamenuDirectoryGrid.tsx   # 5-column sitemap directory drawer
```

---

### 4. Master Module & Panel Summary Directory

| Module # | Module Name | Primary Layout Archetype | Total Screens / Slugs | Ingested Images |
| :--- | :--- | :--- | :--- | :--- |
| **01** | Super Admin Command Center Dashboard | Archetype G (Multi-Metric Dashboard) | 1 Dashboard View | 2 Images |
| **02** | Quick Links Navigation Megamenu | Archetype F (Universal Megamenu Drawer) | 1 Drawer View (34 Modules) | 2 Images |
| **03** | Super Admin Left Sidebar Architecture | Archetype F / Navigation Rail | 32 Accordion Items | Ground Truth Mapped |
| **04** | Front Office | Archetypes A, B, D | 7 Slugs | 7 Images |
| **05** | Student Information | Archetype B (Criteria + Data Grid) | 9 Slugs | 9 Images |
| **06** | Fees Collection | Archetypes A, B (Financial Hub) | 11 Slugs | 7 Images |
| **07** | Online Course (LMS) | Archetype C (Media Card Grid) | 7 Slugs | 6 Images |
| **08** | Behaviour Records | Archetypes A, B (Discipline Engine) | 4 Slugs | 3 Images |
| **09** | Multi Branch | Archetypes B, G (Campus Federation) | 3 Slugs | 3 Images |
| **10** | Gmeet Live Classes | Archetypes B, C (Virtual Meet) | 5 Slugs | 4 Images |
| **11** | Zoom Live Classes | Archetypes B, C (Video Telephony) | 5 Slugs | 4 Images |
| **12** | Income | Archetype A (Split 2-Column Revenue) | 3 Slugs | 3 Images |
| **13** | Expenses | Archetype A (Split 2-Column Expenditure) | 3 Slugs | 4 Images |
| **14** | QR Code Attendance | Archetype B (IoT Gate Ingress) | 2 Slugs | 2 Images |
| **15** | CBSE Examination | Archetypes B, D, E (Board Assessment) | 8 Slugs | 9 Images |
| **16** | Examinations | Archetypes B, E (Universal Exams) | 9 Slugs | 48 Images |
| **17** | Attendance | Archetype B (Bulk Daily Attendance) | 3 Slugs | 3 Images |
| **18** | Online Examinations (CBT) | Archetypes B, D (Computer Assessment) | 2 Slugs | 8 Images |
| **19** | Academics | Archetypes A, B (Timetable & Promotion) | 8 Slugs | 16 Images |
| **20** | Annual Calendar | Archetype B (Institutional Events) | 2 Slugs | 2 Images |
| **21** | Lesson Plan | Archetypes B, D (Curriculum Progress) | 5 Slugs | 5 Images |
| **22** | Human Resource | Archetypes B, C (Staff & Payroll) | 10 Slugs | 10 Images |
| **23** | Communicate | Archetypes A, B (Omnichannel Dispatch) | 8 Slugs | 9 Images |
| **24** | Download Center | Archetypes A, C (Digital Assets) | 4 Slugs | 4 Images |
| **25** | Homework | Archetype B (Task Evaluation) | 2 Slugs | 2 Images |
| **26** | Library | Archetypes A, B (Circulation Desk) | 4 Slugs | 4 Images |
| **27** | Inventory | Archetypes A, B (Logistics & Stock) | 6 Slugs | 6 Images |
| **28** | Student CV | Archetype B (Portfolio Generation) | 2 Slugs | 2 Images |
| **29** | Transport | Archetypes A, B (Fleet Logistics) | 7 Slugs | 8 Images |
| **30** | Hostel | Archetype A (Dormitory Management) | 3 Slugs | 3 Images |
| **31** | Certificate | Archetypes B, E (Credential Designer) | 7 Slugs | 7 Images |
| **32** | Front CMS | Archetypes A, C, D (Website Content) | 7 Slugs | 9 Images |
| **33** | Alumni | Archetypes B, C (Graduate Network) | 2 Slugs | 5 Images |
| **34** | Reports | Archetype B (Enterprise Analytics) | 15 Reporting Areas | 32 Images |
| **35** | System Setting | Archetype D (Platform Governance) | 25 Slugs | 25 Images |
| **36** | Super Admin Login & Sticky Workflow | Archetype G (Command Center & Sticky Shell) | 1 Ingress Sequence & 4-Tier Dashboard | Ground Truth Mapped |
| **37** | Super Admin Master Menu Taxonomy | All Archetypes (Master Navigation Hierarchy) | 32 Menus, 180+ Slugs, 5 Header Controls | Ground Truth Mapped |

**Total Modules Formally Codified**: **37 Modules** across **273 Images**.

---

### 5. Vibecoding Directives for Autonomous UI Engineering

1. **Directive 01 (Strict Zero-Emoji Policy)**: Never use emojis, Unicode icons, or playful symbols in UI code, specifications, or buttons. Use official Google Material Symbols exclusively (`search`, `add`, `edit`, `delete`, `file_download`, `print`, `visibility`).
2. **Directive 02 (Closed Semantic Color Tokens)**:
   - Primary Accent: Royal Amethyst Purple (`#8E24AA`)
   - Success / Positive: Emerald Green (`#2E7D32` / `#4CAF50`)
   - Danger / Overdue: Ruby Red (`#C62828` / `#F44336`)
   - Warning / Caution: Amber (`#F57F17` / `#FF9800`)
   - Info / Neutral: Slate Blue (`#1565C0` / `#2196F3`)
   - Surface Canvas: Crisp White (`#FFFFFF`) with Pale Cool Gray Borders (`#E0E0E0`).
3. **Directive 03 (Mandatory Export Toolbar on Data Grids)**: Every enterprise data grid MUST integrate the 6-tool export strip (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
4. **Directive 04 (Multi-Tenant Header Context)**: All data queries must automatically attach `X-Branch-ID` headers to align with PostgreSQL Row-Level Security.
5. **Directive 05 (High-Throughput Ingress Asynchrony)**: Forms initiating intensive batch processing (bulk SMS, mass promotion, exam marks publication) must display immediate optimistic feedback while processing asynchronously.
