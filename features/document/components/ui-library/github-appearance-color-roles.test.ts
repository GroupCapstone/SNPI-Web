import { describe, it, expect } from 'vitest';
import {
  computeActiveColorRoles,
  LIGHT_THEMES,
  DARK_THEMES,
} from './github-appearance-color-roles';

describe('GitHub Appearance Color Roles Engine (computeActiveColorRoles)', () => {
  it('derives light-default roles matching SNPI Brand blueprint tokens', () => {
    const roles = computeActiveColorRoles('light', 'light-default', 'dark-default', false, false);

    expect(roles.isDark).toBe(false);
    expect(roles.themeName).toBe('Light default');
    expect(roles.canvasBg).toBe('#FFFFFF');
    expect(roles.subsurfaceBg).toBe('#EFF5FF');
    expect(roles.textPrimary).toBe('#0A1A4A');
    expect(roles.primary.fill).toBe('#0056FF');
    expect(roles.primary.on).toBe('#FFFFFF');
    expect(roles.secondary.fill).toBe('#2277FF');
    expect(roles.statusSuccess.fill).toBe('#10B981');
    expect(roles.statusWarning.fill).toBe('#F59E0B');
    expect(roles.statusError.fill).toBe('#EF4444');
    expect(roles.statusInfo.fill).toBe('#0284C7');
  });

  it('derives dark-dimmed (Moon) nocturnal palette with reduced glare', () => {
    const roles = computeActiveColorRoles('dark', 'light-default', 'dark-dimmed', false, false);

    expect(roles.isDark).toBe(true);
    expect(roles.themeName).toBe('Dark dimmed (Moon)');
    expect(roles.canvasBg).toBe('#1E293B');
    expect(roles.subsurfaceBg).toBe('#24334D');
    expect(roles.textPrimary).toBe('#F8FAFC');
    expect(roles.primary.fill).toBe('#60A5FA');
    expect(roles.primary.on).toBe('#002A8C');
    expect(roles.primary.contrastGrade).toBe('AAA');
  });

  it('derives dark-default roles with deep navy obsidian canvas', () => {
    const roles = computeActiveColorRoles('dark', 'light-default', 'dark-default', false, false);

    expect(roles.isDark).toBe(true);
    expect(roles.themeName).toBe('Dark default');
    expect(roles.canvasBg).toBe('#0A1A4A');
    expect(roles.subsurfaceBg).toBe('#0F225A');
    expect(roles.textPrimary).toBe('#FFFFFF');
    expect(roles.primary.fill).toBe('#93C5FD');
  });

  it('enforces High-Contrast WCAG AAA rating when highContrast toggle is on', () => {
    const lightHC = computeActiveColorRoles('light', 'light-default', 'dark-default', true, false);
    expect(lightHC.themeName).toBe('Light high contrast');
    expect(lightHC.primary.contrastGrade).toBe('AAA');
    expect(lightHC.textPrimary).toBe('#000000');

    const darkHC = computeActiveColorRoles('dark', 'light-default', 'dark-default', false, true);
    expect(darkHC.themeName).toBe('Dark high contrast');
    expect(darkHC.primary.contrastGrade).toBe('AAA');
    expect(darkHC.cardBorder).toBe('#CBD5E1');
  });

  it('contains complete 6-tier surface hierarchy', () => {
    const roles = computeActiveColorRoles('light', 'light-default', 'dark-default', false, false);
    expect(roles.surfaces).toHaveLength(6);
    const surfaceRoles = roles.surfaces.map((s) => s.role);
    expect(surfaceRoles).toEqual([
      'surface-container-lowest',
      'surface-container-low',
      'surface-container',
      'surface-container-high',
      'surface-container-highest',
      'inverse-surface',
    ]);
  });

  it('exposes exactly 4 light theme variants and 4 dark theme variants', () => {
    expect(LIGHT_THEMES).toHaveLength(4);
    expect(DARK_THEMES).toHaveLength(4);
    expect(DARK_THEMES.some((t) => t.id === 'dark-dimmed')).toBe(true);
  });
});
