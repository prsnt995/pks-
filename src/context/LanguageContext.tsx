'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

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

let currentLanguage: LanguageCode = 'en';

function readLanguage(): LanguageCode {
  try {
    const saved = localStorage.getItem('psk-language');
    if (saved === 'en' || saved === 'ko' || saved === 'zh') return saved;
  } catch {
    // Keep the in-memory selection when browser storage is unavailable.
  }
  return currentLanguage;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === 'psk-language' || event.key === null) {
      currentLanguage = 'en';
      onChange();
    }
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener('psk-language-change', onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener('psk-language-change', onChange);
  };
}

const serverLanguage = (): LanguageCode => 'en';
const clientMounted = () => true;
const serverMounted = () => false;

function setLanguage(newLang: LanguageCode) {
  currentLanguage = newLang;
  try {
    localStorage.setItem('psk-language', newLang);
  } catch {
    // The selection still works for this page session.
  }
  window.dispatchEvent(new Event('psk-language-change'));
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, readLanguage, serverLanguage);
  const mounted = useSyncExternalStore(subscribe, clientMounted, serverMounted);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
