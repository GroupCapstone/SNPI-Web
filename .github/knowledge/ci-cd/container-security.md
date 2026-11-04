---
Last updated: 2026-11-03
Domain: ci-cd
Version: 1.0
Reviewed by: DevOps & Platform Engineering Board
---

# Container Security Standards

## 1. Non-Root Execution

- **Unprivileged User**: Docker containers must execute under an explicit unprivileged user (`node` or custom `appuser`), never `root`:
  ```dockerfile
  USER node
  ```
- **Filesystem Permissions**: Application directories are owned by the non-root user with read-only root filesystems where possible.

## 2. Multi-Stage Alpine Builds

- **Minimal Attack Surface**: Production images build in a multi-stage Dockerfile based on Alpine Linux, discarding build tools, compilers, and development dependencies.
- **Dependency Isolation**: Production images contain strictly production `node_modules` (`npm prune --production`).

## 3. Vulnerability Scanning

- **Container Scanning**: Container images must pass Trivy or GitHub Secret/Vulnerability scanning with zero High or Critical CVEs before container registry promotion.
