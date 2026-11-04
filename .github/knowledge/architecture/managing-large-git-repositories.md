# Managing Large Git Repositories Guide

This guide establishes the mandatory repository scaling, Git LFS asset routing, and clone optimization policies for SNP-SMS contributors and automated coding agents.

---

## 1. Core Repository Scaling Invariants

1. **Individual Blob Limit**: Zero files greater than **50MB** may be committed to Git natively without Git LFS.
2. **Git LFS Routing**: All binary assets (archives, media, models) must be tracked via `.gitattributes`.
3. **Deep Tree Prevention**: Directory nesting must not exceed **12 levels** to prevent Git tree object bloat.
4. **Shallow CI Clones**: CI workflows must utilize shallow (`fetch-depth: 1`) checkouts and dependency caching.
5. **Clean .gitignore**: Build outputs (`node_modules`, `dist`, `.next`, `coverage`) must strictly be ignored.

---

## 2. Verification Command

```bash
npm run verify:large-repo
```
