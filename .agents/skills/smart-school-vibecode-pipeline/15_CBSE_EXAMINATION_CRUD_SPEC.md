# Module 15: CBSE Examination CRUD Architecture & Board Assessment Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **CBSE Examination** module manages Central Board of Secondary Education (CBSE) standard academic evaluations, 2-term cumulative assessment structures, periodic test weighting, co-scholastic observations, marksheet template designers, hall ticket (admit card) generation, and multi-tier board grading matrices. It provides academic deans, exam controllers, and class teachers with end-to-end examination governance compliant with national curriculum frameworks.

- **Module Index**: `15`
- **Legacy Route Base**: `/admin/cbseexam`
- **Modern Component Root**: `/super-admin/cbse-exam`
- **Functional Domain**: `Board Academics & Standardized Assessment`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **CBSE Assessment Framework**: Supports Term 1 and Term 2 evaluation models, combining Periodic Tests (PT), Multiple Assessments (MA), Portfolios (PF), and Subject Enrichment Activities (SEA) with Annual/Board Examination marks.
- **Asynchronous Result Pipeline**: Marksheet compilation, grade distribution recalculation, and PDF batch rendering run through the Sync-to-Async Bridge into Kafka topics (`school.assessment.cbse-results-published`) for high-throughput headless PDF generation.

---

### Complete Slug Inventory & Route Mapping

The CBSE Examination module comprises **8 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `exam` | `/admin/cbseexam` | `/super-admin/cbse-exam/exam` | Data Grid + Multi-Action Strip | `cbse_exams` | `+ Add`, Publish Exam, Publish Result, Schedule, Edit, Delete |
| **02** | `exam-schedule` | `/admin/cbseexam/schedule` | `/super-admin/cbse-exam/schedule` | Stacked Timetable Cards | `cbse_exam_schedules` | Print Schedule, View Room Allocations, Filter Date/Time |
| **03** | `print-marksheet` | `/admin/cbseexam/marksheet` | `/super-admin/cbse-exam/print-marksheet`| Filter Criteria + Print Matrix | `cbse_marksheets` | Filter Class/Section/Template, Batch Print, PDF Export |
| **04** | `template` | `/admin/cbseexam/template` | `/super-admin/cbse-exam/template` | Card List + Builder Launcher | `cbse_report_templates`| `+ Add`, Launch Visual Designer, Preview, Assign Cohort |
| **05** | `assign-observation`| `/admin/cbseexam/observation` | `/super-admin/cbse-exam/assign-observation`| Data Grid + Dual Modals | `cbse_observations` | `+ Add`, Configure Parameters, Enter Student Observations |
| **06** | `admit-card` | `/admin/cbseexam/admitcard` | `/super-admin/cbse-exam/admit-card` | Filter Criteria + Design Trigger| `cbse_admit_cards` | `Design Admit Card`, Generate Hall Tickets, Bulk Print |
| **07** | `reports` | `/admin/cbseexam/report` | `/super-admin/cbse-exam/reports` | Document Launcher Hub | `cbse_reports` | Launch Subject Marks Report, Launch Template Marks Report |
| **08** | `setting` | `/admin/cbseexam/setting` | `/super-admin/cbse-exam/setting` | Vertical Tabbed Sub-System | `cbse_settings` | Manage Categories, Grading Scales, Assessment Types, Terms |

---

### 1. Slug `exam`: Master Assessment Registry & Lifecycle

#### A. Screen Architecture & Visual Layout
- **Page Header**: `Exam List`
- **Action Toolbar (Top-Right)**:
  - `+ Add` Button (Primary tactile purple button, launches CBSE Exam Creation Modal).
- **Search & Pagination Toolbar**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Selector (`50` default).
  - Export Suite: Copy, CSV, Excel, PDF, Print, Column Visibility.

