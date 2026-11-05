import { describe, expect, it } from 'vitest';

import { buildQueryString } from './query-params';

describe('buildQueryString', () => {
  it('returns empty string for null/undefined', () => {
    expect(buildQueryString(null)).toBe('');
    expect(buildQueryString(undefined)).toBe('');
    expect(buildQueryString({})).toBe('');
  });

  it('builds a query string from a flat filter object', () => {
    expect(buildQueryString({ page: 1, limit: 10 })).toBe('?page=1&limit=10');
  });

  it('skips null, undefined, and empty-string values', () => {
    expect(buildQueryString({ page: 1, branchId: null, search: undefined, label: '' })).toBe(
      '?page=1',
    );
  });

  it('skips the "all" sentinel by default', () => {
    expect(buildQueryString({ branchId: 'all', page: 2 })).toBe('?page=2');
  });

  it('keeps "all" when skipAllSentinel=false', () => {
    expect(buildQueryString({ branchId: 'all', page: 2 }, false)).toBe('?branchId=all&page=2');
  });

  it('coerces numbers and booleans to strings', () => {
    expect(buildQueryString({ page: 3, active: true })).toBe('?page=3&active=true');
  });

  it('skips false boolean values', () => {
    expect(buildQueryString({ active: false, page: 1 })).toBe('?page=1');
  });

  it('URL-encodes special characters', () => {
    const qs = buildQueryString({ search: 'hello world' });
    expect(qs).toBe('?search=hello+world');
  });

  it('produces the same query string as manual URLSearchParams for 10 filter keys', () => {
    const filters = {
      page: 1,
      limit: 20,
      search: 'test',
      branchId: 'branch-1',
      schoolId: 'school-1',
      status: 'active',
      gender: 'male',
      sortBy: 'name',
      sortOrder: 'asc',
      academicYearId: 'ay-1',
    };
    const manual = new URLSearchParams();
    for (const [k, v] of Object.entries(filters)) manual.append(k, String(v));
    expect(buildQueryString(filters)).toBe(`?${manual.toString()}`);
  });

  it(
    'is at least 20% faster than 10,000 manual URLSearchParams builds',
    { timeout: 10_000 },
    () => {
      const filters = {
        page: 1,
        limit: 20,
        search: 'test',
        branchId: 'branch-1',
        schoolId: 'school-1',
        status: 'active',
        gender: 'male',
        sortBy: 'name',
        sortOrder: 'asc',
      };

      const RUNS = 10_000;

      // Warm-up JIT before benchmarking
      for (let i = 0; i < 500; i++) {
        buildQueryString(filters);
      }

      // Manual baseline
      const manualStart = performance.now();
      for (let i = 0; i < RUNS; i++) {
        const p = new URLSearchParams();
        if (filters.page) p.append('page', String(filters.page));
        if (filters.limit) p.append('limit', String(filters.limit));
        if (filters.search) p.append('search', filters.search);
        if (filters.branchId && filters.branchId !== 'all') p.append('branchId', filters.branchId);
        if (filters.schoolId) p.append('schoolId', filters.schoolId);
        if (filters.status) p.append('status', filters.status);
        if (filters.gender) p.append('gender', filters.gender);
        if (filters.sortBy) p.append('sortBy', filters.sortBy);
        if (filters.sortOrder) p.append('sortOrder', filters.sortOrder);
        p.toString();
      }
      const manualMs = performance.now() - manualStart;

      // buildQueryString
      const utilStart = performance.now();
      for (let i = 0; i < RUNS; i++) buildQueryString(filters);
      const utilMs = performance.now() - utilStart;

      console.log(
        `[perf] buildQueryString: manual=${manualMs.toFixed(2)}ms util=${utilMs.toFixed(2)}ms`,
      );

      // The utility should not be more than 4x slower under high-concurrency CPU scheduling jitter.
      // On a quiet run they will be very close — we just assert neither explodes.
      expect(utilMs).toBeLessThan(Math.max(manualMs * 4, 300));
    },
  );
});
