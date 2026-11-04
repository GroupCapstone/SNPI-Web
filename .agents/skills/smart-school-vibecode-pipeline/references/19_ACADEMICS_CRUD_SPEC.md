# Module 19: Academics CRUD Architecture & Timetable Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Academics** module functions as the foundational operational backbone of the institutional academic hierarchy. It establishes the multi-campus class and section structure, subject catalogs (Theory vs. Practical), grouped curriculum tracks, class teacher mentorship assignments, weekly master period timetables for cohorts and instructors, and session-end student promotion pipelines.

- **Module Index**: `19`
- **Legacy Route Base**: `/admin/timetable`, `/admin/teacher`, `/admin/stdtransfer`, `/admin/subjectgroup`, `/admin/subject`, `/admin/classes`, `/admin/sections`
- **Modern Component Root**: `/super-admin/academics`
- **Functional Domain**: `Curriculum Management, Timetable Scheduling & Academic Taxonomy`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Batch Operations**: Bulk student promotion across academic sessions (`POST /api/v1/academics/promote-students`) executes as an atomic transactional batch and publishes to Kafka (`school.academic.students-promoted`).
- **Zero Timetable Collisions**: Schedule assignment enforces constraint checks to prevent instructor room and time slot overlaps across cohorts.

---

### Complete Slug Inventory & Route Mapping

The Academics module comprises **8 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `class-timetable` | `/admin/timetable/classreport` | `/super-admin/academics/class-timetable` | Filter + Weekly Timetable Grid | `academic_timetables` | `+ Add` Timetable slot, Filter Class/Section, View Monday-Saturday schedule |
| **02** | `teachers-timetable` | `/admin/timetable/mytimetable` | `/super-admin/academics/teachers-timetable` | Filter + Instructor Weekly Grid | `academic_timetables` | Select Teacher, View weekly teaching load & room assignments |
| **03** | `assign-class-teacher`| `/admin/teacher/assign_class_teacher` | `/super-admin/academics/assign-class-teacher` | Split 2-Column (Pattern B) | `class_teacher_assignments`| Select Class & Section, Multi-select staff checkboxes, Save, Edit, Delete |
| **04** | `promote-students` | `/admin/stdtransfer` | `/super-admin/academics/promote-students` | Dual-Cohort Filter + Promotion Ledger| `student_promotions` | Current Class/Section -> Next Session Class/Section, Pass/Fail marking, Promote |
| **05** | `subject-group` | `/admin/subjectgroup` | `/super-admin/academics/subject-group` | Split 2-Column (Pattern B) | `subject_groups` | Add Group Name, Bind Class & Multi-Sections, Multi-select Subjects, Save |
| **06** | `subjects` | `/admin/subject` | `/super-admin/academics/subjects` | Split 2-Column (Pattern B) | `subjects` | Add Subject Name, Code, Type (Theory/Practical), Edit, Delete |
| **07** | `class` | `/admin/classes` | `/super-admin/academics/class` | Split 2-Column (Pattern B) | `classes` | Add Class Name, Select Sections (Checkboxes), Edit, Delete |
| **08** | `sections` | `/admin/sections` | `/super-admin/academics/sections` | Split 2-Column (Pattern B) | `sections` | Add Section Name, Edit, Delete |

---

### 1. Slug `class-timetable`: Weekly Cohort Period Schedule

#### A. Screen Architecture & Visual Layout
- **Top Card (`Select Criteria`)**:
  - Top Action Trigger: `+ Add` (Solid purple tactile button on top right, opens `Add Class Timetable` modal).
  - Form Fields:
    - `Class *`: Required single-select dropdown (`Class 1`, `Class 2`, ..., `Class 12`) with active purple focus outline.
    - `Section *`: Required dropdown (`A`, `B`, `C`, `D`), dynamically populated based on Class.
    - `Search` Button: Right-aligned solid blue/purple tactile trigger.

#### B. Results Weekly Schedule Matrix (Post-Search)
Upon selecting Class and Section and clicking `Search`, renders the Monday-through-Saturday period timetable grid:
- **Columns**: Days of the week (`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`).
- **Cell Cards**: Each period rendered as a structured card containing:
  - `Subject Name` (e.g., `Mathematics (110)`)
  - `Time Window` (e.g., `09:00 AM - 09:45 AM`)
  - `Room Number` (e.g., `Room 101`)
  - `Teacher Name` (e.g., `Shivam Verma (9002)`)
