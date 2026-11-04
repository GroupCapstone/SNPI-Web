# Front Office Module — Complete Functional & CRUD Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Architectural Layout Patterns

The Front Office module implements two distinct enterprise UI layout paradigms:

1. **Pattern A: Full-Width Grid + Pop-up Modal Form**
   - Used for high-attribute, multi-field workflows with complex filtering.
   - Features: Top multi-select criteria filter bar, full-width data grid, and 3-column modal dialog for creation/editing.
   - **Applied to**: `Admission Enquiry`, `Visitor Book`.

2. **Pattern B: Split Two-Column (Side-by-Side) In-Place Form & Data Grid**
   - Used for rapid front-desk entry without opening modal overlays.
   - Features: Persistent `Add / Edit Form Card` on the left (~30-35% width) and `List / Data Table Card` on the right (~65-70% width).
   - **Applied to**: `Phone Call Log`, `Postal Dispatch`, `Postal Receive`, `Complain`.

3. **Pattern C: Three-Column Master-Detail Dictionary Setup**
   - Used for managing system lookup dictionaries.
   - Features: Vertical category tab selector on the far left, in-place create/edit form in the middle, and category lookup table on the right.
   - **Applied to**: `Setup Front Office` (`Purpose`, `Complaint Type`, `Source`, `Reference`).

---

### Global Data Grid Standards (Present Across All Tables)

Every data grid in the Front Office module MUST have the following built-in controls:
- **Global Search Field**: Text search filtering rows dynamically across all textual columns.
- **Page Size Selector**: Dropdown options: `25`, `50` (default), `100`, `All`.
- **Export Utility Toolbar**:
  - `Copy`: Copies visible table rows to clipboard.
  - `Excel`: Exports data to `.xlsx`.
  - `CSV`: Exports data to comma-separated text.
  - `PDF`: Generates formatted PDF report.
  - `Print`: Launches browser print dialog.
  - `Column Visibility`: Toggle visibility of individual columns.
- **Row Action Button Group**:
  - `View / Details`: Inspect detailed record, history log, or preview attached file.
  - `Edit`: Populates the form (or opens modal) with existing record for editing.
  - `Delete`: Prompts confirmation dialog to delete/soft-delete the record.
- **Pagination Footer**: `Showing X to Y of Z entries` with numbered page buttons.

---

### Slug 01: Admission Enquiry (`/front-office/admission-enquiry`)
*Layout Pattern A: Filter Bar + Full-Width Table + Modal Dialog*

#### 1. Top Criteria Filter Bar ("Select Criteria")
- `Class`: Dropdown (Select target grade level)
- `Source`: Dropdown (Filter by origin: Online Front Site, Advertisement, Admission Campaign, Front Office)
- `Enquiry Date Range`: Date Pickers (`From Date`, `To Date`)
- `Status`: Dropdown (`Active`, `Passive`, `Dead`, `Won`, `Lost`)
- `Search` Button: Executes query against filters.

#### 2. Table Header & Columns
- Header: Title `Admission Enquiry` + `+ Add` button.
- Columns:
  1. `Name`: Candidate full name
  2. `Phone`: Contact telephone number
  3. `Source`: Campaign or channel of origin
  4. `Enquiry Date`: Date inquiry was received (`DD/MM/YYYY`)
  5. `Last Follow Up Date`: Date of most recent communication
  6. `Next Follow Up Date`: Scheduled next contact date
  7. `Status`: Operational status badge (`Active`, `Won`, `Lost`, `Passive`)
  8. `Action`: Call / Follow-up history log, Edit, Delete

#### 3. Modal Form: "Admission Enquiry"
- **3-Column Input Grid**:
  - `Name *`: Mandatory text input (max 120 chars)
  - `Phone *`: Mandatory telephone input
  - `Email`: Optional email input
  - `Address`: Optional text input
  - `Description`: Optional brief summary of parent inquiry
  - `Note`: Optional internal counselor remarks
  - `Date *`: Mandatory enquiry date (defaults to current date)
  - `Next Follow Up Date *`: Mandatory scheduled follow-up date
  - `Assigned`: Staff selector dropdown (assigned counselor/admissions officer)
  - `Reference`: Dropdown (referrer name/channel)
  - `Source *`: Mandatory dropdown (Online Front Site, Advertisement, Campaign, Walk-In)
  - `Class`: Dropdown (target grade/class)
  - `Number Of Child`: Number input (integer, default 1)
