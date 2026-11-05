'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  RefreshCw,
  Send,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  User as UserIcon,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { adminReset2FaApi } from '@/features/auth/api/auth-api';
import { getUserById } from '@/features/users/api/user-api';
import type { User, UserStatus } from '@/features/users/types';
import { useTranslation } from '@/lib/i18n';

interface AdminUserDetailProps {
  id: string;
}

const getStatusTone = (status: UserStatus) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'warning';
    case 'locked':
      return 'danger';
    default:
      return 'neutral';
  }
};

export function AdminUserDetail({ id }: AdminUserDetailProps) {
  const { isKhmer } = useTranslation();

  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState<string | null>(null);

  // Emergency Reset Modal & State
  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  const fetchUserData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const res = await getUserById(id);
      if (res.data) {
        setUser(res.data);
      } else {
        throw new Error('User record not found');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch user record';
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleConfirmEmergencyReset = async () => {
    if (!user) return;
    try {
      setIsResetting(true);
      setActionError(null);
      const res = await adminReset2FaApi(user._id);

      setActionSuccess(
        res.message ||
          (isKhmer
            ? 'បានកំណត់ឡើងវិញនូវការផ្ទៀងផ្ទាត់ 2FA ដោយជោគជ័យ'
            : 'Two-Factor Authentication has been successfully reset.'),
      );
      setIsResetModalOpen(false);

      // Refresh local user state
      setUser((prev) => (prev ? { ...prev, twoFactorEnabled: false, telegramChatId: null } : null));
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isKhmer
            ? 'មិនអាចកំណត់ឡើងវិញនូវ 2FA បានទេ'
            : 'Failed to reset Two-Factor Authentication.';
      setActionError(msg);
    } finally {
      setIsResetting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <div className="size-8 animate-spin rounded-full border-3 border-[#0056FF] border-t-transparent" />
        <p className="text-xs font-medium text-slate-500">
          {isKhmer ? 'កំពុងទាញយកព័ត៌មានអ្នកប្រើប្រាស់...' : 'Loading user security details...'}
        </p>
      </div>
    );
  }

  if (fetchError || !user) {
    return (
      <div className="space-y-4">
        <Link
          href="/users"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="size-3.5" />
          <span>{isKhmer ? 'ត្រឡប់ទៅបញ្ជីអ្នកប្រើប្រាស់' : 'Back to User Directory'}</span>
        </Link>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <AlertCircle className="mx-auto size-8 text-rose-600" />
          <h3 className="mt-2 text-sm font-semibold text-rose-950">
            {isKhmer ? 'មិនអាចស្វែងរកអ្នកប្រើប្រាស់' : 'User Not Found'}
          </h3>
          <p className="mt-1 text-xs text-rose-700">{fetchError || 'Unknown error occurred.'}</p>
          <Button variant="outline" size="sm" onClick={fetchUserData} className="mt-4">
            <RefreshCw className="mr-1.5 size-3.5" />
            {isKhmer ? 'ព្យាយាមម្តងទៀត' : 'Retry'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            href="/users"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0056FF] transition-colors hover:text-[#0048D9]"
          >
            <ArrowLeft className="size-3.5" />
            <span>{isKhmer ? 'ត្រឡប់ទៅបញ្ជីអ្នកប្រើប្រាស់' : 'Back to Users'}</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {isKhmer ? 'ការគ្រប់គ្រងសុវត្ថិភាពអ្នកប្រើប្រាស់' : 'User Security & Access Management'}
          </h1>
          <p className="text-xs text-slate-500">
            {isKhmer
              ? 'ត្រួតពិនិត្យគណនី សិទ្ធិចូលប្រើប្រព័ន្ធ និងការកំណត់សុវត្ថិភាព 2FA'
              : 'Audit user credentials, access privileges, and Two-Factor Authentication security state.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUserData}
            className="h-8 gap-1.5 text-xs"
          >
            <RefreshCw className="size-3.5" />
            <span>{isKhmer ? 'ផ្ទុកទិន្នន័យឡើងវិញ' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      {/* Global Alerts */}
      {actionSuccess && (
        <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
          <div className="flex-1">
            <span className="font-semibold">{actionSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccess(null)}
            className="text-emerald-700 hover:text-emerald-950"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-600" />
          <div className="flex-1">
            <span className="font-semibold">{actionError}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="text-rose-700 hover:text-rose-950"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* User Identity Overview Card */}
      <Card className="rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-[#0056FF] ring-4 ring-[#0056FF]/10">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">{user.username}</h2>
                  <Badge tone={getStatusTone(user.status)}>{user.status.toUpperCase()}</Badge>
                  {user.twoFactorEnabled ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="size-3 text-emerald-600" />
                      2FA ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
                      <ShieldOff className="size-3 text-slate-400" />
                      2FA INACTIVE
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="size-3.5 text-slate-400" />
                    {user.email}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-slate-400" />
                    ID: <code className="font-mono text-slate-700">{user._id}</code>
                  </span>
                </div>
              </div>
            </div>

            {/* Role Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {user.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 uppercase"
                >
                  {r.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Two-Factor Authentication Security Card (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          <Card className="rounded-2xl border border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0056FF]">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      Two-Factor Authentication (2FA)
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      RFC 6238 TOTP, Recovery Backup Codes, and Telegram Fallback status
                    </CardDescription>
                  </div>
                </div>

                {user.twoFactorEnabled ? (
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800">
                    [ACTIVE]
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs font-bold text-slate-700">
                    [INACTIVE]
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5 pt-5">
              {user.twoFactorEnabled ? (
                <>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-emerald-950">
                          {isKhmer
                            ? 'ការផ្ទៀងផ្ទាត់ 2FA ត្រូវបានបើកដំណើរការ'
                            : 'Two-Factor Authentication is actively enforced'}
                        </h4>
                        <p className="text-xs leading-relaxed text-emerald-800">
                          {isKhmer
                            ? 'គណនីនេះតម្រូវឱ្យមានកូដផ្ទៀងផ្ទាត់ 6 ខ្ទង់ពីកម្មវិធី Authenticator, កូដបម្រុង 8 ខ្ទង់ ឬ Telegram OTP នៅពេលចូលប្រើប្រព័ន្ធ។'
                            : 'This user is protected with multi-factor authentication. Sign-in requires account credentials plus a verified 6-digit TOTP code, single-use backup code, or Telegram OTP.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Telegram Status */}
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                        <Send className="size-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          Telegram Fallback
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {user.telegramChatId ? (
                            <span>
                              Linked Chat ID:{' '}
                              <code className="font-mono text-slate-700">
                                {user.telegramChatId}
                              </code>
                            </span>
                          ) : (
                            'Not linked by user'
                          )}
                        </div>
                      </div>
                    </div>

                    {user.telegramChatId ? (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                        CONNECTED
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        OFF
                      </span>
                    )}
                  </div>

                  {/* Admin Break-Glass Reset Box */}
                  <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-amber-950">
                          {isKhmer
                            ? 'ការកំណត់ឡើងវិញបន្ទាន់ (Break-Glass 2FA Reset)'
                            : 'Administrator Emergency Break-Glass Reset'}
                        </h4>
                        <p className="text-xs leading-relaxed text-amber-900">
                          {isKhmer
                            ? 'ប្រសិនបើអ្នកប្រើប្រាស់បានបាត់បង់ទូរស័ព្ទ កូដបម្រុង និងមិនអាចចូលប្រើ Telegram បានទេ អ្នកគ្រប់គ្រងអាចកំណត់ឡើងវិញនូវ 2FA ដើម្បីឱ្យអ្នកប្រើប្រាស់អាចចូលដោយប្រើពាក្យសម្ងាត់តែមួយគត់។'
                            : 'If this user has permanently lost their mobile authenticator app, backup recovery codes, and Telegram fallback access, an authorized administrator can perform an emergency break-glass reset.'}
                        </p>
                        <div className="pt-2">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => setIsResetModalOpen(true)}
                            className="gap-2 bg-rose-600 font-semibold text-white shadow-xs hover:bg-rose-700"
                          >
                            <ShieldAlert className="size-4" />
                            <span>
                              {isKhmer ? 'កំណត់ឡើងវិញនូវ 2FA បន្ទាន់' : 'Emergency Reset 2FA'}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldOff className="mt-0.5 size-5 shrink-0 text-slate-400" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900">
                          {isKhmer
                            ? 'ការផ្ទៀងផ្ទាត់ 2FA មិនទាន់ត្រូវបានបើក'
                            : 'Two-Factor Authentication is Inactive'}
                        </h4>
                        <p className="text-xs leading-relaxed text-slate-600">
                          {isKhmer
                            ? 'អ្នកប្រើប្រាស់នេះមិនទាន់បានកំណត់រចនាសម្ព័ន្ធ 2FA នៅឡើយទេ។ ពួកគេអាចបើកវាដោយខ្លួនឯងតាមរយៈទំព័រ Security Settings។'
                            : 'This user has not configured two-factor authentication. They can enable it self-service from their Account Security Settings.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">
                    Emergency reset is disabled because this account does not have 2FA enabled.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Account Specifications & Metadata (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          <Card className="rounded-2xl border border-slate-200/90 bg-white shadow-xs">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <UserIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">
                    Account Details
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Credentials, institutional scoping, and audit timestamps
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3.5 pt-5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Username</span>
                <span className="font-semibold text-slate-900">{user.username}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Email Address</span>
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Branch Access</span>
                <span className="font-medium text-slate-900">
                  {user.branchAccess === 'all'
                    ? 'All Branches (Unrestricted)'
                    : `${Array.isArray(user.branchAccess) ? user.branchAccess.length : 0} Scoped Branches`}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Linked Employee</span>
                <span className="font-medium text-slate-900">
                  {typeof user.employeeId === 'object' && user.employeeId !== null
                    ? `${user.employeeId.firstName} ${user.employeeId.lastName} (${user.employeeId.employeeId})`
                    : 'Unlinked'}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Account Status</span>
                <Badge tone={getStatusTone(user.status)}>{user.status.toUpperCase()}</Badge>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-slate-500">Last Login</span>
                <span className="font-medium text-slate-700">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleString()
                    : 'Never logged in'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">Created At</span>
                <span className="font-mono text-[11px] text-slate-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Break-Glass Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-3xl border border-rose-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <ShieldAlert className="size-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">
                  {isKhmer ? 'បញ្ជាក់ការកំណត់ឡើងវិញបន្ទាន់ 2FA' : 'Confirm Emergency 2FA Reset'}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  User: <span className="font-semibold text-slate-800">{user.username}</span> (
                  {user.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                disabled={isResetting}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/70 p-3.5 text-xs leading-relaxed text-rose-800">
              <p className="font-semibold">
                {isKhmer
                  ? 'តើអ្នកប្រាកដថាចង់បិទការផ្ទៀងផ្ទាត់ 2FA សម្រាប់គណនីនេះមែនទេ?'
                  : 'Are you sure you want to forcibly deactivate 2FA for this user?'}
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-rose-700">
                <li>
                  {isKhmer
                    ? 'កូដសម្ងាត់ TOTP នឹងត្រូវបានលុបចោល'
                    : 'Current TOTP authenticator secret will be revoked.'}
                </li>
                <li>
                  {isKhmer
                    ? 'កូដបម្រុងទុកទាំងអស់នឹងលែងមានសុពលភាព'
                    : 'All unused single-use backup recovery codes will be deleted.'}
                </li>
                <li>
                  {isKhmer
                    ? 'ការភ្ជាប់ Telegram OTP នឹងត្រូវបានដកចេញ'
                    : 'Telegram OTP fallback link will be cleared.'}
                </li>
                <li>
                  {isKhmer
                    ? 'អ្នកប្រើប្រាស់អាចចូលប្រើប្រព័ន្ធដោយប្រើពាក្យសម្ងាត់តែមួយគត់'
                    : 'The user will immediately be able to sign in using their password only.'}
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsResetModalOpen(false)}
                disabled={isResetting}
                className="text-xs"
              >
                {isKhmer ? 'បោះបង់' : 'Cancel'}
              </Button>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleConfirmEmergencyReset}
                disabled={isResetting}
                className="gap-1.5 bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700"
              >
                {isResetting ? (
                  <>
                    <div className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>{isKhmer ? 'កំពុងកំណត់ឡើងវិញ...' : 'Resetting 2FA...'}</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="size-3.5" />
                    <span>{isKhmer ? 'បញ្ជាក់ការកំណត់ឡើងវិញ' : 'Confirm Emergency Reset'}</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
