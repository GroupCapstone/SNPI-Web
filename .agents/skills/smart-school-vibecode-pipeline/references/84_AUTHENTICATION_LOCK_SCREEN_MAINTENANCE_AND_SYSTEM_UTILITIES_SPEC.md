# Authentication, Lock Screen, Maintenance & System Utilities Specification
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Strategic Authority

This specification establishes the authoritative architectural blueprint for the platform's **Authentication & Identity Lifecycle**, **Idle Session Lock Screen Engine**, **Scheduled Maintenance Interceptor**, **Pre-Launch Feature Teasers**, and **Resilient Error Diagnostic Views (404 and 500)**.

Following the principle of architectural synthesis:
1. **What to Merge**: Authentication credentials and role checking are consolidated into the existing Spring Boot Security filter chain and PostgreSQL RLS tenant context.
2. **What to Skip**: Cosmetic illustrations and decorative mockups are omitted; the focus is strictly on functional security, token lifecycles, state retention, and error resilience.
3. **What to Add**: Novel security and operational capabilities:
   - **Idle Session Lock Screen (`/auth/lock-screen`)**: Preserves client-side form state and tab context while requiring quick PIN/biometric re-authentication.
   - **Cyclic Password Recovery (`/auth/forgot-password`, `/auth/reset-password`)**: Cryptographic single-use tokens with 5-password history exclusion.
   - **Scheduled Maintenance Interceptor (`/maintenance`)**: Automated HTTP 503 gateway interceptor with live countdown and auto-reconnecting health ping.
   - **Coming Soon Teaser (`/coming-soon`)**: Dynamic countdown timer with role-based feature waitlists.
   - **Intelligent 404 Suggestion Engine (`/errors/404`)**: Fuzzy route prediction directing lost users to valid destinations.
   - **Incident-Tracked 500 Diagnostic Handler (`/errors/500`)**: RFC 7807 compliant error handler with correlation tracing and automated ticket creation.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             AUTHENTICATION, LOCK SCREEN & SYSTEM UTILITY ROUTE TAXONOMY                │
