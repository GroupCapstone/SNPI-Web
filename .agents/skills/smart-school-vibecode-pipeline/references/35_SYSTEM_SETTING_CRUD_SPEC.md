# Module 35: System Setting CRUD Architecture & Platform Governance Specification

---

## 1. Domain Overview & Taxonomy

The **System Setting** module (`/super-admin/system-setting` or `/admin/systemsettings`) represents the core platform control plane of the Smart School Enterprise Multi-Role Platform. It governs global school parameters, academic sessions, multi-channel notifications (Email, SMS, WhatsApp, Push), payment gateway integrations, thermal and document printing letterheads, Front CMS toggles, Role-Based Access Control (RBAC) permissions, database disaster recovery backups, multilingual localization, modular feature toggles, user directory account administration, custom metadata fields, security CAPTCHAs, and over-the-air (OTA) platform migrations.

### The 25 Platform Configuration Slugs

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM SETTING PLATFORM CONTROL PLANE                                │
├───────────────────────────────┬────────────────────────────────┬───────────────────────────────┤
│ 1. general-setting            │ 10. front-cms-setting          │ 18. captcha-setting           │
│ 2. session-setting            │ 11. roles-permissions          │ 19. system-fields             │
│ 3. notification-setting       │ 12. backup-restore             │ 20. student-profile-update    │
│ 4. whatsapp-messaging         │ 13. languages                  │ 21. online-admission          │
│ 5. sms-setting                │ 14. currency                   │ 22. file-types                │
│ 6. email-setting              │ 15. addons                     │ 23. sidebar-menu              │
│ 7. payment-methods            │ 16. users                      │ 24. system-update             │
│ 8. print-header-footer        │ 17. modules                    │ 25. miscellaneous-setting     │
│ 9. thermal-print              │                                │                               │
└───────────────────────────────┴────────────────────────────────┴───────────────────────────────┘
```

---

## 2. Exhaustive Sub-Section & Slug Specifications

### 2.1. Slug: `general-setting` (`/admin/schsettings`)

- **Screen Layout Structure**:
  - Two-pane administrative layout:
    - **Left Pane (Internal Navigation Sub-Menu - 14 Items)**:
      1. `General Setting` (active with purple text indicator)
      2. `Logo`
      3. `Login Page Background`
      4. `Backend Theme`
      5. `Mobile App`
      6. `Student / Guardian Panel`
      7. `Fees`
      8. `ID Auto Generation`
      9. `Attendance Type`
      10. `Google Drive Setting`
      11. `Whatsapp Settings`
      12. `Chat`
      13. `Maintenance`
      14. `Miscellaneous`
    - **Right Content Pane (General Setting Configuration Card)**:
      - **System Notice Alert (Soft Blue)**:
        `Note: After saving General Setting please once logout then relogin so changes will be come in effect.`
      - **School Identity Grid**:
        - `School Name *` (Text, e.g. `Mount Carmel School`). Mandatory.
        - `School Code` (Text, institutional affiliation code, e.g. `ACT-467438`).
        - `Address *` (Full campus physical address, e.g. `25 Kings Street, CA`). Mandatory.
        - `Phone *` (Institutional telephone contact, e.g. `89562423934`). Mandatory.
        - `Email *` (Official administrative dispatch email, e.g. `mountcarmelmailtest@gmail.com`). Mandatory.
      - **Academic Session Section**:
        - `Session *`: Single-select dropdown referencing active sessions (e.g. `2026-27`). Mandatory.
        - `Session Start Month *`: Single-select dropdown of calendar months (e.g. `April`). Mandatory.
      - **Date Time Section**:
        - `Date Format *`: Single-select dropdown (e.g. `mm/dd/yyyy`, `dd-mm-yyyy`, `yyyy-mm-dd`). Mandatory.
        - `Timezone *`: Single-select dropdown with GMT offsets (e.g. `(GMT+05:30) Asia, Kolkata`, `(GMT+07:00) Asia, Phnom_Penh`). Mandatory.
        - `Start Day Of Week *`: Single-select dropdown (e.g. `Monday`, `Sunday`). Mandatory.
      - **Currency Section**:
        - `Currency Format *`: Single-select numeral formatting pattern (e.g. `1,23,45,678.00`, `12,345,678.00`). Mandatory.
      - **File Upload Path Section**:
        - `Base Url *`: Web server base URL string (e.g. `https://demo.smart-school.in/`). Mandatory.
        - `File Upload Path *`: Absolute Linux/UNIX filesystem storage path (e.g. `/var/www/demo.smart-school.inXglIP7Dx5oz7Mw/public_html/uploads`). Mandatory.
      - **Footer Action**:
        - `Save` Button: Solid purple tactile button (`#8E24AA`).
      - **Page Footer**:
        - Copyright declaration: `© 2026 Mount Carmel School`.

---

### 2.2. Slug: `session-setting` (`/admin/sessions`)

- **Screen Layout Structure**:
  - Split 2-Column layout: Left: Add Session form; Right: Session List table.
- **Left Column Card (`Add Session`)**:
  - `Session *`: Text input with purple focus highlight (e.g. `2026-27`). Mandatory.
  - `Save` Button: Solid purple tactile button (`#8E24AA`).
