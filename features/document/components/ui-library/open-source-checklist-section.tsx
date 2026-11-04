'use client';

import * as React from 'react';
import {
  Sparkles,
  Check,
  Clock,
  Layers,
  Search,
  ExternalLink,
  Sliders,
  BookOpen,
  AppWindow,
  Filter,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export interface ChecklistItem {
  id: string;
  name: string;
  category: 'design-language' | 'foundations' | 'core-components' | 'maintenance';
  subcategory: string;
  index: string;
  status: 'completed' | 'in-progress' | 'queued';
  description: string;
  targetId?: string;
}

export const OPEN_SOURCE_CHECKLIST_230: ChecklistItem[] = [
  // =========================================================================
  // 1. DESIGN LANGUAGE (5/10 COMPLETED)
  // =========================================================================
  // Brand (5/5 Completed)
  {
    id: 'ck-dl-1',
    name: 'Vision',
    category: 'design-language',
    subcategory: 'Brand',
    index: 'B1',
    status: 'completed',
    description:
      'Strategic brand direction, institutional educational mission, and unified cross-campus product vision.',
    targetId: 'brand-blueprint',
  },
  {
    id: 'ck-dl-2',
    name: 'Design Principles',
    category: 'design-language',
    subcategory: 'Brand',
    index: 'B2',
    status: 'completed',
    description:
      'Foundational tenets: Accessibility-first, Liquid Glass ergonomics, Zero Emoji policy, and typographic discipline.',
    targetId: 'brand-blueprint',
  },
  {
    id: 'ck-dl-3',
    name: 'Tone of Voice',
    category: 'design-language',
    subcategory: 'Brand',
    index: 'B3',
    status: 'completed',
    description:
      'Institutional, encouraging, clear, and authoritative educational tone across user roles.',
    targetId: 'brand-blueprint',
  },
  {
    id: 'ck-dl-4',
    name: 'Terminology',
    category: 'design-language',
    subcategory: 'Brand',
    index: 'B4',
    status: 'completed',
    description:
      'Standardized nomenclature for students, enrollments, tuition structures, and academic cycles.',
    targetId: 'brand-blueprint',
  },
  {
    id: 'ck-dl-5',
    name: 'Brand Assets',
    category: 'design-language',
    subcategory: 'Brand',
    index: 'B5',
    status: 'completed',
    description: 'High-resolution SVG crests, wordmarks, favicon packages, and light/dark lockups.',
    targetId: 'brand-blueprint',
  },
  // Guidelines (0/5 Queued)
  {
    id: 'ck-dl-6',
    name: 'Accessibility Guidelines',
    category: 'design-language',
    subcategory: 'Guidelines',
    index: 'G1',
    status: 'queued',
    description:
      'WCAG 2.2 AA compliance, 4.5:1 minimum text contrast, keyboard focus rings, and screen-reader ARIA semantics.',
    targetId: 'accessible-design-principles',
  },
  {
    id: 'ck-dl-7',
    name: 'Writing Guidelines',
    category: 'design-language',
    subcategory: 'Guidelines',
    index: 'G2',
    status: 'queued',
    description:
      'Sentence case capitalization, active voice verbs, concise error states, and clear instructional copy.',
    targetId: 'design-language-manual',
  },
  {
    id: 'ck-dl-8',
    name: 'Microcopy Guidelines',
    category: 'design-language',
    subcategory: 'Guidelines',
    index: 'G3',
    status: 'queued',
    description:
      'Button action labels, contextual input placeholders, empty states, and dismissible notification banners.',
    targetId: 'design-language-manual',
  },
  {
    id: 'ck-dl-9',
    name: 'Terminology & Material Lexicon',
    category: 'design-language',
    subcategory: 'Guidelines',
    index: 'G4',
    status: 'queued',
    description:
      'Complete cross-mapped dictionary linking design token terminology to technical implementation variables.',
    targetId: 'material-a-z-glossary',
  },
  {
    id: 'ck-dl-10',
    name: 'Internationalisation (Khmer & English)',
    category: 'design-language',
    subcategory: 'Guidelines',
    index: 'G5',
    status: 'queued',
    description:
      'Bilingual typography scaling, Khmer Unicode (U+1780-U+17FF) word-break handling, and RTL/LTR layout adaptability.',
    targetId: 'design-language-manual',
  },

  // =========================================================================
  // 2. FOUNDATIONS (0/26 QUEUED)
  // =========================================================================
  // Tokens (0/4)
  {
    id: 'ck-f-1',
    name: 'Design Tokens Architecture',
    category: 'foundations',
    subcategory: 'Tokens',
    index: 'F01',
    status: 'queued',
    description:
      'Tiered token structure (Global primitives -> Semantic aliases -> Component-scoped tokens).',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-2',
    name: 'Token Naming Taxonomy',
    category: 'foundations',
    subcategory: 'Tokens',
    index: 'F02',
    status: 'queued',
    description:
      'Predictable kebab-case semantic syntax: [system]-[concept]-[property]-[variant]-[state].',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-3',
    name: 'Tokens Studio Integration',
    category: 'foundations',
    subcategory: 'Tokens',
    index: 'F03',
    status: 'queued',
    description:
      'Automated bi-directional synchronization between Figma design tokens and Tailwind CSS variables.',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-4',
    name: 'Platform-Agnostic JSON Spec',
    category: 'foundations',
    subcategory: 'Tokens',
    index: 'F04',
    status: 'queued',
    description:
      'DTCG-compliant JSON token exports ready for web, mobile, and native platform runtimes.',
    targetId: 'color-ramps-tokens',
  },
  // Color (0/4)
  {
    id: 'ck-f-5',
    name: '11-Step Contrast Color Ramps',
    category: 'foundations',
    subcategory: 'Color',
    index: 'F05',
    status: 'queued',
    description:
      'Scientifically calibrated 50-950 luminance scales across Blue, Indigo, Emerald, Amber, and Slate.',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-6',
    name: 'Semantic Functional Roles',
    category: 'foundations',
    subcategory: 'Color',
    index: 'F06',
    status: 'queued',
    description:
      'Explicit mapping for Primary, Secondary, Tertiary, Surface, Error, Success, and Warning tokens.',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-7',
    name: 'Contrast Verification Matrices',
    category: 'foundations',
    subcategory: 'Color',
    index: 'F07',
    status: 'queued',
    description:
      'Mathematical verification of 4.5:1 text and 3:1 graphical element APCA/WCAG contrast boundaries.',
    targetId: 'color-ramps-tokens',
  },
  {
    id: 'ck-f-8',
    name: 'Light / Dark Theme Invariants',
    category: 'foundations',
    subcategory: 'Color',
    index: 'F08',
    status: 'queued',
    description:
      'Dual-palette elevation shifts with preserved semantic roles and pure-white canvas daytime readability.',
    targetId: 'color-ramps-tokens',
  },
  // Layout (0/4)
  {
    id: 'ck-f-9',
    name: '12-Column Responsive Grid',
    category: 'foundations',
    subcategory: 'Layout',
    index: 'F09',
    status: 'queued',
    description:
      'Fluid container grid system with flexible gutters (16px to 32px) and max-width thresholds.',
    targetId: 'layout-scaffold-architecture',
  },
  {
    id: 'ck-f-10',
    name: 'Breakpoint Standards',
    category: 'foundations',
    subcategory: 'Layout',
    index: 'F10',
    status: 'queued',
    description:
      'Standardized media query triggers: xs (360px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).',
    targetId: 'layout-scaffold-architecture',
  },
  {
    id: 'ck-f-11',
    name: 'Scaffold Architecture',
    category: 'foundations',
    subcategory: 'Layout',
    index: 'F11',
    status: 'queued',
    description:
      'Material 3 standard layout primitives: Top Bars, Navigation Rails, Content Panes, and Floating Anchors.',
    targetId: 'layout-scaffold-architecture',
  },
  {
    id: 'ck-f-12',
    name: 'Safe Areas & Padding Envelopes',
    category: 'foundations',
    subcategory: 'Layout',
    index: 'F12',
    status: 'queued',
    description:
      'Dynamic viewport padding protecting touch targets and scroll boundaries on edge devices.',
    targetId: 'layout-scaffold-architecture',
  },
  // Spacing (0/3)
  {
    id: 'ck-f-13',
    name: '4px Base Spacing Scale',
    category: 'foundations',
    subcategory: 'Spacing',
    index: 'F13',
    status: 'queued',
    description: 'Harmonic 4px geometric progressions (4, 8, 12, 16, 24, 32, 48, 64, 96px).',
    targetId: 'layout-scaffold-architecture',
  },
  {
    id: 'ck-f-14',
    name: 'Density Modes (Compact vs Comfortable)',
    category: 'foundations',
    subcategory: 'Spacing',
    index: 'F14',
    status: 'queued',
    description:
      'Dynamic data-table and list density toggling for high-volume enterprise data review.',
    targetId: 'layout-scaffold-architecture',
  },
  {
    id: 'ck-f-15',
    name: 'Container Padding Rules',
    category: 'foundations',
    subcategory: 'Spacing',
    index: 'F15',
    status: 'queued',
    description:
      'Predictable internal card, modal, and drawer padding envelopes for visual balance.',
    targetId: 'layout-scaffold-architecture',
  },
  // Typography (0/5)
  {
    id: 'ck-f-16',
    name: 'Modular Type Scale',
    category: 'foundations',
    subcategory: 'Typography',
    index: 'F16',
    status: 'queued',
    description: 'Typeface hierarchy spanning Display, Headline, Title, Body, and Label scales.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-17',
    name: 'Line-Height Pairings',
    category: 'foundations',
    subcategory: 'Typography',
    index: 'F17',
    status: 'queued',
    description:
      'Optical leading calibrations ensuring optimal scanning speeds across desktop and mobile screens.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-18',
    name: 'Font Weight Matrix',
    category: 'foundations',
    subcategory: 'Typography',
    index: 'F18',
    status: 'queued',
    description:
      'Explicit font-weight mapping: Regular (400), Medium (500), Bold (700), and Black (900).',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-19',
    name: 'Khmer Typographic Rendering',
    category: 'foundations',
    subcategory: 'Typography',
    index: 'F19',
    status: 'queued',
    description:
      'Subscript consonant clustering, vowel reordering, and baseline alignment for Khmer fonts.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-20',
    name: 'Code & Monospace Fonts',
    category: 'foundations',
    subcategory: 'Typography',
    index: 'F20',
    status: 'queued',
    description:
      'Tabular numeral formatting for currency, percentages, timestamps, and API schemas.',
    targetId: 'foundations-group',
  },
  // Elevation (0/3)
  {
    id: 'ck-f-21',
    name: '5-Level Elevation Shadow Tokens',
    category: 'foundations',
    subcategory: 'Elevation',
    index: 'F21',
    status: 'queued',
    description: 'Multi-stop diffused ambient and key drop-shadow definitions for spatial depth.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-22',
    name: 'Z-Index Layer Architecture',
    category: 'foundations',
    subcategory: 'Elevation',
    index: 'F22',
    status: 'queued',
    description:
      'Strict categorical z-index stack: Base (0), Raised (10), Sticky (20), Overlay (30), Modal (40), Toast (50).',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-23',
    name: 'Surface Tint Hierarchy',
    category: 'foundations',
    subcategory: 'Elevation',
    index: 'F23',
    status: 'queued',
    description:
      'Material 3 tonal surface overlays reflecting elevation height through primary color tinting.',
    targetId: 'foundations-group',
  },
  // Motion (0/3)
  {
    id: 'ck-f-24',
    name: 'Cubic Bézier Easing Curves',
    category: 'foundations',
    subcategory: 'Motion',
    index: 'F24',
    status: 'queued',
    description:
      'Standard, decelerated, and accelerated motion curves with interruption resilience.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-25',
    name: 'Duration Token System',
    category: 'foundations',
    subcategory: 'Motion',
    index: 'F25',
    status: 'queued',
    description:
      'Strict duration constraints honoring the <300ms perceptual responsiveness threshold.',
    targetId: 'foundations-group',
  },
  {
    id: 'ck-f-26',
    name: 'Spring Physics Parameters',
    category: 'foundations',
    subcategory: 'Motion',
    index: 'F26',
    status: 'queued',
    description: 'Mass, stiffness, and damping coefficients for fluid tactile micro-interactions.',
    targetId: 'foundations-group',
  },

  // =========================================================================
  // 3. CORE COMPONENTS (0/166 CHECKS ACROSS 29 PRIMITIVES)
  // =========================================================================
  {
    id: 'ck-c-01',
    name: 'Accordion',
    category: 'core-components',
    subcategory: 'Containers',
    index: 'C01',
    status: 'queued',
    description:
      '4 checks: Collapsible panel, keyboard navigation, animated height, aria-expanded.',
    targetId: 'comp-accordion',
  },
  {
    id: 'ck-c-02',
    name: 'Alert',
    category: 'core-components',
    subcategory: 'Feedback',
    index: 'C02',
    status: 'queued',
    description:
      '6 checks: Severity levels, dismiss action, assertive aria-live, icon pairing, title, border accent.',
    targetId: 'comp-alert',
  },
  {
    id: 'ck-c-03',
    name: 'Avatar',
    category: 'core-components',
    subcategory: 'Data Display',
    index: 'C03',
    status: 'queued',
    description:
      '7 checks: Image fallback, initials generation, online presence dot, size scale, shape variants, border ring, grouping.',
    targetId: 'comp-avatar',
  },
  {
    id: 'ck-c-04',
    name: 'Badge',
    category: 'core-components',
    subcategory: 'Data Display',
    index: 'C04',
    status: 'queued',
    description:
      '7 checks: Numeric pill, color ramps, dot badge, removable tag, icon prefix, size scaling, max count truncate.',
    targetId: 'comp-badge',
  },
  {
    id: 'ck-c-05',
    name: 'Button',
    category: 'core-components',
    subcategory: 'Actions',
    index: 'C05',
    status: 'queued',
    description:
      '10 checks: 5 variants, loading spinner, disabled state, focus ring, icon slot, full-width, keyboard trigger, tap bounds.',
    targetId: 'comp-button',
  },
  {
    id: 'ck-c-06',
    name: 'Breadcrumbs',
    category: 'core-components',
    subcategory: 'Navigation',
    index: 'C06',
    status: 'queued',
    description:
      '4 checks: Path separator, active leaf item, overflow collapse dropdown, structured data schema.',
    targetId: 'comp-breadcrumbs',
  },
  {
    id: 'ck-c-07',
    name: 'Calendar',
    category: 'core-components',
    subcategory: 'Selection',
    index: 'C07',
    status: 'queued',
    description:
      '7 checks: Month/Year navigation, date range pick, disabled dates, week numbering, keyboard arrows, today marker, locale.',
    targetId: 'comp-calendar',
  },
  {
    id: 'ck-c-08',
    name: 'Card',
    category: 'core-components',
    subcategory: 'Containers',
    index: 'C08',
    status: 'queued',
    description:
      '5 checks: Header slot, media banner, body typography, actions footer, elevated/outlined styles.',
    targetId: 'comp-card',
  },
  {
    id: 'ck-c-09',
    name: 'Carousel',
    category: 'core-components',
    subcategory: 'Media',
    index: 'C09',
    status: 'queued',
    description:
      '6 checks: Touch swipe gestures, slide indicators, next/prev arrow buttons, autoplay control, keyboard tabs, aria-roledescription.',
    targetId: 'comp-carousel',
  },
  {
    id: 'ck-c-10',
    name: 'Checkbox',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C10',
    status: 'queued',
    description:
      '7 checks: Indeterminate state, custom checkmark SVG, focus ring, disabled mode, label wrapping, error text, group validation.',
    targetId: 'comp-checkbox',
  },
  {
    id: 'ck-c-11',
    name: 'Divider',
    category: 'core-components',
    subcategory: 'Layout',
    index: 'C11',
    status: 'queued',
    description:
      '2 checks: Horizontal/Vertical orientations, optional inset margins with centered text label.',
    targetId: 'comp-divider',
  },
  {
    id: 'ck-c-12',
    name: 'Dropdown',
    category: 'core-components',
    subcategory: 'Actions',
    index: 'C12',
    status: 'queued',
    description:
      '6 checks: Click outside dismiss, keyboard navigation, nested sub-menus, icon items, shortcut badge, portal positioning.',
    targetId: 'comp-dropdown',
  },
  {
    id: 'ck-c-13',
    name: 'Icon',
    category: 'core-components',
    subcategory: 'Media',
    index: 'C13',
    status: 'queued',
    description:
      '3 checks: 24px bounding box, stroke weight token alignment, accessible aria-hidden or title.',
    targetId: 'comp-icon',
  },
  {
    id: 'ck-c-14',
    name: 'Image',
    category: 'core-components',
    subcategory: 'Media',
    index: 'C14',
    status: 'queued',
    description:
      '4 checks: Responsive srcset, aspect-ratio placeholder, blur skeleton loading, fallback error container.',
    targetId: 'comp-image',
  },
  {
    id: 'ck-c-15',
    name: 'Link',
    category: 'core-components',
    subcategory: 'Navigation',
    index: 'C15',
    status: 'queued',
    description:
      '6 checks: External icon suffix, security rel="noreferrer", underline hover styles, focus ring, router integration, color variants.',
    targetId: 'comp-link',
  },
  {
    id: 'ck-c-16',
    name: 'List',
    category: 'core-components',
    subcategory: 'Data Display',
    index: 'C16',
    status: 'queued',
    description:
      '3 checks: Ordered/Unordered types, custom bullet tokens, multi-line item spacing.',
    targetId: 'comp-list',
  },
  {
    id: 'ck-c-17',
    name: 'Loading Indicator',
    category: 'core-components',
    subcategory: 'Feedback',
    index: 'C17',
    status: 'queued',
    description:
      '5 checks: Circular spinner, linear bar, size scale, color token binding, aria-busy state.',
    targetId: 'comp-loading',
  },
  {
    id: 'ck-c-18',
    name: 'Modal',
    category: 'core-components',
    subcategory: 'Overlays',
    index: 'C18',
    status: 'queued',
    description:
      '8 checks: Focus trap, ESC key dismiss, backdrop blur, scroll lock, header/footer slots, size variants, animation.',
    targetId: 'comp-modal',
  },
  {
    id: 'ck-c-19',
    name: 'Pagination',
    category: 'core-components',
    subcategory: 'Navigation',
    index: 'C19',
    status: 'queued',
    description:
      '6 checks: Page number pills, ellipsis truncate, previous/next controls, jump-to-page input, total count label, keyboard access.',
    targetId: 'comp-pagination',
  },
  {
    id: 'ck-c-20',
    name: 'Progress Bar',
    category: 'core-components',
    subcategory: 'Feedback',
    index: 'C20',
    status: 'queued',
    description:
      '4 checks: Determinate percentage, indeterminate pulse, color tokens, aria-valuenow.',
    targetId: 'comp-progress-bar',
  },
  {
    id: 'ck-c-21',
    name: 'Radio Group',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C21',
    status: 'queued',
    description:
      '5 checks: Radio pill, arrow key selection, disabled variant, card option style, validation message.',
    targetId: 'comp-radio',
  },
  {
    id: 'ck-c-22',
    name: 'Select',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C22',
    status: 'queued',
    description:
      '8 checks: Searchable options, multi-select tags, clear button, virtualized list, option grouping, loading state, error outline.',
    targetId: 'comp-select',
  },
  {
    id: 'ck-c-23',
    name: 'Skeleton',
    category: 'core-components',
    subcategory: 'Feedback',
    index: 'C23',
    status: 'queued',
    description:
      '4 checks: Shimmer animation wave, text line variant, rectangular card skeleton, circular avatar placeholder.',
    targetId: 'comp-skeleton',
  },
  {
    id: 'ck-c-24',
    name: 'Switch',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C24',
    status: 'queued',
    description:
      '5 checks: Toggle thumb animation, active color change, disabled state, label association, keyboard space trigger.',
    targetId: 'comp-switch',
  },
  {
    id: 'ck-c-25',
    name: 'Tabs',
    category: 'core-components',
    subcategory: 'Navigation',
    index: 'C25',
    status: 'queued',
    description:
      '7 checks: Active indicator line, keyboard arrow traversal, scrollable tabs, icon prefix, badge counters, disabled tab, vertical mode.',
    targetId: 'comp-tabs',
  },
  {
    id: 'ck-c-26',
    name: 'Text Area',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C26',
    status: 'queued',
    description:
      '7 checks: Auto-resizing height, character counter, error helper text, clear button, max-length enforcement, disabled style, resize handle.',
    targetId: 'comp-textarea',
  },
  {
    id: 'ck-c-27',
    name: 'Text Field',
    category: 'core-components',
    subcategory: 'Forms',
    index: 'C27',
    status: 'queued',
    description:
      '9 checks: Leading/Trailing icons, clear button, password visibility toggle, helper text, error state, floating label, input mask, disabled style, required marker.',
    targetId: 'comp-textfield',
  },
  {
    id: 'ck-c-28',
    name: 'Toast',
    category: 'core-components',
    subcategory: 'Feedback',
    index: 'C28',
    status: 'queued',
    description:
      '8 checks: Auto-dismiss timer, pause on hover, action button, swipe to dismiss, stacking animation, polite aria-live, severity color, portal.',
    targetId: 'comp-toast',
  },
  {
    id: 'ck-c-29',
    name: 'Tooltip',
    category: 'core-components',
    subcategory: 'Overlays',
    index: 'C29',
    status: 'queued',
    description:
      '3 checks: Hover delay trigger, dynamic collision boundary flip, keyboard focus reveal.',
    targetId: 'comp-tooltip',
  },

  // =========================================================================
  // 4. MAINTENANCE (0/28 CHECKS ACROSS 5 STRATEGIC PILLARS)
  // =========================================================================
  // Documentation (0/10)
  {
    id: 'ck-m-01',
    name: 'Design System Principles',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M01',
    status: 'queued',
    description:
      'Core principles established to communicate team values and decision-making criteria.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-02',
    name: 'Getting Started Guide',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M02',
    status: 'queued',
    description:
      'First steps for designers and developers to install and ship features autonomously.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-03',
    name: 'Design Best Practices',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M03',
    status: 'queued',
    description: 'Scalable design workflow guidelines and avoiding common Figma layout pitfalls.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-04',
    name: 'Development Best Practices',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M04',
    status: 'queued',
    description: 'Recommended dependencies, code conventions, and frontend performance standards.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-05',
    name: 'Component Anatomy',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M05',
    status: 'queued',
    description: 'Structural breakdown of customizable slots, boundaries, and internal tokens.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-06',
    name: 'Component Properties',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M06',
    status: 'queued',
    description: 'Cross-platform property alignment across design tools and code interfaces.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-07',
    name: 'Component Composition Examples',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M07',
    status: 'queued',
    description: 'Advanced compositions using low-level primitives and content slots.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-08',
    name: 'Sandbox Product Example',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M08',
    status: 'queued',
    description: 'Isolated simulation application testing components in real product environments.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-09',
    name: 'Browser / OS Support',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M09',
    status: 'queued',
    description:
      'Explicit tier support matrix for modern browsers, mobile viewports, and platforms.',
    targetId: 'maint-documentation',
  },
  {
    id: 'ck-m-10',
    name: 'Release Cycle',
    category: 'maintenance',
    subcategory: 'Documentation',
    index: 'M10',
    status: 'queued',
    description: 'Documented semver breaking change cadence and migration roadmap planning.',
    targetId: 'maint-documentation',
  },
  // Local Libraries (0/4)
  {
    id: 'ck-m-11',
    name: 'When to Build',
    category: 'maintenance',
    subcategory: 'Local Libraries',
    index: 'M11',
    status: 'queued',
    description: 'Guidelines on building custom local components vs requesting system primitives.',
    targetId: 'maint-local-libraries',
  },
  {
    id: 'ck-m-12',
    name: 'Horizontal & Vertical Libraries',
    category: 'maintenance',
    subcategory: 'Local Libraries',
    index: 'M12',
    status: 'queued',
    description:
      'Clear architectural boundary between multi-product shared libs and single-feature libs.',
    targetId: 'maint-local-libraries',
  },
  {
    id: 'ck-m-13',
    name: 'Library Expectations',
    category: 'maintenance',
    subcategory: 'Local Libraries',
    index: 'M13',
    status: 'queued',
    description:
      'Quality bars, testing requirements, and ownership expectations for team libraries.',
    targetId: 'maint-local-libraries',
  },
  {
    id: 'ck-m-14',
    name: 'Release Cycle Alignment',
    category: 'maintenance',
    subcategory: 'Local Libraries',
    index: 'M14',
    status: 'queued',
    description:
      'Ensuring local libraries maintain compatibility with core design system releases.',
    targetId: 'maint-local-libraries',
  },
  // Team Processes (0/6)
  {
    id: 'ck-m-15',
    name: 'Decision-Making Log',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M15',
    status: 'queued',
    description:
      'ADR architectural decision logs preserving context and eliminating repetitive debate.',
    targetId: 'maint-team-processes',
  },
  {
    id: 'ck-m-16',
    name: 'Roadmap & Allocation',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M16',
    status: 'queued',
    description:
      'Long-term strategic vision with dedicated capacity balance for community support.',
    targetId: 'maint-team-processes',
  },
  {
    id: 'ck-m-17',
    name: 'Stakeholder Mapping',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M17',
    status: 'queued',
    description:
      'Comprehensive registry of cross-functional engineering, design, and executive leads.',
    targetId: 'maint-team-processes',
  },
  {
    id: 'ck-m-18',
    name: 'Analytics & Usage Tracking',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M18',
    status: 'queued',
    description:
      'Quantifiable telemetry measuring component adoption, doc visits, and token utilization.',
    targetId: 'maint-team-processes',
  },
  {
    id: 'ck-m-19',
    name: 'Ongoing Support Shifts',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M19',
    status: 'queued',
    description: 'Structured on-call rotation shielding core developers from ad-hoc interruptions.',
    targetId: 'maint-team-processes',
  },
  {
    id: 'ck-m-20',
    name: 'SLA Commitments',
    category: 'maintenance',
    subcategory: 'Team Processes',
    index: 'M20',
    status: 'queued',
    description:
      'Defined response time agreements for incoming bug reports, triage, and PR reviews.',
    targetId: 'maint-team-processes',
  },
  // Community Support (0/4)
  {
    id: 'ck-m-21',
    name: 'Support Channels',
    category: 'maintenance',
    subcategory: 'Community Support',
    index: 'M21',
    status: 'queued',
    description: 'Dedicated communication channels segmented by platform to streamline resolution.',
    targetId: 'maint-community-support',
  },
  {
    id: 'ck-m-22',
    name: 'Standard Issue Templates',
    category: 'maintenance',
    subcategory: 'Community Support',
    index: 'M22',
    status: 'queued',
    description: 'Structured reproduction requirements, design proposals, and environment specs.',
    targetId: 'maint-community-support',
  },
  {
    id: 'ck-m-23',
    name: 'Regular Release Updates',
    category: 'maintenance',
    subcategory: 'Community Support',
    index: 'M23',
    status: 'queued',
    description: 'Predictable cadence of release notes, showcase demos, and migration guides.',
    targetId: 'maint-community-support',
  },
  {
    id: 'ck-m-24',
    name: 'Open Office Hours',
    category: 'maintenance',
    subcategory: 'Community Support',
    index: 'M24',
    status: 'queued',
    description: 'Dedicated synchronous consultation slots for complex architectural queries.',
    targetId: 'maint-community-support',
  },
  // Contribution (0/4)
  {
    id: 'ck-m-25',
    name: 'House Rules for the System',
    category: 'maintenance',
    subcategory: 'Contribution',
    index: 'M25',
    status: 'queued',
    description:
      'Operational philosophy explaining why design systems move deliberately for scale.',
    targetId: 'maint-contribution',
  },
  {
    id: 'ck-m-26',
    name: 'Contribution Guidelines',
    category: 'maintenance',
    subcategory: 'Contribution',
    index: 'M26',
    status: 'queued',
    description: 'Step-by-step local setup, branch standards, linting, and PR test verification.',
    targetId: 'maint-contribution',
  },
  {
    id: 'ck-m-27',
    name: 'Feature Proposal Template',
    category: 'maintenance',
    subcategory: 'Contribution',
    index: 'M27',
    status: 'queued',
    description: 'Uniform RFC template ensuring cross-platform compatibility and zero regression.',
    targetId: 'maint-contribution',
  },
  {
    id: 'ck-m-28',
    name: 'Contributor Engagement & Recognition',
    category: 'maintenance',
    subcategory: 'Contribution',
    index: 'M28',
    status: 'queued',
    description: 'Public appreciation, release changelog credits, and management advocacy.',
    targetId: 'maint-contribution',
  },
];

export function OpenSourceChecklistSection() {
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState<
    'all' | 'design-language' | 'foundations' | 'core-components' | 'maintenance'
  >('all');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Metrics
  const totalChecks = 230;
  const completedChecks = 5;
  const completionPercentage = ((completedChecks / totalChecks) * 100).toFixed(1);

  const filteredItems = React.useMemo(() => {
    return OPEN_SOURCE_CHECKLIST_230.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.index.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  const scrollToTarget = (targetId?: string) => {
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* ============================================================= */}
      {/* 1. MASTER BANNER & MACRO-PHASE PROGRESS OVERVIEW              */}
      {/* ============================================================= */}
      <div className="relative space-y-6 overflow-hidden rounded-3xl border border-[#CAD3F5] bg-gradient-to-br from-[#EFF5FF] via-white to-[#F8FAFC] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#0056FF]/20 bg-[#0056FF]/10 px-2.5 py-1 font-mono text-[11px] font-bold text-[#0056FF]">
              <Sparkles className="size-3.5" />
              <span>OPEN-SOURCE DESIGN SYSTEM CHECKLIST</span>
            </div>

            <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl md:text-4xl">
              Build better design systems
            </h2>

            <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
              An open-source checklist to help you plan, build, and grow your design system.
              Complete checklist tracking across 4 foundational phases.
            </p>
          </div>

          {/* Top Right Action Button: Get started > */}
          <div className="flex shrink-0 items-center pt-2 sm:pt-0">
            <button
              type="button"
              onClick={() => scrollToTarget('ck-dl-1')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0056FF] px-5 py-2.5 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-[#2277FF] active:scale-95 sm:text-sm"
            >
              <span>Get started</span>
              <span className="font-mono text-sm leading-none">&gt;</span>
            </button>
          </div>
        </div>

        {/* 4 Macro-Phases Category Cards Grid */}
        <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
          {/* Phase 1: Design language 5/10 */}
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('design-language')}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all',
              activeCategoryFilter === 'design-language'
                ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-500/20'
                : 'border-emerald-300 bg-white shadow-2xs hover:border-emerald-400',
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Design language</span>
              <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                5/10
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '50%' }} />
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Brand (5/5) &middot; Guidelines (0/5)
            </span>
          </button>

          {/* Phase 2: Foundations 0/26 */}
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('foundations')}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all',
              activeCategoryFilter === 'foundations'
                ? 'border-[#0056FF] bg-[#EFF5FF] shadow-xs ring-2 ring-[#0056FF]/20'
                : 'border-[#CAD3F5] bg-white shadow-2xs hover:border-slate-300',
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Foundations</span>
              <span className="rounded-md border border-blue-200 bg-[#EFF5FF] px-2 py-0.5 text-[11px] font-bold text-[#0056FF]">
                0/26
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#0056FF]" style={{ width: '0%' }} />
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Tokens, Color, Layout, Spacing
            </span>
          </button>

          {/* Phase 3: Core components 0/166 */}
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('core-components')}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all',
              activeCategoryFilter === 'core-components'
                ? 'border-[#0056FF] bg-[#EFF5FF] shadow-xs ring-2 ring-[#0056FF]/20'
                : 'border-[#CAD3F5] bg-white shadow-2xs hover:border-slate-300',
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Core components</span>
              <span className="rounded-md border border-blue-200 bg-[#EFF5FF] px-2 py-0.5 text-[11px] font-bold text-[#0056FF]">
                0/166
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#0056FF]" style={{ width: '0%' }} />
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">29 Reusable UI Primitives</span>
          </button>

          {/* Phase 4: Maintenance 0/28 */}
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('maintenance')}
            className={cn(
              'rounded-2xl border p-4 text-left transition-all',
              activeCategoryFilter === 'maintenance'
                ? 'border-[#0056FF] bg-[#EFF5FF] shadow-xs ring-2 ring-[#0056FF]/20'
                : 'border-[#CAD3F5] bg-white shadow-2xs hover:border-slate-300',
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-sans font-bold text-[#0A1A4A]">Maintenance</span>
              <span className="rounded-md border border-blue-200 bg-[#EFF5FF] px-2 py-0.5 text-[11px] font-bold text-[#0056FF]">
                0/28
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#0056FF]" style={{ width: '0%' }} />
            </div>
            <span className="mt-2 block text-[10px] text-slate-500">
              Docs, Process, Community, SLA
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 2. FILTER TABS & INSTANT SEARCH TOOLBAR                       */}
      {/* ============================================================= */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('all')}
            className={cn(
              'rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategoryFilter === 'all'
                ? 'bg-[#0A1A4A] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            All 230 Checks
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter('design-language')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategoryFilter === 'design-language'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
            )}
          >
            <span>Design Language</span>
            <span className="py-0.2 rounded bg-black/15 px-1 font-mono text-[10px]">5/10</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter('foundations')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategoryFilter === 'foundations'
                ? 'bg-[#0056FF] text-white shadow-xs'
                : 'bg-[#EFF5FF] text-[#0056FF] hover:bg-blue-100',
            )}
          >
            <span>Foundations</span>
            <span className="py-0.2 rounded bg-black/15 px-1 font-mono text-[10px]">0/26</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter('core-components')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategoryFilter === 'core-components'
                ? 'bg-[#0056FF] text-white shadow-xs'
                : 'bg-[#EFF5FF] text-[#0056FF] hover:bg-blue-100',
            )}
          >
            <span>Core Components</span>
            <span className="py-0.2 rounded bg-black/15 px-1 font-mono text-[10px]">0/166</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCategoryFilter('maintenance')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all',
              activeCategoryFilter === 'maintenance'
                ? 'bg-[#0056FF] text-white shadow-xs'
                : 'bg-[#EFF5FF] text-[#0056FF] hover:bg-blue-100',
            )}
          >
            <span>Maintenance</span>
            <span className="py-0.2 rounded bg-black/15 px-1 font-mono text-[10px]">0/28</span>
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 230 checks..."
            className="h-9 w-full rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] pr-3 pl-9 font-sans text-xs text-[#0A1A4A] placeholder:text-slate-400 focus:border-[#0056FF] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* ============================================================= */}
      {/* 3. CHECKLIST TABLE & ITEM TILES                               */}
      {/* ============================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-slate-500">
          <span>
            Showing <strong className="text-[#0A1A4A]">{filteredItems.length}</strong> of{' '}
            {totalChecks} items
          </span>
          {activeCategoryFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className="text-[#0056FF] hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const isCompleted = item.status === 'completed';

            return (
              <div
                key={item.id}
                className={cn(
                  'group flex flex-col justify-between rounded-xl border p-4 transition-all',
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
                    : 'border-[#CAD3F5] bg-white hover:border-slate-300 hover:shadow-2xs',
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'flex size-5 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold',
                          isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500',
                        )}
                      >
                        {isCompleted ? <Check className="size-3 stroke-[3]" /> : item.index}
                      </span>
                      <span className="font-sans text-xs font-extrabold text-[#0A1A4A]">
                        {item.name}
                      </span>
                    </div>

                    <span
                      className={cn(
                        'shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase',
                        isCompleted
                          ? 'border border-emerald-300 bg-emerald-100 text-emerald-800'
                          : 'border border-slate-200 bg-slate-100 text-slate-600',
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="line-clamp-2 font-sans text-[11px] leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 font-mono text-[10px]">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                    {item.subcategory}
                  </span>

                  {item.targetId && (
                    <button
                      type="button"
                      onClick={() => scrollToTarget(item.targetId)}
                      className="inline-flex items-center gap-1 font-bold text-[#0056FF] hover:underline"
                    >
                      <span>Jump</span>
                      <ExternalLink className="size-2.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
