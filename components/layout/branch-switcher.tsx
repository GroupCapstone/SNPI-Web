'use client';

import * as React from 'react';
import { Building2, Check, ChevronDown, Plus } from '@/components/icons';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/context/auth-context';
import { useBranchesQuery } from '@/features/branches/hooks/use-branches';
import type { Branch } from '@/features/branches/types';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const BranchSwitcher = () => {
  const { user, currentBranchId, setCurrentBranchId, hasPermission } = useAuth();
  const { t, isKhmer, getLocalizedValue } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const canViewBranches =
    hasPermission('branch.view.own_branch') || hasPermission('branch.view.all_branches');
  const canManageBranches =
    hasPermission('branch.create.all_branches') || hasPermission('branch.edit.all_branches');
  const { data: branchData, isLoading } = useBranchesQuery({}, canViewBranches);

  const allBranches: Branch[] = React.useMemo(() => {
    return Array.isArray(branchData?.data) ? branchData.data : [];
  }, [branchData]);

  // Filter branches strictly by authenticated user's branch access
  const branches: Branch[] = React.useMemo(() => {
    if (!user || user.branchAccess === 'all') {
      return allBranches;
    }
    const accessSet = new Set(Array.isArray(user.branchAccess) ? user.branchAccess : []);
    return allBranches.filter((b) => accessSet.has(b._id));
  }, [allBranches, user]);

  const activeBranch = branches.find((b) => b._id === currentBranchId);
  const canUseAllBranches =
    user?.branchAccess === 'all' && hasPermission('branch.view.all_branches');

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSelectBranch = (branchId: string) => {
    setCurrentBranchId(branchId);
    setIsOpen(false);
  };

  const displayLabel = React.useMemo(() => {
    if (isLoading) return t.common.loading;
    if (currentBranchId === 'all') return t.topbar.allBranches;
    if (activeBranch)
      return getLocalizedValue(activeBranch.branchNameKh, activeBranch.branchNameEn);
    return branches.length > 0
      ? getLocalizedValue(branches[0].branchNameKh, branches[0].branchNameEn)
      : t.topbar.allBranches;
  }, [isLoading, currentBranchId, activeBranch, branches, getLocalizedValue, t]);

  const displayCode = React.useMemo(() => {
    if (currentBranchId === 'all') return 'ALL';
    if (activeBranch) return activeBranch.branchCode;
    return null;
  }, [activeBranch, currentBranchId]);

  const [filterQuery, setFilterQuery] = React.useState('');

  const filteredBranches = React.useMemo(() => {
    if (!filterQuery.trim()) return branches;
    const q = filterQuery.toLowerCase().trim();
    return branches.filter((b) => {
      const kh = (b.branchNameKh || '').toLowerCase();
      const en = (b.branchNameEn || '').toLowerCase();
      const code = (b.branchCode || '').toLowerCase();
      return kh.includes(q) || en.includes(q) || code.includes(q);
    });
  }, [branches, filterQuery]);

  // If user only has access to 1 branch, show static badge
  if (user && user.branchAccess !== 'all' && branches.length === 1) {
    const singleBranch = branches[0];
    const name = getLocalizedValue(singleBranch.branchNameKh, singleBranch.branchNameEn);
    return (
      <div className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs text-slate-700 sm:flex">
        <Building2 className="size-3.5 text-[#00509d]" />
        <span className="max-w-[140px] truncate font-medium">{name}</span>
        <span className="rounded bg-white px-1.5 py-0.5 font-mono text-xs text-slate-500">
          {singleBranch.branchCode}
        </span>
      </div>
    );
  }

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <Button
        aria-label="Select active campus branch"
        className="hidden h-9 shrink-0 items-center gap-2 border-slate-200 bg-white px-2.5 text-xs font-medium whitespace-nowrap text-slate-800 transition-all hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
        variant="outline"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setFilterQuery('');
        }}
      >
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500" />
          <Building2 className="size-3.5 text-[#00509d]" />
        </div>
        <span className="max-w-[150px] truncate font-semibold whitespace-nowrap md:max-w-[200px]">
          {displayLabel}
        </span>
        {displayCode && (
          <span className="shrink-0 rounded bg-[#00509d]/10 px-1.5 py-0.5 font-mono text-xs font-semibold whitespace-nowrap text-[#00509d]">
            {displayCode}
          </span>
        )}
        <ChevronDown
          className={cn(
            'size-3.5 shrink-0 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </Button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-1.5 w-80 rounded-2xl border border-slate-200 bg-white p-2">
          {/* Header */}
          <div className="border-b border-slate-100 px-2 pt-1 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900">{t.topbar.switchBranch}</span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
                {branches.length} {isKhmer ? 'សាខា' : 'Campuses'}
              </span>
            </div>

            {/* Quick Search if more than 2 branches */}
            {branches.length > 2 && (
              <div className="mt-2">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder={isKhmer ? 'ស្វែងរកសាខា...' : 'Filter campuses...'}
                  className="h-7 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#00509d] focus:bg-white"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="max-h-64 space-y-1 overflow-y-auto pt-1.5">
            {/* Super Admin "All Branches" Option */}
            {canUseAllBranches && !filterQuery && (
              <button
                type="button"
                onClick={() => handleSelectBranch('all')}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors',
                  currentBranchId === 'all'
                    ? 'bg-[#00509d]/10 font-semibold text-[#00509d]'
                    : 'text-slate-700 hover:bg-slate-50',
                )}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <Building2
                    className={cn(
                      'size-4.5 shrink-0',
                      currentBranchId === 'all' ? 'text-[#00509d]' : 'text-slate-500',
                    )}
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">{t.topbar.allBranches}</span>
                    <span className="truncate text-xs font-normal text-slate-400">
                      {isKhmer ? 'វិសាលភាពទូទាំងសាលា' : 'Cross-campus global scope'}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-600">
                    ALL
                  </span>
                  {currentBranchId === 'all' && <Check className="size-3.5 text-[#00509d]" />}
                </div>
              </button>
            )}

            {filteredBranches.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400">{t.common.noDataFound}</div>
            ) : (
              filteredBranches.map((branch) => {
                const isSelected = branch._id === currentBranchId;
                const primaryName = getLocalizedValue(branch.branchNameKh, branch.branchNameEn);
                const secondaryName = isKhmer ? branch.branchNameEn : branch.branchNameKh;

                return (
                  <button
                    key={branch._id}
                    type="button"
                    onClick={() => handleSelectBranch(branch._id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition-colors',
                      isSelected
                        ? 'bg-[#00509d]/10 font-semibold text-[#00509d]'
                        : 'text-slate-700 hover:bg-slate-50',
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Building2
                        className={cn(
                          'size-4.5 shrink-0',
                          isSelected ? 'text-[#00509d]' : 'text-slate-500',
                        )}
                      />
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate">{primaryName}</span>
                        {secondaryName && (
                          <span className="truncate text-xs font-normal text-slate-400">
                            {secondaryName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-slate-600">
                        {branch.branchCode}
                      </span>
                      {isSelected && <Check className="size-3.5 text-[#00509d]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {canManageBranches && (
            <div className="mt-1.5 border-t border-slate-100 pt-1.5">
              <Link
                href="/organization/branches"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#00509d]"
              >
                <div className="flex items-center gap-2">
                  <Plus className="size-3.5 text-slate-400" />
                  <span>{t.topbar.manageBranches}</span>
                </div>
                <span className="text-xs text-slate-400">→</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
