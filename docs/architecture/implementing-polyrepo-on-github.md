# Implementing Polyrepo on GitHub: Enterprise Operating Model

> Authoritative enterprise operating specification for multi-repository software development on GitHub Enterprise Cloud (GHEC/EMU). Provides a structured framework to maintain service autonomy while eliminating cross-repo coordination fragility.

---

## Scenario Overview

Enterprises building software as a polyrepo system—one component per repository—gain autonomy, clearer ownership, and scalable team boundaries. They also inherit complexity: cross-repo change coordination, dependency compatibility, consistent CI/CD policy, security remediation at scale, and release governance.

GitHub primitives (issues, pull requests, workflows) are repo-scoped by design. There is no native "multi-repo change object," so organizations must model one. Reusable workflows improve standardization but introduce questions of adoption, drift, failures, and versioning. Security remediation and platform migrations are continuous and inherently cross-repo. Leaders need enterprise dashboards while teams need a low-friction workflow that preserves autonomy.

This operating model for polyrepo engineering centers on an integration layer (meta-repo) pattern, reusable workflows as a versioned platform interface, and orchestration for multi-repo execution. The design emphasizes repeatability, auditability, and enterprise-scale observability while minimizing friction for individual service teams.

---

## Key Design Strategies and Checklist

### 1. Integration Layer (Meta-Repo) for Composition Validation

- Maintain a dedicated repository that answers "do these versions of components work together?" by pinning each component to an immutable reference (tag or SHA) in a manifest file.
- Without an integration layer, cross-repo contract changes and release candidate validation rely on ad-hoc coordination, which breaks down at scale.
- **Anti-pattern**: Treating the integration repo as a monorepo that contains code. It should hold only manifests, integration tests, and CI configuration.

### 2. Change Sets for Cross-Repo Coordination

- Model a "change set" as a parent tracking issue in the integration repo, with child issues created in each affected component repo. PRs and branches include a change set identifier (for example, `CHG-1042`) for traceability.
- This creates a single coordination spine without requiring monorepo consolidation.
- **Anti-pattern**: Relying solely on Slack threads or spreadsheets for cross-repo coordination, which lack auditability and automation hooks.

### 3. Branching and Merge Coordination Model

- Choose a merge coordination approach—integration branches, meta-repo manifest, versioned artifacts, or linked PRs with merge gating—based on the risk and scope of each type of cross-repo change.
- Establish consistent branch naming conventions and protect long-lived branches with repository rulesets.
- **Anti-pattern**: Allowing each team to invent its own branching convention, which fragments automation and makes cross-repo coordination brittle.

### 4. Reusable Workflows as a Versioned Platform Interface

- Treat shared CI/CD workflows like a product: stable inputs/secrets/outputs contract, semantic versioning with major tags (`v1`, `v2`), changelogs, and migration guides.
- Protect the workflow repo with `CODEOWNERS`, required reviews, and strict permissions.
- **Anti-pattern**: Publishing workflows without versioning or breaking changes without a migration path.

### 5. Component Releases vs. System Releases

- Decouple individual component release cadences from system-level releases. Components release independently (for example, `v1.8.2`), while system releases happen in the integration repo (for example, `system-2026.01.30`).
- This avoids coupling all repos to a single cadence.

### 6. Orchestration with a Safety Model

- Use an orchestrator (GitHub App or service) for cross-repo discovery and coordination, with repo-scoped automated execution for implementing changes and opening PRs.
- Enforce repository rulesets and `CODEOWNERS` against automation. Label artifacts for governance and reporting.

---

## Quick Checklist

| Area                   | Action                                                                                               |
| :--------------------- | :--------------------------------------------------------------------------------------------------- |
| **Integration repo**   | Create a manifest-driven integration repository with pinned component references.                    |
| **Change management**  | Define a change set template with parent/child issue conventions and identifier format (`CHG-XXXX`). |
| **Branching model**    | Choose a merge coordination approach per change type; enforce consistent branch naming and rulesets. |
| **Reusable workflows** | Version shared workflows with semantic versioning and protect with `CODEOWNERS`.                     |
| **Release governance** | Separate component releases from system releases using a promotion model.                            |
| **Workflow telemetry** | Emit structured telemetry from reusable workflows for enterprise dashboards.                         |
| **Security campaigns** | Use GHAS detection with GitHub Projects for campaign coordination and SLA tracking.                  |
| **Orchestration**      | Deploy an orchestrator/executor pattern with least-privilege GitHub App permissions.                 |
| **Pinning policy**     | Pin workflows and dependencies to stable tags or SHAs; avoid floating refs in production.            |

