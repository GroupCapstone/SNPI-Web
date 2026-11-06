---
name: snp-sms-monorepo-architecture
description: >-
  Authoritative standard and architectural specification for the SNP-SMS Full-Stack TypeScript
  Monorepo (npm workspaces), Modular Monolith backend API (Express 5 / MongoDB rs0), and Hybrid
  Serverless / Container deployment model. Read before making any code, package, or configuration changes.
---

# SNP-SMS Monorepo & Modular Monolith Architecture Standard

This skill establishes the production standards, directory organization, application boundaries, shared packages, and workflows for the SNP Integrated Multi-Branch School Management System (SNP-SMS).

---

## 1. High-Level Architecture Overview

* **Private Repository**: `https://github.com/Tan-Saphea/SNPI-SMS.git` *(Owner: @Tan-Saphea)*
* **Release Checkpoint**: `v0.1.0` (Tag: `v0.1.0`, Commit: `28ef01b`)
* **Live Document Portal**: `/document` (Publicly accessible technical specification)
* **Future Ownership Transfer**: Decoupled from personal account; maintainer verification via `.github/maintainers.json` numeric IDs.

```text
SNP-SMS/
├── apps/
│   ├── backend/                 # Express 5, TypeScript, MongoDB (Modular Monolith API)
│   │   ├── src/modules/         # Domain-driven 7-layer modules (47 domains)
│   │   ├── Dockerfile           # Multi-stage production container build
│   │   └── docker-compose.yml   # Local MongoDB replica set (rs0) & API stack
│   └── frontend/                # Next.js App Router (Serverless / Edge deployable)
│       ├── app/                 # Routes, layouts, and components (67 routes)
│       ├── features/            # Feature-sliced UI modules
│       └── vercel.json          # Serverless routing and edge configuration
├── packages/
│   ├── shared/                  # @snp/shared: Canonical Permissions, Roles, DTOs, Zod Schemas
│   ├── tsconfig/                # @snp/tsconfig: Standardized TypeScript compiler presets
│   └── eslint-config/           # @snp/eslint-config: Shared flat ESLint presets
├── scripts/
│   ├── monorepo-smoke.ts        # Automated smoke test (npm run smoke)
│   └── test-all-apis.ts         # Live end-to-end API test suite (npm run test:api)
├── .github/workflows/
│   └── ci.yml                   # Unified CI pipeline (lint, typecheck, test, build)
├── docker-compose.yml           # Root-level MongoDB replica set orchestration
├── package.json                 # Monorepo workspaces manifest
├── package-lock.json            # Unified single lockfile
├── .editorconfig
└── .prettierrc.json
```

---

## 2. Architectural Boundaries & Responsibilities

### `apps/backend` (Modular Monolith)
* **Framework**: Express 5 on Node.js `>=22.13.0` with TypeScript.
* **Internal Pattern**: 7-layer architecture per domain:
  `route -> controller -> service -> repository -> model -> validation -> types`
* **Port**: `4000` (`http://localhost:4000/api/v1`).
* **Root Route**: `GET /` returns API metadata, version, and health endpoint pointers.
* **Database**: MongoDB 7.0+ Replica Set (`rs0`) for multi-document ACID transactions.

### `apps/frontend` (Serverless Edge UI)
* **Framework**: Next.js (App Router), React 19, TypeScript, Tailwind CSS, Radix UI.
* **Port**: `3000` (`http://localhost:3000`).
* **Proxy Architecture**: Proxies `/api/v1/*` server-side via `next.config.ts` rewrites to `BACKEND_INTERNAL_URL` (zero CORS issues in production).
* **Workspace Transpilation**: Configured with `transpilePackages: ['@snp/shared']`.

