---
name: smart-school-crm-distribution-and-commercial-tiers
description: Authoritative Specification for the Smart School Commercial SaaS Tiers (Starter $100 to Infinity $50,000 Lifetime), Feature Gating Engine (38 Entitlements), CRM Admissions Pipeline, Stationery & Study Material Distribution, Newsletter Publications Desk, and Multi-Tenant Database Services. Trigger whenever configuring SaaS plans, billing tiers, CRM leads, study material distribution counters, newsletter broadcasts, or database backups.
---

# Commercial Subscription Tiers, CRM & Campus Distribution Standard
## 9-Tier Commercial Licensing, Feature Gating & Expanded Enterprise Modules (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-crm-distribution-and-commercial-tiers** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** (`[P-20]`) of the Smart School Enterprise Platform.

This skill governs the platform's commercial licensing structure across 9 subscription tiers (Starter to Infinity Lifetime), programmatic feature entitlement interception across 38 gating flags, and the 4 newly formalized campus enterprise modules: Admissions CRM, Stationery & Study Material Distribution, Campus Newsletter Desk, and Database Services.

---

## 1. Commercial Subscription Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               9-TIER COMMERCIAL SAAS SUBSCRIPTION ARCHITECTURE                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. ENTRY & STARTER TIERS       │ 2. PROFESSIONAL TIERS       │ 3. ENTERPRISE & INFINITY│
│ • Starter: $100/mo (250 stu)   │ • Gold: $500/mo (2,000 stu) │ • Platinum+: $4,000/mo  │
│ • Bronze: $150/mo (500 stu)    │ • Diamond: $1,000/mo (4k)   │ • Enterprise: $6,000/mo │
│ • Silver: $250/mo (1,000 stu)  │ • Platinum: $2,000/mo (10k) │ • Infinity: $50,000 Life│
├────────────────────────────────┴─────────────────────────────┴─────────────────────────┤
│ 4. FOUR EXPANDED ENTERPRISE MODULES                                                    │
│ • CRM Management System: Prospective Leads, Counselor Allocation, Tour Schedules       │
│ • Stationery & Material Distribution: Curriculum Book Packs, Uniforms, Kits            │
│ • Newsletter & Publications: Bilingual Periodicals, Editorial Review, Web/PDF Vault    │
│ • Database Management Services: Automated S3 Snapshots, PITR, Tenant Bulk Data Exports │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Directives for Agents

1. **Directive CD-01 (Feature Gating Entitlement Checks)**:
   - Every protected API route MUST be guarded by the `TenantEntitlementInterceptor`. If a tenant's subscription tier does not include the requested module, the server MUST return `HTTP 402 Payment Required` with the required tier and upgrade URL.
2. **Directive CD-02 (Student Quota Enforcement)**:
   - When processing student enrollments or imports, the service MUST verify `active_student_count < max_students`. When capacity reaches 100%, the system returns `HTTP 403 Forbidden` (`STUDENT_QUOTA_EXCEEDED`).
3. **Directive CD-03 (CRM Pipeline Conversion Tracking)**:
   - Lead lifecycle transitions MUST follow: `NEW_LEAD` -> `CONTACTED` -> `CAMPUS_TOUR` -> `APPLIED` -> `ENROLLED` -> `LOST`. Conversion to `ENROLLED` automatically spawns a student admission record.
4. **Directive CD-04 (Stationery Issuance Clearance)**:
   - Stationery and book pack issuance counters MUST verify that student academic fee accounts are clear or that material fees have been added to the student's billing ledger before releasing items.
5. **Directive CD-05 (Bilingual Newsletter Editorial Gate)**:
   - Newsletters require a two-stage editorial approval: Editor Teacher Review -> Principal Final Sign-Off before publishing to parent mobile feeds.
6. **Directive CD-06 (Automated S3 Database Snapshots)**:
   - Continuous WAL archiving with 5-minute RPO and 35-day Point-in-Time Recovery (PITR) MUST be maintained across all operational tenant databases.
7. **Directive CD-07 (Three-Font Typography Triad)**:
   - English prose in Ubuntu (`font-ubuntu`), Khmer user interfaces in Google Sans Khmer (`font-khmer`) with zero-width spaces (`\u200B`), and diplomas/formal citations in Moul (`font-moul`).
8. **Directive CD-08 (Zero-Emoji Policy)**:
   - Strictly zero emoji characters in UI controls, code, and documentation. All iconography MUST strictly use Google Material Symbols Outlined (`wght 500`).

---

## 3. Core Operational Subsystems Reference

- **Commercial Plans & Billing**: Route `/billing/plans`, Layout Archetype G, Entity `commercial_plans`.
- **CRM Leads & Tours**: Route `/crm/leads`, Layout Archetype B, Entity `crm_leads`.
- **Stationery & Study Material**: Route `/inventory/stationery-distribution`, Layout Archetype A, Entity `stationery_items`.
- **Newsletter & Campus Media**: Route `/communication/newsletters`, Layout Archetype C, Entity `newsletter_editions`.
- **Database Services**: Route `/admin/database-services`, Layout Archetype D, Entity `database_backups`.

---

## 4. Authoritative Specifications

- Master Specification: [`references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md`](../../references/81_COMMERCIAL_TIERS_FEATURE_GATING_AND_EXPANDED_ENTERPRISE_MODULES_SPEC.md)
- Extraction Ledger: [`references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md`](../../references/SCREENSHOTS_TEXT_EXTRACTION_LEDGER.md) (Section 44)
- Master Feature Catalog: [`references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md`](../../references/56_MASTER_FEATURE_CATALOG_AND_IMPLEMENTATION_INVENTORY.md)
- Primary Skills Directory: [`references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md`](../../references/57_PRIMARY_SKILLS_DIRECTORY_AND_ORCHESTRATION_SPEC.md)
- Operational Audit Compendium: [`references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md`](../../references/68_MASTER_SKILLS_CHECKLISTS_AND_OPERATIONAL_AUDIT_COMPENDIUM.md) (Suite 18)
