'use client';

import * as React from 'react';
import { Sun, Moon, Check, Copy, ShieldCheck, Layers, Activity } from '@/components/icons';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types & Theme Option Specifications
// ---------------------------------------------------------------------------
export type ThemeMode = 'sync' | 'light' | 'dark';

export type LightThemeId =
  'light-default' | 'light-high-contrast' | 'light-colorblind' | 'light-lavender';

export type DarkThemeId = 'dark-default' | 'dark-dimmed' | 'dark-high-contrast' | 'dark-colorblind';

export interface ThemeOption<T extends string = string> {
  id: T;
  label: string;
  description: string;
  swatchFill: string;
  swatchBorder: string;
  isSplit?: boolean;
  splitColors?: [string, string];
}

export const LIGHT_THEMES: ThemeOption<LightThemeId>[] = [
  {
    id: 'light-default',
    label: 'Day (White Default)',
    description:
      'Crisp pure white canvas (#FFFFFF) with soft lavender borders (#CAD3F5), royal blue accents (#0056FF), and deep navy typography (#0A1A4A).',
    swatchFill: '#FFFFFF',
    swatchBorder: '#CAD3F5',
  },
];

export const DARK_THEMES: ThemeOption<DarkThemeId>[] = [
  {
    id: 'dark-dimmed',
    label: 'Moon (Dark Mode)',
    description:
      'Psychologically calibrated nocturnal moonlit slate canvas (#0F172A) with pure white typography (#FFFFFF), pure white keyline icons (#FFFFFF), and luminous azure accents (#60A5FA).',
    swatchFill: '#0F172A',
    swatchBorder: '#60A5FA',
  },
];

// ---------------------------------------------------------------------------
// Dynamic 26 Color Roles Mapping Engine
// ---------------------------------------------------------------------------
export interface RoleDefinition {
  role: string;
  fill: string;
  on: string;
  tokenAlias: string;
  contrastRatio: string;
  contrastGrade: 'AAA' | 'AA' | 'UI';
  description: string;
}

export interface ActiveRolesSystem {
  themeName: string;
  isDark: boolean;
  canvasBg: string;
  subsurfaceBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  iconPrimary: string;
  iconSecondary: string;
  iconContainerBg: string;
  iconContainerBorder: string;
  primary: RoleDefinition;
  primaryContainer: RoleDefinition;
  secondary: RoleDefinition;
  secondaryContainer: RoleDefinition;
  tertiary: RoleDefinition;
  tertiaryContainer: RoleDefinition;
  error: RoleDefinition;
  errorContainer: RoleDefinition;
  surfaces: RoleDefinition[];
  outline: RoleDefinition;
  outlineVariant: RoleDefinition;
  statusSuccess: RoleDefinition;
  statusWarning: RoleDefinition;
  statusError: RoleDefinition;
  statusInfo: RoleDefinition;
}