### `packages/shared` (`@snp/shared`)
* **Canonical Role**: Single source of truth across frontend and backend.
* **Contents**:
  * `SYSTEM_PERMISSIONS` (356 granular permissions)
  * `DEFAULT_CORE_ROLES` (13 core roles)
  * `IMPLIED_SCOPES` & `checkUserPermission` (Scope inheritance & RBAC utilities)
  * `loginPayloadSchema` & Zod DTO contracts
  * `ApiSuccessResponse<T>`, `ApiPaginatedResponse<T>`, `PaginationMeta`

### `packages/tsconfig` (`@snp/tsconfig`)
* Standardized TSConfig presets: `base.json`, `node.json`, `nextjs.json`.

### `packages/eslint-config` (`@snp/eslint-config`)
* Shared flat ESLint rules and conventions.

---

## 3. Hybrid Deployment Strategy

| Layer | Runtime / Target | Deployment Strategy | Rationale |
| :--- | :--- | :--- | :--- |
| **`apps/frontend`** | **Serverless (Vercel)** | Edge / Serverless functions | Fast global CDN caching, automated preview deployments, zero server maintenance. Proxies `/api/v1` server-side. |
| **`apps/backend`** | **Container (Docker)** | Long-running container (Render, Railway, ECS, VPS) | Persistent MongoDB connection pools (replica set `rs0`), reliable ACID transactions, rate limiting, and PDF exports. |
| **Database** | **Managed MongoDB** | Stateful replica set | Multi-document ACID transactions across classes, students, and payments. |

---

## 4. Standard Operational Commands

```bash
# Install all dependencies across all workspaces
npm install

# Run automated smoke test
npm run smoke

# Run live end-to-end API test suite (all 47 modules / 56 routes)
npm run test:api

# Start backend dev server (:4000)
npm run dev:backend

# Start frontend dev server (:3000)
npm run dev:frontend

# Start both servers concurrently
npm run dev

# Synchronize real-time changelog to live /document portal and CHANGELOG.md
npm run changelog:sync

# Quality gates
npm run typecheck
npm run test
npm run build
npm run format:check
```

---

## 5. Mandatory UI Agent Design Implementation Invariants (Every Skill & Agent)

Whenever designing, styling, refactoring, or generating UI components, navigation menus, or documentation views across the entire platform, all AI agents must strictly enforce:
1. **Minimal Guide Text**: Only render title and buttons/controls; never write walls of descriptive paragraphs or redundant guide text.
2. **Mandatory Icon Hover Definitions**: Every interactive icon and icon button must show an accessible definition/action label on hover via `title` or tooltip.
3. **Pure Icon Hygiene**: Never use emojis, informal symbols, or decorative background shapes/colored blobs (`bg-blue-100 rounded-full`, `bg-[#0056FF] rounded-lg`) behind icons.
4. **Brand Blueprint Compliance**: Exclusively respect the 5 primary brand tokens (`#0056FF`, `#2277FF`, `#E3E7FC`, `#FFFFFF`, `#EFF5FF`) and high-contrast `#0A1A4A` Deep Navy text.
5. **Universal Web & Mobile Responsive Device First**: Always engineer for fluid responsive behavior across both mobile viewports and desktop with zero clipping and >=44x44px touch targets.
6. **Mandatory Zero Links Rule (Never Add Links)**: Under no circumstances should AI agents add markdown links, URL hyperlinks, file scheme links (`file://`), or unnecessary anchor links in responses or generated UI components unless explicitly requested by the user. Use plain text or code font.
7. **Mandatory In-Skill Documentation & Zero Root Markdown / README Files (Absolute Rule)**:
   - Under no circumstances should any AI agent, contributor, or tool create, write, or drop arbitrary README files, documentation summaries, feature breakdowns, or markdown notes in the repository root folder.
   - The root directory is strictly reserved for canonical repository manifests only (`AGENTS.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `README.md`, `SECURITY.md`).
   - All architecture guides, design documents, implementation summaries, and technical references MUST be placed inside the relevant skill folder under `.agents/skills/<skill-folder>/`.
   - If any unapproved markdown files are detected in the repository root, they must immediately be relocated into `.agents/skills/<skill-folder>/` without delay.
