import { DashboardShell } from '@/components/layout/dashboard-shell';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { DashboardRouteGuard } from '@/features/auth/components/dashboard-route-guard';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <DashboardShell>
        <DashboardRouteGuard>{children}</DashboardRouteGuard>
      </DashboardShell>
    </AuthGuard>
  );
}
