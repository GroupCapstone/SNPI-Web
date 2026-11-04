# Gmeet Live Classes Module — Complete Functional & Virtual Classroom Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Executive Overview & Virtual Classroom Architecture

The **Gmeet Live Classes** module provides native integration with **Google Workspace & Google Meet**. It enables administrators, deans, and teachers to schedule live synchronous online video lessons, staff briefings, and parent-teacher meetings with Google Calendar synchronization and student attendance duration tracking.

It implements four primary virtual classroom UI layout paradigms:
1. **Multi-Target Live Lecture Schedule Grid**:
   - Tabular timetable displaying scheduled classes, start timestamps, class durations, assigned teachers, multi-cohort section targeting checkboxes, status dropdowns, and instant `Start` launch triggers.
   - Applied to: `Live Classes`.
2. **Staff & Administrative Conference Manager with Participant Roster**:
   - Meeting scheduler data grid with `+ Add` meeting creation modal, start triggers, participant inspection modals, and delete actions.
   - Applied to: `Live Meeting`.
3. **Class-Section Student Attendance Duration Audit Filter**:
   - Class and section selector generating student attendance timelines, join/leave timestamps, and engagement minutes in video rooms.
   - Applied to: `Live Classes Report`.
4. **Meeting Join Analytics & Google Workspace API Integration**:
   - Summary report with total join counts and attendee audit drilldown, alongside an administrative OAuth credential and feature policy console.
   - Applied to: `Live Meeting Report`, `Setting`.

---

### Slug 01: Live Classes (`/gmeet/live-classes`)
*Layout: Multi-Cohort Live Lecture Schedule Data Grid*

#### 1. Header & Controls
- Title: `Live Class List` (or `Gmeet Live Classes`)
- Filter / Schedule Overview

#### 2. Data Grid Columns
1. `Class Title`: Course / lecture title (e.g. `Live Class - June 2026`, `GK Combined Online Classes`, `Class - Mathematics`, `Extra Practice Class`)
2. `Description`: Summary of lecture agenda / learning objectives
3. `Date Time`: Scheduled start timestamp (`MM/DD/YYYY HH:mm:ss`)
4. `Duration (Minutes)`: Duration of lecture (integer e.g. `20`, `25`, `29`, `45`, `60`)
5. `Created By`: Author administrator/teacher name and ID (e.g. `Joe Black (Super Admin : 9000)`)
6. `Teacher`: Assigned instructor conducting the session (e.g. `Shivam Verma (Teacher : 9002)`, `Jason Sharlton (Teacher : 90006)`)
7. `Class / Section Targets`: Checkbox list of target cohorts (e.g. `[x] Class 1(A)`, `[x] Class 1(B)`, `[x] Class 1(C)`, `[x] Class 2(A)`...)
8. `Status`: Interactive dropdown badge (`Awaited`, `Started`, `Finished`, `Cancelled`)
9. `Action`:
   - `Start` Button: Green button with camera/play icon (launches Google Meet room in new tab)
   - `Delete` Button: Cross button (cancels and removes live class)
- Pagination: `Showing 1 to N of N entries`.

#### 3. Modal Form: "Add Live Class"
- `Class Title *`: Mandatory lecture topic
- `Date Time *`: Scheduled date and time picker
- `Class Duration (Minutes) *`: Numerical minutes input
- `Teacher *`: Searchable dropdown selecting instructor from staff directory
- `Class *` & `Sections *`: Multi-select checkboxes for target classrooms
- `Description`: Textarea
- `Save` Button (persists session and creates Google Meet link).

---

### Slug 02: Live Meeting (`/gmeet/live-meeting`)
*Layout: Staff Conference Schedule Data Grid*

#### 1. Header & Controls
- Title: `Live Meeting` + Top-Right Action Button: `+ Add` (launches Add Live Meeting modal)
- Controls: Global Search Input, Page Size Dropdown (`50`), Export Toolbar (Copy, Excel, CSV, PDF, Print, Columns).

#### 2. Data Grid Columns
1. `Meeting Title`: Topic of administrative conference (e.g. `Online Teacher Training Meeting`, `Monthly staff meeting`, `Student Health`, `School Timetable Preparation`, `PTM Preparation Online`)
2. `Description`: Meeting agenda
3. `Date Time`: Scheduled start timestamp (`MM/DD/YYYY HH:mm:ss`)
4. `Class Duration (Minutes)`: Duration in minutes (e.g. `25`, `30`, `35`, `60`)
5. `Created By`: Creator name / `Self`
6. `Status`: Dropdown badge (`Awaited`, `Finished`, `Cancelled`)
7. `Action`:
   - `Start` Button (Green button &rarr; launches Google Meet room)
   - `View Participants` (Group icon &rarr; opens invited staff list modal)
   - `Delete` Button (Cross button)
