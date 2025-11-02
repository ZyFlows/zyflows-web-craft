import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useRTL = () => {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  useEffect(() => {
    // Direction HTML
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Class body pour CSS conditionnel
      document.body.classList.remove('rtl', 'ltr');
      document.body.classList.add(isRTL ? 'rtl' : 'ltr');
    }
  }, [language, isRTL]);

  return { isRTL, language };
};
