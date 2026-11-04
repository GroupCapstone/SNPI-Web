---
Last updated: 2026-11-03
Domain: design-standards
Version: 1.0
Reviewed by: Design Systems Committee
---

# Mandatory Psychological Design Rules (HCI)

## 1. The 6 Foundational Psychological Invariants

Every UI component created or modified must strictly satisfy these human-computer interaction invariants:

1. **Fitts's Law (Touch Target Bound)**:
   - All interactive touch targets must be at least **44x44px** (minimum 40x40px with 4px hit expansion).
   - Critical CTAs on mobile viewports must span full-width (`w-full`) for zero-distance edge interception.
2. **Hick's Law (Choice Architecture)**:
   - Navigation menus, dropdowns, and segmented action controls must present no more than **5 choices** at a single level.
   - Use progressive disclosure for complex configuration workflows.
3. **Miller's Law (Chunking Threshold)**:
   - Form fields, metric items, and card clusters must not exceed **5 items per group** (`5 ± 2` cognitive chunking limit).
   - Multi-step wizards partition long registration flows into focused steps.
4. **Doherty Threshold (Perceptual Speed)**:
   - System response feedback must trigger within **400ms** (optimistic UI updates, skeleton states, micro-spinners).
   - Animations and transitions must obey the **<300ms timing rule**.
5. **Postel's Law (Robustness Principle)**:
   - Be liberal in what you accept (flexible date parsing, whitespace trimming, phone number normalization) and conservative in what you render.
6. **Zero Emoji Policy**:
   - Strictly NO EMOJIS in code, comments, UI text, or badges. Use clean SVG icons or text status badges (`[PASSED]`, `[COMPLETED]`).
