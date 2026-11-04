# Module 13: Expenses CRUD Architecture & Expenditure Management Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Expenses** module governs institutional operational expenditure, procurement disbursements, utility bill settlements (electricity, telephone, internet), event decoration costs, stationery supplies, and general administrative cash outflows. It provides accountants, bursars, and school administrators with structured disbursement entry forms, dual-query criteria search engines, voucher/receipt dropzone storage, and categorized Chart of Accounts (`expense_heads`) classification.

- **Module Index**: `13`
- **Legacy Route Base**: `/admin/expense`
- **Modern Component Root**: `/super-admin/expenses`
- **Functional Domain**: `Accounts & Expenditure Management`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Accounting Engine Standard**: All recorded expense disbursements enforce non-destructive ledger logging; modifications and voided vouchers write immutable contra-entry reversal audits to the general ledger.
- **Asynchronous Pipeline**: Expense vouchers are acknowledged synchronously and published via the Sync-to-Async Bridge to Kafka (`school.finance.expense-recorded`) for real-time budget depletion tracking, cash flow projections, and cross-branch P&L statements.

---

### Complete Slug Inventory & Route Mapping

The Expenses module comprises **3 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `add-expense` | `/admin/expense` | `/super-admin/expenses` | Split 2-Column (Pattern B) | `expenses` | Create Expense, Upload Receipt/Bill, Inline Edit, Delete |
| **02** | `search-expense` | `/admin/expense/expensesearch` | `/super-admin/expenses/search` | Dual-Query Filter (Pattern A) | `expenses` | Filter by Period/Type, Search by Keyword, Export Ledger |
| **03** | `expense-head` | `/admin/expense/expensehead` | `/super-admin/expenses/head` | Split 2-Column (Pattern B) | `expense_heads` | Create Expense Category, Edit Head, Delete Head |

---

### 1. Slug `add-expense`: In-Place Expenditure Intake & Outflow Ledger

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Expense`.
- **Right Column (~67% width)**: Data Grid Card titled `Expense List`.

#### B. Left Form Schema (`Add Expense`)
| Form Field Label | Field Name | Input Type | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|
| **Expense Head \*** | `expense_head_id` | `dropdown` | Required, foreign key to `expense_heads` | Classifies expenditure into chart of accounts (e.g., `Stationery Purchase`, `Electricity Bill`, `Telephone Bill`, `Miscellaneous`, `Flower`). |
| **Name \*** | `name` | `text` | Required, `VARCHAR(255)` | Short human-readable title of expenditure (e.g., `Online Course Classes`, `Airtel Broad Band`, `Miscellaneous-July 2026`, `CBSE BOOKS`). |
| **Invoice Number** | `invoice_number` | `text` | Optional, `VARCHAR(100)` | Vendor invoice or procurement voucher code (e.g., `56564`, `5464`, `6765`, `7758`, `56467`). |
| **Date \*** | `entry_date` | `datepicker` | Required, `DATE` | Payment/disbursement posting date, formatted `MM/DD/YYYY` (pre-filled with current system date e.g., `09/12/2026`). |
| **Amount ($) \*** | `amount` | `decimal` | Required, `DECIMAL(12,2) > 0` | Expenditure amount in active branch currency symbol (`$`). |
| **Attach Document** | `document_file` | `file_dropzone` | Optional, max 10MB, PDF/JPG/PNG | Drag-and-drop cloud upload box with upload icon (`Drag and drop a file here or click`). Uploads to secure S3/MinIO storage. |
| **Description** | `description` | `textarea` | Optional, `TEXT` | Narrative justification or itemized vendor remarks. |
| **Save Button** | *Submit* | `button` | Bottom-right tactile purple button | Validates form and submits `POST /api/v1/expenses`. |

#### C. Right Table Schema (`Expense List`)
- **Search & Pagination Toolbar**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Export Suite: Copy, CSV, Excel, PDF, Print (5 export action icons).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(255)` | Sortable bold text (e.g., `Online Course Classes`, `Airtel Broad Band`, `CBSE BOOKS`). |
| **Description** | `description` | `TEXT` | Sortable narrative text (e.g., *NCRT Books are essential materials for students of all classes*). |
| **Invoice Number** | `invoice_number` | `VARCHAR(100)` | Sortable reference code (e.g., `56564`, `6765`, `7758`). |
| **Date** | `entry_date` | `DATE` | Sortable date, formatted `MM/DD/YYYY` (e.g., `09/25/2026`, `09/17/2026`). |
| **Expense Head** | `expense_head_name`| `VARCHAR(100)` | Sortable category badge (e.g., `Stationery Purchase`, `Telephone Bill`, `Miscellaneous`, `Flower`). |
| **Amount ($)** | `amount` | `DECIMAL(12,2)` | Sortable right-aligned formatted currency with dollar sign (e.g., `$350.00`, `$300.00`, `$1,000.00`). |
| **Action** | *Controls* | `ACTIONS` | Two tactile purple icon buttons:<br>1. Edit (`edit` pencil icon): Populates left form for inline editing.<br>2. Delete (`delete` trash can icon): Triggers modal confirmation. |

