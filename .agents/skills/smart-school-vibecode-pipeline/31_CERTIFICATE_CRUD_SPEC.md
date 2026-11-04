# Module 31: Certificate CRUD Architecture & Credential Design Specification

## 1. Domain Overview & Taxonomy

The **Certificate** domain manages institutional credentials, formal academic certifications (e.g., Transfer Certificates, Character Certificates, Merit Awards), and physical/digital identification badges for students and staff. It provides visual layout builders, dynamic merge tag engines (`[name]`, `[dob]`, `[admission_no]`), credential generation pipelines, and printable PDF batch rendering.

```
/super-admin/certificate or /admin/certificate
├── /transfer-certificate     (Transfer Certificate - Formal school leaving certification, dues clearance, conduct)
├── /student-certificate      (Student Certificate - Visual certificate designer, dynamic tokens, dimensions)
├── /generate-certificate     (Generate Certificate - Cohort filtering, multi-select roster, batch PDF rendering)
├── /student-id-card          (Student ID Card - Template builder, logo/signature assets, layout toggles)
├── /generate-id-card         (Generate ID Card - Class/Section criteria filtering, batch badge generation)
├── /staff-id-card            (Staff ID Card - Employee badge designer, departmental fields, QR integration)
└── /generate-staff-id-card   (Generate Staff ID Card - Role-based filtering, batch credential rendering)
```

---

## 2. Exhaustive Slug Specifications

### 2.1. Slug: `transfer-certificate` (`/super-admin/transfer-certificate` or `/admin/certificate/transfercertificate`)

- **Screen Layout Structure**:
  - **Top Section**: Criteria Filter Card (`Select Criteria`: `Class *`, `Section`, `Admission No`, `Search` button).
  - **Bottom Section**: Transfer Certificate Clearance & Issuance Ledger.
- **Issuance Controls & Form Fields**:
  - `Student Admission No`: Autocomplete/selection identifier.
  - `Leaving Reason *`: Dropdown / text input (e.g. `Parent Transfer`, `Higher Studies`, `Course Completed`, `Relocation`). Mandatory.
  - `Dues Clearance Status`: System verification tag (`Clear` / `Fees Pending`).
  - `Conduct & Character Rating`: Dropdown (`Excellent`, `Good`, `Satisfactory`).
  - `Date of Application` & `Date of Issue`: Date pickers.
  - `Generate TC` Button: Compiles formal statutory School Leaving Certificate with seal and QR verification.

### 2.2. Slug: `student-certificate` (`/super-admin/student-certificate` or `/admin/certificate/studentcertificate`)

- **Screen Layout Structure**:
  - **Split 2-Column Responsive Layout**:
    - **Left Column (40% width)**: "Add Student Certificate" Layout Engine Card.
    - **Right Column (60% width)**: "Student Certificate List" Template Repository Card.
- **Form Controls & Constraints (Add Student Certificate)**:
  - `Certificate Name *`: Alphanumeric text input (e.g. `Sample Transfer Certificate`, `Merit Award Certificate`). Mandatory.
  - `Header Left Text`: Text input for institution registration or ISO certification numbers. Optional.
  - `Header Center Text`: Text input for top header titles or ceremonial headings. Optional.
  - `Header Right Text`: Text input for serial numbers, date issuance labels. Optional.
  - `Body Text *`: Multi-line rich textarea containing template body text with dynamic interpolations. Mandatory.
  - **Dynamic Merge Tag Registry**:
    `[name]`, `[dob]`, `[present_address]`, `[guardian]`, `[created_at]`, `[admission_no]`, `[roll_no]`, `[class]`, `[section]`, `[gender]`, `[admission_date]`, `[category]`, `[cast]`, `[father_name]`, `[mother_name]`, `[religion]`, `[email]`, `[phone]`, `[present_date]`, `[Medical History]`.
  - `Footer Left Text`: Text input for Class Teacher signature line or institutional motto. Optional.
  - `Footer Center Text`: Text input for Registrar / Seal validation. Optional.
  - `Footer Right Text`: Text input for Principal / Headmaster signature placeholder. Optional.
  - **Certificate Design Dimensions Grid**:
    - `Header Height`: Numeric input in millimeters (mm) or points (pt).
    - `Footer Height`: Numeric input in mm or pt.
    - `Body Height`: Numeric input in mm or pt.
    - `Body Width`: Numeric input in mm or pt.
  - `Student Photo`: Interactive binary toggle switch (`OFF` / `ON`), controls whether passport photo is embedded in the certificate.
  - `Background Image`: Drag-and-drop file upload zone for formal bordered watermarked certificate templates.
  - `Save` Button: Solid primary button (`#6366f1` / `#7c3aed`).
