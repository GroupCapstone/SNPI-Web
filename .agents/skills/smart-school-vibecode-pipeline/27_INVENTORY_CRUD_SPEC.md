# Module 27: Inventory CRUD Architecture & Warehouse Logistics Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Inventory** module governs the complete procurement, stock acquisition, warehouse depot management, vendor tracking, and equipment loan/issuance lifecycle across the institution. It supports all physical non-book assets—including classroom furniture (`Benches`, `Table chair`, `Desk`), laboratory apparatus (`Lab Equipment`, `Projectors`), sports gear (`Cricket Bat`, `Football`), staff uniforms, and stationery supplies (`Notebooks`, `Class Board`, `Paper and Pencils`). It features an automated two-way inventory deduction engine where issuing an item decreases `Available Quantity`, and clicking the red tactile `Click To Return` button restocks the warehouse depot and transitions the record to green `Returned`.

- **Module Index**: `27`
- **Legacy Route Base**: `/admin/item`, `/admin/issueitem`
- **Modern Component Root**: `/super-admin/inventory`
- **Functional Domain**: `Asset Acquisition, Warehouse Stores, Vendor Directory & Equipment Loan Desk`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Stock Ingress**: Stock acquisitions and bulk item returns strictly comply with Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/inventory/items/issue` and `POST /api/v1/inventory/items/return` return `HTTP 202 Accepted` with a `trackingId`, buffering inventory ledger recalculation and audit updates to Kafka topics `school.inventory.item-issued` and `school.inventory.item-returned`).
- **Tactile Status Physics**:
  - Unreturned active loans render a **Solid Red Tactile Button Badge**: `Click To Return`. Clicking this trigger executes the return workflow.
  - Completed returns render a **Solid Green Pill Badge**: `Returned`.

---

### Complete Slug Inventory & Route Mapping

The Inventory module comprises **6 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `issue-item` | `/admin/issueitem` | `/super-admin/inventory/issue-item` | Full-Width Master Ledger + Modal | `item_issues` | `+ Issue Item`, Click To Return (Red Button), Delete Loan Record, Audit Status |
| **02** | `item-stock` | `/admin/itemstock` | `/super-admin/inventory/item-stock` | Split 2-Column Master-Detail (Pattern B) | `item_stocks` | Add Stock, Purchase Price ($), Upload Invoice, Edit Stock, Delete Stock |
| **03** | `item` | `/admin/item/index`| `/super-admin/inventory/item` | Split 2-Column Master-Detail (Pattern B) | `items` | Create Item, Unit Definition, Real-Time `Available Quantity` Tracking, Edit, Delete |
| **04** | `item-category` | `/admin/itemcategory`| `/super-admin/inventory/item-category` | Split 2-Column Master-Detail (Pattern B) | `item_categories` | Add Category, Taxonomy Ledger, Edit, Delete |
| **05** | `item-store` | `/admin/itemstore` | `/super-admin/inventory/item-store` | Split 2-Column Master-Detail (Pattern B) | `item_stores` | Add Store/Depot, Store Code, Description, Edit, Delete |
| **06** | `item-supplier` | `/admin/itemsupplier`| `/super-admin/inventory/item-supplier` | Split 2-Column Master-Detail (Pattern B) | `item_suppliers` | Add Supplier, Vendor Contact Details, GST/Tax ID, Address, Edit, Delete |

---

### 1. Slug `issue-item`: Equipment Issuance Desk & Return Register

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Issue Item List`
- **Active Navigation**: `Inventory` -> `Issue Item` (Route: `/admin/issueitem`)
- **Top Right Action Button**:
  - `+ Issue Item`: Solid purple tactile button (`#8E24AA`) with plus glyph, opens item loan issuance modal.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`
- **Master Data Table Schema (`item_issues`)**:

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Item** | `item_name` | `VARCHAR(255)` | Sortable item catalog title. | `Class Board`, `Uniform`, `Table chair`, `Cricket Bat`, `Projectors`, `Notebooks`. |
| **Note** | `note` | `TEXT` | Sortable operational remarks. | Blank across standard records. |
| **Item Category** | `category_name`| `VARCHAR(255)` | Sortable inventory category classification. | `Books Stationery`, `Staff Dress`, `Furniture`, `Sports`, `Chemistry Lab Apparatus`. |
| **Issue - Return**| `loan_period` | `VARCHAR(50)` | Formatted interval `MM/DD/YYYY - MM/DD/YYYY`. | `09/28/2026 - 09/30/2026`, `09/21/2026 - 09/25/2026`, `09/18/2026 - 09/21/2026`, `09/15/2026 - 09/17/2026`, `09/03/2026 - 09/03/2026`, `08/27/2026 - 08/31/2026`, `08/21/2026 - 08/25/2026`, `05/27/2026 - 05/30/2026`, `05/14/2026 - 05/27/2026`. |
| **Issue To** | `issued_to_name`| `VARCHAR(255)` | Sortable recipient staff member with staff ID. | `James Deckar (9004)`, `Shivam Verma (9002)`, `Jason Sharlton (90006)`, `William Abbot (9003)`, `Brandon Heart (9006)`. |
| **Issued By** | `issued_by_name`| `VARCHAR(255)` | Sortable issuing inventory officer with staff ID. | `Joe Black (9000)`, `Shivam Verma (9002)`, `James Deckar (9004)`, `William Abbot (9003)`, `Brandon Heart (9006)`. |
| **Quantity** | `quantity` | `INTEGER` | Sortable units issued out on loan. | `2`, `5`, `12`, `11`, `3`, `10`, `1`. |
| **Status** | `status` | `BADGE_BUTTON` | Dual-state visual status pill:<br>• **Red Tactile Button**: `Click To Return` (interactive trigger that returns asset to inventory)<br>• **Green Pill Badge**: `Returned` (passive terminal state). | Red button rendered for active loans; Green badge rendered for returned assets. |
| **Action** | *Controls* | `ACTIONS` | Single purple tactile button with cross/trash glyph (`close` / `delete`). | Removes historic loan record. |

#### B. `+ Issue Item` Modal Schema
| Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **User Type \*** | `user_type` | `SELECT_DROPDOWN` | `Staff` (default), `Student`. |
| **Issue To \*** | `issue_to_id` | `SELECT_DROPDOWN` | Searchable recipient selector. |
| **Issued By \*** | `issued_by_id` | `SELECT_DROPDOWN` | Issuing inventory officer. |
| **Issue Date \*** | `issue_date` | `DATEPICKER` | Defaults to current date. |
| **Return Date** | `return_date` | `DATEPICKER` | Expected return date. |
| **Note** | `note` | `TEXTAREA` | Optional purpose or loan condition. |
| **Item Category \***| `category_id` | `SELECT_DROPDOWN` | Cascading category selector. |
| **Item \*** | `item_id` | `SELECT_DROPDOWN` | Filtered by category; shows `(Available: N)`. |
| **Quantity \*** | `quantity` | `NUMERIC_INPUT` | Must be `<= available_quantity`. |

---

### 2. Slug `item-stock`: Stock Inflow Procurement & Depot Intake

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Add Item Stock` Form
  - `Item Category *`: Select dropdown with purple focus outline, placeholder `Select`.
  - `Item *`: Cascading select dropdown, placeholder `Select`.
  - `Supplier`: Select dropdown, placeholder `Select`.
  - `Store`: Select dropdown, placeholder `Select`.
  - `Quantity *`: Numeric stepper with increment/decrement arrows (`+`, `-`).
  - `Purchase Price ($) *`: Decimal numeric input.
  - `Date *`: Datepicker input (`MM/DD/YYYY`).
  - `Attach Document`: Drag-and-drop file dropzone (`cloud_upload Drag and drop a file here or click`).
  - `Description`: Multiline textarea.
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Item Stock List` Table
  - `Search` input field, page size `50`, export suite (Copy, Excel, CSV, PDF, Print, Column visibility).
  - Columns: `Item`, `Category`, `Supplier`, `Store`, `Quantity`, `Purchase Price ($)`, `Date`, `Action`.
  - Action Controls: Dual purple tactile buttons per record (**Edit** pencil glyph, **Delete** trash glyph).

#### B. Ground Truth Seeded Stock Records
| Item | Category | Supplier | Store | Quantity | Purchase Price ($) | Date |
|:---|:---|:---|:---|:---:|:---:|:---:|
| `Lab Equipment` | `Chemistry Lab Apparatus` | `Jhon smith Supplier` | `Chemistry Equipment (Ch201)` | 4 | 350.00 | 09/30/2026 |
| `Notebooks` | `Books Stationery` | `Camlin Stationers` | `Uniform Dress Store (UND23)` | 10 | 250.00 | 09/24/2026 |
| `Table chair` | `Furniture` | `Camlin Stationers` | `Furniture Store (FS342)` | 5 | 300.00 | 09/17/2026 |
| `Uniform` | `Staff Dress` | `Jhon smith Supplier` | *None* | 12 | 12.00 | 09/10/2026 |
| `Cricket Bat` | `Sports` | `Camlin Stationers` | `Sports Store (sp55)` | 23 | 250.00 | 09/01/2026 |
| `Class Board` | `Books Stationery` | `Camlin Stationers` | `Sports Store (sp55)` | 12 | 500.00 | 06/18/2026 |
| `Benches` | `Furniture` | `David Furniture` | `Furniture Store (FS342)` | 12 | 250.00 | 06/12/2026 |

---

### 3. Slug `item`: Master Catalog & Real-Time Stock Balance

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Add Item` Form
  - `Item *`: Text input with active purple outline.
  - `Item Category *`: Select dropdown selector, placeholder `Select`.
  - `Unit *`: Text input specifying measurement (e.g. `Piece`, `Box`, `Pack`, `Kg`).
  - `Description`: Multiline textarea.
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Item List` Table
  - `Search` input field, page size `50`, export suite.
  - Master Columns: `Item`, `Description`, `Item Category`, `Unit`, `Available Quantity`, `Action`.
  - Action Controls: Dual purple buttons per row (**Edit**, **Delete**).

#### B. Ground Truth Master Catalog Records
| # | Item | Item Category | Unit | Available Quantity | Actions Permitted |
|---|:---|:---|:---:|:---:|:---:|
| 1 | `Cricket Bat` | `Sports` | `Piece` | **300** | Edit, Delete |
| 2 | `Uniform` | `Staff Dress` | `Piece` | **46** | Edit, Delete |
| 3 | `Table chair` | `Furniture` | `Piece` | **34** | Edit, Delete |
| 4 | `Staff Uniform` | `Staff Dress` | `Piece` | **295** | Edit, Delete |
| 5 | `Benches` | `Furniture` | `Piece` | **39** | Edit, Delete |
| 6 | `Football` | `Sports` | `Piece` | **106** | Edit, Delete |
| 7 | `Class Board` | `Books Stationery` | `Piece` | **280** | Edit, Delete |
| 8 | `Desk` | `Furniture` | `Piece` | **233** | Edit, Delete |
| 9 | `Lab Equipment` | `Chemistry Lab Apparatus` | `Piece` | **47** | Edit, Delete |
| 10 | `Notebooks` | `Books Stationery` | `Piece` | **105** | Edit, Delete |
| 11 | `Projectors` | `Chemistry Lab Apparatus` | `Piece` | **81** | Edit, Delete |
| 12 | `Paper and Pencils`| `Books Stationery` | `Piece` | **8** | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 12 of 12 entries.` with `< [ 1 ] >`.

