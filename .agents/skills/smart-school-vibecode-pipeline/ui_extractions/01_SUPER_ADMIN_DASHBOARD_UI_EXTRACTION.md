# Module 01: Super Admin Command Center Dashboard (2 Screenshots) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 01: Super Admin Command Center Dashboard (2 Screenshots)`
- **Total Ingested Screenshots**: **2 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/01_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- **Top Header Bar**: Logo `SMART SCHOOL`, School Name `Mount Carmel School`, search box `Search By Student Name`, currency `USD`, flag `US`, session/branch switch, calendar icon, task checklist icon, notification bell `0`, WhatsApp icon, user profile avatar `Admin User`.
  - **6 Operational KPI Cards**: `Fees Awaiting Payment` (2/7 - light blue bar), `Staff Approved Leave` (1/3 - cyan bar), `Student Approved Leave` (3/10 - dark blue bar), `Converted Leads` (1/8 - red bar), `Staff Present Today` (0/9 - gray bar), `Student Present Today` (37/89 - amber bar).
  - **Monthly Financial & Operating Charts**:
    1. `Fees Collection & Expenses For September 2026`: Dual grouped bar chart (Green for Fees, Red for Expenses by Day 01 to 30).
    2. `Income - September 2026`: Semi-circular half-donut gauge chart (`Donation`, `Rent`, `Miscellaneous1`).
    3. `Fees Collection & Expenses For Session 2026-27`: Dual spline line curve (Green for Fees, Red for Expenses across session months: April through March).
    4. `Expense - September 2026`: Semi-circular half-donut gauge chart (`Stationery Purchase`, `Telephone Bill`, `Miscellaneous`, `Flower`).
  - **4 Operational Multi-Bar Progress Overviews**:
    1. `Fees Overview`: 3 UNPAID (42.86%), 2 PARTIAL (28.57%), 2 PAID (28.57%).
    2. `Enquiry Overview`: 6 ACTIVE (75%), 1 WON (12.5%), 1 PASSIVE (12.5%), 0 LOST (0%), 0 DEAD (0%).
    3. `Library Overview`: 10 DUE FOR RETURN, 3 RETURNED, ISSUED OUT OF (0%), 0 AVAILABLE OUT OF (0%).
    4. `Student Today Attendance`: 21 PRESENT (23.60%), 5 LATE (5.62%), 6 ABSENT (6.74%), 11 HALF DAY (12.36%).
  - **10 Tactical Headcount & Finance Counter Cards**: `Monthly Fees Collection` ($6,205.00), `Monthly Expenses` ($2,750.00), `Student` (89), `Student Head Count` (88), `Admin` (1), `Teacher` (4), `Accountant` (1), `Librarian` (1), `Receptionist` (1), `Super Admin` (1).

---

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `dashboard-top-metrics-and-charts` (`media_1789160127957.png`)

- **Image File**: [`media_1789160127957.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160127957.png)
- **Screen / Slug Name**: `dashboard-top-metrics-and-charts`
- **Target Platform Route**: `/admin/dashboard/dashboard-top-metrics-and-charts`
- **UI Layout Archetype**: **Archetype G: Multi-Metric Command Center Dashboard**

#### 1. Extracted Text Content

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Dashboard Top Metrics And Charts` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Dashboard Top Metrics And Charts`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Dashboard Top Metrics And Charts List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: Full-width executive command center featuring top KPI cards, multi-metric analytical charts, progress overviews, and bottom tactical counter cards.
- **Zone 1 (Top Header Bar)**: Full-width fixed bar (height 60px): Logo, School name, Search student input, Currency switcher, Session context, and User profile avatar.
- **Zone 2 (KPI Metric Strip)**: Full-width 6-column operational KPI status card row with progress indicators and status counts.
- **Zone 3 (Analytics Charts Grid)**: Dual 2-column analytics grid with grouped bar charts, donut gauges, and session spline trends.
- **Zone 4 (Operational Overviews)**: Dual 2-column operational progress bars (Fees, Enquiries, Library, Student Attendance).
- **Zone 5 (Tactile Counter Strip)**: Responsive 5-to-10 card grid displaying live departmental headcounts and finance balances.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `LiveTelemetryCard`: High-level container component.
  - `GroupedBarChart`: High-level container component.
  - `DonutGaugeChart`: High-level container component.
  - `SplineTrendChart`: High-level container component.
  - `MultiProgressBarOverview`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/dashboard/`
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

### Screen 02: `dashboard-bottom-overviews-and-counters` (`media_1789160136733.png`)

- **Image File**: [`media_1789160136733.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160136733.png)
- **Screen / Slug Name**: `dashboard-bottom-overviews-and-counters`
- **Target Platform Route**: `/admin/dashboard/dashboard-bottom-overviews-and-counters`
- **UI Layout Archetype**: **Archetype G: Multi-Metric Command Center Dashboard**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Multi-campus health matrix (Active Students, Staff Headcount, Revenue, Attendance %) with `Enter Branch Context` switcher.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Dashboard Bottom Overviews And Counters` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Dashboard Bottom Overviews And Counters`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Dashboard Bottom Overviews And Counters List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: Full-width executive command center featuring top KPI cards, multi-metric analytical charts, progress overviews, and bottom tactical counter cards.
- **Zone 1 (Top Header Bar)**: Full-width fixed bar (height 60px): Logo, School name, Search student input, Currency switcher, Session context, and User profile avatar.
- **Zone 2 (KPI Metric Strip)**: Full-width 6-column operational KPI status card row with progress indicators and status counts.
- **Zone 3 (Analytics Charts Grid)**: Dual 2-column analytics grid with grouped bar charts, donut gauges, and session spline trends.
- **Zone 4 (Operational Overviews)**: Dual 2-column operational progress bars (Fees, Enquiries, Library, Student Attendance).
- **Zone 5 (Tactile Counter Strip)**: Responsive 5-to-10 card grid displaying live departmental headcounts and finance balances.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `LiveTelemetryCard`: High-level container component.
  - `GroupedBarChart`: High-level container component.
  - `DonutGaugeChart`: High-level container component.
  - `SplineTrendChart`: High-level container component.
  - `MultiProgressBarOverview`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/dashboard/`
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

