'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Check,
  Copy,
  Server,
  Calendar,
  CircleAlert,
  CircleCheck,
  Code,
  Layers,
  Radio,
  ChevronRight,
  ArrowRight,
  Terminal,
  FileText,
  Info,
  ShieldCheck,
  Globe,
  Zap,
  Sparkles,
} from '@/components/icons';
import { CHANGE_LOGS } from '@/features/document/changelog-data';
import { cn } from '@/lib/utils';
import { PrettyCodeBlock } from './pretty-code-block';
import { RadiantIntegrationHub } from './radiant-integration-hub';

// ============================================================================
// DATA STRUCTURES: BACKEND API & SYNDICATION SPECIFICATIONS
// ============================================================================

interface PublicFeedSpec {
  id: string;
  title: string;
  category: 'Announcements & News' | 'Emergency Alerts' | 'Academic Calendar';
  format: 'RSS 2.0 (XML)' | 'JSON Feed' | 'REST API';
  endpoint: string;
  refreshInterval: string;
  description: string;
  sampleXml?: string;
  sampleJson: Record<string, unknown>;
}

const PUBLIC_FEEDS_SPECS: PublicFeedSpec[] = [
  {
    id: 'feed-news-rss',
    title: 'News & Academic Notices RSS 2.0',
    category: 'Announcements & News',
    format: 'RSS 2.0 (XML)',
    endpoint: '/api/v1/public/rss/announcements.xml',
    refreshInterval: '5m cache',
    description:
      'Verified institutional announcements, academic period dates, and holiday advisories.',
    sampleXml: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SNPI Institute Official News &amp; Announcements</title>
    <link>https://snpi.edu.kh</link>
    <description>Live updates and academic announcements from SNPI Institute</description>
    <language>en-US</language>
    <item>
      <title>Semester 1 2026-2027 Registration Opens</title>
      <link>https://snpi.edu.kh/announcements/ann-2026-001</link>
      <pubDate>Fri, 30 Oct 2026 08:00:00 GMT</pubDate>
      <guid>ANN-2026-001</guid>
      <description>Online intake registration is now open for all branches.</description>
    </item>
  </channel>
</rss>`,
    sampleJson: {
      status: 'success',
      feed: 'announcements',
      updatedAt: '2026-10-31T08:00:00Z',
      items: [
        {
          id: 'ANN-2026-001',
          title: 'Semester 1 2026-2027 Registration Opens',
          category: 'Academics',
          publishedAt: '2026-10-30T08:00:00Z',
          summary: 'Online intake registration is now open for all branches.',
        },
      ],
    },
  },
  {
    id: 'feed-alerts-json',
    title: 'Emergency & Operational Alerts',
    category: 'Emergency Alerts',
    format: 'JSON Feed',
    endpoint: '/api/v1/public/feed/alerts.json',
    refreshInterval: 'Real-time (60s)',
    description:
      'Campus weather warnings, entrance maintenance notices, and exam reschedule alerts.',
    sampleJson: {
      status: 'active',
      count: 1,
      alerts: [
        {
          id: 'ALT-2026-904',
          severity: 'advisory',
          headline: 'Gate 2 Entrance Maintenance Notice',
          branchId: 'BR-01',
          effectiveUntil: '2026-11-02T18:00:00Z',
          actionUrl: 'https://snp.edu.kh/alerts/904',
        },
      ],
    },
  },
  {
    id: 'feed-calendar-json',
    title: 'Academic Calendar Milestones',
    category: 'Academic Calendar',
    format: 'JSON Feed',
    endpoint: '/api/v1/public/feed/academic-calendar.json',
    refreshInterval: '1h cache',
    description: 'Semester milestones, examination windows, and national holiday closures.',
    sampleJson: {
      academicYear: '2026-2027',
      term: 'Semester 1',
      milestones: [
        {
          code: 'MLS-2026-T1-START',
          title: 'Orientation & Classes Commence',
          date: '2026-11-16',
          category: 'instructional',
        },
        {
          code: 'MLS-2026-T1-EXAM',
          title: 'Midterm Examination Window',
          date: '2027-01-11',
          category: 'examination',
        },
      ],
    },
  },
];

const SAMPLE_ERROR_RESPONSE = {
  statusCode: 404,
  error: 'Not Found',
  message: 'Feed publication window closed or entity expired.',
  timestamp: '2026-10-31T16:20:00.000Z',
  documentationUrl: 'https://snp.edu.kh/document/openapi#public-feeds',
};

const GUIDE_NAV_ITEMS = [
  { id: 'open-api-head', label: 'Overview', tag: '01' },
  { id: 'available-services', label: 'Core Services', tag: '02' },
  { id: 'public-feeds', label: 'Public Feeds (RSS 2.0)', tag: '03' },
  { id: 'changelogs', label: 'Releases', tag: '04' },
];

// ============================================================================
// MAIN COMPONENT: OPEN API & SYNDICATION GUIDE (MOBILE-FIRST HOOK HERO)
// ============================================================================

export function OpenApiView({ initialSection }: { initialSection?: string } = {}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isManualScrollRef = React.useRef<boolean>(false);
  const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [activeSection, setActiveSection] = React.useState<string>(
    initialSection || 'open-api-head',
  );
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Feed specimen status tab (success, notfound, or xml)
  const [feedResponseTab, setFeedResponseTab] = React.useState<
    Record<string, 'success' | 'notfound' | 'xml'>
  >({
    'feed-news-rss': 'success',
    'feed-alerts-json': 'success',
    'feed-calendar-json': 'success',
  });

  // Copy helper with robust fallback
  const handleCopy = async (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        return;
      }
    } catch {
      // Fall through to textarea fallback
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

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

  // Scroll listener for sticky active anchor
  React.useEffect(() => {
    const handleScroll = () => {
      if (!rootRef.current || rootRef.current.offsetParent === null || isManualScrollRef.current) {
        return;
      }
      const scrollPosition = window.scrollY + 140;
      for (let i = GUIDE_NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = GUIDE_NAV_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
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
    <div ref={rootRef} className="min-h-screen w-full bg-[#FFFFFF] text-[#0A1A4A]">
      <div className="mx-auto flex max-w-7xl items-start gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =================================================================== */}
        {/* SLEEK LEFT NAVIGATION (BAKONG REFERENCE AESTHETIC) */}
        {/* =================================================================== */}
        <aside className="sticky top-28 hidden w-64 shrink-0 space-y-4 self-start md:block">
          <div className="rounded-2xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 shadow-xs">
            <div className="mb-2.5 border-b border-[#CAD3F5]/80 px-2.5 pb-2">
              <span className="text-[11px] font-black tracking-widest text-[#0056FF] uppercase">
                On This Page
              </span>
            </div>

            <nav className="space-y-1">
              {GUIDE_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all',
                      isActive
                        ? 'border border-[#0056FF]/25 bg-[#EFF5FF] font-bold text-[#0056FF] shadow-2xs'
                        : 'font-medium text-[#0A1A4A]/70 hover:bg-[#EFF5FF]/70 hover:text-[#0056FF]',
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors',
                        isActive
                          ? 'bg-[#0056FF] text-white'
                          : 'bg-[#E3E7FC]/60 text-[#0056FF] group-hover:bg-[#E3E7FC]',
                      )}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Info Box */}
          <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0056FF]">
              <Info className="h-3.5 w-3.5" />
              <span>Public Access</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#0A1A4A]/80">
              Zero tokens or auth headers needed. Projections are open and cached at edge CDN nodes.
            </p>
          </div>
        </aside>

        {/* =================================================================== */}
        {/* MAIN GUIDE CONTENT — MOBILE-FIRST WELCOME & HOOK */}
        {/* =================================================================== */}
        <main className="max-w-5xl min-w-0 flex-1 space-y-8 pb-24 sm:space-y-10">
          {/* ----------------------------------------------------------------- */}
          {/* SECTION 1: CREATIVE INTERACTIVE API GATEWAY HERO SCREEN           */}
          {/* ----------------------------------------------------------------- */}
          <section id="open-api-head" className="scroll-mt-24 space-y-4">
            <div className="relative overflow-visible bg-transparent py-2 sm:py-4">
              <div className="relative z-10 space-y-6 sm:space-y-8">
                {/* Playful Headline + Public Status Pill */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h1 className="font-sans text-3xl font-black tracking-tight text-[#0A1A4A] sm:text-4xl md:text-5xl">
                      OPEN API <span className="text-[#0056FF]">GATEWAY</span>
                    </h1>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#CAD3F5] bg-[#E3E7FC] px-3 py-1 font-mono text-xs font-bold text-[#0056FF] shadow-2xs">
                      <Globe className="size-3.5 text-[#0056FF]" />
                      <span>Live Public Syndication</span>
                    </div>
                  </div>
                </div>

                {/* KINETIC TUMBLED CARDS SERVICE DECK */}
                <RadiantIntegrationHub
                  center={{
                    title: 'SNPI EDGE GATEWAY',
                    subtitle: 'GET /api/v1/public/*',
                    icon: <Server className="size-7 stroke-[2.2]" />,
                    badge: 'Live',
                  }}
                  leftNodes={[
                    {
                      id: 'feed-news-rss',
                      label: 'Campus Notices',
                      tag: '01 · FEED',
                      badge: 'RSS 2.0 XML',
                      tooltip: 'Live Announcements & Campus News RSS Feed',
                      icon: <Radio className="size-8 stroke-[2]" />,
                    },
                    {
                      id: 'feed-alerts-json',
                      label: 'Emergency Alerts',
                      tag: '02 · ALERTS',
                      badge: 'JSON STREAM',
                      tooltip: 'Real-Time Emergency Alerts JSON Stream',
                      icon: <Zap className="size-8 stroke-[2]" />,
                    },
                    {
                      id: 'feed-calendar-json',
                      label: 'Milestones',
                      tag: '03 · CAL',
                      badge: 'ACADEMIC DATES',
                      tooltip: 'Academic Calendar & Semester Milestones Feed',
                      icon: <Calendar className="size-8 stroke-[2]" />,
                    },
                  ]}
                  rightNodes={[
                    {
                      id: 'service-catalog',
                      label: 'Course Catalog',
                      tag: '04 · STUDY',
                      badge: 'PUBLIC REST API',
                      tooltip: 'Public Course Catalog & Syllabus REST API',
                      icon: <Globe className="size-8 stroke-[2]" />,
                    },
                    {
                      id: 'service-branches',
                      label: 'Campus Directory',
                      tag: '05 · BRANCH',
                      badge: 'LOCATIONS SPEC',
                      tooltip: 'Branch & Campus Locations Directory REST API',
                      icon: <Layers className="size-8 stroke-[2]" />,
                    },
                    {
                      id: 'service-health',
                      label: 'RFC 9116 Health',
                      tag: '06 · SEC',
                      badge: 'RFC 9116 PROBE',
                      tooltip: 'RFC 9116 System Security & Health Probe',
                      icon: <ShieldCheck className="size-8 stroke-[2]" />,
                    },
                  ]}
                />

                {/* Base URL Quickstart Bar & Action Hook */}
                <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:items-center sm:gap-3">
                  {/* 1-Click Base URL Copy */}
                  <div className="flex items-center justify-between rounded-xl border border-[#CAD3F5] bg-white p-1 shadow-2xs sm:justify-start sm:rounded-2xl sm:p-1.5">
                    <div className="flex items-center gap-2 px-2.5 text-slate-500 sm:px-3">
                      <Terminal className="size-3.5 text-[#0056FF] sm:size-4" />
                      <span className="font-mono text-[11px] font-bold text-slate-900 sm:text-xs">
                        GET https://api.snpi.edu.kh/api/v1/public
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy('https://api.snpi.edu.kh/api/v1/public', 'hero-base-url')
                      }
                      className={cn(
                        'flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1 font-sans text-xs font-bold transition-all active:scale-95 sm:rounded-xl sm:px-3 sm:py-1.5',
                        copiedId === 'hero-base-url'
                          ? 'border border-emerald-500/40 bg-emerald-50 text-emerald-700'
                          : 'bg-[#EFF5FF] text-[#0056FF] hover:bg-[#0056FF] hover:text-white',
                      )}
                    >
                      {copiedId === 'hero-base-url' ? (
                        <>
                          <Check className="size-3 stroke-[2.5] text-emerald-600 sm:size-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 stroke-[2] sm:size-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Explore Services Action Button */}
                  <button
                    type="button"
                    onClick={() => scrollToSection('available-services')}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0056FF] px-4 py-2 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-[#2277FF] active:scale-95 sm:rounded-2xl sm:px-6 sm:py-3"
                  >
                    <span>Explore Core Services</span>
                    <ArrowRight className="size-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 2: CORE SERVICES OVERVIEW (SCREEN TWO ON MOBILE)          */}
          {/* ----------------------------------------------------------------- */}
          <section id="available-services" className="scroll-mt-24 space-y-3 pt-4 sm:pt-6">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black tracking-wider text-[#0056FF] uppercase">
                Available Services & Endpoints
              </span>
              <span className="text-[11px] font-medium text-[#0A1A4A]/60">2 Core Services</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3.5">
              {/* Card 01: Campus Announcements & Feeds */}
              <button
                onClick={() => scrollToSection('public-feeds')}
                className="group flex w-full flex-col justify-between rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 text-left shadow-xs transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] active:scale-[0.99] sm:p-4"
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3E7FC] text-[#0056FF] transition-colors group-hover:bg-[#0056FF] group-hover:text-white">
                      <Radio className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                          01 · Feeds
                        </span>
                        <span className="rounded border border-[#CAD3F5]/60 bg-[#EFF5FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#0056FF]">
                          RSS 2.0 & JSON
                        </span>
                      </div>
                      <h3 className="truncate text-sm font-bold text-[#0A1A4A] group-hover:text-[#0056FF]">
                        Campus News & RSS Feeds
                      </h3>
                    </div>
                  </div>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white text-[#0056FF] transition-all group-hover:border-[#0056FF] group-hover:bg-[#0056FF] group-hover:text-white">
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                <p className="mt-1 truncate text-xs text-[#0A1A4A]/70">
                  Live announcements and emergency alerts.
                </p>

                <div className="mt-2.5 flex items-center justify-between border-t border-[#CAD3F5]/60 pt-2">
                  <span className="font-mono text-[11px] text-[#0056FF]">
                    GET /public/rss/announcements.xml
                  </span>
                  <span className="text-[10px] font-semibold text-[#0A1A4A]/60">5m Cache</span>
                </div>
              </button>

              {/* Card 02: Class Roster & Catalog */}
              <button
                onClick={() => handleCopy('https://api.snp.edu.kh/api/v1/classes', 'card-classes')}
                className="group flex w-full flex-col justify-between rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 text-left shadow-xs transition-all hover:border-[#0056FF] hover:bg-[#EFF5FF] active:scale-[0.99] sm:p-4"
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E3E7FC] text-[#0056FF] transition-colors group-hover:bg-[#0056FF] group-hover:text-white">
                      <Layers className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                          02 · Catalog
                        </span>
                        <span className="rounded border border-[#CAD3F5]/60 bg-[#EFF5FF] px-1.5 py-0.5 text-[9px] font-semibold text-[#0056FF]">
                          REST API
                        </span>
                      </div>
                      <h3 className="truncate text-sm font-bold text-[#0A1A4A] group-hover:text-[#0056FF]">
                        Class Roster & Catalog
                      </h3>
                    </div>
                  </div>
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[#CAD3F5] bg-white text-[#0056FF] transition-all group-hover:border-[#0056FF] group-hover:bg-[#0056FF] group-hover:text-white">
                    {copiedId === 'card-classes' ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5 transition-transform group-hover:scale-110" />
                    )}
                  </div>
                </div>

                <p className="mt-1 truncate text-xs text-[#0A1A4A]/70">
                  Active course schedules and live seat quotas.
                </p>

                <div className="mt-2.5 flex items-center justify-between border-t border-[#CAD3F5]/60 pt-2">
                  <span className="font-mono text-[11px] text-[#0056FF]">GET /api/v1/classes</span>
                  <span className="text-[10px] font-semibold text-[#0A1A4A]/60">Live Seats</span>
                </div>
              </button>
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 2: PUBLIC FEEDS & RSS 2.0 */}
          {/* ----------------------------------------------------------------- */}
          <section id="public-feeds" className="space-y-4 border-t border-[#CAD3F5] pt-8">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold tracking-wider text-[#0056FF] uppercase">
                Feeds & Syndication
              </span>
              <h2 className="text-xl font-bold tracking-tight text-[#0A1A4A] sm:text-2xl">
                Public Feeds & RSS 2.0
              </h2>
              <p className="text-xs font-medium text-[#0A1A4A]/75">
                Subscribe to read-only XML and JSON feeds to ingest campus announcements, security
                alerts, and milestones.
              </p>
            </div>

            <div className="space-y-3.5">
              {PUBLIC_FEEDS_SPECS.map((feed) => {
                const currentStatus = feedResponseTab[feed.id] || 'success';
                const hasXml = Boolean(feed.sampleXml);

                return (
                  <div
                    key={feed.id}
                    className="overflow-hidden rounded-2xl border border-[#CAD3F5] bg-[#FFFFFF] shadow-xs"
                  >
                    {/* Feed Header */}
                    <div className="flex flex-col gap-2.5 border-b border-[#CAD3F5] bg-[#EFF5FF] p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-[#E3E7FC] px-2 py-0.5 text-xs font-bold text-[#0056FF]">
                            {feed.format}
                          </span>
                          <span className="text-xs font-bold text-[#0A1A4A]">{feed.title}</span>
                        </div>
                        <p className="text-xs text-[#0A1A4A]/75">{feed.description}</p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-lg border border-[#CAD3F5] bg-[#FFFFFF] px-2.5 py-1 font-mono text-xs text-[#0A1A4A]">
                          <span className="font-bold text-[#0056FF]">GET</span>
                          <span className="max-w-[180px] truncate sm:max-w-[200px]">
                            {feed.endpoint}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(feed.endpoint, feed.id)}
                          className="rounded-lg border border-[#CAD3F5] bg-[#FFFFFF] p-1.5 text-[#0056FF] transition-colors hover:bg-[#E3E7FC]"
                          title="Copy Endpoint URL"
                        >
                          {copiedId === feed.id ? (
                            <Check className="h-3.5 w-3.5 text-[#0056FF]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-[#0056FF]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Specimen Tabs & Pretty Code Container (Bakong Reference Aesthetic) */}
                    <div className="space-y-3 p-3.5 sm:p-4">
                      <div className="flex flex-col gap-2 border-b border-[#CAD3F5] pb-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black tracking-widest text-[#0056FF] uppercase">
                            Sample Response
                          </span>
                          <span className="rounded-full bg-[#E3E7FC] px-2 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]">
                            RFC-7807 Compliant
                          </span>
                        </div>

                        {/* Status Response Tabs (Success, XML, NotFound) */}
                        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-1">
                          <button
                            onClick={() =>
                              setFeedResponseTab((prev) => ({ ...prev, [feed.id]: 'success' }))
                            }
                            className={cn(
                              'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                              currentStatus === 'success'
                                ? 'bg-[#0056FF] text-white shadow-xs'
                                : 'text-[#0A1A4A] hover:bg-[#E3E7FC] hover:text-[#0056FF]',
                            )}
                          >
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            <span>Success (200 OK)</span>
                          </button>

                          {hasXml && (
                            <button
                              onClick={() =>
                                setFeedResponseTab((prev) => ({ ...prev, [feed.id]: 'xml' }))
                              }
                              className={cn(
                                'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                                currentStatus === 'xml'
                                  ? 'bg-[#0056FF] text-white shadow-xs'
                                  : 'text-[#0A1A4A] hover:bg-[#E3E7FC] hover:text-[#0056FF]',
                              )}
                            >
                              <span className="size-1.5 rounded-full bg-sky-400" />
                              <span>RSS 2.0 XML</span>
                            </button>
                          )}

                          <button
                            onClick={() =>
                              setFeedResponseTab((prev) => ({ ...prev, [feed.id]: 'notfound' }))
                            }
                            className={cn(
                              'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all',
                              currentStatus === 'notfound'
                                ? 'bg-[#0056FF] text-white shadow-xs'
                                : 'text-[#0A1A4A] hover:bg-[#E3E7FC] hover:text-[#0056FF]',
                            )}
                          >
                            <span className="size-1.5 rounded-full bg-rose-400" />
                            <span>NotFound (404)</span>
                          </button>
                        </div>
                      </div>

                      {/* Pretty-Printed Code Window */}
                      {currentStatus === 'success' && (
                        <PrettyCodeBlock
                          code={JSON.stringify(feed.sampleJson, null, 2)}
                          language="json"
                          title={`${feed.id}.json`}
                          statusBadge="200 OK"
                          statusType="success"
                          maxHeight="max-h-72"
                        />
                      )}

                      {currentStatus === 'xml' && feed.sampleXml && (
                        <PrettyCodeBlock
                          code={feed.sampleXml}
                          language="xml"
                          title={`${feed.id}.xml`}
                          statusBadge="200 OK · XML"
                          statusType="info"
                          maxHeight="max-h-72"
                        />
                      )}

                      {currentStatus === 'notfound' && (
                        <PrettyCodeBlock
                          code={JSON.stringify(SAMPLE_ERROR_RESPONSE, null, 2)}
                          language="json"
                          title="error-404.json"
                          statusBadge="404 NOT FOUND"
                          statusType="error"
                          maxHeight="max-h-56"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 4: RELEASES */}
          {/* ----------------------------------------------------------------- */}
          <section id="changelogs" className="space-y-3 border-t border-[#CAD3F5] pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#0056FF]" />
                <h3 className="text-base font-bold text-[#0A1A4A]">Syndication Releases</h3>
              </div>
              <span className="rounded border border-[#CAD3F5] bg-[#E3E7FC] px-2.5 py-0.5 text-xs font-semibold text-[#0056FF]">
                v0.2.12 Active
              </span>
            </div>
            <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 text-xs text-[#0A1A4A]">
              <div className="flex items-center justify-between font-bold text-[#0056FF]">
                <span>{CHANGE_LOGS[0]?.version || 'v0.2.13'}</span>
                <span className="rounded border border-[#CAD3F5] bg-[#E3E7FC] px-1.5 py-0.5 text-[10px] font-semibold text-[#0056FF]">
                  Developer: {CHANGE_LOGS[0]?.developer || 'Tan-Saphea'}
                </span>
                <span>{CHANGE_LOGS[0]?.date || '01.11.2026'}</span>
              </div>
              <p className="leading-relaxed text-[#0A1A4A]/80">
                {CHANGE_LOGS[0]?.description ||
                  'Open API & Syndication Guide redesigned with mobile-first welcome hook and tactile service cards.'}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
