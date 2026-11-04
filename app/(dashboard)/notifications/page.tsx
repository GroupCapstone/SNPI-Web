'use client';

import * as React from 'react';
import { AlertTriangle, CheckCircle2, Plus, Send, Smartphone, Users } from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PermissionGuard } from '@/features/auth/components/permission-guard';
import { useAuth } from '@/features/auth/context/auth-context';
import { NotificationLogTable } from '@/features/notifications/components/notification-log-table';
import { ParentContactLogTable } from '@/features/notifications/components/parent-contact-log-table';
import { SendNotificationDialog } from '@/features/notifications/components/send-notification-dialog';
import { useNotificationStatsQuery } from '@/features/notifications/hooks/use-notifications';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const { isKhmer } = useTranslation();
  const { currentBranchId, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'ledger' | 'outreach'>('ledger');
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  const effectiveBranchId = currentBranchId !== 'all' ? currentBranchId : undefined;

  const { data: statsData, isLoading: isStatsLoading } =
    useNotificationStatsQuery(effectiveBranchId);
  const stats = statsData?.data;

  const canSend =
    hasPermission('notification.create.own_branch') ||
    hasPermission('notification.create.all_branches');

  const totalDispatches = (stats?.totalSent ?? 0) + (stats?.failedCount ?? 0);
  const successRate =
    totalDispatches > 0 ? Math.round(((stats?.totalSent ?? 0) / totalDispatches) * 100) : 100;

  return (
    <PermissionGuard
      requiredAnyPermission={['notification.view.own_branch', 'notification.view.all_branches']}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
                {isKhmer ? 'មជ្ឈមណ្ឌលសារ និងការទំនាក់ទំនង' : 'Notifications & Outreach Hub'}
              </h1>
              <Badge className="bg-[#023e8a] text-white">V1.1B Engine</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {isKhmer
                ? 'តាមដានស្ថានភាពបញ្ជូនសារ Telegram Bot, SMS Gateway និងប្រវត្តិទំនាក់ទំនងអាណាព្យាបាល'
                : 'Real-time dispatch status for Telegram bot, SMS gateway, and parent contact logs.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canSend && (
              <Button
                onClick={() => setIsComposeOpen(true)}
                className="bg-[#023e8a] text-white hover:bg-[#00509d]"
              >
                <Plus className="mr-2 size-4" />
                {isKhmer ? 'បញ្ជូនសារថ្មី' : 'Send Notification'}
              </Button>
            )}
          </div>
        </div>

        {/* Top KPI Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Sent Today */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'បានបញ្ជូនថ្ងៃនេះ' : 'Dispatched Today'}
                </span>
                <div className="rounded-md bg-blue-50 p-2 text-[#023e8a]">
                  <Send className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                {isStatsLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <span className="text-2xl font-bold text-slate-900">{stats?.sentToday ?? 0}</span>
                )}
                <span className="text-xs text-slate-500">
                  {isKhmer ? 'សារទាំងអស់' : 'messages'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Rate */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'អត្រាជោគជ័យ' : 'Delivery Rate'}
                </span>
                <div className="rounded-md bg-emerald-50 p-2 text-emerald-600">
                  <CheckCircle2 className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                {isStatsLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <span className="text-2xl font-bold text-emerald-700">{successRate}%</span>
                )}
                <span className="text-xs text-slate-500">{isKhmer ? 'ជោគជ័យ' : 'delivered'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Failed Dispatches */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'សារបរាជ័យ' : 'Failed Dispatches'}
                </span>
                <div className="rounded-md bg-rose-50 p-2 text-rose-600">
                  <AlertTriangle className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                {isStatsLoading ? (
                  <Skeleton className="h-7 w-16" />
                ) : (
                  <span
                    className={cn(
                      'text-2xl font-bold',
                      (stats?.failedCount ?? 0) > 0 ? 'text-rose-600' : 'text-slate-900',
                    )}
                  >
                    {stats?.failedCount ?? 0}
                  </span>
                )}
                <span className="text-xs text-slate-500">
                  {isKhmer ? 'កំហុសបច្ចេកទេស' : 'errors'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Channel Breakdown */}
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {isKhmer ? 'បែងចែកតាមប៉ុស្តិ៍' : 'Channels (Telegram / SMS)'}
                </span>
                <div className="rounded-md bg-amber-50 p-2 text-amber-700">
                  <Smartphone className="size-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                {isStatsLoading ? (
                  <Skeleton className="h-7 w-24" />
                ) : (
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-[#0088cc]">
                      Telegram: {stats?.byChannel?.telegram ?? 0}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[#4361ee]">SMS: {stats?.byChannel?.sms ?? 0}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Selector */}
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-6">
            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={cn(
                'flex items-center gap-2 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === 'ledger'
                  ? 'border-[#023e8a] text-[#023e8a]'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
              )}
            >
              <Send className="size-4" />
              {isKhmer ? 'កំណត់ត្រាបញ្ជូនសារ (Live Ledger)' : 'Live Notification Ledger'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('outreach')}
              className={cn(
                'flex items-center gap-2 border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === 'outreach'
                  ? 'border-[#023e8a] text-[#023e8a]'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
              )}
            >
              <Users className="size-4" />
              {isKhmer ? 'ប្រវត្តិទំនាក់ទំនងអាណាព្យាបាល' : 'Parent Outreach History'}
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'ledger' ? (
          <NotificationLogTable
            branchId={effectiveBranchId}
            onComposeClick={() => setIsComposeOpen(true)}
          />
        ) : (
          <ParentContactLogTable branchId={effectiveBranchId} />
        )}

        {/* Send Notification Modal */}
        <SendNotificationDialog
          open={isComposeOpen}
          onOpenChange={setIsComposeOpen}
          branchId={effectiveBranchId}
        />
      </div>
    </PermissionGuard>
  );
}
