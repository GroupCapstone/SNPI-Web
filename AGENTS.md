<!-- markdownlint-disable -->
# SNP-SMS Full-Stack Monorepo Agent Rules

These rules apply to every AI coding agent and human contributor working in the SNP-SMS repository. They are project rules, not instructions for one vendor, model, IDE, or agent framework.

---

## 0. Mandatory Zero-Auto-Commit Workflow Rule (ABSOLUTE RULE)

- **Never auto-commit during a conversation.** Complete all requested code, file, and configuration changes within the conversation turn without staging or committing to git.
- **Zero unprompted `git add` / `git commit` / `git commit -am` calls.** Never commit at the end of a turn, after completing a task, or for convenience.
- **Commits are only allowed when the user gives an explicit direct command** such as `commit`, `git commit`, `checkpoint`, `push`, or `release`. Use the push/release workflow in section 5 when commanded.
- **Local changes accumulate across the conversation and are only committed on explicit user command.**

---

## 1. Task-Scoped Context and Skill Routing

- Follow these repository rules and the nearest nested `AGENTS.md` for the files being changed.
- Before code, package, configuration, or repository-structure changes, read `.agents/skills/snp-sms-monorepo-architecture/SKILL.md` and `.agents/skills/snp-sms-code-security-quality-policy/SKILL.md`.
- Read `.agents/skills/snp-sms-changelog-workflow/SKILL.md` when changing skills, architecture, or features. Read `.agents/skills/snp-sms-push-checkpoint-workflow/SKILL.md` only when the user explicitly requests a push, publish, or checkpoint.
- For UI or design work, read `.agents/skills/snp-sms-design-standards/SKILL.md` and only the applicable design manuals.
- Inspect `packages/shared/src/index.ts`, backend modules, frontend routes, and workspace configuration only when the task touches their contracts or behavior; do not load complete directories by default.
- Resolve the most specific skill through `.agents/skills/INDEX.md`. Read that source and only its task-relevant references. Keep every existing skill and reference available; do not preload unrelated resources.
- When asked which skill to apply, give the exact `apply skill <alias>` command from the index. Never guess an alias. For work that uses a skill, identify the exact skill in the task update or final report.

---

## 2. Core Architecture & Monorepo Boundaries

- **Monorepo Topology**: npm workspaces with unified root dependencies and lockfile.
  - `apps/backend`: Express 5, TypeScript, MongoDB Replica Set (`rs0`), 7-layer modular monolith API.
  - `apps/frontend`: Next.js (App Router), React 19, Tailwind CSS, Radix UI.
  - `packages/shared` (`@snp/shared`): Canonical auth contracts, RBAC permissions, implied scopes, DTOs, and validation schemas.
  - `packages/tsconfig` (`@snp/tsconfig`): Shared TypeScript compiler configurations.
  - `packages/eslint-config` (`@snp/eslint-config`): Shared linting configurations.
- **Serverless / Container Hybrid Deployment**:
  - Frontend deploys serverless (e.g. Vercel / Edge CDN). Proxies `/api/v1/*` server-side via `next.config.ts` rewrites to `BACKEND_INTERNAL_URL` (zero CORS issues).
  - Backend runs as a long-running container (e.g. Docker / VPS / ECS) maintaining persistent MongoDB connection pools and ACID transaction sessions.
- **Preservation of Contracts**:
  - Never alter existing REST API paths, query params, HTTP status codes, or payload formats unless explicitly commanded by the user.
  - Maintain all 193 REST API endpoints across the 47 domain modules.

---

## 3. Strict Development Standards

- **Zero Emojis**: Under no circumstances should emojis be used in code, comments, docstrings, commit messages, PR descriptions, or agent responses. Use clean textual badges: `[PASSED]`, `[FAILED]`, `[WARNING]`, `[COMPLETED]`.
- **7-Layer Backend Pattern**: Every domain module in `apps/backend/src/modules/<domain>/` must adhere to:
  `route -> controller -> service -> repository -> model -> validation -> types`
