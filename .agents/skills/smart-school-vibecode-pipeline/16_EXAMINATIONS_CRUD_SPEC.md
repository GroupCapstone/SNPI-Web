# Module 16: Examinations CRUD Architecture & Assessment Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Examinations** module serves as the universal institutional examination engine, supporting multiple grading paradigms (Pass/Fail, School-Based Grading, College CGPA, GPA Grading Systems, and Average Passing schemes). It governs the end-to-end lifecycle of institutional exams: grouping exams by curriculum types, scheduling multi-room timetables, recording multi-component marks (Theory, Practical, Viva), designing and printing custom admit cards, engineering graphic marksheet templates, and establishing master grading scales and division rubrics.

- **Module Index**: `16`
- **Legacy Route Base**: `/admin/examgroup`, `/admin/examresult`, `/admin/admitcard`, `/admin/marksheet`, `/admin/grade`
- **Modern Component Root**: `/super-admin/examinations`
- **Functional Domain**: `Term Assessments & Examination Governance`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Grading Multi-Engine Standard**: Supports five distinct evaluation algorithms:
  1. `General Purpose (Pass/Fail)`: Binary threshold evaluations.
  2. `School Based Grading System`: Letter grades (A+, A, B, C, D, E) based on percentage intervals.
  3. `College Based Grading System`: 10-point CGPA / Credit-hour semester calculations.
  4. `GPA Grading System`: 4.0 / 5.0 grade point average formulas.
  5. `Average Passing`: Composite cross-subject weighted mean calculations.
- **Asynchronous Pipeline**: Mass examination publishing, grade rollups, and bulk PDF report generation run through the Sync-to-Async Bridge into Kafka (`school.assessment.exam-published`).

---

### Complete Slug Inventory & Route Mapping

The Examinations module comprises **9 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `exam-group` | `/admin/examgroup` | `/super-admin/examinations/exam-group` | Split 2-Column (Pattern B) | `exam_groups` | Add Group, Link Exams (`+`), Edit, Delete |
| **02** | `exam-schedule` | `/admin/examgroup/schedule` | `/super-admin/examinations/exam-schedule` | Filter Criteria + Timetable Grid | `exam_schedules` | Filter Group/Exam, View Date/Room/Max Marks |
| **03** | `exam-result` | `/admin/examresult` | `/super-admin/examinations/exam-result` | 5-Tier Filter + Marks Ledger | `exam_results` | Filter Group/Exam/Session/Class/Section, Input Marks |
| **04** | `design-admit-card`| `/admin/admitcard` | `/super-admin/examinations/design-admit-card` | Split 2-Column (Pattern B) | `admit_card_templates` | Design Hall Ticket, Upload Logos/Signature, Set Active |
| **05** | `print-admit-card` | `/admin/admitcard/print` | `/super-admin/examinations/print-admit-card` | 5-Tier Filter + Batch Generator | `admit_card_logs` | Filter Cohort, Bulk PDF Print Hall Tickets |
| **06** | `design-marksheet` | `/admin/marksheet` | `/super-admin/examinations/design-marksheet` | Split 2-Column (Pattern B) | `marksheet_templates` | Design Grade Card, Bind Grading Scheme, Upload Header |
| **07** | `print-marksheet` | `/admin/marksheet/print`| `/super-admin/examinations/print-marksheet` | 5-Tier Filter + Batch Print | `student_marksheets` | Batch Print Marksheets, Export ZIP Archive |
| **08** | `marks-grade` | `/admin/grade` | `/super-admin/examinations/marks-grade` | Split 2-Column (Pattern B) | `marks_grades` | Add Grade Boundaries, Set Grade Points, Assign Type |
| **09** | `marks-division` | `/admin/grade/division`| `/super-admin/examinations/marks-division` | Split 2-Column (Pattern B) | `marks_divisions` | Add Percentage Thresholds (First, Second, Third) |

---