- **Table Controls & Data Display (Student Certificate List)**:
  - Search, page size (50), export tools (Copy, Excel, CSV, PDF, Print, Column Visibility).
  - **Columns**:
    1. `Certificate Name` (String, sortable, e.g. `Sample Transfer Certificate`)
    2. `Background Image` (Image thumbnail preview)
    3. `Action` (Control strip: View preview modal [menu icon], Edit [pencil], Delete [cross])
  - **Ground Truth Seeded Records**:
    - `Sample Transfer Certificate` | Bordered parchment background thumbnail | Actions (View, Edit, Delete)
  - **Pagination & Counter**: `Showing 1 to 1 of 1 entry`, page button `< 1 >`.

---

### 2.3. Slug: `generate-certificate` (`/super-admin/generate-certificate` or `/admin/generatecertificate/search`)

- **Screen Layout Structure**:
  - **Top Section**: "Select Criteria" Cohort Filter Card.
  - **Bottom Section (Post-Query)**: Student Roster Interactive Selection Table & Batch Action Strip.
- **Form Controls & Constraints (Select Criteria)**:
  - `Class *`: Single-select dropdown of academic classes (e.g. `Class 1`, `Class 2`, `Class 10`). Mandatory.
  - `Section`: Single-select dropdown of class sections (e.g. `A`, `B`, `All`). Optional.
  - `Certificate *`: Single-select dropdown of registered certificate templates (e.g. `Sample Transfer Certificate`). Mandatory.
  - `Search` Button: Solid purple button (`#6366f1` / `#7c3aed`), queries student roster.
- **Roster Table Controls & Batch Generation**:
  - Top batch action: `[ ] Select All` master checkbox, `Generate Certificate` batch generation button.
  - **Columns**:
    1. `Selection` (Checkbox)
    2. `Admission No` (String, e.g. `18001`)
    3. `Student Name` (String with avatar thumbnail)
    4. `Class` (String, e.g. `Class 1 (A)`)
    5. `Father Name` (String)
    6. `Date of Birth` (Date string)
    7. `Gender` (String)
    8. `Category` (String)
    9. `Mobile Number` (String)
- **Batch Processing Action**:
  - Clicking `Generate Certificate` opens a high-resolution print modal with rendered certificates containing merged database values for all checked students.

---

### 2.4. Slug: `student-id-card` (`/super-admin/student-id-card` or `/admin/studentidcard`)

- **Screen Layout Structure**:
  - **Split 2-Column Responsive Layout**:
    - **Left Column (40% width)**: "Add Student ID Card" Template Designer Card.
    - **Right Column (60% width)**: "Student ID Card List" Template Ledger Card.
- **Form Controls & Constraints (Add Student ID Card)**:
  - `Background Image`: Drag-and-drop asset dropzone (`Drag and drop a file here or click`).
  - `Logo`: Asset dropzone for institutional crest/seal.
  - `Signature`: Asset dropzone for authorized administrative signature.
  - `School Name *`: Text input for printed badge header. Mandatory.
  - `Address / Phone / Email *`: Textarea for contact information printed on badge reverse or footer. Mandatory.
  - `ID Card Title *`: Name of template (e.g. `Sample Student Identity Card`). Mandatory.
  - `Header Color`: Color picker input with hexadecimal code field.
  - **Field Visibility Toggles** (Binary switches for badge layout):
    - `Admission No` (Toggle)
    - `Student Name` (Toggle)
    - `Class` (Toggle)
    - `Father Name` (Toggle)
    - `Mother Name` (Toggle)
    - `Student Address` (Toggle)
    - `Phone` (Toggle)
    - `Date of Birth` (Toggle)
    - `Blood Group` (Toggle)
  - `Design Type`: Radio selector (`Horizontal` vs `Vertical`).
  - `Barcode / QR Code`: Toggle selector for machine-readable student identifier barcode or QR code.
  - `Save` Button: Solid primary button.
