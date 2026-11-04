'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Search,
  Command,
  ArrowRight,
  CornerDownLeft,
  Settings,
  Check,
  Zap,
} from '@/components/icons';

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  group: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string; // e.g. "G D" or "$mod+N" where $mod expands to ⌘ or Ctrl
  keywords?: string[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  commands?: CommandItem[];
  theme?: 'light' | 'dark';
  className?: string;
}

const DEFAULT_COMMANDS: CommandItem[] = [
  // Group 1: Navigation & Pages
  {
    id: 'nav-dashboard',
    title: 'Dashboard Overview',
    description: 'Real-time telemetry, campus health & active attendance',
    group: 'Navigation & Pages',
    shortcut: 'G D',
    keywords: ['home', 'metrics', 'analytics', 'kpi'],
  },
  {
    id: 'nav-students',
    title: 'Student Roster & Profiles',
    description: 'Active cohort rosters, transcripts & enrollment records',
    group: 'Navigation & Pages',
    shortcut: 'G S',
    keywords: ['pupils', 'admissions', 'dossier', 'directory'],
  },
  {
    id: 'nav-attendance',
    title: 'Attendance Matrix & Audit Logs',
    description: 'Biometric verification records and branch audit history',
    group: 'Navigation & Pages',
    shortcut: 'G A',
    keywords: ['check-in', 'clock', 'present', 'absent'],
  },
  {
    id: 'nav-academics',
    title: 'Academic Term Calendar & Schedule',
    description: 'Lecture periods, exam timetables & campus syllabus',
    group: 'Navigation & Pages',
    shortcut: 'G C',
    keywords: ['calendar', 'timetable', 'exam', 'semester'],
  },

  // Group 2: Quick Actions & Operations
  {
    id: 'act-new-student',
    title: 'Register New Student Dossier',
    description: 'Scaffold admissions profile with guardian contact data',
    group: 'Actions & Operations',
    shortcut: '$mod+N',
    keywords: ['create', 'enroll', 'applicant', 'add'],
  },
  {
    id: 'act-invoice',
    title: 'Issue Tuition Fee Invoices',
    description: 'Generate batch fee notices for semester tuition balance',
    group: 'Actions & Operations',
    shortcut: '$mod+I',
    keywords: ['billing', 'payment', 'finance', 'bursar'],
  },
  {
    id: 'act-export-report',
    title: 'Export Monthly Audit Report',
    description: 'Download signed compliance CSV & PDF reports',
    group: 'Actions & Operations',
    shortcut: '$mod+E',
    keywords: ['download', 'csv', 'pdf', 'compliance'],
  },
  {
    id: 'act-smoke-test',
    title: 'Run Smoke Test & Endpoint Health',
    description: 'Execute monorepo health check across 47 domain modules',
    group: 'Actions & Operations',
    shortcut: '$mod+T',
    keywords: ['test', 'ping', 'api', 'verify'],
  },

  // Group 3: System & Security
  {
    id: 'sys-audit-log',
    title: 'Cryptographic Audit Trail',
    description: 'Inspect constant-time signed transaction commitments',
    group: 'System & Security',
    shortcut: 'G T',
    keywords: ['security', 'hash', 'signature', 'acid'],
  },
  {
    id: 'sys-api-docs',
    title: 'Open REST API Specification',
    description: 'View 193 OpenAPI contract endpoints and DTO schemas',
    group: 'System & Security',
    shortcut: 'G O',
    keywords: ['docs', 'rest', 'swagger', 'developer'],
  },
  {
    id: 'sys-settings',
    title: 'Institutional Branch Settings',
    description: 'Configure tenant domain routing and RBAC permissions',
    group: 'System & Security',
    shortcut: '$mod+,',
    keywords: ['config', 'rbac', 'admin', 'permissions'],
  },
];

/**
 * CommandPalette
 *
 * Implements the 8-pillar accessible Command Palette architecture:
 * 01 Backdrop Overlay: Semi-transparent blurred layer dimming background.
 * 02 Search Input: Auto-focused text field with search icon & ESC badge.
 * 03 Grouped Results: Commands organized by category with uppercase section labels.
 * 04 Fuzzy Highlighting: Matching characters highlighted in cyan.
 * 05 Keyboard Navigation: Arrow keys, Enter, Home, End, and Escape control.
 * 06 Shortcut Badges: Monospace key hints on action items.
 * 07 Focus Trap: Tab cycling confined to dialog, focus restored on close.
 * 08 Platform Detection: Automatic modifier key display (⌘ on macOS, Ctrl on Windows/Linux).
 */
