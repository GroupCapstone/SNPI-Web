'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Play,
  RotateCw,
  Sparkles,
  Layers,
  ChevronRight,
  Sliders,
  Check,
  Copy,
} from '@/components/icons';

// ============================================================================
// 10 REAL ENTERPRISE MONOCHROME BLACK & WHITE LOGOS
// Apple + 9 Real Industry Leaders (Google, Microsoft, Amazon, Meta,
// NVIDIA, OpenAI, Cloudflare, GitHub, Vercel)
// ============================================================================

export interface EnterpriseLogoItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  founded: string;
  svg: (props: { className?: string }) => React.JSX.Element;
}

export const REAL_ENTERPRISE_LOGOS: EnterpriseLogoItem[] = [
  {
    id: 'apple',
    name: 'Apple',
    tagline: 'Hardware & OS Architecture',
    category: 'Ecosystem',
    founded: '1976',
    svg: ({ className }) => (
      <svg viewBox="0 0 170 170" fill="currentColor" className={className}>
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.05-7.5-7.64-11.39-13.78-5.22-8.27-9.47-17.75-12.74-28.43-3.27-10.68-4.91-21.37-4.91-32.07 0-14.15 3.59-26.23 10.77-36.23 7.18-10.01 16.27-15.11 27.27-15.31 4.79 0 10.42 1.34 16.89 4.02 6.47 2.68 10.45 4.07 11.94 4.18 1.96-.22 6.07-1.74 12.33-4.57 6.26-2.83 11.64-4.14 16.14-3.92 12.19.87 21.84 5.37 28.95 13.5-10.67 6.54-15.89 15.58-15.67 27.13.22 9.15 3.81 16.88 10.77 23.19 6.96 6.31 15.12 10.02 24.49 11.13-2.18 6.54-4.89 13.1-8.15 19.68zM119.22 31.84c0-7.18 2.51-13.84 7.52-19.98 5.01-6.14 11.12-10.34 18.33-12.61.65 2.18.98 4.36.98 6.54 0 7.41-2.62 14.3-7.85 20.69-5.23 6.38-11.53 10.51-18.91 12.39-.11-2.18-.07-4.52-.07-7.03z" />
      </svg>
    ),
  },
  {
    id: 'google',
    name: 'Google',
    tagline: 'Search, Cloud & Gemini AI',
    category: 'Cloud Infrastructure',
    founded: '1998',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tagline: 'Enterprise Cloud & Windows OS',
    category: 'Enterprise Cloud',
    founded: '1975',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1 1h10v10H1zM13 1h10v10H13zM1 13h10v10H1zM13 13h10v10H13z" />
      </svg>
    ),
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'AWS Cloud & Global Commerce',
    category: 'Hyperscale Cloud',
    founded: '1994',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.92 14.59c-1.96 1.44-4.8 2.22-7.23 2.22-3.41 0-6.49-1.29-8.81-3.45-.18-.17-.02-.4.2-.27 2.47 1.45 5.51 2.32 8.61 2.32 2.15 0 4.67-.61 6.94-1.89.34-.19.64.15.29.42v.65z" />
        <path d="M14.73 13.43c-.25-.32-1.63-.15-2.26-.08-.19.02-.22-.14-.05-.26 1.11-.78 2.92-.55 3.13-.29.21.26-.06 2.08-1.11 2.94-.16.13-.31.06-.24-.11.23-.55.77-1.88.53-2.2z" />
        <path d="M13.88 10.97c-.24 1.35-1.1 2.33-2.69 2.33-1.04 0-1.83-.55-1.83-1.58 0-1.25 1.05-1.84 2.89-1.84.45 0 1.15.06 1.63.14v.95zm1.87 3.51V7.91c0-1.28-.77-2.12-2.3-2.12-1.39 0-2.45.64-2.73 1.83-.05.21.09.31.25.33.89.07 1.06-.47 1.77-.47.66 0 .97.35.97.94v.37c-.55-.07-1.3-.12-2.15-.12-2.27 0-3.9 1.07-3.9 2.87 0 1.69 1.25 2.67 2.84 2.67 1.34 0 2.22-.64 2.62-1.42h.06c.15.89.9 1.42 1.87 1.42.54 0 1.05-.13 1.47-.36.19-.1.14-.29-.02-.38-.45-.25-.68-.53-.68-1.14v-.04z" />
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    tagline: 'Llama AI & Open Compute',
    category: 'Open Source AI',
    founded: '2004',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M23.998 12c0-3.41-1.771-6.196-4.305-7.585-2.433-1.334-5.405-1.173-7.693.388-2.288-1.561-5.26-1.722-7.693-.388C1.771 5.804 0 8.59 0 12c0 3.411 1.771 6.197 4.307 7.586 2.433 1.333 5.405 1.172 7.693-.389 2.288 1.561 5.26 1.722 7.693.389 2.534-1.389 4.305-4.175 4.305-7.586zm-5.18 4.908c-1.868.966-4.043.687-5.59-.687-.411-.365-.772-.78-1.228-1.293-.456.513-.817.928-1.228 1.293-1.547 1.374-3.722 1.653-5.59.687-1.889-.978-3.08-2.977-3.08-5.048 0-2.072 1.191-4.07 3.08-5.048 1.868-.966 4.043-.687 5.59.687.411.365.772.78 1.228 1.293.456-.513.817-.928 1.228-1.293 1.547-1.374 3.722-1.653 5.59-.687 1.889.978 3.08 2.977 3.08 5.048 0 2.071-1.191 4.07-3.08 5.048z" />
      </svg>
    ),
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    tagline: 'CUDA & Accelerated GPU Compute',
    category: 'Silicon Compute',
    founded: '1993',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8.93 7.82c-.39 0-.75.14-1.04.38-.28.25-.43.59-.43.99 0 .8.62 1.44 1.47 1.44.8 0 1.45-.64 1.45-1.44s-.65-1.37-1.45-1.37zm7.64 3.19c-.31-.05-.62-.08-.94-.08-2.6 0-4.63 1.95-4.63 4.45 0 2.45 2.03 4.42 4.63 4.42.32 0 .63-.03.94-.08v-8.71zm3.89-2.04c-.75-.41-1.58-.69-2.47-.84v11.83c1.04-.21 2.02-.63 2.89-1.24 1.82-1.28 2.96-3.26 2.96-5.46 0-1.67-.67-3.23-1.82-4.29h-.01c-.48-.44-1.03-.78-1.55-1zm-9.05-3.24c-3.79 0-6.87 3.08-6.87 6.87 0 2.08.92 3.94 2.39 5.22.42.37.9.68 1.41.93.38.19.78.34 1.2.46.59.16 1.22.25 1.87.25 3.79 0 6.87-3.08 6.87-6.87s-3.08-6.86-6.87-6.86zm12.59 1.85C22.69 9.3 23.5 11.23 23.5 13.3c0 2.92-1.35 5.56-3.56 7.23-1.44 1.09-3.15 1.82-5.01 2.08-.43.06-.88.09-1.34.09H3.45L1 18.25V9.41l2.45-4.45h10.14c.46 0 .91.03 1.34.09 1.86.26 3.57.99 5.01 2.08.38.29.74.61 1.06.95z" />
      </svg>
    ),
  },
  {
    id: 'openai',
    name: 'OpenAI',
    tagline: 'GPT & Reasoning Intelligence',
    category: 'Foundation AI',
    founded: '2015',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.28 9.83a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 0010.5.5a6.05 6.05 0 00-5.77 4.22 6.05 6.05 0 00-4.06 2.94 6.06 6.06 0 00.74 7.11 5.98 5.98 0 00.52 4.91 6.05 6.05 0 006.51 2.9A6.05 6.05 0 0013.5 23.5a6.05 6.05 0 005.77-4.22 6.05 6.05 0 004.06-2.94 6.06 6.06 0 00-.74-7.11zM13.5 21.84c-1.37 0-2.67-.47-3.71-1.28l.19-.11 4.75-2.74a.8.8 0 00.41-.69v-6.39l1.92 1.11a.08.08 0 01.04.06v5.47a4.42 4.42 0 01-3.6 4.57zm-8.48-3.48a4.42 4.42 0 01-.58-5.38l.19.11 4.75 2.74c.25.15.56.15.82 0l5.53-3.19v2.22a.08.08 0 01-.03.07l-4.74 2.74a4.42 4.42 0 01-5.94-.31zm-1.8-8.8a4.42 4.42 0 013.02-4.1l-.19.11-4.75 2.74a.8.8 0 00-.41.69v6.39l-1.92-1.11a.08.08 0 01-.04-.06V8.87a4.42 4.42 0 014.29-3.31zm10.5-3.06l-5.53 3.19V7.47a.08.08 0 01.03-.07l4.74-2.74a4.42 4.42 0 015.94.31 4.42 4.42 0 01.58 5.38l-.19-.11-4.75-2.74a.8.8 0 00-.82 0zm5.66 4.88l1.92 1.11a.08.08 0 01.04.06v5.47a4.42 4.42 0 01-4.29 3.31 4.42 4.42 0 01-3.02-4.1l.19-.11 4.75-2.74a.8.8 0 00.41-.69v-6.39l-1.92 1.11a.08.08 0 01-.04.06v-.07l.03-.02 1.93-1.11zm-8.88 4.22l2.8-1.62 2.8 1.62v3.23l-2.8 1.62-2.8-1.62V15.6z" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    tagline: 'Global Anycast Edge Network',
    category: 'Edge Network',
    founded: '2009',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.33 9.42a5.52 5.52 0 00-5.32-4.08 5.55 5.55 0 00-5.24 3.7A4.27 4.27 0 004.28 13c0 2.36 1.91 4.27 4.27 4.27h9.52a4.45 4.45 0 004.45-4.45 4.43 4.43 0 00-4.19-3.4zm-1.89 6.32H8.55c-1.52 0-2.76-1.24-2.76-2.76s1.24-2.76 2.76-2.76c.27 0 .53.04.78.12l.84.28.32-.82a4.02 4.02 0 013.78-2.65 4.01 4.01 0 013.88 2.97l.29.98 1.02.13a2.94 2.94 0 012.56 2.92 2.93 2.93 0 01-2.93 2.57z" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    tagline: 'Open Source Code & Workflows',
    category: 'Developer Platform',
    founded: '2008',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Frontend Cloud & Edge Runtimes',
    category: 'Serverless Platform',
    founded: '2015',
    svg: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
];

