# GitHub Repository Threat Model Architecture

> Authoritative architectural specification for repository threat modeling, source integrity defense, and supply chain security for SNP-SMS based on the GitHub Well-Architected Framework and SLSA v1.0.

---

## 1. Executive Summary

This architecture establishes defenses against the 8 primary threat vectors (T-01 through T-08) targeting source repositories and software supply chains:

```
+----------------------------------------------------------------------------------+
| Threat Matrix & Project Defenses                                                 |
+--------+------------------------------------+------------------------------------+
| Threat | Description                        | SNP-SMS Mitigation Control         |
+--------+------------------------------------+------------------------------------+
| T-01   | Secret Exposure in Repositories    | Secret Scanning + Push Protection  |
| T-02   | Unauthorized Private Repo Access   | Private by default + EMU federation|
| T-03   | Danger Zone Tampering (Delete/Move)| Restricted to Enterprise Owners    |
| T-04   | Commit History Modification/Delete | Ruleset: Block Force Push & Delete |
| T-05   | Unauthorized Changes to Main       | Required PRs + 6-step Status Checks|
| T-06   | Self-Approval / Four-Eyes Bypass   | Prohibit Author Approve + >=1 Peer |
| T-07   | Account & Commit Spoofing          | 2FA Enforcement + GPG Commit Signs |
| T-08   | Workflow & Action Injection        | Immutable SHA Pinning + Least Priv |
+--------+------------------------------------+------------------------------------+
```

---

## 2. Ruleset Enforcement

SNP-SMS protects `main` and `release/*` branches using declarative GitHub Rulesets:

- `infrastructure/security/threat-model/repository-ruleset-threat-defense.json`
- Pre-deployment verification gate integration (`npm run verify:threat-model`).

---

## 3. Verification

```bash
# Execute automated threat model defense audit
npm run verify:threat-model
```
