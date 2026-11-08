'use client';

import * as React from 'react';
import {
  Compass,
  BookOpen,
  Globe,
  Server,
  ShieldCheck,
  Lock,
  Terminal,
  FileText,
  Layers,
  Search,
  ChevronRight,
  X,
} from '@/components/icons';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { MOTION_EASE_OUT } from '@/lib/motion';
import { ApiSpecTable } from './api-spec-table';
import { ApiHero } from './page-heroes';
import { ParamTable, type ApiParameter } from './param-table';
import { CodeBlock } from './code-block';

// ============================================================================
// DATA STRUCTURES & DEFINITIONS (SANITIZED PUBLIC DISPLAY STANDARD)
// ============================================================================

export interface ApiNavItem {
  id: string;
  label: string;
  badge?: 'GET' | 'POST';
  description?: string;
}

export interface ApiNavGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: ApiNavItem[];
}

export const API_ROOT_NAV: ApiNavItem[] = [
  { id: 'changelogs', label: 'Change Logs', description: 'Version history & updates' },
  { id: 'toc', label: 'Table of contents', description: 'Jump navigation index' },
];

export const API_NAV_GROUPS: ApiNavGroup[] = [
  {
    id: 'grp-introduction',
    title: 'Introduction',
    icon: BookOpen,
    items: [
      { id: 'introduction', label: 'Welcome & Overview' },
      { id: 'purpose', label: '1. Purpose' },
      { id: 'scope', label: '2. Scope' },
      { id: 'overall-api', label: '3. Overall API' },
    ],
  },
  {
    id: 'grp-security',
    title: 'Security & Access',
    icon: ShieldCheck,
    items: [
      { id: 'security', label: '4. Security & Access Control' },
      { id: 'status-codes', label: '5. HTTP Status Codes' },
    ],
  },
  {
    id: 'grp-public',
    title: 'Public Services',
    icon: Globe,
    items: [
      { id: 'api-health', label: '1.1 System Health Probe', badge: 'GET' },
      { id: 'api-cert-verify', label: '1.2 Verify Certificate', badge: 'GET' },
    ],
  },
  {
    id: 'grp-protected',
    title: 'Protected Services',
    icon: Lock,
    items: [
      { id: 'api-auth-login', label: '2.1 User Authentication', badge: 'POST' },
      { id: 'api-auth-refresh', label: '2.2 Renew Session Token', badge: 'POST' },
      { id: 'api-auth-me', label: '2.3 Profile & Permissions', badge: 'GET' },
      { id: 'api-students-list', label: '2.4 Student Directory', badge: 'GET' },
      { id: 'api-students-create', label: '2.5 Student Registration', badge: 'POST' },
      { id: 'api-attendance-create', label: '2.6 Session Attendance', badge: 'POST' },
      { id: 'api-payments-create', label: '2.7 Payment Records', badge: 'POST' },
    ],
  },
];

export const ALL_SCROLLABLE_SECTIONS: string[] = [
  'changelogs',
  'toc',
  'introduction',
  'purpose',
  'scope',
  'overall-api',
  'security',
  'status-codes',
  'api-health',
  'api-cert-verify',
  'api-auth-login',
  'api-auth-refresh',
  'api-auth-me',
  'api-students-list',
  'api-students-create',
  'api-attendance-create',
  'api-payments-create',
];

const CHANGE_LOGS_DATA = [
  {
    version: '1.1.0',
    date: '05.11.2026',
    description: 'Official REST API release with token authentication.',
  },
  {
    version: '1.0.4',
    date: '24.10.2026',
    description: 'Student lifecycle, attendance, and payment endpoints.',
  },
  {
    version: '1.0.2',
    date: '10.10.2026',
    description: 'Public certificate verification endpoint.',
  },
  {
    version: '1.0.0',
    date: '01.09.2026',
    description: 'Initial SNPI Open REST API specification.',
  },
];

const OVERALL_API_SUMMARY = [
  {
    no: 1,
    name: 'System Health Probe',
    method: 'GET',
    url: '{{baseUrl}}/health',
    auth: 'Public (Open)',
    sectionId: 'api-health',
  },
  {
    no: 2,
    name: 'Certificate Ledger Verification',
    method: 'GET',
    url: '{{baseUrl}}/certificates/verify/:hash',
    auth: 'Public (Open)',
    sectionId: 'api-cert-verify',
  },
  {
    no: 3,
    name: 'User Authentication (Login)',
    method: 'POST',
    url: '{{baseUrl}}/auth/login',
    auth: 'User Credentials',
    sectionId: 'api-auth-login',
  },
  {
    no: 4,
    name: 'Renew Session Token',
    method: 'POST',
    url: '{{baseUrl}}/auth/refresh',
    auth: 'Refresh Token',
    sectionId: 'api-auth-refresh',
  },
  {
    no: 5,
    name: 'User Profile & Permissions',
    method: 'GET',
    url: '{{baseUrl}}/auth/me',
    auth: 'Bearer Token (Authorized)',
    sectionId: 'api-auth-me',
  },
  {
    no: 6,
    name: 'List Students',
    method: 'GET',
    url: '{{baseUrl}}/students',
    auth: 'Bearer Token (Authorized)',
    sectionId: 'api-students-list',
  },
  {
    no: 7,
    name: 'Create Student',
    method: 'POST',
    url: '{{baseUrl}}/students',
    auth: 'Bearer Token (Authorized)',
    sectionId: 'api-students-create',
  },
  {
    no: 8,
    name: 'Record Daily Attendance',
    method: 'POST',
    url: '{{baseUrl}}/attendance',
    auth: 'Bearer Token (Authorized)',
    sectionId: 'api-attendance-create',
  },
  {
    no: 9,
    name: 'Record Payment Transaction',
    method: 'POST',
    url: '{{baseUrl}}/payments',
    auth: 'Bearer Token (Authorized)',
    sectionId: 'api-payments-create',
  },
];