---

## Assumptions and Preconditions

- The organization uses GitHub Enterprise Cloud (GHEC) or GHEC with Enterprise Managed Users (EMU).
- Multiple component repositories already exist (or are planned), each with clear ownership and bounded CI/CD.
- Teams have adopted or are willing to adopt GitHub Actions for CI/CD workflows.
- GitHub Advanced Security (GHAS) is enabled for code scanning, Dependabot, and secret scanning.
- The organization has an analytics or observability backend (for example, Splunk, Datadog, Elastic, or Microsoft Sentinel) for workflow governance dashboards.
- Teams have sufficient GitHub Actions minutes and runner capacity for integration validation workflows.
- Organization administrators have approved the creation of integration and workflow repositories.

---

## Recommended Implementation

### Step 1: Establish the Integration Layer (Meta-Repo)

Create a dedicated integration repository that serves as the composition boundary for multi-repo validation and system releases. This repo contains:

- A manifest file (`release.yaml`, `components.lock`, or `versions.json`) mapping components to immutable references.
- Integration and contract test suites that validate component compatibility.
- CI workflows that resolve the manifest, check out each component at its pinned ref, build the composed system, and publish an integration artifact.

Use release tags as the preferred reference type for production manifests. Commit SHAs provide strong reproducibility. PR SHAs can be used for pre-merge integration candidates but should be promoted to tags before production.

#### Example Manifest (`release.yaml`)

```yaml
components:
  auth-service:
    repo: org/auth-service
    ref: v2.4.1
  billing-api:
    repo: org/billing-api
    ref: v1.12.0
  web-frontend:
    repo: org/web-frontend
    ref: v3.1.0-rc.2
```

#### Standard Integration Validation Workflow Pipeline:

1. Resolve the manifest and check out each component at its pinned ref.
2. Build or assemble the composed system.
3. Run integration and contract test suites.
4. Publish an integration artifact (bundle, compose file, Helm chart, SBOM).
5. Produce a clear status signal used for promotion decisions.

---

### Step 2: Implement the Change Set Pattern

Because GitHub lacks a cross-repo change primitive, model one explicitly:

- Assign a change set identifier (for example, `CHG-1042`) to each cross-repo change.
- Create a parent tracking issue in the integration repo with scope, impacted repos, and acceptance criteria.
- Generate child issues in each affected component repo, linked to the parent.
- Include the change set ID in PR titles and branch names for traceability (`changeset/CHG-1042/...`).
- Update the integration manifest to reference PR SHAs during validation, then promote to tags on success.

#### Multi-Repo Change Lifecycle:

```
Create parent tracking issue (integration repo)
  -> Generate child issues per repo
    -> Implement PRs per repo
      -> Update manifest with PR SHAs
        -> Integration CI validates
          -> Promote to RC and production tags
```

Use GitHub Projects to track all issues and PRs in a change set with custom fields: `Change Set ID`, `Team`, `Priority`, `SLA Date`, `Status`.

---

### Step 3: Choose a Branching and Merge Coordination Model

#### Option 1: Integration Branch (Release-Train Model — Most Reliable)

Each repo maintains `main` plus an `integration/<train-id>` (or `release/x.y`) branch. Coordinated PRs target the integration branch. A central workflow checks out all repos at their integration refs and runs end-to-end tests. If green, you promote by merging `integration -> main` in each repo in an enforced order (provider before consumer).

#### Option 2: Meta-Repo Manifest (Common in Enterprises)

A dedicated repo holds a manifest lockfile pinning each component to an immutable ref. PRs in component repos trigger automated manifest updates. CI validates the meta-repo by checking out each repo at pinned SHAs. Once the meta-repo PR merges, you tag component repos accordingly.

#### Option 3: Versioned Artifacts (Decouple Merges Entirely)

Components merge and release independently, publishing immutable artifacts (packages, containers) with a version tag. Downstream repos consume artifacts at explicit versions. Coordination becomes version-bump PRs rather than simultaneous merges.

#### Option 4: Linked PRs with Merge Gating (Lighter-Weight)