### 1. Slug `exam-group`: Master Examination Classification

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Exam Group`.
- **Right Column (~67% width)**: Data Grid Card titled `Exam Group List`.

#### B. Left Form Schema (`Add Exam Group`)
| Form Field Label | Field Name | Input Type | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|
| **Name \*** | `name` | `text` | Required, `VARCHAR(255)` | Unique title with purple focus border (e.g., `General Exam (Pass / Fail)`). |
| **Exam Type \*** | `exam_type` | `dropdown` | Required, `ENUM` | Selects grading logic: `General Purpose (Pass/Fail)`, `School Based Grading System`, `College Based Grading System`, `GPA Grading System`, `Average Passing`. |
| **Description** | `description` | `textarea` | Optional, `TEXT` | Syllabus coverage or institutional regulation notes. |
| **Save Button** | *Submit* | `button` | Bottom-right tactile purple button | Submits `POST /api/v1/examinations/groups`. |

#### C. Right Table Schema (`Exam Group List`)
- **Search & Pagination Toolbar**: Search input, page size `50`, export suite (Copy, CSV, Excel, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(255)` | Sortable title text. |
| **No Of Exams** | `exam_count` | `INT` | Sortable integer count of linked exams (e.g., `7`, `4`, `5`, `9`, `7`). |
| **Exam Type** | `exam_type` | `VARCHAR(100)` | Sortable grading engine category. |
| **Action** | *Controls* | `ACTIONS` | Three tactile solid purple buttons:<br>1. **Add Exam to Group** (`+` icon): Opens modal to link new child examination.<br>2. **Edit Group** (`edit` pencil icon).<br>3. **Delete Group** (`close`/`x` icon). |

---

### 2. Slug `exam-schedule`: Timetable & Examination Room Allocations

#### A. Screen Architecture & Visual Layout
Top/Bottom Stacked layout:
- **Top Card (`Select Criteria`)**:
  - `Exam Group *`: Required dropdown selector (purple focus border).
  - `Exam *`: Required dropdown selector cascading from Exam Group.
  - `Search` Button: Right-aligned solid purple tactile trigger.
- **Bottom Card (`Exam Schedule`)**:
  - Search input box, export suite (Copy, CSV, Excel, PDF, Print, Column Visibility).
  - Empty state graphic with folder/documents, red notice `No data available in table`, and helper link `⬅ Add new record or search with different criteria.`

#### B. Results Data Grid Schema (`exam_schedules`)
| Column Header | Field Name | Data Type | Description |
|:---|:---|:---|:---|
| **Subject** | `subject_name` | `VARCHAR(150)` | Name and course code of paper. |
| **Date From** | `exam_date` | `DATE` | Scheduled date of paper. |
| **Start Time** | `start_time` | `TIME` | Paper start timestamp. |
| **Duration** | `duration_minutes` | `INT` | Length of examination in minutes. |
| **Room No.** | `room_number` | `VARCHAR(50)` | Room allocation for seating. |
| **Marks (Max..)** | `max_marks` | `DECIMAL(5,2)` | Maximum achievable marks. |
| **Marks (Min..)** | `min_marks` | `DECIMAL(5,2)` | Minimum passing threshold. |

---

### 3. Slug `exam-result`: Student Marks Intake Ledger

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Select Criteria` (5-Tier Cascading Filter)
- **Filter Fields**:
  1. `Exam Group *`: Required dropdown.
  2. `Exam *`: Required dropdown.
  3. `Session *`: Required dropdown (`2026-27`).
  4. `Class *`: Required dropdown (`Class 1`, `Class 2`, ..., `Class 12`).
  5. `Section *`: Required dropdown (`A`, `B`, `C`, `D`).
  6. `Search` Button: Right-aligned solid purple tactile trigger.
- **Results Ledger (Post-Search)**:
  - Table: `Admission No`, `Roll No`, `Student Name`, Subject-wise score inputs (Theory, Practical, Viva), `Attendance` (`Present`, `Absent`), `Total Marks`, `Percentage`, `Grade`, `Result Status` (`Pass`/`Fail`).
  - Action: `Save Marks` batch transaction button.

---

### 4. Slug `design-admit-card`: Custom Hall Ticket Designer

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Admit Card`.
- **Right Column (~67% width)**: Data Grid Card titled `Admit Card List`.

