# Mandatory Psychological Design Rules for AI Agents

## Executive Mandate for AI Coding Agents

When designing, architecting, or implementing any user interface component, page view, interactive control, or data layout in the SNP-SMS repository, every AI coding agent MUST strictly follow and enforce the following human-computer interaction (HCI) cognitive psychology invariants and architectural standards.

---

## 1. The 5 Core Cognitive Psychology Invariants

### 1.1 Fitts's Law: Spatial & Temporal Target Acquisition
- **Mathematical Invariant**: $T = a + b \log_2(2D / W)$
- **Spatial Rule**: Every interactive element (button, link, tab, checkbox, radio, switch, icon control) MUST provide an effective touch target of $\ge 44 \times 44\text{px}$.
- **Pseudo-Element Hit Expansion**: For compact icon buttons ($\le 24\text{px}$), developers and AI agents MUST expand the clickable area to $\ge 44 \times 44\text{px}$ using relative positioning and `::before` pseudo-elements:
  ```css
  .icon-button {
    position: relative;
  }
  .icon-button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 44px;
    min-height: 44px;
  }
  ```
- **Temporal Coyote Time**: In dropdown menus, hover tooltips, and popovers, maintain a $100\text{ms}$ buffer after cursor leave before dismissing the floating container, preventing accidental closure.

### 1.2 Hick's Law: Cognitive Decision Velocity & Progressive Disclosure
- **Mathematical Invariant**: $T = b \log_2(n + 1)$
- **Option Density Rule**: Never present users with an uncurated list of $> 5$ primary choices simultaneously.
- **Progressive Disclosure**:
  - Surface $3$ to $5$ high-frequency defaults as primary options.
  - Defer advanced, secondary, or infrequent options behind searchable pickers, expandable accordion panels, or segmented tabs.
  - Multi-step wizards must separate lengthy workflows into distinct sequential stages with clear progress indicators.

### 1.3 Miller's Law: Working Memory & Information Chunking
- **Baseline Invariant**: Working memory holds $7 \pm 2$ chunks of discrete information.
- **Form Chunking Rule**: Group dense forms (student admissions, guardian details, employee onboarding) into titled visual cards containing $\le 5$ fields per section. Never render continuous unsegmented walls of inputs.
- **Alphanumeric Chunking**: Segment dense identifiers into readable 3–4 character clusters:
  - Phone Numbers: `+855 12 345 678`
  - National IDs / Student Codes: `SNP-2026-0841`
  - Financial Ledgers: `$1,250,000.00`

### 1.4 Doherty Threshold: Perceived Velocity & Flow State
- **Timing Invariant**: Sustained interaction feedback cycle $\le 400\text{ms}$.
- **Tactile Response ($<100\text{ms}$)**: On `pointerdown`, interactive elements must trigger an immediate physical response:
  - Visual Scale: `active:scale-[0.96]` or `active:scale-[0.98]`
  - Background feedback: Instant state layer highlight (`#EFF5FF`)
- **Asynchronous Feedback ($>400\text{ms}$)**: For network requests, API queries, or file uploads:
  - Never display blank white screens or frozen interfaces.
  - Immediately render pulsing skeleton loading shimmers matching the target component dimensions.
  - Use optimistic UI updates for client actions (marking attendance, favoriting, toggling flags) before the backend acknowledgment returns.

### 1.5 Postel's Law: Robustness Principle in Data Entry
- **Principle**: *"Be conservative in what you send, be liberal in what you accept."*
- **Liberal Input Parsing**: Form inputs must generously parse and accept loose human representations:
  - Dates: Accept `"15 Jan 2026"`, `"01/15/2026"`, `"tomorrow"`, or `"2026-01-15"` and normalize automatically.
  - Phone Numbers: Accept spaced, hyphenated, or raw digits and auto-format to E.164.
  - Search Fields: Perform case-insensitive, diacritic-insensitive fuzzy matching.
- **Strict Output Transmission**: Always normalize to strict ISO strings, integers, or standardized enums before dispatching to backend APIs.

---

## 2. The 6-Tier Culinary Component Architecture Invariant

Every AI agent must classify and organize components strictly according to the 6-tier progression:

1. **Tier 01: Ingredients** (Tokens & Atoms): Color hexes (`#0056FF`, `#0A1A4A`), typography scales (Google Sans), spacing (4px grid), elevation z-indexes, motion timing, raw SVGs.
2. **Tier 02: Recipes** (Atomic UI Primitives): Button, Text field, Checkbox, Radio, Switch, Badge, Avatar, Link, Divider, Tooltip.
3. **Tier 03: Entrees** (Compound Organisms): Data Table, Modal Dialog, Navigation Bar/Rail, Accordion, Toast Stack, Carousel, Search Filter Bar.
4. **Tier 04: Templates** (Layout Scaffolds): Viewport wireframes without dynamic data (Dashboard Scaffold, Split Panes, Settings Master-Detail).
5. **Tier 05: Pages** (Concrete Production Views): Live screens with real backend models & RBAC (Campus Analytics, Student Lifecycle, Billing, Attendance).
6. **Tier 06: Cookbook** (Master Design System): Complete governance rulebook, brand blueprint, component manuals, contribution RFCs, maintenance SLAs.

