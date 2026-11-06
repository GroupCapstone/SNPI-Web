'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Compass,
  Navigation,
  Menu,
  Layers,
  Table,
  Bell,
  Sliders,
  Sparkles,
  Clock,
  Calendar,
  User,
  Folder,
  Play,
  Volume,
  Bot,
  Zap,
  ShieldCheck,
  Globe,
  Tag,
  CheckSquare,
  List,
  Message,
  Search,
  Terminal,
  Hash,
  Alert,
  FileText,
  Key,
  Lock,
  Mic,
  Upload,
  LayoutGrid,
  type IconComponent,
} from '@/components/icons';

/**
 * Returns an appropriate Lucide icon component for any component ID or name.
 * Provides rich, recognizable visual cues for every component in the documentation sidebar.
 */
export function getNavIcon(id: string, name?: string): IconComponent {
  const key = `${id} ${name || ''}`.toLowerCase();

  // Navigation & Menus
  if (key.includes('cyber-armor') || key.includes('armor')) return ShieldCheck;
  if (key.includes('gooey')) return Sparkles;
  if (key.includes('hook-sidebar') || key.includes('sidebar')) return Navigation;
  if (key.includes('dropdown') || key.includes('menu')) return Menu;
  if (key.includes('rail') || key.includes('navigation')) return Compass;
  if (key.includes('accordion')) return Layers;
  if (key.includes('breadcrumbs')) return Compass;
  if (key.includes('search')) return Search;
  if (key.includes('tab')) return Folder;

  // Buttons & Actions
  if (key.includes('button') || key.includes('fab') || key.includes('action')) return Zap;

  // Date, Time & Pickers
  if (key.includes('duration') || key.includes('time') || key.includes('clock')) return Clock;
  if (key.includes('date') || key.includes('calendar')) return Calendar;

  // Inputs, Text & Security
  if (key.includes('password') || key.includes('lock')) return Lock;
  if (key.includes('key')) return Key;
  if (key.includes('text') || key.includes('field') || key.includes('label')) return FileText;
  if (key.includes('chip') || key.includes('tag') || key.includes('badge')) return Tag;
  if (key.includes('switch') || key.includes('toggle')) return Sliders;
  if (key.includes('check')) return CheckSquare;
  if (key.includes('select') || key.includes('combo') || key.includes('picker')) return List;
  if (key.includes('color') || key.includes('swatch')) return Sparkles;

  // Feedback, Alerts & Overlays
  if (key.includes('bell') || key.includes('notification')) return Bell;
  if (key.includes('toast') || key.includes('snackbar')) return Layers;
  if (
    key.includes('skeleton') ||
    key.includes('loading') ||
    key.includes('progress') ||
    key.includes('meter')
  )
    return Sparkles;
  if (key.includes('dialog') || key.includes('alert') || key.includes('404')) return Alert;
  if (key.includes('sheet')) return Layers;
  if (key.includes('help') || key.includes('tooltip') || key.includes('popover')) return Sparkles;

  // Display, Media & Lists
  if (key.includes('table')) return Table;
  if (key.includes('counter') || key.includes('number')) return Hash;
  if (key.includes('player') || key.includes('step')) return Play;
  if (key.includes('voice') || key.includes('audio') || key.includes('mic')) return Mic;
  if (key.includes('sound') || key.includes('volume')) return Volume;
  if (key.includes('avatar') || key.includes('user')) return User;
  if (key.includes('card') || key.includes('folder')) return Folder;
  if (key.includes('list')) return List;
  if (key.includes('dropzone') || key.includes('upload')) return Upload;

  // AI & Advanced
  if (key.includes('ai') || key.includes('grid-reveal') || key.includes('bot')) return Bot;
  if (key.includes('cipher') || key.includes('terminal')) return Terminal;
  if (key.includes('grid')) return LayoutGrid;
  if (key.includes('marquee')) return Sparkles;

  // Default fallback
  return Layers;
}

/**
 * Returns an icon for a parent group (e.g. Navigation, Inputs, Feedback, Display, Forms, AI Kit).
 */
export function getParentGroupIcon(groupId: string): IconComponent {
  switch (groupId) {
    case 'group-navigation':
      return Compass;
    case 'group-inputs':
      return Sliders;
    case 'group-feedback':
      return Bell;
    case 'group-display':
      return Table;
    case 'group-forms':
      return FileText;
    case 'group-sections':
      return LayoutGrid;
    default:
      return Layers;
  }
}

/**
 * Standardized Squircle Menu Icon Tile
 * Renders a clean white rounded squircle container with subtle border and micro-shadow,
 * housing a perfectly centered Keyline Two-Tone vector icon with 40% fill accent layer.
 * Strictly motionless: zero hover scaling, zero jumping, zero animation events.
 */
