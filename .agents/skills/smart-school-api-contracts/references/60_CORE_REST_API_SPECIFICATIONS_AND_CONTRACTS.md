---
name: smart-school-api-contracts
description: Authoritative REST API specification, OpenAPI 3.0 contracts, JSON request/response DTOs, HTTP status codes, and endpoint documentation for the Smart School Enterprise Core Microservices. Covers Auth & Tenancy, Academic Students, Daily Attendance, Finance & Fees, and Assessment Exams. Trigger on: "api", "rest api", "api contracts", "openapi spec", "endpoint documentation", "request response dtos", "http status codes", "swagger spec".
---

# Core REST API Specifications & Contracts Standard
## Smart School Enterprise Platform (Spring Boot 3 & OpenAPI 3.0)

### Executive Overview & API Governance

The **Smart School REST API** serves as the unified programmatic interface across web portals (Super Admin, Campus Dean, Teacher, Accountant, Receptionist, Librarian, Student, Parent), the Public Front Site (`PUBLIC_CMS`), and future native mobile applications.

All endpoints adhere to **RESTful design principles**, JSON payloads, RFC 7807 problem details, and strict multi-tenant authorization headers.

---

## 1. Global API Standards & Request Headers

### Mandatory Request Headers

```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
X-Branch-ID: c4b8e21a-9f12-4a7b-8912-3a5e89d12345
X-Request-ID: REQ-8942-XF
Content-Type: application/json
Accept: application/json
```

### Standardized Response Envelope (RFC 7807 Compliant)

All successful and paginated responses use the universal response schema:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "timestamp": "2026-09-12T06:55:00.124Z",
  "trackingId": "REQ-8942-XF",
  "data": { ... },
  "pagination": {
    "page": 0,
    "size": 50,
    "totalElements": 482,
    "totalPages": 10,
    "hasMore": true
  }
}
```

### Error Response Envelope

```json
{
  "success": false,
  "statusCode": 400,
  "error": "BAD_REQUEST",
  "message": "Validation failed on 2 fields",
  "timestamp": "2026-09-12T06:55:00.124Z",
  "trackingId": "REQ-8942-XF",
  "errors": [
    { "field": "phone", "message": "Invalid telephone format" },
    { "field": "dueDate", "message": "Due date cannot be in the past" }
  ]
}
```

---

## 2. Service 1: `auth-tenant-service` Endpoints

### 2.1. User Login & Token Generation
- **Endpoint**: `POST /api/v1/auth/login`
- **Security**: Public Ingress (Rate-limited via Redis sliding window)
- **Description**: Authenticates user credentials, validates multi-tenant active status, and returns JWT tokens with role entitlements.

#### Request Body
```json
{
  "username": "dean.black@mountcarmel.edu",
  "password": "SecurePassword123!",
  "branchCode": "MC-CAMPUS-01"
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Authentication successful",
  "data": {
    "accessToken": "eyJhbGciOiJSUzI1NiIsIn...",
    "refreshToken": "eyJhbGciOiJSUzI1NiIsIn...",
    "expiresIn": 3600,
    "tokenType": "Bearer",
    "user": {
      "id": "u-9000",
      "username": "dean.black@mountcarmel.edu",
      "fullName": "Joe Black",
      "role": "CAMPUS_ADMIN",
      "branchId": "c4b8e21a-9f12-4a7b-8912-3a5e89d12345",
      "branchName": "Mount Carmel High School - Main Campus",
      "currency": "USD",
      "permissions": [
        "STUDENT_VIEW", "STUDENT_CREATE", "STUDENT_EDIT",
        "FEES_VIEW", "FEES_COLLECT", "PAYROLL_RUN",
        "ATTENDANCE_VIEW", "ATTENDANCE_APPROVE"
      ]
    }
  }
}
```

### 2.2. Branch Directory & Context Switch
- **Endpoint**: `GET /api/v1/tenants/branches`
- **Security**: Requires `SUPER_ADMIN` (Returns all branches) or `CAMPUS_ADMIN` (Returns own branch)
- **Response**: List of active campus branches with currency and timezone metadata.

---

## 3. Service 2: `academic-core-service` Endpoints

### 3.1. Filter Student Directory
- **Endpoint**: `GET /api/v1/students`
- **Security**: `SUPER_ADMIN`, `CAMPUS_ADMIN`, `TEACHER`, `ACCOUNTANT`, `RECEPTIONIST`
- **Query Parameters**:
  - `classId` (UUID, optional)
  - `sectionId` (UUID, optional)
  - `keyword` (String, optional: Name, Roll No, National ID)
  - `page` (Int, default 0)
  - `size` (Int, default 50)

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "e82b79a1-5d32-4e6f-b124-789a45c12345",
      "admissionNo": "18001",
      "rollNumber": "01",
      "fullName": "Edward Thomas",
      "className": "Class 1",
      "sectionName": "A",
      "fatherName": "Olivier Thomas",
      "gender": "Male",
      "dateOfBirth": "2018-05-14",
      "mobileNumber": "+189562423934",
      "photoUrl": "https://s3.amazonaws.com/smartschool/students/18001.jpg",
      "status": "ACTIVE"
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

### 3.2. 360-Degree Student Dossier
- **Endpoint**: `GET /api/v1/students/{id}/dossier`
- **Security**: Scoped by RLS (Staff or Student self/guardian)
- **Response**: Aggregated profile including academic history, attendance percentage, pending fees, and uploaded documents.

---

## 4. Service 3: `attendance-msg-service` Endpoints

### 4.1. Load Daily Attendance Roster
- **Endpoint**: `GET /api/v1/attendance/roster`
- **Security**: `TEACHER`, `CAMPUS_ADMIN`, `SUPER_ADMIN`
- **Query Parameters**: `classId` (UUID), `sectionId` (UUID), `date` (YYYY-MM-DD)

### 4.2. Atomic Batch Attendance Submission
- **Endpoint**: `POST /api/v1/attendance/batch-save`
- **Security**: `TEACHER`, `CAMPUS_ADMIN`
- **Description**: Atomic submission of attendance for up to 50 students. Immediately fires Kafka absent alerts.

#### Request Body
```json
{
  "classId": "7a3f8921-1b2c-4d5e-89a1-bc4567890123",
  "sectionId": "9c1e2345-2f3a-4b5c-9d8e-ef1234567890",
  "attendanceDate": "2026-09-12",
  "records": [
    { "studentId": "e82b79a1-5d32-4e6f-b124-789a45c12345", "status": "PRESENT", "remarks": "" },
    { "studentId": "b14c89a2-4e31-4a7f-9b21-45a789c12345", "status": "ABSENT", "remarks": "Fever reported" }
  ]
}
```

#### Response Body (`200 OK`)
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Attendance recorded for 2 students. 1 absence notification dispatched to Kafka.",
  "data": {
    "totalProcessed": 2,
    "presentCount": 1,
    "absentCount": 1,
    "lateCount": 0
  }
}
```