const STATUS_CODES_DATA = [
  {
    code: '200 OK',
    meaning: 'Standard successful response for valid inquiry or update requests.',
    action: 'Payload processed successfully.',
  },
  {
    code: '201 Created',
    meaning: 'Resource successfully created on the server.',
    action: 'Returns newly created entity ID and confirmation payload.',
  },
  {
    code: '400 Bad Request',
    meaning: 'Malformed request payload, invalid parameters, or schema validation failure.',
    action: 'Verify required parameters and input data formats.',
  },
  {
    code: '401 Unauthorized',
    meaning: 'Missing or invalid Bearer authentication token, or session has expired.',
    action: 'Provide a valid access token in the Authorization header.',
  },
  {
    code: '403 Forbidden',
    meaning: 'Authenticated identity lacks the required permission for this resource.',
    action: 'Check user role and permissions scope.',
  },
  {
    code: '404 Not Found',
    meaning: 'The requested resource entity or endpoint does not exist.',
    action: 'Confirm entity identifier and endpoint path.',
  },
  {
    code: '429 Too Many Requests',
    meaning: 'Rate limit threshold exceeded.',
    action: 'Implement exponential backoff retry logic.',
  },
  {
    code: '500 Server Error',
    meaning: 'Internal service exception encountered.',
    action: 'Contact platform support with the request timestamp.',
  },
];

// Standard sanitized headers for external consumers
const STANDARD_PROTECTED_HEADERS: ApiParameter[] = [
  {
    parameter: 'Content-Type',
    type: 'String',
    mandatory: 1,
    description: 'application/json',
  },
  {
    parameter: 'Authorization',
    type: 'String',
    mandatory: 1,
    description: 'Bearer <AUTHENTICATION_TOKEN>',
  },
];

const STANDARD_GET_PROTECTED_HEADERS: ApiParameter[] = [
  {
    parameter: 'Accept',
    type: 'String',
    mandatory: 0,
    description: 'application/json',
  },
  {
    parameter: 'Authorization',
    type: 'String',
    mandatory: 1,
    description: 'Bearer <AUTHENTICATION_TOKEN>',
  },
];

// ============================================================================
// MAIN COMPONENT: OPEN API DOCUMENTATION PORTAL
// ============================================================================

