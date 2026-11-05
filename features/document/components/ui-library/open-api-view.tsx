'use client';

import * as React from 'react';
import {
  Check,
  Copy,
  Server,
  ShieldCheck,
  Lock,
  Terminal,
  FileText,
  Key,
} from '@/components/icons';
import { cn } from '@/lib/utils';
import { ApiSpecTable } from './api-spec-table';
import { ParamTable, type ApiParameter } from './param-table';
import { CodeBlock } from './code-block';
import { AsteriskLogo } from './asterisk-logo';

// ============================================================================
// DATA STRUCTURES & DEFINITIONS (SANITIZED PUBLIC DISPLAY STANDARD)
// ============================================================================

interface NavItem {
  id: string;
  label: string;
  isHeader?: boolean;
  indent?: boolean;
  badge?: string;
}

const ON_THIS_PAGE_NAV: NavItem[] = [
  { id: 'changelogs', label: 'Change Logs' },
  { id: 'toc', label: 'Table of contents' },
  { id: 'introduction', label: 'Introduction', isHeader: true },
  { id: 'purpose', label: '1. Purpose', indent: true },
  { id: 'scope', label: '2. Scope', indent: true },
  { id: 'overall-api', label: '3. Overall API', indent: true },
  { id: 'security', label: '4. Security & Access Control', indent: true },
  { id: 'status-codes', label: '5. HTTP Status Codes', indent: true },
  { id: 'api-documentation', label: 'API Documentation', isHeader: true },
  { id: 'public-apis', label: 'Public Services', isHeader: true, indent: true },
  { id: 'api-health', label: '1.1 System Health Probe', indent: true, badge: 'GET' },
  { id: 'api-cert-verify', label: '1.2 Certificate Verification', indent: true, badge: 'GET' },
  { id: 'protected-apis', label: 'Protected Services', isHeader: true, indent: true },
  { id: 'api-auth-login', label: '2.1 User Authentication', indent: true, badge: 'POST' },
  { id: 'api-auth-refresh', label: '2.2 Renew Session Token', indent: true, badge: 'POST' },
  { id: 'api-auth-me', label: '2.3 User Profile & Permissions', indent: true, badge: 'GET' },
  { id: 'api-students-list', label: '2.4 Student Directory', indent: true, badge: 'GET' },
  { id: 'api-students-create', label: '2.5 Student Registration', indent: true, badge: 'POST' },
  { id: 'api-attendance-create', label: '2.6 Session Attendance', indent: true, badge: 'POST' },
  { id: 'api-payments-create', label: '2.7 Payment Records', indent: true, badge: 'POST' },
];

