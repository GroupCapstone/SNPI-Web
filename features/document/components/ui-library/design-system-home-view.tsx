'use client';

import * as React from 'react';
import { BrandConceptBlueprint } from './brand-concept-blueprint';
import { BlueprintHero } from './page-heroes';
import { ColorRampsTokens } from './color-ramps-tokens';
import { CoreComponentsMaintenanceStudio } from './core-components-maintenance-studio';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ShieldKey,
  Sliders,
  AppWindow,
  X,
  Layers,
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
    description:
      'Brand drives every single decision you make when building new products or features.',
    children: [
      {
        id: 'brand-blueprint',
        label: 'Brand Blueprint & Assets',
        index: '01',
      },
      {
        id: 'brand-logo-design',
        label: 'Asterisk Logo Design (3-Shape)',
        index: '01.1',
      },
      { id: 'brand-vision', label: 'Vision', index: 'B1' },
      { id: 'brand-principles', label: 'Design Principles', index: 'B2' },
      { id: 'brand-tone-of-voice', label: 'Tone of Voice', index: 'B3' },
      { id: 'brand-terminology', label: 'Terminology', index: 'B4' },
      { id: 'brand-assets', label: 'Brand Assets', index: 'B5' },
    ],
  },
  {
    id: 'foundations-group',
    label: 'Foundations',
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
];

function getSidebarGroupIcon(id: string) {
  switch (id) {
    case 'brand-group':
      return ShieldKey;
    case 'foundations-group':
      return Sliders;
    case 'core-components-group':
      return AppWindow;
    case 'maintenance-group':
      return Settings;
    default:
      return Layers;
  }
}

export function DesignSystemHomeView() {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({});
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
      [nodeId]: !Boolean(prev[nodeId]),
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
          className="hidden w-full shrink-0 border-b border-[#CAD3F5] bg-white lg:sticky lg:top-[68px] lg:block lg:h-[calc(100vh-68px)] lg:w-[320px] lg:overflow-y-auto lg:border-r lg:border-b-0 xl:w-[340px]"
        >
          <div className="space-y-4 p-4 lg:p-5">
            {/* Header Identity: Brand Title */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-sans text-sm font-extrabold tracking-tight text-[#020617]">
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
                className="h-11 w-full rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] py-2 pr-12 pl-10 font-sans text-sm font-medium text-[#020617] transition-colors placeholder:font-normal placeholder:text-[#0056FF]/60 hover:border-[#2277FF] focus:border-[#0056FF] focus:bg-white focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-none focus-visible:outline-none"
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
            <nav aria-label="Foundations Outline" className="space-y-1 pt-1">
              {filteredTree.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(expandedNodes[item.id]) || searchQuery.length > 0;
                const isSelected = selectedNode === item.id;
                const GroupIcon = getSidebarGroupIcon(item.id);

                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          toggleNode(item.id);
                        }
                        scrollToSection(item.id);
                      }}
                      className={cn(
                        'group flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left font-sans text-xs font-bold transition-all',
                        isSelected
                          ? 'bg-[#EFF5FF] text-[#020617]'
                          : 'text-[#020617] hover:bg-slate-100/70',
                      )}
                      title={item.label}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
                        <GroupIcon className="size-4.5 shrink-0 stroke-[2] text-[#020617]" />
                        <span className="min-w-0 flex-1 leading-snug font-bold tracking-tight break-words text-slate-900">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        {hasChildren &&
                          (isExpanded ? (
                            <ChevronDown className="size-3.5 text-slate-400 transition-colors group-hover:text-slate-700" />
                          ) : (
                            <ChevronRight className="size-3.5 text-slate-400 transition-colors group-hover:text-slate-700" />
                          ))}
                      </div>
                    </button>

                    {/* Submenu Children: Drop-Down List on tap */}
                    {hasChildren && isExpanded && (
                      <div className="ml-3.5 space-y-0.5 border-l-2 border-[#CAD3F5] py-0.5 pl-2.5">
                        {item.children?.map((child) => {
                          const isChildSelected = selectedNode === child.id;
                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => scrollToSection(child.id)}
                              title={child.label}
                              className={cn(
                                'group flex w-full cursor-pointer items-start justify-between gap-1.5 rounded-md px-2 py-1.5 text-left font-sans text-xs transition-colors',
                                isChildSelected
                                  ? 'bg-[#EFF5FF] font-bold text-[#0056FF]'
                                  : 'text-slate-600 hover:bg-slate-100/60 hover:text-[#020617]',
                              )}
                            >
                              <div className="flex min-w-0 flex-1 items-start gap-2">
                                {child.index ? (
                                  <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold text-[#0056FF]">
                                    {child.index}
                                  </span>
                                ) : null}
                                <span className="min-w-0 flex-1 leading-snug break-words">
                                  {child.label}
                                </span>
                              </div>
                              {child.badge &&
                                !child.badge.includes('/') &&
                                child.badge.toLowerCase() !== 'completed' && (
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
                <ShieldKey className="size-6 shrink-0 stroke-[2] text-[#020617]" />
                <h1 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                  Brand Blueprint &amp; Assets
                </h1>
              </div>

              <BlueprintHero />

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
                  <Sliders className="size-6 shrink-0 stroke-[2] text-[#020617]" />
                  <h2 className="font-sans text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
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
            {/* CORE COMPONENTS • MAINTENANCE STUDIO (PHASES 03 & 04)   */}
            {/* ------------------------------------------------------- */}
            <CoreComponentsMaintenanceStudio />
          </div>
        </main>
      </div>
    </div>
  );
}
