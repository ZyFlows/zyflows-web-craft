import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

interface MetaTranslations {
  [key: string]: {
    title: string;
    description: string;
  };
}

const metaTranslations: MetaTranslations = {
  fr: {
    title: "zyFlows - Solutions Digitales Innovantes d'Israël",
    description: "zyFlows développe vos sites web, applications personnalisées et automatisations. Experts en Wix, WordPress, Shopify, Make, Zapier et IA pour entreprises."
  },
  en: {
    title: "zyFlows - Innovative Digital Solutions from Israel", 
    description: "zyFlows develops your websites, custom applications and automations. Experts in Wix, WordPress, Shopify, Make, Zapier and AI for businesses."
  },
  he: {
    title: "zyFlows - פתרונות דיגיטליים חדשניים מישראל",
    description: "zyFlows מפתחת אתרים, אפליקציות מותאמות ואוטומציות. מומחים ב-Wix, WordPress, Shopify, Make, Zapier ובינה מלאכותית לעסקים."
  }
};

export const useDynamicMeta = () => {
  // Récupération robuste de la langue même si le Provider n'est pas encore monté
  let lang: Language = 'he';
  try {
    const ctx = useLanguage();
    lang = ctx.language;
  } catch (e) {
    // Fallback si le contexte n'est pas disponible (évite le crash au boot)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as Language | null;
      if (saved && ['fr', 'en', 'he'].includes(saved)) {
        lang = saved;
      } else if (document?.documentElement?.getAttribute('dir') === 'rtl') {
        lang = 'he';
      } else {
        lang = 'en';
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  }, [lang]);

  const meta = metaTranslations[lang];
  return meta;
};

export const DynamicMetaTags = () => {
  const meta = useDynamicMeta();
  
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
    </Helmet>
  );
};