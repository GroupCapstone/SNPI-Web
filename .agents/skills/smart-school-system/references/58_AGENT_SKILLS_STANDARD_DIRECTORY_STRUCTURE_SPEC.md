---
name: smart-school-skills-standard-structure
description: Authoritative specification for the Google Antigravity Agent Skill Standard Directory Structure, repository packaging, progressive disclosure, and workspace deployment across the Smart School Enterprise Platform. Mandates .agents/skills/<skill_name>/ layout with SKILL.md frontmatter, references/, scripts/, examples/, and resources/ subdirectories.
---

# Agent Skills Standard Directory Structure Specification
## Google Antigravity Customization Architecture (ABLOB Platform)

### Executive Overview & Official Standard

In accordance with the **Google Antigravity Customization System** (`agy-customizations`), this document establishes the authoritative directory structure, folder taxonomy, packaging standards, and progressive disclosure rules for storing and discovering Agent Skills.

---

## 1. Official Standard Directory Hierarchy

A compliant Antigravity Skill is packaged as an independent, self-contained directory within a parent `skills/` registry.

```text
.agents/skills/<skill_name>/
├── SKILL.md          # MANDATORY: Main entry point with YAML frontmatter & markdown instructions
├── references/       # RECOMMENDED: In-depth technical specifications, schemas, domain rules
├── scripts/          # OPTIONAL: Executable automation tools, python parsers, shell scripts
├── examples/         # OPTIONAL: Reference component implementations, mock datasets
└── resources/        # OPTIONAL: Asset templates, visual diagrams, configuration blueprints
```

---

## 2. Storage Locations & Loading Priority

Antigravity uses a deterministic 5-tier discovery cascade to find and prioritize skills. When names collide, higher-tier skills override lower-tier skills:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        ANTIGRAVITY SKILL DISCOVERY CASCADE                             │
├─────────┬───────────────────────────────┬──────────────────────────────────────────────┤
│ Tier 1  │ Workspace Project Skills      │ .agents/skills/<name>/ (or .agent/skills/)   │
│         │ (Highest Priority)            │ Checked into git; shared across the team     │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ Tier 2  │ Explicit JSON Declarations    │ skills.json in workspace root                │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ Tier 3  │ Global Machine Skills         │ ~/.gemini/config/skills/<name>/              │
│         │                               │ Machine-local; shared across all projects    │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ Tier 4  │ Built-in System Skills        │ Bundled with Antigravity binary              │
├─────────┼───────────────────────────────┼──────────────────────────────────────────────┤
│ Tier 5  │ Global Declared JSON          │ Explicitly declared in global settings       │
└─────────┴───────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 3. Detailed Anatomy of a Standard Skill Folder

### A. The Master Entry Point (`SKILL.md`)
The `SKILL.md` file is strictly required. It MUST begin with a clean YAML frontmatter header:

```markdown
---
name: my-skill-name
description: >-
  Concise 2-3 sentence description written in third-person detailing WHAT this skill
  accomplishes and WHEN the agent should activate it. Include explicit triggers.
---

# Skill Title
## Architectural Domain

### 1. Executive Instructions
Step-by-step procedural guide for the agent...

### 2. Subdirectory Links
- Reference Documentation: [spec.md](./references/spec.md)
- Automation Script: [helper.py](./scripts/helper.py)
```

### B. The `references/` Subdirectory
- **Purpose**: Prevents token-bloat through **Progressive Disclosure**. Bulky 500-line schemas, API dictionaries, and domain rules reside here.
- **Rule**: The agent only reads files in `references/` when actively executing the relevant workflow.

### C. The `scripts/` Subdirectory
- **Purpose**: Encapsulates deterministic logic, data parsers, OCR extractors, and build tools.
- **Rule**: Scripts must be executable and referenced via relative markdown links (`[tool](./scripts/tool.py)`).

### D. The `examples/` Subdirectory
- **Purpose**: Clean sample code, UI component patterns, and mock payloads.

### E. The `resources/` Subdirectory
- **Purpose**: Vector logos, color palettes, and template files.

---

## 4. Deployed Workspace Skills Inventory (`.agents/skills/`)

The workspace `.agents/skills/` registry contains all 13 sovereign Primary Skills:

```
/Users/Apple16/Desktop/skill-ibecode-pipeline/.agents/skills/
├── smart-school-system/                   # Platform Architecture & UI/UX Design DNA
│   ├── SKILL.md
│   └── references/
│
├── smart-school-vibecode-pipeline/        # Spring Boot 3, Kafka & RLS Code Generator
│   ├── SKILL.md
│   ├── references/                        # 58 Detailed CRUD & Domain Specs
│   ├── scripts/                           # extract_image_to_text.py
│   ├── MEDIA/                             # 372 Ground-Truth Visual Screenshots
│   └── ui_extractions/                    # Text Extraction Ledgers
│
├── smart-school-why-choose-us/            # Value Proposition & Mobile Integration
│   ├── SKILL.md
│   └── references/
│
├── smart-school-powerful-tools/           # 5 Portal Roles & Core Academics
│   ├── SKILL.md
│   └── references/
│
├── smart-school-student-lifecycle-features/ # 16-Feature Student Journey Suite
│   ├── SKILL.md
│   └── references/
│
├── smart-school-examination-assessment/   # 11-Feature Assessment & Grading Engine
│   ├── SKILL.md
│   └── references/
│
├── smart-school-attendance-communication/ # 4-Channel Presence & Notifications
│   ├── SKILL.md
│   └── references/
│
├── smart-school-fee-accounting/           # 12-Feature Billing, Gateways & Ledger
│   ├── SKILL.md
│   └── references/
│
├── smart-school-staff-hr/                 # 4-Pillar Workforce, Payroll & Leaves
│   ├── SKILL.md
│   └── references/
│
├── smart-school-admin-access-control/     # 8-Feature Multi-School RLS & Setup Wizard
│   ├── SKILL.md
│   └── references/
│
├── smart-school-facilities-operations/    # 8-Feature Physical Campus & Library
│   ├── SKILL.md
│   └── references/
│
├── smart-school-utilities-transport/      # 8-Feature Ingress, Fares & Audit Logs
│   ├── SKILL.md
│   └── references/
│
└── smart-school-visitor-gate-passes/      # 4-Pillar Perimeter Security & Gate Passes
    ├── SKILL.md
    └── references/
```

---

## 5. Validation & Quality Assurance Checklist

- [x] Every skill directory contains a valid `SKILL.md` with YAML frontmatter (`name`, `description`).
- [x] All 13 Primary Skills deployed to both Workspace (`.agents/skills/`) and Global (`~/.gemini/config/skills/`).
- [x] Bulky documentation isolated inside `references/` for progressive disclosure.
- [x] Helper tools located in `scripts/`.
- [x] Zero emojis strictly enforced across all files, code, and comments.
