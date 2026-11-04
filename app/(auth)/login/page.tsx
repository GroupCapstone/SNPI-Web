'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff, Lock, Mail, ShieldCheck } from '@/components/icons';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSwitcher } from '@/components/shared/language-switcher';
import { useAuth } from '@/features/auth/context/auth-context';
import type { LoginFormData } from '@/features/auth/schemas/login-schema';
import { loginFormSchema } from '@/features/auth/schemas/login-schema';
import { useTranslation } from '@/lib/i18n';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const { t, isKhmer } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

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
      await login(data);
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
          <h2 className="text-base font-semibold text-slate-900">{t.auth.signIn}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{t.auth.signInSubtitle}</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
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
              <p className="mt-1 text-xs font-medium text-rose-600">{errors.identifier.message}</p>
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