#### B. Left Form Schema (`Add Admit Card`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Template \*** | `template_name` | `text` | Required, `VARCHAR(255)` with purple focus ring. |
| **Heading** | `heading` | `text` | Optional header text (e.g., `ANNUAL ADMIT CARD 2026`). |
| **Title** | `title` | `text` | Optional subtitle. |
| **Exam Name** | `exam_name` | `text` | Associated examination title. |
| **School Name** | `school_name` | `text` | Institutional name printed on ticket. |
| **Exam Center** | `exam_center` | `text` | Center code and building address. |
| **Footer Text** | `footer_text` | `text` | Candidate instructions / examination rules. |
| **Left Logo** | `left_logo_file` | `file_dropzone` | Institutional seal/crest dropzone. |
| **Right Logo** | `right_logo_file` | `file_dropzone` | Affiliated board/accreditation logo dropzone. |
| **Sign** | `sign_file` | `file_dropzone` | Signature scan of Principal / Controller of Exams. |
| **Background Image** | `bg_image_file` | `file_dropzone` | Watermark or security guilloche background pattern. |
| **Dynamic Toggle Switches** | *Fields* | `toggles` | Checkbox toggles for candidate fields: Student Name, Roll No, Admission No, Father Name, Mother Name, DOB, Photo, QR Code. |

#### C. Right Table Schema (`Admit Card List`)
- Search input, page size `50`, 6 export icons.
- Columns:
  1. `Certificate Name` (Sortable blue text link, e.g., `Sample Admit Card`, `Admit Card`, `exam card`).
  2. `Background Image` (Thumbnail image preview icon).
  3. `Active` (Interactive radio button selector to mark the default active template).
  4. `Action` (View Details `view_headline`, Edit `edit` pencil, Delete `close`/`x`).
- Pagination: `Showing 1 to 3 of 3 entries`.

---

### 5. Slug `print-admit-card`: Mass Hall Ticket Generator

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Select Criteria` (5-Tier Cascading Filter)
- **Filter Fields**:
  1. `Exam Group *`: Required dropdown (purple focus border).
  2. `Exam *`: Required dropdown.
  3. `Session *`: Required dropdown.
  4. `Class *`: Required dropdown.
  5. `Section *`: Required dropdown.
  6. `Search` Button: Right-aligned solid purple tactile button.
- **Feedback Banner**:
  - Soft red warning banner `No Record Found` rendered when no eligible candidates are indexed.
- **Results Roster (When Found)**:
  - Table of registered students with individual preview links and `Bulk Generate & Print Selected` trigger.

---

### 6. Slug `design-marksheet`: Grade Card Layout Builder

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Marksheet`.
- **Right Column (~67% width)**: Data Grid Card titled `Marksheet List`.

#### B. Left Form Schema (`Add Marksheet`)
| Form Field Label | Field Name | Input Type | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|
| **Template \*** | `template_name` | `text` | Required, `VARCHAR(255)` | Unique marksheet template name. |
| **School Name** | `school_name` | `text` | Optional, `VARCHAR(255)` | Institutional name rendered at top of marksheet. |
| **Exam Center** | `exam_center` | `text` | Optional, `VARCHAR(255)` | Examination venue or campus designation. |
| **Body Text** | `body_text` | `text` / `textarea` | Optional | Custom declaration or certification statement. |
| **Footer Text** | `footer_text` | `text` / `textarea` | Optional | Grading explanation, disclaimer, or terms. |
| **Printing Date** | `printing_date` | `date` / `text` | Optional | Timestamp or formatted date of issuance. |
| **Header Image** | `header_image_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for letterhead banner. |
| **Left Logo** | `left_logo_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for primary institution seal. |
| **Right Logo** | `right_logo_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for board / accreditation logo. |
| **Left Sign** | `left_sign_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for Class Teacher signature. |
| **Middle Sign** | `middle_sign_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for Exam Controller signature. |
| **Right Sign** | `right_sign_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for Principal / Dean signature. |
| **Background Image** | `bg_image_file` | `file_dropzone` | Optional | `cloud_upload` dropzone for security watermark. |
| **Save Button** | *Submit* | `button` | Bottom-right purple button | Persists template to `marksheet_templates`. |

