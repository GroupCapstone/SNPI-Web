'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CHANGE_LOGS } from '../../changelog-data';

export interface DocsFooterProps {
  theme?: 'light' | 'dark';
  className?: string;
}

// 4-point Star Mark (✦)
function StarMarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

// Globe Icon (Wireframe Sphere)
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

// Chevron Down Icon
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// Social Icons: X, LinkedIn, Butterfly (Bluesky), RSS
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function ButterflyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.765 1.5 4.542c0 2.443.682 9.07 1.077 10.428.847 2.915 3.914 3.738 6.643 2.164-3.953 1.002-5.466 4.316-3.1 6.36 4.124 3.565 5.568-3.084 5.88-5.347.312 2.263 1.756 8.912 5.88 5.347 2.366-2.044.853-5.358-3.1-6.36 2.729 1.574 5.796.751 6.643-2.164.395-1.358 1.077-7.985 1.077-10.428 0-2.777-1.066-3.532-3.702-1.737-2.752 1.942-5.711 5.881-6.798 7.995z" />
    </svg>
  );
}

function RssIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

export function DocsFooter({ className }: DocsFooterProps) {
  const [selectedLang, setSelectedLang] = React.useState<'en' | 'kh'>('en');
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);
  const currentVersion = CHANGE_LOGS[0]?.version || '0.2.15';

  // 1. PLATFORM LINKS (Exact match to reference Image 6)
  const platformLinks = [
    { label: 'Student Lifecycle', href: '/students' },
    { label: 'Academic Operations', href: '/classes' },
    { label: 'Examination & Grading', href: '/reports' },
    { label: 'Finance & Fee Ledger', href: '/finance/tuition' },
    { label: 'Modular Monolith API', href: '/document#available-services' },
    { label: 'Security & Access Control', href: '/document/design-system#security' },
    { label: 'Developer Documentation', href: '/document' },
  ];

  // 2. LEARN LINKS (Exact match to reference Image 6)
  const learnLinks = [
    { label: 'Brand & Colors', href: '/document/design-system#brand-concept' },
    { label: 'Architecture Standards', href: '/document#architecture-standards' },
    { label: 'Design System Manual', href: '/document/design-system' },
    { label: 'Monorepo Security Policy', href: '/document#security-policy' },
    { label: '10 UI Core Components', href: '/document/design-system#core-10' },
    { label: 'Verification Pipeline', href: '/document/changelog#verification' },
    { label: 'Changelog Portal', href: '/document/changelog' },
    { label: 'Quickstart Guide', href: '/document#quickstart' },
  ];

  // 3. COMPANY LINKS (Exact match to reference Image 6)
  const companyLinks = [
    { label: 'About SNPI-SMS', href: '/document#about' },
    { label: 'Engineering Team', href: 'https://github.com/Tan-Saphea/SNPI-SMS#team' },
    { label: 'Institutional Governance', href: '/document#governance' },
    { label: 'Campus Life & Events', href: '/document#campus-life' },
    { label: 'Contact Administration', href: '/document#contact' },
    { label: 'Trust & Compliance', href: '/document#compliance' },
    { label: 'Partner Network', href: '/document#partners' },
  ];

  // Bottom Legal & Navigation Links (Exact match to reference Image 6)
  const bottomBarLinks = [
    { label: 'Status', href: '/document/changelog' },
    { label: 'Privacy Policy', href: '/document#privacy' },
    { label: 'Terms of Use', href: '/document#terms' },
    { label: 'Modern Slavery Statement', href: '/document#modern-slavery' },
    { label: 'Cookie Preferences', href: '/document#cookies' },
  ];

  return (
    <footer className={cn('relative w-full pt-12 select-none sm:pt-16', className)}>
      {/* Main Curved Top Footer Capsule Container */}
      <div className="relative mx-auto w-full max-w-[1560px] overflow-hidden rounded-t-[36px] border-x border-t border-slate-200/90 bg-[#F8FAFC] px-6 pt-12 pb-8 shadow-xs sm:rounded-t-[44px] sm:px-10 md:rounded-t-[48px] lg:px-14">
        {/* Upper Navigation Section: 3 Columns + Right Meta */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand Sparkle Mark ✦ */}
          <div className="md:col-span-1 lg:col-span-1">
            <Link
              href="/document"
              title="SNPI-SMS Developer Portal"
              className="flex size-10 items-center justify-center rounded-xl border border-[#CAD3F5] bg-[#E3E7FC] transition-transform hover:scale-105"
            >
              <StarMarkIcon className="size-6 text-[#0056FF]" />
            </Link>
          </div>

          {/* Column 1: PLATFORM */}
          <div className="space-y-4 md:col-span-3 lg:col-span-3">
            <h4 className="font-sans text-xs font-black tracking-wider text-[#0056FF] uppercase">
              PLATFORM
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-medium text-slate-700 transition-colors hover:text-[#0056FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: LEARN */}
          <div className="space-y-4 md:col-span-3 lg:col-span-3">
            <h4 className="font-sans text-xs font-black tracking-wider text-[#0056FF] uppercase">
              LEARN
            </h4>
            <ul className="space-y-3">
              {learnLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-medium text-slate-700 transition-colors hover:text-[#0056FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="space-y-4 md:col-span-3 lg:col-span-3">
            <h4 className="font-sans text-xs font-black tracking-wider text-[#0056FF] uppercase">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-medium text-slate-700 transition-colors hover:text-[#0056FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section: Language Selector & Social Icons (Exact match to Image 6) */}
          <div className="flex flex-col items-start gap-5 md:col-span-2 md:items-end lg:col-span-2">
            {/* Language Selector Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-sans text-xs font-semibold text-slate-800 transition-colors hover:border-[#0056FF] hover:text-[#0056FF]"
              >
                <GlobeIcon className="size-3.5 text-slate-500" />
                <span>{selectedLang === 'en' ? 'English (US)' : 'Khmer (KH)'}</span>
                <ChevronDownIcon
                  className={cn(
                    'size-3.5 text-slate-500 transition-transform duration-150',
                    langDropdownOpen && 'rotate-180',
                  )}
                />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-[#CAD3F5] bg-white p-1 shadow-none">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLang('en');
                      setLangDropdownOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-sans text-xs font-medium transition-colors',
                      selectedLang === 'en'
                        ? 'bg-[#0056FF] text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <span>English (US)</span>
                    <span className="font-mono text-[10px] opacity-70">EN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLang('kh');
                      setLangDropdownOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-sans text-xs font-medium transition-colors',
                      selectedLang === 'kh'
                        ? 'bg-[#0056FF] text-white'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                    )}
                  >
                    <span>Khmer (KH)</span>
                    <span className="font-mono text-[10px] opacity-70">KH</span>
                  </button>
                </div>
              )}
            </div>

            {/* Social Icons (X, LinkedIn, Butterfly/Bluesky, RSS - Exactly matching Image 6) */}
            <div className="flex items-center gap-3.5 text-slate-500">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X (formerly Twitter)"
                title="SNPI on X"
                className="text-slate-600 transition-colors hover:text-[#0056FF]"
              >
                <XIcon className="size-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                title="SNPI on LinkedIn"
                className="text-slate-600 transition-colors hover:text-[#0056FF]"
              >
                <LinkedInIcon className="size-4" />
              </a>

              <a
                href="https://bsky.app"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Bluesky"
                title="SNPI on Bluesky"
                className="text-slate-600 transition-colors hover:text-[#0056FF]"
              >
                <ButterflyIcon className="size-4" />
              </a>

              <Link
                href="/document#public-feeds"
                aria-label="RSS 2.0 Syndication Feed"
                title="Public Feeds & RSS 2.0"
                className="text-slate-600 transition-colors hover:text-[#0056FF]"
              >
                <RssIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Thin Horizontal Divider Line */}
        <div className="my-8 w-full border-t border-slate-200" />

        {/* Bottom Bar: Copyright Left | Real Working Legal Links Right (Image 6) */}
        <div className="flex flex-col gap-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-sans font-medium">
            <span>&copy; 2026 SNPI-SMS, Inc.</span>
            <span className="text-slate-400">&middot;</span>
            <span className="inline-flex items-center rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              v{currentVersion}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-xs">
            {bottomBarLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-600 transition-colors hover:text-[#0056FF]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