#### B. Data Table Schema (`cbse_exams`)
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Exam Name** | `name` | `VARCHAR(255)` | Sortable bold text (e.g., `CBSE Combined Assessment Multiple Exam(SEPTEMBER)`, `CBSE Single Term Report Card(SEPTEMBER)`). |
| **Class (Sections)**| `cohorts` | `VARCHAR(255)` | Sortable cohort description (e.g., `Class 1 (A, B, C, D)`). |
| **Term** | `term` | `VARCHAR(50)` | Sortable term badge (e.g., `Term 1`, `Term 2`). |
| **Subjects Included**| `subject_count`| `INT` | Sortable integer count (e.g., `2`, `3`, `4`). |
| **Exam Published** | `is_published` | `BOOLEAN` | Sortable checkbox status indicator (`[x]` checked). |
| **Published Result**| `is_result_published`| `BOOLEAN` | Sortable checkbox status indicator (`[x]` checked). |
| **Category Name** | `category_name` | `VARCHAR(100)` | Sortable assessment category (e.g., `Internal Assessment`, `Main Subjects`). |
| **Description** | `description` | `TEXT` | Sortable narrative text. |
| **Created At** | `created_at` | `DATE` | Sortable creation timestamp, formatted `MM/DD/YYYY` (e.g., `09/01/2026`, `08/03/2026`). |
| **Action** | *Controls* | `ACTIONS` | Compact horizontal strip of solid purple tactile icon buttons:<br>1. **Assign Subjects / Classes** (`link`)<br>2. **Exam Credentials / Roll Numbers** (`badge`)<br>3. **Exam Schedule Timetable** (`calendar_month`)<br>4. **Notification / Broadcast** (`campaign`)<br>5. **Edit Exam** (`edit`)<br>6. **Enter Marks / View Results** (`format_list_bulleted`)<br>7. **Delete Exam** (`close`/`x`) |

---

### 2. Slug `exam-schedule`: Multi-Exam Room & Timetable Grid

#### A. Screen Architecture & Visual Layout
- **Page Header**: `Exam Schedule`
- **Visual Structure**: Vertical stack of exam timetable cards, each representing an active CBSE examination.
- **Card Header Toolbar**:
  - Exam Name Header (e.g., `CBSE Combined Assessment Multiple Exam(SEPTEMBER)`).
  - Print Schedule Button: Tactile purple print button (`print` icon) on the far right of each card header.

#### B. Subject Timetable Table Schema (`cbse_exam_schedules`)
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Subject** | `subject_name_code` | `VARCHAR(150)` | Subject title with institutional code (e.g., `Science (111)`, `Computer (00220)`, `Mathematics (110)`, `English (210)`). |
| **Date** | `exam_date` | `DATE` | Formatted `MM/DD/YYYY` (e.g., `09/24/2026`, `09/26/2026`). |
| **Start Time** | `start_time` | `TIME` | Formatted `HH:mm:ss` (e.g., `10:28:40`, `09:30:00`, `09:00:00`). |
| **Duration (minute)** | `duration_minutes` | `INT` | Numeric integer (e.g., `60`). |
| **Room No.** | `room_number` | `VARCHAR(50)` | Hall/classroom number (e.g., `100`, `200`, `101`, `102`, `103`). |

---