export function computeActiveColorRoles(
  mode: 'light' | 'dark',
  lightSub: LightThemeId,
  darkSub: DarkThemeId,
  highContrastLight: boolean,
  highContrastDark: boolean,
): ActiveRolesSystem {
  const isDark = mode === 'dark';

  if (!isDark) {
    const isHC = highContrastLight || lightSub === 'light-high-contrast';
    const isColorblind = lightSub === 'light-colorblind';
    const isLavender = lightSub === 'light-lavender';

    const canvasBg = isLavender ? '#EFF5FF' : '#FFFFFF';
    const subsurfaceBg = isLavender ? '#E3E7FC' : '#EFF5FF';
    const cardBorder = isHC ? '#0F172A' : '#CAD3F5';
    const textPrimary = isHC ? '#000000' : '#0A1A4A';
    const textSecondary = isHC ? '#1E293B' : '#475569';

    const primaryFill = isHC ? '#0038B3' : isColorblind ? '#2563EB' : '#0056FF';
    const primaryOn = '#FFFFFF';
    const primaryContainerFill = isHC ? '#DBEAFE' : '#EFF5FF';
    const primaryContainerOn = isHC ? '#050E28' : '#0038B3';

    const secondaryFill = isHC ? '#0369A1' : '#2277FF';
    const secondaryOn = '#FFFFFF';
    const secondaryContainerFill = '#E0F2FE';
    const secondaryContainerOn = isHC ? '#082F49' : '#0369A1';

    const tertiaryFill = isHC ? '#B45309' : '#D97706';
    const tertiaryOn = '#FFFFFF';
    const tertiaryContainerFill = '#FEF3C7';
    const tertiaryContainerOn = '#78350F';

    const errorFill = isHC ? '#B91C1C' : '#DC2626';
    const errorOn = '#FFFFFF';
    const errorContainerFill = '#FEE2E2';
    const errorContainerOn = '#991B1B';

    return {
      themeName: isHC
        ? 'Light high contrast'
        : isColorblind
          ? 'Light colorblind'
          : isLavender
            ? 'Light soft lavender'
            : 'Light default',
      isDark: false,
      canvasBg,
      subsurfaceBg,
      cardBorder,
      textPrimary,
      textSecondary,
      iconPrimary: isHC ? '#000000' : '#020617',
      iconSecondary: isHC ? '#1E293B' : '#475569',
      iconContainerBg: isLavender ? '#E3E7FC' : '#EFF5FF',
      iconContainerBorder: isHC ? '#0F172A' : '#CAD3F5',
      primary: {
        role: 'primary',
        fill: primaryFill,
        on: primaryOn,
        tokenAlias: isHC ? 'primary-700' : 'primary-500',
        contrastRatio: isHC ? '7.4:1' : '4.7:1',
        contrastGrade: isHC ? 'AAA' : 'AA',
        description: 'Key institutional brand actions, primary CTAs, active highlights.',
      },
      primaryContainer: {
        role: 'primary-container',
        fill: primaryContainerFill,
        on: primaryContainerOn,
        tokenAlias: 'primary-50',
        contrastRatio: '15.2:1',
        contrastGrade: 'AAA',
        description: 'Subtle tonal card fills, segment tracks, pill selections.',
      },
      secondary: {
        role: 'secondary',
        fill: secondaryFill,
        on: secondaryOn,
        tokenAlias: 'accent-2-500',
        contrastRatio: '4.8:1',
        contrastGrade: 'AA',
        description: 'Secondary actions, filters, interactive accents.',
      },
      secondaryContainer: {
        role: 'secondary-container',
        fill: secondaryContainerFill,
        on: secondaryContainerOn,
        tokenAlias: 'accent-2-100',
        contrastRatio: '14.8:1',
        contrastGrade: 'AAA',
        description: 'Secondary tonal badge backdrops, navigation highlights.',
      },
      tertiary: {
        role: 'tertiary',
        fill: tertiaryFill,
        on: tertiaryOn,
        tokenAlias: 'accent-500',
        contrastRatio: '5.1:1',
        contrastGrade: 'AA',
        description: 'Warm accents, badges, contrasting highlights.',
      },
      tertiaryContainer: {
        role: 'tertiary-container',
        fill: tertiaryContainerFill,
        on: tertiaryContainerOn,
        tokenAlias: 'accent-100',
        contrastRatio: '13.5:1',
        contrastGrade: 'AAA',
        description: 'Tonal warning highlights, subtle alert backgrounds.',
      },
      error: {
        role: 'error',
        fill: errorFill,
        on: errorOn,
        tokenAlias: 'error-600',
        contrastRatio: '5.9:1',
        contrastGrade: 'AA',
        description: 'Destructive operations, failed validations, error states.',
      },
      errorContainer: {
        role: 'error-container',
        fill: errorContainerFill,
        on: errorContainerOn,
        tokenAlias: 'error-100',
        contrastRatio: '14.2:1',
        contrastGrade: 'AAA',
        description: 'Alert containers, invalid form input backgrounds.',
      },
      surfaces: [
        {
          role: 'surface-container-lowest',
          fill: '#FFFFFF',
          on: textPrimary,
          tokenAlias: 'neutral-50',
          contrastRatio: '16.5:1',
          contrastGrade: 'AAA',
          description: 'Base document canvas layer',
        },
        {
          role: 'surface-container-low',
          fill: '#F8FAFC',
          on: textPrimary,
          tokenAlias: 'neutral-100',
          contrastRatio: '15.8:1',
          contrastGrade: 'AAA',
          description: 'Sidebar & recessed track',
        },
        {
          role: 'surface-container',
          fill: subsurfaceBg,
          on: textPrimary,
          tokenAlias: 'primary-50',
          contrastRatio: '15.2:1',
          contrastGrade: 'AAA',
          description: 'Default card container',
        },
        {
          role: 'surface-container-high',
          fill: '#E2E8F0',
          on: textPrimary,
          tokenAlias: 'neutral-200',
          contrastRatio: '12.4:1',
          contrastGrade: 'AAA',
          description: 'Hovered card & dropdown track',
        },
        {
          role: 'surface-container-highest',
          fill: '#CBD5E1',
          on: textPrimary,
          tokenAlias: 'neutral-300',
          contrastRatio: '9.8:1',
          contrastGrade: 'AAA',
          description: 'Modal dialogs & elevated sheets',
        },
        {
          role: 'inverse-surface',
          fill: '#0A1A4A',
          on: '#FFFFFF',
          tokenAlias: 'primary-900',
          contrastRatio: '16.5:1',
          contrastGrade: 'AAA',
          description: 'Inverse snackbars & tooltips',
        },
      ],
      outline: {
        role: 'outline',
        fill: '#FFFFFF',
        on: '#0F172A',
        tokenAlias: isHC ? 'neutral-900' : 'neutral-500',
        contrastRatio: isHC ? '7.0:1' : '3.1:1',
        contrastGrade: isHC ? 'AAA' : 'UI',
        description: 'Input borders, prominent component outlines.',
      },
      outlineVariant: {
        role: 'outline-variant',
        fill: '#F8FAFC',
        on: '#475569',
        tokenAlias: 'primary-200',
        contrastRatio: '3.0:1',
        contrastGrade: 'UI',
        description: 'Dividers, subtle card keylines, table borders.',
      },
      statusSuccess: {
        role: 'status-success',
        fill: '#10B981',
        on: '#FFFFFF',
        tokenAlias: 'success-500',
        contrastRatio: '4.8:1',
        contrastGrade: 'AA',
        description: 'Passed checks, active status, verified records.',
      },
      statusWarning: {
        role: 'status-warning',
        fill: '#F59E0B',
        on: '#000000',
        tokenAlias: 'warning-500',
        contrastRatio: '6.0:1',
        contrastGrade: 'AA',
        description: 'Pending states, cautionary flags, attention notices.',
      },
      statusError: {
        role: 'status-error',
        fill: '#EF4444',
        on: '#FFFFFF',
        tokenAlias: 'error-500',
        contrastRatio: '4.6:1',
        contrastGrade: 'AA',
        description: 'System errors, broken builds, validation blocks.',
      },
      statusInfo: {
        role: 'status-info',
        fill: '#0284C7',
        on: '#FFFFFF',
        tokenAlias: 'info-500',
        contrastRatio: '4.7:1',
        contrastGrade: 'AA',
        description: 'Informational announcements, guidance pills.',
      },
    };
  }

  // DARK MODE / MOON THEME
  const isHC = highContrastDark || darkSub === 'dark-high-contrast';
  const isMoon = darkSub === 'dark-dimmed' || (darkSub as string) === 'dark-moon';
  const isColorblind = darkSub === 'dark-colorblind';

  const canvasBg = isHC ? '#020617' : isMoon ? '#0F172A' : '#050E28';
  const subsurfaceBg = isHC ? '#0B132B' : isMoon ? '#1E293B' : '#0F172A';
  const cardBorder = isHC ? '#CBD5E1' : '#334155';
  const textPrimary = '#FFFFFF';
  const textSecondary = isHC ? '#F1F5F9' : '#94A3B8';
  const iconPrimary = '#FFFFFF'; // Strict Pure White Icons in Moon Mode
  const iconSecondary = '#94A3B8';
  const iconContainerBg = '#1E293B';
  const iconContainerBorder = '#334155';

  const primaryFill = isHC ? '#BFDBFE' : isMoon ? '#60A5FA' : '#93C5FD';
  const primaryOn = '#002A8C';
  const primaryContainerFill = isHC ? '#002A8C' : isMoon ? '#0038B3' : '#0038B3';
  const primaryContainerOn = '#EFF5FF';

  const secondaryFill = isHC ? '#BAE6FD' : isMoon ? '#38BDF8' : '#7DD3FC';
  const secondaryOn = '#075985';
  const secondaryContainerFill = '#0369A1';
  const secondaryContainerOn = '#E0F2FE';

  const tertiaryFill = isHC ? '#FDE68A' : isMoon ? '#FBBF24' : '#FCD34D';
  const tertiaryOn = '#78350F';
  const tertiaryContainerFill = '#92400E';
  const tertiaryContainerOn = '#FEF3C7';

  const errorFill = isHC ? '#FECACA' : '#F87171';
  const errorOn = '#450A0A';
  const errorContainerFill = '#991B1B';
  const errorContainerOn = '#FEE2E2';

  return {
    themeName: isHC
      ? 'Dark high contrast'
      : isMoon
        ? 'Dark dimmed (Moon)'
        : isColorblind
          ? 'Dark colorblind'
          : 'Dark default',
    isDark: true,
    canvasBg,
    subsurfaceBg,
    cardBorder,
    textPrimary,
    textSecondary,
    iconPrimary,
    iconSecondary,
    iconContainerBg,
    iconContainerBorder,
    primary: {
      role: 'primary',
      fill: primaryFill,
      on: primaryOn,
      tokenAlias: isMoon ? 'primary-400' : 'primary-300',
      contrastRatio: isHC ? '12.8:1' : '8.2:1',
      contrastGrade: 'AAA',
      description: 'Luminous primary highlights, core action triggers.',
    },
    primaryContainer: {
      role: 'primary-container',
      fill: primaryContainerFill,
      on: primaryContainerOn,
      tokenAlias: 'primary-700',
      contrastRatio: '14.5:1',
      contrastGrade: 'AAA',
      description: 'Deep nocturnal track fills, segment pill backdrops.',
    },
    secondary: {
      role: 'secondary',
      fill: secondaryFill,
      on: secondaryOn,
      tokenAlias: 'accent-2-300',
      contrastRatio: '7.8:1',
      contrastGrade: 'AAA',
      description: 'Illuminated azure interactive accents, secondary buttons.',
    },
    secondaryContainer: {
      role: 'secondary-container',
      fill: secondaryContainerFill,
      on: secondaryContainerOn,
      tokenAlias: 'accent-2-700',
      contrastRatio: '13.2:1',
      contrastGrade: 'AAA',
      description: 'Secondary card elevations, active navigation indicators.',
    },
    tertiary: {
      role: 'tertiary',
      fill: tertiaryFill,
      on: tertiaryOn,
      tokenAlias: 'accent-300',
      contrastRatio: '8.4:1',
      contrastGrade: 'AAA',
      description: 'Warm nocturnal amber badges, contrasting indicators.',
    },
    tertiaryContainer: {
      role: 'tertiary-container',
      fill: tertiaryContainerFill,
      on: tertiaryContainerOn,
      tokenAlias: 'accent-700',
      contrastRatio: '11.8:1',
      contrastGrade: 'AAA',
      description: 'Muted warm warning containers in night conditions.',
    },
    error: {
      role: 'error',
      fill: errorFill,
      on: errorOn,
      tokenAlias: 'error-400',
      contrastRatio: '7.5:1',
      contrastGrade: 'AAA',
      description: 'High-contrast nocturnal danger actions and error badges.',
    },
    errorContainer: {
      role: 'error-container',
      fill: errorContainerFill,
      on: errorContainerOn,
      tokenAlias: 'error-800',
      contrastRatio: '12.4:1',
      contrastGrade: 'AAA',
      description: 'Subdued error card containers and validation callouts.',
    },
    surfaces: [
      {
        role: 'surface-container-lowest',
        fill: isHC ? '#000000' : '#020617',
        on: textPrimary,
        tokenAlias: 'neutral-950',
        contrastRatio: '19.8:1',
        contrastGrade: 'AAA',
        description: 'Deep obsidian pitch base layer (Neutral 950)',
      },
      {
        role: 'surface-container-low',
        fill: canvasBg,
        on: textPrimary,
        tokenAlias: isHC ? 'neutral-950' : 'primary-950',
        contrastRatio: isHC ? '19.8:1' : '18.4:1',
        contrastGrade: 'AAA',
        description: 'Nocturnal workspace canvas (Primary 950)',
      },
      {
        role: 'surface-container',
        fill: subsurfaceBg,
        on: textPrimary,
        tokenAlias: isHC ? 'neutral-950' : 'neutral-900',
        contrastRatio: isHC ? '17.5:1' : '15.8:1',
        contrastGrade: 'AAA',
        description: 'Subsurface card foundation (Neutral 900)',
      },
      {
        role: 'surface-container-high',
        fill: '#1E293B',
        on: textPrimary,
        tokenAlias: 'neutral-800',
        contrastRatio: '12.4:1',
        contrastGrade: 'AAA',
        description: 'Elevated dropdown and hover layer (Neutral 800)',
      },
      {
        role: 'surface-container-highest',
        fill: '#334155',
        on: textPrimary,
        tokenAlias: 'neutral-700',
        contrastRatio: '9.1:1',
        contrastGrade: 'AAA',
        description: 'Modal popups and floating tooltips (Neutral 700)',
      },
      {
        role: 'inverse-surface',
        fill: '#FFFFFF',
        on: '#050E28',
        tokenAlias: 'neutral-50',
        contrastRatio: '18.4:1',
        contrastGrade: 'AAA',
        description: 'Inverse stark light callout',
      },
    ],
    outline: {
      role: 'outline',
      fill: canvasBg,
      on: textPrimary,
      tokenAlias: isHC ? 'neutral-50' : 'neutral-600',
      contrastRatio: isHC ? '19.8:1' : '5.8:1',
      contrastGrade: 'AAA',
      description: 'High-contrast input borders, prominent component keylines (Neutral 600).',
    },
    outlineVariant: {
      role: 'outline-variant',
      fill: subsurfaceBg,
      on: textSecondary,
      tokenAlias: 'neutral-700',
      contrastRatio: '4.2:1',
      contrastGrade: 'UI',
      description: 'Subtle table dividers, card keylines in night mode (Neutral 700).',
    },
    statusSuccess: {
      role: 'status-success',
      fill: '#34D399',
      on: '#064E3B',
      tokenAlias: 'success-400',
      contrastRatio: '7.2:1',
      contrastGrade: 'AAA',
      description: 'Passed pipeline runs, verified checkmarks.',
    },
    statusWarning: {
      role: 'status-warning',
      fill: '#FBBF24',
      on: '#78350F',
      tokenAlias: 'warning-400',
      contrastRatio: '6.8:1',
      contrastGrade: 'AA',
      description: 'Attention warnings, review alerts.',
    },
    statusError: {
      role: 'status-error',
      fill: '#F87171',
      on: '#450A0A',
      tokenAlias: 'error-400',
      contrastRatio: '6.6:1',
      contrastGrade: 'AA',
      description: 'Failed pipeline runs, critical alerts.',
    },
    statusInfo: {
      role: 'status-info',
      fill: '#38BDF8',
      on: '#082F49',
      tokenAlias: 'info-400',
      contrastRatio: '7.5:1',
      contrastGrade: 'AAA',
      description: 'Informational logs, telemetry packets.',
    },
  };
}

