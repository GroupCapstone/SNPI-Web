# The 20 Universal Laws of Interface Motion & Micro-Interaction Engineering

Authoritative specification for interface motion, transitions, micro-interactions, spring physics, and kinetic design across the SNP-SMS web application and UI library.

---

## Standby AI Agent: Interface Motion Engineer

- **Agent Name**: `interface-motion-engineer`
- **Role**: Interface Motion & Kinetic Design Specialist
- **Mission**: Enforces, audits, and implements the 20 Universal Laws of Interface Motion across all UI components, dialogs, dropdowns, switches, tabs, cards, and data displays.
- **Standby Command**:
  ```bash
  apply skill motion
  ```

---

## The 20 Universal Motion Laws

| # | Motion Law | Target Specification | Engineering Constant |
| :--- | :--- | :--- | :--- |
| **01** | **Ease-out for entrances** | Entering elements decelerate gently upon arrival; swift start, soft landing | `MOTION_EASE_OUT = [0.16, 1, 0.3, 1]` |
| **02** | **Dropdowns at 150-250ms** | Contextual menus & popovers open in 150ms–250ms (canonical 200ms) | `DROPDOWN_ENTRANCE_DURATION = 0.20` |
| **03** | **Stagger list rows by 30ms** | Sequential list rows, menu items, & tables stagger by 30ms | `STAGGER_LIST_ROW_DELAY = 0.03` |
| **04** | **Scale to 0.97 on press** | Buttons, cards, & triggers compress to 97% scale on active press | `WHILE_TAP_SCALE = 0.97` |
| **05** | **Stretch moving knobs 12%** | Toggle switches & slider knobs stretch 12% along direction of travel | `KNOB_STRETCH_RATIO = 1.12` |
| **06** | **Stagger as details settle** | Nested detail rows settle with progressive micro-delays (40ms) | `STAGGER_DETAILS_SETTLE_DELAY = 0.04` |
| **07** | **Arcs for object movement** | Spatial moves across 2D surfaces follow curved arc paths | `arcKeyframes = { x: [0, 18, 50], y: [0, -12, 0] }` |
| **08** | **Pulse to confirm success** | Success feedback (saved, copied, verified) pulses 1.06x scale | `SUCCESS_PULSE_SCALE = 1.06` |
| **09** | **Ease-in-out for moves** | Repositioning existing visible elements uses ease-in-out curve | `MOTION_EASE_IN_OUT = [0.65, 0, 0.35, 1]` |
| **10** | **Start popovers at 0.95** | Popovers, tooltips, & flyouts scale from 0.95 initial state | `POPOVER_INITIAL_SCALE = 0.95` |
| **11** | **Enter from the trigger** | Overlays anchor transformOrigin directly to trigger coordinates | `originY: 0, originX: 0.5` |
| **12** | **Exit to the trigger** | Overlays collapse back into their originating trigger anchor | `transformOrigin: 'top center'` |
| **13** | **No bounce on everyday UI** | Standard controls have zero overshoot; critically damped spring | `damping: 30, stiffness: 400` |
| **14** | **Don't tween while held** | Direct touch/drag gestures bypass tweening for 1:1 direct tracking | `HELD_DIRECT_INTERACTION = { duration: 0 }` |
| **15** | **Make exits 20% shorter** | Exit animations run 20% faster than entrance animations | `EXIT_DURATION_RATIO = 0.80` (160ms vs 200ms) |
| **16** | **Overlap old & new states** | View transitions overlap crossfade (`mode="sync"`) with no blank pause | `OVERLAP_PRESENCE_CONFIG = { mode: 'sync' }` |
| **17** | **Masks for reveals & colour** | Color sweeps & card reveals use CSS `clip-path` masks | `maskRevealVariants = clipPath: inset(...)` |
| **18** | **Crossfade icons + blur** | Icon swaps crossfade with 4px optical blur to eliminate jumps | `iconCrossfadeBlurVariants = blur(4px) -> blur(0px)` |
| **19** | **Rubber band past bounds** | Surfaces pulled beyond boundary limits experience spring resistance | `RUBBER_BAND_DRAG_CONFIG = { dragElastic: 0.15 }` |
| **20** | **Reuse the same layoutId** | Shared active indicators share exact layoutId for smooth morphing | `SHARED_LAYOUT_IDS.ACTIVE_NAV_PILL` |

