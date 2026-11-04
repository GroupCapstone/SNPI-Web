'use client';

import * as React from 'react';
import {
  Sparkles,
  ShieldKey,
  Globe,
  Check,
  Copy,
  Search,
  FileText,
  Sliders,
  Terminal,
  ArrowRight,
} from '@/components/icons';
import { cn } from '@/lib/utils';

// Standardized Bilingual Academic Terminology Glossary
const SYSTEM_TERMINOLOGY = [
  {
    khmer: 'សាខាសាលារៀន',
    english: 'Branch / Campus',
    scope: 'Organization',
    code: 'ORG_BRANCH',
    usage: 'Physical school locations (e.g. Main Branch, Sen Sok, Toul Kork).',
  },
  {
    khmer: 'កូដសាខា',
    english: 'Branch Code',
    scope: 'Organization',
    code: 'ORG_BRANCH_CODE',
    usage: 'Unique institutional campus identifier (e.g. MB-01, SS-03, TK-02).',
  },
  {
    khmer: 'គ្រប់គ្រងសាខា',
    english: 'Branch Management',
    scope: 'Organization',
    code: 'ORG_BRANCH_MGT',
    usage: 'Administrative view for configuring campus branches and contact records.',
  },
  {
    khmer: 'ព័ត៌មានសាលារៀន',
    english: 'School Information',
    scope: 'Organization',
    code: 'ORG_SCHOOL_INFO',
    usage: 'Master institutional profile, contact numbers, and legal address.',
  },
  {
    khmer: 'ផ្នែក និងដេប៉ាតឺម៉ង់',
    english: 'Departments & Units',
    scope: 'Organization',
    code: 'ORG_DEPT',
    usage: 'Academic faculties and administrative operations units.',
  },
  {
    khmer: 'មុខតំណែង និងតួនាទី',
    english: 'Positions & Job Roles',
    scope: 'Human Resources',
    code: 'HR_POSITION',
    usage: 'Staff job classifications and pedagogical responsibilities.',
  },
  {
    khmer: 'ឆ្នាំសិក្សា',
    english: 'Academic Year',
    scope: 'Academics',
    code: 'ACA_YEAR',
    usage: 'Annual educational cycle (e.g. 2026-2027 Academic Year).',
  },
  {
    khmer: 'រចនាសម្ព័ន្ធស្ថាប័ន',
    english: 'Institutional Structure',
    scope: 'Administration',
    code: 'ADM_STRUCT',
    usage: 'Hierarchical governance, faculties, and functional divisions.',
  },
  {
    khmer: 'តួនាទី និងសិទ្ធិគ្រប់គ្រង',
    english: 'Roles & Permissions',
    scope: 'Security / RBAC',
    code: 'SEC_RBAC',
    usage: 'Access control matrices for Super Admin, Director, Registrar, Teacher, and Student.',
  },
  {
    khmer: 'ការចុះឈ្មោះសិស្ស',
    english: 'Student Enrollment',
    scope: 'Admissions',
    code: 'ADM_ENROLL',
    usage: 'Formal registration of students into academic programs and grade sections.',
  },
  {
    khmer: 'កាលវិភាគសិក្សា',
    english: 'Class Schedule',
    scope: 'Curriculum',
    code: 'CUR_SCHED',
    usage: 'Weekly timetable for lectures, laboratory sessions, and instructor assignments.',
  },
  {
    khmer: 'ការទូទាត់ថ្លៃសិក្សា',
    english: 'Tuition & Fee Invoicing',
    scope: 'Finance',
    code: 'FIN_INVOICE',
    usage: 'Tuition collection, KHQR invoice generation, and ledger reconciliations.',
  },
  {
    khmer: 'វត្តមាន និងអវត្តមាន',
    english: 'Attendance Tracking',
    scope: 'Operations',
    code: 'OPS_ATTEND',
    usage: 'Daily tracking of student and faculty presence, excused leaves, and tardiness.',
  },
  {
    khmer: 'លទ្ធផល និងពិន្ទុសិក្សា',
    english: 'Grades & Academic Scores',
    scope: 'Assessment',
    code: 'ASM_SCORE',
    usage: 'Semester examinations, GPA calculations, and academic honor transcripts.',
  },
  {
    khmer: 'ស្ថានភាពសកម្ម',
    english: 'Active Status',
    scope: 'System State',
    code: 'SYS_ACTIVE',
    usage: 'Entity lifecycle indicator signifying an active, operable record.',
  },
];

