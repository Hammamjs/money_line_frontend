'use client';

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  createElement,
} from 'react';
import { translations } from './translations';

export type Lang = 'en' | 'ar';

export type TranslationKeys = typeof translations.en;

interface LangContextValue {
  lang: Lang;
  t: TranslationKeys;
  toggleLang: () => void;
}

export const LangContext = createContext<LangContextValue>({
  lang: 'en',
  t: translations.en,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sdx_lang') as Lang) || 'en';
    }

    return 'en';
  });
  useEffect(() => {
    localStorage.setItem('sdx_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(
    () => setLang((l) => (l === 'en' ? 'ar' : 'en')),
    [],
  );
  const value: LangContextValue = { lang, t: translations[lang], toggleLang };
  return createElement(LangContext.Provider, { value }, children);
}

export function useTranslation() {
  return useContext(LangContext);
}
