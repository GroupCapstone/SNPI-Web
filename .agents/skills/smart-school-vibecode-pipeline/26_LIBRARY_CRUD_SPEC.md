# Module 26: Library CRUD Architecture & Circulation Management Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Library** module orchestrates the complete book inventory, physical cataloging (ISBN, Book Number, Rack Number, Publisher, Author), member registry (Students and Staff), circulation desk operations (Book Issue, Book Return, Due Date enforcement, and Overdue Fine calculation), and membership card lifecycle. It provides library administrators with a unified circulation engine where member accounts are linked to student and staff master profiles, with real-time stock counters (`Qty` vs. `Available`) and visual status highlighting (soft pastel green for enrolled members).

- **Module Index**: `26`
- **Legacy Route Base**: `/admin/book`, `/admin/member`
- **Modern Component Root**: `/super-admin/library`
- **Functional Domain**: `Media Circulation, Inventory Tracking & Library Membership`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Ingress & Circulation Bridge**: Book issue and return operations strictly follow Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/library/issues` and `POST /api/v1/library/returns` return `HTTP 202 Accepted` with a `trackingId`, updating real-time book availability counters and buffering notifications to Kafka topic `school.library.book-issued` and `school.library.book-returned`).
- **Circulation Physics**:
  - `Available = Qty - (Active Issued Books)`.
  - When `Available == 0`, the system automatically suppresses the issue button and flags the title as out-of-stock.
  - Active member rows are highlighted in soft pastel green (`rgba(76, 175, 80, 0.15)`), while non-members remain white with an enrollment trigger (`+`).

---

### Complete Slug Inventory & Route Mapping

The Library module comprises **4 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `book-list` | `/admin/book` | `/super-admin/library/books` | Full-Width Master Ledger | `books` | `+ Add Book`, Search/Filter, Edit Book, Delete Book, Track Qty vs. Available |
| **02** | `issue-return` | `/admin/member` | `/super-admin/library/issue-return` | Circulation Hub Ledger | `library_members` | Search Member, Enter Member Circulation Desk, Issue Book, Return Book, Settle Fines |
| **03** | `add-student` | `/admin/member/student` | `/super-admin/library/members/student` | Criteria Search + Member Grid | `students` / `library_members` | Filter Class/Section, Assign Library Card No, Surrender Membership |
| **04** | `add-staff-member` | `/admin/member/staff` | `/super-admin/library/members/staff` | Dual-State Status Table | `staff` / `library_members` | Enroll Staff (`+`), Surrender Card (`undo`), Green/White Visual Audit |

---

### 1. Slug `book-list`: Catalog Inventory & Acquisition Desk

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Book List`
- **Active Navigation**: `Library` -> `Book List` (Route: `/admin/book`)
- **Top Right Action Button**:
  - `+ Add Book`: Solid purple tactile button (`#8E24AA`) with plus glyph, opens comprehensive cataloging modal.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`
- **Master Data Table Schema (`books`)**:

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Book Title** | `title` | `VARCHAR(255)` | Sortable book title. | `संसार पुस्तक है।`, `Maths Activity Book Class 1`, `English Grammar for Beginners`, `Respiration in Organisms`, `The Valley of Flowers`, `Wonderful Adventures of Nils`, `Electricity & Circuits`, `चंद्र गहना से लौटती बेर`, `Hindi Vyakaran`, `Mathematics`, `Environmental Studies (EVS)`, `English Reader`, `Social & Political Life`, `Basic Geometrical Ideas`. |
| **Description** | `description` | `TEXT` | Sortable notes or `No Description`. | `No Description`, `Maths Activity Book Class 1`, `English Reader`. |
| **Book Number** | `book_no` | `VARCHAR(100)` | Sortable accession / barcode number. | `878`, `765`, `4376`, `123`, `65563`, `B001`, `857`, `575`, `53453`, `544`, `4563`, `3465`, `9864`, `65545`, `4344`, `67897`, `789567`, `56433`, `34222`, `889685`. |
| **ISBN Number** | `isbn` | `VARCHAR(100)` | Sortable standard book number. | `546`, `87786`, `563`, `BRT0-890907`, `B002`, `978-93`, `BXC-9-90789`, `FSDS9087`, `DER900806`, `FG-08908`, `DA099886`, `FSD87865`, `VBGD0-9-90-76`, `FWSE56564`. |
| **Publisher** | `publisher` | `VARCHAR(255)` | Sortable publishing house name. | `Yogesh`, `s.r.k`, `S.K Publisher`, `NCERT`, `Oxford Publications`, `D.S Publisher`, `D.K. Publisher`, `Sk. Publisher`. |
| **Author** | `author` | `VARCHAR(255)` | Sortable primary author name. | `Hunny`, `jhon`, `John Wilson`, `S. Verma`, `R.K. Sharma`, `Robert`, `Laura`, `Martin Wilson`, `Suresh Kumar`, `Harish Vardhan`, `David Wilson`. |
| **Subject** | `subject_name` | `VARCHAR(255)` | Sortable curriculum subject classification. | `Hindi`, `Maths`, `Mathematics`, `English`, `hindi`, `Environmental`, `Social Science`, `Science`. |
| **Rack Number** | `rack_no` | `VARCHAR(100)` | Sortable physical shelf/aisle code. | `987`, `23`, `2`, `234`, `565`, `6587`, `786`, `7845`, `1234`, `6534`, `756`, `4545`, `57574`, `567574`, `89875`, `34522`, `342188`. |
| **Qty** | `total_quantity`| `INTEGER` | Sortable total physical copies purchased. | `20`, `0`, `100`, `50`, `40`, `35`, `80`, `90`, `100`. |
| **Available** | `available_qty` | `INTEGER` | Sortable available copies on shelf. | `20`, `0`, `100`, `50`, `49`, `40`, `35`, `77`, `86`, `88`, `48`, `91`, `79`, `89`, `90`, `70`. |
| **Book Price** | `price` | `NUMERIC(10, 2)`| Sortable currency formatted `$#,##0.00`. | `$100.00`, `$299.00`, `$45.00`, `$50.00`, `$150.00`, `$200.00`, `$300.00`, `$250.00`, `$120.00`, `$80.00`. |
| **Post Date** | `post_date` | `DATE` | Sortable intake date formatted `MM/DD/YYYY`. | `04/30/2026`, `04/08/2026`, `04/03/2026`, `04/01/2026`, `03/14/2026`, `03/20/2026`, `03/03/2026`, `03/25/2026`, `02/23/2026`, `01/20/2026`, `12/15/2025`. |
| **Action** | *Controls* | `ACTIONS` | Dual purple tactile buttons per row:<br>1. **Edit** (`edit` pencil glyph)<br>2. **Delete** (`delete` trash glyph). | Both triggers rendered on every row. |

