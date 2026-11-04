# Module 23: Communicate CRUD Architecture & Omnichannel Dispatch Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Communicate** module orchestrates omnichannel institutional messaging, broadcast notifications, emergency announcements, automated login credential delivery, and event reminders across Email, SMS, and Mobile App push notifications. It provides academic deans and administrative officers with multi-mode targeting (Role Groups, Individual recipients, Class/Section cohorts, and Automated Birthday greetings), WYSIWYG rich text and DLT-registered SMS templates, scheduled dispatches, and full audit logs.

- **Module Index**: `23`
- **Legacy Route Base**: `/admin/notification`, `/admin/mailsms`
- **Modern Component Root**: `/super-admin/communicate`
- **Functional Domain**: `Omnichannel Notifications, Mass Email/SMS Gateways & Notice Board`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Mass Dispatch**: Broadcast messaging bursts (e.g., thousands of parents notified of weather emergency or fee deadlines) strictly follow Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/communicate/send-email` and `POST /api/v1/communicate/send-sms` return `HTTP 202 Accepted` with a `trackingId` and buffer jobs to Kafka topics `school.communicate.email-dispatched` and `school.communicate.sms-dispatched`).
- **DLT Regulatory Compliance**: SMS gateways support telecommunications DLT (Distributed Ledger Technology) Header IDs and Template IDs required for Indian and international SMS carriers.

---

### Complete Slug Inventory & Route Mapping

The Communicate module comprises **8 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `notice-board` | `/admin/notification` | `/super-admin/communicate/notice-board` | Message List Feed + Batch Purge | `communication_notices` | `+ Post New Message`, `Delete Notice Board`, View Notice, Filter Audience |
| **02** | `send-email` | `/admin/mailsms/compose` | `/super-admin/communicate/send-email` | 4-Mode Tabbed Composer + Target Matrix | `communication_logs` | Select Group/Individual/Class/Birthday, Pick Template, Compose WYSIWYG, Send Now / Schedule |
| **03** | `send-sms` | `/admin/mailsms/sms` | `/super-admin/communicate/send-sms` | 4-Mode Tabbed SMS Composer | `communication_logs` | SMS vs Mobile App Push toggle, DLT Template ID, Real-time Char Counter, Send/Schedule |
| **04** | `email-sms-log` | `/admin/mailsms/index` | `/super-admin/communicate/email-sms-log` | Multi-Channel Audit Ledger | `communication_logs` | `Delete Email Sms Log`, Audit Title/Desc/Date/Channel/Mode, View Details |
| **05** | `schedule-email-sms-log` | `/admin/mailsms/schedule` | `/super-admin/communicate/schedule-log` | Queued Scheduled Dispatch Ledger | `communication_logs` | Audit Pending Scheduled Messages, Cancel Dispatch, Reschedule Date |
| **06** | `login-credentials-send` | `/admin/mailsms/credential` | `/super-admin/communicate/login-credentials`| Role/Class Filter + Batch Dispatch | `staff` / `students` | Bulk Reset & Dispatch Usernames & Passwords via Email/SMS |
| **07** | `email-template` | `/admin/emailconfig/emailtemplate` | `/super-admin/communicate/email-template` | Split 2-Column (Pattern B) | `communication_email_templates` | Create HTML Template, Bind Dynamic Variables (`{name}`, `{fee}`), Edit, Delete |
| **08** | `sms-template` | `/admin/smsconfig/smstemplate` | `/super-admin/communicate/sms-template` | Split 2-Column (Pattern B) | `communication_sms_templates` | Create DLT Template, Set Character Limits, Edit, Delete |

---

### 1. Slug `notice-board`: Broadcast Announcements & News Feed

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Notice Board`
- **Top Actions**:
  - `+ Post New Message` (Solid purple tactile button, launches composer modal).
  - `Delete Notice Board` (Solid blue/purple button for bulk purging archived bulletins).
