---
name: snp-sms-push-checkpoint-workflow
description: >-
  Authoritative GitHub push, polyrepo organization sync, pre-push verification, and equal collaborator permission protocol for SNPI-API and SNPI-Web.
  Enforces in-project build isolation, differentiated commit messages, independent tracking, equal organization admin permissions under ytivargitna, and zero-emoji policy.
  Trigger on: "push", "git push", "push now", "checkpoint", "release checkpoint", "publish".
---

# SNPI Polyrepo GitHub Push & Organization Checkpoint Workflow

This skill defines the authoritative, mandatory protocol that every agent and contributor must execute whenever commanded to push, publish, or checkpoint code to GitHub across the SNPI polyrepo workspace.

---

## 1. Organization Topology & Equal Ownership

Both repositories are hosted under the shared GitHub Organization **`ytivargitna`**, where both `shiliaiwei` and `Tan-Saphea` hold equal **Organization Admin** rights:

* **Backend (`SNPI-API`)**:
  * Dedicated Headless REST API (Express 5, TypeScript, MongoDB Replica Set `rs0`, 7-layer modular monolith).
  * Primary Remote (`origin`): `https://github.com/ytivargitna/SNPI-API.git` (tracked on `main -> origin/main`).
  * Secondary Remotes: `personal` (`shiliaiwei/SNPI-API.git`), `upstream` (`Tan-Saphea/SNPI-SMS.git`).
  * Organization Permissions: Equal Admin (`shiliaiwei` & `Tan-Saphea`).

* **Frontend Web Portal (`SNPI-Web`)**:
  * Next.js 16 Web Portal & Developer Portal (React 19, Tailwind CSS 4, Radix UI).
  * Primary Remote (`origin`): `https://github.com/ytivargitna/SNPI-Web.git` (tracked on `main -> origin/main`).
  * Secondary Remote: `personal` (`shiliaiwei/SNPI-Web.git`).
  * Organization Permissions: Equal Admin (`shiliaiwei` & `Tan-Saphea`).

---

## 2. In-Project Boundary & Execution Rules

1. **Strict In-Project Writes**:
   * All file edits, test scripts, and build artifacts MUST be self-contained in the target project folder (`SNPI-API` or `SNPI-Web`).
   * **Zero Root Pollution**: Never create files in `/Users/Apple16/Desktop/SNPI/`.
   * **Zero Cross-Contamination**: Never place API code in `SNPI-Web` or frontend code in `SNPI-API`.

2. **Differentiated Commit Messages**:
   * `SNPI-API`: Strictly prefixed with `(api)` or `(api/<scope>)` (e.g. `feat(api): ...`, `fix(api): ...`, `docs(api): ...`).
   * `SNPI-Web`: Strictly prefixed with `(web)` or `(web/<scope>)` (e.g. `feat(web): ...`, `fix(web): ...`, `docs(web): ...`).
   * Commits must NEVER share identical or generic commit messages across repositories.

3. **Strict Zero Emojis**:
   * Never use emojis in code, comments, commit messages, PR descriptions, or agent responses. Use textual badges: `[PASSED]`, `[FAILED]`, `[WARNING]`, `[COMPLETED]`.

4. **Explicit User Command Required**:
   * Never execute `git push` without an explicit user command (`push`, `git push`, `publish`).

---

## 3. Pre-Push Verification Pipeline

Before executing any push, run the target project's quality gates:

### For Backend (`SNPI-API`):
```bash
cd /Users/Apple16/Desktop/SNPI/SNPI-API

# 1. TypeScript static analysis (0 errors required)
npm run typecheck

# 2. Build verification (outputs strictly contained in dist/)
npm run build
```

### For Frontend Web (`SNPI-Web`):
```bash
cd /Users/Apple16/Desktop/SNPI/SNPI-Web

# 1. TypeScript static analysis (0 errors required)
npm run typecheck

# 2. Production build verification (outputs contained in .next/)
npm run build
```

---

## 4. Remote Push Execution Protocol

Once quality gates pass, execute remote synchronization to the `ytivargitna` organization:

```bash
# Set large buffer to prevent RPC push failures
git config http.postBuffer 524288000

# Push main branch to organization origin
git push origin main
```

---

## 5. Operational Summary Table

| Scope | Project Folder | Primary GitHub Remote (Org) | Commit Prefix | Permissions | Verification Gates |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Backend API** | `SNPI-API/` | `ytivargitna/SNPI-API` | `(api)` / `(api/<scope>)` | Org Admin (`shiliaiwei` / `Tan-Saphea`) | `npm run typecheck` + `npm run build` |
| **Frontend Web** | `SNPI-Web/` | `ytivargitna/SNPI-Web` | `(web)` / `(web/<scope>)` | Org Admin (`shiliaiwei` / `Tan-Saphea`) | `npm run typecheck` + `npm run build` |
