# SNPI-SMS Changelog

All notable changes, commits, and skill updates are recorded here in real-time.

### Version 0.2.42 (06.11.2026) (Developer: **史力爱卫**)

- Redesign API Page Sidebar inspired by TikTok Developer Documentation: overhaul left navigation in `features/document/components/ui-library/open-api-view.tsx` into a modern hierarchical accordion structure; engineer live endpoint search with `⌘K` keyboard shortcut and instant real-time filtering across groups and HTTP methods; implement collapsible accordion group drawers (Introduction, Security & Access, Public Services, Protected Services) with rotating chevrons, child count pills, and 200ms ease-out animations; style active sub-items with soft Ice Tint (`#EFF5FF`) capsule pills, Royal Blue (`#0056FF`) accent indicator bars, and color-coded HTTP method badges (`[GET]` in `#E3E7FC` / `[POST]` in `emerald-100`); add TikTok-style root standalone links (Change Logs, Table of contents) at the bottom; auto-expand matching parent groups during search and scroll-spy navigation; and preserve all 17 anchor targets and Enterprise Gateway TLS 1.3 telemetry status card

### Version 0.2.41 (06.11.2026) (Developer: **史力爱卫**)

- Redesign Core Components and Maintenance into unified Core Components • Maintenance Studio: build interactive dual-engine architecture in `features/document/components/ui-library/core-components-maintenance-studio.tsx`; engineer kinetic telemetry metrics HUD tracking 29 atomic primitives, 166 component invariants, 5 governance pillars, and 28 operational rules (194 invariants total); integrate three-way segmented view switcher (01 Core Components, 02 Maintenance Strategy, 03 Panoramic Studio) with Framer Motion `layoutId` sliding pill and Motion Law 4 press scaling (`whileTap: scale 0.97`); resolve Motion spring multi-frame runtime error via `switchKnobTransition`; fix React cross-component render error in `ToastCard`; create Next.js App Router client error boundary (`app/error.tsx`); and preserve all 34 section and component anchor IDs for seamless sidebar and table-of-contents navigation

### Version 0.2.40 (06.11.2026) (Developer: **史力爱卫**)

- Enforce mandatory prohibition of borders around icons: remove all bordered boxes, squircle containers, and boxed wrappers around icons across sidebar navigation trees, dropdown triggers, category panels, and section headers; ensure icons render cleanly and borderless directly alongside labels and titles with default `#020617` black fill; add global CSS safeguard in `app/globals.css` prohibiting borders and shadows on icon containers; and record Mandatory Prohibition of Borders Around Icons (ABSOLUTE RULE) in `AGENTS.md`, `keyline-two-tone-icons-specification.md`, and design standards skill

### Version 0.2.39 (06.11.2026) (Developer: **史力爱卫**)

- Standardize default dual-theme preferences to strictly two canonical themes: Day (White Default) and Moon (Dark Mode); engineer Moon style based on visual cognitive psychology using Neutral 900 (`#0F172A`) canvas and Neutral 800 (`#1E293B`) subsurface to eliminate OLED halation and ocular pupil shock; enforce pure white (`#FFFFFF`) typography for headings, body, and code matching modern IDEs (VS Code, Cursor), GitHub dark mode, and Antigravity Skills; establish pure white (`#FFFFFF`) keyline icons in Moon mode for 1:1 Gestalt typographic harmony; enforce strict 2px corner radius (`rounded-[2px]`, `style={{ borderRadius: '2px' }}`) on all icon containers across Day and Moon; and record authoritative dual-theme HCI invariants in `AGENTS.md`, `psychological-design-rules.md`, and `github-appearance-color-roles.tsx`

### Version 0.2.38 (06.11.2026) (Developer: **史力爱卫**)

- Enforce universal default black or dark color fill across all icons: inject `text-[#020617]` into centralized `KeylineTwoToneIcon` wrapper (`components/icons/index.tsx`); update `app/globals.css` to ensure default black/dark obsidian (`#020617`) fill and stroke for all icons across every container; eliminate unprompted card green inversions; preserve pure white (`#FFFFFF`) icons on blue surfaces and dark mode; record Mandatory Universal Default Black / Dark Fill Rule in `AGENTS.md`, `keyline-two-tone-icons-specification.md`, and design standards skill

### Version 0.2.37 (06.11.2026) (Developer: **史力爱卫**)

- Standardize Notification Bell (Campus Alert Center) component behavior: ensure popover list is collapsed (`isOpen: false`) by default on load, reset, and simulation; mandate explicit user tap/click on the bell button to drop down the notification panel; elevate trigger bell icon contrast (`#0A1A4A` when idle, `#0056FF` on active); and replace colored status dots with clean static textual pills (`UNREAD`, `LIVE`) strictly adhering to the repository design rules

