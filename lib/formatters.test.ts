import { describe, expect, it } from 'vitest';

import { formatCurrency, formatDataLabel, formatDate, formatDateTime } from './formatters';

describe('shared data formatters', () => {
  it('keeps the record currency attached to financial values', () => {
    expect(formatCurrency(60, 'USD')).toContain('$60.00');
    expect(formatCurrency(240000, 'KHR')).toContain('240,000');
    expect(formatCurrency(240000, 'KHR')).toContain('KHR');
  });

  it('turns stored enum values into readable labels', () => {
    expect(formatDataLabel('bank_transfer')).toBe('Bank Transfer');
    expect(formatDataLabel('tuition-monthly')).toBe('Tuition Monthly');
  });

  it('formats dates consistently without timezone shift', () => {
    expect(formatDate('2010-05-12T00:00:00.000Z')).toBe('2010-05-12');
    expect(formatDate('2026-09-14')).toBe('2026-09-14');
    expect(formatDate(null)).toBe('—');
    expect(formatDate(undefined)).toBe('—');
  });

  it('formats date and time accurately', () => {
    const d = new Date('2026-09-14T08:30:00.000Z');
    expect(formatDateTime(d)).toBeTruthy();
    expect(formatDateTime(null)).toBe('—');
  });
});