export function OpenApiView({ initialSection }: { initialSection?: string } = {}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const isManualScrollRef = React.useRef<boolean>(false);
  const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [activeSection, setActiveSection] = React.useState<string>(initialSection || 'changelogs');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    'grp-introduction': true,
    'grp-security': true,
    'grp-public': true,
    'grp-protected': true,
  });

  // Toggle group accordion
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K to focus search input
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    isManualScrollRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  // Filtered groups & items matching search query
  const q = searchQuery.trim().toLowerCase();
  const displayGroups = React.useMemo(() => {
    if (!q) return API_NAV_GROUPS;
    return API_NAV_GROUPS.map((group) => {
      const groupMatches = group.title.toLowerCase().includes(q);
      const matchedItems = group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q)),
      );
      return {
        ...group,
        items: groupMatches ? group.items : matchedItems,
        isMatched: groupMatches || matchedItems.length > 0,
      };
    }).filter((group) => group.isMatched);
  }, [q]);

  const displayRootItems = React.useMemo(() => {
    if (!q) return API_ROOT_NAV;
    return API_ROOT_NAV.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)),
    );
  }, [q]);

  // Scroll listener for sticky active anchor
  React.useEffect(() => {
    const handleScroll = () => {
      if (!rootRef.current || rootRef.current.offsetParent === null || isManualScrollRef.current) {
        return;
      }
      const scrollPosition = window.scrollY + 160;
      for (let i = ALL_SCROLLABLE_SECTIONS.length - 1; i >= 0; i--) {
        const sectionId = ALL_SCROLLABLE_SECTIONS[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            // Ensure parent group is expanded if section belongs to one
            const parent = API_NAV_GROUPS.find((g) =>
              g.items.some((item) => item.id === sectionId),
            );
            if (parent) {
              setExpandedGroups((prev) =>
                prev[parent.id] ? prev : { ...prev, [parent.id]: true },
              );
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen w-full bg-[#FFFFFF] text-[#020617]">
      <div className="mx-auto flex max-w-[1520px] items-start gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =================================================================== */}
        {/* TIKTOK-STYLE DEVELOPER DOCS SIDEBAR NAVIGATION                     */}
        {/* =================================================================== */}
        <aside className="sticky top-24 hidden w-80 shrink-0 space-y-3.5 self-start lg:block">
          <div className="rounded-2xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 shadow-2xs">
            {/* Top Identity Header */}
            <div className="mb-3 px-1">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-black tracking-tight text-[#020617]">
                  Developer Docs
                </h2>
                <span
                  className="rounded-[2px] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]"
                  style={{ borderRadius: '2px' }}
                >
                  v1.1.0 · OpenAPI
                </span>
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                SNPI REST Engine & Endpoints
              </p>
            </div>

            {/* TikTok-Style Quick Filter / Search */}
            <div className="relative mb-3 px-0.5">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 stroke-[2] text-[#0056FF]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search endpoints... ⌘K"
                className="h-11 w-full rounded-[4px] border border-[#CAD3F5] bg-[#EFF5FF] pr-8 pl-10 text-sm text-[#020617] transition-colors placeholder:text-[#0056FF]/60 hover:border-[#2277FF] focus:border-[#0056FF] focus:bg-white focus:ring-2 focus:ring-[#0056FF]/20 focus:outline-none"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-slate-400 transition-colors hover:text-slate-600"
                >
                  <X className="size-3.5" />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-[#CAD3F5] bg-white px-1 font-mono text-[9px] font-semibold text-slate-400">
                  ⌘K
                </kbd>
              )}
            </div>

            {/* Hierarchical Accordion Navigation */}
            <nav className="max-h-[calc(100vh-270px)] space-y-1 overflow-y-auto pr-1">
              {displayGroups.map((group) => {
                const isExpanded = q ? true : !!expandedGroups[group.id];
                const GroupIcon = group.icon;
                const hasActiveChild = group.items.some((item) => item.id === activeSection);

                return (
                  <div key={group.id} className="space-y-0.5">
                    {/* Collapsible Group Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.id)}
                      className={cn(
                        'group flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left transition-all duration-150 active:scale-[0.98]',
                        hasActiveChild
                          ? 'bg-[#EFF5FF]/70 font-bold text-[#0056FF]'
                          : 'font-bold text-slate-800 hover:bg-[#EFF5FF]/50 hover:text-[#0056FF]',
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <GroupIcon className="size-3.5 shrink-0 stroke-[2.2] text-[#020617]" />
                        <span className="truncate text-xs tracking-tight">{group.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-slate-400">
                          {group.items.length}
                        </span>
                        <ChevronRight
                          className={cn(
                            'size-3.5 shrink-0 text-slate-400 transition-transform duration-200 ease-out',
                            isExpanded && 'rotate-90 text-[#0056FF]',
                          )}
                        />
                      </div>
                    </button>

                    {/* Group Children Drawer */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.2, ease: MOTION_EASE_OUT },
                              opacity: { duration: 0.18, ease: MOTION_EASE_OUT },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.16, ease: [0.7, 0, 0.84, 0] },
                              opacity: { duration: 0.12 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-3.5 space-y-0.5 border-l border-[#CAD3F5]/80 py-0.5 pl-2">
                            {group.items.map((item) => {
                              const isActive = activeSection === item.id;
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => scrollToSection(item.id)}
                                  className={cn(
                                    'group flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-left text-xs transition-all duration-150 active:scale-[0.97]',
                                    isActive
                                      ? 'border-l-[3px] border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF] shadow-2xs'
                                      : 'border-l-[3px] border-transparent font-medium text-slate-600 hover:bg-[#EFF5FF]/60 hover:text-[#0056FF]',
                                  )}
                                >
                                  <span className="truncate pr-1">{item.label}</span>
                                  {item.badge && (
                                    <span
                                      className={cn(
                                        'w-9 shrink-0 rounded-[2px] py-0.5 text-center font-mono text-[9px] font-bold',
                                        item.badge === 'GET'
                                          ? 'bg-[#E3E7FC] text-[#0056FF]'
                                          : 'bg-emerald-100 text-emerald-800',
                                      )}
                                      style={{ borderRadius: '2px' }}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Root Standalone Links (matching TikTok Changelog style at bottom) */}
              <div className="mt-3 space-y-0.5 border-t border-[#CAD3F5]/80 pt-2.5">
                {displayRootItems.map((item) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.id === 'changelogs' ? FileText : Compass;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        'group flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-all duration-150 active:scale-[0.98]',
                        isActive
                          ? 'border-l-[3px] border-[#0056FF] bg-[#EFF5FF] font-bold text-[#0056FF] shadow-2xs'
                          : 'border-l-[3px] border-transparent font-bold text-slate-700 hover:bg-[#EFF5FF]/60 hover:text-[#0056FF]',
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="size-3.5 shrink-0 stroke-[2.2] text-[#020617]" />
                        <span className="truncate">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Empty Search Feedback */}
              {q && displayGroups.length === 0 && displayRootItems.length === 0 && (
                <div className="rounded-lg border border-dashed border-[#CAD3F5] p-3 text-center">
                  <p className="text-xs font-bold text-slate-700">No endpoints found</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Try searching for &quot;health&quot;, &quot;student&quot;, or &quot;auth&quot;
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-2 cursor-pointer rounded-[2px] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-[#E3E7FC]"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Clean Enterprise Gateway Card */}
          <div className="rounded-xl border border-[#CAD3F5] bg-white p-3 shadow-2xs transition-colors hover:border-[#0056FF]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-extrabold text-[#020617]">
                    Enterprise Gateway
                  </div>
                  <div className="font-mono text-[10px] text-slate-500">TLS 1.3 · Bearer Token</div>
                </div>
              </div>
              <span
                className="rounded-[2px] bg-emerald-100 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-emerald-800 uppercase"
                style={{ borderRadius: '2px' }}
              >
                ACTIVE
              </span>
            </div>
          </div>
        </aside>

        {/* =================================================================== */}
        {/* MAIN DOCUMENTATION CONTENT                                         */}
        {/* =================================================================== */}
        <main className="min-w-0 flex-1 space-y-12 pb-32">
          {/* ----------------------------------------------------------------- */}
          {/* HEADER SECTION                                                    */}
          {/* ----------------------------------------------------------------- */}
          <div className="border-b border-[#CAD3F5] pb-6">
            <ApiHero />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 1: CHANGE LOGS                                            */}
          {/* ----------------------------------------------------------------- */}
          <section id="changelogs" className="scroll-mt-28 space-y-3">
            <div className="flex items-center gap-3">
              <FileText className="size-6 shrink-0 stroke-[2] text-[#020617]" />
              <h2 className="text-xl font-bold tracking-tight text-[#020617] sm:text-2xl">
                Change Logs
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#020617]">
                      <th className="w-28 px-4 py-2.5">Version</th>
                      <th className="w-32 px-4 py-2.5">Date</th>
                      <th className="px-4 py-2.5">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CAD3F5]/60">
                    {CHANGE_LOGS_DATA.map((row) => (
                      <tr key={row.version} className="hover:bg-[#EFF5FF]/40">
                        <td className="px-4 py-3 font-mono font-bold text-[#0056FF]">
                          {row.version}
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600">{row.date}</td>
                        <td className="px-4 py-3 text-slate-800">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 2: TABLE OF CONTENTS                                      */}
          {/* ----------------------------------------------------------------- */}
          <section id="toc" className="scroll-mt-28 space-y-3">
            <div className="flex items-center gap-3">
              <Layers className="size-6 shrink-0 stroke-[2] text-[#020617]" />
              <h2 className="text-xl font-bold tracking-tight text-[#020617] sm:text-2xl">
                Table of contents
              </h2>
            </div>

            <div className="rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-4 font-mono text-xs">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <span className="font-bold text-[#0056FF]">[[toc]] Overview</span>
                  <ul className="space-y-1 pl-2 text-slate-700">
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('introduction')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        1. Introduction (Purpose, Scope, Architecture)
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('overall-api')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        2. Overall API Catalog
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('security')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        3. Security & Access Control
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('status-codes')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        4. HTTP Status Codes Matrix
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-[#0056FF]">Endpoints Catalog</span>
                  <ul className="space-y-1 pl-2 text-slate-700">
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('public-apis')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        [Public] /health, /certificates/verify/:hash
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('protected-apis')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        [Protected] /auth/login, /auth/refresh, /auth/me
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => scrollToSection('api-students-list')}
                        className="hover:text-[#0056FF] hover:underline"
                      >
                        [Protected] /students, /attendance, /payments
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 3: INTRODUCTION                                           */}
          {/* ----------------------------------------------------------------- */}
          <section id="introduction" className="scroll-mt-28 space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="size-6 shrink-0 stroke-[2] text-[#020617]" />
              <h2 className="text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                Introduction
              </h2>
            </div>

            {/* 1. Purpose */}
            <div id="purpose" className="scroll-mt-28 space-y-1">
              <h3 className="text-base font-bold text-[#020617]">1. Purpose</h3>
              <p className="text-xs text-slate-700">
                Technical specification for SNPI Open API integration.
              </p>
            </div>

            {/* 2. Scope */}
            <div id="scope" className="scroll-mt-28 space-y-1">
              <h3 className="text-base font-bold text-[#020617]">2. Scope</h3>
              <p className="text-xs text-slate-700">
                Contracts, authentication, endpoints, parameters, and response schemas.
              </p>
            </div>

            {/* 3. Overall API */}
            <div id="overall-api" className="scroll-mt-28 space-y-3">
              <div className="flex items-center gap-3">
                <Server className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <h3 className="text-base font-bold text-[#020617]">3. Overall API</h3>
              </div>
              <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#020617]">
                        <th className="w-12 px-4 py-2.5">No</th>
                        <th className="px-4 py-2.5">Name</th>
                        <th className="w-20 px-4 py-2.5">Method</th>
                        <th className="px-4 py-2.5">URL</th>
                        <th className="px-4 py-2.5">Access Scope</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CAD3F5]/60">
                      {OVERALL_API_SUMMARY.map((row) => (
                        <tr
                          key={row.no}
                          onClick={() => scrollToSection(row.sectionId)}
                          className="cursor-pointer transition-colors hover:bg-[#EFF5FF]/60"
                        >
                          <td className="px-4 py-2.5 font-mono text-slate-500">{row.no}</td>
                          <td className="px-4 py-2.5 font-bold text-[#020617]">{row.name}</td>
                          <td className="px-4 py-2.5">
                            <span
                              className={cn(
                                'rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] font-bold',
                                row.method === 'GET'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'bg-emerald-600 text-white',
                              )}
                              style={{ borderRadius: '2px' }}
                            >
                              [{row.method}]
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-[11px] text-[#0056FF]">{row.url}</code>
                          </td>
                          <td className="px-4 py-2.5 text-slate-700">
                            <span
                              className="rounded-[2px] bg-[#E3E7FC] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]"
                              style={{ borderRadius: '2px' }}
                            >
                              {row.auth}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4. Security & Access Control */}
            <div id="security" className="scroll-mt-28 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <h3 className="text-base font-bold text-[#020617]">
                  4. Security &amp; Institutional Access Control
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Public Tier */}
                <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-4 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#020617]">
                    <Server className="size-4 shrink-0 stroke-[2] text-[#020617]" />
                    <span>Public Inquiry Tier (Open)</span>
                  </div>
                  <code
                    className="block rounded-[2px] bg-[#EFF5FF] p-2 font-mono text-[11px] text-[#020617]"
                    style={{ borderRadius: '2px' }}
                  >
                    GET /health, GET /certificates/verify/:hash
                  </code>
                </div>

                {/* Protected Tier */}
                <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-4 shadow-2xs">
                  <div className="flex items-center gap-2.5 text-xs font-bold text-[#020617]">
                    <Lock className="size-4 shrink-0 stroke-[2] text-[#020617]" />
                    <span>Institutional Partner Tier (Restricted)</span>
                  </div>
                  <code
                    className="block rounded-[2px] bg-[#EFF5FF] p-2 font-mono text-[11px] text-[#020617]"
                    style={{ borderRadius: '2px' }}
                  >
                    Authorization: Bearer &lt;AUTHENTICATION_TOKEN&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* 5. HTTP Status Codes */}
            <div id="status-codes" className="scroll-mt-28 space-y-3">
              <div className="flex items-center gap-3">
                <Terminal className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <h3 className="text-base font-bold text-[#020617]">5. HTTP Status Codes</h3>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#020617]">
                        <th className="w-24 px-4 py-2.5">Code</th>
                        <th className="px-4 py-2.5">Meaning</th>
                        <th className="px-4 py-2.5">Action & Troubleshooting</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CAD3F5]/60">
                      {STATUS_CODES_DATA.map((row) => (
                        <tr key={row.code} className="hover:bg-[#EFF5FF]/40">
                          <td className="px-4 py-2.5 font-mono font-bold text-[#0056FF]">
                            {row.code}
                          </td>
                          <td className="px-4 py-2.5 font-medium text-[#020617]">{row.meaning}</td>
                          <td className="px-4 py-2.5 text-slate-700">{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 4: API DOCUMENTATION                                      */}
          {/* ----------------------------------------------------------------- */}
          <section id="api-documentation" className="scroll-mt-28 space-y-12">
            <div className="flex items-center gap-3">
              <FileText className="size-6 shrink-0 stroke-[2] text-[#020617]" />
              <h2 className="text-2xl font-black tracking-tight text-[#020617] sm:text-3xl">
                API Documentation
              </h2>
            </div>

            {/* =============================================================== */}
            {/* PUBLIC APIS                                                     */}
            {/* =============================================================== */}
            <div id="public-apis" className="scroll-mt-28 space-y-8 border-t border-[#CAD3F5] pt-6">
              <div className="flex items-center gap-3">
                <Server className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-[2px] bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800"
                    style={{ borderRadius: '2px' }}
                  >
                    [PUBLIC]
                  </span>
                  <h3 className="text-xl font-black text-[#020617]">1. Public Endpoints</h3>
                </div>
              </div>

              {/* 1.1 System Health Probe */}
              <article id="api-health" className="scroll-mt-28 space-y-4">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    1.1 System Health Probe (GET /health)
                  </h4>
                  <span className="rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [GET]
                  </span>
                </div>

                <ApiSpecTable
                  method="GET"
                  endpoint="{{baseUrl}}/health"
                  name="System Health Probe"
                  description="System health inspection probe."
                  authRequirement="Public (Open Access)"
                />

                <ParamTable
                  title="Headers"
                  parameters={[
                    {
                      parameter: 'Accept',
                      type: 'String',
                      mandatory: 0,
                      description: 'application/json',
                    },
                  ]}
                />

                <ParamTable title="Query Parameters" parameters={[]} />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">
                    Sample Request (cURL)
                  </span>
                  <CodeBlock
                    language="bash"
                    code="curl -X GET 'https://snpis.kesararamwithdigital.tech/api/v1/health' -H 'Accept: application/json'"
                    title="curl-health.sh"
                    statusBadge="GET /health"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'status',
                      type: 'String',
                      mandatory: 1,
                      description: 'Operational health status (healthy | degraded)',
                    },
                    {
                      parameter: 'timestamp',
                      type: 'String',
                      mandatory: 1,
                      description: 'ISO 8601 server timestamp',
                    },
                    {
                      parameter: 'version',
                      type: 'String',
                      mandatory: 1,
                      description: 'API engine release version',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      status: 'healthy',
                      timestamp: '2026-11-05T12:00:00.000Z',
                      version: '1.1.0',
                    }}
                    title="health-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 1.2 Certificate Ledger Verification */}
              <article id="api-cert-verify" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    1.2 Certificate Ledger Verification (GET /certificates/verify/:hash)
                  </h4>
                  <span className="rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [GET]
                  </span>
                </div>

                <ApiSpecTable
                  method="GET"
                  endpoint="{{baseUrl}}/certificates/verify/:hash"
                  name="Certificate Ledger Verification"
                  description="Public cryptographic proof verification."
                  authRequirement="Public (Open Access)"
                />

                <ParamTable
                  title="URL Path Parameters"
                  parameters={[
                    {
                      parameter: 'hash',
                      type: 'String',
                      mandatory: 1,
                      description:
                        '64-character lowercase hexadecimal SHA-256 hash or certificate unique code',
                    },
                  ]}
                />

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Verification outcome',
                    },
                    {
                      parameter: 'verified',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Cryptographic signature authenticity indicator',
                    },
                    {
                      parameter: 'certificate',
                      type: 'Object',
                      mandatory: 1,
                      description:
                        'Certified student record, award title, graduation date, and tamper seal',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      verified: true,
                      certificate: {
                        certificateId: 'CERT-2026-0042',
                        recipient: 'SOK CHANTHA',
                        program: 'Information Technology & Software Engineering',
                        level: 'Associate Degree',
                        issueDate: '2026-10-15',
                        ledgerHash:
                          'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
                        status: 'VALID',
                      },
                    }}
                    title="cert-verify-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>
            </div>

            {/* =============================================================== */}
            {/* PROTECTED APIS (INSTITUTIONAL AUTHORIZATION REQUIRED)           */}
            {/* =============================================================== */}
            <div
              id="protected-apis"
              className="scroll-mt-28 space-y-8 border-t border-[#CAD3F5] pt-6"
            >
              <div className="flex items-center gap-3">
                <Lock className="size-5 shrink-0 stroke-[2] text-[#020617]" />
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-[2px] bg-[#E3E7FC] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]"
                    style={{ borderRadius: '2px' }}
                  >
                    [RESTRICTED]
                  </span>
                  <h3 className="text-xl font-black text-[#020617]">
                    2. Institutional Protected Services
                  </h3>
                </div>
              </div>

              {/* 2.1 User Login */}
              <article id="api-auth-login" className="scroll-mt-28 space-y-4">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.1 User Authentication (POST /auth/login)
                  </h4>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [POST]
                  </span>
                </div>

                <ApiSpecTable
                  method="POST"
                  endpoint="{{baseUrl}}/auth/login"
                  name="User Authentication"
                  description="Authenticates staff credentials and returns tokens."
                  authRequirement="Account Credentials"
                />

                <ParamTable
                  title="Headers"
                  parameters={[
                    {
                      parameter: 'Content-Type',
                      type: 'String',
                      mandatory: 1,
                      description: 'application/json',
                    },
                  ]}
                />

                <ParamTable
                  title="Request Body Parameters"
                  parameters={[
                    {
                      parameter: 'identifier',
                      type: 'String',
                      mandatory: 1,
                      description: 'Authorized account username or registered email address',
                    },
                    {
                      parameter: 'password',
                      type: 'String',
                      mandatory: 1,
                      description: 'Account authentication credential',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">Sample Request</span>
                  <CodeBlock
                    language="json"
                    code={{
                      identifier: '<AUTHORIZED_USER_EMAIL>',
                      password: '<SECURE_AUTHENTICATION_CREDENTIAL>',
                    }}
                    title="auth-login-request.json"
                    statusBadge="POST /auth/login"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Request status outcome',
                    },
                    {
                      parameter: 'accessToken',
                      type: 'String',
                      mandatory: 1,
                      description: 'Signed 15-minute Bearer access token',
                    },
                    {
                      parameter: 'refreshToken',
                      type: 'String',
                      mandatory: 1,
                      description: 'Session rotation refresh token',
                    },
                    {
                      parameter: 'user',
                      type: 'Object',
                      mandatory: 1,
                      description: 'User profile with roles and branch tenancy',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      accessToken: '<JWT_ACCESS_TOKEN_SAMPLE>',
                      refreshToken: '<REFRESH_TOKEN_SAMPLE>',
                      user: {
                        userId: '<USER_UUID>',
                        email: '<AUTHORIZED_USER_EMAIL>',
                        roles: ['staff'],
                        branchAccess: 'all',
                      },
                    }}
                    title="auth-login-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.2 Renew Token */}
              <article id="api-auth-refresh" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.2 Renew Session Token (POST /auth/refresh)
                  </h4>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [POST]
                  </span>
                </div>

                <ApiSpecTable
                  method="POST"
                  endpoint="{{baseUrl}}/auth/refresh"
                  name="Renew Session Token"
                  description="Rotates refresh token for new access token."
                  authRequirement="Valid Refresh Token"
                />

                <ParamTable
                  title="Headers"
                  parameters={[
                    {
                      parameter: 'Content-Type',
                      type: 'String',
                      mandatory: 1,
                      description: 'application/json',
                    },
                  ]}
                />

                <ParamTable
                  title="Request Body Parameters"
                  parameters={[
                    {
                      parameter: 'refreshToken',
                      type: 'String',
                      mandatory: 1,
                      description:
                        'Valid refresh token string (or submitted automatically via httpOnly cookie)',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">Sample Request</span>
                  <CodeBlock
                    language="json"
                    code={{
                      refreshToken: '<REFRESH_TOKEN_SAMPLE>',
                    }}
                    title="auth-refresh-request.json"
                    statusBadge="POST /auth/refresh"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Token rotation status',
                    },
                    {
                      parameter: 'accessToken',
                      type: 'String',
                      mandatory: 1,
                      description: 'New signed 15-minute Bearer access token',
                    },
                    {
                      parameter: 'refreshToken',
                      type: 'String',
                      mandatory: 1,
                      description: 'Rotated refresh token for the next rotation cycle',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      accessToken: '<JWT_ACCESS_TOKEN_SAMPLE>',
                      refreshToken: '<ROTATED_REFRESH_TOKEN_SAMPLE>',
                    }}
                    title="auth-refresh-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.3 User Profile & Permissions */}
              <article id="api-auth-me" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.3 User Profile & Permissions (GET /auth/me)
                  </h4>
                  <span className="rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [GET]
                  </span>
                </div>

                <ApiSpecTable
                  method="GET"
                  endpoint="{{baseUrl}}/auth/me"
                  name="User Profile & Permissions"
                  description="Returns authenticated profile and permissions."
                  authRequirement="Institutional Authorization (Bearer Token)"
                />

                <ParamTable title="Headers" parameters={STANDARD_GET_PROTECTED_HEADERS} />

                <ParamTable title="Query Parameters" parameters={[]} />

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Request status outcome',
                    },
                    {
                      parameter: 'data',
                      type: 'Object',
                      mandatory: 1,
                      description:
                        'User profile containing user ID, email, roles array, and permissions array',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      data: {
                        id: '<USER_UUID>',
                        email: '<AUTHORIZED_USER_EMAIL>',
                        roles: ['staff'],
                        permissions: ['students:read', 'attendance:write'],
                        branchAccess: ['<BRANCH_ID>'],
                        status: 'active',
                      },
                    }}
                    title="auth-me-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.4 List Students */}
              <article id="api-students-list" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.4 List Students (GET /students)
                  </h4>
                  <span className="rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [GET]
                  </span>
                </div>

                <ApiSpecTable
                  method="GET"
                  endpoint="{{baseUrl}}/students"
                  name="List Students"
                  description="Paginated student directory."
                  authRequirement="Institutional Authorization (Bearer Token)"
                />

                <ParamTable title="Headers" parameters={STANDARD_GET_PROTECTED_HEADERS} />

                <ParamTable
                  title="Query Parameters"
                  parameters={[
                    {
                      parameter: 'page',
                      type: 'Number',
                      mandatory: 0,
                      description: 'Page number for pagination (default: 1)',
                    },
                    {
                      parameter: 'limit',
                      type: 'Number',
                      mandatory: 0,
                      description: 'Page size limit (default: 20, max: 100)',
                    },
                    {
                      parameter: 'search',
                      type: 'String',
                      mandatory: 0,
                      description: 'Search string for student name or identifier',
                    },
                    {
                      parameter: 'branchId',
                      type: 'String',
                      mandatory: 0,
                      description: 'Filter by campus branch identifier',
                    },
                    {
                      parameter: 'status',
                      type: 'String',
                      mandatory: 0,
                      description: 'Filter by student status (active | inactive | graduated)',
                    },
                  ]}
                />

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Request execution outcome',
                    },
                    {
                      parameter: 'data',
                      type: 'Array<Object>',
                      mandatory: 1,
                      description: 'Array of student entity records',
                    },
                    {
                      parameter: 'pagination',
                      type: 'Object',
                      mandatory: 1,
                      description: 'Pagination metadata: total, page, limit, pages',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      data: [
                        {
                          studentId: 'STU-2026-0001',
                          branchId: '<BRANCH_ID>',
                          firstName: 'Sok',
                          lastName: 'Dara',
                          khmerName: 'សុខ តារា',
                          gender: 'male',
                          dateOfBirth: '2008-05-14',
                          status: 'active',
                        },
                      ],
                      pagination: {
                        total: 1250,
                        page: 1,
                        limit: 20,
                        pages: 63,
                      },
                    }}
                    title="students-list-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.5 Create Student */}
              <article id="api-students-create" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.5 Create Student (POST /students)
                  </h4>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [POST]
                  </span>
                </div>

                <ApiSpecTable
                  method="POST"
                  endpoint="{{baseUrl}}/students"
                  name="Create Student"
                  description="Enrolls new student with branch tenancy."
                  authRequirement="Institutional Authorization (Bearer Token)"
                />

                <ParamTable title="Headers" parameters={STANDARD_PROTECTED_HEADERS} />

                <ParamTable
                  title="Request Body Parameters"
                  parameters={[
                    {
                      parameter: 'branchId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Campus branch identifier',
                    },
                    {
                      parameter: 'firstName',
                      type: 'String',
                      mandatory: 1,
                      description: 'Student first name (Latin script)',
                    },
                    {
                      parameter: 'lastName',
                      type: 'String',
                      mandatory: 1,
                      description: 'Student last name (Latin script)',
                    },
                    {
                      parameter: 'khmerName',
                      type: 'String',
                      mandatory: 1,
                      description: 'Student full name in Khmer script',
                    },
                    {
                      parameter: 'gender',
                      type: 'String',
                      mandatory: 1,
                      description: 'Student gender: male | female | other',
                    },
                    {
                      parameter: 'dateOfBirth',
                      type: 'String',
                      mandatory: 1,
                      description: 'Date of birth in YYYY-MM-DD format',
                    },
                    {
                      parameter: 'phone',
                      type: 'String',
                      mandatory: 0,
                      description: 'Contact telephone number',
                    },
                    {
                      parameter: 'status',
                      type: 'String',
                      mandatory: 0,
                      description: 'Enrollment status (default: active)',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">Sample Request</span>
                  <CodeBlock
                    language="json"
                    code={{
                      branchId: '<BRANCH_ID>',
                      firstName: 'Sok',
                      lastName: 'Dara',
                      khmerName: 'សុខ តារា',
                      gender: 'male',
                      dateOfBirth: '2008-05-14',
                      phone: '+85512345678',
                      status: 'active',
                    }}
                    title="student-create-request.json"
                    statusBadge="POST /students"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Creation outcome',
                    },
                    {
                      parameter: 'data',
                      type: 'Object',
                      mandatory: 1,
                      description: 'Created student record with assigned student identifier',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (201 Created)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      data: {
                        studentId: 'STU-2026-0001',
                        branchId: '<BRANCH_ID>',
                        firstName: 'Sok',
                        lastName: 'Dara',
                        khmerName: 'សុខ តារា',
                        gender: 'male',
                        dateOfBirth: '2008-05-14',
                        status: 'active',
                        createdAt: '2026-11-05T12:00:00.000Z',
                      },
                    }}
                    title="student-create-201.json"
                    statusBadge="201 CREATED"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.6 Record Daily Attendance */}
              <article id="api-attendance-create" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.6 Record Daily Attendance (POST /attendance)
                  </h4>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [POST]
                  </span>
                </div>

                <ApiSpecTable
                  method="POST"
                  endpoint="{{baseUrl}}/attendance"
                  name="Record Daily Attendance"
                  description="Submits daily session attendance records."
                  authRequirement="Institutional Authorization (Bearer Token)"
                />

                <ParamTable title="Headers" parameters={STANDARD_PROTECTED_HEADERS} />

                <ParamTable
                  title="Request Body Parameters"
                  parameters={[
                    {
                      parameter: 'branchId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Campus branch identifier',
                    },
                    {
                      parameter: 'academicYearId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Academic year identifier',
                    },
                    {
                      parameter: 'classId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Class cohort section identifier',
                    },
                    {
                      parameter: 'date',
                      type: 'String',
                      mandatory: 1,
                      description: 'Attendance session date in YYYY-MM-DD format',
                    },
                    {
                      parameter: 'records',
                      type: 'Array<Object>',
                      mandatory: 1,
                      description:
                        'Array of student marks: { studentId, status: "present"|"absent"|"late"|"excused", remarks }',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">Sample Request</span>
                  <CodeBlock
                    language="json"
                    code={{
                      branchId: '<BRANCH_ID>',
                      academicYearId: 'AY-2026',
                      classId: 'CLS-G10-A',
                      date: '2026-11-05',
                      records: [
                        {
                          studentId: 'STU-2026-0001',
                          status: 'present',
                          remarks: 'On time',
                        },
                        {
                          studentId: 'STU-2026-0002',
                          status: 'late',
                          remarks: 'Arrived 10 mins late',
                        },
                      ],
                    }}
                    title="attendance-post-request.json"
                    statusBadge="POST /attendance"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Submission outcome',
                    },
                    {
                      parameter: 'data',
                      type: 'Object',
                      mandatory: 1,
                      description:
                        'Saved session metadata including totals for present, late, and absent students',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      data: {
                        classId: 'CLS-G10-A',
                        date: '2026-11-05',
                        totalStudents: 2,
                        presentCount: 1,
                        lateCount: 1,
                        absentCount: 0,
                        createdAt: '2026-11-05T12:05:00.000Z',
                      },
                    }}
                    title="attendance-post-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>

              {/* 2.7 Record Payment Transaction */}
              <article id="api-payments-create" className="scroll-mt-28 space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#020617]">
                    2.7 Record Payment Transaction (POST /payments)
                  </h4>
                  <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [POST]
                  </span>
                </div>

                <ApiSpecTable
                  method="POST"
                  endpoint="{{baseUrl}}/payments"
                  name="Record Payment Transaction"
                  description="Records tuition fee payment transaction."
                  authRequirement="Institutional Authorization (Bearer Token)"
                />

                <ParamTable title="Headers" parameters={STANDARD_PROTECTED_HEADERS} />

                <ParamTable
                  title="Request Body Parameters"
                  parameters={[
                    {
                      parameter: 'branchId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Campus branch identifier',
                    },
                    {
                      parameter: 'academicYearId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Academic year identifier',
                    },
                    {
                      parameter: 'studentId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Enrolled student identifier',
                    },
                    {
                      parameter: 'tuitionFeeId',
                      type: 'String',
                      mandatory: 1,
                      description: 'Tuition fee schedule identifier',
                    },
                    {
                      parameter: 'amountDue',
                      type: 'Number',
                      mandatory: 1,
                      description: 'Total fee due before discounts',
                    },
                    {
                      parameter: 'discountAmount',
                      type: 'Number',
                      mandatory: 1,
                      description: 'Approved discount deduction',
                    },
                    {
                      parameter: 'amountPaid',
                      type: 'Number',
                      mandatory: 1,
                      description: 'Actual received payment amount',
                    },
                    {
                      parameter: 'currency',
                      type: 'String',
                      mandatory: 1,
                      description: 'Payment currency: USD | KHR',
                    },
                    {
                      parameter: 'paymentMethod',
                      type: 'String',
                      mandatory: 1,
                      description:
                        'Payment gateway or channel: cash | aba_pay | bank_transfer | credit_card | wing',
                    },
                    {
                      parameter: 'paymentType',
                      type: 'String',
                      mandatory: 0,
                      description:
                        'Classification: tuition_monthly | tuition_term | registration_fee',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#0056FF]">Sample Request</span>
                  <CodeBlock
                    language="json"
                    code={{
                      branchId: '<BRANCH_ID>',
                      academicYearId: 'AY-2026',
                      studentId: 'STU-2026-0001',
                      tuitionFeeId: 'FEE-2026-T1',
                      amountDue: 250,
                      discountAmount: 25,
                      amountPaid: 225,
                      currency: 'USD',
                      paymentMethod: 'aba_pay',
                      paymentType: 'tuition_monthly',
                    }}
                    title="payment-post-request.json"
                    statusBadge="POST /payments"
                    statusType="info"
                  />
                </div>

                <ParamTable
                  title="Response Parameters"
                  parameters={[
                    {
                      parameter: 'success',
                      type: 'Boolean',
                      mandatory: 1,
                      description: 'Ledger transaction outcome',
                    },
                    {
                      parameter: 'data',
                      type: 'Object',
                      mandatory: 1,
                      description:
                        'Created payment receipt with receiptNumber, balanceRemaining, and status',
                    },
                  ]}
                />

                <div className="space-y-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-700">
                    Sample Response (200 OK)
                  </span>
                  <CodeBlock
                    language="json"
                    code={{
                      success: true,
                      data: {
                        receiptNumber: 'REC-2026-00109',
                        studentId: 'STU-2026-0001',
                        amountDue: 250,
                        discountAmount: 25,
                        amountPaid: 225,
                        balanceRemaining: 0,
                        currency: 'USD',
                        paymentMethod: 'aba_pay',
                        status: 'paid',
                        createdAt: '2026-11-05T12:10:00.000Z',
                      },
                    }}
                    title="payment-post-200.json"
                    statusBadge="200 OK"
                    statusType="success"
                  />
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
