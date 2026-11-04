# Repository Resilience Mirroring Guide

This document defines the organization's mandatory standards for maintaining an independent break-glass Git repository mirror.

---

## Key Invariants

1. **Narrow Refspec**: Sync only `refs/heads/main` and `refs/tags/*`. Never perform full unvetted branch mirroring.
2. **Out-of-Band Lock**: Always check the external sync lock endpoint before pushing to the mirror.
3. **Immutable Recovery**: Hotfixes must branch from the exact production commit SHA.
4. **Independent Failure Domain**: Runners, registries, and credentials for the mirror must survive a primary GitHub outage.
5. **Reconciliation**: Merge hotfixes back to the primary environment through standard PR workflow once restored.
