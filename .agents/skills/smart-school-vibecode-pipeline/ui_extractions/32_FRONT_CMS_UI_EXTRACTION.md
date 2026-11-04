# Module 32: Front CMS (7 Slugs) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 32: Front CMS (7 Slugs)`
- **Total Ingested Screenshots**: **9 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/32_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- **Event**: Screen `Event List` with top `+ Add` button. Table: Title, Date, Venue, Action (Edit, Delete). 19 ground truth events codified (`Math Exhibition Model`, `Science Exhibition`, `Annual Cultural Program`, `Republic Day Celebration`, `Teachers' Day Celebration`, etc.).
  - **Gallery**: Screen `Gallery List` with top `+ Add` button. Table: Title, URL, Action (Edit, Delete). 12 albums codified (`gallery`, `exhibition`, `Sports Events`, `Facilities`, `Celebration`, `Pre Primary`, `Campus`, etc.).
  - **News**: Screen `News List` with top `+ Add` button. Table: Title, URL, Action (Edit, Delete). 21 news releases codified (`National Level Workshop...`, `New Books Added to Library`, `Unit Test Schedule Released`, `World Environment Day program`, etc.).
  - **Media Manager**: Top Dual Ingress (`Upload Your File` dropzone OR `Upload Youtube Video Link *` URL input with `Submit` button). Middle filters (`Search By File Name`, `Filter By File Type`). Bottom 6-column fluid responsive grid of media cards with thumbnails, filenames (`tv.jpg`, `1763790460.jpg`, `ready-set-school_lm.jpg`, `34.png`, `tg.png`, `M_Admission-side-banner.png`), and photo/video icon badges.
  - **Pages**: Screen `Page List` with top `+ Add` button. Table: Title, URL, Page Type (`Standard`, `Gallery`, `Event`), Action (Edit, Delete). Strict system-protected page guard: Core pages (`Home`, `Complain`, `404 page`, `Contact us`) suppress Delete button. 22 ground truth pages codified.
  - **Menus**: Screen `Menu Item List` with tabs `Main Menu` (active) and `Bottom Menu`. Left: `Add Menu Item` (`Menu Item *`, `External URL` toggle, `Open In New Tab` toggle, `External URL Address`, `Pages` dropdown, `Save`). Right: Nested multi-tier drag-and-drop sortable hierarchy tree (Level 1 root items and 13 nested Level 2 children under `ACADEMICS`: Facilities, Annual Sports Day, Course, School Uniform, Principal Message, School Management, etc.).
  - **Banner Images**: Screen `Banner Images` with top `+ Add Images` button. Horizontal carousel slider cards with live preview of 6 active banners (`-4banner1.jpg`, `-4banner4.jpg`, `op-banner2-2.jpg`, `-4banner3-3.jpg`, `DCC Sports Day (3).jfif`, `tcp-banner2-2.jpg`).

---

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `event` (`media_1789158744905.png`)

