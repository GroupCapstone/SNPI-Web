---
name: smart-school-backend-services
description: Authoritative architecture, persistence layer, multi-tenant Row-Level Security (RLS) enforcement, and Spring Boot 3 Virtual Thread microservices specification for the Smart School Enterprise Platform. Covers the 7 core microservices, Kafka event streaming topologies, database connection interceptors, and Flyway migration standards. Trigger on: "backend services", "core microservices", "spring boot 3", "neon postgresql rls", "tenant connection interceptor", "microservice decomposition", "rest dtos", "flyway migrations".
---

# Core Microservices Architecture & Persistence Standard
## Smart School Enterprise Platform (Spring Boot 3 & Neon RLS)

### Executive Architectural Blueprint

The **Core Microservices Platform** implements a modern, high-throughput, event-driven backend architecture designed for multi-campus school districts and large enterprise educational networks.

Built on **Spring Boot 3.3.x** and **Java 21 Virtual Threads (Project Loom)**, the platform eliminates traditional thread-pool exhaustion bottlenecks during peak concurrency (e.g. morning 08:00 AM attendance roll bursts, term exam result publication, and mass fee collection days), while enforcing strict cryptographic and data boundary sovereignty via **Neon Serverless PostgreSQL Row-Level Security (RLS)**.

---

## 1. The 7 Core Microservices Decomposition

The platform decomposes the 11 functional domains into seven (7) sovereign microservices:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SMART SCHOOL MICROSERVICES CLUSTER                              │
├──────────────────────────┬──────────────────────┬──────────────────────────────────────┤
│ Microservice Name        │ Port / Context Path  │ Functional Responsibility & Scope    │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 1. auth-tenant-service   │ :8081 /api/v1/auth   │ Identity, Authentication, JWT Tokens,│
│                          │      /api/v1/tenants │ Multi-Branch Federation, RBAC Matrix.│
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 2. academic-core-service │ :8082 /api/v1/academic│ Classes, Sections, Subjects, Class-  │
│                          │      /api/v1/students│ rooms, Student 360 Dossiers, Roll.   │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 3. attendance-msg-service│ :8083 /api/v1/attend │ Daily Student Roll-Call, Biometric   │
│                          │      /api/v1/notify  │ QR Ingest, DLT SMS, SES Email Push.  │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 4. finance-ledger-service│ :8084 /api/v1/finance │ Fee Schedules, Auto Invoicing, POS   │
│                          │      /api/v1/fees    │ Cashier, Payment Gateways, Ledger.   │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 5. assessment-exam-service:8085 /api/v1/exams   │ 5 Grading Models, Exam Timetables,   │
│                          │      /api/v1/marks   │ Admit Cards, Bulk Marksheet PDFs.    │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 6. workforce-hr-service  │ :8086 /api/v1/staff  │ Staff Directory, Biometric Roll,     │
│                          │      /api/v1/payroll │ Automated Payroll, Leave Approvals.  │
├──────────────────────────┼──────────────────────┼──────────────────────────────────────┤
│ 7. operations-hub-service│ :8087 /api/v1/transit│ Transport Fleet & GPS, Hostel Rooms, │
│                          │      /api/v1/library │ Library Circulation, Visitor Passes. │
└──────────────────────────┴──────────────────────┴──────────────────────────────────────┘
```

---

## 2. Technology Stack & Runtime Specifications

```
  - Runtime Environment    : Java 21 LTS (Oracle OpenJDK / Eclipse Temurin)
  - Core Framework        : Spring Boot 3.3.4
  - Concurrency Model     : Virtual Threads enabled (spring.threads.virtual.enabled=true)
  - Security Framework    : Spring Security 6.3 + Nimbus Jose JWT (Stateless Bearer Tokens)
  - Persistence Engine    : Spring Data JPA / Hibernate 6.5 + Flyway Database Migrations
  - Primary Database      : Neon Serverless PostgreSQL 16 (Connection Pooling via HikariCP)
  - Caching & Rate Limit  : Redis 7.2 (Lettuce Driver, Sliding Window Token Bucket)
  - Event Streaming Bus   : Apache Kafka 3.7 (Canonical CloudEvents 1.0 JSON Payloads)
  - Document Store        : AWS S3 / MinIO (AES-256 Server-Side Encryption)
  - PDF Generation Engine : OpenPDF / Flying Saucer (Vector graphics rendering)
  - Observability         : Micrometer, Prometheus, OpenTelemetry, Grafana Tempo