// Tone of Voice Matrix for System Management
const VOICE_MATRIX = [
  {
    pillar: 'Authoritative yet Empathetic',
    rule: 'Communicate administrative decisions with clarity, warmth, and institutional trust.',
    productUI: 'Terse, direct confirmations with zero ambiguity.',
    marketing: 'Inspiring, future-focused statements celebrating student success.',
    doExample: 'Branch record updated successfully.',
    dontExample: 'Your changes were saved into the database system.',
  },
  {
    pillar: 'Action-Oriented & Direct',
    rule: 'Start user instructions with a strong imperative verb, leading directly to the goal.',
    productUI: 'Create Branch, Download Report, Filter Records.',
    marketing: 'Join the next generation of digital learning in Cambodia.',
    doExample: 'Select an academic year to view class rosters.',
    dontExample: 'You can now proceed to select the academic year from the dropdown above.',
  },
  {
    pillar: 'Transparent & Accountable',
    rule: 'Always present the exact cause of an error and the exact next step to resolve it.',
    productUI: 'Error banner: Branch code already exists. Enter a unique code.',
    marketing: '100% cloud-verified academic integrity across all campuses.',
    doExample: 'Unable to save. Verify that student phone number contains 9-10 digits.',
    dontExample: 'An unexpected error occurred. Please try again later.',
  },
];