### 3. Slug `print-marksheet`: Batch Marksheet Filter & Generation

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Select Criteria`
- **Fields Schema**:
  - `Class *`: Required dropdown selector (`Class 1`, `Class 2`, ..., `Class 12`).
  - `Section *`: Required dropdown selector (`A`, `B`, `C`, `D`).
  - `Template *`: Required dropdown selector populated from `cbse_report_templates` (e.g., `CBSE Report Card Template - 2026`, `Student Progress Report`).
- **Action**: `Search` button (right-aligned solid purple tactile button).
- **Data Matrix (Post-Search)**:
  - Renders student enrollment roster with checkboxes for individual or bulk PDF print selection.
  - Action buttons: `Print Selected Marksheets`, `Download ZIP Archive`.

---

### 4. Slug `template`: Visual Report Card Template Builder

#### A. Screen Architecture & Visual Layout
- **Page Header**: `Template List`
- **Action Toolbar (Top-Right)**:
  - `+ Add` Button (Launches Template Configuration Wizard).
- **Search & Pagination Toolbar**: Search input, page size `50`, export suite.

#### B. Data Table Schema (`cbse_report_templates`)
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Template** | `title` | `VARCHAR(255)` | Bold text (e.g., `CBSE Report Card Template - 2026`, `Student Progress Report`, `CBSE Single Exam - Monthly Test Marksheet - May 2026`). |
| **Class Sections** | `cohort_binding` | `VARCHAR(255)` | Associated grades (e.g., `Class 1: A, B, C, D`, `Class 2: A, B, C, D`). |
| **Template Description** | `description` | `TEXT` | Explanatory notes on layout structure and term coverage. |
| **Action** | *Controls* | `ACTIONS` | 5 tactile purple icon buttons:<br>1. **View Details** (`view_headline`)<br>2. **Preview Marksheet** (`visibility`)<br>3. **Edit Metadata** (`edit`)<br>4. **Visual Layout Designer** (`dashboard_customize` / marksheet schema builder)<br>5. **Delete Template** (`close`/`x`) |

---

### 5. Slug `assign-observation`: Co-Scholastic & Behavioral Evaluations

#### A. Screen Architecture & Visual Layout
- **Page Header**: `Assign Observation List`
- **Action Toolbar (Top-Right)**:
  - `+ Add` Button (Primary tactile button, opens observation assignment modal).
  - `Observation Parameter` Button (Tactile button, opens co-scholastic parameter setup).
  - `Observation` Button (Tactile button, opens master observation categories).
- **Search & Pagination Toolbar**: Search input, page size `100`, export tools.

#### B. Data Table Schema (`cbse_observations`)
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Observation** | `name` | `VARCHAR(255)` | Co-scholastic domain (e.g., Work Education, Art Education, Health & Physical Education, Discipline). |
| **Term** | `term` | `VARCHAR(50)` | Assessment term (`Term 1`, `Term 2`). |
| **Code** | `code` | `VARCHAR(50)` | Institutional grading code (e.g., `OBS-01`). |
| **Description** | `description` | `TEXT` | Detailed rubrics for observation rating. |
| **Action** | *Controls* | `ACTIONS` | Edit (`edit`) and Delete (`close`/`x`) buttons. |

---

### 6. Slug `admit-card`: CBSE Board Hall Ticket Generator

#### A. Screen Architecture & Visual Layout
- **Action Toolbar (Top-Right)**:
  - `Design Admit Card` Button (Solid purple button, opens visual ticket layout designer).
- **Card Header**: `Select Criteria`
- **Fields Schema**:
  - `Class *`: Required dropdown.
  - `Section *`: Required dropdown.
  - `Exam *`: Required dropdown of scheduled exams.
  - `Search` Button: Solid purple tactile button.
- **Feedback & Results Banner**:
  - `No Record Found` (Soft red warning bar rendered when no candidates match filters).
  - Candidate Grid (when found): Student Name, Roll Number, Father's Name, Exam Center Code, Barcode/QR ticket preview, and `Print Admit Card` triggers.

---

### 7. Slug `reports`: Categorical CBSE Assessment Analytics

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Reports`
- **Document Launchers (2 Master Reports)**:
  1. `Subject Marks Report` (with document file icon): Comprehensive breakdown of class/section marks per subject across periodic tests, practicals, and theory.
  2. `Template Marks Report` (with document file icon): Aggregated template evaluation reports analyzing grade distributions, pass percentages, and top percentile rankings.

---

### 8. Slug `setting`: Board Assessment Engine Configuration

#### A. Screen Architecture & Visual Layout
Multi-card layout with vertical left-hand navigation tabs:
- **Left Tab Rail**:
  1. `Exam Category` (Active blue link)
  2. `Exam Grade`
  3. `Assessment`
  4. `Term`

#### B. Active Tab: `Exam Category`
- **Middle Card (`Create Category`)**:
  - `Category *`: Text input (`VARCHAR(100)` with active purple border focus).
  - `Save` Button: Bottom-right solid purple tactile button.
- **Right Card (`Category List`)**:
  - Search input, page size `50`, 6 export icons.
  - Default Seeded Categories:
    1. `Main Subjects`
    2. `Internal Assessment`
  - Actions: Edit (`edit` pencil) and Delete (`close`/`x`).

