'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AsteriskLogo } from './asterisk-logo';
import {
  FileText,
  Layers,
  Code,
  Menu,
  X,
  Search,
  Moon,
  ChevronRight,
  ChevronDown,
  Folder,
  Plus,
  ShieldKey,
  LayoutGrid,
} from '@/components/icons';
import { getNavIcon, getParentGroupIcon, getParentCategoryTheme } from './component-nav-icons';
import { HangingTabsNav, type HangingTabItem } from './hanging-tabs-nav';
import { HookSidebar } from './hook-sidebar';
import { useDocsNav } from './docs-nav-context';
import {
  COMPONENT_CATEGORIES,
  COMPONENT_LIBRARY_REGISTRY,
  COMPONENT_GROUPS_NAV,
  type M3NavItem,
  M3_COMPONENTS_NAV,
  PLATFORM_COMPONENTS_NAV,
  getComponentFreshness,
  getCategoryHierarchicalNodes,
} from './component-registry';
import { cn } from '@/lib/utils';

export interface DocsStickyHeaderProps {
  activeTab?: 'openapi' | 'library' | 'release' | 'document';
  version?: string;
  commitHash?: string;
}

const OPEN_API_SECTIONS = [
  { id: 'changelogs', label: 'Change Logs' },
  { id: 'toc', label: 'Table of contents' },
  { id: 'introduction', label: 'Introduction & Scope' },
  { id: 'overall-api', label: 'Overall API Matrix' },
  { id: 'security', label: 'Security & Access Control' },
  { id: 'status-codes', label: 'HTTP Status Codes' },
  { id: 'public-apis', label: 'Public Services (/health, /certificates)' },
  { id: 'protected-apis', label: 'Protected Services (/auth, /students, etc.)' },
];

const DESIGN_SYSTEM_SECTIONS = [
  { id: 'brand-blueprint', label: '01 Brand Blueprint & Assets' },
  { id: 'color-ramps-tokens', label: '02 Color Ramps & Semantic Tokens' },
  { id: 'accessible-design-principles', label: '03 Accessible Design Principles' },
  { id: 'material-a-z-glossary', label: '04 Material Design 3 Lexicon' },
  { id: 'layout-scaffold-architecture', label: '05 Layout Scaffold Architecture' },
  { id: 'core-components-section', label: 'Core Components (29 Primitives)' },
  { id: 'maintenance-manual-section', label: 'Maintenance Strategy (5 Pillars)' },
  { id: 'open-source-checklist-macro-phases', label: 'Open-Source Checklist (230 Checks)' },
];

