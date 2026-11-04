---
name: standard-product-folder-structure
description: Enforce, audit, and generate the standardized enterprise product folder structure for the SNP-SMS repository. Covers root workspace layout, backend 7-layer modules, frontend feature slices, and infrastructure directories. Trigger whenever the user asks to standardize folders, verify folder structure, or mentions "standard product folder structure".
---

# Standard Product Folder Structure

Defines the enterprise monorepo folder architecture, directory boundaries, naming conventions, and file placement rules for SNP-SMS.

## Quick Trigger Phrases
Whenever the user asks or says:
- `standard product folder structure`
- `folder structure`
- `check folder structure`
- `standardize folders`
- `verify folder layout`

---

## 1. Top-Level Directory Taxonomy

```text
/
├── .agents/                    # AI development skills, operational guidelines, and governance
├── .github/                    # GitHub Actions CI/CD workflows and CodeQL security analysis
├── backend/                    # Node.js + Express + TypeScript API (7-Layer Module Pattern)
│   ├── api/                    # Vercel serverless entrypoint (index.ts)
│   ├── dist/                   # Compiled JavaScript distribution
│   ├── scripts/                # Database migrations, seed scripts, and smoke tests
│   ├── src/                    # Core source code (config/, middleware/, modules/, utils/)
│   └── tests/                  # Integration and unit test suites (Vitest)
├── docs/                       # Central repository documentation hub
│   └── archive/                # Historical verification and legacy audit logs
├── frontend/                   # Next.js 16 + TypeScript + Tailwind CSS (Feature-Slice Pattern)
│   ├── app/                    # Next.js App Router (Dashboard pages, auth, layouts)
│   ├── components/             # Global reusable UI primitives (shadcn/ui, layout components)
│   ├── constants/              # System-wide UI constants, navigation links, and theme tokens
│   ├── features/               # Domain-specific feature slices (44 features)
│   ├── lib/                    # Shared utilities, API client, i18n, and permission helpers
│   ├── public/                 # Static web assets (logos, icons, favicons)
│   └── types/                  # Global shared TypeScript definitions
├── integrations/               # External messaging and gateway service blueprints
│   ├── telegram/               # Telegram bot and webhook service handlers
│   ├── twilio/                 # Twilio SMS gateway handlers
│   └── webhooks/               # Inbound and outbound webhook dispatchers
├── k8s/                        # Production Kubernetes manifests (Deployments, Ingress, HPA)
├── observability/              # Telemetry and monitoring infrastructure (Prometheus, Grafana)
└── wiki/                       # Markdown repository mirroring the official GitHub Wiki
```

---

## 2. Layer Specifications

### 2.1 Backend 7-Layer Module Standard
Every module under `backend/src/modules/<name>/` strictly implements:
1. `module.model.ts`: Mongoose schema, compound indexes, soft-delete protection.
2. `module.types.ts`: DTOs, query filters, interface contracts.
3. `module.validation.ts`: Zod request validation schemas.
4. `module.repository.ts`: Database operations, population, and queries.
5. `module.service.ts`: Business logic, multi-branch scoping (`user.branchAccess`), and audit logging.
6. `module.controller.ts`: HTTP request handling, status codes, JSON serialization.
7. `module.route.ts`: Express router, authentication, and RBAC permissions (`module.action.scope`).

### 2.2 Frontend Feature-Slice Standard
Every feature slice under `frontend/features/<name>/` strictly implements:
1. `api/`: Typed API client methods.
2. `components/`: Feature-specific UI components, dialogs, and tables.
3. `hooks/`: TanStack Query hooks (`useQuery`, `useMutation`).
4. `schemas/`: Zod form validation schemas.
5. `types/`: Domain TypeScript interfaces.
6. `utils/`: Formatters and calculations.

---

## 3. Hygiene & Anti-Patterns

- **Never create ad-hoc root folders**: All assets belong in either `backend/`, `frontend/`, `docs/`, `integrations/`, `k8s/`, `observability/`, `.agents/`, or `wiki/`.
- **Archive legacy files**: Relocate old audit or verification logs to `docs/archive/` instead of creating root stubs.
- **Remove unreferenced stubs**: Delete single-line pointer files or empty directory trees.
- **Maintain single source of truth**: Documentation belongs in `docs/` and root `STRUCTURE.md`.

---

## 4. Verification Command
To verify that the structure does not break any project functionality:
```bash
npm run format:check && npm run lint && npm run typecheck && npm run test && npm run build
```
