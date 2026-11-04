'use client';

import * as React from 'react';
import { BrandConceptBlueprint } from './brand-concept-blueprint';
import { ColorRampsTokens } from './color-ramps-tokens';
import { AccessibleDesignPrinciples } from './accessible-design-principles';
import { MaterialGlossarySection } from './material-glossary-section';
import { ScaffoldArchitectureSection } from './scaffold-architecture-section';
import { DesignLanguageManual } from './design-language-manual';
import { CoreComponentsManual } from './core-components-manual';
import { MaintenanceManual } from './maintenance-manual';
import { CulinaryTaxonomySection } from './culinary-taxonomy-section';
import { PsychologicalRuleInspector } from './psychological-rule-inspector';
import { OpenSourceChecklistSection } from './open-source-checklist-section';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ShieldKey,
  Sliders,
  Accessibility,
  BookOpen,
  AppWindow,
  X,
  Layers,
  Sparkles,
  Check,
  Settings,
} from '@/components/icons';
import { cn } from '@/lib/utils';

interface NavTreeItem {
  id: string;
  label: string;
  href?: string;
  badge?: string;
  badgeColor?: 'emerald' | 'blue' | 'slate';
  description?: string;
  isExternal?: boolean;
  children?: {
    id: string;
    label: string;
    href?: string;
    badge?: string;
    badgeColor?: 'emerald' | 'blue' | 'slate';
    index?: string;
  }[];
}

