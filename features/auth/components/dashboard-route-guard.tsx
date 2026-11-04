'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { getRequiredPermissionsForPath } from '../route-permissions';
import { PermissionGuard } from './permission-guard';

export const DashboardRouteGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const requiredPermissions = getRequiredPermissionsForPath(pathname);

  if (!requiredPermissions) return <>{children}</>;
  return <PermissionGuard requiredAnyPermission={requiredPermissions}>{children}</PermissionGuard>;
};
