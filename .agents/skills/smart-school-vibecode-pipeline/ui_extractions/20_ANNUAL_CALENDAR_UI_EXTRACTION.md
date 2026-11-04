# Module 20: Annual Calendar (2 Slugs) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 20: Annual Calendar (2 Slugs)`
- **Total Ingested Screenshots**: **2 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/20_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- **Annual Calendar**: Top criteria search (`Type *` dropdown, `Search` button, `+ Add` button). Bottom table `Calendar List`: Search, page size `50`, export suite. Columns: Date, Type, Description, Created By, Front Site, Action.
  - **Holiday Type**: Split 2-Column form (`Name *`, `Save`). Right table: Name, Action. Exact records: `Holiday`, `Vacation`, `Activity` (system types), `EVENTS`, `School Events` (custom types).

---

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `annual-calendar` (`media_1789157900581.png`)

- **Image File**: [`media_1789157900581.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789157900581.png)
- **Screen / Slug Name**: `annual-calendar`
- **Target Platform Route**: `/super-admin/calendar/annual-calendar`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Top criteria search (`Type *` dropdown, `Search` button, `+ Add` button). Bottom table `Calendar List`: Search, page size `50`, export suite. Columns: Date, Type, Description, Created By, Front Site, Action.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Annual Calendar` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Annual Calendar`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Annual Calendar List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: High-velocity operational layout pairing a persistent in-place creation/edit form card on the left with a real-time data grid on the right.
- **Zone 1 (Left Form Pane)**: 30% to 35% width card container with entity creation fields, file dropzone, required asterisks, and Save button.
- **Zone 2 (Right Table Pane)**: 65% to 70% width card container with global search, export tools, responsive data grid, and row actions.
- **Zone 3 (Row Action Strip)**: Action column on rightmost side of table containing View, Edit, Delete tactile buttons.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `SplitTwoColumnLayout`: High-level container component.
  - `MasterDetailFormCard`: High-level container component.
  - `EnterpriseDataTable`: High-level container component.
  - `DocumentDropzoneBox`: High-level container component.
  - `RowActionButtonGroup`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/master-detail/`
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

### Screen 02: `holiday-type` (`media_1789157913244.png`)

- **Image File**: [`media_1789157913244.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789157913244.png)
- **Screen / Slug Name**: `holiday-type`
- **Target Platform Route**: `/super-admin/calendar/holiday-type`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Split 2-Column form (`Name *`, `Save`). Right table: Name, Action. Exact records: `Holiday`, `Vacation`, `Activity` (system types), `EVENTS`, `School Events` (custom types).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Holiday Type` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Holiday Type`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Holiday Type List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: High-velocity operational layout pairing a persistent in-place creation/edit form card on the left with a real-time data grid on the right.
- **Zone 1 (Left Form Pane)**: 30% to 35% width card container with entity creation fields, file dropzone, required asterisks, and Save button.
- **Zone 2 (Right Table Pane)**: 65% to 70% width card container with global search, export tools, responsive data grid, and row actions.
- **Zone 3 (Row Action Strip)**: Action column on rightmost side of table containing View, Edit, Delete tactile buttons.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `SplitTwoColumnLayout`: High-level container component.
  - `MasterDetailFormCard`: High-level container component.
  - `EnterpriseDataTable`: High-level container component.
  - `DocumentDropzoneBox`: High-level container component.
  - `RowActionButtonGroup`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/master-detail/`
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