const CHANGE_LOGS_DATA = [
  {
    version: '1.1.0',
    date: '05.11.2026',
    description:
      'Official REST API release for headless integration with hardened token-based authentication.',
  },
  {
    version: '1.0.4',
    date: '24.10.2026',
    description:
      'Add student enrollment lifecycle, daily class roster attendance, and multi-currency payment endpoints.',
  },
  {
    version: '1.0.2',
    date: '10.10.2026',
    description:
      'Add public certificate ledger SHA-256 hash tamper-proof verification endpoint.',
  },
  {
    version: '1.0.0',
    date: '01.09.2026',
    description:
      'Initial official SNPI Open REST API specification release with role-based access control.',
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

// Single Authorized Production Endpoint
const PRODUCTION_GATEWAY_URL = 'https://snpis.kesararamwithdigital.tech/api/v1';

// ============================================================================
// MAIN COMPONENT: OPEN API DOCUMENTATION PORTAL
// ============================================================================

export function OpenApiView({ initialSection }: { initialSection?: string } = {}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isManualScrollRef = React.useRef<boolean>(false);
  const scrollTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const [activeSection, setActiveSection] = React.useState<string>(initialSection || 'changelogs');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Clipboard copy helper
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
      // Fallback
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
    } catch {
      // Ignore
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
      const scrollPosition = window.scrollY + 160;
      for (let i = ON_THIS_PAGE_NAV.length - 1; i >= 0; i--) {
        const item = ON_THIS_PAGE_NAV[i];
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
      <div className="mx-auto flex max-w-[1520px] items-start gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =================================================================== */}
        {/* LEFT-HAND STICKY TABLE OF CONTENTS ("ON THIS PAGE")                */}
        {/* =================================================================== */}
        <aside className="sticky top-24 hidden w-72 shrink-0 space-y-4 self-start lg:block">
          <div className="rounded-2xl border border-[#CAD3F5] bg-[#FFFFFF] p-3.5 shadow-2xs">
            <div className="mb-2 border-b border-[#CAD3F5]/80 px-2.5 pb-2">
              <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                ON THIS PAGE
              </span>
            </div>

            <nav className="max-h-[calc(100vh-180px)] space-y-0.5 overflow-y-auto pr-1">
              {ON_THIS_PAGE_NAV.map((item) => {
                const isActive = activeSection === item.id;

                if (item.isHeader && !item.indent) {
                  return (
                    <div
                      key={item.id}
                      className="mt-5 mb-2 flex items-center gap-2 px-2.5 font-sans text-xs font-black tracking-wider text-[#0A1A4A] uppercase"
                    >
                      <AsteriskLogo size="md" variant="success" className="text-xl shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                }

                if (item.isHeader && item.indent) {
                  return (
                    <div
                      key={item.id}
                      className="mt-3 mb-1.5 flex items-center gap-2 px-4 font-mono text-[10px] font-black tracking-wider text-[#0056FF] uppercase"
                    >
                      <AsteriskLogo size="sm" variant="success" className="text-sm shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'group flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-all',
                      item.indent ? 'pl-4.5' : 'pl-2.5',
                      isActive
                        ? 'border border-[#0056FF]/25 bg-[#EFF5FF] font-bold text-[#0056FF]'
                        : 'font-medium text-slate-700 hover:bg-[#EFF5FF]/70 hover:text-[#0056FF]',
                    )}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          'shrink-0 rounded px-1.5 py-0.2 font-mono text-[9px] font-bold',
                          item.badge === 'GET'
                            ? 'bg-[#E3E7FC] text-[#0056FF]'
                            : 'bg-emerald-100 text-emerald-800',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Clean Security Badge Box (Zero internal header leaks) */}
          <div className="space-y-1.5 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0056FF]">
              <ShieldCheck className="size-3.5 text-[#0056FF]" />
              <span>Enterprise Access Control</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700">
              Protected endpoints require authorized institutional credentials. Public services are
              accessible without authentication.
            </p>
          </div>
        </aside>

        {/* =================================================================== */}
        {/* MAIN DOCUMENTATION CONTENT                                         */}
        {/* =================================================================== */}
        <main className="min-w-0 flex-1 space-y-12 pb-32">
          {/* ----------------------------------------------------------------- */}
          {/* HEADER SECTION                                                    */}
          {/* ----------------------------------------------------------------- */}
          <header className="flex flex-col items-center justify-center text-center space-y-6 border-b border-[#CAD3F5] pb-12 pt-6">
            {/* Centered Massive Sora Asterisk Brand Logo (100% Transparent Background · Success Color #10B981) */}
            <div className="relative flex flex-col items-center justify-center">
              <AsteriskLogo
                size="hero"
                variant="success"
                className="select-none transition-transform hover:scale-110 duration-300 cursor-default"
                ariaLabel="SNPI Brand Asterisk Emblem"
              />
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3 max-w-2xl flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <AsteriskLogo size="xs" variant="success" className="text-xs" />
                <span>REST API Specification · Open API 3.0</span>
                <AsteriskLogo size="xs" variant="success" className="text-xs" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-[#0A1A4A] sm:text-4xl md:text-5xl">
                SNPI Open API Documentation
              </h1>
              <p className="text-sm font-medium text-slate-600 sm:text-base leading-relaxed">
                Official REST API Integration Specification for the SNPI School Management System
              </p>
            </div>

            {/* Centered Base URL Card (Production Gateway Only — No Local Dev Exposed) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-[#CAD3F5] bg-[#EFF5FF] px-5 py-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Terminal className="size-4 text-[#0056FF] shrink-0" />
                <span className="font-mono text-xs font-bold text-[#0056FF] uppercase">
                  Production Gateway:
                </span>
                <code className="font-mono text-xs font-bold text-[#0A1A4A] sm:text-sm">
                  {PRODUCTION_GATEWAY_URL}
                </code>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => handleCopy(PRODUCTION_GATEWAY_URL, 'main-base-url')}
                  className={cn(
                    'flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#CAD3F5] px-3.5 py-1.5 font-mono text-xs font-bold transition-all shadow-2xs',
                    copiedId === 'main-base-url'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'bg-white text-[#0056FF] hover:bg-[#E3E7FC]',
                  )}
                >
                  {copiedId === 'main-base-url' ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" />
                      <span>Copied Base URL</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Base URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 1: CHANGE LOGS                                            */}
          {/* ----------------------------------------------------------------- */}
          <section id="changelogs" className="scroll-mt-28 space-y-3">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#0A1A4A]">
              <AsteriskLogo size="sm" variant="success" className="text-base" />
              <span>Change Logs</span>
            </h2>

            <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#0A1A4A]">
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
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#0A1A4A]">
              <AsteriskLogo size="sm" variant="success" className="text-base" />
              <span>Table of contents</span>
            </h2>

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
            <h2 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-[#0A1A4A]">
              <AsteriskLogo size="md" variant="success" className="text-2xl" />
              <span>Introduction</span>
            </h2>

            {/* 1. Purpose */}
            <div id="purpose" className="scroll-mt-28 space-y-2">
              <h3 className="text-base font-bold text-[#0A1A4A]">1. Purpose</h3>
              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                This document describes the detailed specification of the SNPI Open API offered by
                the SNPI School Management System. The expected readers are internal frontend
                engineers, system integrators, and institutional partners. This can be used as
                reference for any interest related to the API mentioned in this document.
              </p>
            </div>

            {/* 2. Scope */}
            <div id="scope" className="scroll-mt-28 space-y-2">
              <h3 className="text-base font-bold text-[#0A1A4A]">2. Scope</h3>
              <p className="text-xs leading-relaxed text-slate-700 sm:text-sm">
                This document contains the complete description of the API specification including:
                gateway base URL, authentication model, HTTP status codes, query and body parameter
                matrices, and request/response samples for all public and protected services.
              </p>
            </div>

            {/* 3. Overall API */}
            <div id="overall-api" className="scroll-mt-28 space-y-3">
              <h3 className="text-base font-bold text-[#0A1A4A]">3. Overall API</h3>
              <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#0A1A4A]">
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
                          <td className="px-4 py-2.5 font-bold text-[#0A1A4A]">{row.name}</td>
                          <td className="px-4 py-2.5">
                            <span
                              className={cn(
                                'rounded px-1.5 py-0.5 font-mono text-[10px] font-bold',
                                row.method === 'GET'
                                  ? 'bg-[#0056FF] text-white'
                                  : 'bg-emerald-600 text-white',
                              )}
                            >
                              [{row.method}]
                            </span>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="font-mono text-[11px] text-[#0056FF]">{row.url}</code>
                          </td>
                          <td className="px-4 py-2.5 text-slate-700">
                            <span className="rounded bg-[#E3E7FC] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
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
              <h3 className="text-base font-bold text-[#0A1A4A]">
                4. Security & Institutional Access Control
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Public Tier */}
                <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0056FF]">
                    <Server className="size-4" />
                    <span>Public Inquiry Tier (Open)</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Public verification and monitoring endpoints can be accessed by any consumer
                    without authentication headers or token requirements:
                  </p>
                  <code className="block rounded bg-[#EFF5FF] p-2 font-mono text-[11px] text-[#0A1A4A]">
                    GET /health, GET /certificates/verify/:hash
                  </code>
                </div>

                {/* Protected Tier */}
                <div className="space-y-2 rounded-xl border border-[#CAD3F5] bg-[#FFFFFF] p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <Lock className="size-4" />
                    <span>Institutional Partner Tier (Restricted)</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Administrative data, student records, and operational mutations require
                    authenticated Bearer token credentials issued upon verified login:
                  </p>
                  <code className="block rounded bg-[#EFF5FF] p-2 font-mono text-[11px] text-[#0A1A4A]">
                    Authorization: Bearer &lt;AUTHENTICATION_TOKEN&gt;
                  </code>
                </div>
              </div>
            </div>

            {/* 5. HTTP Status Codes */}
            <div id="status-codes" className="scroll-mt-28 space-y-3">
              <h3 className="text-base font-bold text-[#0A1A4A]">5. HTTP Status Codes</h3>

              <div className="overflow-hidden rounded-xl border border-[#CAD3F5] bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#CAD3F5] bg-[#EFF5FF] text-[11px] font-bold text-[#0A1A4A]">
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
                          <td className="px-4 py-2.5 font-medium text-[#0A1A4A]">{row.meaning}</td>
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
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#CAD3F5] bg-[#E3E7FC] px-3 py-0.5 text-xs font-bold text-[#0056FF]">
                <FileText className="size-3.5" />
                <span>API Endpoint Specifications</span>
              </div>
              <h2 className="mt-2 flex items-center gap-2.5 text-2xl font-black tracking-tight text-[#0A1A4A]">
                <AsteriskLogo size="md" variant="success" className="text-2xl" />
                <span>Detailed API Documentation</span>
              </h2>
            </div>

            {/* =============================================================== */}
            {/* PUBLIC APIS                                                     */}
            {/* =============================================================== */}
            <div id="public-apis" className="scroll-mt-28 space-y-8 border-t border-[#CAD3F5] pt-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                    [PUBLIC]
                  </span>
                  <h3 className="text-xl font-black text-[#0A1A4A]">
                    1. Public Endpoints (Open Access)
                  </h3>
                </div>
                <p className="text-xs text-slate-600">
                  These endpoints provide public inquiries and do not require user credentials.
                </p>
              </div>

              {/* 1.1 System Health Probe */}
              <article id="api-health" className="scroll-mt-28 space-y-4">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#0A1A4A]">
                    1.1 System Health Probe (GET /health)
                  </h4>
                  <span className="rounded bg-[#0056FF] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                    [GET]
                  </span>
                </div>

                <ApiSpecTable
                  method="GET"
                  endpoint="{{baseUrl}}/health"
                  name="System Health & Status Probe"
                  description="Public microservices health inspection endpoint returning service operational status and server timestamp."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Public SHA-256 cryptographic proof verification for academic diplomas and completion credentials issued by SNPI."
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
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#E3E7FC] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
                    [RESTRICTED]
                  </span>
                  <h3 className="text-xl font-black text-[#0A1A4A]">
                    2. Institutional Protected Services
                  </h3>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900">
                  <span className="font-bold">Access Control Notice:</span> Protected endpoints
                  require an authorized Bearer session token. Unauthenticated inquiries will be
                  rejected with <code className="font-mono font-bold">401 Unauthorized</code>.
                </div>
              </div>

              {/* 2.1 User Login */}
              <article id="api-auth-login" className="scroll-mt-28 space-y-4">
                <div className="flex items-center justify-between border-b border-[#CAD3F5]/80 pb-2">
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Authenticates staff or administrator credentials and returns Bearer access and refresh tokens with branch tenancy context."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Rotates an existing refresh token and generates a new 15-minute Bearer access token without credential re-entry."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Returns authenticated user profile, resolved RBAC permissions matrix, branch access scopes, and institution tenancy."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Retrieves a paginated list of students filtered by branch, status, or search keyword."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Enrolls a new student into the school system under the caller branch scope with input validation."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Submits daily session attendance records for a class cohort with present, absent, late, or excused statuses."
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
                  <h4 className="text-base font-bold text-[#0A1A4A]">
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
                  description="Records tuition fee or administrative payments with dual currency support (USD / KHR) and auto-generated receipt numbers."
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