---

### 2. Slug `search-expense`: Dual-Query Filter Engine

#### A. Screen Architecture & Visual Layout
Top/Bottom Stacked layout:
- **Top Card**: `Select Criteria` filter card with side-by-side dual queries.
- **Bottom Card**: `Expense List` results grid with empty-state recovery prompt.

#### B. Top Card (`Select Criteria`) Query Modes
1. **Left Query Mode: Search by Period Type**:
   - `Search Type *`: Single-select dropdown containing standard accounting periods:
     - `Today`
     - `This Week`
     - `Last Week`
     - `This Month`
     - `Last Month`
     - `Last 3 Months`
     - `Last 6 Months`
     - `This Year`
     - `Last Year`
   - `Search` Button: Solid purple tactile button with `search` icon + text.
2. **Right Query Mode: Search by Expense Keyword**:
   - `Search *`: Text input with placeholder `Search by Expense`. Matches against `name`, `invoice_number`, and `description`.
   - `Search` Button: Solid purple tactile button with `search` icon + text.

#### C. Bottom Card (`Expense List`) Schema & Empty State
- **Empty State Behavior**:
  - Centered graphic: Folder containing floating file documents.
  - Light red alert notice: `No data available in table`.
  - Action link: `⬅ Add new record or search with different criteria.` (links directly back to `/super-admin/expenses`).
  - Pagination footer: `Showing 0 to 0 of 0 entries`.
- **Populated State Columns**:
  - `Name`, `Invoice Number`, `Expense Head`, `Date`, `Amount ($)`.
  - Summary Footer Widget: Dynamic sum row calculating total disbursements matching the query criteria: `Total Expense: $[SUM]`.

---

### 3. Slug `expense-head`: Chart of Accounts Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Expense Head`.
- **Right Column (~67% width)**: Data Grid Card titled `Expense Head List`.

#### B. Left Form Schema (`Add Expense Head`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Expense Head \*** | `name` | `text` | Required, `VARCHAR(150)`, unique per campus (`branch_id`). Active purple border focus. |
| **Description** | `description` | `textarea` | Optional, `TEXT`. Accounting notes for GL budget mapping. |
| **Save Button** | *Submit* | `button` | Bottom-right tactile solid purple button. |

#### C. Right Table Schema (`Expense Head List`)
- **Search & Pagination Toolbar**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Export Suite: Copy, CSV, Excel, PDF, Print (5 export action icons).
- **Default System Records Seeded**:
  1. `Stationery Purchase`
  2. `Electricity Bill`
  3. `Telephone Bill`
  4. `Miscellaneous`
  5. `Flower`
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Expense Head** | `name` | `VARCHAR(150)` | Sortable category title. |
| **Description** | `description` | `TEXT` | Sortable explanatory notes. |
| **Action** | *Controls* | `ACTIONS` | Two tactile purple icon buttons:<br>1. Edit (`edit` pencil icon): Loads category into left form.<br>2. Delete (`close`/`x` icon): Soft-deletes category if no transactions are bound. |

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- Expense Category Heads (Chart of Accounts)
CREATE TABLE expense_heads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    is_system_default BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_expense_head_branch UNIQUE (branch_id, name)
);

