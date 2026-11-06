'use client';
/* eslint-disable react-hooks/refs */

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Search, ChevronDown, Check, X } from '@/components/icons';
import { popoverMotionVariants } from '@/lib/motion';

export interface DropdownOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

export interface SearchableDropdownProps {
  options: DropdownOption[];
  multiple?: boolean;
  value?: string | string[];
  onChange?: (val: string | string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  name?: string;
  theme?: 'light' | 'dark';
  className?: string;
  disabled?: boolean;
}

/**
 * SearchableDropdown
 *
 * Implements the 8-pillar accessible searchable combobox architecture:
 * 01 Trigger Button: Combobox surface with role="combobox", aria-haspopup="listbox", and aria-expanded.
 * 02 Removable Chips: Multi-select pill tokens inside trigger with dedicated labeled remove buttons.
 * 03 Auto-Focused Search: Opening panel immediately jumps focus into the filter input.
 * 04 Highlighted Matches: Matching characters in option labels wrapped in <mark> rendered in cyan.
 * 05 Grouped Options: Uppercase section labels splitting options; empty groups hide automatically.
 * 06 Active Descendant: DOM focus stays in search input while aria-activedescendant navigates options.
 * 07 Backspace-to-Remove: Backspace on empty search input pops the last chip in multi mode.
 * 08 Hidden Native Mirror: Invisible <select> mirrors form state for native submissions & autofill.
 */
export function SearchableDropdown({
  options,
  multiple = false,
  value,
  onChange,
  placeholder = multiple ? 'Select options...' : 'Select an option...',
  searchPlaceholder = 'Type to filter...',
  label,
  name,
  theme = 'light',
  className,
  disabled = false,
}: SearchableDropdownProps) {
  const isDark = theme === 'dark';
  const id = React.useId();
  const listboxId = `listbox-${id}`;
  const searchInputId = `search-${id}`;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);

  // Normalize selected state
  const selectedValues: string[] = React.useMemo(() => {
    if (value === undefined || value === null) return [];
    if (Array.isArray(value)) return value;
    return value ? [value] : [];
  }, [value]);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const listboxRef = React.useRef<HTMLDivElement>(null);

