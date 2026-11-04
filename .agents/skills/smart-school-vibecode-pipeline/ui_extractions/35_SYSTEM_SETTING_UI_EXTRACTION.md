# Module 35: System Setting (25 Slugs) - UI Component & Screen Layout Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 35: System Setting (25 Slugs)`
- **Total Ingested Screenshots**: **25 Images**
- **Permanent Raw Media Directory**: [`MEDIA/screenshots/`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/)
- **Authoritative CRUD Reference**: [`references/35_...`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/)

### Summary of Extracted Features & ground Truth

- **General Setting**: Two-pane layout. Left internal navigation menu (14 items: `General Setting` [active], `Logo`, `Login Page Background`, `Backend Theme`, `Mobile App`, `Student / Guardian Panel`, `Fees`, `ID Auto Generation`, `Attendance Type`, `Google Drive Setting`, `Whatsapp Settings`, `Chat`, `Maintenance`, `Miscellaneous`). Right card with soft blue alert: `Note: After saving General Setting please once logout then relogin so changes will be come in effect.`. Fields: School Name * (`Mount Carmel School`), School Code (`ACT-467438`), Address * (`25 Kings Street, CA`), Phone * (`89562423934`), Email * (`mountcarmelmailtest@gmail.com`), Academic Session (`Session *`: `2026-27`, `Session Start Month *`: `April`), Date Time (`Date Format *`: `mm/dd/yyyy`, `Timezone *`: `(GMT+05:30) Asia, Kolkata`, `Start Day Of Week *`: `Monday`), Currency (`Currency Format *`: `1,23,45,678.00`), File Upload Path (`Base Url *`: `https://demo.smart-school.in/`, `File Upload Path *`: `/var/www/demo.smart-school.inXglIP7Dx5oz7Mw/public_h`), Action button `Save` (solid purple `#8E24AA`). Copyright `© 2026 Mount Carmel School`.
  - **Session Setting**: Split 2-Column layout. Left card `Add Session`: `Session *` text input, `Save` button. Right card `Session List`: Soft blue alert `Note: Changing the session name format may cause issues on some pages or features, so it is recommended not to change the session name format.`. Quick Search, 50 rows/page, export suite. Columns: Session, Status, Action. 14 sessions codified: `2016-17`, `2017-18`, `2018-19`, `2019-20`, `2020-21`, `2021-22`, `2022-23`, `2023-24`, `2024-25`, `2025-26`, `2026-27` (green badge `Active`), `2027-28`, `2028-29`, `2029-30`. Footer: `Showing 1 to 14 of 14 entries`.
  - **Whatsapp Messaging Setting**: Horizontal tabs `Meta WhatsApp Official` (active) and `Twilio`. Form: `Access Token *` (`yyyyyy`), `Registered Phone Number *` (`878979798`), `Language *` (`en`), `Status *` (Dropdown: `Enabled`). Right branding: Meta logo with link to `https://business.facebook.com/`. Action button `Save` (purple `#8E24AA`).
  - **SMS Setting**: Horizontal tab strip of 12 aggregators: `Clickatell Sms Gateway` (active), `Twilio SMS Gateway`, `MSG91`, `Text Local`, `SMS Country`, `Bulk SMS`, `Mobi Reach`, `Nexmo`, `AfricasTalking`, `SMS Egypt`, `SMS Gateway Hub`, `Custom SMS Gateway`. Clickatell form: `Clickatell Username *`, `Clickatell Password *`, `API Key *`, `Status *` (Dropdown: `Select`). Right branding: Clickatell logo with link `https://www.clickatell.com`. Action button `Save` (purple `#8E24AA`).
  - **Email Setting**: Single configuration desk. Fields: `Email Engine` (`SMTP`), `Email` (`no-replytest@webfeb.com`), `SMTP Username` (`9a3279001@smtp-brevo.com`), `SMTP Password` (masked), `SMTP Server` (`smtp-relay.brevo.com`), `SMTP Port` (`587`), `SMTP Security` (`TLS`), `SMTP Auth` (`ON`). Action button `Save` (`#8E24AA`).
  - **Print Header Footer**: 6 Document Tabs (`Fees Receipt` [active], `Payslip`, `Online Admission Receipt`, `Online Exam`, `Email`, `General Purpose`). Fees Receipt Controls: `Header Image (2230px X 300px) *` dropzone and live banner preview (Logo `SMART SCHOOL`, `Your School Name Here`, contact address, phone, email, website, and black ribbon strip `Fees Receipt`), `Footer Content` rich text WYSIWYG editor (`This receipt is computer generated hence no signature is required.`). Action button `Save` (`#8E24AA`).
  - **Thermal Print**: POS thermal receipt setup. Fields: `Thermal Print *` (Toggle Off), `School Name *` (`Mount Carmel School`), `Address` (`25 Kings Street, CA <br> 89562423934 <br> mountcarmelmailtest@gmail.com`), `Footer Text` (`This receipt is computer generated hence no signature is required.`). Action button `Save` (`#8E24AA`).
  - **Front CMS Setting**: Public website control plane. Left Form: `Front CMS` (Toggle ON), `Sidebar` (Toggle OFF), `Language RTL Text Mode` (Toggle OFF), `Sidebar Option` checkboxes (`[x] News`, `[x] Complain`), `Language` (`English`), `Logo (369px X 76px)` image preview, `Favicon (32px X 32px)` image preview, `Footer Text` (`© Mount Carmel School 2025 All rights reserved`), `Cookie Consent` textarea, `Google Analytics` code script editor. Right Social Channels (8 platforms): `WhatsApp URL`, `Facebook URL`, `Twitter URL`, `Youtube URL`, `Google Plus`, `Linkedin URL`, `Instagram URL`, `Pinterest URL`. Bottom: `Current Theme` visual responsive theme gallery. Action button `Save` (`#8E24AA`).
  - **Roles Permissions**: Split 2-Column layout. Left card `Role`: `Name *`, `Save` button. Right card `Role List`: Quick Search, 50 rows/page, export suite. Table: `Role`, `Type`, `Action`. 6 System Roles codified: `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist` (each with purple tag `Assign Permissions` and purple pencil `Edit`), and `Super Admin` (protected system master role).
  - **Backup Restore**: Multi-card layout. Left card `Backup History`: `+ Create Backup` button, table of 12 real `.sql` snapshot files (`db_ver_7.1.0_...` to `db_ver_7.2.0_...`) with 3 action buttons per file: green `Download`, yellow `Restore`, red `Delete`. Top right card `Upload From Local Directory`: drag and drop dropzone + purple `Upload` button. Bottom right card `Cron Secret Key`: masked key with eye icon and purple `Regenerate` button.
  - **Languages**: Internationalization table with soft orange warning alert (`/application/language/English/app_files/system_lang.php`), `+ Add` button. Table columns: `#`, `Language` (with national flag), `Short Code`, editable `Country Code`, `Status` badge (`Active` on English), `Active` radio button, `Is Rtl` checkbox, `Action` toggle switch. Codified 17 languages (English active default; Arabic and Afrikaans RTL).
  - **Currencies**: Universal exchange ledger. Columns: `#`, `Currency`, `Short Code`, editable `Currency Symbol` input, editable `Conversion Rate` input, `Base Currency`, `Active` radio, `Enabled` toggle switch. Codified 18 major ISO currencies (`AED`, `AFN`, `ALL`, `AMD`, `ANG`, `AOA`, `ARS`, `AUD`, `AWG`, `AZN`, `BAM`, `BDT`, `BGN`, `BHD`, `BIF`, `BMD`, `BND`, `BOB`).
  - **Addons**: Enterprise module hub. Top `Upload From Local Directory` dropzone (supports `.zip`) + purple `Upload` button. 3-Column fluid grid of 11 installed add-ons with versions, descriptions, and red `Uninstall` buttons: `WhatsApp Messaging` (v1.0), `Thermal Print` (v2.0), `Quick Fees Create` (v2.0), `QR Code Attendance` (v3.0), `CBSE Examination` (v4.0), `Two Factor Authentication` (v4.0), `Multi Branch` (v4.0), `Behaviour Records` (v4.0), `Online Course` (v5.0), `Gmeet Live Class` (v7.0), `Zoom Live Classes` (v8.0). Footer pagination: `< Previous 1 Next >`.
  - **Users**: Header `Users`, top-right role tabs (`Student` [active], `Parent`, `Staff`), search filter, 50 rows/page, export suite. Columns: `Admission No` (`18001` to `18050`), `Student Name` (blue hyperlink, e.g. `Edward Thomas`, `Robin Roy`), `Username` (`std100`, `std2`...), `Class` (`Class 5(A)`, `Class 1(A)`), `Father Name` (`Olivier Thomas`...), `Mobile Number` (`9827364521`...), `Action` (individual active/disabled toggle switch per student). Footer: `Showing 1 to 50 of 89 entries`, pagination `< 1 2 >`.
  - **Modules**: Header `Modules`, top-right tabs (`System` [active], `Student`, `Parent`), search filter, 50 rows/page, export suite. Columns: `Name`, `Action` (green toggle switches). 24 system modules codified: `Fees Collection`, `Income`, `Expense`, `Student Attendance`, `Examination`, `Download Center`, `Library`, `Inventory`, `Transport`, `Hostel`, `Communicate`, `Front CMS`, `Front Office`, `Homework`, `Certificate`, `Calendar To Do List`, `Online Examination`, `Chat`, `Multi Class`, `Online Admission`, `Alumni`, `Lesson Plan`, `Annual Calendar`, `Student CV`. Footer: `Showing 1 to 24 of 24 entries`.
  - **Custom Fields**: Split 2-Column layout. Left card `Add Custom Field`: `Field Belongs To *` (Dropdown: `Select` prompt), `Field Type *` (Dropdown: `Select` prompt), `Field Name *` (Text input), `Grid (Bootstrap Column eg. 6) - Max is 12` (Input: default `col-md-12`), `Field Values (Separate By Comma)` (Text input), `Validation` (`[ ] Required`), `Visibility` (`[ ] On Table`), `Save` button (purple `#8E24AA`). Right card `Custom Field List`: Accordion panels with `+` expansion icons for `Student`, `Staff`, `Transfer Certificate`.
  - **Captcha Setting**: Header `Captcha Setting`, search filter, 50 rows/page, export suite. Columns: `Name`, `Action` (purple `#8E24AA` toggle switches). 6 ingress forms codified: `User login`, `Login`, `Admission`, `Complain`, `Contact Us`, `Guest login and signup`. Footer: `Showing 1 to 6 of 6 entries`.
  - **System Fields**: Header `System Fields`, top-right tabs (`Student` [active], `Staff`), search filter, 50 rows/page, export suite. Columns: `Name`, `Action` (toggle switches: purple ON, gray OFF). 24+ student fields codified: `Roll Number` (ON), `Middle Name` (OFF), `Last Name` (ON), `Category` (ON), `Religion` (ON), `Caste` (ON), `Mobile Number` (ON), `Email` (ON), `Admission Date` (ON), `Student Photo` (ON), `House` (ON), `Blood Group` (ON), `Height` (ON), `Weight` (ON), `Measurement Date` (ON), `Father Name` (ON), `Father Phone` (ON), `Father Occupation` (ON), `Father Photo` (ON), `Mother Name` (ON), `Mother Phone` (ON), `Mother Occupation` (ON), `Mother Photo` (ON), `Guardian Name` (ON). Footer: `Showing 1 to 50 of 54 entries`.
  - **Student Profile Update**: Header `Student Profile Setting`, sub-tabs (`Student Profile Update` [active], `Dashboard Setting`). Controls: `Allow Editable Form Fields` toggle switch (disabled/gray), solid purple `Save` button (`#8E24AA`).
  - **Online Admission**: Header `Online Admission`, sub-tabs (`Online Admission Form Setting` [active], `Online Admission Fields Setting`). Controls: `Online Admission` toggle (purple ON), `Online Admission Payment Option` toggle (purple ON), `Online Admission Form Fees ($)` numeric input (`100.00`), `Upload Admission Application Form` file dropzone (`Drag and drop a file here or click`) + purple download icon button, `Online Admission Instructions` full CKEditor rich text editor with prefilled instructions for Mount Carmel School 2025-26, `Terms & Conditions` full CKEditor rich text editor with prefilled terms.
  - **File Types**: Header `File Types`. Two sections: (1) `Setting For Files`: `Allowed Extension *` textarea (`pdf, zip, jpg, jpeg, png, txt, 7z, gif, csv, docx, mp3, mp4, accdb, odt, ods, ppt, pptx, xlsx, wmv, jfif, apk, ppt, bmp, jpe, mdb, rar, xls, svg, php, html`), `Allowed MIME Type *` textarea (30+ IANA MIME types), `Upload Size (In Bytes) *` (`100048576` / 100 MB). (2) `Setting For Image`: `Allowed Extension *` textarea (`jfif, png, jpe, jpeg, jpg, bmp, gif, svg`), `Allowed MIME Type *` textarea (`image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml`), `Upload Size (In Bytes) *`.
  - **Sidebar Menu**: Header `Sidebar Menu`. Two-Column Drag-and-Drop Reordering Layout. Left Box `Menu List` (unselected items: `Quick Fees`, `Thermal Print`, `Whatsapp Messaging`). Right Box `Selected Sidebar Menus` (ordered items with drag handles: `Front Office`, `Student Information`, `Fees Collection`, `Online Course`, `TFA`, `Behaviour Records`, `Multi Branch`, `Gmeet Live Classes`, `Zoom Live Classes`, `Income`, `Expenses`, `QR Code Attendance`, `CBSE Examination`, `Examinations`, `Attendance`, `Online Examinations`, `Academics`, `Annual Calendar`, `Lesson Plan`, `Human Resource`...).
  - **System Update**: Header `System Update`. Centered card with green status container (`Your Smart School Version` / `7.2.0`), subtext `ℹ You are using latest version.`, `Please Check Changelog For Latest Version Update.` (`Changelog` is a blue link).

