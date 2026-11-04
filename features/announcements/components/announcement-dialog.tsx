'use client';

import * as React from 'react';
import { Bell, Send } from '@/components/icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSendNotificationMutation } from '@/features/notifications/hooks/use-notifications';
import { useTranslation } from '@/lib/i18n';
import {
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
} from '../hooks/use-announcements';
import type { AnnouncementAudience, AnnouncementCategory, AnnouncementItem } from '../types';

interface AnnouncementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId?: string;
  announcement?: AnnouncementItem | null;
}

export const AnnouncementDialog: React.FC<AnnouncementDialogProps> = ({
  open,
  onOpenChange,
  branchId,
  announcement,
}) => {
  const { isKhmer } = useTranslation();
  const createMutation = useCreateAnnouncementMutation();
  const updateMutation = useUpdateAnnouncementMutation();
  const sendNotifMutation = useSendNotificationMutation();

  const isEditing = Boolean(announcement);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [category, setCategory] = React.useState<AnnouncementCategory>('general');
  const [audience, setAudience] = React.useState<AnnouncementAudience>('all');
  const [isPinned, setIsPinned] = React.useState(false);
  const [broadcastToTelegram, setBroadcastToTelegram] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      if (announcement) {
        setTitle(announcement.title);
        setContent(announcement.content);
        setCategory(announcement.category);
        setAudience(announcement.audience);
        setIsPinned(announcement.isPinned);
        setBroadcastToTelegram(false);
      } else {
        setTitle('');
        setContent('');
        setCategory('general');
        setAudience('all');
        setIsPinned(false);
        setBroadcastToTelegram(false);
      }
      setErrorMsg(null);
    }
  }, [open, announcement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMsg(
        isKhmer ? 'សូមបំពេញចំណងជើង និងខ្លឹមសារសេចក្តីជូនដំណឹង' : 'Please provide title and content',
      );
      return;
    }

    try {
      if (isEditing && announcement) {
        await updateMutation.mutateAsync({
          id: announcement._id,
          dto: {
            title: title.trim(),
            content: content.trim(),
            category,
            audience,
            isPinned,
          },
        });
      } else {
        const created = await createMutation.mutateAsync({
          branchId,
          title: title.trim(),
          content: content.trim(),
          category,
          audience,
          isPinned,
        });

        if (broadcastToTelegram && created?.data) {
          try {
            await sendNotifMutation.mutateAsync({
              branchId,
              channel: 'telegram',
              type: 'announcement',
              recipientType: 'broadcast',
              title: title.trim(),
              body: content.trim(),
            });
          } catch {
            // Non-blocking broadcast
          }
        }
      }

      onOpenChange(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save announcement');
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white p-6 sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <Bell className="size-5 shrink-0 text-amber-600" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-950">
                {isEditing
                  ? isKhmer
                    ? 'កែសម្រួលសេចក្តីជូនដំណឹង'
                    : 'Edit Campus Announcement'
                  : isKhmer
                    ? 'បង្កើតសេចក្តីជូនដំណឹងថ្មី'
                    : 'Post New Campus Announcement'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {isKhmer
                  ? 'ផ្សព្វផ្សាយព័ត៌មាន និងសេចក្តីជូនដំណឹងទូទាំងសាលារៀន'
                  : 'Broadcast news and alerts across the school community.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-3.5">
          {errorMsg && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              {isKhmer ? 'ចំណងជើងសេចក្តីជូនដំណឹង' : 'Announcement Title'}
            </label>
            <Input
              type="text"
              placeholder={isKhmer ? 'បញ្ចូលចំណងជើង...' : 'Enter announcement title...'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'ប្រភេទ' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="general">{isKhmer ? 'ទូទៅ (General)' : 'General'}</option>
                <option value="urgent">{isKhmer ? 'បន្ទាន់ (Urgent)' : 'Urgent'}</option>
                <option value="academic">{isKhmer ? 'សិក្សាធិការ (Academic)' : 'Academic'}</option>
                <option value="finance">{isKhmer ? 'ហិរញ្ញវត្ថុ (Finance)' : 'Finance'}</option>
                <option value="event">{isKhmer ? 'ព្រឹត្តិការណ៍ (Event)' : 'Event'}</option>
                <option value="attendance">
                  {isKhmer ? 'វត្តមាន (Attendance)' : 'Attendance'}
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'អ្នកទទួល' : 'Audience Target'}
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as AnnouncementAudience)}
                className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="all">{isKhmer ? 'ទូទាំងសាលា (Everyone)' : 'Everyone'}</option>
                <option value="parents">{isKhmer ? 'អាណាព្យាបាល (Parents)' : 'Parents'}</option>
                <option value="students">{isKhmer ? 'សិស្ស (Students)' : 'Students'}</option>
                <option value="teachers">{isKhmer ? 'គ្រូបង្រៀន (Teachers)' : 'Teachers'}</option>
                <option value="staff">{isKhmer ? 'បុគ្គលិក (Staff)' : 'Staff'}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              {isKhmer ? 'ខ្លឹមសារលម្អិត' : 'Announcement Content'}
            </label>
            <textarea
              rows={5}
              placeholder={
                isKhmer ? 'បញ្ចូលខ្លឹមសារសេចក្តីជូនដំណឹង...' : 'Write announcement content here...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
              required
            />
          </div>

          {/* Pin & Broadcast Toggles */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <label className="flex items-center gap-2 text-xs text-slate-700">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="rounded border-slate-300 text-[#00509d] focus:ring-[#00509d]"
              />
              <span className="font-medium">
                {isKhmer
                  ? 'ខ្ទាស់សេចក្តីជូនដំណឹងនេះនៅខាងលើគេ (Pin to top)'
                  : 'Pin this announcement to top'}
              </span>
            </label>

            {!isEditing && (
              <label className="flex items-center gap-2 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={broadcastToTelegram}
                  onChange={(e) => setBroadcastToTelegram(e.target.checked)}
                  className="rounded border-slate-300 text-[#00509d] focus:ring-[#00509d]"
                />
                <span className="flex items-center gap-1 font-medium text-sky-700">
                  <Send className="size-3" />
                  {isKhmer
                    ? 'ផ្សាយដំណឹងនេះទៅកាន់ Telegram Bot ផងដែរ'
                    : 'Simultaneously broadcast to Telegram channel'}
                </span>
              </label>
            )}
          </div>

          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8"
            >
              {isKhmer ? 'បោះបង់' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="h-8 bg-[#023e8a] hover:bg-[#00509d]"
            >
              {isPending
                ? isKhmer
                  ? 'កំពុងរក្សាទុក...'
                  : 'Saving...'
                : isEditing
                  ? isKhmer
                    ? 'កែសម្រួល'
                    : 'Update Announcement'
                  : isKhmer
                    ? 'ផ្សាយដំណឹង'
                    : 'Post Announcement'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
