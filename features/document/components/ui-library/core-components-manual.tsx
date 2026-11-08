'use client';

import * as React from 'react';
import {
  AppWindow,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  Sparkles,
  Layers,
  Activity,
  Sliders,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  User,
  Calendar as CalendarIcon,
  Trash2,
  Maximize2,
  ExternalLink,
  Filter,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export interface ComponentChecklistItem {
  id: string;
  label: string;
  description: string;
}

export interface CoreComponentSpec {
  id: string;
  name: string;
  category: 'Structure' | 'Feedback' | 'Media' | 'Action' | 'Navigation' | 'Form';
  description: string;
  totalChecks: number;
  items: ComponentChecklistItem[];
}

export const CORE_COMPONENTS_SPECS: CoreComponentSpec[] = [
  {
    id: 'comp-accordion',
    name: 'Accordion',
    category: 'Structure',
    description:
      'Accordion toggles the visibility of content regions when the trigger element gets pressed.',
    totalChecks: 4,
    items: [
      {
        id: 'acc-active',
        label: 'Active state',
        description:
          'Comes in two states for toggling its content visibility. Distinct trigger icon between open/closed.',
      },
      {
        id: 'acc-comp',
        label: 'Composition',
        description:
          'Content area flexible enough to support various types of content, including other components.',
      },
      {
        id: 'acc-trans',
        label: 'Toggle transition',
        description:
          'Subtle height and opacity animation to help users understand component behavior.',
      },
      {
        id: 'acc-rel',
        label: 'Content and trigger relation',
        description:
          'Focusing content area with assistive technologies announces additional context from trigger element.',
      },
    ],
  },
  {
    id: 'comp-alert',
    name: 'Alert',
    category: 'Feedback',
    description: 'Alert displays a prominent message about the whole page or its specific area.',
    totalChecks: 6,
    items: [
      {
        id: 'alt-color',
        label: 'Colors',
        description:
          'Differentiate visual appearance based on role (info, success, warning, error) with AA standard contrast.',
      },
      {
        id: 'alt-title',
        label: 'Title support',
        description:
          'Supporting a title helps users understand the context faster for longer alert messages.',
      },
      {
        id: 'alt-icon',
        label: 'Icon support',
        description:
          'Icon illustrates the role and provides an additional visual hint for colorblind users.',
      },
      {
        id: 'alt-actions',
        label: 'Supplementary actions',
        description:
          'Actions relate to text and provide a way to react to the message sent to the user.',
      },
      {
        id: 'alt-resp',
        label: 'Responsiveness',
        description: 'Adapts to viewport size, becoming full-width on mobile to save space.',
      },
      {
        id: 'alt-a11y',
        label: 'Accessibility roles',
        description: 'Announces accessibility roles correctly via role="alert" or role="status".',
      },
    ],
  },
  {
    id: 'comp-avatar',
    name: 'Avatar',
    category: 'Media',
    description:
      'Thumbnail of a user photo, organization, or a visual representation of other types of content.',
    totalChecks: 7,
    items: [
      {
        id: 'ava-img',
        label: 'Image',
        description:
          'Masks image into shape and handles arbitrary source image aspect ratios safely.',
      },
      {
        id: 'ava-fallback',
        label: 'Image fallback',
        description:
          'Shows fallback image, icon, or initials when image is missing or errors during load.',
      },
      {
        id: 'ava-sizes',
        label: 'Sizes',
        description:
          'Supports at least 3 distinct sizes (e.g. 24px, 36px, 48px) with small size for dense tables.',
      },
      {
        id: 'ava-colors',
        label: 'Colors',
        description:
          'Applies background color to shape with WCAG AA contrast ratio for initials and icons.',
      },
      {
        id: 'ava-shape',
        label: 'Shape',
        description:
          'Supports circle and rounded square variants based on surface and branding requirements.',
      },
      {
        id: 'ava-groups',
        label: 'Avatar groups',
        description: 'Stacks multiple avatars with negative margin and overflow badge (+N).',
      },
      {
        id: 'ava-label',
        label: 'Accessibility label',
        description: 'Provides accessible name for non-decorative avatars without visible text.',
      },
    ],
  },
  {
    id: 'comp-badge',
    name: 'Badge',
    category: 'Media',
    description: 'Compact element that represents the status of an object or user input.',
    totalChecks: 7,
    items: [
      {
        id: 'bdg-colors',
        label: 'Colors',
        description: 'Predefined colors per role with WCAG AA standard contrast ratio.',
      },
      {
        id: 'bdg-variants',
        label: 'Variants',
        description: 'Multiple variants including filled, outlined, and subtle/faded background.',
      },
      {
        id: 'bdg-sizes',
        label: 'Sizes',
        description:
          'Multiple sizes: micro 18px for dense tables up to large 28px for marketing banners.',
      },
      {
        id: 'bdg-icon',
        label: 'Icon support',
        description: 'Recognizable leading or trailing icon illustrating badge context.',
      },
      {
        id: 'bdg-dismiss',
        label: 'Dismissible action',
        description: 'Close/dismiss trigger button for dynamic filter and tag selections.',
      },
      {
        id: 'bdg-empty',
        label: 'Empty state',
        description: 'Pill or circular dot without text preserving geometric proportions.',
      },
      {
        id: 'bdg-pos',
        label: 'Positioning',
        description: 'Supports absolute anchor positioning relative to icons or container corners.',
      },
    ],
  },
  {
    id: 'comp-button',
    name: 'Button',
    category: 'Action',
    description: 'Interactive element used for single-step actions.',
    totalChecks: 10,
    items: [
      {
        id: 'btn-colors',
        label: 'Colors',
        description:
          'Role-based colors (primary blue, neutral slate, destructive red) with WCAG AA contrast.',
      },
      {
        id: 'btn-variants',
        label: 'Variants',
        description: 'Five tiers: Filled, Filled Tonal, Elevated, Outlined, and Text.',
      },
      {
        id: 'btn-sizes',
        label: 'Sizes',
        description:
          'Multiple sizes (sm 32px, md 40px, lg 48px) adhering to min 44px touch targets on mobile.',
      },
      {
        id: 'btn-icon',
        label: 'Icon support',
        description: 'Icon + label, label-only, and icon-only with mandatory aria-label.',
      },
      {
        id: 'btn-hover',
        label: 'Hover state',
        description: 'Clear visual cue and background tint transition on pointer hover.',
      },
      {
        id: 'btn-active',
        label: 'Active state',
        description: 'Subtle scale-down or elevation drop on press.',
      },
      {
        id: 'btn-loading',
        label: 'Loading state',
        description: 'Embedded spinner replacing content without altering button dimensions.',
      },
      {
        id: 'btn-disabled',
        label: 'Disabled state',
        description: 'Visually non-interactive with disabled attributes and pointer-events-none.',
      },
      {
        id: 'btn-role',
        label: 'Accessibility role',
        description: 'Resolves button or anchor link role automatically based on href.',
      },
      {
        id: 'btn-focus',
        label: 'Focus indicator',
        description: 'Visible 2-3px focus ring on keyboard Tab navigation.',
      },
    ],
  },
  {
    id: 'comp-breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation',
    description:
      'Top-level product navigation that helps user understand current page hierarchy and navigate back.',
    totalChecks: 4,
    items: [
      {
        id: 'brd-icon',
        label: 'Icon support',
        description: 'Communicates roles of pages linked in breadcrumbs consistently.',
      },
      {
        id: 'brd-disabled',
        label: 'Disabled state',
        description: 'Current page item disabled from clicking with aria-current="page".',
      },
      {
        id: 'brd-collapse',
        label: 'Collapsed state',
        description: 'Truncates long path hierarchies into an ellipsis dropdown.',
      },
      {
        id: 'brd-separator',
        label: 'Custom separator',
        description: 'Supports slashes, chevrons, or arrows between path segments.',
      },
    ],
  },
  {
    id: 'comp-calendar',
    name: 'Calendar',
    category: 'Form',
    description:
      'Grid displaying days in one or more months allowing users to select a single date or date range.',
    totalChecks: 7,
    items: [
      {
        id: 'cal-modes',
        label: 'Display modes',
        description: 'Supports single-month card, multi-month grid, and vertical mobile layouts.',
      },
      {
        id: 'cal-selected',
        label: 'Selected state',
        description: 'Visually highlights selected single dates and range spans between start/end.',
      },
      {
        id: 'cal-month',
        label: 'Month selection',
        description: 'Fast switching between months and dropdown for jump-to-year.',
      },
      {
        id: 'cal-days',
        label: 'Day names',
        description: 'Compact weekday abbreviations (Mo, Tu, We, Th, Fr, Sa, Su).',
      },
      {
        id: 'cal-i18n',
        label: 'Internationalisation',
        description: 'Localized date formatting and correct regional first-day-of-week ordering.',
      },
      {
        id: 'cal-keyboard',
        label: 'Keyboard navigation',
        description: 'Full arrow-key grid traversal and month change on boundary exit.',
      },
      {
        id: 'cal-a11y',
        label: 'State announcement',
        description: 'Selected dates announced by screen reader upon cell focus.',
      },
    ],
  },
  {
    id: 'comp-card',
    name: 'Card',
    category: 'Structure',
    description: 'Container to group information about subjects and their related actions.',
    totalChecks: 5,
    items: [
      {
        id: 'crd-comp',
        label: 'Content composition',
        description:
          'Flexible body container supporting arbitrary text, metrics, and nested controls.',
      },
      {
        id: 'crd-media',
        label: 'Media sections',
        description: 'Top full-width media banner or horizontal side thumbnail integration.',
      },
      {
        id: 'crd-actions',
        label: 'Supplementary actions',
        description: 'Footer action buttons or full-surface clickable card with hover elevation.',
      },
      {
        id: 'crd-resp',
        label: 'Responsiveness',
        description: 'Adapts cleanly to full-width mobile viewports and responsive desktop grids.',
      },
      {
        id: 'crd-groups',
        label: 'Card groups',
        description: 'Consistent gutter and height alignment in multi-column collections.',
      },
    ],
  },
  {
    id: 'comp-carousel',
    name: 'Carousel',
    category: 'Media',
    description: 'Horizontal scrollable areas used for displaying grouped content.',
    totalChecks: 6,
    items: [
      {
        id: 'car-controls',
        label: 'Navigation controls',
        description: 'Accessible previous/next buttons for mouse users.',
      },
      {
        id: 'car-comp',
        label: 'Item composition',
        description: 'Flexible item slots supporting cards, banners, or mixed components.',
      },
      {
        id: 'car-sizes',
        label: 'Item sizes',
        description:
          'Displays peek of next item on mobile to visually cue horizontal scrollability.',
      },
      {
        id: 'car-touch',
        label: 'Touch navigation',
        description: 'Hardware-accelerated touch swipe gestures with momentum snap.',
      },
      {
        id: 'car-resp',
        label: 'Responsiveness',
        description: 'Dynamically adjusts visible slide count based on container breakpoint.',
      },
      {
        id: 'car-a11y',
        label: 'Keyboard navigation',
        description: 'Focusable slides and arrow-key navigation without mouse dependency.',
      },
    ],
  },
  {
    id: 'comp-checkbox',
    name: 'Checkbox',
    category: 'Form',
    description: 'Form field used to select one or multiple values from a list.',
    totalChecks: 7,
    items: [
      {
        id: 'chk-label',
        label: 'Label',
        description:
          'Clickable text label linked via htmlFor, announced properly by screen readers.',
      },
      {
        id: 'chk-checked',
        label: 'Checked state',
        description: 'High-contrast checkmark indicator on active brand fill.',
      },
      {
        id: 'chk-error',
        label: 'Error state',
        description: 'Form validation error border with linked error message.',
      },
      {
        id: 'chk-disabled',
        label: 'Disabled state',
        description: 'Prevents interaction and excludes value from form submission.',
      },
      {
        id: 'chk-indet',
        label: 'Indeterminate state',
        description: 'Horizontal dash symbol when child items are partially selected.',
      },
      {
        id: 'chk-group',
        label: 'Checkbox group',
        description: 'Supports multi-select arrays with group-level legend or label.',
      },
      {
        id: 'chk-kbd',
        label: 'Keyboard support',
        description: 'Spacebar toggle and native Tab focus traversal.',
      },
    ],
  },
  {
    id: 'comp-divider',
    name: 'Divider',
    category: 'Structure',
    description: 'Element for visual content separation.',
    totalChecks: 2,
    items: [
      {
        id: 'div-dir',
        label: 'Direction',
        description:
          'Supports both horizontal rules and vertical inline dividers with flex parents.',
      },
      {
        id: 'div-a11y',
        label: 'Accessibility role',
        description: 'Announced with role="separator" and aria-orientation if non-decorative.',
      },
    ],
  },
  {
    id: 'comp-dropdown',
    name: 'Dropdown',
    category: 'Action',
    description: 'List of contextual actions that users can trigger.',
    totalChecks: 6,
    items: [
      {
        id: 'drp-comp',
        label: 'Content composition',
        description: 'Flexible menu surface supporting action items, subheaders, and dividers.',
      },
      {
        id: 'drp-hover',
        label: 'Hover trigger',
        description: 'Optional hover trigger with focus synchronization for keyboard users.',
      },
      {
        id: 'drp-pos',
        label: 'Dynamic positioning',
        description: 'Floating collision detection keeping menu visible within viewport.',
      },
      {
        id: 'drp-resp',
        label: 'Responsiveness',
        description: 'Floating popover on desktop, converts to bottom sheet on mobile.',
      },
      {
        id: 'drp-trap',
        label: 'Focus trapping',
        description: 'Focus moves into menu on open and returns to trigger upon dismiss.',
      },
      {
        id: 'drp-kbd',
        label: 'Keyboard navigation',
        description: 'Arrow keys navigate items, Escape or Tab out closes menu.',
      },
    ],
  },
  {
    id: 'comp-icon',
    name: 'Icon',
    category: 'Media',
    description: 'Wrapper for SVG assets to control their appearance.',
    totalChecks: 3,
    items: [
      {
        id: 'icn-colors',
        label: 'Colors',
        description:
          'Supports color values from design system tokens and inherits color from parent element automatically.',
      },
      {
        id: 'icn-sizes',
        label: 'Sizes',
        description:
          'Several predefined sizes (16dp, 20dp, 24dp, 32dp) paired with typography scale for visual alignment.',
      },
      {
        id: 'icn-interactive',
        label: 'Interactivity',
        description:
          'Purely decorative by default; interactive behavior must be encapsulated inside buttons, links, or action controls.',
      },
    ],
  },
  {
    id: 'comp-image',
    name: 'Image',
    category: 'Media',
    description: 'Utility for displaying images and controlling their behavior.',
    totalChecks: 4,
    items: [
      {
        id: 'img-sizes',
        label: 'Sizes',
        description:
          'Flexible width and height with CSS aspect-ratio support to scale proportions dynamically based on parent container.',
      },
      {
        id: 'img-fallback',
        label: 'Image fallback',
        description:
          'Displays an empty box with background, icon, or static placeholder image when URL is incorrect or undefined.',
      },
      {
        id: 'img-density',
        label: 'Screen density support',
        description:
          'Supports responsive srcset loading of 1x, 2x, and 3x assets to serve the optimal resolution.',
      },
      {
        id: 'img-alt',
        label: 'Alt text',
        description:
          'Provides concise, meaningful alt text describing picture contents when non-decorative (or empty alt="" for decorative).',
      },
    ],
  },
  {
    id: 'comp-link',
    name: 'Link',
    category: 'Navigation',
    description: 'Interactive text element used for navigation within text paragraphs.',
    totalChecks: 6,
    items: [
      {
        id: 'lnk-icon',
        label: 'Icon support',
        description:
          'Optional leading or external icon next to link text; never use an icon inside a link without a descriptive text label.',
      },
      {
        id: 'lnk-colors',
        label: 'Colors',
        description:
          'Predefined colors per role, automatically inheriting color from parent element when embedded in text.',
      },
      {
        id: 'lnk-disabled',
        label: 'Disabled state',
        description:
          'Visually shows link is non-interactive and restricts click/keyboard activation.',
      },
      {
        id: 'lnk-font',
        label: 'Font inheritance',
        description:
          'Inherits typography styles (font-family, size, weight) when used inside text elements.',
      },
      {
        id: 'lnk-multiline',
        label: 'Multiline display',
        description:
          'Wraps gracefully across line breaks within paragraphs without breaking text flow or hit target boundaries.',
      },
      {
        id: 'lnk-role',
        label: 'Accessibility role',
        description:
          'Resolves button or link accessibility role automatically based on href presence.',
      },
    ],
  },
  {
    id: 'comp-list',
    name: 'List',
    category: 'Structure',
    description: 'List is used to display a list of items.',
    totalChecks: 3,
    items: [
      {
        id: 'lst-order',
        label: 'Order',
        description:
          'Supports bulleted (unordered), numbered (ordered), unstyled, and icon-bulleted list types.',
      },
      {
        id: 'lst-comp',
        label: 'Content composition',
        description:
          'List item content areas flexible enough to support rich text, nested lists, and action components.',
      },
      {
        id: 'lst-role',
        label: 'Accessibility role',
        description:
          'Assistive technologies announce correct list role (<ul>, <ol>) and total item count.',
      },
    ],
  },
  {
    id: 'comp-loading',
    name: 'Loading indicator',
    category: 'Feedback',
    description:
      'Animated element that communicates progress without telling how long the process will take.',
    totalChecks: 5,
    items: [
      {
        id: 'lod-colors',
        label: 'Colors',
        description:
          'Supports multiple semantic roles and adapts to parent surface color schemes (brand blue, white on dark).',
      },
      {
        id: 'lod-sizes',
        label: 'Sizes',
        description:
          'Predefined sizes (16dp inline, 24dp button, 48dp page center) matching rendered area.',
      },
      {
        id: 'lod-duration',
        label: 'Loading duration',
        description:
          'Displays continuously until completion or error, or displays elapsed/estimated progress when determinable.',
      },
      {
        id: 'lod-motion',
        label: 'Reduced motion',
        description:
          'Honors prefers-reduced-motion settings by slowing down or replacing spin with static opacity pulse.',
      },
      {
        id: 'lod-label',
        label: 'Accessibility label',
        description:
          'Provides aria-label and role="status" describing the content area being loaded.',
      },
    ],
  },
  {
    id: 'comp-modal',
    name: 'Modal',
    category: 'Action',
    description:
      'Container appearing in front of main content to provide critical information or actionable content.',
    totalChecks: 8,
    items: [
      {
        id: 'mdl-comp',
        label: 'Content composition',
        description:
          'Main content area flexible enough to host forms, data summaries, and nested components.',
      },
      {
        id: 'mdl-actions',
        label: 'Supplementary actions',
        description:
          'Dedicated bottom action row for primary confirmation, secondary cancel, and tertiary actions.',
      },
      {
        id: 'mdl-close',
        label: 'Close action',
        description:
          'Straightforward dismiss via top-right close button, backdrop click, or cancel action.',
      },
      {
        id: 'mdl-pos',
        label: 'Positioning',
        description:
          'Supports centered viewport modal dialogs or sliding drawer sheets on screen edges.',
      },
      {
        id: 'mdl-sizes',
        label: 'Sizes display',
        description:
          'Supports responsive width tiers (sm 400px, md 600px, lg 840px) and max-height scrolling.',
      },
      {
        id: 'mdl-trap',
        label: 'Focus trapping',
        description:
          'Focus moves into first focusable modal element on open and stays trapped until closed.',
      },
      {
        id: 'mdl-kbd',
        label: 'Keyboard navigation',
        description:
          'Escape key closes modal, Tab traverses internal elements, and focus returns to trigger on close.',
      },
      {
        id: 'mdl-label',
        label: 'Title and subtitle labeling',
        description:
          'Uses role="dialog" or "alertdialog" with aria-labelledby and aria-describedby linkage.',
      },
    ],
  },
  {
    id: 'comp-pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Pagination enables a selection from a range of pages.',
    totalChecks: 6,
    items: [
      {
        id: 'pag-selected',
        label: 'Selected page state',
        description:
          'Visually highlights active page number with brand fill and makes it non-interactive (aria-current="page").',
      },
      {
        id: 'pag-ranges',
        label: 'Page display ranges',
        description:
          'Renders bounded range around active page (e.g. 1 ... 4 [5] 6 ... 20) with ellipsis jump buttons.',
      },
      {
        id: 'pag-items',
        label: 'Amount of items per page',
        description:
          'Provides dropdown to select 10, 25, 50, or 100 items per page with live recount.',
      },
      {
        id: 'pag-indet',
        label: 'Indeterminate amount of pages',
        description:
          'Supports cursor-based previous/next mode when total count is unknown beforehand.',
      },
      {
        id: 'pag-labels',
        label: 'Full page label announcements',
        description:
          'Provides dynamic aria-label ("Page 5 of 20", "Go to page 6") instead of bare numbers.',
      },
      {
        id: 'pag-announcement',
        label: 'State announcement',
        description: 'Screen reader announces active page selection upon focus or page transition.',
      },
    ],
  },
  {
    id: 'comp-progress-bar',
    name: 'Progress bar',
    category: 'Feedback',
    description:
      'Bar displaying progress for a task that takes a long time or consists of several steps.',
    totalChecks: 4,
    items: [
      {
        id: 'prg-label',
        label: 'Label',
        description:
          'Provide support for visually displaying a label explaining what a progress bar is responsible for.',
      },
      {
        id: 'prg-sizes',
        label: 'Sizes',
        description:
          'Loading indicators might provide multiple sizes, depending on the size of the areas where the loading indicator is rendered.',
      },
      {
        id: 'prg-duration',
        label: 'Duration',
        description:
          "In some cases, the wait time can't be determined. The loading indicator should be shown until the loading finishes or an error happens. In other cases, it's better to indicate the time left until the loading is complete.",
      },
      {
        id: 'prg-a11y',
        label: 'Accessibility label',
        description:
          "Provide support for adding an accessibility label in case you can't display a label in the interface.",
      },
    ],
  },
  {
    id: 'comp-radio',
    name: 'Input radio',
    category: 'Form',
    description: 'Radio is a form element used for selecting one option from a list.',
    totalChecks: 5,
    items: [
      {
        id: 'rad-label',
        label: 'Label',
        description:
          'There should be a text label linked with the radio field. Clicking the label should also trigger the selection. If the label is not rendered on the page, assistive technologies should still announce it.',
      },
      {
        id: 'rad-checked',
        label: 'Checked state',
        description: 'Display when the radio gets selected and is used for the form submission.',
      },
      {
        id: 'rad-error',
        label: 'Error state',
        description:
          'Use an error state for form validation when the error is related to the radio field. Always use a text error along with a different field color.',
      },
      {
        id: 'rad-group',
        label: 'Radio group',
        description:
          'Radio buttons are always used as a group to avoid locking the selection after one of the radio buttons is checked.',
      },
      {
        id: 'rad-keyboard',
        label: 'Keyboard support',
        description:
          'Radio selection should be triggered with the keyboard. Using native elements for this should provide this kind of interaction automatically.',
      },
    ],
  },
  {
    id: 'comp-select',
    name: 'Select',
    category: 'Form',
    description: 'Select lets you choose a single value from a list of options.',
    totalChecks: 8,
    items: [
      {
        id: 'sel-label',
        label: 'Label',
        description:
          'Text labels linked with the Select field can provide users with additional context. Clicking the label should also trigger the select dropdown.',
      },
      {
        id: 'sel-error',
        label: 'Error state',
        description:
          'Use an error state for form validation when the error is related to the select only. Display an additional error icon for better accessibility.',
      },
      {
        id: 'sel-disabled',
        label: 'Disabled state',
        description:
          'Use the disabled state to prevent Select interactions and remove its value from the submitted form values.',
      },
      {
        id: 'sel-placeholder',
        label: 'Placeholder',
        description:
          'When no value is selected - display a placeholder value. You can use the same placeholder value to let users reset the select value back to the default.',
      },
      {
        id: 'sel-helper',
        label: 'Helper text',
        description:
          'Provide users with additional context about the select purpose and the requirements for the selection.',
      },
      {
        id: 'sel-icon',
        label: 'Icon support',
        description:
          'Add an area for displaying an icon at the start of the field to communicate the purpose of the Select as a component or the selected value.',
      },
      {
        id: 'sel-prefix',
        label: 'Prefix',
        description:
          'Add an area for custom content to make the selection more contextual for the user. For example, you can display country flags in your country code selection.',
      },
      {
        id: 'sel-a11y',
        label: 'Accessibility role',
        description:
          'Assistive technologies announce expanded/collapsed state, selected value, and provide full keyboard arrow navigation.',
      },
    ],
  },
  {
    id: 'comp-skeleton',
    name: 'Skeleton',
    category: 'Feedback',
    description: 'Placeholder replacing page elements while their data is loading.',
    totalChecks: 4,
    items: [
      {
        id: 'skl-sizes',
        label: 'Sizes',
        description:
          'Skeleton matches components of various sizes available in design system to avoid layout shifts once data is loaded.',
      },
      {
        id: 'skl-shapes',
        label: 'Shapes',
        description:
          'Matches components of various shapes (circles, pills, rectangles) to keep loading state aligned with actual layout.',
      },
      {
        id: 'skl-comp',
        label: 'Composition',
        description:
          'Compose simple skeletons into advanced composite layouts without requiring 1:1 interface mapping.',
      },
      {
        id: 'skl-motion',
        label: 'Reduced motion',
        description:
          'Reduces or altogether removes the shimmer wave animation for the prefers-reduced-motion user preference.',
      },
    ],
  },
  {
    id: 'comp-switch',
    name: 'Switch',
    category: 'Form',
    description: 'Toggle for immediately changing the state of a single item.',
    totalChecks: 5,
    items: [
      {
        id: 'swh-label',
        label: 'Label',
        description:
          'Text label linked with switch; clicking label triggers switch selection; announced by assistive technologies when unrendered visually.',
      },
      {
        id: 'swh-checked',
        label: 'Checked state',
        description:
          'Displays when switch gets selected and activates underlying functionality, immediately updating data.',
      },
      {
        id: 'swh-disabled',
        label: 'Disabled state',
        description: 'Disabled state prevents switch interactions and visual manipulation.',
      },
      {
        id: 'swh-keyboard',
        label: 'Keyboard navigation',
        description:
          'Switch selection triggered via Spacebar or Enter using native button or input semantics.',
      },
      {
        id: 'swh-a11y',
        label: 'Accessibility label',
        description:
          'Provides accessible name (aria-label or aria-labelledby) describing component purpose when visual text is omitted.',
      },
    ],
  },
  {
    id: 'comp-tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Navigation between multiple pages or content sections.',
    totalChecks: 7,
    items: [
      {
        id: 'tab-comp',
        label: 'Content composition',
        description:
          'Content area flexible enough to support various types of content, including other components.',
      },
      {
        id: 'tab-variants',
        label: 'Variants',
        description:
          'Multiple variants: rendered as pills when used directly on the page, or underlined when inside cards.',
      },
      {
        id: 'tab-selected',
        label: 'Selected state',
        description:
          'One tab trigger is always selected and highlighted visually since tabs display content from one panel.',
      },
      {
        id: 'tab-disabled',
        label: 'Disabled state',
        description:
          'Tab triggers can be disabled to prevent users from switching to a specific tab panel.',
      },
      {
        id: 'tab-icon',
        label: 'Icon support',
        description:
          'Displays an icon next to tab trigger text to better illustrate the meaning of each tab.',
      },
      {
        id: 'tab-equal',
        label: 'Equal width layout',
        description:
          'Tab triggers stretch to take equal horizontal space when spanning the full width of the parent container.',
      },
      {
        id: 'tab-keyboard',
        label: 'Keyboard support',
        description:
          'Arrow navigation switches between panels; Home and End keys jump to first and last panels respectively.',
      },
    ],
  },
  {
    id: 'comp-textarea',
    name: 'Text area',
    category: 'Form',
    description: 'Form field to enter and edit multiline text.',
    totalChecks: 7,
    items: [
      {
        id: 'txa-label',
        label: 'Label',
        description:
          'Text labels linked with text area provide users with additional context; clicking label moves focus to field.',
      },
      {
        id: 'txa-error',
        label: 'Error state',
        description:
          'Error state for form validation when error relates only to text area, with text error and alert styling.',
      },
      {
        id: 'txa-disabled',
        label: 'Disabled state',
        description:
          'Disabled state prevents text area interactions and removes its value from submitted form values.',
      },
      {
        id: 'txa-placeholder',
        label: 'Placeholder',
        description:
          'Displays placeholder value when empty without substituting the persistent label.',
      },
      {
        id: 'txa-helper',
        label: 'Helper text',
        description:
          'Provides users with additional context about purpose and formatting requirements for expected value.',
      },
      {
        id: 'txa-sizes',
        label: 'Sizes',
        description:
          'Comes in multiple sizes (e.g. compact for data tables, large for marketing inquiry forms).',
      },
      {
        id: 'txa-a11y',
        label: 'Accessibility label',
        description: 'Provides accessible name when visual label is omitted.',
      },
    ],
  },
  {
    id: 'comp-textfield',
    name: 'Text field',
    category: 'Form',
    description: 'Form field to enter and edit single-line text.',
    totalChecks: 9,
    items: [
      {
        id: 'txf-label',
        label: 'Label',
        description:
          'Text labels linked with text field provide users with additional context; clicking label moves focus to field.',
      },
      {
        id: 'txf-error',
        label: 'Error state',
        description:
          'Error state for form validation when error relates only to text field, with distinct error text and icon.',
      },
      {
        id: 'txf-disabled',
        label: 'Disabled state',
        description:
          'Disabled state prevents text field interactions and removes its value from submitted form values.',
      },
      {
        id: 'txf-placeholder',
        label: 'Placeholder',
        description:
          'Displays placeholder value when empty without substituting the persistent label.',
      },
      {
        id: 'txf-helper',
        label: 'Helper text',
        description:
          'Provides users with additional context about text field purpose and character/format requirements.',
      },
      {
        id: 'txf-icon',
        label: 'Icon support',
        description: 'Displays leading icon to communicate component purpose or input datatype.',
      },
      {
        id: 'txf-prefix-suffix',
        label: 'Prefix / Suffix',
        description:
          'Area for custom contextual content (e.g. payment provider badges, currency symbols, domain suffixes).',
      },
      {
        id: 'txf-sizes',
        label: 'Sizes',
        description:
          'Multiple sizes: small 32px for dense data grids, standard 40px, large 48px for marketing/lead capture.',
      },
      {
        id: 'txf-a11y',
        label: 'Accessibility label',
        description: 'Provides accessible name when visual label is omitted.',
      },
    ],
  },
  {
    id: 'comp-toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Notification message or a piece of information displayed above the page content.',
    totalChecks: 8,
    items: [
      {
        id: 'tst-comp',
        label: 'Content composition',
        description:
          'Content area flexible enough to support various types of content, including other components.',
      },
      {
        id: 'tst-colors',
        label: 'Colors',
        description:
          'Supports multiple semantic colors depending on notification role (e.g. red for error notifications, emerald for success).',
      },
      {
        id: 'tst-icon',
        label: 'Icon support',
        description:
          'Area for displaying an icon at the start of the toast to communicate the purpose of the notification.',
      },
      {
        id: 'tst-timeout',
        label: 'Timeout',
        description:
          'Dismissed after a sufficient reading timeout, or provides a close button when persistent.',
      },
      {
        id: 'tst-stacking',
        label: 'Stacking',
        description:
          'Stacks multiple active toasts on top of each other to avoid cluttering the screen.',
      },
      {
        id: 'tst-action',
        label: 'Supplementary action',
        description: 'Contextual action element (e.g. undo operation when deleting content).',
      },
      {
        id: 'tst-focus',
        label: 'Focus management',
        description:
          'Keyboard focusable actions; timeout pauses while focus remains inside toast container.',
      },
      {
        id: 'tst-motion',
        label: 'Reduced motion',
        description:
          'Reduces or removes entrance/exit slide animation for reduced motion preference.',
      },
    ],
  },
  {
    id: 'comp-tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    description: 'Contextual text information display on element hover or focus.',
    totalChecks: 3,
    items: [
      {
        id: 'tlp-pos',
        label: 'Positioning',
        description:
          "Dynamically switches position to alternate sides (top/bottom/left/right) when default position doesn't fit into viewport.",
      },
      {
        id: 'tlp-timeout',
        label: 'Timeout',
        description:
          'Brief delay before opening to prevent unintentional triggers while cursor moves across screen.',
      },
      {
        id: 'tlp-keyboard',
        label: 'Keyboard support',
        description: 'Accessible on trigger element keyboard focus as well as mouse hover.',
      },
    ],
  },
];

export function CoreComponentsManual({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [checkedItems, setCheckedItems] = React.useState<Record<string, boolean>>({});
  const [expandedDrawers, setExpandedDrawers] = React.useState<Record<string, boolean>>({});
  const [expandAllDrawers, setExpandAllDrawers] = React.useState<boolean>(false);
  const [activePreview, setActivePreview] = React.useState<string>('comp-accordion');
  const [accordionOpen, setAccordionOpen] = React.useState<boolean>(false);
  const [checkboxState, setCheckboxState] = React.useState<
    'unchecked' | 'checked' | 'indeterminate'
  >('checked');
  const [progressBarVal, setProgressBarVal] = React.useState<number>(68);
  const [progressBarSize, setProgressBarSize] = React.useState<'sm' | 'md' | 'lg'>('md');
  const [radioSelected, setRadioSelected] = React.useState<string>('term-semester');
  const [radioHasError, setRadioHasError] = React.useState<boolean>(false);
  const [selectValue, setSelectValue] = React.useState<string>('pp-central');
  const [selectHasError, setSelectHasError] = React.useState<boolean>(false);
  const [switchActive, setSwitchActive] = React.useState<boolean>(true);
  const [tabsActive, setTabsActive] = React.useState<string>('overview');
  const [tabsVariant, setTabsVariant] = React.useState<'pills' | 'underlined'>('pills');
  const [textareaValue, setTextareaValue] = React.useState<string>(
    'Student demonstrated exceptional proficiency in system architecture, microservices decomposition, and relational schema normalization.',
  );
  const [textareaError, setTextareaError] = React.useState<boolean>(false);
  const [textFieldValue, setTextFieldValue] = React.useState<string>('Sokha Chea');
  const [textFieldError, setTextFieldError] = React.useState<boolean>(false);
  const [toastRole, setToastRole] = React.useState<'success' | 'error' | 'info'>('success');
  const [toastVisible, setToastVisible] = React.useState<boolean>(true);
  const [tooltipPos, setTooltipPos] = React.useState<'top' | 'bottom'>('top');

  const toggleCheck = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const categories = React.useMemo(
    () => [
      { id: 'All', label: 'All', count: CORE_COMPONENTS_SPECS.length },
      {
        id: 'Form',
        label: 'Form',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Form').length,
      },
      {
        id: 'Navigation',
        label: 'Navigation',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Navigation').length,
      },
      {
        id: 'Structure',
        label: 'Structure',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Structure').length,
      },
      {
        id: 'Feedback',
        label: 'Feedback',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Feedback').length,
      },
      {
        id: 'Media',
        label: 'Media',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Media').length,
      },
      {
        id: 'Action',
        label: 'Action',
        count: CORE_COMPONENTS_SPECS.filter((s) => s.category === 'Action').length,
      },
    ],
    [],
  );

  const filteredSpecs = React.useMemo(() => {
    if (selectedCategory === 'All') return CORE_COMPONENTS_SPECS;
    return CORE_COMPONENTS_SPECS.filter((spec) => spec.category === selectedCategory);
  }, [selectedCategory]);

  const totalPossibleChecks = CORE_COMPONENTS_SPECS.reduce((acc, s) => acc + s.totalChecks, 0);
  const currentCheckedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div id="core-components-manual" className="space-y-8">
      {/* ------------------------------------------------------------- */}
      {/* 1. HEADER & DEFINITION BANNER                                  */}
      {/* ------------------------------------------------------------- */}
      {!hideHeader ? (
        <div className="space-y-4 rounded-3xl border border-[#CAD3F5] bg-gradient-to-br from-[#EFF5FF] via-white to-[#F8FAFC] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#0056FF]/30 bg-[#0056FF]/10 px-3 py-1 font-mono text-[11px] font-bold text-[#0056FF]">
                <Sparkles className="size-3.5" />
                <span>CORE REUSABLE COMPONENT SPECIFICATIONS</span>
              </div>
              <h2 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                Core Components Manual
              </h2>
              <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                Components are the main building blocks for user interfaces. Building a reusable
                component library enhances your product development workflow by reducing design and
                tech debt and speeding up the process. Core components can&apos;t be broken down
                into granular pieces without losing their meaning.
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 font-mono text-xs">
              <span className="rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-bold text-[#0056FF]">
                VERIFICATION: {currentCheckedCount} of {totalPossibleChecks} Checks
              </span>
              <span className="text-[10px] text-slate-500">
                {CORE_COMPONENTS_SPECS.length} Core Primitives &middot; {totalPossibleChecks} Audit
                Invariants
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 flex items-center gap-1 font-mono text-[11px] font-bold text-slate-500 uppercase">
              <Filter className="size-3" />
              Category:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'cursor-pointer rounded-lg px-2.5 py-1 font-sans text-xs font-semibold transition-all',
                    isActive
                      ? 'bg-[#0056FF] text-white shadow-2xs'
                      : 'border border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      'ml-1 font-mono text-[10px]',
                      isActive ? 'text-white/80' : 'text-slate-400',
                    )}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* COMPACT TOOLBAR FOR STUDIO MODE */
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CAD3F5] bg-gradient-to-r from-[#EFF5FF]/80 via-white to-[#EFF5FF]/80 p-3.5 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-600 uppercase">
              <Filter className="size-3.5 text-[#0056FF]" />
              Cluster:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'cursor-pointer rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all active:scale-[0.97]',
                    isActive
                      ? 'border border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                      : 'border border-[#CAD3F5] bg-white text-[#020617] hover:bg-[#EFF5FF]',
                  )}
                >
                  <span>{cat.label}</span>
                  <span
                    className={cn(
                      'ml-1.5 font-mono text-[10px]',
                      isActive ? 'text-white/80' : 'text-slate-400',
                    )}
                  >
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setExpandAllDrawers((prev) => !prev)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-mono text-xs font-bold text-slate-700 hover:border-[#0056FF] hover:text-[#0056FF] active:scale-[0.97]"
            >
              <Sliders className="size-3 text-[#0056FF]" />
              <span>{expandAllDrawers ? 'Collapse Invariants' : 'Expand All Invariants'}</span>
            </button>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0056FF]">
              <span>
                {currentCheckedCount} of {totalPossibleChecks} Verified
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. CORE COMPONENTS 12-PRIMITIVE SPECIFICATION GRID             */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredSpecs.map((spec) => {
          const checkedInSpec = spec.items.filter((item) => checkedItems[item.id]).length;
          const isComplete = checkedInSpec === spec.totalChecks;
          const isDrawerOpen = expandAllDrawers || Boolean(expandedDrawers[spec.id]);

          return (
            <div
              key={spec.id}
              id={spec.id}
              className={cn(
                'group flex scroll-mt-24 flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all duration-200 hover:shadow-md',
                isComplete ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-[#CAD3F5]',
              )}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-[#EFF5FF]/40 to-white p-5 pb-3.5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                      {spec.category}
                    </span>
                    <h3 className="font-sans text-xl font-black text-[#020617]">{spec.name}</h3>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-slate-500">
                    {spec.description}
                  </p>
                </div>

                {/* Batch Verify Component Pill */}
                <button
                  type="button"
                  onClick={() => {
                    const willCheck = !isComplete;
                    setCheckedItems((prev) => {
                      const next = { ...prev };
                      spec.items.forEach((it) => {
                        next[it.id] = willCheck;
                      });
                      return next;
                    });
                  }}
                  title="Toggle all invariants for this component"
                  className={cn(
                    'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-all active:scale-[0.97]',
                    isComplete
                      ? 'border border-emerald-300 bg-emerald-50 text-emerald-700'
                      : 'border border-[#CAD3F5] bg-white text-[#0056FF] hover:bg-[#EFF5FF]',
                  )}
                >
                  {isComplete && <Check className="size-3 stroke-[3]" />}
                  <span>
                    {checkedInSpec}/{spec.totalChecks} Verified
                  </span>
                </button>
              </div>

              {/* 1. HERO LIVE INTERACTIVE PREVIEW STAGE (FRONT & CENTER) */}
              <div className="p-5 pb-2">
                <div className="relative flex min-h-[110px] flex-col justify-center rounded-xl border border-[#CAD3F5] bg-gradient-to-b from-[#EFF5FF]/40 to-white p-4">
                  <div className="mb-2.5 flex items-center justify-between border-b border-[#CAD3F5]/30 pb-2">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#0056FF] uppercase select-none">
                      <Sparkles className="size-3 text-[#0056FF]" />
                      <span>Live Interactive Stage</span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-400 select-none">
                      Tactile Operable Preview
                    </span>
                  </div>

                  {/* Individual Component Previews */}
                  <div className="py-1">
                    {spec.id === 'comp-accordion' && (
                      <div className="rounded-lg border border-[#CAD3F5] bg-white">
                        <button
                          type="button"
                          onClick={() => setAccordionOpen(!accordionOpen)}
                          className="flex w-full items-center justify-between p-2.5 font-sans text-xs font-bold text-[#020617]"
                        >
                          <span>Academic Calendar 2026-2027</span>
                          <ChevronDown
                            className={cn(
                              'size-4 transition-transform',
                              accordionOpen && 'rotate-180',
                            )}
                          />
                        </button>
                        {accordionOpen && (
                          <div className="border-t border-slate-100 p-2.5 font-sans text-xs text-slate-600">
                            Semester 1 begins October 15, 2026. Fall enrollment window open.
                          </div>
                        )}
                      </div>
                    )}

                    {spec.id === 'comp-alert' && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-amber-900">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        <div className="space-y-0.5">
                          <div className="font-sans text-xs font-bold">
                            Unsaved Roster Modifications
                          </div>
                          <div className="text-[11px]">Save class changes before leaving page.</div>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-avatar' && (
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-full bg-[#0056FF] font-sans text-xs font-bold text-white">
                          SC
                        </div>
                        <div className="flex -space-x-2">
                          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[10px] font-bold text-white">
                            JD
                          </div>
                          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white">
                            MK
                          </div>
                          <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-[10px] font-bold text-white">
                            +4
                          </div>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-badge' && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                          Active
                        </span>
                        <span className="rounded-md border border-[#0056FF]/30 bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                          Enrolled
                        </span>
                        <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-700">
                          Pending (3)
                        </span>
                      </div>
                    )}

                    {spec.id === 'comp-button' && (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          className="cursor-pointer rounded-lg bg-[#0056FF] px-3 py-1.5 font-sans text-xs font-bold text-white transition-transform active:scale-95"
                        >
                          Primary Action
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer rounded-lg border border-[#CAD3F5] bg-white px-3 py-1.5 font-sans text-xs font-bold text-[#020617] hover:bg-[#EFF5FF]"
                        >
                          Secondary
                        </button>
                        <button
                          type="button"
                          disabled
                          className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 font-sans text-xs font-bold text-slate-400"
                        >
                          Disabled
                        </button>
                      </div>
                    )}

                    {spec.id === 'comp-breadcrumbs' && (
                      <nav
                        aria-label="Breadcrumbs"
                        className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500"
                      >
                        <span className="cursor-pointer hover:text-[#0056FF]">Academics</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-[#0056FF]">Curriculum</span>
                        <span>/</span>
                        <span className="font-bold text-[#020617]">CS401</span>
                      </nav>
                    )}

                    {spec.id === 'comp-calendar' && (
                      <div className="flex items-center justify-between rounded-lg border border-[#CAD3F5] bg-white p-2">
                        <div className="flex items-center gap-2 font-sans text-xs font-bold text-[#020617]">
                          <CalendarIcon className="size-4 text-[#0056FF]" />
                          <span>October 2026</span>
                        </div>
                        <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] text-[#0056FF]">
                          Khmer / English (Mon Start)
                        </span>
                      </div>
                    )}

                    {spec.id === 'comp-card' && (
                      <div className="rounded-lg border border-[#CAD3F5] bg-white p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-[#020617]">
                            CS401 Syllabus
                          </span>
                          <span className="font-mono text-[10px] text-[#0056FF]">3 Credits</span>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-carousel' && (
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        {[1, 2, 3].map((num) => (
                          <div
                            key={num}
                            className="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white font-mono text-xs font-bold text-slate-700"
                          >
                            Slide {num}
                          </div>
                        ))}
                      </div>
                    )}

                    {spec.id === 'comp-checkbox' && (
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 font-sans text-xs font-bold text-[#020617]">
                          <input
                            type="checkbox"
                            checked={checkboxState === 'checked'}
                            onChange={() =>
                              setCheckboxState(
                                checkboxState === 'checked' ? 'unchecked' : 'checked',
                              )
                            }
                            className="size-4 rounded text-[#0056FF]"
                          />
                          <span>Active Enrollment</span>
                        </label>
                      </div>
                    )}

                    {spec.id === 'comp-divider' && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Left Section</span>
                        <div className="h-4 w-px bg-[#CAD3F5]" />
                        <span className="text-slate-500">Right Section</span>
                      </div>
                    )}

                    {spec.id === 'comp-dropdown' && (
                      <div className="flex items-center justify-between rounded-lg border border-[#CAD3F5] bg-white p-2 text-xs">
                        <span className="font-bold text-[#020617]">Select Campus Branch...</span>
                        <ChevronDown className="size-3.5 text-slate-400" />
                      </div>
                    )}

                    {spec.id === 'comp-icon' && (
                      <div className="flex items-center gap-4 text-[#0056FF]">
                        <div className="flex flex-col items-center gap-1">
                          <Sparkles className="size-4" />
                          <span className="font-mono text-[9px] text-slate-400">16dp</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Sparkles className="size-5" />
                          <span className="font-mono text-[9px] text-slate-400">20dp</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Sparkles className="size-6" />
                          <span className="font-mono text-[9px] text-slate-400">24dp</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Sparkles className="size-8" />
                          <span className="font-mono text-[9px] text-slate-400">32dp</span>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-image' && (
                      <div className="relative flex aspect-video w-full flex-col justify-between overflow-hidden rounded-lg border border-[#CAD3F5] bg-slate-100 p-3">
                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                          <span>Aspect Ratio: 16:9</span>
                          <span className="rounded bg-white px-1.5 py-0.5 font-bold text-[#0056FF]">
                            Density: 2x
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-sans text-xs text-slate-600">
                          <Info className="size-4 text-[#0056FF]" />
                          <span>alt=&quot;Campus Faculty Administration Hall Exterior&quot;</span>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-link' && (
                      <div className="font-sans text-xs leading-relaxed text-slate-700">
                        View institutional governance details in the{' '}
                        <a
                          href="#brand-blueprint"
                          onClick={(e) => e.preventDefault()}
                          className="inline-flex items-center gap-1 font-bold text-[#0056FF] underline decoration-[#0056FF]/40 underline-offset-2 hover:decoration-[#0056FF]"
                        >
                          <span>Academic Charter</span>
                          <ExternalLink className="size-3" />
                        </a>{' '}
                        or inspect branch locations.
                      </div>
                    )}

                    {spec.id === 'comp-list' && (
                      <ul className="space-y-1 font-sans text-xs text-slate-700" role="list">
                        <li className="flex items-center gap-2">
                          <span className="flex size-4 items-center justify-center rounded-full bg-[#EFF5FF] font-mono text-[10px] font-bold text-[#0056FF]">
                            1
                          </span>
                          <span>Configure Institutional Branches</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex size-4 items-center justify-center rounded-full bg-[#EFF5FF] font-mono text-[10px] font-bold text-[#0056FF]">
                            2
                          </span>
                          <span>Assign Department Faculty Leads</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="flex size-4 items-center justify-center rounded-full bg-[#EFF5FF] font-mono text-[10px] font-bold text-[#0056FF]">
                            3
                          </span>
                          <span>Enroll Students &amp; Issue Invoices</span>
                        </li>
                      </ul>
                    )}

                    {spec.id === 'comp-loading' && (
                      <div className="flex items-center gap-3">
                        <div
                          className="size-5 animate-spin rounded-full border-2 border-[#CAD3F5] border-t-[#0056FF]"
                          role="status"
                          aria-label="Loading student records"
                        />
                        <span className="font-mono text-xs font-bold text-[#0056FF]">
                          Loading class roster... (84%)
                        </span>
                      </div>
                    )}

                    {spec.id === 'comp-modal' && (
                      <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-white p-3 shadow-xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="font-sans text-xs font-bold text-[#020617]">
                            Confirm Enrollment
                          </span>
                          <span className="rounded bg-slate-100 px-1 font-mono text-[9px] text-slate-500">
                            Esc to close
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-slate-600">
                          Register Student ID #4092 for CS401 Fall Term?
                        </p>
                        <div className="flex justify-end gap-1.5 pt-1">
                          <button
                            type="button"
                            className="rounded px-2 py-1 font-sans text-[11px] font-bold text-slate-600 hover:bg-slate-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="rounded bg-[#0056FF] px-2.5 py-1 font-sans text-[11px] font-bold text-white"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-pagination' && (
                      <div className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded border border-[#CAD3F5] bg-white text-slate-500"
                          >
                            <ChevronLeft className="size-3.5" />
                          </button>
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded bg-[#0056FF] font-bold text-white"
                          >
                            1
                          </button>
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded border border-[#CAD3F5] bg-white text-slate-700"
                          >
                            2
                          </button>
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded border border-[#CAD3F5] bg-white text-slate-700"
                          >
                            3
                          </button>
                          <span className="px-1 text-slate-400">...</span>
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded border border-[#CAD3F5] bg-white text-slate-700"
                          >
                            12
                          </button>
                          <button
                            type="button"
                            className="flex size-6 items-center justify-center rounded border border-[#CAD3F5] bg-white text-slate-500"
                          >
                            <ChevronRight className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-400">10 of 120 items</span>
                      </div>
                    )}

                    {spec.id === 'comp-progress-bar' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#020617]">
                              Uploading Transcript PDF
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">
                              ({progressBarVal}%)
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px]">
                            <span className="text-slate-500">Est. 8s left</span>
                            <div className="flex rounded border border-[#CAD3F5] p-0.5">
                              {(['sm', 'md', 'lg'] as const).map((sz) => (
                                <button
                                  key={sz}
                                  type="button"
                                  onClick={() => setProgressBarSize(sz)}
                                  className={cn(
                                    'py-0.2 cursor-pointer rounded px-1.5 text-[9px] font-bold uppercase transition-colors',
                                    progressBarSize === sz
                                      ? 'bg-[#0056FF] text-white'
                                      : 'text-slate-500 hover:text-slate-900',
                                  )}
                                >
                                  {sz}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div
                          role="progressbar"
                          aria-valuenow={progressBarVal}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Academic Transcript Upload Progress"
                          className={cn(
                            'w-full overflow-hidden rounded-full bg-slate-100',
                            progressBarSize === 'sm' && 'h-1.5',
                            progressBarSize === 'md' && 'h-2.5',
                            progressBarSize === 'lg' && 'h-4',
                          )}
                        >
                          <div
                            className="h-full rounded-full bg-[#0056FF] transition-all duration-300"
                            style={{ width: `${progressBarVal}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                          <span>File size: 4.2 MB / 6.1 MB</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setProgressBarVal((v) => Math.max(10, v - 15))}
                              className="cursor-pointer hover:text-[#0056FF]"
                            >
                              -15%
                            </button>
                            <button
                              type="button"
                              onClick={() => setProgressBarVal((v) => Math.min(100, v + 15))}
                              className="cursor-pointer hover:text-[#0056FF]"
                            >
                              +15%
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-radio' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#020617]">
                            Tuition Payment Frequency
                          </span>
                          <button
                            type="button"
                            onClick={() => setRadioHasError(!radioHasError)}
                            className={cn(
                              'cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                              radioHasError
                                ? 'border border-red-200 bg-red-50 text-red-600'
                                : 'bg-slate-100 text-slate-600',
                            )}
                          >
                            {radioHasError ? 'Clear Error' : 'Simulate Error'}
                          </button>
                        </div>

                        <div
                          role="radiogroup"
                          aria-label="Payment Frequency"
                          aria-invalid={radioHasError}
                          className="space-y-2"
                        >
                          {[
                            {
                              id: 'term-semester',
                              label: 'Semester Payment',
                              desc: 'Two installment billing cycles per academic year',
                            },
                            {
                              id: 'term-annual',
                              label: 'Annual Advance',
                              desc: '5% tuition discount paid upfront before term orientation',
                            },
                            {
                              id: 'term-monthly',
                              label: 'Monthly Direct Debit',
                              desc: '10 recurring debit schedules via Bakong KHQR',
                            },
                          ].map((opt) => {
                            const isChecked = radioSelected === opt.id;
                            return (
                              <label
                                key={opt.id}
                                htmlFor={`radio-${opt.id}`}
                                className={cn(
                                  'flex cursor-pointer items-start gap-3 rounded-xl border p-2.5 transition-all',
                                  isChecked
                                    ? 'border-[#0056FF] bg-[#EFF5FF]/40'
                                    : 'border-[#CAD3F5] bg-white hover:bg-slate-50',
                                  radioHasError && 'border-red-300 bg-red-50/20',
                                )}
                              >
                                <input
                                  type="radio"
                                  id={`radio-${opt.id}`}
                                  name="paymentFrequency"
                                  value={opt.id}
                                  checked={isChecked}
                                  onChange={() => setRadioSelected(opt.id)}
                                  className="mt-0.5 size-4 text-[#0056FF] focus:ring-[#0056FF]"
                                />
                                <div className="space-y-0.5">
                                  <span className="block font-sans text-xs font-bold text-[#020617]">
                                    {opt.label}
                                  </span>
                                  <span className="block font-sans text-[11px] text-slate-500">
                                    {opt.desc}
                                  </span>
                                </div>
                              </label>
                            );
                          })}
                        </div>

                        {radioHasError && (
                          <p className="flex items-center gap-1 font-sans text-xs text-red-600">
                            <AlertTriangle className="size-3.5" />
                            <span>
                              Please select an active tuition payment option to continue
                              registration.
                            </span>
                          </p>
                        )}
                      </div>
                    )}

                    {spec.id === 'comp-select' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="campus-select"
                            className="text-xs font-bold text-[#020617]"
                          >
                            Campus Branch Location
                          </label>
                          <button
                            type="button"
                            onClick={() => setSelectHasError(!selectHasError)}
                            className={cn(
                              'cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                              selectHasError
                                ? 'border border-red-200 bg-red-50 text-red-600'
                                : 'bg-slate-100 text-slate-600',
                            )}
                          >
                            {selectHasError ? 'Clear Error' : 'Simulate Error'}
                          </button>
                        </div>

                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                              KH-01
                            </span>
                          </div>
                          <select
                            id="campus-select"
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                            aria-invalid={selectHasError}
                            className={cn(
                              'w-full appearance-none rounded-xl border bg-white py-2.5 pr-10 pl-18 font-sans text-xs font-medium text-[#020617] shadow-2xs transition-all focus:border-[#0056FF] focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-hidden',
                              selectHasError
                                ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-200'
                                : 'border-[#CAD3F5] hover:border-[#0056FF]/50',
                            )}
                          >
                            <option value="">Choose campus location...</option>
                            <option value="pp-central">Phnom Penh Central Campus (Sen Sok)</option>
                            <option value="siem-reap">Siem Reap Regional Campus (Wat Bo)</option>
                            <option value="battambang">Battambang Innovation Hub</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                            {selectHasError ? (
                              <AlertTriangle className="size-4 text-red-500" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </div>
                        </div>

                        {selectHasError ? (
                          <p className="flex items-center gap-1 font-sans text-xs text-red-600">
                            <AlertTriangle className="size-3.5" />
                            <span>Valid campus branch is required for faculty allocation.</span>
                          </p>
                        ) : (
                          <p className="font-sans text-[11px] text-slate-500">
                            Determines localized classroom scheduling, faculty advisors, and
                            regional fee adjustments.
                          </p>
                        )}
                      </div>
                    )}

                    {spec.id === 'comp-skeleton' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#020617]">
                            Content Card Loading State
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            Avoids Cumulative Layout Shift (CLS)
                          </span>
                        </div>

                        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                          <div className="flex items-center gap-3">
                            <div className="size-10 shrink-0 animate-pulse rounded-full bg-slate-200" />
                            <div className="min-w-0 flex-1 space-y-1.5">
                              <div className="h-3.5 w-1/3 animate-pulse rounded-md bg-slate-200" />
                              <div className="h-2.5 w-1/2 animate-pulse rounded-md bg-slate-100" />
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <div className="h-2.5 w-full animate-pulse rounded-md bg-slate-100" />
                            <div className="h-2.5 w-5/6 animate-pulse rounded-md bg-slate-100" />
                            <div className="h-2.5 w-2/3 animate-pulse rounded-md bg-slate-100" />
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                            <div className="h-6 w-20 animate-pulse rounded-lg bg-slate-200" />
                            <div className="h-6 w-14 animate-pulse rounded-lg bg-slate-100" />
                          </div>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-switch' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#020617]">
                            Immediate State Toggle
                          </span>
                          <span
                            className={cn(
                              'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold',
                              switchActive
                                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'bg-slate-100 text-slate-500',
                            )}
                          >
                            {switchActive ? 'Enabled · Auto-Save' : 'Disabled · Standby'}
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#CAD3F5] bg-white p-3 transition-colors hover:bg-slate-50">
                            <div className="space-y-0.5 pr-4">
                              <span className="block font-sans text-xs font-bold text-[#020617]">
                                Automated SMS Grade Notification
                              </span>
                              <span className="block font-sans text-[11px] text-slate-500">
                                Dispatches instant SMS to registered guardians upon exam score
                                publication
                              </span>
                            </div>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={switchActive}
                              onClick={() => setSwitchActive(!switchActive)}
                              className={cn(
                                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-[#0056FF] focus:ring-offset-2 focus:outline-hidden',
                                switchActive ? 'bg-[#0056FF]' : 'bg-slate-200',
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                                  switchActive ? 'translate-x-5' : 'translate-x-0',
                                )}
                              />
                            </button>
                          </label>

                          <label className="flex cursor-not-allowed items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 opacity-60">
                            <div className="space-y-0.5 pr-4">
                              <span className="block font-sans text-xs font-bold text-slate-500">
                                Enterprise Ledger Sync (Locked)
                              </span>
                              <span className="block font-sans text-[11px] text-slate-400">
                                Requires Super Administrator elevated access permissions to
                                reconfigure
                              </span>
                            </div>
                            <div className="relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent bg-slate-300">
                              <span className="inline-block size-5 rounded-full bg-white shadow-sm" />
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-tabs' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#020617]">
                            Section Navigation
                          </span>
                          <div className="flex rounded border border-[#CAD3F5] p-0.5 font-mono text-[10px]">
                            <button
                              type="button"
                              onClick={() => setTabsVariant('pills')}
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 font-bold transition-colors',
                                tabsVariant === 'pills'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'text-slate-500 hover:text-slate-900',
                              )}
                            >
                              Pills
                            </button>
                            <button
                              type="button"
                              onClick={() => setTabsVariant('underlined')}
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 font-bold transition-colors',
                                tabsVariant === 'underlined'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'text-slate-500 hover:text-slate-900',
                              )}
                            >
                              Underlined
                            </button>
                          </div>
                        </div>

                        <div
                          className={cn(
                            'flex items-center gap-1.5',
                            tabsVariant === 'underlined' && 'border-b border-[#CAD3F5]',
                          )}
                        >
                          {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'curriculum', label: 'Curriculum' },
                            { id: 'faculty', label: 'Faculty' },
                          ].map((t) => {
                            const isTabActive = tabsActive === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                role="tab"
                                aria-selected={isTabActive}
                                onClick={() => setTabsActive(t.id)}
                                className={cn(
                                  'cursor-pointer px-3 py-1.5 font-sans text-xs font-bold transition-all',
                                  tabsVariant === 'pills' &&
                                    (isTabActive
                                      ? 'rounded-lg bg-[#0056FF] text-white shadow-xs'
                                      : 'rounded-lg text-slate-600 hover:bg-slate-100'),
                                  tabsVariant === 'underlined' &&
                                    (isTabActive
                                      ? '-mb-px border-b-2 border-[#0056FF] text-[#0056FF]'
                                      : 'text-slate-600 hover:text-slate-900'),
                                )}
                              >
                                {t.label}
                              </button>
                            );
                          })}
                          <button
                            type="button"
                            disabled
                            className="cursor-not-allowed px-3 py-1.5 font-sans text-xs font-medium text-slate-300"
                          >
                            Archives
                          </button>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-[#F8FAFC] p-3 text-xs leading-relaxed text-slate-600">
                          {tabsActive === 'overview' &&
                            'Overview panel: Core institutional degree accreditation, academic requirements, and department governance details.'}
                          {tabsActive === 'curriculum' &&
                            'Curriculum panel: 8 semester course syllabi, prerequisite course matrix, and laboratory credit allocations.'}
                          {tabsActive === 'faculty' &&
                            'Faculty panel: 24 active professors, department research groups, and scheduled consultation office hours.'}
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-textarea' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="comp-textarea-input"
                            className="text-xs font-bold text-[#020617]"
                          >
                            Academic Performance Evaluation
                          </label>
                          <button
                            type="button"
                            onClick={() => setTextareaError(!textareaError)}
                            className={cn(
                              'cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                              textareaError
                                ? 'border border-red-200 bg-red-50 text-red-600'
                                : 'bg-slate-100 text-slate-600',
                            )}
                          >
                            {textareaError ? 'Clear Error' : 'Simulate Error'}
                          </button>
                        </div>

                        <textarea
                          id="comp-textarea-input"
                          rows={3}
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                          placeholder="Semester comment"
                          aria-invalid={textareaError}
                          className={cn(
                            'w-full rounded-xl border bg-white p-3 font-sans text-xs font-medium text-[#020617] shadow-2xs transition-all placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-hidden',
                            textareaError
                              ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-200'
                              : 'border-[#CAD3F5] hover:border-[#0056FF]/50',
                          )}
                        />

                        <div className="flex items-center justify-between font-mono text-[10px]">
                          {textareaError ? (
                            <span className="flex items-center gap-1 font-sans text-xs text-red-600">
                              <AlertTriangle className="size-3.5" />
                              Commentary must be at least 40 characters for formal report card
                              export.
                            </span>
                          ) : (
                            <span className="font-sans text-[11px] text-slate-500">
                              Printed directly onto official end-of-term transcript card.
                            </span>
                          )}
                          <span className="shrink-0 text-slate-400">
                            {textareaValue.length} / 500
                          </span>
                        </div>
                      </div>
                    )}

                    {spec.id === 'comp-textfield' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="comp-textfield-input"
                            className="text-xs font-bold text-[#020617]"
                          >
                            Student Full Name (Latin)
                          </label>
                          <button
                            type="button"
                            onClick={() => setTextFieldError(!textFieldError)}
                            className={cn(
                              'cursor-pointer rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                              textFieldError
                                ? 'border border-red-200 bg-red-50 text-red-600'
                                : 'bg-slate-100 text-slate-600',
                            )}
                          >
                            {textFieldError ? 'Clear Error' : 'Simulate Error'}
                          </button>
                        </div>

                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <User className="size-4" />
                          </div>
                          <input
                            id="comp-textfield-input"
                            type="text"
                            value={textFieldValue}
                            onChange={(e) => setTextFieldValue(e.target.value)}
                            placeholder="Full name"
                            aria-invalid={textFieldError}
                            className={cn(
                              'w-full rounded-xl border bg-white py-2.5 pr-20 pl-9.5 font-sans text-xs font-medium text-[#020617] shadow-2xs transition-all placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-hidden',
                              textFieldError
                                ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-200'
                                : 'border-[#CAD3F5] hover:border-[#0056FF]/50',
                            )}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <span className="rounded bg-slate-100 px-2 py-1 font-mono text-[10px] font-bold text-slate-500">
                              ID: 8092
                            </span>
                          </div>
                        </div>

                        {textFieldError ? (
                          <p className="flex items-center gap-1 font-sans text-xs text-red-600">
                            <AlertTriangle className="size-3.5" />
                            <span>
                              Name must match passport or national identification document.
                            </span>
                          </p>
                        ) : (
                          <p className="font-sans text-[11px] text-slate-500">
                            Primary identification field synchronized with Ministry accreditation
                            database.
                          </p>
                        )}
                      </div>
                    )}

                    {spec.id === 'comp-toast' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#020617]">
                            Stacked Toast Notification Layer
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-[10px]">
                            <button
                              type="button"
                              onClick={() => setToastRole('success')}
                              className={cn(
                                'cursor-pointer rounded px-1.5 py-0.5 font-bold transition-colors',
                                toastRole === 'success'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-600',
                              )}
                            >
                              Success
                            </button>
                            <button
                              type="button"
                              onClick={() => setToastRole('error')}
                              className={cn(
                                'cursor-pointer rounded px-1.5 py-0.5 font-bold transition-colors',
                                toastRole === 'error'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-slate-100 text-slate-600',
                              )}
                            >
                              Error
                            </button>
                            <button
                              type="button"
                              onClick={() => setToastVisible(!toastVisible)}
                              className="cursor-pointer rounded border border-slate-200 px-1.5 py-0.5 font-bold text-slate-500 hover:bg-slate-50"
                            >
                              {toastVisible ? 'Dismiss' : 'Show'}
                            </button>
                          </div>
                        </div>

                        {toastVisible && (
                          <div
                            role="status"
                            aria-live="polite"
                            className={cn(
                              'flex items-center justify-between gap-3 rounded-xl border p-3 shadow-md transition-all',
                              toastRole === 'success' &&
                                'border-emerald-200 bg-emerald-50/90 text-emerald-950',
                              toastRole === 'error' && 'border-red-200 bg-red-50/90 text-red-950',
                            )}
                          >
                            <div className="flex min-w-0 items-center gap-2.5">
                              {toastRole === 'success' ? (
                                <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                              ) : (
                                <XCircle className="size-4 shrink-0 text-red-600" />
                              )}
                              <div className="space-y-0.5 text-xs">
                                <span className="block font-bold">
                                  {toastRole === 'success'
                                    ? 'Student Enrollment Confirmed'
                                    : 'Payment Transaction Declined'}
                                </span>
                                <span className="block text-[11px] opacity-80">
                                  {toastRole === 'success'
                                    ? 'Invoice #9042 created and guardian notified'
                                    : 'Bakong KHQR gateway returned timeout code E401'}
                                </span>
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                              <button
                                type="button"
                                className={cn(
                                  'cursor-pointer rounded-lg px-2 py-1 font-sans text-xs font-bold transition-colors',
                                  toastRole === 'success'
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'bg-red-600 text-white hover:bg-red-700',
                                )}
                              >
                                {toastRole === 'success' ? 'Undo' : 'Retry'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {spec.id === 'comp-tooltip' && (
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#020617]">
                            Contextual Positioning &amp; Delay
                          </span>
                          <div className="flex rounded border border-[#CAD3F5] p-0.5 font-mono text-[10px]">
                            <button
                              type="button"
                              onClick={() => setTooltipPos('top')}
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 font-bold transition-colors',
                                tooltipPos === 'top'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'text-slate-500 hover:text-slate-900',
                              )}
                            >
                              Top
                            </button>
                            <button
                              type="button"
                              onClick={() => setTooltipPos('bottom')}
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 font-bold transition-colors',
                                tooltipPos === 'bottom'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'text-slate-500 hover:text-slate-900',
                              )}
                            >
                              Bottom
                            </button>
                          </div>
                        </div>

                        <div className="relative flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-[#F8FAFC] py-6">
                          {tooltipPos === 'top' && (
                            <div
                              role="tooltip"
                              className="animate-in fade-in zoom-in-95 mb-2 flex items-center gap-1.5 rounded-lg bg-[#020617] px-2.5 py-1 font-sans text-[11px] font-semibold text-white shadow-md duration-150"
                            >
                              <Info className="size-3 text-cyan-400" />
                              <span>Calculated based on 8 semester credit weights (GPA 3.85)</span>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#020617]" />
                            </div>
                          )}

                          <button
                            type="button"
                            aria-describedby="gpa-tooltip"
                            className="cursor-pointer rounded-xl border border-[#CAD3F5] bg-white px-4 py-2 font-sans text-xs font-bold text-[#020617] shadow-2xs hover:border-[#0056FF] hover:bg-[#EFF5FF] focus:border-[#0056FF] focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-hidden"
                          >
                            Cumulative Academic GPA: 3.85
                          </button>

                          {tooltipPos === 'bottom' && (
                            <div
                              role="tooltip"
                              className="animate-in fade-in zoom-in-95 mt-2 flex items-center gap-1.5 rounded-lg bg-[#020617] px-2.5 py-1 font-sans text-[11px] font-semibold text-white shadow-md duration-150"
                            >
                              <Info className="size-3 text-cyan-400" />
                              <span>Calculated based on 8 semester credit weights (GPA 3.85)</span>
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#020617]" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. SPECIFICATION INVARIANTS ACCORDION DRAWER */}
              <div className="border-t border-slate-100 bg-white p-5 pt-3.5">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedDrawers((prev) => ({
                      ...prev,
                      [spec.id]: !isDrawerOpen,
                    }))
                  }
                  className="flex w-full cursor-pointer items-center justify-between font-mono text-[11px] font-bold text-slate-700 transition-colors hover:text-[#0056FF]"
                >
                  <div className="flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-[#0056FF]" />
                    <span>Invariant Criteria &amp; Rules ({spec.totalChecks})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className={isComplete ? 'font-bold text-emerald-600' : 'text-slate-400'}>
                      {isComplete ? 'All Verified' : `${spec.totalChecks - checkedInSpec} pending`}
                    </span>
                    <ChevronDown
                      className={cn(
                        'size-3.5 transition-transform duration-200',
                        isDrawerOpen && 'rotate-180',
                      )}
                    />
                  </div>
                </button>

                {/* Checklist Rows */}
                {isDrawerOpen && (
                  <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                    {spec.items.map((item) => {
                      const isChecked = Boolean(checkedItems[item.id]);
                      return (
                        <label
                          key={item.id}
                          className={cn(
                            'flex cursor-pointer items-start gap-2.5 rounded-xl border p-2.5 text-xs transition-colors',
                            isChecked
                              ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                              : 'border-slate-100 bg-[#F8FAFC]/50 text-slate-700 hover:bg-[#EFF5FF]/40',
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 size-4 cursor-pointer rounded border-[#CAD3F5] text-[#0056FF] focus:ring-[#0056FF]"
                          />
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <div className="flex items-center gap-1.5 font-sans font-bold text-[#020617]">
                              <span>{item.label}</span>
                              {isChecked && (
                                <Check className="size-3.5 stroke-[3] text-emerald-600" />
                              )}
                            </div>
                            <p className="font-sans text-[11px] leading-relaxed text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
