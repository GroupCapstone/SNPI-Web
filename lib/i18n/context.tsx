'use client';

import * as React from 'react';

import { en } from './dictionaries/en';
import { kh } from './dictionaries/kh';
import type { Language, TranslationDictionary } from './types';

const STORAGE_KEY = 'snp_language';

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
  isKhmer: boolean;
  getLocalizedValue: (khmerVal?: string | null, englishVal?: string | null) => string;
}

const I18nContext = React.createContext<I18nContextValue | undefined>(undefined);

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('snp-language-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('snp-language-change', callback);
  };
};

const getSnapshot = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === 'kh' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore localStorage read errors in SSR or restricted environments
  }
  return 'kh';
};

const getServerSnapshot = (): Language => 'kh';

export const toDocumentLanguage = (language: Language): 'en' | 'km' =>
  language === 'kh' ? 'km' : 'en';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  React.useEffect(() => {
    document.documentElement.lang = toDocumentLanguage(language);
  }, [language]);

  const setLanguage = React.useCallback((newLang: Language) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = toDocumentLanguage(newLang);
      window.dispatchEvent(new Event('snp-language-change'));
    } catch {
      // Ignore storage write errors
    }
  }, []);

  const toggleLanguage = React.useCallback(() => {
    setLanguage(language === 'kh' ? 'en' : 'kh');
  }, [language, setLanguage]);

  const dictionary = language === 'kh' ? kh : en;

  const getLocalizedValue = React.useCallback(
    (khmerVal?: string | null, englishVal?: string | null): string => {
      if (language === 'kh') {
        return (khmerVal && khmerVal.trim()) || englishVal || '';
      }
      return (englishVal && englishVal.trim()) || khmerVal || '';
    },
    [language],
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t: dictionary,
      isKhmer: language === 'kh',
      getLocalizedValue,
    }),
    [language, setLanguage, toggleLanguage, dictionary, getLocalizedValue],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = (): I18nContextValue => {
  const context = React.useContext(I18nContext);
  if (!context) {
    // Graceful fallback to Khmer dictionary if rendered outside provider
    return {
      language: 'kh',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: kh,
      isKhmer: true,
      getLocalizedValue: (khVal, enVal) => khVal || enVal || '',
    };
  }
  return context;
};