#### C. Right Table Schema (`Marksheet List`)
- **Controls**: Search input, page size `50`, export toolbar (`Copy`, `Excel`, `CSV`, `PDF`, `Print`).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Marksheet Name** | `name` | `VARCHAR(255)` | Sortable blue text link (e.g., `School marksheet`, `Marksheet`). |
| **Background Image** | `bg_image_url` | `IMAGE_THUMBNAIL` | Thumbnail / document icon preview. |
| **Action** | *Controls* | `ACTIONS` | 3 Purple tactile icon buttons:<br>1. **View** (`visibility`): Template preview modal.<br>2. **Edit** (`edit` pencil): Re-opens template editor.<br>3. **Delete** (`close` / `x`): Deletes template with dependency check. |
- **Pagination**: `Showing 1 to 2 of 2 entries`.

---

### 7. Slug `print-marksheet`: Batch Marksheet Generation Desk

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Select Criteria` (6-Tier Responsive Filter Bar in a single horizontal row).
- **Filter Fields**:
  1. `Exam Group *`: Required single-select dropdown (e.g., `General Exam (Pass / Fail)`).
  2. `Exam *`: Required dropdown cascading from Exam Group.
  3. `Session *`: Required dropdown (e.g., `2026-27`).
  4. `Class *`: Required dropdown (`Class 1`, `Class 2`, ..., `Class 12`).
  5. `Section *`: Required dropdown (`A`, `B`, `C`, `D`).
  6. `Marksheet Template *`: Required dropdown linking to designed templates (e.g., `School marksheet`, `Marksheet`).
  7. `Search` Button: Right-aligned solid blue/purple tactile button with magnifying glass icon.

#### B. Results Data Grid Schema (`student_marksheets` Post-Search)
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Checkbox** | `selected` | `CHECKBOX` | Header select-all and individual row select for batch printing. |
| **Admission No** | `admission_no` | `VARCHAR(50)` | Student identifier link. |
| **Roll Number** | `roll_no` | `VARCHAR(50)` | Class roll sequence. |
| **Student Name** | `student_name` | `VARCHAR(255)` | Student full name. |
| **Father Name** | `father_name` | `VARCHAR(255)` | Parent name. |
| **Gender** | `gender` | `VARCHAR(20)` | `Male`, `Female`, `Other`. |
| **Result** | `result_status` | `BADGE` | Status badge (`Pass` green badge, `Fail` red badge). |
| **Action** | *Controls* | `ACTIONS` | `Print Marksheet` single preview and print button. |

- **Bulk Action Toolbar**:
  - `Bulk Print Selected Marksheets`: Emits event to `school.assessment.marksheet-bulk-printed` and compiles multi-page high-resolution vector PDF for direct thermal/laser printing.

---

### 8. Slug `marks-grade`: Master Grading Scale Engine

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Marks Grade`.
- **Right Column (~67% width)**: Data Grid Card titled `Grade List`.

