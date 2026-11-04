# Module 12: Income CRUD Architecture & Financial Accounting Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Income** module governs institutional non-fee revenue capture, petty cash receipts, auxiliary enterprise earnings (e.g., bus rent, book sales, uniform sales, facilities leasing, donations), and general ledger (GL) journal intake. It provides administrative cashiers, bursars, and accountants with structured income entry forms, dual-query criteria search engines, file attachment vaults, and categorized Chart of Accounts (`income_heads`) classification.

- **Module Index**: `12`
- **Legacy Route Base**: `/admin/income`
- **Modern Component Root**: `/super-admin/income`
- **Functional Domain**: `Accounts & Institutional Financial Accounting`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **Accounting Engine Standard**: All recorded income transactions are strictly non-destructive; updates and deletions write immutable contra-entry reversal audits to the financial ledger.
- **Asynchronous Pipeline**: Transactions are acknowledged immediately and broadcast via the Sync-to-Async Bridge to Kafka (`school.finance.income-recorded`) for automated balance sheet adjustments and multi-branch ledger rollups.

---

### Complete Slug Inventory & Route Mapping

The Income module comprises **3 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `add-income` | `/admin/income` | `/super-admin/income` | Split 2-Column (Pattern B) | `incomes` | Create Income, Upload Voucher/Slip, Inline Edit, Delete |
| **02** | `search-income` | `/admin/income/incomesearch` | `/super-admin/income/search` | Dual-Query Filter (Pattern A) | `incomes` | Filter by Period/Type, Search by Keyword, Export Ledger |
| **03** | `income-head` | `/admin/income/incomehead` | `/super-admin/income/head` | Split 2-Column (Pattern B) | `income_heads` | Create Revenue Category, Edit Head, Delete Head |

---

### 1. Slug `add-income`: In-Place Intake Form & Revenue Ledger

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Income`.
- **Right Column (~67% width)**: Data Grid Card titled `Income List`.

#### B. Left Form Schema (`Add Income`)
| Form Field Label | Field Name | Input Type | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|
| **Income Head \*** | `income_head_id` | `dropdown` | Required, foreign key to `income_heads` | Classifies revenue into chart of accounts (e.g., `Rent`, `Donation`, `Miscellaneous1`). |
| **Name \*** | `name` | `text` | Required, `VARCHAR(255)` | Short human-readable title of transaction (e.g., `Monthly Bus Rent`, `Student Uniform`). |
| **Invoice Number** | `invoice_number` | `text` | Optional, `VARCHAR(100)` | External vendor/customer invoice or receipt reference number (e.g., `6747676`, `67575`). |
| **Date \*** | `entry_date` | `datepicker` | Required, `DATE` | Accounting posting date, formatted `MM/DD/YYYY` (e.g., `09/30/2026`). |
| **Amount ($) \*** | `amount` | `decimal` | Required, `DECIMAL(12,2) > 0` | Revenue amount in active branch currency symbol (`$`). |
| **Attach Document** | `document_file` | `file_dropzone` | Optional, max 10MB, PDF/JPG/PNG | Drag-and-drop cloud upload box with upload icon (`Drag and drop a file here or click`). Uploads to secure S3/MinIO storage. |
| **Description** | `description` | `textarea` | Optional, `TEXT` | Detailed audit commentary or justification for the receipt. |
| **Save Button** | *Submit* | `button` | Bottom-right tactile purple button | Validates form and submits `POST /api/v1/incomes`. |

#### C. Right Table Schema (`Income List`)
- **Search & Pagination Toolbar**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Export Suite: Copy, CSV, Excel, PDF, Print (5 export action icons).
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(255)` | Sortable bold text (e.g., `Monthly Bus Rent`, `NCRT NEW Books Publisher`, `Fees Donation`). |
| **Description** | `description` | `TEXT` | Sortable narrative text or blank. |
| **Invoice Number** | `invoice_number` | `VARCHAR(100)` | Sortable reference code (e.g., `6747676`, `567`, `4545`). |
| **Date** | `entry_date` | `DATE` | Sortable date, formatted `MM/DD/YYYY` (e.g., `09/30/2026`, `09/21/2026`). |
| **Income Head** | `income_head_name`| `VARCHAR(100)` | Sortable category badge (e.g., `Rent`, `Miscellaneous1`, `Donation`). |
| **Amount ($)** | `amount` | `DECIMAL(12,2)` | Sortable right-aligned formatted currency with dollar sign (e.g., `$400.00`, `$2,000.00`, `$1,000.00`, `$350.00`). |
| **Action** | *Controls* | `ACTIONS` | Two tactile purple icon buttons:<br>1. Edit (`edit` pencil icon): Populates left form for inline editing.<br>2. Delete (`delete` trash can icon): Triggers modal confirmation. |

---

### 2. Slug `search-income`: Dual-Query Filter Engine

#### A. Screen Architecture & Visual Layout
Top/Bottom Stacked layout:
- **Top Card**: `Select Criteria` filter card with side-by-side dual queries.
- **Bottom Card**: `Income List` results grid with empty-state recovery prompt.

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
2. **Right Query Mode: Search by Income Keyword**:
   - `Search *`: Text input with placeholder `Search By Income`. Matches against `name`, `invoice_number`, and `description`.
   - `Search` Button: Solid purple tactile button with `search` icon + text.

#### C. Bottom Card (`Income List`) Schema & Empty State
- **Empty State Behavior**:
  - Centered graphic: Folder containing floating file documents.
  - Light red alert notice: `No data available in table`.
  - Action link: `⬅ Add new record or search with different criteria.` (links directly back to `/super-admin/income`).
  - Pagination footer: `Showing 0 to 0 of 0 entries`.
