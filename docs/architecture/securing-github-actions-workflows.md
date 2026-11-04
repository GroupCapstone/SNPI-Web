# Securing GitHub Actions Workflows Architecture

> Authoritative architectural specification for GitHub Actions workflow security, 40-character commit SHA pinning, least-privilege token permissions, and script injection defense for SNP-SMS.

---

## 1. Executive Summary

CI/CD systems provide remote code execution (RCE) capabilities. Securing workflows protects build pipelines, deployment credentials, and application artifacts.

```
+-----------------------------------------------------------------------------------------+
| Workflow Hardening Invariants                                                           |
+--------------------------+--------------------------------------------------------------+
| Action SHA Pinning       | All external actions pinned to 40-character commit SHAs      |
| Least-Privilege Scoping  | Root `permissions: {}`, explicit minimal job permissions    |
| Script Injection Defense | Zero `${{ ... }}` evaluated directly in `run:` shell lines  |
| Environment Intermediary | All dynamic event context passed via step `env:` variables   |
| Pwn Request Elimination  | No untrusted fork code checked out in `pull_request_target`  |
| Zero Public Self-Hosted  | Self-hosted runners strictly barred from public repositories |
+--------------------------+--------------------------------------------------------------+
```

---

## 2. Pinned Action Catalog

| Action                             | Pinned Commit SHA                          | Version Reference |
| :--------------------------------- | :----------------------------------------- | :---------------- |
| `actions/checkout`                 | `11bd71901bbe5b1630ceea73d27597364c9af683` | `v4.2.2`          |
| `actions/setup-node`               | `39370e3970a6d050c480ffad4ff0ed4d3fdee5af` | `v4.1.0`          |
| `actions/upload-artifact`          | `b4b15b8c7c6ac21ea08fcf65892d2ee8f75cf882` | `v4.4.3`          |
| `actions/dependency-review-action` | `3b139cfc5fae8b618d3eae3675e383bb1769c019` | `v4.5.0`          |
| `actions/labeler`                  | `8558fd74291d67161a8a78ce36a881fa63b766a9` | `v5.0.0`          |
| `actions/stale`                    | `28ca1036281a5e5922ead5184a1bbf96e5fc984e` | `v9.0.0`          |
| `github/codeql-action`             | `48ab28a6f5dab2a725c10012ba114445d8b26340` | `v3.28.0`         |
| `docker/setup-buildx-action`       | `6524bf65af31da8d45b59e8c27de4bd072b392f5` | `v3.8.0`          |
| `docker/build-push-action`         | `ca877d9245402d153c6ed5f181f94c830878e62f` | `v6.13.0`         |
| `trufflesecurity/trufflehog`       | `808940e53a39f6fb87002b8d0033ad03c193e144` | `v3.88.2`         |

---

## 3. Verification

```bash
# Audit all workflows for pinning and script injection
npm run verify:workflows
```