- **Right Column Card (`Session List`)**:
  - **System Notice Alert (Soft Blue)**:
    `Note: Changing the session name format may cause issues on some pages or features, so it is recommended not to change the session name format.`
  - Quick Search text filter (`Search`), page length selector (`50`), and export toolbar (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns**:
    1. `Session` (String, sortable, e.g. `2016-17` to `2029-30`)
    2. `Status` (Status indicator: green solid badge `Active` on the currently active academic session)
    3. `Action` (Action glyphs: Edit, Delete [active session delete suppressed])
  - **Ground Truth Seed Data (14 Sessions)**:
    - `2016-17`, `2017-18`, `2018-19`, `2019-20`, `2020-21`, `2021-22`, `2022-23`, `2023-24`, `2024-25`, `2025-26`, `2026-27` (`Active`), `2027-28`, `2028-29`, `2029-30`.
  - Footer counter: `Showing 1 to 14 of 14 entries`.

---

### 2.3. Slug: `notification-setting` (`/admin/notification/setting`)

- **Screen Layout Structure**:
  - Tabular event-matrix card with column switches for multi-channel dispatch.
- **Event Dispatch Matrix Columns**:
  1. `Event Name` (System Trigger: `Student Admission`, `Exam Result`, `Fees Due Reminder`, `Fees Payment Receipt`, `Live Class Schedule`, `Daily Attendance Absence`, `Homework Created`, `Book Return Reminder`)
  2. `Destination` (Target Role: Student, Parent, Staff)
  3. `Email` (Checkbox toggle)
  4. `SMS` (Checkbox toggle)
  5. `Mobile App Push` (Checkbox toggle)
  6. `WhatsApp` (Checkbox toggle)
  7. `Template Editor` (Action button launching Rich Text dynamic token editor, e.g. `[student_name]`, `[amount]`, `[due_date]`)

---

### 2.4. Slug: `whatsapp-messaging` (`/admin/whatsapp`)

- **Screen Layout Structure**:
  - Top horizontal tab strip with official vendor provider cards.
- **Header Title**: `Whatsapp Messaging Setting`
- **Vendor Tab Strip**:
  - `Meta WhatsApp Official` (default active with solid purple underline)
  - `Twilio`
- **Meta WhatsApp Official Form Controls**:
  - `Access Token *`: Secret text input for Meta Cloud API permanent system user token (e.g. `yyyyyy`). Mandatory.
  - `Registered Phone Number *`: E.164 phone string registered on Meta Business Manager (e.g. `878979798`). Mandatory.
  - `Language *`: ISO language code for message template localization (e.g. `en`). Mandatory.
  - `Status *`: Single-select dropdown (`Enabled` / `Disabled`). Mandatory.
- **Right Vendor Branding Card**:
  - Blue Meta Infinity branding card with official hyperlink to `https://business.facebook.com/`.
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.5. Slug: `sms-setting` (`/admin/sms`)

- **Screen Layout Structure**:
  - Horizontal tabbed gateway selector with 12 international telecom SMS aggregators.
- **Header Title**: `SMS Setting`
- **Aggregator Gateway Tab Strip (12 Aggregators)**:
  1. `Clickatell Sms Gateway` (default active with solid purple underline)
  2. `Twilio SMS Gateway`
  3. `MSG91`
  4. `Text Local`
  5. `SMS Country`
  6. `Bulk SMS`
  7. `Mobi Reach`
  8. `Nexmo`
  9. `AfricasTalking`
  10. `SMS Egypt`
  11. `SMS Gateway Hub`
  12. `Custom SMS Gateway`
- **Clickatell SMS Gateway Form Controls**:
  - `Clickatell Username *`: Text input. Mandatory.
  - `Clickatell Password *`: Password input. Mandatory.
  - `API Key *`: Vendor REST API authorization token. Mandatory.
  - `Status *`: Single-select dropdown (`Select` / `Active` / `Inactive`). Mandatory.
- **Right Vendor Branding Card**:
  - Clickatell logo with official URL: `https://www.clickatell.com`.
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.6. Slug: `email-setting` (`/admin/emailconfig`)

- **Screen Layout Structure**:
  - Single-card SMTP mailer engine configuration desk.
- **Header Title**: `Email Setting`
- **Form Controls & Ground Truth Values**:
  1. `Email Engine`: Single-select dropdown (`SMTP`, `Sendmail`, `AWS SES`). Active: `SMTP`.
  2. `Email`: Outbound sender email address (`no-replytest@webfeb.com`).
  3. `SMTP Username`: Authenticated SMTP relay username (`9a3279001@smtp-brevo.com`).
  4. `SMTP Password`: Password input with masked characters (`xs***************************************************mf`).
  5. `SMTP Server`: Relay hostname (`smtp-relay.brevo.com`).
  6. `SMTP Port`: Server communication port (`587`).
  7. `SMTP Security`: Single-select dropdown (`TLS`, `SSL`, `None`). Active: `TLS`.
  8. `SMTP Auth`: Single-select dropdown (`ON` / `OFF`). Active: `ON`.
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.7. Slug: `payment-methods` (`/admin/paymentmethods`)

- **Screen Layout Structure**:
  - 3-Column fluid grid of payment gateway integration cards: `Stripe`, `PayPal`, `Razorpay`, `PayU`, `ABA PayWay`, `Wing Bank`, `Cashfree`, `Midtrans`.
- **Card Controls per Gateway**:
  - Header: Gateway logo and name with `Active / Disabled` toggle switch.
  - Body: Credential form inputs:
    - `API Key / Publishable Key`
    - `Secret Key / Private Key`
    - `Merchant ID`
    - `Webhook Secret`
    - `Environment Mode` (Radio: `Sandbox / Test` vs `Production / Live`)
  - Footer: `Save` action button.

---

### 2.8. Slug: `print-header-footer` (`/admin/print_headerfooter`)

- **Screen Layout Structure**:
  - Multi-document letterhead designer with top horizontal tab strip.
- **Header Title**: `Print Header Footer`
- **Document Tab Strip (6 Document Categories)**:
  1. `Fees Receipt` (default active with solid purple underline)
  2. `Payslip`
  3. `Online Admission Receipt`
  4. `Online Exam`
  5. `Email`
  6. `General Purpose`
- **Controls per Document Tab (e.g. Fees Receipt)**:
  - `Header Image (2230px X 300px) *`:
    - Dropzone and live high-resolution preview banner (2230x300px).
    - Contains school logo (`SMART SCHOOL`), centered institution name (`Your School Name Here`), right contact metadata (`Address: 25 Kings Street, CA`, `Phone No.: 89562423934`, `Email: yourschool@gmail.com`, `Website: www.yoursite.in`), and black document header ribbon (`Fees Receipt`).
  - `Footer Content`:
    - Full WYSIWYG rich text toolbar (`Normal text`, `Bold`, `Italic`, `Underline`, `Small`, quote block, bullet list, numbered list, align left, align center, hyperlink, embed image).
    - Default Content: `This receipt is computer generated hence no signature is required.`
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.9. Slug: `thermal-print` (`/admin/thermalprint/index`)

- **Screen Layout Structure**:
  - POS thermal receipt printer layout and metadata configuration card.
- **Header Title**: `Thermal Print`
- **Form Controls & Ground Truth Fields**:
  1. `Thermal Print *`: Toggle switch (Off / On). Active: Off.
  2. `School Name *`: Text input (`Mount Carmel School`). Mandatory.
  3. `Address`: Textarea input supporting HTML break tags (`25 Kings Street, CA <br> 89562423934 <br> mountcarmelmailtest@gmail.com`).
  4. `Footer Text`: Textarea input for receipt disclaimer (`This receipt is computer generated hence no signature is required.`).
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.10. Slug: `front-cms-setting` (`/admin/frontcms`)

- **Screen Layout Structure**:
  - Comprehensive public portal control plane partitioned into general portal toggles, asset uploaders, SEO/analytics injection, social channels, and visual theme selection.
- **Header Title**: `Front CMS Setting`
- **Left Column Form Controls**:
  1. `Front CMS`: Toggle switch (Purple active: ON). Master public website switch.
  2. `Sidebar`: Toggle switch (Gray: OFF). Public page sidebar toggle.
  3. `Language RTL Text Mode`: Toggle switch (Gray: OFF). Arabic/Hebrew RTL text toggle.
  4. `Sidebar Option`: Multi-select checkboxes (`[x] News`, `[x] Complain`).
  5. `Language`: Single-select dropdown (`English`).
  6. `Logo (369px X 76px)`: Image preview card displaying official crest and school title (`Mount Carmel School`).
  7. `Favicon (32px X 32px)`: Image preview card displaying 32x32px browser favicon crest.
  8. `Footer Text`: Text input (`© Mount Carmel School 2025 All rights reserved`).
  9. `Cookie Consent`: Textarea for GDPR / privacy compliance banner text.
  10. `Google Analytics`: Textarea code editor for Google Tag Manager script injection:
      ```html
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
      <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      ```
- **Right Column Social Media Integration (8 Platforms)**:
  1. `WhatsApp URL`: `https://www.whatsapp.com/a`
  2. `Facebook URL`: `https://www.facebook.com/a`
  3. `Twitter URL`: `https://twitter.com/a`
  4. `Youtube URL`: `https://www.youtube.com/a`
  5. `Google Plus`: `https://plus.google.com/a`
  6. `Linkedin URL`: `https://www.linkedin.com/a`
  7. `Instagram URL`: `https://www.instagram.com/a`
  8. `Pinterest URL`: `https://in.pinterest.com/a`
- **Bottom Section: Current Theme Selector**:
  - Visual responsive theme gallery displaying thumbnails of active and available institutional public website themes.
- **Footer Action**:
  - `Save` Button: Solid purple tactile button (`#8E24AA`).

---

### 2.11. Slug: `roles-permissions` (`/admin/roles`)

- **Screen Layout Structure**:
  - Split 2-Column responsive layout: Left: Add Role card; Right: Role List table.
- **Left Column Card (`Role`)**:
  - `Name *`: Text input with purple focus highlight. Mandatory.
  - `Save` Button: Solid purple tactile button (`#8E24AA`).
- **Right Column Card (`Role List`)**:
  - Quick Search input (`Search`), page size selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns**:
    1. `Role`: Role identifier name (String, sortable).
    2. `Type`: Origin classification (`System` / `Custom`).
    3. `Action`: Interactive action buttons:
       - Purple Tag Glyph: `Assign Permissions` (Launches granular module permission matrix).
       - Purple Pencil Glyph: `Edit` role title.
  - **6 Ground Truth System Roles Codified**:
    1. `Admin` | `System` | Permissions tag, Edit pencil
    2. `Teacher` | `System` | Permissions tag, Edit pencil
    3. `Accountant` | `System` | Permissions tag, Edit pencil
    4. `Librarian` | `System` | Permissions tag, Edit pencil
    5. `Receptionist` | `System` | Permissions tag, Edit pencil
    6. `Super Admin` | `System` | (Actions suppressed: master system authority)
  - Footer counter: `Showing 1 to 6 of 6 entries`.

---

### 2.12. Slug: `backup-restore` (`/admin/admin/backup`)

- **Screen Layout Structure**:
  - Multi-card disaster recovery center: Left 65% width Backup History table; Right 35% width Local Uploader and Automated Cron Key cards.
- **Left Card (`Backup History`)**:
  - Top Right Action: Solid purple button `+ Create Backup` with database dump icon.
  - **Data Table Columns**:
    1. `Backup Files`: Monospaced SQL dump filenames with creation timestamps.
    2. `Action`: 3-way color-coded operational triggers:
       - Green Button: `Download` (with cloud download icon).
       - Yellow/Amber Button: `Restore` (with database restore icon, triggers confirmation modal).
       - Red Button: `Delete` (with trash bin icon).
  - **12 Ground Truth Snapshot Archives Codified**:
    - `db_ver_7.1.0_2025-05-02_13-48-37.sql`
    - `db_ver_7.1.0_2025-07-01_17-48-01.sql`
    - `db_ver_7.1.0_2025-09-02_16-29-20.sql`
    - `db_ver_7.1.0_2025-10-01_17-26-48.sql`
    - `db_ver_7.1.0_2025-11-01_18-08-51.sql`
    - `db_ver_7.1.0_2025-12-01_13-57-45.sql`
    - `db_ver_7.1.0_2025-12-01_18-05-43.sql`
    - `db_ver_7.1.0_2025-12-02_12-41-09.sql`
    - `db_ver_7.2.0_2026-01-26_18-01-59.sql`
    - `db_ver_7.2.0_2026-01-26_18-03-03.sql`
    - `db_ver_7.2.0_2026-05-01_11-33-00.sql`
    - `db_ver_7.2.0_2026-05-26_10-01-12.sql`
- **Top Right Card (`Upload From Local Directory`)**:
  - Drag and drop zone: `Drag and drop a file here or click` (supports `.sql`, `.sql.gz`).
  - Action Button: Solid purple button `Upload` with upload arrow icon.
- **Bottom Right Card (`Cron Secret Key`)**:
  - Secure automated snapshot trigger endpoint key.
  - Secret key field with eye icon to toggle visibility and purple action button `Regenerate`.

---

### 2.13. Slug: `languages` (`/admin/language`)

- **Screen Layout Structure**:
  - Internationalization registry with inline country-code mapping and default language radio selector.
- **Header Title**: `Language List`
- **Top Right Action**: Solid purple button `+ Add`.
- **System Warning Alert (Soft Orange)**:
  `To change language key phrases, go your language directory e.g. for English language go edit file /application/language/English/app_files/system_lang.php`
- **Data Table Columns (8 Columns)**:
  1. `#`: Sequential numeric index.
  2. `Language`: Country flag icon + Official Language Name (e.g. Afrikaans, Albanian, Amharic, Arabic, Azerbaijan, Basque, Bengali, Bosnian, Catalan, Cebuano, Chinese, Croatia, Czech, Danish, Dutch, English, Esperanto).
  3. `Short Code`: ISO 639-1 language code (e.g. `af`, `sq`, `am`, `ar`, `az`, `eu`, `bn`, `bs`, `ca`, `ceb`, `zh`, `hr`, `cs`, `da`, `nl`, `en`, `eo`).
  4. `Country Code`: Editable text input box for ISO 3166-1 alpha-2 mapping (e.g. `af`, `al`, `am`, `sa`, `az`, `es`, `in`, `bs`, `ca`, `ph`, `cn`, `hr`, `cz`, `dk`, `nl`, `us`, `br`).
  5. `Status`: State indicator badge (e.g. green solid badge `Active` on English).
  6. `Active`: Radio button selector to switch the active system-wide default language (English active).
  7. `Is Rtl`: Checkbox toggle for Right-To-Left text rendering (checked for Afrikaans, Arabic).
  8. `Action`: Individual frontend availability toggle switch (Active on Arabic, Dutch, English; Inactive on others).

---

### 2.14. Slug: `currency` (`/admin/currency`)

- **Screen Layout Structure**:
  - Universal multi-currency conversion ledger with live inline symbol and conversion rate editing.
- **Header Title**: `Currencies`
- **Data Table Columns (8 Columns)**:
  1. `#`: Row index.
  2. `Currency`: ISO currency identifier (e.g. `AED`, `AFN`, `ALL`, `AMD`, `ANG`, `AOA`, `ARS`, `AUD`, `AWG`, `AZN`, `BAM`, `BDT`, `BGN`, `BHD`, `BIF`, `BMD`, `BND`, `BOB`).
  3. `Short Code`: Currency shorthand ticker (e.g. `AED`, `AFN`, `ALL`).
  4. `Currency Symbol`: Editable text input for currency glyph (e.g. `AEDf`, `؋`, `ALL`, `AMD`).
  5. `Conversion Rate`: Editable numeric input relative to base currency unit (e.g. `1`, `140`).
  6. `Base Currency`: Indicator for the institutional accounting baseline.
  7. `Active`: Radio button selector.
  8. `Enabled`: Toggle switch to make the currency selectable in payment and billing screens.

---

### 2.15. Slug: `addons` (`/admin/addons`)

- **Screen Layout Structure**:
  - Top local package uploader over a 3-column fluid responsive grid of official enterprise add-on modules.
- **Header Title**: `Addons`
- **Top Ingress Card**:
  - Drag and drop zone: `Drag and drop a file here or click` (supports `.zip` extension archives).
  - Action Button: Solid purple button `Upload` with upload glyph.
- **11 Ground Truth Modular Add-ons Codified**:
  1. `Smart School Whatsapp Messaging` (v1.0): Direct notification and template messaging via WhatsApp API. Action: Red `Uninstall` button.
  2. `Smart School Thermal Print` (v2.0): Thermal printer ESC/POS compatibility for compact fee receipts. Action: Red `Uninstall` button.
  3. `Smart School Quick Fees Create` (v2.0): 1-click batch fee creation and assignment engine. Action: Red `Uninstall` button.
  4. `Smart School QR Code Attendance` (v3.0): Automated student and staff attendance using QR/barcode scanning. Action: Red `Uninstall` button.
  5. `Smart School CBSE Examination` (v4.0): CBSE-compliant marksheet generation and advanced grading assessments. Action: Red `Uninstall` button.
  6. `Smart School Two Factor Authentication` (v4.0): 2FA security layer for staff, student, and admin logins. Action: Red `Uninstall` button.
  7. `Smart School Multi Branch` (v4.0): Centralized multi-campus governance for unlimited branches under one Super Admin. Action: Red `Uninstall` button.
  8. `Smart School Behaviour Records` (v4.0): Student incident logging with positive and negative point ledgers. Action: Red `Uninstall` button.
  9. `Smart School Online Course` (v5.0): LMS e-learning platform with free/paid video courses and lesson tracking. Action: Red `Uninstall` button.
  10. `Smart School Gmeet Live Class` (v7.0): Integrated Google Meet video conferencing for live remote lectures. Action: Red `Uninstall` button.
  11. `Smart School Zoom Live Classes` (v8.0): Integrated Zoom API live virtual classroom scheduling. Action: Red `Uninstall` button.
- **Footer Controls**:
  - Pagination bar: `< Previous  1  Next >`.

---

### 2.16. Slug: `users` (`/admin/users`)

- **Screen Layout Structure**:
  - Institutional user account registry partitioned by role tabs:
    - `Student` (active)
    - `Parent`
    - `Staff`
- **Header Title**: `Users`
- **Table Controls & Data Columns**:
  - Quick Search filter (`Search`), page length selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns (7 Columns)**:
    1. `Admission No` (String, sortable, e.g. `18001`, `18002`, `18003`, `18004`, `18005`, `18006`, `18007`, `18008`, `18009`, `18010`, `18011`, `18012`, `18013`, `18014`, `18015`, `18016`, `18017`, `18018`, `18019`, `18020`, `18021`, `18022`, `18023`, `18024`, `18025`, `18026`, `18027`, `18028`, `18029`, `18030`, `18031`, `18032`, `18033`, `18034`, `18035`, `18036`, `18037`, `18038`, `18039`, `18040`, `18041`, `18042`, `18043`, `18044`, `18045`, `18046`, `18047`, `18048`, `18049`, `18050`).
    2. `Student Name` (Blue hyperlink to student record, e.g. `Edward Thomas`, `Robin Roy`, `Jasmin Williams`, `David Miller`, `Devin Taylor`, `Jason Gray`, `Henry Foster`, `Brian Jackson`, `Emma Johnson`, `Olivia Harris`, `Sophia Martin`, `Isabella Clark`, `Mia Lewis`, `Ava Walker`, `Chloe Hall`, `Grace Allen`, `Lily Young`, `Zoe King`, `Ella Wright`, `Aria Scott`, `Scarlett Green`, `Victoria Baker`, `Avery Adams`, `Hannah Nelson`, `Aubrey Carter`, `Addison Mitchell`, `Layla Perez`, `Natalie Roberts`, `Brooklyn Turner`, `Paisley Phillips`, `Audrey Campbell`, `Claire Parker`, `Skylar Evans`, `Bella Edwards`, `Lucy Collins`, `Samantha Stewart`, `Anna Sanchez`, `Leah Morris`, `Sarah Rogers`, `Nora Reed`, `Riley Cook`, `Ariana Morgan`, `Eliana Bell`, `Madelyn Murphy`, `Hailey Bailey`, `Kaylee Rivera`, `Violet Cooper`, `Penelope Richardson`, `Lillian Cox`, `Kinsley Howard`).
    3. `Username` (Unique system login handle, e.g. `std100`, `std2`, `std1`, `std3`, `std4`, `std5`, `std6`, `std7`, `std8`, `std9`, `std10`...).
    4. `Class` (Academic grade & division, e.g. `Class 5(A)`, `Class 1(A)`, `Class 2(B)`, `Class 3(C)`, `Class 4(A)`).
    5. `Father Name` (Guardian name, e.g. `Olivier Thomas`, `Edward Roy`, `William Williams`, `Michael Miller`, `David Taylor`, `James Gray`, `John Foster`, `Robert Jackson`, `Joseph Johnson`, `Charles Harris`, `Thomas Martin`, `Daniel Clark`, `Matthew Lewis`, `Anthony Walker`, `Mark Hall`, `Donald Allen`, `Steven Young`, `Paul King`, `Andrew Wright`, `Joshua Scott`, `Kenneth Green`, `Kevin Baker`, `Brian Adams`, `George Nelson`, `Timothy Carter`, `Ronald Mitchell`, `Jason Perez`, `Edward Roberts`, `Jeffrey Turner`, `Ryan Phillips`, `Jacob Campbell`, `Gary Parker`, `Nicholas Evans`, `Eric Edwards`, `Jonathan Collins`, `Stephen Stewart`, `Larry Sanchez`, `Justin Morris`, `Scott Rogers`, `Brandon Reed`, `Benjamin Cook`, `Samuel Morgan`, `Gregory Bell`, `Frank Murphy`, `Alexander Bailey`, `Raymond Rivera`, `Patrick Cooper`, `Jack Richardson`, `Dennis Cox`, `Jerry Howard`).
    6. `Mobile Number` (10-digit telephone string, e.g. `9827364521`, `8923471928`, `7812938472`, `9812739182`, `8927192837`, `7829102938`, `9871293847`, `8719283746`, `7819203948`, `9827192837`...).
    7. `Action` (Interactive toggle switch: Purple `#8E24AA` for Active accounts, Gray `#E0E0E0` for Deactivated/Suspended accounts. 1-click toggling triggers instant Redis auth cache invalidation).
  - Footer counter: `Showing 1 to 50 of 89 entries`, pagination `< 1 2 >`.

---

### 2.17. Slug: `modules` (`/admin/module`)

- **Screen Layout Structure**:
  - Centralized module availability registry partitioned by top-right audience tabs:
    - `System` (active)
    - `Student`
    - `Parent`
- **Header Title**: `Modules`
- **Table Controls & Data Columns**:
  - Quick Search filter (`Search`), page length selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns (2 Columns)**:
    1. `Name` (Official modular feature title)
    2. `Action` (Toggle switch: Green `#4CAF50` when active/visible, Gray `#CCCCCC` when deactivated/hidden).
  - **Ground Truth Seed Data (24 System Modules Codified)**:
    1. `Fees Collection` (Active - Green)
    2. `Income` (Active - Green)
    3. `Expense` (Active - Green)
    4. `Student Attendance` (Active - Green)
    5. `Examination` (Active - Green)
    6. `Download Center` (Active - Green)
    7. `Library` (Active - Green)
    8. `Inventory` (Active - Green)
    9. `Transport` (Active - Green)
    10. `Hostel` (Active - Green)
    11. `Communicate` (Active - Green)
    12. `Front CMS` (Active - Green)
    13. `Front Office` (Active - Green)
    14. `Homework` (Active - Green)
    15. `Certificate` (Active - Green)
    16. `Calendar To Do List` (Active - Green)
    17. `Online Examination` (Active - Green)
    18. `Chat` (Active - Green)
    19. `Multi Class` (Active - Green)
    20. `Online Admission` (Active - Green)
    21. `Alumni` (Active - Green)
    22. `Lesson Plan` (Active - Green)
    23. `Annual Calendar` (Active - Green)
    24. `Student CV` (Active - Green)
  - Footer counter: `Showing 1 to 24 of 24 entries`.
  - **Governance Rule**: Deactivating a module instantly unmounts it from the left sidebar navigation, removes all related routes, and returns `403 Module Disabled` on all API endpoints.

---

### 2.18. Slug: `custom-fields` (`/admin/customfield`)

- **Screen Layout Structure**:
  - Split 2-Column administrative layout:
    - **Left Column Card (`Add Custom Field`)**: Dynamic schema field constructor form.
    - **Right Column Card (`Custom Field List`)**: Expandable accordion directory partitioned by parent entities.
- **Left Column Card (`Add Custom Field`)**:
  - `Field Belongs To *`: Single-select dropdown (`Select` prompt, options: `Student`, `Staff`, `Transfer Certificate`). Mandatory.
  - `Field Type *`: Single-select dropdown (`Select` prompt, options: `Text`, `Number`, `Textarea`, `Dropdown`, `Checkbox`, `Date`). Mandatory.
  - `Field Name *`: Text input specifying display label. Mandatory.
  - `Grid (Bootstrap Column eg. 6) - Max is 12`: Text input controlling responsive layout span (prefilled default: `col-md-12`). Mandatory.
  - `Field Values (Separate By Comma)`: Text input for comma-delimited options (active when Field Type is Dropdown, Checkbox, Radio).
  - `Validation`: Checkbox control `[ ] Required`.
  - `Visibility`: Checkbox control `[ ] On Table`.
  - Action Button: Solid purple tactile button `Save` (`#8E24AA`).
- **Right Column Card (`Custom Field List`)**:
  - Expandable accordion panels with `+` expansion glyphs:
    1. `+ Student` (Contains student admission custom attributes)
    2. `+ Staff` (Contains HR directory custom attributes)
    3. `+ Transfer Certificate` (Contains document generation custom attributes)
  - Expanded view renders data table: `Field Name`, `Type`, `Belongs To`, `Validation`, `Grid Span`, `Action` (Edit, Delete).

---

### 2.19. Slug: `captcha-setting` (`/admin/captcha`)

- **Screen Layout Structure**:
  - Security bot protection ledger governing ingress authentication and intake forms.
- **Header Title**: `Captcha Setting`
- **Table Controls & Data Columns**:
  - Quick Search filter (`Search`), page length selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns (2 Columns)**:
    1. `Name` (Public/Ingress authentication gateway)
    2. `Action` (Toggle switch: Purple `#8E24AA` for Enabled, Gray `#CCCCCC` for Disabled).
  - **6 Ground Truth Ingress Points Codified**:
    1. `User login` (Enabled - Purple `#8E24AA`)
    2. `Login` (Enabled - Purple `#8E24AA`)
    3. `Admission` (Enabled - Purple `#8E24AA`)
    4. `Complain` (Enabled - Purple `#8E24AA`)
    5. `Contact Us` (Enabled - Purple `#8E24AA`)
    6. `Guest login and signup` (Enabled - Purple `#8E24AA`)
  - Footer counter: `Showing 1 to 6 of 6 entries`.

---

### 2.20. Slug: `system-fields` (`/admin/systemfield`)

- **Screen Layout Structure**:
  - Core system field visibility and requirement customization ledger partitioned by audience tabs:
    - `Student` (active)
    - `Staff`
- **Header Title**: `System Fields`
- **Table Controls & Data Columns**:
  - Quick Search filter (`Search`), page length selector (`50`), export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - **Data Table Columns (2 Columns)**:
    1. `Name` (Native schema attribute identifier)
    2. `Action` (Toggle switch: Purple `#8E24AA` for Enabled, Gray `#CCCCCC` for Disabled).
  - **Ground Truth Student Fields Codified (24+ Fields)**:
    1. `Roll Number` (Enabled - Purple)
    2. `Middle Name` (Disabled - Gray)
    3. `Last Name` (Enabled - Purple)
    4. `Category` (Enabled - Purple)
    5. `Religion` (Enabled - Purple)
    6. `Caste` (Enabled - Purple)
    7. `Mobile Number` (Enabled - Purple)
    8. `Email` (Enabled - Purple)
    9. `Admission Date` (Enabled - Purple)
    10. `Student Photo` (Enabled - Purple)
    11. `House` (Enabled - Purple)
    12. `Blood Group` (Enabled - Purple)
    13. `Height` (Enabled - Purple)
    14. `Weight` (Enabled - Purple)
    15. `Measurement Date` (Enabled - Purple)
    16. `Father Name` (Enabled - Purple)
    17. `Father Phone` (Enabled - Purple)
    18. `Father Occupation` (Enabled - Purple)
    19. `Father Photo` (Enabled - Purple)
    20. `Mother Name` (Enabled - Purple)
    21. `Mother Phone` (Enabled - Purple)
    22. `Mother Occupation` (Enabled - Purple)
    23. `Mother Photo` (Enabled - Purple)
    24. `Guardian Name` (Enabled - Purple)
  - Footer counter: `Showing 1 to 50 of 54 entries`.

---

### 2.21. Slug: `student-profile-update` (`/admin/admin/studentprofileupdate`)

- **Screen Layout Structure**:
  - Student and Parent self-service profile modification governance card partitioned by sub-navigation tabs:
    - `Student Profile Update` (active with bottom indicator line)
    - `Dashboard Setting`
- **Header Title**: `Student Profile Setting`
- **Configuration Controls**:
  - `Allow Editable Form Fields`: Toggle switch control (Default: Disabled / Gray `#CCCCCC`). When enabled, students and parents can edit allowed personal profile fields directly from their self-service portal without requiring administrative staff intervention.
  - Action Button: Solid purple tactile button `Save` (`#8E24AA`).

---

### 2.22. Slug: `online-admission` (`/admin/onlineadmission/admissionsetting`)

- **Screen Layout Structure**:
  - Comprehensive public intake parameters, online application fee gateway, and admissions terms agreement card partitioned by horizontal sub-navigation tabs:
    - `Online Admission Form Setting` (active with bottom indicator line)
    - `Online Admission Fields Setting`
- **Header Title**: `Online Admission`
- **Configuration Form Controls**:
  - `Online Admission`: Toggle switch (Enabled - Purple `#8E24AA`). Governs whether the public online application portal is open for student registrations.
  - `Online Admission Payment Option`: Toggle switch (Enabled - Purple `#8E24AA`). When enabled, applicants must settle the processing fee before application submission is finalized.
  - `Online Admission Form Fees ($)`: Numeric currency input (prefilled default: `100.00`).
  - `Upload Admission Application Form`: Drag-and-drop file upload zone (`Drag and drop a file here or click`) accompanied by a solid purple action button with download glyph to download the current PDF application template.
  - `Online Admission Instructions`: Full CKEditor rich text WYSIWYG editor (Toolbar: Source, Cut, Copy, Paste, Undo, Redo, Find, Replace, Spellcheck, Formatting styles, Typography, Lists, Colors). Prefilled Ground Truth Text:
    ```
    General Instruction:- These instructions pertain to online application for admission to Mount Carmel School for the academic year 2025-26. In the remainder of these instructions, a "Mount Carmel School".
    1. To fill online admission form, Basic Details like as (Class, First Name, Last Name, Gender, Date of Birth, Mobile Number, Email) etc.
    2. Filling in admission application form and uploading documents and then click on the Submit button.
    3. After submitting form, this will redirect you in Online Admission Review Details page where you can check your details what you have filled previously.
    ```
  - `Terms & Conditions`: Full CKEditor rich text WYSIWYG editor with complete formatting suite. Prefilled Ground Truth Text:
    ```
    General Terms & Conditions for Students:-
    1. The User declares that the content of the Portal shall be accessed and used only for the purpose of online application for admission to schools administered by MCS.
    2. Check term & condition before pay online payment, Reviewing form, checking declaration and submitting form I certify that all the information provided is true to the best of my knowledge.
    ```

---

### 2.23. Slug: `file-types` (`/admin/admin/filetype`)

- **Screen Layout Structure**:
  - Two-section whitelist security configuration card enforcing strict file extension, MIME type, and maximum upload byte thresholds across the platform.
- **Header Title**: `File Types`
- **Section 1: Setting For Files**:
  - `Allowed Extension *`: Textarea input containing comma-separated permitted document and archive extensions.
    - Ground Truth Value: `pdf, zip, jpg, jpeg, png, txt, 7z, gif, csv, docx, mp3, mp4, accdb, odt, ods, ppt, pptx, xlsx, wmv, jfif, apk, ppt, bmp, jpe, mdb, rar, xls, svg, php, html`.
  - `Allowed MIME Type *`: Textarea input containing comma-separated official IANA MIME types.
    - Ground Truth Value: `application/pdf, image/zip, image/jpg, image/png, image/jpeg, text/plain, application/x-zip-compressed, application/zip, image/gif, text/csv, application/vnd.openxmlformats-officedocument.wordprocessingml.document, audio/mpeg, application/msaccess, application/vnd.oasis.opendocument.text, application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, video/x-ms-wmv, video/mp4, image/jpeg, application/vnd.android.package-archive, application/x-msdownload, application/vnd.ms-powerpoint, image/bmp, image/jpeg, application/msaccess, application/vnd.ms-excel, image/svg+xml, image/php`.
  - `Upload Size (In Bytes) *`: Numeric byte input specifying maximum permissible file size.
    - Ground Truth Value: `100048576` (approx 100 MB).
- **Section 2: Setting For Image**:
  - `Allowed Extension *`: Textarea input for graphical image assets.
    - Ground Truth Value: `jfif, png, jpe, jpeg, jpg, bmp, gif, svg`.
  - `Allowed MIME Type *`: Textarea input for image MIME types.
    - Ground Truth Value: `image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml`.
  - `Upload Size (In Bytes) *`: Numeric byte input specifying maximum permissible image size (e.g. `10485760` / 10 MB).

---

### 2.24. Slug: `sidebar-menu` (`/admin/admin/sidebarmenu`)

- **Screen Layout Structure**:
  - Two-Column Drag-and-Drop Reordering & Visibility Manager for the Super Admin Left Sidebar.
- **Header Title**: `Sidebar Menu`
- **Left Column Card (`Menu List`)**:
  - Available inactive / unselected sidebar menu items that can be dragged into the active sidebar:
    - `Quick Fees`
    - `Thermal Print`
    - `Whatsapp Messaging`
- **Right Column Card (`Selected Sidebar Menus`)**:
  - Vertically ordered stack of active sidebar items with drag-reordering handles. Items can be dragged to change order or dragged back to `Menu List` to hide from the sidebar:
    1. `Front Office`
    2. `Student Information`
    3. `Fees Collection`
    4. `Online Course`
    5. `TFA` (Two Factor Authentication)
    6. `Behaviour Records`
    7. `Multi Branch`
    8. `Gmeet Live Classes`
    9. `Zoom Live Classes`
    10. `Income`
    11. `Expenses`
    12. `QR Code Attendance`
    13. `CBSE Examination`
    14. `Examinations`
    15. `Attendance`
    16. `Online Examinations`
    17. `Academics`
    18. `Annual Calendar`
    19. `Lesson Plan`
    20. `Human Resource`

---

### 2.25. Slug: `system-update` (`/admin/admin/updater`)

- **Screen Layout Structure**:
  - Platform Over-The-Air (OTA) version lifecycle and update inspector card.
- **Header Title**: `System Update`
- **Main Container Card**:
  - Centered Light Green Status Alert Box (`#E8F5E9` background with `#2E7D32` green text):
    - Title: `Your Smart School Version`
    - Version Badge: `7.2.0`
  - Descriptive Status Notice:
    - `ℹ You are using latest version.`
    - `Please Check Changelog For Latest Version Update.` (`Changelog` is an interactive blue hyperlink opening the platform release notes modal/page).
  - Update Trigger (when new version is available):
    - Remote artifact download progress bar.
    - One-Click Migration Runner executing automated schema migrations (`Liquibase`/`Flyway`), clearing Redis caches, and cycling background worker threads.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Core School Settings Table
CREATE TABLE system_school_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    school_name VARCHAR(255) NOT NULL,
    school_code VARCHAR(100),
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    current_session_id UUID REFERENCES academic_sessions(id),
    session_start_month INT NOT NULL CHECK (session_start_month BETWEEN 1 AND 12),
    teacher_restricted_mode BOOLEAN NOT NULL DEFAULT FALSE,
    start_day_of_week VARCHAR(20) NOT NULL DEFAULT 'Monday',
    date_format VARCHAR(30) NOT NULL DEFAULT 'mm/dd/yyyy',
    timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Kolkata',
    currency_format VARCHAR(50) NOT NULL DEFAULT '1,23,45,678.00',
    base_url TEXT NOT NULL DEFAULT 'https://demo.smart-school.in/',
    file_upload_path TEXT NOT NULL DEFAULT '/var/www/uploads',
    fee_due_days INT NOT NULL DEFAULT 7,
    admin_logo_url TEXT,
    admin_small_logo_url TEXT,
    app_logo_url TEXT,
    favicon_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Academic Sessions Table (media_1789159787935.png)
CREATE TABLE academic_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_session_branch UNIQUE (branch_id, session)
);

