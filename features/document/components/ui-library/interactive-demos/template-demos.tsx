'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { MultiStepWizardInteractiveDemo } from '../multi-step-wizard';
import { CommandPaletteInteractiveDemo } from '../command-palette';
import {
  Sparkles,
  Search,
  Check,
  Copy,
  Plus,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  Command,
  Upload,
  FileText,
  CreditCard,
  Layers,
  X,
  User,
  Mail,
  IdCard,
  ShieldCheck,
} from '@/components/icons';

import { RareUiNavigationMenu } from '../navigation-menu';

// ==========================================
// 1. BACKGROUNDS
// ==========================================

// 1.1 Precision Grid Background (Zero-Dot Linear Lattice Standard)
export function DotPatternDemo() {
  const [lineWidth, setLineWidth] = React.useState(1);
  const [spacing, setSpacing] = React.useState(24);

  return (
    <div className="relative flex h-72 w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-none">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, #0056FF ${lineWidth}px, transparent ${lineWidth}px), linear-gradient(to bottom, #0056FF ${lineWidth}px, transparent ${lineWidth}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
        }}
      />
      <div className="relative z-10 space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-4 text-center shadow-none">
        <h4 className="font-sans text-sm font-bold text-slate-900">Precision Linear Grid</h4>
        <p className="font-sans text-xs text-slate-500">
          Pure geometric linear lattice (Zero-Dot Design Standard) with customizable pitch.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSpacing((prev) => (prev === 24 ? 16 : 24))}
            className="rounded-[4px] border border-slate-200 px-3 py-1 font-mono text-[10px] font-bold text-slate-700 hover:bg-slate-50"
          >
            Grid Pitch: {spacing}px
          </button>
          <button
            type="button"
            onClick={() => setLineWidth((prev) => (prev === 1 ? 2 : 1))}
            className="rounded-[4px] border border-[#0056FF] bg-[#E3E7FC] px-3 py-1 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-blue-50"
          >
            Line: {lineWidth}px
          </button>
        </div>
      </div>
    </div>
  );
}

