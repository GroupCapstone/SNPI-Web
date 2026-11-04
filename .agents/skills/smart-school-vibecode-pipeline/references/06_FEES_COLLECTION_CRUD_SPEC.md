# Fees Collection Module — Complete Functional & Financial Engine Specification
## Universal Enterprise School Management System (Brand-Agnostic Blueprint)

---

### Executive Overview & Financial Architecture

The **Fees Collection** module governs the institutional tuition billing, POS counter fee collection, offline bank slip verification, overdue delinquency tracking, discount engines, and master fee schedule configuration across academic sessions.

It implements five primary financial and UI layout paradigms:
1. **Dual-Query Counter Collection Desk**:
   - Class & Section dropdown filter OR direct Keyword search (Student Name, Roll No, National ID) loading the student directory for 1-click counter POS ledger checkout.
   - Applied to: `Collect Fees`.
2. **Offline Payment Verification & Approval Pipeline**:
   - Ingress table for student/parent uploaded bank deposit slips and wire receipts with `Pending` / `Approved` status tracking and transaction reconciler.
   - Applied to: `Offline Bank Payments`.
3. **Single-Token Direct Receipt & POS Lookup**:
   - Rapid POS receipt lookup via unique `Payment ID` or direct student picker (`Class` + `Section` + `Student`).
   - Applied to: `Search Fees Payment`, `Quick Fees`.
4. **Delinquency Receivables & Session Migration Engines**:
   - Overdue receivables aging filter and end-of-year unpaid balance transfer wizard.
   - Applied to: `Search Due Fees`, `Fees Carry Forward`.
5. **Split Two-Column Master Configurator & Discount Engine**:
   - In-place form card on the left (~30% width) and searchable data table card on the right (~70% width).
   - Applied to: `Fees Master`, `Fees Group`, `Fees Type`, `Fees Discount`.
6. **Trigger Matrix Reminder Schedule Table**:
   - Tabular configuration matrix mapping activation checkboxes, relative reminder directions (`Before` / `After`), and customizable offset days.
   - Applied to: `Fees Reminder`.

---

### Slug 01: Collect Fees (`/fees/collect`)
*Layout: Dual-Query Criteria Filter + Student POS Directory*

#### 1. Top Criteria Filter Bar ("Select Criteria")
- **Mode A: Structural Class Query**:
  - `Class *`: Mandatory dropdown
  - `Section`: Dropdown (Section A, B, etc.)
  - `Search` Button
- **Mode B: Keyword Lookup**:
  - `Search By Keyword`: Text input ("Search By Student Name, Roll Number, Enroll Number, National Id, Local Id Etc.")
  - `Search` Button

#### 2. Data Grid: "Student List"
- Empty State: Document folder graphic with "No data available in table" and "Add new record or search with different criteria."
- Columns:
  1. `Class`: Grade level
  2. `Section`: Class section
  3. `Admission No`: Unique student identifier
  4. `Student Name`: Student full name
  5. `Father Name`: Primary guardian name
  6. `Date Of Birth`: Birth date (`DD/MM/YYYY`)
  7. `Mobile No.`: Contact telephone
  8. `Action`: `Collect Fees` action button (opens full student fee ledger sheet)

#### 3. Student Fee Ledger Sheet (Triggered by Collect Fees Action)
- Displays student biographical header, total fees assigned, total paid, total discount, fine levied, and net balance due.
- Table of individual fee heads with checkboxes to collect individual heads or batch pay.
- POS payment checkout modal: Payment Mode (`Cash`, `Cheque`, `DD`, `Bank Transfer`, `UPI / QR`), Reference/Check No, Payment Date, Remarks, Print Thermal / Standard Receipt toggle.

---

### Slug 02: Offline Bank Payments (`/fees/offline-bank-payments`)
*Layout: Financial Verification & Approval Pipeline*

#### 1. Table Controls
- Table Title: `Offline Bank Payments`
- Global Search Input
- Page Size Dropdown (`100`)
- Export Toolbar: `Copy`, `Excel`, `CSV`, `PDF`, `Print`

