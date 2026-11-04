# Module 21: Lesson Plan CRUD Architecture & Curriculum Progress Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Lesson Plan** module delivers instructional management, curriculum decomposition (Class -> Subject Group -> Subject -> Lesson -> Topic), syllabus completion tracking, and weekly teacher lesson scheduling. It enables academic leadership to monitor teaching pace, verify lesson plan alignment against accredited standards, track topic completion percentages, and clone entire curriculum structures across academic sessions with a single command.

- **Module Index**: `21`
- **Legacy Route Base**: `/admin/lessonplan`, `/admin/syllabus`
- **Modern Component Root**: `/super-admin/lesson-plan`
- **Functional Domain**: `Curriculum Management, Syllabus Progression & Lesson Planning`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Dynamic Array Ingress**: Lesson and Topic creation forms support client-side dynamic input expansion (`+ Add More` button) to submit multi-row payloads in an atomic transaction (`POST /api/v1/lesson-plan/lessons/batch`).
- **Session Cloning Pipeline**: `copy-old-lessons` clones past academic session syllabus structures into the active session via an asynchronous Kafka worker (`school.curriculum.lessons-cloned`).

---

### Complete Slug Inventory & Route Mapping

The Lesson Plan module comprises **5 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `copy-old-lessons` | `/admin/lessonplan/copylessons` | `/super-admin/lesson-plan/copy-old-lessons` | 5-Tier Cascading Filter Card | `lessons` / `lesson_topics` | Select Old Session, Class, Section, Subject Group, Subject, Clone Syllabus |
| **02** | `manage-lesson-plan` | `/admin/lessonplan` | `/super-admin/lesson-plan/manage-lesson-plan` | Single Teacher Filter + Weekly Matrix | `teacher_lesson_plans` | Select Teacher, View weekly instructional schedule, Create/Edit Day Plans |
| **03** | `manage-syllabus-status` | `/admin/syllabus` | `/super-admin/lesson-plan/manage-syllabus-status` | 4-Tier Cascading Filter + Progress Tree | `lesson_topics` | Filter Cohort/Subject, View Completion %, Toggle Topic Complete/In-Progress |
| **04** | `lesson` | `/admin/lessonplan/lesson` | `/super-admin/lesson-plan/lesson` | Split 2-Column with `+ Add More` (Pattern B) | `lessons` | Class/Section/Group/Subject cascading form, Multi-lesson row intake, Edit, Delete |
| **05** | `topic` | `/admin/lessonplan/topic` | `/super-admin/lesson-plan/topic` | Split 2-Column with `+ Add More` (Pattern B) | `lesson_topics` | 5-Tier cascading form (including Lesson), Multi-topic row intake, Edit, Delete |

---

### 1. Slug `copy-old-lessons`: Cross-Session Syllabus Cloning Engine

#### A. Screen Architecture & Visual Layout
Top Filter Card layout:
- **Card Title**: `Select Old Session Details`
- **Form Controls (Single Responsive Row)**:
  1. `Session *`: Required single-select dropdown (e.g., `2025-26`).
  2. `Class *`: Required single-select dropdown (`Class 1`, `Class 2`, ..., `Class 12`).
  3. `Section *`: Required single-select dropdown (`A`, `B`, `C`, `D`).
  4. `Subject Group *`: Required cascading dropdown (e.g., `Class 1 subject`).
  5. `Subject *`: Required cascading dropdown (e.g., `Science (111)`).
  6. `Search` Button: Right-aligned solid blue tactile trigger with magnifying glass icon.

#### B. Results Roster & Cloning Execution
- Displays tree preview of lessons and topics from the historical session.
- Action Bar: `Clone Selected Lessons to Current Session (2026-27)`.
- Backend executes idempotent deep copy into current session with parent-child foreign key re-mapping.

---

### 2. Slug `manage-lesson-plan`: Weekly Instructor Lesson Scheduler

#### A. Screen Architecture & Visual Layout
- **Card Title**: `Manage Lesson Plan`
- **Filter Row**:
  1. `Teachers *`: Required single-select dropdown populated with instructional staff (e.g., `Shivam Verma (9002)`).
  2. `Search` Button: Adjacent solid blue tactile trigger.

#### B. Weekly Planner Schedule Matrix (Monday to Saturday)
- Calendar grid columns for each weekday.
- Card cells contain: Period time slot, Class, Section, Subject, Lesson, Topic, and Plan Status.
- `+ Add Lesson Plan` modal:
  - `Date *`, `Time From *`, `Time To *`
  - `Lesson *`, `Topic *`, `Sub Topic`
  - `General Objectives`, `Teaching Method`, `Previous Knowledge`, `Comprehensive Questions`
  - `Lecture Video URL`, `Attachment Dropzone`

