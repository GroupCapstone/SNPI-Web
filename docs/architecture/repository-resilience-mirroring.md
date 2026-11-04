# Repository Resilience & Mirroring Architecture

> Authoritative architectural specification for warm repository mirroring, out-of-band sync locks, and emergency break-glass deployment paths for SNP-SMS.

---

## 1. Principles & Failure Domain Isolation

- **Warm Narrow Mirror**: We mirror only `refs/heads/main` and release tags (`refs/tags/*`) to an independently hosted Git service located in an isolated failure domain.
- **Out-of-Band Sync Lock**: Before every push to the mirror, sync jobs verify the lock status endpoint. If an active incident is declared (`LOCKED`), sync halts to avoid clobbering emergency work.
- **Immutable Commit Baseline**: Hotfixes must originate from the verified production commit SHA.
- **Post-Incident Reconciliation**: All changes deployed from the mirror must be pushed to GitHub via Pull Request to maintain an unbroken audit trail.

---

## 2. Verification Command

```bash
# Verify mirror freshness and out-of-band lock state
npm run verify:mirror
```