### Mandatory Import Invariant:
- **Strict Downward Dependency Only**: Higher tiers may import lower tiers.
- **PROHIBITION**: A lower tier component (e.g. `Button` or `Modal`) MUST NEVER import an upper tier component (e.g. `DashboardScaffold` or `CampusAnalyticsPage`).
- Components in Tiers 01 to 03 must remain stateless regarding backend API models and accept data purely via React props and callbacks.

---

## 3. Kinetic-First Design Thinking Protocol: The 20 Motion Laws Mandate

Whenever an AI coding agent or developer designs, plans, or implements ANY user interface component, button, modal, card, menu, or interaction, they MUST actively think through the 20 Motion Laws before writing code:

1. **What is the entrance easing curve?** -> Use Law 01 Ease-Out (`MOTION_EASE_OUT = [0.16, 1, 0.3, 1]`) for prompt entry and gentle settling.
2. **How long is the dropdown/select reveal?** -> Use Law 02 Dropdowns at 150-250ms (canonical 200ms `DROPDOWN_ENTRANCE_DURATION = 0.20`).
3. **How are sequential rows/items staggered?** -> Use Law 03 Stagger list rows by 30ms (`STAGGER_LIST_ROW_DELAY = 0.03`).
4. **Does the element compress on press?** -> Use Law 04 Scale to 0.97 on press (`whileTap={{ scale: 0.97 }}` or `active:scale-[0.97]`).
5. **Does the translating knob stretch 12%?** -> Use Law 05 Stretch moving knobs 12% (`scaleX: 1.12` on toggle/translation).
6. **Do secondary details settle after expansion?** -> Use Law 06 Stagger as details settle (`STAGGER_DETAILS_SETTLE_DELAY = 0.04`).
7. **Does spatial movement follow an arc?** -> Use Law 07 Arcs for object movement (subtle curved trajectory peak).
8. **How is operation success confirmed?** -> Use Law 08 Pulse to confirm success (`scale: [1, 1.06, 1]` within 280ms).
9. **What curve handles lateral repositioning?** -> Use Law 09 Ease-in-out for moves (`MOTION_EASE_IN_OUT = [0.65, 0, 0.35, 1]`).
10. **Does the popover/tooltip mount at 0.95 scale?** -> Use Law 10 Start popovers at 0.95 (`POPOVER_INITIAL_SCALE = 0.95`).
11. **Does the overlay expand from the trigger anchor?** -> Use Law 11 Enter from the trigger (`transformOrigin` matched to trigger).
12. **Does it collapse back to the trigger on exit?** -> Use Law 12 Exit to the trigger (`transformOrigin` collapse).
13. **Is everyday bounce eliminated?** -> Use Law 13 No bounce on everyday UI (critically damped spring, `damping: 30, stiffness: 400`).
14. **Is tween lag bypassed while actively held?** -> Use Law 14 Don't tween while held (`duration: 0` for 1:1 tactile response).
15. **Is the exit animation 20% shorter than entrance?** -> Use Law 15 Make exits 20% shorter (`EXIT_DURATION_RATIO = 0.80`, 160ms vs 200ms).
16. **Do old and new views overlap during transition?** -> Use Law 16 Overlap old & new states (`mode="sync"` in `AnimatePresence`).
17. **Are hardware masks used for reveals?** -> Use Law 17 Masks for reveals & colour (CSS `clip-path` masks).
18. **Do icon swaps crossfade with 4px optical blur?** -> Use Law 18 Crossfade icons + blur (`blur(4px)` to `blur(0px)`).
19. **Does boundary dragging yield spring resistance?** -> Use Law 19 Rubber band past bounds (`dragElastic: 0.15`).
20. **Do shared active indicators reuse the same tag?** -> Use Law 20 Reuse the same layoutId (`layoutId="snp-active-pill"`).

All constants, presets, and variant factories MUST be imported directly from `@/lib/motion`.

---

## 4. Checklist-Specific Component Invariants