- Pagination: `Showing 1 to N of N entries`.

#### 3. Modal Form: "Add Live Meeting" (Triggered by `+ Add`)
- `Meeting Title *`: Mandatory meeting title
- `Date Time *`: Scheduled timestamp
- `Meeting Duration (Minutes) *`: Duration in minutes
- `Meeting Host *`: Staff dropdown selector
- `Invited Staff / Roles`: Multi-select checkboxes (All Teachers, Accountants, Deans, or individual staff)
- `Description`: Textarea
- `Save` Button.

---

### Slug 03: Live Classes Report (`/gmeet/live-classes-report`)
*Layout: Class-Section Attendance Duration Audit Filter*

#### 1. Filter Section ("Select Criteria")
- `Class *`: Mandatory dropdown (Grade level)
- `Section *`: Mandatory dropdown (Section cohort)
- `Search` Button

#### 2. Data Grid: "Student Attendance Log"
- Generates detailed Google Meet room telemetry for all students in the selected class:
  1. `Admission No`: Student ID
  2. `Student Name`: Student full name
  3. `Live Class Title`: Lecture attended
  4. `Join Time`: First room connection timestamp (`HH:mm:ss`)
  5. `Leave Time`: Final disconnect timestamp (`HH:mm:ss`)
  6. `Total Duration (Minutes)`: Calculated active room time
  7. `Attendance Status`: Badge (`Present` if active > threshold, `Partial`, `Absent`)

---

### Slug 04: Live Meeting Report (`/gmeet/live-meeting-report`)
*Layout: Staff Conference Attendance & Audit Grid*

#### 1. Header & Controls
- Title: `Live Meeting Report`
- Controls: Global Search Input, Page Size Dropdown (`50`), Export Toolbar.

#### 2. Data Grid Columns
1. `Meeting Title`: Conference title (e.g. `Student Health Serve Mission`)
2. `Description`: Conference agenda
3. `Date Time`: Meeting date and time (`MM/DD/YYYY HH:mm:ss`)
4. `Created By`: Creator staff ID / `Self`
5. `Total Join`: Numerical count of participants who joined (e.g. `1`, `14`, `32`)
6. `Action`: `View Report Details` button (document icon &rarr; opens attendee inspection modal displaying individual staff names, emails, join times, leave times, and total minutes).
- Pagination: `Showing 1 to N of N entries`.

---

### Slug 05: Setting (`/gmeet/setting`)
*Layout: Google Workspace API & Credential Configuration Console*

#### Form Fields & Infrastructure Controls
- Card Header: `Setting`
- Fields:
  1. `API Key`: Text input for Google OAuth 2.0 Client ID (e.g. `988720996993-ctjb5ibg56b45fu505l3lv310bv55d79.apps.googleusercontent.com`)
  2. `API Secret`: Password / masked text input for Google OAuth Client Secret
  3. `Use Google Calendar Api *`: Radio buttons:
     - `(o) Disabled`
     - `( ) Enabled`
     *(When enabled, automatically publishes scheduled live classes and staff meetings as calendar events in invited users' Google Calendars)*
  4. `Parent Live Class *`: Radio buttons:
     - `(o) Disabled`
     - `( ) Enabled`
     *(Governs whether parents/guardians are permitted to join live classroom video sessions and parent-teacher conferences via the parent portal)*
- Action: `Save` Button (validates OAuth credentials and persists integration parameters).

---

### Master Summary: All 5 Gmeet Live Classes Slugs

| # | Slug | Layout Pattern | Key Inputs / Controls | Primary Virtual Classroom Function |
|:---:|:---|:---:|:---|:---|
| **01** | **`live-classes`** | Multi-Cohort Schedule Grid | Class Title, Date, Duration, Teacher, Cohort Checkboxes, Start | Schedule live lessons, assign teachers & launch Google Meet |
| **02** | **`live-meeting`** | Staff Conference Grid + Modal | Meeting Title*, Date*, Duration*, Participants, Start | Schedule staff meetings, briefings & launch conferences |
| **03** | **`live-classes-report`**| Class-Section Criteria Filter | Class*, Section* &rarr; Attendance Duration Grid | Student video room join/leave logs & active minutes |
| **04** | **`live-meeting-report`**| Meeting Join Analytics Grid | Meeting Title, Total Join &rarr; View Details Modal | Staff meeting attendance and duration audit |
| **05** | **`setting`** | Google API Config Console | Client ID, Secret, Calendar Sync, Parent Live Class | Google OAuth credentials & permission policies |
