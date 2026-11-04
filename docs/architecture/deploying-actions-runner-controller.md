# Deploying Actions Runner Controller (ARC) for SNP-SMS

> Authoritative enterprise deployment guide and operational reference for running self-hosted GitHub Actions runners on Kubernetes clusters using Actions Runner Controller (ARC).

---

## 1. Architectural Invariants

- **100% On-Demand Compute**: ARC cannot recover from node preemption or spot termination. All runner node pools must strictly use on-demand instances.
- **Explicit `template.spec`**: Never use generic `containerMode` templates in production. Declare complete security contexts, resource requests, and limits explicitly.
- **Guaranteed QoS (Requests == Limits)**: Set container requests equal to limits (`cpu: 2000m`, `memory: 4096Mi`). Avoid memory overcommit to eliminate OOMKill job failures.
- **Controller Isolation**: Run 3 replicas of the controller manager on tainted infrastructure nodes.
- **Zero Cluster Ingress**: Runner pods only initiate outbound HTTPS connections to GitHub's Actions control plane.

---

## 2. Scale Set T-Shirt Sizing in SNP-SMS

| Scale Set Name            | Target Workloads                               | CPU (Req/Limit)          | Memory (Req/Limit)         | Manifest                            |
| :------------------------ | :--------------------------------------------- | :----------------------- | :------------------------- | :---------------------------------- |
| `snp-sms-runner-standard` | Lint, typecheck, Next.js build, unit tests     | `2000m` / `2000m`        | `4096Mi` / `4096Mi`        | `arc-runner-scaleset-standard.yaml` |
| `snp-sms-runner-dind`     | Docker builds, containerized integration tests | `2000m` + `1000m` (dind) | `4096Mi` + `2048Mi` (dind) | `arc-runner-scaleset-dind.yaml`     |

---

## 3. Production Deployment Commands

```bash
# 1. Install or upgrade controller
helm upgrade --install arc-controller \
  --namespace arc-systems \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller \
  --values apps/backend/infrastructure/k8s/arc/arc-controller-values.yaml

# 2. Deploy standard runner scale set
helm upgrade --install snp-sms-runners-standard \
  --namespace arc-runners \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set \
  --values apps/backend/infrastructure/k8s/arc/arc-runner-scaleset-standard.yaml

# 3. Verify configuration compliance
npm run verify:arc
```
