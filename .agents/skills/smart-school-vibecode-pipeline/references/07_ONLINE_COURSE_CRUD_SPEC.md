# Online Course (LMS) Module — Complete Functional & E-Learning Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Executive Overview & LMS Architecture

The **Online Course** module is the institutional **Learning Management System (LMS)** core. It enables teachers and administrators to author, publish, monetize, and track asynchronous digital courses, video lessons, interactive quizzes, question banks, course completion certificates, and cloud media infrastructure.

It implements five primary e-learning UI layout paradigms:
1. **Catalog Card Grid with Media Metrics & Dual Action**:
   - High-visual 4-column responsive card matrix with banner thumbnail, instructor badge, category tag, comprehensive curriculum metrics (Class, Lessons, Total Hours, Exams, Quizzes, Assignments), discounted pricing, and dual actions (`Manage` curriculum vs `Preview` student player).
   - Applied to: `Online Course`.
2. **Comprehensive Question Bank Repository with Batch Tools**:
   - Criteria search filter (`Question Tag`, `Question Type`, `Question Level`, `Created By`) paired with batch action bar (`+ Add Tag`, `+ Add Question`, `+ Import`, `Bulk Delete`) and detailed question inspection table.
   - Applied to: `Question Bank`.
3. **Student Course Enrollment & Offline Cashier Desk**:
   - Class, Section, and Student selector to manually enroll students into paid e-learning courses with manual offline cash/bank payment collection.
   - Applied to: `Offline Payment`.
4. **Split Two-Column Master Taxonomy Builder**:
   - In-place form card on the left (~30% width) and data table on the right (~70% width).
   - Applied to: `Course Category`.
5. **Multi-Card Global Settings & Media Storage Infrastructure**:
   - High-security configuration console managing curriculum feature toggles, AWS S3 / Cloudflare media credentials, and guest user sandbox parameters.
   - Applied to: `Setting`.
6. **10-Report Analytical Navigation Hub**:
   - 3-column categorical report launcher linking to purchase, completion, rating, and examination audit sheets.
   - Applied to: `Online Course Report`.

---

### Slug 01: Online Course (`/online-course/courses`)
*Layout: Catalog Card Grid / Table View Switcher*

#### 1. Top Header & Controls
- Title: `Course List`
- Search: Text input ("Search By Course Name")
- View Switcher:
  - `Grid View` (Card matrix, active by default)
  - `Table View` (Compact tabular data list)
- Primary Action: `+ Add Course` Button (launches multi-step course authoring wizard)

#### 2. Course Card Anatomy (Grid View)
Each course card contains 8 distinct visual and data zones:
1. **Thumbnail Banner**: 16:9 course cover image.
2. **Author & Audit Bar**:
   - Instructor avatar and name with staff ID (e.g. `Shivam Verma (9002)`, `Jason Sharlton (90006)`)
   - `Last Updated` date badge (e.g. `Last Updated 05/04/2026`)
3. **Course Title**: Prominent bold typography (e.g., "Basic Computer Course for Beginners", "Math Fundamentals", "ENVIRONMENTAL SCIENCE COURSE")
4. **Course Description**: Truncated 2-line preview summary.
5. **Category Badge**: Pill tag (e.g. `Personal Development`, `Business Marketing`, `Lifestyle course`, `UPGRADE SKILL`).
6. **Curriculum Metadata Matrix**:
   - `Class`: Target grade level (e.g. `Class 1`, `Class 2`)
   - `Lesson Count & Duration`: Discrete lessons and total video runtime (e.g. `Lesson 2  12:47:46 Hrs`)
   - `Assessment Counts`: Total included exams, quizzes, and assignments (e.g. `Exam 1`, `Quiz 2`, `Assignment 2`)
7. **Pricing Tier**:
   - Free course indicator OR Current Price with original strikethrough price (e.g. `$72.00 ~~$80.00~~`, `$194.00 ~~$200.00~~`, `$90.00 ~~$100.00~~`)
8. **Dual Action Buttons**:
   - `Manage` Button: Opens curriculum manager (add sections, upload video lessons, attach PDFs, build quizzes).
   - `Preview` Button: Opens full-screen student e-learning player preview.

---

