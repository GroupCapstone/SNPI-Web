'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  KeyRound,
  Lock,
  QrCode,
  Send,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  X,
} from '@/components/icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  disable2FaApi,
  enable2FaApi,
  getMeApi,
  linkTelegram2FaApi,
  setup2FaApi,
} from '@/features/auth/api/auth-api';
import type { AuthUser, Setup2FaResponse } from '@/features/auth/types';
import { useTranslation } from '@/lib/i18n';

export default function SecuritySettingsPage() {
  const { isKhmer } = useTranslation();

  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // 2FA Setup Flow State
  const [setupData, setSetupData] = React.useState<Setup2FaResponse['data'] | null>(null);
  const [isStartingSetup, setIsStartingSetup] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState('');
  const [isActivating, setIsActivating] = React.useState(false);
  const [secretCopied, setSecretCopied] = React.useState(false);
  const [codesCopied, setCodesCopied] = React.useState(false);

  // Telegram Fallback State
  const [telegramChatId, setTelegramChatId] = React.useState('');
  const [isLinkingTelegram, setIsLinkingTelegram] = React.useState(false);

  // Protected Deactivation Dialog State
  const [isDisableModalOpen, setIsDisableModalOpen] = React.useState(false);
  const [disablePassword, setDisablePassword] = React.useState('');
  const [disableCode, setDisableCode] = React.useState('');
  const [isDisabling, setIsDisabling] = React.useState(false);
  const [disableError, setDisableError] = React.useState<string | null>(null);

  // Load current user profile
  const fetchUser = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getMeApi();
      if (res.success && res.data) {
        setUser(res.data);
        if (res.data.telegramChatId) {
          setTelegramChatId(res.data.telegramChatId);
        }
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : isKhmer
            ? 'មិនអាចទាញយកទិន្នន័យសុវត្ថិភាពបានទេ'
            : 'Failed to load security profile.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [isKhmer]);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Step 1: Initiate 2FA Setup
  const handleStartSetup = async () => {
    try {
      setIsStartingSetup(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const res = await setup2FaApi();
      if (res.success && res.data) {
        setSetupData(res.data);
      } else {
        throw new Error(res.message || 'Failed to initialize 2FA setup');
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to generate 2FA setup credentials.',
      );
    } finally {
      setIsStartingSetup(false);
    }
  };

  // Step 2: Enable 2FA with live 6-digit code
  const handleEnable2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verifyCode.trim();
    if (!code) {
      setErrorMessage(
        isKhmer
          ? 'សូមបញ្ចូលកូដ 6 ខ្ទង់ពី Authenticator app'
          : 'Please enter the 6-digit code from your authenticator app.',
      );
      return;
    }

    try {
      setIsActivating(true);
      setErrorMessage(null);
      const res = await enable2FaApi(code);
      if (res.success) {
        setSuccessMessage(
          isKhmer
            ? 'ការផ្ទៀងផ្ទាត់ពីរកត្តា (2FA) ត្រូវបានបើកដំណើរការដោយជោគជ័យ'
            : '[ACTIVE] Two-Factor Authentication is now enabled for your account.',
        );
        setSetupData(null);
        setVerifyCode('');
        await fetchUser();
      } else {
        throw new Error(res.message || 'Failed to activate 2FA');
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Invalid verification code. Please check your authenticator clock and try again.',
      );
    } finally {
      setIsActivating(false);
    }
  };

  // Step 3: Link Telegram Chat ID for OTP Fallback
  const handleLinkTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    const chatId = telegramChatId.trim();
    if (!chatId) {
      setErrorMessage(
        isKhmer ? 'សូមបញ្ចូល Telegram Chat ID' : 'Please enter a valid Telegram Chat ID.',
      );
      return;
    }

    try {
      setIsLinkingTelegram(true);
      setErrorMessage(null);
      setSuccessMessage(null);
      const res = await linkTelegram2FaApi(chatId);
      if (res.success) {
        setSuccessMessage(
          isKhmer
            ? 'គណនី Telegram ត្រូវបានភ្ជាប់សម្រាប់ទទួលកូដ OTP ដោយជោគជ័យ'
            : '[LINKED] Telegram Chat ID linked successfully for fallback authentication.',
        );
        await fetchUser();
      } else {
        throw new Error(res.message || 'Failed to link Telegram');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to register Telegram Chat ID.');
    } finally {
      setIsLinkingTelegram(false);
    }
  };

  // Step 4: Protected Deactivation
  const handleDisable2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disablePassword.trim() || !disableCode.trim()) {
      setDisableError(
        isKhmer
          ? 'សូមបញ្ចូលទាំងពាក្យសម្ងាត់ និងកូដផ្ទៀងផ្ទាត់បច្ចុប្បន្ន'
          : 'Both account password and a current 6-digit or backup code are required.',
      );
      return;
    }

    try {
      setIsDisabling(true);
      setDisableError(null);
      const res = await disable2FaApi({
        password: disablePassword,
        code: disableCode.trim(),
      });

      if (res.success) {
        setIsDisableModalOpen(false);
        setDisablePassword('');
        setDisableCode('');
        setSuccessMessage(
          isKhmer
            ? 'ការផ្ទៀងផ្ទាត់ពីរកត្តា (2FA) ត្រូវបានបិទ'
            : '[INACTIVE] Two-Factor Authentication has been disabled.',
        );
        await fetchUser();
      } else {
        throw new Error(res.message || 'Failed to disable 2FA');
      }
    } catch (err) {
      setDisableError(
        err instanceof Error
          ? err.message
          : 'Deactivation failed. Please verify your password and current 2FA code.',
      );
    } finally {
      setIsDisabling(false);
    }
  };

  // Helper: Download Backup Codes as .txt
  const handleDownloadBackupCodes = () => {
    if (!setupData?.backupCodes) return;
    const content = [
      '======================================================',
      'SNPI SCHOOL MANAGEMENT SYSTEM - 2FA BACKUP CODES',
      `Account: ${user?.username || 'User'} (${user?.email || ''})`,
      `Date Generated: ${new Date().toISOString()}`,
      '======================================================',
      '',
      'Store these single-use recovery codes in a secure location.',
      'Each code can only be used once to access your account.',
      '',
      ...setupData.backupCodes.map((c, i) => `${i + 1}. ${c}`),
      '',
      '======================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `snpi-2fa-backup-codes-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper: Copy Secret
  const handleCopySecret = async () => {
    if (!setupData?.secret) return;
    try {
      await navigator.clipboard.writeText(setupData.secret);
      setSecretCopied(true);
      setTimeout(() => setSecretCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Helper: Copy All Backup Codes
  const handleCopyCodes = async () => {
    if (!setupData?.backupCodes) return;
    try {
      await navigator.clipboard.writeText(setupData.backupCodes.join('\n'));
      setCodesCopied(true);
      setTimeout(() => setCodesCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const is2FaEnabled = Boolean(user?.twoFactorEnabled);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/settings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition-colors hover:text-[#00509d]"
        >
          <ArrowLeft className="size-3.5" />
          <span>{isKhmer ? 'ត្រឡប់ទៅការកំណត់' : 'Back to Settings'}</span>
        </Link>
        <span className="font-mono text-[11px] text-slate-400">RFC 6238 · TOTP Security</span>
      </div>

      {/* Header Banner */}
      <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
              {isKhmer
                ? 'សុវត្ថិភាពគណនី & ការផ្ទៀងផ្ទាត់ 2FA'
                : 'Account Security & Two-Factor Authentication'}
            </h1>
            <Badge tone={is2FaEnabled ? 'success' : 'neutral'}>
              {is2FaEnabled ? '[ACTIVE]' : '[INACTIVE]'}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            {isKhmer
              ? 'ការពារគណនីរបស់អ្នកជាមួយកូដផ្ទៀងផ្ទាត់ពីរកត្តា (TOTP), កូដបម្រុង និងការបញ្ជូនកូដតាម Telegram'
              : 'Enforce RFC 6238 Time-based One-Time Password (TOTP) verification, single-use recovery codes, and Telegram OTP fallback.'}
          </p>
        </div>
      </div>

      {/* Global Alerts */}
      {errorMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: 2FA STATUS & SETUP FLOW                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7">
        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                is2FaEnabled
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              {is2FaEnabled ? (
                <ShieldCheck className="size-5" />
              ) : (
                <ShieldAlert className="size-5" />
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isKhmer
                  ? 'ការផ្ទៀងផ្ទាត់ពីរកត្តា (Two-Factor Authentication)'
                  : 'Two-Factor Authentication (2FA)'}
              </h2>
              <p className="text-xs text-slate-500">
                {is2FaEnabled
                  ? isKhmer
                    ? 'គណនីរបស់អ្នកត្រូវបានការពារដោយកូដសុវត្ថិភាព 2FA'
                    : 'Active protection: Authenticator app code required on every sign-in.'
                  : isKhmer
                    ? 'មិនទាន់បានបើកដំណើរការនៅឡើយទេ'
                    : 'Currently disabled. Anyone with your password can access your account.'}
              </p>
            </div>
          </div>

          {!is2FaEnabled && !setupData && (
            <Button
              type="button"
              disabled={isStartingSetup || isLoading}
              onClick={handleStartSetup}
              className="cursor-pointer gap-2 rounded-xl bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
            >
              <Smartphone className="size-4" />
              <span>
                {isStartingSetup
                  ? isKhmer
                    ? 'កំពុងរៀបចំ...'
                    : 'Setting up...'
                  : isKhmer
                    ? 'បើកដំណើរការ 2FA'
                    : 'Enable 2FA'}
              </span>
            </Button>
          )}

          {is2FaEnabled && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDisableModalOpen(true)}
              className="cursor-pointer gap-1.5 rounded-xl border-rose-200 bg-rose-50/50 text-xs font-semibold text-rose-700 hover:bg-rose-100/70"
            >
              <Lock className="size-3.5" />
              <span>{isKhmer ? 'បិទដំណើរការ 2FA' : 'Disable 2FA'}</span>
            </Button>
          )}
        </div>

        {/* SETUP WIZARD (Shown when setupData is populated) */}
        {setupData && !is2FaEnabled && (
          <div className="animate-in fade-in space-y-6 pt-6 duration-200">
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-xs text-slate-700">
              <span className="font-bold text-[#00509d]">
                {isKhmer ? 'ជំហានរៀបចំ 2FA៖' : 'Setup Instructions:'}
              </span>{' '}
              {isKhmer
                ? 'សូមស្កេន QR Code ខាងក្រោមដោយប្រើកម្មវិធី Google Authenticator, Authy ឬ 1Password បន្ទាប់មករក្សាទុកកូដបម្រុងទុក ហើយបញ្ចូលកូដ 6 ខ្ទង់ដើម្បីបញ្ចប់។'
                : 'Scan the QR code below using Google Authenticator, Authy, or 1Password. Save your 8 single-use backup recovery codes, then verify with the 6-digit code to activate.'}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column: QR Code & Secret Key */}
              <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <QrCode className="size-4 text-[#00509d]" />
                  <span>1. {isKhmer ? 'ស្កេន QR Code' : 'Scan QR Code'}</span>
                </div>

                <div className="flex justify-center rounded-xl border border-slate-200 bg-white p-3">
                  {/* Base64 PNG QR Code rendered directly */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={setupData.qrCodeDataUrl}
                    alt="SNPI 2FA Authenticator QR Code"
                    className="size-48 object-contain"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                    {isKhmer ? 'ឬបញ្ចូលកូដ Secret ដោយដៃ៖' : 'Or enter secret key manually:'}
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-xs font-bold text-slate-900">
                      {setupData.secret}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopySecret}
                      className="cursor-pointer gap-1 text-xs"
                    >
                      <Copy className="size-3" />
                      <span>{secretCopied ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Single-Use Backup Recovery Codes */}
              <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <KeyRound className="size-4 text-emerald-600" />
                    <span>2. {isKhmer ? 'កូដបម្រុងទុក (8 Codes)' : 'Backup Recovery Codes'}</span>
                  </div>
                  <Badge tone="warning">Single-Use</Badge>
                </div>

                <p className="text-[11px] text-slate-500">
                  {isKhmer
                    ? 'កូដនីមួយៗអាចប្រើបានម្តង ប្រសិនបើអ្នកបាត់បង់ទូរស័ព្ទ។ សូមរក្សាទុកវាឱ្យមានសុវត្ថិភាព។'
                    : 'Keep these single-use recovery codes safe. Each code can be used once if you lose access to your authenticator app.'}
                </p>

                {/* 2x4 Grid of Backup Codes */}
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-3">
                  {setupData.backupCodes.map((code) => (
                    <div
                      key={code}
                      className="rounded-lg border border-slate-100 bg-slate-50/80 px-2.5 py-1.5 text-center font-mono text-xs font-bold text-slate-800 select-all"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                {/* Actions: Download .txt and Copy */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadBackupCodes}
                    className="flex-1 cursor-pointer gap-1.5 text-xs font-semibold text-slate-700"
                  >
                    <Download className="size-3.5" />
                    <span>Download (.txt)</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCodes}
                    className="cursor-pointer gap-1.5 text-xs font-semibold text-slate-700"
                  >
                    <Copy className="size-3.5" />
                    <span>{codesCopied ? 'Copied All' : 'Copy All'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3: Verification & Activation Form */}
            <form
              onSubmit={handleEnable2Fa}
              className="rounded-xl border border-[#CAD3F5] bg-[#EFF5FF]/40 p-5"
            >
              <h3 className="text-xs font-bold text-[#0A1A4A]">
                3. {isKhmer ? 'បញ្ចូលកូដដើម្បីផ្ទៀងផ្ទាត់ & បើកដំណើរការ' : 'Verify & Activate 2FA'}
              </h3>
              <p className="mt-0.5 text-xs text-slate-600">
                {isKhmer
                  ? 'បញ្ចូលកូដ 6 ខ្ទង់ដែលកំពុងបង្ហាញក្នុង Authenticator app របស់អ្នក'
                  : 'Enter the current 6-digit TOTP code generated by your authenticator app.'}
              </p>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative max-w-xs flex-1">
                  <KeyRound className="absolute top-2.5 left-3 size-4 text-slate-400" />
                  <Input
                    className="h-10 pl-9 font-mono text-sm tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                    disabled={isActivating}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isActivating || verifyCode.length < 6}
                  className="h-10 cursor-pointer gap-2 rounded-xl bg-[#023e8a] px-5 text-xs font-semibold text-white hover:bg-[#00509d]"
                >
                  <ShieldCheck className="size-4" />
                  <span>
                    {isActivating
                      ? isKhmer
                        ? 'កំពុងផ្ទៀងផ្ទាត់...'
                        : 'Verifying...'
                      : isKhmer
                        ? 'បើកដំណើរការ 2FA'
                        : 'Verify & Activate 2FA'}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSetupData(null)}
                  disabled={isActivating}
                  className="h-10 cursor-pointer text-xs"
                >
                  {isKhmer ? 'បោះបង់' : 'Cancel Setup'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: TELEGRAM DESKTOP OTP FALLBACK (ACTIVE 2FA ONLY)        */}
      {/* ----------------------------------------------------------------- */}
      {is2FaEnabled && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-[#00509d]">
                <Send className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">
                    {isKhmer
                      ? 'ការផ្ទៀងផ្ទាត់បម្រុងតាម Telegram OTP'
                      : 'Telegram Desktop OTP Fallback'}
                  </h2>
                  <Badge tone={user?.telegramChatId ? 'success' : 'neutral'}>
                    {user?.telegramChatId ? '[LINKED]' : '[UNLINKED]'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  {isKhmer
                    ? 'ទទួលកូដចូលប្រព័ន្ធតាម Telegram Desktop ប្រសិនបើអ្នកមិនអាចចូលប្រើ Authenticator app'
                    : 'Receive temporary one-time login passcodes on Telegram if your authenticator is unavailable.'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLinkTelegram} className="mt-5 max-w-lg space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                {isKhmer ? 'Telegram Chat ID របស់អ្នក' : 'Your Telegram Chat ID'}
              </label>
              <div className="relative">
                <Input
                  className="h-10 font-mono text-xs"
                  placeholder="e.g. 123456789"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value.trim())}
                  disabled={isLinkingTelegram}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                {isKhmer
                  ? 'ដើម្បីរក Chat ID៖ សូមផ្ញើសារ /myid ទៅកាន់ Telegram Bot របស់សាលា'
                  : 'To retrieve your Chat ID: Message /myid to @userinfobot or the official SNPI notification bot on Telegram.'}
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLinkingTelegram || !telegramChatId.trim()}
              className="h-9 cursor-pointer gap-2 rounded-xl bg-[#023e8a] text-xs font-semibold text-white hover:bg-[#00509d]"
            >
              <Send className="size-3.5" />
              <span>
                {isLinkingTelegram
                  ? isKhmer
                    ? 'កំពុងភ្ជាប់...'
                    : 'Linking...'
                  : isKhmer
                    ? 'ភ្ជាប់គណនី Telegram'
                    : 'Save Telegram Chat ID'}
              </span>
            </Button>
          </form>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MODAL: PROTECTED 2FA DEACTIVATION DIALOG                          */}
      {/* ----------------------------------------------------------------- */}
      {isDisableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="size-5 shrink-0" />
                <h3 className="text-base font-bold text-slate-900">
                  {isKhmer ? 'បិទដំណើរការ 2FA' : 'Disable Two-Factor Authentication'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsDisableModalOpen(false);
                  setDisableError(null);
                }}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-600">
              {isKhmer
                ? 'ការបិទ 2FA នឹងកាត់បន្ថយកម្រិតសុវត្ថិភាពនៃគណនីរបស់អ្នក។ ដើម្បីការពារការលួចបន្លំ សូមបញ្ចូលពាក្យសម្ងាត់គណនី និងកូដ 2FA បច្ចុប្បន្ន។'
                : 'Disabling 2FA will remove two-factor protection from your account and invalidate all existing backup codes. Dual authorization is strictly required.'}
            </p>

            {disableError && (
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-700">
                <AlertCircle className="mt-0.5 size-3.5 shrink-0 text-red-600" />
                <span>{disableError}</span>
              </div>
            )}

            <form onSubmit={handleDisable2Fa} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  1. {isKhmer ? 'ពាក្យសម្ងាត់គណនីបច្ចុប្បន្ន' : 'Account Password'}
                </label>
                <Input
                  type="password"
                  className="h-10 text-xs"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={disablePassword}
                  onChange={(e) => setDisablePassword(e.target.value)}
                  disabled={isDisabling}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  2.{' '}
                  {isKhmer ? 'កូដ 6 ខ្ទង់ ឬ កូដបម្រុងទុក' : 'Current 6-Digit TOTP or Backup Code'}
                </label>
                <Input
                  className="h-10 font-mono text-xs tracking-wider"
                  placeholder="000000 or XXXX-XXXX"
                  value={disableCode}
                  onChange={(e) => setDisableCode(e.target.value.toUpperCase())}
                  disabled={isDisabling}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDisableModalOpen(false);
                    setDisableError(null);
                  }}
                  disabled={isDisabling}
                  className="cursor-pointer text-xs"
                >
                  {isKhmer ? 'បោះបង់' : 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  disabled={isDisabling || !disablePassword || !disableCode}
                  className="cursor-pointer bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  {isDisabling
                    ? isKhmer
                      ? 'កំពុងផ្ទៀងផ្ទាត់...'
                      : 'Deactivating...'
                    : isKhmer
                      ? 'បញ្ជាក់ និងបិទ 2FA'
                      : 'Confirm & Disable 2FA'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
