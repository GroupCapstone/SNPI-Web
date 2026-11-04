---
name: smart-school-library-api
description: Authoritative Core REST API specification, DTO schemas, Flyway DDL migration, and Kafka CloudEvents topology for the Library & Media Circulation subsystem under operations-hub-service (:8087). Trigger on: "library api", "library cor api", "library rest api", "book issue api", "book return api", "library members api".
---

# Library Core REST API Specification & Service Contract
## Subsystem: `operations-hub-service` (Port :8087, Context: `/api/v1/library`)

### Executive Overview & Architectural Responsibility

The **Library Core API** powers media accession, catalog searching, member account lifecycle, circulation desk transactions (Book Issue, Book Return, Overdue Fine settlement), and physical inventory auditing across the Smart School platform.

All transactions strictly enforce:
1. **Neon PostgreSQL Row-Level Security (RLS)**: Enforces `branch_id = current_setting('app.current_branch_id')`.
2. **Spring Boot 3 Virtual Threads**: Non-blocking IO execution across high-velocity circulation desks.
3. **Atomic Inventory Counters**: Enforces `available_qty = total_quantity - (active_issued_copies)` with database-level row-locking (`SELECT ... FOR UPDATE`) during checkout.
4. **Synchronous-to-Asynchronous Kafka Dispatch**: Broadcasts CloudEvents to `school.events.library.*` for parent notifications and overdue alerts.

---

## 1. Database Schema & Flyway DDL Migration (`V1__init_library_schema.sql`)

```sql
-- 1. Books Catalog Table
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    book_no VARCHAR(100) NOT NULL,
    isbn VARCHAR(100),
    publisher VARCHAR(255),
    author VARCHAR(255),
    subject_id UUID,
    subject_name VARCHAR(255),
    rack_no VARCHAR(100),
    total_quantity INT NOT NULL DEFAULT 1,
    available_qty INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10, 2) DEFAULT 0.00,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_book_no UNIQUE (branch_id, book_no),
    CONSTRAINT chk_positive_qty CHECK (total_quantity >= 0 AND available_qty >= 0 AND available_qty <= total_quantity)
);

-- 2. Library Members Registry Table
CREATE TABLE IF NOT EXISTS library_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    member_type VARCHAR(20) NOT NULL, -- 'STUDENT' or 'STAFF'
    student_id UUID NULL,
    staff_id UUID NULL,
    library_card_no VARCHAR(100) NOT NULL,
    max_borrow_limit INT NOT NULL DEFAULT 3,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    enrolled_date DATE NOT NULL DEFAULT CURRENT_DATE,
    surrendered_date DATE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_library_card UNIQUE (branch_id, library_card_no),
    CONSTRAINT chk_member_reference CHECK (
        (member_type = 'STUDENT' AND student_id IS NOT NULL AND staff_id IS NULL) OR
        (member_type = 'STAFF' AND staff_id IS NOT NULL AND student_id IS NULL)
    )
);

-- 3. Book Circulation (Issue & Return) Table
CREATE TABLE IF NOT EXISTS book_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL,
    book_id UUID NOT NULL REFERENCES books(id),
    member_id UUID NOT NULL REFERENCES library_members(id),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE NULL,
    issue_status VARCHAR(20) NOT NULL DEFAULT 'ISSUED', -- 'ISSUED', 'RETURNED', 'OVERDUE', 'LOST'
    overdue_days INT NOT NULL DEFAULT 0,
    overdue_fine_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    fine_paid_status VARCHAR(20) NOT NULL DEFAULT 'NONE', -- 'NONE', 'PAID', 'WAIVED'
    fine_payment_reference VARCHAR(100) NULL,
    remarks TEXT,
    issued_by_staff_id UUID NOT NULL,
    received_by_staff_id UUID NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for Circulation Desk Performance
CREATE INDEX idx_books_branch_search ON books(branch_id, title, book_no, isbn) WHERE is_deleted = FALSE;
CREATE INDEX idx_library_members_branch_card ON library_members(branch_id, library_card_no) WHERE is_active = TRUE;
CREATE INDEX idx_book_issues_active ON book_issues(branch_id, member_id, issue_status) WHERE issue_status IN ('ISSUED', 'OVERDUE');
CREATE INDEX idx_book_issues_due_date ON book_issues(branch_id, due_date) WHERE issue_status = 'ISSUED';

-- PostgreSQL Row-Level Security Policies
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE books FORCE ROW LEVEL SECURITY;
CREATE POLICY rls_books ON books FOR ALL USING (
    current_setting('app.bypass_rls', true) = 'true' OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID
);

ALTER TABLE library_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_members FORCE ROW LEVEL SECURITY;
CREATE POLICY rls_library_members ON library_members FOR ALL USING (
    current_setting('app.bypass_rls', true) = 'true' OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID
);

ALTER TABLE book_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_issues FORCE ROW LEVEL SECURITY;
CREATE POLICY rls_book_issues ON book_issues FOR ALL USING (
    current_setting('app.bypass_rls', true) = 'true' OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::UUID
);
```