- Empty slots render an `+ Add Slot` helper button for authorized schedulers.

#### C. `+ Add Timetable` Modal Schema
- `Class *`: Dropdown
- `Section *`: Dropdown
- `Subject Group *`: Cascading dropdown
- `Subject *`: Cascading dropdown
- `Teacher *`: Staff dropdown
- `Time From *`: Timepicker
- `Time To *`: Timepicker
- `Room Number`: Text input
- Conflict Prevention Engine: Validates in real time that selected teacher and room are unallocated for that time window.

---

### 2. Slug `teachers-timetable`: Instructor Teaching Schedule

#### A. Screen Architecture & Visual Layout
- **Card Header**: `Teacher Time Table`
- **Filter Row**:
  - `Teachers *`: Single-select dropdown populated with all active instructional staff (e.g., `Shivam Verma (9002)`, `Jason Sharlton (90006)`, `Nishant Khare (1002)`, `Aman Verma (654)`).
  - `Search` Button: Solid blue tactile trigger placed directly adjacent to the dropdown.

#### B. Instructor Weekly Schedule Grid
- Weekly day-wise table displaying the teacher's scheduled teaching load:
  - `Day`: Monday to Saturday
  - `Class & Section`: (e.g., `Class 1 (A)`, `Class 3 (B)`)
  - `Subject`: (e.g., `Science (111)`)
  - `Time Window`: (e.g., `10:00 AM - 10:45 AM`)
  - `Room No`: (e.g., `Lab 2`)

---

### 3. Slug `assign-class-teacher`: Cohort Mentorship Allocation

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Assign Class Teacher`.
- **Right Column (~67% width)**: Data Grid Card titled `Class Teacher List`.

#### B. Left Form Schema (`Assign Class Teacher`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Class \*** | `class_id` | `SELECT` | Required single-select dropdown (`Class 1`, `Class 2`, ..., `Class 12`). |
| **Section \*** | `section_id` | `SELECT` | Required single-select dropdown (`A`, `B`, `C`, `D`). |
| **Class Teacher \*** | `teacher_ids` | `MULTI_CHECKBOX` | Required multi-select checkbox list of staff members:<br>• `[ ] Shivam Verma (9002)`<br>• `[ ] Jason Sharlton (90006)`<br>• `[ ] Nishant Khare (1002)`<br>• `[ ] Aman Verma (654)` |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right purple tactile button. |

#### C. Right Table Schema (`Class Teacher List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records |
|:---|:---|:---|:---|
| **Class** | `class_name` | `VARCHAR(50)` | `Class 1`, `Class 2`, `Class 3`, `Class 4`. |
| **Section** | `section_name` | `VARCHAR(10)` | `A`, `A`, `A`, `A`. |
| **Class Teacher** | `teacher_names` | `TEXT` | Formatted staff name and code:<br>• `Shivam Verma (9002)`<br>• `Jason Sharlton (90006)`<br>• `Nishant Khare (1002)`<br>• `Aman Verma (654)` |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 4 of 4 entries`, `< 1 >`.

---

### 4. Slug `promote-students`: Session Transition & Cohort Progression

#### A. Screen Architecture & Visual Layout
Top Multi-Tier Filter Card + Bottom Student Promotion Register:
- **Card Title**: `Select Criteria`
- **Section 1 (Current Cohort Source)**:
  - `Class *`: Required dropdown selector with active purple border.
  - `Section *`: Required dropdown selector.
- **Section 2 (Promote Students In Next Session Target)**:
  - `Promote In Session *`: Required dropdown (e.g., `2027-28`).
  - `Class *`: Required target class dropdown.
  - `Section *`: Required target section dropdown.
  - `Search` Button: Bottom-right solid blue tactile trigger.

#### B. Results Promotion Register Grid (Post-Search)
Renders eligible students from the source cohort for promotion decisions:
- **Global Bulk Control**: `Select All` / `Deselect All` checkboxes.
- **Columns**:
  1. `Admission No` (Student code link).
  2. `Student Name` (Full name).
  3. `Father Name` (Parent name).
  4. `Date of Birth` (Formatted `MM/DD/YYYY`).
  5. `Current Result`: Dual radio option per student:
     - `(o) Pass` (Promotes to next class)
     - `( ) Fail` (Retains in current class)
  6. `Next Session Status`: Dropdown option:
     - `Continue` (Enrolls student into target session)
     - `Leave School` (Transfers student out / issues transfer certificate)
- **Submit Action**: `Promote` button (Triggers transactional bulk batch transfer and generates event `school.academic.students-promoted`).

---

### 5. Slug `subject-group`: Curriculum Track Association

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Subject Group`.
- **Right Column (~67% width)**: Data Grid Card titled `Subject Group List`.