#### 2. Data Grid Columns
1. `Request ID`: Sequential submission ID (e.g. `253`, `252`, `251`, `249`)
2. `Admission No`: Student ID (e.g. `1800011`, `9001`, `5422`)
3. `Name`: Student full name
4. `Class`: Class and section (e.g. `Class 1(A)`, `Class 2(A)`)
5. `Payment Date`: Date payment deposited in bank (`MM/DD/YYYY`)
6. `Submit Date`: Timestamp when parent submitted the payment slip (e.g. `08/03/2026 01:58 pm`)
7. `Amount ($)`: Numerical dollar value (e.g. `$200.00`, `$1,000.00`, `$3,456.00`)
8. `Status`: Status badge:
   - `Pending`: Orange badge (Awaiting accountant verification)
   - `Approved`: Green badge (Reconciled and credited)
9. `Status Date`: Timestamp when accountant processed the slip
10. `Payment ID`: Allocated bank payment journal reference (e.g. `5529/1`, `1351/2`)
11. `Action`: Review action button (launches modal to view uploaded bank deposit slip image/PDF, verify transaction reference, and click `Approve` or `Reject` with audit notes)

---

### Slug 03: Search Fees Payment (`/fees/search-payment`)
*Layout: Single-Token Instant Receipt Verifier*

#### Form & Search Action
- Card Header: `Search Fees Payment`
- Field: `Payment ID *`: Mandatory text input for transaction journal / receipt number
- Action: `Search` Button
- Functional Output: Fetches the exact payment receipt voucher displaying student info, fee head breakdown, payment mode, cashier name, date/time, and quick-print buttons (A4 Receipt / 80mm POS Thermal Slip).

---

### Slug 04: Search Due Fees (`/fees/search-due`)
*Layout: Delinquency & Aging Receivables Filter*

#### 1. Filter Section ("Select Criteria")
- `Fees Group *`: Mandatory dropdown (e.g. `Class 1 General`, `Class 2 General`, `Tuition Term 1`)
- `Class`: Optional dropdown
- `Section`: Optional dropdown
- `Search` Button

#### 2. Functional Output & Delinquency Grid
- Loads all students who have an overdue balance under the selected fee group.
- Columns: `Admission No`, `Student Name`, `Class`, `Father Name`, `Date Of Birth`, `Due Date`, `Amount Billed`, `Paid Amount`, `Discount`, `Fine`, `Balance Due ($)`.
- Batch Actions:
  - `Send SMS / WhatsApp Reminder`: Triggers automated payment reminder messages to selected parents.
  - `Export Overdue Ledger`: Downloads PDF/Excel report for accountant audit.

---

### Slug 05: Fees Master (`/fees/fees-master`)
*Layout: Split 2-Column Hierarchical Fee Schedule Builder*

#### 1. Left Card: "Add Fees Master : 2026-27"
- Dynamic header bound to active academic session (`2026-27`).
- Fields:
  1. `Fees Group *`: Mandatory dropdown (Target package e.g., `Class 1 General`, `Class 2 Lump Sum`)
  2. `Fees Type *`: Mandatory dropdown (Charge head e.g., `Admission Fees`, `Monthly Fees`, `Bus Fees`)
  3. `Due Date`: Date picker for payment deadline
  4. `Amount ($) *`: Mandatory numerical fee amount
  5. `Fine Type`: Radio button selector:
     - `None`: No overdue penalty
     - `Percentage`: Percentage penalty based on fee amount
     - `Fix Amount`: Fixed dollar fee penalty
     - `Cumulative`: Daily compounding fine penalty
  6. Dynamic Conditional Fields:
     - `Percentage (%) *`: Displayed if Fine Type is Percentage
     - `Fix Amount ($) *`: Displayed if Fine Type is Fix Amount or Cumulative
- Action: `Save` Button