- **Table Controls & Data Display (Student ID Card List)**:
  - Search, page size (50), export tools (Copy, Excel, CSV, PDF, Print, Columns).
  - **Columns**:
    1. `ID Card Title` (String, sortable)
    2. `Background Image` (Thumbnail crest preview)
    3. `Design Type` (Text badge: `Horizontal` or `Vertical`)
    4. `Action` (View template modal, Edit, Delete)
  - **Ground Truth Seeded Records**:
    - `Sample Student Identity Card` | Crest icon | `Horizontal` | View, Edit, Delete
    - `Sample Student Identity Card Vertical` | Crest icon | `Vertical` | View, Edit, Delete
  - **Pagination & Counter**: `Showing 1 to 2 of 2 entries`, page button `< 1 >`.

---

### 2.5. Slug: `generate-id-card` (`/super-admin/generate-id-card` or `/admin/generateidcard/search`)

- **Screen Layout Structure**:
  - **Top Section**: "Select Criteria" Filter Card.
  - **Bottom Section (Post-Query)**: Student Roster Selection Table & Batch Badge Generation Strip.
- **Form Controls & Constraints (Select Criteria)**:
  - `Class *`: Single-select dropdown. Mandatory.
  - `Section`: Single-select dropdown. Optional.
  - `ID Card Template *`: Single-select dropdown referencing active Student ID Card templates. Mandatory.
  - `Search` Button: Solid purple button.
- **Batch Processing Action**:
  - Displays matching students with checkboxes.
  - Clicking `Generate ID Card` compiles and outputs printable 8-per-sheet or 10-per-sheet CR80 ID card layouts ready for card printers.

---

### 2.6. Slug: `staff-id-card` (`/super-admin/staff-id-card` or `/admin/staffidcard`)

- **Screen Layout Structure**:
  - **Split 2-Column Responsive Layout**:
    - **Left Column (40% width)**: "Add Staff ID Card" Template Designer Card.
    - **Right Column (60% width)**: "Staff ID Card List" Template Ledger Card.
- **Form Controls & Constraints (Add Staff ID Card)**:
  - `Background Image`: Drag-and-drop asset dropzone.
  - `Logo`: Asset dropzone for institutional crest/seal.
  - `Signature`: Asset dropzone for authorized executive signature.
  - `School Name *`: Text input for printed badge header. Mandatory.
  - `Address / Phone / Email *`: Textarea for institutional address and support contacts. Mandatory.
  - `ID Card Title *`: Text input (e.g. `Sample Staff ID Card`). Mandatory.
  - `Header Color`: Color picker input with hexadecimal code field.
  - **Staff Field Visibility Toggles**:
    - `Staff Name` (Toggle)
    - `Staff ID` (Toggle)
    - `Designation` (Toggle)
    - `Department` (Toggle)
    - `Father Name` (Toggle)
    - `Mother Name` (Toggle)
    - `Date Of Joining` (Toggle)
    - `Date of Birth` (Toggle)
    - `Emergency Phone` (Toggle)
    - `Address` (Toggle)
  - `Design Type`: Radio selector (`Horizontal` vs `Vertical`).
  - `Barcode / QR Code`: Toggle selector for staff identification barcode or QR code.
  - `Save` Button: Solid primary button.
- **Table Controls & Data Display (Staff ID Card List)**:
  - Search, page size (50), export tools (Copy, Excel, CSV, PDF, Print, Columns).
  - **Columns**:
    1. `ID Card Title` (String, sortable)
    2. `Background Image` (Thumbnail crest preview)
    3. `Design Type` (Text badge: `Horizontal` or `Vertical`)
    4. `Action` (View template modal, Edit, Delete)
  - **Ground Truth Seeded Records**:
    - `Sample Staff ID Card` | Crest icon | `Horizontal` | View, Edit, Delete
    - `Sample Staff ID Card Vertical` | Crest icon | `Vertical` | View, Edit, Delete
  - **Pagination & Counter**: `Showing 1 to 2 of 2 entries`, page button `< 1 >`.

---

### 2.7. Slug: `generate-staff-id-card` (`/super-admin/generate-staff-id-card` or `/admin/generatestaffidcard/search`)