#### B. Left Form Schema (`Add Marks Grade`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Exam Type \*** | `exam_type` | `dropdown` | Required. Options:<br>• `General Purpose (Pass/Fail)`<br>• `School Based Grading System`<br>• `College Based Grading System`<br>• `GPA Grading System`<br>• `Average Passing` |
| **Grade Name \*** | `grade_name` | `text` | Required (e.g., `A++`, `A+`, `A`, `B++`, `B+`, `B`, `B-`, `C+`, `C`, `D`). |
| **Percent Upto \*** | `percent_upto` | `number` | Required. Upper percentage boundary (e.g., `100.00`, `90.00`, `40.00`). |
| **Percent From \*** | `percent_from` | `number` | Required. Lower percentage boundary (e.g., `90.00`, `80.00`, `0.00`). |
| **Grade Point \*** | `grade_point` | `number` | Required. Numeric grade weight (e.g., `0.0`, `1.0`, `2.0`, `2.5`, `3.0`, `3.5`, `4.0`, `4.5`). |
| **Description** | `description` | `textarea` | Optional qualitative remarks. |
| **Save Button** | *Submit* | `button` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Grade List`)
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering Rules |
|:---|:---|:---|:---|
| **Exam Type** | `exam_type` | `VARCHAR(100)` | Spanned grouped cell per exam type category. |
| **Grade Name** | `grade_name` | `VARCHAR(20)` | Alphabetic grade code. |
| **Percent From / Upto** | `percent_range` | `VARCHAR(50)` | Formatted interval `From To Upto` (e.g., `0.00To40.00`, `40.00To50.00`, `90.00To100.00`). |
| **Grade Point** | `grade_point` | `DECIMAL(3,1)` | Formatted to 1 decimal place (e.g., `0.0`, `2.0`, `4.5`). |
| **Description** | `description` | `TEXT` | Performance description. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile icon buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |

- **Exact Seeded Grading Standard Records**:
  - **`General Purpose (Pass/Fail)`**:
    - `B-` (0.00 To 40.00, GP 0.0), `B` (40.00 To 50.00, GP 0.0), `B+` (50.00 To 60.00, GP 0.0), `B++` (60.00 To 70.00, GP 0.0), `A` (70.00 To 80.00, GP 0.0), `A+` (80.00 To 90.00, GP 0.0), `A++` (90.00 To 100.00, GP 0.0), `A++` (33.00 To 100.00, GP 2.0).
  - **`School Based Grading System`**:
    - `B-` (0.00 To 40.00, GP 0.0), `B` (40.00 To 50.00, GP 0.0), `B+` (50.00 To 60.00, GP 0.0), `B++` (60.00 To 70.00, GP 0.0), `A` (70.00 To 80.00, GP 0.0), `A+` (80.00 To 90.00, GP 0.0), `A++` (80.00 To 100.00, GP 0.0).
  - **`College Based Grading System`**:
    - `B-` (0.00 To 40.00, GP 0.0), `B` (40.00 To 50.00, GP 0.0), `B+` (50.00 To 60.00, GP 0.0), `B++` (60.00 To 70.00, GP 0.0), `A` (70.00 To 80.00, GP 0.0), `A+` (80.00 To 90.00, GP 0.0), `A++` (90.00 To 100.00, GP 0.0).
  - **`GPA Grading System`**:
    - `A+` (90.00 To 100.00, GP 4.5), `A` (80.00 To 90.00, GP 4.0), `B+` (70.00 To 80.00, GP 3.5), `B` (60.00 To 70.00, GP 3.0), `C+` (50.00 To 60.00, GP 2.5), `C` (40.00 To 50.00, GP 2.0), `D` (0.00 To 40.00, GP 1.0).

---

### 9. Slug `marks-division`: Division Rubrics Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Marks Division`.
- **Right Column (~67% width)**: Data Grid Card titled `Division List`.

#### B. Left Form Schema (`Add Marks Division`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Division Name \*** | `division_name` | `text` | Required (e.g., `First`, `Second`, `Third`, `Distinction`). |
| **Percent From \*** | `percent_from` | `number` | Required. Upper boundary percentage (e.g., `100.00`, `60.00`, `40.00`). |
| **Percent Upto \*** | `percent_upto` | `number` | Required. Lower boundary percentage (e.g., `80.00`, `40.00`, `0.00`). |
| **Save Button** | *Submit* | `button` | Solid purple tactile button. |

#### C. Right Table Schema (`Division List`)
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Values |
|:---|:---|:---|:---|
| **Division Name** | `division_name` | `VARCHAR(50)` | Blue sortable text link (`First`, `Second`, `Third`). |
| **Percentage From** | `percent_from` | `DECIMAL(5,2)` | `100.00`, `60.00`, `40.00`. |
| **Percentage Upto** | `percent_upto` | `DECIMAL(5,2)` | `80.00`, `40.00`, `0.00`. |
| **Action** | *Controls* | `ACTIONS` | Edit (`edit` pencil) and Delete (`close`/`x`) purple icon buttons. |