#### 2. Right Card: "Fees Master List : 2026-27"
- Controls: Search input, Page Size (`50`), Export Toolbar (Copy, Excel, CSV, PDF, Print, Columns).
- **Hierarchical Grouped Data Grid**:
  - Top Group Header: `Fees Group` (e.g., `Class 1 General`, `Class 1 Lump Sum`, `Class 1-1 Installment`, `Class 2 General`, `Class 3 General`...)
  - Group Header Actions (Far Right):
    - `Assign / View Students` (User checklist icon &rarr; opens student fee allocation matrix)
    - `Delete Group` (Cross &rarr; deletes fee package)
  - Sub-Rows per Fees Group:
    1. `Fees Code`: Charge name with bracket slug (e.g. `April Month Fees(apr-month-fees)`, `Admission Fees(admission-fees)`, `Bus-fees(Bus-fees)`)
    2. `Amount`: Monetary charge (e.g. `$350.00`, `$2,500.00`, `$200.00`)
    3. `Fine Type`: `Fix`, `None`, `Percentage`, `Cumulative`
    4. `Due Date`: Payment deadline date (`MM/DD/YYYY` or `DD/MM/YYYY`)
    5. `Per Day`: `Yes` / `No` (indicating daily compounding fine)
    6. `Days-Fine Amount`: Penalty terms (e.g. `Fine: 50.00`, `Fine: 0.00`, `Fine: 35.00`, `Days: 200 - Fine: $25.00`)
    7. `Action`: Row-level `Edit` (Pencil), `Delete` (Cross)

---

### Slug 06: Quick Fees (`/fees/quick-fees`)
*Layout: High-Speed Counter Checkout Terminal*

#### Form Header & Selectors
- Card Header: `Quick Fees Master`
- Fields:
  1. `Class`: Dropdown selector
  2. `Section`: Dropdown selector
  3. `Student`: Searchable dropdown student selector
- Functional Behavior: Instantly navigates to the selected student's fee payment ledger, bypassing general student tables.

---

### Slug 07: Fees Group (`/fees/group`)
*Layout: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Fees Group"
- `Name *`: Mandatory text input (e.g. `Class 1 General`, `Class 1 Lump Sum`, `Class 1 - I Installment`, `Class 2 General`, `Class 3 General`, `Class 4 General`, `Class 5 General`, `Discount`, `March Fees`, `Exam`, `RKS Fees Test One`)
- `Description`: Multi-line textarea
- Action: `Save` Button

#### 2. Right Card: "Fees Group List"
- Controls: Search input, Page Size (`50`), Export Toolbar.
- Columns: `Name`, `Description`, `Action` (`Edit`, `Delete`).

---

### Slug 08: Fees Type (`/fees/type`)
*Layout: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Fees Type"
- `Name *`: Mandatory text input (e.g. `Admission Fees`, `1st Installment Fees`, `April Month Fees`, `Bus-fees`, `Caution Money Fees`, `Exam Fees`...)
- `Fees Code *`: Mandatory system code (e.g. `admission-fees`, `1-installment-fees`, `apr-month-fees`, `Bus-fees`, `caution-money-fees`...)
- `Description`: Multi-line textarea
- Action: `Save` Button

#### 2. Right Card: "Fees Type List"
- Controls: Search input, Page Size (`50`), Export Toolbar.
- Columns: `Name`, `Fees Code`, `Action` (`Edit`, `Delete`).

---

### Slug 09: Fees Discount (`/fees/discount`)
*Layout: Split 2-Column Form & Data Grid*

#### 1. Left Card: "Add Fees Discount"
- `Name *`: Mandatory discount title (e.g. `RKS Discount 1`, `Sibling Discount`, `Handicapped Discount`, `Class Topper Discount`)
- `Discount Code *`: Mandatory voucher code (e.g. `rksdisc01`, `sibling-disc`, `handicap-disc`, `cls-top-disc`)
- `Discount Type`: Radio button selector (`Percentage` / `Fix Amount`)
- Dynamic fields: `Percentage (%) *` OR `Amount ($) *` (e.g. `$100.00`, `$300.00`, `$350.00`)
- `Number Of Use Count *`: Mandatory maximum usage quota (e.g. `5`, `10`, `20`)
- `Expiry Date`: Date picker (`MM/DD/YYYY`)
- `Description`: Multi-line textarea
- Action: `Save` Button

