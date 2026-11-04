'use client';

import * as React from 'react';
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

export interface LiquidGlassCircleTheme {
  bg: string;
  text: string;
  border: string;
  ring: string;
  glow: string;
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
  if (key.includes('nav')) {
    // 01 Navigation - Interactive Azure Blue
    return {
      accent: '#2277FF',
      badgeBg: 'bg-[#EFF6FF]',
      badgeBorder: 'border-[#BAE6FD]',
      badgeText: 'text-[#1D4ED8]',
      iconColor: 'text-[#2277FF]',
      borderColor: 'border-[#2277FF]/40',
      glowColor: 'rgba(34, 119, 255, 0.08)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('feedback')) {
    // 02 Feedback - Solid Royal Blue
    return {
      accent: '#0056FF',
      badgeBg: 'bg-[#EFF5FF]',
      badgeBorder: 'border-[#CAD3F5]',
      badgeText: 'text-[#0056FF]',
      iconColor: 'text-[#0056FF]',
      borderColor: 'border-[#0056FF]/40',
      glowColor: 'rgba(0, 86, 255, 0.08)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('input')) {
    // 03 Inputs - Signal / Sunny Yellow
    return {
      accent: '#EAB308',
      badgeBg: 'bg-[#FEFCE8]',
      badgeBorder: 'border-[#FEF08A]',
      badgeText: 'text-[#A16207]',
      iconColor: 'text-[#CA8A04]',
      borderColor: 'border-[#EAB308]/40',
      glowColor: 'rgba(250, 204, 21, 0.12)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('display') || key.includes('container')) {
    // 04 Containers / Display - Soft Lavender
    return {
      accent: '#8B5CF6',
      badgeBg: 'bg-[#F5F3FF]',
      badgeBorder: 'border-[#DDD6FE]',
      badgeText: 'text-[#7C3AED]',
      iconColor: 'text-[#8B5CF6]',
      borderColor: 'border-[#8B5CF6]/40',
      glowColor: 'rgba(139, 92, 246, 0.08)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('action') || key.includes('button')) {
    // 05 Actions - Mint Emerald Green
    return {
      accent: '#10B981',
      badgeBg: 'bg-[#F0FDF4]',
      badgeBorder: 'border-[#BBF7D0]',
      badgeText: 'text-[#059669]',
      iconColor: 'text-[#10B981]',
      borderColor: 'border-[#10B981]/40',
      glowColor: 'rgba(16, 185, 129, 0.10)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('ai') || key.includes('prompt')) {
    // 06 AI Prompts / AI Kit - Pearl Slate Mesh
    return {
      accent: '#475569',
      badgeBg: 'bg-[#F8FAFC]',
      badgeBorder: 'border-[#CBD5E1]',
      badgeText: 'text-[#334155]',
      iconColor: 'text-[#475569]',
      borderColor: 'border-[#475569]/40',
      glowColor: 'rgba(100, 116, 139, 0.06)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('form')) {
    // Forms - Warm Honey Amber
    return {
      accent: '#F59E0B',
      badgeBg: 'bg-[#FFFBEB]',
      badgeBorder: 'border-[#FDE68A]',
      badgeText: 'text-[#B45309]',
      iconColor: 'text-[#F59E0B]',
      borderColor: 'border-[#F59E0B]/40',
      glowColor: 'rgba(245, 158, 11, 0.09)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  if (key.includes('section')) {
    // Sections - Deep Azure Blue
    return {
      accent: '#0284C7',
      badgeBg: 'bg-[#F0F9FF]',
      badgeBorder: 'border-[#BAE6FD]',
      badgeText: 'text-[#0369A1]',
      iconColor: 'text-[#0284C7]',
      borderColor: 'border-[#0284C7]/40',
      glowColor: 'rgba(2, 132, 199, 0.08)',
      cardBg: 'bg-white',
      cardBorder: 'border-[#CAD3F5]',
    };
  }
  return {
    accent: '#0056FF',
    badgeBg: 'bg-[#EFF5FF]',
    badgeBorder: 'border-[#CAD3F5]',
    badgeText: 'text-[#0056FF]',
    iconColor: 'text-[#0056FF]',
    borderColor: 'border-[#0056FF]/40',
    glowColor: 'rgba(0, 86, 255, 0.08)',
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