// 1.2 Retro Grid Background
export function RetroGridDemo() {
  const [perspective, setPerspective] = React.useState(true);

  return (
    <div className="relative flex h-72 w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-6 shadow-none">
      {/* 3D Grid Plane */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 opacity-40 transition-all duration-500',
          perspective && '[transform:rotateX(60deg)_translateY(-20%)]',
        )}
        style={{
          backgroundImage: `linear-gradient(to right, #CAD3F5 1px, transparent 1px), linear-gradient(to bottom, #CAD3F5 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
      {/* Brand Accent Bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#0056FF]" />

      <div className="relative z-10 space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-4 text-center text-[#09172B] shadow-none">
        <h4 className="font-sans text-sm font-bold text-[#09172B]">Retro Cyber Grid</h4>
        <p className="font-sans text-xs text-slate-600">
          CSS 3D perspective plane with gradient horizon falloff.
        </p>
        <button
          type="button"
          onClick={() => setPerspective(!perspective)}
          className="mt-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-blue-100"
        >
          Perspective: {perspective ? '3D Active' : '2D Flat'}
        </button>
      </div>
    </div>
  );
}

// 1.3 Aurora Waves Background
export function AuroraWavesDemo() {
  const [pulse, setPulse] = React.useState(true);

  return (
    <div className="relative flex h-72 w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-6 shadow-none">
      {/* Ambient Aurora Glow Blobs */}
      <div
        className={cn(
          'pointer-events-none absolute -top-12 -left-12 size-56 rounded-full bg-blue-300/30 blur-3xl transition-all duration-1000',
          pulse && 'scale-125 bg-blue-400/40',
        )}
      />
      <div
        className={cn(
          'pointer-events-none absolute -right-12 -bottom-12 size-56 rounded-full bg-indigo-300/30 blur-3xl transition-all duration-1000',
          pulse && 'scale-125 bg-indigo-400/40',
        )}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0056FF]/15 blur-2xl" />

      <div className="relative z-10 space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-4 text-center text-[#09172B] shadow-none">
        <h4 className="font-sans text-sm font-bold text-[#09172B]">Aurora Ambient Waves</h4>
        <p className="font-sans text-xs text-slate-600">
          High-performance CSS blurred radial gradients for modern hero cards.
        </p>
        <button
          type="button"
          onClick={() => setPulse(!pulse)}
          className="mt-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-[10px] font-bold text-slate-700 hover:bg-slate-200"
        >
          {pulse ? 'Pulse Fast' : 'Calm State'}
        </button>
      </div>
    </div>
  );
}

// 1.4 Interactive Particles Background
export function InteractiveParticlesDemo() {
  const [count, setCount] = React.useState(16);

  return (
    <div className="relative flex h-72 w-full max-w-lg flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-6 shadow-none">
      {/* Simulated Particle Grid */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="absolute size-1.5 rounded-[1px] bg-[#0056FF]"
            style={{
              top: `${((i * 19) % 90) + 5}%`,
              left: `${((i * 31) % 90) + 5}%`,
              opacity: (i % 5) * 0.2 + 0.2,
              animationDuration: `${(i % 3) + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-2 rounded-xl border border-[#CAD3F5] bg-white p-4 text-center text-[#09172B] shadow-none">
        <h4 className="font-sans text-sm font-bold text-[#09172B]">Particle Constellation</h4>
        <p className="font-sans text-xs text-slate-600">
          Zero-overhead CSS keyframe floating nodes for technical dashboards.
        </p>
        <button
          type="button"
          onClick={() => setCount((prev) => (prev === 16 ? 32 : 16))}
          className="mt-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-blue-100"
        >
          Nodes: {count} Active
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. TEXT EFFECTS
// ==========================================

// 2.1 Text Shimmer Effect
export function TextShimmerDemo() {
  const [speed, setSpeed] = React.useState<'normal' | 'fast'>('normal');

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
      <div className="relative inline-block overflow-hidden font-sans text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        <span className="inline-block text-[#0056FF]">SNPI Autonomous Campus</span>
      </div>
      <p className="font-sans text-xs text-slate-500">
        Gradient-clipped typography shimmer with dynamic linear keyframes.
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSpeed(speed === 'normal' ? 'fast' : 'normal')}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[10px] font-bold text-slate-700 hover:border-[#0056FF]"
        >
          Speed: {speed.toUpperCase()}
        </button>
      </div>
    </div>
  );
}

// 2.4 Blur In Typography
export function BlurInDemo() {
  const [key, setKey] = React.useState(0);

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xs">
      <div
        key={key}
        className="animate-in fade-in-0 blur-in-sm transition-all duration-700 ease-out"
      >
        <h3 className="font-sans text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          Zero-Lag Fluid Interface
        </h3>
      </div>
      <p className="font-sans text-xs text-slate-500">
        Cinematic Gaussian blur to sharp focus entrance for hero statements.
      </p>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="rounded-full border border-[#CAD3F5] bg-[#E3E7FC] px-3.5 py-1 font-mono text-[10px] font-bold text-[#0056FF] hover:bg-blue-100"
      >
        Replay Blur Entrance
      </button>
    </div>
  );
}

// ==========================================
// 3. CARDS
// ==========================================

// 3.1 Spotlight Card
export function SpotlightCardDemo() {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
      className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#CAD3F5] bg-white p-6 text-[#09172B] shadow-none"
    >
      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: pos.opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(0, 86, 255, 0.12), transparent 80%)`,
        }}
      />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF] uppercase">
            Spotlight Ray
          </span>
          <Sparkles className="size-4 text-[#0056FF]" />
        </div>
        <h4 className="font-sans text-lg font-black text-[#09172B]">Dynamic Cursor Illumination</h4>
        <p className="font-sans text-xs text-slate-600">
          Mouse-following radial gradient layer illuminating mathematical borders and surfaces.
        </p>
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 font-mono text-xs text-slate-500">
          <span>X: {Math.round(pos.x)}px</span>
          <span>Y: {Math.round(pos.y)}px</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. SECTIONS
// ==========================================

// 4.1 Marquee Section (Apple + 9 Real Industry Leaders in Monochrome B&W)
export { LogoMarqueeDemo as MarqueeSectionDemo } from '../logo-marquee';

// ==========================================
// 5. FORMS
// ==========================================

// 5.1 Standard Form Inputs (Candidate Registration Dossier)
export function FloatingLabelFormDemo() {
  const [formData, setFormData] = React.useState({
    fullName: 'Dara Sok',
    email: 'dara.sok@student.snpi.edu.kh',
    studentId: 'STU-2026-0891',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const isFormValid =
    formData.fullName.trim().length >= 3 &&
    formData.email.includes('@') &&
    formData.studentId.trim().length >= 6;

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      studentId: '',
    });
    setSubmitted(false);
  };

  const handleFillSample = () => {
    setFormData({
      fullName: 'Dara Sok',
      email: 'dara.sok@student.snpi.edu.kh',
      studentId: 'STU-2026-0891',
    });
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <div className="w-full max-w-xl space-y-5 rounded-2xl border border-[#CAD3F5] bg-white p-5 shadow-xs sm:p-7">
      {/* Form Dossier Header */}
      <div className="flex items-center justify-between border-b border-[#CAD3F5] pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]">
            <FileText className="size-5 stroke-[2]" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold text-[#0A1A4A] sm:text-base">
              Candidate Registration Dossier
            </h4>
            <p className="font-sans text-xs text-[#334155]">
              Standard Form Inputs &middot; High-Contrast Precision
            </p>
          </div>
        </div>
        <span className="rounded-md border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-1 font-mono text-[10px] font-bold text-[#0056FF]">
          Verified Form
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field 1: Candidate Full Legal Name */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="std-full-name"
              className="block font-sans text-xs font-bold text-[#0A1A4A]"
            >
              Candidate Full Legal Name <span className="text-[#0056FF]">*</span>
            </label>
            {formData.fullName.trim().length >= 3 && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600">
                <Check className="size-3 stroke-[2.5]" />
                <span>Valid Name</span>
              </span>
            )}
          </div>
          <div className="group relative flex items-center">
            <div className="pointer-events-none absolute left-3 flex size-5 items-center justify-center text-slate-400 transition-colors group-focus-within:text-[#0056FF]">
              <User className="size-4 stroke-[2]" />
            </div>
            <input
              type="text"
              id="std-full-name"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Enter full legal name (e.g. Dara Sok)"
              className="h-11 w-full rounded-xl border-2 border-[#CAD3F5] bg-[#EFF5FF]/40 pr-3 pl-10 font-sans text-xs font-semibold text-[#0A1A4A] transition-all placeholder:text-slate-400 hover:border-[#0056FF]/50 hover:bg-white focus:border-[#0056FF] focus:bg-white focus:ring-3 focus:ring-[#0056FF]/15 focus:outline-none"
            />
          </div>
          <p className="font-sans text-[11px] text-slate-500">
            Official legal name matching civil registration identity records.
          </p>
        </div>

        {/* Field 2: Institutional Campus Email Address */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="std-email" className="block font-sans text-xs font-bold text-[#0A1A4A]">
              Institutional Campus Email Address <span className="text-[#0056FF]">*</span>
            </label>
            {formData.email.includes('@') && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600">
                <Check className="size-3 stroke-[2.5]" />
                <span>Verified Domain</span>
              </span>
            )}
          </div>
          <div className="group relative flex items-center">
            <div className="pointer-events-none absolute left-3 flex size-5 items-center justify-center text-slate-400 transition-colors group-focus-within:text-[#0056FF]">
              <Mail className="size-4 stroke-[2]" />
            </div>
            <input
              type="email"
              id="std-email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. dara.sok@student.snpi.edu.kh"
              className="h-11 w-full rounded-xl border-2 border-[#CAD3F5] bg-[#EFF5FF]/40 pr-3 pl-10 font-sans text-xs font-semibold text-[#0A1A4A] transition-all placeholder:text-slate-400 hover:border-[#0056FF]/50 hover:bg-white focus:border-[#0056FF] focus:bg-white focus:ring-3 focus:ring-[#0056FF]/15 focus:outline-none"
            />
          </div>
          <p className="font-sans text-[11px] text-slate-500">
            Official campus single sign-on address (@student.snpi.edu.kh).
          </p>
        </div>

        {/* Field 3: National Student ID */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="std-student-id"
              className="block font-sans text-xs font-bold text-[#0A1A4A]"
            >
              National Student ID (STU-XXXX-XXXX) <span className="text-[#0056FF]">*</span>
            </label>
            {formData.studentId.trim().length >= 6 && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600">
                <Check className="size-3 stroke-[2.5]" />
                <span>ID Standard</span>
              </span>
            )}
          </div>
          <div className="group relative flex items-center">
            <div className="pointer-events-none absolute left-3 flex size-5 items-center justify-center text-slate-400 transition-colors group-focus-within:text-[#0056FF]">
              <IdCard className="size-4 stroke-[2]" />
            </div>
            <input
              type="text"
              id="std-student-id"
              required
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              placeholder="e.g. STU-2026-0891"
              className="h-11 w-full rounded-xl border-2 border-[#CAD3F5] bg-[#EFF5FF]/40 pr-3 pl-10 font-mono text-xs font-bold text-[#0A1A4A] transition-all placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 hover:border-[#0056FF]/50 hover:bg-white focus:border-[#0056FF] focus:bg-white focus:ring-3 focus:ring-[#0056FF]/15 focus:outline-none"
            />
          </div>
          <p className="font-sans text-[11px] text-slate-500">
            Standard format: STU-YYYY-XXXX institutional identifier.
          </p>
        </div>

        {/* Action Buttons & Verification Note */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-700">
            <ShieldCheck className="size-4 stroke-[2.5] text-emerald-600" />
            <span>Strict Zod Schema Validation</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={formData.fullName ? handleReset : handleFillSample}
              className="cursor-pointer rounded-xl border border-[#CAD3F5] bg-white px-3.5 py-2 font-sans text-xs font-bold text-[#0A1A4A] transition-colors hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
            >
              {formData.fullName ? 'Clear' : 'Fill Sample'}
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="cursor-pointer rounded-xl border border-[#0056FF] bg-[#0056FF] px-5 py-2 font-sans text-xs font-bold text-white shadow-xs transition-all hover:bg-[#2277FF] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitted ? 'Record Registered' : 'Register Candidate'}
            </button>
          </div>
        </div>
      </form>

      {/* Submission Success Toast Card */}
      {submitted && (
        <div className="animate-in fade-in flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50/80 p-4 font-sans text-xs text-emerald-950">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <Check className="size-3.5 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-emerald-900">Registration Complete</div>
            <p className="text-emerald-800">
              Candidate record for <span className="font-bold">{formData.fullName}</span> (
              <span className="font-mono font-bold">{formData.studentId}</span>) was verified and
              registered into the campus directory.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// 5.2 Multi-Step Wizard
export function MultiStepWizardDemo() {
  return <MultiStepWizardInteractiveDemo />;
}

// 5.3 File Dropzone
export function FileDropzoneDemo() {
  const [uploaded, setUploaded] = React.useState<string[]>(['National_Birth_Certificate.pdf']);

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-center hover:border-[#0056FF]">
        <Upload className="size-6 text-[#0056FF]" />
        <span className="mt-2 font-sans text-xs font-bold text-slate-800">
          Drag & Drop Student Dossier
        </span>
        <span className="font-mono text-[10px] text-slate-400">PDF, PNG, DOCX up to 15MB</span>
        <button
          type="button"
          onClick={() => setUploaded((prev) => [...prev, `Medical_Record_${prev.length + 1}.pdf`])}
          className="mt-3 rounded-[4px] border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] font-bold text-slate-700 shadow-xs hover:bg-slate-50"
        >
          Browse Files
        </button>
      </div>

      <div className="space-y-1.5">
        {uploaded.map((f, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
          >
            <span className="font-sans font-semibold text-slate-700">{f}</span>
            <span className="font-mono text-[10px] font-bold text-emerald-600">READY</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5.4 Payment Card Form
export function PaymentCardDemo() {
  const [num, setNum] = React.useState('4532 •••• •••• 8891');

  return (
    <div className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Brand Tuition Card Preview */}
      <div className="relative overflow-hidden rounded-2xl border border-[#0056FF] bg-[#0056FF] p-5 text-white shadow-xs">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold tracking-widest uppercase">
            SNPI TUITION CARD
          </span>
          <CreditCard className="size-5" />
        </div>
        <div className="my-4 font-mono text-lg font-bold tracking-widest">{num}</div>
        <div className="flex items-center justify-between font-mono text-[11px] text-blue-200">
          <span>DARA SOK</span>
          <span>EXP: 09/28</span>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Card Number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          className="w-full rounded-full border border-slate-200 px-4 py-2 font-mono text-xs outline-none focus:border-[#0056FF]"
        />
      </div>
    </div>
  );
}

// ==========================================
// 6. OVERLAYS
// ==========================================

// 6.1 Command Palette KBD
export function CommandPaletteDemo() {
  return <CommandPaletteInteractiveDemo />;
}