---

### 3. Slug `manage-syllabus-status`: Syllabus Completion & Pacing Matrix

#### A. Screen Architecture & Visual Layout
- **Card Title**: `Select Criteria`
- **Form Controls (Single Responsive Row)**:
  1. `Class *`: Required dropdown with active purple outline.
  2. `Section *`: Required dropdown.
  3. `Subject Group *`: Required cascading dropdown.
  4. `Subject *`: Required cascading dropdown.
  5. `Search` Button: Solid blue tactile trigger.

#### B. Syllabus Progress Tree (Post-Search)
- Overall Subject Completion Meter (Progress bar and percentage, e.g., `68% Completed`).
- Nested Lesson Accordion:
  - Lesson Header: Lesson Name, Total Topics, Completed Topics count.
  - Topic Items: Topic Name, Status Badge (`Complete` green, `Incomplete` gray), Action to Mark Complete with completion datepicker.

---

### 4. Slug `lesson`: Curriculum Lesson Decomposition

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Lesson`.
- **Right Column (~67% width)**: Data Grid Card titled `Lesson List`.

#### B. Left Form Schema (`Add Lesson`)
| Form Field Label | Field Name | Input Type | Validation & Rules |
|:---|:---|:---|:---|
| **Class \*** | `class_id` | `SELECT` | Required single-select dropdown with active purple outline. |
| **Section \*** | `section_id` | `SELECT` | Required single-select dropdown. |
| **Subject Group \*** | `subject_group_id` | `SELECT` | Required cascading dropdown. |
| **Subject \*** | `subject_id` | `SELECT` | Required cascading dropdown. |
| **Action Link** | `add_more_trigger` | `BUTTON` | Blue tactile pill `+ Add More` (appends additional `Lesson Name` rows). |
| **Lesson Name \*** | `lesson_names[]` | `TEXT_ARRAY` | Array of text inputs, each with red `x` remove button for dynamic rows. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Lesson List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records Sample |
|:---|:---|:---|:---|
| **Class** | `class_name` | `VARCHAR(50)` | `Class 1`, `Class 2`, `Class 3`, `Class 4`. |
| **Section** | `section_name` | `VARCHAR(10)` | `A`. |
| **Subject Group** | `subject_group_name`| `VARCHAR(100)` | `Class 1 subject`, `Class 2 Subject`, `Class 3 Subject`, `Class 4 Subject`. |
| **Subject** | `subject_name_code` | `VARCHAR(150)` | `English (210)`, `Hindi (230)`, `Mathematics (110)`, `Science (111)`, `Social Studies (212)`. |
| **Lesson** | `lessons` | `TEXT_STACK` | Stacked multi-line list of lessons:<br>• `Chapter 1`<br>• `First Day at School`<br>• `The Wind and the Sun`<br>• `Storm in the Garden`<br>• `The Grasshopper and the Ant` |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`close`/`x`). |
- **Pagination**: `Showing 1 to 9 of 9 entries`, `< 1 >`.

---

### 5. Slug `topic`: Micro-Topic Learning Objectives

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Topic`.
- **Right Column (~67% width)**: Data Grid Card titled `Topic List`.

#### B. Left Form Schema (`Add Topic`)
| Form Field Label | Field Name | Input Type | Validation & Rules |
|:---|:---|:---|:---|
| **Class \*** | `class_id` | `SELECT` | Required single-select dropdown with active purple outline. |
| **Section \*** | `section_id` | `SELECT` | Required single-select dropdown. |
| **Subject Group \*** | `subject_group_id` | `SELECT` | Required cascading dropdown. |
| **Subject \*** | `subject_id` | `SELECT` | Required cascading dropdown. |
| **Lesson \*** | `lesson_id` | `SELECT` | Required cascading dropdown (filters lessons belonging to selected subject). |
| **Action Link** | `add_more_trigger` | `BUTTON` | Blue tactile pill `+ Add More` (appends additional `Topic Name` rows). |
| **Topic Name \*** | `topic_names[]` | `TEXT_ARRAY` | Array of text inputs, each with red `x` remove button for dynamic rows. |
| **Save Button** | *Submit* | `BUTTON` | Bottom-right solid purple tactile button. |

