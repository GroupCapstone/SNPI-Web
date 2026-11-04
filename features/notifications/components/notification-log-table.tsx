'use client';

import * as React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Send,
  Smartphone,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useNotificationsQuery } from '../hooks/use-notifications';
import type {
  NotificationChannel,
  NotificationItem,
  NotificationStatus,
  NotificationType,
} from '../types';

interface NotificationLogTableProps {
  branchId?: string;
  onComposeClick?: () => void;
}

export const NotificationLogTable: React.FC<NotificationLogTableProps> = ({
  branchId,
  onComposeClick,
}) => {
  const { isKhmer } = useTranslation();
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedChannel, setSelectedChannel] = React.useState<NotificationChannel | ''>('');
  const [selectedStatus, setSelectedStatus] = React.useState<NotificationStatus | ''>('');
  const [selectedType, setSelectedType] = React.useState<NotificationType | ''>('');
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch, isFetching } = useNotificationsQuery({
    page,
    limit: 20,
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    channel: selectedChannel || undefined,
    status: selectedStatus || undefined,
    type: selectedType || undefined,
    search: debouncedSearch || undefined,
  });

  const notifications = data?.data ?? [];
  const pagination = data?.pagination;

  const getChannelBadge = (channel: NotificationChannel) => {
    switch (channel) {
      case 'telegram':
        return (
          <Badge tone="neutral" className="border-sky-200 bg-sky-50 font-semibold text-sky-800">
            <Send className="mr-1 size-3 text-sky-600" />
            Telegram
          </Badge>
        );
      case 'sms':
        return (
          <Badge
            tone="neutral"
            className="border-emerald-200 bg-emerald-50 font-semibold text-emerald-800"
          >
            <Smartphone className="mr-1 size-3 text-emerald-600" />
            SMS
          </Badge>
        );
      case 'in_app':
      default:
        return (
          <Badge
            tone="neutral"
            className="border-indigo-200 bg-indigo-50 font-semibold text-indigo-800"
          >
            <MessageSquare className="mr-1 size-3 text-indigo-600" />
            In-App
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: NotificationStatus, error?: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge
            tone="neutral"
            className="border-emerald-200 bg-emerald-100 font-semibold text-emerald-800"
          >
            <CheckCircle2 className="mr-1 size-3 text-emerald-600" />
            {isKhmer ? 'បានផ្ញើ' : 'Sent'}
          </Badge>
        );
      case 'failed':
        return (
          <Badge
            tone="neutral"
            className="border-rose-200 bg-rose-100 font-semibold text-rose-800"
            title={error}
          >
            <AlertCircle className="mr-1 size-3 text-rose-600" />
            {isKhmer ? 'បរាជ័យ' : 'Failed'}
          </Badge>
        );
      case 'pending':
      default:
        return (
          <Badge
            tone="neutral"
            className="border-amber-200 bg-amber-100 font-semibold text-amber-800"
          >
            <Clock className="mr-1 size-3 text-amber-600" />
            {isKhmer ? 'កំពុងដំណើរការ' : 'Pending'}
          </Badge>
        );
    }
  };

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'absence_alert':
        return isKhmer ? 'ដំណឹងអវត្តមាន' : 'Absence Alert';
      case 'unmarked_attendance_digest':
        return isKhmer ? 'សេចក្តីសង្ខេបវត្តមាន' : 'Attendance Digest';
      case 'payment_receipt':
        return isKhmer ? 'វិក្កយបត្របង់ប្រាក់' : 'Payment Receipt';
      case 'tuition_reminder':
        return isKhmer ? 'រំលឹកបង់ថ្លៃសិក្សា' : 'Tuition Reminder';
      case 'announcement':
        return isKhmer ? 'សេចក្តីជូនដំណឹង' : 'Announcement';
      case 'custom':
      default:
        return isKhmer ? 'សារទូទៅ' : 'Custom Message';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative max-w-sm min-w-[220px] flex-1">
            <Search className="absolute top-2.5 left-2.5 size-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={
                isKhmer
                  ? 'ស្វែងរកតាមចំណងជើង អ្នកទទួល ឬលេខទូរស័ព្ទ...'
                  : 'Search by title, recipient, or phone...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
            />
          </div>

          <select
            value={selectedChannel}
            onChange={(e) => {
              setSelectedChannel(e.target.value as NotificationChannel | '');
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#00509d] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់ប្រព័ន្ធ (Channels)' : 'All Channels'}</option>
            <option value="telegram">Telegram</option>
            <option value="sms">SMS</option>
            <option value="in_app">In-App</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value as NotificationStatus | '');
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#00509d] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់ស្ថានភាព (Status)' : 'All Statuses'}</option>
            <option value="sent">{isKhmer ? 'បានផ្ញើ' : 'Sent'}</option>
            <option value="pending">{isKhmer ? 'កំពុងដំណើរការ' : 'Pending'}</option>
            <option value="failed">{isKhmer ? 'បរាជ័យ' : 'Failed'}</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value as NotificationType | '');
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#00509d] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់ប្រភេទ (Types)' : 'All Types'}</option>
            <option value="absence_alert">{isKhmer ? 'ដំណឹងអវត្តមាន' : 'Absence Alert'}</option>
            <option value="payment_receipt">
              {isKhmer ? 'វិក្កយបត្របង់ប្រាក់' : 'Payment Receipt'}
            </option>
            <option value="tuition_reminder">
              {isKhmer ? 'រំលឹកបង់ថ្លៃសិក្សា' : 'Tuition Reminder'}
            </option>
            <option value="announcement">{isKhmer ? 'សេចក្តីជូនដំណឹង' : 'Announcement'}</option>
            <option value="custom">{isKhmer ? 'សារទូទៅ' : 'Custom Message'}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {onComposeClick && (
            <Button
              size="sm"
              onClick={onComposeClick}
              className="h-8 bg-[#023e8a] hover:bg-[#00509d]"
            >
              <Send className="mr-1.5 size-3.5" />
              {isKhmer ? 'ផ្ញើសារថ្មី' : 'Compose Message'}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-8"
          >
            <RefreshCw className={cn('mr-1.5 size-3.5', isFetching && 'animate-spin')} />
            {isKhmer ? 'ផ្ទុកឡើងវិញ' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="space-y-3 p-6">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="size-6 text-rose-600" />
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {isKhmer ? 'មិនអាចទាញយកទិន្នន័យជូនដំណឹងបានទេ' : 'Failed to load notifications'}
            </p>
            <Button size="sm" variant="outline" onClick={() => refetch()} className="mt-3">
              {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
            </Button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <MessageSquare className="size-10 text-[#00509d]" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {isKhmer ? 'មិនទាន់មានប្រវត្តិនៃការជូនដំណឹងទេ' : 'No Notification Records Found'}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isKhmer
                ? 'សារដែលបានផ្ញើតាម Telegram, SMS ឬ In-App នឹងត្រូវបង្ហាញនៅទីនេះ។'
                : 'Dispatches via Telegram, SMS, or In-App will appear in this audit log.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/70 text-slate-600 hover:bg-slate-50/70">
                  <TableHead className="w-28 text-xs font-semibold">
                    {isKhmer ? 'ប្រព័ន្ធ' : 'Channel'}
                  </TableHead>
                  <TableHead className="w-36 text-xs font-semibold">
                    {isKhmer ? 'ប្រភេទ' : 'Type'}
                  </TableHead>
                  <TableHead className="text-xs font-semibold">
                    {isKhmer ? 'ខ្លឹមសារ' : 'Title & Content Preview'}
                  </TableHead>
                  <TableHead className="w-48 text-xs font-semibold">
                    {isKhmer ? 'អ្នកទទួល' : 'Recipient'}
                  </TableHead>
                  <TableHead className="w-28 text-center text-xs font-semibold">
                    {isKhmer ? 'ស្ថានភាព' : 'Status'}
                  </TableHead>
                  <TableHead className="w-36 text-right text-xs font-semibold">
                    {isKhmer ? 'កាលបរិច្ឆេទ' : 'Dispatched At'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((item: NotificationItem) => (
                  <TableRow key={item._id} className="hover:bg-slate-50/60">
                    <TableCell>{getChannelBadge(item.channel)}</TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-slate-700">
                        {getTypeLabel(item.type)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-xs font-bold text-slate-900">{item.title}</p>
                        <p className="line-clamp-2 text-xs text-slate-500">{item.body}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          {item.recipientName ||
                            (isKhmer ? 'មិនបញ្ជាក់ឈ្មោះ' : 'General / Broadcast')}
                        </p>
                        {item.recipientPhone && (
                          <p className="flex items-center gap-1 font-mono text-xs text-slate-500">
                            <Phone className="size-3 text-slate-400" />
                            {item.recipientPhone}
                          </p>
                        )}
                        {item.recipientChatId && (
                          <p className="font-mono text-xs text-sky-600">{item.recipientChatId}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(item.status, item.errorDetails)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-xs text-slate-500">
                        {new Date(item.sentAt || item.createdAt).toLocaleDateString(
                          isKhmer ? 'km-KH' : 'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 p-3 text-xs text-slate-500">
            <span>
              {isKhmer
                ? `ទំព័រ ${pagination.page} នៃ ${pagination.totalPages} (សរុប ${pagination.total})`
                : `Page ${pagination.page} of ${pagination.totalPages} (Total ${pagination.total})`}
            </span>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="h-7 text-xs"
              >
                {isKhmer ? 'ថយក្រោយ' : 'Prev'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="h-7 text-xs"
              >
                {isKhmer ? 'បន្ទាប់' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
