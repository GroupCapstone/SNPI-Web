'use client';

import * as React from 'react';
import {
  AlertCircle,
  Bell,
  Calendar,
  Edit2,
  Pin,
  PinOff,
  Plus,
  RefreshCw,
  Search,
  Send,
  Trash2,
  Users,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/features/auth/context/auth-context';
import { useSendNotificationMutation } from '@/features/notifications/hooks/use-notifications';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import {
  useAnnouncementsQuery,
  useDeleteAnnouncementMutation,
  useUpdateAnnouncementMutation,
} from '../hooks/use-announcements';
import type { AnnouncementAudience, AnnouncementCategory, AnnouncementItem } from '../types';

interface AnnouncementListProps {
  branchId?: string;
  onEdit: (announcement: AnnouncementItem) => void;
  onCreateNew: () => void;
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({
  branchId,
  onEdit,
  onCreateNew,
}) => {
  const { isKhmer } = useTranslation();
  const { hasPermission } = useAuth();
  const [search, setSearch] = React.useState('');
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<AnnouncementCategory | ''>('');
  const [selectedAudience, setSelectedAudience] = React.useState<AnnouncementAudience | ''>('');
  const [broadcastingId, setBroadcastingId] = React.useState<string | null>(null);

  const canManage =
    hasPermission('announcement.create.own_branch') ||
    hasPermission('announcement.edit.own_branch');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError, refetch, isFetching } = useAnnouncementsQuery({
    branchId: branchId && branchId !== 'all' ? branchId : undefined,
    category: selectedCategory || undefined,
    audience: selectedAudience || undefined,
    search: debouncedSearch || undefined,
  });

  const deleteMutation = useDeleteAnnouncementMutation();
  const updateMutation = useUpdateAnnouncementMutation();
  const sendNotifMutation = useSendNotificationMutation();

  const announcements = data?.data ?? [];

  // Sort pinned first
  const sortedAnnouncements = React.useMemo(() => {
    return [...announcements].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
      );
    });
  }, [announcements]);

  const handleTogglePin = async (item: AnnouncementItem) => {
    await updateMutation.mutateAsync({
      id: item._id,
      dto: { isPinned: !item.isPinned },
    });
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        isKhmer
          ? 'តើអ្នកពិតជាចង់លុបសេចក្តីជូនដំណឹងនេះមែនទេ?'
          : 'Are you sure you want to delete this announcement?',
      )
    ) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleBroadcastTelegram = async (item: AnnouncementItem) => {
    setBroadcastingId(item._id);
    try {
      await sendNotifMutation.mutateAsync({
        branchId,
        channel: 'telegram',
        type: 'announcement',
        recipientType: 'broadcast',
        title: item.title,
        body: item.content,
      });
      alert(
        isKhmer
          ? 'បានផ្សាយទៅកាន់ Telegram ដោយជោគជ័យ'
          : 'Announcement broadcasted to Telegram successfully',
      );
    } catch {
      alert(isKhmer ? 'មិនអាចផ្សាយទៅកាន់ Telegram បានទេ' : 'Failed to broadcast announcement');
    } finally {
      setBroadcastingId(null);
    }
  };

  const getCategoryBadge = (category: AnnouncementCategory) => {
    switch (category) {
      case 'urgent':
        return (
          <Badge tone="neutral" className="border-rose-200 bg-rose-100 font-bold text-rose-800">
            {isKhmer ? 'បន្ទាន់' : 'Urgent'}
          </Badge>
        );
      case 'academic':
        return (
          <Badge tone="neutral" className="border-blue-200 bg-blue-100 font-bold text-[#00509d]">
            {isKhmer ? 'សិក្សាធិការ' : 'Academic'}
          </Badge>
        );
      case 'finance':
        return (
          <Badge tone="neutral" className="border-amber-200 bg-amber-100 font-bold text-amber-800">
            {isKhmer ? 'ហិរញ្ញវត្ថុ' : 'Finance'}
          </Badge>
        );
      case 'event':
        return (
          <Badge
            tone="neutral"
            className="border-emerald-200 bg-emerald-100 font-bold text-emerald-800"
          >
            {isKhmer ? 'ព្រឹត្តិការណ៍' : 'Event'}
          </Badge>
        );
      case 'attendance':
        return (
          <Badge
            tone="neutral"
            className="border-purple-200 bg-purple-100 font-bold text-purple-800"
          >
            {isKhmer ? 'វត្តមាន' : 'Attendance'}
          </Badge>
        );
      case 'general':
      default:
        return (
          <Badge
            tone="neutral"
            className="border-slate-200 bg-slate-100 font-medium text-slate-700"
          >
            {isKhmer ? 'ទូទៅ' : 'General'}
          </Badge>
        );
    }
  };

  const getAudienceChip = (audience: AnnouncementAudience) => {
    switch (audience) {
      case 'students':
        return isKhmer ? 'សិស្សានុសិស្ស' : 'Students Only';
      case 'parents':
        return isKhmer ? 'អាណាព្យាបាល' : 'Parents Only';
      case 'teachers':
        return isKhmer ? 'លោកគ្រូ-អ្នកគ្រូ' : 'Teachers Only';
      case 'staff':
        return isKhmer ? 'បុគ្គលិកទាំងអស់' : 'Staff Only';
      case 'all':
      default:
        return isKhmer ? 'ទូទាំងសាលា (All)' : 'Everyone';
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
              placeholder={isKhmer ? 'ស្វែងរកតាមចំណងជើង ឬខ្លឹមសារ...' : 'Search announcements...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as AnnouncementCategory | '')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#00509d] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់ប្រភេទ (Categories)' : 'All Categories'}</option>
            <option value="urgent">{isKhmer ? 'បន្ទាន់ (Urgent)' : 'Urgent'}</option>
            <option value="academic">{isKhmer ? 'សិក្សាធិការ (Academic)' : 'Academic'}</option>
            <option value="finance">{isKhmer ? 'ហិរញ្ញវត្ថុ (Finance)' : 'Finance'}</option>
            <option value="event">{isKhmer ? 'ព្រឹត្តិការណ៍ (Event)' : 'Event'}</option>
            <option value="general">{isKhmer ? 'ទូទៅ (General)' : 'General'}</option>
          </select>

          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value as AnnouncementAudience | '')}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-[#00509d] focus:outline-none"
          >
            <option value="">{isKhmer ? 'គ្រប់អ្នកទទួល (Audiences)' : 'All Audiences'}</option>
            <option value="all">{isKhmer ? 'ទូទាំងសាលា (Everyone)' : 'Everyone'}</option>
            <option value="parents">{isKhmer ? 'អាណាព្យាបាល (Parents)' : 'Parents'}</option>
            <option value="students">{isKhmer ? 'សិស្ស (Students)' : 'Students'}</option>
            <option value="teachers">{isKhmer ? 'គ្រូបង្រៀន (Teachers)' : 'Teachers'}</option>
            <option value="staff">{isKhmer ? 'បុគ្គលិក (Staff)' : 'Staff'}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {canManage && (
            <Button size="sm" onClick={onCreateNew} className="h-8 bg-[#023e8a] hover:bg-[#00509d]">
              <Plus className="mr-1 size-3.5" />
              {isKhmer ? 'បង្កើតសេចក្តីជូនដំណឹង' : 'Post Announcement'}
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

      {/* Announcements Content */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/60 p-8 text-center">
          <AlertCircle className="size-6 text-rose-600" />
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {isKhmer ? 'មិនអាចទាញយកសេចក្តីជូនដំណឹងបានទេ' : 'Failed to load announcements'}
          </p>
          <Button size="sm" variant="outline" onClick={() => refetch()} className="mt-3">
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </div>
      ) : sortedAnnouncements.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Bell className="size-10 text-amber-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">
            {isKhmer ? 'មិនទាន់មានសេចក្តីជូនដំណឹងនៅឡើយទេ' : 'No Announcements Found'}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {isKhmer
              ? 'ចុចប៊ូតុង "បង្កើតសេចក្តីជូនដំណឹង" ដើម្បីផ្សព្វផ្សាយព័ត៌មានទៅកាន់សាលា។'
              : 'Click "Post Announcement" to broadcast updates across campus.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedAnnouncements.map((item: AnnouncementItem) => {
            const isUrgent = item.category === 'urgent';

            return (
              <Card
                key={item._id}
                className={cn(
                  'overflow-hidden border bg-white transition-all hover:shadow-sm',
                  item.isPinned
                    ? 'border-amber-300 bg-amber-50/10'
                    : isUrgent
                      ? 'border-rose-200 bg-rose-50/10'
                      : 'border-slate-200',
                )}
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.isPinned && (
                          <Badge tone="neutral" className="bg-amber-100 font-bold text-amber-800">
                            <Pin className="mr-1 size-3 text-amber-700" />
                            {isKhmer ? 'បានខ្ទាស់' : 'Pinned'}
                          </Badge>
                        )}
                        {getCategoryBadge(item.category)}
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                          <Users className="size-3 text-slate-400" />
                          {getAudienceChip(item.audience)}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="size-3" />
                          {new Date(item.publishedAt || item.createdAt).toLocaleDateString(
                            isKhmer ? 'km-KH' : 'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' },
                          )}
                        </span>
                      </div>

                      <h3 className="text-base font-bold tracking-tight text-slate-950">
                        {item.title}
                      </h3>

                      <p className="text-xs leading-relaxed whitespace-pre-wrap text-slate-600 sm:text-sm">
                        {item.content}
                      </p>
                    </div>

                    {/* Action Controls */}
                    {canManage && (
                      <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTogglePin(item)}
                          className="size-8 p-0 text-slate-500 hover:text-amber-700"
                          title={item.isPinned ? 'Unpin' : 'Pin to top'}
                        >
                          {item.isPinned ? (
                            <PinOff className="size-3.5 text-amber-600" />
                          ) : (
                            <Pin className="size-3.5" />
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleBroadcastTelegram(item)}
                          disabled={broadcastingId === item._id}
                          className="size-8 p-0 text-slate-500 hover:text-sky-600"
                          title={isKhmer ? 'ផ្សាយទៅកាន់ Telegram' : 'Broadcast to Telegram'}
                        >
                          <Send
                            className={cn(
                              'size-3.5',
                              broadcastingId === item._id && 'animate-spin',
                            )}
                          />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onEdit(item)}
                          className="size-8 p-0 text-slate-500 hover:text-[#00509d]"
                          title={isKhmer ? 'កែសម្រួល' : 'Edit'}
                        >
                          <Edit2 className="size-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item._id)}
                          className="size-8 p-0 text-slate-500 hover:text-rose-600"
                          title={isKhmer ? 'លុប' : 'Delete'}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