-- WhatsApp Cloud API & Gateway Configuration (media_1789159809716.png)
CREATE TABLE system_whatsapp_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL DEFAULT 'Meta WhatsApp Official',
    access_token TEXT NOT NULL,
    phone_number_id VARCHAR(100) NOT NULL,
    language_code VARCHAR(10) NOT NULL DEFAULT 'en',
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_whatsapp_branch_provider UNIQUE (branch_id, provider)
);

-- Multi-Gateway SMS Aggregator Settings (media_1789159820719.png)
CREATE TABLE system_sms_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    gateway_name VARCHAR(50) NOT NULL,
    username VARCHAR(100),
    password TEXT,
    api_key TEXT,
    auth_token TEXT,
    sender_number VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    extra_config JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_sms_branch_gateway UNIQUE (branch_id, gateway_name)
);

-- Granular RBAC Permissions Table
CREATE TABLE system_role_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    module_slug VARCHAR(100) NOT NULL,
    can_view BOOLEAN NOT NULL DEFAULT FALSE,
    can_add BOOLEAN NOT NULL DEFAULT FALSE,
    can_edit BOOLEAN NOT NULL DEFAULT FALSE,
    can_delete BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT uq_role_module UNIQUE (role_id, module_slug)
);

-- Payment Gateway Credentials Table
CREATE TABLE system_payment_gateways (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    gateway_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    is_sandbox BOOLEAN NOT NULL DEFAULT TRUE,
    api_key TEXT,
    secret_key TEXT,
    merchant_id TEXT,
    webhook_secret TEXT,
    extra_config JSONB,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_gateway_branch UNIQUE (branch_id, gateway_name)
);