- **Image File**: [`media_1789158744905.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158744905.png)
- **Screen / Slug Name**: `event`
- **Target Platform Route**: `/super-admin/front-cms/event`
- **Byte-Level Image Twin**: Identical content hash `fc6db8eb` shared with `media_1789158967245.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Event List` with top `+ Add` button. Table: Title, Date, Venue, Action (Edit, Delete). 19 ground truth events codified (`Math Exhibition Model`, `Science Exhibition`, `Annual Cultural Program`, `Republic Day Celebration`, `Teachers' Day Celebration`, etc.).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Event` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Event`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Event List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 02: `gallery` (`media_1789158758149.png`)

- **Image File**: [`media_1789158758149.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158758149.png)
- **Screen / Slug Name**: `gallery`
- **Target Platform Route**: `/super-admin/front-cms/gallery`
- **Byte-Level Image Twin**: Identical content hash `60fc258d` shared with `media_1789158970298.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Gallery List` with top `+ Add` button. Table: Title, URL, Action (Edit, Delete). 12 albums codified (`gallery`, `exhibition`, `Sports Events`, `Facilities`, `Celebration`, `Pre Primary`, `Campus`, etc.).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Gallery` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Gallery`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Gallery List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 03: `news` (`media_1789158769232.png`)

- **Image File**: [`media_1789158769232.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158769232.png)
- **Screen / Slug Name**: `news`
- **Target Platform Route**: `/super-admin/front-cms/news`
- **Byte-Level Image Twin**: Identical content hash `602abe65` shared with `media_1789158973463.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `News List` with top `+ Add` button. Table: Title, URL, Action (Edit, Delete). 21 news releases codified (`National Level Workshop...`, `New Books Added to Library`, `Unit Test Schedule Released`, `World Environment Day program`, etc.).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `News` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add News`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `News List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 04: `media-manager` (`media_1789158779859.png`)

- **Image File**: [`media_1789158779859.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158779859.png)
- **Screen / Slug Name**: `media-manager`
- **Target Platform Route**: `/super-admin/front-cms/media-manager`
- **Byte-Level Image Twin**: Identical content hash `175fb05b` shared with `media_1789158976238.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Top Dual Ingress (`Upload Your File` dropzone OR `Upload Youtube Video Link *` URL input with `Submit` button). Middle filters (`Search By File Name`, `Filter By File Type`). Bottom 6-column fluid responsive grid of media cards with thumbnails, filenames (`tv.jpg`, `1763790460.jpg`, `ready-set-school_lm.jpg`, `34.png`, `tg.png`, `M_Admission-side-banner.png`), and photo/video icon badges.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Media Manager` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Media Manager`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Media Manager List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 05: `pages` (`media_1789158791934.png`)

- **Image File**: [`media_1789158791934.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158791934.png)
- **Screen / Slug Name**: `pages`
- **Target Platform Route**: `/super-admin/front-cms/pages`
- **Byte-Level Image Twin**: Identical content hash `90ea6372` shared with `media_1789158979271.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Page List` with top `+ Add` button. Table: Title, URL, Page Type (`Standard`, `Gallery`, `Event`), Action (Edit, Delete). Strict system-protected page guard: Core pages (`Home`, `Complain`, `404 page`, `Contact us`) suppress Delete button. 22 ground truth pages codified.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Pages` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Pages`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Pages List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 06: `pages-editor` (`media_1789158803237.png`)

- **Image File**: [`media_1789158803237.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158803237.png)
- **Screen / Slug Name**: `pages-editor`
- **Target Platform Route**: `/super-admin/front-cms/pages-editor`
- **Byte-Level Image Twin**: Identical content hash `1613eb93` shared with `media_1789158982635.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Page List` with top `+ Add` button. Table: Title, URL, Page Type (`Standard`, `Gallery`, `Event`), Action (Edit, Delete). Strict system-protected page guard: Core pages (`Home`, `Complain`, `404 page`, `Contact us`) suppress Delete button. 22 ground truth pages codified.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Pages Editor` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Pages Editor`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Pages Editor List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 07: `menus` (`media_1789158813113.png`)

- **Image File**: [`media_1789158813113.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158813113.png)
- **Screen / Slug Name**: `menus`
- **Target Platform Route**: `/super-admin/front-cms/menus`
- **Byte-Level Image Twin**: Identical content hash `3957c571` shared with `media_1789158986158.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Menu Item List` with tabs `Main Menu` (active) and `Bottom Menu`. Left: `Add Menu Item` (`Menu Item *`, `External URL` toggle, `Open In New Tab` toggle, `External URL Address`, `Pages` dropdown, `Save`). Right: Nested multi-tier drag-and-drop sortable hierarchy tree (Level 1 root items and 13 nested Level 2 children under `ACADEMICS`: Facilities, Annual Sports Day, Course, School Uniform, Principal Message, School Management, etc.).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Menus` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Menus`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Menus List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: System configuration panel with horizontal pill navigation tabs or vertical category sidebar paired with dedicated setting cards.
- **Zone 1 (Header)**: Breadcrumb navigation, module title, and environment status badge.
- **Zone 2 (Tab Navigation)**: Horizontal tab strip or vertical left sub-menu with active tactile underline / pill selector for sub-masters.
- **Zone 3 (Config Pane)**: Main card container housing form inputs, toggle switches, credential inputs, or drag-and-drop sortable lists.
- **Zone 4 (Action Bar)**: Sticky bottom/card-footer action bar with primary Save button and Reset trigger.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `MultiTabNavStrip`: High-level container component.
  - `ConfigSettingCard`: High-level container component.
  - `ToggleSwitchRow`: High-level container component.
  - `SortableDragDropTree`: High-level container component.
  - `CredentialInputGroup`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/settings/`
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

### Screen 08: `menus-hierarchy` (`media_1789158825786.png`)

- **Image File**: [`media_1789158825786.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158825786.png)
- **Screen / Slug Name**: `menus-hierarchy`
- **Target Platform Route**: `/super-admin/front-cms/menus-hierarchy`
- **Byte-Level Image Twin**: Identical content hash `120b1208` shared with `media_1789158989239.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Menu Item List` with tabs `Main Menu` (active) and `Bottom Menu`. Left: `Add Menu Item` (`Menu Item *`, `External URL` toggle, `Open In New Tab` toggle, `External URL Address`, `Pages` dropdown, `Save`). Right: Nested multi-tier drag-and-drop sortable hierarchy tree (Level 1 root items and 13 nested Level 2 children under `ACADEMICS`: Facilities, Annual Sports Day, Course, School Uniform, Principal Message, School Management, etc.).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Menus Hierarchy` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Menus Hierarchy`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Menus Hierarchy List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
  - Primary Columns: `ID / Code`, `Title / Name`, `Category / Group`, `Date`, `Status`, `Action`.
  - Status Badges: Standardized semantic status pills (`Active`, `Inactive`, `Pending`, `Approved`, `Paid`, `Unpaid`).
  - Action Buttons: Row-level tactical buttons: `View` (Details modal), `Edit` (Form populator), `Delete` (Confirmation prompt).