#### B. `+ Add Book` Modal Schema
| Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Book Title \*** | `title` | `TEXT_INPUT` | Required full book title. |
| **Book Number \*** | `book_no` | `TEXT_INPUT` | Unique accession / inventory barcode. |
| **ISBN Number** | `isbn` | `TEXT_INPUT` | Optional international standard book number. |
| **Publisher** | `publisher` | `TEXT_INPUT` | Publishing company name. |
| **Author** | `author` | `TEXT_INPUT` | Author / editor name. |
| **Subject** | `subject_id` | `SELECT_DROPDOWN` | Academic subject binding. |
| **Rack Number** | `rack_no` | `TEXT_INPUT` | Physical warehouse / shelf location. |
| **Quantity \*** | `total_quantity`| `NUMERIC_INPUT` | Total physical copies added to stock. |
| **Book Price** | `price` | `NUMERIC_INPUT` | Unit replacement valuation. |
| **Post Date \*** | `post_date` | `DATEPICKER` | Catalog intake date (defaults to current date). |
| **Description** | `description` | `TEXTAREA` | Summary, edition, or condition notes. |

---

### 2. Slug `issue-return`: Member Circulation Desk & Loan Ledger

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Members`
- **Active Navigation**: `Library` -> `Issue - Return` (Route: `/admin/member`)
- **Controls**: Search text input, page size `50`, export suite (Copy, Excel, CSV, PDF, Print, Column visibility).
- **Master Data Table Schema (`library_members`)**:

| Column Header | Field Name | Data Type | Rendering & Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Member ID** | `member_id` | `INTEGER` | Sortable sequential library card ID. | `7`, `8`, `9`, `10`, `11`, `14`, `15`, `16`, `17`, `18`, `19`, `20`, `21`, `22`, `23`, `24`, `25`, `26`, `27`, `28`, `29`, `32`. |
| **Library Card No.**| `card_no` | `VARCHAR(100)` | Sortable barcode / RFID card identifier. | `00L3`, `01L5`, `00185`, `0101`, `12W`, `001L`, `102L`, `100`, `00120`, `210`, `254`, `695`, `987`, `845`, `231`, `654`, `45`, `675`, `00125`, `0021`, `321`, `362`. |
| **Admission No** | `admission_no` | `VARCHAR(100)` | Sortable student admission number (empty for staff). | `18002`, `18005`, `18007`, `18004`, `18023`, `18020`, `18025`, `18008`, `18014`, `18009`, `18029`, `18028`, `18010`, `18006`, `18003`, `18056`, `18095`, `18012`, `18077`, `18080`, `110025`, `18097`. |
| **Name** | `member_name` | `VARCHAR(255)` | Sortable full patron name. | `Robin Peterson`, `Glen Stark`, `Brian Kohlar`, `Laura Clinton`, `Karuna Rana`, `Jhony Taylor`, `Jhonson wood`, `David Heart`, `Devin Coinneach`, `Kavya Roy`, `Rahul Sinha`, `Kriti Singh`, `Simon Peterson`, `Nicolas Fleming`, `Steffan Crown`, `Eliyana Jon`, `Emma Thomas`, `Dharambir Singh`, `Oziva Heli`, `Arun Thomas`, `George Jeny Sharon`. |
| **Member Type** | `member_type` | `VARCHAR(50)` | Sortable patron type (`Student` vs. `Staff`). | `Student` (across all 21 screen records shown). |
| **Phone** | `phone` | `VARCHAR(50)` | Sortable contact phone number. | `946545445`, `9658471234`, `946545445`, `544545454`, `7412589630`, `67878878`, `8776889879`, `645646544`, `7896541230`, `9874561321`, `6985471230`, `7418529630`, `165465415`. |
| **Action** | *Controls* | `ACTIONS` | Single purple tactile button with right arrow enter glyph (`assignment_return` / `login`). | Clicking launches member circulation desk. |

#### B. Member Circulation Desk Sub-Modal Workflow
When the action button is clicked, the system renders the **Member Circulation Workspace**:
1. **Patron Header Card**: Displays Member Photo, Library Card No, Admission/Staff No, Class/Department, and Total Active Loans.
2. **Issue Book Form**:
   - `Select Book`: Searchable dropdown/combobox (searches by Book Title, Book Number, or ISBN). Only displays titles where `available_qty > 0`.
   - `Due Date`: Datepicker pre-populated based on system loan duration policy (e.g. 14 days for students, 30 days for faculty).
   - `Issue Book` button: Deducts 1 from `available_qty` and records entry in `book_issues`.
3. **Active Loans Table**:
   - Columns: `Book Title`, `Book Number`, `Issue Date`, `Due Date`, `Return Date`, `Overdue Days`, `Fine Amount ($)`, `Action`.
   - Actions: **Return Book** (marks returned, increments `available_qty`, prompts fine settlement if overdue).

---

### 3. Slug `add-student`: Student Library Membership Provisioning

#### A. Screen Architecture & Visual Layout
- **Top Criteria Filter Card**:
  - `Class *`: Required dropdown selector with purple focus outline (`rgba(142, 36, 170, 0.6)`), placeholder `Select`.
  - `Section`: Optional dropdown selector, placeholder `Select`.
  - `Search` button: Solid purple tactile button (`#8E24AA`) with magnifying glass icon.