-- Dynamic Custom Fields Table
CREATE TABLE system_custom_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    belongs_to VARCHAR(50) NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    field_type VARCHAR(30) NOT NULL CHECK (field_type IN ('Text', 'Number', 'Textarea', 'Dropdown', 'Checkbox', 'Radio', 'Date')),
    grid_weight INT NOT NULL DEFAULT 12,
    is_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_unique BOOLEAN NOT NULL DEFAULT FALSE,
    show_on_table BOOLEAN NOT NULL DEFAULT TRUE,
    print_on_document BOOLEAN NOT NULL DEFAULT FALSE,
    options JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Disaster Recovery Backup History
CREATE TABLE system_backups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    backup_type VARCHAR(20) NOT NULL CHECK (backup_type IN ('MANUAL', 'SCHEDULED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Modular Feature Switch Registry (media_1789159990565.png)
CREATE TABLE system_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    module_slug VARCHAR(100) NOT NULL,
    module_name VARCHAR(150) NOT NULL,
    target_audience VARCHAR(30) NOT NULL CHECK (target_audience IN ('SYSTEM', 'STUDENT', 'PARENT')),
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_module_audience UNIQUE (branch_id, module_slug, target_audience)
);

-- Security Ingress Captcha Configuration (media_1789160011931.png)
CREATE TABLE system_captcha_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    ingress_name VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_ingress_captcha UNIQUE (branch_id, ingress_name)
);

