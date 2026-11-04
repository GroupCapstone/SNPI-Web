# ADR-0005: Portable Institutional Ownership & Transfer Protocol

## Status

Accepted

## Context

The repository is officially hosted under `@Tan-Saphea` (`https://github.com/Tan-Saphea/SNPI-SMS`). Hardcoded personal usernames, machine paths, or rigid ownership bindings will break CI/CD workflows, automation tokens, and documentation upon ownership migration.

## Decision

Enforce absolute decoupling and portability across the codebase:

1. **Maintainer Authorization**: Maintainer checks in GitHub Actions workflows verify immutable numeric GitHub user IDs (`.github/maintainers.json`) rather than mutable usernames.
2. **Zero Personal References**: No personal usernames or file system paths (`/Users/...`) allowed in production code, Docker configs, or CI workflows.
3. **Remote Portability**: Git remotes, container registry tags, and documentation URLs must use environment variables or easily re-targetable relative references.
4. **Transfer Protocol**: Upon transferring repository ownership to the target enterprise organization, update the remote URL via `git remote set-url origin <new-org-url>` and append the organization's numeric admin IDs to `.github/maintainers.json`.

## Consequences

- **Positive**:
  - Seamless, zero-downtime repository migration when moving to enterprise ownership.
  - No broken links, secrets, or deployment pipelines post-transfer.
- **Negative**:
  - Requires maintaining numeric GitHub IDs alongside human-readable maintainer documentation.