When implementing any of the 29 core components, the agent must ensure:
1. **Accordion**: Active state icon distinct, smooth grid toggle transition, trigger focus announces content context via `aria-controls` and `aria-expanded`.
2. **Alert**: High contrast (WCAG AAA $\ge 7:1$), role-differentiated styling (info, success, warning, danger), title support, and distinct role icon.
3. **Button**: 4 states (Enabled, Hover, Active, Disabled), $\ge 44\times 44\text{px}$ touch target, sub-300ms transition.
4. **Input Radio**: Associated `<label>` clickable, error text displayed on invalid state, grouped by `name`, keyboard arrow navigation supported.
5. **Progress Bar**: Accessible label (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`), determinable vs indeterminable modes.
6. **Skeleton**: Matches target component shape and dimensions to eliminate layout shifts (CLS), respects `prefers-reduced-motion`.
7. **Switch**: Immediate binary toggle on click/space, `<label>` linked, `aria-checked` synchronized, disabled state visual feedback.
8. **Toast**: Ephemeral auto-dismiss with generous timeout ($\ge 4000\text{ms}$), stacked queue, contextual action CTA (e.g. Undo), keyboard focusable action.
9. **Tooltip**: Non-modal informative text, `aria-describedby` linkage, $100\text{ms}$ coyote time exit buffer.

---

## 5. Cognitive Psychology of the Dual-Theme System: Day & Moon Visual Spectrum

Every AI agent and contributor MUST strictly restrict theme preferences to exactly TWO canonical themes: **Day (White Default)** and **Moon (Dark Mode)**:

### 5.1 Day Theme (White Default)
- **Canvas Base**: Pure White (`#FFFFFF`) with Ice Tint (`#EFF5FF`) subsurface card fills and Soft Lavender (`#CAD3F5`) borders.
- **Photopic Contrast**: High-contrast Deep Navy (`#0A1A4A`) primary text and Slate-700 (`#334155`) secondary text (WCAG AAA $\ge 7:1$).
- **Icon Chromatic Rule**: Keyline Two-Tone icons in Black or Dark Obsidian (`#020617`) alongside headings, with Royal Blue (`#0056FF`) or Emerald Green (`#10B981`) semantic accents.

### 5.2 Moon Theme (Dark Mode / Nocturnal Cognitive Psychology)
- **Why Moon Avoids Pitch Black (`#000000`)**:
  - OLED `#000000` pitch black forces the human pupil into extreme dilation shock when scanning bright content, causing astigmatic halation (optical light bleeding in ~50% of users) and severe ocular fatigue.
  - Moon Theme uses Moonlit Midnight Slate (**Neutral 900 `#0F172A`**) for canvas and Moon Charcoal (**Neutral 800 `#1E293B`**) for cards with Precision Slate borders (**Neutral 700 `#334155`**).
- **Pure White Typography (`#FFFFFF`)**:
  - In Moon mode, all primary headings, body text, and code snippets are strictly **Pure White (`#FFFFFF`)**, achieving $15.8:1$ contrast matching modern code IDEs (VS Code, JetBrains, Cursor), GitHub dark mode, and Antigravity Skills.
  - Secondary text uses Moon Dust (`#94A3B8`, WCAG AAA $\ge 7.2:1$).
- **Pure White Keyline Icons (`#FFFFFF`)**:
  - Gestalt Law of Similarity dictates that heading text and its accompanying icon form a single semantic chunk. Mismatched muddy or colored icons alongside white text introduce visual noise and chromatic aberration.
  - In Moon mode, all heading icons, navigation icons, and control symbols render with **Pure White strokes (`#FFFFFF`)**.
  - In-card status icons use pure white or high-luminance accents (`#34D399` Emerald, `#60A5FA` Azure).
- **Geometric 2px Corner Radius Container**:
  - All icon backing containers maintain single-color fills with strict 2px corner radius (`rounded-[2px]`, `style={{ borderRadius: '2px' }}`) across both Day (`#EFF5FF` fill) and Moon (`#1E293B` fill).

---

## 6. AI Agent Pre-Implementation Quality Checklist

Before writing any new component or view, verify:
- [ ] Is the touch target $\ge 44\times 44\text{px}$? (Fitts's Law)
- [ ] Are visible primary options $\le 5$? (Hick's Law)
- [ ] Are fields grouped into cards of $\le 5$ items? (Miller's Law)
- [ ] Does pointerdown provide feedback within $<100\text{ms}$? (Doherty Threshold)
- [ ] Does the input tolerate loose user formatting? (Postel's Law)
- [ ] Does the component respect one-way downward import rules? (Culinary Invariant)
- [ ] Are all 5 primary brand tokens respected (`#0056FF`, `#0A1A4A`, `#CAD3F5`, `#FFFFFF`, `#EFF5FF`)?
- [ ] Are theme preferences strictly restricted to Day (White Default) and Moon (Dark Mode)?
- [ ] In Moon mode, are headings, code, and UI icons strictly Pure White (`#FFFFFF`)?
- [ ] Do icon containers enforce strict 2px corner radius (`rounded-[2px]`)?
- [ ] Have all applicable 20 Motion Laws been actively considered and implemented via `@/lib/motion`?
- [ ] Strictly ZERO EMOJIS in code, comments, and copy?
