# Module 28: Student CV CRUD Architecture & Portfolio Generation Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Student CV** module orchestrates the generation, customization, archival, and printing of verified student academic curricula vitae (CVs) and personal portfolios. Designed for university admissions, scholarship applications, student exchange programs, and vocational placements, the module synthesizes core SIS profile data (biographical information, enrollment history), academic transcripts (examination marks, CGPA bell curves), behavioural records (commendations and merit points), attendance percentages, and extracurricular achievements into a standardized, tamper-evident institutional portfolio.

- **Module Index**: `28`
- **Legacy Route Base**: `/admin/studentcv`
- **Modern Component Root**: `/super-admin/student-cv`
- **Functional Domain**: `Student Portfolio, Career Readiness & Verified Academic CV Generation`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Batch PDF Generation**: Bulk compilation and rendering of high-resolution, multi-page vector student CVs (e.g. for an entire graduating class of 100+ candidates) strictly follow Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/student-cv/generate-batch` returns `HTTP 202 Accepted` with a `trackingId`, buffering headless PDF rendering to Kafka topic `school.academic.student-cv-generated`).
- **Top-Level Setting Engine**: Direct integration of a top-right `Setting` trigger on the primary criteria search card, enabling administrators to configure institutional section toggles (e.g. hiding financial information or showing co-curricular merit badges).

---

### Complete Slug Inventory & Route Mapping

The Student CV module comprises **2 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `student-cv` | `/admin/studentcv` | `/super-admin/student-cv` | Criteria Search + Student Portfolio Ledger | `students` / `student_cv_records` | Filter Class/Section, `Search`, Click `Setting`, `Generate CV`, `View CV`, `Print CV` |
| **02** | `student-cv-setting` | `/admin/studentcv/setting` | `/super-admin/student-cv/setting` | Template Configuration Matrix | `student_cv_settings` | Toggle CV Sections, Set Header Branding, Watermark, Signature Upload |

---

### 1. Slug `student-cv`: Candidate Search & Portfolio Generation Desk

#### A. Screen Architecture & Visual Layout
- **Top Criteria Filter Card**:
  - Container: White card with subtle border and liquid glass elevation.
  - Header Strip:
    - Left Title: `Select Criteria` (Ubuntu 18px medium).
    - Top-Right Action: `Setting` button (solid purple tactile button `#8E24AA` with text `Setting`, navigates to template layout configuration).
  - Form Fields:
    1. `Class *`: Required dropdown selector with active purple outline (`rgba(142, 36, 170, 0.6)`), placeholder `Select`.
    2. `Section`: Optional single-select dropdown selector, placeholder `Select`.
  - Bottom-Right Trigger: `Search` button (solid purple tactile button `#8E24AA` with magnifying glass `search` glyph).

#### B. Results Roster Data Table Schema (`student_cv_records`)
When criteria search is executed, renders the candidate roster for portfolio generation:

| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Admission No** | `admission_no` | `VARCHAR(100)` | Sortable unique enrollment ID code. |
| **Student Name** | `student_name` | `VARCHAR(255)` | Sortable full student name with blue hyperlink to profile. |
| **Class (Section)** | `class_section`| `VARCHAR(100)` | Formatted string `Class 10 (A)`. |
| **Date Of Birth** | `dob` | `DATE` | Formatted `MM/DD/YYYY`. |
| **Gender** | `gender` | `VARCHAR(20)` | `Male`, `Female`, `Other`. |
| **Mobile Number** | `mobile_number`| `VARCHAR(50)` | Contact phone or guardian emergency contact. |
| **CV Status** | `cv_status` | `BADGE` | Status pill: `Draft` (gray), `Generated` (green), `Expired` (amber). |
| **Action** | *Controls* | `ACTIONS` | Purple tactile button cluster:<br>1. **Generate CV** (`description` icon: compiles real-time SIS data into fresh PDF)<br>2. **View CV** (`visibility` eye icon: opens modal preview)<br>3. **Print CV** (`print` print icon: triggers browser PDF print dialog). |

---

### 2. Slug `student-cv-setting`: Portfolio Template Layout & Section Configuration

#### A. Screen Architecture & Visual Layout
Accessed via the top-right `Setting` trigger on the search card, this workspace configures which institutional modules and attributes are compiled into student CVs.

#### B. Template Section Toggle Matrix (`student_cv_settings`)

