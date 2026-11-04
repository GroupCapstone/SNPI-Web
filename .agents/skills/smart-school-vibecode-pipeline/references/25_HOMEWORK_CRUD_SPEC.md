# Module 25: Homework CRUD Architecture & Academic Task Evaluation Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Homework** module governs the end-to-end lifecycle of academic assignments, daily student tasks, digital file submissions, and teacher evaluations. It provides teachers and academic administrators with dual operational workflows: overarching cohort-level assignment authoring with upcoming/closed status lifecycles (`Add Homework`), and daily student-level assignment submission evaluation registers (`Daily Assignment`).

- **Module Index**: `25`
- **Legacy Route Base**: `/admin/homework`
- **Modern Component Root**: `/super-admin/homework`
- **Functional Domain**: `Curriculum Task Authoring, Student Submissions & Grading Registers`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Ingress & Batch Grading**: Homework evaluation submissions for whole classes (e.g. 40+ students marked evaluated simultaneously with scores and comments) strictly follow Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/homework/evaluations` returns `HTTP 202 Accepted` with a `trackingId`, buffering grade persistence and parent push notifications to Kafka topic `school.academic.homework-evaluated`).
- **Lifecycle Engine**: Homework transitions deterministically between two states:
  - `Upcoming Homework`: Active assignments where `submission_date >= CURRENT_DATE`.
  - `Closed Homework`: Past-due assignments where `submission_date < CURRENT_DATE` or manually marked closed.

---

### Complete Slug Inventory & Route Mapping

The Homework module comprises **2 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `add-homework` | `/admin/homework` | `/super-admin/homework/add-homework` | Criteria Search + Dual-Tab Table + Modal | `homework` | `+ Add` Homework, Filter Criteria, Switch Tabs (`Upcoming`/`Closed`), Evaluate Cohort, Edit, Delete |
| **02** | `daily-assignment` | `/admin/homework/dailyassignment` | `/super-admin/homework/daily-assignment` | Strict 5-Point Criteria Search + Ledger | `student_daily_assignments`| Search by Date/Subject, View Submission, Evaluate Student, Export Suite |

---

### 1. Slug `add-homework`: Academic Assignment Authoring & Lifecycle Desk

#### A. Screen Architecture & Visual Layout
- **Top Criteria Filter Card**:
  - Container: White card with header `Select Criteria`.
  - Form Fields:
    1. `Class *`: Required dropdown selector with active purple outline (`rgba(142, 36, 170, 0.6)`), placeholder `Select`.
    2. `Section`: Optional dropdown selector, placeholder `Select`.
    3. `Subject Group`: Optional dropdown selector, placeholder `Select`.
    4. `Subject`: Optional dropdown selector, placeholder `Select`.
  - Right Action Trigger: `Search` button (solid purple tactile button `#8E24AA` with magnifying glass `search` glyph).
- **Main Section**: `Homework List`
  - Top-Right Action Button: `+ Add` (solid purple tactile button `#8E24AA` with plus glyph, opens assignment modal).
  - Dual Status Navigation Tabs:
    - `Upcoming Homework` (active tab with solid purple underline)
    - `Closed Homework`
- **Data Table Layout**:
  - Columns:
    1. `Class` (sortable)
    2. `Section` (sortable)
    3. `Subject Group` (sortable)
    4. `Subject` (sortable)
    5. `Homework Date` (sortable, formatted `MM/DD/YYYY`)
    6. `Submission Date` (sortable, formatted `MM/DD/YYYY`)
    7. `Evaluation Date` (sortable, formatted `MM/DD/YYYY`)
    8. `Created By` (sortable, format: `Staff Name (ID)`)
    9. `Action` (action buttons strip)
  - Action Controls Per Row:
    - **Evaluate Cohort** (`assignment_turned_in` purple button): Opens full-class student submission checklist modal.
    - **Edit** (`edit` purple button): Modifies assignment parameters.
    - **Delete** (`delete` purple/red button): Removes assignment record.
  - Empty State Handling:
    - Pinkish-red alert label: `No data available in table`.
    - Floating document folder SVG illustration.
    - Contextual prompt: `<- Add new record or search with different criteria.`
    - Footer: `Showing 0 to 0 of 0 entries.`

#### B. `+ Add Homework` Modal Form Schema
| Field Label | Field Name | Input Type | Validation & Rules |
|:---|:---|:---|:---|
| **Class \*** | `class_id` | `SELECT_DROPDOWN` | Required academic grade level. |
| **Section \*** | `section_id` | `SELECT_DROPDOWN` | Required class section. |
| **Subject Group \*** | `subject_group_id` | `SELECT_DROPDOWN` | Required subject curriculum group. |
| **Subject \*** | `subject_id` | `SELECT_DROPDOWN` | Cascades based on Subject Group selection. |
| **Homework Date \*** | `homework_date` | `DATEPICKER` | Issuance date (defaults to current date). |
| **Submission Date \*** | `submission_date` | `DATEPICKER` | Due date; must be `>= homework_date`. |
| **Max Marks** | `max_marks` | `NUMERIC_INPUT` | Optional evaluation scale (e.g. 100, 50, 10). |
| **Attach Document** | `document_file` | `FILE_DROPZONE` | PDF, DOC, DOCX, TXT, JPG, PNG. Max: 25MB. |
| **Description \*** | `description` | `WYSIWYG` | Detailed instructions, exercises, and problem statements. |

---