-- System Field Customization Ledger (media_1789160022047.png)
CREATE TABLE system_fields_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('STUDENT', 'STAFF')),
    field_identifier VARCHAR(100) NOT NULL,
    field_label VARCHAR(150) NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_entity_field UNIQUE (branch_id, entity_type, field_identifier)
);

-- Online Public Admission Governance (media_1789160050228.png)
CREATE TABLE system_online_admission_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    is_admission_open BOOLEAN NOT NULL DEFAULT TRUE,
    is_payment_required BOOLEAN NOT NULL DEFAULT TRUE,
    application_fee NUMERIC(10, 2) NOT NULL DEFAULT 100.00,
    application_form_url TEXT,
    instructions_html TEXT,
    terms_conditions_html TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Whitelist File & Image Security Policies (media_1789160061214.png)
CREATE TABLE system_file_types_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    category VARCHAR(30) NOT NULL CHECK (category IN ('FILES', 'IMAGES')),
    allowed_extensions TEXT NOT NULL,
    allowed_mime_types TEXT NOT NULL,
    max_size_bytes BIGINT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_file_category UNIQUE (branch_id, category)
);

-- Left Sidebar Dynamic Hierarchy & Reorder Table (media_1789160072193.png)
CREATE TABLE system_sidebar_menu_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    menu_slug VARCHAR(100) NOT NULL,
    menu_label VARCHAR(150) NOT NULL,
    display_order INT NOT NULL,
    is_selected BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_menu_slug UNIQUE (branch_id, menu_slug)
);

