'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  Send,
  ShieldCheck,
} from '@/components/icons';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { requestTelegramOtpApi, verify2FaApi } from '@/features/auth/api/auth-api';
import { useAuth } from '@/features/auth/context/auth-context';
import type { LoginFormData } from '@/features/auth/schemas/login-schema';
import { loginFormSchema } from '@/features/auth/schemas/login-schema';
import { useTranslation } from '@/lib/i18n';

export default function LoginPage() {
  const { login, complete2FaLogin, isAuthenticated, isLoading } = useAuth();
  const { t, isKhmer } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // 2FA State
  const [is2FaStep, setIs2FaStep] = React.useState(false);
  const [mfaToken, setMfaToken] = React.useState<string | null>(null);
  const [telegramAvailable, setTelegramAvailable] = React.useState(false);
  const [twoFactorCode, setTwoFactorCode] = React.useState('');
  const [isVerifying2Fa, setIsVerifying2Fa] = React.useState(false);
  const [isSendingTelegram, setIsSendingTelegram] = React.useState(false);
  const [telegramNotice, setTelegramNotice] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  // If already authenticated, redirect to dashboard or target URL
  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectUrl);
    }
  }, [isLoading, isAuthenticated, redirectUrl, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null);
      setTelegramNotice(null);
      const res = await login(data);

      if (res.mfaRequired && res.mfaToken) {
        setMfaToken(res.mfaToken);
        setTelegramAvailable(Boolean(res.telegramAvailable));
        setIs2FaStep(true);
        return;
      }

      router.push(redirectUrl);
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : isKhmer
            ? 'មិនអាចចូលប្រើប្រព័ន្ធបានទេ។ សូមពិនិត្យមើលឈ្មោះគណនី និងពាក្យសម្ងាត់ឡើងវិញ។'
            : 'Unable to sign in. Please verify your credentials.';
      setErrorMessage(msg);
    }
  };

  const handleVerify2Fa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaToken) return;

    const trimmed = twoFactorCode.trim();
    if (!trimmed) {
      setErrorMessage(
        isKhmer
          ? 'សូមបញ្ចូលកូដផ្ទៀងផ្ទាត់ 6 ខ្ទង់ ឬ កូដបម្រុង'
          : 'Please enter your 6-digit verification code or backup code.',
      );
      return;
    }

    try {
      setIsVerifying2Fa(true);
      setErrorMessage(null);
      const res = await verify2FaApi({ mfaToken, code: trimmed });

      if (res.success && res.data) {
        await complete2FaLogin(res.data);
        router.push(redirectUrl);
      } else {
        throw new Error(res.message || 'Verification failed');
      }
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : isKhmer
            ? 'កូដផ្ទៀងផ្ទាត់មិនត្រឹមត្រូវទេ។ សូមព្យាយាមម្តងទៀត។'
            : 'Invalid 2FA code. Please check your authenticator or backup code.';
      setErrorMessage(msg);
    } finally {
      setIsVerifying2Fa(false);
    }
  };

  const handleRequestTelegramOtp = async () => {
    if (!mfaToken) return;
    try {
      setIsSendingTelegram(true);
      setErrorMessage(null);
      const res = await requestTelegramOtpApi(mfaToken);
      setTelegramNotice(
        res.message ||
          (isKhmer
            ? 'កូដផ្ទៀងផ្ទាត់ត្រូវបានផ្ញើទៅ Telegram របស់អ្នករួចរាល់'
            : 'A verification code has been dispatched to your Telegram account.'),
      );
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : isKhmer
            ? 'មិនអាចផ្ញើកូដទៅ Telegram បានទេ'
            : 'Failed to send verification code to Telegram.';
      setErrorMessage(msg);
    } finally {
      setIsSendingTelegram(false);
    }
  };

  const handleBackToCredentials = () => {
    setIs2FaStep(false);
    setMfaToken(null);
    setTwoFactorCode('');
    setErrorMessage(null);
    setTelegramNotice(null);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50/80 p-4 sm:p-6">
      {/* Top right language switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher variant="pill" />
      </div>

      {/* Single Unified Container Card */}
      <div className="w-full max-w-[440px] rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9">
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <Image
              src="/images/logo.png"
              alt="SNPI International School Logo"
              width={80}
              height={80}
              className="size-20 object-contain"
              priority
            />
          </div>
          <h1 className="mt-3 text-base font-bold tracking-tight text-[#023e8a]">
            {t.common.schoolNameKh}
          </h1>
          <p className="mt-0.5 text-xs font-medium text-slate-500">{t.common.schoolName}</p>
        </div>

        {/* Divider & Section Intro */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h2 className="text-base font-semibold text-slate-900">
            {is2FaStep
              ? isKhmer
                ? 'ការផ្ទៀងផ្ទាត់ពីរកត្តា (2FA)'
                : 'Two-Factor Authentication'
              : t.auth.signIn}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {is2FaStep
              ? isKhmer
                ? 'សូមបញ្ចូលកូដ 6 ខ្ទង់ពីកម្មវិធី Authenticator ឬ កូដបម្រុង 8 តួអក្សរ'
                : 'Enter your 6-digit TOTP code, 8-character backup recovery code, or Telegram OTP.'
              : t.auth.signInSubtitle}
          </p>
        </div>

        {/* Status & Error Alerts */}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {telegramNotice && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            <span>{telegramNotice}</span>
          </div>
        )}

        {is2FaStep ? (
          /* ------------------------------------------------------------- */
          /* 2FA Challenge View                                            */
          /* ------------------------------------------------------------- */
          <form onSubmit={handleVerify2Fa} className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {isKhmer
                  ? 'កូដផ្ទៀងផ្ទាត់ (Authenticator / កូដបម្រុង / Telegram)'
                  : 'Verification Code (Authenticator / Backup / Telegram)'}
              </label>
              <div className="relative">
                <KeyRound className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <Input
                  className="h-10 pl-9 font-mono text-xs tracking-wider"
                  placeholder="000000 or XXXX-XXXX"
                  autoComplete="one-time-code"
                  autoFocus
                  disabled={isVerifying2Fa}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.toUpperCase())}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                {isKhmer
                  ? 'អ្នកអាចប្រើកូដ 6 ខ្ទង់ពី Google Authenticator ឬ កូដបម្រុង 8 ខ្ទង់ (XXXX-XXXX)'
                  : 'Accepts 6-digit TOTP from Google Authenticator, Telegram OTP, or 8-char backup codes.'}
              </p>
            </div>

            {/* Telegram OTP Fallback Action */}
            {telegramAvailable && (
              <Button
                type="button"
                variant="outline"
                disabled={isSendingTelegram || isVerifying2Fa}
                onClick={handleRequestTelegramOtp}
                className="h-9 w-full cursor-pointer justify-center gap-2 rounded-xl border-blue-200 bg-blue-50/50 text-xs font-semibold text-[#00509d] transition-all hover:bg-blue-100/60"
              >
                <Send className="size-3.5" />
                <span>
                  {isSendingTelegram
                    ? isKhmer
                      ? 'កំពុងផ្ញើ...'
                      : 'Sending to Telegram...'
                    : isKhmer
                      ? 'ផ្ញើកូដផ្ទៀងផ្ទាត់ទៅ Telegram'
                      : 'Send verification code to Telegram'}
                </span>
              </Button>
            )}

            <Button
              type="submit"
              disabled={isVerifying2Fa}
              className="h-10 w-full cursor-pointer rounded-xl bg-[#023e8a] text-xs font-medium text-white transition-all hover:bg-[#00509d]"
            >
              {isVerifying2Fa
                ? isKhmer
                  ? 'កំពុងផ្ទៀងផ្ទាត់...'
                  : 'Verifying code...'
                : isKhmer
                  ? 'ផ្ទៀងផ្ទាត់ និងចូលប្រើប្រព័ន្ធ'
                  : 'Verify & Sign In'}
            </Button>

            <button
              type="button"
              onClick={handleBackToCredentials}
              className="flex w-full cursor-pointer items-center justify-center gap-1.5 pt-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="size-3.5" />
              <span>{isKhmer ? 'ត្រឡប់ទៅទំព័រចូល' : 'Back to password sign in'}</span>
            </button>
          </form>
        ) : (
          /* ------------------------------------------------------------- */
          /* Standard Username & Password View                             */
          /* ------------------------------------------------------------- */
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.auth.usernameOrEmail}
              </label>
              <div className="relative">
                <Mail className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <Input
                  className="h-10 pl-9 text-xs"
                  placeholder={isKhmer ? 'ឈ្មោះអ្នកប្រើ ឬ អ៊ីមែល' : 'Username or email'}
                  autoComplete="username"
                  disabled={isSubmitting}
                  {...register('identifier')}
                />
              </div>
              {errors.identifier && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                {t.auth.password}
              </label>
              <div className="relative">
                <Lock className="absolute top-2.5 left-3 size-4 text-slate-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="h-10 pr-10 pl-9 text-xs"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute top-2.5 right-3 cursor-pointer text-slate-400 hover:text-slate-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full cursor-pointer rounded-xl bg-[#023e8a] text-xs font-medium text-white transition-all hover:bg-[#00509d]"
            >
              {isSubmitting ? t.auth.signingIn : t.auth.signIn}
            </Button>
          </form>
        )}

        {/* Security Footer inside Box */}
        <div className="mt-6 flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span>
            {isKhmer
              ? 'ការពារដោយប្រព័ន្ធសុវត្ថិភាព RBAC និងដាច់ដោយឡែកតាមសាខា'
              : 'RBAC & Strict Branch Isolation Protected'}
          </span>
        </div>
      </div>
    </div>
  );
}