| Section Block | Field Key | Default State | Description & Ingestion Source |
|:---|:---|:---:|:---|
| **Student Personal Details** | `show_personal_details` | `TRUE` (Locked) | Photo, Full Name, DOB, Gender, Blood Group, Address, Nationality. |
| **Academic History** | `show_academic_history` | `TRUE` | Grade transcript, examination scores, GPA bell curves, term honors. |
| **Attendance Record** | `show_attendance_percentage` | `TRUE` | Cumulative academic session attendance percentage (e.g. `96.4%`). |
| **Behaviour & Merit Points** | `show_behaviour_points` | `TRUE` | Positive disciplinary commendations and house points balance. |
| **Extracurricular Activities**| `show_extracurricular` | `TRUE` | Athletics, science fairs, debate society, and student council roles. |
| **Skills & Competencies** | `show_skills` | `TRUE` | Languages spoken, programming languages, digital literacies, art. |
| **Guardian Details** | `show_guardian_details` | `FALSE` | Guardian names, professions, and endorsements. |
| **Institutional Digital Seal**| `show_digital_seal` | `TRUE` | High-resolution official school crest with anti-counterfeit QR code. |
| **Principal Signature** | `show_principal_signature` | `TRUE` | Authorized signature image of campus dean or head of school. |

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Student CV Template Settings
CREATE TABLE student_cv_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_name VARCHAR(255) NOT NULL DEFAULT 'Standard Institutional CV',
    show_personal_details BOOLEAN NOT NULL DEFAULT TRUE,
    show_academic_history BOOLEAN NOT NULL DEFAULT TRUE,
    show_attendance_percentage BOOLEAN NOT NULL DEFAULT TRUE,
    show_behaviour_points BOOLEAN NOT NULL DEFAULT TRUE,
    show_extracurricular BOOLEAN NOT NULL DEFAULT TRUE,
    show_skills BOOLEAN NOT NULL DEFAULT TRUE,
    show_guardian_details BOOLEAN NOT NULL DEFAULT FALSE,
    show_digital_seal BOOLEAN NOT NULL DEFAULT TRUE,
    show_principal_signature BOOLEAN NOT NULL DEFAULT TRUE,
    principal_signature_path VARCHAR(512),
    watermark_image_path VARCHAR(512),
    primary_accent_color VARCHAR(7) NOT NULL DEFAULT '#8E24AA',
    updated_by UUID NOT NULL REFERENCES staff(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_cv_settings UNIQUE (branch_id)
);

ALTER TABLE student_cv_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_student_cv_settings ON student_cv_settings
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Generated Student CV Records
CREATE TYPE cv_status_enum AS ENUM ('DRAFT', 'GENERATED', 'ARCHIVED');

CREATE TABLE student_cv_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    cv_title VARCHAR(255) NOT NULL DEFAULT 'Academic Portfolio & CV',
    pdf_document_path VARCHAR(512),
    verification_token VARCHAR(64) NOT NULL UNIQUE,
    status cv_status_enum NOT NULL DEFAULT 'GENERATED',
    generated_by UUID NOT NULL REFERENCES staff(id),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_session_cv UNIQUE (student_id, session_id)
);

ALTER TABLE student_cv_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_student_cv_records ON student_cv_records
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Batch Generate Student CVs (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/student-cv/generate-batch`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted`
- **Payload**:
```json
{
  "classId": "a1b2c3d4-1111-2222-3333-444455556666",
  "sectionId": "b2c3d4e5-2222-3333-4444-555566667777",
  "studentIds": [
    "e5f6a7b8-1111-0000-0000-000000000001",
    "e5f6a7b8-2222-0000-0000-000000000002"
  ],
  "regenerateExisting": true
}
```

#### 2. Update Student CV Settings
- **Endpoint**: `PUT /api/v1/student-cv/settings`
- **Payload**:
```json
{
  "showAcademicHistory": true,
  "showAttendancePercentage": true,
  "showBehaviourPoints": true,
  "showExtracurricular": true,
  "showSkills": true,
  "showGuardianDetails": false,
  "showDigitalSeal": true,
  "showPrincipalSignature": true,
  "primaryAccentColor": "#8E24AA"
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.academic.student-cv-generated`
- **Partition Key**: `{branchId}#{studentId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "e1f2a3b4-7c8d-90ab-cdef-1234567890ab",
    "eventType": "school.academic.student-cv-generated",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T13:30:00.000Z",
    "correlationId": "b8c9d0e1-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
    "version": "1.0.0"
  },
  "payload": {
    "recordId": "f1e2d3c4-6666-7777-8888-999900001111",
    "studentId": "e5f6a7b8-1111-0000-0000-000000000001",
    "admissionNo": "18002",
    "verificationToken": "cv_sec_99a8b7c6d5e4f3a2",
    "pdfDocumentPath": "/cdn/schools/branch_01/cv/18002_cv_2026.pdf"
  }
}
```