### Version 0.2.36 (06.11.2026) (Developer: **史力爱卫**)

- Restore original unified asterisk logo design across all wings with 3 canonical editions: Blue Brand (`#0056FF` on light canvas), White Reversed (`#FFFFFF` on royal blue and dark obsidian canvas), and Dark Monochromatic (`#020617` on white canvas); engineer bold optical dominance via 2.5px vector stroke expansion (`strokeWidth={2.5}`) and 62% container scale so the mark stands out boldly over background surfaces; update canvas rasterizer, SVG exports, and brand media kit zip with high-resolution bold assets

### Version 0.2.35 (06.11.2026) (Developer: **史力爱卫**)

- Overhaul API documentation sidebar view: expand width from `w-72` to `w-80` (320px) to completely eliminate ellipsis truncation; refine endpoint labels (`Verify Certificate`, `Refresh Session Token`, `Profile & Permissions`); standardize strict 2px corner radius (`rounded-[2px]`, `style={{ borderRadius: '2px' }}`) on all icon containers and badges across `open-api-view`; integrate semantic Keyline Two-Tone icons (`Compass`, `BookOpen`, `Terminal`, `Globe`, `Lock`); apply left active accent border (`border-l-[3px] border-[#0056FF]`), Ice Tint fill (`#EFF5FF`), and Motion Law 4 press scale (`active:scale-[0.97]`); and upgrade bottom card into a high-contrast Enterprise Gateway status monitor with TLS 1.3 meta and ACTIVE pill

### Version 0.2.34 (06.11.2026) (Developer: **史力爱卫**)

- Universal application of 20 Motion Laws across entire component suite: embed `active:scale-[0.97]` and ease-out entrance into core `Button` variants and `GeometricButton`; implement `AnimatePresence`, 0.95 scale entrance, and 20% shorter exits across `LibraryDialog` and `SearchableDropdown`; engineer rubber-band drag (`dragElastic: 0.15`) on `LibraryBottomSheet`; add motion entrance and 0.97 tap scale to `LibrarySnackbar`; standardize `active:scale-[0.97]` on `LibraryChip` and `LibraryFab`; and record Mandatory Kinetic-First Design Thinking Protocol in `psychological-design-rules.md` and `AGENTS.md` so agents actively consider the 20 Motion Laws before creating any new UI component

### Version 0.2.33 (06.11.2026) (Developer: **史力爱卫**)

- Group all component demos within each category into a single unified card container (`rounded-2xl border border-[#CAD3F5] bg-white`), eliminating redundant nested stage box borders and fragmented per-component cards while maintaining centered full-fit presentation and direct anchor navigation

### Version 0.2.32 (06.11.2026) (Developer: **史力爱卫**)

- Architect and enforce the 20 Universal Laws of Interface Motion & Micro-Interaction Engineering: establish authoritative rule in `AGENTS.md`, register `SKILL-MOTION` (`.agents/skills/snp-sms-design-standards/twenty-universal-motion-laws.md`), configure standby subagent `interface-motion-engineer`, engineer type-safe tokens and variant factories in `lib/motion.ts`, apply across `LibraryDropdown`, `LibrarySwitch` (12% knob stretch), `LibraryCard` (0.97 tap scale), `LibraryTooltip`, and `AppSidebar`, and embed interactive 20 Motion Laws workbench showcase in UI library view

### Version 0.2.31 (06.11.2026) (Developer: **史力爱卫**)

- Standardize contextual Keyline Two-Tone icon color rules based on placement (strictly Black `#020617` when alongside titles/headings; Emerald Green `#10B981` when within cards, blocks, and shapes; and Pure White `#FFFFFF` on blue surfaces) with automatic 40% two-tone accent fill adaptation; enforce 1:1 proportional icon-to-title sizing; strictly prohibit icons within normal paragraph descriptions and plain text lines; enforce single-color only icon container backgrounds; and mandate that all sidebars and navigation menu lists remain collapsed by default with zero auto-drop until explicit user select or tap

### Version 0.2.30 (06.11.2026) (Developer: **史力爱卫**)

- Restore clean and minimal primary brand logo design: eliminate extraneous multi-format asset patterns section and wallpaper generators; standardize official 3-shape asterisk glyph (Top `#0056FF` Royal Blue, Right `#020617` Obsidian Black, Bottom `#10B981` Emerald Green); preserve essential White (`#FFFFFF`), Black Obsidian (`#020617`), and Blue Brand (`#0056FF`) canvas surfaces with high-resolution PNG downloads; and maintain high-contrast minimalist presentation across the documentation portal