---

## Law-by-Law Technical Guidelines

### Law 01: Ease-out for Entrances
- **Formula**: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Rule**: Elements entering the viewport or mounting to the DOM must enter at high velocity and decelerate smoothly. Never use `ease-in` for entrances.

### Law 02: Dropdowns at 150-250ms
- **Timing**: Dropdowns, select boxes, and context menus must complete their reveal in `0.20s` (200ms). Sub-150ms feels jarring; over-250ms feels sluggish.

### Law 03: Stagger List Rows by 30ms
- **Timing**: Use `staggerChildren: 0.03` (30ms). A list of 10 items will finish cascading in `300ms`, creating fluid kinetic rhythm without delaying interaction.

### Law 04: Scale to 0.97 on Press
- **Tactility**: All clickable elements must respond immediately on `whileTap={{ scale: 0.97 }}` or CSS `active:scale-[0.97]`. Provides definitive physical feedback.

### Law 05: Stretch Moving Knobs 12%
- **Kinetic Mass**: Moving knobs (toggle switch thumb, slider thumb) simulate inertia by stretching by `12%` (`scaleX: 1.12`) during horizontal translation, then snapping back to `1.0` upon resting.

### Law 06: Stagger as Details Settle
- **Secondary Motion**: When an accordion or drawer opens, the parent container expands first, followed by internal children settling at `staggerChildren: 0.04` (40ms).

### Law 07: Arcs for Object Movement
- **Natural Physics**: Objects moving diagonally or across distances must follow a parabolic curve. Incorporate a subtle vertical deflection peak (`y: [0, -12, 0]`) rather than straight diagonals.

### Law 08: Pulse to Confirm Success
- **Affirmation**: Confirm state updates (copied clipboard, saved form) with a brief pulse expanding to `1.06` scale for `0.28s`, then returning to `1.0`.

### Law 09: Ease-in-out for Moves
- **Formula**: `cubic-bezier(0.65, 0, 0.35, 1)`
- **Rule**: Moving an already visible element from point A to point B must accelerate gently and decelerate gently.

### Law 10: Start Popovers at 0.95
- **Visual Scale**: Popovers and flyouts mount at `scale: 0.95, opacity: 0`. Never start at `scale: 0` (looks like an explosion) or `scale: 1` (lacks spatial depth).

### Law 11 & 12: Enter from & Exit to the Trigger
- **Spatial Anchoring**: Set `transformOrigin` to match trigger orientation (e.g., `top center` for downward menus, `bottom center` for upward tooltips). Exits must shrink back into the trigger.

### Law 13: No Bounce on Everyday UI
- **Zero Overshoot**: Daily utility components (buttons, dropdowns, tables, tabs) must use critically damped physics (`damping: 30, stiffness: 400`). Prohibit cartoonish spring bounce.

### Law 14: Don't Tween While Held
- **Instant Response**: When dragging or actively holding down an element, set `duration: 0` so the item sticks 1:1 with pointer coordinates without lagging behind.

### Law 15: Make Exits 20% Shorter
- **Duration Ratio**: If entrance takes `200ms`, exit must take `160ms` (`duration * 0.80`). Disappearing elements need less cognitive processing.

### Law 16: Overlap Old & New States
- **Seamless Crossfades**: Use `mode="sync"` in `AnimatePresence`. Allow the incoming view to mount and crossfade while the outgoing view exits.

### Law 17: Masks for Reveals & Colour
- **Zero Shift**: Reveals execute via `clip-path: inset(0% 100% 0% 0%) -> inset(0% 0% 0% 0%)`. Eliminates layout recalculations and DOM thrashing.

### Law 18: Crossfade Icons + Blur
- **Optical Smoothness**: Icon transitions (e.g., Copy -> Check) blend through `filter: blur(4px), opacity: 0` to `filter: blur(0px), opacity: 1`. Prevents geometric edge vibration.

### Law 19: Rubber Band Past Bounds
- **Boundary Elasticity**: For swipeable trays and draggable lists, apply `dragElastic: 0.15`. Provides logarithmic tactile resistance.

### Law 20: Reuse the Same layoutId
- **Morphing Indicators**: Active background pills and underline markers share identical `layoutId="snp-active-pill"`. Framer/Motion interpolates geometry seamlessly.
