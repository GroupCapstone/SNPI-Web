'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, LockKeyhole, ShieldCheck, Waypoints } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { SystemHealthCard } from '@/features/system-health/components/system-health-card';

const foundations = [
  {
    title: 'One central system',
    description:
      'A shared platform designed for every SNPI campus branch with unified DB structure.',
    icon: Database,
  },
  {
    title: 'Branch-aware by design',
    description: 'Campus boundaries are enforced at the database query level and in middleware.',
    icon: Waypoints,
  },
  {
    title: 'Security foundation',
    description:
      'HttpOnly dual-token refresh, SHA256 revocation, bcrypt hashing, and rate limiting.',
    icon: LockKeyhole,
  },
];

export default function SystemInfoPage() {
  return (
    <PermissionGuard requiredPermission="setting.view.all_branches">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Link href="/settings" className="text-slate-400 hover:text-slate-700">
                <ArrowLeft className="size-4" />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                System Information & Architecture
              </h1>
              <Badge tone="neutral">Technical Blueprint</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Technical foundation, health status, and architecture boundaries of SNP-SMS.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="size-4 text-[#00509d]" />
            <span>Architecture & Security</span>
          </div>
        </div>

        {/* Foundations */}
        <div className="grid gap-4 lg:grid-cols-3">
          {foundations.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border border-slate-200 bg-white">
                <CardContent className="p-5">
                  <Icon className="mb-4 size-6 text-[#00509d]" />
                  <h3 className="text-sm font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Live System Health */}
        <div className="grid gap-4 lg:grid-cols-2">
          <SystemHealthCard />
          <Card className="border border-slate-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">System Architectural Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>7-Layer Backend Standard</span>
                <span className="font-mono text-slate-900">
                  model → types → validation → repo → service → ctrl → route
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Multi-Branch Hierarchy</span>
                <span className="font-mono text-slate-900">
                  School → Branch → Department → Position
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>RBAC Format</span>
                <span className="font-mono text-slate-900">module.action.scope</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audit Trail</span>
                <Badge tone="success">Active Ledger</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PermissionGuard>
  );
}