export function MenuIconTile({
  icon: Icon,
  className,
  active = false,
  size = 'md',
}: {
  icon: IconComponent | React.ComponentType<{ className?: string }>;
  className?: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'size-8 rounded-[4px]',
    md: 'size-10 rounded-[4px]',
    lg: 'size-11 rounded-[4px]',
  }[size];

  const iconSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-5.5',
  }[size];

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-[4px] border bg-white text-[#020617] shadow-2xs transition-colors',
        sizeClasses,
        active
          ? 'border-slate-300 shadow-xs ring-2 ring-slate-200/80'
          : 'border-slate-200/90 group-hover:border-slate-300 group-hover:bg-slate-50/80',
        className,
      )}
      style={{ borderRadius: '4px' }}
    >
      <Icon className={cn(iconSizes, 'stroke-[2] text-[#020617]')} />
    </div>
  );
}

export interface LiquidGlassCircleTheme {
  bg: string;
  text: string;
  border: string;
  ring: string;
  glow: string;
}

export interface SidebarCategoryColorTheme {
  boxBg: string;
  boxBorder: string;
  iconColor: string;
  hoverBoxBg: string;
  activeBoxBg: string;
  activeBoxBorder: string;
  activeIconColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  activeBadgeBg: string;
  activeBadgeText: string;
  activeRowBg: string;
  activeRowBorder: string;
  activeText: string;
}

/**
 * Returns clean, monochromatic black color token mapping for sidebar parent categories
 * featuring squircle icon tiles with solid black icons and black typography.
 */
export function getSidebarCategoryColorTheme(
  _groupIdOrCategory?: string,
): SidebarCategoryColorTheme {
  return {
    boxBg: 'bg-slate-50',
    boxBorder: 'border-slate-200',
    iconColor: 'text-black',
    hoverBoxBg: 'group-hover:bg-slate-100 group-hover:border-slate-300',
    activeBoxBg: 'bg-slate-200/90',
    activeBoxBorder: 'border-slate-300',
    activeIconColor: 'text-black',
    badgeBg: 'bg-transparent',
    badgeBorder: 'border-transparent',
    badgeText: 'text-black',
    activeBadgeBg: 'bg-transparent',
    activeBadgeText: 'text-black',
    activeRowBg: 'bg-slate-100/90',
    activeRowBorder: 'border-slate-300',
    activeText: 'text-black',
  };
}

/**
 * Returns tactile Liquid Glass color circle tokens for sidebar parent group icons.
 * Strictly unified to Brand Royal Blue (#0056FF), Azure Blue (#2277FF), Soft Lavender (#E3E7FC), and Ice Tint (#EFF5FF).
 */
export function getLiquidGlassCircle(groupId?: string): LiquidGlassCircleTheme {
  switch (groupId) {
    case 'group-navigation':
      return {
        bg: 'bg-gradient-to-br from-[#EFF5FF] to-[#DBEAFE]',
        text: 'text-[#0056FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#0056FF]/35',
        glow: 'rgba(0, 86, 255, 0.16)',
      };
    case 'group-inputs':
      return {
        bg: 'bg-gradient-to-br from-white via-[#EFF5FF] to-[#E3E7FC]',
        text: 'text-[#2277FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#2277FF]/35',
        glow: 'rgba(34, 119, 255, 0.16)',
      };
    case 'group-feedback':
      return {
        bg: 'bg-gradient-to-br from-[#E3E7FC]/80 via-[#EFF5FF] to-white',
        text: 'text-[#0056FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#0056FF]/35',
        glow: 'rgba(0, 86, 255, 0.16)',
      };
    case 'group-display':
      return {
        bg: 'bg-gradient-to-br from-[#EFF5FF] via-white to-[#DBEAFE]',
        text: 'text-[#0056FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#0056FF]/35',
        glow: 'rgba(0, 86, 255, 0.16)',
      };
    case 'group-forms':
      return {
        bg: 'bg-gradient-to-br from-white via-[#DBEAFE] to-[#EFF5FF]',
        text: 'text-[#0056FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#0056FF]/35',
        glow: 'rgba(0, 86, 255, 0.16)',
      };
    case 'group-sections':
      return {
        bg: 'bg-gradient-to-br from-[#EFF5FF] to-[#E3E7FC]',
        text: 'text-[#2277FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#2277FF]/35',
        glow: 'rgba(34, 119, 255, 0.16)',
      };
    default:
      return {
        bg: 'bg-gradient-to-br from-[#EFF5FF] to-[#DBEAFE]',
        text: 'text-[#0056FF]',
        border: 'border-[#CAD3F5]',
        ring: 'ring-[#0056FF]/35',
        glow: 'rgba(0, 86, 255, 0.14)',
      };
  }
}

