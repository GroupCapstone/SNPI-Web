# Enterprise Polyrepo Operating Model

This document establishes the GitHub-first operating model for polyrepo engineering when services, applications, or platform components are partitioned across multiple repositories.

---

## Core Strategies

### 1. Integration Layer (Meta-Repo)

- Maintain a dedicated manifest repository (`release.yaml`) mapping every component to an immutable ref (release tag or commit SHA).
- The integration repository strictly contains composition manifests, contract/E2E test suites, and CI workflows.
- Never store component business code in the integration repository.

### 2. Change Set Pattern (`CHG-XXXX`)

- Cross-repo changes are tracked via a unique identifier (e.g. `CHG-1042`).
- A parent tracking issue is opened in the integration repo with scope, acceptance criteria, and rollout sequence.
- Child issues in each component repository link back to the parent change set.
- Branches and PRs include the identifier: `changeset/CHG-XXXX/<topic>`.

### 3. Four Merge Coordination Models

1. **Integration Branch (Release Train)**: High-risk breaking changes target `integration/<train-id>` across repos; composite CI validates before ordered merge to `main`.
2. **Meta-Repo Manifest**: Component merges trigger automated manifest updates; integration CI validates pinned SHAs before system tag cut.
3. **Versioned Artifacts**: Repos publish versioned packages/images; consumers consume explicit versions via Dependabot bumps.
4. **Linked PRs with Merge Gating**: Status checks query GitHub API to verify all linked PRs (`changeset:CHG-XXXX`) are approved and green before a bot merges in strict sequence.

### 4. Reusable Workflows & Governance

- Shared workflows in a centralized repo act as platform products versioned via semantic tags (`@v1`, `@v1.2.3`).
- Telemetry hooks record workflow ref, caller repo, actor, duration, and status.
- Never use floating refs (`@main`) in production workflows or manifests.

### 5. Decoupled Releases

- Individual components release independently on their own cadence (`v1.8.2`).
- System-level releases happen in the integration repository (`system-YYYY.MM.DD`).