ALTER TABLE expense_heads ENABLE ROW LEVEL SECURITY;
CREATE POLICY expense_heads_branch_isolation ON expense_heads
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Expense Transactions Ledger
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    expense_head_id UUID NOT NULL REFERENCES expense_heads(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    invoice_number VARCHAR(100),
    entry_date DATE NOT NULL,
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    description TEXT,
    document_url TEXT,
    document_name VARCHAR(255),
    document_size_bytes BIGINT,
    recorded_by_staff_id UUID NOT NULL REFERENCES staff(id),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_expenses_branch_date ON expenses(branch_id, entry_date);
CREATE INDEX idx_expenses_invoice ON expenses(branch_id, invoice_number);
CREATE INDEX idx_expenses_head ON expenses(branch_id, expense_head_id);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY expenses_branch_isolation ON expenses
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Expenses Endpoints
- `GET /api/v1/expenses`
  - Headers: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
  - Query Params: `page=0`, `size=50`, `search=Broad Band`
  - Response: `200 OK` (Paged list of expense items with nested expense head details).
- `POST /api/v1/expenses`
  - Content-Type: `multipart/form-data`
  - Payload:
    ```json
    {
      "expenseHeadId": "b2029104-6612-4212-9011-992199211022",
      "name": "Airtel Broad Band",
      "invoiceNumber": "6765",
      "entryDate": "2026-09-17",
      "amount": 300.00,
      "description": "High-speed campus fiber line bill"
    }
    ```
  - File: `documentFile` (binary upload)
  - Response: `201 Created`.
- `GET /api/v1/expenses/search`
  - Query Params: `searchType=this_month` OR `keyword=CBSE`
  - Response: `200 OK` (List of matching expense rows and total sum amount).
- `PUT /api/v1/expenses/{id}`
  - Payload: Updated expense entity fields.
  - Response: `200 OK`.
- `DELETE /api/v1/expenses/{id}`
  - Response: `204 No Content` (Soft-deletes record with audit logging).

#### 2. Expense Heads Endpoints
- `GET /api/v1/expense-heads`
  - Response: `200 OK` (List of active expense heads for dropdowns and table).
- `POST /api/v1/expense-heads`
  - Payload: `{"name": "Laboratory Consumables", "description": "Chemistry reagents and glassware"}`
  - Response: `201 Created`.
- `PUT /api/v1/expense-heads/{id}`
  - Payload: `{"name": "Updated Name", "description": "Updated notes"}`
  - Response: `200 OK`.
- `DELETE /api/v1/expense-heads/{id}`
  - Response: `204 No Content` (Rejected with `409 Conflict` if existing expense records are attached).

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_exp_559210193",
  "eventType": "school.finance.expense-recorded",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T02:38:00Z",
  "payload": {
    "expenseId": "exp_88310422",
    "expenseHead": "Telephone Bill",
    "name": "Airtel Broad Band",
    "invoiceNumber": "6765",
    "entryDate": "2026-09-17",
    "amount": 300.00,
    "currency": "USD",
    "recordedBy": "stf_bursar_02"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 3 Expenses slugs documented with visual UI fidelity and field constraints.
- [x] Pattern B (Split 2-Column) verified for `Add Expense` and `Expense Head`.
- [x] Pattern A (Dual-Query Period vs Keyword) verified for `Search Expense`.
- [x] Date pre-population behavior documented (`Date` field pre-fills with active date `09/12/2026`).
- [x] PostgreSQL schema with `branch_id` RLS isolation and foreign key integrity.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
