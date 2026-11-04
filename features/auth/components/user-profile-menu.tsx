'use client';

import * as React from 'react';
import { KeyRound, LogOut, ShieldCheck } from '@/components/icons';

import { Badge } from '@/components/ui/badge';

import { useAuth } from '../context/auth-context';
import { ChangePasswordDialog } from './change-password-dialog';

export const UserProfileMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  const initials = user.username.slice(0, 2).toUpperCase();

  const formattedRole = user.roles
    .map((r) =>
      r
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    )
    .join(', ');

  const displayName =
    typeof user.employeeId === 'object' && user.employeeId !== null
      ? `${user.employeeId.firstName} ${user.employeeId.lastName}`
      : user.username;

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="Open user profile menu"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-slate-100 focus:outline-none"
      >
        <div className="grid size-9 place-items-center rounded-full bg-[#023e8a] text-xs font-semibold text-white">
          {initials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2">
          {/* User Info Header */}
          <div className="border-b border-slate-100 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="grid size-10 place-items-center rounded-full bg-[#023e8a] text-sm font-semibold text-white">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900">{displayName}</p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between">
              <Badge
                tone="neutral"
                className="bg-[#00509d]/10 text-xs font-semibold text-[#00509d]"
              >
                {formattedRole}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <ShieldCheck className="size-3 text-emerald-600" />
                <span>
                  {user.branchAccess === 'all'
                    ? 'All Branches'
                    : `${user.branchAccess.length} Branch(es)`}
                </span>
              </div>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="space-y-1 pt-1.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setPasswordDialogOpen(true);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#00509d]"
            >
              <KeyRound className="size-4 text-slate-400" />
              <span>Change Password</span>
            </button>

            <div className="border-t border-slate-100 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="size-4 text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ChangePasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} />
    </div>
  );
};