- **Action**: `Save` button.

---

### Slug 02: Visitor Book (`/front-office/visitor-book`)
*Layout Pattern A: Full-Width Table + Modal Dialog*

#### 1. Table Header & Columns
- Header: Title `Visitor List` + `+ Add` button.
- Columns:
  1. `Purpose`: Purpose of visit (`School Events`, `Principal Meeting`, `Staff Meeting`, `Student Meeting`, `Parent Teacher Meeting`, `Marketing`)
  2. `Meeting With`: Target person formatted as `Staff (Name - ID)` or `Student (Name - ID)`
  3. `Visitor Name`: Full name of guest
  4. `Phone`: Contact telephone
  5. `ID Card`: National identity number / passport number
  6. `Number Of Person`: Total count of visitors in party
  7. `Date`: Visit date (`DD/MM/YYYY`)
  8. `In Time`: Entry time (`hh:mm A`)
  9. `Out Time`: Departure time (`hh:mm A`)
  10. `Action`: View Visitor Pass, Edit/Check-Out, Delete

#### 2. Modal Form: "Add Visitor"
- **3-Column Input Grid**:
  - `Purpose *`: Mandatory dropdown (linked to Front Office Purpose dictionary)
  - `Meeting With *`: Mandatory searchable selector (`Staff` or `Student`)
  - `Visitor Name *`: Mandatory text input
  - `Phone`: Contact telephone
  - `ID Card`: Government ID / Passport
  - `Number Of Person`: Total party size (integer, default 1)
  - `Date *`: Mandatory date of visit (defaults to current date)
  - `In Time`: Time picker (defaults to current time `hh:mm A`)
  - `Out Time`: Time picker (`hh:mm A`)
  - `Attach Document`: Drag-and-drop file upload zone (supports PDF, JPG, PNG)
  - `Note`: Multi-line textarea for gate notes or security remarks
- **Action**: `Save` button (persists visit and generates visitor pass).

---

### Slug 03: Phone Call Log (`/front-office/phone-call-log`)
*Layout Pattern B: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Phone Call Log"
- `Name`: Text input (Name of caller or recipient)
- `Phone *`: Mandatory telephone number
- `Date *`: Mandatory call date (defaults to current date)
- `Description`: Textarea (Summary of conversation)
- `Next Follow Up Date`: Date picker (Optional scheduled next call)
- `Call Duration`: Text input (Duration in minutes/seconds e.g. "05:30")
- `Note`: Textarea (Internal staff action notes)
- `Call Type *`: Mandatory Radio button selector (`Incoming` / `Outgoing`)
- **Action**: `Save` button.

#### 2. Right Card: "Phone Call Log List"
- Global Search, Page Size `50`, Export Toolbar (Copy, Excel, CSV, PDF, Print).
- Columns:
  1. `Name`: Caller/Recipient name
  2. `Phone`: Telephone number
  3. `Date`: Call date
  4. `Next Follow Up Date`: Next action date
  5. `Call Type`: Badge (`Incoming` / `Outgoing`)
  6. `Action`: View Details, Edit, Delete

---

### Slug 04: Postal Dispatch (`/front-office/postal-dispatch`)
*Layout Pattern B: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Postal Dispatch"
- `To Title *`: Mandatory recipient organization/name
- `Reference No`: Dispatch reference / consignment / tracking number
- `Address`: Textarea (Delivery postal address)
- `Note`: Textarea (Internal notes/instructions)
- `From Title`: Sender name/department
- `Date`: Date of dispatch (defaults to current date)
- `Attach Document`: Drag-and-drop file upload zone (Courier receipt / proof of post)
- **Action**: `Save` button.

#### 2. Right Card: "Postal Dispatch List"
- Global Search, Page Size `50`, Export Toolbar.
- Columns:
  1. `To Title`: Recipient title
  2. `Reference No`: Tracking/Reference code
  3. `From Title`: Sender department/person
  4. `Date`: Dispatch date
  5. `Action`: Download/View Attachment, Edit, Delete

---

### Slug 05: Postal Receive (`/front-office/postal-receive`)
*Layout Pattern B: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Postal Receive"
- `From Title *`: Mandatory sender name/organization
- `Reference No`: Inbound parcel/tracking reference number
- `Address`: Textarea (Sender address)
- `Note`: Textarea (Description of contents / handling instructions)
- `To Title`: Recipient staff member or institutional department
- `Date`: Date received (defaults to current date)
- `Attach Document`: Drag-and-drop file upload zone (Delivery acknowledgment slip / scan)
- **Action**: `Save` button.