---

### 4. Slug `item-category`: Classification Taxonomy

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Form (~35% width)**: `Add Item Category` (`Item Category *`, `Description`, `Save` button).
- **Right Table (~65% width)**: `Item Category List` (`Search`, page size `50`, export suite, columns: `Item Category`, `Description`, `Action` with Edit and Delete triggers).

#### B. Ground Truth Seeded Categories
| # | Item Category | Description | Actions Permitted |
|---|:---|:---|:---:|
| 1 | `Sports` | *None* | Edit, Delete |
| 2 | `Staff Dress` | *None* | Edit, Delete |
| 3 | `Furniture` | *None* | Edit, Delete |
| 4 | `Books Stationery` | *None* | Edit, Delete |
| 5 | `Chemistry Lab Apparatus` | `Chemistry Lab Apparatus` | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 5 of 5 entries.` with `< [ 1 ] >`.

---

---

### 5. Slug `item-store`: Physical Warehouse Depots & Locations

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Add Item Store` Form
  - `Item Store Name *`: Single text input field with active purple outline (`rgba(142, 36, 170, 0.6)`).
  - `Item Store Code`: Text input field (e.g. `LB2`, `SC2`, `UND23`, `FS342`, `Ch201`, `sp55`).
  - `Description`: Multiline textarea.
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Item Store List` Table
  - `Search` input field, page size dropdown `50`, export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - Master Columns: `Item Store Name`, `Item Store Code`, `Description`, `Action`.
  - Action Controls: Dual purple tactile buttons per record (**Edit** pencil glyph, **Delete** trash bin glyph).

#### B. Ground Truth Seeded Stores
| # | Item Store Name | Item Store Code | Description | Actions Permitted |
|---|:---|:---|:---|:---:|
| 1 | `Libraray Store` | `LB2` | *None* | Edit, Delete |
| 2 | `Science Store` | `SC2` | *None* | Edit, Delete |
| 3 | `Uniform Dress Store` | `UND23` | *None* | Edit, Delete |
| 4 | `Furniture Store` | `FS342` | *None* | Edit, Delete |
| 5 | `Chemistry Equipment` | `Ch201` | *The basic idea about the proper and necessary chemistry lab apparatus should be cleared among the students.* | Edit, Delete |
| 6 | `Sports Store` | `sp55` | *None* | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 6 of 6 entries.` with `< [ 1 ] >`.