---

## 5. Service 4: `finance-ledger-service` Endpoints

### 5.1. Student Fee Ledger Lookup
- **Endpoint**: `GET /api/v1/finance/student-ledger/{studentId}`
- **Security**: `ACCOUNTANT`, `CAMPUS_ADMIN`, `STUDENT` (Self), `PARENT` (Ward)
- **Response**: Itemized fee breakdown (Tuition, Transport, Hostel), concessions applied, payments made, and net due.

### 5.2. POS Counter Fee Collection
- **Endpoint**: `POST /api/v1/finance/collect-fee`
- **Security**: `ACCOUNTANT`, `SUPER_ADMIN`
- **Description**: Records payment and generates thermal receipt payload.

#### Request Body
```json
{
  "studentId": "e82b79a1-5d32-4e6f-b124-789a45c12345",
  "invoiceId": "INV-2026-09-00124",
  "amountPaid": 450.00,
  "paymentMode": "CASH",
  "referenceNumber": "POS-REC-8921",
  "collectedDate": "2026-09-12",
  "printThermalReceipt": true
}
```

#### Response Body (`201 Created`)
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Payment recorded successfully",
  "data": {
    "receiptNumber": "REC-2026-09-00452",
    "amountPaid": 450.00,
    "remainingBalance": 0.00,
    "receiptPdfUrl": "https://s3.amazonaws.com/smartschool/receipts/REC-2026-09-00452.pdf"
  }
}
```

---

## 6. Service 5: `assessment-exam-service` Endpoints

### 6.1. Batch Exam Marks Entry
- **Endpoint**: `POST /api/v1/exams/marks/batch-entry`
- **Security**: `TEACHER`, `CAMPUS_ADMIN`
- **Description**: Batch entry of marks (Theory, Practical, Viva) for an exam schedule.

#### Request Body
```json
{
  "examScheduleId": "f93e1245-8a2b-4c5d-9e12-3a5e89d12345",
  "marks": [
    {
      "studentId": "e82b79a1-5d32-4e6f-b124-789a45c12345",
      "theoryMarks": 75.50,
      "practicalMarks": 18.00,
      "vivaMarks": 5.00,
      "isAbsent": false,
      "remarks": "Excellent analysis"
    }
  ]
}
```

### 6.2. Trigger Asynchronous Bulk Admit Cards
- **Endpoint**: `POST /api/v1/exams/admit-cards/bulk-generate`
- **Security**: `CAMPUS_ADMIN`, `SUPER_ADMIN`
- **Description**: Starts an async Kafka batch job rendering vector PDFs for all students in a class cohort.

#### Response Body (`202 Accepted`)
```json
{
  "success": true,
  "statusCode": 202,
  "message": "Bulk admit card generation job accepted and running in background",
  "data": {
    "jobId": "JOB-ADMIT-2026-8912",
    "status": "PROCESSING",
    "totalCohort": 140,
    "websocketTopic": "/topic/assessment-jobs/JOB-ADMIT-2026-8912"
  }
}
```

---

## 7. HTTP Status Codes & Error Conventions

| HTTP Status | Standard Meaning | Architectural Usage |
|:---|:---|:---|
| `200 OK` | Request succeeded | Standard queries, profile lookups, rosters. |
| `201 Created` | Resource created | Student enrollment, payment receipt, class creation. |
| `202 Accepted` | Async job accepted | Bulk admit card PDF, auto-invoicing, payroll runs. |
| `400 Bad Request` | Validation failure | Missing required fields, invalid date formats. |
| `401 Unauthorized` | Invalid/expired JWT | Expired bearer token, invalid credentials. |
| `403 Forbidden` | RBAC / Tenant violation | Teacher accessing finance, or cross-branch data access. |
| `404 Not Found` | Entity missing | Student ID or Invoice ID not found. |
| `409 Conflict` | Unique key violation | Duplicate Admission No, Roll No, or Fee Code. |
| `422 Unprocessable`| Semantic domain failure | Overpaying an invoice, assigning student to full bus. |

---

## 8. Verification & OpenAPI Export

- [x] All 7 core service endpoints standardized with DTO schemas.
- [x] Zero Emoji Policy strictly maintained in API responses and documentation.
- [x] RFC 7807 problem details implemented for client-side error handling.
- [x] Directive 02 Synchronous-to-Asynchronous Bridge verified with `202 Accepted`.