- **Student Membership Roster Table**:
  - Renders class cohort with columns: `Admission No`, `Student Name`, `Class`, `Date Of Birth`, `Gender`, `Mobile Number`, `Library Card No.`, `Action`.
  - Action Physics:
    - If student is **Not Enrolled**: Card number is blank; Action button is `+ Add Membership` (opens modal to issue library card).
    - If student is **Enrolled**: Card number is shown; Action button is `Surrender Membership` (revokes card and frees ID).

---

### 4. Slug `add-staff-member`: Faculty Library Membership & Dual-State Audit

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Staff Member List`
- **Active Navigation**: `Library` -> `Add Staff Member` (Route: `/admin/member/staff`)
- **Controls**: Search text input field, page size `50`, export suite (Copy, Excel, CSV, PDF, Print, Column visibility).
- **Dual-State Visual Highlighting Matrix**:
  - **Enrolled Active Members**: Rendered with a distinctive soft pastel green background (`rgba(76, 175, 80, 0.15)`). Member ID and Library Card No are populated.
  - **Unenrolled Staff**: Rendered with clean white background. Member ID and Library Card No are empty.

#### B. Master Data Table Schema & Ground Truth Records

| Row Index | Member ID | Library Card No. | Staff Name | Email | Date Of Birth | Phone | Action Button Glyph & Action | Row Background State |
|:---:|:---|:---|:---|:---|:---|:---|:---|:---|
| **1** | `31` | `453` | `Joe Black (9000)` | `superadmin@gmail.com` | `01/01/1988` | `6545645645` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **2** | `2` | `00156` | `Shivam Verma (9002)` | `manisha@gmail.com` | `06/18/1982` | `9552654564` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **3** | `3` | `00146` | `Brandon Heart (9006)` | `brandon@gmail.com` | `03/04/1988` | `34564654` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **4** | *None* | *None* | `William Abbot (9003)` | `william@gmail.com` | `06/03/1982` | `56465465` | `+` / `person_add` (Enroll Staff) | **White** (Inactive) |
| **5** | `30` | `789` | `Jason Sharlton (90006)`| `jason@gmail.com` | `06/16/1980` | `46546654564` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **6** | `5` | `001758` | `James Deckar (9004)` | `james.deckar@gmail.com` | `10/01/1987` | `79786546463` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **7** | `4` | `00147` | `Maria Ford (9005)` | `maria.ford@gmail.com` | `02/10/1992` | `8521479630` | `undo` (Surrender Membership) | **Soft Green** (Active) |
| **8** | *None* | *None* | `Nishant Khare (1002)` | `nishant@gmail.com` | `12/11/2000` | `9865757657` | `+` / `person_add` (Enroll Staff) | **White** (Inactive) |
| **9** | *None* | *None* | `Aman Verma (654)` | `aman@gmail.com` | `01/14/2026` | *None* | `+` / `person_add` (Enroll Staff) | **White** (Inactive) |

- **Pagination & Footer**: `Showing 1 to 9 of 9 entries.` with `< [ 1 ] >`.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Book Catalog Master
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    book_no VARCHAR(100) NOT NULL,
    isbn VARCHAR(100),
    publisher VARCHAR(255),
    author VARCHAR(255),
    subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
    rack_no VARCHAR(100),
    total_quantity INTEGER NOT NULL DEFAULT 1,
    available_qty INTEGER NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_book_qty_positive CHECK (total_quantity >= 0),
    CONSTRAINT chk_book_avail_bounds CHECK (available_qty >= 0 AND available_qty <= total_quantity),
    CONSTRAINT uq_branch_book_no UNIQUE (branch_id, book_no)
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_books ON books
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Library Members Master
CREATE TYPE library_member_type_enum AS ENUM ('STUDENT', 'STAFF');

CREATE TABLE library_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    card_no VARCHAR(100) NOT NULL,
    member_type library_member_type_enum NOT NULL,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_library_card UNIQUE (branch_id, card_no),
    CONSTRAINT chk_member_polymorphic CHECK (
        (member_type = 'STUDENT' AND student_id IS NOT NULL AND staff_id IS NULL) OR
        (member_type = 'STAFF' AND staff_id IS NOT NULL AND student_id IS NULL)
    )
);

ALTER TABLE library_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_library_members ON library_members
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 3. Book Loans & Returns (Circulation)
CREATE TYPE book_issue_status_enum AS ENUM ('ISSUED', 'RETURNED', 'OVERDUE', 'LOST');

CREATE TABLE book_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    member_id UUID NOT NULL REFERENCES library_members(id) ON DELETE RESTRICTED,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE RESTRICTED,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    overdue_days INTEGER NOT NULL DEFAULT 0,
    fine_amount NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    fine_paid BOOLEAN NOT NULL DEFAULT FALSE,
    status book_issue_status_enum NOT NULL DEFAULT 'ISSUED',
    issued_by UUID NOT NULL REFERENCES staff(id),
    received_by UUID REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE book_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_book_issues ON book_issues
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Add Book to Catalog
- **Endpoint**: `POST /api/v1/library/books`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Payload**:
```json
{
  "title": "Mathematics",
  "bookNo": "9864",
  "isbn": "BXC-9-90789",
  "publisher": "D.K. Publisher",
  "author": "S. Verma",
  "subjectId": "a1b2c3d4-1111-2222-3333-444455556666",
  "rackNo": "6534",
  "quantity": 80,
  "price": 300.00,
  "postDate": "2026-02-21",
  "description": "Standard higher mathematics textbook."
}
```

#### 2. Issue Book to Member (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/library/issues`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Response**: `HTTP 202 Accepted`
- **Payload**:
```json
{
  "memberId": "f1e2d3c4-7777-8888-9999-000011112222",
  "bookId": "a1b2c3d4-5555-6666-7777-888899990000",
  "issueDate": "2026-09-12",
  "dueDate": "2026-09-26"
}
```

#### 3. Return Book & Settle Fine
- **Endpoint**: `POST /api/v1/library/issues/{issueId}/return`
- **Payload**:
```json
{
  "returnDate": "2026-09-15",
  "overdueFineAmount": 0.00,
  "isFinePaid": true,
  "conditionNote": "Book returned in pristine condition."
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.library.book-issued`
- **Partition Key**: `{branchId}#{memberId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "c1d2e3f4-5a6b-7890-1234-567890abcdef",
    "eventType": "school.library.book-issued",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T13:00:00.000Z",
    "correlationId": "f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    "version": "1.0.0"
  },
  "payload": {
    "issueId": "a1b2c3d4-8888-9999-0000-111122223333",
    "memberId": "f1e2d3c4-7777-8888-9999-000011112222",
    "bookId": "a1b2c3d4-5555-6666-7777-888899990000",
    "cardNo": "00L3",
    "bookTitle": "Mathematics",
    "dueDate": "2026-09-26",
    "remainingAvailableQty": 76
  }
}
```