export function BrandFoundationsSection() {
  const [termSearch, setTermSearch] = React.useState<string>('');
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
      }
    } catch (e) {
      console.error('Clipboard copy failed:', e);
    }
  };

  const filteredTerms = React.useMemo(() => {
    const q = termSearch.toLowerCase().trim();
    if (!q) return SYSTEM_TERMINOLOGY;
    return SYSTEM_TERMINOLOGY.filter(
      (t) =>
        t.khmer.toLowerCase().includes(q) ||
        t.english.toLowerCase().includes(q) ||
        t.scope.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q),
    );
  }, [termSearch]);

  return (
    <div className="space-y-16">
      {/* ========================================================= */}
      {/* 1. BRAND VISION & CORE PURPOSE                            */}
      {/* ========================================================= */}
      <section id="brand-vision" className="scroll-mt-24 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              Brand Foundations
            </span>
            <span className="font-mono text-xs text-slate-500">Core Identity</span>
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Brand Vision &amp; Core Purpose
          </h2>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            Brand drives every single decision made when building new products or features. A good
            brand is much more than a name and a logo. It defines the values of SNPI-SMS and what
            distinguishes our institutional platform.
          </p>
        </div>

        {/* Vision Blueprint Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                01 Purpose
              </span>
              <h3 className="font-sans text-base font-bold text-[#0A1A4A]">Why We Exist</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                To modernize Cambodian educational management through transparent digital workflows,
                replacing paper clutter with reliable cloud infrastructure.
              </p>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                Institutional Governance
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                02 Values
              </span>
              <h3 className="font-sans text-base font-bold text-[#0A1A4A]">What Guides Us</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                Educational integrity, barrier-free accessibility, high-speed responsiveness
                (&lt;300ms), and respectful bilingual parity across Khmer and English.
              </p>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                Integrity &amp; Speed
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                03 Horizon
              </span>
              <h3 className="font-sans text-base font-bold text-[#0A1A4A]">Future of Product</h3>
              <p className="font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
                Empowering administrators and teachers with autonomous AI assistants that streamline
                attendance, academic transcripts, and compliance reporting.
              </p>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                Agentic Scalability
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. DESIGN PRINCIPLES                                      */}
      {/* ========================================================= */}
      <section
        id="design-principles"
        className="scroll-mt-24 space-y-6 border-t border-[#CAD3F5] pt-10"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              Philosophy
            </span>
            <span className="font-mono text-xs text-slate-500">5 Operational Standards</span>
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Design Principles
          </h2>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            These considerations guide our practice, outlining how we approach design
            philosophically and resolving everyday product decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 01
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">
              Clarity Over Decoration
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Function dictates form. Information hierarchy and legible data tables take precedence
              over unnecessary animations, blur filters, or decorative clutter.
            </p>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 02
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">
              Fast &amp; Purposeful
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Every transition must complete within 300ms. Operations are optimistic and immediate,
              keeping school staff in a continuous flow state.
            </p>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 03
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">
              Inclusive by Default
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Accessible design enables users of all abilities to navigate, understand, and complete
              school workflows effortlessly across devices.
            </p>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 04
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">
              Structural Flat Depth
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Visual depth is established strictly through 1px border keylines and surface luminance
              ladder (<code className="font-mono">box-shadow: none</code>).
            </p>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 05
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">Bilingual Parity</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Khmer and English typography receive equal visual weight, accommodating Khmer font
              line heights (1.6-1.8) and character height compensations.
            </p>
          </div>

          <div className="rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              Principle 06
            </span>
            <h3 className="mt-1 font-sans text-base font-bold text-[#0A1A4A]">
              Deterministic Governance
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Permissions and multi-tenant school scopes are strictly enforced. Safe defaults and
              explicit destructive confirmation guards prevent data loss.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. TONE OF VOICE MATRIX                                   */}
      {/* ========================================================= */}
      <section
        id="tone-of-voice"
        className="scroll-mt-24 space-y-6 border-t border-[#CAD3F5] pt-10"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              Communication
            </span>
            <span className="font-mono text-xs text-slate-500">Editorial Guide</span>
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Tone of Voice
          </h2>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            A clear tone of voice defines how we speak to our audience at every moment of their
            journey, helping them reach their destination quickly and confidently.
          </p>
        </div>

        <div className="space-y-4">
          {VOICE_MATRIX.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 rounded-2xl border border-[#CAD3F5] bg-white p-6 lg:flex-row lg:items-start"
            >
              <div className="space-y-1.5 lg:w-1/3">
                <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                  Pillar 0{idx + 1}
                </span>
                <h3 className="font-sans text-base font-bold text-[#0A1A4A]">{item.pillar}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{item.rule}</p>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:border-l lg:border-slate-100 lg:pl-6">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5">
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">
                    [Do] Recommended
                  </span>
                  <p className="mt-1 font-sans text-xs font-semibold text-slate-900">
                    &ldquo;{item.doExample}&rdquo;
                  </p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50/40 p-3.5">
                  <span className="font-mono text-[10px] font-bold text-red-700 uppercase">
                    [Don&apos;t] Avoid
                  </span>
                  <p className="mt-1 font-sans text-xs font-semibold text-slate-500 line-through">
                    &ldquo;{item.dontExample}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. STANDARD TERMINOLOGY GLOSSARY                          */}
      {/* ========================================================= */}
      <section id="terminology" className="scroll-mt-24 space-y-6 border-t border-[#CAD3F5] pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
                Glossary
              </span>
              <span className="font-mono text-xs text-slate-500">Bilingual Dictionary</span>
            </div>
            <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
              Standard Terminology
            </h2>
            <p className="max-w-2xl font-sans text-sm leading-relaxed text-slate-600">
              Standard terms and phrases kept consistent throughout the product and marketing
              touchpoints, speeding up design and engineering while unifying our voice.
            </p>
          </div>

          {/* Real-time search filter */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={termSearch}
              onChange={(e) => setTermSearch(e.target.value)}
              placeholder="Search terms or codes..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pr-3 pl-9 font-sans text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#0056FF] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Terminology Data Table */}
        <div className="overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="border-b border-[#CAD3F5] bg-[#EFF5FF] font-mono text-[10px] font-bold text-[#0A1A4A] uppercase">
                <tr>
                  <th className="px-4 py-3">Khmer Term</th>
                  <th className="px-4 py-3">English Standard</th>
                  <th className="px-4 py-3">System Code</th>
                  <th className="px-4 py-3">Domain</th>
                  <th className="px-4 py-3">Standard Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTerms.map((term, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-bold text-[#0A1A4A]">{term.khmer}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{term.english}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleCopy(term.code, term.code)}
                        className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-[#E3E7FC]"
                      >
                        <span>{term.code}</span>
                        {copiedCode === term.code ? (
                          <Check className="size-3 text-emerald-600" />
                        ) : (
                          <Copy className="size-3 text-slate-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-500 uppercase">
                      {term.scope}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{term.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. BRAND ASSETS & CROSS-CHANNEL ALIGNMENT                 */}
      {/* ========================================================= */}
      <section id="brand-assets" className="scroll-mt-24 space-y-6 border-t border-[#CAD3F5] pt-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              Brand Assets
            </span>
            <span className="font-mono text-xs text-slate-500">Cross-Channel Consistency</span>
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Brand Assets &amp; Guidelines
          </h2>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            Using a consistent set of brand assets aligns the user experience across the core
            product interface and external marketing campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card A: Product Application Guidelines */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
                Product Application (App Router)
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0A1A4A]">
                Core School Management UI
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#0056FF]" />
                  <span>
                    <strong>Background:</strong> Pure White (
                    <code className="font-mono">#FFFFFF</code>) canvas with 1px border keylines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#0056FF]" />
                  <span>
                    <strong>Primary CTAs:</strong> Solid Royal Blue (
                    <code className="font-mono">#0056FF</code>) with white text and 4px radius.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#0056FF]" />
                  <span>
                    <strong>Data Surfaces:</strong> Light Day First with zero dropped blur shadows.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                Light Day First Standard
              </span>
            </div>
          </div>

          {/* Card B: Marketing Campaign Guidelines */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#CAD3F5] bg-white p-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] font-bold text-[#2277FF] uppercase">
                Marketing Campaigns (Social &amp; Web)
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0A1A4A]">
                Admissions &amp; Outreach
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#2277FF]" />
                  <span>
                    <strong>Header Lockup:</strong> Full institutional seal with clear space
                    boundary equal to mark height.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#2277FF]" />
                  <span>
                    <strong>Palette Harmony:</strong> Contrast pairs utilizing Royal Blue and Azure
                    Blue with Soft Lavender fills.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 shrink-0 text-[#2277FF]" />
                  <span>
                    <strong>Hero Typography:</strong> Sora ExtraBold for headlines; Kantumruy Pro
                    for Khmer body copy.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="font-mono text-[10px] font-semibold text-slate-400">
                Institutional Cohesion
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. ACCESSIBLE DESIGN OVERVIEW                             */}
      {/* ========================================================= */}
      <section
        id="accessible-design"
        className="scroll-mt-24 space-y-6 border-t border-[#CAD3F5] pt-10"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase">
              Accessibility
            </span>
            <span className="font-mono text-xs text-slate-500">Universal Inclusivity</span>
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-[#0A1A4A] sm:text-3xl">
            Accessible Design: Core Overview
          </h2>
          <p className="max-w-3xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
            Accessible design enables users with diverse abilities to navigate, understand, and
            enjoy a user interface. In SNPI-SMS, accessibility is a foundational architecture, not
            an afterthought.
          </p>
        </div>

        {/* 4 Core Invariant Pillars */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              01 Perceivable
            </span>
            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">WCAG 2.1 AAA Contrast</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Text contrast exceeds 7:1 (Deep Navy on White achieves 16.5:1). Status states never
              rely on color alone, always pairing with text badges.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              02 Operable
            </span>
            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">
              &ge; 44&times;44px Touch Targets
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Every interactive element conforms to Fitts&apos;s Law with expanded hit areas. Full
              keyboard roving tabindex allows 100% mouse-free navigation.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              03 Understandable
            </span>
            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">Predictable Microcopy</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Action verbs guide all CTAs. Error banners follow the 3-part formula: what happened,
              why it happened, and the exact step to recover.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-[#CAD3F5] bg-white p-5">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              04 Robust
            </span>
            <h3 className="font-sans text-sm font-bold text-[#0A1A4A]">Semantic HTML &amp; ARIA</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              Native HTML5 semantic landmarks (<code className="font-mono">main</code>,{' '}
              <code className="font-mono">nav</code>, <code className="font-mono">aside</code>) and
              live announcer regions for dynamic toast messages.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
