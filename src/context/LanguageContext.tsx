'use client';

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';

export type LanguageCode = 'en' | 'ko' | 'zh';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  short: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', short: 'EN', nativeName: 'English' },
  { code: 'ko', label: '한국어', short: 'KO', nativeName: '한국어' },
  { code: 'zh', label: '中文', short: 'ZH', nativeName: '中文' },
];

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  mounted: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('psk-language') as LanguageCode | null;
      if (saved && (saved === 'en' || saved === 'ko' || saved === 'zh')) {
        setLanguageState(saved);
        document.documentElement.lang = saved === 'ko' ? 'ko' : saved === 'zh' ? 'zh-CN' : 'en';
      }
    } catch {
      // storage unavailable
    }

    const handleExternalChange = () => {
      try {
        const next = localStorage.getItem('psk-language') as LanguageCode | null;
        if (next && (next === 'en' || next === 'ko' || next === 'zh')) {
          setLanguageState(next);
          document.documentElement.lang = next === 'ko' ? 'ko' : next === 'zh' ? 'zh-CN' : 'en';
        }
      } catch {
        // storage unavailable
      }
    };

    window.addEventListener('psk-language-change', handleExternalChange);
    return () => window.removeEventListener('psk-language-change', handleExternalChange);
  }, []);

  const setLanguage = (newLang: LanguageCode) => {
    startTransition(() => {
      setLanguageState(newLang);
    });
    try {
      localStorage.setItem('psk-language', newLang);
      document.documentElement.lang = newLang === 'ko' ? 'ko' : newLang === 'zh' ? 'zh-CN' : 'en';
      window.dispatchEvent(new Event('psk-language-change'));
    } catch {
      // storage unavailable
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