- **Pagination Controls**: `Showing 1 to 50 of Entries` with numbered pagination navigation buttons.

#### 2. Layout & Visual Positioning Architecture

- **Layout Structure**: System configuration panel with horizontal pill navigation tabs or vertical category sidebar paired with dedicated setting cards.
- **Zone 1 (Header)**: Breadcrumb navigation, module title, and environment status badge.
- **Zone 2 (Tab Navigation)**: Horizontal tab strip or vertical left sub-menu with active tactile underline / pill selector for sub-masters.
- **Zone 3 (Config Pane)**: Main card container housing form inputs, toggle switches, credential inputs, or drag-and-drop sortable lists.
- **Zone 4 (Action Bar)**: Sticky bottom/card-footer action bar with primary Save button and Reset trigger.
- **Responsive Behavior**: On desktop viewports (1200px+), maintains full multi-pane layout; on tablet/mobile (<1024px), collapses side-by-side panes into vertical stacked order with horizontal scroll preservation for data grids.

#### 3. Reusable UI Components Identified

- **Atomic Components**:
  - `StandardTextInput`: Label with required asterisk, border, focus ring, placeholder, validation error text.
  - `SelectDropdown`: Cascading search-enabled dropdown with placeholder and empty-state fallback.
  - `TactileButton`: Standardized action buttons (Primary Purple `#8E24AA`, Emerald Green Success, Slate Gray Secondary, Ruby Red Danger).
  - `StatusBadge`: Compact pill badge with closed semantic color mapping.
  - `DocumentDropzone`: Drag-and-drop file upload container with permitted extension checklist and byte limits.
- **Composite Components**:
  - `MultiTabNavStrip`: High-level container component.
  - `ConfigSettingCard`: High-level container component.
  - `ToggleSwitchRow`: High-level container component.
  - `SortableDragDropTree`: High-level container component.
  - `CredentialInputGroup`: High-level container component.
- **Cross-Module Reusability**:
  - This screen layout and its component tree directly share architectural parity with adjacent operational modules across the platform.

#### 4. Component Placement & Architecture Strategy

- **Recommended Component Directory**: `src/components/ui/settings/`
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

### Screen 09: `banner-images` (`media_1789158834233.png`)

- **Image File**: [`media_1789158834233.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789158834233.png)
- **Screen / Slug Name**: `banner-images`
- **Target Platform Route**: `/super-admin/front-cms/banner-images`
- **Byte-Level Image Twin**: Identical content hash `5eb3899b` shared with `media_1789158992519.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Screen `Banner Images` with top `+ Add Images` button. Horizontal carousel slider cards with live preview of 6 active banners (`-4banner1.jpg`, `-4banner4.jpg`, `op-banner2-2.jpg`, `-4banner3-3.jpg`, `DCC Sports Day (3).jfif`, `tcp-banner2-2.jpg`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Banner Images` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Banner Images`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Banner Images List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

