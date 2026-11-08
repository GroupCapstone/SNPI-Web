'use client';

import * as React from 'react';
import {
  Search,
  Copy,
  Check,
  BookOpen,
  Filter,
  Code,
  List,
  Grid2x2,
  RotateCcw,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export type GlossaryCategory =
  'All' | 'Foundations' | 'Components' | 'Color Science' | 'Tokens & Motion' | 'Layout & XR';

export interface GlossaryTerm {
  term: string;
  letter: string;
  category: Exclude<GlossaryCategory, 'All'>;
  definition: string;
  codeOrToken?: string;
}

export const MATERIAL_GLOSSARY_TERMS: GlossaryTerm[] = [
  // A
  {
    term: 'Adaptive Design',
    letter: 'A',
    category: 'Layout & XR',
    definition:
      'Interface methodology where layouts, components, and navigation structures dynamically reconfigure based on window size classes, device form factors, and postures.',
    codeOrToken: 'WindowSizeClass.Compact | Medium | Expanded',
  },
  {
    term: 'Anchor',
    letter: 'A',
    category: 'Foundations',
    definition:
      'The target reference element to which transient surfaces like tooltips, menus, and popovers attach in coordinate space.',
  },
  {
    term: 'App Bar (Top)',
    letter: 'A',
    category: 'Components',
    definition:
      'Persistent header surface displaying screen title, navigation icons, and contextual actions in Center-aligned, Small, Medium, or Large configurations.',
    codeOrToken: 'TopAppBarDefaults.centerAlignedTopAppBarColors()',
  },
  {
    term: 'App Bar (Bottom)',
    letter: 'A',
    category: 'Components',
    definition:
      'Ergonomic bottom navigation container hosting primary actions, FAB dock, and overflow menus on handheld mobile viewports.',
  },
  {
    term: 'Asymmetry',
    letter: 'A',
    category: 'Foundations',
    definition:
      'Purposeful visual balance differentiation used in cards and editorial layouts to create natural reading hierarchy without rigid grid constraints.',
  },

  // B
  {
    term: 'Badge',
    letter: 'B',
    category: 'Components',
    definition:
      'Compact dot or numerical pill affixed to icons or navigation tabs communicating unread counts or system alerts.',
    codeOrToken: 'BadgedBox(badge = { Badge { Text("3") } })',
  },
  {
    term: 'Banner',
    letter: 'B',
    category: 'Components',
    definition:
      'Prominent messaging container displayed below top app bars communicating urgent system status with optional contextual actions.',
  },
  {
    term: 'Baseline Scheme',
    letter: 'B',
    category: 'Color Science',
    definition:
      'The default group of 13-tone palettes and mappings establishing light and dark theme colors prior to dynamic color derivation.',
  },
  {
    term: 'Bottom Sheet',
    letter: 'B',
    category: 'Components',
    definition:
      'Supplementary surface anchored to the bottom of the viewport; available as Standard (coexists with content) or Modal (scrim-occluded).',
    codeOrToken: 'ModalBottomSheet(sheetState = rememberModalBottomSheetState())',
  },
  {
    term: 'Button',
    letter: 'B',
    category: 'Components',
    definition:
      'Primary trigger component across five structural hierarchy tiers: Elevated, Filled, Filled Tonal, Outlined, and Text.',
    codeOrToken: 'md.comp.filled-button.container.color',
  },

  // C
  {
    term: 'Card',
    letter: 'C',
    category: 'Components',
    definition:
      'Contained surface unit grouping related information, media, and actions in Elevated, Filled, or Outlined styles.',
  },
  {
    term: 'Checkbox',
    letter: 'C',
    category: 'Components',
    definition:
      'Selection control enabling binary or multi-item selection within a set, supporting checked, unchecked, and indeterminate states.',
  },
  {
    term: 'Chip',
    letter: 'C',
    category: 'Components',
    definition:
      'Compact interactive pill for filtering, input entry, contextual actions, and suggestions across Assist, Filter, Input, and Suggestion types.',
  },
  {
    term: 'Color Roles',
    letter: 'C',
    category: 'Color Science',
    definition:
      'Semantic color assignments across Primary, Secondary, Tertiary, Error, Surface, Surface Variant, and their On-color counterparts.',
    codeOrToken: 'md.sys.color.primary | primary-container',
  },
  {
    term: 'Color Scheme',
    letter: 'C',
    category: 'Color Science',
    definition:
      'Mathematical mapping of color roles to specific tonal values derived from tonal palettes for light, dark, and high-contrast modes.',
  },
  {
    term: 'Compact Window Class',
    letter: 'C',
    category: 'Layout & XR',
    definition:
      'Window width breakpoint below 600dp representing smartphones in portrait orientation and single-column ergonomics.',
  },
  {
    term: 'Condition',
    letter: 'C',
    category: 'Layout & XR',
    definition:
      'Environmental, user preference, or device signal (viewport width, orientation, high-contrast mode) driving adaptive layout re-rendering.',
  },
  {
    term: 'Container',
    letter: 'C',
    category: 'Foundations',
    definition:
      'The physical bounding shape, fill color, and elevation level defining the structural surface of a component.',
  },
  {
    term: 'Container Transform',
    letter: 'C',
    category: 'Tokens & Motion',
    definition:
      'Seamless spatial motion transition smoothly morphing one container boundary into another (e.g., list item expanding into full detail screen).',
  },
  {
    term: 'Contrast',
    letter: 'C',
    category: 'Color Science',
    definition:
      'Tone lightness delta; Tone delta >= 40 guarantees WCAG AA (3.0:1) and Tone delta >= 50 guarantees WCAG AAA (4.5:1) accessibility.',
  },
  {
    term: 'Color: User-Generated Schemes',
    letter: 'C',
    category: 'Color Science',
    definition:
      'An aspect of dynamic color describing colors derived and applied from an individual user wallpaper selection or Android preset colors.',
    codeOrToken: 'DynamicColors.applyUserScheme()',
  },
  {
    term: 'Customization',
    letter: 'C',
    category: 'Foundations',
    definition:
      'Targeted token or component overrides expressing product brand preferences without breaking system accessibility and contrast guarantees.',
  },

  // D
  {
    term: 'Dark Theme',
    letter: 'D',
    category: 'Color Science',
    definition:
      'Low-luminance user interface displaying primarily dark surfaces to reduce eye fatigue and minimize display power consumption.',
  },
  {
    term: 'Data Table',
    letter: 'D',
    category: 'Components',
    definition:
      'Tabular grid component presenting structured rows and columns with sorting, pagination, and multi-row selection controls.',
  },
  {
    term: 'Date Picker',
    letter: 'D',
    category: 'Components',
    definition:
      'Modal or docked surface allowing users to select single calendar dates or date ranges via calendar grid or manual text inputs.',
  },
  {
    term: 'Design Attribute',
    letter: 'D',
    category: 'Tokens & Motion',
    definition:
      'The specific visual property governed by a design token (color, font family, font size, tracking, line height, corner radius, elevation).',
  },
  {
    term: 'Design Guidelines',
    letter: 'D',
    category: 'Foundations',
    definition:
      'Descriptive written and illustrated docs demonstrating usage and behavior through examples; the long-form discussion of specs guiding decision-making.',
    codeOrToken: 'm3.material.io/foundations',
  },
  {
    term: 'Design Specs',
    letter: 'D',
    category: 'Foundations',
    definition:
      'Annotated designs and documentation specifying the exact parameters, values, and coded capabilities of a component or feature.',
    codeOrToken: 'm3.material.io/components/specs',
  },
  {
    term: 'Design System Package (DSP)',
    letter: 'D',
    category: 'Tokens & Motion',
    definition:
      'Open-format folder structure enabling multi-brand design tokens to sync between design tools, repositories, and build pipelines.',
  },
  {
    term: 'Design Tokens',
    letter: 'D',
    category: 'Tokens & Motion',
    definition:
      'Standardized named parameters replacing hardcoded values; organized hierarchically into Reference, System, and Component tokens.',
    codeOrToken: 'md.sys.color.surface-container-high',
  },
  {
    term: 'Dialog',
    letter: 'D',
    category: 'Components',
    definition:
      'Modal interrupt container requiring immediate user acknowledgment or action in Basic, Confirmation, or Full-screen formats.',
  },
  {
    term: 'Divider',
    letter: 'D',
    category: 'Components',
    definition:
      'Thin 1px visual rule separating groups of content within lists, cards, and navigation panels without adding structural z-axis elevation.',
  },
  {
    term: 'Drag State',
    letter: 'D',
    category: 'Foundations',
    definition:
      'Transient interaction state applied when an element is actively moved by touch or cursor (16% state layer opacity overlay).',
  },
  {
    term: 'Dynamic Color',
    letter: 'D',
    category: 'Color Science',
    definition:
      'Algorithmic color engine (Monet) deriving personalized, contrast-safe 5-key palettes directly from user wallpaper or custom brand seeds.',
  },

  // E
  {
    term: 'Easing',
    letter: 'E',
    category: 'Tokens & Motion',
    definition:
      'Cubic Bézier velocity curves assigned to motion tokens: Emphasized (spatial), Standard (small adjustments), Decelerate (enter), and Accelerate (exit).',
    codeOrToken: 'cubic-bezier(0.2, 0.0, 0, 1.0)',
  },
  {
    term: 'Element',
    letter: 'E',
    category: 'Foundations',
    definition:
      'Granular sub-part of a component governed by tokens (container, leading icon, trailing icon, label text, supporting text, state layer).',
  },
  {
    term: 'Elevation',
    letter: 'E',
    category: 'Foundations',
    definition:
      'Relative z-axis surface depth rendered primarily through surface tint shifts and soft ambient shadows across Levels 0 (0dp) through 5 (12dp).',
    codeOrToken: 'md.sys.elevation.level1 | level2 | level3',
  },
  {
    term: 'Expanded Window Class',
    letter: 'E',
    category: 'Layout & XR',
    definition:
      'Window width breakpoint at 840dp or higher representing desktop monitors, large tablets, and multi-pane spatial workflows.',
  },
  {
    term: 'Extended Color',
    letter: 'E',
    category: 'Color Science',
    definition:
      'Harmonized custom color roles mapped alongside standard key colors to support domain-specific semantic statuses or unique brand accents.',
  },
  {
    term: 'Extended FAB',
    letter: 'E',
    category: 'Components',
    definition:
      'Wider floating action button pairing an icon with an explicit text label for maximum affordance on primary screen workflows.',
  },

  // F
  {
    term: 'Floating Action Button (FAB)',
    letter: 'F',
    category: 'Components',
    definition:
      'Prominent high-elevation button hovering over interface content representing the single most critical or constructive action on a screen.',
  },
  {
    term: 'Focus Ring',
    letter: 'F',
    category: 'Foundations',
    definition:
      'High-visibility dual-layer outline (3px stroke with 2px offset) surrounding active keyboard-navigated components for accessibility.',
  },
  {
    term: 'Focus State',
    letter: 'F',
    category: 'Foundations',
    definition:
      'Interaction state indicating an element is selected via keyboard Tab navigation (10% state layer opacity overlay).',
  },

  // G
  {
    term: 'Gesture Navigation',
    letter: 'G',
    category: 'Tokens & Motion',
    definition:
      'Touch swipe patterns (predictive back, edge drag) directly synchronizing component translations with finger movement before commit.',
  },
  {
    term: 'Grid (Layout Grid)',
    letter: 'G',
    category: 'Layout & XR',
    definition:
      'Adaptive column system (4 columns mobile, 8 columns tablet, 12 columns desktop) with standardized 16dp / 24dp gutters and margins.',
  },
  {
    term: 'Grouping',
    letter: 'G',
    category: 'Foundations',
    definition:
      'Visual clustering of logically related controls, fields, or metadata into discrete cards and sections to optimize cognitive scanning.',
  },

  // H
  {
    term: 'HCT (Hue, Chroma, Tone)',
    letter: 'H',
    category: 'Color Science',
    definition:
      'Perceptually uniform color space enabling automated accessible color palette generation while mathematically preserving contrast ratios.',
    codeOrToken: 'Hct.from(hue, chroma, tone)',
  },
  {
    term: 'Hover State',
    letter: 'H',
    category: 'Foundations',
    definition:
      'Interaction state triggered when a pointing cursor hovers over an interactive container (8% state layer opacity overlay).',
  },

  // I
  {
    term: 'Icon Button',
    letter: 'I',
    category: 'Components',
    definition:
      'Compact 40-48dp interactive boundary framing a vector icon across Standard, Filled, Filled Tonal, and Outlined variants.',
  },
  {
    term: 'Image List',
    letter: 'I',
    category: 'Components',
    definition:
      'Organized grid collection of image items rendered in Standard (uniform square), Woven (rhythmic cadence), or Masonry (variable aspect) layouts.',
  },
  {
    term: 'Interaction States',
    letter: 'I',
    category: 'Foundations',
    definition:
      'Standardized interaction layers covering Enabled, Hovered, Focused, Pressed, Dragged, and Disabled states via state layer overlays.',
  },

  // J
  {
    term: 'Jetpack Compose M3',
    letter: 'J',
    category: 'Tokens & Motion',
    definition:
      'Modern declarative Android UI toolkit natively implementing Material Design 3 tokens, components, and dynamic color integrations.',
  },

  // K
  {
    term: 'Key Color',
    letter: 'K',
    category: 'Color Science',
    definition:
      'Color extracted and mathematically adjusted in hue and chroma from a source seed to establish the basis of a 13-tone tonal palette.',
  },

  // L
  {
    term: 'Libraries',
    letter: 'L',
    category: 'Foundations',
    definition:
      'Official engineering implementations supporting M3 across Web (MDC Web), Android (Jetpack Compose), Flutter, and React/Next.js.',
  },
  {
    term: 'List',
    letter: 'L',
    category: 'Components',
    definition:
      'Continuous vertical sequence of items arranged with single-line, two-line, or three-line text with optional leading avatars and trailing controls.',
  },

  // M
  {
    term: 'Material Components (MDC)',
    letter: 'M',
    category: 'Components',
    definition:
      'Production-ready UI components created by Google engineers implementing Material Design guidelines with enterprise reliability.',
  },
  {
    term: 'Material Design 3 (M3)',
    letter: 'M',
    category: 'Foundations',
    definition:
      'The third major evolution of Google Material Design, featuring dynamic personalization, HCT color science, and adaptive window classes.',
  },
  {
    term: 'Material Theme Builder (MTB)',
    letter: 'M',
    category: 'Color Science',
    definition:
      'Tooling ecosystem generating custom color tokens, JSON specs, and CSS variables from user-provided hex codes or brand logos.',
  },
  {
    term: 'Material Theming',
    letter: 'M',
    category: 'Foundations',
    definition:
      'The ability to systematically customize Material Design to reflect product brand. A theme adjusts global styles across color, elevation, state, and type.',
    codeOrToken: 'md.theme.builder.export()',
  },
  {
    term: 'Mode',
    letter: 'M',
    category: 'Foundations',
    definition:
      'Binary setting provided by a system to help people use the device better, including Focus mode, airplane mode, and battery saver mode.',
    codeOrToken: 'SystemSetting.Mode',
  },
  {
    term: 'Medium Window Class',
    letter: 'M',
    category: 'Layout & XR',
    definition:
      'Window width breakpoint between 600dp and 839dp (tablets in portrait, foldable devices, and split-screen browser panes).',
  },
  {
    term: 'Menu',
    letter: 'M',
    category: 'Components',
    definition:
      'Transient surface anchored to a trigger displaying a vertical list of actionable choices on an elevated card surface.',
  },
  {
    term: 'Modal',
    letter: 'M',
    category: 'Foundations',
    definition:
      'Focused interaction mode that disables interaction with underlying parent surfaces via a semi-transparent scrim until explicitly dismissed.',
  },
  {
    term: 'Motion Tokens',
    letter: 'M',
    category: 'Tokens & Motion',
    definition:
      'Systematic animation timing values (50ms to 1000ms) paired with standardized easing curves to guarantee harmonic transitions.',
    codeOrToken: 'md.sys.motion.duration-short1 | medium2 | long1',
  },

  // N
  {
    term: 'Navigation Bar',
    letter: 'N',
    category: 'Components',
    definition:
      'Bottom-docked persistent bar with 3 to 5 destinations designed for handheld mobile viewports under 600dp.',
  },
  {
    term: 'Navigation Drawer',
    letter: 'N',
    category: 'Components',
    definition:
      'Side-sliding panel providing deep multi-level destination routing; configured as Standard (permanent desktop) or Modal (mobile overlay).',
  },
  {
    term: 'Navigation Rail',
    letter: 'N',
    category: 'Components',
    definition:
      'Vertical left-docked bar displaying primary destinations and optional FAB on medium (tablet) and expanded (desktop) screen sizes.',
  },

  // O
  {
    term: 'On-Colors',
    letter: 'O',
    category: 'Color Science',
    definition:
      'High-contrast foreground colors engineered specifically to render legible text and icons atop corresponding container colors.',
    codeOrToken: 'md.sys.color.on-primary | on-surface',
  },
  {
    term: 'Opacity',
    letter: 'O',
    category: 'Tokens & Motion',
    definition:
      'Relative transparency values assigned to scrims (32%), disabled elements (38%), and state layers (hover 8%, focus 10%, press 10%, drag 16%).',
  },
  {
    term: 'Orbiter',
    letter: 'O',
    category: 'Layout & XR',
    definition:
      'Floating controls hovering around 3D spatial window panels in XR and vision environments to manipulate content without blocking canvas space.',
  },

  // P
  {
    term: 'Pane',
    letter: 'P',
    category: 'Layout & XR',
    definition:
      'Modular surface block holding related content and actions that rearranges dynamically into canonical multi-pane layouts.',
  },
  {
    term: 'Predictive Back',
    letter: 'P',
    category: 'Tokens & Motion',
    definition:
      'Interactive gesture transition providing real-time visual previews of previous destinations during swipe gestures before releasing.',
  },
  {
    term: 'Pressed State',
    letter: 'P',
    category: 'Foundations',
    definition:
      'Physical activation feedback state triggered during touch or mouse press, combining a 10% state layer overlay with expanding radial ink ripple.',
  },
  {
    term: 'Progress Indicator',
    letter: 'P',
    category: 'Components',
    definition:
      'Visual feedback element indicating active system processing; rendered as Circular spinners or Linear track bars in determinate or indeterminate modes.',
  },

  // Q
  {
    term: 'Quick Controls',
    letter: 'Q',
    category: 'Components',
    definition:
      'High-priority interactive toggle cards and micro-switches providing instant access to frequent hardware and network states.',
  },

  // R
  {
    term: 'Radio Button',
    letter: 'R',
    category: 'Components',
    definition:
      'Circular selection control allowing users to select exactly one mutually exclusive option from a defined set.',
  },
  {
    term: 'Reference Token',
    letter: 'R',
    category: 'Tokens & Motion',
    definition:
      'Base token in the token hierarchy mapping directly to physical values (hex codes, pixel dimensions, millisecond durations).',
    codeOrToken: 'md.ref.palette.primary40',
  },
  {
    term: 'Ripple',
    letter: 'R',
    category: 'Tokens & Motion',
    definition:
      'Fluid radial ink expansion animation originating from the exact touch contact point to provide instant physical feedback.',
  },
  {
    term: 'Role (Design Token Slot)',
    letter: 'R',
    category: 'Tokens & Motion',
    definition:
      'Semantic identifier defining the specific purpose of a token within a design system rather than its raw literal color.',
  },

  // S
  {
    term: 'Scrim',
    letter: 'S',
    category: 'Foundations',
    definition:
      'Semi-transparent dark backdrop overlay (32% opacity) rendered behind modal dialogs, drawers, and bottom sheets to occlude background interaction.',
  },
  {
    term: 'Search Bar & Search View',
    letter: 'S',
    category: 'Components',
    definition:
      'Docked text field transforming seamlessly into a full-screen search results view with recent query history upon focus.',
  },
  {
    term: 'Segmented Button',
    letter: 'S',
    category: 'Components',
    definition:
      'Conjoined linear row of buttons enabling users to toggle views, sort tables, or filter options in single or multi-select modes.',
  },
  {
    term: 'Shape Tokens',
    letter: 'S',
    category: 'Tokens & Motion',
    definition:
      'Systematic corner radius scale: None (0px), Extra-Small (4px), Small (8px), Medium (12px), Large (16px), Extra-Large (28px), and Full (Pill/Circle).',
    codeOrToken: 'md.sys.shape.corner-medium',
  },
  {
    term: 'Side Sheet',
    letter: 'S',
    category: 'Components',
    definition:
      'Supplementary surface anchored to the right or left edge of the viewport containing secondary tools, properties, or detail views.',
  },
  {
    term: 'Slider',
    letter: 'S',
    category: 'Components',
    definition:
      'Interactive track control allowing users to pick numerical values across a continuous or discrete range using a sliding thumb.',
  },
  {
    term: 'Snackbar',
    letter: 'S',
    category: 'Components',
    definition:
      'Compact, low-elevation message container appearing temporarily at the screen bottom to confirm an operation with an optional single action.',
  },
  {
    term: 'Source Color',
    letter: 'S',
    category: 'Color Science',
    definition:
      'Initial input seed color extracted from brand imagery or wallpaper that initiates the entire HCT dynamic color palette generation algorithm.',
  },
  {
    term: 'Spatial & XR',
    letter: 'S',
    category: 'Layout & XR',
    definition:
      'Design standards and depth coordinates governing the placement of Material cards, panels, and orbiters in 3D mixed and virtual reality spaces.',
  },
  {
    term: 'State Layer',
    letter: 'S',
    category: 'Foundations',
    definition:
      'Semi-transparent color overlay rendered over an element container to communicate user interaction states without altering container tokens.',
    codeOrToken: 'Hover: 8% | Focus: 10% | Press: 10% | Drag: 16%',
  },
  {
    term: 'Style',
    letter: 'S',
    category: 'Foundations',
    definition:
      'One or more customizable properties defining an aspect of a UI appearance, such as color, typography, elevation, or shape.',
    codeOrToken: 'md.sys.style',
  },
  {
    term: 'Surface',
    letter: 'S',
    category: 'Foundations',
    definition:
      'The foundational background canvas hosting UI components, differentiated through tonal elevation rather than harsh black drop shadows.',
  },
  {
    term: 'Switch',
    letter: 'S',
    category: 'Components',
    definition:
      'Binary toggle control shifting system states between on and off with an animated gliding thumb and optional icon indicator.',
  },

  // T
  {
    term: 'Tab',
    letter: 'T',
    category: 'Components',
    definition:
      'Navigation control organizing content across screens, datasets, and categorical views in Primary (underline indicator) or Secondary (pill) styles.',
  },
  {
    term: 'Text Field',
    letter: 'T',
    category: 'Components',
    definition:
      'Input component capturing user text entry via Filled (solid container with bottom line) or Outlined (bordered perimeter) architectures.',
  },
  {
    term: 'Theme',
    letter: 'T',
    category: 'Foundations',
    definition:
      'Unified global collection of color roles, typography tokens, elevation levels, and shape scales applied consistently across an app.',
  },
  {
    term: 'Time Picker',
    letter: 'T',
    category: 'Components',
    definition:
      'Interactive clock dial or numeric entry modal facilitating hour, minute, and AM/PM time configuration.',
  },
  {
    term: 'Tonal Palette',
    letter: 'T',
    category: 'Color Science',
    definition:
      '13-step lightness gradation (tones 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100) generated for each of the five key colors.',
  },
  {
    term: 'Tone',
    letter: 'T',
    category: 'Color Science',
    definition:
      'Perceptual measure of lightness within HCT color space ranging from absolute black (0) to pure white (100).',
  },
  {
    term: 'Toolbar',
    letter: 'T',
    category: 'Components',
    definition:
      'A component displaying navigation and key actions at the bottom of mobile screens, providing ergonomic one-handed touch accessibility.',
    codeOrToken: 'BottomAppBar / Toolbar',
  },
  {
    term: 'Tooltip',
    letter: 'T',
    category: 'Components',
    definition:
      'Brief informative label appearing on hover, focus, or long-press; formatted as Plain (short text) or Rich (with title and actions).',
  },
  {
    term: 'Typography',
    letter: 'T',
    category: 'Tokens & Motion',
    definition:
      '15-token hierarchical type scale divided across Display, Headline, Title, Body, and Label styles in Large, Medium, and Small.',
    codeOrToken: 'md.sys.typescale.title-medium',
  },

  // U
  {
    term: 'User-Generated Scheme',
    letter: 'U',
    category: 'Color Science',
    definition:
      'Dynamic color scheme derived in real time from an individual user device wallpaper selection or OS preset accent colors.',
  },

  // V
  {
    term: 'Variable Font',
    letter: 'V',
    category: 'Tokens & Motion',
    definition:
      'Single font file containing continuous design axes (weight, width, optical size) enabling fluid micro-adjustments without multiple file downloads.',
  },
  {
    term: 'Visual Hierarchy',
    letter: 'V',
    category: 'Foundations',
    definition:
      'Deliberate spatial and tonal ordering of elements through contrast, elevation, scale, and placement to guide attention naturally.',
  },

  // W
  {
    term: 'Window Size Classes',
    letter: 'W',
    category: 'Layout & XR',
    definition:
      'Standardized viewport width breakpoints: Compact (<600dp), Medium (600-839dp), and Expanded (>=840dp) governing responsive ergonomics.',
  },

  // X
  {
    term: 'XR (Extended Reality)',
    letter: 'X',
    category: 'Layout & XR',
    definition:
      'Spatial interface paradigm blending physical environments with virtual floating Material panels, depth shadows, and orbiters.',
  },

  // Z
  {
    term: 'Z-Axis (Elevation Mapping)',
    letter: 'Z',
    category: 'Foundations',
    definition:
      'Perpendicular depth dimension along which elevation levels (0dp to 12dp), modal scrims, shadows, and z-index layering are structured.',
  },
];

const CATEGORIES: GlossaryCategory[] = [
  'All',
  'Foundations',
  'Components',
  'Color Science',
  'Tokens & Motion',
  'Layout & XR',
];

const LETTERS = [
  'ALL',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Z',
];

export function MaterialGlossarySection() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<GlossaryCategory>('All');
  const [selectedLetter, setSelectedLetter] = React.useState<string>('ALL');
  const [viewMode, setViewMode] = React.useState<'lexicon' | 'grid'>('lexicon');
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const filteredTerms = React.useMemo(() => {
    return MATERIAL_GLOSSARY_TERMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Letter filter
      if (selectedLetter !== 'ALL' && item.letter !== selectedLetter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTerm = item.term.toLowerCase().includes(q);
        const matchesDef = item.definition.toLowerCase().includes(q);
        const matchesCode = item.codeOrToken?.toLowerCase().includes(q) ?? false;
        return matchesTerm || matchesDef || matchesCode;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLetter]);

  const availableLetters = React.useMemo(() => {
    const lettersSet = new Set<string>();
    MATERIAL_GLOSSARY_TERMS.forEach((term) => {
      if (selectedCategory === 'All' || term.category === selectedCategory) {
        lettersSet.add(term.letter);
      }
    });
    return lettersSet;
  }, [selectedCategory]);

  const groupedByLetter = React.useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const term of filteredTerms) {
      const group = map.get(term.letter) || [];
      group.push(term);
      map.set(term.letter, group);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTerms]);

  const handleCopy = (text: string, key: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => {
          setCopiedKey(null);
        }, 1800);
      }
    } catch {
      // Fallback
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLetter('ALL');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'All' || selectedLetter !== 'ALL';

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, View Mode, Clear */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#0056FF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Material A-Z terms, concepts, tokens, or definitions..."
            className="w-full rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 py-2.5 pr-10 pl-10 font-sans text-xs text-[#020617] transition-all placeholder:text-slate-400 focus:border-[#0056FF] focus:bg-white focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-md p-1 font-mono text-xs font-bold text-slate-400 hover:text-[#0056FF]"
            >
              Clear
            </button>
          )}
        </div>

        {/* View Mode Switcher & Reset */}
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-white px-3 py-2 font-mono text-xs font-semibold text-[#0056FF] transition-all hover:bg-[#EFF5FF]"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Segmented View Mode Toggle */}
          <div className="inline-flex rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/60 p-1">
            <button
              type="button"
              onClick={() => setViewMode('lexicon')}
              className={cn(
                'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition-all',
                viewMode === 'lexicon'
                  ? 'bg-[#0056FF] text-white shadow-xs'
                  : 'text-[#020617] hover:bg-white/60 hover:text-[#0056FF]',
              )}
            >
              <List className="size-3.5" />
              <span>Lexicon</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition-all',
                viewMode === 'grid'
                  ? 'bg-[#0056FF] text-white shadow-xs'
                  : 'text-[#020617] hover:bg-white/60 hover:text-[#0056FF]',
              )}
            >
              <Grid2x2 className="size-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Domain Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 flex items-center gap-1 font-mono text-[11px] font-bold text-slate-500 uppercase">
          <Filter className="size-3 text-[#0056FF]" />
          Domain:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-1.5 font-sans text-xs font-semibold transition-all',
                isActive
                  ? 'bg-[#0056FF] text-white shadow-xs'
                  : 'border border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF]/40 hover:bg-[#EFF5FF]',
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Touch-Friendly Alphabet Jump Strip */}
      <div className="flex items-center gap-2 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-2 text-xs">
        <span className="mr-1 hidden font-mono text-[10px] font-bold text-slate-500 uppercase sm:inline-block">
          Index:
        </span>
        <div className="flex flex-1 items-center gap-1 overflow-x-auto py-0.5">
          {LETTERS.map((letter) => {
            const isActive = selectedLetter === letter;
            const hasTerms = letter === 'ALL' || availableLetters.has(letter);
            return (
              <button
                key={letter}
                type="button"
                disabled={!hasTerms}
                onClick={() => setSelectedLetter(letter)}
                className={cn(
                  'flex h-7 min-w-[28px] cursor-pointer items-center justify-center rounded-lg px-1.5 font-mono text-xs font-bold transition-all',
                  isActive
                    ? 'bg-[#0056FF] text-white shadow-xs'
                    : hasTerms
                      ? 'border border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF]/50 hover:bg-[#EFF5FF] hover:text-[#0056FF]'
                      : 'cursor-not-allowed border border-transparent bg-transparent text-slate-300',
                )}
              >
                {letter}
              </button>
            );
          })}
        </div>
        {selectedLetter !== 'ALL' && (
          <button
            type="button"
            onClick={() => setSelectedLetter('ALL')}
            className="cursor-pointer rounded-lg border border-[#CAD3F5] bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-[#0056FF] transition-all hover:bg-[#EFF5FF]"
          >
            All Letters
          </button>
        )}
      </div>

      {/* Content Rendering: Empty State vs Lexicon vs Grid */}
      {filteredTerms.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#CAD3F5] bg-[#EFF5FF]/30 p-12 text-center">
          <BookOpen className="mb-3 size-9 text-[#0056FF]" />
          <h4 className="font-sans text-base font-bold text-[#020617]">No matching terms found</h4>
          <p className="mt-1 max-w-sm font-sans text-xs leading-relaxed text-slate-500">
            No glossary entries match your active query or filters. Try adjusting your search
            keywords, letter index, or category filter.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0056FF] px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:bg-[#2277FF]"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'lexicon' ? (
        <div className="space-y-8">
          {groupedByLetter.map(([letter, terms]) => (
            <div key={letter} className="space-y-4">
              {/* Letter Section Header */}
              <div className="flex items-center gap-3 border-b-2 border-[#CAD3F5] pb-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-[#0056FF] font-mono text-sm font-black text-white shadow-2xs">
                  {letter}
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-slate-500 uppercase">
                  Letter {letter}
                </span>
              </div>

              {/* Terms List */}
              <div className="divide-y divide-slate-100 rounded-2xl border border-[#CAD3F5] bg-white">
                {terms.map((item) => {
                  const defKey = `def-${item.term}`;
                  const tokenKey = `token-${item.term}`;
                  const isDefCopied = copiedKey === defKey;
                  const isTokenCopied = copiedKey === tokenKey;

                  return (
                    <div
                      key={item.term}
                      className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-[#EFF5FF]/30 sm:flex-row sm:items-start"
                    >
                      {/* Term Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="font-sans text-base font-bold tracking-tight text-[#020617]">
                            {item.term}
                          </h4>
                          <span className="rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                            {item.category}
                          </span>
                        </div>

                        <p className="font-sans text-xs leading-relaxed text-[#334155] sm:text-sm">
                          {item.definition}
                        </p>

                        {/* Code / Token Snippet */}
                        {item.codeOrToken && (
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <div className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF]/60 px-2.5 py-1 font-mono text-xs text-[#0056FF]">
                              <Code className="size-3 shrink-0 text-[#0056FF]" />
                              <code className="truncate">{item.codeOrToken}</code>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(item.codeOrToken!, tokenKey)}
                              className="flex cursor-pointer items-center gap-1 font-mono text-[11px] font-semibold text-slate-500 transition-colors hover:text-[#0056FF]"
                            >
                              {isTokenCopied ? (
                                <>
                                  <Check className="size-3 text-emerald-600" />
                                  <span className="text-emerald-600">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3" />
                                  <span>Copy Token</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Right Action: Copy Definition */}
                      <div className="shrink-0 pt-1">
                        <button
                          type="button"
                          onClick={() => handleCopy(`${item.term}: ${item.definition}`, defKey)}
                          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-mono text-xs font-semibold text-[#020617] transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]"
                        >
                          {isDefCopied ? (
                            <>
                              <Check className="size-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5 text-slate-400 group-hover:text-[#0056FF]" />
                              <span>Copy Definition</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            'grid gap-4.5',
            filteredTerms.length === 1
              ? 'mx-auto w-full max-w-xl'
              : filteredTerms.length === 2
                ? 'mx-auto w-full max-w-3xl grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          )}
        >
          {filteredTerms.map((item) => {
            const defKey = `def-${item.term}`;
            const tokenKey = `token-${item.term}`;
            const isDefCopied = copiedKey === defKey;
            const isTokenCopied = copiedKey === tokenKey;

            return (
              <div
                key={item.term}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-2xs"
              >
                <div className="space-y-3">
                  {/* Top Header: Letter Tag + Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-[#0056FF] font-mono text-xs font-black text-white shadow-2xs">
                      {item.letter}
                    </span>
                    <span className="rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                      {item.category}
                    </span>
                  </div>

                  {/* Term Title */}
                  <h4 className="font-sans text-base font-bold tracking-tight text-[#020617]">
                    {item.term}
                  </h4>

                  {/* Definition */}
                  <p className="font-sans text-xs leading-relaxed text-[#334155] sm:text-sm">
                    {item.definition}
                  </p>

                  {/* Code / Token Snippet */}
                  {item.codeOrToken && (
                    <div className="mt-2 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/50 p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <code className="font-mono text-[11px] break-all text-[#0056FF]">
                          {item.codeOrToken}
                        </code>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.codeOrToken!, tokenKey)}
                          title="Copy token"
                          className="shrink-0 cursor-pointer p-1 text-slate-400 hover:text-[#0056FF]"
                        >
                          {isTokenCopied ? (
                            <Check className="size-3 text-emerald-600" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action: Copy Definition */}
                <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(`${item.term}: ${item.definition}`, defKey)}
                    className="flex cursor-pointer items-center gap-1.5 font-mono text-xs font-semibold text-slate-500 transition-colors hover:text-[#0056FF]"
                  >
                    {isDefCopied ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Definition</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
