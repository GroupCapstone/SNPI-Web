'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Layers,
  Settings,
  BookOpen,
  Code,
  Menu,
  Play,
  Volume,
  User,
  Check,
} from '@/components/icons';
import { RailToc, type RailTocItem } from '../rail-toc';
import { HookSidebar, type HookSidebarItem } from '../hook-sidebar';
import { IconBar } from '../icon-bar';
import { CyberArmorNav, type HangingTabItem } from '../hanging-tabs-nav';

// 1. Primary Component: Rail TOC (Paper Plane Flying Along Indented Track)
export function RailTocDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = React.useState('installation');
  const [isAutopiloting, setIsAutopiloting] = React.useState(false);
  const autopilotTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const tocItems: RailTocItem[] = [
    { id: 'installation', label: 'Installation', depth: 0 },
    { id: 'prerequisites', label: 'Prerequisites', depth: 1 },
    { id: 'installation-steps', label: 'Installation Steps', depth: 1 },
    { id: 'configuration', label: 'Configuration', depth: 1 },
    { id: 'usage', label: 'Usage', depth: 0 },
    { id: 'customizing-content', label: 'Customizing Content', depth: 1 },
    { id: 'submenu-content', label: 'Submenu Content', depth: 2 },
    { id: 'features', label: 'Features', depth: 0 },
  ];

  const sectionDetails: Record<
    string,
    { summary: string; note: string; tag: string; code?: string }
  > = {
    installation: {
      summary: 'Get started with package installation and repository cloning.',
      note: 'Run npm install to bootstrap monorepo workspaces and shared packages.',
      tag: 'CORE SETUP',
      code: 'git clone <REPO_URL> && npm install',
    },
    prerequisites: {
      summary: 'Verify runtime environments before initiating builds.',
      note: 'Requires Node.js >= 22.13.0, npm >= 10.8, and MongoDB Replica Set (rs0).',
      tag: 'RUNTIME',
      code: 'node -v && mongod --replSet rs0',
    },
    'installation-steps': {
      summary: 'Execute the five-stage local development orchestration.',
      note: 'Step 1: npm run build:shared. Step 2: npm run dev:backend. Step 3: npm run dev:frontend.',
      tag: 'PIPELINE',
      code: 'npm run build:shared && npm run dev',
    },
    configuration: {
      summary: 'Define environment configurations across workspaces.',
      note: 'Populate .env with BACKEND_INTERNAL_URL, MONGO_URI, and JWT secrets.',
      tag: 'ENVIRONMENT',
      code: 'BACKEND_INTERNAL_URL=http://localhost:5001\nMONGO_URI=mongodb://localhost:27017/snp_sms?replicaSet=rs0',
    },
    usage: {
      summary: 'Explore interactive components in the Developer Documentation Library.',
      note: 'Navigate to /document/design-system to review live components, states, and prompt skills.',
      tag: 'DOCUMENTATION',
      code: 'open http://localhost:3000/document/design-system',
    },
    'customizing-content': {
      summary: 'Tailor component tokens and theme variables.',
      note: 'Override CSS variables or pass custom variant props without touching global CSS.',
      tag: 'DESIGN TOKENS',
      code: '--brand-blue: #0056FF;\n--brand-azure: #2277FF;\n--elevation-1: #FFFFFF;',
    },
    'submenu-content': {
      summary: 'Configure nested navigation hierarchies and subcategories.',
      note: 'Support multi-tier navigation trees with indented SVG rail paths and filleted bends.',
      tag: 'HIERARCHY',
      code: '{ id: "submenu-content", label: "Submenu Content", depth: 2 }',
    },
    features: {
      summary: 'Production enterprise pillars for the SNPI-SMS platform.',
      note: '7-layer modular monolith, constant-time crypto, and WCAG AA/AAA compliance.',
      tag: 'ENTERPRISE',
      code: 'npm run smoke && npm run test:api && npm run deploy:verify',
    },
  };

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      const cRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      containerRef.current.scrollTo({
        top: containerRef.current.scrollTop + elRect.top - cRect.top - 20,
        behavior: 'smooth',
      });
    }
  };

  const handleAutopilot = () => {
    if (isAutopiloting) {
      setIsAutopiloting(false);
      if (autopilotTimeoutRef.current) clearTimeout(autopilotTimeoutRef.current);
      return;
    }

    setIsAutopiloting(true);
    let step = 0;
    const itemsCount = tocItems.length;

    const runStep = () => {
      if (step < itemsCount) {
        handleScrollTo(tocItems[step].id);
        step += 1;
        autopilotTimeoutRef.current = setTimeout(runStep, 800);
      } else if (step === itemsCount) {
        // Pause at bottom, then fly back up to top
        autopilotTimeoutRef.current = setTimeout(() => {
          handleScrollTo(tocItems[0].id);
          autopilotTimeoutRef.current = setTimeout(() => {
            setIsAutopiloting(false);
          }, 850);
        }, 500);
      }
    };

    runStep();
  };

  React.useEffect(() => {
    return () => {
      if (autopilotTimeoutRef.current) clearTimeout(autopilotTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF5FF]">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path
                d="M 22 12 L 2 3 L 7 12 Z"
                fill="#2277FF"
                stroke="#0056FF"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              <path
                d="M 22 12 L 2 21 L 7 12 Z"
                fill="#0056FF"
                stroke="#003ECC"
                strokeWidth="0.5"
                strokeLinejoin="round"
              />
              <line
                x1="2"
                y1="12"
                x2="22"
                y2="12"
                stroke="#FFFFFF"
                strokeWidth="0.75"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-sans text-xs font-bold text-slate-950">Rail TOC</h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Autopilot Tour Button */}
          <button
            type="button"
            onClick={handleAutopilot}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-[4px] border-0 px-3 py-1.5 font-sans text-[11px] font-semibold transition-all select-none',
              isAutopiloting
                ? 'bg-[#0056FF] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            )}
            title="Automatically fly through all sections and return to start"
          >
            <Play className="size-3 fill-current" />
            <span>{isAutopiloting ? 'Flying Tour...' : 'Autopilot Tour'}</span>
          </button>
        </div>
      </div>

      {/* Quick Jump Buttons with 4px radius standard */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5 border-b border-slate-100 pb-3.5">
        <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">
          Quick Jump:
        </span>
        {tocItems.map((it) => {
          const isCurrent = it.id === activeSection;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => handleScrollTo(it.id)}
              className={cn(
                'cursor-pointer rounded-[4px] border-0 px-2.5 py-1 font-sans text-[11px] font-semibold transition-all select-none',
                isCurrent
                  ? 'bg-[#0056FF] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              )}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {/* Interactive Two-Column Playground */}
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Left: Scrollable Document Content Container (Tracks Scroll in Real Time) */}
        <div
          ref={containerRef}
          className="no-scrollbar h-96 space-y-4 overflow-y-auto rounded-xl border border-slate-100 bg-[#F8FAFC] p-4 select-text md:col-span-7"
        >
          {tocItems.map((item) => {
            const isCurrent = activeSection === item.id;
            const details = sectionDetails[item.id];
            return (
              <section
                key={item.id}
                id={item.id}
                className={cn(
                  'rounded-lg border p-4 transition-all duration-200',
                  isCurrent
                    ? 'border-[#0056FF]/40 bg-white shadow-2xs ring-1 ring-[#0056FF]/20'
                    : 'border-slate-200/80 bg-white/70',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-sans text-xs font-bold text-slate-900">{item.label}</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-[3px] bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold text-slate-600">
                      {details?.tag}
                    </span>
                    <span className="font-mono text-[9px] font-semibold text-[#0056FF]">
                      DEPTH {item.depth || 0}
                    </span>
                  </div>
                </div>

                <p className="mt-2 font-sans text-[11px] leading-relaxed text-slate-600">
                  {details?.summary}
                </p>

                {details?.code && (
                  <div className="mt-2.5 overflow-x-auto rounded-[4px] border border-slate-200/90 bg-slate-50 p-2 font-mono text-[10px] text-slate-800">
                    <pre className="m-0 leading-tight">
                      <code>{details.code}</code>
                    </pre>
                  </div>
                )}

                <div className="mt-2.5 rounded-[4px] border-0 bg-slate-100/90 p-2 font-sans text-[10px] text-slate-600">
                  <strong className="text-slate-800">Implementation Guide:</strong> {details?.note}
                </div>
              </section>
            );
          })}
        </div>

        {/* Right: The Paper Plane Rail TOC (Matches User Attachment Exact Style) */}
        <div className="flex flex-col justify-start rounded-xl border border-slate-100 bg-white p-4.5 md:col-span-5">
          <RailToc
            items={tocItems}
            containerRef={containerRef}
            offset={20}
            indent={16}
            activeId={activeSection}
            onSelect={(id) => setActiveSection(id)}
            title="On this page"
          />
        </div>
      </div>
    </div>
  );
}

// 2. Bounce Sidebar (Collapsible with Bouncy Spring Physics)
export function BounceSidebarDemo() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const items = [
    { id: 'dashboard', label: 'Academics', icon: BookOpen },
    { id: 'modules', label: 'Curriculum', icon: Layers },
    { id: 'apis', label: 'Endpoints', icon: Code },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <div className="flex h-64 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xs">
      {/* Sidebar Panel */}
      <div
        className={cn(
          'flex h-full flex-col justify-between border-r border-slate-200 bg-white p-3 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          isOpen ? 'w-44' : 'w-14',
        )}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2">
            {isOpen && (
              <span className="font-sans text-xs font-black text-slate-900">WORKSPACE</span>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
            >
              <Menu className="size-4" />
            </button>
          </div>

          <div className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 font-sans text-xs font-semibold transition-all',
                    isActive
                      ? 'bg-[#0056FF] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100',
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {isOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {isOpen && (
          <div className="rounded-xl border border-slate-200 bg-[#E3E7FC]/40 p-2 text-center font-sans text-[10px] font-bold text-[#0056FF]">
            Spring Physics Active
          </div>
        )}
      </div>

      {/* Simulated Main Content */}
      <div className="flex flex-1 items-center justify-center p-4 text-center">
        <span className="font-sans text-xs text-slate-500">
          Current View: <strong className="text-slate-800 uppercase">{activeItem}</strong>
        </span>
      </div>
    </div>
  );
}

// 3. Hook Sidebar (A vertical navigation list with a dashed rail that marks the active item)
export function HookSidebarDemo() {
  const [dashed, setDashed] = React.useState(true);
  const [accentColor, setAccentColor] = React.useState('#0056FF');
  const [selectedIndex, setSelectedIndex] = React.useState(2);

  const navigationItems: HookSidebarItem[] = [
    { label: 'Overview' },
    { label: 'Architecture' },
    { label: 'Components' },
    { label: 'Security Policy' },
    { label: 'Open API' },
    { label: 'Changelog' },
  ];

  // 3 Primary Brand Rail Colors Only
  const colorPresets = [
    { label: 'Royal Blue', value: '#0056FF' },
    { label: 'Azure Blue', value: '#2277FF' },
    { label: 'Deep Navy', value: '#0A1A4A' },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-6 py-2">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs sm:p-6">
        {/* Style & 3-Color Picker Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CAD3F5] pb-4">
          {/* 3 Brand Color Swatches */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#0A1A4A] uppercase">
              Rail Color:
            </span>
            <div className="flex items-center gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  title={`${preset.label} (${preset.value})`}
                  onClick={() => setAccentColor(preset.value)}
                  style={{ backgroundColor: preset.value }}
                  className={cn(
                    'size-7 cursor-pointer rounded-full transition-transform select-none',
                    accentColor.toLowerCase() === preset.value.toLowerCase()
                      ? 'scale-115 ring-2 ring-[#0056FF] ring-offset-2'
                      : 'opacity-75 hover:scale-105 hover:opacity-100',
                  )}
                />
              ))}
            </div>
          </div>

          {/* Solid / Dashed Toggle */}
          <button
            type="button"
            title={dashed ? 'Switch to solid spring rail' : 'Switch to dashed spring rail'}
            onClick={() => setDashed(!dashed)}
            className="cursor-pointer rounded-full border border-[#CAD3F5] bg-[#EFF5FF] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#0A1A4A] transition-all hover:bg-[#E3E7FC]"
          >
            {dashed ? 'Dashed Rail' : 'Solid Rail'}
          </button>
        </div>

        {/* Clean HookSidebar Stage */}
        <div className="mt-4 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/50 p-5">
          <HookSidebar
            label="Navigation Tree"
            items={navigationItems}
            value={selectedIndex}
            onChange={(idx) => setSelectedIndex(idx)}
            color={accentColor}
            dashed={dashed}
          />
        </div>
      </div>
    </div>
  );
}

import { RareUiNavigationMenu } from '../navigation-menu';

// 6. Gooey Navigation (Confirmed Design + Corner Brand Border Archetypes)
export function GooeyNavDemo() {
  const [selected, setSelected] = React.useState('day');
  const [cornerSelected, setCornerSelected] = React.useState('month');

  const tabs = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
  ];

  return (
    <div className="flex w-full flex-col gap-8 py-2">
      {/* DEMO 1: Classic Fluid Capsule Pill (Confirmed Design) */}
      <div className="flex flex-col gap-3">
        <div className="border-b border-[#CAD3F5]/80 pb-2">
          <h3 className="font-mono text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
            01. Fluid Capsule Pill (Classic Gooey Nav)
          </h3>
        </div>

        <div className="flex w-full flex-col items-center justify-center py-6 text-center">
          <div className="no-scrollbar relative inline-flex max-w-full overflow-x-auto rounded-full border border-[#CAD3F5] bg-[#EFF5FF] p-1 shadow-2xs">
            {tabs.map((tab) => {
              const isActive = selected === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  title={`Select ${tab.label} timeline view`}
                  onClick={() => setSelected(tab.id)}
                  className={cn(
                    'relative z-10 shrink-0 cursor-pointer rounded-full px-3 py-1.5 font-sans text-xs font-bold transition-all duration-200 select-none sm:px-4',
                    isActive
                      ? 'bg-[#0056FF] text-white shadow-xs'
                      : 'text-[#0A1A4A] hover:text-[#0056FF]',
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DEMO 2: Corner Brand Border Gooey Nav (New Demo below it) */}
      <div className="flex flex-col gap-3">
        <div className="border-b border-[#CAD3F5]/80 pb-2">
          <h3 className="font-mono text-xs font-bold tracking-wide text-[#0A1A4A] uppercase">
            02. Corner Brand Border Gooey Nav
          </h3>
        </div>

        <div className="flex w-full flex-col items-center justify-center py-6 text-center">
          {/* Technical Corner Brand Border Container */}
          <div className="relative max-w-full overflow-x-auto p-3">
            {/* 4 Technical Corner L-Brackets */}
            <span className="pointer-events-none absolute top-0 left-0 size-3 border-t-2 border-l-2 border-[#0056FF]" />
            <span className="pointer-events-none absolute top-0 right-0 size-3 border-t-2 border-r-2 border-[#0056FF]" />
            <span className="pointer-events-none absolute bottom-0 left-0 size-3 border-b-2 border-l-2 border-[#0056FF]" />
            <span className="pointer-events-none absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-[#0056FF]" />

            {/* Navigation Track with Corner Accents */}
            <div className="no-scrollbar relative inline-flex max-w-full items-center gap-1 overflow-x-auto rounded border border-[#CAD3F5] bg-[#EFF5FF] p-1 shadow-2xs">
              {tabs.map((tab) => {
                const isActive = cornerSelected === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    title={`Select ${tab.label}`}
                    onClick={() => setCornerSelected(tab.id)}
                    className={cn(
                      'relative shrink-0 cursor-pointer rounded px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 select-none sm:px-4',
                      isActive
                        ? 'bg-[#0056FF] text-white shadow-2xs'
                        : 'text-[#0A1A4A] hover:bg-white hover:text-[#0056FF]',
                    )}
                  >
                    {/* Inner Corner Accent on Active Tab */}
                    {isActive && (
                      <>
                        <span className="pointer-events-none absolute top-0.5 left-0.5 size-1.5 border-t border-l border-white/70" />
                        <span className="pointer-events-none absolute right-0.5 bottom-0.5 size-1.5 border-r border-b border-white/70" />
                      </>
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Navigation Menu (Rare UI Floating 3-Island Header & Mega Menu)
export function NavigationMenuDemo() {
  return <RareUiNavigationMenu />;
}

// 8. Icon Bar (Horizontal Toolbar with Bloom Label Reveal & Roving Tabindex)
export function IconBarDemo() {
  const [selectedTool, setSelectedTool] = React.useState('pen');

  return (
    <div className="flex w-full flex-col items-center justify-center py-4">
      <IconBar selectedId={selectedTool} onSelect={setSelectedTool} />
    </div>
  );
}

// =========================================================================
// 9. Cyber Armor Modular Nav
// =========================================================================
export function CyberArmorNavDemo() {
  const [activeTab, setActiveTab] = React.useState('portfolio');

  // Full 8-Tab Mecha Console matching the reference specification
  const mechaTabs: HangingTabItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'Blog' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'clients', label: 'Clients' },
    { id: 'shop', label: 'Shop' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-4">
      <div className="no-scrollbar w-full overflow-x-auto py-2">
        <div className="flex w-full min-w-fit items-center justify-center px-1">
          <CyberArmorNav
            items={mechaTabs}
            activeId={activeTab}
            onSelect={setActiveTab}
            showIcons={false}
            size="md"
          />
        </div>
      </div>
    </div>
  );
}