export function CommandPalette({
  open = false,
  onOpenChange,
  commands = DEFAULT_COMMANDS,
  theme = 'light',
  className,
}: CommandPaletteProps) {
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = React.useState<boolean>(open);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const [lastExecuted, setLastExecuted] = React.useState<string | null>(null);

  // 08 Platform Detection: Detect macOS vs Windows/Linux safely on client
  const [isMac, setIsMac] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const platform =
        (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform ||
        navigator.platform ||
        navigator.userAgent ||
        '';
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform));
    }
  }, []);

  // Sync open state
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const setOpenState = React.useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
  );

  const dialogRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  // 05 Keyboard Navigation: Global Cmd+K / Ctrl+K hotkey
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenState(!isOpen);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, setOpenState]);

  // Manage focus restoration & auto-focus
  React.useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setSearchQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // 07 Focus Trap: Restore focus to previous trigger element on close
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Filter commands by search query
  const filteredCommands = React.useMemo(() => {
    if (!searchQuery.trim()) return commands;
    const q = searchQuery.toLowerCase();
    return commands.filter((cmd) => {
      const matchTitle = cmd.title.toLowerCase().includes(q);
      const matchDesc = cmd.description?.toLowerCase().includes(q);
      const matchGroup = cmd.group.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchGroup || matchKeywords;
    });
  }, [commands, searchQuery]);

  // 03 Grouped Results: Group commands by category
  const groupedCommands = React.useMemo(() => {
    const map: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!map[cmd.group]) map[cmd.group] = [];
      map[cmd.group].push(cmd);
    });
    return map;
  }, [filteredCommands]);

  // Flattened array for directional arrow-key traversal
  const flattenedCommands = React.useMemo(() => {
    const list: CommandItem[] = [];
    Object.values(groupedCommands).forEach((groupList) => {
      list.push(...groupList);
    });
    return list;
  }, [groupedCommands]);

  // Clamp selectedIndex within bounds
  React.useEffect(() => {
    if (selectedIndex >= flattenedCommands.length) {
      setSelectedIndex(Math.max(0, flattenedCommands.length - 1));
    }
  }, [flattenedCommands.length, selectedIndex]);

  // Format shortcut string with platform modifier
  const formatShortcut = (shortcut?: string) => {
    if (!shortcut) return null;
    const modSymbol = isMac ? '⌘' : 'Ctrl ';
    return shortcut.replace('$mod+', modSymbol).replace('$mod', modSymbol);
  };

  const handleSelectCommand = (cmd: CommandItem) => {
    setLastExecuted(cmd.title);
    cmd.onSelect?.();
    setOpenState(false);
  };

  // 05 Keyboard Navigation & 07 Focus Trap within Dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpenState(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flattenedCommands.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % flattenedCommands.length);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flattenedCommands.length === 0) return;
      setSelectedIndex((prev) => (prev - 1 + flattenedCommands.length) % flattenedCommands.length);
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      setSelectedIndex(0);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      setSelectedIndex(Math.max(0, flattenedCommands.length - 1));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const current = flattenedCommands[selectedIndex];
      if (current) {
        handleSelectCommand(current);
      }
      return;
    }

    // 07 Focus Trap: Keep focus inside search input on Tab
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  // 04 Fuzzy Highlighting
  const renderHighlighted = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="rounded-xs bg-cyan-500/20 px-0.5 font-bold text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-300"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 01 BACKDROP OVERLAY: Semi-transparent blurred layer      */}
      {/* ======================================================== */}
      {isOpen && (
        <div
          role="presentation"
          onClick={() => setOpenState(false)}
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 p-4 pt-[12vh] backdrop-blur-sm transition-opacity duration-150 sm:pt-[15vh]"
        >
          {/* ======================================================== */}
          {/* DIALOG SURFACE                                           */}
          {/* ======================================================== */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command Menu"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className={cn(
              'relative w-full max-w-xl overflow-hidden border border-[#CAD3F5] bg-white text-slate-900 shadow-none transition-all duration-150 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:border-[#CAD3F5] sm:rounded-2xl sm:border sm:border-[#CAD3F5]',
              className,
            )}
          >
            {/* ======================================================== */}
            {/* 02 SEARCH INPUT: Auto-focused with Search icon & ESC badge */}
            {/* ======================================================== */}
            <div className="relative flex items-center border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <Search className="mr-3 size-4 shrink-0 text-slate-400 dark:text-slate-500" />
              <input
                ref={searchInputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-results"
                aria-autocomplete="list"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search routes..."
                className={cn(
                  'w-full bg-transparent font-sans text-sm placeholder-slate-400 outline-none dark:placeholder-slate-500',
                  isDark ? 'text-white' : 'text-slate-950',
                )}
              />

              <div className="flex shrink-0 items-center gap-1.5 pl-2">
                <kbd className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                  ESC
                </kbd>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 03 GROUPED RESULTS: Categorized command list             */}
            {/* ======================================================== */}
            <div
              id="command-palette-results"
              role="listbox"
              className="max-h-[360px] space-y-3 overflow-y-auto p-2"
            >
              {flattenedCommands.length === 0 ? (
                <div className="space-y-1 py-12 text-center">
                  <p className="font-sans text-xs font-semibold text-slate-400">
                    No commands found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    Try searching for dashboard, student, attendance, or settings.
                  </p>
                </div>
              ) : (
                Object.entries(groupedCommands).map(([groupName, groupItems]) => {
                  if (groupItems.length === 0) return null;

                  return (
                    <div key={groupName} className="space-y-1">
                      {/* Uppercase Category Label */}
                      <div className="px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                        {groupName}
                      </div>

                      {groupItems.map((cmd) => {
                        const cmdIndex = flattenedCommands.findIndex((c) => c.id === cmd.id);
                        const isSelected = cmdIndex === selectedIndex;
                        const formattedShortcut = formatShortcut(cmd.shortcut);

                        return (
                          <div
                            key={cmd.id}
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => handleSelectCommand(cmd)}
                            onMouseEnter={() => setSelectedIndex(cmdIndex)}
                            className={cn(
                              'group flex cursor-pointer items-center justify-between gap-3 rounded-[4px] px-3 py-2 text-xs transition-all duration-100',
                              isSelected
                                ? isDark
                                  ? 'bg-slate-800 text-white'
                                  : 'bg-[#E3E7FC]/70 text-[#0056FF]'
                                : isDark
                                  ? 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950',
                            )}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <div
                                className={cn(
                                  'flex size-6 shrink-0 items-center justify-center rounded-[4px] border text-[11px] transition-colors',
                                  isSelected
                                    ? isDark
                                      ? 'border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8]'
                                      : 'border-[#0056FF]/30 bg-[#0056FF]/10 text-[#0056FF]'
                                    : isDark
                                      ? 'border-slate-700 bg-slate-800 text-slate-400'
                                      : 'border-slate-200 bg-slate-50 text-slate-500',
                                )}
                              >
                                <Command className="size-3" />
                              </div>

                              <div className="truncate">
                                <p className="truncate font-sans leading-tight font-semibold">
                                  {/* 04 Fuzzy Highlighting on Title */}
                                  {renderHighlighted(cmd.title, searchQuery)}
                                </p>
                                {cmd.description && (
                                  <p className="truncate font-sans text-[11px] text-slate-500 dark:text-slate-400">
                                    {renderHighlighted(cmd.description, searchQuery)}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* 06 Shortcut Badges */}
                            <div className="flex shrink-0 items-center gap-2">
                              {formattedShortcut && (
                                <kbd
                                  className={cn(
                                    'rounded-md border px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                                    isSelected
                                      ? isDark
                                        ? 'border-slate-600 bg-slate-700 text-white'
                                        : 'border-[#CAD3F5] bg-white text-[#0056FF]'
                                      : isDark
                                        ? 'border-slate-700 bg-slate-800 text-slate-400'
                                        : 'border-slate-200 bg-slate-100 text-slate-500',
                                  )}
                                >
                                  {formattedShortcut}
                                </kbd>
                              )}

                              {isSelected && (
                                <CornerDownLeft className="size-3 text-slate-400 dark:text-slate-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* ======================================================== */}
            {/* FOOTER CONTROLS & PLATFORM STAMP                         */}
            {/* ======================================================== */}
            <div
              className={cn(
                'flex items-center justify-between border-t px-4 py-2 font-mono text-[10px]',
                isDark
                  ? 'border-slate-800 bg-slate-900/40 text-slate-400'
                  : 'border-slate-100 bg-slate-50/70 text-slate-500',
              )}
            >
              <div className="flex items-center gap-3">
                <span>&uarr;&darr; Navigate</span>
                <span>&bull;</span>
                <span>&crarr; Select</span>
                <span>&bull;</span>
                <span>ESC Close</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">PLATFORM:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {isMac ? 'MACOS (⌘K)' : 'WINDOWS/LINUX (CTRL+K)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Action Toast confirmation */}
      {lastExecuted && (
        <div className="sr-only" role="status" aria-live="polite">
          Executed command: {lastExecuted}
        </div>
      )}
    </>
  );
}

/**
 * CommandPaletteInteractiveDemo
 *
 * Interactive documentation library preview with trigger button and live execution banner.
 */
export function CommandPaletteInteractiveDemo() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [executedAction, setExecutedAction] = React.useState<string | null>(null);

  // Platform detection for trigger preview
  const [isMac, setIsMac] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const platform =
        (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform ||
        navigator.platform ||
        navigator.userAgent ||
        '';
      setIsMac(/Mac|iPhone|iPad|iPod/i.test(platform));
    }
  }, []);

  const commandsWithHandler = React.useMemo(() => {
    return DEFAULT_COMMANDS.map((cmd) => ({
      ...cmd,
      onSelect: () => {
        setExecutedAction(cmd.title);
      },
    }));
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Interactive Trigger Card */}
      <div className="mx-auto w-full max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs transition-colors">
        <div className="space-y-1">
          <h4 className="font-sans text-sm font-bold text-slate-900">Universal Command Surface</h4>
          <p className="font-sans text-xs text-slate-500">
            Click the trigger bar below or press {isMac ? '⌘K' : 'Ctrl+K'} anywhere on this page.
          </p>
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-[4px] border border-slate-300 bg-slate-50/80 px-4 py-2.5 font-sans text-xs text-slate-500 transition-all outline-none hover:border-[#0056FF] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#0056FF]"
        >
          <div className="flex items-center gap-2.5">
            <Search className="size-3.5 text-[#0056FF]" />
            <span>Search commands, routes, actions...</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px]">
            <kbd className="rounded-md border border-slate-300 bg-white px-1.5 py-0.5 font-bold text-slate-600 shadow-xs">
              {isMac ? '⌘K' : 'Ctrl+K'}
            </kbd>
          </div>
        </button>

        {/* Direct In-Stage Interactive Commands (Say Less Show More Result - Never Hidden) */}
        <div className="space-y-1.5 pt-2 text-left">
          <div className="flex items-center justify-between pb-1 font-mono text-[10px] font-bold text-slate-400 uppercase">
            <span>Instant Actions</span>
            <span>Click to Execute</span>
          </div>
          {commandsWithHandler.slice(0, 3).map((cmd) => (
            <button
              key={cmd.id}
              type="button"
              onClick={() => cmd.onSelect()}
              className="flex w-full items-center justify-between rounded-[4px] border border-slate-200 bg-white px-3 py-2 text-left font-sans text-xs transition-colors hover:border-[#0056FF] hover:bg-[#E3E7FC]/40"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">{cmd.title}</span>
                {cmd.description && (
                  <span className="text-[11px] text-slate-500">— {cmd.description}</span>
                )}
              </div>
              {cmd.shortcut && (
                <kbd className="rounded-[3px] border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                  {cmd.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>

        {/* Live Execution Feedback */}
        {executedAction && (
          <div className="flex items-center justify-center gap-2 rounded-[4px] border border-emerald-200 bg-emerald-50 p-2.5 font-mono text-xs text-emerald-700">
            <Check className="size-3.5" />
            <span>Executed: &ldquo;{executedAction}&rdquo;</span>
          </div>
        )}
      </div>

      {/* The Actual Command Palette Overlay Dialog */}
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        commands={commandsWithHandler}
        theme="light"
      />
    </div>
  );
}