---

### 6. Slug `item-supplier`: Vendor Directory & Procurement Contacts

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Add Item Supplier` Form
  - `Name *`: Single text input field with active purple outline.
  - `Phone`: Text input.
  - `Email`: Text input.
  - `Address`: Multiline textarea.
  - `Contact Person Name`: Text input.
  - `Contact Person Phone`: Text input.
  - `Contact Person Email`: Text input.
  - `Description`: Multiline textarea.
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Item Supplier List` Table
  - `Search` input field, page size `50`, export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - Master Columns:
    1. `Item Supplier` (sortable): Renders Supplier Name in bold, phone with telephone glyph (`call`), and email with envelope glyph (`mail`) in stacked multi-line format.
    2. `Contact Person` (sortable): Renders Contact Name with user glyph (`person`), direct mobile with telephone glyph (`call`), and contact email with envelope glyph (`mail`).
    3. `Address` (sortable): Renders warehouse / billing address prefixed with building glyph (`apartment` / `home`).
    4. `Action`: Dual purple tactile buttons per record (**Edit** pencil glyph, **Delete** trash bin glyph).

#### B. Ground Truth Seeded Suppliers
| # | Item Supplier (Name, Phone, Email) | Contact Person (Name, Phone, Email) | Address | Actions Permitted |
|---|:---|:---|:---|:---:|
| 1 | **Camlin Stationers**<br>Phone: `8456436583`<br>Email: `camlin@gmail.com` | **Bruce Stark**<br>Phone: `847487932`<br>Email: `bruce@gmail.com` | `22 Cristal Way, CA` | Edit, Delete |
| 2 | **Jhonson Uniform Dress**<br>Phone: `8796787856`<br>Email: `Jhon@gmail.com` | **David**<br>Phone: `87686785678`<br>Email: `david@gmail.com` | `22 Cristal Way, CA` | Edit, Delete |
| 3 | **David Furniture**<br>Phone: `678678678`<br>Email: `da@gmail.com` | **Peter**<br>Phone: `685676578`<br>Email: `pen@gmail.com` | `22 Cristal Way, CA` | Edit, Delete |
| 4 | **Jhon smith Supplier**<br>Phone: `8908089878`<br>Email: `jhon@gmail.com` | **David**<br>Phone: `8987978678`<br>Email: `david@gmail.com` | `Delhi Road,DR` | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 4 of 4 entries.` with `< [ 1 ] >`.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Item Categories
CREATE TABLE item_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE item_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_item_categories ON item_categories
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Item Stores (Warehouse Depots)
CREATE TABLE item_stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    store_name VARCHAR(255) NOT NULL,
    store_code VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE item_stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_item_stores ON item_stores
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 3. Item Suppliers (Vendors)
CREATE TABLE item_suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    contact_person_name VARCHAR(255),
    contact_person_phone VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE item_suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_item_suppliers ON item_suppliers
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 4. Item Catalog Master
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES item_categories(id) ON DELETE RESTRICTED,
    name VARCHAR(255) NOT NULL,
    unit VARCHAR(50) NOT NULL DEFAULT 'Piece',
    description TEXT,
    available_quantity INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_avail_qty_positive CHECK (available_quantity >= 0)
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_items ON items
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 5. Item Stock Inflow
CREATE TABLE item_stocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICTED,
    supplier_id UUID REFERENCES item_suppliers(id) ON DELETE SET NULL,
    store_id UUID REFERENCES item_stores(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    purchase_price NUMERIC(10, 2) NOT NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    attachment_path VARCHAR(512),
    description TEXT,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_stock_qty_positive CHECK (quantity > 0)
);

ALTER TABLE item_stocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_item_stocks ON item_stocks
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 6. Item Loans (Issuance & Returns)
CREATE TYPE item_issue_status_enum AS ENUM ('ISSUED', 'RETURNED');

CREATE TABLE item_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items(id) ON DELETE RESTRICTED,
    issued_to UUID NOT NULL REFERENCES staff(id),
    issued_by UUID NOT NULL REFERENCES staff(id),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE,
    actual_returned_date DATE,
    quantity INTEGER NOT NULL DEFAULT 1,
    note TEXT,
    status item_issue_status_enum NOT NULL DEFAULT 'ISSUED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE item_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_item_issues ON item_issues
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Issue Item (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/inventory/items/issue`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted`
- **Payload**:
```json
{
  "itemId": "a1b2c3d4-1111-2222-3333-444455556666",
  "issuedTo": "e5f6a7b8-9004-0000-0000-000000000000",
  "issueDate": "2026-09-28",
  "returnDate": "2026-09-30",
  "quantity": 2,
  "note": "Classroom presentation delivery"
}
```

#### 2. Return Item (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/inventory/items/issues/{issueId}/return`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted`
- **Payload**:
```json
{
  "actualReturnedDate": "2026-09-30",
  "conditionNote": "Returned in functional order."
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.inventory.item-issued`
- **Partition Key**: `{branchId}#{itemId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "d1e2f3a4-5b6c-7890-1234-567890abcdef",
    "eventType": "school.inventory.item-issued",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T13:15:00.000Z",
    "correlationId": "a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    "version": "1.0.0"
  },
  "payload": {
    "issueId": "f1e2d3c4-4444-5555-6666-777788889999",
    "itemId": "a1b2c3d4-1111-2222-3333-444455556666",
    "itemName": "Class Board",
    "quantityIssued": 2,
    "remainingAvailableQty": 278,
    "issuedTo": "James Deckar (9004)"
  }
}
```