// MANDATORY INVARIANT: Sections 01 (Brand Blueprint & Assets / Brand Colors)
// and 02 (Color Ramps & Semantic Tokens) MUST ALWAYS REMAIN PRIMARY AND
// IMMUTABLE AT THE TOP OF THE BLUEPRINT MENU. NEVER REMOVE, REORDER, OR ALTER.
const SIDEBAR_TREE: NavTreeItem[] = [
  {
    id: 'brand-group',
    label: 'Brand',
    badge: 'Completed',
    badgeColor: 'emerald',
    description:
      'Brand drives every single decision you make when building new products or features.',
    children: [
      {
        id: 'brand-blueprint',
        label: 'Brand Blueprint & Assets',
        index: '01',
        badge: 'Completed',
        badgeColor: 'emerald',
      },
      { id: 'brand-vision', label: 'Vision', index: 'B1' },
      { id: 'brand-principles', label: 'Design Principles', index: 'B2' },
      { id: 'brand-tone-of-voice', label: 'Tone of Voice', index: 'B3' },
      { id: 'brand-terminology', label: 'Terminology', index: 'B4' },
      { id: 'brand-assets', label: 'Brand Assets', index: 'B5' },
    ],
  },
  {
    id: 'guidelines-group',
    label: 'Guidelines',
    badge: '0/5',
    badgeColor: 'blue',
    description:
      'Understanding how to approach common UX patterns will allow your organization to establish a consistent approach.',
    children: [
      {
        id: 'accessible-design-principles',
        label: 'Accessibility Guidelines',
        index: '03',
        badge: '0/1',
        badgeColor: 'blue',
      },
      {
        id: 'guidelines-writing',
        label: 'Writing Guidelines',
        index: 'G1',
        badge: '0/1',
        badgeColor: 'blue',
      },
      {
        id: 'guidelines-microcopy',
        label: 'Microcopy Guidelines',
        index: 'G2',
        badge: '0/1',
        badgeColor: 'blue',
      },
      {
        id: 'material-a-z-glossary',
        label: 'Terminology & Material Lexicon',
        index: '04',
        badge: '0/1',
        badgeColor: 'blue',
      },
      {
        id: 'guidelines-i18n',
        label: 'Internationalisation (Khmer & English)',
        index: 'G3',
        badge: '0/1',
        badgeColor: 'blue',
      },
    ],
  },
  {
    id: 'foundations-group',
    label: 'Foundations',
    badge: '0/26',
    badgeColor: 'blue',
    description:
      'Design assets and tokens that store values for the base layer of your design system.',
    children: [
      {
        id: 'color-ramps-tokens',
        label: 'Color Ramps & Semantic Tokens',
        index: '02',
        badge: '0/4',
        badgeColor: 'blue',
      },
      {
        id: 'layout-scaffold-architecture',
        label: 'Layout & Scaffold Architecture',
        index: '05',
        badge: '0/4',
        badgeColor: 'blue',
      },
      {
        id: 'culinary-taxonomy-section',
        label: 'Culinary Component Taxonomy',
        index: '06',
        badge: '6 Tiers',
        badgeColor: 'blue',
      },
      {
        id: 'psychological-rule-inspector',
        label: 'Psychological Design Rules (HCI)',
        index: '07',
        badge: 'Live Auditor',
        badgeColor: 'blue',
      },
      {
        id: 'foundations-typography',
        label: 'Typography Scale',
        index: 'F1',
        badge: '0/5',
        badgeColor: 'blue',
      },
      {
        id: 'foundations-elevation',
        label: 'Elevation & Z-Index',
        index: 'F2',
        badge: '0/3',
        badgeColor: 'blue',
      },
      {
        id: 'foundations-motion',
        label: 'Motion & Physics',
        index: 'F3',
        badge: '0/3',
        badgeColor: 'blue',
      },
      {
        id: 'foundations-iconography',
        label: 'Iconography Standards',
        index: 'F4',
        badge: '0/7',
        badgeColor: 'blue',
      },
    ],
  },
  {
    id: 'core-components-group',
    label: 'Core Components',
    badge: '0/166',
    badgeColor: 'blue',
    description:
      'Components are the main building blocks for user interfaces, reducing design and tech debt.',
    children: [
      { id: 'comp-accordion', label: 'Accordion', index: 'C1', badge: '0/4', badgeColor: 'blue' },
      { id: 'comp-alert', label: 'Alert', index: 'C2', badge: '0/6', badgeColor: 'blue' },
      { id: 'comp-avatar', label: 'Avatar', index: 'C3', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-badge', label: 'Badge', index: 'C4', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-button', label: 'Button', index: 'C5', badge: '0/10', badgeColor: 'blue' },
      {
        id: 'comp-breadcrumbs',
        label: 'Breadcrumbs',
        index: 'C6',
        badge: '0/4',
        badgeColor: 'blue',
      },
      { id: 'comp-calendar', label: 'Calendar', index: 'C7', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-card', label: 'Card', index: 'C8', badge: '0/5', badgeColor: 'blue' },
      { id: 'comp-carousel', label: 'Carousel', index: 'C9', badge: '0/6', badgeColor: 'blue' },
      { id: 'comp-checkbox', label: 'Checkbox', index: 'C10', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-divider', label: 'Divider', index: 'C11', badge: '0/2', badgeColor: 'blue' },
      { id: 'comp-dropdown', label: 'Dropdown', index: 'C12', badge: '0/6', badgeColor: 'blue' },
      { id: 'comp-icon', label: 'Icon', index: 'C13', badge: '0/3', badgeColor: 'blue' },
      { id: 'comp-image', label: 'Image', index: 'C14', badge: '0/4', badgeColor: 'blue' },
      { id: 'comp-link', label: 'Link', index: 'C15', badge: '0/6', badgeColor: 'blue' },
      { id: 'comp-list', label: 'List', index: 'C16', badge: '0/3', badgeColor: 'blue' },
      {
        id: 'comp-loading',
        label: 'Loading indicator',
        index: 'C17',
        badge: '0/5',
        badgeColor: 'blue',
      },
      { id: 'comp-modal', label: 'Modal', index: 'C18', badge: '0/8', badgeColor: 'blue' },
      {
        id: 'comp-pagination',
        label: 'Pagination',
        index: 'C19',
        badge: '0/6',
        badgeColor: 'blue',
      },
      {
        id: 'comp-progress-bar',
        label: 'Progress bar',
        index: 'C20',
        badge: '0/4',
        badgeColor: 'blue',
      },
      { id: 'comp-radio', label: 'Input radio', index: 'C21', badge: '0/5', badgeColor: 'blue' },
      { id: 'comp-select', label: 'Select', index: 'C22', badge: '0/8', badgeColor: 'blue' },
      { id: 'comp-skeleton', label: 'Skeleton', index: 'C23', badge: '0/4', badgeColor: 'blue' },
      { id: 'comp-switch', label: 'Switch', index: 'C24', badge: '0/5', badgeColor: 'blue' },
      { id: 'comp-tabs', label: 'Tabs', index: 'C25', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-textarea', label: 'Text area', index: 'C26', badge: '0/7', badgeColor: 'blue' },
      { id: 'comp-textfield', label: 'Text field', index: 'C27', badge: '0/9', badgeColor: 'blue' },
      { id: 'comp-toast', label: 'Toast', index: 'C28', badge: '0/8', badgeColor: 'blue' },
      { id: 'comp-tooltip', label: 'Tooltip', index: 'C29', badge: '0/3', badgeColor: 'blue' },
    ],
  },
  {
    id: 'maintenance-group',
    label: 'Maintenance',
    badge: '0/28',
    badgeColor: 'blue',
    description:
      'Design systems strategy, documentation, local libraries, team processes, community support, and contribution.',
    children: [
      {
        id: 'maint-documentation',
        label: 'Documentation',
        index: 'M1',
        badge: '0/10',
        badgeColor: 'blue',
      },
      {
        id: 'maint-local-libraries',
        label: 'Local libraries',
        index: 'M2',
        badge: '0/4',
        badgeColor: 'blue',
      },
      {
        id: 'maint-team-processes',
        label: 'Team processes',
        index: 'M3',
        badge: '0/6',
        badgeColor: 'blue',
      },
      {
        id: 'maint-community-support',
        label: 'Community support',
        index: 'M4',
        badge: '0/4',
        badgeColor: 'blue',
      },
      {
        id: 'maint-contribution',
        label: 'Contribution',
        index: 'M5',
        badge: '0/4',
        badgeColor: 'blue',
      },
    ],
  },
  {
    id: 'open-source-checklist-group',
    label: 'Open-Source Checklist',
    badge: '5/230',
    badgeColor: 'emerald',
    description:
      'Unified macro-phases tracking (230 total checks): Design language (5/10), Foundations (0/26), Core components (0/166), and Maintenance (0/28).',
    children: [
      {
        id: 'open-source-checklist-macro-phases',
        label: 'All 230 Macro-Phase Checks',
        index: 'CK',
        badge: '5/230',
        badgeColor: 'emerald',
      },
      {
        id: 'design-language-manual',
        label: '1. Design Language',
        index: 'P1',
        badge: '5/10',
        badgeColor: 'emerald',
      },
      {
        id: 'color-ramps-tokens',
        label: '2. Foundations',
        index: 'P2',
        badge: '0/26',
        badgeColor: 'blue',
      },
      {
        id: 'core-components-section',
        label: '3. Core Components',
        index: 'P3',
        badge: '0/166',
        badgeColor: 'blue',
      },
      {
        id: 'maintenance-manual-section',
        label: '4. Maintenance Strategy',
        index: 'P4',
        badge: '0/28',
        badgeColor: 'blue',
      },
    ],
  },
];

function getSidebarGroupIcon(id: string) {
  switch (id) {
    case 'brand-group':
      return ShieldKey;
    case 'guidelines-group':
      return BookOpen;
    case 'foundations-group':
      return Sliders;
    case 'core-components-group':
      return AppWindow;
    case 'maintenance-group':
      return Settings;
    case 'open-source-checklist-group':
      return Sparkles;
    default:
      return Layers;
  }
}

export function DesignSystemHomeView() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({
    'brand-group': true,
    'guidelines-group': true,
    'foundations-group': true,
    'core-components-group': true,
    'maintenance-group': true,
    'open-source-checklist-group': true,
  });
  const [selectedNode, setSelectedNode] = React.useState<string>('brand-blueprint');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K or / to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        const tagName = document.activeElement?.tagName.toLowerCase();
        if (tagName !== 'input' && tagName !== 'textarea') {
          e.preventDefault();
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
      } else if (e.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setSearchQuery('');
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const filteredTree = React.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return SIDEBAR_TREE;

    return SIDEBAR_TREE.map((node) => {
      const parentMatches =
        node.label.toLowerCase().includes(q) ||
        (node.description?.toLowerCase().includes(q) ?? false);
      const matchingChildren = node.children?.filter((child) =>
        child.label.toLowerCase().includes(q),
      );
      if (parentMatches || (matchingChildren && matchingChildren.length > 0)) {
        return {
          ...node,
          children:
            matchingChildren && matchingChildren.length > 0 ? matchingChildren : node.children,
        };
      }
      return null;
    }).filter(Boolean) as NavTreeItem[];
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    setSelectedNode(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-68px)] bg-white text-slate-900">
      {/* 2-COLUMN SLDS 2 ARCHITECTURE: LEFT SIDEBAR + RIGHT MAIN CONTENT */}
      <div className="mx-auto flex max-w-[1560px] flex-col lg:flex-row">
        {/* ========================================================= */}
        {/* LEFT COLUMN: STICKY NAVIGATION SIDEBAR                    */}
        {/* ========================================================= */}
        <aside
          aria-label="Design System Navigation"
          className="w-full shrink-0 border-b border-[#CAD3F5] bg-white lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] lg:w-[320px] lg:overflow-y-auto lg:border-r lg:border-b-0 xl:w-[340px]"
        >
          <div className="space-y-4 p-4 lg:p-5">
            {/* Header Identity: Brand Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-sm font-extrabold tracking-tight text-[#0A1A4A]">
                SNPI System
              </span>
            </div>

            {/* Quick Search Input (Clean Minimalist Standard) */}
            <div className="group relative flex items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-[#0056FF]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search design manual..."
                className="h-9.5 w-full rounded-xl border border-[#CAD3F5] bg-[#F8FAFC] py-2 pr-12 pl-9 font-sans text-xs font-medium text-[#0A1A4A] shadow-2xs transition-all placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-[#0056FF] focus:bg-white focus:shadow-xs focus:ring-2 focus:ring-[#0056FF]/15 focus:outline-none focus-visible:outline-none"
                style={{ outline: 'none' }}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  title="Clear search"
                  className="absolute right-2.5 flex size-5 cursor-pointer items-center justify-center rounded-md text-[#0056FF] transition-colors hover:bg-blue-50 active:scale-95"
                >
                  <X className="size-3.5 stroke-[2.5]" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-2.5 inline-flex items-center gap-0.5 rounded-md border border-[#CAD3F5] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400 shadow-2xs transition-colors select-none group-focus-within:border-[#0056FF]/40 group-focus-within:text-[#0056FF]">
                  <span className="font-sans text-[11px]">⌘</span>K
                </kbd>
              )}
            </div>

            {/* Search Match Results Indicator */}
            {searchQuery && (
              <div className="flex items-center justify-between px-1 font-mono text-[10px] text-slate-500">
                <span>
                  {filteredTree.length} section{filteredTree.length === 1 ? '' : 's'} matched
                </span>
                {filteredTree.length === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="font-sans text-[10px] font-bold text-[#0056FF] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}

            {/* Navigation Tree */}
            <nav aria-label="Foundations Outline" className="space-y-2 pt-1">
              {filteredTree.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = expandedNodes[item.id] || searchQuery.length > 0;
                const isSelected = selectedNode === item.id;
                const GroupIcon = getSidebarGroupIcon(item.id);

                return (
                  <div
                    key={item.id}
                    className="space-y-1 rounded-xl border border-slate-100 bg-[#F8FAFC]/50 p-1.5"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleNode(item.id);
                        } else {
                          scrollToSection(item.id);
                        }
                      }}
                      className={cn(
                        'group flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-left font-sans text-xs font-bold transition-colors',
                        isSelected
                          ? 'bg-[#EFF5FF] text-[#0056FF]'
                          : 'text-[#0A1A4A] hover:bg-white',
                      )}
                      title={item.label}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2 pr-2">
                        <GroupIcon className="size-4 shrink-0 text-[#0056FF]" />
                        <span className="min-w-0 flex-1 leading-snug font-black tracking-tight break-words">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={cn(
                              'py-0.2 rounded-md px-1.5 font-mono text-[9px] font-bold',
                              item.badgeColor === 'emerald' &&
                                'border border-emerald-300 bg-emerald-50 text-emerald-700',
                              item.badgeColor === 'blue' &&
                                'border border-[#0056FF]/30 bg-[#EFF5FF] text-[#0056FF]',
                              item.badgeColor === 'slate' &&
                                'border border-slate-200 bg-slate-50 text-slate-600',
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                        {hasChildren &&
                          (isExpanded ? (
                            <ChevronDown className="size-3.5 text-[#0056FF] transition-colors" />
                          ) : (
                            <ChevronRight className="size-3.5 text-[#0056FF] transition-colors" />
                          ))}
                      </div>
                    </button>

                    {/* Submenu Children */}
                    {hasChildren && isExpanded && (
                      <div className="ml-1 space-y-0.5 border-l border-[#CAD3F5] pl-2">
                        {item.children?.map((child) => {
                          const isChildSelected = selectedNode === child.id;
                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => scrollToSection(child.id)}
                              title={child.label}
                              className={cn(
                                'group flex w-full cursor-pointer items-start justify-between gap-1.5 rounded-lg px-2 py-1.5 text-left font-sans text-xs transition-colors',
                                isChildSelected
                                  ? 'bg-[#EFF5FF] font-bold text-[#0056FF]'
                                  : 'text-slate-600 hover:bg-white hover:text-slate-900',
                              )}
                            >
                              <div className="flex min-w-0 flex-1 items-start gap-2">
                                {child.index ? (
                                  <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold text-[#0056FF]">
                                    {child.index}
                                  </span>
                                ) : (
                                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#0056FF]" />
                                )}
                                <span className="min-w-0 flex-1 leading-snug break-words">
                                  {child.label}
                                </span>
                              </div>
                              {child.badge && (
                                <span
                                  className={cn(
                                    'py-0.2 ml-1 shrink-0 rounded px-1.5 font-mono text-[9px] font-bold',
                                    child.badgeColor === 'emerald'
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-[#EFF5FF] text-[#0056FF]',
                                  )}
                                >
                                  {child.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: MAIN CONTENT FEED AREA                      */}
        {/* ========================================================= */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="mx-auto max-w-[1080px] space-y-12">
            {/* ------------------------------------------------------- */}
            {/* BRAND BLUEPRINT & ASSETS (SECTION 01)                   */}
            {/* ------------------------------------------------------- */}
            <section
              id="brand-blueprint"
              className="scroll-mt-24 space-y-8 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              {/* Section Header Title */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <ShieldKey className="size-6 shrink-0 text-[#0056FF]" />
                <h1 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                  Brand Blueprint &amp; Assets
                </h1>
              </div>

              {/* Core Brand Blueprint Components */}
              <BrandConceptBlueprint />
            </section>

            {/* ------------------------------------------------------- */}
            {/* COLOR RAMPS & SEMANTIC TOKENS (SECTION 02)              */}
            {/* ------------------------------------------------------- */}
            <section
              id="color-ramps-tokens"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              {/* Section Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <Sliders className="size-6 shrink-0 text-[#0056FF]" />
                  <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                    Color Ramps &amp; Semantic Tokens
                  </h2>
                </div>
                <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Contrast-checked color ramps and semantic tokens, built to start a project and
                  hand to your agent.
                </p>
              </div>

              {/* Color Ramps & Semantic Tokens Engine */}
              <ColorRampsTokens />
            </section>

            {/* ------------------------------------------------------- */}
            {/* PRINCIPLES FOR ACCESSIBLE DESIGN (SECTION 03)           */}
            {/* ------------------------------------------------------- */}
            <section
              id="accessible-design-principles"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              {/* Section Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <Accessibility className="size-6 shrink-0 text-[#0056FF]" />
                  <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                    Principles for Accessible Design
                  </h2>
                </div>
                <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Anticipate, include, and respond to the needs of individuals across visual, motor,
                  and cognitive domains for inclusive, equitable outcomes.
                </p>
              </div>

              {/* Accessible Design Principles Engine */}
              <AccessibleDesignPrinciples />
            </section>

            {/* ------------------------------------------------------- */}
            {/* MATERIAL DESIGN 3 A-Z ARCHITECTURAL LEXICON (SECTION 04)*/}
            {/* ------------------------------------------------------- */}
            <section
              id="material-a-z-glossary"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              {/* Section Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="size-6 shrink-0 text-[#0056FF]" />
                  <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                    Material Design A-Z Lexicon
                  </h2>
                </div>
                <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Authoritative engineering reference covering all core Material Design 3 concepts,
                  components, HCT color science, and design token hierarchies.
                </p>
              </div>

              {/* Material A-Z Interactive Glossary Engine */}
              <MaterialGlossarySection />
            </section>

            {/* ------------------------------------------------------- */}
            {/* MATERIAL DESIGN 3 LAYOUT SCAFFOLD ARCHITECTURE (SEC 05) */}
            {/* ------------------------------------------------------- */}
            <section
              id="layout-scaffold-architecture"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              {/* Section Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <AppWindow className="size-6 shrink-0 text-[#0056FF]" />
                  <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
                    Layout Scaffold Architecture
                  </h2>
                </div>
                <p className="max-w-3xl font-sans text-xs leading-relaxed text-slate-500 sm:text-sm">
                  A fundamental UI design structure that provides a standard platform for assembling
                  key components into Bars, Rails, Panes, and Safety Regions.
                </p>
              </div>

              {/* Layout Scaffold Interactive Engine */}
              <ScaffoldArchitectureSection />
            </section>

            {/* ------------------------------------------------------- */}
            {/* CULINARY COMPONENT TAXONOMY (SECTION 06)                */}
            {/* ------------------------------------------------------- */}
            <section
              id="culinary-taxonomy-section"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <CulinaryTaxonomySection />
            </section>

            {/* ------------------------------------------------------- */}
            {/* PSYCHOLOGICAL DESIGN RULES (SECTION 07)                 */}
            {/* ------------------------------------------------------- */}
            <section
              id="psychological-rule-inspector"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <PsychologicalRuleInspector />
            </section>

            {/* ------------------------------------------------------- */}
            {/* DESIGN LANGUAGE MANUAL (BRAND, GUIDELINES, FOUNDATIONS) */}
            {/* ------------------------------------------------------- */}
            <section
              id="design-language-manual"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <DesignLanguageManual />
            </section>

            {/* ------------------------------------------------------- */}
            {/* CORE COMPONENTS MANUAL (29 PRIMITIVES & VERIFICATION)   */}
            {/* ------------------------------------------------------- */}
            <section
              id="core-components-section"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <CoreComponentsManual />
            </section>

            {/* ------------------------------------------------------- */}
            {/* MAINTENANCE STRATEGY MANUAL (5 PILLARS & 28 CHECKS)     */}
            {/* ------------------------------------------------------- */}
            <section
              id="maintenance-manual-section"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <MaintenanceManual />
            </section>

            {/* ------------------------------------------------------- */}
            {/* OPEN-SOURCE CHECKLIST MACRO-PHASES (230 TOTAL CHECKS)   */}
            {/* ------------------------------------------------------- */}
            <section
              id="open-source-checklist-macro-phases"
              className="scroll-mt-24 space-y-6 rounded-2xl border border-[#CAD3F5] bg-white p-6 sm:p-8 lg:p-10"
            >
              <OpenSourceChecklistSection />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
