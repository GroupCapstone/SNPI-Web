'use client';

import * as React from 'react';
import { Send, Smartphone } from '@/components/icons';

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
import { useTranslation } from '@/lib/i18n';
import { useSendNotificationMutation } from '../hooks/use-notifications';
import type { NotificationChannel, NotificationRecipientType, NotificationType } from '../types';

interface SendNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchId?: string;
  defaultRecipient?: {
    type: NotificationRecipientType;
    id?: string;
    name?: string;
    phone?: string;
    chatId?: string;
  };
  defaultType?: NotificationType;
  defaultTitle?: string;
  defaultBody?: string;
}

export const SendNotificationDialog: React.FC<SendNotificationDialogProps> = ({
  open,
  onOpenChange,
  branchId,
  defaultRecipient,
  defaultType = 'custom',
  defaultTitle = '',
  defaultBody = '',
}) => {
  const { isKhmer } = useTranslation();
  const sendMutation = useSendNotificationMutation();

  const [channel, setChannel] = React.useState<NotificationChannel>('telegram');
  const [recipientType, setRecipientType] = React.useState<NotificationRecipientType>(
    defaultRecipient?.type || 'guardian',
  );
  const [recipientName, setRecipientName] = React.useState(defaultRecipient?.name || '');
  const [recipientPhone, setRecipientPhone] = React.useState(defaultRecipient?.phone || '');
  const [recipientChatId, setRecipientChatId] = React.useState(defaultRecipient?.chatId || '');
  const [title, setTitle] = React.useState(defaultTitle);
  const [body, setBody] = React.useState(defaultBody);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setRecipientName(defaultRecipient?.name || '');
      setRecipientPhone(defaultRecipient?.phone || '');
      setRecipientChatId(defaultRecipient?.chatId || '');
      setTitle(defaultTitle);
      setBody(defaultBody);
      setErrorMsg(null);
    }
  }, [open, defaultRecipient, defaultTitle, defaultBody]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setErrorMsg(
        isKhmer ? 'សូមបំពេញចំណងជើង និងខ្លឹមសារសារ' : 'Please fill in both title and body content',
      );
      return;
    }

    try {
      await sendMutation.mutateAsync({
        branchId,
        channel,
        type: defaultType,
        recipientType,
        recipientName: recipientName.trim() || undefined,
        recipientPhone: recipientPhone.trim() || undefined,
        recipientChatId: recipientChatId.trim() || undefined,
        title: title.trim(),
        body: body.trim(),
      });
      onOpenChange(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send notification');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white p-6 sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-slate-950">
            {isKhmer ? 'ផ្ញើសារជូនដំណឹង' : 'Send Notification Message'}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {isKhmer
              ? 'ផ្ញើសារទៅកាន់អាណាព្យាបាល សិស្ស ឬបុគ្គលិកតាមប្រព័ន្ធ Telegram ឬ SMS'
              : 'Dispatch an alert or notice directly via Telegram or SMS Gateway.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          {/* Channel Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">
              {isKhmer ? 'ប្រព័ន្ធបញ្ជូន (Channel)' : 'Notification Channel'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setChannel('telegram')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition-colors ${
                  channel === 'telegram'
                    ? 'border-[#00509d] bg-sky-50 text-[#00509d]'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Send className="size-3.5" />
                Telegram
              </button>

              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition-colors ${
                  channel === 'sms'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="size-3.5" />
                SMS
              </button>

              <button
                type="button"
                onClick={() => setChannel('in_app')}
                className={`flex items-center justify-center gap-1.5 rounded-xl border p-2 text-xs font-semibold transition-colors ${
                  channel === 'in_app'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                In-App
              </button>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'ប្រភេទអ្នកទទួល' : 'Recipient Type'}
              </label>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value as NotificationRecipientType)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="guardian">{isKhmer ? 'អាណាព្យាបាល (Guardian)' : 'Guardian'}</option>
                <option value="student">{isKhmer ? 'សិស្ស (Student)' : 'Student'}</option>
                <option value="teacher">{isKhmer ? 'គ្រូបង្រៀន (Teacher)' : 'Teacher'}</option>
                <option value="staff">{isKhmer ? 'បុគ្គលិក (Staff)' : 'Staff'}</option>
                <option value="broadcast">{isKhmer ? 'ផ្សាយទូទៅ (Broadcast)' : 'Broadcast'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'ឈ្មោះអ្នកទទួល' : 'Recipient Name'}
              </label>
              <Input
                type="text"
                placeholder={isKhmer ? 'ឧ. លោក សុខ ចាន់' : 'e.g. Sok Chan'}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          {channel === 'sms' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'លេខទូរស័ព្ទ (SMS Phone)' : 'Mobile Phone Number'}
              </label>
              <Input
                type="text"
                placeholder="012 345 678"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          )}

          {channel === 'telegram' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer
                  ? 'Telegram Chat ID ឬ Channel (ជម្រើស)'
                  : 'Telegram Chat ID / Channel (Optional)'}
              </label>
              <Input
                type="text"
                placeholder="@snp_school_notifications"
                value={recipientChatId}
                onChange={(e) => setRecipientChatId(e.target.value)}
                className="h-8 text-xs"
              />
              <p className="text-xs text-slate-500">
                {isKhmer
                  ? 'ប្រសិនបើទុកទទេ ប្រព័ន្ធនឹងប្រើ Channel លំនាំដើមក្នុង Settings'
                  : 'Leave blank to use the default school Telegram channel'}
              </p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              {isKhmer ? 'ចំណងជើងសារ' : 'Subject / Title'}
            </label>
            <Input
              type="text"
              placeholder={isKhmer ? 'បញ្ចូលចំណងជើងសារ...' : 'Enter message title...'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>

          {/* Body */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              {isKhmer ? 'ខ្លឹមសារសារ' : 'Message Content'}
            </label>
            <textarea
              rows={4}
              placeholder={
                isKhmer ? 'បញ្ចូលខ្លឹមសារលម្អិត...' : 'Type notification content here...'
              }
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
              required
            />
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
              disabled={sendMutation.isPending}
              className="h-8 bg-[#023e8a] hover:bg-[#00509d]"
            >
              <Send className="mr-1.5 size-3.5" />
              {sendMutation.isPending
                ? isKhmer
                  ? 'កំពុងបញ្ជូន...'
                  : 'Sending...'
                : isKhmer
                  ? 'បញ្ជូនសារ'
                  : 'Dispatch'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
