import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

interface MetaTranslations {
  [key: string]: {
    title: string;
    description: string;
    keywords: string;
  };
}

const metaTranslations: MetaTranslations = {
  fr: {
    title: "zyFlows - Automatisations IA, Chatbots WhatsApp, Sites Web et Intégration Make",
    description: "Nous créons des automatisations IA, chatbots WhatsApp et sites performants pour les PME en Israël et en France. Économisez des heures chaque semaine et développez plus vite.",
    keywords: "automatisation IA, chatbot WhatsApp, création site web, intégration Make, n8n, Zapier, développement web, transformation digitale, PME France, PME Israël"
  },
  en: {
    title: "zyFlows - AI Automations, WhatsApp Chatbots, Websites and Make Integration", 
    description: "We build AI automations, WhatsApp chatbots and high performance websites for small and mid-sized businesses in Israel and France. Save hours weekly and scale faster.",
    keywords: "AI automation, WhatsApp chatbot, website development, Make integration, n8n, Zapier, web development, digital transformation, SMB Israel, SMB France"
  },
  he: {
    title: "zyFlows - אוטומציות AI, צ'אטבוטים לווטסאפ, אתרים ואינטגרציית Make",
    description: "אנחנו בונים אוטומציות AI, צ'אטבוטים לווטסאפ ואתרים בעלי ביצועים גבוהים לעסקים קטנים ובינוניים בישראל ובצרפת. חסכו שעות בשבוע וצמחו מהר יותר.",
    keywords: "אוטומציה AI, צ'אטבוט ווטסאפ, בניית אתרים, אינטגרציית Make, n8n, Zapier, פיתוח אתרים, טרנספורמציה דיגיטלית, עסקים קטנים ישראל"
  }
};

// JSON-LD Structured Data for Organization and Services
const getStructuredData = (lang: Language) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://zyflows.com/#organization",
        "name": "zyFlows",
        "url": "https://zyflows.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zyflows.com/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png",
          "width": 512,
          "height": 512
        },
        "founder": {
          "@type": "Person",
          "name": "Raphael Belhassen",
          "url": "https://www.linkedin.com/in/raphael-belhassen"
        },
        "foundingDate": "2023",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+972-58-422-9255",
            "contactType": "sales",
            "areaServed": ["IL", "FR"],
            "availableLanguage": ["English", "French", "Hebrew"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+33-7-69-03-58-29",
            "contactType": "sales",
            "areaServed": ["FR", "IL"],
            "availableLanguage": ["English", "French", "Hebrew"]
          }
        ],
        "email": "contact@zyflows.com",
        "sameAs": [
          "https://www.linkedin.com/in/raphael-belhassen",
          "https://zyflows.com"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IL"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://zyflows.com/#website",
        "url": "https://zyflows.com",
        "name": "zyFlows",
        "publisher": {
          "@id": "https://zyflows.com/#organization"
        },
        "inLanguage": [lang === 'fr' ? 'fr-FR' : lang === 'he' ? 'he-IL' : 'en-US']
      },
      {
        "@type": "Service",
        "@id": "https://zyflows.com/#ai-automation",
        "name": lang === 'fr' ? "Automatisations IA" : lang === 'he' ? "אוטומציות AI" : "AI Automations",
        "description": lang === 'fr' 
          ? "Automatisez vos processus métier avec Make, n8n et Zapier. Gagnez du temps et réduisez les erreurs."
          : lang === 'he'
          ? "אוטומציה של תהליכים עסקיים עם Make, n8n ו-Zapier. חסכו זמן והפחיתו שגיאות."
          : "Automate your business processes with Make, n8n and Zapier. Save time and reduce errors.",
        "provider": {
          "@id": "https://zyflows.com/#organization"
        },
        "serviceType": "Business Automation",
        "areaServed": ["IL", "FR"]
      },
      {
        "@type": "Service",
        "@id": "https://zyflows.com/#whatsapp-chatbots",
        "name": lang === 'fr' ? "Chatbots WhatsApp" : lang === 'he' ? "צ'אטבוטים לווטסאפ" : "WhatsApp Chatbots",
        "description": lang === 'fr'
          ? "Assistants IA conversationnels disponibles 24h/24 pour votre support client et vos ventes."
          : lang === 'he'
          ? "עוזרים שיחתיים AI זמינים 24/7 לתמיכת לקוחות ומכירות."
          : "AI conversational assistants available 24/7 for customer support and sales.",
        "provider": {
          "@id": "https://zyflows.com/#organization"
        },
        "serviceType": "AI Chatbot Development",
        "areaServed": ["IL", "FR"]
      },
      {
        "@type": "Service",
        "@id": "https://zyflows.com/#websites",
        "name": lang === 'fr' ? "Sites Web & Landing Pages" : lang === 'he' ? "אתרים ודפי נחיתה" : "Websites & Landing Pages",
        "description": lang === 'fr'
          ? "Sites web performants et optimisés SEO sur Wix, WordPress, Shopify et Framer."
          : lang === 'he'
          ? "אתרים מהירים ואופטימיזציה לקידום אורגני על Wix, WordPress, Shopify ו-Framer."
          : "High-performance SEO-optimized websites on Wix, WordPress, Shopify and Framer.",
        "provider": {
          "@id": "https://zyflows.com/#organization"
        },
        "serviceType": "Web Development",
        "areaServed": ["IL", "FR"]
      },
      {
        "@type": "Service",
        "@id": "https://zyflows.com/#make-integration",
        "name": lang === 'fr' ? "Intégration Make & n8n" : lang === 'he' ? "אינטגרציית Make ו-n8n" : "Make & n8n Integration",
        "description": lang === 'fr'
          ? "Connectez tous vos outils et automatisez vos workflows avec Make.com et n8n."
          : lang === 'he'
          ? "חברו את כל הכלים שלכם ואוטומציה של תהליכי עבודה עם Make.com ו-n8n."
          : "Connect all your tools and automate workflows with Make.com and n8n.",
        "provider": {
          "@id": "https://zyflows.com/#organization"
        },
        "serviceType": "Workflow Automation",
        "areaServed": ["IL", "FR"]
      }
    ]
  };
};

export const useDynamicMeta = () => {
  let lang: Language = 'en';
  try {
    const ctx = useLanguage();
    lang = ctx.language;
  } catch (e) {
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
  return { meta, lang };
};

export const DynamicMetaTags = () => {
  const { meta, lang } = useDynamicMeta();
  const structuredData = getStructuredData(lang);
  
  return (
    <Helmet>
      <html lang={lang === 'fr' ? 'fr' : lang === 'he' ? 'he' : 'en'} dir={lang === 'he' ? 'rtl' : 'ltr'} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <link rel="canonical" href="https://zyflows.com/" />
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="en" href="https://zyflows.com/?lang=en" />
      <link rel="alternate" hrefLang="fr" href="https://zyflows.com/?lang=fr" />
      <link rel="alternate" hrefLang="he" href="https://zyflows.com/?lang=he" />
      <link rel="alternate" hrefLang="x-default" href="https://zyflows.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://zyflows.com/" />
      <meta property="og:image" content="https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="zyFlows" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : lang === 'he' ? 'he_IL' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Raphael Belhassen" />
      <meta name="geo.region" content="IL" />
      <meta name="geo.placename" content="Israel" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};