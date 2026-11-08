'use client';

import * as React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  GraduationCap,
  Heart,
  Home,
  LayoutGrid,
  List,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Minus,
  MoreVertical,
  Phone,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  X,
  Zap,
  type IconComponent,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { LibraryBottomNav } from './bottom-nav';
import { LibraryBottomSheet } from './bottom-sheet';
import { LibraryCard } from './card';
import { LibraryDialog } from './dialog';
import { LibraryFab } from './fab';
import { GeometricInput } from './geometric-tag-primitives';
import { LibrarySnackbar } from './snackbar';
import { LibraryTooltip } from './tooltip';

/**
 * Live interactive demos for the components that previously rendered the
 * BlankFutureComponent blueprint canvas. Every demo follows the existing
 * component stage display: white card, Soft Lavender keyline (#CAD3F5),
 * Deep Navy (#0A1A4A) text, Royal Blue (#0056FF) primary actions,
 * Azure (#2277FF) hover accents, Ice Tint (#EFF5FF) inner surfaces,
 * 4px control radius, >=44px touch targets, zero dots, zero gradients.
 */

function DemoStage({
  title,
  badge,
  children,
  wide = false,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs sm:p-6',
        wide ? 'max-w-3xl' : 'max-w-2xl',
      )}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#CAD3F5]/60 pb-3">
        <span className="font-sans text-xs font-bold text-[#0A1A4A] sm:text-sm">{title}</span>
        <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-[#0056FF] px-4 font-sans text-sm font-bold text-white transition-colors hover:bg-[#2277FF] active:scale-[0.97]',
        className,
      )}
    >
      {children}
    </button>
  );
}

function OutlineButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-4 font-sans text-sm font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF] hover:text-[#0056FF] active:scale-[0.97]',
        className,
      )}
    >
      {children}
    </button>
  );
}

function StatusLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 px-3.5 py-2.5 font-sans text-xs">
      <span className="font-medium text-[#0A1A4A]">{children}</span>
      <span className="font-mono text-[10px] font-bold text-emerald-600">[ACTIVE]</span>
    </div>
  );
}

// ==========================================
// NAVIGATION
// ==========================================

export function AppBarsDemo() {
  const [saved, setSaved] = React.useState(false);
  return (
    <DemoStage title="Top App Bars" badge="Small + Medium">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-[#CAD3F5]">
          <div className="flex h-14 items-center gap-2 bg-white px-3">
            <button
              type="button"
              title="Open navigation menu"
              className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#EFF5FF]"
            >
              <Menu className="size-5" />
            </button>
            <span className="min-w-0 flex-1 truncate font-sans text-sm font-bold text-[#0A1A4A]">
              Academics
            </span>
            <button
              type="button"
              title="Search modules"
              className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#EFF5FF]"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              title="Save view"
              onClick={() => setSaved((s) => !s)}
              className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#EFF5FF]"
            >
              <Bookmark className={cn('size-5', saved && 'fill-[#0056FF] text-[#0056FF]')} />
            </button>
          </div>
          <div className="border-t border-[#CAD3F5]/60 bg-[#EFF5FF]/40 px-4 py-3 font-sans text-xs font-medium text-[#334155]">
            Small app bar, 56px height, maximum three trailing actions.
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#CAD3F5]">
          <div className="bg-white px-4 pt-3 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                title="Go back"
                className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#EFF5FF]"
              >
                <ArrowLeft className="size-5" />
              </button>
              <span className="font-mono text-[10px] font-bold text-[#0056FF]">STUDENT RECORD</span>
            </div>
            <p className="mt-1 truncate px-1 font-sans text-xl font-extrabold tracking-tight text-[#0A1A4A]">
              Chan Sreyleak
            </p>
            <p className="px-1 font-sans text-xs font-medium text-[#334155]">
              Grade 10, Phnom Penh Innovation Hub
            </p>
          </div>
        </div>
      </div>
      <StatusLine>Bookmark state: {saved ? 'Saved to your views' : 'Not saved yet'}</StatusLine>
    </DemoStage>
  );
}

export function NavigationBarDemo() {
  const [active, setActive] = React.useState('home');
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'grades', label: 'Grades', icon: BookOpen },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User },
  ].slice(0, 4);
  const current = items.find((i) => i.id === active);
  return (
    <DemoStage title="Bottom Navigation Bar" badge="3 to 5 Destinations">
      <div className="rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-2 sm:p-4">
        <p className="mb-3 text-center font-sans text-xs font-medium text-[#334155]">
          Active destination: <span className="font-bold text-[#0A1A4A]">{current?.label}</span>
        </p>
        <LibraryBottomNav items={items} activeId={active} onSelect={setActive} />
      </div>
      <StatusLine>Thumb zone navigation for mobile portal top level routes.</StatusLine>
    </DemoStage>
  );
}

