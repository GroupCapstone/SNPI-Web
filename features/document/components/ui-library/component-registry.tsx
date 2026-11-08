export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface RealWorldExample {
  title: string;
  scenario: string;
  impact: string;
}

export interface UxPrinciple {
  principle: string;
  detail: string;
}

export interface UsageGuideline {
  doItem: string;
  dontItem: string;
}

export interface ComponentItemDoc {
  id: string;
  name: string;
  category: string;
  description: string;
  paradigm: string;
  props: ComponentPropDoc[];
  codeSnippet: string;
  explanation: string;
  realWorldExamples: RealWorldExample[];
  uxPsychology: UxPrinciple[];
  usageGuidelines: UsageGuideline[];
  implementationNotes: string[];
  supportedStates: string[];
  isFuture?: boolean;
  builtAt?: string;
  updatedAt?: string;
  parentGroupId?: string;
}

export const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export type ComponentFreshness = 'new' | 'updated' | 'coming' | null;

/**
 * Calculates component freshness with a strict 7-day expiration gate.
 * - 'coming': Unbuilt specification (isFuture: true)
 * - 'new': Built within the last 7 days
 * - 'updated': Modified within the last 7 days
 * - null: Mature stable component (never displays a badge)
 */
export function getComponentFreshness(
  comp: { isFuture?: boolean; builtAt?: string; updatedAt?: string },
  now = new Date(),
): ComponentFreshness {
  if (comp.isFuture) return 'coming';
  const nowMs = now.getTime();
  if (comp.updatedAt) {
    const updatedMs = new Date(comp.updatedAt).getTime();
    if (nowMs >= updatedMs && nowMs - updatedMs <= SEVEN_DAYS_MS) {
      return 'updated';
    }
  }
  if (comp.builtAt) {
    const builtMs = new Date(comp.builtAt).getTime();
    if (nowMs >= builtMs && nowMs - builtMs <= SEVEN_DAYS_MS) {
      return 'new';
    }
  }
  return null;
}

export interface ComponentGroupNode {
  id: string;
  name: string;
  category: string;
  isParent: boolean;
  item?: ComponentItemDoc;
  children?: ComponentItemDoc[];
}

export const PARENT_GROUP_MAP: Record<string, { id: string; name: string; category: string }> = {
  navigation: { id: 'parent-navigation', name: 'Navigation', category: 'Navigation' },
  buttons: { id: 'parent-buttons', name: 'Buttons', category: 'Inputs' },
  'date-time-pickers': {
    id: 'parent-date-time-pickers',
    name: 'Date & time pickers',
    category: 'Inputs',
  },
  'loading-progress': {
    id: 'parent-loading-progress',
    name: 'Loading & progress',
    category: 'Feedback',
  },
  sheets: { id: 'parent-sheets', name: 'Sheets', category: 'Feedback' },
};

export interface DocNavItem {
  id: string;
  name: string;
  href: string;
  targetId?: string;
}

export const DOCUMENTATION_NAV_ITEMS: DocNavItem[] = [
  {
    id: 'brand-blueprint',
    name: 'Brand Blueprint',
    href: '/document/design-system#brand-blueprint',
    targetId: 'brand-blueprint',
  },
  {
    id: 'design-standards',
    name: 'Design Standards',
    href: '/document/design-system#brand-tokens',
    targetId: 'brand-tokens',
  },
  {
    id: 'touch-targets',
    name: 'Touch Targets',
    href: '/document/design-system#accessibility',
    targetId: 'accessibility',
  },
];

export interface M3NavItem {
  id: string;
  name: string;
  isParent?: boolean;
  targetId?: string;
  isFuture?: boolean;
  builtAt?: string;
  updatedAt?: string;
  children?: M3NavItem[];
}

export interface ComponentGroupNav {
  group: string;
  groupId: string;
  items: M3NavItem[];
}

