# Behaviour Records Module — Complete Functional & Discipline Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Executive Overview & Discipline Architecture

The **Behaviour Records** module is the institutional **Student Conduct, Commendations & Incident Tracking Engine**. It manages positive praise points, disciplinary demerit infractions, house point accumulations, and parent/student incident rebuttal commentary across the platform.

It implements four primary conduct UI layout paradigms:
1. **Class-Section Student Conduct Ledger**:
   - Criteria search filter (`Class` + `Section`) loading the student roster with their live cumulative `Total Points` balance and a 1-click incident assignment action.
   - Applied to: `Assign Incident`.
2. **Master Incident & Point Impact Taxonomy**:
   - High-capacity data table defining school-wide infractions and commendations with positive or negative point scores, institutional policy descriptions, and search/export tools.
   - Applied to: `Incidents`.
3. **6-Report Conduct & House Rank Directory Hub**:
   - 3-column categorical report launcher linking to student rankings, class leaderboards, inter-house cup standings, and incident frequency audits.
   - Applied to: `Reports`.
4. **Interactive Portal Feedback Toggle Card**:
   - Administrative configuration toggling student and parent commentary permissions on assigned disciplinary records.
   - Applied to: `Setting`.

---

### Slug 01: Assign Incident (`/behaviour/assign-incident`)
*Layout: Class-Section Criteria Filter + Student Point Ledger*

#### 1. Filter Section ("Select Criteria")
- `Class`: Dropdown selector (Target grade level)
- `Section`: Dropdown selector (Target section)
- `Search` Button: Populates the student conduct ledger.

#### 2. Data Grid: "Assign Incident List"
- Empty State: Document folder graphic with "No data available in table" and "Add new record or search with different criteria."
- Columns:
  1. `Student Name`: Full name of student
  2. `Admission No`: Student ID number
  3. `Class`: Current class & section
  4. `Gender`: Student gender
  5. `Phone`: Contact telephone
  6. `Total Points`: Live net behaviour score (positive integers for praise awards, negative integers for disciplinary demerits, e.g. `+20`, `-15`, `0`)
  7. `Action`: `Assign Incident` button (opens modal to select an incident from the master taxonomy, select incident date, add customized teacher notes, and assign points to student profile).

---

### Slug 02: Incidents (`/behaviour/incidents`)
*Layout: Master Incident Taxonomy Table*

#### 1. Header & Controls
- Title: `Incident List` + Top-Right Action Button: `+ Add` (launches Add Incident modal)
- Controls: Global Search Input, Page Size Dropdown (`100`), Export Toolbar (Copy, Excel, CSV, PDF, Print).

#### 2. Data Grid Columns
1. `Title`: Incident designation (e.g. `Harassment and bullying`, `Improper behaviour`, `Theft`, `Student Good Behaviour`, `Respect others/property.`)
2. `Point`: Numerical point impact:
   - Commendations / Praise: Positive points (e.g. `+20`, `+10`)
   - Disciplinary Infractions: Negative points (e.g. `-10`, `-15`)
3. `Description`: Institutional policy rationale and intervention guidelines
4. `Action`: `Edit` (Pencil), `Delete` (Cross)
- Pagination: `Showing 1 to N of N entries`.

#### 3. Modal Form: "Add Incident" (Triggered by `+ Add`)
- `Title *`: Mandatory text input for incident title
- `Point *`: Mandatory integer input (allows negative or positive values)
- `Description`: Textarea for guidelines, escalation triggers, and severity thresholds
- `Save` Button

---

### Slug 03: Reports (`/behaviour/reports`)
*Layout: 3-Column Categorical Report Directory Hub*

#### Hub Categories & 6 Specialized Reports
- **Column 1 (Student Audit & Section Rankings)**:
  1. `Student Incident Report`: Detailed chronological timeline of all incidents assigned to students across dates, teachers, and points.
  2. `Class Section Wise Rank Report`: Aggregated student conduct leaderboard broken down by class and section.
- **Column 2 (Individual & House Championships)**:
  3. `Student Behaviour Rank Report`: Universal school-wide student leaderboard ranked from highest commendation points to lowest.
  4. `House Wise Rank Report`: Aggregated behaviour scores grouped by school house (Red, Blue, Green, Yellow) for inter-house championship cups.
- **Column 3 (Class Comparisons & Anomaly Analytics)**:
  5. `Class Wise Rank Report`: Average conduct score comparison across grade levels.
  6. `Incident Wise Report`: Incident frequency distribution chart to identify recurring behavioral issues across campus.

---

### Slug 04: Setting (`/behaviour/setting`)
*Layout: Administrative Configuration Card*

#### Form Controls
- Card Header: `Setting`
- Setting Section:
  - Label: `Comment Option`
  - Checkboxes:
    - `[x] Student Comment`: Permits students to post written replies or explanations to an assigned incident via their student portal.
    - `[x] Parent Comment`: Permits parents/guardians to review and post feedback or appeal commentary via the parent portal.
- Action: `Save` Button (persists portal interaction permissions).

---

### Master Summary: All 4 Behaviour Records Slugs

| # | Slug | Layout Pattern | Key Inputs / Controls | Primary Conduct Role |
|:---:|:---|:---:|:---|:---|
| **01** | **`assign-incident`** | Class Filter + Student Point Ledger | Class, Section &rarr; Assign Incident Modal | View live student points & assign commendations/infractions |
| **02** | **`incidents`** | Master Taxonomy Table + `+ Add` | Title*, Point* (+/-), Description | Master catalog of school rules, violations & praise points |
| **03** | **`reports`** | 3-Column Report Directory Hub | 6 Specialized Conduct Reports | Student rankings, inter-house cup points & incident audits |
| **04** | **`setting`** | Checkbox Configuration Card | `[x] Student Comment`, `[x] Parent Comment` | Toggle parent/student commentary permissions |
