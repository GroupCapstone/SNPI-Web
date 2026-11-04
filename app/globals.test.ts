import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

const globalStyles = readFileSync(new URL('./globals.css', import.meta.url), 'utf8');

describe('global font policy', () => {
  it('bundles the Google Sans font and uses its actual CSS family', () => {
    const layout = readFileSync(new URL('./layout.tsx', import.meta.url), 'utf8');
    expect(layout).toContain("import '@fontsource-variable/google-sans'");
    expect(globalStyles).toMatch(/--font-sans:\s*'Google Sans Variable'/);
    expect(layout).toContain("import '@fontsource-variable/noto-sans-khmer'");
  });

  it('keeps Google Sans ahead of the bundled cross-browser fallbacks', () => {
    const googleSansPosition = globalStyles.indexOf("'Google Sans'");
    const interPosition = globalStyles.indexOf("'Inter Variable'");
    const systemPosition = globalStyles.indexOf('system-ui');

    expect(googleSansPosition).toBeGreaterThan(-1);
    expect(interPosition).toBeGreaterThan(googleSansPosition);
    expect(systemPosition).toBeGreaterThan(interPosition);
  });

  it('makes browser-native form controls inherit the application font', () => {
    expect(globalStyles).toMatch(/button,[\s\S]*textarea\s*{[\s\S]*font:\s*inherit;/);
  });
});