### 2. Slug `daily-assignment`: Student Daily Task Submission & Evaluation Ledger

#### A. Screen Architecture & Visual Layout
- **Top Criteria Filter Card**:
  - Container: White card with header `Select Criteria`.
  - Form Fields (All 5 Required with Red Asterisk `*`):
    1. `Class *`: Required dropdown selector with active purple outline, placeholder `Select`.
    2. `Section *`: Required dropdown selector, placeholder `Select`.
    3. `Subject Group *`: Required dropdown selector, placeholder `Select`.
    4. `Subject *`: Required dropdown selector, placeholder `Select`.
    5. `Date *`: Required datepicker input (`MM/DD/YYYY`), placeholder empty.
  - Right Action Trigger: `Search` button (solid purple tactile button `#8E24AA` with magnifying glass glyph).
- **Main Section**: `Daily Assignment List`
  - Search Bar: Left text input field `Search`.
  - Page Size Dropdown: `50` records.
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`.
- **Data Table Layout**:
  - Columns:
    1. `Student Name` (sortable)
    2. `Class` (sortable)
    3. `Section` (sortable)
    4. `Subject` (sortable)
    5. `Title` (sortable, assignment title)
    6. `Submission Date` (sortable, formatted `MM/DD/YYYY`)
    7. `Evaluation Date` (sortable, formatted `MM/DD/YYYY`)
    8. `Evaluated By` (sortable, format: `Staff Name (ID)`)
    9. `Action`
  - Action Controls Per Row:
    - **View / Evaluate Submission** (`rule` / `grading` purple button): Opens modal displaying submitted text, uploaded attachments, evaluation score input, and teacher comments.
    - **Download Attachment** (`download` blue button): Downloads student's completed assignment file.
  - Empty State Handling:
    - Red alert text: `No data available in table`.
    - Floating document folder SVG illustration.
    - Contextual prompt: `<- Add new record or search with different criteria.`
    - Footer: `Showing 0 to 0 of 0 entries.`

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Homework Master
CREATE TYPE homework_status_enum AS ENUM ('UPCOMING', 'CLOSED');

CREATE TABLE homework (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICTED,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICTED,
    subject_group_id UUID NOT NULL REFERENCES subject_groups(id) ON DELETE RESTRICTED,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICTED,
    homework_date DATE NOT NULL DEFAULT CURRENT_DATE,
    submission_date DATE NOT NULL,
    evaluation_date DATE,
    max_marks NUMERIC(5, 2),
    document_path VARCHAR(512),
    description TEXT NOT NULL,
    status homework_status_enum NOT NULL DEFAULT 'UPCOMING',
    created_by UUID NOT NULL REFERENCES staff(id),
    evaluated_by UUID REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_homework ON homework
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Student Homework Submissions & Evaluations
CREATE TYPE assignment_submission_status_enum AS ENUM ('SUBMITTED', 'PENDING', 'LATE', 'EVALUATED');

CREATE TABLE student_daily_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    homework_id UUID NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    submission_text TEXT,
    attachment_path VARCHAR(512),
    marks_obtained NUMERIC(5, 2),
    evaluation_date DATE,
    evaluated_by UUID REFERENCES staff(id),
    teacher_note TEXT,
    status assignment_submission_status_enum NOT NULL DEFAULT 'SUBMITTED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE student_daily_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_student_daily_assignments ON student_daily_assignments
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Add Homework Assignment
- **Endpoint**: `POST /api/v1/homework`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Content-Type**: `multipart/form-data`
- **Payload**:
```json
{
  "classId": "a1b2c3d4-1111-2222-3333-444455556666",
  "sectionId": "b2c3d4e5-2222-3333-4444-555566667777",
  "subjectGroupId": "c3d4e5f6-3333-4444-5555-666677778888",
  "subjectId": "d4e5f6a7-4444-5555-6666-777788889999",
  "homeworkDate": "2026-09-12",
  "submissionDate": "2026-09-18",
  "maxMarks": 100.00,
  "description": "<p>Complete Chapter 4 Exercises 1 through 10 in your workbook.</p>"
}
```

#### 2. Evaluate Class Homework Cohort (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/homework/{homeworkId}/evaluations`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted`
- **Payload**:
```json
{
  "evaluationDate": "2026-09-19",
  "studentEvaluations": [
    {
      "studentId": "e5f6a7b8-1111-0000-0000-000000000001",
      "marksObtained": 92.50,
      "status": "EVALUATED",
      "teacherNote": "Excellent problem solving."
    },
    {
      "studentId": "e5f6a7b8-2222-0000-0000-000000000002",
      "marksObtained": 78.00,
      "status": "EVALUATED",
      "teacherNote": "Good work; check calculation on problem 5."
    }
  ]
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.academic.homework-evaluated`
- **Partition Key**: `{branchId}#{classId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
    "eventType": "school.academic.homework-evaluated",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T12:45:00.000Z",
    "correlationId": "e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    "version": "1.0.0"
  },
  "payload": {
    "homeworkId": "f1e2d3c4-5555-6666-7777-888899990000",
    "classId": "a1b2c3d4-1111-2222-3333-444455556666",
    "sectionId": "b2c3d4e5-2222-3333-4444-555566667777",
    "subjectId": "d4e5f6a7-4444-5555-6666-777788889999",
    "evaluatedBy": "9000",
    "evaluatedCount": 38,
    "averageScore": 84.50
  }
}
```
