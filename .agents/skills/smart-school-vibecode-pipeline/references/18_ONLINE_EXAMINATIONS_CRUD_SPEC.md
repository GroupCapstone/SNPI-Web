# Module 18: Online Examinations CRUD Architecture & CBT Assessment Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Online Examinations** module delivers an enterprise-grade Computer-Based Testing (CBT), online quizzing, question bank authoring, and automated/manual grading engine. It empowers teachers and academic deans to build reusable multi-tier question banks (Single Choice, Multiple Choice, True/False, Descriptive), schedule time-bound online exams and continuous micro-quizzes, assign student cohorts, dynamically randomize questions, enforce strict countdown timers, and evaluate both objective auto-scored questions and subjective descriptive essays.

- **Module Index**: `18`
- **Legacy Route Base**: `/admin/onlineexam`
- **Modern Component Root**: `/super-admin/online-examinations`
- **Functional Domain**: `CBT Assessment, E-Quizzing & Question Bank Repository`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Submissions**: Exam submission bursts (e.g., hundreds of students submitting within the same 60-second window) utilize the **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/online-exams/{id}/submit` returns `HTTP 202 Accepted` with a `trackingId` and buffers attempts to Kafka topic `school.assessment.cbt-exam-submitted`).
- **Hybrid Auto & Manual Grading Engine**: Objective questions (Single Choice, Multiple Choice, True/False) are instantly evaluated in-memory or via background worker; descriptive essays route to an academic evaluator queue.

---

### Complete Slug Inventory & Route Mapping

The Online Examinations module comprises **2 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `online-exam` | `/admin/onlineexam` | `/super-admin/online-examinations/online-exam` | Dual Tab Switcher + 7-Action Master Grid | `online_exams` | `+ Add Exam`, Upcoming vs Closed tabs, Assign Students, Add Questions, Evaluate Results, Publish Results |
| **02** | `question-bank` | `/admin/question` | `/super-admin/online-examinations/question-bank` | 6-Tier Criteria Filter + Multi-Select Action Grid | `online_question_bank` | `+ Add Question`, `+ Import`, `Bulk Delete`, 6-field filter search, View/Edit/Delete questions |

---

### 1. Slug `online-exam`: CBT Exam & Quiz Management Engine

#### A. Screen Architecture & Visual Layout
Dual-tab header layout with instant tab switching, top-right primary trigger, real-time client search, and 7-action button strips:

- **Top Action Header**:
  - Screen Title: `Online Exam List`
  - Action Trigger: `+ Add Exam` (Solid tactile purple button on top right).
- **Navigation Tabs**:
  - `Upcoming Exams` (Active tab by default, filters exams where `exam_to >= CURRENT_TIMESTAMP`).
  - `Closed Exams` (Filters archived/concluded exams where `exam_to < CURRENT_TIMESTAMP`).
- **Toolbar & Table Controls**:
  - `Search` input field with instant debounce filter.
  - Page size dropdown selector: `50` rows per page.
  - Export action icons: `Copy`, `Excel`, `CSV`, `PDF`, `Print`.

#### B. Master Data Table Schema (`online_exams`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Exam** | `title` | `VARCHAR(255)` | Exam title link (e.g., `Assignment 1(september)`, `Monthly Assessment(september)`, `Quiz`). |
| **Quiz** | `is_quiz` | `BOOLEAN` | Checkbox icon / badge indicator: checked box if enabled, empty box if disabled. |
| **Questions** | `total_questions` / `descriptive_count` | `COMPOSITE` | Total question count with descriptive breakdown in parentheses (e.g., `16 (Descriptive:6)`, `10 (Descriptive:4)`, `20 (Descriptive:0)`). |
| **Attempt** | `allowed_attempts` | `INT` | Permitted submission attempts per student (e.g., `5`, `4`, `1`). |
| **Exam From** | `exam_from` | `TIMESTAMP` | Formatted `MM/DD/YYYY HH:MM a` (e.g., `09/26/2026 05:16 pm`, `09/20/2026 02:57 pm`, `09/12/2026 05:07 pm`). |
| **Exam To** | `exam_to` | `TIMESTAMP` | Formatted `MM/DD/YYYY HH:MM a` (e.g., `09/30/2026 05:16 pm`, `09/25/2026 02:57 pm`, `09/19/2026 05:07 pm`). |
| **Duration** | `duration` | `TIME` | Exam time limit formatted `HH:MM:SS` (e.g., `01:00:00`, `00:45:00`). |
| **Exam Published** | `is_published` | `BOOLEAN` | Checkbox icon: checked box indicates visible on student portal; unchecked indicates draft. |
| **Result Published** | `is_result_published` | `BOOLEAN` | Status badge/indicator: info icon circle indicates pending/unpublished; checkmark indicates published to student report cards. |
| **Description** | `description` | `TEXT` | Summary or instructions snippet (e.g., `Assignment 1`, `Monthly Assessment(september)`, `Quiz`). |
| **Action** | *Controls* | `ACTIONS` | Comprehensive 7-button tactile strip (purple/indigo rounded square buttons):<br>1. **View / Card** (`visibility`): Quick modal view of exam configuration.<br>2. **Assign Students** (`person_add`): Cohort enrollment matrix.<br>3. **Add Questions** (`playlist_add`): Question bank picker & sequencing.<br>4. **Edit** (`edit`): Opens exam configuration editor.<br>5. **Evaluate Submissions** (`fact_check`): Student submission grading desk.<br>6. **Exam Report** (`assessment`): Class analytics, marksheet, item analysis.<br>7. **Delete** (`close`): Hard/soft deletion with confirmation modal. |

#### C. `+ Add Exam` Modal Schema

| Field Label | Field Name | Input Type | Validation & Rules |
|:---|:---|:---|:---|
| **Exam Title \*** | `title` | `TEXT_INPUT` | Required. Unique per branch academic term. |
| **Exam From \*** | `exam_from` | `DATETIME_PICKER` | Required. Start window of assessment availability. |
| **Exam To \*** | `exam_to` | `DATETIME_PICKER` | Required. Must be strictly greater than `exam_from`. |
| **Duration \*** | `duration` | `TIME_PICKER` | Required. Format `HH:MM:SS`. Auto-timer on student screen. |
| **Attempt \*** | `allowed_attempts` | `NUMBER_INPUT` | Default: `1`. Range: `1` to `20`. |
| **Passing Percentage \*** | `passing_percentage` | `DECIMAL(5,2)` | Default: `40.00`. Range: `0.00` to `100.00`. |
| **Is Quiz** | `is_quiz` | `CHECKBOX` | If checked, questions display one-by-one with immediate next navigation. |
| **Publish Exam** | `is_published` | `CHECKBOX` | If checked, makes exam live on student dashboard. |
| **Publish Result** | `is_result_published` | `CHECKBOX` | If checked, students see scores upon submission completion. |
| **Negative Marking** | `negative_marking` | `CHECKBOX` | Deducts question negative marks for wrong objective answers. |
| **Display Marks in Exam** | `display_marks` | `CHECKBOX` | Shows points weight per question to student during test. |
| **Randomize Questions** | `randomize_questions` | `CHECKBOX` | Shuffles question order per student session to prevent peering. |
| **Description** | `description` | `TEXTAREA` | General exam instructions and terms. |

#### D. Specialized Sub-Workflows

1. **Assign Students Modal (`person_add`)**:
   - Filter criteria: `Class *` and `Section *`.
   - Roster grid with multi-select checkboxes: `Admission No`, `Student Name`, `Class`, `Father Name`, `Gender`, `Category`.
   - Buttons: `Select All`, `Deselect All`, `Save Assigned Students`.
2. **Add Questions Modal / Drawer (`playlist_add`)**:
   - Dual sub-tabs: `Question Bank` (Pick from master repository) and `Add New Question` (Create directly for this exam).
   - Shows question count meter: `Total Questions: N | Descriptive: M | Total Marks: X`.
   - Drag-and-drop handles for manual sequence re-ordering.
3. **Evaluate Submissions Desk (`fact_check`)**:
   - Filter by `Class` and `Section`.
   - Student attempt roster: `Admission No`, `Student Name`, `Attempt`, `Start Time`, `End Time`, `Total Questions`, `Answered`, `Objective Score`, `Descriptive Status` (`Evaluated`, `Pending Evaluation`), `Final Score`, `Status` (`Pass`, `Fail`).
   - 1-Click Evaluation Drawer: Displays student text/image submissions for descriptive questions alongside teacher rubric scoring input.

---

### 2. Slug `question-bank`: Reusable Question Repository

#### A. Screen Architecture & Visual Layout
Dual-card layout consisting of a top multi-field criteria filter and a bottom master questions data grid with batch tools:

- **Top Card (`Select Criteria`)**:
  - Action Header:
    - `+ Add Question` (Purple tactile button).
    - `+ Import` (Purple tactile button for bulk CSV/Excel intake).
    - `Bulk Delete` (Purple tactile button, triggers bulk removal of checked items).
  - 6-Field Responsive Filter Matrix:
    1. `Class`: Dropdown selector (`Class 1`, `Class 2`, ..., `Class 12`).
    2. `Section`: Dropdown selector (`A`, `B`, `C`, `D`).
    3. `Subject`: Dropdown selector (`Science (111)`, `Social Studies (212)`, `English (210)`, `Mathematics (110)`).
    4. `Question Type`: Dropdown selector (`Single Choice`, `Multiple Choice`, `True/False`, `Descriptive`).
    5. `Question Level`: Dropdown selector (`Low`, `Medium`, `High`).
    6. `Created By`: Dropdown selector (Staff members e.g., `Joe Black (9000)`).
  - Bottom Action:
    - `Search` (Solid blue tactile button with magnifying glass icon).

- **Bottom Card (`Question Bank`)**:
  - `Search` input field with real-time text matching.
  - Page size dropdown selector (`50`).
  - Export action toolbar (`Copy`, `Excel`, `CSV`, `PDF`, `Print`).

#### B. Master Data Table Schema (`online_question_bank`)

| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Checkbox** | `selected` | `CHECKBOX` | Header select-all and individual row select for batch deletion / assignment. |
| **Q. ID** | `id` | `INT` | Master question identifier sequence (e.g., `100`, `99`, `98`, `97`, `96`, `95`, `94`, `93`, `92`, `91`, `90`). |
| **Class** | `class_name` / `section_name` | `VARCHAR(50)` | Cohort grade and section (e.g., `Class 1 (A)`, `Class 2 (A)`). |
| **Subject** | `subject_name` / `subject_code` | `VARCHAR(100)` | Subject with code in parentheses (e.g., `Science (111)`, `Social Studies (212)`, `English (210)`, `Mathematics (110)`). |
| **Question Type** | `question_type` | `ENUM` | Clear badge/label:<br>• `Single Choice`<br>• `Multiple Choice`<br>• `True/False`<br>• `Descriptive` |
| **Level** | `difficulty_level` | `ENUM` | Difficulty classification:<br>• `Low` (Easy)<br>• `Medium` (Intermediate)<br>• `High` (Advanced) |
| **Question** | `question_text` / `options_preview` | `RICH_TEXT` | Question statement followed by inline option previews with correct answer flagged with a green checkmark `[v]`:<br>• *Single Choice*: `Which planet is known as the Red Planet? A] Earth B) Mars [v] C) Venus D) Jupiter`<br>• *Single Choice*: `Q1. What is the capital of India? A) Mumbai B) Delhi [v] C) Kolkata D) Chennai`<br>• *Descriptive*: `Q2. Describe the water cycle with a diagram.`<br>• *Descriptive*: `[v] 1. Descriptive (Long Answer) Q1. Explain the importance of education in our life.`<br>• *True/False*: `The sun rises in the East. (True / False)`<br>• *Multiple Choice*: `Which are fruits? [] Apple [] Mango [] Car [] Banana` |
| **Created By** | `created_by_staff` | `VARCHAR(100)` | Author name and staff code (e.g., `Joe Black (9000)`). |
| **Action** | *Controls* | `ACTIONS` | 3 Purple tactile icon buttons:<br>1. **View** (`visibility`): Full question preview modal with rich text, formula rendering, and image attachments.<br>2. **Edit** (`edit`): Opens question authoring editor.<br>3. **Delete** (`close`): Single question removal with dependency checks. |

#### C. `+ Add Question` Authoring Form Schema

| Section | Field Label | Field Name | Input Type | Validation & Options |
|:---|:---|:---|:---|:---|
| **Metadata** | `Subject *` | `subject_id` | `SELECT` | Required. Linked to academic subjects. |
| | `Class *` | `class_id` | `SELECT` | Required. |
| | `Section *` | `section_id` | `SELECT` | Required. |
| | `Question Type *` | `question_type` | `SELECT` | Required. `SINGLE_CHOICE`, `MULTIPLE_CHOICE`, `TRUE_FALSE`, `DESCRIPTIVE`. |
| | `Question Level *` | `difficulty_level` | `SELECT` | Required. `LOW`, `MEDIUM`, `HIGH`. |
| | `Marks *` | `marks` | `DECIMAL(5,2)` | Required. Positive points awarded (e.g., `1.00`, `5.00`). |
| | `Negative Marks` | `negative_marks` | `DECIMAL(5,2)` | Default: `0.00`. Deducted for incorrect answers. |
| **Content** | `Question *` | `question_text` | `WYSIWYG` | Rich text editor with image upload, tables, and LaTeX math formulas. |
| **Answer Engine** | **Single Choice** | `options` | Dynamic fields | Options `A`, `B`, `C`, `D`, `E` (optional) with radio button to designate single correct answer. |
| | **Multiple Choice** | `options` | Dynamic fields | Options `A`, `B`, `C`, `D`, `E` with checkboxes to select multiple correct answers. |
| | **True / False** | `true_false_answer`| `RADIO` | Radio choice: `True` or `False`. |
| | **Descriptive** | `rubric_guidelines`| `WYSIWYG` | Model answer rubric and evaluation criteria for teachers. Max word count limit. |
| **Explanation** | `General Explanation` | `explanation` | `TEXTAREA` | Shown to students during review post-results publication. |

#### D. `+ Import` Bulk CSV Modal Schema
- Dropzone supporting `.csv` and `.xlsx` files.
- `Download Sample File` action link providing standard headers:
  `class, section, subject, question_type, level, question, option_a, option_b, option_c, option_d, option_e, correct_answer, marks, negative_marks, explanation`
- Validation summary grid reporting parsed row count, valid rows, and formatting errors before database commit.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- Enums for Online Examination System
CREATE TYPE online_exam_question_type AS ENUM (
    'SINGLE_CHOICE',
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'DESCRIPTIVE'
);

CREATE TYPE online_exam_level AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH'
);

CREATE TYPE online_exam_attempt_status AS ENUM (
    'IN_PROGRESS',
    'SUBMITTED',
    'EVALUATED'
);

CREATE TYPE online_exam_evaluation_status AS ENUM (
    'AUTO_EVALUATED',
    'PENDING_REVIEW',
    'MANUALLY_EVALUATED'
);

-- 1. Master Online Exam Table
CREATE TABLE online_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE RESTRICTED,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    title VARCHAR(255) NOT NULL,
    exam_from TIMESTAMP WITH TIME ZONE NOT NULL,
    exam_to TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTERVAL NOT NULL,
    allowed_attempts INT NOT NULL DEFAULT 1,
    passing_percentage NUMERIC(5,2) NOT NULL DEFAULT 40.00,
    is_quiz BOOLEAN NOT NULL DEFAULT FALSE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    is_result_published BOOLEAN NOT NULL DEFAULT FALSE,
    negative_marking BOOLEAN NOT NULL DEFAULT FALSE,
    display_marks BOOLEAN NOT NULL DEFAULT TRUE,
    randomize_questions BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_online_exam_window CHECK (exam_to > exam_from)
);

-- Row-Level Security: online_exams
ALTER TABLE online_exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_online_exams ON online_exams
    FOR ALL
    USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 2. Master Question Bank
CREATE TABLE online_question_bank (
    id SERIAL PRIMARY KEY,
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE RESTRICTED,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICTED,
    section_id UUID REFERENCES sections(id) ON DELETE SET NULL,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE RESTRICTED,
    question_type online_exam_question_type NOT NULL,
    difficulty_level online_exam_level NOT NULL DEFAULT 'MEDIUM',
    question_text TEXT NOT NULL,
    options JSONB, -- Array of { "key": "A", "text": "...", "image_url": null }
    correct_answer JSONB NOT NULL, -- Array of keys: ["A"] or ["A", "C"] or boolean true/false
    rubric_guidelines TEXT, -- Model answer for descriptive questions
    marks NUMERIC(5,2) NOT NULL DEFAULT 1.00,
    negative_marks NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    explanation TEXT,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row-Level Security: online_question_bank
ALTER TABLE online_question_bank ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_online_question_bank ON online_question_bank
    FOR ALL
    USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 3. Exam-to-Question Join Table (Exam Question Paper)
CREATE TABLE online_exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    online_exam_id UUID NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
    question_id INT NOT NULL REFERENCES online_question_bank(id) ON DELETE RESTRICTED,
    sort_order INT NOT NULL DEFAULT 0,
    marks NUMERIC(5,2) NOT NULL,
    negative_marks NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_exam_question UNIQUE (online_exam_id, question_id)
);

-- 4. Assigned Students
CREATE TABLE online_exam_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    online_exam_id UUID NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_exam_student UNIQUE (online_exam_id, student_id)
);

-- 5. Student Exam Attempts
CREATE TABLE online_exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    online_exam_id UUID NOT NULL REFERENCES online_exams(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL DEFAULT 1,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submit_time TIMESTAMP WITH TIME ZONE,
    status online_exam_attempt_status NOT NULL DEFAULT 'IN_PROGRESS',
    objective_score NUMERIC(7,2) DEFAULT 0.00,
    descriptive_score NUMERIC(7,2) DEFAULT 0.00,
    total_score NUMERIC(7,2) DEFAULT 0.00,
    is_passed BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    CONSTRAINT uq_student_attempt UNIQUE (online_exam_id, student_id, attempt_number)
);

-- 6. Student Question Answers
CREATE TABLE online_exam_student_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES online_exam_attempts(id) ON DELETE CASCADE,
    question_id INT NOT NULL REFERENCES online_question_bank(id) ON DELETE RESTRICTED,
    student_response JSONB, -- Selected option keys or descriptive text string
    attachment_url VARCHAR(500),
    is_correct BOOLEAN,
    marks_awarded NUMERIC(5,2) DEFAULT 0.00,
    evaluation_status online_exam_evaluation_status NOT NULL DEFAULT 'AUTO_EVALUATED',
    evaluator_remarks TEXT,
    evaluated_by UUID REFERENCES staff(id),
    evaluated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_attempt_question UNIQUE (attempt_id, question_id)
);
```

