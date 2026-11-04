# SNP-SMS Break-Glass Incident Runbook

This runbook outlines the exact procedure for deploying emergency hotfixes during an outage of the primary GitHub platform.

---

## Pre-Conditions

- Primary platform (`github.com`) is unreachable or non-functional.
- An urgent fix, security patch, or launch hotfix is required immediately.

---

## Step-by-Step Incident Execution

### 1. Declare Incident & Freeze Sync

Set the out-of-band lock to prevent automatic synchronization from overwriting work:

```bash
curl -X POST "https://status.snpi.edu.kh/api/v1/sync-lock/snp-sms-monorepo" \
  -H "Authorization: Bearer <OUT_OF_BAND_SECRET>" \
  -d '{"state": "LOCKED", "incident": "INC-XXXX"}'
```

### 2. Identify Production Commit SHA

Find the exact SHA currently deployed in production (e.g., from container tags, `/api/v1/system-health`, or deployment logs). **Never branch from the tip of `main` without verifying.**

### 3. Clone from Resiliency Mirror

```bash
git clone https://mirror-git.snpi.edu.kh/snp-resilience/SNPI-SMS.git
cd SNPI-SMS
git checkout -b hotfix/INC-XXXX <PROD_COMMIT_SHA>
```

### 4. Apply Minimal Patch & Test

- Apply the absolute minimum diff necessary to resolve the incident.
- Run offline verification tests:
  ```bash
  npm run typecheck
  npm run test
  ```
- Obtain peer review from at least one secondary named responder.

### 5. Build & Deploy

Trigger emergency deployment from the mirror's independent runner pool to the target infrastructure (Kubernetes cluster / VPS).

### 6. Post-Incident Reconciliation

When GitHub returns to healthy status:

1. Push `hotfix/INC-XXXX` from the mirror to the primary repository:
   ```bash
   git push origin hotfix/INC-XXXX
   ```
2. Open a standard Pull Request into `main` on GitHub.
3. Review, pass CI, and squash-merge to maintain clean permanent history.
4. Verify the mirror has synchronized the merge commit.
5. Release the out-of-band lock:
   ```bash
   curl -X POST "https://status.snpi.edu.kh/api/v1/sync-lock/snp-sms-monorepo" \
     -H "Authorization: Bearer <OUT_OF_BAND_SECRET>" \
     -d '{"state": "UNLOCKED"}'
   ```