- **Single Source of Truth**: All permission codes (`SYSTEM_PERMISSIONS`), role definitions (`DEFAULT_CORE_ROLES`), and implied scope checks must be imported from `@snp/shared`. Do not duplicate permission strings or role enums.
- **Multi-Tenant & Data Scoping**: Every query and write must strictly enforce `schoolId`, `branchId`, and user RBAC permissions server-side. Never trust client-supplied scopes.
- **Cryptographic Security**: All signature checks, webhook verifications, and token hash comparisons must execute via constant-time `crypto.timingSafeEqual`. Plaintext credentials and placeholder secrets are strictly forbidden.
- **Input Sanitization & Injection Defense**: Every HTTP endpoint must validate inputs using strict Zod schemas. Mongoose queries must run with `strictQuery: true`, rejecting raw unescaped regex and operator injections.
- **Zero Display of Concrete Credentials or Identifiers in Docs & UI (MANDATORY)**: Never display, embed, or expose concrete user credentials, identity IDs, real or mock staff/admin email accounts (e.g. `admin@snp.edu.kh`, `info@snp.edu.kh`), concrete passwords (`YourPassword123`), secret tokens, or authentication IDs in documentation, sample payloads, API references, or UI code. Always use sanitized abstract placeholder tokens (`<SERVICE_ACCOUNT_IDENTIFIER>`, `<SECURE_AUTHENTICATION_CREDENTIAL>`, `<AUTHORIZED_USER_EMAIL>`, `<CONTACT_EMAIL_PLACEHOLDER>`, `<JWT_ACCESS_TOKEN_SAMPLE>`, `<USER_UUID>`, `<BRANCH_ID>`).
- **Mandatory Display-Only Public API & Syndication Standard — Zero Access Mode & Zero Credential Exposure (CRITICAL RULE)**:
  - **Never Design "Access Mode" or Access-Granting Columns**: Under no circumstances should tables or UI views include an "ACCESS MODE" column, "[Lock] Read-Only" badges, or UI components that suggest user access rights, permissions, or access gates.
  - **Strictly Display-Only Presentation**: All public catalogs, syndication feeds, and embed previews must strictly be visual, display-only guides showing clean data fields only (`Code`, `Title`, `Schedule`, `Capacity`, `Status`).
  - **Zero Credential Headers or Inspection Code**: Never display, instruct, or include credential headers (`X-Subscription-Key`, auth tokens, secret keys) or credential flags (`withCredentials: true`) in client-side code snippets or documentation. Endpoints must be presented purely as standard public display feeds without user credential inspection.
- **Mandatory Prohibition of Dark Navy / Black Terminal Box Aesthetics in Documentation (CRITICAL RULE)**:
  - **Never Design Dark Terminal Containers**: Under no circumstances should logs, telemetry monitors, event stream cards, or inspection boxes be designed with solid dark navy (`#0A1A4A`), black, or dark terminal background styles.
  - **Light-Day-First Modern UI**: All telemetry monitors, packet streams, and documentation cards must strictly use **Pure White (`#FFFFFF`)** or **Ice Tint (`#EFF5FF`)** backgrounds with Soft Lavender borders (`#CAD3F5`), Deep Navy (`#0A1A4A`) high-contrast text, and Royal Blue (`#0056FF`) accent pills.
  - **Zero Dark Hacker Inversion**: Never invert page sections into high-contrast dark terminal boxes or hacker consoles in documentation views.
- **Mandatory Brand Color Tokens & Anti-Muddy Gray / Anti-Blur / High-Contrast Typography Rule (CRITICAL RULE)**:
  - **Zero Muddy Gray, Slate Containers, or Blur Styles**: Under no circumstances should components, cards, tables, or callouts be styled with muddy gray (`#64748B`, `#475569`), dark slate blocks, or blur backgrounds. Never use solid black or dark slate (`bg-slate-900`, `bg-black`) for buttons or badges in UI library components.
  - **Zero Washed-Out, Pale Gray, or Hidden Text**: Never design components where text fades, washes out, or lacks sufficient contrast. All body text, data table rows, headers, and values on light surfaces (`#FFFFFF`, `#EFF5FF`, `#E3E7FC`) must maintain high contrast (WCAG AAA >= 7:1) using **Deep Navy (`#0A1A4A`)** or **Slate-900 (`#0F172A`)**. Text color must NEVER match or blend into the background.
  - **Exclusively Use the 5 Primary Brand Tokens**:
    1. `01 #0056FF` Royal Blue — Primary brand base, active pills, core CTAs, active highlights.
    2. `02 #2277FF` Azure Blue — Interactive accents, illuminated hover states, secondary highlights.
    3. `03 #E3E7FC` Soft Lavender — Surface micro-tints, subtle borders (`#CAD3F5`), badge fills.
    4. `04 #FFFFFF` White — Document canvas base, card foundations, clean backgrounds.
    5. `05 #EFF5FF` Ice Tint — Subsurface card fills, segment track fills, hover backdrops.
    - Typography Token: Deep Navy `#0A1A4A` (primary headings & text) / Slate-900 `#0F172A` / `#334155` (secondary descriptive copy). Never use light gray on light surfaces.
  - **Zero Accidental Dark Mode Inversion**: Never allow media-query dark styles or `dark:*` Tailwind classes to invert UI components into dark slate/muddy gray boxes or render washed-out white/light gray text on white tables.
