'use client';

import * as React from 'react';
import {
  Accessibility,
  Check,
  X,
  Keyboard,
  Eye,
  Layers,
  Sliders,
  Copy,
  ShieldKey,
  Bell,
  BellRing,
  BellOff,
  MessageSquare,
  FileText,
  PenLine,
  Mouse,
  Cursor,
  HandPointer,
  AppWindow,
  Columns3,
  Grid2x2,
  Maximize2,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  Sparkles,
  Target,
} from '@/components/icons';
import { cn } from '@/lib/utils';

export type AccessibleDesignTab =
  | 'canonical'
  | 'breakpoints'
  | 'density'
  | 'states'
  | 'layout'
  | 'selection'
  | 'inputs'
  | 'notifications'
  | 'ux-writing'
  | 'alt-text'
  | 'inclusive'
  | 'resizing'
  | 'keyboard'
  | 'contrast'
  | 'hierarchy'
  | 'targets';

export interface AccessibleDesignPrinciplesProps {
  initialTab?: AccessibleDesignTab;
}

export function AccessibleDesignPrinciples({
  initialTab = 'layout',
}: AccessibleDesignPrinciplesProps = {}) {
  const [activeTab, setActiveTab] = React.useState<AccessibleDesignTab>(initialTab);

  // Canonical Layout Archetypes State
  const [canonicalArchetype, setCanonicalArchetype] = React.useState<
    'feed' | 'list-detail' | 'supporting'
  >('list-detail');
  const [canonicalBreakpoint, setCanonicalBreakpoint] = React.useState<
    'compact' | 'medium' | 'expanded'
  >('expanded');
  const [canonicalSelectedItemId, setCanonicalSelectedItemId] = React.useState<string>('cs401');
  const [canonicalSupportingPlacement, setCanonicalSupportingPlacement] = React.useState<
    'below' | 'beside'
  >('beside');
  const [canonicalDetailViewMode, setCanonicalDetailViewMode] = React.useState<'list' | 'detail'>(
    'list',
  );

  // Adaptive Breakpoints & 5 Transformation Vectors State
  const [vectorBreakpoint, setVectorBreakpoint] = React.useState<
    'compact' | 'medium' | 'expanded' | 'large' | 'extra-large'
  >('expanded');
  const [activeVectorQuestion, setActiveVectorQuestion] = React.useState<
    'reveal' | 'divide' | 'resize' | 'reposition' | 'swap'
  >('reveal');
  const [vectorRevealedPane, setVectorRevealedPane] = React.useState<boolean>(true);
  const [vectorDividedPanes, setVectorDividedPanes] = React.useState<1 | 2 | 3>(2);
  const [vectorLineLengthLimit, setVectorLineLengthLimit] = React.useState<boolean>(true);
  const [vectorActionPlacement, setVectorActionPlacement] = React.useState<'bottom' | 'leading'>(
    'leading',
  );

  // Grids, Spacing & Density Scaling State
  const [densityScale, setDensityScale] = React.useState<0 | -1 | -2 | -3>(0);
  const [activeGridColumns, setActiveGridColumns] = React.useState<4 | 8 | 12>(12);
  const [gridRulerMode, setGridRulerMode] = React.useState<
    'safety' | 'title' | 'content' | 'margins'
  >('content');
  const [showHitBoxOverlay, setShowHitBoxOverlay] = React.useState<boolean>(true);
  const [spacingGroupingMode, setSpacingGroupingMode] = React.useState<'implicit' | 'explicit'>(
    'implicit',
  );

  // Interaction States Architecture State
  const [interactionState, setInteractionState] = React.useState<
    'enabled' | 'disabled' | 'hover' | 'focused' | 'pressed' | 'dragged'
  >('enabled');
  const [selectedTargetComponent, setSelectedTargetComponent] = React.useState<
    'button' | 'fab' | 'chip' | 'switch' | 'card' | 'input' | 'list-item'
  >('button');
  const [compoundSelectedState, setCompoundSelectedState] = React.useState<boolean>(false);

  // Layout Scaffold & Adaptive Design State
  const [layoutBreakpoint, setLayoutBreakpoint] = React.useState<
    'compact' | 'medium' | 'expanded' | 'large' | 'extra-large'
  >('expanded');
  const [layoutDeviceMode, setLayoutDeviceMode] = React.useState<'mobile' | 'desktop' | 'spatial'>(
    'desktop',
  );
  const [layoutRtl, setLayoutRtl] = React.useState<boolean>(false);
  const [layoutPaneCount, setLayoutPaneCount] = React.useState<1 | 2 | 3>(2);
  const [layoutStrategy, setLayoutStrategy] = React.useState<'show-hide' | 'levitate' | 'reflow'>(
    'show-hide',
  );
  const [layoutShowRulers, setLayoutShowRulers] = React.useState<boolean>(false);
  const [layoutShowSafetyRegion, setLayoutShowSafetyRegion] = React.useState<boolean>(true);
  const [layoutFabExpanded, setLayoutFabExpanded] = React.useState<boolean>(false);
  const [paneWidthRatio, setPaneWidthRatio] = React.useState<number>(50);

  // Selection Architecture State
  const [selectedItems, setSelectedItems] = React.useState<string[]>(['item-1']);
  const [selectionTypeView, setSelectionTypeView] = React.useState<
    'indicators' | 'touch-modes' | 'desktop-hover'
  >('indicators');
  const [activeNavTab, setActiveNavTab] = React.useState<string>('courses');
  const [hoveredRowId, setHoveredRowId] = React.useState<string | null>(null);
  const [desktopTableMode, setDesktopTableMode] = React.useState<'primary' | 'secondary'>(
    'secondary',
  );

  // Multi-Modal Input Simulator State
  const [selectedInputDevice, setSelectedInputDevice] = React.useState<
    'mouse' | 'trackpad' | 'keyboard' | 'stylus'
  >('mouse');
  const [activeCursorType, setActiveCursorType] = React.useState<
    'default' | 'pointer' | 'text' | 'col-resize' | 'crosshair'
  >('default');
  const [simulatedKeyboardAttached, setSimulatedKeyboardAttached] = React.useState<boolean>(true);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = React.useState<boolean>(false);

  // UX Writing Category Selector
  const [uxCategory, setUxCategory] = React.useState<
    'consequences' | 'pronouns' | 'punctuation' | 'casing'
  >('consequences');

  // Notification Workbench State
  const [notificationMode, setNotificationMode] = React.useState<
    'push-collapsed' | 'push-expanded' | 'sms-latin' | 'sms-nonlatin'
  >('push-collapsed');
  const [notificationsOptIn, setNotificationsOptIn] = React.useState<boolean>(true);

  // Alt Text Image Type Selector
  const [altType, setAltType] = React.useState<'photo' | 'chart' | 'motion' | 'decorative'>(
    'photo',
  );

  // Co-Design 13 Dimensions of Experience Interactive Filter
  const [selectedDimension, setSelectedDimension] = React.useState<string>('Disability');

  const dimensions = [
    {
      id: 'Age',
      label: 'Age',
      inquiry: 'Scale for youth through senior users with varied motor & visual capabilities.',
    },
    {
      id: 'Culture',
      label: 'Culture',
      inquiry: 'Evaluate cultural symbolism, color connotations, and language nuances.',
    },
    {
      id: 'Disability',
      label: 'Disability',
      inquiry: 'Verify screen reader, keyboard, switch-access, and high-contrast workflows.',
    },
    {
      id: 'Education',
      label: 'Education & Literacy',
      inquiry: 'Simplify instructional copy; support plain language and multi-modal cues.',
    },
    {
      id: 'Ethnicity',
      label: 'Ethnicity',
      inquiry: 'Ensure authentic representation and eliminate cultural stereotypes.',
    },
    {
      id: 'Gender',
      label: 'Gender',
      inquiry: 'Support diverse identity options and inclusive form data collection.',
    },
    {
      id: 'Geography',
      label: 'Geography',
      inquiry: 'Optimize for low-bandwidth connections, RTL languages, and localized formats.',
    },
    {
      id: 'Physical',
      label: 'Physical Attributes',
      inquiry: 'Accommodate one-handed use, varied grip styles, and varied hand sizes.',
    },
    {
      id: 'Race',
      label: 'Race',
      inquiry: 'Audit visual assets and automated algorithms for inclusive demographic parity.',
    },
    {
      id: 'Religion',
      label: 'Religion',
      inquiry: 'Respect calendar sensitivities, dietary standards, and religious observance days.',
    },
    {
      id: 'Orientation',
      label: 'Sexual Orientation',
      inquiry: 'Guarantee privacy safeguards and non-assumptive relationship structures.',
    },
    {
      id: 'Socioeconomic',
      label: 'Socioeconomic Status',
      inquiry: 'Ensure compatibility with legacy devices, low-cost hardware, and metered data.',
    },
    {
      id: 'TechProficiency',
      label: 'Technology Proficiency',
      inquiry: 'Provide unambiguous mental models, instant undo, and zero tech jargon.',
    },
  ];

  // Text Resizing Interactive Scaler: 1x (100%), 1.5x (150%), 2x (200%)
  const [textScale, setTextScale] = React.useState<1 | 1.5 | 2>(1);

  // Text Truncation Expansion State
  const [isTruncatedExpanded, setIsTruncatedExpanded] = React.useState<boolean>(false);
  const [showFixedChromeTooltip, setShowFixedChromeTooltip] = React.useState<boolean>(false);

  // Focus Return Engine states
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [focusRestored, setFocusRestored] = React.useState<boolean>(false);
  const triggerButtonRef = React.useRef<HTMLButtonElement>(null);
  const dialogConfirmRef = React.useRef<HTMLButtonElement>(null);

  // Roving Tabindex Toolbar states (1 Tab Stop + Arrow Keys)
  const [toolbarFocusedIndex, setToolbarFocusedIndex] = React.useState<number>(0);
  const toolbarItems = ['Bold', 'Italic', 'Underline', 'Code', 'BulletList'];
  const toolbarItemLabels = [
    'Format bold',
    'Format italic',
    'Format underline',
    'Format inline code',
    'Format bullet list',
  ];
  const toolbarRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  // Shortcut Remap & Single-Key Protection
  const [singleKeyEnabled, setSingleKeyEnabled] = React.useState<boolean>(false);

  // Live copy state
  const [copiedLabel, setCopiedLabel] = React.useState<string | null>(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setFocusRestored(false);
    setTimeout(() => {
      dialogConfirmRef.current?.focus();
    }, 50);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTimeout(() => {
      triggerButtonRef.current?.focus();
      setFocusRestored(true);
      setTimeout(() => setFocusRestored(false), 2400);
    }, 50);
  };

  const handleToolbarKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % toolbarItems.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + toolbarItems.length) % toolbarItems.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = toolbarItems.length - 1;
    }

    if (nextIndex !== index) {
      setToolbarFocusedIndex(nextIndex);
      toolbarRefs.current[nextIndex]?.focus();
    }
  };

  const handleCopyText = async (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedLabel(id);
        setTimeout(() => setCopiedLabel(null), 1800);
      }
    } catch {
      // Fallback
    }
  };

  const ACCESSIBLE_DOMAINS = [
    {
      id: 'layout',
      label: 'Layout & Structure',
      description: 'Viewport structure, responsive reflow, and adaptive grid mechanics',
      icon: AppWindow,
      tabs: [
        { id: 'layout' as const, label: 'Layout Scaffold' },
        { id: 'canonical' as const, label: 'Canonical Layouts' },
        { id: 'breakpoints' as const, label: 'Breakpoints & Vectors' },
        { id: 'density' as const, label: 'Grids & Density' },
        { id: 'resizing' as const, label: 'Resizing & Reflow' },
      ],
    },
    {
      id: 'accessibility',
      label: 'Accessibility & Nav',
      description: 'Landmarks, keyboard traversal, touch targets, and contrast ratios',
      icon: Accessibility,
      tabs: [
        { id: 'hierarchy' as const, label: 'Hierarchy & Landmarks' },
        { id: 'keyboard' as const, label: 'Keyboard & Focus' },
        { id: 'targets' as const, label: 'Target Sizes & Spacing' },
        { id: 'contrast' as const, label: 'Contrast & Clusters' },
      ],
    },
    {
      id: 'interactions',
      label: 'Interactions & Inputs',
      description: 'Micro-interaction states, multi-modal entry, and selection modes',
      icon: HandPointer,
      tabs: [
        { id: 'states' as const, label: 'Interaction States' },
        { id: 'inputs' as const, label: 'Multi-Modal Inputs' },
        { id: 'selection' as const, label: 'Selection Modes' },
      ],
    },
    {
      id: 'content',
      label: 'Content & Clarity',
      description: 'UX syntax, concise messaging, alt text formulas, and plain writing',
      icon: PenLine,
      tabs: [
        { id: 'ux-writing' as const, label: 'UX Writing & Syntax' },
        { id: 'alt-text' as const, label: 'Alt Text & Global Writing' },
        { id: 'notifications' as const, label: 'Notifications & SMS' },
        { id: 'inclusive' as const, label: 'Co-Design & Dimensions' },
      ],
    },
  ];

  const activeDomain =
    ACCESSIBLE_DOMAINS.find((domain) => domain.tabs.some((t) => t.id === activeTab)) ||
    ACCESSIBLE_DOMAINS[0];

  const handleDomainSelect = (domainId: string) => {
    const targetDomain = ACCESSIBLE_DOMAINS.find((d) => d.id === domainId);
    if (targetDomain) {
      const hasCurrent = targetDomain.tabs.some((t) => t.id === activeTab);
      if (!hasCurrent) {
        setActiveTab(targetDomain.tabs[0].id);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 2-TIER PSYCHOLOGICAL DOMAIN NAVIGATION (HICK'S & MILLER'S LAW) */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4 text-xs">
        {/* Tier 1: 4 Core Psychological Domains */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {ACCESSIBLE_DOMAINS.map((domain) => {
            const isDomainActive = activeDomain.id === domain.id;
            const DomainIcon = domain.icon;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => handleDomainSelect(domain.id)}
                className={cn(
                  'group flex cursor-pointer flex-col items-start gap-1.5 rounded-xl border p-3 text-left transition-all',
                  isDomainActive
                    ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                    : 'border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#0056FF]/40 hover:bg-[#EFF5FF]',
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={cn(
                      'flex size-7 items-center justify-center rounded-lg transition-colors',
                      isDomainActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EFF5FF] text-[#0056FF] group-hover:bg-[#0056FF] group-hover:text-white',
                    )}
                  >
                    <DomainIcon className="size-4" />
                  </div>
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold',
                      isDomainActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {domain.tabs.length} Topics
                  </span>
                </div>
                <div className="mt-0.5">
                  <div className="font-sans text-xs leading-tight font-bold">{domain.label}</div>
                  <div
                    className={cn(
                      'line-clamp-1 font-mono text-[10px]',
                      isDomainActive ? 'text-white/80' : 'text-slate-500',
                    )}
                  >
                    {domain.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tier 2: Focused Subtopic Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#CAD3F5] bg-white p-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 hidden font-mono text-[10px] font-bold text-slate-400 uppercase sm:inline-block">
              {activeDomain.label}:
            </span>
            {activeDomain.tabs.map((tab) => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'cursor-pointer rounded-lg px-3 py-1.5 font-sans text-xs font-bold transition-all',
                    isTabActive
                      ? 'bg-[#0056FF] text-white shadow-none'
                      : 'bg-transparent text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-1 font-mono text-[10px] font-bold text-[#0056FF] sm:flex">
            <span>
              Topic {activeDomain.tabs.findIndex((t) => t.id === activeTab) + 1} of{' '}
              {activeDomain.tabs.length}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ALT TEXT & GLOBAL WRITING (NEW COMPREHENSIVE MODULE)    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'alt-text' && (
        <div className="space-y-6">
          {/* Alt Text Formula & Type Selector */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Alt Text Architecture &amp; Character Boundary (&le; 140 Chars)
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Formula: [Essential Meaning] + [Key Takeaway / Action]. Omit &quot;image of&quot;
                  &amp; filename fluff.
                </div>
              </div>

              {/* Alt Type Filter */}
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
                {(['photo', 'chart', 'motion', 'decorative'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAltType(t)}
                    className={cn(
                      'rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase transition-all',
                      altType === t
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Comparison Based on Selected Alt Type */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* PASS CARD */}
              <div className="space-y-2 rounded-xl border-2 border-emerald-500/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [PASS] Compliant Alt Text
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    {altType === 'photo' && '56 Chars'}
                    {altType === 'chart' && '88 Chars'}
                    {altType === 'motion' && '68 Chars'}
                    {altType === 'decorative' && '0 Chars (Null)'}
                  </span>
                </div>

                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 font-mono text-xs text-slate-900">
                  {altType === 'photo' && 'A Scandinavian-style copper-handled cream watering can.'}
                  {altType === 'chart' &&
                    'Weekly step count was 55% higher vs last week, peaking at 4,106 additional steps.'}
                  {altType === 'motion' &&
                    'A tooltip labeled "star" appears when cursor hovers over star icon.'}
                  {altType === 'decorative' && 'alt=""'}
                </div>

                <div className="font-mono text-[10px] text-slate-500">
                  {altType === 'photo' &&
                    'Focuses on the core item without extraneous window sill details.'}
                  {altType === 'chart' &&
                    'Captures the key metric takeaway rather than copying raw data points.'}
                  {altType === 'motion' &&
                    'Summarizes the essential state change rather than cursor mechanics.'}
                  {altType === 'decorative' &&
                    'Null alt attribute hides purely decorative art from screen readers.'}
                </div>
              </div>

              {/* FAIL CARD */}
              <div className="space-y-2 rounded-xl border-2 border-red-400/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [FAIL] Anti-Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-red-600">
                    {altType === 'photo' && '152 Chars (Exceeds 140)'}
                    {altType === 'chart' && 'Raw Data Dump'}
                    {altType === 'motion' && 'Over-detailed'}
                    {altType === 'decorative' && 'Raw Filename'}
                  </span>
                </div>

                <div className="rounded-lg border border-red-200 bg-red-50/70 p-3 font-mono text-xs text-slate-900">
                  {altType === 'photo' &&
                    'Image of child hands pouring from copper handled cream colored watering can on window sill into a phoenix plant in grey pot beside a blue book on shelf.'}
                  {altType === 'chart' &&
                    'Step count: Mon=2000, Tue=4500, Wed=8000, Thu=3000, Fri=7000, Sat=9000, Sun=4000.'}
                  {altType === 'motion' &&
                    'A hand-shaped cursor lands on a star-shaped icon and then a tooltip labeled "star" appears below.'}
                  {altType === 'decorative' && 'alt="jpg-0223939-330.png"'}
                </div>

                <div className="font-mono text-[10px] text-red-700">
                  {altType === 'photo' &&
                    'Violates 140 character limit and prefixes with redundant "Image of".'}
                  {altType === 'chart' &&
                    'Screen reader users must listen to dozens of raw numbers without context.'}
                  {altType === 'motion' &&
                    'Describes cursor mechanics rather than the resulting functional state.'}
                  {altType === 'decorative' &&
                    'Exposes internal filename garbage to assistive tech users.'}
                </div>
              </div>
            </div>
          </div>

          {/* Global Writing & Localization Rules Matrix */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                8 Global Writing &amp; Plain Language Rules
              </span>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                1.5x Translation Buffer
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">1. Global Examples</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Use universal terms over country-specific references or regional holidays.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">2. Short Sentences</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Keep copy concise. Translated text averages 1.5&times; longer than English.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">3. Zero Abbreviations</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Spell out acronyms and shorten words to avoid translator confusion.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">4. Noun Repetition</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Repeat nouns rather than ambiguous pronouns (&quot;it&quot;) to aid gendered
                  languages.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">5. Pair &quot;This / That&quot;</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Always pair with the noun (&quot;this document&quot;), never stand alone.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">6. Zero Polite Filler</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Drop &quot;Please / Sorry / Thank you&quot; in error states for direct clarity.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">7. Plain Language</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Eliminate technical jargon. Use literal descriptions for critical actions.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">8. Disambiguate Words</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Avoid dual-meaning words (e.g. &quot;filter&quot;, &quot;traffic&quot;,
                  &quot;home&quot;) without context.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: UX WRITING & SYNTAX (CONSEQUENCES, PRONOUNS, PUNCTUATION) */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ux-writing' && (
        <div className="space-y-6">
          {/* Interactive Category Selector & Comparison Engine */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  UX Writing &amp; Grammatical Standards
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Sentence case &middot; Second person perspective &middot; Consequence clarity
                  &middot; Strict punctuation economy
                </div>
              </div>

              {/* Category Filter */}
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
                {(
                  [
                    { id: 'consequences', label: 'Consequences & Undo' },
                    { id: 'pronouns', label: 'Pronouns & Voice' },
                    { id: 'punctuation', label: 'Punctuation & Syntax' },
                    { id: 'casing', label: 'Sentence Case' },
                  ] as const
                ).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setUxCategory(c.id)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all',
                      uxCategory === c.id
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Comparison: Compliant vs Anti-Pattern */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* PASS CARD */}
              <div className="space-y-3 rounded-xl border-2 border-emerald-500/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [PASS] Compliant Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    {uxCategory === 'consequences' && 'Neutral + 30-Day Recovery'}
                    {uxCategory === 'pronouns' && 'Second Person ("You / Your")'}
                    {uxCategory === 'punctuation' && 'Oxford Comma · En Dash · No Period'}
                    {uxCategory === 'casing' && 'Pure Sentence Case'}
                  </span>
                </div>

                {/* Simulated UI Snippet */}
                <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  {uxCategory === 'consequences' && (
                    <div className="space-y-2">
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        Archive course section?
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-slate-700">
                        Enrolled students will lose access to course materials. You can restore this
                        course section within 30 days from Settings.
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          className="rounded-md bg-[#0056FF] px-2.5 py-1 font-mono text-[10px] font-bold text-white hover:bg-[#2277FF]"
                        >
                          Archive course
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-[#CAD3F5] bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-[#0A1A4A] hover:bg-[#EFF5FF]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'pronouns' && (
                    <div className="space-y-2">
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        Your timetable is updated
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-slate-700">
                        Check your exam room assignment before Monday.
                      </div>
                      <div className="pt-1">
                        <button
                          type="button"
                          className="rounded-md bg-[#0056FF] px-2.5 py-1 font-mono text-[10px] font-bold text-white hover:bg-[#2277FF]"
                        >
                          View your timetable
                        </button>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'punctuation' && (
                    <div className="space-y-2 font-mono text-[11px] text-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-slate-500">Form label (no period):</span>
                        <span className="font-bold text-[#0A1A4A]">
                          Student identification number
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-slate-500">Range (En dash):</span>
                        <span className="font-bold text-[#0056FF]">Office hours: 9 AM–Noon</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-slate-500">Verb (unhyphenated):</span>
                        <span className="font-bold text-emerald-700">
                          Please check in before entering
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-slate-500">Oxford serial comma:</span>
                        <span className="font-bold text-slate-900">Math, science, and history</span>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'casing' && (
                    <div className="space-y-2 font-mono text-[11px] text-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-slate-500">Navigation:</span>
                        <span className="font-bold text-[#0A1A4A]">Course registration</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                        <span className="text-slate-500">Button:</span>
                        <span className="font-bold text-[#0056FF]">Download grade report</span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-slate-500">Table header:</span>
                        <span className="font-bold text-slate-900">
                          Enrollment verification status
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-mono text-[10px] text-slate-600">
                  {uxCategory === 'consequences' &&
                    'Communicates operational results neutrally; provides clear 30-day undo path without intimidating the user.'}
                  {uxCategory === 'pronouns' &&
                    'Speaks strictly from the user viewpoint using "you/your"; eliminates mixed "my/your" confusion.'}
                  {uxCategory === 'punctuation' &&
                    'Omits periods on single-line strings, enforces Oxford comma, uses En dash without spaces for ranges.'}
                  {uxCategory === 'casing' &&
                    'Sentence case maximizes human skimming speed and guarantees clean screen reader prosody.'}
                </div>
              </div>

              {/* FAIL CARD */}
              <div className="space-y-3 rounded-xl border-2 border-red-400/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [FAIL] Anti-Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-red-600">
                    {uxCategory === 'consequences' && 'Intimidation & Zero Recovery'}
                    {uxCategory === 'pronouns' && 'Mixed "My" & Corporate "We"'}
                    {uxCategory === 'punctuation' && 'Terminal Periods & Hyphenated Verbs'}
                    {uxCategory === 'casing' && 'Title Case & All-Caps Blocks'}
                  </span>
                </div>

                {/* Simulated Broken UI Snippet */}
                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50/50 p-3">
                  {uxCategory === 'consequences' && (
                    <div className="space-y-2">
                      <div className="font-sans text-xs font-bold text-red-900">
                        WARNING: DANGER! ARE YOU SURE?!
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-red-800">
                        If you delete this course section now, you will LOSE EVERYTHING and students
                        will be furious! Think carefully!
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          className="rounded-md border border-red-300 bg-red-100 px-2.5 py-1 font-mono text-[10px] font-bold text-red-800"
                        >
                          YES, DELETE IT ALL
                        </button>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'pronouns' && (
                    <div className="space-y-2">
                      <div className="font-sans text-xs font-bold text-red-900">
                        We are happy to serve you!
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-red-800">
                        We have updated our portal so you can view my personal student timetable
                        now.
                      </div>
                      <div className="pt-1">
                        <button
                          type="button"
                          className="rounded-md border border-red-300 bg-red-100 px-2.5 py-1 font-mono text-[10px] font-bold text-red-800"
                        >
                          My schedule
                        </button>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'punctuation' && (
                    <div className="space-y-2 font-mono text-[11px] text-red-800">
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-1">
                        <span className="text-red-600">Form label (unnecessary period):</span>
                        <span className="font-bold text-red-900">
                          Student identification number.
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-1">
                        <span className="text-red-600">Range (spaced hyphen):</span>
                        <span className="font-bold text-red-900">Office hours: 9 AM - Noon</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-1">
                        <span className="text-red-600">Verb (incorrectly hyphenated):</span>
                        <span className="font-bold text-red-900">
                          Please check-in before entering
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-red-600">Missing serial comma:</span>
                        <span className="font-bold text-red-900">Math, science and history</span>
                      </div>
                    </div>
                  )}

                  {uxCategory === 'casing' && (
                    <div className="space-y-2 font-mono text-[11px] text-red-800">
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-1">
                        <span className="text-red-600">Navigation (Title Case):</span>
                        <span className="font-bold text-red-900">Course Registration</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-1">
                        <span className="text-red-600">Button (All-Caps Block):</span>
                        <span className="font-bold text-red-900">DOWNLOAD GRADE REPORT</span>
                      </div>
                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-red-600">Table header (Title Case):</span>
                        <span className="font-bold text-red-900">
                          Enrollment Verification Status
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-mono text-[10px] text-red-700">
                  {uxCategory === 'consequences' &&
                    'Uses intimidation, emotional manipulation, shouting exclamation marks, and omits recovery instructions.'}
                  {uxCategory === 'pronouns' &&
                    'Corporate "We" feels artificial; mixes "my" and "our/you" on the same screen causing cognitive friction.'}
                  {uxCategory === 'punctuation' &&
                    'Clutters scanning with redundant periods, omits Oxford comma, and incorrectly hyphenates verb phrases.'}
                  {uxCategory === 'casing' &&
                    'Title Case and All-Caps blocks degrade readability and cause screen readers to spell out letters.'}
                </div>
              </div>
            </div>
          </div>

          {/* 10 Pillars of Enterprise UX Writing & Syntax Matrix */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                10 Pillars of Enterprise UX Writing &amp; Syntax
              </span>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                Material 3 &middot; AP Style
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">1. Consequence Clarity</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Explain functional results neutrally; provide clear undo recovery paths.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">2. Second Person (&quot;You&quot;)</div>
                <div className="font-sans text-[10px] text-slate-600">
                  User perspective; never mix &quot;My&quot; and &quot;Your&quot; in the same view.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">3. Sentence Case</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Capitalize first word only; strictly zero Title Case or all-caps blocks.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">4. Skip Periods</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Omit terminal periods on labels, tooltips, dialogs, and single-line strings.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">5. Contractions</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Use &quot;don&apos;t&quot;, &quot;can&apos;t&quot;, &quot;it&apos;s&quot; to
                  prevent stiff or robotic phrasing.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">6. Oxford Serial Comma</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Always use the serial comma before conjunctions in lists of 3+ items.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">7. En Dash &amp; Hyphens</div>
                <div className="font-sans text-[10px] text-slate-600">
                  En dash (–) without spaces for ranges; hyphenate nouns/adjectives, never verbs.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">8. Spelled-Out Words</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Ban Latin abbreviations (e.g., etc.); write out &quot;for example&quot; and
                  &quot;and more&quot;.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">9. Number Formatting</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Commas for 1,000–1,000,000; &quot;M&quot; for volume; no commas in years or ports.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">10. Punctuation Economy</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Exclamations for celebrations only; ellipses for async progress only.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: NOTIFICATIONS & SMS (PRECISION LIMITS & ZERO CLUTTER)    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {/* Notification Format Simulator & Character Gauge */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Notification Architecture &amp; Character Gauges
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Precision boundaries: Title &lt; 29c &middot; Collapsed &lt; 40c &middot; Expanded
                  &lt; 80c &middot; SMS Latin &lt; 160c / Non-Latin &lt; 134c
                </div>
              </div>

              {/* Mode Filter */}
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
                {(
                  [
                    { id: 'push-collapsed', label: 'Push Collapsed' },
                    { id: 'push-expanded', label: 'Push Expanded' },
                    { id: 'sms-latin', label: 'SMS Latin' },
                    { id: 'sms-nonlatin', label: 'SMS Non-Latin' },
                  ] as const
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setNotificationMode(m.id)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all',
                      notificationMode === m.id
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Comparison: Compliant vs Anti-Pattern */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* PASS CARD */}
              <div className="space-y-3 rounded-xl border-2 border-emerald-500/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [PASS] Compliant Payload
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700">
                    {notificationMode === 'push-collapsed' && 'Title: 24/29c · Body: 32/40c'}
                    {notificationMode === 'push-expanded' && 'Title: 22/29c · Body: 63/80c'}
                    {notificationMode === 'sms-latin' && 'Body: 104/160c (1 SMS)'}
                    {notificationMode === 'sms-nonlatin' && 'Body: 78/134c (1 SMS)'}
                  </span>
                </div>

                {/* Simulated Device UI */}
                <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5 font-mono text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 font-bold text-[#0056FF]">
                      <Bell className="size-3" />
                      SNP Portal &middot; OS Header
                    </span>
                    <span>Tuesday, 09:30</span>
                  </div>

                  {notificationMode.startsWith('push') ? (
                    <div className="space-y-1.5">
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        {notificationMode === 'push-collapsed'
                          ? 'Tuition Fee Due Tuesday'
                          : 'Grade Report Published'}
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-slate-700">
                        {notificationMode === 'push-collapsed'
                          ? 'Invoice #8920 requires payment.'
                          : 'Semester 1 grade report published for review on Tuesday, Nov 4.'}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          className="rounded-md bg-[#0056FF] px-2.5 py-1 font-mono text-[10px] font-bold text-white hover:bg-[#2277FF]"
                        >
                          {notificationMode === 'push-collapsed' ? 'Pay Now' : 'Review'}
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-[#CAD3F5] bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-[#0A1A4A] hover:bg-[#EFF5FF]"
                        >
                          {notificationMode === 'push-collapsed' ? 'Details' : 'Download'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="rounded border border-[#CAD3F5] bg-white p-2.5 font-mono text-[11px] leading-relaxed text-slate-800">
                        {notificationMode === 'sms-latin'
                          ? 'SNP Alert: Term exam schedule published for Monday, Nov 10. Login to portal to verify room assignment.'
                          : 'ការជូនដំណឹងពី SNP៖ កាលវិភាគប្រឡងថ្ងៃចន្ទ ទី១០ វិច្ឆិកា។ សូមពិនិត្យក្នុងប្រព័ន្ធ។'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-mono text-[10px] text-slate-600">
                  {notificationMode === 'push-collapsed' &&
                    'Front-loaded title, zero app name repetition, day-specific Tuesday, 1-word CTAs.'}
                  {notificationMode === 'push-expanded' &&
                    'Expanded body reveals context without jokes, emojis, or relative today/tomorrow words.'}
                  {notificationMode === 'sms-latin' &&
                    'Within 160 char limit to guarantee 1 single segment, zero raw links, urgent only.'}
                  {notificationMode === 'sms-nonlatin' &&
                    'Within 134 char non-Latin UCS-2 limit, prevents multi-part carrier cost spikes.'}
                </div>
              </div>

              {/* FAIL CARD */}
              <div className="space-y-3 rounded-xl border-2 border-red-400/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [FAIL] Anti-Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-red-600">
                    {notificationMode === 'push-collapsed' && 'Title: 58/29c (Truncated)'}
                    {notificationMode === 'push-expanded' && 'Delight/Emoji/Relative'}
                    {notificationMode === 'sms-latin' && '187/160c (2 SMS Billing)'}
                    {notificationMode === 'sms-nonlatin' && '152/134c (2 SMS Billing)'}
                  </span>
                </div>

                {/* Simulated Broken Device UI */}
                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50/50 p-3">
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5 font-mono text-[10px] text-red-700">
                    <span className="flex items-center gap-1 font-bold">
                      <BellOff className="size-3" />
                      SNP Portal &middot; OS Header
                    </span>
                    <span>Today, 14:02</span>
                  </div>

                  {notificationMode.startsWith('push') ? (
                    <div className="space-y-1.5">
                      <div className="truncate font-sans text-xs font-bold text-red-900">
                        {notificationMode === 'push-collapsed'
                          ? 'SNP Portal: Good afternoon, your student invoice #8920...'
                          : 'Good job student! Grades are ready!'}
                      </div>
                      <div className="font-mono text-[11px] leading-relaxed text-red-800">
                        {notificationMode === 'push-collapsed'
                          ? 'Please remember to pay your bill today or tonight to avoid penalties.'
                          : 'Hey! Check it out today please! Good luck! Click here to see what you got.'}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          className="rounded-md border border-red-300 bg-red-100 px-2.5 py-1 font-mono text-[10px] font-bold text-red-800"
                        >
                          Click Here To Proceed
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="rounded border border-red-200 bg-white p-2.5 font-mono text-[11px] leading-relaxed text-red-900">
                        {notificationMode === 'sms-latin'
                          ? 'Hey students! Exams start tomorrow! Go to https://portal.snp.edu.kh/students/dashboard/exams/2026/s1/timetable and email info@snp.edu.kh with any questions!'
                          : 'សូមជម្រាបសួរនិស្សិតទាំងអស់គ្នា! ការប្រឡងនឹងចាប់ផ្តើមនៅថ្ងៃស្អែកនេះ។ សូមចូលទៅកាន់តំណភ្ជាប់ https://portal.snp.edu.kh/exams ដើម្បីមើលព័ត៌មានលម្អិត។'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="font-mono text-[10px] text-red-700">
                  {notificationMode === 'push-collapsed' &&
                    'Repeats app name in title, uses dynamic greeting, relative "today", verbose 4-word button.'}
                  {notificationMode === 'push-expanded' &&
                    'Excessive delight, polite filler ("please"), ambiguous pronoun ("it"), relative "today".'}
                  {notificationMode === 'sms-latin' &&
                    'Exceeds 160 characters with long raw URL, triggers double SMS billing, uses relative "tomorrow".'}
                  {notificationMode === 'sms-nonlatin' &&
                    'Exceeds 134 character UCS-2 barrier, splitting message into 2 chargeable segments.'}
                </div>
              </div>
            </div>

            {/* In-Situ Contextual Opt-Out Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
              <div className="flex items-center gap-2">
                <BellRing className="size-4 text-[#0056FF]" />
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                    Contextual In-Situ Opt-Out Control
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    Transparent trade-off: Muting halts timetable alerts on this device while
                    preserving critical security dispatches.
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0A1A4A]">
                  {notificationsOptIn ? 'Notifications: ACTIVE' : 'Notifications: MUTED'}
                </span>
                <button
                  type="button"
                  onClick={() => setNotificationsOptIn(!notificationsOptIn)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    notificationsOptIn ? 'bg-[#0056FF]' : 'bg-slate-300',
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-none ring-0 transition duration-200 ease-in-out',
                      notificationsOptIn ? 'translate-x-5' : 'translate-x-0',
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 8 Rules of Notification & SMS Architecture Matrix */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                8 Notification &amp; SMS Invariants
              </span>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                Material 3 &middot; Zero Clutter
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">1. Front-Load Info</div>
                <div className="font-sans text-[10px] text-slate-600">
                  F-shape scanning; place the most critical information in the first 3 words.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">2. Character Limits</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Title &lt; 29c, Collapsed body &lt; 40c, Expanded body &lt; 80c, Buttons 1–2
                  words.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">3. SMS Ceilings</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Latin &lt; 160c, Non-Latin &lt; 134c to eliminate multi-segment carrier
                  surcharges.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">4. Day-Specific Timing</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Specify weekday (&quot;Tuesday&quot;), never &quot;today/tomorrow&quot; (20% read
                  latency).
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">5. Zero Dynamic Titles</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Place variables in body only; headline truncation will never expand in OS shades.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">6. 1–2 Word Action CTAs</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Direct imperative verbs (Review, Pay, Confirm); never bury user action steps.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">7. Zero Product Duplication</div>
                <div className="font-sans text-[10px] text-slate-600">
                  OS header already displays app name and logo; dedicate title space to user value.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">8. Zero Clutter &amp; Ads</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Zero emoji clutter, zero jokes, zero unsolicited ads, never interrupt active
                  onboarding.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: MULTI-MODAL INPUTS (MOUSE, TRACKPAD, KEYBOARD, STYLUS)   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'inputs' && (
        <div className="space-y-6">
          {/* Interactive Multi-Modal Device & Cursor Simulator */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Multi-Modal Input Architecture &amp; Cursor Semantics
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Mouse &middot; Trackpad &middot; Physical Keyboard &middot; Stylus &middot; Touch
                  Across All Screen Sizes
                </div>
              </div>

              {/* Input Device Switcher */}
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
                {(
                  [
                    { id: 'mouse', label: 'Mouse' },
                    { id: 'trackpad', label: 'Trackpad' },
                    { id: 'keyboard', label: 'Keyboard' },
                    { id: 'stylus', label: 'Stylus' },
                  ] as const
                ).map((dev) => (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => setSelectedInputDevice(dev.id)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all',
                      selectedInputDevice === dev.id
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                    )}
                  >
                    {dev.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive Input Playground */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* INTERACTIVE WORKBENCH PANEL */}
              <div className="space-y-3 rounded-xl border-2 border-emerald-500/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [PASS] Multi-Modal Interaction
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">
                    Device: {selectedInputDevice}
                  </span>
                </div>

                {/* Device-Specific Visual Interaction Area */}
                {selectedInputDevice === 'mouse' && (
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] text-slate-700">
                      Cursor Morphology &amp; Secondary Click (Right-Click Context Menu):
                    </div>

                    <div
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setSecondaryMenuOpen(true);
                      }}
                      className="relative cursor-context-menu rounded-lg border-2 border-dashed border-[#CAD3F5] bg-[#F8FAFC] p-4 text-center"
                    >
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        Right-Click / Secondary Click this Box
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">
                        Activates contextual actions without requiring touch long-press
                      </div>

                      {secondaryMenuOpen && (
                        <div className="absolute top-8 left-1/2 z-20 w-44 -translate-x-1/2 rounded-lg border border-[#CAD3F5] bg-white p-1 text-left font-mono text-xs shadow-lg">
                          <button
                            type="button"
                            onClick={() => setSecondaryMenuOpen(false)}
                            className="w-full rounded px-2 py-1.5 text-left text-[#0A1A4A] hover:bg-[#EFF5FF]"
                          >
                            Copy text
                          </button>
                          <button
                            type="button"
                            onClick={() => setSecondaryMenuOpen(false)}
                            className="w-full rounded px-2 py-1.5 text-left text-[#0A1A4A] hover:bg-[#EFF5FF]"
                          >
                            Inspect details
                          </button>
                          <button
                            type="button"
                            onClick={() => setSecondaryMenuOpen(false)}
                            className="w-full rounded px-2 py-1.5 text-left text-red-600 hover:bg-red-50"
                          >
                            Close menu
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Cursor Selector Badges */}
                    <div className="space-y-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                        Test Cursor Semantics (Hover Cards Below):
                      </span>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10px] sm:grid-cols-4">
                        <div className="cursor-default rounded border border-[#CAD3F5] bg-white p-2 text-center hover:bg-[#EFF5FF]">
                          default (Arrow)
                        </div>
                        <div className="cursor-pointer rounded border border-[#CAD3F5] bg-white p-2 text-center font-bold text-[#0056FF] hover:bg-[#EFF5FF]">
                          pointer (Hand)
                        </div>
                        <div className="cursor-text rounded border border-[#CAD3F5] bg-white p-2 text-center hover:bg-[#EFF5FF]">
                          text (I-Beam)
                        </div>
                        <div className="cursor-col-resize rounded border border-[#CAD3F5] bg-white p-2 text-center hover:bg-[#EFF5FF]">
                          col-resize (&harr;)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInputDevice === 'trackpad' && (
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] text-slate-700">
                      Two-Finger Gestures &amp; Directional Scrolling:
                    </div>

                    <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-3 font-mono text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 text-[11px]">
                        <span className="font-bold text-[#0056FF]">Vertical List Scroll:</span>
                        <span className="text-slate-600">2-finger vertical drag</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 text-[11px]">
                        <span className="font-bold text-[#0056FF]">Horizontal Carousel:</span>
                        <span className="text-slate-600">2-finger horizontal drag</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 text-[11px]">
                        <span className="font-bold text-[#0056FF]">Pinch to Zoom:</span>
                        <span className="text-slate-600">Smooth page/element scaling</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#0056FF]">Context Menu:</span>
                        <span className="text-slate-600">2-finger tap</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInputDevice === 'keyboard' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-[11px] text-slate-700">
                      <span>Physical Keyboard Detection &amp; Virtual Suppression:</span>
                      <button
                        type="button"
                        onClick={() => setSimulatedKeyboardAttached(!simulatedKeyboardAttached)}
                        className="rounded bg-[#0056FF] px-2 py-0.5 text-[10px] font-bold text-white"
                      >
                        {simulatedKeyboardAttached
                          ? 'Attached (Connected)'
                          : 'Disconnected (Touch Only)'}
                      </button>
                    </div>

                    <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-slate-600">Virtual On-Screen Keyboard:</span>
                        <span
                          className={cn(
                            'rounded px-2 py-0.5 text-[10px] font-bold',
                            simulatedKeyboardAttached
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800',
                          )}
                        >
                          {simulatedKeyboardAttached
                            ? 'SUPPRESSED (Hidden)'
                            : 'ACTIVE (Visible for Touch)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px]">
                        <div className="rounded border border-[#CAD3F5] bg-white p-2">
                          <span className="font-bold text-[#0056FF]">Enter:</span> Submit / Send
                        </div>
                        <div className="rounded border border-[#CAD3F5] bg-white p-2">
                          <span className="font-bold text-[#0056FF]">Space:</span> Pause / Toggle
                        </div>
                        <div className="rounded border border-[#CAD3F5] bg-white p-2">
                          <span className="font-bold text-[#0056FF]">Tab:</span> Logical Ring Focus
                        </div>
                        <div className="rounded border border-[#CAD3F5] bg-white p-2">
                          <span className="font-bold text-[#0056FF]">Escape:</span> Dismiss / Reset
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInputDevice === 'stylus' && (
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] text-slate-700">
                      Precision Stylus &amp; Tool Circle Marker:
                    </div>

                    <div className="space-y-2 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-4 text-center">
                      <div className="inline-flex size-10 items-center justify-center rounded-full border-2 border-[#0056FF] bg-blue-50 font-mono text-[10px] font-bold text-[#0056FF]">
                        8px
                      </div>
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        Stylus Tool Circle Indicator
                      </div>
                      <div className="font-mono text-[10px] text-slate-500">
                        Shows tool size and shape without cursor arrow clutter; tap displays
                        identical feedback to touch.
                      </div>
                    </div>
                  </div>
                )}

                <div className="font-mono text-[10px] text-slate-600">
                  Separates mouse clicks from touch events, maintains dedicated text selection
                  without touch handles, and respects standard OS gestures.
                </div>
              </div>

              {/* ANTI-PATTERN COMPARISON PANEL */}
              <div className="space-y-3 rounded-xl border-2 border-red-400/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [FAIL] Input Anti-Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-red-600">
                    Broken Conventions
                  </span>
                </div>

                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50/50 p-3 font-mono text-[11px] text-red-800">
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Touch Assumption:</span>
                    <span className="font-bold text-red-900">
                      Touch handles displayed for mouse cursor
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Virtual Keyboard:</span>
                    <span className="font-bold text-red-900">
                      Covers 50% screen with physical keyboard attached
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Secondary Click:</span>
                    <span className="font-bold text-red-900">
                      Right-click ignored; forces 800ms long-press
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Drag Gesture:</span>
                    <span className="font-bold text-red-900">
                      Dragging mouse scrolls instead of highlighting text
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-red-600">Escape Key:</span>
                    <span className="font-bold text-red-900">
                      Wipes all typed text instead of closing dialog
                    </span>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-red-700">
                  Treating physical inputs as crude touch events frustrates desktop, laptop, and
                  tablet users with unexpected behaviors.
                </div>
              </div>
            </div>
          </div>

          {/* 8 Rules of Multi-Modal Inputs Matrix */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                8 Multi-Modal Input Invariants
              </span>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                Material 3 &middot; Platform Parity
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">1. Universal Support</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Treat mouse, trackpad, keyboard, stylus, and touch as equal first-class inputs.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">2. Visible Cursor</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Always render a visible mouse cursor whenever an external pointer is connected.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">3. Secondary Click</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Right-click or 2-finger trackpad tap must activate contextual actions immediately.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">4. Text Selection Hierarchy</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Single click positions cursor; double click selects word; triple click selects
                  paragraph.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">5. Drag Disambiguation</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Mouse drag in text highlights words; touch drag in text scrolls viewport.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">6. Keyboard Suppression</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Auto-hide virtual keyboard when physical keyboard is attached; restore when
                  removed.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">7. Standard Key Hooks</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Enter submits; Space toggles/pauses; Tab traverses logical order with 2px ring.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">8. Escape Key Cleanliness</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Escape dismisses modals, menus, and sheets; clears focus without deleting typed
                  text.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}

      {/* ------------------------------------------------------------- */}
      {/* TAB: MATERIAL 3 LAYOUT SCAFFOLD & ADAPTIVE ARCHITECTURE        */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          {/* Interactive Layout Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Layout Scaffold &amp; Adaptive Breakpoint Architecture
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Scaffold Anatomy &middot; 5 Breakpoints &middot; 3 Experience Types &middot; 1–3
                  Panes &middot; Rulers &middot; RTL Mirroring
                </div>
              </div>

              {/* Quick Preset Info */}
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                  {layoutBreakpoint.toUpperCase()} &middot; {layoutDeviceMode.toUpperCase()}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                  {layoutRtl ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}
                </span>
              </div>
            </div>

            {/* Controls Row 1: Breakpoints & Device Modes */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs md:grid-cols-2">
              {/* Breakpoint Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Breakpoints (Window Size Classes)
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { id: 'compact', label: 'Compact', dp: '<600dp' },
                      { id: 'medium', label: 'Medium', dp: '600–839dp' },
                      { id: 'expanded', label: 'Expanded', dp: '840–1199dp' },
                      { id: 'large', label: 'Large', dp: '1200–1599dp' },
                      { id: 'extra-large', label: 'Extra-Large', dp: '≥1600dp' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setLayoutBreakpoint(b.id);
                        if (b.id === 'compact') {
                          setLayoutPaneCount(1);
                        } else if (b.id === 'medium' || b.id === 'expanded') {
                          setLayoutPaneCount(2);
                        } else {
                          setLayoutPaneCount(3);
                        }
                      }}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-left font-sans text-xs transition-all',
                        layoutBreakpoint === b.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{b.label}</span>
                      <span className="ml-1 font-mono text-[10px] opacity-70">({b.dp})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Type Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Experience Environments
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { id: 'mobile', label: 'Mobile', desc: 'Full-Screen & Split' },
                      { id: 'desktop', label: 'Desktop', desc: 'Free-Form Multi-Window' },
                      { id: 'spatial', label: 'Spatial XR', desc: '3D Space & Orbiters' },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setLayoutDeviceMode(m.id)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-left font-sans text-xs transition-all',
                        layoutDeviceMode === m.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{m.label}</span>
                      <span className="ml-1 hidden text-[10px] opacity-70 sm:inline">
                        &middot; {m.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls Row 2: Scaffold Options & Adaptive Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
              {/* Panes Configuration */}
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-[#0A1A4A]">Panes:</span>
                {([1, 2, 3] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setLayoutPaneCount(count)}
                    className={cn(
                      'rounded-md px-2 py-0.5 font-mono text-xs font-bold transition-all',
                      layoutPaneCount === count
                        ? 'bg-[#0056FF] text-white'
                        : 'border border-[#CAD3F5] bg-slate-50 text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    {count} {count === 1 ? 'Pane' : 'Panes'}
                  </button>
                ))}
              </div>

              {/* Adaptive Strategy */}
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-[#0A1A4A]">Strategy:</span>
                {(
                  [
                    { id: 'show-hide', label: 'Show/Hide' },
                    { id: 'levitate', label: 'Levitate' },
                    { id: 'reflow', label: 'Reflow' },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setLayoutStrategy(s.id)}
                    className={cn(
                      'rounded-md px-2 py-0.5 font-sans text-xs transition-all',
                      layoutStrategy === s.id
                        ? 'bg-[#0056FF] font-bold text-white'
                        : 'border border-[#CAD3F5] bg-slate-50 text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Toggles: RTL, Rulers, Safety Regions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutRtl(!layoutRtl)}
                  className={cn(
                    'rounded-md px-2 py-0.5 font-sans text-xs transition-all',
                    layoutRtl
                      ? 'border border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  RTL: {layoutRtl ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutShowRulers(!layoutShowRulers)}
                  className={cn(
                    'rounded-md px-2 py-0.5 font-sans text-xs transition-all',
                    layoutShowRulers
                      ? 'border border-cyan-500 bg-cyan-50 font-bold text-cyan-800'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  Rulers: {layoutShowRulers ? 'ON' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutShowSafetyRegion(!layoutShowSafetyRegion)}
                  className={cn(
                    'rounded-md px-2 py-0.5 font-sans text-xs transition-all',
                    layoutShowSafetyRegion
                      ? 'border border-amber-500 bg-amber-50 font-bold text-amber-800'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  Safety Region: {layoutShowSafetyRegion ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Visual Canvas Simulator */}
            <div
              className={cn(
                'relative w-full overflow-hidden rounded-2xl transition-all duration-300',
                layoutDeviceMode === 'spatial'
                  ? 'border border-cyan-500/40 bg-[#0B0F19] p-6 text-white'
                  : layoutDeviceMode === 'mobile'
                    ? 'border border-slate-300 bg-slate-100 p-4'
                    : 'border border-[#CAD3F5] bg-[#F8FAFC] p-4',
              )}
            >
              {/* Spatial XR Detached Floating Orbiter Rail */}
              {layoutDeviceMode === 'spatial' && (
                <div
                  className={cn(
                    'absolute top-8 z-30 flex items-center gap-3 rounded-full border border-cyan-500/50 bg-[#1E293B]/90 px-4 py-2 text-xs shadow-2xl backdrop-blur-md',
                    layoutRtl ? 'right-8' : 'left-8',
                  )}
                >
                  <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                    XR Floating Orbiter
                  </span>
                  <div className="h-4 w-px bg-cyan-500/40" />
                  <div className="flex items-center gap-2 font-sans text-xs text-cyan-100">
                    <span className="cursor-pointer font-bold hover:text-cyan-300">Campus</span>
                    <span className="cursor-pointer hover:text-cyan-300">Courses</span>
                    <span className="cursor-pointer hover:text-cyan-300">Gradebook</span>
                    <span className="cursor-pointer hover:text-cyan-300">Spatial Labs</span>
                  </div>
                </div>
              )}

              {/* Rulers Overlay */}
              {layoutShowRulers && (
                <div className="pointer-events-none absolute inset-0 z-40">
                  <div className="absolute top-0 bottom-0 left-4 w-px border-l border-dashed border-cyan-500/60" />
                  <div className="absolute top-0 right-4 bottom-0 w-px border-r border-dashed border-cyan-500/60" />
                  <div className="absolute top-12 right-0 left-0 h-px border-t border-dashed border-cyan-500/60" />
                  <div className="absolute right-0 bottom-12 left-0 h-px border-b border-dashed border-cyan-500/60" />
                  <div className="absolute top-2 right-2 rounded bg-cyan-900/90 px-2 py-0.5 font-mono text-[9px] text-cyan-200">
                    RULERS ACTIVE &middot; 16dp Margin &middot; 8dp Grid
                  </div>
                </div>
              )}

              {/* Chassis Window Container */}
              <div
                dir={layoutRtl ? 'rtl' : 'ltr'}
                className={cn(
                  'mx-auto overflow-hidden transition-all duration-300',
                  layoutDeviceMode === 'mobile'
                    ? 'max-w-sm rounded-[32px] border-4 border-slate-800 bg-white shadow-2xl'
                    : layoutDeviceMode === 'spatial'
                      ? 'max-w-4xl rounded-2xl border border-cyan-400/40 bg-[#0F172A]/95 shadow-2xl backdrop-blur-xl'
                      : 'w-full rounded-xl border border-slate-300 bg-white shadow-sm',
                )}
              >
                {/* Desktop Window Titlebar */}
                {layoutDeviceMode === 'desktop' && (
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      <span className="ml-2 font-mono text-[10px] text-slate-500">
                        SNPI Scaffold &middot; Multi-Window Mode
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
                      <span>{layoutBreakpoint.toUpperCase()}</span>
                      <span>1920&times;1080</span>
                    </div>
                  </div>
                )}

                {/* Mobile Status Bar */}
                {layoutDeviceMode === 'mobile' && (
                  <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-2 font-mono text-[10px] text-slate-700">
                    <span className="font-bold">09:41</span>
                    <div className="h-3 w-16 rounded-full bg-slate-800" />
                    <span>5G &middot; 100%</span>
                  </div>
                )}

                {/* Safety Region Top Band */}
                {layoutShowSafetyRegion && (
                  <div className="border-b border-amber-300 bg-amber-100/80 px-3 py-0.5 text-center font-mono text-[9px] font-bold text-amber-900">
                    SYSTEM SAFETY REGION &middot; Status Bar / Notch Inset (24dp)
                  </div>
                )}

                {/* Material 3 App Bar (Top Bar) */}
                <header
                  className={cn(
                    'flex items-center justify-between border-b px-4 py-3 transition-colors',
                    layoutDeviceMode === 'spatial'
                      ? 'border-cyan-500/30 bg-[#1E293B]/80 text-white'
                      : 'border-[#CAD3F5] bg-white text-[#0A1A4A]',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] text-xs font-bold text-[#0056FF]">
                      S
                    </div>
                    <div>
                      <h2 className="font-sans text-xs leading-none font-bold">
                        SNPI International School
                      </h2>
                      <span className="font-mono text-[10px] opacity-70">
                        Academic Portal &middot; Spans Across All Panes
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500 sm:flex">
                      Search courses, cohorts, assignments...
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-1 font-sans text-xs font-bold text-[#0056FF]"
                    >
                      Export
                    </button>
                  </div>
                </header>

                {/* Main Scaffold Workspace: Rail + Panes */}
                <div className="flex min-h-[380px] w-full">
                  {/* Side Navigation Rail (Desktop & Tablet / Medium-Expanded) */}
                  {layoutBreakpoint !== 'compact' && layoutDeviceMode !== 'spatial' && (
                    <aside
                      className={cn(
                        'flex flex-col justify-between border-slate-200 p-2 transition-all',
                        layoutRtl ? 'border-l' : 'border-r',
                        layoutBreakpoint === 'large' || layoutBreakpoint === 'extra-large'
                          ? 'w-48 bg-slate-50'
                          : 'w-16 items-center bg-[#F8FAFC]',
                      )}
                    >
                      <div className="w-full space-y-1">
                        {/* FAB or Extended FAB */}
                        <div className="mb-3 px-1">
                          <button
                            type="button"
                            onClick={() => setLayoutFabExpanded(!layoutFabExpanded)}
                            className={cn(
                              'flex items-center justify-center rounded-xl bg-[#0056FF] font-sans font-bold text-white shadow-sm transition-all',
                              layoutBreakpoint === 'large' ||
                                layoutBreakpoint === 'extra-large' ||
                                layoutFabExpanded
                                ? 'w-full gap-2 px-3 py-2 text-xs'
                                : 'h-10 w-10 text-sm',
                            )}
                          >
                            <span>+</span>
                            {(layoutBreakpoint === 'large' ||
                              layoutBreakpoint === 'extra-large' ||
                              layoutFabExpanded) && <span className="text-xs">Create Course</span>}
                          </button>
                        </div>

                        {/* Navigation Destinations */}
                        {[
                          { id: 'dash', label: 'Dashboard', badge: '' },
                          { id: 'courses', label: 'Courses', badge: '12' },
                          { id: 'students', label: 'Students', badge: '148' },
                          { id: 'grade', label: 'Gradebook', badge: '' },
                          { id: 'reports', label: 'Reports', badge: '' },
                        ].map((nav, idx) => (
                          <div
                            key={nav.id}
                            className={cn(
                              'flex cursor-pointer items-center rounded-lg px-2.5 py-2 font-sans text-xs transition-colors',
                              idx === 1
                                ? 'bg-[#0056FF] font-bold text-white'
                                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                              layoutBreakpoint !== 'large' &&
                                layoutBreakpoint !== 'extra-large' &&
                                'justify-center',
                            )}
                          >
                            <span>{nav.label.slice(0, 2).toUpperCase()}</span>
                            {(layoutBreakpoint === 'large' ||
                              layoutBreakpoint === 'extra-large') && (
                              <span className="ml-2 flex-1">{nav.label}</span>
                            )}
                            {(layoutBreakpoint === 'large' || layoutBreakpoint === 'extra-large') &&
                              nav.badge && (
                                <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[9px] text-[#0056FF]">
                                  {nav.badge}
                                </span>
                              )}
                          </div>
                        ))}
                      </div>

                      <div className="w-full border-t border-slate-200 pt-2 text-center font-mono text-[9px] text-slate-400">
                        {layoutBreakpoint === 'large' || layoutBreakpoint === 'extra-large'
                          ? 'RAIL EXPANDED'
                          : 'RAIL'}
                      </div>
                    </aside>
                  )}

                  {/* Panes Container (1, 2, or 3 Panes) */}
                  <div className="relative flex flex-1 overflow-hidden">
                    {/* Pane 1: Navigation / Master List */}
                    <section
                      style={{
                        width:
                          layoutPaneCount === 1
                            ? '100%'
                            : layoutPaneCount === 2
                              ? `${paneWidthRatio}%`
                              : '32%',
                      }}
                      className={cn(
                        'flex flex-col border-slate-200 p-3 transition-all',
                        layoutPaneCount > 1 && (layoutRtl ? 'border-l' : 'border-r'),
                        layoutDeviceMode === 'spatial' ? 'bg-[#1E293B]/70' : 'bg-white',
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                            Pane 1 &middot; List Destination
                          </span>
                          <h3 className="font-sans text-xs font-bold text-[#0A1A4A]">
                            Academic Cohorts (12)
                          </h3>
                        </div>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-600">
                          Primary
                        </span>
                      </div>

                      <div className="space-y-1.5 overflow-y-auto">
                        {[
                          {
                            code: 'CS-401',
                            title: 'Distributed Systems',
                            students: 42,
                            active: true,
                          },
                          {
                            code: 'CS-302',
                            title: 'Software Architecture',
                            students: 38,
                            active: false,
                          },
                          {
                            code: 'ENG-101',
                            title: 'Technical Communication',
                            students: 50,
                            active: false,
                          },
                          {
                            code: 'MATH-204',
                            title: 'Applied Cryptography',
                            students: 29,
                            active: false,
                          },
                        ].map((item) => (
                          <div
                            key={item.code}
                            className={cn(
                              'cursor-pointer rounded-xl border p-2.5 text-xs transition-all',
                              item.active
                                ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0A1A4A]'
                                : 'border-slate-200 bg-white hover:border-[#CAD3F5] hover:bg-slate-50',
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-bold text-[#0056FF]">
                                {item.code}
                              </span>
                              <span className="font-mono text-[10px] text-slate-500">
                                {item.students} Students
                              </span>
                            </div>
                            <div className="mt-0.5 font-sans font-bold text-slate-900">
                              {item.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Drag Handle 1 (Between Pane 1 and Pane 2) */}
                    {layoutPaneCount >= 2 && (
                      <div
                        onClick={() => setPaneWidthRatio(paneWidthRatio === 50 ? 35 : 50)}
                        title="Drag handle: Click to toggle 35/65 vs 50/50 split"
                        className="group relative flex w-2.5 cursor-col-resize items-center justify-center bg-slate-100 transition-colors hover:bg-[#0056FF]"
                      >
                        <div className="h-8 w-1 rounded-full bg-slate-300 group-hover:bg-white" />
                      </div>
                    )}

                    {/* Pane 2: Primary Detail / Workspace */}
                    {layoutPaneCount >= 2 && (
                      <section
                        style={{
                          width: layoutPaneCount === 2 ? `${100 - paneWidthRatio}%` : '42%',
                        }}
                        className={cn(
                          'flex flex-col p-4 transition-all',
                          layoutPaneCount === 3 &&
                            (layoutRtl ? 'border-l border-slate-200' : 'border-r border-slate-200'),
                          layoutDeviceMode === 'spatial' ? 'bg-[#0F172A]/80' : 'bg-slate-50/50',
                        )}
                      >
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">
                              Pane 2 &middot; Detail Workspace
                            </span>
                            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">
                              CS-401: Advanced Distributed Systems
                            </h3>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                              Active Cohort
                            </span>
                          </div>
                        </div>

                        {/* Detail Content with Progressive Disclosure */}
                        <div className="space-y-3 text-xs">
                          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-none">
                            <span className="font-mono text-[10px] text-slate-400">
                              SYLLABUS SUMMARY
                            </span>
                            <p className="mt-1 font-sans leading-relaxed text-slate-700">
                              Focuses on distributed consensus, Raft implementation, vector clocks,
                              multi-tenant state replication, and high-availability systems.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                              <span className="font-mono text-[10px] text-slate-500">
                                Average Grade
                              </span>
                              <div className="font-sans text-lg font-bold text-[#0056FF]">
                                88.4%
                              </div>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                              <span className="font-mono text-[10px] text-slate-500">
                                Assignments
                              </span>
                              <div className="font-sans text-lg font-bold text-slate-800">
                                14 / 16
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Drag Handle 2 (Between Pane 2 and Pane 3) */}
                    {layoutPaneCount === 3 && (
                      <div
                        title="Drag handle: Resizes utility inspector pane"
                        className="group relative flex w-2.5 cursor-col-resize items-center justify-center bg-slate-100 transition-colors hover:bg-[#0056FF]"
                      >
                        <div className="h-8 w-1 rounded-full bg-slate-300 group-hover:bg-white" />
                      </div>
                    )}

                    {/* Pane 3: Auxiliary / Inspector / Telemetry */}
                    {layoutPaneCount === 3 && (
                      <section
                        style={{ width: '26%' }}
                        className={cn(
                          'flex flex-col p-3 transition-all',
                          layoutDeviceMode === 'spatial' ? 'bg-[#1E293B]/70' : 'bg-white',
                        )}
                      >
                        <div className="mb-2 border-b border-slate-100 pb-2">
                          <span className="font-mono text-[10px] font-bold text-purple-600 uppercase">
                            Pane 3 &middot; Inspector
                          </span>
                          <h4 className="font-sans text-xs font-bold text-[#0A1A4A]">
                            Telemetry &amp; Audit Logs
                          </h4>
                        </div>

                        <div className="space-y-2 text-[11px]">
                          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2 font-mono text-slate-600">
                            <div>10:42 &middot; Grade posted: Lab 4</div>
                            <div className="text-[10px] text-slate-400">
                              Teacher: Dr. S. Kesararam
                            </div>
                          </div>
                          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2 font-mono text-slate-600">
                            <div>09:15 &middot; Attendance verified</div>
                            <div className="text-[10px] text-slate-400">
                              42 present &middot; 0 absent
                            </div>
                          </div>
                        </div>
                      </section>
                    )}

                    {/* Levitated Pane / Dialog Simulator (when strategy === 'levitate') */}
                    {layoutStrategy === 'levitate' && (
                      <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
                        <div className="w-full max-w-sm space-y-3 rounded-2xl border-2 border-[#0056FF] bg-white p-4 shadow-2xl">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <div className="space-y-0.5">
                              <span className="font-mono text-[9px] font-bold text-[#0056FF] uppercase">
                                Levitated Workflow &middot; Floating Sheet
                              </span>
                              <h4 className="font-sans text-xs font-bold text-[#0A1A4A]">
                                Fast Grade Submission
                              </h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => setLayoutStrategy('show-hide')}
                              className="rounded px-2 py-0.5 font-mono text-xs font-bold text-slate-500 hover:bg-slate-100"
                            >
                              X
                            </button>
                          </div>
                          <p className="font-sans text-xs text-slate-600">
                            This pane elevates over background content when horizontal space is
                            constrained or temporary modal focus is required.
                          </p>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setLayoutStrategy('show-hide')}
                              className="rounded-lg border border-slate-200 px-3 py-1 font-sans text-xs text-slate-600"
                            >
                              Dismiss
                            </button>
                            <button
                              type="button"
                              onClick={() => setLayoutStrategy('show-hide')}
                              className="rounded-lg bg-[#0056FF] px-3 py-1 font-sans text-xs font-bold text-white"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Navigation Bar (Compact Mobile Breakpoint) */}
                {layoutBreakpoint === 'compact' && (
                  <nav className="flex items-center justify-around border-t border-slate-200 bg-white py-2 text-xs">
                    {[
                      { label: 'Home', active: false },
                      { label: 'Courses', active: true },
                      { label: 'Students', active: false },
                      { label: 'Settings', active: false },
                    ].map((tab) => (
                      <div
                        key={tab.label}
                        className={cn(
                          'flex cursor-pointer flex-col items-center font-sans text-[11px]',
                          tab.active
                            ? 'font-bold text-[#0056FF]'
                            : 'text-slate-500 hover:text-slate-800',
                        )}
                      >
                        <span className="mb-1 h-1.5 w-1.5 rounded-full bg-current" />
                        <span>{tab.label}</span>
                      </div>
                    ))}
                  </nav>
                )}

                {/* Safety Region Bottom Band */}
                {layoutShowSafetyRegion && (
                  <div className="border-t border-amber-300 bg-amber-100/80 px-3 py-0.5 text-center font-mono text-[9px] font-bold text-amber-900">
                    SYSTEM SAFETY REGION &middot; Gesture Navigation Inset (20dp)
                  </div>
                )}
              </div>
            </div>

            {/* 3 Adaptive Strategies Architectural Breakdown */}
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs md:grid-cols-3">
              <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">1. Show &amp; Hide</span>
                  <span className="py-0.2 rounded bg-blue-100 px-1.5 font-mono text-[9px] text-[#0056FF]">
                    Expand/Fold
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Supplemental panes (detail and inspector) automatically expand side-by-side as
                  screen width scales, and collapse into stack drill-down navigation on compact
                  viewports.
                </p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">2. Levitate</span>
                  <span className="py-0.2 rounded bg-purple-100 px-1.5 font-mono text-[9px] text-purple-700">
                    Modal Focus
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Elevates auxiliary workflows into floating dialogs or docked bottom sheets when
                  co-planar screen width is restricted, preventing horizontal crowding.
                </p>
              </div>

              <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">3. Reflow</span>
                  <span className="py-0.2 rounded bg-emerald-100 px-1.5 font-mono text-[9px] text-emerald-800">
                    Dynamic Grid
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Restructures multi-column content from 3 columns down to 2 columns and
                  single-column vertical stacks without altering data relationships or causing
                  overflow.
                </p>
              </div>
            </div>

            {/* Material 3 Layout Architecture Invariants Matrix */}
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                Material 3 Layout Terms &amp; Architectural Invariants Matrix
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#CAD3F5]">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-bold text-[#0A1A4A]">
                    <tr>
                      <th className="p-2.5">Scaffold Element</th>
                      <th className="p-2.5">Architectural Role</th>
                      <th className="p-2.5">Breakpoint Scaling Rules</th>
                      <th className="p-2.5">Interaction Invariant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Windows</td>
                      <td className="p-2.5">App boundary &amp; container</td>
                      <td className="p-2.5">
                        Full-screen (mobile) &middot; Split-screen &middot; Free-form (desktop)
                      </td>
                      <td className="p-2.5">
                        Multi-window support across foldable &amp; desktop modes
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Bars</td>
                      <td className="p-2.5">Top App Bar &amp; Bottom Nav Bar</td>
                      <td className="p-2.5">
                        Bottom Nav in Compact &middot; App Bar spans 1–3 panes
                      </td>
                      <td className="p-2.5">
                        Top App Bar provides context + 1–2 essential actions
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Rails</td>
                      <td className="p-2.5">Perimeter navigation &amp; toolbars</td>
                      <td className="p-2.5">
                        72px Rail in Medium/Expanded &middot; 200px Drawer in Large
                      </td>
                      <td className="p-2.5">
                        Holds navigation, toolbars, and Floating Action Buttons
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Panes</td>
                      <td className="p-2.5">Primary content destinations (1–3)</td>
                      <td className="p-2.5">
                        1 Pane (Compact) &middot; 2 Panes (Medium/Exp) &middot; 3 Panes (Large)
                      </td>
                      <td className="p-2.5">
                        Co-planar (side-by-side) &middot; Floating &middot; Docked
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Drag Handles</td>
                      <td className="p-2.5">Pane resizing divider</td>
                      <td className="p-2.5">Active between flexible panes</td>
                      <td className="p-2.5">
                        Adjusts flexible width or toggles 1-pane/2-pane collapse
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Rulers</td>
                      <td className="p-2.5">Global alignment guidelines</td>
                      <td className="p-2.5">8dp grid alignment lines across all layers</td>
                      <td className="p-2.5">Enforces unified margins and element placement</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Bidirectionality</td>
                      <td className="p-2.5">LTR &amp; RTL language support</td>
                      <td className="p-2.5">Full layout mirroring for Arabic, Hebrew, Farsi</td>
                      <td className="p-2.5">
                        Rails and navigation components mirror to right edge
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Safety Regions</td>
                      <td className="p-2.5">System reserved UI zones</td>
                      <td className="p-2.5">Status bar (24dp), gesture nav bar (20dp), hinges</td>
                      <td className="p-2.5">Never place interactive controls in safety zones</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: INTERACTION STATES & STATE LAYERS ARCHITECTURE           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'states' && (
        <div className="space-y-6">
          {/* Interactive States Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Interaction States &amp; State Layers Architecture
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Enabled &middot; Disabled &middot; Hover &middot; Focused &middot; Pressed
                  &middot; Dragged &middot; Compound States &middot; Inheritance Matrix
                </div>
              </div>

              {/* Quick Status Pill */}
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                  STATE: {interactionState.toUpperCase()}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                  COMPONENT: {selectedTargetComponent.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Controls: State Selector & Component Selector */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs md:grid-cols-2">
              {/* Interaction State Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Select Interaction State
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { id: 'enabled', label: 'Enabled', badge: 'Default' },
                      { id: 'disabled', label: 'Disabled', badge: '38% Opacity' },
                      { id: 'hover', label: 'Hover', badge: '8% Overlay' },
                      { id: 'focused', label: 'Focused', badge: 'Focus Ring' },
                      { id: 'pressed', label: 'Pressed', badge: 'Ripple' },
                      { id: 'dragged', label: 'Dragged', badge: 'Elevation' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setInteractionState(s.id)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-left font-sans text-xs transition-all',
                        interactionState === s.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{s.label}</span>
                      <span className="ml-1 font-mono text-[10px] opacity-70">({s.badge})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Component Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Select Target Component
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { id: 'button', label: 'Button' },
                      { id: 'fab', label: 'FAB' },
                      { id: 'chip', label: 'Filter Chip' },
                      { id: 'switch', label: 'Switch' },
                      { id: 'card', label: 'Card' },
                      { id: 'input', label: 'Text Field' },
                      { id: 'list-item', label: 'List Item' },
                    ] as const
                  ).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedTargetComponent(c.id)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-left font-sans text-xs transition-all',
                        selectedTargetComponent === c.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Compound State Toggle Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-sans font-bold text-[#0A1A4A]">Compound Modifiers:</span>
                <button
                  type="button"
                  onClick={() => setCompoundSelectedState(!compoundSelectedState)}
                  className={cn(
                    'rounded-md px-2.5 py-1 font-sans text-xs transition-all',
                    compoundSelectedState
                      ? 'border border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  Selected State: {compoundSelectedState ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>

              <div className="font-mono text-[10px] text-slate-500">
                {interactionState === 'hover' &&
                  'Hover Exclusivity: Exactly 1 hover state active across layout'}
                {interactionState === 'focused' &&
                  'Focus Exclusivity: Exactly 1 keyboard focus indicator active'}
                {interactionState === 'pressed' &&
                  'Pressed Exclusivity: Tactile ripple order initiated by user'}
                {interactionState === 'dragged' &&
                  'Dragged Exclusivity: Elevation increase + coordinates tracking'}
                {interactionState === 'disabled' &&
                  'Disabled Exemption: No hover/focus/press state layers inherited'}
                {interactionState === 'enabled' &&
                  'Enabled Baseline: Default surface styling & 100% interactive'}
              </div>
            </div>

            {/* Interactive State Visual Preview Stage */}
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-8 transition-all">
              {/* Component: Button */}
              {selectedTargetComponent === 'button' && (
                <div className="space-y-3 text-center">
                  <button
                    type="button"
                    disabled={interactionState === 'disabled'}
                    className={cn(
                      'relative overflow-hidden rounded-xl px-6 py-3 font-sans text-sm font-bold transition-all duration-200',
                      // Base enabled styling
                      compoundSelectedState
                        ? 'border-2 border-[#0056FF] bg-[#0056FF] text-white'
                        : 'bg-[#0056FF] text-white shadow-sm',
                      // Disabled state
                      interactionState === 'disabled' &&
                        'cursor-not-allowed border-transparent bg-slate-200 text-slate-400 opacity-38 shadow-none',
                      // Hover state (8% overlay)
                      interactionState === 'hover' &&
                        'bg-[#2277FF] shadow-md ring-2 ring-[#CAD3F5]',
                      // Focused state (12% overlay + high contrast 2px ring)
                      interactionState === 'focused' &&
                        'shadow-md ring-4 ring-[#0056FF] ring-offset-2 outline-none',
                      // Pressed state (ripple + surface depression)
                      interactionState === 'pressed' &&
                        'scale-98 bg-[#0044CC] shadow-inner ring-2 ring-white/50',
                      // Dragged state (elevation lift + rotate)
                      interactionState === 'dragged' &&
                        '-translate-y-2 rotate-1 shadow-2xl ring-2 ring-[#0056FF]',
                    )}
                  >
                    <span>Confirm Enrollment</span>
                  </button>
                  <div className="font-mono text-[10px] text-slate-500">
                    {interactionState === 'disabled' &&
                      'Disabled: Reduced opacity, 0dp elevation, pointer-events: none'}
                    {interactionState === 'hover' &&
                      'Hover: 8% overlay, pointer cursor, low-emphasis animated fade'}
                    {interactionState === 'focused' &&
                      'Focused: 12% overlay + 2px high-contrast keyboard focus ring'}
                    {interactionState === 'pressed' &&
                      'Pressed: 12% ripple overlay + tactile elevation feedback'}
                    {interactionState === 'dragged' &&
                      'Dragged: 16% overlay + 8dp elevation drop shadow'}
                    {interactionState === 'enabled' &&
                      'Enabled: Standard interactive baseline state'}
                  </div>
                </div>
              )}

              {/* Component: Floating Action Button (FAB) */}
              {selectedTargetComponent === 'fab' && (
                <div className="space-y-3 text-center">
                  {interactionState === 'disabled' ? (
                    <div className="rounded-xl border border-dashed border-rose-300 bg-rose-50 p-4 font-sans text-xs text-rose-800">
                      <div className="font-mono text-[11px] font-bold tracking-wider uppercase">
                        FAB Disabled Rule (M3 Invariant)
                      </div>
                      <p className="mt-1">
                        Floating Action Buttons (FABs) must{' '}
                        <strong>never display as disabled</strong>. If the action represented by the
                        FAB is unavailable, the FAB must <strong>hide completely</strong> from the
                        layout.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        className={cn(
                          'relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-[#0056FF] text-xl font-bold text-white shadow-md transition-all duration-200',
                          interactionState === 'hover' && 'scale-105 bg-[#2277FF] shadow-lg',
                          interactionState === 'focused' &&
                            'shadow-lg ring-4 ring-[#0056FF] ring-offset-2',
                          interactionState === 'pressed' && 'scale-95 bg-[#0044CC] shadow-sm',
                          interactionState === 'dragged' && '-translate-y-3 rotate-3 shadow-2xl',
                        )}
                      >
                        <span>+</span>
                      </div>
                      <div className="font-mono text-[10px] text-slate-500">
                        Standard 56&times;56dp Floating Action Button in{' '}
                        {interactionState.toUpperCase()} state
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Component: Filter Chip */}
              {selectedTargetComponent === 'chip' && (
                <div className="space-y-3 text-center">
                  <div
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-sans text-xs font-bold transition-all duration-200',
                      compoundSelectedState
                        ? 'border-2 border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                        : 'border border-[#CAD3F5] bg-white text-[#0A1A4A]',
                      interactionState === 'disabled' &&
                        'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-38',
                      interactionState === 'hover' && 'border-[#2277FF] bg-[#EFF5FF]',
                      interactionState === 'focused' && 'ring-4 ring-[#0056FF] ring-offset-2',
                      interactionState === 'pressed' && 'scale-95 bg-blue-100',
                      interactionState === 'dragged' && '-translate-y-1 rotate-1 shadow-xl',
                    )}
                  >
                    {compoundSelectedState && <span>&check;</span>}
                    <span>Applied Cryptography</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    Filter Chip &middot; {compoundSelectedState ? 'Selected' : 'Unselected'}{' '}
                    &middot; {interactionState.toUpperCase()}
                  </div>
                </div>
              )}

              {/* Component: Switch */}
              {selectedTargetComponent === 'switch' && (
                <div className="space-y-3 text-center">
                  <div className="inline-flex items-center gap-3">
                    <span className="font-sans text-xs font-bold text-[#0A1A4A]">
                      Auto-Grading Roster
                    </span>
                    <div
                      className={cn(
                        'relative h-7 w-12 cursor-pointer rounded-full p-1 transition-all duration-200',
                        compoundSelectedState ? 'bg-[#0056FF]' : 'bg-slate-300',
                        interactionState === 'disabled' &&
                          'cursor-not-allowed bg-slate-200 opacity-38',
                        interactionState === 'hover' && 'ring-2 ring-[#CAD3F5]',
                        interactionState === 'focused' && 'ring-4 ring-[#0056FF] ring-offset-2',
                        interactionState === 'pressed' && 'scale-95',
                        interactionState === 'dragged' && '-translate-y-0.5 shadow-lg',
                      )}
                    >
                      <div
                        className={cn(
                          'h-5 w-5 rounded-full bg-white shadow-sm transition-all',
                          compoundSelectedState ? 'translate-x-5' : 'translate-x-0',
                        )}
                      />
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    Toggle Switch &middot; State: {interactionState.toUpperCase()}
                  </div>
                </div>
              )}

              {/* Component: Card */}
              {selectedTargetComponent === 'card' && (
                <div className="w-full max-w-sm space-y-3 text-center">
                  <div
                    className={cn(
                      'cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200',
                      compoundSelectedState
                        ? 'border-2 border-[#0056FF] bg-[#EFF5FF]'
                        : 'border-[#CAD3F5] bg-white',
                      interactionState === 'disabled' &&
                        'cursor-not-allowed bg-slate-100 text-slate-400 opacity-38',
                      interactionState === 'hover' && 'border-[#2277FF] bg-slate-50 shadow-md',
                      interactionState === 'focused' && 'ring-4 ring-[#0056FF] ring-offset-2',
                      interactionState === 'pressed' && 'scale-98 shadow-sm',
                      interactionState === 'dragged' &&
                        '-translate-y-2 rotate-1 border-[#0056FF] shadow-2xl',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                        COHORT CARD
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-600">
                        {interactionState.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-1 font-sans font-bold text-slate-900">
                      CS-401: Distributed Consensus
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      Card container demonstrates elevation changes across hover, press, and drag
                      states.
                    </p>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    Container Card &middot; {interactionState.toUpperCase()} state
                  </div>
                </div>
              )}

              {/* Component: Text Field */}
              {selectedTargetComponent === 'input' && (
                <div className="w-full max-w-sm space-y-3 text-center">
                  <div
                    className={cn(
                      'rounded-xl border p-3 text-left transition-all duration-200',
                      compoundSelectedState
                        ? 'border-2 border-[#0056FF] bg-[#EFF5FF]'
                        : 'border-[#CAD3F5] bg-white',
                      interactionState === 'disabled' &&
                        'cursor-not-allowed bg-slate-100 text-slate-400 opacity-38',
                      interactionState === 'hover' && 'border-[#2277FF]',
                      interactionState === 'focused' &&
                        'border-2 border-[#0056FF] ring-4 ring-[#0056FF]/20',
                      interactionState === 'pressed' && 'bg-blue-50/50',
                      interactionState === 'dragged' && '-translate-y-1 shadow-md',
                    )}
                  >
                    <label className="block font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                      Student Identifier
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="SNPI-STU-2026-089"
                      disabled={interactionState === 'disabled'}
                      className="mt-1 w-full bg-transparent font-sans text-xs font-bold text-slate-800 outline-none"
                    />
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    Input Field &middot; {interactionState.toUpperCase()} state
                  </div>
                </div>
              )}

              {/* Component: List Item */}
              {selectedTargetComponent === 'list-item' && (
                <div className="w-full max-w-md space-y-3 text-center">
                  <div
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-xl border p-3 text-left transition-all duration-200',
                      compoundSelectedState
                        ? 'border-2 border-[#0056FF] bg-[#EFF5FF]'
                        : 'border-slate-200 bg-white',
                      interactionState === 'disabled' &&
                        'cursor-not-allowed bg-slate-100 text-slate-400 opacity-38',
                      interactionState === 'hover' && 'border-[#2277FF] bg-slate-50 shadow-sm',
                      interactionState === 'focused' && 'ring-4 ring-[#0056FF] ring-offset-2',
                      interactionState === 'pressed' && 'scale-99 bg-blue-50',
                      interactionState === 'dragged' &&
                        '-translate-y-2 rotate-1 border-[#0056FF] shadow-2xl',
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-[#0056FF]" />
                      <div>
                        <div className="font-sans text-xs font-bold text-slate-900">
                          Dr. Sophal Kesararam
                        </div>
                        <div className="font-mono text-[10px] text-slate-500">
                          Lead Faculty &middot; Computer Science
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {interactionState.toUpperCase()}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">
                    List Item &middot; {interactionState.toUpperCase()} state
                  </div>
                </div>
              )}
            </div>

            {/* 4 State Exclusivity & Compound Invariants Cards */}
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">1. Hover Exclusivity</span>
                  <span className="py-0.2 rounded bg-blue-100 px-1.5 font-mono text-[9px] text-[#0056FF]">
                    Single Cursor
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Only one component across the entire screen layout can possess a hover state at
                  any given moment, strictly governed by pointer position.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">2. Focus Indicator</span>
                  <span className="py-0.2 rounded bg-purple-100 px-1.5 font-mono text-[9px] text-purple-700">
                    Tab Ring
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Keyboard traversal highlights exactly one target with an accessible ring indicator
                  (2px solid #0056FF, 2px offset) without mouse hover ambiguity.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">3. Pressed Ripple</span>
                  <span className="py-0.2 rounded bg-emerald-100 px-1.5 font-mono text-[9px] text-emerald-800">
                    High-Emphasis
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Pressed states provide instant tactile feedback via surface depression and ripple
                  overlays, executing in strict user-initiated activation order.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">4. Dragged Lift</span>
                  <span className="py-0.2 rounded bg-amber-100 px-1.5 font-mono text-[9px] text-amber-800">
                    4–8dp Lift
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Continuous press-and-move gestures trigger a low-emphasis surface overlay with
                  elevated drop-shadow, communicating physical depth and detachment.
                </p>
              </div>
            </div>

            {/* Component State Inheritance & Exclusion Matrix Table */}
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                Material 3 State Inheritance &amp; Exclusion Matrix
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#CAD3F5]">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-bold text-[#0A1A4A]">
                    <tr>
                      <th className="p-2.5">Component Group</th>
                      <th className="p-2.5">Examples</th>
                      <th className="p-2.5">Inherited States</th>
                      <th className="p-2.5">Excluded States &amp; Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Action Components</td>
                      <td className="p-2.5">Buttons, Icon buttons, FABs</td>
                      <td className="p-2.5">Enabled, Hover, Focused, Pressed</td>
                      <td className="p-2.5">
                        FAB must hide completely if action unavailable (never disabled)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Selection Controls</td>
                      <td className="p-2.5">Checkboxes, Radio buttons, Switches, Chips</td>
                      <td className="p-2.5">
                        Enabled, Disabled, Hover, Focused, Pressed, Dragged (Chips)
                      </td>
                      <td className="p-2.5">
                        Disabled controls cannot be focused, pressed, or dragged
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Input Components</td>
                      <td className="p-2.5">Text fields, Sliders, Pickers</td>
                      <td className="p-2.5">
                        Enabled, Disabled, Hover, Focused, Pressed, Dragged (Sliders)
                      </td>
                      <td className="p-2.5">
                        Disabled fields suppress text entry and cursor I-beam
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Containment &amp; Lists</td>
                      <td className="p-2.5">Cards, List items</td>
                      <td className="p-2.5">Enabled, Disabled, Hover, Focused, Pressed, Dragged</td>
                      <td className="p-2.5">
                        Inherit elevation increase during pressed and dragged states
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Navigation Shells</td>
                      <td className="p-2.5">App Bars, Navigation Rails, Drawers, Tabs</td>
                      <td className="p-2.5">Container inherits NO states</td>
                      <td className="p-2.5">
                        Only internal child items (buttons, tab links) inherit states
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Communication</td>
                      <td className="p-2.5">Badges, Dialogs, Tooltips, Sheets</td>
                      <td className="p-2.5">Container inherits NO states</td>
                      <td className="p-2.5">
                        Static containers cannot be hovered, pressed, or dragged
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: GRIDS, SPACING & DENSITY SCALING ARCHITECTURE             */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'density' && (
        <div className="space-y-6">
          {/* Interactive Density & Grid Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Grids, Expressive Spacing &amp; Density Scaling Architecture
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Adaptive Grids &middot; Global Rulers &middot; Component Density Scale (0 to -3)
                  &middot; Minimum 48dp Touch Targets
                </div>
              </div>

              {/* Quick Status Pill */}
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                  DENSITY SCALE: {densityScale} {densityScale === 0 ? '(DEFAULT)' : '(DENSE)'}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                  TARGET HITBOX: 48&times;48dp
                </span>
              </div>
            </div>

            {/* Controls: Density Scale & Grids/Rulers */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs md:grid-cols-2">
              {/* Component Density Scale Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Component Density Scale (Height &amp; Padding)
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {(
                    [
                      { scale: 0, label: 'Scale 0 (Default)', height: '48dp', pad: '12dp' },
                      { scale: -1, label: 'Scale -1 (Compact)', height: '44dp', pad: '8dp' },
                      { scale: -2, label: 'Scale -2 (Dense)', height: '40dp', pad: '4dp' },
                      { scale: -3, label: 'Scale -3 (Ultra-Dense)', height: '36dp', pad: '2dp' },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.scale}
                      type="button"
                      onClick={() => setDensityScale(d.scale)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-left font-sans text-xs transition-all',
                        densityScale === d.scale
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{d.label}</span>
                      <span className="ml-1 font-mono text-[10px] opacity-70">({d.height})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid Columns & Rulers Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Adaptive Columns &amp; Global Rulers
                </span>
                <div className="flex flex-wrap items-center gap-1">
                  {([4, 8, 12] as const).map((cols) => (
                    <button
                      key={cols}
                      type="button"
                      onClick={() => setActiveGridColumns(cols)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 font-sans text-xs transition-all',
                        activeGridColumns === cols
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
                      )}
                    >
                      {cols} Columns
                    </button>
                  ))}
                  <div className="mx-1 h-4 w-px bg-slate-300" />
                  {(
                    [
                      { id: 'safety', label: 'Safety' },
                      { id: 'title', label: 'Title' },
                      { id: 'content', label: 'Content' },
                      { id: 'margins', label: 'Margin Wiggle' },
                    ] as const
                  ).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setGridRulerMode(r.id)}
                      className={cn(
                        'rounded-lg px-2 py-1 font-sans text-xs transition-all',
                        gridRulerMode === r.id
                          ? 'border border-cyan-600 bg-cyan-50 font-bold text-cyan-900'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggles: Hitbox Overlay & Grouping Mode */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowHitBoxOverlay(!showHitBoxOverlay)}
                  className={cn(
                    'rounded-md px-2.5 py-1 font-sans text-xs transition-all',
                    showHitBoxOverlay
                      ? 'border border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF]'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  48dp Touch Hit-Box Overlay: {showHitBoxOverlay ? 'VISIBLE' : 'HIDDEN'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSpacingGroupingMode(
                      spacingGroupingMode === 'implicit' ? 'explicit' : 'implicit',
                    )
                  }
                  className={cn(
                    'rounded-md px-2.5 py-1 font-sans text-xs transition-all',
                    spacingGroupingMode === 'explicit'
                      ? 'border border-purple-500 bg-purple-50 font-bold text-purple-800'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                  )}
                >
                  Grouping Mode: {spacingGroupingMode.toUpperCase()}
                </button>
              </div>

              <div className="font-mono text-[10px] text-slate-500">
                Density Formula: dp = (px &times; 160) / screen DPI &middot; Height decreases 4dp
                per scale step
              </div>
            </div>

            {/* Interactive Density Live Stage: Data Table & Interactive Controls */}
            <div className="relative space-y-4 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
              {/* Global Ruler Guide Line */}
              <div className="relative border-b-2 border-dashed border-cyan-500 pb-1">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-cyan-800">
                  <span>RULER ANCHOR: {gridRulerMode.toUpperCase()} RULER ACTIVE</span>
                  <span>16dp GLOBAL ALIGNMENT LINE</span>
                </div>
              </div>

              {/* Simulated Data Grid reacting to Density Scale */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 font-mono text-[10px] text-slate-500">
                  <span>COHORT ENROLLMENT ROSTER</span>
                  <span className="font-bold text-[#0056FF]">
                    Visual Row Height:{' '}
                    {densityScale === 0
                      ? '48px'
                      : densityScale === -1
                        ? '44px'
                        : densityScale === -2
                          ? '40px'
                          : '36px'}{' '}
                    &middot; Font Size: 13px (Preserved)
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {[
                    {
                      id: '1',
                      name: 'Dr. Sophal Kesararam',
                      role: 'Faculty Lead',
                      dept: 'Computer Science',
                      grade: 'A+',
                    },
                    {
                      id: '2',
                      name: 'Chanthy Vuthy',
                      role: 'Research Fellow',
                      dept: 'Software Architecture',
                      grade: 'A',
                    },
                    {
                      id: '3',
                      name: 'Serey Roth',
                      role: 'Teaching Assistant',
                      dept: 'Applied Cryptography',
                      grade: 'A-',
                    },
                    {
                      id: '4',
                      name: 'Bopha Pisey',
                      role: 'Graduate Scholar',
                      dept: 'Distributed Systems',
                      grade: 'B+',
                    },
                  ].map((row) => (
                    <div
                      key={row.id}
                      style={{
                        paddingTop:
                          densityScale === 0
                            ? '12px'
                            : densityScale === -1
                              ? '8px'
                              : densityScale === -2
                                ? '4px'
                                : '2px',
                        paddingBottom:
                          densityScale === 0
                            ? '12px'
                            : densityScale === -1
                              ? '8px'
                              : densityScale === -2
                                ? '4px'
                                : '2px',
                      }}
                      className={cn(
                        'flex items-center justify-between px-4 transition-all duration-150',
                        spacingGroupingMode === 'explicit'
                          ? 'border-b border-slate-200 bg-white'
                          : 'hover:bg-slate-50',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {/* Interactive Avatar / Button with 48dp Hitbox boundary */}
                        <div className="relative flex items-center justify-center">
                          <button
                            type="button"
                            style={{
                              height:
                                densityScale === 0
                                  ? '36px'
                                  : densityScale === -1
                                    ? '32px'
                                    : densityScale === -2
                                      ? '28px'
                                      : '24px',
                              width:
                                densityScale === 0
                                  ? '36px'
                                  : densityScale === -1
                                    ? '32px'
                                    : densityScale === -2
                                      ? '28px'
                                      : '24px',
                            }}
                            className="flex items-center justify-center rounded-lg bg-[#EFF5FF] text-xs font-bold text-[#0056FF]"
                          >
                            {row.name.charAt(0)}
                          </button>

                          {/* Hitbox Overlay showing mandatory 48x48dp boundary */}
                          {showHitBoxOverlay && (
                            <div
                              title="Mandatory 48x48dp accessible touch target boundary"
                              className="pointer-events-none absolute h-12 w-12 rounded-lg border border-dashed border-rose-500 bg-rose-500/10"
                            />
                          )}
                        </div>

                        <div>
                          <div className="font-sans text-xs leading-none font-bold text-slate-900">
                            {row.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[10px] leading-none text-slate-500">
                            {row.role} &middot; {row.dept}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#0056FF]">
                          {row.grade}
                        </span>
                        {/* Action button with hitbox overlay */}
                        <div className="relative flex items-center justify-center">
                          <button
                            type="button"
                            style={{
                              paddingTop:
                                densityScale === 0
                                  ? '6px'
                                  : densityScale === -1
                                    ? '4px'
                                    : densityScale === -2
                                      ? '2px'
                                      : '1px',
                              paddingBottom:
                                densityScale === 0
                                  ? '6px'
                                  : densityScale === -1
                                    ? '4px'
                                    : densityScale === -2
                                      ? '2px'
                                      : '1px',
                            }}
                            className="rounded-md border border-[#CAD3F5] bg-white px-2.5 font-sans text-xs font-bold text-slate-700 hover:bg-[#EFF5FF]"
                          >
                            Edit
                          </button>
                          {showHitBoxOverlay && (
                            <div className="pointer-events-none absolute h-12 w-14 rounded-lg border border-dashed border-rose-500 bg-rose-500/10" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Spacing Principles Explainer Cards */}
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">1. Rhythm</span>
                  <span className="py-0.2 rounded bg-blue-100 px-1.5 font-mono text-[9px] text-[#0056FF]">
                    Cadence
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Consistent horizontal and vertical intervals across cards and list items guide eye
                  tracking and eliminate visual cognitive friction.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">2. Similarity</span>
                  <span className="py-0.2 rounded bg-purple-100 px-1.5 font-mono text-[9px] text-purple-700">
                    Parity
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Identical avatar dimensions, thumbnail bounds, and padding values signal to the
                  user that elements belong to the same logical taxonomy.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">3. Proximity</span>
                  <span className="py-0.2 rounded bg-emerald-100 px-1.5 font-mono text-[9px] text-emerald-800">
                    Causality
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Placing actionable buttons directly adjacent to modified content items establishes
                  an immediate, intuitive causal relationship.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">4. Continuity</span>
                  <span className="py-0.2 rounded bg-amber-100 px-1.5 font-mono text-[9px] text-amber-800">
                    Unified Row
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Aligning related controls into cohesive horizontal rows or toolbars signals a
                  unified capability set with minimal DOM fragmentation.
                </p>
              </div>
            </div>

            {/* Density & Spacing Invariants Matrix Table */}
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                Material 3 Grids, Spacing &amp; Density Invariants Matrix
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#CAD3F5]">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-bold text-[#0A1A4A]">
                    <tr>
                      <th className="p-2.5">Domain</th>
                      <th className="p-2.5">Architectural Standard</th>
                      <th className="p-2.5">Measurement Rule</th>
                      <th className="p-2.5">Inviolable Constraint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Placement Order</td>
                      <td className="p-2.5">3-Step Composition</td>
                      <td className="p-2.5">
                        Columns &rarr; Perimeter Bars/Rails &rarr; Content Panes
                      </td>
                      <td className="p-2.5">
                        Never position inner content before defining edge bars
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Global Rulers</td>
                      <td className="p-2.5">Bar, Safety, Title, Content Rulers</td>
                      <td className="p-2.5">8dp grid alignment lines across nested panes</td>
                      <td className="p-2.5">
                        Safety rulers ensure status bars never obscure interactive elements
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Density Scale</td>
                      <td className="p-2.5">Scale 0 to Scale -3</td>
                      <td className="p-2.5">-4dp padding / height decrement per scale step</td>
                      <td className="p-2.5">
                        Font size and line height must NEVER shrink in dense mode
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Target Bounds</td>
                      <td className="p-2.5">Accessible Hit Target</td>
                      <td className="p-2.5">
                        Minimum 48&times;48dp (minimum 44&times;44px CSS WCAG AAA)
                      </td>
                      <td className="p-2.5">
                        Hit-box expansion via ::before/::after when visual height &lt;48dp
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Density Opt-In</td>
                      <td className="p-2.5">User Preference Control</td>
                      <td className="p-2.5">Default = Scale 0 (Comfortable)</td>
                      <td className="p-2.5">
                        Never apply dense layout by default; user must opt in via settings
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Prohibited Areas</td>
                      <td className="p-2.5">Focused UI &amp; Alerts</td>
                      <td className="p-2.5">Menus, Dialogs, Snackbars, Confirmation alerts</td>
                      <td className="p-2.5">
                        Strictly prohibited from applying component density scaling
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: ADAPTIVE BREAKPOINTS & THE 5 TRANSFORMATION VECTORS       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'breakpoints' && (
        <div className="space-y-6">
          {/* Interactive Breakpoints Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Adaptive Breakpoints &amp; The 5 Transformation Vectors
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  5 Universal Breakpoints &middot; 5 Core Questions: Reveal, Divide, Resize,
                  Reposition, Swap &middot; 40–60 CPL Invariant
                </div>
              </div>

              {/* Active Preset Pill */}
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                  BREAKPOINT: {vectorBreakpoint.toUpperCase()}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                  VECTOR: {activeVectorQuestion.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Controls Row 1: The 5 Material Breakpoints */}
            <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Select Target Breakpoint
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  Formerly Window Size Classes &middot; Adaptive Across Device Bounds
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                {(
                  [
                    {
                      id: 'compact',
                      label: 'Compact',
                      dp: '<600dp',
                      dev: 'Phone (Portrait)',
                      panes: 1,
                    },
                    {
                      id: 'medium',
                      label: 'Medium',
                      dp: '600–839dp',
                      dev: 'Tablet / Foldable',
                      panes: 1,
                    },
                    {
                      id: 'expanded',
                      label: 'Expanded',
                      dp: '840–1199dp',
                      dev: 'Tablet Landscape',
                      panes: 2,
                    },
                    {
                      id: 'large',
                      label: 'Large',
                      dp: '1200–1599dp',
                      dev: 'Desktop / Laptop',
                      panes: 2,
                    },
                    {
                      id: 'extra-large',
                      label: 'Extra-Large',
                      dp: '≥1600dp',
                      dev: 'Ultrawide Desktop',
                      panes: 3,
                    },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setVectorBreakpoint(b.id);
                      setVectorDividedPanes(b.panes as 1 | 2 | 3);
                      if (b.id === 'compact') {
                        setVectorActionPlacement('bottom');
                        setVectorRevealedPane(false);
                      } else {
                        setVectorActionPlacement('leading');
                        setVectorRevealedPane(true);
                      }
                    }}
                    className={cn(
                      'flex flex-col rounded-xl p-2.5 text-left transition-all',
                      vectorBreakpoint === b.id
                        ? 'border-2 border-[#0056FF] bg-[#EFF5FF] text-[#0A1A4A] shadow-xs'
                        : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-[#F8FAFC]',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-xs font-bold">{b.label}</span>
                      <span className="font-mono text-[10px] font-bold text-[#0056FF]">{b.dp}</span>
                    </div>
                    <span className="mt-0.5 font-sans text-[10px] text-slate-500">{b.dev}</span>
                    <span className="mt-1 font-mono text-[9px] text-slate-400">
                      Recommended: {b.panes} {b.panes === 1 ? 'Pane' : 'Panes'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls Row 2: The 5 Adaptation Questions Selector */}
            <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3 text-xs">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                The 5 Foundational Transformation Questions
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    {
                      id: 'reveal',
                      label: '1. What should be revealed?',
                      desc: 'Expose secondary panes & navigation labels',
                    },
                    {
                      id: 'divide',
                      label: '2. How should a screen be divided?',
                      desc: '1 pane vs 2 panes vs 3 panes',
                    },
                    {
                      id: 'resize',
                      label: '3. What should be resized?',
                      desc: '40–60 characters per line reading rule',
                    },
                    {
                      id: 'reposition',
                      label: '4. What should be repositioned?',
                      desc: 'Bottom mobile action to leading rail',
                    },
                    {
                      id: 'swap',
                      label: '5. What should be swapped?',
                      desc: 'Functionally equivalent component exchange',
                    },
                  ] as const
                ).map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActiveVectorQuestion(q.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-left font-sans text-xs transition-all',
                      activeVectorQuestion === q.id
                        ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                        : 'border border-[#CAD3F5] bg-[#F8FAFC] text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    <span className="block">{q.label}</span>
                    <span className="block hidden font-mono text-[9px] opacity-75 sm:block">
                      {q.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Adaptive Canvas Reacting to the 5 Vectors */}
            <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">
                    SIMULATED VIEWPORT ({vectorBreakpoint.toUpperCase()})
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                    {vectorBreakpoint === 'compact'
                      ? '360&times;800dp'
                      : vectorBreakpoint === 'medium'
                        ? '720&times;900dp'
                        : vectorBreakpoint === 'expanded'
                          ? '1024&times;768dp'
                          : vectorBreakpoint === 'large'
                            ? '1440&times;900dp'
                            : '1920&times;1080dp'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setVectorLineLengthLimit(!vectorLineLengthLimit)}
                    className={cn(
                      'rounded-md px-2 py-0.5 font-sans text-[11px] transition-all',
                      vectorLineLengthLimit
                        ? 'border border-emerald-500 bg-emerald-50 font-bold text-emerald-800'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                    )}
                  >
                    40–60 CPL Limit: {vectorLineLengthLimit ? 'ENFORCED' : 'OFF'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVectorRevealedPane(!vectorRevealedPane)}
                    className={cn(
                      'rounded-md px-2 py-0.5 font-sans text-[11px] transition-all',
                      vectorRevealedPane
                        ? 'border border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF]'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
                    )}
                  >
                    Secondary Pane: {vectorRevealedPane ? 'REVEALED' : 'COLLAPSED'}
                  </button>
                </div>
              </div>

              {/* Simulated Adaptive Interface Scaffold */}
              <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xs">
                {/* Top App Bar */}
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0056FF] text-xs font-bold text-white">
                      S
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        SNPI Enterprise Portal &middot; Breakpoint Adaptive Scaffold
                      </div>
                      <div className="font-mono text-[9px] text-slate-500">
                        {vectorBreakpoint === 'compact'
                          ? 'Single Pane &middot; Bottom Nav'
                          : vectorBreakpoint === 'medium'
                            ? '1–2 Panes &middot; Collapsed Rail'
                            : '2–3 Panes Co-Planar &middot; Expanded Drawer'}
                      </div>
                    </div>
                  </div>

                  {/* Component Swap Demo: Dialog vs Menu */}
                  <div className="flex items-center gap-2">
                    {vectorBreakpoint === 'compact' ? (
                      <span className="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[10px] text-amber-800">
                        Swapped: Full-Screen Dialog
                      </span>
                    ) : (
                      <span className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[10px] text-[#0056FF]">
                        Swapped: Standard Centered Dialog
                      </span>
                    )}
                  </div>
                </div>

                {/* Workspace: Navigation Rail/Drawer + Panes */}
                <div className="flex min-h-[320px]">
                  {/* Swapped Navigation: Rail or Drawer (Not shown on compact) */}
                  {vectorBreakpoint !== 'compact' && (
                    <aside
                      className={cn(
                        'flex flex-col justify-between border-r border-slate-200 bg-[#F8FAFC] p-2 transition-all',
                        vectorBreakpoint === 'large' || vectorBreakpoint === 'extra-large'
                          ? 'w-48'
                          : 'w-16 items-center',
                      )}
                    >
                      <div className="w-full space-y-1">
                        <div className="px-1 py-1 font-mono text-[9px] text-slate-400">
                          {vectorBreakpoint === 'large' || vectorBreakpoint === 'extra-large'
                            ? 'EXPANDED DRAWER'
                            : 'RAIL'}
                        </div>
                        {['Dashboard', 'Courses', 'Ledger', 'Settings'].map((item, idx) => (
                          <div
                            key={item}
                            className={cn(
                              'flex cursor-pointer items-center rounded-lg px-2.5 py-1.5 font-sans text-xs transition-colors',
                              idx === 1
                                ? 'bg-[#0056FF] font-bold text-white'
                                : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                              vectorBreakpoint !== 'large' &&
                                vectorBreakpoint !== 'extra-large' &&
                                'justify-center',
                            )}
                          >
                            <span>{item.charAt(0)}</span>
                            {(vectorBreakpoint === 'large' ||
                              vectorBreakpoint === 'extra-large') && (
                              <span className="ml-2">{item}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Repositioned Action Button in Leading Edge Rail */}
                      {vectorActionPlacement === 'leading' && (
                        <div className="w-full border-t border-slate-200 pt-2">
                          <button
                            type="button"
                            className="w-full rounded-lg bg-[#0056FF] py-1.5 text-center font-sans text-xs font-bold text-white shadow-xs"
                          >
                            {vectorBreakpoint === 'large' || vectorBreakpoint === 'extra-large'
                              ? '+ New Roster'
                              : '+'}
                          </button>
                        </div>
                      )}
                    </aside>
                  )}

                  {/* Main Panes Region (1 to 3 Panes) */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Pane 1 (Master / Navigation) */}
                    <div
                      style={{
                        width:
                          vectorBreakpoint === 'compact' || !vectorRevealedPane
                            ? '100%'
                            : vectorDividedPanes === 2
                              ? '40%'
                              : '32%',
                      }}
                      className="space-y-2 border-r border-slate-200 bg-white p-3 transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-sans text-xs font-bold text-[#0A1A4A]">
                          Cohort Master List
                        </span>
                        <span className="rounded bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[9px] text-[#0056FF]">
                          Pane 1 (Master)
                        </span>
                      </div>
                      {[
                        { code: 'CS-401', name: 'Distributed Systems', active: true },
                        { code: 'CS-302', name: 'Software Architecture', active: false },
                        { code: 'MATH-204', name: 'Applied Cryptography', active: false },
                      ].map((c) => (
                        <div
                          key={c.code}
                          className={cn(
                            'rounded-xl border p-2 text-xs transition-colors',
                            c.active
                              ? 'border-[#0056FF] bg-[#EFF5FF]'
                              : 'border-slate-200 bg-white',
                          )}
                        >
                          <div className="font-mono font-bold text-[#0056FF]">{c.code}</div>
                          <div className="font-sans text-[11px] font-bold text-slate-800">
                            {c.name}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pane 2 (Revealed Detail Workspace) */}
                    {vectorRevealedPane && vectorBreakpoint !== 'compact' && (
                      <div
                        style={{
                          width: vectorDividedPanes === 3 ? '44%' : '60%',
                        }}
                        className="flex-1 space-y-3 bg-slate-50/60 p-4 transition-all"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <div>
                            <span className="font-mono text-[9px] font-bold text-emerald-600 uppercase">
                              Pane 2 &middot; Detail Workspace
                            </span>
                            <h3 className="font-sans text-xs font-bold text-[#0A1A4A]">
                              CS-401: Advanced Distributed Systems
                            </h3>
                          </div>
                          <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-800">
                            Active Detail
                          </span>
                        </div>

                        {/* Line Length 40–60 CPL Demonstration */}
                        <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase">
                              Course Specification
                            </span>
                            <span
                              className={cn(
                                'rounded px-1.5 py-0.5 font-mono text-[10px] font-bold',
                                vectorLineLengthLimit
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800',
                              )}
                            >
                              {vectorLineLengthLimit
                                ? '52 CPL (Optimal Reading)'
                                : '110 CPL (Visual Fatigue)'}
                            </span>
                          </div>
                          <p
                            style={{ maxWidth: vectorLineLengthLimit ? '48ch' : '100%' }}
                            className="border-l-2 border-[#0056FF] pl-2.5 font-sans text-xs leading-relaxed text-slate-700"
                          >
                            Students implement the Raft consensus algorithm, multi-tenant state
                            machines, and cryptographically verified replication chains across
                            distributed nodes.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Pane 3 (Auxiliary Utility Pane on Extra-Large) */}
                    {vectorDividedPanes === 3 && vectorBreakpoint === 'extra-large' && (
                      <div className="w-[24%] space-y-2 border-l border-slate-200 bg-white p-3">
                        <span className="font-mono text-[9px] font-bold text-purple-600 uppercase">
                          Pane 3 &middot; Side Sheet
                        </span>
                        <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                          Real-Time Audit Log
                        </div>
                        <div className="space-y-1 rounded-lg bg-slate-50 p-2 font-mono text-[10px] text-slate-600">
                          <div>10:42 &middot; Gradebook synced</div>
                          <div>09:15 &middot; Attendance lock</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Navigation Bar (Compact Mobile Breakpoint Swapped In) */}
                {vectorBreakpoint === 'compact' && (
                  <nav className="flex items-center justify-around border-t border-slate-200 bg-white py-2 text-xs">
                    {[
                      { label: 'Home', active: false },
                      { label: 'Courses', active: true },
                      { label: 'Ledger', active: false },
                      { label: 'Settings', active: false },
                    ].map((tab) => (
                      <div
                        key={tab.label}
                        className={cn(
                          'flex cursor-pointer flex-col items-center font-sans text-[11px]',
                          tab.active
                            ? 'font-bold text-[#0056FF]'
                            : 'text-slate-500 hover:text-slate-800',
                        )}
                      >
                        <span className="mb-1 h-1.5 w-1.5 rounded-full bg-current" />
                        <span>{tab.label}</span>
                      </div>
                    ))}
                  </nav>
                )}
              </div>
            </div>

            {/* 5 Questions Explainer Cards */}
            <div className="grid grid-cols-1 gap-2.5 pt-2 text-xs sm:grid-cols-2 md:grid-cols-5">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <span className="block font-sans font-bold text-[#0A1A4A]">1. Reveal</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Expose navigation drawer labels and secondary detail panes simultaneously on wider
                  viewports without navigation churn.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <span className="block font-sans font-bold text-[#0A1A4A]">2. Divide</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Partition the screen into 1 pane on compact/medium, 2 panes on expanded/large, and
                  3 panes on extra-large displays.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <span className="block font-sans font-bold text-[#0A1A4A]">3. Resize</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Scale cards, lists, and images while strictly preserving optimal reading
                  typography between 40–60 characters per line.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <span className="block font-sans font-bold text-[#0A1A4A]">4. Reposition</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Shift primary action controls from mobile bottom thumb reach to leading edge
                  navigation rails on mouse/cursor desktop screens.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <span className="block font-sans font-bold text-[#0A1A4A]">5. Swap</span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Exchange functionally equivalent components: Bottom Nav &rarr; Rail &rarr; Drawer;
                  Full-screen Dialog &rarr; Centered Modal; Bottom Sheet &rarr; Menu.
                </p>
              </div>
            </div>

            {/* Component Swapping Matrix Across Breakpoints Table */}
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                Material 3 Component Swapping Matrix Across Breakpoints
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#CAD3F5]">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-bold text-[#0A1A4A]">
                    <tr>
                      <th className="p-2.5">Component Role</th>
                      <th className="p-2.5">Compact (&lt;600dp)</th>
                      <th className="p-2.5">Medium (600–839dp)</th>
                      <th className="p-2.5">Expanded &amp; Large (840–1599dp)</th>
                      <th className="p-2.5">Extra-Large (&ge;1600dp)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Primary Navigation</td>
                      <td className="p-2.5">Bottom Navigation Bar</td>
                      <td className="p-2.5">Collapsed Navigation Rail</td>
                      <td className="p-2.5">Standard Expanded Nav Rail / Drawer</td>
                      <td className="p-2.5">240px Drawer + Utility Rail</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Modal Communication</td>
                      <td className="p-2.5">Full-Screen Dialog</td>
                      <td className="p-2.5">Basic Centered Dialog</td>
                      <td className="p-2.5">Basic Centered Dialog</td>
                      <td className="p-2.5">Centered Dialog / Command Palette</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Contextual Actions</td>
                      <td className="p-2.5">Modal Bottom Sheet</td>
                      <td className="p-2.5">Dropdown Menu</td>
                      <td className="p-2.5">Dropdown Menu / Context Menu</td>
                      <td className="p-2.5">Cascading Context Menu</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Auxiliary Panes</td>
                      <td className="p-2.5">Stack Drill-down (1 Pane)</td>
                      <td className="p-2.5">Floating Modal Sheet</td>
                      <td className="p-2.5">Side Sheet (Co-planar)</td>
                      <td className="p-2.5">Standard Side Sheet (3rd Pane)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB: MATERIAL 3 CANONICAL LAYOUT ARCHETYPES                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'canonical' && (
        <div className="space-y-6">
          {/* Interactive Canonical Layouts Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Material 3 Canonical Layout Archetypes
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Feed (Grid Browsing) &middot; List-Detail (Parent-Child Hierarchy) &middot;
                  Supporting Pane (Asymmetric 2/3 + 1/3) &middot; Layering (Levitate)
                </div>
              </div>

              {/* Quick Status Pill */}
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[11px] font-bold text-[#0056FF]">
                  ARCHETYPE: {canonicalArchetype.toUpperCase()}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600">
                  VIEWPORT: {canonicalBreakpoint.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Controls: Archetype & Breakpoint Selectors */}
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3 text-xs md:grid-cols-2">
              {/* Canonical Archetype Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Select Canonical Archetype
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'list-detail', label: 'List-Detail', desc: 'Parent-Child Hierarchy' },
                      {
                        id: 'supporting',
                        label: 'Supporting Pane',
                        desc: 'Primary 2/3 + Contextual 1/3',
                      },
                      { id: 'feed', label: 'Feed Layout', desc: 'Grid Card Discovery' },
                    ] as const
                  ).map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setCanonicalArchetype(a.id)}
                      className={cn(
                        'rounded-lg px-2.5 py-1.5 text-left font-sans text-xs transition-all',
                        canonicalArchetype === a.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{a.label}</span>
                      <span className="ml-1 hidden font-mono text-[10px] opacity-70 sm:inline">
                        &middot; {a.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Breakpoint Viewport Selector */}
              <div className="space-y-1.5">
                <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                  Simulated Viewport Size
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'compact', label: 'Compact (<600dp)', desc: 'Mobile Phone Portrait' },
                      {
                        id: 'medium',
                        label: 'Medium (600–839dp)',
                        desc: 'Tablet Portrait / Foldable',
                      },
                      { id: 'expanded', label: 'Expanded (≥840dp)', desc: 'Desktop / Landscape' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setCanonicalBreakpoint(b.id);
                        if (b.id === 'compact' || b.id === 'medium') {
                          setCanonicalSupportingPlacement('below');
                        } else {
                          setCanonicalSupportingPlacement('beside');
                        }
                      }}
                      className={cn(
                        'rounded-lg px-2.5 py-1.5 text-left font-sans text-xs transition-all',
                        canonicalBreakpoint === b.id
                          ? 'border border-[#0056FF] bg-[#0056FF] font-bold text-white'
                          : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:border-[#2277FF] hover:bg-[#EFF5FF]',
                      )}
                    >
                      <span>{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Canonical Canvas */}
            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
              {/* Header Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 text-xs">
                <div className="font-mono text-xs font-bold text-[#0056FF]">
                  {canonicalArchetype === 'list-detail' &&
                    'LIST-DETAIL: Parent-Child Data Pairing (2 Panes)'}
                  {canonicalArchetype === 'supporting' &&
                    'SUPPORTING PANE: 2/3 Focus Work Area + 1/3 Contextual Tools'}
                  {canonicalArchetype === 'feed' &&
                    'FEED LAYOUT: Grid Card Composition & Discovery Reflow'}
                </div>

                <div className="font-mono text-[10px] text-slate-500">
                  {canonicalBreakpoint === 'compact' &&
                    'Compact Mode: 1 Pane Stack &middot; Back Button in Detail'}
                  {canonicalBreakpoint === 'medium' &&
                    'Medium Mode: Adaptive 1 or 2 Panes &middot; Bottom Navigation'}
                  {canonicalBreakpoint === 'expanded' &&
                    'Expanded Mode: Permanent Co-Planar Panes &middot; Side Navigation'}
                </div>
              </div>

              {/* ARCHETYPE 1: LIST-DETAIL SIMULATOR */}
              {canonicalArchetype === 'list-detail' && (
                <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xs">
                  {/* Top Bar with Dynamic Back Button */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      {canonicalBreakpoint === 'compact' &&
                        canonicalDetailViewMode === 'detail' && (
                          <button
                            type="button"
                            onClick={() => setCanonicalDetailViewMode('list')}
                            className="rounded-md border border-[#CAD3F5] bg-white px-2 py-0.5 font-sans font-bold text-[#0056FF] hover:bg-[#EFF5FF]"
                          >
                            &larr; Back to Roster
                          </button>
                        )}
                      <span className="font-sans font-bold text-[#0A1A4A]">
                        {canonicalBreakpoint === 'compact' && canonicalDetailViewMode === 'detail'
                          ? 'Student Dossier & Grades'
                          : 'Cohort Enrollment & Dossiers'}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-slate-500">
                      {canonicalBreakpoint === 'compact'
                        ? 'Back Button Invariant: Visible in Detail View ONLY'
                        : 'Co-Planar Invariant: Selected State in List &middot; No Back Button'}
                    </span>
                  </div>

                  {/* Body Workspace: Single Pane Stack vs 2 Panes Co-Planar */}
                  <div className="flex min-h-[300px]">
                    {/* List Pane (Visible in compact list mode, or always on expanded) */}
                    {(canonicalBreakpoint !== 'compact' || canonicalDetailViewMode === 'list') && (
                      <div
                        style={{ width: canonicalBreakpoint === 'expanded' ? '40%' : '100%' }}
                        className={cn(
                          'space-y-2 bg-white p-3',
                          canonicalBreakpoint === 'expanded' && 'border-r border-slate-200',
                        )}
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                          <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                            List Pane (Parent Hierarchy)
                          </span>
                          <span className="py-0.2 rounded bg-slate-100 px-1.5 font-mono text-[9px] text-slate-600">
                            4 Students
                          </span>
                        </div>

                        {[
                          {
                            id: 'cs401',
                            name: 'Dr. Sophal Kesararam',
                            idNum: 'SNPI-FAC-001',
                            dept: 'Distributed Systems',
                            status: 'Active',
                          },
                          {
                            id: 'cs302',
                            name: 'Chanthy Vuthy',
                            idNum: 'SNPI-RES-014',
                            dept: 'Software Architecture',
                            status: 'Graded',
                          },
                          {
                            id: 'math204',
                            name: 'Serey Roth',
                            idNum: 'SNPI-TA-088',
                            dept: 'Applied Cryptography',
                            status: 'Pending',
                          },
                          {
                            id: 'eng101',
                            name: 'Bopha Pisey',
                            idNum: 'SNPI-STU-102',
                            dept: 'Technical Writing',
                            status: 'Active',
                          },
                        ].map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setCanonicalSelectedItemId(item.id);
                              if (canonicalBreakpoint === 'compact') {
                                setCanonicalDetailViewMode('detail');
                              }
                            }}
                            className={cn(
                              'cursor-pointer rounded-xl border p-2.5 text-xs transition-all',
                              canonicalSelectedItemId === item.id
                                ? 'border-2 border-[#0056FF] bg-[#EFF5FF] shadow-xs'
                                : 'border-slate-200 bg-white hover:border-[#CAD3F5] hover:bg-slate-50',
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-sans font-bold text-slate-900">
                                {item.name}
                              </span>
                              <span className="font-mono text-[9px] font-bold text-[#0056FF]">
                                {item.status}
                              </span>
                            </div>
                            <div className="mt-0.5 font-mono text-[10px] text-slate-500">
                              {item.idNum} &middot; {item.dept}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Detail Pane (Visible in compact detail mode, or always on expanded) */}
                    {(canonicalBreakpoint !== 'compact' ||
                      canonicalDetailViewMode === 'detail') && (
                      <div
                        style={{ width: canonicalBreakpoint === 'expanded' ? '60%' : '100%' }}
                        className="flex-1 space-y-3 bg-slate-50/70 p-4"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">
                              Detail Pane (Child Context)
                            </span>
                            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">
                              Academic Dossier &middot; {canonicalSelectedItemId.toUpperCase()}
                            </h3>
                          </div>
                          <span className="rounded border border-emerald-300 bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                            Persistent State Saved
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-3">
                            <span className="font-mono text-[10px] text-slate-400">
                              CREDENTIAL VERIFICATION
                            </span>
                            <div className="font-sans font-bold text-[#0056FF]">
                              Verified Faculty Lead
                            </div>
                            <p className="text-[11px] text-slate-600">
                              PhD in Distributed Systems, MIT Cambridge.
                            </p>
                          </div>
                          <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-3">
                            <span className="font-mono text-[10px] text-slate-400">
                              TERM PERFORMANCE
                            </span>
                            <div className="font-sans font-bold text-slate-900">
                              4.0 Cumulative GPA
                            </div>
                            <p className="text-[11px] text-slate-600">
                              100% on-time grade submissions.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ARCHETYPE 2: SUPPORTING PANE SIMULATOR */}
              {canonicalArchetype === 'supporting' && (
                <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-xs">
                    <span className="font-sans font-bold text-[#0A1A4A]">
                      Curriculum Editor &middot; Supporting Pane Layout
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Placement:{' '}
                      {canonicalSupportingPlacement === 'beside'
                        ? 'Beside (Fixed 360dp on Desktop)'
                        : 'Below (Stacked on Compact/Medium)'}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'gap-4 p-4',
                      canonicalSupportingPlacement === 'beside' ? 'flex flex-row' : 'flex flex-col',
                    )}
                  >
                    {/* Primary Focus Pane (Takes 2/3 of space) */}
                    <div
                      style={{ width: canonicalSupportingPlacement === 'beside' ? '66%' : '100%' }}
                      className="space-y-3 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                          Primary Focus Area (~2/3 Space)
                        </span>
                        <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]">
                          Main Workspace
                        </span>
                      </div>
                      <h4 className="font-sans text-sm font-bold text-[#0A1A4A]">
                        CS-401 Lecture 12: Raft Leader Election &amp; Heartbeats
                      </h4>
                      <p className="font-sans text-xs leading-relaxed text-slate-700">
                        This primary focus pane holds the core document and active editing workflow.
                        In supporting pane layouts, secondary content is only meaningful in direct
                        relation to this primary document.
                      </p>
                    </div>

                    {/* Secondary Supporting Pane (Takes remaining 1/3 space or stacks below) */}
                    <div
                      style={{ width: canonicalSupportingPlacement === 'beside' ? '34%' : '100%' }}
                      className="space-y-2.5 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="font-mono text-[10px] font-bold text-purple-600 uppercase">
                          Supporting Pane (~1/3 Space)
                        </span>
                        <span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[9px] font-bold text-purple-800">
                          Contextual Tool
                        </span>
                      </div>
                      <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                        Review Comments &amp; Co-Pilot
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="rounded-lg border border-slate-200 bg-white p-2">
                          <span className="font-bold text-[#0056FF]">Peer Review:</span> Verify
                          election timeout randomization (150–300ms).
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-2">
                          <span className="font-bold text-purple-700">AI Co-Pilot:</span>{' '}
                          Auto-generated unit test suite for log replication ready.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ARCHETYPE 3: FEED LAYOUT SIMULATOR */}
              {canonicalArchetype === 'feed' && (
                <div className="space-y-3 overflow-hidden rounded-xl border border-slate-300 bg-white p-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs">
                    <span className="font-sans font-bold text-[#0A1A4A]">
                      Campus Academic Feed &middot; Card Grid Reflow
                    </span>
                    <span className="font-mono text-[10px] text-[#0056FF]">
                      {canonicalBreakpoint === 'compact'
                        ? '1-Column Stack (100% Width)'
                        : canonicalBreakpoint === 'medium'
                          ? '2-Column Responsive Grid'
                          : '3-Column Expanded Rich Grid'}
                    </span>
                  </div>

                  {/* Reflowing Cards Grid */}
                  <div
                    className={cn(
                      'grid gap-3 transition-all',
                      canonicalBreakpoint === 'compact'
                        ? 'grid-cols-1'
                        : canonicalBreakpoint === 'medium'
                          ? 'grid-cols-2'
                          : 'grid-cols-3',
                    )}
                  >
                    {[
                      {
                        title: 'New Cybersecurity Lab Launched',
                        tag: 'Faculty News',
                        time: '10m ago',
                      },
                      {
                        title: 'Semester Exam Roster Finalized',
                        tag: 'Academic Office',
                        time: '1h ago',
                      },
                      {
                        title: 'Applied Cryptography Workshop',
                        tag: 'Student Club',
                        time: '3h ago',
                      },
                      {
                        title: 'Library Extended Hours Announced',
                        tag: 'Campus Life',
                        time: '5h ago',
                      },
                      {
                        title: 'Quarterly Scholarship Awards',
                        tag: 'Administration',
                        time: '1d ago',
                      },
                      {
                        title: 'Distributed Systems Capstone Demo',
                        tag: 'Engineering',
                        time: '2d ago',
                      },
                    ].map((feedItem) => (
                      <div
                        key={feedItem.title}
                        className="space-y-2 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs hover:border-[#CAD3F5]"
                      >
                        <div className="flex items-center justify-between font-mono text-[10px]">
                          <span className="font-bold text-[#0056FF]">{feedItem.tag}</span>
                          <span className="text-slate-400">{feedItem.time}</span>
                        </div>
                        <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                          {feedItem.title}
                        </div>
                        <p className="line-clamp-2 font-sans text-[11px] text-slate-600">
                          Campus activities, announcements, and curricular milestones arranged in
                          adaptive cards.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3 Canonical Archetype Breakdown Cards */}
            <div className="grid grid-cols-1 gap-3 pt-2 text-xs md:grid-cols-3">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">1. Feed Layout</span>
                  <span className="py-0.2 rounded bg-blue-100 px-1.5 font-mono text-[9px] text-[#0056FF]">
                    Discovery
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Configurable card grids for quick content browsing. Stacks 1-column on compact
                  phones and scales to 2–4 columns on larger viewports.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">2. List-Detail Layout</span>
                  <span className="py-0.2 rounded bg-emerald-100 px-1.5 font-mono text-[9px] text-emerald-800">
                    Parent-Child
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Explores collections alongside details. Enforces back button in single-pane mobile
                  drill-down, and persistent co-planar layout on expanded screens.
                </p>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-[#0A1A4A]">3. Supporting Pane</span>
                  <span className="py-0.2 rounded bg-purple-100 px-1.5 font-mono text-[9px] text-purple-700">
                    2/3 + 1/3 Focus
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  Organizes content where secondary tools depend directly on primary work. Stacks
                  below on compact viewports and docks beside at 360dp on expanded screens.
                </p>
              </div>
            </div>

            {/* Canonical Layout Invariants Table */}
            <div className="space-y-2 pt-2">
              <span className="font-sans text-[11px] font-bold tracking-wider text-[#0A1A4A] uppercase">
                Material 3 Canonical Layouts Invariants Matrix
              </span>
              <div className="overflow-x-auto rounded-xl border border-[#CAD3F5]">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-bold text-[#0A1A4A]">
                    <tr>
                      <th className="p-2.5">Archetype</th>
                      <th className="p-2.5">Primary Relationship</th>
                      <th className="p-2.5">Compact Layout (&lt;600dp)</th>
                      <th className="p-2.5">Expanded Layout (&ge;840dp)</th>
                      <th className="p-2.5">Strict Behavioral Invariant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Feed</td>
                      <td className="p-2.5">Independent cards / items</td>
                      <td className="p-2.5">1-column vertical stack (100% width)</td>
                      <td className="p-2.5">3–4+ column responsive grid</td>
                      <td className="p-2.5">
                        Reading order strictly follows DOM position across reflow
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">List-Detail</td>
                      <td className="p-2.5">Parent-child collection pairing</td>
                      <td className="p-2.5">1-pane drill-down with Top Bar Back button</td>
                      <td className="p-2.5">2-pane co-planar; active item highlighted</td>
                      <td className="p-2.5">
                        Back button in 1-pane detail only; scroll memory preserved
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Supporting Pane</td>
                      <td className="p-2.5">Focus document + Contextual tool</td>
                      <td className="p-2.5">Supporting pane placed below primary pane</td>
                      <td className="p-2.5">Supporting pane placed beside (360dp fixed)</td>
                      <td className="p-2.5">
                        Secondary panel must be meaningful only in relation to primary
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#0056FF]">Advanced Layering</td>
                      <td className="p-2.5">Temporary focused modal task</td>
                      <td className="p-2.5">Modal bottom sheet</td>
                      <td className="p-2.5">Levitated floating sheet / centered dialog</td>
                      <td className="p-2.5">
                        Elevates above canvas to preserve context while focusing task
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SELECTION MODES & INDICATORS (SURFACE, CHECK, BATCH)     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'selection' && (
        <div className="space-y-6">
          {/* Interactive Selection Workbench */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Selection Indicators &amp; Interaction Modes
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Surface Color Tint &middot; Checkmark Glyphs &middot; Active Pill Indicators
                  &middot; Touch CAB &middot; Desktop Hover Reveal
                </div>
              </div>

              {/* View Selector */}
              <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
                {(
                  [
                    { id: 'indicators', label: 'Indicators & Pills' },
                    { id: 'touch-modes', label: 'Touch & CAB Mode' },
                    { id: 'desktop-hover', label: 'Desktop Checkbox Reveal' },
                  ] as const
                ).map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectionTypeView(v.id)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all',
                      selectionTypeView === v.id
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Workbench Section */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* PASS / COMPLIANT PANEL */}
              <div className="space-y-3 rounded-xl border-2 border-emerald-500/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [PASS] Compliant Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">
                    Mode: {selectionTypeView}
                  </span>
                </div>

                {/* VIEW 1: INDICATORS & PILLS */}
                {selectionTypeView === 'indicators' && (
                  <div className="space-y-3">
                    <div className="font-mono text-[11px] text-slate-700">
                      Surface Tint + Checkmark Glyph + Single-Select Active Pills:
                    </div>

                    {/* Single-Select Active Navigation Pill */}
                    <div className="space-y-1.5 rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                      <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                        Active Pill Indicator (Navigation Rail / Tabs — Strictly Single Select):
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-xs">
                        {(['courses', 'exams', 'grades', 'finance'] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveNavTab(tab)}
                            className={cn(
                              'relative rounded-full px-3 py-1 font-bold transition-all',
                              activeNavTab === tab
                                ? 'bg-[#0056FF] text-white shadow-none'
                                : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                            )}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Selected Card Component with Tint & Checkbox */}
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      <div className="space-y-1 rounded-lg border-2 border-[#0056FF] bg-[#EFF5FF] p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0056FF]">Selected Card</span>
                          <span className="flex size-4 items-center justify-center rounded-full bg-[#0056FF] text-white">
                            <Check className="size-3" />
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-600">
                          Surface tint (#EFF5FF) + 2px #0056FF border
                        </div>
                      </div>

                      <div className="space-y-1 rounded-lg border border-[#CAD3F5] bg-white p-3 opacity-70">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Unselected Card</span>
                          <span className="size-4 rounded-full border border-slate-300 bg-white" />
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Neutral white surface + subtle border
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 2: TOUCH & CAB MODE */}
                {selectionTypeView === 'touch-modes' && (
                  <div className="space-y-3">
                    {/* Simulated Contextual Action Bar */}
                    <div className="flex items-center justify-between rounded-lg bg-[#0056FF] p-2.5 font-mono text-xs text-white">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedItems([])}
                          className="hover:opacity-80"
                        >
                          <X className="size-4" />
                        </button>
                        <span className="font-bold">{selectedItems.length} selected</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setSelectedItems(['item-1', 'item-2', 'item-3'])}
                          className="rounded bg-white/20 px-2 py-0.5 hover:bg-white/30"
                        >
                          Select All
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedItems([])}
                          className="rounded bg-white/20 px-2 py-0.5 hover:bg-white/30"
                        >
                          Done
                        </button>
                      </div>
                    </div>

                    {/* Touch Selection List */}
                    <div className="space-y-1.5 font-mono text-xs">
                      {[
                        { id: 'item-1', title: 'Mathematics Exam Room 402', time: 'Monday, 08:30' },
                        { id: 'item-2', title: 'Physics Lab Session B', time: 'Monday, 10:15' },
                        { id: 'item-3', title: 'Computer Science Lecture', time: 'Monday, 13:00' },
                      ].map((item) => {
                        const isSelected = selectedItems.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedItems((prev) =>
                                prev.includes(item.id)
                                  ? prev.filter((id) => id !== item.id)
                                  : [...prev, item.id],
                              );
                            }}
                            className={cn(
                              'flex cursor-pointer items-center justify-between rounded-lg border p-2.5 transition-all',
                              isSelected
                                ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0A1A4A]'
                                : 'border-[#CAD3F5] bg-white text-slate-700 hover:bg-[#F8FAFC]',
                            )}
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold">{item.title}</div>
                              <div className="text-[10px] text-slate-500">{item.time}</div>
                            </div>
                            <div
                              className={cn(
                                'flex size-5 items-center justify-center rounded transition-all',
                                isSelected
                                  ? 'bg-[#0056FF] text-white'
                                  : 'border border-slate-300 bg-white',
                              )}
                            >
                              {isSelected && <Check className="size-3.5" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* VIEW 3: DESKTOP HOVER REVEAL */}
                {selectionTypeView === 'desktop-hover' && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="text-[11px] text-slate-700">
                        Desktop Checkbox Reveal Logic:
                      </span>
                      <div className="inline-flex gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setDesktopTableMode('primary')}
                          className={cn(
                            'rounded px-2 py-0.5 font-bold',
                            desktopTableMode === 'primary'
                              ? 'bg-[#0056FF] text-white'
                              : 'bg-slate-100 text-slate-600',
                          )}
                        >
                          Primary Activity (Always Visible)
                        </button>
                        <button
                          type="button"
                          onClick={() => setDesktopTableMode('secondary')}
                          className={cn(
                            'rounded px-2 py-0.5 font-bold',
                            desktopTableMode === 'secondary'
                              ? 'bg-[#0056FF] text-white'
                              : 'bg-slate-100 text-slate-600',
                          )}
                        >
                          Secondary (Hover Reveal)
                        </button>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-[#CAD3F5]">
                      <table className="w-full text-left">
                        <thead className="border-b border-[#CAD3F5] bg-[#F8FAFC] text-[10px] text-slate-500 uppercase">
                          <tr>
                            <th className="w-8 px-3 py-2">
                              {desktopTableMode === 'primary' || selectedItems.length > 0 ? (
                                <input
                                  type="checkbox"
                                  checked={selectedItems.length === 3}
                                  onChange={() => {
                                    if (selectedItems.length === 3) setSelectedItems([]);
                                    else setSelectedItems(['item-1', 'item-2', 'item-3']);
                                  }}
                                  className="accent-[#0056FF]"
                                />
                              ) : null}
                            </th>
                            <th className="px-3 py-2">Course Name</th>
                            <th className="px-3 py-2">Credits</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { id: 'item-1', name: 'Software Engineering II', credits: '4' },
                            { id: 'item-2', name: 'Database Systems', credits: '3' },
                            { id: 'item-3', name: 'Network Security', credits: '3' },
                          ].map((row) => {
                            const isSelected = selectedItems.includes(row.id);
                            const isHovered = hoveredRowId === row.id;
                            const showCheckbox =
                              desktopTableMode === 'primary' ||
                              selectedItems.length > 0 ||
                              isHovered;

                            return (
                              <tr
                                key={row.id}
                                onMouseEnter={() => setHoveredRowId(row.id)}
                                onMouseLeave={() => setHoveredRowId(null)}
                                className={cn(
                                  'transition-colors',
                                  isSelected ? 'bg-[#EFF5FF]' : 'hover:bg-[#F8FAFC]',
                                )}
                              >
                                <td className="px-3 py-2">
                                  {showCheckbox ? (
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => {
                                        setSelectedItems((prev) =>
                                          prev.includes(row.id)
                                            ? prev.filter((id) => id !== row.id)
                                            : [...prev, row.id],
                                        );
                                      }}
                                      className="cursor-pointer accent-[#0056FF]"
                                    />
                                  ) : (
                                    <span className="inline-block size-3.5" />
                                  )}
                                </td>
                                <td className="px-3 py-2 font-bold text-[#0A1A4A]">{row.name}</td>
                                <td className="px-3 py-2 text-slate-600">{row.credits}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="font-mono text-[10px] text-slate-600">
                  Combines high-contrast surface tint with explicit glyphs; adapts desktop
                  visibility based on primary vs secondary interaction tasks.
                </div>
              </div>

              {/* ANTI-PATTERN COMPARISON PANEL */}
              <div className="space-y-3 rounded-xl border-2 border-red-400/40 bg-white p-4">
                <div className="flex items-center justify-between border-b border-red-100 pb-2">
                  <span className="rounded bg-red-600 px-2 py-0.5 font-mono text-xs font-black text-white">
                    [FAIL] Selection Anti-Pattern
                  </span>
                  <span className="font-mono text-[10px] font-bold text-red-600">
                    Ambiguity &amp; Conflicts
                  </span>
                </div>

                <div className="space-y-2 rounded-lg border border-red-200 bg-red-50/50 p-3 font-mono text-[11px] text-red-800">
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Indicator Clashing:</span>
                    <span className="font-bold text-red-900">
                      Zero surface change; relies solely on 10% opacity border
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Gesture Conflict:</span>
                    <span className="font-bold text-red-900">
                      Batch drag collides with draggable kanban cards
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-red-200 pb-1.5">
                    <span className="text-red-600">Navigation Multi-Select:</span>
                    <span className="font-bold text-red-900">
                      Selecting 2 tabs simultaneously in top bar
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-red-600">Missing CAB Toolbar:</span>
                    <span className="font-bold text-red-900">
                      No count displayed; user cannot bulk delete
                    </span>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-red-700">
                  Weak selection cues fail accessibility guidelines, while overloaded gestures
                  prevent users from moving cards reliably.
                </div>
              </div>
            </div>
          </div>

          {/* 8 Rules of Selection Architecture Matrix */}
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                8 Selection Architecture Invariants
              </span>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                Material 3 &middot; High Contrast
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">1. Three Modalities</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Combine surface tint (#EFF5FF), checkmark icons, and checkbox components.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">2. Single-Select Pills</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Navigation rails, drawers, and tabs strictly enforce single active item selection.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">3. Touch Shortcuts</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Enter selection mode via 500ms long-press, 2-finger tap, or avatar shortcut.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">4. Contextual Action Bar</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Display selected item count and contextual bulk actions (Archive, Delete, Done).
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">5. Gesture Conflict Guard</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Prohibit batch drag if long-press-and-drag is already bound to card reordering.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">6. Primary Table Checkboxes</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Keep checkboxes permanently visible when batch selection is the primary task.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">7. Secondary Hover Reveal</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Reveal checkbox on row hover; persist across all rows once first item is selected.
                </div>
              </div>

              <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                <div className="font-bold text-[#0056FF]">8. Clean Mode Dismissal</div>
                <div className="font-sans text-[10px] text-slate-600">
                  Deselecting all items or tapping Done immediately restores standard app bar.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: CO-DESIGN & 13 DIMENSIONS OF EXPERIENCE                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'inclusive' && (
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  13 Dimensions of Lived Experience
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Select a dimension to inspect design considerations and participatory co-design
                  checkpoints
                </div>
              </div>
              <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                Active: {selectedDimension}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {dimensions.map((dim) => {
                const isSelected = selectedDimension === dim.id;
                return (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => setSelectedDimension(dim.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all',
                      isSelected
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'border border-[#CAD3F5] bg-[#F8FAFC] text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    {dim.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4">
              <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                Design &amp; Evaluation Inquiry ({selectedDimension}):
              </div>
              <div className="font-sans text-xs leading-relaxed text-slate-700">
                {dimensions.find((d) => d.id === selectedDimension)?.inquiry}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Participatory Co-Design Loop
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-700">
                  Continuous Process
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  <div className="font-bold text-[#0056FF]">01. Partner</div>
                  <div className="font-sans text-[10px] text-slate-500">
                    Engage overlooked communities &amp; domain researchers early
                  </div>
                </div>
                <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  <div className="font-bold text-[#0056FF]">02. Co-Create</div>
                  <div className="font-sans text-[10px] text-slate-500">
                    Involve users directly in ideation and architecture
                  </div>
                </div>
                <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  <div className="font-bold text-[#0056FF]">03. Validate</div>
                  <div className="font-sans text-[10px] text-slate-500">
                    Test assumptions across diverse demographic cohorts
                  </div>
                </div>
                <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-3">
                  <div className="font-bold text-[#0056FF]">04. Iterate</div>
                  <div className="font-sans text-[10px] text-slate-500">
                    Evolve features, tone, and messaging iteratively
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  ML / AI Bias &amp; Harm Mitigation Guards
                </span>
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  Fairness Guards
                </span>
              </div>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="flex items-start gap-2 rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] p-2.5">
                  <ShieldKey className="mt-0.5 size-4 shrink-0 text-[#0056FF]" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0A1A4A]">
                      Dataset Parity &amp; Counterfactual Auditing
                    </div>
                    <div className="font-sans text-[10px] text-slate-600">
                      Prevent model bias by auditing training inputs across all 13 dimensions.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-[#CAD3F5] bg-white p-2.5">
                  <Eye className="mt-0.5 size-4 shrink-0 text-[#0056FF]" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0A1A4A]">
                      Harm Prevention &amp; Exclusion Defense
                    </div>
                    <div className="font-sans text-[10px] text-slate-600">
                      Detect and mitigate risks of algorithmic discrimination and accessibility
                      barriers.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-[#CAD3F5] bg-white p-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0A1A4A]">Continuous Community Feedback</div>
                    <div className="font-sans text-[10px] text-slate-600">
                      Actively channel community feedback into autonomous agent prompts &amp; rules.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: RESIZING & REFLOW (200% TEXT SCALER & TRUNCATION)      */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'resizing' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="space-y-1">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                Interactive Text Resizing Multiplier (&ge; 200% Standard)
              </span>
              <div className="font-mono text-[10px] text-slate-500">
                Font size &amp; line-height scale up proportionally; padding remains constant at 1x
              </div>
            </div>

            <div className="inline-flex items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1">
              {([1, 1.5, 2] as const).map((scale) => (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setTextScale(scale)}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 font-mono text-xs font-bold transition-all',
                    textScale === scale
                      ? 'bg-[#0056FF] text-white shadow-none'
                      : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                  )}
                >
                  {scale}x ({scale * 100}%)
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Component Scaling &amp; Constant 1x Padding
                </span>
                <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                  Scale: {textScale}x &middot; Padding: 8dp / 24dp
                </span>
              </div>

              <div className="space-y-4 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-6">
                <div
                  style={{
                    fontSize: `${14 * textScale}px`,
                    lineHeight: `${20 * textScale}px`,
                  }}
                  className="font-sans font-bold text-[#0A1A4A] transition-all"
                >
                  SNP International School Portal
                </div>
                <div
                  style={{
                    fontSize: `${12 * textScale}px`,
                    lineHeight: `${18 * textScale}px`,
                  }}
                  className="font-sans text-slate-600 transition-all"
                >
                  Scales seamlessly up to 200% without layout disruption.
                </div>

                <div
                  className={cn(
                    'flex gap-2 transition-all',
                    textScale === 2 ? 'flex-col items-stretch' : 'flex-row flex-wrap items-center',
                  )}
                >
                  <button
                    type="button"
                    style={{
                      fontSize: `${12 * textScale}px`,
                      lineHeight: `${16 * textScale}px`,
                      padding: '8px 24px',
                    }}
                    className="rounded-lg bg-[#0056FF] text-center font-sans font-bold text-white transition-all hover:bg-[#0048D9]"
                  >
                    Primary Action ({textScale}x)
                  </button>
                  <button
                    type="button"
                    style={{
                      fontSize: `${12 * textScale}px`,
                      lineHeight: `${16 * textScale}px`,
                      padding: '8px 24px',
                    }}
                    className="rounded-lg border border-[#CAD3F5] bg-white text-center font-sans font-bold text-[#0A1A4A] transition-all hover:bg-[#EFF5FF]"
                  >
                    Secondary Action
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-[11px] text-slate-600">
                <span>
                  {textScale === 2
                    ? 'Layout reflows to vertical stack automatically'
                    : 'Standard horizontal layout'}
                </span>
                <span className="font-bold text-emerald-600">[PASS &ge; 200%]</span>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Text Truncation &amp; Reveal Protocol
                </span>
                <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                  Expandable Reveal
                </span>
              </div>

              <div className="space-y-3 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
                <div className="space-y-1">
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">
                    Academic Schedule Notification
                  </div>
                  <div className="font-sans text-xs leading-relaxed text-slate-700">
                    {isTruncatedExpanded
                      ? 'SNP International School scheduled exams for Grade 12 students covering Advanced Mathematics, Computer Science, and Physics starting Monday 08:00 AM.'
                      : 'SNP International School scheduled exams for Grade 12 students covering...'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setIsTruncatedExpanded((prev) => !prev)}
                    className="font-mono text-xs font-bold text-[#0056FF] hover:underline"
                  >
                    {isTruncatedExpanded ? '[Show Less]' : '[Read Full Message]'}
                  </button>
                  <span className="font-mono text-[10px] text-slate-500">
                    {isTruncatedExpanded ? 'Fully Expanded' : 'Truncated with Ellipsis'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs font-bold text-[#0A1A4A]">
                    Fixed Navigation Bar / Rail Chrome
                  </span>
                  <div className="relative">
                    <button
                      type="button"
                      onMouseEnter={() => setShowFixedChromeTooltip(true)}
                      onMouseLeave={() => setShowFixedChromeTooltip(false)}
                      className="rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1 font-mono text-xs font-bold text-[#0056FF]"
                    >
                      Hover / Touch &amp; Hold
                    </button>
                    {showFixedChromeTooltip && (
                      <div className="animate-in fade-in absolute right-0 bottom-full z-20 mb-2 w-48 rounded-lg bg-[#0A1A4A] p-2 font-sans text-xs text-white shadow-none">
                        <div className="text-[13px] font-bold">Administration</div>
                        <div className="text-[10px] text-slate-300">Enlarged 2x Tooltip Label</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  Fixed app bars remain 1x; touch &amp; hold reveals enlarged 2x tooltip label
                  without clipping chrome
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: KEYBOARD & FOCUS ORDER                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'keyboard' && (
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  1. Focus Return Protocol (Dialog Trapping &amp; Restoration)
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Initial focus targets first action; Escape or dismissal returns focus to
                  initiating trigger
                </div>
              </div>
              <span
                className={cn(
                  'rounded px-2 py-0.5 font-mono text-[10px] font-bold transition-colors',
                  focusRestored ? 'bg-emerald-100 text-emerald-800' : 'bg-[#EFF5FF] text-[#0056FF]',
                )}
              >
                {focusRestored ? 'Focus Restored to Trigger' : 'Initial Trigger Ready'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                ref={triggerButtonRef}
                type="button"
                onClick={handleOpenDialog}
                aria-haspopup="dialog"
                aria-expanded={dialogOpen}
                className="rounded-lg bg-[#0056FF] px-4 py-2 font-sans text-xs font-bold text-white transition-all hover:bg-[#0048D9] focus-visible:ring-3 focus-visible:ring-[#0056FF] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Open Confirmation Dialog
              </button>
              <span className="font-mono text-xs text-slate-500">
                Press Space or Enter to open &middot; Test Escape key or buttons to restore focus
              </span>
            </div>

            {dialogOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="live-dialog-title"
                className="animate-in fade-in zoom-in-95 space-y-4 rounded-xl border-2 border-[#0056FF] bg-[#EFF5FF]/60 p-5 duration-150"
              >
                <div className="space-y-1">
                  <div
                    id="live-dialog-title"
                    className="font-sans text-sm font-bold text-[#0A1A4A]"
                  >
                    Discard Current Operation?
                  </div>
                  <div className="font-sans text-xs text-slate-600">
                    Are you sure you want to discard your draft? Focus is trapped inside this modal
                    boundary.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    ref={dialogConfirmRef}
                    type="button"
                    onClick={handleCloseDialog}
                    className="rounded-lg border border-[#CAD3F5] bg-white px-3.5 py-1.5 font-sans text-xs font-bold text-[#0A1A4A] hover:bg-[#EFF5FF] focus-visible:ring-3 focus-visible:ring-[#0056FF] focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Keep Editing
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseDialog}
                    className="rounded-lg bg-red-600 px-3.5 py-1.5 font-sans text-xs font-bold text-white hover:bg-red-700 focus-visible:ring-3 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    Discard Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  2. Roving Tabindex Pattern (1 Tab Stop Group + Arrow Key Traversal)
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Single Tab stop into container; ArrowLeft/ArrowRight moves sub-focus; Home/End
                  jumps to ends
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-bold text-[#0056FF]">
                  Active Index: {toolbarFocusedIndex}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
                  Tab Stops: 1
                </span>
              </div>
            </div>

            <div
              role="toolbar"
              aria-label="Text formatting tools"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-1.5"
            >
              {toolbarItems.map((item, index) => {
                const isFocused = toolbarFocusedIndex === index;
                return (
                  <button
                    key={item}
                    ref={(el) => {
                      toolbarRefs.current[index] = el;
                    }}
                    type="button"
                    tabIndex={isFocused ? 0 : -1}
                    aria-label={toolbarItemLabels[index]}
                    onClick={() => setToolbarFocusedIndex(index)}
                    onKeyDown={(e) => handleToolbarKeyDown(e, index)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all focus-visible:ring-3 focus-visible:ring-[#0056FF] focus-visible:ring-offset-1 focus-visible:outline-none',
                      isFocused
                        ? 'bg-[#0056FF] text-white shadow-none'
                        : 'border border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="font-mono text-[11px] text-slate-600">
              Use Tab to focus the group, then Arrow Left/Right to navigate between tools without
              cluttering tab stops.
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  3. Standard Multi-Key Shortcuts &amp; Single-Key Protection
                </span>
                <div className="font-mono text-[10px] text-slate-500">
                  Two or more keys required by default; single-key shortcuts require explicit opt-in
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0A1A4A]">Single-Key Remap</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={singleKeyEnabled}
                  aria-label="Toggle single-key shortcuts"
                  onClick={() => setSingleKeyEnabled((prev) => !prev)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
                    'focus-visible:ring-3 focus-visible:ring-[#0056FF] focus-visible:ring-offset-2 focus-visible:outline-none',
                    singleKeyEnabled ? 'bg-[#0056FF]' : 'bg-[#CAD3F5]',
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block size-5 rounded-full bg-white shadow-none transition duration-200',
                      singleKeyEnabled ? 'translate-x-5' : 'translate-x-0',
                    )}
                  />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#CAD3F5] bg-white">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#CAD3F5] bg-[#F8FAFC] text-[10px] font-bold text-slate-500 uppercase">
                    <th className="px-4 py-2.5">SHORTCUT</th>
                    <th className="px-4 py-2.5">TARGET ACTION</th>
                    <th className="px-4 py-2.5">SCOPE</th>
                    <th className="px-4 py-2.5">SINGLE-KEY STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-[#0056FF]">Cmd/Ctrl + K</td>
                    <td className="px-4 py-2.5 text-slate-800">Global Command Palette</td>
                    <td className="px-4 py-2.5 text-slate-500">Application Root</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-700">Multi-key Safe</td>
                  </tr>
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-[#0056FF]">Shift + ?</td>
                    <td className="px-4 py-2.5 text-slate-800">Shortcuts Help Center</td>
                    <td className="px-4 py-2.5 text-slate-500">Global Window</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-700">Multi-key Safe</td>
                  </tr>
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-[#0056FF]">Esc</td>
                    <td className="px-4 py-2.5 text-slate-800">Dismiss Dialog / Flyout</td>
                    <td className="px-4 py-2.5 text-slate-500">Active Modal</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-700">Native Reserved</td>
                  </tr>
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-[#0056FF]">Tab / Shift+Tab</td>
                    <td className="px-4 py-2.5 text-slate-800">Sequential Focus Traversal</td>
                    <td className="px-4 py-2.5 text-slate-500">Document Focus</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-700">Platform Standard</td>
                  </tr>
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-[#0056FF]">ArrowLeft / Right</td>
                    <td className="px-4 py-2.5 text-slate-800">Roving Tabindex Sub-Elements</td>
                    <td className="px-4 py-2.5 text-slate-500">Toolbars &amp; Menus</td>
                    <td className="px-4 py-2.5 font-bold text-emerald-700">Component Level</td>
                  </tr>
                  <tr className="hover:bg-[#EFF5FF]/40">
                    <td className="px-4 py-2.5 font-bold text-amber-700">J / K (Single Key)</td>
                    <td className="px-4 py-2.5 text-slate-800">Quick List Item Advance</td>
                    <td className="px-4 py-2.5 text-slate-500">Data Tables</td>
                    <td className="px-4 py-2.5 font-bold">
                      {singleKeyEnabled ? (
                        <span className="text-emerald-700">Active (Opt-in)</span>
                      ) : (
                        <span className="text-slate-400">Disabled (Safe)</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: CONTRAST & CLUSTERS                                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'contrast' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-center">
              <span className="font-mono text-lg font-black text-[#0056FF]">21:1</span>
              <div className="font-sans text-[11px] font-bold text-[#0A1A4A]">Peak Max</div>
              <div className="font-mono text-[9px] text-slate-400">Pure Black / White</div>
            </div>
            <div className="space-y-1 rounded-xl border border-[#0056FF] bg-[#EFF5FF] p-3.5 text-center">
              <span className="font-mono text-lg font-black text-[#0056FF]">16.5:1</span>
              <div className="font-sans text-[11px] font-bold text-[#0056FF]">SNPI Primary</div>
              <div className="font-mono text-[9px] font-bold text-blue-700">
                Navy on Canvas (AAA)
              </div>
            </div>
            <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-center">
              <span className="font-mono text-lg font-black text-[#0A1A4A]">&ge; 7:1</span>
              <div className="font-sans text-[11px] font-bold text-[#0A1A4A]">WCAG AAA</div>
              <div className="font-mono text-[9px] text-slate-500">Body &amp; Small Text</div>
            </div>
            <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-center">
              <span className="font-mono text-lg font-black text-[#0A1A4A]">&ge; 4.5:1</span>
              <div className="font-sans text-[11px] font-bold text-[#0A1A4A]">WCAG AA</div>
              <div className="font-mono text-[9px] text-slate-500">Regular Text Baseline</div>
            </div>
            <div className="space-y-1 rounded-xl border border-[#CAD3F5] bg-white p-3.5 text-center">
              <span className="font-mono text-lg font-black text-[#0A1A4A]">&ge; 3:1</span>
              <div className="font-sans text-[11px] font-bold text-[#0A1A4A]">UI Containers</div>
              <div className="font-mono text-[9px] text-slate-500">Large Text &amp; Icons</div>
            </div>
            <div className="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center opacity-70">
              <span className="font-mono text-lg font-bold text-slate-400">N/A</span>
              <div className="font-sans text-[11px] font-bold text-slate-500">Disabled</div>
              <div className="font-mono text-[9px] text-slate-400">Exempt from Ratio</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Clustered Elements (&ge; 3:1 Container Rule)
                </span>
                <span className="rounded bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                  Required &ge; 3:1
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
                <button
                  type="button"
                  className="rounded-lg bg-[#0056FF] px-3.5 py-1.5 font-sans text-xs font-bold text-white"
                >
                  Confirm (4.7:1)
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#2277FF] px-3.5 py-1.5 font-sans text-xs font-bold text-white"
                >
                  Edit (3.2:1)
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[#CAD3F5] bg-white px-3.5 py-1.5 font-sans text-xs font-bold text-[#0A1A4A]"
                >
                  Cancel (16.5:1)
                </button>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-600">
                <span>Grouped buttons must achieve &ge; 3:1 contrast against canvas</span>
                <span className="font-bold text-emerald-600">[PASS]</span>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Standalone Elements (Prominence Exception)
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                  Prominence Rule
                </span>
              </div>
              <div className="flex items-center justify-center rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] p-4">
                <div className="flex size-12 cursor-pointer items-center justify-center rounded-2xl bg-[#0056FF] text-white shadow-none transition-transform active:scale-95">
                  <Sliders className="size-5" />
                </div>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-slate-600">
                <span>Isolated FABs are distinguishable by spatial prominence</span>
                <span className="font-bold text-[#0056FF]">[EXEMPT]</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: HIERARCHY & LANDMARKS                                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Linear Reading Order (Screen Reader Map)
                </span>
                <span className="font-mono text-[10px] font-bold text-[#0056FF]">
                  1 &rarr; 2 &rarr; 3 &rarr; 4
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border-2 border-[#0056FF] bg-[#EFF5FF] p-3 text-left">
                  <span className="font-mono text-xs font-black text-[#0056FF]">01</span>
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">Top Left</div>
                  <div className="font-mono text-[9px] text-slate-500">DOM Index: 0</div>
                </div>
                <div className="rounded-xl border border-[#CAD3F5] bg-white p-3 text-left">
                  <span className="font-mono text-xs font-black text-slate-600">02</span>
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">Top Right</div>
                  <div className="font-mono text-[9px] text-slate-500">DOM Index: 1</div>
                </div>
                <div className="rounded-xl border border-[#CAD3F5] bg-white p-3 text-left">
                  <span className="font-mono text-xs font-black text-slate-600">03</span>
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">Bottom Left</div>
                  <div className="font-mono text-[9px] text-slate-500">DOM Index: 2</div>
                </div>
                <div className="rounded-xl border border-[#CAD3F5] bg-white p-3 text-left">
                  <span className="font-mono text-xs font-black text-slate-600">04</span>
                  <div className="font-sans text-xs font-bold text-[#0A1A4A]">Bottom Right</div>
                  <div className="font-mono text-[9px] text-slate-500">DOM Index: 3</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                  Heading Ladder (No Skipped Levels)
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-600">
                  Strict Sequential
                </span>
              </div>
              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="flex items-center justify-between rounded-lg border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1.5">
                  <span className="font-bold text-[#0056FF]">&lt;h1&gt; Single Page Title</span>
                  <span className="text-[10px] text-slate-500">1 per page</span>
                </div>
                <div className="ml-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-1.5">
                  <span className="font-bold text-[#0A1A4A]">
                    &lt;h2&gt; Primary Section Heading
                  </span>
                  <span className="text-[10px] text-slate-500">Major group</span>
                </div>
                <div className="ml-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-1.5">
                  <span className="font-bold text-[#0A1A4A]">&lt;h3&gt; Subsection Card Title</span>
                  <span className="text-[10px] text-slate-500">Never skip H2 &rarr; H4</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                8 W3C ARIA Landmark Roles
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                Unique aria-label for repeating roles
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs sm:grid-cols-4">
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">main</span>
                <div className="font-sans text-[10px] text-slate-500">Single core area</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">navigation</span>
                <div className="font-sans text-[10px] text-slate-500">Differentiated labels</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">banner</span>
                <div className="font-sans text-[10px] text-slate-500">Header &amp; toolbars</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">contentinfo</span>
                <div className="font-sans text-[10px] text-slate-500">Footer &amp; legal</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">complementary</span>
                <div className="font-sans text-[10px] text-slate-500">Sidebar &amp; aside</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">search</span>
                <div className="font-sans text-[10px] text-slate-500">Search inputs</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">region</span>
                <div className="font-sans text-[10px] text-slate-500">Named section blocks</div>
              </div>
              <div className="rounded-lg border border-[#CAD3F5] bg-[#F8FAFC] p-2.5">
                <span className="font-bold text-[#0056FF]">form</span>
                <div className="font-sans text-[10px] text-slate-500">Data capture bounds</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: TARGET SIZES & SPACING                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'targets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-center">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                Touch Target (&ge; 48&times;48dp)
              </span>
              <div className="flex items-center justify-center p-4">
                <div className="relative flex size-14 items-center justify-center rounded-xl border-2 border-dashed border-[#0056FF] bg-[#EFF5FF]">
                  <span className="absolute -top-2 rounded bg-[#0056FF] px-1 font-mono text-[8px] font-bold text-white">
                    48dp Hitbox
                  </span>
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#0056FF] text-white">
                    <Sliders className="size-4" />
                  </div>
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate-600">
                24dp visual icon with 12dp padding = 48dp hit area (7-10mm)
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-center">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                Pointer Target (&ge; 44&times;44px)
              </span>
              <div className="flex items-center justify-center p-4">
                <div className="relative flex size-12 items-center justify-center rounded-xl border-2 border-dashed border-[#2277FF] bg-[#EFF5FF]">
                  <span className="absolute -top-2 rounded bg-[#2277FF] px-1 font-mono text-[8px] font-bold text-white">
                    44px iOS/Mouse
                  </span>
                  <div className="flex size-6 items-center justify-center rounded-md bg-[#2277FF] text-white">
                    <Eye className="size-3.5" />
                  </div>
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate-600">
                Minimum bounding box for mouse and stylus precision
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-white p-5 text-center">
              <span className="font-sans text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
                Inter-Target Spacing (&ge; 8dp)
              </span>
              <div className="flex items-center justify-center p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white font-mono text-xs font-bold text-[#0A1A4A]">
                    A
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[8px] font-bold text-[#0056FF]">
                      &harr; 8dp
                    </span>
                    <div className="h-0.5 w-6 bg-[#0056FF]" />
                  </div>
                  <div className="flex size-10 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white font-mono text-xs font-bold text-[#0A1A4A]">
                    B
                  </div>
                </div>
              </div>
              <div className="font-mono text-[11px] text-slate-600">
                8dp minimum separation prevents accidental touch collisions
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
