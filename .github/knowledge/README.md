# SNP-SMS Enterprise Knowledge Base

This directory serves as the centralized source of truth for all enterprise coding standards, architectural rules, security policies, and UI guidelines for the SNP-SMS platform.

These knowledge files are dynamically fetched at runtime by GitHub Enterprise Custom Agents via the Model Context Protocol (MCP) and GitHub's built-in MCP server, bypassing the single-file 30,000-character limitation.

---

## Directory Taxonomy

- **`security/`**:
  - `secure-coding-standards.md`: OWASP Top 10 defenses, tenant isolation, input validation, and cryptographic hygiene.
  - `authentication-patterns.md`: Argon2id password hashing, JWT dual-token rotation, HTTP-only cookie security, and RBAC implied scopes.
  - `vulnerability-remediation.md`: Mongoose NoSQL injection prevention, regex DoS guards, and audit log tamper resistance.
  - `application-security-design-principles.md`: 5 core application security principles (Security, Compliance, Proactivity, Awareness, Simplicity) across Start, Mature, and Advance maturity tiers.
  - `application-security-checklist.md`: 43-point application security & SDLC assessment checklist across 11 architectural domains.
  - `github-repository-threat-model.md`: Repository threat modeling (T-01 to T-08), danger zone governance, ruleset enforcement, and supply chain defense.
  - `dependency-supply-chain-defense.md`: 6-layer defense-in-depth model against supply chain attacks, lifecycle script disabling, dev containers, and trusted publishing.
  - `prioritizing-security-alerts.md`: 3-step security alert prioritization model, GitHub metadata, custom properties, and targeted security campaigns.
  - `enforce-ghas-at-scale.md`: Enforcing GitHub Advanced Security at scale, security configurations, push ruleset bypass prevention, and dependency review gates.

- **`architecture/`**:
  - `modular-monolith-patterns.md`: 7-layer domain architecture (`route -> controller -> service -> repository -> model -> validation -> types`), Mongoose ACID transaction protocols.
  - `api-design-guidelines.md`: 193 REST endpoints, standard response envelope (`{ success, data, message, error }`), and pagination standards.
  - `database-standards.md`: MongoDB replica set `rs0` requirements, compound indexes, soft-delete invariants, and tenant boundary enforcement.
  - `architecture-assessment-framework.md`: Enterprise Architecture Assessment Framework, 7-layer REST API, Master MVP flow, AI agent protocol, and 10-domain audit checklist.
  - `polyrepo-operating-model.md`: Enterprise polyrepo operating model, meta-repo manifest integration (`release.yaml`), cross-repo change sets (`CHG-XXXX`), and merge coordination models.
  - `repository-architecture-strategy.md`: Repository architecture strategy (Monorepo vs Polyrepo), boundary decoupling invariants, circular dependency guards, and alternate deployment continuity.
  - `managing-large-git-repositories.md`: Scaling Git repositories, Git LFS asset routing, clone optimization (--depth=1), tree depth limits, and repository bloat guards.

- **`ci-cd/`**:
  - `github-actions-best-practices.md`: Action SHA pinning, least-privilege token permissions, dual-developer git sync gate.
  - `deployment-workflows.md`: Vercel serverless edge deployment, Docker container backend proxy, and zero-downtime rollover.
  - `container-security.md`: Non-root execution, multi-stage Alpine builds, and automated container healthchecks.
  - `git-lfs-architecture-guide.md`: Git LFS architectural decision framework, compression evaluation heuristics, and repository bloat prevention.
  - `actions-runner-controller.md`: Actions Runner Controller (ARC) Kubernetes deployment, requests==limits QoS, zero spot instances, and DinD sidecar isolation.
  - `repository-resilience-mirroring.md`: Repository resilience mirroring, narrow refspecs, out-of-band sync locks, and break-glass deployment runbooks.
  - `actions-private-networking.md`: GitHub Actions private networking, Azure VNet injection, subnet sizing (+20% buffer), and firewall FQDN filtering.
  - `securing-github-actions-workflows.md`: GitHub Actions workflow hardening, 40-character commit SHA pinning, script injection defense, and OIDC federated auth.

- **`design-standards/`**:
  - `psychological-design-rules.md`: 6-law invariant testing (Fitts, Hick, Miller, Doherty, Postel), zero emojis, and touch target rules.
  - `culinary-component-taxonomy.md`: 6-tier component hierarchy (Ingredients, Recipes, Entrees, Templates, Pages, Cookbook) with strict downward import rules.
  - `open-source-checklist-macro-phases.md`: 230 total verification checkpoints across Design Language (10), Foundations (26), Core Components (166), and Maintenance (28).

---

## File Naming & Content Guidelines

1. **File Naming**: All filenames must strictly use kebab-case: `[topic-name].md`.
2. **Size Budget**: Keep individual knowledge documents focused and under **10,000 characters** to ensure fast MCP fetch times during agent initialization.
3. **Metadata Header**: Every file must start with a metadata block:
   ```markdown
   ---
   Last updated: YYYY-MM-DD
   Domain: [security | architecture | ci-cd | design-standards]
   Version: X.Y
   Reviewed by: Architecture & Security Review Board
   ---
   ```
4. **Zero Emojis**: Strictly prohibited. Use clean textual badges: `[PASSED]`, `[FAILED]`, `[WARNING]`, `[COMPLETED]`.
