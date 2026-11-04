---
Last updated: 2026-11-03
Domain: security
Version: 1.0
Reviewed by: Architecture & Security Review Board
---

# Dependency Supply Chain Defense Standard

This enterprise knowledge document details the 6-layer defense-in-depth architecture for mitigating dependency supply chain threats (such as typosquatting, malicious post-install lifecycle scripts, and maintainer account takeovers) in the SNP-SMS platform.

---

## 1. Threat Landscape

Dependency-based attacks target the software supply chain through several vectors:

1. **Malicious Lifecycle Scripts**: Exploiting `preinstall`, `install`, and `postinstall` hooks in `package.json` to execute malware upon running `npm install`.
2. **Credential Theft**: Crawling environment variables, SSH keys (`~/.ssh`), cloud tokens (`~/.aws`), and browser profiles.
3. **Worm Replication**: Modifying other local packages and injecting backdoors (e.g. _Shai-Hulud_).
4. **Subtle Patch Exploits**: Compromised maintainer credentials used to publish malicious code disguised as minor patch updates.

---

## 2. The 6 Defense Layers

### Layer 1: Package Lifecycle Script Disabling

- Place `.npmrc` in the project root with:
  ```ini
  ignore-scripts=true
  save-exact=true
  ```
- All CI/CD workflows run `npm ci --ignore-scripts`.
- Legitimate native modules are selectively compiled via `npm rebuild <package-name>`.

### Layer 2: Dev Container Isolation

- Development executed inside isolated Docker containers via `.devcontainer/devcontainer.json`.
- Non-root execution (`node` or `vscode` user) ensures malicious code cannot access host filesystem or credentials.

### Layer 3: Signed Commits with Human-in-the-Loop Verification

- All commits require cryptographic signatures (GPG/SSH).
- Keys require physical touch (biometrics, Touch ID, YubiKey) or passphrases to prevent automated malicious commits.

### Layer 4: Repository Rulesets & Branch Protection

- Required status checks on pull requests:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run verify:supply-chain`
  - `actions/dependency-review-action`
- Mandatory PR approvals with dismissal of stale approvals on new pushes.

### Layer 5: Trusted Publishing & Provenance Attestations

- Package publication utilizes OpenID Connect (OIDC) without long-lived API tokens.
- Packages are signed with SLSA Level 3 provenance (`npm publish --provenance`).
- Dependencies are verified in CI using `npm audit signatures`.

### Layer 6: Continuous Automated Monitoring

- Dependabot alerts with auto-triage rules for automated dependency vulnerability detection.
- Dependency review action blocks high-severity CVEs on PRs.
- Secret scanning with push protection active.
- Human review for all dependency version bumps (never trust SemVer blindly).

---

## 3. Verification Protocol

Verify compliance locally or in CI pipelines:

```bash
npm run verify:supply-chain
```