export interface ParentCategoryTheme {
  accent: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconColor: string;
  borderColor: string;
  glowColor: string;
  cardBg: string;
  cardBorder: string;
}

/**
 * Returns signature brand color tokens for each parent category
 * adhering to the 6 kinetic cards deck specifications.
 */
export function getParentCategoryTheme(groupIdOrCategory: string): ParentCategoryTheme {
  const key = groupIdOrCategory.toLowerCase();

  // Standard Clean Neutral Icon Container (Zero arbitrary candy colors, 4px border radius)
  // All icons default to Black (#020617 / text-slate-950) on clean white/neutral background
  return {
    accent: '#0056FF',
    badgeBg: 'bg-white',
    badgeBorder: 'border-slate-200/90',
    badgeText: 'text-[#020617]',
    iconColor: 'text-[#020617]',
    borderColor: 'border-slate-200/80',
    glowColor: 'rgba(2, 6, 23, 0.04)',
    cardBg: 'bg-white',
    cardBorder: 'border-[#CAD3F5]',
  };
}

export interface DemoStageTheme {
  id: string;
  name: string;
  bg: string;
  border: string;
  glow: string;
  accentText: string;
  dotBg: string;
}

/**
 * 8 High-Contrast, WCAG AAA-compliant Demo Card Stage Themes
 * Derived directly from the kinetic card archetype palette.
 */
export const DEMO_STAGE_PALETTE: DemoStageTheme[] = [
  {
    id: 'ice',
    name: 'Ice Tint',
    bg: 'bg-[#EFF5FF]',
    border: 'border-[#CAD3F5]',
    glow: 'rgba(0, 86, 255, 0.08)',
    accentText: 'text-[#0056FF]',
    dotBg: 'bg-[#0056FF]',
  },
  {
    id: 'yellow',
    name: 'Signal Yellow',
    bg: 'bg-[#FEFCE8]',
    border: 'border-[#FEF08A]',
    glow: 'rgba(250, 204, 21, 0.12)',
    accentText: 'text-amber-800',
    dotBg: 'bg-[#EAB308]',
  },
  {
    id: 'azure',
    name: 'Azure Tint',
    bg: 'bg-[#F0F7FF]',
    border: 'border-[#BAE6FD]',
    glow: 'rgba(34, 119, 255, 0.08)',
    accentText: 'text-sky-800',
    dotBg: 'bg-[#2277FF]',
  },
  {
    id: 'emerald',
    name: 'Mint Emerald',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]',
    glow: 'rgba(16, 185, 129, 0.10)',
    accentText: 'text-emerald-800',
    dotBg: 'bg-[#10B981]',
  },
  {
    id: 'lavender',
    name: 'Soft Lavender',
    bg: 'bg-[#F5F3FF]',
    border: 'border-[#DDD6FE]',
    glow: 'rgba(139, 92, 246, 0.08)',
    accentText: 'text-purple-800',
    dotBg: 'bg-[#8B5CF6]',
  },
  {
    id: 'slate',
    name: 'Pearl Slate',
    bg: 'bg-[#F8FAFC]',
    border: 'border-[#E2E8F0]',
    glow: 'rgba(100, 116, 139, 0.06)',
    accentText: 'text-slate-700',
    dotBg: 'bg-[#64748B]',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
    glow: 'rgba(245, 158, 11, 0.09)',
    accentText: 'text-amber-900',
    dotBg: 'bg-[#F59E0B]',
  },
  {
    id: 'rose',
    name: 'Rose Quartz',
    bg: 'bg-[#FFF1F2]',
    border: 'border-[#FECDD3]',
    glow: 'rgba(244, 63, 94, 0.08)',
    accentText: 'text-rose-800',
    dotBg: 'bg-[#F43F5E]',
  },
];

/**
 * Deterministic pseudo-random theme selector ensuring adjacent cards have
 * visual color variety while maintaining 100% hydration consistency.
 */
export function getComponentStageTheme(compId: string, index = 0): DemoStageTheme {
  let hash = 0;
  for (let i = 0; i < compId.length; i++) {
    hash = (hash << 5) - hash + compId.charCodeAt(i);
    hash |= 0;
  }
  const colorIndex = Math.abs(hash + index * 3) % DEMO_STAGE_PALETTE.length;
  return DEMO_STAGE_PALETTE[colorIndex];
}
