'use client';

import * as React from 'react';
import { Globe } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'button';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'pill',
}) => {
  const { language, setLanguage } = useTranslation();

  if (variant === 'pill') {
    return (
      <div
        className={cn(
          'inline-flex h-9 items-center rounded-lg border border-slate-200 bg-slate-100/90 p-0.5 text-xs font-medium',
          className,
        )}
      >
        <button
          type="button"
          onClick={() => setLanguage('kh')}
          className={cn(
            'flex h-full cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-all',
            language === 'kh'
              ? 'bg-[#00509d] font-semibold text-white'
              : 'text-slate-600 hover:text-slate-900',
          )}
          title="ប្តូរទៅជាភាសាខ្មែរ"
          aria-label="Khmer Language"
        >
          <span>ខ្មែរ</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={cn(
            'flex h-full cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-xs transition-all',
            language === 'en'
              ? 'bg-[#00509d] font-semibold text-white'
              : 'text-slate-600 hover:text-slate-900',
          )}
          title="Switch to English"
          aria-label="English Language"
        >
          <span>EN</span>
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'kh' ? 'en' : 'kh')}
      className={cn(
        'h-9 gap-1.5 border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50',
        className,
      )}
      aria-label="Toggle language"
    >
      <Globe className="size-3.5 text-[#00509d]" />
      <span>{language === 'kh' ? 'ខ្មែរ (KH)' : 'English (EN)'}</span>
    </Button>
  );
};