export function NavigationDrawerDemo() {
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState('Students');
  const links = [
    { label: 'Dashboard', icon: LayoutGrid },
    { label: 'Students', icon: Users },
    { label: 'Academics', icon: BookOpen },
    { label: 'Finance', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];
  return (
    <DemoStage title="Navigation Drawer" badge="Modal Drawer">
      <div className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-[#CAD3F5] sm:flex-row">
        {open && (
          <div className="flex w-full shrink-0 flex-col border-b border-[#CAD3F5] bg-white sm:w-52 sm:border-r sm:border-b-0">
            <div className="flex items-center gap-2 border-b border-[#CAD3F5]/60 px-3 py-3">
              <span className="flex size-9 items-center justify-center rounded-[4px] bg-[#0056FF] font-sans text-sm font-extrabold text-white">
                S
              </span>
              <div className="min-w-0">
                <p className="truncate font-sans text-xs font-bold text-[#0A1A4A]">SNPI Portal</p>
                <p className="truncate font-sans text-[10px] font-medium text-[#334155]">
                  Registrar Office
                </p>
              </div>
            </div>
            <nav className="flex-1 space-y-1 p-2" aria-label="Drawer demo">
              {links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => setActive(link.label)}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-2.5 rounded-[4px] px-3 font-sans text-xs font-bold transition-colors',
                    active === link.label
                      ? 'bg-[#E3E7FC] text-[#0056FF]'
                      : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                  )}
                >
                  <link.icon className="size-4.5 shrink-0" />
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="border-t border-[#CAD3F5]/60 p-2">
              <button
                type="button"
                className="flex min-h-11 w-full items-center gap-2.5 rounded-[4px] px-3 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
              >
                <LogOut className="size-4.5 shrink-0" /> Sign out
              </button>
            </div>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col bg-[#EFF5FF]/40 p-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-[4px] border border-[#CAD3F5] bg-white px-3 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF]"
          >
            <Menu className="size-4.5" /> {open ? 'Close drawer' : 'Open drawer'}
          </button>
          <p className="mt-4 font-sans text-sm font-bold text-[#0A1A4A]">{active}</p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            Drawer carries the deep hierarchy so the canvas stays clean.
          </p>
        </div>
      </div>
    </DemoStage>
  );
}

export function NavigationRailDemo() {
  const [active, setActive] = React.useState('Home');
  const items = [
    { label: 'Home', icon: Home },
    { label: 'Search', icon: Search },
    { label: 'Library', icon: BookOpen },
    { label: 'Alerts', icon: Bell },
    { label: 'Profile', icon: User },
  ];
  return (
    <DemoStage title="Navigation Rail" badge="Tablet + Desktop">
      <div className="flex min-h-64 overflow-hidden rounded-xl border border-[#CAD3F5]">
        <div className="flex w-20 shrink-0 flex-col items-center gap-1 border-r border-[#CAD3F5] bg-white py-3">
          <button
            type="button"
            title="Create new record"
            className="mb-2 inline-flex size-11 items-center justify-center rounded-[4px] bg-[#0056FF] text-white transition-colors hover:bg-[#2277FF]"
          >
            <Plus className="size-5" />
          </button>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              title={item.label}
              onClick={() => setActive(item.label)}
              className="flex w-16 flex-col items-center gap-1 py-1"
            >
              <span
                className={cn(
                  'flex h-8 w-14 items-center justify-center rounded-full transition-colors',
                  active === item.label
                    ? 'bg-[#E3E7FC] text-[#0056FF]'
                    : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                )}
              >
                <item.icon className="size-5" />
              </span>
              <span
                className={cn(
                  'font-sans text-[10px] font-bold',
                  active === item.label ? 'text-[#0056FF]' : 'text-[#334155]',
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 bg-[#EFF5FF]/40 p-4">
          <p className="font-sans text-sm font-bold text-[#0A1A4A]">{active}</p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            Rail keeps 3 to 7 destinations visible on medium and expanded windows.
          </p>
        </div>
      </div>
    </DemoStage>
  );
}

export function TabsDemo() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      body: 'Enrollment summary, attendance rate and open tasks for this term.',
    },
    {
      id: 'schedule',
      label: 'Schedule',
      body: 'Five teaching days, two laboratory blocks and one sports session per week.',
    },
    {
      id: 'fees',
      label: 'Fees',
      body: 'Term invoice issued, one installment paid, next due date on the fifteenth.',
    },
  ];
  const [active, setActive] = React.useState(tabs[0]);
  return (
    <DemoStage title="Tabs" badge="Primary Tabs">
      <div
        className="flex max-w-full gap-1 overflow-x-auto rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] p-1"
        role="tablist"
        aria-label="Student record tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active.id === tab.id}
            onClick={() => setActive(tab)}
            className={cn(
              'min-h-11 flex-1 rounded-[4px] px-4 font-sans text-sm font-bold whitespace-nowrap transition-colors',
              active.id === tab.id ? 'bg-[#0056FF] text-white' : 'text-[#0A1A4A] hover:bg-white',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-[#CAD3F5] bg-white p-4">
        <p className="font-sans text-sm font-bold text-[#0A1A4A]">{active.label}</p>
        <p className="mt-1 font-sans text-xs leading-relaxed font-medium text-[#334155]">
          {active.body}
        </p>
      </div>
    </DemoStage>
  );
}

export function ToolbarsDemo() {
  const [tools, setTools] = React.useState<string[]>(['Bold']);
  const toggle = (tool: string) =>
    setTools((prev) => (prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]));
  const groups: { label: string; icon?: IconComponent; text?: string }[][] = [
    [
      { label: 'Bold', text: 'B' },
      { label: 'Italic', text: 'I' },
      { label: 'Underline', text: 'U' },
    ],
    [
      { label: 'Align left', icon: List },
      { label: 'Layout grid', icon: LayoutGrid },
    ],
    [
      { label: 'Filter', icon: Filter },
      { label: 'Download', icon: Download },
      { label: 'Print', icon: Printer },
      { label: 'Refresh', icon: RefreshCw },
    ],
  ];
  return (
    <DemoStage title="Toolbars" badge="Editor Actions" wide>
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#CAD3F5] bg-white p-2">
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <span className="hidden h-8 w-px bg-[#CAD3F5] sm:block" />}
            <div className="flex items-center gap-1">
              {group.map((tool) => {
                const isActive = tools.includes(tool.label);
                return (
                  <button
                    key={tool.label}
                    type="button"
                    title={tool.label}
                    aria-pressed={isActive}
                    onClick={() => toggle(tool.label)}
                    className={cn(
                      'inline-flex size-11 items-center justify-center rounded-[4px] font-sans text-sm font-extrabold transition-colors',
                      isActive ? 'bg-[#0056FF] text-white' : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                    )}
                  >
                    {tool.icon ? <tool.icon className="size-5" /> : tool.text}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
        <span className="ml-auto hidden font-mono text-[10px] font-bold text-[#0056FF] md:block">
          {tools.length} ACTIVE
        </span>
      </div>
      <StatusLine>Active tools: {tools.length > 0 ? tools.join(', ') : 'None'}</StatusLine>
    </DemoStage>
  );
}

export function MenusDemo() {
  const [open, setOpen] = React.useState(true);
  const [last, setLast] = React.useState('None');
  const items = [
    { label: 'Open record', icon: Eye },
    { label: 'Copy student code', icon: Copy },
    { label: 'Share by Telegram', icon: Send },
    { label: 'Download PDF', icon: Download },
    { label: 'Archive record', icon: Trash2 },
  ];
  return (
    <DemoStage title="Menus" badge="Dropdown Menu">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <PrimaryButton onClick={() => setOpen((o) => !o)}>
            Record actions <ChevronDown className="size-4.5" />
          </PrimaryButton>
          {open && (
            <div className="absolute top-full left-1/2 z-10 mt-2 w-60 -translate-x-1/2 rounded-xl border border-[#CAD3F5] bg-white p-1.5 shadow-xs">
              {items.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setLast(item.label);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex min-h-11 w-full items-center gap-2.5 rounded-[4px] px-3 font-sans text-xs font-bold transition-colors',
                    item.label === 'Archive record'
                      ? 'text-rose-600 hover:bg-rose-50'
                      : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
                  )}
                >
                  <item.icon className="size-4.5 shrink-0" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={cn('w-full', open && 'mt-64 sm:mt-60')} />
      </div>
      <StatusLine>Last action: {last}</StatusLine>
    </DemoStage>
  );
}

// ==========================================
// INPUTS: BUTTONS FAMILY
// ==========================================

export function ButtonsDemo() {
  const [count, setCount] = React.useState(0);
  return (
    <DemoStage title="Buttons" badge="Primary + Tonal + Outline + Text">
      <div className="flex flex-wrap items-center gap-2.5">
        <PrimaryButton onClick={() => setCount((c) => c + 1)}>
          <Plus className="size-4.5" /> Add student
        </PrimaryButton>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-[#E3E7FC] px-4 font-sans text-sm font-bold text-[#0056FF] transition-colors hover:bg-[#CAD3F5] active:scale-[0.97]"
        >
          <Upload className="size-4.5" /> Import list
        </button>
        <OutlineButton onClick={() => setCount((c) => c + 1)}>Export</OutlineButton>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex min-h-11 items-center justify-center px-3 font-sans text-sm font-bold text-[#0056FF] transition-colors hover:bg-[#EFF5FF] active:scale-[0.97]"
        >
          View all
        </button>
        <button
          type="button"
          disabled
          className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-[4px] bg-[#E3E7FC]/50 px-4 font-sans text-sm font-bold text-[#0A1A4A]/35"
        >
          Disabled
        </button>
      </div>
      <StatusLine>Button presses in this demo: {count}</StatusLine>
    </DemoStage>
  );
}

export function AllButtonsDemo() {
  const sizes = [
    { label: 'Small', cls: 'min-h-9 px-3 text-xs' },
    { label: 'Medium', cls: 'min-h-11 px-4 text-sm' },
    { label: 'Large', cls: 'min-h-12 px-6 text-base' },
  ];
  return (
    <DemoStage title="All Buttons" badge="States + Sizes" wide>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {sizes.map((s) => (
            <button
              key={s.label}
              type="button"
              className={cn(
                'inline-flex items-center justify-center rounded-[4px] bg-[#0056FF] font-sans font-bold text-white transition-colors hover:bg-[#2277FF] active:scale-[0.97]',
                s.cls,
              )}
            >
              {s.label}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0056FF] px-5 font-sans text-sm font-bold text-white transition-colors hover:bg-[#2277FF] active:scale-[0.97]"
          >
            <Heart className="size-4.5" /> Pill action
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-[#2277FF] px-4 font-sans text-sm font-bold text-white transition-colors hover:bg-[#0056FF] active:scale-[0.97]"
          >
            <ShieldCheck className="size-4.5" /> Azure
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-emerald-600 px-4 font-sans text-sm font-bold text-white transition-colors hover:bg-emerald-500 active:scale-[0.97]"
          >
            <Check className="size-4.5" /> Confirm paid
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] bg-rose-600 px-4 font-sans text-sm font-bold text-white transition-colors hover:bg-rose-500 active:scale-[0.97]"
          >
            <Trash2 className="size-4.5" /> Delete
          </button>
        </div>
      </div>
      <StatusLine>Every variant keeps 4px radius and a minimum 44px touch height.</StatusLine>
    </DemoStage>
  );
}

export function ButtonGroupsDemo() {
  const [view, setView] = React.useState('List');
  const [page, setPage] = React.useState(2);
  return (
    <DemoStage title="Button Groups" badge="Connected Controls" wide>
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex overflow-hidden rounded-[4px] border border-[#CAD3F5]">
          {['List', 'Grid', 'Board'].map((v, i) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 px-4 font-sans text-sm font-bold transition-colors',
                i > 0 && 'border-l border-[#CAD3F5]',
                view === v
                  ? 'bg-[#0056FF] text-white'
                  : 'bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
              )}
            >
              {v === 'List' ? <List className="size-4.5" /> : <LayoutGrid className="size-4.5" />}
              {v}
            </button>
          ))}
        </div>
        <div className="inline-flex items-center overflow-hidden rounded-[4px] border border-[#CAD3F5]">
          <button
            type="button"
            title="Previous page"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-11 items-center justify-center bg-white text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="min-w-16 border-x border-[#CAD3F5] bg-[#EFF5FF] px-2 text-center font-mono text-xs font-bold text-[#0056FF]">
            Page {page}
          </span>
          <button
            type="button"
            title="Next page"
            onClick={() => setPage((p) => Math.min(9, p + 1))}
            className="inline-flex size-11 items-center justify-center bg-white text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <StatusLine>
        View: {view}, Page: {page} of 9
      </StatusLine>
    </DemoStage>
  );
}

export function SegmentedButtonsDemo() {
  const [selected, setSelected] = React.useState<string[]>(['Day']);
  const options = ['Day', 'Week', 'Month', 'Year'];
  const toggle = (opt: string) =>
    setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  return (
    <DemoStage title="Segmented Buttons" badge="Multi Select">
      <div
        className="flex max-w-full overflow-x-auto rounded-[4px] border border-[#CAD3F5]"
        role="group"
        aria-label="Report range selector"
      >
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            aria-pressed={selected.includes(opt)}
            onClick={() => toggle(opt)}
            className={cn(
              'inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 px-4 font-sans text-sm font-bold whitespace-nowrap transition-colors',
              i > 0 && 'border-l border-[#CAD3F5]',
              selected.includes(opt)
                ? 'bg-[#E3E7FC] text-[#0056FF]'
                : 'bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
            )}
          >
            {selected.includes(opt) && <Check className="size-4" />}
            {opt}
          </button>
        ))}
      </div>
      <StatusLine>Selected ranges: {selected.length > 0 ? selected.join(', ') : 'None'}</StatusLine>
    </DemoStage>
  );
}

export function SplitButtonDemo() {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState('Save record');
  return (
    <DemoStage title="Split Button" badge="Primary + Menu">
      <div className="relative inline-flex">
        <button
          type="button"
          onClick={() => setAction('Save record')}
          className="inline-flex min-h-11 items-center gap-2 rounded-l-[4px] bg-[#0056FF] px-4 font-sans text-sm font-bold text-white transition-colors hover:bg-[#2277FF] active:scale-[0.97]"
        >
          <Save className="size-4.5" /> {action}
        </button>
        <button
          type="button"
          title="More save options"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex min-h-11 w-11 items-center justify-center rounded-r-[4px] border-l border-white/30 bg-[#0056FF] text-white transition-colors hover:bg-[#2277FF]"
        >
          <ChevronDown className="size-5" />
        </button>
        {open && (
          <div className="absolute top-full left-0 z-10 mt-2 w-56 rounded-xl border border-[#CAD3F5] bg-white p-1.5 shadow-xs">
            {['Save and add another', 'Save as draft', 'Save and print receipt'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setAction(opt.replace('Save and ', 'Save + ').replace('Save as ', ''));
                  setOpen(false);
                }}
                className="flex min-h-11 w-full items-center rounded-[4px] px-3 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={cn(open && 'mt-40')} />
      <StatusLine>Main action stays one tap, variants live in the attached menu.</StatusLine>
    </DemoStage>
  );
}

export function FabsDemo() {
  const [count, setCount] = React.useState(0);
  return (
    <DemoStage title="Floating Action Buttons" badge="Primary Action">
      <div className="relative min-h-44 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4">
        <p className="font-sans text-xs font-medium text-[#334155]">
          Records created from this FAB: <span className="font-bold text-[#0A1A4A]">{count}</span>
        </p>
        <div className="absolute right-4 bottom-4 flex items-end gap-3">
          <LibraryFab size="small" variant="surface" onClick={() => setCount((c) => c + 1)} />
          <LibraryFab variant="secondary" onClick={() => setCount((c) => c + 1)} />
          <LibraryFab onClick={() => setCount((c) => c + 1)} />
        </div>
      </div>
      <StatusLine>One primary FAB per screen, anchored bottom right.</StatusLine>
    </DemoStage>
  );
}

export function ExtendedFabsDemo() {
  const [created, setCreated] = React.useState(false);
  return (
    <DemoStage title="Extended FABs" badge="Icon + Label">
      <div className="relative min-h-44 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4">
        <p className="font-sans text-xs font-medium text-[#334155]">
          {created ? 'New class draft created.' : 'Extended FAB pairs the icon with a clear label.'}
        </p>
        <div className="absolute right-4 bottom-4">
          <LibraryFab label="New class" onClick={() => setCreated(true)} />
        </div>
      </div>
      <StatusLine>Use the extended form when the action needs a text label.</StatusLine>
    </DemoStage>
  );
}

export function FabMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const [last, setLast] = React.useState('None');
  const actions = [
    { label: 'New student', icon: User },
    { label: 'New class', icon: BookOpen },
    { label: 'New invoice', icon: FileText },
  ];
  return (
    <DemoStage title="FAB Menu" badge="Speed Dial">
      <div className="relative min-h-56 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4">
        <p className="font-sans text-xs font-medium text-[#334155]">
          Last created: <span className="font-bold text-[#0A1A4A]">{last}</span>
        </p>
        <div className="absolute right-4 bottom-4 left-4 flex flex-col items-end gap-2.5">
          {open &&
            actions.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => {
                  setLast(a.label);
                  setOpen(false);
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-4 font-sans text-xs font-bold text-[#0A1A4A] shadow-xs transition-colors hover:border-[#0056FF] hover:text-[#0056FF]"
              >
                <a.icon className="size-4.5" /> {a.label}
              </button>
            ))}
          <LibraryFab
            icon={open ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle create menu"
          />
        </div>
      </div>
    </DemoStage>
  );
}

export function IconButtonsDemo() {
  const [faved, setFaved] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const buttons = [
    { label: 'Search records', icon: Search },
    { label: 'Notifications', icon: Bell },
    { label: 'Open settings', icon: Settings },
    { label: 'More actions', icon: MoreVertical },
  ];
  return (
    <DemoStage title="Icon Buttons" badge="Standard + Tonal + Toggle">
      <div className="flex flex-wrap items-center gap-2.5">
        {buttons.map((b) => (
          <button
            key={b.label}
            type="button"
            title={b.label}
            className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#020617] transition-colors hover:bg-[#EFF5FF]"
          >
            <b.icon className="size-5" />
          </button>
        ))}
        <button
          type="button"
          title="Add to favorites"
          aria-pressed={faved}
          onClick={() => setFaved((f) => !f)}
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-[4px] transition-colors',
            faved ? 'bg-[#E3E7FC] text-[#0056FF]' : 'text-[#020617] hover:bg-[#EFF5FF]',
          )}
        >
          <Star className={cn('size-5', faved && 'fill-[#0056FF]')} />
        </button>
        <button
          type="button"
          title="Mark as appreciated"
          aria-pressed={liked}
          onClick={() => setLiked((l) => !l)}
          className={cn(
            'inline-flex size-11 items-center justify-center rounded-full transition-colors',
            liked ? 'bg-rose-50 text-rose-600' : 'text-[#020617] hover:bg-[#EFF5FF]',
          )}
        >
          <Heart className={cn('size-5', liked && 'fill-rose-600')} />
        </button>
      </div>
      <StatusLine>
        Favorite: {faved ? 'On' : 'Off'}, Appreciated: {liked ? 'Yes' : 'No'}
      </StatusLine>
    </DemoStage>
  );
}

// ==========================================
// INPUTS: SELECTION, DATE, TIME, SLIDERS, SEARCH
// ==========================================

export function CheckboxDemo() {
  const options = [
    { id: 'sms', label: 'SMS attendance alerts', detail: 'Sent to parent phone numbers' },
    { id: 'telegram', label: 'Telegram grade reports', detail: 'End of term PDF summary' },
    { id: 'receipt', label: 'Printed fee receipts', detail: 'Two copies per payment' },
  ];
  const [checked, setChecked] = React.useState<string[]>(['sms']);
  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  return (
    <DemoStage title="Checkbox" badge="Multi Select">
      <div className="space-y-2.5">
        {options.map((opt) => {
          const isOn = checked.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              role="checkbox"
              aria-checked={isOn}
              onClick={() => toggle(opt.id)}
              className={cn(
                'flex min-h-11 w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors',
                isOn
                  ? 'border-[#0056FF] bg-[#EFF5FF]/60'
                  : 'border-[#CAD3F5] bg-white hover:border-[#0056FF]/50',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
                  isOn ? 'border-[#0056FF] bg-[#0056FF] text-white' : 'border-[#CAD3F5] bg-white',
                )}
              >
                {isOn && <Check className="size-4" />}
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-xs font-bold text-[#0A1A4A]">
                  {opt.label}
                </span>
                <span className="block font-sans text-[11px] font-medium text-[#334155]">
                  {opt.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <StatusLine>
        Enabled channels: {checked.length} of {options.length}
      </StatusLine>
    </DemoStage>
  );
}

export function RadioButtonDemo() {
  const options = [
    { id: 'khmer', label: 'Khmer report', detail: 'Official ministry format' },
    { id: 'english', label: 'English report', detail: 'International program format' },
    { id: 'bilingual', label: 'Bilingual report', detail: 'Khmer first, English second' },
  ];
  const [value, setValue] = React.useState('khmer');
  return (
    <DemoStage title="Radio Button" badge="Single Select">
      <div className="space-y-2.5" role="radiogroup" aria-label="Report language">
        {options.map((opt) => {
          const isOn = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isOn}
              onClick={() => setValue(opt.id)}
              className={cn(
                'flex min-h-11 w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors',
                isOn
                  ? 'border-[#0056FF] bg-[#EFF5FF]/60'
                  : 'border-[#CAD3F5] bg-white hover:border-[#0056FF]/50',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isOn ? 'border-[#0056FF]' : 'border-[#CAD3F5]',
                )}
              >
                {isOn && <span className="size-3 rounded-full bg-[#0056FF]" />}
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-xs font-bold text-[#0A1A4A]">
                  {opt.label}
                </span>
                <span className="block font-sans text-[11px] font-medium text-[#334155]">
                  {opt.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <StatusLine>Selected: {options.find((o) => o.id === value)?.label}</StatusLine>
    </DemoStage>
  );
}

export function DatePickersDemo() {
  const [selected, setSelected] = React.useState(8);
  const firstDayOffset = 0; // 1 Nov 2026 is a Sunday
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (
    <DemoStage title="Date Pickers" badge="Calendar Grid">
      <div className="mx-auto w-full max-w-sm rounded-xl border border-[#CAD3F5] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            title="Previous month"
            className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="font-sans text-sm font-extrabold text-[#0A1A4A]">November 2026</span>
          <button
            type="button"
            title="Next month"
            className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {week.map((d) => (
            <span key={d} className="py-1 font-mono text-[10px] font-bold text-[#0056FF]">
              {d}
            </span>
          ))}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setSelected(day)}
              className={cn(
                'inline-flex h-11 w-full max-w-11 items-center justify-center justify-self-center rounded-full font-sans text-xs font-bold transition-colors',
                day === selected
                  ? 'bg-[#0056FF] text-white'
                  : day === 8
                    ? 'bg-[#E3E7FC] text-[#0056FF]'
                    : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <StatusLine>
        Selected date: {selected} November 2026, term day {selected}
      </StatusLine>
    </DemoStage>
  );
}

export function TimePickersDemo() {
  const [hour, setHour] = React.useState(7);
  const [minute, setMinute] = React.useState(30);
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 15, 30, 45];
  return (
    <DemoStage title="Time Pickers" badge="Dial + Input">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-3">
          <Clock className="size-4.5 text-[#020617]" />
          <select
            aria-label="Hour"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="bg-transparent font-sans text-sm font-bold text-[#0A1A4A] outline-none"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          <span className="font-sans text-sm font-bold text-[#0A1A4A]">:</span>
          <select
            aria-label="Minute"
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            className="bg-transparent font-sans text-sm font-bold text-[#0A1A4A] outline-none"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, '0')}
              </option>
            ))}
          </select>
        </label>
        <div className="inline-flex overflow-hidden rounded-[4px] border border-[#CAD3F5]">
          {(['AM', 'PM'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={cn(
                'min-h-11 px-4 font-sans text-sm font-bold transition-colors',
                period === p
                  ? 'bg-[#0056FF] text-white'
                  : 'bg-white text-[#0A1A4A] hover:bg-[#EFF5FF]',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <StatusLine>
        Class start time: {hour}:{String(minute).padStart(2, '0')} {period}
      </StatusLine>
    </DemoStage>
  );
}

export function SlidersDemo() {
  const [volume, setVolume] = React.useState(60);
  const [discount, setDiscount] = React.useState(10);
  return (
    <DemoStage title="Sliders" badge="Continuous + Stepped">
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between font-sans text-xs font-bold text-[#0A1A4A]">
            <span>Classroom speaker volume</span>
            <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] text-[#0056FF]">
              {volume}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Classroom speaker volume"
            className="h-11 w-full accent-[#0056FF]"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between font-sans text-xs font-bold text-[#0A1A4A]">
            <span>Sibling discount</span>
            <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] text-[#0056FF]">
              {discount}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            aria-label="Sibling discount"
            className="h-11 w-full accent-[#0056FF]"
          />
          <div className="flex justify-between font-mono text-[10px] font-bold text-[#334155]">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
          </div>
        </div>
      </div>
    </DemoStage>
  );
}

export function SearchDemo() {
  const modules = [
    'Student registry',
    'Teacher assignments',
    'Tuition invoices',
    'Attendance leaves',
    'Exam scores',
    'Timetable builder',
    'Certificate printing',
    'Telegram broadcasts',
  ];
  const [query, setQuery] = React.useState('t');
  const results = modules.filter((m) => m.toLowerCase().includes(query.toLowerCase()));
  return (
    <DemoStage title="Search" badge="Live Filter">
      <label className="flex min-h-11 items-center gap-2.5 rounded-[4px] border border-[#CAD3F5] bg-white px-3.5 transition-colors focus-within:border-[#0056FF]">
        <Search className="size-5 shrink-0 text-[#020617]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search modules"
          aria-label="Search modules"
          className="min-w-0 flex-1 bg-transparent font-sans text-sm font-medium text-[#0A1A4A] outline-none placeholder:text-[#334155]/60"
        />
        {query && (
          <button
            type="button"
            title="Clear search"
            onClick={() => setQuery('')}
            className="inline-flex h-11 w-9 shrink-0 items-center justify-center rounded-[4px] text-[#0A1A4A] hover:bg-[#EFF5FF]"
          >
            <X className="size-4.5" />
          </button>
        )}
      </label>
      <div className="mt-3 space-y-1.5">
        {results.map((m) => (
          <div
            key={m}
            className="flex min-h-11 items-center gap-2.5 rounded-[4px] border border-[#CAD3F5]/60 bg-[#EFF5FF]/40 px-3.5 font-sans text-xs font-bold text-[#0A1A4A]"
          >
            <Sparkles className="size-4 shrink-0 text-[#0056FF]" />
            {m}
          </div>
        ))}
        {results.length === 0 && (
          <p className="py-3 text-center font-sans text-xs font-medium text-[#334155]">
            No module matches this search.
          </p>
        )}
      </div>
      <StatusLine>
        {results.length} module{results.length === 1 ? '' : 's'} found
      </StatusLine>
    </DemoStage>
  );
}

// ==========================================
// FEEDBACK
// ==========================================

export function DialogsDemo() {
  const [open, setOpen] = React.useState(false);
  const [decision, setDecision] = React.useState('Waiting for decision');
  return (
    <DemoStage title="Dialogs" badge="Modal Confirmation">
      <div className="flex flex-col items-center gap-3 py-2">
        <PrimaryButton onClick={() => setOpen(true)}>
          <ShieldCheck className="size-4.5" /> Review ledger commit
        </PrimaryButton>
        <p className="font-sans text-xs font-medium text-[#334155]">{decision}</p>
      </div>
      <LibraryDialog
        open={open}
        onOpenChange={setOpen}
        title="Commit term ledger"
        description="This writes the verified fee ledger for Term 1. The action is recorded in the audit log."
        confirmLabel="Commit ledger"
        cancelLabel="Keep editing"
        onConfirm={() => setDecision('Ledger committed and audit entry written')}
      />
    </DemoStage>
  );
}

export function BottomSheetsDemo() {
  const [open, setOpen] = React.useState(false);
  const [choice, setChoice] = React.useState('No export chosen yet');
  return (
    <DemoStage title="Bottom Sheets" badge="Modal Sheet">
      <div className="flex flex-col items-center gap-3 py-2">
        <PrimaryButton onClick={() => setOpen(true)}>
          <Download className="size-4.5" /> Export class list
        </PrimaryButton>
        <p className="font-sans text-xs font-medium text-[#334155]">{choice}</p>
      </div>
      <LibraryBottomSheet open={open} onClose={() => setOpen(false)} title="Export class list">
        <div className="space-y-2">
          {['PDF document', 'Excel workbook', 'CSV data file'].map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => {
                setChoice(`Export format: ${fmt}`);
                setOpen(false);
              }}
              className="flex min-h-11 w-full items-center gap-2.5 rounded-[4px] border border-[#CAD3F5] bg-white px-3.5 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF]"
            >
              <FileText className="size-4.5" /> {fmt}
            </button>
          ))}
        </div>
      </LibraryBottomSheet>
    </DemoStage>
  );
}

export function SideSheetsDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <DemoStage title="Side Sheets" badge="Inspector Panel" wide>
      <div className="flex min-h-64 flex-col overflow-hidden rounded-xl border border-[#CAD3F5] sm:flex-row">
        <div className="min-w-0 flex-1 bg-[#EFF5FF]/40 p-4">
          <p className="font-sans text-sm font-bold text-[#0A1A4A]">Grade 10 A, Class List</p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            Select the inspector to review one student without leaving the list.
          </p>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-[#CAD3F5] bg-white px-3 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF]"
          >
            <Eye className="size-4.5" /> {open ? 'Hide inspector' : 'Show inspector'}
          </button>
        </div>
        {open && (
          <aside className="w-full shrink-0 border-t border-[#CAD3F5] bg-white p-4 sm:w-60 sm:border-t-0 sm:border-l">
            <p className="font-mono text-[10px] font-bold text-[#0056FF]">STUDENT INSPECTOR</p>
            <p className="mt-2 font-sans text-sm font-extrabold text-[#0A1A4A]">Chan Sreyleak</p>
            <dl className="mt-3 space-y-2 font-sans text-xs">
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-[#334155]">Code</dt>
                <dd className="font-bold text-[#0A1A4A]">STU-000142</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-[#334155]">Attendance</dt>
                <dd className="font-bold text-emerald-600">96%</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="font-medium text-[#334155]">Fee status</dt>
                <dd className="font-bold text-[#0A1A4A]">[PAID]</dd>
              </div>
            </dl>
            <PrimaryButton className="mt-4 w-full">Open full record</PrimaryButton>
          </aside>
        )}
      </div>
    </DemoStage>
  );
}

export function LoadingIndicatorDemo() {
  const [loading, setLoading] = React.useState(true);
  return (
    <DemoStage title="Loading Indicator" badge="Indeterminate">
      <div className="flex flex-col items-center gap-4 py-2">
        {loading ? (
          <>
            <span className="size-12 animate-spin rounded-full border-4 border-[#E3E7FC] border-t-[#0056FF]" />
            <div className="w-full max-w-sm space-y-2.5">
              <div className="h-3.5 w-3/4 animate-pulse rounded bg-[#E3E7FC]" />
              <div className="h-3.5 w-1/2 animate-pulse rounded bg-[#E3E7FC]" />
              <div className="h-1.5 w-full overflow-hidden rounded bg-[#E3E7FC]">
                <div className="h-full w-1/3 animate-pulse bg-[#0056FF]" />
              </div>
            </div>
            <p className="font-sans text-xs font-medium text-[#334155]">
              Syncing attendance records
            </p>
          </>
        ) : (
          <p className="flex items-center gap-2 font-sans text-sm font-bold text-[#0A1A4A]">
            <Check className="size-5 text-emerald-600" /> Sync complete, 1,240 records
          </p>
        )}
        <OutlineButton onClick={() => setLoading((l) => !l)}>
          {loading ? 'Finish sync' : 'Run sync again'}
        </OutlineButton>
      </div>
    </DemoStage>
  );
}

export function ProgressIndicatorsDemo() {
  const [progress, setProgress] = React.useState(65);
  const ring = 2 * Math.PI * 34;
  return (
    <DemoStage title="Progress Indicators" badge="Linear + Circular">
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between font-sans text-xs font-bold text-[#0A1A4A]">
            <span>Term enrollment completion</span>
            <span className="font-mono text-[10px] text-[#0056FF]">{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E3E7FC]">
            <div
              className="h-full rounded-full bg-[#0056FF] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative size-24">
            <svg viewBox="0 0 84 84" className="size-24 -rotate-90">
              <circle cx="42" cy="42" r="34" fill="none" stroke="#E3E7FC" strokeWidth="8" />
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="none"
                stroke="#0056FF"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={ring}
                strokeDashoffset={ring - (ring * progress) / 100}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-sans text-sm font-extrabold text-[#0A1A4A]">
              {progress}%
            </span>
          </div>
          <div className="flex gap-2">
            <OutlineButton onClick={() => setProgress((p) => Math.max(0, p - 10))}>
              <Minus className="size-4.5" /> 10
            </OutlineButton>
            <PrimaryButton onClick={() => setProgress((p) => Math.min(100, p + 10))}>
              <Plus className="size-4.5" /> 10
            </PrimaryButton>
          </div>
        </div>
      </div>
    </DemoStage>
  );
}

export function TooltipsDemo() {
  return (
    <DemoStage title="Tooltips" badge="Hover + Focus">
      <div className="flex flex-wrap items-center justify-center gap-3 py-6">
        <LibraryTooltip content="Copy the student code to the clipboard" shortcut="Ctrl+C">
          <button
            type="button"
            title="Copy student code"
            className="inline-flex size-11 items-center justify-center rounded-[4px] bg-white text-[#020617] transition-colors hover:bg-[#EFF5FF]"
          >
            <Copy className="size-5" />
          </button>
        </LibraryTooltip>
        <LibraryTooltip content="Print the official term certificate" position="bottom">
          <button
            type="button"
            title="Print certificate"
            className="inline-flex size-11 items-center justify-center rounded-[4px] bg-white text-[#020617] transition-colors hover:bg-[#EFF5FF]"
          >
            <Printer className="size-5" />
          </button>
        </LibraryTooltip>
        <LibraryTooltip content="Records are locked after the term closes" position="top">
          <button
            type="button"
            title="Term lock information"
            className="inline-flex size-11 items-center justify-center rounded-[4px] bg-white text-[#020617] transition-colors hover:bg-[#EFF5FF]"
          >
            <Lock className="size-5" />
          </button>
        </LibraryTooltip>
      </div>
      <StatusLine>Hover or focus any icon to read its definition.</StatusLine>
    </DemoStage>
  );
}

export function SnackbarDemo() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  return (
    <DemoStage title="Snackbar" badge="Action Feedback">
      <div className="flex flex-col items-center gap-3 py-2">
        <PrimaryButton
          onClick={() => {
            setMessage('Student record archived.');
            setOpen(true);
          }}
        >
          <Trash2 className="size-4.5" /> Archive record
        </PrimaryButton>
        <p className="font-sans text-xs font-medium text-[#334155]">
          {message || 'The snackbar appears at the bottom with an undo action.'}
        </p>
      </div>
      <LibrarySnackbar
        open={open}
        message="Student record archived."
        actionLabel="Undo"
        onAction={() => {
          setMessage('Archive undone, record restored.');
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
        variant="success"
      />
    </DemoStage>
  );
}

// ==========================================
// DISPLAY
// ==========================================

export function BadgesDemo() {
  return (
    <DemoStage title="Badges" badge="Status Pills">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded border border-[#CAD3F5] bg-[#E3E7FC] px-2.5 py-1 font-mono text-[10px] font-bold text-[#0056FF]">
          [ACTIVE]
        </span>
        <span className="rounded bg-emerald-600 px-2.5 py-1 font-mono text-[10px] font-bold text-white">
          [PAID]
        </span>
        <span className="rounded bg-amber-400 px-2.5 py-1 font-mono text-[10px] font-bold text-[#0A1A4A]">
          [PENDING]
        </span>
        <span className="rounded bg-rose-600 px-2.5 py-1 font-mono text-[10px] font-bold text-white">
          [OVERDUE]
        </span>
        <span className="rounded bg-[#0056FF] px-2.5 py-1 font-mono text-[10px] font-bold text-white">
          NEW
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CAD3F5] bg-white px-3 py-1.5 font-sans text-xs font-bold text-[#0A1A4A]">
          <Bell className="size-3.5" /> 3 unread
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0056FF] px-3 py-1.5 font-sans text-xs font-bold text-white">
          <Award className="size-3.5" /> Top class
        </span>
      </div>
      <StatusLine>Status is always text first, color second, never a bare dot.</StatusLine>
    </DemoStage>
  );
}

export function CardsDemo() {
  const [mode, setMode] = React.useState<'summary' | 'detail'>('summary');
  return (
    <DemoStage title="Cards" badge="Container Variants" wide>
      <div className="grid gap-4 sm:grid-cols-2">
        <LibraryCard className="border border-[#CAD3F5]">
          <p className="font-mono text-[10px] font-bold text-[#0056FF]">GRADE 10 A</p>
          <p className="mt-1.5 font-sans text-base font-extrabold text-[#0A1A4A]">
            Homeroom overview
          </p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            38 students, attendance 96 percent this week.
          </p>
          <div className="mt-3 flex gap-2">
            <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              38 STUDENTS
            </span>
            <span className="rounded border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              96% PRESENT
            </span>
          </div>
        </LibraryCard>
        <LibraryCard
          interactive
          className="border border-[#CAD3F5]"
          onClick={() => setMode((m) => (m === 'summary' ? 'detail' : 'summary'))}
        >
          <p className="font-mono text-[10px] font-bold text-[#0056FF]">INTERACTIVE CARD</p>
          <p className="mt-1.5 font-sans text-base font-extrabold text-[#0A1A4A]">
            {mode === 'summary' ? 'Tap to open detail' : 'Detail is open'}
          </p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            {mode === 'summary'
              ? 'The whole card is one 44px plus touch target.'
              : 'Top scorer: Sok Dara, average 94.5 across six subjects.'}
          </p>
          <p className="mt-3 inline-flex items-center gap-1 font-sans text-xs font-bold text-[#0056FF]">
            {mode === 'summary' ? 'Open' : 'Back'} <ArrowRight className="size-4" />
          </p>
        </LibraryCard>
      </div>
    </DemoStage>
  );
}

export function CarouselDemo() {
  const slides = [
    {
      title: 'Science Fair Winners',
      detail: 'Grade 11 team takes the national robotics title.',
      icon: Award,
    },
    {
      title: 'New Library Wing',
      detail: 'Two thousand new titles arrive for Term 2 reading.',
      icon: BookOpen,
    },
    {
      title: 'Sports Day',
      detail: 'Inter campus athletics meet opens on Saturday morning.',
      icon: Zap,
    },
  ];
  const [index, setIndex] = React.useState(0);
  const slide = slides[index];
  return (
    <DemoStage title="Carousel" badge="Content Rotator">
      <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40">
        <div className="flex min-h-40 flex-col items-center justify-center gap-2 p-6 text-center">
          <slide.icon className="size-9 text-[#0056FF]" />
          <p className="font-sans text-base font-extrabold text-[#0A1A4A]">{slide.title}</p>
          <p className="max-w-sm font-sans text-xs font-medium text-[#334155]">{slide.detail}</p>
        </div>
        <div className="flex items-center justify-between border-t border-[#CAD3F5]/60 bg-white px-3 py-2">
          <button
            type="button"
            title="Previous slide"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Carousel slides">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === index}
                title={`Slide ${i + 1}: ${s.title}`}
                onClick={() => setIndex(i)}
                className="flex min-h-11 items-center px-1.5"
              >
                <span
                  className={cn(
                    'h-2 rounded-[2px] transition-all',
                    i === index ? 'w-8 bg-[#0056FF]' : 'w-3.5 bg-[#CAD3F5] hover:bg-[#2277FF]',
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            title="Next slide"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            className="inline-flex size-11 items-center justify-center rounded-[4px] text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <StatusLine>
        Slide {index + 1} of {slides.length}: {slide.title}
      </StatusLine>
    </DemoStage>
  );
}

export function DividerDemo() {
  return (
    <DemoStage title="Divider" badge="Horizontal + Vertical + Label">
      <div className="space-y-4">
        <div>
          <p className="font-sans text-xs font-bold text-[#0A1A4A]">Invoice 2026-0114</p>
          <div className="my-2.5 h-px bg-[#CAD3F5]" />
          <p className="font-sans text-xs font-medium text-[#334155]">Tuition Term 1, Phnom Penh</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#CAD3F5]" />
          <span className="font-mono text-[10px] font-bold text-[#0056FF]">OR PAY WITH</span>
          <span className="h-px flex-1 bg-[#CAD3F5]" />
        </div>
        <div className="flex min-h-11 items-stretch justify-center gap-4 font-sans text-xs font-bold text-[#0A1A4A]">
          <span className="flex items-center gap-1.5">
            <Building2 className="size-4.5" /> Bank transfer
          </span>
          <span className="w-px bg-[#CAD3F5]" />
          <span className="flex items-center gap-1.5">
            <Phone className="size-4.5" /> Bakong KHQR
          </span>
          <span className="w-px bg-[#CAD3F5]" />
          <span className="flex items-center gap-1.5">
            <Globe className="size-4.5" /> Card online
          </span>
        </div>
      </div>
    </DemoStage>
  );
}

export function ListsDemo() {
  const rows = [
    {
      icon: GraduationCap,
      title: 'Sok Dara',
      detail: 'Grade 11 B, code STU-000207',
      tag: '[ACTIVE]',
    },
    { icon: Mail, title: 'Parent meeting invite', detail: 'Sent to 38 guardians', tag: '[SENT]' },
    {
      icon: MapPin,
      title: 'Field trip permit',
      detail: 'National Museum, 14 November',
      tag: '[PENDING]',
    },
    {
      icon: MessageSquare,
      title: 'Telegram broadcast',
      detail: 'Exam timetable reminder',
      tag: '[QUEUED]',
    },
  ];
  const [selected, setSelected] = React.useState(rows[0].title);
  return (
    <DemoStage title="Lists" badge="One + Two Line Rows">
      <div className="overflow-hidden rounded-xl border border-[#CAD3F5]">
        {rows.map((row, i) => (
          <button
            key={row.title}
            type="button"
            onClick={() => setSelected(row.title)}
            className={cn(
              'flex min-h-14 w-full items-center gap-3 px-4 py-2.5 text-left transition-colors',
              i > 0 && 'border-t border-[#CAD3F5]/60',
              selected === row.title ? 'bg-[#EFF5FF]' : 'bg-white hover:bg-[#EFF5FF]/50',
            )}
          >
            <row.icon className="size-5 shrink-0 text-[#020617]" />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-sans text-xs font-bold text-[#0A1A4A]">
                {row.title}
              </span>
              <span className="block truncate font-sans text-[11px] font-medium text-[#334155]">
                {row.detail}
              </span>
            </span>
            <span className="shrink-0 rounded border border-[#CAD3F5] bg-[#E3E7FC] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              {row.tag}
            </span>
          </button>
        ))}
      </div>
      <StatusLine>Selected row: {selected}</StatusLine>
    </DemoStage>
  );
}

// ==========================================
// FORMS
// ==========================================

export function TextFieldsDemo() {
  const [name, setName] = React.useState('Chan Sreyleak');
  const [email, setEmail] = React.useState('');
  const [note, setNote] = React.useState('');
  const emailValid = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <DemoStage title="Text Fields" badge="Filled + Outlined + Area">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="demo-student-name"
            className="mb-1.5 block font-sans text-xs font-bold text-[#0A1A4A]"
          >
            Student full name
          </label>
          <GeometricInput
            id="demo-student-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            clearable
            onClear={() => setName('')}
            placeholder="Student full name"
          />
        </div>
        <div>
          <label
            htmlFor="demo-guardian-email"
            className="mb-1.5 block font-sans text-xs font-bold text-[#0A1A4A]"
          >
            Guardian email
          </label>
          <GeometricInput
            id="demo-guardian-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="guardian@example.com"
            icon={<Mail className="size-4.5" />}
          />
          {!emailValid && (
            <p className="mt-1.5 font-sans text-xs font-bold text-rose-600">
              Enter a valid email address.
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="demo-note"
            className="mb-1.5 block font-sans text-xs font-bold text-[#0A1A4A]"
          >
            Counselor note
          </label>
          <textarea
            id="demo-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={140}
            placeholder="Short note, maximum 140 characters"
            className="w-full rounded-[4px] border border-[#CAD3F5] bg-white px-3.5 py-3 font-sans text-sm font-medium text-[#0A1A4A] transition-colors outline-none placeholder:text-[#334155]/60 focus:border-[#0056FF]"
          />
          <p className="mt-1 text-right font-mono text-[10px] font-bold text-[#334155]">
            {note.length} / 140
          </p>
        </div>
      </div>
      <StatusLine>
        Name: {name || 'Empty'}, Email: {email ? (emailValid ? 'Valid' : 'Invalid') : 'Empty'}
      </StatusLine>
    </DemoStage>
  );
}

// ==========================================
// DEMO MAP: component id -> live demo
// ==========================================

export const FUTURE_COMPONENT_DEMOS: Record<string, React.ComponentType> = {
  'app-bars': AppBarsDemo,
  'navigation-bar': NavigationBarDemo,
  'navigation-drawer': NavigationDrawerDemo,
  'navigation-rail': NavigationRailDemo,
  tabs: TabsDemo,
  toolbars: ToolbarsDemo,
  menus: MenusDemo,
  buttons: ButtonsDemo,
  'all-buttons': AllButtonsDemo,
  'button-groups': ButtonGroupsDemo,
  'segmented-buttons': SegmentedButtonsDemo,
  'split-button': SplitButtonDemo,
  fabs: FabsDemo,
  'extended-fabs': ExtendedFabsDemo,
  'fab-menu': FabMenuDemo,
  'icon-buttons': IconButtonsDemo,
  checkbox: CheckboxDemo,
  'radio-button': RadioButtonDemo,
  'date-pickers': DatePickersDemo,
  'time-pickers': TimePickersDemo,
  sliders: SlidersDemo,
  search: SearchDemo,
  dialogs: DialogsDemo,
  'bottom-sheets': BottomSheetsDemo,
  'side-sheets': SideSheetsDemo,
  'loading-indicator': LoadingIndicatorDemo,
  'progress-indicators': ProgressIndicatorsDemo,
  tooltips: TooltipsDemo,
  snackbar: SnackbarDemo,
  badges: BadgesDemo,
  cards: CardsDemo,
  carousel: CarouselDemo,
  divider: DividerDemo,
  lists: ListsDemo,
  'text-fields': TextFieldsDemo,
};

// ==========================================
// NAVIGATION + INPUTS: MENU LEAF COMPLETION
// ==========================================

export function AccordionDemo() {
  const sections = [
    {
      title: 'Term 1, Foundation',
      body: 'Orientation week, core subjects and the first parent meeting.',
    },
    {
      title: 'Term 2, Development',
      body: 'Laboratory blocks begin, plus the national science fair selection.',
    },
    {
      title: 'Term 3, Mastery',
      body: 'Mock examinations, certificate review and graduation rehearsal.',
    },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <DemoStage title="Accordion" badge="Expandable Sections">
      <div className="overflow-hidden rounded-xl border border-[#CAD3F5]">
        {sections.map((s, i) => (
          <div key={s.title} className={cn(i > 0 && 'border-t border-[#CAD3F5]/60')}>
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex min-h-12 w-full items-center justify-between gap-2 bg-white px-4 font-sans text-sm font-bold text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]/60"
            >
              {s.title}
              <ChevronDown
                className={cn(
                  'size-5 shrink-0 text-[#0056FF] transition-transform',
                  open === i && 'rotate-180',
                )}
              />
            </button>
            {open === i && (
              <p className="border-t border-[#CAD3F5]/60 bg-[#EFF5FF]/40 px-4 py-3 font-sans text-xs leading-relaxed font-medium text-[#334155]">
                {s.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </DemoStage>
  );
}

export function BreadcrumbsDemo() {
  const trail = ['Home', 'Academics', 'Grade 10', 'Student Records'];
  const [current, setCurrent] = React.useState(trail.length - 1);
  return (
    <DemoStage title="Breadcrumbs" badge="Path Trail">
      <nav aria-label="Breadcrumb demo" className="flex flex-wrap items-center gap-1">
        {trail.map((crumb, i) => (
          <React.Fragment key={crumb}>
            {i > 0 && <ChevronRight className="size-4 shrink-0 text-[#334155]" />}
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-current={i === current ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-[4px] px-2.5 font-sans text-sm font-bold transition-colors',
                i === current
                  ? 'text-[#0056FF]'
                  : 'text-[#0A1A4A] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
              )}
            >
              {crumb}
            </button>
          </React.Fragment>
        ))}
      </nav>
      <StatusLine>Current page: {trail[current]}</StatusLine>
    </DemoStage>
  );
}

export function LinkDemo() {
  const [tapped, setTapped] = React.useState<string | null>(null);
  const linkClass =
    'cursor-pointer font-bold text-[#0056FF] underline decoration-[#2277FF] decoration-2 underline-offset-2 transition-colors hover:text-[#2277FF]';
  return (
    <DemoStage title="Link" badge="Inline + Standalone">
      <div className="space-y-4 font-sans text-sm leading-relaxed font-medium text-[#334155]">
        <p>
          Read the{' '}
          <span
            role="link"
            tabIndex={0}
            onClick={() => setTapped('Enrollment policy')}
            className={linkClass}
          >
            enrollment policy
          </span>{' '}
          before submitting the form, then check the{' '}
          <span
            role="link"
            tabIndex={0}
            onClick={() => setTapped('Term calendar')}
            className={linkClass}
          >
            term calendar
          </span>{' '}
          for the closing date.
        </p>
        <span
          role="link"
          tabIndex={0}
          onClick={() => setTapped('Student directory')}
          className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-sans text-sm font-bold text-[#0056FF] transition-colors hover:text-[#2277FF]"
        >
          Open the full student directory <ArrowRight className="size-4.5" />
        </span>
      </div>
      <StatusLine>
        {tapped
          ? `Link tapped: ${tapped}. Demo links never leave this section.`
          : 'Demo links are inert by design, taps stay in this section.'}
      </StatusLine>
    </DemoStage>
  );
}

export function TreeViewDemo() {
  const [expanded, setExpanded] = React.useState<string[]>(['academics']);
  const [selected, setSelected] = React.useState('Grade 10 A');
  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  const tree = [
    {
      id: 'academics',
      label: 'Academics',
      icon: BookOpen,
      children: ['Grade 10 A', 'Grade 10 B', 'Grade 11 A'],
    },
    { id: 'finance', label: 'Finance', icon: FileText, children: ['Invoices', 'Receipts'] },
    { id: 'people', label: 'People', icon: Users, children: ['Teachers', 'Guardians'] },
  ];
  return (
    <DemoStage title="Tree View" badge="Hierarchy">
      <div className="rounded-xl border border-[#CAD3F5] bg-white p-2">
        {tree.map((node) => (
          <div key={node.id}>
            <button
              type="button"
              aria-expanded={expanded.includes(node.id)}
              onClick={() => toggle(node.id)}
              className="flex min-h-11 w-full items-center gap-2 rounded-[4px] px-2.5 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
            >
              <ChevronRight
                className={cn(
                  'size-4.5 shrink-0 text-[#0056FF] transition-transform',
                  expanded.includes(node.id) && 'rotate-90',
                )}
              />
              <node.icon className="size-4.5 shrink-0" />
              {node.label}
            </button>
            {expanded.includes(node.id) &&
              node.children.map((child) => (
                <button
                  key={child}
                  type="button"
                  onClick={() => setSelected(child)}
                  className={cn(
                    'flex min-h-11 w-full items-center rounded-[4px] pr-2.5 pl-12 font-sans text-xs font-bold transition-colors',
                    selected === child
                      ? 'bg-[#E3E7FC] text-[#0056FF]'
                      : 'text-[#334155] hover:bg-[#EFF5FF]',
                  )}
                >
                  {child}
                </button>
              ))}
          </div>
        ))}
      </div>
      <StatusLine>Selected node: {selected}</StatusLine>
    </DemoStage>
  );
}

export function SideNavigationDemo() {
  const [active, setActive] = React.useState('Overview');
  const links = ['Overview', 'Curriculum', 'Teachers', 'Timetable', 'Reports'];
  return (
    <DemoStage title="Side Navigation" badge="Persistent Panel" wide>
      <div className="flex min-h-56 flex-col overflow-hidden rounded-xl border border-[#CAD3F5] sm:flex-row">
        <nav
          aria-label="Side navigation demo"
          className="flex shrink-0 flex-row gap-1 overflow-x-auto border-b border-[#CAD3F5] bg-white p-2 sm:w-48 sm:flex-col sm:border-r sm:border-b-0"
        >
          {links.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => setActive(link)}
              className={cn(
                'flex min-h-11 items-center gap-2 rounded-[4px] px-3 font-sans text-xs font-bold whitespace-nowrap transition-colors',
                active === link ? 'bg-[#0056FF] text-white' : 'text-[#0A1A4A] hover:bg-[#EFF5FF]',
              )}
            >
              <span
                className={cn(
                  'h-3.5 w-1 shrink-0 rounded-[2px]',
                  active === link ? 'bg-white' : 'bg-[#CAD3F5]',
                )}
              />
              {link}
            </button>
          ))}
        </nav>
        <div className="min-w-0 flex-1 bg-[#EFF5FF]/40 p-4">
          <p className="font-sans text-sm font-bold text-[#0A1A4A]">{active}</p>
          <p className="mt-1 font-sans text-xs font-medium text-[#334155]">
            Persistent side navigation for one stable product section.
          </p>
        </div>
      </div>
    </DemoStage>
  );
}

export function CloseButtonDemo() {
  const [cards, setCards] = React.useState(['Welcome banner', 'Holiday notice', 'Exam reminder']);
  return (
    <DemoStage title="Close Button" badge="Dismissible Surfaces">
      <div className="space-y-2.5">
        {cards.map((card) => (
          <div
            key={card}
            className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 px-4"
          >
            <span className="font-sans text-xs font-bold text-[#0A1A4A]">{card}</span>
            <button
              type="button"
              title={`Dismiss ${card}`}
              onClick={() => setCards((prev) => prev.filter((c) => c !== card))}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-[4px] text-[#0A1A4A] transition-colors hover:bg-white hover:text-[#0056FF]"
            >
              <X className="size-5" />
            </button>
          </div>
        ))}
        {cards.length === 0 && (
          <p className="py-2 text-center font-sans text-xs font-medium text-[#334155]">
            All notices dismissed.
          </p>
        )}
      </div>
      <div className="mt-3">
        <OutlineButton
          onClick={() => setCards(['Welcome banner', 'Holiday notice', 'Exam reminder'])}
        >
          <RefreshCw className="size-4.5" /> Restore notices
        </OutlineButton>
      </div>
    </DemoStage>
  );
}

export function ComboBoxDemo() {
  const options = [
    'Phnom Penh Innovation Hub',
    'Siem Reap Main Campus',
    'Battambang Regional Center',
    'Kampong Cham Learning Center',
    'Kandal Technology Campus',
  ];
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Phnom Penh Innovation Hub');
  const results = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  return (
    <DemoStage title="Combo Box" badge="Input + Listbox">
      <div className="relative">
        <label className="flex min-h-11 items-center gap-2.5 rounded-[4px] border border-[#CAD3F5] bg-white px-3.5 transition-colors focus-within:border-[#0056FF]">
          <Building2 className="size-5 shrink-0 text-[#020617]" />
          <input
            value={open ? query : value}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              setQuery('');
              setOpen(true);
            }}
            placeholder="Type or pick a campus"
            aria-label="Campus combo box"
            className="min-w-0 flex-1 bg-transparent font-sans text-sm font-medium text-[#0A1A4A] outline-none placeholder:text-[#334155]/60"
          />
          <ChevronDown className="size-5 shrink-0 text-[#0A1A4A]" />
        </label>
        {open && (
          <div className="absolute inset-x-0 top-full z-10 mt-2 rounded-xl border border-[#CAD3F5] bg-white p-1.5 shadow-xs">
            {results.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setValue(opt);
                  setOpen(false);
                }}
                className="flex min-h-11 w-full items-center justify-between gap-2 rounded-[4px] px-3 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
              >
                {opt}
                {value === opt && <Check className="size-4.5 shrink-0 text-[#0056FF]" />}
              </button>
            ))}
            {results.length === 0 && (
              <p className="px-3 py-2.5 font-sans text-xs font-medium text-[#334155]">
                No campus matches.
              </p>
            )}
          </div>
        )}
      </div>
      <div className={cn(open && 'mt-60')} />
      <StatusLine>Selected campus: {value}</StatusLine>
    </DemoStage>
  );
}

export function NumberFieldDemo() {
  const [seats, setSeats] = React.useState(35);
  return (
    <DemoStage title="Number Field" badge="Stepper Input">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center overflow-hidden rounded-[4px] border border-[#CAD3F5]">
          <button
            type="button"
            title="Remove one seat"
            onClick={() => setSeats((s) => Math.max(1, s - 1))}
            className="inline-flex size-11 items-center justify-center bg-white text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <Minus className="size-5" />
          </button>
          <input
            value={seats}
            onChange={(e) => {
              const n = Number(e.target.value.replace(/\D/g, ''));
              if (!Number.isNaN(n)) setSeats(Math.min(60, Math.max(0, n)));
            }}
            inputMode="numeric"
            aria-label="Classroom seats"
            className="min-h-11 w-16 border-x border-[#CAD3F5] bg-[#EFF5FF] text-center font-mono text-sm font-bold text-[#0056FF] outline-none"
          />
          <button
            type="button"
            title="Add one seat"
            onClick={() => setSeats((s) => Math.min(60, s + 1))}
            className="inline-flex size-11 items-center justify-center bg-white text-[#0A1A4A] transition-colors hover:bg-[#EFF5FF]"
          >
            <Plus className="size-5" />
          </button>
        </div>
        <span className="font-sans text-xs font-medium text-[#334155]">
          Classroom seats, maximum 60
        </span>
      </div>
      <StatusLine>Seats set: {seats}</StatusLine>
    </DemoStage>
  );
}

// Aliases: menu leaves that share a canonical built demo
Object.assign(FUTURE_COMPONENT_DEMOS, {
  accordion: AccordionDemo,
  breadcrumbs: BreadcrumbsDemo,
  link: LinkDemo,
  'tree-view': TreeViewDemo,
  'side-navigation': SideNavigationDemo,
  'action-button': ButtonsDemo,
  'action-group': ButtonGroupsDemo,
  'action-bar': ToolbarsDemo,
  'close-button': CloseButtonDemo,
  'buttons-item': ButtonsDemo,
  'checkbox-group': CheckboxDemo,
  'combo-box': ComboBoxDemo,
  'number-field': NumberFieldDemo,
  'search-field': SearchDemo,
  'text-area': TextFieldsDemo,
});