- **Notice Feed Grid**:
  - Clean vertical stack of announcement cards with mail icon glyph on left and sortable blue link titles:
    - `Fee Submission Reminder`
    - `Notice for new Book collection`
    - `Extra class for Std - X to XII`
    - `Parent-Teacher Meeting`
    - `Online Learning Notice`
    - `Student Health Check-up`
    - `PTM`
    - `Staff Meeting`

#### B. `+ Post New Message` Modal Schema
| Field Label | Field Name | Input Type | Validation & Options |
|:---|:---|:---|:---|
| **Title \*** | `title` | `TEXT_INPUT` | Required announcement title. |
| **Notice Date \*** | `notice_date` | `DATEPICKER` | Issuance date (default: today). |
| **Publish On \*** | `publish_on` | `DATEPICKER` | Scheduled visibility start date. |
| **Message \*** | `message` | `WYSIWYG` | Rich text formatted announcement body. |
| **Message To \*** | `target_roles` | `MULTI_CHECKBOX` | Required audience selection:<br>• `[ ] Students`<br>• `[ ] Guardians`<br>• `[ ] Admin`<br>• `[ ] Teacher`<br>• `[ ] Accountant`<br>• `[ ] Librarian`<br>• `[ ] Receptionist` |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right purple tactile button. |

---

### 2. Slug `send-email`: Omnichannel Email Campaign Studio

#### A. Screen Architecture & Visual Layout
4-Mode Top Navigation Tab Bar + Asymmetric Split Composer (70% Editor / 30% Target Matrix):
- **Top Right Mode Tabs**:
  - `Group` (Active default tab)
  - `Individual` (Searchable recipient multi-select chips)
  - `Class` (Cascading Class & Section target dropdowns)
  - `Today's Birthday` (Automated daily birthday cohort filter)
- **Left Column Form (~70% width)**:
  - `Email Template`: Single-select dropdown populated from `communication_email_templates`.
  - `Title *`: Text input with active purple focus outline.
  - `Attachment`: Drag-and-drop file dropzone (`cloud_upload Drag and drop a file here or click`).
  - `Message *`: Full WYSIWYG CKEditor toolbar (Source, Format, Font, Size, Bold, Italic, Tables, Links, Images).
- **Right Column Target Matrix (~30% width)**:
  - Header: `Message To *` (Required checkboxes):
    - `[ ] Students`
    - `[ ] Guardians`
    - `[ ] Admin`
    - `[ ] Teacher`
    - `[ ] Accountant`
    - `[ ] Librarian`
    - `[ ] Receptionist`
- **Bottom Dispatch Toolbar**:
  - Radio options: `(o) Send Now` vs `( ) Schedule` (renders datetime picker when checked).
  - `Submit` button: Purple tactile trigger with send paper plane glyph.

---

### 3. Slug `send-sms`: Multi-Gateway SMS & Push Notification Engine

#### A. Screen Architecture & Visual Layout
4-Mode Top Navigation Tab Bar (`Group`, `Individual`, `Class`, `Today's Birthday`) + Dual-Column Layout:
- **Left Column Form (~70% width)**:
  - `SMS Template`: Single-select dropdown selector.
  - `Title *`: Text input with active purple focus outline.
  - `Send Through *`: Required multi-select checkboxes:
    - `[ ] SMS` (Telecom GSM gateway)
    - `[ ] Mobile App` (FCM Push Notification to Android / iOS apps)
  - `SMS Template ID (This field is required Only For Indian SMS Gateway)`: Regulatory DLT template registration code.
  - `Message *`: Plain textarea.
  - Real-Time Counter: Bottom-right label `Character Count: 0` (calculates 160-char SMS segment boundaries).
- **Right Column Target Matrix (~30% width)**:
  - `Message To *`: Audience checkboxes (`Students`, `Guardians`, `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist`).
- **Bottom Dispatch Toolbar**:
  - Radio selector: `(o) Send Now` vs `( ) Schedule`.
  - `Submit` button: Purple tactile send button.

---

### 4. Slug `email-sms-log`: Centralized Transmission Audit Ledger