---

### REST API Endpoints & Request Contracts

#### 1. List Online Exams
- **Endpoint**: `GET /api/v1/online-exams`
- **Query Parameters**:
  - `tab`: `UPCOMING` | `CLOSED` (Default: `UPCOMING`)
  - `search`: String
  - `page`: Integer (Default: 0)
  - `size`: Integer (Default: 50)
- **Response**: Paginated `OnlineExamResponseDto` list with questions count and descriptive breakdown.

#### 2. Create Online Exam
- **Endpoint**: `POST /api/v1/online-exams`
- **Headers**: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
- **Payload**:
```json
{
  "title": "Monthly Assessment (September)",
  "examFrom": "2026-09-20T14:57:00Z",
  "examTo": "2026-09-25T14:57:00Z",
  "duration": "01:00:00",
  "allowedAttempts": 4,
  "passingPercentage": 40.00,
  "isQuiz": true,
  "isPublished": true,
  "isResultPublished": false,
  "negativeMarking": false,
  "displayMarks": true,
  "randomizeQuestions": true,
  "description": "Monthly Assessment (September)"
}
```

#### 3. Filter Question Bank
- **Endpoint**: `GET /api/v1/question-bank`
- **Query Parameters**:
  - `classId`: UUID (optional)
  - `sectionId`: UUID (optional)
  - `subjectId`: UUID (optional)
  - `questionType`: `SINGLE_CHOICE` | `MULTIPLE_CHOICE` | `TRUE_FALSE` | `DESCRIPTIVE` (optional)
  - `difficultyLevel`: `LOW` | `MEDIUM` | `HIGH` (optional)
  - `createdBy`: UUID (optional)
  - `search`: String (optional)
  - `page`: Integer
  - `size`: Integer