// ============================================================================
// LOGO CARD COMPONENT (Strict Black & White Monochrome)
// ============================================================================

function LogoCard({ item, isDark }: { item: EnterpriseLogoItem; isDark: boolean }) {
  const SvgIcon = item.svg;

  return (
    <div
      className={cn(
        'group relative flex shrink-0 cursor-pointer items-center gap-3.5 rounded-2xl border px-5 py-3 transition-all select-none',
        isDark
          ? 'border-neutral-800 bg-neutral-900/90 text-white hover:border-white/40 hover:bg-neutral-800/90 hover:shadow-lg'
          : 'border-[#CAD3F5] bg-white text-[#0A1A4A] shadow-2xs hover:border-[#0056FF] hover:bg-[#EFF5FF]/40 hover:shadow-xs',
      )}
    >
      {/* Monochrome Vector Logo Icon */}
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl p-1.5',
          isDark
            ? 'bg-neutral-800 text-white'
            : 'bg-slate-100 text-slate-900 group-hover:bg-white group-hover:text-black',
        )}
      >
        <SvgIcon className="size-6 shrink-0" />
      </div>

      {/* Brand Identity & Metadata */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'font-sans text-xs font-black tracking-tight',
              isDark ? 'text-white' : 'text-[#0A1A4A]',
            )}
          >
            {item.name}
          </span>
          <span
            className={cn(
              'py-0.2 rounded px-1.5 font-mono text-[9px] font-bold tracking-wider uppercase',
              isDark
                ? 'border border-neutral-700 bg-neutral-800 text-neutral-300'
                : 'border border-[#CAD3F5] bg-[#EFF5FF] text-[#0056FF]',
            )}
          >
            {item.category}
          </span>
        </div>
        <span
          className={cn(
            'line-clamp-1 font-sans text-[11px]',
            isDark ? 'text-neutral-400' : 'text-slate-500',
          )}
        >
          {item.tagline}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// PRIMARY LOGO MARQUEE COMPONENT