#### 2. Right Card: "Postal Receive List"
- Global Search, Page Size `50`, Export Toolbar.
- Columns:
  1. `From Title`: Sender
  2. `Reference No`: Reference/Consignment code
  3. `To Title`: Internal recipient staff/department
  4. `Date`: Received date
  5. `Action`: Download/View Attachment, Edit, Delete

---

### Slug 06: Complain (`/front-office/complain`)
*Layout Pattern B: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Complain"
- `Complaint Type`: Dropdown selector (Front Office, Hostel, Transport, Sports, Teacher, Study, Fees, etc.)
- `Source`: Dropdown selector (Walk-in, Phone, Email, Online Form)
- `Complain By *`: Mandatory complainant full name
- `Phone`: Contact telephone number
- `Date`: Date of complaint filing (defaults to current date)
- `Description`: Textarea (Detailed grievance statement)
- `Action Taken`: Textarea (Remedial actions taken by administration)
- `Assigned`: Dropdown selector (Staff member assigned to investigate/resolve)
- `Note`: Textarea (Administrative follow-up notes)
- `Attach Document`: Drag-and-drop file upload zone (Supporting evidence, photos, documents)
- **Action**: `Save` button.

#### 2. Right Card: "Complaint List"
- Global Search, Page Size `50`, Export Toolbar.
- Columns:
  1. `Complain #`: Auto-incrementing complaint reference number (e.g. `417`)
  2. `Complaint Type`: Category tag
  3. `Name`: Complainant name
  4. `Phone`: Contact phone
  5. `Date`: Filing date
  6. `Action`: View full complaint & action taken log, Edit, Delete

---

### Slug 07: Setup Front Office (`/front-office/setup`)
*Layout Pattern C: 3-Column Master-Detail Dictionary Setup*

#### 1. Left Vertical Tab Navigation
- Four category selector tabs:
  1. `Purpose` (Active by default)
  2. `Complaint Type`
  3. `Source`
  4. `Reference`

#### 2. Middle Card: "Add [Category]"
- Dynamic form adapting to the selected left tab:
  - When `Purpose` selected &rarr; Fields: `Purpose *` (Text input), `Description` (Textarea).
  - When `Complaint Type` selected &rarr; Fields: `Complaint Type *` (Text input), `Description` (Textarea).
  - When `Source` selected &rarr; Fields: `Source *` (Text input), `Description` (Textarea).
  - When `Reference` selected &rarr; Fields: `Reference *` (Text input), `Description` (Textarea).
- **Action**: `Save` button.

#### 3. Right Card: "[Category] List"
- Data grid displaying active records for the selected dictionary category.
- Global Search, Page Size `50`, Export Toolbar.
- Columns:
  1. `[Category Name]` (e.g., Purpose name: Marketing, Parent Teacher Meeting, Student Meeting, Staff Meeting, Principal Meeting, School Events, Curriculum Enrichment)
  2. `Description`
  3. `Action`: Edit, Delete
- Pagination footer: `Showing 1 to N of N entries`.

---

### Summary Table of Front Office Functional Requirements

| Slug | Layout Pattern | Input Fields Count | File Upload | Primary Output / Action |
|:---|:---:|:---:|:---:|:---|
| **`admission-enquiry`** | Pattern A (Modal) | 13 fields | No | Student lead pipeline & follow-up scheduler |
| **`visitor-book`** | Pattern A (Modal) | 11 fields | Yes | Gate visitor badge & entry/exit time tracker |
| **`phone-call-log`** | Pattern B (Split 2-Col) | 8 fields | No | Incoming/Outgoing communication call log |
| **`postal-dispatch`** | Pattern B (Split 2-Col) | 7 fields | Yes | Outgoing legal/courier mail tracking |
| **`postal-receive`** | Pattern B (Split 2-Col) | 7 fields | Yes | Incoming mail delivery & staff routing |
| **`complain`** | Pattern B (Split 2-Col) | 10 fields | Yes | Grievance redressal pipeline with action log |
| **`setup-front-office`** | Pattern C (3-Col Tab) | 2 fields per tab | No | Master dictionary setup for 4 lookup categories |
