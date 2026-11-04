import { describe, expect, it } from 'vitest';

import { toDocumentLanguage } from './context';

describe('document language mapping', () => {
  it('uses the standards-compliant Khmer language tag', () => {
    expect(toDocumentLanguage('kh')).toBe('km');
  });

  it('preserves the English language tag', () => {
    expect(toDocumentLanguage('en')).toBe('en');
  });
});