```

---

## 3. Database Multi-Tenancy & Row-Level Security (RLS) Interceptor

Every incoming HTTP request carries a verified JWT token containing the `tenant_id` (`branch_id`), `user_id`, and `role`. 

A thread-local connection interceptor automatically injects these session variables into the PostgreSQL connection before any JPA query executes:

### A. Java Spring Boot Connection Hook (`TenantConnectionAspect.java`)

```java
package com.smartschool.core.security;

import jakarta.persistence.EntityManager;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Aspect
@Component
public class TenantConnectionAspect {

    private final EntityManager entityManager;

    public TenantConnectionAspect(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Before("@annotation(org.springframework.transaction.annotation.Transactional) || " +
            "execution(* org.springframework.data.repository.Repository+.*(..))")
    public void setTenantSessionVariables() {
        TenantContext context = TenantContextHolder.getContext();
        
        if (context.isSuperAdmin() && context.isBypassRls()) {
            entityManager.createNativeQuery("SET LOCAL app.bypass_rls = 'true'").executeUpdate();
        } else {
            entityManager.createNativeQuery("SET LOCAL app.bypass_rls = 'false'").executeUpdate();
            entityManager.createNativeQuery("SET LOCAL app.current_branch_id = :branchId")
                    .setParameter("branchId", context.getBranchId().toString())
                    .executeUpdate();
            entityManager.createNativeQuery("SET LOCAL app.current_user_id = :userId")
                    .setParameter("userId", context.getUserId().toString())
                    .executeUpdate();
            entityManager.createNativeQuery("SET LOCAL app.current_role = :role")
                    .setParameter("role", context.getRole())
                    .executeUpdate();
        }
    }
}
```

---

## 4. Canonical Kafka Event Envelope Standard

All asynchronous operations strictly adhere to Directive 02 (**Synchronous-to-Asynchronous Bridge**). Events dispatched to Kafka use the Canonical CloudEvent Envelope:

```json
{
  "specversion": "1.0",
  "id": "e82b79a1-5d32-4e6f-b124-789a45c12345",
  "source": "smartschool/finance-ledger-service",
  "type": "school.finance.auto-invoice-generated",
  "time": "2026-09-12T06:50:00Z",
  "datacontenttype": "application/json",
  "tenantid": "c4b8e21a-9f12-4a7b-8912-3a5e89d12345",
  "data": {
    "invoiceId": "INV-2026-09-00124",
    "studentId": "e82b79a1-5d32-4e6f-b124-789a45c12345",
    "netPayable": 450.00,
    "dueDate": "2026-09-25",
    "parentPhone": "+189562423934",
    "parentEmail": "parent.test@smartschool.edu"
  }
}
```

---

## 5. Microservice 1: `auth-tenant-service` (The Foundation)

### Core DDL Migration (`V1__init_auth_and_tenancy.sql`)

```sql
-- 1. Branches / Campus Sovereignty
CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_name VARCHAR(128) NOT NULL,
    branch_code VARCHAR(32) NOT NULL UNIQUE,
    school_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(32) NOT NULL,
    email VARCHAR(255) NOT NULL,
    currency_code VARCHAR(8) DEFAULT 'USD',
    currency_symbol VARCHAR(8) DEFAULT '$',
    timezone VARCHAR(64) DEFAULT 'UTC',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Master System Roles
CREATE TABLE system_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(64) NOT NULL UNIQUE, -- SUPER_ADMIN, CAMPUS_ADMIN, TEACHER, ACCOUNTANT, RECEPTIONIST, LIBRARIAN, STUDENT, PARENT
    display_label VARCHAR(128) NOT NULL,
    is_system_defined BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Unified User Accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
    username VARCHAR(128) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(32),
    role_id UUID NOT NULL REFERENCES system_roles(id) ON DELETE RESTRICT,
    is_active BOOLEAN DEFAULT TRUE,
    force_password_reset BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable RLS
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 5. Multi-Tenant RLS Policies
CREATE POLICY branch_isolation_policy ON branches
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );

CREATE POLICY user_isolation_policy ON users
    FOR ALL USING (
        current_setting('app.bypass_rls', true)::boolean = true
        OR branch_id = NULLIF(current_setting('app.current_branch_id', true), '')::uuid
    );
```

---

## 6. Standardized REST API Response Contract

All microservices respond with a standardized envelope conforming to RFC 7807:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "timestamp": "2026-09-12T06:50:00.124Z",
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

---

## 7. Implementation Roadmap & Scaffolding Checklist

- [x] All 7 microservices decomposed with isolated boundaries.
- [x] Spring Boot 3.3.x with Java 21 Virtual Threads configured.
- [x] Neon PostgreSQL Row-Level Security interceptor verified.
- [x] Canonical CloudEvents Kafka envelope standardized.
- [x] Zero Emoji Policy strictly maintained in code and configuration.
