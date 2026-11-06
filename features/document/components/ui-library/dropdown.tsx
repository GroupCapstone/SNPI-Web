'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Search, X, Building2 } from '@/components/icons';
import {
  popoverMotionVariants,
  listContainerVariants,
  listRowVariants,
  WHILE_TAP_SCALE,
  iconCrossfadeBlurVariants,
} from '@/lib/motion';

export interface LibraryDropdownOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
  meta?: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface LibraryDropdownProps {
  label?: string;
  placeholder?: string;
  options: LibraryDropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function LibraryDropdown({
  label,
  placeholder = 'Select an institutional branch...',
  options,
  value,
  onChange,
  className,
  disabled = false,
  searchable = true,
  searchPlaceholder = 'Search campus name or branch code...',
}: LibraryDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        (opt.badge && opt.badge.toLowerCase().includes(q)) ||
        (opt.description && opt.description.toLowerCase().includes(q)),
    );
  }, [options, searchQuery]);

  // Reset search when opening/closing
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      const initialIdx = filteredOptions.findIndex((opt) => opt.value === value);
      setActiveIndex(initialIdx >= 0 ? initialIdx : 0);
      // Auto focus search input
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, filteredOptions, value]);

  // Click outside and Escape handling
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
          const selected = filteredOptions[activeIndex];
          if (!selected.disabled) {
            onChange(selected.value);
            setIsOpen(false);
          }
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  }

  // Auto-scroll active option into view during keyboard navigation
  React.useEffect(() => {
    if (isOpen && activeIndex >= 0 && listboxRef.current) {
      const activeEl = listboxRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex, isOpen]);

  const TriggerIcon = selectedOption?.icon || Building2;

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={cn('relative inline-block w-full text-left', className)}
    >
      {/* Optional Top Label */}
      {label && (
        <div className="mb-1.5 flex items-center justify-between">
          <label className="font-sans text-xs font-semibold text-[#0A1A4A]">{label}</label>
        </div>
      )}

      {/* Modern Clean Trigger Button - Motion Law 4: Scale to 0.97 on press */}
      <motion.button
        type="button"
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : WHILE_TAP_SCALE }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'group relative flex min-h-[48px] w-full cursor-pointer items-center justify-between gap-3 rounded-[4px] border px-3 py-2 transition-colors select-none focus-visible:outline-none',
          isOpen
            ? 'border-[#0056FF] bg-white ring-1 ring-[#0056FF]/20'
            : 'border-[#CAD3F5] bg-white hover:border-[#0056FF] hover:bg-[#EFF5FF]/25',
          disabled && 'cursor-not-allowed bg-slate-100 opacity-50',
        )}
      >
        {/* Left: Domain Campus Icon */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <TriggerIcon
            className={cn(
              'size-4.5 shrink-0 stroke-[2] transition-colors',
              selectedOption ? 'text-[#020617]' : 'text-slate-400',
            )}
          />

          {/* Center: Campus Details */}
          <div className="flex min-w-0 flex-col text-left">
            <span
              className={cn(
                'truncate font-sans text-xs font-bold sm:text-sm',
                selectedOption ? 'text-[#0A1A4A]' : 'font-normal text-slate-400',
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            {selectedOption?.description && (
              <span className="truncate font-sans text-[11px] text-[#334155]">
                {selectedOption.description}
              </span>
            )}
          </div>
        </div>

        {/* Right: Badges & Chevron (Clean, Zero Dots) */}
        <div className="flex shrink-0 items-center gap-2">
          {selectedOption?.badge && (
            <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0056FF]">
              {selectedOption.badge}
            </span>
          )}

          {/* Rotating Chevron */}
          <div
            className={cn(
              'flex size-5 items-center justify-center transition-transform duration-200',
              isOpen ? 'rotate-180 text-[#0056FF]' : 'text-slate-400 group-hover:text-[#0056FF]',
            )}
          >
            <ChevronDown className="size-4 stroke-[2]" />
          </div>
        </div>
      </motion.button>

      {/* Dropdown Menu Popover Panel - Motion Laws:
          1. Ease-out entrance
          2. 150-250ms duration (200ms)
          10. Start popover at 0.95 scale
          11. Enter from trigger
          12. Exit to trigger
          13. Zero bounce everyday physics
          15. Exit 20% shorter (160ms)
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            tabIndex={-1}
            variants={popoverMotionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 left-0 z-50 mt-1.5 overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-white shadow-md"
          >
            {/* Top Quick Search Filter */}
            {searchable && (
              <div className="border-b border-[#CAD3F5]/60 bg-[#EFF5FF]/30 p-2">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 size-3.5 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-8 w-full rounded-[4px] border border-[#CAD3F5] bg-white pr-7 pl-8 font-sans text-xs font-medium text-[#0A1A4A] placeholder-slate-400 transition-colors focus:border-[#0056FF] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 flex size-4 cursor-pointer items-center justify-center rounded-[2px] text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Directory Count Header */}
            <div className="flex items-center justify-between border-b border-[#CAD3F5]/60 bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
              <span>Institutional Branch Directory</span>
              <span>{filteredOptions.length} Campuses</span>
            </div>

            {/* Options Listbox - Motion Law 3: Stagger list rows by 30ms */}
            <motion.div
              ref={listboxRef}
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="no-scrollbar max-h-64 space-y-1 overflow-y-auto p-1.5"
            >
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="font-sans text-xs font-bold text-slate-600">No campuses found</p>
                  <p className="mt-0.5 font-sans text-[11px] text-slate-400">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                filteredOptions.map((option, idx) => {
                  const isSelected = option.value === value;
                  const isKeyboardActive = activeIndex === idx;
                  const OptionIcon = option.icon || Building2;

                  return (
                    <motion.button
                      key={option.value}
                      type="button"
                      role="option"
                      variants={listRowVariants}
                      whileTap={{ scale: option.disabled ? 1 : 0.98 }}
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={cn(
                        'group relative flex w-full cursor-pointer items-start justify-between gap-3 rounded-[4px] border p-2.5 text-left transition-colors select-none',
                        isSelected
                          ? 'border-[#0056FF] bg-[#EFF5FF]'
                          : isKeyboardActive
                            ? 'border-[#CAD3F5] bg-[#EFF5FF]/50 text-[#0056FF]'
                            : 'border-transparent bg-white hover:border-[#CAD3F5] hover:bg-[#EFF5FF]/30',
                        option.disabled && 'cursor-not-allowed opacity-40',
                      )}
                    >
                      {/* Left Icon */}
                      <OptionIcon
                        className={cn(
                          'mt-0.5 size-4.5 shrink-0 stroke-[2] transition-colors',
                          isSelected ? 'text-[#0056FF]' : 'text-[#020617]',
                        )}
                      />

                      {/* Content: Title, Description, Meta */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'truncate font-sans text-xs font-bold sm:text-sm',
                              isSelected ? 'text-[#0056FF]' : 'text-[#0A1A4A]',
                            )}
                          >
                            {option.label}
                          </span>
                          {option.badge && (
                            <span className="rounded-[2px] border border-[#CAD3F5] bg-[#E3E7FC] px-1 py-0.2 font-mono text-[9px] font-bold text-[#0056FF]">
                              {option.badge}
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <span className="truncate font-sans text-[11px] text-[#334155]">
                            {option.description}
                          </span>
                        )}
                        {option.meta && (
                          <span className="mt-0.5 font-mono text-[9px] text-slate-400">
                            {option.meta}
                          </span>
                        )}
                      </div>

                      {/* Right Checkmark - Motion Law 18: Crossfade Icons + Blur */}
                      <div className="flex size-5 shrink-0 items-center justify-center pt-0.5">
                        {isSelected && (
                          <motion.div
                            variants={iconCrossfadeBlurVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex size-4 items-center justify-center rounded-[2px] bg-[#0056FF] text-white"
                          >
                            <Check className="size-3 stroke-[2.5]" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  );
                })
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