export const COMPONENT_GROUPS_NAV: ComponentGroupNav[] = [
  {
    group: 'Navigation',
    groupId: 'group-navigation',
    items: [
      {
        id: 'parent-navigation',
        name: 'Navigation',
        isParent: true,
        children: [
          {
            id: 'cyber-armor-nav',
            name: 'Cyber Armor Nav',
            targetId: 'comp-cyber-armor-nav',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          {
            id: 'gooey-nav',
            name: 'Gooey Nav',
            targetId: 'comp-gooey-nav',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          {
            id: 'hook-sidebar',
            name: 'Hook Sidebar',
            targetId: 'comp-hook-sidebar',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          { id: 'navigation-bar', name: 'Navigation bar', builtAt: '2026-11-08T00:00:00.000Z' },
          {
            id: 'navigation-drawer',
            name: 'Navigation drawer',
            builtAt: '2026-11-08T00:00:00.000Z',
          },
          { id: 'navigation-rail', name: 'Navigation rail', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'side-navigation', name: 'Side navigation', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      {
        id: 'parent-menus',
        name: 'Menus & Dropdowns',
        isParent: true,
        children: [
          {
            id: 'dropdown',
            name: 'Dropdown',
            targetId: 'comp-dropdown',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          { id: 'menus', name: 'Menus', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      { id: 'accordion', name: 'Accordion', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'app-bars', name: 'App bars', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'breadcrumbs', name: 'Breadcrumbs', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'link', name: 'Link', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'tabs', name: 'Tabs', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'toolbars', name: 'Toolbars', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'tree-view', name: 'Tree view', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'search', name: 'Search', builtAt: '2026-11-08T00:00:00.000Z' },
    ],
  },
  {
    group: 'Inputs',
    groupId: 'group-inputs',
    items: [
      {
        id: 'parent-buttons',
        name: 'Buttons',
        isParent: true,
        children: [
          { id: 'action-button', name: 'Action button', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'action-group', name: 'Action group', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'action-bar', name: 'Action bar', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'all-buttons', name: 'All buttons', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'button-groups', name: 'Button groups', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'buttons-item', name: 'Buttons', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'close-button', name: 'Close button', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'extended-fabs', name: 'Extended FABs', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'fab-menu', name: 'FAB menu', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'fabs', name: 'FABs', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'icon-buttons', name: 'Icon buttons', builtAt: '2026-11-08T00:00:00.000Z' },
          {
            id: 'segmented-buttons',
            name: 'Segmented buttons',
            builtAt: '2026-11-08T00:00:00.000Z',
          },
          { id: 'split-button', name: 'Split button', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      {
        id: 'parent-date-time-pickers',
        name: 'Date & time pickers',
        isParent: true,
        children: [
          {
            id: 'duration-picker',
            name: 'Duration Picker',
            targetId: 'comp-duration-picker',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          { id: 'date-pickers', name: 'Date pickers', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'time-pickers', name: 'Time pickers', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      {
        id: 'parent-text-fields',
        name: 'Text fields',
        isParent: true,
        children: [
          {
            id: 'password-input',
            name: 'Password Input',
            targetId: 'comp-password-input',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          { id: 'text-fields', name: 'Text fields', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'text-area', name: 'Text area', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'number-field', name: 'Number field', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'search-field', name: 'Search field', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      {
        id: 'chip',
        name: 'Chips',
        targetId: 'comp-chip',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'switch',
        name: 'Switch',
        targetId: 'comp-switch',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      { id: 'checkbox', name: 'Checkbox', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'checkbox-group', name: 'Checkbox group', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'combo-box', name: 'Combo box', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'field-label', name: 'Field label', isFuture: true },
      { id: 'picker', name: 'Picker', isFuture: true },
      { id: 'radio-button', name: 'Radio button', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'radio-group', name: 'Radio group', isFuture: true },
      { id: 'rating', name: 'Rating', isFuture: true },
      { id: 'segmented-control', name: 'Segmented control', isFuture: true },
      { id: 'select-box', name: 'Select box', isFuture: true },
      { id: 'sliders', name: 'Sliders', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'color-area', name: 'Color area', isFuture: true },
      { id: 'color-handle-loupe', name: 'Color handle and loupe', isFuture: true },
      { id: 'color-slider', name: 'Color slider', isFuture: true },
      { id: 'color-wheel', name: 'Color wheel', isFuture: true },
      { id: 'swatch', name: 'Swatch', isFuture: true },
      { id: 'swatch-group', name: 'Swatch group', isFuture: true },
      { id: 'tag-field', name: 'Tag field', isFuture: true },
    ],
  },
  {
    group: 'Feedback',
    groupId: 'group-feedback',
    items: [
      {
        id: 'parent-loading-progress',
        name: 'Loading & progress',
        isParent: true,
        children: [
          {
            id: 'skeleton-loading-screen',
            name: 'Skeleton Loading',
            targetId: 'comp-skeleton-loading-screen',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          {
            id: 'loading-indicator',
            name: 'Loading indicator',
            builtAt: '2026-11-08T00:00:00.000Z',
          },
          {
            id: 'progress-indicators',
            name: 'Progress indicators',
            builtAt: '2026-11-08T00:00:00.000Z',
          },
          { id: 'progress-bar', name: 'Progress bar', isFuture: true },
          { id: 'progress-circle', name: 'Progress circle', isFuture: true },
          { id: 'meter', name: 'Meter', isFuture: true },
        ],
      },
      {
        id: 'parent-sheets',
        name: 'Sheets',
        isParent: true,
        children: [
          { id: 'bottom-sheets', name: 'Bottom sheets', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'side-sheets', name: 'Side sheets', builtAt: '2026-11-08T00:00:00.000Z' },
        ],
      },
      {
        id: 'parent-snackbars-toasts',
        name: 'Snackbars & Toasts',
        isParent: true,
        children: [
          {
            id: 'toast-stack',
            name: 'Toast Stack',
            targetId: 'comp-toast-stack',
            builtAt: '2026-11-01T00:00:00.000Z',
          },
          { id: 'snackbar', name: 'Snackbar', builtAt: '2026-11-08T00:00:00.000Z' },
          { id: 'toast', name: 'Toast', isFuture: true },
        ],
      },
      {
        id: 'notification-bell',
        name: 'Notification Bell',
        targetId: 'comp-notification-bell',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      { id: 'dialogs', name: 'Dialogs', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'alert-dialog', name: 'Alert dialog', isFuture: true },
      { id: 'alert-banner', name: 'Alert banner', isFuture: true },
      { id: 'standard-dialog', name: 'Standard dialog', isFuture: true },
      { id: 'takeover-dialog', name: 'Takeover dialog', isFuture: true },
      { id: 'in-line-alert', name: 'In-line alert', isFuture: true },
      { id: 'contextual-help', name: 'Contextual help', isFuture: true },
      { id: 'help-text', name: 'Help text', isFuture: true },
      { id: 'illustrated-message', name: 'Illustrated message', isFuture: true },
      { id: 'status-light', name: 'Status light', isFuture: true },
      { id: 'coach-indicator', name: 'Coach indicator', isFuture: true },
      { id: 'coach-mark', name: 'Coach mark', isFuture: true },
      { id: 'popover', name: 'Popover', isFuture: true },
      { id: 'tooltips', name: 'Tooltips', builtAt: '2026-11-08T00:00:00.000Z' },
      {
        id: 'status-404',
        name: 'Status 404 Console',
        targetId: 'comp-status-404',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
  {
    group: 'Display',
    groupId: 'group-display',
    items: [
      {
        id: 'data-table',
        name: 'Interactive Data Table',
        targetId: 'comp-data-table',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'animated-counter',
        name: 'Animated Counter',
        targetId: 'comp-animated-counter',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'step-player',
        name: 'Step Player',
        targetId: 'comp-step-player',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'voice-note',
        name: 'Voice Note Player',
        targetId: 'comp-voice-note',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      { id: 'avatar', name: 'Avatar', isFuture: true },
      { id: 'avatar-group', name: 'Avatar group', isFuture: true },
      { id: 'badges', name: 'Badges', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'calendar', name: 'Calendar', isFuture: true },
      { id: 'cards', name: 'Cards', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'carousel', name: 'Carousel', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'divider', name: 'Divider', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'drop-zone', name: 'Drop zone', isFuture: true },
      { id: 'lists', name: 'Lists', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'list-view', name: 'List view', isFuture: true },
      { id: 'standard-panel', name: 'Standard panel', isFuture: true },
      { id: 'steplist', name: 'Steplist', isFuture: true },
      { id: 'table', name: 'Table', isFuture: true },
      { id: 'tag', name: 'Tag', isFuture: true },
      { id: 'tag-group', name: 'Tag group', isFuture: true },
      { id: 'thumbnail', name: 'Thumbnail', isFuture: true },
    ],
  },
  {
    group: 'Forms',
    groupId: 'group-forms',
    items: [
      {
        id: 'multi-step-wizard',
        name: 'Multi-Step Wizard',
        targetId: 'comp-multi-step-wizard',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'floating-label-form',
        name: 'Floating Label Form',
        targetId: 'comp-floating-label-form',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'file-dropzone',
        name: 'File Dropzone',
        targetId: 'comp-file-dropzone',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
      {
        id: 'rich-text-editor',
        name: 'Rich Text Editor',
        targetId: 'comp-rich-text-editor',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
  {
    group: 'Sections',
    groupId: 'group-sections',
    items: [
      {
        id: 'marquee-section',
        name: 'Marquee Section',
        targetId: 'comp-marquee-section',
        builtAt: '2026-11-01T00:00:00.000Z',
      },
    ],
  },
];

export const M3_COMPONENTS_NAV: M3NavItem[] = [
  { id: 'app-bars', name: 'App bars', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'badges', name: 'Badges', builtAt: '2026-11-08T00:00:00.000Z' },
  {
    id: 'buttons',
    name: 'Buttons',
    isParent: true,
    children: [
      { id: 'all-buttons', name: 'All buttons', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'button-groups', name: 'Button groups', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'buttons-item', name: 'Buttons', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'extended-fabs', name: 'Extended FABs', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'fab-menu', name: 'FAB menu', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'fabs', name: 'FABs', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'icon-buttons', name: 'Icon buttons', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'segmented-buttons', name: 'Segmented buttons', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'split-button', name: 'Split button', builtAt: '2026-11-08T00:00:00.000Z' },
    ],
  },
  { id: 'cards', name: 'Cards', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'carousel', name: 'Carousel', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'checkbox', name: 'Checkbox', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'chip', name: 'Chips', targetId: 'comp-chip', builtAt: '2026-11-01T00:00:00.000Z' },
  {
    id: 'date-time-pickers',
    name: 'Date & time pickers',
    isParent: true,
    children: [
      { id: 'date-pickers', name: 'Date pickers', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'time-pickers', name: 'Time pickers', builtAt: '2026-11-08T00:00:00.000Z' },
    ],
  },
  { id: 'dialogs', name: 'Dialogs', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'divider', name: 'Divider', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'lists', name: 'Lists', builtAt: '2026-11-08T00:00:00.000Z' },
  {
    id: 'loading-progress',
    name: 'Loading & progress',
    isParent: true,
    children: [
      { id: 'loading-indicator', name: 'Loading indicator', builtAt: '2026-11-08T00:00:00.000Z' },
      {
        id: 'progress-indicators',
        name: 'Progress indicators',
        builtAt: '2026-11-08T00:00:00.000Z',
      },
    ],
  },
  { id: 'menus', name: 'Menus', builtAt: '2026-11-08T00:00:00.000Z' },
  {
    id: 'navigation',
    name: 'Navigation',
    isParent: true,
    children: [
      { id: 'navigation-bar', name: 'Navigation bar', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'navigation-drawer', name: 'Navigation drawer', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'navigation-rail', name: 'Navigation rail', builtAt: '2026-11-08T00:00:00.000Z' },
    ],
  },
  { id: 'radio-button', name: 'Radio button', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'search', name: 'Search', builtAt: '2026-11-08T00:00:00.000Z' },
  {
    id: 'sheets',
    name: 'Sheets',
    isParent: true,
    children: [
      { id: 'bottom-sheets', name: 'Bottom sheets', builtAt: '2026-11-08T00:00:00.000Z' },
      { id: 'side-sheets', name: 'Side sheets', builtAt: '2026-11-08T00:00:00.000Z' },
    ],
  },
  { id: 'sliders', name: 'Sliders', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'snackbar', name: 'Snackbar', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'switch', name: 'Switch', targetId: 'comp-switch', builtAt: '2026-11-01T00:00:00.000Z' },
  { id: 'tabs', name: 'Tabs', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'text-fields', name: 'Text fields', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'toolbars', name: 'Toolbars', builtAt: '2026-11-08T00:00:00.000Z' },
  { id: 'tooltips', name: 'Tooltips', builtAt: '2026-11-08T00:00:00.000Z' },
];

export const PLATFORM_COMPONENTS_NAV: M3NavItem[] = [
  {
    id: 'cyber-armor-nav',
    name: 'Cyber Armor Nav',
    targetId: 'comp-cyber-armor-nav',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'gooey-nav',
    name: 'Gooey Nav',
    targetId: 'comp-gooey-nav',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'hook-sidebar',
    name: 'Hook Sidebar',
    targetId: 'comp-hook-sidebar',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    targetId: 'comp-dropdown',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'password-input',
    name: 'Password Input',
    targetId: 'comp-password-input',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'duration-picker',
    name: 'Duration Picker',
    targetId: 'comp-duration-picker',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'toast-stack',
    name: 'Toast Stack',
    targetId: 'comp-toast-stack',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'skeleton-loading-screen',
    name: 'Skeleton Loading',
    targetId: 'comp-skeleton-loading-screen',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'notification-bell',
    name: 'Notification Bell',
    targetId: 'comp-notification-bell',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'status-404',
    name: 'Status 404 Console',
    targetId: 'comp-status-404',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'data-table',
    name: 'Interactive Data Table',
    targetId: 'comp-data-table',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'animated-counter',
    name: 'Animated Counter',
    targetId: 'comp-animated-counter',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'step-player',
    name: 'Step Player',
    targetId: 'comp-step-player',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'voice-note',
    name: 'Voice Note Player',
    targetId: 'comp-voice-note',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'marquee-section',
    name: 'Marquee Section',
    targetId: 'comp-marquee-section',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'multi-step-wizard',
    name: 'Multi-Step Wizard',
    targetId: 'comp-multi-step-wizard',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'floating-label-form',
    name: 'Floating Label Form',
    targetId: 'comp-floating-label-form',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'file-dropzone',
    name: 'File Dropzone',
    targetId: 'comp-file-dropzone',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'rich-text-editor',
    name: 'Rich Text Editor',
    targetId: 'comp-rich-text-editor',
    builtAt: '2026-11-01T00:00:00.000Z',
  },
];

/**
 * Organizes components of a category into a hierarchical list of parent groups and standalone items.
 */
export function getCategoryHierarchicalNodes(
  category: string,
  components: ComponentItemDoc[],
): ComponentGroupNode[] {
  const nodes: ComponentGroupNode[] = [];
  const processedParents = new Set<string>();

  components.forEach((comp) => {
    if (comp.parentGroupId) {
      if (!processedParents.has(comp.parentGroupId)) {
        processedParents.add(comp.parentGroupId);
        const groupMeta = PARENT_GROUP_MAP[comp.parentGroupId] || {
          id: `parent-${comp.parentGroupId}`,
          name: comp.parentGroupId,
          category,
        };
        const children = components.filter((c) => c.parentGroupId === comp.parentGroupId);
        nodes.push({
          id: groupMeta.id,
          name: groupMeta.name,
          category,
          isParent: true,
          children,
        });
      }
    } else {
      nodes.push({
        id: comp.id,
        name: comp.name,
        category,
        isParent: false,
        item: comp,
      });
    }
  });

  return nodes;
}

export const COMPONENT_CATEGORIES = [
  'Navigation',
  'Inputs',
  'Feedback',
  'Display',
  'Forms',
  'Sections',
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

/**
 * Generates a complete, universal AI Agent Prompt Skill for any component.
 * Allows any AI agent (Antigravity, Cursor, Claude, ChatGPT, Copilot, v0)
 * to build the complete MVP component from scratch with full fidelity.
 */
export function generateAiAgentPrompt(comp: ComponentItemDoc): string {
  const dos = comp.usageGuidelines.map((g) => `+ ${g.doItem}`).join('\n');
  const donts = comp.usageGuidelines.map((g) => `- ${g.dontItem}`).join('\n');
  const pillars =
    comp.implementationNotes && comp.implementationNotes.length > 0
      ? comp.implementationNotes.map((n) => `${n}`).join('\n')
      : `01 Component Architecture: Standalone, modular, zero-leak implementation.\n02 Accessibility (a11y): Full ARIA semantic roles and keyboard contracts.\n03 Design Tokens: Mathematical spacing and zero-shadow elevation ladder.\n04 Responsive Design: Mobile, tablet, and desktop adaptive layouts.`;

  const propsList =
    comp.props && comp.props.length > 0
      ? comp.props
          .map(
            (p) =>
              `  - \`${p.name}\` (${p.type}${p.default ? `, default: ${p.default}` : ''}): ${p.description}`,
          )
          .join('\n')
      : '  - Self-contained interactive component with configurable props.';

  const states =
    comp.supportedStates && comp.supportedStates.length > 0
      ? comp.supportedStates.map((s) => `  - ${s}`).join('\n')
      : '  - Default, Active, Hover, Focus-Visible, Disabled';

  const realWorld =
    comp.realWorldExamples && comp.realWorldExamples.length > 0
      ? comp.realWorldExamples
          .map((ex) => `  * ${ex.title}: ${ex.scenario} (Impact: ${ex.impact})`)
          .join('\n')
      : '';

  const ux =
    comp.uxPsychology && comp.uxPsychology.length > 0
      ? comp.uxPsychology.map((u) => `  * ${u.principle}: ${u.detail}`).join('\n')
      : '';

  return `${comp.category} · Component Template
${comp.name}
${comp.description}

Copy the prompt, paste it, ship it.

---

### Core Concept & Paradigm
${comp.explanation}
Design Paradigm: ${comp.paradigm}

---

### What's Inside & Architectural Pillars
${pillars}

---

### Supported States & Interactions
${states}

---

### Component Props & Interface Contract
${propsList}

---

### Usage Guidelines
USE THIS WHEN:
${dos || '+ Building modern, accessible web applications and SaaS interfaces.'}

DO NOT USE WHEN:
${donts || '- A simpler native HTML element suffices without custom styling.'}
${
  realWorld
    ? `
---

### Real-World Production Scenarios
${realWorld}
`
    : ''
}${
    ux
      ? `
---

### UX Psychology & Human Interface Laws
${ux}
`
      : ''
  }
---

### Instructions for AI Coding Agent
Act as a Principal UI/UX Architect & Design System Engineer.
Build the "${comp.name}" component from scratch as a clean, single-file, production-ready React component with TypeScript and Tailwind CSS.

Mandatory Requirements:
1. Self-Contained MVP: Single-file implementation with zero imaginary dependencies.
2. Accessibility (WCAG 2.1 AA/AAA): Include all required ARIA attributes (role, aria-expanded, aria-controls, aria-live), keyboard navigation (Tab, Esc, Arrow keys, Enter/Space), and visible focus rings.
3. Micro-Interactions: Follow the sub-300ms interface timing rule with spring physics or smooth cubic-bezier transitions. Support prefers-reduced-motion.
4. Dual Theme: Ensure clean contrast and visual fidelity across both light (#FFFFFF / #F8FAFC) and dark (#0B0F19 / #0F172A) surfaces.
5. Export both the primary component and an interactive demo showcase component.`;
}

const RAW_COMPONENT_REGISTRY: ComponentItemDoc[] = [
  {
    id: 'chip',
    name: 'Chip',
    category: 'Inputs',
    builtAt: '2026-11-02',
    paradigm: 'YouTube Paradigm',
    description:
      'Compact interactive filter pill allowing instant toggling, multi-selection, and dynamic query filtering across datasets.',
    explanation:
      'Chips are compact interactive tags shaped like poker chips. Modeled after YouTube home feed category filters, they allow users to rapidly segment extensive catalogs, switch active query parameters, or dismiss selected entities without navigating to a complex filter modal.',
    supportedStates: [
      'Default',
      'Selected / Active',
      'Disabled',
      'Multi-Selected',
      'Filtered',
      'With Dismiss Icon',
    ],
    realWorldExamples: [
      {
        title: 'Course Catalog Thematic Filtering',
        scenario: 'Students filter elective courses by "Academics", "Robotics", "Finance", "Arts".',
        impact: 'Filter applies instantly without page reloading or scroll jumps.',
      },
      {
        title: 'Student Status Segmentation',
        scenario: 'Registrar filters rosters by "Enrolled", "Deferred", "Graduated", "Suspended".',
        impact: 'One-tap switching between active enrollment cohorts.',
      },
      {
        title: 'Multi-Campus Branch Filtering',
        scenario:
          'Super admin segments reports across "Siem Reap Central", "Phnom Penh", "Battambang".',
        impact: 'Compact pills fit horizontally without monopolizing vertical dashboard space.',
      },
    ],
    uxPsychology: [
      {
        principle: "Miller's Law & Chunking",
        detail:
          'Breaks complex multidimensional database queries into easily scanable, bite-sized thematic chunks.',
      },
      {
        principle: 'Instant State Confirmation',
        detail:
          'High-contrast active state (Royal Blue #0056FF fill) gives instantaneous confirmation of active filters.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use full capsule pill radius (rounded-full, 9999px) with 2px continuous border.',
        dontItem: 'Wrap chips onto more than two rows—use horizontal overflow scrolling instead.',
      },
      {
        doItem:
          'Provide an "All" or "Reset" chip to allow users to restore unfiltered view in one click.',
        dontItem: 'Use chips for primary application navigation—use tabs or bottom nav instead.',
      },
    ],
    implementationNotes: [
      'Maintains 32px height with minimum 44px hit-slop bounding box for touch accessibility.',
      'Active state uses Royal Blue #0056FF with soft blue tint; inactive uses neutral slate surfaces.',
      'Supports keyboard arrow navigation and toggle via Space / Enter keys.',
    ],
    codeSnippet: `import { LibraryChip } from '@/features/document/components/ui-library';

export function Example() {
  const [selected, setSelected] = React.useState('Academics');

  return (
    <div className="flex gap-2">
      {['All', 'Academics', 'Students', 'Finance'].map((label) => (
        <LibraryChip
          key={label}
          active={selected === label}
          onClick={() => setSelected(label)}
        >
          {label}
        </LibraryChip>
      ))}
    </div>
  );
}`,
    props: [
      {
        name: 'active',
        type: 'boolean',
        default: 'false',
        description: 'Whether the chip is currently selected.',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        default: '—',
        description: 'Optional leading vector icon.',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        default: '—',
        description: 'Optional callback rendering a trailing "x" dismiss button.',
      },
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'Chip label text.' },
    ],
  },
  {
    id: 'switch',
    name: 'Toggle Switch',
    category: 'Inputs',
    builtAt: '2026-11-02',
    paradigm: 'iPhone Settings Paradigm',
    description:
      'Accessible hardware-inspired binary toggle switch controlling immediate system preferences and automated background service states.',
    explanation:
      'The Toggle Switch provides instantaneous binary control. Modeled after physical wall switches and iOS Settings controls, it applies configuration adjustments the exact millisecond it is flipped, completely eliminating the need for an awkward secondary "Save Changes" confirmation button.',
    supportedStates: [
      'Default (On)',
      'Off',
      'Disabled',
      'Loading / Transitioning',
      'Real-time Telemetry',
    ],
    realWorldExamples: [
      {
        title: 'Live Server Telemetry Stream',
        scenario: 'IT administrator activates real-time MongoDB change streams for the API.',
        impact: 'Connection opens immediately and metrics start graphing live without saving.',
      },
      {
        title: 'Automated Parent SMS Notifications',
        scenario: 'School principal toggles daily arrival SMS alerts for guardians.',
        impact: 'Rules update instantly in cloud memory with instant telemetry feedback.',
      },
      {
        title: 'Two-Factor Authentication Requirement',
        scenario: 'Super admin enables mandatory 2FA enforcement for staff accounts.',
        impact: 'Security policy applies immediately across all multi-tenant branch portals.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Direct Manipulation & Skeuomorphic Certainty',
        detail:
          'Simulates the physical motion of a mechanical switch, giving unambiguous certainty about system on/off state.',
      },
      {
        principle: 'Zero Latency Expectation',
        detail:
          'Users perceive switches as live power conduits; immediate visual state change matches physical intuition.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'Use exclusively for binary states (Enabled/Disabled, On/Off) that take effect immediately.',
        dontItem:
          'Use a switch if the user must still click a separate "Submit" or "Save" button afterwards.',
      },
      {
        doItem:
          'Keep the accompanying label static—never change label text between "On" and "Off" when toggled.',
        dontItem: 'Use switches to select between two non-binary choices like "Male" and "Female".',
      },
    ],
    implementationNotes: [
      'Enforces role="switch" with aria-checked="true|false" for complete assistive technology compatibility.',
      'Track: 48x28px pill; Thumb: 22x22px circle translating with 150ms cubic ease.',
      'Hit-slop bounding box >= 44x44px for touch accessibility.',
    ],
    codeSnippet: `import { LibrarySwitch } from '@/features/document/components/ui-library';

export function Example() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="flex items-center gap-3">
      <span>Real-time Telemetry</span>
      <LibrarySwitch checked={enabled} onCheckedChange={setEnabled} />
    </div>
  );
}`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        default: 'false',
        description: 'Current binary state (true = on, false = off).',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        default: '—',
        description: 'Callback invoked upon state toggle.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction when set to true.',
      },
    ],
  },
  {
    id: 'dropdown',
    name: 'Dropdown (Campus & Branch Selector)',
    category: 'Navigation',
    builtAt: '2026-11-02',
    paradigm: 'Standard Brand Tokens & Searchable Institutional Selector',
    description:
      'High-contrast ergonomic campus selector featuring institutional codes, campus badges, quick search filtering, and clean brand token styling.',
    explanation:
      'The Dropdown component packages multiple campus locations into an ergonomic 48px trigger button. When opened, it reveals a searchable list of institutional options with student enrollment counts, physical building details, campus code badges (PP-01, SR-01), and keyboard navigation.',
    supportedStates: [
      'Default (Closed)',
      'Open / Expanded with Search Filter',
      'Option Selected',
      'Hover & Active Selection Highlight',
      'Disabled / Read-Only',
      'Focused (Keyboard Navigation ↑ ↓)',
      'Institutional Record Overview',
    ],
    realWorldExamples: [
      {
        title: 'Institutional Campus Routing',
        scenario:
          'Campus registrar toggles between Siem Reap Main, Phnom Penh Innovation Hub, Battambang, and Kampong Cham.',
        impact:
          'Scopes all student rosters and database queries instantly with verified institutional data boundaries.',
      },
      {
        title: 'Academic Term & Cohort Selection',
        scenario:
          'Admissions officer selects current active semester term from past and upcoming academic years.',
        impact: 'Updates tuition fee schedules and grade rosters without page reload.',
      },
      {
        title: 'Administrative Role Switcher',
        scenario: 'Multi-campus director switches active campus management perspective.',
        impact: 'Applies tenant data boundary immediately while preserving active view state.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Progressive Disclosure (Jakob Nielsen)',
        detail:
          'Hides secondary branch options until requested, preserving clean visual hierarchy on busy administrative desks.',
      },
      {
        principle: "Hick's Law Optimization",
        detail:
          'Grouping related campus branches within an indexed dropdown reduces decision time by 60% compared to sprawling radio buttons.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'Highlight the active option with a clear checkmark, high-contrast bold typography, and emerald live dot.',
        dontItem:
          'Use a dropdown when there are only 2 binary choices—use a switch or toggle buttons instead.',
      },
      {
        doItem:
          'Dismiss the menu automatically upon selection, outside click, or Escape key press.',
        dontItem: 'Crowd dropdown rows with overly long descriptions on mobile screens.',
      },
    ],
    implementationNotes: [
      'Standard Color Blueprint: Royal Blue (#0056FF), Soft Lavender (#E3E7FC), Border Keyline (#CAD3F5), and Ice Tint (#EFF5FF).',
      'Trigger button: minimum 54px ergonomic height with left domain icon and right rotating chevron.',
      'Searchable: Built-in quick search filter with autofocus and clear button.',
      'Full keyboard navigation: ArrowUp/ArrowDown to navigate, Enter to select, Escape to close.',
      'Selected option: Distinct Ice Tint (#EFF5FF) background, Royal Blue (#0056FF) border, and checkmark pill.',
    ],
    codeSnippet: `import { LibraryDropdown } from '@/features/document/components/ui-library';

export function Example() {
  const [campus, setCampus] = React.useState('phnom-penh');

  return (
    <LibraryDropdown
      label="Campus Location Branch"
      value={campus}
      onChange={setCampus}
      options={[
        {
          value: 'siem-reap',
          label: 'Siem Reap Main Campus',
          description: '2,450 Enrolled Students · Science Wing · Cluster SR-01',
        },
        {
          value: 'phnom-penh',
          label: 'Phnom Penh Innovation Hub',
          description: '3,120 Enrolled Students · Tech Tower · Cluster PP-02',
        },
        {
          value: 'battambang',
          label: 'Battambang Regional Center',
          description: '1,080 Enrolled Students · Campus A · Cluster BT-03',
        },
      ]}
    />
  );
}`,
    props: [
      { name: 'label', type: 'string', default: '—', description: 'Top descriptive label.' },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Select an option...'",
        description: 'Placeholder when no item is selected.',
      },
      {
        name: 'options',
        type: 'LibraryDropdownOption[]',
        description: 'Array of option items with value, label, and description.',
      },
      { name: 'value', type: 'string', description: 'Controlled active option value.' },
      { name: 'onChange', type: '(value: string) => void', description: 'Selection callback.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables trigger.' },
    ],
  },
  // NAVIGATION GROUP
  {
    id: 'hook-sidebar',
    name: 'Hook Sidebar',
    category: 'Navigation',
    parentGroupId: 'navigation',
    builtAt: '2026-11-02',
    paradigm: 'Dashed Spring Rail Standard',
    description: 'A vertical navigation list with a dashed rail that marks the active item.',
    explanation:
      'Click an item to spring the accent rail down to it. Hovering or tabbing to another row draws a second, dimmer rail that stops where the accent one ends.',
    props: [
      {
        name: 'items *',
        type: 'Array<string | { label: string; href?: string }>',
        description:
          'Rows rendered as the vertical list. A plain string or an object with a label is a nav item, and href turns it into a link.',
      },
      {
        name: 'label',
        type: 'string',
        description:
          'Group title shown above the list, outside the rail. Omit it for a bare list. Also names the nav for screen readers.',
      },
      {
        name: 'value',
        type: 'number',
        description:
          'Active item index for controlled usage. When set, it wins over both the URL and internal state.',
      },
      {
        name: 'defaultValue',
        type: 'number',
        default: '0',
        description:
          'Initial active index. Used only when no item has an href and value is not provided.',
      },
      {
        name: 'onChange',
        type: '(index: number) => void',
        description: 'Called with the new index whenever an item is selected.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'#0056FF'",
        description:
          'Any CSS color for the active rail (hex, rgb, hsl, var). The hover rail stays neutral.',
      },
      {
        name: 'dashed',
        type: 'boolean',
        default: 'true',
        description: 'Draws the rail and its corner as dashes. Set false for a solid line.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Extra classes merged onto the root <nav> element.',
      },
    ],
    codeSnippet: `import { HookSidebar } from "@/components/ui/hook-sidebar"

// any item with an href makes the rail follow the current route
const display = [
  { label: "Folder", href: "/folder" },
  { label: "Code block", href: "/codeblock" },
]

const navigation = [{ label: "Gooey nav", href: "/gooeynav" }]

// one HookSidebar per group, stacked
export function Demo() {
  return (
    <div className="flex flex-col gap-5">
      <HookSidebar label="Display" items={display} />
      <HookSidebar label="Navigation" items={navigation} />
    </div>
  )
}`,
    realWorldExamples: [
      {
        title: 'Documentation Sub-Navigation',
        scenario:
          'Developer portals and nested API documentation sidebars with quick section jumping.',
        impact: 'Clear visual tracking with tactile spring feedback and hover previewing.',
      },
      {
        title: 'Settings & Administration Hubs',
        scenario: 'Multi-group administrative navigation trees with sub-routes.',
        impact: 'Minimal visual noise with dashed connecting rails and responsive route tracking.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Kinetic Momentum & Spring Physics',
        detail:
          'Physics-based mass-damped springs create an organic feeling of elasticity when jumping between destinations.',
      },
      {
        principle: 'Feedforward Hover Anticipation',
        detail:
          'A secondary dimmer rail previews the travel path before committing a click or tap.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Stack multiple HookSidebar instances for clean grouped navigation.',
        dontItem: 'Mix solid and dashed rails within the same navigation cluster.',
      },
      {
        doItem: 'Use href properties to automatically bind navigation to the active URL route.',
        dontItem:
          'Apply excessive vertical spacing that causes the rail spring to stretch beyond viewport height.',
      },
    ],
    implementationNotes: [
      '01 Dual Rail Architecture: Active accent rail and dimmer hover rail operate on independent spring calculations.',
      '02 Corner Arc Geometry: SVG curved path (M0.5 0a6 6 0 0 0 6 6H12) hooks seamlessly into item text.',
      '03 CSS Repeating Dash: Background repeating linear gradient renders crisp 2px/2px dashed pattern without SVG distortion.',
      '04 Data-Slot Attributes: Root, labels, and items carry data-slot attributes for flexible headless styling.',
    ],
    supportedStates: [
      'Default Active',
      'Hover Dimmer Rail',
      'Controlled Value',
      'Solid / Dashed Mode',
    ],
  },
  {
    id: 'gooey-nav',
    name: 'Gooey Nav',
    category: 'Navigation',
    parentGroupId: 'navigation',
    builtAt: '2026-11-02',
    paradigm: 'Fluid Pill & Corner Brand Border Archetypes',
    description:
      'High-performance fluid tab indicator and technical Corner Brand Border navigation with customizable brand border sets.',
    explanation:
      'Provides two production demos: (1) Classic Fluid Capsule Pill with smooth sliding indicator, and (2) Corner Brand Border Gooey Nav with technical L-shaped corner brackets and 4 brand border sets (Royal Blue, Azure Blue, Deep Navy, Soft Lavender).',
    props: [{ name: 'activeTab', type: 'string', description: 'Currently selected segment.' }],
    codeSnippet: `import { GooeyNavDemo } from '@/features/document/components/ui-library';\n\n<GooeyNavDemo />`,
    realWorldExamples: [
      {
        title: 'Period Switcher',
        scenario: 'Registrar toggles Day/Week view.',
        impact: 'Delightful fluidity.',
      },
    ],
    uxPsychology: [{ principle: 'Continuity', detail: 'Guides eye between states.' }],
    usageGuidelines: [{ doItem: 'Use fluid pill indicator.', dontItem: 'Do not delay selection.' }],
    implementationNotes: ['CSS transition on background pill.'],
    supportedStates: ['Day', 'Week', 'Month'],
  },
  {
    id: 'cyber-armor-nav',
    name: 'Cyber Armor Nav',
    category: 'Navigation',
    parentGroupId: 'navigation',
    builtAt: '2026-11-02',
    paradigm: 'Cyber Armor Mecha HUD Archetype',
    description:
      'Precision aerospace mecha navigation console with tactile double-seam dividers, chamfered corner cuts, and active kinetic indicator bar.',
    explanation:
      'Provides an ergonomic Cyber Armor Mecha HUD navigation console engineered for high-density campus dashboards and developer documentation hubs with tactile active indicators and crisp day-first surface tokens.',
    props: [
      {
        name: 'items',
        type: 'HangingTabItem[]',
        description: 'Array of navigation items with id, label, and optional icon.',
      },
      { name: 'activeId', type: 'string', description: 'Currently active tab ID.' },
      { name: 'onSelect', type: '(id: string) => void', description: 'Tab selection callback.' },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        description: 'Console size variant (sm: 44px, md: 50px, lg: 56px).',
      },
      { name: 'showIcons', type: 'boolean', description: 'Whether to render kinetic micro-icons.' },
    ],
    codeSnippet: `import { CyberArmorNav } from '@/features/document/components/ui-library';\n\nconst items = [\n  { id: 'home', label: 'Home' },\n  { id: 'blog', label: 'Blog' },\n  { id: 'portfolio', label: 'Portfolio' },\n  { id: 'services', label: 'Services' },\n];\n\n<CyberArmorNav items={items} activeId="portfolio" onSelect={console.log} />`,
    realWorldExamples: [
      {
        title: 'Sticky Header Hub Navigation',
        scenario: 'Developer switches between UI Library and Open API documentation routes.',
        impact: 'Distinct aerospace mecha branding with instant visual feedback.',
      },
      {
        title: 'Multi-Module Workspace Console',
        scenario: 'Campus registrar toggles across Student, Academic, and Ledger modules.',
        impact: 'Ergonomic 50px touch target with tactile double-seam divider feedback.',
      },
    ],
    uxPsychology: [
      {
        principle: "Fitts's Law Target Sizing",
        detail: '44px-56px button height ensures effortless cursor targeting.',
      },
      {
        principle: 'Visual Hierarchy & Affordance',
        detail: 'Stepped armor wings and active glow bar draw focal attention to location.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use Royal Blue (#0056FF) glow underline for the active item.',
        dontItem: 'Never use circular dot style indicators.',
      },
      {
        doItem: 'Keep button labels concise and uppercase with Sora tracking.',
        dontItem: 'Avoid overcrowded labels exceeding 14 characters.',
      },
    ],
    implementationNotes: [
      'Responsive SVG stepped armor chassis with 45° chamfers.',
      'Double-seam divider: 1px dark border paired with 1px white highlight line.',
      'Active bar: solid Royal Blue (#0056FF).',
    ],
    supportedStates: ['Default', 'Hover', 'Active Glow', 'Focus Visible'],
  },

  // INPUTS GROUP
  {
    id: 'duration-picker',
    name: 'Duration Picker',
    category: 'Inputs',
    builtAt: '2026-11-02',
    paradigm: 'Tactile Stepper Standard',
    description:
      'Quick duration selector combining preset time capsules with an increment stepper for meeting scheduling.',
    explanation: 'Combines fast 15m/30m/1h quick preset pills with incremental adjustment.',
    props: [{ name: 'minutes', type: 'number', description: 'Duration in minutes.' }],
    codeSnippet: `import { DurationPickerDemo } from '@/features/document/components/ui-library';\n\n<DurationPickerDemo />`,
    realWorldExamples: [
      {
        title: 'Class Scheduling',
        scenario: 'Academic coordinator sets period length.',
        impact: 'One-tap presets.',
      },
    ],
    uxPsychology: [{ principle: "Miller's Law", detail: 'Pre-chunked duration values.' }],
    usageGuidelines: [
      { doItem: 'Provide common increments.', dontItem: 'Avoid freeform typing only.' },
    ],
    implementationNotes: ['Preset buttons plus custom stepper.'],
    supportedStates: ['Preset Selected', 'Custom Stepper'],
  },
  {
    id: 'password-input',
    name: 'Password Input',
    category: 'Inputs',
    builtAt: '2026-11-02',
    paradigm: 'Strength Policy Standard',
    description:
      'Secure authentication passkey input with eye toggle visibility, live strength meter, and compliance checklist.',
    explanation: 'Visualizes password entropy and policy compliance in real-time.',
    props: [{ name: 'value', type: 'string', description: 'Password string.' }],
    codeSnippet: `import { PasswordInputDemo } from '@/features/document/components/ui-library';\n\n<PasswordInputDemo />`,
    realWorldExamples: [
      {
        title: 'Staff Onboarding',
        scenario: 'HR registers new employee credentials.',
        impact: 'Enforces security.',
      },
    ],
    uxPsychology: [{ principle: 'Direct Feedback', detail: 'Real-time color bar.' }],
    usageGuidelines: [{ doItem: 'Show checklist.', dontItem: 'Never hide validation rules.' }],
    implementationNotes: ['Regex strength checks.'],
    supportedStates: ['Weak', 'Fair', 'Strong'],
  },

  // FEEDBACK GROUP
  {
    id: 'toast-stack',
    name: 'Toast Notification Stack',
    category: 'Feedback',
    builtAt: '2026-11-02',
    paradigm: 'Stacked Notifications Standard',
    description:
      'Stacked notification queue providing timed auto-dismissal, linear countdown bars, and fluid enter and exit animations.',
    explanation:
      'Click any button to fire a toast notification. Toasts stack vertically, auto-dismiss with a progress bar countdown, and can be manually closed.',
    props: [
      {
        name: 'toasts',
        type: 'ToastItemData[]',
        description: 'Active stack of notifications currently rendered in DOM.',
      },
      {
        name: 'position',
        type: "'fixed' | 'inline'",
        default: "'fixed'",
        description: 'Fixed viewport anchor (top-right) or relative container sandbox.',
      },
      {
        name: 'theme',
        type: "'light' | 'dark'",
        default: "'light'",
        description: 'Color theme for notification surfaces and backdrop blur.',
      },
      {
        name: 'onDismiss',
        type: '(id: string) => void',
        description: 'Callback invoked when a toast is closed manually or via timeout.',
      },
    ],
    codeSnippet: `import { toast, ToastContainer } from '@/features/document/components/ui-library';\n\n// Fire notifications programmatically\ntoast.success('Batch transaction committed successfully.', {\n  title: 'Ledger Hash Verified',\n  duration: 4500,\n});\n\n// Mount global or local container\n<ToastContainer position="fixed" />`,
    realWorldExamples: [
      {
        title: 'Asynchronous Ledger Commit Notification',
        scenario:
          'Registrar executes high-volume student batch fee processing; background worker reports completed commits.',
        impact: 'Non-blocking confirmation with 18px status icons and countdown strip.',
      },
      {
        title: 'Security & Audit Token Rejection Alert',
        scenario:
          'Security monitoring detects unauthorized token signature and alerts administrator without page reload.',
        impact: 'High-contrast rose-red error toast with hover pause and manual dismissal.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Doherty Threshold & Physical Feedback',
        detail:
          'Slide-in animation with subtle scale bounce gives feedback immediate physical responsiveness under 300ms.',
      },
      {
        principle: "Postel's Law & Hover Pause",
        detail:
          'Users are given full control to pause the auto-dismiss timer on hover, preventing premature dismissal of complex text.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'USE THIS WHEN: Confirming user actions like form submissions, saves, or deletions with non-blocking feedback.',
        dontItem:
          'NOT IDEAL WHEN: The message requires user action — use a modal or inline alert instead.',
      },
      {
        doItem:
          'USE THIS WHEN: Surfacing background events — API responses, sync status, or incoming updates.',
        dontItem:
          'NOT IDEAL WHEN: Showing inline form validation errors that should appear next to the field.',
      },
      {
        doItem:
          'USE THIS WHEN: Building SaaS dashboards or admin panels that need a polished notification layer.',
        dontItem:
          'NOT IDEAL WHEN: Critical destructive confirmations where the user must explicitly acknowledge.',
      },
    ],
    implementationNotes: [
      '01 Toast Container: Fixed-position stack anchored to the top-right, holding up to 5 toasts with automatic overflow management.',
      '02 Type Variants: Four distinct types — success, error, warning, info — each with a unique color and icon for instant recognition.',
      '03 Icon System: Inline SVG icons sized at 18px with color inherited from the toast type for consistent visual language.',
      '04 Progress Bar: A 2px countdown strip that visually communicates remaining time before auto-dismiss.',
      '05 Enter Animation: Slide-in from the right with a subtle scale bounce, giving toasts a physical, responsive feel.',
      '06 Exit & Collapse: Two-phase removal: fade-slide out, then collapse height so remaining toasts reflow smoothly.',
      '07 Hover Pause: Hovering a toast freezes its countdown timer and progress bar so users have time to read.',
      '08 Programmatic API: Simple show/dismiss interface returning unique IDs for full control from application code.',
    ],
    supportedStates: [
      'Idle (Stack Empty)',
      'Entering (Right Slide & Bounce)',
      'Counting Down (Progress Strip Active)',
      'Hover Paused',
      'Two-Phase Exit & Collapsing',
    ],
  },
  {
    id: 'skeleton-loading-screen',
    name: 'Skeleton Loading Screen',
    category: 'Feedback',
    builtAt: '2026-11-02',
    paradigm: 'CSS Shimmer Placeholder Standard',
    description:
      'Zero-JavaScript CSS shimmer placeholders communicating layout geometry while asynchronous data streams load into memory.',
    explanation:
      'Three common skeleton patterns — profile header, card grid, and content list — all animated with a single CSS keyframe. Click the preview to toggle the loaded state.',
    props: [
      {
        name: 'variant',
        type: "'rect' | 'circle' | 'text'",
        default: "'rect'",
        description: 'Placeholder geometric shape for avatars, text lines, or media cards.',
      },
      {
        name: 'width',
        type: 'string | number',
        description: 'Explicit width dimension to preserve exact layout geometry.',
      },
      {
        name: 'height',
        type: 'string | number',
        description: 'Explicit height dimension preventing cumulative layout shift (CLS).',
      },
      {
        name: 'theme',
        type: "'light' | 'dark'",
        default: "'light'",
        description: 'Design token colorway configuring base surface and shimmer contrast.',
      },
    ],
    codeSnippet: `import { Skeleton } from '@/features/document/components/ui-library';\n\n// Avatar circle and text line placeholders\n<Skeleton variant=\"circle\" className=\"size-16\" />\n<Skeleton variant=\"text\" className=\"w-48 h-5\" />\n<Skeleton className=\"w-full aspect-video rounded-xl\" />`,
    realWorldExamples: [
      {
        title: 'Asynchronous Institutional Feeds & Dashboards',
        scenario:
          'Dashboard displays instant layout structure while backend aggregation queries compute student statistics.',
        impact: 'Eliminates Cumulative Layout Shift (CLS = 0) and reduces perceived latency.',
      },
      {
        title: 'Curriculum & Syllabi Media Grid Pre-Rendering',
        scenario:
          'Media cards preserve strict 16:9 aspect ratios before image assets stream from CDN storage.',
        impact: 'Maintains page stability without content jumpiness.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Perceived Performance & Cognitive Readiness',
        detail:
          'Skeleton screens anticipate incoming content layout, making wait times feel 30% shorter than blank spinner states.',
      },
      {
        principle: "Miller's Law & Chunked Layout Delivery",
        detail:
          'Pre-rendering recognizable UI regions lets users visually orient their attention before data arrives.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'USE THIS WHEN: Content-heavy pages where data arrives asynchronously — feeds, dashboards, profiles.',
        dontItem:
          'NOT IDEAL WHEN: Content loads in under 200ms — skeletons will flash awkwardly before disappearing.',
      },
      {
        doItem:
          'USE THIS WHEN: You want layout-aware placeholders instead of generic spinners for better perceived performance.',
        dontItem:
          'NOT IDEAL WHEN: A progress bar or inline spinner communicates the action more clearly.',
      },
      {
        doItem:
          'USE THIS WHEN: Pre-rendering page structure to prevent cumulative layout shift on load.',
        dontItem:
          'NOT IDEAL WHEN: Critical above-the-fold content that should be server-rendered or statically generated.',
      },
    ],
    implementationNotes: [
      '01 Shimmer Gradient: Animated linear gradient that sweeps left to right, creating the illusion of content loading in.',
      '02 Placeholder Shapes: Rounded rectangles and circles sized to match your final content — text lines, avatars, images.',
      '03 Aspect Ratios: Proportional sizing on image placeholders that prevents layout shift when real content loads.',
      '04 Color Palette: Subtle base and shimmer tones that read as "loading" without competing with content arrival.',
      '05 CSS Custom Properties: Centralized design tokens for base color, shimmer intensity, and speed — swap themes in two lines.',
      '06 Pseudo-element Layer: Shimmer lives on ::after to avoid interfering with element sizing or layout flow.',
      '07 Animation Timing: Smooth 1.8s ease-in-out loop — fast enough to feel alive, slow enough to avoid distraction.',
      '08 Reduced Motion: prefers-reduced-motion query disables shimmer for users who opt out of animation.',
    ],
    supportedStates: [
      'Loading (1.8s Shimmer Active)',
      'Loaded (Smooth Content Reveal)',
      'Reduced Motion (Static Placeholder)',
      'Profile Header Pattern',
      'Card Grid Pattern (16:9 Media)',
      'Content List Pattern',
    ],
  },
  {
    id: 'notification-bell',
    name: 'Notification Bell (Campus Alert Center)',
    category: 'Feedback',
    parentGroupId: 'navigation',
    builtAt: '2026-11-02',
    paradigm: 'Popover Feed Standard',
    description:
      'Campus alert center trigger featuring unread badge counter, category filtering (All, Academic, Security), alert simulation, and mark-all-read action.',
    explanation:
      'Combines a sleek notification bell trigger with an unread badge counter and an interactive institutional popover feed. Users can filter incoming alerts by domain (Academic, Security), inspect details, mark individual items as read, or simulate live cluster notifications.',
    props: [
      {
        name: 'unreadCount',
        type: 'number',
        description: 'Number of unread notifications displayed on badge.',
      },
      {
        name: 'items',
        type: 'NotificationItem[]',
        description:
          'Array of operational notifications with timestamp, category, and read status.',
      },
      {
        name: 'onMarkAllRead',
        type: '() => void',
        description: 'Callback to clear all unread badges.',
      },
    ],
    codeSnippet: `import { NotificationBellDemo } from '@/features/document/components/ui-library';\n\n<NotificationBellDemo />`,
    realWorldExamples: [
      {
        title: 'Daily Faculty Attendance Dispatch',
        scenario:
          'Department chair reviews morning biometric attendance submission alerts from Phnom Penh Innovation Hub.',
        impact: 'Instantly identifies pending class rosters without navigating deep menus.',
      },
      {
        title: 'Cryptographic Security Alert',
        scenario:
          'System administrator receives immediate notification of scheduled HMAC secret rotation across campus nodes.',
        impact: 'Maintains audit transparency with precise timestamp and cluster ID.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Visual Salience',
        detail:
          'High-contrast royal blue badge attracts peripheral vision without flashing alarmingly.',
      },
      {
        principle: 'Cognitive Scannability',
        detail:
          'Category filter pills (Academic, Security) let operators triage high-priority notices first.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'Provide category filters when notification volume spans multiple operational domains.',
        dontItem: 'Use loud flashing red dots for non-critical informational alerts.',
      },
      {
        doItem: 'Offer a one-click "Mark all as read" button to quickly clear notifications.',
        dontItem: 'Hide timestamps or originating campus branch codes.',
      },
    ],
    implementationNotes: [
      'Popover anchored cleanly below bell trigger with 12px vertical offset.',
      'Subtle enter animation: fade-in with slide-in-from-top-2.',
      'High contrast text (#020617) with Soft Lavender (#CAD3F5) borders.',
    ],
    supportedStates: [
      'Idle (0 Unread)',
      'Active (Unread Badge)',
      'Popover Open',
      'Filtered by Domain',
      'All Read',
    ],
  },
  {
    id: 'status-404',
    name: 'Status Page',
    category: 'Feedback',
    builtAt: '2026-11-02',
    paradigm: 'Clean HTTP Status Code & Title Presentation',
    description:
      'High-contrast, minimalist HTTP status screen presenting status code, title, and direct recovery action.',
    explanation:
      'Provides a clean, uncluttered status screen to communicate missing routes, forbidden access, and server errors. Focuses purely on status code and title with standard brand tokens and direct dashboard recovery.',
    props: [
      {
        name: 'statusCode',
        type: '404 | 403 | 500 | 503 | 401',
        default: '404',
        description: 'HTTP status code determining title and status badge.',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Custom heading title override.',
      },
      {
        name: 'homeHref',
        type: 'string',
        default: "'/dashboard'",
        description: 'Primary action button navigation link destination.',
      },
      {
        name: 'homeLabel',
        type: 'string',
        default: "'Return to Dashboard'",
        description: 'Primary action button label.',
      },
      {
        name: 'showControls',
        type: 'boolean',
        default: 'false',
        description: 'Display interactive inline status code switcher controls.',
      },
    ],
    codeSnippet: `import { StatusPage404 } from '@/features/document/components/ui-library';

// Next.js app/not-found.tsx
export default function NotFound() {
  return (
    <StatusPage404
      statusCode={404}
      homeHref="/dashboard"
      homeLabel="Return to Dashboard"
      showControls={false}
    />
  );
}`,
    realWorldExamples: [
      {
        title: 'Missing Route Handler (Next.js app/not-found.tsx)',
        scenario: 'A user navigates to an unmapped campus URL or deleted student dossier.',
        impact:
          'Delightful branded recovery flow with instant home navigation and diagnostic telemetry.',
      },
      {
        title: 'Cryptographic Permission Challenge (403 Forbidden)',
        scenario:
          'A student attempts to access administrative payroll or examination vault routes.',
        impact:
          'Clear explanation of missing RBAC scopes with institutional administrator escalation link.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Graceful Error Recovery & Locus of Control',
        detail:
          'Reduces user disorientation by providing clear situational telemetry and immediate return paths.',
      },
      {
        principle: 'Brand Trust & Polish',
        detail:
          'Replaces generic browser error screens with high-fidelity, interactive brand archetypes.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Provide a prominent, clear action button returning users to home or dashboard.',
        dontItem:
          'Never trap users with dead ends or ambiguous technical error stacks without remediation steps.',
      },
    ],
    implementationNotes: [
      'Pure CSS & SVG procedural noise and radar animations with zero heavy external media assets.',
      'Supports spring physics tumbling and interactive re-alignment in gravity mode.',
    ],
    supportedStates: ['Radar Explorer', 'Barcode Ledger', 'CRT Phosphor', 'Gravity Blocks'],
  },

  // DISPLAY GROUP
  {
    id: 'step-player',
    name: 'Step Player',
    category: 'Display',
    builtAt: '2026-11-02',
    paradigm: 'Sequential Workflow Standard',
    description:
      'Multi-stage progress stepper featuring animated connection line loading, spring step transitions, and sequential workflow controls.',
    explanation:
      'Guides users through sequential institutional onboarding processes with animated connection lines, spring step-to-step transitions, and interactive controls.',
    props: [{ name: 'currentStep', type: 'number', description: 'Active step.' }],
    codeSnippet: `import { StepPlayerDemo } from '@/features/document/components/ui-library';\n\n<StepPlayerDemo />`,
    realWorldExamples: [
      {
        title: 'Student Enrollment Workflow',
        scenario: 'Registrar steps through verified admission stages.',
        impact: 'Zero skipped steps with real-time visual progress feedback.',
      },
    ],
    uxPsychology: [{ principle: 'Chunking', detail: 'Breaks long forms into bite-sized steps.' }],
    usageGuidelines: [{ doItem: 'Show clear numbers.', dontItem: 'Do not hide progress.' }],
    implementationNotes: [
      'Animated connecting line tracks with active loading beam.',
      'Spring pop checkmark transitions.',
      'Step-to-step AnimatePresence phase card.',
    ],
    supportedStates: ['Active', 'Completed', 'Upcoming'],
  },
  {
    id: 'animated-counter',
    name: 'Animated Counter',
    category: 'Display',
    builtAt: '2026-11-02',
    paradigm: 'Odometer Roll Standard',
    description:
      'Precision mechanical odometer counter rolling numerical metrics smoothly during real-time value updates and increments.',
    explanation: 'Smoothly rolls numbers when key school metrics update.',
    props: [{ name: 'value', type: 'number', description: 'Numeric count.' }],
    codeSnippet: `import { AnimatedCounterDemo } from '@/features/document/components/ui-library';\n\n<AnimatedCounterDemo />`,
    realWorldExamples: [
      {
        title: 'Campus Dashboard',
        scenario: 'Director views live student enrollment totals.',
        impact: 'Live dynamism.',
      },
    ],
    uxPsychology: [
      { principle: 'Visual Salience', detail: 'Moving numbers convey live vitality.' },
    ],
    usageGuidelines: [
      { doItem: 'Format with commas.', dontItem: 'Avoid rapid flashing counters.' },
    ],
    implementationNotes: ['React state counting with locale string.'],
    supportedStates: ['Resting', 'Incrementing'],
  },
  {
    id: 'voice-note',
    name: 'Voice Note (Tactile Waveform Audio Player)',
    category: 'Display',
    builtAt: '2026-11-02',
    paradigm: 'Waveform Audio Standard',
    description:
      'Clean audio waveform player featuring real Web Audio procedural speech synthesis, live AnalyserNode frequency waveforms, and click-to-seek scrubbing.',
    explanation:
      'A focused voice memo player featuring real procedural audio synthesis via Web Audio API, dynamic waveform bars driven by a live AnalyserNode, variable speed controls, and interactive scrubbing.',
    props: [
      {
        name: 'duration',
        type: 'number',
        default: '12',
        description: 'Total audio track duration in seconds.',
      },
    ],
    codeSnippet: `import { VoiceNoteDemo } from '@/features/document/components/ui-library';\n\n<VoiceNoteDemo />`,
    realWorldExamples: [
      {
        title: 'Faculty Dean Audio Briefing',
        scenario:
          'Dean records verbal instructions for semester exam verification to all department chairs.',
        impact:
          'Delivers high-fidelity spoken communication with verified searchable text transcript.',
      },
      {
        title: 'Language Lab Student Oral Assessment',
        scenario:
          'ESL instructor plays student pronunciation audio sample with interactive waveform scrubbing.',
        impact:
          'Enables precise timestamp replay and variable speed playback for grading accuracy.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Multimodal Audio-Visual Synchrony',
        detail:
          'Pulsing waveform bars confirm audio playback visually, accommodating hearing-impaired users.',
      },
      {
        principle: 'User Control & Freedom',
        detail:
          'Scrubbable waveform and speed toggles give listeners control over information consumption rate.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Always provide a written text transcript drawer for accessibility (WCAG 2.2 AA).',
        dontItem: 'Never autoplay audio on initial page load or user navigation.',
      },
      {
        doItem: 'Allow users to click any waveform bar to scrub directly to that timestamp.',
        dontItem: 'Use tiny play/pause buttons—keep hit bounds to minimum 44x44px.',
      },
    ],
    implementationNotes: [
      'Interactive scrubbable waveform with proportional progress fill in Royal Blue (#0056FF).',
      'Variable speed state: 1x -> 1.25x -> 1.5x -> 2x cyclical toggle.',
      'Lossless 48kHz badge with live minutes:seconds time elapsed / total duration display.',
    ],
    supportedStates: [
      'Paused (Idle)',
      'Playing (Animated Waveform)',
      'Scrubbing Timestamp',
      'Speed Adjusted',
      'Transcript Expanded',
    ],
  },
  {
    id: 'data-table',
    name: 'Interactive Data Table',
    category: 'Display',
    builtAt: '2026-11-02',
    paradigm: 'Client-Side Ledger & Tri-State Sorting Standard',
    description:
      'Enterprise data table supporting instant debounced filtering, multi-column sorting, pagination, and status indicators.',
    explanation:
      'High-performance zero-dependency tabular records manager. Features keyboard-focusable tri-state sort headers (none -> asc -> desc), debounced full-row search, animated SVG direction caret, stable sorting, status badges, live aria-live count announcements, sticky headers with dynamic scroll shadows, and smart windowed pagination.',
    props: [
      { name: 'data', type: 'T[]', description: 'Array of tabular records to display and filter.' },
      {
        name: 'columns',
        type: 'DataTableColumn<T>[]',
        description:
          'Column definitions with headers, keys, type, alignment, and custom cell renderers.',
      },
      {
        name: 'initialPageSize',
        type: 'number',
        default: '10',
        description: 'Default rows displayed per page.',
      },
      {
        name: 'pageSizeOptions',
        type: 'number[]',
        default: '[5, 10, 20, 50]',
        description: 'Selectable rows-per-page options.',
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        description: 'Placeholder for debounced search box.',
      },
      {
        name: 'theme',
        type: "'light' | 'dark'",
        default: "'light'",
        description: 'Surface color mode.',
      },
    ],
    codeSnippet: `import { DataTable, type DataTableColumn, StatusPill } from '@/features/document/components/ui-library';

interface StudentRecord {
  id: string;
  code: string;
  name: string;
  program: string;
  gpa: number;
  status: 'Active' | 'Pending' | 'Probation';
  tuitionFee: number;
}

const columns: DataTableColumn<StudentRecord>[] = [
  { key: 'code', header: 'Student ID', sortable: true, type: 'string' },
  { key: 'name', header: 'Student Name', sortable: true, type: 'string' },
  { key: 'program', header: 'Program', sortable: true, type: 'string' },
  { key: 'gpa', header: 'GPA', sortable: true, type: 'number', align: 'center' },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (val) => <StatusPill status={String(val)} />,
  },
  { key: 'tuitionFee', header: 'Tuition', sortable: true, type: 'number', align: 'right' },
];

<DataTable
  title="Student Academic Roster"
  data={records}
  columns={columns}
  initialPageSize={10}
/>`,
    realWorldExamples: [
      {
        title: 'Academic Enrollment Ledger',
        scenario:
          'Registrars search, sort by GPA, and verify active student cohorts across programs.',
        impact: 'Zero latency instant filtering.',
      },
      {
        title: 'Tuition Fee Accounts Roster',
        scenario:
          'Finance officers review tuition fee collections, filter by status pill, and export ledger pages.',
        impact: 'Accurate tabular numeral auditing.',
      },
      {
        title: 'Faculty Assignment Directory',
        scenario: 'Deans inspect faculty course loads, sorting by department and teaching hours.',
        impact: 'Frictionless client-side sorting.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Doherty Threshold (<400ms)',
        detail:
          'Debounced 200ms search and instantaneous client-side sorting keeps users in uninterrupted flow state.',
      },
      {
        principle: "Fitts's Law & Coyote Time",
        detail:
          'Full column header hit targets with keyboard Enter/Space triggers ensure effortless sorting.',
      },
      {
        principle: "Miller's Law & Chunking",
        detail: 'Windowed pagination chunks dense data into digestible 5, 10, or 20 row sets.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'Use when building admin dashboards, settings screens, or internal tools listing structured records with few hundred to thousand client-side rows with zero bundle weight.',
        dontItem:
          'Do not use for millions of rows (use server-side pagination with row virtualization) or hierarchical tree-tables.',
      },
      {
        doItem:
          'Click any column header to sort (none -> ascending -> descending), use the search box to filter across all columns, and page through the results below.',
        dontItem:
          'Do not require inline editing, drag reordering, or column resizing — keep client-side table focused on high-performance reading and auditing.',
      },
    ],
    implementationNotes: [
      '01 Search Input: Debounced text filter with a magnifier icon and inline clear button. Matches across every column.',
      '02 Result Count: Live "Showing X-Y of Z" region announced to assistive tech via aria-live.',
      '03 Sortable Header: Keyboard-focusable column header with a tri-state click cycle: none, ascending, descending.',
      '04 Sort Indicator: Animated caret in the active column that rotates to flip direction without re-rendering.',
      '05 Comparator: Type-aware comparison for strings, numbers, and dates. Stable so equal rows keep insertion order.',
      '06 Status Pill: Colored badge with clean typography (Zero-Dot Standard) for at-a-glance scanning of categorical values.',
      '07 Sticky Header: Headers stay pinned while the body scrolls. A subtle shadow appears once the user has scrolled.',
      '08 Pagination Nav: First, last, and a window around the current page with ellipses. Disabled at boundaries.',
      '09 Page Size: Selector for rows per page that re-clamps the current page so the visible window stays valid.',
      '10 Empty State: Friendly fallback when the search filter yields no rows, telling the user what they searched for.',
    ],
    supportedStates: [
      'Default Table View',
      'Debounced Search Filtering',
      'Ascending Column Sort',
      'Descending Column Sort',
      'Sticky Header Scrolled Shadow',
      'Empty State Search Fallback',
    ],
  },

  {
    id: 'marquee-section',
    name: 'Marquee Section',
    category: 'Sections',
    builtAt: '2026-11-02',
    paradigm: 'Continuous Velocity Ticker Standard',
    description:
      'Seamless horizontal infinite marquee ticker displaying institutional partners and accreditations with pause on hover.',
    explanation: 'Endless marquee carousel displaying accredited institutions and partners.',
    props: [{ name: 'items', type: 'array', description: 'List of partner labels.' }],
    codeSnippet: `import { MarqueeSectionDemo } from '@/features/document/components/ui-library';\n\n<MarqueeSectionDemo />`,
    realWorldExamples: [
      {
        title: 'Accreditation Strip',
        scenario: 'Showcases Ministry and partner universities.',
        impact: 'Builds social proof.',
      },
    ],
    uxPsychology: [
      { principle: 'Social Proof', detail: 'Partner logos establish institutional trust.' },
    ],
    usageGuidelines: [
      { doItem: 'Allow horizontal scrolling on touch.', dontItem: 'Do not auto-scroll too fast.' },
    ],
    implementationNotes: ['Flex container with horizontal overflow.'],
    supportedStates: ['Scrolling', 'Paused'],
  },
  // ==========================================
  // FORMS
  // ==========================================
  {
    id: 'floating-label-form',
    name: 'Standard Form Inputs (Candidate Admission Dossier)',
    category: 'Forms',
    builtAt: '2026-11-02',
    paradigm: 'Standard Form Inputs & High-Contrast Placeholders',
    description:
      'High-contrast standard input suite with clear labels, contextual placeholders, focus rings, 44px hit bounds, and live registration validation.',
    explanation:
      'Standard enterprise form input layout with distinct labels and placeholders. Built for high-volume student registrar admissions with 44px minimum touch targets and live feedback.',
    props: [
      { name: 'label', type: 'string', description: 'Floating field label text.' },
      { name: 'value', type: 'string', description: 'Controlled input value.' },
      {
        name: 'onChange',
        type: '(e: React.ChangeEvent<HTMLInputElement>) => void',
        description: 'Change event handler.',
      },
      {
        name: 'type',
        type: 'string',
        default: "'text'",
        description: 'Input type (text, email, password, etc.).',
      },
    ],
    codeSnippet: `import { FloatingLabelFormDemo } from '@/features/document/components/ui-library';\n\n<FloatingLabelFormDemo />`,
    realWorldExamples: [
      {
        title: 'Candidate Admission Registration',
        scenario:
          'Admissions staff inputs student legal name, institutional email, and national student ID (STU-XXXX-XXXX).',
        impact:
          'Field label remains visible throughout typing, preventing accidental field confusion.',
      },
      {
        title: 'Faculty Profile Onboarding',
        scenario: 'New instructor completes department routing and contact information.',
        impact:
          'Clean high-contrast borders and floating micro-stamps maintain clarity on mobile and desktop.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Cognitive Continuity',
        detail:
          'Labels never vanish upon focus, eliminating short-term memory burden during form completion.',
      },
      {
        principle: 'Direct Spatial Mapping',
        detail:
          'The label sits directly inside the input hit area, maximizing tap accuracy on touch devices.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'Shrink label to font-mono text-[9px] in Royal Blue (#0056FF) on focus and value presence.',
        dontItem: 'Overlap the floating label with entered user text.',
      },
      {
        doItem: 'Maintain minimum 44px input height for comfortable touch interaction.',
        dontItem: 'Use floating labels for complex multi-line textareas.',
      },
    ],
    implementationNotes: [
      'Tailwind peer and peer-placeholder-shown CSS pseudo-classes for zero-JS CSS-native label floating.',
      'Input height: h-12 (48px) with pt-4 pb-1 to provide generous room for the elevated label.',
      'Instant validation confirmation banner upon form submission.',
    ],
    supportedStates: [
      'Resting (Empty Placeholder)',
      'Focused (Floating Label)',
      'Filled / Value Present',
      'Form Submitted Success',
    ],
  },
  {
    id: 'multi-step-wizard',
    name: 'Multi-Step Form Wizard',
    category: 'Forms',
    builtAt: '2026-11-02',
    paradigm: 'Fluid Water Progress & Brand Dropdown Stepper',
    description:
      'Structured onboarding flow featuring fluid water loading progress, dynamic percentage color coding, step-by-step connecting lines, brand dropdown selectors, and strict validation gating.',
    explanation:
      'A four-step wizard with animated connecting lines, fluid water loading bar, dynamic percentage tracking, custom brand dropdown selectors, inline validation that prevents bypassing required fields, and session persistence.',
    props: [
      { name: 'theme', type: "'light' | 'dark'", description: 'Instrument panel color palette.' },
      {
        name: 'onComplete',
        type: '(data: WizardFormData) => void',
        description: 'Callback executed on final submit.',
      },
      { name: 'className', type: 'string', description: 'Container class extensions.' },
    ],
    codeSnippet: `import { MultiStepWizard } from '@/features/document/components/ui-library';\n\n<MultiStepWizard theme="light" onComplete={(data) => console.log(data)} />`,
    realWorldExamples: [
      {
        title: 'Admissions Dossier Registration',
        scenario:
          'Applicant completes identity, campus branch, telephone, MFA security, and terms.',
        impact: 'Zero data loss on page refresh with high completion velocity.',
      },
      {
        title: 'Faculty Onboarding',
        scenario:
          'New academic staff members configure institutional credentials and department routing.',
        impact: 'Clear cognitive chunking reduces error rates by 68%.',
      },
    ],
    uxPsychology: [
      {
        principle: "Miller's Law & Cognitive Chunking",
        detail: 'Dividing 10+ inputs into 4 logical steps prevents cognitive fatigue and drop-off.',
      },
      {
        principle: 'Doherty Threshold & Immediate Feedback',
        detail:
          'Per-field inline validation and instant sessionStorage saves provide confidence in state retention.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'USE THIS WHEN: Multi-stage onboarding, admissions dossiers, or complex profile setup.',
        dontItem: 'NOT IDEAL WHEN: Short forms with fewer than 5 fields (use a single clean card).',
      },
      {
        doItem:
          'USE THIS WHEN: User needs ability to jump back and edit prior entries without data loss.',
        dontItem:
          'NOT IDEAL WHEN: Unrelated non-sequential workflows (use tabs or accordion instead).',
      },
    ],
    implementationNotes: [
      '01 Step Indicator: Numbered dot per step switching between pending, active, and complete states.',
      '02 Progress Bar: 2px gradient fill across the top of the form growing as user advances.',
      '03 Step Panel: Scoped fieldset for each step with a heading and aria-labelledby.',
      '04 Validation: Per-field rules evaluated on every change; errors appear inline below fields via aria-live regions.',
      '05 Next / Back: Footer controls that advance or rewind; Next disabled until current step is valid.',
      '06 Summary Step: Final read-only review of every entry, with inline Edit links that jump back.',
      '07 Persistence: Form state and current step mirrored to sessionStorage so a refresh preserves progress.',
      '08 ARIA Live: Inline error regions and success panel announce changes to assistive tech without stealing focus.',
      '09 Transitions: Steps slide in horizontally with 0.3s cubic-bezier ease, falling back to fades under prefers-reduced-motion.',
      '10 Success State: Animated check, confirmation copy, and restart button shown in place of form after submit.',
    ],
    supportedStates: [
      'Step 1 Identity',
      'Step 2 Campus',
      'Step 3 Security',
      'Step 4 Review',
      'Submitted',
    ],
  },
  {
    id: 'file-dropzone',
    name: 'File Dropzone',
    category: 'Forms',
    builtAt: '2026-11-02',
    paradigm: 'Dashed Target Dropzone Standard',
    description:
      'Drag-and-drop file staging zone providing MIME type verification, file size validation, and interactive removal chips.',
    explanation: 'Tactile file ingestion zone with live list of verified dossier attachments.',
    props: [{ name: 'maxSize', type: 'string', description: 'Allowed file size limit.' }],
    codeSnippet: `import { FileDropzoneDemo } from '@/features/document/components/ui-library';\n\n<FileDropzoneDemo />`,
    realWorldExamples: [
      {
        title: 'Birth Certificate Upload',
        scenario: 'Guardian uploads scanned PDF dossier.',
        impact: 'Immediate feedback confirmation.',
      },
    ],
    uxPsychology: [
      { principle: 'Spatial Affordance', detail: 'Dashed border invites dragging files.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Display accepted extensions and sizes.',
        dontItem: 'Do not silently drop invalid files.',
      },
    ],
    implementationNotes: ['Dashed 2px border with file badge rows.'],
    supportedStates: ['Idle', 'Hovering', 'File Added'],
  },
  {
    id: 'rich-text-editor',
    name: 'Rich Text Editor',
    category: 'Forms',
    builtAt: '2026-11-02',
    paradigm: 'Zero-Dependency Contenteditable & Sanitized Allowlist Standard',
    description:
      'Lightweight WYSIWYG editor offering Markdown shortcuts, sanitized HTML pasting, formatting controls, and live character counts.',
    explanation:
      'Try pasting rich content from another page — scripts, inline styles, and unknown tags are stripped to a safe allowlist before they ever hit the document.',
    props: [
      {
        name: 'initialContent',
        type: 'string',
        description: 'Initial HTML string pre-populated into the contenteditable surface.',
      },
      {
        name: 'onChange',
        type: '(html: string) => void',
        description: 'Callback fired whenever content or formatting updates.',
      },
      {
        name: 'placeholder',
        type: 'string',
        default: "'Type your formatted content here...'",
        description: 'Placeholder copy rendered when contenteditable is empty.',
      },
      {
        name: 'minHeight',
        type: 'number',
        default: '180',
        description: 'Minimum editor surface height in pixels.',
      },
      {
        name: 'theme',
        type: "'light' | 'dark'",
        default: "'light'",
        description: 'Instrument panel color palette for toolbar and text surface.',
      },
    ],
    codeSnippet: `import { RichTextEditor } from '@/features/document/components/ui-library';\n\n<RichTextEditor\n  initialContent=\"<p>Formatted academic charter...</p>\"\n  onChange={(html) => saveDocument(html)}\n  theme=\"light\"\n/>`,
    realWorldExamples: [
      {
        title: 'Institutional Curriculum Syllabus Composer',
        scenario:
          'Faculty members draft course descriptions with bold headings, lists, and external portal links without markdown complexity.',
        impact: 'Zero external bundle weight with automatic XSS sanitation.',
      },
      {
        title: 'Student Conduct & Audit Incident Records',
        scenario:
          'Campus directors record disciplinary or examination incident notes, pasting excerpts from external emails.',
        impact:
          'Dangerous inline scripts, styles, and iframes are stripped immediately before hitting the page.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Direct Manipulation (WYSIWYG)',
        detail:
          'In-place visual formatting provides instant cognitive feedback without requiring mental markdown translation.',
      },
      {
        principle: 'Selection Preservation & Zero Friction',
        detail:
          'Preventing default on toolbar mousedown preserves active selection range so clicking formatting never collapses the caret.',
      },
    ],
    usageGuidelines: [
      {
        doItem:
          'USE THIS WHEN: You need formatted input — comments, descriptions, notes, or a message composer — where Markdown would be a hurdle for non-technical users.',
        dontItem:
          'NOT IDEAL WHEN: You need collaborative editing, tables, image uploads, comments, or track-changes — reach for ProseMirror, Lexical, or TipTap instead.',
      },
      {
        doItem:
          'USE THIS WHEN: You want a tiny, dependency-free editor you fully control, rather than shipping a 100 KB+ library for a handful of formatting buttons.',
        dontItem:
          'NOT IDEAL WHEN: Your content is genuinely plain text — a styled textarea (optionally with Markdown) is simpler and more robust.',
      },
      {
        doItem:
          'USE THIS WHEN: Output is stored as HTML and you can sanitize it again on the server before rendering it back.',
        dontItem:
          'NOT IDEAL WHEN: You cannot run server-side sanitization — never trust client-sanitized HTML alone before rendering it to other users.',
      },
    ],
    implementationNotes: [
      '01 Contenteditable Surface: One element with contenteditable="true", role="textbox", and aria-multiline does all the editing — no iframe, no shadow DOM.',
      '02 Command Toolbar: A role="toolbar" row of real buttons, each mapping to a single execCommand routed through one exec() seam.',
      '03 Live State Sync: queryCommandState drives both the cyan is-active styling and aria-pressed as the caret moves through formatted text.',
      '04 Allowlist Sanitizer: Pasted HTML is parsed in a detached document and reduced to a safe tag/attribute allowlist before it touches the page.',
      '05 URL Scheme Guard: Link hrefs are validated — javascript:, data:, and vbscript: are rejected, and survivors get rel="noopener nofollow".',
      '06 HTML Source View: Toggle the surface for a textarea of clean HTML; switching back re-sanitizes whatever was hand-typed.',
      "07 Selection-Safe Buttons: Toolbar buttons preventDefault on mousedown so a click never collapses the editor's selection.",
      '08 Keyboard Shortcuts: Ctrl/Cmd+B, I, and U map to bold, italic, and underline; Enter and caret movement stay native.',
    ],
    supportedStates: [
      'Visual WYSIWYG Editing',
      'Active Command State Highlight (Cyan Pill)',
      'Sanitized Allowlist Paste Interception',
      'Guarded External Hyperlink (rel=noopener)',
      'Raw HTML Source View Toggle',
    ],
  },
];

const FUTURE_M3_COMPONENTS: ComponentItemDoc[] = [
  // ==========================================
  // NAVIGATION (Material 3 Standards)
  // ==========================================
  {
    id: 'app-bars',
    name: 'App bars',
    category: 'Navigation',
    paradigm: 'Material 3 Top App Bar Standard',
    description:
      'Top screen header presenting page title, primary navigation actions, and contextual task triggers.',
    explanation:
      'App bars provide a predictable anchor at the top of screens, communicating user orientation and hosting global triggers.',
    props: [
      { name: 'title', type: 'string', description: 'Screen or section title.' },
      {
        name: 'variant',
        type: "'small' | 'medium' | 'large' | 'center-aligned'",
        description: 'M3 sizing archetype.',
      },
    ],
    codeSnippet: `import { AppBar } from '@/components/ui';\n\n<AppBar title="Academics" />`,
    realWorldExamples: [
      {
        title: 'Campus Header',
        scenario: 'User navigates top level academic modules.',
        impact: 'Stable orientation anchor.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Spatial Orientation',
        detail: 'Consistent top bar grounds visual hierarchy across route changes.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Maintain 56px height for small bars.',
        dontItem: 'Crowd with more than 3 trailing action icons.',
      },
    ],
    implementationNotes: ['Level 0 (flat) or Level 2 scrolled surface tint.'],
    supportedStates: ['Flat (Top of Page)', 'Scrolled (Elevated Surface)', 'Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'navigation-bar',
    name: 'Navigation bar',
    category: 'Navigation',
    parentGroupId: 'navigation',
    paradigm: 'Material 3 Bottom Navigation Bar Standard',
    description:
      'Horizontal navigation bar anchored to the bottom of mobile viewports for 3 to 5 top-level destinations.',
    explanation:
      'Bottom navigation bars provide effortless one-handed thumb navigation across top-level destinations.',
    props: [{ name: 'items', type: 'NavItem[]', description: 'Destination items.' }],
    codeSnippet: `import { NavigationBar } from '@/components/ui';\n\n<NavigationBar />`,
    realWorldExamples: [
      {
        title: 'Mobile Portal',
        scenario: 'Student navigates home, schedule, and profile on mobile.',
        impact: 'Fast thumb reach.',
      },
    ],
    uxPsychology: [
      {
        principle: "Fitts's Law Thumb Zone",
        detail: 'Positioned at bottom edge for zero-stretch finger reach.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use 3-5 destinations only.',
        dontItem: 'Use for secondary or modal destinations.',
      },
    ],
    implementationNotes: ['Pill-shaped active indicator with smooth scale transition.'],
    supportedStates: ['Active Pill', 'Inactive Icon', 'With Badge Count'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'navigation-drawer',
    name: 'Navigation drawer',
    category: 'Navigation',
    parentGroupId: 'navigation',
    paradigm: 'Material 3 Modal & Standard Drawer Standard',
    description:
      'Vertical slide-in drawer accommodating deep institutional navigation hierarchies and account context.',
    explanation:
      'Drawers provide access to all destinations without permanent horizontal screen space consumption on smaller screens.',
    props: [{ name: 'open', type: 'boolean', description: 'Drawer visibility state.' }],
    codeSnippet: `import { NavigationDrawer } from '@/components/ui';\n\n<NavigationDrawer />`,
    realWorldExamples: [
      {
        title: 'Campus Registrar Hierarchy',
        scenario: 'Deep departmental routing tree.',
        impact: 'Structured exploration.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Progressive Disclosure',
        detail: 'Hides extensive navigation hierarchy behind a single accessible trigger.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Include account profile and branch switcher in header.',
        dontItem: 'Use without backdrop dismiss on mobile.',
      },
    ],
    implementationNotes: ['Dismissable via swipe gesture or backdrop click.'],
    supportedStates: ['Collapsed', 'Expanded (Modal)', 'Standard (Permanent)'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'navigation-rail',
    name: 'Navigation rail',
    category: 'Navigation',
    parentGroupId: 'navigation',
    paradigm: 'Material 3 Side Navigation Rail Standard',
    description:
      'Compact vertical sidebar rail providing 3 to 7 primary destinations on tablet and desktop screens.',
    explanation:
      'Navigation rails offer an ergonomic vertical bridge between bottom bars and full-width sidebars.',
    props: [
      { name: 'destinations', type: 'RailDestination[]', description: 'List of rail icons.' },
    ],
    codeSnippet: `import { NavigationRail } from '@/components/ui';\n\n<NavigationRail />`,
    realWorldExamples: [
      {
        title: 'Desktop Console',
        scenario: 'Admin switches between Student, Course, and Finance views.',
        impact: 'Slim 72px rail maximizes canvas.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Compact Recognition',
        detail: 'Icon and concise label provide instant scanning with minimal width consumption.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep rail width between 72px and 80px.',
        dontItem: 'Overload with scrollable nested trees.',
      },
    ],
    implementationNotes: ['Active pill background with 44px hit bounds.'],
    supportedStates: ['Compact Rail', 'Expanded Rail', 'Active Destination'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    paradigm: 'Material 3 Primary & Secondary Tabs Standard',
    description:
      'Segmented horizontal tab strip organizing related views at the same hierarchical level.',
    explanation:
      'Tabs organize content into high-level categories that can be switched in place without page reloads.',
    props: [{ name: 'tabs', type: 'string[]', description: 'Array of tab labels.' }],
    codeSnippet: `import { Tabs } from '@/components/ui';\n\n<Tabs />`,
    realWorldExamples: [
      {
        title: 'Student Dossier View',
        scenario: 'Switching between Overview, Grades, Attendance, and Fees.',
        impact: 'Instant in-place context.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Spatial Chunking',
        detail: 'Groups large records into digestible thematic sections.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep tab labels concise (1-2 words).',
        dontItem: 'Wrap tab labels into multiple text rows.',
      },
    ],
    implementationNotes: ['Sliding indicator bar with spring physics.'],
    supportedStates: ['Active Tab', 'Hovered Tab', 'Disabled Tab'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'toolbars',
    name: 'Toolbars',
    category: 'Navigation',
    paradigm: 'Material 3 Action Toolbar Standard',
    description:
      'Compact horizontal surface hosting contextual commands, tools, and actions for an active workspace.',
    explanation:
      'Toolbars group related actions and utilities together above a work canvas or editing surface.',
    props: [{ name: 'tools', type: 'ToolItem[]', description: 'Actions and commands.' }],
    codeSnippet: `import { Toolbar } from '@/components/ui';\n\n<Toolbar />`,
    realWorldExamples: [
      {
        title: 'Grade Sheet Editor',
        scenario: 'Batch calculation, export, and filter tools.',
        impact: 'Concentrated productivity tools.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Proximity (Gestalt)',
        detail: 'Grouping actions together signals they apply directly to the underlying canvas.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use accessible tooltips for icon-only actions.',
        dontItem: 'Combine conflicting destructive and edit actions.',
      },
    ],
    implementationNotes: ['Role="toolbar" with left/right keyboard arrow navigation.'],
    supportedStates: ['Idle', 'Active Tool', 'Disabled Action'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'menus',
    name: 'Menus',
    category: 'Navigation',
    paradigm: 'Material 3 Cascading Context Menu Standard',
    description:
      'Floating temporary surface displaying a list of choices on a transient elevated sheet.',
    explanation:
      'Menus expose contextual choices triggered by a button or cursor action without cluttering the screen.',
    props: [{ name: 'items', type: 'MenuItem[]', description: 'Contextual options.' }],
    codeSnippet: `import { Menu } from '@/components/ui';\n\n<Menu />`,
    realWorldExamples: [
      {
        title: 'Student Action Overflow',
        scenario: 'Actions: Edit record, Download transcript, Generate invoice.',
        impact: 'Tidy interface.',
      },
    ],
    uxPsychology: [
      {
        principle: "Hick's Law Decision Density",
        detail: 'Restricts action choices to relevant contextual operations.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Order items logically from frequent to destructive.',
        dontItem: 'Open menus off-screen without viewport flipping.',
      },
    ],
    implementationNotes: ['Level 2 Surface Elevation with Escape key dismiss.'],
    supportedStates: ['Closed', 'Open (Elevated)', 'Focused Item'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },

  // ==========================================
  // BUTTONS & INPUTS (Material 3 Standards)
  // ==========================================
  {
    id: 'buttons',
    name: 'Buttons',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Elevated, Filled, Tonal & Outlined Standard',
    description:
      'Core interactive action trigger available in 5 visual emphasis tiers: Elevated, Filled, Filled Tonal, Outlined, and Text.',
    explanation:
      'Buttons allow users to express intent, initiate actions, and confirm operations across the system.',
    props: [
      {
        name: 'variant',
        type: "'filled' | 'tonal' | 'outlined' | 'elevated' | 'text'",
        description: 'Button emphasis variant.',
      },
      { name: 'label', type: 'string', description: 'Action text.' },
    ],
    codeSnippet: `import { Button } from '@/components/ui';\n\n<Button variant="filled">Enroll Student</Button>`,
    realWorldExamples: [
      {
        title: 'Primary Form Submission',
        scenario: 'Submitting student admission form.',
        impact: 'Unambiguous call to action.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Affordance & State Feedback',
        detail: 'Visual depth and ripple feedback assure the user the touch was received.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Maintain >= 44x44px minimum touch targets.',
        dontItem: 'Use more than one primary filled button per card.',
      },
    ],
    implementationNotes: ['Rounded-full shape token with brand focus ring.'],
    supportedStates: ['Default', 'Hover', 'Focused', 'Pressed', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'all-buttons',
    name: 'All buttons',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Full Button Hierarchy Matrix Standard',
    description:
      'Comprehensive design system catalog showing all 5 M3 button variants side-by-side with contrast metrics.',
    explanation:
      'Demonstrates hierarchical pairing of filled primary buttons with tonal and outlined supporting actions.',
    props: [{ name: 'theme', type: 'string', description: 'Surface scheme.' }],
    codeSnippet: `import { ButtonShowcase } from '@/components/ui';\n\n<ButtonShowcase />`,
    realWorldExamples: [
      {
        title: 'Design System Audit',
        scenario: 'Developers verify button hierarchy standards.',
        impact: 'Consistent brand application.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Hierarchical Clarity',
        detail: 'Distinguishes high-stakes commitments from low-stakes auxiliary actions.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Pair 1 Filled CTA with Outlined secondary actions.',
        dontItem: 'Compete primary CTAs in the same card.',
      },
    ],
    implementationNotes: ['Full AAA contrast ratios on every button tier.'],
    supportedStates: ['All Variants Active', 'High Contrast Matrix'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'button-groups',
    name: 'Button groups',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Connected Action Group Standard',
    description:
      'Connected cluster of mutually related action buttons arranged along a single border axis.',
    explanation: 'Groups actions with related consequences together into a unified visual pill.',
    props: [{ name: 'buttons', type: 'ButtonProps[]', description: 'Grouped buttons.' }],
    codeSnippet: `import { ButtonGroup } from '@/components/ui';\n\n<ButtonGroup />`,
    realWorldExamples: [
      {
        title: 'Document View Modes',
        scenario: 'Grid, List, and Table toggle group.',
        impact: 'Unified control strip.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Law of Common Region',
        detail: 'Enclosing buttons in a connected outline signals mutual functional relationship.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Connect buttons with unified 1px border dividers.',
        dontItem: 'Mix buttons with drastically different actions.',
      },
    ],
    implementationNotes: ['Seamless internal borders with rounded outer corners.'],
    supportedStates: ['Default', 'Active Option', 'Hovered'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'segmented-buttons',
    name: 'Segmented buttons',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Multi-Option Segment Standard',
    description:
      'Segmented pill controls allowing users to select between 2 to 5 mutually exclusive or multi-select options.',
    explanation:
      'Segmented buttons provide compact horizontal choices in filter bars and dialog controls.',
    props: [{ name: 'segments', type: 'SegmentItem[]', description: 'Available segments.' }],
    codeSnippet: `import { SegmentedButton } from '@/components/ui';\n\n<SegmentedButton />`,
    realWorldExamples: [
      {
        title: 'Academic Semester Filter',
        scenario: 'Selecting Term 1, Term 2, or Summer.',
        impact: 'Immediate dataset filter.',
      },
    ],
    uxPsychology: [
      {
        principle: "Hick's Law Fast Toggling",
        detail: 'Exposes all choices side-by-side for 1-click selection.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use checkmark icon on selected segment.',
        dontItem: 'Use more than 5 segments in a single row.',
      },
    ],
    implementationNotes: ['Active segment filled with brand Ice Tint and checkmark.'],
    supportedStates: ['Unselected', 'Selected with Checkmark', 'Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'split-button',
    name: 'Split button',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Primary & Secondary Action Dropdown Standard',
    description:
      'Dual-action component combining a primary click action with an attached dropdown arrow for alternative actions.',
    explanation:
      'Enables quick execution of the default action while providing immediate access to related variations.',
    props: [{ name: 'primaryAction', type: '() => void', description: 'Default action.' }],
    codeSnippet: `import { SplitButton } from '@/components/ui';\n\n<SplitButton />`,
    realWorldExamples: [
      {
        title: 'Publish & Schedule Post',
        scenario: 'Default: "Publish Now", Dropdown: "Schedule for Later".',
        impact: 'Accelerates default flow.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Default Effect (Status Quo Bias)',
        detail: 'Highlights the most common action while keeping alternatives accessible.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Ensure dividing seam is visible.',
        dontItem: 'Put destructive irreversible actions in the dropdown.',
      },
    ],
    implementationNotes: ['Divider seam between primary button and chevron anchor.'],
    supportedStates: ['Default', 'Primary Active', 'Dropdown Open'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'fabs',
    name: 'FABs',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Floating Action Button Surface Standard',
    description:
      'Prominent circular or rounded rectangular button performing the primary positive action on a screen.',
    explanation:
      'FABs float above the interface to represent the most important screen action within comfortable thumb reach.',
    props: [{ name: 'icon', type: 'ReactNode', description: 'Action icon.' }],
    codeSnippet: `import { Fab } from '@/components/ui';\n\n<Fab />`,
    realWorldExamples: [
      {
        title: 'New Student Enrollment',
        scenario: 'Floating plus button on directory.',
        impact: 'Instant reachability.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Von Restorff Isolation Effect',
        detail: 'Elevated floating placement draws focal attention as the key screen action.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use 1 FAB per screen only.',
        dontItem: 'Use FAB for minor or destructive actions.',
      },
    ],
    implementationNotes: ['Level 3 elevation with smooth scale-down on press.'],
    supportedStates: ['Resting', 'Hovered (Elevated)', 'Pressed'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'extended-fabs',
    name: 'Extended FABs',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Labelled Action Standard',
    description:
      'Wider floating action button containing both an icon and an explicit descriptive text label.',
    explanation:
      'Extended FABs provide clarity when an icon alone could be ambiguous, collapsing on scroll to preserve space.',
    props: [{ name: 'label', type: 'string', description: 'Button text label.' }],
    codeSnippet: `import { ExtendedFab } from '@/components/ui';\n\n<ExtendedFab label="New Invoice" />`,
    realWorldExamples: [
      {
        title: 'Finance Portal',
        scenario: '"Create Invoice" extended FAB.',
        impact: 'Zero ambiguity on action.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Dual Coding Theory',
        detail: 'Combining text with iconography reinforces meaning and accelerates recognition.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Collapse to icon-only on downward scroll.',
        dontItem: 'Use long wordy labels exceeding 3 words.',
      },
    ],
    implementationNotes: ['Animated width transition between extended and collapsed.'],
    supportedStates: ['Extended with Label', 'Collapsed (Icon-Only)', 'Pressed'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'fab-menu',
    name: 'FAB menu',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 Speed Dial Radial Action Standard',
    description:
      'Expandable speed-dial menu radiating secondary actions when the primary FAB is triggered.',
    explanation:
      'Expands a single floating action point into a compact radial stack of related creation actions.',
    props: [{ name: 'actions', type: 'FabAction[]', description: 'Speed dial sub-actions.' }],
    codeSnippet: `import { FabMenu } from '@/components/ui';\n\n<FabMenu />`,
    realWorldExamples: [
      {
        title: 'Multi-Record Creator',
        scenario: 'Add Student, Add Course, Add Invoice.',
        impact: '3 actions in 1 floating point.',
      },
    ],
    uxPsychology: [
      {
        principle: "Hick's Law Progressive Reveal",
        detail: 'Keeps screen clean until the user explicitly requests creation options.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use 2 to 4 sub-actions maximum.',
        dontItem: 'Block primary screen inputs without dismissal.',
      },
    ],
    implementationNotes: ['Backdrop blur with staggered spring entrance.'],
    supportedStates: ['Closed FAB', 'Expanded Radial Speed Dial'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'icon-buttons',
    name: 'Icon buttons',
    category: 'Inputs',
    parentGroupId: 'buttons',
    paradigm: 'Material 3 44px Tactile Micro-Action Standard',
    description:
      'Compact icon-only interactive button engineered with mandatory hover labels and 44x44px touch targets.',
    explanation:
      'Icon buttons allow users to take compact actions in toolbars, app bars, and data table rows.',
    props: [{ name: 'title', type: 'string', description: 'Mandatory accessible hover label.' }],
    codeSnippet: `import { IconButton } from '@/components/ui';\n\n<IconButton title="Settings" />`,
    realWorldExamples: [
      {
        title: 'Table Row Actions',
        scenario: 'Edit, Copy ID, and Archive icons in data rows.',
        impact: 'High data density.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Micro-Affordance & Hit-Target Expansion',
        detail: 'Invisible pseudo-element ensures 44px hit bounds despite 20px glyph size.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Always provide accessible hover title.',
        dontItem: 'Use abstract decorative icons without clear meaning.',
      },
    ],
    implementationNotes: ['::before pseudo-element expanding hit target to 44px.'],
    supportedStates: ['Default', 'Hover Pill', 'Pressed', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Inputs',
    paradigm: 'Material 3 Tri-State Selection Standard',
    description:
      'Selection control allowing users to select one or multiple items from a set, supporting checked, unchecked, and indeterminate states.',
    explanation:
      'Checkboxes permit independent multi-selection across table rows and configuration filters.',
    props: [{ name: 'checked', type: "boolean | 'indeterminate'", description: 'Check state.' }],
    codeSnippet: `import { Checkbox } from '@/components/ui';\n\n<Checkbox />`,
    realWorldExamples: [
      {
        title: 'Batch Student Roster Action',
        scenario: 'Selecting all students in Grade 10.',
        impact: 'Batch dispatch operations.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Direct Feedback (Lock & Key)',
        detail: 'Instant visual mark confirms state without ambiguous toggling.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Support indeterminate state when some sub-items are selected.',
        dontItem: 'Use checkboxes for mutually exclusive options.',
      },
    ],
    implementationNotes: ['SVG check and minus paths with spring interpolation.'],
    supportedStates: ['Unchecked', 'Checked', 'Indeterminate', 'Focused', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'radio-button',
    name: 'Radio button',
    category: 'Inputs',
    paradigm: 'Material 3 Mutually Exclusive Option Standard',
    description:
      'Selection control allowing users to select exactly one option from a list of mutually exclusive choices.',
    explanation:
      'Radio buttons present all available alternatives at once when users need to compare choices before selecting.',
    props: [{ name: 'selected', type: 'boolean', description: 'Selection state.' }],
    codeSnippet: `import { RadioButton } from '@/components/ui';\n\n<RadioButton />`,
    realWorldExamples: [
      {
        title: 'Payment Method Selection',
        scenario: 'Choosing between KHQR, Bank Transfer, and Cash.',
        impact: 'Single selection guarantee.',
      },
    ],
    uxPsychology: [
      {
        principle: "Hick's Law Side-by-Side Comparison",
        detail: 'Exposes choices openly unlike hidden dropdown menus.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Always have exactly one radio selected by default.',
        dontItem: 'Allow multiple radios in a group to be selected.',
      },
    ],
    implementationNotes: ['Inner dot scales up smoothly with 150ms cubic ease.'],
    supportedStates: ['Unselected', 'Selected (Inner Dot)', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'date-pickers',
    name: 'Date pickers',
    category: 'Inputs',
    parentGroupId: 'date-time-pickers',
    paradigm: 'Material 3 Modal & Docked Calendar Standard',
    description:
      'Interactive calendar picker supporting single date selection, date ranges, and direct text input entry.',
    explanation:
      'Date pickers facilitate fast date selection with month navigation, day grids, and keyboard accessibility.',
    props: [{ name: 'value', type: 'Date | null', description: 'Selected date.' }],
    codeSnippet: `import { DatePicker } from '@/components/ui';\n\n<DatePicker />`,
    realWorldExamples: [
      {
        title: 'Enrollment Effective Date',
        scenario: 'Selecting student admission date.',
        impact: 'Valid date entry.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Calendar Mental Model',
        detail: 'Matches intuitive real-world calendar grid mental representations.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Highlight today and active selection clearly.',
        dontItem: 'Disable keyboard manual date input entry.',
      },
    ],
    implementationNotes: ['WCAG accessible arrow key calendar cell navigation.'],
    supportedStates: ['Docked Input', 'Modal Calendar Open', 'Date Selected'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'time-pickers',
    name: 'Time pickers',
    category: 'Inputs',
    parentGroupId: 'date-time-pickers',
    paradigm: 'Material 3 Clock Dial & Input Standard',
    description:
      'Precision time selection control offering radial clock dial selection and numeric hour/minute inputs with AM/PM toggle.',
    explanation:
      'Time pickers enable intuitive hour and minute selection for scheduling courses, examinations, and meetings.',
    props: [{ name: 'time', type: 'string', description: 'Selected time in HH:mm format.' }],
    codeSnippet: `import { TimePicker } from '@/components/ui';\n\n<TimePicker />`,
    realWorldExamples: [
      {
        title: 'Course Timetable Scheduling',
        scenario: 'Setting lecture start and end periods.',
        impact: 'Conflict-free timetabling.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Familiar Clock Metaphor',
        detail: 'Circular dial provides spatial intuition for hours and 5-minute intervals.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Provide instant toggle between dial and text input.',
        dontItem: 'Force tedious scrolling for minutes.',
      },
    ],
    implementationNotes: ['Radial clock face with angle calculations.'],
    supportedStates: ['Hour Selection', 'Minute Selection', 'AM/PM Active'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'sliders',
    name: 'Sliders',
    category: 'Inputs',
    paradigm: 'Material 3 Continuous & Discrete Range Standard',
    description:
      'Horizontal track control allowing users to select a value or range of values along an interactive scale.',
    explanation:
      'Sliders allow users to make quick adjustments across a spectrum such as volume, thresholds, or price ranges.',
    props: [{ name: 'value', type: 'number', description: 'Current numeric value.' }],
    codeSnippet: `import { Slider } from '@/components/ui';\n\n<Slider />`,
    realWorldExamples: [
      {
        title: 'Attendance Quorum Threshold',
        scenario: 'Adjusting passing grade threshold from 50% to 100%.',
        impact: 'Tactile adjustment.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Continuous Sensory Feedback',
        detail: 'Sliding track gives tactile proportion of value relative to scale limits.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Display value label bubble on drag.',
        dontItem: 'Use sliders for precise non-numeric qualitative data.',
      },
    ],
    implementationNotes: ['Touch-friendly 44px thumb bounding box.'],
    supportedStates: ['Resting', 'Dragging (Value Bubble Active)', 'Discrete Steps'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'search',
    name: 'Search',
    category: 'Inputs',
    paradigm: 'Material 3 Search Bar & View Standard',
    description:
      'Full-featured search input transforming smoothly into an expanded search view with live autocomplete suggestions.',
    explanation:
      'Search bars provide direct, high-speed access to records, students, and documents without menu hunting.',
    props: [{ name: 'query', type: 'string', description: 'Search query.' }],
    codeSnippet: `import { SearchBar } from '@/components/ui';\n\n<SearchBar />`,
    realWorldExamples: [
      {
        title: 'Global Campus Lookup',
        scenario: 'Admin searches student ID, phone number, or guardian name.',
        impact: '<200ms lookup.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Doherty Threshold (<400ms)',
        detail: 'Real-time debounced results keep the operator in continuous productive flow.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Include clear (X) icon when text is entered.',
        dontItem: 'Force users to press Enter for basic filtering.',
      },
    ],
    implementationNotes: ['Rounded-full 48px height with search glyph prefix.'],
    supportedStates: ['Collapsed Bar', 'Focused (Expanded View)', 'With Query'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },

  // ==========================================
  // FEEDBACK (Material 3 Standards)
  // ==========================================
  {
    id: 'dialogs',
    name: 'Dialogs',
    category: 'Feedback',
    paradigm: 'Material 3 Basic & Full-Screen Dialog Standard',
    description:
      'Modal window interrupting the active workflow to capture critical user decisions or present essential information.',
    explanation:
      'Dialogs demand immediate attention, disabling the background canvas until confirmed or dismissed.',
    props: [{ name: 'open', type: 'boolean', description: 'Dialog visibility.' }],
    codeSnippet: `import { Dialog } from '@/components/ui';\n\n<Dialog />`,
    realWorldExamples: [
      {
        title: 'Permanent Student Expulsion',
        scenario: 'Warning before irreversible database deletion.',
        impact: 'Prevents catastrophic mistakes.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Consequence Confrontation (Norman)',
        detail: 'Modal isolation forces the operator to acknowledge destructive outcomes.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Always provide a neutral Cancel option.',
        dontItem: 'Use dialogs for trivial status notifications.',
      },
    ],
    implementationNotes: ['Native ::backdrop with blur and Focus Trap.'],
    supportedStates: ['Open Modal', 'Closed', 'Confirming (Spinner)'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'bottom-sheets',
    name: 'Bottom sheets',
    category: 'Feedback',
    parentGroupId: 'sheets',
    paradigm: 'Material 3 Standard & Modal Bottom Sheet Standard',
    description:
      'Surface anchored to the bottom edge of the display, offering supplementary content or secondary actions.',
    explanation:
      'Bottom sheets slide up from the bottom of the screen to reveal contextual menus, filters, and forms.',
    props: [{ name: 'open', type: 'boolean', description: 'Sheet state.' }],
    codeSnippet: `import { BottomSheet } from '@/components/ui';\n\n<BottomSheet />`,
    realWorldExamples: [
      {
        title: 'Roster Export Options',
        scenario: 'Choose CSV, PDF, or Excel export format on mobile.',
        impact: 'Frictionless selection.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Physicality & Sheet Metaphor',
        detail: 'Dragging a sheet up and down mimics physical paper handling.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Include drag handle pill at top center.',
        dontItem: 'Block dismissal via downward swipe.',
      },
    ],
    implementationNotes: ['Touch drag listener with snap points.'],
    supportedStates: ['Hidden', 'Peek (Half Height)', 'Expanded (Full Height)'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'side-sheets',
    name: 'Side sheets',
    category: 'Feedback',
    parentGroupId: 'sheets',
    paradigm: 'Material 3 Coplanar & Modal Side Sheet Standard',
    description:
      'Vertical surface anchored to the right side of the screen displaying supplementary details or inspector panels.',
    explanation:
      'Side sheets permit deep document inspection and configuration while keeping the primary table visible.',
    props: [{ name: 'open', type: 'boolean', description: 'Side sheet visibility.' }],
    codeSnippet: `import { SideSheet } from '@/components/ui';\n\n<SideSheet />`,
    realWorldExamples: [
      {
        title: 'Student Dossier Inspector',
        scenario: 'Admin clicks table row; side sheet opens full student profile.',
        impact: 'Zero context loss.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Preservation of Work Context',
        detail: 'Keeps parent table visible so users never lose their place in the list.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use coplanar side sheet on desktop viewports.',
        dontItem: 'Obscure main table filters entirely.',
      },
    ],
    implementationNotes: ['Smooth slide-in transition from right boundary.'],
    supportedStates: ['Closed', 'Open Coplanar', 'Open Modal'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'loading-indicator',
    name: 'Loading indicator',
    category: 'Feedback',
    parentGroupId: 'loading-progress',
    paradigm: 'Material 3 Circular Activity Spinner Standard',
    description:
      'Animated circular progress glyph expressing indeterminate background computation and async data fetching.',
    explanation:
      'Circular indicators communicate that the system is actively working on a task of indeterminate length.',
    props: [{ name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Spinner dimension.' }],
    codeSnippet: `import { LoadingIndicator } from '@/components/ui';\n\n<LoadingIndicator />`,
    realWorldExamples: [
      {
        title: 'Database Query Wait',
        scenario: 'Fetching 500 student records over replica set.',
        impact: 'Assures ongoing progress.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Anxiety Reduction',
        detail: 'Motion feedback confirms the application has not frozen or disconnected.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Show spinner when operations take > 300ms.',
        dontItem: 'Flash spinner for instant operations under 100ms.',
      },
    ],
    implementationNotes: ['SVG stroke-dasharray keyframe animation.'],
    supportedStates: ['Spinning Indeterminate', 'Determinate Progress'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'progress-indicators',
    name: 'Progress indicators',
    category: 'Feedback',
    parentGroupId: 'loading-progress',
    paradigm: 'Material 3 Linear & Circular Determinate Standard',
    description:
      'Linear track progress bar showing the precise percentage completion of a long-running operational task.',
    explanation:
      'Progress indicators quantify the exact proportion of a multi-step job completed, keeping users informed.',
    props: [{ name: 'value', type: 'number', description: 'Percentage completion (0 to 100).' }],
    codeSnippet: `import { ProgressIndicator } from '@/components/ui';\n\n<ProgressIndicator value={75} />`,
    realWorldExamples: [
      {
        title: 'Batch Report Generation',
        scenario: 'Processing 45 of 60 campus class schedules.',
        impact: 'Precise time expectation.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Goal-Gradient Hypothesis',
        detail:
          'People accelerate effort and stay patient as they perceive progress toward a goal.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Always accompany with numeric percentage.',
        dontItem: 'Jerk progress bar backward.',
      },
    ],
    implementationNotes: ['Smooth CSS transition on track width fill.'],
    supportedStates: ['Determinate (0-100%)', 'Indeterminate Pulse'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'tooltips',
    name: 'Tooltips',
    category: 'Feedback',
    paradigm: 'Material 3 Plain & Rich Contextual Tooltip Standard',
    description:
      'Contextual label appearing on hover or focus to explain the function of an icon button or obscure control.',
    explanation:
      'Tooltips provide concise textual definitions on hover, ensuring zero ambiguity for icon-only controls.',
    props: [{ name: 'content', type: 'string', description: 'Tooltip explanation text.' }],
    codeSnippet: `import { Tooltip } from '@/components/ui';\n\n<Tooltip content="Export Roster" />`,
    realWorldExamples: [
      {
        title: 'Icon Button Hover',
        scenario: 'User hovers over printer glyph; "Print Grade Sheet" appears.',
        impact: 'Clarity without clutter.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Recognition Over Recall',
        detail: 'Supplies instant explanation without forcing users to remember cryptic icons.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep text under 6 words.',
        dontItem: 'Put vital information in tooltips inaccessible to touch devices.',
      },
    ],
    implementationNotes: ['Floating UI with collision detection and focus trigger.'],
    supportedStates: ['Hidden', 'Revealed on Hover', 'Keyboard Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'snackbar',
    name: 'Snackbar',
    category: 'Feedback',
    paradigm: 'Material 3 Transient Notification & Action Recovery Standard',
    description:
      'Provides brief, non-interruptive notifications at the bottom of the screen about app processes and transient updates.',
    explanation:
      'Snackbars inform users of a process that an app has performed or will perform, providing brief, transient feedback.',
    props: [
      { name: 'message', type: 'string', description: 'Notification message.' },
      { name: 'action', type: 'ReactNode', description: 'Optional recovery action (e.g. Undo).' },
    ],
    codeSnippet: `import { Snackbar } from '@/components/ui';\n\n<Snackbar message="Student record saved." action={<button>Undo</button>} />`,
    realWorldExamples: [
      {
        title: 'Record Archive Feedback',
        scenario: 'User archives course section; snackbar appears with "Undo" action.',
        impact: 'Frictionless undo.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Forgiving Systems (Nielsen)',
        detail: 'Transitory recovery actions allow quick reversal of unintended steps.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep message concise and focused on single transient event.',
        dontItem: 'Use snackbars for critical system errors requiring immediate acknowledgment.',
      },
    ],
    implementationNotes: ['Self-dismissing after 4-7 seconds or upon user interaction.'],
    supportedStates: ['Resting', 'Action Hover', 'Dismissing'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },

  // ==========================================
  // DISPLAY (Material 3 Standards)
  // ==========================================
  {
    id: 'badges',
    name: 'Badges',
    category: 'Display',
    paradigm: 'Material 3 Small & Large Notification Count Standard',
    description:
      'Small visual indicators conveying status information, notification counts, or thematic categorization on an avatar or icon.',
    explanation:
      'Badges draw immediate attention to unread messages, alert numbers, or pending student applications.',
    props: [{ name: 'count', type: 'number', description: 'Optional numeric badge count.' }],
    codeSnippet: `import { Badge } from '@/components/ui';\n\n<Badge count={5} />`,
    realWorldExamples: [
      {
        title: 'Unread Notifications',
        scenario: 'Red dot badge on campus bell icon indicates 3 new messages.',
        impact: 'High visibility signal.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Visual Saliency & Pop-Out Effect',
        detail: 'High-contrast dot triggers immediate peripheral visual awareness.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Truncate numbers over 99 to "99+".',
        dontItem: 'Use badges for non-transient static decorative shapes.',
      },
    ],
    implementationNotes: ['Positioned absolutely at top-right corner of host element.'],
    supportedStates: ['Dot Badge (Uncounted)', 'Count Badge (1-99+)', 'Brand Tonal'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'cards',
    name: 'Cards',
    category: 'Display',
    paradigm: 'Material 3 Elevated, Filled & Outlined Card Standard',
    description:
      'Flexible content container grouping related information, media, and actionable decisions on a single subject.',
    explanation:
      'Cards serve as entry points to more detailed information, providing organized chunks of data.',
    props: [
      {
        name: 'variant',
        type: "'elevated' | 'filled' | 'outlined'",
        description: 'Card surface archetype.',
      },
    ],
    codeSnippet: `import { Card } from '@/components/ui';\n\n<Card />`,
    realWorldExamples: [
      {
        title: 'Student Dossier Card',
        scenario: 'Photo, Name, ID, Major, and View Dossier button.',
        impact: 'Scannable grid unit.',
      },
    ],
    uxPsychology: [
      {
        principle: "Miller's Law Chunking",
        detail: 'Consolidates multi-field records into digestible single visual containers.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Maintain consistent 16px corner radius.',
        dontItem: 'Mix more than 2 card styles on the same screen.',
      },
    ],
    implementationNotes: ['1px Soft Lavender border (#CAD3F5) with zero box-shadows.'],
    supportedStates: ['Elevated', 'Filled', 'Outlined', 'Interactive Hover'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'Display',
    paradigm: 'Material 3 Multi-Browse & Uncontained Carousel Standard',
    description:
      'Horizontally scrollable collection of cards or media items allowing users to browse through rich visual sets.',
    explanation:
      'Carousels display multiple items in a compact space, enabling horizontal browsing with swipe or arrow keys.',
    props: [{ name: 'items', type: 'CarouselItem[]', description: 'Slides array.' }],
    codeSnippet: `import { Carousel } from '@/components/ui';\n\n<Carousel />`,
    realWorldExamples: [
      {
        title: 'Campus Facility Gallery',
        scenario: 'Browsing computer science labs, library, and sports halls.',
        impact: 'Engaging visual tour.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Peek Effect & Visual Affordance',
        detail: 'Partially visible trailing card invites the user to swipe or scroll.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Support keyboard arrow navigation and touch swipe.',
        dontItem: 'Auto-advance rapidly without pause controls.',
      },
    ],
    implementationNotes: ['CSS scroll-snap with inertia momentum.'],
    supportedStates: ['Idle', 'Dragging / Swiping', 'End of Carousel'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'divider',
    name: 'Divider',
    category: 'Display',
    paradigm: 'Material 3 Hairline Spatial Separator Standard',
    description:
      'Thin spatial line separating content into clear thematic groups in lists, layouts, and menus.',
    explanation:
      'Dividers bring visual structure and clarity to dense lists and tables without heavy visual weight.',
    props: [{ name: 'inset', type: 'boolean', description: 'Whether divider indents from edge.' }],
    codeSnippet: `import { Divider } from '@/components/ui';\n\n<Divider />`,
    realWorldExamples: [
      {
        title: 'List Row Separator',
        scenario: 'Delimiting student rows in mobile roster.',
        impact: 'Clean row scanning.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Gestalt Law of Continuity',
        detail: 'Continuous hairline guides horizontal scanning along records.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Use 1px Soft Lavender (#CAD3F5) borders.',
        dontItem: 'Use heavy dark borders that distract from content.',
      },
    ],
    implementationNotes: ['1px solid hairline with optional left inset.'],
    supportedStates: ['Full-bleed', 'Inset', 'Vertical Divider'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'lists',
    name: 'Lists',
    category: 'Display',
    paradigm: 'Material 3 One, Two & Three-Line List Item Standard',
    description:
      'Continuous vertical collection of items containing supporting visuals, headline text, secondary metadata, and actions.',
    explanation:
      'Lists are the most fundamental pattern for displaying structured text and tabular items on mobile and desktop.',
    props: [{ name: 'items', type: 'ListItem[]', description: 'List rows.' }],
    codeSnippet: `import { List } from '@/components/ui';\n\n<List />`,
    realWorldExamples: [
      {
        title: 'Student Directory Feed',
        scenario: 'Avatar, Student Name, Student ID, and Chevron arrow.',
        impact: 'Effortless scanning.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Vertical Reading Flow',
        detail: 'Optimized for vertical eye saccades during rapid information scanning.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep row heights uniform (56px, 72px, 88px).',
        dontItem: 'Cram unformatted text blocks into list rows.',
      },
    ],
    implementationNotes: ['Semantic ul and li tags with accessible row keyboard navigation.'],
    supportedStates: ['Single-Line', 'Two-Line (with Subtitle)', 'Selected Row'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },

  // ==========================================
  // FORMS (Material 3 Standards)
  // ==========================================
  {
    id: 'text-fields',
    name: 'Text fields',
    category: 'Forms',
    paradigm: 'Material 3 Filled & Outlined Text Input Standard',
    description:
      'Text input surface supporting filled and outlined containers, floating labels, helper text, and validation states.',
    explanation:
      'Text fields allow users to type and edit text, numbers, and symbols across forms and data entry flows.',
    props: [
      { name: 'label', type: 'string', description: 'Floating field label.' },
      { name: 'variant', type: "'outlined' | 'filled'", description: 'Field style archetype.' },
    ],
    codeSnippet: `import { TextField } from '@/components/ui';\n\n<TextField label="Full Name" />`,
    realWorldExamples: [
      {
        title: 'Student Registration Form',
        scenario: 'Entering Legal Name, Email Address, and Phone Number.',
        impact: 'Error-free input.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Floating Label Persistence',
        detail: 'Keeps field context visible even after user starts typing.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Show clear helper text below the field.',
        dontItem: 'Rely solely on placeholder text as a label.',
      },
    ],
    implementationNotes: ['Focus ring in brand Royal Blue (#0056FF) with 2px stroke.'],
    supportedStates: ['Resting', 'Hovered', 'Focused (Floating Label)', 'Error State'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Navigation',
    paradigm: 'Expandable Section Standard',
    description: 'Vertically stacked sections that expand to reveal related content in place.',
    explanation:
      'Accordions compress long structured content into scannable headers while keeping the reader on one page.',
    props: [
      { name: 'allowMultiple', type: 'boolean', description: 'Allow several open sections.' },
    ],
    codeSnippet: `import { Accordion } from '@/components/ui';\n\n<Accordion />`,
    realWorldExamples: [
      {
        title: 'Academic Year Plan',
        scenario: 'Terms expand to show their milestones.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Progressive Disclosure',
        detail: 'Reveal detail only when the reader asks for it.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep one section open by default.',
        dontItem: 'Do not hide critical actions inside closed sections.',
      },
    ],
    implementationNotes: ['Chevron rotates 180 degrees on expansion.'],
    supportedStates: ['Collapsed', 'Expanded', 'Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    category: 'Navigation',
    paradigm: 'Path Trail Standard',
    description:
      'Ordered trail of links showing the current page location inside the site hierarchy.',
    explanation:
      'Breadcrumbs give readers a stable map of where they are and a one tap route back up the hierarchy.',
    props: [{ name: 'trail', type: 'string[]', description: 'Ordered ancestor labels.' }],
    codeSnippet: `import { Breadcrumbs } from '@/components/ui';\n\n<Breadcrumbs />`,
    realWorldExamples: [
      {
        title: 'Student Record Path',
        scenario: 'Registrar walks from Home to one student record.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Spatial Orientation', detail: 'A visible path lowers wayfinding effort.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Show the full path on desktop, last levels on mobile.',
        dontItem: 'Do not use breadcrumbs as primary navigation.',
      },
    ],
    implementationNotes: ['Current page uses aria-current and Royal Blue text.'],
    supportedStates: ['Default', 'Hover', 'Current Page'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'link',
    name: 'Link',
    category: 'Navigation',
    paradigm: 'Hyperlink Standard',
    description: 'Inline or standalone text link that navigates to related content.',
    explanation:
      'Links connect related documentation and records with a predictable, scannable text pattern.',
    props: [{ name: 'href', type: 'string', description: 'Destination route.' }],
    codeSnippet: `import { Link } from '@/components/ui';\n\n<Link href="/document">Policy</Link>`,
    realWorldExamples: [
      {
        title: 'Enrollment Policy Reference',
        scenario: 'Form guidance links to the policy page.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Predictability',
        detail: 'Underlined Royal Blue text is recognized instantly as a link.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Write link text that names the destination.',
        dontItem: 'Do not use vague text such as click here.',
      },
    ],
    implementationNotes: ['Underline with 2px Azure decoration and offset.'],
    supportedStates: ['Default', 'Hover', 'Focus', 'Visited'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'tree-view',
    name: 'Tree view',
    category: 'Navigation',
    paradigm: 'Hierarchy Tree Standard',
    description: 'Expandable tree of parent and child nodes for deep structured content.',
    explanation:
      'Tree views expose deep hierarchies such as faculties, grades and classes without leaving the page.',
    props: [{ name: 'nodes', type: 'TreeNode[]', description: 'Nested node data.' }],
    codeSnippet: `import { TreeView } from '@/components/ui';\n\n<TreeView />`,
    realWorldExamples: [
      {
        title: 'Faculty Hierarchy Browser',
        scenario: 'Admin expands Academics to reach Grade 10 A.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [{ principle: 'Chunking', detail: 'Grouped nodes keep deep lists manageable.' }],
    usageGuidelines: [
      {
        doItem: 'Indent children consistently by one level.',
        dontItem: 'Do not exceed three visible levels without search.',
      },
    ],
    implementationNotes: ['Selected node uses Soft Lavender fill.'],
    supportedStates: ['Collapsed', 'Expanded', 'Selected', 'Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'side-navigation',
    name: 'Side navigation',
    category: 'Navigation',
    paradigm: 'Persistent Section Navigation Standard',
    description: 'Persistent vertical navigation for the sections of one product area.',
    explanation:
      'Side navigation keeps section switching visible and stable on medium and expanded windows.',
    props: [{ name: 'items', type: 'NavItem[]', description: 'Section items.' }],
    codeSnippet: `import { SideNavigation } from '@/components/ui';\n\n<SideNavigation />`,
    realWorldExamples: [
      {
        title: 'Program Section Menu',
        scenario: 'Program detail page switches between five sections.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Recognition Over Recall', detail: 'Visible sections beat hidden menus.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Collapse to a horizontal scroll row on compact windows.',
        dontItem: 'Do not mix global and section links in one rail.',
      },
    ],
    implementationNotes: ['Active item is a solid Royal Blue block.'],
    supportedStates: ['Active', 'Hover', 'Compact Row'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'action-button',
    name: 'Action button',
    category: 'Inputs',
    paradigm: 'Single Action Trigger Standard',
    description: 'One clear button that performs a single named action.',
    explanation:
      'Action buttons convert intent into one immediate, reversible where possible, operation.',
    props: [{ name: 'onPress', type: '() => void', description: 'Action handler.' }],
    codeSnippet: `import { ActionButton } from '@/components/ui';\n\n<ActionButton>Add student</ActionButton>`,
    realWorldExamples: [
      {
        title: 'Add Student Trigger',
        scenario: 'Registrar starts a new enrollment.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: "Fitts's Law", detail: 'Large target, short travel, fast action.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Use a verb first label.',
        dontItem: 'Do not use one button for two different actions.',
      },
    ],
    implementationNotes: ['Shares the Buttons demo stage.'],
    supportedStates: ['Enabled', 'Hover', 'Pressed', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'action-group',
    name: 'Action group',
    category: 'Inputs',
    paradigm: 'Grouped Actions Standard',
    description: 'A connected group of related action buttons presented as one control.',
    explanation: 'Action groups keep sibling view and paging controls visually unified.',
    props: [{ name: 'items', type: 'string[]', description: 'Grouped action labels.' }],
    codeSnippet: `import { ActionGroup } from '@/components/ui';\n\n<ActionGroup />`,
    realWorldExamples: [
      {
        title: 'List View Switcher',
        scenario: 'Staff switch between List, Grid and Board.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Gestalt Grouping', detail: 'Shared borders read as one control.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Keep groups to five actions or fewer.',
        dontItem: 'Do not mix unrelated actions in one group.',
      },
    ],
    implementationNotes: ['Shares the Button groups demo stage.'],
    supportedStates: ['Selected', 'Hover', 'Pressed'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'action-bar',
    name: 'Action bar',
    category: 'Inputs',
    paradigm: 'Contextual Action Bar Standard',
    description: 'A horizontal bar of icon actions bound to the current editor or record context.',
    explanation:
      'Action bars place the frequent tools of the current surface in one predictable strip.',
    props: [{ name: 'tools', type: 'ToolItem[]', description: 'Toolbar tools.' }],
    codeSnippet: `import { ActionBar } from '@/components/ui';\n\n<ActionBar />`,
    realWorldExamples: [
      {
        title: 'Document Editor Bar',
        scenario: 'Formatting and export tools above the editor.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Proximity', detail: 'Tools sit next to the content they change.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Group tools by task with dividers.',
        dontItem: 'Do not overflow the bar without a scroll row.',
      },
    ],
    implementationNotes: ['Shares the Toolbars demo stage.'],
    supportedStates: ['Active Tool', 'Hover', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'close-button',
    name: 'Close button',
    category: 'Inputs',
    paradigm: 'Dismiss Action Standard',
    description: 'A compact icon button that dismisses a surface, banner or notice.',
    explanation: 'Close buttons give every dismissible surface a consistent, discoverable exit.',
    props: [{ name: 'onClose', type: '() => void', description: 'Dismiss handler.' }],
    codeSnippet: `import { CloseButton } from '@/components/ui';\n\n<CloseButton />`,
    realWorldExamples: [
      {
        title: 'Notice Dismissal',
        scenario: 'Staff dismiss the holiday notice banner.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'User Control', detail: 'A visible exit keeps surfaces trustworthy.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Place at the top right of the surface.',
        dontItem: 'Do not use close to delete data without confirmation.',
      },
    ],
    implementationNotes: ['Minimum 44px touch target with title label.'],
    supportedStates: ['Default', 'Hover', 'Pressed'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'buttons-item',
    name: 'Buttons',
    category: 'Inputs',
    paradigm: 'Button Family Standard',
    description: 'The complete button family: primary, tonal, outline and text variants.',
    explanation: 'Buttons are the primary action language of the system and share one geometry.',
    props: [
      {
        name: 'variant',
        type: "'primary' | 'tonal' | 'outline' | 'text'",
        description: 'Visual variant.',
      },
    ],
    codeSnippet: `import { Button } from '@/components/ui';\n\n<Button variant="primary">Save</Button>`,
    realWorldExamples: [
      {
        title: 'Form Submit Actions',
        scenario: 'Every form ends with the same primary button.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Consistency', detail: 'One action style builds trust across modules.' },
    ],
    usageGuidelines: [
      {
        doItem: 'One primary button per surface.',
        dontItem: 'Do not stack several primary buttons together.',
      },
    ],
    implementationNotes: ['Shares the Buttons demo stage.'],
    supportedStates: ['Enabled', 'Hover', 'Pressed', 'Disabled'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'checkbox-group',
    name: 'Checkbox group',
    category: 'Inputs',
    paradigm: 'Grouped Checkbox Standard',
    description: 'A labeled group of checkboxes managed as one multi select field.',
    explanation: 'Checkbox groups collect related optional settings under one clear field label.',
    props: [{ name: 'options', type: 'CheckboxOption[]', description: 'Group options.' }],
    codeSnippet: `import { CheckboxGroup } from '@/components/ui';\n\n<CheckboxGroup />`,
    realWorldExamples: [
      {
        title: 'Notification Channels Group',
        scenario: 'School toggles SMS, Telegram and print channels.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Chunking', detail: 'Grouped options are scanned as one decision.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Order options by frequency of use.',
        dontItem: 'Do not use a checkbox group for a single choice.',
      },
    ],
    implementationNotes: ['Shares the Checkbox demo stage.'],
    supportedStates: ['Checked', 'Unchecked', 'Mixed', 'Focused'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'combo-box',
    name: 'Combo box',
    category: 'Inputs',
    paradigm: 'Input Listbox Standard',
    description: 'A text input combined with a filterable listbox of options.',
    explanation: 'Combo boxes merge fast typing with safe selection from a known option list.',
    props: [{ name: 'options', type: 'string[]', description: 'Selectable options.' }],
    codeSnippet: `import { ComboBox } from '@/components/ui';\n\n<ComboBox />`,
    realWorldExamples: [
      {
        title: 'Campus Picker',
        scenario: 'Registrar types to filter five campuses.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [{ principle: "Postel's Law", detail: 'Accept typing, filter strictly.' }],
    usageGuidelines: [
      {
        doItem: 'Filter options as the user types.',
        dontItem: 'Do not accept free text outside the option list.',
      },
    ],
    implementationNotes: ['Selected option carries a Royal Blue check.'],
    supportedStates: ['Closed', 'Open', 'Filtering', 'Selected'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'number-field',
    name: 'Number field',
    category: 'Inputs',
    paradigm: 'Stepper Number Standard',
    description: 'Numeric input with stepper buttons for precise quantity entry.',
    explanation:
      'Number fields prevent invalid quantities while staying fast for small adjustments.',
    props: [
      { name: 'min', type: 'number', description: 'Minimum value.' },
      { name: 'max', type: 'number', description: 'Maximum value.' },
    ],
    codeSnippet: `import { NumberField } from '@/components/ui';\n\n<NumberField />`,
    realWorldExamples: [
      {
        title: 'Classroom Seat Count',
        scenario: 'Admin sets the seat capacity of a room.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Error Prevention', detail: 'Steppers clamp values to the valid range.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Always show the unit and the maximum.',
        dontItem: 'Do not use for long identifiers such as phone numbers.',
      },
    ],
    implementationNotes: ['Steppers keep 44px touch targets.'],
    supportedStates: ['Default', 'Focused', 'Stepped', 'Clamped'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'search-field',
    name: 'Search field',
    category: 'Inputs',
    paradigm: 'Search Input Standard',
    description: 'A dedicated input field for searching and filtering content.',
    explanation: 'Search fields pair a clear icon, live filtering and an instant clear action.',
    props: [{ name: 'value', type: 'string', description: 'Current query.' }],
    codeSnippet: `import { SearchField } from '@/components/ui';\n\n<SearchField />`,
    realWorldExamples: [
      {
        title: 'Module Search',
        scenario: 'Staff filter the module directory by typing.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      { principle: 'Recognition', detail: 'The search icon signals the field purpose instantly.' },
    ],
    usageGuidelines: [
      {
        doItem: 'Filter results live as the user types.',
        dontItem: 'Do not hide the clear action once text exists.',
      },
    ],
    implementationNotes: ['Shares the Search demo stage.'],
    supportedStates: ['Empty', 'Typing', 'Results', 'No Results'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
  {
    id: 'text-area',
    name: 'Text area',
    category: 'Forms',
    paradigm: 'Multi Line Input Standard',
    description: 'Multi line text input for notes and longer free text with a character budget.',
    explanation:
      'Text areas give long input room to breathe while a counter keeps writers inside the limit.',
    props: [{ name: 'maxLength', type: 'number', description: 'Character budget.' }],
    codeSnippet: `import { TextArea } from '@/components/ui';\n\n<TextArea maxLength={140} />`,
    realWorldExamples: [
      {
        title: 'Counselor Note Field',
        scenario: 'Counselor writes a short student note.',
        impact: 'Clear, fast task completion.',
      },
    ],
    uxPsychology: [
      {
        principle: 'Visibility of System Status',
        detail: 'The live counter shows remaining budget.',
      },
    ],
    usageGuidelines: [
      {
        doItem: 'Show the character counter for limited fields.',
        dontItem: 'Do not use a text area for one line answers.',
      },
    ],
    implementationNotes: ['Shares the Text fields demo stage.'],
    supportedStates: ['Empty', 'Typing', 'Near Limit', 'Over Limit'],
    builtAt: '2026-11-08T00:00:00.000Z',
  },
];

const categoryOrderMap = new Map<string, number>();
COMPONENT_CATEGORIES.forEach((cat, idx) => categoryOrderMap.set(cat, idx));

const navItemOrderMap = new Map<string, number>();
let navSequence = 0;
COMPONENT_GROUPS_NAV.forEach((group) => {
  group.items.forEach((item) => {
    if (item.isParent && item.children) {
      item.children.forEach((child) => {
        navItemOrderMap.set(child.id, navSequence++);
      });
    } else {
      navItemOrderMap.set(item.id, navSequence++);
    }
  });
});

/**
 * Master UI Component Library Registry
 * Guaranteed 100% sorted in strict linear flow order matching COMPONENT_GROUPS_NAV and COMPONENT_CATEGORIES.
 * Step-by-step layout prevents rank jumping between parent and child lists.
 */
export const COMPONENT_LIBRARY_REGISTRY: ComponentItemDoc[] = [
  ...RAW_COMPONENT_REGISTRY,
  ...FUTURE_M3_COMPONENTS,
].sort((a, b) => {
  const catOrderA = categoryOrderMap.get(a.category) ?? 999;
  const catOrderB = categoryOrderMap.get(b.category) ?? 999;
  if (catOrderA !== catOrderB) {
    return catOrderA - catOrderB;
  }
  const itemOrderA = navItemOrderMap.get(a.id) ?? 999;
  const itemOrderB = navItemOrderMap.get(b.id) ?? 999;
  return itemOrderA - itemOrderB;
});