// ============================================================================

export interface LogoMarqueeProps {
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  theme?: 'light' | 'dark';
  variant?: 'single' | 'dual';
  className?: string;
}

export function LogoMarquee({
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  theme = 'light',
  variant = 'single',
  className,
}: LogoMarqueeProps) {
  const isDark = theme === 'dark';

  // Animation duration based on speed
  const durationMap = {
    slow: '45s',
    normal: '28s',
    fast: '16s',
  };
  const duration = durationMap[speed];

  // Quadruple items to ensure seamless infinite looping without gaps
  const row1Items = [...REAL_ENTERPRISE_LOGOS, ...REAL_ENTERPRISE_LOGOS, ...REAL_ENTERPRISE_LOGOS];
  // Reversed order for row 2 in dual mode
  const row2Items = [
    ...REAL_ENTERPRISE_LOGOS.slice().reverse(),
    ...REAL_ENTERPRISE_LOGOS.slice().reverse(),
    ...REAL_ENTERPRISE_LOGOS.slice().reverse(),
  ];

  return (
    <div
      role="region"
      aria-label="Technology and Enterprise Ecosystem Partners"
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border py-6 transition-colors',
        isDark
          ? 'border-neutral-800 bg-black text-white'
          : 'border-[#CAD3F5] bg-[#F8FAFD]/60 text-slate-900',
        className,
      )}
    >
      {/* Scoped Keyframe Animations */}
      <style jsx>{`
        @keyframes marquee-drift-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marquee-drift-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .marquee-track-left {
          animation: marquee-drift-left var(--marquee-dur) linear infinite;
        }
        .marquee-track-right {
          animation: marquee-drift-right var(--marquee-dur) linear infinite;
        }
        .marquee-pause:hover .marquee-track-left,
        .marquee-pause:hover .marquee-track-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle Section Stamp */}
      <div className="mb-4 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex size-2 rounded-full',
              isDark ? 'animate-pulse bg-white' : 'animate-pulse bg-[#0056FF]',
            )}
          />
          <span
            className={cn(
              'font-mono text-[10px] font-bold tracking-wider uppercase',
              isDark ? 'text-neutral-400' : 'text-slate-500',
            )}
          >
            Enterprise Ecosystem · Apple + 9 Industry Standards (Monochrome)
          </span>
        </div>

        <span
          className={cn(
            'hidden font-mono text-[10px] sm:inline',
            isDark ? 'text-neutral-500' : 'text-slate-400',
          )}
        >
          {REAL_ENTERPRISE_LOGOS.length} Authentic Partner Logos
        </span>
      </div>

      {/* Outer Marquee Track Container with Gradient Edge Fade Masks */}
      <div
        className={cn('relative flex flex-col gap-3.5', pauseOnHover && 'marquee-pause')}
        style={
          {
            '--marquee-dur': duration,
          } as React.CSSProperties
        }
      >
        {/* Left Edge Fade Mask */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-16 sm:w-28',
            isDark
              ? 'bg-gradient-to-r from-black via-black/80 to-transparent'
              : 'bg-gradient-to-r from-[#F8FAFD] via-[#F8FAFD]/80 to-transparent',
          )}
        />

        {/* Right Edge Fade Mask */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-16 sm:w-28',
            isDark
              ? 'bg-gradient-to-l from-black via-black/80 to-transparent'
              : 'bg-gradient-to-l from-[#F8FAFD] via-[#F8FAFD]/80 to-transparent',
          )}
        />

        {/* Track 1: Primary Stream */}
        <div className="flex overflow-hidden">
          <div
            className={cn(
              'flex shrink-0 items-center gap-3.5 pr-3.5 will-change-transform',
              direction === 'left' ? 'marquee-track-left' : 'marquee-track-right',
            )}
          >
            {row1Items.map((item, idx) => (
              <LogoCard key={`row1-${item.id}-${idx}`} item={item} isDark={isDark} />
            ))}
          </div>
        </div>

        {/* Track 2: Dual Counter-Directional Stream (Optional Archetype) */}
        {variant === 'dual' && (
          <div className="flex overflow-hidden">
            <div
              className={cn(
                'flex shrink-0 items-center gap-3.5 pr-3.5 will-change-transform',
                direction === 'left' ? 'marquee-track-right' : 'marquee-track-left',
              )}
            >
              {row2Items.map((item, idx) => (
                <LogoCard key={`row2-${item.id}-${idx}`} item={item} isDark={isDark} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE DEMO STAGE WITH FULL RUNTIME CONTROLS
// ============================================================================

export function LogoMarqueeDemo() {
  const [speed, setSpeed] = React.useState<'slow' | 'normal' | 'fast'>('normal');
  const [direction, setDirection] = React.useState<'left' | 'right'>('left');
  const [pauseOnHover, setPauseOnHover] = React.useState(true);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [variant, setVariant] = React.useState<'single' | 'dual'>('dual');
  const [copied, setCopied] = React.useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('npx snpi-ui@latest add logo-marquee');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      {/* Action Toolbar with Runtime Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#CAD3F5] bg-white p-3 shadow-2xs sm:px-4 sm:py-3">
        {/* Left: Speed & Direction Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Speed Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-[#EFF5FF] p-1 font-mono text-xs">
            {(['slow', 'normal', 'fast'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeed(s)}
                className={cn(
                  'cursor-pointer rounded-lg px-2.5 py-1 font-bold capitalize transition-all select-none',
                  speed === s
                    ? 'bg-[#0056FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0056FF]',
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Direction Toggle */}
          <button
            type="button"
            onClick={() => setDirection((prev) => (prev === 'left' ? 'right' : 'left'))}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#CAD3F5] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0A1A4A] transition-all select-none hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF] active:scale-95"
          >
            <RotateCw className="size-3.5 text-[#0056FF]" />
            <span>Direction: {direction === 'left' ? 'Left ←' : 'Right →'}</span>
          </button>

          {/* Dual vs Single Row Track */}
          <button
            type="button"
            onClick={() => setVariant((prev) => (prev === 'single' ? 'dual' : 'single'))}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-all select-none',
              variant === 'dual'
                ? 'border-[#0056FF] bg-[#EFF5FF] text-[#0056FF]'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
            )}
          >
            <Layers className="size-3.5" />
            <span>{variant === 'dual' ? 'Dual Track' : 'Single Row'}</span>
          </button>
        </div>

        {/* Right: Theme Toggle & CLI Command */}
        <div className="flex items-center gap-2">
          {/* Clean White vs Obsidian Theme */}
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            className={cn(
              'flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-all select-none',
              theme === 'dark'
                ? 'border-neutral-700 bg-black text-white'
                : 'border-[#CAD3F5] bg-white text-[#0A1A4A] hover:bg-slate-50',
            )}
          >
            <span
              className={cn('size-2 rounded-full', theme === 'dark' ? 'bg-white' : 'bg-black')}
            />
            <span>{theme === 'dark' ? 'Obsidian B&W' : 'Clean White'}</span>
          </button>

          {/* Quick CLI Copy Pill */}
          <button
            type="button"
            onClick={handleCopyCli}
            title="Copy installation CLI command"
            className="hidden cursor-pointer items-center gap-1.5 rounded-xl border border-[#CAD3F5] bg-[#EFF5FF] px-2.5 py-1.5 font-mono text-xs font-bold text-[#0056FF] transition-all hover:bg-[#E3E7FC] active:scale-95 sm:flex"
          >
            {copied ? <Check className="size-3.5 stroke-[2.5]" /> : <Copy className="size-3.5" />}
            <span>{copied ? 'Copied' : 'npx add logo-marquee'}</span>
          </button>
        </div>
      </div>

      {/* Live Marquee Interactive Stage */}
      <LogoMarquee
        speed={speed}
        direction={direction}
        pauseOnHover={pauseOnHover}
        theme={theme}
        variant={variant}
      />
    </div>
  );
}