### Slug 02: Question Bank (`/online-course/question-bank`)
*Layout: Advanced Filter + Batch Action Bar + Question Grid*

#### 1. Top Batch Action Bar
- `+ Add Tag`: Quick modal to define new question subject tags.
- `+ Add Question`: Opens question authoring modal/page.
- `+ Import`: Bulk question upload via CSV/Excel template.
- `Bulk Delete`: Batch deletion of selected questions with confirmation.

#### 2. Filter Bar ("Select Criteria")
- `Question Tag`: Dropdown (e.g., `English`, `Robotics`, `Hindi`, `Science`, `Mathematics`, `Communication Skills`, `Drawing`)
- `Question Type`: Dropdown (`Single Choice`, `Multiple Choice`, `True/False`, `Descriptive`)
- `Question Level`: Dropdown (`Low`, `Medium`, `High`)
- `Created By`: Dropdown (Filter by authoring teacher)
- `Search` Button

#### 3. Data Grid: "Question Bank"
- Multi-select header checkbox ("Select All") and per-row checkboxes.
- Search input, Page Size (`100`), Export Toolbar (Copy, Excel, CSV, PDF, Print).
- Columns:
  1. `[x]`: Row selection checkbox
  2. `Q. ID`: Sequential unique ID (e.g. `46`, `38`, `37`, `36`, `35`)
  3. `Question Tag`: Subject tag
  4. `Question Type`: Choice format
  5. `Level`: Difficulty badge (`Low`, `Medium`, `High`)
  6. `Question`: Question prompt text with interactive `Read more...` expander
  7. `Created By`: Teacher name and staff code (e.g. `Joe Black (9000)`)
  8. `Action`:
     - `View Question` (Eye icon &rarr; modal showing full prompt, options, correct answer, explanation)
     - `Edit Question` (Pencil icon)
     - `Delete Question` (Cross icon)

---

### Slug 03: Offline Payment (`/online-course/offline-payment`)
*Layout: Student Course Enrollment & Cashier Reconciliation*

#### 1. Filter Section
- Card Header: `Offline Payment`
- Fields:
  - `Class *`: Mandatory dropdown
  - `Section *`: Mandatory dropdown
  - `Student *`: Mandatory dropdown (Searchable student picker)
  - `Search` Button

#### 2. Data Grid
- Loads all enrolled or pending course subscriptions for the chosen student.
- Columns:
  1. `Course`: Name of online course
  2. `Section`: Course section
  3. `Lesson`: Lessons completed / total
  4. `Quiz`: Quizzes attempted / total
  5. `Exam`: Exams passed
  6. `Assignment`: Homework assignments submitted
  7. `Course Provider`: Instructor / Department
  8. `Price ($)`: Standard catalog price
  9. `Current Price ($)`: Applicable discounted price
  10. `Action`: `Collect Payment / Enroll` action button (records cash/counter receipt and grants student portal course access).
- Empty State: Document folder graphic with "No data available in table" and "Add new record or search with different criteria."

---

### Slug 04: Course Category (`/online-course/category`)
*Layout: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Category"
- `Category Name *`: Mandatory text input (e.g., `Personal Development`, `Health & Fitness Courses`, `Network & Security Course`, `Lifestyle course`, `UPGRADE SKILL`, `Business Marketing`)
- Action: `Save` Button

#### 2. Right Card: "Category List"
- Controls: Search input, Page Size (`50`), Export Toolbar.
- Columns:
  1. `Category Name`: Display title of category
  2. `Action`: Edit (Pencil), Delete (Cross)
- Pagination: `Showing 1 to N of N entries`.

---

### Slug 05: Certificate Template (`/online-course/certificate`)
*Layout: Template Manager & Tokenized Text Engine*

#### 1. Header & Controls
- Title: `Certificate Template List` + Top-Right Action Button: `+ Add`
- Controls: Search input, Page Size (`50`), Export Toolbar.

#### 2. Data Grid Columns
1. `Certificate Name`: Template label (e.g. `Sample Transfer Certificate 1`, `Sample Transfer Certificate 2`)
2. `Certificate Text`: Dynamic tokenized template text string with variables:
   - `[student_name]`: Replaced by student full name
   - `[course_name]`: Replaced by course title
   - `[assign_teacher]`: Replaced by course instructor
   - `[start_date]` & `[completion_date]`: Replaced by course timeline
   - `[class_name]` & `[section_name]`: Replaced by student cohort
   - `[current_date]`: Replaced by issue timestamp