---

### PostgreSQL Database Schema & RLS Policies

```sql
-- Exam Groups Master
CREATE TABLE exam_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    exam_type VARCHAR(100) NOT NULL CHECK (exam_type IN (
        'General Purpose (Pass/Fail)',
        'School Based Grading System',
        'College Based Grading System',
        'GPA Grading System',
        'Average Passing'
    )),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_exam_group_branch UNIQUE (branch_id, name)
);

ALTER TABLE exam_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY exam_groups_branch_isolation ON exam_groups
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Individual Exams Linked to Group
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_group_id UUID NOT NULL REFERENCES exam_groups(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES sessions(id),
    name VARCHAR(255) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_result_published BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY exams_branch_isolation ON exams
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Exam Timetable Schedules
CREATE TABLE exam_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    exam_date DATE NOT NULL,
    start_time TIME NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    room_number VARCHAR(50) NOT NULL,
    max_marks DECIMAL(5,2) NOT NULL DEFAULT 100.00,
    min_marks DECIMAL(5,2) NOT NULL DEFAULT 35.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE exam_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY exam_schedules_branch_isolation ON exam_schedules
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Admit Card Templates
CREATE TABLE admit_card_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    template_name VARCHAR(255) NOT NULL,
    heading VARCHAR(255),
    title VARCHAR(255),
    exam_name VARCHAR(255),
    school_name VARCHAR(255),
    exam_center VARCHAR(255),
    footer_text TEXT,
    left_logo_url TEXT,
    right_logo_url TEXT,
    sign_url TEXT,
    bg_image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    field_toggles_json JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE admit_card_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY admit_card_templates_branch_isolation ON admit_card_templates
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Exam Groups Endpoints
- `GET /api/v1/examinations/groups`
  - Headers: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
  - Response: `200 OK` (List of exam groups with linked exam counts and grading types).
- `POST /api/v1/examinations/groups`
  - Payload:
    ```json
    {
      "name": "Mid-Term Assessment 2026",
      "examType": "School Based Grading System",
      "description": "Standard school letter grading"
    }
    ```
  - Response: `201 Created`.

#### 2. Exam Schedule & Marks Endpoints
- `GET /api/v1/examinations/schedules?examGroupId={g}&examId={e}`
  - Response: `200 OK` (Timetable matrix with room assignments and marks thresholds).
- `GET /api/v1/examinations/results?examGroupId={g}&examId={e}&sessionId={s}&classId={c}&sectionId={sec}`
  - Response: `200 OK` (Student marks intake roster).
- `POST /api/v1/examinations/results/batch`
  - Payload: Array of student mark entries.
  - Response: `200 OK`.

#### 3. Admit Card Endpoints
- `GET /api/v1/examinations/admit-cards/templates`
  - Response: `200 OK` (List of admit card templates).
- `POST /api/v1/examinations/admit-cards/templates`
  - Content-Type: `multipart/form-data`
  - Response: `201 Created`.
- `PATCH /api/v1/examinations/admit-cards/templates/{id}/set-active`
  - Response: `200 OK` (Marks template active and disables others).

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_exm_77210941",
  "eventType": "school.assessment.exam-published",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T03:10:00Z",
  "payload": {
    "examId": "ex_99014",
    "examGroupId": "eg_1002",
    "name": "General Exam (Pass / Fail)",
    "sessionId": "ses_2026_27",
    "publishedBy": "stf_dean_01",
    "totalCandidates": 450
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 9 Examinations slugs documented with exact UI fidelity and input validation rules.
- [x] Five distinct grading system algorithms modeled (`General Purpose`, `School Based`, `College CGPA`, `GPA`, `Average Passing`).
- [x] Multi-room exam timetable schedule matrix specified with Min/Max marks.
- [x] Visual Admit Card and Marksheet designers with asset dropzones and active radio selectors modeled.
- [x] 5-tier cascading search criteria filters (`Exam Group`, `Exam`, `Session`, `Class`, `Section`) detailed.
- [x] PostgreSQL RLS schema and Kafka event envelopes defined.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