- **Mandatory Dual-Theme Preferences: Day & Moon Visual Spectrum Standard (CRITICAL RULE)**:
  - **Exactly Two Canonical Themes**: The system strictly supports only two theme choices: **Day (White Default)** and **Moon (Dark Mode)**. All extraneous multi-theme variants are eliminated.
  - **Day Theme (White Default)**:
    - Canvas: Pure White (`#FFFFFF`) foundation with Ice Tint (`#EFF5FF`) subsurfaces and Soft Lavender (`#CAD3F5`) borders.
    - Typography: High-contrast Deep Navy (`#0A1A4A`) primary text and Slate-700 (`#334155`) secondary text.
    - Icons: Black or Dark Obsidian (`#020617`) and Royal Blue (`#0056FF`) keyline icons with single-color 2px corner containers (`rounded-[2px]`).
  - **Moon Theme (Dark Mode / Nocturnal Cognitive Psychology)**:
    - Canvas: Moonlit Midnight Slate (`#0F172A`, Neutral 900) foundation with Moon Charcoal (`#1E293B`, Neutral 800) subsurfaces and Precision Moonlit Slate (`#334155`, Neutral 700) borders.
    - Why Moon Over Pitch Black (`#000000`): Pure `#000000` forces the iris into extreme dilation shock against bright content, inducing astigmatic halation and ocular fatigue. Neutral 900 (`#0F172A`) absorbs ambient light without glare spikes.
    - Typography: Strictly **Pure White (`#FFFFFF`)** primary text and headings (15.8:1 contrast), matching modern code IDEs (VS Code, Cursor), GitHub dark mode, and Antigravity Skills. Secondary text uses Moon Dust (`#94A3B8`, 7.2:1 AAA contrast).
    - **Icons in Moon Mode**: Strictly **Pure White (`#FFFFFF`)**! All heading icons, navigation icons, and UI symbol strokes adapt to pure white (`#FFFFFF`) to achieve 1:1 Gestalt typographic harmony with white text and eliminate chromatic visual noise. In-card status icons use pure white or high-luminance accents (`#34D399` emerald, `#60A5FA` azure).
    - Icon Containers: Single-color backing fill (`#1E293B` Moon or `#EFF5FF` Day) with strict 2px corner radius (`rounded-[2px]`, `style={{ borderRadius: '2px' }}`).
- **Mandatory Universal Default Black / Dark Fill Rule for All Icons (CRITICAL RULE)**:
  - **Universal Default Black / Dark Fill in Day Mode**: All Keyline Two-Tone icons across `SNPI-Web` in Day mode MUST strictly use Black or Dark Obsidian (`#020617` / `text-[#020617]` / Slate-950) fill and stroke by default alongside titles and headings.
  - **Pure White Icons in Moon Mode and on Blue Surfaces**: On solid Brand Blue (`#0056FF`, `bg-primary`, active blue buttons) or Moon dark mode surfaces (`#0F172A` / `#1E293B`), icons strictly adapt to Pure White (`#FFFFFF`).
  - **Single-Color Container Background with 2px Corners**: Icon containers must maintain 100% transparent or clean single-color background fills with strict 2px corner radius (`rounded-[2px]`), never multi-color rainbow blocks or distracting shape fills behind icons.
  - **Proportional Size**: Icons must maintain 1:1 visual proportionality with accompanying titles/headings, never appearing in paragraph text or descriptions.
- **Mandatory Prohibition of Borders Around Icons (ABSOLUTE RULE)**:
  - **Zero Bordered Icon Containers**: Under no circumstances should icons be enclosed in bordered boxes, bordered squares, bordered chips, or bordered squircle wrappers (e.g. `border border-slate-200`, `border-[#CAD3F5]`, `border`).
  - **Pure Borderless Presentation**: All navigation trees, sidebars, headers, cards, and dropdown triggers must render icons cleanly and borderless directly alongside labels and titles.
  - **Zero Box-Shadows on Icons**: Icon containers must have zero shadows (`shadow-none`) and zero borders (`border-none`).
- **Mandatory Prohibition of Pulsing Beacons, Status Dots, Ping Rings, and Live Presence Dots (ABSOLUTE RULE)**:
  - **Zero Pulsing Beacons & Status Beacons**: Under no circumstances should icons, buttons, cards, headers, navigation bars, or components feature pulsing beacons, blinking live dots, status beacons, radar pings, or heartbeat indicators (`animate-ping`, `animate-pulse` on green/colored corner dots).
  - **Zero Live Status Dots & Presence Rings**: Never design or place colored corner dots (green, blue, red, or any color), live online presence dots, or expanding ripple rings on icons, avatars, badges, or brand marks.
  - **Clean Static Typography & Structured Pills Only**: State must strictly be communicated via clean, high-contrast textual badges or static pills adhering to the 5 brand tokens (e.g. `LIVE`, `NEW`, `ACTIVE`, `READY`), never via distracting pulsing animations or corner beacon dots.
