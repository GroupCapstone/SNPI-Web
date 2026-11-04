# Architectural Specification: Dependency Supply Chain Defense

> **Standard Code**: `ARCH-SUPPLYCHAIN-01`  
> **Authors**: Ken Muse & Josh Johanning  
> **Target System**: SNP-SMS Full-Stack Monorepo  
> **Primary Safe Folder**: `.agents/skills/dependency-supply-chain-defense/`  
> **Verification CLI**: `npm run verify:supply-chain`

---

## 1. Architectural Motivation

Third-party dependencies represent an external attack surface. A compromised transitive dependency can execute arbitrary code on developer workstations and CI runners through installation hooks.

This specification implements the **6-Layer Defense-in-Depth Model** defined by Ken Muse and Josh Johanning:

```
[Layer 1: Disabled Scripts (.npmrc)]
       │
[Layer 2: Dev Container Isolation (.devcontainer)]
       │
[Layer 3: Signed Commits (Touch ID / Passphrase)]
       │
[Layer 4: Branch Rulesets & Status Checks]
       │
[Layer 5: OIDC Trusted Publishing & Attestations]
       │
[Layer 6: Dependabot & Continuous Monitoring]
```

---

## 2. File & Configuration Matrix

| Layer       | Configuration File                | Architectural Standard                            |
| :---------- | :-------------------------------- | :------------------------------------------------ |
| **Layer 1** | `.npmrc`                          | `ignore-scripts=true`, `save-exact=true`          |
| **Layer 2** | `.devcontainer/devcontainer.json` | Non-root `node` container, volume isolation       |
| **Layer 3** | `.gitconfig` / Ruleset            | Signed commits with biometric/passphrase prompt   |
| **Layer 4** | `.github/rulesets/`               | PR reviews, status checks, zero bypass            |
| **Layer 5** | Release workflows                 | OIDC token exchange, `npm publish --provenance`   |
| **Layer 6** | `.github/dependabot.yml`          | Automated daily updates, dependency review action |

---

## 3. Operational CLI

```bash
npm run verify:supply-chain
```

Evaluates all 6 layers and ensures zero critical supply chain misconfigurations.