#### 4. Add Question to Bank
- **Endpoint**: `POST /api/v1/question-bank`
- **Payload**:
```json
{
  "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
  "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "subjectId": "2c9d1234-5678-90ab-cdef-1234567890ab",
  "questionType": "SINGLE_CHOICE",
  "difficultyLevel": "MEDIUM",
  "questionText": "Which planet is known as the Red Planet?",
  "marks": 1.00,
  "negativeMarks": 0.25,
  "options": [
    { "key": "A", "text": "Earth" },
    { "key": "B", "text": "Mars" },
    { "key": "C", "text": "Venus" },
    { "key": "D", "text": "Jupiter" }
  ],
  "correctAnswer": ["B"],
  "explanation": "Mars appears reddish due to iron oxide on its surface."
}
```

#### 5. High-Velocity Exam Submission (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/online-exams/{id}/submit`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted` with `trackingId`.
- **Payload**:
```json
{
  "attemptId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "studentId": "8b3e1a2f-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
  "answers": [
    { "questionId": 100, "selectedOptions": ["B"] },
    { "questionId": 99, "selectedOptions": ["B"] },
    { "questionId": 98, "descriptiveText": "The water cycle consists of evaporation, condensation, and precipitation." }
  ]
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.assessment.cbt-exam-submitted`
- **Partition Key**: `{branchId}#{studentId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "a7b8c9d0-1234-5678-90ab-cdef12345678",
    "eventType": "school.assessment.cbt-exam-submitted",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T10:15:30.125Z",
    "correlationId": "b1a2c3d4-9876-5432-10fe-dcba98765432",
    "version": "1.0.0"
  },
  "payload": {
    "onlineExamId": "e1f2a3b4-5678-90ab-cdef-1234567890ef",
    "attemptId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "studentId": "8b3e1a2f-3c4d-5e6f-7a8b-9c0d1e2f3a4b",
    "attemptNumber": 1,
    "totalQuestions": 16,
    "objectiveCount": 10,
    "descriptiveCount": 6,
    "submittedAt": "2026-09-12T10:15:30Z",
    "autoEvaluationRequested": true
  }
}
```

---

### Summary of Directives & Operational Compliance

1. **Dual Tab Segregation**: Upcoming exams (`exam_to >= now`) and closed exams (`exam_to < now`) are partitioned at the database query level to preserve fast list hydration.
2. **7-Action Strip Precision**: The master exam list strictly implements the 7 action buttons: View, Assign Students, Add Questions, Edit, Evaluate Submissions, Exam Report, and Delete.
3. **Multi-Type Question Bank Engine**: Questions support Single Choice, Multiple Choice, True/False, and Descriptive evaluation. Inline visual checks `[v]` immediately distinguish the answer keys in the UI.
4. **Resilient CBT Ingress**: Burst exam hand-ins are processed asynchronously via Kafka to prevent connection pool exhaustion during concurrent exam finishes.
