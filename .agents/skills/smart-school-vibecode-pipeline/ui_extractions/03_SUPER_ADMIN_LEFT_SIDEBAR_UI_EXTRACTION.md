# Module 03: Super Admin Left Sidebar Navigation Architecture - UI Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 03: Super Admin Left Sidebar Navigation Architecture`
- **Associated Primary Screenshots**: [`media_1789160127957.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160127957.png), [`media_1789160136733.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160136733.png)
- **Authoritative CRUD Reference**: [`references/03_SUPER_ADMIN_LEFT_SIDEBAR_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/03_SUPER_ADMIN_LEFT_SIDEBAR_SPEC.md)
- **UI Layout Archetype**: **Archetype F: Navigation Rail & Collapsible Accordion Sidebar**

---

## Component Layout & Visual Positioning Architecture

### 1. Extracted Text Content & Navigation Hierarchy
- **Header Section**:
  - `Current Session: 2026-27` (Tactile pill badge with calendar icon).
  - `Quick Links [grid_view]` (Direct trigger button opening Universal Megamenu Drawer).
- **32-Item Ordered Vertical Accordion Menu**:
  1. Front Office
  2. Student Information
  3. Fees Collection
  4. Online Course
  5. Behaviour Records
  6. Multi Branch
  7. Gmeet Live Classes
  8. Zoom Live Classes
  9. Income
  10. Expenses
  11. QR Code Attendance
  12. CBSE Examination
  13. Examinations
  14. Attendance
  15. Online Examinations
  16. Academics
  17. Annual Calendar
  18. Lesson Plan
  19. Human Resource
  20. Communicate
  21. Download Center
  22. Homework
  23. Library
  24. Inventory
  25. Student CV
  26. Transport
  27. Hostel
  28. Certificate
  29. Front CMS
  30. Alumni
  31. Reports
  32. System Setting

### 2. Layout & Visual Positioning Architecture
- **Screen Layout Structure**:
  - **Position**: Left viewport margin, fixed/sticky, full viewport height (`100vh`).
  - **Expanded Width**: `260px` with complete text labels, chevron expanders, and badge counters.
  - **Collapsed Mini-Rail Width**: `72px` showing only centered Google Material Symbols with tooltip flyouts on hover.
  - **Z-Index Layering**: `z-index: 40` (below modals and drawers, above content area).
  - **Active Item Indicator**: Solid royal amethyst purple background (`#8E24AA`), white icon, white bold text, and 4px right border accent.
  - **Accordion Expand/Collapse Animation**: Smooth 180ms ease-out height transition for child sub-menus.

### 3. Reusable UI Components Identified
- **Atomic Components**:
  - `SidebarItemPill`: Navigation link button with leading Material Symbol icon, label, chevron, and active status state.
  - `MiniRailTooltip`: Flyout hover badge rendering the menu label when sidebar is in collapsed mini-rail mode.
  - `SessionContextBadge`: Compact header widget displaying academic year context.
- **Composite Components**:
  - `LeftSidebarNavigationContainer`: Primary container managing scrollable accordion state, scroll position persistence, and collapse toggle.
  - `AccordionSubMenuList`: Nested animated list for child routes.

### 4. Component Placement & Architecture Strategy
- **Recommended Storage Directory**: `src/components/ui/navigation/LeftSidebar/`
- **Component Props & Config Schema (Brainstorming Specification)**:
  - `isCollapsed`: boolean (Controls 260px expanded vs 72px mini-rail mode).
  - `activeSlug`: string (Currently active route path).
  - `currentSession`: string (e.g. "2026-27").
  - `onToggleCollapse`: callback function.
  - `onOpenQuickLinks`: callback function.
- **Engineering Brainstorming Notes**:
  - Implement smooth scrollbar styling (`overflow-y: auto`, `scrollbar-width: thin`).
  - Ensure zero emojis and zero Unicode symbols; strictly use official Material Symbols (`admin_panel_settings`, `school`, `payments`, etc.).
  - Preserve expanded accordion sections in `localStorage` across page reloads.
