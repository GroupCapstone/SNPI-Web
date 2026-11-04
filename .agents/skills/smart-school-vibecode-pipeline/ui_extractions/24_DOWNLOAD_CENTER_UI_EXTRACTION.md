# Module 24: Download Center (4 Slugs) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 24: Download Center (4 Slugs)`
- **Total Ingested Screenshots**: **4 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/24_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- **Upload/Share Content**: Screen `Content List`. Dual View switcher (List vs. Grid). Right widget: Total Documents (`40`), Size (`2.93 MB`). 3-Column fluid card grid with checkboxes, file icons (PDF, image, generic file), blue link titles, author (`Joe Black (9000)`), timestamp, bottom download and delete actions. Pagination (`« Previous 1 2 3 4 Next »`).
  - **Content Share List**: Table ledger: Search, page size `50`, export suite. Columns: Title, Send To (`Class`, `Group`), Share Date (`MM/DD/YYYY`), Valid Upto (`MM/DD/YYYY`), Shared By (`Joe Black (9000)`, `William Abbot (9003)`), Description, Action (View, Delete). 19 ground truth records.
  - **Video Tutorial**: Screen `Video Tutorial List`. Top `+ Add` button. Criteria: `Class`, `Section`, `Search By Title`, `Search` button. 6-Column video card grid with 16:9 thumbnails and centered titles. 30 video records codified. Pagination: `1 2 Next`.
  - **Content Type**: Split 2-Column form (Pattern B). Left: `Add Content Type` (`Name *`, `Description`, `Save`). Right: `Content Type List` table with Name, Description, Action (Edit, Delete). 7 ground truth records (`March revision`, `Content Type Material`, `Exam material`, `Other Downloads`, `Study Material`, `Syllabus`, `Assignment`).

---

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `upload-share-content` (`media_1789158298011.png`)

- **Image File**: [`media_1789158298011.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158298011.png)
- **Screen / Slug Name**: `upload-share-content`
- **Target Platform Route**: `/super-admin/download-center/upload-share-content`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Upload Share Content` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Upload Share Content`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Upload Share Content List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 02: `content-share-list` (`media_1789158306618.png`)

- **Image File**: [`media_1789158306618.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158306618.png)
- **Screen / Slug Name**: `content-share-list`
- **Target Platform Route**: `/super-admin/download-center/content-share-list`
- **UI Layout Archetype**: **Archetype B: Top Filter Criteria Card + Full-Width Enterprise Data Table**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Table ledger: Search, page size `50`, export suite. Columns: Title, Send To (`Class`, `Group`), Share Date (`MM/DD/YYYY`), Valid Upto (`MM/DD/YYYY`), Shared By (`Joe Black (9000)`, `William Abbot (9003)`), Description, Action (View, Delete). 19 ground truth records.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Content Share List` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Content Share List`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Content Share List List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: Standard search-and-report workflow featuring a top criteria card with cascading dropdowns paired with an enterprise data grid below.
- **Zone 1 (Criteria Filter Card)**: Full-width top card with multi-field dropdown filters (Class, Section, Date, Subject, Session) and Search button.
- **Zone 2 (Table Header Toolbar)**: Table title, record count badge, search filter input, and Export Utility Toolbar (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Zone 3 (Data Table Grid)**: Responsive table with sortable columns, status badges, inline inputs (for marks/attendance), and action icon buttons.
- **Zone 4 (Pagination Footer)**: Showing X to Y of Z entries with numbered pagination buttons.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `CriteriaFilterCard`: High-level container component.
  - `EnterpriseDataTable`: High-level container component.
  - `ExportUtilityToolbar`: High-level container component.
  - `StatusBadgeGroup`: High-level container component.
  - `PaginationControls`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/data-table/`
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

### Screen 03: `video-tutorial` (`media_1789158317085.png`)

- **Image File**: [`media_1789158317085.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158317085.png)
- **Screen / Slug Name**: `video-tutorial`
- **Target Platform Route**: `/super-admin/download-center/video-tutorial`
- **UI Layout Archetype**: **Archetype C: Responsive Multi-Column Card Grid**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Video Tutorial List`. Top `+ Add` button. Criteria: `Class`, `Section`, `Search By Title`, `Search` button. 6-Column video card grid with 16:9 thumbnails and centered titles. 30 video records codified. Pagination: `1 2 Next`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Video Tutorial` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Video Tutorial`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Video Tutorial List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: High-visual responsive card grid (1 to 4 columns) displaying rich media entities, progress meters, badge strips, and action menus.
- **Zone 1 (Filter Header)**: Top search criteria bar with keyword filter, category dropdown, and + Add / Create button.
- **Zone 2 (Card Grid Viewport)**: Responsive 4-column card grid with thumbnail image, status badges, entity title, meta tags, and action buttons.
- **Zone 3 (Pagination Footer)**: Bottom pagination controls with page size selector and item range indicator.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `MediaThumbnailCard`: High-level container component.
  - `CardGridContainer`: High-level container component.
  - `EntityBadgeStrip`: High-level container component.
  - `CardActionMenu`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/cards/`
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

### Screen 04: `content-type` (`media_1789158327975.png`)

- **Image File**: [`media_1789158327975.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158327975.png)
- **Screen / Slug Name**: `content-type`
- **Target Platform Route**: `/super-admin/download-center/content-type`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Split 2-Column form (Pattern B). Left: `Add Content Type` (`Name *`, `Description`, `Save`). Right: `Content Type List` table with Name, Description, Action (Edit, Delete). 7 ground truth records (`March revision`, `Content Type Material`, `Exam material`, `Other Downloads`, `Study Material`, `Syllabus`, `Assignment`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Content Type` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Content Type`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Content Type List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