- **Screen Layout Structure**:
  - **Top Section**: "Select Criteria" Staff Filter Card.
  - **Bottom Section (Post-Query)**: Staff Roster Interactive Selection Table & Batch Action Strip.
- **Form Controls & Constraints (Select Criteria)**:
  - `Role`: Single-select dropdown referencing institutional roles (e.g. `Admin`, `Teacher`, `Accountant`, `Librarian`, `Receptionist`, `Super Admin`). Optional (defaults to All Roles if unselected).
  - `ID Card Template *`: Single-select dropdown referencing registered Staff ID Card templates. Mandatory.
  - `Search` Button: Solid purple button.
- **Batch Processing Action**:
  - Displays matching faculty and administrative personnel with selection checkboxes.
  - Clicking `Generate Staff ID Card` compiles printable staff identity badges with photograph, QR code, employee ID, and departmental affiliation.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Certificate Templates Master Table
CREATE TABLE certificate_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    header_left_text TEXT,
    header_center_text TEXT,
    header_right_text TEXT,
    body_text TEXT NOT NULL,
    footer_left_text TEXT,
    footer_center_text TEXT,
    footer_right_text TEXT,
    header_height NUMERIC(6, 2) DEFAULT 0.00,
    footer_height NUMERIC(6, 2) DEFAULT 0.00,
    body_height NUMERIC(6, 2) DEFAULT 0.00,
    body_width NUMERIC(6, 2) DEFAULT 0.00,
    enable_student_photo BOOLEAN DEFAULT FALSE,
    background_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_certificate_name_branch UNIQUE (branch_id, name)
);

-- ID Card Templates Master Table (Unified Student & Staff)
CREATE TABLE id_card_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('STUDENT', 'STAFF')),
    title VARCHAR(150) NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    school_address TEXT NOT NULL,
    header_color VARCHAR(20) DEFAULT '#6366f1',
    design_type VARCHAR(20) NOT NULL DEFAULT 'Horizontal' CHECK (design_type IN ('Horizontal', 'Vertical')),
    background_image_url TEXT,
    logo_url TEXT,
    signature_url TEXT,
    enable_barcode BOOLEAN DEFAULT TRUE,
    layout_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_id_card_title_branch UNIQUE (branch_id, target_type, title)
);

-- Certificate Issuance Audit Log
CREATE TABLE certificate_issuance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_id UUID NOT NULL REFERENCES certificate_templates(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    issued_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    certificate_number VARCHAR(100) NOT NULL UNIQUE
);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/certificates` | List certificate templates | `?branchId=uuid` | `200 OK` (Array of Templates) |
| `POST` | `/api/v1/certificates` | Create certificate template | `{ name, headerLeftText, bodyText, layoutDimensions... }` | `201 Created` |
| `GET` | `/api/v1/certificates/generate` | Query students for certificate | `?classId=uuid&sectionId=uuid&templateId=uuid` | `200 OK` (Roster List) |
| `POST` | `/api/v1/certificates/batch-render` | Batch render certificates | `{ templateId, studentIds: [uuid...] }` | `200 OK` (PDF Stream / URL) |
| `GET` | `/api/v1/id-cards` | List ID card templates | `?branchId=uuid&targetType=STUDENT|STAFF` | `200 OK` (Array of Templates) |
| `POST` | `/api/v1/id-cards` | Create ID card template | `{ targetType, title, schoolName, layoutConfig... }` | `201 Created` |
| `POST` | `/api/v1/id-cards/batch-render` | Batch render ID cards | `{ templateId, entityIds: [uuid...], targetType }` | `200 OK` (PDF Stream / URL) |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever formal certificates or ID cards are issued, the system produces an audit event to the `school.certificate.events` topic:

```json
{
  "eventId": "d109f250-74be-4cf5-99bc-11a5a0899bb1",
  "eventType": "school.certificate.issued",
  "aggregateId": "cert-uuid-8812-cc90",
  "timestamp": "2026-09-12T03:36:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN"
  },
  "payload": {
    "templateId": "cert-transfer-001",
    "certificateName": "Sample Transfer Certificate",
    "totalIssued": 15,
    "studentIds": ["std-1001", "std-1002", "std-1003"],
    "classId": "cls-grade-10"
  }
}
```