3. `Action`: Edit (Pencil), Delete (Cross)
- Pagination: `Showing 1 to 4 of 4 entries`.

---

### Slug 06: Online Course Report (`/online-course/report`)
*Layout: 3-Column Categorical Report Directory Hub*

#### Hub Categories & 10 Specialized Reports
- **Column 1 (Sales & Enrollment Progress)**:
  1. `Student Course Purchase Report`: Detailed ledger of student course buy transactions.
  2. `Course Complete Report`: List of students who achieved 100% video and quiz milestones.
  3. `Course Assignment Report`: Assignment submission logs, grades, and teacher reviews.
  4. `Course Exam Attempt Report`: Student test attempt timestamps, durations, and scores.
- **Column 2 (Course Ratings & Exam Performance)**:
  5. `Course Sell Count Report`: Total copies sold per course title with revenue sums.
  6. `Course Rating Report`: Student feedback reviews and star ratings.
  7. `Course Exam Result Report`: Term exam marks and pass/fail distributions.
- **Column 3 (Market Intelligence & Guest Access)**:
  8. `Course Trending Report`: Most viewed and highest velocity courses over past 30 days.
  9. `Guest Report`: Non-enrolled guest visitor access logs and conversion metrics.
  10. `Course Exam Report`: Catalog of all published exams linked to e-learning units.

---

### Slug 07: Setting (`/online-course/setting`)
*Layout: High-Security Multi-Card Administrative Infrastructure Console*

#### Card 1: "Setting" (Curriculum Feature Toggles)
- `Online Course Curriculum`: Feature checkboxes:
  - `[x] Quiz`: Enables quiz creation and evaluation engine.
  - `[x] Exam`: Enables formal online examination modules.
  - `[x] Assignment`: Enables homework submission and grading.
- Action: `Save` Button

#### Card 2: "AWS S3 Bucket Setting" (Cloud Storage Infrastructure)
- Stores secure video lessons, PDF attachments, and course thumbnail assets.
- Fields:
  - `Access Key ID *`: Masked secure key input
  - `Secret Access Key *`: Masked secure secret key input
  - `Bucket Name *`: S3 bucket name
  - `Region *`: AWS data center region (e.g. `ap-southeast-1`)
- Action: `Save` Button

#### Card 3: "Guest User" (Public Free Preview Sandbox)
- Governs public visitor access to free teaser lessons without requiring prior school registration.
- Fields:
  - `Guest Login *`: Interactive Toggle Switch (`Active` / `Disabled`)
  - `Guest User Prefix *`: Text input (e.g. `Guest`)
  - `Guest User Id Start From *`: Starting numerical index (e.g. `100`)
- Action: `Save` Button

---

### Master Summary: All 7 Online Course Slugs

| # | Slug | Layout Pattern | Key Inputs / Controls | Primary E-Learning Function |
|:---:|:---|:---:|:---|:---|
| **01** | **`online-course`** | 4-Col Card Matrix / Table Switcher | Search, Add Course, Manage/Preview | Author, manage curriculum, monetize & preview courses |
| **02** | **`question-bank`** | Tag Filter + Batch Action Bar | Tag*, Type*, Level*, Add Question | Reusable item bank for course quizzes & CBT exams |
| **03** | **`offline-payment`** | Student Direct Selector Grid | Class*, Section*, Student* | Manual counter payment collection for course enrollments |
| **04** | **`course-category`** | Split 2-Column Form & List | `Category Name *` | Catalog classification taxonomy |
| **05** | **`certificate-template`** | Tokenized Text Template Grid | `[student_name]`, `[course_name]` | Automated completion certificate issuance |
| **06** | **`online-course-report`** | 3-Column Report Directory | 10 Specialized Analytics Reports | E-learning sales, completion, ratings & exam audit |
| **07** | **`setting`** | Multi-Card Config Console | S3 Keys, Curriculum Toggles, Guest User | Cloud media hosting, DRM & guest trial controls |