  // 03 Auto-Focused Search: Opening panel jumps focus to search input
  React.useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setHighlightedIndex(0);
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Click outside to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Filter options by search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;
    const q = searchQuery.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, searchQuery]);

  // 05 Grouped Options: Organize filtered options into groups
  const groupedOptions = React.useMemo(() => {
    const groups: Record<string, DropdownOption[]> = {};
    filteredOptions.forEach((opt) => {
      const g = opt.group || 'Options';
      if (!groups[g]) groups[g] = [];
      groups[g].push(opt);
    });
    return groups;
  }, [filteredOptions]);

  // Flattened array of available options for index traversal
  const flattenedFiltered = React.useMemo(() => {
    const list: DropdownOption[] = [];
    Object.values(groupedOptions).forEach((opts) => {
      list.push(...opts);
    });
    return list;
  }, [groupedOptions]);

  // Selection handlers
  const handleSelectOption = (optValue: string) => {
    if (multiple) {
      const exists = selectedValues.includes(optValue);
      const nextValues = exists
        ? selectedValues.filter((v) => v !== optValue)
        : [...selectedValues, optValue];
      onChange?.(nextValues);
      searchInputRef.current?.focus();
    } else {
      onChange?.(optValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleRemoveChip = (e: React.MouseEvent | React.KeyboardEvent, optValue: string) => {
    e.stopPropagation();
    if (multiple) {
      const next = selectedValues.filter((v) => v !== optValue);
      onChange?.(next);
      triggerRef.current?.focus();
    }
  };

  // 06 Active Descendant & 07 Backspace-to-Remove Keyboard Navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flattenedFiltered.length === 0) return;
      setHighlightedIndex((prev) => (prev + 1) % flattenedFiltered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flattenedFiltered.length === 0) return;
      setHighlightedIndex(
        (prev) => (prev - 1 + flattenedFiltered.length) % flattenedFiltered.length,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentOpt = flattenedFiltered[highlightedIndex];
      if (currentOpt && !currentOpt.disabled) {
        handleSelectOption(currentOpt.value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (
      e.key === 'Backspace' &&
      searchQuery === '' &&
      multiple &&
      selectedValues.length > 0
    ) {
      // 07 Backspace-to-Remove: Backspace on empty input removes last chip
      e.preventDefault();
      const next = [...selectedValues];
      next.pop();
      onChange?.(next);
    }
  };

  // 04 Highlighted Matches helper
  const renderHighlightedLabel = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="rounded-xs bg-cyan-500/20 px-0.5 font-bold text-cyan-600 dark:bg-cyan-500/30 dark:text-cyan-300"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const activeDescendantId = flattenedFiltered[highlightedIndex]
    ? `opt-${id}-${flattenedFiltered[highlightedIndex].value}`
    : undefined;

  // Selected Option objects for rendering labels / chips
  const selectedOptions = React.useMemo(() => {
    return selectedValues
      .map((val) => options.find((o) => o.value === val))
      .filter(Boolean) as DropdownOption[];
  }, [selectedValues, options]);

  return (
    <div ref={containerRef} className={cn('relative inline-block w-full select-none', className)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={`trigger-${id}`}
          className={cn(
            'mb-1.5 block font-mono text-xs font-bold',
            isDark ? 'text-slate-300' : 'text-slate-700',
          )}
        >
          {label}
        </label>
      )}

      {/* ======================================================== */}
      {/* 08 HIDDEN NATIVE MIRROR: Preserves HTML form submissions */}
      {/* ======================================================== */}
      <select
        aria-hidden="true"
        tabIndex={-1}
        name={name}
        multiple={multiple}
        value={multiple ? selectedValues : selectedValues[0] || ''}
        onChange={() => {}}
        className="sr-only"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* ======================================================== */}
      {/* 01 TRIGGER BUTTON: Accessible Combobox Surface           */}
      {/* ======================================================== */}
      <button
        id={`trigger-${id}`}
        ref={triggerRef}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex min-h-[42px] w-full items-center justify-between gap-2 rounded-[4px] border px-3 py-1.5 font-sans text-xs transition-all duration-150 outline-none active:scale-[0.97]',
          'focus-visible:ring-2 focus-visible:ring-[#0056FF]',
          isOpen
            ? 'border-[#0056FF] ring-1 ring-[#0056FF]'
            : isDark
              ? 'border-slate-700 bg-slate-900/90 text-white hover:border-slate-600'
              : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400',
          disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 truncate">
          {/* 02 REMOVABLE CHIPS (Multiple Mode) */}
          {multiple && selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className={cn(
                  'inline-flex items-center gap-1 rounded-[4px] border px-2 py-0.5 font-mono text-[11px] font-semibold transition-colors',
                  isDark
                    ? 'border-cyan-500/30 bg-cyan-500/15 text-cyan-300'
                    : 'border-[#CAD3F5] bg-[#E3E7FC] text-[#0056FF]',
                )}
              >
                <span>{opt.label}</span>
                <span
                  role="button"
                  aria-label={`Remove ${opt.label}`}
                  tabIndex={0}
                  onClick={(e) => handleRemoveChip(e, opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleRemoveChip(e, opt.value);
                    }
                  }}
                  className="rounded-xs p-0.5 text-slate-500 transition-colors hover:bg-slate-900/10 hover:text-red-500 dark:hover:bg-white/10"
                >
                  <X className="size-2.5" />
                </span>
              </span>
            ))
          ) : !multiple && selectedOptions.length > 0 ? (
            <span className="font-sans font-medium text-slate-900 dark:text-white">
              {selectedOptions[0].label}
            </span>
          ) : (
            <span className="font-sans text-slate-400">{placeholder}</span>
          )}
        </div>

        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180 text-[#0056FF] dark:text-[#38BDF8]',
          )}
        />
      </button>

      {/* ======================================================== */}
      {/* COMBOBOX POPOVER PANEL                                   */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={popoverMotionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'absolute left-0 z-50 mt-1.5 w-full min-w-[280px] overflow-hidden rounded-[4px] border border-[#CAD3F5] bg-white text-slate-900 shadow-md',
            )}
          >
            {/* 03 Auto-Focused Search Input */}
            <div className="relative border-b border-slate-100 p-2.5 dark:border-slate-800">
              <Search className="absolute top-1/2 left-5 size-3.5 -translate-y-1/2 text-slate-400" />
              <input
                id={searchInputId}
                ref={searchInputRef}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls={listboxId}
                // 06 Active Descendant wiring
                aria-activedescendant={activeDescendantId}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder={searchPlaceholder}
                className={cn(
                  'w-full rounded-[4px] border py-1.5 pr-3 pl-8 font-sans text-xs transition-colors outline-none',
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:border-[#38BDF8]'
                    : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-[#0056FF] focus:bg-white',
                )}
              />
            </div>

            {/* ======================================================== */}
            {/* 05 GROUPED OPTIONS & 06 ACTIVE DESCENDANT LISTBOX        */}
            {/* ======================================================== */}
            <div
              id={listboxId}
              ref={listboxRef}
              role="listbox"
              aria-multiselectable={multiple}
              className="max-h-60 space-y-1 overflow-y-auto p-1.5"
            >
              {flattenedFiltered.length === 0 ? (
                <div className="p-4 text-center font-mono text-xs text-slate-400">
                  No matching options found.
                </div>
              ) : (
                Object.entries(groupedOptions).map(([groupName, groupOpts]) => {
                  if (groupOpts.length === 0) return null;

                  return (
                    <div key={groupName} className="space-y-0.5">
                      {/* Section Label */}
                      <div className="px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        {groupName}
                      </div>

                      {groupOpts.map((opt) => {
                        const isSelected = selectedValues.includes(opt.value);
                        const optIndex = flattenedFiltered.findIndex((o) => o.value === opt.value);
                        const isHighlighted = optIndex === highlightedIndex;

                        return (
                          <div
                            key={opt.value}
                            id={`opt-${id}-${opt.value}`}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={opt.disabled}
                            onClick={() => !opt.disabled && handleSelectOption(opt.value)}
                            onMouseEnter={() => setHighlightedIndex(optIndex)}
                            className={cn(
                              'flex cursor-pointer items-center justify-between gap-2 rounded-[4px] px-2.5 py-1.5 font-sans text-xs transition-colors',
                              // 06 Active Descendant highlight state
                              isHighlighted &&
                                (isDark
                                  ? 'bg-slate-800/80 text-white'
                                  : 'bg-slate-100 text-slate-950'),
                              isSelected &&
                                (isDark
                                  ? 'bg-cyan-500/15 font-semibold text-cyan-300'
                                  : 'bg-[#E3E7FC]/60 font-semibold text-[#0056FF]'),
                              opt.disabled && 'cursor-not-allowed opacity-40',
                            )}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {/* Checkbox square in multiple mode */}
                              {multiple && (
                                <div
                                  className={cn(
                                    'flex size-3.5 items-center justify-center rounded border transition-colors',
                                    isSelected
                                      ? 'border-[#0056FF] bg-[#0056FF] text-white dark:border-cyan-500 dark:bg-cyan-500'
                                      : isDark
                                        ? 'border-slate-700 bg-slate-800'
                                        : 'border-slate-300 bg-white',
                                  )}
                                >
                                  {isSelected && <Check className="size-2.5 stroke-[3]" />}
                                </div>
                              )}

                              {/* 04 Highlighted Matches */}
                              <span className="truncate">
                                {renderHighlightedLabel(opt.label, searchQuery)}
                              </span>
                            </div>

                            {/* Selected checkmark in single mode */}
                            {!multiple && isSelected && (
                              <Check className="size-3.5 text-[#0056FF] dark:text-[#38BDF8]" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Instruction */}
            <div
              className={cn(
                'flex items-center justify-between border-t px-3 py-1.5 font-mono text-[10px] text-slate-400',
                isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-100 bg-slate-50/60',
              )}
            >
              <span>Navigate with &uarr;&darr; &bull; Enter to select</span>
              {multiple && <span>Backspace removes tag</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SAMPLE_INSTITUTIONAL_OPTIONS: DropdownOption[] = [
  { value: 'cs-ai', label: 'Computer Science & AI', group: 'Engineering & Computing' },
  { value: 'cyber-sec', label: 'Cybersecurity & Cryptography', group: 'Engineering & Computing' },
  { value: 'cloud-arch', label: 'Cloud Systems Architecture', group: 'Engineering & Computing' },
  { value: 'data-eng', label: 'Distributed Data Engineering', group: 'Engineering & Computing' },
  { value: 'fintech', label: 'Financial Technology (FinTech)', group: 'Digital Business' },
  { value: 'biz-analytics', label: 'Business Analytics & BI', group: 'Digital Business' },
  { value: 'e-commerce', label: 'E-Commerce Operations', group: 'Digital Business' },
  { value: 'ui-ux', label: 'UI/UX Interface Architecture', group: 'Creative Technology' },
  { value: 'motion-design', label: 'Interactive Motion Design', group: 'Creative Technology' },
  { value: 'digital-media', label: 'Digital Media Production', group: 'Creative Technology' },
];

/**
 * SearchableDropdownDemo
 *
 * Interactive documentation library preview showcasing both Single and Multi-Select instances.
 */
export function SearchableDropdownDemo() {
  const [singleValue, setSingleValue] = React.useState<string>('cs-ai');
  const [multiValue, setMultiValue] = React.useState<string[]>(['cyber-sec', 'ui-ux', 'fintech']);

  return (
    <div className="w-full space-y-6">
      {/* Two Instances: Single-Select & Multi-Select side by side */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Instance 1: Single-Select Mode */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#0056FF] uppercase">
              Instance 01 &middot; Single-Select
            </span>
            <h4 className="font-sans text-xs font-bold text-slate-900">
              Primary Academic Department
            </h4>
          </div>

          <SearchableDropdown
            multiple={false}
            options={SAMPLE_INSTITUTIONAL_OPTIONS}
            value={singleValue}
            onChange={(val) => setSingleValue(val as string)}
            placeholder="Choose Department..."
            theme="light"
          />

          <div className="font-mono text-[11px] text-slate-400">
            Selected ID: <span className="font-bold text-slate-900">{singleValue || 'None'}</span>
          </div>
        </div>

        {/* Instance 2: Multi-Select Mode with Removable Chips */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="space-y-1">
            <span className="font-mono text-[10px] font-bold tracking-wider text-[#0056FF] uppercase">
              Instance 02 &middot; Multi-Select Chips
            </span>
            <h4 className="font-sans text-xs font-bold text-slate-900">
              Specialization Electives & Skill Tags
            </h4>
          </div>

          <SearchableDropdown
            multiple={true}
            options={SAMPLE_INSTITUTIONAL_OPTIONS}
            value={multiValue}
            onChange={(val) => setMultiValue(val as string[])}
            placeholder="Select specializations..."
            theme="light"
          />

          <div className="font-mono text-[11px] text-slate-400">
            Selected Tags ({multiValue.length}):{' '}
            <span className="font-bold text-slate-900">{multiValue.join(', ') || 'None'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