#### A. Screen Architecture & Visual Layout
- **Top Actions**: `Delete Email Sms Log` (Purple/blue batch purging trigger).
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).

#### B. Master Data Table Schema (`communication_logs`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Exact Screen Records Sample |
|:---|:---|:---|:---|:---|
| **Title** | `title` | `VARCHAR(255)` | Message subject line. | `Sports Day Events`, `National Republic Day`, `Annual Day Celebration`, `International Yoga Day`, `Online Classes`. |
| **Description** | `description` | `TEXT` | Snippet of body message text. | *Games that are played on school sports days...* |
| **Date** | `dispatched_at` | `TIMESTAMP` | Formatted `MM/DD/YYYY HH:MM a`. | `01/22/2026 02:50 pm`, `01/06/2026 01:15 pm`. |
| **Schedule Date**| `scheduled_at` | `TIMESTAMP` | Populated if queued for future run. | `01/22/2026 01:47 pm`, `12/02/2025 03:39 pm`. |
| **Email** | `is_email` | `BOOLEAN` | Checkbox icon indicator if channel active. | Checked box or empty. |
| **SMS** | `is_sms` | `BOOLEAN` | Checkbox icon indicator if channel active. | Checked box or empty. |
| **Group** | `is_group` | `BOOLEAN` | Checkbox icon indicator if sent to group. | Checked box or empty. |
| **Individual** | `is_individual` | `BOOLEAN` | Checkbox icon indicator if targeted. | Checked box or empty. |
| **Class** | `is_class` | `BOOLEAN` | Checkbox icon indicator if cohort targeted. | Checked box or empty. |
| **Action** | *Controls* | `ACTIONS` | Purple tactile button with details menu glyph (`view_headline`). |

---

---

### 5. Slug `schedule-email-sms-log`: Queued Scheduled Dispatch Ledger

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Schedule Email SMS Log`
- **Active Navigation**: `Communicate` -> `Schedule Email SMS Log`
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50` records
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`

#### B. Master Data Table Schema (`communication_logs` with `scheduled_at IS NOT NULL`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Title** | `title` | `VARCHAR(255)` | Sortable message campaign subject line. | `Online Classes`, `New Academic admission start (2025-26)`, `International Yoga Day`, `Annual Day Celebration`, `Sports Day Events`. |
| **Message** | `message` | `TEXT` | Full body text snippet of scheduled notification. | *Be very punctual in log in time...*, *NEW ADMISSIONS FOR THE NEXT SESSION...*, *International Yoga Day...* |
| **Date** | `created_at` | `TIMESTAMP` | Sortable creation timestamp formatted `MM/DD/YYYY hh:mm a`. | `02/04/2025 06:02 pm`, `04/04/2025 01:27 pm`, `06/03/2025 03:33 pm`, `01/06/2026 01:15 pm`, `01/22/2026 02:48 pm`. |
| **Schedule Date** | `scheduled_at` | `TIMESTAMP` | Sortable target dispatch timestamp formatted `MM/DD/YYYY hh:mm a`. | `02/12/2025 05:02 pm`, `04/05/2025 11:27 am`, `06/21/2025 07:00 am`, `12/02/2025 03:39 pm`, `01/22/2026 01:47 pm`. |
| **Email** | `is_email` | `BOOLEAN` | Sortable column with checkbox glyph `[x]` when routed via SMTP. | Checked (`[x]`) for rows 1 to 4; empty for row 5. |
| **SMS** | `is_sms` | `BOOLEAN` | Sortable column with checkbox glyph `[x]` when routed via GSM SMS gateway. | Checked (`[x]`) for row 5 (`Sports Day Events`); empty for rows 1 to 4. |
| **Group** | `is_group` | `BOOLEAN` | Sortable column with checkbox glyph `[x]` when targeted to role groups. | Checked (`[x]`) for rows 1, 2, 3, 5. |
| **Individual** | `is_individual` | `BOOLEAN` | Sortable column with checkbox glyph `[x]` when targeted to individual accounts. | Empty across all 5 ground truth rows. |
| **Class** | `is_class` | `BOOLEAN` | Sortable column with checkbox glyph `[x]` when targeted to class cohorts. | Checked (`[x]`) for row 4 (`Annual Day Celebration`). |
| **Action** | *Controls* | `ACTIONS` | Dual purple tactile buttons per row:<br>1. **View Details** (Purple button with horizontal list glyph `view_headline`)<br>2. **Delete / Cancel** (Purple button with trash glyph `delete`). | Both action triggers rendered on every row. |

- **Pagination & Footer**: `Showing 1 to 5 of 5 entries.` with `< [ 1 ] >` page controls.

---

### 6. Slug `login-credentials-send`: Batch User Authentication Dispatch Desk

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Select Criteria`
- **Active Navigation**: `Communicate` -> `Login Credentials Send`
- **Criteria Filter Card**:
  - `Class *`: Required dropdown selector with active purple outline (`rgba(142, 36, 170, 0.6)`), placeholder `Select`.
  - `Section`: Optional single-select dropdown selector, placeholder `Select`.
  - `Search` button: Purple tactile trigger (`#8E24AA`) with search magnifying glass glyph.

