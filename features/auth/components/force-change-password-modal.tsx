'use client';

import * as React from 'react';
import { AlertCircle, Check, Eye, EyeOff, KeyRound, LogOut, ShieldAlert } from '@/components/icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useAuth } from '../context/auth-context';

export const ForceChangePasswordModal = () => {
  const { user, changePassword, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const isMustChange = Boolean(user?.mustChangePassword);

  const checks = React.useMemo(() => {
    return {
      length: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      special: /[^a-zA-Z0-9]/.test(newPassword),
      match: newPassword.length > 0 && newPassword === confirmPassword,
    };
  }, [newPassword, confirmPassword]);

  const allChecksPassed =
    checks.length &&
    checks.upper &&
    checks.lower &&
    checks.number &&
    checks.special &&
    checks.match &&
    currentPassword.trim().length > 0;

  if (!isMustChange) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentPassword.trim()) {
      setErrorMessage('Please enter your current temporary password.');
      return;
    }

    if (!allChecksPassed) {
      setErrorMessage('Please satisfy all password complexity requirements.');
      return;
    }

    try {
      setIsSubmitting(true);
      await changePassword({
        currentPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
        confirmPassword: confirmPassword.trim(),
      });
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to change password.';
      setErrorMessage(msg);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isMustChange} onOpenChange={() => {}}>
      <DialogContent className="max-w-md border-amber-200 bg-white">
        <DialogHeader>
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="size-6 shrink-0 text-amber-600" />
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Mandatory Password Change
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                You must update your temporary password to continue.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
          <p className="font-semibold text-amber-950">Security Policy Requirement</p>
          <p className="mt-0.5 text-amber-800">
            For account safety, temporary passwords issued by administrators must be replaced with
            your private confidential password upon first login.
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="py-4 text-center">
            <Check className="mx-auto size-12 text-emerald-600" />
            <h3 className="mt-2 text-sm font-bold text-slate-900">Password Updated Successfully</h3>
            <p className="mt-1 text-xs text-slate-500">
              Redirecting you to sign in with your new password...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Current Temporary Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter the temporary password"
                  className="h-9 pr-10 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute top-2 right-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                New Private Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 8 characters, with uppercase, number, symbol"
                  className="h-9 pr-10 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute top-2 right-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Confirm New Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="h-9 pr-10 text-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-2 right-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Live Complexity Checklist */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Password Checklist:</span>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.length ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.length ? 'font-medium text-emerald-700' : ''}>
                    8+ Characters
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.upper ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.upper ? 'font-medium text-emerald-700' : ''}>
                    1 Uppercase (A-Z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.lower ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.lower ? 'font-medium text-emerald-700' : ''}>
                    1 Lowercase (a-z)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.number ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.number ? 'font-medium text-emerald-700' : ''}>
                    1 Number (0-9)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.special ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.special ? 'font-medium text-emerald-700' : ''}>
                    1 Symbol (!@#$...)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${checks.match ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  />
                  <span className={checks.match ? 'font-medium text-emerald-700' : ''}>
                    Passwords Match
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="h-9 gap-1.5 text-xs text-slate-500 hover:text-slate-900"
              >
                <LogOut className="size-3.5" />
                Sign Out
              </Button>

              <Button
                type="submit"
                disabled={!allChecksPassed || isSubmitting}
                className="h-9 bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
              >
                <KeyRound className="mr-1.5 size-3.5" />
                {isSubmitting ? 'Updating...' : 'Set New Password'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