#### C. Right Table Schema (`Topic List`)
- **Controls**: Search input field, page size dropdown (`50`), export suite (Copy, Excel, CSV, PDF, Print).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Exact Screen Records Sample |
|:---|:---|:---|:---|
| **Class** | `class_name` | `VARCHAR(50)` | `Class 1`, `Class 2`, `Class 3`. |
| **Section** | `section_name` | `VARCHAR(10)` | `A`. |
| **Subject Group** | `subject_group_name`| `VARCHAR(100)` | `Class 1 subject`, `Class 2 Subject`, `Class 3 Subject`. |
| **Subject** | `subject_name_code` | `VARCHAR(150)` | `English (210)`, `Hindi (230)`, `Mathematics (110)`, `Science (111)`. |
| **Lesson** | `lesson_name` | `VARCHAR(255)` | `Chapter 1`, `त्योहारों की खुशियाँ`, `Size and Shape`, `First Day at School`, `The Wind and the Sun`, `Storm in the Garden`, `Light`. |
| **Topic** | `topic_name` | `VARCHAR(255)` | `Noun`, `TOPIC I`, `Shape all shapes Size`, `School Life`, `The Wind`, `My Garden`, `The Ant`, `Reflection`. |
| **Action** | *Controls* | `ACTIONS` | Two purple tactile buttons: Edit (`edit` pencil) and Delete (`delete` trash can). |
- **Pagination**: `Showing 1 to 15+ entries`.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Lessons Master Table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_group_id UUID NOT NULL REFERENCES subject_groups(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cohort_subject_lesson UNIQUE (branch_id, session_id, class_id, section_id, subject_id, name)
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_lessons ON lessons
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 2. Lesson Topics Master Table
CREATE TYPE topic_status_enum AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

CREATE TABLE lesson_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status topic_status_enum NOT NULL DEFAULT 'PENDING',
    completed_date DATE,
    completed_by_staff_id UUID REFERENCES staff(id),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_lesson_topic UNIQUE (lesson_id, name)
);

ALTER TABLE lesson_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_lesson_topics ON lesson_topics
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );

-- 3. Teacher Weekly Lesson Plans
CREATE TYPE lesson_plan_status_enum AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

CREATE TABLE teacher_lesson_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    teacher_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES lesson_topics(id) ON DELETE SET NULL,
    plan_date DATE NOT NULL,
    time_from TIME NOT NULL,
    time_to TIME NOT NULL,
    sub_topic VARCHAR(255),
    general_objectives TEXT,
    teaching_method TEXT,
    previous_knowledge TEXT,
    comprehensive_questions TEXT,
    lecture_video_url VARCHAR(500),
    attachment_url VARCHAR(500),
    status lesson_plan_status_enum NOT NULL DEFAULT 'SCHEDULED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_plan_time CHECK (time_to > time_from)
);

ALTER TABLE teacher_lesson_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_teacher_lesson_plans ON teacher_lesson_plans
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = current_setting('app.current_branch_id', true)::uuid
    );
```

---

### REST API Endpoints & Request Contracts

#### 1. Batch Create Lessons (Dynamic `+ Add More` Ingress)
- **Endpoint**: `POST /api/v1/lesson-plan/lessons/batch`
- **Payload**:
```json
{
  "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
  "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "subjectGroupId": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "subjectId": "2c9d1234-5678-90ab-cdef-1234567890ab",
  "lessonNames": [
    "Chapter 1: The Solar System",
    "Chapter 2: Ecosystems and Biomes",
    "Chapter 3: Periodic Properties"
  ]
}
```

#### 2. Batch Create Topics (Dynamic `+ Add More` Ingress)
- **Endpoint**: `POST /api/v1/lesson-plan/topics/batch`
- **Payload**:
```json
{
  "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
  "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "subjectGroupId": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "subjectId": "2c9d1234-5678-90ab-cdef-1234567890ab",
  "lessonId": "9a8b7c6d-5e4f-3a2b-1c0d-e4f5a6b7c8d9",
  "topicNames": [
    "Inner Terrestrial Planets",
    "Outer Gas Giants",
    "Kuiper Belt and Asteroids"
  ]
}
```

#### 3. Clone Historical Session Lessons (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/lesson-plan/clone-session`
- **Payload**:
```json
{
  "sourceSessionId": "2025-26",
  "targetSessionId": "2026-27",
  "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
  "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "subjectGroupId": "f1e2d3c4-b5a6-7890-1234-567890abcdef",
  "subjectId": "2c9d1234-5678-90ab-cdef-1234567890ab"
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.curriculum.lessons-cloned`
- **Partition Key**: `{branchId}#{classId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "b9a8c7d6-1234-5678-90ab-cdef12345678",
    "eventType": "school.curriculum.lessons-cloned",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T11:30:00.000Z",
    "correlationId": "f1e2d3c4-5678-90ab-cdef-1234567890ef",
    "version": "1.0.0"
  },
  "payload": {
    "sourceSessionId": "2025-26",
    "targetSessionId": "2026-27",
    "classId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "sectionId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    "subjectId": "2c9d1234-5678-90ab-cdef-1234567890ab",
    "clonedLessonsCount": 14,
    "clonedTopicsCount": 48
  }
}
```