### Version 0.2.29 (06.11.2026) (Developer: **史力爱卫**)

- Elevate official 3-shape asterisk logo mark by replacing `#0056FF` with Electric Cyan (`#00D2FF`) for the top wing; merge futuristic multi-layer gradient color mix (Cyan -> Royal Blue -> Deep Navy -> Obsidian) with geometric dot grid matrix; architect comprehensive Brand Asset Patterns ecosystem covering Cover Banners (1200x630, 1500x500), Desktop Wallpapers (1920x1080), Mobile Wallpapers (1080x1920), Profile Avatars (512x512 Circle & Squircle), and Favicons (192px, 48px); and establish explicit placement guidelines and copyable CSS patterns for profile and background applications

### Version 0.2.28 (06.11.2026) (Developer: **史力爱卫**)

- Redesign 3-shape asterisk logo glyph (Top Royal Blue `#0056FF`, Right Obsidian Black `#020617`, Bottom Emerald Green `#10B981` with negative-space central triangle); standardize Keyline Two-Tone icons to universal default Black (`#020617`) with context-aware Pure White (`#FFFFFF`) in solid blue and dark obsidian surfaces; strictly prohibit arbitrary colored background shapes behind icons; enforce 11-step Color Ramps (50–950) semantic token alignment; and establish 4px corner radius consistency (`rounded-[4px]`) across all icon containers

### Version 0.2.27 (06.11.2026) (Developer: **史力爱卫**)

- Consolidate Material Design A-Z Lexicon, Accessible Design Principles, Layout Scaffold Architecture, and Open-Source Design System Checklist into single design standards skill directory (`.agents/skills/snp-sms-design-standards/`); streamline Blueprint page to core Brand Blueprint, Color Ramps, Core Components, and Maintenance manuals; expand Layout Scaffold Architecture specification for all future screen designs; and register `SKILL-CHECKLIST` (`apply skill checklist`) for building better design systems

### Version 0.2.26 (06.11.2026) (Developer: **史力爱卫**)

- Streamline API documentation portal: remove hero banner, logo download button, and base URL card; replace logo-based icons with primary Keyline Two-Tone icons framework (`Terminal`, `Layers`, `FileText`, `Server`, `Lock`); enforce strict corner 2px metrics (`rounded-[2px]`) on badges and code elements; and eliminate verbose descriptive text adhering to minimal UI guide text and brand color tokens

### Version 0.2.25 (06.11.2026) (Developer: **史力爱卫**)

- Remove card lines from component demo cards in documentation feed, enforce strict corner 2px radius (`rounded-[2px]`) on all icon containers behind icons across Component, API, and Blueprint pages with Keyline Two-Tone icons, category semantic color parity, and motionless stability

### Version 0.2.24 (06.11.2026) (Developer: **史力爱卫**)

- Standardize official brand logo dark mode background to Obsidian Slate (`#020617`), implement pure client-side high-resolution PNG rasterizer (<20MB) and one-click Brand Media Kit ZIP bundler (packaging all 11 media, avatar, and favicon assets), refine icon squircle container to compact `size-8 rounded-lg` across navigation menus, and apply squircle badges to all documentation section headers

### Version 0.2.23 (06.11.2026) (Developer: **史力爱卫**)

- Standardize squircle icon tile containers across document portal navigation and all menu pages with Keyline Two-Tone icons, size-10 rounded-xl white cards, and motionless stability
- Implement Two-Factor Authentication (RFC 6238 TOTP), 8 single-use backup recovery codes with text export, Telegram Desktop OTP fallback, dual-auth protected deactivation modal, and administrator emergency break-glass 2FA reset at `/admin/users/[id]`

### Version 0.2.22 (06.11.2026) (Developer: **史力爱卫**)

- Standardize Keyline Two-Tone icons with 40% fill accent, stroke-width 2, size-6 default, zero animations/hover movement, and add single-click original logo vector export

### Version 0.2.21 (05.11.2026) (Developer: **史力爱卫**)

- Replaced `#0A1A4A` in Dark mode with authentic Neutral AAA scale (`#64748B`, `#475569`, `#334155`, `#1E293B`, `#0F172A`, `#020617`) and Primary 950 (`#050E28`) obsidian canvas


### Version 0.2.20 (05.11.2026) (Developer: **史力爱卫**)

- Redesign standard high-contrast form inputs with brand token styling, streamline dropdown component feed with zero description clutter, and convert domain card icons to status success green

### Version 0.2.19 (05.11.2026) (Developer: **史力爱卫**)

- Implement GitHub Appearance Preferences with Dual Theme Mode (Light, Dark, Moonlit Dimmed) and Dynamic 26 Color Roles Architecture on Blueprint page