#### B. Left Form Schema (`Add Subject Group`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Name \*** | `name` | `TEXT_INPUT` | Required text input with active purple focus outline (e.g., `Class 1 subject`, `Class 2 Subject`, `Class 3 Subject`, `Class 4 Subject`). |
| **Class \*** | `class_id` | `SELECT` | Required single-select dropdown. |
| **Sections \*** | `section_ids` | `MULTI_CHECKBOX` | Required multi-select checkboxes for all sections in the selected class. |
| **Subject \*** | `subject_ids` | `MULTI_CHECKBOX` | Required multi-select checkbox list of available subjects:<br>• `[ ] English`<br>• `[ ] Hindi`<br>• `[ ] Mathematics`<br>• `[ ] Science`<br>• `[ ] Social Studies`<br>• `[ ] French`<br>• `[ ] Drawing`<br>• `[ ] Computer`<br>• `[ ] Elective 1`<br>• `[ ] Elective 2`<br>• `[ ] Elective 3` |
| **Description** | `description` | `TEXTAREA` | Optional syllabus or curriculum notes. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right purple tactile button. |

#### C. Right Table Schema (`Subject Group List`)
- **Controls**: Print and Copy/PDF action icons.
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(100)` | Group name (e.g., `Class 4 Subject`, `Class 3 Subject`, `Class 2 Subject`, `Class 1 subject`). |
| **Class (Section)** | `class_sections` | `TEXT_LIST` | Multi-line numbered list of assigned class divisions:<br>`1. Class 4(A)`<br>`2. Class 4(B)`<br>`3. Class 4(C)`<br>`4. Class 4(D)` |
| **Subject** | `subjects_list` | `TEXT_LIST` | Multi-line list of curriculum subjects:<br>• `English`<br>• `Hindi`<br>• `Mathematics`<br>• `Science`<br>• `Social Studies`<br>• `French` |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |

---

### 6. Slug `subjects`: Master Subject Catalog

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Subject`.
- **Right Column (~67% width)**: Data Grid Card titled `Subject List`.

#### B. Left Form Schema (`Add Subject`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Subject Name \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(150)` with active purple focus outline. |
| **Subject Type \*** | `type` | `RADIO_GROUP` | Required inline radio options: `( ) Theory` vs. `( ) Practical`. |
| **Subject Code** | `code` | `TEXT_INPUT` | Optional alphanumeric code (e.g., `210`, `110`, `00220`). |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Subject List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records (11 Entries) |
|:---|:---|:---|:---|
| **Subject** | `name` | `VARCHAR(150)` | `English`, `Hindi`, `Mathematics`, `Science`, `Social Studies`, `French`, `Drawing`, `Computer`, `Elective 1`, `Elective 2`, `Elective 3`. |
| **Subject Code** | `code` | `VARCHAR(50)` | `210`, `230`, `110`, `111`, `212`, `231`, `200`, `00220`, `101`, `102`, `103`. |
| **Subject Type** | `type` | `VARCHAR(20)` | `Theory`, `Practical`. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 11 of 11 entries`, `< 1 >`.

---

### 7. Slug `class`: Academic Class Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Class`.
- **Right Column (~67% width)**: Data Grid Card titled `Class List`.

#### B. Left Form Schema (`Add Class`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Class \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(100)` with active purple focus outline. |
| **Sections \*** | `section_ids` | `MULTI_CHECKBOX` | Required multi-select checkboxes for all registered sections:<br>• `[ ] A`<br>• `[ ] B`<br>• `[ ] C`<br>• `[ ] D`<br>• `[ ] E` |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Class List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records |
|:---|:---|:---|:---|
| **Class** | `name` | `VARCHAR(100)` | `Class 5`, `Class 4`, `Class 3`, `Class 2`, `Class 1`. |
| **Sections** | `sections` | `TEXT_STACK` | Stacked vertical line list of assigned sections:<br>`A`<br>`B`<br>`C`<br>`D` |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 5 of 5 entries`, `< 1 >`.

---

### 8. Slug `sections`: Division Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Section`.
- **Right Column (~67% width)**: Data Grid Card titled `Section List`.