- **Mandatory Document Pages Rules (ABSOLUTE RULE, set by the user 2026-11-08)**:
  - **Default font is Inter**: The font switch on the three document pages (`/document`, `/document/design`, `/document/design-system`) defaults to **Inter**, English fonts only. No language switch. Language stays English.
  - **No links or jump ids inside demos**: Component demos must never contain real links, anchors, or jump ids. Tapping or clicking anything inside a demo must stay inside that section.
  - **Demo only, no labels (set by the user 2026-11-08)**: A demo stage shows only the component itself. Never add a title, badge, bracket label, guideline, or guidance text inside a demo. Never use a bracket with text as a label anywhere on the document pages. Keep descriptions to the minimum, in demos and in every section of the API and Blueprint pages.
  - **Mobile dropdown menu (set by the user 2026-11-08)**: The mobile dropdown shows only the menu and the switch buttons. No search field, no section labels, no badges, nothing else. The font switch is always visible in the mobile header as an icon button.
  - **No hover animation**: Never add hover animation anywhere. Icons must never animate on hover. No hover scale, translate, rotate, or transform. Hover may only change color or background, with no animation. This rule overrides the motion laws below for all hover states.
  - **Icon always at the left of the title in menus and sidebars (set by the user 2026-11-08)**: In menus and sidebars, never place an icon above a title or label. Not on desktop, not on mobile, not in any responsive state. The icon always starts at the left, on the same row as the title. All margins, paddings, and gaps follow the global spacing standard: multiples of 4px or 8px only.
  - **Icon-only buttons (set by the user 2026-11-08)**: Outside menus and sidebars, a button is text or icon, never an icon with a title written below it. An icon-only button shows its meaning in a hover tooltip (title attribute) that pops up from the icon, following the standard icon usage in the design skill.
  - **Dark text color (set by the user 2026-11-08)**: Never use `#0A1A4A`. The dark text color is `#020617` (slate 950). Natural shades come only from the 50 to 950 range of the scale, never outside that range.
  - **Icon color standard (set by the user 2026-11-08)**: Icon color follows the background. On a blue background the icon is always white (`#FFFFFF`), never black. On a white background the icon is black (`#020617`).
  - **One of each component (set by the user 2026-11-08)**: Never show the same component twice in the menu or the feed. Duplicates removed: Search (kept Search field), Buttons item (kept Buttons), Checkbox group (kept Checkbox).
  - **Brand search and form inputs (set by the user 2026-11-08)**: Every search bar and form input on the document pages uses the brand filled style: Ice Tint (`#EFF5FF`) fill, Soft Lavender (`#CAD3F5`) border, Royal Blue (`#0056FF`) icon, focus border and ring, 4px radius, 44px height. Search inputs start empty; never prefill search text for the user.
  - **Hover auto dropdown menus (set by the user 2026-11-08)**: On desktop, menu groups and the font switch open their dropdown on hover automatically, no tap needed; tap still works on touch. This is an open/close behavior only, never a hover animation.
  - **Feed style (set by the user 2026-11-08)**: The component feed scrolls like a Facebook news feed: one card per component, seen one by one while scrolling, a count in the group header line, no per component headline lines, and no NEW or UPDATED labels in feed titles (freshness labels live in the sidebar menu only).
  - **Coming items (set by the user 2026-11-08)**: A Coming menu item that is the same as, or looks like, a built component is removed from the menu; keep one. Removed 2026-11-08: Field label, Picker, Radio group, Segmented control, Select box, Tag field, Color slider, Progress bar, Toast, Alert dialog, Standard dialog, Takeover dialog, Contextual help, Coach indicator, In-line alert, Avatar group, Drop zone, List view, Standard panel, Steplist, Table, Tag, Tag group, and Text area (merged into Text fields, whose demo already includes a text area).
  - **20 Motion Laws in menus and demos (set by the user 2026-11-08)**: Every menu and every demo on the document pages must strictly follow all 20 Universal Laws of Interface Motion from `lib/motion.ts`, without skipping any: ease-out entrances, dropdowns 200ms in and 160ms out, 30ms list stagger, press scale 0.97, knob stretch 1.12, success pulse 1.06, popovers from 0.95 at the trigger, no bounce, exits 20% shorter, layoutId reuse. The same laws apply when a demo component is used in the real project. The no hover animation rule still stands: motion applies to open, close, press and state changes, never to hover. Direct mouse tracking and drag on the component page hero profile card are user directed play, not hover animation.
  - **Font switch concept (set by the user 2026-11-08)**: The font switch is a solid white button with a black icon, the word Font, and the current font name in Royal Blue, so it is easy to recognise on the blue header and in the mobile header. Its dropdown opens on hover at the standard 200ms; a tap must never fight the hover state.
  - **Component page hero (set by the user 2026-11-08, three card form)**: The hero shows THREE SNPI profile ID cards in one row: Business (shiliaiwei, Senior Software Engineer, GroupCapstone), Student (Sok Dara, STU-2026-0891), Event (SNPI Tech Day). Each card has a brand color band, a real photo from the demo avatar list, followers and following counts, a Follow button that toggles to Following and moves the follower count, and a message button. Cards tilt with the mouse with a shine highlight and a liquid glass border. No description text in the hero.
  - **Search icon color (set by the user 2026-11-08)**: A search icon is bold and easy to recognise: black or Royal Blue on a white or Ice Tint background, white only on a blue background. Never a white icon on a white background.
  - **No Coming labels left (set by the user 2026-11-08)**: Every menu item in every group (Navigation, Inputs, Feedback, Display, Forms, Sections) has a real live demo. The last 17 (Rating, Color area, Color handle and loupe, Color wheel, Swatch, Swatch group, Progress circle, Meter, Alert banner, Help text, Illustrated message, Status light, Coach mark, Popover, Avatar, Calendar, Thumbnail) were built on 2026-11-08 following the snp-sms-design-standards skill: flat brand tokens, 4px radius, 44px targets, spacing in 4px or 8px multiples, no gradients, no dots. Never add a menu item without a working demo.
  - **Icon color law (restated by the user 2026-11-08)**: Think before placing any icon: on a white or Ice Tint background the icon is black (#020617) or bold Royal Blue; on a blue background the icon is white. Light gray icons on light backgrounds are errors.
  - **Standards**: Every design must follow this project skill and recognised global design standards, not one alone.
- **Mandatory Local-Only Commits & Zero Push Without Explicit Command — ABSOLUTE RULE**:
  - In every conversation, session, and task, AI agents and contributors are **strictly permitted to make local git commits only**.
  - **NEVER execute `git push`**, push release tags, publish release checkpoints, or perform remote publishing actions under any circumstances unless the user gives an explicit, direct command (e.g., `git push`, `push now`, `push to github`).
  - Do not auto-push "for convenience", at the conclusion of a turn, or after running builds, tests, or changelog syncs.
  - Remote publishing is exclusively gated behind explicit user command.
- **Mandatory In-Project File Writing & Build Isolation Rule — ABSOLUTE RULE**:
  - In every conversation, session, and task, AI agents and contributors MUST **strictly write files inside the `SNPI-Web` project directory**.
  - **Never write outside `SNPI-Web`**: Under no circumstances should files, code, scratch scripts, tests, configs, or build artifacts be written to the workspace root (`/Users/Apple16/Desktop/SNPI/`), sibling project (`SNPI-API/`), Desktop (`/Users/Apple16/Desktop/`), home folder (`~/`), or `/tmp`.
  - **Build Output Isolation**: All build commands (`npm run build`, `next build`, `npm run dev`) must strictly output within `SNPI-Web` (e.g. `.next/`). No build script or compiler may emit artifacts outside `SNPI-Web`.
  - **Zero Cross-Project Contamination**: Never write frontend code, web components, or styles into `SNPI-API`.
- **Mandatory Differentiated Commit & Independent Tracking Rule — ABSOLUTE RULE**:
  - All commits in `SNPI-Web` must strictly use the `(web)` or `(web/<scope>)` prefix (e.g., `feat(web): ...`, `fix(web/nav): ...`, `docs(web): ...`).
  - Never share generic or identical commit messages with `SNPI-API`.
  - Maintain an independent commit history, tag tracking (`web-vX.Y.Z`), and separate changelog.
- **Mandatory Prohibition of Markdown / README Files in Root Folder & In-Skill Routing Standard (ABSOLUTE RULE)**:
  - **Zero Unprompted Markdown Files in Repository Root**: Under no circumstances should READMEs, design specifications, icon standards, integration summaries, guides, changelogs, architecture notes, or documentation `.md` files be written, generated, or placed in the root directory (`/Users/Apple16/Desktop/SNPI/SNPI-Web/`).
  - **Pristine Root Directory**: The root directory is strictly reserved for canonical repository manifests (`README.md`, `CHANGELOG.md`, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `AGENTS.md`, and project build configurations).
  - **Mandatory In-Skill Documentation Routing**: Any new documentation, design manuals, architecture notes, icon specifications, API contracts, or technical documentation MUST strictly be written inside the appropriate skill directory under `.agents/skills/<skill-folder>/` and indexed in `.agents/skills/INDEX.md`.
  - **Auto-Relocation Mandate**: Whenever you encounter any misplaced documentation, summary, or README file in the root folder, immediately move it into the appropriate skill directory under `.agents/skills/`. Never leave documentation files in the repository root folder.
- **Mandatory 20 Universal Laws of Interface Motion & Micro-Interaction Engineering (ABSOLUTE RULE)**:
  - All interactive UI components, menus, overlays, dialogs, buttons, list rows, tabs, switches, and cards in `SNPI-Web` MUST strictly implement all 20 Motion Laws without skipping any:
    1. **Ease-out for entrances**: Use `MOTION_EASE_OUT` (`[0.16, 1, 0.3, 1]`) for prompt entry and gentle deceleration.
    2. **Dropdowns at 150-250ms**: Dropdowns, select panels, and context menus must transition within 150ms–250ms (canonical 200ms).
    3. **Stagger list rows by 30ms**: Sequenced lists, table rows, and menu options stagger sequential row reveals by 30ms (`0.03s`).
    4. **Scale to 0.97 on press**: Clickable buttons, interactive cards, and list triggers scale to 0.97 on active touch/mouse press (`whileTap={{ scale: 0.97 }}`).
    5. **Stretch moving knobs 12%**: Translating knobs, switch thumbs, or slider handles stretch by 12% (`scaleX: 1.12`) along travel axis during movement and return to 1.0 when settled.
    6. **Stagger as details settle**: Nested detail rows and secondary panel content settle with staggered micro-delays (`0.04s`).
    7. **Arcs for object movement**: 2D translations across coordinates follow curved arc paths (`arcKeyframes`) rather than rigid diagonals.
    8. **Pulse to confirm success**: Successful operations (save, copy, submit, complete) trigger a confirmation pulse (`scale: [1, 1.06, 1]`).
    9. **Ease-in-out for moves**: Repositioning already-visible elements across screen coordinates uses smooth ease-in-out (`[0.65, 0, 0.35, 1]`).
    10. **Start popovers at 0.95**: Popovers, tooltips, flyouts, and dialogs mount from an initial scale of 0.95 (`scale: 0.95, opacity: 0`).
    11. **Enter from the trigger**: Overlays anchor entrance transformOrigin directly to the trigger position.
    12. **Exit to the trigger**: On close, overlays collapse back toward their originating trigger anchor.
    13. **No bounce on everyday UI**: Everyday standard UI controls (buttons, forms, selects) have zero bounce or cartoonish overshoot (critically damped springs, `damping: 30, stiffness: 400`).
    14. **Don't tween while held**: While an element is actively dragged, pressed, or held, tween interpolation lag is bypassed (`duration: 0`) for instantaneous 1:1 tactile response.
    15. **Make exits 20% shorter**: Exit animations run 20% faster than entrance animations (entrance 200ms -> exit 160ms; ratio 0.80).
    16. **Overlap old & new states**: State transitions (e.g. view swaps, tabs) overlap crossfading (`mode="sync"`) to eliminate blank pauses.
    17. **Masks for reveals & colour**: Progressive reveals, progress sweeps, and color shifts execute via CSS `clip-path` masks.
    18. **Crossfade icons + blur**: Icon state swaps (e.g., checkmark/copy, chevron/close) crossfade with 4px optical blur to eliminate edge jitter.
    19. **Rubber band past bounds**: Draggable surfaces or pull trays pulled beyond boundaries enforce spring rubber-band resistance (`dragElastic: 0.15`).
    20. **Reuse the same layoutId**: Shared indicators (active nav pills, sliding tab underline) preserve identical `layoutId` tags for continuous layout morphing.
  - **Mandatory Kinetic-First Design Thinking Mandate**: Whenever designing, architecting, or modifying ANY UI component, modal, sheet, dropdown, card, button, tab, or screen, AI agents and contributors MUST actively think through all 20 Motion Laws beforehand. Every interactive component must import and implement its kinetic behaviors from `@/lib/motion`. Never create static or arbitrarily animated components without checking against the 20 laws.

---

## 4. Task-Scoped Verification

Run the fastest checks that cover the changed behavior, and always run checks explicitly requested by the user.

- TypeScript changes: run `npm run typecheck`, `npm run lint`, and the relevant workspace tests.
- API, database, or deployment changes: add the applicable `npm run test:api`, `npm run smoke`, and `npm run deploy:verify` gates.
- Documentation, skill-routing, or agent-configuration changes: validate referenced paths and routing entries, then review the diff. Do not run database, live API, or deployment checks when those systems were not changed.
- Synchronize the changelog when required by `.agents/skills/snp-sms-changelog-workflow/SKILL.md`.
- For a push request, follow the complete push workflow in section 5.

Never run an unrelated full suite solely because it is listed here; report which checks ran and their actual exit codes.

---

## 5. Mandatory Pre-Push CI, Dual-Developer Sync & Deployment Quality Gate Rule

- **Mandatory Fast Sequential Push Workflow (GitHub First -> Watch 100% Green CI -> Vercel Production Deploy)**:
  - Whenever the user explicitly commands to push (`push`, `git push`, `publish`, `push now`), the agent and contributor MUST strictly execute in this exact sequence:
    1. **Pre-Flight Gates**: Run fast `npm run lint`, `npm run typecheck`, and `npm test` with 0 errors.
    2. **Push to GitHub First**: Push local commits to GitHub `origin main` (and organization remotes).
    3. **Live CI Watch Until 100% Green**: Actively monitor GitHub Actions CI runs for the pushed commit SHA (`gh run list --commit <SHA>`) with tight 4-second polling intervals until ALL triggered workflows complete with `[PASSED]` status. Never proceed to Vercel if any check is running or failed.
    4. **Vercel Production Deploy (Triggered Post-Green Only)**: ONLY AFTER GitHub Actions CI reaches 100% green, execute Vercel production deployment (`npm run deploy:vercel:prod` / `vercel deploy --archive=tgz --prod`).
    5. **Optimized Fast Execution**: Use the streamlined pipeline `npm run push` (or `npm run release:all`) which automates this full sequential chain without pauses, redundant re-builds, or polling delays.
- **Mandatory Pre-Push ESLint Quality Gate (`npm run lint`)**:
  - `npm run lint` MUST be executed and pass with 0 errors before any commit or push. JSX text node violations, unescaped entities, and typing errors must never reach remote CI.
- **Mandatory Dual-Developer Git Reconciliation & Merge Gate (`npm run git:sync`)**:
  - Two developers actively collaborate on this repository. Before attempting any commit push or release checkpoint, the system must **ALWAYS run `npm run git:sync`** (or `git fetch origin` followed by `git merge origin/<branch> --no-edit`).
  - If remote has incoming commits from the other developer, merge them immediately into the working tree. Never overwrite or force-push over collaborator code.
  - If conflicts occur, resolve them cleanly, run the full verification pipeline (`npm run typecheck`, `npm run lint`, `npm run deploy:verify`), and commit the merged result before pushing.
- **Zero Push on Failed Deploy or CI**: Never run `git push`, push release tags, or publish checkpoints if any GitHub deployment, build, test, or CI workflow is failed or failing on `main`.
- **Pre-Push Deployment Gate (`npm run deploy:verify`)**: Always execute `npm run deploy:verify` prior to pushing to ensure all deployment manifests exist (`vercel.json`, `apps/backend/vercel.json`, `apps/frontend/vercel.json`, Kubernetes manifests), production builds compile with zero errors, and recent GitHub Actions workflows on `main` are green.
- **Mandatory Post-Push Live CI Monitoring Until 100% Green (`npm run push:verify`)**:
  - Every remote push MUST actively monitor GitHub Actions runs for the pushed commit SHA (`gh run list --commit <SHA>`) until all triggered workflows reach completed `[PASSED]` status.
  - The agent must NOT end the turn or claim completion until all remote checks are green.
  - If any workflow fails, the agent must immediately fetch the failed logs (`gh run view <ID> --log-failed`), diagnose the error, resolve it locally, and push the fix.

---

## 6. Autonomous AI Agents Policy

- Follow section 4's task-scoped verification and report actual exit codes. Preserve API contracts, avoid destructive operations, and use authentic contracts and configuration from `@snp/shared` and `apps/backend/src/config/`.
- Synchronize changelog changes as required by `.agents/skills/snp-sms-changelog-workflow/SKILL.md`.
- For UI, design-system, notification, or UX-writing changes, resolve the exact skill in `.agents/skills/INDEX.md` and read only its authoritative source and relevant manuals. Apply the complete relevant standards, including responsive behavior, accessibility, notification limits, writing rules, and the immutable brand anchors.
- Follow the code-security skill's global zero-link and zero-emoji rules. Do not load the complete design suite for unrelated tasks.

---

## 7. Organization Repositories, Push Policy & Permissions

- **Organization Remotes (`ytivargitna`)**:
  - `SNPI-Web`: `origin` -> `https://github.com/ytivargitna/SNPI-Web.git` (tracked on `main -> origin/main`).
  - Secondary Remote: `personal` (`shiliaiwei/SNPI-Web.git`).
- **Equal Organization Admin Permissions**:
  - Both repositories (`SNPI-API` and `SNPI-Web`) are hosted under the `ytivargitna` organization, granting equal Admin rights to `shiliaiwei` and `Tan-Saphea`.
- **Push Quality Gate**:
  - Before pushing, always run `npm run typecheck` and `npm run build` in `SNPI-Web/`.

---

## 8. UI, Design, and Documentation Work

- The full UI standards live in `.agents/skills/snp-sms-design-standards/SKILL.md` and its focused manuals. Use `.agents/skills/INDEX.md` to select only the manuals relevant to the requested change.
- Keep the developer library first for new UI designs. Do not apply experimental designs to production frontend routes unless the user explicitly asks.
- Preserve the repository's mandatory design rules, including approved brand tokens, accessible contrast and touch targets, zero emojis, no blue indicator dots, SNPI naming, and the immutable Brand Colors and Color Ramps menu anchors. The design skill is authoritative for their full definitions.
- Do not load or apply unrelated design manuals to backend, CI, or other non-UI tasks.

---

## 9. Zero-Bridge Architecture: GitHub & Vercel Separation and Single Test Domain Policy

- **Zero-Bridge Decoupled Architecture**:
  - Strictly **NO auto-deployment bridge or webhook linkage** between GitHub and Vercel.
  - GitHub (`origin`, `org`, `personal`) is dedicated exclusively to source code version control, PR reviews, and GitHub Actions CI verification.
  - Production deployments to Vercel are executed exclusively via Vercel CLI (`npm run deploy:vercel:prod` / `vercel deploy --archive=tgz --prod`).
  - Neither system triggers the other automatically; all releases and deployments are independently commanded.

- **Single Temporary Test Subdomain Policy (`snpis.kesararamwithdigital.tech`)**:
  - The authorized host is strictly **`snpis.kesararamwithdigital.tech`** (free testing subdomain, to be replaced with custom school domain in the future).
  - Strictly **ZERO extra subdomains**: Never configure or route to `app.*`, `auth.*`, `admin.*`, `portal.*`, or any nested subdomains.
  - Strictly **Slug / Path-Based Navigation**: All feature slices, dashboards, and portals must be routed via URL paths under the single origin (e.g., `/dashboard`, `/academic-periods`, `/finance`, `/document`, `/reports`).

- **Mandatory GitHub & Vercel Release Parity Rule**:
  - Whenever code is pushed to GitHub `main`, Vercel production **MUST be updated as well** (`npm run deploy:vercel:prod` or `npm run release:all`).
  - Production deployments on Vercel must never remain on older commits or fall behind repository `main`.
  - To release to GitHub and deploy to Vercel in one verified sequence, execute `npm run release:all`.

- **Dual-Pipeline Triage Protocol (GitHub CI Failure vs Vercel Success)**:
  - **Root Cause of Divergence**: Vercel evaluates only production bundle compilation (`next build`), whereas GitHub Actions executes strict pre-flight gates (`npm run lint`, `npm run typecheck`, `npm test`, `format:check`, security bots).
  - **Authoritative Resolution Rule**: GitHub Actions is the canonical Software Quality Gate. If a GitHub workflow or label fails while Vercel succeeded, the deployment is in an unverified state.
  - **Action Steps**:
    1. Retrieve the failure log: `gh run view <RUN_ID> --log-failed` (or view GitHub Actions tab).
    2. Reproduce and fix locally: Run `npm run typecheck && npm run lint && npm test`.
    3. Commit the fix locally and push to GitHub so GitHub Actions reaches 100% green `[PASSED]`.
    4. Re-deploy to Vercel via `npm run deploy:vercel:prod` to restore parity between repository `main` and production.


<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- ci re-run 2026-11-08 -->
  - **Placeholder rule (set by the user 2026-11-08)**: Every input placeholder on the document pages is a short guide of 2 to 3 words only, like Full name, Phone number, Email address, Student ID. Never a sentence, never an example address.
  - **Color wheel removed (set by the user 2026-11-08)**: The Color wheel component is removed from the menu, the registry and the demos. Do not re-add it.
  - **Hero ID card details (set by the user 2026-11-08)**: The hero student ID card is a developer CV card: skills chips on the front, a profile strength progress bar, cover pattern circles in brand colors, and a liquid glass border only (white translucent border, ring, backdrop blur on the border line). Download CV, Flip and Follow buttons sit under the card, all with the press and dropdown motion laws applied.
  - **Demo avatar list (set by the user 2026-11-08)**: For every demo profile, avatar, or user photo on the document pages, use only these real avatar URLs: https://avatars.githubusercontent.com/u/233213854?v=4 , https://avatars.githubusercontent.com/u/70220432?v=4 (the user, shiliaiwei), https://avatars.githubusercontent.com/u/216975960?v=4 . Rotate through the list for avatar groups and stacks.
  - **Form input icon and empty start rule (set by the user 2026-11-08)**: Every form input on the document pages carries a bold Royal Blue icon inside it (stroke 2.5, size 5). Light gray or white icons inside inputs are errors. Forms always start EMPTY: never prefill sample names, emails, or IDs; a Fill Sample button may exist only for the user to choose.
