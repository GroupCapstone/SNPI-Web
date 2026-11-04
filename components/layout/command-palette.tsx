'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Check,
  GraduationCap,
  Languages,
  LayoutDashboard,
  Search,
  UserCog,
  Users,
  X,
} from '@/components/icons';

import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import type { Branch } from '@/features/branches/types';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  category: 'branch' | 'navigation' | 'action';
  title: string;
  subtitle?: string;
  badge?: string;
  icon: React.ElementType;
  onSelect: () => void;
  isActive?: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const router = useRouter();
  const { t, isKhmer, language, setLanguage, getLocalizedValue } = useTranslation();
  const { user, currentBranchId, setCurrentBranchId, hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const { data: branchData } = useBranchesQuery({}, canViewBranches);

  const allBranches: Branch[] = React.useMemo(() => {
    return Array.isArray(branchData?.data) ? branchData.data : [];
  }, [branchData]);

  const branches: Branch[] = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') {
      return allBranches;
    }
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const canUseAllBranches =
    user?.branchAccess === 'all' && hasPermission('branch.view.all_branches');

  // Build commands list
  const commandItems: CommandItem[] = React.useMemo(() => {
    const items: CommandItem[] = [];

    // 1. Campus Branches Section
    if (canUseAllBranches) {
      items.push({
        id: 'branch-all',
        category: 'branch',
        title: t.topbar.allBranches,
        subtitle: isKhmer
          ? 'ទិដ្ឋភាពរួមសហគ្រាស - គ្រប់សាខាទាំងអស់'
          : 'Consolidated cross-campus global enterprise scope',
        badge: 'ALL',
        icon: Building2,
        isActive: currentBranchId === 'all',
        onSelect: () => {
          setCurrentBranchId('all');
          onOpenChange(false);
        },
      });
    }

    branches.forEach((branch) => {
      const primaryName = getLocalizedValue(branch.branchNameKh, branch.branchNameEn);
      const secondaryName = isKhmer ? branch.branchNameEn : branch.branchNameKh;
      items.push({
        id: `branch-${branch._id}`,
        category: 'branch',
        title: primaryName,
        subtitle: secondaryName || branch.address || undefined,
        badge: branch.branchCode,
        icon: Building2,
        isActive: currentBranchId === branch._id,
        onSelect: () => {
          setCurrentBranchId(branch._id);
          onOpenChange(false);
        },
      });
    });

    // 2. Navigation Section
    items.push(
      {
        id: 'nav-dashboard',
        category: 'navigation',
        title: isKhmer ? 'ផ្ទាំងគ្រប់គ្រងទូទៅ' : 'Dashboard Overview',
        subtitle: isKhmer
          ? 'ទិដ្ឋភាពរួមនៃប្រព័ន្ធ និងសូចនាករ KPI'
          : 'Central executive operations & KPIs',
        icon: LayoutDashboard,
        onSelect: () => {
          router.push('/dashboard');
          onOpenChange(false);
        },
      },
      {
        id: 'nav-classes',
        category: 'navigation',
        title: isKhmer ? 'កាលវិភាគ និងថ្នាក់រៀន' : 'Classes Management Hub',
        subtitle: isKhmer
          ? 'គ្រប់គ្រងថ្នាក់រៀន កាលវិភាគ និងការចុះឈ្មោះ'
          : 'Class rosters, timetable & rosters',
        icon: GraduationCap,
        onSelect: () => {
          router.push('/classes');
          onOpenChange(false);
        },
      },
      {
        id: 'nav-students',
        category: 'navigation',
        title: isKhmer ? 'បញ្ជីឈ្មោះសិស្ស' : 'Student Directory',
        subtitle: isKhmer
          ? 'ព័ត៌មានលម្អិតសិស្ស និងអាណាព្យាបាល'
          : 'Master student profiles & guardians',
        icon: Users,
        onSelect: () => {
          router.push('/students');
          onOpenChange(false);
        },
      },
      {
        id: 'nav-employees',
        category: 'navigation',
        title: isKhmer ? 'បញ្ជីបុគ្គលិក និងសាស្រ្តាចារ្យ' : 'Staff & Faculty Directory',
        subtitle: isKhmer
          ? 'គ្រប់គ្រងគ្រូបង្រៀន និងបុគ្គលិកសាលា'
          : 'Teacher assignments & staff records',
        icon: Users,
        onSelect: () => {
          router.push('/employees');
          onOpenChange(false);
        },
      },
      {
        id: 'nav-branches',
        category: 'navigation',
        title: isKhmer ? 'គ្រប់គ្រងសាខាសាលា' : 'Campus Branches',
        subtitle: isKhmer ? 'រៀបចំទីតាំង និងព័ត៌មានសាខា' : 'Campus locations & branch profiles',
        icon: Building2,
        onSelect: () => {
          router.push('/organization/branches');
          onOpenChange(false);
        },
      },
      {
        id: 'nav-users',
        category: 'navigation',
        title: isKhmer ? 'គណនី និងសិទ្ធិប្រើប្រាស់' : 'User Accounts & Security',
        subtitle: isKhmer
          ? 'គ្រប់គ្រងអ្នកប្រើប្រាស់ និងការកំណត់សិទ្ធិ'
          : 'User roles, logins & access control',
        icon: UserCog,
        onSelect: () => {
          router.push('/users');
          onOpenChange(false);
        },
      },
    );

    // 3. Quick Actions
    items.push({
      id: 'action-language',
      category: 'action',
      title: isKhmer
        ? 'ប្តូរទៅជាភាសាអង់គ្លេស (Switch to English)'
        : 'ប្តូរទៅជាភាសាខ្មែរ (Switch to Khmer)',
      subtitle: isKhmer ? 'Current active language: Khmer' : 'Current active language: English',
      badge: language === 'kh' ? 'EN' : 'ខ្មែរ',
      icon: Languages,
      onSelect: () => {
        setLanguage(language === 'kh' ? 'en' : 'kh');
        onOpenChange(false);
      },
    });

    return items;
  }, [
    canUseAllBranches,
    branches,
    t.topbar.allBranches,
    isKhmer,
    currentBranchId,
    setCurrentBranchId,
    onOpenChange,
    getLocalizedValue,
    router,
    language,
    setLanguage,
  ]);

  // Filter commands by search query
  const filteredCommands = React.useMemo(() => {
    if (!searchQuery.trim()) return commandItems;
    const q = searchQuery.toLowerCase().trim();
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q)),
    );
  }, [commandItems, searchQuery]);

  // Auto focus input when opened
  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = React.useCallback(() => {
    setSearchQuery('');
    setSelectedIndex(0);
    onOpenChange(false);
  }, [onOpenChange]);

  // Keyboard navigation within list
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1,
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].onSelect();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredCommands, selectedIndex, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Palette Container */}
      <div className="relative z-50 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-slate-100 px-4 py-3">
          <Search className="size-4.5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              isKhmer
                ? 'ស្វែងរកសាខា ទំព័រ ឬបញ្ជាប្រព័ន្ធរហ័ស...'
                : 'Type to switch campus, jump to page, or run action...'
            }
            className="ml-3 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-2 text-slate-400 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>
          )}
          <kbd className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              {isKhmer ? 'រកមិនឃើញលទ្ធផលដែលត្រូវគ្នាទេ' : 'No matching results found.'}
            </div>
          ) : (
            <div className="space-y-1">
              {/* Group items by category for visual clarity */}
              {['branch', 'navigation', 'action'].map((cat) => {
                const groupItems = filteredCommands.filter((it) => it.category === cat);
                if (groupItems.length === 0) return null;

                const categoryTitle =
                  cat === 'branch'
                    ? isKhmer
                      ? 'ប្តូរសាខាប្រតិបត្តិការ (Switch Campus)'
                      : 'Switch Campus Scope'
                    : cat === 'navigation'
                      ? isKhmer
                        ? 'រុករកទំព័រ (Navigation)'
                        : 'Quick Navigation'
                      : isKhmer
                        ? 'សកម្មភាពរហ័ស (Quick Actions)'
                        : 'Quick Actions';

                return (
                  <div key={cat} className="space-y-1">
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold tracking-normal text-slate-400 uppercase">
                      {categoryTitle}
                    </div>
                    {groupItems.map((item) => {
                      const globalIndex = filteredCommands.findIndex((i) => i.id === item.id);
                      const isHighlighted = globalIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={item.onSelect}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-all',
                            isHighlighted
                              ? 'bg-[#00509d]/10 text-[#00509d]'
                              : 'text-slate-700 hover:bg-slate-50',
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <Icon
                              className={cn(
                                'size-5 shrink-0',
                                item.isActive || isHighlighted
                                  ? 'text-[#00509d]'
                                  : 'text-slate-500',
                              )}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    'truncate text-xs font-medium',
                                    item.isActive && 'font-semibold text-[#00509d]',
                                  )}
                                >
                                  {item.title}
                                </span>
                                {item.isActive && (
                                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
                                    {isKhmer ? 'សកម្ម' : 'Active'}
                                  </span>
                                )}
                              </div>
                              {item.subtitle && (
                                <p className="truncate text-xs text-slate-400">{item.subtitle}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {item.badge && (
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-600">
                                {item.badge}
                              </span>
                            )}
                            {item.isActive && <Check className="size-4 text-[#00509d]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-4 py-2 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-slate-200 bg-white px-1 font-mono text-xs">
                ↑
              </kbd>{' '}
              <kbd className="rounded border border-slate-200 bg-white px-1 font-mono text-xs">
                ↓
              </kbd>{' '}
              {isKhmer ? 'ជ្រើសរើស' : 'Navigate'}
            </span>
            <span>
              <kbd className="rounded border border-slate-200 bg-white px-1 font-mono text-xs">
                ↵
              </kbd>{' '}
              {isKhmer ? 'បើក' : 'Select'}
            </span>
          </div>
          <span className="text-xs text-slate-400">SNP-SMS Quick Control</span>
        </div>
      </div>
    </div>
  );
};
