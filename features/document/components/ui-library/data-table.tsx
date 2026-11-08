/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search, X, ChevronDown, ChevronLeft, ChevronRight } from '@/components/icons';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface DataTableColumn<T = any> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  type?: 'string' | 'number' | 'date';
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: DataTableColumn<T>[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  searchPlaceholder?: string;
  theme?: 'light' | 'dark';
  className?: string;
  title?: string;
  subtitle?: string;
}

// 06 Status Pill Helper
export function StatusPill({ status }: { status: string }) {
  const normalized = status.toLowerCase();

  let pillClasses = 'bg-[#ECFDF5] text-emerald-800 border-emerald-300';

  if (['pending', 'review', 'in review'].includes(normalized)) {
    pillClasses = 'bg-[#EFF5FF] text-[#0056FF] border-[#CAD3F5]';
  } else if (['probation', 'partial'].includes(normalized)) {
    pillClasses = 'bg-[#FFFBEB] text-amber-800 border-amber-300';
  } else if (['suspended', 'failed', 'dropped', 'overdue', 'rejected'].includes(normalized)) {
    pillClasses = 'bg-[#FEF2F2] text-rose-800 border-rose-300';
  } else if (['inactive', 'archived', 'draft', 'withdrawn'].includes(normalized)) {
    pillClasses = 'bg-[#F8FAFC] text-slate-700 border-[#CAD3F5]';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[4px] border px-2.5 py-0.5 font-sans text-xs font-bold select-none',
        pillClasses,
      )}
    >
      {status}
    </span>
  );
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchPlaceholder = 'Search records across all columns...',
  theme = 'light',
  className,
  title,
  subtitle,
}: DataTableProps<T>) {
  const isDark = theme === 'dark';

  // 01 Search Input State with Debounce
  const [searchInput, setSearchInput] = React.useState('');
  const [debouncedQuery, setDebouncedQuery] = React.useState('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // 03 & 04 Sort State (Tri-state click cycle: none -> asc -> desc -> none)
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('none');

  const handleHeaderSort = (colKey: string, isSortable = true) => {
    if (!isSortable) return;

    if (sortKey !== colKey) {
      setSortKey(colKey);
      setSortDirection('asc');
    } else {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection('none');
      } else {
        setSortDirection('asc');
      }
    }
  };

  // 05 Comparator: Type-aware and Stable
  const getNestedValue = (obj: any, key: string): any => {
    if (!obj) return '';
    return obj[key];
  };

  // Filter across all columns
  const filteredData = React.useMemo(() => {
    if (!debouncedQuery) return data;
    const lowerQuery = debouncedQuery.toLowerCase();

    return data.filter((row) => {
      return columns.some((col) => {
        const val = getNestedValue(row, col.key as string);
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, debouncedQuery, columns]);

  // Sort with stable insertion index fallback
  const sortedData = React.useMemo(() => {
    if (!sortKey || sortDirection === 'none') {
      return filteredData;
    }

    const colDef = columns.find((c) => (c.key as string) === sortKey);
    const colType = colDef?.type || 'string';

    const indexed = filteredData.map((item, index) => ({ item, index }));

    indexed.sort((a, b) => {
      const valA = getNestedValue(a.item, sortKey);
      const valB = getNestedValue(b.item, sortKey);

      let comparison = 0;

      if (valA === valB) {
        comparison = 0;
      } else if (valA === null || valA === undefined) {
        comparison = 1;
      } else if (valB === null || valB === undefined) {
        comparison = -1;
      } else if (colType === 'number') {
        const numA = Number(valA);
        const numB = Number(valB);
        comparison = (isNaN(numA) ? 0 : numA) - (isNaN(numB) ? 0 : numB);
      } else if (colType === 'date') {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        comparison = (isNaN(dateA) ? 0 : dateA) - (isNaN(dateB) ? 0 : dateB);
      } else {
        comparison = String(valA).localeCompare(String(valB), undefined, { numeric: true });
      }

      if (comparison !== 0) {
        return sortDirection === 'asc' ? comparison : -comparison;
      }

      // Stable sort preservation
      return a.index - b.index;
    });

    return indexed.map((x) => x.item);
  }, [filteredData, sortKey, sortDirection, columns]);

  // 08 & 09 Pagination and Page Size Re-clamping
  const [pageSize, setPageSize] = React.useState(initialPageSize);
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

  // Auto-clamp page if filtering or page size shrinks total pages
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    const newTotalPages = Math.max(1, Math.ceil(sortedData.length / newSize));
    setCurrentPage((prev) => Math.min(prev, newTotalPages));
  };

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // 07 Sticky Header with Scroll Shadow Detection
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setHasScrolled(scrollContainerRef.current.scrollTop > 2);
    }
  };

  // 02 Live Result Count Calculations
  const startRecord = sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, sortedData.length);

  // Pagination page pills window
  const getPageNumbers = () => {
    const delta = 1;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if ((i as number) - l === 2) {
          rangeWithDots.push(l + 1);
        } else if ((i as number) - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i as number;
    }

    return rangeWithDots;
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden border-slate-200/90 bg-white text-slate-900 shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-colors duration-150 max-sm:rounded-none max-sm:border-x-0 max-sm:border-y sm:rounded-2xl sm:border',
        className,
      )}
    >
      {/* Top Controls Header: Search Box & Controls */}
      <div className="flex flex-col gap-3.5 border-b border-slate-200/80 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title or Filter Input */}
        <div className="flex flex-1 flex-col gap-1 sm:max-w-md">
          {title && (
            <div className="flex items-center gap-2">
              <h3 className="font-sans text-sm font-bold tracking-tight text-slate-950">{title}</h3>
              {subtitle && <span className="font-sans text-xs text-slate-500">{subtitle}</span>}
            </div>
          )}

          {/* 01 Search Input */}
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 stroke-[2.5] text-[#0056FF]" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 w-full rounded-[4px] border border-slate-200 bg-white pr-8 pl-9 font-sans text-xs font-medium text-slate-900 transition-colors placeholder:text-slate-400 focus:border-[#0056FF] focus:ring-1 focus:ring-[#0056FF] focus:outline-none"
              aria-label="Filter records"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-[4px] p-0.5 text-slate-400 transition-colors hover:text-slate-700"
                aria-label="Clear search filter"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 02 Result Count & 09 Page Size Selector */}
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-center">
          {/* 02 Live Result Count Region (with aria-live) */}
          <div
            aria-live="polite"
            className="font-mono text-xs font-semibold text-slate-500 tabular-nums"
          >
            Showing{' '}
            <span className="text-slate-900">
              {startRecord}-{endRecord}
            </span>{' '}
            of <span className="text-slate-900">{sortedData.length}</span>
          </div>

          {/* 09 Page Size Dropdown */}
          <div className="flex items-center gap-1.5 font-sans text-xs">
            <span className="text-slate-500">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="h-8 rounded-[4px] border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-semibold text-slate-800 transition-colors focus:border-[#0056FF] focus:outline-none"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 07 Sticky Header Table Body Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="max-h-[440px] overflow-x-auto overflow-y-auto"
      >
        <table className="w-full border-collapse text-left text-xs">
          {/* 07 Sticky Thead with dynamic shadow */}
          <thead
            className={cn(
              'sticky top-0 z-10 bg-[#EFF5FF] transition-shadow duration-150',
              hasScrolled ? 'border-b border-[#CAD3F5] shadow-xs' : 'border-b border-[#CAD3F5]',
            )}
          >
            <tr>
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const isSortable = col.sortable !== false;
                const colKeyStr = col.key as string;

                return (
                  <th
                    key={colKeyStr}
                    style={{ width: col.width }}
                    tabIndex={isSortable ? 0 : undefined}
                    role={isSortable ? 'button' : undefined}
                    aria-sort={
                      isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined
                    }
                    onClick={() => handleHeaderSort(colKeyStr, isSortable)}
                    onKeyDown={(e) => {
                      if (isSortable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleHeaderSort(colKeyStr, true);
                      }
                    }}
                    className={cn(
                      'px-4 py-3 font-sans text-xs font-bold tracking-wider uppercase transition-colors select-none',
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                          ? 'text-right'
                          : 'text-left',
                      isSortable ? 'cursor-pointer hover:text-[#0056FF]' : '',
                      isSorted ? 'text-[#0056FF]' : 'text-[#020617]',
                    )}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-1.5',
                        col.align === 'center'
                          ? 'justify-center'
                          : col.align === 'right'
                            ? 'justify-end'
                            : 'justify-start',
                      )}
                    >
                      <span>{col.header}</span>

                      {/* 04 Animated Rotating Caret Indicator */}
                      {isSortable && (
                        <span
                          className={cn(
                            'inline-block transition-transform duration-200',
                            isSorted && sortDirection === 'desc' ? 'rotate-180' : 'rotate-0',
                            isSorted ? 'text-[#0056FF]' : 'text-slate-400',
                          )}
                        >
                          <ChevronDown className="size-3.5" />
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#CAD3F5]/60 font-sans text-xs text-[#020617]">
            {paginatedData.length > 0
              ? paginatedData.map((row, idx) => (
                  <tr
                    key={String(row.id || idx)}
                    className="transition-colors duration-100 hover:bg-[#EFF5FF]/60"
                  >
                    {columns.map((col) => {
                      const colKeyStr = col.key as string;
                      const val = getNestedValue(row, colKeyStr);

                      return (
                        <td
                          key={colKeyStr}
                          className={cn(
                            'px-4 py-3 align-middle',
                            col.align === 'center'
                              ? 'text-center'
                              : col.align === 'right'
                                ? 'text-right'
                                : 'text-left',
                          )}
                        >
                          {col.render ? (
                            col.render(val, row)
                          ) : col.type === 'number' ? (
                            <span className="font-mono tabular-nums">{String(val ?? '')}</span>
                          ) : (
                            String(val ?? '')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        {/* 10 Empty State */}
        {paginatedData.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <Search className="size-8 stroke-[2.5] text-[#0056FF]" />
            <h4 className="mt-3 font-sans text-sm font-bold text-slate-900">No records found</h4>
            <p className="mt-1 max-w-sm font-sans text-xs text-slate-500">
              No matching results found for{' '}
              <span className="font-semibold text-slate-800">&ldquo;{debouncedQuery}&rdquo;</span>.
              Try searching by student code, full name, or status.
            </p>
            <button
              type="button"
              onClick={() => setSearchInput('')}
              className="mt-4 rounded-[4px] border border-[#CAD3F5] bg-[#E3E7FC] px-3.5 py-1.5 font-sans text-xs font-bold text-[#0056FF] transition-all hover:bg-[#0056FF] hover:text-white"
            >
              Clear search filter
            </button>
          </div>
        )}
      </div>

      {/* 08 Pagination Nav Footer */}
      <div className="flex flex-col gap-3 border-t border-slate-200/80 bg-slate-50/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          className={cn(
            'font-mono text-xs font-medium',
            'font-mono text-xs font-semibold text-slate-700',
          )}
        >
          Page {currentPage} of {totalPages}
        </span>

        {/* Navigation Buttons: First, Prev, Numbers, Next, Last */}
        <div className="flex items-center gap-1 self-center sm:self-auto">
          {/* First Page */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className={cn(
              'flex size-8 items-center justify-center rounded-[4px] border font-mono text-xs font-bold transition-colors select-none',
              currentPage === 1
                ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                : 'border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
            aria-label="First page"
          >
            &laquo;
          </button>

          {/* Previous Page */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={cn(
              'flex size-8 items-center justify-center rounded-[4px] border transition-colors select-none',
              currentPage === 1
                ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                : 'border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          {/* Page Number Pills */}
          {getPageNumbers().map((p, i) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${i}`} className="px-1.5 font-mono text-xs text-slate-400">
                  ...
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  'flex size-8 items-center justify-center rounded-[4px] border font-mono text-xs font-bold transition-all select-none',
                  isActive
                    ? 'border-[#0056FF] bg-[#0056FF] text-white shadow-xs'
                    : 'border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
                )}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Page */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={cn(
              'flex size-8 items-center justify-center rounded-[4px] border transition-colors select-none',
              currentPage === totalPages
                ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                : 'border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
            aria-label="Next page"
          >
            <ChevronRight className="size-3.5" />
          </button>

          {/* Last Page */}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={cn(
              'flex size-8 items-center justify-center rounded-[4px] border font-mono text-xs font-bold transition-colors select-none',
              currentPage === totalPages
                ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300'
                : 'border-[#CAD3F5] bg-white text-[#020617] hover:border-[#0056FF] hover:bg-[#EFF5FF] hover:text-[#0056FF]',
            )}
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SAMPLE DATASET & INTERACTIVE DEMO EXPORT
// ==========================================

export interface StudentRecord {
  [key: string]: any;
  id: string;
  code: string;
  name: string;
  program: string;
  gpa: number;
  enrollmentDate: string;
  status: 'Active' | 'Pending' | 'Probation' | 'Suspended' | 'Archived';
  tuitionFee: number;
}

export const SAMPLE_STUDENT_RECORDS: StudentRecord[] = [
  {
    id: 'rec-01',
    code: 'STU-2026-001',
    name: 'Sokha Chan',
    program: 'Computer Science',
    gpa: 3.88,
    enrollmentDate: '2026-01-15',
    status: 'Active',
    tuitionFee: 1200,
  },
  {
    id: 'rec-02',
    code: 'STU-2026-002',
    name: 'Bopha Pich',
    program: 'Business Administration',
    gpa: 3.42,
    enrollmentDate: '2026-01-18',
    status: 'Active',
    tuitionFee: 950,
  },
  {
    id: 'rec-03',
    code: 'STU-2026-003',
    name: 'Dara Heng',
    program: 'Data Engineering',
    gpa: 2.75,
    enrollmentDate: '2026-02-01',
    status: 'Probation',
    tuitionFee: 1200,
  },
  {
    id: 'rec-04',
    code: 'STU-2026-004',
    name: 'Kalyan Vong',
    program: 'Digital Design',
    gpa: 3.95,
    enrollmentDate: '2026-01-20',
    status: 'Active',
    tuitionFee: 1100,
  },
  {
    id: 'rec-05',
    code: 'STU-2026-005',
    name: 'Rithy Meas',
    program: 'Information Technology',
    gpa: 3.1,
    enrollmentDate: '2026-02-10',
    status: 'Pending',
    tuitionFee: 1050,
  },
  {
    id: 'rec-06',
    code: 'STU-2026-006',
    name: 'Sreymom Keo',
    program: 'Software Architecture',
    gpa: 3.72,
    enrollmentDate: '2026-01-12',
    status: 'Active',
    tuitionFee: 1250,
  },
  {
    id: 'rec-07',
    code: 'STU-2026-007',
    name: 'Visal Chea',
    program: 'Network Engineering',
    gpa: 2.45,
    enrollmentDate: '2026-02-14',
    status: 'Suspended',
    tuitionFee: 1050,
  },
  {
    id: 'rec-08',
    code: 'STU-2026-008',
    name: 'Panha Sem',
    program: 'Computer Science',
    gpa: 3.65,
    enrollmentDate: '2026-01-25',
    status: 'Active',
    tuitionFee: 1200,
  },
  {
    id: 'rec-09',
    code: 'STU-2026-009',
    name: 'Leakhena Ros',
    program: 'Business Administration',
    gpa: 3.55,
    enrollmentDate: '2026-01-22',
    status: 'Active',
    tuitionFee: 950,
  },
  {
    id: 'rec-10',
    code: 'STU-2026-010',
    name: 'Chamroeun Yim',
    program: 'Cybersecurity',
    gpa: 3.82,
    enrollmentDate: '2026-01-16',
    status: 'Active',
    tuitionFee: 1300,
  },
  {
    id: 'rec-11',
    code: 'STU-2026-011',
    name: 'Theara Long',
    program: 'Data Engineering',
    gpa: 3.2,
    enrollmentDate: '2026-02-05',
    status: 'Pending',
    tuitionFee: 1200,
  },
  {
    id: 'rec-12',
    code: 'STU-2026-012',
    name: 'Monyrith Mao',
    program: 'Software Architecture',
    gpa: 3.91,
    enrollmentDate: '2026-01-14',
    status: 'Active',
    tuitionFee: 1250,
  },
  {
    id: 'rec-13',
    code: 'STU-2026-013',
    name: 'Sophea Noun',
    program: 'Digital Design',
    gpa: 2.89,
    enrollmentDate: '2026-02-18',
    status: 'Probation',
    tuitionFee: 1100,
  },
  {
    id: 'rec-14',
    code: 'STU-2026-014',
    name: 'Vicheka Son',
    program: 'Information Technology',
    gpa: 3.6,
    enrollmentDate: '2026-01-30',
    status: 'Active',
    tuitionFee: 1050,
  },
  {
    id: 'rec-15',
    code: 'STU-2026-015',
    name: 'Kunthea Phann',
    program: 'Business Administration',
    gpa: 3.78,
    enrollmentDate: '2026-01-19',
    status: 'Active',
    tuitionFee: 950,
  },
  {
    id: 'rec-16',
    code: 'STU-2026-016',
    name: 'Serey Khun',
    program: 'Cybersecurity',
    gpa: 3.45,
    enrollmentDate: '2026-02-02',
    status: 'Active',
    tuitionFee: 1300,
  },
  {
    id: 'rec-17',
    code: 'STU-2026-017',
    name: 'Phalla Chum',
    program: 'Network Engineering',
    gpa: 1.95,
    enrollmentDate: '2026-02-22',
    status: 'Archived',
    tuitionFee: 1050,
  },
  {
    id: 'rec-18',
    code: 'STU-2026-018',
    name: 'Ratanak Tea',
    program: 'Computer Science',
    gpa: 3.85,
    enrollmentDate: '2026-01-10',
    status: 'Active',
    tuitionFee: 1200,
  },
  {
    id: 'rec-19',
    code: 'STU-2026-019',
    name: 'Chanthy Bun',
    program: 'Data Engineering',
    gpa: 3.35,
    enrollmentDate: '2026-02-08',
    status: 'Active',
    tuitionFee: 1200,
  },
  {
    id: 'rec-20',
    code: 'STU-2026-020',
    name: 'Sovann Men',
    program: 'Software Architecture',
    gpa: 3.98,
    enrollmentDate: '2026-01-11',
    status: 'Active',
    tuitionFee: 1250,
  },
];

export function DataTableDemo() {
  const columns: DataTableColumn<StudentRecord>[] = [
    {
      key: 'code',
      header: 'Student ID',
      sortable: true,
      type: 'string',
      width: '130px',
      render: (val) => <span className="font-mono text-xs font-bold text-[#0056FF]">{val}</span>,
    },
    {
      key: 'name',
      header: 'Student Name',
      sortable: true,
      type: 'string',
      render: (val) => <span className="font-sans text-xs font-bold text-[#020617]">{val}</span>,
    },
    {
      key: 'program',
      header: 'Program / Major',
      sortable: true,
      type: 'string',
      render: (val) => (
        <span className="font-sans text-xs font-semibold text-[#020617]">{val}</span>
      ),
    },
    {
      key: 'gpa',
      header: 'GPA',
      sortable: true,
      type: 'number',
      align: 'center',
      width: '90px',
      render: (val) => {
        const num = Number(val);
        const isHigh = num >= 3.5;
        const isLow = num < 2.5;
        return (
          <span
            className={cn(
              'font-mono text-xs font-black tabular-nums',
              isHigh ? 'text-emerald-700' : isLow ? 'text-rose-700' : 'text-[#020617]',
            )}
          >
            {num.toFixed(2)}
          </span>
        );
      },
    },
    {
      key: 'enrollmentDate',
      header: 'Enrolled',
      sortable: true,
      type: 'date',
      align: 'center',
      width: '110px',
      render: (val) => (
        <span className="font-mono text-xs font-semibold text-slate-700">{val}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      type: 'string',
      align: 'center',
      width: '110px',
      render: (val) => <StatusPill status={String(val)} />,
    },
    {
      key: 'tuitionFee',
      header: 'Tuition Fee',
      sortable: true,
      type: 'number',
      align: 'right',
      width: '110px',
      render: (val) => (
        <span className="font-mono text-xs font-bold text-[#020617] tabular-nums">
          ${Number(val).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4">
      <DataTable
        title="Student Academic Roster"
        subtitle="Active term records and GPA standings"
        data={SAMPLE_STUDENT_RECORDS}
        columns={columns}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}