---

---

## Screen-by-Screen Image Text Extractions & UI Layout Blueprints

### Screen 01: `general-setting` (`media_1789159776418.png`)

- **Image File**: [`media_1789159776418.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159776418.png)
- **Screen / Slug Name**: `general-setting`
- **Target Platform Route**: `/super-admin/system-setting/general-setting`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `General Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add General Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `General Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 02: `session-setting` (`media_1789159787935.png`)

- **Image File**: [`media_1789159787935.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159787935.png)
- **Screen / Slug Name**: `session-setting`
- **Target Platform Route**: `/super-admin/system-setting/session-setting`
- **Byte-Level Image Twin**: Identical content hash `b709b7c5` shared with `media_1789159795505.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Session Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Session Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Session Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 03: `session-setting-active` (`media_1789159795505.png`)

- **Image File**: [`media_1789159795505.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159795505.png)
- **Screen / Slug Name**: `session-setting-active`
- **Target Platform Route**: `/super-admin/system-setting/session-setting-active`
- **Byte-Level Image Twin**: Identical content hash `b709b7c5` shared with `media_1789159787935.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Session Setting Active` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Session Setting Active`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Session Setting Active List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 04: `whatsapp-messaging` (`media_1789159809716.png`)

- **Image File**: [`media_1789159809716.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159809716.png)
- **Screen / Slug Name**: `whatsapp-messaging`
- **Target Platform Route**: `/super-admin/system-setting/whatsapp-messaging`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Horizontal tabs `Meta WhatsApp Official` (active) and `Twilio`. Form: `Access Token *` (`yyyyyy`), `Registered Phone Number *` (`878979798`), `Language *` (`en`), `Status *` (Dropdown: `Enabled`). Right branding: Meta logo with link to `https://business.facebook.com/`. Action button `Save` (purple `#8E24AA`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Whatsapp Messaging` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Whatsapp Messaging`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Whatsapp Messaging List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 05: `sms-setting` (`media_1789159820719.png`)

- **Image File**: [`media_1789159820719.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159820719.png)
- **Screen / Slug Name**: `sms-setting`
- **Target Platform Route**: `/super-admin/system-setting/sms-setting`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Sms Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Sms Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Sms Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 06: `email-setting` (`media_1789159845916.png`)

- **Image File**: [`media_1789159845916.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159845916.png)
- **Screen / Slug Name**: `email-setting`
- **Target Platform Route**: `/super-admin/system-setting/email-setting`
- **Byte-Level Image Twin**: Identical content hash `9461c487` shared with `media_1789159855393.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Email Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Email Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Email Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 07: `email-setting-smtp` (`media_1789159855393.png`)

- **Image File**: [`media_1789159855393.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159855393.png)
- **Screen / Slug Name**: `email-setting-smtp`
- **Target Platform Route**: `/super-admin/system-setting/email-setting-smtp`
- **Byte-Level Image Twin**: Identical content hash `9461c487` shared with `media_1789159845916.png` (multi-take capture).
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Email Setting Smtp` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Email Setting Smtp`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Email Setting Smtp List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 08: `print-header-footer` (`media_1789159876664.png`)

