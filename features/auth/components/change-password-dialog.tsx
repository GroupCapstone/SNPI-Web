'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, KeyRound, Lock } from '@/components/icons';
import { useForm } from 'react-hook-form';

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

import { useAuth } from '../context/auth-context';
import type { ChangePasswordFormData } from '../schemas/change-password-schema';
import { changePasswordFormSchema } from '../schemas/change-password-schema';

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangePasswordDialog = ({ open, onOpenChange }: ChangePasswordDialogProps) => {
  const { changePassword } = useAuth();
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleClose = () => {
    reset();
    setErrorMessage(null);
    onOpenChange(false);
  };

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setErrorMessage(null);
      await changePassword(data);
      handleClose();
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to change password';
      setErrorMessage(msg);
    }
  };

  const onValidationError = (formErrors: typeof errors) => {
    const errorKeys = Object.keys(formErrors);
    if (errorKeys.length > 0) {
      const firstKey = errorKeys[0] as keyof typeof formErrors;
      const firstError = formErrors[firstKey];
      const msg =
        typeof firstError?.message === 'string'
          ? firstError.message
          : `Please fill in all required fields (${errorKeys.join(', ')})`;
      setErrorMessage(`Validation Error: ${msg}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5.5 shrink-0 text-[#00509d]" />
            <div>
              <DialogTitle className="text-base">Change Account Password</DialogTitle>
              <DialogDescription className="text-xs">
                Update your security credentials. You will be logged out upon completion.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="size-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit, onValidationError)} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                type={showCurrent ? 'text' : 'password'}
                className="pr-10 pl-9"
                placeholder="Enter current password"
                {...register('currentPassword')}
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600"
                onClick={() => setShowCurrent(!showCurrent)}
                tabIndex={-1}
              >
                {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">New Password</label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                type={showNew ? 'text' : 'password'}
                className="pr-10 pl-9"
                placeholder="Min. 8 characters with Aa1@"
                {...register('newPassword')}
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600"
                onClick={() => setShowNew(!showNew)}
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs font-medium text-rose-600">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
              <Input
                type={showConfirm ? 'text' : 'password'}
                className="pr-10 pl-9"
                placeholder="Re-enter new password"
                {...register('confirmPassword')}
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#023e8a] hover:bg-[#00509d]"
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