#### C. Additional Setting Tabs Architecture
- **`Exam Grade`**: Defines grade boundaries (e.g., A1: 91-100, A2: 81-90, B1: 71-80, B2: 61-70, C1: 51-60, C2: 41-50, D: 33-40, E: <33).
- **`Assessment`**: Configures weightage rubrics (Periodic Test 5%, Multiple Assessment 5%, Portfolio 5%, Subject Enrichment 5%, Annual Exam 80%).
- **`Term`**: Defines academic division dates and weights for `Term 1` and `Term 2`.

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- CBSE Exam Master
CREATE TABLE cbse_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    term VARCHAR(50) NOT NULL CHECK (term IN ('Term 1', 'Term 2', 'Annual')),
    category_id UUID NOT NULL REFERENCES cbse_exam_categories(id),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_result_published BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE cbse_exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY cbse_exams_branch_isolation ON cbse_exams
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- CBSE Exam Cohort Junction
CREATE TABLE cbse_exam_cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL REFERENCES cbse_exams(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cbse_exam_cohort UNIQUE (exam_id, class_id, section_id)
);

-- CBSE Exam Subject Schedules
CREATE TABLE cbse_exam_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES cbse_exams(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    room_number VARCHAR(50) NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    passing_marks DECIMAL(5,2) NOT NULL DEFAULT 33.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE cbse_exam_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY cbse_schedules_branch_isolation ON cbse_exam_schedules
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- CBSE Report Card Templates
CREATE TABLE cbse_report_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    layout_config_json JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE cbse_report_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY cbse_templates_branch_isolation ON cbse_report_templates
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Exams Endpoints
- `GET /api/v1/cbse-exam/exams`
  - Query Params: `page=0`, `size=50`, `search=Combined`
  - Response: `200 OK` (List of exams with cohort lists, publication flags, and schedule status).
- `POST /api/v1/cbse-exam/exams`
  - Payload:
    ```json
    {
      "name": "CBSE All Term Examination(SEPTEMBER)",
      "term": "Term 1",
      "categoryId": "c9920194-5511-4212-9011-882199211001",
      "description": "Comprehensive term 1 evaluation",
      "cohortIds": [{"classId": "c101", "sectionId": "s001"}]
    }
    ```
  - Response: `201 Created`.
- `PATCH /api/v1/cbse-exam/exams/{id}/publish`
  - Payload: `{"isPublished": true, "isResultPublished": false}`
  - Response: `200 OK`.

#### 2. Schedule Endpoints
- `GET /api/v1/cbse-exam/schedules`
  - Response: `200 OK` (Stacked exam schedule cards grouped by exam ID).
- `POST /api/v1/cbse-exam/schedules`
  - Payload: Array of subject exam timetable allocations.
  - Response: `201 Created`.

#### 3. Marksheet & Admit Card Endpoints
- `GET /api/v1/cbse-exam/marksheets?classId={c}&sectionId={s}&templateId={t}`
  - Response: `200 OK` (Student marksheet eligibility list).
- `POST /api/v1/cbse-exam/marksheets/bulk-generate`
  - Payload: `{"examId": "e001", "studentIds": ["std1", "std2"], "templateId": "t001"}`
  - Response: `202 Accepted` (Enqueued for background rendering).
- `GET /api/v1/cbse-exam/admit-cards?classId={c}&sectionId={s}&examId={e}`
  - Response: `200 OK` (List of hall tickets with barcodes and room assignments).

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_cbse_99210481",
  "eventType": "school.assessment.cbse-results-published",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T02:40:00Z",
  "payload": {
    "examId": "cbse_ex_1002",
    "name": "CBSE Combined Assessment Multiple Exam(SEPTEMBER)",
    "term": "Term 1",
    "publishedBy": "stf_dean_01",
    "totalStudents": 240,
    "publishedAt": "2026-09-12T02:40:00Z"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 8 CBSE Examination slugs documented with UI fidelity and data models.
- [x] Multi-action strip on `exam` verified (7 dedicated action buttons per row).
- [x] Stacked timetable cards and print trigger verified on `exam-schedule`.
- [x] Marksheet batch printing and visual template builder modeled.
- [x] Co-scholastic observations and Admit card generation workflows specified.
- [x] Vertical tabbed setting sub-system (`Exam Category`, `Exam Grade`, `Assessment`, `Term`) fully detailed.
- [x] PostgreSQL RLS policies defined with `branch_id` isolation.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