export function DocsStickyHeader({
  activeTab: propActiveTab,
  version: _version = 'v0.2.11',
  commitHash: _commitHash = '0d81689',
}: DocsStickyHeaderProps = {}) {
  const pathname = usePathname();
  const { activeTab: navActiveTab, setActiveTab } = useDocsNav();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [mobileSearch, setMobileSearch] = React.useState<string>('');
  const menuRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const isLibraryPath =
    pathname?.startsWith('/document/design-system') ||
    pathname === '/design-system' ||
    pathname === '/ui-library';
  const isChangelogPath = pathname?.startsWith('/document/changelog') || pathname === '/changelog';
  const pathDerivedTab = isLibraryPath ? 'library' : isChangelogPath ? 'release' : 'openapi';

  const normalizedPropTab = propActiveTab === 'document' ? 'openapi' : propActiveTab;
  const currentTab = normalizedPropTab || navActiveTab || pathDerivedTab;

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const [expandedFolders, setExpandedFolders] = React.useState<Record<string, boolean>>({});
  const [expandedParents, setExpandedParents] = React.useState<Record<string, boolean>>({});

  const toggleFolder = (category: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

  const toggleCategoryGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleParentGroup = (parentId: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  // Jump to specific component or section
  const handleMobileNavigate = (tab: 'library' | 'openapi' | 'release', sectionId?: string) => {
    setActiveTab(tab, true);
    setMobileMenuOpen(false);
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  // Filtered Component Groups for mobile sidebar navigation
  const filteredComponentGroups = React.useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return COMPONENT_GROUPS_NAV;
    return COMPONENT_GROUPS_NAV.map((group) => {
      const matchesGroup = group.group.toLowerCase().includes(q);
      const matchingItems = group.items
        .map((item) => {
          if (matchesGroup) return item;
          if (item.isParent && item.children) {
            const matchesParent = item.name.toLowerCase().includes(q);
            const matchingChildren = item.children.filter((c) => c.name.toLowerCase().includes(q));
            if (matchesParent) return item;
            if (matchingChildren.length > 0) {
              return { ...item, children: matchingChildren };
            }
            return null;
          }
          if (item.name.toLowerCase().includes(q)) return item;
          return null;
        })
        .filter((item): item is M3NavItem => item !== null);

      return { ...group, items: matchingItems };
    }).filter((group) => group.items.length > 0);
  }, [mobileSearch]);

  // Fallbacks for backwards compatibility
  const filteredM3Components = React.useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return M3_COMPONENTS_NAV;
    return M3_COMPONENTS_NAV.filter((item) => item.name.toLowerCase().includes(q));
  }, [mobileSearch]);

  const filteredPlatformComponents = React.useMemo(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return PLATFORM_COMPONENTS_NAV;
    return PLATFORM_COMPONENTS_NAV.filter((item) => item.name.toLowerCase().includes(q));
  }, [mobileSearch]);

  // Auto-expand mobile parent group if search matches
  React.useEffect(() => {
    const q = mobileSearch.toLowerCase().trim();
    if (!q) return;
    for (const group of COMPONENT_GROUPS_NAV) {
      for (const item of group.items) {
        if (item.isParent && item.children) {
          if (
            item.name.toLowerCase().includes(q) ||
            item.children.some((c) => c.name.toLowerCase().includes(q))
          ) {
            setExpandedParents((prev) => ({ ...prev, [item.id]: true }));
          }
        }
      }
    }
  }, [mobileSearch]);

  // 3 Primary Distinct Views: COMPONENT, API, and BLUEPRINT
  const navTabs: HangingTabItem[] = [
    {
      id: 'library',
      label: 'COMPONENT',
      icon: Layers,
      href: '/document/design-system',
      onClick: () => setActiveTab('library', false),
    },
    {
      id: 'openapi',
      label: 'API',
      icon: FileText,
      href: '/document',
      onClick: () => setActiveTab('openapi', false),
    },
    {
      id: 'release',
      label: 'BLUEPRINT',
      icon: ShieldKey,
      href: '/document/design',
      onClick: () => setActiveTab('release', false),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0048D9] bg-[#0056FF] shadow-[0_2px_12px_rgba(0,40,150,0.2)] backdrop-blur-xl">
      <div className="relative mx-auto flex h-[68px] max-w-[1560px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <Link
          href="/document"
          className="group z-10 flex items-center gap-2.5 select-none sm:gap-3.5"
          title="SNPI-SMS Developer Documentation Portal"
        >
          <AsteriskLogo size="md" variant="standard" className="shadow-xs shrink-0" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-sans text-base font-black tracking-tight text-white transition-colors group-hover:text-blue-100 sm:text-lg md:text-xl">
              SNPI-SMS
            </span>
            <span className="h-4 w-[2px] bg-white/40" />
            <span className="font-sans text-[11px] font-bold tracking-wider text-blue-100 uppercase sm:text-xs">
              Docs
            </span>
          </div>
        </Link>

        {/* Center: Futuristic Cyber Armor Modular Nav Bar (Desktop Only) */}
        <div className="pointer-events-auto absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center md:flex">
          <HangingTabsNav items={navTabs} activeId={currentTab} size="md" />
        </div>

        {/* Right Side: Mobile Controls (Search, Theme, Hamburger Dropdown) */}
        <div ref={menuRef} className="relative z-20 flex items-center gap-1.5 md:hidden">
          {/* 1. Mobile Search Trigger */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(true);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            aria-label="Search Documentation"
            className="flex size-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
          >
            <Search className="size-4 stroke-[2]" />
          </button>

          {/* 2. Theme / Mode Indicator */}
          <button
            type="button"
            aria-label="Toggle Theme Mode"
            className="flex size-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 active:scale-95"
          >
            <Moon className="size-4 stroke-[2]" />
          </button>

          {/* 3. Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className={cn(
              'flex size-9 items-center justify-center rounded-xl border transition-all active:scale-95',
              mobileMenuOpen
                ? 'border-white bg-white text-[#0056FF]'
                : 'border-white/20 bg-white/10 text-white hover:bg-white/20',
            )}
          >
            {mobileMenuOpen ? (
              <X className="size-4 stroke-[2.2]" />
            ) : (
              <Menu className="size-4 stroke-[2.2]" />
            )}
          </button>

          {/* Mobile Dropdown Panel (Right Side) */}
          {mobileMenuOpen && (
            <div className="animate-in fade-in zoom-in-95 absolute top-[calc(100%+8px)] right-0 w-[min(calc(100vw-32px),360px)] overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-4 shadow-none duration-150">
              {/* Top Primary Page Switcher Tabs (3 Distinct Views: Component, API, Design) */}
              <div className="mb-4">
                <span className="mb-2 block font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase sm:text-[11px]">
                  Select Page Hub
                </span>
                <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                  <button
                    type="button"
                    onClick={() => handleMobileNavigate('library')}
                    className={cn(
                      'flex items-center justify-center gap-1 rounded-lg py-2 font-sans text-[11px] font-bold transition-all select-none active:scale-95 sm:text-xs',
                      currentTab === 'library'
                        ? 'bg-[#0056FF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900',
                    )}
                  >
                    <Layers className="size-3.5 shrink-0 stroke-[2]" />
                    <span className="truncate">Component</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNavigate('openapi')}
                    className={cn(
                      'flex items-center justify-center gap-1 rounded-lg py-2 font-sans text-[11px] font-bold transition-all select-none active:scale-95 sm:text-xs',
                      currentTab === 'openapi'
                        ? 'bg-[#0056FF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900',
                    )}
                  >
                    <FileText className="size-3.5 shrink-0 stroke-[2]" />
                    <span className="truncate">API</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMobileNavigate('release')}
                    className={cn(
                      'flex items-center justify-center gap-1 rounded-lg py-2 font-sans text-[11px] font-bold transition-all select-none active:scale-95 sm:text-xs',
                      currentTab === 'release'
                        ? 'bg-[#0056FF] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900',
                    )}
                  >
                    <ShieldKey className="size-3.5 shrink-0 stroke-[2]" />
                    <span className="truncate">Blueprint</span>
                  </button>
                </div>
              </div>

              {/* Modern Minimalist Search Bar (Clean Blueprint Standard) */}
              <div className="group relative mb-3 flex items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-black" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={mobileSearch}
                  onChange={(e) => setMobileSearch(e.target.value)}
                  placeholder="Search components..."
                  className="h-9.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] py-2 pr-10 pl-9 font-sans text-xs font-medium text-black shadow-2xs transition-all placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-black focus:bg-white focus:shadow-xs focus:ring-2 focus:ring-black/10 focus:outline-none focus-visible:outline-none"
                  style={{ outline: 'none' }}
                />
                {mobileSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileSearch('');
                      searchInputRef.current?.focus();
                    }}
                    title="Clear search"
                    className="absolute right-2.5 flex size-5 cursor-pointer items-center justify-center rounded-md text-black transition-colors hover:bg-slate-100 active:scale-95"
                  >
                    <X className="size-3.5 stroke-[2.5]" />
                  </button>
                )}
              </div>

              {/* Sidebar Specific Links Scrollable Viewport (Knowledge Base Style) */}
              <div className="no-scrollbar max-h-[min(65vh,480px)] overflow-y-auto pr-1">
                {currentTab === 'library' ? (
                  /* UI Library Specific Demos Navigation (Clean React Spectrum Navigation - Icons on Parent Only) */
                  <div className="space-y-3 font-sans text-xs">
                    {/* Top Hierarchy Identity */}
                    <div className="border-b border-slate-100 pb-1.5">
                      <span className="block font-sans text-[10px] font-bold tracking-wider text-black uppercase select-none">
                        Web
                      </span>
                      <span className="block font-sans text-xs font-black tracking-tight text-black select-none">
                        SNPI System
                      </span>
                    </div>

                    {/* COMPONENT GROUPS (Black Squircle Icon Tiles, All Black Text & Icons, Zero Numbers) */}
                    <div className="space-y-2 font-sans text-xs">
                      {filteredComponentGroups.length === 0 ? (
                        <div className="py-4 text-center font-sans text-xs text-slate-400">
                          No matching components found
                        </div>
                      ) : (
                        filteredComponentGroups.map((group) => {
                          const ParentGroupIcon = getParentGroupIcon(group.groupId);
                          const isGroupCollapsed = Boolean(collapsedGroups[group.groupId]);

                          return (
                            <div key={group.groupId} className="space-y-0.5">
                              {/* Parent Group Header (Black Squircle Tile, Black Text, No Numbers) */}
                              <button
                                type="button"
                                onClick={() => toggleCategoryGroup(group.groupId)}
                                className="group flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-left font-sans text-xs font-bold text-black transition-colors select-none hover:bg-slate-50"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div
                                    className="flex size-7.5 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-black shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:border-slate-300 group-hover:bg-slate-100"
                                  >
                                    <ParentGroupIcon
                                      className="size-4 stroke-[2.2] text-black"
                                    />
                                  </div>
                                  <span className="truncate text-[13px] font-bold text-black">
                                    {group.group}
                                  </span>
                                </div>
                                <ChevronRight
                                  className={cn(
                                    'size-3.5 stroke-[2.2] text-black transition-transform duration-200',
                                    !isGroupCollapsed && 'rotate-90',
                                  )}
                                />
                              </button>

                              {/* Group Items (Pure Clean Typography - Icons on Parent Only, Zero Coming Tags) */}
                              {!isGroupCollapsed && (
                                <div className="space-y-0.5 pt-0.5 pl-1">
                                  {group.items.map((item) => {
                                    if (item.isParent && item.children) {
                                      const isExpanded = Boolean(expandedParents[item.id]);

                                      return (
                                        <div key={item.id} className="space-y-0.5">
                                          <button
                                            type="button"
                                            onClick={() => toggleParentGroup(item.id)}
                                            className="group flex w-full cursor-pointer items-center justify-between rounded-md py-1.5 pr-2 pl-3 text-left font-sans text-xs font-semibold text-black transition-colors select-none hover:bg-slate-50"
                                          >
                                            <span className="text-left leading-snug break-words whitespace-normal">
                                              {item.name}
                                            </span>
                                            {isExpanded ? (
                                              <ChevronDown className="ml-1 size-3 shrink-0 text-black" />
                                            ) : (
                                              <ChevronRight className="ml-1 size-3 shrink-0 text-black" />
                                            )}
                                          </button>

                                          {isExpanded && (
                                            <div className="ml-2 space-y-0.5 py-0.5 pl-2">
                                              {item.children.map((child: M3NavItem) => {
                                                const freshness = getComponentFreshness(child);

                                                return (
                                                  <div
                                                    key={child.id}
                                                    onClick={() => {
                                                      const target =
                                                        child.targetId || `comp-${child.id}`;
                                                      handleMobileNavigate('library', target);
                                                    }}
                                                    className="group relative flex w-full cursor-pointer items-center justify-between rounded-md py-1.5 pr-2 pl-3.5 text-left font-normal text-black/80 transition-colors select-none hover:bg-slate-50 hover:text-black"
                                                  >
                                                    <span className="text-left font-sans text-xs leading-snug break-words whitespace-normal">
                                                      {child.name}
                                                    </span>
                                                    {freshness === 'new' && (
                                                      <span className="py-0.2 ml-1.5 shrink-0 rounded-full border border-emerald-300/80 bg-emerald-50 px-1.5 font-sans text-[9px] leading-none font-bold text-emerald-700 uppercase">
                                                        New
                                                      </span>
                                                    )}
                                                    {freshness === 'coming' && (
                                                      <span className="ml-1.5 shrink-0 rounded-[3px] border border-slate-200/90 bg-slate-100/70 px-1 py-0.5 font-mono text-[8px] leading-none font-semibold tracking-wider text-slate-400 uppercase">
                                                        Coming
                                                      </span>
                                                    )}
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }

                                    // Standalone item
                                    const freshness = getComponentFreshness(item);

                                    return (
                                      <div
                                        key={item.id}
                                        onClick={() => {
                                          const target = item.targetId || `comp-${item.id}`;
                                          handleMobileNavigate('library', target);
                                        }}
                                        className="group relative flex w-full cursor-pointer items-center justify-between rounded-md py-1.5 pr-2 pl-3.5 text-left font-normal text-black/80 transition-colors select-none hover:bg-slate-50 hover:text-black"
                                      >
                                        <span className="text-left font-sans text-xs leading-snug break-words whitespace-normal">
                                          {item.name}
                                        </span>
                                        {freshness === 'new' && (
                                          <span className="py-0.2 ml-1.5 shrink-0 rounded-full border border-emerald-300/80 bg-emerald-50 px-1.5 font-sans text-[9px] leading-none font-bold text-emerald-700 uppercase">
                                            New
                                          </span>
                                        )}
                                        {freshness === 'coming' && (
                                          <span className="ml-1.5 shrink-0 rounded-[3px] border border-slate-200/90 bg-slate-100/70 px-1 py-0.5 font-mono text-[8px] leading-none font-semibold tracking-wider text-slate-400 uppercase">
                                            Coming
                                          </span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                ) : currentTab === 'release' ? (
                  /* Design System Page Specific Navigation */
                  <div className="space-y-1.5 font-sans">
                    <span className="mb-2 block font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      Jump to Design Section
                    </span>
                    {DESIGN_SYSTEM_SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleMobileNavigate('release', sec.id)}
                        className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left font-sans text-xs font-medium text-slate-700 hover:bg-[#EFF5FF] hover:text-[#0056FF]"
                      >
                        <span className="flex-1 leading-snug break-words">{sec.label}</span>
                        <ChevronRight className="size-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Open API Specific Sections Navigation */
                  <div className="space-y-1.5 font-sans">
                    <span className="mb-2 block font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      Jump to API Guide Section
                    </span>
                    {OPEN_API_SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleMobileNavigate('openapi', sec.id)}
                        className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left font-sans text-xs font-medium text-slate-700 hover:bg-[#EFF5FF] hover:text-[#0056FF]"
                      >
                        <span className="flex-1 leading-snug break-words">{sec.label}</span>
                        <ChevronRight className="size-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