#### 2. Right Card: "Fees Discount List"
- Columns: `Name`, `Discount Code`, `Percentage (%)`, `Amount ($)`, `Number Of Use Count`, `Expiry Date`, `Action` (`Assign / View Students` [User icon], `Edit`, `Delete`).

---

### Slug 10: Fees Carry Forward (`/fees/carry-forward`)
*Layout: Academic Session Delinquent Balance Migration Wizard*

#### 1. Header & Controls ("Select Criteria")
- Top Action Button: `Delete Carry Forward` (Rollback tool)
- Fields:
  - `Class *`: Mandatory dropdown
  - `Section *`: Mandatory dropdown
  - `Search` Button
- Functional Purpose: Discovers unpaid delinquent balances from the prior academic year and bulk migrates them as opening balance receivables in the new active session (`2026-27`).

---

### Slug 11: Fees Reminder (`/fees/reminder`)
*Layout: Tabular Trigger Matrix Configurator*

#### 1. Page Header & Card
- Card Header: `Fees Reminder`

#### 2. Reminder Schedule Matrix
- Table Columns:
  1. `Action`: Checkbox toggle labeled `Active`
  2. `Reminder Type`: Directional trigger (`Before` or `After`)
  3. `Days`: Number input for the day offset value
- Matrix Rows:
  - **Row 1**: `[ ] Active` | `Before` | `2` Days (Sends notice 2 days prior to due date)
  - **Row 2**: `[ ] Active` | `Before` | `5` Days (Sends notice 5 days prior to due date)
  - **Row 3**: `[ ] Active` | `After` | `2` Days (Sends overdue notice 2 days post deadline)
  - **Row 4**: `[ ] Active` | `After` | `5` Days (Sends escalation notice 5 days post deadline)
- Footer Action: `Save` Button (Persists cron scheduling rules into automated notification engine).

---

### Master Summary: All 11 Fees Collection Slugs

| # | Slug | Layout Pattern | Key Inputs / Controls | Primary Financial Function |
|:---:|:---|:---:|:---|:---|
| **01** | **`collect-fees`** | Dual Search + POS Directory | Class/Section OR Keyword | Multi-head student fee payment & receipting |
| **02** | **`offline-bank-payments`** | Verification Grid with Badges | Bank slip modal + Approve/Reject | Reconcile wire transfers and parent deposits |
| **03** | **`search-payment`** | Single Token Query | `Payment ID *` | Rapid receipt verification and reprint |
| **04** | **`search-due`** | Group/Class Delinquency Filter | `Fees Group *`, Class, Section | Locate overdue accounts & send batch notices |
| **05** | **`fees-master`** | Split 2-Column Grouped Grid | Fee Group*, Type*, Amount*, 4-way Fine | Define fee structures & fine calculation rules |
| **06** | **`quick-fees`** | Direct Student POS Picker | Class, Section, Student dropdowns | Fast-track counter checkout |
| **07** | **`fees-group`** | Split 2-Column Form & List | `Name *`, `Description` | Master packages grouping fee types |
| **08** | **`fees-type`** | Split 2-Column Form & List | `Name *`, `Fees Code *` | Master charge head definitions |
| **09** | **`fees-discount`** | Split 2-Column Form & List | Name*, Code*, Amount/Pct*, Use Count* | Scholarships and voucher allocation rules |
| **10** | **`fees-carry-forward`** | Session Migration Wizard | Class*, Section* + Delete Button | Roll forward unpaid balances to new session |
| **11** | **`fees-reminder`** | Tabular Matrix Configurator | Active Checkbox, Before/After, Days Input | Scheduled multi-channel delinquency warnings |