Keep PRs in each repo, link them, and only merge when all are ready. Each PR references the others via labels (for example, `changeset:CHG-1042`) or description links. A required status check queries the GitHub API to verify all linked PRs are approved and passing before any can merge. A bot merges them in a defined order.

#### Selecting a Coordination Model:

- **Breaking API / Contract Changes**: Integration branch or meta-repo manifest for strongest pre-merge validation.
- **Routine Dependency Updates**: Versioned artifacts (Dependabot/Renovate automated PRs).
- **Small, Low-Risk Cross-Repo Changes**: Linked PRs with merge gating.

#### Branching Conventions:

- Shared prefix: `changeset/CHG-1042/short-description` or `integration/2026-q1-release`.
- Protected long-lived branches (`main`, `release/*`, `integration/*`) with rulesets.
- Automatic branch deletion after merge.

---

### Step 4: Set Up Reusable Workflow Governance

Create a centralized workflow repository and treat it as an internal platform product:

- Define stable contracts with documented inputs, secrets, and outputs.
- Use semantic versioning with major tags (`v1`, `v2`) and full version tags (`v1.2.3`).
- Protect the repository with `CODEOWNERS`, required reviews, and branch rulesets.
- Publish changelogs and migration guides for breaking changes.

#### Workflow Governance Dashboard

Build a dashboard using your analytics backend with two complementary data feeds:

1. **Inventory (References)**: Shared workflows with the called ref.
2. **Runtime Metrics (Executions)**:
   - Caller repo and workflow
   - Reusable workflow path and version/ref
   - Run ID, attempt number, event type, actor
   - Conclusion and duration

---

### Step 5: Define the Release Governance Model

Separate component releases from system releases:

- Component releases happen per repo using version tags (for example, `v1.8.2`).
- System releases happen in the integration repo (for example, `system-2026.01.30`).

#### Promotion Pipeline:

| Stage                     | Manifest References                                | Gate                     |
| :------------------------ | :------------------------------------------------- | :----------------------- |
| **Development**           | Component PRs merged per repo                      | PR checks pass           |
| **Integration Candidate** | Manifest points to PR SHAs or pre-release tags     | Integration CI validates |
| **Release Candidate**     | Manifest points to RC tags                         | Stakeholder sign-off     |
| **Production**            | Manifest points to stable tags; system release cut | Final validation         |

---

### Step 6: Implement Security Campaigns with GHAS

Use GitHub Advanced Security capabilities as the system of record:

- **Code Scanning**: Vulnerability detection in source code.
- **Dependabot Alerts**: Dependency vulnerabilities.
- **Secret Scanning**: Exposed credentials.

Create a Security Campaign with included repos, clear SLA processes, assigned ownership, and progress and exception reporting.

---

### Step 7: Deploy Orchestration Model

Use the orchestrator/executor pattern for multi-repo operations:

- **Orchestrator** (GitHub App or service): Handles cross-repo discovery, creates standardized issues across repos, and coordinates work via GitHub Projects.
- **Executor** (repo-scoped automated execution): Implements changes and opens PRs within a single repository where it has local context.

#### Safety Model for Automated Execution:

- Use GitHub Apps with least-privilege permissions instead of personal access tokens.
- Enforce repository rulesets and `CODEOWNERS` against automation.
- Rate-limit and stage rollouts across repositories.
- Label all automated artifacts for governance and reporting (`bot:automated-campaign`).

---

### Step 8: Compose a Unified Experience

A single pane of glass for polyrepo engineering combines:

1. **GitHub Projects** as the work hub for cross-repo tracking.
2. **Workflow Governance Dashboards** for enterprise CI visibility.
3. **GHAS Overview & Execution Boards** for security posture and remediation tracking.
4. **Correlation Identifiers** (`CHG-XXXX`, workflow version refs) that tie all views together.

---

## Phased Adoption Roadmap

1. **Phase 1: Standardize and Observe**: Central workflow repo with versioning; runtime telemetry; baseline dashboards.
2. **Phase 2: Integration Layer, Change Sets, and Branching**: Integration repo with manifest; change set templates; branching conventions and rulesets; CI validation and system release tagging.
3. **Phase 3: Orchestration Rollout**: Orchestrator app for cross-repo issues; agent-ready primitives; pilot campaigns.
4. **Phase 4: Security Campaign Automation**: Alert-to-issue automation with deduplication; campaign reporting and SLA management.
