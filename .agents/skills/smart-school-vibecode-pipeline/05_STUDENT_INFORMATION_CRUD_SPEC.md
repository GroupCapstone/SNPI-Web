# Student Information Module — Complete Functional & CRUD Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Executive Overview & Architectural Patterns

The **Student Information** module is the central **Student Information System (SIS)** core of the platform. It manages the entire lifecycle of a student across 9 dedicated slugs.

It implements three primary enterprise UI layout paradigms:
1. **Dual-Query Filter with Multi-View Presentation**:
   - Class & Section dropdown filter OR direct keyword query with a toggle between `List View` and `Details View`.
   - Applied to: `Student Details`, `Disabled Students`.
2. **Multi-Section Stepper / Complex Enrollment Form**:
   - Single-screen comprehensive intake spanning academic, personal, biometric, medical, transport, hostel, and fee schedules, plus sibling linking and batch import.
   - Applied to: `Student Admission`.
3. **Application Intake & Processing Pipeline**:
   - Multi-status data grid tracking admissions across form submission, online payment, and formal matriculation checkmarks.
   - Applied to: `Online Admission`.
4. **Split Two-Column Master-Detail Dictionary Setup**:
   - In-place form card on the left (~30% width) and data table card on the right (~70% width).
   - Applied to: `Student Categories`, `Student House`, `Disable Reason`.
5. **Batch Processing / Purge Grid**:
   - Criteria filter loading selectable student rows for bulk administrative actions.
   - Applied to: `Bulk Delete`, `Multi Class Student`.

---

### Slug 01: Student Details (`/student-info/student-details`)
*Layout: Dual-Query Criteria Search + List/Details View Switcher*

#### 1. Top Criteria Filter Bar ("Select Criteria")
- **Mode A: Structural Query**:
  - `Class *`: Mandatory dropdown (Grade 1 to 12)
  - `Section`: Dropdown (Section A, B, C, etc.)
  - `Search` Button
- **Mode B: Direct Keyword Query**:
  - `Search By Keyword`: Text input ("Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc.")
  - `Search` Button

#### 2. View Switcher Tabs
- `List View`: Compact data grid.
- `Details View`: Rich visual card layout with student photo avatar, guardian info, contact hotline, and quick actions.

#### 3. Data Grid Columns (List View)
1. `Admission No`: Unique student registration code (e.g. `STU-2026-001`)
2. `Student Name`: Student full name (links to 360-degree Student Profile)
3. `Roll No.`: Class roll number
4. `Class`: Grade level and assigned section
5. `Father Name`: Primary guardian name
6. `Date Of Birth`: Birth date (`DD/MM/YYYY`)
7. `Gender`: `Male`, `Female`, `Other`
8. `Category`: Demographic group (General, Special, etc.)
9. `Mobile Number`: Student / guardian contact phone
10. `Action`: 360 Profile View, Edit Student, Collect Fees, Add Behaviour Incident

---

### Slug 02: Student Admission (`/student-info/student-admission`)
*Layout: High-Density Multi-Section Enterprise Enrollment Form*

#### Top Actions
- Title: `Student Admission`
- Action: `Import Student` button (launches bulk CSV/Excel import wizard)

#### Form Sections
- **Section 1: Academic & Personal Core**:
  - `Admission No *` (Mandatory, unique)
  - `Roll Number` (Text input)
  - `Class *` (Mandatory dropdown)
  - `Section *` (Mandatory dropdown)
  - `First Name *` (Mandatory text)
  - `Last Name` (Text input)
  - `Gender *` (Mandatory dropdown: Male, Female, Other)
  - `Date Of Birth *` (Mandatory date picker)
  - `Category` (Dropdown)
  - `Religion` (Text input)
  - `Caste` (Text input)
  - `Mobile Number` (Phone input)
  - `Email` (Email input)
  - `Admission Date` (Date picker, defaults to current date)
  - `Student Photo (100px X 100px)` (Drag-and-drop file upload zone)
  - `Blood Group` (Dropdown: `A+`, `A-`, `B+`, `B-`, `O+`, `O-`, `AB+`, `AB-`)
  - `House` (Student house affiliation dropdown)
  - `Height`, `Weight`, `Measurement Date`
  - `+ Add Sibling` Button (modal linking to existing student to share parent records and apply sibling discounts)
  - `Medical History` (Textarea)
- **Section 2: Transport Details**:
  - `Route List`: Dropdown
  - `Pickup Point`: Dropdown
  - `Fees Month`: Dropdown
- **Section 3: Hostel Details**:
  - `Hostel`: Dormitory dropdown
  - `Room No.`: Room and bed allocation dropdown
- **Section 4: Fees Details**:
  - Checklist of class fee packages (e.g., `Class 1 General - $710.00`) with checkbox toggles
- **Submission**: `Save` button.

---

### Slug 03: Online Admission (`/student-info/online-admission`)
*Layout: Public Application Intake & Processing Pipeline*

#### Data Grid Controls & Columns
- Controls: Search input, Page Size (`50`), Export Toolbar (Copy, Excel, CSV, PDF, Print).
- Columns:
  1. `Reference No`: Application tracking number (e.g. `471292`, `OA20260402`)
  2. `Student Name`: Applicant name
  3. `Class`: Applied grade level
  4. `Father Name`: Guardian name
  5. `Date Of Birth`: Birth date
  6. `Gender`: Male / Female
  7. `Category`: Demographic tag
  8. `Student Mobile Number`: Telephone
  9. `Form Status`: Badge (`Submitted (Date)` [Green] / `Not Submitted` [Red])
  10. `Payment Status`: Badge (`Paid` [Green] / `Unpaid` [Red])
  11. `Enrolled`: Matriculation status (`[v]` Enrolled / `[-]` Pending)
  12. `Created At`: Date application submitted
  13. `Action`: Print Application Form, Edit / Process Enrollment, Delete / Reject