-- Fast Analytical Indexes
CREATE INDEX idx_academic_sessions_active ON academic_sessions(is_active);
CREATE INDEX idx_role_permissions_role ON system_role_permissions(role_id);
CREATE INDEX idx_custom_fields_belongs ON system_custom_fields(belongs_to);
CREATE INDEX idx_sms_settings_gateway ON system_sms_settings(gateway_name, is_active);
CREATE INDEX idx_system_modules_lookup ON system_modules(branch_id, target_audience, is_enabled);
CREATE INDEX idx_sidebar_order_display ON system_sidebar_menu_order(branch_id, is_selected, display_order);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/system-settings/general` | Retrieve global school settings | *None* | `200 OK` (School Settings Object) |
| `PUT` | `/api/v1/system-settings/general` | Update global school settings | `JSON` (School Details & Preferences) | `200 OK` (Updated Settings) |
| `GET` | `/api/v1/system-settings/sessions` | List all academic sessions | *None* | `200 OK` (Sessions List) |
| `POST` | `/api/v1/system-settings/sessions` | Create new academic session | `{"session": "2026-27"}` | `201 Created` |
| `PUT` | `/api/v1/system-settings/sessions/{id}/activate` | Activate active session | *None* | `200 OK` (`{"active": true}`) |
| `GET` | `/api/v1/system-settings/whatsapp` | Retrieve WhatsApp API credentials | *None* | `200 OK` (WhatsApp Settings Object) |
| `PUT` | `/api/v1/system-settings/whatsapp` | Update WhatsApp API credentials | `JSON` (Token, Phone ID, Language) | `200 OK` |
| `GET` | `/api/v1/system-settings/sms` | List configured SMS gateways | *None* | `200 OK` (Gateways List) |
| `PUT` | `/api/v1/system-settings/sms/{gatewayName}` | Update specific SMS gateway credentials | `JSON` (Username, Password, API Key) | `200 OK` |
| `GET` | `/api/v1/system-settings/roles` | List roles and permissions | *None* | `200 OK` (Roles & Permissions Matrix) |
| `PUT` | `/api/v1/system-settings/roles/{id}/permissions`| Update granular permissions | `{"permissions": [...]}` | `200 OK` |
| `GET` | `/api/v1/system-settings/payment-gateways` | List configured gateways | *None* | `200 OK` (Gateways Array) |
| `PUT` | `/api/v1/system-settings/payment-gateways/{name}`| Update gateway credentials | `JSON` (Keys & Active Mode) | `200 OK` |
| `GET` | `/api/v1/system-settings/users` | List user accounts by role tab | `?role=Student&page=1&limit=50` | `200 OK` (Paginated Users) |
| `PUT` | `/api/v1/system-settings/users/{id}/toggle-status` | Toggle user active/suspended state | *None* | `200 OK` (`{"active": false}`) |
| `GET` | `/api/v1/system-settings/modules` | List all modular feature switches | `?audience=SYSTEM` | `200 OK` (Modules List) |
| `PUT` | `/api/v1/system-settings/modules/{slug}/toggle` | Enable or disable system module | `{"isEnabled": true}` | `200 OK` |
| `GET` | `/api/v1/system-settings/custom-fields` | List dynamic schema custom fields | `?belongsTo=Student` | `200 OK` (Custom Fields Tree) |
| `POST` | `/api/v1/system-settings/custom-fields` | Register new dynamic custom field | `JSON` (Field Def, Type, Grid, Validation) | `201 Created` |
| `GET` | `/api/v1/system-settings/captcha` | List ingress bot protection states | *None* | `200 OK` (Captcha Ingress Array) |
| `PUT` | `/api/v1/system-settings/captcha/{name}/toggle`| Toggle captcha on specific ingress | `{"isEnabled": true}` | `200 OK` |
| `GET` | `/api/v1/system-settings/system-fields` | List core system fields visibility | `?entity=STUDENT` | `200 OK` (System Fields List) |
| `PUT` | `/api/v1/system-settings/system-fields/{id}/toggle` | Toggle system field visibility | `{"isEnabled": false}` | `200 OK` |
| `GET` | `/api/v1/system-settings/student-profile-update`| Get self-service profile editing rules | *None* | `200 OK` (`{"allowEditableFields": false}`) |
| `PUT` | `/api/v1/system-settings/student-profile-update`| Update self-service editing toggle | `{"allowEditableFields": true}` | `200 OK` |
| `GET` | `/api/v1/system-settings/online-admission` | Get public admission settings & HTML | *None* | `200 OK` (Admission Settings) |
| `PUT` | `/api/v1/system-settings/online-admission` | Update online admission configuration | `JSON` (Fees, Instructions, Terms) | `200 OK` |
| `GET` | `/api/v1/system-settings/file-types` | Get allowed extensions and MIME types | *None* | `200 OK` (File & Image Rules) |
| `PUT` | `/api/v1/system-settings/file-types` | Update whitelist extensions and size | `JSON` (Files & Images Rules) | `200 OK` |
| `GET` | `/api/v1/system-settings/sidebar-menu` | Get ordered active/inactive menu items | *None* | `200 OK` (Menu Hierarchy Tree) |
| `PUT` | `/api/v1/system-settings/sidebar-menu/reorder` | Persist reordered sidebar layout | `{"orderedSlugs": [...]}` | `200 OK` |
| `POST` | `/api/v1/system-settings/backups/create` | Trigger on-demand database dump | *None* | `202 Accepted` (`{"backupId": "uuid"}`) |
| `GET` | `/api/v1/system-settings/backups` | List database snapshots | *None* | `200 OK` (Snapshots Array) |
| `POST` | `/api/v1/system-settings/system-update/check` | Check remote OTA releases | *None* | `200 OK` (`{"current": "7.2.0", "latest": "7.2.0"}`) |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever critical platform settings, sessions, roles, or payment gateways are mutated, an immutable audit event is published to `school.system-settings.events`:

```json
{
  "eventId": "e912b012-7712-4211-88dc-91ac1241f012",
  "eventType": "school.system-settings.updated",
  "aggregateId": "settings-main-001",
  "timestamp": "2026-09-12T03:45:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN",
    "ipAddress": "114.130.157.198"
  },
  "payload": {
    "section": "GENERAL_SETTINGS",
    "mutations": {
      "timezone": "Asia/Kolkata",
      "currencyFormat": "1,23,45,678.00",
      "currentSession": "2026-27",
      "baseUrl": "https://demo.smart-school.in/",
      "fileUploadPath": "/var/www/uploads"
    }
  }
}
```