### Version 0.2.18 (05.11.2026) (Developer: **史力爱卫**)

- Remove bento grid hero section from component feed and eliminate card hover event styles across UI library

### Version 0.2.17 (04.11.2026) - `d87b1a7` (Developer: **史力爱卫**)

- Apply fluid liquid tilted placement and multi-color card palette to bento hero grid

### Version 0.2.17 (04.11.2026) - `5a3d08b` (Developer: **史力爱卫**)

- Redesign snappy mascot companion with interactive play actions, antenna twang, and brand colors

### Version 0.2.17 (04.11.2026) - `05bfb65` (Developer: **史力爱卫**)

- Record SWR Stale-While-Revalidate client caching and backend ETag integration architecture

### Version 0.2.17 (04.11.2026) - `dc7de38` (Developer: **史力爱卫**)

- Scaffold standalone Nextra official developer documentation portal

### Version 0.2.17 (04.11.2026) - `3a40132` (Developer: **史力爱卫**)

- Redesign simple easy navigation sidebar with zero icon circles and zero count numbers

### Version 0.2.17 (04.11.2026) - `9251491` (Developer: **史力爱卫**)

- Forbid pulsing beacons and remove live presence dots across all UI components

### Version 0.2.17 (04.11.2026) - `856f683` (Developer: **史力爱卫**)

- Record Full-Stack Security Masterclass covering OWASP API Top 10, RFC 8725, ASVS 4.0, NIST SP 800-63B, and MongoDB Hardening

### Version 0.2.17 (04.11.2026) - `9926aac` (Developer: **史力爱卫**)

- Redesign creative sidebar with liquid glass cards, tree guides, and status capsule

### Version 0.2.17 (04.11.2026) - `55754f9` (Developer: **史力爱卫**)

- Remove hero clutter text, add interactive ask kid mascot, and remove ai kit category

### Version 0.2.17 (04.11.2026) - `711c3f9` (Developer: **史力爱卫**)

- Restore visual style archetypes for status-page component

### Version 0.2.17 (04.11.2026) - `f257d7c` (Developer: **史力爱卫**)

- Redesign hero with pure brand tokens and remove text-effects category

### Version 0.2.17 (04.11.2026) - `e04db67` (Developer: **史力爱卫**)

- Unify parent group icons to royal blue with larger dimensions

### Version 0.2.17 (04.11.2026) - `f8285ad` (Developer: **史力爱卫**)

- Record API Stylebook manifesto deep-dive sync commit d7c691e

### Version 0.2.17 (04.11.2026) - `d7c691e` (Developer: **史力爱卫**)

- Enrich API Stylebook manifesto with 3 cardinal pillars, AP Stylebook lineage, and square-wheel defenses

### Version 0.2.17 (04.11.2026) - `2f52e8d` (Developer: **史力爱卫**)

- Record Google API design guide deep-dive sync commit 5025c17

### Version 0.2.17 (04.11.2026) - `5025c17` (Developer: **史力爱卫**)

- Enrich Google API Design Guide deep-dive with ROD methodology, 16 status codes, and AIP standards

### Version 0.2.17 (04.11.2026) - `6d13f2d` (Developer: **史力爱卫**)

- Record API Stylebook insights synchronization commit 8c04e4d

### Version 0.2.17 (04.11.2026) - `8c04e4d` (Developer: **史力爱卫**)

- Record API Stylebook blog insights, Deliveroo in-depth critique, and AP Stylebook lineage

### Version 0.2.17 (04.11.2026) - `499d7b4` (Developer: **史力爱卫**)

- Standardize public fonts and images naming, connectivity, and catalog

### Version 0.2.17 (04.11.2026) - `eed781f` (Developer: **史力爱卫**)

- Record API Stylebook 16-guideline directory sync commit 35af91d

### Version 0.2.17 (04.11.2026) - `35af91d` (Developer: **史力爱卫**)

- Record complete 16 enterprise API design guidelines directory and archetypes

### Version 0.2.17 (04.11.2026) - `7664c38` (Developer: **史力爱卫**)

- Record API Stylebook deep enrichment sync commit 99d07bf

### Version 0.2.17 (04.11.2026) - `99d07bf` (Developer: **史力爱卫**)

- Enrich all 100 API Stylebook topic files with deep architectural rules, concrete HTTP syntax, and guideline quotes

### Version 0.2.17 (04.11.2026) - `a6de417` (Developer: **史力爱卫**)

- Redesign homepage hero into bento grid with organic mascots and brand tokens

### Version 0.2.17 (04.11.2026) - `aa4edd4` (Developer: **史力爱卫**)

- Record API Stylebook 17-category library synchronization commit 6c30d96

