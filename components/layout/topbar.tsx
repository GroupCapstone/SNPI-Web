'use client';

import * as React from 'react';
import { Bell, Menu, Search } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { UserProfileMenu } from '@/features/auth/components/user-profile-menu';
import { useTranslation } from '@/lib/i18n';
import { AcademicContextSelector } from './academic-context-selector';
import { BranchSwitcher } from './branch-switcher';
import { CommandPalette } from './command-palette';

interface TopbarProps {
  onOpenNavigation: () => void;
}

export const Topbar = ({ onOpenNavigation }: TopbarProps) => {
  const { t } = useTranslation();
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Global keyboard shortcut: Cmd/Ctrl + K (Search)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile drawer open button (mobile only) */}
          <Button
            aria-label="Open navigation"
            className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            onClick={onOpenNavigation}
            size="icon"
            type="button"
            variant="ghost"
          >
            <Menu className="size-5" />
          </Button>

          {/* Global search & quick control trigger */}
          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="group relative hidden h-9 w-full max-w-xs min-w-[180px] items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 text-left transition-all hover:border-slate-300 hover:bg-white focus:outline-none md:flex lg:max-w-sm"
          >
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-500">
              <Search className="size-4 shrink-0 text-slate-400 group-hover:text-[#00509d]" />
              <span className="truncate text-xs text-slate-400 group-hover:text-slate-600">
                {t.topbar.searchPlaceholder}
              </span>
            </div>
            <kbd className="pointer-events-none flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-xs text-slate-500">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Institutional Scope / Context Selectors */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <AcademicContextSelector />
            <BranchSwitcher />
          </div>

          {/* Subtle Visual Divider */}
          <div className="hidden h-5 w-px bg-slate-200 md:block" />

          {/* User Utility Actions: Language Switcher, Notifications, User Profile */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Language Switcher placed directly adjacent to Notification */}
            <LanguageSwitcher variant="pill" />

            {/* Notifications Button */}
            <Button
              aria-label={t.topbar.notifications}
              size="icon"
              variant="ghost"
              className="size-9 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Bell className="size-4" />
            </Button>

            {/* Real Authenticated User Profile Menu */}
            <UserProfileMenu />
          </div>
        </div>
      </header>

      {/* Global Command & Quick Branch Control Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};