├───────────────────┬───────────────────────────────┬────────────────────────────────────┤
│ Slug Group        │ Sub-Route / Slug Path         │ Core Security & System Function    │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ AUTHENTICATION    │ /auth/signin                  │ Multi-Tenant Login & 2FA Gate      │
│                   │ /auth/signup                  │ Student & Parent Self-Registration │
│                   │ /auth/forgot-password         │ 15-Min Cryptographic Token Dispatch│
│                   │ /auth/reset-password          │ Password History & Complexity Check│
│                   │ /auth/lock-screen             │ Idle State Lock ("Welcome back!")  │
├───────────────────┼───────────────────────────────┼────────────────────────────────────┤
│ UTILITIES         │ /coming-soon                  │ Real-Time Release Countdown Timer  │
│                   │ /maintenance                  │ Scheduled Downtime & Auto-Reconnect│
│                   │ /errors/404                   │ Fuzzy Route Suggestion & Search    │
│                   │ /errors/500                   │ RFC 7807 Error with Correlation ID │
└───────────────────┴───────────────────────────────┴────────────────────────────────────┘
```

---

## 1. Authentication & Identity Lifecycle (`/auth/*`)

### 1.1 Multi-Tenant Sign In (`/auth/signin`)
- **Multi-Tenant Ingress**: Resolves tenant via subdomain (`oxford.smartschool.kh`), custom domain, or branch dropdown.
- **Login Credentials**: Supports institutional email, mobile phone number, or student/staff admission code.
- **Brute Force Defense**: 5 consecutive failed attempts lock the account for 15 minutes; dispatches security alert email to account holder.
- **Two-Factor Authentication (2FA)**: Time-based One-Time Password (TOTP via Google Authenticator) prompted conditionally for administrative, finance, and teacher roles.
- **Session Tokens**: Issues short-lived JWT access tokens (15-min TTL) paired with encrypted, httpOnly refresh tokens (7-day TTL).

### 1.2 Self-Service Registration (`/auth/signup`)
- **Target Archetypes**: Prospective students, external parents, alumni, and guest applicants.
- **Verification Gate**: Phone/Email verification via 6-digit OTP (5-minute expiry).
- **Duplicate Prevention**: Real-time validation against existing National ID / Passport numbers and email records to prevent duplicate student profiles.
- **Branch Routing**: Automatically assigns the applicant to the requested campus branch under pending review status.

### 1.3 Self-Service Password Recovery (`/auth/forgot-password`)
- **Token Dispatch**: Generates a cryptographically random, single-use reset token (`HMAC-SHA256`) with a strict 15-minute time-to-live (TTL).
- **Delivery Channels**: Dispatched via localized SMS and institutional email.
- **Rate Limiting**: Strictly capped at 3 recovery requests per identifier per hour to mitigate denial-of-service and SMS bombing.

### 1.4 Password Reset & History Enforcement (`/auth/reset-password`)
- **Complexity Meter**: Enforces zxcvbn score >= 3 (minimum 8 characters, uppercase, lowercase, numeric, and special characters).
- **Cyclic History Exclusion**: Validates new password against the user's last 5 historical password hashes; rejects immediate re-use.
- **Session Revocation**: Upon successful password reset, all active JWT sessions and refresh tokens across all devices are immediately invalidated.

---

## 2. Idle Session Lock Screen Engine (`/auth/lock-screen`)

### 2.1 Domain Concept & Rationale
In school campus environments, teachers and administrators frequently step away from their workstations (e.g. to assist a student or attend a hall monitor duty). Full logout causes loss of half-completed grade entries, draft circulars, or student attendance forms.

The **Lock Screen Engine** solves this by securing the screen without terminating the underlying session:
- **Trigger**: Automatically engages after 15 minutes of user inactivity (or manually via `⌘ L` / `Ctrl L`).
- **State Preservation**: The client-side application freezes, encrypts current in-memory form state into `sessionStorage`, and redirects to `/auth/lock-screen`.
- **"Welcome Back!" Visual**: Displays the authenticated user's photo, full name, role title, and current school branch.
- **Unlock Credentials**: Requires either:
  1. Quick 6-digit Security PIN (configured in user preferences).
  2. Account password.
  3. WebAuthn biometric touch (Touch ID / Windows Hello).
- **Post-Unlock Recovery**: Instantly restores the user's exact screen, active tab, and unsaved form data with zero data loss.
- **Hard Timeout**: If locked for more than 4 hours, the session terminates completely, requiring full credentials at `/auth/signin`.

---

## 3. Scheduled Maintenance Interceptor (`/maintenance`)

### 3.1 Gateway Interception & HTTP 503 Protocol
- When maintenance mode is activated by the Super Admin, the Application Gateway / CloudFront CDN intercepts all inbound traffic (except whitelisted administrator IPs) and returns `HTTP 503 Service Unavailable`.
- Users are routed to the `/maintenance` screen.

### 3.2 Live Telemetry & Auto-Reconnection
- **ETA Countdown**: Live digital countdown clock (Hours, Minutes, Seconds) indicating when campus systems will return online.
- **Maintenance Scope**: Clear bilingual notice (Khmer/English) explaining whether maintenance affects the entire system, online fee payments, or exam submission engines.
- **Health Check Polling**: The page performs a background `GET /actuator/health` probe every 10 seconds. Once the backend reports `UP`, the page automatically reloads and redirects users to their dashboard.

---

## 4. Pre-Launch Feature Teaser ("Stay Tuned / Coming Soon") (`/coming-soon`)

### 4.1 Feature Anticipation Engine
- Used when a school or enterprise tier subscribes to a module undergoing scheduled rollout (e.g. Virtual Classroom, AI Question Paper Generator, or Touchscreen Canteen POS).
- Displays a precision countdown timer targeting the scheduled activation date.
- **Waitlist & Notify Hook**: Teachers and parents can click "Notify Me" to receive an automated push notification the instant the module becomes active.

---

## 5. Resilient Error Diagnostics (404 & 500)

### 5.1 Intelligent 404 Route Discovery (`/errors/404`)
- **Fuzzy URL Matching**: When a route fails to resolve, the engine calculates the Levenshtein distance between the attempted URL and all registered application slugs.
  - *Example*: User navigates to `/studnt/roster` -> The page suggests: *"Did you mean [Students Directory](/people/students)?"*
- **Integrated Search**: Built-in search input enabling users to search for the desired screen directly from the 404 page.
- **Safe Fallback**: Prominent button routing the user back to their active `/dashboard/{role}`.

### 5.2 Incident-Tracked 500 Error Handler (`/errors/500`)
- **RFC 7807 Problem Details**: Compliant JSON payload hiding raw stack traces from client views for security hardening.
- **Correlation ID Tracking**: Generates and displays a unique tracking identifier (e.g. `ERR-2026-90412-XF`), allowing users to cite the exact issue when contacting IT support.
- **One-Click Retry**: Attempts an idempotent refresh with cache busting.
- **Direct IT Ticket Dispatch**: "Report to IT Helpdesk" button that automatically packages client telemetry (browser, OS, viewport, URL, timestamp, correlation ID) into a new IT support ticket.

---

## 6. Data Entities & Schemas

```sql
-- Password History to prevent cyclic reuse
CREATE TABLE user_password_history (
    history_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

-- Active User Sessions & Lock Screen State
CREATE TABLE user_active_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    tenant_id UUID NOT NULL,
    device_fingerprint VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    user_agent TEXT,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    quick_pin_hash VARCHAR(255),
    last_activity_at TIMESTAMPTZ DEFAULT clock_timestamp(),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);

-- Scheduled Maintenance Windows
CREATE TABLE scheduled_maintenance_windows (
    window_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID, -- NULL indicates global maintenance
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    estimated_end_time TIMESTAMPTZ NOT NULL,
    actual_end_time TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT clock_timestamp()
);
```

---

## 7. Supporting Skills Cross-Reference Matrix

| Operational Capability | Spec Reference | Supporting Primary Skill |
|---|---|---|
| Sign In, Sign Up & 2FA Gate | Spec 84 & Spec 52 | `smart-school-admin-access-control` |
| Lock Screen Idle Preservation | Spec 84 & Spec 66 | `smart-school-api-security-hardening`, `smart-school-system` |
| Password Recovery & History | Spec 84 & Spec 66 | `smart-school-api-security-hardening` |
| Maintenance Mode & 503 Gate | Spec 84 & Spec 67 | `smart-school-microservices-operational-excellence` |
| Coming Soon Teaser Engine | Spec 84 & Spec 65 | `smart-school-product-launch-readiness` |
| Error 404 & 500 Diagnostics | Spec 84 & Spec 60 | `smart-school-webapp-patterns`, `smart-school-api-contracts` |
