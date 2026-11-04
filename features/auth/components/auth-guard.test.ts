import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuth } from '../context/auth-context';
import { AuthGuard } from './auth-guard';
import { PermissionGuard } from './permission-guard';

vi.mock('../context/auth-context', () => ({ useAuth: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/users',
  useRouter: () => ({ replace: vi.fn() }),
}));
vi.mock('next/image', () => ({ default: () => null }));
vi.mock('./force-change-password-modal', () => ({
  ForceChangePasswordModal: () => createElement('div', null, 'Password recovery'),
}));

describe('authentication and permission rendering boundaries', () => {
  const content = createElement('div', null, 'Protected student records');
  const state = (overrides = {}) => ({
    user: { mustChangePassword: false },
    isAuthenticated: true,
    isLoading: false,
    hasPermission: () => true,
    hasAnyPermission: () => true,
    ...overrides,
  });
  beforeEach(() => {
    vi.mocked(useAuth).mockReturnValue(state() as never);
  });

  it.each([
    { isLoading: true },
    { isAuthenticated: false, user: null },
    { user: { mustChangePassword: true } },
  ])(
    'does not render or mount protected children before authentication and recovery finish: %j',
    (overrides) => {
      vi.mocked(useAuth).mockReturnValue(state(overrides) as never);
      expect(renderToStaticMarkup(createElement(AuthGuard, null, content))).not.toContain(
        'Protected student records',
      );
    },
  );

  it('shows password recovery before considering the protected page permission', () => {
    vi.mocked(useAuth).mockReturnValue(
      state({ user: { mustChangePassword: true }, hasPermission: () => false }) as never,
    );
    expect(
      renderToStaticMarkup(
        createElement(
          AuthGuard,
          {
            requiredPermission: 'user.view.all_branches',
          },
          content,
        ),
      ),
    ).toContain('Password recovery');
  });

  it('renders protected children for an authenticated and authorized user', () => {
    expect(
      renderToStaticMarkup(
        createElement(
          AuthGuard,
          {
            requiredPermission: 'user.view.all_branches',
          },
          content,
        ),
      ),
    ).toContain('Protected student records');
  });

  it.each([AuthGuard, PermissionGuard])(
    'withholds children when a required permission is missing',
    (Guard) => {
      vi.mocked(useAuth).mockReturnValue(state({ hasPermission: () => false }) as never);
      expect(
        renderToStaticMarkup(
          createElement(Guard, { requiredPermission: 'user.view.all_branches' }, content),
        ),
      ).not.toContain('Protected student records');
    },
  );

  it.each([AuthGuard, PermissionGuard])(
    'withholds children when none of the alternative permissions match',
    (Guard) => {
      vi.mocked(useAuth).mockReturnValue(state({ hasAnyPermission: () => false }) as never);
      expect(
        renderToStaticMarkup(
          createElement(
            Guard,
            {
              requiredAnyPermission: ['user.view.all_branches', 'role.view.all_branches'],
            },
            content,
          ),
        ),
      ).not.toContain('Protected student records');
    },
  );
});