---

## 2. Core REST API Endpoints Specification

### 2.1. Search & Filter Book Catalog
- **HTTP Method**: `GET`
- **Path**: `/api/v1/library/books`
- **Security**: `LIBRARIAN`, `CAMPUS_ADMIN`, `SUPER_ADMIN`, `TEACHER`, `STUDENT`
- **Query Parameters**:
  - `keyword` (String, optional): Matches Title, Author, ISBN, or Book No
  - `subjectId` (UUID, optional): Filter by academic subject
  - `rackNo` (String, optional): Filter by physical shelf
  - `availableOnly` (Boolean, default `false`): If true, returns only books where `available_qty > 0`
  - `page` (Int, default `0`), `size` (Int, default `50`)

#### Response Envelope (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Books catalog retrieved successfully",
  "timestamp": "2026-09-12T07:00:00.100Z",
  "trackingId": "REQ-LIB-9012-AA",
  "data": [
    {
      "id": "b71a8901-4c2d-4e5f-9a12-89b123456789",
      "title": "Mathematics Activity Book Class 1",
      "bookNo": "B001-8921",
      "isbn": "978-93-89021-12",
      "author": "R.K. Sharma",
      "publisher": "Oxford University Press",
      "subjectName": "Mathematics",
      "rackNo": "RACK-2A",
      "totalQuantity": 50,
      "availableQuantity": 48,
      "unitPrice": 12.50,
      "postDate": "2026-08-15"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 50,
    "totalElements": 1,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

### 2.2. Add New Book Accession Record
- **HTTP Method**: `POST`
- **Path**: `/api/v1/library/books`
- **Security**: `LIBRARIAN`, `CAMPUS_ADMIN`, `SUPER_ADMIN`
- **Description**: Creates a new book title in the campus library. Sets `available_qty = total_quantity`.

#### Request Body
```json
{
  "title": "Social & Political Life",
  "bookNo": "B002-4563",
  "isbn": "978-01-98745-01",
  "author": "David Wilson",
  "publisher": "NCERT",
  "subjectId": "8f2a1b45-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
  "subjectName": "Social Science",
  "rackNo": "RACK-04B",
  "totalQuantity": 40,
  "unitPrice": 18.00,
  "description": "Standard curriculum text for middle school"
}
```

#### Response Body (`201 Created`)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Book title accessioned successfully",
  "data": {
    "id": "c92b8902-5d3e-4f6a-0b23-90c234567890",
    "bookNo": "B002-4563",
    "title": "Social & Political Life",
    "availableQuantity": 40,
    "rackNo": "RACK-04B"
  }
}
```

---

### 2.3. Member Lookup & Active Borrowing Ledger
- **HTTP Method**: `GET`
- **Path**: `/api/v1/library/members/{cardNo}/dossier`
- **Security**: `LIBRARIAN`, `CAMPUS_ADMIN`, `SUPER_ADMIN`
- **Description**: Returns member credentials, active borrowing count, borrow limit, and currently unreturned books.

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "memberId": "m-89012-uuid",
    "libraryCardNo": "LIB-18001",
    "memberType": "STUDENT",
    "personName": "Edward Thomas",
    "admissionNo": "18001",
    "className": "Class 1",
    "sectionName": "A",
    "maxBorrowLimit": 3,
    "activeBorrowCount": 1,
    "canBorrowMore": true,
    "activeLoans": [
      {
        "issueId": "iss-89214-uuid",
        "bookId": "b71a8901-4c2d-4e5f-9a12-89b123456789",
        "bookTitle": "Mathematics Activity Book Class 1",
        "bookNo": "B001-8921",
        "issueDate": "2026-09-01",
        "dueDate": "2026-09-15",
        "overdueDays": 0,
        "accruedFine": 0.00,
        "status": "ISSUED"
      }
    ]
  }
}
```

---

### 2.4. Issue Book to Member (Atomic Checkout)
- **HTTP Method**: `POST`
- **Path**: `/api/v1/library/circulation/issue`
- **Security**: `LIBRARIAN`, `CAMPUS_ADMIN`
- **Concurrency Protection**: Obtains a pessimistic database lock on the `books` row (`SELECT available_qty FROM books WHERE id = ? FOR UPDATE`). Decrements `available_qty` by 1.
- **Validation**:
  - Checks if `available_qty > 0` (otherwise returns `422 Unprocessable: BOOK_OUT_OF_STOCK`).
  - Checks if member active loans `< max_borrow_limit` (otherwise returns `422 Unprocessable: BORROW_LIMIT_EXCEEDED`).
  - Checks if member has unreturned books overdue by > 14 days.

#### Request Body
```json
{
  "memberId": "m-89012-uuid",
  "bookId": "c92b8902-5d3e-4f6a-0b23-90c234567890",
  "issueDate": "2026-09-12",
  "dueDate": "2026-09-26",
  "remarks": "Issued for term project"
}
```

#### Response Body (`201 Created`)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Book issued successfully. Stock updated.",
  "data": {
    "issueId": "iss-99124-uuid",
    "bookTitle": "Social & Political Life",
    "bookNo": "B002-4563",
    "memberCardNo": "LIB-18001",
    "dueDate": "2026-09-26",
    "remainingAvailableCopies": 39
  }
}
```

---

### 2.5. Return Book & Settle Fines
- **HTTP Method**: `POST`
- **Path**: `/api/v1/library/circulation/return`
- **Security**: `LIBRARIAN`, `CAMPUS_ADMIN`
- **Description**: Marks the loan as returned, increments `available_qty` on the book record, calculates overdue fine if returned past `due_date`, and optionally records fine settlement.

#### Request Body
```json
{
  "issueId": "iss-89214-uuid",
  "returnDate": "2026-09-18",
  "isDamaged": false,
  "fineAmountCollected": 3.00,
  "finePaymentMode": "CASH",
  "fineRemarks": "3 days overdue, paid at counter"
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Book returned successfully. Stock restored.",
  "data": {
    "issueId": "iss-89214-uuid",
    "bookNo": "B001-8921",
    "overdueDays": 3,
    "fineAssessed": 3.00,
    "fineStatus": "PAID",
    "availableQuantityNow": 49
  }
}
```

---

### 2.6. Asynchronous Bulk Book Import (Directive 02 Bridge)
- **HTTP Method**: `POST`
- **Path**: `/api/v1/library/books/import-csv`
- **Security**: `CAMPUS_ADMIN`, `SUPER_ADMIN`
- **Content-Type**: `multipart/form-data`
- **Response**: `202 Accepted` with a tracking ID; processes catalog indexing in background via Kafka worker.

#### Response Body (`202 Accepted`)
```json
{
  "success": true,
  "statusCode": 202,
  "message": "Bulk book accession batch accepted and processing in background",
  "data": {
    "batchId": "BATCH-LIB-202609-0012",
    "status": "PROCESSING",
    "estimatedRecords": 450,
    "statusCheckUrl": "/api/v1/library/books/import-status/BATCH-LIB-202609-0012"
  }
}
```

---

## 3. Asynchronous Kafka CloudEvents Topology

| Kafka Topic | CloudEvent `type` | Producer | Consumers | Payload Schema |
|:---|:---|:---|:---|:---|
| `school.events.library` | `school.library.book-issued` | `operations-hub-service` | `attendance-msg-service` | `{ "branchId": "...", "memberId": "...", "bookTitle": "...", "dueDate": "2026-09-26" }` |
| `school.events.library` | `school.library.book-returned` | `operations-hub-service` | `attendance-msg-service` | `{ "branchId": "...", "issueId": "...", "returnDate": "2026-09-18", "fineAmount": 3.00 }` |
| `school.events.library` | `school.library.overdue-alert` | Cron Scheduler (:8087) | In-App / SMS Worker | `{ "branchId": "...", "memberId": "...", "bookTitle": "...", "daysLate": 3, "fineDue": 3.00 }` |

---

## 4. Architectural Checklist

- [x] Strict Zero Emoji Policy enforced across all schemas, messages, and DTOs.
- [x] Multi-tenant isolation guaranteed via PostgreSQL RLS on `books`, `library_members`, and `book_issues`.
- [x] Pessimistic lock (`FOR UPDATE`) eliminates race conditions during simultaneous book checkout.
- [x] Directive 02 Synchronous-to-Asynchronous Bridge implemented for bulk CSV ingest (`202 Accepted`).
