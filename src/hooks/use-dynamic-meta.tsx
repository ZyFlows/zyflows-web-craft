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
    title: "zyFlows - Solutions Digitales Innovantes | Développement Web & IA",
    description: "Entreprise technologique spécialisée en développement web sur mesure, applications mobiles, intégration IA et automatisation. Solutions de transformation digitale pour entreprises modernes."
  },
  en: {
    title: "zyFlows - Innovative Digital Solutions | Web Development & AI", 
    description: "Tech company specializing in custom web development, mobile apps, AI integration, and business automation. Expert digital transformation solutions for modern enterprises."
  },
  he: {
    title: "zyFlows - פתרונות דיגיטליים חדשניים | פיתוח ובינה מלאכותית",
    description: "חברת טכנולוגיה המתמחה בפיתוח אתרים מותאמים, אפליקציות מובייל, שילוב בינה מלאכותית ואוטומציה עסקית. פתרונות טרנספורמציה דיגיטלית מומחים."
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
      <meta name="keywords" content="digital solutions, web development, mobile apps, AI integration, business automation, digital transformation, tech company, software development, cloud solutions" />
      <link rel="canonical" href="https://zyflows.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://zyflows.com/" />
      <meta property="og:image" content="https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="zyFlows" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
      <meta name="twitter:site" content="@zyflows" />
    </Helmet>
  );
};