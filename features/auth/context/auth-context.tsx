'use client';

import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { setAccessToken, setUnauthorizedHandler, setSessionRefreshHandler } from '@/lib/api-client';
import { checkUserPermission } from '@/lib/permissions';

import { changePasswordApi, getMeApi, loginApi, logoutApi, refreshApi } from '../api/auth-api';
import type { ChangePasswordFormData } from '../schemas/change-password-schema';
import type { LoginFormData } from '../schemas/login-schema';
import type { AuthUser } from '../types';

const BRANCH_STORAGE_KEY = 'snp_active_branch_id';
const SESSION_STORAGE_KEY = 'snp_sms_has_session';

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Set<string>;
  roles: string[];
  branchAccess: 'all' | string[];
  departmentAccess: 'all' | string[];
  assignedClasses: string[];
  assignedSubjects: string[];
  currentBranchId: string;
  setCurrentBranchId: (branchId: string) => void;
  login: (credentials: LoginFormData) => Promise<AuthUser>;
  logout: () => Promise<void>;
  changePassword: (data: ChangePasswordFormData) => Promise<void>;
  hasPermission: (permissionCode: string) => boolean;
  hasAnyPermission: (permissionCodes: string[]) => boolean;
  canAccessBranch: (branchId: string) => boolean;
  canAccessDepartment: (departmentId: string) => boolean;
  canAccessClass: (classId: string) => boolean;
  canAccessSubject: (subjectId: string) => boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [storedBranchId, setStoredBranchId] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(BRANCH_STORAGE_KEY) || 'all';
      } catch {
        return 'all';
      }
    }
    return 'all';
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const permissions = React.useMemo(() => {
    return new Set<string>(user?.permissions ?? []);
  }, [user?.permissions]);

  const branchAccess = React.useMemo(() => {
    return user?.branchAccess ?? [];
  }, [user?.branchAccess]);
  const roles = React.useMemo(() => user?.roles ?? [], [user?.roles]);
  const departmentAccess = React.useMemo(
    () => user?.departmentAccess ?? [],
    [user?.departmentAccess],
  );
  const assignedClasses = React.useMemo(() => user?.assignedClasses ?? [], [user?.assignedClasses]);
  const assignedSubjects = React.useMemo(
    () => user?.assignedSubjects ?? [],
    [user?.assignedSubjects],
  );

  const effectiveBranchId = React.useMemo(() => {
    if (user && user.branchAccess !== 'all') {
      const allowed = Array.isArray(user.branchAccess) ? user.branchAccess : [];
      if (allowed.length > 0 && (storedBranchId === 'all' || !allowed.includes(storedBranchId))) {
        return user.defaultBranch && allowed.includes(user.defaultBranch)
          ? user.defaultBranch
          : allowed[0];
      }
    }
    if (
      user?.branchAccess === 'all' &&
      storedBranchId === 'all' &&
      !permissions.has('branch.view.all_branches') &&
      !permissions.has('*')
    ) {
      return user.defaultBranch ?? 'all';
    }
    return storedBranchId;
  }, [user, storedBranchId, permissions]);

  const setCurrentBranchId = React.useCallback(
    (branchId: string) => {
      const canSelectAll =
        branchId === 'all' &&
        branchAccess === 'all' &&
        checkUserPermission(permissions, 'branch.view.all_branches', roles);
      const canSelectBranch =
        branchId !== 'all' && (branchAccess === 'all' || branchAccess.includes(branchId));
      if (!canSelectAll && !canSelectBranch) return;

      setStoredBranchId(branchId);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(BRANCH_STORAGE_KEY, branchId);
        } catch {
          // Ignore storage errors
        }
      }
      queryClient.invalidateQueries();
    },
    [branchAccess, permissions, queryClient, roles],
  );

  const handleLogout = React.useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
      await logoutApi();
    } catch {
      // Ignore network errors on logout
    } finally {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      }
      setUser(null);
      setAccessToken(null);
      queryClient.clear();
      router.push('/login');
    }
  }, [queryClient, router]);

  // Restore active session on mount
  React.useEffect(() => {
    let isMounted = true;

    setSessionRefreshHandler(({ user: refreshedUser }) => {
      if (!isMounted) return;
      setUser(refreshedUser as AuthUser);
      void queryClient.resetQueries();
    });

    setUnauthorizedHandler(() => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        } catch {
          // Ignore storage errors
        }
      }
      if (isMounted) {
        setUser(null);
        setAccessToken(null);
        queryClient.clear();
      }
    });

    const restoreSession = async () => {
      let hasStoredSession = false;
      if (typeof window !== 'undefined') {
        try {
          hasStoredSession = localStorage.getItem(SESSION_STORAGE_KEY) === '1';
        } catch {
          hasStoredSession = false;
        }
      }

      if (!hasStoredSession) {
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const refreshResponse = await refreshApi();
        if (isMounted && refreshResponse.success && refreshResponse.data) {
          const { user: refreshedUser, accessToken: newToken } = refreshResponse.data;
          setAccessToken(newToken);
          setUser(refreshedUser);
        } else {
          if (typeof window !== 'undefined') {
            try {
              localStorage.removeItem(SESSION_STORAGE_KEY);
            } catch {}
          }
          if (isMounted) {
            setUser(null);
            setAccessToken(null);
          }
        }
      } catch {
        // Not logged in or session expired
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem(SESSION_STORAGE_KEY);
          } catch {}
        }
        if (isMounted) {
          setUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
      setUnauthorizedHandler(null);
      setSessionRefreshHandler(null);
    };
  }, [queryClient]);

  const login = React.useCallback(
    async (credentials: LoginFormData): Promise<AuthUser> => {
      const response = await loginApi(credentials);
      const loggedInUser = response.data.user;
      const token = response.data.accessToken;
      await queryClient.cancelQueries();
      queryClient.clear();

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SESSION_STORAGE_KEY, '1');
        } catch {
          // Ignore storage errors
        }
      }

      setAccessToken(token);
      setUser(loggedInUser);
      return loggedInUser;
    },
    [queryClient],
  );

  const changePassword = React.useCallback(
    async (data: ChangePasswordFormData): Promise<void> => {
      await changePasswordApi(data);
      await handleLogout();
    },
    [handleLogout],
  );

  const refreshSession = React.useCallback(async (): Promise<void> => {
    try {
      const response = await getMeApi();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch {
      await handleLogout();
    }
  }, [handleLogout]);

  const hasPermission = React.useCallback(
    (permissionCode: string): boolean => {
      if (!user) return false;
      return checkUserPermission(permissions, permissionCode, user.roles ?? []);
    },
    [user, permissions],
  );

  const hasAnyPermission = React.useCallback(
    (permissionCodes: string[]): boolean => {
      if (!user) return false;
      return permissionCodes.some((code) =>
        checkUserPermission(permissions, code, user.roles ?? []),
      );
    },
    [user, permissions],
  );

  const canAccessBranch = React.useCallback(
    (branchId: string) => branchAccess === 'all' || branchAccess.includes(branchId),
    [branchAccess],
  );
  const canAccessDepartment = React.useCallback(
    (departmentId: string) => departmentAccess === 'all' || departmentAccess.includes(departmentId),
    [departmentAccess],
  );
  const canAccessClass = React.useCallback(
    (classId: string) =>
      hasAnyPermission(['class.view.own_branch', 'class.view.all_branches']) ||
      assignedClasses.includes(classId),
    [assignedClasses, hasAnyPermission],
  );
  const canAccessSubject = React.useCallback(
    (subjectId: string) =>
      hasAnyPermission(['subject.view.own_branch', 'subject.view.all_branches']) ||
      assignedSubjects.includes(subjectId),
    [assignedSubjects, hasAnyPermission],
  );

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      permissions,
      roles,
      branchAccess,
      departmentAccess,
      assignedClasses,
      assignedSubjects,
      currentBranchId: effectiveBranchId,
      setCurrentBranchId,
      login,
      logout: handleLogout,
      changePassword,
      hasPermission,
      hasAnyPermission,
      canAccessBranch,
      canAccessDepartment,
      canAccessClass,
      canAccessSubject,
      refreshSession,
    }),
    [
      user,
      isLoading,
      permissions,
      roles,
      branchAccess,
      departmentAccess,
      assignedClasses,
      assignedSubjects,
      effectiveBranchId,
      setCurrentBranchId,
      login,
      handleLogout,
      changePassword,
      hasPermission,
      hasAnyPermission,
      canAccessBranch,
      canAccessDepartment,
      canAccessClass,
      canAccessSubject,
      refreshSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