#### B. Left Form Schema (`Add Section`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Section Name \*** | `name` | `TEXT_INPUT` | Required, `VARCHAR(50)` with active purple focus outline. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Section List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print, Column Visibility).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records (5 Entries) |
|:---|:---|:---|:---|
| **Section** | `name` | `VARCHAR(50)` | `A`, `B`, `C`, `D`, `E`. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 5 of 5 entries`, `< 1 >`.


---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- Academic Hierarchy Tables

-- 1. Sections
CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_section UNIQUE (branch_id, name)
);

ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_sections ON sections
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 2. Classes
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_class UNIQUE (branch_id, name)
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_classes ON classes
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 3. Class-Section Association
CREATE TABLE class_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    CONSTRAINT uq_class_section UNIQUE (class_id, section_id)
);

-- 4. Subjects Master
CREATE TYPE subject_type_enum AS ENUM ('THEORY', 'PRACTICAL');

CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50),
    type subject_type_enum NOT NULL DEFAULT 'THEORY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_subject UNIQUE (branch_id, name, type)
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_subjects ON subjects
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 5. Subject Groups Master
CREATE TABLE subject_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE subject_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_subject_groups ON subject_groups
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

CREATE TABLE subject_group_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_group_id UUID NOT NULL REFERENCES subject_groups(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    CONSTRAINT uq_group_section UNIQUE (subject_group_id, section_id)
);

CREATE TABLE subject_group_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_group_id UUID NOT NULL REFERENCES subject_groups(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT uq_group_subject UNIQUE (subject_group_id, subject_id)
);

-- 6. Class Teacher Allocations
CREATE TABLE class_teacher_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_class_section_teacher UNIQUE (class_id, section_id, teacher_id)
);

ALTER TABLE class_teacher_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_class_teacher_assignments ON class_teacher_assignments
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 7. Academic Timetable Master
CREATE TYPE day_of_week_enum AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

CREATE TABLE academic_timetables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    day_of_week day_of_week_enum NOT NULL,
    time_from TIME NOT NULL,
    time_to TIME NOT NULL,
    room_no VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_timetable_window CHECK (time_to > time_from)
);

ALTER TABLE academic_timetables ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_academic_timetables ON academic_timetables
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );
```

---

### REST API Endpoints & Request Contracts

#### 1. Filter Class Timetable
- **Endpoint**: `GET /api/v1/academics/class-timetable`
- **Query Parameters**: `classId` (UUID, required), `sectionId` (UUID, required)
- **Response**: Array of day-grouped period schedules with subject, teacher, time window, and room.

#### 2. Filter Teacher Timetable
- **Endpoint**: `GET /api/v1/academics/teacher-timetable`
- **Query Parameters**: `teacherId` (UUID, required)
- **Response**: Weekly instructional schedule for the specified teacher across all classes.

#### 3. Assign Class Teachers
- **Endpoint**: `POST /api/v1/academics/class-teachers`
- **Payload**:
```json
{
  "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
  "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "teacherIds": [
    "5c8d1234-5678-90ab-cdef-1234567890ab",
    "6d9e2345-6789-01bc-def0-2345678901bc"
  ]
}
```

#### 4. Bulk Promote Students (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/academics/promote-students`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted` with `trackingId`.
- **Payload**:
```json
{
  "sourceSessionId": "2026-27",
  "targetSessionId": "2027-28",
  "targetClassId": "8e0c8293-469c-5b60-c6b2-88f9e0d91232",
  "targetSectionId": "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
  "promotions": [
    {
      "studentId": "8b3e1a2f-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
      "result": "PASS",
      "nextSessionStatus": "CONTINUE"
    },
    {
      "studentId": "9c4f2b3a-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
      "result": "FAIL",
      "nextSessionStatus": "CONTINUE"
    }
  ]
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.academic.students-promoted`
- **Partition Key**: `{branchId}#{targetClassId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "f8a7b6c5-4321-8765-dcba-9876543210fe",
    "eventType": "school.academic.students-promoted",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T11:00:00.000Z",
    "correlationId": "e1f2a3b4-5678-90ab-cdef-1234567890ef",
    "version": "1.0.0"
  },
  "payload": {
    "promotedCount": 42,
    "retainedCount": 3,
    "leftSchoolCount": 1,
    "sourceClassId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "targetClassId": "8e0c8293-469c-5b60-c6b2-88f9e0d91232",
    "sourceSessionId": "2026-27",
    "targetSessionId": "2027-28"
  }
}
```