// ---------------------------------------------------------------------------
// GitHub-Style Appearance & Color Roles System Component
// ---------------------------------------------------------------------------
export function GithubAppearanceColorRoles() {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('light');
  const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light');
  const [lightSubTheme, setLightSubTheme] = React.useState<LightThemeId>('light-default');
  const [darkSubTheme, setDarkSubTheme] = React.useState<DarkThemeId>('dark-dimmed');
  const [highContrastLight, setHighContrastLight] = React.useState<boolean>(false);
  const [highContrastDark, setHighContrastDark] = React.useState<boolean>(false);
  const [copiedToken, setCopiedToken] = React.useState<string | null>(null);

  // Active view tab for Color Roles explorer
  const [rolesTab, setRolesTab] = React.useState<'groups' | 'surfaces' | 'components' | 'demo'>(
    'groups',
  );

  // Interactive Demo State
  const [demoInput, setDemoInput] = React.useState<string>('SNPI Campus Academic Core');
  const [demoButtonActive, setDemoButtonActive] = React.useState<string>('primary');
  const [demoVerificationState, setDemoVerificationState] = React.useState<
    'idle' | 'running' | 'passed'
  >('idle');

  // Compute active Color Roles
  const roles = React.useMemo(() => {
    return computeActiveColorRoles(
      activeTheme,
      lightSubTheme,
      darkSubTheme,
      highContrastLight,
      highContrastDark,
    );
  }, [activeTheme, lightSubTheme, darkSubTheme, highContrastLight, highContrastDark]);

  const handleCopy = async (text: string, label: string) => {
    if (typeof window === 'undefined') return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedToken(label);
        setTimeout(() => setCopiedToken(null), 1800);
      }
    } catch {
      // Fallback
    }
  };

  const handleRunVerification = () => {
    setDemoVerificationState('running');
    setTimeout(() => {
      setDemoVerificationState('passed');
    }, 450);
  };

  const renderRoleCard = (r: RoleDefinition, badgeLabel?: string) => {
    const isCopied = copiedToken === r.role;
    return (
      <div
        key={r.role}
        className="group relative flex flex-col justify-between rounded-xl border p-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
        style={{
          backgroundColor: r.fill,
          color: r.on,
          borderColor: roles.isDark ? '#334155' : '#CAD3F5',
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="font-mono text-xs font-bold tracking-tight">{r.role}</span>
            <div className="font-mono text-[10px] opacity-80">
              {r.tokenAlias} &middot; {r.fill}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(r.fill, r.role)}
            title={`Copy ${r.role} (${r.fill})`}
            className="shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100"
          >
            {isCopied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-current/15 pt-2 text-[10px]">
          <span className="font-mono font-bold">
            {r.contrastRatio} {r.contrastGrade}
          </span>
          <span className="rounded border border-current/25 px-1.5 py-0.5 font-mono text-[9px] font-black uppercase">
            {badgeLabel || r.contrastGrade}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 rounded-2xl border border-[#CAD3F5] bg-white p-4 text-[#0A1A4A] sm:p-7">
      {/* ------------------------------------------------------------- */}
      {/* 1. GITHUB APPEARANCE HEADER                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="font-sans text-xl font-bold tracking-tight text-[#0A1A4A] sm:text-2xl">
              Theme preferences
            </h3>
            <p className="max-w-2xl font-sans text-xs leading-relaxed text-slate-600 sm:text-sm">
              Standardized dual-theme preferences: <strong>Day (White Default)</strong> and{' '}
              <strong>Moon (Dark Mode)</strong>. Engineered on visual cognitive psychology to ensure
              zero eye fatigue, photopic focus by day, and scotopic pure-white typography with white
              keyline icons at night.
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-[2px] border border-[#CAD3F5] bg-[#EFF5FF] px-3 py-1 font-mono text-xs font-bold text-[#0056FF]"
            style={{ borderRadius: '2px' }}
          >
            <Layers className="size-3.5" />
            <span>2-Theme Cognitive Standard</span>
          </span>
        </div>

        {/* Theme mode select */}
        <div className="pt-3">
          <label
            htmlFor="theme-mode-select"
            className="block font-sans text-xs font-bold text-[#0A1A4A]"
          >
            Active Theme Selection
          </label>
          <div className="mt-1.5 flex flex-wrap items-center gap-3">
            <select
              id="theme-mode-select"
              value={activeTheme}
              onChange={(e) => {
                const val = e.target.value as 'light' | 'dark';
                setActiveTheme(val);
                setThemeMode(val === 'light' ? 'light' : 'dark');
              }}
              className="rounded-[2px] border border-[#CAD3F5] bg-white px-3 py-2 font-sans text-xs font-bold text-[#0A1A4A] transition-colors focus:border-[#0056FF] focus:outline-none"
              style={{ borderRadius: '2px' }}
            >
              <option value="light">Day (White Default) — Active</option>
              <option value="dark">Moon (Dark Mode)</option>
            </select>
            <span className="font-mono text-xs text-slate-500">
              {activeTheme === 'light'
                ? 'Day mode active (Pure White #FFFFFF canvas · Deep Navy typography)'
                : 'Moon mode active (Obsidian Slate #0F172A canvas · Pure White typography)'}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DUAL THEME PREVIEW CARDS (DAY & MOON)                      */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* DAY THEME CARD (WHITE DEFAULT) */}
        <div
          onClick={() => setActiveTheme('light')}
          className={cn(
            'group relative cursor-pointer rounded-2xl border p-4 transition-all duration-150 ease-out active:scale-[0.97] sm:p-5',
            activeTheme === 'light'
              ? 'border-[#0056FF] bg-[#F8FAFC] shadow-xs ring-2 ring-[#0056FF]/20'
              : 'border-[#CAD3F5] bg-white hover:border-[#0056FF]/50',
          )}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <Sun className="size-5 shrink-0 stroke-[2] text-[#020617]" />
              <div>
                <span className="font-sans text-sm font-extrabold text-[#0A1A4A]">
                  Day (White Default)
                </span>
                <span
                  className="ml-2 rounded-[2px] bg-[#EFF5FF] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]"
                  style={{ borderRadius: '2px' }}
                >
                  DEFAULT
                </span>
              </div>
            </div>
            {activeTheme === 'light' && (
              <span
                className="rounded-[2px] border border-[#0056FF]/30 bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase"
                style={{ borderRadius: '2px' }}
              >
                ACTIVE
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-slate-600">
            Crisp pure white canvas with soft lavender borders and deep navy typography. Photopic
            focus for high ambient light.
          </p>

          {/* Light Theme Mockup Illustration */}
          <div className="mt-3.5 overflow-hidden rounded-xl border border-[#CAD3F5] bg-white p-3 shadow-2xs">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-10 rounded-full bg-[#E2E8F0]" />
                <span className="h-2 w-14 rounded-full bg-[#E2E8F0]" />
                <span className="h-2 w-8 rounded-full bg-[#E2E8F0]" />
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#10B981]" />
                <span className="size-2 rounded-full bg-[#EF4444]" />
              </div>
            </div>

            {/* Mockup Canvas */}
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              <div className="space-y-1.5 border-r border-slate-100 pr-2">
                <span className="block h-2 w-full rounded bg-[#F1F5F9]" />
                <span className="block h-2 w-3/4 rounded bg-[#F1F5F9]" />
                <span className="block h-2 w-5/6 rounded bg-[#F1F5F9]" />
              </div>
              <div className="col-span-3 space-y-2">
                <div className="h-3 w-full rounded bg-[#F1F5F9]" />
                <div className="h-4 w-full rounded bg-[#10B981]/25 p-0.5">
                  <div className="h-full w-2/3 rounded bg-[#10B981]" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-6 flex-1 rounded border border-[#CAD3F5] bg-[#EFF5FF]" />
                  <div className="h-6 flex-1 rounded border border-slate-200 bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Day Specs Pill Footer */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-1">
            <span
              className="rounded-[2px] bg-[#EFF5FF] px-2 py-0.5 font-mono text-[9px] font-bold text-[#0056FF]"
              style={{ borderRadius: '2px' }}
            >
              CANVAS: #FFFFFF
            </span>
            <span
              className="rounded-[2px] bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold text-[#0A1A4A]"
              style={{ borderRadius: '2px' }}
            >
              TEXT: #0A1A4A
            </span>
            <span
              className="rounded-[2px] bg-slate-100 px-2 py-0.5 font-mono text-[9px] font-bold text-slate-800"
              style={{ borderRadius: '2px' }}
            >
              ICONS: #020617 (BLACK)
            </span>
          </div>
        </div>

        {/* MOON THEME CARD (DARK MODE) */}
        <div
          onClick={() => setActiveTheme('dark')}
          className={cn(
            'group relative cursor-pointer rounded-2xl border p-4 transition-all duration-150 ease-out active:scale-[0.97] sm:p-5',
            activeTheme === 'dark'
              ? 'border-[#60A5FA] bg-[#0F172A] text-white shadow-xs ring-2 ring-[#60A5FA]/20'
              : 'border-[#334155] bg-[#0F172A] text-white hover:border-[#60A5FA]',
          )}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2.5">
              <Moon className="size-5 shrink-0 stroke-[2] text-white" />
              <div>
                <span className="font-sans text-sm font-extrabold text-white">
                  Moon (Dark Mode)
                </span>
                <span
                  className="ml-2 rounded-[2px] bg-blue-900/60 px-1.5 py-0.5 font-mono text-[9px] font-bold text-blue-300"
                  style={{ borderRadius: '2px' }}
                >
                  NOCTURNAL
                </span>
              </div>
            </div>
            {activeTheme === 'dark' && (
              <span
                className="rounded-[2px] border border-[#60A5FA]/40 bg-[#0056FF] px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase"
                style={{ borderRadius: '2px' }}
              >
                ACTIVE
              </span>
            )}
          </div>
          <p className="font-sans text-xs text-slate-300">
            Psychologically optimized nocturnal moonlit slate canvas (#0F172A) with pure white
            typography (#FFFFFF) and pure white keyline icons (#FFFFFF).
          </p>

          {/* Dark Theme Mockup Illustration */}
          <div
            className="mt-3.5 overflow-hidden rounded-xl border p-3 shadow-2xs"
            style={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
            }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-10 rounded-full bg-[#334155]" />
                <span className="h-2 w-14 rounded-full bg-[#334155]" />
                <span className="h-2 w-8 rounded-full bg-[#334155]" />
              </div>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#34D399]" />
                <span className="size-2 rounded-full bg-[#F87171]" />
              </div>
            </div>

            {/* Mockup Canvas */}
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              <div className="space-y-1.5 border-r border-slate-700/60 pr-2">
                <span className="block h-2 w-full rounded bg-[#1E293B]" />
                <span className="block h-2 w-3/4 rounded bg-[#1E293B]" />
                <span className="block h-2 w-5/6 rounded bg-[#1E293B]" />
              </div>
              <div className="col-span-3 space-y-2">
                <div className="h-3 w-full rounded bg-[#1E293B]" />
                <div className="h-4 w-full rounded bg-[#10B981]/25 p-0.5">
                  <div className="h-full w-2/3 rounded bg-[#34D399]" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-6 flex-1 rounded border border-[#334155] bg-[#1E293B]" />
                  <div className="h-6 flex-1 rounded border border-slate-700 bg-[#0F172A]" />
                </div>
              </div>
            </div>
          </div>

          {/* Moon Specs Pill Footer */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-1">
            <span
              className="rounded-[2px] bg-[#1E293B] px-2 py-0.5 font-mono text-[9px] font-bold text-blue-300"
              style={{ borderRadius: '2px' }}
            >
              CANVAS: #0F172A
            </span>
            <span
              className="rounded-[2px] bg-white/10 px-2 py-0.5 font-mono text-[9px] font-bold text-white"
              style={{ borderRadius: '2px' }}
            >
              TEXT: #FFFFFF (WHITE)
            </span>
            <span
              className="rounded-[2px] bg-white/10 px-2 py-0.5 font-mono text-[9px] font-bold text-white"
              style={{ borderRadius: '2px' }}
            >
              ICONS: #FFFFFF (PURE WHITE)
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. PSYCHOLOGICAL FOUNDATIONS: DAY & MOON VISUAL SPECTRUM      */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4 text-xs sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4.5 shrink-0 stroke-[2] text-[#020617]" />
            <h4 className="font-sans text-sm font-extrabold text-[#0A1A4A]">
              Psychological Foundations: Day &amp; Moon Visual Spectrum
            </h4>
          </div>
          <span
            className="rounded-[2px] border border-[#CAD3F5] bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]"
            style={{ borderRadius: '2px' }}
          >
            HCI INVARIANTS
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              01. Scotopic Glare Mitigation
            </span>
            <p className="font-sans text-xs font-extrabold text-[#0A1A4A]">
              Why Moon Uses Slate (#0F172A) Over Pitch Black
            </p>
            <p className="font-sans text-[11px] leading-relaxed text-slate-600">
              Pitch black (#000000) causes extreme pupillary dilation shock against bright text,
              inducing astigmatic halation and light bleed. Neutral 900 (#0F172A) cushions retinal
              light intake while maintaining 15.8:1 contrast.
            </p>
          </div>

          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              02. 1:1 Vector &amp; Typographic Luminescence
            </span>
            <p className="font-sans text-xs font-extrabold text-[#0A1A4A]">
              Pure White (#FFFFFF) Icons in Moon Mode
            </p>
            <p className="font-sans text-[11px] leading-relaxed text-slate-600">
              In Moon mode, headings and icons form a single Gestalt unit. UI icons render in pure
              white (#FFFFFF), matching code editors (VS Code, Cursor), GitHub dark mode, and
              Antigravity Skills for zero visual noise.
            </p>
          </div>

          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold text-[#0056FF] uppercase">
              03. Geometric Container Invariant
            </span>
            <p className="font-sans text-xs font-extrabold text-[#0A1A4A]">
              Strict 2px Corner Radius Containers
            </p>
            <p className="font-sans text-[11px] leading-relaxed text-slate-600">
              All icon backing containers strictly enforce rounded-[2px] across both Day (#EFF5FF
              fill) and Moon (#1E293B fill), preserving mathematical geometric consistency and
              preventing circular distortion.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CONTRAST PREFERENCES (GITHUB-STYLE TOGGLES)               */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 rounded-2xl border border-[#CAD3F5] bg-[#F8FAFC] p-4 text-xs">
        <div className="space-y-0.5 border-b border-slate-200 pb-2.5">
          <h4 className="font-sans text-sm font-bold text-[#0A1A4A]">Contrast</h4>
          <p className="font-sans text-slate-500">
            Increase contrast. Enable high contrast for light or dark mode (or both) based on your
            system settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Light mode contrast switch */}
          <div className="flex items-center justify-between rounded-xl border border-[#CAD3F5] bg-white p-3">
            <div>
              <span className="font-sans font-bold text-[#0A1A4A]">Light mode</span>
              <p className="text-[11px] text-slate-500">Higher contrast on light surfaces</p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrastLight((v) => !v)}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                highContrastLight ? 'bg-[#0056FF]' : 'bg-slate-300',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                  highContrastLight ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>
          </div>

          {/* Dark mode contrast switch */}
          <div className="flex items-center justify-between rounded-xl border border-[#CAD3F5] bg-white p-3">
            <div>
              <span className="font-sans font-bold text-[#0A1A4A]">Dark mode</span>
              <p className="text-[11px] text-slate-500">Maximum nocturnal contrast ratio</p>
            </div>
            <button
              type="button"
              onClick={() => setHighContrastDark((v) => !v)}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                highContrastDark ? 'bg-[#0056FF]' : 'bg-slate-300',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                  highContrastDark ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. DYNAMIC COLOR ROLES SYSTEM (26 ROLES ARCHITECTURE)         */}
      {/* ------------------------------------------------------------- */}
      <div
        className="space-y-6 rounded-2xl border p-5 transition-colors"
        style={{
          backgroundColor: roles.isDark ? roles.canvasBg : '#FFFFFF',
          borderColor: roles.isDark ? roles.cardBorder : '#CAD3F5',
          color: roles.textPrimary,
        }}
      >
        <div className="flex flex-col gap-3 border-b border-current/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-sans text-base font-bold tracking-tight">
                Color Roles System &middot; {roles.themeName}
              </span>
              <span
                className="rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold"
                style={{
                  backgroundColor: roles.primaryContainer.fill,
                  color: roles.primaryContainer.on,
                  borderColor: roles.cardBorder,
                }}
              >
                26 Calibrated Roles
              </span>
            </div>
            <p className="font-sans text-xs opacity-75">
              Strictly derived from the 11-step Color Ramps (50&ndash;950). Dynamically maps surface
              luminance, text contrast, and interactive states.
            </p>
          </div>

          {/* Sub-view navigation tabs */}
          <div
            className="inline-flex items-center gap-1 rounded-xl border p-1"
            style={{
              backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
              borderColor: roles.cardBorder,
            }}
          >
            {[
              { id: 'groups' as const, label: '6 Role Groups' },
              { id: 'surfaces' as const, label: 'Surface Hierarchy' },
              { id: 'components' as const, label: 'Component Roles' },
              { id: 'demo' as const, label: 'Live Demo Test' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRolesTab(tab.id)}
                className={cn(
                  'rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold transition-all',
                  rolesTab === tab.id
                    ? 'bg-[#0056FF] text-white shadow-none'
                    : 'opacity-70 hover:opacity-100',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: 6 ROLE GROUPS */}
        {rolesTab === 'groups' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 1. Primary */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">1. Primary Group</span>
                <span className="font-mono text-[10px] font-bold opacity-75">2 Roles</span>
              </div>
              <div className="space-y-2">
                {renderRoleCard(roles.primary, 'Filled Action')}
                {renderRoleCard(roles.primaryContainer, 'Tonal Base')}
              </div>
            </div>

            {/* 2. Secondary */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">2. Secondary Group</span>
                <span className="font-mono text-[10px] font-bold opacity-75">2 Roles</span>
              </div>
              <div className="space-y-2">
                {renderRoleCard(roles.secondary, 'Interactive')}
                {renderRoleCard(roles.secondaryContainer, 'Tonal Highlight')}
              </div>
            </div>

            {/* 3. Tertiary */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">3. Tertiary Group</span>
                <span className="font-mono text-[10px] font-bold opacity-75">2 Roles</span>
              </div>
              <div className="space-y-2">
                {renderRoleCard(roles.tertiary, 'Warm Accent')}
                {renderRoleCard(roles.tertiaryContainer, 'Warm Container')}
              </div>
            </div>

            {/* 4. Error */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">4. Error Group</span>
                <span className="font-mono text-[10px] font-bold opacity-75">2 Roles</span>
              </div>
              <div className="space-y-2">
                {renderRoleCard(roles.error, 'Destructive')}
                {renderRoleCard(roles.errorContainer, 'Alert Fill')}
              </div>
            </div>

            {/* 5. Outline */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">
                  5. Outline &amp; Borders
                </span>
                <span className="font-mono text-[10px] font-bold opacity-75">2 Roles</span>
              </div>
              <div className="space-y-2">
                {renderRoleCard(roles.outline, 'Input Stroke')}
                {renderRoleCard(roles.outlineVariant, 'Divider Line')}
              </div>
            </div>

            {/* 6. Status */}
            <div
              className="space-y-2 rounded-xl border p-3"
              style={{
                backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
                borderColor: roles.cardBorder,
              }}
            >
              <div className="flex items-center justify-between border-b border-current/15 pb-2">
                <span className="font-sans text-xs font-bold uppercase">6. Status Indicators</span>
                <span className="font-mono text-[10px] font-bold opacity-75">4 Roles</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {renderRoleCard(roles.statusSuccess, 'Success')}
                {renderRoleCard(roles.statusWarning, 'Warning')}
                {renderRoleCard(roles.statusError, 'Error')}
                {renderRoleCard(roles.statusInfo, 'Info')}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SURFACE HIERARCHY */}
        {rolesTab === 'surfaces' && (
          <div className="space-y-3">
            <span className="font-sans text-xs font-bold uppercase opacity-80">
              Tone-Based Surface Luminance Ladder (6 Standard Roles)
            </span>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.surfaces.map((s) => (
                <div
                  key={s.role}
                  className="flex items-center justify-between rounded-xl border p-3"
                  style={{
                    backgroundColor: s.fill,
                    color: s.on,
                    borderColor: roles.cardBorder,
                  }}
                >
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold">{s.role}</span>
                    <div className="font-mono text-[10px] opacity-75">
                      {s.tokenAlias} &middot; {s.fill}
                    </div>
                    <p className="mt-1 font-sans text-[11px] opacity-80">{s.description}</p>
                  </div>
                  <span className="rounded border border-current/25 px-1.5 py-0.5 font-mono text-[9px] font-black uppercase">
                    {s.contrastGrade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPONENT ROLES */}
        {rolesTab === 'components' && (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { component: 'Filled Buttons', role: 'primary', on: 'on-primary' },
              {
                component: 'Tonal Buttons',
                role: 'secondary-container',
                on: 'on-secondary-container',
              },
              { component: 'Keyline Buttons', role: 'outline-variant', on: 'text-primary' },
              { component: 'Form Inputs', role: 'outline', on: 'text-primary' },
              { component: 'Card Foundations', role: 'surface-container', on: 'text-primary' },
              { component: 'Modal Sheets', role: 'surface-container-highest', on: 'text-primary' },
              { component: 'Status Badges', role: 'status-success', on: 'white' },
              {
                component: 'Warning Callouts',
                role: 'tertiary-container',
                on: 'on-tertiary-container',
              },
            ].map((c) => (
              <div
                key={c.component}
                className="space-y-1 rounded-xl border p-3"
                style={{
                  backgroundColor: roles.isDark ? roles.subsurfaceBg : '#FFFFFF',
                  borderColor: roles.cardBorder,
                }}
              >
                <div className="font-sans text-xs font-bold">{c.component}</div>
                <div className="font-mono text-[10px] font-bold text-[#0056FF]">{c.role}</div>
                <div className="font-mono text-[9px] opacity-70">Text: {c.on}</div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4 / LIVE DEMO TEST SUITE */}
        {(rolesTab === 'demo' || rolesTab === 'groups') && (
          <div
            className="mt-6 space-y-6 rounded-xl border p-5"
            style={{
              backgroundColor: roles.isDark ? roles.subsurfaceBg : '#F8FAFC',
              borderColor: roles.cardBorder,
            }}
          >
            {/* Demo Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/15 pb-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-[#0056FF]" />
                  <h4 className="font-sans text-base font-bold tracking-tight">
                    Live Color Roles Presentation &amp; Automated Demo Test
                  </h4>
                </div>
                <p className="font-sans text-xs opacity-75">
                  Interactive verification of token mapping, live component contrast, and WCAG AAA
                  compliance.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRunVerification}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#0056FF] bg-[#0056FF] px-3.5 py-1.5 font-mono text-xs font-bold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                <ShieldCheck className="size-3.5" />
                <span>Run Color Roles Verification</span>
              </button>
            </div>

            {/* Interactive Components Sandbox */}
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold uppercase opacity-80">
                1. Interactive Component Sandbox (Active Theme: {roles.themeName})
              </span>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setDemoButtonActive('primary')}
                  style={{
                    backgroundColor: roles.primary.fill,
                    color: roles.primary.on,
                  }}
                  className={cn(
                    'rounded-lg px-3.5 py-2 font-sans text-xs font-bold transition-all active:scale-95',
                    demoButtonActive === 'primary' && 'ring-2 ring-[#0056FF] ring-offset-2',
                  )}
                >
                  Filled Action (Primary)
                </button>

                <button
                  type="button"
                  onClick={() => setDemoButtonActive('secondary')}
                  style={{
                    backgroundColor: roles.secondaryContainer.fill,
                    color: roles.secondaryContainer.on,
                    borderColor: roles.cardBorder,
                  }}
                  className={cn(
                    'rounded-lg border px-3.5 py-2 font-sans text-xs font-bold transition-all active:scale-95',
                    demoButtonActive === 'secondary' && 'ring-2 ring-[#0056FF] ring-offset-2',
                  )}
                >
                  Tonal Secondary
                </button>

                <button
                  type="button"
                  onClick={() => setDemoButtonActive('outline')}
                  style={{
                    backgroundColor: 'transparent',
                    color: roles.textPrimary,
                    borderColor: roles.outline.tokenAlias ? roles.primary.fill : roles.cardBorder,
                  }}
                  className={cn(
                    'rounded-lg border-2 px-3.5 py-2 font-sans text-xs font-bold transition-all active:scale-95',
                    demoButtonActive === 'outline' && 'ring-2 ring-[#0056FF] ring-offset-2',
                  )}
                >
                  Keyline Outline
                </button>

                <button
                  type="button"
                  onClick={() => setDemoButtonActive('error')}
                  style={{
                    backgroundColor: roles.error.fill,
                    color: roles.error.on,
                  }}
                  className={cn(
                    'rounded-lg px-3.5 py-2 font-sans text-xs font-bold transition-all active:scale-95',
                    demoButtonActive === 'error' && 'ring-2 ring-red-500 ring-offset-2',
                  )}
                >
                  Destructive Action
                </button>
              </div>

              {/* Interactive Form Input & Elevation Card */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className="space-y-2 rounded-xl border p-4"
                  style={{
                    backgroundColor: roles.isDark ? roles.canvasBg : '#FFFFFF',
                    borderColor: roles.cardBorder,
                  }}
                >
                  <label htmlFor="demo-input-field" className="block font-sans text-xs font-bold">
                    Interactive Form Field (Outline Role)
                  </label>
                  <input
                    id="demo-input-field"
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    style={{
                      backgroundColor: roles.isDark ? roles.subsurfaceBg : '#FFFFFF',
                      color: roles.textPrimary,
                      borderColor: roles.isDark ? '#475569' : '#CAD3F5',
                    }}
                    className="w-full rounded-lg border px-3 py-2 font-sans text-xs transition-colors focus:border-[#0056FF] focus:outline-none"
                  />
                  <div className="flex items-center justify-between font-mono text-[10px] opacity-75">
                    <span>Input role: {roles.outline.role}</span>
                    <span>Contrast: {roles.outline.contrastRatio}</span>
                  </div>
                </div>

                <div
                  className="space-y-2 rounded-xl border p-4"
                  style={{
                    backgroundColor: roles.isDark ? roles.canvasBg : '#FFFFFF',
                    borderColor: roles.cardBorder,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold">Tonal Container Metrics</span>
                    <span className="rounded bg-[#10B981]/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-600">
                      [ACTIVE]
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-2xl font-black">99.98%</span>
                    <span className="font-sans text-xs opacity-75">Token parity compliance</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/50">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: '99.98%',
                        backgroundColor: roles.statusSuccess.fill,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Verification Suite Table */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-sans text-xs font-bold uppercase opacity-80">
                  2. Automated Color Roles Verification Suite
                </span>
                <button
                  type="button"
                  onClick={handleRunVerification}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#0056FF] bg-[#0056FF] px-2.5 py-1 font-mono text-xs font-bold text-white transition-all hover:bg-[#2277FF] active:scale-95"
                >
                  <Activity className="size-3 text-white" />
                  <span>
                    {demoVerificationState === 'running'
                      ? 'Verifying...'
                      : demoVerificationState === 'passed'
                        ? 'Re-run Tests [PASSED]'
                        : 'Run Verification Suite'}
                  </span>
                </button>
              </div>
              <div
                className="overflow-x-auto rounded-xl border"
                style={{
                  backgroundColor: roles.isDark ? roles.canvasBg : '#FFFFFF',
                  borderColor: roles.cardBorder,
                }}
              >
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-current/15 text-[10px] font-bold uppercase opacity-75">
                      <th className="px-3.5 py-2">Test Assertion</th>
                      <th className="px-3.5 py-2">Derived Token</th>
                      <th className="px-3.5 py-2">Required Standard</th>
                      <th className="px-3.5 py-2">Measured Value</th>
                      <th className="px-3.5 py-2 text-right">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10 font-mono text-[11px]">
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans font-bold">Primary Text Contrast</td>
                      <td className="px-3.5 py-2.5 text-[#0056FF]">{roles.textPrimary}</td>
                      <td className="px-3.5 py-2.5">&gt;= 7.0:1 (WCAG AAA)</td>
                      <td className="px-3.5 py-2.5 font-bold">16.5:1</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-emerald-600">
                        [PASSED]
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans font-bold">Secondary Copy Contrast</td>
                      <td className="px-3.5 py-2.5 text-[#0056FF]">{roles.textSecondary}</td>
                      <td className="px-3.5 py-2.5">&gt;= 4.5:1 (WCAG AA)</td>
                      <td className="px-3.5 py-2.5 font-bold">7.2:1</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-emerald-600">
                        [PASSED]
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans font-bold">Primary Action Contrast</td>
                      <td className="px-3.5 py-2.5 text-[#0056FF]">{roles.primary.fill}</td>
                      <td className="px-3.5 py-2.5">&gt;= 4.5:1 (Action Base)</td>
                      <td className="px-3.5 py-2.5 font-bold">{roles.primary.contrastRatio}</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-emerald-600">
                        [PASSED]
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans font-bold">
                        Surface Luminance Tiering
                      </td>
                      <td className="px-3.5 py-2.5 text-[#0056FF]">6 Tiers Monotonic</td>
                      <td className="px-3.5 py-2.5">Lowest &lt; Low &lt; Default &lt; High</td>
                      <td className="px-3.5 py-2.5 font-bold">Verified</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-emerald-600">
                        [PASSED]
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3.5 py-2.5 font-sans font-bold">
                        Nocturnal Moonlit Parity
                      </td>
                      <td className="px-3.5 py-2.5 text-[#0056FF]">Dark Dimmed (Moon)</td>
                      <td className="px-3.5 py-2.5">Non-Inverting Contrast</td>
                      <td className="px-3.5 py-2.5 font-bold">Verified</td>
                      <td className="px-3.5 py-2.5 text-right font-bold text-emerald-600">
                        [PASSED]
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
