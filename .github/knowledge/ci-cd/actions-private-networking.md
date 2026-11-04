# GitHub Actions Private Networking Guide

This guide establishes the mandatory enterprise networking standards for running GitHub Actions workflows with access to private infrastructure.

---

## 1. Network Solution Matrix

1. **Azure Private Networking (Primary Standard)**:
   - Recommended for full private VPC/VNet connectivity without public internet exposure.
   - Leverages VNet injection via subnet delegation to `GitHub.Network/networkSettings`.
2. **API Gateway with OIDC (Alternative)**:
   - Used for lightweight REST/HTTP API invocation across public internet edges using cryptographically signed GitHub OIDC tokens.
3. **Static IP Larger Runners (Legacy/Restricted)**:
   - Used only when third-party firewall whitelisting requires static public CIDRs.

---

## 2. Invariants & Policy Guardrails

1. **Subnet Capacity (+20% Rule)**: Always size the delegated subnet such that usable IPs exceed maximum runner concurrency by at least 20%.
2. **No macOS Runners**: macOS hosted runners do not support Azure Private Networking. Enforce Linux or Windows runner labels.
3. **FQDN Filtering**: When securing the VNet through Azure Firewall, include all essential telemetry, container registry, and LFS endpoints.
4. **Automated Verification**: Run `npm run verify:private-network` before deploying infrastructure updates.