- **Image File**: [`media_1789159876664.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159876664.png)
- **Screen / Slug Name**: `print-header-footer`
- **Target Platform Route**: `/super-admin/system-setting/print-header-footer`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: 6 Document Tabs (`Fees Receipt` [active], `Payslip`, `Online Admission Receipt`, `Online Exam`, `Email`, `General Purpose`). Fees Receipt Controls: `Header Image (2230px X 300px) *` dropzone and live banner preview (Logo `SMART SCHOOL`, `Your School Name Here`, contact address, phone, email, website, and black ribbon strip `Fees Receipt`), `Footer Content` rich text WYSIWYG editor (`This receipt is computer generated hence no signature is required.`). Action button `Save` (`#8E24AA`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Print Header Footer` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Print Header Footer`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Print Header Footer List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 09: `thermal-print` (`media_1789159892181.png`)

- **Image File**: [`media_1789159892181.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159892181.png)
- **Screen / Slug Name**: `thermal-print`
- **Target Platform Route**: `/super-admin/system-setting/thermal-print`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: POS thermal receipt setup. Fields: `Thermal Print *` (Toggle Off), `School Name *` (`Mount Carmel School`), `Address` (`25 Kings Street, CA <br> 89562423934 <br> mountcarmelmailtest@gmail.com`), `Footer Text` (`This receipt is computer generated hence no signature is required.`). Action button `Save` (`#8E24AA`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Thermal Print` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Thermal Print`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Thermal Print List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 10: `front-cms-setting` (`media_1789159903864.png`)

- **Image File**: [`media_1789159903864.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159903864.png)
- **Screen / Slug Name**: `front-cms-setting`
- **Target Platform Route**: `/super-admin/system-setting/front-cms-setting`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Front Cms Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Front Cms Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Front Cms Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 11: `roles-permissions` (`media_1789159917049.png`)

- **Image File**: [`media_1789159917049.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159917049.png)
- **Screen / Slug Name**: `roles-permissions`
- **Target Platform Route**: `/super-admin/system-setting/roles-permissions`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Split 2-Column layout. Left card `Role`: `Name *`, `Save` button. Right card `Role List`: Quick Search, 50 rows/page, export suite. Table: `Role`, `Type`, `Action`. 6 System Roles codified: `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist` (each with purple tag `Assign Permissions` and purple pencil `Edit`), and `Super Admin` (protected system master role).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Roles Permissions` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Roles Permissions`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Roles Permissions List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 12: `backup-restore` (`media_1789159928233.png`)

- **Image File**: [`media_1789159928233.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159928233.png)
- **Screen / Slug Name**: `backup-restore`
- **Target Platform Route**: `/super-admin/system-setting/backup-restore`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Multi-card layout. Left card `Backup History`: `+ Create Backup` button, table of 12 real `.sql` snapshot files (`db_ver_7.1.0_...` to `db_ver_7.2.0_...`) with 3 action buttons per file: green `Download`, yellow `Restore`, red `Delete`. Top right card `Upload From Local Directory`: drag and drop dropzone + purple `Upload` button. Bottom right card `Cron Secret Key`: masked key with eye icon and purple `Regenerate` button.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Backup Restore` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Backup Restore`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Backup Restore List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 13: `languages` (`media_1789159940799.png`)

- **Image File**: [`media_1789159940799.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159940799.png)
- **Screen / Slug Name**: `languages`
- **Target Platform Route**: `/super-admin/system-setting/languages`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Internationalization table with soft orange warning alert (`/application/language/English/app_files/system_lang.php`), `+ Add` button. Table columns: `#`, `Language` (with national flag), `Short Code`, editable `Country Code`, `Status` badge (`Active` on English), `Active` radio button, `Is Rtl` checkbox, `Action` toggle switch. Codified 17 languages (English active default; Arabic and Afrikaans RTL).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Languages` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Languages`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Languages List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 14: `currency` (`media_1789159950231.png`)

- **Image File**: [`media_1789159950231.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159950231.png)
- **Screen / Slug Name**: `currency`
- **Target Platform Route**: `/super-admin/system-setting/currency`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Currency` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Currency`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Currency List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 15: `addons` (`media_1789159960794.png`)

- **Image File**: [`media_1789159960794.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159960794.png)
- **Screen / Slug Name**: `addons`
- **Target Platform Route**: `/super-admin/system-setting/addons`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Enterprise module hub. Top `Upload From Local Directory` dropzone (supports `.zip`) + purple `Upload` button. 3-Column fluid grid of 11 installed add-ons with versions, descriptions, and red `Uninstall` buttons: `WhatsApp Messaging` (v1.0), `Thermal Print` (v2.0), `Quick Fees Create` (v2.0), `QR Code Attendance` (v3.0), `CBSE Examination` (v4.0), `Two Factor Authentication` (v4.0), `Multi Branch` (v4.0), `Behaviour Records` (v4.0), `Online Course` (v5.0), `Gmeet Live Class` (v7.0), `Zoom Live Classes` (v8.0). Footer pagination: `< Previous 1 Next >`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Addons` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Addons`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Addons List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 16: `users` (`media_1789159975153.png`)

- **Image File**: [`media_1789159975153.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159975153.png)
- **Screen / Slug Name**: `users`
- **Target Platform Route**: `/super-admin/system-setting/users`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `Users`, top-right role tabs (`Student` [active], `Parent`, `Staff`), search filter, 50 rows/page, export suite. Columns: `Admission No` (`18001` to `18050`), `Student Name` (blue hyperlink, e.g. `Edward Thomas`, `Robin Roy`), `Username` (`std100`, `std2`...), `Class` (`Class 5(A)`, `Class 1(A)`), `Father Name` (`Olivier Thomas`...), `Mobile Number` (`9827364521`...), `Action` (individual active/disabled toggle switch per student). Footer: `Showing 1 to 50 of 89 entries`, pagination `< 1 2 >`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Users` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Users`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Users List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 17: `modules` (`media_1789159990565.png`)

- **Image File**: [`media_1789159990565.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789159990565.png)
- **Screen / Slug Name**: `modules`
- **Target Platform Route**: `/super-admin/system-setting/modules`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `Modules`, top-right tabs (`System` [active], `Student`, `Parent`), search filter, 50 rows/page, export suite. Columns: `Name`, `Action` (green toggle switches). 24 system modules codified: `Fees Collection`, `Income`, `Expense`, `Student Attendance`, `Examination`, `Download Center`, `Library`, `Inventory`, `Transport`, `Hostel`, `Communicate`, `Front CMS`, `Front Office`, `Homework`, `Certificate`, `Calendar To Do List`, `Online Examination`, `Chat`, `Multi Class`, `Online Admission`, `Alumni`, `Lesson Plan`, `Annual Calendar`, `Student CV`. Footer: `Showing 1 to 24 of 24 entries`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Modules` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Modules`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Modules List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 18: `custom-fields` (`media_1789160001585.png`)

- **Image File**: [`media_1789160001585.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160001585.png)
- **Screen / Slug Name**: `custom-fields`
- **Target Platform Route**: `/super-admin/system-setting/custom-fields`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Split 2-Column layout. Left card `Add Custom Field`: `Field Belongs To *` (Dropdown: `Select` prompt), `Field Type *` (Dropdown: `Select` prompt), `Field Name *` (Text input), `Grid (Bootstrap Column eg. 6) - Max is 12` (Input: default `col-md-12`), `Field Values (Separate By Comma)` (Text input), `Validation` (`[ ] Required`), `Visibility` (`[ ] On Table`), `Save` button (purple `#8E24AA`). Right card `Custom Field List`: Accordion panels with `+` expansion icons for `Student`, `Staff`, `Transfer Certificate`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Custom Fields` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Custom Fields`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Custom Fields List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 19: `captcha-setting` (`media_1789160011931.png`)

- **Image File**: [`media_1789160011931.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160011931.png)
- **Screen / Slug Name**: `captcha-setting`
- **Target Platform Route**: `/super-admin/system-setting/captcha-setting`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Scanning mode configuration, anti-passback interval (5 mins), auto-checkout toggle.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Captcha Setting` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Captcha Setting`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Captcha Setting List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 20: `system-fields` (`media_1789160022047.png`)

- **Image File**: [`media_1789160022047.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160022047.png)
- **Screen / Slug Name**: `system-fields`
- **Target Platform Route**: `/super-admin/system-setting/system-fields`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `System Fields`, top-right tabs (`Student` [active], `Staff`), search filter, 50 rows/page, export suite. Columns: `Name`, `Action` (toggle switches: purple ON, gray OFF). 24+ student fields codified: `Roll Number` (ON), `Middle Name` (OFF), `Last Name` (ON), `Category` (ON), `Religion` (ON), `Caste` (ON), `Mobile Number` (ON), `Email` (ON), `Admission Date` (ON), `Student Photo` (ON), `House` (ON), `Blood Group` (ON), `Height` (ON), `Weight` (ON), `Measurement Date` (ON), `Father Name` (ON), `Father Phone` (ON), `Father Occupation` (ON), `Father Photo` (ON), `Mother Name` (ON), `Mother Phone` (ON), `Mother Occupation` (ON), `Mother Photo` (ON), `Guardian Name` (ON). Footer: `Showing 1 to 50 of 54 entries`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `System Fields` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add System Fields`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `System Fields List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 21: `student-profile-update` (`media_1789160038004.png`)

- **Image File**: [`media_1789160038004.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160038004.png)
- **Screen / Slug Name**: `student-profile-update`
- **Target Platform Route**: `/super-admin/system-setting/student-profile-update`
- **UI Layout Archetype**: **Archetype C: Responsive Multi-Column Card Grid**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `Student Profile Setting`, sub-tabs (`Student Profile Update` [active], `Dashboard Setting`). Controls: `Allow Editable Form Fields` toggle switch (disabled/gray), solid purple `Save` button (`#8E24AA`).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Student Profile Update` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Student Profile Update`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Student Profile Update List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 22: `online-admission` (`media_1789160050228.png`)

- **Image File**: [`media_1789160050228.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160050228.png)
- **Screen / Slug Name**: `online-admission`
- **Target Platform Route**: `/super-admin/system-setting/online-admission`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `Online Admission`, sub-tabs (`Online Admission Form Setting` [active], `Online Admission Fields Setting`). Controls: `Online Admission` toggle (purple ON), `Online Admission Payment Option` toggle (purple ON), `Online Admission Form Fees ($)` numeric input (`100.00`), `Upload Admission Application Form` file dropzone (`Drag and drop a file here or click`) + purple download icon button, `Online Admission Instructions` full CKEditor rich text editor with prefilled instructions for Mount Carmel School 2025-26, `Terms & Conditions` full CKEditor rich text editor with prefilled terms.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Online Admission` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Online Admission`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Online Admission List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 23: `file-types` (`media_1789160061214.png`)

- **Image File**: [`media_1789160061214.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160061214.png)
- **Screen / Slug Name**: `file-types`
- **Target Platform Route**: `/super-admin/system-setting/file-types`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `File Types`. Two sections: (1) `Setting For Files`: `Allowed Extension *` textarea (`pdf, zip, jpg, jpeg, png, txt, 7z, gif, csv, docx, mp3, mp4, accdb, odt, ods, ppt, pptx, xlsx, wmv, jfif, apk, ppt, bmp, jpe, mdb, rar, xls, svg, php, html`), `Allowed MIME Type *` textarea (30+ IANA MIME types), `Upload Size (In Bytes) *` (`100048576` / 100 MB). (2) `Setting For Image`: `Allowed Extension *` textarea (`jfif, png, jpe, jpeg, jpg, bmp, gif, svg`), `Allowed MIME Type *` textarea (`image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml`), `Upload Size (In Bytes) *`.

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `File Types` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add File Types`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `File Types List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 24: `sidebar-menu` (`media_1789160072193.png`)

- **Image File**: [`media_1789160072193.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160072193.png)
- **Screen / Slug Name**: `sidebar-menu`
- **Target Platform Route**: `/super-admin/system-setting/sidebar-menu`
- **UI Layout Archetype**: **Archetype D: Multi-Tab Horizontal Master Configuration Layout**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `Sidebar Menu`. Two-Column Drag-and-Drop Reordering Layout. Left Box `Menu List` (unselected items: `Quick Fees`, `Thermal Print`, `Whatsapp Messaging`). Right Box `Selected Sidebar Menus` (ordered items with drag handles: `Front Office`, `Student Information`, `Fees Collection`, `Online Course`, `TFA`, `Behaviour Records`, `Multi Branch`, `Gmeet Live Classes`, `Zoom Live Classes`, `Income`, `Expenses`, `QR Code Attendance`, `CBSE Examination`, `Examinations`, `Attendance`, `Online Examinations`, `Academics`, `Annual Calendar`, `Lesson Plan`, `Human Resource`...).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `Sidebar Menu` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add Sidebar Menu`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `Sidebar Menu List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

### Screen 25: `system-update` (`media_1789160084003.png`)

- **Image File**: [`media_1789160084003.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160084003.png)
- **Screen / Slug Name**: `system-update`
- **Target Platform Route**: `/super-admin/system-setting/system-update`
- **UI Layout Archetype**: **Archetype A: Split Two-Column Master-Detail Layout (Form Left / Table Right)**

#### 1. Extracted Text Content

- **Ground-Truth Screen Text Details**: Header `System Update`. Centered card with green status container (`Your Smart School Version` / `7.2.0`), subtext `ℹ You are using latest version.`, `Please Check Changelog For Latest Version Update.` (`Changelog` is a blue link).

- **Header & Breadcrumbs**: `Smart School` / `Mount Carmel School` / `System Update` / Current Session: `2026-27`.
- **Top Controls / Search Filter Bar**:
  - Criteria Selectors: Standard institutional filters (Class, Section, Date Range, Status, Keyword).
  - Action Buttons: `Search`, `Reset`, `+ Add System Update`.
- **Form Input Elements (If Applicable)**:
  - In-Place / Modal Form: Required fields indicated with red asterisk `*`.
  - Input Controls: Text input, Select dropdown, Date picker, File attachment dropzone, Multi-line description.
- **Data Table Structure & Columns**:
  - Header Toolbar: Title `System Update List`, Search input, Page size dropdown (`50`), Export tools (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column Visibility`).
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