---

### Slug 04: Disabled Students (`/student-info/disabled-students`)
*Layout: Archived & Inactive Student Repository*

#### Filter & Columns
- Filter: Dual search (`Class*` + `Section` OR `Keyword`) + List/Details view toggle.
- Columns:
  1. `Admission No`: Historical ID
  2. `Student Name`: Inactive student name
  3. `Class`: Last attended class and section
  4. `Father Name`: Guardian name
  5. `Disable Reason`: Justification (e.g., `Regular Absent`, `Fees Not Paid`, `Relocated`, `Transferred`)
  6. `Gender`: Gender
  7. `Mobile Number`: Contact phone
  8. `Action`: `Re-enable / Restore`, `View Profile`, `Permanent Purge`

---

### Slug 05: Multi Class Student (`/student-info/multi-class-student`)
*Layout: Dual Enrollment & Secondary Class Allocations*

#### Filter & Behavior
- Filter: `Class *` (Mandatory) + `Section *` (Mandatory) &rarr; `Search`.
- Status Banner: `No Record Found` notification banner when empty.
- Purpose: Assigns students to multiple concurrent class cohorts for elective or advanced placement tracks.

---

### Slug 06: Bulk Delete (`/student-info/bulk-delete`)
*Layout: Batch Administrative Purge Console*

#### 1. Filter Section ("Select Criteria")
- `Class`: Dropdown (Select class to load students)
- `Section`: Dropdown (Select section)
- `Search` Button: Populates the bulk deletion grid.

#### 2. Data Grid & Actions
- Multi-select header checkbox ("Select All") and per-row checkboxes.
- Columns: Checkbox, `Admission No`, `Student Name`, `Class`, `Father Name`, `Gender`, `Mobile Number`.
- Bottom Action: `Delete Selected` button requiring Super Admin master authorization confirmation modal to prevent accidental data loss.

---

### Slug 07: Student Categories (`/student-info/categories`)
*Layout: Split Two-Column Form & Data Grid*

#### 1. Left Card: "Create Category"
- `Category *`: Mandatory text input (e.g., `General`, `OBC`, `Special`, `Physically Challenged`, `St`, `Sc`)
- Action: `Save` button (bottom right)

#### 2. Right Card: "Category List"
- Controls: Search input, Page Size (`50`), Export Toolbar (Copy, Excel, CSV, PDF, Print, Columns).
- Columns:
  1. `Category`: Name of demographic group
  2. `Category ID`: System auto-incremented index (e.g., `1`, `2`, `3`, `4`, `5`, `6`)
  3. `Action`: Edit (Pencil), Delete (Cross)
- Pagination: `Showing 1 to N of N entries`.

---

### Slug 08: Student House (`/student-info/house`)
*Layout: Split Two-Column Form & Data Grid*

#### 1. Left Card: "Add School House"
- `Name *`: Mandatory text input (e.g., `Blue`, `Red`, `Green`, `Yellow`)
- `Description`: Multi-line textarea (House motto, team color, emblem)
- Action: `Save` button

#### 2. Right Card: "Student House List"
- Controls: Search input, Page Size (`50`), Export Toolbar.
- Columns:
  1. `Name`: House name
  2. `Description`: House description
  3. `House ID`: Numerical identifier (`1`, `2`, `3`, `4`)
  4. `Action`: Edit, Delete
- Pagination: `Showing 1 to N of N entries`.

---

### Slug 09: Disable Reason (`/student-info/disable-reason`)
*Layout: Split Two-Column Form & Data Grid*

#### 1. Left Card: "Add Disable Reason"
- `Disable Reason *`: Mandatory text input (e.g., `Regular Absent`, `Fees Not Paid`, `Relocated`, `Transferred`)
- Action: `Save` button

#### 2. Right Card: "Disable Reason List"
- Controls: Search input, Page Size (`50`), Export Toolbar.
- Columns:
  1. `Disable Reason`: Text label of reason
  2. `Action`: Edit, Delete
- Pagination: `Showing 1 to N of N entries`.

---

### Master Summary: All 9 Student Information Slugs

| # | Slug | Layout Pattern | Key Inputs / Controls | Primary Function |
|:---:|:---|:---:|:---|:---|
| **01** | **`student-details`** | Dual Search + List/Detail View | Class/Section OR Keyword | 360 Student profile access & daily operations |
| **02** | **`student-admission`** | Multi-Section Form (6 parts) | 22 fields + Sibling link + Upload | Formal enrollment, transport/hostel/fee assignment |
| **03** | **`online-admission`** | Pipeline Grid with Dual Badges | Status badges + Enroll checkmark | Review public applicants, verify fees & enroll |
| **04** | **`disabled-students`** | Dual Search + Archive Grid | Class/Keyword + Restore action | Inactive/suspended student archive & reactivation |
| **05** | **`multi-class-student`** | Dual-Class Section Map | Class + Section search | Map students to concurrent secondary/elective classes |
| **06** | **`bulk-delete`** | Batch Checkbox Purge Grid | Class + Section + Select All | High-security multi-record purge console |
| **07** | **`student-categories`** | Split 2-Column Form/List | `Category *` | Master demographic categories dictionary |
| **08** | **`student-house`** | Split 2-Column Form/List | `Name *`, `Description` | Inter-house team affiliation management |
| **09** | **`disable-reason`** | Split 2-Column Form/List | `Disable Reason *` | Master taxonomy of departure/suspension reasons |