#### B. Results Table & Bulk Dispatch Workflow
- Renders student/guardian roster for the selected Class & Section:
  - Checkbox column for individual or "Select All" targeting.
  - Columns: `Admission No`, `Student Name`, `Class`, `Section`, `Email`, `Mobile Number`, `Last Sent Date`.
  - Bottom Action Toolbar:
    - Target Channel Selector: `[ ] Email` and/or `[ ] SMS`.
    - `Send Credentials` button: Purple tactile trigger triggering asynchronous token regeneration and delivery via `school.communicate.credentials-dispatched` Kafka event.

---

### 7. Slug `email-template`: Institutional HTML Email Template Studio

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Email Template List`
- **Active Navigation**: `Communicate` -> `Email Template` (Route: `/admin/mailsms/email_template`)
- **Top Action**:
  - `+ Add` button: Solid purple tactile button (`#8E24AA`) in top-right header, opens modal/editor to create a new template.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`

#### B. Master Data Table Schema (`communication_email_templates`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Title** | `title` | `VARCHAR(255)` | Sortable template title. | `Sports Day Events`, `National Republic Day`, `Annual Day Celebration`, `Summer Vacation`, `International Day of Yoga`, `Independence Day Celebration!!!!! Notification`, `Teacher Day Celebration`, `Dussehra Celebration`, `Children's day`, `Online Classes`, `New Academic admission start (2025-26)`, `International Yoga Day`, `Summer vacation`. |
| **Message** | `body_html` | `TEXT` | Sortable preview snippet of template body text. | *Games that are played on school sports days...*, *India celebrated its 73rd National Republic Day...*, *A day in School - In this theme the program can showcase...* |
| **Action** | *Controls* | `ACTIONS` | Three purple tactile buttons per row:<br>1. **Download / Attachment Preview** (Purple button with download tray glyph `download`)<br>2. **Edit** (Purple button with pencil glyph `edit`)<br>3. **Delete** (Purple button with cross glyph `close` / `delete`). | All 3 triggers rendered across every template record. |

- **Hover URL**: `https://demo.smart-school.in/admin/mailsms/email_template#`

---

### 8. Slug `sms-template`: DLT Carrier-Compliant SMS Template Studio

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `SMS Template List`
- **Active Navigation**: `Communicate` -> `SMS Template`
- **Top Action**:
  - `+ Add` button: Solid purple tactile button (`#8E24AA`) in top-right header, launches modal to register a new SMS template.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`

#### B. Master Data Table Schema (`communication_sms_templates`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Title** | `title` | `VARCHAR(255)` | Sortable SMS template identifier. | `Sports Day Events`, `Independence Day`, `New Academic Session(2023-24)`, `Online Classes`, `International Day of Yoga`, `Independence Day Celebration!!!!!`, `Teacher's Day Celebration`, `Republic Day Celebration`. |
| **Message** | `body_text` | `TEXT` | Sortable plain text SMS body. | *Games that are played on school sports days...*, *I cordially invite you to the 76th independence day...*, *The Central Board of Secondary Education (CBSE) will begin...* |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons per row:<br>1. **Edit** (Purple button with pencil glyph `edit`)<br>2. **Delete** (Purple button with cross glyph `close` / `delete`). | Both buttons rendered across all 8 records. |