- **Populated State Columns**:
  - `Name`, `Invoice Number`, `Income Head`, `Date`, `Amount ($)`.
  - Summary Footer Widget: Dynamic sum row calculating total revenue matching the query criteria: `Total Amount: $[SUM]`.

---

### 3. Slug `income-head`: Chart of Accounts Taxonomy

#### A. Screen Architecture & Visual Layout
Classic **Split 2-Column Layout (Pattern B)**:
- **Left Column (~33% width)**: Form Card titled `Add Income Head`.
- **Right Column (~67% width)**: Data Grid Card titled `Income Head List`.

#### B. Left Form Schema (`Add Income Head`)
| Form Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Income Head \*** | `name` | `text` | Required, `VARCHAR(150)`, unique per campus (`branch_id`). Active purple border focus. |
| **Description** | `description` | `textarea` | Optional, `TEXT`. Accounting notes for GL mapping. |
| **Save Button** | *Submit* | `button` | Bottom-right tactile solid purple button. |

#### C. Right Table Schema (`Income Head List`)
- **Search & Pagination Toolbar**:
  - Global Search Input (`placeholder="Search"`).
  - Page Size Dropdown (`50` default).
  - Export Suite: Copy, CSV, Excel, PDF, Print, Column Visibility (6 export action icons).
- **Default System Records Seeded**:
  - `Donation`
  - `Rent`
  - `Miscellaneous`
  - `Book Sale`
  - `Uniform Sale`
  - `Miscellaneous1`
- **Data Table Columns**:
| Column Header | Field Name | Data Type | Rendering & Formatting Rules |
|:---|:---|:---|:---|
| **Income Head** | `name` | `VARCHAR(150)` | Sortable category title. |
| **Description** | `description` | `TEXT` | Sortable explanatory notes. |
| **Action** | *Controls* | `ACTIONS` | Two tactile purple icon buttons:<br>1. Edit (`edit` pencil icon): Loads category into left form.<br>2. Delete (`close`/`x` or trash icon): Soft-deletes category if no transactions are bound. |

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- Income Category Heads (Chart of Accounts)
CREATE TABLE income_heads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    is_system_default BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_income_head_branch UNIQUE (branch_id, name)
);

ALTER TABLE income_heads ENABLE ROW LEVEL SECURITY;
CREATE POLICY income_heads_branch_isolation ON income_heads
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Income Transactions Ledger
CREATE TABLE incomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    income_head_id UUID NOT NULL REFERENCES income_heads(id) ON DELETE RESTRICT,
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

CREATE INDEX idx_incomes_branch_date ON incomes(branch_id, entry_date);
CREATE INDEX idx_incomes_invoice ON incomes(branch_id, invoice_number);
CREATE INDEX idx_incomes_head ON incomes(branch_id, income_head_id);

ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY incomes_branch_isolation ON incomes
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API Specification

#### 1. Incomes Endpoints
- `GET /api/v1/incomes`
  - Headers: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
  - Query Params: `page=0`, `size=50`, `search=Bus Rent`
  - Response: `200 OK` (Paged list of income items with nested income head details).
- `POST /api/v1/incomes`
  - Content-Type: `multipart/form-data`
  - Payload:
    ```json
    {
      "incomeHeadId": "a1029104-5512-4212-9011-882199211021",
      "name": "Monthly Bus Rent",
      "invoiceNumber": "6747676",
      "entryDate": "2026-09-30",
      "amount": 400.00,
      "description": "Monthly bus rent from contracted vendor"
    }
    ```
  - File: `documentFile` (binary upload)
  - Response: `201 Created`.
- `GET /api/v1/incomes/search`
  - Query Params: `searchType=this_month` OR `keyword=NCRT`
  - Response: `200 OK` (List of matching income rows and total sum amount).
- `PUT /api/v1/incomes/{id}`
  - Payload: Updated income entity fields.
  - Response: `200 OK`.
- `DELETE /api/v1/incomes/{id}`
  - Response: `204 No Content` (Soft-deletes record with audit logging).

#### 2. Income Heads Endpoints
- `GET /api/v1/income-heads`
  - Response: `200 OK` (List of active revenue heads for dropdowns and table).
- `POST /api/v1/income-heads`
  - Payload: `{"name": "Facilities Lease", "description": "Auditorium rentals"}`
  - Response: `201 Created`.
- `PUT /api/v1/income-heads/{id}`
  - Payload: `{"name": "Updated Name", "description": "Updated notes"}`
  - Response: `200 OK`.
- `DELETE /api/v1/income-heads/{id}`
  - Response: `204 No Content` (Rejected with `409 Conflict` if existing income records are attached).

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_inc_449210192",
  "eventType": "school.finance.income-recorded",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T02:37:00Z",
  "payload": {
    "incomeId": "inc_99210411",
    "incomeHead": "Rent",
    "name": "Monthly Bus Rent",
    "invoiceNumber": "6747676",
    "entryDate": "2026-09-30",
    "amount": 400.00,
    "currency": "USD",
    "recordedBy": "stf_bursar_02"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] All 3 Income slugs documented with visual UI fidelity and field constraints.
- [x] Pattern B (Split 2-Column) verified for `Add Income` and `Income Head`.
- [x] Pattern A (Dual-Query Period vs Keyword) verified for `Search Income`.
- [x] Multi-format attachment dropzone modeled for receipt/invoice file storage.
- [x] PostgreSQL schema with `branch_id` RLS isolation and foreign key integrity.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
