'use client';

import * as React from 'react';
import { PhoneCall } from '@/components/icons';

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
import { useCreateParentContactLogMutation } from '../hooks/use-notifications';
import type { ContactOutcome, ContactPurpose, ContactType } from '../types';

interface ParentContactLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentId: string;
  studentName: string;
  defaultGuardianName?: string;
  defaultGuardianPhone?: string;
  defaultPurpose?: ContactPurpose;
  defaultNotes?: string;
}

export const ParentContactLogDialog: React.FC<ParentContactLogDialogProps> = ({
  open,
  onOpenChange,
  studentId,
  studentName,
  defaultGuardianName = '',
  defaultGuardianPhone = '',
  defaultPurpose = 'absence',
  defaultNotes = '',
}) => {
  const { isKhmer } = useTranslation();
  const createMutation = useCreateParentContactLogMutation();

  const [guardianName, setGuardianName] = React.useState(defaultGuardianName);
  const [guardianPhone, setGuardianPhone] = React.useState(defaultGuardianPhone);
  const [contactType, setContactType] = React.useState<ContactType>('phone_call');
  const [purpose, setPurpose] = React.useState<ContactPurpose>(defaultPurpose);
  const [outcome, setOutcome] = React.useState<ContactOutcome>('reached');
  const [notes, setNotes] = React.useState(defaultNotes);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open) {
      setGuardianName(defaultGuardianName);
      setGuardianPhone(defaultGuardianPhone);
      setPurpose(defaultPurpose);
      setNotes(defaultNotes);
      setErrorMsg(null);
    }
  }, [open, defaultGuardianName, defaultGuardianPhone, defaultPurpose, defaultNotes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardianName.trim() || !notes.trim()) {
      setErrorMsg(
        isKhmer
          ? 'សូមបំពេញឈ្មោះអាណាព្យាបាល និងកំណត់ចំណាំ'
          : 'Please provide guardian name and notes',
      );
      return;
    }

    try {
      await createMutation.mutateAsync({
        studentId,
        guardianName: guardianName.trim(),
        guardianPhone: guardianPhone.trim() || undefined,
        contactType,
        purpose,
        outcome,
        notes: notes.trim(),
      });
      onOpenChange(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save contact log');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-6 sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <PhoneCall className="size-5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-950">
                {isKhmer ? 'កត់ត្រាការទាក់ទងអាណាព្យាបាល' : 'Log Parent Outreach'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {studentName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-3">
          {errorMsg && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'ឈ្មោះអាណាព្យាបាល' : 'Guardian Name'}
              </label>
              <Input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'លេខទូរស័ព្ទ' : 'Phone Number'}
              </label>
              <Input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'មធ្យោបាយទាក់ទង' : 'Contact Channel'}
              </label>
              <select
                value={contactType}
                onChange={(e) => setContactType(e.target.value as ContactType)}
                className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="phone_call">
                  {isKhmer ? 'ហៅទូរស័ព្ទ (Phone Call)' : 'Phone Call'}
                </option>
                <option value="telegram">{isKhmer ? 'ផ្ញើសារ Telegram' : 'Telegram'}</option>
                <option value="sms">{isKhmer ? 'ផ្ញើសារ SMS' : 'SMS'}</option>
                <option value="in_person">{isKhmer ? 'ជួបផ្ទាល់ (In Person)' : 'In Person'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                {isKhmer ? 'គោលបំណង' : 'Purpose'}
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as ContactPurpose)}
                className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
              >
                <option value="absence">{isKhmer ? 'អវត្តមានសិស្ស' : 'Absence'}</option>
                <option value="tuition">{isKhmer ? 'ថ្លៃសិក្សា/បំណុល' : 'Tuition / Fee'}</option>
                <option value="behavior">{isKhmer ? 'វិន័យ និងអាកប្បកិរិយា' : 'Behavior'}</option>
                <option value="academic">{isKhmer ? 'លទ្ធផលសិក្សា' : 'Academic'}</option>
                <option value="general">{isKhmer ? 'កិច្ចការទូទៅ' : 'General'}</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              {isKhmer ? 'លទ្ធផលនៃការទាក់ទង' : 'Call / Outreach Outcome'}
            </label>
            <select
              value={outcome}
              onChange={(e) => setOutcome(e.target.value as ContactOutcome)}
              className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 focus:border-[#00509d] focus:outline-none"
            >
              <option value="reached">
                {isKhmer ? 'បានជួបសន្ទនា (Reached)' : 'Reached / Answered'}
              </option>
              <option value="no_answer">
                {isKhmer ? 'មិនលើកទូរស័ព្ទ (No Answer)' : 'No Answer'}
              </option>
              <option value="left_message">
                {isKhmer ? 'បានផ្ញើសារទុក (Left Message)' : 'Left Message'}
              </option>
              <option value="callback_requested">
                {isKhmer ? 'សុំទាក់ទងមកវិញ (Callback Requested)' : 'Callback Requested'}
              </option>
              <option value="resolved">
                {isKhmer ? 'ដោះស្រាយរួចរាល់ (Resolved)' : 'Resolved'}
              </option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700">
              {isKhmer ? 'កំណត់ចំណាំលម្អិត' : 'Discussion Notes'}
            </label>
            <textarea
              rows={3}
              placeholder={isKhmer ? 'កត់ត្រាការសន្ទនា...' : 'Enter details of discussion...'}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#00509d] focus:ring-1 focus:ring-[#00509d] focus:outline-none"
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
              disabled={createMutation.isPending}
              className="h-8 bg-[#023e8a] hover:bg-[#00509d]"
            >
              {createMutation.isPending
                ? isKhmer
                  ? 'កំពុងរក្សាទុក...'
                  : 'Saving...'
                : isKhmer
                  ? 'រក្សាទុកកំណត់ត្រា'
                  : 'Save Outreach Log'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
