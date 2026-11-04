# Actions Runner Controller (ARC) Knowledge Guide

This document defines the organization's mandatory standards for deploying and managing self-hosted GitHub Actions runners using Actions Runner Controller (ARC) on Kubernetes.

---

## Key Principles

1. **Dedicated On-Demand Compute**: ARC does not support preemption. Spot instances are strictly forbidden for runner node pools.
2. **Explicit `template.spec`**: In production, `containerMode` must be commented out. Declare explicit runner and sidecar specs to manage security contexts and resource constraints.
3. **Requests Equal Limits**: All containers in runner pods must configure `requests` strictly equal to `limits`.
4. **Single Label per Scale Set**: Target runners by their exact `runnerScaleSetName` label.
5. **Controller HA**: Deploy 3 replicas of the controller manager on tainted infrastructure nodes.
6. **DinD Privilege Separation**: Runner container remains unprivileged; only the `dind` sidecar runs privileged.
7. **Zero Ingress**: No incoming traffic to runner clusters. Use OIDC for cloud authentication.
