# SNPI-Web

SNPI-Web is the web portal for the SNPI School Management System, built with Next.js and React. It is the browser interface that staff, teachers, and administrators use to manage students, academics, attendance, examinations, and finance, working together with SNPI-API.

## How the AI Agent Works on This Project

```mermaid
flowchart TD
    A[User gives a task] --> B[AI agent reads and understands the request]
    B --> C[Agent studies the web project files]
    C --> D[Agent makes a step-by-step work plan]
    D --> E[Agent does the work on the web code]
    E --> F[Agent runs checks: typecheck, lint, and tests]
    F -->|Problem found| E
    F -->|All checks pass| G[Agent reports the finished result to the user]
```
