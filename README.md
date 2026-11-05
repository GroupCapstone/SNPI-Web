# SNPI-Web: Next.js Web Portal & Developer Portal

> Official enterprise web application and developer documentation portal for the **SNPI School Management System (SMS)**, powered by Next.js 16, React 19, and Tailwind CSS v4.

---

## 1. Architectural Highlights

* **Framework**: Next.js 16 (App Router) with React 19.
* **Styling & UI**: Tailwind CSS v4, Motion (Framer Motion v14), Radix UI primitives.
* **Client Data Fetching**: SWR (RFC 5861 Stale-While-Revalidate) with local optimistic mutations.
* **Integrated Documentation**: Built-in App Router developer portal located at `/document`.
* **Design Standards**: Material Design 3 Expressive UI, high-contrast accessible typography (WCAG AAA), and clean brand tokens.
* **Domains & Pages**:
  * Executive Campus Dashboard
  * Student Lifecycle Management (Admissions, Profiles, Enrollments)
  * Academic Operations (Curriculums, Classes, Schedules, Timetables)
  * Daily Attendance Hub (Session marking, leave management)
  * Examination & Grading Workspace (Score matrices, report cards)
  * Finance & Tuition Management (Fee structures, payment ledger)

---

## 2. Quick Start

### Prerequisites
* Node.js >= 20.0.0
* Running `SNPI-API` instance on `http://localhost:5000`

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local

# 3. Start web portal dev server (Port 3000)
npm run dev

# 4. Typecheck & production build
npm run typecheck
npm run build
```

---

## 3. Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
PORT=3000
```

---

## 4. Verification & Testing

```bash
# Typecheck verification (0 errors)
npm run typecheck

# Code formatting check
npm run format:check
```
