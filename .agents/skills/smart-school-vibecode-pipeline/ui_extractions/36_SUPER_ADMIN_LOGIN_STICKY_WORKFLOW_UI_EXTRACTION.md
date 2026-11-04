# Module 36: Super Admin Login & Sticky Workflow - UI Extraction Specification
## Smart School Enterprise Platform - Autonomous Agent UI Support Skill

---

### Module Architectural Overview

- **Target Module**: `Module 36: Super Admin Login Sequence & Sticky Agent Workflow`
- **Associated Primary Screenshots**: [`media_1789160127957.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160127957.png), [`media_1789160136733.png`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/MEDIA/screenshots/media_1789160136733.png)
- **Authoritative CRUD Reference**: [`references/36_SUPER_ADMIN_LOGIN_AND_STICKY_WORKFLOW_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/36_SUPER_ADMIN_LOGIN_AND_STICKY_WORKFLOW_SPEC.md)
- **UI Layout Archetype**: **Archetype G: Multi-Metric Command Center Dashboard & Sticky Shell**

---

## Screen Layout & Sticky Positioning Architecture

### 1. Extracted Text Content
- **Top Sticky Bar**: `SMART SCHOOL` / `Mount Carmel School` / Search box: `Search By Student Name` / Currency: `USD` / Flag: `US` / Context switcher / Quick action icons / `Admin User` avatar.
- **Left Sticky Sidebar**: `Current Session: 2026-27` / `Quick Links [grid_view]` / 32 Menu Accordions.
- **Dashboard Metrics (Tier 1)**: `Fees Awaiting Payment [2/7]`, `Staff Approved Leave [1/3]`, `Student Approved Leave [3/10]`, `Converted Leads [1/8]`, `Staff Present Today [0/9]`, `Student Present Today [37/89]`.
- **Charts & Gauges (Tier 2)**: `Fees Collection & Expenses For September 2026`, `Income - September 2026`, `Fees Collection & Expenses For Session 2026-27`, `Expense - September 2026`.
- **Progress Overviews (Tier 3)**: `Fees Overview` (Unpaid, Partial, Paid), `Enquiry Overview` (Active, Won, Passive), `Library Overview` (Due, Returned), `Student Today Attendance` (Present, Late, Absent, Half Day).
- **Tactical Counters (Tier 4)**: `Monthly Fees Collection` ($6,205.00), `Monthly Expenses` ($2,750.00), `Student` (89), `Student Head Count` (88), `Admin` (1), `Teacher` (4), `Accountant` (1), `Librarian` (1), `Receptionist` (1), `Super Admin` (1).

### 2. Layout & Visual Positioning Architecture
- **Layer 1 (Top Navigation Bar)**: Fixed at `top: 0`, full width, height `60px`, `z-index: 50`.
- **Layer 2 (Left Sidebar Rail)**: Fixed at `left: 0`, `top: 60px`, height `calc(100vh - 60px)`, width `260px` (expanded) or `72px` (mini-rail), `z-index: 40`.
- **Layer 3 (Main Content Viewport)**: Margins `left: 260px` (or `72px`), `top: 60px`, `overflow-y: auto`, height `calc(100vh - 60px)`.
- **Layer 4 (Megamenu & Modal Overlays)**: Fixed full-screen drawers at `z-index: 100` with dark translucent backdrops.

### 3. Reusable UI Components Identified
- `TopStickyNavigationBar`: Universal header with brand logo, search input, currency switcher, and profile dropdown.
- `LeftStickySidebar`: Collapsible navigation rail with session badge and quick links trigger.
- `LiveTelemetryCard`: Operational KPI card with status counts and progress bar.
- `MultiProgressBarOverview`: Stacked segmented progress bar for status percentages.
- `TactileCounterCard`: Compact statistic card with large bold numbers and icon glyphs.

### 4. Component Placement & Architecture Strategy
- **Recommended Storage Directory**: `src/components/ui/shell/` and `src/components/ui/dashboard/`
- **Props & State Management**:
  - `userRole`: "SUPER_ADMIN"
  - `activeSession`: "2026-27"
  - `activeBranch`: null (Universal) or string (UUID)
  - `activeCurrency`: "USD"
- **Engineering Brainstorming Notes**:
  - Ensure zero emojis; strictly use Google Material Symbols.
  - Sticky shell must handle dynamic responsive breakpoints gracefully (auto-collapsing to mini-rail below 1200px and off-canvas drawer below 768px).