- **Pagination & Footer**: `Showing 1 to 8 of 8 entries.` with `< [ 1 ] >` page controls.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Notice Board Announcements
CREATE TABLE communication_notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    title VARCHAR(255) NOT NULL,
    notice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    publish_on DATE NOT NULL DEFAULT CURRENT_DATE,
    message TEXT NOT NULL,
    target_roles JSONB NOT NULL, -- Array: ["STUDENT", "GUARDIAN", "TEACHER"]
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE communication_notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_communication_notices ON communication_notices
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 2. Transmission Logs
CREATE TYPE dispatch_mode_enum AS ENUM ('GROUP', 'INDIVIDUAL', 'CLASS', 'BIRTHDAY');
CREATE TYPE dispatch_status_enum AS ENUM ('PENDING', 'SENT', 'SCHEDULED', 'FAILED');

CREATE TABLE communication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    mode dispatch_mode_enum NOT NULL DEFAULT 'GROUP',
    is_email BOOLEAN NOT NULL DEFAULT FALSE,
    is_sms BOOLEAN NOT NULL DEFAULT FALSE,
    is_push_notification BOOLEAN NOT NULL DEFAULT FALSE,
    is_group BOOLEAN NOT NULL DEFAULT FALSE,
    is_individual BOOLEAN NOT NULL DEFAULT FALSE,
    is_class BOOLEAN NOT NULL DEFAULT FALSE,
    target_recipients JSONB, -- Array of user IDs, emails, or phone numbers
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    status dispatch_status_enum NOT NULL DEFAULT 'SENT',
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_communication_logs ON communication_logs
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 3. Templates Master
CREATE TABLE communication_email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body_html TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE communication_sms_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    template_id_dlt VARCHAR(100),
    body_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE communication_email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_sms_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY rls_email_templates ON communication_email_templates
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
CREATE POLICY rls_sms_templates ON communication_sms_templates
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. High-Velocity Mass Email Dispatch (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/communicate/send-email`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted` with `trackingId`.
- **Payload**:
```json
{
  "mode": "GROUP",
  "templateId": "9b8a7c6d-5e4f-3a2b-1c0d-e4f5a6b7c8d9",
  "title": "Sports Day Events",
  "message": "<p>Games that are played on school sports days can be wide and varied...</p>",
  "targetRoles": ["STUDENT", "GUARDIAN"],
  "isScheduled": false,
  "scheduledAt": null
}
```

#### 2. High-Velocity Mass SMS & Push Dispatch (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/communicate/send-sms`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted` with `trackingId`.
- **Payload**:
```json
{
  "mode": "GROUP",
  "title": "Fee Submission Reminder",
  "sendThroughSms": true,
  "sendThroughMobileApp": true,
  "dltTemplateId": "110716182938475",
  "message": "Dear Parent, this is a reminder that tuition fees for September 2026 are due on 15-Sep-2026.",
  "targetRoles": ["GUARDIAN"],
  "isScheduled": false
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.communicate.email-dispatched`
- **Partition Key**: `{branchId}#{mode}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
    "eventType": "school.communicate.email-dispatched",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T12:00:00.000Z",
    "correlationId": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    "version": "1.0.0"
  },
  "payload": {
    "logId": "a1b2c3d4-5678-90ef-1234-567890abcdef",
    "title": "Sports Day Events",
    "mode": "GROUP",
    "targetRoles": ["STUDENT", "GUARDIAN"],
    "recipientCount": 1250,
    "hasAttachment": false
  }
}
```
